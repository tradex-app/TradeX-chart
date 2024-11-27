// yAxis.js

import Axis from "./axis";
import { bRound, countDigits, log10, limitPrecision, numDigits } from "../../utils/number";
import { isNumber } from "../../utils/typeChecks";
import { 
  YAXIS_STEP,
  YAXIS_TYPE
} from "../../definitions/chart";
import { YAxisFontSizeFactor } from "../../definitions/style";
import { doStructuredClone } from "../../utils/utilities";

const p100Padding = 1.2

export default class yAxis extends Axis {

  #parent
  #source
  #chart
  #yAxisType = YAXIS_TYPE.percent
  #mode = "automatic"
  #transform = {
    automatic: {
      get max() { return this.range?.valueMax },
      get min() { return this.range?.valueMin },
      get mid() { return this.range?.valueMin + (this.range?.valueDiff * 0.5) },
      get diff() { return this.range?.valueDiff },
      get zoom() { return 1 },
      get offset() { return 0 },
      get secondaryMaxMin() { return this.range?.secondaryMaxMin },
      range: null
    },
    manual: {
      max: 1,
      min: 0,
      mid: 0.5,
      diff: 1,
      zoom: 1,
      offset: 0,
      secondaryMaxMin: {}
    }
  }
  #yAxisPadding = 1 //1.04
  #yAxisStep = YAXIS_STEP
  #yAxisTicks = 3
  #yAxisGrads
  #step

  #range

  constructor(parent, chart, yAxisType=YAXIS_TYPE.default, range) {
    super(parent)
    this.#chart = chart
    this.#parent = parent
    this.#source = parent.parent
    this.yAxisType = YAXIS_TYPE.valid(yAxisType)

    // use either chart.localRange or core.range
    if (yAxisType == YAXIS_TYPE.relative)
      range = this.core.range
    else 
      range = (range) ? range : this.core.range
    this.setRange(range)
  }

  get chart() { return this.#chart }
  get range() { return this.#range }
  get height() { return this.chart.height }
  get rangeH() { return this.#range.diff * this.yAxisPadding }
  get yAxisRatio() { return this.getYAxisRatio() }
  get yAxisPrecision() { return this.yAxisCalcPrecision }
  set yAxisPadding(p) { if (isNumber(p) || p != 0) this.#yAxisPadding = p }
  get yAxisPadding() { return this.#yAxisPadding }
  set yAxisType(t) { this.#yAxisType = YAXIS_TYPE.valid(t) }
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
    return this.height / this.#range.diff
  }

  getMaxMinDiff() {
    // default max min
    let max = (this.#range.max > 0) ? this.#range.max : 1,
        min = (this.#range.min > 0) ? this.#range.min : 0,
        chart = this.parent.parent,
        id = chart.view[0]?.id,
        mm = this.range.secondaryMaxMin || {},
        pane = this.#range;
    if (!chart.isPrimary &&
        id in mm) {
          max = mm[id]?.data?.max || 0 //* 1.2
          min = mm[id]?.data?.min || 0 //- (mm[id].data.min * 0.2)
          pane = mm[id]?.data || []
    }
    // account for flat line or zero
    if (max == min) {
      if (max == 0) {
        max = 0.05
        min = -0.05
      }
      else {
        max = max + (max * 0.05)
        min = min + (min * 0.05)
      }
    }
    // add padding
    if (this.mode != "manual") {
      max *= this.#yAxisPadding || 1
      min *= this.#yAxisPadding || 1
    }

    let diff = max - min
    return {max, min, diff, pane}
  }

  yAxisRangeBounds() {

  }

  yAxisLog() {
    
  }

  yAxisCntDigits(value) {
    return countDigits(value)
  }

  yAxisCalcPrecision() {
    let integerCnt = numDigits(this.#range.max)
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
    let val;
    switch(this.yAxisType) {
      case YAXIS_TYPE.relative : val = this.val2Pixel(y); break;
      case YAXIS_TYPE.percent : val = this.p100toPixel(y); break;
      case YAXIS_TYPE.log : val = this.$2Pixel(log10(y)); break;
      default : val = this.$2Pixel(y); break;
    }
    return bRound(val)
  }

  /**
   * convert indicator value to y pixel position relative top left (0,0)
   * @param {number} y
   * @return {number}  
   * @memberof yAxis
   */
  val2Pixel(y) {
    let p,
        chart = this.parent.parent;
    // secondary pane returns pixel value for indicator range
    if (!chart.isPrimary) {
      let h = this.height,
          {min, diff} = this.getMaxMinDiff();
          p = h - (h * ((y - min) / diff))

          if (p < 0 || p > h) {
            let P = p
          }
    }
    // primary pane always returns pixel values for price range
    else {
      p = this.$2Pixel(y)
    }
    // console.log("val2Pixel()", p)
    return p
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
   * convert percentage scale to y pixel position relative top left (0,0)
   * @param {number} y - percentage
   * @returns {number} - y pixel position
   * @memberof yAxis
   */
  p100toPixel(y) {
    // let max = this.#range.max //* p100Padding
    // let ratio = this.height / (max - this.#range.min)
    // // let padding = Math.floor((max - this.#range.max) ) //* 0.5 )
    // return ((y - max) * -1 * ratio) // - padding

    // if (this.mode == "automatic") {
    //   return this.$2Pixel(y)
    // }
    // else {
    //   let diff = this.#range.max - this.#range.min
    //   let delta = this.#range.max - y
    //   return this.val2Pixel(y)
    // }

    return this.$2Pixel(y)

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

  pixel2Val(y) {
    return this.pixel2$(y)
  }

  /**
   * convert pixel position to price (YAxis value)
   * @param {number} y - pixel position relative top left (0,0)
   * @returns {number} - price (YAxis value)
   * @memberof yAxis
   */
  pixel2$(y) {
    let {min, diff} = this.getMaxMinDiff()
    let ratio = (this.height - y) / this.height
    let adjust = diff * ratio
    return min + adjust
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

    let t = this.#transform.manual
    if (this.mode == "automatic" && m == "manual") {
      t.max = this.#range.valueMax
      t.min = this.#range.valueMin
      t.diff = t.max - t.min
      t.zoom = 0
      t.secondaryMaxMin = doStructuredClone(this.#range.secondaryMaxMin)
      this.#mode = m
      this.core.emit("yaxis_setmode", {mode: m, axis: this})
    }
    else if (this.mode == "manual" && m == "automatic") {
      t.zoom = 0
      this.#mode = m
      this.core.emit("yaxis_setmode", {mode: m, axis: this})
    }
    return true
  }

  transformPrimarySecondary() {
    let t = this.#transform.manual;
    if (this.#yAxisType != YAXIS_TYPE.percent &&
        !this.parent.parent.isPrimary) {
      let {pane} = this.getMaxMinDiff()
      t = pane
    }
    return t
  }

  // manual Y axis positioning
  setOffset(o) {
    if (!isNumber(o) || o == 0 || this.#mode !== "manual") return false

    let t = this.transformPrimarySecondary()
    let max = this.pixel2Val(o * -1)
    let min = this.pixel2Val(this.height - o)
    let diff = max - min;
    t.min = min
    t.max = max
    t.mid = (diff) / 2
    t.diff = diff
    t.zoom = 0
  }

  setZoom(z) {
    if (!isNumber(z) || this.#mode !== "manual") return false

    let t = this.#transform.manual;
    let {max, min, diff, pane} = this. getMaxMinDiff()
    const diff10P = diff * 0.01;
    const change = z * diff10P;
          min -= change;
          max += change;

    // if (max < min || min <= diff)  return
    if (max < min || min <= Infinity * -1 || max >= Infinity)  return

    pane.min -= change;
    pane.max += change;
    t.max =  max
    t.min = min 
    t.mid = (diff) / 2
    t.diff = diff
    t.zoom = change
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
        const t = this.#transform[m]
        const p = t[prop]
        switch (prop) {
          case "max": return p // "valueMax"
          case "min":  return p // "valueMin"
          case "mid": return t.min + (t.max - t.min) // "priceMid"
          case "diff": return t.max - t.min
          case "zoom": return p
          case "offset": return p
          case "secondaryMaxMin": return p
          default: return obj[prop]
        }
      }
    })
  }

  calcGradations() {
    let mm, max, min, off;
    // default max min
    max = (this.#range.max > 0) ? this.#range.max : 1;
    min = (this.#range.min > 0) ? this.#range.min : 0;

    switch (this.yAxisType) {
      case YAXIS_TYPE.percent:
        max = (this.#range.max > -10) ? this.#range.max : 110
        min = (this.#range.min > -10) ? this.#range.min : -10
        break;
      case YAXIS_TYPE.relative:
        mm = this.getMaxMinDiff()
        max = mm.max
        min = mm.min
        break;
      default:
        break;
    }
    // account for manual user positioning
    off = this.#range.offset
    this.#yAxisGrads = this.gradations(max + off, min + off)
    return this.#yAxisGrads
  }

  gradations(max, min, decimals=true) {
    let digits,
        scaleGrads = [],
        rangeH = max - min,
        niceNumber = this.niceNumber(rangeH),
        // find next largest nice number above yStart
        yStartRoundNumber = Math.ceil( min/niceNumber ) * niceNumber,
        // find next lowest nice number below yEnd
        yEndRoundNumber = Math.floor( max/niceNumber ) * niceNumber,
        pos = this.height,
        // step$ = (yEndRoundNumber - yStartRoundNumber) / niceNumber,
        // stepP = this.height / step$,
        step = countDigits(niceNumber),
        nice;
    this.#step = step

    for ( var y = yStartRoundNumber ; y <= yEndRoundNumber ; y += niceNumber )
    {
      digits = countDigits(y)
      nice = limitPrecision(y, step.decimals) * 1
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
   * roughly divide the yRange into cells and provide rounded numbers
   * @param {number} [rangeH=this.rangeH]
   * @return {number}  
   * @memberof yAxis
   */
  niceNumber(rangeH = this.rangeH) {
    const yGridSize = (rangeH)/(this.height / (this.core.theme.yAxis.fontSize * YAxisFontSizeFactor));

    // try to find a nice number to round to
    let niceNumber = Math.pow( 10 , Math.ceil( Math.log10( yGridSize ) ) );
    if ( yGridSize < 0.25 * niceNumber ) niceNumber = 0.25 * niceNumber;
    else if ( yGridSize < 0.5 * niceNumber ) niceNumber = 0.5 * niceNumber;

    return niceNumber
  }

}
