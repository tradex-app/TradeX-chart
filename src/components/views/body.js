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
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${TOOLSW}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: ${SCALEW}px;
    width: calc(100% - ${TOOLSW}px);
    height: 100%;
    min-height: 100%; 
  }
  tradex-scale {
    position: absolute; 
    top: 1px;
    right: 0; 
    width: ${SCALEW}px; 
    height: 100%;
    min-height: 100%; 
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`

const template = document.createElement('template')
// const locations = { left, right, both }
template.innerHTML = right

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
        this.#elTools = this.shadowRoot.querySelector('tradex-tools')
        this.#elMain = this.shadowRoot.querySelector('tradex-main')
        this.#elScale = this.shadowRoot.querySelector('tradex-scale')
      }
    )
  }

  get tools() { return this.#elTools }
  get main() { return this.#elMain }
  get scale() { return this.#elScale }
  get scaleW() { return this.#elScale.width || this.#theme?.scale?.width || SCALEW }
  get toolsW() { return this.#elTools.width || this.#theme?.tools?.width || TOOLSW }


  start(theme) {
    this.#theme = theme
    this.setToolsLocation()
  }

  setYAxisLocation(side=this.#theme?.yAxis?.location) {
    let scaleW = this.scaleW
    let toolsW = (this.#theme?.tools?.location == "none") ? 0 : this.toolsW

    switch (side) {
      case "left":
        this.scale.style.left = `${toolsW}px`
        this.scale.style.right = undefined
        this.main.style.left = `${scaleW + toolsW}px`
        this.main.style.right = undefined
        this.main.style.width = `calc(100% - ${scaleW + toolsW}px)`
        break;
      case "both":
      case "right":
      default:
        this.scale.style.left = undefined
        this.scale.style.right = 0
        this.main.style.left = `${toolsW}px`
        this.main.style.right = undefined
        this.main.style.width = `calc(100% - ${scaleW + toolsW}px)`
        break;
    }
  }

  setToolsLocation(side=this.#theme?.tools?.location) {
    let toolsW = this.toolsW
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
        this.#theme.tools.width = toolsW
        this.tools.style.display = "block"
        this.tools.style.left = undefined;
        this.tools.style.right = 0;
        this.tools.style.width =`${toolsW}px`;
        break;
      case "left":
      default:
        this.#theme.tools.location = "left"
        this.#theme.tools.width = toolsW
        this.tools.style.display = "block"
        this.tools.style.left = 0;
        this.tools.style.right = undefined;
        this.tools.style.width =`${toolsW}px`;
        break;
    }
    this.setYAxisLocation()
  }
}

customElements.get('tradex-body') || window.customElements.define('tradex-body', tradeXBody)
