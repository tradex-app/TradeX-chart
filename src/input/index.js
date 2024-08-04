// index.js
// input controller, pointer, keys
// https://uber-web.github.io/mjolnir.js

import { isBoolean, isFunction, isObject, isString } from "../utils/typeChecks";
import { isTouchDevice } from "../utils/browser-or-node";
import { isElement } from "../utils/DOM";
import { Point, status } from "./definitions"
import { EventManager } from "mjolnir.js";
import PointerAgent from "./pointer";
import TouchAgent from "./touch";
import KeyboardAgent from "./keyboard";

const defaultOptions = {
  element: undefined,
  contextMenu: true,
  panX: true,
  panY: true
}

export default class Input  {

  #options
  #element
  #eventsAgent
  #status
  #listeners = []
  #pointer = null
  #key = null
  #touch = null
  #isTouch
  #isPan = false
  #wheelDelta
  pad = {left: false}

  constructor (element, options) {

    this.#options = { ...defaultOptions, ...options };
    this.#status = status.idle
    this.#isTouch = isTouchDevice
    this.#element = element

    if (!this.#element && this.#options.elementId) {
      this.#element = document.getElementById(this.#options.elementId);
    }

    if (!isElement(this.#element)) {
      throw "Must specify an element to receive user input.";
    }

    if (!this.#options.contextMenu) {
      window.oncontextmenu = (e) => {
        e.preventDefault();
        return false;
      };
    }
    const T = this.#isTouch ? 10 : 0
    const opts = {
      recognizerOptions: {
        pan: {threshold: T},
        pinch: {threshold: 0}
      }
    }
    this.#eventsAgent = new EventManager(this.#element, opts);
    this.pointerInit()
  }

  get agent() { return this.#eventsAgent }
  get pointer() { 
    if (this.#pointer instanceof PointerAgent) return this.#pointer
    this.#pointer = new PointerAgent(this)
    return this.#pointer
  }
  get touch() { 
    if (this.#touch instanceof TouchAgent) return this.#touch
    this.#touch = new TouchAgent(this)
    return this.#touch
  }
  get key() { 
    if (this.#key instanceof KeyboardAgent) return this.#key
    this.#key = new KeyboardAgent(this)
    return this.#key
  }
  get status() { return this.#status }
  get element() { return this.#element }
  get isTouch() { return this.#isTouch }
  get isPan() { return this.#isPan }
  set wheeldelta(w) { this.#wheelDelta = w.delta }
  get wheeldelta() { return this.#wheelDelta }

  destroy() {

    for (let l of this.#listeners) {
      this.off(l.event, l.handler, l.options)
    }
    this.#eventsAgent.destroy()
    this.#pointer = undefined
    this.#key = undefined
    this.#touch = undefined
  }

  isValid(event, handler) {
    return (
        isString(event) ||
        isFunction(handler)
    ) ? true : false;
  }

  validOptions(options) {
    return (isObject(options) && isBoolean(options)) ? options : undefined;
  }

  on (event, handler, options, once=false) {
    if (!this.isValid(event, handler)) return false
    if (this.pointer.has(event)) this.#pointer.on(event, handler, options, once)
    else if (this.touch.has(event)) this.#touch.on(event, handler, options, once)
    else if (this.key.has(event)) this.#key.on(event, handler, options, once)
    else this.#element.addEventListener(event, handler, this.validOptions(options))
    this.#listeners.push({event, handler, options})
  }

  off (event, handler, options) {
    if (this.#pointer?.has(event)) this.#pointer.off(event, handler, options)
    else if (this.#touch?.has(event)) this.#touch.off(event, handler, options)
    else if (this.#key?.has(event)) this.#key.off(event, handler, options)
    else this.#element.removeEventListener(event, handler, this.validOptions(options))

    for (let l of this.#listeners) {
      if (l.event === event &&
          l.handler === handler &&
          l.options === options) {
            let i = this.#listeners.indexOf(l)
            this.#listeners.splice(i, 1)
          }
    }
  }

  once (event, handler, options) {
    this.on(event, handler, options, true)
  }

/*
  invoke (agent, eventName, args) {
    this.currentAgent = agent;
    this.#eventsAgent.invoke(eventName, this.createEventArgument(args));
  }

  createEventArgument (args) {
    const arg = args || {};
    arg.isButtonPressed = button => this.isButtonPressed(button);
    arg.isKeyPressed = key => this.isKeyPressed(key);
    arg.controller = this;
    return arg;
  }

  isButtonPressed (button) {
    return this.#eventsAgent.isButtonPressed(button);
  }
  
  isKeyPressed (key) {
    return this.#eventsAgent.isKeyPressed(key);
  }
*/
  setCursor(type) {
		this.#element.style.cursor = type;
	}

  pointerInit() {
    this.clientPosPrev = new Point([null, null])
    // current mouse position
    this.position = new Point([0, 0]);
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

  pointerEventData(e) {
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

  motion(e) {
    let clientRect = {left: 0, top: 0}
    try {
      clientRect = e.srcEvent.target?.getBoundingClientRect()
    }
    catch (err) {}
    const clientX = e.srcEvent.clientX || this.position.x
    const clientY = e.srcEvent.clientY || this.position.y

    this.movement.x = clientX - this.clientPosPrev.x
    this.movement.y = clientY - this.clientPosPrev.y

    this.position.x = clientX - clientRect.left;
    this.position.y = clientY- clientRect.top;

    this.clientPosPrev.x = clientX
    this.clientPosPrev.y = clientY
  }

  location(e) {
    let clientRect = {left: 0, top: 0}
    try {
      clientRect = e.srcEvent.target?.getBoundingClientRect()
    }
    catch (err) {}

    this.clientPosPrev.x = e.srcEvent.clientX // = this.position.x
    this.clientPosPrev.y = e.srcEvent.clientY // = this.position.y

    this.position.x = e.srcEvent.clientX - clientRect.left;
    this.position.y = e.srcEvent.clientY- clientRect.top;

    this.movement.x = 0;
    this.movement.y = 0;
  }

  onPointerDown (e) {
    this.location(e)
    this.pointerButtons[e.srcEvent.button] = true
  }

  onPointerUp (e) {
    this.location(e)
    this.pointerButtons[e.srcEvent.button] = false
  }

  startPointerDrag(e) {
    this.#isPan = true
    this.onPointerDown(e)
  }

  endPointerDrag(e) {
    this.#isPan = false
  }
}
