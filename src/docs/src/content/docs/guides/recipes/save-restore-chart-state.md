---
title: Save & Restore Chart State
description: Save and restore chart state across sessions
---

Persist chart configuration and restore it across sessions.

## Save State to LocalStorage

```javascript
function saveChartState(chart, key = 'chart_state') {
  const state = {
    zoom: chart.getZoom(),
    scroll: chart.getScrollPosition(),
    indicators: chart.getIndicators(),
    theme: chart.getTheme(),
    config: chart.getConfig()
  }
  
  localStorage.setItem(key, JSON.stringify(state))
}

// Auto-save on changes
chart.on('zoom', () => saveChartState(chart))
chart.on('scroll', () => saveChartState(chart))
```

## Restore State

```javascript
function restoreChartState(chart, key = 'chart_state') {
  const saved = localStorage.getItem(key)
  if (!saved) return false
  
  try {
    const state = JSON.parse(saved)
    
    if (state.theme) chart.setTheme(state.theme)
    if (state.config) chart.setConfig(state.config)
    if (state.zoom) chart.setZoom(state.zoom)
    if (state.scroll) chart.scrollTo(state.scroll)
    if (state.indicators) {
      state.indicators.forEach(ind => chart.addIndicator(ind))
    }
    
    return true
  } catch (error) {
    console.error('Failed to restore state:', error)
    return false
  }
}

// Restore on load
window.addEventListener('load', () => {
  restoreChartState(chart)
})
```

## State Manager Class

```javascript
class ChartStateManager {
  constructor(chart, storageKey = 'chart_state') {
    this.chart = chart
    this.storageKey = storageKey
    this.autoSave = true
    this.setupAutoSave()
  }

  save() {
    const state = this.getState()
    localStorage.setItem(this.storageKey, JSON.stringify(state))
  }

  restore() {
    const saved = localStorage.getItem(this.storageKey)
    if (!saved) return false
    
    const state = JSON.parse(saved)
    this.setState(state)
    return true
  }

  getState() {
    return {
      viewport: {
        zoom: this.chart.getZoom(),
        scroll: this.chart.getScrollPosition()
      },
      indicators: this.chart.getIndicators(),
      drawings: this.chart.getDrawings(),
      theme: this.chart.getTheme(),
      timestamp: Date.now()
    }
  }

  setState(state) {
    if (state.theme) this.chart.setTheme(state.theme)
    if (state.viewport) {
      this.chart.setZoom(state.viewport.zoom)
      this.chart.scrollTo(state.viewport.scroll)
    }
    if (state.indicators) {
      state.indicators.forEach(ind => this.chart.addIndicator(ind))
    }
    if (state.drawings) {
      state.drawings.forEach(draw => this.chart.addDrawing(draw))
    }
  }

  setupAutoSave() {
    let saveTimeout
    const debouncedSave = () => {
      clearTimeout(saveTimeout)
      saveTimeout = setTimeout(() => this.save(), 500)
    }

    this.chart.on('zoom', debouncedSave)
    this.chart.on('scroll', debouncedSave)
    this.chart.on('indicatorAdded', debouncedSave)
    this.chart.on('drawingAdded', debouncedSave)
  }

  clear() {
    localStorage.removeItem(this.storageKey)
  }
}

// Usage
const stateManager = new ChartStateManager(chart)

// Restore on load
stateManager.restore()

// Manual save
stateManager.save()
```

## Related Documentation

- [State Management](../../reference/architecture/state-management-detailed) - State architecture
- [Configuration](../../reference/02_configuration) - Chart configuration