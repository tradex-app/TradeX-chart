// tradeXchart.js
// <tradex-chart></tradex-chart>

import element from "./classes/element"
import { debounce } from "../../utils/utilities"
import { isNumber, isObject, isString } from "../../utils/typeChecks"

import tradeXBody from "./body"
import tradeXUtils from "./utils"
import tradeXwidgets from "./widgets"

import {
  UTILSH,
  TOOLSW,
  TIMEH,
  SCALEW,
  CHART_MINH, 
  CHART_MINW, 
} from "../../definitions/style"
import {
  GlobalStyle, GridStyle, XAxisStyle, YAxisStyle
} from "../../definitions/style"

const HTML = `
  <style title="core">
    tradex-utils {
      height: ${UTILSH}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${UTILSH}px); 
      width: 100%;
    }
    tradex-widgets {
      position: relative;
    }
  </style>
  <div style="display: none;">
    <slot></slot>
  </div>
  <tradex-utils></tradex-utils>
  <tradex-body></tradex-body>
  <tradex-widgets></tradex-widgets>
`


export default class tradeXChart extends element {

  #elBody
  #elUtils
  #elWidgets
  #template
  #chartW = CHART_MINW
  #chartH = CHART_MINH
  #oWidth
  #oHeight
  #widthCache
  #heightCache
  #theme

  constructor () {
    const template = document.createElement('template')
          template.innerHTML = HTML
    super(template, "closed")
    this.#template = template
  }

  destroy() {
    this.resizeObserver.disconnect()
  }

  static get observedAttributes() {
    return ['config', 'disabled', 'height', 'stream', 'width']
  }

  connectedCallback() {
    // element building must be done here
    // https://stackoverflow.com/a/43837330/15109215
    if (this.doInit) {
      this.doInit = false
      this.shadowRoot.appendChild(this.#template.content.cloneNode(true))
      this.style.display = "block"

      this.elWidgetsG = this.shadowRoot.querySelector('tradex-widgets')
      this.elUtils = this.shadowRoot.querySelector('tradex-utils')
      this.elBody = this.shadowRoot.querySelector('tradex-body')
      this.elMain = this.elBody.main
      this.elTime = this.elBody.main.time
      this.elTools = this.elBody.tools 
      this.elYAxis = this.elBody.scale

      this.previousDimensions()

      // set the width and height
      let height = this.getAttribute('height') || "100%"
      let width = this.getAttribute('width') || "100%"

      this.setDimensions(width, height)

      this.resizeObserver = new ResizeObserver(debounce(this.onResized, 50, this))
      this.resizeObserver.observe(this)      
    }
  }

  disconnectedCallback() {

    this.resizeObserver.disconnect()

    this.removeEventListener('click', this.onClick)
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    switch(prop) {
      case "config":
        break;
      case "disabled":
        break;
      case "height":
        this.height(newVal)
        break;
      case "width":
        this.width(newVal)
        break;
        case "stream":
          break;
      default:
        break;
    }
  }

  get id() { return this.getAttribute('id'); }
  set id(id) { this.setAttribute('id', id); }

  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(d) {
    if (d) {
        this.setAttribute('disabled', '');
    } else {
        this.removeAttribute('disabled');
    }
  }
  
  get width() { return this.offsetWidth }
  set width(w) { this.setWidth(w) } 
  get height() { return this.offsetHeight }
  set height(h) { this.setHeight(h) }
  get oWidth() { return this.#oWidth }
  get oHeight() { return this.#oHeight }
  get widthDeltaR() { return this.offsetWidth / this.#oWidth }
  get heightDeltaR() { return this.offsetHeight / this.#oHeight }

  get stream() {  }
  set stream(s) {  }

  get body() { return this.#elBody }
  get utils() { return this.#elUtils }
  get widgets() { return this.#elWidgets }

  elStart(theme) {
    this.#theme = theme
    this.setUtilsLocation()
  }

  onResized(entries) {
    // window.requestAnimationFrame(() => {
      console.log("onResize")
      console.log(this.offsetWidth)
      console.log(this.offsetHeight)

      if (isObject(this.MainPane) && this.MainPane.constructor.name === "MainPane") {
        this.previousDimensions()
        this.emit("global_resize", {w: this.offsetWidth, h: this.offsetHeight}) 
      }
    // })
  }

  previousDimensions() {
    this.#oWidth = (this.#widthCache) ? this.#widthCache : this.offsetWidth
    this.#oHeight = (this.#heightCache) ? this.#heightCache : this.offsetHeight
    this.#widthCache = this.offsetWidth
    this.#heightCache = this.offsetHeight
  }

  setWidth(w) {
    if (isNumber(w)) {
      this.#chartW = w
      w += "px"
    }
    else if (isString(w)) {
      // TODO: regex guard
      // TODO: fallback w = "100%"
    }
    else {
      this.#chartW = this.parentElement.getBoundingClientRect().width
      w = this.#chartW + "px"
    }
    this.style.width = w
  }

  setHeight(h) {
    if (isNumber(h)) {
      this.#chartH = h
      h += "px"
    }
    else if (isString(h)) {
      // TODO: regex guard
      // TODO: fallback w = "100%"
    }
    else {
      this.#chartH = this.parentElement.getBoundingClientRect().height
      w = this.#chartH + "px"
    }
    this.style.height = h
  }

  setWidthMin(w) { this.style.minWidth = `var(--txc-min-width, ${w})` }
  setHeightMin(h) { this.style.minHeight = `var(--txc-min-height, ${w})` }
  setWidthMax(w) { this.style.minWidth = `var(--txc-max-width, ${w})` }
  setHeightMax(h) { this.style.minHeight = `var(--txc-max-height, ${w})` }

  /**
   * Set chart width and height
   * @param {number} w - width in pixels
   * @param {number} h - height in pixels
   * @memberof TradeXchart
   */
  setDimensions(w, h) {
    let dims
    // old values
    let width = this.width
    let height = this.height

    // otherwise use a fallback width and height
    if (!w || !h) {
      const dims = this.getBoundingClientRect()
      const parent = this.parentElement.getBoundingClientRect()

      h = (!dims.height) ? (!parent.height) ? CHART_MINH : parent.height : dims.height;
      w = (!dims.width) ? (!parent.width) ? CHART_MINW : parent.width : dims.width;
    }

    dims = {
      width: this.width,
      height: this.height,
      resizeW: w / width,
      resizeH: h / height,
      resizeWDiff: w - width,
      resizeHDiff: h - height
    }

    this.setWidth(w)
    this.setHeight(h)

    return dims
  }

  setUtilsLocation(pos=this.#theme?.utils?.location) {
    this.#theme.utils = this.#theme.utils || {}
    switch(pos) {
      case "none":
      case false:
        this.#theme.utils.location = "none"
        this.#theme.utils.height = 0
        this.elUtils.style.display = "none"
        this.elUtils.style.height =`0px`;
        this.elBody.style.height = `100%`
        break;
      case "top":
      default:
        this.#theme.utils.location = "top"
        this.#theme.utils.height = UTILSH
        this.elUtils.style.display = "block"
        this.elUtils.style.height =`${UTILSH}px`;
        this.elBody.style.height = `calc(100% - ${UTILSH}px)`
    }
  }
}
