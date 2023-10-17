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
  #primaryPane = true
  #checkParamCount = false
  #scaleOverlay = true
  #plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]
  #defaultStyle = {

  }
  #style = {}

  
  // static primaryPane = "both"
  // static scale = YAXIS_TYPES[1] // YAXIS_TYPES - percent


  /**
   * Creates an instance of Volume.
   * @param {Object} target - canvas scene
   * @param {Object} xAxis - timeline axis instance
   * @param {Object} yAxis - scale axis instance
   * @param {Object} config - theme / styling
   * @param {Object} parent - chart pane instance that hosts the indicator
   * @param {Object} params - contains minimum of overlay instance
   * @memberof Volume
   */
  // constructor (target, overlay, xAxis, yAxis, config) {

  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {

    super (target, xAxis, yAxis, config, parent, params) 

    const overlay = params.overlay
  }

  get primaryPane() { return "both" }
  get defaultStyle() { return this.#defaultStyle }

  draw() {
    // no update required
    if (!this.dthis.overlay.data.length < 2) return

  }
}