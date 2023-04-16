// timeLine.js
// Timeline bar that lives at the bottom of the chart

import DOM from "../utils/DOM"
import xAxis from "./axis/xAxis"
import Input from "../input"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-time"
import { copyDeep, debounce, throttle } from "../utils/utilities"
import Slider from "./widgets/slider"
import { BUFFERSIZE } from "../definitions/chart"

import Graph from "./views/classes/graph"
import TimeLabels from "./overlays/time-labels"
import TimeOverlays from "./overlays/time-overlays"
import TimeCursor from "./overlays/time-cursor"

const defaultOverlays = [
  ["labels", {class: TimeLabels, fixed: false, required: true}],
  ["overlay", {class: TimeOverlays, fixed: false, required: true}],
  ["cursor", {class: TimeCursor, fixed: false, required: true}],
]


/**
 * Provides the timeline for the chart component
 * @export
 * @class Timeline
 */
export default class Timeline {

  #name = "Timeline"
  #shortName = "time"
  #options
  #element
  #core
  #chart
  #xAxis
  #stateMachine

  #elViewport
  #elNavigation

  #Graph
  #timeOverlays = new Map()
  #viewport
  #navigation
  #elNavList
  #elNavScrollBar
  #elNavScrollHandle
  #elRwdStart
  #elFwdEnd

  #layerLabels
  #layerOverlays
  #layerCursor

  #input
  #slider

