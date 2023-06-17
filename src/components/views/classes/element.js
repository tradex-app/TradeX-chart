// element.js
// base class for views to build upon

import { SHORTNAME } from "../../../definitions/core"
import { uid } from "../../../utils/utilities"
import { isNumber, isString } from "../../../utils/typeChecks"

export default class element extends HTMLElement {

  shadowRoot
  template
  id = uid( SHORTNAME )
  doInit = true

  constructor (template, mode="open") {
    super()

    this.template = template
    this.shadowRoot = this.attachShadow({mode: mode})
  }

  destroy() {

  }

  connectedCallback() {
    // element building must be done here
    // https://stackoverflow.com/a/43837330/15109215
    if (this.doInit) {
      this.doInit = false
      this.shadowRoot.appendChild(this.template.content.cloneNode(true))
      this.style.display = "block"
    }
  }

  disconnectedCallback() {
  }

  get width() { return this.offsetWidth }
  set width(w) { this.setDim(w, "width") }
  get height() { return this.offsetHeight }
  set height(h) { this.setDim(h, "height") }
  set cursor(c) { this.style.cursor = c }
  get cursor() { return this.style.cursor }

  setDim(v, d) {
    if (isNumber(v)) v += "px"
    if (!["width", "height"].includes(d) || !isString(v)) return
    this.style[d] = v
  }


}
