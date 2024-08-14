// scale-cursor.js

import { renderTextBG } from "../../renderer/text"
import Overlay from "./overlay"

export default class ScaleCursor extends Overlay {

  #cursorPos = [0, 0]
  #opts

  constructor(target, xAxis, yAxis, theme, parent, params) {

    parent = yAxis
    yAxis = yAxis.yAxis

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport
    this.#opts = {
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
    }
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw() {
    if (!this.parent.parent.cursorActive) return

    const rect = this.target.viewport.container.getBoundingClientRect()
    let y = this.core.mousePos.y - rect.top,
        price =  this.parent.yPos2Price(y),
        nice = this.parent.nicePrice(price),       
        height = this.#opts.fontSize + this.#opts.paddingTop + this.#opts.paddingBottom,
        yPos = y - (height * 0.5);
    const ctx = this.scene.context

    this.scene.clear()
    ctx.save()

    ctx.fillStyle = this.#opts.bakCol
    ctx.fillRect(1, yPos, this.width, height)

    renderTextBG(ctx, `${nice}`, 1, yPos , this.#opts)

    ctx.restore()
  }

  erase() {
    this.scene.clear()
    this.target.viewport.render()
    return
  }
}

