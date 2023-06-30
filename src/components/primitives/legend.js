// legend.js

import { isObject, isString } from "../../utils/typeChecks"
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
  #theme
  #input


  #controlsList

  constructor(target, parent) {
    this.#elTarget = target
    this.#list = {}
    this.#parent = parent
    this.#core = parent.core
    this.#theme = parent.core.theme.legend
    this.eventsListen()
  }

  get elTarget() { return this.#elTarget }
  get list() { return this.#list }

  destroy() {
    this.#core.off("chart_pan", this.primaryPanePan)
    this.#core.off("chart_panDone", this.primaryPanePanDone)

    for (let l in this.#list) {
      this.remove(l)
    }
    this.#elTarget.remove()
  }

  eventsListen() {

    // this.#input = new Input(this.#elTarget, { disableContextMenu: false, });

    this.#core.on("chart_pan", this.primaryPanePan.bind(this))
    this.#core.on("chart_panDone", this.primaryPanePanDone.bind(this))
  }

  /**
   * process legend actions
   * @param {Object} e - pointer event
   * @memberof Legends
   */
  onMouseClick(e) {
    const which = (s) => {
      if (isString(s.dataset.icon)) 
        return {id: s.id, icon: s.dataset.icon}
      else if (s.parentElement.className !== "controls") 
        return which(s.parentElement)
      else
        return false
    }
    return which(e)
  }

  onMouseOver(e) {

  }

  primaryPanePan() {
    for (let property of userSelect) {
      this.#elTarget.style.setProperty(property, "none");
    }
  }

  primaryPanePanDone() {
    for (let property of userSelect) {
      this.#elTarget.style.removeProperty(property);
    }
  }

  add(options) {
    if (!isObject(options) || !("title" in options)) return false

    let click
    const parentError = () => {this.#core.error("ERROR: Legend parent missing!")}
    options.id = options?.id || uid("legend")
    options.type = options?.type || "overlay"
    options.parent = options?.parent || parentError

    const html = this.elTarget.buildLegend(options, this.#core.theme)

    this.#elTarget.legends.insertAdjacentHTML('beforeend', html)
    const legendEl = this.#elTarget.legends.querySelector(`#legend_${options.id}`)
    this.#controlsList = legendEl.querySelectorAll(`.control`)

    this.#list[options.id] = {
      el: legendEl, 
      type: options.type, 
      source: options?.source,
      click: []
    }

    for (let el of this.#controlsList) {
      let svg = el.querySelector('svg');

// TODO: set values dynamically via CSS variables
// https://stackoverflow.com/a/60357706/15109215

      svg.style.width = `${this.#theme.controlsW}px`
      svg.style.height = `${this.#theme.controlsH}px`
      svg.style.fill = `${this.#theme.controlsColour}`
      svg.onpointerover = (e) => e.currentTarget.style.fill = this.#theme.controlsOver
      svg.onpointerout = (e) => e.currentTarget.style.fill = this.#theme.controlsColour

      click = options.parent.onLegendAction.bind(options.parent)
      this.#list[options.id].click.push({el, click})
      el.addEventListener('click', click)
    }

    return options.id
  }

  remove(id) {
    if (!(id in this.#list)
    || this.#list[id].type === "chart") return false
    
    this.#list[id].el.remove()

    for (let c of this.#list[id].click) {
      c.el.removeEventListener('click', c.click)
    }

    delete this.#list[id]

    return true
  }

  // remove "data" as callback will provide this
  update(id, data) {
    if (!(isObject(data)) 
    || !(id in this.#list)) return false

    let source = this.#list[id].source(data.pos)
    const html = this.#elTarget.buildInputs(source)
    this.#elTarget.legends.querySelector(`#legend_${id} dl`).innerHTML = html
  }
}

