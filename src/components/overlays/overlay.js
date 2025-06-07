// overlay.js
// parent class for overlays to build upon

import xAxis from "../axis/xAxis"
import yAxis from "../axis/yAxis"
import canvas from "../../renderer/canvas-lib"
import Histogram from "../primitives/histogram"
import { renderHighLowRange } from "../primitives/range"


export default class Overlay {

  static isOverlay = true

  #parent
  #core
  #config = {}
  #state
  #range
  #theme

  // Axis and rendering
  #xAxis
  #yAxis
  #target
  #scene
  #hit

  // Data and parameters
  #params
  #data = []
  #histogram
  
  // Update tracking
  #mustUpdate = {
    valueMax: null,
    valueMin: null,
    indexStart: null,
    Length: null,
    rowsW: null,
    rowsH: null,
    refresh: true,
    resize: true
  }

  id

  /**
   * Creates an instance of Overlay.
   * @param {object} target - CEl Layer instance
   * @param {boolean} [xAxis=false]
   * @param {boolean} [yAxis=false]
   * @param {object} theme - 
   * @param {object} parent - overlay host / parent
   * @param {object} params - data to configure overlay
   * @memberof Overlay
   */
  constructor(target, xAxis=false, yAxis=false, theme, parent, params={}) {
    if (!target || !parent) {
      throw new Error('Target and parent are required parameters')
    }
    
    if (!parent.core) {
      throw new Error('Parent must have a core property')
    }

    this.#core = parent.core
    this.#parent = parent
    this.#config = parent.core.config
    this.#state = parent.core.state
    this.#range = parent.core.range
    this.#target = target
    this.#scene = target.scene
    this.#hit = target.hit
    // this.#theme = {...this.#core.theme, ...theme}
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#params = params
    this.on("global_resize", this.onResize, this)
  }

  destroy() {
    this.#core.hub.expunge(this)

    if ("overlay" in this.#params &&
        "data" in this.#params.overlay) {
          this.#params.overlay.data.length = 0
          delete this.#params.overlay.data
        }
  }

  get core() { return this.#core }
  get parent() { return this.#parent }
  get target() { return this.#target }
  get config() { return this.#config }
  get params() { return this.#params }
  get range() { return this.#range }
  get state() { return this.#state }
  get scene() { return this.#scene }
  get hit() { return this.#hit }
  get theme() { return this.#core.theme }
  get chart() { return this.#parent.parent.parent }
  get chartData() { return this.#config.state.allData.data }
  get xAxis() { return this.getXAxis() }
  get yAxis() { return this.getYAxis() }
  get overlay() { return this.#params.overlay }
  get overlayData() { return this.#params.overlay?.data || [] }
  get data() { return this.#params.overlay?.data || [] }
  get stateMachine() { return this.#core.stateMachine }
  get context() { return this.getContextType() }
  set position(p) { this.#target.setPosition(p[0], p[1]) }
  get isOverlay() { return Overlay.isOverlay }

  /**
   * Set a custom event listener
   * @param {string} topic
   * @param {function} handler
   * @param {*} context
   * @memberof Overlay
   */
  on(topic, handler, context=this) {
    this.#core.on(topic, handler, context);
  }

  /**
   * Remove a custom event listener
   * @param {string} topic
   * @param {function} handler
   * @memberof Overlay
   */
  off(topic, handler, context=this) {
    this.#core.off(topic, handler, context);
  }

  /**
   * Remove all custom event listeners
   * @param {*} context
   * @memberof Overlay
   */
  expunge(context=this) {
    this.#core.expunge(context);
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
    else if (this.core.Chart.time?.xAxis instanceof xAxis) return this.core.Chart.time.xAxis
    else if (this.#parent?.time?.xAxis instanceof xAxis) return this.#parent.time.xAxis
    else return false
  }

  getYAxis() {
    if (this.#yAxis instanceof yAxis) return this.#yAxis
    else if (this.chart?.yAxis instanceof yAxis) return this.chart.yAxis
    else if (this.#parent?.scale?.yAxis instanceof yAxis) return this.#parent.scale.yAxis
    else return false
  }

  getContextType() {
    if (!this.#xAxis && !this.#yAxis) return "chart"
    else if (this.getXAxis() instanceof xAxis) return "timeline"
    else if (this.getYAxis() instanceof yAxis) return "scale"
    else return false
  }

  /**
   * Does the indicator need to redraw (update)?
   * @returns {Boolean}
   */
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
    l.refresh = false
    l.resize = false
  }

  /**
   * plot 
   * @param {Array} plots - array of inputs, eg. x y coords [{x:x, y:y}, ...]
   * @param {string} type - the canvas drawing function to invoke
   * @param {Object} params - parameters to pass to the drawing function
   * @memberof Overlay
   */
    plot(plots, type, params ) {

      const ctx = this.scene.context
      const p = plots 
      const plotTypeFn = this.plotTypeFn(canvas, type, ctx, p, params)
    
      if (!plotTypeFn[type]) {
        this.core.warn(`Overlay: Unknown plot type: ${type}`)
        return
      }

      try {
        ctx.save();
        plotTypeFn[type]();
      } 
      catch (error) {
        this.core.error(`Overlay: Error plotting ${type}:`, error)
      }
      finally {
        ctx.restore();
      }
  
    }

    plotTypeFn(canvas, type, ctx, p, params) {
      return {
        createCanvas: () => { canvas[type](p[0], p[1]); },
        fillStroke: () => { canvas[type](ctx, p[0], p[1], p[2]); },
        renderLine: () => { canvas[type](ctx, p, params); },
        renderLineHorizontal: () => { canvas[type](ctx, p[0], p[1], p[2], params); },
        renderLineVertical: () => { canvas[type](ctx, p[0], p[1], p[2], params); },
        renderPath: () => { canvas[type](ctx, p, params.style, params); },
        renderPathStroke: () => { canvas[type](ctx, p, params.style); },
        renderPathClosed: () => { canvas[type](ctx, p, params.style, params); },
        renderSpline: () => { canvas[type](ctx, p, params); },
        renderRect: () => { canvas[type](ctx, p[0], p[1], p[2], p[3], params); },
        renderRectFill: () => { canvas[type](ctx, p[0], p[1], p[2], p[3], params); },
        renderRectStroke: () => { canvas[type](ctx, p[0], p[1], p[2], p[3], params); },
        renderRectRound: () => { canvas[type](ctx, p[0], p[1], p[2], p[3], p[4], params); },
        renderRectRoundFill: () => { canvas[type](ctx, p[0], p[1], p[2], p[3], p[4], params); },
        renderRectRoundStroke: () => { canvas[type](ctx, p[0], p[1], p[2], p[3], p[4], params); },
        renderPolygonRegular: () => { canvas[type](ctx, p[0], p[1], p[2], p[3], p[4], params); },
        renderPolygonIrregular: () => { canvas[type](ctx, p, params); },
        renderTriangle: () => { canvas[type](ctx, p[0], p[1], p[2], params); },
        renderDiamond: () => { canvas[type](ctx, p[0], p[1], p[2], p[3], params); },
        renderCircle: () => { canvas[type](ctx, p[0], p[1], p[2], params); },
        renderImage: () => { canvas[type](ctx, params.src, p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7]); },
        renderText: () => { canvas[type](ctx, p[0], p[1], params); },
        renderTextBG: () => { canvas[type](ctx, p[0], p[1], p[2], params); },
        histogram: () => { this.histogram(p, params); },
        highLowRange: () => { this.highLowRange(ctx, params); },
      };
    }

    /**
     * clear the overlay canvas
     */
    clear() {
      this.scene.clear()
    }

    histogram( p, params ) {
      if (!(this.#histogram instanceof Histogram))
        this.#histogram = new Histogram(this.scene, params)

      this.#histogram.draw(p)
    }

    highLowRange( ctx, p ) {
      let {high, low} = p
      let y1 = this.yAxis.yPos(high)
      let y2 = this.yAxis.yPos(low)
      let {width, height} = this.scene
      renderHighLowRange( ctx, y1, y2, width, height, p )
    }
}

