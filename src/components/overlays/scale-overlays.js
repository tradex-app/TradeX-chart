//  scale-overlays.js

import Overlay from "./overlay"

export default class ScaleOverly extends Overlay {


  constructor(target, xAxis, yAxis, theme, parent, params) {

    parent = yAxis
    yAxis = yAxis.yAxis

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw() {
    const ctx = this.scene.context
    const yAxis = this.yAxis.yAxis
    this.scene.clear()

    ctx.save()

    ctx.restore()
  }

}
