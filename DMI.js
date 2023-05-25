// DMI.js
// Directional Movement Index 

import { Indicator, Range, uid } from "./src"
import { YAXIS_TYPES } from "./src/definitions/chart"

export default class DMI extends Indicator {

  name = "Directional Movement Index"
  shortName = "DMI"

  definition = {
    input: {
      high: [],
      low: [], 
      close: [], 
      timePeriod: 20 // 5
    },
    output: {
      plus: [],
      minus: [],
      adx: []
    },
  }
  #defaultStyle = {
    highStrokeStyle: "#0088cc",
    highLineWidth: '1',
    highLineDash: undefined,
    lowStrokeStyle: "#0088cc",
    lowLineWidth: '1',
    lowLineDash: undefined,
    closeStrokeStyle: "#0088cc",
    closeLineWidth: '1',
    closeLineDash: undefined,
  }

  style = {}

  static inCnt = 0
  static onChart = false
  static scale = YAXIS_TYPES[0] // defualt


  /**
   * Creates an instance of DMI.
   * @param {object} target - canvas scene
   * @param {object} xAxis - timeline axis instance
   * @param {object} yAxis - scale axis instance
   * @param {object} config - theme / styling
   * @param {object} parent - (on/off)chart pane instance that hosts the indicator
   * @param {object} params - contains minimum of overlay instance
   * @memberof DMI
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
  get onChart() { return DMI.onChart }

  /**
   * return inputs required to display indicator legend on chart pane
   * legends can display multiple values
   * @param {array} [pos=this.chart.cursorPos] - optional
   * @return {object} - {inputs, colours, labels}
   */
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    let labels = [false]
    let {c, colours} = super.legendInputs(pos)
    let inputs = {x: this.Scale.nicePrice(this.overlay.data[c][1])}

    /**
      @param {object} inputs - property names are used as labels
      @param {array} colours - array of #rrggbb(aa) values
      @param {array} labels - array of which input labels to dispaly [true, false, ...]
    */
    return {inputs, colours, labels}
  }

  /**
   * process new candle stream value
   * @param {array} candle - [timestamp, open, high, low, close, volume]
   * @memberof DMI
   */
  updateValue(candle) {
    this.value = candle
  }

  calcIndicator(params={}, range=this.range) {
    if (!isObject(range) ||
        !this.core.TALibReady
        ) return false

    params.timePeriod = params.timePeriod || this.definition.input.timePeriod;
    let start, end;
    let p = this.timePeriod

    // is it a Range instance?
    if (range instanceof Range) {
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

      params.inReal = this.indicatorInput(start, start + p)

      let ADX = this.TALib.ADX(params)[output][0]
      let PLUS = this.TALib.PLUS_DI(params)[output][0]
      let MINUS = this.TALib.MINUS_DI(params)[output][0]
      v = [PLUS, MINUS, ADX]

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
   * @param {object} range - current displayed range of candles
   */
  draw(range=this.range) {
    // minimum of two candles are required for this indicator
    if (this.overlay.data.length < 2 ) return false
    // clear the indicator overlay (chart layer)
    this.scene.clear()

    // draw your indicator...

    const plots = {plus: [], minus: [], adx: []}
    const data = this.overlay.data
    const width = this.xAxis.candleW
    const plot = {
      w: width,
    }
    let t = range.value(range.indexStart)[0]
    let s = this.overlay.data[0][0]
    let c = (t - s) / range.interval
    let o = this.Timeline.rangeScrollOffset;
    let i = range.Length + o + 2
    let style = {}

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.plus.push({x: null, y: null})
        plots.minus.push({x: null, y: null})
        plots.adx.push({x: null, y: null})
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1][0])
        plots.plus.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1][1])
        plots.minus.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1][2])
        plots.adx.push({...plot})
      }
      c++
      i--
    }

    this.plot(plots, "renderLine", this.style)

    // render the 
    this.target.viewport.render();
  }
}