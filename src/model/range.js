// range.js

import TradeXchart from "../core"
import { ms2Interval, TimeData } from "../utils/time"
import { DEFAULT_TIMEFRAMEMS, LIMITFUTURE, LIMITPAST, MINCANDLES, MAXCANDLES, YAXIS_BOUNDS, INTITIALCNT, DEFAULT_TIMEFRAME } from "../definitions/chart"
import { isArray, isInteger, isNumber, isObject, isString } from "../utils/typeChecks"
import { bRound, limit } from "../utils/number"
import { diff, uid } from "../utils/utilities"
import { SHORTNAME } from "../definitions/core"
// import WebWorker from "./webWorkers"
// import WebWorker from "./webWorkers4"

export class Range {

  #id
  #core
  #state
  #worker
  #init = true
  #indexed = false
  #interval = DEFAULT_TIMEFRAMEMS
  #intervalStr = DEFAULT_TIMEFRAME
  indexStart = 0
  indexEnd = LIMITFUTURE
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
  secondaryMaxMin = {}
  old = {}
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
    if (!isObject(config) ||
        !(config?.core instanceof TradeXchart))
        throw new Error(`Range requires a config`)

    this.#id = uid(`${SHORTNAME}_Range`)
    this.#init = true;
    this.setConfig(config)

