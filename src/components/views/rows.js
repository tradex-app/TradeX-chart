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
} from "../../definitions/style"

const template = document.createElement('template')
template.innerHTML = `
<style>
  tradex-grid, tradex-onchart, tradex-offchart {
    overflow: hidden;
  }
  tradex-grid {
    position: absolute;
    height: inherit;
  }
  tradex-onchart {
    position: relative;
    height: 100%;
  }
  tradex-grid,
  tradex-onchart {
    display: block;
    width: 100%;
  }
  ::slotted(tradex-offchart) {
    display: block;
    position: relative;
    top: 1px;
    width: 100%;
    border-top: 1px solid;
  }
</style>
<tradex-grid></tradex-grid>
<tradex-onchart></tradex-onchart>
<slot name="offchart" id="offchart"></slot>
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
  get offCharts() { return this.shadowRoot.querySelectorAll('tradex-offchart') }
  get offChartSlot() { return this.shadowRoot.querySelector('#offchart') }
}

window.customElements.define('tradex-rows', tradeXRows)
