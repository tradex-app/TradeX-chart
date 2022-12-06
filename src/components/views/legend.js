// legend.js
// <tradex-legend></tradex-legend>

import element from "./classes/element"
import { isString } from "../../utils/typeChecks"

const mouseOver = "onmouseover='this.style.opacity=1'"
const mouseOut = "onmouseout='this.style.opacity=0'"
const template = document.createElement('template')
template.innerHTML = `
<style>
  .legend {
    width: 100%; 
    margin: .5em 0 1em 1em; 
    text-align: left;
  }
  .title {
    margin-right: 1em; 
    white-space: nowrap;
  }
  dl {
    display: inline; margin-left: -1em;
  }
  .controls {
    float: right; margin: 0 0.5em 0; opacity:0
  }
</style>
<div class="legend">
  <span class="title"></span>
  <dl></dl>
  <div class="controls" ${mouseOver} ${mouseOut}></div>
</div>
`

export default class tradeXLegend extends element {

  #title
  #elLegend
  #elTitle
  #elInputs
  #elControls

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

      this.#elLegend = this.shadowRoot.querySelector('.legend')
      this.#elTitle = this.shadowRoot.querySelector('.title')
      this.#elInputs = this.shadowRoot.querySelector('dl')
      this.#elControls = this.shadowRoot.querySelector('.controls')
    }
  }

  disconnectedCallback() {
  }

  get elLegend() { return this.#elLegend }
  get elTitle() { return this.#elTitle }
  get elInputs() { return this.#elInputs }
  get elControls() { return this.#elControls }
  get title() { return this.#title }
  set title(t) { this.setTittle(t) }

  setTittle(t) {
    if (!isString) return
    this.#title = t
    this.elTitle.innerHTML = t
  }

  buildInputs(o) {

  }

  buildControls(o) {

  }
}
