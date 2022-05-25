// chart-cursor.js

export default class chartCursor {

  #target
  #scene
  #config
  #chart
  #xAxis
  #yAxis

  constructor(target, chart, xAxis, yAxis, config) {

    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#chart = chart
    this.#xAxis = xAxis
    this.#yAxis = yAxis

    this.#chart.on("mousemove_chart", (e) => { this.draw(e) })
    // this.#target.viewport.render();

    // let canvas = this.#target.scene.canvas
    // canvas.addEventListener("mousemove", (e) => this.onMouseMove(e))
  }

  onMouseMove(e) {
    this.#chart.emit("mousemove_chart", [e.layerX, e.layerY])
  }

  draw(e) {

    let [x, y] = e
        x = this.#xAxis.xPosSnap2CandlePos(x)

    this.#scene.clear()
    const ctx = this.#scene.context
    ctx.save();

    ctx.setLineDash([5, 5])

    ctx.strokeStyle = "#666"
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, this.#scene.height)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(this.#scene.width, y)
    ctx.stroke()

    ctx.restore();

    this.#target.viewport.render();
  }
}