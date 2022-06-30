// window.js
// basic window template to be populated with content
// provides: container (window / panel), drag bar, close 

// window.js

import DOM from "../../utils/DOM"
import { CLASS_WINDOWS, CLASS_WINDOW } from "../../definitions/core"
import { WindowStyle } from "../../definitions/style"

export default class Window {

  #id
  #widgets
  #mediator
  #core
  #config
  
  #elWidgetsG
  #elWindows
  #elWindow

  #cursorPos
  #controller

  static windowList = {}
  static windowCnt = 0
  static class = CLASS_WINDOWS
  static name = "Windows"
  static currentActive

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#mediator = config.mediator
    this.#core = this.#mediator.api.core
    this.#config = config
    this.#id = config.id
    this.#elWindows = widgets.elements.elWindows
    this.#elWidgetsG = this.#core.elWidgetsG
    this.init()
  }

  static create(widgets, config) {

    const id = `window${++Window.windowCnt}`
    config.id = id

    // add entry
    Window.windowList[id] = new Window(widgets, config)

    return Window.windowList[id]
  }

  static destroy(id) {
    Window.windowList[id].end()

    // remove entry
    delete Window.windowList[id]
  }

  get el() { return this.#elWindow }
  get id() { return this.#id }
  get pos() { return this.dimensions }
  get config() { return this.#config }
  set config(c) { this.#config = c }
  get dimensions() { return DOM.elementDimPos(this.#elWindow) }

  init() {
    // insert element
    this.mount(this.#elWindows)
  }

  start() {
    // position windows next to primary (icon)
    this.position(this.#config.primary)
    // set up event listeners
    this.eventsListen()
  }

  end() {
    // remove event listners
    document.removeEventListener('click', this.onOutsideClickListener)
    // remove element
    // this.el.remove()
  }

  eventsListen() {
    const api = this.#mediator.api
    const windowItems = DOM.findBySelectorAll(`#${api.id} #${this.#config.id} li`)
    windowItems.forEach((item) => {
      item.addEventListener('click', this.onWindowSelect.bind(this))
    })

    // click event outside of window
    document.addEventListener('click', this.onOutsideClickListener.bind(this))
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

  // onWindowSelect(e) {
  //   let evt = e.currentTarget.dataset.event,
  //       data = {
  //         target: e.currentTarget.id, 
  //         window: this.#id,
  //         evt: evt
  //       };
        
  //   this.emit(evt, data)
  //   this.emit("windowItemSelected", data)
  //   this.emit("closeWindow", data)
  // }

  onOutsideClickListener(e) {
    if (!this.#elWindow.contains(e.target) 
    && (!this.#config.primary.contains(e.target)) 
    && DOM.isVisible(this.#elWindow)) {
      let data = {
        target: e.currentTarget.id, 
        window: this.#id,
      };
      this.emit("closeWindow", data)
    }
  }

  mount(el) {
    const api = this.#mediator.api

    if (el.lastElementChild == null) 
      el.innerHTML = this.windowNode()
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.windowNode())

    this.#elWindow = DOM.findBySelector(`#${api.id} #${this.#config.id}`)
  }

  static defaultNode() {
    const windowStyle = ``
    const node = `
      <div class="${CLASS_WINDOWS}" style="${windowStyle}"></div>
    `
    return node
  }

  windowNode() {
    const window = this.#config
    const windowStyle = `position: absolute; z-index: 1000; display: none; border: 1px solid ${WindowStyle.COLOUR_BORDER}; background: ${WindowStyle.COLOUR_BG}; color: ${WindowStyle.COLOUR_TXT};`

    let dragBar = this.dragBar(window)
    let content = this.content(window)
    let closeIcon = this.closeIcon(window)
    let node = `
      <div id="${window.id}" class="${CLASS_WINDOW}" style="${windowStyle}">
          ${dragBar}
          ${closeIcon}
          ${content}
        </div>
      </div>
    `
    return node
  }

  content(window) {
    let content = (window?.content)? window.content : ''
    let node = `
      <div class="content">
        ${content}
      </div>
    `
    return node
  }

  // get your drag on
  dragBar(window) {
    const api = this.#mediator.api
    const cPointer = "cursor: grab;"
    const over = `onmouseover="this.style.background ='#222'"`
    const out = `onmouseout="this.style.background ='none'"`
    const dragBarStyle = `${cPointer}`

    let node = ``
    if (window.dragBar) node +=
    `
      <div class="dragBar" ${dragBarStyle} ${over} ${out}>
      </div>
    `
    return node
  }

  closeIcon(window) {
    const api = this.#mediator.api
    const cPointer = "cursor: pointer;"
    const over = `onmouseover="this.style.background ='#222'"`
    const out = `onmouseout="this.style.background ='none'"`
    const closeIconStyle = `${cPointer}`

    let node = ``
    if (window.closeIcon) node +=
    `
      <div class="closeIcon" ${closeIconStyle} ${over} ${out}>
        <span>X</span>
      </div>
    `
    return node
  }

  position(target) {
    let wPos = this.#elWidgetsG.getBoundingClientRect()
    let iPos = target.getBoundingClientRect()

    this.#elWindow.style.left = Math.round(iPos.left - wPos.left) + "px"
    this.#elWindow.style.top = Math.round(iPos.bottom - wPos.top) + "px"
  }

  remove() {

  }

  // display the window
  open() {
    let id = Window.currentActive?.id || false
    if (id) this.emit("closeWindow", {window: id})

    Window.currentActive = this
    this.#elWindow.style.display = "block"
  }

  // hide the window
  close() {
    Window.currentActive = null
    this.#elWindow.style.display = "none"
    this.emit("windowClosed", this.id)
  }
}
