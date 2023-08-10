import { Chart, DOM } from './tradex-chart.es.js'
import * as talib from "./node_modules/talib-web/lib/index.esm.js"

// let state = undefined
import state1 from './data/1hour.js'
import state2 from './data/data_btc_1m.js'
// import state4 from './data/seconds.js'
// import state from './data/seconds-indicator'

const wasm = "node_modules/talib-web/lib/talib.wasm"

export const LIMITFUTURE = 200
export const LIMITPAST = 200
export const MINCANDLES = 20
export const MAXCANDLES = 4096


let state4 = {
  "ohlcv": [
      [
          1663333201000,
          19139.4,
          19139.6,
          19179.6,
          19179.63478779,
          441.1
      ],
      [
          1663333202000,
          19182.2,
          19182.2,
          19120.2,
          19133.5,
          445.2
      ],
      [
          1663333203000,
          19134.2,
          19182.2,
          19120.2,
          19133.5,
          434.3
      ]
  ],
primary: [
  {
    "name": "SMA, 5",
    "type": "SMA",
    "data": [],
    "settings": {timePeriod: 5}
  }
],
"secondary": [
  {
    "name": "RSI, 20",
    "type": "RSI",
    "data": [],
    "settings": {timePeriod: 20}
  },
]
}

let state5 = {
  "ohlcv": [],
  "primary": [
    {
      "name": "EMA, 25",
      "type": "EMA",
      "data": [],
      "settings": {timePeriod: 25}
  },
  {
      "name": "EMA, 43",
      "type": "EMA",
      "data": [],
      "settings": {timePeriod: 43}
  },
  ],
  "secondary": [
    {
      "name": "RSI, 20",
      "type": "RSI",
      "data": [],
      "settings": {timePeriod: 20}
    }
  ]
}

// let rangeStartTS = 1558429200000 // 21/05/2019, 11:00:00 - 1 hour price
// let rangeStartTS = 1663059600000 // seconds price
let rangeStartTS = undefined
let streamVal = {
  tfCountDown: true,
  alerts: []
}
let interval = 500
let streamInit = false

