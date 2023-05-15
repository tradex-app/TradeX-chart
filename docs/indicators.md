# Indicators

TradeX-chart provides a set of [default indicators](#default-indicators) based upon TA-Lib. The chart uses a Web Assembly version of the library, [talib-web](https://github.com/newproplus/talib-web).

TradeX-chart may or may not implement all of the indicators provided by TA-Lib. 


Indicators are grouped as:

* **On Chart** - those displayed atop the price history (candles)
* **Off Chart** - those displayed in their own pane.

Indicators can be added via the following methods:

* API - programmatically ``chart.addIndicator()``
* State - [a valid chart state](state.md)
* Utils Bar - through the chart GUI using the Indicators option in the Utils Bar

## Default Indicators

[The current list of implemented indicators.](indicators_default.md)

## Custom Indicators

Developers are not restricted to using only the [default indicators](indicators_default.md) provided by TradeX-chart. After all, everybody has their own secret methods for finding signals in the market.

Of course the [functions provided by the TA-Lib](indicators_talib.md) can still be leveraged for custom indicators via the chart API. The chart will take care of initializing the TA-Lib wasm component and return a promise.

All indicators relying upon TA-Lib functions should defer any data processing until the promise is fulfilled.

```javascript
      if (this.core.TALibReady) calc()
      else  this.core.talibAwait.push(calc.bind(this))
```

### Registering Custom Indicators

Before any custom indicator can be used, it first must be registered with the chart.

During the registration of custom indicators, there is the option to expunge all of the default indicators, thereby allowing the developer to replace them all, or select which to keep.

```javascript
// custom indicator class
import TEST from "testIndicator"

/**
 * set indicators
 * @param {object} i - indicators {id, name, event, ind}
 * @param {boolean} flush - expunge default indicators
 * @returns boolean
 */
chart.setIndicators({
  TEST: {id: "TEST", name: "Custom Indicator", event: "addIndicator", ind: TEST}, false
})
```
The list of registered indicators, both default and custom can be accessed via the chart API.

```javascript
// returns a Map() iterator of indicators
const onChartIndicators = chart.Indicators.onchart.entries()
const offChartIndicators = chart.Indicators.offchart.entries()
```

### Minimal Custom Indicator Definition

```javascript
// custom-indicator.js
// proof of concept for user defined indicators

// import { Indicator } from "tradex-chart"
import { Indicator, uid } from "./src"

export default class Test extends Indicator {

  name = "Test Custom Inicator"
  shortName = "Test"

  #defaultStyle = {}

  /**
   * Creates an instance of Test.
   * @param {object} target - canvas scene
   * @param {object} xAxis - timeline axis instance
   * @param {object} yAxis - scale axis instance
   * @param {object} config - theme / styling
   * @param {object} parent - (on/off)chart pane instance that hosts the indicator
   * @param {object} params - contains minimum of overlay instance
   * @memberof Test
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params)

    const overlay = params.overlay
    // initialize indicator values
    this.ID = params.overlay?.id || uid(this.shortName)
    // merge user defined settings (if any) with defaults
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style}
    // calculate back history if missing
    this.calcIndicatorHistory()
    // enable processing of price stream
    this.setUpdateValue = (value) => { this.updateValue(value) }
    // add the indicator legend to the chart pane
    this.addLegend()
  }

  /**
   * define where indicator should be displayed
   * valid returned values can be: true, false (boolean), both (string)
   * @readonly
   */
  get onChart() { return true }

  /**
   * return inputs required to display indicator legend on chart pane
   * @return {object} - {inputs, colours, labels}
   */
  legendInputs() {
    let labels = [false]
    let inputs = {x: 0}
    let colours = ["#ccc"]

    return {inputs, colours, labels}
  }

  /**
   * process new candle stream value
   * @param {array} candle - [timestamp, open, high, low, close, volume]
   * @memberof Test
   */
  updateValue(candle) {
    this.value = candle
  }

  calcIndicatorHistory() {

  }
  
  /**
   * draw the indicator
   * @param {object} range - current displayed range of candles
   */
  draw(range) {
    console.log("draw custom")
  }
}
```


