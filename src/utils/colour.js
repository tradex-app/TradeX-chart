// this.js
// colour manipulation
// 

import { isArray, isBoolean, isInteger, isNumber, isObject, isString } from './typeChecks'
import { isBrowser, isNode } from './browser-or-node'
import { colours2 } from '../components/views/colourPicker';
import { decimalToHex } from './number';

export const RGBAHex = `#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})`
export const isHex  = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i; 
export const isHSL  = /^hsl\(\s*(\d+),\s*([0-9.]+)%,\s*([0-9.]+)%\s*\)$/; 
export const isHSLA = /^hsla?\s*\(\s*(\d+),\s*([0-9.]+)%,\s*([0-9.]+)%,\s*(0?\.\d+|0|1)?\s*\)$/i
export const isRGB  = /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/i;
export const isRGBA = /^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|0|1(?:\.0*)?)\s*[)]$/i;

/**
 * Colour utility class
 * colour modle transformations
 * @export
 * @class Colour
 */
export default class Colour {
  #value = {
    r: null,
    g: null,
    b: null,
    a: null,
    h: null,
    s: null,
    l: null,
    v: null,
    r16: null,
    g16: null,
    b16: null,
    a16: null,
    hex: null,  //'#000000'
    hexa: null,  //'#00000000',
    hsl: null,  //'hsl(0,0%,0%)',
    hsla: null,  //'hsla(0,0%,0%,1)',
    rgb: null,  //'rgb(0,0,0)',
    rgba: null,  //'rgba(0,0,0,1)',
    isValid: false
  }

  /**
   * @param {string} colour - #rgb, #rrggbb/aa, hsla(), rgba()
   */
  constructor (colour) {

    this.#validate(colour)
    if (isHex.test(colour)) this.#valueIsHex(colour)
    if (isHSL.test(colour)) this.#valueIsHSL(colour)
    if (isHSLA.test(colour)) this.#valueIsHSLA(colour)
    if (isRGB.test(colour)) this.#valueIsRGB(colour)
    if (isRGBA.test(colour)) this.#valueIsRGBA(colour)
  }

  /** 
   * All information for colour
   * @type {string} 
   */
  get value() { return this.#value }
  /** 
   * Is the provided colour valid
   * @type {boolean} 
   */
  get isValid() { return this.#value.isValid }
  /** 
   * CSS RGB value
   * @type {string} */
  get hex() { return this.#value.hex }
  /** 
   * CSS RGBA value
   * @type {string} 
   */
  get hexa() { return this.#value.hexa }
  
  #validate(colour) {
    if (!isString(colour)) {
      this.#value.isValid = false
      return
    }

    if (isBrowser) {
      let el = document.getElementById('divValidColourTest')
      if (!el) {
        el = document.createElement('div');
        el.id = 'divValidColourTest'
      }
      el.style.backgroundColor = "";
      el.style.backgroundColor = colour;
      this.#value.isValid = (el.style.backgroundColor.length) ? true : false;
      el.remove()
    }
    else {
      // we have to use a regex, might be error prone
      this.#value.isValid = (
        isHex.test(colour) ||
        isHSL.test(colour) ||
        isHSLA.test(colour) ||
        isRGB.test(colour) ||
        isRGBA.test(colour)
      ) ? true : false
    }
  }

  /**
   * Set hex value
   * @param {Array} hex 
   */
  setHex(hex) {
    let val = this.#value;
    ([
      val.r16,
      val.g16,
      val.b16,
      val.a16
    ] = hex)
    val.hex = `#${val.r16}${val.g16}${val.b16}`
    val.hexa = `#${val.r16}${val.g16}${val.b16}${val.a16}`
  }

  /**
   * @param {Array} rgba 
   */
  setRGBA(rgba) {
    let val = this.#value;
    ([
      val.r,
      val.g,
      val.b,
      val.a
    ] = rgba)
    val.rgb = `rgb(${rgba[0]},${rgba[1]},${rgba[2]})`
    val.rgba = `rgb(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`
  }

  /**
   * @param {Array} hsla 
   */
  setHSLA(hsla) {
    let val = this.#value;
    ([
      val.h,
      val.s,
      val.l,
      val.a
    ] = hsla)
    val.hsl = `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%)`
    val.hsla = `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`
  }

  #valueIsHex(hex) {
    let l = hex.length,
        rgba, 
        hsla;
    switch (l) {
      case 4 :
        rgba = [`${hex[1]}${hex[1]}`, `${hex[2]}${hex[2]}`, `${hex[3]}${hex[3]}`, "ff"]
        break;
      case 7 :
        rgba = [hex.substr(1,2), hex.substr(3,2), hex.substr(5,2), "ff"]
        break;
      case 9 :
        rgba = [hex.substr(1,2), hex.substr(3,2), hex.substr(5,2), hex.substr(7,2)]
        break
    }
    this.setHex(rgba)
    this.#hexToRGB(rgba)
    this.#hexToHSL(rgba)
  }
  #valueIsHSL(hsl) {
    this.#value.hsl = hsl
  }
  #valueIsHSLA(hsla) {
    this.#value.hsla = hsla
  }
  #valueIsRGB(rgb) {
    this.#value.rgb = rgb
    this.#RGBAToHex(rgb)
  }
  #valueIsRGBA(rgba) {
    this.#value.rgba = rgba
    this.#RGBAToHex(rgba)
  }
