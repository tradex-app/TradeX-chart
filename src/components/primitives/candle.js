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
  }

  draw(data) {
    const ctx = this.ctx
    const hilo = data.raw[4] >= data.raw[1]
    const bodyColour = hilo ? this.cfg.candle.UpBodyColour : this.cfg.candle.DnBodyColour
    const wickColour = hilo ? this.cfg.candle.UpWickColour : this.cfg.candle.DnWickColour

    switch(this.cfg.candle.Type) {
      case CandleType.CANDLE_SOLID :
      this.fill = true
      break;
      case CandleType.CANDLE_HOLLOW :
      case CandleType.OHLC:
        this.fill = false
        break;
      case CandleType.CANDLE_UP_HOLLOW :
        this.fill = false || !hilo
        break;
      case CandleType.CANDLE_DOWN_HOLLOW :
        this.fill = false || hilo
      // default:
      //   this.fill = true
      //   break;
    }

    let w = Math.max(data.w -1, 1)
    
    if (w < 3) w = 1
    else if (w < 5) w = 3
    else if (w > 5) w = Math.ceil(w * 0.8)

    let hw = Math.max(Math.floor(w * 0.5), 1)
    let h = Math.abs(data.o - data.c)
    let max_h = data.c === data.o ? 1 : 2
    let x = data.x // + hw
    let x05 = Math.floor(x) - 0.5

    ctx.save();
    ctx.strokeStyle = wickColour

    ctx.beginPath()
    ctx.moveTo(x05, Math.floor(data.h))

    // Wicks
    if (this.cfg.candle.Type === CandleType.OHLC) {
      ctx.lineTo(x05, Math.floor(data.l))
    }
    else {
      if (hilo) {
        ctx.lineTo(x05, Math.floor(data.c))
        ctx.moveTo(x05, Math.floor(data.o))
      }
      else {
        ctx.lineTo(x05, Math.floor(data.o))
        ctx.moveTo(x05, Math.floor(data.c))
      }
    }
    ctx.lineTo(x05, Math.floor(data.l))
    ctx.stroke()



    // Body
    if (w == 3) {
      ctx.fillStyle = wickColour

      let s = hilo ? 1 : -1
      ctx.rect(
        Math.floor(x - hw),
        data.c,
        Math.floor(hw * 2),
        s * Math.max(h, max_h),
      )
      // if (!this.fill && this.cfg.candle.Type !== CandleType.OHLC) 
        ctx.fill()
      ctx.stroke()
    }
    else if (w > 3 && this.fill) {
      ctx.fillStyle = bodyColour

      let s = hilo ? 1 : -1
      ctx.rect(
        Math.floor(x - hw),
        data.c,
        Math.floor(hw * 2),
        s * Math.max(h, max_h),
      )
      ctx.fill()
      ctx.stroke()
    } 
    else if (w > 3 && !this.fill && this.cfg.candle.Type !== CandleType.OHLC) {
      let s = hilo ? 1 : -1
      ctx.rect(
        Math.floor(x - hw),
        data.c,
        Math.floor(hw * 2),
        s * Math.max(h, max_h),
      )
      ctx.stroke()
    } 
    else if (this.cfg.candle.Type === CandleType.OHLC) {
      // ctx.strokeStyle = wickColour
      ctx.beginPath()
      ctx.moveTo(x05 - hw, data.o)
      ctx.lineTo(x05, data.o)

      ctx.moveTo(x05, data.c)
      ctx.lineTo(x05 + hw, data.c)
      ctx.stroke()
    }
    else {
        // candle too thin for fill, just draw paths
        ctx.strokeStyle = wickColour

        ctx.beginPath()
        ctx.moveTo(
            x05,
            Math.floor(Math.min(data.o, data.c)),
        )
        ctx.lineTo(
            x05,
            Math.floor(Math.max(data.o, data.c)) +
                (data.o === data.c ? 1 : 0)
        )
        ctx.stroke()
    }
    ctx.restore();
  }

  body(fill) {

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
    let w = Math.max(coords[0].w -1, 1)
        w = (w > 5) ? Math.ceil(w * 0.8) : w
    let hw = Math.max(Math.floor(w * 0.5), 1)
    let x = coords[0].x // + hw
    let x05 = Math.floor(x) - 0.5
    let start = [coords[0].x, coords[0].h]

    ctx.save();
    ctx.strokeStyle = cfg.AreaLineColour || cfg.UpBodyColour || cfg.DnBodyColour
    ctx.lineWidth = 1;
    ctx.beginPath()
    ctx.moveTo(coords[0].x, coords[0].h);

    let i = 0
    while ( i < coords.length) {
      ctx.lineTo(coords[i].x, coords[i].h);
      i++
    }

    if (cfg?.Type == "area") {
      fill= ctx.createLinearGradient(0, 0, 0, this.scene.height);

      if (isArray(cfg.AreaFillColour)) {
        for (let [index, value] of cfg.AreaFillColour.entries()) {
          fill.addColorStop(index, value)
        }
      }
      else if (isString())
        fill = cfg.AreaFillColour
      else
        fill = cfg.UpBodyColour || cfg.DnBodyColour

      // render line
      ctx.stroke();

      ctx.lineTo(coords[i-1].x, this.scene.height)
      ctx.lineTo(start[0], this.scene.height)
      
      ctx.fillStyle = fill
      ctx.closePath();
      ctx.fill();
    }
    else
      ctx.stroke();
  
    ctx.restore();
    coords.length = 0
  }
}
  