    // start sanity check
    if (!isInteger(start) || this.isPastLimit(start))
      start = this.data.length - this.#initialCnt
    // end sanity check
    if (!isInteger(end) || this.isFutureLimit(end))
      end = this.data.length
    // range length sanity check
    if (end - start > this.#maxCandles)
      end = end - ((end - start) - this.#maxCandles)

    const MaxMinPriceVolStr = `
    (input) => {
      return maxMinPriceVol(input)
    }
    function ${this.maxMinPriceVol.toString()}
  `
    // this.#worker = this.#core.worker.create(MaxMinPriceVolStr, "range")

    const tf = config?.interval || DEFAULT_TIMEFRAMEMS

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
    // adjust range end if out of bounds
    if (end == 0 && this.data.length >= this.rangeLimit)
      end = this.rangeLimit
    else if (end == 0)
      end = this.data.length

    this.set(start, end)
  }

  get id () { return this.#id }
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
  set interval (i) { this.#interval = i }
  get interval () { return this.#interval }
  set intervalStr (i) { this.#intervalStr = i }
  get intervalStr () { return this.#intervalStr }
  get timeFrame () { return this.#intervalStr }
  get timeFrameMS () { return this.#interval }
  get indexed () { return this.#indexed }
  get pastLimitIndex () { return this.limitPast * -1 }
  get futureLimitIndex () { return this.dataLength + this.limitFuture - 1 }
  set initialCnt (c) { if (isInteger(c)) this.#initialCnt = c }
  get initialCnt () { return this.#initialCnt }
  get limitFuture () { return this.#limitFuture }
  get limitPast () { return this.#limitPast }
  get minCandles () { return this.#minCandles }
  get maxCandles () { return this.#maxCandles }
  get yAxisBounds () { return this.#yAxisBounds }
  get rangeLimit () { return this.#limitFuture }
  get diff () { return this?.valueDiff }

  end() {
    // WebWorker.destroy(this.#worker.id)
  }

  isFutureLimit(idx=this.indexEnd) {
    if (!isInteger(idx)) return
    return (idx > this.futureLimitIndex)
  }

  isPastLimit(idx=this.indexStart) {
    if (!isInteger(idx)) return
    return (idx < this.pastLimitIndex)
  }

  /**
   * set Range index start and end
   * @param {number} [start=0]
   * @param {number} [end=this.dataLength]
   * @param {number} [max=this.maxCandles]
   * @returns {boolean} - success or failure
   * @memberof Range
   */
  set (start=0, end=this.dataLength, max=this.maxCandles) {
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

    this.indexStart = start
    this.indexEnd = end

    inOut -= this.Length

    this.setMaxCandles(max)
    this.setAllMaxMin()

    // if (this.#init || this.old.priceMax != this.priceMax || this.old.priceMin != this.priceMin) {
    //   this.#core.emit("range_priceMaxMin", [this.priceMax, this.priceMin])
    // }

    this.#core.emit("range_set", [newStart, newEnd, oldStart, oldEnd])

    // if (this.#init) this.#init = false

    return true

    // use web worker after init
    // this.#worker.postMessage({data: this.data, start: start, end: end, that: this})
    // .then(maxMin => {
    //   this.setMaxMin(maxMin)

    //   if (this.old.priceMax != this.priceMax || this.old.priceMin != this.priceMin) {
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
      this.old[m] = this[m]
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

    let data
    
    if (id == "chart") data = this.data
    else {
      data = this.getDataById(id)
      if (!data) return null
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
   * TODO: Finish this!!!
   * return value by timestamp
   * @param {number} ts
   * @param {string} id
   * @returns {array}  
   * @memberof Range
   */
  valueByTS ( ts, id="" ) {
    if (!isInteger(ts) || !isString(id)) return false

    const idx = this.getTimeIndex(ts)
      let value;

    switch (id) {
      case "chart": break;
      case "primary": break;
      case "secondary": break;
      case "dataset": break;
      case "all": break;
      default: 
        if (id.length === 0) value = this.value(idx)
        else {
          const idParts = id.split('_')
        }
        break;
    }
    return value
  }

  /**
   * return data for id
   * @param {string} [id="chart"]
   * @returns {array|boolean}  
   * @memberof Range
   */
  getDataById(id="chart") {
    if (!isString(id)) return false

    if (id == "chart") return this.data

    const datas = [
      this.allData.primaryPane,
      this.allData.secondaryPane,
      this.allData.datasets
    ]

    for (let data of datas) {
      for (let entry of data) {
        if (id == entry?.id) return entry.data
      }
    }

    return false
  }

  /**
   * Return time index
   * @param {number} ts - timestamp
   * @returns {number}
   */
   getTimeIndex (ts) {
    if (!isInteger(ts)) return false
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
    let buffer = bRound(this.#core.bufferPx / this.#core.candleW)
    let l = data?.length-1

    buffer = (isInteger(buffer)) ? buffer : 0
    start = (isInteger(start)) ? start - buffer : 0
    start = (start > 0) ? start : 0
    end = (isInteger(end)) ? end : l

    if (l < 0) {
      return {
        valueLo: 0,
        valueHi: 1,
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

    while (i++ < c) {
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

    let diff = valueMax - valueMin
    let valueLo = valueMin
    let valueHi = valueMax
    valueMin -= diff * that.yAxisBounds
    valueMin = (valueMin > 0) ? valueMin : 0
    valueMax += diff * that.yAxisBounds
    diff = valueMax - valueMin

    return {
      valueLo,
      valueHi,
      valueMin,
      valueMax,
      valueDiff: valueMax - valueMin,
      volumeMin,
      volumeMax,
      volumeDiff: volumeMax - volumeMin,

      valueMinIdx,
      valueMaxIdx,
      volumeMinIdx,
      volumeMaxIdx
    }

    function limit(val, min, max) {
      return Math.min(max, Math.max(min, val));
    }
  }

  maxMinDatasets() {
    if (!this.allData?.secondaryPane?.length) return

    let old = Object.keys(this.secondaryMaxMin) || []

    // iterate over secondary panes
    for (let p of this.allData.secondaryPane) {
      let index = old.indexOf(p.id);
      let input = {
        data: p.data,
        start: this.indexStart,
        end: this.indexEnd,
        that: this
      }
      // current or new entry
      this.secondaryMaxMin[p.id] = this.maxMinData(input)
      // leave only old entries to remove
      if (index !== -1) {
        old.splice(index, 1);
      }

    }
    // clean up old entries
    for (let del of old) {
      delete this.secondaryMaxMin[del]
    }
    
  }

  /**
   * Find data maximum and minimum for indicators or datasets
   * expects [timestamp, value0, ...]
   * @param {object} input
   * @returns {Object}  
   */
  maxMinData (input) {
    let {data, start, end, that} = {...input}
    let buffer = bRound(this.#core.bufferPx / this.#core.candleW)
    let l = data.length-1
    let x = this.dataLength - data.length
    let f = data[0]?.length - 1 || 0
    const r = {}
    const d = {
      min: 0,
      max: 1,
      minIdx: 0,
      maxIdx: 0,
      diff: 1
    }

    if (l < 1) return { data: d }

    // create default max min for indicator outputs
    for (let g = f; g > 0; g--) {
      r[`data${g}`] = d
    }

    buffer = (isInteger(buffer)) ? buffer : 0
    start = (isInteger(start)) ? start - buffer : 0
    start = (start > 0) ? start - x : 0
    end = (isInteger(end)) ? end - x : l

    if (l < 0 || data[0].length == 0) 
      return r

    let i = limit(start, 0, l)
    let c = limit(end, 0, l)
    let j, v, min, max, diff, tMin, tMax;

    // iterate over indicator outputs
    for (let d in r) {
      max = data[i][f]
      min = data[i][f]
      j = i

      // iterate over range for indicator output
      while (j++ < c) {
        v = data[j][f]
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
    // max min totals for all outputs
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
        data.data = this.data
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
 * @param {Array} ohlcv - array of ohlcv values (price history)
 * @returns {number} - milliseconds
 */
export function detectInterval(ohlcv) {

  if (!isArray(ohlcv) ||
      ohlcv.length < 2) return Infinity

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
 * @param {TimeData} time - TimeData instance provided by core
 * @param {number} timeStamp
 * @returns {number|boolean}
 */
export function calcTimeIndex(time, timeStamp) {
  if (!(time instanceof TimeData)) return false

  const data = time.range.data || []
  const len = data.length

  if (!isInteger(timeStamp)) {
    if (!isInteger(data[len-1][0]))
      timeStamp = Date.now()
    else
      timeStamp = data[len-1][0]
  }

  let index
  let timeFrameMS = time.timeFrameMS
  timeStamp = timeStamp - (timeStamp % timeFrameMS)

  if (data.length === 0)
    index = false
  else if (timeStamp === data[0][0])
    index = 0
  else if (timeStamp < data[0][0]) 
    index = Math.floor((data[0][0] - timeStamp) / timeFrameMS) * -1
  else 
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
  "futureLimitIndex",
  "id",
  "indexed",
  "initialCnt",
  "interval",
  "intervalStr",
  "limitFuture",
  "limitPast",
  "maxCandles",
  "minCandles",
  "pastLimitIndex",
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