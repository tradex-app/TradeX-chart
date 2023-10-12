// node.js
// control point for drawing tools

import { renderCircle } from "../../renderer/circle"
//import { defaultTheme as globalTheme } from "../../definitions/style"

const defaultTheme = {
  passive: {
    stroke: "#000",
    fill: "#ccc",
    width: 1,
    radius: 6,
  },
  hover: {
    stroke: "#800",
    fill: "#fff",
    width: 1,
    radius: 6,
  },
  active: {
    stroke: "#800",
    fill: "#fff",
    width: 1,
    radius: 6,
  },
};

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

  #state = NodeState.passive;

  constructor(id, x, y, layer) {
    this.id = id
    this.x = x
    this.y = y
    this.layer = layer
    this.scene = this.layer.scene
    this.hit = this.layer.hit
    this.ctx = this.layer.scene.canvas.context
    this.ctxH = this.layer.hit.canvas
    this.hitV = this.hit.getIndexValue(id)
  }

  set state(s) { this.setState(s); }
  get state() { return this.#state; }
  get isActive() { return this.#state === NodeState.active; }
  get theme() { return defaultTheme[this.#state.name] }

  setState(s) {
    if (!(s in NodeState)) return
    this.#state = NodeState[s]
  }

  draw() {
    const t = this.theme
    const ctx = this.ctx
    const ctxH = this.ctxH
    const opts = { border: t.stroke, size: t.width, fill: t.fill }
    const optsH = { size: t.width, fill: this.hitV }

    // draw node
    ctx.save()
    renderCircle(ctx, this.x, this.y, t.radius, opts)
    ctx.restore()

    // draw hit mask
    ctxH.save()
    renderCircle(ctx, this.x, this.y, t.radius + t.width, optsH)
    ctxH.restore()
  }
}
