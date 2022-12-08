// offChart.js
// A base class for offChart components to extend upon

import DOM from "../utils/DOM"
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import ScaleBar from "./scale"
import Graph from "./views/classes/graph"
import CEL from "../components/primitives/canvas"
import Legends from "./primitives/legend"
import overlayGrid from "./overlays/chart-grid"
import overlayCursor from "./overlays/chart-cursor"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-offChart"
import { uid } from "../utils/utilities"
import { InputController, Keys } from "../input/controller"
import {
  STREAM_ERROR,
  STREAM_NONE,
  STREAM_LISTENING, 
  STREAM_STOPPED,
  STREAM_NEWVALUE,
  STREAM_UPDATE
} from "../definitions/core"

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

import {
  BUFFERSIZE,
} from "../definitions/chart"

const STYLE_OFFCHART = "" // "position: absolute; top: 0; left: 0; border: 1px solid; border-top: none; border-bottom: none;"
const STYLE_SCALE = "position: absolute; top: 0; right: 0;"
const STYLE_SCALE2 = "top: 0; right: 0;"

const defaultOverlays = [
  ["grid", {class: overlayGrid, fixed: true, required: true, params: {axes: "y"}}],
  ["cursor", {class: overlayCursor, fixed: true, required: true}]
]


export default class OffChart {

  #ID
  #name = "OffChart"
  #shortName = "offChart"
  #options
  #core
  #parent
  #stateMachine

  #elOffChart
  #elCanvas
  #elViewport
  #elLegends
  #elScale

  #offChartID
  #Scale
  #Time
  #Graph
  #Legends
  #Indicator
  #overlay
  #Divider
  #Stream

  #viewport
  #layerGrid
  #layerStream
  #layerCursor
  #layersIndicator
  #layersTools = new Map()

  #overlayGrid
  #overlayIndicators = new Map()
  #overlayIndicator
  #overlayTools = new Map()

  #cursorPos = [0, 0]
  #cursorActive = false

  #settings
  #streamCandle
  #title
  #theme
  #controller

