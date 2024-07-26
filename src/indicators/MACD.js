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
      MACDHist: [],
    },
    meta: {
      outputOrder: [
       "MACD", "MACDSignal", "MACDHist",
      ],
      outputLegend: {
        MACD: {labelStr: "MACD", label: false, value: true},
        MACDSignal: {labelStr: "Signal", label: false, value: true},
        MACDHist: {labelStr: "Hist", label: false, value: true}
      },
    }
  }

  #precision = 2
  scaleOverlay = false

  
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[2] // YAXIS_TYPES - relative
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ]
  static defaultStyle = {
    MACD: {
      colour: {value: "#08c"},
      width: {value: 1},
      dash: {value: ""}, 
    },
    MACDSignal: {
      colour: {value: "#08c"},
      width: {value: 1},
      dash: {value: ""}, 
    },
    MACDHist: {
      upStroke: "#0f0",
      upFill: "#0c0",
      upWidth: '1',
      dnStroke: "#f00",
      dnFill: "#c00",
      dnWidth: '1',
    },
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

}

