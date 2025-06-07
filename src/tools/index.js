// index.js
// Controls adding Tools to the Chart Pane Tools Overlay
// exposed in core API

import Chart from "../components/chart"
import defaultTools from "../definitions/tools"
import { isArray, isArrayOfType, isClass, isFunction, isObject, isString } from "../utils/typeChecks"
import { getPrototypeAt, prototypeHas, valuesInArray } from "../utils/utilities"

export default class Toolbox {

  static #list = []
  static #listByGroup = []

  static register(tools=defaultTools, merge=true) {
    let keys = ["id", "name", "icon", "event", "class"]
    let sub = []

    let validateTool = (t) => {
      let k = Object.keys(t)
      return valuesInArray(keys, k) && Toolbox.isTool(t.class)
    }

    let processTools = (entries, arr) => {
      for (let tool of entries) {

        if (isArrayOfType(tool?.sub, "object")) {
          sub = processTools(tool.sub, [])
          if (sub.length > 0)
            tool.sub = sub
        }
        
        if (validateTool(tool)) {
          arr.push(tool)
          Toolbox.#list.push(tool)
        }
      }
      return arr
    }
    
    let result = []
    if (isArray(tools) && tools.length == 0)
      result = []
    else
    if (isArrayOfType(tools, "object") && tools.length > 0) {
      result = processTools(tools, [])
    }
    else
      result = processTools(defaultTools, [])

    this.#listByGroup = result
  }

  static isTool(tool) {
    return (
      isClass(tool) &&
      isFunction(tool.prototype?.draw) &&
      prototypeHas("isTool", tool)
    )
  }

  static isToolInstance(tool) {
    return Toolbox.instances.find((instance) => instance === tool)
  }

  static get list() {
    return Toolbox.#list
  }

  static get listByGroup() {
    return Toolbox.#listByGroup
  }


  constructor(core) {
    this.core = core
  }

  get static () { return Toolbox }

  get chartToolHosts() {
    return Object.fromEntries(this.core.ChartPanes)
  }

  get instances() {
    let instances = []
    for (let host of this.core.ChartPanes.values()) {
      instances = [...instances, ...host.tools.getAll()]
    }
    return instances
  }

  get instancesByType() {
    let byType = {}
    
    for (let instance of this.instances) {
      let type = instance.shortName
      if (!byType[type]) byType[type] = []
      byType[type].push(instance)
    }
    return byType
  }

  get instancesByChartPane() {
    let instances = {}
    let hosts = this.chartToolHosts
    for (let host in hosts) {
      instances[host] = hosts[host].tools.instances 
    }
    return instances
  }

  getInstance(tool) {
    let instance
    let instances = this.instances
    if (isString(tool)) {
      instance = instances.find((ins) => { ins.id === tool })
    }
    else
    if (this.static.isToolInstance(tool)) 
      instance = tool
    else {
      return false
    }
    return instance
  }

  getByType(type) {
    return this.instancesByType[type]
  }

  add(tool, paneID, params={}) {
    let pane = this.core.ChartPanes.get(paneID)
    if (!pane) throw new Error(`Class Toolbox add() requires a valid pane id`)
    if (!isObject(params)) params = {}

    const toolParams = { ...params, chartPane: pane } 
    return pane.tools.add(tool, toolParams)
  }
  
  remove(tool) {
    const instance = this.getInstance(tool)

    if (!instance) {
      this.core.error(`Class Toolbox remove() cannot remove an invalid tool`)
      return
    }

    return tool.chartPane.tools.remove(instance)
  }

  activate(tool) {
    const instance = this.getInstance(tool)

    if (!instance) {
      this.core.error(`Class Toolbox activate() cannot activate an invalid tool`)
      return
    }

    return tool.chartPane.tools.activateTool(instance)
  }

  deactivate(tool) {
    const instance = this.getInstance(tool)

    if (!instance) {
      this.core.error(`Class Toolbox deactivate() cannot deactivate an invalid tool`)
      return
    }

    return tool.chartPane.tools.deactivateTool(instance)
  }
}


/**
 * Provides tool management for chart panes
 *
 * @export
 * @class Tools
 */
export class Tools {

  #chart
  #stateMachine

  get Toolbox() { return Toolbox }

  constructor(chart) {
    if (!(chart instanceof Chart))
      throw new Error("Class Tools requires a valid Chart instance.")

    this.#chart = chart
  }

  get core() { return this.#chart.core }
  get chart() { return this.#chart }
  get stateMachine() { return this.#stateMachine }
  get mainStateMachine() { return this.core.MainPane.stateMachine }
  get toolHostOverlay() { return this.#chart.graph.overlays.list.get("tools").instance }
  get viewport() { return this.toolHostOverlay.layer.viewport }
  get instances() { return this.toolHostOverlay.tools }

  onToolBegin() {
    
  }

  onToolEnd() {
    
  }

  hasType(type) {
    return this.core.Tools.static.list.find((tool) => tool.id === type)
  }

  /**
   * add tool (overlay) to this chart pane
   *
   * @param {string} tool
   * @param {object} [params={}]
   * @return {object|null} 
   * @memberof Tools
   */
  add(tool, params={}) {
    const toolType = this.hasType(tool)
    if (!toolType) {
      this.core.warn(`Class Tools requires a valid tool type. Type ${tool} not found.`)
      return null
    }
    if (!isObject(params)) params = {}

    try {
      return this.toolHostOverlay.add(toolType, params)
    } 
    catch (error) {
      this.core.error(`Failed to add tool ${toolType} because ${error.message}`)
      return null
    }
  }

  remove(tool) {
    return this.toolHostOverlay.remove(tool)
  }

  activate(tool) {
    const active = this.getTool(tool)

    if (!active) {
      this.core.warn(`Cannot activate invalid tool`)
      return null
    }

    this.toolHostOverlay.activateTool(active)
    return active
  }

  deactivate(tool) {
    const active = this.getTool(tool)

    if (!active) {
      this.core.warn(`Cannot deactivate invalid tool`)
      return null
    }

    this.toolHostOverlay.deactivateTool(active)
    return active
  }

  edit(tool) {

  }

  getTool(tool) {
    if (isString(tool)) 
      return this.getByID(tool)
    else
    if (!!this.Toolbox.isToolInstance(tool)) 
      return tool
    else
      return null
  }

  getAll () {
    return this.toolHostOverlay.getAll()
  }

  getByID (ID) {
    return this.toolHostOverlay.getByID(ID)
  }

  getByType (type) {
    return this.toolHostOverlay.getByType(type)
  }


}