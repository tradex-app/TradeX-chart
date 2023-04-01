// events.js

import { isBoolean, isFunction, isObject } from "../utils/typeChecks";
import DOM from "../utils/DOM";
import { Point } from "./definitions";

// Keyboard events, key code definitions
// https://www.toptal.com/developers/keycode
// https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
const keyboard = [
  "keypress",
  "keydown",
  "keyup"
]

const pointer = [
  "pointerdown", // - Pointer becomes active
  "pointerup", // - Pointer stops being active
  "pointerover", "pointerenter", // - Pointer enters element boundries
  "pointerout", "pointerleave", // - Pointer leaves element boundries
  "pointermove", // - Pointer moves while inside the element's boundries
  "pointercancel", // - Pointer has stopped generating events, e.g. input device deactivated
  "gotpointercapture", // - Pointer has entered pointer capture state, e.g. dragging a movable element
  "lostpointercapture", // - Pointer capture state has ended
  "dblclick", // double click / tap
  "click",
  "wheel", // 
  "contextmenu"
]

const mouse = [
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
]

const touch = [
  "touchcancel",
  "touchend",
  "touchmove",
  "touchstart"
]

const pen = [

]

const misc = [
]

const custom = [
  "pointerdrag",
  "pointerdragend"
]

export class EventsAgent {

  constructor (input) {

    this.input = input
    this.element = input.element

    if (window.PointerEvent) {
      // Pointer Events enabled.
      this.type = [...keyboard, ...pointer, ...mouse, ...touch, ...pen, ...misc, ...custom]
    } else {
      // Pointer Events not supported
      this.type = [...keyboard, ...mouse, ...touch, ...pen, ...misc, ...custom]
    }

    this.clientPosPrev = new Point([null, null])
    // current mouse position
    this.position = new Point();
    // amount of mouse movement difference
    this.movement = new Point([0, 0]);
    // dragging start and end position
    this.dragstart = new Point([null, null]);
    this.dragend = new Point([null, null]);
    this.dragCheckThreshold = 3;
    this.dragStatus = false
    // mouse wheel
    this.wheeldelta = 0;
    // current pressed mouse buttons
    this.pointerButtons = [false, false, false, false, false]
    // custom events
    this.pointerdrag = new Event("pointerdrag")
    this.pointerdragend = new Event("pointerdragend")
  }

  has (event) {
    if (this.type.indexOf(event) == -1) return false
    else return true
  }

  addListener (event, handler, options) {
    let cb = handler

    if (!this.has(event) || 
        !isFunction(handler) || 
        !DOM.isElement(this.element) 
    ) return false

    if (!isObject(options) && !isBoolean(options)) options == undefined

    // pointer events
    if (pointer.indexOf(event) !== -1) {
      switch (event) {
        case "pointerdown":
            cb = function (e) {
              this.onPointerDown(e)
              handler(this.createPointerEventArgument(e))
            }
            break;
        case "pointerup":
          cb = function (e) {
            this.onPointerUp(e)
            handler(this.createPointerEventArgument(e))
          }
          break;
        case "pointermove":
          cb = function (e) {
            this.motion(e)
            handler(this.createPointerEventArgument(e))
            // console.log(`e.composedPath: `,e.composedPath())
          }
          break;
        case "click":
        case "dbclick":
        case "pointerenter":
        case "pointerleave":
        case "pointerout":
        case "pointerover":
        case "contextmenu":
          cb = function (e) {
            this.location(e)
            handler(this.createPointerEventArgument(e))
          }
          break;
        case "wheel":
          cb = function (e) {
            this.wheeldelta = e.wheelDelta;
            handler(this.createPointerEventArgument(e))
          }
          break;
        case "pointercancel":
        case "gotpointercapture":
        case "lostpointercapture":
        default :
          cb = function (e) {
            handler(e)
          }
          break;
      }
      this.element.addEventListener(event, cb.bind(this), options)
      return cb
    }
    // standard event
    else if (custom.indexOf(event) == -1)
      this.element.addEventListener(event, handler, options)

    // custom event
    else {
      switch (event) {
        case "pointerdrag":
          this.initPointerDrag(handler, options)
          break;
        case "pointerdragend":
          cb = function (e) {
            this.motion(e)
            handler(this.createPointerEventArgument(e))
          }
          this.element.addEventListener(event, cb.bind(this), options)
          break;
      }
    }

    return true
  }

