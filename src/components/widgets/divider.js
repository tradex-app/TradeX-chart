// divider.js
// dragable divider to resize off chart indicators

import DOM from "../../utils/DOM"


export default class Divider{

  #id
  #widgets
  #offChart
  
  #elDivider
  #elOffChart

  static dividerList = {}
  static divideCnt = 0

  constructor(widgets, config) {
    this.#widgets = widgets
    this.#offChart = config.offChart
    this.#id = config.id
  }

  static createDivider(widgets, offChart) {

    const config = {
      id: `divider${++Divider.divideCnt}`,
      offChart: offChart,
    }

    // add entry
    Divider[id] = new Divider(widgets, config)

    return Divider[id]
  }

  static destroyDivider(id) {
    // remove event listners
    Divider.dividerList[id].offChart.off(topic, handler)

    // remove element
    Divider.dividerList[id].el.remove()

    // remove entry
    delete Divider.dividerList[id]
  }

  get el() { return this.#elDivider }
  get offChart() { return this.#offChart }

  init() {
    // insert element
    this.mount()

    // add event listners

  }

  mount(el) {

  }


  defaultNode() {

    const styleDivider = `position: absolute; top: 0; left: 0; z-index:100; width: 100%; height: 3px; background: #FFF;`

    const node = `
      <div id="${this.#id}" class="divider" style="${styleDivider}"></div>
    `
  }

}