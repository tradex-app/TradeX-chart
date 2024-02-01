// tradeXchart.js
// <tradex-chart></tradex-chart>

import { debounce, idSanitize } from "../../utils/utilities"
import { isNumber, isObject, isString } from "../../utils/typeChecks"
import { CSSUNITS } from "../../definitions/core"
import { UTILSLOCATIONS } from "../../definitions/chart"

import element from "./classes/element"
import MainPane from "../main"
import ToolsBar from "../tools"
import tradeXBody from "./body"
import tradeXUtils from "./utils"
import tradeXwidgets from "./widgets"

import {
  UTILSH,
  CHART_MINH, 
  CHART_MINW,
  TX_MINH
} from "../../definitions/style"
import {
  GlobalStyle, GridStyle, XAxisStyle, YAxisStyle
} from "../../definitions/style"

const HTML = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
    }
    tradex-utils {
      height: ${UTILSH}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${UTILSH}px); 
      min-height: ${CHART_MINH - UTILSH}px;
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
  #resizeEntries

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
      this.style.minHeight = TX_MINH
      this.#elWidgets = this.shadowRoot.querySelector('tradex-widgets')
      this.#elUtils = this.shadowRoot.querySelector('tradex-utils')
      this.#elBody = this.shadowRoot.querySelector('tradex-body')
      // set the "old" values from parent element
      this.#chartH = this.parentElement.clientHeight || CHART_MINH
      this.#chartW = this.parentElement.clientWidth || CHART_MINW
      // set the width and height
      let height = this.getAttribute('height') || "100%"
      let width = this.getAttribute('width') || "100%"

      this.setDimensions(width, height)

      this.resizeObserver = new ResizeObserver(debounce(this.onResized, 100, this))
      this.resizeObserver.observe(this)      
    }
  }

  disconnectedCallback() {

    this.resizeObserver.disconnect()
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
  set id(id) { this.setAttribute('id', idSanitize(id)); }

  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(d) {
    if (d) {
        this.setAttribute('disabled', '');
    } else {
        this.removeAttribute('disabled');
    }
  }
  
  get stream() { return true }
  set stream(s) {  }

  get elBody() { return this.#elBody }
  get elUtils() { return this.#elUtils }
  get elWidgets() { return this.#elWidgets }
  get elWidgetsG() { return this.#elWidgets }
  get elMain() { return this.#elBody.main }
  get elTime() { return this.#elBody.main.time }
  get elTools() { return this.#elBody.tools }
  get elYAxis() { return this.#elBody.scale }
  get width() { return this.#chartW }
  get height() { return this.#chartH }
  get resizeEntries() { return this.#resizeEntries }

  elStart(theme) {
    this.#theme = theme
    this.setUtilsLocation()
  }

  onResized(entries) {
      super.onResize(entries)

      const utilsH = (UTILSLOCATIONS.includes(this.theme?.utils?.location)) ? UTILSH : 0
      const {width, height} = entries[0].contentRect
      this.#chartW = width
      this.#chartH = height
      this.#resizeEntries = entries[0]

      this.elBody.style.height = `calc(100% - ${utilsH}px)`

      if (this.MainPane instanceof MainPane) {
        // this.previousDimensions()
      }
      if (this.ToolsBar instanceof ToolsBar) {
        this.ToolsBar.onResized()
      }
      this.log(`onResize w: ${width}, h: ${height}`)
      this.emit("global_resize", {w: width, h: height}) 
  }

  setWidth(w) {
    if (isNumber(w)) {
      w += "px"
    }
    else if (isString(w) && w.match(CSSUNITS)) {
      // w = w
    }
    else {
      w = "100%"
    }
    this.style.width = w
    this.#chartW = Math.round(this.getBoundingClientRect().width)
  }

  setHeight(h) {
    if (isNumber(h)) {
      h += "px"
    }
    else if (isString(h) && h.match(CSSUNITS)) {
      // h = h
    }
    else {
      this.#chartH = this.parentElement.getBoundingClientRect().height
      h = this.#chartH + "px"
      // h = "100%"
    }
    this.style.height = h
    this.#chartH = Math.round(this.getBoundingClientRect().height)
  }

  setWidthMin(w) { this.style.minWidth = `var(--txc-min-width, ${w})` }
  setHeightMin(h) { this.style.minHeight = `var(--txc-min-height, ${h})` }
  setWidthMax(w) { this.style.minWidth = `var(--txc-max-width, ${w})` }
  setHeightMax(h) { this.style.minHeight = `var(--txc-max-height, ${h})` }

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
    else if (!isNumber(w) || !isNumber(h)) {

      if (!isString(w) || !w.match(CSSUNITS)) {
        w = "100%"
      }

      if (!isString(h) || !h.match(CSSUNITS)) {
        h = "100%"
      }
    }
    
    this.setWidth(w)
    this.setHeight(h)

    dims = {
      width: this.width,
      height: this.height,
      resizeW: w / width,
      resizeH: h / height,
      resizeWDiff: w - width,
      resizeHDiff: h - height
    }
    return dims
  }

  setUtilsLocation(pos=this.#theme?.utils?.location) {
    this.#theme.utils = this.#theme.utils || {}
    switch(pos) {
      case "top":
      case true:
        this.theme.setProperty("utils.location", "top")
        this.theme.setProperty("utils.height", UTILSH)
        this.#theme.utils.location = "top"
        this.#theme.utils.height = UTILSH
        this.elUtils.style.display = "block"
        this.elUtils.style.height =`${UTILSH}px`;
        this.elBody.style.height = `calc(100% - ${UTILSH}px)`
        this.elBody.style.minHeight = `${CHART_MINH - UTILSH}px`
        break;
      case "none":
      case false:
      default:
        this.theme.setProperty("utils.location", "none")
        this.theme.setProperty("utils.height", 0)
        this.#theme.utils.location = "none"
        this.#theme.utils.height = 0
        this.elUtils.style.display = "none"
        this.elUtils.style.height =`0px`;
        this.elBody.style.height = `100%`
        this.elBody.style.minHeight = `${CHART_MINH}px`
        break;
    }
  }
}
