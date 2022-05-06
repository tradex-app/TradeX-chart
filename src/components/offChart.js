// offChart.js
// A base class for offChart components to extend upon

export default class OffChart {

  #name = "OffChart"
  #shortName = "offChart"
  #mediator
  #options
  #parent
  #elOffChart

  #width
  #height

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elOffChart = options.elements.elOffChart
    this.#parent = this.#mediator.api.parent
    this.init()
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  init() {
    this.mount(this.#elOffChart)

    // api - functions / methods, calculated properties provided by this module
    const api = this.#mediator.api
    api.parent = this
    api.elements = {}

    // listen/subscribe/watch for parent notifications
    this.#parent.on("resize", (dimensions) => this.onResize(dimensions))
  }

  start() {
    // Start the module's activities.
    // Play time!
  }

  end() {
    // Stop and clean up the module to prevent memory leaks.
    // It should remove: event listeners, timers, ect.
    // Put your toys away or it will end in tears.
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
  }

  setWidth(w) {
    this.#width = w
  }

  setHeight(h) {
    this.#height = h
  }

  setDimensions(dimensions) {
    this.setWidth(dimensions.mainW)
    this.setHeight(dimensions.mainH)
  }

  defaultNode() {
    const node = `

    `
    return node
  }

}