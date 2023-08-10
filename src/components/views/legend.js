// legend.js
// <tradex-legend></tradex-legend>

import element from "./classes/element"

const template = document.createElement('template')
template.innerHTML = `
<style>
</style>
<div class="legend">
  <div class="lower">
  </div>
  <div class="upper">
  </div>
</div>
`

export default class tradeXLegend extends element {

  constructor () {
    super(template)
  }

  destroy() {
    this.doInit = false
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.style.display = "block"
  }

  connectedCallback() {
    // element building must be done here
    // https://stackoverflow.com/a/43837330/15109215
    if (this.doInit) {

    }
  }
}

customElements.get('tradex-legend') || window.customElements.define('tradex-legend', tradeXLegend)
