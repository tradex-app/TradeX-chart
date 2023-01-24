// chart-watermark.js


export default class chartWatermark {

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
    this.#params = params
    this.#config.content = params?.content || ""
  }

  set position(p) { this.#target.setPosition(0, 0) }

  draw(content) {

    content = content || this.#config.content

    this.#scene.clear()

    // if (axes == "none") return
    
    // const xGrads = this.xAxis.xAxisGrads.values
    const ctx = this.#scene.context
    ctx.save();
    // ctx.strokeStyle = this.#core.theme.chart.GridColour || GridStyle.COLOUR_GRID

    // // X Axis
    // if (axes != "y") {
    //   const offset = this.xAxis.smoothScrollOffset || 0

    //   for (let tick of xGrads) {
    //     let x = bRound(tick[1])
    //     ctx.beginPath()
    //     ctx.moveTo(x + offset, 0)
    //     ctx.lineTo(x + offset, this.#scene.height)
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
    //     ctx.lineTo(this.#scene.width, y)
    //     ctx.stroke()
    //   }
    // }
    ctx.restore();
  }

}

