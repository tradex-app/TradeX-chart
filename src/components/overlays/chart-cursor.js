// chart-cursor.js

export default class chartCursor {

  #core
  #config
  #theme
  #xAxis
  #yAxis
  #parent
  #target
  #scene
  #cursorPos = [0,0]

  constructor(target, xAxis=false, yAxis=false, theme, parent) {

    this.#target = target
    this.#scene = target.scene
    this.#theme = theme
    this.#parent = parent
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#core = parent.core

    this.#core.on("chart_pan", (e) => { this.onMouseDragX(e) })
    this.#core.on("chart_panDone", (e) => { this.onMouseDragX(e) })
    this.#core.on("main_mousemove", (e) => { this.onMouseMoveX(e) })
    this.#core.on(`${this.chart.ID}_mousemove`, (e) => { this.onMouseMove(e) })
  }

  get chart() { return this.#parent.parent.parent }
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set position(p) { return }

  onMouseDragX(e) {
    this.#cursorPos[0] = e[0]
    this.draw(true)
  }
  onMouseMoveX(e) {
    this.#cursorPos[0] = e[0]
    this.draw()
  }
  onMouseMove(e) {
    this.#cursorPos[0] = e[0]
    this.#cursorPos[1] = e[1]
    this.draw()
  }

  draw(drag = false) {

    let x = this.#cursorPos[0]
    if (!drag) 
        x = this.xAxis.xPosSnap2CandlePos(x) + this.xAxis.scrollOffsetPx
    let y = this.#cursorPos[1]

    this.#scene.clear()
    const ctx = this.#scene.context
    ctx.save();

    ctx.setLineDash([5, 5])

    // X
    const offset = this.xAxis.smoothScrollOffset || 0

    ctx.strokeStyle = "#666"
    ctx.beginPath()
    ctx.moveTo(x + offset, 0)
    ctx.lineTo(x + offset, this.#scene.height)
    ctx.stroke()
    // Y
    if (this.chart.cursorActive) {
      console.log("draw cursor x")
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(this.#scene.width, y)
      ctx.stroke()
    }
    ctx.restore();

    this.#target.viewport.render();
  }

}