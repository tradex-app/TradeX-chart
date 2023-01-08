import { Chart, DOM } from './src'
import * as talib from "talib-web"
import * as demo from './demo.js'

// import './chart-live.css'

// let state = undefined
import state1 from './data/1hour.json'
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
          19182.2,
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
      BorderColour: "#606060",
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
    chart: {
      Background: "#2A2B3A",
      BorderColour: "#748bc7",
      BorderThickness: 1,
      GridColour: "#313647",
      TextColour: "#96a9db"
    },
    onChart: {
      Background: "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(30,30,46,1) 35%, rgba(79,92,101,1) 100%)"
    },
    offChart: {
      Background: "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(30,30,46,1) 35%, rgba(79,92,101,1) 100%)"
    },
    legend: {
      colour: "#96a9db",
    },
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

const configs = [
  config1,
  config2,
  config3,
  config4,
]

const main = DOM.findBySelector('main')

addChart()
addChart()
addChart()
addChart()


let add = document.querySelector("#add")
    add.onclick = addChart


function addChart() {
  let chart = document.createElement("tradex-chart")
  let section = document.createElement("section")
      section.appendChild(chart)
      main.appendChild(section)
  let config = (chart.inCnt >= configs.length) ? configs[(chart.inCnt + 1) % configs.length] : configs[chart.inCnt]
      chart.init(config)
      window["chart"+chart.inCnt] = chart
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

chart.on("chart_zoom", (e) => { infoBox.out(demo.internals()) })
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
  if (!streamInit) {
    // candle = chart.allData.data[chart.range.dataLength - 1]
    candle = chart.range.value()
    streamInit = true
    time = time + chart.time.timeFrameMS - interval
  }
  else candle = chart.stream.candle // chart.range.value()

  if (candle[4] === null) candle[4] = 1
  if (candle[5] === null) candle[5] = 1

  // let candle = chart.range.value()
  let percent = getRandomInt(0, 1)
  let factor2 = getRandomInt(0, 10) % 2
  let sign = (Math.floor(factor2) === 1) ? 1 : -1
  let price = candle[4] + (candle[4] * (percent / 3000 * sign))
      time += interval
  let quantity = candle[5] * (factor2 / 500)
  let tick = {t: time, p: price, q: quantity}

  chart.stream.onTick(tick)
}

// if (typeof chart.stream.start === "function") {
//   chart.stream.start()
//   const streamTimer = setInterval(stream, interval)
// }




