---
title: Rendering Pipeline
description: Understanding TradeX Chart's rendering architecture
---

TradeX Chart uses a multi-layered canvas rendering pipeline optimized for performance.

## Architecture Overview

```
┌─────────────────────────────────────┐
│         Data Layer                  │
│  (OHLCV, Indicators, Overlays)      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Transform Layer                │
│  (Scale, Viewport, Coordinates)     │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Render Queue                   │
│  (Batching, Prioritization)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Canvas Layers                  │
│  (Background, Chart, Overlay, UI)   │
└─────────────────────────────────────┘
```

## Canvas Layers

### Layer Stack

```javascript
const layers = {
  background: {
    zIndex: 0,
    static: true,
    canvas: backgroundCanvas
  },
  grid: {
    zIndex: 1,
    static: true,
    canvas: gridCanvas
  },
  chart: {
    zIndex: 2,
    static: false,
    canvas: chartCanvas
  },
  indicators: {
    zIndex: 3,
    static: false,
    canvas: indicatorCanvas
  },
  overlay: {
    zIndex: 4,
    static: false,
    canvas: overlayCanvas
  },
  ui: {
    zIndex: 5,
    static: false,
    canvas: uiCanvas
  }
}
```

### Layer Optimization

**Static Layers**: Rendered once, cached
**Dynamic Layers**: Re-rendered on data/viewport changes

## Render Cycle

### Frame Lifecycle

```javascript
class RenderPipeline {
  requestFrame() {
    if (this.frameRequested) return
    
    this.frameRequested = true
    requestAnimationFrame(() => this.render())
  }

  render() {
    this.frameRequested = false
    
    // 1. Update phase
    this.updateTransforms()
    this.updateViewport()
    
    // 2. Render phase
    this.renderBackground()
    this.renderGrid()
    this.renderChart()
    this.renderIndicators()
    this.renderOverlays()
    this.renderUI()
    
    // 3. Composite phase
    this.composite()
  }
}
```

## Coordinate Systems

### Transform Pipeline

```javascript
class CoordinateTransform {
  // Data space -> Screen space
  dataToScreen(timestamp, price) {
    const x = this.timeToX(timestamp)
    const y = this.priceToY(price)
    return { x, y }
  }

  // Screen space -> Data space
  screenToData(x, y) {
    const timestamp = this.xToTime(x)
    const price = this.yToPrice(y)
    return { timestamp, price }
  }

  timeToX(timestamp) {
    const index = this.getIndexFromTimestamp(timestamp)
    return (index - this.viewport.start) * this.candleWidth
  }

  priceToY(price) {
    const range = this.priceRange.max - this.priceRange.min
    const normalized = (price - this.priceRange.min) / range
    return this.height - (normalized * this.height)
  }
}
```

## Rendering Optimizations

### Viewport Culling

```javascript
class ViewportCuller {
  getVisibleCandles() {
    const start = Math.floor(this.viewport.start)
    const end = Math.ceil(this.viewport.end)
    
    return this.data.slice(
      Math.max(0, start - 1),
      Math.min(this.data.length, end + 1)
    )
  }

  isVisible(x, y, width, height) {
    return (
      x + width >= 0 &&
      x <= this.width &&
      y + height >= 0 &&
      y <= this.height
    )
  }
}
```

### Batch Rendering

```javascript
class BatchRenderer {
  renderCandles(candles) {
    const ctx = this.ctx
    
    // Batch all wicks
    ctx.beginPath()
    candles.forEach(candle => {
      this.drawWick(candle)
    })
    ctx.stroke()
    
    // Batch all bodies
    candles.forEach(candle => {
      this.drawBody(candle)
    })
  }
}
```

## Performance Monitoring

### Frame Timing

```javascript
class PerformanceMonitor {
  measureFrame(callback) {
    const start = performance.now()
    callback()
    const end = performance.now()
    
    this.frameTimes.push(end - start)
    this.updateMetrics()
  }

  updateMetrics() {
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
    const fps = 1000 / avg
    
    console.log(`FPS: ${fps.toFixed(2)}, Avg: ${avg.toFixed(2)}ms`)
  }
}
```

## Related Documentation

- [Performance Internals](performance-internals) - Performance details
- [State Management](state-management-detailed) - State architecture
- [Event System](event-system) - Event handling