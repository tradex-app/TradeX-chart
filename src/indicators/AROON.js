// AROON.js
// Aroon
// https://hackape.github.io/talib.js/modules/_index_.html#aroon
// https://www.investopedia.com/terms/a/aroon.asp

import Indicator from "../components/overlays/indicator"
import { AROON as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";
import { uid } from "../utils/utilities"


export default class AROON extends Indicator {

  name = 'Aroon'
  shortName = 'AROON'
  libName = 'AROON'
  definition = {
    input: {
      high: [],
      low: [],
      timePeriod: 14
    },
    output: {
      aroonDown: [],
      aroonUp: []
    }
  }
  #defaultStyle = {
    downStroke: "#c80",
    downLineWidth: '1',
    downLineDash: undefined,
    upStroke: "#08c",
    upLineWidth: '1',
    upLineDash: undefined,
    fillStyle: "#0080c044"
  }
  precision = 2
  scaleOverlay = true
  plots = [
    { key: 'AROON_1', title: 'AROON', type: 'line' },
  ]

  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent

  /**
    * Creates an instance of AROON.
    * @param {Object} target - canvas scene
    * @param {Object} xAxis - timeline axis instance
    * @param {Object} yAxis - scale axis instance
    * @param {Object} config - theme / styling
    * @param {Object} parent - (on/off)chart pane instance that hosts the indicator
    * @param {Object} params - contains minimum of overlay instance
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params)  {
    super(target, xAxis, yAxis, config, parent, params)

    const overlay = params.overlay
    
    // initialize indicator values
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

  /**
   * define where indicator should be displayed
   * valid returned values can be: true, false (boolean), both (string)
   * @readonly
   */
  get primaryPane() { return AROON.primaryPane }
  get defaultStyle() { return this.#defaultStyle }

  /**
   * return inputs required to display indicator legend on chart pane
   * @param {Array} [pos=this.chart.cursorPos] - optional
   * @returns {Object} - {inputs, colours, labels}
   */
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
      let labels = [false, false]
      let {c, colours} = super.legendInputs(pos)
    inputs.Dn = this.overlay.data[c][1][0]
    inputs.Up = this.overlay.data[c][1][1]
    colours = [
      this.style.downStroke,
      this.style.upStroke
    ]
    return {inputs, colours, labels}
  }

  draw(range=this.range) {
    if (this.overlay.data.length < 2 ) return false

    this.scene.clear()

    const plots = {down: [], up: []}
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
        plots.down.push({x: null, y: null})
        plots.up.push({x: null, y: null})
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1][0])
        plots.down.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0])
        plot.y = this.yAxis.yPos(data[c][1][1])
        plots.up.push({...plot})
      }
      c++
      i--
    }

    style = {
      width: this.style.LineWidth, 
      stroke: this.style.downStroke, 
      dash: this.style.downLineDash
    }
    this.plot(plots.down, "renderLine", style)
    style = {
      width: this.style.upLineWidth, 
      stroke: this.style.upStroke, 
      dash: this.style.upLineDash
    }
    this.plot(plots.up, "renderLine", style)

    this.target.viewport.render();
  }
}