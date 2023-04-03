// scale-labels.js

import Overlay from "./overlay"

export default class scaleLabels extends Overlay {


  constructor(target, xAxis, yAxis, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport

    this.start()
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  start() {
    this.eventListeners()
  }

  end() {}

  eventListeners() {}

  draw() {
    const ctx = this.scene.context
    const grads = this.yAxis.yAxisGrads
    const theme = this.theme.yAxis
    const tickMarker = (isBoolean(theme.tickMarker)) ? theme.tickMarker : true
      let tickPos = []

    switch (theme?.location) {
      case "left": tickPos = [this.width, this.width - this.yAxis.yAxisTicks]; break;
      case "right":
      default: tickPos = [1, this.yAxis.yAxisTicks]; break;
    }

    this.yAxis.calcGradations()
    this.scene.clear()
    ctx.save()
    ctx.strokeStyle = theme.colourTick
    ctx.fillStyle = theme.colourTick
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`
    for (let tick of grads) {
      ctx.fillText(tick[0], this.yAxis.yAxisTicks + 5, tick[1] + 4)

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

