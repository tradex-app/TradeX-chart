// menu.js

import DOM from "../../utils/DOM"
import { CLASS_MENUS, CLASS_MENU } from "../../definitions/core"
import { MenuStyle } from "../../definitions/style"
import { limit } from "../../utils/number"

const MENUMINWIDTH = 150

export default class Menu {

  #id
  #widgets
  #core
  #config
  
  #elWidgetsG
  #elMenus
  #elMenu

  #cursorPos
  #controller

  #menuEvents = {}

  static menuList = {}
  static menuCnt = 0
  static class = CLASS_MENUS
  static name = "Menus"
  static type = "Menu"
  static currentActive

  static create(widgets, config) {

    const id = `menu_${++Menu.menuCnt}`
    config.id = id

    // add entry
    Menu.menuList[id] = new Menu(widgets, config)

    return Menu.menuList[id]
  }

  static destroy(id) {
    Menu.menuList[id].end()

    // remove entry
    delete Menu.menuList[id]
  }

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#core = config.core
    this.#config = config
    this.#id = config.id
    this.#elMenus = widgets.elements.elMenus
    this.#elWidgetsG = this.#core.elWidgetsG
    this.init()
  }

  get el() { return this.#elMenu }
  get id() { return this.#id }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elMenu) }
  get type() { return Menu.type }

  init() {
    // insert element
    this.mount(this.#elMenus)
  }

  start() {
    // position menus next to primary (icon)
    this.position()
    // set up event listeners
    this.eventsListen()
  }

  end() {
    // remove event listners
    const menuItems = this.#elMenus.querySelectorAll(`#${this.id} li`)
    menuItems.forEach((item) => {
      item.removeEventListener('click', this.#menuEvents[this.id][item.id])
    })

    document.removeEventListener('click', this.#menuEvents[this.id].outside)
    
    this.off("global_resize", this.onResize)
    // remove element
    // this.el.remove()
  }

  eventsListen() {
    const menuItems = this.#elMenus.querySelectorAll(`#${this.id} li`)
    this.#menuEvents[this.id] = {}
    menuItems.forEach((item) => {
      this.#menuEvents[this.id][item.id] = this.onMenuSelect.bind(this)
      item.addEventListener('click', this.#menuEvents[this.id][item.id])
    })
    this.on("global_resize", this.onResize, this)
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

  onMenuSelect(e) {
    let evt = e.currentTarget.dataset.event,
        data = {
          target: e.currentTarget.id, 
          menu: this.#id,
          evt: evt
        };

    this.emit("menuItem_selected", data)
    this.emit("menu_close", data)
    console.log("menu_close")
  }

  onOutsideClickListener(e) {
    if (!this.#elMenu.contains(e.target) 
    && (!this.#config.primary.contains(e.target)) 
    && DOM.isVisible(this.#elMenu)) {
      let data = {
        target: e.currentTarget.id, 
        menu: this.#id,
      };
      this.emit("menu_close", data)
    }
    document.removeEventListener('click', this.#menuEvents[this.id].outside)
  }

  onResize() {
    this.position()
  }

  mount(el) {
    if (el.lastElementChild == null) 
      el.innerHTML = this.menuNode()
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.menuNode())

    this.#elMenu = this.#elMenus.querySelector(`#${this.id}`)
  }

  static defaultNode() {
    const menuStyle = ``
    const node = `
      <div slot="widget" class="${CLASS_MENUS}" style="${menuStyle}"></div>
    `
    return node
  }

  menuNode() {
    const menu = this.#config
    const menuStyle = `position: absolute; z-index: 1000; display: none; border: 1px solid ${MenuStyle.COLOUR_BORDER}; background: ${MenuStyle.COLOUR_BG}; color: ${MenuStyle.COLOUR_TXT};`

    let content = this.content(menu)
    let node = `
      <div id="${menu.id}" class="${CLASS_MENU}" style="${menuStyle}">
        ${content}
      </div>
    `
    return node
  }

  content(menu) {
    const listStyle = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${MENUMINWIDTH}px`
    const itemStyle = "padding: .25em 1em .25em 1em; white-space: nowrap;"
    const shortStyle = "display: inline-block; width: 4em;"
    const cPointer = "cursor: pointer;"
    const over = `onmouseover="this.style.background ='#222'"`
    const out = `onmouseout="this.style.background ='none'"`

    let content = `<ul style="${listStyle}">`
    if (menu?.content) {
      for (let i of menu.content) {
        content += `<li id="${i.id}" data-event="${i.event}" style="${itemStyle} ${cPointer}" ${over} ${out}><a style="${cPointer}"><span style="${shortStyle}">${i.id}</span><span>${i.name}</span></li></a>`
      }
    }
    content += "</ul>"
    return content
  }

  position() {
    let wPos = this.#elWidgetsG.getBoundingClientRect()
    let iPos = this.#config.primary.getBoundingClientRect()
    let left = Math.round(iPos.left - wPos.left)
    let top  = Math.round(iPos.bottom - wPos.top)

    this.#elMenu.style.left = left + "px"
    this.#elMenu.style.top = top + "px"

    // adjust positioning if clipped
    let pos = DOM.elementDimPos(this.#elMenu)
    // adjust horizontal positioning if clipped
    if (pos.right > this.#elWidgetsG.offsetWidth) {
      let o = Math.floor(this.#elWidgetsG.offsetWidth - pos.width)
          o = limit(o, 0, this.#elWidgetsG.offsetWidth)
      this.#elMenu.style.left = `${o}px`
    }
    // adjust vertical position on clipped
    let bottom = this.#core.MainPane.rowsH + top + pos.height

    if (bottom > this.#core.MainPane.rowsH) {
      let o = Math.floor(pos.height * -1)
          o = limit(o, this.#core.MainPane.rowsH * -1, 0)
      this.#elMenu.style.top = `${o}px`
    }
    // TODO: adjust width if clipped
    // TODO: adjust height if clipped
  }

  remove() {

  }

  // display the menu
  open() {
    if (Menu.currentActive === this) return true

    Menu.currentActive = this
    this.#elMenu.style.display = "block"
    this.position()

    setTimeout(() => {
      // click event outside of menu
      this.#menuEvents[this.id].outside = this.onOutsideClickListener.bind(this)
      document.addEventListener('click', this.#menuEvents[this.id].outside)
    }, 250)
  }

  // hide the menu
  close() {
    Menu.currentActive = null
    this.#elMenu.style.display = "none"
    this.emit("menuClosed", this.id)
  }
}