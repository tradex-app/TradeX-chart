---
title: Configuration
description: How to configure TradeX Chart
---

The configuration object is passed to the chart after an instance of it has been inserted into the DOM. The config provides:

* Time frame
* Layout definition
* Optionally
  * Datasets - price, indicators, drawings
  * Theme

## Defining and Starting the Chart

```javascript
import { Chart } from 'tradex-chart'

// After the chart has mounted on the DOM,
// Start it with a configuration object
chart.start(config)
```

## Minimal Config

Config describes the basics of the chart, size, ect. It requires the following minimum properties to be valid:

```javascript
import * as talib from './node_modules/talib-web/lib/index.esm'

// minimal config
const config = {
  title: "BTC/USDT",
  talib: talib,
  // talib: `${window.location.origin}/talib.wasm`
}
```
``title`` is required so you know what asset you are looking at.

``talib`` is a pointer to the [talib-web](https://https//anchegt.github.io/talib-web/) technical indicator library compiled as a WebAssembly module. TradeX-chart will take care of instantiating it.

:::caution
Depending upon the server configuration, ``.wasm`` files might be served with an incorrect mime type when loaded from a subdirectory.  
If that is the case, copy ``tablib.wasm`` from ``./modules/talib-web/lib/`` to the web server root, and reference it in the config as following:  
``talib: `${window.location.origin}/talib.wasm` ``
:::

## Basic Config

``height`` and ``width`` default to 100% of the parent element's height and width if not defined in the config. ``height`` and ``width`` are the number of pixels. The chart has a minimal height `300` and width of `400` pixels.

``rangeLimit`` defines the initial number of candles to display. It is treated as the "zoom" level of the timeline. 

[Config Object Options](#config-object-options) provides a complete overview of all settings.

## State

State is a snapshot of the entirety of the chart data state, including chart price data, indicators, drawing tools, datasets and theme. Where properties of Config and ``state.settings`` overlap, Config properties take priority.

Future versions of TradeX-chart will allow you to swap chart states.

The chart state can be exported to be reused later.

```javascript
JSON.stringify(chart.state)
```

Details of the state structure are found in [state](../state)

## Themes

For API methods to manipulate chart themes refer to [themes](../themes)

### Candle Types

```javascript
export const CandleType = {
  CANDLE_SOLID: 'candle_solid',
  CANDLE_HOLLOW: 'candle_hollow',
  CANDLE_UP_HOLLOW: 'candle_up_hollow',
  CANDLE_DOWN_HOLLOW: 'candle_down_hollow',
  OHLC: 'ohlc',
  AREA: 'area',
  LINE: 'line'
}
```
Refer to [Candle Types](themes#candle-types) for visual examples of each candle type.


# Config Object Options

```javascript
const config = {
  id: "TradeX_test",
  title: "BTC/USDT",
  // width and height are pixel values.
  // if none are provided, the chart will responsively resize to the parent element that contains it
  width: 1000,
  height: 800,
  // utils bar config
  utils: {},
  // tools bar config
  tools: {},
  // timeframes: s, m, h, d, M, y
  timeFrame: "1m",
  // timestamp for the chart to start on
  rangeStartTS: rangeStartTS,
  // number of candles for the chart to display on start
  rangeLimit: 30,
  // number of empty candles (time frame units) the chart will display after the last candle
  limitFuture: 200,
  // number of empty candles (time frame units) the chart will display before the first candle
  limitPast: 200,
  // minimum candles the chart will zoom to and display
  minCandles: 20,
  // maximum candles the chart will zoom to and display
  minCandles: 1000,
  // "padding" added to upper and lower price bounds for display
  yAxisBounds: 0.005,
  // chart theme
  theme: {
    candle: {
      // candle types: 'candle_hollow','candle_up_hollow','candle_down_hollow','ohlc','area','line'
      Type: "candle_solid",
      AreaLineColour: "#4c5fe7",
      AreaFillColour: ["#4c5fe780", "#4c5fe700"],
      UpBodyColour: "#00F04088",
      UpWickColour: "#0F4",
      DnBodyColour: "#F0004088",
      DnWickColour: "#F04",
    },
    volume: {
      Height: 15,
      UpColour: "#00F04044",
      DnColour: "#F0004044",
    },
    xAxis: {
      colourTick: "#6a6f80",
      colourLabel: "#6a6f80",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: XAxisStyle.FONTFAMILY,
      // fontSize: XAxisStyle.FONTSIZE,
      // fontWeight: XAxisStyle.FONTWEIGHT,
      // line: "#656565"
      slider: "#586ea6",
      handle: "#586ea688",
      tickMarker: false,
    },
    yAxis: {
      colourTick: "#6a6f80",
      colourLabel: "#6a6f80",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: YAxisStyle.FONTFAMILY,
      // fontSize: YAxisStyle.FONTSIZE,
      // fontWeight: YAxisStyle.FONTWEIGHT,
      // line: "#656565"
      tickMarker: false,
      location:"left",
    },
    chart: {
      Background: "#141414",
      BorderColour: "#666",
      GridColour: "#333",
      TextColour: "#ccc"
    },
    onChart: {

    },
    offChart: {

    },
    tools: {
      // tool bar locations: "left", "right", false - defaults to left
      location: false
    },
    utils: {
      // utils bar locations: false - defaults to true
      location: false
    },
    time: {
      // timeline navigation: false - defaults to true
      navigation: false
    },
    legend: {
      // legend controls: false - defaults to true
      // display icons, order, visible, remove, config
      controls: false
      // default text colour
      colour: "#96a9db",
    }
  },
  // used for chart data validation, timestamps compared against BTC genisis block
  isCrypto: true,
  // enable console.log output - WARNING! my impact performance
  logs: false,
  // enable console.info output - WARNING! my impact performance
  infos: true,
  // enable console.warning output - WARNING! my impact performance
  warnings: true,
  // enable console.error output - WARNING! my impact performance
  errors: true,
  // enable live updates for a price stream
  stream: {},
  // maximum rate in milliseconds that a live stream should be REDRAWN, does not throttle actual stream rate
  maxCandleUpdate: 250,
  // pointer to talib-web library, required if you want to see indicators
  talib: talib,
  // file path (relative to server document root) for the talib-web .wasm file
  // required if you want to see indicators
  wasm: wasm,
  // initial data sate provided to the chart, price history, indicators, datasets
  // is optional - chart will start without one, and await data via the API
  state: {
    // Details of the state structure are found in [state](state)
  },
  // user defined functions to run with or replace default methods
  callbacks: {
    indicatorSettings: {fn: (c)=>{ alert(c.id) }, own: true}
  }
}
```
