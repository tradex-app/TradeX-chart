// canvas.js

/**
 * Viewport constructor
 * @param {Object} cfg - {width, height}
 */
class Viewport {
  constructor(cfg) {
    if (!cfg) cfg = {};

    this.container = cfg.container;
    this.layers = [];
    this.id = CEL.idCnt++;
    this.scene = new CEL.Scene();

    this.setSize(cfg.width || 0, cfg.height || 0);

    // clear container
    cfg.container.innerHTML = "";
    cfg.container.appendChild(this.scene.canvas);

    CEL.viewports.push(this);
  }

  /**
   * set viewport size
   * @param {Integer} width - viewport width in pixels
   * @param {Integer} height - viewport height in pixels
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
   * add layer
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
   * get key's associated coordinate - applied to mouse events.
   * @param {Number} x
   * @param {Number} y
   * @returns {Integer} integer - returns -1 if no pixel is there
   */
  getIntersection(x, y) {
    var layers = this.layers,
      len = layers.length,
      n = len - 1,
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
   * get viewport index from all CEL viewports
   * @returns {Integer}
   */
  getIndex() {
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
    for (let layer of layers) {
      layer.remove();
    }

    // clear dom
    this.container.innerHTML = "";

    // remove self from #viewports array
    CEL.viewports.splice(this.getIndex(), 1);
  }
  /**
   * composite all layers onto canvas
   */
  render() {
    let scene = this.scene,
      layers = this.layers,
      layer;

    scene.clear();

    for (layer of layers) {
      if (layer.visible)
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

class Layer {
  /**
   * Layer constructor
   * @param {Object} cfg - {x, y, width, height}
   */
  constructor(cfg) {
    if (!cfg) cfg = {};

    this.id = CEL.idCnt++;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.visible = true;
    this.hit = new CEL.Hit({
      contextType: cfg.contextType,
    });
    this.scene = new CEL.Scene({
      contextType: cfg.contextType,
    });

    if (cfg.x && cfg.y) {
      this.setPosition(cfg.x, cfg.y);
    }
    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }

  /**
   * set layer position
   * @param {Number} x
   * @param {Number} y
   * @returns {Layer}
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  /**
   * set layer size
   * @param {Number} width
   * @param {Number} height
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
   * move up
   * @returns {Layer}
   */
  moveUp() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;

    if (index < layers.length - 1) {
      // swap
      layers[index] = layers[index + 1];
      layers[index + 1] = this;
    }

    return this;
  }
  /**
   * move down
   * @returns {Layer}
   */
  moveDown() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;

    if (index > 0) {
      // swap
      layers[index] = layers[index - 1];
      layers[index - 1] = this;
    }

    return this;
  }
  /**
   * move to top
   * @returns {Layer}
   */
  moveTop() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;

    layers.splice(index, 1);
    layers.push(this);
  }
  /**
   * move to bottom
   * @returns {Layer}
   */
  moveBottom() {
    let index = this.getIndex(),
      viewport = this.viewport,
      layers = viewport.layers;

    layers.splice(index, 1);
    layers.unshift(this);

    return this;
  }
  /**
   * get layer index from viewport layers
   * @returns {Number|null}
   */
  getIndex() {
    let layers = this.viewport.layers,
      len = layers.length,
      n = 0,
      layer;

    for (layer of layers) {
      if (this.id === layer.id) return n;
      n++;
    }

    return null;
  }
  /**
   * remove
   */
  remove() {
    // remove this layer from layers array
    this.viewport.layers.splice(this.getIndex(), 1);
  }
}

class Scene {
  /**
   * Scene constructor
   * @param {Object} cfg - {width, height}
   */
  constructor(cfg) {
    if (!cfg) cfg = {};

    this.id = CEL.idCnt++;

    this.width = 0;
    this.height = 0;
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
   * @param {Number} width
   * @param {Number} height
   * @returns {Scene}
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width * CEL.pixelRatio;
    this.canvas.style.width = `${width}px`
    this.canvas.height = height * CEL.pixelRatio;
    this.canvas.style.height = `${height}px`

    if (this.contextType === "2d" && CEL.pixelRatio !== 1) {
      this.context.scale(CEL.pixelRatio, CEL.pixelRatio);
    }

    return this;
  }
  /**
   * clear scene
   * @returns {Scene}
   */
  clear() {
    let context = this.context;
    if (this.contextType === "2d") {
      context.clearRect(
        0,
        0,
        this.width * CEL.pixelRatio,
        this.height * CEL.pixelRatio
      );
    }
    // webgl or webgl2
    else {
      context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    }
    return this;
  }
  /**
   * convert scene into an image
   * @param {String} type - type of image format
   * @param {Number} quality - image quality 0 - 1
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
   * export scene as an image
   * @param {Object} cfg - {filename}
   * @param {Function} cb - optional, by default opens image in new window / tab
   * @param {String} type - type of image format
   * @param {Number} quality - image quality 0 - 1
   */
  export(cfg, cb, type = "image/png", quality) {
    if (typeof cb !== "function") cb = this.blobCallback.bind({ cfg: cfg });
    this.canvas.toBlob(cb, type, quality);
  }

