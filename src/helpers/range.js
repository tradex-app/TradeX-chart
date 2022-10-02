// range.js

import indicators from "../definitions/indicators"
import { DAY_MS, ms2Interval, WEEK_MS } from "../utils/time"
import { LIMITFUTURE, LIMITPAST, MINCANDLES, YAXIS_BOUNDS } from "../definitions/chart"
import { isNumber, isObject } from "../utils/typeChecks"
import { limit } from "../utils/number"

export class Range {

  data
  // dataLength
  #interval
  #intervalStr
  indexStart
  indexEnd
  limitFuture = LIMITFUTURE
  limitPast = LIMITPAST
  minCandles = MINCANDLES
  yAxisBounds = YAXIS_BOUNDS

  constructor( allData, start=0, end=allData.data.length-1, config={}) {
    if (!isObject(allData) || 
        !isObject(config)) return false

    this.limitFuture = (isNumber(this.config?.limitFuture)) ? this.config.limitFuture : LIMITFUTURE
    this.limitPast = (isNumber(this.config?.limitPast)) ? this.config.limitPast : LIMITPAST
    this.minCandles = (isNumber(this.config?.limitCandles)) ? this.config.limitCandles : MINCANDLES
    this.yAxisBounds = (isNumber(this.config?.limitBounds)) ? this.config.limitBounds : YAXIS_BOUNDS

    for (let data in allData) {
      this[data] = allData[data]
    }

    if (!this.set(start, end)) return false

    this.#interval = detectInterval(this.data)
    this.#intervalStr = ms2Interval(this.interval)
  }

