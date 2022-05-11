// core.js

import DOM from './utils/DOM'
import { isArray, isBoolean, isNumber, isObject, isString } from './utils/typeChecks'
import SX from './scaleX/scale'
import UtilsBar from './components/utils'
import ToolsBar from './components/tools'
import MainPane from './components/main'

import State from './state'

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
  RANGELIMIT,
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
  #name = NAME
  #shortName = NAME
  #el = undefined
  #mediator
  #options
  #elements
  #elTXChart
  #elUtils
  #elBody
  #elTools
  #elMain

  #inCnt = null
  #modID
  #state = {}
  #userClasses = []

  #chartW = 500
  #chartH = 400
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

  static permittedClassNames = 
      ["TradeXchart","MainPane","ToolsBar","UtilsBar",
      "Chart","MainPane","ScaleBar","Timeline","ToolsBar"]

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
  info = false
  warnings = false
  errors = false

  #rangeLimit
  
/**
 * Creates an instance of TradeXchart.
 * @param {String|DOM element} container
 * @param {Object} [options={}] - configuration options
 * @param {Object} state - initial or previously exported state
 * @param {Number} inCnt
 * @memberof TradeXchart
 */
// , container, state, inCnt
constructor (mediator, options={}) {

    let container = options?.container
    
    if (isString(container)) {
      if (container[0] === '#')
        container = DOM.findByID(container)
      else
        container = DOM.findBySelector(container)
    }

    if (DOM.isElement(container)) {
      this.#el = container
      this.#mediator = mediator
      this.init(options)
    }
    else this.error(`${NAME} cannot be mounted. Provided element does not exist in DOM`)

    this.#state = State.create(options.state)
    this.log(`Chart ${this.#id} created with a ${this.#state.getStatus()} state`)
  }

  log(l) { this.#mediator.log(l) }
  info(i) { this.#mediator.info(i) }
  warning(w) { this.#mediator.warn(w) }
  error(e) { this.#mediator.error(e) }

  get id() { return this.#id }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get inCnt() { return this.#inCnt }

  get width() { return this.#chartW }
  set width(w) { this.setWidth(w) } 
  get height() { return this.#chartH }
  set height(h) { this.setHeight(h) }

  get elUtils() { return this.#elUtils }
  get elTools() { return this.#elTools }
  // get elTime() { return this.#elTime }
  get elMain() { return this.#elMain }
  // get elChart() { return this.#elChart }

  get chartData() { return this.#state.chart.data }
  get rangeLimit() { return this.#rangeLimit }

  /**
   * Create a new TradeXchart instance
   *
   * @static
   * @param {DOM element} container
   * @param {Object} [options={}]
   * @param {Object} state
   * @return {Instance}  
   * @memberof TradeXchart
   */
  static create(container, options={}, state) {
    const cnt = ++TradeXchart.#cnt

    // options.cnt = cnt
    options.state = state
    options.modID = `${ID}_${cnt}`
    options.container = container

    const core = new SX.Core(options)

    const api = {
      permittedClassNames:TradeXchart.permittedClassNames,
    }

    // register the parent module which will build and control everything
    const instance = core.register(options.modID, TradeXchart, options, api)
    TradeXchart.#instances[cnt] = core
    return instance
  }

  static destroy(chart) {
    if (chart.constructor.name === "TradeXchart") {
      const inCnt = chart.inCnt
      delete TradeXchart.#instances[inCnt]
    }
  }

  /**
   * Target element has been validated as a mount point
   * let's start building
   */
  init(options) {
    this.#inCnt = options.cnt
    this.#modID = options.modID

    const id = (isObject(options) && isString(options.id)) ? options.id : null
    this.setID(id)

    this.mount()

    // process options
    if (isObject(options)) {
      for (const option in options) {
        if (option in this.props()) {
          this.props()[option](options[option])
        }
      }
    }

    // api - functions / methods, calculated properties provided by this module
    let api = {
      ...{
      id: this.id,
      parent: this.#mediator,
      core: this.#mediator,
      inCnt: this.inCnt,
      width: this.width,
      width: this.width,
      height: this.height,

      chartBGColour: this.chartBGColour,
      chartTxtColour: this.chartTxtColour,
      chartBorderColour: this.chartBorderColour,
    
      utilsH: this.utilsH,
      toolsW: this.toolsW,
      timeH: this.timeH,
      scaleW: this.scaleW,
    
      elements: this.#elements,
    }, ...this.#mediator.api}


    this.UtilsBar = this.#mediator.register("UtilsBar", UtilsBar, options, api)
    this.ToolsBar = this.#mediator.register("ToolsBar", ToolsBar, options, api)
    this.MainPane = this.#mediator.register("MainPane", MainPane, options, api)
    this.Chart = this.MainPane.chart

    this.log(`${this.#name} instantiated`)
  }

  start() {
    this.log("...processing state")

    this.UtilsBar.start()
    this.ToolsBar.start()
    this.MainPane.start()
    this.Chart.start()

  }

  end() {
    this.log("...cleanup the mess")
  }

  on(topic, handler, context) {
    this.#mediator.on(topic, handler, context)
  }

  off(topic, handler) {
    this.#mediator.off(topic, handler)
  }

  emit(topic, data) {
    this.#mediator.emit(topic, data)
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

    this.#elements = {
      elTXChart: this.#elTXChart,
      elUtils: this.#elUtils,
      elBody: this.#elBody,
      elTools: this.#elTools,
      elMain: this.#elMain
    }
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
      infos: (infos) => this.infos = (isBoolean(infos)) ? infos : false,
      warnings: (warnings) => this.warnings = (isBoolean(warnings)) ? warnings : false,
      errors: (errors) => this.errors = (isBoolean(errors)) ? errors : false,
      rangeLimit: (rangeLimit) => this.#rangeLimit = (isNumber(rangeLimit)) ? rangeLimit : RANGELIMIT,
    }
  }

  getInCnt() {
    return this.#inCnt
  }

  setID(id) {
    if (isString(id)) 
      this.#id = id + this.#inCnt
    else 
      this.#id = ID + this.#inCnt
  }
  getID() { return this.#id }

  getModID() { return this.#modID }


  setWidth(w) {
    if (isNumber(w))
      this.#chartW = w
    else 
      this.#chartW = this.#el.parentElement.width

    this.#elTXChart.style.width = this.#chartW+"px"
    this.#elUtils.style.width = `${this.#chartW}px`
    this.#elBody.style.width = `${this.#chartW}px`
    this.#elMain.style.width = `${this.#chartW - this.toolsW}px`
  }

  setHeight(h) {
    if (isNumber(h))
      this.#chartH = h
    else 
      this.#chartH = this.#el.parentElement.height
      
    this.#elTXChart.style.height = this.#chartH+"px"
    this.#elBody.style.height = `${this.#chartH - this.utilsH}px`
    this.#elMain.style.height= `${this.#chartH - this.utilsH}px`
  }

  setDimensions(w, h) {
    this.setWidth(w)
    this.setHeight(h)

    this.emit("resize", {
      chartW: this.width,
      chartH: this.height,
      mainW: this.#chartW - this.toolsW,
      mainH: this.#chartH - this.utilsH,
    })
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
    const styleTXChart = STYLE_TXCHART + ` height: ${this.#chartH}px; width: ${this.#chartW}px; background: ${this.chartBGColour}; color: ${this.chartTxtColour};`
    const styleUtils = STYLE_UTILS + ` height: ${this.utilsH}px; width: ${this.#chartW}px; border-color: ${this.chartBorderColour};`
    const styleBody = STYLE_BODY + ` height: calc(100% - ${this.utilsH}px); width: ${this.#chartW}px;`
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