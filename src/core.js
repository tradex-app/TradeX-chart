// core.js

import * as talib from "talib-web"
import DOM from './utils/DOM'
import { isArray, isBoolean, isNumber, isObject, isString } from './utils/typeChecks'
import SX from './scaleX/scale'
import UtilsBar from './components/utils'
import ToolsBar from './components/tools'
import MainPane from './components/main'
import WidgetsG from './components/widgets'

import State from './state'
import { getRange, calcTimeIndex } from "./helpers/range"
import Indicators from './definitions/indicators'
import * as Time from './utils/time'
import Stream from './helpers/stream'


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
  PRICE_PRECISION,
  VOLUME_PRECISION,
  STREAM_LISTENING,
  STREAM_NEWVALUE,
  STREAM_UPDATE
} from './definitions/core'

import { YAXIS_BOUNDS } from "./definitions/chart"

import { GlobalStyle } from './definitions/style'
import { precision } from "./utils/number"

const STYLE_TXCHART = "overflow: hidden;"
const STYLE_UTILS = "border-bottom: 1px solid;"
const STYLE_BODY  = "position: relative;"
const STYLE_TOOLS = "position: absolute; top: 0; left: 0; height: 100%; min-height: 100%; border-right: 1px solid;"
const STYLE_MAIN  = "position: absolute; top: 0; height: 100%;";

// wait for talib wasm to initialize 
(async () => {
  await talib.init("node_modules/talib-web/lib/talib.wasm")
})();
export default class TradeXchart {


  static #cnt = 0
  static #instances = {}

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
  #elWidgetsG

  #inCnt = null
  #modID
  #state = {}
  #userClasses = []
  #data
  #range
  #rangeStartTS
  #rangeLimit = RANGELIMIT
  #indicators = Indicators
  #TALib = talib

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

  utilsH = 40
  toolsW = 45
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
  info = false
  warnings = false
  errors = false
  
  #mousePos = {x:0, y:0}
  #scrollPos = 0
  #smoothScrollOffset = 0
  #panBeginPos = [null, null, null, null]

