// BB.js
// Bollinger Bands
// https://hackape.github.io/talib.js/modules/_index_.html#bbands
// https://www.investopedia.com/terms/b/bollingerbands.asp

import Indicator from "../components/overlays/indicator"
import { BBANDS as talibAPI } from "../definitions/talib-api";


export default class BB extends Indicator {

  get name() { return 'Bollinger Bands' }
  shortName = 'BB'
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

  /**
   * return inputs required to display indicator legend on chart pane
   * @param {Array} [pos=this.chart.cursorPos] - optional
   * @returns {Object} - {inputs, colours, labels}
   * @memberof BB
   */
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false

    const inputs = {}
      let labels = [false, false, false]
      let {c, colours} = super.legendInputs(pos)
    inputs.Hi = this.scale.nicePrice(this.overlay.data[c][1])
    inputs.Mid = this.scale.nicePrice(this.overlay.data[c][2])
    inputs.Lo = this.scale.nicePrice(this.overlay.data[c][3])
    colours = [
      this.style.upperStroke,
      this.style.middleStroke,
      this.style.lowerStroke
    ]
    return {inputs, colours, labels}
  }

}