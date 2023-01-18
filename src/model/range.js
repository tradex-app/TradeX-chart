// range.js

import { DAY_MS, interval2MS, ms2Interval, WEEK_MS } from "../utils/time"
import { DEFAULT_TIMEFRAMEMS, LIMITFUTURE, LIMITPAST, MINCANDLES, MAXCANDLES, YAXIS_BOUNDS } from "../definitions/chart"
import { isNumber, isObject } from "../utils/typeChecks"
import { limit } from "../utils/number"
// import WebWorker from "./webWorkers"
// import WebWorker from "./webWorkers4"

export class Range {

  data
  #interval = DEFAULT_TIMEFRAMEMS
  #intervalStr = "1s"
  indexStart = 0
  indexEnd = LIMITFUTURE
  valueMin = 0
  valueMax = 0
  valueDiff = 0
  volumeMin = 0
  volumeMax = 0
  volumeDiff = 0
  valueMinIdx = 0
  valueMaxIdx = 0
  volumeMinIdx = 0
  volumeMaxIdx = 0
  old = {}
  limitFuture = LIMITFUTURE
  limitPast = LIMITPAST
  minCandles = MINCANDLES
  maxCandles = MAXCANDLES
  yAxisBounds = YAXIS_BOUNDS
  rangeLimit = LIMITFUTURE
  anchor
  #core
  #worker
  #init = true

  constructor( allData, start=0, end=allData.data.length-1, config={}) {
    if (!isObject(allData)) return false
    if (!isObject(config)) return false
    if (!(config?.core?.constructor.name == "TradeXchart")) return false

    this.#init = true
    this.limitFuture = (isNumber(this.config?.limitFuture)) ? this.config.limitFuture : LIMITFUTURE
    this.limitPast = (isNumber(this.config?.limitPast)) ? this.config.limitPast : LIMITPAST
    this.minCandles = (isNumber(this.config?.minCandles)) ? this.config.minCandles : MINCANDLES
    this.maxCandles = (isNumber(this.config?.maxCandles)) ? this.config.maxCandles : MAXCANDLES
    this.yAxisBounds = (isNumber(this.config?.limitBounds)) ? this.config.limitBounds : YAXIS_BOUNDS
    this.#core = config.core

    const MaxMinPriceVolStr = `
    (input) => {
      return maxMinPriceVol(input)
    }
    function ${this.maxMinPriceVol.toString()}
  `
    this.#worker = this.#core.worker.create("range", MaxMinPriceVolStr, undefined, this.#core)

    const tf = config?.interval || DEFAULT_TIMEFRAMEMS

    if (allData.data.length == 0) {
      let ts = Date.now()
      start = 0
      end = this.rangeLimit
      this.#interval = tf
      this.#intervalStr = ms2Interval(this.interval)
      this.anchor = ts - (ts % tf) // - (this.limitPast * this.#interval)
    }  
    else if (allData.data.length < 2) {
      this.#interval = tf
      this.#intervalStr = ms2Interval(this.interval)
    }
    else if (end == 0 && allData.data.length >= this.rangeLimit)
      end = this.rangeLimit
    else if (end == 0)
      end = allData.data.length
    
    for (let data in allData) {
      this[data] = allData[data]
    }

    if (!this.set(start, end)) return false

    if (allData.data.length > 2) {
      this.#interval = detectInterval(this.data)
      this.#intervalStr = ms2Interval(this.interval)
    }

    // for (let i of this?.offChart) {
    //   i.valueMin = 0
    //   i.valueMax = 100
    //   i.valueDiff = 100
    // }

  }

  get dataLength () { return (this.data.length == 0) ? 0 : this.data.length - 1 }
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

