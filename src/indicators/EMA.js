// EMA.js
// https://hackape.github.io/talib.js/modules/_index_.html#ema

import indicator from "../components/overlays/indicator"
import { EMA as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";
import { bRound, limit, round } from "../utils/number";
import { uid } from "../utils/utilities"

 
 export default class EMA extends indicator {

  name = 'Exponential Moving Average'
  shortName = 'EMA'
  libName = 'EMA'
  definition = {
    input: {
      inReal: [], 
      timePeriod: 20 // 30
    },
    output: {
      output: [],
    },
  }
  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1'
  }
  precision = 2
  checkParamCount = false
  scaleOverlay = false
  plots = [
    { key: 'EMA_1', title: 'EMA: ', type: 'line' },
  ]


  static inCnt = 0
  static onChart = true
  // static scale = YAXIS_TYPES[0] // defualt
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ]


  /**
   * Creates an instance of EMA.
   * @param {object} target - canvas scene
   * @param {object} xAxis - timeline axis instance
   * @param {object} yAxis - scale axis instance
   * @param {object} config - theme / styling
   * @param {object} parent - (on/off)chart pane instance that hosts the indicator
   * @param {object} params - contains minimum of overlay instance
   * @memberof EMA
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    
    super(target, xAxis, yAxis, config, parent, params) 

    EMA.inCnt++
    const overlay = params.overlay

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

  get onChart() { return EMA.onChart }

  updateLegend() {
    this.parent.legend.update()
  }
  
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
    const {c, colours} = super.legendInputs(pos)
    inputs.EMA_1 = this.Scale.nicePrice(this.overlay.data[c][1])

    return {inputs, colours}
  }

  /**
   * Draw the current indicator range on its canvas layer and render it.
   * @param {object} range 
   */
  draw(range=this.range) {
    if (this.overlay.data.length < 2 ) return false

    this.scene.clear()

    const data = this.overlay.data
    const width = this.xAxis.candleW
    const plots = []
    const offset = this.xAxis.smoothScrollOffset || 0
    const plot = {
      w: width,
    }

    // account for "missing" entries because of indicator calculation
    let o = this.Timeline.rangeScrollOffset
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

