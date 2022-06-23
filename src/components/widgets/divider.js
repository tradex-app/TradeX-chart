// divider.js
// dragable divider to resize off chart indicators

import DOM from "../../utils/DOM"
import { InputController, EventDispatcher, Keys } from '@jingwood/input-control'


export default class Divider{

  #id
  #widgets
  #offChart
  #mediator
  
  #elDividers
  #elDivider
  #elOffChart

  #cursorPos
  #controller

  static dividerList = {}
  static divideCnt = 0

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#offChart = config.offChart
    this.#mediator = config.mediator
    this.#id = config.id
    this.#elDividers = widgets.elements.elDividers
    this.#elOffChart = config.offChart.elOffChart
    this.init()
  }

  static createDivider(widgets, config) {

    config.id = `divider${++Divider.divideCnt}`

    // add entry
    Divider[id] = new Divider(widgets, config)

    return Divider[id]
  }

  static destroyDivider(id) {
    Divider.dividerList[id].end

    // remove entry
    delete Divider.dividerList[id]
  }

  get el() { return this.#elDivider }
  get id() { return this.#id }
  get offChart() { return this.#offChart }

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
    this.#controller.removeEventListener("drag", this.onDividerDrag);
    this.#controller.removeEventListener("enddrag", this.onDividerDragDone);

    // remove element
    this.el.remove()
  }

  eventsListen() {
    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(canvas);
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

  mount() {
    this.#elDividers.lastElementChild.insertAdjacentHTML("afterend", this.defaultNode())
    this.#elDivider = DOM.findBySelector(`#${this.#id}`)
  }


  defaultNode() {

    const styleDivider = `position: absolute; top: 0; left: 0; z-index:100; width: 100%; height: 3px; background: #FFF;`

    const node = `
      <div id="${this.#id}" class="divider" style="${styleDivider}"></div>
    `
  }

}