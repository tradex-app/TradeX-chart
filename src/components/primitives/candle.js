// candle.js
// draws the following candle types:
// CANDLE_SOLID: 'candle_solid',
// CANDLE_HOLLOW: 'candle_hollow',
// CANDLE_UP_HOLLOW: 'candle_up_hollow',
// CANDLE_DOWN_HOLLOW: 'candle_down_hollow',
// OHLC: 'ohlc',
// AREA: 'area',
// LINE: 'line'

import { CandleType, defaultTheme } from "../../definitions/style"
import { isArray, isString } from "../../utils/typeChecks"

export default class Candle {
  areaCoordinates = []

  constructor(scene, theme) {
    this.scene = scene
    this.ctx = this.scene.context
    this.width = this.scene.width
    this.cfg = theme
    this.dpr = window.devicePixelRatio || 1
  }

  alignToPixel(value) {
    return Math.round(value * this.dpr) / this.dpr
  }

  draw(data) {
    const ctx = this.ctx
    const cfg = this.cfg
    const hilo = data.raw[4] >= data.raw[1]
    const bodyColour = hilo ? cfg.candle.UpBodyColour : cfg.candle.DnBodyColour
    const wickColour = hilo ? cfg.candle.UpWickColour : cfg.candle.DnWickColour

    switch(cfg.candle.Type) {
      case CandleType.CANDLE_SOLID:
        this.fill = true
        break;
      case CandleType.CANDLE_HOLLOW:
      case CandleType.OHLC:
        this.fill = false
        break;
      case CandleType.CANDLE_UP_HOLLOW:
        this.fill = false || !hilo
        break;
      case CandleType.CANDLE_DOWN_HOLLOW:
        this.fill = false || hilo
        break;
    }

    let w = Math.max(data.w - 1, 1)
    w = candleW(w, this.dpr)

    let hw = this.alignToPixel(w * 0.5)
    
    // Center the candle
    let x = this.alignToPixel(data.x)
    let bodyX = this.alignToPixel(x - hw)
    
    // Ensure heights are pixel aligned
    let h = Math.abs(data.o - data.c)
    let max_h = data.c === data.o ? 1 : 2
    let bodyHeight = this.alignToPixel(h)
    
    ctx.save();
    ctx.strokeStyle = wickColour
    ctx.lineWidth = 1;

    // Draw wicks
    ctx.beginPath()
    ctx.moveTo(x, this.alignToPixel(data.h))

    if (cfg.candle.Type === CandleType.OHLC) {
      ctx.lineTo(x, this.alignToPixel(data.l))
    } else {
      if (hilo) {
        ctx.lineTo(x, this.alignToPixel(data.c))
        ctx.moveTo(x, this.alignToPixel(data.o))
      } else {
        ctx.lineTo(x, this.alignToPixel(data.o))
        ctx.moveTo(x, this.alignToPixel(data.c))
      }
      ctx.lineTo(x, this.alignToPixel(data.l))
    }
    ctx.stroke()

    // Body
    if (w === 3 * this.dpr) {
      ctx.fillStyle = wickColour
      let s = hilo ? 1 : -1

      ctx.fillRect(
        bodyX,
        this.alignToPixel(data.c),
        w,
        s * Math.max(bodyHeight, max_h)
      )
    }
    else if (w > 3 * this.dpr && this.fill) {
      ctx.fillStyle = bodyColour
      let s = hilo ? 1 : -1

      ctx.fillRect(
        bodyX,
        this.alignToPixel(data.c),
        w,
        s * Math.max(bodyHeight, max_h)
      )
    }
    else if (w > 3 * this.dpr && !this.fill && cfg.candle.Type !== CandleType.OHLC) {
      let s = hilo ? 1 : -1
      ctx.strokeRect(
        bodyX,
        this.alignToPixel(data.c),
        w,
        s * Math.max(bodyHeight, max_h)
      )
    }
    else if (cfg.candle.Type === CandleType.OHLC) {
      ctx.beginPath()
      ctx.moveTo(bodyX, this.alignToPixel(data.o))
      ctx.lineTo(x, this.alignToPixel(data.o))
      ctx.moveTo(x, this.alignToPixel(data.c))
      ctx.lineTo(this.alignToPixel(x + hw), this.alignToPixel(data.c))
      ctx.stroke()
    }
    else {
      ctx.strokeStyle = wickColour
      ctx.beginPath()
      ctx.moveTo(
        x,
        this.alignToPixel(Math.min(data.o, data.c))
      )
      ctx.lineTo(
        x,
        this.alignToPixel(Math.max(data.o, data.c)) +
          (data.o === data.c ? 1 : 0)
      )
      ctx.stroke()
    }
    ctx.restore();
  }

  area(data) {
    this.areaCoordinates.push(data)
  }

  areaRender() {
    const coords = this.areaCoordinates

    // Nothing to process
    if ( !isArray(coords) || coords.length == 0) return

    let ctx = this.ctx
    let cfg = this.cfg.candle
    let fill
    let w = Math.max(coords[0].w - 1, 1)
    w = candleW(w, this.dpr)
    let hw = this.alignToPixel(w * 0.5)
    let x = this.alignToPixel(coords[0].x)
    let start = [this.alignToPixel(coords[0].x), this.alignToPixel(coords[0].h)]

    ctx.save();
    ctx.strokeStyle = cfg.AreaLineColour || cfg.UpBodyColour || cfg.DnBodyColour
    ctx.lineWidth = 1;
    ctx.beginPath()
    ctx.moveTo(start[0], start[1]);

    for (let i = 0; i < coords.length; i++) {
      ctx.lineTo(
        this.alignToPixel(coords[i].x),
        this.alignToPixel(coords[i].h)
      );
    }

    if (cfg?.Type == "area") {
      fill = ctx.createLinearGradient(0, 0, 0, this.scene.height);

      if (isArray(cfg.AreaFillColour)) {
        for (let [index, value] of cfg.AreaFillColour.entries()) {
          fill.addColorStop(index, value)
        }
      }
      else if (isString(cfg.AreaFillColour))
        fill = cfg.AreaFillColour
      else
        fill = cfg.UpBodyColour || cfg.DnBodyColour

      // render line
      ctx.stroke();

      ctx.lineTo(this.alignToPixel(coords[coords.length-1].x), this.scene.height)
      ctx.lineTo(start[0], this.scene.height)
      
      ctx.fillStyle = fill
      ctx.closePath();
      ctx.fill();
    }
    else {
      ctx.stroke();
    }
  
    ctx.restore();
    coords.length = 0
  }
}

/**
 * Scale candle width to create gaps at larger sizes
 * @export
 * @param {number} w - candle width in pixels
 * @param {number} dpr - device pixel ratio
 * @return {number}  
 */
export function candleW(w, dpr = 1) {
  // Base width calculations
  if (w < 3) w = 1
  else if (w < 5) w = 3
  else if (w > 5) w = Math.ceil(w * 0.8)
  
  // Apply DPI scaling
  return Math.round(w * dpr)
}
