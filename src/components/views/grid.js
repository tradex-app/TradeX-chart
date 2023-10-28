// grid.js
// <tradex-grid></tradex-grid>

import element from "./classes/element"
import tradeXViewport from "./viewport"

const template = document.createElement('template')
template.innerHTML = `
<style>
  tradex-viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <tradex-viewport></tradex-viewport>
`

export default class tradeXGrid extends element {

  #elViewport

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback(
      () => this.#elViewport = this.shadowRoot.querySelector('tradex-viewport')
    )
  }

  get viewport() { return this.#elViewport }

}

customElements.get('tradex-grid') || window.customElements.define('tradex-grid', tradeXGrid)
