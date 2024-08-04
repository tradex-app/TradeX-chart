// webWorkers.js
// https://github.com/w3reality/async-thread-worker/blob/master/src/index.js
// https://gist.github.com/sergiodxa/06fabb866653bd8b3165e9fe9fd8036b

import { uid } from "../utils/utilities";
import { isFunction, isInteger, isObject, isString } from '../utils/typeChecks'
import { error, typeError } from "./messages";
// import { timestampDiff } from "../utils/time";


// class to safely wrap and execute a function on a worker
// without the function having to handle worker messaging or errors
class ThreadWorker {

  #fn

  /**
   * Creates an instance of ThreadWorker.
   * @param {function} fn
   * @memberof ThreadWorker
   */
  constructor (fn) {
    this.#fn = fn
    self.onmessage = m => this._onmessage(m.data)
  }

 /**
  * passes data to worker function and returns the result
  * @param {object} m - message object {r, data}
  */
  _onmessage (m) {
    const {r, data} = m
    try{
      const result = this.#fn(data, r)
      self.postMessage({r, status: true, result})
    }
    catch (e) {
      self.postMessage({r, status: false, result: e})
    }
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
  #idle = true

  /**
   * Creates an instance of Thread.
   * @param {string} id
   * @param {function} fn
   * @param {function} cb
   * @param {function} err
   * @memberof Thread
   */
  constructor(id, fn, cb, err) {
    this.#id = id
    this.#cb = cb
    this.#err = err

    // build inline worker
    const workerFn = `
      ${WebWorker.ThreadWorker.toString()};
      const fn = ${fn}
      const worker = new ThreadWorker(fn)
    `
    const blob = new Blob([`;(async () => {${workerFn}})().catch(e => {console.error(e)})`], { type: 'text/javascript' })
    const blobURL = URL.createObjectURL(blob)
    this.#worker = new Worker(blobURL);
    // FireFox throws error when revokeObjectURL() is executed
    // so add timeout
    setTimeout(function(blobURL)
    {	
      try { URL.revokeObjectURL(blobURL); }
      catch (e) {}
    },500,blobURL);
  }

  get id() { return this.#id }
  get req() { return `r_${this.#req++}` }
  get cb() { return this.#cb }
  set cb(cb) { this.#cb = cb }

  /**
   * handle return message
   * @param {*} m - result from worker thread
   * @returns {*} - either pure result or callback modified result. If callback returns nothing, no result is returned in the promise (undefined).
   */
  onmessage(m) {
    this.#idle = true
    return (isFunction(this.#cb))? this.#cb(m) : m
  }

  /**
  * handle return error
  * @param {Error} e - error from worker thread
  * @returns {*} - either pure error or callback modified error. If callback returns nothing, no error is returned.
  */
  onerror(e) {
    this.#idle = true
    return (isFunction(this.#err))? this.#err(e) : e
  }

  /**
   * Pass (message) data to worker and handle Promise result with provided callbacks
   * @param {*} m - message data to pass to worker
   * @returns {Promise}
   */
  postMessage(m) {
    return new Promise((resolve, reject) => {
      try {
        let r = this.req
        this.#reqList[r] = {resolve, reject}
        this.#idle = false

        this.#worker.postMessage({r, data: m})

        this.#worker.onmessage = m => {
          const {r, status, result} = m.data
          if (r in this.#reqList) {
            const {resolve, reject} = this.#reqList[r]
            delete this.#reqList[r]
            if (status) {
              resolve(this.onmessage(result))
            }
            else {
              reject(this.onerror({r, result}))
            }
          }
          else if (status == "resolved")
            this.onmessage(result)
          else
            throw new Error("Orphaned thread request ${r}")
        }

        this.#worker.onerror = e => {
          reject(this.onerror(e))
        }

      } catch (error) { 
        this.#idle = true
        reject(error) 
      }
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

  static create(worker, ID="worker", cb, err) {
    if (typeof window.Worker === "undefined") return false
    if (isFunction(worker)) {
      worker = worker.toString()
    }
    else if (isString(worker)) {
      // is function definition?
      let fnStr = worker.trim().match(
        /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
      )[1];
      if (!!fnStr) {
      // is URL path?
      }
      worker = fnStr
    }
    else { return false }

    ID = (isString(ID))? uid(ID) : uid("worker")
    this.#threads.set(ID, new this.Thread(ID, worker, cb, err))
    return this.#threads.get(ID)
  }

  static destroy(ID) {
    if (!isString(ID)) return false

    this.#threads.get(ID).terminate()
    this.#threads.delete(ID)
  }

  /**
   * destroy all web workers
   */
  static end() {
    this.#threads.forEach( (value, key, map) => {
      this.destroy(key)
    });
  }
}

class TaskProcessor {

  static taskList = {}

  static add(t) {
    if (!isObject(t)) { this.typeError("add()", t, "object") }
    if (!isString(t?.id)) { this.typeError("add(t.id)", t, "string") }
    if (!isString(t?.fn)) { this.typeError("add(t.fn)", t, "string") }
    this.taskList[t.id] = eval(t.fn)
  }

  static remove(t) {
    if (!isString(t)) { this.typeError("remove()", t, "string") }
    if (!(t in this.taskList)) { this.error("remove()", `task ${t} not found!`) }
    delete this.taskList[t]
  }

  static exec(t) {
    if (!isObject(t)) { this.typeError("exec()", t, "object") }
    if (!isString(t?.id)) { this.typeError("exec(t.id)", t, "string") }
    if (!isObject(t?.params)) { this.typeError("exec(t.params)", t, "object") }
    if (!(t.id in this.taskList)) { this.error("exec()", `task ${t.id} not found!`) }

    try {
      this.taskList[t.id](...t.params) 
    }
    catch (e) {
      this.error("exec()", `task ${t.id} error!`, { cause: e })
    }
  }

  static typeError(fn, t, e) {
    typeError(`TaskProcessor.${fn}`,t, e)
  }

  static error(fn, e, o) {
    error(`TaskProcessor.${fn}`, e, o)
  }

}


const STRATEGIES = new Set([ 'roundrobin', 'random', 'leastbusy' ]);
/**
 * RPC Worker Pool provides each worker a command list
 * Commands can be persistent or transient (disposable)
 * RPCWP can add a command (function) to a singular, multiple or all workers
 * RPCWP tracks which worker provides a command
 * RPCWP manages the work distribution strategy between all workers
 * Workers can report if they are busy or idle
 */
export class RPCWorkerPool {

  #CPUCores = 1
  #size = 0
  #strategy
  #rr_index = -1;
  #workers = [];
  #taskList = {}
  #taskID = 0

  constructor( cores=1, size=0, strategy="roundrobin" ) {

    this.#CPUCores = (isInteger(cores) && cores > 1) ? cores : 1
    if ( !isInteger(size) || size === 0) this.#size = this.#CPUCores;
    else if (size < 0) this.#size = Math.max(this.#CPUCores + size, 1);
    else this.#size = size;

    if (!STRATEGIES.has(strategy)) throw new TypeError("invalid strategy");

    this.#strategy = strategy;

    for (let i = 0; i < this.#size; i++) {   
      const worker = WebWorker.create( TaskProcessor );
      this.workers.push(
        { worker, 
          taskList: {}, 
          taskQueue: [] 
        });
    }
  }

  get cores () { return this.#CPUCores }
  get size() { return this.#size }
  get strategy() { return this.#strategy }
  get workers() { return this.#workers }
  get taskID() { return this.#taskID++ }

  getWorker() {
    let id;
    if (this.#strategy === "random") {
      id = Math.floor(Math.random() * this.#size);
    } 
    else if (this.strategy === "roundrobin") {
      this.#rr_index++;
      if (this.#rr_index >= this.#size) this.#rr_index = 0;
      id = this.#rr_index;
    } 
    else if (this.#strategy === "leastbusy") {
      let min = Infinity;
      for (let i = 0; i < this.#size; i++) {
        let size = this.#workers[i].taskQueue.size;
        if (size < min) {
          min = size;
          id = i;
        }
      }
    }
    console.log("Selected Worker:", id);
    return this.workers[id];s
  }

  addTask(name, task ) {
    if (!isString(name || !isString(task))) return false

    let id = `${name}_${this.taskID}`
    let entry = { id, name, fn: task }
    this.#taskList[id] = entry

    for (let worker of this.#workers) {
      worker.postMessage({task: "addTask", args: entry})
    }

    return id
  }

  exec(task, args) {
    if (!isString(task) ||
        !(task in this.#taskList)) return false

    this.getWorker().postMessage({task, args}).then(
      r => { return r }
    )
  }



}


  


/*

const { Worker } = require('worker_threads');
const CORES = require('os').cpus().length;
// const STRATEGIES = new Set([ 'roundrobin', 'random', 'leastbusy' ]);

// strategies enum
// class Strategies {
//   static passive = new Strategies("roundrobin")
//   static hover = new Strategies("random")
//   static active = new Strategies("leastbus")

//   constructor(name) {
//     this.name = name
//   }
// }
export class RpcWorkerPool {

  strategy
  rr_index = -1;
  next_command_id = 0;
  workers = [];

  constructor(path, size = 0, strategy = "roundrobin") {
    
    if ( !isInteger(size) || size === 0) this.size = CORES;
    else if (size < 0) this.size = Math.max(CORES + size, 1);
    else this.size = size;

    if (!STRATEGIES.has(strategy)) throw new TypeError("invalid strategy");

    this.strategy = strategy;

    for (let i = 0; i < this.size; i++) {
      const worker = new Worker(path);
      this.workers.push({ worker, in_flight_commands: new Map() });
      worker.on("message", (msg) => {
        this.onMessageHandler(msg, i);
      });
    }
  }

  onMessageHandler(msg, worker_id) {
    const worker = this.workers[worker_id];
    const { result, error, id } = msg;
    const { resolve, reject } = worker.in_flight_commands.get(id);
    worker.in_flight_commands.delete(id);
    if (error) reject(error);
    else resolve(result);
  }

  exec(method, ...args) {
    const id = ++this.next_command_id;
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    const worker = this.getWorker();
    worker.in_flight_commands.set(id, { resolve, reject });
    worker.worker.postMessage({ method, params: args, id });

    return promise;
  }

  getWorker() {
    let id;
    if (this.strategy === "random") {
      id = Math.floor(Math.random() * this.size);
    } 
    else if (this.strategy === "roundrobin") {
      this.rr_index++;
      if (this.rr_index >= this.size) this.rr_index = 0;
      id = this.rr_index;
    } 
    else if (this.strategy === "leastbusy") {
      let min = Infinity;
      for (let i = 0; i < this.size; i++) {
        let worker = this.workers[i];
        if (worker.in_flight_commands.size < min) {
          min = worker.in_flight_commands.size;
          id = i;
        }
      }
    }
    console.log("Selected Worker:", id);
    return this.workers[id];
  }
};

*/

// function doSomething(x) { 
//   return `I did something. ${x}`
// }

// const test = WebWorker.create(doSomethingStr)
// // const result = await test.postMessage("bla")
// // console.log(result)

// test.postMessage("bla")
// .then(r => console.log(r))
