//import "./styles.css";
//import CEL from "./CEL";
// import Concrete from "./concrete.js";
//import { throttle } from "./throttle";




function pathStart(canvas, x0, y0, x1, y1, width) {
  canvas.mainSceneContext.beginPath();
  canvas.mainSceneContext.moveTo(x0, y0);
  canvas.mainSceneContext.lineTo(x1, y1);
  canvas.mainSceneContext.lineWidth = width;
  canvas.mainSceneContext.stroke();

  canvas.mainHitContext.beginPath();
  canvas.mainHitContext.moveTo(x0, y0);
  canvas.mainHitContext.lineTo(x1, y1);
  canvas.mainHitContext.lineWidth = width + 5;
  canvas.mainHitContext.stroke();

  canvas.hoveredSceneContext.beginPath();
  canvas.hoveredSceneContext.moveTo(x0, y0);
  canvas.hoveredSceneContext.lineTo(x1, y1);
  canvas.hoveredSceneContext.lineWidth = width + 5;
  canvas.hoveredSceneContext.stroke();
}

function drawBranch(x0, y0, width, level, canvas) {
  var x1 = (Math.random() - 0.5) * 30 + x0,
      y1 = y0 - Math.random() * y0 * 0.1;

  for (let c in canvas) {
    pathStart(canvas[c], x0, y0, x1, y1, width)
  }

  if (y1 > 30 && level < 40) {
    drawBranch(x1, y1, width * 0.9, level + 1, canvas);

    // randomly branch
    if (Math.random() < 0.1) {
      drawBranch(x1, y1, width * 0.9, level + 1, canvas);
    }
  }
}

// listen for mousemove events
function onMouseMove(canvas) {
  canvas.viewport.container.addEventListener(
    "mousemove",
    throttle(function (evt) {
      var boundingRect = canvas.viewport.container.getBoundingClientRect(),
        x = evt.clientX - boundingRect.left,
        y = evt.clientY - boundingRect.top,
        key = canvas.viewport.getIntersection(x, y);
  
      console.log(`x: ${x}, y: ${y}`);
  
      if (key >= 0) {
        canvas.hoveredLayer.visible = true;
        canvas.viewport.render();
        //mainLayer.scene.export({fileName:"image.png"})
        //mainLayer.scene.exportHit({fileName:"hit.png"})
      } else {
        canvas.hoveredLayer.visible = false;
        canvas.viewport.render();
      }
    }),
  );
}

/**
 * Limit number to a range between max and min
 * @export
 * @param {number} val - value to be bounded
 * @param {number} min - lower bound
 * @param {number} max - upper bound
 * @returns {number}
 */
