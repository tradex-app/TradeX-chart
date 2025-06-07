// range.js

import TradeXchart from "../core"
import { interval2MS, isValidTimestamp, ms2Interval, TimeData } from "../utils/time"
import { DEFAULT_TIMEFRAMEMS, LIMITFUTURE, LIMITPAST, MINCANDLES, MAXCANDLES, YAXIS_BOUNDS, INTITIALCNT, DEFAULT_TIMEFRAME } from "../definitions/chart"
import { isArray, isInteger, isNumber, isObject, isString } from "../utils/typeChecks"
import { bRound, limit } from "../utils/number"
import { diff, uid } from "../utils/utilities"
import { SHORTNAME } from "../definitions/core"
// import WebWorker from "./webWorkers"

export class Range {

  #id
  #core
  #state
  #worker
  #init = true
  #indexed = false
  #interval = DEFAULT_TIMEFRAMEMS
  #intervalStr = DEFAULT_TIMEFRAME
  #indexStart = 0
  #indexEnd = LIMITFUTURE
  valueMin = 0
  valueMax = 1
  valueDiff = 1
  volumeMin = 0
  volumeMax = 0
  volumeDiff = 0
  valueMinIdx = 0
  valueMaxIdx = 0
  volumeMinIdx = 0
  volumeMaxIdx = 0
  #secondaryMaxMin = {}
  #old = {}
  #initialCnt = INTITIALCNT
  #limitFuture = LIMITFUTURE
  #limitPast = LIMITPAST
  #minCandles = MINCANDLES
  #maxCandles = MAXCANDLES;
  #yAxisBounds = YAXIS_BOUNDS
  anchor


