// progress.js

import { loadingBars, loadingSpin } from "../../definitions/icons"
import { CLASS_PROGRESS } from "../../definitions/core"


export default class Progress {

  static windowList = {}
  static windowCnt = 0
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
  #elMenu

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#core = config.core
    this.#config = config
    this.#id = config.id
    this.#elProgress = widgets.elements.elProgress
    this.#elWidgetsG = this.#core.elWidgetsG
    this.init()
  }

  init() {

  }

  progressNode() {
    const progressStyle = `position: absolute; z-index: 1000; display: block; fill: ${progressStyle.COLOUR};`

    let node = `
      <div
    `
  }
}