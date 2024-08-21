// RSI.js
// Relative Strength Index
// https://hackape.github.io/talib.js/modules/_index_.html#rsi
// https://www.investopedia.com/terms/r/rsi.asp

import Indicator from "../components/overlays/indicator"
import {RSI as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";


/**
 * Indicator - Relative Strength Index
 * @export
 * @class RSI
 * @extends {Indicator}
 */
export default class RSI extends Indicator {

  get name() { return 'Relative Strength Index' }
  shortName = 'RSI'
  libName = 'RSI'
  definition = {
    input: {
      inReal: [], 
      timePeriod: 20 // 5
    },
    output: {
      output: [],
    },
    meta: {
      outputOrder: [
        "output",
        "highLowRange"
      ],
      output: [
        {name: "highLowRange", type: "overlay", plot: "highLowRange", style: RSI.defaultStyle.highLow}
      ],
      style: RSI.defaultStyle
    }
  }

  checkParamCount = false

  static version = "1.0"
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent
  static defaultStyle = {
    output: {
      colour: {value: "#E91E63"},
      width: {value: 1},
      dash: {value: []},
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
   * Creates an instance of RSI.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof RSI
   */
  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {

    super (target, xAxis, yAxis, config, parent, params)

    this.init(talibAPI)
  }

}

