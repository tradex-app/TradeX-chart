// events.js

import { isBoolean, isFunction, isObject } from "../utils/typeChecks";
import DOM from "../utils/DOM";
import { Point } from "./definitions";

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

    // current mouse position
    this.position = new Point();

    // amount of mouse movement difference
    this.movement = new Point([null, null]);
    this.firstMovementUpdate = true;

    // draging start and end position
    this.dragstart = new Point([null, null]);
    this.dragend = new Point([null, null]);
    this.dragCheckThreshold = 3;
    this.dragStatus = false

    // mouse wheel
    this.wheeldelta = 0;

    // current pressed mouse buttons
    this.pressedButtons = [];

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
              handler(this.createEventArgument(e))
            }
            break;
        case "pointermove":
          cb = function (e) {
            console.log(e.clientY)
            this.motion(e)
            handler(this.createEventArgument(e))
          }
          break;
        case "click":
        case "dbclick":
        case "pointerenter":
        case "pointerleave":
        case "pointerout":
        case "pointerover":
        case "pointerup":
        case "contextmenu":
          cb = function (e) {
            this.location(e)
            handler(this.createEventArgument(e))
          }
          break;
        case "wheel":
          cb = function (e) {
            this.wheeldelta = e.wheelDelta;
            handler(this.createEventArgument(e))
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
            handler(this.createEventArgument(e))
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
      e = this.createEventArgument(e)
      handler(e)
    }
    this.dragStatus = "ready"
    this.element.addEventListener("pointerdrag", cb.bind(this), options)
  }

  onPointerDown (e) {

    this.location(e)

    switch (e.button) {
      // case 0: this.pressedButtons._t_pushIfNotExist(MouseButtons.Left); break;
      // case 1: this.pressedButtons._t_pushIfNotExist(MouseButtons.Middle); break;
      // case 2: this.pressedButtons._t_pushIfNotExist(MouseButtons.Right); break;
    }
    if (this.dragStatus == "ready") e.target.setPointerCapture(e.pointerId)
// console.log("onPointerDown: ", e.target)
  }

  onPointerMove (e) {
    // console.log(`pos.x: ${this.position.x}, move.x: ${this.movement.x}`)
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
      console.log(`onPointerDragEnd`)
    }
  }

  createEventArgument(e) {
    return {
      isProcessed: false,
      position: this.position.clone(),
      movement: this.movement.clone(),
      dragstart: this.dragstart.clone(),
      dragend: this.dragend.clone(),
      wheeldelta: this.wheeldelta,
      domEvent: e,
      timeStamp: e.timeStamp
    }
  }

  isButtonPressed(button) {
    return this.pressedButtons.includes(button);
  }

  setCursor(type) {
		this.element.style.cursor = type;
	}

  motion(e) {
    
    const clientX = e.clientX || this.position.x
    const clientY = e.clientY || this.position.y
    const clientRect = e.target.getBoundingClientRect();
    const client = {
      x: clientX - clientRect.left,
      y: clientY - clientRect.top
    }

    if (this.firstMovementUpdate) {
      this.movement.x = 0;
      this.movement.y = 0;
      this.firstMovementUpdate = false;
    } else {
      this.movement.x = client.x - this.position.x;
      this.movement.y = client.y - this.position.y;
    }

    this.position.x = client.x;
    this.position.y = client.y;
  }

  location(e) {
    const clientRect = e.target.getBoundingClientRect();

    this.position.x = e.clientX - clientRect.left;
    this.position.y = e.clientY - clientRect.top;

    this.movement.x = 0;
    this.movement.y = 0;
  }
}
