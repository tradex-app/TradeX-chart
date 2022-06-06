// chart.js
// Chart - where most of the magic happens
// Providing: the playground for price movements, indicators and drawing tools

import DOM from "../utils/DOM"
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import ScaleBar from "./scale"
import CEL from "../components/primitives/canvas"
import Legends from "./primitives/legend"
import chartGrid from "./overlays/chart-grid"
import chartVolume from "./overlays/chart-volume"
import chartCandles from "./overlays/chart-candles"
import chartCursor from "./overlays/chart-cursor"
import stateMachineConfig from "../state/state-chart"
import { InputController, EventDispatcher } from '@jingwood/input-control'
import { getRange } from "../helpers/range"
import { VolumeStyle } from "../definitions/style"


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
  PRICEDIGITS,
} from "../definitions/chart"

const STYLE_CHART = "position: absolute; top: 0; left: 0; border: 1px solid; border-top: none; border-bottom: none;"
const STYLE_SCALE = "position: absolute; top: 0; right: 0; border-left: 1px solid;"
export default class Chart {

  #name = "Chart"
  #shortName = "chart"
  #mediator
  #options
  #core
  #parent
  #elChart
  #elWidgets
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

  #width
  #height
  #chartXPadding = 5
  #chartYPadding = 2.5

  #yAxisDigits
  #pricePrecision
  #volumePrecision

  #viewport
  #editport
  #layerGrid
  #layerVolume
  #layerCandles
  #layerCursor
  
  #chartGrid
  #chartVolume
  #chartCandles
  #chartCursor

  #cursorPos = [0, 0]
  #chartCandle
  #title
  #theme


