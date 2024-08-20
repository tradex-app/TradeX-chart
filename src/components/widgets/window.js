// window.js
// basic window template to be populated with content
// provides: container (window / panel), drag bar, close 

// window.js

import { elementDimPos, getStyle, isElement, isVisible,  } from "../../utils/DOM"
import { CLASS_WINDOWS, CLASS_WINDOW } from "../../definitions/core"
import { WindowStyle } from "../../definitions/style"
import { isArray, isFunction, isNumber, isObject, isString } from "../../utils/typeChecks"
import { debounce, uid } from "../../utils/utilities"
import { limit } from "../../utils/number"
import Input from "../../input"

export class WinState {
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
  #parent
  
  #elWidgetsG
  #elWindows
  #elWindow
  #elDragBar
  #elTitle
  #elCloseIcon
  #elContent
  #elColourPicker

  #pos = {}
  #dims
  #cursorPos
  #controller
  #dragBar
  #dragging = false

  #windowEvents = {}

  #title = ""
  #content = ""
  #contentFields = {}
  #params = {}

  static windowList = {}
  static windowCnt = 0
  static class = CLASS_WINDOWS
  static Name = "Windows"
  static type = "window"
  static currentActive = null
  static stylesInstalled = false
  static defaultStyles = `
  /** default Window widget styles */

  .tradeXwindow {
    border: 1px solid ${WindowStyle.COLOUR_BORDER};
    border-radius: 5px;
    box-shadow: ${WindowStyle.SHADOW};
    background: ${WindowStyle.COLOUR_BG};
    color: ${WindowStyle.COLOUR_TXT};
  }

  .tradeXwindow .dragBar {
    cursor: grab;
  }

  .tradeXwindow .dragBar:hover {
    background: #222;
  }

  .tradeXwindow .dragBar .title {
    ${WindowStyle.TITLE}
  }

  .tradeXwindow .content {
    ${WindowStyle.CONTENT}
  }
 
  `

  static create(widgets, config) {

    config.id = config?.id || uid("window")
    config.id = `${config.id}_${++Window.windowCnt}`
    config.type = config?.type || Window.type
    config.class = config?.class || "window"
    // add entry
    Window.windowList[config.id] = new Window(widgets, config)

    return Window.windowList[config.id]
  }

  static destroy(id) {
    if (!(id in Window.windowList)) return 

    Window.windowList[id].destroy()
    // remove entry
    delete Window.windowList[id]
  }

