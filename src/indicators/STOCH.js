// STOCH.js
// Stochastic Oscillator
// https://hackape.github.io/talib.js/modules/_index_.html#rsi
// https://www.investopedia.com/terms/r/rsi.asp

import Indicator from "../components/overlays/indicator"
import {STOCH as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPE } from "../definitions/chart";


/**
 * Indicator - Stochastic Oscillator
 * @export
 * @class STOCH
 * @extends {indicator}
 */
export default class STOCH extends Indicator {

  get name() { return 'Stochastic Oscillator' }
  shortName = 'STOCH'
  libName = 'STOCH'
  definition = {
    input: {
      high: [],
      low: [],
      close: [],
      fastK_Period: 5,
      slowK_Period: 3,
      slowD_Period: 3
    },
    output: {
      slowK: [],
      slowD: []
    },
  }
  checkParamCount = false


  static version = "1.0"
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPE.relative
  static defaultStyle = {
    slowK: {
      colour: {value: "#c89"},
      width: {value: 1},
      dash: {value: ""}, 
    },
    slowD: {
      colour: {value: "#08c"},
      width: {value: 1},
      dash: {value: ""}, 
    },
  }
  static timePeriodMultiplier = true


  /**
   * Creates an instance of STOCH.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof STOCH
   */
  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {

    super (target, xAxis, yAxis, config, parent, params)

    this.init(talibAPI)
  }

}

