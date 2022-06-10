// offChart.js
// A base class for offChart components to extend upon

import stateMachineConfig from "../state/state-chart"

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

const STYLE_OFFCHART = "" // "position: absolute; top: 0; left: 0; border: 1px solid; border-top: none; border-bottom: none;"
const STYLE_SCALE = "position: absolute; top: 0; right: 0; border-left: 1px solid;"

export default class OffChart {

  #name = "OffChart"
  #shortName = "offChart"
  #mediator
  #options
  #parent
  #elOffChart
  #elCanvas
  #elViewport
  #elLegends
  #elScale

  #data
  #range
  #rangeLimit
  #Scale
  #Time
  #Legends
  #onChart
  #offChartID

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elOffChart = mediator.api.elements.elOffChart
    this.#parent = this.#mediator.api.parent
    this.init()
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get mediator() {return this.#mediator}
  get options() {return this.#options}

  init() {
    this.mount(this.#elOffChart)

    // api - functions / methods, calculated properties provided by this module
    const api = this.#mediator.api
    api.parent = this
    // api.elements = {}

    // listen/subscribe/watch for parent notifications
    this.#parent.on("resize", (dimensions) => this.onResize(dimensions))
  }

  start(index) {
    
    this.#offChartID = index

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    // stateMachineConfig.context.origin = this
    // this.#mediator.stateMachine = stateMachineConfig
    // this.#mediator.stateMachine.start()
  }

  end() {
    // Stop and clean up the module to prevent memory leaks.
    // It should remove: event listeners, timers, ect.
    // Put your toys away or it will end in tears.
  }


  eventsListen() {
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
  }

  setWidth(w) {
    this.#elOffChart.style.width = w
    this.#elViewport.style.width = w - this.#elScale.clientWidth
  }

  setHeight(h) {
    this.#elOffChart.style.height = h
    this.#elScale.style.height = h
    this.#Scale.setDimensions({w: null, h: h})
  }

  setDimensions(dim) {
    // this.#viewport.setSize(dim.w - this.#elScale.clientWidth, dim.h)
    this.setWidth(dim.w)
    this.setHeight(dim.h)
  }

  defaultNode() {
    const api = this.#mediator.api
    const width = api.parent.rowsW - api.scaleW
    const height = this.#options.rowH

    const styleOffChart = STYLE_OFFCHART + ` width: ${width}px; height: ${height}px`
    const styleScale = STYLE_SCALE + ` width: ${api.scaleW - 1}px; height: ${height}px; border-color: ${api.chartBorderColour};`
    const styleLegend = `position: absolute; top: 0; left: 0; z-index:100;`

    const node = `
      <div class="viewport" style="${styleOffChart}"></div>
      <div class="legends" style="${styleLegend}"></div>
      <div class="${CLASS_SCALE}" style="${styleScale}"></div>
    `
    return node
  }

}