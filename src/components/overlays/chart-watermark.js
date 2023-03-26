// chart-watermark.js

import { createFont, getTextRectHeight, getTextRectWidth } from "../../utils/canvas"
import Overlay from "./overlay"


export default class chartWatermark extends Overlay {


  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.params.content = params?.content || ""
  }

  set position(p) { this.target.setPosition(0, 0) }

  draw(content) {

return

    content = content || this.params.content

    const options = {
      fontSize: YAxisStyle.FONTSIZE * 1.05,
      fontWeight: YAxisStyle.FONTWEIGHT,
      fontFamily: YAxisStyle.FONTFAMILY,
      txtCol: "#FFFFFF", //YAxisStyle.COLOUR_CURSOR,
      bakCol: YAxisStyle.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 3,
      paddingRight: 3
    }

    this.scene.clear()
    const ctx = this.scene.context
    ctx.save();
    ctx.font = createFont(options?.fontSize, options?.fontWeight, options?.fontFamily)
    ctx.textBaseline = 'top';
    ctx.fillStyle = options.txtCol || defaultOptions.txtCol;

    height = getTextRectHeight(options)
    width = getTextRectWidth(options)

    ctx.fillText(text, x, yPos);
    ctx.restore()
    this.viewport.render()
  }

}

