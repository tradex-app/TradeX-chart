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

  getByType(type) {
    return this.instancesByType[type]
  }

  add(tool, paneID, params) {
    let pane = this.core.ChartPanes.has(paneID)
    if (!pane) return undefined
    
    params.chartPane = pane
    return pane.tools.add(tool, params)
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
  get mainStateMachine() { return this.core.MainPane.stateMachne }
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
   * @return {object} 
   * @memberof Tools
   */
  add(tool, params={}) {
    const toolType = this.hasType(tool)
    if (!toolType) return undefined

    this.toolHostOverlay.add(toolType, params)
  }

  remove(tool) {
    return this.toolHostOverlay.remove(tool)
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