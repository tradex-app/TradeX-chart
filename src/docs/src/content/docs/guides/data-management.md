---
title: Data Management
description: Managing chart data efficiently in TradeX Chart
---

Learn how to efficiently manage, load, and update chart data in TradeX Chart.

## Data Format

### OHLCV Array Format

TradeX Chart uses the standard OHLCV (Open, High, Low, Close, Volume) format:

```javascript
const candle = [
  timestamp,  // Unix timestamp in milliseconds
  open,       // Opening price
  high,       // Highest price
  low,        // Lowest price
  close,      // Closing price
  volume      // Trading volume (optional)
]
```

### Example Data

```javascript
const ohlcvData = [
  [1609459200000, 29000, 29500, 28800, 29200, 1234.56],
  [1609462800000, 29200, 29800, 29100, 29600, 2345.67],
  [1609466400000, 29600, 30000, 29400, 29800, 3456.78]
]
```

## Loading Initial Data

### At Chart Initialization

```javascript
const chart = document.createElement('tradex-chart')

chart.start({
  title: 'BTC/USDT',
  state: {
    ohlcv: ohlcvData
  }
})
```

### After Initialization

```javascript
// Replace all data
chart.setData(newOhlcvData)

// Merge with existing data
chart.mergeData(additionalData)
```

## Updating Data

### Adding New Candles

```javascript
// Add a single completed candle
const newCandle = [1609470000000, 29800, 30200, 29700, 30000, 4567.89]
chart.addCandle(newCandle)

// Add multiple candles
const newCandles = [
  [1609470000000, 29800, 30200, 29700, 30000, 4567.89],
  [1609473600000, 30000, 30500, 29900, 30300, 5678.90]
]
chart.addCandles(newCandles)
```

### Updating Streaming Candle

For real-time updates of the current candle:

```javascript
// Update the last candle with new values
const streamingCandle = [1609477200000, 30300, 30400, 30200, 30350, 6789.01]
chart.updateStreamingCandle(streamingCandle)
```

### Removing Data

```javascript
// Remove last N candles
chart.removeCandles(10)

// Remove candles by timestamp range
chart.removeCandlesByRange(startTimestamp, endTimestamp)

// Clear all data
chart.clearData()
```

## Data Validation

### Validating OHLCV Data

```javascript
function validateOHLCV(candle) {
  if (!Array.isArray(candle) || candle.length < 5) {
    throw new Error('Invalid candle format')
  }

  const [timestamp, open, high, low, close, volume] = candle

  // Validate timestamp
  if (!Number.isInteger(timestamp) || timestamp <= 0) {
    throw new Error('Invalid timestamp')
  }

  // Validate prices
  if (high < low) {
    throw new Error('High price cannot be less than low price')
  }

  if (open < low || open > high) {
    throw new Error('Open price must be between low and high')
  }

  if (close < low || close > high) {
    throw new Error('Close price must be between low and high')
  }

  // Validate volume (if present)
  if (volume !== undefined && volume < 0) {
    throw new Error('Volume cannot be negative')
  }

  return true
}

// Use validation
try {
  validateOHLCV(candle)
  chart.addCandle(candle)
} catch (error) {
  console.error('Invalid candle data:', error.message)
}
```

## Data Transformation

### Converting from Different Formats

#### From Object Format

```javascript
function objectToOHLCV(candleObj) {
  return [
    candleObj.timestamp || candleObj.time,
    candleObj.open,
    candleObj.high,
    candleObj.low,
    candleObj.close,
    candleObj.volume || 0
  ]
}

const objectData = [
  { timestamp: 1609459200000, open: 29000, high: 29500, low: 28800, close: 29200, volume: 1234.56 },
  { timestamp: 1609462800000, open: 29200, high: 29800, low: 29100, close: 29600, volume: 2345.67 }
]

const ohlcvData = objectData.map(objectToOHLCV)
```

#### From String Format

```javascript
function parseCSVToOHLCV(csvLine) {
  const parts = csvLine.split(',')
  return [
    parseInt(parts[0]),      // timestamp
    parseFloat(parts[1]),    // open
    parseFloat(parts[2]),    // high
    parseFloat(parts[3]),    // low
    parseFloat(parts[4]),    // close
    parseFloat(parts[5])     // volume
  ]
}

const csvData = `
1609459200000,29000,29500,28800,29200,1234.56
1609462800000,29200,29800,29100,29600,2345.67
`

const ohlcvData = csvData
  .trim()
  .split('\n')
  .map(parseCSVToOHLCV)
```

