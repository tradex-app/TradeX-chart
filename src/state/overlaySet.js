// overlaySet.js
// management of cross-state persistent overlays
// overlays, indicators, drawing tools, markers

import * as packageJSON from '../../package.json'
import State, { hashKey } from "./chart-state";
import TradeXchart, { isChart } from "../core";
import { isObject, isString } from "../utils/typeChecks";
import { doStructuredClone, xMap } from "../utils/utilities";


const DEFAULT_SET = {
  version: packageJSON.version,
  id: "",
  key: "",
  overlays: {},
  indicators: {},
  tools: {},
  markers:{}
}

export class OverlaySet {

  static #setList = new xMap

  static get default() { return doStructuredClone(DEFAULT_SET) }

  static server(chart) {

    if (!isChart(chart)) return undefined

    let sets = new xMap()

    if (!OverlaySet.#setList.has(chart.key)) {
      OverlaySet.#setList.set(chart.key, { chart, sets, active: undefined })
    }
  }

  static setList(chart) {
    if (!isChart(chart)) return undefined
    else if (OverlaySet.#setList.has(chart.key))
      return OverlaySet.#setList.get(chart.key)
    else return undefined
  }

  /**
   * Instantiate new overlay set and add it to list
   * @param {TradeXchart} chart 
   * @param {Object} state 
   * @param {Object} set
   * @returns {OverlaySet|undefined}
   */
  static create(chart, state, set) {
    const instance = new OverlaySet(chart, state)
    const key = instance.key
    let server = OverlaySet.#setList.get(chart.key)

    if (!server) {
      OverlaySet.server(chart)
      server = OverlaySet.#setList.get(chart.key)
      server.active = instance
    }

    server.sets.set(key, instance)
    return instance
  }

  /**
   * Set currently in use
   * @param {TradeXchart} chart - target
   * @returns {OverlaySet} - OverlaySet instance
   */
  static active(chart) {
    return OverlaySet.setList(chart)?.active
  }

/**
 * List registered sets
 * @param {TradeXchart} chart - target
 * @returns {Array.<Object>|undefined} - array of set instances
 */
  static list(chart) {
    let sets = OverlaySet.setList(chart)?.sets
    if (!sets) return undefined

    return Array.from(sets,
      ([key, value]) => ({ key, value }))
  }


  /**
   * Use a chart Overlay Set - set it to active
   * @param {TradeXchart} chart - target
   * @param {String|Object} set - set key or {id: "someID"} or {key: "setKey"} or a set object
   * @returns {OverlaySet|undefined} - chart set instance
   */
  static use(chart, set=OverlaySet.default) {
    let key = (OverlaySet.has(chart, set)) ? set :
      (OverlaySet.has(chart, set?.key)) ? set.key : set

    if (!isString(key) && isObject(set) && !!Object.keys(set).length) {
      key = hashKey(set)

      if (!OverlaySet.has(chart, key)) {
        key = OverlaySet.create(chart, set).key
      }
    }
    else if (!isString(key) && !isObject(set)) return undefined

  }

  static delete(chart, set) {
    let sets = OverlaySet.setList(chart)?.sets
    if (!sets) return undefined
    let key = set;
    if (set instanceof OverlaySet) key = set.key
    if (!isString(key) ||
      !sets.has(key)
    ) return false
    sets.delete(key)
    return true
  }

  static has(chart, key) {
    return OverlaySet.setList(chart)?.sets?.has(key)
  }

  static get(chart, key) {
    return OverlaySet.setList(chart)?.sets?.get(key)
  }

  static getKey(chart, target) {
    let key = target

    if (isObject(target) && Object.keys(target).length < 3) {
      if (isString(target?.id)) {
        key = OverlaySet.findSetById(chart, target.id) || target?.key
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
  
  static findSetById(chart, id) {
    let sets = OverlaySet.setList(chart)?.sets
    if (!sets) return undefined

    for (let s of sets) {
      if (s[1].id == id) return s[1].key
    }
    return undefined
  }

  /**
   * Check if valid Overlay Set config
   * @param {Object} config - set config
   * @returns {Boolean}
   */
  static isValidConfig(config) {
    if (!isObject(config) ||
      !Object.keys(config).length)
      return false
    else {
      for (let [key, type] of Object.entries(config)) {
        if (key in DEFAULT_SET && 
            typeof config[key] !== typeof DEFAULT_SET[key])
          return false
      }
      return true
    }
  }

  static validate(instance, ) {

    const defaultSet = doStructuredClone(OverlaySet.default)

  }

  static chartOverlaySet(chart) {
    if (!isChart(chart)) return {}

    const set = {}
    for (let [key, value] of chart.ChartPanes) {

    }
  }

  #core
  #state
  #data = OverlaySet.default

  constructor(core, state, set) {

    if (!(core instanceof TradeXchart)) throwError(`requires a valid chart instance`)
    if (!(state instanceof State)) throwError(`requires a valid State instance`)
    
    this.#core = core
    this.#state = state
    this.#data.indicators = core.Indicators
  }

  get core() { return this.#core }
  get state() { return this.#state }
  get key() { return this.#data.key }

}

function consoleError(c, e) {
  c.error(`TradeX-chart: ${c.id}: Overlay Set : ${e}`)
}

function throwError(id, e) {
  throw new Error(`TradeX-chart: ${id} : Overlay Set : ${e}`)
}
