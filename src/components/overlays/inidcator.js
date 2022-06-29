// indicator.js

// const plotTypes = {
//   area,
//   bar,
//   channel,
//   line,
// }

import { renderLine } from "../../renderer/line"

export default class indicator {

  #target
  #scene
  #config
  #xAxis
  #yAxis
  #indicator
  #type

  constructor(target, xAxis, yAxis, config) {

    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#xAxis = xAxis
    this.#yAxis = yAxis
    this.#indicator = config.indicator
    this.#type = config.type
  }

  get target() { return this.#target }
  get scene() { return this.#scene }
  get xAxis() { return this.#xAxis }
  get yAxis() { return this.#yAxis }
  get type() { return this.#type }
  get indicator() { return this.#indicator }


  plot(plots, type, style) {

    const ctx = this.#scene.context
    ctx.save();

    switch(type) {
      case "renderLine": renderLine(ctx, plots, style);
    }

    ctx.restore();
  }
}