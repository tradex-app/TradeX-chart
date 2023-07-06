// chart-streamCandle.js

import Overlay from "./overlay"
import Candle from "../primitives/candle";
import { renderLineHorizontal } from "../../renderer/line"
import { CandleType, PriceLineStyle } from "../../definitions/style";
import { isArray, isObject } from "../../utils/typeChecks";

export default class chartCandleStream extends Overlay {

  #candle

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis=false, yAxis=false, theme, parent, params)

    this.#candle = new Candle(target.scene, theme)
    this.theme.priceLineStyle = this.theme?.priceLineStyle || PriceLineStyle
  }

  set position(p) { this.setPosition(p[0], p[1]) }

  setPosition(x, y) {
    if (this.core.stream === undefined) return
    this.target.setPosition(x, y)
    this.core.stream.lastScrollPos = this.core.scrollPos
  }

  draw() {
    
    if (this.core.stream === undefined ||
        !isArray(this.chart.streamCandle)) return

    this.scene.clear()

    const r = this.core.range
    const stream = this.chart.streamCandle
    const render = (this.theme.candle.Type === CandleType.AREA ||
                    this.theme.candle.Type === CandleType.LINE ) ?
      (candle) => {this.areaRender(candle)} :
      (candle) => {this.#candle.draw(candle)}
    const offset = this.xAxis.smoothScrollOffset || 0
    const pos = this.core.stream.lastXPos
    const candle = {
      x: pos,
      w: this.xAxis.candleW
    }
    candle.o = this.yAxis.yPos(stream[1])
    candle.h = this.yAxis.yPos(stream[2])
    candle.l = this.yAxis.yPos(stream[3])
    candle.c = this.yAxis.yPos(stream[4])
    candle.raw = stream

    if (r.inRenderRange(stream[0])) {
      render(candle)
    }

    if (stream[4] >= stream[1]) this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour
    else this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour

    // draw price line 
    renderLineHorizontal (
      this.scene.context, 
      candle.c, 
      0, 
      this.target.width, 
      this.theme.priceLineStyle
    )
  }

  areaRender(candle) {
    const r = this.core.range
    const raw = r.value(r.data.length - 2)

    if (raw === null) return

    const prev = {
      x: this.xAxis.xPos(raw[0]),
      o: this.yAxis.yPos(raw[1]),
      h: this.yAxis.yPos(raw[2]),
      l: this.yAxis.yPos(raw[3]),
      c: this.yAxis.yPos(raw[4]),
    }

    const ctx = this.scene.context
    const cfg = this.theme
    const bodyColour = cfg.candle.UpBodyColour || cfg.candle.DnBodyColour

    let w = Math.max(candle.w -1, 1)
    w = (w > 5) ? Math.ceil(w * 0.8) : w
    let hw = Math.max(Math.floor(w * 0.5), 1)

    let x = candle.x // + hw
    let x05 = Math.floor(x) - 0.5
    let fill

    ctx.save();
    ctx.fillStyle = bodyColour;
    ctx.strokeStyle = bodyColour;
    ctx.lineWidth = 1;
    ctx.beginPath()
    ctx.moveTo(candle.x, candle.c);
    ctx.lineTo(prev.x, prev.h);

    if (cfg.candle.Type === CandleType.AREA) {
      fill= ctx.createLinearGradient(0, 0, 0, this.scene.height);

      if (isArray(cfg.candle.AreaFillColour)) {
        for (let [index, value] of cfg.candle.AreaFillColour.entries()) {
          fill.addColorStop(index, value)
        }
      }
      else if (isString())
        fill = cfg.candle.AreaFillColour
      else
        fill = cfg.candle.UpBodyColour || cfg.candle.DnBodyColour

      // render line
      ctx.stroke();

      ctx.lineTo(prev.x, this.scene.height)
      ctx.lineTo(candle.x, this.scene.height)
      
      ctx.fillStyle = fill
      ctx.closePath();
      ctx.fill();
    }
    else
      ctx.stroke();

    ctx.restore();
  }

}
