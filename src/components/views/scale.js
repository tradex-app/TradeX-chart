// scale.js
// <tradex-scale></tradex-scale>

import element from "./classes/element"
import graph from "./classes/graph"

const template = document.createElement('template')
template.innerHTML = `
<style>
p{
  color: var(--txc-color)
}
</style>

`

export default class tradeXScale extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }
}
