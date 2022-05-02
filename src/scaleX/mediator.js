// import { core } from "./scaleX";

export default class Mediator {

  valid
  #core

  constructor(core, modClass, options) {

    this.#core = core

    // Check that module has required methods
    const required = ['constructor', 'start', 'end']
    const target = Object.getOwnPropertyNames(modClass.prototype)
    const intersection = required.filter(x => target.includes(x));

    let name = modClass.prototype.constructor.name
    // check that module is in the permitted list
    if (!options.permittedClassNames.includes(name))
      // or heck that module conforms to the naming convention
      name = name.match(/^module_\s*([$A-Z_][0-9A-Z_$]*)/i)

    this.valid = (required.length === intersection.length)
                && (name !== null)

    console.log('Is module',name,'valid:',this.valid)

    const instance = (this.valid) ? new modClass(this, options) : null

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