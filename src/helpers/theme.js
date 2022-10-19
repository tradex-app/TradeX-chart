// theme.js

import { isObject, isString } from "../utils/typeChecks"
import { uid } from "../utils/utilities"
import { defaultTheme } from "../definitions/style"

export default class Theme {

  static #list = new Map()
  static #current

  #config

  constructor(theme, core) {
    this.#config = (isObject(theme))? theme : {}

    const reserved = [
      "constructor"
    ]

    theme = {...defaultTheme, ...theme}

    for (let t in theme) {
      if (reserved.includes(t)) continue
      this[t] = theme[t]
    }
  }

  static create(theme, core) {
    if (!(isObject(theme))) return false

    theme.ID = (isString(theme.name))? uid(theme.name) : uid("theme")

    const instance = new Theme(theme, core)

    Theme.#list.set(theme.ID, instance)
    Theme.setCurrent(theme.ID)

    return instance
  }

  static get list() { return Theme.#list }
  static set current(theme) { Theme.setCurrent(theme) }
  static get current() { return Theme.#current }

  static setCurrent(theme) {
    if (isString(theme) && Theme.list.has(theme)) {
      Theme.#current = theme
      return Theme.#list.get(theme)
    }
    else {
      // use existing current theme
      if (isString(Theme.#current) && Theme.list.has(Theme.#current))
        return Theme.#list.get(Theme.#current)
      // or default
      else
        return defaultTheme
    }
  }
}
