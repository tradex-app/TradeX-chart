// polygon.js

import { fillStroke } from "./canvas";


/**
 * Draw Regular Polygon 
 * @param {canvas} ctx - HTML Canvas
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} sides
 * @param {number} rotateAngle - 90 degrees(negative direction i.e., -Math.PI/2) 
 * @param {object} opts - {fill, size, border, rotate}
 */
export function renderPolygonRegular (ctx, x, y, radius, sides, rotateAngle, opts) {
  if (sides < 3) return;
  var a = (Math.PI * 2)/sides;
  ctx.beginPath();
  ctx.translate(x,y);
  ctx.rotate(rotateAngle * Math.PI / 180);
  ctx.moveTo(radius,0);
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();

  fillStroke(ctx, opts?.fill, opts?.stroke, opts?.size)
}

/**
 * Draw Irregular Polygon
 * @param {canvas} ctx - HTML Canvas
 * @param {array} points - array of points [{x, y}, {x, y}...]
 * @param {object} opts - {fill, size, border, rotate}
 */
export function renderPolygonIrregular (ctx, points, opts) {
  if (points.length > 0) {
    ctx.beginPath();
    var point = points[0];
    ctx.moveTo(point.x, point.y); // point 1
    for (var i = 1; i < points.length; ++i) {
      point = points[i];
      ctx.lineTo(point.x, point.y); // point from 2 up to (points.length - 1)
    }
    ctx.closePath(); // go back to point 1

    fillStroke(ctx, opts?.fill, opts?.stroke, opts?.size)
  }
};

/**
 * Render triangle
 * @param {object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} h - height pixel distance
 * @param {object} opts - {fill, size, border, rotate}
 */
export function renderTriangle (ctx, x, y, h, opts) {
  renderPolygonRegular (ctx, x, y, h, 3, opts?.rotate || 0) 

  fillStroke(ctx, opts?.fill, opts?.stroke, opts?.size)
}

/**
 * Render diamond
 * @param {object} ctx - canvas reference
 * @param {number} x - canvas pixel position
 * @param {number} y - canvas pixel position
 * @param {number} w - width pixel distance
 * @param {number} h - height pixel distance
 * @param {object} opts - {fill, size, border, rotate}
 */
export function renderDiamond (ctx, x, y, w, h, opts) {
  ctx.beginPath()
  ctx.moveTo(x - w / 2, y)
  ctx.lineTo(x, y - h / 2)
  ctx.lineTo(x + w / 2, y)
  ctx.lineTo(x, y + h / 2)
  ctx.closePath()

  fillStroke(ctx, opts?.fill, opts?.stroke, opts?.size)
}
