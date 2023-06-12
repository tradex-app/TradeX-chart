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

  end() {
    this.#core.off("chart_pan", this.onChartPan)
    this.#core.off("chart_panDone", this.onChartPanDone)
  }

  eventsListen() {

    // this.#input = new Input(this.#elTarget, { disableContextMenu: false, });

    this.#core.on("chart_pan", this.onChartPan.bind(this))
    this.#core.on("chart_panDone", this.onChartPanDone.bind(this))
  }

  /**
   * process legend actions
   * @param {object} e - pointer event
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
      let styleInputs = "" //"display: inline; margin: 0 0 0 -1em;"
      let styleLegend = `${theme.legend.font}; color: ${theme.legend.colour}; text-align: left;`
      let styleLegendTitle = "" //"margin-right: 1em; white-space: nowrap;"
    const styleControls = ""
    const t = this.#elTarget

    const controls = (!theme.legend.controls) ? "" :
    `
      <div class="controls" style="${styleControls}">
        ${t.buildControls(o)}
      </div>
    `;

    switch (o?.type) {
      case "chart":
        styleLegendTitle += "font-size: 1.5em;"; 
        break;
      case "offchart":
        styleLegend += " margin-bottom: -1.5em;";
        styleLegendTitle += ""; 
        o.title = ""
        break;
      default:
        styleLegendTitle += "font-size: 1.2em;"; 
        break;
    }

    const node = `
      <div id="legend_${o.id}" class="legend ${o.type}" style="${styleLegend}" data-type="${o.type}" data-id="${o.id}" data-parent="${o.parent.id}">
        <div class="lower">
          <span class="title" style="${styleLegendTitle}">${o.title}</span>
          <dl style="${styleInputs}">${t.buildInputs(o)}</dl>
        </div>
        <div class="upper">
            <span class="title" style="${styleLegendTitle}">${o.title}</span>
            ${controls}
      </div>
     </div>
    `
    return node
  }

  add(options) {
    if (!isObject(options) || !("title" in options)) return false

    const parentError = () => {this.#core.error("ERROR: Legend parent missing!")}
    options.id = options?.id || uid("legend")
    options.type = options?.type || "overlay"
    options.parent = options?.parent || parentError

    const html = this.buildLegend(options)
    // const elem = DOM.htmlToElement(html)

    this.#elTarget.legends.insertAdjacentHTML('beforeend', html)
    const legendEl = this.#elTarget.legends.querySelector(`#legend_${options.id}`)
    this.#list[options.id] = {el: legendEl, type: options.type, source: options?.source}

    this.#controlsList = legendEl.querySelectorAll(`.control`)
    for (let c of this.#controlsList) {
      let svg = c.querySelector('svg');

// TODO: set values dynamically via CSS variables
// https://stackoverflow.com/a/60357706/15109215

      svg.style.width = `${this.#theme.controlsW}px`
      svg.style.height = `${this.#theme.controlsH}px`
      svg.style.fill = `${this.#theme.controlsColour}`
      svg.onpointerover = (e) => e.currentTarget.style.fill = this.#theme.controlsOver
      svg.onpointerout = (e) => e.currentTarget.style.fill = this.#theme.controlsColour

      c.addEventListener('click', options.parent.onLegendAction.bind(options.parent))
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
    this.#elTarget.legends.querySelector(`#legend_${id} dl`).innerHTML = html
  }
}

