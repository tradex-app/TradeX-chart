// Volume.js

import indicator from "../components/overlays/indicator"
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
export default class Volume extends indicator {
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

  // YAXIS_TYPES - percent
  static scale = YAXIS_TYPES[1]


  /**
   * Creates an instance of Volume.
   * @param {object} target - canvas scene
   * @param {object} overlay - data for the overlay
   * @param {instance} xAxis - timeline axis
   * @param {instance} yAxis - scale axis
   * @param {object} config - theme / styling
   * @memberof Volume
   */
  // constructor (target, overlay, xAxis, yAxis, config) {

  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {

    super (target, xAxis, yAxis, config, parent, params) 

    const overlay = params.overlay
  }

}