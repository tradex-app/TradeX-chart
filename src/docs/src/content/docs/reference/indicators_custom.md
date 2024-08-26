---
title: Custom Indicators
description: Defining, registering and working with custom indicators
---

Developers are not restricted to using only the [default indicators](../indicators_default) provided by TradeX-chart. After all, everybody has their own secret methods for finding signals in the market.

:::note
Please first read the [Indicators](../indicators) documentation before proceeding with custom indicators, as the later extends the former and inherits the bulk of it's properties, methods and functionality from it.
:::

If you examine the repo for the ``Indicator`` class ``./src/components/overlays/indicator.js`` you will note that the Indicator class itself **extends** the ``Overlay`` class ``./src/components/overlays/overlay.js`` which provides all of the methods for it to be rendered to the chart pane in the render loop. It also provides the canvas for your indicator to draw on.

:::note
Please refer to the [Overlays](../overlays) documentation to learn what methods and properties that each indicator inherits.
:::

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
  TEST: {id: "TEST", name: "Custom Indicator", event: "addIndicator", ind: TEST, public: true}, false
})

// The "public" property in the indicator object, determines if the indicator is available to the end user in the Utils / Indicator drop down menu.
```

The list of registered indicators, both default and custom can be accessed via the chart API.

```javascript
// returns a Map() iterator of indicators
const primaryPaneIndicators = chart.Indicators.primary.entries()
const secondaryPaneIndicators = chart.Indicators.secondary.entries()
```

### Indicator Definitions

#### Local Y-Axis Range

If the indicator is not overlaid on the Primary Chart Pane, and instead on a Secondary Chart Pane, there is the option to set the local Y-Axis range, min and max values which will be used for the scale and plotting the indicator.

```javascript
this.chart.setLocalRange(0, 150)
```

#### Legend

Each [indicator](../legends) has a legend to display it's information. The legend also provides a simple GUI of icons to modify the indicator.

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

##### inputs

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

##### colours

is an array of ``"#rrggbb(aa)"`` string values corresponding to the legend values

##### lables

is an array that specifies which of the legend labels are displayed.
In the Bollinger Band example, if you wanted to silence all labels, use an array of ``[false, false, false]``.

#### Canvas Drawing Methods

The base ``Indicator`` class which all others, including custom indicators are built atop, offers the ``plot()`` method for drawing to the canvas.

The ``Indicator`` class also exposes a pointer to the canvas directly, so you could also use your own functions instead.

Refer to the [Canvas Methods documentation](../canvas_mehtods) for the available functions.

```javascript
this.plot (plots, type, opts )
```


| Parameters | Type   | Description                                       |
| ------------ | -------- | --------------------------------------------------- |
| plots      | Array  | array of x y coords [ { x, y }, ...]             |
| type       | string | [Canvas Methods documentation](../canvas_mehtods) |
| opts       | object | [Canvas Methods documentation](../canvas_mehtods) |

#### Simple Indicator Example

The following is the bare minimum required to build an indicator. If you examine the default indicators in the [repository](https://github.com/tradex-app/TradeX-chart/tree/master/src/indicators), you will find other variations on this pattern.

```javascript
// RSI.js
// Relative Strength Index
// https://hackape.github.io/talib.js/modules/_index_.html#rsi
// https://www.investopedia.com/terms/r/rsi.asp

import { Indicator } from 'tradex-chart';
import { talibAPI } from 'tradex-chart';
import { YAXIS_TYPES } from 'tradex-chart';
/**
 * Indicator - Relative Strength Index
 * @export
 * @class RSI
 * @extends {Indicator}
 */
export default class RSI extends Indicator {

  get name() { return 'Relative Strength Index' }
  shortName = 'RSI'
  libName = 'RSI'
  definition = {
    input: {
      inReal: [], 
      timePeriod: 20 // 5
    },
    output: {
      output: [],
    },
    meta: {
      outputOrder: [
        "output",
        "highLowRange"
      ],
      output: [
        {name: "highLowRange", type: "overlay", plot: "highLowRange", style: RSI.defaultStyle.highLow}
      ],
      style: RSI.defaultStyle
    }
  }

  checkParamCount = false

  static version = "1.0"
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent
  static defaultStyle = {
    output: {
      colour: {value: "#E91E63"},
      width: {value: 1},
      dash: {value: []},
    },
    highLowRange: {
      colour: {value: "#880E4F"},
      width: {value: 1},
      dash: {value: [2,2]},
      fill: {value: "#880E4F08"},
      high: {value: 75},
      low: {value: 25}
    }
  }


