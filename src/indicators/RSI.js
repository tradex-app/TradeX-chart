// RSI.js
// Relative Strength Index
// https://hackape.github.io/talib.js/modules/_index_.html#rsi
// https://www.investopedia.com/terms/r/rsi.asp

import Indicator from "../components/overlays/indicator"
import {RSI as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";
import Colour from "../utils/colour"


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
    meta: {
      input : {
        timePeriod: {
          label: `Period`,
          type: 'number',
          value: 5,
          // "data-oldval": 5,
          // default: 5,
          min: '3',
          title: `Number of time units to use in calculation`,
          $function: (e)=>{
            console.log(`#Period = ${e.target.value}`)
          }
        }
      }
    }
  }

  checkParamCount = false
  plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]

  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent
  static defaultStyle = {
    stroke: "#C80",
    width: 1,
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStroke: "#848",
    lowStroke: "#848",
    highLowRangeStyle: "#22002220"
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

    this.defineIndicator(params.overlay?.settings, talibAPI)
    // calculate back history if missing
    this.calcIndicatorHistory()
    // enable processing of price stream
    this.setNewValue = (value) => { this.newValue(value) }
    this.setUpdateValue = (value) => { this.updateValue(value) }
    this.addLegend()
  }

  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
    const {c, colours} = super.legendInputs(pos)
    inputs.RSI_1 = this.scale.nicePrice(this.overlay.data[c][1])

    return {inputs, colours}
  }

  
  configInputs() {
    // id, label, type, value, default, placeholder, class, max, min, step, onchange, disabled, visible, description
    const inputs = {
      period: {
        label: `Period`,
        type: 'number',
        value: this.definition.input.timePeriod,
        "data-oldval": this.definition.input.timePeriod,
        "data-default": this.definition.input.timePeriod,
        default: 5,
        min: '3',
        class: ``,
        title: `Number of time units to use in calculation`,
        $function: 
          this.configDialogue.provideEventListener("#Period", "change", 
          (e)=>{
            console.log(`#Period = ${e.target.value}`)
          })
      }
    }

    const style = this.buildConfigStyleTab()

    return {inputs, style}
  }

  /**
   * Draw the current indicator range on its canvas layer and render it.
   * @param {Object} range 
   */
  draw(range=this.range) {

    if (this.overlay.data.length < 2 ) return false

    if (!super.mustUpdate()) return false

    this.scene.clear()

    const x2 = this.scene.width + (this.xAxis.bufferPx * 2)
    const y1 = this.yAxis.yPos(this.style?.high || this.style.defaultHigh)
    const y2 = this.yAxis.yPos(this.style?.low || this.style.defaultLow)

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
      stroke: this.style.highStroke,
      dash: [1, 1]
    }
    this.plot(plots, "renderLine", style)

    // Low RSI Range marker
    plots.length = 0
    plots[0] = {x: 0, y: y2}
    plots[1] = {x: x2, y: y2}
    style = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
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

    let t = 0

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        // plots.push({x: null, y: null})
      }
      else {
        if (t > data[c][0]) console.log(c, t, data[c][0])
        t = data[c][0]

        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1])
        plots.push({...plot})
      }
      c++
      i--
    }

    this.plot(plots, "renderLine", this.style)

    this.target.viewport.render();

    super.updated()
  }
}

