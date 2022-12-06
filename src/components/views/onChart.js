// onchart.js
// <tradex-onchart></tradex-onchart>

import element from "./classes/element"
import graph from "./classes/graph"
import tradeXLegend from "./legend"
import { bRound } from "../../utils/number"

import {
  UTILSH,
  TOOLSW,
  TIMEH,
  SCALEW,
} from "../../definitions/core"

window.customElements.define('tradex-legend', tradeXLegend)

const template = document.createElement('template')
template.innerHTML = `
<style>
  viewport {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  scale {
    width: ${SCALEW - 1}px; 
    height: 100%; 
    /* border-color: {api.chartBorderColour}; */
  }
  legends {
    position: absolute;
    top: 0;
    left: 0;
    z-index:100;
    width: 100%;
  }
</style>
<div class="viewport"></div>
<tradex-legend></tradex-legend>
`

export default class tradeXOnChart extends element {

  #parent
  #elViewport
  #elLegends
  #elScale
  #elCanvas

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

      this.#elViewport = this.shadowRoot.querySelector('.viewport')
      this.#elLegends = this.shadowRoot.querySelector('.legends')
    }
  }

  disconnectedCallback() {
  }

  get elViewport() { return this.#elViewport }
  get elLegends() { return this.#elLegends }
}
