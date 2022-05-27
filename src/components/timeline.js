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

export default class Timeline {

  #name = "Timeline"
  #shortName = "time"
  #mediator
  #options
  #elTime
  #parent
  #chart
  #xAxis

  #elViewport

  #width
  #height

  #viewport
  #layerLabels
  #layerOverlays
  #layerCursor

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elTime = mediator.api.elements.elTime
    this.#parent = mediator.api.parent
    this.#chart = this.#parent
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
  get width() { return this.#xAxis.width }
  get xAxisWidth() { return this.#xAxis.width }
  get xAxisRatio() { return this.#xAxis.xAxisRatio }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get xAxisGrads() { return this.#xAxis.xAxisGrads }

  init() {
    this.mount(this.#elTime)

    this.log(`${this.#name} instantiated`)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()

    const api = this.#mediator.api
    this.#elViewport = DOM.findBySelector(`#${api.id} .${CLASS_TIME} .viewport`)

  }

  defaultNode() {
    // const node = `
    //   <canvas width="" height="${this.mediator.api.timeH}"></canvas>
    // `
    const node = `
    <div class="viewport"></div>
  `
    return node
  }

  setWidth(w) {
    this.#width = w
  }

  setDimensions(dimensions) {
    this.setWidth(dimensions.mainW)
  }

  start() {
    this.emit("started")

    // prepare layered canvas
    this.createViewport()

    // draw the Timeline
    this.draw()

    // set up event listeners
    this.eventsListen()
  }

  end() {
    
  }

  eventsListen() {
    this.#chart.on("mousemove_chart", (e) => { this.drawCursorTime(e) })
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

  createViewport() {
    // create viewport
    this.#viewport = new CEL.Viewport({
      width: this.width,
      height: this.height,
      container: this.#elViewport
    });

    // create layers - labels, overlays, cursor
    this.#layerLabels = new CEL.Layer();
    this.#layerOverlays = new CEL.Layer();
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

    drawTextBG(ctx, dateTimeStr, xPos, 1 , options)

    ctx.restore()
    this.#viewport.render()
  }

}