## Data Fetching

### Fetching from REST API

```javascript
async function fetchOHLCVData(symbol, timeframe, limit = 500) {
  try {
    const response = await fetch(
      `https://api.example.com/ohlcv?symbol=${symbol}&timeframe=${timeframe}&limit=${limit}`
    )
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch OHLCV data:', error)
    throw error
  }
}

// Usage
fetchOHLCVData('BTCUSDT', '1h', 1000)
  .then(data => {
    chart.setData(data)
  })
  .catch(error => {
    console.error('Error loading chart data:', error)
  })
```

### Fetching Historical Data

```javascript
async function fetchHistoricalData(symbol, startTime, endTime) {
  const chunks = []
  let currentStart = startTime
  const chunkSize = 1000 // Max candles per request
  
  while (currentStart < endTime) {
    const response = await fetch(
      `https://api.example.com/ohlcv?symbol=${symbol}&start=${currentStart}&limit=${chunkSize}`
    )
    
    const data = await response.json()
    
    if (data.length === 0) break
    
    chunks.push(...data)
    currentStart = data[data.length - 1][0] + 1
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  return chunks
}

// Usage
const startTime = Date.now() - (30 * 24 * 60 * 60 * 1000) // 30 days ago
const endTime = Date.now()

fetchHistoricalData('BTCUSDT', startTime, endTime)
  .then(data => {
    chart.setData(data)
  })
```

## Data Caching

### Local Storage Cache

```javascript
class ChartDataCache {
  constructor(cacheKey = 'chart_data') {
    this.cacheKey = cacheKey
  }

  save(symbol, timeframe, data) {
    const key = `${this.cacheKey}_${symbol}_${timeframe}`
    const cacheData = {
      data: data,
      timestamp: Date.now()
    }
    
    try {
      localStorage.setItem(key, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Failed to cache data:', error)
    }
  }

  load(symbol, timeframe, maxAge = 5 * 60 * 1000) {
    const key = `${this.cacheKey}_${symbol}_${timeframe}`
    
    try {
      const cached = localStorage.getItem(key)
      if (!cached) return null
      
      const cacheData = JSON.parse(cached)
      const age = Date.now() - cacheData.timestamp
      
      if (age > maxAge) {
        this.clear(symbol, timeframe)
        return null
      }
      
      return cacheData.data
    } catch (error) {
      console.error('Failed to load cached data:', error)
      return null
    }
  }

  clear(symbol, timeframe) {
    const key = `${this.cacheKey}_${symbol}_${timeframe}`
    localStorage.removeItem(key)
  }

  clearAll() {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(this.cacheKey)) {
        localStorage.removeItem(key)
      }
    })
  }
}

// Usage
const cache = new ChartDataCache()

// Try to load from cache first
let data = cache.load('BTCUSDT', '1h')

if (!data) {
  // Fetch from API if not cached
  data = await fetchOHLCVData('BTCUSDT', '1h')
  cache.save('BTCUSDT', '1h', data)
}

chart.setData(data)
```

### IndexedDB Cache

```javascript
class IndexedDBCache {
  constructor(dbName = 'ChartDataDB', storeName = 'ohlcv') {
    this.dbName = dbName
    this.storeName = storeName
    this.db = null
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' })
        }
      }
    })
  }

  async save(symbol, timeframe, data) {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      
      const record = {
        id: `${symbol}_${timeframe}`,
        symbol,
        timeframe,
        data,
        timestamp: Date.now()
      }
      
      const request = store.put(record)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async load(symbol, timeframe) {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(`${symbol}_${timeframe}`)
      
      request.onsuccess = () => {
        const record = request.result
        resolve(record ? record.data : null)
      }
      request.onerror = () => reject(request.error)
    })
  }
}

// Usage
const cache = new IndexedDBCache()
await cache.init()

let data = await cache.load('BTCUSDT', '1h')

if (!data) {
  data = await fetchOHLCVData('BTCUSDT', '1h')
  await cache.save('BTCUSDT', '1h', data)
}

chart.setData(data)
```

## Data Pagination

### Loading Data on Demand

```javascript
class PaginatedDataLoader {
  constructor(chart, fetchFunction) {
    this.chart = chart
    this.fetchFunction = fetchFunction
    this.isLoading = false
    this.hasMore = true
    
    this.setupScrollListener()
  }

