// timeLine.js
// Time bar that lives at the top of the chart
// Providing: chart drawing Time


export default class Timeline {

  #name = "Timeline"
  #shortName = "time"
  #mediator
  #options
  #elTime

  constructor (mediator, options) {

    this.#mediator = mediator
    this.#options = options
    this.#elTime = mediator.api.elements.elTime
    this.init()
  }
  
  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get mediator() {return this.#mediator}
  get options() {return this.#options}

  init() {
    this.mount(this.#elTime)

    this.log(`${this.#name} instantiated`)
  }

  mount(el) {
    el.innerHTML = this.defaultNode()
  }

  defaultNode() {
    const node = `
      <canvas width="" height="${this.mediator.api.timeH}"></canvas>
    `
    return node
  }


  start() {

  }

  end() {
    
  }

}