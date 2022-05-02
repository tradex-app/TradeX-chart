import { checkType } from '../utils/typeChecks'
import Mediator from './mediator'
import aspect from './aspect'

export default class Core {

  #modules = {}
  #plugins = {}
  #instances
  #sandboxes
  #running = {}
  #mediator

  log = {
    error: function() {},
    log: function() {},
    info: function() {},
    warn: function() {},
    enable: function() {}
  }

  constructor(Sandbox) {

    // this.Sandbox = Sandbox

  }

  subscribe(topic, cb, context) {

  }

  unsubscribe(topic, cb) {

  }

  publish(topic, cb, context) {

  }

  register(id, newModule, options) {
    let instance = new Mediator(this, newModule, options)
    if (instance.constructor.name === "Mediator") {
      throw new Error("module failed")
    }
    aspect.before(instance, "start").add(this, "beforeModStart")
    this.#modules[id] = instance
    return instance
  }

  extend(superclass, construct) {
    return class extends superclass {
        constructor(...args) {
            let _super = (...args2) => {
                super(...args2)
                return this;
            };
            construct(_super, ...args);
        }
    };
  }

  beforeModStart(id) {
    this.#running[id] = this.#modules[id]
    console.log(`module ${id} is running`)
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