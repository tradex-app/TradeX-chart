// chart-candles.js

import Overlay from "./overlay"
import Candle from "../primitives/candle";
import { CandleType } from "../../definitions/style"


export default class chartCandles extends Overlay {

  #candle

  constructor(target, xAxis=false, yAxis=false, theme, parent) {

    super(target, xAxis, yAxis, theme, parent)

    this.#candle = new Candle(target.scene, theme)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(range=this.core.range) {

    if (!super.mustUpdate()) return

    this.scene.clear()

    let render
    let type = this.theme.candle.Type

    switch (type) {
      case CandleType.AREA:
      case CandleType.LINE:
        render = (candle) => {this.#candle.area({...candle})}
        break;
      default:
        render = (candle) => {this.#candle.draw(candle)}
        break;
    }
    const offset = this.xAxis.smoothScrollOffset || 0
    const candle = {
      x: offset - this.xAxis.candleW,
      w: this.xAxis.candleW
    }
    // const candles = {
    //   in: {},
    //   ts: {},
    //   px: {},
    //   list: []
    // }

    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o
    let i = range.Length + (o * 2)
    let x

    if (this.core.stream) {
      this.core.stream.lastPriceMax = range.valueMax
      this.core.stream.lastPriceMin = range.valueMin
    }

    while(i) {
      if (c >= 0) {
        x = range.value( c )
        candle.x = this.xAxis.xPos(x[0])
        // if Stream candle store
        if (x?.[7]) {
          this.core.stream.lastXPos = candle.x
          this.core.stream.lastYPos = {...candle}
          break
        }
        // if candle has not yet closed
        if (x[4] !== null) {
          candle.o = this.yAxis.yPos(x[1])
          candle.h = this.yAxis.yPos(x[2])
          candle.l = this.yAxis.yPos(x[3])
          candle.c = this.yAxis.yPos(x[4])
          candle.raw = x
          render(candle)
        }
        // candles.list.unshift({} = {...candle})
        // candles.in[c] = i - 1
        // candles.ts[x[0]] = i - 1
        // candles.px[candle.x] = i - 1
        // this.core.candles = candles
      }
      c++
      i--
    }

    if (type === CandleType.AREA ||
        type === CandleType.LINE
      ) 
      this.#candle.areaRender()

    super.updated()
  }

}

