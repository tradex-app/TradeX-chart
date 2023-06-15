// legends.js
// <tradex-legends></tradex-legends>

import element from "./classes/element"
import { isString } from "../../utils/typeChecks"
import { close, up, down, restore, maximize, collapse, config } from "../../definitions/icons"


const mouseOver = "onmouseover='this.style.opacity=1'"
const mouseOut = "onmouseout='this.style.opacity=0'"
const template = document.createElement('template')
template.innerHTML = `
<style>

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
.legend .control {
  margin-right:2px;
}


.chart .upper {
  right: 0;
  z-index:1;
}
.chart .upper .title,
.offchart .upper .title {
  display: none;
}
.chart .lower .title {
  visibility: visible;
}

.offchart .upper {
  right: 0;
  z-index:1;
}
</style>
<div class="legends">
  <slot name="legend"></slot>
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
    const styleControls = ""

    const controls = (!theme.legend.controls) ? "" :
    `
      <div class="controls" style="${styleControls}">
        ${this.buildControls(o)}
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

    // visibility
    // if (o?.type !== "chart") {
      // move up
      inp += `<span id="${id}_up" class="control" data-icon="up">${up}</span>`
      // move down
      inp += `<span id="${id}_down" class="control" data-icon="down">${down}</span>`
    // }
    // collapse
    inp += `<span id="${id}_collapse" class="control" data-icon="collapse">${collapse}</span>`
    // maximize
    inp += `<span id="${id}_maximize" class="control" data-icon="maximize">${maximize}</span>`
    // restore
    inp += `<span id="${id}_restore" class="control" data-icon="restore">${restore}</span>`
    // remove
    inp += (o?.type !== "chart") ? `<span id="${id}_remove" class="control" data-icon="remove">${close}</span>` : ``
    // config
    inp += (o?.type !== "offchart") ? `<span id="${id}_config" class="control" data-icon="config">${config}</span>` : ``

    return inp
  }
}

customElements.get('tradex-legends') || window.customElements.define('tradex-legends', tradeXLegends)
