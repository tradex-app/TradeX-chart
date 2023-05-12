// stream.js
// class for managing streaming price data
// expects KLIne data
/*
  {
    t: timeStamp // timestamp of current candle in milliseconds
    o: open  // open price
    h: high  // high price
    c: close  // close price
    v: volume // volume
  }
*/

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import { YEAR_MS, MONTHR_MS, WEEK_MS, DAY_MS, HOUR_MS, MINUTE_MS, SECOND_MS, MILLISECOND } from '../utils/time';
import { copyDeep, mergeDeep } from '../utils/utilities';
import Alerts from './alerts';

import {
  STREAM_ERROR,
  STREAM_NONE,
  STREAM_LISTENING,
  STREAM_STARTED,
  STREAM_STOPPED,
  STREAM_FIRSTVALUE,
  STREAM_NEWVALUE,
  STREAM_UPDATE,
  STREAM_MAXUPDATE,
  STREAM_PRECISION
} from "../definitions/core"

import { YAXIS_BOUNDS } from '../definitions/chart';

const T = 0, O = 1, H = 2, L = 3, C = 4, V = 5;
const empty = [null, null, null, null, null]
const defaultStreamConfig = {
  tfCountDown: true,
  alerts: []
}

export default class Stream {

  #core
  #config
  #status
  #time
  #maxUpdate
  #updateTimer
  #precision
  #candle = empty
  #countDownStart = 0
  #countDownMS = 0
  #countDown = ""
  #dataReceived = false
  #lastPriceMax
  #lastPriceMin
  #lastTick = empty
  #alerts


  static validateConfig(c) {
    if (!isObject(c)) return defaultStreamConfig

    else {
      let d = copyDeep(defaultStreamConfig)
      c = mergeDeep(d, c)

      c.tfCountDown = (isBoolean(c.tfCountDown)) ? c.tfCountDown : defaultStreamConfig.tfCountDown
      c.alerts = (isArray(c.alerts)) ? c.alerts : defaultStreamConfig.alerts
    }
    return c
  }

  constructor(core) {
    this.#core = core
    this.#time = core.time
    this.status = {status: STREAM_NONE}
    this.#config = Stream.validateConfig(core.config?.stream)
    this.#maxUpdate = (isNumber(core.config?.maxCandleUpdate)) ? core.config.maxCandleUpdate : STREAM_MAXUPDATE
    this.#precision = (isNumber(core.config?.streamPrecision)) ? core.config.streamPrecision : STREAM_PRECISION
  }

