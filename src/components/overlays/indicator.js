// indicator.js
// Base class for on and off chart indicators

import Overlay from "./overlay"
import { renderFillRect } from "../../renderer/rect"
import { renderLine } from "../../renderer/line"
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

  #overlay
  #indicator
  #type
  #TALib
  #range
  #value = [0, 0]
  #newValueCB
  #updateValueCB
  #precision = 2
  #calcParams
  #style = {}

  constructor (target, xAxis=false, yAxis=false, config, parent, params) {

    super(target, xAxis, yAxis, undefined, parent, params)

    this.#overlay = params.overlay
    this.#type = config.type
    this.#indicator = config.indicator
    this.#TALib = this.core.TALib
    this.#range = this.xAxis.range

    this.eventsListen()
  }

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
  set calcParams(p) { this.#calcParams = p }
  get calcParams() { return this.#calcParams }
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

  indicatorInput(start, end) {
    let input = []
    do {
      input.push(this.range.value(start)[C])
    }
    while (start++ < end)
    return input
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
    let step = this.calcParams[0]
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
    if (!this.core.TALibReady) return false

    let entry = this.TALib[indicator](params)
    let end = this.range.dataLength
    let time = this.range.value(end)[0]
    return [time, entry.output[0]]
  }

  plot(plots, type, style) {

    const ctx = this.scene.context
    ctx.save();

    switch(type) {
      case "renderLine": renderLine(ctx, plots, style);
      case "renderFillRect": renderFillRect(ctx, plots[0], plots[1], plots[2], plots[3], style)
    }

    ctx.restore();
  }

  draw() {

  }
}