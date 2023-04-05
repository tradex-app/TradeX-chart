// time.labels.js

import Overlay from "./overlay"
import { bRound } from "../../utils/number"


export default class TimeLabels extends Overlay {

  #cursorPos = [0,0]
  #xAxisGrads

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    xAxis = parent.time.xAxis

    super(target, xAxis, yAxis, theme, parent)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(range) {
    this.scene.clear()
    // this.xAxis.calcXAxisGrads(range)

    const ctx = this.scene.context
    const grads = this.xAxis.xAxisGrads.values
    const offset = 0
    const theme = this.theme.xAxis

    ctx.save();
    ctx.strokeStyle = theme.colourTick
    ctx.fillStyle = theme.colourTick
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`
    for (let tick of grads) { 
      let x = bRound(tick[1])
      // ctx.font = (tick[3] == "major") ? XAxisStyle.FONT_LABEL_BOLD : XAxisStyle.FONT_LABEL
      let w = Math.floor(ctx.measureText(`${tick[0]}`).width * 0.5)
      ctx.fillText(tick[0], x - w + offset, this.xAxis.xAxisTicks + 12)

      ctx.beginPath()
      ctx.moveTo(x + offset, 0)
      ctx.lineTo(x + offset, this.xAxis.xAxisTicks)
      ctx.stroke()
    }
    ctx.restore();
  }
}
