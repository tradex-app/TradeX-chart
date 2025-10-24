---
title: Event System
description: TradeX Chart event-driven architecture
---

TradeX Chart uses an event-driven architecture for component communication and user interactions.

## Event Bus

### Implementation

```javascript
class EventBus {
  constructor() {
    this.events = new Map()
  }

  on(event, callback, context = null) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    
    const listener = { callback, context }
    this.events.get(event).push(listener)
    
    return () => this.off(event, callback)
  }

  once(event, callback, context = null) {
    const wrapper = (...args) => {
      this.off(event, wrapper)
      callback.apply(context, args)
    }
    
    return this.on(event, wrapper, context)
  }

  off(event, callback) {
    if (!this.events.has(event)) return
    
    const listeners = this.events.get(event)
    const index = listeners.findIndex(l => l.callback === callback)
    
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return
    
    const listeners = this.events.get(event)
    listeners.forEach(({ callback, context }) => {
      callback.apply(context, args)
    })
  }

  clear(event) {
    if (event) {
      this.events.delete(event)
    } else {
      this.events.clear()
    }
  }
}
```

## Event Types

### User Interaction Events

```javascript
// Mouse events
chart.on('click', (event) => {
  console.log('Clicked at:', event.x, event.y)
})

chart.on('mousemove', (event) => {
  console.log('Mouse at:', event.x, event.y)
})

chart.on('mousedown', (event) => {
  console.log('Mouse down')
})

chart.on('mouseup', (event) => {
  console.log('Mouse up')
})

// Touch events
chart.on('touchstart', (event) => {
  console.log('Touch started')
})

chart.on('touchmove', (event) => {
  console.log('Touch moved')
})

chart.on('touchend', (event) => {
  console.log('Touch ended')
})
```

### Chart Events

```javascript
// Data events
chart.on('dataLoaded', (data) => {
  console.log('Data loaded:', data.length)
})

chart.on('dataUpdated', (candle) => {
  console.log('New candle:', candle)
})

// Viewport events
chart.on('zoom', (event) => {
  console.log('Zoom level:', event.level)
})

chart.on('scroll', (event) => {
  console.log('Scroll position:', event.position)
})

chart.on('pan', (event) => {
  console.log('Panned by:', event.deltaX, event.deltaY)
})

// UI events
chart.on('crosshair', (event) => {
  console.log('Crosshair at:', event.timestamp, event.price)
})

chart.on('selection', (event) => {
  console.log('Selected:', event.start, event.end)
})
```

## Event Delegation

### DOM Event Handling

```javascript
class EventDelegator {
  constructor(element) {
    this.element = element
    this.handlers = new Map()
    this.setupDelegation()
  }

  setupDelegation() {
    this.element.addEventListener('click', (e) => {
      this.handleEvent('click', e)
    })

    this.element.addEventListener('mousemove', (e) => {
      this.handleEvent('mousemove', e)
    })

    this.element.addEventListener('wheel', (e) => {
      e.preventDefault()
      this.handleEvent('wheel', e)
    }, { passive: false })
  }

  handleEvent(type, domEvent) {
    const chartEvent = this.transformEvent(domEvent)
    this.emit(type, chartEvent)
  }

  transformEvent(domEvent) {
    const rect = this.element.getBoundingClientRect()
    
    return {
      x: domEvent.clientX - rect.left,
      y: domEvent.clientY - rect.top,
      timestamp: this.xToTimestamp(domEvent.clientX - rect.left),
      price: this.yToPrice(domEvent.clientY - rect.top),
      originalEvent: domEvent
    }
  }
}
```

## Event Throttling

### Performance Optimization

```javascript
class ThrottledEvents {
  constructor(eventBus) {
    this.eventBus = eventBus
    this.throttled = new Map()
  }

  throttle(event, callback, delay = 16) {
    let lastCall = 0
    let timeoutId = null
    
    const throttledCallback = (...args) => {
      const now = Date.now()
      
      if (now - lastCall >= delay) {
        lastCall = now
        callback(...args)
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          lastCall = Date.now()
          callback(...args)
        }, delay - (now - lastCall))
      }
    }
    
    this.eventBus.on(event, throttledCallback)
    return () => this.eventBus.off(event, throttledCallback)
  }

  debounce(event, callback, delay = 250) {
    let timeoutId = null
    
    const debouncedCallback = (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        callback(...args)
      }, delay)
    }
    
    this.eventBus.on(event, debouncedCallback)
    return () => this.eventBus.off(event, debouncedCallback)
  }
}

// Usage
const throttled = new ThrottledEvents(chart.eventBus)

// Throttle mousemove to 60fps
throttled.throttle('mousemove', (event) => {
  updateCrosshair(event)
}, 16)

// Debounce resize
throttled.debounce('resize', () => {
  chart.resize()
}, 250)
```

## Custom Events

### Creating Custom Events

```javascript
class CustomEventEmitter {
  constructor(chart) {
    this.chart = chart
  }

  emitPriceAlert(price, condition) {
    this.chart.emit('priceAlert', {
      price,
      condition,
      timestamp: Date.now()
    })
  }

  emitIndicatorCross(indicator1, indicator2) {
    this.chart.emit('indicatorCross', {
      indicator1,
      indicator2,
      timestamp: Date.now()
    })
  }
}

// Usage
chart.on('priceAlert', (event) => {
  console.log(`Price alert: ${event.price} ${event.condition}`)
  showNotification(event)
})

chart.on('indicatorCross', (event) => {
  console.log(`${event.indicator1} crossed ${event.indicator2}`)
})
```

## Event Propagation

### Bubbling and Capturing

```javascript
class EventPropagation {
  constructor() {
    this.phases = ['capture', 'target', 'bubble']
  }

  dispatchEvent(target, event) {
    const path = this.getEventPath(target)
    
    // Capture phase
    for (let i = path.length - 1; i > 0; i--) {
      if (event.stopped) break
      this.callListeners(path[i], event, 'capture')
    }
    
    // Target phase
    if (!event.stopped) {
      this.callListeners(target, event, 'target')
    }
    
    // Bubble phase
    if (!event.stopped && event.bubbles) {
      for (let i = 1; i < path.length; i++) {
        if (event.stopped) break
        this.callListeners(path[i], event, 'bubble')
      }
    }
  }

  getEventPath(target) {
    const path = [target]
    let current = target.parent
    
    while (current) {
      path.push(current)
      current = current.parent
    }
    
    return path
  }
}
```

## Related Documentation

- [State Management](state-management-detailed) - State architecture
- [Plugin Architecture](plugin-architecture) - Plugin system
- [API Events](../../api/events) - Event API reference