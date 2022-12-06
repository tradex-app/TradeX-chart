// tools.js
// <tradex-tools></tradex-tools>

import element from "./classes/element"

const template = document.createElement('template')
template.innerHTML = `

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
