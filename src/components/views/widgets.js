// widgets.js
// <tradex-widgets></tradex-widgets>

import element from "./classes/element"

const template = document.createElement('template')
template.innerHTML = `
  <p>widgets</p>
`

export default class tradeXWidgets extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }
}
