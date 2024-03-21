// colourPicker.js
// Colour Picker

import Dialogue from "./dialogue";
import { uid } from "../../utils/utilities";


export default class ColourPicker extends Dialogue {

  static name = "ColourPicker"
  static type = "colourPicker"
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
    config.type = ColourPicker.type
    config.class = "picker"
    config.id = uid("picker")

    return new ColourPicker(widgets, config)
  }

  static defaultNode() {
    const windowStyle = ``
    const node = `
      <div slot="widget" class="tradeXcolourPicker" style="${windowStyle}">
      </div>
    `
    
    return node
  }

  #update = true
  #elColourPicker

  constructor(widgets, config) {
    super(widgets, config)
  }

  destroy() {
    super.destroy()
  }

  set update(u) { this.#update = !!u }
  get update() { return this.#update }
  get elColourPicker() { return this.#elColourPicker }

  start() {
    // this.elContent.innerHTML = `<tradex-colourpicker></tradex-colourpicker>`

    const element = document.createElement("tradex-colourpicker")
    // element.classList.add(type)
    this.elContent.appendChild(element)
    this.#elColourPicker = element
  }

  open(data={}) {
    this.#elColourPicker.colour = data?.params?.colour
    super.open(data)
  }

}
