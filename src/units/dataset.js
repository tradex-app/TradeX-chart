// dataset.js

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'


export default class Dataset {

  #state
  #id
  #type
  #data = []

  constructor(state, ds) {

    this.#state = state
    this.#id = (isString(ds.id)) ? ds.id : UID
    this.#type = (isString(ds.type)) ? ds.type : "default"
    this.#data = (isArray(ds.data)) ? ds.data : []
  }

  UID() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).slice(2);
    return "ID-"+dateString+"-"+randomness
  }
}