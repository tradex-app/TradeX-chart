// scale-cursor.js

import Overlay from "./overlay"

export default class scaleCursor extends Overlay {

  #cursorPos

  constructor(target, xAxis, yAxis, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport

    this.start()
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  start() {
    this.eventListeners()
  }

  end() {
    this.off(`${this.parent.id}_mousemove`, this.onMouseMove)
    this.off(`${this.parent.id}_mouseout`, this.eraseCursorPrice)
  }

  eventListeners() {
    this.on(`${this.parent.id}_mousemove`, this.onMouseMove.bind(this))
    this.on(`${this.parent.id}_mouseout`, this.eraseCursorPrice.bind(this))
  }

  onMouseMove(e) {
    this.#cursorPos = (isArray(e)) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)]
    this.draw()
  }

  draw() {

    const ctx = this.scene.context

    let [x, y] = this.#cursorPos,
    price =  this.yPos2Price(y),
    nice = this.nicePrice(price),

    options = {
      fontSize: this.theme.yAxis.fontSize * 1.05,
      fontWeight: this.theme.yAxis.fontWeight,
      fontFamily: this.theme.yAxis.fontFamily,
      txtCol: this.theme.yAxis.colourCursor,
      bakCol: this.theme.yAxis.colourCursorBG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 3,
      paddingRight: 3
    },
    
    height = options.fontSize + options.paddingTop + options.paddingBottom,
    yPos = y - (height * 0.5);

    this.scene.clear()
    ctx.save()

    ctx.restore()
  }

  eraseCursorPrice() {
    this.scene.clear()
    this.target.viewport.render()
    return
  }
}

