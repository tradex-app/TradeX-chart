---
title: Indicators
---

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
 * @param {Object} i - indicators {id, name, event, ind}
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
const primaryPaneIndicators = chart.Indicators.primary.entries()
const secondaryPaneIndicators = chart.Indicators.secondary.entries()
```

### Indicator Definitions

Indicators must provide a ``legendInputs(pos)`` method. The chart will pass the current mouse position to the indicator in an array, ``[x, y]``.

Legends can display multiple values if formatted correctly.

If the indicator provides no values for it's legend then simply return false.

```javascript
legendInputs() {
  return false;
}
```
When the indicator does provide values for it's legend, then the `legendInputs()` method must return an object with three entries.

```javascript
 return {inputs, colours, labels}
```
where the three entries are defined as the following:

```javascript
/**
  @param {Object} inputs - property names are used as labels
  @param {Array} colours - array of #rrggbb(aa) values
  @param {Array} labels - array of which input labels to dispaly [true, false, ...]
*/
```
#### inputs
is an object that provides the legend labels and values.
For example the Bollinger Band indicator has three values. It's returned ``inputs`` object would look like the following:

```javascript
{ Hi: "13016.1", Mid: "13011.2", Lo: "13006.2" }
```
The object property names are used as the labels for the indicator.
The Bollinger Band indicator legend would look like this on the chart:

```javascript
 Hi: 13016.1  Mid: 13011.2  Lo: 13006.2
```
If you wanted a label with spaces, then the object property name would have to be quoted. ``"some value": 12345``

#### colours
is an array of ``"#rrggbb(aa)"`` string values corresponding to the legend values

#### lables
is an array that specifies which of the legend labels are displayed.
In the Bollinger Band example, if you wanted to silence all labels, use an array of ``[false, false, false]``.

### Canvas Drawing Methods

The base ``Indicator`` class which all others, including custom incators are built atop, offers the ``plot()`` method for drawing to the canvas. 

The ``Indicator`` class also exposes a pointer to the canvas directly, so you could also use your own functions instead.

``plot()`` offers the following options:

* [``renderLine``](./canvas_methods.md#renderline)
* [``renderLineHorizontal``](./canvas_methods.md#renderlinehorizontal)
* [``renderLineVertical``](./canvas_methods.md#renderlinevertical)
* [``renderPathStroke``](./canvas_methods.md#renderpathstroke)
* [``renderPathClosed``](./canvas_methods.md#renderpathclosed)
* [``renderSpline``](./canvas_methods.md#renderspline)
* [``renderRect``](./canvas_methods.md#renderrect)
* [``renderPolygonRegular``](./canvas_methods.md#renderpolygonregular)
* [``renderPolygonIrregular``](./canvas_methods.md#renderpolygonirregular)
* [``renderRectRound``](./canvas_methods.md#renderrectround)
* [``renderTriangle``](./canvas_methods.md#rendertriangle)
* [``renderDiamond``](./canvas_methods.md#renderdiamond)
* [``renderCircle``](./canvas_methods.md#rendercircle)
* [``renderImage``](./canvas_methods.md#renderimage)

Refer to the [Canvas Methods](./canvas_methods.md) documentation for parameter configuration.

### Minimal Custom Indicator Definition

```javascript
// custom-indicator.js
// proof of concept for user defined indicators

// import { Indicator } from "tradex-chart"
import { Indicator, Range, uid } from "./src"

export default class Test extends Indicator {

  name = "Test Custom Inicator"
  shortName = "Test"

  timePeriod = 20

