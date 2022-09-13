
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'

import {
  STREAM_ERROR,
  STREAM_NONE,
  STREAM_LISTENING,
  STREAM_STARTED,
  STREAM_STOPPED,
  STREAM_NEWVALUE,
  STREAM_UPDATE,
  STREAM_MAXUPDATE
} from "../definitions/core"

import { YAXIS_BOUNDS } from '../definitions/chart';

const T = 0, O = 1, H = 2, L = 3, C = 4, V = 5;
const empty = [0,0,0,0,0]

export default class Stream {

  #core
  #maxUpdate
  #updateTimer
  #status
  #candle = empty


  constructor(core) {
    this.#core = core
    this.#maxUpdate = (isNumber(core.config?.maxCandleUpdate)) ? core.config.maxCandleUpdate : STREAM_MAXUPDATE
    this.status = {status: STREAM_NONE}
  }

  emit(topic, data) {
    this.#core.emit(topic, data)
  }

  start() {
    // add empty value to range end
    // this.#core.chartData.push([0,0,0,0,0,0])
    // iterate over indicators add empty value to end

    this.status = {status: STREAM_STARTED}
    this.#updateTimer = setInterval(this.onUpdate.bind(this), this.#maxUpdate)
  }

  stop() {
    this.status = {status: STREAM_STOPPED}
  }

  error() {
    this.status = {status: STREAM_ERROR}
  }

  onTick(tick) {
    if (this.#status == STREAM_STARTED || this.#status == STREAM_LISTENING) {
      if (isObject(tick)) this.candle = tick
    }
  }

  onUpdate() {
    if (this.#candle !== empty) {
      this.status = {status: STREAM_UPDATE, data: this.candle}
      this.status = {status: STREAM_LISTENING, data: this.#candle}
    }
  }

  get range() { return this.#core.range }

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
    // const r = this.range
    // if (data.p > r.priceMax || data.p < r.priceMin) {}

    // round time to nearest current time unit
    let roundedTime = Math.floor(new Date(data.t) / 60000.0) * 60000
    data.t = roundedTime

    if (this.#candle[T] !== data.t) {
      this.newCandle(data)
    }
    else {
      this.updateCandle(data)
    }
    this.status = {status: STREAM_LISTENING, data: this.#candle}
  }
  get candle() {
    if (this.#candle !== empty) return this.#candle
  }

  /**
   * add new candle to state data
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  newCandle(data) {
    let open = this.range.value()[C] || data.p
    // add old stream candle to state data
    // if (this.#candle !== empty) {
    //   // this.#core.mergeData({data: [this.#candle]}, true)
    //   open = this.#candle[C]
    // }

    // create new stream candle
    this.prevCandle()
    this.#candle = [data.t, open, data.p, data.p, open, data.q, null, true]
    this.#core.mergeData({data: [this.#candle]}, true)
    this.status = {status: STREAM_NEWVALUE, data: {data: data, candle: this.#candle}}
  }

  prevCandle() {
    const d = this.#core.allData.data
    if (d[d.length - 1][7]) d[d.length - 1].pop()
  }

  /**
   * update existing candle with current tick
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  updateCandle(data) {

    // https://stackoverflow.com/a/52772191

    let candle = this.#candle
    candle[H] = data.p > candle[H] ? data.p : candle[H]
    candle[L] = data.p < candle[L] ? data.p : candle[L]
    candle[C] = data.p
    candle[V] = parseFloat((candle[V] + data.q).toFixed(this.#core.volumePrecision))

    // update the last candle in the state data
    this.#candle = candle

    const d = this.#core.allData.data
    d[d.length - 1] = this.#candle
  }

}
