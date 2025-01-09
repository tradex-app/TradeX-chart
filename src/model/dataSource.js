// dataSource.js
// class to manage adding data to the chart in an agnostic manner
// so rather than pushing data to the chart
// the chart can request (pull) data when needed

import { interval2MS, isTimeFrame, isTimeFrameMS, ms2Interval } from "../utils/time";
import { DEFAULT_TIMEFRAME } from "../definitions/chart";
import { SHORTNAME } from "../definitions/core";
import TradeXchart from "../core";
import { Range, detectInterval } from "./range";
import State, { DEFAULT_STATE } from "../state/chart-state"
import Stream from "../helpers/stream";
import { checkType, isArray, isArrayOfType, isFunction, isInteger, isNumber, isObject, isPromise, isString } from "../utils/typeChecks";
import { doStructuredClone, uid, xMap } from "../utils/utilities";

export const SECOND_MS = 1000
export const MINUTE_MS = SECOND_MS*60
export const HOUR_MS = MINUTE_MS*60
export const DAY_MS = HOUR_MS*24
export const WEEK_MS = DAY_MS*7
export const MONTHR_MS = DAY_MS*30
export const YEAR_MS = DAY_MS*365

const defaultTimeFramesShort = {
  "1m": MINUTE_MS,
  "2m": MINUTE_MS * 2,
  "3m": MINUTE_MS * 3,
  "5m": MINUTE_MS * 5,
  "10m": MINUTE_MS * 10,
  "15m": MINUTE_MS * 15,
  "30m": MINUTE_MS * 30,
  "1h": HOUR_MS,
  "2h": HOUR_MS * 2,
  "3h": HOUR_MS * 3,
  "4h": HOUR_MS * 4,
  "1d": DAY_MS,
  "1w": DAY_MS * 7,
  "1M": MONTHR_MS,
  "3M": MONTHR_MS * 3,
  "6M": MONTHR_MS * 6,
  "1y": YEAR_MS
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
   * @param {Object} cfg.ticker
   * @param {Object} cfg.history
   * @param {State} state
   * @return {DataSource} state with data source
   * @memberof DataSource
   */
  static create( cfg, state ) {

    if (
      !isObject(cfg) ||
      !( state.core instanceof TradeXchart ) ||
      !( state instanceof State )
    )
    // can't build a data source
    return undefined

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
  #cfg
  #source = doStructuredClone(DEFAULT_STATE.dataSource.source)
  #symbol
  #state
  #range
  #stream
  #timeFrames = {}
  #timeFrameCurr
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
    this.#cfg = cfg
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
    this.#stream = new Stream(state.core, state)
    this.historyAdd(cfg?.source)
    let begin = {symbol: this.symbol, tf: this.timeFrameMS}
    this.tickerAdd(cfg?.source?.tickerStream, begin)
  }

  get id() { return this.#id }
  get cfg() { return this.#cfg }
  get state() { return this.#state }
  get source() { return this.#source }
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
      throwError(this.#core.ID, this.#state.key, `symbol invalid`)
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
    let TF = this.timeFrameValidate(tf)
    if (!TF) return

    this.historyPause()
    this.#timeFrameCurr = TF
    // check if a matching symbol time frame State exists
    let matching = this.findMatchingState()
    // if so, switch to it
    if (matching instanceof State) this.#state.use(matching.key)
    // if no exact match, create a new State from an existing with the new time frame
    else {
      let newStateDef = {}
      newStateDef.dataSource = doStructuredClone(this.#state.dataSource)
      this.#state.use(newStateDef)
    }
    // apply ticker stream to new State
    // apply fetch
  }

  /**
   * Validate time frame 
   * @param {Number|String} tf - time frame milliseconds or "1h"
   * @returns {Number|undefined} - time frame milliseconds
   */
  timeFrameValidate(tf) {
    tf = timeFrame2MS(tf)
    if (!isInteger(tf))
      throwError(this.#core.ID, this.#state.key, `time frame invalid`)

    let valid = this.timeFrameExists(tf)

    if (!isInteger(this.#timeFrameCurr))
      tf = detectInterval(this.#state.data.chart.data)

    if (!!valid) {
      if (valid == this.#timeFrameCurr ) return
      tf = valid
    }
    else if (!Object.keys(this.#timeFrames).length) {
      if (tf == this.#timeFrameCurr ) return

      let str = ms2Interval(tf)
      this.#timeFrames[str] = tf
    }
    else 
      throwError(this.#core.ID, this.#state.key, `time frame invalid`)

    return tf
  }

  /**
   * Report if time frame exists
   * @param {Number|String} tf 
   * @returns {Number|undefined}
   */
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
        consoleError(this.#core, this.#state.key, `range_limitPast function requires n parameters`)
      else {
        this.#source.tickerStream.start = t.start
        if (isObject(begin)) {
          let {symbol, tf} = {...begin}
          this.tickerStart(symbol, tf)
        }
      }
    }
    if (isFunction(t?.stop)) {
      this.#source.tickerStream.stop = t.stop
    }
    else this.#source.tickerStream.stop = () => { this.#core.log(`TradeX-chart: ${this.#core.id} : DataSource : tickerStop() function is undefined`) }
  }

  /**
   * 
   * @param {String} symbol - ticker symbol eg. BTCUSDT
   * @param {Number|String} tf - ticker time frame in millisconds
   * @returns {Boolean}
   */
  tickerStart(symbol, tf) {
    tf = timeFrame2MS(tf)
    if (!isString(symbol) ||
        !symbol.length ||
        !isInteger(tf) ) 
        return false

    if (!this.#symbol || this.#symbol === "empty")
      this.symbolSet(symbol)

    else if (this.#symbol !== "empty" && this.#symbol !== symbol) {
      consoleError(this.#core, this.#state.key, `ticker symbol does not match chart symbol`)
      return false
    }

    if (this.#state.isEmpty) {
      this.timeFrameUse(tf)
    }
    else if (this.#timeFrameCurr !== tf) {
      consoleError(this.#core, this.#state.key, `ticker time frame does not match chart time frame`)
      return false
    }

    let onTick = (t) => { this.#stream.onTick.call(this.#stream, t) }
    this.#stream.start()
    this.#source.tickerStream.start(symbol, tf, onTick)
    return true
  }

  tickerStop() {
    this.#source.tickerStream.stop()
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
        consoleError(this.#core, this.#state.key, `range_limitPast function requires ${n} parameters`)
      else {
        this.#source.rangeLimitPast = (e) => { return this.onRangeLimit(e, h.rangeLimitPast, e.startTS) }
        this.#core.on("range_limitPast", this.#source.rangeLimitPast, this)
      }
    }
    if (isFunction(h?.rangeLimitFuture)) {
      if (h.rangeLimitFuture.length !== n)
        consoleError(this.#core, this.#state.key, `range_limitFuture function requires ${n} parameters`)
      else {
        this.#source.rangeLimitFuture = (e) => {
          // if (this.#stream.isActive) return Promise.resolve({})
          // else return this.onRangeLimit(e, h.rangeLimitFuture, this.#state.range.timeFinish) 
          return this.onRangeLimit(e, h.rangeLimitFuture, e.endTS) 
        }
        this.#core.on("range_limitFuture", this.#source.rangeLimitFuture, this)
      }
    }
  }

  historyRemove() {
    if (isFunction(this.#source.rangeLimitPast)) {
      this.#core.off("range_limitPast", this.#source.rangeLimitPast, this)
      this.#source.rangeLimitPast = null
    }
    if (isFunction(this.#source.rangeLimitFuture)) {
      this.#core.off("range_limitFuture", this.#source.rangeLimitFuture, this)
      this.#source.rangeLimitFuture = null
    }
  }

  historyPause() {
    this.#core.off("range_limitPast", this.#source.rangeLimitPast, this)
    this.#core.off("range_limitFuture", this.#source.rangeLimitFuture, this)
  }

  historyRestart() {
    if (isFunction(this.#source.rangeLimitPast))
      this.#core.on("range_limitPast", this.#source.rangeLimitPast, this)
    if (isFunction(this.#source.rangeLimitFuture))
      this.#core.on("range_limitFuture", this.#source.rangeLimitFuture, this)
  }

  /**
   * Start ticker stream, and load the immediate chunk of back history
   * @param {Object} s 
   * @param {Function} s.rangeLimitPastetch - function to execute when chart range hits current limit of past price data
   * @param {Function} s.start - function to start ticker stream
   * @param {Function} s.stop - function to start ticker stream
   * @param {String} s.symbol - eg. btcusdt
   * @param {Number} s.tf - time frame in milliseconds
   * @returns 
   */
  startTickerHistory(s) {
    if (!this.#state.isEmpty) {
      consoleError(this.#core, this.#state.key, `startTickerHistory() cannot execute because chart is not empty`)
    }

    if (!isFunction(s?.rangeLimitFuture))
        s.rangeLimitFuture = (e, sym, tf, ts) => { return Promise.resolve({}) }

    const v = {
      rangeLimitPast: "function",
      // rangeLimitFuture: "function",
      start: "function",
      stop: "function",
      symbol: "string",
      tf: "integer"
    }
    for (let key of Object.keys(v)) {
      if (key == "tf") {
        s.tf = timeFrame2MS(s.tf)
        if (isInteger(s.tf)) continue
      }
      else if (checkType(v[key], s?.[key])) {
        continue
      }
      else {
        consoleError(this.#core, this.#state.key, `startTickerHistory() ${key} is not of the required type ${v[key]}`)
        return false
      }
    }
    this.#core.on("stream_candleFirst", () => {
      this.historyAdd({
        rangeLimitPast: s.rangeLimitPast,
        rangeLimitFuture: s.rangeLimitFuture,
      })
    })
    this.tickerAdd(
      {
        start: s.start,
        stop: s.stop
      },
      {
        symbol: s.symbol,
        tf: s.tf
      }
    )
  }

  /**
   * Execute function on range limit
   * @param {*} e -
   * @param {Function} fn - function to execute
   * @param {Number} ts - unix time stamp milliseconds
   */
  onRangeLimit(e, fn, ts) {
    if (!isFunction(fn) || !this.#state.isActive) {
      this.#waiting = false
      return
    }
    if (this.#waiting == true)
      return
    this.#waiting = true
    try {
      // history call must handle time outs
      this.#core.progress.start()

      let p = fn( e, this.#symbol, this.#timeFrameCurr, ts)
      if (isPromise(p)) {
        p.then( d => {
          if (!isObject(d)) consoleError(this.#core, this.#state.key, "Price history fetch did not return a Promise that resolved to an Object. Nothing to merge.")
          this.identifyState()
          this.#state.mergeData(d, false, true)
          this.#waiting = false
          this.#core.progress.stop()
        })
        .catch(e => {
          this.#waiting = false
          this.#core.progress.stop()
          this.#core.error(e)
        })
      }
      else consoleError(this.#core, this.#state.key, "Price history fetch did not return a Promise")
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
      tfms = ms || core.timeFrameMS || DEFAULT_TIMEFRAME
    } 
  
    if (!state.chart.isEmpty &&
      state.chart.data.length > 1 &&
      this.#timeFrameCurr !== tfms)
      this.#timeFrameCurr = tfms
  
    if (!isTimeFrameMS(this.#timeFrameCurr)) this.#timeFrameCurr = core.timeFrameMS || DEFAULT_TIMEFRAME
  
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

  identifyState() {
    this.#core.log(`${this.state.key} ${this.symbol} ${this.timeFrameStr}`)
  }

  /**
   * 
   * @param {String} source - exchange or api name
   * @param {String} symbol - asset symbol eg. btcusdt
   * @param {Number} timeFrame - time frame in milliseconds
   * @returns {State|Object|undefined} - matching state, or Object of closest matching States
   */
  findMatchingState(source=this.#source.name, symbol=this.#symbol, timeFrame=this.#timeFrameCurr) {
    let tf = timeFrame2MS(timeFrame)
    let matching = {symbol: [], timeFrame: []}
    if (!isString(source) || !isString(symbol) || !isInteger(tf)) return undefined

    let list = this.#state.list() || []
    let ds;
    for (let state of list) {
      ds = state.value.dataSource.source
      if (ds.source !== this.source) continue
      if (ds.symbol !== this.symbol) continue
      matching.symbol.push(state)
      if (ds.timeFrame === this.timeFrame) return state
      else matching.timeFrame.push(state)
    }
    return matching
  }
}

function consoleError(c, k, e) {
  c.error(`TradeX-chart: ${c.id}: State ${k} : DataSource : ${e}`)
}

function throwError(id, k, e) {
  throw new Error(`TradeX-chart: ${id} : State ${k} : DataSource : ${e}`)
}

function buildTimeFrames(t) {
  let tf = {}
  let str;
  for (let ms of t) {
    if (!isTimeFrameMS(ms)) continue
    str = ms2Interval(ms)
    tf[str] = [ms, str]
  }
  return tf
}

function timeFrame2MS(tf) {
  if (isString(tf) && !isInteger(tf*1)) {
    tf = interval2MS(tf)
  }
  return tf * 1
}
