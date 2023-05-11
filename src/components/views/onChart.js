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
} from "../../definitions/style"

const template = document.createElement('template')
template.innerHTML = `
<style>
  .viewport {
    position: relative;
    width: 100%;
    height: inherit;
    background: var(--txc-onchart-background, none);
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

export default class tradeXOnChart extends element {

  #parent
  #elViewport
  #elLegend
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
      this.#elLegend = this.shadowRoot.querySelector('tradex-legends')
    }
  }

  disconnectedCallback() {
  }

  get viewport() { return this.#elViewport }
  get legend() { return this.#elLegend }
}

customElements.get('tradex-onchart') || window.customElements.define('tradex-onchart', tradeXOnChart)
