// RSI.js
/**
 * RSI
 * RSI = SUM(MAX(CLOSE - REF(CLOSE,1),0),N) / SUM(ABS(CLOSE - REF(CLOSE,1)),N) × 100
 */
import indicator from "../components/overlays/indicator"
import {RSI as rsi } from "./talib-api";
import { YAXIS_TYPES } from "../definitions/chart";
import { limit, round } from "../utils/number";
import { isArray } from "../utils/typeChecks";
import { uid } from "../utils/utilities"


/**
 * Indicator - Relative Strength Index
 * @export
 * @class RSI
 * @extends {indicator}
 */
export default class RSI extends indicator {

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
    strokeStyle: "#C80",
    lineWidth: '1',
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStrokeStyle: "#848",
    lowStrokeStyle: "#848",
    highLowRangeStyle: "#22002220"
  }
  onChart = false
  checkParamCount = false
  plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]

  // YAXIS_TYPES - percent
  static scale = YAXIS_TYPES[1]


  /**
   * Creates an instance of RSI.
   * @param {object} target - canvas scene
   * @param {object} overlay - data for the overlay
   * @param {instance} xAxis - timeline axis
   * @param {instance} yAxis - scale axis
   * @param {object} config - theme / styling
   * @memberof RSI
   */
  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {

    super (target, xAxis, yAxis, config, parent, params)

    const overlay = params.overlay

    this.ID = params.overlay?.id || uid(this.shortName)
    this.defineInputs(overlay?.settings)
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style}
    this.setNewValue = (value) => { this.newValue(value) }
    this.setUpdateValue = (value) => { this.UpdateValue(value) }
  }

  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
    const {c, colours} = super.legendInputs(pos)
    inputs.RSI_1 = this.Scale.nicePrice(this.overlay.data[c][1])

    return {inputs, colours}
  }

  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1
      return { key: `rsi${num}`, title: `RSI${num}: `, type: 'line' }
    })
  }

  /**
   * Draw the current indicator range on its canvas layer and render it.
   * @param {object} range 
   */
  draw(range=this.range) {

    this.scene.clear()

    const data = this.overlay.data
    const width = this.xAxis.candleW
    const x2 = this.scene.width + (this.xAxis.bufferPx * 2)
    const y1 = this.yAxis.yPos(this.style.defaultHigh)
    const y2 = this.yAxis.yPos(this.style.defaultLow)

    // Fill the range between high and low
    const plots = [0, y1, this.scene.width, y2 - y1]
    let style = this.style.highLowRangeStyle
    this.plot(plots, "renderFillRect", style)

    // High RSI Range marker
    plots.length = 0
    plots[0] = {x: 0, y: y1}
    plots[1] = {x: x2, y: y1}
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.highStrokeStyle,
      dash: [5, 5]
    }
    this.plot(plots, "renderLine", style)

    // Low RSI Range marker
    plots.length = 0
    plots[0] = {x: 0, y: y2}
    plots[1] = {x: x2, y: y2}
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.lowStrokeStyle,
      dash: [5, 5]
    }
    this.plot(plots, "renderLine", style)

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

