// canvas-lib.js

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
import { 
  renderCheckerBoard 
} from "./checkered"
import { 
  fillStroke,
  linearGradient
} from "./fill"
import { 
  chartBar 
} from "./chart"
import Colour from "../utils/colour"



/**
 * Draw image to canvas
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
 * @param {canvas} ctx
 * @param {image} image - (CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas)
 * @param {number} sx - x or source x
 * @param {number} sy - y or source y
 * @param {number} sWidth - width or source width
 * @param {number} sHeight - height or source height
 * @param {number} [dx] - destination x
 * @param {number} [dy] - destination y
 * @param {number} [dWidth] - destination width
 * @param {number} [dHeight] - destination height
 */
export function renderImage (ctx, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}

/**
 * convert an image to HTML canvas
 * @param {image} image - valid image source
 * @param {canvas} [canvas] - HTML canvas
 * @returns {canvas}
 */
export function imageToCanvas(image, canvas) {
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

export function fillMask(colour, image) {
  const copy = imageToCanvas(image);
  const ctx = copy.ctx;
    let fill;

  if (Object.keys(channels).includes(colour))
    fill = channels[colour];
  else {
    let c = new Colour(colour)
    fill = (c.isValid) ? c.hexa : channels.alpa

  }
  ctx.fillStyle = fill
  ctx.globalCompositeOperation = "multiply";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(image, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  return copy;
}

/**
 * Spit an image into RGBA channels
 *
 * @param {*} image - image resource
 * @return {object}  
 */
export function separateRGB(image) {
  return {
    red: fillMask("red", image),
    green: fillMask("green", image),
    blue: fillMask("blue", image),
    alpha: fillMask("alpha", image)
  };
}

/**
 * Create a HTML canvas element
 *
 * @param {number} w - width in pixels
 * @param {number} h - height in pixels
 * @return {Canvas}  - HTML canvas element
 */
export function createCanvas(w, h) {
  const c = document.createElement("canvas");
  c.ctx = c.getContext("2d", {willReadFrequently: true});
  c.width = w || c.ctx.canvas.width;
  c.height = h || c.ctx.canvas.height;
  return c;
}


export default {
  Colour,
  createCanvas,
  imageToCanvas,
  separateRGB,
  fillMask,
  fillStroke,
  linearGradient,
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
  renderCheckerBoard,
  chartBar,
}