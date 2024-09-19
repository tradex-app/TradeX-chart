class Stream {

    chart
    tick = {t: null, p: null, q: null}
    candle = []
    time
    tf
    tfms
  
    constructor(chart, interval, tickerCb, klineCb) {
  
      this.chart = chart
      this.interval = interval
      this.time = (chart.stream.lastTick) ? chart.stream.lastTick.t : chart.range.value()[0]
      this.tf = chart.config.timeFrame
      this.tfms = chart.time.timeFrameMS // TIMEUNITSVALUESSHORT[tf]
      this.candle = chart.range.value()
      this.tickerCb = (typeof tickerCb === "function") ? tickerCb : false
      this.klineCb = (typeof klineCb === "function") ? klineCb : false
  
      let r = this.chart.range
      this.max = r.valueDiff / (this.tfms / this.interval) || 1
  
      setInterval(this.ticker.bind(this), interval)
    }
  
    get volumeInc() {
      let r = this.chart.range
      let max = r.volumeDiff || 1
      return getRandomInt(0, max) / (this.tfms / this.interval)
    }
  
    get priceInc() {
      let factor2 = getRandomInt(0, 10) % 2
      let sign = (Math.floor(factor2) === 1) ? 1 : -1
  
      return getRandomInt(0, this.max) * sign
    }
  
    ticker() {
  
      this.tick.t = this.tick.t || this.candle[0] || Date.now()
      this.tick.p = this.tick.p || this.candle[4] || 1
      this.tick.q = this.tick.q || this.candle[5] || 1
  
      let price = this.tick.p + this.priceInc
          price = (price < 0) ? Math.abs(this.priceInc) : price
      let time = this.tick.t + this.interval
      this.tick = {t: time, p: price, q: this.volumeInc}
  
      if (this.tickerCb) this.tickerCb(this.tick)
      if (this.klineCb) this.kline()
    }
  
    kline() {
      let t = this.candle[0]
      let c = [...this.candle]
      let p = this.tick.p
  
      if (this.tick.t - t >= this.tfms ) {
        t = this.tick.t - (this.tick.t % this.tfms)
        c = [t, p, p, p, p, this.volumeInc]
        c 
      }
      else {
        c[2] = (c[2] < p ) ? p : c[2]
        c[3] = (c[3] > p ) ? p : c[3]
        c[4] = p
        c[5] += this.tick.q
      }
      this.candle = c
      this.klineCb({t: t, o: c[1], h: c[2], l: c[3], c: c[4], v: c[5]})
    }
  }