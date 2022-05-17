// chart-candles.js

import Candle from "../primitives/candle";

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
    const data = range.data
    const candle = {
      x: 0,
      w: this.#xAxis.xAxisRatio,
    }

    let c = range.indexStart
    let i = range.Length

    while(i) {
      candle.o = this.#yAxis.yPos(data[c][1])
      candle.h = this.#yAxis.yPos(data[c][2])
      candle.l = this.#yAxis.yPos(data[c][3])
      candle.c = this.#yAxis.yPos(data[c][4])
      candle.raw = data[c]
      super.draw(candle)
      c++
      i--
      candle.x = candle.x + candle.w
    }
  }

}

