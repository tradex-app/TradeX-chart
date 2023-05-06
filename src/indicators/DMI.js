// DMI.js

import indicator from "../components/overlays/indicator"
import { DX as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";
import { uid } from "../utils/utilities"


export default class DMI extends indicator {

  name = 'Directional Movement Index'
  shortName = 'DX'
  libName = null
  definition = {
    input: {

    },
    output: {

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
  scaleOverlay = true
  plots = [
    { key: 'DMI_1', title: ' ', type: 'line' },
  ]

  // static onChart = false
  // static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent


  /**
 * Creates an instance of DMI.
   * @param {object} target - canvas scene
   * @param {object} xAxis - timeline axis instance
   * @param {object} yAxis - scale axis instance
   * @param {object} config - theme / styling
   * @param {object} parent - (on/off)chart pane instance that hosts the indicator
   * @param {object} params - contains minimum of overlay instance
 * @memberof DMI
 */
  constructor(target, xAxis=false, yAxis=false, config, parent, params)  {

    super(target, xAxis, yAxis, config, parent, params)

    const overlay = params.overlay

    this.ID = params.overlay?.id || uid(this.shortName)
    this.defineIndicator(overlay?.settings, talibAPI)
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style}
    // calculate back history if missing
    this.calcIndicatorHistory()
    // enable processing of price stream
    this.setNewValue = (value) => { this.newValue(value) }
    this.setUpdateValue = (value) => { this.updateValue(value) }
  }

  get onChart() { return false }

  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
    const {c, colours} = super.legendInputs(pos)
    inputs.DMI_1 = this.Scale.nicePrice(this.overlay.data[c][1])

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
    const x2 = this.scene.width + (this.xAxis.bufferPx * 2)
    const y1 = this.yAxis.yPos(this.style.defaultHigh)
    const y2 = this.yAxis.yPos(this.style.defaultLow)

    // Fill the range between high and low
    const plots = [0, y1, this.scene.width, y2 - y1]
    let style = this.style.highLowRangeStyle
    this.plot(plots, "renderFillRect", style)

    // High RSI Range marker
    plots.length = 0
    plots[0] = {x: 0, y: y1}
    plots[1] = {x: x2, y: y1}
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.highStrokeStyle,
      dash: [5, 5]
    }
    this.plot(plots, "renderLine", style)

    // Low RSI Range marker
    plots.length = 0
    plots[0] = {x: 0, y: y2}
    plots[1] = {x: x2, y: y2}
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.lowStrokeStyle,
      dash: [5, 5]
    }
    this.plot(plots, "renderLine", style)


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

