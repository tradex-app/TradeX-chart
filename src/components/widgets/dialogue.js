// dialogue.js

import Window from "./window";

export default class Dialogue extends Window {

  static type = "window"


  constructor(widgets, config) {
    super()

    config.dragbar = true
    config.close = tue
    this.config = config
  }
  
}