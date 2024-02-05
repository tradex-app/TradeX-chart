// widgets.js
// A template file for Chart components

import Menu from "./widgets/menu"
import Dialogue from "./widgets/dialogue"
import ConfigDialogue from "./widgets/configDialogue"
import ColourPicker from "./widgets/colourPicker"
import Divider from "./widgets/divider"
import Progress from "./widgets/progress"
import Window from "./widgets/window"
import StateMachine from "../scaleX/stateMachne"
import stateMachineConfig from "../state/state-widgets"
import { isBoolean, isObject, isString } from "../utils/typeChecks"
import { idSanitize } from "../utils/utilities"

export default class Widgets {

  #id
  #name = "Widgets"
  #shortName = "widgets"
  #core
  #options
  #stateMachine

  #widgets = {}
  #widgetsList = { Divider, Progress, Menu, Window, Dialogue, ConfigDialogue} //, ColourPicker }
  #widgetsInstances = {}
  #elements = {}
  #elWidgetsG

  #width
  #height

  constructor (core, options) {

    this.#core = core
    this.#options = options
    // TODO: valiation of options.widgets
    this.#widgets = {...this.#widgetsList, ...options.widgets}
    this.#elWidgetsG = core.elWidgetsG

    this.mount(this.#elWidgetsG)

    for (let i in this.#widgets) {
      let widget = this.#widgets[i]
      let entry = `el${widget.name}`
          this.#elements[entry] = this.#elWidgetsG.querySelector(`.${widget.class}`)
          this.#elements[entry].innerHTML = `
      <style title="${widget.name}">
        ${widget?.defaultStyles || ""}
      </style>
      `
      widget.stylesInstalled = true
    }
  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warn(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || `${this.#core.id}-${this.#shortName}` }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get core() { return this.#core }
  get options() { return this.#options }
  get elements() { return this.#elements }
  get instances() { return this.#widgetsInstances }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }
  get types() { return this.#widgets }

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
    this.#core.hub.expunge(this)
    
    this.stateMachine.destroy()

    for (let i in this.#widgetsInstances) {
      this.delete(i)
    }

    for (let t in this.#widgets) {
      this.#widgets[t].destroy()
    }
  }

  // listen/subscribe/watch for parent notifications
  eventsListen() {
    this.on("resize", this.onResize, this)

    this.on("menu_open", this.onOpenMenu, this)
    this.on("menu_close", this.onCloseMenu, this)
    this.on("menu_off", this.onCloseMenu, this)
    this.on("menuItem_selected", this.onMenuItemSelected, this)
    this.on("global_resize", this.onResize, this)
  }

  on(topic, handler, context=this) {
    this.#core.on(topic, handler, context)
  }

  off(topic, handler, context=this) {
    this.#core.off(topic, handler, context)
  }

  emit(topic, data) {
    this.#core.emit(topic, data)
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

  onResize(dimensions) {
    this.setDimensions(dimensions)
    this.elements.elDividers.style.width = `${this.core.width}px`
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

  /**
   * insert a widget into the list
   * @param {string} type 
   * @param {object} config 
   * @returns {Widget} - widget instance
   */
  insert(type, config) {
    if (!(type in this.#widgets) || !isObject(config)) return false

    config.core = this.core

    // create the widget
    const widget = this.#widgets[type].create(this, config)
    this.#widgetsInstances[widget.id] = widget
    return widget
  }

  /**
   * delete a widget from the list
   * @param {string} id 
   * @returns {boolean}
   */
  delete(id) {
    if (!isString(id) || !(id in this.#widgetsInstances)) return false

    const type = this.#widgetsInstances[id].type
    this.#widgets[type].destroy(id)
    return true
  }

}
