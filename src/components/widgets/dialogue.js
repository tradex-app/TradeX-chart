// dialogue.js

import { isArray, isBoolean, isFunction, isObject } from "../../utils/typeChecks";
import Window from "./window";
import { uid } from "../../utils/utilities";
import { provideEventListeners } from "./components/listeners";

export default class Dialogue extends Window {

  static Name = "Dialogues"
  static type = "dialogue"
  static class = "tradeXdialogue"

  static defaultStyles = `
  /** default Dialogue widget styles */
  `

  static create(widgets, cfg) {

    const styles = {
      window: {"box-shadow": "rgb(0,0,0) 0px 20px 30px -10px"},
      content: {padding: "1em"},
      title: {padding: "0 1em", background: "#333"},
    }

    cfg.dragBar = (isBoolean(cfg?.dragBar)) ? cfg.dragBar : true
    cfg.close = (isBoolean(cfg?.close)) ? cfg.close : true
    cfg.type = cfg?.type || Dialogue.type 
    cfg.class = cfg?.class || "dialogue"
    cfg.id = cfg?.id || uid("dialogue")

    return super.create(widgets, cfg)
  }

  static defaultNode() {
    const windowStyle = ``
    const node = `
      <div slot="widget" class="tradeXdialogue" style="${windowStyle}">
      </div>
    `
    return node
  }

  constructor(widgets, config) {
    super(widgets, config)
  }

  destroy() {
    super.destroy()
  }
  
  get type() { return Dialogue.type }

  /**
   * build dialogue widget
   * @param {string} [content=""]
   * @param {array} [buttons=[]]
   * @return {object}  
   * @memberof Dialogue
   */
  dialogueBuild(content="", buttons=[]) {

    let modifiers = {buttons: {}}
    let buttonHTML = `
    <input class="submit" type="submit" value="Submit"/>
    <input class="cancel" type="button" value="Cancel"/>
    <input class="default" type="button" value="Default"/>
    `
    // process custom buttons
    if ( isArray(buttons) && 
         buttons.length > 1 ) {

    }
    // use default buttons
    else 
    {
      // define callbacks for button click
      modifiers.submit =
        provideEventListeners(`input.submit`, 
        [{
          event: "click", 
          fn: (e) => {
          if (isFunction(this.parent.onConfigDialogueSubmit))
            this.parent.onConfigDialogueSubmit(this)
          }
        }]
        )
      modifiers.cancel =
        provideEventListeners(`input.cancel`, 
        [{
          event: "click", 
          fn: (e) => {
          if (isFunction(this.parent.onConfigDialogueCancel))
            this.parent.onConfigDialogueCancel(this)
          }
        }]
        )

      modifiers.default =
        provideEventListeners(`input.default`, 
        [{
          event: "click", 
          fn: (e) => {
          if (isFunction(this.parent.onConfigDialogueDefault))
            this.parent.onConfigDialogueDefault(this)
          }
        }]
        )
    }

    const html = `
    ${new String(content)}
    <div class="buttons">
      ${buttonHTML}
    </div>
    `
    return {html, modifiers}
  }

}
// end of class Dialogue