function limit(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

/**
 * Move an array element from one position to another
 * @param {Array} arr
 * @param {number} fromIndex
 * @param {number} toIndex
 */
function arrayMove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

// returns true if it is a DOM element    
function isElement(o) {
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
}

const composition = [
  "source-over",
  "source-atop",
  "source-in",
  "source-out",
  "destination-over",
  "destination-atop",
  "destination-in",
  "destination-out",
  "lighter",
  "copy",
  "xor",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

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
   * @returns {Viewport}
   */
  addLayer(layer) {
    this.layers.push(layer);
    layer.setSize(layer.width || this.width, layer.height || this.height);
    layer.viewport = this;
    return this;
  }
  /**
   * return associated hit id for coordinates - utilized for pointer events.
   * @param {number} x
   * @param {number} y
   * @returns {Integer} integer - returns -1 if transparent
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
   * @returns {Integer}
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
   */
  destroy() {
    // remove layers
    for (let layer of this.layers) {
      layer.remove();
    }
  }

  /**
   * composite all layers onto canvas
   */
  render(all=false) {
    let {scene, layers} = this,
        layer;

    scene.clear();

    for (layer of layers) {

      if (all && layer.layers.length > 0) layer.render(all)

      if (composition.includes(layer?.composition))
        scene.context.globalCompositeOperation = layer.composition

      if (layer.visible && layer.width > 0 && layer.height > 0)
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

  x = 0;
  y = 0;
  width = 0;
  height = 0;
  visible = true;
  composition = null
  /**
   * Layer constructor
   * @param {Object} cfg - {x, y, width, height}
   */
  constructor(cfg={}) {

    this.id = CEL.idCnt++;
    this.hit = new CEL.Hit({
      layer: this,
      contextType: cfg.contextType,
    });
    this.scene = new CEL.Scene({
      layer: this,
      contextType: cfg.contextType,
    });

    if (cfg.x && cfg.y) {
      this.setPosition(cfg.x, cfg.y);
    }
    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
    if (cfg.composition) {
      this.setComposition(cfg.composition)
    }
  }

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
   * set layer composition / blending mode
   * @param {string} comp - composition type
   * @returns 
   */
  setComposition(comp) {
    if (composition.includes(comp)) {
      this.composition = comp
      return this
    }
  }

  /**
   * change the stacking order of the layer
   * @param {string} [pos="up"|"down"|"top"|"bottom"|number] - position in layer stack
   * @returns 
   */
  move(pos) {
    let {index, viewport} = this,
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
    this.viewport.layers.splice(this.index, 1);
  }
}

class Scene {

  width = 0;
  height = 0;
  /**
   * Scene constructor
   * @param {Object} cfg - {width, height}
   */
  constructor(cfg) {
    if (!cfg) cfg = {};

    this.id = CEL.idCnt++;
    this.layer = cfg.layer
    this.contextType = cfg.contextType || "2d";

    this.canvas = document.createElement("canvas");
    this.canvas.className = "scene-canvas";
    this.canvas.style.display = "block";
    this.context = this.canvas.getContext(this.contextType);

    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }

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

  width = 0;
  height = 0;
  /**
   * Hit constructor
   * @param {Object} cfg - {width, height}
   */
  constructor(cfg) {
    if (!cfg) cfg = {};
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

    x = Math.round(x);
    y = Math.round(y);

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
  that.canvas.style.width = `${width}px`
  that.canvas.height = height * CEL.pixelRatio;
  that.canvas.style.height = `${height}px`

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

//export default CEL

function throttle(fn, threshhold=250, scope) {
  var last, deferTimer;
  var core = function () {
    var context = scope || this;

    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
  function cancelTimer() {
    if (timeout) {
       clearTimeout(deferTimer);
       timeout = undefined;
    }
  }
  core.reset = function() {
    cancelTimer();
    last = 0;
  }
  return core
}


const content = `
<div>
  <h2>%{}</h2>
  Mouse over the tree.
</div>
<div class="container"></div>
`;

document.getElementById("CEL").innerHTML = content.replace("%{}", "CEL");
document.getElementById("Concrete").innerHTML = content.replace("%{}", "Concrete");

const container = document.querySelectorAll(".container");
const canvas = {CEL: {lib: CEL}, Concrete:{lib: Concrete}}
const width = 400, height = 400;
const def = {
  container,
  width,
  height,
}
let n = 0;

for (let c in canvas) {
  def.container = container[n++]
  canvas[c].viewport = new canvas[c].lib.Viewport(def)
  canvas[c].mainLayer = new canvas[c].lib.Layer();
  canvas[c].hoveredLayer = new canvas[c].lib.Layer();
  canvas[c].hoveredLayer.visible = false;

  if (canvas[c].lib === CEL) {
    canvas[c].viewport.addLayer(canvas[c].hoveredLayer).addLayer(canvas[c].mainLayer);
  } else {
    canvas[c].viewport.add(canvas[c].hoveredLayer).add(canvas[c].mainLayer);
  }

  canvas[c].mainSceneContext = canvas[c].mainLayer.scene.context;
  canvas[c].mainHitContext = canvas[c].mainLayer.hit.context;
  canvas[c].hoveredSceneContext = canvas[c].hoveredLayer.scene.context;

  canvas[c].mainSceneContext.strokeStyle = "red";
  canvas[c].mainSceneContext.lineCap = "round";

  if (canvas[c].lib === CEL) {
    canvas[c].mainHitContext.strokeStyle = canvas[c].mainLayer.hit.getIndexValue(0);
  } else {
    canvas[c].mainHitContext.strokeStyle = canvas[c].mainLayer.hit.getColorFromIndex(0);
  }
  canvas[c].mainHitContext.lineCap = "round";

  canvas[c].hoveredSceneContext.strokeStyle = "black";
  canvas[c].hoveredSceneContext.lineCap = "round";


  canvas[c].mainSceneContext.beginPath()
  canvas[c].mainSceneContext.rect(0,0,30,30)
  canvas[c].mainSceneContext.rect(width-60,0,width-30,30)
  canvas[c].mainSceneContext.fill()

  canvas[c].mainHitContext.beginPath();
  canvas[c].mainHitContext.rect(0,0,30,30)
  canvas[c].mainHitContext.rect(width-60,0,width-30,30)
  canvas[c].mainHitContext.fill();

  canvas[c].hoveredSceneContext.beginPath();
  canvas[c].hoveredSceneContext.rect(0,0,30,30)
  canvas[c].hoveredSceneContext.rect(width-60,0,width-30,30)
  canvas[c].hoveredSceneContext.fill();
}
// start drawing
drawBranch(width / 2, height, 30, 0, canvas);
// render it
for (let c in canvas) {
  canvas[c].viewport.render();
  onMouseMove(canvas[c])
}