// range.js
// provides primitives for drawing ranges / channels

import { renderLineHorizontal } from "../../renderer/line";
import { renderRectFill } from "../../renderer/rect";

/**
  style: {
    fill: #rrggbbaa,
    style: width, stroke, fill, dash}
  }
*/


/**
 * Render high low range markers with optional range fill
 *   style: {
        fill: #rrggbbaa,
        style: width, stroke, fill, dash}
      }
 * @param {Object} ctx - canvas reference
 * @param {number} high
 * @param {number} low
 * @param {number} w
 * @param {number} h
 * @param {object} style
 */
export function renderHighLowRange(ctx, high, low, w, h, style) {
  renderRectFill(ctx, 0, high, w, h, style.fill)
  renderLineHorizontal(ctx, high, 0, w, style.line)
}
