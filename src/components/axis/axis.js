// axis.js


/**
 * Parent class that xAxis and yAxis extend
 * @export
 * @class Axis
 */
export default class Axis {

  #core
  #parent
  #chart

  constructor(parent) {
    this.#parent = parent
    this.#core = this.#parent.core
    this.#chart = this.#core.Chart
  }

  get core() { return this.#core }
  get chart() { return this.#chart }
  get parent() { return this.#parent }
  get theme() { return this.#core.theme }
  get width() { return this.#chart.width }
  get height() { return this.#chart.height }
  get data() { return this.#chart.data }
  get range() { return this.#chart.range }
  get yDigits() { return this.#chart.yAxisDigits }

}
