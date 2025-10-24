---
title: Debugging Tips
description: Techniques and tools for debugging TradeX Chart
---

# Debugging Tips

Master debugging techniques to efficiently troubleshoot and fix issues in TradeX Chart.

## Browser DevTools

### Opening DevTools

**Keyboard shortcuts**:
- **F12** - Open DevTools
- **Ctrl+Shift+I** (Cmd+Option+I on Mac) - Open DevTools
- **Ctrl+Shift+J** (Cmd+Option+J on Mac) - Open Console
- **Ctrl+Shift+C** (Cmd+Option+C on Mac) - Inspect element

### Console Tab

**Basic logging**:
```javascript
console.log('Simple message')
console.log('Value:', value)
console.log('Multiple', 'values', { obj: 'data' })
```

**Log levels**:
```javascript
console.log('Info message')      // General info
console.info('Info message')     // Informational
console.warn('Warning message')  // Warning (yellow)
console.error('Error message')   // Error (red)
console.debug('Debug message')   // Debug info
```

**Formatted output**:
```javascript
// Styled console output
console.log('%cImportant!', 'color: red; font-size: 20px; font-weight: bold')

// Table format
console.table([
  { name: 'BTC', price: 50000 },
  { name: 'ETH', price: 3000 }
])

// Group related logs
console.group('Chart Data')
console.log('Symbol:', symbol)
console.log('Timeframe:', timeframe)
console.groupEnd()
```

**Timing operations**:
```javascript
console.time('calculation')
// ... expensive operation
console.timeEnd('calculation')
// Output: calculation: 123.456ms
```

**Stack traces**:
```javascript
console.trace('Trace point')
// Shows call stack
```

### Sources Tab

**Setting breakpoints**:
1. Open Sources tab
2. Navigate to file
3. Click line number to set breakpoint
4. Code will pause when breakpoint is hit

**Conditional breakpoints**:
```javascript
// Right-click line number → Add conditional breakpoint
// Condition: price > 50000
```

**Logpoints** (non-breaking breakpoints):
```javascript
// Right-click line number → Add logpoint
// Message: Price is {price}
```

**Debugger statement**:
```javascript
function calculateIndicator(data) {
  debugger; // Execution pauses here
  const result = processData(data)
  return result
}
```

**Step controls**:
- **F8** - Resume execution
- **F10** - Step over (next line)
- **F11** - Step into (enter function)
- **Shift+F11** - Step out (exit function)

**Watch expressions**:
```javascript
// Add expressions to watch:
this.data.length
this.config.timeframe
this._cachedValue
```

### Network Tab

**Monitor API calls**:
1. Open Network tab
2. Filter by XHR/Fetch
3. Click request to see details
4. Check Headers, Preview, Response

**Throttle network**:
- Simulate slow connections
- Test loading states
- Verify timeouts

### Performance Tab

**Record performance**:
1. Click record button
2. Perform actions
3. Stop recording
4. Analyze flame chart

**Identify bottlenecks**:
- Long tasks (>50ms)
- Excessive rendering
- Memory leaks
- JavaScript execution time

### Memory Tab

**Take heap snapshot**:
1. Open Memory tab
2. Select "Heap snapshot"
3. Click "Take snapshot"
4. Compare snapshots to find leaks

**Detect memory leaks**:
```javascript
// Before
const snapshot1 = performance.memory.usedJSHeapSize

// Perform action
chart.addIndicator('RSI')

// After
const snapshot2 = performance.memory.usedJSHeapSize
console.log('Memory delta:', snapshot2 - snapshot1)
```

## Debugging Techniques

### Strategic Console Logging

**Add context to logs**:
```javascript
class Chart {
  constructor(config) {
    console.log('[Chart] Constructor called', { config })
    this.config = config
  }
  
  render() {
    console.log('[Chart] Rendering', {
      width: this.width,
      height: this.height,
      dataLength: this.data.length
    })
  }
}
```

**Use prefixes for filtering**:
```javascript
const DEBUG = true

function debug(category, message, data) {
  if (DEBUG) {
    console.log(`[${category}]`, message, data)
  }
}

debug('CHART', 'Data loaded', { count: data.length })
debug('INDICATOR', 'RSI calculated', { values: rsi })

// Filter in console: [CHART]
```

### Debugging Canvas Issues

**Visualize canvas bounds**:
```javascript
function debugCanvas(ctx, width, height) {
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 2
  ctx.strokeRect(0, 0, width, height)
  
  // Draw center lines
  ctx.beginPath()
  ctx.moveTo(width / 2, 0)
  ctx.lineTo(width / 2, height)
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()
}
```

