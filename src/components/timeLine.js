// timeLine.js
// Time bar that lives at the top of the chart
// Providing: chart drawing Time

export default class Timeline {

  #elTime

  constructor (core) {

    this.#elTime = core.elTime
    this.insertTime(this.#elTime)
  }

  insertTime(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `
      <p>Timeline</p>
      <canvas></canvas>
    `
    return node
  }

}