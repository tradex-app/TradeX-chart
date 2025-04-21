// index.js
// Controls adding Tools to the Chart Pane Tools Overlay
// exposed in core API

import Chart from "../components/chart"
import defaultTools from "../definitions/tools"
import { isArray, isArrayOfType, isClass, isFunction, isObject } from "../utils/typeChecks"
import { getPrototypeAt, prototypeHas, valuesInArray } from "../utils/utilities"

export default class Toolbox {

  static #list = []
  static #listByGroup = []

  static register(tools=defaultTools, merge=true) {
    let keys = ["id", "name", "icon", "event", "class"]
    let sub = []
    let test = (t) => {
      let k = Object.keys(t)
      return valuesInArray(keys, k) && Toolbox.isTool(t.class)
    }
    let loop = (entries, arr) => {
      for (let t of entries) {

        if (isArray(t?.sub)) {
          if (isArrayOfType(t.sub, "object"))
            sub = loop(t.sub, [])
            if (sub.length > 0)
              t.sub = sub
        }
        
        if (test(t)) {
          arr.push(t)
          Toolbox.#list.push(t)
        }
      }
      return arr
    }
    
    let result = []
    if (isArray(tools) && tools.length == 0)
      result = []
    else
    if (isArrayOfType(tools, "object") && tools.length > 0) {
      result = loop(tools, [])
    }
    else
      result = loop(defaultTools, [])

    this.#listByGroup = result
  }

  static isTool(tool) {
    return (
      isClass(tool) &&
      isFunction(tool.prototype?.draw) &&
      prototypeHas("isTool", tool)
    )
  }

  static get list() {
    return Toolbox.#list
  }

  static get listByGroup() {
    return Toolbox.#listByGroup
  }


  core

  constructor(core) {
    this.core = core
  }

  get static () { return Toolbox }

  get chartToolHosts() {
    let toolHosts = {}
    let panes = this.core.ChartPanes.entries()
    // iterate over panes, retrieve tool instances
    for (let pane of panes) {
      toolHosts[pane.id] = pane.tools
    }
    return toolHosts
  }

  get instances() {
    let instances = {}
    let hosts = Object.values(this.chartToolHosts)
    for (let host of hosts) {
      instances = {...instances, ...host.instances}
    }
    return instances
  }

  get instancesByType() {
    let byType = {}
    let hosts = Object.values(this.chartToolHosts)
    for (let host of hosts) {
      let tools = host.tools.instances
      for (let id in tools) {
        let type = tools[id].shortName
        byType[type] = [...byType[type], tools[id]]
      }
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

  add(tool, paneID, params) {
    let pane = this.core.ChartPanes.has(paneID)
    if (!pane) return undefined
    
    params.chartPane = pane
    return pane.tools.add(tool, params)
  }
  
}

export class Tools {

  #chart
  #viewport
  #stateMachine
  #instances = {}

  get Toolbox() { return Toolbox }

  constructor(chart) {
    if (!(chart instanceof Chart))
      throw new Error("Class Tools requires a valid Chart instance.")

    this.#chart = chart
    this.#viewport = chart.graph.overlays.list.get("tools").layer.viewport
  }

  get core() { return this.#chart.core }
  get chart() { return this.#chart }
  get viewport() { return this.#viewport }
  get stateMachine() { return this.#stateMachine }
  get mainStateMachine() { return this.core.MainPane.stateMachne }
  get instances() { return this.#instances }

  onToolBegin() {
    
  }

  onToolEnd() {
    
  }

  hasType(type) {
    for (let tool of this.core.Tools.list) {
      if (tool.id === type)
        return tool
    }
  }

  add(tool, params) {
    params.chartPane = this.chart
    return this.chart.tools.add(tool, params)
  }

  remove(tool) {
    if (!this.getInstanceByID(tool)) return false

    // remove tool overlay from chart
    // remove tool from instance list
  }

  getInstanceByID (ID) {
    for (let instance in this.#instances) {
      if (instance === ID) return instance
    }
    return undefined
  }

  getInstanceByType (type) {
    for (let instance of Object.values(this.#instances)) {
      if (instance.shortName === type) return instance
    }
    return undefined
  }


}