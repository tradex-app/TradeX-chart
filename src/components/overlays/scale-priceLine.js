// scale-priceLine.js

import { CandleStyle } from "../../definitions/style";

export default class scalePriceLine {

  #config
  #yAxis
  #target
  #scene

  constructor(target, yAxis, config) {
    this.#target = target
    this.#scene = target.scene
    this.#config = config
    this.#yAxis = yAxis
  }

  draw() {
    this.#scene.clear()

  }
}
