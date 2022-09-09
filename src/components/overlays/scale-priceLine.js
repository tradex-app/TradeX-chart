// scale-priceLine.js

import { STREAM_UPDATE } from "../../definitions/core"
import { CandleStyle, YAxisStyle } from "../../definitions/style";
import { drawTextBG } from "../../utils/canvas"


export default class scalePriceLine {

  #core
  #config
  #scale
  #target
  #viewport
  #scene

  constructor(target, scale, config) {
    this.#target = target
    this.#viewport = target.viewport
    this.#scene = target.scene
    this.#config = config
    this.#scale = scale
    this.#core = scale.core

    this.start()
  }

  start() {
    this.eventListeners()
  }
  end() {
    this.off(STREAM_UPDATE, this.onStreamUpdate)
  }

  eventListeners() {
    this.on(STREAM_UPDATE, (e) => { this.onStreamUpdate(e) })
  }

  on(topic, handler, context) {
    this.#scale.on(topic, handler, context)
  }

  off(topic, handler) {
    this.#scale.off(topic, handler)
  }

  emit(topic, data) {
    this.#scale.emit(topic, data)
  }

  onStreamUpdate(e) {
    this.draw(e)
  }

  draw(candle) {

    let price = candle[4],
        y = this.#scale.yPos(price),
        nice = this.#scale.nicePrice(price),
        options = {
          fontSize: YAxisStyle.FONTSIZE * 1.05,
          fontWeight: YAxisStyle.FONTWEIGHT,
          fontFamily: YAxisStyle.FONTFAMILY,
          txtCol: YAxisStyle.COLOUR_CURSOR,
          bakCol: YAxisStyle.COLOUR_CURSOR_BG,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 3,
          paddingRight: 3
        },
        
    height = options.fontSize + options.paddingTop + options.paddingBottom,
    yPos = y - (height * 0.5);

    this.#scene.clear()
    const ctx = this.#scene.context
    ctx.save()

    if (candle[4] >= candle[1]) options.bakCol = CandleStyle.COLOUR_CANDLE_UP
    else options.bakCol = CandleStyle.COLOUR_CANDLE_DN

    ctx.fillStyle = options.bakCol
    ctx.fillRect(1, yPos, this.width, height)

    drawTextBG(ctx, `${nice}`, 1, yPos , options)

    ctx.restore()
    this.#viewport.render()
  }
}
