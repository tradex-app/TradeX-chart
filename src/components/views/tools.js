// tools.js
// <tradex-tools></tradex-tools>

import element from "./classes/element"

const template = document.createElement('template')
template.innerHTML = `
  <slot></slot>
`

export default class tradeXTools extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }
}

window.customElements.define('tradex-tools', tradeXTools)
