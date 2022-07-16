// xAxis.js
// Timeline that lurks down below

import Axis from "./axis";
import { TIMEUNITS, TIMEINCS } from "../../definitions/chart";
import { isNumber } from "../../utils/typeChecks";
import { 
  monthDayCnt, timestampDiff, 
  isLeapYear, year_start, get_year, 
  month_start, get_month, get_monthName, 
  get_day, day_start, 
  get_hour, hour_start,
  get_minute, minute_start
 } from "../../utils/time";
import { XAxisStyle } from "../../definitions/style";

export default class xAxis extends Axis {

  #parent
  #chart

  #xAxisTicks = 4
  #xAxisGrads
  #xAxisOffset

  constructor(parent, chart) {
    super()
    this.#chart = chart
    this.#parent = parent 
  }

  get chart() { return this.#parent.mediator.api.Chart }
  get data() { return this.chart.data }
  get range() { return this.#parent.range }
  get width() { return this.calcWidth() }
  get interval() { return this.range.interval }
  get intervalStr() { return this.range.intervalStr }
  get timeStart() { return this.range.timeStart }
  get timeFinish() { return this.range.timeFinish }
  get rangeDuration() { return this.range.rangeDuration }
  get indexStart() { return this.range.indexStart }
  get indexEnd() { return this.range.indexEnd }
  get timeMax() { return this.range.timeMax }
  get timeMin() { return this.range.timeMin }
  get candleW() { return this.width / this.range.Length }
  get xAxisRatio() { return this.width / this.range.rangeDuration }
  get xAxisStep() { return this.calcXAxisStep() }
  set xAxisTicks(t) { this.#xAxisTicks = isNumber(t) ? t : 0 }
  get xAxisTicks() { return this.#xAxisTicks }
  get xAxisGrads() { return this.#xAxisGrads }

  calcWidth() {
    let api = this.#parent.mediator.api
    return api.width - api.toolsW - api.scaleW
  }

  /**
 * return canvas x co-ordinate
 * handles X Axis modes: default, indexed
 * @param {number} dataX - chart time
 * @return {number}  
 * @memberof xAxis
 */
  xPos(time) {
    let width = time - this.range.timeMin
    let xPos = (width * this.xAxisRatio) + (this.candleW * 0.5)
    return xPos
  }

  t2Pixel(t) {
    let width = t - this.range.timeMin
    let xPos = (width * this.xAxisRatio) + (this.candleW * 0.5)
    return xPos
  }

  pixel2T(x) {
    let c = this.pixel2Index(x)
    return this.range.value(c)[0]
  }

  pixel2Index(x) {
    return Math.floor(x / this.candleW ) + this.range.indexStart
  }

  pixelOHLCV(x) {
    let c = Math.floor(x / this.candleW ) + this.range.indexStart
    return this.range.value(c)
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

  xPos2Index(x) {
    return this.pixel2Index(x)
  }

  xPosOHLCV(x) {
    return this.pixelOHLCV(x)
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
    const interval = this.range.intervalStr
    let d1 = new Date(rangeStart)
    let d2 = new Date(rangeEnd)
    const diff = {}
    const units = {}
    const grads = {}
    const unit = interval.charAt(interval.length - 1)

    // let d1Y = d1.getFullYear
    // let d2Y = d2.getFullYear

    switch(unit) {
      case "y":
        // year boundary
        grads.years = []
        diff.years = timestampDiff.inYears(rangeStart, rangeEnd)
        let year = rangeStart
        for (let i = diff.years; i > 0; i--) {
          let yearStart = year_start(year)
          let yearValue = get_year(year)

          grads.years.push([yearStart, this.t2Pixel(yearValue)])

          year += 1000*60*60*24*365
          if (isLeapYear(year)) year += 1
        }
        grads.current = grads.years
        break;
      
      case "M":
        // month boundary
        grads.months = []
        diff.months = timestampDiff.inMonths(rangeStart, rangeEnd)
        let month = rangeStart
        for (let i = diff.months; i > 0; i--) {
          let monthStart = month_start(month)
          let monthValue = get_month(month)
          let dayCnt = monthDayCnt[monthValue]

          monthValue = (monthValue == 0) ? get_year(month) : get_monthName(month)

          grads.months.push([monthStart, this.t2Pixel(monthValue)])

          if (isLeapYear(month) && monthValue == 1) ++dayCnt
          month += 1000*60*60*24*dayCnt
        }
        grads.current = grads.months
        break;

      case "d":
        // day boundary
        grads.days = []
        diff.days = timestampDiff.inDays(rangeStart, rangeEnd)
        let day = rangeStart
        for (let i = diff.days; i > 0; i--) {
          let monthValue = get_month(day)
          let dayStart = day_start(day)
          let dayValue = get_day(day)

          if (monthValue == 0 && dayValue == 1) dayValue = get_year(day)
          else if (dayValue == 1) dayValue = get_monthName(day)
    
          grads.days.push([dayValue, this.t2Pixel(dayStart)])

          day = dayStart + 1000*60*60*24
        }
        grads.current = grads.days
        break;

      case "h":
        // hour boundary
        grads.hours = []
        diff.hours = timestampDiff.inHours(rangeStart, rangeEnd)
        let hour = rangeStart
        for (let i = diff.hours; i > 0; i--) {
          let monthValue = get_month(hour)
          let dayValue = get_day(hour)
          let hourValue = get_hour(hour)
          let hourStart = hour_start(hour)

          if (monthValue == 0 && dayValue == 1 && hourValue == 0) hourValue = get_year(hour)
          else if (dayValue == 1 && hourValue == 0) hourValue = get_monthName(hour)
          else if (hourValue == 0) hourValue = get_day(hour)
          else hourValue = hourValue + ":00"

          grads.hours.push([hourValue, this.t2Pixel(hourStart)])

          hour = hourStart + 1000*60*60
        }
        grads.current = grads.hours
        break;

      case "m":
        // minute boundary
        grads.minutes = []
        diff.minutes = timestampDiff.inMinutes(rangeStart, rangeEnd)
        let minute = rangeStart
        for (let i = diff.minutes; i > 0; i--) {
          let monthValue = get_month(hour)
          let dayValue = get_day(hour)
          let hourValue = get_hour(hour)
          let minuteValue = get_minute(hour)
          let minuteStart = minute_start(hour)

          if (monthValue == 0 && dayValue == 1 && hourValue == 0 && minuteValue == 0) minuteValue = get_year(minute)
          else if (dayValue == 1 && hourValue == 0 && minuteValue == 0) minuteValue = get_monthName(minute)
          else if (hourValue == 0 && minuteValue == 0) minuteValue = get_day(minute)
          else minuteValue = get_hour(minute) + ":" + minuteValue

          grads.minutes.push([minuteValue, "00:" + this.t2Pixel(minuteStart)])

          minute = minuteStart + 1000*60
        }
        grads.current = grads.minutes
        break;
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
    return grads.current
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
    this.#parent.layerLabels.scene.clear()

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
    this.#parent.layerOverlays.scene.clear()

    const grads = this.#xAxisGrads

  }

}
