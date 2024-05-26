// STOCHRSI.js
// Stochastic RSI
// https://hackape.github.io/talib.js/modules/_index_.html#stochrsi
// https://www.investopedia.com/terms/s/stochrsi.asp

import Indicator from "../components/overlays/indicator"
import {STOCHRSI as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";


/**
 * Indicator - Stochastic RSI
 * @export
 * @class STOCHRSI
 * @extends {indicator}
 */
export default class STOCHRSI extends Indicator {

  get name() { return 'Stochastic RSI' }
  shortName = 'STOCHRSI'
  libName = 'STOCHRSI'
  definition = {
    input: {
      inReal: [],
      timePeriod: 14,
      fastK_Period: 3,
      fastD_Period: 3
    },
    output: {
      fastK: [],
      fastD: []
    },
  }
  checkParamCount = false
  plots = [
    { key: 'STOCHRSI_1', title: ' ', type: 'line' },
  ]

  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent
  static defaultStyle = {
    fastKStroke: "#8C0",
    fastKLineWidth: '1',
    fastKLineDash: undefined,
    fastDStroke: "#00C",
    fastDLineWidth: '1',
    fastDLineDash: undefined,
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStroke: "#848",
    lowStroke: "#848",
    highLowRangeStyle: "#22002220"
  }


  /**
   * Creates an instance of STOCHRSI.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof STOCHRSI
   */
  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {


    super (target, xAxis, yAxis, config, parent, params)

    this.init(talibAPI)
  }

  calcIndicator (indicator, params={}, range=this.range) {
    params.padding = params.fastK_Period + params.fastD_Period
    return super.calcIndicator(indicator, params, range)

//     const outOrig = {...this.definition.output}
//     this.definition.output = { output: [] }
//     const RSI = super.calcIndicator("RSI", params, range)
//     this.definition.output = outOrig
// console.log(RSI)
  }

  calcIndicatorHistory() {
    super.calcIndicatorHistory()
  }

  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
    let labels = [false, false, false]
    let {c, colours} = super.legendInputs(pos)
    inputs.fastK = this.scale.nicePrice(this.overlay.data[c][1])
    inputs.fastD = this.scale.nicePrice(this.overlay.data[c][1])
    colours = [
      this.style.fastD,
      this.style.fastK
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

    // High STOCHRSI Range marker
    plots.length = 0
    plots[0] = {x: 0, y: y1}
    plots[1] = {x: x2, y: y1}
    style = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }
    this.plot(plots, "renderLine", style)

    // Low STOCHRSI Range marker
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
    // STOCHRSI plot
    plots = { fastD: [], fastK: [] }
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
        plots.fastD.push({x: null, y: null})
        plots.fastK.push({x: null, y: null})
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1])
        plots.fastK.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][2])
        plots.fastD.push({...plot})
      }
      c++
      i--
    }

    style = {
      width: this.style.fastKLineWidth, 
      stroke: this.style.fastKStroke, 
      dash: this.style.fastKLineDash
    }
    this.plot(plots.fastK, "renderLine", style)
    style = {
      width: this.style.fastDLineWidth, 
      stroke: this.style.fastDStroke, 
      dash: this.style.fastDLineDash
    }
    this.plot(plots.fastD, "renderLine", style)

    this.target.viewport.render();

    super.updated()
  }
}

