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
    const utilsObjects = DOM.findBySelectorAll(`#${api.id} .${CLASS_UTILS} .tool`)

    for (let obj of utilsObjects) {

      let id = obj.id.replace('TX_', '');

      obj.addEventListener("load", () => {
        let svgObj = obj.contentDocument,
            svg = svgObj.querySelector(`svg`);
            svg.style.fill = UtilsStyle.COLOUR_ICON

        for (let u of this.#utils) {
          if (u.id === id)
            svg.addEventListener("click", () => {
              u.action()
            })
        }
      })
    }
  }

  defaultNode() {
    let utilsBar = ""
    for (const util of this.#utils) {
      utilsBar += this.utilNode(util)
    }

    return utilsBar
  }

  utilNode(util) {
    const iconStyle = "display: inline;"
    const objectStyle = "height: 90%; padding-top: 2px;"
    return  `
    <div class="icon-wrapper" style="${iconStyle}"><object id="TX_${util.id}" style="${objectStyle}" data="${util.icon}" type="image/svg+xml" class="tool"></object></div>\n
    `
  }

}