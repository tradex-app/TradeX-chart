// chart-grid.js

import { GridStyle } from "../../definitions/style"
export default class chartGrid {

  #target
  #scene
  #config
  #xAxis
  #yAxis

  constructor(target, xAxis, yAxis, config) {

    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#xAxis = xAxis
    this.#yAxis = yAxis
  }

  draw() {
    const grads = this.#yAxis.yAxisGrads
    const ctx = this.#scene.context
    ctx.save();
    ctx.strokeStyle = GridStyle.COLOUR_GRID
    for (let tick of grads) {
      ctx.beginPath()
      ctx.moveTo(0, tick[1])
      ctx.lineTo(this.#scene.width, tick[1])
      ctx.stroke()
    }
    ctx.restore();
  }
}

