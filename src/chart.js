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



export default class TradeXchart {


  static #cnt = 0
  static #instances = {}

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

  static create(container, options={}) {
    const cnt = ++TradeXchart.#cnt
    TradeXchart.#instances[cnt] = new TradeXchart(container, options, cnt)
    return TradeXchart.#instances[cnt]
  }

  static destroy(chart) {
    if (chart.constructor.name === "TradeXchart") {
      const inCnt = chart.inCnt
      delete TradeXchart.#instances[inCnt]
    }
  }

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
                <div class="${CLASS_SCALE}">
                  <canvas/>
                </div>
              </div>
            </div>
            <div class="${CLASS_TIME}">
              <canvas/>
            </div>
          </div>
        </div>
      </div>
    `
    return node
  }

  insertRow() {
    const node = `
      <div class="${CLASS_ROW} ${CLASS_OFFCHART}">
        <div class="${CLASS_WIDGETS}"></div>
        <canvas/>
        <div class="${CLASS_SCALE}">
          <canvas/>
        </div>
      </div>
    `
  }

  setClasses(classes) {

  }
}