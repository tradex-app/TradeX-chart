// path.js

import { isArray } from "../utils/typeChecks"

/**
 * Draw a path
 * @param {object} ctx - canvas reference
 * @param {array} coords - array of x y coords [{x:x, y:y}, ...]
 * @param {object} style - {lineWidth, strokeStyle, lineDash}
 * @param {function} strokeFill
 */
export function renderPath (ctx, coords, style, strokeFill) {
  ctx.save()
  ctx.lineWidth = style.lineWidth || 1
  if (ctx.lineWidth % 2) {
    ctx.translate(0.5, 0.5)
  }
  ctx.strokeStyle = style.strokeStyle

  if ("lineDash" in style && isArray(style.lineDash)) 
    ctx.setLineDash(style.lineDash)
  
  ctx.beginPath()
  let move = true
  coords.forEach(coord => {
    if (coord && coord.x !== null) {
      if (move) {
        ctx.moveTo(coord.x, coord.y)
        move = false
      } else {
        ctx.lineTo(coord.x, coord.y)
      }
    }
  })
  strokeFill()
  ctx.restore()
}

/**
 * Render unfilled closed path
 * @param {object} ctx - canvas reference
 * @param {array} coords - array of x y coords [{x:x, y:y}, ...]
 * @param {object} style
 */
export function renderClosedStrokePath (ctx, coords, style) {
  renderPath(ctx, coords, style, () => {
    ctx.closePath()
    ctx.stroke()
  })
}

/**
 * Render filled closed path
 * @param {object} ctx - canvas reference
 * @param {object} style
 */
export function renderClosedFillPath (ctx, coords, style) {
  renderPath(ctx, coords, style, () => {
    ctx.closePath()
    ctx.fill()
  })
}
