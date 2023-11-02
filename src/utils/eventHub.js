// eventHub.js
// custom event hub management, with subscribe (on), unsubscribe (off) and broadcast (emit)

import { isString, isFunction } from "./typeChecks";

export default class EventHub {

  #hub = {}

  constructor() {}

  /** 
  * Subscribe to a topic
  * @param {string} topic      - The topic name
  * @param {function} handler - The function or method that is called
  * @param {Object}  context   - The context the function(s) belongs to
  * @returns {boolean}
  */
    on(topic, handler, context) {
      if (!isString(topic) || !isFunction(handler)) return false
      if (!this.#hub[topic]) this.#hub[topic] = [];
      this.#hub[topic].push({handler, context});
      return true
    }
  
    /** 
    * Unsubscribe from a topic
    * @param {string} topic - The topic name
    * @param {function} handler  - function to remove
    * @param {Object}  context   - The context the function(s) belongs to
    * @returns {boolean}
    */
    off(topic, handler, context) {
      if (!isString(topic) || 
          !isFunction(handler) ||
          !(topic in this.#hub)
          ) return false
  
      const t = this.#hub[topic]
      for (let i=0; i<t.length; i++) {
        if (t[i].handler === handler) {
          if (context !== undefined) {
            if (t[i].context !== context) 
              continue
          }
          t.splice(i, 1);
          if (t.length === 0) {
            delete this.#hub[topic];
            break
          }
        }
      }
      return true
    }
  
    /**
    * Publish a topic
    * @param {string} topic - The topic name
    * @param {Object}  data - The data to publish
    * @returns {boolean}
    */
    emit(topic, data) {
      if (!isString(topic)) return
      (this.#hub[topic] || []).forEach(cb => cb.handler.call(cb.context, data));
    }
  
    /**
    * Execute a task
    * @param {string} topic - The topic name
    * @param {Object} data    - The data that gets published
    * @param {function} cb    - callback method
    */
    execute(channel, data, cb) {
  
    }
  
}