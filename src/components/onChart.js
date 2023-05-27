// chart.js
// Chart - where most of the magic happens
// Providing: the playground for price movements, indicators and drawing tools

import Chart from './chart'

import { limit } from "../utils/number"
import { copyDeep } from '../utils/utilities'
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import ScaleBar from "./scale"
import Graph from "./views/classes/graph"
import Legends from "./primitives/legend"
import chartGrid from "./overlays/chart-grid"
import chartCursor from "./overlays/chart-cursor"
import chartVolume from "./overlays/chart-volume"
import chartCandles from "./overlays/chart-candles"
import chartStreamCandle from "./overlays/chart-streamCandle"
import watermark from "./overlays/chart-watermark"
import indicator from "./overlays/indicator"
import stateMachineConfig from "../state/state-onChart"

import { CandleStyle, VolumeStyle } from "../definitions/style"

const defaultOverlays = [
  ["watermark", {class: watermark, fixed: true, required: true, params: {content: null}}],
  ["grid", {class: chartGrid, fixed: true, required: true, params: {axes: "y"}}],
  ["volume", {class: chartVolume, fixed: false, required: true, params: {maxVolumeH: VolumeStyle.ONCHART_VOLUME_HEIGHT}}],
  ["candles", {class: chartCandles, fixed: false, required: true}],
  ["stream", {class: chartStreamCandle, fixed: false, required: true}],
  ["cursor", {class: chartCursor, fixed: true, required: true}]
]


export default class OnChart extends Chart {

  #onChart
  #chartXPadding = 5
  #chartYPadding = 2.5

  #yAxisDigits
  #pricePrecision
  #volumePrecision

  #layerStream
  #chartStreamCandle

  #streamCandle


  constructor (core, options) {

    options.type = "onChart"
    super(core, options)

    this.#onChart = core.onChart
    this.init(options)
  }

