// indicator.js

// const plotTypes = {
//   area,
//   bar,
//   channel,
//   line,
// }

import { renderFillRect } from "../../renderer/rect"
import { renderLine } from "../../renderer/line"
import {
  STREAM_NEWVALUE,
  STREAM_UPDATE
} from "../../definitions/core"

const T = 0, O = 1, H = 2, L = 3, C = 4, V = 5;

/**
 * Base class for on and off chart indicators
 * @export
 * @class indicator
 */
export default class indicator {

  #core
  #target
  #scene
  #config
  #xAxis
  #yAxis
  #overlay
  #indicator
  #type
  #TALib
  #range
  #value = [0, 0]
  #newValueCB
  #updateValueCB

  constructor(target, overlay, xAxis, yAxis, config) {

    this.#core = xAxis.core
    this.#config = config
    this.#target = target
    this.#scene = target.scene
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#overlay = overlay
    this.#type = config.type
    this.#indicator = config.indicator
    this.#TALib = xAxis.core.TALib
    this.#range = xAxis.range

    this.eventsListen()
  }

  get core() { return this.#core }
  get config() { return this.#config }
  get target() { return this.#target }
  get scene() { return this.#scene }
  get xAxis() { return this.#xAxis }
  get yAxis() { return this.#yAxis }
  get type() { return this.#type }
  get overlay() { return this.#overlay }
  get indicator() { return this.#indicator }
  get TALib() { return this.#TALib }
  get range() { return this.#range }
  set setNewValue(cb) { this.#newValueCB = cb}
  set setUpdateValue(cb) { this.#updateValueCB = cb }

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

  plot(plots, type, style) {

    const ctx = this.#scene.context
    ctx.save();

    switch(type) {
      case "renderLine": renderLine(ctx, plots, style);
      case "renderFillRect": renderFillRect(ctx, plots[0], plots[1], plots[2], plots[3], style)
    }

    ctx.restore();
  }
}