  #icons = {
    width: 20,
    height: 20,
    fill: "#aaa"
  }

  constructor (core, options) {

    this.#core = core
    this.#options = options
    this.#element = options.elements.elTime
    this.#chart = core.Chart
    this.#xAxis = new xAxis(this, this.#chart)
    this.init()
  }
  
  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warning(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get options() { return this.#options }
  get core() { return this.#core }
  get element() { return this.#element }
  get elViewport() { return this.#elViewport }
  get height() { return this.#element.getBoundingClientRect().height }
  set width(w) { this.setWidth(w) }
  get width() { return this.#element.getBoundingClientRect().width }
  get xAxis() { return this.#xAxis }
  get xAxisWidth() { return this.#xAxis.width }
  get xAxisRatio() { return this.#xAxis.xAxisRatio }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get xAxisGrads() { return this.#xAxis.xAxisGrads }
  get candleW() { return this.#xAxis.candleW }
  get candlesOnLayer() { return this.#xAxis.candlesOnLayer }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get graph() { return this.#Graph }
  get viewport() { return this.#viewport }
  get navigation() { return this.#navigation }
  get range() { return this.#core.range }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#element) }
  get bufferPx() { return this.#core.bufferPx }
  get scrollPos() { return this.#core.scrollPos }
  get scrollOffsetPx() { return this.#core.scrollPos % this.candleW }
  get smoothScrollOffset() { return this.#core.smoothScrollOffset }
  get rangeScrollOffset() { return this.#core.rangeScrollOffset }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }
  get time() { return this }
 
  init() {
    const el = this.#element
    this.#elViewport = el.viewport
    this.#elNavigation = el.overview
    this.#elNavList = el.overview.icons
    this.#elNavScrollBar = el.overview.scrollBar
    this.#elNavScrollHandle = el.overview.handle
    this.#elRwdStart = el.overview.rwdStart
    this.#elFwdEnd = el.overview.fwdEnd

    // for (let i of this.#elNavList) {
    //   i.style.width = `${this.#icons.width}px`
    //   i.style.height = `${this.#icons.height}px`
    //   i.style.fill = `${this.#icons.fill}`
    // }

    const sliderCfg = {
      core: this.#core,
      elContainer: this.#elNavScrollBar,
      elHandle: this.#elNavScrollHandle,
      callback: null
    }
    this.#slider = new Slider(sliderCfg)
  }

  setWidth(w) {
    this.#element.style.width = `${w}px`
    this.#elViewport.style.width = `${w}px`
  }

  setDimensions(dim) {
    const buffer = this.config.buffer || BUFFERSIZE
    const width = dim.w
    const height = this.height
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01))

    this.#Graph.setSize(width, height, layerWidth)

    // this.setWidth(dim.w)
    this.draw()
  }

  start() {
    // prepare layered canvas
    // this.createViewport()

    // create and start overlays
    this.createGraph()

    // macro timeline scroll bar
    this.onSetRange()

    // draw the Timeline
    this.#xAxis.initXAxisGrads()
    this.draw()

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.context = this
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()
  }

  end() {
    this.stateMachine.destroy()
    this.#viewport.destroy()

    this.#input.off("dblclick", this.onDoubleClick)
    this.#input.off("pointerenter", this.onPointerEnter)
    this.#input.on("pointerdrag", this.onPointerDrag)
    this.#input = null
    this.off("main_mousemove", this.drawCursorTime)
    this.off("setRange", this.onSetRange)
    this.#elFwdEnd.removeEventListener('click', debounce)
    this.#elRwdStart.removeEventListener('click', debounce)
  }

  eventsListen() {
    let canvas = this.#Graph.viewport.scene.canvas

    this.#input = new Input(canvas, {disableContextMenu: false});
    this.#input.on("dblclick", this.onDoubleClick.bind(this))
    this.#input.on("pointerenter", this.onPointerEnter.bind(this))
    this.#input.on("pointerdrag", this.onPointerDrag.bind(this))
    // this.#input.on("pointerdrag", throttle(this.onPointerDrag, 100, this, true));

    this.on("main_mousemove", this.#layerCursor.draw.bind(this.#layerCursor))
    this.on("setRange", this.onSetRange.bind(this))

    this.#elFwdEnd.addEventListener('click', debounce(this.onMouseClick, 1000, this, true))
    this.#elRwdStart.addEventListener('click', debounce(this.onMouseClick, 1000, this, true))
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

  onMouseClick(e) {
    const id = e?.currentTarget?.id || e.target.parentElement.id
    switch (id) {
      case "fwdEnd":
        this.onFwdEnd()
        break
      case "rwdStart":
        this.onRwdStart()
        break
      default:
        break
    }
  }

  onPointerEnter(e) {
    e.domEvent.target.style.cursor = "ew-resize"
  }

  onPointerDrag(e) {
    let r = this.range
    let start = r.indexStart - e.movement.x
    let end = r.indexEnd
    r.set(start,end)
  }

  onDoubleClick(e) {
    this.core.jumpToEnd()
    this.core.MainPane.draw(undefined, true)
  }

  onFwdEnd() {
    this.core.jumpToEnd()
    this.core.MainPane.draw(undefined, true)
  }

  onRwdStart() {
    this.core.jumpToStart()
    this.core.MainPane.draw(undefined, true)
  }

  onSetRange() {
    let r = this.range
    let start = r.indexStart
    let end = r.indexEnd
    let scrollBarW = this.#elNavScrollBar.getBoundingClientRect().width
    let rangeW = r.dataLength + r.limitFuture + r.limitPast
    let ratio = scrollBarW / rangeW
    let handleW = r.Length * ratio
    let pos = ((start + r.limitPast) * ratio)

    this.#slider.setHandleDims(pos, handleW)
  }

  // -----------------------
  t2Index(ts) { return this.#xAxis.t2Index(ts) }

  xPos(time) { return this.#xAxis.xPos(time) }

  xPosSnap2CandlePos(x) { return this.#xAxis.xPosSnap2CandlePos(x) }

  xPos2Time(x) { return this.#xAxis.xPos2Time(x) }

  xPos2Index(x) { return this.#xAxis.xPos2Index(x) }

  xPosOHLCV(x) { return this.#xAxis.xPosOHLCV(x) }

  createGraph() {
    let overlays = copyDeep(defaultOverlays)

    this.#Graph = new Graph(this, this.#elViewport, overlays, false)
    this.#layerCursor = this.graph.overlays.get("cursor").instance
    this.#layerLabels = this.graph.overlays.get("labels").instance
    this.#layerOverlays = this.graph.overlays.get("overlay").instance
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
      //   this.#timeOverlays.set(o.name, config)
      // }
    }
    this.graph.addOverlays(Array.from(this.#timeOverlays))
  }

  render() {
    this.#Graph.render()
  }

  draw(range=this.range, update=true) {
    this.#Graph.draw(range, update)
  }

  hideCursorTime() {
    this.#layerCursor.visible = false
    this.render()
  }

  showCursorTime() {
    this.#layerCursor.visible = true
    this.render()
  }

}
