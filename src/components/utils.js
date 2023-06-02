// utils.js
// Utils bar that lives at the top of the chart
// Providing: timeframes, indicators, config, refresh, save, load

import DOM from "../utils/DOM"
import { UtilsStyle } from "../definitions/style"
import { CLASS_UTILS } from "../definitions/core"
import utilsList from "../definitions/utils"
import indicators from "../definitions/indicators"


export default class UtilsBar {

  #name = "Utilities"
  #shortName = "utils"
  #core
  #options
  #elUtils
  #utils
  #widgets
  #indicators
  #menus = {}

  constructor (core, options) {

    this.#core = core
    this.#options = options
    this.#elUtils = core.elUtils
    this.#utils = core.config?.utilsBar || utilsList
    this.#widgets = core.WidgetsG
    this.#indicators = core.indicators || indicators
    this.init()
  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warn(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get core() {return this.#core}
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
    // this.stateMachine.destroy()
    // remove event listeners
    const api = this.#core
    const utils = DOM.findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`)

    for (let util of utils) {
      for (let u of this.#utils) {
        if (u.id === id)
          util.removeEventListener("click", this.onIconClick)
      }
    }

    this.off("utils_indicators", this.onIndicators)
    this.off("utils_timezone", this.onTimezone)
    this.off("utils_settings", this.onSettings)
    this.off("utils_screenshot", this.onScreenshot)
  }

  eventsListen() {
    this.on("utils_indicators", this.onIndicators.bind(this))
    this.on("utils_timezone", this.onTimezone.bind(this))
    this.on("utils_settings", this.onSettings.bind(this))
    this.on("utils_screenshot", this.onScreenshot.bind(this))
    // this.on("resize", (dimensions) => this.onResize.bind(this))
  }
  
  on(topic, handler, context) {
    this.#core.on(topic, handler, context)
  }

  off(topic, handler) {
    this.#core.off(topic, handler)
  }

  emit(topic, data) {
    this.#core.emit(topic, data)
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
    const api = this.#core
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
    // let utilsBar = ""
    let style = `display: inline-block; float: right;`
    let utilsBar = `
    <div style="${style}">
    <style>
      svg {
        height: ${UtilsStyle.ICONSIZE};
        fill: ${UtilsStyle.COLOUR_ICON};
      }
    </style>
    `
    for (const util of this.#utils) {
      utilsBar += this.iconNode(util)
    }

    return utilsBar + "</div>"
  }

  iconNode(util) {
    const iconStyle = `display: inline-block; height: ${UtilsStyle.ICONSIZE}; padding-top: 2px`
    const menu = ("sub" in util) ? `data-menu="true"` : ""
    return  `
      <div id="TX_${util.id}" data-event="${util.event}" ${menu} class="icon-wrapper" style="${iconStyle}">${util.icon}</div>\n
    `
  }


  onIndicators(data) {
    console.log(`Indicator:`,data)
  }

  onTimezone(data) {
    console.log(`Timezone:`,data)
    this.#core.notImplemented()
  }

  onSettings(data) {
    console.log(`Settings:`,data)
    this.#core.notImplemented()
  }

  onScreenshot(data) {
    console.log(`Screenshot:`,data)
    this.#core.notImplemented()
  }


}
