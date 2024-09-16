// state.js
// Data state management for the entire chart component library thingy

import * as packageJSON from '../../package.json'
import * as compression from '../utils/compression'
import { isArray, isBoolean, isFunction, isInteger, isNumber, isObject, isString, typeOf } from '../utils/typeChecks'
import { ms2Interval, interval2MS, SECOND_MS, isValidTimestamp, isTimeFrame, TimeData, isTimeFrameMS } from '../utils/time'
import { copyDeep, mergeDeep, xMap, uid, isObjectEqual, isArrayEqual, cyrb53, doStructuredClone } from '../utils/utilities'
import { validateDeep, validateShallow, fillGaps, sanitizeCandles } from '../model/validateData'
import { calcTimeIndex, detectInterval } from '../model/range'
import { DEFAULT_TIMEFRAME, DEFAULT_TIMEFRAMEMS, INTITIALCNT } from '../definitions/chart'
import { SHORTNAME } from '../definitions/core'
import TradeXchart, { isChart } from '../core'
import { Range } from '../model/range'
import Indicator from '../components/overlays/indicator'
import Stream from '../helpers/stream'
import Dataset from '../model/dataset'
import MainPane from '../components/main'
import { OHLCV } from '../definitions/chart'
import Chart from '../components/chart'

const HASHKEY = "state"
const DEFAULTSTATEID = "defaultState"
export const DEFAULT_STATE = {
  version: packageJSON.version,
  id: DEFAULTSTATEID,
  key: "",
  status: "default",
  isEmpty: true,
  allData: {},
  chart: {
    name: "Primary",
    type: "candles",
    candleType: "CANDLE_SOLID",
    indexed: false,
    data: [],
    settings: {},
  },
  ohlcv: [],
  inventory: [],
  primary: [],
  secondary: [],
  datasets: [],
  tools: {
    display: true,
    data: {
      ts: {}
    }
  },
  trades: {
    display: true,
    displayInfo: true,
    data: {
      ts: {}
    }
  },
  events: {
    display: true,
    displayInfo: true,
    data: {
      ts: {}
    }
  },
  annotations: {
    display: true,
    displayInfo: true,
    data: {
      ts: {}
    }
  },
  range: {
    intervalStr: DEFAULT_TIMEFRAME,
    interval: DEFAULT_TIMEFRAMEMS,
    timeFrame: DEFAULT_TIMEFRAME,
    timeFrameMS: DEFAULT_TIMEFRAMEMS,
    initialCnt: INTITIALCNT
  }
}
const CONFIGENTRIES = {
  chart: "object",
  ohlcv: "array",
  range: "object"
}
const TRADE = {
  timestamp: "number",
  id: "string",
  side: "string",
  price: "number",
  amount: "number",
  filled: "number",
  average: "number",
  total: "number",
  tag: "string",
}

const EVENT = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string",
  url: "string",
}

const ANNOTATIONS = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string",
}

const TOOLS = {
  timestamp: "number",
  id: "string",
  type: "string",
  nodes: "array",
}

const validator = {
  trades: TRADE,
  events: EVENT,
  annotations: ANNOTATIONS,
  tools: TOOLS
}

export default class State {

  static #chartList = new xMap()
  static #dss = {}
  
  static get default() { return copyDeep(DEFAULT_STATE) }

  static server(chart) {

    if (!isChart( chart )) return undefined

    let states = new xMap()

    if (!State.#chartList.has(chart.key)) {
      State.#chartList.set(chart.key, {chart, states, active: undefined})
    }

    // const id = chart.key

    // return new Proxy( State, {
    //   get: (obj, prop) => {
    //     switch (prop) {
    //       case "list": return State.list(id)
    //       case "active": return State.active(id)
    //       default: return obj[prop]
    //     }
    //   }
    // })
  }

