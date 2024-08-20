// tabs.js
// tabbed content panels
// <tradex-tabs></tradex-tabs>

import element from "./classes/element"
import { isFunction, isNumber, isObject, isString } from "../../utils/typeChecks"
import { isElement } from "../../utils/DOM"
import { GlobalStyle } from "../../definitions/style"


export const tabStyles = `
/** default Config Dialogue widget styles */

.tabbedContent {
  overflow: hidden;
}

.tabbedContent .content {
  padding: 0;
}
.tabbedContent .tabs {
  display: flex;
  flex-wrap: wrap;
  background: #e5e5e588;
  box-shadow: 0 48px 80px -32px rgba(0,0,0,0.3);
  width: 300px;
}
.tabbedContent .input {
  position: absolute;
  opacity: 0;
}
.tabbedContent .label {
  width: auto;
  padding: .4em 1em;
  background: #e5e5e588;
  cursor: pointer;
  font-weight: bold;
  color: #7f7f7f;
  transition: background 0.1s, color 0.1s;
}
.tabbedContent .label:hover {
  background: #d8d8d8;
}
.tabbedContent .label:active {
  background: #ccc;
}
.tabbedContent .input:focus + .label {
  z-index: 1;
}
.tabbedContent .input:checked + .label {
  background: #fff;
  color: #000;
}
.tabbedContent .panel {
  display: none;
  padding: 1em 1em 1.5em;
  background: #ffffff88;
  order: 100;
}
.active .tabbedContent .input:checked + .label + .panel {
  display: grid;
  width: 100%;
  grid-template-columns: [label] 1fr [input] 10em [end];
  grid-row-gap: 2px;
  align-items: center;
}
.tabbedContent .panel label,
.tabbedContent .panel input {
  ${GlobalStyle.FONTSTRING}
  padding: 1px 2px;
}
.tabbedContent .panel label {
  grid-column-start: label;
  grid-column-end: input;
  color: #444;
  font-weight: bold;
}
.tabbedContent .panel input {
  border: 1px solid #888;
}
.tabbedContent .panel input[type="color"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 3em;
  height: 2em;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  border: none;
}
.tabbedContent .panel input[type="color"]::-webkit-color-swatch,
.tabbedContent .panel input[type="color"]::-moz-color-swatch {
  border-radius: 0;
  padding: 1px;
  margin 0;
  border-radius: 3px;
  border: 1px solid #000;
  height: 2em;
  background: #fff;
}
`

const template = document.createElement('template')
template.innerHTML = `
<style>
  ${tabStyles}
}
</style>
<div class="tabbedContent">
</div>
`

export default class tradeXTabs extends element {

  #id
  #elTabs
  #tabsSlot
  #tabs
  #onSlotChange = this.onSlotChange.bind(this)

  constructor () {
    super(template)
  }

  destroy() {

  }

  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#elTabs = this.shadowRoot.querySelector('.tabbedContent')
        this.#tabsSlot = this.shadowRoot.querySelector('slot[name="viewporttabs"]')
        this.#tabsSlot.addEventListener("slotchange", this.#onSlotChange)
      }
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.#tabsSlot.removeEventListener("slotchange", this.#onSlotChange)
  }

  get hastabsSlot() { return true }
  get tabsSlot() { return this.#tabsSlot  }
  get tabs() { return this.#tabs }

  onSlotChange() {
    this.#tabs = Array.from( this.tabsSlot.assignedElements() ).find(i => i.localName === 'tabs')[0]
  }

  insertTab(t) {
    let {id, label, content, checked} = t

    switch(typeof id) {
      case "string":
      case "number": break;
      default: id = this.#tabs.length
    }

    let tab = tabsPanel(id, label, content, checked)
        tab = this.#elTabs.insertAdjacentHTML("afterend", tab)

    this.#tabs.push({id, label, content, checked, tab})
  }

  removeTab(t) {
    if (isString(t)) {
      let tab = this.#elTabs.querySelectorAll(`.tab-${t}`)
      for (let d of tab) {
        d.remove()
      }
      for (let d=0; d<this.#tabs.length; d++) {
        if (this.#tabs[d].id == t)
          delete this.#tabs[d]
      }
    }
    else if (isNumber(t)) {
      let elms = this.#elTabs.querySelectorAll(`.input`)

    }
  }
}



export class Tabs {

  static #cnt
  static defaultStyles = tabStyles

  static create(config) {
    if (!isObject(config)) config = {}

    config.id = config?.id || Tabs.#cnt++

    const tabs = new Tabs(config)
    return tabs
  }

  #id
  #element
  #elementHtML

  /**
   * 
   * @param {object} config - {id, element, params}
   */
  constructor(config) {

    this.#id = config.id
    this.#elementHtML = tabsElement(config.params)
    if (isElement(config?.element)) {
      this.#element = config.element
      this.#element.innerHTML = this.#elementHtML
    }
  }

}

export function tabsElement(c={}) {
  if (!isObject(c)) c = {}

  const element = `
  <div class="tabs">
    ${tabsBuild(c)}
  </div>
  `
  return element
}

/**
 * build tabs for config dialogue
 * @param {object} c - {tab1: "foo", tab2: "bar", tab3: "baz", ...}
 * @param {function} [fn] - optional function to process tab
 */
export function tabsBuild(c={}, fn) {
  if (!isObject(c)) c = {}

  let tabs = ``
  let t = Object.keys(c)
  let i = t.length

  // sent stupid data, receive stupid results
  if (i < 1) {
    tabs += tabsPanel(1, "Question", "Why did the chicken cross the road?", true)
    tabs += tabsPanel(2, "Answer", "To get to the other side.")
  }
  // process content object into tabs
  else {
    let j = []
    for (--i; i>=0; i-- ) {
      let f = (i == 0)? true : false
      let content = (isFunction(fn)) ? fn(c[t[i]]) : c[t[i]]
      j.push(tabsPanel(i, t[i], content, f))
    }
    tabs = j.reverse().join()
  }
  return tabs
}

/**
 * build a tabbed panel
 * @export
 * @param {number|string} id
 * @param {string} label
 * @param {string} content
 * @param {boolean} [checked=false]
 * @return {string} - HTML
 */
export function tabsPanel(id, label, content, checked=false) {
  content = (isString(content)) ? content : ``

  const check = (!!checked) ? `checked="checked"` : ``
  const tab = `
  <input class="input tab-${id}" name="tabs" type="radio" id="tab-${id}" ${check}/>
  <label class="label tab-${id}" for="tab-${id}">${label}</label>
  <div class="panel tab-${id}">
    ${content}
  </div>
  `
  return tab
}

customElements.get('tradex-tabs') || window.customElements.define('tradex-tabs', tradeXTabs)
