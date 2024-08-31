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
    if (this.#list.size == 0) return
    for (let k of this.#list.keys()) {
      this.removeOverlay(k)
    }
  }

  eventsListen() {
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
    const layer = new CEL.Layer(this.layerConfig)

    // try / catch in case user defined custom overlays (indicator) errors
    try {
      this.parent.viewport.addLayer(layer)
      overlay.layer = layer
      overlay.instance = new overlay.class(
        layer,
        this.#parent.Timeline,
        this.#parent.Scale,
        this.#core.theme,
        this,
        overlay?.params
      )
      if (!isString(overlay.instance?.id)) 
        overlay.instance.id = key

      this.#list.set(overlay.instance.id, overlay)
      return overlay
    }
    catch (e) {
      // clean up
      layer.remove()
      overlay.instance = undefined
      this.#list.delete(key)
      // report error
      this.#core.error(`ERROR: Cannot instantiate ${key} overlay / indicator : It will not be added to the chart.`)
      this.#core.error(e)
      return false
    }
  }

  removeOverlay(key) {
    if (this.#list.has(key)) {
      const o = this.#list.get(key)
      if (!o.instance?.isIndicator) 
        o.instance.destroy()
      o.layer.remove()
      this.#list.delete(key)
    }
  }

}
