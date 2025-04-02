// chart-drawingTools.js
// display drawings and tools on the chart

import Overlay from "./overlay"
import CEL from "../primitives/canvas";
import { HIT_DEBOUNCE } from "../../definitions/core";
import { isObject } from "../../utils/typeChecks";
import { debounce, idSanitize, uid } from "../../utils/utilities"
import ToolNode, { NodeState } from "../primitives/node";
import StateMachine from "../../scaleX/stateMachne";


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

export default class ChartTools extends Overlay {

  static #cnt = 0
  static #instances = {}
  
  static get inCnt() { return ChartTools.#cnt++ }

  #id
  #inCnt
  #name = "Chart Tools"
  #shortName = "TX_Tools"


  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    // Tools cannot be constructed immediately
    // they must be constructed as needed

    super(target, xAxis, yAxis, theme, parent, params)

    this.settings = params?.settings || {}
    // this.target.addTool(this)
    toolsDialogue.parent = this

    this.eventsListen()

  }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || `${this.core.ID}-${uid(this.#shortName)}_${this.#inCnt}` }
  get inCnt() { return this.#inCnt }
  get name() {return this.#name}
  get shortName() { return this.#shortName }

  add(config) {
    const cnt = ++ChartTools.#cnt

    // find Tools overlay add new sub layer to it and pass it to constructor
    // if (!(config?.target instanceof CEL.Viewport)) {
      // const toolsOverlay = config.core.Chart.graph.overlays.list.get("tools").layer.viewport
      //  cfg - {x, y, width, height, contextType, offscreen}
      const {width, height, contextType, offscreen} = this.scene
      const cfg = { x: 0, y: 0, width, height, contextType, offscreen }
      const layer = new CEL.Layer(cfg)
      config.target = toolsOverlay.addLayer(layer)
    // }
    
    config.cnt = cnt
    config.modID = `${config.name}_${cnt}`
    config.toolID = config.modID
    // config.target = target

    const tool = new config.tool(config)

    ChartTools.#instances[config.toolID] = tool
    // target.chartToolAdd(tool)

    return tool
  }

  remove(tool) {
    if (tool instanceof ChartTool) {
      delete ChartTools.#instances[tool.ID]
    }
  }

  eventsListen() {
    // this.on("chart_started", this.)
  }
}


export class ChartTool extends Overlay {


  static #cnt = 0
  static #instances = {}
  
  static get inCnt() { return ChartTool.#cnt++ }

  #id
  #inCnt
  #name = "Chart Tool"
  #shortName = "TX_Tool"
  #stateMachine
  #configDialogue
  #cursorPos = [0, 0]
  #cursorActive = false
  #cursorClick
  #boundingBox = {TL: [0,0], BR: [0,0]}

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.#configDialogue = this.core.WidgetsG.insert("ConfigDialogue", toolsDialogue)
    this.#configDialogue.start()

    this.eventsListen()
  }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || `${this.core.ID}-${uid(this.#shortName)}_${this.#inCnt}` }
  get inCnt() { return this.#inCnt }
  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get settings() { return this.params.settings }
  set settings(s) { this.doSettings(s) }
  set position(p) { this.target.setPosition(p[0], p[1]) }
  get data() { return this.overlay.data }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }
  get isTool() { return true }

  eventsListen() {
    const chart = this.chart
    chart.on(`${chart.id}_pointermove`, this.onPointerMove, this)
    chart.on(`${chart.id}_pointerdown`, this.onPointerDown, this)
    chart.on(`${chart.id}_pointerup`, this.onPointerUp, this)
  }

  onPointerMove(pos) {
    if (this.chart.stateMachine.state === "chart_pan") return
    
    
  }

  onPointerDown(pos) {
    if (this.chart.stateMachine.state === "chart_pan") return
      debounce(this.isToolSelected, HIT_DEBOUNCE, this)(pos)
  }

  onPointerUp(pos) {

  }

  isToolSelected(e) {

  }


  doSettings(s) {
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


    let d = this.theme.tools
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o
    let i = range.Length + (o * 2)

    
    super.updated()
  }
}