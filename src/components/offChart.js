// offChart.js
// A base class for offChart components to extend upon

import DOM from "../utils/DOM"
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import ScaleBar from "./scale"
import CEL from "../components/primitives/canvas"
import Legends from "./primitives/legend"
import overlayGrid from "./overlays/chart-grid"
import overlayCursor from "./overlays/chart-cursor"
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
const STYLE_SCALE = "position: absolute; top: 0; right: 0; border-left: 1px solid;"
const STYLE_SCALE2 = "top: 0; right: 0; border-left: 1px solid;"

export default class OffChart {

  #ID
  #name = "OffChart"
  #shortName = "offChart"
  #mediator
  #options
  #core
  #parent

  #elOffChart
  #elViewport
  #elLegends
  #elScale

  #Scale
  #Time
  #Legends
  #Indicator
  #overlay
  #offChartID
  #Divider
  #Stream

  #viewport
  #layerGrid
  #layerStream
  #layerCursor
  #layersIndicator
  #layersTools = new Map()

  #overlayGrid
  #overlayIndicator
  #overlayStream
  #overlayTools = new Map()
  #overlayCursor

  #cursorPos = [0, 0]
  #cursorActive = false

  #settings
  #streamCandle
  #title
  #theme
  #controller


  constructor (mediator, options) {

    this.#mediator = mediator
    this.#elOffChart = mediator.api.elements.elOffChart
    this.#elScale = mediator.api.elements.elScale
    this.#parent = {...this.mediator.api.parent}
    this.#overlay = options.offChart
    this.#core = this.mediator.api.core
    this.#theme = this.#core.theme

    this.#options = options
    this.#ID = this.#options.offChartID || uid("TX_OC_")
    this.init(options)
  }

