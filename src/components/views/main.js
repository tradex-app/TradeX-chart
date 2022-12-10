// main.js
// <tradex-main></tradex-main>

import element from "./classes/element"
import tradeXTime from './time'
import tradeXRows from './rows'

import {
  UTILSH,
  TOOLSW,
  TIMEH,
  SCALEW,
} from "../../definitions/core"
import {
  GlobalStyle
} from "../../definitions/style"

const template = document.createElement('template')
template.innerHTML = `
<style>
  tradex-rows {
    width: 100%;
    height: calc(100% - ${TIMEH}px);
  }
  tradex-time {
    width: calc(100% - ${SCALEW}px);
    height: ${TIMEH};
    border-top: 1px solid;
    border-color: var(--txc-border-color, ${GlobalStyle.COLOUR_BORDER}); 
  }
</style>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`

export default class tradeXMain extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }

  get rows() { return this.shadowRoot.querySelector('tradex-rows') }
  get time() { return this.shadowRoot.querySelector('tradex-time') }
}

window.customElements.define('tradex-main', tradeXMain)
