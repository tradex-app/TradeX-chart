// chart-streamCandle.js

import Candle from "../primitives/candle";
import { renderHorizontalLine } from "../../renderer/line"
import { CandleType, PriceLineStyle } from "../../definitions/style";
import { isArray, isObject } from "../../utils/typeChecks";

export default class chartStreamCandle extends Candle {

  #parent
  #core
  #config
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #params
  #chart

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target.scene, theme)

    this.#parent = parent
    this.#core = parent.core
    this.#target = target
    this.#scene = target.scene
    this.#theme = theme
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#params = params
    this.#chart = parent.parent.parent

    this.#theme.priceLineStyle = this.#theme?.priceLineStyle || PriceLineStyle
  }

  get target() { return this.#target }
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set position(p) { this.setPosition(p[0], p[1]) }

  setPosition(x, y) {
    if (this.#core.stream === undefined) return
    this.#target.setPosition(x, y)
    this.#core.stream.lastScrollPos = this.#core.scrollPos
  }

  // Must calculate yPos from last candle from candle overlay
  // to keep streaming candle position in sync
  yPos(p) {
    const rangeH = this.#core.stream.lastPriceMax - this.#core.stream.lastPriceMin
    const height = p - this.#core.stream.lastPriceMin
    const ratio = this.yAxis.height / rangeH
    const yPos = this.yAxis.height - (height * ratio)
    return yPos
  }

  draw() {
    
    if (this.#core.stream === undefined ||
        !isArray(this.#chart.streamCandle)) return

    this.#scene.clear()

    const r = this.#core.range
    const stream = this.#chart.streamCandle
    let render

    switch (this.cfg.candle.Type) {
      case CandleType.AREA:
      case CandleType.LINE:
        render = (candle) => {this.areaRender(candle)}
        break;
      default:
        render = (candle) => {super.draw(candle)}
        break;
    }  
    const offset = this.xAxis.smoothScrollOffset || 0
    const pos = this.#core.stream.lastXPos
    const candle = {
      x: pos, // offset + pos,
      w: this.xAxis.candleW
    }
    // candle.x = this.xAxis.xPos(stream[0])
    candle.o = this.yPos(stream[1])
    candle.h = this.yPos(stream[2])
    candle.l = this.yPos(stream[3])
    candle.c = this.yPos(stream[4])
    candle.raw = stream

    if (r.inRenderRange(stream[0])) {
      render(candle)
    }

    if (stream[4] >= stream[1]) this.#theme.priceLineStyle.strokeStyle = this.cfg.candle.UpBodyColour
    else this.#theme.priceLineStyle.strokeStyle = this.cfg.candle.DnBodyColour

    // draw price line 
    renderHorizontalLine (
      this.#scene.context, 
      candle.c, 
      0, 
      this.#target.width, 
      this.#theme.priceLineStyle
    )
  }

  areaRender(candle) {
    const r = this.#core.range
    const raw = r.value(r.data.length - 2)

    if (raw === null) return

    const prev = {
      x: this.xAxis.xPos(raw[0]),
      o: this.yPos(raw[1]),
      h: this.yPos(raw[2]),
      l: this.yPos(raw[3]),
      c: this.yPos(raw[4]),
    }

    const ctx = this.ctx
    const bodyColour = this.cfg.candle.UpBodyColour || this.cfg.candle.DnBodyColour

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

    if (this.cfg.candle.Type === CandleType.AREA) {
      fill= ctx.createLinearGradient(0, 0, 0, this.scene.height);

      if (isArray(this.cfg.candle.AreaFillColour)) {
        for (let [index, value] of this.cfg.candle.AreaFillColour.entries()) {
          fill.addColorStop(index, value)
        }
      }
      else if (isString())
        fill = this.cfg.candle.AreaFillColour
      else
        fill = this.cfg.candle.UpBodyColour || this.cfg.candle.DnBodyColour

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
