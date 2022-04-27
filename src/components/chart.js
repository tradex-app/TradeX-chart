// chart.js
// Chart - where most of the magic happens
// Providing: the playground for price movements, indicators and drawing tools

import DOM from "../utils/DOM"
import ScaleBar from "./scale"
import {
  NAME,
  ID,
  CLASS_DEFAULT,
  CLASS_UTILS ,
  CLASS_BODY,
  CLASS_WIDGETSG,
  CLASS_TOOLS,
  CLASS_MAIN,
  CLASS_TIME,
  CLASS_ROWS,
  CLASS_ROW,
  CLASS_CHART,
  CLASS_SCALE,
  CLASS_WIDGETS,
  CLASS_ONCHART,
  CLASS_OFFCHART,
} from '../definitions/core'
export default class Chart {

  #core
  #elChart
  #elWidgets
  #elCanvas
  #elScale

  #Scale

  constructor (core) {

    this.#core = core
    this.#elChart = core.elChart
    this.init()
  }

  log(l) { if (this.#core.logs) console.log(l) }
  warning(w) { if (this.#core.warnings) console.warn(l) }
  error(e) { if (this.#core.errors) console.error(e) }

  get scale() { return this.#Scale }
  get elScale() { return this.#elScale }

  init() {
    this.mount(this.#elChart)

    this.Scale = new ScaleBar(this.#core, this)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()

    this.#elWidgets = DOM.findBySelector(`#${this.#core.id} .${CLASS_WIDGETS}`)
    this.#elCanvas = DOM.findBySelector(`#${this.#core.id} .${CLASS_CHART} canvas`)
    this.#elScale = DOM.findBySelector(`#${this.#core.id} .${CLASS_CHART} .${CLASS_SCALE}`)
  }

  defaultNode() {
    const node = `
      <p>Chart</p>
      <div class="${CLASS_WIDGETS}"></div>
      <canvas></canvas>
      <div class="${CLASS_SCALE}"></div>
    `
    return node
  }

}
