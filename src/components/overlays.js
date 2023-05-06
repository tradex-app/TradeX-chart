// overlays.js
// A base class for overlays components to extend upon


import { isString } from "../utils/typeChecks"
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
    this.#list = new Map([...list])

    // iterate over List, create and add overlays
    for (const [key, overlay] of this.#list) {
      this.addOverlay(key, overlay)
    }

  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warning(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  get core() { return this.#core }
  get parent() { return this.#parent }
  get layerConfig() { return this.#parent.layerConfig().layerConfig }
  get list() { return this.#list }
  get scale() { return this.#parent.parent.scale }
  get time() { return this.#parent.parent.time }

  start() {
    // Start the module's activities.
    // Play time!

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    // stateMachineConfig.context = this
    // this.#core.stateMachine = stateMachineConfig
    // this.#core.stateMachine.start()
  }

  end() {
    // this.#core.stateMachine.destroy()
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

  get(overlay) {
    return this.#list.get(overlay)
  }

  addOverlays(overlays) {
    let r = [];
    let s;
    for (let o of overlays) {
      s = this.addOverlay(o[0], o[1])
      r.push([o[0]], s)
    }
    return r
  }

  addOverlay(key, overlay) {
    // try / catch in case user defined custom overlays (indicator) error
    try {
      const layer = new CEL.Layer(this.layerConfig)
      this.parent.viewport.addLayer(layer)
  
      overlay.layer = layer
      overlay.instance = new overlay.class(
        layer,
        this.#parent.TimeLine,
        this.#parent.Scale,
        this.#core.theme,
        this,
        overlay.params
      )
      this.#list.set(key, overlay)
      return true
    }
    catch (e) {
      console.error(`Error: Cannot instantiate ${key} overlay / indicator`)
      console.error(e)
      return false
    }

  }

}