  #defaultStyle = {
    stroke: "#0088cc",
    width: "1",
    dash: undefined,
  }

  style = {}

  static inCnt = 0
  static primaryPane = true
  // static scale is required for off chart indicators
  // static scale = YAXIS_TYPES[0] // YAXIS_TYPES - default
  static colours = []


  /**
   * Creates an instance of Test.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - (on/off)chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof Test
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params)

    const overlay = params.overlay
    // initialize indicator values
    this.id = params.overlay?.id || uid(this.shortName)
    // merge user defined settings (if any) with defaults
    this.style = (overlay?.settings?.style) 
      ? { ...this.#defaultStyle, ...overlay.settings.style } 
      : { ...this.#defaultStyle, ...config.style }
    // calculate back history if missing
    this.calcIndicatorHistory()
    // enable processing of price stream
    this.setUpdateValue = (value) => { 
      this.updateValue(value) 
    }
    // add the indicator legend to the chart pane
    this.addLegend()
  }

  /**
   * define where indicator should be displayed
   * valid returned values can be: true, false (boolean), both (string)
   * @readonly
   */
  get primaryPane() { return Test.primaryPane }
  get defaultStyle() { return this.#defaultStyle }


  /**
   * return inputs required to display indicator legend on chart pane
   * legends can display multiple values
   * @param {Array} [pos=this.chart.cursorPos] - optional
   * @returns {Object} - {inputs, colours, labels}
   */
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    // determine which legend labels to display
    let labels = [false]
    // c - retrieve data index
    let {c, colours} = super.legendInputs(pos)
    // build an object of input keys (labels) and values
    let inputs = {x: this.scale.nicePrice(this.overlay.data[c][1])}

    /**
      @param {Object} inputs - property names are used as labels
      @param {Array} colours - array of #rrggbb(aa) values
      @param {Array} labels - array of which input labels to dispaly [true, false, ...]
    */
    return {inputs, colours, labels}
  }

  /**
   * process new candle stream value
   * @param {Array} candle - [timestamp, open, high, low, close, volume]
   * @memberof Test
   */
  updateValue(candle) {
    this.value = candle
  }

  calcIndicator(range=this.range) {
    let start, end;
    // number of values to use in indicator calculation
    let p = this.timePeriod

    // is it a Range instance?
    if(range instanceof Range) {
      // if not calculate entire history
      start = 0
      end = range.dataLength - p + 1
    }
    else if ( "indexStart" in range || "indexEnd" in range ||
              "tsStart" in range ||  "tsEnd" in range ) {
      start = range.indexStart || this.Timeline.t2Index(range.tsStart || 0) || 0
      end = range.indexEnd || this.Timeline.t2Index(range.tsEnd) || this.range.Length - 1
      end - p
    }
    else return false

    // if not enough data for calculation fail
    if ( end - start < p ) return false

    let data = [];
    let i, v, entry;

    while (start < end) {
      v = 0
      for (i=0; i<p; i++) {
        v += this.range.value(start)[4]
      }
      v /= p
      data.push([this.range.value(start + p - 1)[0], v])
      start++
    }
    return data
  }

  calcIndicatorHistory() {
    // if overlay history is missing, calculate it
    if (this.overlay.data.length < this.timePeriod) {
      const data = this.calcIndicator()
      if (data) this.overlay.data = data
    }
  }
  
  /**
   * draw the indicator
   * @param {Object} range - current displayed range of candles
   */
  draw(range=this.range) {
    // minimum of two candles are required for this indicator
    if (this.overlay.data.length < 2 ) return false
    // clear the indicator overlay (chart layer)
    this.scene.clear()

    // draw your indicator...

    // array to hold sequence points to draw
    const plots = []
    // indicator data
    const data = this.overlay.data
    // current candle width, chart zoom modifies this
    const width = this.xAxis.candleW
    // basic plot entry
    const plot = {
      w: width,
    }
    // first timestamp in current range
    let t = range.value(range.indexStart)[0]
    let s = this.overlay.data[0][0]
    let c = (t - s) / range.interval
    let o = this.Timeline.rangeScrollOffset;
    let i = range.Length + o + 2
    let style = {}

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.push({x: null, y: null})
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1])
        plots.push({...plot})
      }
      c++
      i--
    }
    // process the plots
    this.plot(plots, "renderLine", this.style)
    // render the indicator
    this.target.viewport.render();
  }
}
```
## Settings

Current indicator settings can be retrieved with the following call:
```javascript
chart0.getIndicator("TX_lj7216mu_vq6_0-Chart_0-EMA_1").settings()
```

Indicator settings can also modified with the same call by passing an object:
```javascript
const newSettings = {}
chart0.getIndicator("TX_lj7216mu_vq6_0-Chart_0-EMA_1").settings(newSettings)
```
### Invokeing the Settings Dialogue

The indicator Settings Dialogue can be invoked with the following:
```javascript
chart0.getIndicator("TX_lj7216mu_vq6_0-Chart_0-EMA_1").invokeSettings()
```
Invocation of the Settings Dialogue can be modified or replaced with a user defined function, either by passing an object to the method:
```javascript
const callback = {
    indicatorSettings: {fn: (c)=>{ alert(c.id) }, own: true}
  }
chart0.getIndicator("TX_lj7216mu_vq6_0-Chart_0-EMA_1").invokeSettings(callback)
```
Setting ``own: true`` will cause the default dialogue not to be invoked.

Alternatively, if in the initial chart configuration, the ``config.callbacks.indicatorSettings`` is given a callback object, this will make the change permanent.
