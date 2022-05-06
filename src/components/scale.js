// scale.js
// Scale bar that lives on the side of the chart

import DOM from "../utils/DOM"
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
  #elScale
  #elScaleCanvas

  #width
  #height

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elScale = mediator.api.elements.elScale
    this.#parent = mediator.api.parent
    this.init()
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get mediator() {return this.#mediator}
  get options() {return this.#options}

  init() {
    this.mount(this.#elScale)

    this.#parent.on("resizeChart", (dimensions) => this.onResize(dimensions))

    this.log(`${this.#name} instantiated`)
  }


  start(data) {
    this.emit("started",data)
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
    this.#elScaleCanvas = DOM.findBySelector(`#${api.id} .${CLASS_CHART} .${CLASS_SCALE} canvas`)
    this.#elScaleCanvas.height = this.#parent.height
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
      <canvas id="" width="${api.scaleW}" height=""></canvas>
    `
    return node
  }

}
