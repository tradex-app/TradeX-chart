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

const p100Padding = 1.2

export default class yAxis extends Axis {

  #source
  #parent
  #chart

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
  #step

  #range

  constructor(parent, chart, yAxisType=YAXIS_TYPES[0], range) {
    super(parent)
    this.#chart = chart
    this.#parent = parent
    this.#source = parent.parent
    this.yAxisType = yAxisType

    // use either chart.localRange or core.range
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
  get yAxisDigits() { return this.parent.digitCnt }
  get step() { return this.#step }
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
      let max = this.#range.max //* p100Padding
      let ratio = this.height / (max - this.#range.min)
      let padding = Math.floor((max - this.#range.max) ) //* 0.5 )
      return ((y - max) * -1 * ratio) // - padding
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
      this.core.emit("yaxis_setmode", {mode: m, axis: this})
    }
    else if (this.mode == "manual" && m == "automatic") {
      t.manual.zoom = 0
      this.#mode = m
      this.core.emit("yaxis_setmode", {mode: m, axis: this})
    }
    return true
  }

  // manual Y axis positioning
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

  /**
   * set Y-Axis range
   * use either chart.localRange or core.range
   * @param {Object} range
   * @memberof yAxis
   */
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
        max = (this.#range.max > -10) ? this.#range.max : 110
        min = (this.#range.min > -10) ? this.#range.min : -10
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

  gradations(max, min, decimals=true) {
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
        step = this.countDigits(niceNumber),
        nice;
    this.#step = step

    for ( var y = yStartRoundNumber ; y <= yEndRoundNumber ; y += niceNumber )
    {
      digits = this.countDigits(y)
      nice = this.limitPrecision(digits, step)
      pos = this.yPos(nice)
      scaleGrads.push([nice, pos, digits])
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

  /**
   * 
   * REMOVE??? Obsolete
   * 
   * format Y axis labels (values)
   * @param {object} digits - {digits, decimals}
   * @param {object} step - {digits, decimals}
   * @return {number}  
   */
  niceValue(digits, step=this.#step) {
    let x = step.integers,
        d = step.decimals,
        v = digits.value;
    if (digits.integers > 1) {
      if (x - 2 > 0) {
        let factor = power(10, x - 2)
        return Math.floor(v / factor) * factor
      }
      else {
        return (d == 0) ? Math.floor(v) : round(v, d)
      }
    }
    else {
      return (d == 0) ? 0 : round(v, d)
    }
  }

  /**
   * truncate price to fit on Scale
   * @param {object} digits
   * @return {number}  
   * @memberof yAxis
   */
  limitPrecision(digits) {
    let {sign: s, integers: i, decimals: d, value: v} = digits
    let n = this.yAxisDigits - 1,
        x = `${v}`,
        r = "",
        c = 0,
        f = 0;
    // sign
    s = (s) ? 0 : 1
    if (s > 0) {
      r += "-"
      c++
    }
    // integers
    if (i == 0) {
      r += "0"
      c++
    }
    else {
      r += x.slice(c,i)
      c += i
    }
    // decimals
    if (c + 1 < n && d > 0) {
      r += `${x.slice(c)}`
      f = n - ( c + 1)
      f = (d < f) ? d : f
      r = Number.parseFloat(r).toFixed(f)
    }
    return r
  }

}
