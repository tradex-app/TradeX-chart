import { isArray, isBoolean, isNumber, isObject, isString, checkType, isFunction, isInteger } from '../utils/typeChecks'
import { getRandomIntBetween } from '../utils/number'
import { isValidTimeInRange, isValidTimestamp, TimeData } from '../utils/time'
import State from '../state/chart-state'


/**
 * Validate price a sample of history data
 * @export
 * @param {Array} data
 * @param {boolean} isCrypto - check against BTC genesis date
 * @returns {boolean}  
 */
export function validateShallow(data, isCrypto=false) {

  if (!isArray(data)) return false

  let rnd = getRandomIntBetween(0, data.length)
  if (!isCandleValid(data[0], isCrypto)) return false
  if (!isCandleValid(data[rnd], isCrypto)) return false
  if (!isCandleValid(data[data.length - 1], isCrypto)) return false

  // is ascending order?
  let t1 = data[0][0]
  let t2 = data[1][0]
  let t3 = data[2][0]
  if (t1 > t2 && t2 > t3) return false
  
  // is (likely) valid - use validateDeep() to validate entire dataset
  return true
}

/**
 * Validate entire price history data
 * @export
 * @param {Array} data
 * @param {boolean} isCrypto - check against BTC genesis date
 * @returns {boolean}  
 */
export function validateDeep(data, isCrypto=false) {
  if (!isArray(data)) return false

  let i = 0
  let prev = 0
  while (i < data.length) {

    if (!isCandleValid(data[i], isCrypto)) return false

    // is ascending order?
    if (data[i][0] < prev) return false
    prev = data[i][0]
    i++
  }

  // is valid!
  return true
}

/**
 * Validate Candle
 *
 * @export
 * @param {Array} c - [ timestamp(ms), open, high, low, close, volume ]
 * @param {Boolean} isCrypto - are we working with crypto? Validate against BTC genesis
 * @returns {Boolean}  
 */
export function isCandleValid(c, isCrypto=false) {
  if (!isArray(c)) return false
  if (c.length !== 6) return false
  // timestamp (ms)
  if (isCrypto)
    if (!isValidTimeInRange(c[0])) return false
  if (
    // open
    !isNumber(c[1]) ||
    // hight
    !isNumber(c[2]) ||
    // low
    !isNumber(c[3]) ||
    // close
    !isNumber(c[4]) ||
    // volume
    !isNumber(c[5])
  ) return false
  // is valid!
  return true
}

/**
 * sanitize data, must be an array of numbers
 * entries must be: [ts,o,h,l,c,v]
 * @param {Array} c 
 */
export function sanitizeCandles(c) {
  for (let i of c) {
    for (let j=0; j<6; j++) {
      i.length = 6
      i[j] *= 1
    }
  }
  return c
}

export class Gaps {

  #core
  #state
  #range
  #list = {}

  constructor(state) {
    if (!(state instanceof State)) throw new Error(`Class Gaps requires a valid State`)

    this.#core = state.core
    this.#state = state
    this.#range = state.range
  }

  get list () { return this.#list }
  get hasGaps () { return Object.keys(this.#list).length }
  get dataSource () { return this.#state.dataSource }
  get source () { return this.#state.dataSource.source }

  /**
   * Find and fill any gaps in a price history array.
   * Invoked from State initiation.
   * @param {Array} data - array of candles [timestamp, open, high, low, close, volume]
   * @return {Array} - array of candles [timestamp, open, high, low, close, volume] 
   */
  findFillGaps(data) {
    let timeFrameMS = this.#state.timeFrame
    if (!isArray(data) ||
        data.length == 1) return false

    let a, b, c, e, ts, fill, last,
        r = [],
        i = 0,
        l = (data[data.length - 1][0] - data[i][0]) / timeFrameMS;
    while (i < l) {
      a = data[i][0]
      b = data[i+1][0]
      c = b - a
      if ( c == timeFrameMS ) {
        // r.push(data[i])
        // last = data[i]
      }
      // gap
      else if ( c > timeFrameMS) {
        ts = a + timeFrameMS
        e = [ts, null, null, null, null, null]
        // r.push(e)
        // fill = [...last]
        // fill[0] = tf
        this.list[`${ts}`] = e
        data.splice(i + 1, 0, e)
      }
      else if ( c < timeFrameMS ) {

      }
      i++
    }
    // r.push(data[i])
    // return r
    return data
  }


  /**
   * Remove any gaps filled on merge
   *
   * @param {Number} start - timestamp
   * @param {Number} end - timestamp
   * @return {Array.<Number>} - array of filled gap timestamps
   * @memberof Gaps
   */
  removeFilledGaps(start, end) {
    if (!this.hasGaps) return

    let tf = this.#state.timeFrame
    let range = this.#range
    let filled = []
    let value;

    const invalid = (start) => {
      value = this.#list[`${start}`]
      if (value !== range.valueByTS(start)) {
        delete this.#list[start]
        filled.push(start)
      }
    }

    if (!isInteger(start) || !isInteger(end)) {
      let gapTFs = Object.keys(this.#list)
      for (let start of gapTFs) {
        invalid(start)
      }
    }
    else {
      while (start <= end) {
        invalid(start)
        start += tf
      }
    }    
    return filled
  }

  nullFillGapsOnMerge(newer, older) {
    let merged = older
    let len = older.length
    let ts = older[len - 1][0]
    let gap = Math.floor((newer[0][0] - ts) / this.#state.timeFrame)
    let arr;
    for (gap; gap > 1; gap--) {
      ts += this.#state.timeFrame
      // this.#list[`${ts}`] = [...older[len - 1]]
      // this.#list[`${ts}`][0] = ts
      arr = Array(newer[0].length).fill(null)
      arr[0] = ts
      merged.push(arr)
      this.#list[`${ts}`] = arr
    }
    return merged
  }

  fillRangeGaps() {
    let range = this.#range
    let gaps = Object.keys(this.#list)
    let start = range.indexStart
    let end = range.indexEnd
    let startTS = range.indexStartTS
    let endTS = range.indexEndTS
    let e = {chart: this.#core, start, end, startTS, endTS}

    if (start >= gaps[0] && start <= gaps[gaps.length-1]) {
      // fill gap with DataSource history fetch past
      if (isFunction(this.source?.rangeLimitPast))
        this.source?.rangeLimitPast(e)
    }
    if (end >= gaps[0] && end <= gaps[gaps.length-1]) {
      // fill gap with DataSource history fetch Future
      if (isFunction(this.source?.rangeLimitFuture))
        this.source?.rangeLimitFuture(e)
    }
  }

  /**
   * Find gaps in price history time span
   * @param {Number} [startTS=this.#range.indexStartTS]
   * @param {Number} [endTS=this.#range.indexEndTS]
   * @return {Array}  
   * @memberof Gaps
   */
  findGapsInTimeSpan(startTS=this.#range.indexStartTS, endTS=this.#range.indexEndTS) {
    if (!isValidTimestamp(startTS) || !isValidTimestamp(endTS) || !this.hasGaps) return []

    // let gaps = Object.keys(this.#list)
    let range = this.#range
    let start = range.getTimeIndex(startTS)
    let end = range.getTimeIndex(endTS)
    let TFs = []
    let value;
    for (let i=start; i<end+1; i++) {
      value = range.value(i)
      if (value[1] === null) TFs.push(value[0])
      else continue
    }
    return TFs
  }
}
