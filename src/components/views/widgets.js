// widgets.js
// <tradex-widgets></tradex-widgets>

import element from "./classes/element"
// import tradeXColourPicker from "./colourPicker"

const template = document.createElement('template')
template.innerHTML = `
  <slot name="widget"></slot>
`

export default class tradeXWidgets extends element {

  constructor () {
    super(template)
  }

  destroy() {
  }

}

customElements.get('tradex-widgets') || window.customElements.define('tradex-widgets', tradeXWidgets)
