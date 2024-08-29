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

  #cnt
  #id
  #state
  #history
  #stream
  #data
  #core
  #waiting = false

  constructor( state, source, data, core ) {

    this.#cnt = ++DataSource.#sourceCnt
    this.#id = uid(`${SHORTNAME}_dataSource`)
    this.#state = state
    this.#core = core
    this.#history = source.history
    this.#stream = source.stream

    core.on("range_limitPast", this.onRangeLimit, this)
    // core.on("range_limitFuture", (e) => onRangeLimit(e, "future"))
  }

  get id() { return this.#id }

  onRangeLimit(e) {
    if (this.#waiting) return
    this.#waiting = true
    try {
      // history call must handle time outs
      this.#history( this.#core.symbol, this.#core.timeFrame, this.#core.range.timeStart )
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
