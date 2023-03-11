// time.labels.js

export default class timeLabels {

  #core
  #config
  #theme
  #xAxis
  #yAxis
  #parent
  #target
  #scene
  #cursorPos = [0,0]
  #xAxisGrads

  constructor(target, xAxis=false, yAxis=false, theme, parent) {

    this.#target = target
    this.#scene = target.scene
    this.#theme = theme
    this.#parent = parent
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#core = parent.core
    this.#xAxisGrads = this.#xAxis.xAxisGrads
  }

  draw() {
    this.#scene.clear()
    const ctx = this.#scene.context
    const grads = this.#xAxisGrads.values
    const offset = 0
    const theme = this.theme.xAxis

    ctx.save();
    ctx.strokeStyle = theme.colourTick
    ctx.fillStyle = theme.colourTick
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`
    for (let tick of grads) { 
      let x = bRound(tick[1])
      // console.log(bRound(x - mid))
      // ctx.font = (tick[3] == "major") ? XAxisStyle.FONT_LABEL_BOLD : XAxisStyle.FONT_LABEL
      let w = Math.floor(ctx.measureText(`${tick[0]}`).width * 0.5)
      ctx.fillText(tick[0], x - w + offset, this.xAxisTicks + 12)

      ctx.beginPath()
      ctx.moveTo(x + offset, 0)
      ctx.lineTo(x + offset, this.xAxisTicks)
      ctx.stroke()
    }
    ctx.restore();
  }
}
