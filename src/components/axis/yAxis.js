// yAxis.js

import Axis from "./axis";
import { log10, precision, round } from "../../utils/number";
import { isNumber } from "../../utils/typeChecks";

import { 
  PRICEDIGITS, 
  YAXIS_STEP,
  YAXIS_TYPES
} from "../../definitions/chart";
import { YAxisStyle } from "../../definitions/style";

export default class yAxis extends Axis {

  #data
  #range
  #parent
  #yAxisType = YAXIS_TYPES[0]  // default, log, percent
  #yAxisPadding = 1.04
  #yAxisStep = YAXIS_STEP
  #yAxisDigits = PRICEDIGITS
  #yAxisRound = 3
  #yAxisTicks = 3
  #yAxisGrads

  constructor(parent, chart, yAxisType=YAXIS_TYPES[0]) {
    super(chart)
    this.#data = super.data
    this.#range = super.range
    this.#parent = parent 
  }

  get data() { return this.#data }
  get range() { return this.#range }
  get height() { return super.height }
  get rangeH() { return this.range.height * this.yAxisPadding }
  get yAxisRatio() { return this.height / this.range.height }
  get yAxisPrecision() { return this.yAxisCalcPrecision }
  set yAxisPadding(p) { this.#yAxisPadding = p }
  get yAxisPadding() { return this.#yAxisPadding }
  set yAxisType(t) { this.#yAxisType = YAXIS_TYPES.includes(t) ? t : YAXIS_TYPES[0] }
  get yAxisType() { return this.#yAxisType }
  set yAxisStep(s) { this.#yAxisStep = isNumber(s) ? s : YAXIS_STEP }
  get yAxisStep() { return this.#yAxisStep }
  set yAxisTicks(t) { this.yAxisTicks = isNumber(t) ? t : 0 }
  get yAxisTicks() { return this.#yAxisTicks }
  get yAxisGrads() { return this.#yAxisGrads }

  yAxisRangeBounds() {

  }

  yAxisLog() {
    
  }

  yAxisCntDigits(value) {
    return super.countDigits(value)
  }

  yAxisCalcPrecision() {
    let integerCnt = super.numDigits(this.range.priceMax)
    // let decimalCnt = super.precision(this.range.priceMax)
    return super.yDigits - integerCnt
  }

  yAxisCursor() {

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
        return this.$2Pixel(log10(dataY))
        break;
      default :
        return this.$2Pixel(dataY)
    }
  }

  $2Pixel(dataY) {
    let height = dataY - this.range.priceMin
    let yPos = height * this.yAxisRatio
    return yPos
  }

  pixel2$(y) {
    let ratio = this.height / y
    let adjust = this.#range.height * ratio
    return this.#range.priceMax - adjust
  }

  calcGradations() {
    // const yAxisMid = this.height * 0.5
    const grad = Math.floor(this.height / this.#yAxisStep)

    const rangeMid = (this.range.priceMax + this.range.priceMin) * 0.5
      let digits = this.countDigits(rangeMid)
    const scaleMid = this.niceValue(digits)
    const step = (this.#range.priceMax - scaleMid) / grad

    const scaleGrads = [[scaleMid, this.$2Pixel(scaleMid), digits]]

    let upper = scaleMid + step,
        nice, 
        entry;
    while (upper <= this.#range.priceMax) {
      digits = this.countDigits(upper)
      nice = this.niceValue(digits)
      entry = [nice, this.$2Pixel(nice), digits]
      scaleGrads.unshift(entry)
      upper += step
    }
    let lower = scaleMid - step
    while (lower >= this.#range.priceMin) {
      digits = this.countDigits(lower)
      nice = this.niceValue(digits)
      entry = [nice, this.$2Pixel(nice), digits]
      scaleGrads.push(entry)
      lower -= step
    }
    return scaleGrads
  }

  niceValue(digits) {
    if (digits.integers) {
      let x = digits.integers - this.#yAxisRound
      if (x > 0) {
        let factor = Math.pow(10, x)
        return Math.floor(digits.value / factor) * factor
      }
      else {

      }
    }
    else {

    }
  }

  draw() {
    this.#yAxisGrads = this.calcGradations()
    this.drawTicks()
    this.drawLabels()
    this.drawOverlays()
  }

  drawTicks() {
    const grads = this.#yAxisGrads
    const ctx = this.#parent.layerTicks.scene.context
    if (this.yAxisTicks) {
      ctx.save();
      ctx.strokeStyle = YAxisStyle.COLOUR_TICK
      ctx.fillStyle = YAxisStyle.COLOUR_TICK
      ctx.font = YAxisStyle.FONT_LABEL
      for (let tick of grads) {
        ctx.fillText(tick[0], this.yAxisTicks + 5, tick[1] + 4)

        ctx.beginPath()
        ctx.moveTo(0, tick[1])
        ctx.lineTo(this.yAxisTicks, tick[1])
        ctx.stroke()
      }
      ctx.restore();
    }
  }

  drawLabels() {
    const grads = this.#yAxisGrads

  }

  drawOverlays() {
    const grads = this.#yAxisGrads

  }


}
