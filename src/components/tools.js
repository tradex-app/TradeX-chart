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
  #widgets


  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elTools = mediator.api.elements.elTools
    this.#tools = tools || options.tools
    this.#widgets = this.#mediator.api.core.WidgetsG
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
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elTools) }

  init() {
    this.mount(this.#elTools)

    this.log(`${this.#name} instantiated`)
  }


  start() {
    this.initAllTools()
  }

  end() {
    // remove event listeners
    const api = this.#mediator.api
    const tools = DOM.findBySelectorAll(`#${api.id} .${CLASS_TOOLS} .icon-wrapper`)
    for (let tool of tools) {
      for (let t of this.#tools) {
        if (t.id === id)
          tool.removeEventListener("click", this.onIconClick)
      }
    }
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

  onIconClick(e) {
    let id = e.currentTarget.id,
        evt = e.currentTarget.dataset.event,
        menu = e.currentTarget.dataset.menu || false
    this.emit(evt, id)

    if (menu) this.emit("openMenu", {id, evt, menu})

    // TODO: remove
    console.log(`Tools: ${evt} ${id}`)
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


      for (let t of this.#tools) {
        if (t.id === id) {
          tool.addEventListener("click", this.onIconClick.bind(this))
          if (t?.sub) {
            let config = {
              content: t.sub,
              primary: tool
            }
            let menu = this.#widgets.insert("Menu", config)
            tool.dataset.menu = menu.id
            menu.start()
          }
        }
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

  iconNode(tool) {
    const iconStyle = `display: inline-block; height: ${this.#elTools.clientWidth}px; padding-right: 2px`
    const menu = ("sub" in tool) ? `data-menu="true"` : ""
    return  `
      <div id="TX_${tool.id}" data-event="${tool.event}" ${menu} class="icon-wrapper" style="${iconStyle}">${tool.icon}</div>\n
    `
  }

}