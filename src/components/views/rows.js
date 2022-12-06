// rows.js
// <tradex-rows></tradex-rows>

import element from "./classes/element"
import tradeXGrid from "./grid"
import tradeXOnChart from "./onChart"
import tradeXOffChart from "./offChart"

import {
  UTILSH,
  TOOLSW,
  TIMEH,
  SCALEW,
} from "../../definitions/core"

window.customElements.define('tradex-gird', tradeXGrid)
window.customElements.define('tradex-onchart', tradeXOnChart)
window.customElements.define('tradex-offchart', tradeXOffChart)

const template = document.createElement('template')
template.innerHTML = `
<style>
  tradex-onchart {
    display: block;
    width: calc(100% - ${SCALEW}px);
    height: 100%;
  }
  tradex-offchart {
    display: none;
    width: 0;
    height: 100%;
  }
</style>
<tradex-grid></tradex-grid>
<tradex-onchart></tradex-onchart>
<tradex-offchart></tradex-offchart>
`

export default class tradeXRows extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }

  get grid() { return this.shadowRoot.querySelector('tradex-grid') }
  get onChart() { return this.shadowRoot.querySelector('tradex-onchart') }
  get offChart() { return this.shadowRoot.querySelector('tradex-offchart') }
}
