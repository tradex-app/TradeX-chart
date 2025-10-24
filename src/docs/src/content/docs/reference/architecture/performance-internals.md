---
title: Performance Internals
description: TradeX Chart performance optimization techniques
---

Deep dive into TradeX Chart's performance optimizations.

## Memory Management

### Object Pooling

```javascript
class ObjectPool {
  constructor(factory, reset, initialSize = 100) {
    this.factory = factory
    this.reset = reset
    this.pool = []
    
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory())
    }
  }

  acquire() {
    return this.pool.pop() || this.factory()
  }

  release(obj) {
    this.reset(obj)
    this.pool.push(obj)
  }
}

// Usage
const pointPool = new ObjectPool(
  () => ({ x: 0, y: 0 }),
  (p) => { p.x = 0; p.y = 0 }
)
```

## Canvas Optimization

### Layer Caching

```javascript
class LayerCache {
  constructor() {
    this.cache = new Map()
  }

  render(key, width, height, drawFn) {
    if (!this.cache.has(key)) {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      drawFn(ctx)
      this.cache.set(key, canvas)
    }
    return this.cache.get(key)
  }

  invalidate(key) {
    this.cache.delete(key)
  }
}
```

## RAF Scheduling

```javascript
class RAFScheduler {
  constructor() {
    this.tasks = []
    this.running = false
  }

  schedule(task, priority = 0) {
    this.tasks.push({ task, priority })
    this.tasks.sort((a, b) => b.priority - a.priority)
    
    if (!this.running) {
      this.running = true
      requestAnimationFrame(() => this.run())
    }
  }

  run() {
    const start = performance.now()
    const budget = 16 // 16ms budget for 60fps
    
    while (this.tasks.length > 0 && performance.now() - start < budget) {
      const { task } = this.tasks.shift()
      task()
    }
    
    if (this.tasks.length > 0) {
      requestAnimationFrame(() => this.run())
    } else {
      this.running = false
    }
  }
}
```

## Related Documentation

- [Rendering Pipeline](rendering-pipeline) - Rendering architecture
- [Performance Guide](../../guides/performance) - Performance tips