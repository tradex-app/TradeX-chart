// scale.js
// <tradex-scale></tradex-scale>

import element from "./classes/element"
import graph from "./classes/graph"

const template = document.createElement('template')
template.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: 100%;
  }
</style>
<div class="viewport"></div>
`

export default class tradeXScale extends element {

  #viewport

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
    }
  }

  disconnectedCallback() {
  }

  get viewport() { return this.#viewport}

}

window.customElements.define('tradex-scale', tradeXScale)
