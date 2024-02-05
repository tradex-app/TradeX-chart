// canvas.js

import { limit } from "../../utils/number";
import { arrayMove } from "../../utils/utilities";
import { isElement } from "../../utils/DOM";
import { isBoolean, isNumber } from "../../utils/typeChecks";

const composition = ["source-over","source-atop","source-in","source-out","destination-over","destination-atop","destination-in","destination-out","lighter","copy","xor","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"]
const _OffscreenCanvas = (typeof OffscreenCanvas !== "undefined") ? true : false

class Node {

  #key = 0

  /**
   * Viewport constructor
   * @param {Object} cfg - {width, height}
   */
  constructor(cfg={}) {

    if (!isElement(cfg.container)) throw new Error("Viewport container is not a valid HTML element.")

    this.container = cfg.container;
    this.layers = [];
    this.id = CEL.idCnt++;
    this.scene = new CEL.Scene();

    this.setSize(cfg.width || 0, cfg.height || 0);
  }

  // does the browser support OffscreenCanvas ?
  get OffscreenCanvas() { return _OffscreenCanvas }

  generateKey() {
    return this.#key++
  }

  /**
   * set viewport size in pixels and all layers in the stack which are composited into the viewport.
   * @param {number} width - viewport width in pixels
   * @param {number} height - viewport height in pixels
   * @returns {Viewport}
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.scene.setSize(width, height);

    this.layers.forEach(function (layer) {
      layer.setSize(width, height);
    });

    return this;
  }

  /**
   * add layer a layer to the viewport
   * @param {CEL.Layer} layer
   * @returns {Viewport|false}
   */
  addLayer(layer) {
    if (!(layer instanceof Layer)) return false

    this.layers.push(layer);
    layer.setSize(layer.width || this.width, layer.height || this.height);
    layer.viewport = this;
    return this;
  }

  /**
   * remove a layer from the viewport
   * @param {CEL.layer} layer 
   * @returns {boolean}
   */
  removeLayer(layer) {
    if (!(layer instanceof Layer)) return false

    this.layers.splice(layer.index, 1)
    return true
  }
  /**
   * return associated hit id for coordinates - utilized for pointer events.
   * @param {number} x
   * @param {number} y
   * @returns {number} integer - returns -1 if transparent
   */
  getIntersection(x, y) {
    var layers = this.layers,
        n = layers.length - 1,
        layer,
        key;

    while (n >= 0) {
      layer = layers[n];
      key = layer.hit.getIntersection(x, y);
      if (key >= 0) {
        return key;
      }
      n--;
    }

    return -1;
  }

  /**
   * get viewport index in all CEL viewports
   * @returns {number|null}
   */
  get index() {
    let viewports = CEL.viewports,
      viewport,
      n = 0;

    for (viewport of viewports) {
      if (this.id === viewport.id) return n;
      n++;
    }

    return null;
  }

  /**
   * destroy viewport
   * free up resources
   */
  destroy() {
    // remove layers
    for (let layer of this.layers) {
      this.removeLayer(layer);
      layer.destroy()
    }
  }

  /**
   * composite layers onto canvas
   * @param {boolean} [all=false] - render all sub layers
   */
  render(all=false) {
    let {scene, layers} = this,
        layer;

    scene.clear();

    for (layer of layers) {

      if (all && layer.layers.length > 0) layer.render(all)

      if (layer.visible && layer.width > 0 && layer.height > 0) {
        const ctx = scene.context

        if (composition.includes(layer?.composition))
        scene.context.globalCompositeOperation = layer.composition

        scene.context.globalAlpha = layer.alpha

        scene.context.drawImage(
          layer.scene.canvas,
          layer.x,
          layer.y,
          layer.width,
          layer.height
        );
      }
    }
  }
}

/**
 * Create multi-layered canvas
 * @class Viewport
 */
