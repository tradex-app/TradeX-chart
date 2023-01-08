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

const template = document.createElement('template')
template.innerHTML = `
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

}

window.customElements.define('tradex-body', tradeXBody)
