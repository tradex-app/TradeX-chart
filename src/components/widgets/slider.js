// slider.js
//  GUI slider

import DOM from "../../utils/DOM"
import Colour from "../../utils/colour"
import { isFunction, isNumber } from "../../utils/typeChecks"
import { debounce, throttle } from "../../utils/utilities"
import { limit } from "../../utils/number"
import Input from "../../input"


export default class Slider {

  static #cnt

  #id 
  #core

  #elContainer
  #elHandle

  #containerDims = {w: 0, h: 0}
  #handleDims = {w: 0, h: 0, x: 0, y: 0}

  #constraint = {x: false, y: true}

  #cursorPos
  #sliderPos = {x: 0, drag: false}
  #input
  #callback

  constructor(config) {

    this.#id = Slider.#cnt++
    this.#core = config.core
    this.#elContainer = (DOM.isElement(config.elContainer)) ? config.elContainer : false
    this.#elHandle = (DOM.isElement(config.elHandle)) ? config.elHandle : false
    this.#callback = (isFunction(config.callback)) ? config.callback : false

    if (DOM.isElement(this.#elContainer) && DOM.isElement(this.#elHandle)) {

      this.mount()

      // set up event listeners
      this.eventsListen()
    }
  }

  // TODO: remove event listeners on destroy

  eventsListen() {
  this.#input = new Input(this.#elHandle, {disableContextMenu: false});

  this.#input.on("mouseenter", debounce(this.onMouseEnter, 1, this, true));
  this.#input.on("mouseout", debounce(this.onMouseOut, 1, this, true));
  this.#input.on("drag", throttle(this.onHandleDrag, 100, this, true));
  this.#input.on("enddrag", this.onHandleDragDone.bind(this));
  this.#input.on("mousedown", debounce(this.onMouseDown, 100, this, true));
  this.#input.on("mouseup", this.onMouseUp.bind(this));
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
    const backgroundColor = getComputedStyle(this.#elHandle).backgroundColor
    if (backgroundColor) {
      this.colour = new Colour(backgroundColor)
      this.#elHandle.style.backgroundColor = this.colour.hex
    }
  }
  onMouseOut() {
    this.#elHandle.style.backgroundColor = this.colour.hexa
  }
  onMouseDown() {
  }
  onMouseUp(e) {
    this.onHandleDragDone(e)
  }
  onHandleDrag(e) {
    if (!this.#sliderPos.drag) {
      this.#sliderPos.drag = true
      this.#sliderPos.x = e.position.x
    }
    this.handlePos(e)
  }

  onHandleDragDone(e) {
    this.handlePos(e)
    this.#sliderPos.drag = false
  }

  mount() {
    this.#containerDims.w = this.#elContainer.getBoundingClientRect().width
    this.#containerDims.h = this.#elContainer.getBoundingClientRect().height
    this.#elContainer.style.overflow = "hidden"

    this.#handleDims.w = this.#elHandle.getBoundingClientRect().width
    this.#handleDims.h = this.#elHandle.getBoundingClientRect().height
    this.#elHandle.style.marginRight = 0
    this.#elHandle.style.position = "absolute"
  }

  handlePos(e) {

    let R = this.#core.range
    let x = parseInt(this.#elHandle.style.marginLeft)
    let w = this.#elContainer.getBoundingClientRect().width
    let h = this.#elHandle.getBoundingClientRect().width
    let m = w - h
    let d = e.position.x - this.#sliderPos.x
    let p = limit(x + d, 0, m)
    let r = (R.dataLength + R.limitFuture + R.limitPast) / w
    let s = Math.floor(p * r)

    this.setHandleDims(p, h)
    this.#core.jumpToIndex(s)
  }

  setHandleDims(p, w) {
    let c = this.#elContainer.getBoundingClientRect().width
        w = w || this.#elHandle.getBoundingClientRect().width
    p = p / c * 100
    this.#elHandle.style.marginLeft = `${p}%`

    w  = w / c * 100
    this.#elHandle.style.width = `${w}%`
  }

  setCursor(cursor) {
    this.#elHandle.style.cursor = cursor
  }

}