// tools.js
// Tools bar that lives at the top of the chart
// Providing: chart drawing tools

import DOM from "../utils/DOM"
import { ToolsStyle } from "../definitions/style"
import { CLASS_TOOLS } from "../definitions/core"
import tools from "../definitions/tools"

export default class ToolsBar {

  #name = "Toolbar"
  #shortName = "tools"
  #mediator
  #options
  #elTools
  #tools

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elTools = mediator.api.elements.elTools
    this.#tools = tools || options.tools
    this.init()
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get mediator() {return this.#mediator}
  get options() {return this.#options}

  init() {
    this.mount(this.#elTools)

    this.log(`${this.#name} instantiated`)
  }


  start() {
    this.initAllTools()
  }

  end() {
    
  }

  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context)
  }

  off(topic, handler) {
    this.#mediator.off(topic, handler)
  }

  emit(topic, data) {
    this.#mediator.emit(topic, data)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  initAllTools() {
    const api = this.#mediator.api
    const tools = DOM.findBySelectorAll(`#${api.id} .${CLASS_TOOLS} .icon-wrapper`)
    for (let tool of tools) {

      let id = tool.id.replace('TX_', ''),
          svg = tool.querySelector('svg');
          svg.style.fill = ToolsStyle.COLOUR_ICON
          svg.style.width = "90%"


      for (let u of this.#tools) {
        if (u.id === id)
          svg.addEventListener("click", (e) => {
            u.action(e, this)
          })
      }
    }
  }

  defaultNode() {
    let toolbar = ""
    for (const tool of this.#tools) {
      toolbar += this.iconNode(tool)
    }

    return toolbar
  }

  iconNode(icon) {
    const iconStyle = `display: inline-block; height: ${this.#elTools.clientWidth}px; padding-right: 2px`
    return  `
      <div id="TX_${icon.id}" class="icon-wrapper" style="${iconStyle}">${icon.icon}</div>\n
    `
  }

}