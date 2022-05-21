// xAxis.js

import Axis from "./axis";

export default class xAxis extends Axis {

  #data
  #range
  #parent

  xAxisOffset

  constructor(parent, chart) {
    super(chart)
    this.#data = super.data
    this.#range = super.range
    this.#parent = parent 
  }

  get data() { return this.#data }
  get range() { return this.#range }
  get width() { return super.width }
  get interval() { return this.#range.interval }
  get intervalStr() { return this.#range.intervalStr }
  get timeStart() { return this.#range.timeStart }
  get timeFinish() { return this.#range.timeFinish }
  get rangeDuration() { return this.#range.timeDuration }
  get indexStart() { return this.#range.indexStart }
  get indexEnd() { return this.#range.indexEnd }
  get timeMax() { return this.#range.timeMax }
  get timeMin() { return this.#range.timeMin }
  get xAxisRatio() { return this.width / this.#range.Length }
  get xAxisStep() {  }
  set xAxisTicks(t) {  }
  get xAxisTicks() {  }

  /**
 * return canvas x co-ordinate
 * @param {number} dataX - chart time
 * @return {number}  
 * @memberof xAxis
 */
  xPos(time) {
    let width = this.range.timeMax - time
    let xPos = width * this.xAxisRatio
    return xPos
  }
}
