// main.js
// Main Pane that holds the chart and off chart indicators
// Providing: chart, off chart indicators

import DOM from "../utils/DOM"
import Timeline from './timeline'
import Graph from "./views/classes/graph"
import renderLoop from "./views/classes/renderLoop"
import Chart from "./onChart"
import OffChart from "./offChart"
import chartGrid from "./overlays/chart-grid"
// import chartCompositor from "./overlays/chart-compositor"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-mainPane"
import Input from "../input"
import { isBoolean, isNumber } from "../utils/typeChecks"
import { copyDeep } from "../utils/utilities"

import {
  STREAM_FIRSTVALUE,
  STREAM_NEWVALUE,
} from '../definitions/core'

import {
  PRICEDIGITS,
  XAXIS_ZOOM,
  BUFFERSIZE,
  ROWMINHEIGHT,
  OFFCHARTDEFAULTHEIGHT,
} from "../definitions/chart"

import {
  STYLE_ROW,
  TIMESCALEH
} from "../definitions/style"

const defaultOverlays = [
  ["grid", {class: chartGrid, fixed: false, required: true, params: {axes: "x"}}],
  // ["chartCompositor", {class: chartCompositor, fixed: true, required: true}]
]

/**
 * Provides chart main pane that hosts, chart, off charts (indicators), timeline, widgets
 * @export
 * @class MainPane
 */
export default class MainPane {

  #name = "MainPane"
  #shortName = "Main"
  #options
  #parent
  #core
  #stateMachine

  #elYAxis
  #elMain
  #elRows
  #elTime
  #elChart
  #elScale
  #elOffCharts = []
  #elYAxisScales = []
  #elGrid
  #elCanvas
  #elViewport
  #elements

  #Graph
  #viewport
  #layerGrid
  #layerWatermark
  #ChartPanes = new Map()
  #Chart
  #Time
  #chartGrid

  #offChartDefaultH = OFFCHARTDEFAULTHEIGHT // %
  #rowMinH = ROWMINHEIGHT // px

