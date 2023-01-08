// element.js
// base class for views to build upon

import { uid } from "../../../utils/utilities"
import { isNumber, isString } from "../../../utils/typeChecks"

export default class element extends HTMLElement {

  shadowRoot
  template
  id = uid()
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

  setDim(x, d) {
    if (isNumber(x)) x += "px"
    else if (!isString(x)) return
    this.style[d] = w
  }

  setCursor(cursor) {
    this.style.cursor = cursor
  }

}
