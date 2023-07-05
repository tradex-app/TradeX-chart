// indicator.js
// Base class for on and off chart indicators

import Overlay from "./overlay"
import { Range } from "../../model/range"
import canvas from "../../renderer/canvas"
import { limit } from "../../utils/number"
import { isBoolean, isFunction, isObject, isString } from "../../utils/typeChecks"
import {
  STREAM_NEWVALUE,
  STREAM_UPDATE
} from "../../definitions/core"

// const plotTypes = {
//   area,
//   bar,
//   channel,
//   line,
// }

const T = 0, O = 1, H = 2, L = 3, C = 4, V = 5;

/**
 * Base class for on and off chart indicators
 * @export
 * @class indicator
 */
export default class Indicator extends Overlay {

  static #cnt = 0
  static get cnt() { return ++Indicator.#cnt }

  #ID
  #cnt_
  #name
  #shortName
  #primaryPane
  #scaleOverlay
  #plots
  #params
  #overlay
  #indicator
  #type
  #TALib
  #range
  #value = [0, 0]
  #newValueCB
  #updateValueCB
  #precision = 2
  #style = {}
  #legendID
  #status

  constructor (target, xAxis=false, yAxis=false, config, parent, params) {

    super(target, xAxis, yAxis, undefined, parent, params)

    this.#cnt_ = Overlay.cnt
    this.#params = params
    this.#overlay = params.overlay
    this.#type = config.type  // remove?
    this.#indicator = config.indicator
    this.#TALib = this.core.TALib
    this.#range = this.xAxis.range

    this.eventsListen()
  }

  get id() { return this.#ID || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#cnt_}`}
  set id(id) { this.#ID = String(id).replace(/ |,|;|:|\.|#/g, "_") }
  get name() { return this.#name }
  set name(n) { this.#name = n }
  get shortName() { return this.#shortName }
  set shortName(n) { this.#shortName = n }
  get chartPane() { return this.core.ChartPanes.get(this.chartPaneID) }
  get chartPaneID() { return this.#params.overlay.paneID }
  get primaryPane() { return this.#primaryPane }
  set primaryPane(c) { this.#primaryPane = c }
  get scaleOverlay() { return this.#scaleOverlay }
  set scaleOverlay(o) { this.#scaleOverlay = o }
  get plots() { return this.#plots }
  set plots(p) { this.#plots = p }
  get params() { return this.#params }
  get Timeline() { return this.core.Timeline }
  get scale() { return this.parent.scale }
  get type() { return this.#type }
  get overlay() { return this.#overlay }
  get legendID() { return this.#legendID }
  get indicator() { return this.#indicator }
  get TALib() { return this.#TALib }
  get range() { return this.core.range }
  set setNewValue(cb) { this.#newValueCB = cb }
  set setUpdateValue(cb) { this.#updateValueCB = cb }
  set precision(p) { this.#precision = p }
  get precision() { return this.#precision }
  set style(s) { this.#style = s }
  get style() { return this.#style }
  set position(p) { this.target.setPosition(p[0], p[1]) }

  /**
   * process candle value
   * data - [timestamp, open, high, low, close, volume]
   * @memberof indicator
   */
  set value(data) {
    // round time to nearest current time unit
    const tfms = this.core.time.timeFrameMS
    let roundedTime = Math.floor(new Date(data[T]) / tfms) * tfms
    data[T] = roundedTime

    if (this.#value[T] !== data[T]) {
      this.#value[T] = data[T]
      this.#newValueCB(data)
    }
    else {
      this.#updateValueCB(data)
    }
  }
  get value() {
    return this.#value
  }

  destroy() {
    if ( this.#status === "destroyed") return
    // has this been invoked from removeIndicator() ?
    const chartPane = this.core.ChartPanes.get(this.chartPaneID)
    if ( !chartPane.indicatorDeleteList[this.id] ) {
      this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeIndicator()" instead.`)
      return
    }

    // this.off(STREAM_NEWVALUE, this.onStreamNewValue)
    this.off(STREAM_UPDATE, this.onStreamUpdate)

    this.chart.legend.remove(this.#legendID)
    // TODO: remove state data
    this.#status = "destroyed"
  }

  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`)
    this.emit(`${this.chartPaneID}_removeIndicator`, {id: this.id, paneID: this.chartPaneID})
  }

  /**
   * set or get indicator visibility
   * @param {boolean} v - visible
   * @returns {boolean}
   */
  visible(v) {
    if (isBoolean(v)) {
      this.emit(`${this.chartPaneID}_visibleIndicator`, {id: this.id, paneID: this.chartPaneID, visible: v})
      this.chartPane.indicators[this.id].layer.visible = v
      this.draw()
    }
    return this.chartPane.indicators[this.id].layer.visible
  }

  /**
   * set or get indicator settings
   * @param {Object} s - settings
   */
  settings(s) {
    if (isObject(s)) {
      if (isObject(s?.config)) this.params.overlay.settings = 
       {...this.params.overlay.settings, ...s.config}
      if (isObject(s?.style)) this.style =
        {...this.style, ...s.style}
      this.draw()
    }
    return {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition,
    }
  }

  eventsListen() {
    // this.on(STREAM_NEWVALUE, this.onStreamNewValue, this)
    this.on(STREAM_UPDATE, this.onStreamUpdate, this)
  }

  on(topic, handler, context) {
    this.core.on(topic, handler, context)
  }

  off(topic, handler) {
    this.core.off(topic, handler)
  }

  emit(topic, data) {
    this.core.emit(topic, data)
  }

  onStreamNewValue(value) {
    // this.value = value
    // console.log("onStreamNewValue(value):",value)
  }

  /**
   * process new candle stream value
   * @param {Array} candle - [timestamp, open, high, low, close, volume]
   * @memberof Indicator
   */
  onStreamUpdate(candle) {
    // console.log("onStreamUpdate(candle):", candle)
    this.value = candle
  }

  /**
   * execute legend action
   * @param {Object} e - event
   * @memberof Chart
   */
  onLegendAction(e) {

    const action = this.chart.legend.onMouseClick(e.currentTarget)

    switch(action.icon) {
      case "up": return;
      case "down": return;
      case "visible": this.visible(!this.visible()); return;
      case "maximize": return;
      case "restore": return;
      case "remove": this.remove(); return;
      case "config": this.invokeSettings(); return;
      default: return;
    }
  }

  /**
   * invoke indicator settings callback, user defined or default
   * @param {Object} c - {fn: function, own: boolean}, own flag will bypass default action
   * @returns 
   */
  invokeSettings(c) {
    if (isFunction(c?.fn)) {
      let r = C.fn(this)
      if (c?.own) return r
    }
    else if (isFunction(this.core.config.callbacks?.indicatorSettings?.fn)) {
      let r = this.core.config.callbacks.indicatorSettings.fn(this)
      if (this.core.config.callbacks?.indicatorSettings?.own) return r
    }
    this.core.log(`invokeSettings: ${this.id}`)
  }

  /**
   * validate indicator inputs and outputs
   * @param {Object} i
   * @param {Object} api
   * @memberof indicator
   */
  defineIndicator(i, api) {
    if (!isObject(i)) i = {}

    this.definition.output = api.outputs
    const input = {...this.definition.input, ...i}
          delete input.style
    // process options
    for (let i of api.options) {
      // validate input values against definition defaults
      if (i.name in input) {
        // if input value is type is incorrect, use the default
        if (typeof input[i.name] !== i.type) {
          input[i.name] = i.defaultValue
          continue
        }
        else if ("range" in i) {
          input[i.name] = limit(input[i.name], i.range.min, i.range.max)
        }
      }
      // input.timePeriod required to eliminate garbage values on stream start
      else if (i.name == "timePeriod") 
        input.timePeriod = i.defaultValue
    }
    this.definition.input = input
  }

  addLegend() {
    let legend = {
      id: this.id,
      title: this.shortName,
      type: "indicator",
      parent: this,
      source: this.legendInputs.bind(this)
    }
    this.#legendID = this.chart.legend.add(legend)
  }

  /**
   * return index from cursor position and colours
   * @param {Array} [pos=this.chart.cursorPos]
   * @returns {Object}  
   * @memberof indicator
   */
  legendInputs(pos=this.chart.cursorPos) {
    const colours = [this.style.strokeStyle]

    let index = this.Timeline.xPos2Index(pos[0])

    let c = index  - (this.range.data.length - this.overlay.data.length)
    let l = limit(this.overlay.data.length - 1, 0, Infinity)
        c = limit(c, 0, l)

    return {c, colours}
  }

  indicatorInput(start, end) {
    let input = []
    do {
      input.push(this.range.value(start)[C])
    }
    while (start++ < end)
    return input
  }

  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1
      return {
        key: `${this.shortName}${num}`, 
        title: `${this.shortName}${num}: `, 
        type: 'line'
      }
    })
  }

  TALibParams() {
    let end = this.range.dataLength
    let step = this.definition.input.timePeriod
    let start = end - step //+ 1
    let input = this.indicatorInput(start, end)
    let hasNull = input.find(element => element === null)
    if (hasNull) return false
    else return { inReal: input, timePeriod: step }
  }

  /**
 * Calculate indicator values for entire chart history
 * @param {string} indicator - the TALib function to call
 * @param {Object} params - parameters for the TALib function
 * @param {Object} [range=this.range] - range instance or definition
 * @returns {boolean} - success or failure
 */
  calcIndicator (indicator, params={}, range=this.range) {
    if (!isString(indicator) ||
        !(indicator in this.TALib) ||
        !isObject(range) ||
        !this.core.TALibReady
        ) return false

        params.timePeriod = params.timePeriod || this.definition.input.timePeriod;
        let start, end;
        let p = params.timePeriod
    
        // is it a Range instance?
        if (range instanceof Range) {
          start = 0
          end = range.dataLength - p + 1
        }
        else if ( "indexStart" in range || "indexEnd" in range ||
                  "tsStart" in range ||  "tsEnd" in range ) {
          start = range.indexStart || this.Timeline.t2Index(range.tsStart || 0) || 0
          end = range.indexEnd || this.Timeline.t2Index(range.tsEnd) || this.range.Length - 1
          end - p
        }
        else return false
    
        // if not enough data for calculation fail
        if ( end - start < p ) return false
    
        let data = [];
        let i, v, entry;
    
    
        while (start < end) {
    
          params.inReal = this.indicatorInput(start, start + p)
          // let hasNull = params.inReal.find(element => element === null)
          // if (hasNull) return false
    
          entry = this.TALib[indicator](params)
    
          v = []
          i = 0
          for (let o of this.definition.output) {
            v[i++] = entry[o.name][0]
          }
          // store entry with timestamp
          data.push([this.range.value(start + p - 1)[0], v])
          start++
        }
        return data
  }

  /**
   * calculate back history if missing
   * @memberof indicator
   */
  calcIndicatorHistory () {
    const calc = () => {
      let data = this.calcIndicator(this.libName, this.definition.input, this.range);
      if (data) this.overlay.data = data;
    }
    if (this.core.TALibReady) calc()
    else  this.core.talibAwait.push(calc.bind(this))
  } 

  /**
   * Calculate indicator value for current stream candle
   * @param {string} indicator - the TALib function to call
   * @param {Object} params - parameters for the TALib function
   * @param {Object} range - Range instance
   * @returns {array} - indicator data entry
   */
  calcIndicatorStream (indicator, params, range=this.range) {
    if (!this.core.TALibReady ||
        !isString(indicator) ||
        !(indicator in this.TALib) ||
        !(range instanceof Range) ||
        range.dataLength < this.definition.input.timePeriod 
        ) return false

    let entry = this.TALib[indicator](params)
    let end = range.dataLength
    let time = range.value(end)[0]
    let v = []
    let i = 0

    for (let o of this.definition.output) {
      v[i++] = entry[o.name][0]
    }

    return [time, v]
  }

  /**
   * process stream and create new indicator data entry
   * @param {Array} value - current stream candle 
   * @memberof indicator
   */
  newValue (value) {
    let p = this.TALibParams()
    if (!p) return false

    let v = this.calcIndicatorStream(this.libName, p)
    if (!v) return false

    this.overlay.data.push(v)

    this.target.setPosition(this.core.scrollPos, 0)
    this.draw(this.range)
  }

  /**
   * process stream and update current (last) indicator data entry
   * @param {Array} value - current stream candle 
   * @memberof indicator
   */
  updateValue (value) {
    let l = this.overlay.data.length - 1
    let p = this.TALibParams()
    if (!p) return false

    let v = this.calcIndicatorStream(this.libName, p)
    if (!v) return false

    this.overlay.data[l] = [v[0], v[1]]

    this.target.setPosition(this.core.scrollPos, 0)
    this.draw(this.range)
  }

  /**
   * plot 
   *
   * @param {Array} plots - array of x y coords [{x:x, y:y}, ...]
   * @param {string} type
   * @param {Object} opts
   * @memberof indicator
   */
  plot(plots, type, opts ) {

    const ctx = this.scene.context
    const p = plots
    ctx.save();

    switch(type) {
      case "renderLine": canvas[type]( ctx, p, opts ); break;
      case "renderLineHorizontal": canvas[type]( ctx, p[0], p[1], p[2], opts ); break;
      case "renderLineVertical": canvas[type]( ctx, p[0], p[1], p[2], opts ); break;
      case "renderPathStroke": canvas[type]( ctx, p, opts.style, opts ); break;
      case "renderPathClosed": canvas[type]( ctx, p, opts ); break;
      case "renderSpline": canvas[type]( ctx, p, opts ); break;
      case "renderRect": canvas[type]( ctx, p[0], p[1], p[2], p[3], opts ); break;
      case "renderRectRound": canvas[type]( ctx, p[0], p[1], p[2], p[3], p[4], opts ); break;
      case "renderPolygonRegular": canvas[type]( ctx, p[0], p[1], p[2], p[3], p[4], opts ); break;
      case "renderPolygonIrregular": canvas[type]( ctx, p, opts ); break;
      case "renderTriangle": canvas[type]( ctx, p[0], p[1], p[2], opts); break;
      case "renderDiamond": canvas[type]( ctx, p[0], p[1], p[2], p[3], opts); break;
      case "renderCircle": canvas[type]( ctx, p[0], p[1], p[2], opts ); break;
      case "renderImage": canvas[type]( ctx, opts.src, p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7] )
    }

    ctx.restore();
  }

  draw() {

  }
}
