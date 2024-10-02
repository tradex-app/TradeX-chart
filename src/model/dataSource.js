// dataSource.js
// class to manage adding data to the chart in an agnostic manner
// so rather than pushing data to the chart
// the chart can request (pull) data when needed

import { SHORTNAME } from "../definitions/core";
import TradeXchart from "../core";
import { Range, detectInterval } from "./range";
import State from "../state"
import { isArray, isArrayOfType, isFunction, isInteger, isNumber, isObject, isString } from "../utils/typeChecks";
import { uid, xMap } from "../utils/utilities";
import { limit } from "../utils/number";
import { TIMEFRAMEMAX, TIMEFRAMEMIN, TIMESCALESVALUES, interval2MS, isTimeFrameMS, ms2Interval } from "../utils/time";

const TSV =   TIMESCALESVALUES
const defaultTimeFrames = {}
for (let t of Object.values(TSV)) {
  let ms = t[0]
  let key = ms2Interval(ms)
  if (ms < 60000) continue
  defaultTimeFrames[`${key}`] = ms
}
Object.freeze(defaultTimeFrames)

const defaultTimeFramesShort = {
  "1m": TSV.MINUTE[0],
  "2m": TSV.MINUTE2[0],
  "3m": TSV.MINUTE3[0],
  "5m": TSV.MINUTE5[0],
  "10m": TSV.MINUTE10[0],
  "15m": TSV.MINUTE15[0],
  "30m": TSV.MINUTE30[0],
  "1h": TSV.HOUR[0],
  "2h": TSV.HOUR2[0],
  "3h": TSV.HOUR3[0],
  "4h": TSV.HOUR4[0],
  "1d": TSV.DAY[0],
  "1w": TSV.DAY7[0],
  "1M": TSV.MONTH[0],
  "3M": TSV.MONTH3[0],
  "6M": TSV.MONTH6[0],
  "1y": TSV.YEARS[0]
}

export default class DataSource {

  static #chartList = new xMap()
  static #sourceList= new xMap()
  static #sourceCnt = 0

  static get defaultTimeFrames() { return defaultTimeFramesShort }

  /**
   *
   * @static
   * @param {Object} cfg - configuration object
   * @param {String} cfg.symbol - eg. BTC/USDT 
   * @param {Array.<Number>} cfg.timeFrames - object of time frames in milliseconds
   * @param {Number} cfg.timeFrameInit - initial time frame
   * @param {Ticker} cfg.ticker
   * @param {History} cfg.history
   * @param {State} state
   * @return {DataSource|boolean} state with data source
   * @memberof DataSource
   */
  static create( cfg, state ) {

    if (
      !isObject(cfg) ||
      !( state.core instanceof TradeXchart ) ||
      !( state instanceof State )
    )
    // can't build a data source
    return false

    let dataSource = new DataSource( cfg, state )
    DataSource.#sourceList.set( dataSource, state )
    return dataSource
  }

  static delete(key) {
    if (key instanceof DataSource ||
        !State.has(key)
      ) return false
    DataSource.#sourceList.delete(key)
  }

  static has(key) {
    return DataSource.#sourceList.has(key)
  }

  static get(key) {
    return DataSource.#sourceList.get(key)
  }

  /**
   * List registered data sources
   * @param {TradeXchart} chart - target
   * @returns {Array.<DataSource>|undefined} - array of state instances
   */
  static list (chart) {
    let sources = DataSource.sourceList(chart)?.sources
    if (!sources) return undefined
    
    return Array.from( sources, 
      ([key, value]) => ({key, value}))
  }

  static sourceList(chart) {
    
  }


  #cnt
  #id
  #symbol
  #state
  #history
  #ticker
  #core
  #range
  #timeFrames = {}
  #timeFrameCurr

  #waiting = false
  #fetching = false


  /**
   * Creates an instance of DataSource.
   * One DataSource per symbol and thus state
   * @param {Object} cfg - configuration object
   * @param {String} cfg.symbol - eg. BTC/USDT 
   * @param {Array.<Number>} cfg.timeFrames - object of time frames in milliseconds
   * @param {Number} cfg.timeFrameInit - initial time frame
   * @param {Ticker} cfg.ticker
   * @param {History} cfg.history
   * @param {State} state
   * @memberof DataSource
   */
  constructor( cfg, state ) {

    this.#state = state
    this.#core = state.core
    this.#cnt = ++DataSource.#sourceCnt
    this.symbolSet(cfg?.symbol)
    this.#id = uid(`${SHORTNAME}_dataSource_${this.#symbol}`)
    this.timeFramesAdd(cfg?.timeFrames, cfg?.initialRange)
    this.timeFrameUse(cfg?.timeFrameInit)
    this.#range = buildRange(state, state.data, state.core)
    this.historyAdd(cfg?.history)
    this.tickerAdd(cfg?.ticker)

    this.#core.on("range_limitPast", this.onRangeLimit, this)
    // core.on("range_limitFuture", (e) => onRangeLimit(e, "future"))
  }

