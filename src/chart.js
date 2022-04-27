// chart.js

import DOM from './utils/DOM'
import { isArray, isBoolean, isNumber, isObject, isString } from './utils/typeChecks'
import UtilsBar from './components/utils'
import ToolsBar from './components/tools'
import Timeline from './components/timeLine'
import Chart from './components/chart'
import {
  NAME,
  ID,
  CLASS_DEFAULT,
  CLASS_UTILS ,
  CLASS_BODY,
  CLASS_WIDGETSG,
  CLASS_TOOLS,
  CLASS_MAIN,
  CLASS_TIME,
  CLASS_ROWS,
  CLASS_ROW,
  CLASS_CHART,
  CLASS_SCALE,
  CLASS_WIDGETS,
  CLASS_ONCHART,
  CLASS_OFFCHART,
} from './definitions/core'


export default class TradeXchart {


  static #cnt = 0
  static #instances = {}

  #id
  #el = undefined
  #elTXChart
  #elUtils
  #elBody
  #elTools
  #elMain
  #elWidgetsG
  #elRows
  #elChart
  #elTime

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

  utilsH = 20
  toolsW = 45
  timeH  = 30
  scaleW = 60

  UtilsBar
  ToolsBar
  Timeline
  Chart
  ScaleBar

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

  get id() { return this.#id }
  get inCnt() { return this.#inCnt }
  get width() { return this.chartW }
  set width(w) { this.setWidth(w) } 
  get height() { return this.chartH }
  set height(h) { this.setHeight(h) }
  get elUtils() { return this.#elUtils }
  get elTools() { return this.#elTools }
  get elTime() { return this.#elTime }
  get elChart() { return this.#elChart }


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

    const id = (isObject(options) && isString(options.id)) ? options.id : null
    this.setID(id)

    this.mount()

    // process options
    if (isObject(options)) {
      for (const option in options) {
        if (option in props) {
          this[option](options[option])
        }
      }
    }

    this.UtilsBar = new UtilsBar(this)
    this.ToolsBar = new ToolsBar(this)
    this.Timeline = new Timeline(this)
    this.Chart = new Chart(this)

  }


  mount() {
    // mount the framework
    this.#el.innerHTML = this.defaultNode()

    // define the elements for the components to mount onto
    this.#elTXChart = DOM.findBySelector(`#${this.id}`)
    this.#elUtils = DOM.findBySelector(`#${this.id} .${CLASS_UTILS}`)
    this.#elBody = DOM.findBySelector(`#${this.id} .${CLASS_BODY}`)
    this.#elTools = DOM.findBySelector(`#${this.id} .${CLASS_TOOLS}`)
    this.#elMain  = DOM.findBySelector(`#${this.id} .${CLASS_MAIN}`)
    this.#elWidgetsG = DOM.findBySelector(`#${this.id} .${CLASS_WIDGETSG}`)
    this.#elRows  = DOM.findBySelector(`#${this.id} .${CLASS_ROWS}`)
    this.#elChart = DOM.findBySelector(`#${this.id} .${CLASS_CHART}`)
    this.#elTime = DOM.findBySelector(`#${this.id} .${CLASS_TIME}`)
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
      // id: (id) => this.setID(id),
      userClasses: (classes) => this.setUserClasses(classes),
      width: (width) => this.setWidth(width),
      height: (height) => this.setHeight(height),
      logs: (logs) => this.logs = (isBoolean(logs)) ? logs : false,
      warnings: (warnings) => this.warnings = (isBoolean(warnings)) ? warnings : false,
      errors: (errors) => this.errors = (isBoolean(errors)) ? errors : false,
    }
  }

  setID(id) {
    if (isString(id)) 
      this.#id = id
    else 
      this.#id = ID + this.#inCnt
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
      <div id="${this.id}" class="${CLASS_DEFAULT} ${this.#userClasses}">
        <div class="${CLASS_UTILS}"></div>
        <div class="${CLASS_BODY}">
          <div class="${CLASS_TOOLS}"></div>
          <div class="${CLASS_MAIN}">
            <div class="${CLASS_WIDGETSG}"></div>
            <div class="${CLASS_ROWS}">
              <div class="${CLASS_ROW} ${CLASS_CHART}">
                <div class="${CLASS_WIDGETS}"></div>
                <canvas></canvas>
                <div class="${CLASS_SCALE}">
                  <canvas><canvas/>
                </div>
              </div>
            </div>
            <div class="${CLASS_TIME}">
              <canvas><canvas/>
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