  log(l) { this.mediator.log(l) }
  info(i) { this.mediator.info(i) }
  warning(w) { this.mediator.warn(w) }
  error(e) { this.mediator.error(e) }

  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get core() { return this.#core }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elOffChart) }
  get stateMachine() { return this.#mediator.stateMachine }
  get elOffChart() { return this.#elOffChart }
  get element() { return this.#elOffChart }
  get widgets() { return this.#core.WidgetsG }
  get offChartID() { return this.#offChartID }
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

    // Legends - to display indicator overlay Title, inputs and options
    let offChartLegend = {
      id: options.offChart.type,
      title: options.offChart.name,
      type: options.offChart.type
    }
    this.#Legends = new Legends(this.#elLegends, this)
    this.#Legends.add(offChartLegend)

    // api - functions / methods, calculated properties provided by this module
    const api = {...this.mediator.api}
    api.parent = this
    api.elements.elScale = this.#elScale

    // Y Axis - Price Scale
    this.#Indicator = this.#mediator.api.indicators[this.#overlay.type].ind
    options.yAxisType = this.#Indicator.scale
    const id = options.offChart.type + "_ScaleBar"
    this.#Scale = this.mediator.register(id, ScaleBar, options, api)
    this.#Time = this.core.Timeline
  }

  start(index) {

    this.#offChartID = index

    // X Axis - Timeline
    this.#Time = this.mediator.api.Timeline

    // Y Axis - Price Scale
    this.#Scale.on("started",(data)=>{this.log(`OffChart scale started: ${data}`)})
    this.#Scale.start("OffChart",this.name,"yAxis Scale started")
    // add divider to allow manual resize of the offChart indicator
    const config = { offChart: this }
    this.#Divider = this.widgets.insert("Divider", config)
    this.#Divider.start()

    // prepare layered canvas
    this.createViewport()
    // draw the chart - grid, candles, volume
    this.draw(this.range)

    // set mouse pointer
    this.setCursor("crosshair")
  
    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.context.origin = this
    this.mediator.stateMachine = stateMachineConfig
    this.mediator.stateMachine.start()
  }

  end() {
    this.#mediator.stateMachine.destroy()
    this.#viewport.destroy()
    this.#Scale.end()
    this.#Divider.end()
    this.#Indicator.end()

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
    this.mediator.on(topic, handler, context)
  }

  off(topic, handler) {
    this.mediator.off(topic, handler)
  }

  emit(topic, data) {
    this.mediator.emit(topic, data)
  }

  onMouseMove(e) {
    // this.#cursorPos = [e.layerX, e.layerY]
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)]
    this.emit(`${this.ID}_mousemove`, this.#cursorPos)
    this.updateLegends()
  }

  onMouseEnter(e) {
    this.#cursorActive = true
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)]
    this.emit(`${this.ID}_mouseenter`, this.#cursorPos)
  }

  onMouseOut(e) {
    this.#cursorActive = false
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)]
    this.emit(`${this.ID}_mouseout`, this.#cursorPos)
  }

  onMouseDown(e) {
    if (this.stateMachine.state === "tool_activated") this.emit("tool_targetSelected", {target: this, position: e})
  }

  onStreamListening(stream) {
    if (this.#Stream !== stream) {
      this.#Stream = stream
      if (this.#layerStream === undefined) this.layerStream()
    }
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

  mount(el) {
    el.id = this.#ID
    el.innerHTML = this.defaultNode()

    const api = this.mediator.api
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
    const width = dim.w - this.#elScale.clientWidth
    const height = dim.h
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01))

    this.#viewport.setSize(width, dim.h)
    this.#layerGrid.setSize(layerWidth, height)
    this.#layersIndicator.setSize(layerWidth, height)
    this.#layerCursor.setSize(width, height)

    this.setWidth(dim.w)
    this.setHeight(dim.h)
    this.#Scale.resize(dim.w, dim.h)

    this.draw(undefined, true)
  }

  setCursor(cursor) {
    this.#elOffChart.style.cursor = cursor
  }

  defaultNode() {
    const api = this.mediator.api
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

  createViewport() {

    const {width, height, layerConfig} = this.layerConfig()

    // create viewport
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });

    // create layers - grid, volume, candles
    this.#layerGrid = new CEL.Layer(layerConfig);
    this.#layersIndicator = this.layersOnRow(layerConfig)
    this.#layerCursor = new CEL.Layer();

    // add layers
    this.#viewport
    .addLayer(this.#layerGrid)
    .addLayer(this.#layersIndicator)
    .addLayer(this.#layerCursor)

    // add overlays
    this.#overlayCursor = 
    new overlayCursor(
      this.#layerCursor, 
      this,
      this.#Time, 
      this.#Scale, 
      this.#theme)

    this.#overlayIndicator =
    new this.#Indicator(
      this.#layersIndicator,
      this.#overlay,
      this.#Time, 
      this.#Scale, 
      this.#theme)

    this.#overlayGrid =
    new overlayGrid(
      this.#layerGrid, 
      this.#Time, 
      this.#Scale, 
      this.#theme)
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

  layersOnRow(layerConfig) {
    // let l = []

    // for (let i = 0; i < this.#overlay.length; i++) {
    //   l[i] = new CEL.Layer()
    // }
    // return l
    return new CEL.Layer(layerConfig)
  }

  addLayersOnChart() {
    // for (let i = 0; i < this.#layersIndicator.length; i++) {
    //   this.#viewport.addLayer(this.#layersIndicator[i])
    // }
    this.#viewport.addLayer(this.#layersIndicator)
  }

  layerStream() {
    const {width, height, layerConfig} = this.layerConfig()
    this.#layerStream = new CEL.Layer(layerConfig);
    this.#viewport.addLayer(this.#layerStream)
  }

  draw(range=this.range, update=false) {
    this.#layerGrid.setPosition(this.#core.scrollPos, 0)
    this.#layersIndicator.setPosition(this.#core.scrollPos, 0)

    if (this.scrollPos == this.bufferPx * -1 || 
      this.scrollPos == 0 || 
      update == true) 
    {
      this.#overlayGrid.draw("y")
      this.#overlayIndicator.draw(range)
    }

    this.#viewport.render();
  }

  refresh() {
    this.draw()
    this.#Scale.draw()
  }

  updateLegends(pos=this.#cursorPos) {
    const legends = this.#Legends.list
    const index = this.#Time.xPos2Index(pos[0])
    const offset = this.range.data.length - this.#overlayIndicator.overlay.data.length
    const entry = this.#overlayIndicator.overlay.data[index - offset]

    if (entry !== undefined) {
      const inputs = {}

      for (let i = 0; i < this.#overlayIndicator.plots.length; i++) {
        let plot = this.#overlayIndicator.plots[i]
        // first entry value is expected to be timestamp, so skip it
        inputs[plot.key] = this.#Scale.nicePrice(entry[i + 1])
      }
  
      for (const legend in legends) {
        let colour = this.#overlayIndicator.style.strokeStyle
        this.#Legends.update(legend, {inputs: inputs, colours: [colour]})
      }
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