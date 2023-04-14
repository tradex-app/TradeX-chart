/**
 * SMA
 * Simple Moving Average
 */
 import indicator from "../components/overlays/indicator"
 import { 
   YAXIS_TYPES
 } from "../definitions/chart";
import { bRound, limit, round } from "../utils/number";
import { uid } from "../utils/utilities"

const calcParams = [20]
 
 export default class SMA extends indicator {

  #series = 'price'
  #precision = 2
  #calcParams = [6, 12, 20]

  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1'
  }
  #style = {}

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
   * Creates an instance of SMA.
   * @param {object} target - canvas scene
   * @param {object} overlay - data for the overlay
   * @param {instance} xAxis - timeline axis
   * @param {instance} yAxis - scale axis
   * @param {object} config - theme / styling
   * @memberof SMA
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    
    super(target, xAxis, yAxis, config, parent, params) 

    SMA.inCnt++
    const overlay = params.overlay

    this.name = 'Simple Moving Average'
    this.shortName = 'SMA'
    this.ID = params.overlay?.id || uid(this.shortName)
    this.onChart = true
    this.checkParamCount = false
    this.scaleOverlay = false
    this.plots = [
      { key: 'sma6', title: 'SMA6: ', type: 'line' },
    ]
    this.calcParams = (overlay?.settings?.period) ? JSON.parse(overlay.settings.period) : calcParams
    this.style = (overlay?.settings) ? {...this.#defaultStyle, ...overlay.settings} : {...this.#defaultStyle, ...config.style}
    this.setNewValue = (value) => { this.newValue(value) }
    this.setUpdateValue = (value) => { this.UpdateValue(value) }
    this.addLegend()
  }

  addLegend() {
    let legend = {
      id: this.shortName,
      title: this.shortName,
      type: this.shortName,
      source: this.legendInputs.bind(this)
    }
    this.chart.legend.add(legend)
  }

  updateLegend() {
    this.parent.legend.update()
  }
  
  legendInputs(pos=this.chart.cursorPos, candle) {
    const inputs = {}
    const index = this.Timeline.xPos2Index(pos[0])
    let c = index  - (this.range.data.length - this.overlay.data.length)
    let colours = [this.style.strokeStyle]

    c = limit(c, 0, this.overlay.data.length - 1)
    inputs.SMA_1 = this.Scale.nicePrice(this.overlay.data[c][1])

    // if (isArray(this.chart.streamCandle)) value =

    return {inputs, colours}
  }

  // regeneratePlots (params) {
  //   return params.map(p => {
  //     return { key: `sma${p}`, title: `SMA${p}: `, type: 'line' }
  //   })
  // }

  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1
      return { key: `sma${num}`, title: `SMA${num}: `, type: 'line' }
    })
  }

  draw(range=this.range) {

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

