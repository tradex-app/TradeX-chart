// state.js
// State management for the entire chart component library thingy

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
// import Store from './store'
// import customEvent from '../events/custom'
import Dataset from '../helpers/dataset'
import { validateDeep, validateShallow } from '../helpers/validateData'
import { mergeDeep } from '../utils/utilities'

const DEFAULT_STATE = {
  chart: {
    type: "candles",
    candleType: "CANDLE_SOLID",
    indexed: false,
    data: [],
    settings: {},
    row: {},
    tf: ""
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

  constructor(state, deepValidate=false) {
    // this.#store = new Store()

    // validate state
    if (isObject(state)) {
      this.#data = this.validateState(state)
      this.#status = "valid"
    }
    else {
      this.defaultState()
      this.#status = "default"
    }
  }

  static create(state, deepValidate=false) {
    const instance = new State(state, deepValidate=false)
    State.#stateList.push(instance)
    return instance
  }

  static delete(state) {

  }

  getStatus() { return this.#status }

  validateState(state, deepValidate=false) {

    if (!('chart' in state)) {
      state.chart = {
          type: 'Candles',
          candleType: "CANDLE_SOLID",
          data: state.ohlcv || []
      }
    }

    if (deepValidate) 
      state.chart.data = validateDeep(state.chart.data) ? state.chart.data : []
    else 
      state.chart.data = validateShallow(state.chart.data) ? state.chart.data : []

    if (!('onchart' in state)) {
        state.onchart = []
    }

    if (!('offchart' in state)) {
        state.offchart = []
    }

    if (!state.chart.settings) {
        state.chart.settings = {}
    }

    // Remove ohlcv we have Data v1.1^
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