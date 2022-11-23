// core.js

// import * as talib from "talib-web"
import DOM from './utils/DOM'
import { isArray, isBoolean, isNumber, isObject, isString } from './utils/typeChecks'
import SX from './scaleX/scale'
import UtilsBar from './components/utils'
import ToolsBar from './components/tools'
import MainPane from './components/main'
import WidgetsG from './components/widgets'

import State from './state'
import { Range, calcTimeIndex } from "./helpers/range"
import Stream from './helpers/stream'
import Theme from "./helpers/theme"
import WebWorker from "./helpers/webWorkers"
import Indicators from './definitions/indicators'
import style from './definitions/style'
import * as Time from './utils/time'
import { limit } from './utils/number'
import { interval2MS, isTimeFrame, SECOND_MS } from "./utils/time"


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
  CLASS_YAXIS,
  CLASS_WIDGETS,
  CLASS_ONCHART,
  CLASS_OFFCHART,
  RANGELIMIT,
  PRICE_PRECISION,
  VOLUME_PRECISION,
  STREAM_LISTENING,
  STREAM_NEWVALUE,
  STREAM_UPDATE
} from './definitions/core'

import { LIMITFUTURE, MINCANDLES, YAXIS_BOUNDS } from "./definitions/chart"

import { GlobalStyle } from './definitions/style'
import { precision } from "./utils/number"

/**
 * The root class for the entire chart
 * @export
 * @class TradeXchart
 */
export default class TradeXchart {

  static #cnt = 0
  static #instances = {}
  static #talibReady = false
  static initErrMsg = `TradeX-chart requires "talib" to function properly. Without it, some features maybe missing or broken.`

  #id
  #name = NAME
  #shortName = NAME
  #el = undefined
  #mediator
  #config
  #options
  #elements = {}
  #elTXChart
  #elUtils
  #elBody
  #elTools
  #elMain
  #elRows
  #elTime
  #elYAxis
  #elWidgetsG

  #inCnt = null
  #modID
  #state = {}
  #userClasses = []
  #chartIsEmpty = true
  #data
  #range
  #rangeStartTS
  #rangeLimit = RANGELIMIT
  #indicators = Indicators
  #TALib
  #theme
  #chartW = 500
  #chartH = 400
  chartWMin = 500
  chartHMin = 400
  chartW_Reactive = true
  chartH_Reactive = true
  chartBGColour = GlobalStyle.COLOUR_BG
  chartTxtColour = GlobalStyle.COLOUR_TXT
  chartBorderColour = GlobalStyle.COLOUR_BORDER

  utilsH = 35
  toolsW = 40
  timeH  = 50
  scaleW = 60

  static permittedClassNames = 
      ["TradeXchart","Chart","MainPane","OffChart","OnChart",
      "ScaleBar","Timeline","ToolsBar","UtilsBar","Widgets"]

  #UtilsBar
  #ToolsBar
  #MainPane = {
    chart: {},
    time: {}
  }
  #WidgetsG

  panes = {
    utils: this.#UtilsBar,
    tools: this.#ToolsBar,
    main: this.#MainPane,
  }

  #time = {
    rangeTotal: true,
    range: {},
    total: {},
    timeFrameMS: 0,
    timeFrame: '',
    timeZone: '',
    indexed: false
  }

  logs = false
  infos = false
  warnings = false
  errors = false
  
  #mousePos = {x:0, y:0}
  #scrollPos = 0
  #smoothScrollOffset = 0
  #panBeginPos = [null, null, null, null]

  #workers
  #stream
  #candles
  #pricePrecision
  #volumePrecision

  #delayedSetRange = false


/**
 * Creates an instance of TradeXchart.
 * @param {instance} mediator - module api
 * @param {object}[config={}] - chart configuration
 * @memberof TradeXchart
 */
