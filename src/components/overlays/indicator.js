// indicator.js
// Base class for on and off chart indicators

import Overlay from "./overlay"
import { Range } from "../../model/range"
import { limit } from "../../utils/number"
import { isArray, isBoolean, isFunction, isObject, isString } from "../../utils/typeChecks"
import { idSanitize } from "../../utils/utilities"
import { STREAM_UPDATE } from "../../definitions/core"
import { OHLCV } from "../../definitions/chart"

// const plotTypes = {
//   area,
//   bar,
//   channel,
//   line,
// }

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
  #chartPane
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
  #drawOnUpdate = false

  constructor (target, xAxis=false, yAxis=false, config, parent, params) {

    super(target, xAxis, yAxis, undefined, parent, params)

    this.#cnt_ = Overlay.cnt
    this.#params = params
    this.#overlay = params.overlay
    this.#TALib = this.core.TALib
    this.#range = this.xAxis.range

    this.eventsListen()
  }

  get id() { return this.#ID || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#cnt_}`}
  set id(id) { this.#ID = idSanitize(id) }
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
  get isIndicator() { return true }
  get status() { return this.#status }
  get drawOnUpdate() { return this.#drawOnUpdate }
  set drawOnUpdate(u) { if (u === true) this.#drawOnUpdate = true }

  /**
   * process candle value
   * data - [timestamp, open, high, low, close, volume]
   * @memberof indicator
   */
  set value(data) {
    // round time to nearest current time unit
    const tfms = this.core.time.timeFrameMS
    let roundedTime = Math.floor(new Date(data[OHLCV.t]) / tfms) * tfms
    data[OHLCV.t] = roundedTime

    if (this.#value[OHLCV.t] !== data[OHLCV.t]) {
      this.#value[OHLCV.t] = data[OHLCV.t]
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
    // const chartPane = this.core.ChartPanes.get(this.chartPaneID)
    if ( !this.chartPane.indicatorDeleteList[this.id] ) {
      this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "indicator.remove()" or "chart.removeIndicator()" instead.`)
      return
    }
    // terminate listeners
    this.core.hub.expunge(this)

    // remove overlay from parent chart pane's graph
    this.chart.legend.remove(this.#legendID)
    this.chartPane.graph.removeOverlay(this.id)

    // execute parent class
    // delete data
    // remove listeners
    super.destroy()
    // remove indicator state data
    this.core.state.removeIndicator(this.id)

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
    this.on(STREAM_UPDATE, this.onStreamUpdate, this)
  }

  on(topic, handler, context=this) {
    this.core.on(topic, handler, context)
  }

  off(topic, handler, context=this) {
    this.core.off(topic, handler, context)
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
      case "visible": this.onVisibility(action); return;
      case "notVisible": this.onVisibility(action); return;
      case "remove": this.remove(); return;
      case "config": this.invokeSettings(); return;
      default: return;
    }
  }

  /**
   * toggle indicator visibility
   * @param {Object} action - 
   */
  onVisibility(action) {
    this.visible(!this.visible())
    action.parent.classList.toggle("visible")
    action.parent.classList.toggle("notvisible")
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
    const colours = [this.style.stroke]

    let index = this.Timeline.xPos2Index(pos[0])

    let c = index  - (this.range.data.length - this.overlay.data.length)
    let l = limit(this.overlay.data.length - 1, 0, Infinity)
        c = limit(c, 0, l)

    return {c, colours}
  }

  indicatorInput(start, end) {
    let input = {
      inReal: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    }
    do {
      input.inReal.push(this.range.value(start)[OHLCV.c])
      input.open.push(this.range.value(start)[OHLCV.o])
      input.high.push(this.range.value(start)[OHLCV.h])
      input.low.push(this.range.value(start)[OHLCV.l])
      input.close.push(this.range.value(start)[OHLCV.c])
      input.volume.push(this.range.value(start)[OHLCV.v])
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
    let hasNull = input.inReal.find(element => element === null)
    if (hasNull) return false
    else return { timePeriod: step, ...input }
  }

  /**
 * Calculate indicator values for chart history - partial or entire
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
        let od = this.overlay.data
    
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
    
        // check if a full or only partial calculation is required
        // full calculation required
        if (od.length == 0) { }
        // partial calculation required
        else if (od.length + p !== range.dataLength) {
          // new data in the past?
          if (od[0][0] > range.value(p)[0]) {
            start = 0
            end = range.getTimeIndex(od[0][0]) - p
            end = limit(end, p, range.dataLength - 1)
          }
          // new data in the future ?
          else if (od[ od.length - 1 ][0] < range.value( range.dataLength - 1 )[0]) {
            start = od.length - 1 + p
            start = limit(start, 0, range.dataLength)
            end = range.dataLength - 1
          }
          // something is wrong
          else return false
        }
        // up to date, no need to calculate
        else return false

        // if not enough data for calculation fail
        if ( end - start < p ) return false
  
        let data = [];
        let i, v, entry, input;
    
        while (start < end) {
          // fetch the data required to calculate the indicator
          input = this.indicatorInput(start, start + p)
          params = {...params, ...input}
          // let hasNull = params.inReal.find(element => element === null)
          // if (hasNull) return false
    
          entry = this.TALib[indicator](params)
    
          v = []
          i = 0
          for (let o of this.definition.output) {
            v[i++] = entry[o.name][0]
          }
          // store entry with timestamp
          data.push([range.value(start + p - 1)[0], ...v])
          // data.push([range.value(start - 1)[0], ...v])

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
      const data = this.calcIndicator(this.libName, this.definition.input, this.range);
      if (data) {
        const od = this.overlay.data
        const d = new Set(data)
        const o = new Set(od)
        let a, p, r = {};
        if (!isArray(od) ||
            od.length == 0 ) {
            this.overlay.data = data
            return
        }
        else if (data[0][0] < od[0][0]) {
          // let s = new Set([...d, ...o])
          // this.overlay.data = Array.from(s)
          a = data
          p = od
        }
        else if (data[data.length-1][0] > od[od.length-1][0]) {
          // let s = new Set([...o, ...d])
          // this.overlay.data = Array.from(s)
          a = od
          p = data
        }
        
        for (let v of a) {
          r[v[0]] = v
        }
        for (let v of p) {
          r[v[0]] = v
        }
        this.overlay.data = Object.values(r)

        this.#drawOnUpdate = true
      }
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

    return [time, ...v]
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
    this.doDraw = true
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

    this.overlay.data[l] = v

    this.target.setPosition(this.core.scrollPos, 0)
    this.doDraw = true
    this.draw(this.range)
  }

  /**
   * plot 
   *
   * @param {Array} plots - array of inputs, eg. x y coords [{x:x, y:y}, ...]
   * @param {string} type
   * @param {Object} opts
   * @memberof Indicator
   */
  plot(plots, type, opts ) {
    super.plot(plots, type, opts )
  }

  draw() {
  }

  mustUpdate() {
    return (this.#drawOnUpdate) ? this.#drawOnUpdate : super.mustUpdate()
  }

  updated() {
    this.#drawOnUpdate = false
    super.updated()
  }
}
