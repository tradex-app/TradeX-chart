---
title: WebSocket Integration
description: Real-time data streaming with WebSocket connections
---

# WebSocket Integration

Learn how to integrate real-time market data into TradeX Chart using WebSocket connections for live price updates.

## Overview

WebSockets provide bi-directional, real-time communication ideal for:
- **Live price updates** - Streaming tick data
- **Real-time candles** - Updating candles as they form
- **Low latency** - Faster than polling REST APIs
- **Efficient** - Single persistent connection
- **Event-driven** - Push-based updates

## Basic WebSocket Setup

### 1. Simple Connection

```javascript
import { Chart } from 'tradex-chart'

class ChartWebSocket {
  constructor(chart, url) {
    this.chart = chart
    this.url = url
    this.ws = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
  }
  
  connect() {
    this.ws = new WebSocket(this.url)
    
    this.ws.onopen = this.handleOpen.bind(this)
    this.ws.onmessage = this.handleMessage.bind(this)
    this.ws.onerror = this.handleError.bind(this)
    this.ws.onclose = this.handleClose.bind(this)
  }
  
  handleOpen(event) {
    console.log('WebSocket connected')
    this.reconnectAttempts = 0
    
    // Subscribe to symbol
    this.subscribe('BTCUSDT')
  }
  
  handleMessage(event) {
    try {
      const data = JSON.parse(event.data)
      
      if (data.type === 'candle') {
        this.updateChart(data)
      }
    } catch (error) {
      console.error('Failed to parse message:', error)
    }
  }
  
  handleError(error) {
    console.error('WebSocket error:', error)
  }
  
  handleClose(event) {
    console.log('WebSocket closed:', event.code, event.reason)
    
    // Attempt reconnection
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000)
      
      console.log(`Reconnecting in ${delay}ms...`)
      setTimeout(() => this.connect(), delay)
    }
  }
  
  subscribe(symbol) {
    const message = JSON.stringify({
      type: 'subscribe',
      symbol: symbol,
      channel: 'candles'
    })
    
    this.ws.send(message)
  }
  
  updateChart(data) {
    const candle = [
      data.timestamp,
      data.open,
      data.high,
      data.low,
      data.close,
      data.volume
    ]
    
    if (data.isClosed) {
      this.chart.addCandle(candle)
    } else {
      this.chart.updateStreamingCandle(candle)
    }
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

// Usage
const chart = document.querySelector('tradex-chart')
const wsClient = new ChartWebSocket(chart, 'wss://api.example.com/ws')
wsClient.connect()
```

### 2. Streaming Price Updates

```javascript
class StreamingChart {
  constructor(chart, candleInterval = 60000) {
    this.chart = chart
    this.currentCandle = null
    this.candleInterval = candleInterval // 1 minute default
  }
  
  handleTick(tick) {
    const timestamp = Math.floor(tick.timestamp / this.candleInterval) * this.candleInterval
    
    if (!this.currentCandle || this.currentCandle[0] !== timestamp) {
      // New candle period
      if (this.currentCandle) {
        // Finalize previous candle
        this.chart.addCandle(this.currentCandle)
      }
      
      // Start new candle
      this.currentCandle = [
        timestamp,
        tick.price,  // open
        tick.price,  // high
        tick.price,  // low
        tick.price,  // close
        tick.volume  // volume
      ]
    } else {
      // Update current candle
      this.currentCandle[2] = Math.max(this.currentCandle[2], tick.price) // high
      this.currentCandle[3] = Math.min(this.currentCandle[3], tick.price) // low
      this.currentCandle[4] = tick.price // close
      this.currentCandle[5] += tick.volume // volume
    }
    
    // Update chart with streaming candle
    this.chart.updateStreamingCandle(this.currentCandle)
  }
}
```

## Advanced Patterns

### 3. Robust Reconnection Strategy