const config1 = {
  // id: "TradeX_test",
  title: "BTC/USDT",
  symbol: "btcusdt",
  // width: 600,
  // height: 500,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: rangeStartTS,  // formerly rangeStartTS
    initialCnt: 30,    // formerly rangeLimit
    limitFuture: LIMITFUTURE,
    limitPast: LIMITPAST,
    minCandles: MINCANDLES,
    maxCandles: MAXCANDLES,
    yAxisBounds: 0.3
  },
  theme: {
    candle: {
      Type: "candle_down_hollow",
      UpBodyColour: "#FAEB2488",
      UpWickColour: "#FAEB24",
      DnBodyColour: "#F900FE88",
      DnWickColour: "#F900FE",
    },
    volume: {
      Height: 15,
      UpColour: "#FAEB2444",
      DnColour: "#F900FE44",
    },
    xAxis: {
      tickMarker: false,
    },
    yAxis: {
      tickMarker: false,
    },
    chart: {
      Background: "#141414",
      BorderColour: "#141414",
      GridColour: "#303030",
      TextColour: "#c0c0c0"
    },
    primaryPane: {

    },
    tools: {
      location: false
    },
    utils: {
      location: false
    },
    time: {
      navigation: false
    },
    legend: {
       controls: true
    }
  },
  watermark: {
    text: "BTC/USDT"
  },
  isCrypto: true,
  logs: true,
  infos: true,
  warnings: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: state1,
  callbacks: {
    indicatorSettings: {fn: (c)=>{ alert(c.id) }, own: true}
  }
}
const config2 = {
  id: "TradeX_test",
  title: "TEST/USDT",
  symbol: "testusdt",
  // width: 1000,
  // height: 800,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: state2.ohlcv.slice(-15)[0][0], // rangeStartTS,
  },
  theme: {
    candle: {
      Type: "candle_solid",
      UpBodyColour: "#00F04088",
      UpWickColour: "#0F4",
      DnBodyColour: "#F0004088",
      DnWickColour: "#F04",
    },
    volume: {
      Height: 15,
      UpColour: "#00F04044",
      DnColour: "#F0004044",
    },
    chart: {
      Background: "#141414",
      BorderColour: "#666",
      GridColour: "#333",
      TextColour: "#ccc"
    },
    primaryPane: {

    },
    utils: {
      location: false
    },
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: state2
}
const config3 = {
  id: "TradeX_Blue",
  title: "BTC/USDT",
  symbol: "btcusdt",
  // width: 1000,
  // height: 800,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: rangeStartTS,
  },
  theme: {
    candle: {
      Type: "candle_solid",
      UpBodyColour: "#02FFFF88",
      UpWickColour: "#02FFFF",
      DnBodyColour: "#F900FE88",
      DnWickColour: "#F900FE",
    },
    volume: {
      Height: 15,
      UpColour: "#02FFFF44",
      DnColour: "#F900FE44",
    },
    xAxis: {
      colourTick: "#96a9db",
      colourLabel: "#96a9db",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: XAxisStyle.FONTFAMILY,
      // fontSize: XAxisStyle.FONTSIZE,
      // fontWeight: XAxisStyle.FONTWEIGHT,
      // line: "#656565"
      slider: "#586ea6",
      handle: "#586ea688",
    },
    yAxis: {
      colourTick: "#96a9db",
      colourLabel: "#96a9db",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: YAxisStyle.FONTFAMILY,
      // fontSize: YAxisStyle.FONTSIZE,
      // fontWeight: YAxisStyle.FONTWEIGHT,
      // line: "#656565"
    },
    chart: {
      Background: "#2A2B3A",
      BorderColour: "#586ea6",
      BorderThickness: 1,
      GridColour: "#313647",
      TextColour: "#96a9db"
    },
    primaryPane: {

    },
    secondaryPane: {

    },
    time: {
      // font: LegendStyle.font,
      colour: "#96a9db",
      handleColour: "#586ea6",
    },
    legend: {
      colour: "#96a9db",
    },
    icon: {
      colour: "#748bc7",
      hover: "#96a9db"
    }
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: {

  }
}
const config4 = {
  id: "TradeX_test",
  title: "FUN/USDT",
  symbol: "funusdt",
  // width: 1000,
  // height: 800,
  utils: {},
  tools: {},
  timeFrame: "1s",
  range: {
    startTS: state4.ohlcv.slice(-1)[0][0] - (15000),
    initialCnt: 40
  },
  theme: {
    candle: {
      Type: "candle_down_hollow",
      AreaLineColour: "#08C5F5",

      UpBodyColour: "#08C5F588",
      UpWickColour: "#08C5F5",
      DnBodyColour: "#F6243888",
      DnWickColour: "#F62438",
    },
    volume: {
      Height: 15,
      UpColour: "#08C5F544",
      DnColour: "#0805F544",
    },
    xAxis: {
      tickMarker: false,
    },
    yAxis: {
      tickMarker: false,
      location:"left"
    },
    chart: {
      Background: "#141414",
      BorderColour: "#141414",
      GridColour: "#333",
      TextColour: "#ccc"
    },
    primaryPane: {

    },
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
  stream: {
    tfCountDown: false,
    alerts: []
  },
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: state4
}
const config5 = {
  id: "Midnight",
  title: "ETH/USDT",
  symbol: "ethusdt",
  // width: 1000,
  // height: 800,
  utils: {},
  tools: {},
  timeFrame: "5m",
  range: {
    startTS: rangeStartTS,
  },
  theme: {
    candle: {
      Type: "area",
      AreaLineColour: "#4c5fe7",
      AreaFillColour: ["#4c5fe780", "#4c5fe700"],

      UpBodyColour: "#4c5fe7",
      UpWickColour: "#4c5fe7",
      DnBodyColour: "#4c5fe7",
      DnWickColour: "#4c5fe7",
    },
    volume: {
      Height: 15,
      UpColour: "#4bc67c",
      DnColour: "#2e384f",
    },
    xAxis: {
      colourTick: "#6a6f80",
      colourLabel: "#6a6f80",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: XAxisStyle.FONTFAMILY,
      // fontSize: XAxisStyle.FONTSIZE,
      // fontWeight: XAxisStyle.FONTWEIGHT,
      // line: "#656565"
      slider: "#586ea6",
      handle: "#586ea688",
      tickMarker: false,
    },
    yAxis: {
      colourTick: "#6a6f80",
      colourLabel: "#6a6f80",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: YAxisStyle.FONTFAMILY,
      // fontSize: YAxisStyle.FONTSIZE,
      // fontWeight: YAxisStyle.FONTWEIGHT,
      // line: "#656565"
      tickMarker: false,
      location:"left",
    },
    chart: {
      Background: "#0f1213",
      BorderColour: "#00000000",
      BorderThickness: 1,
      GridColour: "#191e26",
      TextColour: "#6a6f80"
    },
    primaryPane: {

    },
    secondaryPane: {

    },
    time: {
      // font: LegendStyle.font,
      colour: "#96a9db",
      handleColour: "#586ea6",
    },
    legend: {
      colour: "#96a9db",
    },
    icon: {
      colour: "#748bc7",
      hover: "#96a9db"
    },
    tools: {
      location: false
    },
    utils: {
      location: false
    }
  },
  watermark: {
    text: "ETH/USDT",
    textColour: "#13171e"
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
}

const configs = [
  {config: config1, stream: null},
  {config: config2, stream: (chart) => {new Stream(chart, interval, null, chart.stream.onTick.bind(chart.stream))}}, // {setInterval(stream.bind(chart), interval)}},
  {config: config3, stream: (chart) => {livePrice_Binance(chart, "btcusdt", config3.timeFrame)}},
  {config: config4, stream: (chart) => {new Stream(chart, interval, null, chart.stream.onTick.bind(chart.stream))}}, // {setInterval(stream.bind(chart), interval)}},
  {config: config5, stream: (chart) => {livePrice_Binance(chart, "ethusdt", config5.timeFrame)}},
  // {config: config5, stream: (chart) => {once(chart)}},
]

const main = DOM.findBySelector('main')
const add = document.querySelector("#add")
      add.onclick = addChart


function addChart() {
  let chart = document.createElement("tradex-chart")
  let section = document.createElement("section")
      section.appendChild(chart)
      main.appendChild(section)

  let {config, stream} = configs[(chart.inCnt) % configs.length]
      chart.start(config)
      window["chart"+chart.inCnt] = chart

  if (typeof chart?.stream?.start === "function") {
    // chart is ready and waiting for a websocket stream
    chart.stream.start()
    if (typeof stream === "function") stream(chart)
  }
}


function test(e) {
  console.log(this.id, e)
}
/*
// const chart = Chart.create(mount, config, state)
const chart = document.createElement("tradex-chart")
chart.id = "test"
document.getElementById("app").appendChild(chart)
window.chart = chart
chart.init(config)
chart.start()

console.log("API: id:", chart.id)
console.log("API: name:", chart.name)
console.log("API: height:", chart.height)

const infoBox = {}
      infoBox.el = DOM.findBySelector('#info')
      infoBox.out = function (info) {
        let inf = `<ul style="color:#FFF; text-align:left;">`
        for (let i in info) {
          inf += `<li>${info[i][0]} <span>${info[i][1]}</span></li>`
        }
        inf += "</ul>"
        infoBox.el.innerHTML = inf
      }

chart.on("setRange", (e) => { infoBox.out(demo.internals()) })
chart.on("chart_pan", (e) => { infoBox.out(demo.internals()) })
chart.on("main_mousemove", (e) => { infoBox.out(demo.internals()) })
infoBox.out(demo.internals())
// test()

let time = chart.range.value()[0]
*/

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}


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

function livePrice_Binance(chart, symbol="btcusdt", interval="1m") {
  // var ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");
  var ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);

  ws.onmessage = (evt) => onWSMessage.call(this, evt, chart)
}

