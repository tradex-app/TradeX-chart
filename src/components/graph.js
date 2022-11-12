// graph.js
// class

import DOM from "../utils/DOM"
import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import ScaleBar from "./scale"
import CEL from "../components/primitives/canvas"
import Overlays from "./overlays"
import stateMachineConfig from "../state/state-chart"
import { InputController, Keys } from "../input/controller"

import grid from "./overlays/chart-grid"
import cursor from "./overlays/chart-cursor"
const defaultOverlays = [
  ["grid", {class: grid, fixed: true}],
  ["cursor", {class: cursor, fixed: true}]
]

import { BUFFERSIZE } from "../definitions/chart"

export default class graph {

  #core
  #config
  #theme
  #xAxis
  #yAxis
  #Scale
  #Time
  #controller

  #parent
  #viewport
  #scene
  #overlays
  #streamCandle

  #elChart
  #elCanvas
  #elViewport
  #elLegends

  constructor(parent, elViewport, overlays) {

    this.#parent = parent
    this.#core = parent.core
    this.#config = this.core.config
    this.#theme = this.core.theme
    this.#elChart = this.#parent.element
    this.#elViewport = elViewport
    
    // create graph viewport with overlays
    this.createViewport(overlays)
    // set up event listeners
    // this.eventsListen()
  }

  get parent() { return this.#parent }
  get core() { return this.#core }
  get config() { return this.#config }
  set width(w) { this.setWidth(w) }
  get width() { return this.#elChart.clientWidth }
  set height(h) { this.setHeight(h) }
  get height() { return this.#elChart.clientHeight }
  get dimensions() { return DOM.elementDimPos(this.#elChart) }
  get stateMachine() { return this.#parent.stateMachine }
  set state(s) { this.#core.setState(s) }
  get state() { return this.#core.getState() }
  get data() { return this.#core.chartData }
  get range() { return this.#core.range }
  get stream() { return this.#core.stream }
  get TimeLine() { return this.#core.TimeLine }
  get xAxis() { return this.#core.TimeLine.xAxis }
  get Scale() { return this.#parent.Scale }
  get yAxis() { return this.#parent.Scale.yAxis }
  get viewport() { return this.#viewport }
  get overlays() { return this.#overlays }

  setWidth() {}

  setHeight() {}

  setDimensions(dim) {}

  eventsListen() {
    // create controller and use 'on' method to receive input events 
    this.#controller = new InputController(this.#elCanvas, {disableContextMenu: false});
    this.#controller.on("mousemove", this.onMouseMove.bind(this));
    this.#controller.on("mouseenter", this.onMouseEnter.bind(this));
    this.#controller.on("mouseout", this.onMouseOut.bind(this));
    this.#controller.on("mousedown", this.onMouseDown.bind(this));

    // listen/subscribe/watch for parent notifications
    this.on("main_mousemove", (pos) => this.updateLegends(pos))
    this.on(STREAM_LISTENING, (stream) => this.onStreamListening(stream))
    this.on(STREAM_NEWVALUE, (candle) => this.onStreamNewValue(candle))
    this.on(STREAM_UPDATE, (candle) => this.onStreamUpdate(candle))
    this.on("chart_yAxisRedraw", this.onYAxisRedraw.bind(this))
  }

    /**
   * Set a custom event listener
   * @param {string} topic 
   * @param {function} handler 
   * @param {*} context 
   */
     on(topic, handler, context) {
      this.#core.on(topic, handler, context)
    }
  
    /**
     * Remove a custom event listener
     * @param {string} topic 
     * @param {function} handler 
     */
    off(topic, handler) {
      this.#core.off(topic, handler)
    }
  
    /**
     * Emit an event with optional data
     * @param {string} topic 
     * @param {*} data 
     */
    emit(topic, data) {
      this.#core.emit(topic, data)
    }

  createViewport(overlays=[]) {

    overlays = (overlays.length == 0) ? defaultOverlays : overlays

    const {width, height} = this.layerConfig()

    // create viewport
    this.#viewport = new CEL.Viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });

    this.#elCanvas = this.#viewport.scene.canvas
    this.#overlays = new Overlays(this, overlays)
  }

  layerConfig() {
    const buffer = this.config?.buffer || BUFFERSIZE
    const width = this.#elViewport.clientWidth
    const height = this.#parent.height || this.#parent.rowsH - 1
    this.layerWidth = Math.round(width * ((100 + buffer) * 0.01))
    const layerConfig = { 
      width: this.layerWidth, 
      height: height
    }
    return {width, height, layerConfig}
  }

  draw(range=this.range, update=false) {
    const oList = this.#overlays.list
    for (let [key, overlay] of oList) {
      overlay.instance.position = [this.#core.scrollPos, 0]
      // overlay.instance.draw(update)

      if (this.#core.scrollPos == this.#core.bufferPx * -1 || 
          this.#core.scrollPos == 0 || 
          update == true) 
      {
        overlay.instance.draw()
      }
      else if (this.#parent.streamCandle) {
        oList.get("stream").instance.draw(this.#streamCandle)
      }
    }

    this.#viewport.render()
  }

  render() {
    this.#viewport.render()
  }

}