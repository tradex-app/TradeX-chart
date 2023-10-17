// chart-cursor.js

import Overlay from "./overlay"
import { isObject } from "../../utils/typeChecks"
import Input from "../../input"

export default class chartCursor extends Overlay{

  #cursorPos = [0,0]
  #update = true
  #input

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.core.on("chart_pan", this.onMouseDragX, this)
    this.core.on("chart_panDone", this.onMouseDragX, this)
    this.core.on("main_mousemove", this.onMouseMoveX, this)

    this.#input = new Input(this.target.viewport.container, {disableContextMenu: false});
    this.#input.on("pointermove", this.onMouseMove.bind(this))
    this.#input.on("pointerenter", this.onMouseMove.bind(this));
  }

  destroy() {
    this.core.off("chart_pan", this.onMouseDragX)
    this.core.off("chart_panDone", this.onMouseDragX)
    this.core.off("main_mousemove", this.onMouseMoveX)
    super.destroy()
  }

  set position(p) { return }
  get update() { return this.#update }
  get always() { return true }

  onMouseDragX(e) {
    this.#cursorPos[0] = e[0]
    this.#cursorPos[1] = e[1]
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

    const rect = this.target.viewport.container.getBoundingClientRect()
    let y = this.core.mousePos.y - rect.top
    let x = this.core.mousePos.x - rect.left

    if (!drag) 
        x = this.xAxis.xPosSnap2CandlePos(x) + this.xAxis.scrollOffsetPx

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
