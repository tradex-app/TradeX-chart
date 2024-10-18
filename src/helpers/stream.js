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

import { isArray, isBoolean, isInteger, isNumber, isObject, isString } from '../utils/typeChecks'
import { YEAR_MS, MONTHR_MS, WEEK_MS, DAY_MS, HOUR_MS, MINUTE_MS, SECOND_MS, MILLISECOND, isValidTimestamp } from '../utils/time';
import { copyDeep, mergeDeep, valuesInArray } from '../utils/utilities';
import Alerts from './alerts';
import TradeXchart from '../core';
import State from '../state';

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

const statusAllowStart = [STREAM_NONE, STREAM_STOPPED]
const keys = ["t","o","h","l","c","v"]
const T = 0, O = 1, H = 2, L = 3, C = 4, V = 5;
const empty = [null, null, null, null, null]
const defaultStreamConfig = {
  tfCountDown: true,
  alerts: []
}

export default class Stream {

  #core
  #config
  #state
  #status
  #maxUpdate
  #updateTimer = 0
  #precision
  #data
  #candle = empty
  #countDownStart = 0
  #countDownMS = 0
  #countDown = ""
  #dataReceived = false
  #lastPriceMax
  #lastPriceMin
  #lastTick = empty
  #alerts


  constructor(core, state) {
    if (!(core instanceof TradeXchart)) throwError({id: "invalid"}, `not a valid chart instance`)
    else this.#core = core
    if (!(state instanceof State)) throwError(core, `state not a valid State instance`)
    else this.#state = state
    this.status = {status: STREAM_NONE}
    this.#config = validateConfig(core.config?.stream)
    this.#maxUpdate = (isNumber(core.config?.maxCandleUpdate)) ? core.config.maxCandleUpdate : STREAM_MAXUPDATE
    this.#precision = (isNumber(core.config?.streamPrecision)) ? core.config.streamPrecision : STREAM_PRECISION
  }

  get state() { return this.#state }
  get config() { return this.#config }
  get countDownMS() { return this.#countDownMS }
  get countDown() { return this.#countDown }
  get range() { return this.#core.range }
  get status() { return this.#status }
  set status(s) {
    if (!isObject(s) && !isString(s?.status)) return
    this.#status = s.status
    this.emit(s.status, s?.data)
  }
  get symbol() { return this.#core.symbol }
  get timeFrame() { return this.#core.interval }
  get timeFrameStr() { return this.#core.intervalStr }
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
  get isActive() {
    let active = [
      STREAM_LISTENING,
      STREAM_STARTED,
      STREAM_FIRSTVALUE,
      STREAM_NEWVALUE,
      STREAM_UPDATE
    ]
    if (active.includes(this.#status))
      return true
    else
      return false
  }

  /**
   * process price tick
   *
   * @param {Object} data - t: timestamp, p: price, q: quantity
   * @memberof Stream
   */
  set candle(data) {
    const now = Date.now()
    // store last tick for alerts
    const lastTick = [...this.#candle]
    // ensure candle data provides t,o,h,l,c,v
    if (!valuesInArray(keys, Object.keys(data))) return
    // round time to nearest current time unit
    if (!isValidTimestamp(data.t)) return
    data.ts = Date.now()
    data.t = this.roundTime(new Date(data.t))

    // ensure values are numbers
    data.o = data.o * 1
    data.h = data.h * 1
    data.l = data.l * 1
    data.c = data.c * 1
    data.v = data.v * 1

    this.#data = data
    this.dataReceived = data

    if (this.#candle[T] !== data.t) {
      this.newCandle(data)
    }
    else {
      this.updateCandle(data)
    }
    this.status = {status: STREAM_LISTENING, data: this.#candle}
    this.lastTick = lastTick

    if (now - this.#updateTimer > this.#maxUpdate)
      this.onUpdate()

      this.#updateTimer = now
  }
  get candle() {
    return (this.#candle !== empty) ? this.#candle : null
  }

  start() {
    if (!statusAllowStart.includes(this.status)) {
      this.#core.error("ERROR: Invoke stopStream() before starting a new one.")
      return 
    }
    if (!(this.#alerts instanceof Alerts))
      this.#alerts = new Alerts(this.#config.alerts)

    this.status = {status: STREAM_STARTED}
  }

  stop() {
    if (this.#alerts instanceof Alerts)
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
    if ((this.#status == STREAM_STARTED || this.#status == STREAM_LISTENING) && 
        isObject(tick) ) 
    {
        if (!isInteger(tick.t * 1)) return // tick.t = Date.now()
        let keys = Object.keys(tick) 
        let t = {}, v;
        for (let key of keys) {
          v = tick[key] * 1
          if (!isNumber(v)) continue
          t[key] = v
        }
        this.candle = t
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
   * @param {Object} data - t: timestamp, p: price, q: quantity
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

console.log(`State: ${this.#state.key} new candle:`, this.#candle)
    this.#core.state.mergeData({ohlcv: [this.#candle]}, true, false)
    this.status = {status: STREAM_NEWVALUE, data: {data: data, candle: this.#candle}}
    this.#countDownMS = this.#core.time.timeFrameMS
    this.#countDownStart = this.roundTime(data.ts) // this.roundTime(Date.now())
  }

  prevCandle() {
    const d = this.#core.allData.data
    if (d.length > 0 && d[d.length - 1][7]) 
          d[d.length - 1].length = 6
  }

  /**
   * update existing candle with current tick
   *
   * @param {Object} data - t: timestamp, p: price, q: quantity
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
console.log(`State: ${this.#state.key} candle update:`,candle)

    const d = this.#core.allData.data
    const l = (d.length > 0) ? d.length -1 : 0
    d[l] = this.#candle

    this.countDownUpdate()
  }

  countDownUpdate() {
    let y,M,w,d,h,m,s,u;
    let tf = this.#core.time.timeFrameMS
    let now = this.#data.ts
    let cntDn = tf - (now - this.#countDownStart)

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

function validateConfig(c) {
  if (!isObject(c)) return defaultStreamConfig

  else {
    let d = copyDeep(defaultStreamConfig)
    c = mergeDeep(d, c)

    c.tfCountDown = (isBoolean(c.tfCountDown)) ? c.tfCountDown : defaultStreamConfig.tfCountDown
    c.alerts = (isArray(c.alerts)) ? c.alerts : defaultStreamConfig.alerts
  }
  return c
}

function consoleError(c, e) {
  c.error(`TradeX-chart id: ${c.id}: Ticker Stream : ${e}`)
}

function throwError(id, e) {
  throw new Error(`TradeX-chart id: ${id} : Ticker Stream : ${e}`)
}