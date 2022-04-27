// tools.js
// Tools bar that lives at the top of the chart
// Providing: chart drawing tools

export default class ToolsBar {

  #name = "Toolbar"
  #shortname = "tools"
  #core
  #elTools

  constructor (core) {

    this.#core = core
    this.#elTools = core.elTools
    this.init()
  }

  log(l) { if (this.#core.logs) console.log(l) }
  warning(w) { if (this.#core.warnings) console.warn(l) }
  error(e) { if (this.#core.errors) console.error(e) }

  init() {
    this.mount(this.#elTools)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `
      <p>Tools Bar</p>
    `
    return node
  }

}