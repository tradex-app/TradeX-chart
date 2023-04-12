// chart.js
// base class for onChart and offChart

import DOM from "../utils/DOM";
import {
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString,
} from "../utils/typeChecks";
import CEL from "./primitives/canvas";
import StateMachine from "../scaleX/stateMachne";
import Input from "../input"
import {
  STREAM_ERROR,
  STREAM_NONE,
  STREAM_LISTENING,
  STREAM_STOPPED,
  STREAM_FIRSTVALUE,
  STREAM_NEWVALUE,
  STREAM_UPDATE,
} from "../definitions/core";
import { BUFFERSIZE } from "../definitions/chart";

export default class Chart {
  #ID;
  #name
  #shortName
  #type
  #core;
  #options;
  #parent;
  #stateMachine;

  #elTarget;
  #elCanvas;
  #elViewport;
  #elLegend;
  #elScale;

  #Scale;
  #Time;
  #Graph;
  #Legends;
  #Stream;

  #viewport;
  #layerGrid;
  #layerStream;
  #layerCursor;
  #layersTools = new Map();

  #overlayGrid;
  #overlayIndicators = new Map();
  #overlayTools = new Map();

  #cursorPos = [0, 0];
  #cursorActive = false;
  #cursorClick;

  #settings;
  #streamCandle;
  #title;
  #theme;
  #controller;
  #input
  #inputM

