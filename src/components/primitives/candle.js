// candle.js
// draws the following candle types:
// CANDLE_SOLID: 'candle_solid',
// CANDLE_HOLLOW: 'candle_hollow',
// CANDLE_UP_HOLLOW: 'candle_up_hollow',
// CANDLE_DOWN_HOLLOW: 'candle_down_hollow',
// OHLC: 'ohlc',


export default class Candle{

  constructor(ctx, data, config) {
    this.ctx = ctx
    this.cfg = config
    this.draw(data)
  }

  draw(data) {
    const hilo = data.raw[3] >= data.raw[0]
    const bodyColour = hilo ? this.cfg.colourCandleUp : this.cfg.colourCandleDn
    const wickColour = hilo ? this.cfg.colourWickUp : this.cfg.colourWickDn
    switch(this.cfg.type) {
      case "CANDLE_SOLID": 
        fill = true
        break;
      case "CANDLE_HOLLOW":
      case "OHLC":
        fill = false
        break;
      case "CANDLE_UP_HOLLOW":
        fill = false && hilo
        break;
      case "CANDLE_DOWN_HOLLOW":
        fill = false || hilo
    }

    let w = Math.max(data.w, 1)
    let hw = Math.max(Math.floor(w * 0.5), 1)
    let h = Math.abs(data.o - data.c)
    let max_h = data.c === data.o ? 1 : 2
    let x05 = Math.floor(data.x) - 0.5

    this.ctx.strokeStyle = wick_color

    this.ctx.beginPath()
    this.ctx.moveTo(x05, Math.floor(data.h))

    // Wicks
    if (this.cfg.type === "CANDLE_SOLID" || this.cfg.type === "OHLC") {
      this.ctx.lineTo(x05, Math.floor(data.l))
    }
    else {
      if (hilo) {
        this.ctx.lineTo(x05, Math.floor(data.c))
        this.ctx.moveTo(x05, Math.floor(data.o))
      }
      else {
        this.ctx.lineTo(x05, Math.floor(data.o))
        this.ctx.moveTo(x05, Math.floor(data.c))
      }
    }
    this.ctx.lineTo(x05, Math.floor(data.l))
    this.ctx.stroke()

    // Body
    if (data.w > 1.5 && fill) {

      this.ctx.fillStyle = bodyColour

      let s = hilo ? 1 : -1
      this.ctx.fillRect(
          Math.floor(data.x - hw -1),
          data.c,
          Math.floor(hw * 2 + 1),
          s * Math.max(h, max_h),
      )
    } 
    else if (data.w <= 1.5 && !fill && this.cfg.type !== "OHLC") {
      this.ctx.rect(
        Math.floor(data.x - hw -1),
        data.c,
        Math.floor(hw * 2 + 1),
        s * Math.max(h, max_h),
      )
    } 
    else if (this.cfg.type === "OHLC") {
      // this.ctx.strokeStyle = wickColour
      this.ctx.beginPath()
      this.ctx.moveTo(x05 - hw, data.o)
      this.ctx.lineTo(x05, data.o)

      this.ctx.moveTo(x05, data.c)
      this.ctx.lineTo(x05 + hw, data.c)
      this.ctx.stroke()
    }
    else {

        this.ctx.strokeStyle = bodyColour

        this.ctx.beginPath()
        this.ctx.moveTo(
            x05,
            Math.floor(Math.min(data.o, data.c)),
        )
        this.ctx.lineTo(
            x05,
            Math.floor(Math.max(data.o, data.c)) +
                (data.o === data.c ? 1 : 0)
        )
        this.ctx.stroke()
    }
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