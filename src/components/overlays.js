// overlays.js
// A base class for overlays components to extend upon


import { insertAtIndex } from "../utils/utilities"
import CEL from "./primitives/canvas"



export default class Overlays {

  #core
  #config
  #parent

  #list

  #elOverlays

  constructor (parent, list=[]) {

    this.#parent = parent
    this.#core = parent.core
    this.#list = new Map(list)

    // iterate over List, create and add overlays
    for (const [key, overlay] of this.#list) {
      const layer = new CEL.Layer(this.layerConfig)
      parent.viewport.addLayer(layer)

      overlay.layer = layer
      overlay.instance = new overlay.class(
        layer,
        this.#parent.TimeLine,
        this.#parent.Scale,
        this.#core.theme,
        this
      )
      this.#list.set(key, overlay)
    }

  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warning(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  get parent() { return this.#parent }
  get layerConfig() { return this.#parent.layerConfig() }
  get list() { return this.#list }


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
    // this.#mediator.stateMachine.destroy()
    // Stop and clean up the module to prevent memory leaks.
    // It should remove: event listeners, timers, ect.
    // Put your toys away or it will end in tears.
  }


  eventsListen() {
    // listen/subscribe/watch for parent notifications
    this.#parent.on("resize", (dimensions) => this.onResize.bind(this))
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



}