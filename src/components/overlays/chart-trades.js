// chart-trades.js
// display trades on chart

import Overlay from "./overlay"
import Trade from "../primitives/trade"


export default class chartTrades extends Overlay {

  #trade

  constructor(target, xAxis=false, yAxis=false, theme, parent) {

    super(target, xAxis=false, yAxis=false, theme, parent)

    this.#trade = new Trade(target.scene, theme)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }
  get trades() { return this.core.state.data.trades }

  draw(range=this.core.range) {

    this.scene.clear()

    const offset = this.xAxis.smoothScrollOffset || 0
    const trade = {
      x: offset - this.xAxis.candleW,
      w: this.xAxis.candleW
    }

    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o
    let i = range.Length + (o * 2)
    let x, t;

    while(i) {
      x = range.value( c )
      t = `${x[0]}`
      // fetch trades (if any) for timestamp
      if (Object.keys(this.trades).indexOf(t) >= 0) {
        for (let tr of this.trades[t]) {
          trade.x = this.xAxis.xPos(x[0])
          trade.y = this.yAxis.yPos(x[2])
          trade.side = tr.side
          this.#trade.draw(trade)
        }
      }
      c++
      i--
    }
  }
}