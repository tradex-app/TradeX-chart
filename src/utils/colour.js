// this.js
// colour manipulation
// 

import { isArray, isBoolean, isNumber, isObject, isString } from './typeChecks'
import { isBrowser, isNode } from './browser-or-node'
import { timestampDiff } from './time';

const isHex  = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i; 
const isHSL  = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/; 
const isHSLA = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/
const isRGB  = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/;
const isRGBA = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/

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
    hex: null,  //'#00000000',
    hsl: null,  //'hsl(0,0%,0%)',
    hsla: null,  //'hsla(0,0%,0%,1)',
    rgb: null,  //'rgb(0,0,0)',
    rgba: null,  //'rgba(0,0,0,1)',
    isValid: false
  }

  /**
   * 
   * @param {string} colour 
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
  get hex() { return this.#value.hex.slice(0, -2) }
  /** 
   * CSS RGBA value
   * @type {string} 
   */
  get hexa() { return this.#value.hex }
  
  #validate(colour) {
    if (isBrowser) {
      let el = document.getElementById('divValidColourTest')
      if (!el) {
        el = document.createElement('div');
        el.id = 'divValidColourTest'
      }
      el.style.backgroundColor = "";
      el.style.backgroundColor = colour;
      this.#value.isValid = (el.style.backgroundColor.length) ? true : false;
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

  setHex(hex) {
    let val = this.#value;
    ([
      val.r16,
      val.g16,
      val.b16,
      val.a16
    ] = hex)
    val.hex = "#" + val.r16 +val.g16 + val.b16 + val.a16
  }

  setRGBA(rgba) {
    let val = this.#value;
    [
      val.r,
      val.g,
      val.b,
      val.a
    ] = rgba
    val.rgb = `rgb(${rgba[0]},${rgba[1]},${rgba[2]})`
    val.rgba = `rgb(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`
  }

  setHSLA(hsla) {
    let val = this.#value;
    [
      val.h,
      val.s,
      val.l,
      val.a
    ] = hsla
    val.hsl = `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%)`
    val.hsla = `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`
  }

  #valueIsHex(hex) {
    this.#value.hex = hex
    let l = hex.length,
        rgba, 
        hsla;
    switch (l) {
      case 4 :
        rgba = [hex[1], hex[2], hex[3], "ff"]
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
  }
  #valueIsRGBA(rgba) {
    this.#value.rgba = rgba
  }

  #RGBToHex (rgb) {
    let {r,g,b,a} = this.#getRGB(rgb)
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;

    this.value.r = r
    this.value.g = g
    this.value.b = b
    this.value.a = a

    this.setHex([r,g,b,a])
    return this
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

  #hslToHex(h, s, l) {
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
    if (v.r && v.g && v.b && v.a) return {r, g, b, a} = {...v}

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
    else return false
    return {r, g, b, a}
  }
  
}