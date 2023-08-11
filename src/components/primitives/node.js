// node.js
// control point for drawing tools

import { renderCircle } from "../../renderer/circle"
import { defaultTheme } from "../../definitions/style"

defaultTheme = {
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
  }
}

// State enum
class State {
  static passive = new State("passive")
  static hover = new State("hover")
  static active = new State("active")

  constructor(name) {
    this.name = name
  }
}

class Node {

  #state = State.passive

  constructor(id, x, y, layer) {
    this.id = id
    this.x = x
    this.y = y
    this.layer = layer
    this.scene = this.layer.scene
    this.hit = this.layer.hit
    this.ctx = this.layer.scene.canvas.context
    this.ctxH = this.layer.hit.canvas.
    this.hitV = this.hit.getIndexValue(id)
  }

  set state(s) { this.setState(s) }
  get state() { return this.#state }
  get isActive() { return (this.#state == State.active) ? true : false }
  get theme() { return defaultTheme[this.#state] }

  draw() {
    const t = this.theme
    const ctx = this.ctx
    const ctxH = this.ctxHx
    const opts = {border: t.stroke, size: t.width, fill: t.fill}
    const optsH = {size: t.width, fill: this.hitV}

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