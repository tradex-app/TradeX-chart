/**
 * EMA
 */
 import indicator from "../components/overlays/inidcator"
 import { 
   YAXIS_TYPES
 } from "../definitions/chart";
import { round } from "../utils/number";
 
 export default class EMA extends indicator {
  name ='Exponential Moving Average'
  shortName = 'EMA'
  onChart = true
  series = 'price'
  calcParams = [6, 12, 20]
  precision = 2
  shouldCheckParamCount = false
  shouldOhlc = true
  plots = [
    { key: 'ema6', title: 'EMA6: ', type: 'line' },
    { key: 'ema12', title: 'EMA12: ', type: 'line' },
    { key: 'ema20', title: 'EMA20: ', type: 'line' }
  ]
  defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1'
  }
  style = {}
  overlay
  TALib

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

    this.overlay = overlay
    this.style = config.style || this.defaultStyle
    this.TALib = xAxis.mediator.api.core.TALib
  }

  calcIndicator(input) {
    this.overlay.data = this.TALib.EMA(input)
  }






  regeneratePlots (params) {
    return params.map(p => {
      return { key: `ema${p}`, title: `EMA${p}: `, type: 'line' }
    })
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
    const plot = {
      x: (width * 0.5) + 2,
      w: width,
    }

    // account for "missing" entries because of indicator calculation
    let o = range.data.length - this.overlay.data.length
    let c = range.indexStart - o
    let i = range.Length

    while(i) {
      if (!c) {
        plots[range.Length - i] = {x: null, y: null}
      }
      else {
        plot.y = this.yAxis.yPos(100 - data[c][1])
        plots[range.Length - i] = {...plot}
      }
      c++
      i--
      plot.x = plot.x + plot.w
    }

    this.plot(plots, "renderLine", this.style)

    this.target.viewport.render();
  }
}

