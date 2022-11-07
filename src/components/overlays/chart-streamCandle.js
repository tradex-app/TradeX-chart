// chart-streamCandle.js

import Candle from "../primitives/candle";
import { renderHorizontalLine } from "../../renderer/line"
import { CandleType, PriceLineStyle } from "../../definitions/style";

export default class chartStreamCandle extends Candle {

  #core
  #config
  #theme
  #xAxis
  #yAxis
  #target
  #scene


  constructor(target, xAxis, yAxis, config) {

    super(target.scene, config)

    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#core = xAxis.mediator.api.core
    this.#config.priceLineStyle = this.#config?.priceLineStyle || PriceLineStyle
  }

  get target() { return this.#target }

  draw(stream) {
    this.#scene.clear()

    const r = this.#core.range
    const render = (this.#core.theme.candle.Type === CandleType.AREA) ?
      (candle) => {} :
      (candle) => {super.draw(candle)}
    const offset = this.#xAxis.smoothScrollOffset || 0
    const pos = this.#core.stream.lastXPos
    const candle = {
      x: pos, // offset + pos,
      w: this.#xAxis.candleW
    }
    candle.o = this.#yAxis.yPos(stream[1])
    candle.h = this.#yAxis.yPos(stream[2])
    candle.l = this.#yAxis.yPos(stream[3])
    candle.c = this.#yAxis.yPos(stream[4])
    candle.raw = stream

    if (r.inRange(stream[0])) {
      render(candle)

      if (this.#core.theme.candle.Type === CandleType.AREA) super.areaRender()
    }


    if (stream[4] >= stream[1]) this.#config.priceLineStyle.strokeStyle = this.#core.theme.candle.UpBodyColour
    else this.#config.priceLineStyle.strokeStyle = this.#core.theme.candle.DnBodyColour

    // draw price line 
    renderHorizontalLine (
      this.#scene.context, 
      candle.c, 
      0, 
      this.#target.width, 
      this.#config.priceLineStyle
    )
  }

}
