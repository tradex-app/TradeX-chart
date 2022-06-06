// scale.js
// Scale bar that lives on the side of the chart

import DOM from "../utils/DOM"
import yAxis from "./axis/yAxis"
import CEL from "./primitives/canvas"
import { drawTextBG } from "../utils/canvas"
import stateMachineConfig from "../state/state-scale"
import { InputController, EventDispatcher } from '@jingwood/input-control'

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
import { YAxisStyle } from "../definitions/style";

export default class ScaleBar {

  #name = "Y Scale Axis"
  #shortName = "scale"
  #mediator
  #options
  #parent
  #core
  #target
  #yAxis
  #elScale
  #elScaleCanvas
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
    this.#elScale = mediator.api.elements.elScale
    this.#parent = mediator.api.parent
    this.#yAxis = new yAxis(this, this.#parent)
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
  set height(h) { this.setHeight(h) }
  get height() { return this.#yAxis.height }
  get width() { return this.#elScale.clientWidth }
  get yAxisHeight() { return this.#yAxis.height }
  get yAxisRatio() { return this.#yAxis.yAxisRatio }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get yAxisGrads() { return this.#yAxis.yAxisGrads }
  get viewport() { return this.#viewport }

  init() {
    this.mount(this.#elScale)

    this.#parent.on("resizeChart", (dimensions) => this.onResize(dimensions))

    this.log(`${this.#name} instantiated`)
  }


  start(data) {
    this.emit("started",data)

    // prepare layered canvas
    this.createViewport()
    // draw the scale
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

    this.#mediator.on("chart_mousemove", (e) => { this.drawCursorPrice(e) })
    this.#mediator.on("chart_pan", (e) => { this.drawCursorPrice(e) })
    this.#mediator.on("chart_panDone", (e) => { this.drawCursorPrice(e) })
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

  mount(el) {
    el.innerHTML = this.defaultNode()

    const api = this.#mediator.api
    this.#elViewport = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .${CLASS_SCALE} .viewport`)

  }

  setHeight(h) {
    this.#height = h
  }

  setDimensions(dimensions) {
    this.setHeight(dimensions.mainH)
  }

  defaultNode() {
    const api = this.#mediator.api
    const node = `
      <div class="viewport"></div>
    `
    return node
  }

  // -----------------------

  // convert chart price or offchart indicator y data to pixel pos
  yPos(yData) { return this.#yAxis.yPos(yData) }

  // convert pixel pos to chart price
  yPos2Price(y) { return this.#yAxis.yPos2Price(y) }

  nicePrice($) {
    let digits = this.#yAxis.countDigits($)
    return this.#yAxis.limitPrecision(digits)
  }

  // create canvas layers with handling methods
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
    this.#yAxis.draw()
    this.#viewport.render()
  }

  drawCursorPrice(e) {
    let [x, y] = e,
        price =  this.yPos2Price(y),
        nice = this.nicePrice(price),

        options = {
          fontSize: YAxisStyle.FONTSIZE * 1.05,
          fontWeight: YAxisStyle.FONTWEIGHT,
          fontFamily: YAxisStyle.FONTFAMILY,
          txtCol: YAxisStyle.COLOUR_CURSOR,
          bakCol: YAxisStyle.COLOUR_CURSOR_BG,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 3,
          paddingRight: 3
        },
        
        height = options.fontSize + options.paddingTop + options.paddingBottom,
        yPos = y - (height * 0.5);

    this.#layerCursor.scene.clear()
    const ctx = this.#layerCursor.scene.context
    ctx.save()

    ctx.fillStyle = options.bakCol
    ctx.fillRect(1, yPos, this.width, height)

    drawTextBG(ctx, `${nice}`, 1, yPos , options)

    ctx.restore()
    this.#viewport.render()
  }

}
