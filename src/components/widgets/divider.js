// divider.js
// dragable divider to resize off chart indicators

import DOM from "../../utils/DOM"
import { isNumber } from "../../utils/typeChecks"
import { debounce, throttle } from "../../utils/utilities"
import { InputController, Keys } from "../../input/controller"
import Input from "../../input2"

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
    // remove event listners
    this.#controller.removeEventListener("mouseenter", this.onMouseEnter);
    this.#controller.removeEventListener("mouseout", this.onMouseOut);
    this.#controller.removeEventListener("drag", this.onDividerDrag);
    this.#controller.removeEventListener("enddrag", this.onDividerDragDone);
    this.#controller = null

    // remove element
    this.el.remove()
  }

  eventsListen() {
    // // create controller and use 'on' method to receive input events
    // this.#controller = new InputController(this.#elDivider, {disableContextMenu: false});

    // this.#controller.on("mouseenter", this.onMouseEnter.bind(this))
    // this.#controller.on("mouseout", this.onMouseOut.bind(this))
    // this.#controller.on("mousedown", debounce(this.onPointerDrag, 100, this, true));
    // this.#controller.on("mouseup", this.onPointerDragEnd.bind(this));

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
    this.#elDivider.style.background = "#888888C0"
  }

  onMouseOut() {
    this.#elDivider.style.background = "#FFFFFF00"
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

    console.log(`pointerdrag - pos: ${e.position.y}`)
  }

  onPointerDragEnd(e) {
    if ("position" in e)
    this.#cursorPos = [e.position.x, e.position.y]

    console.log(`divider_pointerdragend`)

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
      left = this.#core.toolsW;
      top -= height / 2

    const styleDivider = `position: absolute; top: ${top}px; left: ${left}px; z-index:100; width: ${width}px; height: ${height}px; background: #FFFFFF00;`

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
