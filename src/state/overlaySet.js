// overlaySet.js
// management of cross-state persistent overlays
// overlays, indicators, drawing tools, markers

import State from ".";
import TradeXchart, { isChart } from "../core";
import { xMap } from "../utils/utilities";


export class OverlaySet {

  static #setList = new xMap

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

  static create(chart, state) {
    const instance = new OverlaySet(chart, state)
    const key = instance.key
    let server = OverlaySet.#setList.get(chart.key)

    if (!server) {
      OverlaySet.server(chart)
      server = OverlaySet.#setList.get(chart.key)
      server.active = instance
    }

    server.states.set(key, instance)
    return instance
  }

  /**
   * State currently in use
   * @param {TradeXchart} chart - target
   * @returns {OverlaySet} - OverlaySet instance
   */
  static active(chart) {
    return OverlaySet.setList(chart)?.active
  }

  #core
  #state
  #key

  constructor(core, state) {

    if (!(core instanceof TradeXchart)) throwError(`requires a valid chart instance`)
    if (!(state instanceof State)) throwError(`requires a valid State instance`)
    
    this.#core = core
    this.#state = state

  }

  get core() { return this.#core }
  get state() { return this.#state }
  get key() { return this.#key }

}

function consoleError(c, e) {
  c.error(`TradeX-chart: ${c.id}: Overlay Set : ${e}`)
}

function throwError(id, e) {
  throw new Error(`TradeX-chart: ${id} : Overlay Set : ${e}`)
}
