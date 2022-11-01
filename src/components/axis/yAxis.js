// yAxis.js

import Axis from "./axis";
import { limit, log10, power, precision, round } from "../../utils/number";
import { isNumber } from "../../utils/typeChecks";

import { 
  PRICEDIGITS, 
  YAXIS_STEP,
  YAXIS_GRID,
  YAXIS_TYPES
} from "../../definitions/chart";

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
      zoom: 1,
      offset: 0,
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
  #yAxisGrid = YAXIS_GRID
  #yAxisDigits = PRICEDIGITS
  #yAxisRound = 3
  #yAxisTicks = 3
  #yAxisGrads

  #range

  constructor(parent, chart, yAxisType=YAXIS_TYPES[0], range) {
    super(parent, chart)
    this.#core = parent.mediator.api.core
    this.#chart = chart
    this.#parent = parent
    this.#source = parent.parent
    this.yAxisType = yAxisType
    this.#yAxisGrid = (this.core.config?.yAxisGrid) ? 
      this.core.config?.yAxisGrid : YAXIS_GRID

    range = (range) ? range : this.#core.range
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

  get core() { return this.#core }
  get chart() { return this.#chart }
  get data() { return this.chart.data }
  // get range() { return this.#parent.mediator.api.core.range }
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
  get theme() { return this.core.theme }
  set mode(m) { this.setMode(m) }
  get mode() { return this.#mode }
  set zoom(z) { this.setZoom(z) }
  get zoom() { return this.#range.zoom }

  calcHeight() {
    let api = this.#chart.mediator.api
    return api.height - api.utilsW - api.scaleW
  }

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
   * @param {number} yData - chart price or offchart indicator y data
   * @return {number}  
   * @memberof yAxis
   */
  yPos(yData) {
    switch(this.yAxisType) {
      case "percent" : return this.p100toPixel(yData)
      case "log" : return this.$2Pixel(log10(yData))
      default : return this.$2Pixel(yData)
    }
  }

  /**
   * return chart price
   * handles Y Axis modes: default, log, percentate
   * @param {number} y
   * @return {number}
   * @memberof yAxis
   */
  yPos2Price(y) {
    return this.pixel2$(y)
  }

  $2Pixel(yData) {
    const height = yData - this.#range.min
    const yPos = this.height - (height * this.yAxisRatio)
    return yPos
  }

  lastYData2Pixel(yData) {
    let height = yData - this.core.stream.lastPriceMin
    let yPos = this.height - (height * this.yAxisRatio)
    return yPos
  }

  pixel2$(y) {
    let ratio = (this.height - y) / this.height
    let adjust = this.#range.diff * ratio
    return this.#range.min + adjust
  }

  p100toPixel(yData) {
    return this.height * yData / 100
  }

  yAxisTransform() {

  }

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
  }

  setZoom(z) {
    if (!isNumber(z) || this.#mode !== "manual") return false

    const t = this.#transform
    t.manual.zoom += z
    // console.log(JSON.stringify(t.manual))

    const r = z / this.height
    const min = t.manual.min * (1 - r)
    const max = t.manual.max * (1 + r)
    
    if (max < min) return

    t.manual.max =  max
    t.manual.min = (min >= 0)? min : 0
    t.manual.mid = (max - min) / 2
    t.manual.diff = max - min
    t.manual.zoom = 1
    t.manual.offset = 0

    // console.log(JSON.stringify(t.manual))
  }

//   setYFactor(f) {
//     if (!isNumber(f) || this.#mode !== "manual") return false
//     this.#transform.factor += f * -1
//     console.log(`this.#transform.factor`,this.#transform.factor)
//   }
  
//   calc_zoom(event) {
//     let d = this.drug.y - event.center.y
//     let speed = d > 0 ? 3 : 1
//     let k = 1 + speed * d / this.layout.height
//     return Utils.clamp(this.drug.z * k, 0.005, 100)
// }

  calcGradations() {

    switch (this.yAxisType) {
      case "percent":
        this.#yAxisGrads = this.gradations(100, 0, false, true)
        break;
      default:
        let max = (this.#range.max > 0) ? this.#range.max : 1
        let min = (this.#range.min > 0) ? this.#range.min : 0
        this.#yAxisGrads = this.gradations(max, min)
        break;
    }
  }

  gradations(max, min, decimals=true, fixed=false) {

      let digits,
          rangeH,
          yGridSize;
    const scaleGrads = [];

    // max = this.#range.max
    // min = this.#range.min

    this.#yAxisRound = this.countDigits(this.#range.diff).integers

    // roughly divide the yRange into cells
    rangeH = max - min
    rangeH = (this.rangeH > 0) ? this.rangeH : 1
    yGridSize = (rangeH)/this.#yAxisGrid;

    // if (fixed)

    // if (fixed) {
    //   // const rangeMid = (max + min) * 0.5
    //   // const midH = this.height * 0.5
    //   // digits = this.countDigits(rangeMid)
    //   // const scaleMid = this.niceValue(digits, decimals)
  
    //   // scaleGrads.push([scaleMid, round(midH), digits])
  
    //   // let grad = round(power(log10(midH), 2) - 1),
    //   //     step$ = (max - scaleMid) / grad,
    //   //     stepP = midH / grad,
    //   //     upper = scaleMid + step$,
    //   //     pos = midH - stepP,
    //   //     nice, 
    //   //     entry;
    //   // while (upper <= max) {
    //   //   digits = this.countDigits(upper)
    //   //   nice = this.niceValue(digits, decimals)
    //   //   entry = [nice, round(pos), digits]
    //   //   scaleGrads.unshift(entry)
    //   //   upper += step$
    //   //   pos -= stepP
    //   // }
    //   // let lower = scaleMid - step$
    //   //     pos = midH + stepP
    //   // while (lower >= min) {
    //   //   digits = this.countDigits(lower)
    //   //   nice = this.niceValue(digits, decimals)
    //   //   entry = [nice, round(pos), digits]
    //   //   scaleGrads.push(entry)
    //   //   lower -= step$
    //   //   pos += stepP
    //   // }

    //   // roughly divide the yRange into cells
    //   rangeH = (this.rangeH > 0) ? this.rangeH : 1
    //   yGridSize = (rangeH)/this.#yAxisGrid;
    // }
    // else {
    //   // roughly divide the yRange into cells
    //   rangeH = (this.rangeH > 0) ? this.rangeH : 1
    //   yGridSize = (rangeH)/this.#yAxisGrid;


    // }

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

  draw() {
    // calculate Y Axis gradations for labels and overlays
    this.calcGradations()
    this.drawLabels()
    this.drawOverlays()
  }

  drawLabels() {
    this.#parent.layerLabels.scene.clear()

    const grads = this.#yAxisGrads
    const ctx = this.#parent.layerLabels.scene.context
    const theme = this.theme.yAxis

    ctx.save();
    ctx.strokeStyle = theme.colourTick
    ctx.fillStyle = theme.colourTick
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`
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
