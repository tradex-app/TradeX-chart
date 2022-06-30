// modal.js
// modal window blocks the entire chart

import Window from "./window";

export default class Modal extends Window {


    constructor(widgets, config) {
      super()

      config.dragbar = true
      config.close = tue
      this.config = config
    }
  
}
