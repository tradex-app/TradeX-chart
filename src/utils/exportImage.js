// exportImage.js

import CEL from "../components/primitives/canvas"
import { renderLineHorizontal } from "../renderer/line"
import { renderRectFill } from "../renderer/rect"
import { renderText } from "../renderer/text"

/**
 * 
 * @param {tradeXChart} core - root API
 * @param {string} type - image type "img/png"|"img/jpg"|"img/webp"
 * @param {number} quality - image quality 0 - 1
 * @param {sting} output - generate a data URL or file download "url"|"download"
 */
export default function exportImage(core, dest, type, quality, output) {
  const theme = core.theme
  const container = document.createElement("template")
  const time = core.Timeline.graph.viewport.scene
  const main = core.MainPane
  const mainScene = main.graph.viewport.scene
  const width = main.width
  const height = main.height
  const imgViewport = new CEL.Viewport({
    width: width,
    height: height,
    container: container
  })
  const ctx = imgViewport.scene.context
  // const chartScene = core.Chart.graph.viewport.scene

  ctx.save()

  // fill background
  renderRectFill(ctx, 0, 0, width, height, {fill: theme.chart.Background})
  // underlying grid
  ctx.drawImage(mainScene.canvas, 0, 0, mainScene.width, mainScene.height)
  // iterate over chart panes and y axes
  let y = 0
  let x1 = 0 
  let x2 = width - core.Chart.scale.width
  if (theme?.yAxis?.location == "left") {
    x1 = core.Chart.scale.width
    x2 = 0
  }
  let opts
  for (const [key, value] of core.ChartPanes) {
    let scene = value.graph.viewport.scene
    let {width, height} = scene
    let scale = value.scale.graph.viewport.scene
    let {width: w, height: h} = scale
    // draw divider
    if (y > 0) {
      opts = { stroke: "#ccc"} // theme.chart.BorderColour}
      renderLineHorizontal(ctx, y, 0, main.width, opts)
    }
    ctx.drawImage(scene.canvas, x1, y, width, height)
    ctx.drawImage(scale.canvas, x2, y-1, w, h)
    y += height
  }
  // timeline
  ctx.drawImage(time.canvas, 0, y, time.width, time.height)
  // title
  opts = {
    text: core.config.title,
    colour: theme.chart.TextColour,
    fontSize: theme.chart.FontSize * 1.5,
    fontWeight: "normal",
    fontFamily: theme.chart.FontFamily,
    textBaseLine: "top"
  }
  renderText(ctx, 6, 6, opts)

  ctx.restore()

  const cleanUp = () => {
    imgViewport.destroy()
    container.remove()
  }

  switch(output) {
    case "url": 
      const cb = (r) => {
        dest(r)
        cleanUp()
      }
      imgViewport.scene.toImage(type, quality, cb); 
      break;
    case "download":
    default:
      // trigger file download
      imgViewport.scene.export({fileName: dest}, null, type, quality);
      cleanUp;
      break;
  }
}
