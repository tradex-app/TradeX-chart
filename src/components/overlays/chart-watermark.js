// chart-watermark.js

import { createFont, getTextRectHeight, getTextRectWidth } from "../../renderer/text"
import { renderImage } from "../../renderer/canvas"
import { isObject, isString } from "../../utils/typeChecks"
import { isImage } from "../../utils/DOM"
import Overlay from "./overlay"
import { CHART_MINH } from "../../definitions/style"


export default class chartWatermark extends Overlay {

  watermark = {}

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.params.content = params?.content || ""
  }

  // Overlay position is fixed and won't pan / scroll with the chart
  set position(p) { this.target.setPosition(0, 0) }

  draw() {
    const watermark = this.config?.watermark
    const update = super.mustUpdate()
    // const doImgURL = (this.watermark?.imgURL !== watermark?.imgURL) || update.resize
    // const doText = (this.watermark?.text !== watermark?.text) || update.resize

    if (watermark?.display === false) return

    if ( watermark?.imgURL ) {
      this.watermark.imgURL = watermark.imgURL
      isImage(watermark?.imgURL, this.renderImage.bind(this))
    }
    else if ( isString(watermark?.text) ) {
      this.watermark.text = watermark.text
      this.scene.clear()
      const ctx = this.scene.context
      ctx.save();
      this.renderText(watermark.text)
      ctx.restore()
    }
    else return
    super.updated()
  }

  renderText(txt) {
    const ratio = Math.floor(this.core.height / CHART_MINH)
    const size = this.core.config?.watermark?.fontSize
    const weight = this.core.config?.watermark?.fontWeight
    const family = this.core.config?.watermark?.fontFamily
    const colour = this.core.config?.watermark?.textColour
    const options = {
      fontSize: (size || this.theme.watermark.FONTSIZE) * ratio,
      fontWeight: weight || this.theme.watermark.FONTWEIGHT,
      fontFamily: family || this.theme.watermark.FONTFAMILY,
      txtCol: colour || this.theme.watermark.COLOUR,
    }
    const ctx = this.scene.context
    ctx.font = createFont(options?.fontSize, options?.fontWeight, options?.fontFamily)
    ctx.textBaseline = 'top';
    ctx.fillStyle = options.txtCol // || defaultOptions.txtCol;

    const height = getTextRectHeight(options)
    const width = getTextRectWidth(ctx, txt, options)
    const x = (this.scene.width - width) / 2
    const y = (this.core.Chart.height - height) / 2 // (this.scene.height - height) / 2

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

