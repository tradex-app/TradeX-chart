---
title: REST API Integration
description: Integrating TradeX Chart with REST API backends
---

Learn how to integrate TradeX Chart with REST API backends for fetching historical and real-time market data.

## Overview

REST APIs are the most common way to fetch market data. This guide covers:
- Fetching initial chart data
- Loading historical data on scroll
- Pagination and data management
- Error handling and retry logic
- Rate limiting considerations

## Basic Setup

### 1. Fetch Initial Data

```javascript
import { Chart } from 'tradex-chart'

async function fetchOHLCV(symbol, timeframe, limit = 500) {
  const response = await fetch(
    `https://api.example.com/v1/ohlcv?symbol=${symbol}&timeframe=${timeframe}&limit=${limit}`
  )
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const data = await response.json()
  
  // Transform to TradeX format [timestamp, open, high, low, close, volume]
  return data.map(candle => [
    candle.timestamp,
    candle.open,
    candle.high,
    candle.low,
    candle.close,
    candle.volume
  ])
}

// Initialize chart with fetched data
async function initChart() {
  const ohlcv = await fetchOHLCV('BTCUSDT', '1h', 500)
  
  const config = {
    title: 'BTC/USDT',
    symbol: 'BTCUSDT',
    state: {
      ohlcv: ohlcv
    }
  }
  
  const chart = document.createElement('tradex-chart')
  document.getElementById('chart-container').appendChild(chart)
  chart.start(config)
}

initChart().catch(console.error)
```

### 2. Load More Data on Scroll

```javascript
class ChartDataManager {
  constructor(chart, symbol, timeframe) {
    this.chart = chart
    this.symbol = symbol
    this.timeframe = timeframe
    this.isLoading = false
    this.hasMoreData = true
    
    this.setupScrollListener()
  }
  
  setupScrollListener() {
    this.chart.on('chart_pan', this.handlePan.bind(this))
  }
  
  async handlePan(event) {
    const scrollPos = this.chart.scrollPos
    
    // Load more data when near the start
    if (scrollPos < 100 && !this.isLoading && this.hasMoreData) {
      await this.loadMoreData()
    }
  }
  
  async loadMoreData() {
    this.isLoading = true
    
    try {
      const currentData = this.chart.state.data.chart.data
      const oldestTimestamp = currentData[0][0]
      
      // Fetch data before the oldest timestamp
      const response = await fetch(
        `https://api.example.com/v1/ohlcv?` +
        `symbol=${this.symbol}&` +
        `timeframe=${this.timeframe}&` +
        `end=${oldestTimestamp}&` +
        `limit=100`
      )
      
      const newData = await response.json()
      
      if (newData.length === 0) {
        this.hasMoreData = false
        return
      }
      
      // Format and prepend new data
      const formattedData = newData.map(candle => [
        candle.timestamp,
        candle.open,
        candle.high,
        candle.low,
        candle.close,
        candle.volume
      ])
      
      this.chart.mergeData(formattedData, 'prepend')
      
    } catch (error) {
      console.error('Failed to load more data:', error)
    } finally {
      this.isLoading = false
    }
  }
}

// Usage
const dataManager = new ChartDataManager(chart, 'BTCUSDT', '1h')
```

## Advanced Patterns

### 3. Data Caching

```javascript
class CachedDataFetcher {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.cache = new Map()
    this.cacheExpiry = 5 * 60 * 1000 // 5 minutes
  }
  
  getCacheKey(symbol, timeframe, start, end) {
    return `${symbol}:${timeframe}:${start}:${end}`
  }
  
  async fetchOHLCV(symbol, timeframe, start, end) {
    const cacheKey = this.getCacheKey(symbol, timeframe, start, end)
    const cached = this.cache.get(cacheKey)
    
    // Return cached data if valid
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data
    }
    
    // Fetch fresh data
    const url = new URL(`${this.baseURL}/ohlcv`)
    url.searchParams.append('symbol', symbol)
    url.searchParams.append('timeframe', timeframe)
    if (start) url.searchParams.append('start', start)
    if (end) url.searchParams.append('end', end)
    
    const response = await fetch(url)
    const data = await response.json()
    
    // Cache the result
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    })
    
    return data
  }
  
  clearCache() {
    this.cache.clear()
  }
}

const fetcher = new CachedDataFetcher('https://api.example.com/v1')
```

### 4. Error Handling with Retry Logic

```javascript
class RobustDataFetcher {
  constructor(baseURL, maxRetries = 3) {
    this.baseURL = baseURL
    this.maxRetries = maxRetries
  }
  
