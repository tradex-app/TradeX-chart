// webWorkers.js
// https://github.com/w3reality/async-thread-worker/blob/master/src/index.js
// https://gist.github.com/sergiodxa/06fabb866653bd8b3165e9fe9fd8036b

import { uid } from "../utils/utilities";
import { isFunction, isString } from '../utils/typeChecks'
// import { timestampDiff } from "../utils/time";

class ThreadWorker {

  #fn

  constructor (fn) {
    this.#fn = fn
    self.onmessage = m => this._onmessage(m.data)
  }

  _onmessage (m) {
    const {r, data} = m
    const result = this.#fn(data)
    self.postMessage({r, result})
  }

  end() {
    self.close()
  }
}

class Thread {

  #id
  #cb
  #err
  #req = 0
  #reqList = {}
  #worker

  constructor(id, fn, cb, err) {
    this.#id = id
    this.#cb = cb
    this.#err = err
    const workerFn = `
      ${WebWorker.ThreadWorker.toString()};
      const fn = ${fn}
      const worker = new ThreadWorker(fn)
    `
    const blob = new Blob([`;(() => {${workerFn}})()`], { type: 'text/javascript' })
    const blobURL = URL.createObjectURL(blob)
    this.#worker = new Worker(blobURL);
    URL.revokeObjectURL(blobURL);
  }

  get id() { return this.#id }
  get req() { return `r_${this.#req}` }

  onmessage(m) {
    return (isFunction(this.#cb))? this.#cb(m) : m
  }

  onerror(e) {
    return (isFunction(this.#err))? this.#err(e) : e
  }

  postMessage(m) {
    return new Promise((resolve, reject) => {
      try {
        let r = this.req
        this.#reqList[r] = {resolve, reject}

        this.#worker.postMessage({r: r, data: m})

        this.#worker.onmessage = m => {
          const {r, result} = m.data
          if (r in this.#reqList) {
            const {resolve, reject} = this.#reqList[r]
            delete this.#reqList[r]
            resolve(this.onmessage(result))
          }
        }

        this.#worker.onerror = e => {
          reject(this.onerror(e))
        }

      } catch (error) { reject(error) }
    })
    
  }

  terminate() {
    this.#worker.terminate()
  }
}


/**
 * Provides web workers and threads that manage them
 * @export
 * @class WebWorker
 */
export default class WebWorker {

  static #threads = new Map()

  static ThreadWorker = ThreadWorker

  static Thread = Thread

  static create(ID="worker", worker, cb, core) {
    if (typeof window.Worker === "undefined") return false
    if (isFunction(worker)) {
      worker = worker.toString()
    }
    else if (isString(worker)) {
      // is function definition?
      // is URL path?
    }
    else { return false }

    ID = (isString(ID))? uid(ID) : uid("worker")
    WebWorker.#threads.set(ID, new WebWorker.Thread(ID, worker, cb))
    return WebWorker.#threads.get(ID)
  }

  static destroy(ID) {
    if (!isString(ID)) return false

    WebWorker.#threads.get(ID).terminate()
    WebWorker.#threads.delete(ID)
  }

  /**
   * destroy all web workers
   */
  static end() {
    WebWorker.#threads.forEach( (value, key, map) => {
      WebWorker.destroy(key)
    });
  }
}



// const doSomethingStr = doSomething.toString()
// function doSomething(x) { 
//   return `I did something. ${x}`
// }

// const test = WebWorker.create("WT", doSomethingStr)
// // const result = await test.postMessage("bla")
// // console.log(result)

// test.postMessage("bla")
// .then(r => console.log(r))
