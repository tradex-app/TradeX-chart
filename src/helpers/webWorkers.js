// webWorkers.js

import { b64toBlob ,uid } from "../utils/utilities";
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'


export default class WebWorker {

  static #workers = new Map()

  #ID
  #worker

  constructor(ID, worker, cb, core) {
    this.#ID = ID
    this.#worker = new Worker(worker)
    this.#worker.onmessage = cb
    this.#worker.onerror = (e) => {}//core.error(e)
  }

  get ID() { return this.#ID }

  postMessage(m) { this.#worker.postMessage(m) }
  terminate() { this.#worker.terminate() }

  static create(ID="worker", worker, cb, core) {
    if (typeof(Worker) !== "undefined") {
      if (typeof worker === "function") {
        worker = new Blob([`(${worker.toString()})()`], { type: 'text/javascript' })
        worker = URL.createObjectURL(worker)
      }
      else if (typeof worker === "string") {

       }
      else { return false }
      
      ID = (isString(ID))? uid(ID) : uid("worker")
      WebWorker.#workers.set(ID, new WebWorker(ID, worker, cb))
      return WebWorker.#workers.get(ID)
    }
    else return false
  }

  static destroy(ID) {
    if (!isString(ID)) return false

    WebWorker.#workers.get(ID).terminate()
    WebWorker.#workers.delete(ID)
  }

}