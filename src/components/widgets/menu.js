// menu.js

import DOM from "../../utils/DOM"
import { CLASS_MENUS, CLASS_MENU } from "../../definitions/core"
import { MenuStyle } from "../../definitions/style"

export default class Menu {

  #id
  #widgets
  #mediator
  #core
  #config
  
  #elWidgetsG
  #elMenus
  #elMenu

  #cursorPos
  #controller

  static menuList = {}
  static menuCnt = 0
  static class = CLASS_MENUS
  static name = "Menus"
  static type = "menu"
  static currentActive

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#mediator = config.mediator
    this.#core = this.#mediator.api.core
    this.#config = config
    this.#id = config.id
    this.#elMenus = widgets.elements.elMenus
    this.#elWidgetsG = this.#core.elWidgetsG
    this.init()
  }

  static create(widgets, config) {

    const id = `menu${++Menu.menuCnt}`
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

  get el() { return this.#elMenu }
  get id() { return this.#id }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elMenu) }

  init() {
    // insert element
    this.mount(this.#elMenus)
  }

  start() {
    // position menus next to primary (icon)
    this.position(this.#config.primary)
    // set up event listeners
    this.eventsListen()
  }

  end() {
    // remove event listners
    const api = this.#mediator.api
    const menuItems = DOM.findBySelectorAll(`#${api.id} .${CLASS_MENU} li`)
    menuItems.forEach((item) => {
      item.removeEventListener('click', this.onMenuSelect)
    })

    document.removeEventListener('click', this.onOutsideClickListener)
    // remove element
    // this.el.remove()
  }

  eventsListen() {
    const api = this.#mediator.api
    const menuItems = DOM.findBySelectorAll(`#${api.id} #${this.#config.id} li`)
    menuItems.forEach((item) => {
      item.addEventListener('click', this.onMenuSelect.bind(this))
    })

    // click event outside of menu
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

  onMenuSelect(e) {
    let evt = e.currentTarget.dataset.event,
        data = {
          target: e.currentTarget.id, 
          menu: this.#id,
          evt: evt
        };
        
    this.emit("menuItemSelected", data)
    this.emit("closeMenu", data)
  }

  onOutsideClickListener(e) {
    if (!this.#elMenu.contains(e.target) 
    && (!this.#config.primary.contains(e.target)) 
    && DOM.isVisible(this.#elMenu)) {
      let data = {
        target: e.currentTarget.id, 
        menu: this.#id,
      };
      this.emit("closeMenu", data)
    }
  }

  mount(el) {
    const api = this.#mediator.api

    if (el.lastElementChild == null) 
      el.innerHTML = this.menuNode()
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.menuNode())

    this.#elMenu = DOM.findBySelector(`#${api.id} #${this.#config.id}`)
  }

  static defaultNode() {
    const menuStyle = ``
    const node = `
      <div class="${CLASS_MENUS}" style="${menuStyle}"></div>
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
    const api = this.#mediator.api
    const listStyle = "list-style: none; text-align: left; margin:1em 1em 1em -2.5em;"
    const itemStyle = "padding: .25em 1em .25em 1em;"
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

  position(target) {
    let wPos = this.#elWidgetsG.getBoundingClientRect()
    let iPos = target.getBoundingClientRect()

    this.#elMenu.style.left = Math.round(iPos.left - wPos.left) + "px"
    this.#elMenu.style.top = Math.round(iPos.bottom - wPos.top) + "px"
  }

  remove() {

  }

  // display the menu
  open() {
    let id = Menu.currentActive?.id || false
    if (id) this.emit("closeMenu", {menu: id})

    Menu.currentActive = this
    this.#elMenu.style.display = "block"
  }

  // hide the menu
  close() {
    Menu.currentActive = null
    this.#elMenu.style.display = "none"
    this.emit("menuClosed", this.id)
  }
}