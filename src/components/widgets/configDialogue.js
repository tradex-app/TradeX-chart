// config.js
// Config Dialogue

import Dialogue from "./dialogue";


export default class ConfigDialogue extends Dialogue {

  static type = "Window"

  static create(widgets, config) {

    config.dragBar = true
    config.close = true
    config.class = "config"

    return super.create(widgets, config)
  }

  constructor(widgets, config) {
    super(widgets, config)
  }
}
