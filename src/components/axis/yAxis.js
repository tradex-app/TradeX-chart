// yAxis.js

import Axis from "./axis";
import { log10, power, precision, round } from "../../utils/number";
import { isNumber } from "../../utils/typeChecks";

import { 
  PRICEDIGITS, 
  YAXIS_STEP,
  YAXIS_TYPES
} from "../../definitions/chart";
import { YAxisStyle } from "../../definitions/style";

export default class yAxis extends Axis {

  #parent
  #chart

  #yAxisType = YAXIS_TYPES[0]  // default, log, percent
  #yAxisPadding = 1.04
  #yAxisStep = YAXIS_STEP
  #yAxisDigits = PRICEDIGITS
  #yAxisRound = 3
  #yAxisTicks = 3
  #yAxisGrads

  constructor(parent, chart, yAxisType=YAXIS_TYPES[0]) {
    super()
    this.#chart = chart
    this.#parent = parent 
    this.yAxisType = yAxisType
  }

  get chart() { return this.#chart }
  get data() { return this.chart.data }
  get range() { return this.#chart.mediator.api.core.range }
  get height() { return this.chart.height }
  get rangeH() { return this.range.height * this.yAxisPadding }
  get yAxisRatio() { return this.height / this.range.height }
  get yAxisPrecision() { return this.yAxisCalcPrecision }
  set yAxisPadding(p) { this.#yAxisPadding = p }
  get yAxisPadding() { return this.#yAxisPadding }
  set yAxisType(t) { this.#yAxisType = YAXIS_TYPES.includes(t) ? t : YAXIS_TYPES[0] }
  get yAxisType() { return this.#yAxisType }
  set yAxisStep(s) { this.#yAxisStep = isNumber(s) ? s : YAXIS_STEP }
  get yAxisStep() { return this.#yAxisStep }
  set yAxisTicks(t) { this.#yAxisTicks = isNumber(t) ? t : 0 }
  get yAxisTicks() { return this.#yAxisTicks }
  get yAxisGrads() { return this.#yAxisGrads }

  calcHeight() {
    let api = this.#parent.mediator.api
    return api.height - api.utilsW - api.scaleW
  }

  yAxisRangeBounds() {

  }

  yAxisLog() {
    
  }

  yAxisCntDigits(value) {
    return this.countDigits(value)
  }

  yAxisCalcPrecision() {
    let integerCnt = this.numDigits(this.range.priceMax)
    // let decimalCnt = this.precision(this.range.priceMax)
    return this.yDigits - integerCnt
  }

  yAxisCursor() {

  }

  /**
   * return canvas y co-ordinate
   * handles Y Axis modes: default, log, percentate
   * @param {number} yData - chart price or offchart indicator y data
   * @return {number}  
   * @memberof yAxis
   */
  yPos(yData) {
    switch(this.yAxisType) {
      case "percent" :
        return this.p100toPixel(yData)
        break;
      case "log" :
        return this.$2Pixel(log10(yData))
        break;
      default :
        return this.$2Pixel(yData)
    }
  }

  /**
   * return chart price
   * handles Y Axis modes: default, log, percentate
   * @param {number} y
   * @memberof yAxis
   */
  yPos2Price(y) {
    return this.pixel2$(y)
  }

  $2Pixel(yData) {
    let height = yData - this.range.priceMin
    let yPos = this.height - (height * this.yAxisRatio)
    return yPos
  }

  pixel2$(y) {
    let ratio = (this.height - y) / this.height
    let adjust = this.range.height * ratio
    return this.range.priceMin + adjust
  }

  p100toPixel(yData) {
    return this.height * yData / 100
  }

  calcGradations() {

    switch (this.yAxisType) {
      case "percent":
        return this.gradations(100, 0, false)
        break;
      default:
        return this.gradations(this.range.priceMax, this.range.priceMin)
        break;
    }
  }

  gradations(max, min, decimals=true) {
    const rangeMid = (max + min) * 0.5
    const midH = this.height * 0.5
    let digits = this.countDigits(rangeMid)
    const scaleMid = this.niceValue(digits, decimals)

    const scaleGrads = [[scaleMid, round(midH), digits]]

    let grad = round(power(log10(midH), 2) - 1),
        step$ = (max - scaleMid) / grad,
        stepP = midH / grad,
        upper = scaleMid + step$,
        pos = midH - stepP,
        nice, 
        entry;
    while (upper <= max) {
      digits = this.countDigits(upper)
      nice = this.niceValue(digits, decimals)
      entry = [nice, round(pos), digits]
      scaleGrads.unshift(entry)
      upper += step$
      pos -= stepP
    }
    let lower = scaleMid - step$
        pos = midH + stepP
    while (lower >= min) {
      digits = this.countDigits(lower)
      nice = this.niceValue(digits, decimals)
      entry = [nice, round(pos), digits]
      scaleGrads.push(entry)
      lower -= step$
      pos += stepP
    }
    return scaleGrads
  }

  niceValue(digits, decimals=true) {
    if (digits.integers) {
      let x = digits.integers - this.#yAxisRound
      if (x > 0) {
        let factor = power(10, x)
        return Math.floor(digits.value / factor) * factor
      }
      else {
        if (!decimals) return Math.floor(digits.value)
        x = (x -1) * -1
        return round(digits.value, x)
      }
    }
    else {
      let y = digits.decimals - this.#yAxisRound
      y = (y -1) * -1
      return round(digits.value, y)
    }
  }

  limitPrecision(digits) {
    let value = digits.value,
        cnt = this.#yAxisDigits - digits.total,
        cnt2 = 4 - digits.integers

    if (cnt < 1) {
      let decimals = digits.decimals + cnt
      value = Number.parseFloat(value).toFixed(decimals)
    }
    else if (cnt2 < 1) {
      let decimals = 2 - cnt2
      value = Number.parseFloat(value).toFixed(decimals)
    }

    return value
  }

  draw() {
    this.#yAxisGrads = this.calcGradations()
    this.drawLabels()
    this.drawOverlays()
  }

  drawLabels() {
    this.#parent.layerLabels.scene.clear()

    const grads = this.#yAxisGrads
    const ctx = this.#parent.layerLabels.scene.context
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

  drawOverlays() {
    this.#parent.layerOverlays.scene.clear()

    const grads = this.#yAxisGrads
    const ctx = this.#parent.layerOverlays.scene.context
    ctx.save();

// draw overlays

    ctx.restore();
  }


}
