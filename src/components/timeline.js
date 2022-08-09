// timeLine.js
// Time bar that lives at the bottom of the chart
// Providing: chart drawing Time

import DOM from "../utils/DOM"
import xAxis from "./axis/xAxis"
import CEL from "./primitives/canvas"
import { getTextRectWidth } from "../utils/canvas"
import { CLASS_TIME } from "../definitions/core"
import { XAxisStyle } from "../definitions/style"
import { drawTextBG } from "../utils/canvas"
import { InputController, } from "../input/controller"
import stateMachineConfig from "../state/state-time"

import {
  BUFFERSIZE,
} from "../definitions/chart"

export default class Timeline {

  #name = "Timeline"
  #shortName = "time"
  #mediator
  #options
  #elTime
  #core
  #parent
  #chart
  #xAxis

  #elViewport
  #elViewTotal

  #viewport
  #viewTotal
  #layerLabels
  #layerOverlays
  #layerCursor

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elTime = mediator.api.elements.elTime
    this.#parent = mediator.api.MainPane
    this.#chart = mediator.api.Chart
    this.#core = mediator.api.core
    this.#xAxis = new xAxis(this, this.#chart)
    this.init()
  }
  
  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get height() { return this.#elTime.clientHeight }
  set width(w) { this.setWidth(w) }
  get width() { return this.#elTime.clientWidth }
  get xAxis() { return this.#xAxis }
  get xAxisWidth() { return this.#xAxis.width }
  get xAxisRatio() { return this.#xAxis.xAxisRatio }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get xAxisGrads() { return this.#xAxis.xAxisGrads }
  get candleW() { return this.#xAxis.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get viewport() { return this.#viewport }
  get viewTotal() { return this.#viewTotal }
  get range() { return this.#core.range }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elTime) }
  get smoothScrollOffset() { return this.#core.smoothScrollOffset }

  init() {
    this.mount(this.#elTime)

    this.log(`${this.#name} instantiated`)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()

    const api = this.#mediator.api
    this.#elViewport = DOM.findBySelector(`#${api.id} .${CLASS_TIME} .viewport`)
    this.#elViewTotal = DOM.findBySelector(`#${api.id} .${CLASS_TIME} .viewTotal`)
  }

  defaultNode() {
    // const node = `
    //   <canvas width="" height="${this.mediator.api.timeH}"></canvas>
    // `
    const node = `
    <div class="viewport"></div>
    <div class="viewTotal"></div>
  `
    return node
  }

  setWidth(w) {
    this.#elTime.style.width = w
  }

  setDimensions(dim) {
    this.#viewport.setSize(dim.w, this.height)
    this.setWidth(dim.w)
  }

  start() {
    this.emit("started")

    // prepare layered canvas
    this.createViewport()
    // draw the Timeline
    this.draw()

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

    this.on("main_mousemove", (e) => { this.drawCursorTime(e) })
    this.on("chart_pan", (e) => { this.drawCursorTime(e) })
    this.on("chart_panDone", (e) => { this.drawCursorTime(e) })
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

  // -----------------------

  xPos(time) { return this.#xAxis.xPos(time) }

  xPosSnap2CandlePos(x) { return this.#xAxis.xPosSnap2CandlePos(x) }

  xPos2Time(x) { return this.#xAxis.xPos2Time(x) }

  xPos2Index(x) { return this.#xAxis.xPos2Index(x) }

  xPosOHLCV(x) { return this.#xAxis.xPosOHLCV(x) }

  createViewport() {

    const buffer = this.config.buffer || BUFFERSIZE
    const width = this.xAxisWidth
    const height = this.#elTime.clientHeight
    const layerConfig = { 
      width: width * ((100 + buffer) * 0.01), 
      height: height
    }

    // create viewport
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });

    // create layers - labels, overlays, cursor
    this.#layerLabels = new CEL.Layer(layerConfig);
    this.#layerOverlays = new CEL.Layer(layerConfig);
    this.#layerCursor = new CEL.Layer();

    // add layers
    this.#viewport
          .addLayer(this.#layerLabels)
          .addLayer(this.#layerOverlays)
          .addLayer(this.#layerCursor);
  }

  draw() {
    this.#xAxis.draw()
    this.#viewport.render()
  }

  drawCursorTime(e) {
    const ctx = this.#layerCursor.scene.context
    let [x, y] = e,
        timestamp = this.xPos2Time(x),
        date = new Date(timestamp),
        opts = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' },
        dateTimeStr = date.toLocaleDateString('en-GB', opts),

        options = {
          fontSize: XAxisStyle.FONTSIZE * 1.05,
          fontWeight: XAxisStyle.FONTWEIGHT,
          fontFamily: XAxisStyle.FONTFAMILY,
          txtCol: XAxisStyle.COLOUR_CURSOR,
          bakCol: XAxisStyle.COLOUR_CURSOR_BG,
          paddingTop: 5,
          paddingBottom: 3,
          paddingLeft: 4,
          paddingRight: 4
        },

        height = options.fontSize + options.paddingTop + options.paddingBottom,
        txtW = getTextRectWidth(ctx, dateTimeStr, options),
        xPos = this.#xAxis.xPosSnap2CandlePos(x) - (txtW * 0.5)

    this.#layerCursor.scene.clear()
    ctx.save()

    drawTextBG(ctx, dateTimeStr, xPos + this.smoothScrollOffset, 1 , options)

    ctx.restore()
    this.#viewport.render()
  }

}
