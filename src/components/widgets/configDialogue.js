// config.js
// Config Dialogue

import Dialogue from "./dialogue";
import { isBoolean, isString, isObject, isFunction } from "../../utils/typeChecks";
import { uid } from "../../utils/utilities";
import { htmlInput, inputTypes } from "../../utils/DOM";
import { tabsBuild, tabStyles } from "../views/tabs";

export default class ConfigDialogue extends Dialogue {

  static name = "ConfigDialogues"
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

  configBuild(c={}) {

    let {content, modifiers={}} = this.configContent(c)

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
   * @param {object} input - tabs {row: {attribute, attribute, ...}}
   * @returns {object} - {content: string, modifiers: object}
   */
  configContent(input) {
    if (!isObject(input)) return `<p>Input missing!</p>`

    let content = {}
    let modifierList = {}

    // iterate over tabs
    for (let i in input) {
      if (!isObject(input[i])) {
        this.core.error(`ERROR: Building Config Dialogue : Input malformed`)
        continue;
      }
      content[i] = ``
      // iterate over content rows
      for (let row in input[i]) {
        // standard input types
        if (inputTypes.includes(input[i][row]?.type)) {
          content[i] += htmlInput(i, input[i][row])
        }
        // other form element types
        // if...

        const modifiers = [ "$function" ]
        
        for (let modifier in input[i][row]) {
          if (modifiers.includes(modifier)) {

            switch (modifier) {
              case "$function":
                if (isFunction(input[i][row][modifier]))
                  modifierList[row] = input[i][row][modifier]
                break;
            }
          }
        }
      }

    }
    return {content, modifiers: modifierList}
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

  provideEventListener(selector, event, fn) {
    const func = (el) => {
      const elm = el.querySelector(selector)
      if (!!elm)
        elm.addEventListener(event, 
        (e) => {
          fn(e)
        })
    }
    return func
  }

  provideInputColor(el, selector) {
    const input = el.querySelector(selector)
    const colourInput = document.createElement("tradex-colourinput")
    colourInput.setTarget(input)
    colourInput.style.display = "inline-block"
  }
}