  get id() { return this.#id }
  get symbol() { return this.#symbol }
  set timeFrame(t) { this.timeFrameUse(t) }
  get timeFrame() { return this.#timeFrameCurr }
  get timeFrameMS() { return this.#timeFrameCurr }
  get timeFrameStr() { return ms2Interval(this.#timeFrameCurr) }
  get timeFrames() { return this.#timeFrames }
  get range() { return this.#range }

  symbolSet(s) {
    let symbol = this.#core.config.symbol
    if ((!isString(s) || (isString(s) && !s.length)) && 
         !symbol.length)
      throwError(this.#core.id, `symbol invalid`)
    else if (isString(s) && s.length > 0)
      this.#symbol = s
    else
      this.#symbol = symbol
  }

  timeFramesAdd(t, r) {
    let tf;
    if (isArrayOfType(t, "integer")) {
      tf = buildTimeFrames(t)
    }
    else if (!isObject(t) || !Object.keys(t).length) {
      tf = r?.DataSource.defaultTimeFrames
    }
    else {
      tf = buildTimeFrames( Object.values(t) )
    }
    this.#timeFrames = {...tf}
  }

  timeFrameUse(tf) {
    if (isString(tf)) {
      tf = interval2MS(tf)
    }
    if (!isInteger(tf))
      throwError(this.#core.id, `time frame invalid`)

    let valid = this.timeFrameExists(tf)

    if (!isInteger(this.#timeFrameCurr))
      this.#timeFrameCurr = detectInterval(this.#state.data.chart.data)

    if (!!valid) {
      if (valid == this.#timeFrameCurr ) return
      // switch to new or existing time frame
      this.#timeFrameCurr = valid
    }
    else if (!Object.keys(this.#timeFrames).length) {
      if (tf == this.#timeFrameCurr ) return

    let str = ms2Interval(tf)
      this.#timeFrames[str] = tf
      this.#timeFrameCurr = tf
    }
    else 
      throwError(this.#core.id, `time frame invalid`)
  }

  timeFrameExists(tf) {
    if (tf in this.#timeFrames) return this.#timeFrames[tf]
    if (isInteger(tf)) {
      let str = ms2Interval(tf)
      if (str in this.#timeFrames) return tf
    }
    return undefined
  }

  tickerAdd(t) {

  }

  tickerStart() {

  }

  tickerStop() {

  }

  tickerError() {

  }

  historyAdd(h) {

  }

  historyFetch() {

  }

  historyError() {

  }

  onTick(t) {

  }

  onFetch(f) {
    // if (this.#fetching) 
    this.#fetching = true
    try {

    }
    catch (e) {
      this.#core.error(e)
      this.#waiting = false
    }
  }

  onRangeLimit(e) {
    // if (this.#waiting) return
    this.#waiting = true
    try {
      // history call must handle time outs
      if (!isFunction(this.#history)) {
        this.#waiting = false
        return
      }
      this.#history( this.#symbol, this.#core.timeFrame, this.#core.range.timeStart )
      .then(d => {
        this.#core.mergeData(d, false, true)
        this.#waiting = false
      })
    }
    catch(e) {
      this.#core.error(e)
      this.#waiting = false
    }
  }

}

function throwError(id, e) {
  throw new Error(`TradeX-chart id: ${id} : DataSource : ${e}`)
}

function buildTimeFrames (t) {
  let tf = {}
  let str;
  for (let ms of t) {
    if (!isTimeFrameMS(ms)) continue
    str = ms2Interval(ms)
    tf[str] = [ms, str]
  }
  return tf
}

function buildRange(instance, state) {

  /*--- Time Frame ---*/
  let core = state.core
  let cfg = core.config.range
  let range = state.range
  let tfms = detectInterval(state.chart.data)

  if (tfms === Infinity) tfms = range.timeFrameMS || DEFAULT_TIMEFRAMEMS

  if (!state.chart.isEmpty &&
    state.chart.data.length > 1 &&
    range.timeFrameMS !== tfms)
    range.timeFrameMS = tfms

  if (!isTimeFrameMS(range.timeFrameMS)) range.timeFrameMS = DEFAULT_TIMEFRAMEMS

  range.timeFrame = ms2Interval(range.timeFrameMS)

  /*--- Range ---*/
  let config = {
    core,
    state: instance, // state,
    interval: range.timeFrame || cfg?.timeFrameMS,
    initialCnt: range?.initialCnt || cfg?.initialCnt,
    limitFuture: range?.limitFuture || cfg?.limitFuture,
    limitPast: range?.limitPast || cfg?.limitPast,
    minCandles: range?.minCandles || cfg?.minCandles,
    maxCandles: range?.maxCandles || cfg?.maxCandles,
    yAxisBounds: range?.yAxisBounds || cfg?.yAxisBounds,
  }

  return new Range(range?.start, range?.end, config)
}