**Log drawing operations**:
```javascript
function drawCandle(ctx, x, y, width, height) {
  console.log('Drawing candle:', { x, y, width, height })
  
  if (isNaN(x) || isNaN(y)) {
    console.error('Invalid coordinates!', { x, y })
    return
  }
  
  ctx.fillRect(x, y, width, height)
}
```

### Debugging Data Issues

**Validate data format**:
```javascript
function validateOHLCV(data) {
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', typeof data)
    return false
  }
  
  data.forEach((candle, index) => {
    if (!Array.isArray(candle) || candle.length !== 6) {
      console.error(`Invalid candle at index ${index}:`, candle)
    }
    
    const [timestamp, open, high, low, close, volume] = candle
    
    if (high < low) {
      console.error(`High < Low at index ${index}:`, { high, low })
    }
    
    if (high < open || high < close) {
      console.error(`High is not highest at index ${index}:`, candle)
    }
    
    if (low > open || low > close) {
      console.error(`Low is not lowest at index ${index}:`, candle)
    }
  })
  
  return true
}
```

**Inspect data ranges**:
```javascript
function analyzeData(data) {
  const timestamps = data.map(d => d[0])
  const prices = data.flatMap(d => [d[1], d[2], d[3], d[4]])
  
  console.log('Data Analysis:', {
    count: data.length,
    timeRange: {
      start: new Date(Math.min(...timestamps)),
      end: new Date(Math.max(...timestamps))
    },
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices)
    },
    gaps: findGaps(timestamps)
  })
}
```

### Debugging State Issues

**Track state changes**:
```javascript
class StatefulChart {
  constructor() {
    this._state = {}
  }
  
  setState(key, value) {
    const oldValue = this._state[key]
    console.log(`State change: ${key}`, {
      old: oldValue,
      new: value,
      stack: new Error().stack
    })
    this._state[key] = value
  }
}
```

**Snapshot state**:
```javascript
function snapshotState(chart) {
  return {
    timestamp: Date.now(),
    data: chart.data.length,
    indicators: chart.indicators.map(i => i.name),
    range: chart.range,
    zoom: chart.zoom
  }
}

const before = snapshotState(chart)
// ... perform action
const after = snapshotState(chart)

console.log('State diff:', {
  before,
  after,
  changed: Object.keys(after).filter(k => before[k] !== after[k])
})
```

### Debugging Event Issues

**Log all events**:
```javascript
class EventDebugger {
  constructor(element) {
    const events = ['click', 'mousedown', 'mouseup', 'mousemove', 'wheel']
    
    events.forEach(eventType => {
      element.addEventListener(eventType, (e) => {
        console.log(`[Event] ${eventType}`, {
          x: e.clientX,
          y: e.clientY,
          target: e.target,
          timestamp: Date.now()
        })
      })
    })
  }
}
```

**Track event propagation**:
```javascript
element.addEventListener('click', (e) => {
  console.log('Event phase:', {
    bubbles: e.bubbles,
    cancelable: e.cancelable,
    defaultPrevented: e.defaultPrevented,
    eventPhase: e.eventPhase,
    path: e.composedPath()
  })
}, true) // Capture phase
```

## Common Issues and Solutions

### Chart Not Rendering

**Check container size**:
```javascript
const container = document.getElementById('chart')
console.log('Container dimensions:', {
  width: container.offsetWidth,
  height: container.offsetHeight,
  display: getComputedStyle(container).display
})

if (container.offsetWidth === 0 || container.offsetHeight === 0) {
  console.error('Container has no size!')
}
```

**Verify data**:
```javascript
console.log('Chart data:', {
  hasData: !!chart.data,
  dataLength: chart.data?.length,
  firstCandle: chart.data?.[0],
  lastCandle: chart.data?.[chart.data.length - 1]
})
```

### Performance Issues

**Profile rendering**:
```javascript
function profileRender() {
  const start = performance.now()
  
  chart.render()
  
  const duration = performance.now() - start
  console.log(`Render took ${duration.toFixed(2)}ms`)
  
  if (duration > 16.67) {
    console.warn('Render is slower than 60fps!')
  }
}
```

**Count operations**:
```javascript
let drawCallCount = 0

const originalFillRect = ctx.fillRect
ctx.fillRect = function(...args) {
  drawCallCount++
  return originalFillRect.apply(this, args)
}

chart.render()
console.log('Draw calls:', drawCallCount)
```

### Memory Leaks

**Track object creation**:
```javascript
const objectRegistry = new WeakMap()
let objectCount = 0

class TrackedObject {
  constructor() {
    objectCount++
    objectRegistry.set(this, objectCount)
    console.log('Object created:', objectCount)
  }
}

// Check if objects are being cleaned up
setInterval(() => {
  console.log('Total objects created:', objectCount)
}, 5000)
```

