// dialogue.js

import Window from "./window";

export default class Dialogue extends Window {

  static type = "Dialogue"


  constructor(widgets, config) {
    super()

    config.dragbar = true
    config.close = true
    this.config = config
  }
  
  get type() { return Dialogue.type }

}