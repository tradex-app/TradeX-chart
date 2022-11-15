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
  #controlsList

  constructor(target, parent) {
    this.#targetEl = target
    this.#list = {}
    this.#parent = parent
    this.#core = parent.core

    this.mount(target)
  }

  get list() { return this.#list }

  onMouseClick() {

  }

  mount(el) {
    // el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `
    `
  }

  buildLegend(o) {
    const theme = this.#core.theme
    const styleLegend = `width: calc(100% - ${this.#core.scaleW}px - 1em); margin: .5em 0 1em 1em; ${theme.legend.text}; color: ${theme.legend.colour}; text-align: left;`
      let styleLegendTitle = "margin-right: 1em; white-space: nowrap;"
    const styleInputs = "display: inline; margin-left: -1em;"
    const styleControls = "float: right; margin: 0.5em; opacity:0"
    const mouseOver = "onmouseover='this.style.opacity=1'"
    const mouseOut = "onmouseout='this.style.opacity=0'"

    styleLegendTitle += (o?.type === "chart")? "font-size: 1.5em;" : "font-size: 1.2em;"

    const node = `
      <div id="${o.id}" class="legend" style="${styleLegend}">
        <span class="title" style="${styleLegendTitle}">${o.title}</span>
        <dl style="${styleInputs}">${this.buildInputs(o)}</dl>
        <div class="controls" style="${styleControls}" ${mouseOver} ${mouseOut}>${this.buildControls(o)}</div>
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
      let colour = (o.colours?.[i]) ? ` color: ${o.colours[i]};` : ""
      let inputV = (o.inputs[input] !== undefined) ? o.inputs[input] : "---"
      inp +=
      `<dt style="${styleDT}">${input}:</dt>
      <dd style="${styleDD}${colour}">${inputV}</dd>`;
      ++i
    }
    return inp
  }

  buildControls(o) {
    let inp = "";
    let id = this.#parent.ID

    // visibility
    // move up
    inp += `<span id="${id}_up" class="control">${up}</span>`
    // move down
    inp += `<span id="${id}_down" class="control">${down}</span>`
    // collapse
    inp += `<span id="${id}_collapse" class="control">${collapse}</span>`
    // maximize
    inp += `<span id="${id}_maximize" class="control">${maximize}</span>`
    // restore
    inp += `<span id="${id}_restore" class="control">${restore}</span>`
    // remove
    inp += `<span id="${id}_remove" class="control">${close}</span>`
    // config
    inp += `<span id="${id}_config" class="control">${config}</span>`


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

    this.#controlsList = DOM.findBySelectorAll(`#${options.id} .controls .control`)
    for (let c of this.#controlsList) {
      let svg = c.querySelector('svg');
      svg.style.width = `${this.#controls.width}px`
      svg.style.height = `${this.#controls.height}px`
      svg.style.fill = `${this.#controls.fill}`

      c.addEventListener('click', this.onMouseClick.bind(this))
    }

    return options.id
  }

  remove(id) {
    if (!(id in this.#list)
    || this.#list[id].type === "chart") return false
    
    this.#list[id].el.remove()
    delete this.#list[id]

    for (let c of this.#controlsList) {
      c.removeEventListener('click', this.onMouseClick)
    }
    

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
