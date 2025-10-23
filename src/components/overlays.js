// overlays.js
// A base class for overlays components to extend upon


import { isObject, isString } from "../utils/typeChecks"
import { xMap } from "../utils/utilities"
import CEL from "./primitives/canvas"


export default class Overlays {

  #core
  #parent
  #chart
  #list

  constructor (parent, list=[]) {

    this.#parent = parent
    this.#chart = parent.chart
    this.#core = parent.core
    this.#list = new xMap([...list])
    this.addOverlays(list)
  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warn(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  get core() { return this.#core }
  get parent() { return this.#parent }
  get layerConfig() { return this.#parent?.layerConfig().layerConfig || {} }
  get list() { return this.#list }
  get scale() { return this.#parent.parent?.scale }
  get time() { return this.#parent.parent?.time }

  start() {
    // set up event listeners
    this.eventsListen()
  }

  destroy() {
    if (this.#list.size == 0) return
    for (let key of this.#list.keys()) {
      this.removeOverlay(key)
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

  // Add helper methods
  hasOverlay(key) {
    return this.#list.has(key)
  }

  getOverlayCount() {
    return this.#list.size
  }

  // Add validation
  validateOverlayConfig(overlay) {
    if (!overlay?.class) {
      throw new Error('Overlay configuration must include a class')
    }
    if (!overlay.class.isOverlay) {
      throw new Error('Overlay class must have isOverlay static property')
    }
    return true
  }

  addOverlays(overlays) {
    let result = [];
    let failed = []
    let key, obj;
    for (let o of overlays) {
      key = o[0]
      this.validateOverlayConfig(o[1])
      try {
        obj = this.addOverlay(o[0], o[1])
        key = obj.instance?.id || o[0]
        result.push([key, obj])
      } 
      catch (error) {
        failed.push({key, error})
      }
    }
    if (failed.length) 
      this.#core.error(`addOverlays() one or more overlays could not be added:`, failed)
    return result
  }

  /**
   * Instantiate overlay
   * @param {string} key - Overlay identifier
   * @param {object} overlay - Overlay configuration
   * @param {class} overlay.class - Overlay class constructor
   * @param {object} [overlay.params] - Parameters for overlay
   * @returns {object} Overlay descriptor with instance, layer, class, params
   * @throws {Error} If overlay is not valid or instantiation fails
   * @memberof Overlays
   */
  addOverlay(key, overlay) {
    const layer = new CEL.Layer(this.layerConfig)

    // try / catch in case user defined custom overlays (indicator) errors
    try {
      if (!overlay?.class?.isOverlay) 
        throw new Error(`${overlay} is not an Overlay or a derivative`)

      if (isObject(overlay?.params)) 
        overlay.params.chart = this.#chart
      else
        overlay.params = { chart: this.#chart }

      this.parent.viewport.addLayer(layer)
      overlay.layer = layer
      overlay.instance = new overlay.class(
        layer,
        this.#parent.Timeline,
        this.#parent.Scale,
        this.#core.theme,
        overlay?.parent || this,
        overlay?.params
      )
      if (!isString(overlay.instance?.id)) 
        overlay.instance.id = String(key)

      this.#list.set(overlay.instance.id, overlay)
      return overlay
    }
    catch (e) {
      // clean up
      layer.destroy()
      overlay.instance = undefined
      this.#list.delete(key)
      
      // report error
      let msg = `ERROR: Cannot instantiate ${key} overlay / indicator / tool : It will not be added to the chart.`
      this.#core.error(msg)
      this.#core.error(e)
      throw new Error(msg, {cause: e})
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
