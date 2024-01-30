// chart-drawingTools.js
// display drawings and tools on the chart

import Overlay from "./overlay"
import { HIT_DEBOUNCE } from "../../definitions/core";
import { isObject } from "../../utils/typeChecks";
import { debounce, idSanitize, uid } from "../../utils/utilities"


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

export default class chartTools extends Overlay {

  static #cnt = 0
  static #instances = {}
  
  static get inCnt() { return chartTools.#cnt++ }

  static create(target, config) {
    const cnt = ++chartTools.#cnt
    
    config.cnt = cnt
    config.modID = `${config.toolID}_${cnt}`
    config.toolID = config.modID
    config.target = target

    const tool = new config.tool(config)

    chartTools.#instances[cnt] = tool
    target.chartToolAdd(tool)

    return tool
  }

  static destroy(tool) {
    if (tool instanceof chartTools) {
      delete chartTools.#instances[tool.inCnt]
    }
  }

  #id
  #inCnt
  #name = "Chart Tools"
  #shortName = "TX_Tool"
  #configDialogue
  #chart

  #cursorPos = [0, 0]
  #cursorActive = false
  #cursorClick

  #boundingBox = {TL: [0,0], BR: [0,0]}

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.#inCnt = chartTools.inCnt
    // FIXME: why is there a this.id = undefined ???
    // delete this.id
    if (!!this.config.ID) this.#id = idSanitize(this.config.ID)
    // this.#name = config.name
    this.settings = params?.settings || {}
    // this.target.addTool(this)
    toolsDialogue.parent = this
    this.#configDialogue = this.core.WidgetsG.insert("ConfigDialogue", toolsDialogue)
    this.#configDialogue.start()

    this.eventsListen()
  }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || `${this.core.id}-${uid(this.#shortName)}_${this.#inCnt}` }
  get inCnt() { return this.#inCnt }
  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get settings() { return this.params.settings }
  set settings(s) { this.doSettings(s) }

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
