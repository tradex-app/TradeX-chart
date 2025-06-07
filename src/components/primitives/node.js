// node.js
// control point for drawing tools

import { renderCircle } from "../../renderer/circle"
import { isArray, isFunction, isNumber, isObject } from "../../utils/typeChecks";
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
  const k = target.hit.getIndexToRGB(data.key)
  const x = data.x
  const y = data.y
  const r = data.r
  const opts = {stroke: c.style , width: c.width, fill: c.fill}
  const optsH = {stroke: "none" , width: 0, fill: k}

  // const k = this.hit.getIndexToRGB(data.key)
  // const hit = svgToImage(j, this.dims, k)

  // draw node
  ctx.save()
  renderCircle(ctx, x, y, r, opts)
  ctx.restore()

  // draw hit mask
  ctxH.save()
  renderCircle(ctxH, x, y, r + c.width, optsH)
  ctxH.restore()

  return {x,y,r,k}
}

// State enum
export class NodeState {
  static idle = new NodeState("idle")
  static hover = new NodeState("hover")
  static selected = new NodeState("selected")
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
  #state = NodeState.idle
  #chart
  #layer
  #scene
  #hit
  #ctx
  #ctxH
  #hitV
  #hitRGB
  #theme
  #themeDefault = doStructuredClone(defaultTheme)
  #constraint = {x: false, y: false, fn: undefined}
  #tracking = []
  #x
  #y

  constructor(id, x, y, constraint, tracking, layer, chart, theme=defaultTheme) {
    this.#id = idSanitize(id) || uid("TX_Node_") + `_${this.#inCnt}`
    this.x = x
    this.y = y
    this.#chart = chart
    this.#layer = layer
    this.#scene = layer.scene
    this.#hit = layer.hit
    this.#ctx = layer.scene.context
    this.#ctxH = layer.hit.context
    this.#hitV = this.#inCnt
    this.#hitRGB = layer.hit.getIndexToRGB(this.#hitRGB)
    this.constraint = constraint
    this.#tracking = tracking

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
  get isSelected() { return this.#state === NodeState.selected }
  get isHover() { return this.#state === NodeState.hover }
  get isidle() { return this.#state === NodeState.idle }
  get isConstrained() { return this.isNodeConstrained() }
  get isTracking() { return this.#tracking }
  set isTracking(t) { if (this.isArrayOfNodes(t)) this.#tracking = t }
  get core() { return this.#chart.core }
  get chart() { return this.#chart }
  get layer() { return this.#layer }
  get scene() { return this.#scene }
  get hit() { return this.#hit }
  get ctx() { return this.#ctx }
  get ctxH() { return this.#ctxH }
  get hitV() { return this.#hitV }
  get hitRGB() { return this.#hitRGB }
  get theme() { return this.#theme }
  get themeState() { return this.#theme[this.#state.name] }
  set x(x) { if (isNumber(x)) this.#x = x }
  get x() { return this.#x }
  set y(y) { if (isNumber(y)) this.#y = y}
  get y() { return this.#y }
  set constraint(c) { this.setConstraint(c) }
  get constraint() { return this.#constraint }

  setState(s) {
    if (!(s in NodeState)) return
    this.#state = NodeState[s]
  }

  setConstraint(c) {
    if (!isObject(c)) return false
    this.#constraint.x = (isNumber(c?.x)) ? c.x : false
    this.#constraint.y = (isNumber(c?.y)) ? c.y : false
    this.#constraint.fn = (isFunction(c?.fn)) ? c.fn : undefined
  }

  eventsListen() {
    let core = this.core
    let chart = this.#chart
    core.on(`${chart.id}_pointerMove`, this.onPointerMove, this)
    core.on(`${chart.id}_pointerDown`, this.onPointerDown, this)
    core.on(`${chart.id}_pointerUp`, this.onPointerUp, this)
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

  isArrayOfNodes(a) {
    if (!isArray(a)) return false
    return a.every((i) => i instanceof ToolNode)
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
  //   const k = this.hit.getIndexToRGB(data.key)
  //   const x = this.data.x
  //   const y = this.data.y
  //   const r = this.data.r
  //   const ctx = this.ctx
  //   const ctxH = this.ctxH
  //   const opts = {border: c.style , size: c.width, fill: c.fill}
  //   const optsH = {border: "none" , size: 0, fill: k}

  //   // const k = this.hit.getIndexToRGB(data.key)
  //   // const hit = svgToImage(j, this.dims, k)


  draw() {
    const t = this.themeState
    const ctx = this.#ctx
    const ctxH = this.#ctxH
    const hitV = this.#hit.getIndexToRGB(this.#hitV)
    const opts = { stroke: t.stroke, width: t.width, fill: t.fill }
    const optsH = { width: t.width, fill: hitV }

    // draw node
    ctx.save()
    renderCircle(ctx, this.#x, this.#y, t.radius, opts)
    ctx.restore()

    // draw hit mask
    ctxH.save()
    renderCircle(ctxH, this.#x, this.#y, t.radius + t.width, optsH)
    ctxH.restore()
  }
}
