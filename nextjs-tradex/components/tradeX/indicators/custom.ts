// custom-indicator.js
// proof of concept for user defined indicators

// import { Indicator } from "tradex-chart"
import { Indicator, Range, uid } from '../../../../src/'
import { isArray, isObject } from "../../../../src/utils/typeChecks"

/**
 * custom indicator class
 */
export default class Test extends Indicator {

  static inCnt = 0
  static primaryPane = true
  // static scale is required for secondary pane (off chart) indicators
  // static scale = YAXIS_TYPE.default
  static colours = []
  static defaultStyle = {
    close: {
      colour: {value: "#FF6F00"},
      width: {value: 1},
      dash: {value: []},
    },
    open: {
      colour: {value: "#512DA8"},
      width: {value: 1},
      dash: {value: []},
    },
  }
  

  get name() {return "Test Custom Inicator" }
  shortName = "Test"
  timePeriod = 20

  definition = {
    output: {
      close: [],
      open: []
    },
    meta: {
      output: [
        {name: "close", type: "custom", plot: "line"},
        {name: "open", type: "custom", plot: "line"}
      ],
    }
  }

  /**
   * Creates an instance of Test.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance (primary|secondary) that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof Test
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params)

    this.init()
  }

  /**
   * calculate indicator values
   * @param {Object} range - instance of Range
   * @returns {boolean|array}
   */
  calcIndicator (indicator, params={}, range, output) {

    const indicatorFn = (params) => {
      return {open: [params.open[0]], close: [params.close[0]]}
    }

    return super.calcIndicator(indicatorFn, params={}, range, output) 
  }


  calcIndicatorStream (indicator, params={}, range=this.range) {

    const indicatorFn = (params) => {
      return {open: [params.open[0]], close: [params.close[0]]}
    }

    return super.calcIndicatorStream(indicatorFn, params, range) 
  }

}
