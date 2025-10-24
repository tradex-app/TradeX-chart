---
title: Frequently Asked Questions
description: Common questions and answers about TradeX Chart
---

# Frequently Asked Questions (FAQ)

Find answers to common questions about TradeX Chart.

## General Questions

### What is TradeX Chart?

TradeX Chart is an open-source, highly customizable financial charting library built in plain JavaScript with no framework dependencies. It's designed for displaying candlestick charts, technical indicators, and drawing tools for trading applications.

### Is TradeX Chart free to use?

Yes! TradeX Chart is open source under the GNU GPL3 license. It's completely free to use, modify, and distribute.

### What browsers are supported?

TradeX Chart supports modern browsers that implement ECMAScript 2022:
- Chrome/Edge 94+
- Firefox 93+
- Safari 15.4+
- Opera 80+

### Can I use TradeX Chart with React/Vue/Angular?

Yes! TradeX Chart is framework-agnostic. It's a Web Component that works with any framework. See our [framework integration guides](../backend/) for examples.

### How does TradeX Chart compare to TradingView?

See our detailed [comparison guide](comparison) for a comprehensive breakdown. Key differences:
- TradeX is self-hosted and free
- TradingView is hosted and requires licensing
- TradeX offers more customization
- TradingView has more built-in social features

## Installation & Setup

### How do I install TradeX Chart?

```bash
# Via npm
npm install tradex-chart

# Via yarn
yarn add tradex-chart
```

Or use a CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>
```

See [Getting Started](../../reference/01_getting_started) for details.

### What dependencies does TradeX Chart have?

TradeX Chart has only one runtime dependency:
- **mjolnir.js** (v2.7.3) - For touch and pointer event handling

Optionally:
- **talib-web** - For technical indicators (WebAssembly)

### Do I need to install TALib?

Yes, if you want to use technical indicators. Install talib-web:

```bash
npm install talib-web
```

Then configure it in your chart:

```javascript
import * as talib from 'talib-web'

const config = {
  talib: talib,
  // ... other config
}
```

### Why isn't my chart displaying?

Common issues:

1. **Missing data**: Ensure you provide OHLCV data in the correct format
2. **Container size**: The chart container must have explicit width/height
3. **TALib not configured**: Required for indicators
4. **Incorrect import**: Use `import { Chart } from 'tradex-chart'`

See [Troubleshooting](#troubleshooting) below.

## Data & Configuration

### What data format does TradeX Chart use?

OHLCV format as arrays:

```javascript
[
  [timestamp, open, high, low, close, volume],
  [1609459200000, 29000, 29500, 28800, 29200, 1234.56],
  // ...
]
```

- **timestamp**: Unix timestamp in milliseconds
- **open, high, low, close**: Price values as numbers
- **volume**: Trading volume as number

### How do I load historical data?

Fetch data from your API and pass it to the chart:

```javascript
const response = await fetch('https://api.example.com/ohlcv')
const ohlcv = await response.json()

chart.start({
  title: 'BTC/USDT',
  state: { ohlcv }
})
```

See [REST API Integration](../backend/rest-api-integration) for details.

### How do I stream real-time data?

Use WebSocket connections:

```javascript
const ws = new WebSocket('wss://api.example.com/ws')

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const candle = [data.timestamp, data.open, data.high, data.low, data.close, data.volume]
  
  if (data.isClosed) {
    chart.addCandle(candle)
  } else {
    chart.updateStreamingCandle(candle)
  }
}
```

See [WebSocket Integration](../backend/websocket-integration) for details.

### Can I use multiple timeframes?

Yes! You can switch timeframes by loading different data:

```javascript
function changeTimeframe(timeframe) {
  const data = await fetchData(symbol, timeframe)
  chart.mergeData(data)
}
```

### How do I save/restore chart state?

Export and import state:

```javascript
// Export
const state = chart.state.export()
localStorage.setItem('chartState', JSON.stringify(state))

// Import
const savedState = JSON.parse(localStorage.getItem('chartState'))
chart.start({ state: savedState })
```

## Indicators & Overlays

### How do I add indicators?

```javascript
// Add indicator
chart.addIndicator('RSI')
chart.addIndicator('EMA', { length: 20 })

// Remove indicator
chart.removeIndicator(indicatorId)
```

### What indicators are available?

TradeX Chart includes 100+ indicators via TALib:
- Moving Averages (SMA, EMA, WMA, etc.)
- Oscillators (RSI, MACD, Stochastic, etc.)
- Volatility (Bollinger Bands, ATR, etc.)
- Volume indicators
- And many more

See [Indicators](../../reference/indicators) for the full list.

### Can I create custom indicators?

Yes! Extend the Indicator class:

```javascript
class MyIndicator extends Indicator {
  constructor(target, xAxis, yAxis, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params)
  }
  
  calcIndicator(indicator, params, range) {
    // Your calculation logic
  }
}
```

See [Custom Indicators](../../reference/indicators_custom) for details.

### How do I customize indicator colors?

Use themes:

```javascript
const config = {
  theme: {
    indicator: {
      RSI: {
        colour: '#ff0000',
        lineWidth: 2
      }
    }
  }
}
```

## Customization & Theming

### How do I change chart colors?

Use the theme configuration:

```javascript
const config = {
  theme: {
    candle: {
      UpBodyColour: '#26a69a',
      UpWickColour: '#26a69a',
      DnBodyColour: '#ef5350',
      DnWickColour: '#ef5350'
    },
    chart: {
      Background: '#1e1e1e',
      GridColour: '#2a2a2a'
    }
  }
}
```

See [Themes](../../reference/themes) for all options.

### Can I add a watermark?

Yes:

```javascript
const config = {
  watermark: {
    text: 'My Exchange',
    // or
    imgURL: './logo.svg'
  }
}
```

### How do I hide the toolbar?

```javascript
const config = {
  tools: { location: false },
  utils: { location: false }
}
```

### Can I customize the chart size?

```javascript
const config = {
  width: 1200,
  height: 600
}

