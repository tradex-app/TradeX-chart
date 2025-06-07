class mediator {

  valid
  #core

  constructor(core) {

    // Check that module has required methods
    const required = ['constructor', 'start', 'end']
    const target = Object.getOwnPropertyNames(this.constructor.prototype)
    const intersection = required.filter(x => target.includes(x));

    // check that module conforms to the naming convention
    const name = this.constructor.name.match(/^module_\s*([$A-Z_][0-9A-Z_$]*)/i)

    this.valid = (required.length === intersection.length)
                && (name !== null)

    console.log('Is module',this.constructor.name,'valid:',this.valid)
  
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

class module_New extends mediator {

  /**
   * Mediator provides the following to the module:
   * on - subscirbe
   */

  start() {

      console.log(this.constructor.name+": It lives!!!")
  }

  end() {

  }

}

export default function test() {
  const options = {}
  const i_NewMod = new module_New(options)
  i_NewMod.start()
}
