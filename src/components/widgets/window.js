// window.js
// basic window template to be populated with content
// provides: container (window / panel), drag bar, close 

// window.js

import DOM from "../../utils/DOM"
import { CLASS_WINDOWS, CLASS_WINDOW } from "../../definitions/core"
import { WindowStyle } from "../../definitions/style"
import { decimalPlaces } from "../../utils/number"

export default class Window {

  #id
  #widgets
  #core
  #config
  
  #elWidgetsG
  #elWindows
  #elWindow

  #cursorPos
  #controller

  #windowEvents = {}

  static windowList = {}
  static windowCnt = 0
  static class = CLASS_WINDOWS
  static name = "Windows"
  static type = "window"
  static currentActive = null

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#core = config.core
    this.#config = config
    this.#id = config.id
    this.#elWindows = widgets.elements.elWindows
    this.#elWidgetsG = this.#core.elWidgetsG
    this.init()
  }

  static create(widgets, config) {

    const id = `window_${++Window.windowCnt}`
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
    // set up event listeners
    this.eventsListen()
    this.open()
  }

  destroy() {
    // remove event listners
    document.removeEventListener('click', this.onOutsideClickListener)
    // remove element
    // this.el.remove()
  }

  eventsListen() {
    const api = this.#core
    // add event listener to dragbar
    // const windowItems = DOM.findBySelectorAll(`#${api.id} #${this.#config.id} li`)
    // windowItems.forEach((item) => {
    //   item.addEventListener('click', this.onWindowSelect.bind(this))
    // })

    this.on("closeWindow", (e) => { 
      if (e.window === this.#id) this.close()
     })
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
    // && (!this.#config.primary.contains(e.target)) 
    && DOM.isVisible(this.#elWindow)) {
      let data = {
        target: e.currentTarget.id, 
        window: this.#id,
      };
      this.emit("closeWindow", data)
      document.removeEventListener('click', this.#windowEvents.click)
    }
  }

  mount(el) {
    const api = this.#core

    if (el.lastElementChild == null) 
      el.innerHTML = this.windowNode()
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.windowNode())

    this.#elWindow = this.#elWindows.querySelector(`#${this.#config.id}`)
    
    let x, y;
    if (this.#config.x && this.#config.y) {
      x = this.#config.x
      y = this.#config.y
    }
    // if x,y position not provided calculate default
    else {
      let dims = DOM.elementDimPos(this.#elWindow)
      x = (this.#core.width - dims.width) / 2
      y = (this.#core.height - dims.height) / 2
    }
  
    this.#elWindow.style.bottom = `${y}px`
    this.#elWindow.style.left = `${x}px`
  }

  static defaultNode() {
    const windowStyle = ``
    const node = `
      <div slot="widget" class="${CLASS_WINDOWS}" style="${windowStyle}"></div>
    `
    return node
  }

  windowNode() {
    const window = this.#config
    const windowStyle = `position: absolute; z-index: 1000; display: block; border: 1px solid ${WindowStyle.COLOUR_BORDER}; background: ${WindowStyle.COLOUR_BG}; color: ${WindowStyle.COLOUR_TXT};`

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
    const contentStyle = "padding: 2em;"

    let content = (window?.content)? window.content : ''
    let node = `
      <div class="content" style="${contentStyle}">
        ${content}
      </div>
    `
    return node
  }

  // get your drag on
  dragBar(window) {
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
    if (Window.currentActive === this) return true

    Window.currentActive = this
    this.#elWindow.style.display = "block"
    this.emit("window_opened", this.id)

    setTimeout(() => {
      // click event outside of window
      this.#windowEvents.click = this.onOutsideClickListener.bind(this)
      document.addEventListener('click', this.#windowEvents.click)
    }, 250)
  }

  // hide the window
  close() {
    Window.currentActive = null
    this.#elWindow.style.display = "none"
    this.emit("window_closed", this.id)
  }
}
