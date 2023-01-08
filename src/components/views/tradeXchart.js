// tradeXchart.js
// <tradex-chart></tradex-chart>

import element from "./classes/element"
import { debounce } from "../../utils/utilities"
import { isObject } from "../../utils/typeChecks"

import tradeXBody from "./body"
import tradeXUtils from "./utils"
import tradeXwidgets from "./widgets"

import {
  UTILSH,
  TOOLSW,
  TIMEH,
  SCALEW,
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
  #oWidth
  #oHeight
  #template

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

  get oWidth() { return this.#oWidth }
  get oHeight() { return this.#oHeight }

  get stream() {  }
  set stream(s) {  }

  get body() { return this.#elBody }
  get utils() { return this.#elUtils }
  get widgets() { return this.#elWidgets }


  onResized(entries) {
    window.requestAnimationFrame(() => {
      console.log("onResize")
      console.log(this.offsetWidth)
      console.log(this.offsetHeight)

      if (isObject(this.MainPane) && this.MainPane.constructor.name === "MainPane") {
        this.previousDimensions()
        this.emit("global_resize", {w: this.offsetWidth, h: this.offsetHeight}) 
      }
    })
  }

  previousDimensions() {
    this.#oWidth = this.offsetWidth
    this.#oHeight = this.offsetHeight
  }

}