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

const STYLE_CHART = "position: absolute; top: 0; left: 0; border: 1px solid; border-top: none; border-bottom: none;"
const STYLE_SCALE = "position: absolute; top: 0; right: 0; border-left: 1px solid;"
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
    const styleChart = STYLE_CHART + ` border-color: ${this.#core.chartBorderColour};`
    const styleScale = STYLE_SCALE + ` width: ${this.#core.scaleW - 1}px; border-color: ${this.#core.chartBorderColour};`
    
    const rowsH = DOM.findBySelector(`#${this.#core.id} .${CLASS_ROWS}`).clientHeight
    const rowsW = DOM.findBySelector(`#${this.#core.id} .${CLASS_ROWS}`).clientWidth - 1
    const chartH = rowsH - 1
    const chartW = rowsW - this.#core.scaleW

    const node = `
      <div class="${CLASS_WIDGETS}"></div>
      <canvas id="" width="${chartW}" height="${chartH}" style="${styleChart}"></canvas>
      <div class="${CLASS_SCALE}" style="${styleScale}"></div>
    `
    return node
  }

}
