// chart-watermark.js

import { createFont, getTextRectHeight, getTextRectWidth } from "../../utils/canvas"
import { isObject, isString } from "../../utils/typeChecks"
import Overlay from "./overlay"
import { GlobalStyle } from "../../definitions/style"

const watermark = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: GlobalStyle.FONTFAMILY,
  COLOUR: "#181818",
}

export default class chartWatermark extends Overlay {


  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.params.content = params?.content || ""
  }

  set position(p) { this.target.setPosition(0, 0) }

  draw() {

    let isText = isString(this.config?.watermark?.text)
    let isImage = isString(this.config?.watermark?.imgURL)

    if ( !isText && !isImage ) return

    this.scene.clear()
    const ctx = this.scene.context
    ctx.save();

    if (isText) this.renderText()
    else if (isImage) this.renderImage()

    ctx.restore()
  }

  renderText() {
    const size = this.core.config?.watermark?.fontSize
    const weight = this.core.config?.watermark?.fontWeight
    const family = this.core.config?.watermark?.fontFamily
    const colour = this.core.config?.watermark?.textColour
    const options = {
      fontSize: size || watermark.FONTSIZE,
      fontWeight: weight || watermark.FONTWEIGHT,
      fontFamily: family || watermark.FONTFAMILY,
      txtCol: colour || watermark.COLOUR,
    }
    const txt = this.config.watermark.text
    const ctx = this.scene.context
    ctx.font = createFont(options?.fontSize, options?.fontWeight, options?.fontFamily)
    ctx.textBaseline = 'top';
    ctx.fillStyle = options.txtCol // || defaultOptions.txtCol;

    const height = getTextRectHeight(options)
    const width = getTextRectWidth(ctx, txt, options)
    const x = (this.scene.width - width) / 2
    const y = (this.scene.height - height) / 2

    ctx.fillText(txt, x, y);
  }

  renderImage() {
    const ctx = this.scene.context
  }
}

