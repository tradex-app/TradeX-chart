// modal.js
// modal window blocks the entire chart

import Window from "./window";

export default class Modal extends Window {

  static type = "Modal"

  constructor(widgets, config) {
    super()

    config.dragbar = true
    config.close = tue
    this.config = config
  }
  
  get type() { return Modal.type }

}
