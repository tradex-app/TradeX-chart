// main.js
// Main Pane that holds the chart and off chart indicators
// Providing: chart, off chart indicators

import DOM from "../utils/DOM"
import Timeline from './timeline'
import Chart from "./chart"
import OffChart from "./offChart"
import Overlays from "./overlays"


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
  #elRows
  #elTime
  #elChart
  #elOffCharts = []

  #OffCharts = []
  #Chart
  #Time

  #offChartDefaultH = 30 // %
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

  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get chart() { return this.#Chart }
  get time() { return this.#Time }
  get options() { return this.#options }
  get chartW() { return this.#elChart.clientWidth }
  get chartH() { return this.#elChart.clientHeight }
  get rowsW() { return this.#elRows.clientWidth }
  get rowsH() { return this.#elRows.clientHeight }

  init(options) {
    this.mount(this.#elMain)
    this.mountRow(this.#elRows, CLASS_CHART)

    const api = this.#mediator.api
    api.core = this.#mediator.api
    api.parent = this
    api.chartData = this.mediator.api.chartData
    api.onChart = this.#mediator.api.onChart
    api.offChart = this.#mediator.api.offChart
    api.rangeLimit = this.#mediator.api.rangeLimit
    api.settings = this.#mediator.api.settings

    this.#elChart = DOM.findBySelector(`#${api.id} .${CLASS_CHART}`)
    this.#elTime = DOM.findBySelector(`#${api.id} .${CLASS_TIME}`)

    // api - functions / methods, calculated properties provided by this module
    api.elements = 
      {...api.elements, 
        ...{
          elChart: this.#elChart,
          elTime: this.#elTime,
          elOffCharts: this.#elOffCharts
        }
      }

    // register child modules
    this.#Chart = this.#mediator.register("Chart", Chart, options, api)
    this.#Time = this.#mediator.register("Timeline", Timeline, options, api)

    // register offChart
    this.registerOffCharts(options, api)

    // events / messages
    this.#parent.on("resize", (dimensions) => this.onResize(dimensions))

    this.log(`${this.#name} instantiated`)
  }

  start() {
    this.#Time.start()
    this.#Chart.start()
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
    this.#elRows = DOM.findBySelector(`#${api.id} .${CLASS_ROWS}`)
    this.#elTime = DOM.findBySelector(`#${api.id} .${CLASS_TIME}`)
  }

  mountRow(el, type) {
    el.innerHTML = this.rowNode(type)
  }

  unmountRow() {

  }

  setWidth(w) {
    const resize = this.rowsW / w
    const rows = this.#elRows.children
    for (let row of rows) {
      row.style.width = row.style.width * resize
    }
    this.#elRows.style.width = w
  }

  setHeight(h) {
    const resize = this.rowsH / (h - api.timeH)
    const rows = this.#elRows.children
    for (let row of rows) {
      row.style.height = row.style.height * resize
    }
    this.#elRows.style.height = this.#elRows.style.height * resize
  }

  setDimensions(dimensions) {
    this.setWidth(dimensions.mainW)
    this.setHeight(dimensions.mainH)

    dimensions.rowsW = this.rowsW
    dimensions.rowsH = this.rowsH

    this.emit("rowsResize", dimensions)
  }

  registerOffCharts(options, api) {
    
    let a = this.#offChartDefaultH * this.#mediator.api.offChart.length,
        offChartsH = Math.round( a / Math.log10( a * 2 ) ) / 100,
        rowsH = this.rowsH * offChartsH;

    if (this.#mediator.api.offChart.length === 1) {
      // adjust chart size for first offChart
      options.rowH = this.rowsH * this.#offChartDefaultH / 100
      options.chartH = this.chartH - options.rowH

    }
    else {
      // adjust chart size for subsequent offCharts
      options.rowH = rowsH / this.#OffCharts.length
      options.chartH = this.rowsH - rowsH
    }

    for (let o of this.#mediator.api.offChart) {
      this.addOffChart(o.type, options, api)
    }
    this.emit("resizeChart", {w: this.rowsW, h: options.chartH})
  }

  addOffChart(type, options, api) {

    this.#elRows.lastElementChild.insertAdjacentHTML("afterend", this.rowNode(type))
    this.#elOffCharts.push(this.#elRows.lastElementChild)
    this.#elRows.lastElementChild.style.height = options.rowH

    api.elements.elOffChart = this.#elRows.lastElementChild

    let offChart = this.#mediator.register("OffChart", OffChart, options, api)
    
    this.#OffCharts.push(offChart)
    offChart.start(this.#OffCharts.length - 1)

    this.emit("addOffChart", offChart)
  }

  defaultNode() {
    const api = this.#mediator.api
    const styleRows = STYLE_ROWS + `height: calc(100% - ${api.timeH}px)`
    const styleTime = STYLE_TIME + ` height: ${api.timeH}px; border-color: ${api.chartBorderColour};`

    const node = `
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
        <canvas><canvas/>
        <div class="${styleScale}">
          <canvas id=""><canvas/>
        </div>
      </div>
    `
    return node
  }
}