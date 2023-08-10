// scale.js
// <tradex-scale></tradex-scale>

import element from "./classes/element"

const template = document.createElement('template')
template.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: -100;
  }
  slot[name="chartpane"] {
    display: flex;
    flex-direction: column;
  }
  ::slotted(div.scale:first-of-type) {
    border-top: none !important;
  }
</style>
<div class="viewport"></div>
<slot name="chartpane" id="chartPane"></slot>
`

export default class tradeXScale extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback()
  }

  disconnectedCallback() {
  }

  get viewport() { return this.shadowRoot.querySelector('.viewport') }
  get chartPanes() { return this.chartPaneSlot.assignedElements() } 
  get chartPaneSlot() { return this.shadowRoot.querySelector('slot[name="chartpane"]') }
}

customElements.get('tradex-scale') || window.customElements.define('tradex-scale', tradeXScale)
