// DMI.js
// Directional Movement Index

// import { Indicator } from "tradex-chart"
import { Indicator } from "./src"
import { candleW } from "./src"
import { YAXIS_PADDING, YAXIS_TYPES } from "./src";

import { isArray } from "./src/utils/typeChecks";

/**
 * custom indicator class
 */
export default class DMI extends Indicator {

  static version = "1.0"
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPES[2] // YAXIS_TYPES - relative
  static yAxisPadding = YAXIS_PADDING
  static colours = []
  static defaultStyle = {
    "DMI+": {
      colour: {value: "#0f0"},
    },
    "DMI-": {
      colour: {value: "#f00"},
    },
  }
  

  get name() {return "Directional Movement Index" }
  shortName = "DMI"
  scaleOverlay = false


  definition = {
    output: {
      "DMI+": [],
      "DMI-": []
    },
    meta: {
      output: [
        {name: "DMI+", type: "custom", plot: "line"},
        {name: "DMI-", type: "custom", plot: "line"}
      ],
      outputLegend: {
        "DMI+": {labelStr: "DMI+", label: true, value: true},
        "DMI-": {labelStr: "DMI-", label: true, value: true},
      }
    },
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

    this.on("trade_added", this.tradeAdded)
  }

  calcIndicator(indicator, params={}, range=this.range) {
    let DIPlusDef= {input: { timePeriod: 14}, output: {output: []}}
    let DIMinusDef = {input: { timePeriod: 14}, output: {output: []}}
    let result1 = super.calcIndicator("PLUS_DI", params, range, DIPlusDef)
    let result2 = super.calcIndicator("MINUS_DI", params, range, DIMinusDef)

    if (!result1 && !result2) return false

    for (let i=0; i<result1.length; i++) {
      result1[i][2] = result2[i][1]
    }
    return result1
  }


  calcIndicatorStream (indicator, params={}, range=this.range) {

    // fill new data entry with zeros
    // this.on("trade_added", this.tradeAdded)
    // will add new trade data when it becomes available.
    let ts = range.value()[0]
    let idx = range.getTimeIndex(ts)
    this.data[idx] = [ts, 0, 0]

    return false
  }


}
