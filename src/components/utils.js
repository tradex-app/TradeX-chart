// utils.js
// Utils bar that lives at the top of the chart
// Providing: timeframes, indicators, config, refresh, save, load

export default class UtilsBar {

  #elUtils

  constructor (core) {

    this.#elUtils = core.elUtils
    this.insertUtils(this.#elUtils)
  }

  insertUtils(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `
      <p>Utils Bar</p>
    `
    return node
  }

}