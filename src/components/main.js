// main.js
// Main Pane that holds the chart and off chart indicators
// Providing: chart, off chart indicators

import Component from "./component"
import { elementDimPos } from "../utils/DOM"
import Timeline from './timeline'
import Graph from "./views/classes/graph"
import renderLoop from "./views/classes/renderLoop"
import Chart from "./chart"
import chartGrid from "./overlays/chart-grid"
import Indicator from "./overlays/indicator"
import watermark from "./overlays/chart-watermark"
// import chartCompositor from "./overlays/chart-compositor"
import Divider from "./widgets/divider"
import stateMachineConfig from "../state/state-main"
import Input from "../input"
import { isArray, isBoolean, isFunction, isNumber, isObject, isString } from "../utils/typeChecks"
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
  // ["watermark", {class: watermark, fixed: true, required: true, params: {content: null}}],
  ["grid", {class: chartGrid, fixed: false, required: true, params: {axes: "x"}}],
  // ["chartCompositor", {class: chartCompositor, fixed: true, required: true}]
]
const nonIndicators = ["candles", "trades", "events"]


/**
 * Provides chart main pane that hosts, chart, off charts (indicators), timeline, widgets
 * @export
 * @class MainPane
 */
export default class MainPane extends Component {

  #name = "MainPane"
  #shortName = "Main"
  #destruction = false

  #elYAxis
  #elMain
  #elRows
  #elTime
  #elScale
  #elGrid
  #elCanvas
  #elViewport

  #Graph
  #layerGrid
  #layerWatermark
  #ChartPanes = new xMap()
  #Chart
  #Time
  #chartGrid
  #chartDeleteList = {}
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
  
  #controller
  #input

  #scaleW = 0
  #scaleWOld = 0


