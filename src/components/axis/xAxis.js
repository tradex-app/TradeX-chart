// xAxis.js
// Timeline that lurks down below

import Axis from "./axis";
import { MAXGRADSPER, TIMEUNITS, TIMEINCS } from "../../definitions/chart";
import { isNumber } from "../../utils/typeChecks";
import { round } from "../../utils/number"
import { nearestArrayValue } from "../../utils/utilities";
import { 
  ms2TimeUnits, ms2Interval, monthDayCnt, timestampDiff, timestampDifference,
  isLeapYear, year_start, get_year, nextYear,
  month_start, get_month, get_monthName, nextMonth,
  get_day, day_start, get_dayName,
  get_hour, hour_start,
  get_minute, minute_start,
  buildSubGrads,

  MINUTE_MS, HOUR_MS, DAY_MS, MONTH_MS, MONTHR_MS, YEAR_MS,
  TIMEUNITSVALUES
 } from "../../utils/time";
import { XAxisStyle } from "../../definitions/style";

export default class xAxis extends Axis {

  #parent
  #chart

  #xAxisTicks = 4
  #xAxisGrads
  #xAxisSubGrads
  #xAxisOffset

  constructor(parent, chart) {
    super()
    this.#chart = chart
    this.#parent = parent 
    this.#xAxisSubGrads = buildSubGrads()
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
  get candleW() { return Math.floor(this.width / this.range.Length) }
  get gradsMax() { return Math.trunc(this.width / MAXGRADSPER) }
      gradsYear(t) { return get_year(t) }
      gradsMonthName(t) { return get_monthName(t) }
      gradsDayName(t) { return get_dayName(t) +" "+ get_day(t) }
      gradsHour(t) { return get_hour(t) + ":00" }
      gradsMinute(t) { return "00:" + get_minute(t) }
  get xAxisRatio() { return this.width / this.range.rangeDuration }
  get xAxisStep() { return this.calcXAxisStep() }
  set xAxisTicks(t) { this.#xAxisTicks = isNumber(t) ? t : 0 }
  get xAxisTicks() { return this.#xAxisTicks }
  get xAxisGrads() { return this.#xAxisGrads }
  get xAxisSubGrads() { return this.#xAxisSubGrads }

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
  const grads = {values: []}
  const unit = intervalStr.charAt(intervalStr.length - 1)
  const numUnits = parseInt(intervalStr, 10)
  
    let days, cnt, inc, next, t, t1, t2, units, 
        major, majorValue, minorValue, minorTick, majorTick;
  
    units = ms2TimeUnits(this.rangeDuration)
    grads.units = ms2TimeUnits(this.rangeDuration)
  
  // Years
  if (units.years > 0) {
    grads.unit = ["y", "year"]
    grads.timeSpan = `${units.years} years`
    
    t1 = year_start(rangeStart)
    t2 = nextYear(year_start(rangeEnd)) + YEAR_MS
      
    units = timestampDifference(t1, t2)
    major = units.years
    majorTick = Math.ceil(1 / (this.gradsMax / major))
    minorTick = (units.years >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major)
    
    majorValue = (t) => { 
      return get_year(t) 
    }
    minorValue = (t) => { 
      if (get_month(t) == 0) return get_year(t)
      else return get_monthName(t) 
    }
    
    t = t1
    inc = Math.round((YEAR_MS + DAY_MS) / (minorTick + 1))
    grads.major = []
    grads.minor = []

    while (t < t2) {
      grads.major.push(t)
      next = t
      for (let i = majorTick; i > -1; --i) {
        next = nextYear(next)
      }

      if (minorTick > 0 && this.interval < YEAR_MS) {
        while (t < next) {
          t = month_start(t + inc)
          grads.minor.push(t)
        }
      }
      t = next
    }
  }
    
  // Months
  else if (units.months > 0) {
    grads.unit = ["M", "month"]
    grads.timeSpan = `${units.months} months`
    
    t1 = month_start(rangeStart)
    t2 = month_start(rangeEnd) + MONTH_MS(get_month(rangeEnd)) + YEAR_MS
      
    units = timestampDifference(t1, t2)
    major = units.months
    majorTick = Math.ceil(1 / (this.gradsMax / major))
    minorTick = (units.months >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major)

    console.log("minorTick:",minorTick)
    console.log("majorTick:",majorTick)
    
    majorValue = (t) => { 
      if (get_month(t) == 0) return get_year(t)
      else return get_monthName(t)
    }
    minorValue = (t) => { 
      if (get_day(t) == 1) return get_monthName(t) 
      else return this.gradsDayName(t) 
    }
    
    t = t1
    inc = Math.round((MONTHR_MS + DAY_MS) / (minorTick + 1))
    grads.major = []
    grads.minor = []

    while (t < t2) {
      grads.major.push(t)
      next = t
      for (let i = majorTick; i > -1; --i) {
        next = nextMonth(t)
      }

      if (minorTick > 0 && this.interval < DAY_MS * 28) {
        while (t < next) {
          console.log(`t: ${t}, next: ${next}, inc: ${inc}`)

          t = day_start(t + inc)
          grads.minor.push(t)
        }
      }
      t = next
    }
  }
  
  // Days
  else if (units.weeks > 0 || units.days > 0) {
    days = units.weeks * 7 + units.days

    grads.unit = ["d", "day"]
    grads.timeSpan = `${days} days`
    
    t1 = day_start(rangeStart)
    t2 = day_start(rangeEnd) + MONTHR_MS
      
    units = timestampDifference(t1, t2)
    major = days
    majorTick = Math.ceil(1 / (this.gradsMax / major))
    minorTick = (days >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major)

    console.log("minorTick:",minorTick)
    console.log("majorTick:",majorTick)
    
    majorValue = (t) => { 
      if (get_month(t) == 0 && get_day(t) == 1) return get_year(t)
      else if (get_day(t) == 1) return get_monthName(t)
      else return this.gradsDayName(t) // null
      // else if (unit == "h") return get_hour(t) + ":00" 
    }
    minorValue = (t) => { 
      if (get_day(t) == 1) return get_monthName(t)
      else if (get_hour(t) == 0) return this.gradsDayName(t) // null
      else return get_hour(t) + ":00" 
    }
    
    t = t1
    inc = Math.round(DAY_MS / (minorTick + 1))
    grads.major = []
    grads.minor = []

    while (t < t2) {
      grads.major.push(t)
      next = t
      for (let i = majorTick; i > -1; --i) {
        next = next + DAY_MS
      }

      if (minorTick > 0 && this.interval < DAY_MS) {
        while (t < next) {
          t = hour_start(t + inc)
          grads.minor.push(t)
        }
      }
      t = next
    }
  }
  
  // Hours
  else if (units.hours > 0) {
    grads.unit = ["h", "hour"]
    grads.timeSpan = `${units.hours} hours`
    
    t1 = day_start(rangeStart)
    t2 = day_start(rangeEnd) + DAY_MS
      
    units = timestampDifference(t1, t2)
    major = units.hours
    majorTick = Math.ceil(1 / (this.gradsMax / major))
    minorTick = (units.hours >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major)

    console.log("minorTick:",minorTick)
    console.log("majorTick:",majorTick)
    
    majorValue = (t) => { 
      if (get_hour(t) == 0) return this.gradsDayName(t)
      else if (get_minute(t) == 0) return get_hour(t) + ":00"
      else return "00:" + get_minute(t)
    }
    minorValue = (t) => { 
        if (get_minute(t) == 0) return get_hour(t) + ":00"
        else return "00:" + get_minute(t) 
    }
    
    t = t1
    inc = Math.round(HOUR_MS / (minorTick + 1))
    grads.major = []
    grads.minor = []

    while (t < t2) {
      grads.major.push(t)
      next = t
      for (let i = majorTick; i > -1; --i) {
        next = next + HOUR_MS
      }

      if (minorTick > 0 && this.interval < HOUR_MS) {
        while (t < next) {
          t = minute_start(t + inc)
          grads.minor.push(t)
        }
      }
      t = next
    }
  }
  
  // Minutes
  else if (units.minutes > 0) {
    grads.unit = ["m", "minute"]
    grads.timeSpan = `${units.minutes} minutes`
    
    t1 = day_start(rangeStart)
    t2 = day_start(rangeEnd) + HOUR_MS
      
    units = timestampDifference(t1, t2)
    major = units.minutes
    majorTick = Math.ceil(this.gradsMax / major)
    minorTick = (units.minutes >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major)
    
    majorValue = (t) => { 
      if (get_minute(t) == 0) return get_hour(t) + ":00"
      else return "00:" + get_minute(t) 
    }
    
    t = t1
//       inc = Math.round(HOUR_MS / (minorTick + 1))
    grads.major = []
    grads.minor = []

    while (t < t2) {
      grads.major.push(t)
      next = t
      for (let i = majorTick; i > -1; --i) {
        next = next + MINUTE_MS
      }

//         if (minorTick > 0) {
//           while (t < next) {
//             t = second_start(t + inc)
//             grads.minor.push(t)
//           }
        t = next
      }
    }
//       grads.values = [...grads.major, ...grads.minor]  

  let i = -1
  while (++i < grads.major.length) {
    t = grads.major[i]
    grads.values.push([majorValue(t), this.t2Pixel(t), t])
  }
  i = -1
  while (++i < grads.minor.length) {
    t = grads.minor[i]
    grads.values.push([minorValue(t), this.t2Pixel(t), t])
  }

  return grads
}




  calcXAxisGrads2() {
    const rangeStart = this.timeMin
    const rangeEnd = this.timeMax
    const intervalStr = this.intervalStr
    const grads = {values: []}
    const unit = intervalStr.charAt(intervalStr.length - 1)
    // const units = ms2TimeUnits(this.rangeDuration)
    const numUnits = parseInt(intervalStr, 10)
      let unitCnt = numUnits
      let gradCnt = this.gradsMax
      // let push = false
      let i
      let t1, t2, 
      major, minor, 
      majorInc, minorInc,
      majorTick, minorTick, isMinorTick, 
      majorValue, minorValue, 
      diff, inc, units;
      // i = units.hours / unitCnt
      units = ms2TimeUnits(this.rangeDuration)
      grads.units = units

    // Years
    if (units.years > 0) {
      grads.unit = ["y", "year"]
      grads.sub = ["M", "month"]
      grads.timeSpan = `${units.years} years`
      console.log("units.years:",units.years)

      t1 = year_start(rangeStart)
      t2 = year_start(rangeEnd) + YEAR_MS + DAY_MS
      if (!isLeapYear(t2)) t2 - DAY_MS
      units = timestampDifference(t1, t2)
      major = units.years
      minor = units.months
      majorTick = Math.ceil(gradCnt / major)
      minorTick = gradCnt - majorTick
      majorInc = (t) => { 
        return (isLeapYear(t))? (YEAR_MS * majorTick) + DAY_MS : YEAR_MS * majorTick
      }
      minorInc = (t) => { 
        let i = majorTick + 1
            inc = 0
        while(--i > 0) {
          inc = MONTH_MS(get_month(t1 + inc))
        }
        return inc
      }
      majorValue = (t) => { 
        return get_year(t) 
      }
      minorValue = (t) => { 
        if (get_month(t) == 0) return get_year(t)
        else return get_monthName(t) 
      }
      isMinorTick = (t) => { 
        if (unit == "M" ) return true
        // return true
      }

    }

    // Months
    else if (units.months > 0) {
      grads.unit = ["M", "month"]
      grads.sub = ["d", "day"]
      grads.timeSpan = `${units.months} months`
      console.log("units.months:",units.months)

      t1 = month_start(rangeStart)
      t2 = month_start(rangeEnd) + MONTH_MS(get_month(rangeEnd))
      units = timestampDifference(t1, t2)
      major = units.months
      minor = units.weeks * 7 + units.days
      majorTick = round(gradCnt / major, 2)
      minorTick = gradCnt - majorTick
      majorInc = (t) => { 
        let i = Math.ceil(majorTick)
            inc = 0
        while(--i > 0) {
          inc = MONTH_MS(get_month(t1 + inc))
        }
        inc = inc / majorTick
        let r = (this.interval < DAY_MS) ? DAY_MS : this.interval
        return inc - (inc % r)
      }
      minorInc = (t) => {  
        inc = Math.ceil(MONTH_MS(get_month(t1)) / (minorTick + 1))
        return ms2TimeUnits(inc).d * DAY_MS
      }
      majorValue = (t) => { 
        if (get_month(t) == 0) return get_year(t)
        else if (get_day(t) == 1) return get_monthName(t)
        else if (unit == "d" || unit == "h" || unit == "m") 
          return this.gradsDayName(t) 
      }
      minorValue = (t) => { 
        if (get_day(t) == 1) return get_monthName(t) 
        else return this.gradsDayName(t) 
      }
      isMinorTick = (t) => { 
        if (unit == "d" ) return true
      }
    }

    // Days
    else if (units.weeks > 0 || units.days > 0) {
      grads.unit = ["d", "day"]
      grads.sub = ["h", "hour"]
      grads.timeSpan = `${units.weeks * 7 + units.days} days`
      console.log("units.days:",units.weeks * 7 + units.days)

      t1 = day_start(rangeStart)
      t2 = day_start(rangeEnd) + DAY_MS
      units = timestampDifference(t1, t2)
      major = units.weeks * 7 + units.days
      minor = units.hours
      majorTick = round(gradCnt / major, 2)
      minorTick = gradCnt - majorTick

      diff = timestampDiff.inDays(t1, t2) / gradCnt
      if (diff > this.gradsMax / 4) diff = diff - (diff % numUnits)
      diff = diff * DAY_MS

      majorInc = (t) => {  

        return diff

        // inc = DAY_MS / majorTick
        // let r = (this.interval < HOUR_MS) ? HOUR_MS : this.interval
        // return inc - (inc % r)

        // return Math.ceil((t2 - t1) / majorTick)
      }
      // majorInc = (t) => {  
      //   inc = DAY_MS / majorTick
      //   let r = (this.interval < HOUR_MS) ? HOUR_MS : this.interval
      //   return inc - (inc % r)

      //   // return Math.ceil((t2 - t1) / majorTick)
      // }
      minorInc = (t) => {  
        inc = Math.ceil(DAY_MS / (minorTick + 1))
        return ms2TimeUnits(inc).d * HOUR_MS
      }
      majorValue = (t) => { 
        if (get_day(t) == 1) return get_monthName(t)
        else if (get_hour(t) == 0) return this.gradsDayName(t) // null
        else if (unit == "h") return get_hour(t) + ":00" 
      }
      minorValue = (t) => { 
        if (get_day(t) == 1) return get_monthName(t)
        else if (get_hour(t) == 0) return this.gradsDayName(t) // null
        else return get_hour(t) + ":00" 
      }
      isMinorTick = (t) => { 
        if (unit == "h") return true
      }
    }

    // Hours
    else if (units.hours > 0) {
      grads.unit = ["h", "hour"]
      grads.sub = ["m", "minute"]
      grads.timeSpan = `${units.hours} hours`
      console.log("units.hours:",units.hours)

      t1 = hour_start(rangeStart)
      t2 = hour_start(rangeEnd) + HOUR_MS
      units = timestampDifference(t1, t2)
      major = units.hours
      minor = units.minutes
      majorTick = Math.ceil(gradCnt / major)
      minorTick = gradCnt - majorTick

      diff = timestampDiff.inHours(t1, t2) / gradCnt
      console.log("diff:",diff)
      diff = diff - (diff % numUnits)
      console.log("diff:",diff)
      diff = diff * HOUR_MS
      console.log("diff:",diff)


      majorInc = (t) => {  

        return diff

        // return Math.ceil(HOUR_MS / majorTick)

        // return Math.ceil((t2 - t1) / majorTick)
      }
      minorInc = (t) => {  
        return MINUTE_MS * minorTick
      }
      majorValue = (t) => { 
        if (get_hour(t) == 0) return this.gradsDayName(t)
        else if (get_minute(t) == 0) return get_hour(t) + ":00"
        else if (unit == "m") return "00:" + get_minute(t)
      }
      minorValue = (t) => { 
          if (get_minute(t) == 0) return get_hour(t) + ":00"
          else return "00:" + get_minute(t) 
      }
      isMinorTick = (t) => { 
        if (unit == "m" ) return true
      }
    }

    // Minutes
    else if (units.minutes > 0) {
      grads.unit = ["m", "minute"]
      grads.sub = ["m", "minute"]
      grads.timeSpan = `${units.minutes} minutes`
      console.log("units.minutes:",units.minutes)

      t1 = minute_start(rangeStart)
      t2 = minute_start(rangeEnd) + MINUTE_MS
      units = timestampDifference(t1, t2)
      major = units.minutes
      minor = 0
      majorTick = Math.ceil(gradCnt / major)
      minorTick = gradCnt - majorTick
      majorInc = (t) => { 
        return MINUTE_MS * majorTick
      }
      minorInc = (t) => { return 0 }
      majorValue = (t) => { 
        if (get_minute(t) == 0) return get_hour(t) + ":00"
        else return "00:" + get_minute(t) 
      }
      isMinorTick = (t) => { 
        return false
      }
    }

    // while (gradCnt > 0) {
      
      let ideal = this.idealTicks(t1, t2, grads.unit[0])
      let time = t1
          inc = majorInc(time)
          grads.inc = ms2Interval(inc)
        console.log("majorInc:",inc)

      while (time <= rangeEnd && inc > 0) {
        if (time >= rangeStart) {
          let t = nearestArrayValue(time, ideal)[1]
          grads.values.push([majorValue(time), this.t2Pixel(time), time])
        }
        time += majorInc(time)
      }

      // time = t1
      // inc = minorInc(time)
      // while (time <= rangeEnd && inc > 0) {
      //   if (time >= rangeStart && isMinorTick()) {
      //     grads.push([minorValue(time), this.t2Pixel(time), time])
      //   }
      //   console.log("minorInc:",minorInc(time))

      //   time += minorInc(time)
      // }
    // }

    return grads
  }

  // calcXAxisGrads() {
  //   const rangeStart = this.timeMin
  //   const rangeEnd = this.timeMax
  //   const intervalStr = this.intervalStr
  //   const diff = {}
  //   const grads = {years: [], months: [], days: [], hours: [], minutes: [], current: []}
  //     let gradsPer = Math.trunc(this.width / MAXGRADSPER)
  //   const unit = intervalStr.charAt(intervalStr.length - 1)
  //   const numUnits = parseInt(intervalStr, 10)
  //     let unitCnt = numUnits
  //     let gradCnt = gradsPer
  //     let push = false
  //     let i

  //   // process for the minimal time unit (timeframe)
  //   switch(unit) {

  //     // year boundary
  //     case "y":
  //       diff.years = timestampDiff.inYears(rangeStart, rangeEnd)
  //       let year = rangeStart
  //           i = diff.years / numUnits

  //       do {
  //         let yearStart = year_start(year)
  //         let yearValue = get_year(year)

  //         grads.years.push([yearValue, this.t2Pixel(yearStart), yearStart])

  //         // adjust for leap year
  //         for (let i = numUnits; i > 0; i--) {
  //           year += YEAR_MS + DAY_MS
  //           if (!isLeapYear(year)) year -= DAY_MS
  //         }
  //       } 
  //       while (--i > 0)

  //       break;

  //     // month boundary
  //     case "M":
  //       diff.months = timestampDiff.inMonths(rangeStart, rangeEnd)
  //       let month = rangeStart
  //           i = diff.months / numUnits

  //       do {
  //         let monthStart = month_start(month)
  //         let monthValue = get_month(month)

  //         monthValue = (monthValue == 0) ? get_year(month) : get_monthName(month)

  //         grads.months.push([monthValue, this.t2Pixel(monthStart), monthStart])

  //         while (unitCnt++ < numUnits) {
  //           let dayCnt = monthDayCnt[monthValue]
  //           if (isLeapYear(month) && monthValue == 1) ++dayCnt
  //           month += DAY_MS*dayCnt
  //         }
  //         unitCnt = 0
  //       }
  //       while (--i > 0)

  //       break;

  //     // day boundary
  //     case "d":
  //       diff.days = timestampDiff.inDays(rangeStart, rangeEnd)
  //       let day = rangeStart
  //           i = diff.days

  //       do {
  //         let monthValue = get_month(day)
  //         let dayStart = day_start(day)
  //         let dayValue = get_day(day)

  //         if (monthValue == 0 && dayValue == 1) {
  //           dayValue = get_year(day)
  //           push = true
  //         }
  //         else if (dayValue == 1) {
  //           dayValue = get_monthName(day)
  //           push = true
  //         }

  //         // add grad to list if start of time unit count or 
  //         // start of a year or month
  //         if (unitCnt == 0 || push === true) {
  //           // remove last grad if current grad is a new year or month
  //           // and unit count is not finished
  //           if (unitCnt > 0) grads.days.pop()
  //           grads.days.push([get_dayName(dayStart) +" "+ dayValue, this.t2Pixel(dayStart), dayStart])
  //         }
  //         if (++unitCnt == numUnits) unitCnt = 0

  //         day = dayStart + DAY_MS
  //         push = false
  //       }
  //       while (--i > 0)

  //       break;

  //     case "h":
  //       // hour boundary

  //       let t1, t2, 
  //           major, minor, 
  //           majorInc, minorInc,
  //           majorTick, minorTick,
  //           majorValue, minorValue, 
  //           inc, unit;
  //       let units = timestampDifference(rangeStart, rangeEnd)
  //           i = units.hours / unitCnt

  //       // Years
  //       if (units.years > 0) {
  //         t1 = year_start(rangeStart)
  //         t2 = year_start(rangeEnd) + YEAR_MS + DAY_MS
  //         if (!isLeapYear(t2)) t2 - DAY_MS
  //         major = units.years
  //         minor = units.months
  //         majorTick = Math.ceil(gradCnt / major)
  //         minorTick = gradCnt - majorTick
  //         majorInc = (t) => { 
  //           return (isLeapYear(t))? (YEAR_MS * majorTick) + DAY_MS : YEAR_MS * majorTick
  //         }
  //         minorInc = (t) => { 
  //           let i = majorTick + 1
  //               inc = 0
  //           while(--i > 0) {
  //             inc = MONTH_MS(get_month(t1 + inc))
  //           }
  //           return inc
  //         }
  //         majorValue = (t) => { return get_year(t) }
  //         minorValue = (t) => { 
  //           if (get_month(t) == 0) return null
  //           else return get_monthName(t) 
  //         }
  //       }
  //       // Months
  //       else if (units.months > 0) {
  //         t1 = month_start(rangeStart)
  //         t2 = month_start(rangeEnd) + MONTH_MS(get_month(rangeEnd))
  //         major = units.months
  //         minor = units.days
  //         majorTick = Math.ceil(gradCnt / major)
  //         minorTick = gradCnt - majorTick
  //         majorInc = (t) => { 
  //           let i = majorTick
  //               inc = 0
  //           while(--i > 0) {
  //             inc = MONTH_MS(get_month(t1 + inc))
  //           }
  //           return inc
  //         }
  //         minorInc = (t) => {  
  //           inc = Math.ceil(MONTH_MS(get_month(t1)) / (minorTick + 1))
  //           return ms2TimeUnits(inc).d * DAY_MS
  //         }
  //         majorValue = (t) => { 
  //           if (get_month(t) == 0) return get_year(t)
  //           else return get_monthName(t) 
  //         }
  //         minorValue = (t) => { 
  //           if (get_day(t) == 1) return null
  //           else return this.gradsDayName(t) }
  //       }
  //       // Days
  //       else if (units.days > 0) {
  //         t1 = day_start(rangeStart)
  //         t2 = day_start(rangeEnd) + DAY_MS
  //         major = units.days
  //         minor = units.hours
  //         majorTick = Math.ceil(gradCnt / major)
  //         minorTick = gradCnt - majorTick
  //         majorInc = (t) => {  
  //           inc = DAY_MS * majorTick
  //         }
  //         minorInc = (t) => {  
  //           inc = Math.ceil(DAY_MS / (minorTick + 1))
  //           return ms2TimeUnits(inc).d * HOUR_MS
  //         }
  //         majorValue = (t) => { 
  //           if (get_day(t) == 1) return get_monthName(t)
  //           else return this.gradsDayName(t) 
  //         }
  //         minorValue = (t) => { 
  //           if (get_hour(t) == 0) return null
  //           else return get_hour(t) + ":00" 
  //         }
  //       }
  //       // Hours
  //       else if (units.hours > 0) {
  //         t1 = hour_start(rangeStart)
  //         t2 = hour_start(rangeEnd) + HOUR_MS
  //         major = units.hours
  //         minor = units.minutes
  //         majorTick = Math.ceil(gradCnt / major)
  //         minorTick = gradCnt - majorTick
  //         majorInc = (t) => {  
  //           return HOUR_MS * majorTick
  //         }
  //         minorInc = (t) => {  
  //           return MINUTE_MS * minorTick
  //         }
  //         majorValue = (t) => { 
  //           if (get_hour(t) == 0) return this.gradsDayName(t)
  //           else return get_hour(t) + ":00" 
  //         }
  //         minorValue = (t) => { 
  //           if (get_minute(t) == 0) return get_hour(t) + ":00"
  //           else return "00:" + get_minute(t) 
  //         }
  //       }
  //       // Minutes
  //       else if (units.minutes > 0) {
  //         t1 = minute_start(rangeStart)
  //         t2 = minute_start(rangeEnd) + MINUTE_MS
  //         major = units.minutes
  //         minor = 0
  //         majorTick = Math.ceil(gradCnt / major)
  //         minorTick = gradCnt - majorTick
  //         majorInc = (t) => { 
  //           return MINUTE_MS * majorTick
  //          }
  //         minorInc = 0
  //         majorValue = (t) => { 
  //           if (get_minute(t) == 0) return get_hour(t) + ":00"
  //           else return "00:" + get_minute(t) 
  //         }
  //         minorValue = (t) => { return "" }
  //       }
            

  //       do {
  //         let monthValue = get_month(t1)
  //         let dayValue = get_day(t1)
  //         let hourValue = get_hour(t1)
  //         let timeStart = hour_start(t1)

  //         if (monthValue == 0 && dayValue == 1 && hourValue == 0) {
  //           hourValue = get_year(t1)
  //           grads.years.push([hourValue, this.t2Pixel(timeStart), timeStart])
  //           grads.hours.push([hourValue, this.t2Pixel(timeStart), timeStart])

  //           push = true
  //         }
  //         else if (dayValue == 1 && hourValue == 0) {
  //           hourValue = get_monthName(t1)
  //           grads.months.push([hourValue, this.t2Pixel(timeStart), timeStart])
  //           grads.hours.push([hourValue, this.t2Pixel(timeStart), timeStart])

  //           push = true
  //         }
  //         else if (hourValue == 0) {
  //           hourValue = get_dayName(t1) +" "+ get_day(t1) // +" "+ get_monthName(t1)
  //           grads.days.push([hourValue, this.t2Pixel(timeStart), timeStart])
  //           grads.hours.push([hourValue, this.t2Pixel(timeStart), timeStart])

  //           push = true
  //         }
  //         else {
  //           // if (--unitCnt == 0) {
  //             hourValue = hourValue + ":00"
  //             grads.hours.push([hourValue, this.t2Pixel(timeStart), timeStart])
  //             unitCnt = numUnits
  //           // }
  //         }

  //         // add grad to list if start of time unit count or 
  //         // start of a year or month
  //         // if (unitCnt == 0 || push === true) {
  //         //   // if (gradCnt == 0 || push === true) {
  //         //     // remove last grad if current grad is a new year or month
  //         //     // and unit count is not finished
  //         //     if (unitCnt > 0) grads.days.pop()
  //         //     grads.hours.push([hourValue, this.t2Pixel(timeStart)])
  //         //   // }
  //         // }
  //         // if (++unitCnt == numUnits) unitCnt = 0
  //         // if (++gradCnt >= gradsPer) gradCnt = 0

  //         hour = timeStart + this.interval
  //         push = false
  //       }
  //       while (--i > 0)

  //       break;

  //     case "m":
  //       // minute boundary
  //       diff.minutes = timestampDiff.inMinutes(rangeStart, rangeEnd)
  //       let minute = rangeStart
  //           i = diff.days

  //       do {
  //         let monthValue = get_month(minute)
  //         let dayValue = get_day(minute)
  //         let hourValue = get_hour(minute)
  //         let minuteValue = get_minute(minute)
  //         let minuteStart = minute_start(minute)

  //         if (monthValue == 0 && dayValue == 1 && hourValue == 0 && minuteValue == 0) minuteValue = get_year(minute)
  //         else if (dayValue == 1 && hourValue == 0 && minuteValue == 0) minuteValue = get_monthName(minute)
  //         else if (hourValue == 0 && minuteValue == 0) minuteValue = get_day(minute)
  //         else minuteValue = get_hour(minute) + ":" + minuteValue

  //         grads.minutes.push([minuteValue, "00:" + this.t2Pixel(minuteStart), minuteStart])

  //         minute = minuteStart + MINUTE_MS
  //       }
  //       while (--i > 0)

  //       break;
  //   }




  //   let years = grads.years.length
  //   let months = grads.months.length
  //   let days = grads.days.length
  //   let hours = grads.hours.length
  //   let minutes = grads.minutes.length
  //   // let gradCnt = 
  //   let x, y
    
  //   // years
  //   do {
  //     if (years > 0) {
  //       x = Math.ceil(years / gradCnt)
  //       y = 0
  //       while (y < years) {
  //         grads.current.push(grads.years[y])
  //         gradCnt--
  //         y += x
  //       }
  //       break
  //     }
  //     break
  //   }
  //   while (gradsPer > 0)

  //   // months
  //   do {
  //     if (months > 0) {
  //       x = Math.ceil(months / gradCnt)
  //       y = 0
  //       while (y < months) {
  //         grads.current.push(grads.months[y])
  //         gradCnt--
          
  //         y += x
  //       }
  //       break
  //     }
  //     break
  //   }
  //   while (gradsPer > 0)

  //   // days
  //   do {
  //     if (days > 0) {
  //       let M1 = month_start(grads.days[0][2])
  //       let dLen = grads.days.length
  //       let M2 = month_start(grads.days[dLen-1][2]) + MONTH_MS(get_month(grads.days[dLen-1][2]))
  //       let MDiff = timestampDiff.inMonths(M1, M2)
  //       let MGrad = Math.ceil(gradCnt / MDiff)

  //       if (gradCnt > 0) {
  //         let inc = Math.ceil(MONTH_MS(get_month(M1)) / MGrad)
  //             inc = ms2TimeUnits(inc).d * DAY_MS
          
  //         while (M1 < M2) {

  //           M1 += inc
  //           let d = get_day(M1)

  //           if (d != 1 && M1 >= grads.days[0][2]) {
  //             grads.current.push([get_dayName(M1) +" "+ get_day(M1), this.t2Pixel(M1), M1])
  //             --gradCnt
  //           }
  //         }
  //       }

  //       // x = Math.ceil(days / gradCnt)
  //       // y = 0
  //       // while (y < days) {
  //       //   grads.current.push(grads.days[y])
  //       //   gradCnt--
          
  //       //   y += x
  //       // }
  //       // break
  //     }
  //     break
  //   }
  //   while (gradsPer > 0)

  //   // hours
  //   do {
  //     if (hours > 0) {
  //       let d1 = day_start(grads.hours[0][2])
  //       let hLen = grads.hours.length
  //       let d2 = day_start(grads.hours[hLen-1][2]) + DAY_MS
  //       let dDiff = timestampDiff.inDays(d1, d2)
  //       let dGrad = Math.ceil(gradCnt / dDiff)

  //       if (gradCnt > 0) {

  //         while (d1 < d2) {
  //           d1 += Math.ceil(DAY_MS / dGrad)
  //           let hr = get_hour(d1)

  //           if (hr != 0 && hr >= grads.hours[0][2]) {
  //             grads.current.push([hr + ":00", this.t2Pixel(d1), d1])
  //             --gradCnt
  //           }
  //         }
  //       }
  //     }
  //     break
  //   }
  //   while (gradsCnt > 0)

  //   // minutes
  //   do {
  //     if (minutes > 0) {
  //       x = Math.ceil(minutes / gradCnt)
  //       y = 0
  //       while (y < minutes) {
  //         grads.current.push(grads.minutes[y])
  //         gradCnt--
          
  //         y += x
  //       }
  //       break
  //     }
  //     break
  //   }
  //   while (gradsPer > 0)

  //   console.log(grads)

  //   return grads.current

  // }

  idealTicks(t1, t2, unit) {
    let t = t1
    let ticks = []
    do {
      let i = -1
      while (++i < this.#xAxisSubGrads[unit].length) {
        t += this.#xAxisSubGrads[unit][i]
        ticks.push(t)
      }
    }
    while (t < t2)
    return ticks
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

    const grads = this.#xAxisGrads.values
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