  /**
   * Creates an instance of Range.
   * @param {number} start - initial index start
   * @param {number} end - initial index end
   * @param {Object} config - range config
   * @param {TradeXchart} config.core
   * @param {State} config.state
   * @param {Number} config.startTS
   * @param {Number} config.interval
   * @param {Number} config.initialCnt
   * @param {Number} config.limitFuture
   * @param {Number} config.limitPast
   * @param {Number} config.minCandles
   * @param {Number} config.maxCandles
   * @param {Number} config.yAxisBounds
   * @memberof Range
   */
  constructor( start, end, config) {
    if (!isObject(config)) {
      throw new Error('Range constructor requires a config object');
    }
    if (!(config?.core instanceof TradeXchart)) {
      throw new Error('Range constructor requires a valid TradeXchart instance');
    }

    this.#id = uid(`${SHORTNAME}_Range`)
    this.#init = true;
    this.setConfig(config)

    let tf;
    if (isInteger(config?.interval)) tf = config.interval
    else if (isString(config?.interval)) tf = interval2MS(config?.interval)
    else tf = DEFAULT_TIMEFRAMEMS

    // no data - use provided time frame / interval
    if (this.data.length == 0) {
      let ts = Date.now();
      start = this.rangeLimit * -2
      end = this.rangeLimit * 2
      this.#interval = tf
      this.#intervalStr = ms2Interval(this.#interval)
      this.anchor = ts - (ts % tf) // - (this.limitPast * this.#interval)
    } 
    // nimimum of two entries to calculate time frame / interval
    else if (this.data.length < 2) {
      this.#interval = tf
      this.#intervalStr = ms2Interval(this.interval)
    }
    // if (this.data.length > 2) {
    else {
      this.#interval = detectInterval(this.data)
      this.#intervalStr = ms2Interval(this.interval)
    }
    
    // use timestamp start if available
/*    if (isValidTimestamp(config?.startTS)) {
      let time = new TimeData(this)
      start = calcTimeIndex(time, config.startTS) || start
    }
*/
    // start sanity check
    if (!isInteger(start) || this.isPastLimit(start))
      start = this.data.length - this.#initialCnt
    // end sanity check
    if (!isInteger(end) || this.isFutureLimit(end))
      end = this.data.length
    // range length sanity check
    if (end - start > this.#maxCandles)
      end = end - ((end - start) - this.#maxCandles)

    // adjust range end if out of bounds
    if (end == 0 && this.data.length >= this.rangeLimit)
      end = this.rangeLimit
    else if (end == 0)
      end = this.data.length

    this.set(start, end)

    const MaxMinPriceVolStr = `
    (input) => {
      return maxMinPriceVol(input)
    }
    function ${this.maxMinPriceVol.toString()}
  `
    // this.#worker = this.#core.worker.create(MaxMinPriceVolStr, "range")

  }

  get id () { return this.#id }
  get core() { return this.#core }
  get allData () { return this.#state.allData }
  get data () { return this.allData?.data || [] }
  get dataLength () { return (!!this.allData?.data.length) ? this.allData.data.length - 1 : 0 }
  get Length () { return this.indexEnd - this.indexStart }
  get timeDuration () { return this.timeFinish - this.timeStart }
  get timeMin () { return this.value(this.indexStart)[0] }
  get timeMax () { return this.value(this.indexEnd)[0] }
  get rangeDuration () { return this.timeMax - this.timeMin }
  get timeStart () { return this.value(0)[0] }
  get timeFinish () { return this.value(this.dataLength)[0] }
  get interval () { return this.#interval }
  get intervalStr () { return this.#intervalStr }
  get timeFrame () { return this.#intervalStr }
  get timeFrameMS () { return this.#interval }
  get indexStart () { return this.#indexStart }
  get indexEnd () { return this.#indexEnd }
  get indexed () { return this.#indexed }
  get indexEndTS() { return this.value(this.indexEnd)[0] }
  get indexStartTS() { return this.value(this.indexStart)[0] }
  get indexPastLimit () { return this.limitPast * -1 }
  get indexFutureLimit () { return this.dataLength + this.limitFuture - 1 }
  set initialCnt (c) { if (isInteger(c)) this.#initialCnt = c }
  get initialCnt () { return this.#initialCnt }
  get limitFuture () { return this.#limitFuture }
  get limitPast () { return this.#limitPast }
  get minCandles () { return this.#minCandles }
  get maxCandles () { return this.#maxCandles }
  get yAxisBounds () { return this.#yAxisBounds }
  get rangeLimit () { return this.#limitFuture }
  get secondaryMaxMin () { return this.#secondaryMaxMin }
  get diff () { return this?.valueDiff }

  end() {
    // WebWorker.destroy(this.#worker.id)
  }

  isFutureLimit(idx=this.indexEnd) {
    if (!isInteger(idx)) return
    return (idx > this.indexFutureLimit)
  }

  isPastLimit(idx=this.indexStart) {
    if (!isInteger(idx)) return
    return (idx < this.indexPastLimit)
  }

  isValidTimestamp(ts, msg) {
    if (isValidTimestamp(ts)) return true
    this.#core.warn(`Range.${msg}: invalid timestamp`);
    return false
  }

  isValidDataset(id, msg) {
    let isValid = !isString(id) || !this.hasDataByID(id)
    if (isValid) {
      this.#core.warn(`Range.${msg}: id ${id} is invalid, no dataset exists.`);
    }
    return !isValid
  }

  /**
   * set Range index start and end
   * @param {number} [start=this.indexStart]
   * @param {number} [end=this.indexEnd]
   * @param {number} [max=this.maxCandles]
   * @returns {boolean} - success or failure
   * @memberof Range
   */
  set (start=this.indexStart, end=this.indexEnd, max=this.maxCandles) {
    if (!isInteger(start) || 
        !isInteger(end) ||
        !isInteger(max)) return false
    // integer guard, prevent decimals
    start = start | 0
    end = end | 0
    max = max | 0
    max = limit( max, this.minCandles, this.maxCandles )

    // check and correct start and end argument order
    if (start > end) [start, end] = [end, start]
    // constrain range length
    end = limit(end, start + this.minCandles, start + max)
    let len = end - start
    // constrain range start
    start = limit(start, this.limitPast * -1,  this.dataLength + this.limitFuture - this.minCandles - 1)
    // constrain range end
    end = limit(end, start + this.minCandles, this.dataLength + this.limitFuture - 1)
    start = (end - start < len) ? start - (len - (end - start)) : start
  
    const newStart = start
    const newEnd = end
    const oldStart = this.indexStart
    const oldEnd = this.indexEnd
      let inOut = this.Length

    this.#indexStart = start
    this.#indexEnd = end

    inOut -= this.Length

    this.setMaxCandles(max)
    this.setAllMaxMin()

    if (this.#init || this.#old.valueMax != this.valueMax || this.#old.valueMin != this.valueMin) {
      this.#core.emit("range_valueMaxMin", {max: this.valueMax, min: this.valueMin})
    }

    this.#core.emit("range_set", [newStart, newEnd, oldStart, oldEnd])

    // if (this.#init) this.#init = false

    return true

    // use web worker after init
    // this.#worker.postMessage({data: this.data, start: start, end: end, that: this})
    // .then(maxMin => {
    //   this.setMaxMin(maxMin)

    //   if (this.#old.priceMax != this.priceMax || this.#old.priceMin != this.priceMin) {
    //     this.#core.emit("range_priceMaxMin", [this.priceMax, this.priceMin])
    //   }

    //   this.#core.emit("range_set", [newStart, newEnd, oldStart, oldEnd])
    //   this.#core.emit("chart_zoom", [newStart, newEnd, oldStart, oldEnd, inOut])
    //   this.#core.emit(`chart_zoom_${inOut}`, [newStart, newEnd, oldStart, oldEnd])
    // })
    
    // return true
  }

  /**
   * Configure Range
   * @param {Object} config 
   * @param {TradeXchart} config.core
   * @param {State}  config.state
   * @param {Number} config.initialCnt
   * @param {Number} config.limitFuture
   * @param {Number} config.limitPast
   * @param {Number} config.minCandles
   * @param {Number} config.maxCandles
   * @param {Number} config.yAxisBounds
   * @returns 
   */
  setConfig(config) {
    let state = config?.state
    // if ((state?.constructor?.name != `State`)) throw new Error(`Range requires a valid State`)
    this.#state = state
    let core = config?.core
    if (!(core instanceof TradeXchart)) throw new Error(`Range requires a valid TradeXchart instance`)
    this.#core = core
    let initialCnt = (isInteger(config?.initialCnt)) ? config.initialCnt : INTITIALCNT;
    this.#initialCnt = this.#core.config?.range?.initialCnt || initialCnt
    this.#limitFuture = (isInteger(config?.limitFuture)) ? config.limitFuture : LIMITFUTURE;
    this.#limitPast = (isInteger(config?.limitPast)) ? config.limitPast : LIMITPAST;
    this.#yAxisBounds = (isNumber(config?.yAxisBounds)) ? config.yAxisBounds : YAXIS_BOUNDS;
    this.#minCandles = (isInteger(config?.minCandles)) ? config.minCandles : MINCANDLES;
    this.setMaxCandles(config?.maxCandles)
  }

  setMaxCandles ( max ) {
    let maxCandles = 
      this.#core?.MainPane?.graph?.width || 
      Math.floor(this.#core?.parentElement?.clientWidth) || 
      MAXCANDLES;
    this.#maxCandles = (isInteger(max)) ? max : maxCandles;
  }

  setMaxMin ( maxMin ) {
    for (let m in maxMin) {
      this.#old[m] = this[m]
      this[m] = maxMin[m]
    }
    this.scale = (this.dataLength != 0) ? this.Length / this.dataLength : 1
  }

  /**
   * return value at index
   * @param {number} index - price history index, out of bounds will return null filled entry
   * @param {string} id - defaults to returning chart price history 
   * @returns {array|null}
   */
  value ( index, id="chart" ) {
    if (!isString(id)) {
      this.#core.warn(`Range.value: id must be a string. Instead received typeOf ${typeof id}`);
      return null;
    }
    
    const data = this.getDataById(id);
    if (!data) {
      this.#core.warn(`Range.value: no data exists for id: ${id}`);
      return null;
    }
    // return last value as default
    if (!isInteger(index)) index = data.length - 1
  
    let v = data[index]
    if (v !== undefined) return v
    else {
      const len = data.length - 1
      v = [null, null, null, null, null, null]

      if (data.length < 1) {
        v[0] = Date.now() + (this.interval * index)
        return v
      }
      else if (index < 0) {
        v[0] = data[0][0] + (this.interval * index)
        return v
      }
      else if (index > len) {
        v[0] = data[len][0] + (this.interval * (index - len))
        return v
      }
      else return null
    }
  }

  /**
   * Return value by timestamp
   * @param {number} ts - Timestamp
   * @param {string} id - dataset id
   * @returns {array|null}  
   * @memberof Range
   */
  valueByTS ( ts, id="chart" ) {
    const idx = this.getTimeIndex(ts)
    const data = this.getDataById(id)

    if (!data?.length) {
      this.#core.warn(`Range.valueByTS: no data in dataset ${id}`);
      return null
    }
    if (!idx || idx > data.length) {
      this.#core.warn(`Range.valueByTS: no valid indesx for timestapm ${ts} in dataset ${id}`);
      return null
    }

    return data[idx]
  }

  /**
   * Does data for id exist?
   * @param {string} id
   * @returns {boolean}  
   * @memberof Range
   */
  hasDataByID(id) {
    if (!isString(id)) return false

    if (id === "chart") return true

    const datas = [
      this.allData.primaryPane,
      this.allData.secondaryPane,
      this.allData.datasets
    ]

    for (let data of datas) {
      for (let entry of data) {
        if (id === entry?.id) return true
      }
    }

    return false
  }

  /**
   * return data for id
   * @param {string} [id="chart"]
   * @returns {array|null}  
   * @memberof Range
   */
  getDataById(id="chart") {
    if (!this.isValidDataset(id, "getDataById")) return null

    if (id === "chart") return this.data

    const datas = [
      this.allData.primaryPane,
      this.allData.secondaryPane,
      this.allData.datasets
    ]

    for (let data of datas) {
      for (let entry of data) {
        if (id === entry?.id) return entry.data
      }
    }

    return null
  }

  /**
   * Return time index
   * @param {number} ts - timestamp
   * @returns {number|null}
   */
   getTimeIndex  (ts, id="chart" ) {
    if (!this.isValidTimestamp(ts, "getTimeIndex")) return null
    if (!this.isValidDataset(id, "getTimeIndex")) return null

    ts = ts - (ts % this.interval)
  
    const data = this.getDataById(id)
    const x = (data.length > 0) ? data[0][0] : this.anchor
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
   * @param {number} t - timestamp
   * @returns {boolean}
   */
  inPriceHistory (t) {
    return (t >= this.timeStart && t <= this.timeFinish) ? true : false
  }

  /**
   * is timestamp in visible render range?
   * @param {number} t - timestamp
   * @returns {boolean}  
   * @memberof Range
   */
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


  setAllMaxMin() {
    let maxMin = this.maxMinPriceVol({data: this.data, start: this.indexStart, end: this.indexEnd, that: this})
    this.setMaxMin(maxMin)
    this.maxMinDatasets()
  }

  /**
   * Find price maximum and minimum, volume maximum and minimum
   * @param {object} input
   * @returns {Object}  
   */
   maxMinPriceVol ( input ) {
    let {data, start, end, that} = {...input}

    // Early return for empty data
    if (!data || data.length === 0) {
      return {
        valueLo: 0,
        valueHi: 1,
        valueMin: 0,
        valueMax: 1,
        valueDiff: 1,
        valueLast: undefined,
        valueLive: undefined,
        valueLiveMin: undefined,
        valueLiveMax: undefined,
        volumeMin: 0,
        volumeMax: 0,
        volumeDiff: 0,
        valueMinIdx: 0,
        valueMaxIdx: 0,
        volumeMinIdx: 0,
        volumeMaxIdx: 0,
      }
    }

    const l = data.length - 1;
    const buffer = Math.round(that.core.bufferPx / that.core.candleW) || 0;

    // Calculate start and end indices with proper bounds checking
    start = Math.max(0, (isInteger(start) ? start - buffer : 0));
    end = Math.min(l, isInteger(end) ? end : l);

    // Initialize with first data point in range
    let i = limit(start, 0, l)
    let c = limit(end, 0, l)

    let valueMin  = data[i][3] || Infinity
    let valueMax  = data[i][2] || -Infinity
    let volumeMin = data[i][5] || Infinity
    let volumeMax = data[i][5] || -Infinity

    let valueMinIdx  = i
    let valueMaxIdx  = i
    let volumeMinIdx = i
    let volumeMaxIdx = i
    let val;

    while (i++ < c) {
      val = data[i][3]
      if (isNumber(val) && val < valueMin) {
        valueMin = val
        valueMinIdx = i
      }
      val = data[i][2]
      if (isNumber(val) && val > valueMax) {
        valueMax = val
        valueMaxIdx = i
      }
      val = data[i][5]
      if (isNumber(val) && val < volumeMin) {
        volumeMin = val
        volumeMinIdx = i
      }
      if (isNumber(val) && val > volumeMax) {
        volumeMax = val
        volumeMaxIdx = i
      }
    }

    // Handle edge case where no valid values were found
    if (valueMin === Infinity) valueMin = 0;
    if (valueMax === -Infinity) valueMax = 1;
    if (volumeMin === Infinity) volumeMin = 0;
    if (volumeMax === -Infinity) volumeMax = 0;
    
    // price range
    const rawDiff = valueMax - valueMin;
    const valueLo = valueMin;
    const valueHi = valueMax;
    
    // Apply y-axis bounds padding
    valueMin -= rawDiff * that.yAxisBounds;
    valueMin = Math.max(0, valueMin);
    valueMax += rawDiff * that.yAxisBounds;
    
    const valueDiff = valueMax - valueMin;
    
    // Get last values
    const valueLast = data[l]?.[4] ?? null;
    const valueLive = that.core.stream?.lastTick?.[4] ?? null;
    const valueLiveMin = that.core.stream?.lastPriceMin ?? null;
    const valueLiveMax = that.core.stream?.lastPriceMax ?? null;

    return {
      valueLo,
      valueHi,
      valueMin,
      valueMax,
      valueDiff,
      valueLast,
      valueLive,
      valueLiveMin,
      valueLiveMax,
      volumeMin,
      volumeMax,
      volumeDiff: volumeMax - volumeMin,
      valueMinIdx,
      valueMaxIdx,
      volumeMinIdx,
      volumeMaxIdx
    };

    function limit(val, min, max) {
      return Math.min(max, Math.max(min, val));
    }
  }

  maxMinDatasets() {
    if (!this.allData?.secondaryPane?.length) return

    let old = Object.keys(this.#secondaryMaxMin) || []

    // iterate over secondary panes
    for (let pane of this.allData.secondaryPane) {
      let index = old.indexOf(pane.id);
      let input = {
        data: pane.data,
        start: this.indexStart,
        end: this.indexEnd,
        that: this
      }
      // current or new entry
      this.#secondaryMaxMin[pane.id] = this.maxMinData(input)
      // leave only old entries to remove
      if (index !== -1) {
        old.splice(index, 1);
      }

    }
    // clean up old entries
    for (let del of old) {
      delete this.#secondaryMaxMin[del]
    }
    
  }

  /**
   * Find data maximum and minimum for indicators or datasets
   * @param {object} input - Object containing data, range, and context
   * @param {Array<Array<number>>} input.data - Array of data points [timestamp, value0, ...]
   * @param {number} input.start - Start index
   * @param {number} input.end - End index
   * @param {object} input.that - Reference to the parent object
   * @returns {Object} - { min, max, diff } 
   */
  maxMinData (input) {
    let {data, start, end, that} = {...input}
    let buffer = bRound(that.#core.bufferPx / that.#core.candleW)
    let l = data?.length - 1 || 0
    let x = this.dataLength - data?.length || 0
    let f = data?.[0]?.length - 1 || 0
    const r = {}
    const d = {
      min: 0,
      max: 1,
      minIdx: 0,
      maxIdx: 0,
      diff: 1,
      last: undefined
    }
    
    // Early return for empty data
    if (l < 1 || !data || !data[0]?.length) return { data: d }

    // create default max min for indicator outputs
    for (let g = f; g > 0; g--) {
      r[`data${g}`] = d
    }

    buffer = (isInteger(buffer)) ? buffer : 0
    start = (isInteger(start)) ? start - buffer : 0
    start = (start > 0) ? start - x : 0
    end = (isInteger(end)) ? end - x : l

    // Return early if range is invalid
    if (l < 0 || data[0].length == 0) return r

    let i = limit(start, 0, l)
    let c = limit(end, 0, l)

    // Return early if range is empty
    if (i >= c) return r

    let j, v, min, max, diff, tMin, tMax, tDiff;

    // iterate over indicator outputs
    for (let d in r) {
      // Initialize min/max on first valid data point
      max = (isNumber(data[i][f])) ? data[i][f] : -Infinity
      min = max
      r[d].min = max
      r[d].max = max
      j = i

      // iterate over range for indicator output
      while (j++ < c) {

        // Skip invalid values
        v = data[j][f]
        if (!isNumber(v)) continue

        if (v <= min) {
          r[d].min = v
          r[d].minIdx = j
          min = v
        }
        if (v >= max) {
          r[d].max = v
          r[d].maxIdx = j
          max = v
        }
      }

      if (tMin === undefined || min < tMin) tMin = min
      if (tMax === undefined || max > tMax) tMax = max

      diff = r[d].max - r[d].min
      r[d].diff = (!isNaN(diff)) ? diff : 0
      --f
    }

    // Handle case where no valid values were found across all fields
    if (tMin === undefined) tMin = 0
    if (tMax === undefined) tMax = 1

    // max min totals for all outputs
    tDiff = tMax - tMin
    tMin -= tDiff * this.yAxisBounds
    tMax += tDiff * this.yAxisBounds
    tDiff = tMax - tMin

    r.data = {
      min: tMin,
      max: tMax,
      diff: tMax - tMin
    }
    return r
  }

  snapshot(start, end) {
    let data = this.export()
        data.snapshot = true
        data.ts = Date.now()
        JSON.parse(JSON.stringify(this.data)); // Deep copy
        data.dataLength = this.dataLength
        data.Length = this.Length
    return data
  }

  export(exclude) {
    let data = {}
    exclude = (isArray(exclude)) ? exclude : []
    for (let c of copy) {
      if (!exclude.includes(c))
        data[c] = this[c]
    }
    return data
  }
} // end class

/**
 * Detects candles interval
 * @param {Array<Array<number>>} ohlcv - Array of OHLCV candles where each candle is [timestamp, open, high, low, close, volume]
 * @returns {number} - milliseconds
 */
export function detectInterval(ohlcv) {

  if (!isArray(ohlcv) ||
      ohlcv.length < 2) return Infinity

  // Validate OHLCV structure
  if (!ohlcv.every(candle => isArray(candle) && candle.length >= 1 && typeof candle[0] === 'number')) {
    // Invalid OHLCV data structure
    return Infinity;
  }

  let len = Math.min(ohlcv.length - 1, 99)
  let min = Infinity
  ohlcv.slice(0, len).forEach((x, i) => {
      let d = ohlcv[i+1][0] - x[0]
      if (!isNaN(d) && d < min) min = d
  })
  // This saves monthly chart from being awkward
  // if (min >= WEEK_MS * 4 && min <= DAY_MS * 30) {
  //     return DAY_MS * 31
  // }
  return min
}

/**
 * Calculate the index for a given time stamp in a time series
 * @param {TimeData} time - TimeData instance provided by core
 * @param {number} timeStamp - Unix timestamp in milliseconds
 * @returns {number|undefined} - Index in the time series data array.
 *                              Can be negative if timestamp is before the first data point.
 *                              Returns undefined if data is empty.
 */
export function calcTimeIndex(time, timeStamp) {
  if (!(time instanceof TimeData)) return undefined

  const data = time.range.data || []
  const len = data.length

  // Handle invalid timestamp
  if (!isValidTimestamp(timeStamp)) {
    if (len === 0) {
      timeStamp = Date.now();
    } else if (!isInteger(data[len-1][0])) {
      timeStamp = Date.now();
    } else {
      timeStamp = data[len-1][0];
    }
  }

    let index
  const timeFrameMS = time.timeFrameMS
  // Normalize timestamp to the beginning of its timeframe period
  timeStamp = timeStamp - (timeStamp % timeFrameMS)

  if (len === 0)
    index = undefined
  else if (timeStamp === data[0][0])
    index = 0
  else if (timeStamp < data[0][0])
    // Calculate negative index for timestamps before the first data point
    index = Math.floor((data[0][0] - timeStamp) / timeFrameMS) * -1
  else
    // Calculate positive index for timestamps after the first data point
    index = Math.floor((timeStamp - data[0][0]) / timeFrameMS)

  return index
}

const copy = [
  "indexEnd",
  "indexStart",
  "scale",
  "secondaryMaxMin",
  "valueDiff",
  "valueHi",
  "valueLo",
  "valueMax",
  "valueMaxIdx",
  "valueMin",
  "valueMinIdx",
  "volumeDiff",
  "volumeMax",
  "volumeMaxIdx",
  "volumeMin",
  "volumeMinIdx",

  "diff",
  "indexFutureLimit",
  "id",
  "indexed",
  "initialCnt",
  "interval",
  "intervalStr",
  "limitFuture",
  "limitPast",
  "maxCandles",
  "minCandles",
  "indexPastLimit",
  "rangeDuration",
  "rangeLimit",
  "timeDuration",
  "timeFinish",
  "timeFrame",
  "timeFrameMS",
  "timeMax",
  "timeMin",
  "timeStart",
  "yAxisBounds",
]
