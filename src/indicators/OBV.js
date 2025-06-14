// OBV.js
// On Balance Volume
// https://hackape.github.io/talib.js/modules/_index_.html#dx
// 

import Indicator from "../components/overlays/indicator"
import { OBV as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPE } from "../definitions/chart";

let nameShort = "OBV"
let nameLong =  'On Balance Volume'

export default class OBV extends Indicator {

  get name() { return nameLong }
  get shortName() { return nameShort }
  get libName() { return nameShort }
  precision = 2
  scaleOverlay = true

  static nameShort = nameShort
  static nameLong = nameLong
  static version = "1.0"
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPE.default
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
      high: {value: 100},
      low: {value: -100}
    }
  }
  static timePeriodMultiplier = true


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

