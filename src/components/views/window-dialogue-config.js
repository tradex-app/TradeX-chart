// window-dialogue-config.js
// <tradex-dialogueconfig></tradex-dialogueconfig>

import tradeXChartWindow, { defaultTemplate as windowTemplate } from "./window";
import tradeXChartDialgue, { defaultTemplate as dialogueTemplate } from "./window-dialogue";
import { isFunction } from "../../utils/typeChecks";


const defaultTemplate = ``

const template = document.createElement('template')

template.innerHTML = defaultTemplate

export default class tradeXChartDialogue extends tradeXChartWindow {


  
  constructor (template=defaultTemplate) {
    super(template)
  }

  destroy() {

  }

  connectedCallback(fn) {
    super.connectedCallback(
      () => {
        // do dialogue callback

        if (isFunction(fn)) fn()
      }
    )
  }

  disconnectedCallback() {
  }


}

customElements.get('tradex-dialogue') || window.customElements.define('tradex-dialogue', tradeXChartDialogue)
