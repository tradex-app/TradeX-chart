// time-cursor.js

import Overlay from "./overlay"
import { renderTextBG, getTextRectWidth } from "../../renderer/text"

export default class TimeCursor extends Overlay {

  #cursorPos = [0,0]

  constructor(target, xAxis=false, yAxis=false, theme, parent) {

    xAxis = parent.time.xAxis

    super(target, xAxis, yAxis, theme, parent)

    this.viewport = target.viewport
  }

  // set position(p) { return }
  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw() {
    const ctx = this.scene.context
    const rect = this.target.viewport.container.getBoundingClientRect()
    const x = this.core.mousePos.x - rect.left
    let timestamp = this.xAxis.xPos2Time(x),
    date = new Date(timestamp),
    opts = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' },
    dateTimeStr = date.toUTCString(),
    options = {
      fontSize: this.theme.xAxis.fontSize * 1.05,
      fontWeight: this.theme.xAxis.fontWeight,
      fontFamily: this.theme.xAxis.fontFamily,
      txtCol: this.theme.xAxis.colourCursor,
      bakCol: this.theme.xAxis.colourCursorBG,
      paddingTop: 5,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4,
    },
    txtW = getTextRectWidth(ctx, dateTimeStr, options),
    xPos = x + this.core.bufferPx;
    xPos = this.xAxis.xPosSnap2CandlePos(xPos)
    xPos = xPos - Math.round(txtW * 0.5) - this.core.scrollPos - this.core.bufferPx

    this.scene.clear()
    ctx.save()

    renderTextBG(ctx, dateTimeStr, xPos, 1 , options)

    ctx.restore()
    // this.#viewport.render()
  }
}