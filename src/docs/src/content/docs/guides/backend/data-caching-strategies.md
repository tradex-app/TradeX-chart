---
title: Data Caching Strategies
description: Optimize performance and reduce API calls with effective caching strategies
---

Learn how to implement effective caching strategies to improve TradeX Chart performance, reduce API calls, and provide a better user experience.

## Overview

Caching is essential for:
- **Reducing API calls** - Save bandwidth and avoid rate limits
- **Improving performance** - Faster data access and chart loading
- **Offline support** - Access previously loaded data
- **Cost reduction** - Fewer API requests mean lower costs
- **Better UX** - Instant chart updates when switching timeframes

## Cache Types Comparison

| Cache Type | Persistence | Size Limit | Speed | Use Case |
|------------|-------------|------------|-------|----------|
| Memory (Map) | Session only | RAM limited | Fastest | Current session data |
| LocalStorage | Persistent | ~5-10MB | Fast | Small datasets, settings |
| IndexedDB | Persistent | ~50MB+ | Fast | Large historical data |
| Service Worker | Persistent | Configurable | Fast | Offline-first apps |

## 1. In-Memory Cache

Best for: Current session, frequently accessed data

```javascript
class MemoryCache {
  constructor(maxSize = 100, ttl = 300000) { // 5 minutes default TTL
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttl
    this.accessOrder = []
  }
  
  set(key, value) {
    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const oldestKey = this.accessOrder.shift()
      this.cache.delete(oldestKey)
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      hits: 0
    })
    
    // Update access order
    this.updateAccessOrder(key)
  }
  
  get(key) {
    const item = this.cache.get(key)
    if (!item) return null
    
    // Check if expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      this.removeFromAccessOrder(key)
      return null
    }
    
    // Update statistics
    item.hits++
    this.updateAccessOrder(key)
    
    return item.value
  }
  
  has(key) {
    return this.cache.has(key) && this.get(key) !== null
  }
  
  delete(key) {
    this.cache.delete(key)
    this.removeFromAccessOrder(key)
  }
  
  clear() {
    this.cache.clear()
    this.accessOrder = []
  }
  
  updateAccessOrder(key) {
    this.removeFromAccessOrder(key)
    this.accessOrder.push(key)
  }
  
  removeFromAccessOrder(key) {
    const index = this.accessOrder.indexOf(key)
    if (index > -1) {
      this.accessOrder.splice(index, 1)
    }
  }
  
  getStats() {
    const stats = {
      size: this.cache.size,
      maxSize: this.maxSize,
      items: []
    }
    
    this.cache.forEach((item, key) => {
      stats.items.push({
        key,
        hits: item.hits,
        age: Date.now() - item.timestamp
      })
    })
    
    return stats
  }
}

// Usage
const cache = new MemoryCache(100, 300000)
cache.set('BTCUSDT:1h', ohlcvData)
const data = cache.get('BTCUSDT:1h')
```

## 2. LocalStorage Cache

Best for: Small datasets, user preferences, recent symbols

```javascript
class LocalStorageCache {
  constructor(prefix = 'tradex_', ttl = 3600000) { // 1 hour default
    this.prefix = prefix
    this.ttl = ttl
  }
  
  set(key, value, customTTL = null) {
    try {
      const item = {
        value,
        timestamp: Date.now(),
        expiry: Date.now() + (customTTL || this.ttl)
      }
      
      localStorage.setItem(
        this.prefix + key,
        JSON.stringify(item)
      )
      
      return true
    } catch (error) {
      // Handle quota exceeded
      if (error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded, clearing old items')
        this.clearExpired()
        
        // Try again
        try {
          localStorage.setItem(
            this.prefix + key,
            JSON.stringify(item)
          )
          return true
        } catch (e) {
          console.error('Failed to cache after cleanup:', e)
          return false
        }
      }
      return false
    }
  }
  
  get(key) {
    try {
      const itemStr = localStorage.getItem(this.prefix + key)
      if (!itemStr) return null
      
      const item = JSON.parse(itemStr)
      
      // Check expiry
      if (Date.now() > item.expiry) {
        this.delete(key)
        return null
      }
      
      return item.value
    } catch (error) {
      console.error('Error reading from cache:', error)
      return null
    }
  }
  
  has(key) {
    return this.get(key) !== null
  }
  
  delete(key) {
    localStorage.removeItem(this.prefix + key)
  }
  
  clear() {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key)
      }
    })
  }
  
  clearExpired() {
    const keys = Object.keys(localStorage)
    const now = Date.now()
    
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        try {
          const item = JSON.parse(localStorage.getItem(key))
          if (item.expiry && now > item.expiry) {
            localStorage.removeItem(key)
          }
        } catch (e) {
          // Invalid item, remove it
          localStorage.removeItem(key)
        }
      }
    })
  }
  
  getSize() {
    let size = 0
    const keys = Object.keys(localStorage)
    
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        size += localStorage.getItem(key).length
      }
    })
    
    return size
  }
  
  getSizeInMB() {
    return (this.getSize() / (1024 * 1024)).toFixed(2)
  }
}

// Usage
const cache = new LocalStorageCache('tradex_', 3600000)
cache.set('recent_symbols', ['BTCUSDT', 'ETHUSDT'])
const symbols = cache.get('recent_symbols')
```

