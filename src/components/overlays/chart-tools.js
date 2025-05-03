// chart-drawingTools.js
// display drawings and tools on the chart for your confirmtin bias over the price

import Overlay from "./overlay"
import CEL from "../primitives/canvas";
import Graph from "../views/classes/graph";
import { HIT_DEBOUNCE } from "../../definitions/core";
import { isClass, isObject } from "../../utils/typeChecks";
import { debounce, idSanitize, uid } from "../../utils/utilities"
import ToolNode, { NodeState } from "../primitives/node";

import StateMachine from "../../scaleX/stateMachne";
import renderLoop from "../views/classes/renderLoop";


const toolsDialogue = {
  bounded: true,
  dragBar: false,
  closeIcon: false,
  content: "",
  styles: {
    window: {
      width: "15em",
      zindex: "10"
    },
    content: {
      overflow: "hidden",
      padding: "0 1em"
    }
  }
}

// Provides host overlay for ChartPane tools

export default class ChartToolsHost extends Overlay {

  static #cnt = 0
  
  static get inCnt() { return ChartToolsHost.#cnt++ }

  #id
  #inCnt
  #name = "Chart Tool Host"
  #shortName = "TX_ChartToolsHost"
  #type = "tool"
  #chartPane
  #graph
  #pointer = {
    click: [0, 0]
  }


  /**
   * Creates an instance of ChartToolsHost.
   * @param {object} target - CEl Layer instance
   * @param {boolean} [xAxis=false]
   * @param {boolean} [yAxis=false]
   * @param {object} theme - 
   * @param {object} parent - overlay host / parent
   * @param {object} params - data to configure overlay
   * @memberof ChartToolsHost
   */
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.#inCnt = ChartToolsHost.inCnt

    this.settings = params?.settings || {}

    this.#chartPane = params.chart

    this.#graph = new Graph(this, parent.parent.elViewport, [], true)

    toolsDialogue.parent = this

