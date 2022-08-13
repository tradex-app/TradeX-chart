// RSI.js
/**
 * RSI
 * RSI = SUM(MAX(CLOSE - REF(CLOSE,1),0),N) / SUM(ABS(CLOSE - REF(CLOSE,1)),N) × 100
 */
import indicator from "../components/overlays/inidcator"
import { 
  YAXIS_TYPES
} from "../definitions/chart";
import { round } from "../utils/number";

export default class RSI extends indicator {
  name = 'Relative Strength Index'
  shortName = 'RSI'
  onChart = false
  calcParams = [20]
  checkParamCount = false
  plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]
  defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1',
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStrokeStyle: "#848",
    lowStrokeStyle: "#848"
  }
  style = {}
  overlay
  TALib

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
  constructor(target, overlay, xAxis, yAxis, config) {
    super(target, xAxis, yAxis, config)

    this.overlay = overlay
    this.style = {...this.defaultStyle, ...config.style}
    this.TALib = xAxis.mediator.api.core.TALib
  }

  calcIndicator(input) {
    this.overlay.data = this.TALib.EMA(input)
  }

  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1
      return { key: `rsi${num}`, title: `RSI${num}: `, type: 'line' }
    })
  }

  calcTechnicalIndicator (dataList, { params, plots }) {
    const sumCloseAs = []
    const sumCloseBs = []
    return dataList.map((kLineData, i) => {
      const rsi = {}
      const preClose = (dataList[i - 1] || kLineData).close
      const tmp = kLineData.close - preClose
      params.forEach((p, index) => {
        if (tmp > 0) {
          sumCloseAs[index] = (sumCloseAs[index] || 0) + tmp
        } else {
          sumCloseBs[index] = (sumCloseBs[index] || 0) + Math.abs(tmp)
        }
        if (i >= p - 1) {
          if (sumCloseBs[index] !== 0) {
            rsi[plots[index].key] = 100 - (100.0 / (1 + sumCloseAs[index] / sumCloseBs[index]))
          } else {
            rsi[plots[index].key] = 0
          }
          const agoData = dataList[i - (p - 1)]
          const agoPreData = dataList[i - p] || agoData
          const agoTmp = agoData.close - agoPreData.close
          if (agoTmp > 0) {
            sumCloseAs[index] -= agoTmp
          } else {
            sumCloseBs[index] -= Math.abs(agoTmp)
          }
        }
      })
      return rsi
    })
  }

  draw(range) {
    this.scene.clear()

    const data = this.overlay.data
    const width = this.xAxis.candleW
    const plots = []
    const x2 = this.scene.width + (this.xAxis.bufferPx * 2)
    const y1 = this.yAxis.yPos(100 - this.style.defaultHigh)
    const y2 = this.yAxis.yPos(100 - this.style.defaultLow)

    // High RSI Range marker
    plots[0] = {x: 0, y: y1}
    plots[1] = {x: x2, y: y1}
    let style = {
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
    const offset = this.xAxis.smoothScrollOffset || 0
    const plot = {
      x: (width * 0.5) + 2 + offset - (width * 2),
      w: width,
    }

    // account for "missing" entries because of indicator calculation
    let o = this.xAxis.rangeScrollOffset;
    let c = range.indexStart - (range.data.length - this.overlay.data.length) - o - 1
    let i = range.Length + o + 2

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
