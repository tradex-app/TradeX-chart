// main.js
// Main Pane that holds the chart and off chart indicators
// Providing: chart, off chart indicators

import DOM from "../utils/DOM"
import Timeline from './timeLine'
import Chart from "./chart"

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

const STYLE_ROWS = "width:100%; min-width:100%;"
const STYLE_TIME = "border-top: 1px solid; width:100%; min-width:100%;"
const STYLE_SCALE = "border-left: 1px solid;"


export default class MainPane {

  #name = "Utilities"
  #shortname = "Main"
  #core
  #elMain
  #elWidgetsG
  #elRows
  #elTime
  #elChart

  #Rows = []
  #Chart
  #Time


  constructor (core) {

    this.#core = core
    this.#elMain = core.elMain
    this.init()
  }

  log(l) { if (this.#core.logs) console.log(l) }
  warning(w) { if (this.#core.warnings) console.warn(l) }
  error(e) { if (this.#core.errors) console.error(e) }

  init() {
    this.mount(this.#elMain)
    this.mountRow(this.#elRows, CLASS_CHART)

    this.#elChart = DOM.findBySelector(`#${this.#core.id} .${CLASS_CHART}`)

    this.#Time = new Timeline(this.#core, this.#elTime)
    this.#Chart = new Chart(this.#core, this.#elChart)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()

    this.#elWidgetsG = DOM.findBySelector(`#${this.#core.id} .${CLASS_WIDGETSG}`)
    this.#elRows = DOM.findBySelector(`#${this.#core.id} .${CLASS_ROWS}`)
    this.#elTime = DOM.findBySelector(`#${this.#core.id} .${CLASS_TIME}`)
  }

  mountRow(el, type) {
    el.innerHTML = this.rowNode(type)
  }

  unmountRow() {

  }

  defaultNode() {
    const styleRows = STYLE_ROWS + `height: calc(100% - ${this.#core.timeH}px)`
    const styleTime = STYLE_TIME + ` height: ${this.#core.timeH}px; border-color: ${this.#core.chartBorderColour};`

    const node = `
    <div class="${CLASS_WIDGETSG}"></div>
    <div class="${CLASS_ROWS}" style="${styleRows}"></div>
    <div class="${CLASS_TIME}" style="${styleTime}">
      <canvas id=""><canvas/>
    </div>
    `
    return node
  }

  rowNode(type) {
    const styleScale = STYLE_SCALE + ` border-color: ${this.#core.chartBorderColour};`

    const node = `
      <div class="${CLASS_ROW} ${type}">
        <div class="${CLASS_WIDGETS}"></div>
        <canvas><canvas/>
        <div class="${styleScale}">
          <canvas id=""><canvas/>
        </div>
      </div>
    `
    return node
  }
}