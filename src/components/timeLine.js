// timeLine.js
// Time bar that lives at the top of the chart
// Providing: chart drawing Time


export default class Timeline {

  #name = "Timeline"
  #shortName = "time"
  #core
  #target
  #elTime

  constructor (core, target) {

    this.#core = core
    this.#target = target
    this.#elTime = target
    this.init()
  }
  
  log(l) { if (this.#core.logs) console.log(l) }
  warning(w) { if (this.#core.warnings) console.warn(l) }
  error(e) { if (this.#core.errors) console.error(e) }

  init() {
    this.mount(this.#elTime)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `
      <canvas width="" height="${this.#core.timeH}"></canvas>
    `
    return node
  }

}