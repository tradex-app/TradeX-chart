// element.js
// base class for views to build upon

import { SHORTNAME } from "../../../definitions/core"
import { uid } from "../../../utils/utilities"
import { isFunction, isNumber, isString } from "../../../utils/typeChecks"

export default class element extends HTMLElement {

  shadowRoot
  template
  id = uid( SHORTNAME )
  doInit = true
  intersectionObserver 
  mutationObserver 
  resizeObserver
  DOM = {
    width: 0,
    height: 0,
    style: {}
  }
  oldDOM = {}
  subscribers = {
    resize: [],
    mutation: [],
    intersection: []
  }

  constructor (template, mode="open") {
    super()

    this.template = template
    this.shadowRoot = this.attachShadow({mode: mode})
  }

  destroy() {

  }

  connectedCallback(fn) {
    // element building must be done here
    // https://stackoverflow.com/a/43837330/15109215
    if (this.doInit) {
      this.doInit = false
      this.shadowRoot.appendChild(this.template.content.cloneNode(true))
      this.style.display = "block"

//    this.intersectionObserver = new IntersectionObserver(this.onIntersection.bind(this))
//    this.intersectionObserver.observe(this)
/*    this.mutationObserver = new MutationObserver(this.onMutation.bind(this))
    this.mutationObserver.observe(
      this,
      {
        attributes: true,
        attributeOldValue: true,
        characterData: true,
      })
*/
    this.resizeObserver = new ResizeObserver(this.onResize.bind(this))
    this.resizeObserver.observe(this)

      if (isFunction(fn)) fn()
    }
  }

  disconnectedCallback() {
//    this.mutationObserver.disconnect()
    this.resizeObserver.disconnect()
//    this.intersectionObserver.disconnect()
  }

  get width() { return this.DOM.width }
  set width(w) { this.setDim(w, "width") }
  get oWidth() { return this.oldDOM.width }
  get height() { return this.DOM.height }
  set height(h) { this.setDim(h, "height") }
  get oHeight() { return this.oldDOM.height }
  get widthDeltaR() { return this.DOM.width / this.oldDOM.width }
  get heightDeltaR() { return this.DOM.height / this.oldDOM.height }
  get top() { return this.DOM.top }
  get left() { return this.DOM.left }
  get bottom() { return this.DOM.bottom }
  get right() { return this.DOM.right }
  get x() { return this.x }
  get y() { return this.y }
  get dimensions() { return this.DOM }
  set cursor(c) { this.style.cursor = c }
  get cursor() { return this.style.cursor }

  setDim(v, d) {
    if (!["width", "height"].includes(d) || !isString(v)) return
    if (isNumber(v)) {
      this.DOM[d] = v
      v += "px"
    }
    else if (isString(v)) {
      // TODO: regex guard
      // TODO: fallback w = "100%"
    }
    else {
      this.DOM[d] = this.parentElement.getBoundingClientRect().width
      v = this.DOM[d] + "px"
    }
    this.style[d] = v
  }

  onIntersection(i) {
    this.emit("intersection")
  }

  onMutation(m) {
    this.emit("mutation")
  }

  /**
   * cache old and new element.contentRect states
   * @param {*} r
   * @memberof element
   */
  onResize(r) {
    this.oldDOM = {...this.DOM}
    // this.DOM = {...this.DOM, ...r[0].contentRect}
    // this.DOM = Object.assign(this.DOM, r[0].contentRect)
    for (let k in r[0].contentRect) {
      const v = r[0].contentRect[k]
      if (isFunction(v)) continue
      this.DOM[k] = v
    }
    this.emit("resize")
  }

  on(event, callback) {
    if (
      !isFunction(callback) ||
      !Object.keys(this.subscribers).includes(event)
    ) 
    return false

    this.subscribers[event] = callback
  }

  off(event, callback) {
    if (
      !isFunction(callback) ||
      !Object.keys(this.subscribers).includes(event)
    ) 
    return false

    const index = this.subscribers[event].indexOf(callback)
          index.splice(index, 1)
  }

  emit(event) {
    if ( !Object.keys(this.subscribers).includes(event) ) 
      return false
    for (let s of this.subscribers[event]) {
      s({
        curr: this.DOM,
        old: this.oldDOM
      })
    }
  }

}
