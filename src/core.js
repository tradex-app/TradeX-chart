// core.js
// it all begins here...

import * as packageJSON from '../package.json'
import { isArray, isBoolean, isFunction, isNumber, isObject, isString, isError, isPromise } from './utils/typeChecks'
import * as Time from './utils/time'
import { limit } from './utils/number'
import { isTimeFrame, SECOND_MS } from "./utils/time"
import { copyDeep, uid } from './utils/utilities'
import State from './state'
import { Range, calcTimeIndex } from "./model/range"
import StateMachine from './scaleX/stateMachne'
import Stream from './helpers/stream'
import Theme from "./helpers/theme"
import WebWorker from "./helpers/webWorkers"
import Tradex_chart from "./components/views/tradeXchart"
import UtilsBar from './components/utils'
import ToolsBar from './components/tools'
import MainPane from './components/main'
import WidgetsG from './components/widgets'

import { NAME, SHORTNAME, ID, RANGELIMIT, PRICE_PRECISION, VOLUME_PRECISION, STREAM_UPDATE } from './definitions/core'
import style, { GlobalStyle, CHART_MINH, CHART_MINW, cssVars, SCALEW, TIMEH, TOOLSW, UTILSH } from './definitions/style'
import Indicators from './definitions/indicators'
import Indicator from './components/overlays/indicator'
import exportImage from './utils/exportImage'