```javascript
class RobustWebSocket {
  constructor(url, options = {}) {
    this.url = url
    this.options = {
      reconnectInterval: 1000,
      maxReconnectInterval: 30000,
      reconnectDecay: 1.5,
      maxReconnectAttempts: null,
      ...options
    }
    
    this.ws = null
    this.reconnectAttempts = 0
    this.reconnectTimer = null
    this.forcedClose = false
    this.messageQueue = []
  }
  
  connect() {
    this.forcedClose = false
    this.ws = new WebSocket(this.url)
    
    this.ws.onopen = (event) => {
      console.log('WebSocket connected')
      this.reconnectAttempts = 0
      
      // Flush message queue
      while (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift()
        this.ws.send(message)
      }
      
      if (this.options.onopen) {
        this.options.onopen(event)
      }
    }
    
    this.ws.onmessage = (event) => {
      if (this.options.onmessage) {
        this.options.onmessage(event)
      }
    }
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      
      if (this.options.onerror) {
        this.options.onerror(error)
      }
    }
    
    this.ws.onclose = (event) => {
      console.log('WebSocket closed')
      
      if (this.options.onclose) {
        this.options.onclose(event)
      }
      
      if (!this.forcedClose) {
        this.reconnect()
      }
    }
  }
  
  reconnect() {
    if (
      this.options.maxReconnectAttempts &&
      this.reconnectAttempts >= this.options.maxReconnectAttempts
    ) {
      console.error('Max reconnection attempts reached')
      return
    }
    
    this.reconnectAttempts++
    
    const timeout = Math.min(
      this.options.reconnectInterval * Math.pow(this.options.reconnectDecay, this.reconnectAttempts),
      this.options.maxReconnectInterval
    )
    
    console.log(`Reconnecting in ${timeout}ms (attempt ${this.reconnectAttempts})`)
    
    this.reconnectTimer = setTimeout(() => {
      console.log('Reconnecting...')
      this.connect()
    }, timeout)
  }
  
  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data)
    } else {
      // Queue message for later
      this.messageQueue.push(data)
    }
  }
  
  close() {
    this.forcedClose = true
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
    }
    
    if (this.ws) {
      this.ws.close()
    }
  }
}

// Usage
const ws = new RobustWebSocket('wss://api.example.com/ws', {
  onopen: () => console.log('Connected!'),
  onmessage: (event) => handleMessage(event),
  reconnectInterval: 1000,
  maxReconnectAttempts: 10
})

ws.connect()
```

### 4. Multi-Symbol Management

```javascript
class MultiSymbolWebSocket {
  constructor(url) {
    this.url = url
    this.ws = null
    this.subscriptions = new Map()
    this.charts = new Map()
  }
  
  connect() {
    this.ws = new WebSocket(this.url)
    
    this.ws.onopen = () => {
      console.log('Connected')
      // Resubscribe to all symbols
      this.subscriptions.forEach((_, symbol) => {
        this.subscribe(symbol)
      })
    }
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const chart = this.charts.get(data.symbol)
      
      if (chart) {
        this.updateChart(chart, data)
      }
    }
  }
  
  addChart(symbol, chart) {
    this.charts.set(symbol, chart)
    this.subscribe(symbol)
  }
  
  removeChart(symbol) {
    this.charts.delete(symbol)
    this.unsubscribe(symbol)
  }
  
  subscribe(symbol) {
    if (!this.subscriptions.has(symbol)) {
      this.subscriptions.set(symbol, true)
      
      this.ws.send(JSON.stringify({
        type: 'subscribe',
        symbol: symbol
      }))
    }
  }
  
  unsubscribe(symbol) {
    if (this.subscriptions.has(symbol)) {
      this.subscriptions.delete(symbol)
      
      this.ws.send(JSON.stringify({
        type: 'unsubscribe',
        symbol: symbol
      }))
    }
  }
  
  updateChart(chart, data) {
    const candle = [
      data.timestamp,
      data.open,
      data.high,
      data.low,
      data.close,
      data.volume
    ]
    
    if (data.isClosed) {
      chart.addCandle(candle)
    } else {
      chart.updateStreamingCandle(candle)
    }
  }
}
```

### 5. Heartbeat/Ping-Pong

```javascript
class WebSocketWithHeartbeat {
  constructor(url, heartbeatInterval = 30000) {
    this.url = url
    this.heartbeatInterval = heartbeatInterval
    this.heartbeatTimer = null
    this.pongTimeout = null
    this.ws = null
  }
  
  connect() {
    this.ws = new WebSocket(this.url)
    
    this.ws.onopen = () => {
      console.log('Connected')
      this.startHeartbeat()
    }
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'pong') {
        // Heartbeat acknowledged
        clearTimeout(this.pongTimeout)
        return
      }
      
      // Handle other messages
      this.handleMessage(data)
    }
    
    this.ws.onclose = () => {
      this.stopHeartbeat()
    }
  }
  
  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }))
        
        // Expect pong within 5 seconds
        this.pongTimeout = setTimeout(() => {
          console.error('Heartbeat timeout, reconnecting...')
          this.ws.close()
        }, 5000)
      }
    }, this.heartbeatInterval)
  }
  
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
    
    if (this.pongTimeout) {
      clearTimeout(this.pongTimeout)
      this.pongTimeout = null
    }
  }
  
  handleMessage(data) {
    // Handle regular messages
  }
}
```

## Exchange-Specific Examples

### Binance WebSocket

