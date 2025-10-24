---
title: Repurpose Indicators
description: Reusing indicator classes to build custom composite indicators
---

# Repurpose Indicators

The chart's built-in indicators can be reused to build your own custom composite indicators.

## Overview

TradeX Chart provides a set of built-in technical indicators that can be combined and extended to create custom composite indicators. This allows you to:

- Combine multiple indicators into one
- Create custom trading signals
- Build indicator-based strategies
- Extend existing indicators with custom logic

## Accessing Built-in Indicators

### Get Indicator Class

```javascript
// Get the RSI indicator class
const RSI = chart.getIndicatorClass('RSI')

// Get the MACD indicator class
const MACD = chart.getIndicatorClass('MACD')

// Get the EMA indicator class
const EMA = chart.getIndicatorClass('EMA')
```

### Available Indicators

- **Moving Averages**: SMA, EMA, WMA, VWMA
- **Oscillators**: RSI, Stochastic, CCI, Williams %R
- **Trend**: MACD, ADX, Aroon, Parabolic SAR
- **Volatility**: Bollinger Bands, ATR, Keltner Channels
- **Volume**: OBV, MFI, Volume Profile

## Creating Composite Indicators

### Example 1: RSI with EMA Smoothing

```javascript
class SmoothedRSI {
  constructor(rsiPeriod = 14, emaPeriod = 9) {
    this.rsiPeriod = rsiPeriod
    this.emaPeriod = emaPeriod
    
    // Get indicator classes
    this.RSI = chart.getIndicatorClass('RSI')
    this.EMA = chart.getIndicatorClass('EMA')
  }

  calculate(data) {
    // Calculate RSI
    const rsiValues = this.RSI.calculate(data, { period: this.rsiPeriod })
    
    // Smooth RSI with EMA
    const smoothedRSI = this.EMA.calculate(rsiValues, { period: this.emaPeriod })
    
    return smoothedRSI
  }
}

// Usage
const smoothedRSI = new SmoothedRSI(14, 9)
const result = smoothedRSI.calculate(chartData)
```

### Example 2: MACD with RSI Filter

```javascript
class MACDRSICombo {
  constructor() {
    this.MACD = chart.getIndicatorClass('MACD')
    this.RSI = chart.getIndicatorClass('RSI')
  }

  calculate(data) {
    // Calculate MACD
    const macd = this.MACD.calculate(data, {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9
    })
    
    // Calculate RSI
    const rsi = this.RSI.calculate(data, { period: 14 })
    
    // Generate signals
    const signals = []
    for (let i = 0; i < data.length; i++) {
      const macdLine = macd.macd[i]
      const signalLine = macd.signal[i]
      const rsiValue = rsi[i]
      
      let signal = 'neutral'
      
      // Buy signal: MACD crosses above signal AND RSI < 30
      if (macdLine > signalLine && rsiValue < 30) {
        signal = 'buy'
      }
      // Sell signal: MACD crosses below signal AND RSI > 70
      else if (macdLine < signalLine && rsiValue > 70) {
        signal = 'sell'
      }
      
      signals.push(signal)
    }
    
    return { macd, rsi, signals }
  }
}

// Usage
const combo = new MACDRSICombo()
const result = combo.calculate(chartData)
```

### Example 3: Multi-Timeframe RSI

```javascript
class MultiTimeframeRSI {
  constructor(periods = [14, 28, 56]) {
    this.periods = periods
    this.RSI = chart.getIndicatorClass('RSI')
  }

  calculate(data) {
    const results = {}
    
    this.periods.forEach(period => {
      results[`rsi${period}`] = this.RSI.calculate(data, { period })
    })
    
    // Calculate average RSI
    const avgRSI = []
    for (let i = 0; i < data.length; i++) {
      let sum = 0
      let count = 0
      
      this.periods.forEach(period => {
        const value = results[`rsi${period}`][i]
        if (value !== null && value !== undefined) {
          sum += value
          count++
        }
      })
      
      avgRSI.push(count > 0 ? sum / count : null)
    }
    
    results.average = avgRSI
    return results
  }
}

// Usage
const mtfRSI = new MultiTimeframeRSI([14, 28, 56])
const result = mtfRSI.calculate(chartData)
```

## Extending Indicators

### Add Custom Logic

```javascript
class CustomBollingerBands {
  constructor() {
    this.BB = chart.getIndicatorClass('BollingerBands')
  }

  calculate(data, params = {}) {
    const period = params.period || 20
    const stdDev = params.stdDev || 2
    
    // Calculate standard Bollinger Bands
    const bb = this.BB.calculate(data, { period, stdDev })
    
    // Add custom squeeze detection
    const squeeze = []
    for (let i = 0; i < data.length; i++) {
      const bandwidth = (bb.upper[i] - bb.lower[i]) / bb.middle[i]
      
      // Detect squeeze (narrow bands)
      squeeze.push(bandwidth < 0.05)
    }
    
    return {
      ...bb,
      squeeze
    }
  }
}

// Usage
const customBB = new CustomBollingerBands()
const result = customBB.calculate(chartData, { period: 20, stdDev: 2 })
```

### Override Calculation

