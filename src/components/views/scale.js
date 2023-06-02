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
<slot name="chartpane" id="chartPane"></slot>
`

export default class tradeXScale extends element {

  #viewport
  #chartPaneSlot

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
      this.#chartPaneSlot = this.shadowRoot.querySelector('#chartPane')
    }
  }

  disconnectedCallback() {
  }

  get viewport() { return this.#viewport}
  get chartPanes() { return this.shadowRoot.querySelectorAll('.scale') }
  get chartPaneSlot() { return this.#chartPaneSlot }
}

customElements.get('tradex-scale') || window.customElements.define('tradex-scale', tradeXScale)
