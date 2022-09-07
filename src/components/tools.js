// tools.js
// Tools bar that lives at the top of the chart
// Providing: chart drawing tools

import DOM from "../utils/DOM"
import { ToolsStyle } from "../definitions/style"
import { CLASS_TOOLS } from "../definitions/core"
import tools from "../definitions/tools"
import Tool from '../tools/tool'
import { timestampDiff } from "../utils/time"
import stateMachineConfig from "../state/state-tools"


export default class ToolsBar {

  #name = "Toolbar"
  #shortName = "tools"
  #mediator
  #options
  #elTools
  #widgets

  #Tool = Tool
  #tools
  #toolClasses = {}
  #activeTool = undefined
  #toolTarget


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
    // build toolbar
    this.initAllTools()
    // add all on and off chart tools
    this.addAllTools()

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.context.origin = this
    this.#mediator.stateMachine = stateMachineConfig
    this.#mediator.stateMachine.start()
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

  eventsListen() {
    this.on("tool_selected", (e) => { this.onToolSelect.bind(this) })
    this.on("tool_deselected", (e) => { this.onToolDeselect.bind(this) })

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
    let evt = e.currentTarget.dataset.event,
        menu = e.currentTarget.dataset.menu || false,
        data = {
          target: e.currentTarget.id,
          menu: menu,
          evt: e.currentTarget.dataset.event,
          tool: e.currentTarget.dataset.tool
        };
        
    // this.emit(evt, data)

    if (menu) this.emit("openMenu", data)
    else {
      this.emit("menuItemSelected", data)
    }
  }

  onToolTargetSelected(target) {
    console.log("tool_targetSelected", target)
    this.#toolTarget = target
  }

  onToolActivated(tool) {
    console.log("Tool activated:", tool)
    this.#activeTool = tool
  }

  onToolSelect(e) {

  }

  onToolDeselect(e) {

  }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  initAllTools() {
    const api = this.#mediator.api
    const tools = DOM.findBySelectorAll(`#${api.id} .${CLASS_TOOLS} .icon-wrapper`)
    for (let tool of tools) {

      let id = tool.id, //.replace('TX_', ''),
          svg = tool.querySelector('svg');
          svg.style.fill = ToolsStyle.COLOUR_ICON
          svg.style.width = "90%"

          console.log(this.#toolClasses)

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

            for (let s of t.sub) {
              this.#toolClasses[s.id] = s.class
            }
          }
          else {
            this.#toolClasses[t.id] = t.class
          }        
        }
      }
      console.log(this.#toolClasses)

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
      <div id="${tool.id}" data-event="${tool.event}" ${menu} class="icon-wrapper" style="${iconStyle}">${tool.icon}</div>\n
    `
  }

  /**
   * add tool to chart row from data state
   * or add as new tool from toolbar
   * @param {class} tool 
   * @param {object} target
   */
  addTool(tool=this.#activeTool, target=this.#toolTarget) {
    let config = {
      name: tool,
      tool: this.#toolClasses[tool]
    }
    let toolInstance = this.#Tool.create(target, config)
    console.log(toolInstance)
    return toolInstance
  }

  addNewTool(tool, target) {
    let t = this.addTool(tool, target)
    this.activeTool = (t)
    this.emit(`tool_active`, t)
    this.emit(`tool_${t.ID}_active`, t)

    // add tool entry to Data State
  }

  // add all on and off chart tools
  addAllTools() {
    // iterate over Data State to add all tools
  }

}