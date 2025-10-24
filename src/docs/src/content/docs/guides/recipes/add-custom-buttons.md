---
title: Add Custom Buttons
description: Add custom buttons and controls to your chart
---

# Add Custom Buttons

Add custom buttons and controls to enhance chart functionality.

## Basic Button

```javascript
function addCustomButton(chart, options) {
  const button = document.createElement('button')
  button.textContent = options.label
  button.className = 'chart-button'
  button.style.cssText = `
    position: absolute;
    top: ${options.top || '10px'};
    right: ${options.right || '10px'};
    padding: 8px 16px;
    background: #2196F3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `
  
  button.addEventListener('click', options.onClick)
  
  chart.parentElement.style.position = 'relative'
  chart.parentElement.appendChild(button)
  
  return button
}

// Usage
addCustomButton(chart, {
  label: 'Reset Zoom',
  top: '10px',
  right: '10px',
  onClick: () => chart.resetZoom()
})
```

## Button Toolbar

```javascript
class ChartToolbar {
  constructor(chart) {
    this.chart = chart
    this.toolbar = this.createToolbar()
  }

  createToolbar() {
    const toolbar = document.createElement('div')
    toolbar.className = 'chart-toolbar'
    toolbar.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      gap: 8px;
      background: rgba(255, 255, 255, 0.9);
      padding: 8px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `
    
    this.chart.parentElement.appendChild(toolbar)
    return toolbar
  }

  addButton(label, icon, onClick) {
    const button = document.createElement('button')
    button.innerHTML = icon ? `${icon} ${label}` : label
    button.style.cssText = `
      padding: 6px 12px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 3px;
      cursor: pointer;
      font-size: 14px;
    `
    
    button.addEventListener('click', onClick)
    button.addEventListener('mouseenter', () => {
      button.style.background = '#f5f5f5'
    })
    button.addEventListener('mouseleave', () => {
      button.style.background = 'white'
    })
    
    this.toolbar.appendChild(button)
    return button
  }
}

// Usage
const toolbar = new ChartToolbar(chart)

toolbar.addButton('Zoom In', '🔍+', () => chart.zoomIn())
toolbar.addButton('Zoom Out', '🔍-', () => chart.zoomOut())
toolbar.addButton('Reset', '↺', () => chart.reset())
toolbar.addButton('Screenshot', '📷', () => chart.exportImage())
```

## Toggle Button

```javascript
function addToggleButton(chart, options) {
  const button = document.createElement('button')
  let active = options.initialState || false
  
  const updateButton = () => {
    button.textContent = active ? options.activeLabel : options.inactiveLabel
    button.style.background = active ? '#4CAF50' : '#9E9E9E'
  }
  
  button.style.cssText = `
    position: absolute;
    top: ${options.top || '10px'};
    right: ${options.right || '10px'};
    padding: 8px 16px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `
  
  updateButton()
  
  button.addEventListener('click', () => {
    active = !active
    updateButton()
    options.onToggle(active)
  })
  
  chart.parentElement.appendChild(button)
  return button
}

// Usage
addToggleButton(chart, {
  activeLabel: 'Volume ON',
  inactiveLabel: 'Volume OFF',
  initialState: true,
  onToggle: (active) => {
    chart.setConfig({ showVolume: active })
  }
})
```

## Related Documentation

- [Custom Tooltips](custom-tooltips) - Custom tooltip recipe
- [Keyboard Shortcuts](keyboard-shortcuts) - Keyboard shortcuts
- [Events](../../reference/events) - Event handling