// axis.js

// import pixel aspect ratio
import { float2Int, countDigits, numDigits, precision, nice, round } from '../../utils/number.js'

/**
 * Parent class that xAxis and yAxis extend
 * @export
 * @class Axis
 */
export default class Axis {

  #core
  #parent
  #chart

  constructor(parent, chart) {
    this.#chart = chart
    this.#parent = parent
    this.#core = this.#parent.core
  }

  get core() { return this.#chart.core }
  get chart() { return this.#chart }
  get parent() { return this.#parent }
  get width() { return this.#chart.width }
  get height() { return this.#chart.height }
  get data() { return this.#chart.data }
  get range() { return this.#chart.range }
  get yDigits() { return this.#chart.yAxisDigits }

  float2Int(value) { return float2Int(value) }
  numDigits(value) { return numDigits(value) }
  countDigits(value) { return countDigits(value) }
  precision(value) { return precision(value) }

}