// main.js
// <tradex-main></tradex-main>

import element from "./classes/element"
import tradeXTime from './time'
import tradeXRows from './rows'

import {
  TIMESCALEH,
  TIMEH,
  SCALEW,
  GlobalStyle,
  STYLE_ROW
} from "../../definitions/style"
import { isNumber } from "../../utils/typeChecks"

const template = document.createElement('template')
template.innerHTML = `
<style>
  :host {
    display: grid;
    grid-row-gap: 0;
    grid-template-rows: 1fr ${TIMESCALEH}px;
  }
  #viewport {
    position: absolute;
    width: 100%;
    height: inherit;
    background: var(--txc-chartpane-background, none);
    z-index: 0;
  }
  #viewport canvas {
    position: absolute;
  }
  tradex-rows {
    display: grid;
    grid-row: 1/2;
    overflow: hidden;
    width: 100%;
    border: 1px solid;
    border-color: var(--txc-border-color, ${GlobalStyle.COLOUR_BORDER}); 
  }
  tradex-time {
    grid-row: 2/3;
    width: 100%;
    overflow: hidden;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`

export default class tradeXMain extends element {

  #elRows
  #elTime
  #elViewPort
  #theme

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#elViewPort = this.shadowRoot.querySelector('#viewport')
        this.#elRows = this.shadowRoot.querySelector('tradex-rows')
        this.#elTime = this.shadowRoot.querySelector('tradex-time')
        // this.style.display = "grid"
      })
  }

  disconnectedCallback() {
  }
  get viewport() { return this.#elViewPort }
  get rows() { return this.#elRows }
  get time() { return this.#elTime }

  start(theme) {
    this.#theme = theme
    this.setMain()
  }

  rowNode(type, style="", api) {
    const node = `
      <tradex-chartpane slot="chartpane" class="${type}" style="${style}">
      </tradex-chartpane>
    `
    return node
  }

  scaleNode(type) {
    const styleRow = STYLE_ROW + ` width: 100%;`
    const node = `
    <div slot="chartpane" class="viewport scale ${type}" style="$${styleRow}"></div>
  `
    return node
  }

  addRow(type, style="", api, height) {
    let row
    let node = this.rowNode(type, style, api)
    this.#elRows.insertAdjacentHTML("beforeend", node)
    row = this.#elRows.chartPaneSlot.assignedElements().slice(-1)[0]
    row.style.height = `${height}px`
    return row
  }

  removeRow(id) {
    const row = this.shadowRoot.querySelector(`#${id}`)
    if (!!row) {
      row.remove()
      return true
    }
    else return false
  }

  setMain() {
    let timeH = (isNumber(this.#theme?.time?.height)) ? this.#theme.time.height : TIMEH
    this.style.gridTemplateRows = `1fr ${timeH}px`
  }

}

customElements.get('tradex-main') || window.customElements.define('tradex-main', tradeXMain)