  blobCallback(blob) {
    let anchor = document.createElement("a"),
      dataUrl = URL.createObjectURL(blob),
      fileName = this.cfg.fileName || "canvas.png",
      event;

    // set <a></a> attributes
    anchor.setAttribute("href", dataUrl);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("export", fileName);

    // invoke click
    if (document.createEvent) {
      Object.assign(document.createElement("a"), {
        href: dataUrl,
        target: "_blank",
        export: fileName,
      }).click();
    } else if (anchor.click) {
      anchor.click();
    }
  }
}

class Hit {
  /**
   * Hit constructor
   * @param {Object} cfg - {width, height}
   */
  constructor(cfg) {
    if (!cfg) cfg = {};

    this.width = 0;
    this.height = 0;
    this.contextType = cfg.contextType || "2d";
    this.canvas = document.createElement("canvas");
    this.canvas.className = "hit-canvas";
    this.canvas.style.display = "none";
    this.canvas.style.position = "relative";
    this.context = this.canvas.getContext(this.contextType, {
      // add preserveDrawingBuffer to pick colors with readPixels for hit detection
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
   * @param {Number} width
   * @param {Number} height
   * @returns {Hit}
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width * CEL.pixelRatio;
    this.canvas.style.width = `${width}px`
    this.canvas.height = height * CEL.pixelRatio;
    this.canvas.style.height = `${height}px`
    return this;
  }
  /**
   * clear hit
   * @returns {Hit}
   */
  clear() {
    let context = this.context;
    if (this.contextType === "2d") {
      context.clearRect(
        0,
        0,
        this.width * CEL.pixelRatio,
        this.height * CEL.pixelRatio
      );
    }
    // webgl or webgl2
    else {
      context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    }
    return this;
  }
  /**
   * get key associated with coordinate. This can be used for mouse interactivity.
   * @param {Number} x
   * @param {Number} y
   * @returns {Integer} integer - returns -1 if no pixel is there
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
   * get canvas formatted color string from data index
   * @param {Number} index
   * @returns {String}
   */
  getColorFromIndex(index) {
    let rgb = this.intToRGB(index);
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  }
  /**
   * converts rgb array to integer value
   * @param {Array.<Number} rgb - [r,g,b]
   * @returns {Integer}
   */
  rgbToInt(rgb) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    return (r << 16) + (g << 8) + b;
  }
  /**
   * converts integer value to rgb array
   * @param {Number} number - positive number between 0 and 256*256*256 = 16,777,216
   * @returns {Array.<Integer>}
   */
  intToRGB(number) {
    let r = (number & 0xff0000) >> 16;
    let g = (number & 0x00ff00) >> 8;
    let b = number & 0x0000ff;
    return [r, g, b];
  }
}

// Canvas Extension Layers
const CEL = {
  idCnt: 0,
  viewports: [],
  pixelRatio: (window && window.devicePixelRatio) || 1,

  Viewport: Viewport,
  Layer: Layer,
  Scene: Scene,
  Hit: Hit,
};

export default CEL
