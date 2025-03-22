// BB.js
// Bollinger Bands
// https://hackape.github.io/talib.js/modules/_index_.html#bbands
// https://www.investopedia.com/terms/b/bollingerbands.asp

import Indicator from "../components/overlays/indicator"
import { BBANDS as talibAPI } from "../definitions/talib-api";

let nameShort = "BB"
let nameLong = 'Bollinger Bands'


export default class BB extends Indicator {

  get name() { return nameLong }
  shortName = nameShort
  libName = 'BBANDS'
  definition = {
    input: {
      inReal: [], 
      nbDevDn: 2, // 2
      nbDevUp: 2, // 2
      timePeriod: 20 // 5
    },
    output: {
      lowerBand: [],
      middleBand: [],
      upperBand: []
    },
    meta: {

    }
  }

  precision = 2
  scaleOverlay = false

  static nameShort = nameShort
  static nameLong = nameLong
  static version = "1.0"
  static inCnt = 0
  static primaryPane = true
  static defaultStyle = {
    lowerBand: {
      colour: {value: "#08c"},
      width: {value: 1},
      dash: {value: ""},
    },
    middleBand: {
      colour: {value: "#0080c088"},
      width: {value: 1},
      dash: {value: [20, 5]},
    },
    upperBand: {
      colour: {value: "#08c"},
      width: {value: 1},
      dash: {value: ""}, 
    },
    fill: {
      colour: {value: "#0080c044"},
    }
  }

  /**
 * Creates an instance of BB.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
 * @memberof BB
 */
  constructor(target, xAxis=false, yAxis=false, config, parent, params)  {
    super(target, xAxis, yAxis, config, parent, params)

    this.init(talibAPI)
  }

}