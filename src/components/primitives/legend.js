// legend.js

import { isObject, isString } from "../../utils/typeChecks"
import { debounce, uid } from "../../utils/utilities"
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
  #parent
  #core
  #theme
  #input
  #controls
  #collapse
  #collapseList = []
  #controlsList
  #list = {}
  #show
  #hide
  #toggle = null


  constructor(target, parent) {
    this.#elTarget = target
    this.#parent = parent
    this.#core = parent.core
    this.#theme = parent.core.theme.legend
    this.init()
    this.eventsListen()
  }

  get elTarget() { return this.#elTarget }
  get list() { return this.#list }
  set collapse(c) { this.setCollapse(c) }
  get collapse() { return this.#collapse }

  destroy() {
    this.#core.hub.expunge(this)

    for (let l in this.#list) {
      if (l === "collapse") continue
      this.remove(l)
    }
    // TODO: remove collapse listeners
    this.#elTarget.remove()
  }

  eventsListen() {

    // this.#input = new Input(this.#elTarget, { disableContextMenu: false, });

    this.#core.on("chart_pan", this.primaryPanePan, this)
    this.#core.on("chart_panDone", this.primaryPanePanDone, this)
  }

  init() {
    const legends = this.#elTarget.legends
    this.#controls = legends.querySelector(`.controls`)
    this.#collapse = legends.querySelectorAll(`.control`)
    this.#show = legends.querySelector("#showLegends")
    this.#hide = legends.querySelector("#hideLegends")
    this.#controls.style.display = "none"
    this.icons(this.#collapse, {id: "collapse", parent: this})
    this.#elTarget.legends.classList.add("hide")
    this.#toggle = "hide"
    this.collapse = "show"
  }

  /**
   * process legend actions
   * @param {Object} e - pointer event
   * @memberof Legends
   */
  onPointerClick(e) {
    const which = (s) => {
      if (isString(s.dataset.icon)) 
        return {id: s.id, icon: s.dataset.icon, parent: s.parentElement}
      else if (s.parentElement.className !== "controls") 
        return which(s.parentElement)
      else
        return false
    }
    return which(e)
  }

  onMouseOver(e) {

  }

  onLegendAction(e) {
    const which = this.onPointerClick(e.currentTarget)
    this.setCollapse(which.icon)
  }

  setCollapse(c) {
    // collapse the legends
    if (c === "show" && this.#toggle !== "show") {
      this.#toggle = c
      this.#show.style.display = "none"
      this.#hide.style.display = "inline-block"
      this.#elTarget.legends.classList.toggle("hide")
    }
    // expand the legends
    else if (c === "hide" && this.#toggle !== "hide") {
      this.#toggle = c
      this.#show.style.display = "inline-block"
      this.#hide.style.display = "none"
      this.#elTarget.legends.classList.toggle("hide")
    }
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

  /**
   * add a legend to the chart pane
   * @param {object} options - {id, type, parent, source}
   * @return {string} id 
   * @memberof Legends
   */
  add(options) {
    if (!isObject(options)) return false

    const parentError = () => {this.#core.error("ERROR: Legend parent missing!")}
    options.id = options?.id || uid("legend")
    options.type = options?.type || "overlay"
    options.title = options?.title || options?.parent.legendName
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
    // style and add event listeners
    this.icons(this.#controlsList, options)

    // only display the collapse control if indicator legend
    if (options.type == "indicator") {
      this.#controls.style.display = "block"
      // do not display collapse control if a singular secondary pane indicator
      if (!options.parent.primaryPane &&
        Object.keys(this.#list).length < 3)
        this.#controls.style.display = "none"
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

    // hide the collapse control if no indicator legends
    if (Object.keys(this.#list).length < 2)
      this.#controls.style.display = "none"

    return true
  }

  // remove "data" as callback will provide this
  update(id, data) {
    if (!(isObject(data)) ||
        !(id in this.#list) ||
        this.#core.range.data.length == 0) return false

    let source = this.#list[id].source(data.pos)
    const html = this.#elTarget.buildInputs(source)
    this.#elTarget.legends.querySelector(`#legend_${id} dl`).innerHTML = html
  }

  icons(icons, options) {
    let click

    for (let el of icons) {
      let svg = el.querySelector('svg');

// TODO: set values dynamically via CSS variables
// https://stackoverflow.com/a/60357706/15109215

      svg.style.width = `${this.#theme.controlsW}px`
      svg.style.height = `${this.#theme.controlsH}px`
      svg.style.fill = `${this.#theme.controlsColour}`
      svg.onpointerover = (e) => e.currentTarget.style.fill = this.#theme.controlsOver
      svg.onpointerout = (e) => e.currentTarget.style.fill = this.#theme.controlsColour

      click = options.parent.onLegendAction.bind(options.parent)
      if (options.id === "collapse")
        this.#collapseList.push({el, click})
      else
        this.#list[options.id].click.push({el, click})
      el.addEventListener('click', click)
    }
  }
}

