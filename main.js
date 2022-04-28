import { Chart, DOM } from './src/'

import './style.css'

DOM.findBySelector('#app').innerHTML = `
  <!-- 
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  -->
  <div id="test" style=""></div>
`
const mount = DOM.findByID('test')
const props = {
  logs: true,
  warnings: true,
  errors: true,
}
const chart = Chart.create(mount)

