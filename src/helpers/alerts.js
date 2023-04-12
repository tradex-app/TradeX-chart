// alerts.js
// provide subscription to price stream for handler execution

import { isArray, isFunction, isNumber } from "../utils/typeChecks"
import { uid } from "../utils/utilities"

const ALERT = "alert"

export default class Alerts {

  #list = new Map()
  #handlers = {}

  constructor(alerts) {
    if (isArray(alerts)) {
      for (let a of alerts) {
        this.add(a?.price, a?.condition, a?.handler)
      }
    }
  }

  get list() { return this.#list }
  get handlers() { return this.#handlers }

  destroy() {
    this.#list.clear()
    this.#handlers = {}
  }

  batchAdd(alerts) {
    if (isArray(alerts)) {
      let ids = []
      for (let a of alerts) {
        ids.push(this.add(a?.price, a?.condition, a?.handler))
      }
      return ids
    }
    else return false
  }

  /**
   * add an alert handler
   *
   * @static
   * @param {number} price - price trigger
   * @param {function} condition - function returns true or false
   * @param {function} handler - function to execute on condition true
   * @return {string} - id string  
   * @memberof Alerts
   */
  add(price, condition, handler) {
    if (isNaN(price) ||
        !isFunction(handler)) return false

    const id = uid(ALERT)
    const alert = {price, condition}

    if (this.list.has(alert)) {
      let value = this.list.get(alert)
      value[id] = handler
    }
    else {
      const entry = {}
      entry[id] = handler
      this.list.set(alert, entry)
    }
    this.#handlers[id] = {alert, handler}

    return id
  }

  /**
   * Remove alert handler
   *
   * @param {string} id
   * @return {boolean}  - success or failure
   * @memberof Alerts
   */
  remove(id) {
    if (!(id in this.#handlers)) return false

    const handler = this.#handlers[id]
    const alert = handler.alert
    const value = this.#list.get(alert)
    value.delete(id)
    handler.delete(id)

    if (Object.keys(value).length == 0)
      this.#list.delete(alert)

    return true
  }

  /**
   * delete alert - will remove all subscribed handlers
   *
   * @param {number} price
   * @param {*} condition
   * @return {*} 
   * @memberof Alerts
   */
  delete(price, condition) {

    if (this.list.has({price, condition})) {
      const alert = this.list.get({price, condition})
      for (let id in alert) {
        this.#handlers.delete(id)
        alert.delete(id)
      }
    }
    return this.list.delete({price, condition})
  }

  pause(id) {
    if (!(id in this.#handlers)) return false

    const handler = this.#handlers[id]
  }

  /**
   * return handler by id
   *
   * @param {string} id
   * @return {function}  
   * @memberof Alerts
   */
  handlerByID(id) {
    if (!(id in this.#handlers)) return false
    else return this.#handlers[id].handler
  }

  /**
   * check all alerts and execute handlers if true
   *
   * @param {number} prev
   * @param {number} curr
   * @memberof Alerts
   */
  check(prev, curr) {
    if (!isArray(prev) || !isArray(curr)) return

    for (let [key, handlers] of this.list) {
      if (key.condition(key.price, prev, curr)) {
        for (let id in handlers) {
          try {
            handlers[id](key.price, prev, curr)
          }
          catch(e) { console.error(e) }
        }
      }
    }
  }

}