## 3. IndexedDB Cache

Best for: Large historical datasets, offline support

```javascript
class IndexedDBCache {
  constructor(dbName = 'TradeXCache', version = 1) {
    this.dbName = dbName
    this.version = version
    this.db = null
  }
  
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = () => reject(request.error)
      
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        
        // Create object stores
        if (!db.objectStoreNames.contains('candles')) {
          const store = db.createObjectStore('candles', { keyPath: 'key' })
          store.createIndex('symbol', 'symbol', { unique: false })
          store.createIndex('timestamp', 'timestamp', { unique: false })
          store.createIndex('expiry', 'expiry', { unique: false })
        }
        
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'key' })
        }
      }
    })
  }
  
  async set(key, value, metadata = {}) {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['candles'], 'readwrite')
      const store = transaction.objectStore('candles')
      
      const item = {
        key,
        value,
        timestamp: Date.now(),
        expiry: Date.now() + (metadata.ttl || 3600000),
        symbol: metadata.symbol,
        timeframe: metadata.timeframe,
        ...metadata
      }
      
      const request = store.put(item)
      
      request.onsuccess = () => resolve(true)
      request.onerror = () => reject(request.error)
    })
  }
  
  async get(key) {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['candles'], 'readonly')
      const store = transaction.objectStore('candles')
      const request = store.get(key)
      
      request.onsuccess = () => {
        const item = request.result
        
        if (!item) {
          resolve(null)
          return
        }
        
        // Check expiry
        if (Date.now() > item.expiry) {
          this.delete(key)
          resolve(null)
          return
        }
        
        resolve(item.value)
      }
      
      request.onerror = () => reject(request.error)
    })
  }
  
  async getBySymbol(symbol, timeframe = null) {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['candles'], 'readonly')
      const store = transaction.objectStore('candles')
      const index = store.index('symbol')
      const request = index.getAll(symbol)
      
      request.onsuccess = () => {
        let results = request.result
        
        // Filter by timeframe if specified
        if (timeframe) {
          results = results.filter(item => item.timeframe === timeframe)
        }
        
        // Filter expired items
        const now = Date.now()
        results = results.filter(item => now <= item.expiry)
        
        resolve(results)
      }
      
      request.onerror = () => reject(request.error)
    })
  }
  
  async delete(key) {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['candles'], 'readwrite')
      const store = transaction.objectStore('candles')
      const request = store.delete(key)
      
      request.onsuccess = () => resolve(true)
      request.onerror = () => reject(request.error)
    })
  }
  
  async clear() {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['candles'], 'readwrite')
      const store = transaction.objectStore('candles')
      const request = store.clear()
      
      request.onsuccess = () => resolve(true)
      request.onerror = () => reject(request.error)
    })
  }
  
  async clearExpired() {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['candles'], 'readwrite')
      const store = transaction.objectStore('candles')
      const index = store.index('expiry')
      const range = IDBKeyRange.upperBound(Date.now())
      const request = index.openCursor(range)
      
      let deletedCount = 0
      
      request.onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          cursor.delete()
          deletedCount++
          cursor.continue()
        } else {
          resolve(deletedCount)
        }
      }
      
      request.onerror = () => reject(request.error)
    })
  }
  
  async getStats() {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['candles'], 'readonly')
      const store = transaction.objectStore('candles')
      const countRequest = store.count()
      
      countRequest.onsuccess = () => {
        resolve({
          totalItems: countRequest.result,
          dbName: this.dbName,
          version: this.version
        })
      }
      
      countRequest.onerror = () => reject(countRequest.error)
    })
  }
}

// Usage
const cache = new IndexedDBCache()
await cache.init()

await cache.set('BTCUSDT:1h:recent', ohlcvData, {
  symbol: 'BTCUSDT',
  timeframe: '1h',
  ttl: 3600000
})

const data = await cache.get('BTCUSDT:1h:recent')
const btcData = await cache.getBySymbol('BTCUSDT', '1h')
```

