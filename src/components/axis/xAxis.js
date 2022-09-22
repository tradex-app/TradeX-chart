// xAxis.js
// Timeline that lurks down below

import Axis from "./axis";
import { MAXGRADSPER } from "../../definitions/chart";
import { isNumber } from "../../utils/typeChecks";
import { round } from "../../utils/number"
import { 
  ms2TimeUnits, timestampDifference,
  isLeapYear, year_start, get_year, nextYear,
  month_start, get_month, get_monthName,
  get_day, day_start, get_dayName,
  get_hour, hour_start,
  get_minute, minute_start,
  get_second, second_start,
  buildSubGrads,

  SECOND_MS, MINUTE_MS, HOUR_MS, DAY_MS, MONTH_MS, MONTHR_MS, YEAR_MS,
 } from "../../utils/time";
import { XAxisStyle } from "../../definitions/style";

export default class xAxis extends Axis {

  #core
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
    this.#core = this.#parent.mediator.api.core
    this.#xAxisSubGrads = buildSubGrads()
  }

  get core() { return this.#core }
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
  get scrollOffsetPx() { return this.#core.scrollPos % this.candleW }
  get bufferPx() { return this.#core.bufferPx }

  calcWidth() {
    return this.#core.Chart.width - this.#core.Chart.scale.width
  }



  /**
 * return canvas x co-ordinate
 * handles X Axis modes: default, indexed
 * @param {number} ts - chart time stamp
 * @return {number}  
 * @memberof xAxis
 */
  xPos(ts) {
    return (this.range.rangeIndex(ts) * this.candleW) + (this.candleW * 0.5)
  }

  t2Pixel(ts) {
    return this.xPos(ts)
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
    let c = Math.round((x / this.candleW))
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

  initXAxisGrads() {
    this.#xAxisGrads = this.calcXAxisGrads()
  }

  calcXAxisGrads() {
    const rangeStart = this.timeMin
    const rangeEnd = this.timeMax
    const intervalStr = this.intervalStr
    const grads = {values: []}
    const unit = intervalStr.charAt(intervalStr.length - 1)
    const numUnits = parseInt(intervalStr, 10)
    
      let d, m, days, cnt, inc, month, next, t, t1, t2, units, 
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
        t = year_start(t)
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
      let months = units.months
      grads.unit = ["M", "month"]
      grads.timeSpan = `${units.months} months`
      
      t1 = month_start(rangeStart)
      t2 = month_start(rangeEnd) + MONTH_MS(get_month(rangeEnd)) + YEAR_MS
        
      units = timestampDifference(t1, t2)
      major = months
      majorTick = Math.ceil(1 / (this.gradsMax / major))
      minorTick = (months >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major)

      grads.majorTick = majorTick
      grads.minorTick = minorTick
      
      majorValue = (t) => { 
        if (get_month(t) == 0) return get_year(t)
        else return get_monthName(t)
      }
      minorValue = (t) => { 
        if (get_day(t) == 1) return get_monthName(t) 
        else return this.gradsDayName(t) 
      }
      
      t = t1
      inc = Math.round((DAY_MS * 28) / (minorTick + 1))
      grads.inc = inc
      grads.major = []
      grads.minor = []

      while (t < t2) {
        t = month_start(t)
        grads.major.push(t)
        next = t
        for (let i = majorTick; i > 0; i--) {
          next = month_start(next + (DAY_MS * 31))
        }

        if (minorTick > 0 && this.interval < DAY_MS * 28) {
          month = month_start(t + (DAY_MS * 31))
          while (t < month) {
            t = day_start(t + inc)
            if (t >= month) break
            else if (month - t < inc * 0.75) break
            else grads.minor.push(t)
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
        t = day_start(t)
        grads.major.push(t)
        next = t
        for (let i = majorTick; i > 0; i--) {
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
      
      t1 = hour_start(rangeStart)
      t2 = hour_start(rangeEnd) + DAY_MS
        
      units = timestampDifference(t1, t2)
      major = units.hours
      majorTick = Math.ceil(1 / (this.gradsMax / major))
      minorTick = (units.hours >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major)
      
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
        t = hour_start(t)
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
      
      t1 = minute_start(rangeStart)
      t2 = minute_start(rangeEnd) + HOUR_MS
        
      units = timestampDifference(t1, t2)
      major = units.minutes
      majorTick = Math.ceil(this.gradsMax / major)
      minorTick = (units.minutes >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major)
      
      majorValue = (t) => { 
        if (get_minute(t) == 0) return get_hour(t) + ":00"
        else return "00:" + get_minute(t) 
      }
      
      t = t1
      inc = Math.round(MINUTE_MS / (minorTick + 1))
      grads.major = []
      grads.minor = []

      while (t < t2) {
        grads.major.push(t)
        next = t
        for (let i = majorTick; i > -1; --i) {
          next = next + MINUTE_MS
        }

        if (minorTick > 0) {
          while (t < next) {
            t = second_start(t + inc)
            grads.minor.push(t)
          }
        }
        t = next
      }
    }

    // Seconds
    else if (units.seconds > 0) {
      grads.unit = ["s", "second"]
      grads.timeSpan = `${units.seconds} seconds`
      
      t1 = second_start(rangeStart)
      t2 = second_start(rangeEnd) + MINUTE_MS
        
      units = timestampDifference(t1, t2)
      major = units.seconds
      majorTick = Math.ceil(this.gradsMax / major)
      minorTick = (units.seconds >= this.gradsMax - 1) ? 0 : Math.floor(this.gradsMax / major)
      
      majorValue = (t) => { 
        if (get_second(t) == 0) return get_minute(t) + ":00"
        else return "00:" + get_second(t) 
      }
      
      t = t1
  //       inc = Math.round(HOUR_MS / (minorTick + 1))
      grads.major = []
      grads.minor = []

      while (t < t2) {
        grads.major.push(t)
        next = t
        for (let i = majorTick; i > -1; --i) {
          next = next + SECOND_MS
        }

  //         if (minorTick > 0) {
  //           while (t < next) {
  //             t = second_start(t + inc)
  //             grads.minor.push(t)
  //           }
          t = next
        }
    }

    let i = -1
    while (++i < grads.major.length) {
      t = grads.major[i]
      grads.values.push([majorValue(t), this.t2Pixel(t), t, "major"])
    }
    i = -1
    while (++i < grads.minor.length) {
      t = grads.minor[i]
      grads.values.push([minorValue(t), this.t2Pixel(t), t, "minor"])
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

  draw() {
    this.#xAxisGrads = this.calcXAxisGrads()
    this.drawGrads()
    this.drawOverlays()
  }

  drawGrads() {
    this.#parent.layerLabels.scene.clear()

    const grads = this.#xAxisGrads.values
    const ctx = this.#parent.layerLabels.scene.context
    const mid = this.width / this.range.Length * 0.5
    const offset = 0


    ctx.save();
    ctx.strokeStyle = XAxisStyle.COLOUR_TICK
    ctx.fillStyle = XAxisStyle.COLOUR_TICK
    ctx.font = XAxisStyle.FONT_LABEL
    for (let tick of grads) { 
      let w = Math.floor(ctx.measureText(`${tick[0]}`).width * 0.5)
      ctx.fillText(tick[0], tick[1] - w + offset, this.xAxisTicks + 12)

      ctx.beginPath()
      ctx.moveTo(tick[1] + offset, 0)
      ctx.lineTo(tick[1] + offset, this.xAxisTicks)
      ctx.stroke()
    }
      ctx.restore();
  }

  drawOverlays() {
    this.#parent.layerOverlays.scene.clear()

    const grads = this.#xAxisGrads

  }

}
