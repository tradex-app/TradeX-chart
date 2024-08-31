// composite.js
// class to build composite indicators using existing indicators

import Overlay from "./overlay"
import { isArray, isBoolean, isFunction, isInteger, isNumber, isObject, isString, typeOf } from "../../utils/typeChecks"
import { idSanitize, uid, xMap } from "../../utils/utilities"
import Indicator from "./indicator"


export class Composite extends Overlay {

  static #cnt = 0
  static get cnt() { return ++Composite.#cnt }
  static get isIndicator() { return true }
  static get isComposite() { return true }

  #ID
  #cnt_
  #name
  #shortName
  #legendName
  #legendVisibility
  #primaryPane
  #chartPane
  #plots
  #params
  #overlay
  #TALib
  #range
  #style = {}
  #legendID
  #status
  #ConfigDialogue
  #ColourPicker

  #overlayClasses = new xMap()
  #overlayInstances = new xMap()

  constructor (target, xAxis=false, yAxis=false, config, parent, params) {

    super(target, xAxis, yAxis, undefined, parent, params)

    const overlay = params.overlay

    this.#cnt_ = Composite.cnt
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
  }

  destroy() {

    super.destroy()
  }

  init() {
    
  }

  get id() { return this.#ID || `${this.core.ID}-${this.chartPaneID}-${this.shortName}-${this.#cnt_}`}
  set id(id) { this.#ID = idSanitize(new String(id)) }
  get chartPane() { return this.core.ChartPanes.get(this.chartPaneID) }
  get chartPaneID() { return this.#params.overlay.paneID }
  get primaryPane() { return this.#primaryPane || this.constructor.primaryPane }
  set primaryPane(c) { this.#primaryPane = c }
  get params() { return this.#params }
  get Timeline() { return this.core.Timeline }
  get scale() { return this.parent.scale }
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

  addComponent(c, params) {
    switch (typeOf(c)) {
      case "string": this.addComponentOverlay(c, params); break;
      case "class": this.addComponentClass(c, params); break;
      case "object": this.addComponentInstance(c, params); break;
      default: return false;
    }
  }

  addComponentOverlay(c, params) {
    // is indicator?
    const ind = this.core.getIndicator(c)
    const o = this.core.hasOverlay(c)
    if (!!ind) {

    }
    // is overlay?
    else if (!!o) {
      
    }
    else return false
  }

  addComponentClass(c, params) {
    // is indicator?
    if (this.core.IDIndicator(c)) {

    }
    // is overlay?
    else if (this.core.IDOverlay(c)) {

    }
  }

  addComponentInstance(c, params) {

  }

  removeComponent(c) {

  }
}