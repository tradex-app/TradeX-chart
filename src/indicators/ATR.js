// ADX.js
// Average True Range
// https://hackape.github.io/talib.js/modules/_index_.html#dx
// 

import Indicator from "../components/overlays/indicator"
import { ATR as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";


export default class ATR extends Indicator {

  get name() { return 'Average True Range' }
  shortName = 'ATR'
  libName = 'ATR'
  precision = 2
  scaleOverlay = true

  
  static version = "1.0"
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[2] // YAXIS_TYPES - relative
  static defaultStyle = {
    output: {
      colour: {value: "#E91E63"},
      width: {value: 1},
    },
    highLowRange: {
      colour: {value: "#880E4F"},
      width: {value: 1},
      dash: {value: [2,2]},
      fill: {value: "#880E4F08"},
      high: {value: 75},
      low: {value: 25}
    }
  }

  /**
 * Creates an instance of DX.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
 * @memberof DX
 */
  constructor(target, xAxis=false, yAxis=false, config, parent, params)  {

    super(target, xAxis, yAxis, config, parent, params)

    this.init(talibAPI)
  }

}

