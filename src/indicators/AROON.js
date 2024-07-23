// AROON.js
// Aroon
// https://hackape.github.io/talib.js/modules/_index_.html#aroon
// https://www.investopedia.com/terms/a/aroon.asp

import Indicator from "../components/overlays/indicator"
import { AROON as talibAPI } from "../definitions/talib-api";
import { YAXIS_TYPES } from "../definitions/chart";


export default class AROON extends Indicator {

  get name() { return 'Aroon' }
  shortName = 'AROON'
  libName = 'AROON'
  definition = {
    input: {
      high: [],
      low: [],
      timePeriod: 14
    },
    output: {
      aroonDown: [],
      aroonUp: []
    }
  }
  precision = 2
  scaleOverlay = true


  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent
  static defaultStyle = {

    aroonDown: {
      colour: {value: "#c89"},
      width: {value: 1},
      dash: {value: ""}, 
    },
    aroonUp: {
      colour: {value: "#08c"},
      width: {value: 1},
      dash: {value: ""}, 
    },
  }

  /**
    * Creates an instance of AROON.
    * @param {Object} target - canvas scene
    * @param {Object} xAxis - timeline axis instance
    * @param {Object} yAxis - scale axis instance
    * @param {Object} config - theme / styling
    * @param {Object} parent - chart pane instance that hosts the indicator
    * @param {Object} params - contains minimum of overlay instance
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params)  {
    super(target, xAxis, yAxis, config, parent, params)

    this.init(talibAPI)
  }

}