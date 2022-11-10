// scale-priceLine.js

import { STREAM_UPDATE } from "../../definitions/core"
import { CandleStyle, YAxisStyle } from "../../definitions/style";
import { drawTextBG, getTextRectHeight } from "../../utils/canvas"


export default class scalePriceLine {

  #core
  #config
  #theme
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
    this.#theme = scale.core.theme

    this.start()
  }

  set position(p) { this.#target.setPosition(p[0], p[1]) }

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

  draw(update=false, candle) {

    if (this.#core.scrollPos != this.#core.bufferPx * -1 || 
        this.#core.scrollPos != 0 || 
                      update != true) 
    { return }

    let price = candle[4],
        y = this.#scale.yPos(price),
        nice = this.#scale.nicePrice(price),
        options = {
          fontSize: YAxisStyle.FONTSIZE * 1.05,
          fontWeight: YAxisStyle.FONTWEIGHT,
          fontFamily: YAxisStyle.FONTFAMILY,
          txtCol: "#FFFFFF", //YAxisStyle.COLOUR_CURSOR,
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

    // TODO: get candle colours from config / theme
    if (candle[4] >= candle[1]) options.bakCol = this.#theme.candle.UpBodyColour
    else options.bakCol = this.#theme.candle.DnBodyColour

    ctx.fillStyle = options.bakCol
    ctx.fillRect(1, yPos, this.width, height)

    drawTextBG(ctx, `${nice}`, 1, yPos , options)

    ctx.restore()
    this.#viewport.render()
  }
}
