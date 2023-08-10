// tools.js
// <tradex-tools></tradex-tools>

import element from "./classes/element"
import { ToolsStyle } from "../../definitions/style"

const template = document.createElement('template')
template.innerHTML = `
  <slot></slot>
`

export default class tradeXTools extends element {

  constructor () {
    super(template)
  }

  destroy() {

  }

  disconnectedCallback() {
  }

  get icons() { return this.shadowRoot.querySelector('slot').assignedElements() }

  defaultNode(tools) {
    let toolbar = `
    <style>
      svg {
        height: ${ToolsStyle.ICONSIZE};
        width: ${ToolsStyle.ICONSIZE};
        fill: ${ToolsStyle.COLOUR_ICON};
      }
      svg:hover {
        fill: ${ToolsStyle.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${ToolsStyle.ICONSIZE};
        margin: 0 auto;
      }
    </style>
    `
    for (const tool of tools) {
      toolbar += this.iconNode(tool)
    }

    return toolbar
  }

  iconNode(tool) {
    const menu = ("sub" in tool) ? `data-menu="true"` : ""
    return  `
      <div id="${tool.id}" data-event="${tool.event}" ${menu} class="icon-wrapper">${tool.icon}</div>\n
    `
  }
}

customElements.get('tradex-tools') || window.customElements.define('tradex-tools', tradeXTools)
