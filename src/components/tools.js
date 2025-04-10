// tools.js
// Tools bar
// Providing: chart drawing tools

import Component from "./component"
import { elementDimPos } from "../utils/DOM"
import tools from "../definitions/tools"
import Tool from "./overlays/chart-tools"
import stateMachineConfig from "../state/state-tools"
import { ToolsStyle, TOOLSW } from "../definitions/style"
import { isArray } from "../utils/typeChecks"


/**
 * Provides the drawing tools for the chart.
 * @export
 * @class ToolsBar
 */
export default class ToolsBar extends Component {

  #name = "Toolbar"
  #shortName = "tools"

  #elTools
  #widgets

  #Tool = Tool
  #tools
  #toolClasses = {}
  #activeTool = ""
  #toolTarget
  #toolsOverlay
  #toolEvents = {click:[], pointerover:[]}

  #menus = []

  constructor (core, options) {

    super(core, options)

    this.#elTools = core.elTools
    this.#tools = tools || core.config.tools
    this.#widgets = core.WidgetsG
    this.init()
  }

  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get pos() { return this.dimensions }
  get dimensions() { return elementDimPos(this.#elTools) }
  get tools() { return this.#tools }
  get list() { return this.listTools() }
  get overlays() { return this.listToolOverlays() }

  // iterate over tools list and add tool bar nodes
  init() {
    this.mount(this.#elTools)
  }


  start() {
    // build toolbar
    this.initAllTools()
    // draw tools in Range
    this.drawRangeTools()
    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.id = this.id
    stateMachineConfig.context = this
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()

    this.log(`Tool Bar ${this.#name} instantiated and running`)
  }

  destroy() {
    this.core.hub.expunge(this)

    // remove event listeners
    const id = this.id
    const tools = this.#elTools.querySelectorAll(`.icon-wrapper`)
    for (let tool of tools) {
      for (let t of this.#tools) {
        if (t.id === id)
          tool.removeEventListener("click", this.#toolEvents[id].click)
          // tool.removeEventListener("pointerover", this.#toolEvents[id].pointerover)
          // tool.removeEventListener("pointerout", this.#toolEvents[id].pointerout)
      }
    }

    this.stateMachine.destroy()
  }

  eventsListen() {
    this.on("chart_started", this.onChartStarted, this)
    this.on("tool_selected", this.onToolSelect, this)
    this.on("tool_deselected", this.onToolDeselect, this)
  }

  onChartStarted() {
    this.#toolsOverlay = this.core.Chart.graph.overlays.list.get("tools").layer.viewport
  }

  onResized() {
    for (let menu of this.#menus) {
      menu.position()
    }
  }

  onIconClick(e) {
    let t = e.currentTarget
    if (!t.classList.contains("enable")) return

    let d = t.dataset,
        evt = d.event,
        menu = d.menu || false,
        tool = t.id,
        data = {
          target: t,
          menu,
          evt,
          tool
        };
        
    // this.emit(evt, data)
    console.log (data)

    if (menu) this.emit("menu_open", data)
    else {
      this.emit("tool_activated", data)
      this.addNewTool(tool, t)
    }
  }

  // onIconOut(e) {
  //   const svg = e.currentTarget.querySelector('svg');
  //         svg.style.fill = ToolsStyle.COLOUR_ICON
  // }

  // onIconOver(e) {
  //   const svg = e.currentTarget.querySelector('svg');
  //         svg.style.fill = ToolsStyle.COLOUR_ICONHOVER
  // }

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

  // iterate over tools list and add tool bar nodes
  mount(el) {
    el.innerHTML = this.#elTools.defaultNode(this.#tools)
  }

  show(pos=this.core.theme.tools.location) {
    let toolBarW = this.core.theme.tools.width || TOOLSW
    let dividerPos = "0px"

    switch (pos) {
      case "none":
        toolBarW = 0;
        break;
      case "right":
        dividerPos = `${toolBarW}px`
        break;
      case "left":
      default:
        pos = "left";
        break;
    }

    let divider = this.core.elBody.clientWidth - toolBarW
    this.core.theme.tools.location = pos
    this.core.WidgetsG.elements.divider.style.right = dividerPos
    this.core.WidgetsG.elements.divider.style.width = `${divider}px`
    this.core.elBody.setToolsLocation(pos)
    this.core.MainPane.setDimensions()
    this.core.refresh()
  }

  hide() {
    this.core.WidgetsG.elements.divider.style.right = `0px`

    this.core.elBody.setToolsLocation("none")
    this.core.MainPane.setDimensions()
    this.core.refresh()
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
          // this.#toolEvents[id].pointerover = this.onIconOver.bind(this)
          // this.#toolEvents[id].pointerout = this.onIconOut.bind(this)
          if (t.active !== false) {
            tool.addEventListener("click", this.#toolEvents[id].click)
          }
          // tool.addEventListener("pointerover", this.#toolEvents[id].pointerover)
          // tool.addEventListener("pointerout", this.#toolEvents[id].pointerout)

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
   * @param {string} tool 
   * @param {Object} target
   */
  addTool(tool=this.#activeTool, target=this.#toolTarget) {
    let config = {
      name: tool,
      tool: this.#toolClasses[tool],
      pos: target.cursorClick,
      theme: this.core.theme,
      parent: this
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

  // draw all tools in (visible) Range to the chart panes
  drawRangeTools() {
    // iterate over Data State to add all tools
  }

  listTools() {
    const list = {}
    function iterate(tools) {
      for (let t of tools) {
        list[t.id] = t

        if (isArray(t?.sub))
          iterate(t.sub)
      }
    }
    iterate(this.#tools)
    return list
  }

  listToolOverlays() {
    const list = {}
    const tools = this.listTools()
    for (let t of Object.keys(tools)) {
      if (!!tools[t]?.class?.isOverlay)
        list[t] = tools[t]
    }
    return list
  }
}
