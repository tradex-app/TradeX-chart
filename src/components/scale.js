// scale.js
// Scale bar that lives on the side of the chart

import { isArray } from '../utils/typeChecks'
import DOM from "../utils/DOM"
import yAxis from "./axis/yAxis"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-scale"
import Input from '../input'
import { copyDeep, uid } from '../utils/utilities'
import { STREAM_UPDATE } from "../definitions/core"

import Graph from "./views/classes/graph"
import ScaleCursor from './overlays/scale-cursor'
import ScaleLabels from './overlays/scale-labels'
import ScaleOverly from './overlays/scale-overlays'
import ScalePriceLine from './overlays/scale-priceLine'

const defaultOverlays = [
  ["labels", {class: ScaleLabels, fixed: true, required: true}],
  ["overlay", {class: ScaleOverly, fixed: true, required: true}],
  ["price", {class: ScalePriceLine, fixed: true, required: true}],
  ["cursor", {class: ScaleCursor, fixed: true, required: true}],
]

/**
 * Provides the chart panes scale / yAxis
 * @export
 * @class ScaleBar
 */
export default class ScaleBar {

  #ID
  #name = "Y Scale Axis"
  #shortName = "scale"
  #core
  #options
  #parent
  #stateMachine

  #chart
  #target
  #yAxis
  #element
  #elViewport

  #viewport
  #layerLabels
  #layerOverlays
  #layerPriceLine
  #layerCursor
  #scaleOverlays = new Map()
  #Graph

  #input
  #priceLine
  #cursorPos

