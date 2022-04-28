// utils.js
// Utils bar that lives at the top of the chart
// Providing: timeframes, indicators, config, refresh, save, load


export default class UtilsBar {

  #name = "Utilities"
  #shortname = "utils"
  #core
  #elUtils

  constructor (core) {

    this.#core = core
    this.#elUtils = core.elUtils
    this.init()
  }

  log(l) { if (this.#core.logs) console.log(l) }
  warning(w) { if (this.#core.warnings) console.warn(l) }
  error(e) { if (this.#core.errors) console.error(e) }

  init() {
    this.mount(this.#elUtils)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `

    `
    return node
  }

}