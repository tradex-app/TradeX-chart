// time-overlays.js

import Overlay from "./overlay"


export default class TimeOverlays extends Overlay {

  #cursorPos = [0,0]
  #xAxisGrads

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    xAxis = parent.time.xAxis

    super(target, xAxis, yAxis, theme, parent)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw() {
    this.scene.clear()
    const ctx = this.scene.context
    const grads = this.xAxis.xAxisGrads.values
    const offset = 0
    const theme = this.theme.xAxis

    ctx.save();

    ctx.restore();
  }
}