  constructor (core, options) {

    this.#core = core
    this.#options = {...options}
    this.#element = this.#options.elScale
    this.#chart = this.#options.chart
    this.#parent = this.#options.parent
    this.#ID = this.#options.offChartID || uid("TX_scale_")
    this.init()
  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warning(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get core() { return this.#core }
  get options() { return this.#options }
  get parent() { return this.#parent }
  set height(h) { this.setHeight(h) }
  get height() { return this.#element.getBoundingClientRect().height }
  get width() { return this.#element.getBoundingClientRect().width }
  get element() { return this.#element }
  get layerCursor() { return this.#layerCursor }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get layerPriceLine() { return this.#layerPriceLine }
  get yAxis() { return this.#yAxis }
  set yAxisType(t) { this.#yAxis.yAxisType = YAXIS_TYPES.includes(t) ? t : YAXIS_TYPES[0] }
  get yAxisType() { return this.#yAxis.yAxisType }
  get yAxisHeight() { return this.#yAxis.height }
  get yAxisRatio() { return this.#yAxis.yAxisRatio }
  get yAxisGrads() { return this.#yAxis.yAxisGrads }
  set graph(g) { this.#Graph = g }
  get graph() { return this.#Graph }
  get viewport() { return this.#viewport }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#element) }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  set scaleRange(r) { this.setScaleRange(r) }
  set rangeMode(m) { this.#yAxis.mode = m }
  get rangeMode() { return this.#yAxis.mode }
  set rangeYFactor(f) { this.core.range.yFactor(f) }
  set yOffset(o) { this.#yAxis.offset = o }
  get yOffset() { return this.#yAxis.offset }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }
  get Scale() { return this }

  init() {
    this.#elViewport = this.#element.viewport || this.#element
  }

  start() {
    const range = (this.#parent.name == "OffChart" ) ? 
      this.#parent.localRange : undefined
    this.#yAxis = new yAxis(this, this, this.options.yAxisType, range)

    // create and start overlays
    this.createGraph()

    // create and start on chart indicators
    this.addOverlays([])

    // draw the scale
    this.#yAxis.calcGradations()
    this.draw()

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    const newConfig = copyDeep(stateMachineConfig)
    newConfig.context = this
    this.stateMachine = newConfig
    this.stateMachine.start()
  }

  end() {
    this.stateMachine.destroy()
    this.#input = null
    this.#viewport.destroy()

    // this.#controller.removeEventListener("drag", this.onDrag);
    // this.#controller.removeEventListener("enddrag", this.onDragDone);

    this.off(`${this.#parent.ID}_mousemove`, this.onMouseMove)
    this.off(`${this.#parent.ID}_mouseout`, this.#layerCursor.erase)
    this.off(STREAM_UPDATE, this.onStreamUpdate)
  }

  eventsListen() {
    let canvas = this.#Graph.viewport.scene.canvas
    // create controller and use 'on' method to receive input events 
    this.#input = new Input(canvas, {disableContextMenu: false});
    this.#input.setCursor("ns-resize")
    // this.#controller.on("drag", this.onDrag.bind(this));
    // this.#controller.on("enddrag", this.onDragDone.bind(this));
    // this.#controller.on("mousewheel", this.onMouseWheel.bind(this))

    this.on(`${this.#parent.id}_mousemove`, this.onMouseMove.bind(this))
    this.on(`${this.#parent.id}_mouseout`, this.#layerCursor.erase.bind(this.#layerCursor))
    this.on(STREAM_UPDATE, this.#layerPriceLine.draw.bind(this.#layerPriceLine))

    // this.on(STREAM_UPDATE, (e) => { this.#layerPriceLine.draw(e) })
    // this.on("chart_pan", (e) => { this.drawCursorPrice() })
    // this.on("chart_panDone", (e) => { this.drawCursorPrice() })
    // this.on("resizeChart", (dimensions) => this.onResize.bind(this))
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

  onResize(dimensions) {
    this.setDimensions(dimensions)
  }

  onMouseMove(e) {
    this.#cursorPos = (isArray(e)) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)]
    this.#layerCursor.draw(this.#cursorPos)
  }

  onDrag(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y),
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ]
    const dragEvent = {
      scale: this,
      cursorPos: this.#cursorPos
    }
    this.emit("scale_drag", dragEvent)
  }

  onDragDone(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y),
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ]
    const dragEvent = {
      scale: this,
      cursorPos: this.#cursorPos
    }
    this.emit("scale_dragDone", dragEvent)
  }

  onMouseWheel(e) {
    e.domEvent.preventDefault()

    const direction = Math.sign(e.wheeldelta) * -1
    const range = this.range

    console.log(`Scale: mousewheel: ${direction}`)
  }

  onStreamUpdate(e) {

  }

  setHeight(h) {
    this.#element.style.height = `${h}px`
  }

  setDimensions(dim) {
    const width = this.#element.getBoundingClientRect().width
    this.#Graph.setSize(width, dim.h, width)

    this.setHeight(dim.h)
    this.draw()
  }

  setScaleRange(r) {
    if (this.#yAxis.mode == "automatic") this.#yAxis.mode = "manual"

    this.#yAxis.zoom = r
    this.parent.draw(this.range, true)
    this.draw()
  }

  setCursor(cursor) {
    this.#element.style.cursor = cursor
  }

  // convert chart price or offchart indicator y data to pixel pos
  yPos(yData) { return this.#yAxis.yPos(yData) }

  yPosStream(yData) { return this.#yAxis.lastYData2Pixel(yData) }

  // convert pixel pos to chart price
  yPos2Price(y) { return this.#yAxis.yPos2Price(y) }

  nicePrice($) {
    let digits = this.#yAxis.countDigits($)
    return this.#yAxis.limitPrecision(digits)
  }


  createGraph() {
    // let overlays = new Map(copyDeep(defaultOverlays))
    //     overlays = Array.from(overlays)
    let overlays = copyDeep(defaultOverlays)

    this.graph = new Graph(this, this.#elViewport, overlays, false)
    this.#layerCursor = this.graph.overlays.get("cursor").instance
    this.#layerLabels = this.graph.overlays.get("labels").instance
    this.#layerOverlays = this.graph.overlays.get("overlay").instance
    this.#layerPriceLine = this.graph.overlays.get("price").instance
  }

  /**
   * Add any non-default overlays
   *
   * @param {array} overlays
   * @memberof Scale
   */
  addOverlays(overlays) {
    for (let o of overlays) {
      // const config = {fixed: false, required: false}
      // if (o.type in this.core.TALib) {
      //   config.class = this.core.indicators[o.type].ind
      //   config.params = {overlay: o}
      //   this.#scaleOverlays.set(o.name, config)
      // }
    }
    this.graph.addOverlays(Array.from(this.#scaleOverlays))
  }

  render() {
    this.#Graph.render()
  }

  draw(range=this.range, update=true) {
    this.#Graph.draw(range, update)
    this.#parent.drawGrid()
  }

  resize(width=this.width, height=this.height) {
    // adjust parent element
    this.setDimensions({w: width, h: height})
  }

}
