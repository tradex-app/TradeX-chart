// window.js
// <tradex-window></tradex-window>

import element from "./classes/element"
import { WindowStyle } from "../../definitions/style"
import { isFunction } from "../../utils/typeChecks"


export const defaultTemplate = `
<style>
/** default Window widget styles */

:host {
  border: 1px solid ${WindowStyle.COLOUR_BORDER};
  border-radius: 5px;
  box-shadow: ${WindowStyle.SHADOW};
  background: ${WindowStyle.COLOUR_BG};
  color: ${WindowStyle.COLOUR_TXT};
  position: absolute; 
  z-index: 100; 
  display: block;
}

.dragBar {
  cursor: grab;
  touch-action: none; 
  user-select: none; 
  -webkit-user-drag: none; 
  -webkit-tap-highlight-color: 
  rgba(0, 0, 0, 0); 
  outline: none;
}

.dragBar:hover {
  background: #222;
}

.dragBar .title {
  ${WindowStyle.TITLE}
}

.content {
  ${WindowStyle.CONTENT}
}
</style>
  <div class="dragBar">
  <div class="title"></div>
  <div class="content"></div>
`

const template = document.createElement('template')

template.innerHTML = defaultTemplate

export default class tradeXChartWindow extends element {

  #elDragBar
  #elTitle
  #elContent
  #elStyle

  constructor (template=defaultTemplate) {
    super(template)
  }

  destroy() {

  }

  connectedCallback(fn) {
    super.connectedCallback(
      () => {
        this.#elDragBar = this.shadowRoot.querySelector('.dragBar')
        this.#elTitle = this.shadowRoot.querySelector('.title')
        this.#elContent = this.shadowRoot.querySelector('.content')
        this.#elStyle = this.shadowRoot.querySelector('style')

        if (isFunction(fn)) fn()
      }
    )
  }

  disconnectedCallback() {
  }

  get elWindow() { return this }
  get elDragBar() { return this.#elDragBar }
  get elTitle() { return this.#elTitle }
  get elContent() { return this.#elContent }
  get elStyle() { return this.#elStyle }
}

customElements.get('tradex-window') || window.customElements.define('tradex-window', tradeXWindow)
