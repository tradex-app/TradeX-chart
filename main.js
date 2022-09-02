import { Chart, DOM } from './src/'
import './style.css'

import state from './data/data.json'

DOM.findBySelector('#app').innerHTML = `
  <!-- 
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  -->
  <button type="button" onclick="window.chart.resize(600, 500)">Resize Chart</button>
  <div id="test" style="float:left;"></div>
  <div id="info" style="float:left;"></div>
`
const mount = DOM.findBySelector('#test')
const config = {
  id: "TradeX_test",
  title: "BTC/USDT",
  width: 1000,
  height: 800,
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
}
const chart = Chart.create(mount, config, state )
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
  data.rangeStart = ["range.indexStart: ", new Date(tx.range.value(tx.indexStart)[0])]
  data.rangeEnd = ["range.indexEnd: ", new Date(tx.range.value(tx.indexEnd)[0])]
  data.scrollPos = ["scrollPos:", chart.scrollPos]
  data.bufferPx = ["bufferPx:", chart.bufferPx]
  data.gradsTimeSpan = ["grads.timeSpan: ", tx.xAxisGrads.timeSpan]
  data.gradsUnits = ["grads.units: ", JSON.stringify(tx.xAxisGrads.units)]
  data.gradsMajor = ["grads.major: ", tx.xAxisGrads.majorTick]
  data.gradsMinor = ["grads.minor: ", tx.xAxisGrads.minorTick]
  data.gradsInc = ["grads.inc: ", tx.xAxisGrads.inc]
  // data.gradsValues = ["grads.values: ", JSON.stringify(tx.xAxisGrads.values)]

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
infoBox.out(internals())
// test()

let tick = chart.range.value()
let interval = 1000

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

function stream() {
  let percent = getRandomInt(0, 100)
  let sign = getRandomInt(0, 100) % 2
  if (sign === 0) percent = percent * -1
  let price = tick[4] + (tick[4] * (percent / 100))
  let time = tick[0] + interval

}

const streamTimer = setInterval(stream, interval)