    this.eventsListen()
  }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || `${this.core.ID}-${uid(this.#shortName)}_${this.#inCnt}` }
  get type() { return this.#type }
  get inCnt() { return this.#inCnt }
  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get chartPane() { return this.#chartPane }
  get graph() { return this.#graph }
  get elCanvas() { return this.graph.viewport.scene.canvas }
  get tools() { return this.overlays}
  get renderLoop() { return renderLoop }
  get overlays() { return Object.fromEntries([...this.graph.overlays.list]) }


  // /**
  //  * add Tool to Chart Pane
  //  * @param {object} tool - class
  //  * @param {object} cfg 
  //  * @returns 
  //  */
  // _add(tool, cfg={}) {

  //   if (!isClass(tool.class) || !tool.class.isTool ) return undefined

  //   const cnt = ++ChartToolsHost.#cnt
  //   const {width, height, contextType, offscreen} = this.scene
  //   const params = { x: 0, y: 0, width, height, contextType, offscreen }
  //   const layer = new CEL.Layer(cfg)
  //   cfg.target = this.target.viewport.addLayer(layer)
  //   cfg.xAxis = false
  //   cfg.xAxis = false
  //   cfg.yAxis = false
  //   cfg.theme = {}
  //   cfg.parent = this.parent
  //   cfg.params = params
  //   // params.params = {
  //   //   // cnt: cnt,
  //   //   // modID: `${params.name}_${cnt}`,
  //   //   toolID: params.modID
  //   // }

  //   const instance = new tool.class(cfg)
  //   this.#tools[instance.id] = instance

  //   return instance
  // }


  /**
   * add Tool to Chart Pane
   * @param {object} tool - class
   * @param {object} [cfg={}] - configuration
   * @returns 
   */
  add(tool, cfg={}) {

    if (!isClass(tool.class) || !tool.class.isTool ) return undefined

    let cnt = ++ChartToolsHost.#cnt
    tool.parent = this
    tool.params = (isObject(tool.params)) ?
      {...tool.params, ...cfg} :
      cfg
    tool.params.chartPane = this.#chartPane
    let key = cfg?.id || tool?.params.id || `${tool.class.constructor.name}-${cnt}`

    return this.#graph.addOverlay(key, tool)
  }



  remove(tool) {
    if (tool instanceof ChartTool) {
      delete this.tools[tool.id]
      return true
    }
    return false
  }

  getAll () { 
    return Object.values(this.tools) 
  }

  getByID (ID) {
    return this.getAll().find((tool) => tool.id === ID)
  }

  getByType (type) {
    if (!!type) return this.getAll()
    else return this.getAll().filter((tool) => tool.shortName === type)
  }

  eventsListen() {
    const core = this.core
    const chart = this.chartPane
    core.on(`${chart.id}_pointerMove`, this.onPointerMove, this)
    core.on(`${chart.id}_pointerDown`, this.onPointerDown, this)
    core.on(`${chart.id}_pointerUp`, this.onPointerUp, this)
  }

  onPointerDown(e) {
    this.#pointer.click = e
    this.draw()
  }


  render() {
    this.graph.render();

    const scene = this.scene
    scene.clear()
    const ctx = this.scene.context

    ctx.save();

    ctx.scale(1,1)
    ctx.drawImage(
      this.graph.viewport.scene.canvas,
      0,
      0,
      this.graph.viewport.width,
      this.graph.viewport.height
    );
    // let node = new ToolNode(undefined, this.#pointer.click[0], this.#pointer.click[1], this.scene.layer, this.chart)
    // node.draw()

    ctx.restore()

    this.target.viewport.render()
  }

  draw(range=this.range, update=false) {
      this.graph.draw(range, update)
  }
}




// provides parent class for Tool Classes

export class ChartTool extends Overlay {


  static #cnt = 0
  static #instances = {}
  static isOverlay = true
  static isTool = true
  
  static get inCnt() { return ChartTool.#cnt++ }

  #id
  #inCnt
  #name = "Chart Tool"
  #shortName = "TX_Tool"
  #stateMachine
  #configDialogue
  #chartPane
  #cursorPos = [0, 0]
  #cursorActive = false
  #cursorClick
  #boundingBox = {TL: [0,0], BR: [0,0]}

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.#inCnt = ChartTool.inCnt
    this.id = params?.id || `${this.core.ID}-${uid(this.shortName)}_${this.inCnt}`
    this.#configDialogue = this.core.WidgetsG.insert("ConfigDialogue", toolsDialogue)
    this.#configDialogue.start()
    this.#chartPane = params.chartPane

    this.eventsListen()
  }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || `${this.core.ID}-${uid(this.shortName)}_${this.inCnt}` }
  get inCnt() { return this.#inCnt }
  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get settings() { return this.params.settings }
  set settings(s) { this.validateSettings(s) }
  set position(p) { this.target.setPosition(p[0], p[1]) }
  get data() { return this.overlay.data }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }
  get isTool() { return true }
  get chartPane() { return this.#chartPane }

  eventsListen() {
    const chart = this.chartPane
    chart.on(`${chart.id}_pointerMove`, this.onPointerMove, this)
    chart.on(`${chart.id}_pointerDown`, this.onPointerDown, this)
    chart.on(`${chart.id}_pointerUp`, this.onPointerUp, this)
  }

  onPointerMove(pos) {
    if (this.chartPane.stateMachine.state === "chart_pan") return
    
    
  }

  onPointerDown(pos) {
    if (this.chartPane.stateMachine.state === "chart_pan") return
      debounce(this.isToolSelected, HIT_DEBOUNCE, this)(pos)

    this.#cursorPos = pos
  }

  onPointerUp(pos) {

  }

  isToolSelected(e) {

  }


  validateSettings(s) {
    if (!isObject(s)) return false

    let t = this.theme.trades
    for (let e in s) {
      if (s[e] === undefined) continue
      t[e] = s[e]
    }
  }

  isVisible() {
    // convert #boundingBox to pixel co-ordinates
  }

  draw(range=this.core.range) {
    if (!super.mustUpdate()) return

    if (this.core.config?.tools?.display === false) return

    this.hit.clear()
    this.scene.clear()
    const ctx = this.scene.context

    ctx.save();

    let d = this.theme.tools
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o
    let i = range.Length + (o * 2)

    ctx.restore()
    
    super.updated()
  }
}