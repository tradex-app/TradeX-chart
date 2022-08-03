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
  get candleW() { return round(this.width / this.range.Length, 1) }
  get gradsMax() { return Math.trunc(this.width / MAXGRADSPER) }
      gradsYear(t) { return get_year(t) }
      gradsMonthName(t) { return get_monthName(t) }
      gradsDayName(t) { return get_dayName(t) +" "+ get_day(t) }
      gradsHour(t) { return get_hour(t) + ":00" }
      gradsMinute(t) { return "00:" + get_minute(t) }
  get xAxisRatio() { return this.width / this.range.rangeDuration }
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
