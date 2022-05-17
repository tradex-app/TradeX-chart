// yAxis.js

import Axis from "./axis";
import { precision, round } from "../../utils/number";

export default class yAxis extends Axis {

  #isLog = false
  #data
  #range
  #yAxisPadding = 1.04

  constructor(chart, isLog=false) {
    super(chart)
    this.#data = super.data
    this.#range = super.range

    this.#isLog = isLog
    if (isLog) this.yAxisLog()
    else this.yAxisRangeBounds()
  }

  get data() { return this.#data }
  get range() { return this.#range }
  get height() { return super.height }
  get rangeH() { return this.range.height * this.yAxisPadding }
  get yAxisRatio() { return this.height / this.range.height }
  get yAxisPrecision() { return this.yAxisCalcPrecision }
  set yAxisPadding(p) { this.#yAxisPadding = p }
  get yAxisPadding() { return this.#yAxisPadding }

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
    let height = this.range.priceMax - dataY
    let yPos = height * this.yAxisRatio
    return yPos
  }
}
