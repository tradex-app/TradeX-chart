// chart.js
// Chart - where most of the magic happens
// Providing: the playground for price movements, indicators and drawing tools

import Chart from './chart'

import { copyDeep } from '../utils/utilities'
import Graph from "./views/classes/graph"
import Legends from "./primitives/legend"
import stateMachineConfig from "../state/state-onChart"


export default class OnChart extends Chart {

  #onChart


  constructor (core, options) {

    super(core, options)

    this.#onChart = core.onChart
    // Legends - to display indicator overlay Title, inputs and options
    let chartLegend = {
      id: "chart",
      title: this.title,
      type: "chart",
      source: this.legendInputs.bind(this)
    }
    this.legend = new Legends(this.elLegend, this)
    this.legend.add(chartLegend)
    this.yAxisType = "default"

    this.init(options)
    this.log(`${this.name} instantiated`)
  }

  get type() { return "onChart" }
  get isOnChart() { return true }
  get isPrimaryChart() { return true }
  get onChart() { return this.#onChart }
  get indicators() { return this.overlays }


  /**
   * Start chart and dependent components event listening. 
   * Start the chart state machine
   * Draw the chart
   */
  start() {

    super.start(stateMachineConfig)
    // create and start on chart indicators
    this.addOverlays(this.core.onChart)
  }

  createGraph() {
    let overlays = copyDeep(this.overlaysDefault)
    this.graph = new Graph(this, this.elViewport, overlays, false)
    this.layerStream = this.graph.overlays.get("stream").layer
    this.chartStreamCandle = this.graph.overlays.get("stream").instance
  }

}