  end() {
    WebWorker.destroy(this.#worker.ID)
  }

  set (start=0, end=this.dataLength, max=this.maxCandles) {
    if (!isNumber(start) || 
        !isNumber(end) ||
        !isNumber(max)) return false
    // integer guard, prevent decimals
    start = Math.floor(start)
    end = Math.ceil(end)
    max = Math.ceil(max)

    // check and correct start and end argument order
    if (start > end) [start, end] = [end, start]
    // range length constraint
    end = limit(end, start + this.minCandles, start + max)
    // set out of history bounds limits
    start = limit(start, this.limitPast * -1,  this.dataLength + this.limitFuture - this.minCandles - 1)
    end = limit(end, (this.limitPast * -1) + this.minCandles + 1, this.dataLength + this.limitFuture)
  
    const newStart = start
    const newEnd = end
    const oldStart = this.indexStart
    const oldEnd = this.indexEnd
      let inOut = this.Length

    this.indexStart = start
    this.indexEnd = end

    inOut -= this.Length

    if (this.#init) {
      this.#init = false
      let maxMin = this.maxMinPriceVol({data: this.data, start: this.indexStart, end: this.indexEnd, that: this})
      
      this.setMaxMin(maxMin)

      return true
    }

    // use web worker after init
    this.#worker.postMessage({data: this.data, start: start, end: end, that: this})
    .then(maxMin => {
      this.setMaxMin(maxMin)

      if (this.old.priceMax != this.priceMax || this.old.priceMin != this.priceMin) {
        this.#core.emit("range_priceMaxMin", [this.priceMax, this.priceMin])
      }

      this.#core.emit("setRange", [newStart, newEnd, oldStart, oldEnd])
      this.#core.emit("scrollUpdate")
      this.#core.emit("chart_zoom", [newStart, newEnd, oldStart, oldEnd, inOut])
      this.#core.emit(`chart_zoom_${inOut}`, [newStart, newEnd, oldStart, oldEnd])
    })
    
    return true
  }

  setMaxMin(maxMin) {
    for (let m in maxMin) {
      this.old[m] = this[m]
      this[m] = maxMin[m]
    }
    this.scale = (this.dataLength != 0) ? this.Length / this.dataLength : 1
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

      if (this.data.length < 1) {
        v[0] = Date.now() + (this.interval * index)
        return v
      }
      else if (index < 0) {
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
  
    let x = (this.data.length > 0) ? this.data[0][0] : this.anchor
    if (ts === x) 
      return 0
    else if (ts < x)
      return ((x - ts) / this.interval) * -1
    else 
      return (ts - x) / this.interval
  }

  /**
   * Is timestamp in current range including future and past legal bounds
   * @param {number} t - timestamp
   * @returns {boolean}
   */
  inRange(t) {
    return (t >= this.timeMin && t <= this.timeMax) ? true : false
  }

  /**
   * Is timestamp in current range only, excluding future and past legal bounds
   * @param {number} t 
   * @returns {boolean}
   */
  inPriceHistory (t) {
    return (t >= this.timeStart && t <= this.timeFinish) ? true : false
  }

  inRenderRange (t) {
    let i = this.getTimeIndex(t)
    let o = this.#core.rangeScrollOffset
    return (i >= this.indexStart - o && i <= this.indexEnd + o) ? true : false
  }
  
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
   maxMinPriceVol ( input ) {
// console.time()
    let {data, start, end, that} = {...input}

    start = (typeof start === "number")? start : 0
    end = (typeof end === "number")? end : data?.length-1

    if (data.length == 0) {
      return {
        valueMin: 0,
        valueMax: 1,
        volumeMin: 0,
        volumeMax: 0,
        valueMinIdx: 0,
        valueMaxIdx: 0,
        volumeMinIdx: 0,
        volumeMaxIdx: 0,
      }
    }
    let l = data.length - 1
    let i = limit(start, 0, l)
    let c = limit(end, 0, l)

    let valueMin  = data[i][3]
    let valueMax  = data[i][2]
    let volumeMin = data[i][5]
    let volumeMax = data[i][5]

    let valueMinIdx  = i
    let valueMaxIdx  = i
    let volumeMinIdx = i
    let volumeMaxIdx = i

    while(i++ < c) {
      if (data[i][3] < valueMin) {
        valueMin = data[i][3]
        valueMinIdx = i
      }
      if (data[i][2] > valueMax) {
        valueMax = data[i][2]
        valueMaxIdx = i
      }
      if (data[i][5] < volumeMin) {
        volumeMin = data[i][5]
        volumeMinIdx = i
      }
      if (data[i][5] > volumeMax) {
        volumeMax = data[i][5]
        volumeMaxIdx = i
      }
    }
// console.timeEnd()

    valueMin *= (1 - that.yAxisBounds)
    valueMax *= (1 + that.yAxisBounds)
    return {
      valueMin: valueMin,
      valueMax: valueMax,
      valueDiff: valueMax - valueMin,
      volumeMin: volumeMin,
      volumeMax: volumeMax,
      volumeDiff: volumeMax - volumeMin,

      valueMinIdx: valueMinIdx,
      valueMaxIdx: valueMaxIdx,
      volumeMinIdx: volumeMinIdx,
      volumeMaxIdx: volumeMaxIdx,
    }

    function limit(val, min, max) {
      return Math.min(max, Math.max(min, val));
    }
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
 * Calculate the index for a given time stamp
 * @param {object} time - time object provided by core
 * @param {number} timeStamp 
 * @returns {number}
 */
export function calcTimeIndex(time, timeStamp) {
  if (!isNumber(timeStamp)) return false

  let index
  let timeFrameMS = time.timeFrameMS
  timeStamp = timeStamp - (timeStamp % timeFrameMS)

  if (timeStamp === time.range.data[0][0])
    index = 0
  else if (timeStamp < time.range.data[0][0]) 
    index = ((time.range.data[0][0] - timeStamp) / timeFrameMS) * -1
  else 
    index = (timeStamp - time.range.data[0][0]) / timeFrameMS

  return index
}
