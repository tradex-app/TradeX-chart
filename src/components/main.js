// main.js
// Main Pane that holds the chart and off chart indicators
// Providing: chart, off chart indicators

import DOM from "../utils/DOM"
import Timeline from './timeline'
import Chart from "./chart"
import OffChart from "./offChart"


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
  #parent
  #elMain
  #elWidgetsG
  #elRows
  #elTime
  #elChart

  #OffChart = []
  #Chart
  #Time

  #chartW
  #chartH
  #rowsW
  #rowsH
  #offChartDefaultH = 0.3
  #offChartDefaultWpx = 120
  


  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elMain = mediator.api.elements.elMain
    this.#parent = this.#mediator.api.parent
    this.init(options)
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get mediator() {return this.#mediator}
  get chart() {return this.#Chart}
  get options() {return this.#options}
  get chartW() { return this.#chartW }
  get chartH() { return this.#chartH }

  init(options) {
    this.mount(this.#elMain)
    this.mountRow(this.#elRows, CLASS_CHART)

    const api = this.#mediator.api
    this.#elChart = DOM.findBySelector(`#${api.id} .${CLASS_CHART}`)
    this.#elTime = DOM.findBySelector(`#${api.id} .${CLASS_TIME}`)

    // set the chart default dimensions
    this.#chartW = this.#elChart.width 
    this.#chartH = this.#elChart.height

    // api - functions / methods, calculated properties provided by this module
    api.elements = 
      {...api.elements, 
        ...{
          elChart: this.#elChart,
          elTime: this.#elTime
        }
      }
    api.parent = this

    this.#Time = this.#mediator.register("Timeline", Timeline, options, api)
    this.#Chart = this.#mediator.register("Chart", Chart, options, api)

    this.#parent.on("resize", (dimensions) => this.onResize(dimensions))

    this.log(`${this.#name} instantiated`)
  }

  start() {

  }

  end() {
    
  }

  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context)
  }

  off(topic, handler) {
    this.#mediator.off(topic, handler)
  }

  emit(topic, data) {
    this.#mediator.emit(topic, data)
  }

  onResize(dimensions) {
    this.setDimensions(dimensions)
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

  setWidth(w) {
    this.#rowsW = w
  }

  setHeight(h) {
    this.#rowsH = api.timeH - h
    this.#elRows.style.height = this.#rowsH
  }

  setDimensions(dimensions) {


    for (row of rows) {

    }

    this.setWidth(dimensions.mainW)
    this.setHeight(dimensions.mainH)

    dimensions.rowsW = this.#rowsW
    dimensions.rowsH = this.#rowsH

    this.emit("rowsResize", dimensions)
  }

  addOffChart(type, options, api) {

    if (this.#rowsH === this.#chartH && !this.#OffChart.length) {
      // adjust chart size for first offChart
    }
    else {
      // adjust chart size for subsequent offCharts
    }

    this.#elChart.insertAdjacentHTML(this.rowNode(type))

    let offChart = this.#mediator.register("OffChart", OffChart, options, api)
    this.#OffChart.push(offChart)
    offChart.start(this.#OffChart.length + 1)

    this.emit("addOffChart", offchart)


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