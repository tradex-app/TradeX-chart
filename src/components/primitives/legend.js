// legend.js

import { isObject } from "../../utils/typeChecks"
import { uid } from "../../utils/utilities"
import Input from "../../input"

const userSelect = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select",
]

export default class Legends {

  #elTarget
  #list
  #parent
  #core
  #input

  #controls = {
    width: 18,
    height: 18,
    fill: "#aaa"
  }
  #controlsList

  constructor(target, parent) {
    this.#elTarget = target
    this.#list = {}
    this.#parent = parent
    this.#core = parent.core
    this.eventsListen()
  }

  get list() { return this.#list }

  eventsListen() {
    this.moveEvent = new PointerEvent("pointermove", {bubbles: true, cancelable: true,})

    this.#input = new Input(this.#elTarget, { disableContextMenu: false, });
    this.#input.on("pointermove", this.onMouseMove.bind(this))

    this.#core.on("chart_pan", this.onChartPan.bind(this))
    this.#core.on("chart_panDone", this.onChartPanDone.bind(this))
  }

  onMouseMove(e) {
    // console.group("legend :",e)
    // this.#parent.element.dispatchEvent(this.moveEvent)
    // this.#core.MainPane.elements.elRows.dispatchEvent(this.moveEvent)
    // this.#parent.onMouseMove(e)
  }

  onMouseClick() {
  }

  onChartPan() {
    for (let property of userSelect) {
      this.#elTarget.style.setProperty(property, "none");
    }
  }

  onChartPanDone() {
    for (let property of userSelect) {
      this.#elTarget.style.removeProperty(property);
    }
  }

  buildLegend(o) {
    const theme = this.#core.theme
      let styleInputs = "order: 1; display: inline; margin: 0 0 0 -1em;"
    const styleLegend = `${theme.legend.text}; color: ${theme.legend.colour}; text-align: left;`
      let styleLegendTitle = "margin-right: 1em; white-space: nowrap;"
    const styleControls = "order:2; float: right; margin: 0 0.5em 0; opacity:0"
    const mouseOver = "onmouseover='this.style.opacity=1'"
    const mouseOut = "onmouseout='this.style.opacity=0'"
    const t = this.#elTarget

    styleLegendTitle += (o?.type === "chart") ? "font-size: 1.5em;" : "font-size: 1.2em;"

    const controls = (!theme.legend.controls) ? "" :
    `
      <div slot="controls" class="controls" style="${styleControls}" ${mouseOver} ${mouseOut}>${t.buildControls(o)}</div>
    `;

    const node = `
      <div slot="legend" id="${o.id}" class="legend" style="${styleLegend}">
        <div>
          <span slot="title" class="title" style="${styleLegendTitle}">${o.title}</span>
          <dl style="${styleInputs}">${t.buildInputs(o)}</dl>
        </div>
        ${controls}
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

    this.#elTarget.insertAdjacentHTML('beforeend', html)
    const legendEl = this.#elTarget.querySelector(`#${options.id}`) // DOM.findByID(options.id)
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
    const html = this.#elTarget.buildInputs(source)
    this.#elTarget.querySelector(`#${id} dl`).innerHTML = html
  }
}
