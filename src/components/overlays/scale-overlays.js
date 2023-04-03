//  scale-overlays.js

import Overlay from "./overlay"

export default class scaleOverly extends Overlay {


  constructor(target, xAxis, yAxis, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport

    this.start()
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  start() {
    this.eventListeners()
  }

  end() {}

  eventListeners() {}

  draw() {

    this.scene.clear()
    const ctx = this.scene.context
    ctx.save()

    ctx.restore()
  }

}