  static defaultNode() {
    const windowStyle = ``
    const node = `
      <div slot="widget" class="${CLASS_WINDOWS}" style="${windowStyle}"></div>
    `
    return node
  }

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#core = config.core || config.parent.core
    this.#config = config
    this.#id = config.id
    this.#parent = config.parent
    this.#elWindows = widgets.elements[config.type]
    this.#elWidgetsG = this.#core.elWidgetsG
    // insert element
    const rootElement = widgets.elements[config.type]
    this.mount(rootElement)
  }

  destroy() {
    // remove event listners
    this.#core.hub.expunge()

    // remove element
    this.el.remove()
  }

  get id() { return this.#id }
  get pos() { return this.dimensions }
  get core() { return this.#core }
  get parent() { return this.#parent }
  get config() { return this.#config }
  set config(c) { this.#config = c }
  get theme() { return this.#core.theme }
  get state() { return this.#state }
  get dimensions() { return elementDimPos(this.#elWindow) }
  set dimensions(d) { this.setDimensions(d) }
  get type() { return Window.type }
  get el() { return this.#elWindow }
  get elDragBar() { return this.#elDragBar }
  get elTitle() { return this.#elTitle }
  get elCloseIcon() { return this.#elCloseIcon }
  get elContent() { return this.#elContent }
  get elColourPicker() { return this.#elColourPicker }
  get title() { return this.#title }
  set title(t) { this.setTitle(t) }
  get content() { return this.#content }
  set content(c) { this.setContent(c) }
  get contentFields() { return this.#contentFields }
  set params(p) { if (isObject(p)) this.#params = {...this.#params, ...p} }
  get params() { return this.#params }

  /**
   * set window title
   * @param {string} t 
   * @returns {string|boolean}
   */
  setTitle(t) {
    if (!isString(t)) return false

    this.#config.title = t
    this.#elTitle.innerHTML = t
    return this.#elTitle
  }

  /**
   * set window content
   * @param {string} c - html content
   * @param {object} [m={}] - keys represent selector queries, entries are functions to execute upon matching elements
   * @returns {HTMLElement|boolean}
   */
  setContent(c, m={}) {
    if (!isString(c) ||
        !isObject(m)) return false

    // insert the HTML into DOM
    this.#config.content = c
    this.#elContent.innerHTML = c

    // execute functions on the content
    for (let mod in m) {
      if (!isFunction(m[mod])) continue

      m[mod](this.#elContent)
    }

    this.#contentFields = this.allContentFields()

    return this.#elContent
  }

  start() {
    // set up event listeners
    this.eventsListen()
    // set to close unless otherwise specified
    if (this.#config?.openNow !== true) this.setClose()
  }

  eventsListen() {
    // add event listener to dragbar
    // const windowItems = findBySelectorAll(`#${api.id} #${this.#config.id} li`)
    // windowItems.forEach((item) => {
    //   item.addEventListener('click', this.onWindowSelect.bind(this))
    // })

    this.on(`window_close_${this.parent.id}`, this.onCloseWindow, this)
    this.on("global_resize", this.onGlobalResize, this)
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
        && isVisible(this.#elWindow)
        && !this.#dragging) 
    {
      let data = {
        target: e.currentTarget.id, 
        window: this.#id,
      };
      this.emit("window_close", data)
      this.emit(`window_close_${this.parent.id}`, data)
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
    this.#contentFields = this.allContentFields()
    this.#elWindow.addEventListener("click", this.onWindow.bind(this))
    if (isElement(this.#elDragBar)) {
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

  windowNode() {
    const window = this.#config
    let windowStyle = `position: absolute; z-index: 100; display: block;`
    let dragBar = (window.dragBar) ? this.dragBar() : ''
    let title = (!window.dragBar && window.title) ? this.titleNode() : ''
    let content = this.contentNode()
    let closeIcon = this.closeIcon()
    let node = `
      <!-- ${this.constructor.type} ${this.parent.id} -->
      <div id="${window.id}" class="${CLASS_WINDOW} ${window.class}" style="${windowStyle}">
          ${dragBar}
          ${title}
          ${closeIcon}
          ${content}
        </div>
      </div>
    `
    return node
  }

  contentNode() {
    const window = this.#config
    let contentStyle = ``
    let content = (window?.content)? window.content : ''
    let node = `
      <div class="content" style="${contentStyle}">
        ${content}
      </div>
    `
    return node
  }

  // get your drag on
  dragBar() {
    const window = this.#config
    const cPointer = "cursor: grab;"
    const over = `onmouseover="this.style.background ='#222'"`
    const out = `onmouseout="this.style.background ='none'"`
    let dragBarStyle = `${cPointer} `
    let node = ``
    if (window.dragBar) node +=
    `
    <div class="dragBar" style="${dragBarStyle}" ${over} ${out}>
        ${this.titleNode()}
      </div>
    `
    return node
  }

  // build the title
  titleNode() {
    const cfg = this.config
    const title = (isString(cfg?.title)) ? cfg.title : ""
    let node = `
        <div class="title">${title}</div>
    `
    return node
  }

  closeIcon() {
    const cPointer = "cursor: pointer;"
    const over = `onmouseover="this.style.background ='#222'"`
    const out = `onmouseout="this.style.background ='none'"`
    let closeIconStyle = `${cPointer} `
    let cfg = this.#config?.styles?.closeIcon
    let node = ``
    if (window.closeIcon) node +=
    `
      <div class="closeIcon" style="${closeIconStyle}" ${over} ${out}>
        <span>X</span>
      </div>
    `
    return node
  }

  allContentFields() {
    const fields = {}
    const c = this.#elContent

    fields.input = c.querySelectorAll("input")
    fields.select = c.querySelectorAll("select")
    fields.textarea = c.querySelectorAll("textarea")
    fields.button = c.querySelectorAll("button")

    return fields
  }

  position(p) {

    let rebound = 0.1
    let wPos = this.dimensions
    let iPos = this.#core.dimensions
    let left = Math.round(iPos.left - wPos.left)
    let top  = Math.round(iPos.bottom - wPos.top)
    let px = (this.#pos?.iPos?.width !== iPos.width || !!this.#pos.x100) ?
      wPos.width * this.#pos.x100 :
      Math.round((iPos.width - wPos.width) / 2)
    let py = (this.#pos?.iPos?.height !== iPos.height || !!this.#pos.y100) ?
      wPos.height * this.#pos.y100 :
      Math.round((iPos.height + wPos.height) / -2)
    let pz = getStyle(this.#elWindow, "z-index")

    if (isObject(p)) {
      let {x,y,z} = {...p}
      if (isNumber(x)) px = x
      if (isNumber(y)) py = y
      if (isNumber(z)) pz = z
      this.#pos = {x: x, y: y, z: pz}
    }
    
    this.#elWindow.style["z-index"] = `${pz}`

    // keep window visible on chart
    
    // adjust horizontal positioning if clipped
    const width = this.#elWindow.clientWidth
    if (px + (width * rebound) > this.#elWidgetsG.offsetWidth) {
      px = this.#elWidgetsG.offsetWidth -( width * rebound)
    }
    else if(px < (width - (width * rebound)) * -1) {
      px = (width - (width * rebound)) * -1
    }
    // adjust vertical position on clipped
    const height = this.#elWindow.clientHeight
    if (py < iPos.height * -1) {
      py = iPos.height * -1
    }
    else if(py > height * rebound * -1) {
      py = height * rebound * -1
    }
    
    px = Math.floor(px)
    py = Math.floor(py)
    // if (p?.relativeY == "bottom") py += wPos.height
    this.#elWindow.style.left = `${px}px`
    this.#elWindow.style.top = `${py}px`

    const x100 = px / wPos.width
    const y100 = py / wPos.height
    this.#pos = {
      px, py,
      x100, y100,
      iPos
    }
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

  setOpen() {
    Window.currentActive = this
    this.#state = WinState.opened
    this.#elWindow.style.display = "block"
    this.#elWindow.style.zindex = "10"
    this.#elWindow.classList.add('active')
  }

  setClose() {
    Window.currentActive = null
    this.#state = WinState.closed
    this.#elWindow.style.display = "none"
    this.#elWindow.classList.remove('active')
    document.removeEventListener('click', this.#windowEvents.click)
  }

  remove() {
    return Window.destroy(this.id)
  }

  /**
   * display the window
   * @param {object} [data={}] - {title, content, dimensions, position, styles, params, offFocus}
   */
  open(data={}) {

    if (Window.currentActive === this &&
        this.state === WinState.opened) return true
    // pass in arbitrary data for child classes to use
    if (isObject(data.params))
      this.params = data.params

    this.setOpen()
    this.setProperties(data)
    this.emit("window_opened", this.id)
    this.emit(`window_opened_${this.parent.id}`, this.id)

    setTimeout(() => {
      // click event outside of window
      this.#windowEvents.click = this.onOutsideClickListener.bind(this)
      document.addEventListener('click', this.#windowEvents.click)

      if (!!this.#elColourPicker) {
        // click event outside of window
        // setTimeout(() => {
        //   // this.#elWindow.addEventListener('click', this.#elColourPicker.onOutsideClickListener.bind(this.#elColourPicker))
        //   this.#elWindow.addEventListener('click', debounce(this.#elColourPicker.onOutsideClickListener, 250, this.#elColourPicker, true))

        // }, 250)
      }
    }, 1000)

    return true
  }

  // hide the window
  close() {
    if (this.#state !== WinState.closed) {
      this.setClose()
      this.emit("window_closed", this.id)
      this.emit(`window_closed_${this.parent.id}`, this.id)
    }
    return true
  }
}
