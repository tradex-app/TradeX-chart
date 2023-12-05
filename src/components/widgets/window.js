// window.js
// basic window template to be populated with content
// provides: container (window / panel), drag bar, close 

// window.js

import DOM from "../../utils/DOM"
import { CLASS_WINDOWS, CLASS_WINDOW } from "../../definitions/core"
import { WindowStyle } from "../../definitions/style"
import { isArray, isNumber, isObject, isString } from "../../utils/typeChecks"
import { limit } from "../../utils/number"
import Input from "../../input"


class WinState {
  static opened = new WinState("opened")
  static closed = new WinState("closed")

  constructor(name) {
    this.name = name
  }
}


export default class Window {

  #id
  #widgets
  #core
  #config
  #state = WinState.closed
  
  #elWidgetsG
  #elWindows
  #elWindow
  #elDragBar
  #elTitle
  #elCloseIcon
  #elContent

  #pos
  #dims
  #cursorPos
  #controller
  #dragBar
  #dragging = false

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
    const styles = {
      window: {"box-shadow": "rgb(0,0,0) 0px 20px 30px -10px"},
      content: {padding: "1em"},
    }
    config.styles = (isObject(config?.styles)) ? {...styles, ...config.styles} : styles
    config.class = config?.class || "window"
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
  get state() { return this.#state }
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
    this.off("closeWindow", this.onCloseWindow, this)
    this.off("global_resize", this.onGlobalResize, this)

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
    this.on("global_resize", this.onGlobalResize, this)
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

  onGlobalResize(e) {

    // e = {
    //   width: this.width,
    //   height: this.height,
    //   resizeW: w / width,
    //   resizeH: h / height,
    //   resizeWDiff: w - width,
    //   resizeHDiff: h - height
    // }
    // { top: _y, bottom: _y + _h, left: _x, right: _x + _w, width: _w, height: _h, visible: _v, viewport: _vp };

    const dims = this.dimensions
    const data = { 
      position: { x: dims.left, y: dims.top}, 
      dimensions: { w: dims.w, h: dims.h } 
    }
    let right, bottom

    // determine if dimensions need to change
    if (dims.w > e.width)
      data.position.x = e.width
    if (dims.h > e.height)
      data.position.y = e.height
    // determine if position needs to change
    right = dims.left + data.dimensions.w
    bottom = dims.bottom + data.dimensions.h
    if (dims.x < 0)
      data.position.x = 0
    else if (dims.x + data.dimensions.w > e.width)
      data.position.x -= e.width

    this.setProperties(data)
  }

  onOutsideClickListener(e) {
    if (!this.#elWindow.contains(e.target) 
    // && (!this.#config.primary.contains(e.target)) 
    && DOM.isVisible(this.#elWindow)
    && !this.#dragging) {
      let data = {
        target: e.currentTarget.id, 
        window: this.#id,
      };
      this.emit("closeWindow", data)
      document.removeEventListener('click', this.#windowEvents.click)
      delete this.#windowEvents.click
    }
  }

  onCloseWindow(e) {
    if (e.window === this.#id) this.close()
  }

  onWindow(e) {
    e.stopPropagation()
  }

  onDragBar(e) {
    // e.stopPropagation()
    this.#dragging = true

    // let {left: x, top: y} = this.dimensions
    let x = this.#elWindow.offsetLeft + e.movement.x
    let y = this.#elWindow.offsetTop + e.movement.y

    this.position({x,y})
  }

  onDragBarEnd(e) {
    setTimeout(() => {
      this.#dragging = false
    }, 250)
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

    this.#elWindow.addEventListener("click", this.onWindow.bind(this))
    if (DOM.isElement(this.#elDragBar)) {
      this.#dragBar = new Input(this.#elDragBar, {disableContextMenu: false});
      this.#dragBar.on("pointerdrag", this.onDragBar.bind(this))
      this.#dragBar.on("pointerdragend", this.onDragBarEnd.bind(this))
    }

    // set dimensions and position
    const d = this.dimensions
    const w = this.#config?.w || d.w
    const h = this.#config?.h || d.h

    this.setDimensions({w, h})
    this.position()
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
    let windowStyle = `position: absolute; z-index: 100; display: block; border: 1px solid ${WindowStyle.COLOUR_BORDER}; background: ${WindowStyle.COLOUR_BG}; color: ${WindowStyle.COLOUR_TXT}; box-shadow: rgb(0,0,0) 0px 20px 30px -10px;`
    let cfg = this.config?.styles?.window
    for (let k in cfg) {
      windowStyle += `${k}: ${cfg[k]}; `
    }
    let dragBar = (window.dragBar) ? this.dragBar(window) : ''
    let title = (!window.dragBar && window.title) ? this.title(window) : ''
    let content = this.content(window)
    let closeIcon = this.closeIcon(window)
    let node = `
      <div id="${window.id}" class="${CLASS_WINDOW} ${this.#config.class}" style="${windowStyle}">
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

  // build the title
  title(window) {
    const cfg = this.config
    const styles = cfg?.styles?.title
    const title = (isString(cfg?.title)) ? cfg.title : ""
    let titleStyle = `white-space: nowrap; `

    for (let k in styles) {
      titleStyle += `${k}: ${styles[k]}; `
    }
    let node = `
        <div class="title" style="${titleStyle}">${title}</div>
    `
    return node
  }

  closeIcon(window) {
    const cPointer = "cursor: pointer;"
    const over = `onmouseover="this.style.background ='#222'"`
    const out = `onmouseout="this.style.background ='none'"`
    let closeIconStyle = `${cPointer} `
    let cfg = this.config?.styles?.closeIcon
    let titleStyle = ``
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
    let left = Math.round(iPos.left - wPos.left)
    let top  = Math.round(iPos.bottom - wPos.top)
    let px = Math.round((iPos.width - wPos.width) / 2)
    let py = Math.round((iPos.height - wPos.height) / 2) * -1
    let pz = DOM.getStyle(this.#elWindow, "z-index")

    if (isObject(p)) {
      let {x,y,z} = {...p}
      if (isNumber(x)) px = x
      if (isNumber(y)) py = y
      if (isNumber(z)) pz = z
      this.#pos = {x: x, y: y, z: pz}
    }
    
    this.#elWindow.style["z-index"] = `${pz}`

    // keep window visible on chart
    if (this.config?.bounded) {
      // adjust horizontal positioning if clipped
      const width = this.#elWindow.clientWidth
      if (px + width > this.#elWidgetsG.offsetWidth) {
        let o = Math.floor(this.#elWidgetsG.offsetWidth - width)
            o = limit(o, 0, this.#elWidgetsG.offsetWidth)
        // this.#elWindow.style.left = `${o}px`
        px = o
      }
      // adjust vertical position on clipped
      const height = this.#elWindow.clientHeight
      if (py +  iPos.height + height > iPos.height) {
        let o = Math.floor(height * -1)
            o = limit(o, iPos.height * -1, 0)
        // this.#elWindow.style.top = `${o}px`
        py = o
      }
    }
    // if (p?.relativeY == "bottom") py += wPos.height
    this.#elWindow.style.left = `${px}px`
    this.#elWindow.style.top = `${py}px`
  }

  setDimensions(d) {
    if (!isObject(d)) return false
    if (isNumber(d?.w)) this.#elWindow.style.width = `${d.w}px`
    if (isNumber(d?.h)) this.#elWindow.style.height = `${d.h}px`
  }

  setProperties(data) {
    if (!isObject(data)) return false
    if (isString(data?.title)) {
      this.#elTitle.innerHTML = data.title
    }
    if (isString(data?.content)) {
      this.#elContent.innerHTML = data.content
    }

    this.setDimensions({...data?.dimensions})
    this.position({...data?.position})

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
  open(data={}) {
    if (Window.currentActive === this &&
        this.state === WinState.opened) return true

    Window.currentActive = this
    this.#state = WinState.opened
    this.#elWindow.style.display = "block"
    this.#elWindow.style.zindex = "10"
    this.setProperties(data)
    this.emit("window_opened", this.id)

    setTimeout(() => {
      // click event outside of window
      this.#windowEvents.click = this.onOutsideClickListener.bind(this)
      document.addEventListener('click', this.#windowEvents.click)
    }, data?.offFocus || 250)
  }

  // hide the window
  close() {
    Window.currentActive = null
    this.#state = WinState.closed
    this.#elWindow.style.display = "none"
    this.emit("window_closed", this.id)
  }
}
