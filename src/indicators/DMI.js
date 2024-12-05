// DMI.js
// Directional Movement Index

import Indicator from "../components/overlays/indicator"
import { YAXIS_PADDING, YAXIS_TYPE } from "../definitions/chart";
import { limit } from "../utils/number";

let nameShort = "DMI"
let nameLong = 'Average Directional Movement Index'


/**
 * custom indicator class
 */
export default class DMI extends Indicator {

  static nameShort = nameShort
  static nameLong = nameLong
  static version = "1.0"
  static inCnt = 0
  static primaryPane = false
  static scale = YAXIS_TYPE.relative
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
  static timePeriodMultiplier = true
  
  #precision = 2

  get name() { return nameLong }
  shortName = nameShort
  // libName = nameShort
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
  }

  get data() { return this.overlay.data }
  get overlayData() { return this.overlay.data }

  calcIndicator(indicator, params={}, range=this.range) {
    let DIPlusDef = {input: { timePeriod: 14}, output: {output: []}}
    let DIMinusDef = {input: { timePeriod: 14}, output: {output: []}}
    let ADXDef = {input: { timePeriod: 14}, output: {output: []}}

    return new Promise( (resolve, reject) => {
      let promises = [
        super.calcIndicator("PLUS_DI", params, range), // , DIPlusDef)
        super.calcIndicator("MINUS_DI", params, range), //, DIMinusDef)
        super.calcIndicator("ADX", params, range) //, ADXDef)
      ]
      Promise.all(promises).then( (result) => {
        let [result1, result2, result3] = [...result]
  
        if (!result1 && !result2 && !result3) reject(false)
    
        for (let i=0; i<result1.length; i++) {
          result1[i][2] = result2[i][1]
          result1[i][3] = result3[i][1]
        }
        resolve(result1)      
      })
    })
  }

  calcIndicatorStream (indicator, params={}, range=this.range) {
    console.log("ADX", params)

    let promises = [
      (!this.noCalc("PLUS_DI", range)) ? this.TALib["PLUS_DI"](params).output : false,
      (!this.noCalc("MINUS_DI", range)) ? this.TALib["MINUS_DI"](params).output : false,
      (!this.noCalc("ADX", range)) ? this.TALib["ADX"](params).output : false
    ]
    Promise.all(promises).then(  (result) => {
      let [result1, result2, result3] = [...result]

      if (!result1 && !result2 && !result3) return false
  
      let time = range.value()[0]
      // let value = this.formatValue(entry)
  
      return [time, result1[0], result2[0], result3[0]]
    })
  }

  draw(range=this.range) {
    super.draw(range)
  }
}