  get config() { return this.#config }
  get countDownMS() { return this.#countDownMS }
  get countDown() { return this.#countDown }
  get range() { return this.#core.range }
  get status() { return this.#status }
  set status({status, data}) {
    this.#status = status
    this.emit(status, data)
  }
  set dataReceived(data) {
    if (this.#dataReceived) return

    this.#dataReceived = true
    this.status = {status: STREAM_FIRSTVALUE, data}
  }
  get alerts() { return this.#alerts }
  get lastPriceMin() { return this.#lastPriceMin }
  set lastPriceMin(p) { if (isNumber(p)) this.#lastPriceMin = p }
  get lastPriceMax() { return this.#lastPriceMax }
  set lastPriceMax(p) { if (isNumber(p)) this.#lastPriceMax = p }
  get lastTick() { return this.#lastTick }
  set lastTick(t) { 
    if (!isArray(t)) return
    
    const prevLastTick = this.#lastTick
    this.#lastTick = t
    this.alerts.check(t, this.#candle)
  }

  /**
   * process price tick
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  set candle(data) {
    // store last tick for alerts
    const lastTick = [...this.#candle]
    // round time to nearest current time unit
    data.t = this.roundTime(new Date(data.t))
    // ensure values are numbers
    data.o = data.o * 1
    data.h = data.h * 1
    data.l = data.l * 1
    data.c = data.c * 1
    data.v = data.v * 1

    if (this.#candle[T] !== data.t) {
      this.newCandle(data)
    }
    else {
      this.updateCandle(data)
    }
    this.status = {status: STREAM_LISTENING, data: this.#candle}
    this.lastTick = lastTick
  }
  get candle() {
    return (this.#candle !== empty) ? this.#candle : null
  }

  start() {
    // add empty value to range end
    // this.#core.chartData.push([0,0,0,0,0,0])
    // iterate over indicators add empty value to end

    this.#alerts = new Alerts(this.#config.alerts)
    this.status = {status: STREAM_STARTED}
    this.#updateTimer = setInterval(this.onUpdate.bind(this), this.#maxUpdate)
  }

  stop() {
    this.#alerts.destroy()
    this.status = {status: STREAM_STOPPED}
  }
  
  emit(topic, data) {
    this.#core.emit(topic, data)
  }

  error() {
    this.status = {status: STREAM_ERROR}
  }

  onTick(tick) {
    if (this.#status == STREAM_STARTED || this.#status == STREAM_LISTENING) {
      if (isObject(tick)) {
        this.candle = tick
        this.#core.setNotEmpty()
      }
    }
  }

  onUpdate() {
    if (this.#candle !== empty) {
      this.status = {status: STREAM_UPDATE, data: this.candle}
      this.status = {status: STREAM_LISTENING, data: this.#candle}
    }
  }


  /**
   * add new candle to state data
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  newCandle(data) {
    // create new stream candle
    this.prevCandle()
    this.#candle = 
     [data.t, 
      data.o, 
      data.h, 
      data.l, 
      data.c, 
      data.v, 
      null, true]
    this.#core.mergeData({data: [this.#candle]}, true, false)
    this.status = {status: STREAM_NEWVALUE, data: {data: data, candle: this.#candle}}
    this.#countDownMS = this.#time.timeFrameMS
    this.#countDownStart = this.roundTime(Date.now())
  }

  prevCandle() {
    const d = this.#core.allData.data
    if (d.length > 0 && d[d.length - 1][7]) 
          d[d.length - 1].length = 6
  }

  /**
   * update existing candle with current tick
   *
   * @param {object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  updateCandle(data) {
    let candle = this.#candle

    candle[O] = data.o
    candle[H] = data.h
    candle[L] = data.l
    candle[C] = data.c
    candle[V] = data.v

    // update the last candle in the state data
    this.#candle = candle

    const d = this.#core.allData.data
    const l = (d.length > 0) ? d.length -1 : 0
    d[l] = this.#candle

    this.countDownUpdate()
  }

  parseCandle

  countDownUpdate() {
    let y,M,w,d,h,m,s,u;
    let tf = this.#time.timeFrameMS
    let cntDn = this.#time.timeFrameMS - (Date.now() - this.#countDownStart)

    if (cntDn < 0) {
      // is the stream closed or in error?
      // do something...
      cntDn = 0
    }
    this.#countDownMS = cntDn

    if (cntDn > YEAR_MS) {
      y = String(Math.floor(cntDn / YEAR_MS));
      M = String(Math.floor((cntDn % YEAR_MS) / MONTHR_MS)).padStart(2, '0');
      this.#countDown = `${y}Y ${M}M`
    }
    else if (cntDn > MONTHR_MS) {
      M = String(Math.floor(cntDn / MONTHR_MS)).padStart(2, '0');
      d = String(Math.floor((cntDn % MONTHR_MS) / DAY_MS)).padStart(2, '0');
      this.#countDown = `${M}M ${d}D`
    }
    else if (cntDn > WEEK_MS) {
      w = String(Math.floor(cntDn / WEEK_MS)).padStart(2, '0');
      d = String(Math.floor((cntDn % MONTHR_MS) / DAY_MS)).padStart(2, '0');
      this.#countDown = `${w}W ${d}D`
    }
    else if (cntDn > DAY_MS) {
      d = String(Math.floor(cntDn / DAY_MS)).padStart(2, '0');
      h = String(Math.floor((cntDn % DAY_MS) / HOUR_MS)).padStart(2, '0');
      m = String(Math.floor((cntDn % HOUR_MS) / MINUTE_MS)).padStart(2, '0');
      this.#countDown = `${d}D ${h}:${m}`
    }
    else if (cntDn > HOUR_MS) {
      h = String(Math.floor(cntDn / HOUR_MS)).padStart(2, '0');
      m = String(Math.floor((cntDn % HOUR_MS) / MINUTE_MS)).padStart(2, '0');
      s = String(Math.floor((cntDn % MINUTE_MS) / SECOND_MS)).padStart(2, '0');
      this.#countDown = `${h}:${m}:${s}`
    }
    else if (cntDn > MINUTE_MS) {
      m = String(Math.floor(cntDn / MINUTE_MS)).padStart(2, '0');
      s = String(Math.floor((cntDn % MINUTE_MS) / SECOND_MS)).padStart(2, '0');
      this.#countDown = `00:${m}:${s}`
    }
    // else if (cntDn > SECOND_MS) {
    else {
      s = String(Math.floor(cntDn / SECOND_MS)).padStart(2, '0');
      u = String(cntDn % SECOND_MS).padStart(4, '0');
      this.#countDown = `00:00:${s}`
    }
    // else this.#countDown  = `00 : ${cntDn}`

    return this.#countDown
  }

  roundTime(ts) {
    return ts - (ts % this.#core.time.timeFrameMS)
  }
}
