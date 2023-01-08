// offchart.js
// <tradex-offchart></tradex-offchart>

import element from "./classes/element"
import graph from "./classes/graph"
import {
  GlobalStyle
} from "../../definitions/style"

const template = document.createElement('template')
template.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: inherit;
    background: var(--txc-onchart-background, none);
  }
  tradex-legends {
    position: absolute;
    top: 0;
    left: 0;
    z-index:100;
    width: 100%;
  }
</style>
<tradex-legends></tradex-legends>
<div class="viewport"></div>
`

export default class tradeXOffChart extends element {

  #parent
  #elViewport
  #elLegend
  #elCanvas
  #options

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
      this.#elViewport = this.shadowRoot.querySelector('.viewport')
      this.#elLegend = this.shadowRoot.querySelector('tradex-legends')
    }
  }

  disconnectedCallback() {
  }

  get viewport() { return this.#elViewport }
  get legend() { return this.#elLegend }
}

window.customElements.define('tradex-offchart', tradeXOffChart)
