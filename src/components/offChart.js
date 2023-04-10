// offChart.js
// A base class for offChart components to extend upon
// indicators can build upon this

import Chart from './chart'

import { copyDeep } from '../utils/utilities'
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import ScaleBar from "./scale"
import Graph from "./views/classes/graph"
import Legends from "./primitives/legend"
import overlayGrid from "./overlays/chart-grid"
import overlayCursor from "./overlays/chart-cursor"
import stateMachineConfig from "../state/state-offChart"
import { uid } from "../utils/utilities"
import Input from '../input'

const defaultOverlays = [
  ["grid", {class: overlayGrid, fixed: true, required: true, params: {axes: "y"}}],
  ["cursor", {class: overlayCursor, fixed: true, required: true}]
]


export default class OffChart extends Chart {

  #ID
  #offChartID
  #Indicator
  #overlay
  #Divider

  #layerStream
  #layersIndicator
  #overlayIndicators = new Map()
  #overlayIndicator

  #streamCandle

  #localRange = {
    valueMax: 100,
    valueMin: 0,
    valueDiff: 100
  }

  #input


  constructor (core, options) {

    options.type = "offChart"
    super(core, options)

    this.#ID = this.options.offChartID || uid("TX_OC_")
    this.#overlay = options.offChart
    this.init(options)
  }

  get elOffChart() { return this.element }
  get widgets() { return this.core.WidgetsG }
  get offChartID() { return this.#offChartID }
  get localRange() { return this.#localRange }
  get data() {}
  get Divider() { return this.#Divider }

  init(options) {

    const opts = {...options}
    opts.parent = this
    opts.chart = this
    opts.elScale = this.elScale
    this.#Indicator = this.core.indicators[this.#overlay.type].ind
    opts.yAxisType = this.#Indicator.scale
    this.scale = new ScaleBar(this.core, opts)
    this.time = this.core.Timeline
  }

  start(index) {

    this.#offChartID = index

    super.start(stateMachineConfig)
  
    // set up event listeners
    this.eventsListen()

    // add divider to allow manual resize of the offChart indicator
    const oc = this
    const config = { offChart: oc }
    this.#Divider = this.widgets.insert("Divider", config)
    this.#Divider.start()

    // Legends - to display indicator overlay Title, inputs and options
    let instance = this.#overlayIndicator
    let offChartLegend = {
      id: this.options.offChart.type,
      title: this.options.offChart.name,
      type: this.options.offChart.type,
      source: instance.legendInputs.bind(instance)
    }
    this.legend = new Legends(this.elLegend, this)
    this.legend.add(offChartLegend)
  }

  end() {
    this.#Divider.end()

    super.end()
  }

  eventsListen() {
    super.eventsListen()
  }

  onStreamUpdate(candle) {
    this.#streamCandle = candle
    this.graph.render()
    this.updateLegends()
  }

  /**
   * Set chart dimensions
   * @param {object} dim - dimensions {w:width, h: height}
   */
  setDimensions(dim) {
    super.setDimensions(dim)

    this.draw(undefined, true)
  }

  createGraph() {

    const indicator = [this.#overlay.name, {class: this.#Indicator, fixed: false, required: false, params: {overlay: this.#overlay}}]
    const overlays = copyDeep(defaultOverlays)
          overlays.splice(1, 0, indicator)

    this.graph = new Graph(this, this.elViewport, overlays)
    this.#overlayIndicator = this.graph.overlays.get(this.#overlay.name).instance
  }

  /**
   * Refresh offChart - overlays, grid, scale
   * Indicator
   * @memberof OffChart
   */
  refresh() {
    this.scale.draw()
    this.draw()
  }

}