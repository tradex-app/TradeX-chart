// legend.js
// <tradex-legends></tradex-legends>

import element from "./classes/element"
import { isString } from "../../utils/typeChecks"
import { close, up, down, restore, maximize, collapse, config } from "../../definitions/icons"


const mouseOver = "onmouseover='this.style.opacity=1'"
const mouseOut = "onmouseout='this.style.opacity=0'"
const template = document.createElement('template')
template.innerHTML = `
<style>
  ::slotted(.legend) {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    white-space: nowrap;
    width: calc(100% - 1em); 
    margin: 0 0 0 1em;
    text-align: left;
  }
</style>
<div class="legends">
  <slot name="legend"></slot>
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
    let i = 0,
        inp = "",
        input,
        styleDT = "display: inline; margin-left: 1em;",
        styleDD = "display: inline; margin-left: .25em;";
    for (input in o.inputs) {
      let colour = (o.colours?.[i]) ? ` color: ${o.colours[i]};` : ""
      let inputV = (o.inputs[input] !== undefined) ? o.inputs[input] : "---"
      inp +=
      `<dt style="${styleDT}">${input}:</dt>
      <dd style="${styleDD}${colour}">${inputV}</dd>`;
      ++i
    }
    return inp
  }

  buildControls(o) {
    let inp = "";
    let id = o.ID

    // visibility
    if (o?.type !== "chart") {
      // move up
      inp += `<span id="${id}_up" class="control">${up}</span>`
      // move down
      inp += `<span id="${id}_down" class="control">${down}</span>`
    }
    // collapse
    inp += `<span id="${id}_collapse" class="control">${collapse}</span>`
    // maximize
    inp += `<span id="${id}_maximize" class="control">${maximize}</span>`
    // restore
    inp += `<span id="${id}_restore" class="control">${restore}</span>`
    // remove
    inp += (o?.type !== "chart") ? `<span id="${id}_remove" class="control">${close}</span>` : ``
    // config
    inp += `<span id="${id}_config" class="control">${config}</span>`

    return inp
  }
}

window.customElements.define('tradex-legends', tradeXLegend)
