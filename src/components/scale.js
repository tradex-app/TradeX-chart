// scale.js
// Scale bar that lives at the top of the chart
// Providing: timeframes, indicators, config, refresh, save, load

export default class ScaleBar {

  #name = "Y Scale Axis"
  #shortname = "scale"
  #core
  #target
  #elScale

  constructor (core, target) {

    this.#core = core
    this.#target = target
    this.#elScale = target.elScale
    this.init()
  }

  init() {
    this.mount(this.#elScale)
  }


  start() {

  }

  end() {
    
  }

  log(l) { if (this.#core.logs) console.log(l) }
  warning(w) { if (this.#core.warnings) console.warn(l) }
  error(e) { if (this.#core.errors) console.error(e) }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `
      <p>Scale Bar</p>
      <canvas id="" width="${this.#core.scaleW}" height=""></canvas>
    `
    return node
  }

}