  static chartList(chart) {
    if (!isChart(chart)) return undefined
    else if (State.#chartList.has(chart.key))
      return State.#chartList.get(chart.key)
    else return undefined
  }

  /**
   * Instantiate new state and add it to list
   * @param {TradeXchart} chart 
   * @param {Object} state 
   * @param {boolean} deepValidate 
   * @param {boolean} isCrypto 
   * @returns {State|undefined}
   */
  static create(chart, state=State.default, deepValidate=false, isCrypto=false) {
    if (!isChart( chart )) return undefined
    
    state.core = chart
    const instance = new State(state, deepValidate, isCrypto)
    const key = instance.key
    let server = State.#chartList.get(chart.key)

    if (!server) {
      State.server(chart)
      server = State.#chartList.get(chart.key)
      server.active = instance
    }

    server.states.set(key, instance)
    return instance
  }

  /**
   * State currently in use
   * @param {TradeXchart} chart - target
   * @returns {State} - State instance
   */
  static active(chart) {
    return State.chartList(chart)?.active
  }

  /**
   * List registered states
   * @param {TradeXchart} chart - target
   * @returns {Array.<State>|undefined} - array of state instances
   */
  static list (chart) {
    let states = State.chartList(chart)?.states
    if (!states) return undefined
    
    return Array.from( states, 
      ([key, value]) => ({key, value}))
  }

  /**
   * Use a chart State - set it to active
   * @param {TradeXchart} chart - target
   * @param {String|Object} state - state key or {id: "someID"} or {key: "stateKey"} or a state object
   * @returns {State|undefined} - chart state instance
   */
  static use(chart, state) {
    let key = (State.has(chart, state)) ? state : 
      (State.has(chart, state?.key)) ? state.key : state

    if (!isString(key) && isObject(state) && Object.keys(state).length > 2) {
      let hash = State.hash(state)
          key = `${SHORTNAME}_${HASHKEY}_${hash}`

      if (!State.has(chart, key)) {
        key = State.create(chart, state).key
      }
    }
    else if (!isString(key) && !isObject(state)) return undefined

    const states = State.#chartList.get(chart.key)
    let previous = states.active
    let active = states.active
    let target = states.states.get(key)
    // invalid state id
    if (!target) {
      chart.log(`${chart.name} id: ${chart.key} : State ${key} does not exist`)
      return undefined
    }
    // set active to target state
    if (key != active?.key) {
      states.previous = { state: active, node: "" }
      active = target

      // rehydrate state
      if (isObject(active?.archive)) {
        let archive = (isString(active?.archive?.data)) ?
          active?.archive.data :
          "";
        let data = (!!active.archive?.compress) ?
          archive.decompress() :
          archive;
        let oldState = JSON.parse(data)
        delete active.archive

        const defaultState = doStructuredClone(State.default)
        State.buildInventory(oldState, defaultState)
    // TODO: set allData to primary[].data
        active.allData.primaryPane = oldState.primary
        active.allData.secondaryPane = oldState.secondary
        active.data.inventory = oldState.inventory
      }
    }

    states.active = active
    return active
  }
  
  static archive(chart, id) {
    let state = State.findStateById(chart, id)
    if (!state) return false
  }

  static findStateById(chart, id) {
    let states = State.chartList(chart)?.states
    if (!states) return undefined

    for (let s of states) {
      if (s[1].id == id) return s[1].key
    }
    return undefined
  }

  static hash(input) {
    let str = JSON.stringify(input)
    return cyrb53(str)
  }

  /**
   * Check if valid state config
   * @param {Object} config - state config
   * @returns {Boolean}
   */
  static isValidConfig(config) {
    if (!isObject(config) || 
        !Object.keys(config).length) 
        return false
    else {
      for (let [key, type] of Object.entries(CONFIGENTRIES)) {
        if (typeOf ( config?.[key] ) === type)
          return true
      }
    }
    return false
  }

  static validate(instance, source=State.default, deepValidate=false, isCrypto=false) {

    const defaultState = doStructuredClone(State.default)
    let state

    if (!isObject(source)) source = defaultState

    if (!(source.core instanceof TradeXchart)) throw new Error(`State : invalid TradeXchart instance`)

    // set up main (primary) chart state (handles price history (candles OHLCV))
    if (!isObject(source.chart)) {
      source.chart = defaultState.chart
      source.chart.data = (isArray(source?.ohlcv)) ? source.ohlcv : []
      source.isEmpty = true
      source.status = "default"
      // Remove ohlcv we have Data
      delete source?.ohlcv
    }

    state = mergeDeep(defaultState, source)

    if (deepValidate) 
      state.chart.data = validateDeep(state.chart.data, isCrypto) ? state.chart.data : []
    else 
      state.chart.data = validateShallow(state.chart.data, isCrypto) ? state.chart.data : []

    state.chart.isEmpty = (state.chart.data.length == 0) ? true : false
    Object.defineProperty( state.allData, "data", {
        get: function() { return state.chart.data }
      }
    )
    
    if (!isObject(state.chart.settings)) {
      state.chart.settings = defaultState.chart.settings
    }

    if (!isArray(state.inventory)) {
      state.inventory = defaultState.inventory
    }

    if (!isArray(state.primary)) {
        state.primary = defaultState.primary
    }
    state.allData.primaryPane = state.primary

    if (!isArray(state.secondary)) {
        state.secondary = defaultState.secondary
    }
    state.allData.secondaryPane = state.secondaryPane

    if (!isArray(state.datasets)) {
        state.datasets = []
    }
    state.allData.datasets = state.datasets

    State.buildInventory(state, defaultState)
    
    // trades

    State.validateData("trades", state)
    state.trades = state.allData.trades

    // events

    State.validateData("events", state)
    state.events = state.allData.events

    // annotations

    State.validateData("annotations", state)
    state.annotations = state.allData.annotations

    // tools

    State.validateData("tools", state)
    state.tools = state.allData.tools

    // Init dataset proxies
    for (var ds of state.datasets) {
      if (!this.#dss) this.#dss = {}
      this.#dss[ds.id] = new Dataset(this, ds)
    }

    return state
  }

  static delete(chart, state) {
    let states = State.chartList(chart)?.states
    if (states) return undefined

    let key = states.getKey(chart, state)
    if (!isString(key) ||
        !states.has(key)
      ) return false
    states.delete(key)
    return true
  }

  static has(chart, key) {
    return State.chartList(chart)?.states?.has(key)
  }

  static get(chart, key) {
    return State.chartList(chart)?.states?.get(key)
  }

  static getKey(chart, target) {
    let key = target

    if (isObject(target) && Object.keys(target).length < 3) {
      if (isString(target?.id)) {
        key = State.findStateById(chart, target.id) || target?.key
      }
      else if (isString(target?.key))
        key = target?.key
      else
        key = undefined
    }
    else if (!isString(target))
      key = undefined
    return key
  }

  static setTimeFrame(chart, key, ohlcv) {
    let state = State.get(chart, key)
    let timeFrame = undefined

    if (!state) return false

    if (state.isEmpty && isArray(ohlcv) && ohlcv.length > 1) {
      timeFrame = detectInterval(ohlcv)
    state.range.timeFrameMS = timeFrame
    state.range.timeFrame = ms2Interval(timeFrame)
    }
    return timeFrame
  }

  /**
   * split price data into OHLCV
   * @static
   * @param {array} data
   * @return {object}  
   * @memberof State
   */
  static ohlcv(data) {
    if (!isArray(data)) return false

    let ohlcv = {
      time: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    }
    let start = 0, end = data.length;
    while (end != 0 && start < end) {
      let val = data[start]
      ohlcv.time.push(val[OHLCV.t])
      ohlcv.open.push(val[OHLCV.o])
      ohlcv.high.push(val[OHLCV.h])
      ohlcv.low.push(val[OHLCV.l])
      ohlcv.close.push(val[OHLCV.c])
      ohlcv.volume.push(val[OHLCV.v])
      start++
    }

    return ohlcv
  }

  /**
   * export state - default json
   * @param {TradeXchart} chart
   * @param {string} key - state unique identifier
   * @param {Object} [config={}]
   * @param {String} config.type - default output: "json"
   * @param {Boolean} config.compress - compression flag
   * @returns {object|undefined}  
   * @memberof State
   */
  static export(chart, key, config={}) {
    if (!State.has(chart, key)) return undefined
    if (!isObject(config)) config = {}
    const state = State.get(chart, key)
    const type = config?.type
    let stateExport;
    let data = {}
    let exclude = [
      "core", "inventory", "range", "timeData"
    ]

    for (let d in state.data) {
      if (exclude.includes(d)) continue

      data[d] = copyDeep(state.data[d])
    }

    // trim streaming candle because it is not complete
    let vals = data.chart.data
    if (vals.length > 0 &&
        vals[vals.length - 1].length > 6)
        vals.length = vals.length - 1

    // Inventory
    // data.inventory.get("primary").pop()
    data.inventory = (isArray(data.inventory)) ? Array.from(data.inventory) : []
    data.version = packageJSON.version
    data.key = state.key

    // Range
    data.range = state.range.export()

    // Time Data
    let {indexed, timeFrame, timeFrameMS, timeZone, timeZoneOffset} = {...state.data.timeData}
    data.timeData = {indexed, timeFrame, timeFrameMS, timeZone, timeZoneOffset}

    switch(type) {
      case "json":
      default :
        const {replacer, space} = {...config};
        stateExport = JSON.stringify(data, replacer, space);
        if (!!config?.compress)
          stateExport = stateExport.compress()
    }
    return stateExport
  }

  /**
   * export state - default json
   * @param {TradeXchart} chart
   * @param {string} key - state unique identifier
   * @param {Object} [config={}] - default {type:"json"}
   * @returns {Promise}  
   * @memberof State
   */
  static asyncExport(chart, key, config={}) {
    return new Promise((resolve, reject) => {
        try {
          resolve (State.export(chart, key, config))
        }
        catch (e) {
          chart.error(e)
          reject ()
        }
      }
    )
  }

  static validateData(type, state) {
    if (!isString(type) || 
        !(type in validator) ||
        !isObject(state)) throw new Error(`ERROR: State: validateData: ${type} unexpected data`)

    if (!isObject(state[type])) state[type] = copyDeep(DEFAULT_STATE[type])
    state[type].display = !!state[type]?.display
    state[type].displayInfo = !!state[type]?.displayInfo
    if (!isObject(state[type].data)) state[type].data = copyDeep(DEFAULT_STATE[type].data)
    else {
      let tradeData = state[type].data
      let allData = state?.data?.allData || state.allData
      let tf = state.range.timeFrame
      State.importData(type, tradeData, allData, tf)
    }
  }

  static buildInventory(state, defaultState) {
    // Build chart order
    if (state.inventory.length == 0) {
      // add primary chart
      state.inventory.push(["primary", state.primary])
      // add secondary charts if they exist
      for (let o in state) {
        if (o.indexOf("secondary") == 0) {
          state.inventory.push([o, state[o]])
        }
      }
    }
    // Process chart order
    let o = state.inventory
    let c = o.length
    while (c--) {
      if (!isArray(o[c]) || o[c].length == 0)
        o.splice(c, 1)
      else {
        // validate each overlay / indicator entry
        let i = state.inventory[c][1]
        let x = i.length
        while (x--) {
          // remove if invalid
          if (!isObject(i[x]) ||
              !isString(i[x].name) ||
              !isString(i[x].type)
              // !isArray(i[x].data)
              )
                i.splice(x, 1)
          // default settings if necessary
          else if (!isObject(i[x].settings))
            i[x].settings = {}
        }
        // if after check, no valid indicators, delete entry
        if (o[c].length == 0) o.splice(c, 1)
      }
    }
    // ensure state has the mandatory primary entry
    if (state.inventory.length == 0)
      state.inventory[0] = ["primary", defaultState.primary]
    state.inventory = new xMap(state.inventory)
    if (!state.inventory.has("primary")) 
      state.inventory.insert("primary", defaultState.primary, 0)
    state.inventory.get("primary").push(state.chart)    
  }

  /**
   * import data (trades, events, annotations, tools) 
   * validate and store in a state
   * @static
   * @param {string} type - type of data to import
   * @param {object} data - trade data to import
   * @param {object} state - State allData
   * @param {object} tf - time frame
   * @memberof State
   */
  static importData(type, data, state, tf) {

    if (!(type in validator)) return false

    if (!isObject(state?.[type])) state[type] = copyDeep(DEFAULT_STATE[type])

    let d = state[type].data
    if (!isObject(d?.[tf]))
      d[tf] = {}

    if (!isObject(data)) return false
    for (let ts in data) {
      if ( 
          isValidTimestamp(ts*1) &&
          isArray(data[ts])
          ) {
            for (let t of data[ts]) {
              if (t?.id) t.id = `${t.id}` 
              if (State.isValidEntry(t, validator[type])) {
                if (!isObject(d?.[tf]))
                d[tf] = {}
                if (!isArray(d[tf]?.[ts]))
                d[tf][ts] = []
                d[tf][ts].push(t)
              }
            }
      }
      else {
        d[ts] = data[ts]
      }
    }
    return true
  }

  static isValidEntry(e, type) {
    const k1 = Object.keys(e)
    const k2 = Object.keys(type)
    if (!isObject(e) ||
        !isArrayEqual(k1, k2)) return false
    for (let k of k2) {
      if (typeof e[k] !== type[k]) return false
    }
    return true
  }

  static buildRange(instance, state, core) {

    /*--- Time Frame ---*/
    let cfg = state.core.config.range
    let range = state.range
    let tfms = detectInterval(state.chart.data)
    
    if (tfms === Infinity) tfms = range.timeFrameMS || DEFAULT_TIMEFRAMEMS

    if (!state.chart.isEmpty && 
        state.chart.data.length > 1 &&
        range.timeFrameMS !== tfms)
      range.timeFrameMS = tfms

    if (!isTimeFrameMS(range.timeFrameMS)) range.timeFrameMS = DEFAULT_TIMEFRAMEMS

    range.timeFrame = ms2Interval(range.timeFrameMS)

    /*--- Range ---*/
    let config = {
      core,
      state: instance, // state,
      interval: range.timeFrame || cfg?.timeFrameMS,
      initialCnt: range?.initialCnt || cfg?.initialCnt,
      limitFuture: range?.limitFuture || cfg?.limitFuture,
      limitPast: range?.limitPast || cfg?.limitPast,
      minCandles: range?.minCandles || cfg?.minCandles,
      maxCandles: range?.maxCandles || cfg?.maxCandles,
      yAxisBounds: range?.yAxisBounds || cfg?.yAxisBounds,
    }
    
    return new Range(range?.start, range?.end, config)
  }

  
  #id = ""
  #key = ""
  #data = {}
  #status = false
  #isEmpty = true
  #timeData
  #dataSource
  #range
  #core
  #chartPanes = new xMap()
  #chartPaneMaximized = {
    instance: null, 
    rowsH: 0,
    panes: {}
  }

  constructor(state=State.default, deepValidate=false, isCrypto=false) {
    if (!(state?.core instanceof TradeXchart)) throw new Error(`State : invalid TradeXchart instance`)
    this.#core = state.core
    this.#data = State.validate(this, state, deepValidate, isCrypto)
    this.#data.range = State.buildRange(this, this.#data, state.core)
    this.#data.timeData = new TimeData(this.#data.range)
    this.#data.chart.ohlcv = State.ohlcv(this.#data.chart.data)
    let hash = State.hash(state)
    this.#key = `${SHORTNAME}_${HASHKEY}_${hash}`
  }

  get id() { return this.#id }
  get key() { return this.#key }
  get status() { return this.#data.status }
  get isEmpty() { return this.#data.isEmpty }
  get core() { return (this.#core !== undefined) ? this.#core : false }
  get data() { return this.#data }
  get time() { return this.#data.timeData }
  get range() { return this.#data.range }
  get chartPanes() { return this.#chartPanes }
  get chartPaneMaximized() { return this.#chartPaneMaximized }
  get allData() {
    return {
      data: this.#data.chart.data,
      ohlcv: this.#data.chart.ohlcv,
      primaryPane: this.#data.primary,
      secondaryPane: this.#data.secondary,
      datasets: this.#data.datasets,
      trades: this.#data.trades.data,
      events: this.#data.events.data,
      annotations: this.#data.annotations.data,
      tools: this.#data.tools.data
    }
  }
  get trades() { return this.#data.trades }
  get events() { return this.#data.events }
  get annotations() { return this.#data.annotations }
  get tools() { return this.#data.tools }
  
  
  error(e) { this.#core.error(e) }

  /**
   * validate and register a chart state
   * @param {Object} state 
   * @param {boolean} deepValidate - validate every entry rather than a sample
   * @param {boolean} isCrypto - validate time stamps against BTC genesis block
   * @returns {State} - State instance
   */
  create(state, deepValidate, isCrypto) {
    return State.create(state, deepValidate, isCrypto)
  }

  /**
   * delete a current or stored chart state
   * @param {String|Object} state - state key or {id: "someID"} or {key: "stateKey"}
   * @returns {boolean}
   */
  delete(state) {
    let key = this.#key

    if (!state) key = State.getKey(this.#core, state)
    if (!isString(key)) {
      core.error(`${core.name} : State.delete() : State not found`)
      return false
    }
    // delete any state but this instance
    if (key !== this.key) {
      State.delete(this.#core, key)
    }
    // if delete this instance
    // create an empty default state to replace it
    else {
      if (State.has(this.#core, key)) {
        const empty = State.create()
        this.use(empty.key)
        State.delete(key)
      }
      else {
        core.error(`${core.name} : State.use() : State not found`)
        return false
      }
    }
    return true
  }

  /**
   * List registered states
   * @returns {Array.<State>|undefined} - array of state instances
   */
  list() {
    return State.list(this.#core)
  }

  /**
   * Query if state instance specified by key (string) exists
   * @param {String} key - state idendifier
   * @returns {Boolean}
   */
  has(key) {
    return State.has(this.#core, key)
  }

  /**
   * Return state instance specified by key (string)
   * @param {String} key - state idendifier
   * @returns {State|undefined}
   */
  get(key) {
    return State.get(this.#core, key)
  }

  /**
   * Set the chart state
   * @param {Object|String} key - state object to register or key string
   * @returns {State|undefined}
   */
  use(key) {
    const errMsg = `TradeX-Chart id: ${this.#core.id} : cannot use supplied key or state`
    if (isString(key) && !State.has(key))
      return undefined
    else if (!State.isValidConfig(key)) {
      this.#core.log(errMsg)
      return undefined
    }

    // clean up panes - remove 
    if (isFunction(this.#core.MainPane?.init)) {
      if (this.#core.stream instanceof Stream)
        this.#core.stream.stop()
      this.#core.progress.start()
      this.#core.MainPane.destroy(false)
    }
    let state = State.use(this.#core, key)

    if (isObject(key))
      key.key = state?.key

    if (isFunction(this.#core.MainPane?.init)) {
      this.#core.MainPane.init(this.#core.MainPane.options)
      this.#core.MainPane.start()

      // this.#core.MainPane.restart()
      this.#core.MainPane.refresh()
      this.#core.progress.stop()
    }
    if (!state)
      this.#core.log(errMsg)

    return state
  }

  /**
   * export state as an object
   * @param {string} key - state id
   * @param {Object} config 
   * @returns {Object}
   */
  export(key=this.key, config={}) {
    return State.export(this.#core, key, config={})
  }

  /**
   * Merge a block of data into the state.
   * Used for populating a chart with back history.
   * Merge data must follow a State format.
   * Optionally set a new range upon merge.
   * @param {Object} merge - merge data must be formatted to a Chart State
   * @param {boolean|object} newRange - false | {startTS: number, endTS: number} | {start: number, end: number}
   * @param {boolean} calc - automatically calculate indicator data (ignore any existing)
   */
  // TODO: merge indicator data?
  // TODO: merge dataset?
  mergeData(merge, newRange=false, calc=false) {

    if (this.isEmpty) State.setTimeFrame(this.key, merge?.ohlcv)

    let tfMS = this.range.timeFrameMS

    if (!isObject(merge)) {
      this.error(`ERROR: ${this.id}: merge data must be type Object!`)
      return false
    }
    let end = (isArray(merge?.ohlcv)) ? merge.ohlcv.length -1 : 0
    // time frames don't match
    if (end > 1 &&
        tfMS !== detectInterval(merge?.ohlcv)) {
      this.error(`ERROR: ${this.core.ID}: merge data time frame does not match existing time frame!`)
      return false
    }

    // // Not valid chart data
    // if (!isArray(merge?.ohlcv)) {
    //   this.error(`ERROR: ${this.core.ID}: merge chart data must be of type Array!`)
    //   return false
    // }

    // if the chart empty is empty set the range to the merge data
    if (this.isEmpty || !isNumber(tfMS)) {
      if (!isObject(newRange) ||
          !isInteger(newRange.start) ||
          !isInteger(newRange.end) ) {
        if (end > 1) {
          newRange = {start: end - this.range.initialCnt, end}
        }
      }
    }
    // convert newRange values to timestamps
    if (isObject(newRange)) {
      if (isInteger(newRange?.startTS))
        newRange.start = newRange.startTS
      else
        newRange.start = (isInteger(newRange.start)) ? this.range.value(newRange.start)[0] : this.range.timeMin
      if (isInteger(newRange?.endTS))
        newRange.end = newRange.endTS
      else
        newRange.end = (isInteger(newRange.end)) ? this.range.value(newRange.end)[0] : this.range.timeMax
    }
    // ensure range remains temporally fixed
    else {
      newRange = {}
      newRange.start = this.range.timeMin
      newRange.end = this.range.timeMax
    }

    let i, j, start;
    let mData = merge?.ohlcv || false
    const data = this.allData.data
    const primaryPane = this.allData?.primaryPane
    const mPrimary = merge?.primary || false
    const secondaryPane = this.allData?.secondaryPane
    const mSecondary = merge?.secondary || false
    const dataset = this.allData?.dataset?.data
    const mDataset = merge?.dataset?.data || false
    const trades = this.allData?.trades
    const mTrades = merge?.trades || false
    const events = this.allData?.events
    const mEvents = merge?.events || false    
    const inc = (!isArray(mData)) ? 0 : (this.range.inRange(mData[0][0])) ? 1 : 0
    const refresh = {}

    // Do we have price data?
    if (isArray(mData) && mData.length > 0) {
      i = mData.length - 1
      j = data.length - 1

      refresh.mData = 
      this.range.inRange(mData[0][0]) &&
      this.range.inRange(mData[0][i])

      // if not a candle stream
      if (!isBoolean(mData[i][7]) &&
          mData[i].length !== 8 &&
          mData[i][6] !== null &&
          mData[i][7] !== true
          ) {
        // sanitize data, must be numbers
        // entries must be: [ts,o,h,l,c,v]
        mData = sanitizeCandles(mData)
      }
      // is a candle stream
      else {
        // should range auto increment?
        if (newRange.end >= this.range.timeFinish &&
            newRange.start <= this.range.timeFinish) {
              newRange.start += this.range.interval
              newRange.end += this.range.interval
            }
      }
      
      // chart is empty so simply add the new data
      if (data.length == 0) {
        let ohlcv = State.ohlcv(mData)
        this.allData.data.push(...mData)
        this.allData.ohlcv = {...ohlcv}
      }
      // chart has data, check for gaps and overlap and then merge
      else {
        // are there gaps in the merge data?
        let mStart = mData[0][0]
        let mEnd = mData[mData.length - 1][0]
        let mDataMS = (mData.length - 1) * tfMS

        // fill the gaps
        if (mEnd > mStart + mDataMS)
          mData = fillGaps(mData, tfMS)

        // merge the new data
        this.data.chart.data = this.merge(data, mData)
      }

      // calculate all indicators if required
      // and update existing data
      if (calc) this.#core.calcAllIndicators(calc)

      // otherwise merge the new indicator data
      else {
        // Do we have primaryPane indicators?
        if (isArray(mPrimary) && mPrimary.length > 0) {
          for (let o of mPrimary) {
            if (isArray(o?.data) && o?.data.length > 0) {
              for (let p of primaryPane) {
                if (isObject(p) &&
                    p.name === o.name &&
                    p.type === o.type &&
                    isObjectEqual(p.settings, o.settings)) {
                      p.data = this.merge(p.data, o.data)
                      this.#core.getIndicator(p.id).drawOnUpdate = true
                }
              }
            }
          }
        }

        // Do we have secondaryPane indicators?
        if (isArray(mSecondary) && mSecondary.length > 0) {
          for (let o of mSecondary) {
            if (isArray(o?.data) && o?.data.length > 0) {
              for (let p of secondaryPane) {
                if (isObject(p) &&
                    p.name === o.name &&
                    p.type === o.type &&
                    isObjectEqual(p.settings, o.settings)) {
                      p.data = this.merge(p.data, o.data)
                      this.#core.getIndicator(p.id).drawOnUpdate = true
                }
              }
            }
          }
        }

        // calculate any missing indicator data if required
        this.#core.calcAllIndicators()
      }

      // Do we have datasets?
      if (isArray(mDataset) && mDataset.length > 0) {
        for (let o of mDataset) {
          if (isArray(o?.data) && o?.data.length > 0) {
            for (let p of dataset) {
              if (p.name === o.name &&
                  p.type === o.type &&
                  isObjectEqual(p.settings, o.settings)) {
                    p.data = this.merge(p.data, o.data)
              }
            }
          }
        }
      }

      // Do we have events?
      if (isObject(mEvents)) {
        for (let e in mEvents) {
          
        }
      }

      // Trades
      // Do we have trades?
      if (isObject(mTrades)) {
        State.importTrades(mTrades, this.allData, this.time.timeFrame)
      }

      // set new Range if required
      if (newRange) {
        if (isObject(newRange)) {
          start = (isInteger(newRange.start)) ? this.range.getTimeIndex(newRange.start) : this.range.indexStart
          end = (isInteger(newRange.end)) ? this.range.getTimeIndex(newRange.end) : this.range.indexEnd
        }
        else {
          if (mData[0][0] )
          start = this.range.indexStart + inc
          end = this.range.indexEnd + inc
        }
        this.#core.setRange(start, end)
      }

      let r, u = false;
      for (r in refresh) {
        u = u || r
      }

      if (merge.ohlcv.length > 1) this.#core.emit("state_mergeComplete")

      if (u) this.#core.refresh()
      this.#data.isEmpty = false
      return true
    }
  }

  merge(data, mData) {
    let merged = []
    let older, newer;

    if (data[0][0] < mData[0][0]) {
      older = data
      newer = mData
    }
    else {
      older = mData
      newer = data
    }

    // handle price stream
    if (newer.length == 1 &&
        newer[0][0] == older[older.length-1][0]) {
        older[older.length-1] = newer[0]
        merged = older
    }
    else if (newer.length == 1 &&
        newer[0][0] == older[older.length-1][0] + this.range.interval) {
        merged = older.concat(newer)
    }

    // overlap between existing data and merge data
    else if (older[older.length-1][0] >= newer[0][0]) {
      let o = 0
      while (older[o][0] < newer[0][0]) {
        merged.push(older[o])
        o++
      }

      // append newer array
      merged = merged.concat(newer)
      // are there any trailing entries to append?
      let i = o + newer.length
      if (i < older.length) {
        merged = merged.concat(older.slice(i))
      }
    }

    // no overlap, but a gap exists
    else if (newer[0][0] - older[older.length-1][0] > this.range.interval) {
      merged = older
      let fill = older[older.length-1][0]
      let gap = Math.floor((newer[0][0] - fill) / this.range.interval)
      for(gap; gap > 0; gap--) {
        let arr = Array(newer[0].length).fill(null)
            arr[0] = fill
            fill =+ this.range.interval
        merged.push(arr)
        merged = merged.concat(newer)
      }
    }

    // no overlap, insert the new data
    else {
      merged = older.concat(newer)
    }

    return merged
  }

  addIndicator(i, p) {
    if (isObject(i) && p == "primary") {
      i.params.overlay.id = i.instance.id
      this.#data.primary.push(i.params.overlay)
    }
    else if (i instanceof Chart && p == "secondary") {
      this.#data.secondary.push(...i.options.view)
      this.range.maxMinDatasets()
    }
    else return false
  }

  removeIndicator(i) {
    if (!isString(i)) return false

    const seekAndDestroy = (p, i) => {
      const a = this.data[p]
      for (let d=0; d<a.length; d++) {
        if (a[d].id == i) {
          a.splice(d, 1)
          this.range.maxMinDatasets()
          return true
        }
      }
      return false
    }

    if (seekAndDestroy("primary", i)) return true
    if (seekAndDestroy("secondary", i)) return true
    return false
  }

  addTrade(t) {
    // validate trade entry
    if (!State.isValidEntry(t, TRADE)) return false

    // insert the trade
    const ts = t.timestamp - (t.timestamp % tfMS)
    const d = new Date(ts)

    t.dateStr =`${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;

    this.allData.trades.data.ts[t.timestamp] = t
    this.allData.trades.data[tf][ts] = t

    this.#core.emit("state_tradeAdded", t)
    this.#core.emit("trade_added", t)
    return true
  }

  /**
   * Remove trade entry from state
   * TODO:
   * @param {object} t - trade
   */
  removeTrade(t) {
    console.log("TODO: state.removeTrade()")
  }

  addEvent(e) {
    // validate event entry
    if (!State.isValidEntry(e, EVENT)) return false

    // insert the event
    const ts = t.timestamp - (e.timestamp % tfMS)
    const d = new Date(ts)

    e.dateStr =`${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;

    this.allData.events.data.ts[e.timestamp] = e
    this.allData.events.data[tf][ts] = e

    this.#core.emit("state_eventAdded", e)
    this.#core.emit("event_added", e)
    return true
  }

  /**
   * Remove trade entry from state
   * TODO:
   * @param {object} e - event
   */
  removeEvent(e) {
    console.log("TODO: state.removeEvent()")
  }

}

