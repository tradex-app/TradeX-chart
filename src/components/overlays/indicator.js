// indicator.js
// Base class for on and off chart indicators

import Overlay from "./overlay"
import { renderFillRect } from "../../renderer/rect"
import { renderLine } from "../../renderer/line"
import { limit } from "../../utils/number"
import { isObject } from "../../utils/typeChecks"
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
export default class indicator extends Overlay {

  #ID
  #name
  #shortName
  #onChart
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

  constructor (target, xAxis=false, yAxis=false, config, parent, params) {

    super(target, xAxis, yAxis, undefined, parent, params)

    this.#params = params
    this.#overlay = params.overlay
    this.#type = config.type  // remove?
    this.#indicator = config.indicator
    this.#TALib = this.core.TALib
    this.#range = this.xAxis.range

    this.eventsListen()
  }

  get ID() { return this.#ID }
  set ID(id) { this.#ID = id }
  get name() { return this.#name }
  set name(n) { this.#name = n }
  get shortName() { return this.#shortName }
  set shortName(n) { this.#shortName = n }
  get onChart() { return this.#onChart }
  set onChart(c) { this.#onChart = c }
  get scaleOverlay() { return this.#scaleOverlay }
  set scaleOverlay(o) { this.#scaleOverlay = o }
  get plots() { return this.#plots }
  set plots(p) { this.#plots = p }
  get params() { return this.#params }
  get Timeline() { return this.core.Timeline }
  get Scale() { return this.parent.scale }
  get type() { return this.#type }
  get overlay() { return this.#overlay }
  get indicator() { return this.#indicator }
  get TALib() { return this.#TALib }
  get range() { return this.core.range }
  set setNewValue(cb) { this.#newValueCB = cb}
  set setUpdateValue(cb) { this.#updateValueCB = cb }
  set precision(p) { this.#precision = p }
  get precision() { return this.#precision }
  set style(s) { this.#style = s }
  get style() { return this.#style }
  set position(p) { this.target.setPosition(p[0], p[1]) }

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

  end() {
    // this.off(STREAM_NEWVALUE, this.onStreamNewValue)
    this.off(STREAM_UPDATE, this.onStreamUpdate)
  }

  eventsListen() {
    // this.on(STREAM_NEWVALUE, this.onStreamNewValue.bind(this))
    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this))
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
    console.log("onStreamNewValue(value):",value)
  }

  onStreamUpdate(candle) {
    // console.log("onStreamUpdate(candle):", candle)
    this.value = candle
  }

  /**
   * validate indicator inputs and outputs
   *
   * @param {object} i
   * @param {object} api
   * @memberof indicator
   */
  defineIndicator(i, api) {
    if (!isObject(i)) i = {}

    this.definition.output = api.outputs
    const input = {...this.definition.input, ...i}
          delete input.style
    // process options
    for (let i of api.options) {
      if (i.name in input) {
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
      id: this.shortName,
      title: this.shortName,
      type: this.shortName,
      source: this.legendInputs.bind(this)
    }
    this.chart.legend.add(legend)
  }

  /**
   * return index from cursor position and colours
   *
   * @param {array} [pos=this.chart.cursorPos]
   * @return {object}  
   * @memberof indicator
   */
  legendInputs(pos=this.chart.cursorPos) {
    const colours = [this.style.strokeStyle]
    const index = this.Timeline.xPos2Index(pos[0])
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

  TALibParams() {
    let end = this.range.dataLength
    let step = this.definition.input.timePeriod
    let start = end - step
    let input = this.indicatorInput(start, end)
    let hasNull = input.find(element => element === null)
    if (hasNull) return false
    else return { inReal: input, timePeriod: step }
  }

  /**
 * Calculate indicator values for entire chart history
 * @param {string} indicator - the TALib function to call
 * @param {object} params - parameters for the TALib function
 * @returns {boolean} - success or failure
 */
  calcIndicator (indicator, params) {
    if (!this.core.TALibReady) return false

    this.overlay.data = []
    let step = this.definition.timePeriod
    // fail if there is not enough data to calculate
    if (this.range.Length < step) return false

    let data, end, entry, time;
    let start = 0
    let input = this.indicatorInput(start, this.range.Length - 1)
    let hasNull = input.find(element => element === null)
    if (hasNull) return false
    
    do {
      end = start + step
      data = input.slice(start, end)
      entry = this.TALib[indicator](params)
      time = this.range.value(end - 1)[0]
      this.overlay.data.push([time, entry])
      start++
    } 
    while (end < this.range.Length)
    return true
  }

  /**
   * Calculate indicator value for current stream candle
   * @param {string} indicator - the TALib function to call
   * @param {object} params - parameters for the TALib function
   * @returns {array} - indicator data entry
   */
  calcIndicatorStream (indicator, params) {
    if (!this.core.TALibReady ||
        this.#range.dataLength < this.definition.input.timePeriod ) return false

    let entry = this.TALib[indicator](params)
    let end = this.range.dataLength
    let time = this.range.value(end)[0]
    let v = []
    let i = 0

    for (let o of this.definition.output) {
      v[i++] = entry[o.name][0]
    }

    return [time, v]
  }

  /**
   * process stream and create new indicator data entry
   * @param {array} value - current stream candle 
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
   * @param {array} value - current stream candle 
   * @memberof indicator
   */
  UpdateValue (value) {
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
   * @param {array} plots - array of x y coords [{x:x, y:y}, ...]
   * @param {string} type
   * @param {object} style
   * @memberof indicator
   */
  plot(plots, type, style) {

    const ctx = this.scene.context
    ctx.save();

    switch(type) {
      case "renderLine": renderLine(ctx, plots, style);
      case "renderFillRect": renderFillRect(ctx, plots[0], plots[1], plots[2], plots[3], style)
      default: return;
    }

    ctx.restore();
  }

  draw() {

  }
}
