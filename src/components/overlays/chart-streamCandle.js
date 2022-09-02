// chart-streamCandle.js

import Candle from "../primitives/candle";


export default class chartStreamCandle extends Candle {

  #target
  #scene
  #config
  #xAxis
  #yAxis
  #core

  constructor(target, xAxis, yAxis, config) {

    super(target.scene, config)

    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#core = xAxis.mediator.api.core
  }

  get target() { return this.#target }

  draw(stream) {
    this.#scene.clear()

    const render = (this.#config.CandleType === "AREA") ?
      (candle) => {} :
      (candle) => {super.draw(candle)}
    const offset = this.#xAxis.smoothScrollOffset || 0
    const pos = this.#xAxis.xPos(stream[0])
    const candle = {
      x: 2 + offset - this.#xAxis.candleW + pos,
      w: this.#xAxis.candleW
    }
    candle.o = this.#yAxis.yPos(stream[1])
    candle.h = this.#yAxis.yPos(stream[2])
    candle.l = this.#yAxis.yPos(stream[3])
    candle.c = this.#yAxis.yPos(stream[4])

    render(candle)

    if (this.#config.CandleType === "AREA") super.areaRender()
  }

}
