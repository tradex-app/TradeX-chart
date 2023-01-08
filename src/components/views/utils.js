// utils.js
// <tradex-utils></tradex-utils>

import element from "./classes/element"

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`

export default class tradeXUtils extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }

  get icons() { return this.shadowRoot.querySelector('slot').assignedElements()[0].children }
}

window.customElements.define('tradex-utils', tradeXUtils)
