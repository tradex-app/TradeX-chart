# TradeXChart

TradeXChart follows [breaking].[feature].[fix] versioning

eg. 0.100.6

[Semantic Versioning](https://semver.org/)

# Functional Organization

* Factory
  * Core
    * Utils
    * Widgets
    * Body
      * Tools
      * Main Pane
        * Timeline (X Axis)
        * Rows
          * Row
            * Chart or Off Chart Indicators
              * Price Scale (Y Axis)
              * Graph
                * Overlays
                  * Grid
                  * Cursor
                  * Price Line
                  * Candles
                  * Volume
                  * Technical Indicators
                  * User Defined

## Factory

The static factory class is used to instantiate (multiple) chart instances.

## Core

The core starts the cascade of chart component creation. It provides:

* Internal and external API
* State management
* Event messaging
* Chart Data State
  * Validation
  * Export
  * Range handling - data subset
* Configuration
* Themes

# Configuration

```javascript
const chart = Chart.create(mount, config, state )
```

@param {DOM element} mount
@param {object} config
@param {object} state

A DOM element is requried to mount the chart. Any contents of the element will be replaced by the chart

TradeXChart can be configured through three options.

1. HTML DOM element - to mount the chart on
2. config
3. state

## config

Config describes the basics of the chart, size, ect. and requires the following minimum properties to be valid:

```javascript
// minimal config
const config = {
  id: "TradeX_test",
  title: "BTC/USDT",
  width: 1000,
  height: 800,
  talib: talib,
  rangeLimit: 30,
}
```

``talib`` is a pointer to the [talib-web](https://https//anchegt.github.io/talib-web/) technical indicator library compiled as a WebAssembly module. TradeX-chart will take care of instantiating it.

``rangeLimit`` defines the initial number of candles to display

Further config options are explained in [config.md](config.md)

## State

State is a snapshot of the entirety of the chart state, including chart price data, indicators, drawing tools, datasets and theme. Where properties of Config and ``state.settings`` overlap, Config properties take priority.

Future versions of TradeX-chart will allow you to swap chart states.

The chart state can be exported to be reused later.

```javascript
JSON.stringify(chart.state)
```

Details of the state structure are found in [state.md](state.md)

# API

[API Documentation](https://tradex-app.github.io/TradeX-chart/api/https:/)
