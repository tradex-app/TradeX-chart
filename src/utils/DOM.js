// DOM.js
// DOM utilities

import { isFunction, isNumber, isObject, isString } from "./typeChecks"


const DOM = {
  findByID(id, base = document) {
    return base.getElementById(id);
  },

  findByClass(cl, base = document) {
    return base.getElementsByClassName(cl);
  },

  findByName(name, base = document) {
    return base.getElementsByName(name);
  },

  fndByTag(tag, base = document) {
    return base.getElementsByTagName(tag);
  },

  findBySelector(sel, base = document) {
    return base.querySelector(sel);
  },

  findBySelectorAll(sel, base = document) {
    return base.querySelectorAll(sel);
  },

  // returns true if it is a DOM node
  isNode(o) {
    return typeof Node === "object"
      ? o instanceof Node
      : o &&
          typeof o === "object" &&
          typeof o.nodeType === "number" &&
          typeof o.nodeName === "string";
  },

  // returns true if it is a DOM element
  isElement(o) {
    return typeof HTMLElement === "object"
      ? o instanceof HTMLElement //DOM2
      : o &&
          typeof o === "object" &&
          o !== null &&
          o.nodeType === 1 &&
          typeof o.nodeName === "string";
  },

  // returns true if DOM element is visible
  // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
  isVisible(o) {
    if (!this.isElement(o)) return false;

    return (
      !!o && !!(o.offsetWidth || o.offsetHeight || o.getClientRects().length)
    );
  },

  // https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
  isInViewport(el) {
    if (!this.isElement(el)) return false;

    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // https://stackoverflow.com/a/41698614/15109215
  isVisibleToUser(el) {
    if (!this.isElement(el)) return false;

    const style = getComputedStyle(elem);
    if (style.display === "none") return false;
    if (style.visibility !== "visible") return false;
    if (style.opacity < 0.1) return false;
    if (
      el.offsetWidth +
        el.offsetHeight +
        el.getBoundingClientRect().height +
        el.getBoundingClientRect().width ===
      0
    ) {
      return false;
    }
    const elCenter = {
      x: el.getBoundingClientRect().left + el.offsetWidth / 2,
      y: el.getBoundingClientRect().top + el.offsetHeight / 2,
    };
    if (elCenter.x < 0) return false;
    if (
      elCenter.x > (document.documentElement.clientWidth || window.innerWidth)
    )
      return false;
    if (elCenter.y < 0) return false;
    if (
      elCenter.y > (document.documentElement.clientHeight || window.innerHeight)
    )
      return false;
    let pointContainer = document.elementFromPoint(elCenter.x, elCenter.y);
    do {
      if (pointContainer === elem) return true;
    } while ((pointContainer = pointContainer.parentNode));
    return false;
  },

  /**
   * test if image, return image object or false
   * @param {*} img - image resource, URL, data:URL, svg
   * @param {function} cb - callback to return image or false
   * @returns {Promise} - if no callback function is provided, a Promise will be returned
   */
  isImage(img, cb) {
    if (this.isSVG(img)) {
      // img = this.htmlToElement(img)
      // const xml = new XMLSerializer().serializeToString(img);
      // img = `data:image/svg+xml;base64,${btoa(xml)}`

      var DOMURL = window.URL || window.webkitURL || window;
      var img = new Blob([img], { type: "image/svg+xml" });
      var img = DOMURL.createObjectURL(img);
    }
    const i = new Image();
    i.src = img;

    // valid callback function?
    if (isFunction(cb)) {
      if (i.complete) cb(i);
      else {
        i.onload = () => cb(i);
        i.onerror = () => cb(false);
      }
    }
    // return a Promise instead
    else {
      return new Promise(function (resolve, reject) {
        if (i.complete) resolve(i);
        else {
          i.onload = () => resolve(i);
          i.onerror = () => reject(false);
        }
      });
    }
  },

  /**
   * test if input is a valud SVG string
   * @param {string} html - valid svg
   * @returns
   */
  isSVG(html) {
    if (!isString(html)) return false;
    const svg = /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/;
    return svg.test(html);
  },

  /**
   * wait for element to appear in DOM
   * @param {string} selector
   * @return {Promise}  
   */
  waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  },

  elementDimPos(el) {
    if (!this.isElement(el)) return false;

    let _x = 0;
    let _y = 0;
    let El = el;
    while (
      El &&
      El.tagName.toLowerCase() != "body" &&
      !isNaN(El.offsetLeft) &&
      !isNaN(El.offsetTop)
    ) {
      _x += El.offsetLeft - El.scrollLeft;
      _y += El.offsetTop - El.scrollTop;
      El = El.offsetParent;
    }
    const dim = el.getBoundingClientRect();
    let _w = dim.right - dim.left;
    let _h = dim.bottom - dim.top;
    let _v = this.isVisible(el);
    let _vp = this.isInViewport(el);
    return {
      top: _y,
      bottom: _y + _h,
      left: _x,
      right: _x + _w,
      width: _w,
      height: _h,
      visible: _v,
      viewport: _vp,
    };
  },

  elementsDistance(el1, el2) {
    // fail if either are not elements
    if (!this.isElement(el1) || !this.isElement(el1)) return false;

    const el1Location = this.elementDimPos(el1);
    const el2Location = this.elementDimPos(el2);

    return {
      x: el1Location.top - el2Location.top,
      y: el1Location.left - el2Location.left,
      el1Location: el1Location,
      el2Location: el2Location,
    };
  },

  /**
   * Convert string into HTML element
   * @param {String} HTML representing a single element
   * @returns {Element}
   */
  htmlToElement(html) {
    if (!isString(html)) return false;
    const template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  },

  /**
   * convert string into HTML element/s
   * @param {String} HTML representing any number of sibling elements
   * @returns {NodeList}
   */
  htmlToElements(html) {
    if (!isString(html)) return false;
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.childNodes;
  },

  svgToImage(html, fill, dims) {
    if (!this.isSVG(html) || !isNumber(dims?.w) || !isNumber(dims?.h))
      return false;

    let w = dims.w;
    let h = dims.h;
    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    let svg = this.htmlToElement(html);
    svg.style.fill = fill;
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
    svg.xmlns = "http://www.w3.org/2000/svg";

    // get svg data
    let xml = new XMLSerializer().serializeToString(svg);

    // make it base64
    let svg64 = btoa(xml);
    let b64Start = "data:image/svg+xml;base64,";

    // prepend a "header"
    let image64 = b64Start + svg64;
    let img = new Image(); //document.createElement("img")
    img.setAttribute("width", w);
    img.setAttribute("height", h);
    img.onload = () => {
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
    };
    img.src = image64;
    return img;
  },

  //  https://stackoverflow.com/a/3028037/15109215
  hideOnClickOutside(el) {
    if (!this.isElement(el)) return false;

    const outsideClickListener = (event) => {
      if (!el.contains(event.target) && this.isVisible(el)) {
        // or use: event.target.closest(selector) === null
        // if (event.target.closest(selector) === null) {
        el.style.display = "none";
        removeClickListener();
      }
    };

    const removeClickListener = () => {
      document.removeEventListener("click", outsideClickListener);
    };

    document.addEventListener("click", outsideClickListener);
  },

  onClickOutside(el, cb) {
    if (!this.isElement(el)) return false;

    const outsideClickListener = (event) => {
      if (!el.contains(event.target) && DOM.isVisible(el)) {
        // or use: event.target.closest(selector) === null
        // if (event.target.closest(selector) === null) {
        cb();
        removeClickListener();
      }
    };

    const removeClickListener = () => {
      document.removeEventListener("click", outsideClickListener);
    };

    document.addEventListener("click", outsideClickListener);
  },

  /**
   * Get style property of element
   * @param {string|HTMLElement} el
   * @param {string} styleProp
   * @returns {string}
   */
  getStyle(el, styleProp) {
    let x, y;
    if (isString(el)) x = document.getElementById(el);
    else if (this.isElement(el)) x = el;
    else return false;
    if (!isString(styleProp)) return false;
    if (window.getComputedStyle)
      y = document.defaultView
        .getComputedStyle(x, null)
        .getPropertyValue(styleProp);
    else if (x.currentStyle) y = x.currentStyle[styleProp];
    return y;
  },

  addStyleRule(styleSheet, selector, property, value) {
    let r = this.findStyleRule(styleSheet, selector, property, value);
    if (!r) return;
    // Change rule if it exists
    else if (r.i >= 0) {
      r.rules[r.i].style[r.property] = r.value;
    } else {
      // Add rule if it does not
      // r.styleSheet.insertRule(r.selector + " { " + r.property + ": " + r.value + "; }", 0);
      this.addCSSRule(r.styleSheet, r.selector, r.rules, r.index);
    }
  },

  deleteStyleRule(styleSheet, selector, property) {
    let r = this.findStyleRule(styleSheet, selector, property, "");
    let deleteRule = r.styleSheet.deleteRule || r.styleSheet.removeRule;
    deleteRule(r.i);
  },

  findStyleRule(styleSheet, selector, property, value) {
    if (!styleSheet || !isObject(styleSheet)) return null;
    else if (styleSheet.constructor.name == "HTMLStyleElement")
      styleSheet = styleSheet.sheet;
    else if (styleSheet.constructor.name != "CSSStyleSheet") return null;

    let r = this.styleRuleSanitize(selector, property, value);
    selector = r[0];
    property = r[1];
    value = r[2];

    // Change rule if it exists
    const rules = styleSheet.cssRules || styleSheet.rules;
    for (var i = rules.length - 1; i > 0; --i) {
      let rule = rules[i];
      if (rule.selectorText === selector) {
        break;
      }
    }

    return { styleSheet, rules, selector, property, value, i };
  },

  styleRuleSanitize(selector, property, value) {
    return [
      // CSS (& HTML) reduce spaces in selector to one
      (selector = selector.toLowerCase().replace(/\s+/g, " ")),
      (property = property.toLowerCase()),
      (value = value.toLowerCase()),
    ];
  },

  addCSSRule(sheet, selector, rules, index) {
    if (sheet.insertRule) {
      sheet.insertRule(selector + "{" + rules + "}", index);
    } else {
      sheet.addRule(selector, rules, index);
    }
  },

  /**
   * recursively search back through DOM for element with matching class
   * @param {HTMLElement} el
   * @param {string} selector
   * @returns {HTMLElement|null}
   */
  findTargetParentWithClass(el, selector) {
    if (!this.isElement(el) || !isString(selector)) return null;

    if (el.classList.contains(selector)) return el;
    else return this.findTargetParentWithClass(el.parentElement, selector);
  },
};

export default DOM
