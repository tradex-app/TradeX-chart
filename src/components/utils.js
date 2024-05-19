// utils.js
// Utils bar that lives at the top of the chart
// Providing: timeframes, indicators, config, refresh, save, load

import Component from "./component"
import { elementDimPos, findBySelectorAll, findTargetParentWithClass } from "../utils/DOM"
import { UtilsStyle } from "../definitions/style"
import { CLASS_UTILS } from "../definitions/core"
import { UTILSLOCATIONS } from "../definitions/chart"
import utilsList from "../definitions/utils"
import IndicatorsPublic from "../definitions/indicators"
import { debounce } from "../utils/utilities"
import { isObject } from "../utils/typeChecks"
import stateMachineConfig from "../state/state-utils"


export default class UtilsBar extends Component {

  #name = "Utilities"
  #shortName = "utils"
  #elUtils
  #utils
  #location
  #widgets
  #indicators
  #menus = {}
  #utilsEvents = {}
  #timers = {}

  constructor (core, options) {

    super(core, options)

    this.#elUtils = core.elUtils
    this.#utils = core.config?.utilsBar || utilsList
    this.#widgets = core.WidgetsG
    this.#indicators = core.indicatorsPublic || IndicatorsPublic
    this.#location = core.config.theme?.utils?.location || "none"
    if (!!this.#location ||
          this.#location == "none" ||
          !UTILSLOCATIONS.includes(this.#location)
      ) {
      this.#elUtils.style.height = 0
      this.core.elBody.style.height = "100%"
    }
    // mount the default or custom utils bar definition
    this.#elUtils.innerHTML = this.#elUtils.defaultNode(this.#utils)

    this.log(`${this.#name} instantiated`)
  }

  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get pos() { return this.dimensions }
  get dimensions() { return elementDimPos(this.#elUtils) }
  get location() { return this.#location }

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
    const api = this.core
    const utils = findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`)

    for (let util of utils) {
      let id = util.id.replace('TX_', '')
      for (let u of this.#utils) {
        if (u.id === id)
          util.removeEventListener("click", this.#utilsEvents[id].click)
          util.removeEventListener("pointerover", this.#utilsEvents[id].pointerover)
          util.removeEventListener("pointerout", this.#utilsEvents[id].pointerout)
      }
    }

    this.core.hub.expunge(this)
  }

  eventsListen() {
    this.on("utils_indicators", this.onIndicators, this)
    this.on("utils_timezone", this.onTimezone, this)
    this.on("utils_settings", this.onSettings, this)
    this.on("utils_screenshot", this.onScreenshot, this)
    // this.on("global_resize", this.onResize, this)
  }
  
  onIconClick(e) {
    // if (!isObject(e.originalTarget)) return false

    const target = findTargetParentWithClass(e.target, "icon-wrapper")
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
    let action = target.dataset.action
    
    this.emit(evt, data)

    if (menu) this.emit("menu_open", data)
    else {
      // this.emit("menuItem_selected", data)
      this.emit("util_selected", data)
    }

    if (action) action(data, this.core)
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
          this.#utilsEvents[id].click = this.onIconClick.bind(this) // debounce(this.onIconClick, 500, this) // this.onIconClick.bind(this)
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
    this.core.notImplemented()
  }

  onSettings(data) {
    // console.log(`Settings:`,data)
    this.core.notImplemented()
  }

  onScreenshot(data) {
    this.core.downloadImage()
  }


}
