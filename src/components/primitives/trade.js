// trade.js
// draw a single trade marker

import { svgToImage } from "../../utils/DOM"
import { limit } from "../../utils/number"


export default class Trade {

  data
  buy
  sell

  constructor(target, theme) {
    this.scene = target.scene
    this.hit = target.hit
    this.ctx = this.scene.context
    this.ctxH = this.hit.context
    this.width = this.scene.width
    this.cfg = theme.trades
    this.dims = {w: this.cfg.iconWidth, h: this.cfg.iconHeight}
    this.buy = svgToImage(this.cfg.iconBuy, this.cfg.buyColour, this.dims)
    this.sell = svgToImage(this.cfg.iconSell, this.cfg.sellColour, this.dims)
  }

  draw(data) {
    this.data = data
    const c = this.cfg
    const i = (data.side === "buy") ? this.buy : this.sell
    const j = (data.side === "buy") ? c.iconBuy : c.iconSell
    const k = this.hit.getIndexValue(data.key)
    const hit = svgToImage(j, k, this.dims)
    const h = limit(data.w, c.iconMinDim, c.iconHeight)
    const w = limit(data.w, c.iconMinDim, c.iconWidth)
    const x = this.data.x
    const y = this.data.y
    const ctx = this.ctx
    const ctxH = this.ctxH
    // draw icon
    ctx.save();
    ctx.drawImage(i, x, y, w, h);
    ctx.restore()
    // draw mask to hit layer
    ctxH.save();
    ctxH.drawImage(hit, x, y, w, h);
    ctxH.restore()

    return {x,y,w,h,k}
  }
}