  /**
   * Creates an instance of RSI.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof RSI
   */
  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {

    super (target, xAxis, yAxis, config, parent, params)

    this.init(talibAPI.RSI)
  }

}


```

#### Verbose Custom Indicator Example

By extending the base `Indicator` class, it's methods can be selectively overwritten, allowing for as much customization of behavior as possible. However, this means that your custom indicator must handle more of the work. Compare it to the previous example.

The following is an example of a functioning custom `RSI` indicator using the TALib functions. It demonstrates how to import [TALib](../indicators_talib) into your indicator and call it's functions and then draw the results.

```javascript
// custom-indicator.js
// proof of concept for user defined indicators

// importing talibAPI is only required if you intend to use the talib functions provided by the chart to calculate your indicator
import { Indicator, Range, talibAPI } from "tradex-chart";

/**
 * Indicator - Relative Strength Index
 * @export
 * @class CustomRSI
 * @extends {indicator}
 */

export default class CustomRSI extends Indicator {
  name = "Relative Strength Index";
  shortName = "RSI";


/* these properties are only required if using TALib */
  libName = "RSI";
  definition = {
    input: {
      inReal: [],
      timePeriod: 14, // 5
    },
    output: {
      output: [],
    },
  };
/* end of TALib properties */


  checkParamCount = false;
  plots = [{ key: "RSI_1", title: " ", type: "line" }];

  static inCnt = 0;
  // is the indicator displayed on the primary pane with the price history (candles)?
  static primaryPane = false;
  // ["default", "percent", "log"]
  static scale = "percent";
// default canvas drawing styles
// these can and will be overwritten by any 
// matching values passed into constructor via 
// params.overlay.settings.style
  static defaultStyle = {
    stroke: "#C80",
    width: "1",
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStroke: "#848",
    lowStroke: "#848",
    highLowRangeStyle: "#22002220",
  };
  /**
   * Creates an instance of RSI.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof RSI
   */
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);

    this.defineIndicator(params.overlay?.settings, talibAPI[this.libName]);
    // calculate back history if missing
    this.calcIndicatorHistory();
    // enable processing of price stream
    this.setNewValue = (value) => {
      this.newValue(value);
    };
    // handles updates to the current streaming candle that has not yet closed
    this.setUpdateValue = (value) => {
      this.updateValue(value);
    };
    // add the indicator legend to the chart pane
    // this includes the indicator control icons
    this.addLegend();
    // set the max min Y-Axis values if required
    // this.chart.setLocalRange(0, 150)
  }

  /**
   * return inputs required to display indicator legend on chart pane
   * legends can display multiple values
   * https://tradex-app.github.io/TradeX-chart/reference/legends/
   * @param {Array} [pos=this.chart.cursorPos] - optional
   * @returns {Object} - {inputs, colours, labels}
   */
  legendInputs(pos = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false;

    // determine which legend labels to display
    // let labels = [false]
    // c = data index
    // colours = array of colours ["#f00"]
    const { c, colours } = super.legendInputs(pos);
    // value/s to display
    // build an object of input keys (labels) and values
    const inputs = {
      "RSI 1": this.scale.nicePrice(this.overlay.data[c][1])
    }

    return {inputs, colours, labels}
  }

  /**
   * process new candle stream value
   * @param {Array.<number>} candle - [timestamp, open, high, low, close, volume]
   */
  updateValue(candle) {
    this.value = candle
  }

  /**
   * calculate indicator values
   * these will be passed to the draw() method
   * @param {string} - ignored for custom indicators
   * @param {params} - indicator parameters - this.definition.input
   * @param {Object} range - instance of Range
   * @returns {boolean|array}
   */
  calcIndicator (indicator, params={}, range=this.range) {
    let start, end;
    // number of values to use in indicator calculation
    let p = this.definition.input.timePeriod

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
    let i, v, entry, input;

    // loop over range data and calculate the indicator data
    while (start < end) {
      // fetch the data required to calculate the indicator
      input = this.indicatorInput(start, start + p)
      params = {...params, ...input}

/* replace this with your own indicator calculation */
      // calculate the indicator data
      entry = this.TALib[this.libName](params)

      v = []
      i = 0
      // store the return value/s in array
      for (let o of this.definition.output) {
        v[i++] = entry[o.name][0]
      }
/* value has been calculated */

      // store entry with timestamp
      data.push([this.range.value(start + p - 1)[0], v])
      start++
    }
    return data
  }

  /**
   * calculate entire indicator history
   */
  calcIndicatorHistory() {
    // if overlay history is missing, calculate it
    if (this.overlay.data.length < this.definition.input.timePeriod) {
      const data = this.calcIndicator()
      if (data) this.overlay.data = data
    }
  }


  /**
   * Draw the current indicator range on its canvas layer and render it.
   * @param {Object} range
   */
  draw(range = this.range) {
    // minimum of two candles are required for this indicator
    if (this.overlay.data.length < 2) return false;
    // skip drawing if no visual update is required
    if (!super.mustUpdate()) return false;
    // clear the indicator overlay (chart layer)
    this.scene.clear();

    const x2 = this.scene.width + this.xAxis.bufferPx * 2;
    const y1 = this.yAxis.yPos(this.style.defaultHigh);
    const y2 = this.yAxis.yPos(this.style.defaultLow);

    // Fill the range between high and low
    const plots = [0, y1, this.scene.width, y2 - y1];
    let style = { fill: this.style.highLowRangeStyle };
    this.plot(plots, "renderRect", style);

    // High RSI Range marker
    plots.length = 0;
    plots[0] = { x: 0, y: y1 };
    plots[1] = { x: x2, y: y1 };
    style = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1],
    };
    this.plot(plots, "renderLine", style);

    // Low RSI Range marker
    plots.length = 0;
    plots[0] = { x: 0, y: y2 };
    plots[1] = { x: x2, y: y2 };
    style = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
      dash: [1, 1],
    };
    this.plot(plots, "renderLine", style);

    // exit if no data to render
    if (this.overlay.data.length < 2) {
      this.target.viewport.render();
      return false;
    }

    // we have indicator data, draw something
    const data = this.overlay.data;
    // current candle width, chart zoom modifies this
    const width = this.xAxis.candleW;

    // RSI plot
    plots.length = 0;
    const offset = this.Timeline.smoothScrollOffset || 0;
    // basic plot entry
    const plot = {
      w: width,
    };

    // account for "missing" entries because of indicator calculation
    const o = this.Timeline.rangeScrollOffset;
    const d = range.data.length - this.overlay.data.length;
    let c = range.indexStart - d - 2;
    let i = range.Length + o * 2 + 2;

    while (i) {
      if (c < 0 || c >= this.overlay.data.length) {
        // plots.push({x: null, y: null})
      } else {
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(data[c][1]);
        plots.push({ ...plot });
      }
      c++;
      i--;
    }
    // process the plots
    this.plot(plots, "renderLine", this.style);
    // render the indicator
    this.target.viewport.render();
    // mark the indicator drawing as complete and ready to render
    super.updated();
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

