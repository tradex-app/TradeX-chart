// state.js
// Data state management for the entire chart component library thingy

import * as packageJSON from '../../package.json'
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import Dataset from '../model/dataset'
import { validateDeep, validateShallow, fillGaps, sanitizeCandles } from '../model/validateData'
import { copyDeep, mergeDeep, xMap, uid, isObjectEqual, isArrayEqual } from '../utils/utilities'
import { calcTimeIndex, detectInterval } from '../model/range'
import { ms2Interval, SECOND_MS } from '../utils/time'
import { DEFAULT_TIMEFRAME, DEFAULT_TIMEFRAMEMS } from '../definitions/chart'
import { SHORTNAME } from '../definitions/core'
import TradeXchart from '../core'

const DEFAULTSTATEID = "defaultState"
const DEFAULT_STATE = {
  version: packageJSON.version,
  id: DEFAULTSTATEID,
  key: "",
  status: "default",
  isEmpty: true,
  chart: {
    name: "Primary",
    type: "candles",
    candleType: "CANDLE_SOLID",
    indexed: false,
    data: [],
    settings: {},
    tf: DEFAULT_TIMEFRAME,
    tfms: DEFAULT_TIMEFRAMEMS
  },
  ohlcv: [],
  views: [],
  primary: [],
  secondary: [],
  datasets: [],
  tools: {},
  trades: {
    display: true,
    displayInfo: true
  },
  events: {},
  annotations: {}
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


export default class State {

  static #stateList = new xMap()
  static #dss = {}
  
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
    if (!isObject(state.chart)) {
      state.chart = defaultState.chart
      state.chart.isEmpty = true
      state.chart.data = (isArray(state.ohlcv)) ? state.ohlcv : []
      // Remove ohlcv we have Data
      delete state.ohlcv
    }

    state = mergeDeep(defaultState, state)

    if (deepValidate) 
      state.chart.data = validateDeep(state.chart.data, isCrypto) ? state.chart.data : []
    else 
      state.chart.data = validateShallow(state.chart.data, isCrypto) ? state.chart.data : []

    state.chart.isEmpty = (state.chart.data.length == 0) ? true : false

    if (!isNumber(state.chart?.tf) || deepValidate) {
      let tfms = detectInterval(state.chart.data)
      // this SHOULD never happen, 
      // but there are limits to fixing broken data sent to chart
      if (tfms < SECOND_MS) tfms = DEFAULT_TIMEFRAMEMS
      state.chart.tfms = tfms
    }
    
    if (!isString(state.chart?.tfms) || deepValidate)
      state.chart.tf = ms2Interval(state.chart.tfms)
    
    if (!isArray(state.views)) {
      state.views = defaultState.views
    }

    if (!isArray(state.primary)) {
        state.primary = defaultState.primary
    }

    if (!isArray(state.secondary)) {
        state.secondary = defaultState.secondary
    }

    if (!isObject(state.chart.settings)) {
        state.chart.settings = defaultState.chart.settings
    }

    if (!isArray(state.datasets)) {
        state.datasets = []
    }

    // Build chart order
    if (state.views.length == 0) {
      // add primary chart
      state.views.push(["primary", state.primary])
      // add secondary charts if they exist
      for (let o in state) {
        if (o.indexOf("secondary") == 0) {
          state.views.push([o, state[o]])
        }
      }
    }
    // Process chart order
    let o = state.views
    let c = o.length
    while (c--) {
      if (!isArray(o[c]) || o[c].length == 0)
        o.splice(c, 1)
      else {
        // check each overlay / indicator entry
        let i = state.views[c][1]
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
    if (state.views.length == 0)
      state.views[0] = ["primary", defaultState.primary]
    state.views = new xMap(state.views)
    if (!state.views.has("primary")) 
      state.views.insert("primary", defaultState.primary, 0)
    state.views.get("primary").push(state.chart)

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
 * @param {Object} [config={}] - default {type:"json"}
 * @returns {*}  
 * @memberof State
 */
  static export(key, config={}) {
    if (!State.has(key)) return false
    if (!isObject(config)) config = {}
    const state = State.get(key)
    const type = config?.type
    const data = copyDeep(state.data)
    const vals = data.chart.data
    let stateExport;

    // trim streaming candle because it is not complete
    if (vals.length > 0 &&
        vals[vals.length - 1].length > 6)
        vals.length = vals.length - 1
    data.views.get("primary").pop()
    // convert Map/() to array
    data.views = Array.from(data.views)
    data.version = packageJSON.version

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
  #core
  #status = false
  #isEmpty = true
  #mergeList = []

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
  get allData() {
    return {
      data: this.#data.chart.data,
      primaryPane: this.#data.primary,
      secondaryPane: this.#data.secondary,
      datasets: this.#data.datasets
    }
  }
  get data() { return this.#data }
  get core() { return (this.#core !== undefined) ? this.#core : false }
  get time() { return this.#core.time }
  get range() { return this.#core.range }
  
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
   * @param {string} key - state id
   * @returns {boolean}
   */
  delete(key) {
    if (!isString(key)) return false
    // delete any state but this instance
    if (key !== this.key) {
      State.delete(key)
    }
    // if delete this instance
    // create an empty default state to replace it
    else {
      if (State.has(key)) {
        const empty = State.create()
        this.use(empty.key)
        State.delete(key)
      }
    }
    return true
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

    // invalid state id
    if (!State.has(key)) {
      core.warn(`${core.name} id: ${core.id} : Specified state does not exist`)
      return false
    }

    // same as current state, nothing to do
    if (key === this.key) return true
    
    // stop any streams
    core.stream.stop()
    // clean up panes
    core.MainPane.reset()
    // set chart to use state
    let source = State.get(key)
    this.#id = source.id
    // this.#key = source.key
    this.#status = source.status
    this.#isEmpty = source.isEmpty
    this.#data = source.data

    // create new Range
    const rangeConfig = {
      interval: source.data.chart.tfms,
      core
    }
    core.getRange(null, null, rangeConfig)

    // set Range
    if (this.range.Length > 1) {
      const rangeStart = calcTimeIndex(core.time, undefined)
      const end = (rangeStart) ? 
        rangeStart + this.range.initialCnt :
        source.data.length - 1
      const start = (rangeStart) ? rangeStart : end - this.range.initialCnt
      this.range.initialCnt = end - start
      core.setRange(start, end)
    }

    // rebuild chart
    core.MainPane.restart()

    core.refresh()
  }

  /**
   * export state as an object
   * @param {string} key - state id
   * @param {Object} config 
   * @returns {Object}
   */
  export(key=this.key, config={}) {
    return State.export(key, config={})
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
    if (!isObject(merge)) {
      this.error(`ERROR: ${this.id}: merge data must be type Object!`)
      return false
    }
    let end = (isArray(merge?.ohlcv)) ? merge.ohlcv.length -1 : 0
    // time frames don't match
    if (end > 1 &&
        this.time.timeFrameMS !== detectInterval(merge?.ohlcv)) {
      this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`)
      return false
    }

    // // Not valid chart data
    // if (!isArray(merge?.ohlcv)) {
    //   this.error(`ERROR: ${this.core.id}: merge chart data must be of type Array!`)
    //   return false
    // }

    // if the chart empty is empty set the range to the merge data
    if (this.#isEmpty || !isNumber(this.time.timeFrameMS)) {
      if (!isObject(newRange) ||
          !isNumber(newRange.start) ||
          !isNumber(newRange.end) ) {
        if (end > 1) {
          newRange = {start: end - this.range.initialCnt, end}
        }
      }
    }
    // convert newRange values to timestamps
    if (isObject(newRange)) {
      if (isNumber(newRange?.startTS))
        newRange.start = newRange.startTS
      else
        newRange.start = (isNumber(newRange.start)) ? this.range.value(newRange.start)[0] : this.range.timeMin
      if (isNumber(newRange?.endTS))
        newRange.end = newRange.endTS
      else
        newRange.end = (isNumber(newRange.end)) ? this.range.value(newRange.end)[0] : this.range.timeMax
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
        this.allData.data.push(...mData)
      }
      // chart has data, check for gaps and overlap and then merge
      else {
        // are there gaps in the merge data?
        let tfMS = this.time.timeFrameMS
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
                if (p.name === o.name &&
                    p.type === o.type &&
                    isObjectEqual(p.settings, o.settings)) {
                      p.data = this.merge(p.data, o.data)
                      o.instance.drawOnUpdate = true
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
                if (p.name === o.name &&
                    p.type === o.type &&
                    isObjectEqual(p.settings, o.settings)) {
                      p.data = this.merge(p.data, o.data)
                      o.instance.drawOnUpdate = true
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

      // Do we have trades?
      if (isObject(mTrades)) {
        for (let d in mTrades) {
          
        }
      }

      // set new Range if required
      if (newRange) {
        if (isObject(newRange)) {
          start = (isNumber(newRange.start)) ? this.range.getTimeIndex(newRange.start) : this.range.indexStart
          end = (isNumber(newRange.end)) ? this.range.getTimeIndex(newRange.end) : this.range.indexEnd
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
      this.#isEmpty = false
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

  removeIndicator(i) {
    if (!isString(i)) return false

    const seekAndDestroy = (p, i) => {
      const a = this.data[p]
      for (let d=0; d<a.length; d++) {
        if (a[d].id == i) {
          a.splice(d, 1)
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
    const k1 = Object.keys(t)
    const k2 = Object.keys(TRADE)
    if (!isObject(t) ||
        !isArrayEqual(k1, k2)) return false
    for (let k of k2) {
      if (typeof t[k] !== TRADE[k]) return false
    }

    // insert the trade
    const ts = t.timestamp - (t.timestamp % this.time.timeFrameMS)
    const d = new Date(ts)
          t.dateStr =`${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    if (!isArray(this.allData.trades[ts]))
      this.allData.trades[ts] = []
    this.allData.trades[ts].push(t)
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
    const k1 = Object.keys(e)
    const k2 = Object.keys(EVENT)
    if (!isObject(e) ||
        !isArrayEqual(k1, k2)) return false
    for (let k of k2) {
      if (typeof t[k] !== EVENT[k]) return false
    }

    // insert the event
    const ts = t.timestamp - (t.timestamp % this.time.timeFrameMS)
    const d = new Date(ts)
          e.dateStr =`${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    if (!isArray(this.allData.events[ts]))
      this.allData.events[ts] = []
    this.allData.events[ts].push(e)
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

