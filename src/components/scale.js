// scale.js
// Scale bar that lives at the top of the chart
// Providing: timeframes, indicators, config, refresh, save, load

import {
  NAME,
  ID,
  CLASS_DEFAULT,
  CLASS_UTILS ,
  CLASS_BODY,
  CLASS_WIDGETSG,
  CLASS_TOOLS,
  CLASS_MAIN,
  CLASS_TIME,
  CLASS_ROWS,
  CLASS_ROW,
  CLASS_CHART,
  CLASS_SCALE,
  CLASS_WIDGETS,
  CLASS_ONCHART,
  CLASS_OFFCHART,
} from '../definitions/core'

export default class ScaleBar {

  #core
  #target
  #elScale

  constructor (core, target) {

    this.#core = core
    this.#target = target
    this.#elScale = target.elScale
    this.init()
  }

  init() {
    this.mount(this.#elScale)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `
      <p>Scale Bar</p>
      <canvas></canvas>
    `
    return node
  }

}
