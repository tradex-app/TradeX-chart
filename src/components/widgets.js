// widgets.js
// A template file for Chart components

import DOM from "../utils/DOM"
import Menu from "./widgets/menu"
import Dialogue from "./widgets/dialogue"
import Divider from "./widgets/divider"
import Window from "./widgets/window"
import stateMachineConfig from "../state/state-widgets"

export default class Widgets {

  #name = "Widgets"
  #shortName = "widgets"
  #mediator
  #options
  #parent
  #widgets
  #widgetsList = { Dialogue, Divider, Menu, Window }
  #widgetsInstances = {}
  #elements = {}
  #elWidgetsG
  #elMenus
  #elDividers

  #width
  #height


  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#widgets = options.widgets || this.#widgetsList
    this.#elWidgetsG = this.#mediator.api.core.elWidgetsG
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
  get instances() { return this.#widgetsInstances }

  init() {
    this.mount(this.#elWidgetsG)

    // api - functions / methods, calculated properties provided by this module
    const api = this.#mediator.api
    api.parent = this.#mediator
    // api.elements = this.#elements

    // this.#elements = {
    //   elWidgetsG: this.#elWidgetsG,
    // }

    api.elements = 
    {...api.elements, 
      ...{
        elWidgetsG: this.#elWidgetsG
      }
    }

    for (let i in this.#widgets) {
      let widget = this.#widgets[i]
      let entry = `el${widget.name}`
      this.#elements[entry] = DOM.findBySelector(`#${api.id} .${widget.class}`)
    }
  }

  start() {
    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.context.origin = this
    this.#mediator.stateMachine = stateMachineConfig
    this.#mediator.stateMachine.start()
  }

  end() {
    // Stop and clean up the module to prevent memory leaks.
    // It should remove: event listeners, timers, ect.
    // Put your toys away or it will end in tears.
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
    config.mediator = this.mediator
    const widget = this.#widgets[type].create(this, config)
    this.#widgetsInstances[widget.id] = widget
    return widget
  }

  remove(type, id) {
    delete(this.#widgetsInstances[id])
    this.#widgets[type].destroy(id)
  }

}
