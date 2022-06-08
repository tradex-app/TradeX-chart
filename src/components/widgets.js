// widgets.js
// A template file for Chart components

import DOM from "../utils/DOM"
import { CLASS_MENU, CLASS_WINDOW } from "../definitions/core"
import { MenuStyle, WindowStyle } from "../definitions/style"
import menu from "./widgets/menu"
import dialogue from "./widgets/dialogue"

// import stateMachineConfig from "../state/state-widgets"

export default class Widgets {

  #name = "Widgets"
  #shortName = "widgets"
  #mediator
  #options
  #parent
  #elements
  #elWidgetsG
  #elMenu

  #width
  #height

  #widgetSettings
  #widgetTimezone
  #widgetIndicators


  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elWidgetsG = this.#mediator.api.elements.elWidgetsG
    this.#parent = this.#mediator.api.parent
    this.init()
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get elements() { return this.#elements }

  init() {
    this.mount(this.#elWidgetsG)

    // api - functions / methods, calculated properties provided by this module
    const api = this.#mediator.api
    api.parent = this.#mediator
    api.elements = this.#elements
    
    this.#elMenu = DOM.findBySelector(`#${api.id} .${CLASS_MENU}`)

    this.#elements = {
      elWidgetsG: this.#elWidgetsG,
      elMenu: this.#elMenu
    }

    // listen/subscribe/watch for parent notifications
    this.#parent.on("resize", (dimensions) => this.onResize(dimensions))
  }

  start() {

    // set up event listeners
    this.eventsListen()

    // start State Machine 
    // stateMachineConfig.context.origin = this
    // this.#mediator.stateMachine = stateMachineConfig
    // this.#mediator.stateMachine.start()
  }

  end() {
    // Stop and clean up the module to prevent memory leaks.
    // It should remove: event listeners, timers, ect.
    // Put your toys away or it will end in tears.
  }


  eventsListen() {
    this.#mediator.on("utils_indicators", (e) => { this.onIndicators(e) })
    this.#mediator.on("utils_timezone", (e) => { this.onTimezone(e) })
    this.#mediator.on("utils_settings", (e) => { this.onSettings(e) })
    this.#mediator.on("utils_screenshot", (e) => { this.onScreenshot(e) })
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

  onResize(dimensions) {
    this.setDimensions(dimensions)
  }

  onIndicators(e) {

    const insidcators = [
      {id: "ADX", name: "Average Direction", action: ()=>{console.log("ADX")}},
      {id: "BB", name: "Bollinger Bands", action: ()=>{console.log("BB")}},
      {id: "DMI", name: "Directional Movement", action: ()=>{console.log("DMI")}}
    ]

    let content = "<ul>"
    for (let i of insidcators) {
      content += `<li><span>${i.id}</span><span>${i.name}</span></li>`
    }
    content += "</ul>"

    this.insertMenu(e, content)
    console.log("Indicators Menu")
  }

  onTimezone(e) {
    console.log("Set timezone")
  }

  onSettings(e) {
    console.log("Modify chart settings")
  }

  onScreenshot(e) {
    console.log("Save chart screenshot")
  }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  setWidth(w) {
    this.#width = w
  }

  setHeight(h) {
    this.#height = h
  }

  setDimensions(dimensions) {
    this.setWidth(dimensions.mainW)
    this.setHeight(dimensions.mainH)
  }

  defaultNode() {
    const menuStyle = `display: none; border: 1px solid ${MenuStyle.COLOUR_BORDER}; background: ${MenuStyle.COLOUR_BG}; color: ${MenuStyle.COLOUR_TXT}; position: absolute;`

    const node = `
      <div class="${CLASS_MENU}" style="${menuStyle}"></div>
    `
    return node
  }

  insertMenu(e, content) {
    let wPos = this.#elWidgetsG.getBoundingClientRect()
    let iPos = e.target.getBoundingClientRect()

    let pos = [iPos.left - wPos.left, iPos.bottom - wPos.top]
    let config = { pos, content }
    return menu(this, config)
  }

  removeMenu() {

  }

// -----------------------

}
