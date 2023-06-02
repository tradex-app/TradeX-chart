// offChart.js
// A base class for offChart components to extend upon
// indicators can build upon this

import Chart from './chart'

import { copyDeep } from '../utils/utilities'
import Graph from "./views/classes/graph"
import Legends from "./primitives/legend"
import stateMachineConfig from "../state/state-offChart"


export default class OffChart extends Chart {

  #Indicator
  #overlay
  #Divider

  #overlayIndicator

  // localRange required by offChart scale
  #localRange = {
    valueMax: 100,
    valueMin: 0,
    valueDiff: 100
  }


  constructor (core, options) {

    super(core, options)

    this.#overlay = options.offChart
    this.#overlay.cnt = this.core.indicators[this.#overlay.type].ind.cnt
    this.#overlay.id = `${this.id}.${options.offChart.type}_${this.#overlay.cnt}`
    this.#overlay.paneID = this.id
    this.overlays.set(options.offChart.name, options.offChart)
    this.#Indicator = this.core.indicators[this.#overlay.type].ind
    this.yAxisType = this.#Indicator.scale

    this.init(options)
    this.time = this.core.Timeline
  }

  get type() { return "offChart" }
  get isOnChart() { return false }
  get isPrimaryChart() { return false }
  get localRange() { return this.#localRange }
  get indicators() { return this.overlays }


  start(index) {

    super.start(stateMachineConfig)
  
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

  createGraph() {
    const indicator = [this.#overlay.name, {class: this.#Indicator, fixed: false, required: false, params: {overlay: this.#overlay}}]
    const overlays = copyDeep(this.overlaysDefault)
          overlays.splice(1, 0, indicator)

    this.graph = new Graph(this, this.elViewport, overlays)
    this.#overlayIndicator = this.graph.overlays.get(this.#overlay.name).instance
  }

}