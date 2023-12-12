import element from "./classes/element"
import graph from "./classes/graph"
import tradeXOverview from "./overview"
import { TIMESCALEH, TIMENAVIGATIONH } from "../../definitions/style"

// if (window.customElements.get('tradex-overview') !== undefined)
customElements.get('tradex-overview') || window.customElements.define('tradex-overview', tradeXOverview)

const template = document.createElement('template')
template.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${TIMESCALEH}px;
  }
  tradex-overview {
    height: ${TIMENAVIGATIONH}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`

export default class tradeXTime extends element {

  #elViewport
  #elOverview

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#elViewport = this.shadowRoot.querySelector('.viewport')
        this.#elOverview = this.shadowRoot.querySelector('tradex-overview')        
      }
    )
  }

  get viewport() { return this.#elViewport }
  get overview() { return this.#elOverview }

}

customElements.get('tradex-time') || window.customElements.define('tradex-time', tradeXTime)
