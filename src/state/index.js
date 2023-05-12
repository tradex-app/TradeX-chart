// state.js
// Data state management for the entire chart component library thingy

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
// import Store from './store'
// import customEvent from '../events/custom'
import Dataset from '../model/dataset'
import { validateDeep, validateShallow } from '../model/validateData'
import { copyDeep, mergeDeep } from '../utils/utilities'
import { detectInterval } from '../model/range'
import { ms2Interval, SECOND_MS } from '../utils/time'
import { DEFAULT_TIMEFRAME, DEFAULT_TIMEFRAMEMS } from '../definitions/chart'

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

  static create(state, deepValidate=false, isCrypto=false) {
    const instance = new State(state, deepValidate, isCrypto)
    State.#stateList.push(instance)
    return instance
  }

  static delete(state) {

  }
  
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

  get status() { return this.#status }
  get data() { return this.#data }
  get isEmpty() { return this.#isEmpty }

  validateState(state, deepValidate=false, isCrypto=false) {

    const defaultState = copyDeep(DEFAULT_STATE)

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

  defaultState() {
    this.#data = copyDeep(DEFAULT_STATE)
  }

  deepMerge(target, source) {
    return mergeDeep(target, source)
  }


  /**
   * export state - default json
   * @param {object} [config={}] - default {type:"json"}
   * @return {*}  
   * @memberof State
   */
  exportState(config={}) {
    if (!isObject) config = {}
    const type = config?.type
    const data = copyDeep(this.#data)
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

}