/**
 * The root class for the entire chart
 * @class TradeXchart
 * @extends Tradex_chart
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
  /** @returns {string} - return TradeX Chart version number */
  static get version() { return TradeXchart.#version }
  static get talibPromise() { return TradeXchart.#talibPromise }
  static get talibReady() { return TradeXchart.#talibReady }
  static get talibAwait() { return TradeXchart.#talibAwait }
  static get talibError() { return TradeXchart.#talibError }
  static #initErrMsg = `${NAME} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`
  static #permittedClassNames = 
  ["TradeXchart","Chart","MainPane","Secondary","Primary",
  "ScaleBar","Timeline","ToolsBar","UtilsBar","Widgets"]

  #name = NAME
  #shortName = SHORTNAME
  #core
  #config
  #options
  #el
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
  #hub = {}
  #State = State
  #state
  #range
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
    range: {},
    timeFrameMS: 0,
    timeFrame: `undefined`,
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
  #pointerPos = {x:0, y:0}
  #pointerButtons = [false, false, false]

  #progress
  #workers
  #stream
  #candles
  #pricePrecision
  #volumePrecision

  #delayedSetRange = false
  #mergingData = false

  /**
   * Create a new TradeXchart instance
   * @static
   * @param {DOM_element} container - HTML element to mount the chart on
   * @param {Object} [txCfg={}] - chart config
   * @param {Object} state - chart state
   * @returns {instance} TradeXchart
   * @memberof TradeXchart
   */
    static create(txCfg={}) {

      // global init for all TradeX charts
      if (TradeXchart.#cnt == 0) {
        TradeXchart.#cfg.CPUCores = navigator.hardwareConcurrency
        TradeXchart.#cfg.api = {
          permittedClassNames:TradeXchart.#permittedClassNames,
        }
      }

      if ((typeof txCfg.talib !== "object") || 
          // (txCfg.talib[Symbol.toStringTag] !== "Module") ||
          (typeof txCfg.talib.init !== "function")) {
            TradeXchart.#talibReady = false
            TradeXchart.#talibError = new Error(`${TradeXchart.#initErrMsg}`)
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
 
    /**
     * @private
     * @returns {number}
     */
    static cnt() {
      return TradeXchart.#cnt++
    }

  /**
   * Creates an instance of TradeXchart.
   * @private
   */
  constructor () {
    super()
    this.#inCnt = TradeXchart.cnt()
    // this.#id = `${ID}_${this.#inCnt}`

    console.warn(`!WARNING!: ${NAME} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`)
    this.log(`${SHORTNAME} instance count: ${this.inCnt}`)

    this.oncontextmenu = window.oncontextmenu
    this.#workers = WebWorker
  }

  log(l) { if (this.logs) console.log(l) }
  info(i) { if (this.infos) console.info(i) }
  warn(w) { if (this.warnings) console.warn(w) }
  error(e) { if (this.errors) console.error(e) }
  time(n) { if (this.timer) console.time(n) }
  timeLog(n) { if (this.timer) console.timeLog(n) }
  timeEnd(n) { if (this.timer) console.timeEnd(n) }

  /** @returns {string} - user defined chart name */
  get name() { return this.#name }

  /** @returns {string} - user defined short chart name */
  get shortName() { return this.#shortName }

  get options() { return this.#options }

  /** @returns {object} - current chart configuration including defaults */
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

  /** @returns {object} - primary chart pane - displays price history (candles) */
  get Chart() { return this.#MainPane.chart }

  /** @returns {Map} - all chart panes, primary and secondary */
  get ChartPanes() { return this.#MainPane.chartPanes }

  /** @returns {object} - all chart indicators in use, grouped by chart panes */
  get Indicators() { return this.#MainPane.indicators }

  get ready() { return this.#ready }

  /** @returns {State} - current state instance */
  get state() { return this.#state }

  /** @returns {object} - all state datasets */
  get allData() {
    return {
      data: this.state.data.chart.data,
      primaryPane: this.state.data.secondary,
      secondaryPane: this.state.data.secondary,
      datasets: this.state.data.datasets
    }
  }
  get rangeLimit() { return (isNumber(this.#range.initialCnt)) ? this.#range.initialCnt : RANGELIMIT }
  get range() { return this.#range }
  get time() { return this.#time }
  get TimeUtils() { return Time }

  get theme() { return this.#theme }
  get settings() { return this.state.data.chart.settings }
  get indicatorClasses() { return this.#indicators }
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
  get isEmpty() { return this.#state.IsEmpty }
  set candles(c) { if (isObject(c)) this.#candles = c }
  get candles() { return this.#candles }
  get progress() { return this.#progress }

  /**
   * let's start building the chart
   * @param {Object} cfg - chart configuration
   */
  start(cfg) {
    this.log(`${NAME} configuring...`)

    TradeXchart.create(cfg)

    const txCfg = {...cfg}
    this.logs = (txCfg?.logs) ? txCfg.logs : false
    this.infos = (txCfg?.infos) ? txCfg.infos : false
    this.warnings = (txCfg?.warnings) ? txCfg.warnings : false
    this.errors = (txCfg?.errors) ? txCfg.errors : false
    this.timer = (txCfg?.timer) ? txCfg.timer : false
    this.#config = txCfg
    this.#inCnt = txCfg.cnt || this.#inCnt
    this.#TALib = txCfg.talib
    this.#el = this
    this.#core = this

    const id = (isString(txCfg?.id)) ? txCfg.id : null
    this.setID(id)
    this.classList.add(this.id)

    this.log("processing state...")

    let state = copyDeep(txCfg?.state) || {}
        state.id = this.id
        state.core = this
    let deepValidate = txCfg?.deepValidate || false
    let isCrypto = txCfg?.isCrypto || false
    // create default state
    this.#state = this.#State.create(state, deepValidate, isCrypto)
    delete txCfg.state
    this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`)

    // time frame
    let tf = "1s"
    let ms = SECOND_MS

    // is the chart empty - no data or stream
    if (!isObject(txCfg?.stream) && this.state.data.chart.data.length < 2) {
      this.warn(`${NAME} has no chart data or streaming provided.`)
      // has a time frame been provided?
      ;({tf, ms} = isTimeFrame(txCfg?.timeFrame))
    }
    // is the chart streaming with an empty chart?
    else if (isObject(txCfg?.stream) && this.state.data.chart.data.length < 2) {
      // has a time frame been provided?
      ;({tf, ms} = isTimeFrame(txCfg?.timeFrame))

      this.#delayedSetRange = true
    }
    // chart has back history and optionally streaming
    else {
      tf = this.state.data.chart.tf 
      ms = this.state.data.chart.tfms
    }
    this.log(`tf: ${tf} ms: ${ms}`)

    this.#config.callbacks = this.#config.callbacks || {}

    // process config
    if (isObject(txCfg)) {
      for (const option in txCfg) {
        if (option in this.props()) {
          this.props()[option](txCfg[option])
        }
      }
    }

    // set default range
    const rangeConfig = (isObject(txCfg?.range)) ? txCfg.range : {}
          rangeConfig.interval = ms
          rangeConfig.core = this
    this.getRange(null, null, rangeConfig)

    if (this.#range.Length > 1) {
      // now set user defined (if any) range
      const rangeStart = calcTimeIndex(this.#time, this.#config?.range?.startTS)
      const end = (isNumber(rangeStart)) ? 
        rangeStart + this.#range.initialCnt :
        this.allData.data.length - 1
      const start = (isNumber(rangeStart)) ? rangeStart : end - this.#range.initialCnt
      this.#range.initialCnt = end - start
      this.setRange(start, end)

      if (txCfg.range?.center)
        this.jumpToIndex(start, true, true)
    }

    this.insertAdjacentHTML('beforebegin', `<style title="${this.id}_style"></style>`)

    this.#WidgetsG = new WidgetsG(this, {widgets: txCfg?.widgets})
    this.#UtilsBar = new UtilsBar(this, txCfg)
    this.#ToolsBar = new ToolsBar(this, txCfg)
    this.#MainPane = new MainPane(this, txCfg)

    this.setTheme(this.#themeTemp.id)

    this.log(`${this.#name} V${TradeXchart.version} configured and running...`)

    this.#scrollPos = this.bufferPx * -1

    this.eventsListen()

    this.elStart(this.theme)
    this.elBody.start(this.theme)
    this.UtilsBar.start()
    this.ToolsBar.start()
    this.MainPane.start()
    this.WidgetsG.start()

    this.#progress = this.WidgetsG.insert("Progress", {})

    this.stream = this.#config.stream

    if (this.#delayedSetRange) 
      this.on(STREAM_UPDATE, this.delayedSetRange, this)

    this.#ready = true
    this.refresh()
  }

  /**
   * Stop all chart event processing and remove the chart from DOM.
   * In other words, destroy the chart.
   * @memberof TradeXchart
   */
  destroy() {
    this.log("...cleanup the mess")
    this.removeEventListener('mousemove', this.onMouseMove)
    this.#hub = null

    this.UtilsBar.destroy()
    this.ToolsBar.destroy()
    this.MainPane.destroy()
    this.WidgetsG.destroy()

    this.#workers.end()
    this.#State = null

    // DOM.findByID(this.id).remove
  }

  /**
   * @private
   */
  eventsListen() {
    this.addEventListener('mousemove', this.onMouseMove.bind(this))

    this.on(STREAM_UPDATE, this.onStreamUpdate, this)
    // this.on("range_limitPast", () => this.#progress.start())
    this.on("state_mergeComplete", () => this.#progress.stop())
  }

  /** 
  * Subscribe to a topic
  * @param {string} topic      - The topic name
  * @param {function} handler - The function or method that is called
  * @param {Object}  context   - The context the function(s) belongs to
  * @returns {boolean}
  */
   on(topic, handler, context) {
    if (!isString(topic) || !isFunction(handler)) return false
    if (!this.#hub[topic]) this.#hub[topic] = [];
    this.#hub[topic].push({handler, context});
    return true
  }

  /** 
  * Unsubscribe from a topic
  * @param {string} topic - The topic name
  * @param {function} handler  - function to remove
  * @returns {boolean}
  */
  off(topic, handler) {
    if (!isString(topic) || 
        !isFunction(handler) ||
        !(topic in this.#hub)
        ) return false

    for (let i=0; i<this.#hub[topic].length; i++) {
      if (this.#hub[topic][i].handler === handler) {
        this.#hub[topic].splice(i, 1);
        if (this.#hub[topic].length === 0) {
          delete this.#hub[topic];
          break
        }
      }
    }
    return true
  }

  /**
  * Publish a topic
  * @param {string} topic - The topic name
  * @param {Object}  data - The data to publish
  * @returns {boolean}
  */
  emit(topic, data) {
    if (!isString(topic)) return
    (this.#hub[topic] || []).forEach(cb => cb.handler.call(cb.context, data));
  }

  /**
  * Execute a task
  * @param {string} topic - The topic name
  * @param {Object} data    - The data that gets published
  * @param {function} cb    - callback method
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
        // update range
        // TODO: instead of recalculate, update Range
        this.setRange(r.indexStart, r.indexEnd)
        // trigger chart to redraw the scale (yAxis)
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
      this.id = id
    else 
      this.id = `${uid( SHORTNAME )}_${this.#inCnt}`
  }

  /**
   * set chart title
   * @param {string} t - title displayed top left before OHLCV
   */
  setTitle(t) {
    this.Chart.setTitle(t)
  }

  /**
   * set chart watermark
   * @param {Object} w - {text, imgURL: URL | data:URL}
   */
  setWatermark(w) {
    this.Chart.setWatermark(w)
  }

  /**
   * Set chart width and height
   * @param {number} w - width in pixels
   * @param {number} h - height in pixels
   * @memberof TradeXchart
   */
  setDimensions(w, h) {
    const dims = super.setDimensions(w, h) 

    // reposition menus
    if (this.#WidgetsG instanceof WidgetsG) {
      for (let i in this.#WidgetsG.instances) {
        if (i.type === "Menu") 
          i.position()
      }
    }

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
   * @param {Object} theme - Volume accuracy
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
 * @returns {boolean}
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

    return true
  }

  setScrollPos(pos) {
    pos = Math.round(pos)
    if (isNumber(pos) && pos <= 0 && pos >= this.bufferPx * -1) this.#scrollPos = pos
    else {
      this.emit("Error", `setScrollPos: not a valid value`)
    }
  }

  /**
   * 
   * @param {string} key - state id
   * @returns 
   */
  setState(key) {
    // invalid state id
    if (!State.has(key)) {
      this.warn(`${this.name} id: ${this.id} : Specified state does not exist`)
      return false
    }

    // same as current state, nothing to do
    if (key === this.key) return true
    
    // stop any streams
    this.stream.stop()
    // clean up panes
    this.MainPane.reset()
    // set chart to use state
    this.#state = State.get(key)
    // create new Range
    const rangeConfig = {
      interval: this.#state.data.chart.tfms,
      core: this
    }
    this.getRange(null, null, rangeConfig)

    // set Range
    if (this.range.Length > 1) {
      const rangeStart = calcTimeIndex(this.time, undefined)
      const end = (rangeStart) ? 
        rangeStart + this.range.initialCnt :
        this.#state.data.chart.data.length - 1
      const start = (rangeStart) ? rangeStart : end - this.range.initialCnt
      this.range.initialCnt = end - start
      this.setRange(start, end)
    }

    // rebuild chart
    this.MainPane.restart()

    this.refresh()
  }

  /**
   * validate and register a chart state
   * @param {Object} state 
   * @param {boolean} deepValidate - validate every entry rather than a sample
   * @param {boolean} isCrypto - validate time stamps against BTC genesis block
   * @returns {State} - State instance
   */
  createState(state, deepValidate, isCrypto) {
    return this.state.create(state, deepValidate, isCrypto)
  }

  /**
   * delete a current or stored chart state
   * @param {string} key - state id
   * @returns {boolean}
   */
  deleteState(key) {
    return this.state.delete(key)
  }

  /**
   * export state as an object
   * @param {string} key - state id
   * @param {Object} config 
   * @returns {Object}
   */
  exportState(key=this.key, config={}) {
    return this.state.export(key=this.key, config={})
  }

  /**
   * specify a chart stream
   * @memberof TradeXchart
   * @param {Object} stream 
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
        this.range.interval = ms
        this.range.intervalStr = tf
        this.#time.timeFrameMS = ms
        this.#time.timeFrame = tf
      }

      this.#stream = new Stream(this)
      this.#config.stream = this.#stream.config
      
      return this.#stream
    }
  }

  /**
   * stop a chart stream
   * will halt any updates to price or indicators
   */
  stopStream() {
    if (this.stream instanceof Stream) {
      this.stream.stop()
    }
  }

  /**
   * When chart is empty postpone range setting
   * until first candle, then position on last
   * @private
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
   * @private
   * @param {Array.<number>} pos - [x2, y2, x1, y1, xdelta, ydelta]
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
    this.#range = new Range(start, end, config)
    this.#time.range = this.#range
    this.#time.timeFrameMS = this.#range.interval
    this.#time.timeFrame = this.#range.intervalStr
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

    if (start < 0 && !this.#mergingData) 
      this.emit("range_limitPast", {chart: this, start, end})
    else if (end > this.range.dataLength && !this.#mergingData) 
      this.emit("range_limitFuture", {chart: this, start, end})
  }

  /**
   * set Range start index
   * @param {number} start - starting index of state data
   * @param {boolean} limited - limit the range start to in bounds values of the data history
   * @param {boolean} center - center the range on the start value
   */
  jumpToIndex(start, limited=true, center=true) {
    if (limited) start = limit(start, 0, this.range.dataLength)
    
    let length = this.range.Length
    let end = start + length

    if (center) {
      start -= length / 2
      end -= length / 2
    }
    this.setRange(start, end)
  }

  /**
   * set Range start to time stamp
   * @param {number} ts - timestamp
   * @param {boolean} limited - limit the range start to in bounds values of the data history
   * @param {boolean} center - center the range on the start value
   */
  jumpToTS(ts, limited=true, center=true) {
    let start = this.Timeline.xAxis.t2Index(ts)
    this.jumpToIndex(start, limited, center)
  }

  /**
   * set Range start to state data start
   * @param {boolean} center - center the range on the start value
   */
  jumpToStart(center=false) {
    this.jumpToIndex(0, true, center)
  }

  /**
   * set Range start to state data end
   * @param {boolean} center - center the range on the end value
   */
  jumpToEnd(center=true) {
    let end = this.range.dataLength - this.range.Length
    if (center) end += this.range.Length / 2
    this.jumpToIndex(end, true, false)
  }

  /**
   * Merge a block of data into the chart state.
   * Used for populating a chart with back history.
   * Merge data must be formatted to a Chart State.
   * Optionally set a new range upon merge.
   * @param {Object} merge - merge data must be formatted to a Chart State
   * @param {boolean|object} newRange - false | {start: number, end: number}
   * @param {boolean} calc - automatically calculate indicator data (ignore any existing)
   */
  // TODO: merge dataset?
  mergeData(merge, newRange=false, calc=false) {
    this.#mergingData = true
    let m = this.state.mergeData(merge, newRange, calc)
    if (isBoolean(m)) this.#mergingData = false
    return m
  }

  /**
   * validate indicator
   * @param {class} i - indicator class
   * @returns {boolean}
   */
  isIndicator(i) {
    if (
      typeof i === "function" &&
      // ("ID" in i) &&
      // isString(i?.name) &&
      // isString(i?.shortName) &&
      ("primaryPane" in i.prototype) &&
      isFunction(i.prototype?.draw)
    ) return true
    else return false
  }

  /**
   * import Indicators
   * @param {Object} i - indicators {id, name, event, ind}
   * @param {boolean} flush - expunge default indicators
   * @returns {boolean}
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
   * @param {Object} params - {settings, data}
   * @returns {Indicator|false} - indicator instance or false
   */
  addIndicator(i, name=i, params={}) {
    return this.#MainPane.addIndicator(i, name, params)
  }

  /**
   * retrieve indicator by ID
   * @param {string} i - indicator ID
   * @returns {Indicator|false} - indicator instance or false
   */
  getIndicator(i) {
    return this.#MainPane.getIndicator(i)
  }

  /**
   * remove an indicator - default or registered user defined
   * @param {string|Indicator} i - indicator id or Indicator instance
   * @returns {boolean} - success / failure
   */
  removeIndicator(i) {
    return this.#MainPane.removeIndicator(i)
  }

  /**
   * set or get indicator settings
   * @param {string|Indicator} i - indicator id or Indicator instance
   * @param {Object} s - settings
   * @returns {Object} - settings
   */
  indicatorSettings(i, s) {
    return this.#MainPane.indicatorSettings(i, s)
  }

  /**
   * Does current chart state have indicator
   * @param {string} i - indicator id or name
   * @param {string} dataset -
   * @returns {Indicator|false}
   */
  hasStateIndicator(i, dataset="searchAll") {
    if (!isString(i) || !isString(dataset)) return false

    const find = function(i, d) {
      for (let e of d) {
        if (e?.id == i || e?.name == i) return true
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

  /**
   * calculate all indicators currently in use
   */
  calcAllIndicators() {
    for (const [key, value] of Object.entries(this.Indicators)) {
      for (const [k, ind] of Object.entries(value)) {
        ind.instance.calcIndicatorHistory()
      }
    }
  }

  /**
   * Add a trade entry to the chat
   * @param {Object} t - trade entry
   * @returns {boolean}
   */
  addTrade(t) {
    return this.#State.addTrade(t)    
  }

  /**
   * 
   * @param {object} t - trade
   * @returns {boolean}
   */
  removeTrade(t) {
    return this.#State.removeTrade(t)
  }

  /**
   * Add a event entry to the chat
   * @param {Object} e - event entry
   * @returns {boolean}
   */
  addEvent(e) {
    return this.#State.addEvent(e)    
  }

  /**
   * 
   * @param {object} e
   * @returns {boolean}
   */
  removeEvent(e) {
    return this.#State.removeEvent(e)
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

  /**
   * Create a chart image snapshot as a data URL to use as an image source
   * @param {function} cb - callback function to receive the generated data URL
   */
  toImageURL(cb, type, quality) {
    exportImage(this, cb, type, quality, "url")
  }

  /**
   * download image snapshot of the chart
   */
  downloadImage(fileName=`${this.id}.png`, type, quality) {
    exportImage(this, fileName, type, quality, "download")
  }

  notImplemented() {
    if (!this.implemented) {
      let content = `
        This feature is not implemented yet.
      `;
      let config = { 
        content,
        styles: {
          content: {padding: "1em"}
        }
      }
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
