// theme.js

import { isObject, isString } from "../utils/typeChecks"
import { copyDeep, mergeDeep, uid } from "../utils/utilities"
import { defaultTheme } from "../definitions/style"

export default class Theme {

  #list = new Map()
  #current

  #config

  static create(theme, core) {
    if (!(isObject(theme))) return false

    theme.ID = (isString(theme.name))? uid(theme.name) : `${core.id}.theme`

    const instance = new Theme(theme, core)

    instance.#list.set(theme.ID, instance)

    return instance
  }

  constructor(theme, core) {
    this.#config = (isObject(theme))? theme : {}

    const reserved = ["constructor","list","current","setCurrent","getCurrent"]
    const defaultT = copyDeep(defaultTheme)
    const newTheme = copyDeep(theme)

    const setTheme = mergeDeep(defaultT, newTheme)

    for (let t in setTheme) {
      if (reserved.includes(t)) continue
      this[t] = setTheme[t]
    }
  }

  get list() { return this.#list }
  set current(theme) { this.setCurrent(theme) }
  get current() { return this.#current }

  setCurrent(theme) {
    if (isString(theme) && this.#list.has(theme)) {
      this.#current = theme
    }
    return this.getCurrent()
  }

  getCurrent() {
    // use existing current theme
    if (isString(this.#current) && this.#list.has(this.#current))
      return this.#list.get(this.#current)
    // or default
    else
      return defaultTheme
  }
}
