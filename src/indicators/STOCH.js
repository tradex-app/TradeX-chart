// STOCH.js
// Stochastic Oscillator
// https://hackape.github.io/talib.js/modules/_index_.html#rsi
// https://www.investopedia.com/terms/r/rsi.asp

import Indicator from "../components/overlays/indicator"
import {STOCH as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";


/**
 * Indicator - Stochastic Oscillator
 * @export
 * @class STOCH
 * @extends {indicator}
 */
export default class STOCH extends Indicator {

  name = 'Stochastic Oscillator'
  shortName = 'STOCH'
  libName = 'STOCH'
  definition = {
    input: {
      high: [],
      low: [],
      close: [],
      fastK_Period: 5,
      slowK_Period: 3,
      slowD_Period: 3
    },
    output: {
      slowK: [],
      slowD: []
    },
  }
  checkParamCount = false
  plots = [
    { key: 'STOCH_1', title: ' ', type: 'line' },
  ]

  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent
  static defaultStyle = {
    slowKStroke: "#8C0",
    slowKLineWidth: '1',
    slowKLineDash: undefined,
    slowDStroke: "#00C",
    slowDLineWidth: '1',
    slowDLineDash: undefined,
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStroke: "#848",
    lowStroke: "#848",
    highLowRangeStyle: "#22002220"
  }


  /**
   * Creates an instance of STOCH.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof STOCH
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
    let labels = [false, false, false]
    let {c, colours} = super.legendInputs(pos)
    inputs.SlowK = this.scale.nicePrice(this.overlay.data[c][1])
    inputs.SlowD = this.scale.nicePrice(this.overlay.data[c][1])
    colours = [
      this.style.slowD,
      this.style.slowK
    ]

    return {inputs, colours, labels}
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
    const y1 = this.yAxis.yPos(this.style.defaultHigh)
    const y2 = this.yAxis.yPos(this.style.defaultLow)

    // Fill the range between high and low
    let plots = [0, y1, this.scene.width, y2 - y1]
    let style = {fill: this.style.highLowRangeStyle}
    this.plot(plots, "renderRect", style)

    // High STOCH Range marker
    plots.length = 0
    plots[0] = {x: 0, y: y1}
    plots[1] = {x: x2, y: y1}
    style = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }
    this.plot(plots, "renderLine", style)

    // Low STOCH Range marker
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
    // STOCH plot
    plots = { slowD: [], slowK: [] }
    const data = this.overlay.data
    const width = this.xAxis.candleW
    const plot = {
      w: width,
    }

    // account for "missing" entries because of indicator calculation
    let t = range.value(range.indexStart)[0]
    let s = this.overlay.data[0][0]
    let c = (t - s) / range.interval
    let o = this.Timeline.rangeScrollOffset;
    let i = range.Length + (o * 2) + 2

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.slowD.push({x: null, y: null})
        plots.slowK.push({x: null, y: null})
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1])
        plots.slowK.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][2])
        plots.slowD.push({...plot})
      }
      c++
      i--
    }

    style = {
      width: this.style.slowKLineWidth, 
      stroke: this.style.slowKStroke, 
      dash: this.style.slowKLineDash
    }
    this.plot(plots.slowK, "renderLine", style)
    style = {
      width: this.style.slowDLineWidth, 
      stroke: this.style.slowDStroke, 
      dash: this.style.slowDLineDash
    }
    this.plot(plots.slowD, "renderLine", style)

    this.target.viewport.render();

    super.updated()
  }
}

