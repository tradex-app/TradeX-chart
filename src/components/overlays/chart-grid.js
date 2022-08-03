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
    this.#scene.clear()
    
    const xGrads = this.#xAxis.xAxisGrads.values
    const ctx = this.#scene.context
    ctx.save();
    ctx.strokeStyle = GridStyle.COLOUR_GRID

    // X Axis
    for (let tick of xGrads) {
      ctx.beginPath()
      ctx.moveTo(tick[1], 0)
      ctx.lineTo(tick[1], this.#scene.height)
      ctx.stroke()
    }

    // Y Axis
    const yGrads = this.#yAxis.yAxisGrads
    for (let tick of yGrads) {
      ctx.beginPath()
      ctx.moveTo(0, tick[1])
      ctx.lineTo(this.#scene.width, tick[1])
      ctx.stroke()
    }
    ctx.restore();
  }
}

