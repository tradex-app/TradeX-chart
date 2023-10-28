// main.js
// <tradex-main></tradex-main>

import element from "./classes/element"
import tradeXTime from './time'
import tradeXRows from './rows'

import {
  TIMEH,
  SCALEW,
  GlobalStyle
} from "../../definitions/style"
import { isNumber } from "../../utils/typeChecks"

const template = document.createElement('template')
template.innerHTML = `
<style>
  #viewport {
    position: absolute;
    width: 100%;
    height: inherit;
    background: var(--txc-chartpane-background, none);
    z-index: 0;
  }
  #viewport canvas {
    position: absolute;
    // top: 1px;
  }
  tradex-rows {
    position:relative;
    overflow: hidden;
    width: calc(100% - ${SCALEW}px);
    height: calc(100% - ${TIMEH}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${GlobalStyle.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${SCALEW}px);
    height: ${TIMEH}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`

export default class tradeXMain extends element {

  #elYAxis
  #theme

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }

  get viewport() { return this.shadowRoot.querySelector('#viewport') }
  get rows() { return this.shadowRoot.querySelector('tradex-rows') }
  get time() { return this.shadowRoot.querySelector('tradex-time') }

  start(theme) {
    this.#theme = theme
    this.setMain()
  }

  rowNode(type, api) {
    const styleRow = `` //` border-top: 1px solid ${api.theme.secondaryPane.separator};`
    const node = `
      <tradex-chartpane slot="chartpane" class="${type}" style="${styleRow}">
      </tradex-chartpane>
    `
    return node
  }

  setMain() {
    let timeH = (isNumber(this.#theme?.time?.height)) ? this.#theme.time.height : TIMEH
    let offset = (this.#theme.tools.location == "none") ? 60 : 0
    this.rows.style.height = `calc(100% - ${timeH}px)`
    this.rows.style.left = `${offset}px`
    this.time.style.left = `${offset}px`
    this.viewport.style.left = `${offset}px`
  }

}

customElements.get('tradex-main') || window.customElements.define('tradex-main', tradeXMain)
