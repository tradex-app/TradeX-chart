// pointer.js

// import DeviceAgent from "./deviceAgent"



export default class PointerAgent {

  #types = [
    "pointerdown", // - Pointer becomes active
    "pointerup", // - Pointer stops being active
    "pointerover", "pointerenter", // - Pointer enters element boundaries
    "pointerout", "pointerleave", // - Pointer leaves element boundaries
    "pointermove", // - Pointer moves while inside the element's boundaries
    "pointercancel", // - Pointer has stopped generating events, e.g. input device deactivated
    "gotpointercapture", // - Pointer has entered pointer capture state, e.g. dragging a movable element
    "lostpointercapture", // - Pointer capture state has ended
    "click", // alias of tap
    "dblclick", // alias of tap
    "anyclick", // alias of anytap
    "wheel", // 
    "contextmenu",
    
    "pointerdrag",
    "pointerdragend",

    "pan",
    "panstart",
    "panmove",
    "panup",
    "pandown",
    "panleft",
    "panright",
    "panend",
    "pancancel"
  ]

  #input
  #pad = {
    left: false
  }

  constructor(input) {
    this.#input = input
  }

  has(event) {
    return (this.#types.indexOf(event) == -1) ? false : true
  }

  on (event, handler, options, once) {
    let cb = handler

    switch (event) {
      case "pointerdown":
          cb = function (e) {
            // this.logit(e)
            if (e.leftButton) this.#input.pad.left = true
            this.#input.onPointerDown(e)
            handler(this.#input.pointerEventData(e))
          }
          break;
      case "pointerup":
        cb = function (e) {
          // this.logit(e)
          this.#input.onPointerUp(e)
          handler(this.#input.pointerEventData(e))
        }
        break;
      case "pointermove":
        cb = function (e) {
          this.#input.motion(e)
          handler(this.#input.pointerEventData(e))
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
          // this.logit(e)
          this.#input.location(e)
          handler(this.#input.pointerEventData(e))
        }
        break;
      case "wheel":
        cb = function (e) {
          // this.logit(e)
          this.#input.wheeldelta = e;
          handler(this.#input.pointerEventData(e))
        }
        break;
      case "pointercancel":
      case "gotpointercapture":
      case "lostpointercapture":
        cb = function (e) {
          handler(e)
        }
        break;
      case "pointerdrag":
        cb = function (e) {
          // this.logit(e)
          this.#input.motion(e)
          handler(this.#input.pointerEventData(e))
        }
        this.#input.agent.on("panstart", this.#input.startPointerDrag.bind(this.#input))
        event = "panmove"
        break;
      case "pointerdragend":
        cb = function (e) {
          // this.logit(e)
          this.#input.motion(e)
          this.#input.endPointerDrag(e)
          handler(this.#input.pointerEventData(e))
        }
        event = "panend"
        break;
    }
    if (once) this.#input.agent.once(event, cb.bind(this), options)
    else this.#input.agent.on(event, cb.bind(this), options)
    return cb
  }

  off (event, handler, options) {
    this.#input.agent.off(event, handler, options)
  }

  // logit(e) {
  //   return
  //   /*
  //   let o = `pointer: ${e.pointerType}, event: ${e.type}, `
  //   if ("deltaX" in e) o += `deltaX: ${e.deltaX}, `
  //   if ("deltaY" in e) o += `deltaY: ${e.deltaY}, `
  //   if ("delta" in e) o += `delta: ${e.delta}, `
  //   if ("velocityX" in e) o += `veloX: ${e.velocityX}, `
  //   if ("velocityY" in e) o += `veloY: ${e.velocityY}, `
  //   if ("leftButton" in e && e.leftButton === true) o += `leftButton `
  //   if ("rightButton" in e && e.rightButton === true) o += `rightButton`
  //   o += `srcEvent.button: ${e.srcEvent.button}`

  //   window.console.log(o)
  //   */
  // }
}



/*
const f = {

  types: [
    "pointerdown", // - Pointer becomes active
    "pointerup", // - Pointer stops being active
    "pointerover", "pointerenter", // - Pointer enters element boundaries
    "pointerout", "pointerleave", // - Pointer leaves element boundaries
    "pointermove", // - Pointer moves while inside the element's boundaries
    "pointercancel", // - Pointer has stopped generating events, e.g. input device deactivated
    "gotpointercapture", // - Pointer has entered pointer capture state, e.g. dragging a movable element
    "lostpointercapture", // - Pointer capture state has ended
    "dblclick", // double click / tap
    "click",
    "wheel", // 
    "contextmenu"
  ],

  has: function(event) {
    return (this.#types.indexOf(event) == -1) ? false : true
  }
}



export class _PointerAgent extends DeviceAgent {

  constructor(input) {
    super(input)

    this.pointerInit()
  }

  static get types() { return types }
  get types() { return types }

  pointerInit() {
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

  addListener (event, handler, options) {
    if (!this.isValid(event, handler)) return false

    let opt = this.validOptions(options)
    let cb = handler

    switch (event) {
      case "pointerdown":
          cb = function (e) {
            this.onPointerDown(e)
            handler(this.#input.pointerEventData(e))
          }
          break;
      case "pointerup":
        cb = function (e) {
          this.onPointerUp(e)
          handler(this.#input.pointerEventData(e))
        }
        break;
      case "pointermove":
        cb = function (e) {
          this.#input.motion(e)
          handler(this.#input.pointerEventData(e))
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
          this.#input.location(e)
          handler(this.#input.pointerEventData(e))
        }
        break;
      case "wheel":
        cb = function (e) {
          this.wheeldelta = e.wheelDelta;
          handler(this.#input.pointerEventData(e))
        }
        break;
      case "pointercancel":
      case "gotpointercapture":
      case "lostpointercapture":
        cb = function (e) {
          handler(e)
        }
        break;
      case "pointerdrag":
        this.initPointerDrag(handler, options)
        return true;
      case "pointerdragend":
        cb = function (e) {
          this.#input.motion(e)
          handler(this.#input.pointerEventData(e))
        }
        break;
    }
    this.element.addEventListener(event, cb.bind(this), opt)
    return cb
  }

  removerListener (event, handler, element, options) {
    super.removeEventListener(event, handler, element, options)

    let e = this.element

    if (event == "pointerdrag") {
      e.removeEventListener("pointermove", this.onPointerDrag)
      e.removeEventListener("pointerdown", this.onPointerDown)
      e.removeEventListener("gotpointercapture", this.onPointerDrag)
      e.removeEventListener("lostpointercapture", this.onPointerDragEnd)
      document.removeEventListener("pointerup", this.onPointerDragEnd)
    }
    
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
      e = this.#input.pointerEventData(e)
      handler(e)
    }
    this.dragStatus = "ready"
    this.element.addEventListener("pointerdrag", cb.bind(this), options)
  }

  onPointerDown (e) {
    this.#input.location(e)
    this.pointerButtons[e.button] = true

    if (this.dragStatus == "ready") e.target.setPointerCapture(e.pointerId)
  }

  onPointerUp (e) {
    this.#input.location(e)
    this.pointerButtons[e.button] = false
  }

  onPointerMove (e) {
    if (this.dragStatus == "dragging") {
      this.#input.motion(e)
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

}
*/