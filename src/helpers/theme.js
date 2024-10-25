// theme.js
// Manages chart themes, allowing hot swapping 
// and changes to individual settings
// Theme list available globally to all charts

import { isObject, isString } from "../utils/typeChecks"
import { doStructuredClone, mergeDeep, getProperty, setProperty, uid, xMap } from "../utils/utilities"
import { defaultTheme } from "../definitions/style"

const reserved = ["constructor","list","setCurrent","setTheme","setValue"]

export default class Theme {

  static #list = new xMap()
  static get list() { return Theme.#list }

  #core

  /**
   * theme factory
   * @static
   * @param {Object} theme
   * @param {Object} core
   * @returns {instance}  
   * @memberof Theme
   */
  static create(theme, core) {
    if (!(isObject(theme))) return false

    theme.id = (isString(theme.name))? uid(theme.name) : uid(`${core.ID}_theme`)

    const instance = new Theme(theme, core)

    Theme.list.set(theme.id, instance)

    return instance
  }

  /**
   * Creates an instance of Theme.
   * @param {Object} theme
   * @param {Object} core
   * @memberof Theme
   */
  constructor(theme, core) {
    this.#core = core
    this.setCurrent(theme)
  }

  /**
   * return global list of themes
   * @readonly
   * @memberof Theme
   */
  get list() { return Theme.list }

  /**
   * modify all theme values
   * @param {Object} [theme={}]
   * @memberof Theme
   */
  setCurrent(theme={}) {
    theme = (isObject(theme))? theme : {}

    const defaultT = doStructuredClone(defaultTheme)
    const newTheme = doStructuredClone(theme)

    const setTheme = mergeDeep(defaultT, newTheme)

    for (let t in setTheme) {
      if (reserved.includes(t)) continue
      this[t] = setTheme[t]
    }
    // force chart to update to theme
    this.#core.refresh()
  }

  /**
   * set theme and refresh chart
   * @param {string} theme - identifier
   * @returns {boolean} - success / failure
   * @memberof Theme
   */
  setTheme(theme) {
    if (isString(theme) && Theme.list.has(theme)) {
      const t = Theme.list.get(theme)
      this.setCurrent(t)
      return true
    }
    return false
  }

  /**
   * set theme value and refresh chart
   * @param {string} path - "candle" or "candle.Type"
   * @param {*} value 
   * @returns {*} - previous value
   * @memberof Theme
   */
  setProperty(path, value) {
    if (!isString(path)) return undefined

    const old = getProperty(this, path)
    const keys = path.split(".")

    if (keys.length == 1) {
      this[keys[0]] = value
    }
    else {
      let k = keys.shift()
      this[k] = setProperty(this[k], keys.join('.'), value)
    }

    this.#core.refresh()

    return old
  }

  getProperty(path) {
    return getProperty(this, path)
  }

  /**
   * delete theme from global list
   * @param {string} theme
   * @returns {boolean} 
   * @memberof Theme
   */
  deleteTheme(theme) {
    if (isString(theme) && Theme.list.has(theme)) {
      Theme.list.delete(theme)
      return true
    }
    return false
  }

  /**
   * export theme - default json
   * @param {Object} [config={}] - default {type:"json"}
   * @returns {*}
   * @memberof Theme
   */
  exportTheme(config={}) {
    if (!isObject) config = {}
    const type = config?.type
    const data = {}
    let themeExport;

    for (let t in this) {
      if (reserved.includes(t)) continue
      data[t] = this[t]
    }

    switch(type) {
      case "json":
      default :
        const {replacer, space} = {...config};
        themeExport = JSON.stringify(data, replacer, space);
    }
    return themeExport
  }
}
