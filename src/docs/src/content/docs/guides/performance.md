---
title: Performance Optimization
description: Optimize TradeX Chart for maximum performance
---

# Performance Optimization

Learn how to optimize TradeX Chart for maximum performance and smooth rendering.

## Data Optimization

### Limit Data Points

Limit the number of candles loaded in memory:

```javascript
const MAX_CANDLES = 5000

function loadDataWithLimit(chart, data) {
  if (data.length > MAX_CANDLES) {
    // Keep only the most recent candles
    const trimmedData = data.slice(-MAX_CANDLES)
    chart.setData(trimmedData)
  } else {
    chart.setData(data)
  }
}
```

### Lazy Loading

Load data on demand as users scroll:

```javascript
class LazyDataLoader {
  constructor(chart, fetchFunction) {
    this.chart = chart
    this.fetchFunction = fetchFunction
    this.loading = false
    
    this.chart.on('scroll', this.onScroll.bind(this))
  }

  async onScroll(event) {
    if (event.position < 0.1 && !this.loading) {
      this.loading = true
      const oldData = await this.fetchFunction()
      this.chart.prependData(oldData)
      this.loading = false
    }
  }
}
```

### Data Decimation

Reduce data points for distant time ranges:

```javascript
function decimateData(data, factor) {
  if (factor <= 1) return data
  
  const decimated = []
  for (let i = 0; i < data.length; i += factor) {
    decimated.push(data[i])
  }
  return decimated
}

// Use when zoomed out
const zoomLevel = chart.getZoomLevel()
if (zoomLevel < 0.5) {
  const decimated = decimateData(fullData, 2)
  chart.setData(decimated)
}
```

## Rendering Optimization

### Throttle Updates

Throttle rapid updates to reduce rendering:

```javascript
class ThrottledUpdater {
  constructor(chart, delay = 100) {
    this.chart = chart
    this.delay = delay
    this.pending = null
    this.timer = null
  }

  update(candle) {
    this.pending = candle
    
    if (!this.timer) {
      this.timer = setTimeout(() => {
        if (this.pending) {
          this.chart.updateStreamingCandle(this.pending)
          this.pending = null
        }
        this.timer = null
      }, this.delay)
    }
  }
}

// Usage
const updater = new ThrottledUpdater(chart, 50)

ws.onmessage = (event) => {
  const candle = parseCandle(event.data)
  updater.update(candle)
}
```

### Debounce Resize

Debounce window resize events:

```javascript
let resizeTimer

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    chart.resize()
  }, 250)
})
```

### Disable Animations

Disable animations for better performance:

```javascript
chart.start({
  animations: false,
  // ... other config
})
```

## Indicator Optimization

### Limit Active Indicators

Limit the number of active indicators:

```javascript
const MAX_INDICATORS = 5

function addIndicatorWithLimit(chart, name, params) {
  const indicators = chart.getIndicators()
  
  if (indicators.length >= MAX_INDICATORS) {
    // Remove oldest indicator
    chart.removeIndicator(indicators[0].id)
  }
  
  return chart.addIndicator(name, params)
}
```

### Cache Indicator Calculations

```javascript
class CachedIndicator {
  constructor(indicator) {
    this.indicator = indicator
    this.cache = new Map()
  }

  calculate(data, params) {
    const key = this.getCacheKey(data, params)
    
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }
    
    const result = this.indicator.calculate(data, params)
    this.cache.set(key, result)
    
    // Limit cache size
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    
    return result
  }

  getCacheKey(data, params) {
    return `${data.length}_${JSON.stringify(params)}`
  }
}
```

## Memory Management

### Clear Unused Data

```javascript
function clearOldData(chart, maxAge) {
  const data = chart.getData()
  const cutoff = Date.now() - maxAge
  
  const filtered = data.filter(candle => candle[0] >= cutoff)
  chart.setData(filtered)
}

// Clear data older than 7 days
setInterval(() => {
  clearOldData(chart, 7 * 24 * 60 * 60 * 1000)
}, 60 * 60 * 1000) // Check every hour
```

### Cleanup on Destroy

```javascript
function destroyChart(chart) {
  // Remove event listeners
  chart.off('all')
  
  // Clear data
  chart.clearData()
  
  // Destroy chart
  chart.destroy()
  
  // Clear references
  chart = null
}
```

### Use WeakMap for References

```javascript
const chartData = new WeakMap()

function storeChartData(chart, data) {
  chartData.set(chart, data)
}

function getChartData(chart) {
  return chartData.get(chart)
}

// Data will be garbage collected when chart is destroyed
```

## Canvas Optimization

### Use OffscreenCanvas

```javascript
if (typeof OffscreenCanvas !== 'undefined') {
  chart.start({
    useOffscreenCanvas: true,
    // ... other config
  })
}
```

### Reduce Canvas Resolution

For lower-end devices:

```javascript
const pixelRatio = window.devicePixelRatio

chart.start({
  pixelRatio: Math.min(pixelRatio, 2), // Cap at 2x
  // ... other config
})
```

## Network Optimization

### Compress Data

```javascript
async function fetchCompressedData(url) {
  const response = await fetch(url, {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br'
    }
  })
  
  return response.json()
}
```

### Use WebSocket for Real-time

WebSocket is more efficient than polling:

```javascript
// Bad: Polling
setInterval(async () => {
  const data = await fetch('/api/latest')
  chart.updateStreamingCandle(data)
}, 1000)

// Good: WebSocket
const ws = new WebSocket('wss://api.example.com')
ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  chart.updateStreamingCandle(data)
}
```

### Batch API Requests

