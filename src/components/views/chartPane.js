// chartPane.js
// <tradex-chartpane></tradex-chartpane>

import element from "./classes/element"
import tradeXLegends from "./legends"


const template = document.createElement('template')
// position: relative ??? offChart no
// .viewport canvas ??? offChart no
template.innerHTML = `
<style>
  :host {
    overflow: hidden;
  }

  .viewport {
    position: relative;
    width: 100%;
    height: inherit;
    background: var(--txc-chartpane-background, none);
  }
  .viewport canvas {
    position: absolute;
    top: 1px;
  }
  tradex-legends {
    position: absolute;
    top: 0;
    left: 0;
    z-index:100;
    width: 100%;
  }
</style>
<div class="viewport"></div>
<tradex-legends></tradex-legends>
`

export default class tradeXChartPane extends element {

  #elViewport
  #elLegend

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
      this.style.display = "block"
      this.shadowRoot.appendChild(this.template.content.cloneNode(true))
      this.#elViewport = this.shadowRoot.querySelector('.viewport')
      this.#elLegend = this.shadowRoot.querySelector('tradex-legends')
    }
  }

  disconnectedCallback() {
  }

  get viewport() { return this.#elViewport }
  get legend() { return this.#elLegend }
}

customElements.get('tradex-chartpane') || window.customElements.define('tradex-chartpane', tradeXChartPane)
