// graph.js
// class

import DOM from "../../../utils/DOM"
import { copyDeep, xMap } from '../../../utils/utilities'
import { isArray, isBoolean, isFunction, isNumber, isObject, isString } from '../../../utils/typeChecks'
import CEL from "../../primitives/canvas"
import Overlays from "../../overlays"

import grid from "../../overlays/chart-grid"
import cursor from "../../overlays/chart-cursor"
const defaultOverlays = [
  ["grid", {class: grid, fixed: true}],
  ["cursor", {class: cursor, fixed: true}]
]

import { BUFFERSIZE } from "../../../definitions/chart"

export default class graph {

  #core
  #config
  #theme
  #parent
  #viewport
  #overlays

  #elparent
  #elCanvas
  #elViewport

  #layerWidth


  constructor(parent, elViewport, overlays, node=false) {

    this.#parent = parent
    this.#core = parent.core
    this.#config = this.core.config
    this.#theme = this.core.theme
    this.#elparent = this.#parent.element
    this.#elViewport = elViewport
    
    // create graph viewport with overlays
    this.createViewport(overlays, node)
  }

  get parent() { return this.#parent }
  get core() { return this.#core }
  get config() { return this.#config }
  set width(w) { this.setWidth(w) }
  get width() { return this.#elparent.getBoundingClientRect().width }
  set height(h) { this.setHeight(h) }
  get height() { return this.#elparent.getBoundingClientRect().height }
  get dimensions() { return DOM.elementDimPos(this.#elparent) }
  set layerWidth(w) { this.#layerWidth = w }
  get layerWidth() { return this.#layerWidth }
  get stateMachine() { return this.#parent.stateMachine }
  set state(s) { this.#core.setState(s) }
  get state() { return this.#core.getState() }
  get data() { return this.#core.chartData }
  get range() { return this.#core.range }
  get stream() { return this.#core.stream }
  get TimeLine() { return this.#core.TimeLine }
  get xAxis() { return this.#core.TimeLine.xAxis }
  get Scale() { return this.#parent.Scale }
  get yAxis() { return this.#parent.Scale.yAxis }
  get viewport() { return this.#viewport }
  get overlays() { return this.#overlays }

  destroy() {
    this.#overlays.destroy()
    this.#viewport.destroy()
  }

  setSize(w, h, lw) {
    const oList = this.#overlays.list

    this.#viewport.setSize(w, h)

    for (let [key, overlay] of oList) {
      overlay.layer.setSize(lw, h)
    }
  }

  createViewport(overlays=[], node=false) {

    overlays = (overlays.length == 0) ? copyDeep(defaultOverlays) : overlays

    const {width, height} = this.layerConfig()

    let viewport = (node) ? CEL.Node : CEL.Viewport

    // create viewport
    this.#viewport = new viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });

    this.#elCanvas = this.#viewport.scene.canvas
    this.#overlays = new Overlays(this, overlays)
  }

  layerConfig() {
    const buffer = this.config?.buffer || BUFFERSIZE
    const width = this.#elViewport.getBoundingClientRect().width
    const height = this.#elViewport.getBoundingClientRect().height // this.#parent.height || this.#parent.rowsH - 1
    this.layerWidth = Math.round(width * ((100 + buffer) * 0.01))
    const layerConfig = { 
      width: this.layerWidth, 
      height: height
    }
    return {width, height, layerConfig}
  }

  /**
   * add an array of overlays to Graph
   * @param {array} o - array of overlays [[name, config], ...]
   * @returns array - array of overlay statuses [[name, boolean], ...]
   */
  addOverlays(o) {
    return this.#overlays.addOverlays(o)
  }

  /**
   * add a single overlay to Graph
   * @param {string} key - identifier
   * @param {object} overlay - {class, params}
   * @returns boolean
   */
  addOverlay(key, overlay) {
    return this.#overlays.addOverlay(key, overlay)
  }

  /**
   * remove overlay from Graph
   * @param {string} key - identifier
   * @returns boolean
   */
  removeOverlay(key) {
    return this.#overlays.removeOverlay(key)
  }

  /**
   * iterate over the list of overlays and draw them
   * @param {object} [range=this.range]
   * @param {boolean} [update=false] - force immediate render?
   * @memberof graph
   */
  draw(range=this.range, update=false) {
    const oList = this.#overlays.list
    // guard against overlays host (chart pane) deletion
    if (!(oList instanceof xMap)) return false

    for (let [key, overlay] of oList) {
      // is it a valid overlay?
      if (!isObject(overlay) || 
          !isFunction(overlay?.instance?.draw)) continue

      if (this.#core.scrollPos == this.#core.bufferPx * -1 || 
          this.#core.scrollPos == 0 || 
          update == true) 
      {
        overlay.instance.draw()
      }
      else if (this.#parent.streamCandle) {
        oList.get("stream").instance.draw()
      }

      if (!overlay.fixed)
        overlay.instance.position = [this.#core.scrollPos, 0]
    }
  }

  render() {
    this.#viewport.render()
  }

}