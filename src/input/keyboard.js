
export default class KeyboardAgent {

  #types = [
    'keydown',
    'keyup',
  ]

  #input

  constructor(input) {
    this.#input = input
  }

  has(event) {
    return (this.#types.indexOf(event) == -1) ? false : true
  }

  on (event, handler, options, once) {
    let cb = handler

    switch (event) {

    }
    if (once) this.#input.agent.once(event, cb.bind(this), options)
    else this.#input.agent.on(event, cb.bind(this), options)
    return cb
  }

  off (event, handler, options) {
    this.#input.agent.off(event, handler, options)
  }

}
