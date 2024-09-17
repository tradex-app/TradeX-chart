// chart.js
// Chart - where most of the magic happens
// base class provides primaryPane and secondaryPane
// Providing: the playground for price movements, indicators and drawing tools

import Component from "./component"
import { elementDimPos } from "../utils/DOM";
import { limit } from "../utils/number"
import { isArray, isBoolean, isFunction, isNumber, isObject, isString } from "../utils/typeChecks";
import { copyDeep, cyrb53, idSanitize, xMap } from "../utils/utilities";
import CEL from "./primitives/canvas";
import Legends from "./primitives/legend"
import Graph from "./views/classes/graph"
import StateMachine from "../scaleX/stateMachne";
import stateMachineConfig from "../state/state-chartPane"
import Input from "../input"
import ScaleBar from "./scale"
import watermark from "./overlays/chart-watermark"
import chartGrid from "./overlays/chart-grid"
import chartCursor from "./overlays/chart-cursor"
import chartVolume from "./overlays/chart-volume"
import chartCandles from "./overlays/chart-candles"
import chartCandleStream from "./overlays/chart-candleStream"
import chartHighLow from "./overlays/chart-highLow";
import chartNewsEvents from "./overlays/chart-newsEvents";
import chartTrades from "./overlays/chart-trades"
import chartTools from "./overlays/chart-tools";
import {
  STREAM_ERROR,
  STREAM_NONE,
  STREAM_LISTENING,
  STREAM_STOPPED,
  STREAM_FIRSTVALUE,
  STREAM_NEWVALUE,
  STREAM_UPDATE,
  SHORTNAME,
} from "../definitions/core";
import { 
  BUFFERSIZE, 
  YAXIS_TYPE, 
  COLLAPSEDHEIGHT 
} from "../definitions/chart";
import { VolumeStyle } from "../definitions/style"
import Indicator, { indicatorHashKey } from "./overlays/indicator";


export const defaultOverlays = {
  primaryPane: [
    ["watermark", {class: watermark, fixed: true, required: true, params: {content: null}}],
    ["grid", {class: chartGrid, fixed: true, required: true, params: {axes: "y"}}],
    ["candles", {class: chartCandles, fixed: false, required: true}],
    ["hiLo", {class: chartHighLow, fixed: true, required: false}],
    ["stream", {class: chartCandleStream, fixed: false, required: true}],
    // ["tools", {class: chartTools, fixed: false, required: true}],
    ["cursor", {class: chartCursor, fixed: true, required: true}]
  ],
  secondaryPane: [
    ["grid", {class: chartGrid, fixed: true, required: true, params: {axes: "y"}}],
    // ["tools", {class: chartTools, fixed: false, required: true}],
    ["cursor", {class: chartCursor, fixed: true, required: true}]
  ]
}
export const optionalOverlays = {
  primaryPane: {
    "trades": {class: chartTrades, fixed: false, required: false},
    "events": {class: chartNewsEvents, fixed: false, required: false},
    "volume": {class: chartVolume, fixed: false, required: true, params: {maxVolumeH: VolumeStyle.ONCHART_VOLUME_HEIGHT}},
  },
  secondaryPane: {
    "candles": {class: chartCandles, fixed: false, required: true},
  }
}

const chartLegend = {
  id: "chart",
  title: "",
  type: "chart",
  parent: undefined,
  source: () => {},
  visible: true
}

const chartTypes = [ "primary", "secondary" ]

export default class Chart extends Component{

  static #cnt = 0
  static get cnt() { return Chart.#cnt++ }

  #id;
  #name
  #shortName
  #title;
  #chartCnt
  #type               // primary, secondary
  #status = "idle"
  #collapsed = {
    state: false,
    height: null,
    rowsHeight: null,
    rowsCnt: 1
  }

  #elTarget;
  #elScale;

  #Scale;
  #Time;
  #Legends;
  #Divider;
  #Stream;
  #ConfigDialogue;

  #streamCandle

  #view
  #viewport;
  #layersTools = new xMap();
  #overlayTools = new xMap();

