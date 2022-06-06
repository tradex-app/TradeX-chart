import { Chart, DOM } from './src/'
import './style.css'

import state from './data/data.json'

DOM.findBySelector('#app').innerHTML = `
  <!-- 
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  -->
  <div id="test" style=""></div>
`
const mount = DOM.findBySelector('#test')
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
  warnings: true,
  errors: true,
}
const chart = Chart.create(mount, props, state )
chart.start(chart.getModID())

// test()

