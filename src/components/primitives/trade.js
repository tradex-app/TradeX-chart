// trade.js
// draw a single trade marker

import DOM from "../../utils/DOM"
import { renderTriangle } from "../../renderer/polygon"
import { renderLine } from "../../renderer/line"
import { renderImage } from "../../renderer/canvas"
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

    this.buy = this.svg(this.cfg.iconBuy, this.cfg.buyColour, (i)=>{this.buy=i})
    this.sell = this.svg(this.cfg.iconSell, this.cfg.sellColour, (i)=>{this.sell=i})
  }

  svg(html, fill, cb) {
    let w = this.cfg.iconWidth
    let h = this.cfg.iconHeight
    let canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
    let svg = DOM.htmlToElement(html)
        svg.style.fill = fill
        svg.setAttribute("width", w)
        svg.setAttribute("height", h)
        svg.xmlns = "http://www.w3.org/2000/svg"

    // get svg data
    let xml = new XMLSerializer().serializeToString(svg);

    // make it base64
    let svg64 = btoa(xml);
    let b64Start = "data:image/svg+xml;base64,";

    // prepend a "header"
    let image64 = b64Start + svg64;
    let img = new Image(); //document.createElement("img")
        img.setAttribute("width", w)
        img.setAttribute("height", h)
        img.onload = () => {
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          // cb(canvas)
        };
        img.src = image64;
    return img
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