let waiting = false

function kline_Binance(chart, symbol="BTCUSDT", start, limit=100, interval="1m") {
  if (!waiting) {
    waiting = true
    try {
      fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${start}&limit=${limit}`)
      .then(r => r.json())
      .then(d => {
        console.log(d)
        chart.mergeData({ohlcv: d}, false, true)
        waiting = false
      })
    }
    catch(e) {
      console.error(e)
      waiting = false
    }
  }
}

function onWSMessage (evt, chart) {
  var msg = evt.data;
  var obj = JSON.parse(msg);
  if (typeof obj === "object" && obj.k) {

    /* KLine data passed to the chart
      {
        t: timeStamp // timestamp of current candle in milliseconds
        o: open  // open price
        h: high  // high price
        l. low // low price
        c: close  // close price
        v: volume // volume
      }
    */
    // console.log(obj.k)
    chart.stream.onTick(obj.k)
  }
};

function onRangeLimit(e, x) {
  const range = e.chart.range
  const limit = 100
  const start = range.timeStart - (range.interval * limit)
  const end = range.timeEnd
  const interval = range.intervalStr
  if (x == "past") {
    kline_Binance(e.chart, undefined, start, limit, interval)
  }
  if (x == "future") {

  }
}

function once (chart) {
  const tick = {
    t: Date.now(), // timestamp of current candle in milliseconds
    o: 28000,  // open price
    h: 28100,  // high price
    l: 28060,
    c: 28080,  // close price
    v: 3 // volume
  }
  chart.stream.onTick(tick)
  tick.t = Date.now()
  tick.c = 28083
  chart.stream.onTick(tick)
}

function h($,p,c) {console.log(`alert`,$,p[4],c[4])}

function alertTest ($, p, c) {
  if ($ > p[4] && $ < c[4]) return true
  else return false
}

// Add some charts

addChart()
addChart()
addChart()
addChart()
addChart()

// add custom indicator definition
chart0.setIndicators({
  // TEST: {id: "TEST", name: "Custom Indicator", event: "addIndicator", ind: TEST},
  // DMI: {id: "DMI", name: "Directional Movement Indicator", event: "addIndicator", ind: DMI }
})
// chart0.addIndicator("TEST", "Test1", {data: [], settings: {}})
// chart0.addIndicator("DMI", "DMI1", {data: []})
chart0.on("range_limitPast", (e) => onRangeLimit(e, "past"))
chart0.on("range_limitFuture", (e) => onRangeLimit(e, "future"))

// add an alert
if (typeof chart1 === "object") {
  chart1.stream.alerts.add(13010, alertTest, h)
  chart1.on("range_limitPast", (e) => onRangeLimit(e, "past"))
  chart1.on("range_limitFuture", (e) => onRangeLimit(e, "future"))
}
