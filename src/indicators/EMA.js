// EMA.js
/**
 * EMA
 */
import indicator from "../components/overlays/indicator"
import { EMA as talibAPI } from "./talib-api";
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
  onChart = true
  checkParamCount = false
  scaleOverlay = false
  plots = [
    { key: 'EMA_1', title: 'EMA: ', type: 'line' },
  ]

  // YAXIS_TYPES - default
  static inCnt = 0
  static scale = YAXIS_TYPES[0]
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ]


  /**
   * Creates an instance of EMA.
   * @param {object} target - canvas scene
   * @param {object} overlay - data for the overlay
   * @param {instance} xAxis - timeline axis
   * @param {instance} yAxis - scale axis
   * @param {object} config - theme / styling
   * @memberof EMA
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    
    super(target, xAxis, yAxis, config, parent, params) 

    EMA.inCnt++
    const overlay = params.overlay

    this.ID = params.overlay?.id || uid(this.shortName)
    this.defineIndicator(overlay?.settings, talibAPI)
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style}
    this.setNewValue = (value) => { this.newValue(value) }
    this.setUpdateValue = (value) => { this.UpdateValue(value) }
    this.addLegend()
  }

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

  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1
      return { key: `ema${num}`, title: `EMA${num}: `, type: 'line' }
    })
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

