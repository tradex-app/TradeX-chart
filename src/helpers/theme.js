// theme.js
// Manages chart themes, allowing hot swapping 
// and changes to individual settings
// Theme list available globally to all charts

import { isObject, isString } from "../utils/typeChecks"
import { copyDeep, mergeDeep, uid } from "../utils/utilities"
import { defaultTheme } from "../definitions/style"

const reserved = ["constructor","list","setCurrent","setTheme","setValue"]

export default class Theme {

  static #list = new Map()
  static get list() { return Theme.#list }

  #core

  /**
   * theme factory
   * @static
   * @param {object} theme
   * @param {object} core
   * @return {instance}  
   * @memberof Theme
   */
  static create(theme, core) {
    if (!(isObject(theme))) return false

    theme.ID = (isString(theme.name))? uid(theme.name) : `${core.id}.theme`

    const instance = new Theme(theme, core)

    Theme.list.set(theme.ID, instance)

    return instance
  }

  /**
   * Creates an instance of Theme.
   * @param {object} theme
   * @param {object} core
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
   * @param {object} [theme={}]
   * @memberof Theme
   */
  setCurrent(theme={}) {
    theme = (isObject(theme))? theme : {}

    const defaultT = copyDeep(defaultTheme)
    const newTheme = copyDeep(theme)

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
   * @return {boolean} - success / failure
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
   * @param {string} key 
   * @param {*} value 
   * @memberof Theme
   */
  setValue(key, value) {
    if (key in this) {
      this[key] = value
      this.#core.refresh()
    }
  }


  /**
   * delete theme from global list
   * @param {string} theme
   * @return {boolean} 
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
   * @param {object} [config={}] - default {type:"json"}
   * @return {*}
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
