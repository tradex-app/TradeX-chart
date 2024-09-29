// dataSource.js
// class to manage adding data to the chart in an agnostic manner
// so rather than pushing data to the chart
// the chart can request (pull) data when needed

import { SHORTNAME } from "../definitions/core";
import TradeXchart from "../core";
import State from "../state"
import { isArray, isArrayOfType, isFunction, isInteger, isNumber, isObject, isString } from "../utils/typeChecks";
import { uid, xMap } from "../utils/utilities";
import { limit } from "../utils/number";
import { TIMESCALESVALUES, ms2Interval } from "../utils/time";

const defaultTimeFrames = {}
for (let t of Object.values(TIMESCALESVALUES)) {
  let ms = t[0]
  let key = ms2Interval(ms)
  if (ms < 60000) continue
  defaultTimeFrames[`${key}`] = ms
}
Object.freeze(defaultTimeFrames)

export default class DataSource {

  static #chartList = new xMap()
  static #sourceList= new xMap()
  static #sourceCnt = 0

  static get defaultTimeFrames() { return defaultTimeFrames }

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
  #timeFrames = []
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
    this.timeFramesAdd(cfg?.timeFrames)
    this.timeFrameUse(cfg?.timeFrameInit)
    this.historyAdd(cfg?.history)
    this.tickerAdd(cfg?.ticker)

    this.#core.on("range_limitPast", this.onRangeLimit, this)
    // core.on("range_limitFuture", (e) => onRangeLimit(e, "future"))
  }

  get id() { return this.#id }
  get symbol() { return this.#symbol }
  get timeFrame() { return this.#timeFrameCurr }
  get timeFrameMS() { return this.#timeFrameCurr }
  get timeFrameStr() { return ms2Interval(this.#timeFrameCurr) }
  get timeFrames() { return this.#timeFrames }

  symbolSet(s) {
    let symbol = this.#core.config.symbol
    if ((!isString(s) || (isString(s) && !s.length)) && 
         !symbol.length)
      throwError(this.#core.id, `symbol invalid`)
    else 
    if ((!isString(s) || (isString(s) && !s.length)) && 
          symbol.length > 0)
      this.#symbol = symbol
    else
      this.#symbol = s
  }

  timeFramesAdd(t) {
    // if (!isArrayOfType(t, "array")) 
    if (!isObject(t))
      throwError(this.#core.id, `time frames invalid`)

    // convert time frames list into object {1m: 60000}
    if (!Object.keys(t).length) t = DataSource.defaultTimeFrames
    this.#timeFrames = {...t}
  }

  timeFrameUse(tf) {
    // TODO: check if time frame string and look up number
    tf *= 1
    if (!isInteger(tf))
      throwError(this.#core.id, `time frame invalid`)

    tf = limit(tf, 1000, TIMESCALESVALUES.YEARS10[0])
    this.#timeFrameCurr = tf
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
