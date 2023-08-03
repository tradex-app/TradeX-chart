// overlay.js
// parent class for overlays to build upon

import { isBoolean } from "../../utils/typeChecks"
import xAxis from "../axis/xAxis"
import yAxis from "../axis/yAxis"

export default class Overlay {

  #parent
  #core
  #config = {}
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #params
  #doDraw = true

  id

  constructor(target, xAxis=false, yAxis=false, theme, parent, params={}) {

    this.#core = parent.core
    this.#parent = parent
    this.#config = parent.core.config
    this.#target = target
    this.#scene = target.scene
    this.#theme = theme
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#params = params
  }

  get core() { return this.#core }
  get parent() { return this.#parent }
  get target() { return this.#target }
  get config() { return this.#config }
  get params() { return this.#params }
  get scene() { return this.#scene }
  get theme() { return this.#theme }
  get chart() { return this.#parent.parent.parent }
  get xAxis() { return this.getXAxis() }
  get yAxis() { return this.getYAxis() }
  get overlay() { return this.#params.overlay }
  set doDraw(d) { this.#doDraw = (isBoolean(d)) ? d : false }
  get doDraw() { return this.#doDraw }
  get context() { return this.contextIs() }

  destroy() {
  }

  /**
   * Set a custom event listener
   * @param {string} topic
   * @param {function} handler
   * @param {*} context
   * @memberof Overlay
   */
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }

  /**
   * Remove a custom event listener
   * @param {string} topic
   * @param {function} handler
   * @memberof Overlay
   */
  off(topic, handler) {
    this.#core.off(topic, handler);
  }

  /**
   * Broadcast an event
   * @param {string} topic
   * @param {*} data
   * @memberof Overlay
   */
  emit(topic, data) {
    this.core.emit(topic, data)
  }

  getXAxis() {
    if (this.#xAxis instanceof xAxis) return this.#xAxis
    else if ("time" in this.#parent) return this.#parent.time.xAxis
    else return false
  }

  getYAxis() {
    if (this.#yAxis instanceof yAxis) return this.#yAxis
    else if ("scale" in this.#parent) return this.#parent.scale.yAxis
    else return false
  }

  contextIs() {
    if (!this.#xAxis && !this.#yAxis) return "chart"
    else if (this.#xAxis instanceof xAxis) return "timeline"
    else if (this.#yAxis instanceof yAxis) return "scale"
    else return false
  }
}