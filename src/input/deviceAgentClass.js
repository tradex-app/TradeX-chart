// deviceAgent.js

import { isHTMLElement } from "../utils/DOM";
import { isBoolean, isFunction, isObject } from "../utils/typeChecks";


export default class DeviceAgent {

  #input
  #element
  #type

  constructor (input) {
    this.#input = input
    this.#element = input.element
  }

  get input() { return this.#input }
  get element() { return this.#element }

  has (event) {
    return (this.types.indexOf(event) == -1) ? false : true
  }

  isValid(event, handler) {
    return (
        this.has(event) || 
        isFunction(handler) || 
        isHTMLElement(this.element) 
    ) ? true : false
  }

  validOptions(options) {
    return (isObject(options) && isBoolean(options)) ? options : undefined;
  }

  removerListener (event, handler, element, options) {
    if (!this.has(event) || 
        !isFunction(handler) || 
        !isHTMLElement(element) 
    ) return false

    if (!isObject(options) && !isBoolean(options)) options == undefined

    this.#element.removeEventListener(event, handler, options)

    return true
  }

}