/*
  #RGBToHex (rgb) {
    let {r,g,b,a} = this.#getRGB(rgb)
  
    this.value.r = r
    this.value.g = g
    this.value.b = b
    this.value.a = a

    let hex = [
      decimalToHex(r),
      decimalToHex(g),
      decimalToHex(b),
      decimalToHex(a),
    ]

    this.setHex(hex)
    return this
  }
*/
  /**
   * 
   * @param {string} rgba 
   */
  #RGBAToHex (rgba) {
    let x, isPercent,
      i = 0,
      y = [],
      z = [],
      m = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
      a = isString(m[4]) ? m[4] : `1`,
      mRGBA = [ m[1], m[2], m[3], a ];

      for (let v of mRGBA) {
        isPercent = v.indexOf("%") > -1;
        x = parseFloat(v)
        if (i < 3 && isPercent) {
          x = Math.round(255 * x / 100)
        }
        else if (i == 3) {
          if (!isPercent && x >= 0 && x <= 1) {
            x = Math.round(255 * x);
          } else if (isPercent && x >= 0 && x <= 100) {
            x = Math.round(255 * x / 100)
          } else {
            x = "";
          }
        }
        y[i] = (x | 1 << 8).toString(16).slice(1)
        z[i++] = x
      }
      this.setHex(y)
      this.setRGBA(z)
      this.#hexToHSL(this.#value.hexa)
  }

  #RGBToHSL (rgb) {
    let {r,g,b,a} = this.#getRGB(rgb)

    r = parseInt(r, 16) / 255
    g = parseInt(g, 16) / 255
    b = parseInt(b, 16) / 255
    a = parseInt(a, 16) / 255
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    let hsla = [
      (60 * h < 0 ? 60 * h + 360 : 60 * h).toString(),
      (100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)).toString(),
      ((100 * (2 * l - s)) / 2).toString(),
      (a).toString()
    ];
    this.setHSLA(hsla)
    return this
  }

  // input parameters H: [0, 360], S: [0, 100], L: [0, 100]
  // range of all output values is [0, 255]
  #HSLToRGB (h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  };

  #HSLToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  #hexToRGB(hex) {
    if (isString(hex)) hex = /([a-f\d]{2})/ig.exec(hex);

    var rgba = [
        parseInt(hex[0], 16),
        parseInt(hex[1], 16),
        parseInt(hex[2], 16),
        parseInt(hex[3], 16) / 255
    ];
    this.setRGBA(rgba)
  }

  #hexToHSL(hex) {
    if (isString(hex)) hex = /([a-f\d]{2})/ig.exec(hex);

    let r = parseInt(hex[0], 16);
    let g = parseInt(hex[1], 16);
    let b = parseInt(hex[2], 16);
    let a = parseInt(hex[3], 16);
    r /= 255, g /= 255, b /= 255, a /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
      h = s = 0; // achromatic
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    this.setHSLA([r,g,b,a])
  }

  #getRGB (rgb) {
    let r,g,b,a;
    let v = this.#value

    if (isString(rgb)) {
      // Choose correct separator
      let sep = rgb.indexOf(",") > -1 ? "," : " ";
      // Turn "rgb(r,g,b)" into [r,g,b]
      rgb = rgb.substr(4).split(")")[0].split(sep);
    }
    if (isArray(rgb)) {
      if (rgb.length < 3 || rgb.length > 4) return false
      r = rgb[0]
      g = rgb[1]
      b = rgb[2]
      a = (isString(rgb[3])) ? rgb[3] : ""
    }
    else if (isObject(rgb)) {
      r = rgb.r
      g = rgb.g
      b = rgb.b
      a = ("a" in rgb) ? rgb.a : ""
    }
    else if (v.r && v.g && v.b && v.a) return {r, g, b, a} = {...v}

    else return false

    r = `${r * 1}`
    g = `${g * 1}`
    b = `${b * 1}`
    a = `${a * 1}`
    return {r, g, b, a}
  }
  
}

export class Palette {
  
  #matrix = [10,5]
  #colours = colours2
  #entries = []

  constructor (matrix=[10,5], colours=colours2) {
    
    this.#matrix = (this.validateMatrix(matrix)) ? matrix : this.#matrix
    this.#colours = (this.validateColours(colours)) ? colours : this.#colours
  }

  get matrix() { return this.#matrix }
  get colours() { return this.#colours }
  get entries() { return this.#entries }

  validateMatrix(matrix) {
    return (
      isArray(matrix) &&
      matrix.length == 2 &&
      isInteger(matrix[0]) &&
      isInteger(matrix[1])
    )
  }

  validateColours(colours) {
    if (
        !isArray(colours) ||
        colours.length != this.#matrix[0] * this.#matrix[1]
        )
        return false

    const entries = []
    for (let c of colours) {
      let k = new Colour(c)
      if (!k.isValid) return false
      entries.push(k)
    }
    this.#entries = entries
    return true
  }
}
