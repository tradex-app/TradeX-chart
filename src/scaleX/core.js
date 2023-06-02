import { isArray, isBoolean, isNumber, isObject, isString, checkType } from '../utils/typeChecks'
import Mediator from './mediator'
import aspect from './aspect'

export default class Core {

  #modules = {}
  #modCnt = 0
  #plugins = {}
  #instances
  #sandboxes
  #running = {}
  #mediator
  #hub = {}

  logs = false
  infos = false
  warnings = false
  errors = false

  constructor(options) {

    // process options
    if (isObject(options)) {
      for (const option in options) {
        if (option in this.props()) {
          this.props()[option](options[option])
        }
      }
    }

  }

  // process and return only the options required for the Core
  props() {
    return {
      logs: (logs) => this.logs = (isBoolean(logs)) ? logs : false,
      infos: (infos) => this.infos = (isBoolean(infos)) ? infos : false,
      warnings: (warnings) => this.warnings = (isBoolean(warnings)) ? warnings : false,
      errors: (errors) => this.errors = (isBoolean(errors)) ? errors : false,
    }
  }

  get hub() { return this.#hub }

  log(l) { if (this.logs) console.log(l) }
  info(i) { if (this.infos) console.info(i) }
  warn(w) { if (this.warnings) console.warn(w) }
  error(e) { if (this.errors) console.error(e) }
  time(n) { if(this.timer) console.time(n) }
  timeLog(n) { if(this.timer) console.timeLog(n) }
  timeEnd(n) { if(this.timer) console.timeEnd(n) }

  subscribe(topic, cb, context) {

  }

  unsubscribe(topic, cb) {

  }

  publish(topic, cb, context) {

  }

  /**
   * Register and create a new module by providing it with a Mediator
   * which acts as a proxy to the Core, presenting a select API (Facade)
   *
   * @param {String} id
   * @param {Class} newModule
   * @param {Object} options - initial provided configuration
   * @param {Object} api - functions / methods, calculated properties
   * @return {Instance}  
   * @memberof Core
   */
  register(id, newModule, options, api) {
    ++this.#modCnt
    let instance = new Mediator(this, api, newModule, options)
    if (instance instanceof Mediator) {
      throw new Error(`module failed: ${id}`)
    }
    aspect.before(instance, "start").add(this, "beforeModStart", false, id)
    
    // ensure module IDs are unique
    const modID = (isString(id)) ? `${id}_${this.#modCnt}` : `${this.#modCnt}`

    instance.modID = modID
    this.#modules[modID] = instance
    return instance
  }

  // // https://stackoverflow.com/questions/61178885/dynamically-extending-a-class-in-javascript
  // extend(superclass, construct) {
  //   return class extends superclass {
  //       constructor(...args) {
  //           let _super = (...args2) => {
  //               super(...args2)
  //               return this;
  //           };
  //           construct(_super, ...args);
  //       }
  //   };
  // }

  beforeModStart() {
    const id = arguments[arguments.length - 1]
    this.#running[id] = this.#modules[id]
    this.log(`module ${id} is running`)
  }

  hookMountsAdd(targetObject, targetMethod) {

  }

  hookMount() {
    // hooks = () => {
      // for (const hook of hooks.prototype.hooks) {
      //   hook(...arguments)
      // }
    // }
    this.hookMount.prototype = {
      hooks: [],
      get:function() {
        return this.hooks
      },
      add:function(hook) {
        this.hooks.push(hook)
      },
      remove:function(hook) {
    
      }
    }
    return hooks
  }

}
