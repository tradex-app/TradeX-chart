// chart-highLow.js

import Overlay from "./overlay"
import { renderLineHorizontal } from "../../renderer/line";
import { renderTextBG } from "../../renderer/text";

const defaults = {
  colour: "#4444cc88",
  wdith: 1,
  dash: [1,0]
}

export default class chartHighLow extends Overlay {

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    // add the overlay to the Scale (yAxis)
    const hiLo = {class: scaleHighLow, fixed: true, required: false}
    if (this.core.config?.highLow === true)
      this.scaleOverly = this.chart.scale.addOverlay("hiLo", hiLo)
  }

  // Overlay position is fixed and won't pan / scroll with the chart
  set position(p) { this.target.setPosition(0, 0) }

  draw() {}

  scaleDraw(range=this.core.range) {
    if (this.core.config?.highLow !== true) return 

    this.scene.clear()

    let txt, x, y;
    let r = this.scene.width
    let w = 35
    let opts = {}
    const hi = range.valueHi
    const lo = range.valueLo
    const theme = {...this.theme.yAxis}
    const ctx = this.scene.context

    theme.colourCursorBG = this.theme?.hilo?.colour || defaults.colour

    ctx.save()
    ctx.strokeStyle = this.theme?.highLow?.colour || defaults.colour
    ctx.strokeWidth = this.theme?.highLow?.width || defaults.width
    ctx.setLineDash(this.theme?.highLow?.dash || defaults.dash)

    // Highest Price
    y = this.yAxis.yPos(hi)
    renderLineHorizontal(ctx, y, 0, r, opts)

    txt = "High"
    x = (this.theme.yAxis.location == "left") ? 0 : r - (w + 25)
    drawText(ctx, txt, x, y, w, theme)

    // Lowest Price
    y = this.yAxis.yPos(lo)
    renderLineHorizontal(ctx, y, 0, r, opts)

    txt = "Low"
    drawText(ctx, txt, x, y, w, theme)

    ctx.restore()
  }
}

class scaleHighLow extends Overlay {

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport
  }

  // Overlay position is fixed and won't pan / scroll with the chart
  set position(p) { this.target.setPosition(0, 0) }

  draw(range=this.core.range) {

    if ("hiLo" in this.chart.parent.overlays) {
      this.chart.parent.overlays.hiLo.instance.scaleDraw(range)
    }

    this.scene.clear()

    let txt, x, y, w;
    const hi = range.valueHi
    const lo = range.valueLo
    const theme = {...this.theme.yAxis}
    const ctx = this.scene.context

    theme.colourCursorBG = this.theme?.hilo?.colour || defaults.colour
    // Highest Price
    txt = this.chart.Scale.nicePrice(hi)
    x = 1
    y = this.yAxis.yPos(hi) + 1
    w = this.viewport.width
    drawText(ctx, txt, x, y, w, theme)

    // Lowest Price
    txt = this.chart.Scale.nicePrice(lo)
    y = this.yAxis.yPos(lo) + 1
    drawText(ctx, txt, x, y, w, theme)
  }

}

function drawText(ctx, txt, x, y, w, theme) {
  let options = {
      fontSize: theme.fontSize * 1.05,
      fontWeight: theme.fontWeight,
      fontFamily: theme.fontFamily,
      txtCol: theme.colourCursor,
      bakCol: theme.colourCursorBG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 3,
      paddingRight: 3,
      width: w
    },
    
    height = options.fontSize + options.paddingTop + options.paddingBottom,
    yPos = y - (height * 0.5);

  ctx.save()

  ctx.fillStyle = options.bakCol
  ctx.fillRect(x, yPos, w, height)

  renderTextBG(ctx, `${txt}`, x, yPos , options)

  ctx.restore()
}