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
} from "../../definitions/style"
import {
  GlobalStyle
} from "../../definitions/style"

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
    right: 0;
    width: calc(100% - ${TOOLSW}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 0; 
    right: 0; 
    width: ${SCALEW}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`

const left = `
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
    right: 0;
    width: calc(100% - ${TOOLSW}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 0; 
    left: ${SCALEW}px; 
    width: ${SCALEW}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-scale></tradex-scale>
<tradex-main></tradex-main>
`

const both = `
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
    right: 0;
    width: calc(100% - ${TOOLSW}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 0; 
    right: 0; 
    width: ${SCALEW}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`

const template = document.createElement('template')
const locations = { left, right, both }
template.innerHTML = right

export default class tradeXBody extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }

  get tools() { return this.shadowRoot.querySelector('tradex-tools') }
  get main() { return this.shadowRoot.querySelector('tradex-main') }
  get scale() { return this.shadowRoot.querySelector('tradex-scale') }

  start(theme) {
    let location = theme?.yAxis?.location
    let keys = Object.keys(locations)
    location = (keys.includes(location)) ? location : "right"
    // this.shadowRoot.innerHTML = locations[location]
    this.setYAxisLocation(location)
  }

  setYAxisLocation(side) {
    switch (side) {
      case "left":
        this.scale.style.left = `${TOOLSW}px`
        this.scale.style.right = undefined
        this.main.style.left = undefined
        this.main.style.right = `-${SCALEW}px`
        break;
      case "both":
      case "right":
      default:
        this.scale.style.left = undefined
        this.scale.style.right = 0
        this.main.style.left = undefined
        this.main.style.right = 0
        break;
    }
  }

}

window.customElements.define('tradex-body', tradeXBody)
