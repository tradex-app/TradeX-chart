// tools.js
// Tools bar that lives at the top of the chart
// Providing: chart drawing tools

import DOM from "../utils/DOM"
import tools from "../definitions/tools"
import Tool from '../tools/tool'
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-tools"
import { ToolsStyle } from "../definitions/style"


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

  set id(id) { this.#id = String(id).replace(/ |,|;|:|\.|#/g, "_") }
  get id() { return (this.#id) ? `${this.#id}` : `${this.#core.id}-${this.#shortName}`.replace(/ |,|;|:|\.|#/g, "_") }
  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get core() {return this.#core}
  get options() {return this.#options}
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elTools) }
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
    this.stateMachine.destroy()
    // remove event listeners
    const tools = this.#elTools.querySelectorAll(`.icon-wrapper`)
    for (let tool of tools) {
      for (let t of this.#tools) {
        if (t.id === id)
          tool.removeEventListener("click", this.#toolEvents[id].click)
          tool.removeEventListener("pointerover", this.#toolEvents[id].pointerover)
          tool.removeEventListener("pointerout", this.#toolEvents[id].pointerout)
      }
    }

    this.off("tool_selected", this.onToolSelect)
    this.off("tool_deselected", this.onToolDeselect)
  }

  eventsListen() {
    this.on("tool_selected", this.onToolSelect, this)
    this.on("tool_deselected", this.onToolDeselect, this)
  }

  on(topic, handler, context) {
    this.#core.on(topic, handler, context)
  }

  off(topic, handler) {
    this.#core.off(topic, handler)
  }

  emit(topic, data) {
    this.#core.emit(topic, data)
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

  }

  onToolDeselect(e) {

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
          this.#toolEvents[id].click = this.onIconClick.bind(this)
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
   * @param {object} target
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

  // add all on and off chart tools
  addAllTools() {
    // iterate over Data State to add all tools
  }

}
