// config.js
// Config Dialogue

import Dialogue from "./dialogue";


export default class ConfigDialogue extends Dialogue {

  static type = "ConfigDialogue"

  static create(widgets, config) {

    config.dragBar = true
    config.close = true

    return super.create(widgets, config)
  }

  constructor(widgets, config) {
    super(widgets, config)
  }
}