  #cursorPos = [0, 0]
  #drag = {
    active: false,
    start: [0,0],
    prev: [0,0],
    delta: [0,0]
  }
  #buffer
  
  #indicators
  #controller
  #input

  constructor (core, options) {

    this.#core = core
    this.#options = options
    this.#parent = core
    this.#elMain = this.#core.elMain
    this.#elYAxis = this.#core.elYAxis
    this.init(options)
  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warn(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  get id() { return `${this.#core.id}.${this.#name}` }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get core() { return this.#core }
  get chart() { return this.#Chart }
  get time() { return this.#Time }
  get offCharts() { return this.#ChartPanes }
  get options() { return this.#options }
  get element() { return this.#elMain }
  get width() { return this.#elMain.getBoundingClientRect().width }
  get height() { return this.#elMain.getBoundingClientRect().height }
  get chartW() { return this.#elChart.getBoundingClientRect().width }
  get chartH() { return this.#elChart.getBoundingClientRect().height }
  get rowsW() { return this.#elRows.getBoundingClientRect().width }
  get rowsH() { return this.#elRows.getBoundingClientRect().height }
  get rowMinH() { return this.#rowMinH }
  set rowMinH(h) { if (isNumber(h)) this.#rowMinH = Math.abs(h) }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elMain) }
  get range() { return this.#core.range }
  get cursorPos() { return this.#cursorPos }
  get candleW() { return this.#Time.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get buffer() { return this.#buffer }
  get bufferPx() { return this.getBufferPx() }
  get scrollPos() { return this.#core.scrollPos }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }
  get graph() { return this.#Graph }
  get indicators() { return {
    onchart: this.#Chart.indicators,
    offchart: this.#ChartPanes
  } }
  get elements() {
    return {
      elTarget: this.#elChart,
      elTime: this.#elTime,
      elRows: this.#elRows,
      elChart: this.#elChart,
      elOffCharts: this.#elOffCharts,
      elScale: this.#elScale
    }
  }


  init(options) {
    const core = this.#core

    this.#indicators = this.#core.indicators
    this.#elRows = this.#elMain.rows
    this.#elTime = this.#elMain.time
    this.#elChart = this.#elMain.rows.primary
    this.#elGrid = this.#elMain.rows.grid
    this.#elViewport = this.#elMain.viewport  // this.#elMain.rows.grid.viewport
    this.#elScale = this.#core.elBody.scale

    options.name = "Chart"
    options.shortName = "Chart"
    options.parent = this
    options.chartData = this.#core.chartData
    options.onChart = this.#core.onChart
    options.offChart = this.#core.offChart
    options.rangeLimit = this.#core.rangeLimit
    options.settings = this.#core.settings

    // api - functions / methods, calculated properties provided by this module
    options.elements = 
      {...options.elements, 
        ...this.elements
      }

    if ( this.#core.theme?.time?.navigation === false ) {
      const timeHeight = { height: TIMESCALEH }
      this.#core.theme.time = {...this.#core.theme?.time, ...timeHeight}
      this.#elRows.style.height = `calc(100% - ${TIMESCALEH}px)`
    }

    // register timeline - xAxis
    this.#Time = new Timeline(this.#core, options)
    // register chart
    this.#Chart = new Chart(this.#core, options)
    // register offChart
    this.registerChartPanes(options)

    this.#buffer = isNumber(this.config.buffer)? this.config.buffer : BUFFERSIZE
    this.#rowMinH = isNumber(this.config.rowMinH)? this.config.rowMinH : ROWMINHEIGHT
    this.#offChartDefaultH = isNumber(this.config.offChartDefaultH)? this.config.offChartDefaultH : OFFCHARTDEFAULTHEIGHT

    this.rowsOldH = this.rowsH

    this.log(`${this.#name} instantiated`)
  }

  start() {
    let i = 0

    // start  timeline, chart, offChart
    this.#elMain.start(this.theme)
    this.#Time.start()
    this.#Chart.start()
    this.#ChartPanes.forEach((offChart, key) => {
      offChart.start(i++)
    })
    this.rowsOldH = this.rowsH

    // create and start overlays
    this.createGraph()
    this.draw(this.range, true)

    renderLoop.init({
      graphs: [this.#Graph],
      range: this.range
    })
    renderLoop.start()
    renderLoop.queueFrame(this.range, [this.#Graph], false)

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.id = this.id
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()
  }

  end() {
    this.stateMachine.destroy()
    this.#Time.end()
    this.#Chart.end()
    this.#ChartPanes.forEach((offChart, key) => {
      offChart.end()
    })
    this.#viewport.destroy()

    this.#input.off("wheel", this.onMouseWheel)
    this.#input.off("pointerdrag", this.onChartDrag)
    this.#input.off("pointerdragend", this.onChartDragDone)
    this.#input.off("pointermove", this.onMouseMove)
    this.#input.off("pointerenter", this.onMouseEnter);
    this.#input.off("pointerout", this.onMouseOut);

    this.#input.off("keydown", this.onChartKeyDown)
    this.#input.off("keyup", this.onChartKeyDown)
    this.#input = null

    this.off(STREAM_NEWVALUE, this.onNewStreamValue)
    this.off("setRange", this.draw)
  }


  eventsListen() {
    // Give Main focus so it can receive keyboard input
    this.#elRows.tabIndex = 0
    this.#elRows.focus()

    this.#input = new Input(this.#elRows, {disableContextMenu: false});

    this.#input.on("keydown", this.onChartKeyDown.bind(this))
    this.#input.on("keyup", this.onChartKeyUp.bind(this))

    this.#input.on("wheel", this.onMouseWheel.bind(this))
    this.#input.on("pointermove", this.onMouseMove.bind(this))
    this.#input.on("pointerenter", this.onMouseEnter.bind(this));
    this.#input.on("pointerout", this.onMouseOut.bind(this));
    this.#input.on("pointerup", this.onChartDragDone.bind(this))

    // listen/subscribe/watch for notifications
    this.on(STREAM_FIRSTVALUE, this.onFirstStreamValue.bind(this))
    this.on(STREAM_NEWVALUE, this.onNewStreamValue.bind(this))
    this.on("setRange", this.draw.bind(this))
    this.on("scrollUpdate", this.draw.bind(this))
    this.on("chart_render", this.draw.bind(this))
  }

  on(topic, handler, context) {
    this.#core.on(topic, handler, context)
  }

  off(topic, handler) {
    this.#core.off(topic, handler)
  }

  emit(topic, data) {
    this.#core.emit(topic, data)
  }

  onMouseWheel(e) {
    const direction = Math.sign(e.wheeldelta) * -1
    e.domEvent.preventDefault()

    // a dirty hack to handle touch pad 
    // confusion over pan and zoom events
    if (this.#core.pointerButtons[0]) {
      e.dragstart.x = this.#cursorPos[0]
      e.dragstart.y = this.#cursorPos[1]
      e.position.x = this.#cursorPos[0] + direction
      e.position.y = this.#cursorPos[1]
      this.onChartDrag(e)
      return
    }
    const range = this.range
    const newStart = range.indexStart - Math.floor(direction * XAXIS_ZOOM * range.Length)
    const newEnd = range.indexEnd + Math.ceil(direction * XAXIS_ZOOM * range.Length)

    this.#core.setRange(newStart, newEnd)
    this.draw(this.range, true)
  }
  
  onMouseMove(e) {
    this.#cursorPos = [
      e.position.x, e.position.y, 
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ]
    this.core.Chart.graph.overlays.list.get("cursor").layer.visible = true

    for (let [key, offChart] of this.offCharts) {
      offChart.graph.overlays.list.get("cursor").layer.visible = true
    }

    this.emit("main_mousemove", this.#cursorPos)
  }

  onMouseEnter(e) {
    this.core.Timeline.showCursorTime()
    this.core.Chart.graph.overlays.list.get("cursor").layer.visible = true
    this.core.Chart.graph.render()

    for (let [key, offChart] of this.offCharts) {
      offChart.graph.overlays.list.get("cursor").layer.visible = true
      offChart.graph.render()
    }
  }

  onMouseOut(e) {
    this.core.Timeline.hideCursorTime()
    this.onPointerActive(false)

    this.core.Chart.graph.overlays.list.get("cursor").layer.visible = false
    this.core.Chart.graph.render()

    for (let [key, offChart] of this.offCharts) {
      offChart.graph.overlays.list.get("cursor").layer.visible = false
      offChart.graph.render()
    }
    this.draw()
  }

  onChartDrag(e) {
    const d = this.#drag
    if (!d.active) {
      d.active = true
      d.start = [e.dragstart.x, e.dragstart.y]
      d.prev = d.start
      d.delta = [0, 0] //[e.movement.x, e.movement.y]
    }
    else {
    // d.delta = [e.movement.x, e.movement.y]
      d.delta = [
        e.position.x - d.prev[0], 
        e.position.y - d.prev[1]
      ]
      d.prev = [
        e.position.x, 
        e.position.y
      ]
    }
    this.#cursorPos = ("n",[
      e.position.x, e.position.y, 
      ...d.start,
      ...d.delta
    ])

    this.emit("chart_pan", this.#cursorPos)
  }

  onChartDragDone(e) {
    const d = this.#drag
    d.active = false
    d.delta = [ 0, 0 ]
    this.#cursorPos = [
      ...d.prev,
      ...d.start,
      ...d.delta
    ]

    this.emit("chart_panDone", this.#cursorPos)
  }

  onChartKeyDown(e) {
    let step = (this.candleW > 1) ? this.candleW : 1

    // [x2, y2, x1, y1, xdelta, ydelta]
    switch (e.key) {
      case "ArrowLeft":
        this.emit("chart_pan", [0,null,step,null,step * -1,null])
        break;
      case "ArrowRight":
        this.emit("chart_pan", [step,null,0,null,step,null])
        break;
      case "ArrowUp":
        e.wheeldelta = -1
        e.domEvent = e.srcEvent
        this.onMouseWheel(e)
        break;
      case "ArrowDown":
        e.wheeldelta = 1
        e.domEvent = e.srcEvent
        this.onMouseWheel(e)
        break;
    }
  }

  onChartKeyUp(e) {
    let step = (this.candleW > 1) ? this.candleW : 1

    switch (e.key) {
      case "ArrowLeft":
        this.emit("chart_panDone", [0,null,step,null,step * -1,null])
        break;
      case "ArrowRight":
        this.emit("chart_panDone", [step,null,0,null,step,null])
        break;
    }
    // this.draw()
  }

  onFirstStreamValue(value) {
    this.chart.scale.xAxis.calcXAxisGrads(this.range,)
    this.draw(this.range, true)
  }

  onNewStreamValue(value) {
  }

  onPointerActive(chart) {
    if (chart) {
      chart.cursorActive = true
      chart.scale.layerCursor.visible = true
    }

    if (chart !== this.chart) {
      this.chart.cursorActive = false
      this.chart.scale.layerCursor.visible = false
      this.chart.scale.layerCursor.erase()
    }

    this.#ChartPanes.forEach((offChart, key) => {
      if (chart !== offChart) {
        offChart.cursorActive = false
        offChart.scale.layerCursor.visible = false
        offChart.scale.layerCursor.erase()
      }
    }) 
  }

  mount(el) {
    // set up chart scale (yAxis)
    this.#elYAxis.innerHTML = this.scaleNode(CLASS_CHART)
    this.#elYAxis.querySelector(`.${CLASS_CHART}`).style.height = "100%"
    this.#elYAxis.querySelector(`.${CLASS_CHART} tradex-scale`).style.height = "100%"
  }

  setWidth(w) {
    // width handled automatically by CSS
  }

  setHeight(h) {
    // height handled automatically by CSS
  }

  setDimensions() {
    this.#elRows.previousDimensions()

    let resizeH = this.#elRows.heightDeltaR
    let chartH = Math.round(this.chartH * resizeH)
    let width = this.rowsW
    let height = this.rowsH
    let layerWidth = Math.round(width * ((100 + this.#buffer) * 0.01))
    let dimensions = {
      resizeH: resizeH,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW,
    }

    // set on Chart dimensions
    if (this.#ChartPanes.size == 0 &&
      chartH != this.#elRows.height) chartH = this.#elRows.height

    this.#core.scrollPos = -1

    this.#Time.setDimensions({w: width})
    this.#Graph.setSize(width, height, layerWidth)
    this.#Chart.setDimensions({w: width, h: chartH})
    this.#ChartPanes.forEach((offChart, key) => {
      chartH = Math.round(offChart.viewport.height * resizeH)
      offChart.setDimensions({w: width, h: chartH})
      offChart.Divider.setDividerPos()
    })

    this.rowsOldH = this.rowsH
    this.draw(this.range, true)

    this.emit("rowsResize", dimensions)
  }

  getBufferPx() { 
    let w = Math.round(this.width * this.buffer / 100) 
    let r = w % this.candleW
    return w - r
  }

  setCursor(cursor) {
    this.element.style.cursor = cursor
  }

  registerChartPanes(options) {
    this.#elRows.previousDimensions()

    // are there any OffCharts to add?
    if (this.#core.offChart.length === 0) return
    // remove any offChart indicators that are not supported
    for (const [i, o] of this.#core.offChart.entries()) {
      if (o.type in this.core.indicators) continue
      
      this.#core.log(`offChart indicator ${this.#core.offChart.type} not added: not supported.`)
      this.#core.offChart.splice(i, 1)
    }

    // let a = this.#offChartDefaultH * this.#core.offChart.length,
    // offChartsH = ( a / Math.log10( a * 2 ) ) / 100,
    // rowsH = Math.round(this.rowsH * offChartsH);

    // options.offChartsH = offChartsH

    // if (this.#core.offChart.length === 1) {
    //   // adjust chart size for first offChart
    //   options.rowH = Math.round(this.rowsH * this.#offChartDefaultH / 100)
    //   options.chartH = this.rowsH - options.rowH
    // }
    // else {
    //   // adjust chart size for subsequent offCharts
    //   options.rowH = Math.round(rowsH / this.#ChartPanes.size)
    //   options.chartH = this.rowsH - rowsH
    //   options.height = options.rowH
    // }

    let heights = this.calcChartPaneHeights(this.#core.offChart.length)

    options = {...options, ...heights}

    let p100 = options.chartH / this.rowsH * 100
    this.#elChart.style.height = `${options.chartH}px`
    this.#Chart.scale.element.style.height = `${options.chartH}px`

    for (let o of this.#core.offChart) {
      options.rowY = options.chartH
      this.addChartPane(o, options)
      options.rowY = options.chartH + options.rowH
    }
  }

  /**
   * add off chart indicator below chart and any other off charts
   * @param {object} offChart - data for the indicator
   * @param {object} options 
   */
  addChartPane(offChart, options) {
    // insert a row to mount the indicator on
    let rowEl, row
    this.#elRows.insertAdjacentHTML("beforeend", this.#elMain.rowNode(offChart.type, this.#core))
    rowEl = this.#elRows.lastElementChild
    this.#elOffCharts.push(rowEl)
    row = this.#elRows.chartPaneSlot.assignedElements().slice(-1)[0]
    row.style.height = `${options.rowH}px`
    row.style.width = `100%`

    // insert a YAxis for the new indicator
    let axisEl, axis
    this.#elYAxis.insertAdjacentHTML("beforeend", this.scaleNode(offChart.type))
    axisEl = this.#elYAxis.lastElementChild
    this.#elYAxisScales.push(axisEl)
    axis = this.#elYAxis.chartPaneSlot.assignedElements().slice(-1)[0]
    axis.style.height = `${options.rowH}px`
    axis.style.width = `100%`

    options.elements.elTarget = row
    options.elements.elScale = axis
    options.offChart = offChart
    options.name = "OffChart"
    options.shortName = "offChart"

    let o = new OffChart(this.#core, options)
    
    this.#ChartPanes.set(o.id, o)

    this.emit("addChartPane", o)
  }

  addIndicator(i) {
    const indicator = this.core.indicators[i.type].ind
    const indType = (
      indicator.onChart === "both" && 
      isBoolean(i.onChart)) ? 
      i.onChart : false;
    if (
      i?.type in this.core.indicators &&
      indType === false
    ) {
      const cnt = this.#ChartPanes.size + 1
      const heights = this.calcChartPaneHeights(cnt)
      const options = {...heights}
            options.parent = this
            options.title = i.name
            options.elements = {}

      this.addChartPane(i, options)
    }
    else return false
  }

  calcChartPaneHeights(cnt) {
    let a = this.#offChartDefaultH * this.#core.offChart.length,
        offChartsH = ( a / Math.log10( a * 2 ) ) / 100,
        rowsH = Math.round(this.rowsH * offChartsH),
        options = {};

    options.offChartsH = offChartsH

    if (cnt === 1) {
      // adjust chart size for first offChart
      options.rowH = Math.round(this.rowsH * this.#offChartDefaultH / 100)
      options.chartH = this.rowsH - options.rowH
    }
    else {
      // adjust chart size for subsequent offCharts
      options.rowH = Math.round(rowsH / this.#ChartPanes.size)
      options.chartH = this.rowsH - rowsH
      options.height = options.rowH
    }
    return options
  }

  scaleNode(type) {
    const styleRow = STYLE_ROW + ` width: 100%; border-top: 1px solid ${this.theme.offChart.separator};`
    const node = `
    <div slot="chartpane" class="viewport scale ${type}" style="$${styleRow}"></div>
  `
    return node
  }

  createGraph() {
    let overlays = copyDeep(defaultOverlays)

    this.#Graph = new Graph(this, this.#elViewport, overlays)
  }

  draw(range=this.range, update=false) {
    const graphs = [
      this.#Graph,
      this.#Time,
      this.#Chart
    ]
    this.time.xAxis.doCalcXAxisGrads(range)
    this.#ChartPanes.forEach((offChart, key) => {
      graphs.push(offChart)
    })

    renderLoop.queueFrame(
      this.range, 
      graphs, 
      update)
  }

  updateRange(pos) {
    this.#core.updateRange(pos)
    // this.draw()
  }

  zoomRange() {
    this.draw(this.range, true)
  }

  resizeRowPair(divider, pos) {
    let active = divider.chartPane
    let ID = active.id
    let chartPanes = [...this.#ChartPanes.keys()]
    let i = chartPanes.indexOf(ID)
    let prev = (i == 0) ? 
      this.#Chart :
      this.#ChartPanes.get(chartPanes[i]);
    if (i == -1) return {active, prev}

    // why does activeH need - 1 to calc correct sizing?
    let activeH = active.height - pos[5] - 1
    let prevH  = prev.height + pos[5]

    if ( activeH >= this.#rowMinH
        && prevH >= this.#rowMinH) {
          divider.chartPane.Divider.updateDividerPos(pos)
          active.setDimensions({w:undefined, h:activeH})
          prev.setDimensions({w:undefined, h:prevH})
    }
    active.element.style.userSelect = 'none';
    // active.element.style.pointerEvents = 'none';
    prev.element.style.userSelect = 'none';
    // prev.element.style.pointerEvents = 'none';

    return {active, prev}
  }

}
