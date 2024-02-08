// scale.js
// Scale bar that lives on the side of the chart

import Component from "./component"
import { YAXIS_TYPES } from '../definitions/chart'
import { isArray, isObject } from '../utils/typeChecks'
import { elementDimPos } from "../utils/DOM"
import yAxis from "./axis/yAxis"
import stateMachineConfig from "../state/state-scale"
import Input from "../input"
import {limitPrecision } from '../utils/number'
import { copyDeep, xMap } from '../utils/utilities'
import { STREAM_UPDATE } from "../definitions/core"
import { calcTextWidth, createFont } from '../renderer/text'
import Graph from "./views/classes/graph"
import { ScaleCursor } from './overlays/chart-cursor'
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
export default class ScaleBar extends Component {

  #name = "Y Scale Axis"
  #shortName = "scale"

  #chart
  #target
  #yAxis
  #element
  #elViewport

  #layerLabels
  #layerOverlays
  #layerPriceLine
  #layerCursor
  #scaleOverlays = new xMap()
  #additionalOverlays = []
  #digitCnt

  #input
  #priceLine
  #cursorPos
  #position = {}

  constructor (core, options) {

    super(core, options)

    this.#element = this.options.elScale
    this.#chart = this.options.chart
    this.id = `${this.parent.id}_scale`
    this.#elViewport = this.#element.viewport || this.#element
  }

