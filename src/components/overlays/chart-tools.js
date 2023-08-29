// tools.js
// base class for chart tools

import Node from "../primitives/node"
import StateMachine from "../../scaleX/stateMachne"
import Overlay from "./overlay"
import Input from "../../input"
import { idSanitize, uid } from "../../utils/utilities"


export default class Tool extends Overlay {

  static #cnt = 0
  static #instances = {}

  static create(target, config) {
    const cnt = ++Tool.#cnt
    
    config.cnt = cnt
    config.modID = `${config.toolID}_${cnt}`
    config.toolID = config.modID
    config.target = target

    const tool = new config.tool(config)

    Tool.#instances[cnt] = tool
    target.chartToolAdd(tool)

    return tool
  }

  static destroy(tool) {
    if (tool instanceof Tool) {
      const inCnt = tool.inCnt
      delete Tool.#instances[inCnt]
    }
  }

  #id
  #inCnt = null
  #name = ""
  #shortName = ""
  #options
  #config
  #core
  #parent
  #input
  #elChart
  #elCanvas
  #elViewport

  #layerTool

  #target

  #cursorPos = [0, 0]
  #cursorActive = false
  #cursorClick

  #boundingBox = {TL: [0,0], BR: [0,0]}

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.#config = config
    this.#inCnt = config.cnt
    this.#id = this.#config.ID || uid("TX_Tool_")
    this.#name = config.name
    this.#core = config.core
    this.#elChart = config.elements.elChart
    this.#parent = {...config.parent}
    this.#target = config.target
    this.#target.addTool(this)
    this.#elViewport = this.#layerTool.viewport
    this.#elCanvas = this.#elViewport.scene.canvas
    this.#cursorClick = config.pos
  }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return (this.#id) ? `${this.#id}` : `${this.#core.id}-${this.#shortName}_${this.#inCnt}`.replace(/ |,|;|:|\.|#/g, "_") }
  get inCnt() { return this.#inCnt }
  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get core() { return this.#core }

  get stateMachine() { return this.#core.stateMachine }

  get state() { return this.#core.getState() }
  get data() { return this.#core.chartData }
  get range() { return this.#core.range }
  get target() { return this.#target }
  set layerTool(layer) { this.#layerTool = layer }
  get layerTool() { return this.#layerTool }
  get elViewport() { return this.#elViewport }

  get cursorPos() { return this.#cursorPos }
  get cursorActive() { return this.#cursorActive }
  get cursorClick() { return this.#cursorClick }
  get candleW() { return this.#core.Timeline.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get scrollPos() { return this.#core.scrollPos }
  get bufferPx() { return this.#core.bufferPx }

  get visible() { return this.isVisible() }
  set position(p) { this.target.setPosition(p[0], p[1]) }

  end() { this.stop() }

  stop() {
    this.#input.off("mousemove", this.onPointerMove);
    // this.#controller.removeEventListener("mouseenter", this.onMouseEnter);
    // this.#controller.removeEventListener("mouseout", this.onMouseOut);

    // this.off("main_mousemove", this.onPointerMove)

    // progress state from active to idle
  }

  eventsListen() {
    this.#input = new Input(this.#elCanvas, {disableContextMenu: false});

    this.#input.on("pointermove", this.onPointerMove.bind(this));
    // // enter event
    // this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
    // // out event
    // this.#controller.on("mouseout", this.onMouseOut.bind(this));

    // // listen/subscribe/watch for parent notifications
    // this.on("main_mousemove", (pos) => this.updateLegends(pos))
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

  onPointerMove(e) {
    // this.#cursorPos = [e.layerX, e.layerY]
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)]

    this.emit("tool_pointermove", this.#cursorPos)

  }

  isVisible() {
    // convert #boundingBox to pixel co-ordinates
  }

  draw() {
    
  }

}