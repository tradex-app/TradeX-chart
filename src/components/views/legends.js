// legends.js
// <tradex-legends></tradex-legends>

import element from "./classes/element"
import { isString } from "../../utils/typeChecks"
import { close, up, up2, down, down2, restore, 
          maximize, collapse, expand, config,
          notVisible, visible } from "../../definitions/icons"


const mouseOver = "onmouseover='this.style.opacity=1'"
const mouseOut = "onmouseout='this.style.opacity=0'"
const template = document.createElement('template')
template.innerHTML = `
<style>

.legends {
  display: flex;
  flex-direction: column;
}
.legends .collapse {
  order: 999;
  padding-left: 0.5em;
}

.legend {
  display: block;
  position: relative;
  width: 100%;
  min-height: 2em;
  margin: 0;
}
.legend * {
  margin: 0;
  padding: 0;
  vertical-align: middle;
}
.legend .upper,
.legend .lower {
  display: block;
  position: absolute;
  top: 0
  width: 100%;
  padding: 0 0.5em;
  white-space: nowrap;
}
.legend .controls {
  opacity: 0;
}
.legend .controls svg {
  vertical-align: text-top;
  margin-bottom: 0.2em;
}
.legend dl {
  display: inline; 
  margin: 0 0 0 -1em;
  overflow: hidden;
}
.legend dl:first-child,
.legend dl dt:first-of-type {
  margin-left: 0;
}
.legend dt {
  display: inline; margin-left: 1em;
}
.legend dd {
  display: inline; margin-left: .25em; color: #F900FE;
}
.legend .upper:hover {
  background: #444444cc;
  border-radius: 5px;
}
.legend .upper:hover .controls {
  opacity: 1;
}
.legend .title {
  margin-right: 1em;
  white-space: nowrap;
}
.legend .lower .title {
  visibility:hidden;
}
.legend .controls,
.legend dl {
  display: inline;
}
.legend .control,
.legend .control.collapse {
  margin-right: 2px;
  padding-left: 0;
}


.legends.hide .legend.indicator {
  display:none;
}


.controls .control:hover {
  background: #889;
  border-radius: 3px;
}

.controls.maximized .up,
.controls.maximized .down,
.controls.maximized .expand,
.controls.maximized .collapse,
.controls.maximized .maximize,
.controls.maximized .remove
{
  display: none;
}

.controls.restored .restore
{
  display: none;
}

.controls.collapsed .collapse {
  display: none;
}

.controls.expanded .expand {
  display: none;
}

.controls.visible .visible {
  display: none;
}
.controls.visible .notvisible {
  display: inline;
}

.controls.notvisible .notvisible {
  display: none;
}
.controls.notvisible .visible {
  display: inline;
}

.chart .upper {
  right: 0;
  z-index:1;
}
.chart .upper .title,
.secondary .upper .title {
  display: none;
}
.chart .lower .title {
  visibility: visible;
}

.secondary .upper {
  right: 0;
  z-index:1;
}
</style>
<div class="legends">
  <slot name="legend"></slot>
  <div class="controls collapse restored">
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${up}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${down}</span>
  </div>
</div>
`

export default class tradeXLegends extends element {

  #title
  #elLegends

  #elTitle
  #elInputs
  #elControls

