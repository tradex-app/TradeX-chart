// trade-flow.js
// visualize trade flow

// import { Indicator } from "tradex-chart"
import { Indicator } from "./src"
import { candleW } from "./src"
import { YAXIS_TYPES } from "./src";
import { YAXIS_PADDING } from "./src/definitions/chart";

/**
 * custom indicator class
 */
export default class TradeFlow extends Indicator {

  static version = "1.0"
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[2] // YAXIS_TYPES - relative
  static yAxisPadding = YAXIS_PADDING
  static colours = []
  static defaultStyle = {
    buy: {
      colour: {value: "#0f0"},
    },
    sell: {
      colour: {value: "#f00"},
    },
  }
  

  get name() {return "Trade Flow" }
  shortName = "TRDFLO"
  scaleOverlay = false


  definition = {
    output: {
      buy: [],
      sell: []
    },
    meta: {
      output: [
        {name: "buy", type: "custom", plot: "tradeBar"},
        {name: "sell", type: "custom", plot: "tradeBar"}
      ],
      outputLegend: {
        buy: {labelStr: "Buy", label: true, value: true},
        sell: {labelStr: "Sell", label: true, value: true},
      }
    },
  }


  /**
   * Creates an instance of Test.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance (primary|secondary) that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof Test
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params)

    this.init()

    this.on("trade_added", this.tradeAdded)
  }

  /**
   * calculate indicator values
   * @returns {boolean|array}
   */
  calcIndicatorHistory() {

    // create a time series array from State trades entries
    this.dataProxy(this.dataProxyFn, this.state.allData.trades[this.state.time.timeFrame])   

    return false
  }

  calcIndicatorStream (indicator, params={}, range=this.range) {

    // fill new data entry with zeros
    // this.on("trade_added", this.tradeAdded)
    // will add new trade data when it becomes available.
    let ts = range.value()[0]
    let idx = range.getTimeIndex(ts)
    this.data[idx] = [ts, 0, 0]

    return false
  }

  draw(range=this.range) {
    // no update required
    if (this.data.length == 0 ||
      range.secondaryMaxMin[this.id] == undefined) return

    if (!super.mustUpdate()) return

    this.scene.clear()

    let w = candleW(this.xAxis.candleW )
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o
    let i = range.Length + (o * 2)
    let j = i
    let plots, opts;

    while (j) {
      let d = this.data[c]
      if (d === undefined) break

      let y0 = this.yAxis.yPos(0)
      let y1 = this.yAxis.yPos(d[1])
      let y2 = this.yAxis.yPos(d[2])

      let buyH = y0-y1
      let sellH = y2-y0

      if (buyH != 0 || sellH != 0) {
        let x = this.xAxis.xPos(d[0]) - (w / 2)
        // plot buy
        plots = [x, y1, w, buyH]
        opts = {fill: this.style.buy.colour.value}
        super.plot(plots, "renderRectFill", opts)
  
        // plot sell
        plots = [x, y0, w, sellH]
        opts = {fill: this.style.sell.colour.value}
        super.plot(plots, "renderRectFill", opts)
      }
      c++
      j--
    }

    super.updated()
  }


  /**
   * populate indicator with trade data from state trades entries
   * @param {array} data
   * @param {State} state - State instance
   * @param {Range} range - Range instance
   * @memberof TradeFlow
   */
  dataProxyFn(data, state, range) {
    const trades = state.allData.trades[state.time.timeFrame]
    for (let t in trades) {
      let ts = t*1
      if (ts < range.timeStart ||
          ts > range.timeFinish) continue

      let idx = range.getTimeIndex(ts)
      let buy = 0
      let sell = 0
      for (let ts of trades[t]) {
        if (ts.side == "buy") buy += ts.filled
        if (ts.side == "sell") sell += ts.filled
      }
      data[idx] = [ts, buy, sell * -1]
    }
  }
  
  tradeAdded(t) {
    // TODO: add this trade to the indicator data
  }


  /*
  getTrades() {
    let t;
    let p = this.state.data.primary
    for (let o of p) {
      if (o.type == "trades") return o.data
    }
  }

  getTradesInRange(range=this.range) {
    const start = range.indexStart
    const end = range.indexEnd
    const max = range.timeMax
    const tf = range.timeFrameMS
    const trades = this.getTrades()
    let min = range.timeMin
    let r = {}

    for (let t in trades) {
      t = t * 1
      if (t >= min && t <= max) {
        // r = [...r, ...trades[t]]
        r[tf - (t % tf)] = trades[t]
      }
      else break
      min += tf
    }

    return r
  }
 */
}
