---
title: Testing
description: Testing strategies for TradeX Chart applications
---

Comprehensive testing guide for applications using TradeX Chart.

## Unit Testing

### Testing Chart Initialization

```javascript
import { describe, it, expect, beforeEach } from 'vitest'

describe('TradeX Chart', () => {
  let chart

  beforeEach(() => {
    chart = document.createElement('tradex-chart')
    document.body.appendChild(chart)
  })

  it('should initialize with default config', () => {
    chart.start()
    expect(chart.isInitialized()).toBe(true)
  })

  it('should load OHLCV data', () => {
    const data = [
      [1609459200000, 29000, 29500, 28800, 29200, 1234.56]
    ]
    
    chart.start({ state: { ohlcv: data } })
    expect(chart.getData()).toHaveLength(1)
  })
})
```

### Testing Indicators

```javascript
describe('Indicators', () => {
  it('should calculate RSI correctly', () => {
    const rsi = new RSI({ period: 14 })
    const data = generateTestData(100)
    
    const result = rsi.calculate(data)
    
    expect(result).toBeDefined()
    expect(result.length).toBe(data.length - 14)
    expect(result[0]).toBeGreaterThanOrEqual(0)
    expect(result[0]).toBeLessThanOrEqual(100)
  })
})
```

## Integration Testing

### Testing User Interactions

```javascript
import { fireEvent } from '@testing-library/dom'

describe('User Interactions', () => {
  it('should handle mouse click', () => {
    const chart = createChart()
    const clickHandler = vi.fn()
    
    chart.on('click', clickHandler)
    
    const canvas = chart.getCanvas()
    fireEvent.click(canvas, { clientX: 100, clientY: 100 })
    
    expect(clickHandler).toHaveBeenCalled()
  })

  it('should zoom on wheel event', () => {
    const chart = createChart()
    const initialZoom = chart.getZoom()
    
    const canvas = chart.getCanvas()
    fireEvent.wheel(canvas, { deltaY: -100 })
    
    expect(chart.getZoom()).toBeGreaterThan(initialZoom)
  })
})
```

## E2E Testing

### Playwright Tests

```javascript
import { test, expect } from '@playwright/test'

test.describe('TradeX Chart E2E', () => {
  test('should render chart', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    const chart = page.locator('tradex-chart')
    await expect(chart).toBeVisible()
  })

  test('should load data and display candles', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    // Wait for data to load
    await page.waitForSelector('.candle')
    
    const candles = page.locator('.candle')
    const count = await candles.count()
    
    expect(count).toBeGreaterThan(0)
  })

  test('should interact with crosshair', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    const chart = page.locator('tradex-chart')
    await chart.hover({ position: { x: 200, y: 200 } })
    
    const crosshair = page.locator('.crosshair')
    await expect(crosshair).toBeVisible()
  })
})
```

## Visual Regression Testing

### Percy Integration

```javascript
import percySnapshot from '@percy/playwright'

test('visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForSelector('tradex-chart')
  
  await percySnapshot(page, 'TradeX Chart - Default')
})
```

## Performance Testing

### Measuring Render Performance

```javascript
test('should render 1000 candles in under 100ms', () => {
  const chart = createChart()
  const data = generateTestData(1000)
  
  const start = performance.now()
  chart.setData(data)
  const end = performance.now()
  
  expect(end - start).toBeLessThan(100)
})
```

## Mocking Data

### Test Data Generator

```javascript
function generateTestData(count, startPrice = 30000) {
  const data = []
  let price = startPrice
  let timestamp = Date.now() - (count * 60000)
  
  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.5) * 1000
    const open = price
    const close = price + change
    const high = Math.max(open, close) + Math.random() * 500
    const low = Math.min(open, close) - Math.random() * 500
    const volume = Math.random() * 1000
    
    data.push([timestamp, open, high, low, close, volume])
    
    price = close
    timestamp += 60000
  }
  
  return data
}
```

## Related Documentation

- [Development Setup](development/local-setup) - Local development
- [Debugging](development/debugging-tips) - Debugging tips
- [Contributing](contributing) - Contributing guide