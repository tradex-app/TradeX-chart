import { Chart, DOM } from './src'
// import './chart-live.css'

// let state = undefined
// import state from './data/1hour.json'
import state from './data/data_btc_1m.js'
// import state from './data/seconds.json'
// import state from './data/seconds-indicator'

// let state = {
//   "ohlcv": [
//       [
//           1663333201000,
//           19139.4,
//           19139.6,
//           19179.6,
//           19179.63478779,
//           441.1
//       ],
//       [
//           1663333202000,
//           19182.2,
//           19182.2,
//           19120.2,
//           19133.5,
//           445.2
//       ],
//       [
//           1663333203000,
//           19182.2,
//           19182.2,
//           19120.2,
//           19133.5,
//           434.3
//       ]
//   ],
// "offchart": [
//   {
//     "name": "RSI, 20",
//     "type": "RSI",
//     "data": []
//   }]
// }

// let rangeStartTS = 1558429200000 // 21/05/2019, 11:00:00 - 1 hour price
// let rangeStartTS = 1663059600000 // seconds price
let rangeStartTS = undefined
let streamVal = {}
let interval = 500
let streamInit = false

DOM.findBySelector('#app').innerHTML = `
<h2>Stream with Back History</h2>
<button type="button" onclick="window.chart.resize(600, 500)">Resize Chart</button>
<div>
  <div id="test" style="float:left;"></div>
  <div id="info" style="float:left;"></div>
</div>

`
const mount = DOM.findBySelector('#test')
const config = {
  id: "TradeX_test",
  title: "BTC/USDT",
  width: 1000,
  height: 800,
  utils: {none: true},
  tools: {none: true},
  timeFrame: "1m",
  rangeStartTS: rangeStartTS,
  rangeLimit: 30,
  theme: {
    candleType: "CANDLE_SOLID",
    onchartVolumeH: 15,
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
  stream: streamVal,
  maxCandleUpdate: 250
}
const chart = Chart.create(mount, config, state)
// const chart = Chart.create(mount, config)
window.chart = chart
chart.start(chart.getModID())

console.log("API: id:", chart.id)
console.log("API: name:", chart.name)
console.log("API: height:", chart.height)

function internals() {
  const data = {}
  const tx = chart.Timeline.xAxis

  data.rangeLength = [`range.length:`,`${tx.range.Length}`]
  data.rangeIntervalStr = [`range.intervalStr:`,`${tx.range.intervalStr}`]
  data.rangeStart = ["range.indexStart: ", tx.indexStart]
  data.rangeEnd = ["range.indexEnd: ", tx.indexEnd]
  data.rangeStartTS = ["range.indexStart TS: ", new Date(tx.range.value(tx.indexStart)[0])]
  data.rangeEndTS = ["range.indexEnd TS: ", new Date(tx.range.value(tx.indexEnd)[0])]
  data.scrollPos = ["scrollPos:", chart.scrollPos]
  data.bufferPx = ["bufferPx:", chart.bufferPx]
  data.gradsTimeSpan = ["grads.timeSpan: ", tx.xAxisGrads.timeSpan]
  data.gradsUnits = ["grads.units: ", JSON.stringify(tx.xAxisGrads.units)]
  data.mouseXPos = ["mouseXPos:", chart.mousePos.x]
  data.mouseRangePos = ["xPos2Index:", chart.Timeline.xPos2Index(chart.mousePos.x)]


  return data
}

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

chart.on("chart_zoom", (e) => { infoBox.out(internals()) })
chart.on("chart_pan", (e) => { infoBox.out(internals()) })
chart.on("main_mousemove", (e) => { infoBox.out(internals()) })
infoBox.out(internals())
// test()

let time = chart.range.value()[0]

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

if (typeof chart.stream.start === "function") {
  chart.stream.start()
  const streamTimer = setInterval(stream, interval)
}




