// tools.js
// Tools bar that lives at the top of the chart
// Providing: chart drawing tools

export default class ToolsBar {

  #elTools

  constructor (core) {

    this.#elTools = core.elTools
    this.insertTools(this.#elTools)
  }

  insertTools(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `
      <p>Tools Bar</p>
    `
    return node
  }

}