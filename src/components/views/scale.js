// scale.js
// <tradex-scale></tradex-scale>

import element from "./classes/element"
import tradeXViewport from "./viewport"


const template = document.createElement('template')
template.innerHTML = `
<style>
  tradex-viewport {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: -100;
  }
  slot[name="chartpane"] {
    display: flex;
    flex-direction: column;
  }
  ::slotted(div.scale:first-of-type) {
    border-top: none !important;
  }
</style>
<tradex-viewport></tradex-viewport>
<slot name="chartpane" id="chartPane"></slot>
`

export default class tradeXScale extends element {

  #elViewport
  #elChartPanes
  #elChartPaneSlot

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#elViewport = this.shadowRoot.querySelector('tradex-viewport')
        this.#elChartPaneSlot = this.shadowRoot.querySelector('slot[name="chartpane"]')
        this.#elChartPanes = this.chartPaneSlot.assignedElements()
  }
    )
  }

  get viewport() { return this.#elViewport }
  get chartPanes() { return this.#elChartPanes } 
  get chartPaneSlot() { return this.#elChartPaneSlot }
}

customElements.get('tradex-scale') || window.customElements.define('tradex-scale', tradeXScale)
