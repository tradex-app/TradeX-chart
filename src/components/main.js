// main.js
// Main Pane that holds the chart and off chart indicators
// Providing: chart, off chart indicators

import DOM from "../utils/DOM"
import Timeline from './timeline'
import CEL from "../components/primitives/canvas"
import Chart from "./chart"
import OffChart from "./offChart"
import Overlays from "./overlays"
import chartGrid from "./overlays/chart-grid"
import stateMachineConfig from "../state/state-mainPane"
import { InputController, Keys } from "../input/controller"


import {
  CLASS_TIME,
  CLASS_ROWS,
  CLASS_ROW,
  CLASS_GRID,
  CLASS_CHART,
} from '../definitions/core'

import {
  PRICEDIGITS,
  XAXIS_ZOOM,
  BUFFERSIZE,
} from "../definitions/chart"

const STYLE_ROWS = "width:100%; min-width:100%;"
const STYLE_ROW = "position: relative; overflow: hidden;"
const STYLE_TIME = "border-top: 1px solid; width:100%; min-width:100%;"
const STYLE_SCALE = "border-left: 1px solid;"


export default class MainPane {

  #name = "Utilities"
  #shortName = "Main"
  #mediator
  #options
  #parent
  #core
  #elMain
  #elRows
  #elTime
  #elChart
  #elOffCharts = []
  #elCanvas
  #elViewport

  #viewport
  #layerGrid
  #layerLabels
  #OffCharts = []
  #Chart
  #Time
  #chartGrid

  #offChartDefaultH = 30 // %
  #offChartDefaultWpx = 120

  #cursorPos = [0, 0]
  #buffer
  
