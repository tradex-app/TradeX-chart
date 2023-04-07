// scale-labels.js

import Overlay from "./overlay"
import { isBoolean } from "../../utils/typeChecks"

export default class ScaleLabels extends Overlay {

  constructor(target, xAxis, yAxis, theme, parent, params) {

    parent = yAxis
    yAxis = yAxis.yAxis

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw() {
    const ctx = this.scene.context
    const yAxis = this.yAxis
    const grads = this.yAxis.calcGradations() || []
    const theme = this.theme.yAxis
    const tickMarker = (isBoolean(theme.tickMarker)) ? theme.tickMarker : true
      let tickPos = []

    switch (theme?.location) {
      case "left": tickPos = [this.width, this.width - yAxis.yAxisTicks]; break;
      case "right":
      default: tickPos = [1, yAxis.yAxisTicks]; break;
    }

    this.scene.clear()
    ctx.save()
    ctx.strokeStyle = theme.colourTick
    ctx.fillStyle = theme.colourTick
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`
    for (let tick of grads) {
      ctx.fillText(tick[0], yAxis.yAxisTicks + 5, tick[1] + 4)

      if (tickMarker) {
        ctx.beginPath()
        ctx.moveTo(tickPos[0], tick[1])
        ctx.lineTo(tickPos[1], tick[1])
        ctx.stroke()
      }
    }
    ctx.restore()
  }

}

