import { create, DOM } from './src/'

import './style.css'

DOM.findBySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  <div id="test"></div>
`
const mount = DOM.findByID('test')
create(mount)

