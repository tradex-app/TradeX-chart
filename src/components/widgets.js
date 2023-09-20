// widgets.js
// A template file for Chart components

import DOM from "../utils/DOM"
import Menu from "./widgets/menu"
import Dialogue from "./widgets/dialogue"
import Divider from "./widgets/divider"
import Progress from "./widgets/progress"
import Window from "./widgets/window"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-widgets"
import { isObject } from "../utils/typeChecks"
import { idSanitize } from "../utils/utilities"

export default class Widgets {

  #id
  #name = "Widgets"
  #shortName = "widgets"
  #core
  #options
  #stateMachine

  #widgets
  #widgetsList = { Divider, Progress, Menu, Window, Dialogue }
  #widgetsInstances = {}
  #elements = {}
  #elWidgetsG

  #width
  #height

  constructor (core, options) {

    this.#core = core
    this.#options = options
    this.#widgets = {...this.#widgetsList, ...options.widgets}
    this.#elWidgetsG = core.elWidgetsG
    this.init()
  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warn(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return (this.#id) ? `${this.#id}` : `${this.#core.id}-${this.#shortName}`.replace(/ |,|;|:|\.|#/g, "_") }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get core() { return this.#core }
  get options() { return this.#options }
  get elements() { return this.#elements }
  get instances() { return this.#widgetsInstances }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }
  get types() { return this.#widgets }

  init() {
    this.mount(this.#elWidgetsG)

    for (let i in this.#widgets) {
      let widget = this.#widgets[i]
      let entry = `el${widget.name}`
      this.#elements[entry] = this.#elWidgetsG.querySelector(`.${widget.class}`)
    }
  }

  start() {
    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.id = this.id
    stateMachineConfig.context = this
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()
  }

  destroy() {
    this.off("menu_open", this.onOpenMenu)
    this.off("menu_close", this.onCloseMenu)
    this.off("menu_off", this.onCloseMenu)
    this.off("menuItem_selected", this.onMenuItemSelected)
    
    this.stateMachine.destroy()

    for (let i in this.#widgetsInstances) {
      this.delete(i)
    }

    for (let t in this.#widgets) {
      this.#widgets[t].destroy(id)
    }
  }

  // listen/subscribe/watch for parent notifications
  eventsListen() {
    this.on("resize", this.onResize, this)

    this.on("menu_open", this.onOpenMenu, this)
    this.on("menu_close", this.onCloseMenu, this)
    this.on("menu_off", this.onCloseMenu, this)
    this.on("menuItem_selected", this.onMenuItemSelected, this)
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

  onResize(dimensions) {
    this.setDimensions(dimensions)
  }

  onOpenMenu(data) {
    // console.log("onOpenMenu:", data)

    this.#widgetsInstances[data.menu].open()
  }
  onCloseMenu(data) {
    // console.log("onCloseMenu:", data)

    this.#widgetsInstances[data.menu].close()
  }

  onMenuItemSelected(e) {
    // console.log("onMenuItemSelected:",e)

    this.emit(e.evt, e.target)
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

    let nodes = ``,
        types = [];
    for (let i in this.#widgets) {
      let widget = this.#widgets[i]

      // only add one of each widget type
      // some widgets are extensions of a parent
      if (types.indexOf(widget.type) === -1) {
        nodes += widget.defaultNode()
        types.push(widget.type)
      }
    }

    return nodes
  }

  insert(type, config) {
    if (!(type in this.#widgets) || !isObject(config)) return false

    config.core = this.core
    const widget = this.#widgets[type].create(this, config)
    this.#widgetsInstances[widget.id] = widget
    return widget
  }

  delete(id) {
    if (!isString(id)) return false

    this.#widgets[type].destroy(id)
    return true
  }

}