  removerListener (event, handler, element, options) {
    if (!this.has(event) || 
        !isFunction(handler) || 
        !DOM.isElement(element) 
    ) return false

    if (!isObject(options) && !isBoolean(options)) options == undefined

    if (event == "pointerdrag") {
      e.target.removeEventListener("pointermove", this.onPointerDrag)
      e.target.removeEventListener("pointerdown", this.onPointerDown)
      e.target.removeEventListener("gotpointercapture", this.onPointerDrag)
      e.target.removeEventListener("lostpointercapture", this.onPointerDragEnd)
      document.removeEventListener("pointerup", this.onPointerDragEnd)
    }
    
    element.removeEventListener(event, handler, options)

    return true
  }
 
  initPointerDrag (handler, options) {
    if (!this.draginit) {
      this.draginit = true
      this.element.addEventListener("pointerdown", this.onPointerDown.bind(this), options)
      this.element.addEventListener("gotpointercapture", this.onPointerCapture.bind(this), options)
      this.element.addEventListener("lostpointercapture", this.onPointerDragEnd.bind(this), options)
      this.element.addEventListener("pointermove", this.onPointerMove.bind(this), options) 
      // document.addEventListener("pointerup", this.onPointerDragEnd.bind(this))
    }

    let cb = function (e) {
      e = this.createPointerEventArgument(e)
      handler(e)
    }
    this.dragStatus = "ready"
    this.element.addEventListener("pointerdrag", cb.bind(this), options)
  }

  onPointerDown (e) {

    this.location(e)
    this.pointerButtons[e.button] = true

    if (this.dragStatus == "ready") e.target.setPointerCapture(e.pointerId)
  }

  onPointerUp (e) {
    this.location(e)
    this.pointerButtons[e.button] = false
  }

  onPointerMove (e) {
    if (this.dragStatus == "dragging") {
      this.motion(e)
      this.dragend = this.position.clone()
      e.target.dispatchEvent(this.pointerdrag)
    }
  }

  onPointerCapture (e) {
    this.dragstart = this.position.clone()
    this.dragend = this.position.clone()
    this.dragStatus = "dragging"
  }

  onPointerDragEnd (e) {
    if (this.dragStatus == "dragging") {
      this.dragStatus = "ready"
      e.target.dispatchEvent(this.pointerdragend)
    }
  }

  createPointerEventArgument(e) {
    return {
      isProcessed: false,
      pointerType: e.pointerType,
      position: this.position.clone(),
      movement: this.movement.clone(),
      dragstart: this.dragstart.clone(),
      dragend: this.dragend.clone(),
      wheeldelta: this.wheeldelta,
      buttons: this.pointerButtons,
      domEvent: e,
      timeStamp: Date.now()
    }
  }

  isButtonPressed(button) {
    return (this.pointerButtons.indexOf(button) !== -1) ? true : false
  }

  setCursor(type) {
		this.element.style.cursor = type;
	}

  motion(e) {

    const clientX = e.clientX || this.position.x
    const clientY = e.clientY || this.position.y

    this.movement.x = clientX - this.clientPosPrev.x
    this.movement.y = clientY - this.clientPosPrev.y

    this.position.x += this.movement.x
    this.position.y += this.movement.y

    this.clientPosPrev.x = clientX
    this.clientPosPrev.y = clientY
  }

  location(e) {
    const clientRect = e.target.getBoundingClientRect();

    this.clientPosPrev.x = e.clientX
    this.clientPosPrev.y = e.clientY

    this.position.x = e.clientX - clientRect.left;
    this.position.y = e.clientY - clientRect.top;

    this.movement.x = 0;
    this.movement.y = 0;
  }

  createKeyEventArgument(e) {
    return e
  }
}