class Viewport extends Node {
/**
 * Viewport constructor
 * @param {Object} cfg - {width, height}
 */
  constructor(cfg={}) {

    super(cfg)

    const canvas = this.scene.canvas
    const c = cfg.container
    if (c?.hasCanvasSlot)
      canvas.slot = "viewportCanvas"
    // clear container
    c.innerHTML = "";
    c.appendChild(canvas);

    CEL.viewports.push(this);
  }

  /**
   * destroy viewport
   */
  destroy() {
    // remove layers
    super.destroy()

    // clear dom
    this.container.innerHTML = "";

    // remove self from #viewports array
    CEL.viewports.splice(this.index, 1);
  }

}

class Layer {

  #x = 0;
  #y = 0;
  #width = 0;
  #height = 0;
  #alpha = 1
  #visible = true;
  #composition = null
  #offScreen = true && _OffscreenCanvas

  viewport
  
  /**
   * Layer constructor
   * @param {Object} cfg - {x, y, width, height}
   */
  constructor(cfg={}) {

    this.id = CEL.idCnt++;
    this.hit = new CEL.Hit({
      layer: this,
      contextType: cfg.contextType,
      offscreen: this.#offScreen
    });
    this.scene = new CEL.Scene({
      layer: this,
      contextType: cfg.contextType,
      offscreen: this.#offScreen
    });

    if (cfg.x && cfg.y) {
      this.setPosition(cfg.x, cfg.y);
    }
    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
    if (cfg.composition) {
      this.setComposition = cfg.composition
    }
    if (cfg.alpha) {
      this.alpha = cfg.alpha
    }
    if (cfg.visible) {
      this.visible = cfg.visible
    }
  }

