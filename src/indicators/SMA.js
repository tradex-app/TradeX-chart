// SMA.js
// Simple Moving Average
// https://hackape.github.io/talib.js/modules/_index_.html#sma
// https://www.investopedia.com/terms/s/sma.asp

import Indicator from "../components/overlays/indicator"
import { SMA as talibAPI } from "../definitions/talib-api";

 
 export default class SMA extends Indicator {

  get name() { return 'Simple Moving Average' }
  shortName = 'SMA'
  libName = 'SMA'
  definition = {
    input: {
      inReal: [], 
      timePeriod: 20 // 30
    },
    output: {
      output: [],
    },
  }

  #precision = 2
  primaryPane = true
  scaleOverlay = false

  
  static version = "1.0"
  static inCnt = 0
  static primaryPane = true
  // static scale = YAXIS_TYPE.default
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ]
  static defaultStyle = {
    output: {
      colour: {value: "#0097A7"},
      width: {value: 1},
      dash: {value: []},
    },
  }

  /**
   * Creates an instance of SMA.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof SMA
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    
    super(target, xAxis, yAxis, config, parent, params) 

    SMA.inCnt++

    this.init(talibAPI)
  }

}

