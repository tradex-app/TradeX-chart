// body.js
// <tradex-body></tradex-body>

import element from "./classes/element"
import tradeXMain from "./main"
import tradeXTools from "./tools"
import tradeXScale from "./scale"

import {
  TOOLSW,
  SCALEW,
} from "../../definitions/style"
import { isNumber } from "../../utils/typeChecks"


const template = document.createElement('template')
const content = `
<style>
  :host {
    display: grid;
    grid-column-gap: 0;
    grid-template-columns: 0 0 1fr ${SCALEW}px 0;
    grid-template-rows: 1fr;
  }
  tradex-main, tradex-scale, tradex-tools {
    max-height: 100%;
    min-height: 100%;
    overflow: hidden;
  }
  tradex-tools {
    grid-column: 1/2;
  }
  tradex-scale:first-of-type {
    grid-column: 2/3;
  }
  tradex-main {
    grid-column: 3/4;
  }
  tradex-scale:last-of-type {
    grid-column: 4/5;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-scale></tradex-scale>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`
template.innerHTML = content

export default class tradeXBody extends element {

  #theme
  #elTools
  #elMain
  #elScale
  #elScale2
  #gridTemplateColumns = {
    toolsLeft: `${TOOLSW}px`,
    scaleLeft: `0`,
    main: `1fr`,
    scaleRight: `${TOOLSW}px`,
    toolsRight: `0`
  }

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback (
      () => {
        this.style.display = "grid"
        this.#elTools = this.shadowRoot.querySelector('tradex-tools')
        this.#elMain = this.shadowRoot.querySelector('tradex-main')
        this.#elScale = this.shadowRoot.querySelectorAll('tradex-scale')[1]
        this.#elScale2 = this.shadowRoot.querySelectorAll('tradex-scale')[0]
      }
    )
  }

  get tools() { return this.#elTools }
  get main() { return this.#elMain }
  get scale() { return this.#elScale }
  get scaleW() { return this.#elScale.width || this.#theme?.scale?.width || SCALEW }
  get scale2W() { return this.#elScale.width || this.#theme?.scale?.width || SCALEW }
  get toolsW() { return this.#elTools.width || this.#theme?.tools?.width || TOOLSW }


  start(theme) {
    this.#theme = theme
    this.setToolsLocation()
  }

  setYAxisWidth(width=this.scaleW) {
    width = (isNumber(width)) ? width : this.scaleW
    this.setYAxisLocation(undefined, width)
  }

  setYAxisLocation(side=this.#theme?.yAxis?.location, width=this.scaleW) {
    switch (side) {
      case "left":
        this.#gridTemplateColumns.scaleLeft = `${width}px`
        this.#gridTemplateColumns.scaleRight = `0`
        this.#elScale.style.gridColumn = "2/3"
        this.#elScale2.style.gridColumn = "4/5"
        this.#elScale.style.display = "block"
        this.#elScale2.style.display = "none"
        break;
      case "both":
        this.#gridTemplateColumns.scaleLeft = `${width}px`
        this.#gridTemplateColumns.scaleRight = `${width}px`
        this.#elScale.style.gridColumn = "4/5"
        this.#elScale2.style.gridColumn = "2/3"
        this.#elScale.style.display = "block"
        this.#elScale2.style.display = "block"

        break;
      case "right":
      default:
        this.#gridTemplateColumns.scaleLeft = `0`
        this.#gridTemplateColumns.scaleRight = `${width}px`
        this.#elScale.style.gridColumn = "4/5"
        this.#elScale2.style.gridColumn = "2/3"
        this.#elScale.style.display = "block"
        this.#elScale2.style.display = "none"
        break;
    }
    this.setGridColumns()
  }

  setToolsLocation(side=this.#theme?.tools?.location) {
    let toolsW = (this.#theme?.tools?.location == "none") ? 0 : this.toolsW
    switch(side) {
      case "none":
      case false:
        this.#gridTemplateColumns.toolsLeft = `0`
        this.#gridTemplateColumns.toolsRight = `0`
        this.#elTools.style.display = "none"
        break;
      case "right":
        this.#gridTemplateColumns.toolsLeft = `0`
        this.#gridTemplateColumns.toolsRight = `${toolsW}px`
        this.#elTools.style.gridColumn = "1/2"
        this.#elTools.style.display = "block"
        break;
      case "left":
      default:
        this.#gridTemplateColumns.toolsLeft = `${toolsW}px`
        this.#gridTemplateColumns.toolsRight = `0`
        this.#elTools.style.gridColumn = "5/6"
        this.#elTools.style.display = "block"
        break;
    }
    this.setGridColumns()
  }

  setGridColumns() {
    this.style.gridTemplateColumns = Object.values(this.#gridTemplateColumns).join(" ")
  }
}

customElements.get('tradex-body') || window.customElements.define('tradex-body', tradeXBody)
