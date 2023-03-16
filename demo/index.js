import { Chart, DOM } from './tradex-chart.es.js'
import * as talib from "./node_modules/talib-web/lib/index.esm.js"

// import './chart-live.css'

// let state = undefined
import state1 from './data/1hour.js'
import state2 from './data/data_btc_1m.js'
// import state from './data/seconds.json'
// import state from './data/seconds-indicator'

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
"offchart": [
  {
    "name": "RSI, 20",
    "type": "RSI",
    "data": []
  }]
}

let state5 = {
  "ohlcv": [],
  "onchart": [
    {
      "name": "EMA, 25",
      "type": "EMA",
      "data": [],
      "settings": {}
  },
  {
      "name": "EMA, 43",
      "type": "EMA",
      "data": [],
      "settings": {}
  },
  ],
  "offchart": [
    {
      "name": "RSI, 20",
      "type": "RSI",
      "data": []
    }]
}

// let rangeStartTS = 1558429200000 // 21/05/2019, 11:00:00 - 1 hour price
// let rangeStartTS = 1663059600000 // seconds price
let rangeStartTS = undefined
let streamVal = {}
let interval = 500
let streamInit = false

const config1 = {
  id: "TradeX_test",
  title: "BTC/USDT",
  // width: 1000,
  // height: 800,
  utils: {none: true},
  tools: {none: true},
  timeFrame: "1m",
  rangeStartTS: rangeStartTS,
  rangeLimit: 30,
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
    chart: {
      Background: "#141414",
      BorderColour: "#666",
      GridColour: "#303030",
      TextColour: "#c0c0c0"
    },
    onChart: {

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
  state: state1
}
const config2 = {
  id: "TradeX_test",
  title: "TEST/USDT",
  // width: 1000,
  // height: 800,
  utils: {none: true},
  tools: {none: true},
  timeFrame: "1m",
  rangeStartTS: state2.ohlcv.slice(-15)[0][0],
  rangeLimit: 30,
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
    onChart: {

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
  state: state2
}
const config3 = {
  id: "TradeX_Blue",
  title: "BTC/USDT",
  // width: 1000,
  // height: 800,
  utils: {none: true},
  tools: {none: true},
  timeFrame: "1m",
  rangeStartTS: rangeStartTS,
  rangeLimit: 30,
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
    onChart: {

    },
    offChart: {

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
  talib: talib
}
const config4 = {
  id: "TradeX_test",
  title: "FUN/USDT",
  // width: 1000,
  // height: 800,
  utils: {none: true},
  tools: {none: true},
  timeFrame: "1s",
  rangeStartTS: state4.ohlcv.slice(-1)[0][0] - (15000),
  rangeLimit: 30,
  theme: {
    candle: {
      Type: "candle_solid",
      UpBodyColour: "#0805F588",
      UpWickColour: "#0805F5",
      DnBodyColour: "#F6243888",
      DnWickColour: "#F62438",
    },
    volume: {
      Height: 15,
      UpColour: "#F6243844",
      DnColour: "#0805F544",
    },
    chart: {
      Background: "#141414",
      BorderColour: "#666",
      GridColour: "#333",
      TextColour: "#ccc"
    },
    onChart: {

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
  state: state4
}
const config5 = {
  id: "Midnight",
  title: "ETH/USDT",
  // width: 1000,
  // height: 800,
  utils: {none: true},
  tools: {none: true},
  timeFrame: "1m",
  rangeStartTS: rangeStartTS,
  rangeLimit: 30,
  theme: {
    candle: {
      Type: "area",
      AreaFill: true,
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
    onChart: {

    },
    offChart: {

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
  talib: talib
}

const configs = [
  {config: config1, stream: null},
  {config: config2, stream: (chart) => {setInterval(stream.bind(chart), interval)}},
  {config: config3, stream: (chart) => {livePrice_Binance_BTCUSDT(chart)}},
  {config: config4, stream: (chart) => {setInterval(stream.bind(chart), interval)}},
  {config: config5, stream: (chart) => {livePrice_Binance_ETHUSDT(chart)}},
]

const main = DOM.findBySelector('main')
const add = document.querySelector("#add")
      add.onclick = addChart


// Add some charts

addChart()
addChart()
addChart()
addChart()
addChart()


function addChart() {
  let chart = document.createElement("tradex-chart")
  let section = document.createElement("section")
      section.appendChild(chart)
      main.appendChild(section)

  let {config, stream} = configs[(chart.inCnt) % configs.length]
      chart.start(config)
      window["chart"+chart.inCnt] = chart

  if (typeof chart.stream.start === "function") {
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
chart.start(chart.getModID())

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

function stream() {
  let candle 
  let chart = this
  let time = (chart.stream.lastTick) ? chart.stream.lastTick.t : chart.range.value()[0]

  candle = chart.stream.candle
  if (!candle) {
    candle = chart.range.value()
    streamInit = true
    time = time + chart.time.timeFrameMS - interval
  }

  if (candle[4] === null) candle[4] = 1
  if (candle[5] === null) candle[5] = 1

  let percent = getRandomInt(0, 1)
  let factor2 = getRandomInt(0, 10) % 2
  let sign = (Math.floor(factor2) === 1) ? 1 : -1
  let price = candle[4] + (candle[4] * (percent / 3000 * sign))
      time += interval
  let quantity = candle[5] * (factor2 / 500)
  let tick = {t: time, p: price, q: quantity}

  chart.stream.onTick(tick)
}

function livePrice_Binance_BTCUSDT(chart) {
  var ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");    
  ws.onmessage = (evt) => onWSMessage.call(this, evt, chart)
}

function livePrice_Binance_ETHUSDT(chart) {
  var ws = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@aggTrade");    
  ws.onmessage = (evt) => onWSMessage.call(this, evt, chart)
}

function onWSMessage (evt, chart) { 
  
    /*
    {
      "e": "aggTrade",  // Event type
      "E": 123456789,   // Event time
      "s": "BNBBTC",    // Symbol
      "a": 12345,       // Aggregate trade ID
      "p": "0.001",     // Price
      "q": "100",       // Quantity
      "f": 100,         // First trade ID
      "l": 105,         // Last trade ID
      "T": 123456785,   // Trade time
      "m": true,        // Is the buyer the market maker?
      "M": true         // Ignore
    }
    */
    
    var msg = evt.data;
    var obj = JSON.parse(msg);
    if (typeof obj === "object" && obj.T && obj.p && obj.q) { 
      chart.stream.onTick({t: obj.T, p: obj.p, q: obj.q})   
    }
  };
}