constructor (mediator, config={}) {

    this.oncontextmenu = window.oncontextmenu
    this.#workers = WebWorker
    this.#TALib = config.talib

    this.logs = (config?.logs) ? config.logs : false
    this.infos = (config?.infos) ? config.infos : false
    this.warnings = (config?.warnings) ? config.warnings : false
    this.errors = (config?.errors) ? config.errors : false

    let container = config?.container,
        state = config?.state, 
        deepValidate = config?.deepValidate || false, 
        isCrypto = config?.isCrypto || false
    
    if (isString(container)) {
      if (container[0] === '#')
        container = DOM.findByID(container)
      else
        container = DOM.findBySelector(container)
    }

    if (!DOM.isElement(container)) 
      this.error(`${NAME} cannot be mounted. Provided element does not exist in DOM`)
    
    else {
      this.#el = container
      this.#mediator = mediator
      this.#state = State.create(state, deepValidate, isCrypto)
      this.log(`Chart ${this.#id} created with a ${this.#state.status} state`)
      delete(config.state)

      // time frame
      let tf = "1s"
      let ms = SECOND_MS
      if (!isObject(config?.stream) && this.#state.data.chart.data.length < 2) {
        this.warning(`${NAME} has no chart data or streaming provided.`)
        // has a time frame been provided?
        ;({tf, ms} = isTimeFrame(config?.timeFrame))
        this.#time.timeFrame = tf
        this.#time.timeFrameMS = ms
        this.#chartIsEmpty = true
      }
      // is the chart streaming with an empty chart?
      else if (isObject(config?.stream) && this.#state.data.chart.data.length < 2) {
        // has a time frame been provided?
        ;({tf, ms} = isTimeFrame(config?.timeFrame))
        console.log("tf:",tf,"ms:",ms)

        this.#time.timeFrame = tf
        this.#time.timeFrameMS = ms
        this.#chartIsEmpty = true
        this.#delayedSetRange = true
      }
      // chart has back history and optionally streaming
      else {
        this.#time.timeFrame = this.#state.data.chart.tf 
        this.#time.timeFrameMS = this.#state.data.chart.tfms
        this.#chartIsEmpty = false
      }
      this.init(config)
    }
  }

  log(l) { if (this.logs) console.log(l) }
  info(i) { if (this.info) console.info(i) }
  warning(w) { if (this.warnings) console.warn(w) }
  error(e) { if (this.errors) console.error(e) }

  get id() { return this.#id }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get config() { return this.#config }
  get inCnt() { return this.#inCnt }

  get width() { return this.#chartW }
  set width(w) { this.setWidth(w) } 
  get height() { return this.#chartH }
  set height(h) { this.setHeight(h) }

  get elUtils() { return this.#elUtils }
  get elTools() { return this.#elTools }
  get elMain() { return this.#elMain }
  get elYAxis() { return this.#elYAxis }
  get elWidgetsG() { return this.#elWidgetsG }

  get UtilsBar() { return this.#UtilsBar }
  get ToolsBar() { return this.#ToolsBar }
  get MainPane() { return this.#MainPane }
  get Timeline() { return this.#MainPane.time }
  get WidgetsG() { return this.#WidgetsG }
  get Chart() { return this.#MainPane.chart }

  get state() { return this.#state.data }
  get chartData() { return this.#state.data.chart.data }
  get offChart() { return this.#state.data.offchart }
  get onChart() { return this.#state.data.onchart }
  get datasets() { return this.#state.data.datasets }
  get allData() {
    return {
      data: this.chartData,
      onChart: this.onChart,
      offChart: this.offChart,
      datasets: this.datasets
    }
  }
  get rangeLimit() { return (isNumber(this.#rangeLimit)) ? this.#rangeLimit : RANGELIMIT }
  get range() { return this.#range }
  get time() { return this.#time }
  get TimeUtils() { return Time }

  get theme() { return Theme.getCurrent() }
  get settings() { return this.#state.data.chart.settings }
  get indicators() { return this.#indicators }
  get TALib() { return this.#TALib }

  get candleW() { return this.Timeline.candleW }
  get buffer() { return this.MainPane.buffer }
  get bufferPx() { return this.MainPane.bufferPx }
  set scrollPos(pos) { this.setScrollPos(pos) }
  get scrollPos() { return this.#scrollPos }
  get smoothScrollOffset() { return 0 } //{ return this.#smoothScrollOffset }
  get rangeScrollOffset() { return Math.floor(this.bufferPx / this.candleW) }
  get mousePos() { return this.#mousePos }

  get pricePrecision() { return this.#pricePrecision }
  get volumePrecision() { return this.#volumePrecision }

  set stream(stream) { return this.setStream(stream) }
  get stream() { return this.#stream }
  get worker() { return this.#workers }
  get isEmtpy() { return this.#chartIsEmpty }
  set candles(c) { if (isObject(c)) this.#candles = c }
  get candles() { return this.#candles }


  /**
   * Create a new TradeXchart instance
   *
   * @static
   * @param {DOM_element} container - HTML element to mount the chart on
   * @param {object} [config={}] - chart config
   * @param {object} state - chart state
   * @return {instance}  
   * @memberof TradeXchart
   */
  static create(container, config={}, state) {

    if (!TradeXchart.#talibReady) {
      (async () => {
        try {
          if ((typeof config.talib !== "object") || 
              // (config.talib[Symbol.toStringTag] !== "Module") ||
              (typeof config.talib.init !== "function"))
                throw new Error(`${TradeXchart.initErrMsg}`)
          await config.talib.init("node_modules/talib-web/lib/talib.wasm");
          TradeXchart.#talibReady = true
        } catch (e) {
          throw new Error(`${TradeXchart.initErrMsg} ${e.message}`)
        }
      })();
    }

    // add global stylesheet for all charts
    if (TradeXchart.#cnt == 0) document.head.insertAdjacentHTML("beforeend", style)

    const cnt = ++TradeXchart.#cnt

    config.cnt = cnt
    config.modID = `${ID}_${cnt}`
    config.container = container
    config.CPUCores = navigator.hardwareConcurrency

    const core = new SX.Core(config)

    const api = {
      permittedClassNames:TradeXchart.permittedClassNames,
    }

    config.state = state

    // register the parent module which will build and control everything
    const instance = core.register(config.modID, TradeXchart, config, api)
    TradeXchart.#instances[cnt] = core
    return instance
  }

  /**
   * Destroy a chart instance, clean up and remove data
   * @static
   * @param {instance} chart 
   * @memberof TradeXchart
   */
  static destroy(chart) {
    if (chart.constructor.name === "TradeXchart") {
      chart.end()
      const inCnt = chart.inCnt;
      delete TradeXchart.#instances[inCnt];
    }
  }

  /**
   * Target element has been validated as a mount point, 
   * let's start building
   * @param {object} config - chart configuration
   */
  init(config) {
    this.#config = config
    this.#inCnt = config.cnt
    this.#modID = config.modID

    const id = (isObject(config) && isString(config.id)) ? config.id : null
    this.setID(id)
    // this.addTheme(config?.theme)

    this.mount()

    // process config
    if (isObject(config)) {
      for (const option in config) {
        if (option in this.props()) {
          this.props()[option](config[option])
        }
      }
    }

    // set default range
    this.getRange(null, null, {interval: this.#time.timeFrameMS, core: this})

    if (this.#range.Length > 1) {
      // now set user defined (if any) range
      const rangeStart = calcTimeIndex(this.#time, this.#rangeStartTS)
      const end = (rangeStart) ? 
        rangeStart + this.#rangeLimit :
        this.chartData.length - 1
      const start = (rangeStart) ? rangeStart : end - this.#rangeLimit
      this.#rangeLimit = end - start
      this.setRange(start, end)
    }

    // api - functions / methods, calculated properties provided by this module
    const api = {
      ...this.#mediator.api,
      ...{
        id: this.id,
        parent: this.#mediator,
        core: this,
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

        UtilsBar: this.UtilsBar,
        ToolsBar: this.ToolsBar,
        MainPane: this.MainPane,
        WidgetsG: this.WidgetsG,
        Chart: this.Chart,

        chartData: this.chartData,
        offChart: this.offChart,
        onChart: this.onChart,
        datasets: this.datasets,
        rangeLimit: this.rangeLimit,
        range: this.#range,
        updateRange: (pos) => this.updateRange(pos),
        indicators: this.indicators,
        time: this.time,

        settings: this.settings,
      }
    }


    this.#WidgetsG = this.#mediator.register("WidgetsG", WidgetsG, config, api)
    this.#UtilsBar = this.#mediator.register("UtilsBar", UtilsBar, config, api)
    this.#ToolsBar = this.#mediator.register("ToolsBar", ToolsBar, config, api)
    this.#MainPane = this.#mediator.register("MainPane", MainPane, config, api)

    api.Timeline = this.Timeline
    api.Chart = this.Chart

    this.log(`${this.#name} instantiated`)
  }

  /**
   * Start the chart processing events and displaying data
   * @memberof TradeXchart
   */
  start() {
    this.log("...processing state")

    this.#scrollPos = this.bufferPx * -1

    this.eventsListen()

    this.UtilsBar.start()
    this.ToolsBar.start()
    this.MainPane.start()
    this.WidgetsG.start()

    this.stream = this.#config.stream

    if (this.#delayedSetRange) 
      this.on(STREAM_UPDATE, this.delayedSetRange.bind(this))

    this.refresh()
  }

  /**
   * Stop all chart event processing and remove the chart from DOM.
   * In other words, destroy the chart.
   * @memberof TradeXchart
   */
  end() {
    this.log("...cleanup the mess")
    this.#elTXChart.removeEventListener('mousemove', this.onMouseMove)

    this.off(STREAM_UPDATE, this.onStreamUpdate)

    this.UtilsBar.end()
    this.ToolsBar.end()
    this.MainPane.end()
    this.WidgetsG.end()

    this.#workers.end()
    this.#state = null

    DOM.findByID(this.id).remove
  }

  eventsListen() {
    this.#elTXChart.addEventListener('mousemove', this.onMouseMove.bind(this))

    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this))
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

  onMouseMove(e) {
    this.#mousePos.x = e.clientX
    this.#mousePos.y = e.clientY
  }

  onStreamUpdate(candle) {
    const r = this.range
    // is candle visible?
    if (r.inRange(candle[0])) {
      const max = r.valueMax // * (1 - YAXIS_BOUNDS)
      const min = r.valueMin // * (1 + YAXIS_BOUNDS)
      // is candle testing display boundaries?
      if (candle[2] > max || candle[3] < min) {
        // recalculate range
        // TODO: instead of recalculate, update Range
        this.setRange(r.indexStart, r.indexEnd)

        this.emit("chart_yAxisRedraw", this.range)
      }
    }
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
    this.#elYAxis  = DOM.findBySelector(`#${this.id} .${CLASS_YAXIS}`)
    this.#elRows  = DOM.findBySelector(`#${this.id} .${CLASS_ROWS}`)
    this.#elTime  = DOM.findBySelector(`#${this.id} .${CLASS_TIME}`)
    this.#elWidgetsG = DOM.findBySelector(`#${this.id} .${CLASS_WIDGETSG}`)

    this.#elements = {
      elTXChart: this.#elTXChart,
      elUtils: this.#elUtils,
      elBody: this.#elBody,
      elTools: this.#elTools,
      elMain: this.#elMain,
      elRows: this.#elRows,
      elTime: this.#elTime,
      elWidgetsG: this.#elWidgetsG
    }
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
      rangeStartTS: (rangeStartTS) => this.#rangeStartTS = (isNumber(rangeStartTS)) ? rangeStartTS : undefined,
      rangeLimit: (rangeLimit) => this.#rangeLimit = (isNumber(rangeLimit)) ? rangeLimit : RANGELIMIT,
      indicators: (indicators) => this.#indicators = {...Indicators, ...indicators },
      theme: (theme) => {
        let t = this.addTheme(theme)
        this.setTheme(t.ID)
      },
      stream: (stream) => this.#stream = (isObject(stream)) ? stream : {},
      pricePrecision: (precision) => this.setPricePrecision(precision),
      volumePrecision: (precision) => this.setVolumePrecision(precision),
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

    this.#elTXChart.style.width = `${this.#chartW}px`
    this.#elUtils.style.width = `${this.#chartW}px`
    this.#elBody.style.width = `${this.#chartW}px`
    this.#elMain.style.width = `${this.#chartW - this.toolsW}px`
  }

  setHeight(h) {
    if (isNumber(h))
      this.#chartH = h
    else 
      this.#chartH = this.#el.parentElement.clientHeight
      
    this.#elTXChart.style.height = `${this.#chartH}px`
    this.#elBody.style.height = `${this.#chartH - this.utilsH}px`
    this.#elMain.style.height= `${this.#chartH - this.utilsH}px`
  }

  /**
   * Set chart width and height
   * @param {number} w - width in pixels
   * @param {number} h - height in pixels
   * @memberof TradeXchart
   */
  setDimensions(w, h) {
    let width = this.width
    let height = this.height
    this.setWidth(w)
    this.setHeight(h)

    this.emit("resize", {
      width: this.width,
      height: this.height,
      mainW: this.#MainPane.width,
      mainH: this.#MainPane.height,
      resizeW: w / width,
      resizeH: h / height,
      resizeWDiff: w - width,
      resizeHDiff: h - height
    })
  }

  setUtilsH(h) {
    this.utilsH = h
    this.#elUtils.style.height = `${h}px`
  }

  setToolsW(w) {
    this.toolsW = w
    this.#elTools.style.width = `${w}px`
  }

  /**
   * Set the price accuracy
   * @param {number} pricePrecision - Price accuracy
   * @memberof TradeXchart
   */
    setPricePrecision (pricePrecision) {
    if (!isNumber(pricePrecision) || pricePrecision < 0) {
      pricePrecision = PRICE_PRECISION
    }
    this.#pricePrecision = pricePrecision
  }

  /**
   * Set the volume accuracy
   * @param {number} volumePrecision - Volume accuracy
   * @memberof TradeXchart
   */
  setVolumePrecision (volumePrecision) {
    if (!isNumber(volumePrecision) || volumePrecision < 0) {
      volumePrecision = VOLUME_PRECISION
    }
    this.#volumePrecision = volumePrecision
  }

  /**
   * Add a theme to the chart,
   * if no current theme is set, make this the current one.
   * @param {object} volumePrecision - Volume accuracy
   * @memberof TradeXchart
   */
  addTheme(theme) {
    return Theme.create(theme, this)
  }

  /**
 * Set the chart theme
 * @param {object} volumePrecision - Volume accuracy
 * @memberof TradeXchart
 */
  setTheme(ID) {
    Theme.current = ID
    let chart = this.theme
    this.#elTXChart.style.background = chart.Background
    this.#elTXChart.style.border = `${chart.BorderThickness}px solid ${chart.BorderColour}`
  }

  setScrollPos(pos) {
    pos = Math.round(pos)
    if (isNumber(pos) && pos <= 0 && pos >= this.bufferPx * -1) this.#scrollPos = pos
    else {
      this.emit("Error", `setScrollPos: not a valid value`)
    }
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

  /**
   * specify a chart stream
   * @memberof TradeXchart
   * @param {object} stream 
   * @returns {instance}
   */
  setStream(stream) {
    if (this.stream?.constructor.name == "Stream") {
      this.error("Error: Invoke stopStream() before starting a new one.")
      return false
    }
    else if (isObject(stream)) {
      if (this.allData.data.length == 0 && isString(stream.timeFrame)) {
        ;({tf, ms} = isTimeFrame(stream?.timeFrame))
        this.#time.timeFrame = tf
        this.#time.timeFrameMS = ms
      }
      this.#stream = new Stream(this)
      return this.#stream
    }
  }

  stopStream() {
    if (this.stream.constructor.name == "Stream") {
      this.stream.stop()
    }
  }

  delayedSetRange() {
    while (this.#delayedSetRange) {
      let r = this.range
      let l = Math.floor((r.indexEnd - r.indexStart) / 2)
      this.setRange(l * -1, l)
      this.off(STREAM_UPDATE, this.delayedSetRange)
      this.#delayedSetRange = false
      this.refresh()
    }
  }

  defaultNode() {

    const STYLE_TXCHART = "overflow: hidden;"
      let STYLE_UTILS = "border-bottom: 1px solid;"
      let STYLE_BODY  = "position: relative;"
    const STYLE_TOOLS = "position: absolute; top: 0; left: 0; height: 100%; min-height: 100%; border-right: 1px solid;"
    const STYLE_MAIN  = "position: absolute; top: 0; height: 100%;";

    if (this.config?.tools?.none) this.toolsW = 0
    if (this.config?.utils?.none) {
      STYLE_UTILS = "border: none;"
      this.utilsH = 0
      STYLE_BODY += " margin-top: -1px;"
    }

    const toolsVis = (this.toolsW == 0)? "visibility: hidden;" : "visibility: visible;"
    const utilsVis = (this.utilsH == 0)? "visibility: hidden;" : "visibility: visible;"

    const classesTXChart = CLASS_DEFAULT+" "+this.#userClasses 
    const styleTXChart = STYLE_TXCHART + ` height: ${this.height}px; width: ${this.#chartW}px; background: ${this.chartBGColour}; color: ${this.chartTxtColour};`
    const styleUtils = STYLE_UTILS + ` height: ${this.utilsH}px; width: ${this.#chartW}px; border-color: ${this.chartBorderColour}; ${utilsVis}`
    const styleBody = STYLE_BODY + ` height: calc(100% - ${this.utilsH}px); width: ${this.#chartW}px;`
    const styleTools = STYLE_TOOLS + ` width: ${this.toolsW}px; border-color: ${this.chartBorderColour}; ${toolsVis}`
    const styleMain = STYLE_MAIN + ` left: ${this.toolsW}px; width: calc(100% - ${this.toolsW}px);`
    const styleWidgets = ` position: relative;`
    const styleScale = `position: absolute; top: 0; right: 0; width: ${this.scaleW}px; height: 100%;`
    
    const node = `
      <div id="${this.id}" class="${classesTXChart}" style="${styleTXChart}">
        <div class="${CLASS_UTILS}" style="${styleUtils}"></div>
        <div class="${CLASS_BODY}" style="${styleBody}">
          <div class="${CLASS_TOOLS}" style="${styleTools}"></div>
          <div class="${CLASS_MAIN}" style="${styleMain}"></div>
          <div class="${CLASS_YAXIS}" style="${styleScale}"></div>
        </div>
        <div class="${CLASS_WIDGETSG}" style="${styleWidgets}"></div>
      </div>
    `
    return node
  }

  setClasses(classes) {

  }

  /**
   * Calculate new range index / position from position difference
   * typically mouse drag or cursor keys
   * @param {array} pos - [x2, y2, x1, y1, xdelta, ydelta]
   */
  updateRange(pos) {

    let dist, offset, scrollPos
    offset = 0
    dist = pos[4]
    scrollPos = this.#scrollPos + dist

    if (scrollPos < this.bufferPx * -1) {
      scrollPos = 0
      offset = this.rangeScrollOffset * -1
      this.offsetRange(offset)
    }
    else if (scrollPos > 0) {
      scrollPos = this.bufferPx * -1
      offset = this.rangeScrollOffset
      this.offsetRange(offset)
    }

    this.#scrollPos = scrollPos
    // console.log("scrollPos:",this.#scrollPos)
  }

  offsetRange(offset) {
    let start = this.range.indexStart - offset,
        end = this.range.indexEnd - offset;

    this.setRange(start, end)
  }

  /**
   * initialize range
   * @param {number} start - index
   * @param {number} end - index
   * @memberof TradeXchart
   */
  getRange(start=0, end=0, config={}) {
    this.#range = new Range(this.allData, start, end, config)
    this.#range.interval = this.#time.timeFrameMS
    this.#range.intervalStr = this.#time.timeFrame
    this.#time.range = this.#range
  }

  /**
   * set start and end of range
   * @param {number} start - index
   * @param {number} end - index
   * @memberof TradeXchart
   */
  setRange(start=0, end=this.rangeLimit) {
    const max = (this.config?.maxCandles)? this.config.maxCandles : 
      (this.Chart?.layerWidth) ? this.Chart.layerWidth : this.Chart.width
    this.#range.set(start, end, max)
  }

  jumpToIndex(start, nearest=true, centre=true) {
    let length = this.range.Length
    let end = start + length

    if (nearest) start = limit(start, 0, this.range.dataLength)
    if (centre) {
      start -= length / 2
      end -= length / 2
    }
    this.setRange(start, end)
  }

  jumpToTS(ts, nearest=true, centre=true) {
    let start = this.Timeline.xAxis.t2Index(ts)
    this.jumpToIndex(start, nearest=true, centre=true)
  }

  jumpToStart(nearest=true, centre=true) {
    this.jumpToIndex(0, nearest=true, centre=true)
  }

  jumpToEnd(nearest=true, centre=true) {
    let end = this.range.dataLength - this.range.Length

    if (centre) end += this.range.Length / 2

    this.jumpToIndex(end, nearest=true, centre=false)
  }

  /**
   * Merge a block of data into the chart state.
   * Used for populating a chart with back history.
   * Merge data must be formatted to a Chart State.
   * Optionally set a new range upon merge.
   * @param {object} merge - merge data must be formatted to a Chart State
   * @param {boolean|object} newRange - false | {start: number, end: number}
   * @memberof TradeXchart
   */
  // TODO: merge indicator data?
  // TODO: merge dataset?
  mergeData(merge, newRange=false) {
    if (!isObject(merge)) return false

    let i, j, p=0, start, end;
    const data = this.allData.data
    const mData = merge?.data
    const inc = (this.range.inRange(mData[0][0])) ? 1 : 0

    if (isArray(mData) && mData.length > 0) {
      i = mData.length - 1
      j = data.length - 1

      if (data.length == 0) this.allData.data.push(...mData)
      else {
        const r1 = [data[0][0], data[j][0]]
        const r2 = [mData[0][0], mData[i][0]]
        const o = [Math.max(r1[0], r2[0]), Math.min(r1[1], r2[1])]

        // overlap between existing data and merge data
        if (o[1] >= o[0]) {
// TODO: merge with overlap
        }
        // no overlap, insert the new data
        else {
          this.allData.data.push(...mData)
        }
      }
    }

    if (newRange) {
      if (isObject(newRange)) {
        start = (isNumber(newRange.start)) ? newRange.start : this.range.indexStart
        end = (isNumber(newRange.end)) ? newRange.end : this.range.indexEnd
      }
      else {
        if (mData[0][0] )
        start = this.range.indexStart + inc
        end = this.range.indexEnd + inc
      }
      this.setRange(start, end)
    }

  }

  /**
   * Resize the chart
   * @memberof TradeXchart
   * @param {number} width - pixels
   * @param {number} height - pixels
   * @returns {boolean} - success or failure
   */
  resize(width, height) {
    if (!isNumber(width) && !isNumber(height)) return false

    this.setDimensions(width, height)
    return true
  }

  /**
   * refresh / redraw the chart
   * @memberof TradeXchart
   */
  refresh() {
    this.MainPane.draw()
    this.Chart.refresh()
    const offCharts = this.MainPane.offCharts
    offCharts.forEach((offChart, key) => {
      offChart.refresh()
    })
    // TODO: drawing tools
  }

  notImplemented() {
    if (!this.implemented) {
      let content = `
        This feature is not implemented yet.
      `;
      let config = { content }
      this.implemented = this.#WidgetsG.insert("Dialogue", config)
      this.implemented.start()
    }
    else this.implemented.open()
  }


}
