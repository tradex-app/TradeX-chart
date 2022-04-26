// chart.js

import DOM from './utils/DOM'
import { isObject, isString } from './utils/typeChecks'

const NAME = "TradeX-Chart"

const CLASS_DEFAULT   = "tradeXchart"
const CLASS_UTILS     = "tradeXutils"
const CLASS_BODY      = "tradeXbody"
const CLASS_WIDGETSG  = "tradeXwidgetsG"
const CLASS_TOOLS     = "tradeXtools"
const CLASS_MAIN      = "tradeXmain"
const CLASS_TIME      = "tradeXtime"
const CLASS_ROWS      = "tradeXrow"
const CLASS_ROW       = "tradeXrow"
const CLASS_CHART     = "tradeXchart"
const CLASS_SCALE     = "tradeXscale"
const CLASS_WIDGETS   = "tradeXwidgets"
const CLASS_ONCHART   = "tradeXonChart"
const CLASS_OFFCHART  = "tradeXoffChart"



export default class Chart {

  #el = undefined
  #inCnt = null
  #userClasses = ""


  constructor (container, options={}, inCnt) {
    
    if (isString(container)) {
      if (container[0] === '#')
        container = DOM.findByID(container)
      else
        container = DOM.findBySelector(container)
    }

    if (DOM.isElement(container)) {
      this.#el = container
      this.init(options, inCnt)
    }
    else console.error(`${NAME} cannot be mounted. Provided element does not exist in DOM`)
  }

  get inCnt() { return this.#inCnt }

  init(options, inCnt) {
    this.#inCnt = inCnt

    if (this.#el !== undefined) {
      if (isObject(options) 
      && ("userClasses" in options) 
      && isString(options?.userClasses))
        this.#userClasses = options.userClasses
    }

    this.mount()
  }

  mount() {
    this.#el.innerHTML = this.defaultNode()
  }

  unmount() {
    this.cleanup()
  }

  cleanup() {
    // remove all event listeners
    // destroy all objects
  }

  defaultNode() {
    
    const node = `
      <div class="${CLASS_DEFAULT} ${this.#userClasses}">
        <div class="${CLASS_UTILS}"></div>
        <div class="${CLASS_BODY}">
          <div class="${CLASS_TOOLS}"></div>
          <div class="${CLASS_MAIN}">
            <div class="${CLASS_WIDGETSG}"></div>
            <div class="${CLASS_ROWS}">
              <div class="${CLASS_ROW} ${CLASS_CHART}">
                <div class="${CLASS_WIDGETS}"></div>
                <canvas/>
                <div class="${CLASS_SCALE}"></div>
              </div>
            </div>
            <div class="${CLASS_TIME}"></div>
          </div>
        </div>
      </div>
    `
    return node
  }

  setClasses(classes) {

  }
}