// state.js
// Data state management for the entire chart component library thingy

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
// import Store from './store'
// import customEvent from '../events/custom'
import Dataset from '../model/dataset'
import { validateDeep, validateShallow } from '../model/validateData'
import { mergeDeep } from '../utils/utilities'
import { detectInterval } from '../model/range'
import { ms2Interval } from '../utils/time'
import { SECOND, DEFAULT_TIMEFRAME, DEFAULT_TIMEFRAMEMS } from '../definitions/chart'

const DEFAULT_STATE = {
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

  static #stateList = []
  
  #id = ""
  #data = {}
  #initialState = ""
  #currentState = ""
  #nextState
  #states = {}
  #store
  #dss = {}
  #status = false
  #isEmpty = true

  constructor(state, deepValidate=false, isCrypto=false) {
    // this.#store = new Store()

    // validate state
    if (isObject(state)) {
      this.#data = this.validateState(state, deepValidate, isCrypto)
      this.#status = "valid"
      this.#isEmpty = (this.#data.chart?.isEmpty) ? true : false
    }
    else {
      this.defaultState()
      this.#status = "default"
      this.#isEmpty = true
    }
  }

  static create(state, deepValidate=false, isCrypto=false) {
    const instance = new State(state, deepValidate, isCrypto)
    State.#stateList.push(instance)
    return instance
  }

  static delete(state) {

  }

  get status() { return this.#status }
  get data() { return this.#data }
  get isEmpty() { return this.#isEmpty }

  validateState(state, deepValidate=false, isCrypto=false) {

    if (!('chart' in state)) {
      state.chart = DEFAULT_STATE.chart
      state.chart.data = state?.ohlcv || []
      state.chart.settings = state?.settings || state.chart.settings
      state.chart.isEmpty = true
    }

    if (deepValidate) 
      state.chart.data = validateDeep(state.chart.data, isCrypto) ? state.chart.data : []
    else 
      state.chart.data = validateShallow(state.chart.data, isCrypto) ? state.chart.data : []

    if (!isNumber(state.chart?.tf) || deepValidate) {
      let tfms = detectInterval(state.chart.data)
      // this SHOULD never happen, 
      // but there are limits to fixing broken data sent to chart
      if (tfms < SECOND) tfms = DEFAULT_TIMEFRAMEMS
      state.chart.tfms = tfms
    }
    
    if (!isString(state.chart?.tfms) || deepValidate)
      state.chart.tf = ms2Interval(state.chart.tfms)

    if (!('onchart' in state)) {
        state.onchart = DEFAULT_STATE.onchart
    }

    if (!('offchart' in state)) {
        state.offchart = DEFAULT_STATE.offchart
    }

    if (!state.chart.settings) {
        state.chart.settings = DEFAULT_STATE.chart.settings
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

  defaultState() {
    this.#data = DEFAULT_STATE
  }

  deepMerge(target, source) {
    return mergeDeep(target, source)
  }

}