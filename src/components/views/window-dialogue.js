// window-dialogue.js
// <tradex-windowdialogue></tradex-windowdialogue>

import tradeXChartWindow, { defaultTemplate as windowTemplate } from "./window";
import { isFunction } from "../../utils/typeChecks";

const dialogueStyles = `
  :host {
    "box-shadow": "rgb(0,0,0) 0px 20px 30px -10px";
  }
  .content {
    padding: "1em";
  }
  .title {
    padding: "0 1em";
    background: "#333";
  }
  .buttons input {
    margin-left: 5px;
    font-size: 1em;
    padding: 1px 0.5em;
  }
`

const buttonHTML = `
<div class="buttons">
  <input class="submit" type="submit" value="Submit"/>
  <input class="cancel" type="button" value="Cancel"/>
  <input class="default" type="button" value="Default"/>
</div>
`

export const defaultTemplate = ``

const template = document.createElement('template')

template.innerHTML = defaultTemplate

export default class tradeXChartDialgue extends tradeXChartWindow {

  #elSubmit
  #elCancel
  #elDefault

  constructor (template=defaultTemplate) {
    super(template)
  }

  destroy() {

  }

  connectedCallback(fn) {
    super.connectedCallback(
      () => {
        this.elWindow.insertAdjacentHTML("beforeend", buttonHTML)
        this.elStyle.insertAdjacentText("beforeend", dialogueStyles)
        this.#elSubmit = this.shadowRoot.querySelector('.submit')
        this.#elCancel = this.shadowRoot.querySelector('.cancel')
        this.#elDefault = this.shadowRoot.querySelector('.default')

        if (isFunction(fn)) fn()
      }
    )
  }

  disconnectedCallback() {
  }

  get elSubmit() { return this.#elSubmit }
  get elCancel() { return this.#elCancel }
  get elDefault() { return this.#elDefault }
}

customElements.get('tradex-dialogue') || window.customElements.define('tradex-dialogue', tradeXChartDialgue)
