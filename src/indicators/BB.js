// BB.js
// Bollinger Bands
// https://hackape.github.io/talib.js/modules/_index_.html#bbands
// https://www.investopedia.com/terms/b/bollingerbands.asp

import Indicator from "../components/overlays/indicator"
import { BBANDS as talibAPI } from "../definitions/talib-api";


export default class BB extends Indicator {

  name = 'Bollinger Bands'
  shortName = 'BB'
  libName = 'BBANDS'
  definition = {
    input: {
      inReal: [], 
      nbDevDn: 2, // 2
      nbDevUp: 2, // 2
      timePeriod: 20 // 5
    },
    output: {
      lowerBand: [],
      middleBand: [],
      upperBand: []
    },
    meta: {
      nbDevDn: 2,
      nbDevUp: 2,
      timePeriod: 5,
    }
  }

  precision = 2
  scaleOverlay = false
  plots = [
    { key: 'BB_1', title: ' ', type: 'line' },
  ]

  static inCnt = 0
  static primaryPane = true
  static defaultStyle = {
    lowerStroke: "#08c",
    lowerLineWidth: '1',
    lowerLineDash: undefined,
    middleStroke: "#0080c088",
    middleLineWidth: '1',
    middleLineDash: undefined,
    upperStroke: "#08c",
    upperLineWidth: '1',
    upperLineDash: undefined,
    fillStyle: "#0080c044"
  }

  /**
 * Creates an instance of BB.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
 * @memberof BB
 */
  constructor(target, xAxis=false, yAxis=false, config, parent, params)  {
    super(target, xAxis, yAxis, config, parent, params)

    this.init(talibAPI)
  }

  /**
   * return inputs required to display indicator legend on chart pane
   * @param {Array} [pos=this.chart.cursorPos] - optional
   * @returns {Object} - {inputs, colours, labels}
   * @memberof BB
   */
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
      let labels = [false, false, false]
      let {c, colours} = super.legendInputs(pos)
    inputs.Hi = this.scale.nicePrice(this.overlay.data[c][1])
    inputs.Mid = this.scale.nicePrice(this.overlay.data[c][2])
    inputs.Lo = this.scale.nicePrice(this.overlay.data[c][3])
    colours = [
      this.style.upperStroke,
      this.style.middleStroke,
      this.style.lowerStroke
    ]
    return {inputs, colours, labels}
  }

  draw(range=this.range) {
    // no update required
    if (this.overlay.data.length < 2) return

    if (!super.mustUpdate()) return false

    this.scene.clear()

    const plots = {lower: [], middle: [], upper: []}
    const data = this.overlay.data
    const width = this.xAxis.candleW
    const plot = {
      w: width,
    }

    let t = range.value(range.indexStart)[0]
    let s = this.overlay.data[0][0]
    let c = (t - s) / range.interval
    let o = this.Timeline.rangeScrollOffset;
    let i = range.Length + (o * 2) + 2
    let style = {}

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.lower.push({x: null, y: null})
        plots.middle.push({x: null, y: null})
        plots.upper.push({x: null, y: null})
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1])
        plots.lower.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][2])
        plots.middle.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][3])
        plots.upper.push({...plot})
      }
      c++
      i--
    }

    style = {
      width: this.style.lowerLineWidth, 
      stroke: this.style.lowerStroke, 
      dash: this.style.lowerLineDash
    }
    this.plot(plots.lower, "renderLine", style)
    style = {
      width: this.style.middleLineWidth, 
      stroke: this.style.middleStroke, 
      dash: this.style.middleLineDash
    }
    this.plot(plots.middle, "renderLine", style)
    style = {
      width: this.style.upperLineWidth, 
      stroke: this.style.upperStroke, 
      dash: this.style.upperLineDash
    }
    this.plot(plots.upper, "renderLine", style)

    this.target.viewport.render();

    super.updated()
  }
}