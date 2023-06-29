// RSI.js
// https://hackape.github.io/talib.js/modules/_index_.html#rsi
/**
 * RSI
 * RSI = SUM(MAX(CLOSE - REF(CLOSE,1),0),N) / SUM(ABS(CLOSE - REF(CLOSE,1)),N) × 100
 */
import Indicator from "../components/overlays/indicator"
import {RSI as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";
import { uid } from "../utils/utilities"


/**
 * Indicator - Relative Strength Index
 * @export
 * @class RSI
 * @extends {indicator}
 */
export default class RSI extends Indicator {

  name = 'Relative Strength Index'
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
  }
  #defaultStyle = {
    stroke: "#C80",
    width: '1',
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStrokeStyle: "#848",
    lowStrokeStyle: "#848",
    highLowRangeStyle: "#22002220"
  }
  checkParamCount = false
  plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]

  static inCnt = 0
  static onChart = false
  static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent


  /**
   * Creates an instance of RSI.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - (on/off)chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof RSI
   */
  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {

    super (target, xAxis, yAxis, config, parent, params)

    const overlay = params.overlay

    this.id = params.overlay?.id || uid(this.shortName)
    this.defineIndicator(overlay?.settings, talibAPI)
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style}
    // calculate back history if missing
    this.calcIndicatorHistory()
    // enable processing of price stream
    this.setNewValue = (value) => { this.newValue(value) }
    this.setUpdateValue = (value) => { this.updateValue(value) }
    this.addLegend()
  }

  get onChart() { return RSI.onChart }
  get defaultStyle() { return this.#defaultStyle }


  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
    const {c, colours} = super.legendInputs(pos)
    inputs.RSI_1 = this.scale.nicePrice(this.overlay.data[c][1])

    return {inputs, colours}
  }

  /**
   * Draw the current indicator range on its canvas layer and render it.
   * @param {Object} range 
   */
  draw(range=this.range) {
    this.scene.clear()

    const x2 = this.scene.width + (this.xAxis.bufferPx * 2)
    const y1 = this.yAxis.yPos(this.style.defaultHigh)
    const y2 = this.yAxis.yPos(this.style.defaultLow)

    // Fill the range between high and low
    const plots = [0, y1, this.scene.width, y2 - y1]
    let style = {fill: this.style.highLowRangeStyle}
    this.plot(plots, "renderRect", style)

    // High RSI Range marker
    plots.length = 0
    plots[0] = {x: 0, y: y1}
    plots[1] = {x: x2, y: y1}
    style = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStrokeStyle,
      dash: [1, 1]
    }
    this.plot(plots, "renderLine", style)

    // Low RSI Range marker
    plots.length = 0
    plots[0] = {x: 0, y: y2}
    plots[1] = {x: x2, y: y2}
    style = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStrokeStyle,
      dash: [1, 1]
    }
    this.plot(plots, "renderLine", style)

    // exit if no data to render
    if (this.overlay.data.length < 2 ) {
      this.target.viewport.render();
      return false
    }

    // we have data, draw something
    const data = this.overlay.data
    const width = this.xAxis.candleW

    // RSI plot
    plots.length = 0
    const offset = this.Timeline.smoothScrollOffset || 0
    const plot = {
      w: width,
    }

    // account for "missing" entries because of indicator calculation
    let o = this.Timeline.rangeScrollOffset;
    let d = range.data.length - this.overlay.data.length
    let c = range.indexStart - d - 2
    let i = range.Length + (o * 2) + 2

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

    this.plot(plots, "renderLine", this.style)

    this.target.viewport.render();
  }
}