## 4. Multi-Tier Cache Strategy

Combine multiple cache types for optimal performance:

```javascript
class MultiTierCache {
  constructor() {
    this.memoryCache = new MemoryCache(50, 300000) // 5 min
    this.localCache = new LocalStorageCache('tradex_', 3600000) // 1 hour
    this.indexedDBCache = new IndexedDBCache()
  }
  
  async init() {
    await this.indexedDBCache.init()
  }
  
  async get(key) {
    // Try memory first (fastest)
    let data = this.memoryCache.get(key)
    if (data) {
      console.log('Cache hit: Memory')
      return data
    }
    
    // Try localStorage (fast)
    data = this.localCache.get(key)
    if (data) {
      console.log('Cache hit: LocalStorage')
      // Promote to memory cache
      this.memoryCache.set(key, data)
      return data
    }
    
    // Try IndexedDB (slower but larger)
    data = await this.indexedDBCache.get(key)
    if (data) {
      console.log('Cache hit: IndexedDB')
      // Promote to faster caches
      this.memoryCache.set(key, data)
      this.localCache.set(key, data)
      return data
    }
    
    console.log('Cache miss')
    return null
  }
  
  async set(key, value, options = {}) {
    // Store in all tiers
    this.memoryCache.set(key, value)
    
    // Only store in persistent caches if data is large enough
    if (JSON.stringify(value).length > 1000) {
      await this.indexedDBCache.set(key, value, options)
    } else {
      this.localCache.set(key, value, options.ttl)
    }
  }
  
  async delete(key) {
    this.memoryCache.delete(key)
    this.localCache.delete(key)
    await this.indexedDBCache.delete(key)
  }
  
  async clear() {
    this.memoryCache.clear()
    this.localCache.clear()
    await this.indexedDBCache.clear()
  }
}

// Usage
const cache = new MultiTierCache()
await cache.init()

await cache.set('BTCUSDT:1h', ohlcvData)
const data = await cache.get('BTCUSDT:1h')
```

## 5. Smart Data Fetcher with Caching

```javascript
class CachedDataFetcher {
  constructor(cache, apiClient) {
    this.cache = cache
    this.apiClient = apiClient
    this.pendingRequests = new Map()
  }
  
  async getData(symbol, timeframe, options = {}) {
    const cacheKey = `${symbol}:${timeframe}`
    
    // Check cache first (unless force refresh)
    if (!options.forceRefresh) {
      const cached = await this.cache.get(cacheKey)
      if (cached) {
        console.log('Returning cached data')
        return cached
      }
    }
    
    // Prevent duplicate requests
    if (this.pendingRequests.has(cacheKey)) {
      console.log('Request already pending, waiting...')
      return this.pendingRequests.get(cacheKey)
    }
    
    // Fetch fresh data
    const promise = this.fetchAndCache(symbol, timeframe, cacheKey)
    this.pendingRequests.set(cacheKey, promise)
    
    try {
      const data = await promise
      return data
    } finally {
      this.pendingRequests.delete(cacheKey)
    }
  }
  
  async fetchAndCache(symbol, timeframe, cacheKey) {
    console.log('Fetching fresh data from API')
    
    const data = await this.apiClient.fetchOHLCV(symbol, timeframe)
    
    // Cache the result
    await this.cache.set(cacheKey, data, {
      symbol,
      timeframe,
      ttl: this.getTTL(timeframe)
    })
    
    return data
  }
  
  getTTL(timeframe) {
    // Shorter timeframes = shorter cache
    const ttlMap = {
      '1m': 60000,      // 1 minute
      '5m': 300000,     // 5 minutes
      '15m': 900000,    // 15 minutes
      '1h': 3600000,    // 1 hour
      '4h': 7200000,    // 2 hours
      '1d': 14400000    // 4 hours
    }
    
    return ttlMap[timeframe] || 3600000
  }
}
```

## 6. Cache Invalidation Strategies

