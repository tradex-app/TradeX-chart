// core.js
// it all begins here...

import * as packageJSON from '../package.json'
import { isArray, isBoolean, isFunction, isNumber, isObject, isString, isError, isPromise } from './utils/typeChecks'
import DOM from './utils/DOM'
import * as Time from './utils/time'
import { limit } from './utils/number'
import { isTimeFrame, SECOND_MS } from "./utils/time"
import { copyDeep, promiseState } from './utils/utilities'
import State from './state'
import { Range, calcTimeIndex } from "./model/range"
import StateMachine from './scaleX/stateMachne'
import Stream from './helpers/stream'
import Theme from "./helpers/theme"
import WebWorker from "./helpers/webWorkers"
import Indicators from './definitions/indicators'
import style, { CHART_MINH, CHART_MINW, cssVars, SCALEW, TIMEH, TOOLSW, UTILSH } from './definitions/style'
import Tradex_chart from "./components/views/tradeXchart"
import UtilsBar from './components/utils'
import ToolsBar from './components/tools'
import MainPane from './components/main'
import WidgetsG from './components/widgets'

import {
  NAME,
  ID,
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
export default class TradeXchart extends Tradex_chart {

  static #version = packageJSON.version
  static #cnt = 0
  static #cfg = {}
  static #instances = {}
  static #talibPromise = null
  static #talibReady = false
  static #talibAwait = []
  static #talibError = null
  static get version() { return TradeXchart.#version }
  static get talibPromise() { return TradeXchart.#talibPromise }
  static get talibReady() { return TradeXchart.#talibReady }
  static get talibAwait() { return TradeXchart.#talibAwait }
  static get talibError() { return TradeXchart.#talibError }
  static initErrMsg = `${NAME} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`
  static permittedClassNames = 
  ["TradeXchart","Chart","MainPane","OffChart","OnChart",
  "ScaleBar","Timeline","ToolsBar","UtilsBar","Widgets"]

  #id
  #name = NAME
  #shortName = NAME
  #el = undefined
  #mediator
  #core
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

  #ready = false
  #inCnt = null
  #modID
  #hub = {}
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
  #themeTemp

  chartWMin = CHART_MINW
  chartHMin = CHART_MINH
  chartW_Reactive = true
  chartH_Reactive = true
  chartBGColour = GlobalStyle.COLOUR_BG
  chartTxtColour = GlobalStyle.COLOUR_TXT
  chartBorderColour = GlobalStyle.COLOUR_BORDER

  utilsH = UTILSH
  toolsW = TOOLSW
  timeH  = TIMEH
  scaleW = SCALEW

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

  // console outputs
  logs = false
  infos = false
  warnings = false
  errors = false
  timer = false
  
  #scrollPos = 0
  #smoothScrollOffset = 0
  #panBeginPos = [null, null, null, null]
  #pointerPos = {x:0, y:0}
  #pointerButtons = [false, false, false]

  #workers
  #stream
  #candles
  #pricePrecision
  #volumePrecision

  #delayedSetRange = false

  /**
   * Create a new TradeXchart instance
   *
   * @static
   * @param {DOM_element} container - HTML element to mount the chart on
   * @param {object} [txCfg={}] - chart config
   * @param {object} state - chart state
   * @return {instance}  
   * @memberof TradeXchart
   */
    static create(txCfg={}) {

      // global init for all TradeX charts
      if (TradeXchart.#cnt == 0) {
        TradeXchart.#cfg.CPUCores = navigator.hardwareConcurrency
        TradeXchart.#cfg.api = {
          permittedClassNames:TradeXchart.permittedClassNames,
        }
      }

      if ((typeof txCfg.talib !== "object") || 
          // (txCfg.talib[Symbol.toStringTag] !== "Module") ||
          (typeof txCfg.talib.init !== "function")) {
            TradeXchart.#talibReady = false
            TradeXchart.#talibError = new Error(`${TradeXchart.initErrMsg}`)
          }

      // init TALib
      if (!TradeXchart.#talibReady && TradeXchart.#talibError === null)
      TradeXchart.#talibPromise = txCfg.talib.init(txCfg.wasm)
      TradeXchart.#talibPromise.then(
          () => { 
            TradeXchart.#talibReady = true;
            // process functions waiting for talibReady
            for (let c of TradeXchart.#talibAwait) {
              if (isFunction(c)) c()
            }
          },
          () => { TradeXchart.#talibReady = false }
        )
    }
  
    /**
     * Destroy a chart instance, clean up and remove data
     * @static
     * @param {instance} chart 
     * @memberof TradeXchart
     */
    static destroy(chart) {
      if (chart instanceof TradeXchart) {
        chart.end()
        const inCnt = chart.inCnt;
        delete TradeXchart.#instances[inCnt];
      }
    }
  
    static cnt() {
      return TradeXchart.#cnt++
    }

  /**
   * Creates an instance of TradeXchart.
   * @memberof TradeXchart
   */
  constructor () {
    super()
    this.#inCnt = TradeXchart.cnt()
    this.#id = `${ID}_${this.#inCnt}`

    console.warn(`!WARNING!: ${NAME} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`)
    console.log("TXC:",this.inCnt)

    this.oncontextmenu = window.oncontextmenu
    this.#workers = WebWorker
  }

  log(l) { if (this.logs) console.log(l) }
  info(i) { if (this.infos) console.info(i) }
  warning(w) { if (this.warnings) console.warn(w) }
  error(e) { if (this.errors) console.error(e) }
  time(n) { if (this.timer) console.time(n) }
  timeLog(n) { if (this.timer) console.timeLog(n) }
  timeEnd(n) { if (this.timer) console.timeEnd(n) }

  set id(id) { this.#id = id }
  get id() { return this.#id }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get config() { return this.#config }
  get core() { return this.#core }
  get inCnt() { return this.#inCnt }

  set elUtils(el) { this.#elUtils = el }
  get elUtils() { return this.#elUtils }
  set elTools(el) { this.#elTools = el }
  get elTools() { return this.#elTools }
  set elBody(el) { this.#elBody = el }
  get elBody() { return this.#elBody }
  set elMain(el) { this.#elMain = el }
  get elMain() { return this.#elMain }
  set elTime(el) { this.#elTime = el }
  get elTime() { return this.#elTime }
  set elYAxis(el) { this.#elYAxis = el }
  get elYAxis() { return this.#elYAxis }
  set elWidgetsG(el) { this.#elWidgetsG = el }
  get elWidgetsG() { return this.#elWidgetsG }

  get UtilsBar() { return this.#UtilsBar }
  get ToolsBar() { return this.#ToolsBar }
  get MainPane() { return this.#MainPane }
  get Timeline() { return this.#MainPane.time }
  get WidgetsG() { return this.#WidgetsG }
  get Chart() { return this.#MainPane.chart }
  get Indicators() { return this.#MainPane.indicators }

  get ready() { return this.#ready }
  get state() { return this.#state }
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
  get rangeLimit() { return (isNumber(this.#range.initialCnt)) ? this.#range.initialCnt : RANGELIMIT }
  get range() { return this.#range }
  get time() { return this.#time }
  get TimeUtils() { return Time }

  get theme() { return this.#theme }
  get settings() { return this.#state.data.chart.settings }
  get indicators() { return this.#indicators }
  get TALib() { return this.#TALib }
  get TALibReady() { return TradeXchart.talibReady }
  get TALibError() { return TradeXchart.talibError }
  get talibAwait() { return TradeXchart.talibAwait }
  get TALibPromise() { return TradeXchart.talibPromise }
  get hub() { return this.#hub }

  get candleW() { return this.Timeline.candleW }
  get candlesOnLayer() { return this.Timeline.candlesOnLayer }
  get buffer() { return this.MainPane.buffer }
  get bufferPx() { return this.MainPane.bufferPx }
  set scrollPos(pos) { this.setScrollPos(pos) }
  get scrollPos() { return this.#scrollPos }
  get smoothScrollOffset() { return 0 } //{ return this.#smoothScrollOffset }
  get rangeScrollOffset() { return Math.floor(this.bufferPx / this.candleW) }
  get mousePos() { return this.#pointerPos }
  get pointerButtons() { return this.#pointerButtons }

  get pricePrecision() { return this.#pricePrecision }
  get volumePrecision() { return this.#volumePrecision }

  set stream(stream) { return this.setStream(stream) }
  get stream() { return this.#stream }
  get worker() { return this.#workers }
  get isEmpty() { return this.#chartIsEmpty }
  set candles(c) { if (isObject(c)) this.#candles = c }
  get candles() { return this.#candles }

  /**
   * Target element has been validated as a mount point, 
   * let's start building
   * @param {object} txCfg - chart configuration
   */
  start(txCfg) {
    let initCfg = TradeXchart.create(txCfg)

    txCfg = {...initCfg, ...txCfg}
    this.logs = (txCfg?.logs) ? txCfg.logs : false
    this.infos = (txCfg?.infos) ? txCfg.infos : false
    this.warnings = (txCfg?.warnings) ? txCfg.warnings : false
    this.errors = (txCfg?.errors) ? txCfg.errors : false
    this.timer = (txCfg?.timer) ? txCfg.timer : false

    this.#config = txCfg
    this.#inCnt = txCfg.cnt || this.#inCnt
    this.#modID = txCfg.modID
    this.#TALib = txCfg.talib
    this.#el = this
    this.#core = this

    let state = copyDeep(txCfg?.state)
    let deepValidate = txCfg?.deepValidate || false
    let isCrypto = txCfg?.isCrypto || false
    this.#state = State.create(state, deepValidate, isCrypto)
    delete txCfg.state
    this.log(`Chart ${this.#id} created with a ${this.#state.status} state`)

    // time frame
    let tf = "1s"
    let ms = SECOND_MS
    this.#chartIsEmpty = true

    // is the chart empty - no data or stream
    if (!isObject(txCfg?.stream) && this.#state.data.chart.data.length < 2) {
      this.warning(`${NAME} has no chart data or streaming provided.`)
      // has a time frame been provided?
      ;({tf, ms} = isTimeFrame(txCfg?.timeFrame))
    }
    // is the chart streaming with an empty chart?
    else if (isObject(txCfg?.stream) && this.#state.data.chart.data.length < 2) {
      // has a time frame been provided?
      ;({tf, ms} = isTimeFrame(txCfg?.timeFrame))

      this.#delayedSetRange = true
    }
    // chart has back history and optionally streaming
    else {
      tf = this.#state.data.chart.tf 
      ms = this.#state.data.chart.tfms
      this.#chartIsEmpty = false
    }
    this.#time.timeFrame = tf
    this.#time.timeFrameMS = ms
    console.log("tf:",tf,"ms:",ms)

    const id = (isObject(txCfg) && isString(txCfg.id)) ? txCfg.id : null
    this.setID(id)
    this.classList.add(this.id)

    // process config
    if (isObject(txCfg)) {
      for (const option in txCfg) {
        if (option in this.props()) {
          this.props()[option](txCfg[option])
        }
      }
    }

    // set default range
    const rangeConfig = ("range" in txCfg) ? txCfg.range : {}
          rangeConfig.interval = this.#time.timeFrameMS
          rangeConfig.core = this
    this.getRange(null, null, rangeConfig)

    if (this.#range.Length > 1) {
      // now set user defined (if any) range
      const rangeStart = calcTimeIndex(this.#time, this.#config?.range?.startTS)
      const end = (rangeStart) ? 
        rangeStart + this.#range.initialCnt :
        this.chartData.length - 1
      const start = (rangeStart) ? rangeStart : end - this.#range.initialCnt
      this.#range.initialCnt = end - start
      this.setRange(start, end)
    }

    this.insertAdjacentHTML('beforebegin', `<style title="${this.id}_style"></style>`)

    this.#WidgetsG = new WidgetsG(this, {widgets: txCfg?.widgets})
    this.#UtilsBar = new UtilsBar(this, txCfg)
    this.#ToolsBar = new ToolsBar(this, txCfg)
    this.#MainPane = new MainPane(this, txCfg)

    this.setTheme(this.#themeTemp.ID)

    this.log(`${this.#name} V${TradeXchart.version} instantiated`)
    this.log("...processing state")

    this.#scrollPos = this.bufferPx * -1

    this.eventsListen()

    this.elStart(this.theme)
    this.elBody.start(this.theme)
    this.UtilsBar.start()
    this.ToolsBar.start()
    this.MainPane.start()
    this.WidgetsG.start()

    this.stream = this.#config.stream

    if (this.#delayedSetRange) 
      this.on(STREAM_UPDATE, this.delayedSetRange.bind(this))

    this.#ready = true
    this.refresh()
  }

  /**
   * Stop all chart event processing and remove the chart from DOM.
   * In other words, destroy the chart.
   * @memberof TradeXchart
   */
  end() {
    this.log("...cleanup the mess")
    this.removeEventListener('mousemove', this.onMouseMove)

    this.off(STREAM_UPDATE, this.onStreamUpdate)

    this.UtilsBar.end()
    this.ToolsBar.end()
    this.MainPane.end()
    this.WidgetsG.end()

    this.#workers.end()
    this.#state = null

    // DOM.findByID(this.id).remove
  }

  eventsListen() {
    this.addEventListener('mousemove', this.onMouseMove.bind(this))

    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this))
  }

  /** Subscribe to a topic
  *
  * @param {String} topic      - The topic name
  * @param {Function} callback - The function or method that is called
  * @param {Object}  context   - The context the function(s) belongs to
  */
   on(topic, handler, context) {
    if (!isString(topic) || !isFunction(handler)) return
    if (!this.#hub[topic]) this.#hub[topic] = [];
    this.#hub[topic].push({handler, context});
  }

  /** Unsubscribe from a topic
  *
  * @param {String} topic - The topic name
  * @param {Function} cb  - The function that is called if an other module
  *                         publishes to the specified topic
  */
  off(topic, handler) {
    if (!isString(topic)) return

    const i = (this.#hub[topic] || []).findIndex(h => h === handler);
    if (i > -1) this.#hub[topic].splice(i, 1);
    if (this.#hub[topic].length === 0) delete this.#hub[topic];
  }

  /** Publish an topic
  *
  * @param {String} topic - The topic name
  * @param {Object}  data - The data to publish
  */
  emit(topic, data) {
    if (!isString(topic)) return
    (this.#hub[topic] || []).forEach(cb => cb.handler.call(cb.context, data));
  }

  /** Execute a task
  *
  * @param {String} topic - The topic name
  * @param {Object} data    - The data that gets published
  * @param {Function} cb    - callback method
  */
  execute(channel, data, cb) {

  }

  onMouseMove(e) {
    this.#pointerPos.x = e.clientX
    this.#pointerPos.y = e.clientY
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

  props() {
    return {
      // id: (id) => this.setID(id),
      width: (width) => this.setWidth(width),
      height: (height) => this.setHeight(height),
      widthMin: (width) => this.setWidthMin(width),
      heightMin: (height) => this.setHeightMin(height),
      widthMax: (width) => this.setWidthMax(width),
      heightMax: (height) => this.setHeightMax(height),
      logs: (logs) => this.logs = (isBoolean(logs)) ? logs : false,
      infos: (infos) => this.infos = (isBoolean(infos)) ? infos : false,
      warnings: (warnings) => this.warnings = (isBoolean(warnings)) ? warnings : false,
      errors: (errors) => this.errors = (isBoolean(errors)) ? errors : false,
      indicators: (indicators) => this.setIndicators(indicators),
      theme: (theme) => { this.#themeTemp = this.addTheme(theme) },
      stream: (stream) => this.#stream = (isObject(stream)) ? stream : {},
      pricePrecision: (precision) => this.setPricePrecision(precision),
      volumePrecision: (precision) => this.setVolumePrecision(precision),
    }
  }

  getInCnt() { return this.#inCnt }

  setID(id) {
    if (isString(id)) 
      this.#id = id + this.#inCnt
    else 
      this.#id = ID + this.#inCnt
  }
  getID() { return this.#id }

  getModID() { return this.#modID }


  /**
   * Set chart width and height
   * @param {number} w - width in pixels
   * @param {number} h - height in pixels
   * @memberof TradeXchart
   */
  setDimensions(w, h) {
    const dims = super.setDimensions(w, h) 

    this.emit("global_resize", dims)
  }

  setUtilsH(h) {
    this.utilsH = h
    this.#elUtils.style.height = `${h}px`
  }

  setToolsW(w) {
    this.toolsW = w
    this.#elTools.style.width = `${w}px`
  }

  setNotEmpty() {
    this.#chartIsEmpty = false
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
   * @param {object} theme - Volume accuracy
   * @returns {instance} - theme instance
   * @memberof TradeXchart
   */
  addTheme(theme) {
    const t = Theme.create(theme, this)
    if (!(this.#theme instanceof Theme)) this.#theme = t
    return t
  }

  /**
 * Set the chart theme
 * @param {string} theme - theme identifier
 * @memberof TradeXchart
 */
  setTheme(ID) {

    if(!this.theme.list.has(ID)) return false

    this.#theme.setTheme(ID, this)
    const theme = this.#theme
    const style = document.querySelector(`style[title=${this.id}_style]`)
    const borderColour = `var(--txc-border-color, ${theme.chart.BorderColour}`

    let innerHTML = `.${this.id} { `

    // modify core style sheet custom CSS variables
    innerHTML +=`--txc-background: ${theme.chart.Background}; `

    // Chart component
    this.style.background = `var(--txc-background, ${theme.chart.Background})`
    this.style.border = `${theme.chart.BorderThickness}px solid`
    this.style.borderColor = borderColour

    // Main Pane
    innerHTML +=`--txc-border-color:  ${theme.chart.BorderColour}; `
    this.#elMain.rows.style.borderColor = borderColour

    // Timeline
    innerHTML += `--txc-time-scrollbar-color: ${theme.chart.BorderColour}; `
    innerHTML += `--txc-time-handle-color: ${theme.xAxis.handle}; `
    innerHTML += `--txc-time-slider-color: ${theme.xAxis.slider}; `
    innerHTML += `--txc-time-cursor-fore: ${theme.xAxis.colourCursor}; `
    innerHTML += `--txc-time-cursor-back: ${theme.xAxis.colourCursorBG}; `
    innerHTML += `--txc-time-icon-color: ${theme.icon.colour}; `
    innerHTML += `--txc-time-icon-hover-color: ${theme.icon.hover}; `

    this.#elTime.overview.scrollBar.style.borderColor = borderColour;
    this.#elTime.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${theme.xAxis.handle})`;

    this.#elTime.overview.style.setProperty("--txc-time-slider-color", theme.xAxis.slider);
    this.#elTime.overview.style.setProperty("--txc-time-icon-color", theme.icon.colour);
    this.#elTime.overview.style.setProperty("--txc-time-icon-hover-color", theme.icon.hover);

    // Legends
    for (let [key, legend] of Object.entries(this.Chart.legend.list)) {
      legend.el.style.color = `var(--txc-legend-color, ${theme.legend.colour})`
      legend.el.style.font = `var(--txc-legend-font, ${theme.legend.font})`
      // TODO: control icons
    }

    // Utils
    for (let t of this.#elUtils.icons) {
      if (t.className != "icon-wrapper") continue

      t.children[0].style.fill = theme.icon.colour
    }

    // Tools
    for (let t of this.#elTools.icons) {
      if (t.className != "icon-wrapper") continue

      t.children[0].style.fill = theme.icon.colour
    }

    innerHTML += ` }`
    style.innerHTML = innerHTML
  }

  setScrollPos(pos) {
    pos = Math.round(pos)
    if (isNumber(pos) && pos <= 0 && pos >= this.bufferPx * -1) this.#scrollPos = pos
    else {
      this.emit("Error", `setScrollPos: not a valid value`)
    }
  }

  /**
   * specify a chart stream
   * @memberof TradeXchart
   * @param {object} stream 
   * @returns {instance}
   */
  setStream(stream) {
    if (this.stream instanceof Stream) {
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
      this.#config.stream = this.#stream.config
      
      return this.#stream
    }
  }

  stopStream() {
    if (this.stream instanceof Stream) {
      this.stream.stop()
    }
  }

  /**
   * When chart is empty postpone range setting
   * until first candle, then position on last
   */
  delayedSetRange() {
    while (this.#delayedSetRange) {
      let l = this.range.Length * 0.5
      this.setRange(l * -1, l)
      // this.jumpToTS(this.range.value)
      this.off(STREAM_UPDATE, this.delayedSetRange)
      this.#delayedSetRange = false
    }
  }
  
  /**
   * Calculate new range index / position from position difference
   * typically mouse drag or cursor keys
   * @param {array} pos - [x2, y2, x1, y1, xdelta, ydelta]
   */
  updateRange(pos) {
    if (!isArray(pos) || !isNumber(pos[4]) || pos[4] == 0) return

    let dist, offset, scrollPos, r;

    dist = pos[4]
    scrollPos = this.#scrollPos + dist
    r = scrollPos % this.candleW

    if (scrollPos < this.bufferPx * -1) {
      scrollPos = 0
      this.offsetRange(this.rangeScrollOffset * -1)
    }
    else if (scrollPos > 0) {
      scrollPos = this.bufferPx * -1
      this.offsetRange(this.rangeScrollOffset)
    }

    this.#scrollPos = scrollPos
    this.emit("scrollUpdate", scrollPos)
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
  mergeData(merge, newRange=false, calc=true) {
    if (!isObject(merge)) return false

    let i, j, p=0, start, end;
    const data = this.allData.data
    const mData = merge?.data || false
    const onChart = this.allData?.onChart
    const mOnChart = merge?.onChart || false
    const offChart = this.allData?.offChart
    const mOffChart = merge?.offChart || false
    const dataset = this.allData?.dataset?.data
    const mDataset = merge?.dataset?.data || false
    const trades = this.allData?.trades?.data
    const mTrades = merge?.trades?.data || false
    const inc = (this.range.inRange(mData[0][0])) ? 1 : 0

    // Do we have price data?
    if (isArray(mData) && mData.length > 0) {
      i = mData.length - 1
      j = data.length - 1

      if (data.length == 0) {
        this.allData.data.push(...mData)
        if (calc) this.calcAllIndicators()
      }
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
          if (calc) this.calcAllIndicators()
      }
    }
/*
* chart will ignore any indicators in merge data
* for sanity reasons, instead will trigger 
* calculation for merged data for existing indicators

    // Do we have onChart indicators?
    if (isArray(mOnChart) && mOnChart.length > 0) {
      for (let o of mOnChart) {
        // if (o )
        if (isArray(o?.data) && o?.data.length > 0) {

        }
      }
    }

    // Do we have offChart indicators?
    if (isArray(mOffChart) && mOffChart.length > 0) {
      for (let o of mOffChart) {
        if (isArray(o?.data) && o?.data.length > 0) {

        }
      }
    }
*/
    // Do we have datasets?
    if (isArray(mDataset) && mDataset.length > 0) {
      for (let o of mDataset) {
        if (isArray(o?.data) && o?.data.length > 0) {

        }
      }
    }

    // Do we have trades?
    if (isArray(trades) && trades.length > 0) {
      for (let d of trades) {
        
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

  }

  /**
   * validate indicator
   * @param {class} i - indicator class
   */
  isIndicator(i) {
    if (
      typeof i === "function" &&
      // ("ID" in i) &&
      // isString(i?.name) &&
      // isString(i?.shortName) &&
      ("onChart" in i.prototype) &&
      isFunction(i.prototype?.draw)
    ) return true
    else return false
  }

  /**
   * import indicators
   * @param {object} i - indicators {id, name, event, ind}
   * @param {boolean} flush - expunge default indicators
   * @returns boolean
   */
  setIndicators(i, flush=false) {
    if (!isObject(i)) return false
    if (flush) {
      console.warn(`Expunging all default indicators!`)
      this.#indicators = {}
    }
    for (const [k, v] of Object.entries(i)) {
      if (
        isString(v?.id) && 
        isString(v?.name) && 
        isString(v?.event) && 
        this.isIndicator(v?.ind)
      ) {
        this.#indicators[k] = v
      }
    }
    return true
  }

  /**
   * add an indicator - default or registered user defined
   * @param {string} i - indicator
   * @param {string} name - identifier
   * @param {object} params - {settings, data}
   * @returns 
   */
  addIndicator(i, name=i, params={}) {
    console.log(`addIndicator() ${i}, ${name}, ${params}`)
    if (
      !isString(i) &&
      !(i in this.#indicators) &&
      !isString(name) &&
      !isObject(params)
    ) return false
    
    const indicator = {
      type: i,
      name: name,
      ...params
    }

    console.log(`Adding the ${name} : ${i} indicator`)

    if (this.#indicators[i].ind.onChart)
      this.Chart.addIndicator(indicator);
    else
      this.#MainPane.addIndicator(indicator);

    this.emit("addIndicatorDone", indicator)
  }

  /**
   * Does current chart state have indicator
   * @param {string} i - indicator id or name
   * @param {string} dataset 
   * @returns indicator or false
   */
  hasStateIndicator(i, dataset="searchAll") {
    if (!isString(i) || !isString(dataset)) return false

    const find = function(i, d) {
      for (let e of d) {
        if (e?.id == i || e.name == i) return true
        else return false
      }
    }
    let r

    if (dataset == "searchAll") {
      for (let d of this.allData) {
        if (find(i, d)) return true
      }
      return false
    }
    else {
      if (dataset in this.allData) {
        return find(i, d)
      }
    }
  }

  calcAllIndicators() {
    for (let i of this.Indicators.onchart.values()) {
      i.instance.calcIndicatorHistory()
    }
    for (let i of this.Indicators.offchart.values()) {
      i.instance.calcIndicatorHistory()
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
    if (!this.ready) return

    let start = this.range.indexStart
    let end = this.range.indexEnd
    this.setRange(start, end)
    this.MainPane.draw(undefined, true)
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

} // end class TradeXchart

// add global stylesheet for all charts
if (!window.customElements.get('tradex-chart')) {
  // insert global TradeX chart stylesheet
  document.head.insertAdjacentHTML("beforeend", cssVars)
  document.head.insertAdjacentHTML("beforeend", style)
// }
// else {
  // define <tradex-chart></tradex-chart>
  customElements.get('tradex-chart') || customElements.define('tradex-chart', TradeXchart)
}
