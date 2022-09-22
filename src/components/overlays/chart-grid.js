// chart-grid.js

import { GridStyle } from "../../definitions/style"
import { BUFFERSIZE } from "../../definitions/chart"


export default class chartGrid {

  #target
  #scene
  #config
  #xAxis
  #yAxis
  #core

  constructor(target, xAxis, yAxis, config) {

    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#core = xAxis.core
    this.#config.axes = config.axes || "both"
  }

  draw(axes) {
    axes = axes || this.#config.axes
    this.#scene.clear()
    
    const xGrads = this.#xAxis.xAxisGrads.values
    const ctx = this.#scene.context
    ctx.save();
    ctx.strokeStyle = GridStyle.COLOUR_GRID

    // X Axis
    if (axes != "y") {
      const offset = this.#xAxis.smoothScrollOffset || 0

      for (let tick of xGrads) {
        ctx.beginPath()
        ctx.moveTo(tick[1] + offset, 0)
        ctx.lineTo(tick[1] + offset, this.#scene.height)
        ctx.stroke()
      }
    }

    // Y Axis
    if (axes != "x") {
      const yGrads = this.#yAxis.yAxisGrads
      for (let tick of yGrads) {
        ctx.beginPath()
        ctx.moveTo(0, tick[1])
        ctx.lineTo(this.#scene.width, tick[1])
        ctx.stroke()
      }
    }

    ctx.restore();
  }

}

