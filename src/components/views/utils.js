// utils.js
// <tradex-utils></tradex-utils>

import element from "./classes/element"

const style = `display: inline-block; float: right;`
const template = document.createElement('template')
template.innerHTML = `
  <div class="utilsOptions" style="${style}">
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
}
