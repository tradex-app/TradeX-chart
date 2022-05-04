// import { core } from "./scaleX";

export default class Mediator {

  valid
  #core
  #api
  #subModules = {}

  constructor(core, api, modClass, options) {

    this.#core = core
    this.#api = api

    // Check that module has required methods
    const required = ['constructor','start','end',"name","shortName","mediator","options"]
    const target = Object.getOwnPropertyNames(modClass.prototype)
    const intersection = required.filter(x => target.includes(x));

    // // Check that module has required properties
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
      // // has required properties?
      // && hasProperties 
      // has a valid class name?
      && (name !== null)

    this.log(`Is Module ${name} valid: ${this.valid}`)

    const instance = (this.valid) ? new modClass(this, options) : this

    return instance
  
  }

  get api() { return this.#api }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warning(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  /**
   * Provision for modules to spawn other modules
   *
   * @param {String} id
   * @param {Class} newModule
   * @param {Object} options - initial provided configuration
   * @param {Object} api - functions / methods, calculated properties
   * @return {Instance}  
   * @memberof Mediator
   */
  register(id, newModule, options, api) {

    const instance = this.#core.register(id, newModule, options, api)

    // track child modules instantiated by this module
    this.#subModules[instance.modID] = instance
    return instance
  }

  /* ## Subscribe to a topic
  *
  * @param {String} topic      - The topic name
  * @param {Function} callback - The function that gets called if an other module
  *                              publishes to the specified topic
  * @param {Object}  context   - The context the function(s) belongs to
  */
  on(topic, cb, context) {
    this.#core.subscribe(topic, cb, context)
  }

  /* ## Unsubscribe from a topic
  *
  * Parameters:
  *
  * @param {String} topic - The topic name
  * @param {Function} cb  - The function that gets called if an other module
  *                         publishes to the specified topic
  */
  off(topic, cb) {
    this.#core.unsubscribe(topic, cb)
  }

  /* ## Publish an event
  *
  * Parameters:
  * @param {String} topic - The topic name
  * @param {Object}  data - The data that gets published
  * @param {Function} cb  - callback method
  */
  emit(topic, data, cb) {
    this.#core.publish(topic, data, cb)
  }

  /* ## Execute a task
  *
  * Parameters:
  * @param {String} channel - The topic name
  * @param {Object} data    - The data that gets published
  * @param {Function} cb    - callback method
  */
  execute(channel, data, cb) {

  }


}