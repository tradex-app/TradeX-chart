// state.js
// State management for the entire chart component library thing

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import Dataset from '../units/dataset'

export default class State {

  static #stateList = []
  
  #id = ""
  #data = {
    chart: {
      type: "candles",
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
  #initialState = ""
  #currentState = ""
  #nextState
  #states = {}
  #dss = {}

  constructor(state) {
    // validate state
    if (isObject(state)) this.validateState(state)
    else this.defaultState()
  }

  static create(state) {
    State.#stateList.push(new State(id, state))
  }

  static delete(state) {

  }

  validateState(state) {

    if (!('chart' in this.#data)) {
      this.#data.chart = {
          type: 'Candles',
          data: this.#data.ohlcv || []
      }
    }

    if (!('onchart' in this.#data)) {
        this.#data.onchart = []
    }

    if (!('offchart' in this.#data)) {
        this.#data.offchart = []
    }

    if (!this.#data.chart.settings) {
        this.#data.chart.settings = {}
    }

    // Remove ohlcv we have Data v1.1^
    delete this.#data.ohlcv

    if (!('datasets' in this.#data)) {
        this.#data.datasets = []
    }

    // Init dataset proxies
    for (var ds of this.#data.datasets) {
      if (!this.#dss) this.#dss = {}
      this.dss[ds.id] = new Dataset(this, ds)
    }
  }

  defaultState() {

  }

  /**
   * Deep Merge
   * https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6?permalink_comment_id=2930530#gistcomment-2930530
   */
  merge(target, source) {
    const isObject = (obj) => obj && typeof obj === 'object';
  
    if (!isObject(target) || !isObject(source)) {
      return source;
    }
  
    Object.keys(source).forEach(key => {
      const targetValue = target[key];
      const sourceValue = source[key];
  
      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        target[key] = targetValue.concat(sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
      } else {
        target[key] = sourceValue;
      }
    });
  
    return target;
  }

}