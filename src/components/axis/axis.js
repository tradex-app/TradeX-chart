// axis.js

// import pixel aspect ratio
// import {} from '../../utils/number.js'

export default class Axis {

  #chart

  constructor(chart) {
    this.#chart = chart
  }

  get width() { return this.#chart.width }
  get height() { return this.#chart.height }
  get range() { return this.#chart.range }
}