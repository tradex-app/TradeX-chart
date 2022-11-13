// chart-streamCandle.js

import Candle from "../primitives/candle";
import { renderHorizontalLine } from "../../renderer/line"
import { CandleType, PriceLineStyle } from "../../definitions/style";
import { isArray } from "../../utils/typeChecks";

export default class chartStreamCandle extends Candle {

  #parent
  #core
  #config
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #params
  #chart

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target.scene, theme)

    this.#parent = parent
    this.#core = parent.core
    this.#target = target
    this.#scene = target.scene
    this.#theme = theme
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#params = params
    this.#chart = parent.parent.parent

    this.#theme.priceLineStyle = this.#theme?.priceLineStyle || PriceLineStyle
  }

  get target() { return this.#target }
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set position(p) { this.setPosition(p[0], p[1]) }

  setPosition(x, y) {
    this.#target.setPosition(x, y)
    this.#core.stream.lastScrollPos = this.#core.scrollPos
  }

  // Must calculate yPos from last candle from candle overlay
  // to keep streaming candle position in sync
  yPos(p) {
    const rangeH = this.#core.stream.lastPriceMax - this.#core.stream.lastPriceMin
    const height = p - this.#core.stream.lastPriceMin
    const ratio = this.yAxis.height / rangeH
    const yPos = this.yAxis.height - (height * ratio)
    return yPos
  }

  draw() {
    
    if (!isArray(this.#chart.streamCandle)) return

    this.#scene.clear()

    const r = this.#core.range
    const stream = this.#chart.streamCandle
    const render = (this.#core.theme.candle.Type === CandleType.AREA) ?
      (candle) => {} :
      (candle) => {super.draw(candle)}
    const offset = this.xAxis.smoothScrollOffset || 0
    const pos = this.#core.stream.lastXPos
    const candle = {
      x: pos, // offset + pos,
      w: this.xAxis.candleW
    }
    candle.o = this.yPos(stream[1])
    candle.h = this.yPos(stream[2])
    candle.l = this.yPos(stream[3])
    candle.c = this.yPos(stream[4])
    candle.raw = stream

    if (r.inRange(stream[0])) {
      render(candle)

      if (this.#core.theme.candle.Type === CandleType.AREA) super.areaRender()
    }

    if (stream[4] >= stream[1]) this.#theme.priceLineStyle.strokeStyle = this.#core.theme.candle.UpBodyColour
    else this.#theme.priceLineStyle.strokeStyle = this.#core.theme.candle.DnBodyColour

    // draw price line 
    renderHorizontalLine (
      this.#scene.context, 
      candle.c, 
      0, 
      this.#target.width, 
      this.#theme.priceLineStyle
    )
  }

}
