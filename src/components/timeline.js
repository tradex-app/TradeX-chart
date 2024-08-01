// timeLine.js
// Timeline bar that lives at the bottom of the chart

import Component from "./component"
import xAxis from "./axis/xAxis"
import Input from "../input"
import stateMachineConfig from "../state/state-time"
import { elementDimPos } from "../utils/DOM"
import { copyDeep, debounce, xMap } from "../utils/utilities"
import { isArray, isObject } from "../utils/typeChecks"
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
export default class Timeline extends Component {

  #name = "Timeline"
  #shortName = "time"
  #chart
  #xAxis
  #stateMachine

  #element
  #elViewport
  #elNavigation
  #elNavList
  #elNavScrollBar
  #elNavScrollHandle
  #elRwdStart
  #elFwdEnd

  #Graph
  #timeOverlays = new xMap()
  #additionalOverlays = []
  #navigation

  #layerLabels
  #layerOverlays
  #layerCursor

  #input
  #input2
  #input3
  #input4
  #slider

  #icons = {
    width: 20,
    height: 20,
    fill: "#aaa"
  }

  #jump = {end: false, start: false}

  constructor (core, options) {

    super(core, options)


    this.#element = options.elements.elTime
    this.#chart = core.Chart
    this.#xAxis = new xAxis(this)
    this.init()
  }

  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get element() { return this.#element }
  get elViewport() { return this.#elViewport }
  get height() { return this.#element.height }
  set width(w) { this.setWidth(w) }
  get width() { return this.#element.width }
  get xAxis() { return this.#xAxis }
  get xAxisWidth() { return this.#xAxis.width }
  get xAxisRatio() { return this.#xAxis.xAxisRatio }
  get layerCursor() { return this.#layerCursor }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get overlays() { return Object.fromEntries([...this.graph.overlays.list]) }
  get xAxisGrads() { return this.#xAxis.xAxisGrads }
  get candleW() { return this.#xAxis.candleW }
  get candlesOnLayer() { return this.#xAxis.candlesOnLayer }
  get navigation() { return this.#navigation }
  get pos() { return this.dimensions }
  get dimensions() { return elementDimPos(this.#element) }
  get bufferPx() { return this.core.bufferPx }
  get scrollPos() { return this.core.scrollPos }
  get scrollOffsetPx() { return this.core.scrollPos % this.candleW }
  get smoothScrollOffset() { return this.core.smoothScrollOffset }
  get rangeScrollOffset() { return this.core.rangeScrollOffset }
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
      core: this.core,
      elContainer: this.#elNavScrollBar,
      elHandle: this.#elNavScrollHandle,
      callback: null
    }
    this.#slider = new Slider(sliderCfg)
    if ( this.core.theme?.time?.navigation === false )
      this.navigationDisplay(false)
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

    this.graph.setSize(width, height, layerWidth)

    // this.setWidth(dim.w)
    this.draw()
  }

  navigationDisplay(visible) {
    if (visible) {
      // this.#elNavigation.style.display = "block"
      this.#elFwdEnd.style['margin-top'] = 0
      this.#elRwdStart.style['margin-top'] = 0
    }
    // enable start end icons on timeline
    else {
      const background = (this.core.theme.xAxis?.background) ?
        this.core.theme.xAxis.Background : this.core.theme.chart.Background

      // this.#elNavigation.style.display = "none"
      this.#elNavigation.style.visibility = "hidden"
      this.#elFwdEnd.style['margin-top'] = `${this.#elViewport.clientHeight * -1}px`
      this.#elRwdStart.style['margin-top'] = `${this.#elViewport.clientHeight * -1}px`
      this.#elFwdEnd.style.background = this.core.theme.chart.Background
      this.#elRwdStart.style.background = background
    }
  }

  start() {
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
    stateMachineConfig.id = this.id
    stateMachineConfig.context = this
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()

    this.log(`Timeline ${this.#name} instantiated and running`)
  }

  destroy() {
    this.stateMachine.destroy()
    this.#input.destroy()
    this.#input2.destroy()
    this.#input3.destroy()

    this.core.hub.expunge(this)
    this.off("main_mousemove", this.#layerCursor.draw, this.#layerCursor)
    
    this.#elFwdEnd.removeEventListener('click', debounce)
    this.#elRwdStart.removeEventListener('click', debounce)

    this.graph.destroy()
    this.element.remove()
  }

  eventsListen() {
    // let canvas = this.graph.viewport.scene.canvas

    this.#input = new Input(this.#elViewport, {disableContextMenu: false});
    this.#input.on("dblclick", this.onDoubleClick.bind(this))
    this.#input.on("pointerover", this.onPointerEnter.bind(this))
    this.#input.on("pointerout", this.onPointerLeave.bind(this))
    this.#input.on("pointerdrag", this.onPointerDrag.bind(this))
    // this.#input.on("pointerdrag", throttle(this.onPointerDrag, 100, this, true));

    this.#input2 = new Input(this.#elFwdEnd, {disableContextMenu: false});
    this.#input2.on("pointerover", () => this.showJump(this.#jump.end))
    this.#input2.on("pointerleave", () => this.hideJump(this.#jump.end))
    // this.#input2.on("click", () => debounce(this.onPointerClick, 1000, this, true))

    this.#input3 = new Input(this.#elRwdStart, {disableContextMenu: false});
    this.#input3.on("pointerover", () => this.showJump(this.#jump.start))
    this.#input3.on("pointerleave", () => this.hideJump(this.#jump.start))
    // this.#input3.on('click', () => debounce(this.onPointerClick, 1000, this, true))

    this.on("main_mousemove", this.#layerCursor.draw, this.#layerCursor)
    this.on("setRange", this.onSetRange, this)

    this.#elFwdEnd.addEventListener('click', debounce(this.onPointerClick, 1000, this, true))
    this.#elRwdStart.addEventListener('click', debounce(this.onPointerClick, 1000, this, true))
  }

  onPointerClick(e) {
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
    this.#elNavigation.style.visibility = "visible"
    this.hideCursorTime()
  }

  onPointerLeave(e) {
    if ( this.core.theme?.time?.navigation === false &&
         !(this.#jump.end && this.#jump.start)) {

      this.#elNavigation.style.visibility = "hidden"
    }
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

    this.graph = new Graph(this, this.#elViewport, overlays, false)
    this.#layerCursor = this.graph.overlays.get("cursor").instance
    this.#layerLabels = this.graph.overlays.get("labels").instance
    this.#layerOverlays = this.graph.overlays.get("overlay").instance

    this.graph.addOverlays(this.#additionalOverlays)
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
    else
      return this.graph.addOverlay(key, overlay)
  }

  render() {
    this.graph.render()
  }

  draw(range=this.range, update=true) {
    this.graph.draw(range, update)
  }

  hideCursorTime() {
    this.graph.overlays.list.get("cursor").layer.visible = false
    this.core.MainPane.draw()
  }

  showCursorTime() {
    this.graph.overlays.list.get("cursor").layer.visible = true
    this.core.MainPane.draw()
  }

  hideJump(j) {
    j = false
    if (this.core.theme?.time?.navigation === false)
      this.#elNavigation.style.visibility = "hidden"
  }

  showJump(j) {
    j = true
    this.#elNavigation.style.visibility = "visible"
    this.hideCursorTime()
  }

}
