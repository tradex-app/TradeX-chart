// index.js
// Tools for drawing your confirmtin bias over the price

import Chart from "../components/chart"
import defaultTools from "../definitions/tools"
import { isClass, isFunction } from "../utils/typeChecks"

export default class Tools {

  static #cfg
  static #list

  /**
   * initialize Tools static class
   *
   * @static
   * @param {object} cfg
   */
  static init(cfg) {

    Tools.#cfg = cfg

    // provide tools
    // const list = cfg?.
    // Tools.register(cfg)
  }

  static register(tools, merge=true) {
    this.#list = tools || defaultTools

    for (let t of this.#list) {


      if (t?.sub) {

      }
    }
  }

  static overlays() {

  }

  static isTool(tool) {
    return (
      isClass(tool) &&
      isFunction(tool.prototype?.draw) &&
      !!tool?.isTool
    )
  }

  static get list() {
    return Tools.#list
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


  add(tool) {

  }

  remove(tool) {

  }

}