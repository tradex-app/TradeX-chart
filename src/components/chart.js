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

const STYLE_CHART = "border: 1px solid"
const STYLE_SCALE = "position: absolute; top: 0; right: 0; border-left: 1px solid"
export default class Chart {

  #name = "chart"
  #shortname = "chart"
  #core
  #target
  #elChart
  #elWidgets
  #elCanvas
  #elScale

  #Scale

  constructor (core, target) {

    this.#core = core
    this.#target = target
    this.#elChart = target
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
    const styleScale = STYLE_SCALE + ``

    const node = `
      <p>Chart</p>
      <div class="${CLASS_WIDGETS}"></div>
      <canvas id="" width="" height="" style="${STYLE_CHART}"></canvas>
      <div class="${CLASS_SCALE}" style="${styleScale}"></div>
    `
    return node
  }

}
