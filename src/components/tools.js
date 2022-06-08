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
    const toolObjects = DOM.findBySelectorAll(`#${api.id} .${CLASS_TOOLS} .tool`)
    for (let obj of toolObjects) {

      let id = obj.id.replace('TX_', '');

      obj.addEventListener("load", () => {
        let svgObj = obj.contentDocument,
            svg = svgObj.querySelector(`svg`);
            svg.style.fill = ToolsStyle.COLOUR_ICON

        for (let t of this.#tools) {
          if (t.id === id)
            svg.addEventListener("click", () => {
              t.action()
            })
        }
      })
    }
  }

  defaultNode() {
    let toolbar = ""
    for (const tool of this.#tools) {
      toolbar += this.toolNode(tool)
    }

    return toolbar
  }

  toolNode(tool) {
    // const iconStyle = "display: inline;"
    const objectStyle = "height: 90%; padding-top: 2px;"
    return  `
    <div class="icon-wrapper"><object id="TX_${tool.id}" data="${tool.icon}" type="image/svg+xml" class="tool"></object></div>\n
    `
  }

}