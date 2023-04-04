// scale-priceLine.js

import Overlay from "./overlay"
import { STREAM_UPDATE } from "../../definitions/core"
import { CandleStyle, YAxisStyle } from "../../definitions/style";
import { createFont, drawTextBG, getTextRectHeight } from "../../utils/canvas"


export default class ScalePriceLine extends Overlay {


  constructor(target, xAxis, yAxis, theme, parent, params) {

    parent = yAxis
    yAxis = yAxis.yAxis

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(candle) {

    if (candle === undefined) return

    const streaming = this.core.stream.constructor.name == "Stream" &&
                      this.config.stream.tfCountDown

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
    h,
    height = options.fontSize + options.paddingTop + options.paddingBottom,
    yPos = y - (height * 0.5);

    this.scene.clear()
    const ctx = this.scene.context
    ctx.save()

    // TODO: get candle colours from config / theme
    if (candle[4] >= candle[1]) options.bakCol = this.theme.candle.UpBodyColour
    else options.bakCol = this.theme.candle.DnBodyColour

    let x = 1

    ctx.font = createFont(options?.fontSize, options?.fontWeight, options?.fontFamily)
    /// draw text from top - makes life easier at the moment
    ctx.textBaseline = 'top';
  
    /// color for background
    ctx.fillStyle = options.bakCol || defaultOptions.bakCol;

    // get width of text
    h = getTextRectHeight(options)
    height = (streaming) ? h * 2 : h

    /// draw background rect
    ctx.fillRect(x, yPos, this.viewport.width, height);

    // draw text on top
    ctx.fillStyle = options.txtCol || defaultOptions.txtCol;
    x = x + options?.paddingLeft
    yPos += options?.paddingTop
    ctx.fillText(`${nice}`, x, yPos);

    if (streaming) {
      yPos += h
      nice = this.core.stream.countDownUpdate()
      ctx.font = createFont(options?.fontSize / 1.1, options?.fontWeight, options?.fontFamily)
      ctx.fillText(nice, x, yPos);
    }

    ctx.restore()
    this.viewport.render()
  }
}
