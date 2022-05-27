// xAxis.js
// Timeline that lurks down below

import Axis from "./axis";
import { TIMEUNITS, TIMEINCS, MONTHMAP } from "../../definitions/chart";
import { isNumber } from "../../utils/typeChecks";
import { ms2Interval } from "../../utils/time";
import { XAxisStyle } from "../../definitions/style";

export default class xAxis extends Axis {

  #data
  #range
  #parent

  #xAxisTicks = 4
  #xAxisGrads
  #xAxisOffset

  constructor(parent, chart) {
    super(chart)
    this.#data = super.data
    this.#range = super.range
    this.#parent = parent 
  }

  get data() { return this.#data }
  get range() { return this.#range }
  get width() { return super.width }
  get interval() { return this.#range.interval }
  get intervalStr() { return this.#range.intervalStr }
  get timeStart() { return this.#range.timeStart }
  get timeFinish() { return this.#range.timeFinish }
  get rangeDuration() { return this.#range.timeDuration }
  get indexStart() { return this.#range.indexStart }
  get indexEnd() { return this.#range.indexEnd }
  get timeMax() { return this.#range.timeMax }
  get timeMin() { return this.#range.timeMin }
  get candleW() { return this.width / this.range.Length }
  get xAxisRatio() { return this.width / this.#range.timeDuration }
  get xAxisStep() { return this.calcXAxisStep() }
  set xAxisTicks(t) { this.#xAxisTicks = isNumber(t) ? t : 0 }
  get xAxisTicks() { return this.#xAxisTicks }
  get xAxisGrads() { return this.#xAxisGrads }

  /**
 * return canvas x co-ordinate
 * handles X Axis modes: default, indexed
 * @param {number} dataX - chart time
 * @return {number}  
 * @memberof xAxis
 */
  xPos(time) {
    let width = this.range.timeMax - time
    let xPos = (width * this.xAxisRatio) + (this.candleW * 0.5)
    return xPos
  }

  t2Pixel(x) {
    let width = x - this.range.timeStart
    let xPos = (width * this.xAxisRatio) + (this.candleW * 0.5)
    return xPos
  }

  pixel2T(x) {
    let c = Math.floor(x / this.candleW )
    return this.#range.data[c][0]
  }

  xPosSnap2CandlePos(x) {
    let c = Math.floor((x / this.candleW))
    return  (c * this.candleW) + (this.candleW / 2)
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

  calcXAxisStep() {
    let interval = Object.keys(TIMEINCS),
        i = interval.length - 1
        // major = minor = 1000
    while (this.rangeDuration >= interval[i]) {
      // minor = interval[i--]
      if (--i === 0) break
    }
    // major = interval[i]

    return {...{int: interval[i]}, ...TIMEINCS[interval[i]]}
  }

  calcXAxisGrads() {
    const step = this.calcXAxisStep()
    const rangeEnd = this.range.timeFinish
    const intervals = ms2Interval(rangeEnd)

    // // max
    // let max
    // switch(step.max[1]) {
    //   case "y":
    //     max = this.year_start(rangeEnd)
    //     break;
    //   case "M":
    //     max = this.month_start(rangeEnd)
    //     break;
    //   case "d":
    //     max = this.day_start(rangeEnd)
    // }

    const hourStart = this.get_hour(rangeEnd)
    const dayStart = this.day_start(rangeEnd)
    const monthStart = this.month_start(rangeEnd)
    const yearStart = this.year_start(rangeEnd)

    let rangeAnchor,
        time

    if (this.inRange(yearStart)) {
      rangeAnchor = yearStart
      time = this.get_year(rangeEnd)
    }
    else if (this.inRange(monthStart)) {
      rangeAnchor = monthStart
      time = this.get_month(rangeEnd)
    }
    else if (this.inRange(dayStart)) {
      rangeAnchor = dayStart
      time = this.get_day(rangeEnd)
    }
    else if (this.inRange(hourStart)) {
      rangeAnchor = hourStart
      time = this.get_hour(rangeEnd)
    }
    else {
      rangeAnchor = rangeEnd
      time = tis.get_minute(rangeEnd)
    }

    const timeGrads = [[time, this.t2Pixel(rangeAnchor) -1, rangeAnchor]]

    // figure out the rest of the timeline

    return timeGrads
  }

  inRange(t) {
    if (t >= this.range.timeStart && t <= this.range.timeFinish)
      return true
    else return false
  }

  get_minute(t) {
    return t ? new Date(t).getMinutes() : null
  }

  get_hour(t) {
    return t ? new Date(t).getHours() : null
  }

  hourStart(t) {
    let start = new Date(t)
    return start.setUTCMinutes(0,0,0)
  }

  /**
   * day number of the month
   *
   * @param {timestamp} t - timestamp ms
   * @return {number} - day number of the month
   * @memberof xAxis
   */
  get_day(t) {
    return t ? new Date(t).getDate() : null
  }
  
  /**
   * Start of the day (zero millisecond)
   *
   * @param {timestamp} t - timestamp ms
   * @return {timestamp} - timestamp ms
   * @memberof xAxis
   */
  day_start(t) {
    let start = new Date(t)
    return start.setUTCHours(0,0,0,0)
  }

  /**
   * month number of the year
   *
   * @param {timestamp} t - timestamp ms
   * @return {number} - month number of the year
   * @memberof xAxis
   */
  get_month(t) {
    if (!t) return undefined
    let m = new Date(t).getUTCMonth()
    return MONTHMAP[m]
  }
  
  /**
   * Start of the month (zero millisecond)
   *
   * @param {timestamp} t - timestamp ms
   * @return {timestamp} - timestamp ms
   * @memberof xAxis
   */
  month_start(t) {
    let date = new Date(t)
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(), 1
    )
  }

  /**
   * the year
   *
   * @param {timestamp} t - timestamp ms
   * @return {number} - the year
   * @memberof xAxis
   */
  get_year(t) {
    if (!t) return undefined
    return new Date(t).getUTCFullYear()
  }

  /**
   * Start of the year (zero millisecond)
   *
   * @param {timestamp} t - timestamp ms
   * @return {timestamp} - timestamp ms
   * @memberof xAxis
   */
  year_start(t) {
    return Date.UTC(new Date(t).getFullYear())
  }



  draw() {
    this.#xAxisGrads = this.calcXAxisGrads()
    this.drawLabels()
    this.drawOverlays()
  }

  drawLabels() {
    const grads = this.#xAxisGrads
    const ctx = this.#parent.layerLabels.scene.context
    const mid = this.width / this.range.Length * 0.5
    ctx.save();
    ctx.strokeStyle = XAxisStyle.COLOUR_TICK
    ctx.fillStyle = XAxisStyle.COLOUR_TICK
    ctx.font = XAxisStyle.FONT_LABEL
    for (let tick of grads) { 
      let w = Math.floor(ctx.measureText(`${tick[0]}`).width * 0.5)
      ctx.fillText(tick[0], tick[1] - w, this.xAxisTicks + 12)

      ctx.beginPath()
      ctx.moveTo(tick[1], 0)
      ctx.lineTo(tick[1], this.xAxisTicks)
      ctx.stroke()
    }
      ctx.restore();
  }

  drawOverlays() {
    const grads = this.#xAxisGrads

  }

}
