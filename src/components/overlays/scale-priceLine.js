// scale-priceLine.js
// display current (stream) price on Y-Axis / Scale

import Overlay from "./overlay"
import Stream from "../../helpers/stream";
import { YAxisStyle } from "../../definitions/style";
import { renderTextBG, getTextRectHeight } from "../../renderer/text"

export const priceLineTxtScaling = 1.05

export default class ScalePriceLine extends Overlay {

  #opts
  #txtH

  constructor(target, xAxis, yAxis, theme, parent, params) {

    parent = yAxis
    yAxis = yAxis.yAxis

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport
    this.#opts = {
      fontSize: YAxisStyle.FONTSIZE * priceLineTxtScaling,
      fontWeight: YAxisStyle.FONTWEIGHT,
      fontFamily: YAxisStyle.FONTFAMILY,
      txtCol: "#FFFFFF", //YAxisStyle.COLOUR_CURSOR,
      bakCol: YAxisStyle.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }
    this.#txtH = getTextRectHeight(this.#opts)
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }

  draw(candle) {

    if (candle === undefined ||
        !this.parent.parent.isPrimary) 
        return

    const ctx = this.scene.context
    const streaming = this.core.stream instanceof Stream &&
                      this.config.stream.tfCountDown

    let price = candle[4],
        nice = this.parent.nicePrice(price),
        options = {...this.#opts},
        x = 0,
        h = this.#txtH,
        y = this.parent.yPos(price) - (h * 0.5);

    this.scene.clear()
    ctx.save()

    if (candle[4] >= candle[1]) options.bakCol = this.theme.candle.UpBodyColour
    else options.bakCol = this.theme.candle.DnBodyColour

    renderTextBG(ctx, nice, x, y, options)

    if (streaming) {
      nice = this.core.stream.countDownUpdate()
      options.fontSize = options?.fontSize / 1.1
      renderTextBG(ctx, nice, x, y+h, options)
    }

    ctx.restore()
    this.viewport.render()
  }
}
