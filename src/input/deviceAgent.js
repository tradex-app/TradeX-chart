// deviceAgent.js

import DOM from "../utils/DOM";
import { isBoolean, isFunction, isObject } from "../utils/typeChecks";


export default {

  has: function (event) {
    return (this.types.indexOf(event) == -1) ? false : true
  },

  isValid: function (event, handler) {
    return (
        this.has(event) || 
        isFunction(handler) || 
        DOM.isElement(this.element) 
    ) ? true : false
  },

  validOptions: function (options) {
    return (isObject(options) && isBoolean(options)) ? options : undefined;
  },

  removerListener: function (event, handler, element, options) {
    if (!this.has(event) || 
        !isFunction(handler) || 
        !DOM.isElement(element) 
    ) return false

    if (!isObject(options) && !isBoolean(options)) options == undefined

    this.#element.removeEventListener(event, handler, options)

    return true
  },

}

