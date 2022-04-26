// chart.js

import DOM from './utils/DOM'
import { isArray, isNumber, isObject, isString } from './utils/typeChecks'

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
  #userClasses = []

  chartW
  chartH
  chartWMax = "100%"
  chartWMin
  chartHMax = "100%"
  chartHMin
  chartW_Reactive = true
  chartH_Reactive = true

  logs = false
  warnings = false
  errors = false
  

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
    else this.error(`${NAME} cannot be mounted. Provided element does not exist in DOM`)
  }

  log(l) { if (this.logs) console.log(l) }
  warning(w) { if (this.warnings) console.warn(l) }
  error(e) { if (this.errors) console.error(e) }

  get inCnt() { return this.#inCnt }
  get width() { return this.chartW }
  set width(w) { this.setWidth(w) } 
  get height() { return this.chartH }
  set height(h) { this.setHeight(h) }

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

    this.mount()

    if (isObject(options)) {
      for (const option in options) {
        if (option in props) {
          this[option](options[option])
        }
      }
    }

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

  props() {
    return {
      userClasses: (classes) => this.setUserClasses(classes),
      width: (width) => this.setWidth(width),
      height: (height) => this.setHeight(height),
    }
  }

  setWidth(w) {
    if (isNumber(w))
      this.chartW = w
    else 
      this.chartW = this.#el.parentElement.width
    this.#el.width = this.chartW
  }

  setHeight(h) {
    if (isNumber(h))
      this.chartH = h
    else 
      this.chartH = this.#el.parentElement.height
    this.#el.height = this.chartH
  }

  setUserClasses(c) {
    if (isString(c)) {
      let uc = c.split(" ")
      this.#userClasses = uc
    }
    else if (isArray(c)) {
      this.#userClasses = c
    }
    else {
      this.warn(`Supplied user classes not valid. Expecting type String or Array`)
    }

    for (let cl of this.#userClasses) {
      classes.add(cl)
    }
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