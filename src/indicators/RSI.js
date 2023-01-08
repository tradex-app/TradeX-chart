// RSI.js
/**
 * RSI
 * RSI = SUM(MAX(CLOSE - REF(CLOSE,1),0),N) / SUM(ABS(CLOSE - REF(CLOSE,1)),N) × 100
 */
import indicator from "../components/overlays/inidcator"
import { 
  YAXIS_TYPES
} from "../definitions/chart";
import { limit, round } from "../utils/number";
import { isArray } from "../utils/typeChecks";
import { uid } from "../utils/utilities"

const T = 0, O = 1, H = 2, L = 3, C = 4, V = 5;
const calcParams = [20]


/**
 * Indicator - Relative Strength Index
 * @export
 * @class RSI
 * @extends {indicator}
 */
export default class RSI extends indicator {
  #ID
  #name = 'Relative Strength Index'
  #shortName = 'RSI'
  #params
  #onChart = false
  #checkParamCount = false
  #scaleOverlay = true
  #plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]
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
  #style = {}

  // YAXIS_TYPES - percent
  static scale = YAXIS_TYPES[1]


  /**
   * Creates an instance of RSI.
   * @param {object} target - canvas scene
   * @param {object} overlay - data for the overlay
   * @param {instance} xAxis - timeline axis
   * @param {instance} yAxis - scale axis
   * @param {object} config - theme / styling
   * @memberof RSI
   */
  // constructor (target, overlay, xAxis, yAxis, config) {

  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {

    super (target, xAxis, yAxis, config, parent, params) 

    const overlay = params.overlay

    this.#ID = params.overlay?.id || uid(this.#shortName)
    this.#params = params
    this.calcParams = (overlay?.settings?.period) ? JSON.parse(overlay.settings.period) : calcParams
    this.style = (overlay?.settings) ? {...this.#defaultStyle, ...overlay.settings} : {...this.#defaultStyle, ...config.style}
    this.setNewValue = (value) => { this.newValue(value) }
    this.setUpdateValue = (value) => { this.UpdateValue(value) }
  }

  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get onChart() { return this.#onChart }
  get plots() { return this.#plots }

  addLegend() {
    let legend = {
      id: this.#shortName,
      title: this.#shortName,
      type: this.#shortName,
      source: this.legendInputs.bind(this)
    }
    this.chart.legend.add(legend)
  }

  legendInputs(pos=this.chart.cursorPos, candle) {
    const inputs = {}
    const index = this.Timeline.xPos2Index(pos[0])
    let c = index  - (this.range.data.length - this.overlay.data.length)
    let colours = [this.style.strokeStyle]

    c = limit(c, 0, this.overlay.data.length - 1)
    inputs.RSI_1 = this.Scale.nicePrice(this.overlay.data[c][1])

    return {inputs, colours}
  }

  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1
      return { key: `rsi${num}`, title: `RSI${num}: `, type: 'line' }
    })
  }

  /**
   * process stream and create new indicator data entry
   * @param {array} value - current stream candle 
   * @memberof RSI
   */
  newValue (value) {
    let p = this.TALibParams()
    if (!p) return false

    let v = this.calcIndicatorStream(this.#shortName, this.TALibParams())
    if (!v) return false

    this.overlay.data.push([v[0], v[1]])

    this.target.setPosition(this.core.scrollPos, 0)
    this.draw(this.range)
  }

  /**
   * process stream and update current (last) indicator data entry
   * @param {array} value - current stream candle 
   * @memberof RSI
   */
  UpdateValue (value) {
    let l = this.overlay.data.length - 1
    let p = this.TALibParams()
    if (!p) return false

    let v = this.calcIndicatorStream(this.#shortName, p)
    if (!v) return false

    this.overlay.data[l] = [v[0], v[1]]

    this.target.setPosition(this.core.scrollPos, 0)
    this.draw(this.range)

    // console.log(`RSI stream input update: ${value}`)

  }

  TALibParams() {
    let end = this.range.dataLength
    let step = this.calcParams[0]
    let start = end - step
    let input = this.indicatorInput(start, end)
    let hasNull = input.find(element => element === null)
    if (hasNull) return false
    else return { inReal: input, timePeriod: step }
  }
 
  /**
   * Draw the current indicator range on its canvas layer and render it.
   * @param {object} range 
   */
  draw(range=this.range) {

    this.scene.clear()

    const data = this.overlay.data
    const width = this.xAxis.candleW
    const x2 = this.scene.width + (this.xAxis.bufferPx * 2)
    const y1 = this.yAxis.yPos(100 - this.style.defaultHigh)
    const y2 = this.yAxis.yPos(100 - this.style.defaultLow)

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

    // RSI plot
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
        plot.y = this.yAxis.yPos(100 - data[c][1])
        plots.push({...plot})
      }
      c++
      i--
    }

    this.plot(plots, "renderLine", this.style)

    this.target.viewport.render();
  }

}
