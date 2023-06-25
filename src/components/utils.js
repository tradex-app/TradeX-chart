// utils.js
// Utils bar that lives at the top of the chart
// Providing: timeframes, indicators, config, refresh, save, load

import DOM from "../utils/DOM"
import { UtilsStyle } from "../definitions/style"
import { CLASS_UTILS } from "../definitions/core"
import utilsList from "../definitions/utils"
import Indicators from "../definitions/indicators"
import { debounce } from "../utils/utilities"
import { isObject } from "../utils/typeChecks"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-utils"


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
  #utilsEvents = {}
  #stateMachine
  #timers = {}

  constructor (core, options) {

    this.#core = core
    this.#options = options
    this.#elUtils = core.elUtils
    this.#utils = core.config?.utilsBar || utilsList
    this.#widgets = core.WidgetsG
    this.#indicators = core.indicatorClasses || Indicators
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
  get stateMachine() { return this.#stateMachine }

  init() {
    // mount the default or custom utils bar definition
    this.#elUtils.innerHTML = this.#elUtils.defaultNode(this.#utils)

    this.log(`${this.#name} instantiated`)
  }

  start() {
    // activate utils icons and menus
    this.initAllUtils()
    // set up event listeners
    this.eventsListen()
    // start state machine
    // this.#stateMachine = new StateMachine(stateMachineConfig, this)
  }

  destroy() {
    // this.stateMachine.destroy()
    // remove event listeners
    const api = this.#core
    const utils = DOM.findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`)

    for (let util of utils) {
      let id = util.id.replace('TX_', '')
      for (let u of this.#utils) {
        if (u.id === id)
          util.removeEventListener("click", this.#utilsEvents[id].click)
          util.removeEventListener("pointerover", this.#utilsEvents[id].pointerover)
          util.removeEventListener("pointerout", this.#utilsEvents[id].pointerout)
      }
    }

    this.off("utils_indicators", this.onIndicators)
    this.off("utils_timezone", this.onTimezone)
    this.off("utils_settings", this.onSettings)
    this.off("utils_screenshot", this.onScreenshot)
  }

  eventsListen() {
    this.on("utils_indicators", this.onIndicators, this)
    this.on("utils_timezone", this.onTimezone, this)
    this.on("utils_settings", this.onSettings, this)
    this.on("utils_screenshot", this.onScreenshot, this)
    // this.on("resize", (dimensions) => this.onResize, this)
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
    // if (!isObject(e.originalTarget)) return false

    const target = DOM.findTargetParentWithClass(e.target, "icon-wrapper")
    if (!isObject(target)) return false
    const now = Date.now()
    if (now - this.#timers[target.id] < 1000) return false
    this.#timers[target.id] = now

    let evt = target.dataset.event;
    let menu = target.dataset.menu || false,
        data = {
          target: target.id,
          menu: menu,
          evt: evt
        };
    
    this.emit(evt, data)

    if (menu) this.emit("menu_open", data)
    else {
      // this.emit("menuItem_selected", data)
      this.emit("util_selected", data)
    }
  }

  onIconOver(e) {
    const svg = e.currentTarget.querySelector('svg');
          svg.style.fill = UtilsStyle.COLOUR_ICONHOVER
  }

  onIconOut(e) {
    const svg = e.currentTarget.querySelector('svg');
          svg.style.fill = UtilsStyle.COLOUR_ICON
  }

  initAllUtils() {
    const utils = this.#elUtils.querySelectorAll(`.icon-wrapper`)

    for (let util of utils) {

      this.#timers[util.id] = 0

      let id = util.id.replace('TX_', ''),
          svg = util.querySelector('svg');
          svg.style.fill = UtilsStyle.COLOUR_ICON
          svg.style.height = "90%"

      // iterate over default or custom utils bar definition
      for (let u of this.#utils) {
        if (u.id === id) {
          this.#utilsEvents[id] = {}
          this.#utilsEvents[id].click = this.onIconClick.bind(this) // debounce(this.onIconClick, 50, this) // this.onIconClick.bind(this)
          this.#utilsEvents[id].pointerover = this.onIconOver.bind(this)
          this.#utilsEvents[id].pointerout = this.onIconOut.bind(this)
          util.addEventListener("click", this.#utilsEvents[id].click)
          util.addEventListener("pointerover", this.#utilsEvents[id].pointerover)
          util.addEventListener("pointerout", this.#utilsEvents[id].pointerout)

          if (id === "indicators") u.sub = Object.values(this.#indicators)

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

  onIndicators(data) {
    // console.log(`Indicator:`,data)
  }

  onTimezone(data) {
    // console.log(`Timezone:`,data)
    this.#core.notImplemented()
  }

  onSettings(data) {
    // console.log(`Settings:`,data)
    this.#core.notImplemented()
  }

  onScreenshot(data) {
    // console.log(`Screenshot:`,data)
    this.#core.notImplemented()
  }


}
