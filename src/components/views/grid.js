// grid.js
// <tradex-grid></tradex-grid>

import element from "./classes/element"
import graph from "./classes/graph"

const template = document.createElement('template')
template.innerHTML = `
  <div class="viewport"></div>
`

export default class tradeXGrid extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }

  get viewport() { return this.shadowRoot.querySelector('.viewport') }

}
