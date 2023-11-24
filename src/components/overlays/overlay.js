// overlay.js
// parent class for overlays to build upon

import { isBoolean } from "../../utils/typeChecks"
import xAxis from "../axis/xAxis"
import yAxis from "../axis/yAxis"
import canvas from "../../renderer/canvas"


export default class Overlay {

  static isOverlay = true

  #parent
  #core
  #config = {}
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #hit
  #params
  #mustUpdate = {
    valueMax: null,
    valueMin: null,
    indexStart: null,
    Length: null,
    rowsW: null,
    rowsH: null,
    refresh: false,
    resize: false
  }

  id

  constructor(target, xAxis=false, yAxis=false, theme, parent, params={}) {

    this.#core = parent.core
    this.#parent = parent
    this.#config = parent.core.config
    this.#target = target
    this.#scene = target.scene
    this.#hit = target.hit
    this.#theme = theme
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#params = params

    // this.on("setRange", this.drawUpdate, this)
    // this.on("rowsResize", this.drawUpdate, this)
    // this.on("divider_pointerdrag", this.drawUpdate, this)
    // this.on("divider_pointerdragend", this.drawUpdate, this)
    this.on("global_resize", this.onResize, this)
  }

  get core() { return this.#core }
  get parent() { return this.#parent }
  get target() { return this.#target }
  get config() { return this.#config }
  get params() { return this.#params }
  get scene() { return this.#scene }
  get hit() { return this.#hit }
  get theme() { return this.#theme }
  get chart() { return this.#parent.parent.parent }
  get xAxis() { return this.getXAxis() }
  get yAxis() { return this.getYAxis() }
  get overlay() { return this.#params.overlay }
  get context() { return this.contextIs() }
  set position(p) { this.target.setPosition(p[0], p[1]) }

  destroy() {
    // this.off("setRange", this.drawUpdate, this)
    // this.off("rowsResize", this.drawUpdate, this)
    // this.off("divider_pointerdrag", this.drawUpdate, this)
    // this.off("divider_pointerdragend", this.drawUpdate, this)
    this.off("global_resize", this.onResize, this)
  }

  /**
   * Set a custom event listener
   * @param {string} topic
   * @param {function} handler
   * @param {*} context
   * @memberof Overlay
   */
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }

  /**
   * Remove a custom event listener
   * @param {string} topic
   * @param {function} handler
   * @memberof Overlay
   */
  off(topic, handler) {
    this.#core.off(topic, handler);
  }

  /**
   * Broadcast an event
   * @param {string} topic
   * @param {*} data
   * @memberof Overlay
   */
  emit(topic, data) {
    this.core.emit(topic, data)
  }

  onResize() {
    this.#mustUpdate.resize = true
  }

  setSize(w, h) {
    this.#target.setSize(w, h)
    this.#mustUpdate.refresh = true
  }

  setRefresh() {
    this.#mustUpdate.refresh = true
  }

  getXAxis() {
    if (this.#xAxis instanceof xAxis) return this.#xAxis
    else if (this.core.Chart.time.xAxis instanceof xAxis) return this.core.Chart.time.xAxis
    else if ("time" in this.#parent) return this.#parent.time.xAxis
    else return false
  }

  getYAxis() {
    if (this.#yAxis instanceof yAxis) return this.#yAxis
    else if (this.chart.yAxis instanceof yAxis) return this.chart.yAxis
    else if ("scale" in this.#parent) return this.#parent.scale.yAxis
    else return false
  }

  contextIs() {
    if (!this.#xAxis && !this.#yAxis) return "chart"
    else if (this.#xAxis instanceof xAxis) return "timeline"
    else if (this.#yAxis instanceof yAxis) return "scale"
    else return false
  }

  mustUpdate() {
    const r = this.#core.range
    const l = this.#mustUpdate
    const d = this.#core.MainPane.elRows
    return (
      // test range change
      l.valueMax !== r.valueMax ||
      l.valueMin !== r.valueMin ||
      l.indexStart !== r.indexStart ||
      l.Length !== r.Length ||
      l.refresh ||
      l.resize
    ) ? this.#mustUpdate : false
  }

  updated() {
    const r = this.#core.range
    const l = this.#mustUpdate
    const d = this.#core.MainPane.elRows
    l.valueMax = r.valueMax
    l.valueMin = r.valueMin
    l.indexStart = r.indexStart
    l.Length = r.Length
    l.rowsW = d.width
    l.rowsH = d.height
    l.rowsW = d.width
    l.rowsH = d.height
    l.refresh = false
    l.resize = false
  }

  /**
   * plot 
   *
   * @param {Array} plots - array of inputs, eg. x y coords [{x:x, y:y}, ...]
   * @param {string} type - the canvas drawing function to invoke
   * @param {Object} params - parameters to pass to the drawing function
   * @memberof Overlay
   */
    plot(plots, type, params ) {

      const ctx = this.scene.context
      const p = plots
      ctx.save();
  
      switch(type) {
        case "createCanvas": canvas[type]( p[0], p[1] ); break;
        case "fillStroke": canvas[type]( ctx, p[0], p[1], p[2] ); break;
        case "renderLine": canvas[type]( ctx, p, params ); break;
        case "renderLineHorizontal": canvas[type]( ctx, p[0], p[1], p[2], params ); break;
        case "renderLineVertical": canvas[type]( ctx, p[0], p[1], p[2], params ); break;
        case "renderPath": canvas[type]( ctx, p, params.style, params ); break;
        case "renderPathStroke": canvas[type]( ctx, p, params.style, params ); break;
        case "renderPathClosed": canvas[type]( ctx, p, params ); break;
        case "renderSpline": canvas[type]( ctx, p, params ); break;
        case "renderRect": canvas[type]( ctx, p[0], p[1], p[2], p[3], params ); break;
        case "renderRectFill": canvas[type]( ctx, p[0], p[1], p[2], p[3], params ); break;
        case "renderRectStroke": canvas[type]( ctx, p[0], p[1], p[2], p[3], params ); break;
        case "renderRectRound": canvas[type]( ctx, p[0], p[1], p[2], p[3], p[4], params ); break;
        case "renderRectRoundFill": canvas[type]( ctx, p[0], p[1], p[2], p[3], p[4], params ); break;
        case "renderRectRoundStroke": canvas[type]( ctx, p[0], p[1], p[2], p[3], p[4], params ); break;
        case "renderPolygonRegular": canvas[type]( ctx, p[0], p[1], p[2], p[3], p[4], params ); break;
        case "renderPolygonIrregular": canvas[type]( ctx, p, params ); break;
        case "renderTriangle": canvas[type]( ctx, p[0], p[1], p[2], params); break;
        case "renderDiamond": canvas[type]( ctx, p[0], p[1], p[2], p[3], params); break;
        case "renderCircle": canvas[type]( ctx, p[0], p[1], p[2], params ); break;
        case "renderImage": canvas[type]( ctx, params.src, p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7] )
        case "renderText": canvas[type]( ctx, p[0], p[1], params ); break;
        case "renderTextBG": canvas[type]( ctx, p[0], p[1], p[2], params ); break;
      }
  
      ctx.restore();
    }
}
