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
import { isArray, isArrayOfType, isBoolean, isFunction, isNumber, isObject, isString } from "../utils/typeChecks"
import { copyDeep, valuesInArray, xMap } from "../utils/utilities"

import {
  STREAM_FIRSTVALUE,
  STREAM_NEWVALUE,
} from '../definitions/core'

import {
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
import graph from "./views/classes/graph"

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
  #Chart
  #Time
  #chartGrid
  #chartDeleteList = {}

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

    this.init(options)
  }

  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get chart() { return this.#Chart }
  get chartPanes() { return this.core.state.chartPanes }
  get chartPaneMaximized() { return this.core.state.chartPaneMaximized }
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
  get inventory() { return this.core.state.data.inventory }
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
    
    this.#elMain = this.core.elMain
    this.#elRows = this.#elMain.rows
    this.#elTime = this.#elMain.time
    this.#elGrid = this.#elMain.rows.grid
    this.#elViewport = this.#elMain.viewport  // this.#elMain.rows.grid.viewport
    this.#elScale = this.core.elBody.scale

    options.name = "Chart"
    options.shortName = "Chart"
    options.parent = this
    options.rangeLimit = this.core.rangeLimit
    options.settings = this.core.settings
    options.elements = {...options.elements, ...this.elements}

    if ( this.core.theme?.time?.navigation === false ) {
      const timeHeight = { height: TIMESCALEH }
      this.core.theme.time = {...this.core.theme?.time, ...timeHeight}
    }

    this.#Time = new Timeline(this.core, options)
    this.chartPanes.clear()
    this.chartPanesRegister(options)
    this.#buffer = isNumber(this.config.buffer)? this.config.buffer : BUFFERSIZE
    this.#rowMinH = isNumber(this.config.rowMinH)? this.config.rowMinH : ROWMINHEIGHT
    this.#viewDefaultH = isNumber(this.config.secondaryPaneDefaultH)? this.config.secondaryPaneDefaultH : SECONDARYDEFAULTHEIGHT
    this.rowsOldH = this.rowsH
  }

  /**
   * start timeline, primary and secondary chart panes
   */
  start() {
    this.#elMain.start(this.theme)
    this.#Time.start()
    this.createGraph()
    this.rowsOldH = this.rowsH
    this.chartPanesStart()
    this.chartPanesSizeToInventory()
    this.setScaleWidth()
    this.draw(this.range, true)
    this.renderLoop.init({
      graphs: [this.graph],
      range: this.range
    })
    this.renderLoop.start()
    this.renderLoop.queueFrame(this.range, [this.graph], false)
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.id = this.id
    stateMachineConfig.context = this;
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()

    this.log(`Main Pane ${this.#name} instantiated and running`)
  }

  destroy(indicators=true) {
    this.#destruction = true
    this.renderLoop.stop()
    this.stateMachine.destroy()
    this.chartPanes.forEach((chartPane, key) => {
      if (!!indicators) 
        chartPane.remove()
      else 
        chartPane.deactivate()
      delete this.#chartDeleteList[key]
    })
    this.graph.destroy()
    this.time.destroy()
    this.core.hub.expunge(this)
    this.#input.destroy()
    this.stateMachine = null
    this.graph = null
  }

  /**
   * Reset Chart to price history (candles) only
   * Remove any primary or secondary indicators
   */
  reset() {
    let indicators = this.core.Indicators
    for (let p in indicators) {
      for (let i in indicators[p]) {
        this.core.removeIndicator(i)
      }
    }
    return
  }

  removeAllRowElements() {
    this.#elMain.rows.shadowRoot = ""
    this.#elScale.shadowRoot = ""
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
    this.on("range_set", this.onSetRange, this);
    this.on("chart_scrollUpdate", this.draw, this)
    this.on("chart_render", this.draw, this)
    this.on("chart_paneDestroy", this.chartPaneRemove, this)
  }

  onSetRange() {
    this.#scaleWOld = this.#scaleW
    this.#scaleW = this.chart.scale.calcScaleWidth()

    // does the scale width have to adjusted?
    if (this.#scaleWOld != this.#scaleW) {
      this.core.elBody.setYAxisWidth(this.#scaleW)
      this.setDimensions()
      this.draw()
    }
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

    this.emit("main_mouseMove", this.#cursorPos)
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

    this.chartPanes.forEach((secondaryPane, key) => {
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

    let resizeH = this.#elRows.heightDeltaR
    let chartH = Math.round(this.chartH * resizeH)
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
    this.#elViewport.style.width =`${width}px`
    this.#elViewport.style.height =`${height}px`
    this.#Time.setDimensions({w: width})
    this.graph.setSize(width, height, layerWidth)
    this.#elViewport.style.width =`${width}px`

    // set on Chart dimensions
    if (this.chartPanes.size == 1 && chartH != this.#elRows.height) {
      this.#Chart.setDimensions({w: width, h: this.#elRows.height})
    }
    else {
      this.chartPanes.forEach((chartPane, key) => {
        chartH = Math.round(chartPane.element.height * resizeH)
        chartPane.setDimensions({w: width, h: chartH})
      })
    }

    this.rowsOldH = this.rowsH
    this.emit("chart_rowsResize", dimensions)
    this.draw(undefined, true)
  }

  /**
   * Set scale width for all chart panes
   * @param {Boolean} draw - should this.draw() be invoked?
   * @returns 
   */
  setScaleWidth(draw=false) {
    const { expanded: exp } = this.chartPanesState()
    let scaleW = 0;
    
    if (this.chartPanes.size === 1) {
      scaleW = this.chartPanes.values().next().value.scale.calcScaleWidth()
    }
    else {
      for (let o of exp) {
        let w = o.scale.calcScaleWidth()
        scaleW = (w > scaleW) ? w : scaleW
      }
    }
    this.core.elBody.setYAxisWidth(scaleW)
  }

  getBufferPx() { 
    let w = Math.round(this.width * this.buffer / 100) 
    let r = w % this.candleW
    return w - r
  }

//------------------------
// Chart Panes
//------------------------

  /**
   * Add panes to chart from inventory
   * @private
   * @param {object} options 
   */
  chartPanesRegister(options) {
    this.#elRows.previousDimensions()
    this.validateIndicators()
    
    for (let p of this.inventory) {
      if (isArray(p) && p.length > 1) {
        options.type = (p[0] == "primary") ? p[0] : "secondary"
        options.view = (isArrayOfType(p[1], "object")) ? p[1] : [p[1]]
        options.state = p[2]
        this.chartPaneAdd(options)
      }
    }
  }

  /** 
   * Start each chart pane 
   * @private
   */
  chartPanesSizeToInventory() {
    if (!this.chartPanes.size ||
        !isObject(this.#Chart.options?.state)) 
        return

    const heights = {}
    const heightsC = {}
    let collapsed = false
    let total = 0;
    let totalC = 0
    let h, hc, colRowsH, colRowsCnt;
    this.chartPanes.forEach((pane, key) => {
      let state = pane.options.state
      h = state.height
      hc = state.collapsed.height
      heights[key] = h
      heightsC[key] = hc
      total += h
      totalC += hc
      collapsed = collapsed || state.collapsed.height
      if (isNumber(state.collapsed.rowsHeight)) {
        colRowsH = state.collapsed.rowsHeight
        colRowsCnt = state.collapsed.rowsCnt
      }
    })
    // no collapsed panes
    if (!collapsed) return

    if (colRowsH != this.rowsH) {
console.log("total does not match Row Height")

      let delta = this.rowsH - total
    }
    this.chartPanes.forEach((pane, key) => {
      pane.setDimensions( {h: heights[key]} )
    })
    // check if pane is maximized or collapsed and apply
    this.chartPanes.forEach((pane, key) => {
      if (!!pane.options?.state?.collapsed?.state) {
        this.chartPaneCollapse(pane)
      }
      if (!!pane.options?.state?.maximized) {
        this.chartPaneMaximize(pane)
      }
    })
  }

  /** 
   * Start each chart pane 
   * @private
   */
  chartPanesStart() {
    let i = 0
    this.chartPanes.forEach((pane, key) => {
      pane.start(i++)
      // suppress divider of first chart pane as no preceding pane
      if (i === 1) {
        pane.Divider.hide()
      }
      // // check if new pane is maximized or collapsed and apply
      // if (!!pane.options?.state?.collapsed?.state) {
      //   this.chartPaneCollapse(pane)
      // }
      // if (!!pane.options?.state?.maximized) {
      //   this.chartPaneMaximize(pane)
      // }
    })
  }

  /** 
   * @typedef {Object} chartPanesState
   * @property {Array} list - list of chart panes
   * @property {Array} collapsed - list of collapsed chart panes
   * @property {Array} expanded - list of expanded chart panes
   * @property {Chart|null} maximized - maximized chart pane
  */
  /**
   * list of expanded, collapsed, maximized panes excluding
   * @returns {chartPanesState} chartPanesState
   */
  chartPanesState() {
    const state = {
      list: [...this.chartPanes.values()],
      collapsed: [],
      expanded: [],
      maximized: this.chartPaneMaximized?.instance
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
  chartPaneAdd(params) {
    // list of expanded panes
    const { expanded: exp } = this.chartPanesState()
    // insert a row to mount the chart pane on
    const heights = this.chartPaneHeightsCalc(params?.state)
    const n = heights.new
    let h
    // resize charts panes to accommodate the new addition   
    for (h in heights) {
      if (this.chartPanes.has(h)) {
        let o = this.chartPanes.get(h)
        if (exp.indexOf(o) > -1)
          o.setDimensions({w: this.rowsW, h: heights[h]})
        // else break
      }
    }

    // insert a row for the new chart pane
    let row = this.#elMain.addRow(params.type, "", this.core, n)
    let axis = this.#elMain.addScaleRow(params.type, n, this.#elScale)
    
    params.elements.elTarget = row
    params.elements.elScale = axis

    // instantiate the chart pane
    let o
    if (params.type == "primary") {
      o = new Chart(this.core, params)
      this.#Chart = o
    }
    else {
      params.type = "secondary"
      params.name = params.view?.[0].name || "Secondary"
      params.shortName = params.view?.[0].type || "Secondary"
      o = new Chart(this.core, params);
    }
    this.chartPanes.set(o.id, o)

    // check for sizing error
    const tally = this.chartPaneHeightsTally()
    if (tally.total > this.#elMain.height) {
    }

    this.chartPaneDividersSet()
    this.emit("chart_paneAdd", o)

    return o
  }

  /**
   * remove chart pane from the Main Pane
   * @param {string} paneID 
   * @returns 
   */
  chartPaneRemove(paneID) {
    if (!isString(paneID) ||
        !this.chartPanes.has(paneID) ||
        paneID in this.#chartDeleteList
    ) return false

    const chartPane = this.chartPanes.get(paneID)
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

    this.chartPanes.delete(paneID)
    this.setScaleWidth()

    // is there only one chart pane remaining?
    if (this.chartPanes.size === 1) {
      let o = this.chartPanes.values().next().value
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

    this.chartPaneDividersSet()
    this.draw(this.range, true)

    return true
  }

  chartPaneRemoveRows() {
    // this.#elRows
  }


  chartPaneHeightsTally() {
    const panes = this.chartPanes.entries()
    const heights = { panes: {}, total: 0 }
    for (let [key, value] of panes) {
      heights.panes[key] = value
      heights.total += value.height
    }
    return heights
  }

  /**
   * Re-calculate chart pane heights to accommodate new pane
   * @param {Object} newPane - state of new chart pane
   * @param {Boolean} newPane.maximized - whether pane is maximized
   * @param {Boolean} newPane.collapsed - whether pane is collapsed
   * @param {Number} newPane.height - new pane height
   * @returns 
   */
  chartPaneHeightsCalc(newPane) {
    // list of expanded panes excluding current
    const { collapsed: col, expanded: exp } = this.chartPanesState()
    const cnt = this.chartPanes.size + 1
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

  /**
   * Toggles chart pane maximization
   * needs to account for possible chart resizing
   * @param {Chart} p - Chart pane instance
   * @returns {boolean}
   */
  chartPaneMaximize (p) {

    if (!(p instanceof Chart)) return false

    const maxMin = this.chartPaneMaximized
    const controls = p.legend.list.chart.el.querySelector(".controls")
    let style;
    
    controls.classList.toggle("maximized")
    controls.classList.toggle("restored")
    // chart pane is already maximized and so restore all
    if (p === maxMin.instance) {
      this.chartPanesRestore()
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
      this.chartPanesRestore()
      // store maximized pane
      maxMin.instance = p
      // store MainPane dimensions in case chart is resized
      maxMin.rowsH = this.rowsH
      for (let [k, v] of this.chartPanes.entries()) {
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
    this.chartPaneDividersHide()
    }

    this.emit("chart_paneRefresh", this)

    return true
  }

  /**
   * Iterate over chart panes and restore them to default state
   * needs to account for possible chart resizing
   */
  chartPanesRestore() {
    const maxMin = this.chartPaneMaximized
    let style, i = 0;

    this.emit("chart_paneRefresh", this)

    // are Chart Pane dimensions the same?
    if (this.dimensions.height == maxMin.height) {}

    for (let [k, v] of this.chartPanes.entries()) {
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
  chartPaneCollapse(p) {
    if (!(p instanceof Chart)) return false

    this.emit("chart_paneRefresh", this)

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
    this.chartPaneDividersSet()

    return true
  }

  chartPaneDividersSet() {
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

  chartPaneDividersHide() {
    const {list: v} = this.chartPanesState()
    for (let o of v) {
      if (o.Divider instanceof Divider) {
        o.Divider.hide()
      }
    }
  }

//------------------------
// Indicators
//------------------------

  /**
   * iterate over chart panes and remove invalid indicators
   */
  validateIndicators() {
    const isValidObj = (o) => {
      return isObject(o) &&
      ( o.type in this.core.indicatorClasses ||
        nonIndicators.includes(o.type))
    }

    const isValidArr = (o) => {
      if (!isArray(o)) return false
      o.forEach((v, i) => {
        if (!isValidObj(v)) {
          this.core.log(`TradeX-Chart : ${this.core.id} : indicator ${v?.type} not added: not supported.`)
          o.splice(i, 1)
        }
      })
      return !o.length
    }

    this.inventory.forEach((v, i) => {
        isValidArr(v[1])
    });
  }

  /**
   * add an indicator after the chart has started
   * @param {string} i - indicator type eg. EMA, DMI, RSI
   * @param {string} name - identifier
   * @param {Object} params - {settings, data}
   * @returns {Chart|Indicator|undefined}
   */
  addIndicator(i, name=i, params={})  {
    let instance, pane;
    let isPrimary = this.indicatorClasses[i]?.primaryPane;

    if (
      !isString(i) ||
      !(i in this.indicatorClasses) ||
      !isString(name)
    ) return undefined

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
      if (!instance) return undefined

      pane = "primary"
    }
    // add secondary chart indicator
    else {       
      if (!isArray(params.view)) params.view = [{name, type: i, ...params}]
      // check all views are valid
      for (let v = 0; v < params.view.length; v++) {
        if (!isObject(params.view[v]) || !valuesInArray(["name", "type"], Object.keys(params.view[v])))
            params.view.splice(v,1)
      }
      if (params.view.length == 0) return undefined
        
      params.parent = this
      params.title = name
      params.elements = { ...this.elements }
      params.yAxisPadding = this.core.indicatorClasses[i]?.yAxisPadding || 1

      instance = this.chartPaneAdd(params)
      if (!instance) return undefined

      instance.start()
      pane = "secondary"
      this.emit("chart_secondaryAdd", instance)
    }

    const id = ("instance" in instance) ? instance.instance.id : instance.id
    this.refresh()
    this.core.state.addIndicator(instance, pane)
    this.core.log(`Added indicator:`, id)
    this.emit("chart_IndicatorAddDone", instance)

    return instance
  }

  /**
   * return active indicators grouped by Chart Pane
   * @returns {object}
   */
  getIndicators() {
    const ind = {}

    this.chartPanes.forEach(
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
    for (let p of this.chartPanes.values()) {
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
    for (const p of this.chartPanes.values()) {
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
      for (const p of this.chartPanes.values()) {
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
        this.emit("chart_paneRefresh", this)
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
      for (const p of this.chartPanes.values()) {
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
    this.chartPanes.forEach((chartPane, key) => {
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
    if (!(this.core.Chart?.graph instanceof Graph)) return

    this.renderLoop.expungeFrames()
    this.core.Chart.graph.refresh()

    for (let [key, secondaryPane] of this.chartPanes) {
      secondaryPane?.graph?.refresh()
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

}
