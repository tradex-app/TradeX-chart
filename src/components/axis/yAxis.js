// yAxis.js

import Axis from "./axis";
import { bRound, limit, log10, power, precision, round } from "../../utils/number";
import { isNumber } from "../../utils/typeChecks";

import { 
  PRICEDIGITS, 
  YAXIS_STEP,
  YAXIS_GRID,
  YAXIS_TYPES
} from "../../definitions/chart";
import { time_start } from "../../utils/time";

export default class yAxis extends Axis {

  #source
  #parent
  #chart
  #core

  #yAxisType = YAXIS_TYPES[0]  // default, log, percent
  #mode = "automatic"
  #transform = {
    automatic: {
      get max() { return this.range?.valueMax },
      get min() { return this.range?.valueMin },
      get mid() { return this.range?.valueMin + (this.range?.valueDiff * 0.5) },
      get diff() { return this.range?.valueDiff },
      get zoom() { return 1 },
      get offset() { return 0 },
      range: null
    },
    manual: {
      max: 1,
      min: 0,
      mid: 0.5,
      diff: 1,
      zoom: 1,
      offset: 0
    }
  }
  #yAxisPadding = 1.04
  #yAxisStep = YAXIS_STEP
  #yAxisDigits = PRICEDIGITS
  #yAxisTicks = 3
  #yAxisGrads

  #range

  constructor(parent, chart, yAxisType=YAXIS_TYPES[0], range) {
    super(parent)
    this.#chart = chart
    this.#parent = parent
    this.#source = parent.parent
    this.yAxisType = yAxisType

    range = (range) ? range : this.core.range
    this.setRange(range)
  }

  get chart() { return this.#chart }
  get range() { return this.#range }
  get height() { return this.chart.height }
  get rangeH() { return this.#range.diff * this.yAxisPadding }
  get yAxisRatio() { return this.getYAxisRatio() }
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
  set mode(m) { this.setMode(m) }
  get mode() { return this.#mode }
  set offset(o) { this.setOffset(o) }
  get offset() { return this.#range.offset }
  set zoom(z) { this.setZoom(z) }
  get zoom() { return this.#range.zoom }

  getYAxisRatio() {
    // const diff = (this.#mode == "automatic") ? this.#range.diff : this.#transform.diff
    return this.height / this.#range.diff
  }

  yAxisRangeBounds() {

  }

  yAxisLog() {
    
  }

  yAxisCntDigits(value) {
    return this.countDigits(value)
  }

  yAxisCalcPrecision() {
    let integerCnt = this.numDigits(this.#range.max)
    // let decimalCnt = this.precision(this.#range.max)
    return this.yDigits - integerCnt
  }

  yAxisCursor() {

  }

  /**
   * return canvas y co-ordinate
   * handles Y Axis modes: default, log, percentate
   * @param {number} y - chart price or secondary indicator y data
   * @returns {number}  
   * @memberof yAxis
   */
  yPos(y) {
    switch(this.yAxisType) {
      case "percent" : return bRound(this.p100toPixel(y))
      case "log" : return bRound(this.$2Pixel(log10(y)))
      default : return bRound(this.$2Pixel(y))
    }
  }

  /**
   * return chart price
   * handles Y Axis modes: default, log, percentage
   * @param {number} y
   * @returns {number}
   * @memberof yAxis
   */
  yPos2Price(y) {
    return this.pixel2$(y)
  }

  /**
   * convert price (YAxis value) to y pixel position relative top left (0,0)
   * @param {number} y - price
   * @returns {number} - y pixel position
   * @memberof yAxis
   */
  $2Pixel(y) {
    const height = y - this.#range.min
    const yPos = this.height - (height * this.yAxisRatio)
    return yPos
  }

  /**
   * convert last stream value to y pixel position relative top left (0,0)
   * @param {number} y - last stream value 
   * @returns {number} - y pixel position
   * @memberof yAxis
   */
  lastYData2Pixel(y) {
    let height = y - this.core.stream.lastPriceMin
    let yPos = this.height - (height * this.yAxisRatio)
    return yPos
  }

  /**
   * convert pixel position to price (YAxis value)
   * @param {number} y - pixel position relative top left (0,0)
   * @returns {number} - price (YAxis value)
   * @memberof yAxis
   */
  pixel2$(y) {
    let ratio = (this.height - y) / this.height
    let adjust = this.#range.diff * ratio
    return this.#range.min + adjust
  }

  /**
   * convert percentage scale to y pixel position relative top left (0,0)
   * @param {number} y - percentage
   * @returns {number} - y pixel position
   * @memberof yAxis
   */
  p100toPixel(y) {
      let ratio = this.height / this.#range.diff
      return (y - this.#range.max) * -1 * ratio
  }

  yAxisTransform() {

  }

  /**
   * set YAxis mode - automatic or manual positioning and scaling
   * @param {string} m - "automatic" or "manual"
   * @returns {boolean} - success or failure
   * @memberof yAxis
   */
  setMode(m) {
    if (!["automatic","manual"].includes(m)) return false

    const t = this.#transform
    if (this.mode == "automatic" && m == "manual") {
      t.manual.zoom = 0
      t.manual.max = this.#range.valueMax
      t.manual.min = this.#range.valueMin
      this.#mode = m
    }
    else if (this.mode == "manual" && m == "automatic") {
      t.manual.zoom = 0
      this.#mode = m
    }
    return true
  }

  setOffset(o) {
    if (!isNumber(o) || o == 0 || this.#mode !== "manual") return false

    const t = this.#transform
    let max = this.pixel2$(o * -1)
    let min = this.pixel2$(this.height - o)
    let delta = max - min;
    t.manual.min = min
    t.manual.max = max
    t.manual.mid = (delta) / 2
    t.manual.diff = delta
    t.manual.zoom = 0
  }

  setZoom(z) {
    if (!isNumber(z) || this.#mode !== "manual") return false

    const t = this.#transform
    // const r = (z == 0) ? 0 : z / this.height

      let min = t.manual.min
      let max = t.manual.max
    const delta = max - min;
    const delta10P = delta * 0.01;
    const change = z * delta10P;
          min -= change;
          max += change;
    
    // if (max < min || min <= delta)  return
    if (max < min || min <= Infinity * -1 || max >= Infinity)  return

    t.manual.max =  max
    t.manual.min = min // (min >= 0.001)? min : 0.001
    t.manual.mid = (delta) / 2
    t.manual.diff = delta
    t.manual.zoom = change

    this.calcGradations()
  }

  setRange(range) {
    this.#transform.automatic.range = range
    this.#range = new Proxy(range, {
      get: (obj, prop) => {
        const m = this.#mode
        const t = this.#transform
        switch (prop) {
          case "max": return t[m][prop] // "valueMax"
          case "min":  return t[m][prop] // "valueMin"
          case "mid": return t[m][prop] // "priceMid"
          case "diff": return t[m][prop] // "valueDiff"
          case "zoom": return t[m][prop]
          case "offset": return t[m][prop]
          default: return obj[prop]
        }
      }
    })
  }

  calcGradations() {
    let max, min, off;
    switch (this.yAxisType) {
      case "percent":
        max = (this.#range.max > 0) ? this.#range.max : 100
        min = (this.#range.min > 0) ? this.#range.min : 0
        off = this.#range.offset
        this.#yAxisGrads = this.gradations(max + off, min + off)
        break;
      default:
        max = (this.#range.max > 0) ? this.#range.max : 1
        min = (this.#range.min > 0) ? this.#range.min : 0
        off = this.#range.offset
        this.#yAxisGrads = this.gradations(max + off, min + off)
        break;
    }
    return this.#yAxisGrads
  }

  gradations(max, min, decimals=true, fixed=false) {
      let digits,
          rangeH,
          yGridSize;
    const scaleGrads = [];

    // roughly divide the yRange into cells
    rangeH = max - min
    rangeH = (this.rangeH > 0) ? this.rangeH : 1
    yGridSize = (rangeH)/(this.height / (this.core.theme.yAxis.fontSize * 1.75));

    // try to find a nice number to round to
    let niceNumber = Math.pow( 10 , Math.ceil( Math.log10( yGridSize ) ) );
    if ( yGridSize < 0.25 * niceNumber ) niceNumber = 0.25 * niceNumber;
    else if ( yGridSize < 0.5 * niceNumber ) niceNumber = 0.5 * niceNumber;

    // find next largest nice number above yStart
    var yStartRoundNumber = Math.ceil( min/niceNumber ) * niceNumber;
    // find next lowest nice number below yEnd
    var yEndRoundNumber = Math.floor( max/niceNumber ) * niceNumber;

    let pos = this.height,
        step$ = (yEndRoundNumber - yStartRoundNumber) / niceNumber,
        stepP = this.height / step$,
        step = this.countDigits(step$),
        nice;

    for ( var y = yStartRoundNumber ; y <= yEndRoundNumber ; y += niceNumber )
    {
      digits = this.countDigits(y)
      nice = this.niceValue(digits, decimals, step)
      scaleGrads.push([nice, round(pos), digits])

      pos -= stepP
    }

    // remove first or last grads if too close to the edge
    // if (this.#mode !== "manual" && scaleGrads.length !== 0) {

    //   const theme = this.core.theme.yAxis
    //   if (scaleGrads.slice(-1)[0][1] <= theme.fontSize * 0.1) {
    //     scaleGrads.pop()
    //   }

    //   if (scaleGrads[0][1] >= this.height - (theme.fontSize * 0.1)) {
    //     scaleGrads.shift()
    //   }
    // }

    return scaleGrads
  }

  niceValue(digits, decimals=true, step) {
    if (digits.integers) {
      let x = step.integers
      if (x - 2 > 0) {
        let factor = power(10, x - 2)
        return Math.floor(digits.value / factor) * factor
      }
      else {
        if (!decimals) return Math.floor(digits.value)
        x = (x > 0)? x : x * -1
        return round(digits.value, x)
      }
    }
    else {
      let y = digits.decimals - step.decimals
      y = (y > 0)? y : y * -1
      return round(digits.value, y)
    }
  }

  limitPrecision(digits) {
    let value = digits.value,
        cnt = this.#yAxisDigits - digits.total,
        cnt2 = 4 - digits.integers

    if (cnt < 1) {
      let decimals = limit(digits.decimals + cnt, 0, 100)
      value = Number.parseFloat(value).toFixed(decimals)
    }
    else if (cnt2 < 1) {
      let decimals = 2 - cnt2
      value = Number.parseFloat(value).toFixed(decimals)
    }

    return value
  }

}
