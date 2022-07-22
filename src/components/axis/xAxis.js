// xAxis.js
// Timeline that lurks down below

import Axis from "./axis";
import { MAXGRADSPER, TIMEUNITS, TIMEINCS } from "../../definitions/chart";
import { isNumber } from "../../utils/typeChecks";
import { 
  monthDayCnt, timestampDiff, 
  isLeapYear, year_start, get_year, 
  month_start, get_month, get_monthName, 
  get_day, day_start, 
  get_hour, hour_start,
  get_minute, minute_start,

  MINUTE_MS, HOUR_MS, DAY_MS, YEAR_MS
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
    const rangeStart = this.timeMin
    const rangeEnd = this.timeMax
    const intervalStr = this.intervalStr
    const diff = {}
    const grads = {years: [], months: [], days: [], hours: [], minutes: [], current: []}
      let gradsPer = Math.trunc(this.width / MAXGRADSPER)
    const unit = intervalStr.charAt(intervalStr.length - 1)
    const numUnits = parseInt(intervalStr, 10)
      let unitCnt = numUnits
      let gradCnt = gradsPer
      let push = false
      let i

    // process for the minimal time unit (timeframe)
    switch(unit) {

      // year boundary
      case "y":
        diff.years = timestampDiff.inYears(rangeStart, rangeEnd)
        let year = rangeStart
            i = diff.years / numUnits

        do {
          let yearStart = year_start(year)
          let yearValue = get_year(year)

          grads.years.push([yearValue, this.t2Pixel(yearStart), yearStart])

          // adjust for leap year
          for (let i = numUnits; i > 0; i--) {
            year += YEAR_MS + DAY_MS
            if (!isLeapYear(year)) year -= DAY_MS
          }
        } 
        while (--i > 0)

        break;

      // month boundary
      case "M":
        diff.months = timestampDiff.inMonths(rangeStart, rangeEnd)
        let month = rangeStart
            i = diff.months / numUnits

        do {
          let monthStart = month_start(month)
          let monthValue = get_month(month)

          monthValue = (monthValue == 0) ? get_year(month) : get_monthName(month)

          grads.months.push([monthValue, this.t2Pixel(monthStart), monthStart])

          while (unitCnt++ < numUnits) {
            let dayCnt = monthDayCnt[monthValue]
            if (isLeapYear(month) && monthValue == 1) ++dayCnt
            month += DAY_MS*dayCnt
          }
          unitCnt = 0
        }
        while (--i > 0)

        break;

      // day boundary
      case "d":
        diff.days = timestampDiff.inDays(rangeStart, rangeEnd)
        let day = rangeStart
            i = diff.days

        do {
          let monthValue = get_month(day)
          let dayStart = day_start(day)
          let dayValue = get_day(day)

          if (monthValue == 0 && dayValue == 1) {
            dayValue = get_year(day)
            push = true
          }
          else if (dayValue == 1) {
            dayValue = get_monthName(day)
            push = true
          }

          // add grad to list if start of time unit count or 
          // start of a year or month
          if (unitCnt == 0 || push === true) {
            // remove last grad if current grad is a new year or month
            // and unit count is not finished
            if (unitCnt > 0) grads.days.pop()
            grads.days.push([dayValue, this.t2Pixel(dayStart), dayStart])
          }
          if (++unitCnt == numUnits) unitCnt = 0

          day = dayStart + DAY_MS
          push = false
        }
        while (--i > 0)

        break;

      case "h":
        // hour boundary
        diff.hours = timestampDiff.inHours(rangeStart, rangeEnd)
        let hour = rangeStart
            i = diff.hours / unitCnt

        do {
          let monthValue = get_month(hour)
          let dayValue = get_day(hour)
          let hourValue = get_hour(hour)
          let hourStart = hour_start(hour)

          if (monthValue == 0 && dayValue == 1 && hourValue == 0) {
            hourValue = get_year(hour)
            grads.years.push([hourValue, this.t2Pixel(hourStart), hourStart])
            grads.hours.push([hourValue, this.t2Pixel(hourStart), hourStart])

            push = true
          }
          else if (dayValue == 1 && hourValue == 0) {
            hourValue = get_monthName(hour)
            grads.months.push([hourValue, this.t2Pixel(hourStart), hourStart])
            grads.hours.push([hourValue, this.t2Pixel(hourStart), hourStart])

            push = true
          }
          else if (hourValue == 0) {
            hourValue = get_day(hour) // +" "+ get_monthName(hour)
            grads.days.push([hourValue, this.t2Pixel(hourStart), hourStart])
            grads.hours.push([hourValue, this.t2Pixel(hourStart), hourStart])

            push = true
          }
          else {
            // if (--unitCnt == 0) {
              hourValue = hourValue + ":00"
              grads.hours.push([hourValue, this.t2Pixel(hourStart), hourStart])
              unitCnt = numUnits
            // }
          }

          // add grad to list if start of time unit count or 
          // start of a year or month
          // if (unitCnt == 0 || push === true) {
          //   // if (gradCnt == 0 || push === true) {
          //     // remove last grad if current grad is a new year or month
          //     // and unit count is not finished
          //     if (unitCnt > 0) grads.days.pop()
          //     grads.hours.push([hourValue, this.t2Pixel(hourStart)])
          //   // }
          // }
          // if (++unitCnt == numUnits) unitCnt = 0
          // if (++gradCnt >= gradsPer) gradCnt = 0

          hour = hourStart + this.interval
          push = false
        }
        while (--i > 0)

        break;

      case "m":
        // minute boundary
        diff.minutes = timestampDiff.inMinutes(rangeStart, rangeEnd)
        let minute = rangeStart
            i = diff.days

        do {
          let monthValue = get_month(minute)
          let dayValue = get_day(minute)
          let hourValue = get_hour(minute)
          let minuteValue = get_minute(minute)
          let minuteStart = minute_start(minute)

          if (monthValue == 0 && dayValue == 1 && hourValue == 0 && minuteValue == 0) minuteValue = get_year(minute)
          else if (dayValue == 1 && hourValue == 0 && minuteValue == 0) minuteValue = get_monthName(minute)
          else if (hourValue == 0 && minuteValue == 0) minuteValue = get_day(minute)
          else minuteValue = get_hour(minute) + ":" + minuteValue

          grads.minutes.push([minuteValue, "00:" + this.t2Pixel(minuteStart), minuteStart])

          minute = minuteStart + MINUTE_MS
        }
        while (--i > 0)

        break;
    }




    let years = grads.years.length
    let months = grads.months.length
    let days = grads.days.length
    let hours = grads.hours.length
    let minutes = grads.minutes.length
    // let gradCnt = 
    let x, y
    
    // years
    do {
      if (years > 0) {
        x = Math.ceil(years / gradCnt)
        y = 0
        while (y < years) {
          grads.current.push(grads.years[y])
          gradCnt--
          y += x
        }
        break
      }
      break
    }
    while (gradsPer > 0)

    // months
    do {
      if (months > 0) {
        x = Math.ceil(months / gradCnt)
        y = 0
        while (y < months) {
          grads.current.push(grads.months[y])
          gradCnt--
          
          y += x
        }
        break
      }
      break
    }
    while (gradsPer > 0)

    // days
    do {
      if (days > 0) {
        x = Math.ceil(days / gradCnt)
        y = 0
        while (y < days) {
          grads.current.push(grads.days[y])
          gradCnt--
          
          y += x
        }
        break
      }
      break
    }
    while (gradsPer > 0)

    // hours
    do {
      if (hours > 0) {
        let d1 = day_start(grads.hours[0][2])
        let hLen = grads.hours.length
        let d2 = day_start(grads.hours[hLen-1][2]) + DAY_MS
        let dDiff = timestampDiff.inDays(d1, d2)
        let dGrad = Math.ceil(gradCnt / dDiff)

        if (gradCnt > 0) {
          let tick = Math.ceil(DAY_MS / (dGrad))

          while (d1 < d2) {
            d1 += tick
            grads.current.push([get_hour(d1) + ":00", this.t2Pixel(d1), d1])
            --gradCnt
          }
        }




        // const grad_MS = Math.ceil(DAY_MS / dGrad)

        // // const grad_MS = Math.ceil(this.rangeDuration / gradCnt)
        // while (d1 < grads.hours[0][2]) { d1 += grad_MS }
        //       i = Math.floor((d1 - grads.hours[0][2]) / this.interval)

        // while (i++ < hours-1 && gradCnt > 0) {
        //   // if (grads.hours[i][2] == day_start(grads.hours[i][2])) {
        //   //   grads.current.push(grads.hours[i])
        //   //   gradCnt--
        //   //   y = x
        //   // }
        //   // else if (y == 0) {
        //   //   grads.current.push(grads.hours[i])
        //   //   gradCnt--
        //   //   y = x
        //   // }

        //   if (y == 0) {
        //     grads.current.push(grads.hours[i])
        //     gradCnt--
        //     y = x
        //   }
        //   --y
        // }


        // let dayCnt = grads.days.length
        // if (dayCnt > 0) {
        //   let step = gradCnt / dayCnt
        //   while (day-- > 0 ) {
  
        //   }
        // }
        // else {
        //   while (y < hours) {
        //     grads.current.push(grads.hours[y])
        //     gradCnt--
        //     y += x
        //   }
        // }
      }
      break
    }
    while (gradsCnt > 0)

    // minutes
    do {
      if (minutes > 0) {
        x = Math.ceil(minutes / gradCnt)
        y = 0
        while (y < minutes) {
          grads.current.push(grads.minutes[y])
          gradCnt--
          
          y += x
        }
        break
      }
      break
    }
    while (gradsPer > 0)

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
