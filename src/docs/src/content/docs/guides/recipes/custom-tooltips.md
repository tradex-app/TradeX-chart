---
title: Custom Tooltips
description: Create custom tooltips for chart data
---

Create custom tooltips to display chart data on hover.

## Basic Tooltip

```javascript
class ChartTooltip {
  constructor(chart) {
    this.chart = chart
    this.tooltip = this.createTooltip()
    this.setupListeners()
  }

  createTooltip() {
    const tooltip = document.createElement('div')
    tooltip.className = 'chart-tooltip'
    tooltip.style.cssText = `
      position: absolute;
      display: none;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      z-index: 1000;
    `
    
    document.body.appendChild(tooltip)
    return tooltip
  }

  setupListeners() {
    this.chart.on('mousemove', (event) => {
      this.show(event)
    })

    this.chart.on('mouseleave', () => {
      this.hide()
    })
  }

  show(event) {
    const candle = this.chart.getCandleAtPosition(event.x, event.y)
    if (!candle) {
      this.hide()
      return
    }

    const content = `
      <div><strong>Time:</strong> ${new Date(candle[0]).toLocaleString()}</div>
      <div><strong>Open:</strong> ${candle[1].toFixed(2)}</div>
      <div><strong>High:</strong> ${candle[2].toFixed(2)}</div>
      <div><strong>Low:</strong> ${candle[3].toFixed(2)}</div>
      <div><strong>Close:</strong> ${candle[4].toFixed(2)}</div>
      <div><strong>Volume:</strong> ${candle[5]?.toFixed(2) || 'N/A'}</div>
    `

    this.tooltip.innerHTML = content
    this.tooltip.style.display = 'block'
    this.tooltip.style.left = `${event.clientX + 10}px`
    this.tooltip.style.top = `${event.clientY + 10}px`
  }

  hide() {
    this.tooltip.style.display = 'none'
  }
}

// Usage
const tooltip = new ChartTooltip(chart)
```

## Styled Tooltip

```javascript
class StyledTooltip extends ChartTooltip {
  createTooltip() {
    const tooltip = document.createElement('div')
    tooltip.className = 'styled-tooltip'
    tooltip.style.cssText = `
      position: absolute;
      display: none;
      background: white;
      border: 2px solid #2196F3;
      border-radius: 8px;
      padding: 12px;
      font-size: 13px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      pointer-events: none;
      z-index: 1000;
      min-width: 200px;
    `
    
    document.body.appendChild(tooltip)
    return tooltip
  }

  show(event) {
    const candle = this.chart.getCandleAtPosition(event.x, event.y)
    if (!candle) {
      this.hide()
      return
    }

    const change = candle[4] - candle[1]
    const changePercent = (change / candle[1]) * 100
    const isUp = change >= 0

    const content = `
      <div style="border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 8px;">
        <strong>${new Date(candle[0]).toLocaleString()}</strong>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <div style="color: #666; font-size: 11px;">OPEN</div>
          <div style="font-weight: bold;">${candle[1].toFixed(2)}</div>
        </div>
        <div>
          <div style="color: #666; font-size: 11px;">HIGH</div>
          <div style="font-weight: bold; color: #4CAF50;">${candle[2].toFixed(2)}</div>
        </div>
        <div>
          <div style="color: #666; font-size: 11px;">LOW</div>
          <div style="font-weight: bold; color: #F44336;">${candle[3].toFixed(2)}</div>
        </div>
        <div>
          <div style="color: #666; font-size: 11px;">CLOSE</div>
          <div style="font-weight: bold;">${candle[4].toFixed(2)}</div>
        </div>
      </div>
      <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
        <div style="color: ${isUp ? '#4CAF50' : '#F44336'}; font-weight: bold;">
          ${isUp ? '▲' : '▼'} ${change.toFixed(2)} (${changePercent.toFixed(2)}%)
        </div>
      </div>
      ${candle[5] ? `
        <div style="margin-top: 8px;">
          <div style="color: #666; font-size: 11px;">VOLUME</div>
          <div style="font-weight: bold;">${candle[5].toLocaleString()}</div>
        </div>
      ` : ''}
    `

    this.tooltip.innerHTML = content
    this.tooltip.style.display = 'block'
    this.tooltip.style.left = `${event.clientX + 15}px`
    this.tooltip.style.top = `${event.clientY + 15}px`
  }
}
```

## Indicator Tooltip

```javascript
class IndicatorTooltip extends ChartTooltip {
  show(event) {
    const candle = this.chart.getCandleAtPosition(event.x, event.y)
    if (!candle) {
      this.hide()
      return
    }

    const indicators = this.chart.getIndicatorValues(candle[0])
    
    let content = `
      <div style="border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px; margin-bottom: 8px;">
        <strong>${new Date(candle[0]).toLocaleString()}</strong>
      </div>
    `

    // Add indicator values
    if (indicators.RSI) {
      content += `<div><strong>RSI:</strong> ${indicators.RSI.toFixed(2)}</div>`
    }
    if (indicators.MACD) {
      content += `
        <div><strong>MACD:</strong> ${indicators.MACD.macd.toFixed(2)}</div>
        <div><strong>Signal:</strong> ${indicators.MACD.signal.toFixed(2)}</div>
      `
    }
    if (indicators.SMA) {
      content += `<div><strong>SMA(20):</strong> ${indicators.SMA.toFixed(2)}</div>`
    }

    this.tooltip.innerHTML = content
    this.tooltip.style.display = 'block'
    this.tooltip.style.left = `${event.clientX + 10}px`
    this.tooltip.style.top = `${event.clientY + 10}px`
  }
}
```

## Related Documentation

- [Add Custom Buttons](add-custom-buttons) - Custom buttons
- [Events](../../reference/events) - Event handling
- [Indicators](../indicators) - Indicator guide