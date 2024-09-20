// EMA.js
// Exponential Moving Average
// https://hackape.github.io/talib.js/modules/_index_.html#ema
// https://www.investopedia.com/terms/e/ema.asp

import Indicator from "../components/overlays/indicator"
import { EMA as talibAPI } from "../definitions/talib-api";

let nameShort = "EMA"
let nameLong = 'Exponential Moving Average'
 
 export default class EMA extends Indicator {

  get name() { return nameLong }
  shortName = nameShort
  libName = nameShort
  definition = {
    input: {
      inReal: [], 
      timePeriod: 20 // 30
    },
    output: {
      output: [],
    },
    meta: {
      input: {
        timePeriod: {
          entry: 'timePeriod',
          label: 'Period',
          type: 'number',
          value: 5,
          // "data-oldval": 5,
          default: 30,
          min: '3',
          title: `Number of time units to use in calculation`,
          $function:
            this.configDialogue.provideEventListeners("#Period", 
            [{
              event: "change", 
              fn: (e)=>{
              console.log(`#Period = ${e.target.value}`)
              }
            }]
          )
        }
      }
    }
  }

  precision = 2
  checkParamCount = false
  scaleOverlay = false

  static nameShort = nameShort
  static nameLong = nameLong
  static version = "1.0"
  static inCnt = 0
  static primaryPane = true
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ]
  static defaultStyle = {
    output: {
      colour: {value: "#C80"},
      width: {value: 1},
      dash: {value: []},
    },
  }


  /**
   * Creates an instance of EMA.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof EMA
   */
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    
    super(target, xAxis, yAxis, config, parent, params)

    EMA.inCnt++

    this.init(talibAPI)
  }
  
}

