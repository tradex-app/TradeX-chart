

export default class Stream {

  #core
  #data
  #range
  #maxUpdate
  #updateTimer


  constructor(core) {
    this.#core = core
    this.#data = core.data
    this.#range = core.range
    this.#maxUpdate = core.config.maxCandleUpdate
  }

  start() {

    this.#core.emit("onStream_Start")
  }

  stop() {

    this.#core.emit("onStream_Stop")
  }

  candle() {
    return this.#range.value()
  }

  newCandle() {
    let t = Date.now()
    // getUTC
    // calc candle timestamp on the timeframe boundary from current timeframe
    // this.time.timeFrame
    // this.time.timeFrameMS

    // create empty / zero entry chart and offChart data
    this.#range.data[this.#range.data.length] = [t, 0, 0, 0, 0, 0]
  }

  set data(d) {

    // https://stackoverflow.com/a/52772191

    // round time to nearest current time unit
    let roundedTime = Math.floor(new Date(msg.time) / 60000.0) * 60

    // if state data does not have an entry for current instrument create it
    if (!this.#core.data[instrument]) {
      this.#core.data[instrument] = {}
    }

    // If no candle exists at the latest rounded timestamp doesn't exist, create it
    if (!candles[productId][roundedTime]) {

      //Before creating a new candle, lets mark the old one as closed
      let lastCandle = lastCandleMap[productId]
  
      if (lastCandle) {
        lastCandle.closed = true;
        delete candles[productId][lastCandle.timestamp]
      }
  
      // Set Quote Volume to -1 as GDAX doesnt supply it
      candles[productId][roundedTime] = {
        timestamp: roundedTime,
        open: msg.price,
        high: msg.price,
        low: msg.price,
        close: msg.price,
        baseVolume: msg.size,
        quoteVolume: -1,
        closed: false
      }
    }
  
    // If this timestamp exists in our map for the product id, we need to update an existing candle
    else {
      let candle = candles[productId][roundedTime]
      candle.high = msg.price > candle.high ? msg.price : candle.high
      candle.low = msg.price < candle.low ? msg.price : candle.low
      candle.close = msg.price
      candle.baseVolume = parseFloat((candle.baseVolume + msg.size).toFixed(PRECISION))
  
      // Set the last candle as the one we just updated
      lastCandleMap[productId] = candle
    }

    this.#core.emit("onStream_Data", d)
  }


}