  #slot
  #hub = []

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    // element building must be done here
    // https://stackoverflow.com/a/43837330/15109215
    if (this.doInit) {
      this.doInit = false
      this.shadowRoot.appendChild(this.template.content.cloneNode(true))
      this.style.display = "block"

      this.#slot = this.shadowRoot.querySelector('slot')
      this.#elLegends = this.shadowRoot.querySelector('.legends')

      this.#elTitle = this.shadowRoot.querySelector('.title')
      this.#elInputs = this.shadowRoot.querySelector('dl')
      this.#elControls = this.shadowRoot.querySelector('.controls')

      this.#slot.addEventListener('slotchange', this.onSlotChange.bind(this))
    }
  }

  disconnectedCallback() {
  }

  get slot() { return this.#slot }
  get legends() { return this.#elLegends }

  get elTitle() { return this.#elTitle }
  get elInputs() { return this.#elInputs }
  get elControls() { return this.#elControls }
  get title() { return this.#title }
  set title(t) { this.setTittle(t) }

  onSlotChange(e) {
    this.#hub.forEach(cb => cb.handler.call(cb.context, e))
  }

  insert(legend) {
    this.legends.insertAdjacentHTML('beforeend', legend)
  }

  setTittle(t) {
    if (!isString) return
    this.#title = t
    this.elTitle.innerHTML = t
  }

  buildLegend(o, theme) {
      let styleInputs = "" //"display: inline; margin: 0 0 0 -1em;"
      let styleLegend = `${theme.legend.font}; color: ${theme.legend.colour}; text-align: left;`
      let styleLegendTitle = "" //"margin-right: 1em; white-space: nowrap;"
      let visibility = (o?.type !== "chart") ? `visible` : `notvisible`
    const styleControls = ""

    const controls = (!theme.legend.controls) ? "" :
    `
      <div class="controls restored expanded ${visibility}" style="${styleControls}">
        ${this.buildControls(o)}
      </div>
    `;

    switch (o?.type) {
      case "chart":
        styleLegendTitle += "font-size: 1.5em;"; 
        break;
      case "secondary":
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
          <dl style="${styleInputs}">${this.buildInputs(o)}</dl>
        </div>
        <div class="upper">
            <span class="title" style="${styleLegendTitle}">${o.title}</span>
            ${controls}
      </div>
     </div>
    `
    return node
  }

  buildInputs(o) {
    let i = 0,
        inp = "",
        input,
        blank = "", //"&nbsp;",
        styleDT = "", //"display: inline; margin-left: ",
        styleDD = "" //"display: inline; margin-left: .25em;";
    for (input in o.inputs) {
      let colour = (o?.colours?.[i]) ? ` color: ${o.colours[i]};` : ""
      let value = (o?.inputs?.[input] !== undefined) ? o.inputs[input] : blank
      let label = (o?.labels?.[i]) ? `${input}:` : blank
          styleDT += (o?.labels?.[i]) ? "1em;" : ".25em"
      inp +=
      `<dt style="${styleDT}">${label}</dt>
      <dd style="${styleDD}${colour}">${value}</dd>`;
      ++i
    }
    return inp
  }

  buildControls(o) {
    let inp = "";
    let id = o.id

    // move up
    inp += `<span id="${id}_up" class="control up" data-icon="up">${up2}</span>`
    // move down
    inp += `<span id="${id}_down" class="control down" data-icon="down">${down2}</span>`
    if (o?.type === "indicator") {
      // visible
      inp += `<span id="${id}_visible" class="control visible" data-icon="visible">${visible}</span>`
      // not visible
      inp += `<span id="${id}_notVisible" class="control notvisible" data-icon="notVisible">${notVisible}</span>`
    }
    if (o?.type !== "indicator") {
      // collapse
      inp += `<span id="${id}_collapse" class="control collapse" data-icon="collapse">${collapse}</span>`
      // expand
      inp += `<span id="${id}_expand" class="control expand" data-icon="expand">${expand}</span>`
      // maximize
      inp += `<span id="${id}_maximize" class="control maximize" data-icon="maximize">${maximize}</span>`
      // restore
      inp += `<span id="${id}_restore" class="control restore" data-icon="restore">${restore}</span>`
    }
    // remove
    inp += (o?.type !== "chart") ? `<span id="${id}_remove" class="control remove" data-icon="remove">${close}</span>` : ``
    // config
    inp += (o?.type !== "secondary") ? `<span id="${id}_config" class="control config" data-icon="config">${config}</span>` : ``

    return inp
  }
}

customElements.get('tradex-legends') || window.customElements.define('tradex-legends', tradeXLegends)
