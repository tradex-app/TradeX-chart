// range.js

import indicators from "../definitions/indicators"
import { DAY_MS, ms2Interval, WEEK_MS } from "../utils/time"
import { LIMITFUTURE, LIMITPAST, MINCANDLES, YAXIS_BOUNDS } from "../definitions/chart"
import { isNumber, isObject } from "../utils/typeChecks"
import { limit } from "../utils/number"

const config = {
  limitFuture: LIMITFUTURE,
  limitPast: LIMITPAST,
  minCandles: MINCANDLES,
  yAxisBounds: YAXIS_BOUNDS
}

export function getRange( allData, start=0, end=allData.data.length-1, config ) {
  return new Range( allData, start, end, config )
}

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
  config = config

  constructor( allData, start=0, end=allData.data.length-1, config={}) {
    if (!isObject(allData) || 
        !isNumber(start) || 
        !isNumber(end) || 
        !isObject(config)) return false

    this.config = {...this.config, ...config}

    for (let data in allData) {
      this[data] = allData[data]
    }
    // this.dataLength = this.data.length - 1

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
    // this.Length = this.indexEnd - this.indexStart
    // this.timeDuration = this.timeFinish - this.timeStart
    // this.timeMin = this.value(this.indexStart)[0]
    // this.timeMax = this.value(this.indexEnd)[0]
    // this.rangeDuration = this.timeMax - this.timeMin
    this.#interval = this.data[1][0] - this.data[0][0]
    this.#intervalStr = ms2Interval(this.interval)

    let maxMin = this.maxMinPriceVol(this.data, this.indexStart, this.indexEnd)
    for (let m in maxMin) {
      this[m] = maxMin[m]
    }
    this.height = this.priceMax - this.priceMin
    this.volumeHeight = this.volumeMax - this.volumeMin
    this.scale = this.Length / this.dataLength
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

  value (index) { return rangeValue(index, this)}
  index (ts) { return getTimeIndex(ts, this) }
  inRange (ts) { return inRange(ts, this) }
  inPriceHistory (ts) { return inRange(ts, this) }
  rangeIndex (ts) { return getTimeIndex(ts, this) - this.indexStart }

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
}

export function inPriceHistory(t, range) {
  if (t >= range.timeStart && t <= range.timeFinish)
    return true
  else return false
}

export function inRange(t, range) {
  if (t >= range.timeMin && t <= range.timeMax)
    return true
  else return false
}

export function rangeValue( index, range ) {
  // return last value as default
  if (!isNumber(index)) index = range.data.length - 1

  let v = range.data[index]
  if (v !== undefined) return v
  else {
    const len = range.data.length - 1
    v = [null, null, null, null, null, null]
    if (index < 0) {
      v[0] = range.data[0][0] + (range.interval * index)
      return v
    }
    else if (index > len) {
      v[0] = range.data[len][0] + (range.interval * (index - len))
      return v
    }
    else return null
  }
}

export function rangeOnchartValue( range, indicator, index ) {
  const len = range.onchart[indicator].length - 1
  const value = null
}

export function rangeOffchartValue( range, indicator, index ) {
}

export function rangeDatasetValue( range, indicator, index ) {
}

// Detects candles interval
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

export function getTimeIndex(ts, r) {
  if (!isNumber(ts)) return false
  ts = ts - (ts % r.interval)

  let x = r.data[0][0]
  if (ts === x) 
    return 0
  else if (ts < x)
    return ((x - ts) / r.interval) * -1
  else 
    return (ts - x) / r.interval
}

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
