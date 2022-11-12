// chart-grid.js

import { GridStyle } from "../../definitions/style"
import { BUFFERSIZE } from "../../definitions/chart"


export default class chartGrid {

  #parent
  #core
  #config = {}
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #params

  constructor(target, xAxis, yAxis, theme, parent, params) {

    this.#parent = parent
    this.#core = parent.core
    this.#target = target
    this.#scene = target.scene
    this.#theme = theme
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#params = params

    // this.#config.axes = parent?.axes || "both"
    // this.#config.axes = params?.axes || parent.parent.parent.axes || "both"
    this.#config.axes = params?.axes || "both"

  }

  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set position(p) { this.#target.setPosition(p[0], p[1]) }

  draw(update=false, axes) {

    // if (this.#core.scrollPos != this.#core.bufferPx * -1 && 
    //     this.#core.scrollPos != 0 && 
    //                   update != true) 
    // { return }

    axes = axes || this.#config.axes

    this.#scene.clear()
    
    const xGrads = this.xAxis.xAxisGrads.values
    const ctx = this.#scene.context
    ctx.save();
    ctx.strokeStyle = this.#core.theme.chart.GridColour || GridStyle.COLOUR_GRID

    // X Axis
    if (axes != "y") {
      const offset = this.xAxis.smoothScrollOffset || 0

      for (let tick of xGrads) {
        ctx.beginPath()
        ctx.moveTo(tick[1] + offset, 0)
        ctx.lineTo(tick[1] + offset, this.#scene.height)
        ctx.stroke()
      }
    }

    // Y Axis
    if (axes != "x") {
      const yGrads = this.yAxis.yAxisGrads
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

