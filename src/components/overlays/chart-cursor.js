// chart-cursor.js

export default class chartCursor {

  #core
  #config
  #theme
  #xAxis
  #yAxis
  #chart
  #target
  #scene
  #cursorPos = [0,0]

  constructor(target, chart, xAxis, yAxis, config) {

    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#chart = chart
    this.#xAxis = xAxis
    this.#yAxis = yAxis

    this.#chart.on("chart_pan", (e) => { this.onMouseDragX(e) })
    this.#chart.on("chart_panDone", (e) => { this.onMouseDragX(e) })
    this.#chart.on("main_mousemove", (e) => { this.onMouseMoveX(e) })
    this.#chart.on(`${this.#chart.ID}_mousemove`, (e) => { this.onMouseMoveY(e) })
  }

  onMouseDragX(e) {
    this.#cursorPos[0] = e[0]
    this.draw(true)
  }
  onMouseMoveX(e) {
    this.#cursorPos[0] = e[0]
    this.draw()
  }
  onMouseMoveY(e) {
    this.#cursorPos[1] = e[1]
    this.draw()
  }

  draw(drag = false) {

    let x = this.#cursorPos[0]
        if (!drag) x = this.#xAxis.xPosSnap2CandlePos(x) + this.#xAxis.scrollOffsetPx
    let y = this.#cursorPos[1]

    this.#scene.clear()
    const ctx = this.#scene.context
    ctx.save();

    ctx.setLineDash([5, 5])

    // X
    const offset = this.#xAxis.smoothScrollOffset || 0

    ctx.strokeStyle = "#666"
    ctx.beginPath()
    ctx.moveTo(x + offset, 0)
    ctx.lineTo(x + offset, this.#scene.height)
    ctx.stroke()
    // Y
    if (this.#chart.cursorActive) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(this.#scene.width, y)
      ctx.stroke()
    }
    ctx.restore();

    this.#target.viewport.render();
  }

}