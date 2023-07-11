// chart-watermark.js

import { createFont, getTextRectHeight, getTextRectWidth } from "../../renderer/text"
import { renderImage } from "../../renderer/canvas"
import { isObject, isString } from "../../utils/typeChecks"
import DOM from "../../utils/DOM"
import Overlay from "./overlay"
import { GlobalStyle } from "../../definitions/style"

const watermark = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: GlobalStyle.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}

export default class chartWatermark extends Overlay {


  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.params.content = params?.content || ""
  }

  set position(p) { this.target.setPosition(0, 0) }

  draw() {

    if ( this.config?.watermark?.imgURL )
      DOM.isImage(this.config?.watermark?.imgURL, this.renderImage.bind(this))

    else if ( isString(this.config?.watermark?.text) ) {
      this.scene.clear()
      const ctx = this.scene.context
      ctx.save();
      this.renderText()
      ctx.restore()
    }
    else return


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

  renderImage(i) {
    if (!i) return

    const height = this.core.config?.watermark?.imgHeight || watermark.IMGHEIGHT
    const width = this.core.config?.watermark?.imgWidth || watermark.IMGWIDTH
    const x = (this.scene.width - width) / 2
    const y = (this.scene.height - height) / 2

    this.scene.clear()
    const ctx = this.scene.context
    ctx.save();
    renderImage(ctx, i, x, y, height, width )
    ctx.restore()
  }
}

