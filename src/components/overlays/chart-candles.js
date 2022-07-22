// chart-candles.js

import Candle from "../primitives/candle";
import { CandleStyle } from "../../definitions/style"

export default class chartCandles extends Candle {

  #target
  #scene
  #config
  #xAxis
  #yAxis

  constructor(target, xAxis, yAxis, config) {

    super(target.scene, config)

    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#xAxis = xAxis
    this.#yAxis = yAxis
  }

  draw(range) {
    this.#scene.clear()

    const render = (this.#config.CandleType === "AREA") ?
      (candle) => {} :
      (candle) => {super.draw(candle)}
    const data = range.data
    const candle = {
      x: 2,
      w: this.#scene.width / range.Length,
    }

    let c = range.indexStart
    let i = range.Length
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

}