  constructor (core, options) {

    options.parent = core
    super(core, options)

    this.#elMain = this.core.elMain
    this.#elYAxis = this.core.elYAxis
    this.init(options)
  }

  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get chart() { return this.#Chart }
  get chartPanes() { return this.#ChartPanes }
  get chartPaneMaximized() { return this.#ChartPaneMaximized }
  get chartDeleteList() { return this.#chartDeleteList }
  get time() { return this.#Time }
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
  get dimensions() { return elementDimPos(this.#elMain) }
  set cursor(c) { this.element.style.cursor = c }
  get cursor() { return this.element.style.cursor }
  get cursorPos() { return this.#cursorPos }
  get candleW() { return this.#Time.candleW }
  get buffer() { return this.#buffer }
  get bufferPx() { return this.getBufferPx() }
  get scrollPos() { return this.core.scrollPos }
  get renderLoop() { return renderLoop }
  get views() { return this.core.state.data.views }
  get indicators() { return this.getIndicators() }
  get indicatorClasses() { return this.core.indicatorClasses }
  get elements() {
    return {
      elRows: this.elRows,
      elPrimary: this.elPrimary,
      elSecondary: this.elSecondary,
      elTime: this.#elTime,
      elScale: this.#elScale
    }
  }


  init(options) {
    const core = this.core

    this.#elRows = this.#elMain.rows
    this.#elTime = this.#elMain.time
    this.#elGrid = this.#elMain.rows.grid
    this.#elViewport = this.#elMain.viewport  // this.#elMain.rows.grid.viewport
    this.#elScale = this.core.elBody.scale

    options.name = "Chart"
    options.shortName = "Chart"
    options.parent = this
    options.chartData = this.core.chartData
    options.primaryPane = this.core.primaryPane
    options.secondaryPane = this.core.secondaryPane

    options.rangeLimit = this.core.rangeLimit
    options.settings = this.core.settings

    // api - functions / methods, calculated properties provided by this module
    options.elements = 
      {...options.elements, 
        ...this.elements
      }

    if ( this.core.theme?.time?.navigation === false ) {
      const timeHeight = { height: TIMESCALEH }
      this.core.theme.time = {...this.core.theme?.time, ...timeHeight}
      // this.#elRows.style.height = `calc(100% - ${TIMESCALEH}px)`
    }

    // register timeline - xAxis
    this.#Time = new Timeline(this.core, options)

    // register chart views
    this.registerChartPanes(options)

    this.#buffer = isNumber(this.config.buffer)? this.config.buffer : BUFFERSIZE
    this.#rowMinH = isNumber(this.config.rowMinH)? this.config.rowMinH : ROWMINHEIGHT
    this.#viewDefaultH = isNumber(this.config.secondaryPaneDefaultH)? this.config.secondaryPaneDefaultH : SECONDARYDEFAULTHEIGHT

    this.rowsOldH = this.rowsH
  }

  start() {
    let i = 0

    // start timeline, chart, secondaryPane
    this.#elMain.start(this.theme)
    this.#Time.start()
    this.createGraph()
    
    // set scale width
    const scaleW = this.chart.scale.calcScaleWidth()
    this.core.elBody.scale.style.width = `${scaleW}px`
    this.#elViewport.style.width = `${this.#elRows.width}px`

    // start each view / chart pane 
    this.#ChartPanes.forEach((view, key) => {
      view.start(i++)
      // suppress divider of first chart pane as no preceding pane
      if (i === 1) view.Divider.hide()
    })

    this.rowsOldH = this.rowsH

    // create and start overlays
    this.draw(this.range, true)

    this.renderLoop.init({
      graphs: [this.graph],
      range: this.range
    })
    this.renderLoop.start()
    this.renderLoop.queueFrame(this.range, [this.graph], false)

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.id = this.id
    stateMachineConfig.context = this;
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()

    this.log(`Main Pane ${this.#name} instantiated and running`)
  }

  destroy() {
    this.#destruction = true
    this.renderLoop.stop()
    this.stateMachine.destroy()
    this.#ChartPanes.forEach((chartPane, key) => {
      chartPane.remove()
      delete this.#chartDeleteList[key]
    })
    this.graph.destroy();
    // remove all listeners
    this.core.hub.expunge(this)
    this.#input.destroy()

    this.stateMachine = null
    this.graph = null
  }

  /**
   * Remove any indicators
   */
  reset() {
    let panes = this.core.Indicators,
        indicator;
    for (let p in panes) {
      indicator = panes[p]
      for (let i in indicator) {
        indicator[i].instance.remove()
      }
    }
    // this.setDimensions()
  }

  /**
   * restart chart with current State
   */
  restart() {
    this.chart.scale.restart()

    // check if indicators need to be added
    const ind = this.getIndicators()
      let cnt = 0
    for (let r in ind) {
      if (isObject(ind[r]) && Object.keys(ind[r]).length > 0)
      cnt += Object.keys(ind[r]).length
    }
    if (cnt == 0) {
      this.validateIndicators()

      for (let [k,v] of this.views) {
        for (let i of v) {
          if (Object.keys(this.core.indicatorClasses).includes(i.type))
          this.addIndicator(i.type, i.name, {data: i.data, settings: i.settings})
        }
      }
    }

    // this.setDimensions()
  }

  eventsListen() {
    // Give Main focus so it can receive keyboard input
    // this.#elRows.tabIndex = 0
    // this.#elRows.focus()

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
    this.on("setRange", this.onSetRange, this);
    this.on("scrollUpdate", this.draw, this)
    this.on("chart_render", this.draw, this)
    this.on("chart_paneDestroy", this.removeChartPane, this)
  }

  onSetRange() {
    this.#scaleWOld = this.#scaleW
    this.#scaleW = this.chart.scale.calcScaleWidth()

    // // does the scale width have to adjusted?
    if (this.#scaleWOld < this.#scaleW) {
      const width = `${this.#scaleW}px`
      this.core.elBody.scale.style.width = width
      // this.#elViewport.style.width = `calc(100% - ${this.#scaleW}px)`
      // this.#elRows.style.width = `calc(100% - ${this.#scaleW}px)`
      // this.#elTime.style.width = `calc(100% - ${this.#scaleW}px)`

      this.setDimensions()
    }
    else this.draw()

    // this.draw()
  }

  onMouseWheel(e) {
    const direction = Math.sign(e.wheeldelta) * -1
    e.domEvent.preventDefault()

    // a dirty hack to handle touch pad 
    // confusion over pan and zoom events
    if (this.core.pointerButtons[0]) {
      e.dragstart.x = this.#cursorPos[0]
      e.dragstart.y = this.#cursorPos[1]
      e.position.x = this.#cursorPos[0] + direction
      e.position.y = this.#cursorPos[1]
      this.onChartDrag(e)
      return
    }
    const range = this.range
      let newStart = range.indexStart - Math.floor(direction * XAXIS_ZOOM * range.Length)
      let newEnd = range.indexEnd + Math.ceil(direction * XAXIS_ZOOM * range.Length)

    if (range.isPastLimit(newStart)) newStart = range.pastLimitIndex + 1
    if (range.isFutureLimit(newEnd)) newEnd = range.futureLimitIndex - 1
    if (newEnd - newStart > range.maxCandles ||
        newEnd - newStart < range.minCandles) return

    this.core.setRange(newStart, newEnd)
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
      d.start = [e.position.x, e.position.y]
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
    this.#cursorPos = [
      e.position.x, e.position.y, 
      ...d.start,
      ...d.delta
    ]

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

    let siblings = this.core.elBody.shadowRoot.children
    let width = this.core.elBody.offsetWidth
    for (let s of siblings) {
      if (s.tagName != "TRADEX-MAIN") width -= s?.offsetWidth || 0
    }
    this.element.style.width = `${width}px`

    let resizeH = this.#elRows.heightDeltaR
    let chartH = Math.round(this.chartH * resizeH)
    // let width = this.rowsW
    let height = this.rowsH
    let layerWidth = Math.round(width * ((100 + this.#buffer) * 0.01))
    let dimensions = {
      resizeH: resizeH,
      mainH: this.element.height,
      mainW: width,
      rowsH: this.rowsH,
      rowsW: this.rowsW,
    }

    this.core.scrollPos = -1

    this.#Time.setDimensions({w: width})
    this.graph.setSize(width, height, layerWidth)
    this.#elViewport.style.width =`${width}px`

    // set on Chart dimensions
    if (this.#ChartPanes.size == 1 && chartH != this.#elRows.height) {
      this.#Chart.setDimensions({w: width, h: this.#elRows.height})
    }
    else {
      this.#ChartPanes.forEach((chartPane, key) => {
        chartH = Math.round(chartPane.element.height * resizeH)
        chartPane.setDimensions({w: width, h: chartH})
      })
    }

    this.rowsOldH = this.rowsH
    this.emit("rowsResize", dimensions)
    this.draw(undefined, true)
  }

  getBufferPx() { 
    let w = Math.round(this.width * this.buffer / 100) 
    let r = w % this.candleW
    return w - r
  }

  /**
   * 
   * @param {object} options 
   */
  registerChartPanes(options) {
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
   * @param {object} params 
   */
  addChartPane(params) {
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
      this.#elMain.rowNode(params.type, this.core))
    row = this.#elRows.chartPaneSlot.assignedElements().slice(-1)[0]
    row.style.height = `${n}px`
    row.style.width = `100%`

    // insert a YAxis for the new indicator
    let axis
    this.#elYAxis.insertAdjacentHTML("beforeend", 
      this.scaleNode(params.type))
    axis = this.#elYAxis.chartPaneSlot.assignedElements().slice(-1)[0]
    axis.style.height = `${n}px`
    axis.style.width = `100%`

    params.elements.elTarget = row
    params.elements.elScale = axis

    // instantiate the chart pane
    let o
    if (params.type == "primary") {
      // params.id
      o = new Chart(this.core, params)
      this.#Chart = o
    }
    else {
      params.name = params.view[0].name || "Secondary"
      params.shortName = params.view[0].type || "Secondary"
      o = new Chart(this.core, params);
    }
    this.#ChartPanes.set(o.id, o)

    // check for sizing error
    const tally = this.tallyChartHeights()
    if (tally.height > this.#elMain.height) {
      
    }

    this.setPaneDividers()
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
        !this.#ChartPanes.has(paneID) ||
        paneID in this.#chartDeleteList
    ) return false

    const chartPane = this.#ChartPanes.get(paneID)
    if (chartPane.isPrimary && !this.#destruction) {
      this.core.error(`Cannot remove primary chart pane! ${paneID}`)
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

    if (chartPane.status !== "destroyed") {
      chartPane.destroy()
      this.#elMain.removeRow(chartPane.id)
    }

    this.#ChartPanes.delete(paneID)

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
        this.core.log(`indicator ${oc.type} not added: not supported.`)
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
   * @returns {Chart|Indicator|false}
   */
  addIndicator(i, name=i, params={})  {
    let instance;
    let isPrimary = this.indicatorClasses[i]?.primaryPane;

    if (
      !isString(i) ||
      !(i in this.indicatorClasses) ||
      !isString(name)
    ) return false

    this.log(`Adding the ${name} : ${i} indicator`)
      
    if (!isObject(params)) params = {data: [], settings: []}
    else {
      if (!isArray(params?.data)) params.data = []
      if (!isObject(params?.settings)) params.settings = {}
    }

    // isPrimary must be a boolean
    switch (isPrimary) {
      case true:
      case false:
        break;
      case undefined:
      case "both":
        isPrimary = (isBoolean(params.settings?.isPrimary)) ? 
        params.settings.isPrimary : true
    }

    params.settings.isPrimary = isPrimary

    // add primary chart indicator
    if (isPrimary) {
      const indicator = {
        type: i,
        name: name,
        ...params
      }
        instance = this.#Chart.addIndicator(indicator);
        if (!instance) return false

        this.core.state.addIndicator(instance, "primary")
    }
    // add secondary chart indicator
    else {       
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
      if (!instance) return false

      instance.start()
      this.core.state.addIndicator(instance, "secondary")
    }

    const id = ("instance" in instance) ? instance.instance.id : instance.id
    this.refresh()
    this.emit("addIndicatorDone", instance)
    this.core.log(`Added indicator:`, id)

    return instance
  }

  /**
   * return active indicators grouped by Chart Pane
   * @returns {object}
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
   * retrieve indicators by type
   * @param {string} t - indicator type
   * @returns {array} - array of indicators of type
   */
  getIndicatorsByType(t) {
    const r = []

    if (!isString(t)) return r
    for (let p of this.#ChartPanes.values()) {
      for (let i in p.indicators) {
        let inst = p.indicators[i].instance
        if (
          inst.shortName == t ||
          inst.libName == t
        )
        r.push(inst)
      }
    }
    return r
  }

  /**
   * retrieve active indicator by ID
   * @param {string} i - indicator ID
   * @returns {Indicator|boolean} - Indicator instance
   */
  getIndicator(i) {
    if (!isString(i)) return false
    for (const p of this.#ChartPanes.values()) {
      if (i in p.indicators) {
        return p.indicators[i].instance
      }
    }
    return false
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
          i = p.indicators[i].instance
        }
      }
    }
    // remove by instance
    if (!(i instanceof Indicator)) 
      return false

    // Should the chart pane be removed also?
    if (i.chart.type === "primaryPane" ||
        Object.keys(i.chart.indicators).length > 1)
    {
        i.remove()
        this.emit("pane_refresh", this)
    }
    // Yes!
    else i.chart.remove()

    return true
  }

  /**
   * set or get indicator settings
   * @param {string|Indicator} i - indicator id or Indicator instance
   * @param {Object} s - settings
   * @returns {object|boolean} - settings object or false
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

  tallyChartHeights() {
    const panes = this.#ChartPanes.entries()
    const heights = { panes: {}, tally: 0 }
    for (let [key, value] of panes) {
      heights.panes[key] = value
      heights.tally += value.height
    }
    return heights
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
      let height =  this.rowsH
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

    this.graph = new Graph(this, this.#elViewport, overlays)
  }

  draw(range=this.range, update=false) {
    range = (isObject(range)) ? range : this.range
    const graphs = [
      this.graph,
      this.#Time,
    ]
    this.time.xAxis.doCalcXAxisGrads(range)
    this.#ChartPanes.forEach((chartPane, key) => {
      if (chartPane.status !== "destroyed")
        graphs.push(chartPane)
      else
        this.error(`ERROR: attempted to draw destroyed pane: ${chartPane.id}`)
    })

    this.renderLoop.queueFrame(
      this.range, 
      graphs, 
      update)
  }

  refresh() {
    this.renderLoop.expungeFrames()
    this.core.Chart.graph.refresh()

    for (let [key, secondaryPane] of this.chartPanes) {
      secondaryPane.graph.refresh()
    }
    this.draw(this.range, true)
  }

  updateRange(pos) {
    this.core.updateRange(pos)
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
          v.graph.viewport.scene.canvas.style.display = "block"
          v.scale.graph.viewport.scene.canvas.style.visibility = "visible"
        }
        else {
          style.display = "none"
          v.scale.element.style.display = "none"
        }
      }
    this.hidePaneDividers()
    }

    this.emit("pane_refresh", this)

    return true
  }

  /**
   * Iterate over chart panes and restore them to default state
   * needs to account for possible chart resizing
   */
  panesRestore() {
    const maxMin = this.#ChartPaneMaximized
    let style, i = 0;

    this.emit("pane_refresh", this)

    // are Chart Pane dimensions the same?
    if (this.dimensions.height == maxMin.height) {}

    for (let [k, v] of this.#ChartPanes.entries()) {
      v.element.style.display = "block"
      v.scale.element.style.display = "block"
      if (k in maxMin.panes)
        if (i++ > 0) v.Divider.show()
        v.setDimensions({w: undefined, h: maxMin.panes[k]})
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

    this.emit("pane_refresh", this)

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
        o.Divider.setWidth()
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

}
