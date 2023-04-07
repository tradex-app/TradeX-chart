// scale-cursor.js

import { isArray } from "../../utils/typeChecks"
import { drawTextBG } from "../../utils/canvas"
import Overlay from "./overlay"

export default class ScaleCursor extends Overlay {

  #cursorPos = [0, 0]

  constructor(target, xAxis, yAxis, theme, parent, params) {

    parent = yAxis
    yAxis = yAxis.yAxis

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(cursorPos) {
    if (!this.parent.parent.cursorActive) return

    this.#cursorPos = (isArray(cursorPos)) ? cursorPos : this.#cursorPos

    let [x, y] = this.#cursorPos,
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

    drawTextBG(ctx, `${nice}`, 1, yPos , options)

    ctx.restore()
  }

  erase() {
    this.scene.clear()
    this.target.viewport.render()
    return
  }
}

