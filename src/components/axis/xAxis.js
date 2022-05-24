// xAxis.js
// Timeline that lurks down below

import Axis from "./axis";
import { TIMEUNITS, TIMEINCS, MONTHMAP } from "../../definitions/chart";
import { ms2Interval } from "../../utils/time";


export default class xAxis extends Axis {

  #data
  #range
  #parent

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
  get xAxisRatio() { return this.width / this.#range.Length }
  get xAxisStep() { return this.calcXAxisStep() }
  set xAxisTicks(t) {  }
  get xAxisTicks() {  }

  /**
 * return canvas x co-ordinate
 * @param {number} dataX - chart time
 * @return {number}  
 * @memberof xAxis
 */
  xPos(time) {
    let width = this.range.timeMax - time
    let xPos = width * this.xAxisRatio
    return xPos
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

    // const timeGrads = [[rangeAnchor, t2Pixel(rangeAnchor)], time]
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
    return new Date(t).getUTCMonth()
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

  }

  drawOverlays() {

  }

}