  constructor (mediator, options) {

    this.#mediator = mediator
    this.#elChart = mediator.api.elements.elChart
    this.#parent = this.#mediator.api.parent
    this.#core = this.#mediator.api.core
    this.#data = this.#core.chartData
    this.#rangeLimit = this.#core.rangeLimit
    const end = this.#data.length - 1
    const start = end - this.#rangeLimit
    this.#range = getRange(this.#data, start, end)
    this.init(options)
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get scale() { return this.#Scale }
  get elScale() { return this.#elScale }
  set width(w) { this.setWidth(w) }
  get width() { return this.#width }
  set height(h) { this.setHeight(h) }
  get height() { return this.#height }
  set state(s) { this.setState(s) }
  get state() { return this.getState() }
  get data() { return this.#data }
  get range() { return this.#range }
  set priceDigits(digits) { this.setYAxisDigits(digits) }
  get priceDigits() { return this.#yAxisDigits || PRICEDIGITS }
  get cursorPos() { return this.#cursorPos }

  init(options) {

    // process options
    if (isObject(options)) {
      for (const option in options) {
        if (option in this.props()) {
          this.props()[option](options[option])
        }
      }
    }

    // mount chart on DOM
    this.mount(this.#elChart)

    // api - functions / methods, calculated properties provided by this module
    const api = this.#mediator.api
    api.parent = this
    api.elements = 
    {...api.elements, 
      ...{
        elWidgets: this.#elWidgets,
        elCanvas: this.#elCanvas,
        elScale: this.#elScale
      }
    }

    // Y Axis - Price Scale
    this.#Scale = this.#mediator.register("ScaleBar", ScaleBar, options, api)

    // set up layout responsiveness
    let dimensions = {wdith: this.#width, height: this.#height}
    this.emit("resizeChart", dimensions)

    this.#parent.on("resizeChart", (dimensions) => this.onResize(dimensions))

    this.log(`${this.#name} instantiated`)
  }


  start() {

    // Legends - to display overlay Title, inputs and options
    let options = {
      id: "chart",
      title: this.#title,
      type: "chart"
    }
    this.#Legends = new Legends(this.#elLegends)
    this.#Legends.add(options)

    // X Axis - Timeline
    this.#Time = this.#parent.time

    // Y Axis - Price Scale
    this.#Scale.on("started",(data)=>{this.log(`Chart scale started: ${data}`)})
    this.#Scale.start(`Chart says to Scale, "Thanks for the update!"`)

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
    
  }


  eventsListen() {
    let canvas = this.#viewport.scene.canvas
    // create controller and use 'on' method to receive input events 
    const controller = new InputController(canvas);
    // move event
    controller.on("mousemove", e => { this.onMouseMove(e) });
    // drag event
    controller.on("drag", e => { this.onChartDrag(e) });
    // drag event complete
    controller.on("enddrag", e => { this.onChartDragDone(e) });
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

  onMouseMove(e) {
    // this.#cursorPos = [e.layerX, e.layerY]
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)]

    this.emit("chart_mousemove", this.#cursorPos)

    this.updateLegends()
  }

  onChartDrag(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y), 
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ]
    this.emit("chart_pan", this.#cursorPos)

    // console.log("mouse drag start:", e.dragstart.x, e.dragstart.y)
    e.dragend.x = Math.floor(e.position.x)
    e.dragend.y = Math.floor(e.position.y)
    // console.log("mouse drag end:", e.dragend.x, e.dragend.y)
    // console.log("mouse dragging " + e.movement.x + ", " + e.movement.y);

  }

  onChartDragDone(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y), 
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ]
    this.emit("chart_panDone", this.#cursorPos)

    // console.log("mouse drag start:", e.dragstart.x, e.dragstart.y)
    e.dragend.x = Math.floor(e.position.x)
    e.dragend.y = Math.floor(e.position.y)
    // console.log("mouse drag end:", e.dragend.x, e.dragend.y)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()

    const api = this.#mediator.api
    this.#elWidgets = DOM.findBySelector(`#${api.id} .${CLASS_WIDGETS}`)
    this.#elViewport = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .viewport`)
    this.#elLegends = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .legends`)
    this.#elScale = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .${CLASS_SCALE}`)
  }

  props() {
    return {
      // id: (id) => this.setID(id),
      title: (title) => this.#title = title,
      yAxisDigits: (digits) => this.setYAxisDigits(digits),
      theme: (theme) => this.setTheme(theme)

    }
  }

  setWidth(w) {
    this.#width = w
  }

  setHeight(h) {
    this.#height = h
    this.parent
  }

  setState(s) {

  }

  getState() {
    return null
  }

  setDimensions(dimensions) {
    this.setWidth(dimensions.mainW)
    this.setHeight(dimensions.mainH)

    this.emit("resize", dimensions)
  }

  setTheme(theme) {
    this.#theme = theme
  }

  setYAxisDigits(digits) {
    this.#yAxisDigits = (isNumber(digits) && digits >= 3) ? parseInt(digits) : PRICEDIGITS
  }
  getPriceDigits() {
    return this.#yAxisDigits
  }

  defaultNode() {
    const api = this.#mediator.api
    const styleChart = STYLE_CHART + ` border-color: ${api.chartBorderColour};`
    const styleScale = STYLE_SCALE + ` width: ${api.scaleW - 1}px; border-color: ${api.chartBorderColour};`
    const styleLegend = `position: absolute; top: 0; left: 0; z-index:100;`
    
    const rowsH = DOM.findBySelector(`#${api.id} .${CLASS_ROWS}`).clientHeight
    const rowsW = DOM.findBySelector(`#${api.id} .${CLASS_ROWS}`).clientWidth - 1
    this.width = rowsW - api.scaleW
    this.height = rowsH - 1

    const node = `
      <div class="${CLASS_WIDGETS}"></div>
      <div class="viewport"></div>
      <div class="legends" style="${styleLegend}"></div>
      <div class="${CLASS_SCALE}" style="${styleScale}"></div>
    `
    return node
  }


// -----------------------

  setTimezone(timezone) {}
  getTimezone(timezone) {}
  // setChartStyle(chartStyle) {}
  // getChartStyle(chartStyle) {}
  // setChartTheme(chartTheme) {}
  // getChartTheme(chartTheme) {}

  loadData(data) {}
  updateData(data) {}

  createViewport() {
    // create viewport
    this.#viewport = new CEL.Viewport({
      width: this.width,
      height: this.height,
      container: this.#elViewport
    });

    // create layers - grid, volume, candles
    this.#layerGrid = new CEL.Layer();
    this.#layerVolume = new CEL.Layer();
    this.#layerCandles = new CEL.Layer();
    this.#layerCursor = new CEL.Layer();

    // add layers
    this.#viewport
          .addLayer(this.#layerGrid)
          .addLayer(this.#layerVolume)
          .addLayer(this.#layerCandles)
          .addLayer(this.#layerCursor)

    // add overlays
    this.#chartCursor = 
    new chartCursor(
      this.#layerCursor, 
      this,
      this.#Time, 
      this.#Scale, 
      this.#theme)

    this.#chartCandles = 
      new chartCandles(
        this.#layerCandles, 
        this.#Time, 
        this.#Scale, 
        this.#theme)

    this.#theme.maxVolumeH = this.#theme?.onchartVolumeH || VolumeStyle.ONCHART_VOLUME_HEIGHT
    this.#chartVolume =
      new chartVolume(
        this.#layerVolume, 
        this.#Time, 
        this.#Scale, 
        this.#theme)

    this.#chartGrid =
      new chartGrid(
        this.#layerGrid, 
        this.#Time, 
        this.#Scale, 
        this.#theme)
  }

  draw(range) {
    this.#chartGrid.draw()
    this.#chartVolume.draw(range)
    this.#chartCandles.draw(range)

    this.#viewport.render();
  }

  time2XPos(time) {
    return this.#Time.xPos(time)
  }

  price2YPos(price) {
    return this.#Scale.yPos(price)
  }

  /**
   * Set the price accuracy
   * @param pricePrecision - Price accuracy
   */
  setPriceVolumePrecision (pricePrecision) {
    if (!isNumber(pricePrecision) || pricePrecision < 0) {
      this.warning('setPriceVolumePrecision', 'pricePrecision', 'pricePrecision must be a number and greater than zero!!!')
      return
    }
    this.#pricePrecision = pricePrecision
  }

  /**
   * Set the volume accuracy
   * @param volumePrecision - Volume accuracy
   */
  setPriceVolumePrecision (volumePrecision) {
    if (!isNumber(volumePrecision) || volumePrecision < 0) {
      logWarn('setPriceVolumePrecision', 'volumePrecision', 'volumePrecision must be a number and greater than zero!!!')
      return
    }
    this.#volumePrecision = volumePrecision
  }

  updateLegends() {
    const legends = this.#Legends.list
    const ohlcv = this.#Time.xPosOHLCV(this.#cursorPos[0])
    const inputs = {}
          inputs.O = this.#Scale.nicePrice(ohlcv[1])
          inputs.H = this.#Scale.nicePrice(ohlcv[2])
          inputs.L = this.#Scale.nicePrice(ohlcv[3])
          inputs.C = this.#Scale.nicePrice(ohlcv[4])
          inputs.V = this.#Scale.nicePrice(ohlcv[5])

    for (const legend in legends) {
      this.#Legends.update(legend, {inputs: inputs})
    }
  }

  updateRange(pos) {

    // pan horizontal check
    const dist = Math.floor(pos[0] - pos[2])

    if (Math.abs(dist) < this.#Time.candleW) return

    const offset = Math.floor(dist / this.#Time.candleW)
    let start = this.range.indexStart - offset,
        end = this.range.indexEnd - offset;

    this.#range = getRange(this.#data, start, end)

    // draw the chart - grid, candles, volume
    this.draw(this.range)
  }

}
