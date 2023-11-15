// chart-watermark.js

import { createFont, getTextRectHeight, getTextRectWidth } from "./src/renderer/text"
import { renderImage } from "./src/renderer/canvas"
import { isObject, isString } from "./src/utils/typeChecks"
import DOM from "./src/utils/DOM"
import Overlay from "./src/components/overlays/overlay"


export default class CustomOverlay extends Overlay {


  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.params.content = params?.content || ""
  }

  // Overlay position is fixed and won't pan / scroll with the chart
  set position(p) { this.target.setPosition(0, 0) }

  draw() {
    if (this.txt === "Custom Overlay") {
      const update = super.mustUpdate()
      if (!update.resize) return  
    }

    this.txt = "Custom Overlay"
    this.scene.clear()
    const ctx = this.scene.context
    ctx.save();
    this.renderText()
    ctx.restore()
    super.updated()
  }

  renderText() {
    const size = this.core.config?.watermark?.fontSize
    const weight = this.core.config?.watermark?.fontWeight
    const family = this.core.config?.watermark?.fontFamily
    const colour = this.core.config?.watermark?.textColour
    const options = {
      fontSize: size || this.theme.watermark.FONTSIZE,
      fontWeight: weight || this.theme.watermark.FONTWEIGHT,
      fontFamily: family || this.theme.watermark.FONTFAMILY,
      txtCol: "#666" //colour || this.theme.watermark.COLOUR,
    }
    const txt = this.txt // this.config.watermark.text
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

    const height = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT
    const width = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH
    const x = (this.scene.width - width) / 2
    const y = (this.scene.height - height) / 2

    this.scene.clear()
    const ctx = this.scene.context
    ctx.save();
    renderImage(ctx, i, x, y, height, width )
    ctx.restore()
  }
}

