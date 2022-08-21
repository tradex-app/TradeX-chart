// chart-candles.js

import Candle from "../primitives/candle";
import { CandleStyle } from "../../definitions/style"
import { round } from "../../utils/number";
import { getTextRectWidth } from "../../utils/canvas";
import { BUFFERSIZE } from "../../definitions/chart"


export default class chartCandles extends Candle {

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

  draw(range=this.#core.range) {
    this.#scene.clear()

    const render = (this.#config.CandleType === "AREA") ?
      (candle) => {} :
      (candle) => {super.draw(candle)}
    const offset = this.#xAxis.smoothScrollOffset || 0
    const candle = {
      x: 2 + offset - this.#xAxis.candleW,
      w: this.#xAxis.candleW
    }

    let o = this.#xAxis.rangeScrollOffset;
    let c = range.indexStart - o
    let i = range.Length + o + 2
    let x

    while(i) {
      x = range.value( c )
      if (x[4] !== null) {
        candle.o = this.#yAxis.yPos(x[1])
        candle.h = this.#yAxis.yPos(x[2])
        candle.l = this.#yAxis.yPos(x[3])
        candle.c = this.#yAxis.yPos(x[4])
        candle.raw = x
        // super.draw(candle)
        render(candle)
      }
      c++
      i--
      candle.x = candle.x + candle.w
    }

    if (this.#config.CandleType === "AREA") super.areaRender()
  }

  resize(width=this.#scene.width, height=this.#scene.height) {
    // const buffer = this.#core.config.buffer || BUFFERSIZE
    // width = Math.round(width * ((100 + buffer) * 0.01))
    this.#scene.setSize(width, height)
    this.draw()
  }

}

