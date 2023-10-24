/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/lines-between-class-members */
// RSI.js
// Relative Strength Index
// https://hackape.github.io/talib.js/modules/_index_.html#rsi
// https://www.investopedia.com/terms/r/rsi.asp
// @ts-nocheck
import { Indicator, Range, talibAPI, uid } from "tradex-chart";
// import { RSI as talibAPI } from "talib";

/**
 * Indicator - Relative Strength Index
 * @export
 * @class RSI
 * @extends {indicator}
 */

export default class RSI14 extends Indicator {
  name = "Relative Strength Index";
  shortName = "RSI";
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
  #defaultStyle = {
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
  checkParamCount = false;
  plots = [{ key: "RSI_1", title: " ", type: "line" }];

  static inCnt = 0;
  static primaryPane = false;
  static scale = "percent";

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

    const overlay = params.overlay;

    this.id = params.overlay?.id || uid(this.shortName);
    this.defineIndicator(overlay?.settings, talibAPI[this.libName]);
    this.style = overlay?.settings?.style
      ? { ...this.#defaultStyle, ...overlay.settings.style }
      : { ...this.#defaultStyle, ...config.style };
    // calculate back history if missing
    this.calcIndicatorHistory();
    // enable processing of price stream
    this.setNewValue = (value) => {
      this.newValue(value);
    };
    this.setUpdateValue = (value) => {
      this.updateValue(value);
    };
    this.addLegend();
  }

  get primaryPane() {
    return RSI14.primaryPane;
  }
  get defaultStyle() {
    return this.#defaultStyle;
  }

  legendInputs(pos = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false;

    const inputs = {};
    const { c, colours } = super.legendInputs(pos);
    inputs.RSI_1 = this.scale.nicePrice(this.overlay.data[c][1]);

    return { inputs, colours };
  }

  /**
   * process new candle stream value
   * @param {Array.<number>} candle - [timestamp, open, high, low, close, volume]
   * @memberof Test
   */
  updateValue(candle) {
    this.value = candle
  }

  /**
   * calculate indicator values
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

    while (start < end) {
      // fetch the data required to calculate the indicator
      input = this.indicatorInput(start, start + p)
      params = {...params, ...input}
      // let hasNull = params.inReal.find(element => element === null)
      // if (hasNull) return false

      entry = this.TALib[this.libName](params)

      v = []
      i = 0
      for (let o of this.definition.output) {
        v[i++] = entry[o.name][0]
      }
      // store entry with timestamp
      data.push([this.range.value(start + p - 1)[0], v])
      start++
    }
    return data
  }

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
    if (this.overlay.data.length < 2) return false;

    if (!super.mustUpdate()) return false;

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

    // we have data, draw something
    const data = this.overlay.data;
    const width = this.xAxis.candleW;

    // RSI plot
    plots.length = 0;
    const offset = this.Timeline.smoothScrollOffset || 0;
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

    this.plot(plots, "renderLine", this.style);

    this.target.viewport.render();

    super.updated();
  }
}
