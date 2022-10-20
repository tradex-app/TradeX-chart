// xAxis.js
// Timeline that lurks down below

import Axis from "./axis";
import { MAXGRADSPER } from "../../definitions/chart";
import { isNumber } from "../../utils/typeChecks";
import { round } from "../../utils/number"
import { 
  ms2TimeUnits, timestampDifference,
  isLeapYear, year_start, get_year, nextYear,
  month_start, get_month, get_monthName, nextMonth,
  get_day, day_start, get_dayName,
  get_hour, hour_start,
  get_minute, minute_start,
  get_second, second_start,
  buildSubGrads,

  SECOND_MS, MINUTE_MS, HOUR_MS, DAY_MS, WEEK_MS, MONTH_MS, MONTHR_MS, YEAR_MS,
 } from "../../utils/time";
import { XAxisStyle } from "../../definitions/style";

export default class xAxis extends Axis {

  #xAxisTicks = 4
  #xAxisGrads
  #xAxisSubGrads

  constructor(parent, chart) {
    super(parent, chart)

    this.#xAxisSubGrads = buildSubGrads()
  }

  get chart() { return this.parent.mediator.api.Chart }
  get core() { return this.chart.core }
  get data() { return this.chart.data }
  get range() { return this.parent.range }
  get theme() { return this.chart.core.theme }
  get width() { return this.calcWidth() }
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
  get scrollOffsetPx() { return this.core.scrollPos % this.candleW }
  get bufferPx() { return this.core.bufferPx }

  calcWidth() {
    return this.core.Chart.width - this.core.Chart.scale.width
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
    let o = this.core.rangeScrollOffset;
    let c = this.range.indexStart - o 
    return c + 1
      + Math.floor((x + (this.core.scrollPos * -1)) / this.candleW) 
  }

  pixelOHLCV(x) {
    let c = this.pixel2Index(x)
    return this.range.value(c)
  }

