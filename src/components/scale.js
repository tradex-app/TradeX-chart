// scale.js
// Scale bar that lives on the side of the chart

import DOM from "../utils/DOM"
import yAxis from "./axis/yAxis"
import CEL from "./primitives/canvas"

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
  #layerTicks
  #layerLabels
  #layerOverlays

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
  get layerTicks() { return this.#layerTicks }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get yAxisGrads() { return this.#yAxis.yAxisGrads }

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
  }

  end() {
    
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
    // this.#elScaleCanvas = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .${CLASS_SCALE} canvas`)
    // this.#elScaleCanvas.height = this.#parent.height
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

    // const node = `
    //   <canvas id="" width="${api.scaleW}" height=""></canvas>
    // `
    const node = `
      <div class="viewport"></div>
    `
    return node
  }

  // -----------------------

  yPos(dataY) { return this.#yAxis.yPos(dataY) }

  createViewport() {
    // create viewport
    this.#viewport = new CEL.Viewport({
      width: this.width,
      height: this.height,
      container: this.#elViewport
    });

    // create layers - ticks, labels, overlays
    this.#layerTicks = new CEL.Layer();
    this.#layerLabels = new CEL.Layer();
    this.#layerOverlays = new CEL.Layer();


    // add layers
    this.#viewport
          .addLayer(this.#layerTicks)
          .addLayer(this.#layerLabels)
          .addLayer(this.#layerOverlays);
  }

  draw() {
    this.#yAxis.draw()
    this.#viewport.render()
  }

}
