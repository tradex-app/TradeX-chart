// legend.js

export default class legend {

  #targetEl
  #type
  #title
  #imputs

  constructor(target, options) {
    this.#targeEl = target
    this.#type = options.type
  }

  get type() { return this.#type }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {

    const node = `
      <div class="legend" style="${styleLegend}">
      </div>
    `
    return node
  }
}