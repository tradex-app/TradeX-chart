// slider.js
//  GUI slider

import DOM from "../../utils/DOM"
import { isFunction, isNumber } from "../../utils/typeChecks"
import { debounce, throttle } from "../../utils/utilities"
import { InputController, Keys } from "../../input/controller"


export default class Slider {

  #id 
  #core

  #elContainer
  #elHandle

  #containerDims = {w: 0, h: 0}
  #handleDims = {w: 0, h: 0, x: 0, y: 0}

  #constraint = {x: false, y: true}

  #cursorPos
  #controller
  #callback

  constructor(config) {

    this.#core = config.core
    this.#elContainer = (DOM.isElement(config.elContainer)) ? config.elContainer : false
    this.#elHandle = (DOM.isElement(config.elHandle)) ? config.elHandle : false
    this.#callback = (isFunction(config.callback)) ? config.callback : false

    if (this.#elContainer && this.#elHandle) {

      this.mount()

      // set up event listeners
      this.eventsListen()
    }
  }

  eventsListen() {
    // create controller and use 'on' method to receive input events
  this.#controller = new InputController(this.#elHandle, {disableContextMenu: false});

  this.#controller.on("mouseenter", this.onMouseEnter.bind(this))
  this.#controller.on("mouseout", this.onMouseOut.bind(this))
  this.#controller.on("drag", debounce(this.onHandleDrag, 1, this, true));
  this.#controller.on("enddrag", this.onHandleDragDone.bind(this));
  this.#controller.on("mousedown", debounce(this.onMouseDown, 100, this, true));
  this.#controller.on("mouseup", this.onMouseUp.bind(this));
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

  onMouseEnter() {}
  onMouseOut() {}
  onMouseDown() {}
  onMouseUp() {}
  onHandleDrag() {}
  onHandleDragDone() {}

  mount() {
    this.#containerDims.w = this.#elContainer.clientWidth
    this.#containerDims.h = this.#elContainer.clientHeight
    this.#elContainer.style.overflow = "hidden"

    this.#handleDims.w = this.#elHandle.clientWidth
    this.#handleDims.h = this.#elHandle.clientHeight
    this.#elHandle.style.margin = 0
    this.#elHandle.style.position = "absolute"
  }

  setCursor(cursor) {
    this.#elHandle.style.cursor = cursor
  }

  updateHandlePos(pos) {
    let dividerY = this.#elHandle.offsetTop;
        dividerY += pos[5]
    this.#elHandle.style.top = `${dividerY}px`
  }

  setHandlePos() {
    let top = this.#offChart.pos.top - DOM.elementDimPos(this.#elHandles).top;
        top = top - (this.height / 2)
    this.#elHandle.style.top = `${top}px`
  }
}