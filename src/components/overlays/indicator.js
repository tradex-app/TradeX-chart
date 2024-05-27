// indicator.js
// Base class for on and off chart indicators

import Overlay from "./overlay"
import { Range } from "../../model/range"
import { limit } from "../../utils/number"
import Colour from "../../utils/colour"
import { isArray, isBoolean, isFunction, isInteger, isNumber, isObject, isString, typeOf } from "../../utils/typeChecks"
import { idSanitize, uid } from "../../utils/utilities"
import { STREAM_UPDATE } from "../../definitions/core"
import { OHLCV } from "../../definitions/chart"
import { WinState } from "../widgets/window"
import { onClickOutside } from "../../utils/DOM"

// const plotTypes = {
//   area,
//   bar,
//   channel,
//   line,
// }

const DEFAULT_PERIOD = 5

// Context enum
class Context {
  static standard = new Context("standard")
  static subcomponent = new Context("subcomponent")

  constructor(name) {
    this.name = name
  }
}

export class InputPeriodEnable {

  #enable = true
  #period = DEFAULT_PERIOD

  constructor (enable=true, period=5) {
    this.enable = enable
    this.period = (isInteger(period)) ? period : 5
  }

  set enable(e) { this.#enable = (isBoolean(e)) ? e : true }
  get enable() { return this.#enable }
  set period(p) { this.#period = (isInteger(p)) ? p : 5 }
  get period() { return this.#period }

}

/**
 * Base class for on and off chart indicators
 * @export
 * @class indicator
 */
export default class Indicator extends Overlay {

  static #cnt = 0
  static get cnt() { return ++Indicator.#cnt }
  static get isIndicator() { return true }


  #ID
  #cnt_
  #name
  #shortName
  #context
  #legendName
  #legendVisibility
  #primaryPane
  #chartPane
  #scaleOverlay
  #plots
  #params
  #overlay
  #indicator
  #type = "indicator"
  #TALib
  #range
  #value = [0, 0]
  #newValueCB
  #updateValueCB
  #precision = 2
  #style = {}
  #legendID
  #status
  #ConfigDialogue
  #ColourPicker

  definition = {
    input: {},
    output: {},
    meta: {
      input: {},
      output: {}
    }
  }


  constructor (target, xAxis=false, yAxis=false, config, parent, params) {

    super(target, xAxis, yAxis, undefined, parent, params)

    const overlay = params.overlay

    this.#cnt_ = Indicator.cnt
    this.#params = params
    this.#overlay = overlay
    this.#TALib = this.core.TALib
    this.#range = this.xAxis.range
    this.id = overlay?.id || uid(this.shortName)
    this.legendName = overlay?.legendName
    this.#legendVisibility = (isBoolean(overlay?.legendVisibility)) ? overlay.legendVisibility : true
    this.style = (overlay?.settings?.style) ? 
    {...this.constructor.defaultStyle, ...overlay.settings.style} : 
    {...this.constructor.defaultStyle, ...config.style};
    const cfg = { title: `${this.legendName} Config`, content: "", params: overlay, parent: this }
    this.#ConfigDialogue = this.core.WidgetsG.insert("ConfigDialogue", cfg)
    switch(overlay.settings?.context) {
      case "subcomponent": this.#context = Context.subcomponent;
      case "standard":
      default: this.#context = Context.standard;
    }
  }

  get id() { return this.#ID || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#cnt_}`}
  set id(id) { this.#ID = idSanitize(new String(id)) }
  get context() { return this.#context }
  get chartPane() { return this.core.ChartPanes.get(this.chartPaneID) }
  get chartPaneID() { return this.#params.overlay.paneID }
  get primaryPane() { return this.#primaryPane || this.constructor.primaryPane }
  set primaryPane(c) { this.#primaryPane = c }
  get scaleOverlay() { return this.#scaleOverlay }
  set scaleOverlay(o) { this.#scaleOverlay = o }
  get plots() { return this.#plots }
  set plots(p) { this.#plots = p }
  get params() { return this.#params }
  get Timeline() { return this.core.Timeline }
  get scale() { return this.parent.scale }
  get type() { return this.#type }
  get overlay() { return this.#overlay }
  get legend() { return this.chart.legend.list[this.#legendID] }
  get legendID() { return this.#legendID }
  get legendName() { return this.#legendName || this.shortName || this.#ID }
  set legendName(n) { this.setLegendName(n) }
  set legendVisibility(v) { this.setLegendVisibility(v) }
  get indicator() { return this.#indicator }
  get TALib() { return this.#TALib }
  get range() { return this.core.range }
  set setNewValue(cb) { this.#newValueCB = cb }
  set setUpdateValue(cb) { this.#updateValueCB = cb }
  set precision(p) { this.#precision = p }
  get precision() { return this.#precision }
  set style(s) { if (isObject(s)) this.#style = s }
  get style() { return this.#style }
  set position(p) { this.target.setPosition(p[0], p[1]) }
  get isIndicator() { return Indicator.isIndicator }
  get isPrimary() { return this.chart.isPrimary }
  get status() { return this.#status }
  get configDialogue() { return this.#ConfigDialogue }


  /**
   * process candle value
   * data - [timestamp, open, high, low, close, volume]
   * @memberof indicator
   */
  set value(data) {
    // round time to nearest current time unit
    const tfms = this.core.timeData.timeFrameMS
    let roundedTime = Math.floor(new Date(data[OHLCV.t]) / tfms) * tfms
    data[OHLCV.t] = roundedTime

    if (this.#value[OHLCV.t] !== data[OHLCV.t]) {
      this.#value[OHLCV.t] = data[OHLCV.t]
      this.#newValueCB(data)
    }
    else {
      this.#updateValueCB(data)
    }
  }
  get value() {
    return this.#value
  }

  setLegendName(name) {
    this.#legendName = (isString(name)) ? name : this.shortName || this.#ID
    this.chart.legend.modify(this.#legendID, { legendName: name })
  }

  setLegendVisibility(v) {
    this.#legendVisibility = !!v
    this.chart.legend.modify(this.#legendID, { legendVisibility: !!v })
  }

  setDefinitionValue(d,v) {
    let defs = Object.keys(this.definition.input)
    if (defs.includes(d)) {
      this.definition.input[d] = v * 1
      return "input"
    }
    defs = Object.keys(this.style)
    if (defs.includes(d)) {
      this.style[d] = v
      return "style"
    }
  }

  init(api) {
    const overlay = this.#params.overlay

    this.defineIndicator(overlay?.settings, api)
    // calculate back history if missing
    this.calcIndicatorHistory()
    // enable processing of price stream
    this.setNewValue = (value) => { this.newValue(value) }
    this.setUpdateValue = (value) => { this.updateValue(value) }

    if (this.#context === Context.standard) {
      // indicator legend
      this.addLegend()
      // config dialogue
      this.#ConfigDialogue.start()

      this.eventsListen()
    }
  }

  destroy() {
    if ( this.#status === "destroyed") return
    // has this been invoked from removeIndicator() ?
    // const chartPane = this.core.ChartPanes.get(this.chartPaneID)
    if ( !this.chartPane.indicatorDeleteList[this.id] ) {
      this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "indicator.remove()" or "chart.removeIndicator()" instead.`)
      return
    }
    // terminate listeners
    this.core.hub.expunge(this)

    this.chart.legend.remove(this.#legendID)

    // remove overlay from parent chart pane's graph
    this.clear()
    this.core.MainPane.draw(undefined, true)
    this.chartPane.graph.removeOverlay(this.id)

    // remove widgets
    if (isObject(this.#ColourPicker))
      this.core.WidgetsG.delete(this.#ColourPicker.id)

    // execute parent class
    // delete data
    // remove listeners
    super.destroy()
    // remove indicator state data
    this.core.state.removeIndicator(this.id)

    this.#status = "destroyed"
  }

  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`)

    // Should the chart pane be removed also?
    if (this.chart.type === "primaryPane" ||
        Object.keys(this.chart.indicators).length > 1) 
    {
      this.emit(`${this.chartPaneID}_removeIndicator`, {id: this.id, paneID: this.chartPaneID})
    }
    // Yes!
    else
      this.chart.remove()
  }

  /**
   * set or get indicator visibility
   * @param {boolean} [v] - visible
   * @returns {boolean}
   */
  visible(v) {
    if (isBoolean(v)) {
      this.emit(`${this.chartPaneID}_visibleIndicator`, {id: this.id, paneID: this.chartPaneID, visible: v})
      this.chartPane.indicators[this.id].layer.visible = v
      this.draw()
    }
    return this.chartPane.indicators[this.id].layer.visible
  }

  /**
   * set or get indicator settings
   * @param {Object} [s] - settings
   */
  settings(s) {
    if (isObject(s)) {
      if (isObject(s?.config)) this.params.overlay.settings = 
       {...this.params.overlay.settings, ...s.config}
      if (isObject(s?.style)) this.style =
        {...this.style, ...s.style}
      this.draw()
    }
    return {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition,
    }
  }

  eventsListen() {
    this.on(STREAM_UPDATE, this.onStreamUpdate, this)
    this.on(`window_opened_${this.id}`, this.onConfigDialogueOpen, this)
    this.on(`window_closed_${this.id}`, this.onConfigDialogueCancel, this)
    this.on(`window_submit_${this.id}`, this.onConfigDialogueSubmit, this)
    this.on(`window_cancel_${this.id}`, this.onConfigDialogueCancel, this)
    this.on(`window_default_${this.id}`, this.onConfigDialogueDefault, this)
  }

  on(topic, handler, context=this) {
    this.core.on(topic, handler, context)
  }

  off(topic, handler, context=this) {
    this.core.off(topic, handler, context)
  }

  emit(topic, data) {
    this.core.emit(topic, data)
  }

  onStreamNewValue(value) {
    // this.value = value
    // console.log("onStreamNewValue(value):",value)
  }

  /**
   * process new candle stream value
   * @param {Array} candle - [timestamp, open, high, low, close, volume]
   * @memberof Indicator
   */
  onStreamUpdate(candle) {
    // console.log("onStreamUpdate(candle):", candle)
    this.value = candle
  }

  /**
   * execute legend action
   * @param {Object} e - event
   * @memberof Chart
   */
  onLegendAction(e) {

    const action = this.chart.legend.onPointerClick(e.currentTarget)

    switch(action.icon) {
      case "up": return;
      case "down": return;
      case "visible": this.onVisibility(action); return;
      case "notVisible": this.onVisibility(action); return;
      case "remove": this.remove(); return;
      case "config": this.invokeSettings(); return;
      default: return;
    }
  }

  /**
   * toggle indicator visibility
   * @param {Object} action - 
   */
  onVisibility(action) {
    this.visible(!this.visible())
    action.parent.classList.toggle("visible")
    action.parent.classList.toggle("notvisible")
  }

//--- Config Settings ---

  onConfigDialogueOpen(d) {
    // console.log(`${this.id} Config Open`)

    if (this.#ConfigDialogue.state === WinState.opened) return

    this.#ConfigDialogue.setOpen()
    // store current value as the old value
    const fields = this.#ConfigDialogue.contentFields

    for (let field in fields) {
      for (let f of fields[field]) {
        if (f.classList.contains("subject")) {
          if (f.getAttribute("data-oldval") !== f.value) {
          f.setAttribute("data-oldval", f.value)
        }
      }
    }
  }
  }

  onConfigDialogueSubmit(d) {
    // console.log(`${this.id} Config Submit`)

    this.#ConfigDialogue.setClose()
    let r, calc = false;
    const fields = this.#ConfigDialogue.contentFields

    for (let field in fields) {
      for (let f of fields[field]) {
        if (f.classList.contains("subject")) {
          f.setAttribute("data-oldval", f.value)
          r = this.setDefinitionValue(f.id, f.value)
          calc = calc || (r == "input")
        }
      }
    }
    // clear indicator and recalculate
    if (calc) {
      this.overlay.data.length = 0
      this.calcIndicatorHistory()
    }
    this.setRefresh()
    this.draw()
  }

  onConfigDialogueCancel(d) {

    this.#ConfigDialogue.setClose()
    const fields = this.#ConfigDialogue.contentFields

    for (let field in fields) {
      for (let f of fields[field]) {
        if (f.classList.contains("subject")) {
          f.value = f.getAttribute("data-oldval")
        }
      }
    }
    this.setRefresh()
    this.draw()

    // console.log(`${this.id} Config Cancel`)
  }

  onConfigDialogueDefault(d) {
    // console.log(`${this.id} Config Default`)

    const fields = this.#ConfigDialogue.contentFields

    for (let field in fields) {
      for (let f of fields[field]) {
        if (f.classList.contains("subject")) {
          let dataDefault = f.getAttribute("data-default")
          f.value = dataDefault
          this.style[f.id] = dataDefault
        }
      }
    }
    this.calcIndicatorHistory()
    this.setRefresh()
    this.draw()
  }

  /**
   * invoke indicator settings callback, user defined or default
   * @param {Object} c - {fn: function, own: boolean}, own flag will bypass default action
   * @returns 
   */
  invokeSettings(c={}) {
    let r;
    // execute provided settings function
    if (isFunction(c?.fn)) {
      r = c.fn(this)
      // execute the default?
      if (c?.own) return r
    }
    // execute configured settings function
    else if (isFunction(this.core.config.callbacks?.indicatorSettings?.fn)) {
      r = this.core.config.callbacks.indicatorSettings.fn(this)
      // execute the default?
      if (this.core.config.callbacks?.indicatorSettings?.own) return r
    }
    // execute default settings action
    this.core.log(`invokeSettings: ${this.id}`)
    // console.log(`invokeSettings: ${this.id}`, r)

    const cd = this.#ConfigDialogue
    if (cd.update) {
      // does indicator provide function to build tabbed config object?
      if (!isFunction(this.configInputs)) {
        this.core.error(`ERROR: Indicator ${this.name} does not provide configInputs() required for the settings dialogue`)
        return false
      }
      // build the config dialogue
      const {html, modifiers} = cd.configBuild(this.configInputs())
      const title = `${this.shortName} Config`
      cd.setTitle(title)
      cd.setContent(html, modifiers)
      cd.update = false
      // set up colour picker
      this.#ColourPicker = cd.elContent.querySelector("tradex-colourpicker")
    }
    if (cd.state.name === "closed" ) cd.open()
    else cd.setOpen()
    return true
  }

  // entry, id, label, type, value, default, placeholder, class, max, min, step, onchange, disabled, visible, description

  configInputs() {
    const name = this.name || this.shortName || this.#ID
    const noConfig = `Indicator ${name} is not configurable.`
    const noTabs = { "No Config": {tab1: noConfig} }
      let tabs = {};
      let meta = this?.definition?.meta

    if (!isObject(meta) &&
        !isObject(this?.style) &&
        !isObject(this?.definition?.input)) 
      return noTabs

    // inputs built in defineIndicator()
    // style built in defineIndicator()

    // process other tabs
    for (let tab in meta) {
      tabs[tab] = meta[tab]
    }

    // if there are no tabs return no config message
    if (Object.keys(tabs).length == 0)
      tabs = noTabs
    // ensure all tab fields provide data-oldval, data-default
    else {
      for (let tab in tabs) {
        for (let field in tabs[tab]) {
          let f = tabs[tab][field]
          let keys = Object.keys(f)
          if (!keys.includes("data-oldval"))
            f["data-oldval"] = f.value
          if (!keys.includes("data-default")) {
            f["data-default"] = (!!f.default) ? 
              f.default :
              f.value
          }
        }
      }
    }

    return tabs
  }

  buildConfigInputTab() {
    const define = this.definition.input
      let input = {}

    for (let i in define) {
      let v = define[i]
      let type = typeOf(v)
      switch(type) {
        case "number":
          this.configInputNumber(define, input, i)
          break;
        case "object":
          this.configInputObject(define, input, i)
          break;
      }
    }
    if (Object.keys(input).length == 0)
      input = false

    return input
  }

  buildConfigStyleTab() {
    const style = {}
    const change = {
      event: "change", 
      fn: (e)=>{
        // console.log(`${e.target.id} = ${e.target.value}`)

        this.style[e.target.id] = e.target.value
        this.setRefresh()
        this.draw()
      }
    }
    const colour = {
      event: "click", 
      fn: (e)=>{
        e.preventDefault()
        // console.log(`Colour Picker: ${e.target.id} = ${e.target.value}`)
        // if (this.core.MainPane.colourPicker.state === WinState.opened) return
        // const picker = {params: {colour: e.target.value}}
        // this.core.MainPane.colourPicker.open(picker)
        // this.#ColourPicker.target = e.target
        // this.#ColourPicker.colour = e.target.value
        this.#ColourPicker.open(e.target.value, e.target) // .classList.toggle("active")
        let x = e.target.offsetLeft - this.#ColourPicker.width // offsetWidth
        let y = this.#ColourPicker.offsetTop - e.target.top // offsetTop
        this.#ColourPicker.position(x, y, this.core)
        // hide colour picker when pointer gives focus elsewhere

      }
    }
    const over = {
      event: "pointerover",
      fn: (e) => {
        e.target.style.border = "1px solid #f00;"
      }
    }
    const out = {
      event: "pointerout",
      fn: (e) => {
        e.target.style.border = "none;"
      }
    }
    let listeners;
    for (let i in this?.style) {
      let d = ""
      let v = this.style[i]
      let min = ""
      let type = typeOf(v)
      switch (type) {
        case "number": 
          min = `0`
          d = v
          listeners = [change]
          break;
        case "string":
          let c = new Colour(v);
          type = (c.isValid)? "text" : ""
          v = (c.isValid)? c.hexa : v
          d = v
          listeners = [change, colour, over, out]
          break;
      }
      // element modifier function
      const fn = (el) => {
        this.configDialogue.provideInputColor(el, `#${i}`)
        this.configDialogue.provideEventListeners(`#${i}`, listeners)(el)
      }

      style[i] = {
        entry: i, 
        label: i, 
        type, 
        value: v, 
        "data-oldval": v, 
        "data-default": 
        d, default: 
        d, min, 
        $function: fn }
    }
    return style
  }

  configInputNumber(define, input, i) {
    input[i] = {
      entry: i,
      label: i,
      type: 'number',
      value: define[i],
      default: define[i],
      "data-default": define[i],
      "data-oldval": define[i],
      $function:
        this.configDialogue.provideEventListeners(`#${i}`, 
        [{
          event: "change", 
          fn: (e)=>{
            // console.log(`#${i} = ${e.target.value}`)
          }
        }]
      )
    }
  }

  configInputObject(define, input, i) {
    if (i instanceof InputPeriodEnable) {
      this.configInputNumber(define, input, i.period)
      input.$function = function (el) {
        const elm = el.querySelector(`#${i}`)
        const checkBox = document.createElement("input")
              checkBox.id = `"enable${i}`
              checkBox.checked = i.enable
              checkBox.addEventListener("change", (e) => {
                if (e.currentTarget.checked) {
                  console.log(`enable ${e.currentTarget.id}`)
                }
                else {
                  console.log(`disable ${e.currentTarget.id}`)
                }
              })
        if (!!elm) {
          elm.insertAdjacentElement("beforebegin", checkBox)
        }
      }
    }
  }

  //--- building the indicator

  /**
   * validate indicator inputs and outputs against expected types and values
   * @param {Object} s - indicator inputs
   * @param {Object} api - predefined parameters
   * @memberof indicator
   */
  defineIndicator(s, api) {
    const definition = {
      input: {},
      output: {},
      meta: {
        input: {},
        style: {}
      }
    }
    let d;
    if (!isObject(this.definition)) 
      d = this.definition = definition
    else {
      d = this.definition
      d.input = (!isObject(d.input)) ? {} : d.input
      d.output = (!isObject(d.output)) ? {} : d.output
      d.meta = (!isObject(d.meta)) ? definition.meta : d.meta
      d.meta.input = (!isObject(d.meta.input)) ? {} : d.meta.input
      d.meta.style = (!isObject(d.meta.style)) ? {} : d.meta.style
    }


    s = (isObject(s)) ? s : {}
    api = (isObject(api)) ? api : {outputs: [], options: []}

    // style
    if (Object.keys(d?.meta.style).length == 0 &&
        Object.keys(this.style).length > 0)
        d.meta.style = this.buildConfigStyleTab()

    // output
    if (Object.keys(d.output).length == 0) {
      for (let o of api.outputs) {
        d.output[o.name] = []
      }
    }
    for (let o in d.output) {
      if (!isArray(d.output[o])) 
        d.output[o] = []
    }

    // input
    const input = {...d.input, ...s}
    delete input.style
    d.input = input

    const validate = (src, def) => {
      for (let f of def) {
        // if input value is type is incorrect, use the default
        if (typeof src[f.name] !== f.type)
          src[f.name] = f.defaultValue

        if ("range" in def)
          src[f.name] = limit(src[f.name], f.range.min, f.range.max)

        const n = {
          entry: f?.name,
          label: f?.displayName,
          type: f?.type,
          value: src[f.name],
          default: f?.defaultValue,
          "data-oldval": src[f.name],
          "data-default": f?.defaultValue,
          max: f?.range?.max,
          min: f?.range?.min,
          title: f?.hint
        }

        d.meta.input[f.name] = {...n, ...d.meta.input[f.name]}

        if (f.name in d.input)
          d.meta.input[f.name].value = d.input[f.name]
      }
    }

    // process options
    d.meta.input = this.buildConfigInputTab() || {}

    for (let def of api.options) {
      if (def.name in input)
        validate(input, api.options)
      else if (isObject(input?.definition?.input) && 
                def.name in input.definition.input)
        validate(input.definition.input, api.options)
    }

    for (let i in d.meta) {
      if (Object.keys(d.meta[i]).length == 0)
        delete d.meta[i]
    }
  }


  addLegend() {
    let legend = {
      id: this.id,
      title: this.legendName,
      visible: this.#legendVisibility,
      type: "indicator",
      parent: this,
      source: this.legendInputs.bind(this)
    }
    this.#legendID = this.chart.legend.add(legend)
  }

  /**
   * return index from cursor position and colours
   * @param {Array} [pos=this.chart.cursorPos]
   * @returns {Object}  
   * @memberof indicator
   */
  legendInputs(pos=this.chart.cursorPos) {
    const colours = [this.style.stroke]

    let index = this.Timeline.xPos2Index(pos[0])

    let c = index  - (this.range.data.length - this.overlay.data.length)
    let l = limit(this.overlay.data.length - 1, 0, Infinity)
        c = limit(c, 0, l)

    return {c, colours}
  }

  indicatorInput(start, end) {
    let input = {
      inReal: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    }
    do {
      input.inReal.push(this.range.value(start)[OHLCV.c])
      input.open.push(this.range.value(start)[OHLCV.o])
      input.high.push(this.range.value(start)[OHLCV.h])
      input.low.push(this.range.value(start)[OHLCV.l])
      input.close.push(this.range.value(start)[OHLCV.c])
      input.volume.push(this.range.value(start)[OHLCV.v])
    }
    while (start++ < end)
    return input
  }

  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1
      return {
        key: `${this.shortName}${num}`, 
        title: `${this.shortName}${num}: `, 
        type: 'line'
      }
    })
  }

  TALibParams() {
    let end = this.range.dataLength
    let step = this.definition.input.timePeriod
    let start = end - step //+ 1
    let input = this.indicatorInput(start, end)
    let hasNull = input.inReal.find(element => element === null)
    if (hasNull) return false
    else return { timePeriod: step, ...input }
  }

  /**
 * Calculate indicator values for chart history - partial or entire
 * @param {string} indicator - the TALib function to call
 * @param {Object} params - parameters for the TALib function
 * @param {Object} [range=this.range] - range instance or definition
 * @returns {boolean} - success or failure
 */
  calcIndicator (indicator, params={}, range=this.range) {
    if (this.chart.status == 'destroyed' ||
        !isString(indicator) ||
        !(indicator in this.TALib) ||
        !isObject(range) ||
        !this.core.TALibReady
        ) return false

        params.timePeriod = params.timePeriod || this.definition.input.timePeriod || DEFAULT_PERIOD
        let start, end;
        let p = params.timePeriod
        let od = this.overlay.data
    
        // is it a Range instance?
        if (range instanceof Range) {
          start = 0
          end = range.dataLength - p + 1
        }
        else if ( "indexStart" in range || "indexEnd" in range ||
                  "tsStart" in range ||  "tsEnd" in range ) {
          start = range.indexStart || this.Timeline.t2Index(range.tsStart || 0) || 0
          end = range.indexEnd || this.Timeline.t2Index(range.tsEnd) || this.range.Length - 1
          end - p
        }
        else return false
    
        // check if a full or only partial calculation is required
        // full calculation required
        if (od.length == 0) { }
        // partial calculation required
        else if (od.length + p !== range.dataLength) {
          // new data in the past?
          if (od[0][0] > range.value(p)[0]) {
            start = 0
            end = range.getTimeIndex(od[0][0]) - p
            end = limit(end, p, range.dataLength - 1)
          }
          // new data in the future ?
          else if (od[ od.length - 1 ][0] < range.value( range.dataLength - 1 )[0]) {
            start = od.length - 1 + p
            start = limit(start, 0, range.dataLength)
            end = range.dataLength - 1
          }
          // something is wrong
          else return false
        }
        // up to date, no need to calculate
        else return false

        // if not enough data for calculation fail
        if ( end - start < p ) return false
  
        let data = [];
        let i, v, entry, input;
    
        while (start < end) {
          // fetch the data required to calculate the indicator
          input = this.indicatorInput(start, start + p)
          params = {...params, ...input}
          // let hasNull = params.inReal.find(element => element === null)
          // if (hasNull) return false
    
          entry = this.TALib[indicator](params)
    
          v = []
          i = 0
          for (let o in this.definition.output) {
            v[i++] = entry[o][0]
          }
          // store entry with timestamp
          data.push([range.value(start + p - 1)[0], ...v])
          // data.push([range.value(start - 1)[0], ...v])

          start++
        }
        return data
  }

  /**
   * calculate back history if missing
   * @memberof indicator
   */
  calcIndicatorHistory () {
    const calc = () => {
      let od = this.overlay.data
      if (isArray(od) && od.length > 0) return

      const data = this.calcIndicator(this.libName, this.definition.input, this.range);
      if (data) {
        const d = new Set(data)
        const o = new Set(od)
        let a, p, r = {};
        if (!isArray(od) ||
            od.length == 0 ) {
            this.overlay.data = data
            return
        }
        else if (data[0][0] < od[0][0]) {
          // let s = new Set([...d, ...o])
          // this.overlay.data = Array.from(s)
          a = data
          p = od
        }
        else if (data[data.length-1][0] > od[od.length-1][0]) {
          // let s = new Set([...o, ...d])
          // this.overlay.data = Array.from(s)
          a = od
          p = data
        }
        
        for (let v of a) {
          r[v[0]] = v
        }
        for (let v of p) {
          r[v[0]] = v
        }
        this.overlay.data = Object.values(r)

        this.setRefresh()
      }
    }
    if (this.core.TALibReady) calc()
    else  this.core.talibAwait.push(calc.bind(this))
  } 

  /**
   * Calculate indicator value for current stream candle
   * @param {string} indicator - the TALib function to call
   * @param {Object} params - parameters for the TALib function
   * @param {Object} range - Range instance
   * @returns {array} - indicator data entry
   */
  calcIndicatorStream (indicator, params, range=this.range) {
    if (this.chart.status == 'destroyed' ||
        !this.core.TALibReady ||
        !isString(indicator) ||
        !(indicator in this.TALib) ||
        !(range instanceof Range) ||
        range.dataLength < this.definition.input.timePeriod 
        ) return false

    let entry = this.TALib[indicator](params)
    let end = range.dataLength
    let time = range.value(end)[0]
    let v = []
    let i = 0

    for (let o in this.definition.output) {
      v[i++] = entry[o][0]
    }

    return [time, ...v]
  }

  /**
   * process stream and create new indicator data entry
   * @param {Array} value - current stream candle 
   * @memberof indicator
   */
  newValue (value) {
    let p = this.TALibParams()
    if (!p) return false

    let v = this.calcIndicatorStream(this.libName, p)
    if (!v) return false

    this.overlay.data.push(v)

    this.target.setPosition(this.core.scrollPos, 0)
    this.doDraw = true
    this.draw(this.range)
  }

  /**
   * process stream and update current (last) indicator data entry
   * @param {Array} value - current stream candle 
   * @memberof indicator
   */
  updateValue (value) {
    let l = this.overlay.data.length - 1
    let p = this.TALibParams()
    if (!p) return false

    let v = this.calcIndicatorStream(this.libName, p)
    if (!v) return false

    this.overlay.data[l] = v

    this.target.setPosition(this.core.scrollPos, 0)
    this.doDraw = true
    this.draw(this.range)
  }

  /**
   * plot 
   *
   * @param {Array} plots - array of inputs, eg. x y coords [{x:x, y:y}, ...]
   * @param {string} type
   * @param {Object} opts
   * @memberof Indicator
   */
  plot(plots, type, opts ) {
    super.plot(plots, type, opts )
  }

  draw() {
  }

  updated() {
    this.setRefresh()
    super.updated()
  }
}
