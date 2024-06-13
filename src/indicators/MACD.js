// MACD.js
// Moving Average Convergence/Divergence
// https://hackape.github.io/talib.js/modules/_index_.html#ma
// https://www.investopedia.com/terms/s/ma.asp

import Indicator from "../components/overlays/indicator"
import { MACD as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";

 
 export default class MACD extends Indicator {

  get name() { return 'Moving Average Convergence/Divergence' }
  shortName = 'MACD'
  libName = 'MACD'
  definition = {
    input: {
      inReal: [], 
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9
    },
    output: {
      MACD: [],
      MACDSignal: [],
      MACDHist: []
    },
  }

  #precision = 2
  scaleOverlay = false
  plots = [
    { key: 'MACD_1', title: 'MACD: ', type: 'line' },
  ]

  
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ]
  static defaultStyle = {
    stroke: "#C80",
    width: '1'
  }

  /**
   * Creates an instance of MACD.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof MACD
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    
    super(target, xAxis, yAxis, config, parent, params) 

    MACD.inCnt++

    this.init(talibAPI)
  }
  
  legendInputs(pos=this.chart.cursorPos) {

    return false

    if (this.overlay.data.length == 0) return false

    const inputs = {}
    const {c, colours} = super.legendInputs(pos)
    inputs.MA_1 = this.scale.nicePrice(this.overlay.data[c][1])

    return {inputs, colours}
  }

}

