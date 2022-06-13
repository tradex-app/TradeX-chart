// RSI.js
/**
 * RSI
 * RSI = SUM(MAX(CLOSE - REF(CLOSE,1),0),N) / SUM(ABS(CLOSE - REF(CLOSE,1)),N) × 100
 */
import indicator from "../components/overlays/inidcator"

export default class RSI extends indicator {
  name = 'Relative Strength Index'
  shortName = 'RSI'
  calcParams = [6, 12, 24]
  shouldCheckParamCount = false
  plots = [
    { key: 'rsi1', title: 'RSI1: ', type: 'line' },
    { key: 'rsi2', title: 'RSI2: ', type: 'line' },
    { key: 'rsi3', title: 'RSI3: ', type: 'line' }
  ]
  defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1'
  }
  style 

  constructor(target, xAxis, yAxis, config) {
    super(target, xAxis, yAxis, config)

    this.style = config.style || this.defaultStyle
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

  plot(range) {
    this.scene.clear()

    const data = range.data
    plots = []
    const plot = {
      x: 2,
      w: this.xAxis.width / range.Length,
    }

    let c = range.indexStart
    let i = range.Length

    while(i) {
      plot.y = this.yAxis.yPos100(data[c][1])
      plots[i - 1] = plot

      c++
      i--
      plot.x = plot.x + plot.w
    }

    this.draw(plots, "renderLine", this.style)

    this.target.viewport.render();
  }
}