  set x(x) { if (isNumber(x)) this.#x = x }
  get x() { return this.#x }
  set y(y) { if (isNumber(y)) this.#y = y}
  get y() { return this.#y }
  set width(width) { if (isNumber(width)) this.#width = width }
  get width() { return this.#width }
  set height(height) { if (isNumber(height)) this.#height = height}
  get height() { return this.#height }
  set alpha(alpha) { this.#alpha = (isNumber(alpha))? limit(alpha, 0, 1) : 1 }
  get alpha() { return this.#alpha }
  set composition(c) { if (composition.includes(c)) this.#composition = c }
  get composition() { return this.#composition }
  set visible(v) { if (isBoolean(v)) this.#visible = v }
  get visible() { return this.#visible }
  get isOffScreen() { return this.#offScreen }

  /**
   * get layer index from viewport layers
   * @returns {Number|null}
   */
  get index() {
    let layers = this.viewport.layers,
        n = 0,
        layer;

    for (layer of layers) {
      if (this.id === layer.id) return n;
      n++;
    }
    return null;
  }

  /**
   * set layer position
   * @param {number} x
   * @param {number} y
   * @returns {Layer}
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * set layer size and associated hit detection layer
   * @param {number} width
   * @param {number} height
   * @returns {Layer}
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.scene.setSize(width, height);
    this.hit.setSize(width, height);
    return this;
  }

  /**
   * change the stacking order of the layer
   * @param {string} [pos="up"|"down"|"top"|"bottom"|number] - position in layer stack
   * @returns 
   */
  move(pos) {
    let { index = 0, viewport } = this,
        layers = viewport.layers,
        order;

    if (typeof pos === "number") {
      order = limit(Math.floor(pos), (layers.length - 1) * -1, layers.length - 1)
      pos = "order"
    }

    switch (pos) {
      case "up":
        if (index < layers.length - 1) {
          // swap
          layers[index] = layers[index + 1];
          layers[index + 1] = this;
        }
        break;
      case "down":
        if (index > 0) {
          layers[index] = layers[index - 1];
          layers[index - 1] = this;
        }
        break;
      case "top":
        layers.splice(index, 1);
        layers.push(this);
        break;
      case "bottom":
        layers.splice(index, 1);
        layers.unshift(this);
        break;
      case "order":
        arrayMove(layers, this.index, order)
        break;
    }
    return this;
  }
  /**
   * move up
   * @returns {Layer}
   */
  moveUp() {
    return this.move("up")
  }
  /**
   * move down
   * @returns {Layer}
   */
  moveDown() {
    return this.move("down")
  }
  /**
   * move to top
   * @returns {Layer}
   */
  moveTop() {
    return this.move("top")
  }
  /**
   * move to bottom
   * @returns {Layer}
   */
  moveBottom() {
    return this.move("bottom")
  }
  /**
   * remove
   */
  remove() {
    // remove this layer from layers array
    return this.viewport.removeLayer(this)
  }

  destroy() {
    setSize(1,1)
    this.scene.clear()
    this.hit.clear()
  }
}

class Scene {

  #width = 0;
  #height = 0;
  /**
   * Scene constructor
   * @param {Object} cfg - {width, height}
   */
  constructor(cfg={offscreen: false}) {

    this.id = CEL.idCnt++;
    this.layer = cfg.layer
    this.contextType = cfg.contextType || "2d";

    const canvas = document.createElement("canvas");
          canvas.className = "scene-canvas";
          canvas.style.display = "block";
    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
    if (_OffscreenCanvas && cfg?.offscreen) {
      this.canvas = canvas.transferControlToOffscreen()
      this.offscreen = true
    }
    else 
      this.canvas = canvas

    this.context = this.canvas.getContext(this.contextType);
  }

  set width(width) { if (isNumber(width)) this.#width = width }
  get width() { return this.#width }
  set height(height) { if (isNumber(height)) this.#height = height}
  get height() { return this.#height }

 /**
   * set scene size
   * @param {number} width
   * @param {number} height
   * @returns {Scene}
   */
  setSize(width, height) {
    return setSize(width, height, this);
  }

  /**
   * clear scene
   * @returns {Scene}
   */
  clear() {
    return clear(this);
  }

  /**
   * convert scene into an HTML image source
   * @param {String} type - image format "img/png"|"img/jpg"|"img/webp"
   * @param {number} quality - image quality 0 - 1
   * @param {Function} cb - callback
   */
  toImage(type = "image/png", quality, cb) {
    let that = this,
      imageObj = new Image(),
      dataURL = this.canvas.toDataURL(type, quality);

    imageObj.onload = function () {
      imageObj.width = that.width;
      imageObj.height = that.height;
      cb(imageObj);
    };
    imageObj.src = dataURL;
  }

  /**
   * export scene as an image file
   * @param {Object} cfg - {filename}
   * @param {Function} cb - optional, by default opens image in new window / tab
   * @param {String} type - image format "img/png"|"img/jpg"|"img/webp"
   * @param {number} quality - image quality 0 - 1
   */
  export(cfg, cb, type = "image/png", quality) {
    if (typeof cb !== "function") cb = this.blobCallback.bind({ cfg: cfg });
    this.canvas.toBlob(cb, type, quality);
  }

  /**
   * export hit as an image file - for debugging / testing purposes
   * @param {Object} cfg - {filename}
   * @param {Function} cb - optional, by default opens image in new window / tab
   * @param {String} type - image format "img/png"|"img/jpg"|"img/webp"
   * @param {number} quality - image quality 0 - 1
   */
  exportHit(cfg, cb, type = "image/png", quality) {
    if (typeof cb !== "function") cb = this.blobCallback.bind({ cfg });
    this.layer.hit.canvas.toBlob(cb, type, quality);
  }

  blobCallback(blob) {
    let anchor = document.createElement("a"),
        dataUrl = URL.createObjectURL(blob),
        fileName = this.cfg.fileName || "canvas.png";

    // set <a></a> attributes
    anchor.setAttribute("href", dataUrl);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("download", fileName);

    // invoke click
    if (document.createEvent) {
      Object.assign(document.createElement("a"), {
        href: dataUrl,
        target: "_blank",
        download: fileName,
      }).click();
    } 
    else if (anchor.click) {
      anchor.click();
    }
  }
}

class Hit {

  #width = 0;
  #height = 0;
  /**
   * Hit constructor
   * @param {Object} cfg - {width, height}
   */
  constructor(cfg={}) {
    this.layer = cfg.layer
    this.contextType = cfg.contextType || "2d";
    this.canvas = document.createElement("canvas");
    this.canvas.className = "hit-canvas";
    this.canvas.style.display = "none";
    this.canvas.style.position = "relative";
    this.context = this.canvas.getContext(this.contextType, {
      // add preserveDrawingBuffer to pick colours with readPixels for hit detection
      preserveDrawingBuffer: true,
      // fix webgl antialiasing picking issue
      antialias: false,
    });

    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }

  set width(width) { if (isNumber(width)) this.#width = width }
  get width() { return this.#width }
  set height(height) { if (isNumber(height)) this.#height = height}
  get height() { return this.#height }

  /**
   * set hit size
   * @param {number} width
   * @param {number} height
   * @returns {Hit}
   */
  setSize(width, height) {
    return setSize(width, height, this, false);
  }

  /**
   * clear hit
   * @returns {Hit}
   */
  clear() {
    return clear(this);
  }

  /**
   * Test if a hit for coordinates. This can be used for pointer interactivity.
   * @param {number} x
   * @param {number} y
   * @returns {Integer} layer index - returns -1 if no pixel is there
   */
  getIntersection(x, y) {
    let context = this.context,
        data;

    x = Math.round(x - this.layer.x);
    y = Math.round(y - this.layer.y);

    // if x or y are out of bounds return -1
    if (x < 0 || y < 0 || x > this.width || y > this.height) {
      return -1;
    }

    // 2d
    if (this.contextType === "2d") {
      data = context.getImageData(x, y, 1, 1).data;

      if (data[3] < 255) {
        return -1;
      }
    }
    // webgl
    else {
      data = new Uint8Array(4);
      context.readPixels(
        x * CEL.pixelRatio,
        (this.height - y - 1) * CEL.pixelRatio,
        1,
        1,
        context.RGBA,
        context.UNSIGNED_BYTE,
        data
      );

      if (data[0] === 255 && data[1] === 255 && data[2] === 255) {
        return -1;
      }
    }

    return this.rgbToInt(data);
  }
  /**
   * get canvas formatted colour string from data index
   * @param {number} index
   * @returns {String}
   */
  getIndexValue(index) {
    let rgb = this.intToRGB(index);
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  }
  /**
   * converts rgb array to integer value
   * @param {Array} rgb - [r,g,b]
   * @returns {number}
   */
  rgbToInt(rgb) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    return (r << 16) + (g << 8) + b;
  }
  /**
   * converts integer value to rgb array
   * @param {number} number - positive number between 0 and 256*256*256 = 16,777,216
   * @returns {array}
   */
  intToRGB(number) {
    let r = (number & 0xff0000) >> 16;
    let g = (number & 0x00ff00) >> 8;
    let b = number & 0x0000ff;
    return [r, g, b];
  }
}

function clear(that) {
  let context = that.context;
  if (that.contextType === "2d") {
    context.clearRect(
      0,
      0,
      that.width * CEL.pixelRatio,
      that.height * CEL.pixelRatio
    );
  }
  // webgl or webgl2
  else {
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
  }
  return that;
}

function setSize(width, height, that, ratio=true) {
  that.width = width;
  that.height = height;
  that.canvas.width = width * CEL.pixelRatio;
  that.canvas.height = height * CEL.pixelRatio;

  if (!that.offscreen) {
    that.canvas.style.width = `${width}px`
    that.canvas.style.height = `${height}px`
  }

  if (ratio && that.contextType === "2d" && CEL.pixelRatio !== 1) {
    that.context.scale(CEL.pixelRatio, CEL.pixelRatio);
  }
  return that;
}

// Canvas Extension Layers
const CEL = {
  idCnt: 0,
  viewports: [],
  pixelRatio: (window && window.devicePixelRatio) || 1,

  Node,
  Viewport,
  Layer,
  Scene,
  Hit,
};

export default CEL
