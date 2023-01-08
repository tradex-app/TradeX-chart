// row.js
// <tradex-row></tradex-row>

import element from "./classes/element"

const template = document.createElement('template')
template.innerHTML = `
  <slot name="chartPane"></slot>
`

export default class tradeXWidgets extends element {

  constructor () {
    super(template)
  }

  destroy() {
  }

  disconnectedCallback() {
  }

  get grid() { return this.querySelector('tradex-grid') }
  get onChart() { return this.querySelector('tradex-onchart') }
  get offCharts() { return this.querySelector('tradex-offchart').children }
}
