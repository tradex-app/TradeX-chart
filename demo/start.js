// const { Chart } = require("../dist/tradex-chart.es.js")
// const state = require ('../data/data.json')
import { Chart } from "../dist/tradex-chart.es.js"
import state from '../data/data.json'

const mount = document.getElementById('test')
const props = {
  id: "TradeX_test",
  title: "BTC/USDT",
  width: 1000,
  height: 800,
  rangeLimit: 100,
  theme: {
    candleType: "CANDLE_SOLID",
    onchartVolumeH: 15,
  },
  isCrypto: true,
  logs: true,
  infos: true,
  warnings: true,
  errors: true,
}
const chart = Chart.create(mount, props, state )
chart.start(chart.getModID())
