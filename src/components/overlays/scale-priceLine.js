// scale-priceLine.js

import Overlay from "./overlay"
import { STREAM_UPDATE } from "../../definitions/core"
import { CandleStyle, YAxisStyle } from "../../definitions/style";
import { createFont, drawTextBG, getTextRectHeight } from "../../utils/canvas"


export default class scalePriceLine extends Overlay {


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
    this.off(STREAM_UPDATE, this.onStreamUpdate)
  }

  eventListeners() {
    this.on(STREAM_UPDATE, (e) => { this.onStreamUpdate(e) })
  }

  on(topic, handler, context) {
    this.parent.on(topic, handler, context)
  }

  off(topic, handler) {
    this.parent.off(topic, handler)
  }

  emit(topic, data) {
    this.parent.emit(topic, data)
  }

  onStreamUpdate(e) {
    this.draw(e)
  }

  draw(candle) {

    if (candle === undefined) return

    let price = candle[4],
        y = this.parent.yPos(price),
        nice = this.parent.nicePrice(price),
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

    this.scene.clear()
    const ctx = this.scene.context
    ctx.save()

    // TODO: get candle colours from config / theme
    if (candle[4] >= candle[1]) options.bakCol = this.theme.candle.UpBodyColour
    else options.bakCol = this.theme.candle.DnBodyColour

    ctx.fillStyle = options.bakCol

    let x = 1

    ctx.font = createFont(options?.fontSize, options?.fontWeight, options?.fontFamily)
    /// draw text from top - makes life easier at the moment
    ctx.textBaseline = 'top';
  
    /// color for background
    ctx.fillStyle = options.bakCol || defaultOptions.bakCol;

    // get width of text
    height = getTextRectHeight(options)

    /// draw background rect
    ctx.fillRect(x, yPos, this.viewport.width, height);

    // draw text on top
    ctx.fillStyle = options.txtCol || defaultOptions.txtCol;
    x = x + options?.paddingLeft
    yPos += options?.paddingTop
    ctx.fillText(`${nice}`, x, yPos);

    ctx.restore()
    this.viewport.render()
  }
}
