/**
 * EMA
 */
 import indicator from "../components/overlays/inidcator"
 import { 
   YAXIS_TYPES
 } from "../definitions/chart";
import { round } from "../utils/number";
import { uid } from "../utils/utilities"
 
 export default class EMA extends indicator {
  #ID
  #name ='Exponential Moving Average'
  #shortName = 'EMA'
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
   * Creates an instance of RSI.
   * @param {object} target - canvas scene
   * @param {object} overlay - data for the overlay
   * @param {instance} xAxis - timeline axis
   * @param {instance} yAxis - scale axis
   * @param {object} config - theme / styling
   * @memberof RSI
   */
  constructor(target, overlay, xAxis, yAxis, config) {
    super(target, xAxis, yAxis, config)

    this.#ID = uid(this.#shortName)
    this.#style = {...this.#defaultStyle, ...config.style}
  }

  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get onChart() { return this.#onChart }
  get style() { return this.#style }
  get plots() { return this.#plots }

  calcIndicator(input) {
    this.overlay.data = this.TAlib.Indicators.EMA.ema(input)
  }

  regeneratePlots (params) {
    return params.map(p => {
      return { key: `ema${p}`, title: `EMA${p}: `, type: 'line' }
    })
  }

  updateIndicator (input) {

  }

  calcTechnicalIndicator (dataList, { params, plots }) {
    let closeSum = 0
    const emaValues = []
    return dataList.map((kLineData, i) => {
      const ema = {}
      const close = kLineData.close
      closeSum += close
      params.forEach((p, index) => {
        if (i >= p - 1) {
          if (i > p - 1) {
            emaValues[index] = (2 * close + (p - 1) * emaValues[index]) / (p + 1)
          } else {
            emaValues[index] = closeSum / p
          }
          ema[plots[index].key] = emaValues[index]
        }
      })
      return ema
    })
  }

  draw(range) {
    this.scene.clear()

    const data = this.overlay.data
    const width = round(this.scene.width / range.Length, 1)
    const plots = []
    const offset = this.xAxis.smoothScrollOffset || 0
    const plot = {
      x: (width * 0.5) + 2 + offset - (width * 2),
      w: width,
    }

    // account for "missing" entries because of indicator calculation
    let o = (range.indexStart - 1 < 0) ? 0 : 2
    let c = range.indexStart - (range.data.length - this.overlay.data.length) - o
    let i = range.Length + o + 1

    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots[range.Length + o + 1 - i] = {x: null, y: null}
      }
      else {
        plot.y = this.yAxis.yPos(100 - data[c][1])
        plots[range.Length + o + 1 - i] = {...plot}
      }
      c++
      i--
      plot.x = plot.x + plot.w
    }

    this.plot(plots, "renderLine", this.style)

    this.target.viewport.render();
  }
}