// Or resize later
chart.setDimensions({ w: 1200, h: 600 })
```

## Drawing Tools

### How do I enable drawing tools?

Drawing tools are enabled by default. Access them via:

```javascript
// Activate a tool
chart.tools.activate('line')

// Available tools: line, ray, horizontal, vertical, fibonacci, etc.
```

### Can I save drawings?

Yes, drawings are included in the chart state:

```javascript
const state = chart.state.export()
// Save state to database or localStorage
```

### How do I programmatically add drawings?

Use the tools API:

```javascript
chart.tools.addDrawing({
  type: 'line',
  start: { x: timestamp1, y: price1 },
  end: { x: timestamp2, y: price2 }
})
```

## Performance

### How much data can TradeX Chart handle?

TradeX Chart can efficiently handle:
- **10,000+ candles** in memory
- **Real-time updates** at 60 FPS
- **Multiple indicators** simultaneously

Performance depends on:
- Device hardware
- Number of active indicators
- Chart size and complexity

### How do I improve performance?

1. **Limit visible candles**: Use `rangeLimit` config
2. **Use data caching**: Cache historical data
3. **Optimize indicators**: Reduce number of active indicators
4. **Use Web Workers**: Offload calculations
5. **Throttle updates**: Batch real-time updates

See [Data Caching Strategies](../backend/data-caching-strategies).

### Does TradeX Chart support mobile?

Yes! TradeX Chart is fully responsive and supports:
- Touch gestures (pinch to zoom, pan)
- Mobile-optimized UI
- Responsive layouts

## Troubleshooting

### Chart is blank/not rendering

**Check:**
1. Container has explicit dimensions
2. Data is in correct format
3. TALib is configured (for indicators)
4. No console errors

```javascript
// Ensure container has size
#chart-container {
  width: 100%;
  height: 600px;
}
```

### "TALib not found" error

Install and configure talib-web:

```bash
npm install talib-web
```

```javascript
import * as talib from 'talib-web'

const config = {
  talib: talib
}
```

### Indicators not displaying

**Check:**
1. TALib is configured
2. Indicator name is correct
3. Data range is sufficient
4. No console errors

```javascript
// Check available indicators
console.log(chart.core.indicatorClasses)
```

### Real-time updates not working

**Check:**
1. WebSocket connection is established
2. Data format matches expected format
3. Using correct update method:
   - `addCandle()` for closed candles
   - `updateStreamingCandle()` for forming candles

### Memory leaks

**Solutions:**
1. Call `chart.destroy()` when removing chart
2. Unsubscribe from events
3. Close WebSocket connections
4. Clear intervals/timeouts

```javascript
// Cleanup
chart.destroy()
ws.close()
```

### CORS errors

**Solutions:**
1. Configure API server to allow CORS
2. Use a proxy server
3. Serve from same domain

## TypeScript

### Does TradeX Chart support TypeScript?

Yes! Type definitions are included:

```typescript
import { Chart } from 'tradex-chart'

const chart: Chart = document.createElement('tradex-chart')
```

### Where are the type definitions?

Included in the package at `dist/tradex-chart.d.ts`.

## Licensing & Commercial Use

### Can I use TradeX Chart commercially?

Yes, under the GNU GPL3 license. You can:
- Use in commercial applications
- Modify the source code
- Distribute modified versions

**Requirements:**
- Keep the GPL3 license
- Make source code available if distributing
- Attribute the original project

### Do I need to open source my application?

If you distribute your application, yes. If it's a web service (SaaS), no.

See the [GNU GPL3 license](https://www.gnu.org/licenses/gpl-3.0.en.html) for details.

### Can I get commercial support?

Currently, support is community-based via:
- [GitHub Issues](https://github.com/tradex-app/TradeX-chart/issues)
- [Discord](https://discord.gg/6XS9tDrcdq)
- Documentation

## Getting Help

### Where can I get help?

1. **Documentation**: Check these docs first
2. **GitHub Issues**: [Search existing issues](https://github.com/tradex-app/TradeX-chart/issues)
3. **Discord**: [Join the community](https://discord.gg/6XS9tDrcdq)
4. **Examples**: Review [code examples](../../examples/01_static_chart)

### How do I report a bug?

1. Check if it's already reported
2. Create a minimal reproduction
3. [Open an issue](https://github.com/tradex-app/TradeX-chart/issues/new)
4. Include:
   - TradeX Chart version
   - Browser and OS
   - Code example
   - Expected vs actual behavior

### How do I request a feature?

[Open a feature request](https://github.com/tradex-app/TradeX-chart/issues/new) with:
- Clear description
- Use case
- Example implementation (if possible)

## Related Documentation

- [Getting Started](../../reference/01_getting_started) - Installation and setup
- [Configuration](../../reference/02_configuration) - Chart configuration
- [API Reference](../../api/core) - Complete API documentation
- [Examples](../../examples/01_static_chart) - Live code examples
- [Comparison Guide](comparison) - vs other libraries