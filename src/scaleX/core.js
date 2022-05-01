import { checkType } from '../utils/typeChecks'
import { Mediator } from './mediator'

class Core {

  #modules
  #plugins
  #instances
  #sandboxes
  #running
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
    if (instance.constructor.name !== "Mediator") {
      throw new Error("module failed")
    }
    this.#modules[id] = instance
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

}