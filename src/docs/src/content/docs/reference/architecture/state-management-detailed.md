---
title: State Management
description: TradeX Chart state management architecture
---

TradeX Chart uses a centralized state management system with reactive updates.

## State Architecture

```javascript
const chartState = {
  data: {
    ohlcv: [],
    indicators: {},
    overlays: {}
  },
  viewport: {
    start: 0,
    end: 100,
    zoom: 1.0
  },
  ui: {
    crosshair: { x: 0, y: 0 },
    selection: null,
    theme: 'dark'
  },
  config: {
    candleWidth: 8,
    showVolume: true,
    showGrid: true
  }
}
```

## State Store

### Implementation

```javascript
class StateStore {
  constructor(initialState = {}) {
    this.state = initialState
    this.listeners = new Map()
    this.history = []
    this.historyIndex = -1
  }

  getState(path) {
    if (!path) return this.state
    
    return path.split('.').reduce((obj, key) => obj?.[key], this.state)
  }

  setState(path, value) {
    const oldState = { ...this.state }
    
    if (typeof path === 'object') {
      this.state = { ...this.state, ...path }
    } else {
      this.setNestedValue(path, value)
    }
    
    this.saveHistory(oldState)
    this.notify(path, value)
  }

  setNestedValue(path, value) {
    const keys = path.split('.')
    const lastKey = keys.pop()
    
    const target = keys.reduce((obj, key) => {
      if (!obj[key]) obj[key] = {}
      return obj[key]
    }, this.state)
    
    target[lastKey] = value
  }

  subscribe(path, callback) {
    if (!this.listeners.has(path)) {
      this.listeners.set(path, [])
    }
    
    this.listeners.get(path).push(callback)
    
    return () => this.unsubscribe(path, callback)
  }

  unsubscribe(path, callback) {
    const callbacks = this.listeners.get(path)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) callbacks.splice(index, 1)
    }
  }

  notify(path, value) {
    const callbacks = this.listeners.get(path) || []
    callbacks.forEach(cb => cb(value, this.state))
    
    // Notify wildcard listeners
    const wildcardCallbacks = this.listeners.get('*') || []
    wildcardCallbacks.forEach(cb => cb(path, value, this.state))
  }
}
```

## Reactive Updates

### Auto-Update Pattern

```javascript
class ReactiveChart {
  constructor() {
    this.store = new StateStore()
    this.setupReactivity()
  }

  setupReactivity() {
    // React to data changes
    this.store.subscribe('data.ohlcv', (data) => {
      this.updateChart(data)
    })

    // React to viewport changes
    this.store.subscribe('viewport', (viewport) => {
      this.updateViewport(viewport)
    })

    // React to theme changes
    this.store.subscribe('ui.theme', (theme) => {
      this.applyTheme(theme)
    })
  }

  setData(data) {
    this.store.setState('data.ohlcv', data)
  }

  zoom(level) {
    this.store.setState('viewport.zoom', level)
  }
}
```

## State Persistence

### Save/Restore State

```javascript
class StatePersistence {
  saveState(store, key = 'chart_state') {
    const state = store.getState()
    const serialized = JSON.stringify(state)
    
    try {
      localStorage.setItem(key, serialized)
      return true
    } catch (error) {
      console.error('Failed to save state:', error)
      return false
    }
  }

  loadState(key = 'chart_state') {
    try {
      const serialized = localStorage.getItem(key)
      if (!serialized) return null
      
      return JSON.parse(serialized)
    } catch (error) {
      console.error('Failed to load state:', error)
      return null
    }
  }

  clearState(key = 'chart_state') {
    localStorage.removeItem(key)
  }
}

// Usage
const persistence = new StatePersistence()

// Save
persistence.saveState(chart.store)

// Restore
const savedState = persistence.loadState()
if (savedState) {
  chart.store.setState(savedState)
}
```

## Time Travel Debugging

### Undo/Redo

```javascript
class TimeTravel {
  constructor(store) {
    this.store = store
    this.history = []
    this.currentIndex = -1
    this.maxHistory = 50
  }

  saveSnapshot() {
    const state = JSON.parse(JSON.stringify(this.store.getState()))
    
    // Remove future states if we're not at the end
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1)
    }
    
    this.history.push(state)
    
    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift()
    } else {
      this.currentIndex++
    }
  }

  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--
      this.store.setState(this.history[this.currentIndex])
      return true
    }
    return false
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++
      this.store.setState(this.history[this.currentIndex])
      return true
    }
    return false
  }

  canUndo() {
    return this.currentIndex > 0
  }

  canRedo() {
    return this.currentIndex < this.history.length - 1
  }
}
```

## State Middleware

### Logger Middleware

```javascript
class LoggerMiddleware {
  constructor(store) {
    this.store = store
    this.setupLogging()
  }

  setupLogging() {
    const originalSetState = this.store.setState.bind(this.store)
    
    this.store.setState = (path, value) => {
      console.group(`State Update: ${path}`)
      console.log('Previous:', this.store.getState(path))
      console.log('Next:', value)
      console.groupEnd()
      
      return originalSetState(path, value)
    }
  }
}
```

## Related Documentation

- [Rendering Pipeline](rendering-pipeline) - Rendering architecture
- [Event System](event-system) - Event handling
- [Performance](performance-internals) - Performance optimization