// xAxis.js
// Timeline that lurks down below

import Axis from "./axis";
import { XAXIS_STEP } from "../../definitions/chart";
import { isNumber } from "../../utils/typeChecks";
import { bRound } from "../../utils/number"
import { 
  ms2TimeUnits,
  get_year,
  get_month, get_monthName,
  get_day,
  time_start,
  HM, MS,
  TIMESCALES, TIMESCALESRANK,
  MINUTE_MS, HOUR_MS, DAY_MS,
 } from "../../utils/time";

export default class xAxis extends Axis {

  #xAxisTicks = 4
  #xAxisGrads
  #indexBased = true

  constructor(parent) {
    super(parent)
  }

  get range() { return this.parent.range }
  get width() { return this.parent.width }
  get interval() { return this.range.interval }
  get intervalStr() { return this.range.intervalStr }
  get timeStart() { return this.range.timeStart }
  get timeFinish() { return this.range.timeFinish }
  get rangeDuration() { return this.range.rangeDuration }
  get rangeLength() { return this.range.Length }
  get indexStart() { return this.range.indexStart }
  get indexEnd() { return this.range.indexEnd }
  get timeMax() { return this.range.timeMax }
  get timeMin() { return this.range.timeMin }
  get candleW() { return bRound(this.width / this.range.Length) }
  get candlesOnLayer() { return bRound(this.core.Chart.layerWidth / this.candleW )}
  get xAxisRatio() { return this.width / this.range.rangeDuration }
  set xAxisTicks(t) { this.#xAxisTicks = isNumber(t) ? t : 0 }
  get xAxisTicks() { return this.#xAxisTicks }
  get xAxisGrads() { return this.#xAxisGrads }
  get scrollOffsetPx() { return this.core.scrollPos % this.candleW }
  get bufferPx() { return this.core.bufferPx }

  /**
 * return canvas x co-ordinate
 * handles X Axis modes: default, indexed
 * @param {number} ts - chart time stamp
 * @return {number}  
 * @memberof xAxis
 */
  xPos(ts) {
    return bRound((this.range.rangeIndex(ts) * this.candleW) + (this.candleW * 0.5))
  }

  t2Index(ts) {
    return this.range.rangeIndex(ts)
  }

  t2Pixel(ts) {
    return this.xPos(ts)
  }

  pixel2T(x) {
    let c = this.pixel2Index(x)
    return this.range.value(c)[0]
  }

  pixel2Index(x) {
    x -= this.candleW / 2
    let c = this.range.indexStart 
    let o = bRound(x / this.candleW)
    return c + o // - 1
  }

  pixelOHLCV(x) {
    let c = this.pixel2Index(x)
    return this.range.value(c)
  }

  xPosSnap2CandlePos(x) {
    let r = x % this.candleW
    let o = (r) ? this.candleW / 2 : 0
    return bRound((x - r) + o)
  }

  /**
   * return chart time
   * handles X Axis modes: default, indexed
   * @param {number} x
   * @returns {timestamp}
   * @memberof xAxis
   */
  xPos2Time(x) {
    return this.pixel2T(x)
  }

  xPos2Index(x) {
    return this.pixel2Index(x)
  }

  xPosOHLCV(x) {
    return this.pixelOHLCV(x)
  }

  initXAxisGrads() {
    this.#xAxisGrads = this.calcXAxisGrads()
  }

  doCalcXAxisGrads(range) {
    this.#xAxisGrads = this.calcXAxisGrads(range)
  }

  calcXAxisGrads(range=this.range.snapshot()) {
    const grads = {
      entries: {},
      values: [],
      major: [],
      minor: [],
    }
    const units = ms2TimeUnits(range.rangeDuration)
    grads.units = units

    for (let u in units) {
      if (units[u] > 0) {
        grads.units = [u, u]
        grads.timeSpan = `${units[u]} ${u}`
        break
      }
    }
 
    const tf = range.interval
    const {xStep, rank} = this.xStep(range)
    const tLimit = this.pixel2T(this.width) + xStep

    let t1 = range.timeMin - (range.timeMin % xStep) - xStep
    let prev
    let start = t1

    while (t1 < tLimit) {

      let y = time_start(t1, "years")
      let m = time_start(t1, "months")
      let d = time_start(t1, "days")

      if (!(y in grads.entries) && y >= start) {
        grads.entries[y] = [this.dateTimeValue(y, tf), this.t2Pixel(y), y, "major"]
        prev = y
      }

      else if (!(m in grads.entries) && m >= start) {
        grads.entries[m] = [this.dateTimeValue(m, tf), this.t2Pixel(m), m, "major"]
        prev = m
      }

      else if (!(d in grads.entries) && d >= start) {
        grads.entries[d] = [this.dateTimeValue(d, tf), this.t2Pixel(d), d, "major"]
        prev = d
      }

      // else if (!(t1 in grads.entries)) {
        grads.entries[t1] = [this.dateTimeValue(t1, tf), this.t2Pixel(t1), t1, "minor"]
        prev = t1
      // }      

      t1 += xStep
    }

    grads.values = Object.values(grads.entries)

    return grads
  }

  xStep(range) {

    // minStep in pixels
    let minStep = XAXIS_STEP;
    let interval = this.#indexBased ? range.interval : 1
    let xStep = TIMESCALES[0]
    let candleW = bRound(this.width / range.Length)
    let rank = TIMESCALESRANK[0]

    let i = TIMESCALES.indexOf(interval)
    while (i-- >= 0) {

      const gradPixels = candleW * (TIMESCALES[i] / interval)
      
      if (gradPixels >= minStep) break
    }
    xStep = TIMESCALES[i]
    rank = TIMESCALESRANK[i]
    return {xStep, rank}
  }

  dateTimeValue(ts, tf) {
    let value
    if ((ts / DAY_MS) % 1 === 0) {
      const date = get_day(ts)
      if (date === 1) {
        let month = get_month(ts)
        if (month === 0) return get_year(ts)
        else return get_monthName(ts)
      }
      else return date
    }
    else {
      // TODO: SECONDS_MS
      if (tf < MINUTE_MS) return MS(ts)
      else if (tf < HOUR_MS) return MS(ts)
      else return HM(ts)
    }
  }

  gradsWorker() {
    
  }


}
