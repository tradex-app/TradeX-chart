// widgets.js
// A template file for Chart components

import DOM from "../utils/DOM"
import Menu from "./widgets/menu"
import Dialogue from "./widgets/dialogue"
import Divider from "./widgets/divider"
import Window from "./widgets/window"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-widgets"

export default class Widgets {

  #name = "Widgets"
  #shortName = "widgets"
  #core
  #options
  #stateMachine

  #widgets
  #widgetsList = { Dialogue, Divider, Menu, Window }
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

  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get core() { return this.#core }
  get options() { return this.#options }
  get elements() { return this.#elements }
  get instances() { return this.#widgetsInstances }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }

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
    stateMachineConfig.context = this
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()
  }

  destroy() {
    // Stop and clean up the module to prevent memory leaks.
    // It should remove: event listeners, timers, ect.
    // Put your toys away or it will end in tears.
    this.off("openMenu", this.onOpenMenu)
    this.off("closeMenu", this.onCloseMenu)
    this.off("offMenu", this.onCloseMenu)
    this.off("menuItemSelected", this.onMenuItemSelected)
    
    this.stateMachine.destroy()
  }

  // listen/subscribe/watch for parent notifications
  eventsListen() {
    // this.on("resize", (dimensions) => this.onResize.bind(this))

    this.on("openMenu", this.onOpenMenu.bind(this))
    this.on("closeMenu", this.onCloseMenu.bind(this))
    this.on("offMenu", this.onCloseMenu.bind(this))
    this.on("menuItemSelected", this.onMenuItemSelected.bind(this))
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
    console.log("onOpenMenu:", data)

    this.#widgetsInstances[data.menu].open()
  }
  onCloseMenu(data) {
    console.log("onCloseMenu:", data)

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
    config.core = this.core
    const widget = this.#widgets[type].create(this, config)
    this.#widgetsInstances[widget.id] = widget
    return widget
  }

  remove(type, id) {
    delete(this.#widgetsInstances[id])
    this.#widgets[type].destroy(id)
  }

}
