// offchart.js
// <tradex-offchart></tradex-offchart>

import element from "./classes/element"
import graph from "./classes/graph"

import {
  UTILSH,
  TOOLSW,
  TIMEH,
  SCALEW,
} from "../../definitions/core"

const template = document.createElement('template')
template.innerHTML = `
<style>
  viewport {
    width: 100%;
    height: 100%;
  }
  <scale>
    width: ${SCALEW - 1}px; 
    height: 100%; 
    /* border-color: {api.chartBorderColour}; */
  </scale>
  <legends>
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index:100;
  </legends>
</style>
<div class="viewport"></div>
<div class="legends"></div>
<div class="scale"></div>
`

export default class tradeXOffChart extends element {

  #parent
  #elViewport
  #elLegends
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
      this.style.display = "none"
    }
  }

  disconnectedCallback() {
  }

  get elViewport() { return this.#elViewport }
  get elLegends() { return this.#elLegends }

}