```javascript
class BinanceWebSocket {
  constructor(chart, symbol) {
    this.chart = chart
    this.symbol = symbol.toLowerCase()
    this.ws = null
  }
  
  connect(interval = '1m') {
    // Binance WebSocket endpoint
    const url = `wss://stream.binance.com:9443/ws/${this.symbol}@kline_${interval}`
    
    this.ws = new WebSocket(url)
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.e === 'kline') {
        const kline = data.k
        const candle = [
          kline.t,                    // timestamp
          parseFloat(kline.o),        // open
          parseFloat(kline.h),        // high
          parseFloat(kline.l),        // low
          parseFloat(kline.c),        // close
          parseFloat(kline.v)         // volume
        ]
        
        if (kline.x) {
          // Candle is closed
          this.chart.addCandle(candle)
        } else {
          // Candle is still forming
          this.chart.updateStreamingCandle(candle)
        }
      }
    }
    
    this.ws.onerror = (error) => {
      console.error('Binance WebSocket error:', error)
    }
    
    this.ws.onclose = () => {
      console.log('Binance WebSocket closed')
      // Implement reconnection logic
    }
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close()
    }
  }
}

// Usage
const chart = document.querySelector('tradex-chart')
const binanceWS = new BinanceWebSocket(chart, 'BTCUSDT')
binanceWS.connect('1m')
```

### Coinbase WebSocket

```javascript
class CoinbaseWebSocket {
  constructor(chart, productId) {
    this.chart = chart
    this.productId = productId
    this.ws = null
    this.streamingChart = new StreamingChart(chart, 60000)
  }
  
  connect() {
    this.ws = new WebSocket('wss://ws-feed.exchange.coinbase.com')
    
    this.ws.onopen = () => {
      // Subscribe to ticker channel
      this.ws.send(JSON.stringify({
        type: 'subscribe',
        product_ids: [this.productId],
        channels: ['ticker']
      }))
    }
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'ticker') {
        const tick = {
          timestamp: new Date(data.time).getTime(),
          price: parseFloat(data.price),
          volume: parseFloat(data.last_size)
        }
        
        this.streamingChart.handleTick(tick)
      }
    }
    
    this.ws.onerror = (error) => {
      console.error('Coinbase WebSocket error:', error)
    }
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.send(JSON.stringify({
        type: 'unsubscribe',
        product_ids: [this.productId],
        channels: ['ticker']
      }))
      this.ws.close()
    }
  }
}

// Usage
const chart = document.querySelector('tradex-chart')
const coinbaseWS = new CoinbaseWebSocket(chart, 'BTC-USD')
coinbaseWS.connect()
```

### Kraken WebSocket

```javascript
class KrakenWebSocket {
  constructor(chart, pair) {
    this.chart = chart
    this.pair = pair
    this.ws = null
  }
  
  connect(interval = 1) {
    this.ws = new WebSocket('wss://ws.kraken.com')
    
    this.ws.onopen = () => {
      // Subscribe to OHLC channel
      this.ws.send(JSON.stringify({
        event: 'subscribe',
        pair: [this.pair],
        subscription: {
          name: 'ohlc',
          interval: interval
        }
      }))
    }
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      // Kraken sends array format for OHLC data
      if (Array.isArray(data) && data[2] === 'ohlc') {
        const ohlc = data[1]
        const candle = [
          parseFloat(ohlc[1]) * 1000,  // timestamp (convert to ms)
          parseFloat(ohlc[2]),          // open
          parseFloat(ohlc[3]),          // high
          parseFloat(ohlc[4]),          // low
          parseFloat(ohlc[5]),          // close
          parseFloat(ohlc[7])           // volume
        ]
        
        // Check if candle is closed (last value in array)
        if (data[1][8] === '1') {
          this.chart.addCandle(candle)
        } else {
          this.chart.updateStreamingCandle(candle)
        }
      }
    }
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close()
    }
  }
}
```

## Best Practices

### 1. Connection Management

```javascript
class ConnectionManager {
  constructor(url) {
    this.url = url
    this.ws = null
    this.isConnecting = false
    this.isConnected = false
  }
  
  async connect() {
    if (this.isConnecting || this.isConnected) {
      return
    }
    
    this.isConnecting = true
    
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url)
      
      const timeout = setTimeout(() => {
        reject(new Error('Connection timeout'))
        this.ws.close()
      }, 10000)
      
      this.ws.onopen = () => {
        clearTimeout(timeout)
        this.isConnecting = false
        this.isConnected = true
        resolve()
      }
      
      this.ws.onerror = (error) => {
        clearTimeout(timeout)
        this.isConnecting = false
        reject(error)
      }
    })
  }
  
  getState() {
    if (!this.ws) return 'DISCONNECTED'
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING: return 'CONNECTING'
      case WebSocket.OPEN: return 'CONNECTED'
      case WebSocket.CLOSING: return 'CLOSING'
      case WebSocket.CLOSED: return 'CLOSED'
      default: return 'UNKNOWN'
    }
  }
}
```

### 2. Message Buffering

```javascript
class BufferedWebSocket {
  constructor(url, bufferSize = 100) {
    this.url = url
    this.ws = null
    this.buffer = []
    this.bufferSize = bufferSize
  }
  
