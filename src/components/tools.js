// tools.js
// Tools bar that lives at the top of the chart
// Providing: chart drawing tools

export default class ToolsBar {

  #name = "Toolbar"
  #shortname = "tools"
  #mediator
  #options
  #elTools

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elTools = mediator.api.elements.elTools
    this.init()
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  init() {
    this.mount(this.#elTools)
  }


  start() {

  }

  end() {
    
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