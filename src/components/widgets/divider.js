// divider.js
// dragable divider to resize chart panes

import { elementDimPos, findBySelector } from "../../utils/DOM"
import { isNumber, isString } from "../../utils/typeChecks"
import Input from "../../input"
import { CLASS_DIVIDERS } from "../../definitions/core"
import { DIVIDERHEIGHT } from "../../definitions/chart"


export default class Divider {

  #id
  #core
  #config
  #theme
  #widgets
  #chartPane

  #elDividers
  #elDivider

  #cursorPos
  #cursorStyle
  #input

  static dividerList = {}
  static divideCnt = 0
  static class = CLASS_DIVIDERS
  static name = "Dividers"
  static type = "divider"

  static create(widgets, config) {

    const id = `${config.core.id}_divider_${++Divider.divideCnt}`
    config.id = id

    // add entry
    Divider.dividerList[id] = new Divider(widgets, config)

    return Divider.dividerList[id]
  }

  static destroy() {
    // destroy all dividers
    for (let id in Divider.dividerList) {
      Divider.dividerList[id].destroy()
      // remove entry
      delete Divider.dividerList[id]
    }
  }

  static defaultNode() {
    const dividersStyle = `position: absolute;`
    const node = `
  <div slot="widget" class="${CLASS_DIVIDERS}" style="${dividersStyle}"></div>
  `
    return node
  }

  constructor(widgets, config) {

    const cfg = {...config}

    this.#widgets = widgets
    this.#core = cfg.core
    this.#config = cfg
    this.#theme = cfg.core.theme
    this.#id = cfg.id
    this.#chartPane = cfg.chartPane
    this.#elDividers = widgets.elements[Divider.type]
    this.init()
  }

  get el() { return this.#elDivider }
  get id() { return this.#id }
  get chartPane() { return this.#chartPane }
  get config() { return this.#core.config }
  get pos() { return this.dimensions }
  get dimensions() { return elementDimPos(this.#elDivider) }
  get height() { return this.#elDivider.getBoundingClientRect().height }
  set cursor(c) { this.setCursorStyle(c) }
  get cursor() { return this.#cursorStyle }
  get type() { return Divider.type }


  init() {
    // insert element
    this.mount()
  }

  start() {
    // set mouse pointer
    this.cursor = "row-resize"

    // set up event listeners
    this.eventsListen()
  }

  destroy() {
    // remove event listeners
    this.#input.destroy()
    // remove element
    this.el.remove()
    // remove entry from list
    delete Divider.dividerList[this.id]
  }

  eventsListen() {
    this.#input = new Input(this.#elDivider, {disableContextMenu: false});

    this.#input.on("pointerover", this.onMouseEnter.bind(this));
    this.#input.on("pointerout", this.onMouseOut.bind(this));
    this.#input.on("pointerdrag", this.onPointerDrag.bind(this));
    this.#input.on("pointerdragend", this.onPointerDragEnd.bind(this));
  }

  on(topic, handler, context=this) {
    this.#core.on(topic, handler, context)
  }

  off(topic, handler, context=this) {
    this.#core.off(topic, handler, context)
  }

  emit(topic, data) {
    this.#core.emit(topic, data)
  }

  onMouseEnter() {
    this.#elDivider.style.background = this.#theme.divider.active
    this.#core.MainPane.onMouseEnter()
  }

  onMouseOut() {
    this.#elDivider.style.background = this.#theme.divider.idle
    this.#core.MainPane.onMouseEnter()
  }

  onPointerDrag(e) {
    this.#cursorPos = this.#core.MainPane.cursorPos // [e.position.x, e.position.y]
    this.#elDivider.style.background = this.#theme.divider.active
    this.emit(`${this.id}_pointerdrag`, this.#cursorPos)
    this.emit(`divider_pointerdrag`, {
      id: this.id,
      e: e,
      pos: this.#cursorPos,
      chartPane: this.chartPane
    })
    this.chartPane.resize()
  }

  onPointerDragEnd(e) {
    
    this.#elDivider.style.background = this.#theme.divider.idle
    this.#cursorPos = this.#core.MainPane.cursorPos // [e.position.x, e.position.y]
    this.emit(`${this.id}_pointerdragend`, this.#cursorPos)
    this.emit(`divider_pointerdragend`, {
      id: this.id,
      e: e,
      pos: this.#cursorPos,
      chartPane: this.chartPane
    })
    this.chartPane.resize()
  }

  mount() {
    if (this.#elDividers.lastElementChild == null)
      this.#elDividers.innerHTML = this.dividerNode()
    else
      this.#elDividers.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode())

    this.#elDivider = findBySelector(`#${this.#id}`, this.#elDividers)
  }

  dividerNode() {
    let theme = this.#core.theme,
        top = this.#chartPane.pos.top - elementDimPos(this.#elDividers).top,
      width = this.#core.elBody.width - this.#core.elBody.scale.width, //this.#core.elBody.width,
      height = (isNumber(this.config.dividerHeight)) ? 
        this.config.dividerHeight : DIVIDERHEIGHT,
      left = this.#core.elBody.tools.width; // theme.tools.width // 
      top -= (height / 2)

    switch(theme.tools.location) {
      case "left": break;
      case false:
      case "none":
      case "right": left *= -1; break;
      default: break
    }

    const styleDivider = `position: absolute; top: ${top}px; left: ${left}px; z-index:100; width: 100%; height: ${height}px; background: ${theme.divider.idle};`
    const styleLine = `width: 100%; margin: 3.5px 0; border: 0; border-top: ${theme.divider.style} ${theme.divider.line};`

    const node = `
      <div id="${this.#id}" class="divider" style="${styleDivider}"><hr style="${styleLine}"></div>
    `
    return node
  }

  setPos() {
    let top = this.#chartPane.pos.top - elementDimPos(this.#elDividers).top;
        top = top - (this.height / 2) + 1
    this.#elDivider.style.top = `${top}px`
    this.#elDivider.style.left = `${this.#core.elBody.tools.width}px`
  }

  setWidth() {
    this.#elDivider.style.width = `${this.#core.elMain.width + this.#core.elBody.scale.width}px`
    this.#elDivider.style.left = `${this.#core.elBody.tools.width}px`
  }

  setCursorStyle(c) {
    if (!isString(c)) return
    this.#cursorStyle = c
    this.#elDivider.style.cursor = c
  }

  hide() {
    this.#elDivider.style.display = `none`
  }

  show() {
    this.#elDivider.style.display = `block`
  }
}
