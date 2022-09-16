// divider.js
// dragable divider to resize off chart indicators

import DOM from "../../utils/DOM"
import {
  CLASS_DIVIDERS
} from "../../definitions/core"
import {
  DIVIDERHEIGHT
} from "../../definitions/chart"
import {
  InputController,
  Keys
} from "../../input/controller"
import { isNumber } from "../../utils/typeChecks"


export default class Divider {

  #id
  #widgets
  #offChart
  #mediator
  #core

  #elDividers
  #elDivider
  #elOffChart

  #cursorPos
  #controller

  static dividerList = {}
  static divideCnt = 0
  static class = CLASS_DIVIDERS
  static name = "Dividers"
  static type = "divider"


  constructor(widgets, config) {
    this.#widgets = widgets
    this.#offChart = config.offChart
    this.#mediator = config.mediator
    this.#core = this.#mediator.api.core
    this.#id = config.id
    this.#elDividers = widgets.elements.elDividers
    this.#elOffChart = config.offChart.elOffChart
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
  get height() { return this.#elDivider.clientHeight }

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

    // remove element
    this.el.remove()
  }

  eventsListen() {
    // create controller and use 'on' method to receive input events
    this.#controller = new InputController(this.#elDivider, {disableContextMenu: false});

    this.#controller.on("mouseenter", this.onMouseEnter.bind(this))
    this.#controller.on("mouseout", this.onMouseOut.bind(this))
    this.#controller.on("drag", this.onDividerDrag.bind(this));
    this.#controller.on("enddrag", this.onDividerDragDone.bind(this));
    this.#controller.on("mousedown", this.onMouseDown.bind(this));
    this.#controller.on("mouseup", this.onMouseUp.bind(this));
  }

  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context)
  }

  off(topic, handler) {
    this.#mediator.off(topic, handler)
  }

  emit(topic, data) {
    this.#mediator.emit(topic, data)
  }

  onMouseEnter() {
    this.#elDivider.style.background = "#888888C0"
  }

  onMouseOut() {
    this.#elDivider.style.background = "#FFFFFF00"
  }

  onDividerDrag(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y),
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ]
    const dragEvent = {
      divider: this,
      cursorPos: this.#cursorPos
    }
    this.emit("divider_drag", dragEvent)
  }

  onDividerDragDone(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y),
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ]
    const dragEvent = {
      divider: this,
      cursorPos: this.#cursorPos
    }
    this.emit("divider_dragDone", dragEvent)
  }

  onMouseDown(e) {
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)]
    this.emit(`${this.ID}_mousedown`, this.#cursorPos)
    this.emit(`divider_mousedown`, {
      id: this.ID,
      e: e,
      pos: this.#cursorPos,
      offChart: this.offChart
    })
  }

  onMouseUp(e) {
    this.#cursorPos = [Math.floor(e.position.x), Math.floor(e.position.y)]
    this.emit(`${this.ID}_mouseup`, this.#cursorPos)
    this.emit(`divider_mouseup`, {
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

    this.#elDivider = DOM.findBySelector(`#${this.#id}`)
  }

  setCursor(cursor) {
    this.#elDivider.style.cursor = cursor
  }

  static defaultNode() {
    const dividersStyle = `position: absolute;`

    const node = `
  <div class="${CLASS_DIVIDERS}" style="${dividersStyle}"></div>
  `
    return node
  }

  dividerNode() {
    let top = this.#offChart.pos.top - DOM.elementDimPos(this.#elDividers).top,
      width = this.#core.MainPane.rowsW,
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
