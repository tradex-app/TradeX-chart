// overlays.js
// A base class for overlays components to extend upon


import { isString } from "../utils/typeChecks"
import { xMap } from "../utils/utilities"
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
    this.#list = new xMap([...list])

    // iterate over List, create and add overlays
    for (const [key, overlay] of this.#list) {
      this.addOverlay(key, overlay)
    }

  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warn(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  get core() { return this.#core }
  get parent() { return this.#parent }
  get layerConfig() { return this.#parent.layerConfig().layerConfig }
  get list() { return this.#list }
  get scale() { return this.#parent.parent.scale }
  get time() { return this.#parent.parent.time }

  start() {
    // set up event listeners
    this.eventsListen()
  }

  destroy() {
    for (let k of this.#list.keys()) {
      this.removeOverlay(k)
    }
    this.#list = null
  }

  eventsListen() {
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
    let k, s;
    for (let o of overlays) {
      s = this.addOverlay(o[0], o[1])
      k = s.instance?.id || o[0]
      r.push([k, s])
    }
    return r
  }

  addOverlay(key, overlay) {
    // try / catch in case user defined custom overlays (indicator) errors
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
      if (!isString(overlay.instance?.id)) overlay.instance.id = key

      this.#list.set(overlay.instance.id, overlay)
      return true
    }
    catch (e) {
      console.error(`Error: Cannot instantiate ${key} overlay / indicator`)
      console.error(e)
      return false
    }
  }

  removeOverlay(key) {
    if (this.#list.has(key)) {
      this.#list.get(key).layer.remove()
      this.#list.delete(key)
    }
  }
}