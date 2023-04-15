// BB.js
// Bollinger Bands
// 

import indicator from "../components/overlays/indicator"
import { BBANDS as bb } from "./talib-api";
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
  precision = 2
  onChart = true
  scaleOverlay = false
  plots = [
    { key: 'BB_1', title: ' ', type: 'line' },
  ]

  // YAXIS_TYPES - default
  static scale = YAXIS_TYPES[0]

  /**
 * Creates an instance of DMI.
 * @param {object} target - canvas scene
 * @param {object} overlay - data for the overlay
 * @param {instance} xAxis - timeline axis
 * @param {instance} yAxis - scale axis
 * @param {object} config - theme / styling
 * @memberof DMI
 */
  constructor(target, xAxis=false, yAxis=false, config, parent, params)  {
    super(target, xAxis, yAxis, config, parent, params)

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
    inputs.BB_1 = this.Scale.nicePrice(this.overlay.data[c][1])

    return {inputs, colours}
  }

  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1
      return { key: `dmi${num}`, title: `DMI${num}: `, type: 'line' }
    })
  }

  draw(range=this.range) {
    this.scene.clear()

    const plots = {lower: [], middle: [], upper: []}
    const data = this.overlay.data
    const width = this.xAxis.candleW
    // const x2 = this.scene.width + (this.xAxis.bufferPx * 2)
    // const y1 = this.yAxis.yPos(this.style.defaultHigh)
    // const y2 = this.yAxis.yPos(this.style.defaultLow)

    // // Fill the range between high and low
    // const plots = [0, y1, this.scene.width, y2 - y1]
    // let style = this.style.highLowRangeStyle
    // this.plot(plots, "renderFillRect", style)

    // // High BB Range marker
    // plots.length = 0
    // plots[0] = {x: 0, y: y1}
    // plots[1] = {x: x2, y: y1}
    // style = {
    //   lineWidth: this.style.highLowLineWidth,
    //   strokeStyle: this.style.highStrokeStyle,
    //   dash: [5, 5]
    // }
    // this.plot(plots, "renderLine", style)

    // // Low BB Range marker
    // plots.length = 0
    // plots[0] = {x: 0, y: y2}
    // plots[1] = {x: x2, y: y2}
    // style = {
    //   lineWidth: this.style.highLowLineWidth,
    //   strokeStyle: this.style.lowStrokeStyle,
    //   dash: [5, 5]
    // }
    // this.plot(plots, "renderLine", style)


    // DMI plot
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
        plots.lower.push({x: null, y: null})
        plots.middle.push({x: null, y: null})
        plots.upper.push({x: null, y: null})
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0].lowerBand)
        plot.y = this.yAxis.yPos(data[c][1].lowerBand)
        plots.lower.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0].middleBand)
        plot.y = this.yAxis.yPos(data[c][1].middleBand)
        plots.middle.push({...plot})

        plot.x = this.xAxis.xPos(data[c][0].upperBand)
        plot.y = this.yAxis.yPos(data[c][1].upperBand)
        plots.upper.push({...plot})
      }
      c++
      i--
    }

    this.plot(plots.lower, "renderLine", this.style)
    this.plot(plots.middle, "renderLine", this.style)
    this.plot(plots.upper, "renderLine", this.style)

    this.target.viewport.render();
  }
}