// dataSource.js
// class to manage adding data to the chart in an agnostic manner
// so rather than pushing data to the chart
// the chart can request (pull) data when needed

import { SHORTNAME } from "../definitions/core";
import State from "../state"
import { isFunction, isObject } from "../utils/typeChecks";
import { uid, xMap } from "../utils/utilities";
import TradeXchart from "../core";

export default class DataSource {

  static #chartList = new xMap()
  static #sourceList= new xMap()
  static #sourceCnt = 0


  /**
   *
   * @static
   * @param {State} state
   * @param {object} source - { history: function, stream: function }
   * @param {object} data - 
   * @return {State|boolean} state with data source
   * @memberof DataSource
   */
  static create( state, source, data, core ) {

    if (
      (
        !isObject(source) &&
        !isFunction(source?.history) &&
        !isFunction(source?.stream) &&
        !isObject(data)
      ) ||
      !( core instanceof TradeXchart )
    )
    // can't build a data source
    return false

    if (!(state instanceof State)) {
      state = State.validate(state)
    }
    // create new empty default state
    else {
      state = State.create()
    }

    state.dataSource = new DataSource( state, source, data )
    DataSource.#sourceList.set( state.dataSource, state )
    return state
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
    let sources = DataSource.chartList(chart)?.sources
    if (!sources) return undefined
    
    return Array.from( sources, 
      ([key, value]) => ({key, value}))
  }

  #cnt
  #id
  #symbol
  #state
  #history
  #ticker
  #core
  #timeFrames = {}
  #timeFrameActive

  #waiting = false


  /**
   * Creates an instance of DataSource.
   * One DataSource per symbol and thus state
   * @param {Object} cfg - configuration object
   * @param {String} cfg.symbol - eg. BTC/USDT 
   * @param {Array.<Number>} cfg.timeFrames - array of time frames in milliseconds
   * @param {Number} cfg.timeFrameInit - initial time frame
   * @param {Ticker} cfg.ticker
   * @param {History} cfg.history
   * @param {State} cfg.state
   * @param {TradeXchart} cfg.core
   * @memberof DataSource
   */
  constructor( cfg ) {

    this.#cnt = ++DataSource.#sourceCnt
    this.#symbol = cfg.symbol
    this.#id = uid(`${SHORTNAME}_dataSource_${cfg.symbol}`)
    // convert time frames list into object {1m: 60000}
    this.#timeFrames = cfg.timeFrames
    this.#timeFrameActive = cfg.timeFrameInit
    this.#history = cfg.history
    this.#ticker = cfg.ticker
    this.#state = cfg.state
    this.#core = cfg.core

    core.on("range_limitPast", this.onRangeLimit, this)
    // core.on("range_limitFuture", (e) => onRangeLimit(e, "future"))
  }

  get id() { return this.#id }
  get symbol() { return this.#symbol }
  get timeFrame() { return this.#timeFrameActive }
  get timeFrameMS() { return this.#timeFrameActive }
  get timeFrameStr() { return }
  get timeFrames() { return this.#timeFrames }

  useTimeFrame(tf) {

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

  }

  onRangeLimit(e) {
    if (this.#waiting) return
    this.#waiting = true
    try {
      // history call must handle time outs
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
