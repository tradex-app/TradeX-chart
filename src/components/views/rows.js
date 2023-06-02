// rows.js
// <tradex-rows></tradex-rows>

import element from "./classes/element"
import tradeXGrid from "./grid"
import tradeXChartPane from "./chartPane"


const template = document.createElement('template')
template.innerHTML = `
<style>
  tradex-grid, tradex-chartpane {
    overflow: hidden;
  }
  tradex-grid {
    position: absolute;
    height: inherit;
  }
  tradex-chartpane.primary {
    position: relative;
    height: 100%;
  }
  tradex-grid,
  tradex-onchart {
    display: block;
    width: 100%;
  }
  ::slotted(tradex-chartpane) {
    display: block;
    position: relative;
    top: 1px;
    width: 100%;
    border-top: 1px solid;
  }
</style>
<tradex-grid></tradex-grid>
<tradex-chartpane id="primary"></tradex-chartpane>
<slot name="chartpane" id="chartpane"></slot>
`

export default class tradeXRows extends element {

  #oWidth
  #oHeight
  #widthCache
  #heightCache

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback()
    this.previousDimensions()
  }

  disconnectedCallback() {
  }

  get grid() { return this.shadowRoot.querySelector('tradex-grid') }
  get primary() { return this.shadowRoot.querySelector('#primary') }
  get chartPanes() { return this.shadowRoot.querySelectorAll('tradex-chartpane') }
  get chartPaneSlot() { return this.shadowRoot.querySelector('#chartpane') }
  get width() { return this.clientWidth }
  get height() { return this.clientHeight }
  get oWidth() { return this.#oWidth }
  get oHeight() { return this.#oHeight }
  get widthDeltaR() { return this.clientWidth / this.#oWidth }
  get heightDeltaR() { return this.clientHeight / this.#oHeight }

  previousDimensions() {
    this.#oWidth = (this.#widthCache) ? this.#widthCache : this.clientWidth
    this.#oHeight = (this.#heightCache) ? this.#heightCache : this.clientHeight
    this.#widthCache = this.clientWidth
    this.#heightCache = this.clientHeight
  }
}

customElements.get('tradex-rows') || window.customElements.define('tradex-rows', tradeXRows)
