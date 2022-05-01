// chart.js

import DOM from './utils/DOM'
import { isArray, isBoolean, isNumber, isObject, isString } from './utils/typeChecks'
import UtilsBar from './components/utils'
import ToolsBar from './components/tools'
import MainPane from './components/main'
// import State from './state'

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

const STYLE_TXCHART = "overflow: hidden;"
const STYLE_UTILS = "border-bottom: 1px solid;"
const STYLE_BODY  = "position: relative;"
const STYLE_TOOLS = "position: absolute; top: 0; left: 0; height: 100%; min-height: 100%; border-right: 1px solid;"
const STYLE_MAIN  = "position: absolute; top: 0; height: 100%;"


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

  #inCnt = null
  #userClasses = []

  chartW = 500
  chartH = 400
  chartWMin = 500
  chartHMin = 400
  chartW_Reactive = true
  chartH_Reactive = true
  chartBGColour = "#444"
  chartTxtColour = "#CCC"
  chartBorderColour = "#666"

  utilsH = 30
  toolsW = 45
  timeH  = 30
  scaleW = 60

  UtilsBar
  ToolsBar
  Timeline
  MainPane
  // Chart

  panes = {
    utils: UtilsBar,
    tools: ToolsBar,
    main: MainPane,
  }

  logs = false
  warnings = false
  errors = false

  state = {}
  

  constructor (container, options={}, state, inCnt) {
    
    if (isString(container)) {
      if (container[0] === '#')
        container = DOM.findByID(container)
      else
        container = DOM.findBySelector(container)
    }

    if (DOM.isElement(container)) {
      this.#el = container
      this.init(options, state, inCnt)
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
  // get elTime() { return this.#elTime }
  get elMain() { return this.#elMain }
  // get elChart() { return this.#elChart }


  static create(container, options={}, state) {
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

  init(options, state, inCnt) {
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
    this.MainPane = new MainPane(this)
    // this.State    = new State(state)


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

    const classesTXChart = CLASS_DEFAULT+" "+this.#userClasses 
    const styleTXChart = STYLE_TXCHART + ` height: ${this.chartH}px; width: ${this.chartW}px; background: ${this.chartBGColour}; color: ${this.chartTxtColour};`
    const styleUtils = STYLE_UTILS + ` height: ${this.utilsH}px; width: ${this.chartW}px; border-color: ${this.chartBorderColour};`
    const styleBody = STYLE_BODY + ` height: calc(100% - ${this.utilsH}px); width: ${this.chartW}px;`
    const styleTools = STYLE_TOOLS + ` width: ${this.toolsW}px; border-color: ${this.chartBorderColour};`
    const styleMain = STYLE_MAIN + ` left: ${this.toolsW}px; width: calc(100% - ${this.toolsW}px);`
    
    const node = `
      <div id="${this.id}" class="${classesTXChart}" style="${styleTXChart}">
        <div class="${CLASS_UTILS}" style="${styleUtils}"></div>
        <div class="${CLASS_BODY}" style="${styleBody}">
          <div class="${CLASS_TOOLS}" style="${styleTools}"></div>
          <div class="${CLASS_MAIN}" style="${styleMain}">
          </div>
        </div>
      </div>
    `
    return node
  }

  setClasses(classes) {

  }
}