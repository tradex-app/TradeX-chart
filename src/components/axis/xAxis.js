// xAxis.js

import Axis from "./axis";

export default class xAxis extends Axis {

  data
  width
  range
  rangeW
  xAxisW
  xAxisRatio
  xAxisOffset

  constructor(chart) {
    super(chart)
    this.data = super.data
    this.range = super.range
    this.width = super.width

    this.rangeW = this.range.width
    this.xAxisRatio = this.width / this.range.Length
  }

  /**
 * return canvas x co-ordinate
 * @param {number} dataX - chart time
 * @return {number}  
 * @memberof xAxis
 */
  xPos(time) {
    let width = this.range.timeMax - time
    let xPos = width * this.xAxisRatio
    return xPos
  }
}
