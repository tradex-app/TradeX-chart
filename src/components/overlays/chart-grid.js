// chart-grid.js

import { GridStyle } from "../../definitions/style"
import { BUFFERSIZE } from "../../definitions/chart"
import { bRound } from "../../utils/number"


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

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

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

  draw(axes) {

    axes = axes || this.#config.axes

    this.#scene.clear()

    if (axes == "none") return
    
    const ctx = this.#scene.context
    ctx.save();
    ctx.strokeStyle = this.#core.theme.chart.GridColour || GridStyle.COLOUR_GRID

    // X Axis
    if (axes != "y") {
      const offset = this.xAxis.smoothScrollOffset || 0
      const xGrads = this.xAxis.xAxisGrads.values

      for (let tick of xGrads) {
        let x = bRound(tick[1])
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset, this.#scene.height)
        ctx.stroke()
      }
    }

    // Y Axis
    if (axes != "x") {
      const yGrads = this.yAxis.yAxisGrads
      for (let tick of yGrads) {
        let y = bRound(tick[1])
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(this.#scene.width, y)
        ctx.stroke()
      }
    }
    ctx.restore();
  }

  drawX() {
    this.draw("x")
    return
  }
  
}

