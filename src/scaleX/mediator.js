// mediator.js

// import { core } from "./scaleX";
import StateMachine from "./stateMachne"

export default class Mediator {

  valid
  #core
  #api
  #hub
  #subModules = {}
  #stateMachine

  constructor(core, api, modClass, options) {

    this.#core = core
    this.#hub = core.hub
    this.#api = api

    // Check that module has required methods
    const required = ['constructor','start','end',"name","shortName","mediator","options"]
    const target = Object.getOwnPropertyNames(modClass.prototype)
    const intersection = required.filter(x => target.includes(x));

    // Check that module has required properties
    // const propertiesToTest = ["name","shortName","mediator","options"];
    // const hasProperties = (propertiesToTest.every(function(x) { return x in modClass })) 

    let name = modClass.prototype.constructor.name
    // check that module is in the (fundamental) permitted list
    // for modules that are fixed features of the project
    if ("permittedClassNames" in api && !api?.permittedClassNames.includes(name))
      // or check that module conforms to the naming convention
      // for modules that are 3rd party 
      // or dynamically added in the project lifecycle
      name = name.match(/^module_\s*([$A-Z_][0-9A-Z_$]*)/i)

    // does the module class validate?
    this.valid = 
      // has required methods?
      (required.length === intersection.length)
      // has required properties?
      // && hasProperties 
      // has a valid class name?
      && (name !== null)

    this.log(`Is Module ${name} valid: ${this.valid}`)

    if (this.valid)  return new modClass(this, options)
  }

  get api() { return this.#api }
  get core() { return this.#core }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }
  
  isStateMachineConfigValid(config) { StateMachine.validateConfig(config) }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warn(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  /**
   * Provision for modules to spawn other modules
   *
   * @param {String} id
   * @param {Class} newModule
   * @param {Object} options - initial provided configuration
   * @param {Object} api - functions / methods, calculated properties
   * @returns {Instance}  
   * @memberof Mediator
   */
  register(id, newModule, options, api) {

    const instance = this.#core.register(id, newModule, options, api)

    // track child modules instantiated by this module
    this.#subModules[instance.modID] = instance
    return instance
  }

  /** Subscribe to a topic
  *
  * @param {String} topic      - The topic name
  * @param {Function} callback - The function that is called if another module
  *                              publishes to the specified topic
  * @param {Object}  context   - The context the function(s) belongs to
  */
  on(topic, handler, context) {
    if (!this.#hub[topic]) this.#hub[topic] = [];
    this.#hub[topic].push({handler, context});
  }

  /** Unsubscribe from a topic
  *
  * @param {String} topic - The topic name
  * @param {Function} cb  - The function that is called if an other module
  *                         publishes to the specified topic
  */
  off(topic, handler) {
    const i = (this.#hub[topic] || []).findIndex(h => h === handler);
    if (i > -1) this.#hub[topic].splice(i, 1);
    if (this.#hub[topic].length === 0) delete this.#hub[topic];
  }

  /** Publish an topic
  *
  * @param {String} topic - The topic name
  * @param {Object}  data - The data to publish
  */
  emit(topic, data) {
    (this.#hub[topic] || []).forEach(cb => cb.handler.call(cb.context, data));

    // (this.#hub[topic] || []).forEach(cb => cb.handler(data));
  }

  /** Execute a task
  *
  * @param {String} topic - The topic name
  * @param {Object} data    - The data that gets published
  * @param {Function} cb    - callback method
  */
  execute(channel, data, cb) {

  }


}
