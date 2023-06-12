// rows.js
// <tradex-rows></tradex-rows>

import element from "./classes/element"
import tradeXGrid from "./grid"
import tradeXChartPane from "./chartPane"


const template = document.createElement('template')
template.innerHTML = `
<style>
  tradex-grid {
    position: absolute;
    height: inherit;
  }
  tradex-grid {
    display: block;
    width: 100%;
  }
  slot[name="chartpane"] {
    display: flex;
    flex-direction: column;
  }
  ::slotted(tradex-chartpane) {
    display: block;
    position: relative;
    top: 0;
    width: 100%;
  }
  ::slotted(tradex-chartpane:first-of-type) {
    border-top: none !important;
  }
</style>
<tradex-grid></tradex-grid>
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
  get primary() { return Array.from( this.chartPaneSlot.assignedElements() ).find( i => i.classList.contains("onchart") ); }
  get secondary() { return Array.from( this.chartPaneSlot.assignedElements() ).find( i => i.classList.contains("offchart") ); }
  get chartPanes() { return this.chartPaneSlot.assignedElements() } 
  get chartPaneSlot() { return this.shadowRoot.querySelector('slot[name="chartpane"]') }
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