  get name() { return this.#name }
  get shortName() { return this.#shortName }
  set height(h) { this.setHeight(h) }
  get height() { return this.#element.getBoundingClientRect().height }
  get width() { return this.#element.getBoundingClientRect().width }
  get element() { return this.#element }
  set cursor(c) { this.#element.style.cursor = c }
  get cursor() { return this.#element.style.cursor }
  get layerCursor() { return this.#layerCursor }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get layerPriceLine() { return this.#layerPriceLine }
  get overlays() { return Object.fromEntries([...this.graph.overlays.list]) }
  get yAxis() { return this.#yAxis }
  set yAxisType(t) { this.#yAxis.yAxisType = YAXIS_TYPES.includes(t) ? t : YAXIS_TYPES[0] }
  get yAxisType() { return this.#yAxis.yAxisType }
  get yAxisHeight() { return this.#yAxis.height }
  get yAxisRatio() { return this.#yAxis.yAxisRatio }
  get yAxisGrads() { return this.#yAxis.yAxisGrads }
  get pos() { return this.dimensions }
  get dimensions() { return elementDimPos(this.#element) }
  get digitCnt() { return this.#digitCnt }
  set scaleRange(r) { this.setScaleRange(r) }
  get range() { return this.#yAxis.range }
  set rangeMode(m) { this.#yAxis.mode = m }
  get rangeMode() { return this.#yAxis.mode }
  set rangeYFactor(f) { this.core.range.yFactor(f) }
  set yOffset(o) { this.#yAxis.offset = o }
  get yOffset() { return this.#yAxis.offset }
  get Scale() { return this }

  start() {
    const range = (this.parent.name == "Chart" ) ? 
      undefined : this.parent.localRange
    this.#yAxis = new yAxis(this, this, this.options.yAxisType, range)

    this.createGraph()
    this.#yAxis.calcGradations()
    this.draw()
    this.eventsListen()

    // start State Machine 
    const newConfig = copyDeep(stateMachineConfig)
    newConfig.id = this.id
    newConfig.context = this
    this.stateMachine = newConfig
    this.stateMachine.start()
  }

  restart() {
    // TODO: remove old overlays
    // create and use new YAxis
    this.#yAxis.setRange(this.core.range)
    this.draw()
  }

  destroy() {
    this.core.hub.expunge(this)
    this.off(`${this.parent.id}_pointerout`, this.#layerCursor.erase, this.#layerCursor)
    this.off(STREAM_UPDATE, this.onStreamUpdate, this.#layerPriceLine)

    this.stateMachine.destroy()
    this.graph.destroy()
    this.#input.destroy()

    this.element.remove()
  }

  eventsListen() {
    let canvas = this.graph.viewport.scene.canvas
    this.#input = new Input(canvas, {disableContextMenu: false});
    this.#input.setCursor("ns-resize")
    // this.#input.on("pointerdrag", throttle(this.onDrag, 100, this, true));
    this.#input.on("pointerdrag", this.onDrag.bind(this));

    this.#input.on("pointerdragend", this.onDragDone.bind(this))
    this.#input.on("wheel", this.onMouseWheel.bind(this))
    this.#input.on("dblclick", this.resetScaleRange.bind(this))

    this.on(`${this.parent.id}_pointermove`, this.onMouseMove, this)
    this.on(`${this.parent.id}_pointerout`, this.#layerCursor.erase, this.#layerCursor)
    this.on(STREAM_UPDATE, this.#layerPriceLine.draw, this.#layerPriceLine)
    this.on(`setRange`, this.draw, this)
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
    this.setScaleRange(Math.sign(e.movement.y))
  }

  onDragDone(e) {
  }

  onMouseWheel(e) {
    e.domEvent.preventDefault()
    this.setScaleRange(Math.sign(e.wheeldelta) * -2)
  }

  onStreamUpdate(e) {

  }

  onChartDrag(e) {
    if (this.#yAxis.mode !== "manual") return
    this.#yAxis.offset = e.domEvent.srcEvent.movementY // this.core.MainPane.cursorPos[5] // e[5]
    this.draw()
  }

  setHeight(h) {
    this.#element.style.height = `${h}px`
  }

  setDimensions(dim) {
    const width = this.#element.getBoundingClientRect().width
    this.setHeight(dim.h)
    if (this.graph instanceof Graph) {
      this.graph.setSize(width, dim.h, width)
      this.draw()
    }
    if (this.#layerCursor instanceof ScaleCursor) 
      this.calcPriceDigits()
  }

  /**
   * Set price chart or off chart indicator to manual scaling and positioning
   * @param {number} r - scale adjustment value
   */
  setScaleRange(r=0) {
    if (this.#yAxis.mode == "automatic") this.#yAxis.mode = "manual"

    this.#yAxis.zoom = r
    this.draw(this.range, true)
    this.core.MainPane.draw()
  }

  /**
   * Set price chart or off chart indicator to automatic scaling and positioning
   */
  resetScaleRange() {
    this.#yAxis.mode = "automatic"
    this.draw(this.range, true)
    this.core.MainPane.draw()
  }

  /**
   * convert chart price or secondary indicator y data to pixel pos
   * @param {number} yData
   * @return {number}  
   * @memberof ScaleBar
   */
  yPos(yData) { return this.#yAxis.yPos(yData) }

  /**
   * convert last stream value to y pixel position relative top left (0,0)
   * @param {number} y - last stream value 
   * @returns {number} - y pixel position
   * @memberof ScaleBar
   */
  yPosStream(yData) { return this.#yAxis.lastYData2Pixel(y) }

  /**
   * convert pixel pos to chart price
   * @param {number} y
   * @return {number}  
   * @memberof ScaleBar
   */
  yPos2Price(y) { return this.#yAxis.yPos2Price(y) }

  /**
   * format price to a string to a specific decimal precision
   * @param {number} $ - typically a price
   * @param {number} p - precision limit, number of decimal places
   * @return {string}  
   * @memberof ScaleBar
   */
  nicePrice($, p) {
    return limitPrecision($, p)
  }


  createGraph() {
    let overlays = copyDeep(defaultOverlays)

    this.graph = new Graph(this, this.#elViewport, overlays, false)
    this.#layerCursor = this.graph.overlays.get("cursor").instance
    this.#layerLabels = this.graph.overlays.get("labels").instance
    this.#layerOverlays = this.graph.overlays.get("overlay").instance
    this.#layerPriceLine = this.graph.overlays.get("price").instance

    this.graph.addOverlays(this.#additionalOverlays)
    this.#layerPriceLine.target.moveTop()
    this.#layerCursor.target.moveTop()
    this.calcPriceDigits()
  }

  calcPriceDigits() {
    let count = 8;
    if (this.core.range.dataLength > 0 &&
        this.#yAxis instanceof yAxis) {
      const step = this.#yAxis.niceNumber(this.range.valueMax)
      const nice = limitPrecision(step, this.core.pricePrecision)
     count = `${nice}`.length + 2
    }
    this.#digitCnt = (count < 8) ? 8 : count
    return this.#digitCnt
  }

  calcScaleWidth() {
    const max = this.calcPriceDigits()
    const ctx = this.core.MainPane.graph.viewport.scene.context
    const t = this.theme.yAxis
    ctx.font = createFont(t.fontSize, t.fontWeight, t.fontFamily)
    const w = calcTextWidth(ctx, "0")
    return max * w
  }

  /**
   * Add any non-default overlays
   *
   * @param {Array} overlays
   * @memberof Scale
   */
  addOverlays(overlays) {
    if (!isArray(overlays)) return false
    if (this.graph === undefined)
      this.#additionalOverlays.push(...overlays)
    else
      this.graph.addOverlays(overlays)
  }

  addOverlay(key, overlay) {
    if (!isObject(overlay)) return false
    if (this.graph === undefined)
      this.#additionalOverlays.push([key, overlay])
    else {
      let o = this.graph.addOverlay(key, overlay)
      this.#layerPriceLine.target.moveTop()
      this.#layerCursor.target.moveTop()
      return o
    }
  }

  render() {
    this.graph.render()
  }

  draw(range=this.range, update=true) {
    this.graph.draw(range, update)
    this.parent.drawGrid(update)
    this.parent.draw(this.range, true)
  }

  resize(width=this.width, height=this.height) {
    // adjust parent element
    this.setDimensions({w: width, h: height})
  }

}