  get dataLength () { return this.data.length - 1 }
  get Length () { return this.indexEnd - this.indexStart }
  get timeDuration () { return this.timeFinish - this.timeStart }
  get timeMin () { return this.value(this.indexStart)[0] }
  get timeMax () { return this.value(this.indexEnd)[0] }
  get rangeDuration () { return this.timeMax - this.timeMin }
  get timeStart () { return this.value(0)[0] }
  get timeFinish () { return this.value(this.dataLength)[0] }
  set interval (i) { this.#interval = i }
  get interval () { return this.#interval }
  set intervalStr (i) { this.#intervalStr = i }
  get intervalStr () { return this.#intervalStr }

  set (start=0, end=this.dataLength) {
    if (!isNumber(start) || 
        !isNumber(end)) return false

    // check and correct start and end argument order
    if (start > end) [start, end] = [end, start]
    // minimum range constraint
    if ((end - start) < this.minCandles) end = start + this.minCandles + 1

    // set out of history bounds limits
    start = (start < this.limitPast * -1) ? this.limitPast * -1 : start
    end = (end < (this.limitPast * -1) + this.minCandles) ? (this.limitPast * -1) + this.minCandles + 1 : end
    start = (start > this.dataLength + this.limitFuture - this.minCandles) ? this.dataLength + this.limitFuture - this.minCandles - 1: start
    end = (end > this.dataLength + this.limitFuture) ? this.dataLength + this.limitFuture : end
  
    this.indexStart = start
    this.indexEnd = end

    let maxMin = this.maxMinPriceVol(this.data, this.indexStart, this.indexEnd)
    for (let m in maxMin) {
      this[m] = maxMin[m]
    }
    this.height = this.priceMax - this.priceMin
    this.volumeHeight = this.volumeMax - this.volumeMin
    this.scale = this.Length / this.dataLength

    return true
  }

  /**
   * 
   * @param {number} index - price history index, out of bounds will return null filled entry
   * @returns {array}
   */
  value ( index ) {
    // return last value as default
    if (!isNumber(index)) index = this.data.length - 1
  
    let v = this.data[index]
    if (v !== undefined) return v
    else {
      const len = this.data.length - 1
      v = [null, null, null, null, null, null]
      if (index < 0) {
        v[0] = this.data[0][0] + (this.interval * index)
        return v
      }
      else if (index > len) {
        v[0] = this.data[len][0] + (this.interval * (index - len))
        return v
      }
      else return null
    }
  }

  /**
   * Return time index
   * @param {number} ts - timestamp
   * @returns {number}
   */
   getTimeIndex (ts) {
    if (!isNumber(ts)) return false
    ts = ts - (ts % this.interval)
  
    let x = this.data[0][0]
    if (ts === x) 
      return 0
    else if (ts < x)
      return ((x - ts) / this.interval) * -1
    else 
      return (ts - x) / this.interval
  }

  /**
   * Is timestamp in current range
   * @param {number} t - timestamp
   * @returns {boolean}
   */
  inRange(t) {
    if (t >= this.timeMin && t <= this.timeMax)
      return true
    else return false
  }

  inPriceHistory (ts) { return this.inRange(ts) }
  
  /**
   * Return index offset of timestamp relative to range start
   * @param {number} ts - timestamp
   * @returns {number}
   */
  rangeIndex (ts) { return this.getTimeIndex(ts) - this.indexStart }

  /**
   * Find price maximum and minimum, volume maximum and minimum
   * @param {array} data
   * @param {number} [start=0]
   * @param {number} [end=data.length-1]
   * @return {object}  
   */
  maxMinPriceVol ( data, start=0, end=data.length-1 ) {

    let l = (data.length-1) ? data.length-1 : 0
    let i = limit(start, 0, l)
    let c = limit(end, 0, l)

    let priceMin  = data[i][3]
    let priceMax  = data[i][2]
    let volumeMin = data[i][5]
    let volumeMax = data[i][5]

    while(i++ < c) {
      priceMin  = (data[i][3] < priceMin) ? data[i][3] : priceMin
      priceMax  = (data[i][2] > priceMax) ? data[i][2] : priceMax
      volumeMin = (data[i][5] < volumeMin) ? data[i][5] : volumeMin
      volumeMax = (data[i][5] > volumeMax) ? data[i][5] : volumeMax
    }

    return {
      priceMin: priceMin * (1 - this.yAxisBounds),
      priceMax: priceMax * (1 + this.yAxisBounds),
      volumeMin: volumeMin,
      volumeMax: volumeMax
    }
  }

  /**
   * 
   * @param {number} t 
   * @returns {boolean}
   */
  inPriceHistory (t) {
    if (t >= this.timeStart && t <= this.timeFinish)
      return true
    else return false
  }
} // end class





export function rangeOnchartValue( range, indicator, index ) {
  const len = range.onchart[indicator].length - 1
  const value = null
}

export function rangeOffchartValue( range, indicator, index ) {
}

export function rangeDatasetValue( range, indicator, index ) {
}

/**
 * Detects candles interval
 * @param {array} ohlcv - array of ohlcv values (price history)
 * @returns {number} - milliseconds
 */
export function detectInterval(ohlcv) {

  let len = Math.min(ohlcv.length - 1, 99)
  let min = Infinity
  ohlcv.slice(0, len).forEach((x, i) => {
      let d = ohlcv[i+1][0] - x[0]
      if (d === d && d < min) min = d
  })
  // This saves monthly chart from being awkward
  // if (min >= WEEK_MS * 4 && min <= DAY_MS * 30) {
  //     return DAY_MS * 31
  // }
  return min
}

/**
 * 
 * @param {object} time - time object provided by core
 * @param {number} dateStamp 
 * @returns {number}
 */
export function calcTimeIndex(time, dateStamp) {
  if (!isNumber(dateStamp)) return false

  let index
  let timeFrameMS = time.timeFrameMS
  dateStamp = dateStamp - (dateStamp % timeFrameMS)

  if (dateStamp === time.range.data[0][0])
    index = 0
  else if (dateStamp < time.range.data[0][0]) 
    index = ((time.range.data[0][0] - dateStamp) / timeFrameMS) * -1
  else 
    index = (dateStamp - time.range.data[0][0]) / timeFrameMS

  return index
}
