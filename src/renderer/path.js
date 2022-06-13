// path.js
/**
 * Draw a path
 * @param ctx
 * @param coordinates
 * @param strokeFill
 */
export function renderPath (ctx, coordinates, style, strokeFill) {
  ctx.save()
  ctx.lineWidth = style.lineWidth
  if (ctx.lineWidth % 2) {
    ctx.translate(0.5, 0.5)
  }
  ctx.strokeStyle = style.strokeFill
  ctx.beginPath()
  let move = true
  coordinates.forEach(coordinate => {
    if (coordinate) {
      if (move) {
        ctx.moveTo(coordinate.x, coordinate.y)
        move = false
      } else {
        ctx.lineTo(coordinate.x, coordinate.y)
      }
    }
  })
  strokeFill()
  ctx.restore()
}

export function renderCloseStrokePath (ctx, coordinates) {
  renderPath(ctx, coordinates, () => {
    ctx.closePath()
    ctx.stroke()
  })
}

/**
 * 渲染填充路径
 * @param ctx
 * @param coordinates
 */
export function renderCloseFillPath (ctx, coordinates) {
  renderPath(ctx, coordinates, () => {
    ctx.closePath()
    ctx.fill()
  })
}
