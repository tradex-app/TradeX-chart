// colourPicker.js
// Colour Picker

import Dialogue from "./dialogue";
import { uid } from "../../utils/utilities";


export default class ColourPicker extends Dialogue {

  static name = "ColourPicker"
  static type = "ColourPicker"
  static class = "tradeXcolourPicker"

  static defaultStyles = `
  /** default Colour Picker widget styles */

  .tradeXwindow.picker {
    overflow: hidden;
  }

  .tradeXwindow.picker .content {
    padding: 0;
  }
  `


  static create(widgets, config) {

    config.dragBar = true
    config.close = true
    config.type = Dialogue.type
    config.class = "picker"
    config.id = uid("picker")

    return new Dialogue(widgets, config)
  }

  static defaultNode() {
    const windowStyle = ``
    const node = `
      <div slot="widget" class="tradeXcolourPicker" style="${windowStyle}">
        <tradex-colourpicker></tradex-colourpicker>
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
  }

  set update(u) { this.#update = !!u }
  get update() { return this.#update }
}