```javascript
class WeightedRSI {
  constructor() {
    this.RSI = chart.getIndicatorClass('RSI')
  }

  calculate(data, params = {}) {
    const period = params.period || 14
    const weights = params.weights || [1, 1, 1, 2, 2, 3] // Recent candles weighted more
    
    // Get price changes
    const changes = []
    for (let i = 1; i < data.length; i++) {
      changes.push(data[i][4] - data[i - 1][4]) // close - prev close
    }
    
    // Calculate weighted gains and losses
    const rsi = []
    for (let i = period; i < changes.length; i++) {
      let weightedGains = 0
      let weightedLosses = 0
      let totalWeight = 0
      
      for (let j = 0; j < period; j++) {
        const change = changes[i - period + j]
        const weight = weights[j % weights.length]
        
        if (change > 0) {
          weightedGains += change * weight
        } else {
          weightedLosses += Math.abs(change) * weight
        }
        
        totalWeight += weight
      }
      
      const avgGain = weightedGains / totalWeight
      const avgLoss = weightedLosses / totalWeight
      
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss
      const rsiValue = 100 - (100 / (1 + rs))
      
      rsi.push(rsiValue)
    }
    
    return rsi
  }
}

// Usage
const weightedRSI = new WeightedRSI()
const result = weightedRSI.calculate(chartData, {
  period: 14,
  weights: [1, 1, 1, 2, 2, 3]
})
```

## Registering Custom Indicators

### Register with Chart

```javascript
// Define custom indicator
class MyCustomIndicator {
  static id = 'MY_CUSTOM'
  static name = 'My Custom Indicator'
  
  constructor(params) {
    this.params = params
  }

  calculate(data) {
    // Your calculation logic
    return []
  }

  render(ctx, data) {
    // Your rendering logic
  }
}

// Register indicator
chart.registerIndicator(MyCustomIndicator)

// Use indicator
const indicatorId = chart.addIndicator('MY_CUSTOM', {
  // params
})
```

### Full Example: Composite Indicator

```javascript
class TrendStrength {
  static id = 'TREND_STRENGTH'
  static name = 'Trend Strength'
  
  constructor(params = {}) {
    this.adxPeriod = params.adxPeriod || 14
    this.macdFast = params.macdFast || 12
    this.macdSlow = params.macdSlow || 26
    
    // Get indicator classes
    this.ADX = chart.getIndicatorClass('ADX')
    this.MACD = chart.getIndicatorClass('MACD')
  }

  calculate(data) {
    // Calculate ADX for trend strength
    const adx = this.ADX.calculate(data, { period: this.adxPeriod })
    
    // Calculate MACD for trend direction
    const macd = this.MACD.calculate(data, {
      fastPeriod: this.macdFast,
      slowPeriod: this.macdSlow,
      signalPeriod: 9
    })
    
    // Combine into trend strength score
    const trendStrength = []
    for (let i = 0; i < data.length; i++) {
      const adxValue = adx[i]
      const macdValue = macd.macd[i]
      const signalValue = macd.signal[i]
      
      if (adxValue === null || macdValue === null) {
        trendStrength.push(null)
        continue
      }
      
      // Score: 0-100
      // ADX > 25 = strong trend
      // MACD above signal = uptrend, below = downtrend
      let score = (adxValue / 50) * 100 // Normalize ADX to 0-100
      
      if (macdValue < signalValue) {
        score = -score // Negative for downtrend
      }
      
      trendStrength.push(Math.max(-100, Math.min(100, score)))
    }
    
    return trendStrength
  }

  render(ctx, data, values) {
    // Render as histogram
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const barWidth = width / data.length
    
    values.forEach((value, i) => {
      if (value === null) return
      
      const x = i * barWidth
      const barHeight = (Math.abs(value) / 100) * (height / 2)
      const y = value > 0 ? height / 2 - barHeight : height / 2
      
      ctx.fillStyle = value > 0 ? '#26a69a' : '#ef5350'
      ctx.fillRect(x, y, barWidth, barHeight)
    })
  }
}

// Register and use
chart.registerIndicator(TrendStrength)
const id = chart.addIndicator('TREND_STRENGTH', {
  adxPeriod: 14,
  macdFast: 12,
  macdSlow: 26
})
```

## Best Practices

### 1. Cache Calculations

```javascript
class CachedIndicator {
  constructor() {
    this.cache = new Map()
  }

  calculate(data, params) {
    const key = this.getCacheKey(data, params)
    
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }
    
    const result = this.doCalculation(data, params)
    this.cache.set(key, result)
    
    return result
  }

  getCacheKey(data, params) {
    return `${data.length}_${JSON.stringify(params)}`
  }
}
```

### 2. Handle Null Values

```javascript
function safeCalculate(indicator, data, params) {
  try {
    const result = indicator.calculate(data, params)
    
    // Filter out null/undefined values
    return result.map(v => {
      if (v === null || v === undefined || isNaN(v)) {
        return null
      }
      return v
    })
  } catch (error) {
    console.error('Indicator calculation failed:', error)
    return new Array(data.length).fill(null)
  }
}
```

### 3. Validate Parameters

```javascript
class ValidatedIndicator {
  constructor(params) {
    this.validateParams(params)
    this.params = params
  }

  validateParams(params) {
    if (params.period && params.period < 1) {
      throw new Error('Period must be >= 1')
    }
    
    if (params.stdDev && params.stdDev < 0) {
      throw new Error('Standard deviation must be >= 0')
    }
  }
}
```

## Related Documentation

- [Custom Indicators](../advanced/custom-indicators) - Creating indicators from scratch
- [API Reference](../api/indicators) - Indicator API
- [Examples](../examples/indicator-alerts) - Indicator examples
