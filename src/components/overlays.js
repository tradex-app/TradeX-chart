// overlays.js
// A base class for overlays components to extend upon

import stateMachineConfig from "../state/state-chart"

export default class Overlays {

  #name = "Overlays"
  #shortName = "overlays"
  #mediator
  #options
  #parent

  #elOverlays

  #width
  #height

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elOverlays = this.#mediator.api.elOverlays
    this.#parent = this.#mediator.api.parent
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
    this.mount(this.#elOverlays)

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

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    // stateMachineConfig.context.origin = this
    // this.#mediator.stateMachine = stateMachineConfig
    // this.#mediator.stateMachine.start()
  }

  end() {
    // Stop and clean up the module to prevent memory leaks.
    // It should remove: event listeners, timers, ect.
    // Put your toys away or it will end in tears.
  }


  eventsListen() {
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