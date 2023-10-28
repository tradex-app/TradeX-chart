// utils.js
// <tradex-utils></tradex-utils>

import element from "./classes/element"
import { UtilsStyle } from "../../definitions/style"

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`

export default class tradeXUtils extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  get icons() { return this.shadowRoot.querySelector('slot').assignedElements()[0].children }

  defaultNode(utils) {
    // let utilsBar = ""
    let style = `display: inline-block; float: right;`
    let utilsBar = `
    <div style="${style}">
    <style>
      svg {
        height: ${UtilsStyle.ICONSIZE};
        fill: ${UtilsStyle.COLOUR_ICON};
      }
    </style>
    `
    for (const util of utils) {
      utilsBar += this.iconNode(util)
    }

    return utilsBar + "</div>"
  }

  iconNode(util) {
    const iconStyle = `display: inline-block; height: ${UtilsStyle.ICONSIZE}; padding-top: 2px`
    const menu = ("sub" in util) ? `data-menu="true"` : ""
    return  `
      <div id="TX_${util.id}" data-event="${util.event}" ${menu} class="icon-wrapper" style="${iconStyle}">${util.icon}</div>\n
    `
  }
}

customElements.get('tradex-utils') || window.customElements.define('tradex-utils', tradeXUtils)
