// alerts.js
// provide subscription to price stream for handler execution

import { isFunction, isNumber, isString } from "../utils/typeChecks"
import { uid } from "../utils/utilities"

const ALERT = "alert"

export default class Alerts {

  static #list = new Map()

  #price
  #condition
  #handlers = new Map()

  static get list() {
    return Alerts.#list
  }

  /**
   * add an alert handler
   *
   * @static
   * @param {number} price - price trigger
   * @param {function} condition - function returns true or false
   * @param {function} handler - function to execute on condition true
   * @return {instance}  
   * @memberof Alerts
   */
  static add(price, condition, handler) {

    if (!isNumber(price) ||
        !isFunction(handler)) return false

    let id, instance;

    if (Alerts.list.has({price, condition})) {
      instance = Alerts.list.get({price, condition})
      id = instance.addHandler(handler)
    }
    else {
      instance = new Alerts(price, condition)
      id = instance.addHandler(handler)
      Alerts.list.set({price, condition}, instance)
    }

    return id
  }

  static remove(id) {
    const instance = Alerts.instanceByID(id)

    // check if a valid alert handler id
    if (!instance) return false

    const r = instance.removeHandler(id)

    if (instance.handlers.size == 0)
      Alerts.list.delete({price, condition})

    return r
  }

  static delete(price, condition) {

    if (Alerts.list.has({price, condition})) 
      Alerts.list.get({price, condition}).destroy()

    return Alerts.list.delete({price, condition})
  }

  static pause(id) {
    const instance = Alerts.instanceByID(id)
  }

  static instanceByID(id) {
    for (let instance of Alerts.list) {
      if (instance.handlers.has(id)) return instance
    }
    return false
  }

  static check(prev, curr) {
    for (let [key, instance] of Alerts.list) {
      if (instance.condition(prev, curr)) {
        for (let [key, handler] of instance.handlers) {
          handler(instance.price, prev, curr)
        }
      }
    }
  }

  constructor(price, condition) {
    this.#price = price
    this.#condition = condition
  }

  get price() { return this.#price }
  get condition() { return this.#condition }
  get handlers() { return this.#handlers }

  destroy() {
    this.#handlers.clear()
  }

  addHandler(handler) {
    const id = uid(ALERT)
    this.#handlers.set(id, handler)
    return id
  }

  removeHandler(id) {
    return this.#handlers.delete(id)
  }
}