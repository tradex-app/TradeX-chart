// canvas.js

import {
  calcTextWidth,
  createFont,
  getTextRectHeight,
  getTextRectWidth,
  renderText,
  renderTextBG
} from "./text"
import {
  renderRect,
  renderRectFill,
  renderRectStroke,
  renderRectRound,
  renderRectRoundFill,
  renderRectRoundStroke,
} from "./rect"
import {
  renderPolygonRegular,
  renderPolygonIrregular,
  renderDiamond,
  renderTriangle
} from "./polygon"
import {
  renderPath,
  renderPathStroke,
  renderPathClosed,
  renderSpline
} from "./path"
import { 
  renderLine,
  renderLineHorizontal,
  renderLineVertical,
} from "./line"
import { 
  renderCircle,
} from "./circle"
import { isNumber, isString } from "../utils/typeChecks"
import { CanvasStyle } from "../definitions/style"

/**
 * Get screen ratio
 * @param canvas
 * @returns {number}
 */
export function getPixelRatio (canvas) {
  return (canvas.ownerDocument && canvas.ownerDocument.defaultView && canvas.ownerDocument.defaultView.devicePixelRatio) || 2
}

/**
 * Fill and Stroke a Path
 * @param {canvas} ctx - HTML Canvas
 * @param {string} fill - colour #rrggbb(aa)
 * @param {string} stroke - colour #rrggbb(aa)
 * @param {number} with - pixel stroke width
 */
export function fillStroke(ctx, fill, stroke, width) {
  if (isString(fill)) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (isNumber(width) && width > 0) {
    ctx.lineWidth = width
    ctx.strokeStyle = stroke || CanvasStyle.stroke
    ctx.stroke()
  }
}

/**
 * Draw image to canvas
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
 * @param {canvas} cxt
 * @param {image} image - (CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas)
 * @param {number} sx - x or source x
 * @param {number} sy - y or source y
 * @param {number} sWidth - width or source width
 * @param {number} sHeight - height or source height
 * @param {number} dx - destination x
 * @param {number} dy - destination y
 * @param {number} dWidth - destination width
 * @param {number} dHeight - destination height
 */
export function renderImage (ctx, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}

/**
 * convert an image to HTML canvas
 * @param {image} image - valid image source
 * @param {canvas} canvas - HTML canvas
 * @returns {canvas}
 */
export function imageToCanvs(image, canvas) {
  let w = image.naturalWidth || image.width;
  let h = image.naturalHeight || image.height;

  if (canvas === undefined) canvas = createCanvas(w, h)

  canvas.ctx.drawImage(image, 0, 0);
  return canvas;
}

const channels = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};

export function getChannel(channelName, image) {
  const copy = imageToCanvs(image);
  const ctx = copy.ctx;
  ctx.fillStyle = channels[channelName];
  ctx.globalCompositeOperation = "multiply";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(image, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  return copy;
}

export function seperateRGB(image) {
  return {
    red: getChannel("red", image),
    green: getChannel("green", image),
    blue: getChannel("blue", image),
    alpha: getChannel("alpha", image)
  };
}

export function createCanvas(w, h) {
  const can = document.createElement("canvas");
  can.ctx = can.getContext("2d", {willReadFrequently: true});
  can.width = w || can.ctx.canvas.width;
  can.height = h || can.ctx.canvas.height;
  return can;
}


export default {
  createCanvas,
  imageToCanvs,
  seperateRGB,
  getChannel,
  getPixelRatio,
  fillStroke,
  calcTextWidth,
  createFont,
  getTextRectHeight,
  getTextRectWidth,
  renderImage,
  renderText,
  renderTextBG,
  renderPath,
  renderPathStroke,
  renderPathClosed,
  renderSpline,
  renderLine,
  renderLineHorizontal,
  renderLineVertical,
  renderCircle,
  renderRect,
  renderRectFill,
  renderRectStroke,
  renderRectRound,
  renderRectRoundFill,
  renderRectRoundStroke,
  renderPolygonRegular,
  renderPolygonIrregular,
  renderDiamond,
  renderTriangle,
}