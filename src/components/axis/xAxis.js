// xAxis.js

import Axis from "./axis";
import { TIMEUNITS, TIMESCALES, MONTHMAP } from "../../definitions/chart";
import { ms2Interval } from "../../utils/time";

export default class xAxis extends Axis {

  #data
  #range
  #parent

  xAxisOffset

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
    const intervalStr = this.#range.intervalStr

    let i = TIMESCALES.length -1,
        major = minor = 1000
    while (this.rangeDuration >= TIMESCALES[i]) {
      minor = TIMESCALES[i++]
    }
    major = TIMESCALES[i]

  }

  get_day(t) {
    return t ? new Date(t).getDate() : null
  }
  
  // Start of the day (zero millisecond)
  day_start(t) {
    let start = new Date(t)
    return start.setUTCHours(0,0,0,0)
  }

  get_month(t) {
    if (!t) return undefined
    return new Date(t).getUTCMonth()
  }
  
  // Start of the month
  month_start(t) {
    let date = new Date(t)
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(), 1
    )
  }

  get_year(t) {
    if (!t) return undefined
    return new Date(t).getUTCFullYear()
  }

  // Start of the year
  year_start(t) {
    return Date.UTC(new Date(t).getFullYear())
  }



}
