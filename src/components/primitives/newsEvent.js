// newsEvent.js
// draw a single news event marker

import DOM from "../../utils/DOM"
import { limit } from "../../utils/number"


export default class NewsEvent {

  data
  icon

  constructor(target, theme) {
    this.scene = target.scene
    this.hit = target.hit
    this.ctx = this.scene.context
    this.ctxH = this.hit.context
    this.width = this.scene.width
    this.cfg = theme.events
    this.dims = {w: this.cfg.iconWidth, h: this.cfg.iconHeight}
    this.icon = DOM.svgToImage(this.cfg.iconEvent, this.cfg.iconColour, this.dims)
  }

  draw(data) {
    this.data = data
    const i = this.icon
    const c = this.cfg
    const k = this.hit.getIndexValue(data.key)
    const hit = DOM.svgToImage(c.iconEvent, k, this.dims)
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
