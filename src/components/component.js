// component.js
// parent class for major chart components

import { idSanitize } from "../utils/utilities"
import StateMachine from "../scaleX/stateMachne"
import Graph from "./views/classes/graph"


export default class Component {

  #id
  #core
  #options
  #parent
  #stateMachine
  #Graph

  constructor (core, options={}) {

    this.#core = core
    this.#options = {...options}
    this.#parent = this.#options.parent;
  }

  log(l) { this.#core.log(l) }
  info(i) { this.#core.info(i) }
  warn(w) { this.#core.warn(w) }
  error(e) { this.#core.error(e) }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || `${this.#core.ID}-${this.name}` }
  get core() { return this.#core }
  get options() { return this.#options }
  get config() { return this.#core.config }
  get theme() { return this.core.theme }
  get range() { return this.core.range }
  get parent() { return this.#parent }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }
  set graph(g) { if (g instanceof Graph) this.#Graph = g }
  get graph() { return this.#Graph }


  /**
   * Set a custom event listener
   * @param {string} topic
   * @param {function} handler
   * @param {*} [context]
   */
  on(topic, handler, context=this) {
    this.#core.on(topic, handler, context);
  }

  /**
   * Remove a custom event listener
   * @param {string} topic
   * @param {function} handler
   * @param {*} [context]
   */
  off(topic, handler, context=this) {
    this.#core.off(topic, handler, context);
  }

  /**
   * Remove a custom event listener
   * @param {*} [context]
   */
  expunge(context=this) {
    this.#core.expunge(context);
  }

  /**
   * Emit an event with optional data
   * @param {string} topic
   * @param {*} data
   */
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
}
