---
title: Keyboard Shortcuts
description: Add keyboard shortcuts to your chart
---

# Keyboard Shortcuts

Implement keyboard shortcuts for chart navigation and control.

## Basic Shortcuts

```javascript
function setupKeyboardShortcuts(chart) {
  document.addEventListener('keydown', (e) => {
    // Zoom
    if (e.key === '+' || e.key === '=') {
      e.preventDefault()
      chart.zoomIn()
    }
    if (e.key === '-' || e.key === '_') {
      e.preventDefault()
      chart.zoomOut()
    }
    
    // Scroll
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      chart.scrollLeft()
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      chart.scrollRight()
    }
    
    // Reset
    if (e.key === 'r' && e.ctrlKey) {
      e.preventDefault()
      chart.reset()
    }
  })
}

setupKeyboardShortcuts(chart)
```

## Shortcut Manager

```javascript
class KeyboardShortcutManager {
  constructor(chart) {
    this.chart = chart
    this.shortcuts = new Map()
    this.enabled = true
    this.setupListener()
  }

  register(key, modifiers, action, description) {
    const shortcut = {
      key: key.toLowerCase(),
      ctrl: modifiers?.ctrl || false,
      shift: modifiers?.shift || false,
      alt: modifiers?.alt || false,
      action,
      description
    }
    
    const id = this.getShortcutId(shortcut)
    this.shortcuts.set(id, shortcut)
  }

  unregister(key, modifiers = {}) {
    const id = this.getShortcutId({ key, ...modifiers })
    this.shortcuts.delete(id)
  }

  getShortcutId(shortcut) {
    const parts = []
    if (shortcut.ctrl) parts.push('ctrl')
    if (shortcut.shift) parts.push('shift')
    if (shortcut.alt) parts.push('alt')
    parts.push(shortcut.key.toLowerCase())
    return parts.join('+')
  }

  setupListener() {
    document.addEventListener('keydown', (e) => {
      if (!this.enabled) return
      
      const id = this.getShortcutId({
        key: e.key,
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey
      })
      
      const shortcut = this.shortcuts.get(id)
      if (shortcut) {
        e.preventDefault()
        shortcut.action()
      }
    })
  }

  enable() {
    this.enabled = true
  }

  disable() {
    this.enabled = false
  }

  getShortcuts() {
    return Array.from(this.shortcuts.values())
  }
}

// Usage
const shortcuts = new KeyboardShortcutManager(chart)

// Register shortcuts
shortcuts.register('+', {}, () => chart.zoomIn(), 'Zoom in')
shortcuts.register('-', {}, () => chart.zoomOut(), 'Zoom out')
shortcuts.register('r', { ctrl: true }, () => chart.reset(), 'Reset chart')
shortcuts.register('s', { ctrl: true }, () => chart.exportImage(), 'Save screenshot')
shortcuts.register('ArrowLeft', {}, () => chart.scrollLeft(), 'Scroll left')
shortcuts.register('ArrowRight', {}, () => chart.scrollRight(), 'Scroll right')
```

## Shortcut Help Dialog

```javascript
function showShortcutHelp(shortcuts) {
  const dialog = document.createElement('div')
  dialog.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1000;
  `
  
  const title = document.createElement('h3')
  title.textContent = 'Keyboard Shortcuts'
  dialog.appendChild(title)
  
  const list = document.createElement('ul')
  list.style.cssText = 'list-style: none; padding: 0;'
  
  shortcuts.getShortcuts().forEach(shortcut => {
    const item = document.createElement('li')
    item.style.cssText = 'padding: 8px 0; border-bottom: 1px solid #eee;'
    
    const key = document.createElement('kbd')
    key.textContent = shortcut.key
    key.style.cssText = `
      background: #f5f5f5;
      padding: 4px 8px;
      border-radius: 3px;
      font-family: monospace;
    `
    
    item.appendChild(key)
    item.appendChild(document.createTextNode(` - ${shortcut.description}`))
    list.appendChild(item)
  })
  
  dialog.appendChild(list)
  
  const closeBtn = document.createElement('button')
  closeBtn.textContent = 'Close'
  closeBtn.onclick = () => dialog.remove()
  dialog.appendChild(closeBtn)
  
  document.body.appendChild(dialog)
}

// Show help with ?
shortcuts.register('?', {}, () => showShortcutHelp(shortcuts), 'Show shortcuts')
```

## Related Documentation

- [Add Custom Buttons](add-custom-buttons) - Custom buttons
- [Events](../../reference/events) - Event handling