
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'

import {
  STREAM_ERROR,
  STREAM_NONE,
  STREAM_LISTENING,
  STREAM_STOPPED,
  STREAM_NEWVALUE,
  STREAM_UPDATE
} from "../definitions/core"

const T = 0, O = 1, H = 2, L = 3, C = 4, V = 5;

export default class Stream {

  #core
  #data
  #range
  #maxUpdate
  #updateTimer
  #status
  #candle


  constructor(core) {
    this.#core = core
    this.#data = core.data
    this.#range = core.range
    this.#maxUpdate = core.config.maxCandleUpdate
    this.status = {status: STREAM_NONE}
  }

  emit(topic, data) {
    this.#core.emit(topic, data)
  }

  start() {
    this.status = {status: STREAM_LISTENING}
    this.#updateTimer = setInterval(onUpdate.bind(this), this.#maxUpdate)
  }

  stop() {
    this.status = {status: STREAM_STOPPED}
  }

  error() {
    this.status = {status: STREAM_ERROR}
  }

  onTick(tick) {
    if (isObject(tick)) this.candle = tick
  }

  onUpdate() {
    this.status = {status: STREAM_UPDATE, data: this.candle}
  }

  get status() { return this.#status }
  set status({status, data}) {
    this.#status = status
    this.emit(status, data)
  }

  /**
   * process price tick
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  set candle(data) {
    // round time to nearest current time unit
    let roundedTime = Math.floor(new Date(data.t) / 60000.0) * 60
    data.t = roundedTime

    if (this.candle[T] !== data.t) {
      this.newCandle(data)
    }
    else {
      this.updateCandle(data)
      this.status = {status: STREAM_LISTENING}
    }
  }
  get candle() {
    return this.#candle
  }

  /**
   * add new candle to state data
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  newCandle(data) {
    // add old stream candle to state data
    if (isArray(this.#candle)) this.#range.data.push(this.#candle)
    // create new stream candle
    this.#candle = [data.t, data.p, data.p, data.p, 0, data.q]
    this.status = {status: STREAM_NEWVALUE, data: data}
  }

  /**
   * update existing candle with current tick
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  updateCandle(data) {

    // https://stackoverflow.com/a/52772191

    let candle = this.candle
    candle[H] = data.p > candle[H] ? data.p : candle[H]
    candle[L] = data.p < candle[L] ? data.p : candle[L]
    candle[C] = data.p
    candle[V] = parseFloat((candle[V] + data.s).toFixed(this.#core.volumePrecision))

    // update the last candle in the state data
    this.#candle = candle
  }

}
