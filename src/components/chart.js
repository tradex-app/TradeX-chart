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
import indicator from "./overlays/inidcator"
import OnChart from "./overlays"
import stateMachineConfig from "../state/state-chart"
import { InputController, EventDispatcher, Keys } from '@jingwood/input-control'
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

const STYLE_CHART = "" // "position: absolute; top: 0; left: 0; border: 1px solid; border-top: none; border-bottom: none;"
const STYLE_SCALE = "position: absolute; top: 0; right: 0; border-left: 1px solid;"
export default class Chart {

  #name = "Chart"
  #shortName = "chart"
  #mediator
  #options
  #core
  #parent
  #elChart
  #elCanvas
  #elViewport
  #elLegends
  #elScale

  #Scale
  #Time
  #Legends
  #onChart

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
  #layersOnChart
  
  #chartGrid
  #chartVolume
  #chartIndicators
  #chartCandles
  #chartCursor

  #cursorPos = [0, 0]

  #settings
  #chartCandle
  #title
  #theme


  constructor (mediator, options) {

    this.#mediator = mediator
    this.#elChart = mediator.api.elements.elChart
    this.#parent = {...this.#mediator.api.parent}
    this.#core = this.#mediator.api.core
    this.#onChart = this.#mediator.api.onChart

    this.#settings = this.#mediator.api.settings
    this.#options = options
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
  get width() { return this.#elChart.clientWidth }
  set height(h) { this.setHeight(h) }
  get height() { return this.#elChart.clientHeight }
  set state(s) { this.#core.setState(s) }
  get state() { return this.#core.getState() }
  get data() { return this.#core.chartData }
  get range() { return this.#core.range }
  get onChart() { return this.#onChart }
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

    // Legends - to display indicator overlay Title, inputs and options
    let chartLegend = {
      id: "chart",
      title: this.#title,
      type: "chart"
    }
    this.#Legends = new Legends(this.#elLegends)
    this.#Legends.add(chartLegend)

    // api - functions / methods, calculated properties provided by this module
    const api = this.#mediator.api
    api.parent = this
    api.chart = this
    api.elements = 
    {...api.elements, 
      ...{
        // elWidgets: this.#elWidgets,
        elCanvas: this.#elCanvas,
        elScale: this.#elScale
      }
    }
    api.onChart = this.#mediator.api.onChart
    api.legends = this.#Legends

    // Y Axis - Price Scale
    options.yAxisType = "default"
    this.#Scale = this.#mediator.register("ScaleBar", ScaleBar, options, api)

    // onChart indicators
    // this.#onChart = this.#mediator.register("OnChart", OnChart, options, api)


    // set up layout responsiveness
    // let dimensions = {wdith: this.#width, height: this.#height}
    // this.emit("resizeChart", dimensions)


    this.log(`${this.#name} instantiated`)
  }


  start() {

    // X Axis - Timeline
    this.#Time = this.mediator.api.Timeline

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
    // keyboard input
    controller.on("keydown", e => { this.onChartKeyDown(e) })
    controller.on("keyup", e => { this.onChartKeyDown(e) })

    this.on("resizeChart", e => { console.log("resizing !!!");this.onResize(e) })

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
  }

  onChartDragDone(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y), 
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ]
    this.emit("chart_panDone", this.#cursorPos)
  }

  onChartKeyDown(e) {
    console.log(e)
    switch (e.keyCode) {
      case Keys.Left:
        console.log("keydown: cursor Left")
        break;
      case Keys.Right:
        console.log("keydown: cursor Right")
        break;
    }
  }

  onChartKeyUp(e) {
    console.log(e)
    switch (e.keyCode) {
      case Keys.Left:
        console.log("keyup: cursor Left")
        break;
      case Keys.Right:
        console.log("keyup: cursor Right")
        break;
    }
  }

  mount(el) {
    el.innerHTML = this.defaultNode()

    const api = this.#mediator.api
    // this.#elWidgets = DOM.findBySelector(`#${api.id} .${CLASS_WIDGETS}`)
    this.#elViewport = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .viewport`)
    this.#elLegends = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .legends`)
    this.#elScale = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .${CLASS_SCALE}`)
  }

  props() {
    return {
      // id: (id) => this.setID(id),
      title: (title) => this.#title = title,
      yAxisDigits: (digits) => this.setYAxisDigits(digits),
      theme: (theme) => this.setTheme(theme),
    }
  }

  setWidth(w) {
    this.#elChart.style.width = w
    this.#elViewport.style.width = w - this.#elScale.clientWidth
  }

  setHeight(h) {
    this.#elChart.style.height = h
    this.#elScale.style.height = h
    this.#Scale.setDimensions({w: null, h: h})
  }

  setDimensions(dim) {
    this.#viewport.setSize(dim.w - this.#elScale.clientWidth, dim.h)
    this.setWidth(dim.w)
    this.setHeight(dim.h)
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
    const rowsH = api.height - api.utilsW - api.timeH // api.elements.elRows.clientHeight
    const width = api.width - api.toolsW - api.scaleW
    const height = this.#options.chartH || rowsH - 1

    const styleChart = STYLE_CHART + ` width: ${width}px; height: ${height}px`
    const styleScale = STYLE_SCALE + ` width: ${api.scaleW - 1}px; height: ${height}px; border-color: ${api.chartBorderColour};`
    const styleLegend = `position: absolute; top: 0; left: 0; z-index:100;`

    const node = `
      <div class="viewport" style="${styleChart}"></div>
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
      width: this.#elViewport.clientWidth,
      height: this.#options.chartH || this.#parent.rowsH - 1,
      container: this.#elViewport
    });

    // create layers - grid, volume, candles
    this.#layerGrid = new CEL.Layer();
    this.#layerVolume = new CEL.Layer();
    this.#layersOnChart = this.layersOnChart()
    this.#layerCandles = new CEL.Layer();
    this.#layerCursor = new CEL.Layer();

    // add layers
    this.#viewport
          .addLayer(this.#layerGrid)
          .addLayer(this.#layerVolume)

    this.addLayersOnChart()

    this.#viewport
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

    // this.#chartIndicators = this.chartIndicators()

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

  layersOnChart() {
    let l = []

    for (let i = 0; i < this.#onChart.length; i++) {
      l[i] = new CEL.Layer()
    }
    return l
  }

  addLayersOnChart() {
    for (let i = 0; i < this.#layersOnChart.length; i++) {
      this.#viewport.addLayer(this.#layersOnChart[i])
    }
  }

  chartIndicators() {
    const indicators = []
    for (let i = 0; i < this.#layersOnChart.length; i++) {
      indicators[i] = 
        new indicator(
          this.#layersOnChart[i], 
          this.#Time,
          this.#Scale,
          this.config)
    } 
    return indicators
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

    // only updateRange when drag / pan event is generated by this component
    this.#core.updateRange(pos)

    // draw the chart - grid, candles, volume
    this.draw(this.range)
  }

}
