// tools.js
// Tools bar
// Providing: chart drawing tools

import { elementDimPos } from "../utils/DOM"
import tools from "../definitions/tools"
import Tool from "./overlays/chart-tools"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-tools"
import { ToolsStyle } from "../definitions/style"
import { idSanitize } from "../utils/utilities"


/**
 * Provides the drawing tools for the chart.
 * @export
 * @class ToolsBar
 */
export default class ToolsBar {

  #id
  #name = "Toolbar"
  #shortName = "tools"
  #core
  #options
  #stateMachine

  #elTools
  #widgets

  #Tool = Tool
  #tools
  #toolClasses = {}
  #activeTool = undefined
  #toolTarget
  #toolEvents = {click:[], pointerover:[]}

  #menus = []

  constructor (core, options) {

    this.#core = core
    this.#options = options
    this.#elTools = core.elTools
    this.#tools = tools || core.config.tools
    this.#widgets = core.WidgetsG
    this.init()
  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warn(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || `${this.#core.id}-${this.#shortName}` }
  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get core() {return this.#core}
  get options() {return this.#options}
  get pos() { return this.dimensions }
  get dimensions() { return elementDimPos(this.#elTools) }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }

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
    stateMachineConfig.id = this.id
    stateMachineConfig.context = this
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()
  }

  destroy() {
    this.#core.hub.expunge(this)

    // remove event listeners
    const id = this.#id
    const tools = this.#elTools.querySelectorAll(`.icon-wrapper`)
    for (let tool of tools) {
      for (let t of this.#tools) {
        if (t.id === id)
          tool.removeEventListener("click", this.#toolEvents[id].click)
          tool.removeEventListener("pointerover", this.#toolEvents[id].pointerover)
          tool.removeEventListener("pointerout", this.#toolEvents[id].pointerout)
      }
    }

    this.stateMachine.destroy()
  }

  eventsListen() {
    this.on("tool_selected", this.onToolSelect, this)
    this.on("tool_deselected", this.onToolDeselect, this)
  }

  on(topic, handler, context=this) {
    this.#core.on(topic, handler, context)
  }

  off(topic, handler, context=this) {
    this.#core.off(topic, handler, context)
  }

  emit(topic, data) {
    this.#core.emit(topic, data)
  }

  onResized() {
    for (let menu of this.#menus) {
      menu.position()
    }
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

    if (menu) this.emit("menu_open", data)
    else {
      this.emit("menuItem_selected", data)
    }
  }

  onIconOut(e) {
    const svg = e.currentTarget.querySelector('svg');
          svg.style.fill = ToolsStyle.COLOUR_ICON
  }

  onIconOver(e) {
    const svg = e.currentTarget.querySelector('svg');
          svg.style.fill = ToolsStyle.COLOUR_ICONHOVER
  }

  onToolTargetSelected(tool) {
    console.log("tool_targetSelected:", tool.target)
    this.#toolTarget = tool.target
  }

  onToolActivated(tool) {
    console.log("Tool activated:", tool)
    this.#activeTool = tool
  }

  onToolSelect(e) {
    console.log("Tool selected:", e)
  }

  onToolDeselect(e) {
    console.log("Tool deselected:", e)
  }

  mount(el) {
    el.innerHTML = this.#elTools.defaultNode(this.#tools)
  }

  initAllTools() {
    const tools = this.#elTools.querySelectorAll(`.icon-wrapper`)
    for (let tool of tools) {

      let id = tool.id, //.replace('TX_', ''),
          svg = tool.querySelector('svg');
          svg.style.fill = ToolsStyle.COLOUR_ICON
          svg.style.width = "90%"

      for (let t of this.#tools) {
        if (t.id === id) {
          this.#toolEvents[id] = {}
          this.#toolEvents[id].click = this.onIconClick.bind(this) // debounce(this.onIconClick, 500, this) // this.onIconClick.bind(this)
          this.#toolEvents[id].pointerover = this.onIconOver.bind(this)
          this.#toolEvents[id].pointerout = this.onIconOut.bind(this)
          tool.addEventListener("click", this.#toolEvents[id].click)
          tool.addEventListener("pointerover", this.#toolEvents[id].pointerover)
          tool.addEventListener("pointerout", this.#toolEvents[id].pointerout)

          if (t?.sub) {
            let config = {
              content: t.sub,
              primary: tool
            }
            let menu = this.#widgets.insert("Menu", config)
            tool.dataset.menu = menu.id
            menu.start()
            this.#menus.push(menu)

            for (let s of t.sub) {
              this.#toolClasses[s.id] = s.class
            }
          }
          else {
            this.#toolClasses[t.id] = t.class
          }        
        }
      }
    }
  }



  /**
   * add tool to chart row from data state
   * or add as new tool from toolbar
   * @param {class} tool 
   * @param {Object} target
   */
  addTool(tool=this.#activeTool, target=this.#toolTarget) {
    let config = {
      name: tool,
      tool: this.#toolClasses[tool],
      pos: target.cursorClick
    }
    let toolInstance = this.#Tool.create(target, config)
    toolInstance.start()
    
    console.log(toolInstance)
    return toolInstance
  }

  addNewTool(tool, target) {
    let t = this.addTool(tool, target)
    this.activeTool = (t)
    this.emit(`tool_active`, t)
    this.emit(`tool_${t.id}_active`, t)

    // add tool entry to Data State
  }

  // add all tools to the chart panes
  addAllTools() {
    // iterate over Data State to add all tools
  }

}