  async fetchWithRetry(url, options = {}, retryCount = 0) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })
      
      clearTimeout(timeout)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return await response.json()
      
    } catch (error) {
      if (retryCount < this.maxRetries) {
        // Exponential backoff
        const delay = Math.pow(2, retryCount) * 1000
        console.log(`Retry ${retryCount + 1}/${this.maxRetries} after ${delay}ms`)
        
        await new Promise(resolve => setTimeout(resolve, delay))
        return this.fetchWithRetry(url, options, retryCount + 1)
      }
      
      throw error
    }
  }
  
  async fetchOHLCV(symbol, timeframe, params = {}) {
    const url = new URL(`${this.baseURL}/ohlcv`)
    url.searchParams.append('symbol', symbol)
    url.searchParams.append('timeframe', timeframe)
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
    
    return this.fetchWithRetry(url.toString())
  }
}
```

### 5. Rate Limiting

```javascript
class RateLimitedFetcher {
  constructor(baseURL, requestsPerSecond = 10) {
    this.baseURL = baseURL
    this.minInterval = 1000 / requestsPerSecond
    this.lastRequestTime = 0
    this.queue = []
    this.processing = false
  }
  
  async fetch(endpoint, params = {}) {
    return new Promise((resolve, reject) => {
      this.queue.push({ endpoint, params, resolve, reject })
      this.processQueue()
    })
  }
  
  async processQueue() {
    if (this.processing || this.queue.length === 0) return
    
    this.processing = true
    
    while (this.queue.length > 0) {
      const now = Date.now()
      const timeSinceLastRequest = now - this.lastRequestTime
      
      if (timeSinceLastRequest < this.minInterval) {
        await new Promise(resolve => 
          setTimeout(resolve, this.minInterval - timeSinceLastRequest)
        )
      }
      
      const { endpoint, params, resolve, reject } = this.queue.shift()
      this.lastRequestTime = Date.now()
      
      try {
        const url = new URL(`${this.baseURL}${endpoint}`)
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value)
        })
        
        const response = await fetch(url)
        const data = await response.json()
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }
    
    this.processing = false
  }
}

const fetcher = new RateLimitedFetcher('https://api.example.com/v1', 10)
```

## Exchange-Specific Examples

### Binance API

```javascript
async function fetchBinanceData(symbol, interval, limit = 500) {
  const response = await fetch(
    `https://api.binance.com/api/v3/klines?` +
    `symbol=${symbol}&interval=${interval}&limit=${limit}`
  )
  
  const data = await response.json()
  
  return data.map(candle => [
    candle[0],              // timestamp
    parseFloat(candle[1]),  // open
    parseFloat(candle[2]),  // high
    parseFloat(candle[3]),  // low
    parseFloat(candle[4]),  // close
    parseFloat(candle[5])   // volume
  ])
}

// Usage
const ohlcv = await fetchBinanceData('BTCUSDT', '1h', 500)
```

### Coinbase API

```javascript
async function fetchCoinbaseData(productId, granularity, start, end) {
  const response = await fetch(
    `https://api.exchange.coinbase.com/products/${productId}/candles?` +
    `granularity=${granularity}&start=${start}&end=${end}`
  )
  
  const data = await response.json()
  
  // Coinbase returns [time, low, high, open, close, volume]
  return data.map(candle => [
    candle[0] * 1000,  // timestamp (convert to ms)
    candle[3],         // open
    candle[2],         // high
    candle[1],         // low
    candle[4],         // close
    candle[5]          // volume
  ]).reverse() // Coinbase returns newest first
}
```

## Best Practices

### 1. Data Validation

```javascript
function validateOHLCV(data) {
  if (!Array.isArray(data)) {
    throw new Error('Data must be an array')
  }
  
  return data.filter(candle => {
    if (!Array.isArray(candle) || candle.length < 6) return false
    
    const [timestamp, open, high, low, close, volume] = candle
    
    // Validate types
    if (typeof timestamp !== 'number') return false
    if (typeof open !== 'number' || isNaN(open)) return false
    if (typeof high !== 'number' || isNaN(high)) return false
    if (typeof low !== 'number' || isNaN(low)) return false
    if (typeof close !== 'number' || isNaN(close)) return false
    if (typeof volume !== 'number' || isNaN(volume)) return false
    
    // Validate relationships
    if (high < low) return false
    if (high < open || high < close) return false
    if (low > open || low > close) return false
    
    return true
  })
}
```

### 2. Loading States

```javascript
class ChartWithLoading {
  constructor(containerId) {
    this.container = document.getElementById(containerId)
    this.chart = null
    this.loadingIndicator = this.createLoadingIndicator()
  }
  
