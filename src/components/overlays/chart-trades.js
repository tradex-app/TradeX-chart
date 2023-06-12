// chart-trades.js
// display trades on chart

import Overlay from "./overlay"
import Trade from "../primitives/trade"


export default class chartTrades extends Overlay {

  constructor(target, xAxis=false, yAxis=false, theme, parent) {

    super(target, xAxis=false, yAxis=false, theme, parent)

  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(range=this.core.range) {

    this.scene.clear()

  }
}