```javascript
class CacheInvalidator {
  constructor(cache) {
    this.cache = cache
  }
  
  // Invalidate on new candle close
  async invalidateOnCandleClose(symbol, timeframe) {
    const key = `${symbol}:${timeframe}`
    await this.cache.delete(key)
  }
  
  // Invalidate old data periodically
  startPeriodicCleanup(interval = 3600000) { // 1 hour
    setInterval(async () => {
      console.log('Running cache cleanup...')
      await this.cache.clearExpired()
    }, interval)
  }
  
  // Invalidate on symbol change
  async invalidateSymbol(symbol) {
    const keys = await this.cache.getBySymbol(symbol)
    for (const item of keys) {
      await this.cache.delete(item.key)
    }
  }
  
  // Smart invalidation based on data freshness
  async smartInvalidate(symbol, timeframe) {
    const key = `${symbol}:${timeframe}`
    const data = await this.cache.get(key)
    
    if (!data) return
    
    const lastCandle = data[data.length - 1]
    const lastTimestamp = lastCandle[0]
    const now = Date.now()
    
    // Calculate expected next candle time
    const timeframeMs = this.getTimeframeMs(timeframe)
    const nextCandleTime = lastTimestamp + timeframeMs
    
    // Invalidate if we're past the next candle time
    if (now >= nextCandleTime) {
      await this.cache.delete(key)
    }
  }
  
  getTimeframeMs(timeframe) {
    const map = {
      '1m': 60000,
      '5m': 300000,
      '15m': 900000,
      '1h': 3600000,
      '4h': 14400000,
      '1d': 86400000
    }
    return map[timeframe] || 3600000
  }
}
```

## Best Practices

### 1. Choose the Right Cache Type

```javascript
// Small, frequently accessed data → Memory
memoryCache.set('currentSymbol', 'BTCUSDT')

// User preferences, recent items → LocalStorage
localCache.set('recentSymbols', ['BTCUSDT', 'ETHUSDT'])

// Large historical data → IndexedDB
await indexedDBCache.set('BTCUSDT:1h:full', largeDataset)
```

### 2. Set Appropriate TTLs

```javascript
const ttlStrategy = {
  '1m': 60000,       // 1 minute
  '5m': 300000,      // 5 minutes
  '1h': 3600000,     // 1 hour
  '1d': 86400000     // 1 day
}
```

### 3. Monitor Cache Size

```javascript
function monitorCacheSize(cache) {
  const stats = cache.getStats()
  console.log('Cache stats:', stats)
  
  if (stats.size > stats.maxSize * 0.9) {
    console.warn('Cache nearly full, consider cleanup')
    cache.clearExpired()
  }
}
```

### 4. Handle Cache Failures Gracefully

```javascript
async function getCachedData(key) {
  try {
    return await cache.get(key)
  } catch (error) {
    console.error('Cache error:', error)
    // Fall back to API
    return await fetchFromAPI(key)
  }
}
```

## Complete Example

```javascript
import { Chart } from 'tradex-chart'

class CachedChartApp {
  constructor() {
    this.cache = new MultiTierCache()
    this.fetcher = new CachedDataFetcher(this.cache, apiClient)
    this.invalidator = new CacheInvalidator(this.cache)
  }
  
  async init() {
    await this.cache.init()
    this.invalidator.startPeriodicCleanup()
  }
  
  async loadChart(symbol, timeframe) {
    // Try to get cached data
    const data = await this.fetcher.getData(symbol, timeframe)
    
    // Initialize chart
    const chart = document.createElement('tradex-chart')
    document.getElementById('chart').appendChild(chart)
    
    chart.start({
      title: symbol,
      state: { ohlcv: data }
    })
    
    return chart
  }
  
  async refreshChart(symbol, timeframe) {
    // Force refresh from API
    const data = await this.fetcher.getData(symbol, timeframe, {
      forceRefresh: true
    })
    
    chart.mergeData(data)
  }
}

// Usage
const app = new CachedChartApp()
await app.init()
await app.loadChart('BTCUSDT', '1h')
```

## Related Documentation

- [REST API Integration](rest-api-integration) - Fetching data from APIs
- [WebSocket Integration](websocket-integration) - Real-time data
- [Performance](../../reference/canvas_methods) - Optimization techniques
- [State Management](../../reference/state) - Chart state handling
```

This comprehensive guide covers all major caching strategies with practical, production-ready examples!