  #cursorPos = [0, 0];
  #cursorActive = false;
  #cursorClick;

  #input

  #yAxisType

  // localRange required by secondaryPane scale
  #localRange = {
    valueMax: 110,
    valueMin: -10,
    valueDiff: 120
  }

  #indicatorDeleteList = {}

  constructor(core, options={}) {

    super(core, options)

    this.#chartCnt = Chart.cnt

    if (!isObject(options)) throw new Error(`TradeX-Chart : id: ${core.id} : Chart (pane) constructor failed: Expected options typeof object`)

    this.#name = this.options.name
    this.#shortName = this.options.shortName
    this.#title = this.options.title
    this.#type = (this.options.type == "primary") ? "primaryPane" : "secondaryPane"
    this.#view = this.options.view
    this.#elScale = this.options.elements.elScale;
    this.#elTarget = this.options.elements.elTarget;
    this.#elTarget.id = this.id

    // set up legends
    this.legend = new Legends(this.elLegend, this)

    if (this.isPrimary) {
      chartLegend.type = "chart"
      chartLegend.title = `${this.title} : ${this.range.timeFrame} : `
      chartLegend.parent = this
      chartLegend.source = this.legendInputs.bind(this)
      this.legend.add(chartLegend)
      this.yAxisType = YAXIS_TYPE.default
    }
    else {
      let type = this.core.indicatorClasses[options.view[0].type].scale
      chartLegend.type = "secondary"
      chartLegend.title = ""
      chartLegend.parent = this
      chartLegend.source = () => { return {inputs:{}, colours:[], labels: []} }
      this.legend.add(chartLegend)
      this.yAxisType = YAXIS_TYPE.valid(type)
    }
    this.setScaleBar()
    this.#status = "init"
  }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || idSanitize(`${this.core.ID}-${this.#name}_${this.#chartCnt}`) }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  set title(t) { this.setTitle(t) }
  get title() { return this.#title }
  get type() { return this.#type }
  get status() { return this.#status }
  get collapsed() { return this.#collapsed }
  get isPrimary() { return this.options?.view?.primary || (this.#type === "primaryPane") || false }
  get element() { return this.#elTarget }
  get pos() { return this.dimensions }
  get dimensions() { return elementDimPos(this.#elTarget) }
  set width(w) { this.setWidth(w) }
  get width() { return this.#elTarget.getBoundingClientRect().width }
  set height(h) { this.setHeight(h) }
  get height() { return this.#elTarget.getBoundingClientRect().height }
  get localRange() { return this.#localRange }
  get stream() { return this.#Stream }
  get streamCandle() { return this.#streamCandle }
  set cursor(c) { this.element.style.cursor = c }
  get cursor() { return this.element.style.cursor }
  get cursorPos() { return this.#cursorPos }
  set cursorActive(a) { this.#cursorActive = a }
  get cursorActive() { return this.#cursorActive }
  get cursorClick() { return this.#cursorClick }
  get candleW() { return this.core.Timeline.candleW }
  get scrollPos() { return this.core.scrollPos }
  get bufferPx() { return this.core.bufferPx }
  get elCanvas() { return this.graph.viewport.scene.canvas }
  get elScale() { return this.#elScale }
  get elLegend() { return this.#elTarget.legend }
  get elViewport() { return this.#elTarget.viewport }
  set layerWidth(w) { this.graph.layerWidth = w }
  get layerWidth() { return this.graph.layerWidth }
  set legend(l) { this.#Legends = l }
  get legend() { return this.#Legends }
  set time(t) { this.#Time = t }
  get time() { return this.#Time }
  set scale(s) { this.#Scale = s }
  get scale() { return this.#Scale }
  set yAxisType(t) { this.setYAxisType(t) }
  get yAxisType() { return this.#yAxisType }
  get axes() { return "x" }
  get view() { return this.#view }
  get viewport() { return this.graph.viewport }
  get layerGrid() { return this.graph.overlays.get("grid").layer }
  get overlays() { return Object.fromEntries([...this.graph.overlays.list]) }
  get overlayGrid() { return this.graph.overlays.get("grid").instance }
  get overlayTools() { return this.#overlayTools }
  get overlaysDefault() { return defaultOverlays[this.type] }
  get indicators() { return this.getIndicators() }
  get indicatorDeleteList() { return this.#indicatorDeleteList }
  get Divider() { return this.#Divider }
  get siblingPrev() { return this.sibling("prev") }
  get siblingNext() { return this.sibling("next") }

  /**
   * Start chart and dependent components event listening. 
   * Start the chart state machine
   * Draw the chart
   */
  start() {
    // X Axis - Timeline
    this.#Time = this.core.Timeline;

    // create and start overlays
    this.createGraph();

    // Y Axis - Price Scale
    this.#Scale.start();

    // draw the chart - grid, candles, volume
    this.draw(this.range);

    // set mouse pointer
    this.cursor = "crosshair"

    // start State Machine
    stateMachineConfig.id = this.id
    stateMachineConfig.context = this;
    this.stateMachine = stateMachineConfig;
    this.stateMachine.start();

    // set up event listeners
    this.eventsListen()

    // add divider to allow manual resize of the chart pane
    let cfg = { chartPane: this }
    this.#Divider = this.core.WidgetsG.insert("Divider", cfg)
    this.#Divider.start()
    // cfg = {dragBar, closeIcon, title, content, position, styles}
    const content = `Configure chart ${this.id}`
    let cfg2 = { 
      title: "Chart Config", 
      content, 
      parent: this,
      openNow: false
     }
    this.#ConfigDialogue = this.core.WidgetsG.insert("ConfigDialogue", cfg2)
    this.#ConfigDialogue.start()
    this.#status = "running"
    this.log(`TradeX-Chart : id: ${this.core.id} : Chart Pane ${this.name} instantiated and running`)
  }

  /**
   * destroy chart pane instance
   */
  destroy() {
    if ( this.#status === "destroyed") return
    // has this been invoked from removeChartView() ?
    if ( !this.core.MainPane.chartDeleteList[this.id] ) {
      this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`)
      return
    }
    this.core.log(`Deleting chart pane: ${this.id}`)

    this.deactivate(true)
    this.#status = "destroyed"
  }

  /**
   * Remove this chart pane - invokes destroy()
   * is the correct way to remove a chart pane
   */
  remove() {
    this.emit("chart_paneDestroy", this.id)
  }

  deactivate(indicators=false) {
    this.core.hub.expunge(this)
    if (!!indicators)
      this.removeAllIndicators()
    this.stateMachine.destroy()
    this.#Divider.destroy()
    this.#Scale.destroy()
    this.graph.destroy()
    this.#input.destroy()
    this.legend.destroy()
    this.stateMachine = undefined
    this.#Divider = undefined
    this.#Legends = undefined
    this.#Scale = undefined
    this.graph = undefined
    this.#input = undefined
    this.element.remove()
  }

  eventsListen() {
    this.#input = new Input(this.#elTarget, {disableContextMenu: false});
    this.#input.on("pointerdrag", this.onChartDrag.bind(this))
    this.#input.on("pointerdragend", this.onChartDragDone.bind(this))
    this.#input.on("pointermove", this.onPointerMove.bind(this))
    this.#input.on("pointerenter", this.onPointerEnter.bind(this));
    this.#input.on("pointerout", this.onPointerOut.bind(this));
    this.#input.on("pointerdown", this.onPointerDown.bind(this));
    this.#input.on("pointerup", this.onPointerUp.bind(this));

    // listen/subscribe/watch for parent notifications
    this.on("main_mouseMove", this.updateLegends, this);
    this.on(STREAM_LISTENING, this.onStreamListening, this);
    this.on(STREAM_NEWVALUE, this.onStreamNewValue, this);
    this.on(STREAM_UPDATE, this.onStreamUpdate, this);
    this.on(STREAM_FIRSTVALUE, this.onStreamNewValue, this)
    this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this)

    if (this.isPrimary) 
      this.on("chart_yAxisRedraw", this.onYAxisRedraw, this)
  }

  onChartDrag(e) {
    this.cursor = "grab"
    this.core.MainPane.onChartDrag(e)
    this.scale.onChartDrag(e)
  }

  onChartDragDone(e) {
    this.cursor = "crosshair"
    this.core.MainPane.onChartDragDone(e)
  }

  onPointerMove(e) {
    this.core.MainPane.onPointerActive(this)
    this.scale.layerCursor.visible = true
    this.graph.overlays.list.get("cursor").layer.visible = true
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)]
    this.#Scale.onMouseMove(this.#cursorPos)
    this.emit(`${this.id}_pointermove`, this.#cursorPos)
  }

  onPointerEnter(e) {
    this.core.MainPane.onPointerActive(this)
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.core.MainPane.onMouseEnter()
    this.scale.layerCursor.visible = true
    this.graph.overlays.list.get("cursor").layer.visible = true
    this.emit(`${this.id}_pointerenter`, this.#cursorPos);
  }

  onPointerOut(e) {
    this.#cursorActive = false;
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.scale.layerCursor.visible = false
    this.emit(`${this.id}_pointerout`, this.#cursorPos);
  }

  onPointerDown(e) {
    this.core.pointerButtons[e.domEvent.srcEvent.button] = true
    this.#cursorClick = [Math.floor(e.position.x), Math.floor(e.position.y), e];

    if (this.stateMachine.state === "tool_activated")
      this.emit("tool_targetSelected", { target: this, position: e });
    else if (this.isPrimary)
      this.emit("chart_primaryPointerDown", this.#cursorClick)
  }

  onPointerUp(e) {
    this.core.pointerButtons[e.domEvent.srcEvent.button] = false
  }

  onStreamListening(stream) {
    if (this.#Stream !== stream) this.#Stream = stream;
  }

  onStreamNewValue(value) {
    this.draw(this.range, true);
  }

  onStreamUpdate(candle) {
    if (this.isPrimary) {
      this.#streamCandle = candle
      this.chartStreamCandle.draw()
      this.layerStream.setPosition(this.core.stream.lastScrollPos, 0)
      this.updateLegends(this.cursorPos, candle)
    }
    else this.updateLegends()
    this.core.MainPane.draw()
  }

  /**
   * refresh the scale (yAxis) on Stream Update
   * @memberof Primary
   */
  onYAxisRedraw() {
    if (this.isPrimary) this.refresh()
  }

  onDeleteIndicator(i) {
    this.removeIndicator(i.id)
  }

  // set up Scale (Y Axis)
  setScaleBar() {
    const opts = {...this.options}
          opts.parent = this
          opts.chart = this
          opts.elScale = this.elScale
          opts.yAxisType = this.yAxisType
    this.scale = new ScaleBar(this.core, opts)
  }

  setTitle(t) {
    if (!isString(t)) return false

    this.#title = t
    chartLegend.title = t
    const title = this.legend.list.chart.el.querySelectorAll(".title")
    for (let n of title) {
      n.innerHTML = t
    }
    return true
  }

  setWatermark(w) {
    if (isString(w.text) || isString(w)) this.core.config.watermark.text = w
    else if ("imgURL" in w) this.core.config.watermark.imgURL = w
  }

  /**
   * Set chart and it's scale height
   * @param {number} h 
   */
  setHeight(h) {
    if (!isNumber(h)) h = this.height || this.core.MainPane.rowsH;
    if (h > this.core.MainPane.rowsH) h = this.core.MainPane.rowsH

    this.#elTarget.style.height = `${h}px`;
    this.#elScale.style.height = `${h}px`;
    this.elViewport.style.height = `${h}px`;
    this.#Scale.setDimensions({ w: null, h: h });
    this.Divider?.setPos()
    this.Divider?.setWidth()
  }

  // setWidth(w) {

  // }

  /**
   * Set chart dimensions
   * @param {Object} dim - dimensions {w:width, h: height}
   */
  setDimensions(dims={w: this.width, h: this.height}) {
    if (!isObject(dims)) dims = {w: this.width, h: this.height}
    const buffer = this.config.buffer || BUFFERSIZE
    let w = (isNumber(dims?.w)) ? dims.w : this.width
    let h = (isNumber(dims?.h)) ? dims.h : this.height
    
    // element widths are automatically handled by CSS
    this.setHeight(h)
    // has .start() already been executed?
    if (this.graph instanceof Graph) {
      this.layerWidth = Math.round(w * ((100 + buffer) * 0.01))
      this.graph.setSize(w, h, this.layerWidth)
      this.draw(undefined, true)
      this.core.MainPane.draw(undefined, false)
      this.Divider.setPos()
      this.Divider.setWidth()
    }
  }

  /**
   * set the local range max min y values
   * used for secondary panes
   * @param {number} min - range min y value
   * @param {number} max - range max y value
   */
  setLocalRange(min, max) {
    if (!isNumber(max) ||
        !isNumber(min))
        return false
    if (min > max) [min, max] = [max, min]
    this.#localRange = {
      valueMax: max,
      valueMin: min,
      valueDiff: max - min
    }
  }

  /**
   * set the type of Y-Axis
   * @param {string} t - ["default", "percent", "log"]
   * @returns {boolean}
   */
  setYAxisType(t) {
    let type = YAXIS_TYPE.valid(t)
    if (
      (this.type == "primaryPane" && type == YAXIS_TYPE.percent)
    ) 
      this.#yAxisType = YAXIS_TYPE.default
    else this.#yAxisType = type
    return true
  }

  /**
   * Add non-default overlays (indicators)
   *
   * @param {Array} overlays - list of overlays
   * @returns {boolean} 
   * @memberof Primary
   */
  addOverlays(overlays) {
    if (!isArray(overlays) || overlays.length < 1) return false

    const overlayList = []

    for (let o of overlays) {
      const config = {fixed: false, required: false}

      // Indicators
      if (o.type in this.core.indicatorClasses) {
        config.cnt = this.core.indicatorClasses[o.type].cnt
        config.id = `${this.id}-${o.type}_${config.cnt}`
        config.class = this.core.indicatorClasses[o.type]
        config.oType = "indicator"
      }
      // other overlay types
      else if (o.type in optionalOverlays[this.type]) {
        config.cnt = 1
        config.id = `${this.id}-${o.type}`
        config.class = optionalOverlays[this.type][o.type].class
        config.oType = "overlayOptional"
      }
      // custom overlay types
      else if (o.type in this.core.customOverlays[this.type]) {
        config.cnt = 1
        config.id = `${this.id}-${o.type}`
        config.class = this.core.customOverlays[this.type][o.type].class
        config.oType = "overlayCustom"
      }
      else continue

      config.params = { overlay: o, }
      o.id = config.id
      o.paneID = this.id
      o.key = indicatorHashKey(o)
      // if (this.isDuplicate(o.key)) {
      //   this.core.error(`ERROR: Chart Pane: ${this.id} cannot add duplicate Indicator: ${i?.name} with same config`)
      //   continue
      // }

      overlayList.push([o.id, config])
    }
    this.graph.addOverlays(overlayList)
    
    return true
  }

  /**
   * add an indicator
   * @param {Object} i - {type, name, ...params}
   * @returns {Indicator|undefined}
   */
  addIndicator(i) {
    const primaryPane = this.type === "primaryPane"
    const indClass = this.core.indicatorClasses[i.type]
    const isPrimary = !!i.settings?.isPrimary
    if (
        i?.type in this.core.indicatorClasses &&
        primaryPane === isPrimary
      ) {
      i.paneID = this.id
      i.key = indicatorHashKey(i)
      // if (this.isDuplicate(i.key)) {
      //   this.core.error(`ERROR: Chart Pane: ${this.id} cannot add duplicate Indicator: ${i?.name} with same config`)
      //   return undefined
      // }

      const config = {
        class: indClass,
        params: {
          overlay: i,
        }
      }
      try {
        return this.graph.addOverlay(i.name, config)
      }
      catch (e) {
        this.core.error(`ERROR: Chart Pane: ${this.id} cannot add Indicator: ${i?.name} Error: ${e.message}`)
        return undefined
      }
    }
    else return undefined
  }

  isDuplicate(key) {
    let ind = this.findIndicatorByKey(key)
    if (!ind) return false
    else return ind.id
  }


  /**
   * Find indicator by hash key
   * @param {String} key 
   * @returns {Indicator|undefined}
   */
  findIndicatorByKey(key) {
    let iList = Object.values(this.getIndicators())
    for (let i of iList) {
      if (i.key = key) return i
    }
    return undefined
  }

  getIndicators() {
    const indicators = Object.keys(this.core.indicatorClasses)
    const ind = {}

    for (let [key, value] of Object.entries(this.overlays)) {
      if (indicators.includes(value.params?.overlay?.type)) {
        let id = value.id || value.instance.id
        ind[id] = value
      }
    }
    return ind
  }

  /**
   * Remove chart pane indicator
   * remove entire secondary pane if indicator count = 0
   * @param {String} id 
   * @param {Boolean} state - leave chart pane state intact?
   * @returns 
   */
  removeIndicator(id, state=true) {
    if (!isString(id) || !(id in this.indicators)) return false

    // enable deletion
    this.#indicatorDeleteList[id] = true

    if (Object.keys(this.indicators).length === 0 && !this.isPrimary)
      this.emit("chart_paneDestroy", this.id)
    else {
      this.indicators[id].instance.destroy(state)
      this.graph.removeOverlay(id)
      this.draw()
      delete this.#indicatorDeleteList[id]
    }
    return true
  }

  removeAllIndicators(state) {
    const result = {}
    const all = this.getIndicators()
    for (let id in all) {
      result[id] = this.removeIndicator(id, state)
    }
    return result
  }

  indicatorVisible(id, v) {
    if (!isString(id) || !(id in this.indicators)) return false
    return this.indicators[id].instance.visible(v)
  }

  indicatorSettings(id, s) {
    if (!isString(id) || !(id in this.indicators)) return false
    return this.indicators[id].instance.settings(s)
  }

  addTool(tool) {
    // FIXME: this.layerConfig - undefined
    let { layerConfig } = this.layerConfig();
    let layer = new CEL.Layer(layerConfig);
    this.#layersTools.set(tool.id, layer);
    this.#viewport.addLayer(layer);

    tool.layerTool = layer;
    this.#overlayTools.set(tool.id, tool);
  }

  addTools(tools) {}

  // duplicate get overlayTools()
  // overlayTools() {
  //   const tools = [];
  //   // for (let i = 0; i < this.#layersTools.length; i++) {
  //   // tools[i] =
  //   // new indicator(
  //   //   this.#layersPrimary[i],
  //   //   this.#Time,
  //   //   this.#Scale,
  //   //   this.config)
  //   // }
  //   // return tools
  // }

  overlayToolAdd(tool) {
    // create new tool layer

    this.#overlayTools.set(tool.id, tool);
  }

  overlayToolDelete(tool) {
    this.#overlayTools.delete(tool);
  }

  /**
   * Refresh secondaryPane - overlays, grid, scale, indicators
   */
  refresh() {
    this.emit("chart_paneRefresh", this)
    this.scale.draw()
    this.draw(undefined, this.isPrimary)
  }

  /**
   * Set the visibility of all indicator legends on this pane
   * @param {string} v - "show" | "hide" all indicator legends
   */
  legendsVisibility(v) {
    this.legend.setCollapse(v)
  }

  /**
   * Update chart and indicator legends
   * @param {Array} pos - cursor position x, y, defaults to current cursor position
   * @param {Array|boolean} candle - OHLCV
   */
  updateLegends(pos = this.#cursorPos, candle = false) {
    if (this.core.IDEmpty || !isObject(this.#Legends)) return

    for (const legend in this.#Legends.list) {
      this.#Legends.update(legend, { pos, candle });
    }
  }

  /**
   * return legend data
   * @returns {object} - legend data 
   */
  legendInputs() {
    const labels = [true, true, true, true, true]
    const pos = this.cursorPos
    const idx = this.time.xPos2Index(pos[0] - this.core.scrollPos)
    const index = limit(idx, 0, this.range.data.length - 1)
    const ohlcv = this.range.data[index]
    const theme = this.theme.candle
    const inputs = {}
    const keys = ["T","O","H","L","C","V"]
    let colours = []
    if (isArray(ohlcv)) {
      colours = (ohlcv[4] >= ohlcv[1]) ?
      new Array(5).fill(theme.UpWickColour) :
      new Array(5).fill(theme.DnWickColour);
    for (let i=1; i<6; i++ ) {
      inputs[keys[i]] = this.scale.nicePrice(ohlcv[i])
    }
    }
    return {inputs, colours, labels}
  }

  /**
   * execute legend action for this chart pane
   * (not indicators)
   * @param {Object} e - event
   * @memberof Chart
   */
  onLegendAction(e) {

    const action = this.#Legends.onPointerClick(e.currentTarget)

    switch(action.icon) {
      case "up": this.reorderUp(); return;
      case "down": this.reorderDown(); return;
      case "maximize": this.core.MainPane.paneMaximize(this); return;
      case "restore": this.core.MainPane.paneMaximize(this); return;
      case "collapse": this.core.MainPane.paneCollapse(this); return;
      case "expand": this.core.MainPane.paneCollapse(this); return;
      case "remove": this.remove(); return;
      case "config": this.configDialogue(); return;
      default: return;
    }
  }

  reorderUp() {
    const {
      el,
      prevEl,
      parentEl,
      scaleEl,
      prevScaleEl,
      parentScaleEl,
      prevPane,
    } = {...this.currPrevNext()}

    if (!isObject(prevEl) || !isObject(prevScaleEl)) return false
    parentEl.insertBefore(el, prevEl)
    parentScaleEl.insertBefore(scaleEl, prevScaleEl)
    this.Divider.setPos()

    if (prevPane !== null) {
      prevPane.Divider.setPos()
      prevPane.Divider.show()
      this.core.ChartPanes.swapKeys(this.id, prevEl.id)
    }
    if (el.previousElementSibling === null)
      this.Divider.hide()

    return true;
  }

  reorderDown() {
    const {
      el,
      nextEl,
      parentEl,
      scaleEl,
      nextScaleEl,
      parentScaleEl,
      nextPane
    } = {...this.currPrevNext()}

    if (!isObject(nextEl) || !isObject(nextScaleEl)) return false
    parentEl.insertBefore(nextEl, el)
    parentScaleEl.insertBefore(nextScaleEl, scaleEl)
    this.Divider.setPos()

    if (nextPane !== null) { 
      nextPane.Divider.setPos()
      this.Divider.show()
      this.core.ChartPanes.swapKeys(this.id, nextEl.id)
    }
    if (nextEl.previousElementSibling === null)
      nextPane.Divider.hide()
      
    return true;
  }

  createGraph() {
    let overlays = copyDeep(this.overlaysDefault)
    this.graph = new Graph(this, this.elViewport, overlays, false)

    if (this.isPrimary) {
      this.layerStream = this.graph.overlays.get("stream")?.layer
      this.chartStreamCandle = this.graph.overlays.get("stream")?.instance
    }

    // add non-default overlays ie. indicators
    this.addOverlays(this.view)
  }

  render() {
    this.graph.render();
    this.#Scale.render()
  }

  draw(range=this.range, update=false) {
      this.graph.draw(range, update)
  }

  drawGrid() {
    this.layerGrid.setPosition(this.core.scrollPos, 0);
    this.overlayGrid.setRefresh() //
    this.overlayGrid.draw("y");
    this.core.MainPane.draw() //
  }

  /**
   * Set chart pane and previous sibling heights
   * @param {number} height - height in pixels, defaults to current height
   */
  resize(height) {
    const active = this
    const prev = this.sibling()

    if (prev === null) return {active: null, prev: null}

      let activeHeight = this.element.clientHeight
    const rowMinH = this.core.MainPane.rowMinH
    const prevHeight = prev.element.clientHeight
    const total = activeHeight + prevHeight
      let yDelta, activeH, prevH;

    // set bounds on pane height
    if (isNumber(height) && height > rowMinH) {
      activeH = height
    }
    // height is undefined
    else {
      yDelta = this.core.MainPane.cursorPos[5]
      activeH = activeHeight - yDelta
      activeH = limit(activeH, rowMinH, total - rowMinH)
      prevH  = total - activeH
    }

    active.setDimensions({w:undefined, h:activeH})
    prev.setDimensions({w:undefined, h:prevH})
    active.Divider.setPos()

    active.element.style.userSelect = 'none';
    // active.element.style.pointerEvents = 'none';
    prev.element.style.userSelect = 'none';
    // prev.element.style.pointerEvents = 'none';

    return {active, prev}
  }

  /**
   * Collapse pane to title and legend
   */
  collapse(h) {
    const vis = this.graph.viewport.scene.canvas.style
    const col = this.#collapsed
    const scale = this.#Scale.graph.viewport.scene.canvas.style
    // pane is collapsed, expand it
    if (col.state) {
      // display pane content
      this.setDimensions({w: undefined, h})
      scale.visibility = "visible"
      vis.display = "block"
      col.state = false
    }
    // pane is expanded, collapse it
    else {
      // hide pane content
      scale.visibility = "hidden"
      vis.display = "none"
      col.state = true
      col.height = this.element.clientHeight
      col.rowsHeight = this.core.MainPane.rowsH
      col.rowsCnt = this.core.ChartPanes.size
      this.setDimensions({W: undefined, h: COLLAPSEDHEIGHT})
    }
  }

  /**
   * Zoom (contract or expand) range start
   */
  zoomRange() {
    // draw the chart - grid, candles, volume
    this.draw(this.range, true)
    this.emit("chart_zoomDone", true)
  }


  /**
   * Return the screen x position for a give time stamp
   * @param {number} time - timestamp
   * @returns {number} - x position on canvas
   */
  time2XPos(time) {
    return this.time.xPos(time)
  }

  /**
   * @param {number} price 
   * @returns {number} - y position on canvas
   */
  price2YPos(price) {
    return this.scale.yPos(price)
  }

  /**
   * return previous, current, next chart panes
   * @returns {object} - previous, current, next chart panes
   */
  currPrevNext() {
    const el = this.element
    const prevEl = el.previousElementSibling
    const nextEl = el.nextElementSibling
    const parentEl = el.parentNode

    const scaleEl = this.scale.element
    const prevScaleEl = scaleEl.previousElementSibling
    const nextScaleEl = scaleEl.nextElementSibling
    const parentScaleEl = scaleEl.parentNode
        
    const prevPane = (prevEl !== null) ? this.core.ChartPanes.get(prevEl.id) : null
    const nextPane = (nextEl !== null) ? this.core.ChartPanes.get(nextEl.id) : null

    return {
      el,
      prevEl,
      nextEl,
      parentEl,
      scaleEl,
      prevScaleEl,
      nextScaleEl,
      parentScaleEl,
      prevPane,
      nextPane
    }
  }

  sibling(s) {
    s = (["prev", "next"].includes(s)) ? s : "prev"

    let chartPanes = [...this.core.ChartPanes.keys()]
    let i = chartPanes.indexOf(this.id)

    if (s == "prev") --i
    else ++i

    return this.core.ChartPanes.get(chartPanes[i]) || null
  }

  configDialogue() {
    const cd = this.#ConfigDialogue
    if (cd.state.name === "closed" ) cd.open()
  }
  
}
