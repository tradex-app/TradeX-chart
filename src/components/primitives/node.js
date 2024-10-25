// node.js
// control point for drawing tools

import { renderCircle } from "../../renderer/circle"
import { isNumber, isObject } from "../../utils/typeChecks";
import { doStructuredClone, debounce, idSanitize, mergeDeep, uid } from "../../utils/utilities";
import { drawingNode as defaultTheme } from "../../definitions/style";
import { HIT_DEBOUNCE } from "../../definitions/core";
import { svgToImage } from "../../utils/DOM";
import { limit } from "../../utils/number";
// import { NodeState } from "../overlays/chart-tools";

export function nodeRender(target, theme, data) {

  const ctx = target.scene.context
  const ctxH = target.hit.context
  const width = target.scene.width
  const states = Object.keys(NodeState)
  const state = (states.includes(data.state)) ? data.state : states[0]
  const c = theme[state]
  const k = target.hit.getIndexValue(data.key)
  const x = data.x
  const y = data.y
  const r = data.r
  const opts = {border: c.style , size: c.width, fill: c.fill}
  const optsH = {border: "none" , size: 0, fill: k}

  // const k = this.hit.getIndexValue(data.key)
  // const hit = svgToImage(j, this.dims, k)

  // draw node
  ctx.save()
  renderCircle(ctx, x, y, r, opts)
  ctx.restore()

  // draw hit mask
  ctxH.save()
  renderCircle(ctx, x, y, r + c.width, optsH)
  ctxH.restore()

  return {x,y,r,k}
}

// State enum
export class NodeState {
  static passive = new NodeState("passive")
  static hover = new NodeState("hover")
  static active = new NodeState("active")

  constructor(name) {
    this.name = name
  }
}

export default class ToolNode {

  static #cnt = 1
  static get cnt() { return ToolNode.#cnt++ }

  #id
  #inCnt = ToolNode.cnt
  #state = NodeState.passive
  #chart
  #layer
  #scene
  #hit
  #ctx
  #ctxH
  #hitV
  #theme
  #themeDefault = doStructuredClone(defaultTheme)
  #constraint = {x: false, y: false}
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

    const themed = (isObject(theme)) ? doStructuredClone(theme) : defaultTheme
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
  get isActive() { return this.#state === NodeState.active }
  get isHover() { return this.#state === NodeState.hover }
  get isPassive() { return this.#state === NodeState.passive }
  get isConstrained() { return this.isNodeConstrained() }
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
      debounce(this.isNodeSelected, HIT_DEBOUNCE, this)(pos)
  }

  onPointerUp(pos) {

  }

  onPointerDblClick(pos) {
    // end the tool?
  }

  onNodeDrag(pos) {

  }

  onVisible() {

  }

  onActive(e) {

  }

  isNodeConstrained() {
    const c = this.#constraint
    if (!(c.x && c.y)) return false
    else return c
  }

  isNodeSelected() {

  }


  // draw(data) {
  //   this.data = data
  //   const states = Object.keys(NodeState)
  //   const state = (states.includes(data.state)) ? data.state : states[0]
  //   const c = this.cfg[state]
  //   const k = this.hit.getIndexValue(data.key)
  //   const x = this.data.x
  //   const y = this.data.y
  //   const r = this.data.r
  //   const ctx = this.ctx
  //   const ctxH = this.ctxH
  //   const opts = {border: c.style , size: c.width, fill: c.fill}
  //   const optsH = {border: "none" , size: 0, fill: k}

  //   // const k = this.hit.getIndexValue(data.key)
  //   // const hit = svgToImage(j, this.dims, k)


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
