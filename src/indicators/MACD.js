// MACD.js
// Moving Average Convergence/Divergence
// https://hackape.github.io/talib.js/modules/_index_.html#ma
// https://www.investopedia.com/terms/s/ma.asp

import Indicator from "../components/overlays/indicator"
import { MACD as talibAPI } from "../definitions/talib-api";
import { YAXIS_PADDING, YAXIS_TYPE } from "../definitions/chart";

let nameShort = "MACD"
let nameLong = 'Moving Average Convergence/Divergence'

 
 export default class MACD extends Indicator {

  get name() { return 'Moving Average Convergence/Divergence' }
  shortName = nameShort
  libName = nameShort
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

  static nameShort = nameShort
  static nameLong = nameLong
  static version = "1.0"
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPE.relative
  static yAxisPadding = YAXIS_PADDING
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
      colour: {value: "#0c8"},
      width: {value: 1},
      dash: {value: ""}, 
    },
    MACDHist: {
      upStroke: {value: "#0f0"},
      upFill: {value: "#0c0"},
      upWidth: {value: '1'},
      dnStroke: {value: "#f00"},
      dnFill: {value: "#c00"},
      dnWidth: {value: '1'},
    },
  }
  static timePeriodMultiplier = true


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

  draw() {
    return super.draw()
  }

}

