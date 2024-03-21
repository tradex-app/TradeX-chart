// progress.js

import { loadingBars, loadingSpin } from "../../definitions/icons"
import { CLASS_PROGRESS } from "../../definitions/core"
import { ProgressStyle } from "../../definitions/style"
import { isObject } from "../../utils/typeChecks"


export default class Progress {

  static progressList = {}
  static progressCnt = 0
  static class = CLASS_PROGRESS
  static type = "progress"
  static name = "Progress"
  static icons = {
    loadingBars,
    loadingSpin
  }

  static defaultNode() {
    const progressStyle = ``
    const node = `
      <div slot="widget" class="${CLASS_PROGRESS}" style="${progressStyle}"></div>
    `
    return node
  }

  static create(widgets, config) {

    const id = `progress_${++Progress.progressCnt}`
    config.id = id

    // add entry
    Progress.progressList[id] = new Progress(widgets, config)

    return Progress.progressList[id]
  }

  static destroy(id) {
    Progress.progressList[id].destroy()

    // remove entry
    delete Progress.progressList[id]
  }

  #id
  #widgets
  #core
  #config
  
  #elWidgetsG
  #elProgress
  #elProg
  #elIcon

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#core = config.core
    this.#config = config
    this.#id = config.id
    this.#elProgress = widgets.elements[Progress.type]
    this.#elWidgetsG = this.#core.elWidgetsG
    this.init()
  }

  destroy() {
    this.#elProgress.remove()
  }

  get type() { return Progress.type }

  init() {
    // insert element
    this.mount(this.#elProgress)
  }

  start() {
    // is progress feedback enabled?
    if (!isObject(this.#core.config?.progress) ||
        !isObject(this.#core.config.progress?.loading))
        return false

    this.#elProg.style.display = "block"

    const x = (this.#core.elBody.width / 2) - (this.#elProg.clientWidth / 2)
    const y = (this.#core.elBody.height / -2) - (this.#elProg.clientHeight / 2)

    this.#elProg.style.top =  `${y}px`
    this.#elProg.style.left = `${x}px`
  }

  stop() {
    this.#elProg.style.display = "none"
  }

  /**
   * Build Progress Node
   * @param {Object} p - {type, icon}
   */
  progressNode(p) {
    const progressStyle = `position: absolute; z-index: 1000; display: none; justify-content: center; align-items: center;`
    const contentStyle = ``
    const content = `<div class="content" style="${contentStyle}">${p.icon}</div>`

    let node = `
      <div id="${this.#config.id}" class="progress ${p.type}" style="${progressStyle}">${content}</div>
    `
    return node
  }

  mount(el) {
    let type = "loadingBars"
    if (this.#config?.type in Progress.icons) type = this.#config?.type

    const p = {type, icon: Progress.icons[type]}
    if (el.lastElementChild == null) 
      el.innerHTML = this.progressNode(p)
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(p))

    this.#elProg = this.#elProgress.querySelector(`#${this.#config.id}`)
    this.#elIcon = this.#elProg.querySelector(`svg`)
    this.#elIcon.style.fill = `${ProgressStyle.COLOUR_ICONHOVER};`
  }
}
