// viewport.js
// <tradex-viewport></tradex-viewport>

import element from "./classes/element"

const template = document.createElement('template')
template.innerHTML = `
<style>
.scene-canvas {
  display: block;
}
</style>
<slot name="viewportCanvas"></slot>
<canvas class="scene-canvas"></canvas>
`

export default class tradeXViewport extends element {

  #canvasSlot
  #canvas
  #onSlotChange = this.onSlotChange.bind(this)

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#canvasSlot = this.shadowRoot.querySelector('slot[name="viewportCanvas"]')
        this.#canvasSlot.addEventListener("slotchange", this.#onSlotChange)
      }
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.#canvasSlot.removeEventListener("slotchange", this.#onSlotChange)
  }

  get hasCanvasSlot() { return true }
  get canvasSlot() { return this.#canvasSlot  }
  get canvas() { return this.#canvas }

  onSlotChange() {
    this.#canvas = Array.from( this.canvasSlot.assignedElements() ).find(i => i.localName === 'canvas')[0]
  }
}

customElements.get('tradex-viewport') || window.customElements.define('tradex-viewport', tradeXViewport)
