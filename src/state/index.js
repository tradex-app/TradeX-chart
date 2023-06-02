// state.js
// Data state management for the entire chart component library thingy

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import Dataset from '../model/dataset'
import { validateDeep, validateShallow } from '../model/validateData'
import { copyDeep, mergeDeep, uid } from '../utils/utilities'
import { detectInterval } from '../model/range'
import { ms2Interval, SECOND_MS } from '../utils/time'
import { DEFAULT_TIMEFRAME, DEFAULT_TIMEFRAMEMS } from '../definitions/chart'
import { SHORTNAME } from '../definitions/core'
import TradeXchart from '../core'

const DEFAULTSTATEID = "defaultState"
const DEFAULT_STATE = {
  id: DEFAULTSTATEID,
  key: "",
  status: "default",
  isEmpty: true,
  chart: {
    type: "candles",
    candleType: "CANDLE_SOLID",
    indexed: false,
    data: [],
    settings: {},
    row: {},
    tf: DEFAULT_TIMEFRAME,
    tfms: DEFAULT_TIMEFRAMEMS
  },
  onchart: [],
  offchart: [],
  datasets: [],
  tools: [],
  ohlcv: []
}
export default class State {

  static #stateList = new Map()
  
  static get default() { return copyDeep(DEFAULT_STATE) }
  static get list() { return State.#stateList }

  static create(state, deepValidate=false, isCrypto=false) {
    const instance = new State(state, deepValidate, isCrypto)
    const key = instance.key
    State.#stateList.set(key,instance)
    return instance
  }

  static validate(state, deepValidate=false, isCrypto=false) {

    const defaultState = this.default

    if (!isObject(state)) {
      state = {}
    }
    if (!('chart' in state)) {
      state.chart = defaultState.chart
      state.chart.data = state?.ohlcv || []
      state.chart.isEmpty = true
    }

    state = mergeDeep(defaultState, state)

    if (deepValidate) 
      state.chart.data = validateDeep(state.chart.data, isCrypto) ? state.chart.data : []
    else 
      state.chart.data = validateShallow(state.chart.data, isCrypto) ? state.chart.data : []

    if (!isNumber(state.chart?.tf) || deepValidate) {
      let tfms = detectInterval(state.chart.data)
      // this SHOULD never happen, 
      // but there are limits to fixing broken data sent to chart
      if (tfms < SECOND_MS) tfms = DEFAULT_TIMEFRAMEMS
      state.chart.tfms = tfms
    }
    
    if (!isString(state.chart?.tfms) || deepValidate)
      state.chart.tf = ms2Interval(state.chart.tfms)

    if (!('onchart' in state)) {
        state.onchart = defaultState.onchart
    }

    if (!('offchart' in state)) {
        state.offchart = defaultState.offchart
    }

    if (!state.chart.settings) {
        state.chart.settings = defaultState.chart.settings
    }

    // Remove ohlcv we have Data
    delete state.ohlcv

    if (!('datasets' in state)) {
        state.datasets = []
    }

    // Init dataset proxies
    for (var ds of state.datasets) {
      if (!this.#dss) this.#dss = {}
      this.dss[ds.id] = new Dataset(this, ds)
    }

    return state
  }

  static delete(key) {
    if (!isString(key) ||
        !State.has(key)
      ) return false
    State.#stateList.delete(key)
  }

  static has(key) {
    return State.#stateList.has(key)
  }

  static get(key) {
    return State.#stateList.get(key)
  }

  /**
 * export state - default json
 * @param {string} key - state unique identifier
 * @param {object} [config={}] - default {type:"json"}
 * @return {*}  
 * @memberof State
 */
  static export(key, config={}) {
    if (!State.has(key)) return false
    if (!isObject) config = {}
    const state = State.get(key)
    const type = config?.type
    const data = copyDeep(state.data)
    const vals = data.chart.data
    let stateExport;

    // trim streaming candle because it is not complete
    if (vals.length > 0 &&
        vals[vals.length - 1].length > 6)
        vals.length = vals.length - 1

    switch(type) {
      case "json":
      default :
        const {replacer, space} = {...config};
        stateExport = JSON.stringify(data, replacer, space);
    }
    return stateExport
  }
  
  #id = ""
  #key = ""
  #data = {}
  #dss = {}
  #core
  #status = false
  #isEmpty = true

  constructor(state, deepValidate=false, isCrypto=false) {
    // validate state
    if (isObject(state)) {
      this.#data = State.validate(state, deepValidate, isCrypto)
      this.#status = "valid"
      this.#isEmpty = (this.#data.chart?.isEmpty) ? true : false
      this.#core = (state?.core instanceof TradeXchart) ? state.core : undefined
    }
    else {
      this.#data = State.default
      this.#status = "default"
      this.#isEmpty = true
    }
    this.#id = state?.id || ""
    this.#key = uid(`${SHORTNAME}_state`)
  }

  get id() { return this.#id }
  get key() { return this.#key }
  get status() { return this.#status }
  get isEmpty() { return this.#isEmpty }
  get data() { return this.#data }
  get core() { return (this.#core !== undefined) ? this.#core : false }

  create(state, deepValidate, isCrypto) {
    return State.create(state, deepValidate, isCrypto)
  }

  delete(key) {
    if (key !== this.key) {
      State.delete(key)
    }
    else {
      if (State.has(key)) {
        const empty = State.create()
        this.use(empty.key)
        State.delete(key)
      }
    }
  }

  list() {
    return State.list
  }

  has(key) {
    return State.has(key)
  }

  get(key) {
    return State.get(key)
  }

  use(key) {
    const core = this.core
    if (!State.has(key)) {
      if (core)
        core.warn(`${core.name} id: ${core.id} : Specified state does not exist`)
      return false
    }
    if (key === this.key) return true
    
    let source = State.get(key)
        this.#id = source.id
        this.#key = source.key
        this.#status = source.status
        this.#isEmpty = source.isEmpty
        this.#data = source.data

    if (core) {
      // TODO: build method to rebuild chart from state
      core.refresh()
    }
  }

  export(key=this.key, config={}) {
    return State.export(key, config={})
  }
}