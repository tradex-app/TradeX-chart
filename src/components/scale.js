// scale.js
// Scale bar that lives at the top of the chart
// Providing: timeframes, indicators, config, refresh, save, load

export default class ScaleBar {

  #name = "Y Scale Axis"
  #shortName = "scale"
  #mediator
  #options
  #core
  #target
  #elScale

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elScale = mediator.api.elements.elScale
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

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const api = this.#mediator.api

    const node = `
      <p>Scale Bar</p>
      <canvas id="" width="${api.scaleW}" height=""></canvas>
    `
    return node
  }

}
