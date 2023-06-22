// Volume.js

import Indicator from "../components/overlays/indicator"
import { 
  YAXIS_TYPES
} from "../definitions/chart";
import { isBoolean } from "../utils/typeChecks";

/**
 * Volume
 * @export
 * @class Volume
 * @extends {indicator}
 */
export default class Volume extends Indicator {
  #ID
  #name = 'Relative Strength Index'
  #shortName = 'RSI'
  #params
  #onChart = true
  #checkParamCount = false
  #scaleOverlay = true
  #plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]
  #defaultStyle = {

  }
  #style = {}

  
  // static onChart = "both"
  // static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent


  /**
   * Creates an instance of Volume.
   * @param {object} target - canvas scene
   * @param {object} xAxis - timeline axis instance
   * @param {object} yAxis - scale axis instance
   * @param {object} config - theme / styling
   * @param {object} parent - (on/off)chart pane instance that hosts the indicator
   * @param {object} params - contains minimum of overlay instance
   * @memberof Volume
   */
  // constructor (target, overlay, xAxis, yAxis, config) {

  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {

    super (target, xAxis, yAxis, config, parent, params) 

    const overlay = params.overlay
  }

  get onChart() { return "both" }
  get defaultStyle() { return this.#defaultStyle }


}