  #stream
  #pricePrecision
  #volumePrecision


/**
 * Creates an instance of TradeXchart.
 * @param {instance} mediator
 * @param {object} [options={}]
 * @memberof TradeXchart
 */
constructor (mediator, options={}) {

    let container = options?.container,
        state = options?.state, 
        deepValidate = options?.deepValidate || false, 
        isCrypto = options?.isCrypto || false
    
    if (isString(container)) {
      if (container[0] === '#')
        container = DOM.findByID(container)
      else
        container = DOM.findBySelector(container)
    }

    if (DOM.isElement(container)) {
      this.#el = container
      this.#mediator = mediator
      this.#state = State.create(state, deepValidate, isCrypto)
      this.log(`Chart ${this.#id} created with a ${this.#state.status} state`)
      delete(options.state)

      this.#time.timeFrame = this.#state.data.chart.tf 
      this.#time.timeFrameMS = this.#state.data.chart.tfms

      this.init(options)
    }
    else this.error(`${NAME} cannot be mounted. Provided element does not exist in DOM`)
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
  get config() { return this.#config }
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
  get elWidgetsG() { return this.#elWidgetsG }

  get UtilsBar() { return this.#UtilsBar }
  get ToolsBar() { return this.#ToolsBar }
  get MainPane() { return this.#MainPane }
  get Timeline() { return this.#MainPane.time }
  get WidgetsG() { return this.#WidgetsG }
  get Chart() { return this.#MainPane.chart }

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

  get theme() { return this.#theme }
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

  get stream() { return this.#stream }



  /**
   * Create a new TradeXchart instance
   *
   * @static
   * @param {DOM element} container
   * @param {Object} [config={}]
   * @param {Object} state
   * @return {Instance}  
   * @memberof TradeXchart
   */
  static create(container, config={}, state) {
    const cnt = ++TradeXchart.#cnt

    config.cnt = cnt
    config.modID = `${ID}_${cnt}`
    config.container = container

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

  static destroy(chart) {
    if (chart.constructor.name === "TradeXchart") {
      const inCnt = chart.inCnt;
      delete TradeXchart.#instances[inCnt];
    }
  }

  /**
   * Target element has been validated as a mount point
   * let's start building
   */
  init(config) {
    this.#config = config
    this.#inCnt = config.cnt
    this.#modID = config.modID

    const id = (isObject(config) && isString(config.id)) ? config.id : null
    this.setID(id)

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
    this.setRange()
    // now set user defined (if any) range
    const rangeStart = calcTimeIndex(this.#time, this.#rangeStartTS)
    const end = (rangeStart) ? 
      rangeStart + this.#rangeLimit :
      this.chartData.length - 1
    const start = (rangeStart) ? rangeStart : end - this.#rangeLimit
    this.#rangeLimit = end - start
    this.setRange(start, end)

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

  start() {
    this.log("...processing state")

    this.#scrollPos = this.bufferPx * -1

    this.eventsListen()

    this.UtilsBar.start()
    this.ToolsBar.start()
    this.MainPane.start()
    this.WidgetsG.start()

    if (isObject(this.#config.stream)) this.#stream = new Stream(this)
  }

  end() {
    this.log("...cleanup the mess")
    removeEventListener('mousemove', this.onMouseMove)

    this.off(STREAM_UPDATE, this.onStreamUpdate)
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
      const max = r.priceMax // * (1 - YAXIS_BOUNDS)
      const min = r.priceMin // * (1 + YAXIS_BOUNDS)
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
      rangeStartTS: (rangeStartTS) => this.#rangeStartTS = (isNumber(rangeStartTS)) ? rangeStartTS : undefined,
      rangeLimit: (rangeLimit) => this.#rangeLimit = (isNumber(rangeLimit)) ? rangeLimit : RANGELIMIT,
      indicators: (indicators) => this.#indicators = {...Indicators, ...indicators },
      theme: (theme) => this.setTheme(theme),
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

    /**
   * Set the price accuracy
   * @param pricePrecision - Price accuracy
   */
     setPricePrecision (pricePrecision) {
      if (!isNumber(pricePrecision) || pricePrecision < 0) {
        pricePrecision = PRICE_PRECISION
      }
      this.#pricePrecision = pricePrecision
    }

    /**
     * Set the volume accuracy
     * @param volumePrecision - Volume accuracy
     */
    setVolumePrecision (volumePrecision) {
      if (!isNumber(volumePrecision) || volumePrecision < 0) {
        volumePrecision = VOLUME_PRECISION
      }
      this.#volumePrecision = volumePrecision
    }

  setTheme(theme) {
    // TODO: validation
    this.#theme = theme
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

  defaultNode() {

    const classesTXChart = CLASS_DEFAULT+" "+this.#userClasses 
    const styleTXChart = STYLE_TXCHART + ` height: ${this.height}px; width: ${this.#chartW}px; background: ${this.chartBGColour}; color: ${this.chartTxtColour};`
    const styleUtils = STYLE_UTILS + ` height: ${this.utilsH}px; width: ${this.#chartW}px; border-color: ${this.chartBorderColour};`
    const styleBody = STYLE_BODY + ` height: calc(100% - ${this.utilsH}px); width: ${this.#chartW}px;`
    const styleTools = STYLE_TOOLS + ` width: ${this.toolsW}px; border-color: ${this.chartBorderColour};`
    const styleMain = STYLE_MAIN + ` left: ${this.toolsW}px; width: calc(100% - ${this.toolsW}px);`
    const styleWidgets = ` position: relative;`
    
    const node = `
      <div id="${this.id}" class="${classesTXChart}" style="${styleTXChart}">
        <div class="${CLASS_UTILS}" style="${styleUtils}"></div>
        <div class="${CLASS_BODY}" style="${styleBody}">
          <div class="${CLASS_TOOLS}" style="${styleTools}"></div>
          <div class="${CLASS_MAIN}" style="${styleMain}">
          </div>
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
   * @returns 
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
  }

  offsetRange(offset) {
    let start = this.range.indexStart - offset,
        end = this.range.indexEnd - offset;

    this.setRange(start, end)
  }

  /**
   * set start and end of range
   * @param {number} start - index
   * @param {number} end - index
   */
  setRange(start=0, end=this.rangeLimit) {
    this.#range = getRange(this.allData, start, end)
    this.#range.interval = this.#time.timeFrameMS
    this.#range.intervalStr = this.#time.timeFrame
    this.#time.range = this.#range
  }

  /**
   * Merge a block of data into the chart state
   * used for populating a chart with back history
   * or updating with a live stream
   */
  mergeData(merge, newRange=false) {
    if (!isObject(merge)) return false

    let i, j, p=0, start, end;
    const data = this.allData.data
    const mData = merge?.data
    const inc = (this.range.inRange(mData[0][0])) ? 1 : 0

    if (isArray(mData) && mData.length > 0) {
      i = mData.length - 1
      j = data.length - 1

      if (data.length == 0) this.allData.data = mData
      else {
        const r1 = [data[0][0], data[j][0]]
        const r2 = [mData[0][0], mData[i][0]]
        const o = [Math.max(r1[0], r2[0]), Math.min(r1[1], r2[1])]

        // overlap between existing data and merge data
        if (o[1] >= o[0]) {

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



  resize(width, height) {
    if (!isNumber(width) && !isNumber(height)) return false

    this.setDimensions(width, height)
    return true
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
