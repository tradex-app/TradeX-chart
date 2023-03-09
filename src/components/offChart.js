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
import Input from '../input2'

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

    // X Axis - Timeline
    this.time = this.core.Timeline

    // add divider to allow manual resize of the offChart indicator
    const oc = this
    const config = { offChart: oc }
    this.#Divider = this.widgets.insert("Divider", config)
    this.#Divider.start()

    // prepare layered canvas
    this.createGraph()

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

    // Y Axis - Price Scale
    this.scale.on("started",(data)=>{this.log(`OffChart scale started: ${data}`)})
    this.scale.start("OffChart",this.name,"yAxis Scale started")

    // draw the chart - grid, candles, volume
    this.draw(this.range)

    // set mouse pointer
    this.setCursor("crosshair")
  
    // set up event listeners
    this.eventsListen()

    // start State Machine 
    stateMachineConfig.id = this.id
    this.stateMachine = stateMachineConfig
    this.stateMachine.start()
  }

  end() {
    const main = this.core.MainPane
    this.#input.off("pointerdrag", main.onChartDrag)
    this.#input.off("pointerdragend", main.onChartDrag)
    this.#Divider.end()
    super.end()
  }

  eventsListen() {
    const main = this.core.MainPane
    this.#input = new Input(this.element, {disableContextMenu: false});
    this.#input.on("pointerdrag", main.onChartDrag.bind(main))
    this.#input.on("pointerdragend", main.onChartDragDone.bind(main))
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

  refresh() {
    this.scale.draw()
    this.draw()
  }

}