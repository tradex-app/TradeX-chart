// MA.js
// Moving Average
// https://hackape.github.io/talib.js/modules/_index_.html#ma
// https://www.investopedia.com/terms/s/ma.asp

import Indicator from "../components/overlays/indicator"
import { MA as talibAPI } from "../definitions/talib-api";

 
 export default class MA extends Indicator {

  get name() { return 'Moving Average' }
  shortName = 'MA'
  libName = 'MA'
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
  // static scale = YAXIS_TYPES[0] // YAXIS_TYPES - default
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ]
  static defaultStyle = {
    output: {
      colour: {value: "#9C27B0"},
      width: {value: 1},
    },
  }

  /**
   * Creates an instance of MA.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof MA
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    
    super(target, xAxis, yAxis, config, parent, params) 

    MA.inCnt++

    this.init(talibAPI)
  }

}

