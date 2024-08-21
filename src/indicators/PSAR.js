// PSAR.js
// Percentage Price Oscillator
// https://hackape.github.io/talib.js/modules/_index_.html#dx
// 

import Indicator from "../components/overlays/indicator"
import { SAR as talibAPI } from "../definitions/talib-api";


export default class PSAR extends Indicator {

  get name() { return 'Parabolic Stop and Reverse' }
  shortName = 'PSAR'
  libName = 'SAR'
  precision = 2
  scaleOverlay = false

  
  static version = "1.0"
  static inCnt = 0
  static primaryPane = true
  static defaultStyle = {
    output: {
      colour: {value: "#E91E63"},
      width: {value: 1},
      dash: {value: []},
    },
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