  constructor(core, options) {
    this.#core = core;
    if (!isObject(options)) return
    this.#options = {...options}

    this.#name = options.name
    this.#shortName = options.shortName
    this.#elTarget = this.#options.elements.elTarget;
    this.#elScale = this.#options.elements.elScale;
    this.#parent = this.#options.parent;
    this.#theme = core.theme;
    this.#settings = core.settings;
    this.#type = options.type || "offChart"

    // process options
    for (const option in this.#options) {
      if (option in this.props()) {
        this.props()[option](this.#options[option])
      }
    }
  }

  log(l) { this.core.log(l) }
  info(i) { this.core.info(i) }
  warn(w) { this.core.warn(w) }
  error(e) { this.core.error(e) }

  set id(id) { this.#ID = id }
  get id() { return (this.#ID) ? `${this.#ID}` : `${this.#core.id}.${this.#name}` }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get title() { return this.#title }
  get type() { return this.#type }
  get parent() { return this.#parent }
  get core() { return this.#core }
  get options() { return this.#options }
  get element() { return this.#elTarget }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elTarget) }
  set width(w) { this.setWidth(w) }
  get width() { return this.#elTarget.getBoundingClientRect().width }
  set height(h) { this.setHeight(h) }
  get height() { return this.#elTarget.getBoundingClientRect().height }
  get data() {}
  get range() { return this.#core.range }
  get stream() { return this.#Stream }
  get cursorPos() { return this.#cursorPos }
  set cursorActive(a) { this.#cursorActive = a }
  get cursorActive() { return this.#cursorActive }
  get cursorClick() { return this.#cursorClick }
  get candleW() { return this.#core.Timeline.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get scrollPos() { return this.#core.scrollPos }
  get bufferPx() { return this.#core.bufferPx }
  get elCanvas() { return this.#Graph.viewport.scene.canvas }
  get elScale() { return this.#elScale }
  get elLegend() { return this.#elTarget.legend }
  get elViewport() { return this.#elTarget.viewport }
  set layerWidth(w) { this.#Graph.layerWidth = w }
  get layerWidth() { return this.#Graph.layerWidth }
  set legend(l) { this.#Legends = l }
  get legend() { return this.#Legends }
  set time(t) { this.#Time = t }
  get time() { return this.#Time }
  set scale(s) { this.#Scale = s }
  get scale() { return this.#Scale }
  get axes() { return "x" }
  set graph(g) { this.#Graph = g }
  get graph() { return this.#Graph }
  get viewport() { return this.#Graph.viewport }
  get layerGrid() { return this.#Graph.overlays.get("grid").layer }
  get overlayGrid() { return this.#Graph.overlays.get("grid").instance }
  get overlayTools() { return this.#overlayTools }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }

  start(stateMachineConfig) {
    // X Axis - Timeline
    this.#Time = this.#core.Timeline;

    // create and start overlays
    this.createGraph();

    // Y Axis - Price Scale
    this.#Scale.start();

    // draw the chart - grid, candles, volume
    this.draw(this.range);

    // set mouse pointer
    this.setCursor("crosshair");

    // start State Machine
    stateMachineConfig.id = this.id
    stateMachineConfig.context = this;
    this.stateMachine = stateMachineConfig;
    this.stateMachine.start();
  }

  end() {
    this.stateMachine.destroy();
    this.#Scale.end();
    this.#Graph.destroy();

    this.#input.off("pointerdrag", this.onChartDrag)
    this.#input.off("pointerdragend", this.onChartDrag)
    this.#input.off("pointermove", this.onMouseMove)
    this.#input.off("pointerenter", this.onMouseEnter);
    this.#input.off("pointerout", this.onMouseOut);
    this.#input.off("pointerdown", this.onMouseDown);
    this.#controller = null;

    this.off("main_mousemove", this.onMouseMove);
    this.off(STREAM_LISTENING, this.onStreamListening);
    this.off(STREAM_NEWVALUE, this.onStreamNewValue);
    this.off(STREAM_UPDATE, this.onStreamUpdate);
    this.off(STREAM_FIRSTVALUE, this.onStreamNewValue)
  }

  eventsListen() {
    this.#input = new Input(this.#elTarget, {disableContextMenu: false});
    this.#input.on("pointerdrag", this.onChartDrag.bind(this))
    this.#input.on("pointerdragend", this.onChartDragDone.bind(this))
    this.#input.on("pointermove", this.onMouseMove.bind(this))
    this.#input.on("pointerenter", this.onMouseEnter.bind(this));
    this.#input.on("pointerout", this.onMouseOut.bind(this));
    this.#input.on("pointerdown", this.onMouseDown.bind(this));

    // listen/subscribe/watch for parent notifications
    this.on("main_mousemove", this.updateLegends.bind(this));
    this.on(STREAM_LISTENING, this.onStreamListening.bind(this));
    this.on(STREAM_NEWVALUE, this.onStreamNewValue.bind(this));
    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this));
    this.on(STREAM_FIRSTVALUE, this.onStreamNewValue.bind(this))
  }

  /**
   * Set a custom event listener
   * @param {string} topic
   * @param {function} handler
   * @param {*} context
   */
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }

  /**
   * Remove a custom event listener
   * @param {string} topic
   * @param {function} handler
   */
  off(topic, handler) {
    this.#core.off(topic, handler);
  }

  /**
   * Emit an event with optional data
   * @param {string} topic
   * @param {*} data
   */
  emit(topic, data) {
    this.#core.emit(topic, data);
  }

  onChartDrag(e) {
    this.setCursor("grab")
    this.core.MainPane.onChartDrag(e)
    this.scale.onChartDrag(e)
  }

  onChartDragDone(e) {
    this.setCursor("crosshair")
    this.core.MainPane.onChartDragDone(e)
    // this.scale.onChartDragDone(e)
  }

  onMouseMove(e) {
    this.core.MainPane.onPointerActive(this)
    this.scale.layerCursor.visible = true
    this.graph.overlays.list.get("cursor").layer.visible = true
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)]
    this.#Scale.onMouseMove(this.#cursorPos)
    this.emit(`${this.id}_mousemove`, this.#cursorPos)
  }

  onMouseEnter(e) {
    this.core.MainPane.onPointerActive(this)
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.core.MainPane.onMouseEnter()
    this.scale.layerCursor.visible = true
    this.graph.overlays.list.get("cursor").layer.visible = true
    this.emit(`${this.id}_mouseenter`, this.#cursorPos);
  }

  onMouseOut(e) {
    this.#cursorActive = false;
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.scale.layerCursor.visible = false
    this.emit(`${this.id}_mouseout`, this.#cursorPos);
  }

  onMouseDown(e) {
    this.#cursorClick = [Math.floor(e.position.x), Math.floor(e.position.y)];
    if (this.stateMachine.state === "tool_activated")
      this.emit("tool_targetSelected", { target: this, position: e });
  }

  onStreamListening(stream) {
    if (this.#Stream !== stream) this.#Stream = stream;
  }

  onStreamNewValue(value) {
    this.draw(this.range, true);
  }

  props() {
    return {
      // id: (id) => this.setID(id),
      title: (title) => (this.#title = title),
      yAxisDigits: (digits) => this.setYAxisDigits(digits),
    };
  }

  /**
   * Set chart and it's scale height
   * @param {number} h 
   */
  setHeight(h) {
    if (!isNumber(h)) h = this.height || this.#parent.height;

    this.#elTarget.style.height = `${h}px`;
    this.#elScale.style.height = `${h}px`;
    this.elViewport.style.height = `${h}px`;
    this.#Scale.setDimensions({ w: null, h: h });
  }

  /**
   * Set chart dimensions
   * @param {object} dim - dimensions {w:width, h: height}
   */
  setDimensions(dim) {
    const buffer = this.config.buffer || BUFFERSIZE
      let {w, h} = dim
               w = this.width
               h = (h) ? h : this.height
    
    this.layerWidth = Math.round(w * ((100 + buffer) * 0.01))
    this.graph.setSize(w, h, this.layerWidth)
    // element widths are automatically handled by CSS
    this.setHeight(h)
    this.draw(undefined, true)
    this.core.MainPane.draw(undefined, false)
  }

  setCursor(cursor) {
    this.element.style.cursor = cursor
  }

  addTool(tool) {
    let { layerConfig } = this.layerConfig();
    let layer = new CEL.Layer(layerConfig);
    this.#layersTools.set(tool.id, layer);
    this.#viewport.addLayer(layer);

    tool.layerTool = layer;
    this.#overlayTools.set(tool.id, tool);
  }

  addTools(tools) {}

  overlayTools() {
    const tools = [];
    // for (let i = 0; i < this.#layersTools.length; i++) {
    // tools[i] =
    // new indicator(
    //   this.#layersOnChart[i],
    //   this.#Time,
    //   this.#Scale,
    //   this.config)
    // }
    // return tools
  }

  overlayToolAdd(tool) {
    // create new tool layer

    this.#overlayTools.set(tool.id, tool);
  }

  overlayToolDelete(tool) {
    this.#overlayTools.delete(tool);
  }

  drawGrid() {
    this.layerGrid.setPosition(this.#core.scrollPos, 0);
    this.overlayGrid.draw("y");
    this.#Graph.render();
  }

  /**
   * Refresh the entire chart
   */
  refresh() {
    this.#Scale.draw();
    this.draw();
  }

  /**
   * Update chart and indicator legends
   * @param {array} pos - cursor position x, y, defaults to current cursor position
   * @param {array} candle - OHLCV
   */
  updateLegends(pos = this.#cursorPos, candle = false) {
    if (this.#core.isEmpty) return

    const legends = this.#Legends.list;

    for (const legend in legends) {
      this.#Legends.update(legend, { pos, candle });
    }
  }

  render() {
    this.#Graph.render();
    this.#Scale.render()
  }

  draw(range=this.range, update=false) {
      this.#Graph.draw(range, update)
  }

  drawGrid() {
    this.layerGrid.setPosition(this.core.scrollPos, 0)
    this.overlayGrid.draw("y")
    this.#Graph.render();
  }

  /**
   * Set the entire chart dimensions, this will cascade and resize components
   * @param {number} width - width in pixels, defaults to current width
   * @param {number} height - height in pixels, defaults to current height
   */
  resize(width = this.width, height = this.height) {
    // adjust element, viewport and layers
    // this.setDimensions({ w: width, h: height });
  }

  /**
 * Zoom (contract or expand) range start
 */
  zoomRange() {
    // draw the chart - grid, candles, volume
    this.draw(this.range, true)
    this.emit("zoomDone")
  }
  
}
