---
title: Change Colors Dynamically
description: Dynamically change chart colors and themes
---

# Change Colors Dynamically

Dynamically update chart colors and themes at runtime.

## Change Candle Colors

```javascript
function changeCandleColors(chart, upColor, downColor) {
  chart.setTheme({
    candle: {
      upBodyColor: upColor,
      upWickColor: upColor,
      downBodyColor: downColor,
      downWickColor: downColor
    }
  })
}

// Usage
changeCandleColors(chart, '#26a69a', '#ef5350')
```

## Theme Switcher

```javascript
const themes = {
  dark: {
    background: '#1e1e1e',
    candle: {
      upBodyColor: '#26a69a',
      downBodyColor: '#ef5350'
    },
    grid: { color: '#2a2a2a' },
    text: { color: '#888' }
  },
  light: {
    background: '#ffffff',
    candle: {
      upBodyColor: '#4caf50',
      downBodyColor: '#f44336'
    },
    grid: { color: '#e0e0e0' },
    text: { color: '#333' }
  }
}

function switchTheme(chart, themeName) {
  const theme = themes[themeName]
  if (theme) {
    chart.setTheme(theme)
  }
}

// Usage
switchTheme(chart, 'dark')
```

## Color Picker Integration

```html
<div class="color-picker">
  <label>Up Color: <input type="color" id="upColor" value="#26a69a"></label>
  <label>Down Color: <input type="color" id="downColor" value="#ef5350"></label>
</div>

<script>
  document.getElementById('upColor').addEventListener('change', (e) => {
    chart.setTheme({
      candle: { upBodyColor: e.target.value, upWickColor: e.target.value }
    })
  })

  document.getElementById('downColor').addEventListener('change', (e) => {
    chart.setTheme({
      candle: { downBodyColor: e.target.value, downWickColor: e.target.value }
    })
  })
</script>
```

## Related Documentation

- [Custom Theme Builder](../../examples/custom-theme-builder) - Theme builder example
- [Configuration](../../reference/02_configuration) - Theme configuration