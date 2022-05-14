// axis.js

// import pixel aspect ratio
import { float2Int, numDigits, precision, nice, round } from '../../utils/number.js'

export default class Axis {

  #chart

  constructor(chart) {
    this.#chart = chart
  }

  get width() { return this.#chart.width }
  get height() { return this.#chart.height }
  get data() { return this.#chart.data }
  get range() { return this.#chart.range }
  get yDigits() { return this.#chart.yAxisDigits }

  float2Int(value) { return float2Int(value) }
  numDigits(value) { return numDigits(value) }
  precision(value) { return precision(value) }

}