  set state(s) { this.core.setState(s) }
  get state() { return this.core.getState() }
  get data() { return this.core.chartData }
  get streamCandle() { return this.#streamCandle }
  get onChart() { return this.#onChart }
  set priceDigits(digits) { this.setYAxisDigits(digits) }
  get priceDigits() { return this.#yAxisDigits || PRICEDIGITS }
  get indicators() { return this.overlays }


  init(options) {

    // Legends - to display indicator overlay Title, inputs and options
    let chartLegend = {
      id: "chart",
      title: this.title,
      type: "chart",
      source: this.legendInputs.bind(this)
    }
    this.legend = new Legends(this.elLegend, this)
    this.legend.add(chartLegend)

    const opts = {...options}
    opts.parent = this
    opts.chart = this
    opts.elScale = this.elScale
    // opts.onChart = this
    opts.legends = this.legend
    opts.yAxisType = "default"
    this.scale = new ScaleBar(this.core, opts)

    this.log(`${this.name} instantiated`)
  }

  /**
   * Start chart and dependent components event listening. 
   * Start the chart state machine
   * Draw the chart
   */
  start() {

    super.start(stateMachineConfig)

    // set up event listeners
    this.eventsListen();

    // create and start on chart indicators
    this.addOverlays(this.core.onChart)

    const data = {inputs: {}}
    if (isObject(this.Stream)) {
      data.inputs.chart = {stream: this.Stream}
      // iterate over on chart indicators and add inputs if any
    }
  }

  end() {
    this.off("chart_yAxisRedraw", this.onYAxisRedraw)
    super.end()
  }

  eventsListen() {
    super.eventsListen()
    this.on("chart_yAxisRedraw", this.onYAxisRedraw.bind(this))
  }

  onStreamUpdate(candle) {
    this.#streamCandle = candle
    this.#chartStreamCandle.draw()
    this.#layerStream.setPosition(this.core.stream.lastScrollPos, 0)
    this.graph.render()
    this.updateLegends(this.cursorPos, candle)
  }

  onYAxisRedraw() {
    this.scale.draw()
    this.draw(this.range, true)
  }

  /**
   * Set chart dimensions
   * @param {object} dim - dimensions {w:width, h: height}
   */
  setDimensions(dim) {
    super.setDimensions(dim)

    this.draw(this.range, true)
  }

  setYAxisDigits(digits) {
    this.#yAxisDigits = (isNumber(digits) && digits >= 3) ? parseInt(digits) : PRICEDIGITS
  }
  getPriceDigits() {
    return this.#yAxisDigits
  }

  loadData(data) {}
  updateData(data) {}

  createGraph() {
    let overlays = new Map(copyDeep(defaultOverlays))

    if (overlays.has("volume")) {
      const volume = overlays.get("volume")
      volume.params.maxVolumeH = this.theme?.volume?.Height || VolumeStyle.ONCHART_VOLUME_HEIGHT
      overlays.set("volume", volume)
    }

    overlays = Array.from(overlays)

    this.graph = new Graph(this, this.elViewport, overlays, false)
    this.#layerStream = this.graph.overlays.get("stream").layer
    this.#chartStreamCandle = this.graph.overlays.get("stream").instance
  }

  /**
   * Add any non-default overlays
   *
   * @param {array} overlays
   * @memberof OnChart
   */
  addOverlays(overlays) {
    for (let o of overlays) {
      const config = {fixed: false, required: false}
      if (o.type in this.core.indicators) {
        config.cnt = this.core.indicators[o.type].ind.cnt
        config.id = `${this.id}.${o.type}_${config.cnt}`
        config.class = this.core.indicators[o.type].ind
        config.params = {
          overlay: o,
        }
        o.id = config.id
        o.paneID = this.id
        this.overlays.set(o.name, config)
      }
    }
    const r = this.graph.addOverlays(Array.from(this.overlays))
    for (let o of r) {
      if (!o[0]) this.overlays.delete(o[0])
    }
  }

  /**
   * Refresh the chart - grid, scale
   * prices, candles / line / area
   * indicators
   */
  refresh() {
    this.scale.draw()
    this.draw(this.range, true)
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
   * 
   * @param {number} price 
   * @returns {number} - y position on canvas
   */
  price2YPos(price) {
    return this.scale.yPos(price)
  }

  /**
   * Set the price accuracy
   * @param {number} pricePrecision - Price accuracy
   */
  setPriceVolumePrecision (pricePrecision) {
    if (!isNumber(pricePrecision) || pricePrecision < 0) {
      this.warning('setPriceVolumePrecision', 'pricePrecision', 'pricePrecision must be a number and greater than zero!!!')
      return
    }
    this.#pricePrecision = pricePrecision
  }

  /**
   * Set the volume accuracy
   * @param {number}volumePrecision - Volume accuracy
   */
  setPriceVolumePrecision (volumePrecision) {
    if (!isNumber(volumePrecision) || volumePrecision < 0) {
      logWarn('setPriceVolumePrecision', 'volumePrecision', 'volumePrecision must be a number and greater than zero!!!')
      return
    }
    this.#volumePrecision = volumePrecision
  }

  legendInputs(pos=this.cursorPos, candle) {
        pos = this.cursorPos
    let inputs = {}
    let colours = []
    let labels = [true, true, true, true, true]
    let index = this.time.xPos2Index(pos[0] - this.core.scrollPos)
        index = limit(index, 0, this.range.data.length - 1)
    let ohlcv = this.range.data[index]

    // get candle colours from config / theme
    if (ohlcv[4] >= ohlcv[1]) colours = new Array(5).fill(this.theme.candle.UpWickColour)
    else colours = new Array(5).fill(this.theme.candle.DnWickColour)

    inputs.O = this.scale.nicePrice(ohlcv[1])
    inputs.H = this.scale.nicePrice(ohlcv[2])
    inputs.L = this.scale.nicePrice(ohlcv[3])
    inputs.C = this.scale.nicePrice(ohlcv[4])
    inputs.V = this.scale.nicePrice(ohlcv[5])

    return {inputs, colours, labels}
  }

}
