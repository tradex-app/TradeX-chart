// axis.js

// import pixel aspect ratio
import { getPrecision, nice, round } from '../../utils/number.js'

export default class Axis {

  #chart
  #minValue
  #maxValue

  constructor(chart) {
    this.#chart = chart
  }

  get width() { return this.#chart.width }
  get height() { return this.#chart.height }
  get range() { return this.#chart.range }

  calcAxis() {
    
  }
}