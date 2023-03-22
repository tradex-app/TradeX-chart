// chart-watermark.js

import Overlay from "./overlay"


export default class chartWatermark extends Overlay {


  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.params.content = params?.content || ""
  }

  set position(p) { this.target.setPosition(0, 0) }

  draw(content) {

    content = content || this.params.content

    this.scene.clear()

    // if (axes == "none") return
    
    // const xGrads = this.xAxis.xAxisGrads.values
    const ctx = this.scene.context
    ctx.save();
    // ctx.strokeStyle = this.core.theme.chart.GridColour || GridStyle.COLOUR_GRID

    // // X Axis
    // if (axes != "y") {
    //   const offset = this.xAxis.smoothScrollOffset || 0

    //   for (let tick of xGrads) {
    //     let x = bRound(tick[1])
    //     ctx.beginPath()
    //     ctx.moveTo(x + offset, 0)
    //     ctx.lineTo(x + offset, this.scene.height)
    //     ctx.stroke()
    //   }
    // }

    // // Y Axis
    // if (axes != "x") {
    //   const yGrads = this.yAxis.yAxisGrads
    //   for (let tick of yGrads) {
    //     let y = bRound(tick[1])
    //     ctx.beginPath()
    //     ctx.moveTo(0, y)
    //     ctx.lineTo(this.scene.width, y)
    //     ctx.stroke()
    //   }
    // }
    ctx.restore();
  }

}

