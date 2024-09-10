// tradeXchart.js
// <tradex-chart></tradex-chart>

import { debounce, idSanitize } from "../../utils/utilities"
import { isInteger, isNumber, isObject, isString } from "../../utils/typeChecks"
import { CSSUNITS } from "../../definitions/core"
import { UTILSLOCATIONS } from "../../definitions/chart"
import { defaultConfig } from "../../definitions/config"

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

export const HTML = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
      display: grid;
      grid-row-gap: 0;
      grid-template-rows: ${UTILSH}px 1fr 0;
    }
    tradex-utils {
      grid-row: 1/2;
      width: 100%; 
    }
    tradex-body {
      grid-row: 2/3;
      width: 100%;
    }
    tradex-widgets {
      grid-row: 3/4;
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
const template = document.createElement('template')
template.innerHTML = HTML

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
    super(template, "closed")
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
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.init()
      // set the "old" values from parent element
      this.#chartH = this.parentElement.clientHeight || CHART_MINH
      this.#chartW = this.parentElement.clientWidth || CHART_MINW
      // set the width and height
      let height = this.getAttribute('height') || "100%"
      let width = this.getAttribute('width') || "100%"

      this.setDimensions(width, height)

      this.resizeObserver = new ResizeObserver(debounce(this.onResized, 100, this))
      this.resizeObserver.observe(this)
      this.start(defaultConfig)
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

  init() {
    this.style.display = "grid"
    this.style.minHeight = TX_MINH
    this.#elWidgets = this.shadowRoot.querySelector('tradex-widgets')
    this.#elUtils = this.shadowRoot.querySelector('tradex-utils')
    this.#elBody = this.shadowRoot.querySelector('tradex-body')
  }

  // get id() { return this.getAttribute('id'); }
  // set id(id) { this.setAttribute('id', idSanitize(id)); }

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
  get elRows() { return this.#elBody.main.rows }
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

      const {width, height} = entries[0].contentRect
      this.#chartW = width
      this.#chartH = height
      this.#resizeEntries = entries[0]

      // if (this.MainPane instanceof MainPane) {
      //   // this.previousDimensions()
      // }
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
    this.#theme.utils = this.#theme?.utils || {}
    const utilsH = (isNumber(this.#theme.uitils?.height) && 
                    this.#theme.utils.height > 0) ? 
                    this.#theme.uitils.height :
                    UTILSH;
    switch(pos) {
      case "top":
      case true:
        this.#theme.utils.location = "top"
        this.#theme.utils.height = utilsH
        this.style.gridTemplateRows = `${utilsH}px 1fr`
        this.elBody.style.minHeight = `${CHART_MINH - utilsH}px`
        break;
      case "none":
      case false:
      default:
        this.#theme.utils.location = "none"
        this.#theme.utils.height = 0
        this.elUtils.style.display = "none"
        this.style.gridTemplateRows = `0 1fr`
        this.elBody.style.minHeight = `${CHART_MINH}px`
        break;
    }
  }
}
