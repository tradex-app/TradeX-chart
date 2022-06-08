// utils.js
// Utils bar that lives at the top of the chart
// Providing: timeframes, indicators, config, refresh, save, load

import DOM from "../utils/DOM"
import { UtilsStyle } from "../definitions/style"
import { CLASS_UTILS } from "../definitions/core"
import utilsList from "../definitions/utils"

export default class UtilsBar {

  #name = "Utilities"
  #shortName = "utils"
  #mediator
  #options
  #elUtils
  #utils

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elUtils = mediator.api.elements.elUtils
    this.#utils = utilsList || options.utilsBar
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

  init() {
    this.mount(this.#elUtils)

    this.log(`${this.#name} instantiated`)
  }

  start() {
    this.initAllUtils()
  }

  end() {
    // Stop and clean up the module to prevent memory leaks.
    // It should remove: event listeners, timers, ect.
    // Put your toys away or it will end in tears.
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
        if (u.id === id)
          svg.addEventListener("click", (e) => {
            u.action(e, this)
          })
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

  iconNode(icon) {
    const iconStyle = `display: inline-block; height: ${this.#elUtils.clientHeight}px; padding-top: 2px`
    return  `
      <div id="TX_${icon.id}" class="icon-wrapper" style="${iconStyle}">${icon.icon}</div>\n
    `
  }

}