// yAxis.js

import Axis from "./axis";
import { precision, round } from "../../utils/number";

export default class yAxis extends Axis {

  isLog = false
  data
  height
  range
  rangeH
  yAxisH
  yAxisRatio
  yAxisPadding = 1.04
  yAxisPrecision

  constructor(chart, isLog=false) {
    super(chart)
    this.data = super.data
    this.range = super.range
    this.height = super.height

    this.isLog = isLog
    if (isLog) this.yAxisLog()
    else this.yAxisRangeBounds()
  }

  yAxisRangeBounds() {
    this.rangeH = this.range.height * this.yAxisPadding
    this.yAxisRatio = this.height / this.range.height
    this.yAxisPrecision = this.yAxisCalcPrecision
  }

  yAxisLog() {
    
  }

  yAxisCalcPrecision() {
    let integerCnt = super.numDigits(this.range.priceMax)
    // let decimalCnt = super.precision(this.range.priceMax)
    return super.yDigits - integerCnt
  }

  /**
   * return canvas y co-ordinate
   * @param {number} dataY - chart price or offchart indicator y data
   * @return {number}  
   * @memberof yAxis
   */
  yPos(dataY) {
    let height = this.range.priceMax - dataY
    let yPos = height * this.yAxisRatio
    return yPos
  }
}
