---
title: Accessibility
description: Making TradeX Chart accessible to all users
---

# Accessibility

Make your TradeX Chart accessible to users with disabilities.

## ARIA Labels

```javascript
function setupAccessibility(chart) {
  const element = chart.getElement()
  
  // Add ARIA role
  element.setAttribute('role', 'img')
  element.setAttribute('aria-label', 'Interactive price chart')
  
  // Add description
  const desc = document.createElement('div')
  desc.id = 'chart-description'
  desc.className = 'sr-only'
  desc.textContent = 'A candlestick chart showing price movements over time'
  element.parentElement.appendChild(desc)
  
  element.setAttribute('aria-describedby', 'chart-description')
}
```

## Keyboard Navigation

```javascript
class AccessibleChart {
  constructor(chart) {
    this.chart = chart
    this.setupKeyboardNav()
  }

  setupKeyboardNav() {
    const element = this.chart.getElement()
    element.setAttribute('tabindex', '0')
    
    element.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          this.chart.scrollLeft()
          this.announcePosition()
          break
        case 'ArrowRight':
          this.chart.scrollRight()
          this.announcePosition()
          break
        case '+':
        case '=':
          this.chart.zoomIn()
          this.announceZoom()
          break
        case '-':
          this.chart.zoomOut()
          this.announceZoom()
          break
        case 'Home':
          this.chart.scrollToStart()
          break
        case 'End':
          this.chart.scrollToEnd()
          break
      }
    })
  }

  announcePosition() {
    const candle = this.chart.getCurrentCandle()
    if (candle) {
      this.announce(`Price: ${candle[4]}, Time: ${new Date(candle[0]).toLocaleString()}`)
    }
  }

  announceZoom() {
    const zoom = this.chart.getZoom()
    this.announce(`Zoom level: ${Math.round(zoom * 100)}%`)
  }

  announce(message) {
    const announcer = document.getElementById('chart-announcer') || this.createAnnouncer()
    announcer.textContent = message
  }

  createAnnouncer() {
    const announcer = document.createElement('div')
    announcer.id = 'chart-announcer'
    announcer.setAttribute('role', 'status')
    announcer.setAttribute('aria-live', 'polite')
    announcer.className = 'sr-only'
    document.body.appendChild(announcer)
    return announcer
  }
}
```

## Screen Reader Support

```javascript
function addScreenReaderSupport(chart) {
  // Create data table for screen readers
  const table = document.createElement('table')
  table.className = 'sr-only'
  table.setAttribute('aria-label', 'Chart data table')
  
  const thead = document.createElement('thead')
  thead.innerHTML = `
    <tr>
      <th>Time</th>
      <th>Open</th>
      <th>High</th>
      <th>Low</th>
      <th>Close</th>
      <th>Volume</th>
    </tr>
  `
  table.appendChild(thead)
  
  const tbody = document.createElement('tbody')
  const data = chart.getData()
  
  data.forEach(candle => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${new Date(candle[0]).toLocaleString()}</td>
      <td>${candle[1]}</td>
      <td>${candle[2]}</td>
      <td>${candle[3]}</td>
      <td>${candle[4]}</td>
      <td>${candle[5] || 'N/A'}</td>
    `
    tbody.appendChild(row)
  })
  
  table.appendChild(tbody)
  chart.getElement().parentElement.appendChild(table)
}
```

## Color Contrast

```javascript
const accessibleTheme = {
  candle: {
    upBodyColor: '#0A7E3E',    // WCAG AA compliant green
    downBodyColor: '#C41E3A',  // WCAG AA compliant red
    upWickColor: '#0A7E3E',
    downWickColor: '#C41E3A'
  },
  background: '#FFFFFF',
  grid: {
    color: '#CCCCCC'  // 3:1 contrast ratio
  },
  text: {
    color: '#000000'  // Maximum contrast
  }
}

chart.setTheme(accessibleTheme)
```

## Focus Indicators

```css
.chart-container:focus {
  outline: 3px solid #0066CC;
  outline-offset: 2px;
}

.chart-button:focus {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}
```

## Related Documentation

- [Keyboard Shortcuts](recipes/keyboard-shortcuts) - Keyboard navigation
- [Multi-Language Support](recipes/multi-language-support) - i18n
- [Configuration](../reference/02_configuration) - Chart configuration