---
title: Plugin Architecture
description: TradeX Chart plugin system and extensibility
---

# Plugin Architecture

TradeX Chart provides a plugin system for extending functionality.

## Plugin Interface

```javascript
class Plugin {
  constructor(chart, options = {}) {
    this.chart = chart
    this.options = options
    this.name = 'MyPlugin'
    this.version = '1.0.0'
  }

  init() {
    // Initialize plugin
  }

  destroy() {
    // Cleanup
  }
}
```

## Creating Plugins

### Basic Plugin

```javascript
class WatermarkPlugin extends Plugin {
  constructor(chart, options) {
    super(chart, options)
    this.name = 'Watermark'
  }

  init() {
    this.chart.on('render', () => {
      this.drawWatermark()
    })
  }

  drawWatermark() {
    const ctx = this.chart.getContext()
    ctx.save()
    ctx.globalAlpha = 0.1
    ctx.font = '48px Arial'
    ctx.fillText(this.options.text, 50, 50)
    ctx.restore()
  }

  destroy() {
    // Remove event listeners
  }
}

// Usage
chart.addPlugin(new WatermarkPlugin(chart, {
  text: 'TradeX Chart'
}))
```

## Plugin Manager

```javascript
class PluginManager {
  constructor(chart) {
    this.chart = chart
    this.plugins = new Map()
  }

  register(plugin) {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin ${plugin.name} already registered`)
    }
    
    this.plugins.set(plugin.name, plugin)
    plugin.init()
  }

  unregister(name) {
    const plugin = this.plugins.get(name)
    if (plugin) {
      plugin.destroy()
      this.plugins.delete(name)
    }
  }

  get(name) {
    return this.plugins.get(name)
  }
}
```

## Related Documentation

- [Event System](event-system) - Event handling
- [Custom Indicators](../../guides/custom-indicators) - Creating indicators