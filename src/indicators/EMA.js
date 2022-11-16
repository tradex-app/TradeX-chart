/**
 * EMA
 */
 import indicator from "../components/overlays/inidcator"
 import { 
   YAXIS_TYPES
 } from "../definitions/chart";
import { round } from "../utils/number";
import { uid } from "../utils/utilities"

const calcParams = [20]
 
 export default class EMA extends indicator {
  #ID
  #name ='Exponential Moving Average'
  #shortName = 'EMA'
  #params
  #onChart = true
  #series = 'price'
  #precision = 2
  #calcParams = [6, 12, 20]
  #checkParamCount = false
  #scaleOverlay = false
  #plots = [
    { key: 'ema6', title: 'EMA6: ', type: 'line' },
    { key: 'ema12', title: 'EMA12: ', type: 'line' },
    { key: 'ema20', title: 'EMA20: ', type: 'line' }
  ]
  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1'
  }
  #style = {}

  // YAXIS_TYPES - default
  static scale = YAXIS_TYPES[0]


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

  calcIndicator(input) {
    this.overlay.data = this.TAlib.Indicators.EMA.ema(input)
  }

  regeneratePlots (params) {
    return params.map(p => {
      return { key: `ema${p}`, title: `EMA${p}: `, type: 'line' }
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

  draw(range=this.range) {

    this.scene.clear()

    const data = this.overlay.data
    const width = this.xAxis.candleW
    const plots = []
    const offset = this.xAxis.smoothScrollOffset || 0
    const plot = {
      x: (width * 0.5) + 2 + offset - (width * 2),
      w: width,
    }

    // account for "missing" entries because of indicator calculation
    let x = 3
    let o = this.Timeline.rangeScrollOffset;
    let c = range.indexStart - (range.data.length - this.overlay.data.length) - o
    let i = range.Length + o + x

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots[range.Length + o + x - i] = {x: null, y: null}
      }
      else {
        plot.y = this.yAxis.yPos(data[c][1])
        plots[range.Length + o + x - i] = {...plot}
      }
      c++
      i--
      plot.x = plot.x + plot.w
    }

    this.plot(plots, "renderLine", this.style)

    this.target.viewport.render();
  }
}

