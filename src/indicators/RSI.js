// RSI.js
/**
 * RSI
 * RSI = SUM(MAX(CLOSE - REF(CLOSE,1),0),N) / SUM(ABS(CLOSE - REF(CLOSE,1)),N) × 100
 */
import indicator from "../components/overlays/inidcator"
import { 
  YAXIS_TYPES
} from "../definitions/chart";

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
    lineWidth: '1'
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
    this.style = config.style || this.defaultStyle
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
    const plots = []
    const plot = {
      x: 2,
      w: this.xAxis.width / range.Length,
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
