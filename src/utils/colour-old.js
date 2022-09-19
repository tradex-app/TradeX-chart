// this.js
// colour manipulation
// 

import { isArray, isBoolean, isNumber, isObject, isString } from './typeChecks'


// CSS value regexes, according to http://www.w3.org/TR/css3-values/
var css_integer = '(?:\\+|-)?\\d+';
var css_float = '(?:\\+|-)?\\d*\\.\\d+';
var css_number = '(?:' + css_integer + ')|(?:' + css_float + ')';
css_integer = '(' + css_integer + ')';
css_float = '(' + css_float + ')';
css_number = '(' + css_number + ')';
var css_percentage = css_number + '%';
var css_whitespace = '\\s*?';

// http://www.w3.org/TR/2003/CR-css3-color-20030514/
var hsl_hsla_regex = new RegExp([
    '^hsl(a?)\\(', css_number, ',', css_percentage, ',', css_percentage, '(,(', css_number, '))?\\)$'
].join(css_whitespace));
var rgb_rgba_integer_regex = new RegExp([
    '^rgb(a?)\\(', css_integer, ',', css_integer, ',', css_integer, '(,(', css_number, '))?\\)$'
].join(css_whitespace));
var rgb_rgba_percentage_regex = new RegExp([
    '^rgb(a?)\\(', css_percentage, ',', css_percentage, ',', css_percentage, '(,(', css_number, '))?\\)$'
].join(css_whitespace));


const colour = {
  value: {
    r: '0',
    g: '0',
    b: '0',
    a: '0',
    h: '0',
    s: '0',
    l: '0',
    v: '0',
    hex: '#000000',
    isValid: true
  },
  
  rgb: function (val) {
    this.RGBToHex(val)
    return {str, ...value}
  },

  /**
     * Validates RGB(a) value
     * @param  {Number} r
     * @param  {Number} g
     * @param  {Number} b
     * @param  {Number} [a=0]
     * @return {Boolean}
     */
  isValidRGBn: function (r, g, b, a) {
    a = a || 255;
    if(!isNumber(r) || !isNumber(g) || !isNumber(b) || !isNumber(a)) return false;

    var regex = /\b(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\b/;
    if(
      regex.test(r) &&
      regex.test(g) &&
      regex.test(b) &&
      regex.test(a)
    ) return true;

    return false;
  },

  RGBToHex: function (rgb) {
    let r,g,b,a;
    if (isString(rgb)) {
      // Choose correct separator
      let sep = rgb.indexOf(",") > -1 ? "," : " ";
      // Turn "rgb(r,g,b)" into [r,g,b]
      rgb = rgb.substr(4).split(")")[0].split(sep);
    }
    if (isArray(rgb)) {
      if (rgb.length < 3 || rgb.length > 4) return false
      r = (+rgb[0]).toString(16)
      g = (+rgb[1]).toString(16)
      b = (+rgb[2]).toString(16)
      a = (isString(rgb[3])) ? (+rgb[3]).toString(16) : ""
    }
    else if (isObject(rgb)) {
      r = (+rgb.r).toString(16)
      g = (+rgb.g).toString(16)
      b = (+rgb.b).toString(16)
      a = ("a" in rgb) ? (+rgb.a).toString(16) : ""
    }
    else return false
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;

    this.value.r = r
    this.value.b = b
    this.value.g = g
    this.value.a = a
    this.hex = "#" + r + g + b + a
  
    return this
  },

}

export default colour
