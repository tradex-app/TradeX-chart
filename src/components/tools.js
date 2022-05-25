// tools.js
// Tools bar that lives at the top of the chart
// Providing: chart drawing tools

import DOM from "../utils/DOM"

import cursor from "../assets/svg/cursor.svg"
import line from "../assets/svg/line.svg"
import fibonacci from "../assets/svg/fibonacci.svg"
import range from "../assets/svg/range.svg"
import text from "../assets/svg/text.svg"
import measure from "../assets/svg/measure.svg"
import del from "../assets/svg/delete.svg"
import { ToolsStyle } from "../definitions/style"
import { CLASS_TOOLS } from "../definitions/core"

export default class ToolsBar {

  #name = "Toolbar"
  #shortName = "tools"
  #mediator
  #options
  #elTools

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elTools = mediator.api.elements.elTools
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

      obj.addEventListener("load", () => {
        let svgObj = obj.contentDocument
        let svg = svgObj.querySelector(`svg`)
        svg.style.fill = ToolsStyle.COLOUR_ICON
      })
    }
  }

  defaultNode() {

    let toolbar = ""
    const tools = this.tools()
    for (const tool in tools) {
      toolbar += this.toolNode(tools[tool].icon)
    }

    return toolbar
  }

  toolNode(icon) {
    const iconStyle = `color: ${ToolsStyle.COLOUR_ICON};`
    return  `
    <div class="icon-wrapper"><object data="${icon}" type="image/svg+xml" class="tool"></object></div>\n
    `
  }

  tools() {
    return {
      cursor: {
        name: "Cursor",
        icon: cursor
      },
      line: {
        name: "Line",
        icon: line,
        sub: {}
      },
      fibonacci: {
        name: "Fibonacci",
        icon: fibonacci,
        sub: {}
      },
      range: {
        name: "Range",
        icon: range,
        sub: {}
      },
      text: {
        name: "Text",
        icon: text,
        sub: {}
      },
      measure: {
        name: "measure",
        icon: measure
      },
      delete: {
        name: "delete",
        icon: del
      }
    }
  }

}