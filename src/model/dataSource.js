// dataSource.js
// class to manage adding data to the chart in an agnostic manner
// so rather than pushing data to the chart
// the chart can request (pull) data when needed

import { SHORTNAME } from "../definitions/core";
import TradeXchart from "../core";
import { Range, detectInterval } from "./range";
import State from "../state"
import { isArray, isArrayOfType, isFunction, isInteger, isNumber, isObject, isPromise, isString } from "../utils/typeChecks";
import { uid, xMap } from "../utils/utilities";
import { limit } from "../utils/number";
import { TIMEFRAMEMAX, TIMEFRAMEMIN, TIMESCALESVALUES, interval2MS, isTimeFrame, isTimeFrameMS, ms2Interval } from "../utils/time";
import Stream from "../helpers/stream";

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
  #core
  #source = {name: ""}
  #symbol
  #state
  #range
  #stream
  #timeFrames = {}
  #timeFrameCurr
  #tickerStart
  #tickerStop
  #rangeLimitPast
  #rangeLimitFuture

  #waiting = false
  #fetching = false


  /**
   * Creates an instance of DataSource.
   * One DataSource per symbol and thus state
   * @param {Object} cfg - configuration object
   * @param {Object} cfg.source - Exchange or data provider
   * @param {String} cfg.symbol - eg. BTC/USDT 
   * @param {Object} cfg.symbols - list of symbols and their data
   * @param {Array.<Number>} cfg.timeFrames - object of time frames in milliseconds
   * @param {Number} cfg.timeFrameInit - initial time frame
   * @param {Ticker} cfg.ticker
   * @param {History} cfg.history
   * @param {Object} cfg.initialRange
   * @param {State} state
   * @memberof DataSource
   */
  constructor( cfg, state ) {

    this.#state = state
    this.#core = state.core
    this.#cnt = ++DataSource.#sourceCnt
    this.symbolsAdd(cfg?.symbols)
    this.sourceSet(cfg?.source)
    this.symbolSet(cfg?.symbol)
    this.#id = uid(`${SHORTNAME}_dataSource_${this.#symbol}`)
    this.timeFramesAdd(cfg?.timeFrames, DataSource)
    this.timeFrameUse(cfg?.timeFrameInit)
    this.#range = this.buildRange(state)
    this.#stream = new Stream(state.core)
    this.historyAdd(cfg?.source)
    this.tickerAdd(cfg?.source?.tickerStream)
  }

  get id() { return this.#id }
  get stream() { return this.#stream }
  get symbol() { return this.#symbol }
  set timeFrame(t) { this.timeFrameUse(t) }
  get timeFrame() { return this.#timeFrameCurr }
  get timeFrameMS() { return this.#timeFrameCurr }
  get timeFrameStr() { return ms2Interval(this.#timeFrameCurr) }
  get timeFrames() { return this.#timeFrames }
  get range() { return this.#range }

  sourceSet(s) {
    if (isString(s)) this.#source.name = s
    else if (isObject(s)) this.#source = {...this.#source, ...s}
    else return
  }

  symbolsAdd(s) {

  }

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

  timeFramesAdd(t, d) {
    let tf;
    if (isArrayOfType(t, "integer")) {
      tf = buildTimeFrames(t)
    }
    else if (!isObject(t) || !Object.keys(t).length) {
      tf = d.defaultTimeFrames
    }
    else {
      tf = buildTimeFrames( Object.values(t) )
    }
    this.#timeFrames = {...tf}
  }

  /**
   * Set the chart time frame
   * @param {Number|String} tf - time frame milliseconds or "1h"
   * @returns 
   */
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

  /**
   * Add a ticker stream to the chart
   * @param {Object} t - ticker stream definition
   * @param {Function} t.start - function to start stream
   * @param {Function} t.stop - function to stop stream
   * @param {Object} begin - start ticker immediately upon add
   * @param {String} begin.symbol - ticker symbol
   * @param {Number} begin.tf - ticker time frame / interval in milliseconds
   */
  tickerAdd(t, begin) {
    if (isFunction(t?.start)) {
      let n = 3
      if (t.start.length !== n)
        consoleError(this.#core, `range_limitPast function requires n parameters`)
      else {
        this.#tickerStart = t.start
        if (isObject(begin)) {
          let {symbol, tf} = {...begin}
          this.tickerStart(symbol, tf)
        }
      }
    }
    if (isFunction(t?.stop)) {
      this.#tickerStop = t.stop
    }
  }

  /**
   * 
   * @param {String} symbol - ticker symbol eg. BTCUSDT
   * @param {Number} tf - ticker time frame in millisconds
   * @returns {Boolean}
   */
  tickerStart(symbol, tf) {
    if (isString(symbol) && 
        symbol.length &&
        isInteger(tf) ) {
          if (!this.#symbol || this.#symbol === "empty")
            this.symbolSet(symbol)

          else if (this.#symbol !== "empty" && this.#symbol !== symbol) {
            consoleError(this.#core, `ticker symbol does not match chart symbol`)
            return false
          }

          if (this.#state.isEmpty) {
            this.timeFrameUse(tf)
          }
          else if (this.#timeFrameCurr !== tf) {
            consoleError(this.#core, `ticker time frame does not match chart time frame`)
            return false
          }

          let onTick = (t) => { this.#stream.onTick.call(this.#stream, t) }
          this.#stream.start()
          this.#tickerStart(symbol, tf, onTick)
          return true
        }
  }

  tickerStop() {
    this.#tickerStop()
    this.#stream.stop()
  }

  tickerError() {

  }

  tickerRemove() {
    this.tickerStop()
  }

  /**
   * Add price history fetching functions
   * @param {Object} h - source
   * @param {Function} h.rangeLimitPast - fetch function to execute when chart range hits current limit of past price data
   * @param {Function} h.rangeLimitFuture  - fetch funtion to execute when chart rante hits current end of price history
   */
  historyAdd(h) {
    this.historyRemove()
    let n = 4
    if (isFunction(h?.rangeLimitPast)) {
      if (h.rangeLimitPast.length !== n)
        consoleError(this.#core, `range_limitPast function requires ${n} parameters`)
      else {
        this.#rangeLimitPast = (e) => { return this.onRangeLimit(e, h.rangeLimitPast, this.#core.range.timeStart) }
        this.#core.on("range_limitPast", this.#rangeLimitPast, this)
      }
    }
    if (isFunction(h?.rangeLimitFuture)) {
      if (h.rangeLimitFuture.length !== n)
        consoleError(this.#core, `range_limitFuture function requires n parameters`)
      else {
        this.#rangeLimitFuture = (e) => { return this.onRangeLimit(e, h.rangeLimitFuture, this.#core.range.timeFinish) }
        this.#core.on("range_limitFuture", this.#rangeLimitFuture, this)
      }
    }
  }

  historyRemove() {
    if (isFunction(this.#rangeLimitPast)) {
      this.#core.off("range_limitPast", this.#rangeLimitPast, this)
      this.#rangeLimitPast = null
    }
    if (isFunction(this.#rangeLimitFuture)) {
      this.#core.off("range_limitFuture", this.#rangeLimitFuture, this)
      this.#rangeLimitFuture = null
    }
  }

  /**
   * Execute function on range limit
   * @param {*} e -
   * @param {Function} fn - function to execute
   * @param {Number} ts - unix time stamp milliseconds
   */
  onRangeLimit(e, fn, ts) {
    if (!isFunction(fn)) {
      this.#waiting = false
      return
    }
    if (this.#waiting == true)
      return
    this.#waiting = true
    try {
      // history call must handle time outs
      this.#core.progress.start()

      let p = fn( e, this.#symbol, this.#core.timeFrame, ts)
      if (isPromise(p)) {
        p.then( d => {
          if (!isObject(d)) throwError(this.#core.id, "Price history fetch did not return a Promise that resolved to an Object. Nothing to merge.")
          this.#core.mergeData(d, false, true)
          this.#waiting = false
          this.#core.progress.stop()
        })
        .catch(e => {
          this.#waiting = false
          this.#core.progress.stop()
          this.#core.error(e)
        })
      }
      else throwError(this.#core.id, "Price history fetch did not return a Promise")
    }
    catch(e) {
      this.#waiting = false
      this.#core.progress.stop()
      this.#core.error(e)
    }
  }

  buildRange(instance) {

    /*--- Time Frame ---*/
    let core = instance.core
    let cfg = core.config.range
    let state = instance.data
    let range = state.dataSource.initialRange
    let tfms = detectInterval(state.chart.data)
  
    if (tfms === Infinity) {
      let {ms} = isTimeFrame(state.dataSource.timeFrameInit)
      tfms = ms || DEFAULT_TIMEFRAMEMS
    } 
  
    if (!state.chart.isEmpty &&
      state.chart.data.length > 1 &&
      this.#timeFrameCurr !== tfms)
      this.#timeFrameCurr = tfms
  
    if (!isTimeFrameMS(this.#timeFrameCurr)) this.#timeFrameCurr = DEFAULT_TIMEFRAMEMS
  
    // range.timeFrame = ms2Interval(range.timeFrameMS)
  
    /*--- Range ---*/
    let config = {
      core,
      state: instance, // state,
      interval: this.#timeFrameCurr || cfg?.timeFrameMS,
      initialCnt: range?.initialCnt || cfg?.initialCnt,
      limitFuture: range?.limitFuture || cfg?.limitFuture,
      limitPast: range?.limitPast || cfg?.limitPast,
      minCandles: range?.minCandles || cfg?.minCandles,
      maxCandles: range?.maxCandles || cfg?.maxCandles,
      yAxisBounds: range?.yAxisBounds || cfg?.yAxisBounds,
    }
  
    return new Range(range?.start, range?.end, config)
  }

}

function consoleError(c, e) {
  c.error(`TradeX-chart id: ${c.id} : DataSource : ${e}`)
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

