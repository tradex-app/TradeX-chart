// webWorkers.js

import { b64toBlob ,uid } from "../utils/utilities";
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'


class WebWorker {

  static #workers = new Map()

  static create(ID="worker", worker) {
    if (window.Worker) {
      if (typeof worker === "function") {
        worker = b64toBlob(worker.toString(), "text/javascript")
      }
      else if (typeof worker === "string") { }
      else { return false }

      ID = (isString(ID))? uid(ID) : uid("worker")
      this.#workers.set(ID, new Worker(worker))
    }
    else return false
  }

  static destroy(ID) {
    this.#workers.get(ID).terminate
  }

}