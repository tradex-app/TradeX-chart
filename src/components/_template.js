// _template.js
// A template file for Chart components

import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-chart"
import { idSanitize } from "../utils/utilities"

export default class _template {

  #id
  #name = "Template"
  #shortName = "template"
  #core
  #options
  #parent
  #stateMachine

  #elTemplate

  #width
  #height

  constructor (core, options) {

    this.id = options?.id || "ID"
    this.#core = core
    this.#options = options
    this.#elTemplate = options.elements.elTemplate
    this.#parent = {...options.parent}
    this.init()
  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warn(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id }
  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get core() {return this.#core}
  get options() {return this.#options}
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }

  init() {
    this.mount(this.#elTemplate)

    // api - functions / methods, calculated properties provided by this module
    // const api = this.#core
    // api.parent = this.#mediator
    // api.elements = {}
  }

  start() {
    // Start the module's activities.
    // Play time!

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    // stateMachineConfig.id = this.id
    // stateMachineConfig.context = this
    // this.stateMachine = stateMachineConfig
    // this.stateMachine.start()
  }

  destroy() {
    this.#core.hub.expunge(this)
    // this.stateMachine.destroy()
  }


  eventsListen() {
    // listen/subscribe/watch for parent notifications
    this.on("resize", (dimensions) => this.onResize, this)
  }

  on(topic, handler, context=this) {
    this.#core.on(topic, handler, context)
  }

  off(topic, handler, context=this) {
    this.#core.off(topic, handler, context)
  }

  emit(topic, data) {
    this.#core.emit(topic, data)
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
