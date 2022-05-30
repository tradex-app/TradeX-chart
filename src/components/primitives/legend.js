// legend.js

import { isObject } from "../../utils/typeChecks"
import { uid } from "../../utils/utilities"
import DOM from "../../utils/DOM"

export default class Legends {

  #targetEl
  #list

  constructor(target) {
    this.#targetEl = target
    this.#list = {}

    this.mount(target)
  }

  get list() { return this.#list }

  mount(el) {
    // el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `
    `
  }

  buildLegend(o) {
    const styleLegend = "margin: .5em 0 1em 1em; font-size: 12px;"
      let styleLegendTitle = "margin-right: 1em;"
    const styleInputs = "display: inline;"

    if (o?.type === "chart") styleLegendTitle +=
      "font-size: 1.5em;"

    const node = `
      <div id="${o.id}" class="legend" style="${styleLegend}">
        <span class="title" style="${styleLegendTitle}">${o.title}</span>
        <dl style="${styleInputs}">${this.buildInputs(o)}</dl>
      </div>
    `
    return node
  }

  buildInputs(o) {
    let inp = "",
        input;
    for (input in o.inputs) {
      inp +=
      `<dt>${input}</dt><dd>${o.inputs[input]}<dd>`
    }
    return inp
  }

  add(options) {
    if (!isObject(options) || !("title" in options)) return false

    options.id = uid(options?.id || "legend")
    options.type = options?.type || "overlay"

    const html = this.buildLegend(options)
    const elem = DOM.htmlToElement(html)

    this.#targetEl.appendChild(elem) 
    this.#list[options.id] = {el: DOM.findByID(options.id), type: options.type}

    return options.id
  }

  remove(id) {
    if (!(id in this.#list)
    || this.#list[id].type === "chart") return false
    
    this.#list[id].el.remove()
    delete this.#list[id]

    return true
  }

  update(id, data) {
    if (!(isObject(data)) 
    || !(id in this.#list)) return false

    const html = this.buildInputs(data)
    const el = DOM.findBySelector(`#${id} dl`)
    el.innerHTML = html
  }
}
