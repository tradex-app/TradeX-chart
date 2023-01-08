// scale.js
// <tradex-scale></tradex-scale>

import element from "./classes/element"

const template = document.createElement('template')
template.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: 100%;
    margin-top: 2px;
    margin-left: 2px;
  }
</style>
<div class="viewport"></div>
<slot name="offchart" id="offchart"></slot>
`

export default class tradeXScale extends element {

  #viewport
  #offChartSlot

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    // element building must be done here
    // https://stackoverflow.com/a/43837330/15109215
    if (this.doInit) {
      this.doInit = false
      this.shadowRoot.appendChild(this.template.content.cloneNode(true))
      this.style.display = "block"

      this.#viewport = this.shadowRoot.querySelector('.viewport')
      this.#offChartSlot = this.shadowRoot.querySelector('#offchart')
    }
  }

  disconnectedCallback() {
  }

  get viewport() { return this.#viewport}
  get offCharts() { return this.shadowRoot.querySelectorAll('tradex-offchart') }
  get offChartSlot() { return this.#offChartSlot }
}

window.customElements.define('tradex-scale', tradeXScale)
