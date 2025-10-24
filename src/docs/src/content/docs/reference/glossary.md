---
title: Glossary
description: Common terms and definitions used in TradeX Chart
---

# Glossary

A comprehensive guide to terminology used in TradeX Chart and financial charting.

## A

### API (Application Programming Interface)
The set of methods and properties exposed by TradeX Chart for programmatic control and customization.

### ATR (Average True Range)
A technical indicator that measures market volatility by calculating the average range between high and low prices over a specified period.

### Axis
A reference line used to measure and display data values. TradeX Chart uses:
- **X-Axis (Timeline)**: Horizontal axis showing time
- **Y-Axis (Scale)**: Vertical axis showing price or value

## B

### Bollinger Bands
A volatility indicator consisting of a moving average with upper and lower bands that are standard deviations away from the average.

### Buffer
Extra space allocated beyond the visible chart area to enable smooth scrolling and panning. Configured via `config.buffer`.

### Candle
See [Candlestick](#candlestick).

### Candlestick
A chart element representing price movement over a time period, showing:
- **Open**: Opening price
- **High**: Highest price
- **Low**: Lowest price
- **Close**: Closing price
- **Body**: Rectangle between open and close
- **Wick/Shadow**: Lines extending to high and low

### Canvas
The HTML5 `<canvas>` element used by TradeX Chart for rendering. TradeX uses multiple layered canvases for performance optimization.

### CEL (Canvas Extension Layer)
TradeX Chart's custom canvas layer system for managing multiple rendering layers.

### Chart Pane
A distinct section of the chart that can contain price data or indicators. Types include:
- **Primary Pane**: Main chart showing price/candlesticks
- **Secondary Pane**: Additional panes for indicators (e.g., RSI, MACD)

### Config
The configuration object passed to [chart.start()](cci:1://file:///home/neoarttec/Programming-Local/TradeX-chart/src/components/chart.js:254:2-305:3) that defines chart behavior, appearance, and initial state.

### Core
The central component of TradeX Chart that manages state, events, and coordinates all other components.

### Cursor
The crosshair or pointer displayed when hovering over the chart, showing precise time and price values.

## D

### DataSource
The class responsible for managing data flow, including fetching historical data and handling real-time updates.

### Divider
The draggable element between chart panes that allows manual resizing.

### Drawing Tools
Interactive tools for adding annotations to the chart:
- Trend lines
- Horizontal/vertical lines
- Fibonacci retracements
- Shapes and text

## E

### EMA (Exponential Moving Average)
A moving average that gives more weight to recent prices, making it more responsive to new information.

### Event Hub
The centralized event messaging system that allows components to communicate via publish-subscribe pattern.

### Overlay
A visual layer rendered on the chart, such as:
- Grid lines
- Candlesticks
- Volume bars
- Indicators
- Drawing tools
- Custom visualizations

## F

### Fibonacci Retracement
A drawing tool based on Fibonacci ratios used to identify potential support and resistance levels.

### Frame
A single render cycle of the chart. TradeX Chart optimizes rendering to maintain smooth frame rates.

## G

### Graph
The component that manages the viewport and all overlays within a chart pane.

### Grid
The overlay that displays horizontal and vertical reference lines on the chart.

## H

### High-Low
An overlay showing the highest and lowest prices within the visible range.

## I

### Indicator
A mathematical calculation based on price, volume, or other data used for technical analysis. Indicators extend the Overlay class and can have:
- Their own chart pane
- Legend with value display
- Configuration controls
- Custom parameters

Examples: RSI, MACD, Bollinger Bands, Moving Averages

## L

### Layer
A canvas rendering layer. TradeX Chart uses multiple layers for efficient rendering and hit detection.

### Legend
The information panel displaying:
- Chart title and timeframe
- OHLCV values at cursor position
- Indicator values and settings
- Control buttons

### Lightweight
Refers to minimal bundle size and dependencies. See [comparison guide](../guides/comparison) for TradeX vs Lightweight Charts.

## M

### MACD (Moving Average Convergence Divergence)
A trend-following momentum indicator showing the relationship between two moving averages.

### Main Pane
The container holding all chart panes, timeline, and scale components.

### Mjolnir.js
The single dependency used by TradeX Chart for handling touch and pointer events.

## O

### OHLC
Open, High, Low, Close - the four price points that define a candlestick (without volume).

### OHLCV
Open, High, Low, Close, Volume - the complete data structure for a candlestick including trading volume.

### Overlay
See [Overlay](#overlay) above.

## P

### Pane
See [Chart Pane](#chart-pane).

### Primary Pane
The main chart pane displaying price data (candlesticks). Every chart has exactly one primary pane.

## R

### Range
The subset of data currently visible or being processed by the chart. Includes:
- Start and end timestamps
- Data array
- Index positions
- Value max/min

### Render
The process of drawing chart elements to the canvas. TradeX Chart uses optimized rendering to update only changed elements.

### RSI (Relative Strength Index)
A momentum oscillator that measures the speed and magnitude of price changes, typically displayed in a secondary pane.

## S

### Scale
The Y-axis component showing price or value levels. Can be:
- **Linear**: Equal spacing between values
- **Logarithmic**: Percentage-based spacing
- **Percent**: Relative to a base value

### Secondary Pane
Additional chart panes below the primary pane, typically used for indicators like RSI, MACD, or volume.

### SMA (Simple Moving Average)
The average price over a specified number of periods, calculated by adding prices and dividing by the count.

### Snapshot
A serializable representation of the chart's current state that can be exported and restored later.

### State
The complete data structure representing the chart's configuration, data, indicators, drawings, and theme. Can be:
- Exported: `chart.state.export()`
- Imported: Via config or `chart.state.import()`
- Swapped: Multiple states can be held in memory

### State Machine
A behavioral model managing chart states and transitions (e.g., idle, tool_activated, chart_pan).

### Stream
Real-time data updates flowing into the chart. TradeX Chart supports streaming price data via WebSocket or other mechanisms.

## T

### TALib (Technical Analysis Library)
A WebAssembly-compiled library providing 100+ technical indicators. TradeX Chart integrates TALib for indicator calculations.

### Theme
The visual styling configuration controlling colors, fonts, sizes, and appearance of all chart elements. Fully customizable via the config object.

### Tick
A single price update in real-time data streaming.

### Timeframe
The duration represented by each candlestick (e.g., 1m, 5m, 1h, 1d). Also called "interval" or "period".

### Timeline
The X-axis component showing time labels and managing time-based positioning.

### Tool
An interactive feature for drawing or annotating the chart. See [Drawing Tools](#drawing-tools).

## V

### Viewport
The visible area of the chart where overlays are rendered.

### Volume
The trading volume (number of shares/contracts traded) during a time period. Often displayed as bars below the price chart.

## W

### Watermark
A semi-transparent image or text displayed behind chart content, typically showing the trading pair or branding.

### Web Worker
A background thread for offloading heavy calculations. TradeX Chart supports Web Workers for indicator calculations.

### Widget
A UI component like buttons, dialogs, or controls. TradeX Chart includes a widget system for extensibility.

### Wick
The thin line extending from a candlestick body to the high or low price. Also called "shadow".

## X

### X-Axis
See [Timeline](#timeline).

## Y

### Y-Axis
See [Scale](#scale).

## Z

### Zoom
The action of changing the visible time range by increasing or decreasing the number of visible candles. Controlled by:
- Mouse wheel
- Pinch gestures on touch devices
- API methods: `chart.setRange()`

---

## Related Documentation

- [Architecture](architecture) - Understanding TradeX Chart's structure
- [Configuration](02_configuration) - Setting up your chart
- [Indicators](indicators) - Working with technical indicators
- [Overlays](overlays) - Creating custom overlays
- [State Management](state) - Managing chart state
- [API Reference](../api/core) - Complete API documentation

## Contributing

Found a term that should be added to this glossary? [Open an issue](https://github.com/tradex-app/TradeX-chart/issues) or submit a pull request!
