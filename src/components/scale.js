// scale.js
// Scale bar that lives on the side of the chart

import Component from "./component"
import { YAXIS_MINDIGITS, YAXIS_TYPE } from '../definitions/chart'
import { isArray, isNumber, isObject } from '../utils/typeChecks'
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
  #digitW = 12

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
  set yAxisType(t) { this.#yAxis.yAxisType = YAXIS_TYPE.valid(t) }
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
  get scale() { return this }
  get Scale() { return this }


  start() {
    const range = (this.options.yAxisType === YAXIS_TYPE.default) ? 
      undefined : this.parent.localRange
    const ctx = this.core.MainPane.graph.viewport.scene.context
    const t = this.theme.yAxis
    ctx.font = createFont(t.fontSize, t.fontWeight, t.fontFamily)
    this.#digitW = calcTextWidth(ctx, "0")

    this.#yAxis = new yAxis(this, this, this.options.yAxisType, range)

    this.#yAxis.yAxisPadding = 
        (isNumber(this.options?.yAxisPadding) &&
        this.options.yAxisPadding >= 1) ?
        this.options.yAxisPadding : 1

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
    this.on(STREAM_UPDATE, this.onStreamUpdate, this)
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
    let draw = false

    if (this.#yAxis.mode == "manual") {
      if (this.parent.isPrimary) {
        if (e[4] > this.range.max) {
          this.range.max = e[4]
          draw = true
        }
        if (e[4] < this.range.min) {
          this.range.max = e[4]
          draw = true
        }
      }
      // secondary pane
      else {
        let chart = this.parent
        let range = this.core.range
        let id = chart.view[0].id
        let mm = this.core.range.secondaryMaxMin[id].data
        if (!!mm) {
          let stream = range.value(undefined, id)
          stream.forEach((value, index, array) => {
            if (index == 0) return
            if (value > mm.max) mm.max = value
            else if (value < mm.min) mm.min = value
          });
          draw = true
        }
      }
    }

    if (draw) this.draw()
    else this.#layerPriceLine.draw()
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
    // const w = this.#element.getBoundingClientRect().width
    const w = this.width
    const h = this.parent.height
    this.setHeight(h)
    if (this.graph instanceof Graph) {
      this.graph.setSize(w, h, w)
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
    let count = YAXIS_MINDIGITS,
        nice = "0";
    if (this.core.range.dataLength > 0 &&
        this.#yAxis instanceof yAxis) {

      if (this.#chart.isPrimary) {
        nice = this.niceValue(this.range.valueMax)
      }
      else {
        for (let i in this.#chart.indicators) {
          let max = this.range.secondaryMaxMin?.[i]?.data?.max || YAXIS_MINDIGITS
          let maxStr = this.niceValue(max)
          if (maxStr.length > nice.length) nice = maxStr
        }
      }

     count = `${nice}`.length + 2 || YAXIS_MINDIGITS
    }
    this.#digitCnt = (count < YAXIS_MINDIGITS) ? YAXIS_MINDIGITS : count
    return this.#digitCnt
  }

  niceValue(v) {
    const step = this.#yAxis.niceNumber(v)
    let nice = limitPrecision(step, this.core.pricePrecision)
        nice = nice.match(/^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/)[1];
    return nice
  }

  calcScaleWidth() {
    const max = this.calcPriceDigits()
    return max * this.#digitW
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
    this.#yAxis.calcGradations()
    this.graph.draw(range, update)
    this.parent.drawGrid(update)
    this.parent.draw(range, true)
  }

  resize(width=this.width, height=this.height) {
    // adjust parent element
    this.setDimensions({w: width, h: height})
  }

}
