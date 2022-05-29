// xAxis.js
// Timeline that lurks down below

import Axis from "./axis";
import { TIMEUNITS, TIMEINCS } from "../../definitions/chart";
import { isNumber } from "../../utils/typeChecks";
import { 
  monthDayCnt, timestampDiff, 
  isLeapYear, year_start, get_year, 
  month_start, get_month, get_monthName, 
  get_day, day_start } from "../../utils/time";
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
  get rangeDuration() { return this.#range.rangeDuration }
  get indexStart() { return this.#range.indexStart }
  get indexEnd() { return this.#range.indexEnd }
  get timeMax() { return this.#range.timeMax }
  get timeMin() { return this.#range.timeMin }
  get candleW() { return this.width / this.range.Length }
  get xAxisRatio() { return this.width / this.#range.rangeDuration }
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
    let width = this.range.timeMax - x
    let xPos = (width * this.xAxisRatio) + (this.candleW * 0.5)
    return xPos
  }

  pixel2T(x) {
    let c = Math.floor(x / this.candleW ) + this.range.indexStart
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
    const rangeStart = this.range.timeMin
    const rangeEnd = this.range.timeMax
    let d1 = new Date(rangeStart)
    let d2 = new Date(rangeEnd)
    const diff = {}
    const units = {}
    const grads = {}


    // let d1Y = d1.getFullYear
    // let d2Y = d2.getFullYear

    // year boundary
    grads.years = []
    diff.years = timestampDiff.inYears(rangeStart, rangeEnd)
    let year = rangeStart
    for (let i = diff.years; i > 0; i--) {
      let yearStart = year_start(year)
      let yearValue = get_year(year)

      grads.years.push([yearStart, yearValue])

      year += 1000*60*60*24*365
      if (isLeapYear(year)) year += 1
    }

    // month boundary
    grads.months = []
    diff.months = timestampDiff.inMonths(rangeStart, rangeEnd)
    let month = rangeStart
    for (let i = diff.months; i > 0; i--) {
      let monthStart = month_start(month)
      let monthValue = get_month(month)
      let dayCnt = monthDayCnt[monthValue]

      monthValue = (monthValue == 0) ? get_year(month) : get_monthName(month)
      grads.months.push([monthStart, monthValue])

      if (isLeapYear(month) && monthValue == 1) ++dayCnt
      month += 1000*60*60*24*dayCnt
    }

    // day boundary
    grads.days = []
    diff.days = timestampDiff.inDays(rangeStart, rangeEnd)
    let day = rangeStart
    for (let i = diff.days; i > 0; i--) {
      let monthValue = get_month(month)
      let dayStart = day_start(day)
      let dayValue = get_day(day)
      let dayCnt = dayValue

      if (monthValue == 0 && dayValue == 1) dayValue = get_year(day)
      else if (dayValue == 1) dayValue = get_monthName(day)
 
      grads.days.push([dayValue, this.t2Pixel(dayStart)])

      day += 1000*60*60*24
    }




    // diff.months = timestampDiff.inMonths(rangeStart, rangeEnd)
    // diff.days = timestampDiff.inDays(rangeStart, rangeEnd)
    // diff.hours = timestampDiff.inHours(rangeStart, rangeEnd)
    // diff.minutes = timestampDiff.inMinutes(rangeStart, rangeEnd)

    // if (diff.years > 1) {
    //   units.max = ['y', diff.years]
    //   units.min = ['M', diff.months]
    // }
    // else if (diff.months > 1) {
    //   units.max = ['M', diff.months]
    //   units.min = ['d', diff.days]
    // }
    // else if (diff.days > 1) {
    //   units.max = ['d', diff.days]
    //   units.min = ['h', diff.hours]
    // }
    // else if (diff.hours > 1) {
    //   units.max = ['h', diff.hours]
    //   units.min = ['m', diff.minutes]
    // }
    // else {
    //   units.max = ['h', diff.hours]
    //   units.min = ['m', diff.minutes]
    // }



    // // // max
    // // let max
    // // switch(step.max[1]) {
    // //   case "y":
    // //     max = this.year_start(rangeEnd)
    // //     break;
    // //   case "M":
    // //     max = this.month_start(rangeEnd)
    // //     break;
    // //   case "d":
    // //     max = this.day_start(rangeEnd)
    // // }

    // const hourStart = this.get_hour(rangeEnd)
    // const dayStart = this.day_start(rangeEnd)
    // const monthStart = this.month_start(rangeEnd)
    // const yearStart = this.year_start(rangeEnd)

    // let rangeAnchor,
    //     time

    // if (this.inRange(yearStart)) {
    //   rangeAnchor = yearStart
    //   time = this.get_year(rangeEnd)
    // }
    // else if (this.inRange(monthStart)) {
    //   rangeAnchor = monthStart
    //   time = this.get_month(rangeEnd)
    // }
    // else if (this.inRange(dayStart)) {
    //   rangeAnchor = dayStart
    //   time = this.get_day(rangeEnd)
    // }
    // else if (this.inRange(hourStart)) {
    //   rangeAnchor = hourStart
    //   time = this.get_hour(rangeEnd)
    // }
    // else {
    //   rangeAnchor = rangeEnd
    //   time = tis.get_minute(rangeEnd)
    // }

    // const timeGrads = [[time, this.t2Pixel(rangeAnchor) -1, rangeAnchor]]

    // figure out the rest of the timeline

    // return timeGrads
    return grads.days
  }

  inRange(t) {
    if (t >= this.range.timeStart && t <= this.range.timeFinish)
      return true
    else return false
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
