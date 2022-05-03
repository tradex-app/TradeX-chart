// main.js
// Main Pane that holds the chart and off chart indicators
// Providing: chart, off chart indicators

import DOM from "../utils/DOM"
import Timeline from './timeline'
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
  #shortName = "Main"
  #mediator
  #options
  #elMain
  #elWidgetsG
  #elRows
  #elTime
  #elChart

  #Rows = []
  #Chart
  #Time


  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elMain = mediator.api.elements.elMain
    this.init(options)
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get mediator() {return this.#mediator}
  get options() {return this.#options}

  init(options) {
    this.mount(this.#elMain)
    this.mountRow(this.#elRows, CLASS_CHART)

    const api = this.#mediator.api
    this.#elChart = DOM.findBySelector(`#${api.id} .${CLASS_CHART}`)
    this.#elTime = DOM.findBySelector(`#${api.id} .${CLASS_TIME}`)

    // api - functions / methods, calculated properties provided by this module
    api.elements = 
      {...api.elements, 
        ...{
          elChart: this.#elChart,
          elTime: this.#elTime
        }
      }

    this.#Time = this.#mediator.register("Timeline", Timeline, options, api)
    this.#Chart = this.#mediator.register("Chart", Chart, options, api)

    this.log(`${this.#name} instantiated`)
  }

  start() {

  }

  end() {
    
  }

  mount(el) {
    el.innerHTML = this.defaultNode()

    const api = this.#mediator.api
    this.#elWidgetsG = DOM.findBySelector(`#${api.id} .${CLASS_WIDGETSG}`)
    this.#elRows = DOM.findBySelector(`#${api.id} .${CLASS_ROWS}`)
    this.#elTime = DOM.findBySelector(`#${api.id} .${CLASS_TIME}`)
  }

  mountRow(el, type) {
    el.innerHTML = this.rowNode(type)
  }

  unmountRow() {

  }

  defaultNode() {
    const api = this.#mediator.api
    const styleRows = STYLE_ROWS + `height: calc(100% - ${api.timeH}px)`
    const styleTime = STYLE_TIME + ` height: ${api.timeH}px; border-color: ${api.chartBorderColour};`

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
    const api = this.#mediator.api
    const styleScale = STYLE_SCALE + ` border-color: ${api.chartBorderColour};`

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