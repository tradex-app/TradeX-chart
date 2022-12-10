// time.js
// <tradex-time></tradex-time>

import element from "./classes/element"
import graph from "./classes/graph"
import tradeXOverview from "./overview"

window.customElements.define('tradex-overview', tradeXOverview)

const template = document.createElement('template')
template.innerHTML = `
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`

export default class tradeXTime extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }

  createGraph() {
    
  }

  get viewport() { return this.shadowRoot.querySelector('.viewport') }
  get overview() { return this.shadowRoot.querySelector('tradex-overview') }

}

window.customElements.define('tradex-time', tradeXTime)
