// main.js
// <tradex-main></tradex-main>

import element from "./classes/element"
import tradeXTime from './time'
import tradeXRows from './rows'

import {
  UTILSH,
  TOOLSW,
  TIMEH,
  SCALEW,
  STYLE_ROWS,
  STYLE_ROW,
  STYLE_TIME,
  STYLE_SCALE,
  GlobalStyle
} from "../../definitions/style"

const template = document.createElement('template')
template.innerHTML = `
<style>
  #viewport {
    position: absolute;
    width: 100%;
    height: inherit;
    background: var(--txc-onchart-background, none);
    z-index: 0;
  }
  #viewport canvas {
    position: absolute;
    top: 1px;
  }
  tradex-rows {
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

  rowNode(type, api) {
    const styleRow = ` border-top: 1px solid ${api.theme.chart.BorderColour};`
    const node = `
      <tradex-offchart slot="offchart" class="${type}" style="${styleRow}">
      </tradex-offchart>
    `
    return node
  }

}

window.customElements.define('tradex-main', tradeXMain)
