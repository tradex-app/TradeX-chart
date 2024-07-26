// path.js

import { isArray, isFunction, isString } from "../utils/typeChecks"
import { fillStroke } from "./fill";


/**
 * Draw a path
 * @param {Object} ctx - canvas reference
 * @param {Array} coords - array of x y coords [{x:x, y:y}, ...]
 * @param {Object} style - {width, stroke, fill, dash}
 * @param {function} strokeFill
 */
export function renderPath (ctx, coords, style, strokeFill=()=>{}) {
  ctx.save()
  const w = style.width || 1
  ctx.lineWidth = w
  if (w % 2) {
    ctx.translate(0.5, 0.5)
  }
  ctx.strokeStyle = style.stroke

  let dash = style?.dash
  if (isString(dash)) {
    dash = dash.split(",")
  }
  if (isArray(dash)) 
    ctx.setLineDash(dash)
  
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
  if (isFunction(strokeFill)) strokeFill()
  ctx.restore()
}

/**
 * Render an open path of multiple points
 * @param {Object} ctx - canvas reference
 * @param {Array} coords - array of x y coords [{x:x, y:y}, ...]
 * @param {Object} style - {width, stroke, dash}
 */
export function renderPathStroke (ctx, coords, style) {
  renderPath(ctx, coords, style, () => {
    ctx.stroke()
  })
}

/**
 * Render unfilled closed path of multiple points
 * @param {Object} ctx - canvas reference
 * @param {Array} coords - array of x y coords [{x:x, y:y}, ...]
 * @param {Object} style - {width, stroke, fill, dash}
 */
export function renderPathClosed (ctx, coords, style, opts) {
  renderPath(ctx, coords, style, () => {
    ctx.closePath()
  })
  fillStroke(ctx, opts?.fill, opts?.stroke, opts?.size)
}

/**
 * Draw Spline of multiple points
 * @param {canvas} ctx - HTML Canvas
 * @param {Array} points - array of points [{x, y}, {x, y}...]
 * @param {number} tension
 */
export function renderSpline(ctx, points, tension) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  var t = (tension != null) ? tension : 1;
  for (var i = 0; i < points.length - 1; i++) {
      var p0 = (i > 0) ? points[i - 1] : points[0];
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = (i != points.length - 2) ? points[i + 2] : p2;

      var cp1x = p1.x + (p2.x - p0.x) / 6 * t;
      var cp1y = p1.y + (p2.y - p0.y) / 6 * t;

      var cp2x = p2.x - (p3.x - p1.x) / 6 * t;
      var cp2y = p2.y - (p3.y - p1.y) / 6 * t;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }
  ctx.stroke();
}