  createLoadingIndicator() {
    const loader = document.createElement('div')
    loader.className = 'chart-loading'
    loader.innerHTML = '<div class="spinner"></div><p>Loading chart data...</p>'
    return loader
  }
  
  showLoading() {
    this.container.appendChild(this.loadingIndicator)
  }
  
  hideLoading() {
    this.loadingIndicator.remove()
  }
  
  async initialize(symbol, timeframe) {
    this.showLoading()
    
    try {
      const data = await fetchOHLCV(symbol, timeframe)
      
      this.chart = document.createElement('tradex-chart')
      this.container.appendChild(this.chart)
      
      this.chart.start({
        title: symbol,
        state: { ohlcv: data }
      })
      
    } catch (error) {
      this.showError(error.message)
    } finally {
      this.hideLoading()
    }
  }
  
  showError(message) {
    const error = document.createElement('div')
    error.className = 'chart-error'
    error.textContent = `Error: ${message}`
    this.container.appendChild(error)
  }
}
```

### 3. Timeframe Conversion

```javascript
const TIMEFRAME_MAP = {
  '1m': 60,
  '5m': 300,
  '15m': 900,
  '30m': 1800,
  '1h': 3600,
  '4h': 14400,
  '1d': 86400,
  '1w': 604800
}

function getTimeframeSeconds(timeframe) {
  return TIMEFRAME_MAP[timeframe] || 3600
}

function convertTimeframe(from, to) {
  const fromSeconds = TIMEFRAME_MAP[from]
  const toSeconds = TIMEFRAME_MAP[to]
  
  if (!fromSeconds || !toSeconds) {
    throw new Error('Invalid timeframe')
  }
  
  return toSeconds / fromSeconds
}
```

## Complete Example

```javascript
import { Chart } from 'tradex-chart'

class TradingChartApp {
  constructor(containerId, apiConfig) {
    this.container = document.getElementById(containerId)
    this.apiConfig = apiConfig
    this.chart = null
    this.dataManager = null
  }
  
  async initialize(symbol, timeframe) {
    try {
      // Fetch initial data
      const data = await this.fetchData(symbol, timeframe, 500)
      
      // Create chart
      this.chart = document.createElement('tradex-chart')
      this.container.appendChild(this.chart)
      
      this.chart.start({
        title: symbol,
        symbol: symbol,
        state: {
          ohlcv: data
        }
      })
      
      // Setup data manager for infinite scroll
      this.dataManager = new ChartDataManager(
        this.chart,
        symbol,
        timeframe
      )
      
    } catch (error) {
      console.error('Failed to initialize chart:', error)
      this.showError(error.message)
    }
  }
  
  async fetchData(symbol, timeframe, limit) {
    const response = await fetch(
      `${this.apiConfig.baseURL}/ohlcv?` +
      `symbol=${symbol}&timeframe=${timeframe}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${this.apiConfig.apiKey}`
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    return this.formatData(data)
  }
  
  formatData(data) {
    return data.map(candle => [
      candle.timestamp,
      candle.open,
      candle.high,
      candle.low,
      candle.close,
      candle.volume
    ])
  }
  
  showError(message) {
    const errorDiv = document.createElement('div')
    errorDiv.className = 'error-message'
    errorDiv.textContent = message
    this.container.appendChild(errorDiv)
  }
}

// Usage
const app = new TradingChartApp('chart-container', {
  baseURL: 'https://api.example.com/v1',
  apiKey: 'your-api-key'
})

app.initialize('BTCUSDT', '1h')
```

## Related Documentation

- [WebSocket Integration](websocket-integration) - Real-time data streaming
- [GraphQL Integration](graphql-integration) - Alternative API approach
- [Data Caching Strategies](data-caching-strategies) - Optimize data fetching
- [Configuration](../../reference/02_configuration) - Chart configuration options
- [State Management](../../reference/state) - Managing chart state

## Troubleshooting

### CORS Issues
If you encounter CORS errors:
- Configure your API server to allow CORS
- Use a proxy server
- Contact your API provider for CORS support

### Rate Limiting
Most APIs have rate limits. Implement:
- Request queuing
- Exponential backoff
- Caching strategies
- Batch requests when possible

### Data Gaps
Handle missing data gracefully:
- Validate data before rendering
- Fill gaps with null values or interpolation
- Show warnings to users
- Log issues for debugging