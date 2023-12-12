// body.js
// <tradex-body></tradex-body>

import element from "./classes/element"
import tradeXMain from "./main"
import tradeXTools from "./tools"
import tradeXScale from "./scale"

import {
  UTILSH,
  TOOLSW,
  TIMEH,
  SCALEW,
  CHART_MINH,
} from "../../definitions/style"
import {
  GlobalStyle
} from "../../definitions/style"
import { isNumber } from "../../utils/typeChecks"



const right = `
  tradex-main {
    flex-grow: 1;
    order: 2;
  }
  tradex-scale {
    width: ${SCALEW}px; 
    order: 3;
  }
`

const left = `
  tradex-main {
    flex-grow: 1;
    order: 3;
  }
  tradex-scale {
    width: ${SCALEW}px; 
    order: 2;
  }
`

const both = `
  tradex-main {
    flex-grow: 1;
    order: 3;
  }
  tradex-scale {
    width: ${SCALEW}px; 
    order: 2;
  }
`

const template = document.createElement('template')
const locations = { left, right, both }
const pos = right
const content = `
<style>
  :host {
    display: flex;
    -webkit-align-items: stretch;
    align-items: stretch;
  }
  tradex-main {
    display: grid;
  }
  tradex-tools {
    width: ${TOOLSW}px;
    order: 1;
  }
${pos}
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`
template.innerHTML = content

export default class tradeXBody extends element {

  #theme
  #elTools
  #elMain
  #elScale

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback (
      () => {
        this.style.display = "flex"
        this.#elTools = this.shadowRoot.querySelector('tradex-tools')
        this.#elMain = this.shadowRoot.querySelector('tradex-main')
        this.#elScale = this.shadowRoot.querySelector('tradex-scale')
      }
    )
  }

  get tools() { return this.#elTools }
  get main() { return this.#elMain }
  get scale() { return this.#elScale }

  start(theme) {
    this.#theme = theme
    this.setToolsLocation()
  }

  setYAxisLocation(side=this.#theme?.yAxis?.location) {
    let toolsW = (isNumber(this.#theme?.tools?.width)) ? this.#theme.tools.width : TOOLSW
    let offset

    switch (side) {
      case "left":
        offset = (toolsW == 0) ? 0 : SCALEW
        this.scale.style.left = `${toolsW}px`
        this.scale.style.right = undefined
        this.main.style.left = undefined
        this.main.style.right = `-${offset}px`
        this.main.style.width = `calc(100% - ${toolsW}px)`
        break;
      case "both":
      case "right":
      default:
        offset = (toolsW == 0) ? SCALEW : 0
        this.scale.style.left = undefined
        this.scale.style.right = 0
        this.main.style.left = undefined
        this.main.style.right = `${offset}px`
        this.main.style.width = `calc(100% - ${toolsW}px)`
        break;
    }
  }

  setToolsLocation(side=this.#theme?.tools?.location) {
    this.#theme.tools = this.#theme.tools || {}
    switch(side) {
      case "none":
      case false:
        this.#theme.tools.location = "none"
        this.#theme.tools.width = 0
        this.tools.style.display = "none"
        this.tools.style.width =`0px`;
        break;
      case "right":
        this.#theme.tools.location = "right"
        this.#theme.tools.width = this.#theme?.tools?.width || TOOLSW
        this.tools.style.display = "block"
        this.tools.style.left = undefined;
        this.tools.style.right = 0;
        this.tools.style.width =`${TOOLSW}px`;
        break;
      case "left":
      default:
        this.#theme.tools.location = "left"
        this.#theme.tools.width = this.#theme?.tools?.width || TOOLSW
        this.tools.style.display = "block"
        this.tools.style.left = 0;
        this.tools.style.right = undefined;
        this.tools.style.width =`${TOOLSW}px`;
        break;
    }
    this.setYAxisLocation()
  }
}

customElements.get('tradex-body') || window.customElements.define('tradex-body', tradeXBody)
