// trade.js
// draw a single trade marker

import DOM from "../../utils/DOM"
import { limit } from "../../utils/number"


export default class Trade {

  data
  buy
  sell

  constructor(scene, theme) {
    this.scene = scene
    this.ctx = this.scene.context
    this.width = this.scene.width
    this.cfg = theme.trades
    const dims = {w: this.cfg.iconWidth, h: this.cfg.iconHeight}
    this.buy = DOM.svgToImage(this.cfg.iconBuy, this.cfg.buyColour, dims)
    this.sell = DOM.svgToImage(this.cfg.iconSell, this.cfg.sellColour, dims)
  }

  draw(data) {
    this.data = data
    const i = (data.side === "buy") ? this.buy : this.sell
    const c = this.cfg
    const h = limit(data.w, c.iconMinDim, c.iconHeight)
    const w = limit(data.w, c.iconMinDim, c.iconWidth)
    const x = this.data.x
    const y = this.data.y
    const ctx = this.scene.context
    ctx.save();
    ctx.drawImage(i, x, y, w, h);
    ctx.restore()

    return {x,y,w,h}
  }
}
