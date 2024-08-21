// DMI.js
// Directional Movement Index

import Indicator from "../components/overlays/indicator"
import { YAXIS_PADDING, YAXIS_TYPES } from "../definitions/chart";

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
    "DI+": {
      colour: {value: "#0f0"},
      width: {value: 1},
      dash: {value: []},
    },
    "DI-": {
      colour: {value: "#f00"},
      width: {value: 1},
      dash: {value: []},
    },
    "ADX": {
      colour: {value: "#00f"},
      width: {value: 1},
      dash: {value: []},
    },
  }
  
  #precision = 2

  get name() {return "Directional Movement Index" }
  shortName = "DMI"
  scaleOverlay = false


  definition = {
    input: {
      inReal: [], 
      timePeriod: 20 // 5
    },
    output: {
      output: [],
    },
    meta: {
      output: [
        {name: "DI+", type: "custom", plot: "line"},
        {name: "DI-", type: "custom", plot: "line"},
        {name: "ADX", type: "custom", plot: "line"},
      ],
      outputOrder: ["DMI+", "DMI-", "ADX"],
      outputLegend: {
        "DI+": {labelStr: "DI+", label: true, value: true},
        "DI-": {labelStr: "DI-", label: true, value: true},
        "ADX": {labelStr: "ADX", label: true, value: true},
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

  get data() { return this.overlay.data }
  get overlayData() { return this.overlay.data }

  calcIndicator(indicator, params={}, range=this.range) {
    let DIPlusDef= {input: { timePeriod: 14}, output: {output: []}}
    let DIMinusDef = {input: { timePeriod: 14}, output: {output: []}}
    let ADXDef = {input: { timePeriod: 14}, output: {output: []}}

    let result1 = super.calcIndicator("PLUS_DI", params, range, DIPlusDef)
    let result2 = super.calcIndicator("MINUS_DI", params, range, DIMinusDef)
    let result3 = super.calcIndicator("ADX", params, range, ADXDef)

    if (!result1 && !result2 && !result3) return false

    for (let i=0; i<result1.length; i++) {
      result1[i][2] = result2[i][1]
      result1[i][3] = result3[i][1]
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
