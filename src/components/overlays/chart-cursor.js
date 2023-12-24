// chart-cursor.js

import { isObject } from "../../utils/typeChecks"
import { renderTextBG } from "../../renderer/text"
import Input from "../../input"
import Overlay from "./overlay"

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

    this.chart.scale.overlays.cursor.instance.scaleDraw()
  }

}


export class ScaleCursor extends Overlay {

  #cursorPos = [0, 0]

  constructor(target, xAxis, yAxis, theme, parent, params) {

    parent = yAxis
    yAxis = yAxis.yAxis

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw() {}

  scaleDraw() {
    if (!this.parent.parent.cursorActive) return

    const rect = this.target.viewport.container.getBoundingClientRect()
    let y = this.core.mousePos.y - rect.top,
        price =  this.parent.yPos2Price(y),
        nice = this.parent.nicePrice(price),
        options = {
          fontSize: this.theme.yAxis.fontSize * 1.05,
          fontWeight: this.theme.yAxis.fontWeight,
          fontFamily: this.theme.yAxis.fontFamily,
          txtCol: this.theme.yAxis.colourCursor,
          bakCol: this.theme.yAxis.colourCursorBG,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 3,
          paddingRight: 3,
          width: this.viewport.width
        },
        
        height = options.fontSize + options.paddingTop + options.paddingBottom,
        yPos = y - (height * 0.5);
    const ctx = this.scene.context

    this.scene.clear()
    ctx.save()

    ctx.fillStyle = options.bakCol
    ctx.fillRect(1, yPos, this.width, height)

    renderTextBG(ctx, `${nice}`, 1, yPos , options)

    ctx.restore()
  }

  erase() {
    this.scene.clear()
    this.target.viewport.render()
    return
  }
}

