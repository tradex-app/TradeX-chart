// chart-cursor.js

import Overlay from "./overlay"
import { isObject } from "../../utils/typeChecks"
import Input from "../../input2"

export default class chartCursor extends Overlay{

  #cursorPos = [0,0]
  #update = true
  #input

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis=false, yAxis=false, theme, parent, params)

    this.core.on("chart_pan", (e) => { this.onMouseDragX(e) })
    this.core.on("chart_panDone", (e) => { this.onMouseDragX(e) })
    this.core.on("main_mousemove", (e) => { this.onMouseMoveX(e) })

    this.#input = new Input(this.target.viewport.container, {disableContextMenu: false});
    this.#input.on("pointermove", this.onMouseMove.bind(this))
    this.#input.on("pointerenter", this.onMouseMove.bind(this));
  }

  set position(p) { return }
  get update() { return this.#update }

  onMouseDragX(e) {
    this.#cursorPos[0] = e[0]
    this.draw(true)
    this.core.emit("chart_render")
  }
  onMouseMoveX(e) {
    this.#cursorPos[0] = e[0]
    this.draw()
    this.core.emit("chart_render")
  }
  onMouseMove(e) {
    const x = (isObject(e)) ? e.position.x : e[0]
    const y = (isObject(e)) ? e.position.y : e[1]

    this.#cursorPos[0] = x
    this.#cursorPos[1] = y
    this.draw()
    this.core.emit("chart_render")
  }

  draw(drag = false) {

    let x = this.#cursorPos[0]
    if (!drag) 
        x = this.xAxis.xPosSnap2CandlePos(x) + this.xAxis.scrollOffsetPx
    let y = this.#cursorPos[1]

    this.scene.clear()
    const ctx = this.scene.context
    ctx.save();

    ctx.setLineDash([5, 5])

    // X
    const offset = this.xAxis.smoothScrollOffset || 0

    ctx.strokeStyle = "#666"
    ctx.beginPath()
    ctx.moveTo(x + offset, 0)
    ctx.lineTo(x + offset, this.scene.height)
    ctx.stroke()
    // Y
    if (this.chart.cursorActive) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(this.scene.width, y)
      ctx.stroke()
    }

    ctx.restore();
  }

}
