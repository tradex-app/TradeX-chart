// candle.js
// draws the following candle types:
// CANDLE_SOLID: 'candle_solid',
// CANDLE_HOLLOW: 'candle_hollow',
// CANDLE_UP_HOLLOW: 'candle_up_hollow',
// CANDLE_DOWN_HOLLOW: 'candle_down_hollow',
// OHLC: 'ohlc',

import { CandleStyle } from "../../definitions/style"

export default class Candle {

  constructor(scene, config) {
    this.scene = scene
    this.ctx = this.scene.context
    this.width = this.scene.width
    this.cfg = config
    this.cfg.candleType = this.cfg?.candleType || "CANDLE_SOLID"
    this.cfg.colourCandleUp = this.cfg?.colourCandleUp || CandleStyle.COLOUR_CANDLE_UP
    this.cfg.colourCandleDn = this.cfg?.colourCandleDn || CandleStyle.COLOUR_CANDLE_DN
    this.cfg.colourWickUp = this.cfg?.colourWickUp || CandleStyle.COLOUR_WICK_UP
    this.cfg.colourWickDn = this.cfg?.colourWickDn || CandleStyle.COLOUR_WICK_DN
    

  }

  draw(data) {
    const ctx = this.ctx
    const hilo = data.raw[4] >= data.raw[1]
    const bodyColour = hilo ? this.cfg.colourCandleUp : this.cfg.colourCandleDn
    const wickColour = hilo ? this.cfg.colourWickUp : this.cfg.colourWickDn

    switch(this.cfg?.candleType) {
      case "CANDLE_SOLID": 
      this.fill = true
      break;
      case "CANDLE_HOLLOW":
      case "OHLC":
        this.fill = false
        break;
      case "CANDLE_UP_HOLLOW":
        this.fill = false || !hilo
        break;
      case "CANDLE_DOWN_HOLLOW":
        this.fill = false || hilo
      // default:
      //   this.fill = true
      //   break;
    }

    let w = Math.max(data.w -1, 1)
    let hw = Math.max(Math.floor(w * 0.5), 1)
    let h = Math.abs(data.o - data.c)
    let max_h = data.c === data.o ? 1 : 2
    let x = data.x + hw
    let x05 = Math.floor(x) - 0.5

    ctx.save();
    ctx.strokeStyle = wickColour

    ctx.beginPath()
    ctx.moveTo(x05, Math.floor(data.h))

    // Wicks
    if (this.cfg.candleType === "OHLC") {
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
    if (data.w > 1.5 && this.fill) {

      ctx.fillStyle = bodyColour

      let s = hilo ? 1 : -1
      ctx.rect(
        Math.floor(x - hw -1),
        data.c,
        Math.floor(hw * 2 + 1),
        s * Math.max(h, max_h),
      )
      ctx.fill()
      ctx.stroke()
    } 
    else if (data.w > 1.5 && !this.fill && this.cfg.candleType !== "OHLC") {
      let s = hilo ? 1 : -1
      ctx.rect(
        Math.floor(x - hw -1),
        data.c,
        Math.floor(hw * 2 + 1),
        s * Math.max(h, max_h),
      )
      ctx.stroke()
    } 
    else if (this.cfg.candleType === "OHLC") {
      // ctx.strokeStyle = wickColour
      ctx.beginPath()
      ctx.moveTo(x05 - hw, data.o)
      ctx.lineTo(x05, data.o)

      ctx.moveTo(x05, data.c)
      ctx.lineTo(x05 + hw, data.c)
      ctx.stroke()
    }
    else {
        // candle to thin for fill, just draw paths
        ctx.strokeStyle = bodyColour

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
}


// Convert to layout
// Calculates positions and sizes for candlestick
// and volume bars for the given subset of data

export function layout_cnv(self) {
  var $p = self.$props;
  var sub = $p.data;
  var t2screen = $p.layout.t2screen;
  var layout = $p.layout;
  var candles = [];
  var volume = []; // The volume bar height is determined as a percentage of
  // the chart's height (VOLSCALE)

  var maxv = Math.max.apply(Math, _toConsumableArray(sub.map(function (x) {
    return x[5];
  })));
  var vs = $p.config.VOLSCALE * layout.height / maxv;
  var x1,
      x2,
      w,
      avg_w,
      mid,
      prev = undefined; // Subset interval against main interval

  var _new_interval = new_interval(layout, $p, sub),
      _new_interval2 = _slicedToArray(_new_interval, 2),
      interval2 = _new_interval2[0],
      ratio = _new_interval2[1];

  var px_step2 = layout.px_step * ratio;
  var splitter = px_step2 > 5 ? 1 : 0; // A & B are current chart tranformations:
  // A === scale,  B === Y-axis shift

  for (var i = 0; i < sub.length; i++) {
    var p = sub[i];
    mid = t2screen(p[0]) + 1; // Clear volume bar if there is a time gap

    if (sub[i - 1] && p[0] - sub[i - 1][0] > interval2) {
      prev = null;
    }

    x1 = prev || Math.floor(mid - px_step2 * 0.5);
    x2 = Math.floor(mid + px_step2 * 0.5) - 0.5; // TODO: add log scale support

    candles.push({
      x: mid,
      w: layout.px_step * $p.config.CANDLEW * ratio,
      o: Math.floor(p[1] * layout.A + layout.B),
      h: Math.floor(p[2] * layout.A + layout.B),
      l: Math.floor(p[3] * layout.A + layout.B),
      c: Math.floor(p[4] * layout.A + layout.B),
      raw: p
    });
    volume.push({
      x1: x1,
      x2: x2,
      h: p[5] * vs,
      green: p[4] >= p[1],
      raw: p
    });
    prev = x2 + splitter;
  }

  return {
    candles: candles,
    volume: volume
  };
}