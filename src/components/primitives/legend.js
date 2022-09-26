// legend.js

import { isObject } from "../../utils/typeChecks"
import { uid } from "../../utils/utilities"
import DOM from "../../utils/DOM"
import { close, up, down, restore, maximize, collapse, config } from "../../definitions/icons"

export default class Legends {

  #targetEl
  #list
  #parent
  #core

  #controls = {
    width: 20,
    height: 20,
    fill: "#aaa"
  }

  constructor(target, parent) {
    this.#targetEl = target
    this.#list = {}
    this.#parent = parent
    this.#core = parent.core

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
    const styleLegend = `width: calc(100% - ${this.#core.scaleW}px - 1em); margin: .5em 0 1em 1em; font-size: 12px; text-align: left;`
      let styleLegendTitle = "margin-right: 1em; white-space: nowrap;"
    const styleInputs = "display: inline; margin-left: -1em;"
    const styleControls = "float: right; margin: 0.5em;"

    styleLegendTitle += (o?.type === "chart")? "font-size: 1.5em;" : "font-size: 1.2em;"

    const node = `
      <div id="${o.id}" class="legend" style="${styleLegend}">
        <span class="title" style="${styleLegendTitle}">${o.title}</span>
        <dl style="${styleInputs}">${this.buildInputs(o)}</dl>
        <div class="controls" style="${styleControls}">${this.buildControls(o)}</div>
      </div>
    `
    return node
  }

  buildInputs(o) {
    let i = 0,
        inp = "",
        input,
        styleDT = "display: inline; margin-left: 1em;",
        styleDD = "display: inline; margin-left: .25em;";
    for (input in o.inputs) {
      let colour = ""
      if (o.colours?.[i]) colour = ` color: ${o.colours[i]};`
      inp +=
      `<dt style="${styleDT}">${input}:</dt>
      <dd style="${styleDD}${colour}">${o.inputs[input]}</dd>`;
      ++i
    }
    return inp
  }

  buildControls(o) {
    let inp = "";

    // visibility
    // move up
    inp += up
    // move down
    inp += down
    // collapse
    inp += collapse
    // maximize
    inp += maximize
    // restore
    inp += restore
    // remove
    inp += close
    // config
    inp += config


    return inp
  }

  add(options) {
    if (!isObject(options) || !("title" in options)) return false

    options.id = uid(options?.id || "legend")
    options.type = options?.type || "overlay"

    const html = this.buildLegend(options)
    const elem = DOM.htmlToElement(html)

    this.#targetEl.appendChild(elem)
    const legendEl = DOM.findByID(options.id)
    this.#list[options.id] = {el: legendEl, type: options.type}

    const controls = DOM.findBySelectorAll(`#${options.id} .controls svg`)
    for (let c of controls) {
      c.style.width = `${this.#controls.width}px`
      c.style.height = `${this.#controls.height}px`
      c.style.fill = `${this.#controls.fill}`

    }

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