```javascript
class BatchedFetcher {
  constructor(fetchFunction, batchSize = 10, delay = 100) {
    this.fetchFunction = fetchFunction
    this.batchSize = batchSize
    this.delay = delay
    this.queue = []
    this.timer = null
  }

  fetch(symbol) {
    return new Promise((resolve, reject) => {
      this.queue.push({ symbol, resolve, reject })
      
      if (!this.timer) {
        this.timer = setTimeout(() => this.processBatch(), this.delay)
      }
      
      if (this.queue.length >= this.batchSize) {
        clearTimeout(this.timer)
        this.processBatch()
      }
    })
  }

  async processBatch() {
    const batch = this.queue.splice(0, this.batchSize)
    this.timer = null
    
    try {
      const symbols = batch.map(item => item.symbol)
      const results = await this.fetchFunction(symbols)
      
      batch.forEach((item, index) => {
        item.resolve(results[index])
      })
    } catch (error) {
      batch.forEach(item => item.reject(error))
    }
  }
}
```

## Browser Optimization

### Use RequestAnimationFrame

```javascript
class AnimationLoop {
  constructor(chart) {
    this.chart = chart
    this.running = false
    this.updates = []
  }

  start() {
    this.running = true
    this.loop()
  }

  stop() {
    this.running = false
  }

  queueUpdate(update) {
    this.updates.push(update)
  }

  loop() {
    if (!this.running) return
    
    if (this.updates.length > 0) {
      const updates = this.updates.splice(0)
      updates.forEach(update => update())
    }
    
    requestAnimationFrame(() => this.loop())
  }
}
```

### Use Web Workers

```javascript
// worker.js
self.onmessage = function(e) {
  const { data, params } = e.data
  const result = calculateIndicator(data, params)
  self.postMessage(result)
}

// main.js
const worker = new Worker('worker.js')

worker.postMessage({
  data: chartData,
  params: { period: 14 }
})

worker.onmessage = function(e) {
  const result = e.data
  chart.updateIndicator(result)
}
```

## Mobile Optimization

### Reduce Touch Sensitivity

```javascript
chart.start({
  touch: {
    sensitivity: 0.5,
    threshold: 10
  }
})
```

### Disable Features on Mobile

```javascript
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

chart.start({
  crosshair: !isMobile,
  tooltip: !isMobile,
  animations: !isMobile
})
```

### Use Passive Event Listeners

```javascript
chartElement.addEventListener('touchstart', handler, { passive: true })
chartElement.addEventListener('touchmove', handler, { passive: true })
```

## Profiling and Monitoring

### Performance Monitoring

```javascript
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: 0,
      renderTime: 0,
      updateTime: 0
    }
    this.frameCount = 0
    this.lastTime = performance.now()
  }

  startFrame() {
    this.frameStart = performance.now()
  }

  endFrame() {
    const now = performance.now()
    const frameTime = now - this.frameStart
    
    this.metrics.renderTime = frameTime
    this.frameCount++
    
    // Calculate FPS every second
    if (now - this.lastTime >= 1000) {
      this.metrics.fps = this.frameCount
      this.frameCount = 0
      this.lastTime = now
    }
  }

  getMetrics() {
    return this.metrics
  }
}

// Usage
const monitor = new PerformanceMonitor()

chart.on('beforeRender', () => monitor.startFrame())
chart.on('afterRender', () => monitor.endFrame())

setInterval(() => {
  const metrics = monitor.getMetrics()
  console.log(`FPS: ${metrics.fps}, Render: ${metrics.renderTime.toFixed(2)}ms`)
}, 1000)
```

### Memory Profiling

```javascript
function logMemoryUsage() {
  if (performance.memory) {
    const used = performance.memory.usedJSHeapSize / 1048576
    const total = performance.memory.totalJSHeapSize / 1048576
    console.log(`Memory: ${used.toFixed(2)}MB / ${total.toFixed(2)}MB`)
  }
}

setInterval(logMemoryUsage, 5000)
```

## Best Practices

### 1. Batch Operations

```javascript
// Bad: Multiple individual operations
data.forEach(candle => chart.addCandle(candle))

// Good: Single batch operation
chart.addCandles(data)
```

### 2. Avoid Frequent Redraws

```javascript
// Bad: Triggers redraw for each change
chart.setOption('theme.candle.color', 'red')
chart.setOption('theme.grid.color', 'gray')
chart.setOption('theme.background', 'black')

// Good: Batch configuration
chart.setOptions({
  theme: {
    candle: { color: 'red' },
    grid: { color: 'gray' },
    background: 'black'
  }
})
```

### 3. Use Appropriate Data Structures

```javascript
// Use Map for fast lookups
const candleMap = new Map()
data.forEach(candle => {
  candleMap.set(candle[0], candle)
})

// Use Set for unique values
const timestamps = new Set(data.map(c => c[0]))
```

### 4. Cleanup Event Listeners

```javascript
function setupChart(chart) {
  const handler = (event) => {
    // Handle event
  }
  
  chart.on('update', handler)
  
  return () => {
    chart.off('update', handler)
  }
}

const cleanup = setupChart(chart)

// Later
cleanup()
```

## Performance Checklist

- [ ] Limit data points to 5000-10000 candles
- [ ] Use lazy loading for historical data
- [ ] Throttle real-time updates (50-100ms)
- [ ] Limit active indicators to 3-5
- [ ] Disable animations on mobile
- [ ] Use WebSocket instead of polling
- [ ] Implement data caching
- [ ] Cleanup on component unmount
- [ ] Monitor FPS and memory usage
- [ ] Test on low-end devices

## Related Documentation

- [Data Management](data-management) - Efficient data handling
- [WebSocket Integration](backend/websocket-integration) - Real-time updates
- [Mobile Responsive](../examples/mobile-responsive) - Mobile optimization
- [API Reference](../api/core) - Performance methods