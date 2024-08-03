// config.js
// Config Dialogue

import Dialogue from "./dialogue";
import { isBoolean, isString, isObject, isFunction, isArray } from "../../utils/typeChecks";
import { uid } from "../../utils/utilities";
import { htmlInput, htmlSelect, inputTypes } from "../../utils/DOM";
import { tabsBuild, tabStyles } from "../views/tabs";
import { RGBAHex } from "../../utils/colour";

export default class ConfigDialogue extends Dialogue {

  static Name = "ConfigDialogues"
  static type = "configDialogue"
  static class = "tradeXconfig"

  static defaultStyles = `
  /** default Config Dialogue widget styles */
  
  .tradeXwindow.config {
    /* overflow: hidden; */
    background: none;
  }

  .tradeXwindow.config .content {
    padding: 0;
    position: relative;
  }

  .tradeXwindow.config .buttons {
    background: #ffffffbb;
    display: flex;
    justify-content: flex-end;
    padding: 3px 1em;
    border-radius: 0 0 5px 5px;
  }

  .tradeXwindow.config .buttons input {
    margin-left: 5px;
    font-size: 1em;
    padding: 1px .5em;
  }

  ${tabStyles} 

  .tradeXwindow.config .content tradex-colourpicker {
    position: absolute;
    display: none !important;
  }

  .tradeXwindow.config .content tradex-colourpicker.active {
    display: block !important;
  }
  `

  static create(widgets, config) {

    config.dragBar = true
    config.close = true
    config.type = ConfigDialogue.type
    config.class = "config"
    config.id = uid("config")

    return new ConfigDialogue(widgets, config)
  }

  static defaultNode() {
    const windowStyle = ``
    const node = `
      <div slot="widget" class="tradeXconfig" style="${windowStyle}">
      </div>
    `
    return node
  }

  #update = true

  constructor(widgets, config) {
    super(widgets, config)
  }

  destroy() {
    super.destroy()
    this.elColourPicker.destroy()
  }

  set update(u) { this.#update = !!u }
  get update() { return this.#update }

  /**
   * Transform (tabbed) content object into HTML 
   * and provide any functions required for form elements
   * @param {object} [contObj={}] - content
   * @return {object} - {html, modifiers}
   * @memberof ConfigDialogue
   */
  configBuild(contObj={}) {

    let {content, modifiers={}} = this.configContent(contObj)

    const tabsHTML = `
    <div class="tabbedContent">
      <form class="tabs">
        ${tabsBuild(content)}
      </form>
    </div>
    <tradex-colourpicker></tradex-colourpicker>
    `
    const {html, modifiers: mods} = super.dialogueBuild(tabsHTML)
    modifiers = {...modifiers, ...mods}
    return {html, modifiers}
  }

  /**
   * build tabbed content object
   * @param {object} cfgObj - tabs {row: {attribute, attribute, ...}}
   * @returns {object} - {content: string, modifiers: object}
   */
  configContent(cfgObj) {
    if (!isObject(cfgObj)) return `<p>Config content missing!</p>`

    let obj;
    let content = {}
    let modifierList = {}

    // iterate over tabs
    for (let i in cfgObj) {
      content[i] = ""
      if (isArray(cfgObj[i])) {
        for (let j of cfgObj[i]) {
          for (let k in j.style) {
            obj = j.style[k]
            if (!isObject(obj)) continue
            this.configEntryFields(i, obj, content, modifierList)
          }
        }
      }
      else if (isObject(cfgObj[i])) {
        content[i] = ""
        for (let j in cfgObj[i]) {
          obj = cfgObj[i][j]
          this.configEntryFields(i, obj, content, modifierList)
        }
      }
      else {
        this.core.error(`ERROR: Building Config Dialogue : Input malformed`)
        continue;
      }
    }
    return {content, modifiers: modifierList}
  }

  /**
   *
   * @param {string} i - tab
   * @param {object} input - object to convert to tabbed content
   * @param {object} content ~ object to fill with processed tabbed content
   * @param {object} modifierList - object to fill with functions that will be attached to content
   * @memberof ConfigDialogue
   */

  configEntryFields(i, input, content, modifierList) {
    let id = (isString(input.entry)) ? input.entry : ""
    let label = (isString(input.label)) ? input.label : id

    switch(input.type) {
      case "select": content[i] += htmlSelect(label, input); break;
      default: content[i] += htmlInput(label, input); break;
    }
    modifierList[id] = input[ "$function" ]
  }

  /**
   * update config dialogue elements
   * @param {object} update - config dialogue elements to update
   * @returns {boolean|ConfigDialogue}
   */
  contentUpdate(update) {
    if (!isObject(update)) return false

    if (isString(update?.title)) this.setTitle(update.title)
    if (isString(update?.content)) this.setContent(this.configBuild(update.content))

    this.#update = true
    return this.#update
  }

  /**
   * Replaces input (selector) with tradex-colourinput
   * interdependent colour picker and text field
   * @param {HTMLElement} el
   * @param {string} selector
   * @memberof ConfigDialogue
   */
  provideInputColor(el, selector) {
    const input = el.querySelector(selector)
    const colourInput = document.createElement("tradex-colourinput")
    input.type = "text"
    input.pattern = RGBAHex
    colourInput.setTarget(input)
    colourInput.style.display = "inline-block"
  }
}
// end of class ConfigDialogue 
