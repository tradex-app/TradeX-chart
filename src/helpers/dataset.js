// dataset.js

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import { uid } from '../utils/utilities'


export default class Dataset {

  #state
  #id
  #type
  #data = []

  constructor(state, ds) {

    this.#state = state
    this.#id = (isString(ds.id)) ? ds.id : uid
    this.#type = (isString(ds.type)) ? ds.type : "default"
    this.#data = (isArray(ds.data)) ? ds.data : []
  }

}