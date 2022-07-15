// divider.js
// dragable divider to resize off chart indicators

import DOM from "../../utils/DOM"
import { CLASS_DIVIDERS } from "../../definitions/core"
import { InputController, Keys } from "../../input/controller"


export default class Divider{

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
  get id() { return this.#id }
  get offChart() { return this.#offChart }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elDivider) }

  init() {
    // insert element
    this.mount()
  }

  start() {
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
    this.#controller = new InputController(this.#elDivider);
    this.#controller.on("mouseenter", this.onMouseEnter.bind(this))
    this.#controller.on("mouseout", this.onMouseOut.bind(this))
    // drag event
    this.#controller.on("drag", this.onDividerDrag.bind(this));
    // drag event complete
    this.#controller.on("enddrag", this.onDividerDragDone.bind(this));
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
    console.log("Divider mouse enter")
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
    console.log("Divider drag done")
  }

  mount() {
    if (this.#elDividers.lastElementChild == null) 
      this.#elDividers.innerHTML = this.dividerNode()
    else
      this.#elDividers.lastElementChild.insertAdjacentHTML("afterend", this.defaultNode())

    this.#elDivider = DOM.findBySelector(`#${this.#id}`)
  }

  static defaultNode() {
    const dividersStyle = `position: absolute;`

    const node = `
      <div class="${CLASS_DIVIDERS}" style="${dividersStyle}"></div>
    `
    return node
  }

  dividerNode() {
    let top =  this.#offChart.pos.top - DOM.elementDimPos(this.#elDividers).top,
        width = this.#core.MainPane.rowsW,
        left = this.#core.toolsW; 
    const styleDivider = `position: absolute; top: ${top}px; left: ${left}px; z-index:100; width: ${width}px; height: 5px; background: #FFFFFF00;`

    const node = `
      <div id="${this.#id}" class="divider" style="${styleDivider}"></div>
    `
    return node
  }

}