## How the Indicator Updates

Initial data is passed to the indicator via the [Chart State](../state). It can also be [added later (updated)](../state#merging-data-into-the-state) via the API which handles the Chart State.
[Streaming data (OHLCV)](../streaming_price_data) can also be fed to the custom indicator.
If you take a look at the example in the repo ``./custom-indicator.js``  you will see the following methods:

* ``updateValue()`` - accepts the streaming data ``{Array.<number>} candle - [timestamp, open, high, low, close, volume]``
* ``calcIndicator()`` - accepts the Range ``range=this.range``
* ``legendInputs()`` - accepts cursor pos on chart which is automatically passed to it by the chart
* ``draw()`` - accepts the Range ``range=this.range``

These are the four main methods of your custom indicator, which extends the default indicator class.

If you examine the demo test page ./index.js and examine the function ``kline_Binance()`` you will see that the data stream is passed to the chart via ``mergeData()``. The chart distributes this value to all indicators active on the chart via their ``updateValue()`` method, which is why this method is required for your own custom indicator.

Any`` mergeData()`` call, whether for a block of back history or a single streaming candle, will automatically invoke each indicator's ``calcIndicator()``, which is why it is also a requirement for your own custom indicators.

``draw()`` is also automatically invoked on all indicators, including custom indicators if there is any chart event that triggers the chart to update and redraw. This too must be provided by your custom indicator. 

## Indicator Calculation

Of course the [functions provided by the TA-Lib](indicators_talib) can be leveraged for custom indicators via the chart API. The chart will take care of initializing the TA-Lib wasm component and return a promise.

Firstly your indicator needs to import the ``talibAPI`` that the chart exports. Doing so provides you with all of the talib function definitions which tell you what inputs the function requires and what output it will return.

```javascript
import { talibAPI } from "../definitions/talib-api";
```
You can also import only the required definitions for the functions you want to work with.

```javascript
import { AROON } from "../definitions/talib-api";
```

All indicators relying upon TA-Lib functions should defer any data processing until the promise is fulfilled.

```javascript
      if (this.core.TALibReady) calc()
      else  this.core.talibAwait.push(calc.bind(this))
```