  xPosSnap2CandlePos(x) {
    let r = this.core.scrollPos % this.candleW
    // let o = (x % this.candleW < this.candleW / 2) ? this.candleW : this.candleW * -1
    let c = Math.floor((x / this.candleW)) // + o
    return  (c * this.candleW) + (this.candleW / 2) // + o

    // return ((this.pixel2Index(x) - this.range.indexStart) 
    //         * this.candleW) - (this.candleW / 2)
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
    const grads = {
      entries: {},
      values: [],
      major: [],
      minor: []
    }
    const unit = intervalStr.charAt(intervalStr.length - 1)
    const numUnits = parseInt(intervalStr, 10)

// return grads

      let days, t1, t2, units, unitStart, 
          majorGrad, majorValue, minorValue;
    
      units = ms2TimeUnits(this.rangeDuration)
      grads.units = ms2TimeUnits(this.rangeDuration)
    
    // Years
    if (units.years > 0) {
            
      t1 = year_start(rangeStart)
      t2 = nextYear(year_start(rangeEnd)) + YEAR_MS

      grads.unit = ["y", "year"]
      grads.timeSpan = `${units.years} years`

      majorGrad = (ts) => { return nextYear(ts) }

      unitStart = (ts) => { return month_start(ts) }

      majorValue = (ts) => { 
        return get_year(ts) 
      }
      minorValue = (ts) => { 
        if (get_month(ts) == 0 && get_day(ts) == 1 && get_hour(ts) == 0) return get_year(ts)
        else return get_monthName(ts) 
      }

      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
      
    // Months
    else if (units.months > 0) {

      t1 = month_start(rangeStart)
      t2 = month_start(rangeEnd) + MONTH_MS(get_month(rangeEnd))// + YEAR_MS

      grads.unit = ["M", "month"]
      grads.timeSpan = `${units.months} months`

      // TODO: optimize nextMonth() - too slow on large rages
      // majorGrad = (ts) => { return nextMonth(ts) }
      majorGrad = (ts) => { return MONTHR_MS }

      unitStart = (ts) => { return day_start(ts) }

      majorValue = (ts) => { 
        if (get_month(ts) == 0) return get_year(ts)
        else return get_monthName(ts)
      }
      minorValue = (ts) => {
        if (get_month(ts) == 0 && get_day(ts) == 1) return get_year(ts)
        if (get_day(ts) == 1 && get_hour(ts) == 0) return get_monthName(ts)
        else return this.gradsDayName(ts) 
      }

      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
    
    // Days
    else if (units.weeks > 0 || units.days > 0) {
      days = units.weeks * 7 + units.days

      t1 = day_start(rangeStart)
      t2 = day_start(rangeEnd) + WEEK_MS

      grads.unit = ["d", "day"]
      grads.timeSpan = `${days} days`

      majorGrad = (ts) => { return DAY_MS }

      unitStart = (ts) => { return hour_start(ts) }

      majorValue = (ts) => { 
        if (get_month(ts) == 0 && get_day(ts) == 1) return get_year(ts)
        else if (get_day(ts) == 1) return get_monthName(ts)
        else return this.gradsDayName(ts) // null
      }
      minorValue = (ts) => { 
        if (get_day(ts) == 1 && get_hour(ts) == 0) return get_monthName(ts)
        else if (get_hour(ts) == 0) return this.gradsDayName(ts)
        else return get_hour(ts) + ":00" 
      }

      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
    
    // Hours
    else if (units.hours > 0) {
      
      t1 = hour_start(rangeStart)
      t2 = hour_start(rangeEnd) + DAY_MS

      grads.unit = ["h", "hour"]
      grads.timeSpan = `${units.hours} hours`

      majorGrad = (ts) => { return HOUR_MS }
        
      unitStart = (ts) => { return minute_start(ts) }

      majorValue = (ts) => {
        if (get_month(ts) == 0 && get_day(ts) == 1 && get_hour(ts) == 0) return get_year(ts)
        else if (get_day(ts) == 1 && get_hour(ts) == 0) return get_monthName(ts)
        else if (get_hour(ts) == 0) return this.gradsDayName(ts)
        else return this.HM(ts)
      }
      minorValue = (ts) => { return this.HM(ts) }

      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
    
    // Minutes
    else if (units.minutes > 0) {
      
      t1 = minute_start(rangeStart)
      t2 = minute_start(rangeEnd) + HOUR_MS

      grads.unit = ["m", "minute"]
      grads.timeSpan = `${units.minutes} minutes`

      majorGrad = (ts) => { return MINUTE_MS }

      unitStart = (ts) => { return second_start(ts) }

      majorValue = (ts) => {
        if (get_month(ts) == 0 && get_day(ts) == 1 && get_hour(ts) == 0 && get_minute(ts) == 0) return get_year(ts)
        else if (get_day(ts) == 1 && get_hour(ts) == 0 && get_minute(ts) == 0) return get_monthName(ts)
        else if (get_hour(ts) == 0 && get_minute(ts) == 0) return this.gradsDayName(ts)
        else return this.HM(ts)
      }
      minorValue = (ts) => { return this.HMS(ts) }

      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }

    // Seconds
    else if (units.seconds > 0) {
      
      t1 = second_start(rangeStart) - MINUTE_MS
      t2 = second_start(rangeEnd) + MINUTE_MS

      grads.unit = ["s", "second"]
      grads.timeSpan = `${units.seconds} seconds`

      majorGrad = (ts) => { return SECOND_MS }
        
      unitStart = (ts) => { return second_start(ts) }

      majorValue = (ts) => {
        if (get_month(ts) == 0 && get_day(ts) == 1 && get_hour(ts) == 0 && get_minute(ts) == 0) return get_year(ts)
        else if (get_day(ts) == 1 && get_hour(ts) == 0 && get_minute(ts) == 0) return get_monthName(ts)
        else if (get_hour(ts) == 0 && get_minute(ts) == 0) return this.gradsDayName(ts)
        else if (get_minute(ts) == 0 && get_second(ts) == 0) return this.HM(ts)
        else return this.MS(ts)
      }
      minorValue = (ts) => { return this.MS(ts) }

      return this.buildGrads(grads, t1, t2, majorGrad, majorValue, minorValue, unitStart)
    }
  }

  buildGrads(grads, t1, t2, majorGrad ,majorValue, minorValue, unitStart) {
    let th, to, min;
    const minorGrad = Math.floor(this.rangeLength / this.gradsMax) * this.range.interval

    while (t1 < t2) {
      to = t1
      grads.entries[t1] = [majorValue(t1), this.t2Pixel(t1), t1, "major"]

      th = t1
      t1 += majorGrad(t1)

      while ((t1 - to) < minorGrad) {
        t1 += majorGrad(t1)
      }

      let x = Math.floor((t1 - to) / minorGrad)
      if (x > 0 ) {
        let y = Math.floor((t1 - to) / x)
        while (th < t1) {
          th += y
          min = unitStart(th)
          grads.entries[min] = [minorValue(min), this.t2Pixel(min), min, "minor"]
        }
      }
    }

    grads.values = Object.values(grads.entries)

    return grads
  }

  gradsWorker() {
    
  }

  HM(t) {
    let h = String(get_hour(t)).padStart(2, '0');
    let m = String(get_minute(t)).padStart(2, '0');
    return `${h}:${m}`
  }

  HMS(t) {
    let h = String(get_hour(t)).padStart(2, '0');
    let m = String(get_minute(t)).padStart(2, '0');
    let s = String(get_second(t)).padStart(2, '0');
    return `${h}:${m}:${s}`
  }

  MS(t) {
    let m = String(get_minute(t)).padStart(2, '0');
    let s = String(get_second(t)).padStart(2, '0');
    return `${m}:${s}`
  }

  draw() {
    this.#xAxisGrads = this.calcXAxisGrads()
    this.drawGrads()
    this.drawOverlays()
  }

  drawGrads() {
    this.parent.layerLabels.scene.clear()

    const grads = this.#xAxisGrads.values
    const ctx = this.parent.layerLabels.scene.context
    const mid = this.width / this.range.Length * 0.5
    const offset = 0
    const theme = this.theme.xAxis

    ctx.save();
    ctx.strokeStyle = theme.colourTick
    ctx.fillStyle = theme.colourTick
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`
    for (let tick of grads) { 
      // ctx.font = (tick[3] == "major") ? XAxisStyle.FONT_LABEL_BOLD : XAxisStyle.FONT_LABEL
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
    this.parent.layerOverlays.scene.clear()

    const grads = this.#xAxisGrads
  }

}
