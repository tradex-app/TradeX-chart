// time-cursor.js

import { drawTextBG, getTextRectWidth } from "../../utils/canvas"

export default class timeCursor {

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

    this.start()
  }

  set position(p) { return }

  start() {}

  end() {}

  draw() {

    const ctx = this.#scene.context
    const rect = this.#target.viewport.container.getBoundingClientRect()
    const x = this.#core.mousePos.x - rect.left
    let timestamp = this.xPos2Time(x),
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
      paddingRight: 4
    },
    txtW = getTextRectWidth(ctx, dateTimeStr, options),
    xPos = x + this.bufferPx;
    xPos = this.#xAxis.xPosSnap2CandlePos(xPos)
    xPos = xPos - Math.round(txtW * 0.5) - this.scrollPos - this.bufferPx

    this.#scene.clear()
    ctx.save()

    drawTextBG(ctx, dateTimeStr, xPos, 1 , options)

    ctx.restore()
    // this.#viewport.render()
  }
}