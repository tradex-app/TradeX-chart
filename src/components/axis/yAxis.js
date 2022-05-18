// yAxis.js

import Axis from "./axis";
import { precision, round } from "../../utils/number";

export default class yAxis extends Axis {

  #data
  #range
  #yAxisType = "default"  // default, log, percent
  #yAxisPadding = 1.04

  constructor(chart, yAxisType="default") {
    super(chart)
    this.#data = super.data
    this.#range = super.range
  }

  get data() { return this.#data }
  get range() { return this.#range }
  get height() { return super.height }
  get rangeH() { return this.range.height * this.yAxisPadding }
  get yAxisRatio() { return this.height / this.range.height }
  get yAxisPrecision() { return this.yAxisCalcPrecision }
  set yAxisPadding(p) { this.#yAxisPadding = p }
  get yAxisPadding() { return this.#yAxisPadding }
  set yAxisType(t) { this.#yAxisType = t }
  get yAxisType() { return this.#yAxisType }

  yAxisRangeBounds() {

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
    switch(this.yAxisType) {
      case "percentage" :
        break;
      case "log" :
        break;
      default :
      let height = dataY - this.range.priceMin
      let yPos = height * this.yAxisRatio
      return yPos
    }
  }
}
