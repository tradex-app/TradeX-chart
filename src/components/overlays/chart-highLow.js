// chart-highLow.js

import Overlay from "./overlay"
import { renderLineHorizontal } from "../../renderer/line";

const defaults = {
  colour: "#44C",
  wdith: 1,
  dash: false
}

export default class chartHighLow extends Overlay {

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis=false, yAxis=false, theme, parent, params)

    // add the overlay to the Scale (yAxis)
    const hiLo = {class: scaleHighLow, fixed: true, required: false}
    this.scaleOverly = this.chart.scale.addOverlay("hiLo", hiLo)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(range=this.core.range) {

    this.scene.clear()
    const ctx = this.scene.context
    ctx.save()

    ctx.strokeStyle = this.theme?.highLow?.colour || defaults.colour
    ctx.strokeWidth = this.theme?.highLow?.width || defaults.width

    let r = this.scene.width
    let y;
    let opts = {}

    y = this.yAxis.yPos(range.valueHi)
    renderLineHorizontal(ctx, y, 0, r, opts)
    y = this.yAxis.yPos(range.valueLo)
    renderLineHorizontal(ctx, y, 0, r, opts)

    ctx.restore()
  }
}

class scaleHighLow extends Overlay {

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis=false, yAxis=false, theme, parent, params)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw() {
    this.scene.clear()
    const ctx = this.scene.context
    ctx.save()

console.log("scaleHighLow")

    ctx.restore()
  }
}