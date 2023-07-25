// trade.js
// draw a single trade marker

import { renderImage } from "../../renderer/canvas"
import DOM from "../../utils/DOM"
import { renderTriangle } from "../../renderer/polygon"
import { renderLine } from "../../renderer/line"


export default class Trade {

  data
  buy
  sell

  constructor(scene, theme) {
    this.scene = scene
    this.ctx = this.scene.context
    this.width = this.scene.width
    this.cfg = theme.trades

    this.buy = this.svg(this.cfg.iconBuy, this.cfg.buyColour)
    this.sell = this.svg(this.cfg.iconSell, this.cfg.sellColour)
  }

  svg(html, fill, dest) {
    let canvas = document.createElement('canvas')
    let h = this.cfg.iconHeight
    let w = this.cfg.iconWidth
    canvas.height = h
    canvas.width = w
    let ctx = canvas.getContext("2d");
    let svg = DOM.htmlToElement(html)
    svg.style.fill = fill
    svg = svg.outerHTML

    var DOMURL = window.URL || window.webkitURL || window;
    var blob = new Blob([svg], {type: 'image/svg+xml'});
    var url = DOMURL.createObjectURL(blob);
    var img1 = new Image();
        img1.onload = () => {
          // renderTriangle(ctx, 15, 15, 30, {fill:"#fff", stroke:"#f00", width:1})

          ctx.drawImage(img1, 0, 0, w, h);
          DOMURL.revokeObjectURL(url);
        }
        img1.src = url;
    return canvas
    // createImageBitmap(blob, 0, 0, w, h )
  }

  draw(data) {
    this.data = data
    const i = (data.side === "buy") ? this.buy : this.sell
  //   DOM.isImage(i, this.renderImage.bind(this))
  // }

  // renderImage(i) {
  //   // if (!i) return

    // let svg = DOM.htmlToElement(i)
    //     svg.style.fill = "#fff"
    //     svg = svg.outerHTML

    const h = this.cfg.iconHeight
    const w = this.cfg.iconWidth
    const x = this.data.x
    const y = this.data.y

    const ctx = this.scene.context
    ctx.save();
    // renderImage(ctx, i, x, y, height, width )

    // var DOMURL = window.URL || window.webkitURL || window;
    // var img1 = new Image();
    // var blob = new Blob([svg], {type: 'image/svg+xml'});
    // var url = DOMURL.createObjectURL(blob);
    // img1.onload = function() {
    //    ctx.drawImage(img1, x, y, w, h);
    //    DOMURL.revokeObjectURL(url);
    // }
    // img1.src = url;

    ctx.drawImage(i, x, y, w, h);
    // renderTriangle(ctx, x+10, y+10, 30, {fill:"#fff", stroke:"#f00", width:1})
    ctx.restore()
  }
}
