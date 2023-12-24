// node.js
// control point for drawing tools

import { renderCircle } from "../../renderer/circle"
import { isNumber, isObject } from "../../utils/typeChecks";
import { copyDeep, debounce, idSanitize, mergeDeep } from "../../utils/utilities";
import { drawingNode as defaultTheme } from "../../definitions/style";
import { HIT_DEBOUNCE } from "../../definitions/core";

// State enum
class NodeState {
  static passive = new NodeState("passive")
  static hover = new NodeState("hover")
  static active = new NodeState("active")

  constructor(name) {
    this.name = name
  }
}

export default class Node {

  static #cnt = 1
  static get cnt() { return Node.#cnt++ }

  #id
  #inCnt = Node.cnt
  #state = NodeState.passive
  #chart
  #layer
  #scene
  #hit
  #ctx
  #ctxH
  #hitV
  #theme
  #themeDefault = copyDeep(defaultTheme)
  #x
  #y

  constructor(id, x, y, layer, chart, theme=defaultTheme) {
    this.#id = idSanitize(id) || uid("TX_Node_") + `_${this.#inCnt}`
    this.x = x
    this.y = y
    this.#chart = chart
    this.#layer = layer
    this.#scene = this.layer.scene
    this.#hit = this.layer.hit
    this.#ctx = this.layer.scene.canvas.context
    this.#ctxH = this.layer.hit.canvas
    this.#hitV = this.#inCnt

    const themed = (isObject(theme)) ? copyDeep(theme) : defaultTheme
    this.#theme = mergeDeep(this.#themeDefault, themed)

    this.eventsListen()
  }

  destroy() {
    this.#chart.expunge(this)
  }

  get id() { return this.#id }
  get inCnt() { return this.#inCnt }
  set state(s) { this.setState(s); }
  get state() { return this.#state; }
  get isActive() { return this.#state === NodeState.active; }
  get chart() { return this.#chart }
  get layer() { return this.#layer }
  get scene() { return this.#scene }
  get hit() { return this.#hit }
  get ctx() { return this.#ctx }
  get ctxH() { return this.#ctxH }
  get hitV() { return this.#hitV }
  get theme() { return this.#theme }
  get themeState() { return this.#theme[this.#state.name] }
  set x(x) { if (isNumber(x)) this.#x = x }
  get x() { return this.#x }
  set y(y) { if (isNumber(y)) this.#y = y}
  get y() { return this.#y }

  setState(s) {
    if (!(s in NodeState)) return
    this.#state = NodeState[s]
  }

  eventsListen() {
    const chart = this.#chart
    chart.on(`${chart.id}_pointermove`, this.onPointerMove, this)
    chart.on(`${chart.id}_pointerdown`, this.onPointerDown, this)
    chart.on(`${chart.id}_pointerup`, this.onPointerUp, this)
  }

  onPointerMove(pos) {
    if (this.#chart.stateMachine.state === "chart_pan") return
    

  }

  onPointerDown(pos) {
    if (this.#chart.stateMachine.state === "chart_pan") return
      debounce(this.isNodeSelected, HIT_DEBOUNCE, this)(e)
  }

  onPointerUp(pos) {

  }

  isNodeSelected(e) {

  }

  draw() {
    const t = this.themeState
    const ctx = this.#ctx
    const ctxH = this.#ctxH
    const opts = { border: t.stroke, size: t.width, fill: t.fill }
    const optsH = { size: t.width, fill: this.#hitV }

    // draw node
    ctx.save()
    renderCircle(ctx, this.#x, this.#y, t.radius, opts)
    ctx.restore()

    // draw hit mask
    ctxH.save()
    renderCircle(ctx, this.#x, this.#y, t.radius + t.width, optsH)
    ctxH.restore()
  }
}
