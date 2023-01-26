// timeLine.js
// Time bar that lives at the bottom of the chart
// Providing: chart drawing Time

import DOM from "../utils/DOM"
import xAxis from "./axis/xAxis"
import CEL from "./primitives/canvas"
import { CLASS_TIME } from "../definitions/core"
import { XAxisStyle } from "../definitions/style"
import { InputController } from "../input/controller"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-time"
import { fwdEnd, rwdStart } from "../definitions/icons"
import Colour from "../utils/colour"
import { drawTextBG, getTextRectWidth } from "../utils/canvas"
import { bRound } from "../utils/number"
import { debounce } from "../utils/utilities"
import Slider from "./widgets/slider"


import {
  BUFFERSIZE,
} from "../definitions/chart"

export default class Timeline {

  #name = "Timeline"
  #shortName = "time"
  #options
  #elTime
  #core
  #chart
  #xAxis
  #stateMachine

  #elViewport
  #elNavigation

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

  #controller
  #slider

  #icons = {
    width: 20,
    height: 20,
    fill: "#aaa"
  }

  constructor (core, options) {

    this.#core = core
    this.#options = options
    this.#elTime = options.elements.elTime
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
  get element() { return this.#elTime }
  get height() { return this.#elTime.getBoundingClientRect().height }
  set width(w) { this.setWidth(w) }
  get width() { return this.#elTime.getBoundingClientRect().width }
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
  get viewport() { return this.#viewport }
  get navigation() { return this.#navigation }
  get range() { return this.#core.range }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elTime) }
  get bufferPx() { return this.#core.bufferPx }
  get scrollPos() { return this.#core.scrollPos }
  get scrollOffsetPx() { return this.#core.scrollPos % this.candleW }
  get smoothScrollOffset() { return this.#core.smoothScrollOffset }
  get rangeScrollOffset() { return this.#core.rangeScrollOffset }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }

 
  init() {
    this.mount(this.#elTime)

    this.log(`${this.#name} instantiated`)
  }

  mount(el) {
    const api = this.#core
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
    this.#elTime.style.width = `${w}px`
    this.#elViewport.style.width = `${w}px`
  }

  setDimensions(dim) {
    const buffer = this.config.buffer || BUFFERSIZE
    const width = dim.w
    const height = this.height
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01))

    this.#viewport.setSize(width, this.height)
    this.#layerLabels.setSize(layerWidth, height)
    this.#layerOverlays.setSize(layerWidth, height)
    this.#layerCursor.setSize(layerWidth, height)

    // this.setWidth(dim.w)
    this.draw()
  }

  start() {
    // prepare layered canvas
    this.createViewport()

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
    this.#controller = null
    this.off("main_mousemove", this.drawCursorTime)
    this.off("setRange", this.onSetRange)

    this.#elFwdEnd.removeEventListener('click', debounce)
    this.#elRwdStart.removeEventListener('click', debounce)
  }

  eventsListen() {
    let canvas = this.#viewport.scene.canvas
    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(canvas, {disableContextMenu: false});

    this.on("main_mousemove", this.drawCursorTime.bind(this))
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

  onFwdEnd() {
    this.core.jumpToEnd()
  }

  onRwdStart() {
    this.core.jumpToStart()
  }

  onSetRange() {
    let start = this.range.indexStart
    let end = this.range.indexEnd
    let scrollBarW = this.#elNavScrollBar.getBoundingClientRect().width
    let rangeW = this.range.dataLength + this.range.limitFuture + this.range.limitPast
    let ratio = scrollBarW / rangeW
    let handleW = this.range.Length * ratio
    let pos = ((start + this.range.limitPast) * ratio)

    this.#slider.setHandleDims(pos, handleW)
  }

  // -----------------------

  xPos(time) { return this.#xAxis.xPos(time) }

  xPosSnap2CandlePos(x) { return this.#xAxis.xPosSnap2CandlePos(x) }

  xPos2Time(x) { return this.#xAxis.xPos2Time(x) }

  xPos2Index(x) { return this.#xAxis.xPos2Index(x) }

  xPosOHLCV(x) { return this.#xAxis.xPosOHLCV(x) }

  createViewport() {

    const buffer = this.config.buffer || BUFFERSIZE
    const width = this.xAxisWidth
    const height = this.#elTime.getBoundingClientRect().height
    const layerConfig = { 
      width: Math.round(width * ((100 + buffer) * 0.01)), 
      height: height
    }

    // create viewport
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height / 2,
      container: this.#elViewport
    });

    // create layers - labels, overlays, cursor
    this.#layerLabels = new CEL.Layer(layerConfig);
    this.#layerOverlays = new CEL.Layer(layerConfig);
    this.#layerCursor = new CEL.Layer(layerConfig);

    // add layers
    this.#viewport
          .addLayer(this.#layerLabels)
          .addLayer(this.#layerOverlays)
          .addLayer(this.#layerCursor);
  }

  render() {
    this.#viewport.render()
  }

  draw() {
    this.#layerCursor.setPosition(this.scrollPos, 0)
    this.#layerLabels.setPosition(this.scrollPos, 0)
    this.#layerOverlays.setPosition(this.scrollPos, 0)
    this.drawGrads()
    this.drawOverlays()
    this.drawCursorTime()
  }

  drawCursorTime() {
    const ctx = this.#layerCursor.scene.context
    const rect = this.#elViewport.getBoundingClientRect()
    const x = this.#core.mousePos.x - rect.left
    let timestamp = this.xPos2Time(x),
        date = new Date(timestamp),
        opts = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' },
        dateTimeStr = date.toUTCString(),
        options = {
          fontSize: this.theme.xAxis.fontSize * 1.05,
          fontWeight: this.theme.xAxis.fontWeight,
          fontFamily: this.theme.xAxis.fontFamily,
          txtCol: this.theme.xAxis.colourCursor,
          bakCol: this.theme.xAxis.colourCursorBG,
          paddingTop: 5,
          paddingBottom: 3,
          paddingLeft: 4,
          paddingRight: 4
        },
        txtW = getTextRectWidth(ctx, dateTimeStr, options),
        xPos = x + this.bufferPx;
        xPos = this.#xAxis.xPosSnap2CandlePos(xPos)
        xPos = xPos - Math.round(txtW * 0.5) - this.scrollPos - this.bufferPx

    this.#layerCursor.scene.clear()
    ctx.save()

    drawTextBG(ctx, dateTimeStr, xPos, 1 , options)

    ctx.restore()
    this.#viewport.render()
  }

  hideCursorTime() {
    this.#layerCursor.visible = false
    this.#viewport.render()
  }

  showCursorTime() {
    this.#layerCursor.visible = true
    this.#viewport.render()
  }

  drawGrads() {
    this.#layerLabels.scene.clear()
    this.#xAxis.doCalcXAxisGrads()
    
    const grads = this.#xAxis.xAxisGrads.values
    const ctx = this.#layerLabels.scene.context
    const offset = 0
    const theme = this.theme.xAxis

    ctx.save();
    ctx.strokeStyle = theme.colourTick
    ctx.fillStyle = theme.colourTick
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`
    for (let tick of grads) { 
      let x = bRound(tick[1])
      // ctx.font = (tick[3] == "major") ? XAxisStyle.FONT_LABEL_BOLD : XAxisStyle.FONT_LABEL
      let w = Math.floor(ctx.measureText(`${tick[0]}`).width * 0.5)
      ctx.fillText(tick[0], x - w + offset, this.#xAxis.xAxisTicks + 12)

      ctx.beginPath()
      ctx.moveTo(x + offset, 0)
      ctx.lineTo(x + offset, this.#xAxis.xAxisTicks)
      ctx.stroke()
    }
    ctx.restore();
  }

  drawOverlays() {
    this.#layerOverlays.scene.clear()

    const grads = this.#xAxis.xAxisGrads.values
    const ctx = this.#layerOverlays.scene.context
    ctx.save();

// draw overlays

    ctx.restore();
  }

}
