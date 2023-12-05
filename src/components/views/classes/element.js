// element.js
// base class for views to build upon

import { SHORTNAME } from "../../../definitions/core"
import { uid } from "../../../utils/utilities"
import { isFunction, isNumber, isString } from "../../../utils/typeChecks"
import EventHub from "../../../utils/eventHub"

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
  #hub

  constructor (template, mode="open") {
    super()

    this.template = template
    this.shadowRoot = this.attachShadow({mode: mode})
    this.#hub = new EventHub()
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

      this.DOM.width = this.clientWidth
      this.DOM.height = this.clientHeight
      this.oldDOM.width = this.clientWidth
      this.oldDOM.height = this.clientHeight
      this.intersectionObserver = new IntersectionObserver(this.onResize.bind(this))
      this.intersectionObserver.observe(this)
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
    this.#hub = undefined
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
    // for (let k in r[0].contentRect) {
    //   const v = r[0].contentRect[k]
    //   if (!isFunction(v))
    //     this.DOM[k] = v
    // }
    // this.DOM = this.getBoundingClientRect()
    const rect = this.getBoundingClientRect()
    for (let k in rect) {
      const v = rect[k]
      if (!isFunction(v))
        this.DOM[k] = v
    }
    this.emit("resize", this.DOM)
    // console.log(r)
  }


  /** 
  * Subscribe to a topic
  * @param {string} topic      - The topic name
  * @param {function} handler - The function or method that is called
  * @param {Object}  context   - The context the function(s) belongs to
  * @returns {boolean}
  */
  on(topic, handler, context) {
    this.#hub.on(topic, handler, context)
  }

  /** 
  * Unsubscribe from a topic
  * @param {string} topic - The topic name
  * @param {function} handler  - function to remove
  * @param {Object}  context   - The context the function(s) belongs to
  * @returns {boolean}
  */
  off(topic, handler, context) {
    this.#hub.off(topic, handler, context)
    }

  /**
  * Publish a topic
  * @param {string} topic - The topic name
  * @param {Object}  data - The data to publish
  * @returns {boolean}
  */
  emit(topic, data) {
    this.#hub.emit(topic, data)
  }

}
