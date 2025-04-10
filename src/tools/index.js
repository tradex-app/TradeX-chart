// index.js
// Tools for drawing your confirmtin bias over the price

import Chart from "../components/chart"
import defaultTools from "../definitions/tools"
import { isArray, isArrayOfType, isClass, isFunction, isObject } from "../utils/typeChecks"
import { getPrototypeAt, prototypeHas, valuesInArray } from "../utils/utilities"

export default class Tools {

  static #cfg
  static #listByGroup = []
  static #list = []

  /**
   * initialize Tools static class
   *
   * @static
   * @param {object} cfg
   */
  static init(cfg) {

    Tools.#cfg = cfg
  }

  static register(tools=defaultTools, merge=true) {
    let keys = ["id", "name", "icon", "event", "class"]
    let sub = []
    let test = (t) => {
      let k = Object.keys(t)
      return valuesInArray(keys, k) && Tools.isTool(t.class)
    }
    let loop = (entries, arr) => {
      for (let t of entries) {

        if (isArray(t?.sub)) {
          if (isArrayOfType(t.sub, "object"))
            sub = loop(t.sub, [])
            if (sub.length > 0)
              t.sub = sub
        }
        
        if (test(t)) {
          arr.push(t)
          Tools.#list.push(t)
        }
      }
      return arr
    }
    
    let result = []
    if (isArray(tools) && tools.length == 0)
      result = []
    else
    if (isArrayOfType(tools, "object") && tools.length > 0) {
      result = loop(tools, [])
    }
    else
      result = loop(defaultTools, [])

    this.#listByGroup = result
  }

  static overlays() {

  }

  static isTool(tool) {
    return (
      isClass(tool) &&
      isFunction(tool.prototype?.draw) &&
      prototypeHas("isTool", tool)
    )
  }

  static get list() {
    return Tools.#list
  }

  static get listByGroup() {
    return Tools.#listByGroup
  }

  #chart
  #viewport
  #stateMachine

  constructor(chart) {
    if (!(chart instanceof Chart))
      throw new Error("Class Tools requires a valid Chart instance.")

    this.#chart = chart
    this.#viewport = chart.graph.overlays.list.get("tools").layer.viewport
  }

  get core() { return Tools.#cfg.core }
  get chart() { return this.#chart }
  get viewport() { return this.#viewport }
  get stateMachine() { return this.#stateMachine }
  get mainStateMachine() { return this.core.MainPane.stateMachne }

  onToolBegin() {
    
  }

  onToolEnd() {
    
  }

  add(tool) {

  }

  remove(tool) {

  }

}