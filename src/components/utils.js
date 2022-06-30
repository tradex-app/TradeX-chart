// utils.js
// Utils bar that lives at the top of the chart
// Providing: timeframes, indicators, config, refresh, save, load

import DOM from "../utils/DOM"
import { UtilsStyle } from "../definitions/style"
import { CLASS_UTILS } from "../definitions/core"
import utilsList from "../definitions/utils"
import indicators from "../definitions/indicators"

// const indicators = [
//   {id: "ADX", name: "Average Direction", event: "addIndicator"},
//   {id: "BB", name: "Bollinger Bands", event: "addIndicator"},
//   {id: "EMA", name: "Exponential Moving Average ", event: "addIndicator"},
//   {id: "DMI", name: "Directional Movement", event: "addIndicator"},
//   {id: "RSI", name: "Relative Strength Index", event: "addIndicator"},
// ]

export default class UtilsBar {

  #name = "Utilities"
  #shortName = "utils"
  #mediator
  #options
  #elUtils
  #utils
  #widgets
  #indicators
  #menus = {}

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elUtils = mediator.api.elements.elUtils
    this.#utils = utilsList || options.utilsBar
    this.#widgets = this.#mediator.api.core.WidgetsG
    this.#indicators = this.options.indicators || indicators
    this.init()
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get mediator() {return this.#mediator}
  get options() {return this.#options}
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elUtils) }

  init() {
    this.mount(this.#elUtils)

    this.log(`${this.#name} instantiated`)
  }

  start() {
    this.initAllUtils()

    // set up event listeners
    this.eventsListen()
  }

  end() {
    // remove event listeners
    const api = this.#mediator.api
    const utils = DOM.findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`)

    for (let util of utils) {
      for (let u of this.#utils) {
        if (u.id === id)
          util.removeEventListener("click", this.onIconClick)
      }
    }
  }

  eventsListen() {
    this.on("utils_indicators", (e) => { this.onIndicators(e) })
    this.on("utils_timezone", (e) => { this.onTimezone(e) })
    this.on("utils_settings", (e) => { this.onSettings(e) })
    this.on("utils_screenshot", (e) => { this.onScreenshot(e) })
    // this.on("resize", (dimensions) => this.onResize(dimensions))

  }
  
  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context)
  }

  off(topic, handler) {
    this.#mediator.off(topic, handler)
  }

  emit(topic, data) {
    this.#mediator.emit(topic, data)
  }

  onIconClick(e) {
    let evt = e.currentTarget.dataset.event,
        menu = e.currentTarget.dataset.menu || false,
        data = {
          target: e.currentTarget.id,
          menu: menu,
          evt: e.currentTarget.dataset.event
        };
        
    this.emit(evt, data)

    if (menu) this.emit("openMenu", data)
    else {
      this.emit("menuItemSelected", data)
      this.emit("utilSelected", data)
    }
  }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  initAllUtils() {
    const api = this.#mediator.api
    const utils = DOM.findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`)

    for (let util of utils) {

      let id = util.id.replace('TX_', ''),
          svg = util.querySelector('svg');
          svg.style.fill = UtilsStyle.COLOUR_ICON
          svg.style.height = "90%"


      for (let u of this.#utils) {
        if (u.id === id) {
          util.addEventListener("click", this.onIconClick.bind(this))

          if (u.id === "indicators") u.sub = Object.values(this.#indicators)

          if (u?.sub) {
            let config = {
              content: u.sub,
              primary: util
            }
            let menu = this.#widgets.insert("Menu", config)
            util.dataset.menu = menu.id
            menu.start()
          }
        }
      }
    }
  }

  defaultNode() {
    let utilsBar = ""
    for (const util of this.#utils) {
      utilsBar += this.iconNode(util)
    }

    return utilsBar
  }

  iconNode(util) {
    const iconStyle = `display: inline-block; height: ${this.#elUtils.clientHeight}px; padding-top: 2px`
    const menu = ("sub" in util) ? `data-menu="true"` : ""
    return  `
      <div id="TX_${util.id}" data-event="${util.event}" ${menu} class="icon-wrapper" style="${iconStyle}">${util.icon}</div>\n
    `
  }


  onTimezone(data) {
    console.log(`Timezone:`,data)
    let config = {}
    this.#widgets.insert("Dialogue", config)
  }

}