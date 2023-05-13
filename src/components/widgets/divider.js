// divider.js
// dragable divider to resize off chart indicators

import DOM from "../../utils/DOM"
import { isNumber } from "../../utils/typeChecks"
import Input from "../../input"

import {
  CLASS_DIVIDERS
} from "../../definitions/core"
import {
  DIVIDERHEIGHT
} from "../../definitions/chart"


export default class Divider {

  #id
  #core
  #config
  #theme
  #widgets
  #offChart

  #elDividers
  #elDivider
  #elOffChart

  #cursorPos
  #controller
  #input

  static dividerList = {}
  static divideCnt = 0
  static class = CLASS_DIVIDERS
  static name = "Dividers"
  static type = "divider"


  constructor(widgets, config) {

    const cfg = {...config}

    this.#widgets = widgets
    this.#core = cfg.core
    this.#config = cfg
    this.#theme = cfg.core.theme
    this.#id = cfg.id
    this.#offChart = cfg.offChart
    this.#elDividers = widgets.elements.elDividers
    this.#elOffChart = this.#offChart.element
    this.init()
  }

  static create(widgets, config) {

    const id = `divider${++Divider.divideCnt}`
    config.id = id

    // add entry
    Divider.dividerList[id] = new Divider(widgets, config)

    return Divider.dividerList[id]
  }

  static destroy(id) {
    Divider.dividerList[id].end()

    // remove entry
    delete Divider.dividerList[id]
  }

  get el() { return this.#elDivider }
  get ID() { return this.#id }
  get offChart() { return this.#offChart }
  get config() { return this.#core.config }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elDivider) }
  get height() { return this.#elDivider.getBoundingClientRect().height }

  init() {
    // insert element
    this.mount()
  }

  start() {
    // set mouse pointer
    this.setCursor("n-resize")

    // set up event listeners
    this.eventsListen()
  }

  end() {
    // remove event listeners
    this.#input.off("pointerenter", this.onMouseEnter);
    this.#input.off("pointerout", this.onMouseOut);
    this.#input.off("pointerdrag", this.onPointerDrag);
    this.#input.off("pointerdragend", this.onPointerDragEnd);
    this.#input = null

    // remove element
    this.el.remove()
  }

  eventsListen() {
    this.#input = new Input(this.#elDivider, {disableContextMenu: false});

    this.#input.on("pointerenter", this.onMouseEnter.bind(this));
    this.#input.on("pointerout", this.onMouseOut.bind(this));
    // this.#input.on("pointerdrag", throttle(this.onPointerDrag, 100, this, true));
    this.#input.on("pointerdrag", this.onPointerDrag.bind(this));
    this.#input.on("pointerdragend", this.onPointerDragEnd.bind(this));
  }

  on(topic, handler, context) {
    this.#core.on(topic, handler, context)
  }

  off(topic, handler) {
    this.#core.off(topic, handler)
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
    this.#cursorPos = [e.position.x, e.position.y]
    this.emit(`${this.ID}_pointerdrag`, this.#cursorPos)
    this.emit(`divider_pointerdrag`, {
      id: this.ID,
      e: e,
      pos: this.#cursorPos,
      offChart: this.offChart
    })
  }

  onPointerDragEnd(e) {
    if ("position" in e)
    this.#cursorPos = [e.position.x, e.position.y]
    this.emit(`${this.ID}_pointerdragend`, this.#cursorPos)
    this.emit(`divider_pointerdragend`, {
      id: this.ID,
      e: e,
      pos: this.#cursorPos,
      offChart: this.offChart
    })
  }

  mount() {
    if (this.#elDividers.lastElementChild == null)
      this.#elDividers.innerHTML = this.dividerNode()
    else
      this.#elDividers.lastElementChild.insertAdjacentHTML("afterend", this.defaultNode())

    this.#elDivider = DOM.findBySelector(`#${this.#id}`, this.#elDividers)
  }

  setCursor(cursor) {
    this.#elDivider.style.cursor = cursor
  }

  static defaultNode() {
    const dividersStyle = `position: absolute;`
    const node = `
  <div slot="widget" class="${CLASS_DIVIDERS}" style="${dividersStyle}"></div>
  `
    return node
  }

  dividerNode() {
    let top = this.#offChart.pos.top - DOM.elementDimPos(this.#elDividers).top,
      width = this.#core.MainPane.rowsW + this.#core.scaleW,
      height = (isNumber(this.config.dividerHeight)) ? 
        this.config.dividerHeight : DIVIDERHEIGHT,
      left = this.#core.theme.tools.width // this.#core.toolsW;
      top -= height / 2

    switch(this.#core.theme.tools.location) {
      case "left": break;
      case false:
      case "none":
      case "right": left *= -1; break;
      default: break
    }

    const styleDivider = `position: absolute; top: ${top}px; left: ${left}px; z-index:100; width: ${width}px; height: ${height}px; background: ${this.#theme.divider.idle};`

    const node = `
      <div id="${this.#id}" class="divider" style="${styleDivider}"></div>
    `
    return node
  }

  updateDividerPos(pos) {
    let dividerY = this.#elDivider.offsetTop;
        dividerY += pos[5]
    this.#elDivider.style.top = `${dividerY}px`
  }

  setDividerPos() {
    let top = this.#offChart.pos.top - DOM.elementDimPos(this.#elDividers).top;
        top = top - (this.height / 2)
    this.#elDivider.style.top = `${top}px`
  }
}
