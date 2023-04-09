// chart-grid.js
// provides X and Y axis grid lines

import Overlay from "./overlay"
import { GridStyle } from "../../definitions/style"
import { bRound } from "../../utils/number"


export default class chartGrid extends Overlay{


  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.params.axes = params?.axes || "both"
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(axes) {

    axes = axes || this.params.axes

    this.scene.clear()

    if (axes == "none") return
    
    const ctx = this.scene.context
    ctx.save();
    ctx.strokeStyle = this.core.theme.chart.GridColour || GridStyle.COLOUR_GRID

    // X Axis
    if (axes != "y") {
      const offset = 0 // this.xAxis.smoothScrollOffset || 0
      const xGrads = this.xAxis.xAxisGrads.values

      for (let tick of xGrads) {
        let x = bRound(tick[1])
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset, this.scene.height)
        ctx.stroke()
      }
    }

    // Y Axis
    if (axes != "x") {
      const yGrads = this.yAxis.yAxisGrads
      for (let tick of yGrads) {
        let y = this.yAxis.$2Pixel(tick[0])
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(this.scene.width, y)
        ctx.stroke()
      }
    }
    ctx.restore();
    this.doDraw = false
  }

  drawX() {
    this.draw("x")
    return
  }
  
}

