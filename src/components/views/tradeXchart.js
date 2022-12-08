// tradeXchart.js
// <tradex-chart></tradex-chart>

import element from "./classes/element"
import { debounce } from "../../utils/utilities"

import tradeXBody from "./body"
import tradeXUtils from "./utils"
import tradeXwidgets from "./widgets"

import {
  UTILSH,
  TOOLSW,
  TIMEH,
  SCALEW,
} from "../../definitions/core"
import {
  GlobalStyle
} from "../../definitions/style"

const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host tradex-chart { 
      --txc-background-color: ${GlobalStyle.COLOUR_BG};
      --txc-border-color: ${GlobalStyle.COLOUR_BORDER};
      --txc-color: ${GlobalStyle.COLOUR_TXT};
      --txc-font: ${GlobalStyle.FONT}
    }
    tradex-utils {
      border-bottom: 1px solid;
      height: ${UTILSH}px; 
      width: 100%; 
      border-color: var(--txc-border-color, ${GlobalStyle.COLOUR_BORDER}); 
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
    <tradex-utils></tradex-utils>
    <tradex-body></tradex-body>
    <tradex-widgets></tradex-widgets>
`


export default class tradeXChart extends element {

  #elBody
  #elUtils
  #elWidgets

  constructor () {
    super(template)
  }

  destroy() {
    this.resizeObserver.disconnect()
  }

  static get observedAttributes() {
    return ['disabled', 'height', 'stream', 'width']
  }

  connectedCallback() {
    // element building must be done here
    // https://stackoverflow.com/a/43837330/15109215
    if (this.doInit) {
      this.doInit = false
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.style.display = "block"
      this.height = this.getAttribute('height')
      this.width = this.getAttribute('width')

      this.#elBody = this.shadowRoot.querySelector('tradex-body')
      this.#elUtils = this.shadowRoot.querySelector('tradex-utils')
      this.#elWidgets = this.shadowRoot.querySelector('tradex-widgets')

      this.resizeObserver = new ResizeObserver(debounce(this.onResized, 100, this))
      this.resizeObserver.observe(this)
      
      this.addEventListener('click', this.onClick.bind(this))
    }
  }

  disconnectedCallback() {

    this.resizeObserver.disconnect()

    this.removeEventListener('click', this.onClick)
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    switch(prop) {
      case "disabled":
        break;
      case "height":
        this.height(newVal)
        break;
      case "width":
        this.width(newVal)
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

  get test() { return this.t }
  set test(t) { this.t = t; console.log(this.t) }

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
    })
  }

  onClick(e) {
    console.log("I'm clicked!")
  }

}