  #indicators
  #controller

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elMain = mediator.api.elements.elMain
    this.#parent = {...this.#mediator.api.parent}
    this.#core = this.#mediator.api.core
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
  get width() { return this.#elMain.clientWidth }
  get height() { return this.#elMain.clientHeight }
  get chartW() { return this.#elChart.clientWidth }
  get chartH() { return this.#elChart.clientHeight }
  get rowsW() { return this.#elRows.clientWidth }
  get rowsH() { return this.#elRows.clientHeight }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elMain) }
  get range() { return this.#core.range }
  get cursorPos() { return this.#cursorPos }
  get candleW() { return this.#Time.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get buffer() { return this.#buffer }
  get bufferPx() { return this.getBufferPx() }


  init(options) {
    this.mount(this.#elMain)

    this.#indicators = this.#core.indicators

    const api = this.#mediator.api

    this.#elRows = DOM.findBySelector(`#${api.id} .${CLASS_ROWS}`)
    this.#elTime = DOM.findBySelector(`#${api.id} .${CLASS_TIME}`)
    this.#elChart = DOM.findBySelector(`#${api.id} .${CLASS_CHART}`)
    this.#elViewport = DOM.findBySelector(`#${api.id} .${CLASS_GRID} .viewport`)

    api.parent = this
    api.chartData = this.mediator.api.chartData
    api.onChart = this.#mediator.api.onChart
    api.offChart = this.#mediator.api.offChart
    api.rangeLimit = this.#mediator.api.rangeLimit
    api.settings = this.#mediator.api.settings

    // api - functions / methods, calculated properties provided by this module
    api.elements = 
      {...api.elements, 
        ...{
          elChart: this.#elChart,
          elTime: this.#elTime,
          elRows: this.#elRows,
          elOffCharts: this.#elOffCharts
        }
      }

    // register timeline - xAxis
    this.#Time = this.#mediator.register("Timeline", Timeline, options, api)
    // register offChart
    this.registerOffCharts(options, api)
    // register chart
    this.#Chart = this.#mediator.register("Chart", Chart, options, api)

    this.#buffer = this.config.buffer || BUFFERSIZE

    this.log(`${this.#name} instantiated`)
  }

  start() {
    this.#Time.start()
    this.#Chart.start()

    for (let i = 0; i < this.#OffCharts.length; i++) {
      this.#OffCharts[i].start(i)
    }

    // prepare layered canvas
    this.createViewport()
    // draw the chart - grid, candles, volume
    this.draw(this.range)

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.context.origin = this
    this.#mediator.stateMachine = stateMachineConfig
    this.#mediator.stateMachine.start()
  }

  end() {
    this.#controller.removeEventListener("mousewheel", this.onMouseWheel);
    this.#controller.removeEventListener("mousemove", this.onMouseMove);
    this.#controller.removeEventListener("drag", this.onChartDrag);
    this.#controller.removeEventListener("enddrag", this.onChartDragDone);
    this.#controller.removeEventListener("keydown", this.onChartKeyDown)
    this.#controller.removeEventListener("keyup", this.onChartKeyDown)

    this.off("resizeChart", this.onResize)
  }


  eventsListen() {
    // // Give Main focus so it can receive keyboard input
    this.#elMain.tabIndex = 0
    this.#elMain.focus()

    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(this.#elMain);
    // mouse wheel event
    this.#controller.on("mousewheel", this.onMouseWheel.bind(this))
    // move event
    this.#controller.on("mousemove", this.onMouseMove.bind(this));
    // drag event
    this.#controller.on("drag", this.onChartDrag.bind(this));
    // drag event complete
    this.#controller.on("enddrag", this.onChartDragDone.bind(this));
    // keyboard events
    this.#controller.on("keydown", this.onChartKeyDown.bind(this))
    this.#controller.on("keyup", this.onChartKeyUp.bind(this))

    // listen/subscribe/watch for parent notifications
    this.on("resize", (dimensions) => this.onResize.bind(this))
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

  onMouseWheel(e) {
    const direction = Math.sign(e.wheeldelta)
    const range = this.range
    const newStart = range.indexStart - Math.floor(direction * XAXIS_ZOOM * range.Length)
    const newEnd = range.indexEnd + Math.floor(direction * XAXIS_ZOOM * range.Length)
    const oldStart = range.indexStart
    const oldEnd = range.indexEnd
    const inOut = (range)? "out" : "in"

    this.emit("setRange", [newStart, newEnd, oldStart, oldEnd])
    this.emit("chart_zoom", [newStart, newEnd, oldStart, oldEnd, inOut])
    this.emit(`chart_zoom_${inOut}`, [newStart, newEnd, oldStart, oldEnd])

    this.draw()
  }
  
  onMouseMove(e) {
    // this.#cursorPos = [e.layerX, e.layerY]
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)]

    this.emit("main_mousemove", this.#cursorPos)
  }

  onChartDrag(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y), 
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ]
    this.emit("chart_pan", this.#cursorPos)
    this.draw()
  }

  onChartDragDone(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y), 
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ]
    this.emit("chart_panDone", this.#cursorPos)
    this.draw()
  }

  onChartKeyDown(e) {
    let step = this.candleW || 1

    switch (e.keyCode) {
      case Keys.Left:
        console.log("keydown: cursor Left")

        this.emit("chart_pan", [0,null,step,null,step * -1])
        break;
      case Keys.Right:
        console.log("keydown: cursor Right")

        this.emit("chart_pan", [step,null,0,null,step])
        break;
    }
    this.draw()
  }

  onChartKeyUp(e) {
    let step = this.candleW || 1

    switch (e.keyCode) {
      case Keys.Left:
        console.log("keyup: cursor Left")
        
        this.emit("chart_panDone", [0,null,step,null,step * -1])
        break;
      case Keys.Right:
        console.log("keyup: cursor Right")

        this.emit("chart_panDone", [step,null,0,null,step])
        break;
    }
    this.draw()
  }



  mount(el) {
    el.innerHTML = this.defaultNode()
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

  getBufferPx() { 
    let w = Math.round(this.width * this.buffer / 100) 
    let r = w % this.candleW
    return w - Math.round(r)
  }

  registerOffCharts(options, api) {
    
    let a = this.#offChartDefaultH * this.#mediator.api.offChart.length,
        offChartsH = Math.round( a / Math.log10( a * 2 ) ) / 100,
        rowsH = this.rowsH * offChartsH;

    if (this.#mediator.api.offChart.length === 1) {
      // adjust chart size for first offChart
      options.rowH = this.rowsH * this.#offChartDefaultH / 100
      options.chartH = this.rowsH - options.rowH

    }
    else {
      // adjust chart size for subsequent offCharts
      options.rowH = rowsH / this.#OffCharts.length
      options.chartH = this.rowsH - rowsH
    }

    for (let o of this.#mediator.api.offChart) {
      this.addOffChart(o, options, api)
    }
    // this.emit("resizeChart", {w: this.rowsW, h: options.chartH})
    // this.#Chart.setDimensions({w: this.rowsW, h: options.chartH})
  }

  /**
   * add off chart indicator below chart and any other off charts
   * @param {object} offChart - data for the indicator
   * @param {object} options 
   * @param {object} api 
   */
  addOffChart(offChart, options, api) {

    this.#elRows.lastElementChild.insertAdjacentHTML("afterend", this.rowNode(offChart.type))
    this.#elOffCharts.push(this.#elRows.lastElementChild)

    api.elements.elOffChart = this.#elRows.lastElementChild
    options.offChart = offChart

    let o = this.#mediator.register("OffChart", OffChart, options, api)
    
    this.#OffCharts.push(o)

    this.emit("addOffChart", o)
  }

  addIndicator(ind) {
    console.log(`Add the ${ind.target} indicator`)

    // final indicator object
    const indicator = this.#indicators[ind.target].ind
    console.log("indicator:",indicator)
    // check if we already have indicator data in the chart state
    // generate indicator data
    // let instance = new indicator(target, overlay, xAxis, yAxis, config)
    // instance.calcIndicator(...)
    // this.addOffChart(instance.overlay.data, options, api)
    // 

    this.emit("addIndicatorDone", indicator)
  }

  defaultNode() {
    const api = this.#mediator.api
    const styleRows = STYLE_ROWS + `height: calc(100% - ${api.timeH}px)`
    const styleTime = STYLE_TIME + ` height: ${api.timeH}px; border-color: ${api.chartBorderColour};`
    const defaultRow = this.defaultRowNode()

    const node = `
    <div class="${CLASS_ROWS}" style="${styleRows}">
      ${defaultRow}
    </div>
    <div class="${CLASS_TIME}" style="${styleTime}">
      <canvas id=""><canvas/>
    </div>
    `
    return node
  }

  defaultRowNode() {
    const api = this.#mediator.api
    const width = api.width - api.toolsW - api.scaleW
    const height = api.height - api.utilsH - api.timeH
    const styleGrid = ` width: ${width}px; height: ${height}px; overflow: hidden`
      let node = `<div class="${CLASS_GRID}" style="position: absolute;">
                      <div class="viewport" style="${styleGrid}"></div>
                  </div>`
          node += this.rowNode(CLASS_CHART)
    return node
  }

  rowNode(type) {
    const api = this.#mediator.api
    const styleRow = STYLE_ROW + ` border-top: 1px solid ${api.chartBorderColour};`
    const styleScale = STYLE_SCALE + ` border-color: ${api.chartBorderColour};`

    const node = `
      <div class="${CLASS_ROW} ${type}" style="${styleRow}">
        <canvas><canvas/>
        <div class="${styleScale}">
          <canvas id=""><canvas/>
        </div>
      </div>
    `
    return node
  }

  createViewport() {
    const buffer = this.buffer
    const width = this.width
    const height = this.rowsH
    const layerConfig = { 
      width: Math.round(width * ((100 + buffer) * 0.01)), 
      height: height
    }

    // create viewport
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });
    this.#elCanvas = this.#viewport.scene.canvas

    this.#layerLabels = new CEL.Layer(layerConfig);
    this.#layerGrid = new CEL.Layer(layerConfig);
    // add layers
    this.#viewport
          .addLayer(this.#layerLabels)
          .addLayer(this.#layerGrid)

    const config = {...this.theme, ...{ axes: "x" }}
    this.#chartGrid =
      new chartGrid(
        this.#layerGrid, 
        this.#Time, 
        null, 
        config)
  }

  draw(range) {
    this.#layerGrid.setPosition(this.#core.scrollPos, 0)
    this.#chartGrid.draw("x")
    this.#viewport.render();
  }

  updateRange() {
    // draw the grid
    this.draw(this.range)
  }

  zoomRange() {
    // draw the gird
    this.draw(this.range)
  }
}