**Monitor event listeners**:
```javascript
const originalAddEventListener = EventTarget.prototype.addEventListener
const listeners = new Map()

EventTarget.prototype.addEventListener = function(type, listener, options) {
  if (!listeners.has(this)) {
    listeners.set(this, [])
  }
  listeners.get(this).push({ type, listener })
  
  console.log('Listener added:', type, 'Total:', listeners.get(this).length)
  
  return originalAddEventListener.call(this, type, listener, options)
}

// Check for listener leaks
console.log('Total listeners:', 
  Array.from(listeners.values()).reduce((sum, arr) => sum + arr.length, 0)
)
```

### WebSocket Issues

**Debug WebSocket connection**:
```javascript
class DebugWebSocket extends WebSocket {
  constructor(url) {
    super(url)
    
    this.addEventListener('open', (e) => {
      console.log('[WS] Connected', { url, timestamp: Date.now() })
    })
    
    this.addEventListener('message', (e) => {
      console.log('[WS] Message received', {
        data: e.data,
        size: e.data.length,
        timestamp: Date.now()
      })
    })
    
    this.addEventListener('error', (e) => {
      console.error('[WS] Error', e)
    })
    
    this.addEventListener('close', (e) => {
      console.log('[WS] Closed', {
        code: e.code,
        reason: e.reason,
        wasClean: e.wasClean
      })
    })
  }
}
```

## Advanced Debugging

### Source Maps

**Enable source maps**:
```javascript
// vite.config.js
export default {
  build: {
    sourcemap: true
  }
}
```

**Debug original source**:
- Breakpoints work in original files
- Stack traces show original locations
- Variables have original names

### Remote Debugging

**Chrome Remote Debugging**:
```bash
# Start Chrome with remote debugging
chrome --remote-debugging-port=9222

# Connect from another Chrome instance
chrome://inspect
```

**Node.js Debugging**:
```bash
# Start with inspector
node --inspect server.js

# Or break on start
node --inspect-brk server.js

# Connect with Chrome DevTools
chrome://inspect
```

### Performance Monitoring

**User Timing API**:
```javascript
performance.mark('render-start')
chart.render()
performance.mark('render-end')

performance.measure('render', 'render-start', 'render-end')

const measure = performance.getEntriesByName('render')[0]
console.log('Render duration:', measure.duration)
```

**Long Task Observer**:
```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.warn('Long task detected:', {
      duration: entry.duration,
      startTime: entry.startTime
    })
  }
})

observer.observe({ entryTypes: ['longtask'] })
```

## Debugging Tools

### Custom Debug Panel

```javascript
class DebugPanel {
  constructor(chart) {
    this.chart = chart
    this.panel = this.createPanel()
    this.update()
  }
  
  createPanel() {
    const panel = document.createElement('div')
    panel.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
    `
    document.body.appendChild(panel)
    return panel
  }
  
  update() {
    this.panel.innerHTML = `
      <div>FPS: ${this.getFPS()}</div>
      <div>Candles: ${this.chart.data?.length || 0}</div>
      <div>Indicators: ${this.chart.indicators?.length || 0}</div>
      <div>Memory: ${this.getMemory()}</div>
      <div>Render: ${this.chart.lastRenderTime?.toFixed(2) || 0}ms</div>
    `
    requestAnimationFrame(() => this.update())
  }
  
  getFPS() {
    // Calculate FPS
    return '60' // Simplified
  }
  
  getMemory() {
    if (performance.memory) {
      const used = performance.memory.usedJSHeapSize / 1048576
      return `${used.toFixed(2)} MB`
    }
    return 'N/A'
  }
}

// Usage
const debugPanel = new DebugPanel(chart)
```

### Assertion Helper

```javascript
function assert(condition, message) {
  if (!condition) {
    console.error('Assertion failed:', message)
    debugger
    throw new Error(message)
  }
}

// Usage
assert(data.length > 0, 'Data cannot be empty')
assert(typeof price === 'number', 'Price must be a number')
```

## Best Practices

### Development vs Production

```javascript
const isDevelopment = import.meta.env.DEV

function debug(...args) {
  if (isDevelopment) {
    console.log('[DEBUG]', ...args)
  }
}

function assert(condition, message) {
  if (isDevelopment && !condition) {
    throw new Error(message)
  }
}
```

### Clean Up Debug Code

**Use a debug flag**:
```javascript
const DEBUG = false // Set to false before committing

if (DEBUG) {
  console.log('Debug info')
}
```

**Remove before committing**:
```bash
# Search for debug code
grep -r "console.log" src/
grep -r "debugger" src/
```

## Related Documentation

- [Local Setup](local-setup) - Development environment
- [Build Process](build-process) - Build system
- [Contributing Code](contributing-code) - Contribution guidelines
- [FAQ](../faq) - Common questions
- [Performance](../../reference/performance) - Performance optimization