// menu.js

import DOM from "../../utils/DOM"
import { CLASS_MENUS, CLASS_MENU } from "../../definitions/core"
import { MenuStyle } from "../../definitions/style"
import { InputController, EventDispatcher, Keys } from '@jingwood/input-control'


// export default function (widgets, config) {
  
//   const elMenu = widgets.elements.elMenu

//   // elMenu.innerHTML = config.content
//   elMenu.style.top = `${config.pos[1]}px`
//   elMenu.style.left = `${config.pos[0]}px`
//   elMenu.style.display = "block"

//   // setTimeout(() => DOM.hideOnClickOutside(elMenu), 1000)
// }



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

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#mediator = config.mediator
    this.#core = this.#mediator.api.core
    this.#config = config
    this.#id = config.id
    this.#elMenus = widgets.elements.elMenus
    this.#elWidgetsG = widgets.elements.elWidgetsG
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

  init() {
    // insert element
    this.mount(this.#elMenus)
  }

  start() {
    // set up event listeners
    Menu.eventsListen()
  }

  end() {
    // remove event listners
    const api = this.#mediator.api
    const menuItems = DOM.findBySelectorAll(`#${api.id} .${CLASS_MENU} li`)
    menuItems.forEach((item) => {
      item.removeEventListener('click', this.onMenuSelect)
    })

    // remove element
    // this.el.remove()
  }

  eventsListen() {
    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(this.#elMenu);
    // this.#controller.on("mouseenter", this.onMouseEnter.bind(this))
    // this.#controller.on("mouseout", this.onMouseOut.bind(this))

    const api = this.#mediator.api
    const menuItems = DOM.findBySelectorAll(`#${api.id} .${CLASS_MENU} li`)
    menuItems.forEach((item) => {
      item.addEventListener('click', this.onMenuSelect)
    })
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
    let id = e.currentTarget.id
        evt = e.currentTarget.dataset.event
    this.emit(evt, id)
  }


  mount(el) {
    if (el.lastElementChild == null) 
      el.innerHTML = this.menuNode()
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.menuNode())


    // el.innerHTML = this.menuNode()
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

  insertMenu(target, content) {
    let wPos = this.#elWidgetsG.getBoundingClientRect()
    let iPos = target.getBoundingClientRect()

    let pos = [iPos.left - wPos.left, iPos.bottom - wPos.top]
    let config = { pos, content }
    let menu = Menu.create(this, config)
  }

  remove() {

  }

  close(menu) {
    console.log(`menu ${menu} closed`)
  }
}