  setupScrollListener() {
    this.chart.on('scroll', (event) => {
      // Check if user scrolled to the left edge
      if (event.position < 0.1 && !this.isLoading && this.hasMore) {
        this.loadMore()
      }
    })
  }

  async loadMore() {
    this.isLoading = true
    
    try {
      const currentData = this.chart.getData()
      const oldestTimestamp = currentData[0][0]
      
      // Fetch older data
      const newData = await this.fetchFunction(oldestTimestamp)
      
      if (newData.length === 0) {
        this.hasMore = false
        return
      }
      
      // Prepend new data
      this.chart.prependData(newData)
    } catch (error) {
      console.error('Failed to load more data:', error)
    } finally {
      this.isLoading = false
    }
  }
}

// Usage
const loader = new PaginatedDataLoader(chart, async (beforeTimestamp) => {
  return await fetchOHLCVData('BTCUSDT', '1h', 500, beforeTimestamp)
})
```

## Data Compression

### Compressing for Storage

```javascript
function compressOHLCV(data) {
  // Store deltas instead of absolute values
  if (data.length === 0) return []
  
  const compressed = [data[0]] // First candle as-is
  
  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1]
    const curr = data[i]
    
    compressed.push([
      curr[0] - prev[0],  // timestamp delta
      curr[1] - prev[4],  // open delta from prev close
      curr[2] - curr[1],  // high delta from open
      curr[3] - curr[1],  // low delta from open
      curr[4] - curr[1],  // close delta from open
      curr[5]             // volume (no compression)
    ])
  }
  
  return compressed
}

function decompressOHLCV(compressed) {
  if (compressed.length === 0) return []
  
  const data = [compressed[0]]
  
  for (let i = 1; i < compressed.length; i++) {
    const prev = data[i - 1]
    const delta = compressed[i]
    
    const timestamp = prev[0] + delta[0]
    const open = prev[4] + delta[1]
    const high = open + delta[2]
    const low = open + delta[3]
    const close = open + delta[4]
    const volume = delta[5]
    
    data.push([timestamp, open, high, low, close, volume])
  }
  
  return data
}

// Usage
const compressed = compressOHLCV(ohlcvData)
localStorage.setItem('chart_data', JSON.stringify(compressed))

const loaded = JSON.parse(localStorage.getItem('chart_data'))
const decompressed = decompressOHLCV(loaded)
chart.setData(decompressed)
```

## Data Export

### Export to CSV

```javascript
function exportToCSV(data, filename = 'chart_data.csv') {
  const headers = ['Timestamp', 'Open', 'High', 'Low', 'Close', 'Volume']
  const rows = data.map(candle => candle.join(','))
  const csv = [headers.join(','), ...rows].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

// Usage
const data = chart.getData()
exportToCSV(data, 'btcusdt_1h.csv')
```

### Export to JSON

```javascript
function exportToJSON(data, filename = 'chart_data.json') {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

// Usage
const data = chart.getData()
exportToJSON(data, 'btcusdt_1h.json')
```

## Best Practices

### 1. Data Validation

Always validate data before adding to the chart:

```javascript
function safeAddCandle(chart, candle) {
  try {
    validateOHLCV(candle)
    chart.addCandle(candle)
  } catch (error) {
    console.error('Invalid candle:', error)
  }
}
```

### 2. Batch Updates

Batch multiple updates for better performance:

```javascript
// Bad: Multiple individual updates
candles.forEach(candle => chart.addCandle(candle))

// Good: Single batch update
chart.addCandles(candles)
```

### 3. Memory Management

Limit the amount of data in memory:

```javascript
const MAX_CANDLES = 10000

function addCandleWithLimit(chart, candle) {
  const currentData = chart.getData()
  
  if (currentData.length >= MAX_CANDLES) {
    // Remove oldest candle
    chart.removeCandles(1)
  }
  
  chart.addCandle(candle)
}
```

### 4. Error Handling

Always handle data loading errors:

```javascript
async function loadChartData(symbol, timeframe) {
  try {
    const data = await fetchOHLCVData(symbol, timeframe)
    chart.setData(data)
  } catch (error) {
    console.error('Failed to load chart data:', error)
    // Show error message to user
    showError('Failed to load chart data. Please try again.')
  }
}
```

## Related Documentation

- [Getting Started](../reference/01_getting_started) - Basic setup
- [WebSocket Integration](backend/websocket-integration) - Real-time data
- [Performance Optimization](performance) - Optimize data handling
- [API Reference](../api/core) - Data methods