// trade.js
// draw a single trade marker

import { renderCircle } from "../../renderer/circle"
import { renderTriangle } from "../../renderer/polygon"

export default class Trade {

  constructor(scene, theme) {
    this.scene = scene
    this.ctx = this.scene.context
    this.width = this.scene.width
    this.cfg = theme
  }

  draw(data) {
    const ctx = this.ctx;

    ctx.restore();

  }
}