  #localRange = {
    valueMax: 100,
    valueMin: 0,
    valueDiff: 100
  }


  constructor (core, options) {

    this.#core = core
    this.#elOffChart = options.elements.elOffChart
    this.#elScale = options.elements.elScale
    this.#parent = {...options.parent}
    this.#overlay = {...options.offChart}
    this.#theme = this.#core.theme

    this.#options = {...options}
    this.#ID = this.#options.offChartID || uid("TX_OC_")
    this.init(this.#options)
  }

  log(l) { this.core.log(l) }
  info(i) { this.core.info(i) }
  warning(w) { this.core.warn(w) }
  error(e) { this.core.error(e) }

  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get options() { return this.#options }
  get core() { return this.#core }
  get time() { return this.#Time }
  get scale() { return this.#Scale }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elOffChart) }
  get elOffChart() { return this.#elOffChart }
  get element() { return this.#elOffChart }
  get widgets() { return this.#core.WidgetsG }
  get offChartID() { return this.#offChartID }
  get localRange() { return this.#localRange }
  get data() {}
  get range() { return this.#core.range }
  get stream() { return this.#Stream }
  get cursorPos() { return this.#cursorPos }
  get cursorActive() { return this.#cursorActive }
  get candleW() { return this.#core.Timeline.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get scrollPos() { return this.#core.scrollPos }
  get bufferPx() { return this.#core.bufferPx }
  get Divider() { return this.#Divider }
  get width() { return this.#elOffChart.clientWidth }
  set width(w) { this.setWidth(w) } 
  get height() { return this.#elOffChart.clientHeight }
  set height(h) { this.setHeight(h) }
  get axes() { return "x" }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }


  init(options) {

    // process options
    if (isObject(options)) {
      for (const option in options) {
        if (option in this.props()) {
          this.props()[option](options[option])
        }
      }
    }
    
    this.mount(this.#elOffChart)

    const opts = {...options}
    opts.parent = this
    this.#Indicator = this.#core.indicators[this.#overlay.type].ind
    opts.yAxisType = this.#Indicator.scale
    opts.elScale = this.#elScale
    this.#Scale = new ScaleBar(this.#core, opts)
    this.#Time = this.core.Timeline
  }

  start(index) {

    this.#offChartID = index

    // X Axis - Timeline
    this.#Time = this.#core.Timeline

    // add divider to allow manual resize of the offChart indicator
    const config = { offChart: this }
    this.#Divider = this.widgets.insert("Divider", config)
    this.#Divider.start()

    // prepare layered canvas
    this.createGraph()

    // Legends - to display indicator overlay Title, inputs and options
    let instance = this.#overlayIndicator
    let offChartLegend = {
      id: this.options.offChart.type,
      title: this.options.offChart.name,
      type: this.options.offChart.type,
      source: instance.legendInputs.bind(instance)
    }
    this.#Legends = new Legends(this.#elLegends, this)
    this.#Legends.add(offChartLegend)

    // Y Axis - Price Scale
    this.#Scale.on("started",(data)=>{this.log(`OffChart scale started: ${data}`)})
    this.#Scale.start("OffChart",this.name,"yAxis Scale started")

    // draw the chart - grid, candles, volume
    this.draw(this.range)

    // set mouse pointer
    this.setCursor("crosshair")
  
    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.context.origin = this
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()
  }

  end() {
    this.stateMachine.destroy()
    this.#Graph.destroy()
    this.#Scale.end()
    this.#Divider.end()

    this.#controller.removeEventListener("mousemove", this.onMouseMove);
    this.#controller.removeEventListener("mouseenter", this.onMouseEnter);
    this.#controller.removeEventListener("mouseout", this.onMouseOut);
    this.#controller.removeEventListener("mousedown", this.onMouseDown);
    this.#controller = null

    this.off("main_mousemove", this.updateLegends)
    this.off(STREAM_LISTENING, this.onStreamListening)
    this.off(STREAM_NEWVALUE, this.onStreamNewValue)
    this.off(STREAM_UPDATE, this.onStreamUpdate)
  }


  eventsListen() {
    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(this.#elOffChart, {disableContextMenu: false});

    this.#controller.on("mousemove", this.onMouseMove.bind(this));
    this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
    this.#controller.on("mouseout", this.onMouseOut.bind(this));
    this.#controller.on("mousedown", this.onMouseDown.bind(this));

    // listen/subscribe/watch for parent notifications
    this.on("main_mousemove", this.updateLegends.bind(this))
    this.on(STREAM_LISTENING, this.onStreamListening.bind(this))
    this.on(STREAM_NEWVALUE, this.onStreamNewValue.bind(this))
    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this))
  }

  on(topic, handler, context) {
    this.core.on(topic, handler, context)
  }

  off(topic, handler) {
    this.core.off(topic, handler)
  }

  emit(topic, data) {
    this.core.emit(topic, data)
  }

  onMouseMove(e) {
    // this.#cursorPos = [e.layerX, e.layerY]
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)]
    this.emit(`${this.ID}_mousemove`, this.#cursorPos)
    // this.updateLegends()
  }

  onMouseEnter(e) {
    this.#cursorActive = true
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)]
    this.emit(`${this.ID}_mouseenter`, this.#cursorPos)
  }

  onMouseOut(e) {
    this.#cursorActive = false
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)]
    this.emit(`${this.ID}_mouseout`, this.#cursorPos)
  }

  onMouseDown(e) {
    if (this.stateMachine.state === "tool_activated") this.emit("tool_targetSelected", {target: this, position: e})
  }

  onStreamListening(stream) {
    if (this.#Stream !== stream) this.#Stream = stream
  }

  onStreamNewValue(value) {
    this.draw(this.range, true)
  }

  onStreamUpdate(candle) {
    this.#streamCandle = candle
    // calculate new indicator value
    this.#layerStream.setPosition(this.#core.stream.lastScrollPos, 0)
    // this.#chartStreamCandle.draw(candle)
    this.#viewport.render()

    this.updateLegends()
  }

  onStreamUpdate(candle) {
    this.#streamCandle = candle
    this.#Graph.render()
    this.updateLegends()
  }

  mount(el) {
    el.id = this.#ID
    el.innerHTML = this.defaultNode()

    const api = this.#core
    // this.#elWidgets = DOM.findBySelector(`#${api.id} .${CLASS_WIDGETS}`)
    this.#elViewport = DOM.findBySelector(`#${this.#ID} .viewport`)
    this.#elLegends = DOM.findBySelector(`#${this.#ID} .legends`)
    // this.#elScale = DOM.findBySelector(`#${this.#ID} .${CLASS_SCALE}`)
    // this.#elScale2.style.cssText = this.#elScale.style.cssText
  }

  props() {
    return {
      // id: (id) => this.setID(id),
      title: (title) => this.#title = title,
      yAxisDigits: (digits) => this.setYAxisDigits(digits),
    }
  }

  setWidth(w) {
    if (!isNumber(w)) w = this.width || this.#parent.width

    this.#elOffChart.style.width = `${w}px`
    this.#elViewport.style.width = `${w - this.#elScale.clientWidth}px`
  }

  setHeight(h) {
    if (!isNumber(h)) h = this.height || this.#parent.height

    this.#elOffChart.style.height = `${h}px`
    this.#elScale.style.height = `${h}px`
    this.#elViewport.style.height = `${h}px`
    this.#Scale.setDimensions({w: null, h: h})
  }

  setDimensions(dim) {
    const buffer = this.config.buffer || BUFFERSIZE
    const {w, h} = dim
    const width = w - this.#elScale.clientWidth
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01))

    this.#Graph.setSize(width, h, layerWidth)
    this.setWidth(w)
    this.setHeight(h)
    this.#Scale.resize(w, h)

    this.draw(undefined, true)
  }

  setCursor(cursor) {
    this.#elOffChart.style.cursor = cursor
  }

  defaultNode() {
    const api = this.#core
    const width = api.width - api.toolsW - api.scaleW
    const height = this.#options.rowH

    const styleOffChart = STYLE_OFFCHART + ` width: ${width}px; height: ${height}px`
    const styleScale = STYLE_SCALE + ` width: ${api.scaleW - 1}px; height: ${height}px; border-color: ${api.chartBorderColour};`
    const styleLegend = `width: 100%; position: absolute; top: 0; left: 0; z-index:100;`

    const node = `
      <div class="viewport" style="${styleOffChart}"></div>
      <div class="legends" style="${styleLegend}"></div>
      <div class="${CLASS_SCALE}" style="${styleScale}"></div>
    `
    this.#elScale.style.cssText = STYLE_SCALE2 + ` width: ${api.scaleW - 1}px; height: ${height}px; border-color: ${api.chartBorderColour};`
    return node
  }

// -----------------------

  // setOffChartStyle(chartStyle) {}
  // getOffChartStyle(chartStyle) {}
  // setOffChartTheme(chartTheme) {}
  // getOffChartTheme(chartTheme) {}

  createGraph() {

    const indicator = [this.#overlay.name, {class: this.#Indicator, fixed: false, required: false, params: {overlay: this.#overlay}}]

    defaultOverlays.splice(1, 0, indicator)

    const overlays = defaultOverlays

    this.#Graph = new Graph(this, this.#elViewport, overlays)
    this.#overlayIndicator = this.#Graph.overlays.get(this.#overlay.name).instance
    this.#layerGrid = this.#Graph.overlays.get("grid").layer
    this.#overlayGrid = this.#Graph.overlays.get("grid").instance
    this.#viewport = this.#Graph.viewport
    this.#elCanvas = this.#Graph.viewport.scene.canvas
  }

  layerConfig() {
    const buffer = this.config.buffer || BUFFERSIZE
    const width = this.#elViewport.clientWidth
    const height = this.#options.rowH || this.#parent.rowsH - 1
    const layerConfig = { 
      width: Math.round(width * ((100 + buffer) * 0.01)), 
      height: height
    }
    return {width, height, layerConfig}
  }

  draw(range=this.range, update=false) {
    window.requestAnimationFrame(()=>this.#Graph.draw(range, update))
  }

  drawGrid() {
    this.#layerGrid.setPosition(this.#core.scrollPos, 0)
    this.#overlayGrid.draw("y")
    this.#Graph.render();
  }

  refresh() {
    this.draw()
    this.#Scale.draw()
  }

  /**
   * Update chart and indicator legends
   * @param {array} pos - cursor position x, y, defaults to current cursor position
   * @param {array} candle - OHLCV
   */
   updateLegends(pos=this.#cursorPos, candle=false) {
    const legends = this.#Legends.list

    for (const legend in legends) {
      this.#Legends.update(legend, {pos, candle})
    }
  }

  updateRange(pos) {
    // draw the chart - grid, candles, volume
    this.draw(this.range)
  }

  zoomRange(pos) {
    // draw the chart - grid, candles, volume
    this.draw(this.range, true)
  }

  resize(width=this.width, height=this.height) {
    // adjust partent element
    this.setDimensions({w: width, h: height})
  }

}