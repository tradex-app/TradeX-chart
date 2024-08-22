// DOM.js
// DOM utilities

import { isFunction, isNumber, isObject, isString } from "./typeChecks"

export const htmlAttr = [ "id", "class", "style", "alt", "width", "height", "title"  ]
export const inputAttr = [...htmlAttr, "name", "type", "value", "default", "placeholder", "max", "min", "maxlenght", "src", "checked", "disabled", "pattern", "readonly", "required", "size", "step", "multiple", "autofocus", "list", "autocomplete"]
// inputTypes - excluding: "checkbox"
export const inputTypes = ["button","color","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week",]
 

export function findByID(id, base = document) {
  return base.getElementById(id);
}

export function findByClass(cl, base = document) {
  return base.getElementsByClassName(cl);
}

export function findByName(name, base = document) {
  return base.getElementsByName(name);
}

export function fndByTag(tag, base = document) {
  return base.getElementsByTagName(tag);
}

export function findBySelector(sel, base = document) {
  return base.querySelector(sel);
}

export function findBySelectorAll(sel, base = document) {
  return base.querySelectorAll(sel);
}

// returns true if it is a DOM node
export function isNode(o) {
  return typeof Node === "object"
    ? o instanceof Node
    : o &&
        typeof o === "object" &&
        typeof o.nodeType === "number" &&
        typeof o.nodeName === "string";
}

// returns true if it is a DOM element
export function isHTMLElement(o) {
  return typeof HTMLElement === "object"
    ? o instanceof HTMLElement //DOM2
    : o &&
        typeof o === "object" &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === "string";
}

// returns true if DOM element is visible
// source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
export function isVisible(o) {
  if (!isHTMLElement(o)) return false;

  return (
    !!o && !!(o.offsetWidth || o.offsetHeight || o.getClientRects().length)
  );
}

