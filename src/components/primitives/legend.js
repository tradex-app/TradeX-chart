// legend.js

import { isObject } from "../../utils/typeChecks"
import { uid } from "../../utils/utilities"

export default class Legends {

  #targetEl
  #list
  #parent
  #core

  #controls = {
    width: 18,
    height: 18,
    fill: "#aaa"
  }
  #controlsList

  constructor(target, parent) {
    this.#targetEl = target
    this.#list = {}
    this.#parent = parent
    this.#core = parent.core
  }

  get list() { return this.#list }

  onMouseClick() {

  }

  buildLegend(o) {
    const theme = this.#core.theme
      let styleInputs = "order: 1; display: inline; margin: 0 0 0 -1em;"
    const styleLegend = `${theme.legend.text}; color: ${theme.legend.colour}; text-align: left;`
      let styleLegendTitle = "margin-right: 1em; white-space: nowrap;"
    const styleControls = "order:2; float: right; margin: 0 0.5em 0; opacity:0"
    const mouseOver = "onmouseover='this.style.opacity=1'"
    const mouseOut = "onmouseout='this.style.opacity=0'"
    const t = this.#targetEl

    styleLegendTitle += (o?.type === "chart") ? "font-size: 1.5em;" : "font-size: 1.2em;"

    const node = `
      <div slot="legend" id="${o.id}" class="legend" style="${styleLegend}">
        <div>
          <span slot="title" class="title" style="${styleLegendTitle}">${o.title}</span>
          <dl style="${styleInputs}">${t.buildInputs(o)}</dl>
        </div>
        <div slot="controls" class="controls" style="${styleControls}" ${mouseOver} ${mouseOut}>${t.buildControls(o)}</div>
      </div>
    `
    return node
  }

  add(options) {
    if (!isObject(options) || !("title" in options)) return false

    options.id = uid(options?.id || "legend")
    options.type = options?.type || "overlay"
    options.parent = this.#parent.ID

    const html = this.buildLegend(options)
    // const elem = DOM.htmlToElement(html)

    this.#targetEl.insertAdjacentHTML('beforeend', html)
    const legendEl = this.#targetEl.querySelector(`#${options.id}`) // DOM.findByID(options.id)
    this.#list[options.id] = {el: legendEl, type: options.type, source: options?.source}

    this.#controlsList = legendEl.querySelectorAll(`.control`)
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

  // remove "data" as callback will provide this
  update(id, data) {
    if (!(isObject(data)) 
    || !(id in this.#list)) return false

    let source = this.#list[id].source(data.pos)
    const html = this.#targetEl.buildInputs(source)
    this.#targetEl.querySelector(`#${id} dl`).innerHTML = html
  }
}
