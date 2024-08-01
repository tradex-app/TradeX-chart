// STOCHRSI.js
// Stochastic RSI
// https://hackape.github.io/talib.js/modules/_index_.html#stochrsi
// https://www.investopedia.com/terms/s/stochrsi.asp

import Indicator from "../components/overlays/indicator"
import {STOCHRSI as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";


/**
 * Indicator - Stochastic RSI
 * @export
 * @class STOCHRSI
 * @extends {indicator}
 */
export default class STOCHRSI extends Indicator {

  get name() { return 'Stochastic RSI' }
  shortName = 'STOCHRSI'
  libName = 'STOCHRSI'
  definition = {
    input: {
      inReal: [],
      timePeriod: 14,
      stochPeriod: 14,
      KPeriod: 3,
      DPeriod: 3
    },
    output: {
      fastK: [],
      fastD: []
    },
  }
  checkParamCount = false


  static version = "1.0"
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[2] // YAXIS_TYPES - relative
  static defaultStyle = {

    fastK: {
      colour: {value: "#c89"},
      width: {value: 1},
      dash: {value: ""}, 
    },
    fastD: {
      colour: {value: "#08c"},
      width: {value: 1},
      dash: {value: ""}, 
    },
  }


  /**
   * Creates an instance of STOCHRSI.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof STOCHRSI
   */
  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {


    super (target, xAxis, yAxis, config, parent, params)

    this.init(talibAPI)
  }

}