// https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
export function isInViewport(el) {
  if (!isHTMLElement(el)) return false;

  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// https://stackoverflow.com/a/41698614/15109215
export function isVisibleToUser(el) {
  if (!isHTMLElement(el)) return false;

  const style = getComputedStyle(el);
  if (style.display === "none") return false;
  if (style.visibility !== "visible") return false;
  if (parseFloat(style.opacity) < 0.1) return false;
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
}

/**
 * test if image, return image object or false
 * @param {*} img - image resource, URL, data:URL, svg
 * @param {function} [cb] - callback to return image or false
 * @returns {Promise} - if no callback function is provided, a Promise will be returned
 */
export function isImage(img, cb) {
  if (isSVG(img)) {
    // img = htmlToElement(img)
    // const xml = new XMLSerializer().serializeToString(img);
    // img = `data:image/svg+xml;base64,${btoa(xml)}`

    var DOMURL = window.URL || window.webkitURL || window;
    img = new Blob([img], { type: "image/svg+xml" });
    img = DOMURL.createObjectURL(img);
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
}

/**
 * test if input is a valud SVG string
 * @param {string} html - valid svg
 * @returns
 */
export function isSVG(html) {
  if (!isString(html)) return false;
  const svg = /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/;
  return svg.test(html);
}

/**
 * wait for element to appear in DOM
 * @param {string} selector
 * @return {Promise}  
 */
export function waitForElm(selector) {
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
}

export function elementDimPos(el) {
  if (!isHTMLElement(el)) return false;

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
  let _v = isVisible(el);
  let _vp = isInViewport(el);
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
}

export function elementsDistance(el1, el2) {
  // fail if either are not elements
  if (!isHTMLElement(el1) || !isHTMLElement(el1)) return false;

  const el1Location = elementDimPos(el1);
  const el2Location = elementDimPos(el2);

  return {
    x: el1Location.top - el2Location.top,
    y: el1Location.left - el2Location.left,
    el1Location: el1Location,
    el2Location: el2Location,
  };
}

/**
 * Convert string into HTML element
 * @param {String} html representing a single element
 * @returns {Element}
 */
export function htmlToElement(html) {
  if (!isString(html)) return false;
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * convert string into HTML element/s
 * @param {String} html representing any number of sibling elements
 * @returns {NodeList}
 */
export function htmlToElements(html) {
  if (!isString(html)) return false;
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
}

export function svgToImage(html, fill, dims) {
  if (!isSVG(html) || !isNumber(dims?.w) || !isNumber(dims?.h))
    return false;

  let w = dims.w;
  let h = dims.h;
  let canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  let svg = htmlToElement(html);
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
}

//  https://stackoverflow.com/a/3028037/15109215
export function hideOnClickOutside(el) {
  if (!isHTMLElement(el)) return false;

  const outsideClickListener = (event) => {
    if (!el.contains(event.target) && isVisible(el)) {
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
}

export function onClickOutside(el, cb) {
  if (!isHTMLElement(el)) return false;

  const outsideClickListener = (event) => {
    if (!el.contains(event.target) && isVisible(el)) {
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
}

/**
 * Get style property of element
 * @param {string|HTMLElement} el
 * @param {string} styleProp
 * @returns {string}
 */
export function getStyle(el, styleProp) {
  let x, y;
  if (isString(el)) x = document.getElementById(el);
  else if (isHTMLElement(el)) x = el;
  else return false;
  const defaultView = (x.ownerDocument || document).defaultView;
  if (!isString(styleProp)) return false;
  if (defaultView && defaultView.getComputedStyle) {
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase(); 
    y = document.defaultView
      .getComputedStyle(x, null)
      .getPropertyValue(styleProp);
  }
  else if (x.currentStyle) y = x.currentStyle[styleProp];
  return y;
}

export function addStyleRule(styleSheet, selector, property, value) {
  let r = findStyleRule(styleSheet, selector, property, value);
  if (!r) return;
  // Change rule if it exists
  else if (r.i >= 0) {
    r.rules[r.i].style[r.property] = r.value;
  } else {
    // Add rule if it does not
    // r.styleSheet.insertRule(r.selector + " { " + r.property + ": " + r.value + "; }", 0);
    addCSSRule(r.styleSheet, r.selector, r.rules, r.index);
  }
}

export function deleteStyleRule(styleSheet, selector, property) {
  let r = findStyleRule(styleSheet, selector, property, "");
  let deleteRule = r.styleSheet.deleteRule || r.styleSheet.removeRule;
  deleteRule(r.i);
}

export function findStyleRule(styleSheet, selector, property, value) {
  if (!styleSheet || !isObject(styleSheet)) return null;
  else if (styleSheet.constructor.name == "HTMLStyleElement")
    styleSheet = styleSheet.sheet;
  else if (styleSheet.constructor.name != "CSSStyleSheet") return null;

  let r = styleRuleSanitize(selector, property, value);
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
}

export function styleRuleSanitize(selector, property, value) {
  return [
    // CSS (& HTML) reduce spaces in selector to one
    (selector = selector.toLowerCase().replace(/\s+/g, " ")),
    (property = property.toLowerCase()),
    (value = value.toLowerCase()),
  ];
}

export function addCSSRule(sheet, selector, rules, index) {
  if (sheet.insertRule) {
    sheet.insertRule(selector + "{" + rules + "}", index);
  } else {
    sheet.addRule(selector, rules, index);
  }
}

/**
 * recursively search back through DOM for element with matching class
 * @param {HTMLElement} el
 * @param {string} selector
 * @returns {HTMLElement|null}
 */
export function findTargetParentWithClass(el, selector) {
  if (!isHTMLElement(el) || !isString(selector)) return null;

  if (el.classList.contains(selector)) return el;
  else return findTargetParentWithClass(el.parentElement, selector);
}

export function htmlInput(i, o) {
  let id = (isString(o?.entry)) ? o?.entry : ""
  let label = (isString(i)) ? `<label for="${id}">${i}</label>` : ``
  let input = `${label}<input id="${id}" class="subject" `

  for (let p in o) {
    // add valid HTML element attributes
    // valid HTML attribute characters https://stackoverflow.com/a/926136/15109215
    if (inputAttr.includes(p) ||
        /^(data-[^\t\n\f \/>"'=]+)/g.test(p)) 
    {
      input += `${p}="${o[p]}" `
    }
    // process non-attributes
    else {

    }
  }
  return input += `>\n`
}

export function htmlSelect(i, o) {
  let id = (isString(o?.entry)) ? o?.entry : ""
  let label = (isString(i)) ? `<label for="${id}">${i}</label>` : ``
  let options = ""

  for (let opt in o?.options) {
    options += `<option value="${o.options[opt]}">${opt}</option>`
  }
  let input = `${label}<select id="${id}" class="subject">${options}</select>\n`
  return input
}

export default {
    addCSSRule,
    addStyleRule,
    deleteStyleRule,
    elementDimPos,
    elementsDistance,
    findByClass,
    findByID,
    findByName,
    findBySelector,
    findBySelectorAll,
    findStyleRule,
    findTargetParentWithClass,
    fndByTag,
    getStyle,
    hideOnClickOutside,
    htmlAttr,
    htmlInput,
    htmlToElement,
    htmlToElements,
    inputAttr,
    inputTypes,
    isHTMLElement,
    isImage,
    isInViewport,
    isNode,
    isSVG,
    isVisible,
    isVisibleToUser,
    onClickOutside,
    styleRuleSanitize,
    svgToImage,
    waitForElm
};

// export default DOM
