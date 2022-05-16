// chart-candles.js

import Candle from "../primitives/candle";

export default class chartCandles extends Candle {

  #target
  #scene
  #config

  constructor(target, config) {

    super(target.scene.context, config)

    this.#target = target
    this.#scene = target.scene
    // this.#config = config

    this.#config = {
      x: 150,
      y: 100,
      color: 'green',
      hovered: false,
      selected: true,
    }
  }

  draw() {
    const ctx = this.#scene.context;
  
    this.#scene.clear();
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.#config.x, this.#config.y, 60, 0, Math.PI*2, false);
    ctx.fillStyle = this.#config.color;
    ctx.fill();
  
    if (this.#config.selected) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 6;
    ctx.stroke();
    }
  
    if (this.#config.hovered) {
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.stroke();
    }
    ctx.restore();
  }
}

