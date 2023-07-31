// window.js
// basic window template to be populated with content
// provides: container (window / panel), drag bar, close 

// window.js

import DOM from "../../utils/DOM"
import { CLASS_WINDOWS, CLASS_WINDOW } from "../../definitions/core"
import { WindowStyle } from "../../definitions/style"
import { decimalPlaces } from "../../utils/number"
import { isArray, isNumber, isObject, isString } from "../../utils/typeChecks"

export default class Window {

  #id
  #widgets
  #core
  #config
  
  #elWidgetsG
  #elWindows
  #elWindow
  #elDragBar
  #elTitle
  #elCloseIcon
  #elContent

  #cursorPos
  #controller

  #windowEvents = {}

  static windowList = {}
  static windowCnt = 0
  static class = CLASS_WINDOWS
  static name = "Windows"
  static type = "Window"
  static currentActive = null

  static create(widgets, config) {

    const id = `window_${++Window.windowCnt}`
    config.id = id

    // add entry
    Window.windowList[id] = new Window(widgets, config)

    return Window.windowList[id]
  }

  static destroy(id) {
    Window.windowList[id].destroy()

    // remove entry
    delete Window.windowList[id]
  }

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#core = config.core
    this.#config = config
    this.#id = config.id
    this.#elWindows = widgets.elements.elWindows
    this.#elWidgetsG = this.#core.elWidgetsG
    this.init()
  }

  get id() { return this.#id }
  get pos() { return this.dimensions }
  get config() { return this.#config }
  set config(c) { this.#config = c }
  get dimensions() { return DOM.elementDimPos(this.#elWindow) }
  set dimensions(d) { this.setDimensions(d) }
  get type() { return Window.type }
  get el() { return this.#elWindow }
  get elDragBar() { return this.#elDragBar }
  get elTitle() { return this.#elTitle }
  get elCloseIcon() { return this.#elCloseIcon }
  get elContent() { return this.#elContent }

  init() {
    // insert element
    this.mount(this.#elWindows)
  }

  start() {
    // set up event listeners
    this.eventsListen()
    this.close()
  }

  destroy() {
    // remove event listners
    // document.removeEventListener('click', this.onOutsideClickListener)
    this.off("closeWindow", this.onCloseWindow)

    // remove element
    this.el.remove()
  }

  eventsListen() {
    // add event listener to dragbar
    // const windowItems = DOM.findBySelectorAll(`#${api.id} #${this.#config.id} li`)
    // windowItems.forEach((item) => {
    //   item.addEventListener('click', this.onWindowSelect.bind(this))
    // })

    this.on("closeWindow", this.onCloseWindow, this)
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

  onCloseWindow(e) {
    if (e.window === this.#id) this.close()
  }

  mount(el) {
    if (el.lastElementChild == null) 
      el.innerHTML = this.windowNode()
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.windowNode())

    this.#elWindow = this.#elWindows.querySelector(`#${this.#config.id}`)
    this.#elDragBar = this.#elWindow.querySelector(".dragBar")
    this.#elTitle = this.#elWindow.querySelector(".title")
    this.#elCloseIcon = this.#elWindow.querySelector(".closeIcon")
    this.#elContent = this.#elWindow.querySelector(".content")
    
    let x, y;
    if (isObject(this.#config.position)) {
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
    let windowStyle = `position: absolute; z-index: 10; display: block; border: 1px solid ${WindowStyle.COLOUR_BORDER}; background: ${WindowStyle.COLOUR_BG}; color: ${WindowStyle.COLOUR_TXT};`
    let cfg = this.config?.styles?.window
    for (let k in cfg) {
      windowStyle += `${k}: ${cfg[k]}; `
    }
    let dragBar = (window.dragBar) ? this.dragBar(window) : ''
    let title = (!window.dragBar && window.title) ? this.title(window) : ''
    let content = this.content(window)
    let closeIcon = this.closeIcon(window)
    let node = `
      <div id="${window.id}" class="${CLASS_WINDOW}" style="${windowStyle}">
          ${dragBar}
          ${title}
          ${closeIcon}
          ${content}
        </div>
      </div>
    `
    return node
  }

  content(window) {
    let cfg = this.config?.styles?.content
    let contentStyle = ``
    for (let k in cfg) {
      contentStyle += `${k}: ${cfg[k]}; `
    }

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
    let dragBarStyle = `${cPointer} `
    let cfg = this.config?.styles?.dragBar
    for (let k in cfg) {
      dragBarStyle += `${k}: ${cfg[k]}; `
    }

    let node = ``
    if (window.dragBar) node +=
    `
      <div class="dragBar" style="${dragBarStyle}" ${over} ${out}>
        ${this.title(window)}
      </div>
    `
    return node
  }

    // get your drag on
    title(window) {
      const titleStyle = ``
      let cfg = this.config?.styles?.title
      for (let k in cfg) {
        titleStyle += `${k}: ${cfg[k]}; `
      }
      let node = `
          <div class="title" style="${titleStyle}"></div>
      `
      return node
    }

  closeIcon(window) {
    const cPointer = "cursor: pointer;"
    const over = `onmouseover="this.style.background ='#222'"`
    const out = `onmouseout="this.style.background ='none'"`
    let closeIconStyle = `${cPointer} `
    let cfg = this.config?.styles?.closeIcon
    for (let k in cfg) {
      titleStyle += `${k}: ${cfg[k]}; `
    }
    let node = ``
    if (window.closeIcon) node +=
    `
      <div class="closeIcon" style="${closeIconStyle}" ${over} ${out}>
        <span>X</span>
      </div>
    `
    return node
  }

  position(p) {
    let wPos = this.dimensions
    let iPos = this.#core.dimensions
    let px = Math.round((iPos.width - wPos.width) / 2)
    let py = iPos.height - Math.round((iPos.height - wPos.height) / 2)
    let pz = DOM.getStyle(this.#elWindow, "z-index")

    if (isObject(p)) {
      let {x,y,z} = {...p}
      if (isNumber(x)) px = x
      if (isNumber(y)) py = iPos.height - (y + wPos.height)
      if (isNumber(z)) pz = z
    }
    this.#elWindow.style.left = `${px}px`
    this.#elWindow.style.bottom = `${py}px`
    this.#elWindow.style["z-index"] = `${pz}`
  }

  setDimensions(d) {
    if (isNumber(d.x)) this.#elWindow.style.width = `${d.x}px`
    if (isNumber(d.y)) this.#elWindow.style.width = `${d.y}px`
  }

  setProperties(data) {
    if (!isObject(data)) return false
    if (isString(data?.title)) {
      this.#elTitle.innerHTML = data.title
    }
    if (isString(data?.content)) {
      this.#elContent.innerHTML = data.content
    }

    this.setDimensions(data?.dimensions)
    this.position(data?.position)

    if (isObject(data?.styles)) {

      const styleIt = (k, s) => {
        if (!isObject(s)) return false
        const el = "el" + k.charAt(0).toUpperCase() + k.slice(1);
        if (isObject(this[el])) {
          for (let p in s) {
            this[el].style.p = s[p]
          }
        }
      }
      for (let k of Object.keys(data.styles)) {
        styleIt(k, data.styles[k])
      }
    }
    return data
  }

  remove() {
    return Window.destroy(this.id)
  }

  // display the window
  open(data) {
    if (Window.currentActive === this) return true
    Window.currentActive = this
    this.#elWindow.style.display = "block"
    this.#elWindow.style.zindex = "10"
    this.setProperties(data)
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
