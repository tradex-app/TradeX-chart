// time.labels.js

import Overlay from "./overlay"
import { bRound } from "../../utils/number"
import { isBoolean, isNumber } from "../../utils/typeChecks"


export default class TimeLabels extends Overlay {

  #cursorPos = [0,0]
  #xAxisGrads
  #charW

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    xAxis = parent.time.xAxis

    super(target, xAxis, yAxis, theme, parent)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(range) {
    if (!super.mustUpdate()) return

    this.scene.clear()
    // this.xAxis.calcXAxisGrads(range)

    const ctx = this.scene.context
    const grads = this.xAxis.xAxisGrads.values
    const offset = 0
    const theme = this.theme.xAxis
    const tickMarker = (isBoolean(theme.tickMarker)) ? theme.tickMarker : true
    this.#charW = this.#charW || ctx.measureText(`M`).width

    ctx.save();
    ctx.strokeStyle = theme.colourTick
    ctx.fillStyle = theme.colourTick
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`
    for (let tick of grads) { 
      let x = bRound(tick[1])
      let w = Math.floor(tick[0].length * this.#charW * 0.5)
      ctx.fillText(tick[0], x - w + offset, this.xAxis.xAxisTicks + 12)

      if (tickMarker) {
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset, this.xAxis.xAxisTicks)
        ctx.stroke()
      }
    }
    ctx.restore();

    super.updated()
  }
}
