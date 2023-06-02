// BB.js
// Bollinger Bands
// https://hackape.github.io/talib.js/modules/_index_.html#bbands

import indicator from "../components/overlays/indicator"
import { BBANDS as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";
import { uid } from "../utils/utilities"


export default class BB extends indicator {

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
  }
  #defaultStyle = {
    lowerStrokeStyle: "#08c",
    lowerLineWidth: '1',
    lowerLineDash: undefined,
    middleStrokeStyle: "#0080c088",
    middleLineWidth: '1',
    middleLineDash: undefined,
    upperStrokeStyle: "#08c",
    upperLineWidth: '1',
    upperLineDash: undefined,
    fillStyle: "#0080c044"
  }
  precision = 2
  scaleOverlay = false
  plots = [
    { key: 'BB_1', title: ' ', type: 'line' },
  ]

  static inCnt = 0
  static onChart = true
  // static scale = YAXIS_TYPES[0] // YAXIS_TYPES - default

  /**
 * Creates an instance of BB.
   * @param {object} target - canvas scene
   * @param {object} xAxis - timeline axis instance
   * @param {object} yAxis - scale axis instance
   * @param {object} config - theme / styling
   * @param {object} parent - (on/off)chart pane instance that hosts the indicator
   * @param {object} params - contains minimum of overlay instance
 * @memberof BB
 */
  constructor(target, xAxis=false, yAxis=false, config, parent, params)  {
    super(target, xAxis, yAxis, config, parent, params)

    const overlay = params.overlay
    
    // initialize indicator values
    this.ID = params.overlay?.id || uid(this.shortName)
    this.defineIndicator(overlay?.settings, talibAPI)
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style}
    // calculate back history if missing
    this.calcIndicatorHistory()
    // enable processing of price stream
    this.setNewValue = (value) => { this.newValue(value) }
    this.setUpdateValue = (value) => { this.updateValue(value) }
    this.addLegend()
  }

  /**
   * define where indicator should be displayed
   * valid returned values can be: true, false (boolean), both (string)
   * @readonly
   */
  get onChart() { return BB.onChart }

  /**
   * return inputs required to display indicator legend on chart pane
   * @param {array} [pos=this.chart.cursorPos] - optional
   * @return {object} - {inputs, colours, labels}
   * @memberof BB
   */
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
      let labels = [false, false, false]
      let {c, colours} = super.legendInputs(pos)
    inputs.Hi = this.Scale.nicePrice(this.overlay.data[c][1][0])
    inputs.Mid = this.Scale.nicePrice(this.overlay.data[c][1][1])
    inputs.Lo = this.Scale.nicePrice(this.overlay.data[c][1][2])
    colours = [
      this.style.upperStrokeStyle,
      this.style.middleStrokeStyle,
      this.style.lowerStrokeStyle
    ]
    return {inputs, colours, labels}
  }

  draw(range=this.range) {
    if (this.overlay.data.length < 2 ) return false

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
    let i = range.Length + o + 2
    let style = {}

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.lower.push({x: null, y: null})
        plots.middle.push({x: null, y: null})
        plots.upper.push({x: null, y: null})
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1][0])
        plots.lower.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1][1])
        plots.middle.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1][2])
        plots.upper.push({...plot})
      }
      c++
      i--
    }

    style = {
      width: this.style.lowerLineWidth, 
      stroke: this.style.lowerStrokeStyle, 
      dash: this.style.lowerLineDash
    }
    this.plot(plots.lower, "renderLine", style)
    style = {
      width: this.style.middleLineWidth, 
      stroke: this.style.middleStrokeStyle, 
      dash: this.style.middleLineDash
    }
    this.plot(plots.middle, "renderLine", style)
    style = {
      width: this.style.upperLineWidth, 
      stroke: this.style.upperStrokeStyle, 
      dash: this.style.upperLineDash
    }
    this.plot(plots.upper, "renderLine", style)

    this.target.viewport.render();
  }
}