// main.js
// Main Pane that holds the chart and off chart indicators
// Providing: chart, off chart indicators

import DOM from "../utils/DOM"
import Timeline from './timeline'
import Graph from "./views/classes/graph"
import renderLoop from "./views/classes/renderLoop"
import Chart from "./chart"
import chartGrid from "./overlays/chart-grid"
import Indicator from "./overlays/indicator"
// import chartCompositor from "./overlays/chart-compositor"
import Divider from "./widgets/divider"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-main"
import Input from "../input"
import { isArray, isBoolean, isNumber, isObject, isString } from "../utils/typeChecks"
import { copyDeep, valuesInArray, xMap } from "../utils/utilities"

import {
  STREAM_FIRSTVALUE,
  STREAM_NEWVALUE,
} from '../definitions/core'

import {
  PRICEDIGITS,
  XAXIS_ZOOM,
  BUFFERSIZE,
  ROWMINHEIGHT,
  SECONDARYDEFAULTHEIGHT,
  COLLAPSEDHEIGHT,
} from "../definitions/chart"

import {
  STYLE_ROW,
  TIMESCALEH
} from "../definitions/style"

const defaultOverlays = [
  ["grid", {class: chartGrid, fixed: false, required: true, params: {axes: "x"}}],
  // ["chartCompositor", {class: chartCompositor, fixed: true, required: true}]
]
const nonIndicators = ["candles", "trades", "events"]


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
  #destruction = false

  #elYAxis
  #elMain
  #elRows
  #elTime
  #elPrimary
  #elScale
  #elSecondarys = {}
  #elGrid
  #elCanvas
  #elViewport
  #elements

  #Graph
  #layerGrid
  #layerWatermark
  #ChartPanes = new xMap()
  #Chart
  #Time
  #chartGrid
  #chartDeleteList = []
  #ChartPaneMaximized = {
    instance: null, 
    rowsH: 0,
    panes: {}
  }

  #viewDefaultH = SECONDARYDEFAULTHEIGHT // %
  #rowMinH = ROWMINHEIGHT // px

  #position = {}
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

  get id() { return `${this.#core.id}-${this.#name}` }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get core() { return this.#core }
  get chart() { return this.#Chart }
  get chartPanes() { return this.#ChartPanes }
  get chartPaneMaximized() { return this.#ChartPaneMaximized }
  get chartDeleteList() { return this.#chartDeleteList }
  get time() { return this.#Time }
  get options() { return this.#options }
  get element() { return this.#elMain }
  get elRows() { return this.#elMain.rows }
  get elPrimary() { return this.#elMain.rows.primary }
  get elSecondary() { return this.#elMain.rows.secondary }
  get elPanes() { return this.#elMain.rows.chartPanes }
  get elPaneSlot() { return this.#elMain.rows.chartPaneSlot }
  get width() { return this.#elMain.getBoundingClientRect().width }
  get height() { return this.#elMain.getBoundingClientRect().height }
  get chartW() { return this.elPrimary.getBoundingClientRect().width }
  get chartH() { return this.elPrimary.getBoundingClientRect().height }
  get rowsW() { return this.#elRows.getBoundingClientRect().width }
  get rowsH() { return this.#elRows.getBoundingClientRect().height }
  get rowMinH() { return this.#rowMinH }
  set rowMinH(h) { if (isNumber(h)) this.#rowMinH = Math.abs(h) }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elMain) }
  get range() { return this.#core.range }
  set cursor(c) { this.element.style.cursor = c }
  get cursor() { return this.element.style.cursor }
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
  get views() { return this.#core.state.data.views }
  get indicators() { return this.getIndicators() }
  get elements() {
    return {
      elRows: this.elRows,
      elPrimary: this.elPrimary,
      elSecondarys: this.elSecondarys,
      elTime: this.#elTime,
      elScale: this.#elScale
    }
  }


  init(options) {
    const core = this.#core

    this.#indicators = this.#core.indicatorClasses
    this.#elRows = this.#elMain.rows
    this.#elTime = this.#elMain.time
    this.#elGrid = this.#elMain.rows.grid
    this.#elViewport = this.#elMain.viewport  // this.#elMain.rows.grid.viewport
    this.#elScale = this.#core.elBody.scale

    options.name = "Chart"
    options.shortName = "Chart"
    options.parent = this
    options.chartData = this.#core.chartData
    options.primaryPane = this.#core.primaryPane
    options.secondaryPane = this.#core.secondaryPane

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

    // register chart views
    this.registerChartViews(options)

    this.#buffer = isNumber(this.config.buffer)? this.config.buffer : BUFFERSIZE
    this.#rowMinH = isNumber(this.config.rowMinH)? this.config.rowMinH : ROWMINHEIGHT
    this.#viewDefaultH = isNumber(this.config.secondaryPaneDefaultH)? this.config.secondaryPaneDefaultH : SECONDARYDEFAULTHEIGHT

    this.rowsOldH = this.rowsH

    this.log(`${this.#name} instantiated`)
  }

  start() {
    let i = 0

    // start timeline, chart, secondaryPane
    this.#elMain.start(this.theme)
    this.#Time.start()
    
    // start each view / chart pane 
    this.#ChartPanes.forEach((view, key) => {
      view.start(i++)
      // suppress divider of first chart pane as no preceding pane
      if (i === 1) view.Divider.hide()
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
    stateMachineConfig.context = this;
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()
  }

  destroy() {
    this.#destruction = true
    this.stateMachine.destroy()
    this.#Time.destroy()
    this.#ChartPanes.forEach((chartPane, key) => {
      this.#chartDeleteList[key] = true
      chartPane.destroy()
      delete this.#chartDeleteList[key]
    })
    this.#Graph.destroy();
    this.#input.destroy()

    this.off(STREAM_FIRSTVALUE, this.onFirstStreamValue)
    this.off(STREAM_NEWVALUE, this.onNewStreamValue)
    this.off("setRange", this.draw)
    this.off("scrollUpdate", this.draw)
    this.off("chart_render", this.draw)
    this.off("destroyChartView", this.removeChartPane)

    // this.element.remove
  }

  reset() {
    for (let p in this.#core.Indicators) {
      for (let i in this.#core.Indicators[p]) {
        this.#core.Indicators[p][i].instance.remove()
      }
    }
  }

  restart() {
    this.chart.scale.restart()

    this.validateIndicators()

    for (let [k,v] of this.views) {
      for (let i of v) {
        if (k === "primary" && i.type === "candles") continue
        this.addIndicator(i.type, i.name, {data: i.data, settings: i.settings})
      }
    }

    this.draw(this.range, true)
  }

  eventsListen() {
    // Give Main focus so it can receive keyboard input
    this.#elRows.tabIndex = 0
    this.#elRows.focus()

    this.#input = new Input(this.#elRows, {disableContextMenu: false});

    this.#input.on("keydown", this.onChartKeyDown.bind(this))
    this.#input.on("keyup", this.onChartKeyUp.bind(this))

    this.#input.on("wheel", this.onMouseWheel.bind(this))
    this.#input.on("pointerenter", this.onMouseEnter.bind(this));
    this.#input.on("pointerout", this.onMouseOut.bind(this));
    this.#input.on("pointerup", this.onChartDragDone.bind(this))
    this.#input.on("pointermove", this.onMouseMove.bind(this))

    // this.pointermove = this.onMouseMove.bind(this)
    // this.#elRows.addEventListener("pointermove", this.pointermove)

    // listen/subscribe/watch for notifications
    this.on(STREAM_FIRSTVALUE, this.onFirstStreamValue, this)
    this.on(STREAM_NEWVALUE, this.onNewStreamValue, this)
    this.on("setRange", this.draw, this)
    this.on("scrollUpdate", this.draw, this)
    this.on("chart_render", this.draw, this)
    this.on("destroyChartView", this.removeChartPane, this)
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
    const p = this.#position
    p.d2x = p?.d1x || null
    p.d2y = p?.d1y || null
    p.d1x = e.movement.x
    p.d1y = e.movement.y
    p.dx = Math.floor((p.d1x + p.d2x) / 2)
    p.dy = Math.floor((p.d1y + p.d2y) / 2)
    p.ts2 = p?.ts1 || null
    p.ts1 = Date.now()

    this.#cursorPos = [
      e.position.x, e.position.y, 
      e.dragstart.x, e.dragstart.y,
      p.dx, p.dy,
      p.ts1, p.ts1 - p.ts2
    ]

    this.core.Timeline.showCursorTime()
    this.core.Chart.graph.overlays.list.get("cursor").layer.visible = true

    for (let [key, secondaryPane] of this.chartPanes) {
      secondaryPane.graph.overlays.list.get("cursor").layer.visible = true
    }

    this.emit("main_mousemove", this.#cursorPos)
  }

  onMouseEnter(e) {
    this.core.Timeline.showCursorTime()

    this.core.Chart.graph.overlays.list.get("cursor").layer.visible = true
    this.core.Chart.graph.render()

    for (let [key, secondaryPane] of this.chartPanes) {
      secondaryPane.graph.overlays.list.get("cursor").layer.visible = true
      secondaryPane.graph.render()
    }
  }

  onMouseOut(e) {
    this.onPointerActive(false)

    this.core.Timeline.hideCursorTime()
    this.core.Chart.graph.overlays.list.get("cursor").layer.visible = false
    this.core.Chart.graph.render()

    for (let [key, secondaryPane] of this.chartPanes) {
      secondaryPane.graph.overlays.list.get("cursor").layer.visible = false
      secondaryPane.graph.render()
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

    this.#ChartPanes.forEach((secondaryPane, key) => {
      if (chart !== secondaryPane) {
        secondaryPane.cursorActive = false
        secondaryPane.scale.layerCursor.visible = false
        secondaryPane.scale.layerCursor.erase()
      }
    }) 
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

    this.#core.scrollPos = -1

    this.#Time.setDimensions({w: width})
    this.#Graph.setSize(width, height, layerWidth)

    // set on Chart dimensions
    if (this.#ChartPanes.size == 1 && chartH != this.#elRows.height) {
      this.#Chart.setDimensions({w: width, h: this.#elRows.height})
    }
    else {
      this.#ChartPanes.forEach((chartPane, key) => {
        chartH = Math.round(chartPane.viewport.height * resizeH)
        chartPane.setDimensions({w: width, h: chartH})
        chartPane.Divider.setPos()
      })
    }

    this.rowsOldH = this.rowsH
    this.draw(this.range, true)

    this.emit("rowsResize", dimensions)
  }

  getBufferPx() { 
    let w = Math.round(this.width * this.buffer / 100) 
    let r = w % this.candleW
    return w - r
  }

  registerChartViews(options) {
    this.#elRows.previousDimensions()

    const primaryPane = this.validateIndicators()

    // set the primary chart
    let primary = primaryPane[0]
    for (let o of primaryPane) {
      if (o?.primary === true) primary = o
      else o.primary = false
    }
    primary.primary = true
    options.rowY = 0
    // add chart views
    for (let [k,v] of this.views) {
      options.type = k
      options.view = v
      this.addChartPane(options)
    }
  }

  /**
   * list of expanded, collapsed, maximized panes excluding
   * @returns {Object}
   */
  chartPanesState() {
    const state = {
      list: [...this.#ChartPanes.values()],
      collapsed: [],
      expanded: [],
      maximized: this.#ChartPaneMaximized.instance
    }
    for (let o of state.list) {
      if (o.collapsed.state) state.collapsed.push(o)
      else state.expanded.push(o)
    }
    return state
  }

  /**
   * add chart pane - provides primaryPane and secondaryPane indicators
   * @param {Object} options 
   */
  addChartPane(options) {
    // list of expanded panes
    const { expanded: exp } = this.chartPanesState()
    // insert a row to mount the indicator on
    const heights = this.calcChartPaneHeights()
    const n = heights.new
    let h
    // resize charts panes to accommodate the new addition   
    for (h in heights) {
      if (this.#ChartPanes.has(h)) {
        let o = this.#ChartPanes.get(h)
        if (exp.indexOf(o) > -1)
          o.setDimensions({w: this.rowsW, h: heights[h]})
        // else break
      }
    }

    // insert a row for the new indicator
    let row
    this.#elRows.insertAdjacentHTML("beforeend", 
      this.#elMain.rowNode(options.type, this.#core))
    row = this.#elRows.chartPaneSlot.assignedElements().slice(-1)[0]
    row.style.height = `${n}px`
    row.style.width = `100%`

    // insert a YAxis for the new indicator
    let axis
    this.#elYAxis.insertAdjacentHTML("beforeend", 
      this.scaleNode(options.type))
    axis = this.#elYAxis.chartPaneSlot.assignedElements().slice(-1)[0]
    axis.style.height = `${n}px`
    axis.style.width = `100%`

    options.elements.elTarget = row
    options.elements.elScale = axis

    // instantiate the indicator
    let o
    if (options.type == "primary") {
      // options.id
      o = new Chart(this.#core, options)
      this.#Chart = o
    }
    else {
      options.name = options.view[0].name || "Secondary"
      options.shortName = options.view[0].type || "Secondary"
      o = new Chart(this.#core, options);
    }
    
    this.setPaneDividers()
    this.#ChartPanes.set(o.id, o)
    this.emit("addChartView", o)

    return o
  }

  /**
   * remove chart pane from the Main Pane
   * @param {string} paneID 
   * @returns 
   */
  removeChartPane(paneID) {
    if (!isString(paneID) ||
        !this.#ChartPanes.has(paneID) 
    ) return false

    const chartPane = this.#ChartPanes.get(paneID)
    if (chartPane.isPrimary) {
      this.#core.error(`Cannot remove primary chart pane! ${paneID}`)
      return false
    }

    // enable deletion
    this.#chartDeleteList[paneID] = true

    // list of expanded panes excluding current
    const { expanded: exp } = this.chartPanesState()
    let i = exp.indexOf(chartPane)
    // remove current pane from expanded pane list
    if (i > -1) exp.splice(i, 1)

    let h = chartPane.viewport.height
    let x = Math.floor(h / (exp.length))
    let r = h % x

    if (chartPane.status !== "destroyed")
      chartPane.destroy()

    this.#ChartPanes.delete(paneID)
    delete this.#chartDeleteList[paneID]

    // is there only one chart pane remaining?
    if (this.#ChartPanes.size === 1) {
      let o = this.#ChartPanes.values().next().value
      // expland pane if collapsed
      if (o.collapsed) o.collapsed.state = false

      o.setDimensions({w: undefined, h: this.rowsH})
    }
    else {
      // resize remaining expanded chart panes
      for (let o of exp) {
        h = o.viewport.height
        o.setDimensions({w: undefined, h: h + x + r })
        r = 0
      }
    }

    this.setPaneDividers()
    this.draw(this.range, true)
    return true
  }

  validateIndicators() {
    const primaryPane = []
    // iterate over chart panes and remove invalid indicators
    for (let [k,oc] of this.views) {

      if (k === "primary") primaryPane.push(oc)
      // validate entry - are there any indicators to add?
      if (oc.length === 0 && k !== "primary") {
        this.views.delete(k)
        continue
      }

      // remove any indicators that are not supported
      for (const [i, o] of oc.entries()) {
        // is valid?
        if (isObject(o) &&
            ( o.type in this.core.indicatorClasses ||
              nonIndicators.includes(o.type))) 
            continue
        // remove invalid
        this.#core.log(`indicator ${oc.type} not added: not supported.`)
        oc.splice(i, 1)
      }
    }
    return primaryPane
  }

  /**
   * add an indicator after the chart has started
   * @param {string} i - indicator type eg. EMA, DMI, RSI
   * @param {string} name - identifier
   * @param {Object} params - {settings, data}
   * @returns 
   */
  addIndicator(i, name=i, params={})  {
    if (
      !isString(i) &&
      !(i in this.#indicators) &&
      !isString(name) &&
      !isObject(params)
    ) return false

    this.log(`Adding the ${name} : ${i} indicator`)

    if (!isArray(params?.data)) params.data = []
    if (!isObject(params?.settings)) params.settings = {}

    let instance

    // add primary chart indicator
    if (this.#indicators[i].ind.primaryPane) {
      const indicator = {
        type: i,
        name: name,
        ...params
      }
        instance = this.#Chart.addIndicator(indicator);
    }
    // add secondary chart indicator
    else {
      const indicator = this.core.indicatorClasses[i].ind
      const indType = (
        indicator.primaryPane === "both" && 
        isBoolean(i.primaryPane)) ? 
        i.primaryPane : false;
        
      if (!isArray(params.view)) params.view = [{name, type: i, ...params}]
      // check all views are valid
      for (let v = 0; v < params.view.length; v++) {
        if (!isObject(params.view[v]) || !valuesInArray(["name", "type"], Object.keys(params.view[v])))
            params.view.splice(v,1)
      }
      if (params.view.length == 0) return false
        
      params.parent = this
      params.title = name
      params.elements = { ...this.elements }

      instance = this.addChartPane(params)
      instance.start()
    }
    this.#core.refresh()
    this.emit("addIndicatorDone", instance)
    console.log(`Added indicator:`, instance.id)

    return instance
  }

  /**
   * return indicators grouped by Chart Pane
   * @param {string} i - indicator ID
   */
  getIndicators() {
    const ind = {}

    this.#ChartPanes.forEach(
      (value, key) => {
        ind[key] = value.indicators
      }
    )
    return ind
  }

  /**
   * retrieve indicator by ID
   * @param {string} i - indicator ID
   */
  getIndicator(i) {
    if (!isString(i)) return false
    for (const p of this.#ChartPanes.values()) {
      if (i in p.indicators) {
        return p.indicators[i].instance
      }
    }
  }

  /**
   * remove an indicator - default or registered user defined
   * @param {string|Indicator} i - indicator id or Indicator instance
   * @returns {boolean} - success / failure
   */
  removeIndicator(i) {
    // remove by ID
    if (isString(i)) {
      for (const p of this.#ChartPanes.values()) {
        if (i in p.indicators) {
          p.indicators[i].instance.remove()
          return true
        }
      }
    }
    // remove by instance
    else if (i instanceof Indicator) {
      i.remove()
      return true
    }
    else return false
  }

  /**
   * set or get indicator settings
   * @param {string|Indicator} i - indicator id or Indicator instance
   * @param {Object} s - settings
   * @returns {boolean} - success / failure
   */
  indicatorSettings(i, s) {
    // find by ID
    if (isString(i)) {
      for (const p of this.#ChartPanes.values()) {
        if (i in p.indicators) {
          return p.indicators[i].instance.settings(s)
        }
      }
    }
    // find by instance
    else if (i instanceof Indicator) {
      return i.settings(s)
    }
    else return false
  }

  calcChartPaneHeights() {
    // list of expanded panes excluding current
    const { collapsed: col, expanded: exp } = this.chartPanesState()
    const cnt = this.#ChartPanes.size + 1
    const a = this.#viewDefaultH * (cnt - 1),
          ratio = ( a / Math.log10( a * 2 ) ) / 100,
          rowsH = Math.round(this.rowsH * ratio),
          sizes = {};

    if (cnt === 1) {
      // only adding the primary (price) chart
      sizes.new = this.rowsH
    }
    else if (cnt === 2 || exp.length === 1) {
      // adjust chart size for first secondary chart pane
      let height;
      try { height = exp[0].viewport.height }
      catch (e) { height = this.rowsH }
      const newPane = Math.round(height * this.#viewDefaultH / 100)
      sizes[exp[0].id] = height - newPane
      sizes.new = newPane
    }
    else if (exp.length === 2) {
      const first = exp[0].viewport.height
      const second = exp[1].viewport.height
      const height = first + second
      const newPane = Math.round(height * this.#viewDefaultH / 100)
      const ratio = height / (height + newPane)
      // adjust all to fit
      sizes[exp[0].id] = Math.floor(first * ratio)
      sizes[exp[1].id] = Math.floor(second * ratio)
      sizes.new = Math.floor(newPane * ratio)
      // account for remainder
      sizes.new += height - (sizes[exp[0].id] + sizes[exp[1].id] + sizes.new)
    }
    else if (exp.length >= 3) {
      // tally the heights of any collapsed panes
      let height = this.rowsH;
      let total = 0;
      let diff, ratio;
      for (let o of col) {
        height -= o.viewport.height
      }
      sizes.new = Math.floor(height / (exp.length + 1))
      ratio = height / (height + sizes.new)
      diff = (height - sizes.new) // exp.length
      for (let o of exp) {
        // sizes[o.id] = o.viewport.height - diff
        sizes[o.id] = diff * (o.viewport.height / height)
        total += sizes[o.id]
      }
      // account for remainder
      sizes.new += height - total
    }
    return sizes
  }

  scaleNode(type) {
    const styleRow = STYLE_ROW + ` width: 100%;`
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
    this.#ChartPanes.forEach((chartPane, key) => {
      graphs.push(chartPane)
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

  /**
   * Toggles chart pane maximization
   * needs to account for possible chart resizing
   * @param {Chart} p - Chart pane instance
   * @returns {boolean}
   */
  paneMaximize (p) {

    if (!(p instanceof Chart)) return false

    const maxMin = this.#ChartPaneMaximized
    const controls = p.legend.list.chart.el.querySelector(".controls")
    let style;

    controls.classList.toggle("maximized")
    controls.classList.toggle("restored")
    // chart pane is already maximized and so restore all
    if (p === maxMin.instance) {
      this.panesRestore()
      maxMin.instance = null
      maxMin.panes = {}
      if (p.collapsed.state) {
        p.graph.viewport.scene.canvas.style.display = "none"
        p.scale.graph.viewport.scene.canvas.style.visibility = "hidden"
      }
    }
    // maximize pane, minimize the rest
    else {
      // set all panes to default state
      this.panesRestore()
      // store maximized pane
      maxMin.instance = p
      // store MainPane dimensions in case chart is resized
      maxMin.rowsH = this.rowsH
      for (let [k, v] of this.#ChartPanes.entries()) {
        // store height for restore
        maxMin.panes[k] = v.element.clientHeight
        style = v.element.style
        if (p === v) {
          style.display = "block"
          v.setDimensions({w: undefined, h: this.rowsH})
          v.Divider.setPos()
          v.graph.viewport.scene.canvas.style.display = "block"
          v.scale.graph.viewport.scene.canvas.style.visibility = "visible"
        }
        else {
          style.display = "none"
        }
      }
    this.hidePaneDividers()
    }
    return true
  }

  /**
   * Iterate over chart panes and restore them to default state
   * needs to account for possible chart resizing
   */
  panesRestore() {
    const maxMin = this.#ChartPaneMaximized
    let style, i = 0;

    // are Chart Pane dimensions the same?
    if (this.dimensions.height == maxMin.height) {}

    for (let [k, v] of this.#ChartPanes.entries()) {
      style = v.element.style
      style.display = "block"
      if (k in maxMin.panes)
        if (i++ > 0) v.Divider.show()
        v.setDimensions({w: undefined, h: maxMin.panes[k]})
        v.Divider.setPos()
    }
  }

  /**
   * Toggles chart pane collapsed state
   * needs to account for possible chart resizing
   * @param {Chart} p - Chart pane instance
   * @returns {boolean}
   */
  paneCollapse(p) {
    if (!(p instanceof Chart)) return false

    const controls = p.legend.list.chart.el.querySelector(".controls")
    const pc = p.collapsed
      let h = p.element.clientHeight
      let i, j, n;
    // list of expanded and collapsed panes excluding current
    const {list: v, collapsed: col, expanded: exp} = this.chartPanesState()
    i = col.indexOf(p)
    if (i > -1) col.splice(i, 1)
    i = exp.indexOf(p)
    if (i > -1) exp.splice(i, 1)

    // chart pane is already collapsed, so restore it
    if (p.collapsed.state) {
      controls.classList.remove("collapsed")
      controls.classList.add("expanded")

      // check if Rows count has changed
      if (pc.rowsCnt !== v.length) {
        h = pc.height * (pc.rowsCnt / v.length)
      }
      // check if Rows height has changed
      else if (pc.rowsHeight !== this.rowsH) {
        h = pc.height * (pc.rowsHeight / this.rowsH)
      }
      // no changes
      else {
        h = pc.height
      }
      // subtract height from all expanded panes
      j = (h - COLLAPSEDHEIGHT ) / exp.length
      for (let o of exp) {
        n = o.element.clientHeight - j
        o.setDimensions({w: undefined, h: n})
      }
      // set collapsed pane height
      p.collapse(h)
    }
    // collapse the chart pane
    else {
      controls.classList.add("collapsed")
      controls.classList.remove("expanded")

      // minimum of two panes required
      if (v.length < 2) return false
      // minimum of one expanded pane required
      if (exp.length < 1) return false
      // add height to all expanded panes
      h = (p.element.clientHeight - COLLAPSEDHEIGHT) / exp.length
      for (let o of exp) {
        n = o.element.clientHeight + h
        o.setDimensions({w: undefined, h: n})
      }
      // collapse current pane
      p.collapse()
    }
    // set the divider positions
    this.setPaneDividers()

    return true
  }

  setPaneDividers() {
    const {list: v} = this.chartPanesState()
    let i = 0
    for (let o of v) {
      if (o.Divider instanceof Divider &&
          i++ > 0) {
        o.Divider.setPos()
        o.Divider.show()
      }
    }
  }

  hidePaneDividers() {
    const {list: v} = this.chartPanesState()
    for (let o of v) {
      if (o.Divider instanceof Divider) {
        o.Divider.hide()
      }
    }
  }

  /**
   * expand collapsed chart pane to original height
   * or as close to depending upon chart resize
   * or the addition or removal of other panes
   * @param {Chart} p - Chart pane instance
   */
  // paneExpand(p) {

  // }

}