  connect() {
    this.ws = new WebSocket(this.url)
    
    this.ws.onmessage = (event) => {
      this.buffer.push(JSON.parse(event.data))
      
      // Keep buffer size limited
      if (this.buffer.length > this.bufferSize) {
        this.buffer.shift()
      }
      
      this.processBuffer()
    }
  }
  
  processBuffer() {
    // Process messages in batches for better performance
    const batch = this.buffer.splice(0, 10)
    
    batch.forEach(message => {
      this.handleMessage(message)
    })
  }
  
  handleMessage(message) {
    // Handle individual message
  }
}
```

### 3. Error Recovery

```javascript
class ResilientWebSocket {
  constructor(url) {
    this.url = url
    this.ws = null
    this.subscriptions = []
  }
  
  connect() {
    this.ws = new WebSocket(this.url)
    
    this.ws.onopen = () => {
      // Restore subscriptions after reconnect
      this.subscriptions.forEach(sub => {
        this.ws.send(JSON.stringify(sub))
      })
    }
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      // Log error for debugging
      this.logError(error)
    }
    
    this.ws.onclose = (event) => {
      if (event.code !== 1000) {
        // Abnormal closure, attempt recovery
        console.log('Abnormal closure, reconnecting...')
        setTimeout(() => this.connect(), 1000)
      }
    }
  }
  
  subscribe(subscription) {
    this.subscriptions.push(subscription)
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(subscription))
    }
  }
  
  logError(error) {
    // Send to error tracking service
    console.error('WebSocket error logged:', error)
  }
}
```

## Complete Example

```javascript
import { Chart } from 'tradex-chart'

class RealtimeChartApp {
  constructor(containerId) {
    this.container = document.getElementById(containerId)
    this.chart = null
    this.ws = null
  }
  
  async initialize(symbol, timeframe) {
    // Create chart
    this.chart = document.createElement('tradex-chart')
    this.container.appendChild(this.chart)
    
    // Load initial historical data
    const historicalData = await this.fetchHistoricalData(symbol, timeframe)
    
    this.chart.start({
      title: symbol,
      state: { ohlcv: historicalData }
    })
    
    // Connect WebSocket for real-time updates
    this.connectWebSocket(symbol, timeframe)
  }
  
  async fetchHistoricalData(symbol, timeframe) {
    const response = await fetch(
      `https://api.example.com/ohlcv?symbol=${symbol}&timeframe=${timeframe}&limit=500`
    )
    return response.json()
  }
  
  connectWebSocket(symbol, timeframe) {
    this.ws = new RobustWebSocket('wss://api.example.com/ws', {
      onopen: () => {
        console.log('WebSocket connected')
        this.ws.send(JSON.stringify({
          type: 'subscribe',
          symbol: symbol,
          timeframe: timeframe
        }))
      },
      onmessage: (event) => {
        const data = JSON.parse(event.data)
        this.handleUpdate(data)
      },
      onerror: (error) => {
        console.error('WebSocket error:', error)
        this.showError('Connection error')
      }
    })
    
    this.ws.connect()
  }
  
  handleUpdate(data) {
    const candle = [
      data.timestamp,
      data.open,
      data.high,
      data.low,
      data.close,
      data.volume
    ]
    
    if (data.isClosed) {
      this.chart.addCandle(candle)
    } else {
      this.chart.updateStreamingCandle(candle)
    }
  }
  
  showError(message) {
    console.error(message)
    // Display error to user
  }
  
  destroy() {
    if (this.ws) {
      this.ws.close()
    }
  }
}

// Usage
const app = new RealtimeChartApp('chart-container')
await app.initialize('BTCUSDT', '1m')
```

## Related Documentation

- [REST API Integration](rest-api-integration) - Fetching historical data
- [GraphQL Integration](graphql-integration) - Alternative real-time approach
- [Data Caching](data-caching-strategies) - Optimize performance
- [Streaming Data](../../reference/streaming_price_data) - Chart streaming features
- [State Management](../../reference/state) - Managing chart state

## Troubleshooting

### Connection Drops
- Implement exponential backoff for reconnection
- Use heartbeat/ping-pong to detect dead connections
- Handle network changes gracefully

### Message Loss
- Buffer messages during reconnection
- Request missed data after reconnect
- Implement sequence numbers if supported

### Performance Issues
- Batch process messages
- Throttle updates if too frequent
- Use Web Workers for heavy processing

### Authentication
- Send auth token after connection
- Refresh tokens before expiry
- Handle auth failures gracefully