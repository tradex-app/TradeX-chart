// overlay.js
// parent class for overlays to build upon

import { isBoolean } from "../../utils/typeChecks"

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
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set doDraw(d) { this.#doDraw = (isBoolean(d)) ? d : false }
  get doDraw() { return this.#doDraw }
}