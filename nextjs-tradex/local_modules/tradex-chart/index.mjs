const NAME = 'TradeX-Chart';
const SHORTNAME = 'TX';
const CLASS_UTILS = 'tradeXutils';
const CLASS_MENUS = 'tradeXmenus';
const CLASS_MENU = 'tradeXmenu';
const CLASS_DIVIDERS = 'tradeXdividers';
const CLASS_WINDOWS = 'tradeXwindows';
const CLASS_WINDOW = 'tradeXwindow';
const CLASS_PROGRESS = 'tradeXprogress';
const RANGELIMIT = 500;
const STREAM_NONE = 'stream_None';
const STREAM_LISTENING = 'stream_Listening';
const STREAM_STARTED = 'stream_Started';
const STREAM_STOPPED = 'stream_Stopped';
const STREAM_ERROR = 'stream_Error';
const STREAM_FIRSTVALUE = 'stream_candleFirst';
const STREAM_UPDATE = 'stream_candleUpdate';
const STREAM_NEWVALUE = 'stream_candleNew';
const STREAM_MAXUPDATE = 250;
const STREAM_PRECISION = 8;
const PRICE_PRECISION = 2;
const VOLUME_PRECISION = 2;
const MAX_CRYPTO_PRECISION = 18;
const HIT_DEBOUNCE = 100;
const CSSUNITS = /^(\d*\.?\d+)\s?(px|em|ex|%|in|cn|mm|pt|pc+)$/gim;

function isArray(v) {
  return Array.isArray(v);
}
function isArrayOfType(v, t) {
  if (!isArray(v)) return false;
  return v.every((n) => checkType(t, n));
}
function isFunction(v) {
  return v && typeof v === 'function';
}
function isObject(v) {
  return typeof v === 'object' && !Array.isArray(v) && v !== null;
}
function isNumber(v) {
  return typeof v === 'number' && !isNaN(v);
}
function isInteger(v) {
  return typeof v === 'number' && Math.abs(v % 1) === 0;
}
function isValid(v) {
  return v !== null && v !== undefined;
}
function isBoolean(v) {
  return typeof v === 'boolean';
}
function isString(v) {
  return typeof v === 'string';
}
function isMap(v) {
  return v instanceof Map;
}
function isPromise(v) {
  return !!v && (isObject(v) || isFunction(v)) && isFunction(v.then);
}
function isError(v) {
  return v instanceof Error;
}
function isClass(v) {
  if (!(v && v.constructor === Function) || v.prototype === undefined)
    return false;
  if (Object.getOwnPropertyNames(v).includes('arguments')) return false;
  if (Object.getOwnPropertyNames(v).includes('arguments')) return false;
  if (Object.getOwnPropertyNames(v).includes('arguments')) return false;
  if (Function.prototype !== Object.getPrototypeOf(v)) return true;
  return Object.getOwnPropertyNames(v.prototype).length > 1;
}
function checkType(type, value) {
  if (value === undefined || value === null) return false;
  switch (type) {
    case 'array':
      return isArray(value);
    case 'function':
      return isFunction(value);
    case 'object':
      return isObject(value);
    case 'integer':
      return isInteger(value);
    case 'number':
      return isNumber(value);
    case 'valid':
      return isValid(value);
    case 'boolean':
      return isBoolean(value);
    case 'string':
      return isString(value);
    case 'map':
      return isMap(value);
    case 'promise':
      return isPromise(value);
    case 'error':
      return isError(value);
    case 'class':
      return isClass(value);
    default:
      throw new Error(`No known test for type: ${type}`);
  }
}
function typeOf(value) {
  const types = [
    'array',
    'error',
    'class',
    'function',
    'map',
    'promise',
    'object',
    'integer',
    'number',
    'boolean',
    'string'
  ];
  for (let type of types) {
    try {
      if (checkType(type, value)) return type;
    } catch (e) {
      return typeof value;
    }
  }
}

var typeChecks = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  checkType: checkType,
  isArray: isArray,
  isArrayOfType: isArrayOfType,
  isBoolean: isBoolean,
  isClass: isClass,
  isError: isError,
  isFunction: isFunction,
  isInteger: isInteger,
  isMap: isMap,
  isNumber: isNumber,
  isObject: isObject,
  isPromise: isPromise,
  isString: isString,
  isValid: isValid,
  typeOf: typeOf
});

const htmlAttr = ['id', 'class', 'style', 'alt', 'width', 'height', 'title'];
const inputAttr = [
  ...htmlAttr,
  'name',
  'type',
  'value',
  'default',
  'placeholder',
  'max',
  'min',
  'maxlenght',
  'src',
  'checked',
  'disabled',
  'pattern',
  'readonly',
  'required',
  'size',
  'step',
  'multiple',
  'autofocus',
  'list',
  'autocomplete'
];
const inputTypes = [
  'button',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week'
];
function findByID(id, base = document) {
  return base.getElementById(id);
}
function findByClass(cl, base = document) {
  return base.getElementsByClassName(cl);
}
function findByName(name, base = document) {
  return base.getElementsByName(name);
}
function fndByTag(tag, base = document) {
  return base.getElementsByTagName(tag);
}
function findBySelector(sel, base = document) {
  return base.querySelector(sel);
}
function findBySelectorAll(sel, base = document) {
  return base.querySelectorAll(sel);
}
function isNode(o) {
  return typeof Node === 'object'
    ? o instanceof Node
    : o &&
        typeof o === 'object' &&
        typeof o.nodeType === 'number' &&
        typeof o.nodeName === 'string';
}
function isHTMLElement(o) {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string';
}
function isVisible(o) {
  if (!isHTMLElement(o)) return false;
  return (
    !!o && !!(o.offsetWidth || o.offsetHeight || o.getClientRects().length)
  );
}
function isInViewport(el) {
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
function isVisibleToUser(el) {
  if (!isHTMLElement(el)) return false;
  const style = getComputedStyle(el);
  if (style.display === 'none') return false;
  if (style.visibility !== 'visible') return false;
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
    y: el.getBoundingClientRect().top + el.offsetHeight / 2
  };
  if (elCenter.x < 0) return false;
  if (elCenter.x > (document.documentElement.clientWidth || window.innerWidth))
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
function isImage(img, cb) {
  if (isSVG(img)) {
    var DOMURL = window.URL || window.webkitURL || window;
    img = new Blob([img], { type: 'image/svg+xml' });
    img = DOMURL.createObjectURL(img);
  }
  const i = new Image();
  i.src = img;
  if (isFunction(cb)) {
    if (i.complete) cb(i);
    else {
      i.onload = () => cb(i);
      i.onerror = () => cb(false);
    }
  } else {
    return new Promise(function (resolve, reject) {
      if (i.complete) resolve(i);
      else {
        i.onload = () => resolve(i);
        i.onerror = () => reject(false);
      }
    });
  }
}
function isSVG(html) {
  if (!isString(html)) return false;
  const svg = /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/;
  return svg.test(html);
}
function waitForElm(selector) {
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
      subtree: true
    });
  });
}
function elementDimPos(el) {
  if (!isHTMLElement(el)) return false;
  let _x = 0;
  let _y = 0;
  let El = el;
  while (
    El &&
    El.tagName.toLowerCase() != 'body' &&
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
    viewport: _vp
  };
}
function elementsDistance(el1, el2) {
  if (!isHTMLElement(el1) || !isHTMLElement(el1)) return false;
  const el1Location = elementDimPos(el1);
  const el2Location = elementDimPos(el2);
  return {
    x: el1Location.top - el2Location.top,
    y: el1Location.left - el2Location.left,
    el1Location: el1Location,
    el2Location: el2Location
  };
}
function htmlToElement(html) {
  if (!isString(html)) return false;
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}
function htmlToElements(html) {
  if (!isString(html)) return false;
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
}
function svgToImage(html, fill, dims) {
  if (!isSVG(html) || !isNumber(dims?.w) || !isNumber(dims?.h)) return false;
  let w = dims.w;
  let h = dims.h;
  let canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  let svg = htmlToElement(html);
  svg.style.fill = fill;
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.xmlns = 'http://www.w3.org/2000/svg';
  let xml = new XMLSerializer().serializeToString(svg);
  let svg64 = btoa(xml);
  let b64Start = 'data:image/svg+xml;base64,';
  let image64 = b64Start + svg64;
  let img = new Image();
  img.setAttribute('width', w);
  img.setAttribute('height', h);
  img.onload = () => {
    canvas.getContext('2d').drawImage(img, 0, 0, w, h);
  };
  img.src = image64;
  return img;
}
function hideOnClickOutside(el) {
  if (!isHTMLElement(el)) return false;
  const outsideClickListener = (event) => {
    if (!el.contains(event.target) && isVisible(el)) {
      el.style.display = 'none';
      removeClickListener();
    }
  };
  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
  };
  document.addEventListener('click', outsideClickListener);
}
function onClickOutside(el, cb) {
  if (!isHTMLElement(el)) return false;
  const outsideClickListener = (event) => {
    if (!el.contains(event.target) && isVisible(el)) {
      cb();
      removeClickListener();
    }
  };
  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
  };
  document.addEventListener('click', outsideClickListener);
}
function getStyle(el, styleProp) {
  let x, y;
  if (isString(el)) x = document.getElementById(el);
  else if (isHTMLElement(el)) x = el;
  else return false;
  const defaultView = (x.ownerDocument || document).defaultView;
  if (!isString(styleProp)) return false;
  if (defaultView && defaultView.getComputedStyle) {
    styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
    y = document.defaultView
      .getComputedStyle(x, null)
      .getPropertyValue(styleProp);
  } else if (x.currentStyle) y = x.currentStyle[styleProp];
  return y;
}
function addStyleRule(styleSheet, selector, property, value) {
  let r = findStyleRule(styleSheet, selector, property, value);
  if (!r) return;
  else if (r.i >= 0) {
    r.rules[r.i].style[r.property] = r.value;
  } else {
    addCSSRule(r.styleSheet, r.selector, r.rules, r.index);
  }
}
function deleteStyleRule(styleSheet, selector, property) {
  let r = findStyleRule(styleSheet, selector, property, '');
  let deleteRule = r.styleSheet.deleteRule || r.styleSheet.removeRule;
  deleteRule(r.i);
}
function findStyleRule(styleSheet, selector, property, value) {
  if (!styleSheet || !isObject(styleSheet)) return null;
  else if (styleSheet.constructor.name == 'HTMLStyleElement')
    styleSheet = styleSheet.sheet;
  else if (styleSheet.constructor.name != 'CSSStyleSheet') return null;
  let r = styleRuleSanitize(selector, property, value);
  selector = r[0];
  property = r[1];
  value = r[2];
  const rules = styleSheet.cssRules || styleSheet.rules;
  for (var i = rules.length - 1; i > 0; --i) {
    let rule = rules[i];
    if (rule.selectorText === selector) {
      break;
    }
  }
  return { styleSheet, rules, selector, property, value, i };
}
function styleRuleSanitize(selector, property, value) {
  return [
    (selector = selector.toLowerCase().replace(/\s+/g, ' ')),
    (property = property.toLowerCase()),
    (value = value.toLowerCase())
  ];
}
function addCSSRule(sheet, selector, rules, index) {
  if (sheet.insertRule) {
    sheet.insertRule(selector + '{' + rules + '}', index);
  } else {
    sheet.addRule(selector, rules, index);
  }
}
function findTargetParentWithClass(el, selector) {
  if (!isHTMLElement(el) || !isString(selector)) return null;
  if (el.classList.contains(selector)) return el;
  else return findTargetParentWithClass(el.parentElement, selector);
}
function htmlInput(i, o) {
  let id = isString(o?.entry) ? o?.entry : '';
  let label = isString(i) ? `<label for="${id}">${i}</label>` : ``;
  let input = `${label}<input id="${id}" class="subject" `;
  for (let p in o) {
    if (inputAttr.includes(p) || /^(data-[^\t\n\f \/>"'=]+)/g.test(p)) {
      input += `${p}="${o[p]}" `;
    }
  }
  return (input += `>\n`);
}
function htmlSelect(i, o) {
  let id = isString(o?.entry) ? o?.entry : '';
  let label = isString(i) ? `<label for="${id}">${i}</label>` : ``;
  let options = '';
  for (let opt in o?.options) {
    options += `<option value="${o.options[opt]}">${opt}</option>`;
  }
  let input = `${label}<select id="${id}" class="subject">${options}</select>\n`;
  return input;
}
var DOM = {
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

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';
typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;
(typeof window !== 'undefined' && window.name === 'nodejs') ||
  (typeof navigator !== 'undefined' &&
    (navigator.userAgent.includes('Node.js') ||
      navigator.userAgent.includes('jsdom')));
const isTouchDevice = ((w) =>
  typeof w !== 'undefined' &&
  ('onorientationchange' in w ||
    (typeof w.matchMedia === 'function' &&
      w.matchMedia('(any-pointer:coarse)').matches) ||
    (typeof navigator !== 'undefined' &&
      (navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0 ||
        'ontouchstart' in w ||
        (w.DocumentTouch && document instanceof w.DocumentTouch)))))(
  typeof window !== 'undefined' ? window : {}
);

const status = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class Point {
  #x = 0;
  #y = 0;
  constructor() {
    if (arguments.length === 1) {
      const { x, y } = arguments[0];
      this.x = x || 0;
      this.y = y || 0;
    } else if (arguments.length > 1) {
      const [x, y] = arguments;
      this.x = x || 0;
      this.y = y || 0;
    }
  }
  set x(x) {
    if (isNumber(x)) this.#x = x;
  }
  get x() {
    return this.#x;
  }
  set y(y) {
    if (isNumber(y)) this.#y = y;
  }
  get y() {
    return this.#y;
  }
  clone() {
    return new Point(this.x, this.y);
  }
}

// Hammer.Manager mock for use in environments without `document` / `window`.
class HammerManagerMock {
  constructor() {
    this.get = () => null;
    this.set = () => this;
    this.on = () => this;
    this.off = () => this;
    this.destroy = () => this;
    this.emit = () => this;
  }
}
const Manager = HammerManagerMock;

let Input$1 = class Input {
  constructor(element, callback, options) {
    this.element = element;
    this.callback = callback;
    this.options = { enable: true, ...options };
  }
};

// This module contains constants that must be conditionally required
// due to `window`/`document` references downstream.
const RECOGNIZERS = null;
// Recognize the following gestures even if a given recognizer succeeds
const RECOGNIZER_COMPATIBLE_MAP = {
  tripan: ['rotate', 'pinch', 'pan'],
  rotate: ['pinch'],
  pinch: ['pan'],
  pan: ['press', 'doubletap', 'anytap', 'tap'],
  doubletap: ['anytap'],
  anytap: ['tap']
};
// Recognize the folling gestures only if a given recognizer fails
const RECOGNIZER_FALLBACK_MAP = {
  doubletap: ['tap']
};
/**
 * Only one set of basic input events will be fired by Hammer.js:
 * either pointer, touch, or mouse, depending on system support.
 * In order to enable an application to be agnostic of system support,
 * alias basic input events into "classes" of events: down, move, and up.
 * See `_onBasicInput()` for usage of these aliases.
 */
const BASIC_EVENT_ALIASES = {
  pointerdown: 'pointerdown',
  pointermove: 'pointermove',
  pointerup: 'pointerup',
  touchstart: 'pointerdown',
  touchmove: 'pointermove',
  touchend: 'pointerup',
  mousedown: 'pointerdown',
  mousemove: 'pointermove',
  mouseup: 'pointerup'
};
const INPUT_EVENT_TYPES = {
  KEY_EVENTS: ['keydown', 'keyup'],
  MOUSE_EVENTS: [
    'mousedown',
    'mousemove',
    'mouseup',
    'mouseover',
    'mouseout',
    'mouseleave'
  ],
  WHEEL_EVENTS: [
    // Chrome, Safari
    'wheel',
    // IE
    'mousewheel'
  ]
};
/**
 * "Gestural" events are those that have semantic meaning beyond the basic input event,
 * e.g. a click or tap is a sequence of `down` and `up` events with no `move` event in between.
 * Hammer.js handles these with its Recognizer system;
 * this block maps event names to the Recognizers required to detect the events.
 */
const EVENT_RECOGNIZER_MAP = {
  tap: 'tap',
  anytap: 'anytap',
  doubletap: 'doubletap',
  press: 'press',
  pinch: 'pinch',
  pinchin: 'pinch',
  pinchout: 'pinch',
  pinchstart: 'pinch',
  pinchmove: 'pinch',
  pinchend: 'pinch',
  pinchcancel: 'pinch',
  rotate: 'rotate',
  rotatestart: 'rotate',
  rotatemove: 'rotate',
  rotateend: 'rotate',
  rotatecancel: 'rotate',
  tripan: 'tripan',
  tripanstart: 'tripan',
  tripanmove: 'tripan',
  tripanup: 'tripan',
  tripandown: 'tripan',
  tripanleft: 'tripan',
  tripanright: 'tripan',
  tripanend: 'tripan',
  tripancancel: 'tripan',
  pan: 'pan',
  panstart: 'pan',
  panmove: 'pan',
  panup: 'pan',
  pandown: 'pan',
  panleft: 'pan',
  panright: 'pan',
  panend: 'pan',
  pancancel: 'pan',
  swipe: 'swipe',
  swipeleft: 'swipe',
  swiperight: 'swipe',
  swipeup: 'swipe',
  swipedown: 'swipe'
};
/**
 * Map gestural events typically provided by browsers
 * that are not reported in 'hammer.input' events
 * to corresponding Hammer.js gestures.
 */
const GESTURE_EVENT_ALIASES = {
  click: 'tap',
  anyclick: 'anytap',
  dblclick: 'doubletap',
  mousedown: 'pointerdown',
  mousemove: 'pointermove',
  mouseup: 'pointerup',
  mouseover: 'pointerover',
  mouseout: 'pointerout',
  mouseleave: 'pointerleave'
};

// Purpose: include this in your module to avoids adding dependencies on
// micro modules like 'global'
/* global window, global, document, navigator */
const userAgent =
  typeof navigator !== 'undefined' && navigator.userAgent
    ? navigator.userAgent.toLowerCase()
    : '';
const window_ = typeof window !== 'undefined' ? window : global;
/*
 * Detect whether passive option is supported by the current browser.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   #Safely_detecting_option_support
 */
let passiveSupported = false;
/* eslint-disable accessor-pairs, no-empty */
try {
  const options = {
    // This function will be called when the browser
    // attempts to access the passive property.
    get passive() {
      passiveSupported = true;
      return true;
    }
  };
  window_.addEventListener('test', null, options);
  window_.removeEventListener('test', null);
} catch (err) {
  passiveSupported = false;
}

const firefox = userAgent.indexOf('firefox') !== -1;
const { WHEEL_EVENTS } = INPUT_EVENT_TYPES;
const EVENT_TYPE$1 = 'wheel';
// Constants for normalizing input delta
const WHEEL_DELTA_MAGIC_SCALER = 4.000244140625;
const WHEEL_DELTA_PER_LINE = 40;
// Slow down zoom if shift key is held for more precise zooming
const SHIFT_MULTIPLIER = 0.25;
class WheelInput extends Input$1 {
  constructor(element, callback, options) {
    super(element, callback, options);
    /* eslint-disable complexity, max-statements */
    this.handleEvent = (event) => {
      if (!this.options.enable) {
        return;
      }
      let value = event.deltaY;
      if (window_.WheelEvent) {
        // Firefox doubles the values on retina screens...
        if (firefox && event.deltaMode === window_.WheelEvent.DOM_DELTA_PIXEL) {
          value /= window_.devicePixelRatio;
        }
        if (event.deltaMode === window_.WheelEvent.DOM_DELTA_LINE) {
          value *= WHEEL_DELTA_PER_LINE;
        }
      }
      if (value !== 0 && value % WHEEL_DELTA_MAGIC_SCALER === 0) {
        // This one is definitely a mouse wheel event.
        // Normalize this value to match trackpad.
        value = Math.floor(value / WHEEL_DELTA_MAGIC_SCALER);
      }
      if (event.shiftKey && value) {
        value = value * SHIFT_MULTIPLIER;
      }
      this.callback({
        type: EVENT_TYPE$1,
        center: {
          x: event.clientX,
          y: event.clientY
        },
        delta: -value,
        srcEvent: event,
        pointerType: 'mouse',
        target: event.target
      });
    };
    this.events = (this.options.events || []).concat(WHEEL_EVENTS);
    this.events.forEach((event) =>
      element.addEventListener(
        event,
        this.handleEvent,
        passiveSupported ? { passive: false } : false
      )
    );
  }
  destroy() {
    this.events.forEach((event) =>
      this.element.removeEventListener(event, this.handleEvent)
    );
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === EVENT_TYPE$1) {
      this.options.enable = enabled;
    }
  }
}

const { MOUSE_EVENTS: MOUSE_EVENTS$1 } = INPUT_EVENT_TYPES;
const MOVE_EVENT_TYPE = 'pointermove';
const OVER_EVENT_TYPE = 'pointerover';
const OUT_EVENT_TYPE = 'pointerout';
const ENTER_EVENT_TYPE = 'pointerenter';
const LEAVE_EVENT_TYPE = 'pointerleave';
/**
 * Hammer.js swallows 'move' events (for pointer/touch/mouse)
 * when the pointer is not down. This class sets up a handler
 * specifically for these events to work around this limitation.
 * Note that this could be extended to more intelligently handle
 * move events across input types, e.g. storing multiple simultaneous
 * pointer/touch events, calculating speed/direction, etc.
 */
class MoveInput extends Input$1 {
  constructor(element, callback, options) {
    super(element, callback, options);
    this.handleEvent = (event) => {
      this.handleOverEvent(event);
      this.handleOutEvent(event);
      this.handleEnterEvent(event);
      this.handleLeaveEvent(event);
      this.handleMoveEvent(event);
    };
    this.pressed = false;
    const { enable } = this.options;
    this.enableMoveEvent = enable;
    this.enableLeaveEvent = enable;
    this.enableEnterEvent = enable;
    this.enableOutEvent = enable;
    this.enableOverEvent = enable;
    this.events = (this.options.events || []).concat(MOUSE_EVENTS$1);
    this.events.forEach((event) =>
      element.addEventListener(event, this.handleEvent)
    );
  }
  destroy() {
    this.events.forEach((event) =>
      this.element.removeEventListener(event, this.handleEvent)
    );
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === MOVE_EVENT_TYPE) {
      this.enableMoveEvent = enabled;
    }
    if (eventType === OVER_EVENT_TYPE) {
      this.enableOverEvent = enabled;
    }
    if (eventType === OUT_EVENT_TYPE) {
      this.enableOutEvent = enabled;
    }
    if (eventType === ENTER_EVENT_TYPE) {
      this.enableEnterEvent = enabled;
    }
    if (eventType === LEAVE_EVENT_TYPE) {
      this.enableLeaveEvent = enabled;
    }
  }
  handleOverEvent(event) {
    if (this.enableOverEvent) {
      if (event.type === 'mouseover') {
        this._emit(OVER_EVENT_TYPE, event);
      }
    }
  }
  handleOutEvent(event) {
    if (this.enableOutEvent) {
      if (event.type === 'mouseout') {
        this._emit(OUT_EVENT_TYPE, event);
      }
    }
  }
  handleEnterEvent(event) {
    if (this.enableEnterEvent) {
      if (event.type === 'mouseenter') {
        this._emit(ENTER_EVENT_TYPE, event);
      }
    }
  }
  handleLeaveEvent(event) {
    if (this.enableLeaveEvent) {
      if (event.type === 'mouseleave') {
        this._emit(LEAVE_EVENT_TYPE, event);
      }
    }
  }
  handleMoveEvent(event) {
    if (this.enableMoveEvent) {
      switch (event.type) {
        case 'mousedown':
          if (event.button >= 0) {
            // Button is down
            this.pressed = true;
          }
          break;
        case 'mousemove':
          // Move events use `bottons` to track the button being pressed
          if (event.buttons === 0) {
            // Button is not down
            this.pressed = false;
          }
          if (!this.pressed) {
            // Drag events are emitted by hammer already
            // we just need to emit the move event on hover
            this._emit(MOVE_EVENT_TYPE, event);
          }
          break;
        case 'mouseup':
          this.pressed = false;
          break;
      }
    }
  }
  _emit(type, event) {
    this.callback({
      type,
      center: {
        x: event.clientX,
        y: event.clientY
      },
      srcEvent: event,
      pointerType: 'mouse',
      target: event.target
    });
  }
}

const { KEY_EVENTS } = INPUT_EVENT_TYPES;
const DOWN_EVENT_TYPE = 'keydown';
const UP_EVENT_TYPE = 'keyup';
class KeyInput extends Input$1 {
  constructor(element, callback, options) {
    super(element, callback, options);
    this.handleEvent = (event) => {
      // Ignore if focused on text input
      const targetElement = event.target || event.srcElement;
      if (
        (targetElement.tagName === 'INPUT' && targetElement.type === 'text') ||
        targetElement.tagName === 'TEXTAREA'
      ) {
        return;
      }
      if (this.enableDownEvent && event.type === 'keydown') {
        this.callback({
          type: DOWN_EVENT_TYPE,
          srcEvent: event,
          key: event.key,
          target: event.target
        });
      }
      if (this.enableUpEvent && event.type === 'keyup') {
        this.callback({
          type: UP_EVENT_TYPE,
          srcEvent: event,
          key: event.key,
          target: event.target
        });
      }
    };
    this.enableDownEvent = this.options.enable;
    this.enableUpEvent = this.options.enable;
    this.events = (this.options.events || []).concat(KEY_EVENTS);
    element.tabIndex = this.options.tabIndex || 0;
    element.style.outline = 'none';
    this.events.forEach((event) =>
      element.addEventListener(event, this.handleEvent)
    );
  }
  destroy() {
    this.events.forEach((event) =>
      this.element.removeEventListener(event, this.handleEvent)
    );
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === DOWN_EVENT_TYPE) {
      this.enableDownEvent = enabled;
    }
    if (eventType === UP_EVENT_TYPE) {
      this.enableUpEvent = enabled;
    }
  }
}

const EVENT_TYPE = 'contextmenu';
class ContextmenuInput extends Input$1 {
  constructor(element, callback, options) {
    super(element, callback, options);
    this.handleEvent = (event) => {
      if (!this.options.enable) {
        return;
      }
      this.callback({
        type: EVENT_TYPE,
        center: {
          x: event.clientX,
          y: event.clientY
        },
        srcEvent: event,
        pointerType: 'mouse',
        target: event.target
      });
    };
    element.addEventListener('contextmenu', this.handleEvent);
  }
  destroy() {
    this.element.removeEventListener('contextmenu', this.handleEvent);
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === EVENT_TYPE) {
      this.options.enable = enabled;
    }
  }
}

/* Constants */
const DOWN_EVENT = 1;
const MOVE_EVENT = 2;
const UP_EVENT = 4;
const MOUSE_EVENTS = {
  pointerdown: DOWN_EVENT,
  pointermove: MOVE_EVENT,
  pointerup: UP_EVENT,
  mousedown: DOWN_EVENT,
  mousemove: MOVE_EVENT,
  mouseup: UP_EVENT
};
// MouseEvent.button https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const MOUSE_EVENT_BUTTON_LEFT = 0;
const MOUSE_EVENT_BUTTON_MIDDLE = 1;
const MOUSE_EVENT_BUTTON_RIGHT = 2;
// MouseEvent.buttons https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
const MOUSE_EVENT_BUTTONS_LEFT_MASK = 1;
const MOUSE_EVENT_BUTTONS_RIGHT_MASK = 2;
const MOUSE_EVENT_BUTTONS_MIDDLE_MASK = 4;
/**
 * Extract the involved mouse button
 */
function whichButtons(event) {
  const eventType = MOUSE_EVENTS[event.srcEvent.type];
  if (!eventType) {
    // Not a mouse evet
    return null;
  }
  const { buttons, button } = event.srcEvent;
  let leftButton = false;
  let middleButton = false;
  let rightButton = false;
  if (eventType === MOVE_EVENT) {
    leftButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_LEFT_MASK);
    middleButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_MIDDLE_MASK);
    rightButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_RIGHT_MASK);
  } else {
    leftButton = button === MOUSE_EVENT_BUTTON_LEFT;
    middleButton = button === MOUSE_EVENT_BUTTON_MIDDLE;
    rightButton = button === MOUSE_EVENT_BUTTON_RIGHT;
  }
  return { leftButton, middleButton, rightButton };
}
/**
 * Calculate event position relative to the root element
 */
function getOffsetPosition(event, rootElement) {
  const center = event.center;
  // `center` is a hammer.js event property
  if (!center) {
    // Not a gestural event
    return null;
  }
  const rect = rootElement.getBoundingClientRect();
  // Fix scale for map affected by a CSS transform.
  // See https://stackoverflow.com/a/26893663/3528533
  const scaleX = rect.width / rootElement.offsetWidth || 1;
  const scaleY = rect.height / rootElement.offsetHeight || 1;
  // Calculate center relative to the root element
  const offsetCenter = {
    x: (center.x - rect.left - rootElement.clientLeft) / scaleX,
    y: (center.y - rect.top - rootElement.clientTop) / scaleY
  };
  return { center, offsetCenter };
}

const DEFAULT_OPTIONS$1 = {
  srcElement: 'root',
  priority: 0
};
class EventRegistrar {
  constructor(eventManager) {
    /**
     * Handles hammerjs event
     */
    this.handleEvent = (event) => {
      if (this.isEmpty()) {
        return;
      }
      const mjolnirEvent = this._normalizeEvent(event);
      let target = event.srcEvent.target;
      while (target && target !== mjolnirEvent.rootElement) {
        this._emit(mjolnirEvent, target);
        if (mjolnirEvent.handled) {
          return;
        }
        target = target.parentNode;
      }
      this._emit(mjolnirEvent, 'root');
    };
    this.eventManager = eventManager;
    this.handlers = [];
    // Element -> handler map
    this.handlersByElement = new Map();
    this._active = false;
  }
  // Returns true if there are no non-passive handlers
  isEmpty() {
    return !this._active;
  }
  add(type, handler, options, once = false, passive = false) {
    const { handlers, handlersByElement } = this;
    let opts = DEFAULT_OPTIONS$1;
    if (typeof options === 'string' || (options && options.addEventListener)) {
      // is DOM element, backward compatibility
      // @ts-ignore
      opts = { ...DEFAULT_OPTIONS$1, srcElement: options };
    } else if (options) {
      opts = { ...DEFAULT_OPTIONS$1, ...options };
    }
    let entries = handlersByElement.get(opts.srcElement);
    if (!entries) {
      entries = [];
      handlersByElement.set(opts.srcElement, entries);
    }
    const entry = {
      type,
      handler,
      srcElement: opts.srcElement,
      priority: opts.priority
    };
    if (once) {
      entry.once = true;
    }
    if (passive) {
      entry.passive = true;
    }
    handlers.push(entry);
    this._active = this._active || !entry.passive;
    // Sort handlers by descending priority
    // Handlers with the same priority are excuted in the order of registration
    let insertPosition = entries.length - 1;
    while (insertPosition >= 0) {
      if (entries[insertPosition].priority >= entry.priority) {
        break;
      }
      insertPosition--;
    }
    entries.splice(insertPosition + 1, 0, entry);
  }
  remove(type, handler) {
    const { handlers, handlersByElement } = this;
    for (let i = handlers.length - 1; i >= 0; i--) {
      const entry = handlers[i];
      if (entry.type === type && entry.handler === handler) {
        handlers.splice(i, 1);
        const entries = handlersByElement.get(entry.srcElement);
        entries.splice(entries.indexOf(entry), 1);
        if (entries.length === 0) {
          handlersByElement.delete(entry.srcElement);
        }
      }
    }
    this._active = handlers.some((entry) => !entry.passive);
  }
  /**
   * Invoke handlers on a particular element
   */
  _emit(event, srcElement) {
    const entries = this.handlersByElement.get(srcElement);
    if (entries) {
      let immediatePropagationStopped = false;
      // Prevents the current event from bubbling up
      const stopPropagation = () => {
        event.handled = true;
      };
      // Prevent any remaining listeners from being called
      const stopImmediatePropagation = () => {
        event.handled = true;
        immediatePropagationStopped = true;
      };
      const entriesToRemove = [];
      for (let i = 0; i < entries.length; i++) {
        const { type, handler, once } = entries[i];
        handler({
          ...event,
          // @ts-ignore
          type,
          stopPropagation,
          stopImmediatePropagation
        });
        if (once) {
          entriesToRemove.push(entries[i]);
        }
        if (immediatePropagationStopped) {
          break;
        }
      }
      for (let i = 0; i < entriesToRemove.length; i++) {
        const { type, handler } = entriesToRemove[i];
        this.remove(type, handler);
      }
    }
  }
  /**
   * Normalizes hammerjs and custom events to have predictable fields.
   */
  _normalizeEvent(event) {
    const rootElement = this.eventManager.getElement();
    return {
      ...event,
      ...whichButtons(event),
      ...getOffsetPosition(event, rootElement),
      preventDefault: () => {
        event.srcEvent.preventDefault();
      },
      stopImmediatePropagation: null,
      stopPropagation: null,
      handled: false,
      rootElement
    };
  }
}

const DEFAULT_OPTIONS = {
  // event handlers
  events: null,
  // custom recognizers
  recognizers: null,
  recognizerOptions: {},
  // Manager class
  Manager,
  // allow browser default touch action
  // https://github.com/uber/react-map-gl/issues/506
  touchAction: 'none',
  tabIndex: 0
};
// Unified API for subscribing to events about both
// basic input events (e.g. 'mousemove', 'touchstart', 'wheel')
// and gestural input (e.g. 'click', 'tap', 'panstart').
// Delegates gesture related event registration and handling to Hammer.js.
class EventManager {
  constructor(element = null, options) {
    /**
     * Handle basic events using the 'hammer.input' Hammer.js API:
     * Before running Recognizers, Hammer emits a 'hammer.input' event
     * with the basic event info. This function emits all basic events
     * aliased to the "class" of event received.
     * See constants.BASIC_EVENT_CLASSES basic event class definitions.
     */
    this._onBasicInput = (event) => {
      const { srcEvent } = event;
      const alias = BASIC_EVENT_ALIASES[srcEvent.type];
      if (alias) {
        // fire all events aliased to srcEvent.type
        this.manager.emit(alias, event);
      }
    };
    /**
     * Handle events not supported by Hammer.js,
     * and pipe back out through same (Hammer) channel used by other events.
     */
    this._onOtherEvent = (event) => {
      // console.log('onotherevent', event.type, event)
      this.manager.emit(event.type, event);
    };
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.events = new Map();
    this.setElement(element);
    // Register all passed events.
    const { events } = this.options;
    if (events) {
      this.on(events);
    }
  }
  getElement() {
    return this.element;
  }
  setElement(element) {
    if (this.element) {
      // unregister all events
      this.destroy();
    }
    this.element = element;
    if (!element) {
      return;
    }
    const { options } = this;
    const ManagerClass = options.Manager;
    this.manager = new ManagerClass(element, {
      touchAction: options.touchAction,
      recognizers: options.recognizers || RECOGNIZERS
    }).on('hammer.input', this._onBasicInput);
    if (!options.recognizers) {
      // Set default recognize withs
      // http://hammerjs.github.io/recognize-with/
      Object.keys(RECOGNIZER_COMPATIBLE_MAP).forEach((name) => {
        const recognizer = this.manager.get(name);
        if (recognizer) {
          RECOGNIZER_COMPATIBLE_MAP[name].forEach((otherName) => {
            recognizer.recognizeWith(otherName);
          });
        }
      });
    }
    // Set recognizer options
    for (const recognizerName in options.recognizerOptions) {
      const recognizer = this.manager.get(recognizerName);
      if (recognizer) {
        const recognizerOption = options.recognizerOptions[recognizerName];
        // `enable` is managed by the event registrations
        delete recognizerOption.enable;
        recognizer.set(recognizerOption);
      }
    }
    // Handle events not handled by Hammer.js:
    // - mouse wheel
    // - pointer/touch/mouse move
    this.wheelInput = new WheelInput(element, this._onOtherEvent, {
      enable: false
    });
    this.moveInput = new MoveInput(element, this._onOtherEvent, {
      enable: false
    });
    this.keyInput = new KeyInput(element, this._onOtherEvent, {
      enable: false,
      tabIndex: options.tabIndex
    });
    this.contextmenuInput = new ContextmenuInput(element, this._onOtherEvent, {
      enable: false
    });
    // Register all existing events
    for (const [eventAlias, eventRegistrar] of this.events) {
      if (!eventRegistrar.isEmpty()) {
        // Enable recognizer for this event.
        this._toggleRecognizer(eventRegistrar.recognizerName, true);
        this.manager.on(eventAlias, eventRegistrar.handleEvent);
      }
    }
  }
  // Tear down internal event management implementations.
  destroy() {
    if (this.element) {
      // wheelInput etc. are created in setElement() and therefore
      // cannot exist if there is no element
      this.wheelInput.destroy();
      this.moveInput.destroy();
      this.keyInput.destroy();
      this.contextmenuInput.destroy();
      this.manager.destroy();
      this.wheelInput = null;
      this.moveInput = null;
      this.keyInput = null;
      this.contextmenuInput = null;
      this.manager = null;
      this.element = null;
    }
  }
  /** Register an event handler function to be called on `event` */
  on(event, handler, opts) {
    this._addEventHandler(event, handler, opts, false);
  }
  once(event, handler, opts) {
    this._addEventHandler(event, handler, opts, true);
  }
  watch(event, handler, opts) {
    this._addEventHandler(event, handler, opts, false, true);
  }
  off(event, handler) {
    this._removeEventHandler(event, handler);
  }
  /*
   * Enable/disable recognizer for the given event
   */
  _toggleRecognizer(name, enabled) {
    const { manager } = this;
    if (!manager) {
      return;
    }
    const recognizer = manager.get(name);
    // @ts-ignore
    if (recognizer && recognizer.options.enable !== enabled) {
      recognizer.set({ enable: enabled });
      const fallbackRecognizers = RECOGNIZER_FALLBACK_MAP[name];
      if (fallbackRecognizers && !this.options.recognizers) {
        // Set default require failures
        // http://hammerjs.github.io/require-failure/
        fallbackRecognizers.forEach((otherName) => {
          const otherRecognizer = manager.get(otherName);
          if (enabled) {
            // Wait for this recognizer to fail
            otherRecognizer.requireFailure(name);
            /**
                         * This seems to be a bug in hammerjs:
                         * requireFailure() adds both ways
                         * dropRequireFailure() only drops one way
                         * https://github.com/hammerjs/hammer.js/blob/master/src/recognizerjs/
                           recognizer-constructor.js#L136
                         */
            recognizer.dropRequireFailure(otherName);
          } else {
            // Do not wait for this recognizer to fail
            otherRecognizer.dropRequireFailure(name);
          }
        });
      }
    }
    this.wheelInput.enableEventType(name, enabled);
    this.moveInput.enableEventType(name, enabled);
    this.keyInput.enableEventType(name, enabled);
    this.contextmenuInput.enableEventType(name, enabled);
  }
  /**
   * Process the event registration for a single event + handler.
   */
  _addEventHandler(event, handler, opts, once, passive) {
    if (typeof event !== 'string') {
      // @ts-ignore
      opts = handler;
      // If `event` is a map, call `on()` for each entry.
      for (const eventName in event) {
        this._addEventHandler(eventName, event[eventName], opts, once, passive);
      }
      return;
    }
    const { manager, events } = this;
    // Alias to a recognized gesture as necessary.
    const eventAlias = GESTURE_EVENT_ALIASES[event] || event;
    let eventRegistrar = events.get(eventAlias);
    if (!eventRegistrar) {
      eventRegistrar = new EventRegistrar(this);
      events.set(eventAlias, eventRegistrar);
      // Enable recognizer for this event.
      eventRegistrar.recognizerName =
        EVENT_RECOGNIZER_MAP[eventAlias] || eventAlias;
      // Listen to the event
      if (manager) {
        manager.on(eventAlias, eventRegistrar.handleEvent);
      }
    }
    eventRegistrar.add(event, handler, opts, once, passive);
    if (!eventRegistrar.isEmpty()) {
      this._toggleRecognizer(eventRegistrar.recognizerName, true);
    }
  }
  /**
   * Process the event deregistration for a single event + handler.
   */
  _removeEventHandler(event, handler) {
    if (typeof event !== 'string') {
      // If `event` is a map, call `off()` for each entry.
      for (const eventName in event) {
        this._removeEventHandler(eventName, event[eventName]);
      }
      return;
    }
    const { events } = this;
    // Alias to a recognized gesture as necessary.
    const eventAlias = GESTURE_EVENT_ALIASES[event] || event;
    const eventRegistrar = events.get(eventAlias);
    if (!eventRegistrar) {
      return;
    }
    eventRegistrar.remove(event, handler);
    if (eventRegistrar.isEmpty()) {
      const { recognizerName } = eventRegistrar;
      // Disable recognizer if no more handlers are attached to its events
      let isRecognizerUsed = false;
      for (const eh of events.values()) {
        if (eh.recognizerName === recognizerName && !eh.isEmpty()) {
          isRecognizerUsed = true;
          break;
        }
      }
      if (!isRecognizerUsed) {
        this._toggleRecognizer(recognizerName, false);
      }
    }
  }
}

class PointerAgent {
  #types = [
    'pointerdown',
    'pointerup',
    'pointerover',
    'pointerenter',
    'pointerout',
    'pointerleave',
    'pointermove',
    'pointercancel',
    'gotpointercapture',
    'lostpointercapture',
    'click',
    'dblclick',
    'anyclick',
    'wheel',
    'contextmenu',
    'pointerdrag',
    'pointerdragend',
    'pan',
    'panstart',
    'panmove',
    'panup',
    'pandown',
    'panleft',
    'panright',
    'panend',
    'pancancel'
  ];
  #input;
  #pad = {
    left: false
  };
  constructor(input) {
    this.#input = input;
  }
  has(event) {
    return this.#types.indexOf(event) == -1 ? false : true;
  }
  on(event, handler, options, once) {
    let cb = handler;
    switch (event) {
      case 'pointerdown':
        cb = function (e) {
          if (e.leftButton) this.#input.pad.left = true;
          this.#input.onPointerDown(e);
          handler(this.#input.pointerEventData(e));
        };
        break;
      case 'pointerup':
        cb = function (e) {
          this.#input.onPointerUp(e);
          handler(this.#input.pointerEventData(e));
        };
        break;
      case 'pointermove':
        cb = function (e) {
          this.#input.motion(e);
          handler(this.#input.pointerEventData(e));
        };
        break;
      case 'click':
      case 'dbclick':
      case 'pointerenter':
      case 'pointerleave':
      case 'pointerout':
      case 'pointerover':
      case 'contextmenu':
        cb = function (e) {
          this.#input.location(e);
          handler(this.#input.pointerEventData(e));
        };
        break;
      case 'wheel':
        cb = function (e) {
          this.#input.wheeldelta = e;
          handler(this.#input.pointerEventData(e));
        };
        break;
      case 'pointercancel':
      case 'gotpointercapture':
      case 'lostpointercapture':
        cb = function (e) {
          handler(e);
        };
        break;
      case 'pointerdrag':
        cb = function (e) {
          this.#input.motion(e);
          handler(this.#input.pointerEventData(e));
        };
        this.#input.agent.on(
          'panstart',
          this.#input.startPointerDrag.bind(this.#input)
        );
        event = 'panmove';
        break;
      case 'pointerdragend':
        cb = function (e) {
          this.#input.motion(e);
          this.#input.endPointerDrag(e);
          handler(this.#input.pointerEventData(e));
        };
        event = 'panend';
        break;
    }
    if (once) this.#input.agent.once(event, cb.bind(this), options);
    else this.#input.agent.on(event, cb.bind(this), options);
    return cb;
  }
  off(event, handler, options) {
    this.#input.agent.off(event, handler, options);
  }
}

class TouchAgent {
  #types = [
    'rotate',
    'rotatestart',
    'rotatemove',
    'rotateend',
    'rotatecancel',
    'pinch',
    'pinchin',
    'pinchout',
    'pinchstart',
    'pinchmove',
    'pinchend',
    'pinchcancel',
    'swipe',
    'swipeleft',
    'swiperight',
    'swipeup',
    'swipedown',
    'tripan',
    'tripanstart',
    'tripanmove',
    'tripanup',
    'tripandown',
    'tripanleft',
    'tripanright',
    'tripanend',
    'tripancancel'
  ];
  #input;
  constructor(input) {
    this.#input = input;
  }
  has(event) {
    return this.#types.indexOf(event) == -1 ? false : true;
  }
  on(event, handler, options, once) {
    let cb = handler;
    if (once) this.#input.agent.once(event, cb.bind(this), options);
    else this.#input.agent.on(event, cb.bind(this), options);
    return cb;
  }
  off(event, handler, options) {
    this.#input.agent.off(event, handler, options);
  }
}

class KeyboardAgent {
  #types = ['keydown', 'keyup'];
  #input;
  constructor(input) {
    this.#input = input;
  }
  has(event) {
    return this.#types.indexOf(event) == -1 ? false : true;
  }
  on(event, handler, options, once) {
    let cb = handler;
    if (once) this.#input.agent.once(event, cb.bind(this), options);
    else this.#input.agent.on(event, cb.bind(this), options);
    return cb;
  }
  off(event, handler, options) {
    this.#input.agent.off(event, handler, options);
  }
}

const defaultOptions = {
  element: undefined,
  contextMenu: true,
  panX: true,
  panY: true
};
class Input {
  #options;
  #element;
  #eventsAgent;
  #status;
  #listeners;
  #pointer;
  #key;
  #touch;
  #isTouch;
  #isPan;
  #wheelDelta;
  constructor(element, options) {
    this.#listeners = [];
    this.#pointer = null;
    this.#key = null;
    this.#touch = null;
    this.#isPan = false;
    this.pad = { left: false };
    this.#options = { ...defaultOptions, ...options };
    this.#status = status.idle;
    this.#isTouch = isTouchDevice;
    this.#element = element;
    if (!this.#element && this.#options.elementId) {
      this.#element = document.getElementById(this.#options.elementId);
    }
    if (!isHTMLElement(this.#element)) {
      throw 'Must specify an element to receive user input.';
    }
    if (!this.#options.contextMenu) {
      window.oncontextmenu = (e) => {
        e.preventDefault();
        return false;
      };
    }
    const T = this.#isTouch ? 10 : 0;
    const opts = {
      recognizerOptions: {
        pan: { threshold: T },
        pinch: { threshold: 0 }
      }
    };
    this.#eventsAgent = new EventManager(this.#element, opts);
    this.pointerInit();
  }
  get agent() {
    return this.#eventsAgent;
  }
  get pointer() {
    if (this.#pointer instanceof PointerAgent) return this.#pointer;
    this.#pointer = new PointerAgent(this);
    return this.#pointer;
  }
  get touch() {
    if (this.#touch instanceof TouchAgent) return this.#touch;
    this.#touch = new TouchAgent(this);
    return this.#touch;
  }
  get key() {
    if (this.#key instanceof KeyboardAgent) return this.#key;
    this.#key = new KeyboardAgent(this);
    return this.#key;
  }
  get status() {
    return this.#status;
  }
  get element() {
    return this.#element;
  }
  get isTouch() {
    return this.#isTouch;
  }
  get isPan() {
    return this.#isPan;
  }
  set wheeldelta(w) {
    this.#wheelDelta = w.delta;
  }
  get wheeldelta() {
    return this.#wheelDelta;
  }
  destroy() {
    for (let l of this.#listeners) {
      this.off(l.event, l.handler, l.options);
    }
    this.#eventsAgent.destroy();
    this.#pointer = undefined;
    this.#key = undefined;
    this.#touch = undefined;
  }
  isValid(event, handler) {
    return isString(event) || isFunction(handler) ? true : false;
  }
  validOptions(options) {
    return isObject(options) && isBoolean(options) ? options : undefined;
  }
  on(event, handler, options, once = false) {
    if (!this.isValid(event, handler)) return false;
    if (this.pointer.has(event))
      this.#pointer.on(event, handler, options, once);
    else if (this.touch.has(event))
      this.#touch.on(event, handler, options, once);
    else if (this.key.has(event)) this.#key.on(event, handler, options, once);
    else
      this.#element.addEventListener(
        event,
        handler,
        this.validOptions(options)
      );
    this.#listeners.push({ event, handler, options });
  }
  off(event, handler, options) {
    if (this.#pointer?.has(event)) this.#pointer.off(event, handler, options);
    else if (this.#touch?.has(event)) this.#touch.off(event, handler, options);
    else if (this.#key?.has(event)) this.#key.off(event, handler, options);
    else
      this.#element.removeEventListener(
        event,
        handler,
        this.validOptions(options)
      );
    for (let l of this.#listeners) {
      if (l.event === event && l.handler === handler && l.options === options) {
        let i = this.#listeners.indexOf(l);
        this.#listeners.splice(i, 1);
      }
    }
  }
  once(event, handler, options) {
    this.on(event, handler, options, true);
  }
  setCursor(type) {
    this.#element.style.cursor = type;
  }
  pointerInit() {
    this.clientPosPrev = new Point([null, null]);
    this.position = new Point([0, 0]);
    this.movement = new Point([0, 0]);
    this.dragstart = new Point([null, null]);
    this.dragend = new Point([null, null]);
    this.dragCheckThreshold = 3;
    this.dragStatus = false;
    this.wheeldelta = 0;
    this.pointerButtons = [false, false, false, false, false];
    this.pointerdrag = new Event('pointerdrag');
    this.pointerdragend = new Event('pointerdragend');
  }
  pointerEventData(e) {
    return {
      isProcessed: false,
      pointerType: e.pointerType,
      position: this.position.clone(),
      movement: this.movement.clone(),
      dragstart: this.dragstart.clone(),
      dragend: this.dragend.clone(),
      wheeldelta: this.wheeldelta,
      buttons: this.pointerButtons,
      domEvent: e,
      timeStamp: Date.now()
    };
  }
  motion(e) {
    let clientRect = { left: 0, top: 0 };
    try {
      clientRect = e.srcEvent.target?.getBoundingClientRect();
    } catch (err) {}
    const clientX = e.srcEvent.clientX || this.position.x;
    const clientY = e.srcEvent.clientY || this.position.y;
    this.movement.x = clientX - this.clientPosPrev.x;
    this.movement.y = clientY - this.clientPosPrev.y;
    this.position.x = clientX - clientRect.left;
    this.position.y = clientY - clientRect.top;
    this.clientPosPrev.x = clientX;
    this.clientPosPrev.y = clientY;
  }
  location(e) {
    let clientRect = { left: 0, top: 0 };
    try {
      clientRect = e.srcEvent.target?.getBoundingClientRect();
    } catch (err) {}
    this.clientPosPrev.x = e.srcEvent.clientX;
    this.clientPosPrev.y = e.srcEvent.clientY;
    this.position.x = e.srcEvent.clientX - clientRect.left;
    this.position.y = e.srcEvent.clientY - clientRect.top;
    this.movement.x = 0;
    this.movement.y = 0;
  }
  onPointerDown(e) {
    this.location(e);
    this.pointerButtons[e.srcEvent.button] = true;
  }
  onPointerUp(e) {
    this.location(e);
    this.pointerButtons[e.srcEvent.button] = false;
  }
  startPointerDrag(e) {
    this.#isPan = true;
    this.onPointerDown(e);
  }
  endPointerDrag(e) {
    this.#isPan = false;
  }
}

function getRandomIntBetween(min, max) {
  min = Math.ceil(min) + 1;
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function countDigits(value) {
  const digits = {};
  digits.value = value;
  digits.sign = !value ? false : true;
  digits.integers = numDigits(value);
  digits.decimals = precision(value);
  digits.total = digits.integers + digits.decimals;
  return digits;
}
function numDigits(value) {
  return (Math.log10((value ^ (value >> 31)) - (value >> 31)) | 0) + 1;
}
function bRound(n, d = 0) {
  var x = n * Math.pow(10, d);
  var r = Math.round(x);
  var br = (x > 0 ? x : -x) % 1 === 0.5 ? (0 === r % 2 ? r : r - 1) : r;
  return br / Math.pow(10, d);
}
function precision(value) {
  if (typeof value !== 'number') value = parseFloat(value);
  if (isNaN(value)) return 0;
  if (!isFinite(value)) return 0;
  var e = 1,
    p = 0;
  while (Math.round(value * e) / e !== value) {
    e *= 10;
    if (e === Infinity) break;
    p++;
  }
  return p;
}
function limitPrecision(value, precision) {
  if (value == 0) return '0';
  const digits = countDigits(value);
  if (isInteger(precision))
    return `${new Number(digits.value).toFixed(precision)}`;
  let { sign: s, integers: i, decimals: d, value: v } = digits;
  precision = isNaN(precision) ? MAX_CRYPTO_PRECISION : precision;
  d = limit(d, 0, precision);
  v = new Number(v).toFixed(d);
  let x = `${v}`,
    r = '',
    c = 0,
    f = 0;
  s = s ? 0 : 1;
  if (s > 0) {
    r += '-';
    c++;
  }
  if (i == 0) {
    r += '0';
    c++;
  } else {
    r += x.slice(c, i);
    c += i;
  }
  if (d != 0) {
    r += `${x.slice(c)}`;
    if (i <= 1) {
      f = d;
    } else if (i > 3) {
      f = 2;
    } else if (i >= 2) {
      f = 3;
    }
  }
  r = Number.parseFloat(r).toFixed(f);
  return r;
}
function log10(value) {
  return Math.log(value) / Math.log(10);
}
function limit(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

let _hasOwnProperty = Object.prototype.hasOwnProperty;
function _get(obj, path, defaultValue = undefined) {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}
function _set(obj, path, value) {
  if (path.length === 0) {
    return undefined;
  }
  let res = obj;
  let last = path[path.length - 1];
  if (path.length === 1) {
    if (isObject(res)) {
      return (res[last] = value);
    }
    return undefined;
  }
  for (let i = 0; i < path.length - 1; i++) {
    let key = path[i];
    if (!_hasOwnProperty.call(res, key) || !isObject(res[key])) {
      res[key] = {};
    }
    res = res[key];
  }
  return (res[last] = value);
}
function getPrototypeAt(level, obj) {
  let proto = Object.getPrototypeOf(obj);
  while (level--) proto = Object.getPrototypeOf(proto);
  return proto;
}
function mergeDeep(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return source;
  }
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (isArray(targetValue) && isArray(sourceValue)) {
      target[key] = mergeDeep(targetValue.concat([]), sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
}
function copyDeep(obj, clone = true) {
  if (obj === null || typeof obj !== 'object' || 'isActiveClone' in obj)
    return obj;
  let temp;
  if (obj instanceof Date) temp = new obj.constructor();
  else temp = isArray(obj) ? [] : {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj['isActiveClone'] = null;
      temp[key] = copyDeep(obj[key], false);
      delete obj['isActiveClone'];
    }
  }
  return temp;
}
function doStructuredClone(obj) {
  try {
    return structuredClone(obj);
  } catch (e) {
    return copyDeep(obj, false);
  }
}
function objToString(obj, ndeep) {
  if (obj == null) {
    return String(obj);
  }
  switch (typeof obj) {
    case 'string':
      return '"' + obj + '"';
    case 'function':
      return obj.toString();
    case 'object':
      let indent = Array(ndeep || 1).join('\t'),
        isArray = Array.isArray(obj);
      return (
        '{['[+isArray] +
        Object.keys(obj)
          .map(function (key) {
            return (
              '\n\t' +
              indent +
              key +
              ': ' +
              objToString(obj[key], (ndeep || 1) + 1)
            );
          })
          .join(',') +
        '\n' +
        indent +
        '}]'[+isArray]
      );
    default:
      return obj.toString();
  }
}
function objRecurse(obj, propExec) {
  if (!isObject(obj)) return;
  for (let k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      objRecurse(obj[k], propExec);
    } else if (obj.hasOwnProperty(k)) {
      propExec(k, obj[k]);
    }
  }
}
const findInObjectById = (obj, id, updateFn) => {
  if (obj['Id'] === id) {
    return updateFn(obj);
  } else {
    for (let propertyName in obj) {
      if (obj[propertyName] !== null && typeof obj[propertyName] === 'object') {
        obj[propertyName] = findInObjectById(obj[propertyName], id, updateFn);
      }
    }
  }
  return obj;
};
function objRecurseUpdate(path, obj) {
  path.split('.');
}
function setProperty(obj, path, value) {
  const [head, ...rest] = path.split('.');
  return {
    ...obj,
    [head]: rest.length ? setProperty(obj[head], rest.join('.'), value) : value
  };
}
function getProperty(obj, path) {
  const keys = path.split('.');
  return keys.reduce(
    (o, key) => (o && o[key] !== 'undefined' ? o[key] : undefined),
    obj
  );
}
class DoubleLinkedList {
  constructor() {
    this.nodes = [];
  }
  get size() {
    return this.nodes.length;
  }
  get head() {
    return this.size ? this.nodes[0] : null;
  }
  get tail() {
    return this.size ? this.nodes[this.size - 1] : null;
  }
  insertAt(index, value) {
    const previousNode = this.nodes[index - 1] || null;
    const nextNode = this.nodes[index] || null;
    const node = { value, next: nextNode, previous: previousNode };
    if (previousNode) previousNode.next = node;
    if (nextNode) nextNode.previous = node;
    this.nodes.splice(index, 0, node);
  }
  insertFirst(value) {
    this.insertAt(0, value);
  }
  insertLast(value) {
    this.insertAt(this.size, value);
  }
  getAt(index) {
    return this.nodes[index];
  }
  removeAt(index) {
    const previousNode = this.nodes[index - 1] || null;
    const nextNode = this.nodes[index + 1] || null;
    if (previousNode) previousNode.next = nextNode;
    if (nextNode) nextNode.previous = previousNode;
    return this.nodes.splice(index, 1);
  }
  clear() {
    this.nodes = [];
  }
  reverse() {
    this.nodes = this.nodes.reduce((acc, { value }) => {
      const nextNode = acc[0] || null;
      const node = { value, next: nextNode, previous: null };
      if (nextNode) nextNode.previous = node;
      return [node, ...acc];
    }, []);
  }
  *[Symbol.iterator]() {
    yield* this.nodes;
  }
}
function isArrayEqual(a1, a2) {
  if (!isArray(a1) || !isArray(a2)) return false;
  if (a1.length !== a2.length) return false;
  let i = a1.length;
  while (i--) {
    if (isArray(a1[i]) || isArray(a2[i])) {
      if (!isArrayEqual(a1[i], a2[i])) return false;
      continue;
    }
    if (isObject(a1[i]) || isObject(a1[i])) {
      if (!isObject(a1[i], a2[i])) return false;
      continue;
    }
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}
function nearestArrayValue(x, array) {
  let minDist = Infinity;
  let minDistIndex = -1;
  let minValue = null;
  let i = 0;
  while (i++ < array.length) {
    let xi = array[i];
    let diff = Math.abs(xi - x);
    if (diff < minDist) {
      minDist = diff;
      minDistIndex = i;
      minValue = xi;
    }
  }
  return [minDistIndex, minValue];
}
function arrayMove(arr, fromIndex, toIndex) {
  let element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}
function swapArrayElements(myArray, index1, index2) {
  [myArray[index1], myArray[index2]] = [myArray[index2], myArray[index1]];
}
function valuesInArray(values, arr) {
  if (!isArray(arr)) return false;
  if (!isArray(values)) return arr.includes(values);
  return values.every((value) => {
    return arr.includes(value);
  });
}
const unique = (a) => [...new Set(a)];
const uniqueBy = (x, f) =>
  Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}));
const intersection = (a, b) => a.filter((v) => b.includes(v));
const diff = (a, b) => a.filter((v) => !b.includes(v));
const symDiff = (a, b) => diff(a, b).concat(diff(b, a));
const union = (a, b) => diff(a, b).concat(b);
function isObjectAndEmpty(obj) {
  if (!isObject(obj)) return false;
  if (Object.keys.length) return false;
  return true;
}
function isObjectNotEmpty(obj) {
  if (!isObject(obj)) return false;
  if (!Object.keys(obj).length) return false;
  else return true;
}
function isObjectEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) return false;
  const obj1Keys = Object.keys(obj1).sort();
  const obj2Keys = Object.keys(obj2).sort();
  if (obj1Keys.length !== obj2Keys.length) return false;
  else {
    const areEqual = obj1Keys.every((key, index) => {
      const val1 = obj1[key];
      const val2 = obj2[obj2Keys[index]];
      if (isArray(val1) || isArray(val2)) return isArrayEqual(val1, val2);
      if (isObject(val1) || isObject(val2)) return isObjectEqual(val1, val2);
      return val1 === val2;
    });
    return areEqual;
  }
}
function uid(tag = 'ID') {
  if (isNumber(tag)) tag = tag.toString();
  else if (!isString(tag)) tag = 'ID';
  tag = idSanitize(tag);
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2, 5);
  return `${tag}_${dateString}_${randomness}`;
}
function idSanitize(tag) {
  return String(tag).replace(/ |,|;|:|\.|#/g, '_');
}
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;
  let byteCharacters = atob(b64Data);
  let byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);
    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  let blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: [...value.entries()]
    };
  } else {
    return value;
  }
}
function reviver(key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}
const firstEntryInMap = (map) => map.entries().next().value;
const firstKeyInMap = (map) => map.entries().next().value[0];
const firstValueInMap = (map) => map.entries().next().value[1];
const lastEntryInMap = (map) => [...map].pop();
const lastKeyInMap = (map) => [...map.keys()].pop();
const lastValueInMap = (map) => [...map.values()].pop();
class xMap extends Map {
  constructor(x) {
    super(x);
  }
  indexOfKey(key) {
    return [...this.keys()].indexOf(key);
  }
  indexOfValue(value) {
    return [...this.values()].indexOf(value);
  }
  entryAtIndex(index) {
    return [...this.entries()][index];
  }
  keyAtIndex(index) {
    return [...this.keys()][index];
  }
  valueAtIndex(index) {
    return [...this.values()][index];
  }
  insert(key, value, index) {
    return this.insertIndex(index, key, value);
  }
  remove(index) {
    return this.removeIndex(index);
  }
  firstEntry() {
    return firstEntryInMap(this);
  }
  firstKey() {
    return firstKeyInMap(this);
  }
  firstValue() {
    return firstValueInMap(this);
  }
  lastEntry() {
    return lastEntryInMap(this);
  }
  lastKey() {
    return lastKeyInMap(this);
  }
  lastValue() {
    return lastValueInMap(this);
  }
  prevCurrNext(key) {
    let prev = (curr = next = null);
    for (let keyVal of this) {
      prev = curr;
      curr = keyVal;
      if (keyVal.key == key) break;
    }
    return { prev, curr, next };
  }
  union(...iterables) {
    if (typeof super.prototype.union === 'function') super.union(...iterables);
    else {
      for (const iterable of iterables) {
        for (const item of iterable) {
          this.set(...item);
        }
      }
    }
  }
  setMultiple(array) {
    if (!isArray(array)) return false;
    array.forEach(([k, v]) => this.set(k, v));
    return true;
  }
  populate(array) {
    if (!isArray(array)) return false;
    this.clear();
    array.forEach(([k, v]) => this.set(k, v));
    return true;
  }
  insertIndex(index, key, value) {
    if (!isNumber(index)) return false;
    const arr = [...this];
    arr.splice(index, 0, [key, value]);
    this.populate(arr);
    return true;
  }
  removeIndex(index) {
    if (!isNumber(index)) return false;
    const arr = [...this];
    arr.splice(index, 1);
    this.populate(arr);
    return true;
  }
  swapIndices(index1, index2) {
    if (!isNumber(index1) || !isNumber(index2)) return false;
    const arr = [...this];
    swapArrayElements(arr, index1, index2);
    this.populate(arr);
    return true;
  }
  swapKeys(key1, key2) {
    const arr = [...this],
      indexA = arr.findIndex(([v]) => v === key1),
      indexB = arr.findIndex(([v]) => v === key2);
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
    this.clear();
    arr.forEach(([k, v]) => this.set(k, v));
    return true;
  }
}
function debounce(fn, wait = 100, scope, immediate = false) {
  let timeout;
  return function () {
    let context = scope || this;
    let args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) fn.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  };
}
function throttle(fn, threshold = 250, scope) {
  let last, deferTimer;
  let core = function () {
    let context = scope || this;
    let now = new Date(),
      args = arguments;
    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshold);
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
  core.reset = function () {
    cancelTimer();
    last = 0;
  };
  return core;
}
const extender = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this, new mixin());
      });
    }
  }
  let copyProps = (target, source) => {
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (
          !prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(
            target,
            prop,
            Object.getOwnPropertyDescriptor(source, prop)
          );
      });
  };
  mixins.forEach((mixin) => {
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};
function promiseState(p) {
  const t = {};
  return Promise.race([p, t]).then(
    (v) => (v === t ? 'pending' : 'fulfilled'),
    () => 'rejected'
  );
}
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
function str2ab(str) {
  let buf = new ArrayBuffer(str.length * 2);
  let bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
function encodePNGDataStore(src) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let buffer;
  if (src.isView(src)) buffer = src;
  else if (typeof src === 'string') buffer = str2ab(src);
  const imgData = new Uint8ClampedArray.from(buffer);
  const len = imgData.length;
  canvas.height = 1;
  canvas.width = len;
  ctx.putImageData(imgData);
  const dataURL = ctx.toDataURL();
  const base64 = getBase64StringFromDataURL(dataURL);
  return { dataURL, base64 };
}
function decodePNGDataStore(src, cb, type = 'string') {
  const img = new Image();
  const ctx = document.createElement('canvas').getContext('2d');
  img.src = src;
  return img.decode().then(() => {
    ctx.width = img.width;
    ctx.height = img.height;
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, img.width, img.height).data;
    const result = type === 'string' ? ab2str(data) : data;
    cb(result);
  });
}
class EventHandlers {
  static #entries = new xMap();
  static get entries() {
    return EventHandlers.#entries;
  }
  static isValid(ctx, el, evt, fn) {
    return (
      !isObject(ctx) || !isHTMLElement(el) || !isString(evt) || !isFunction(fn)
    );
  }
  static add(ctx, el, evt, fn) {
    if (!this.isValid(ctx, el, evt, fn)) return false;
    el.addEventListener(evt, fn);
    if (!EventHandlers.#entries.has(ctx))
      EventHandlers.#entries.set(ctx, new xMap());
    const entry = EventHandlers.#entries.get(ctx);
    if (!entry.has(el)) entry.set(el, {});
    const elm = entry.get(el);
    if (!isArray(elm[evt])) elm[evt] = [];
    elm[evt].push(fn);
    return true;
  }
  static remove(ctx, el, evt, fn) {
    if (
      !EventHandlers.isValid(ctx, el, evt, fn) ||
      !EventHandlers.#entries.has(ctx)
    )
      return false;
    const entry = EventHandlers.#entries.get(ctx);
    if (!entry.has(el)) return false;
    const elm = entry.get(el);
    if (!(evt in elm)) return false;
    const i = elm[evt].indexOf(fn);
    if (i < 0) return false;
    elm[evt].splice(i, 1);
    if (elm[evt].length == 0) delete elm[evt];
    if (Object.keys(elm).length == 0) entry.delete(el);
    if (entry.size == 0) EventHandlers.#entries.delete(ctx);
    return true;
  }
  static expungeEvent(ctx, el, evt) {
    if (!isObject(ctx) || !isHTMLElement(el) || !isString(evt)) return false;
    const entry = EventHandlers.#entries.get(ctx);
    if (!entry.has(el)) return false;
    const elm = entry.get(el);
    if (evt in elm) {
      for (let fn of elm[evt]) {
        el.removeEventListener(evt, fn);
      }
      delete elm[evt];
    }
    return true;
  }
  static expungeElement(ctx, el) {
    if (!isObject(ctx) || !isHTMLElement(el)) return false;
    const entry = EventHandlers.#entries.get(ctx);
    if (entry.has(el)) {
      let elm = entry.get(el);
      for (let evt in elm) {
        EventHandlers.expungeEvent(ctx, el, evt);
      }
      entry.delete(el);
    }
    return true;
  }
  static expungeContext(ctx) {
    if (!isObject(ctx)) return false;
    if (EventHandlers.#entries.has(ctx)) {
      const entry = EventHandlers.#entries.get(ctx);
      for (let el of entry) {
        EventHandlers.expungeElement(ctx, el);
      }
      EventHandlers.#entries.delete(ctx);
    }
    return true;
  }
  static expungeAll() {}
  static destroy() {
    for (let ctx of EventHandlers.#entries) {
      EventHandlers.expungeContext(ctx);
    }
    EventHandlers.#entries = undefined;
    return true;
  }
}
async function HMAC(key, message) {
  const g = (str) =>
      new Uint8Array(
        [...decodeURIComponent(encodeURIComponent(str))].map((c) =>
          c.charCodeAt(0)
        )
      ),
    k = g(key),
    m = g(message),
    c = await crypto.subtle.importKey(
      'raw',
      k,
      { name: 'HMAC', hash: 'SHA-256' },
      true,
      ['sign']
    ),
    s = await crypto.subtle.sign('HMAC', c, m);
  return btoa(String.fromCharCode(...new Uint8Array(s)));
}
async function H$1(m) {
  const msgUint8 = new TextEncoder().encode(m);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}
function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (
    (h2 >>> 0).toString(16).padStart(8, 0) +
    (h1 >>> 0).toString(16).padStart(8, 0)
  );
}

var utilities = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  DoubleLinkedList: DoubleLinkedList,
  EventHandlers: EventHandlers,
  H: H$1,
  HMAC: HMAC,
  _get: _get,
  _set: _set,
  ab2str: ab2str,
  arrayMove: arrayMove,
  b64toBlob: b64toBlob,
  copyDeep: copyDeep,
  cyrb53: cyrb53,
  debounce: debounce,
  decodePNGDataStore: decodePNGDataStore,
  diff: diff,
  doStructuredClone: doStructuredClone,
  encodePNGDataStore: encodePNGDataStore,
  extender: extender,
  findInObjectById: findInObjectById,
  firstEntryInMap: firstEntryInMap,
  firstKeyInMap: firstKeyInMap,
  firstValueInMap: firstValueInMap,
  getProperty: getProperty,
  getPrototypeAt: getPrototypeAt,
  idSanitize: idSanitize,
  intersection: intersection,
  isArrayEqual: isArrayEqual,
  isObjectAndEmpty: isObjectAndEmpty,
  isObjectEqual: isObjectEqual,
  isObjectNotEmpty: isObjectNotEmpty,
  lastEntryInMap: lastEntryInMap,
  lastKeyInMap: lastKeyInMap,
  lastValueInMap: lastValueInMap,
  mergeDeep: mergeDeep,
  nearestArrayValue: nearestArrayValue,
  objRecurse: objRecurse,
  objRecurseUpdate: objRecurseUpdate,
  objToString: objToString,
  promiseState: promiseState,
  replacer: replacer,
  reviver: reviver,
  setProperty: setProperty,
  str2ab: str2ab,
  swapArrayElements: swapArrayElements,
  symDiff: symDiff,
  throttle: throttle,
  uid: uid,
  union: union,
  unique: unique,
  uniqueBy: uniqueBy,
  valuesInArray: valuesInArray,
  xMap: xMap
});

class Range {
  #id;
  #core;
  #state;
  #worker;
  #init;
  #indexed;
  #interval;
  #intervalStr;
  #initialCnt;
  #limitFuture;
  #limitPast;
  #minCandles;
  #maxCandles;
  #yAxisBounds;
  constructor(start, end, config) {
    this.#init = true;
    this.#indexed = false;
    this.#interval = DEFAULT_TIMEFRAMEMS;
    this.#intervalStr = DEFAULT_TIMEFRAME;
    this.indexStart = 0;
    this.indexEnd = LIMITFUTURE;
    this.valueMin = 0;
    this.valueMax = 1;
    this.valueDiff = 1;
    this.volumeMin = 0;
    this.volumeMax = 0;
    this.volumeDiff = 0;
    this.valueMinIdx = 0;
    this.valueMaxIdx = 0;
    this.volumeMinIdx = 0;
    this.volumeMaxIdx = 0;
    this.secondaryMaxMin = {};
    this.old = {};
    this.#initialCnt = INTITIALCNT;
    this.#limitFuture = LIMITFUTURE;
    this.#limitPast = LIMITPAST;
    this.#minCandles = MINCANDLES;
    this.#maxCandles = MAXCANDLES;
    this.#yAxisBounds = YAXIS_BOUNDS;
    if (!isObject(config) || !(config?.core instanceof TradeXchart))
      throw new Error(`Range requires a config`);
    this.#id = uid(`${SHORTNAME}_Range`);
    this.#init = true;
    this.setConfig(config);
    if (!isInteger(start) || this.isPastLimit(start))
      start = this.data.length - this.#initialCnt;
    if (!isInteger(end) || this.isFutureLimit(end)) end = this.data.length;
    if (end - start > this.#maxCandles)
      end = end - (end - start - this.#maxCandles);
    `
    (input) => {
      return maxMinPriceVol(input)
    }
    function ${this.maxMinPriceVol.toString()}
  `;
    const tf = config?.interval || DEFAULT_TIMEFRAMEMS;
    if (this.data.length == 0) {
      let ts = Date.now();
      start = this.rangeLimit * -2;
      end = this.rangeLimit * 2;
      this.#interval = tf;
      this.#intervalStr = ms2Interval(this.#interval);
      this.anchor = ts - (ts % tf);
    } else if (this.data.length < 2) {
      this.#interval = tf;
      this.#intervalStr = ms2Interval(this.interval);
    } else {
      this.#interval = detectInterval(this.data);
      this.#intervalStr = ms2Interval(this.interval);
    }
    if (end == 0 && this.data.length >= this.rangeLimit) end = this.rangeLimit;
    else if (end == 0) end = this.data.length;
    this.set(start, end);
  }
  get id() {
    return this.#id;
  }
  get allData() {
    return this.#state.allData;
  }
  get data() {
    return this.allData?.data || [];
  }
  get dataLength() {
    return !!this.allData?.data.length ? this.allData.data.length - 1 : 0;
  }
  get Length() {
    return this.indexEnd - this.indexStart;
  }
  get timeDuration() {
    return this.timeFinish - this.timeStart;
  }
  get timeMin() {
    return this.value(this.indexStart)[0];
  }
  get timeMax() {
    return this.value(this.indexEnd)[0];
  }
  get rangeDuration() {
    return this.timeMax - this.timeMin;
  }
  get timeStart() {
    return this.value(0)[0];
  }
  get timeFinish() {
    return this.value(this.dataLength)[0];
  }
  set interval(i) {
    this.#interval = i;
  }
  get interval() {
    return this.#interval;
  }
  set intervalStr(i) {
    this.#intervalStr = i;
  }
  get intervalStr() {
    return this.#intervalStr;
  }
  get timeFrame() {
    return this.#intervalStr;
  }
  get timeFrameMS() {
    return this.#interval;
  }
  get indexed() {
    return this.#indexed;
  }
  get indexPastLimit() {
    return this.limitPast * -1;
  }
  get indexFutureLimit() {
    return this.dataLength + this.limitFuture - 1;
  }
  set initialCnt(c) {
    if (isInteger(c)) this.#initialCnt = c;
  }
  get initialCnt() {
    return this.#initialCnt;
  }
  get limitFuture() {
    return this.#limitFuture;
  }
  get limitPast() {
    return this.#limitPast;
  }
  get minCandles() {
    return this.#minCandles;
  }
  get maxCandles() {
    return this.#maxCandles;
  }
  get yAxisBounds() {
    return this.#yAxisBounds;
  }
  get rangeLimit() {
    return this.#limitFuture;
  }
  get diff() {
    return this?.valueDiff;
  }
  end() {}
  isFutureLimit(idx = this.indexEnd) {
    if (!isInteger(idx)) return;
    return idx > this.indexFutureLimit;
  }
  isPastLimit(idx = this.indexStart) {
    if (!isInteger(idx)) return;
    return idx < this.indexPastLimit;
  }
  set(start = 0, end = this.dataLength, max = this.maxCandles) {
    if (!isInteger(start) || !isInteger(end) || !isInteger(max)) return false;
    start = start | 0;
    end = end | 0;
    max = max | 0;
    max = limit(max, this.minCandles, this.maxCandles);
    if (start > end) [start, end] = [end, start];
    end = limit(end, start + this.minCandles, start + max);
    let len = end - start;
    start = limit(
      start,
      this.limitPast * -1,
      this.dataLength + this.limitFuture - this.minCandles - 1
    );
    end = limit(
      end,
      start + this.minCandles,
      this.dataLength + this.limitFuture - 1
    );
    start = end - start < len ? start - (len - (end - start)) : start;
    const newStart = start;
    const newEnd = end;
    const oldStart = this.indexStart;
    const oldEnd = this.indexEnd;
    let inOut = this.Length;
    this.indexStart = start;
    this.indexEnd = end;
    inOut -= this.Length;
    this.setMaxCandles(max);
    this.setAllMaxMin();
    this.#core.emit('range_set', [newStart, newEnd, oldStart, oldEnd]);
    return true;
  }
  setConfig(config) {
    let state = config?.state;
    this.#state = state;
    let core = config?.core;
    if (!(core instanceof TradeXchart))
      throw new Error(`Range requires a valid TradeXchart instance`);
    this.#core = core;
    let initialCnt = isInteger(config?.initialCnt)
      ? config.initialCnt
      : INTITIALCNT;
    this.#initialCnt = this.#core.config?.range?.initialCnt || initialCnt;
    this.#limitFuture = isInteger(config?.limitFuture)
      ? config.limitFuture
      : LIMITFUTURE;
    this.#limitPast = isInteger(config?.limitPast)
      ? config.limitPast
      : LIMITPAST;
    this.#yAxisBounds = isNumber(config?.yAxisBounds)
      ? config.yAxisBounds
      : YAXIS_BOUNDS;
    this.#minCandles = isInteger(config?.minCandles)
      ? config.minCandles
      : MINCANDLES;
    this.setMaxCandles(config?.maxCandles);
  }
  setMaxCandles(max) {
    let maxCandles =
      this.#core?.MainPane?.graph?.width ||
      Math.floor(this.#core?.parentElement?.clientWidth) ||
      MAXCANDLES;
    this.#maxCandles = isInteger(max) ? max : maxCandles;
  }
  setMaxMin(maxMin) {
    for (let m in maxMin) {
      this.old[m] = this[m];
      this[m] = maxMin[m];
    }
    this.scale = this.dataLength != 0 ? this.Length / this.dataLength : 1;
  }
  value(index, id = 'chart') {
    let data;
    if (id == 'chart') data = this.data;
    else {
      data = this.getDataById(id);
      if (!data) return null;
    }
    if (!isInteger(index)) index = data.length - 1;
    let v = data[index];
    if (v !== undefined) return v;
    else {
      const len = data.length - 1;
      v = [null, null, null, null, null, null];
      if (data.length < 1) {
        v[0] = Date.now() + this.interval * index;
        return v;
      } else if (index < 0) {
        v[0] = data[0][0] + this.interval * index;
        return v;
      } else if (index > len) {
        v[0] = data[len][0] + this.interval * (index - len);
        return v;
      } else return null;
    }
  }
  valueByTS(ts, id = '') {
    if (!isInteger(ts) || !isString(id)) return false;
    const idx = this.getTimeIndex(ts);
    let value;
    switch (id) {
      case 'chart':
        break;
      case 'primary':
        break;
      case 'secondary':
        break;
      case 'dataset':
        break;
      case 'all':
        break;
      default:
        if (id.length === 0) value = this.value(idx);
        else {
          id.split('_');
        }
        break;
    }
    return value;
  }
  getDataById(id = 'chart') {
    if (!isString(id)) return false;
    if (id == 'chart') return this.data;
    const datas = [
      this.allData.primaryPane,
      this.allData.secondaryPane,
      this.allData.datasets
    ];
    for (let data of datas) {
      for (let entry of data) {
        if (id == entry?.id) return entry.data;
      }
    }
    return false;
  }
  getTimeIndex(ts) {
    if (!isInteger(ts)) return false;
    ts = ts - (ts % this.interval);
    let x = this.data.length > 0 ? this.data[0][0] : this.anchor;
    if (ts === x) return 0;
    else if (ts < x) return ((x - ts) / this.interval) * -1;
    else return (ts - x) / this.interval;
  }
  inRange(t) {
    return t >= this.timeMin && t <= this.timeMax ? true : false;
  }
  inPriceHistory(t) {
    return t >= this.timeStart && t <= this.timeFinish ? true : false;
  }
  inRenderRange(t) {
    let i = this.getTimeIndex(t);
    let o = this.#core.rangeScrollOffset;
    return i >= this.indexStart - o && i <= this.indexEnd + o ? true : false;
  }
  rangeIndex(ts) {
    return this.getTimeIndex(ts) - this.indexStart;
  }
  setAllMaxMin() {
    let maxMin = this.maxMinPriceVol({
      data: this.data,
      start: this.indexStart,
      end: this.indexEnd,
      that: this
    });
    this.setMaxMin(maxMin);
    this.maxMinDatasets();
  }
  maxMinPriceVol(input) {
    let { data, start, end, that } = { ...input };
    let buffer = bRound(this.#core.bufferPx / this.#core.candleW);
    let l = data?.length - 1;
    buffer = isInteger(buffer) ? buffer : 0;
    start = isInteger(start) ? start - buffer : 0;
    start = start > 0 ? start : 0;
    end = isInteger(end) ? end : l;
    if (l < 0) {
      return {
        valueLo: 0,
        valueHi: 1,
        valueMin: 0,
        valueMax: 1,
        volumeMin: 0,
        volumeMax: 0,
        valueMinIdx: 0,
        valueMaxIdx: 0,
        volumeMinIdx: 0,
        volumeMaxIdx: 0
      };
    }
    let i = limit(start, 0, l);
    let c = limit(end, 0, l);
    let valueMin = data[i][3];
    let valueMax = data[i][2];
    let volumeMin = data[i][5];
    let volumeMax = data[i][5];
    let valueMinIdx = i;
    let valueMaxIdx = i;
    let volumeMinIdx = i;
    let volumeMaxIdx = i;
    while (i++ < c) {
      if (data[i][3] < valueMin) {
        valueMin = data[i][3];
        valueMinIdx = i;
      }
      if (data[i][2] > valueMax) {
        valueMax = data[i][2];
        valueMaxIdx = i;
      }
      if (data[i][5] < volumeMin) {
        volumeMin = data[i][5];
        volumeMinIdx = i;
      }
      if (data[i][5] > volumeMax) {
        volumeMax = data[i][5];
        volumeMaxIdx = i;
      }
    }
    let diff = valueMax - valueMin;
    let valueLo = valueMin;
    let valueHi = valueMax;
    valueMin -= diff * that.yAxisBounds;
    valueMin = valueMin > 0 ? valueMin : 0;
    valueMax += diff * that.yAxisBounds;
    diff = valueMax - valueMin;
    return {
      valueLo,
      valueHi,
      valueMin,
      valueMax,
      valueDiff: valueMax - valueMin,
      volumeMin,
      volumeMax,
      volumeDiff: volumeMax - volumeMin,
      valueMinIdx,
      valueMaxIdx,
      volumeMinIdx,
      volumeMaxIdx
    };
    function limit(val, min, max) {
      return Math.min(max, Math.max(min, val));
    }
  }
  maxMinDatasets() {
    if (!this.allData?.secondaryPane?.length) return;
    let old = Object.keys(this.secondaryMaxMin) || [];
    for (let p of this.allData.secondaryPane) {
      let index = old.indexOf(p.id);
      let input = {
        data: p.data,
        start: this.indexStart,
        end: this.indexEnd,
        that: this
      };
      this.secondaryMaxMin[p.id] = this.maxMinData(input);
      if (index !== -1) {
        old.splice(index, 1);
      }
    }
    for (let del of old) {
      delete this.secondaryMaxMin[del];
    }
  }
  maxMinData(input) {
    let { data, start, end, that } = { ...input };
    let buffer = bRound(this.#core.bufferPx / this.#core.candleW);
    let l = data.length - 1;
    let x = this.dataLength - data.length;
    let f = data[0]?.length - 1 || 0;
    const r = {};
    const d = {
      min: 0,
      max: 1,
      minIdx: 0,
      maxIdx: 0,
      diff: 1
    };
    if (l < 1) return { data: d };
    for (let g = f; g > 0; g--) {
      r[`data${g}`] = d;
    }
    buffer = isInteger(buffer) ? buffer : 0;
    start = isInteger(start) ? start - buffer : 0;
    start = start > 0 ? start - x : 0;
    end = isInteger(end) ? end - x : l;
    if (l < 0 || data[0].length == 0) return r;
    let i = limit(start, 0, l);
    let c = limit(end, 0, l);
    let j, v, min, max, diff, tMin, tMax;
    for (let d in r) {
      max = data[i][f];
      min = data[i][f];
      j = i;
      while (j++ < c) {
        v = data[j][f];
        if (v <= min) {
          r[d].min = v;
          r[d].minIdx = j;
          min = v;
        }
        if (v >= max) {
          r[d].max = v;
          r[d].maxIdx = j;
          max = v;
        }
      }
      if (tMin === undefined || min < tMin) tMin = min;
      if (tMax === undefined || max > tMax) tMax = max;
      diff = r[d].max - r[d].min;
      r[d].diff = !isNaN(diff) ? diff : 0;
      --f;
    }
    r.data = {
      min: tMin,
      max: tMax,
      diff: tMax - tMin
    };
    return r;
  }
  snapshot(start, end) {
    let data = this.export();
    data.snapshot = true;
    data.ts = Date.now();
    data.data = this.data;
    data.dataLength = this.dataLength;
    data.Length = this.Length;
    return data;
  }
  export(exclude) {
    let data = {};
    exclude = isArray(exclude) ? exclude : [];
    for (let c of copy) {
      if (!exclude.includes(c)) data[c] = this[c];
    }
    return data;
  }
}
function detectInterval(ohlcv) {
  if (!isArray(ohlcv) || ohlcv.length < 2) return Infinity;
  let len = Math.min(ohlcv.length - 1, 99);
  let min = Infinity;
  ohlcv.slice(0, len).forEach((x, i) => {
    let d = ohlcv[i + 1][0] - x[0];
    if (d === d && d < min) min = d;
  });
  return min;
}
const copy = [
  'indexEnd',
  'indexStart',
  'scale',
  'secondaryMaxMin',
  'valueDiff',
  'valueHi',
  'valueLo',
  'valueMax',
  'valueMaxIdx',
  'valueMin',
  'valueMinIdx',
  'volumeDiff',
  'volumeMax',
  'volumeMaxIdx',
  'volumeMin',
  'volumeMinIdx',
  'diff',
  'indexFutureLimit',
  'id',
  'indexed',
  'initialCnt',
  'interval',
  'intervalStr',
  'limitFuture',
  'limitPast',
  'maxCandles',
  'minCandles',
  'indexPastLimit',
  'rangeDuration',
  'rangeLimit',
  'timeDuration',
  'timeFinish',
  'timeFrame',
  'timeFrameMS',
  'timeMax',
  'timeMin',
  'timeStart',
  'yAxisBounds'
];

const TIMEUNITS = ['y', 'M', 'd', 'h', 'm', 's', 'ms'];
const TIMEUNITSLONG = [
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds'
];
const dayCntInc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const dayCntLeapInc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
const monthDayCnt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTHMAP = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const BTCGENESIS = 1231006505000;
const MILLISECOND = 1;
const SECOND_MS = 1000;
const MINUTE_MS = SECOND_MS * 60;
const HOUR_MS = MINUTE_MS * 60;
const DAY_MS = HOUR_MS * 24;
const WEEK_MS = DAY_MS * 7;
const MONTHR_MS = DAY_MS * 30;
function MONTH_MS(m = 3, l = false) {
  let ms = monthDayCnt[m % 12] * DAY_MS;
  if (l && m > 0) ms += DAY_MS;
  return ms;
}
const YEAR_MS = DAY_MS * 365;
const TIMEUNITSVALUESSHORT = {
  y: YEAR_MS,
  M: MONTHR_MS,
  w: WEEK_MS,
  d: DAY_MS,
  h: HOUR_MS,
  m: MINUTE_MS,
  s: SECOND_MS,
  u: MILLISECOND
};
const TIMEUNITSVALUESLONG = {
  years: YEAR_MS,
  months: MONTHR_MS,
  weeks: WEEK_MS,
  days: DAY_MS,
  hours: HOUR_MS,
  minutes: MINUTE_MS,
  seconds: SECOND_MS,
  milliseconds: MILLISECOND
};
const TIMEUNITSVALUES = { ...TIMEUNITSVALUESSHORT, ...TIMEUNITSVALUESLONG };
const TIMESCALESVALUES = {
  YEARS10: [YEAR_MS * 10, 'years'],
  YEARS5: [YEAR_MS * 5, 'years'],
  YEARS3: [YEAR_MS * 3, 'years'],
  YEARS2: [YEAR_MS * 2, 'years'],
  YEARS: [YEAR_MS, 'years'],
  MONTH6: [MONTHR_MS * 6, 'months'],
  MONTH4: [MONTHR_MS * 4, 'months'],
  MONTH3: [MONTHR_MS * 3, 'months'],
  MONTH2: [MONTHR_MS * 2, 'months'],
  MONTH: [MONTHR_MS, 'months'],
  DAY15: [DAY_MS * 15, 'years'],
  DAY10: [DAY_MS * 10, 'days'],
  DAY7: [DAY_MS * 7, 'days'],
  DAY5: [DAY_MS * 5, 'days'],
  DAY3: [DAY_MS * 3, 'days'],
  DAY2: [DAY_MS * 2, 'days'],
  DAY: [DAY_MS, 'days'],
  HOUR12: [HOUR_MS * 12, 'hours'],
  HOUR6: [HOUR_MS * 6, 'hours'],
  HOUR4: [HOUR_MS * 4, 'hours'],
  HOUR2: [HOUR_MS * 2, 'hours'],
  HOUR: [HOUR_MS, 'hours'],
  MINUTE30: [MINUTE_MS * 30, 'minutes'],
  MINUTE15: [MINUTE_MS * 15, 'minutes'],
  MINUTE10: [MINUTE_MS * 10, 'minutes'],
  MINUTE5: [MINUTE_MS * 5, 'minutes'],
  MINUTE2: [MINUTE_MS * 2, 'minutes'],
  MINUTE: [MINUTE_MS, 'minutes'],
  SECOND30: [SECOND_MS * 30, 'seconds'],
  SECOND15: [SECOND_MS * 15, 'seconds'],
  SECOND10: [SECOND_MS * 10, 'seconds'],
  SECOND5: [SECOND_MS * 5, 'seconds'],
  SECOND2: [SECOND_MS * 2, 'seconds'],
  SECOND: [SECOND_MS, 'seconds'],
  MILLISECOND500: [MILLISECOND * 500, 'milliseconds'],
  MILLISECOND250: [MILLISECOND * 250, 'milliseconds'],
  MILLISECOND100: [MILLISECOND * 100, 'milliseconds'],
  MILLISECOND50: [MILLISECOND * 50, 'milliseconds'],
  MILLISECOND: [MILLISECOND, 'milliseconds']
};
const timeScales = () => {
  const values = Object.values(TIMESCALESVALUES);
  const vals = [];
  for (let v = values.length; --v; v > 0) vals[v] = values[v][0];
  return vals;
};
const TIMESCALES = timeScales();
const timeRanks = () => {
  const values = Object.values(TIMESCALESVALUES);
  const vals = [];
  for (let v = values.length; --v; v > 0) vals[v] = values[v][1];
  return vals;
};
const TIMESCALESRANK = timeRanks();
const TIMESCALESKEYS = Object.keys(TIMESCALESVALUES);
const timeScalesValues = () => {
  const values = {};
  for (const [key, value] of Object.entries(TIMESCALESVALUES)) {
    values[key] = value[0];
  }
  return values;
};
const TIMESCALESVALUESKEYS = timeScalesValues();
function getTimezone() {
  const offset = new Date().getTimezoneOffset();
  if (Object.prototype.hasOwnProperty.call(timezones, offset)) {
    return timezones[offset.toString()];
  }
  return 'Etc/UTC';
}
function buildSubGrads() {
  const grads = {};
  for (let unit in TIMEUNITSVALUESSHORT) {
    let i = 0;
    grads[unit] = [];
    do {
      grads[unit].push(Math.round(TIMEUNITSVALUESSHORT[unit] * i));
      i += 0.125;
    } while (i < 1);
  }
  return grads;
}
function isValidTimestamp(ts) {
  const date = new Date(ts);
  return (
    date instanceof Date && !isNaN(date.valueOf()) && isFinite(date.valueOf())
  );
}
function isValidTimeInRange(time, start = BTCGENESIS, end = Date.now()) {
  if (!isValidTimestamp(time)) return false;
  return time > start && time < end ? true : false;
}
function parseTSDiff(d1, d2, unit) {
  d1 = new Date(d1);
  d2 = new Date(d2);
  var t2 = d2.getTime();
  var t1 = d1.getTime();
  return parseInt((t2 - t1) / unit);
}
const timestampDiff = {
  inSeconds: function (d1, d2) {
    return parseTSDiff(d1, d2, SECOND_MS);
  },
  inMinutes: function (d1, d2) {
    return parseTSDiff(d1, d2, MINUTE_MS);
  },
  inHours: function (d1, d2) {
    return parseTSDiff(d1, d2, HOUR_MS);
  },
  inDays: function (d1, d2) {
    return parseTSDiff(d1, d2, DAY_MS);
  },
  inWeeks: function (d1, d2) {
    return parseTSDiff(d1, d2, WEEK_MS);
  },
  inMonths: function (d1, d2) {
    d1 = new Date(d1);
    d2 = new Date(d2);
    let d1Y = d1.getUTCFullYear();
    let d2Y = d2.getUTCFullYear();
    let d1M = d1.getUTCMonth();
    let d2M = d2.getUTCMonth();
    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  },
  inYears: function (d1, d2) {
    let d1Y = new Date(d1);
    let d2Y = new Date(d2);
    return d2Y.getUTCFullYear() - d1Y.getUTCFullYear();
  }
};
function timestampDifference(date1, date2) {
  let years = timestampDiff.inYears(date1, date2);
  let months = timestampDiff.inMonths(date1, date2);
  let weeks = timestampDiff.inWeeks(date1, date2);
  let days = timestampDiff.inDays(date1, date2);
  let hours = timestampDiff.inHours(date1, date2);
  let minutes = timestampDiff.inMinutes(date1, date2);
  let seconds = timestampDiff.inSeconds(date1, date2);
  let milliseconds = new Date(date2).getTime() - new Date(date1).getTime();
  return {
    y: years,
    M: months,
    w: weeks,
    d: days,
    h: hours,
    m: minutes,
    s: seconds,
    ms: milliseconds,
    years: years,
    months: months,
    weeks: weeks,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}
function isTimeFrameMS(ms) {
  return isInteger(ms) && !(ms < SECOND_MS) && !(ms === Infinity);
}
function isTimeFrame(tf) {
  let ms = SECOND_MS;
  if (isString(tf)) {
    ms = interval2MS(tf);
    if (ms) tf = tf;
    else {
      ms = SECOND_MS;
      tf = '1s';
    }
  } else tf = '1s';
  return { tf, ms };
}
function interval2MS(tf) {
  if (!isString(tf)) return false;
  const regex = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let m;
  if ((m = regex.exec(tf)) !== null) {
    return TIMEUNITSVALUESSHORT[m[2]] * m[1];
  } else return false;
}
function ms2TimeUnits(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  let days = Math.floor(hours / 24);
  hours = hours % 24;
  let _weeks = Math.floor(days / 7);
  days = days % 7;
  let months = Math.floor(_weeks / 4);
  let years = Math.floor(_weeks / 52);
  let weeks = _weeks % 4;
  months = months % 13;
  return {
    y: years,
    M: months,
    w: weeks,
    d: days,
    h: hours,
    m: minutes,
    s: seconds,
    years: years,
    months: months,
    weeks: weeks,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}
function ms2Interval(milliseconds) {
  const intervals = ms2TimeUnits(milliseconds);
  for (const unit in intervals) {
    if (intervals[unit]) return `${intervals[unit]}${unit}`;
  }
}
function get_second(t) {
  return t ? new Date(t).getUTCSeconds() : null;
}
function second_start(t) {
  let start = new Date(t);
  return start.setUTCMilliseconds(0, 0);
}
function get_minute(t) {
  return t ? new Date(t).getUTCMinutes() : null;
}
function minute_start(t) {
  let start = new Date(t);
  return start.setUTCSeconds(0, 0);
}
function get_hour(t) {
  return t ? new Date(t).getUTCHours() : null;
}
function hour_start(t) {
  let start = new Date(t);
  return start.setUTCMinutes(0, 0, 0);
}
function get_day(t) {
  return t ? new Date(t).getUTCDate() : null;
}
function get_dayName(t, locale = 'en-GB', len = 'short') {
  return new Date(t).toLocaleDateString(locale, { weekday: len });
}
function day_start(t) {
  return new Date(t).setUTCHours(0, 0, 0, 0);
}
function get_month(t) {
  if (!t) return undefined;
  return new Date(t).getUTCMonth();
}
function get_monthName(t, locale = 'en-GB', len = 'short') {
  return new Date(t).toLocaleDateString(locale, { month: len });
}
function month_start(t) {
  let date = new Date(t);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1);
}
function nextMonth(t) {
  let m = (get_month(t) + 1) % 12;
  t += MONTH_MS(m, isLeapYear(t));
  return t;
}
function get_year(t) {
  if (!t) return undefined;
  return new Date(t).getUTCFullYear();
}
function year_start(t) {
  return Date.UTC(new Date(t).getUTCFullYear());
}
function nextYear(t) {
  t = t + YEAR_MS + DAY_MS;
  if (!isLeapYear(t));
  return t;
}
function isLeapYear(t) {
  let date = new Date(t);
  let year = date.getUTCFullYear();
  if ((year & 3) != 0) return false;
  return year % 100 != 0 || year % 400 == 0;
}
function dayOfYear(t) {
  let date = new Date(t);
  let mn = date.getUTCMonth();
  let dn = date.getUTCDate();
  let dayOfYear = dayCount[mn] + dn;
  if (mn > 1 && isLeapYear()) dayOfYear++;
  return dayOfYear;
}
function time_start(t, unit) {
  const findStart = {
    years: (t) => year_start(t),
    months: (t) => month_start(t),
    weeks: (t) => day_start(t),
    days: (t) => day_start(t),
    hours: (t) => hour_start(t),
    minutes: (t) => minute_start(t),
    seconds: (t) => second_start(t)
  };
  return findStart[unit](t);
}
function unitRange(ts, tf) {
  let start, end;
  switch (tf) {
    case 'years':
      start = year_start(ts);
      end = nextYear(ts);
      break;
    case 'months':
      start = month_start(ts);
      end = nextMonth(ts);
      break;
    case 'weeks':
      start = day_start(ts);
      end = start + DAY_MS;
      break;
    case 'days':
      start = day_start(ts);
      end = start + DAY_MS;
      break;
    case 'hours':
      start = hour_start(ts);
      end = start + HOUR_MS;
      break;
    case 'minutes':
      start = minute_start(ts);
      end = start + MINUTE_MS;
      break;
    case 'seconds':
      start = second_start(ts);
      end = start + SECOND_MS;
  }
  return { start, end };
}
function HM(t) {
  let { h, m } = DHMS(t);
  if (h == 0 && m == 0) return `${d}`;
  else return `${h}:${m}`;
}
function HMS(t) {
  let { h, m, s } = DHMS(t);
  if (h == 0 && m == 0 && s == 0) return `${d}`;
  return `${h}:${m}:${s}`;
}
function MS(t) {
  let { h, m, s } = DHMS(t);
  if (h == 0 && m == 0 && s == 0) return `${d}`;
  return `${m}:${s}`;
}
function DHMS(t) {
  let d, h, m, s;
  d = String(get_day(t));
  h = String(get_hour(t)).padStart(2, '0');
  m = String(get_minute(t)).padStart(2, '0');
  s = String(get_second(t)).padStart(2, '0');
  return { d, h, m, s };
}
function nearestTs(t, ts) {
  let dist = Infinity;
  let val = null;
  let index = -1;
  for (let i = 0; i < ts.length; i++) {
    let ti = ts[i][0];
    if (Math.abs(ti - t) < dist) {
      dist = Math.abs(ti - t);
      val = ts[i];
      index = i;
    }
  }
  return [index, val];
}
class TimeData {
  #range = {};
  #timeZoneOffset = getTimezoneOffset();
  #timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  static {
    this.timeUnits = TIMEUNITS;
  }
  static {
    this.timeUnitsLong = TIMEUNITSLONG;
  }
  static {
    this.timeUnitsValues = TIMESCALESVALUES;
  }
  static {
    this.timeScaleValues = TIMESCALESVALUES;
  }
  static {
    this.BTCGenesis = BTCGENESIS;
  }
  constructor(range) {
    if (range instanceof Range) this.#range = range;
    this.setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }
  get range() {
    return this.#range;
  }
  get timeFrameMS() {
    return this.#range.interval;
  }
  get timeFrame() {
    return this.#range.intervalStr;
  }
  set timeZone(z) {
    this.setTimeZone(z);
  }
  get timeZone() {
    return this.#timeZone;
  }
  set timeZoneOffset(z) {
    this.#timeZoneOffset = isNumber(z) ? z : new Date().getTimezoneOffset();
  }
  get timeZoneOffset() {
    return this.#timeZoneOffset;
  }
  get timeZoneLocal() {
    return getTimezone();
  }
  get indexed() {
    return this.#range.indexed;
  }
  setTimeZone(z) {
    if (Intl.supportedValuesOf('timeZone').includes(z)) {
      this.#timeZone = z;
      this.#timeZoneOffset = getTimezoneOffset(z);
    }
  }
  static timezoneLocal() {
    return getTimezone();
  }
  static timezoneOffset(timeZone, locale) {
    return getTimezoneOffset(timeZone, locale);
  }
  static IANATimeZone(locale) {
    return IANATimeZones(locale);
  }
  static isValidTimestamp(ts) {
    return isValidTimestamp(ts);
  }
  static isValidTimeInRange(time, start = BTCGENESIS, end = Date.now()) {
    return isValidTimeInRange(time, start, end);
  }
  static interval2MS(tf) {
    return interval2MS(tf);
  }
  static ms2Interval(ms) {
    return ms2Interval(ms);
  }
}
function IANATimeZones(locale = 'en-US') {
  const tz = {};
  Intl.supportedValuesOf('timeZone').forEach((timeZone) => {
    let offset = getTimezoneOffset(timeZone, locale);
    tz[timeZone] = offset;
  });
  return tz;
}
function getTimezoneOffset(
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  locale = 'en-US'
) {
  const now = new Date();
  const tzString = now.toLocaleString(locale, { timeZone });
  const localString = now.toLocaleString(locale);
  const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
  const offset = diff + now.getTimezoneOffset() / 60;
  return -offset;
}

var Time = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  BTCGENESIS: BTCGENESIS,
  DAY_MS: DAY_MS,
  HM: HM,
  HMS: HMS,
  HOUR_MS: HOUR_MS,
  IANATimeZones: IANATimeZones,
  MILLISECOND: MILLISECOND,
  MINUTE_MS: MINUTE_MS,
  MONTHMAP: MONTHMAP,
  MONTHR_MS: MONTHR_MS,
  MONTH_MS: MONTH_MS,
  MS: MS,
  SECOND_MS: SECOND_MS,
  TIMESCALES: TIMESCALES,
  TIMESCALESKEYS: TIMESCALESKEYS,
  TIMESCALESRANK: TIMESCALESRANK,
  TIMESCALESVALUES: TIMESCALESVALUES,
  TIMESCALESVALUESKEYS: TIMESCALESVALUESKEYS,
  TIMEUNITS: TIMEUNITS,
  TIMEUNITSLONG: TIMEUNITSLONG,
  TIMEUNITSVALUES: TIMEUNITSVALUES,
  TIMEUNITSVALUESLONG: TIMEUNITSVALUESLONG,
  TIMEUNITSVALUESSHORT: TIMEUNITSVALUESSHORT,
  TimeData: TimeData,
  WEEK_MS: WEEK_MS,
  YEAR_MS: YEAR_MS,
  buildSubGrads: buildSubGrads,
  dayCntInc: dayCntInc,
  dayCntLeapInc: dayCntLeapInc,
  dayOfYear: dayOfYear,
  day_start: day_start,
  getTimezone: getTimezone,
  getTimezoneOffset: getTimezoneOffset,
  get_day: get_day,
  get_dayName: get_dayName,
  get_hour: get_hour,
  get_minute: get_minute,
  get_month: get_month,
  get_monthName: get_monthName,
  get_second: get_second,
  get_year: get_year,
  hour_start: hour_start,
  interval2MS: interval2MS,
  isLeapYear: isLeapYear,
  isTimeFrame: isTimeFrame,
  isTimeFrameMS: isTimeFrameMS,
  isValidTimeInRange: isValidTimeInRange,
  isValidTimestamp: isValidTimestamp,
  minute_start: minute_start,
  monthDayCnt: monthDayCnt,
  month_start: month_start,
  ms2Interval: ms2Interval,
  ms2TimeUnits: ms2TimeUnits,
  nearestTs: nearestTs,
  nextMonth: nextMonth,
  nextYear: nextYear,
  second_start: second_start,
  time_start: time_start,
  timestampDiff: timestampDiff,
  timestampDifference: timestampDifference,
  unitRange: unitRange,
  year_start: year_start
});

const DEFAULT_TIMEINTERVAL = MINUTE_MS;
const DEFAULT_TIMEFRAME = '1m';
const DEFAULT_TIMEFRAMEMS = DEFAULT_TIMEINTERVAL;
const XAXIS_ZOOM = 0.05;
const XAXIS_STEP = 100;
const YAXIS_STEP = 100;
const YAXIS_BOUNDS = 0.3;
const YAXIS_PADDING = 1.04;
const YAXIS_MINDIGITS = 8;
class YAXIS_TYPE {
  static {
    this.default = new YAXIS_TYPE('default');
  }
  static {
    this.percent = new YAXIS_TYPE('percent');
  }
  static {
    this.relative = new YAXIS_TYPE('relative');
  }
  static {
    this.log = new YAXIS_TYPE('log');
  }
  static valid(t) {
    return t instanceof YAXIS_TYPE ? t : YAXIS_TYPE.default;
  }
  static get types() {
    let types = [];
    for (let key in YAXIS_TYPE) {
      if (YAXIS_TYPE[key] instanceof YAXIS_TYPE) types.push(key);
    }
    return types;
  }
  constructor(name) {
    this.name = name;
  }
}
const YAXIS_TYPES = YAXIS_TYPE.types;
const INTITIALCNT = 30;
const LIMITFUTURE = 200;
const LIMITPAST = 200;
const MINCANDLES = 20;
const MAXCANDLES = 1920;
const BUFFERSIZE = 5;
const ROWMINHEIGHT = 50;
const SECONDARYDEFAULTHEIGHT = 30;
const DIVIDERHEIGHT = 8;
const COLLAPSEDHEIGHT = 30;
const UTILSLOCATIONS = [true, 'top'];
class OHLCV {
  static {
    this.t = 0;
  }
  static {
    this.o = 1;
  }
  static {
    this.h = 2;
  }
  static {
    this.l = 3;
  }
  static {
    this.c = 4;
  }
  static {
    this.v = 5;
  }
}
const OVERLAYPANES = {
  mainPane: {},
  primaryPane: {},
  secondaryPane: {},
  scale: {},
  timeline: {}
};
Array.from(Object.keys(OVERLAYPANES));

class Divider {
  #id;
  #core;
  #config;
  #theme;
  #widgets;
  #chartPane;
  #elDividers;
  #elDivider;
  #cursorPos;
  #cursorStyle;
  #input;
  static {
    this.dividerList = {};
  }
  static {
    this.divideCnt = 0;
  }
  static {
    this.class = CLASS_DIVIDERS;
  }
  static {
    this.Name = 'Dividers';
  }
  static {
    this.type = 'divider';
  }
  static create(widgets, config) {
    const id = `${config.core.id}_divider_${++Divider.divideCnt}`;
    config.id = id;
    Divider.dividerList[id] = new Divider(widgets, config);
    return Divider.dividerList[id];
  }
  static destroy() {
    for (let id in Divider.dividerList) {
      Divider.dividerList[id].destroy();
      delete Divider.dividerList[id];
    }
  }
  static defaultNode() {
    const dividersStyle = `position: absolute;`;
    const node = `
  <div slot="widget" class="${CLASS_DIVIDERS}" style="${dividersStyle}"></div>
  `;
    return node;
  }
  constructor(widgets, config) {
    const cfg = { ...config };
    this.#widgets = widgets;
    this.#core = cfg.core;
    this.#config = cfg;
    this.#theme = cfg.core.theme;
    this.#id = cfg.id;
    this.#chartPane = cfg.chartPane;
    this.#elDividers = widgets.elements[Divider.type];
    this.init();
  }
  get el() {
    return this.#elDivider;
  }
  get id() {
    return this.#id;
  }
  get chartPane() {
    return this.#chartPane;
  }
  get config() {
    return this.#core.config;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return elementDimPos(this.#elDivider);
  }
  get height() {
    return this.#elDivider.getBoundingClientRect().height;
  }
  set cursor(c) {
    this.setCursorStyle(c);
  }
  get cursor() {
    return this.#cursorStyle;
  }
  get type() {
    return Divider.type;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = 'row-resize';
    this.eventsListen();
  }
  destroy() {
    this.#input.destroy();
    this.el.remove();
    delete Divider.dividerList[this.id];
  }
  eventsListen() {
    this.#input = new Input(this.#elDivider, { disableContextMenu: false });
    this.#input.on('pointerover', this.onMouseEnter.bind(this));
    this.#input.on('pointerout', this.onMouseOut.bind(this));
    this.#input.on('pointerdrag', this.onPointerDrag.bind(this));
    this.#input.on('pointerdragend', this.onPointerDragEnd.bind(this));
  }
  on(topic, handler, context = this) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler, context = this) {
    this.#core.off(topic, handler, context);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMouseEnter() {
    this.#elDivider.style.background = this.#theme.divider.active;
    this.#core.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#elDivider.style.background = this.#theme.divider.idle;
    this.#core.MainPane.onMouseEnter();
  }
  onPointerDrag(e) {
    this.#cursorPos = this.#core.MainPane.cursorPos;
    this.#elDivider.style.background = this.#theme.divider.active;
    this.emit(`${this.id}_pointerdrag`, this.#cursorPos);
    this.emit(`divider_pointerDrag`, {
      id: this.id,
      e: e,
      pos: this.#cursorPos,
      chartPane: this.chartPane
    });
    this.chartPane.resize();
  }
  onPointerDragEnd(e) {
    this.#elDivider.style.background = this.#theme.divider.idle;
    this.#cursorPos = this.#core.MainPane.cursorPos;
    this.emit(`${this.id}_pointerdragend`, this.#cursorPos);
    this.emit('divider_pointerDragEnd', {
      id: this.id,
      e: e,
      pos: this.#cursorPos,
      chartPane: this.chartPane
    });
    this.chartPane.resize();
  }
  mount() {
    if (this.#elDividers.lastElementChild == null)
      this.#elDividers.innerHTML = this.dividerNode();
    else
      this.#elDividers.lastElementChild.insertAdjacentHTML(
        'afterend',
        this.dividerNode()
      );
    this.#elDivider = findBySelector(`#${this.#id}`, this.#elDividers);
  }
  dividerNode() {
    let theme = this.#core.theme,
      top = this.#chartPane.pos.top - elementDimPos(this.#elDividers).top;
    this.#core.elBody.width - this.#core.elBody.scale.width;
    let height = isNumber(this.config.dividerHeight)
        ? this.config.dividerHeight
        : DIVIDERHEIGHT,
      left = this.#core.elBody.tools.width;
    top -= height / 2;
    switch (theme.tools.location) {
      case 'left':
        break;
      case false:
      case 'none':
      case 'right':
        left *= -1;
        break;
    }
    const styleDivider = `position: absolute; top: ${top}px; left: ${left}px; z-index:100; width: 100%; height: ${height}px; background: ${theme.divider.idle};`;
    const styleLine = `width: 100%; margin: 3.5px 0; border: 0; border-top: ${theme.divider.style} ${theme.divider.line};`;
    const node = `
      <div id="${this.#id}" class="divider" style="${styleDivider}"><hr style="${styleLine}"></div>
    `;
    return node;
  }
  setPos() {
    let top = this.#chartPane.pos.top - elementDimPos(this.#elDividers).top;
    top = top - this.height / 2 + 1;
    this.#elDivider.style.top = `${top}px`;
    this.#elDivider.style.left = `${this.#core.elBody.tools.width}px`;
  }
  setWidth() {
    this.#elDivider.style.width = `${this.#core.elMain.width + this.#core.elBody.scale.width}px`;
    this.#elDivider.style.left = `${this.#core.elBody.tools.width}px`;
  }
  setCursorStyle(c) {
    if (!isString(c)) return;
    this.#cursorStyle = c;
    this.#elDivider.style.cursor = c;
  }
  hide() {
    this.#elDivider.style.display = `none`;
  }
  show() {
    this.#elDivider.style.display = `block`;
  }
}

const camera = `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>`;
const chart = `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>`;
const clock = `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>`;
const config = `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>`;
const cursor = `<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>`;
const del = `<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>`;
const fibonacci = `<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>`;
const line = `<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>`;
const measure = `<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>`;
const range = `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>`;
const text = `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>`;
const close = `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>`;
const up = `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>`;
const down = `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>`;
const up2 = `<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>`;
const down2 = `<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>`;
const restore = `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>`;
const maximize = `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>`;
const collapse = `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>`;
const expand = `<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <g fill-rule="evenodd">  <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z"/>  <path d="m4.4449 4.097c-0.01964 0-0.037678 0.0018-0.054687 0.0039-0.017011 0.0022-0.034068 0.0058-0.048828 0.0098-0.014761 4e-3 -0.028126 0.0081-0.041016 0.01367-0.012889 0.0056-0.025711 0.01268-0.037109 0.01953-0.022796 0.01371-0.041442 0.02783-0.060547 0.04492s-0.038191 0.03653-0.056641 0.05469c-0.024482 0.02442-0.046092 0.05037-0.064453 0.07813-0.018362 0.02775-0.032681 0.05776-0.044922 0.08789s-0.021223 0.06023-0.027344 0.0918c-0.00612 0.03156-0.00977 0.06366-0.00977 0.0957 0 8e-3 -4.378e-4 0.01543 0 0.02344v1.2988c0 0.02083 6.41e-5 0.04102 0.00195 0.06055 0.00189 0.01953 0.0061 0.03841 0.00977 0.05664 0.00366 0.01823 0.00836 0.03581 0.013672 0.05273 0.00531 0.01693 0.010742 0.0332 0.017578 0.04883 0.013672 0.03125 0.029785 0.0599 0.048828 0.08594s0.041016 0.04948 0.064453 0.07031 0.049316 0.03906 0.076172 0.05469c0.026855 0.01563 0.054687 0.02865 0.083984 0.03906 0.029297 0.01042 0.059082 0.01823 0.089844 0.02344 0.030762 0.0052 0.0625 0.0078 0.09375 0.0078s0.062988-0.0026 0.09375-0.0078 0.060547-0.01302 0.089844-0.02344 0.057129-0.02344 0.083984-0.03906c0.026855-0.01563 0.052734-0.03385 0.076172-0.05469 0.023437-0.02083 0.04541-0.04427 0.064453-0.07031s0.035156-0.05469 0.048828-0.08594c0.00684-0.01563 0.012268-0.0319 0.017578-0.04883s0.01001-0.0345 0.013672-0.05273c0.00366-0.01823 0.00787-0.03711 0.00977-0.05664 0.00189-0.01953 0.00195-0.03971 0.00195-0.06055v-0.82227h6v0.98633c0 0.02083 2e-3 0.04102 0.0039 0.06055s0.0042 0.03841 0.0078 0.05664c0.0037 0.01823 0.0084 0.03581 0.01367 0.05273 0.0053 0.01693 0.01074 0.0332 0.01758 0.04883 0.01367 0.03125 0.03174 0.0599 0.05078 0.08594s0.03906 0.04948 0.0625 0.07031 0.04932 0.03906 0.07617 0.05469c0.02686 0.01563 0.05469 0.02865 0.08399 0.03906 0.0293 0.01042 0.06104 0.01823 0.0918 0.02344 0.03076 0.0052 0.06055 0.0078 0.0918 0.0078s0.06299-0.0026 0.09375-0.0078 0.06055-0.01302 0.08984-0.02344c0.0293-0.01042 0.05908-0.02344 0.08594-0.03906 0.02686-0.01563 0.05078-0.03385 0.07422-0.05469 0.02344-0.02083 0.04541-0.04427 0.06445-0.07031s0.03516-0.05469 0.04883-0.08594c0.0068-0.01563 0.01422-0.0319 0.01953-0.04883 0.0053-0.01693 0.01001-0.0345 0.01367-0.05273 0.0037-0.01823 0.0059-0.03711 0.0078-0.05664s2e-3 -0.03971 2e-3 -0.06055v-1.4629c3.25e-4 -0.0078 0-0.01563 0-0.02344 0-0.03125-0.0026-0.06299-0.0078-0.09375s-0.01302-0.06055-0.02344-0.08984c-0.01042-0.0293-0.02344-0.05713-0.03906-0.08398-0.01563-0.02685-0.03385-0.05273-0.05469-0.07617-0.02083-0.02344-0.04427-0.04541-0.07031-0.06445s-0.05469-0.03516-0.08594-0.04883c-0.01563-0.0068-0.0319-0.01227-0.04883-0.01758-0.01693-0.0053-0.0345-0.01001-0.05273-0.01367-0.01823-0.0037-0.03711-0.0059-0.05664-0.0078s-0.03971-0.0039-0.06055-0.0039h-6.5z"/>  <path d="m11.555 11.903c0.01964 0 0.03768-0.0018 0.05469-0.0039 0.01701-0.0022 0.03407-0.0058 0.04883-0.0098s0.02813-0.0081 0.04102-0.01367c0.01289-0.0056 0.02571-0.01268 0.03711-0.01953 0.0228-0.01371 0.04144-0.02783 0.06055-0.04492 0.0191-0.01709 0.03819-0.03653 0.05664-0.05469 0.02448-0.02442 0.04609-0.05037 0.06445-0.07813 0.01836-0.02775 0.03268-0.05776 0.04492-0.08789s0.02122-0.06023 0.02734-0.0918c0.0061-0.03156 0.0098-0.06366 0.0098-0.0957 0-8e-3 4.38e-4 -0.01543 0-0.02344v-1.2988c0-0.02083-6.4e-5 -0.04102-2e-3 -0.06055-0.0019-0.01953-0.0061-0.03841-0.0098-0.05664s-0.0084-0.03581-0.01367-0.05273c-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.02979-0.0599-0.04883-0.08594s-0.04102-0.04948-0.06445-0.07031c-0.02344-0.02083-0.04932-0.03906-0.07617-0.05469s-0.05469-0.02865-0.08398-0.03906c-0.0293-0.01042-0.05908-0.01823-0.08984-0.02344-0.03076-0.0052-0.0625-0.0078-0.09375-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05713 0.02344-0.08398 0.03906-0.02685 0.01563-0.05273 0.03385-0.07617 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01227 0.0319-0.01758 0.04883-0.0053 0.01693-0.01001 0.0345-0.01367 0.05273-0.0037 0.01823-0.0079 0.03711-0.0098 0.05664s-0.0019 0.03971-0.0019 0.06055v0.82227h-6v-0.98633c0-0.02083-2e-3 -0.04102-0.0039-0.06055s-0.0042-0.03841-0.0078-0.05664c-0.0037-0.01823-0.0084-0.03581-0.01367-0.05273-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.03174-0.0599-0.05078-0.08594s-0.03906-0.04948-0.0625-0.07031-0.04932-0.03906-0.07617-0.05469c-0.02686-0.01563-0.05469-0.02865-0.08399-0.03906-0.0293-0.01042-0.06104-0.01823-0.0918-0.02344-0.03076-0.0052-0.06055-0.0078-0.0918-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05908 0.02344-0.08594 0.03906-0.02686 0.01563-0.05078 0.03385-0.07422 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01422 0.0319-0.01953 0.04883-0.0053 0.01693-0.01001 0.03451-0.01367 0.05273-0.0037 0.01823-0.0059 0.03711-0.0078 0.05664s-2e-3 0.03971-2e-3 0.06055v1.4629c-3.25e-4 0.0078 0 0.01563 0 0.02344 0 0.03125 0.0026 0.06299 0.0078 0.09375s0.01302 0.06055 0.02344 0.08984c0.01042 0.0293 0.02344 0.05713 0.03906 0.08398 0.01563 0.02685 0.03385 0.05273 0.05469 0.07617 0.02083 0.02344 0.04427 0.04541 0.07031 0.06445s0.05469 0.03516 0.08594 0.04883c0.01563 0.0068 0.0319 0.01227 0.04883 0.01758 0.01693 0.0053 0.0345 0.01001 0.05273 0.01367 0.01823 0.0037 0.03711 0.0059 0.05664 0.0078s0.03971 0.0039 0.06055 0.0039h6.5z"/></g></svg>`;
const visible = `<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/></svg>`;
const notVisible = `<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/> <path d="m12.757 3.0055c-0.11087 0.0051358-0.22696 0.051177-0.33008 0.1543l-4.9883 4.9902c-0.061946 0.061947-0.086644 0.12038-0.097656 0.17773l-4.8184 4.8164c-0.1111 0.1111-0.1066 0.2109-0.10742 0.31445-3.5e-4 0.27663 0.22337 0.50035 0.5 0.5 0 0 0.18415 0.022881 0.33008-0.12305l4.9746-4.9727c0.06758-0.06758 0.10951-0.13979 0.13281-0.21289l4.7832-4.7832c0.36828-0.36828 0.017071-0.87967-0.37891-0.86133z" fill-rule="evenodd"/></svg>`;
const fwdEnd = `<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>`;
const rwdStart = `<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>`;
const arrowDown = `<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>`;
const arrowUp = `<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>`;
const arrowDownRound = `<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>`;
const arrowUpRound = `<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>`;
const arrowDownRoundSolid = `<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>`;
const arrowUpRoundSolid = `<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>`;
const buySolid = `<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>`;
const sellSolid = `<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>`;
const noteSolid = `<svg width="493px" height="512px" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 493 511.77" xmlns="http://www.w3.org/2000/svg"><path d="m33.11 458.2 104.5-79.1c3.09-3 7.08-4.47 11.08-4.45l302.6-0.08c2.67 0 5.09-1.08 6.78-2.77 1.74-1.81 2.84-4.24 2.84-6.87v-323.2c0-2.59-1.12-5-2.86-6.74-1.78-1.78-4.2-2.9-6.76-2.9h-409.56c-2.54 0-4.94 1.14-6.72 2.92s-2.92 4.18-2.92 6.72c0 793.72 1.02 39.329 1.02 416.47zm90.6-229.77c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.73-19.74 19.73c-10.89 0-19.73-8.84-19.73-19.73s8.84-19.74 19.73-19.74zm0-101.14c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.74-19.74 19.74c-10.89 0-19.73-8.85-19.73-19.74s8.84-19.74 19.73-19.74zm61.72 138.89c-9.95 0-18.02-8.07-18.02-18.01 0-9.95 8.07-18.02 18.02-18.02h185.56c9.95 0 18.01 8.07 18.01 18.02 0 9.94-8.06 18.01-18.01 18.01zm0-101.13c-9.95 0-18.02-8.07-18.02-18.02 0-9.94 8.07-18.01 18.02-18.01h185.56c9.95 0 18.01 8.07 18.01 18.01 0 9.95-8.06 18.02-18.01 18.02zm-30.38 241.61-125.97 99.69c-2.96 3.32-7.24 5.42-12.01 5.42-8.85 0-17.07-7.1228-17.07-15.963v-454.08c0-11.4 4.77-21.88 12.31-29.42s18.02-12.31 29.42-12.31h409.56c11.4 0 21.9 4.74 29.45 12.29 7.5 7.51 12.26 17.96 12.26 29.44v323.2c0 11.48-4.7 21.95-12.24 29.49-7.61 7.54-18.05 12.24-29.47 12.24z" fill-rule="nonzero"/></svg>`;
const lightning = `<svg width="800px" height="800px" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.746 2.7281c-5.1207-2.0689-10.949 0.40512-13.018 5.5258-2.0689 5.1207 0.40512 10.949 5.5258 13.018 5.1207 2.0689 10.949-0.40508 13.018-5.5258 2.0689-5.1207-0.40508-10.949-5.5258-13.018zm-1.3378 8.3035-1.2703-0.51325c-0.21854-0.08829-0.32785-0.13246-0.3683-0.22775-0.04045-0.09529 0.0037-0.20461 0.09201-0.42314l1.6595-4.1073c0.33362-0.82575 0.50047-1.2387 0.33474-1.3523-0.16582-0.11359-0.49058 0.19103-1.1403 0.8003l-4.7426 4.4469c-1.0274 0.96338-1.541 1.445-1.4405 1.9835 0.10054 0.53837 0.75347 0.80216 2.0594 1.3298l1.2703 0.51325c0.21854 0.08829 0.32785 0.13246 0.3683 0.22775 0.04045 0.09529-0.0037 0.20461-0.09201 0.42314l-1.6595 4.1073c-0.33365 0.82582-0.50047 1.2387-0.33475 1.3523 0.16582 0.1136 0.49059-0.19104 1.1403-0.80025l4.7425-4.4469c1.0275-0.96346 1.5411-1.4451 1.4406-1.9836-0.10057-0.53838-0.75352-0.80218-2.0594-1.3298z" clip-rule="evenodd" fill-rule="evenodd"/></svg>`;
const loadingBars = `<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>`;
const loadingSpin = `<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>`;

const CHART_MINH = 300;
const CHART_MINW = 400;
const TX_MINW = `${CHART_MINW}px`;
const TX_MINH = `${CHART_MINH}px`;
const TX_MAXW = '100%';
const TX_MAXH = '100%';
const UTILSH = 30;
const TOOLSW = 35;
const TIMESCALEH = 25;
const TIMENAVIGATIONH = 25;
const TIMEH = TIMESCALEH + TIMENAVIGATIONH;
const SCALEW = 60;
const FONTWEIGHT = 'normal';
const FONTSIZE = 12;
const FONTSTYLE = 'normal';
const FONTFAMILY = 'Avenir, Helvetica, Arial, sans-serif';
const FONTFAMILYMONO = 'Andalé, Lucida, Monaco, Courier';
const COLOUR_BG = '#141414';
const COLOUR_BORDER = '#333';
const COLOUR_TXT = '#cccccc';
const COLOUR_ICON = '#888888';
const COLOUR_ICONHOVER = '#cccccc';
const ICONSIZE = '25px';
const STYLE_ROW = 'position: relative;';
const GlobalStyle = {
  COLOUR_BG: COLOUR_BG,
  COLOUR_BORDER: COLOUR_BORDER,
  COLOUR_TXT: COLOUR_TXT,
  COLOUR_ICON: COLOUR_ICON,
  COLOUR_ICONHOVER: COLOUR_ICONHOVER,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: FONTWEIGHT,
  FONTSIZE: FONTSIZE,
  FONTSTYLE: FONTSTYLE,
  FONTFAMILY: FONTFAMILY,
  FONT: `${FONTSTYLE} ${FONTSIZE}px ${FONTWEIGHT} ${FONTFAMILY}`,
  FONTSTRING: `font-style: ${FONTSTYLE}; font-size: ${FONTSIZE}px; font-weight: ${FONTWEIGHT}; font-family: ${FONTFAMILY};`
};
const CanvasStyle = {
  fontSize: FONTSIZE,
  fontWeight: FONTWEIGHT,
  fontFamily: FONTFAMILY,
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderWidth: 1,
  txtCol: '#000000',
  bakCol: '#cccccc',
  stroke: '#ffffff',
  fill: '#888888'
};
const dashedPatterns = {
  '─────────': [],
  '┈┈┈┈┈┈┈┈┈': [1, 1],
  '- - - - -': [10, 10],
  '─ ─ ─ ─ ─': [20, 5],
  '─ ▪ ─ ▪ ─': [15, 3, 3, 3]
};
const ToolsStyle = {
  COLOUR_ICON: COLOUR_ICON,
  COLOUR_ICONHOVER: COLOUR_ICONHOVER,
  ICONSIZE: ICONSIZE
};
const UtilsStyle = {
  COLOUR_ICON: COLOUR_ICON,
  COLOUR_ICONHOVER: COLOUR_ICONHOVER,
  ICONSIZE: ICONSIZE
};
const MenuStyle = {
  COLOUR_BG: COLOUR_BG,
  COLOUR_BORDER: COLOUR_BORDER,
  COLOUR_TXT: COLOUR_TXT
};
const WindowStyle = {
  COLOUR_BG: COLOUR_BG,
  COLOUR_BORDER: COLOUR_BORDER,
  COLOUR_TXT: COLOUR_TXT,
  SHADOW: 'rgb(0,0,0) 0px 20px 30px -10px',
  CONTENT: 'padding: 1em',
  TITLE: 'padding: 2px 1em 5px; background: #333; white-space: nowrap;'
};
const ProgressStyle = {
  FILL: COLOUR_ICONHOVER + '88'
};
const CandleType = {
  CANDLE_SOLID: 'candle_solid',
  CANDLE_HOLLOW: 'candle_hollow',
  CANDLE_UP_HOLLOW: 'candle_up_hollow',
  CANDLE_DOWN_HOLLOW: 'candle_down_hollow',
  OHLC: 'ohlc',
  AREA: 'area',
  LINE: 'line'
};
const CandleStyle = {
  COLOUR_CANDLE_UP: '#00F04088',
  COLOUR_CANDLE_DN: '#F0004088',
  COLOUR_WICK_UP: '#0F4',
  COLOUR_WICK_DN: '#F04'
};
const VolumeStyle = {
  COLOUR_VOLUME_UP: '#00F04044',
  COLOUR_VOLUME_DN: '#F0004044',
  ONCHART_VOLUME_HEIGHT: 15
};
const YAxisFontSizeFactor = 1.75;
const YAxisStyle_FONTWEIGHT = 500;
const YAxisStyle_FONTSIZE = FONTSIZE + 2;
const YAxisStyle_FONTFAMILY = FONTFAMILYMONO;
const YAxisStyle = {
  COLOUR_TICK: '#888',
  COLOUR_LABEL: '888',
  COLOUR_CURSOR: '#000',
  COLOUR_CURSOR_BG: '#CCC',
  FONTFAMILY: YAxisStyle_FONTFAMILY,
  FONTSIZE: YAxisStyle_FONTSIZE,
  FONTWEIGHT: YAxisStyle_FONTWEIGHT,
  FONT_LABEL: `${YAxisStyle_FONTWEIGHT} ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`,
  FONT_LABEL_BOLD: `bold ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`
};
const XAxisStyle_FONTWEIGHT = 500;
const XAxisStyle_FONTSIZE = FONTSIZE + 2;
const XAxisStyle_FONTFAMILY = FONTFAMILYMONO;
const XAxisStyle = {
  COLOUR_TICK: '#888',
  COLOUR_LABEL: '888',
  COLOUR_CURSOR: '#000',
  COLOUR_CURSOR_BG: '#CCC',
  FONTFAMILY: XAxisStyle_FONTFAMILY,
  FONTSIZE: XAxisStyle_FONTSIZE,
  FONTWEIGHT: XAxisStyle_FONTWEIGHT,
  FONT_LABEL: `${XAxisStyle_FONTWEIGHT} ${XAxisStyle_FONTSIZE}px ${XAxisStyle_FONTFAMILY}`,
  FONT_LABEL_BOLD: `bold ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`
};
const GridStyle = {
  COLOUR_GRID: '#222'
};
const PriceLineStyle = {
  width: 1,
  stroke: '#ccc',
  dash: [1, 1]
};
const LegendStyle = {
  text: GlobalStyle.FONTSTRING,
  font: GlobalStyle.FONT,
  colour: GlobalStyle.COLOUR_TXT
};
const DividerStyle = {
  ACTIVE: '#888888C0',
  IDLE: '#FFFFFF00',
  LINE: GlobalStyle.COLOUR_BORDER,
  STYLE: '2px solid'
};
const watermark = {
  FONTSIZE: 50,
  FONTWEIGHT: 'bold',
  FONTFAMILY: GlobalStyle.FONTFAMILY,
  COLOUR: '#181818',
  IMGWIDTH: '200',
  IMGHEIGHT: '200'
};
const drawingNode = {
  passive: {
    stroke: '#000',
    fill: '#ccc',
    width: 1,
    radius: 6
  },
  hover: {
    stroke: '#800',
    fill: '#fff',
    width: 1,
    radius: 6
  },
  active: {
    stroke: '#800',
    fill: '#fff',
    width: 1,
    radius: 6
  }
};
const tradeIcons = {
  arrowDown,
  arrowUp,
  arrowDownRound,
  arrowUpRound,
  arrowDownRoundSolid,
  arrowUpRoundSolid,
  buySolid,
  sellSolid
};
const eventIcons = { noteSolid, lightning };
const defaultTheme = {
  candle: {
    Type: CandleType.CANDLE_SOLID,
    UpBodyColour: CandleStyle.COLOUR_CANDLE_UP,
    UpWickColour: CandleStyle.COLOUR_WICK_UP,
    DnBodyColour: CandleStyle.COLOUR_CANDLE_DN,
    DnWickColour: CandleStyle.COLOUR_WICK_DN
  },
  volume: {
    Height: VolumeStyle.ONCHART_VOLUME_HEIGHT,
    UpColour: VolumeStyle.COLOUR_VOLUME_UP,
    DnColour: VolumeStyle.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: XAxisStyle.COLOUR_TICK,
    colourLabel: XAxisStyle.COLOUR_LABEL,
    colourCursor: XAxisStyle.COLOUR_CURSOR,
    colourCursorBG: XAxisStyle.COLOUR_CURSOR_BG,
    fontFamily: XAxisStyle.FONTFAMILY,
    fontSize: XAxisStyle.FONTSIZE,
    fontWeight: XAxisStyle.FONTWEIGHT,
    line: '#656565',
    slider: '#555555',
    handle: '#55555588',
    icon: COLOUR_ICON,
    iconHover: COLOUR_ICONHOVER
  },
  yAxis: {
    colourTick: YAxisStyle.COLOUR_TICK,
    colourLabel: YAxisStyle.COLOUR_LABEL,
    colourCursor: YAxisStyle.COLOUR_CURSOR,
    colourCursorBG: YAxisStyle.COLOUR_CURSOR_BG,
    fontFamily: YAxisStyle.FONTFAMILY,
    fontSize: YAxisStyle.FONTSIZE,
    fontWeight: YAxisStyle.FONTWEIGHT,
    line: '#656565'
  },
  chart: {
    Background: GlobalStyle.COLOUR_BG,
    BorderColour: GlobalStyle.COLOUR_BORDER,
    BorderThickness: GlobalStyle.BORDER_THICKNESS,
    TextColour: GlobalStyle.COLOUR_TXT,
    FontWeight: GlobalStyle.FONTWEIGHT,
    FontSize: GlobalStyle.FONTSIZE,
    FontStyle: GlobalStyle.FONTSTYLE,
    FontFamily: GlobalStyle.FONTFAMILY,
    Font: GlobalStyle.FONT,
    FontString: GlobalStyle.FONTSTRING,
    GridColour: GridStyle.COLOUR_GRID
  },
  primaryPane: {
    separator: '#666'
  },
  secondaryPane: {
    separator: '#666'
  },
  tools: {
    location: false
  },
  utils: {
    location: false
  },
  time: {
    navigation: false,
    font: FONTFAMILYMONO,
    colour: '#96a9db',
    handleColour: '#586ea6'
  },
  legend: {
    font: LegendStyle.font,
    colour: LegendStyle.colour,
    controls: true,
    controlsColour: '#aaa',
    controlsOver: '#fff',
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: COLOUR_ICON,
    hover: COLOUR_ICONHOVER
  },
  divider: {
    active: DividerStyle.ACTIVE,
    idle: DividerStyle.IDLE,
    line: DividerStyle.LINE,
    style: DividerStyle.STYLE
  },
  window: WindowStyle,
  watermark: watermark,
  trades: {
    iconBuy: tradeIcons.arrowUp,
    iconSell: tradeIcons.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    buyColour: '#0f0',
    sellColour: '#f00',
    defaultIcons: tradeIcons,
    offset: 10,
    positionLine: 1,
    positionStyle: '1px solid',
    positionDash: [1, 0],
    stopLossColour: '#fc0',
    stopLossLine: 1,
    stopLossStyle: '1px solid',
    stopLossDash: [1, 0],
    takeProfitColour: '#0cf',
    takeProfitLine: 1,
    takeProfitStyle: '1px solid',
    takeProfitDash: [1, 0]
  },
  events: {
    iconEvent: eventIcons.lightning,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    iconColour: '#ccc',
    defaultIcons: eventIcons,
    offset: 10
  },
  drawing: {
    node: drawingNode
  }
};
const cssVars = `
<style id="txc_CSSVars">
  --txc-background: #141414:
  --txc-border-color: #888;
  --txc-time-scrollbar-color: #888;
  --txc-time-handle-color: #888;
  --txc-time-slider-color: #888;
  --txc-time-cursor-fore: #222;
  --txc-time-cursor-back: #ccc;
  --txc-time-icon-color: #888;
  --txc-time-icon-hover-color: #888;
</style>`;
const style = `
<style id="txc_globalCSS">
  tradex-chart {
    content-visibility: auto;
    display: grid;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${TX_MINW});
    min-height: var(--txc-min-height, ${TX_MINH});
    max-width: var(--txc-max-width, ${TX_MAXW});
    max-height: var(--txc-max-height, ${TX_MAXH});
    overflow: hidden;
    background: var(--txc-background, ${GlobalStyle.COLOUR_BG});
    font: var(--txc-font, ${GlobalStyle.FONT});
  }
  .tradeXchart .tradeXtime .navigation { 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 2px;
  }
  .tradeXchart .tradeXtime .navigation .icon { 
    flex-basis: 20px;
   }
  .tradeXchart .tradeXtime .navigation #tScrollBar { 
    height: 20px; 
    border: 1px solid; 
    border-radius: 3px; 
    flex-basis: 100%;
    overflow: hidden;
  }
  .tradeXchart .tradeXtime .navigation #tScrollBar .handle { 
    height: 18px; 
    border-radius: 2px; 
    margin: 1px;
  }

  tradex-grid {
    position: absolute;
  }
</style>
`;

const initialEmptyState = 'initialEmptyState';
const defaultTitle = 'Empty';
const defaultConfig = {
  id: undefined,
  title: defaultTitle,
  symbol: defaultTitle,
  width: TX_MAXW,
  height: TX_MAXH,
  utils: {},
  tools: {},
  timeFrame: '1m',
  range: {
    startTS: undefined
  },
  theme: defaultTheme,
  watermark: {
    display: false,
    text: defaultTitle
  },
  trades: {
    display: true,
    displayInfo: true
  },
  precision: MAX_CRYPTO_PRECISION,
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  highLow: false,
  errors: true,
  stream: {},
  maxCandleUpdate: 250,
  talib: undefined,
  wasm: undefined,
  state: {},
  callbacks: {}
};

class Axis {
  #core;
  #parent;
  #chart;
  constructor(parent) {
    this.#parent = parent;
    this.#core = this.#parent.core;
    this.#chart = this.#core.Chart;
  }
  get core() {
    return this.#core;
  }
  get chart() {
    return this.#chart;
  }
  get parent() {
    return this.#parent;
  }
  get theme() {
    return this.#core.theme;
  }
  get width() {
    return this.#chart.width;
  }
  get height() {
    return this.#chart.height;
  }
  get data() {
    return this.#chart.data;
  }
  get range() {
    return this.#chart.range;
  }
  get yDigits() {
    return this.#chart.yAxisDigits;
  }
}

class xAxis extends Axis {
  #xAxisTicks = 4;
  #xAxisGrads;
  #indexBased = true;
  constructor(parent) {
    super(parent);
  }
  get range() {
    return this.parent.range;
  }
  get width() {
    return this.core.MainPane.width;
  }
  get interval() {
    return this.range.interval;
  }
  get intervalStr() {
    return this.range.intervalStr;
  }
  get timeStart() {
    return this.range.timeStart;
  }
  get timeFinish() {
    return this.range.timeFinish;
  }
  get rangeDuration() {
    return this.range.rangeDuration;
  }
  get rangeLength() {
    return this.range.Length;
  }
  get indexStart() {
    return this.range.indexStart;
  }
  get indexEnd() {
    return this.range.indexEnd;
  }
  get timeMax() {
    return this.range.timeMax;
  }
  get timeMin() {
    return this.range.timeMin;
  }
  get candleW() {
    return this.width / this.range.Length;
  }
  get candlesOnLayer() {
    return bRound(this.core.Chart.layerWidth / this.candleW);
  }
  get xAxisRatio() {
    return this.width / this.range.rangeDuration;
  }
  set xAxisTicks(t) {
    this.#xAxisTicks = isNumber(t) ? t : 0;
  }
  get xAxisTicks() {
    return this.#xAxisTicks;
  }
  get xAxisGrads() {
    return this.#xAxisGrads;
  }
  get scrollOffsetPx() {
    return this.core.scrollPos % this.candleW;
  }
  get bufferPx() {
    return this.core.bufferPx;
  }
  xPos(ts) {
    return bRound(
      this.range.rangeIndex(ts) * this.candleW + this.candleW * 0.5
    );
  }
  t2Index(ts) {
    return this.range.rangeIndex(ts);
  }
  t2Pixel(ts) {
    return this.xPos(ts);
  }
  pixel2T(x) {
    let c = this.pixel2Index(x);
    return this.range.value(c)[0];
  }
  pixel2Index(x) {
    x -= this.candleW / 2;
    let c = this.range.indexStart;
    let o = bRound(x / this.candleW);
    return c + o;
  }
  pixelOHLCV(x) {
    let c = this.pixel2Index(x);
    return this.range.value(c);
  }
  xPosSnap2CandlePos(x) {
    let r = x % this.candleW;
    let o = r ? this.candleW / 2 : 0;
    return bRound(x - r + o);
  }
  xPos2Time(x) {
    return this.pixel2T(x);
  }
  xPos2Index(x) {
    return this.pixel2Index(x);
  }
  xPosOHLCV(x) {
    return this.pixelOHLCV(x);
  }
  initXAxisGrads() {
    this.#xAxisGrads = this.calcXAxisGrads();
  }
  doCalcXAxisGrads(range) {
    this.#xAxisGrads = this.calcXAxisGrads(range);
  }
  calcXAxisGrads(range = this.range.snapshot()) {
    const grads = {
      entries: {},
      values: [],
      major: [],
      minor: []
    };
    const units = ms2TimeUnits(range.rangeDuration);
    grads.units = units;
    for (let u in units) {
      if (units[u] > 0) {
        grads.units = [u, u];
        grads.timeSpan = `${units[u]} ${u}`;
        break;
      }
    }
    const tf = range.interval;
    const { xStep, rank } = this.xStep(range);
    const tLimit = this.pixel2T(this.width) + xStep;
    let t1 = range.timeMin - (range.timeMin % xStep) - xStep;
    let start = t1;
    while (t1 < tLimit) {
      let y = time_start(t1, 'years');
      let m = time_start(t1, 'months');
      let d = time_start(t1, 'days');
      if (!(y in grads.entries) && y >= start) {
        grads.entries[y] = [
          this.dateTimeValue(y, tf, rank),
          this.t2Pixel(y),
          y,
          'major'
        ];
      } else if (!(m in grads.entries) && m >= start) {
        grads.entries[m] = [
          this.dateTimeValue(m, tf, rank),
          this.t2Pixel(m),
          m,
          'major'
        ];
      } else if (!(d in grads.entries) && d >= start) {
        grads.entries[d] = [
          this.dateTimeValue(d, tf, rank),
          this.t2Pixel(d),
          d,
          'major'
        ];
      } else {
        grads.entries[t1] = [
          this.dateTimeValue(t1, tf, rank),
          this.t2Pixel(t1),
          t1,
          'minor'
        ];
      }
      t1 += xStep;
    }
    grads.values = Object.values(grads.entries);
    return grads;
  }
  xStep(range) {
    let minStep = XAXIS_STEP;
    let interval = this.#indexBased ? range.interval : 1;
    let xStep = TIMESCALES[0];
    let candleW = bRound(this.width / range.Length);
    let rank = TIMESCALESRANK[0];
    let i = TIMESCALES.indexOf(interval);
    while (i-- >= 0) {
      const gradPixels = candleW * (TIMESCALES[i] / interval);
      if (gradPixels >= minStep) break;
    }
    xStep = TIMESCALES[i];
    rank = TIMESCALESRANK[i];
    return { xStep, rank };
  }
  dateTimeValue(ts, tf, r) {
    let locale;
    if ((ts / DAY_MS) % 1 === 0) {
      const date = get_day(ts);
      if (date === 1) {
        let month = get_month(ts);
        if (month === 0) return get_year(ts);
        else return get_monthName(ts);
      } else {
        let day = get_dayName(ts, locale);
        return `${day} ${date}`;
      }
    } else {
      switch (r) {
        case 'milliseconds':
          return MS(ts);
        case 'seconds':
          return MS(ts);
        case 'minutes':
          return HM(ts);
        case 'hours':
          return HM(ts);
      }
    }
  }
}

class yAxis extends Axis {
  #parent;
  #source;
  #chart;
  #yAxisType = YAXIS_TYPE.percent;
  #mode = 'automatic';
  #transform = {
    automatic: {
      get max() {
        return this.range?.valueMax;
      },
      get min() {
        return this.range?.valueMin;
      },
      get mid() {
        return this.range?.valueMin + this.range?.valueDiff * 0.5;
      },
      get diff() {
        return this.range?.valueDiff;
      },
      get zoom() {
        return 1;
      },
      get offset() {
        return 0;
      },
      get secondaryMaxMin() {
        return this.range?.secondaryMaxMin;
      },
      range: null
    },
    manual: {
      max: 1,
      min: 0,
      mid: 0.5,
      diff: 1,
      zoom: 1,
      offset: 0,
      secondaryMaxMin: {}
    }
  };
  #yAxisPadding = 1;
  #yAxisStep = YAXIS_STEP;
  #yAxisTicks = 3;
  #yAxisGrads;
  #step;
  #range;
  constructor(parent, chart, yAxisType = YAXIS_TYPE.default, range) {
    super(parent);
    this.#chart = chart;
    this.#parent = parent;
    this.#source = parent.parent;
    this.yAxisType = YAXIS_TYPE.valid(yAxisType);
    if (yAxisType == YAXIS_TYPE.relative) range = this.core.range;
    else range = range ? range : this.core.range;
    this.setRange(range);
  }
  get chart() {
    return this.#chart;
  }
  get range() {
    return this.#range;
  }
  get height() {
    return this.chart.height;
  }
  get rangeH() {
    return this.#range.diff * this.yAxisPadding;
  }
  get yAxisRatio() {
    return this.getYAxisRatio();
  }
  get yAxisPrecision() {
    return this.yAxisCalcPrecision;
  }
  set yAxisPadding(p) {
    if (isNumber(p) || p != 0) this.#yAxisPadding = p;
  }
  get yAxisPadding() {
    return this.#yAxisPadding;
  }
  set yAxisType(t) {
    this.#yAxisType = YAXIS_TYPE.valid(t);
  }
  get yAxisType() {
    return this.#yAxisType;
  }
  set yAxisStep(s) {
    this.#yAxisStep = isNumber(s) ? s : YAXIS_STEP;
  }
  get yAxisStep() {
    return this.#yAxisStep;
  }
  set yAxisTicks(t) {
    this.#yAxisTicks = isNumber(t) ? t : 0;
  }
  get yAxisTicks() {
    return this.#yAxisTicks;
  }
  get yAxisGrads() {
    return this.#yAxisGrads;
  }
  get yAxisDigits() {
    return this.parent.digitCnt;
  }
  get step() {
    return this.#step;
  }
  set mode(m) {
    this.setMode(m);
  }
  get mode() {
    return this.#mode;
  }
  set offset(o) {
    this.setOffset(o);
  }
  get offset() {
    return this.#range.offset;
  }
  set zoom(z) {
    this.setZoom(z);
  }
  get zoom() {
    return this.#range.zoom;
  }
  getYAxisRatio() {
    return this.height / this.#range.diff;
  }
  getMaxMinDiff() {
    let max = this.#range.max > 0 ? this.#range.max : 1,
      min = this.#range.min > 0 ? this.#range.min : 0,
      chart = this.parent.parent,
      id = chart.view[0]?.id,
      mm = this.range.secondaryMaxMin || {},
      pane = this.#range;
    if (!chart.isPrimary && id in mm) {
      max = mm[id]?.data?.max || 0;
      min = mm[id]?.data?.min || 0;
      pane = mm[id]?.data || [];
    }
    if (max == min) {
      if (max == 0) {
        max = 0.05;
        min = -0.05;
      } else {
        max = max + max * 0.05;
        min = min + min * 0.05;
      }
    }
    if (this.mode != 'manual') {
      max *= this.#yAxisPadding || 1;
      min *= 1 - (this.#yAxisPadding - 1) || 1;
    }
    let diff = max - min;
    return { max, min, diff, pane };
  }
  yAxisRangeBounds() {}
  yAxisLog() {}
  yAxisCntDigits(value) {
    return countDigits(value);
  }
  yAxisCalcPrecision() {
    let integerCnt = numDigits(this.#range.max);
    return this.yDigits - integerCnt;
  }
  yAxisCursor() {}
  yPos(y) {
    let val;
    switch (this.yAxisType) {
      case YAXIS_TYPE.relative:
        val = this.val2Pixel(y);
        break;
      case YAXIS_TYPE.percent:
        val = this.p100toPixel(y);
        break;
      case YAXIS_TYPE.log:
        val = this.$2Pixel(log10(y));
        break;
      default:
        val = this.$2Pixel(y);
        break;
    }
    return bRound(val);
  }
  val2Pixel(y) {
    let p,
      chart = this.parent.parent;
    if (!chart.isPrimary) {
      let h = this.height,
        { min, diff } = this.getMaxMinDiff();
      p = h - h * ((y - min) / diff);
    } else {
      p = this.$2Pixel(y);
    }
    return p;
  }
  $2Pixel(y) {
    const height = y - this.#range.min;
    const yPos = this.height - height * this.yAxisRatio;
    return yPos;
  }
  lastYData2Pixel(y) {
    let height = y - this.core.stream.lastPriceMin;
    let yPos = this.height - height * this.yAxisRatio;
    return yPos;
  }
  p100toPixel(y) {
    return this.$2Pixel(y);
  }
  yPos2Price(y) {
    return this.pixel2$(y);
  }
  pixel2Val(y) {
    return this.pixel2$(y);
  }
  pixel2$(y) {
    let { min, diff } = this.getMaxMinDiff();
    let ratio = (this.height - y) / this.height;
    let adjust = diff * ratio;
    return min + adjust;
  }
  yAxisTransform() {}
  setMode(m) {
    if (!['automatic', 'manual'].includes(m)) return false;
    let t = this.#transform.manual;
    if (this.mode == 'automatic' && m == 'manual') {
      t.max = this.#range.valueMax;
      t.min = this.#range.valueMin;
      t.diff = t.max - t.min;
      t.zoom = 0;
      t.secondaryMaxMin = doStructuredClone(this.#range.secondaryMaxMin);
      this.#mode = m;
      this.core.emit('yaxis_setmode', { mode: m, axis: this });
    } else if (this.mode == 'manual' && m == 'automatic') {
      t.zoom = 0;
      this.#mode = m;
      this.core.emit('yaxis_setmode', { mode: m, axis: this });
    }
    return true;
  }
  transformPrimarySecondary() {
    let t = this.#transform.manual;
    if (
      this.#yAxisType != YAXIS_TYPE.percent &&
      !this.parent.parent.isPrimary
    ) {
      let { pane } = this.getMaxMinDiff();
      t = pane;
    }
    return t;
  }
  setOffset(o) {
    if (!isNumber(o) || o == 0 || this.#mode !== 'manual') return false;
    let t = this.transformPrimarySecondary();
    let max = this.pixel2Val(o * -1);
    let min = this.pixel2Val(this.height - o);
    let diff = max - min;
    t.min = min;
    t.max = max;
    t.mid = diff / 2;
    t.diff = diff;
    t.zoom = 0;
  }
  setZoom(z) {
    if (!isNumber(z) || this.#mode !== 'manual') return false;
    let t = this.#transform.manual;
    let { max, min, diff, pane } = this.getMaxMinDiff();
    const diff10P = diff * 0.01;
    const change = z * diff10P;
    min -= change;
    max += change;
    if (max < min || min <= Infinity * -1 || max >= Infinity) return;
    pane.min -= change;
    pane.max += change;
    t.max = max;
    t.min = min;
    t.mid = diff / 2;
    t.diff = diff;
    t.zoom = change;
  }
  setRange(range) {
    this.#transform.automatic.range = range;
    this.#range = new Proxy(range, {
      get: (obj, prop) => {
        const m = this.#mode;
        const t = this.#transform[m];
        const p = t[prop];
        switch (prop) {
          case 'max':
            return p;
          case 'min':
            return p;
          case 'mid':
            return t.min + (t.max - t.min);
          case 'diff':
            return t.max - t.min;
          case 'zoom':
            return p;
          case 'offset':
            return p;
          case 'secondaryMaxMin':
            return p;
          default:
            return obj[prop];
        }
      }
    });
  }
  calcGradations() {
    let mm, max, min, off;
    max = this.#range.max > 0 ? this.#range.max : 1;
    min = this.#range.min > 0 ? this.#range.min : 0;
    switch (this.yAxisType) {
      case YAXIS_TYPE.percent:
        max = this.#range.max > -10 ? this.#range.max : 110;
        min = this.#range.min > -10 ? this.#range.min : -10;
        break;
      case YAXIS_TYPE.relative:
        mm = this.getMaxMinDiff();
        max = mm.max;
        min = mm.min;
        break;
    }
    off = this.#range.offset;
    this.#yAxisGrads = this.gradations(max + off, min + off);
    return this.#yAxisGrads;
  }
  gradations(max, min, decimals = true) {
    let digits,
      scaleGrads = [],
      rangeH = max - min,
      niceNumber = this.niceNumber(rangeH),
      yStartRoundNumber = Math.ceil(min / niceNumber) * niceNumber,
      yEndRoundNumber = Math.floor(max / niceNumber) * niceNumber,
      pos = this.height,
      step = countDigits(niceNumber),
      nice;
    this.#step = step;
    for (var y = yStartRoundNumber; y <= yEndRoundNumber; y += niceNumber) {
      digits = countDigits(y);
      nice = limitPrecision(y, step.decimals) * 1;
      pos = this.yPos(nice);
      scaleGrads.push([nice, pos, digits]);
    }
    return scaleGrads;
  }
  niceNumber(rangeH = this.rangeH) {
    const yGridSize =
      rangeH /
      (this.height / (this.core.theme.yAxis.fontSize * YAxisFontSizeFactor));
    let niceNumber = Math.pow(10, Math.ceil(Math.log10(yGridSize)));
    if (yGridSize < 0.25 * niceNumber) niceNumber = 0.25 * niceNumber;
    else if (yGridSize < 0.5 * niceNumber) niceNumber = 0.5 * niceNumber;
    return niceNumber;
  }
}

function calcTextWidth(ctx, text) {
  return Math.round(ctx.measureText(text).width);
}
function createFont(
  fontSize = CanvasStyle.fontSize,
  fontWeight = CanvasStyle.fontWeight,
  fontFamily = CanvasStyle.fontFamily
) {
  return `${fontWeight} ${fontSize}px ${fontFamily}`;
}
function getTextRectWidth(ctx, text, opts) {
  ctx.font = createFont(opts?.fontSize, opts?.fontWeight, opts?.fontFamily);
  const textWidth = calcTextWidth(ctx, text);
  const paddingLeft = opts?.paddingLeft || 0;
  const paddingRight = opts?.paddingRight || 0;
  const borderWidth = opts?.borderWidth || 0;
  return paddingLeft + paddingRight + textWidth + borderWidth * 2;
}
function getTextRectHeight(opts) {
  const paddingTop = opts?.paddingTop || 0;
  const paddingBottom = opts?.paddingBottom || 0;
  const borderWidth = opts?.borderWidth || 0;
  const fontSize = opts?.fontSize || 0;
  return paddingTop + paddingBottom + fontSize + borderWidth * 2;
}
function renderText(ctx, x, y, opts) {
  ctx.fillStyle = opts?.colour;
  ctx.font = createFont(opts?.fontSize, opts?.fontWeight, opts?.fontFamily);
  ctx.textAlign = opts?.textAlign || 'start';
  ctx.textBaseline = opts?.textBaseLine || 'alphabetic';
  ctx.direction = opts?.direction || 'inherit';
  ctx.lineWidth = opts?.width;
  ctx.strokeStyle = opts?.border;
  if (opts?.stroke) ctx.strokeText(opts?.text, x, y, opts?.max);
  else ctx.fillText(opts?.text, x, y, opts?.max);
}
function renderTextBG(ctx, txt, x, y, opts) {
  ctx.save();
  ctx.font = createFont(opts?.fontSize, opts?.fontWeight, opts?.fontFamily);
  ctx.textBaseline = 'top';
  ctx.fillStyle = opts?.bakCol || CanvasStyle.bakCol;
  let width = opts?.width || getTextRectWidth(ctx, txt, opts);
  let height = opts?.height || getTextRectHeight(opts);
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = opts?.txtCol || CanvasStyle.txtCol;
  x = x + opts?.paddingLeft;
  y = y + opts?.paddingTop;
  ctx.fillText(`${txt}`, x, y);
  ctx.restore();
}

function renderRectStroke(ctx, x, y, w, h, opts) {
  ctx.lineWidth = opts?.width || CanvasStyle.borderWidth;
  ctx.strokeStyle = opts?.border || CanvasStyle.stroke;
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.stroke();
}
function renderRectFill(ctx, x, y, w, h, opts) {
  ctx.fillStyle = opts?.fill || CanvasStyle.fill;
  ctx.fillRect(x, y, w, h);
}
function renderRect(ctx, x, y, w, h, opts) {
  if (isString(opts.fill)) renderRectFill(ctx, x, y, w, h, opts);
  if (isNumber(opts.width) && opts.width > 0)
    renderRectStroke(ctx, x, y, w, h, opts);
}
function renderRectRoundStroke(ctx, x, y, w, h, r, opts) {
  ctx.lineWidth = opts?.width || CanvasStyle.borderWidth;
  ctx.strokeStyle = opts?.border || CanvasStyle.stroke;
  renderRectRoundPath(ctx, x, y, w, h, r);
  ctx.stroke();
}
function renderRectRoundFill(ctx, x, y, w, h, r, opts) {
  ctx.fillStyle = opts?.fill || CanvasStyle.fill;
  renderRectRoundPath(ctx, x, y, w, h, r);
  ctx.fill();
}
function renderRectRoundPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function renderRectRound(ctx, x, y, w, h, r, opts) {
  if (isString(opts.fill)) renderRectRoundFill(ctx, x, y, w, h, r, opts?.fill);
  if (isNumber(opts.width) && opts.width > 0)
    renderRectRoundStroke(ctx, x, y, w, h, r, opts?.border, opts?.width);
}

function linearGradient(ctx, grad = [], stops = []) {
  let [x1, y1, x2, y2] = grad;
  const grd = ctx.createLinearGradient(x1, y1, x2, y2);
  let i = 0;
  let step = 1 / (stops.length - 1);
  for (let stop of stops) {
    grd.addColorStop(i, stop);
    i += step;
  }
  ctx.fillStyle = grd;
}
function fillStroke(ctx, fill, stroke, width) {
  if (isString(fill)) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (isNumber(width) && width > 0) {
    ctx.lineWidth = width;
    ctx.strokeStyle = stroke || CanvasStyle.stroke;
    ctx.stroke();
  }
}

function renderPolygonRegular(ctx, x, y, radius, sides, rotateAngle, opts) {
  if (sides < 3) return;
  var a = (Math.PI * 2) / sides;
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate((rotateAngle * Math.PI) / 180);
  ctx.moveTo(radius, 0);
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
  }
  ctx.closePath();
  fillStroke(ctx, opts?.fill, opts?.stroke, opts?.width);
}
function renderPolygonIrregular(ctx, points, opts) {
  if (points.length > 0) {
    ctx.beginPath();
    var point = points[0];
    ctx.moveTo(point.x, point.y);
    for (var i = 1; i < points.length; ++i) {
      point = points[i];
      ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();
    fillStroke(ctx, opts?.fill, opts?.stroke, opts?.width);
  }
}
function renderTriangle(ctx, x, y, h, opts) {
  renderPolygonRegular(ctx, x, y, h, 3, opts?.rotate || 0, opts);
  fillStroke(ctx, opts?.fill, opts?.stroke, opts?.width);
}
function renderDiamond(ctx, x, y, w, h, opts) {
  ctx.beginPath();
  ctx.moveTo(x - w / 2, y);
  ctx.lineTo(x, y - h / 2);
  ctx.lineTo(x + w / 2, y);
  ctx.lineTo(x, y + h / 2);
  ctx.closePath();
  fillStroke(ctx, opts?.fill, opts?.stroke, opts?.width);
}

function renderPath(ctx, coords, style, strokeFill = () => {}) {
  ctx.save();
  const w = style.width || 1;
  ctx.lineWidth = w;
  if (w % 2) {
    ctx.translate(0.5, 0.5);
  }
  ctx.strokeStyle = style.stroke;
  let dash = style?.dash;
  if (isString(dash)) {
    dash = dash.split(',');
  }
  if (isArray(dash)) ctx.setLineDash(dash);
  ctx.beginPath();
  let move = true;
  coords.forEach((coord) => {
    if (coord && coord.x !== null) {
      if (move) {
        ctx.moveTo(coord.x, coord.y);
        move = false;
      } else {
        ctx.lineTo(coord.x, coord.y);
      }
    }
  });
  if (isFunction(strokeFill)) strokeFill();
  ctx.restore();
}
function renderPathStroke(ctx, coords, style) {
  renderPath(ctx, coords, style, () => {
    ctx.stroke();
  });
}
function renderPathClosed(ctx, coords, style, opts) {
  renderPath(ctx, coords, style, () => {
    ctx.closePath();
  });
  fillStroke(ctx, opts?.fill, opts?.stroke, opts?.size);
}
function renderSpline(ctx, points, tension) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  var t = tension != null ? tension : 1;
  for (var i = 0; i < points.length - 1; i++) {
    var p0 = i > 0 ? points[i - 1] : points[0];
    var p1 = points[i];
    var p2 = points[i + 1];
    var p3 = i != points.length - 2 ? points[i + 2] : p2;
    var cp1x = p1.x + ((p2.x - p0.x) / 6) * t;
    var cp1y = p1.y + ((p2.y - p0.y) / 6) * t;
    var cp2x = p2.x - ((p3.x - p1.x) / 6) * t;
    var cp2y = p2.y - ((p3.y - p1.y) / 6) * t;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }
  ctx.stroke();
}

function renderLineHorizontal(ctx, y, left, right, opts = {}) {
  const coords = [
    { x: left, y: y },
    { x: right, y: y }
  ];
  renderPath(ctx, coords, opts, () => {
    ctx.stroke();
    ctx.closePath();
  });
}
function renderLineVertical(ctx, x, top, bottom, opts = {}) {
  const coords = [
    { x: x, y: top },
    { x: x, y: bottom }
  ];
  renderPath(ctx, coords, opts, () => {
    ctx.stroke();
    ctx.closePath();
  });
}
function renderLine(ctx, coords, opts = {}) {
  renderPath(ctx, coords, opts, () => {
    ctx.stroke();
    ctx.closePath();
  });
}

function renderCircle(ctx, x, y, r, opts) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  fillStroke(ctx, opts?.fill, opts?.stroke, opts?.width);
}

function renderCheckerBoard(ctx, squareSize, rows, cols, odd, even) {
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      if ((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0))
        ctx.fillStyle = odd;
      else ctx.fillStyle = even;
      ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
    }
}

function chartBar(ctx) {
  renderRect(ctx, x, y, w, h, opts);
}

class EventHub {
  #hub = {};
  constructor() {}
  on(topic, handler, context) {
    if (!isString(topic) || !isFunction(handler)) return false;
    if (!this.#hub[topic]) this.#hub[topic] = [];
    this.#hub[topic].push({ handler, context });
    return true;
  }
  off(topic, handler, context) {
    if (!isString(topic) || !isFunction(handler) || !(topic in this.#hub))
      return false;
    const t = this.#hub[topic];
    for (let i = 0; i < t.length; i++) {
      if (t[i].handler === handler) {
        if (context !== undefined) {
          if (t[i].context !== context) continue;
        }
        t.splice(i, 1);
        if (t.length === 0) {
          delete this.#hub[topic];
          break;
        }
      }
    }
    return true;
  }
  expunge(context) {
    let topic,
      hub = this.#hub;
    for (topic in hub) {
      for (let i = 0; i < hub[topic].length; i++) {
        if (hub[topic][i].context === context) {
          hub[topic].splice(i, 1);
          if (hub[topic].length === 0) {
            delete hub[topic];
            break;
          }
        }
      }
    }
    return true;
  }
  emit(topic, data) {
    if (!isString(topic)) return;
    (this.#hub[topic] || []).forEach((cb) => {
      try {
        cb.handler.call(cb.context, data);
      } catch (e) {
        console.error(e);
      }
    });
  }
  execute(topic, data, cb) {}
}

class element extends HTMLElement {
  static #observedAttr = [];
  static set observedAttributes(a) {
    if (isArray(a)) element.#observedAttr = a;
  }
  static get observedAttributes() {
    return element.#observedAttr;
  }
  #shadowRoot;
  #template;
  #hub;
  constructor(template, mode = 'open') {
    super();
    this.ID = uid(SHORTNAME);
    this.doInit = true;
    this.DOM = {
      width: 0,
      height: 0,
      style: {}
    };
    this.oldDOM = {};
    this.subscribers = {
      resize: [],
      mutation: [],
      intersection: []
    };
    this.#hub = new EventHub();
    this.#template = template;
    this.#shadowRoot = this.attachShadow({ mode: mode });
  }
  destroy() {}
  connectedCallback(fn) {
    if (this.doInit) {
      this.doInit = false;
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
      this.DOM.width = this.clientWidth;
      this.DOM.height = this.clientHeight;
      this.oldDOM.width = this.clientWidth;
      this.oldDOM.height = this.clientHeight;
      this.intersectionObserver = new IntersectionObserver(
        this.onResize.bind(this)
      );
      this.intersectionObserver.observe(this);
      this.resizeObserver = new ResizeObserver(this.onResize.bind(this));
      this.resizeObserver.observe(this);
      if (isFunction(fn)) fn();
    }
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
  get shadowRoot() {
    return this.#shadowRoot;
  }
  get template() {
    return this.#template;
  }
  get hub() {
    return this.#hub;
  }
  get width() {
    return this.DOM.width;
  }
  set width(w) {
    this.setDim(w, 'width');
  }
  get oWidth() {
    return this.oldDOM.width;
  }
  get height() {
    return this.DOM.height;
  }
  set height(h) {
    this.setDim(h, 'height');
  }
  get oHeight() {
    return this.oldDOM.height;
  }
  get widthDeltaR() {
    return this.DOM.width / this.oldDOM.width;
  }
  get heightDeltaR() {
    return this.DOM.height / this.oldDOM.height;
  }
  set top(t) {
    this.setPos(t, 'top');
  }
  get top() {
    return this.DOM.top;
  }
  set left(l) {
    this.setPos(l, 'left');
  }
  get left() {
    return this.DOM.left;
  }
  set bottom(b) {
    this.setPos(b, 'bottom');
  }
  get bottom() {
    return this.DOM.bottom;
  }
  set right(r) {
    this.setPos(r, 'right');
  }
  get right() {
    return this.DOM.right;
  }
  get dimensions() {
    return this.DOM;
  }
  set cursor(c) {
    this.style.cursor = c;
  }
  get cursor() {
    return this.style.cursor;
  }
  setDim(v, d) {
    if (
      !['width', 'height', 'top', 'bottom', 'left', 'right'].includes(d) ||
      !isString(v)
    )
      return;
    if (isNumber(v)) {
      this.DOM[d] = v;
      v += 'px';
    } else if (isString(v)) {
      if (!v.match(CSSUNITS)) v = '100%';
    } else {
      this.DOM[d] = this.parentElement.getBoundingClientRect()[d];
      v = this.DOM[d] + 'px';
    }
    this.style[d] = v;
  }
  setPos(v, d) {
    this.setDim(v, d);
  }
  getDims() {
    const rect = this.getBoundingClientRect();
    for (let k in rect) {
      const v = rect[k];
      if (!isFunction(v)) this.DOM[k] = v;
    }
    this.DOM.visible = isVisible(this);
    this.DOM.viewport = isInViewport(this);
    return this.DOM;
  }
  onIntersection(i) {
    this.emit('intersection', this);
  }
  onMutation(m) {
    this.emit('mutation', this);
  }
  onResize(r) {
    this.oldDOM = { ...this.DOM };
    this.getDims();
    this.emit('resize', this.DOM);
  }
  on(topic, handler, context = this) {
    if (!(this.#hub instanceof EventHub)) return false;
    return this.#hub.on(topic, handler, context);
  }
  off(topic, handler, context = this) {
    if (!(this.#hub instanceof EventHub)) return false;
    return this.#hub.off(topic, handler, context);
  }
  expunge(context) {
    if (!(this.#hub instanceof EventHub)) return false;
    return this.#hub.expunge(context);
  }
  emit(topic, data) {
    if (!(this.#hub instanceof EventHub)) return false;
    return this.#hub.emit(topic, data);
  }
}

const template$g = document.createElement('template');
template$g.innerHTML = `
<style>
  input[type="range"][orient="vertical"] {
    writing-mode: bt-lr;
    appearance: slider-vertical;
    padding: 0;
    margin: 0;
    border: 0;
  }
</style>
<div class="slider">
</div>
`;
const attrList = ['min', 'max', 'value', 'step', 'orient', 'width', 'height'];
class tradexSlider extends element {
  #id;
  #elSlider;
  #elSliderInput;
  #sliderCnt = 1;
  #orient;
  #attributes = {};
  constructor() {
    super(template$g);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      for (let a of attrList) {
        let attr = this.getAttribute(a);
        if (!!attr) this.#attributes[a] = attr;
      }
      this.#elSlider = this.shadowRoot.querySelector('.slider');
      this.mount();
      this.#elSliderInput = this.shadowRoot.querySelector('#s1');
      this.#elSliderInput.addEventListener(
        'input',
        this.#onSliderChange.bind(this)
      );
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  set value(v) {
    this.#attributes.value = v;
  }
  get value() {
    return this.#attributes.value;
  }
  set min(m) {
    this.#attributes.min = m;
  }
  get min() {
    return this.#attributes.min;
  }
  set max(m) {
    this.#attributes.max = m;
  }
  get max() {
    return this.#attributes.max;
  }
  set step(s) {
    this.#attributes.step = s;
  }
  get step() {
    return this.#attributes.step;
  }
  #onSliderChange(e) {
    this.value = e.target.value;
    const onChange = new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      cancelable: true,
      composed: false
    });
    this.dispatchEvent(onChange);
  }
  mount() {
    const id = `s${this.#sliderCnt}`;
    const klass = ``;
    const params = { id, klass, ...this.#attributes };
    this.#elSlider.innerHTML = this.insertRange(params);
  }
  insertRange({ id, klass, min, max, value, step, orient, width, height }) {
    let style = ``;
    style += !!width ? `width: ${width}px; ` : ``;
    style += !!height ? `height: ${height}px; ` : ``;
    return `<input type="range" id="${id}" class="${klass}" style="${style}" min="${min}" max="${max}" value="${value}" step="${step}" orient="${orient}" width="${width}" height="${height}"/>`;
  }
}
customElements.get('tradex-slider') ||
  window.customElements.define('tradex-slider', tradexSlider);

const composition = [
  'source-over',
  'source-atop',
  'source-in',
  'source-out',
  'destination-over',
  'destination-atop',
  'destination-in',
  'destination-out',
  'lighter',
  'copy',
  'xor',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity'
];
const _OffscreenCanvas = typeof OffscreenCanvas !== 'undefined' ? true : false;
const contextTypes = [
  '2d',
  'webgl',
  'webgl2d',
  'webgl2',
  'webgpu',
  'bitmaprenderer'
];
let Node$1 = class Node {
  #key = 0;
  #id;
  #scene;
  #layers;
  #container;
  constructor(cfg = {}) {
    if (!isHTMLElement(cfg?.container))
      throw new Error('Viewport container is not a valid HTML element.');
    this.#container = cfg.container;
    this.#layers = [];
    this.#id = CEL.idCnt++;
    this.#scene = new CEL.Scene(cfg);
    let { width: w, height: h } = sizeSanitize(
      cfg?.width || 0,
      cfg?.height || 0
    );
    this.setSize(w, h);
  }
  get id() {
    return this.#id;
  }
  get scene() {
    return this.#scene;
  }
  get layers() {
    return this.#layers;
  }
  get container() {
    return this.#container;
  }
  get OffscreenCanvas() {
    return _OffscreenCanvas;
  }
  generateKey() {
    return this.#key++;
  }
  setSize(width, height) {
    let { width: w, height: h } = sizeSanitize(width, height);
    this.width = w;
    this.height = h;
    this.scene.setSize(w, h);
    this.layers.forEach(function (layer) {
      layer.setSize(w, h);
    });
    return this;
  }
  addLayer(layer) {
    if (!(layer instanceof Layer)) return false;
    this.layers.push(layer);
    layer.setSize(layer.width || this.width, layer.height || this.height);
    layer.viewport = this;
    return this;
  }
  removeLayer(layer) {
    if (!(layer instanceof Layer)) return false;
    this.layers.splice(layer.index, 1);
    return true;
  }
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
  destroy() {
    for (let layer of this.layers) {
      this.removeLayer(layer);
      layer.destroy();
    }
  }
  render(all = false) {
    let { scene, layers } = this,
      layer;
    scene.clear();
    for (layer of layers) {
      if (all && isArray(layer.layers) && layer.layers.length > 0)
        layer.render(all);
      if (layer.visible && layer.width > 0 && layer.height > 0) {
        const ctx = scene.context;
        if (composition.includes(layer?.composition))
          ctx.globalCompositeOperation = layer.composition;
        ctx.globalAlpha = layer.alpha;
        ctx.scale(1, 1);
        ctx.drawImage(
          layer.scene.canvas,
          layer.x,
          layer.y,
          layer.width,
          layer.height
        );
      }
    }
  }
};
class Viewport extends Node$1 {
  constructor(cfg = {}) {
    const cfg2 = { ...cfg };
    cfg2.offscreen = false;
    super(cfg2);
    const canvas = this.scene.canvas;
    const c = cfg.container;
    if (c?.hasCanvasSlot) canvas.slot = 'viewportCanvas';
    c.innerHTML = '';
    c.appendChild(canvas);
    CEL.viewports.push(this);
  }
  destroy() {
    super.destroy();
    this.container.innerHTML = '';
    CEL.viewports.splice(this.index, 1);
  }
}
class Layer {
  #x = 0;
  #y = 0;
  #width = 0;
  #height = 0;
  #alpha = 1;
  #visible = true;
  #composition = null;
  #offScreen = _OffscreenCanvas;
  constructor(cfg = {}) {
    const c = { ...cfg };
    this.id = CEL.idCnt++;
    this.#offScreen = isBoolean(cfg?.offscreen)
      ? cfg.offscreen
      : this.#offScreen;
    c.layer = this;
    c.offscreen = this.#offScreen;
    this.hit = new CEL.Hit(c);
    this.scene = new CEL.Scene(c);
    if (cfg?.x && cfg?.y) {
      this.setPosition(cfg.x, cfg.y);
    }
    if (cfg?.width && cfg?.height) {
      this.setSize(cfg.width, cfg.height);
    }
    if (cfg?.composition) {
      this.setComposition = cfg.composition;
    }
    if (cfg?.alpha) {
      this.alpha = cfg.alpha;
    }
    if (cfg?.visible) {
      this.visible = cfg.visible;
    }
  }
  set x(x) {
    if (isNumber(x)) this.#x = x;
  }
  get x() {
    return this.#x;
  }
  set y(y) {
    if (isNumber(y)) this.#y = y;
  }
  get y() {
    return this.#y;
  }
  set width(width) {
    if (isNumber(width)) this.#width = width;
  }
  get width() {
    return this.#width;
  }
  set height(height) {
    if (isNumber(height)) this.#height = height;
  }
  get height() {
    return this.#height;
  }
  set alpha(alpha) {
    this.#alpha = isNumber(alpha) ? limit(alpha, 0, 1) : 1;
  }
  get alpha() {
    return this.#alpha;
  }
  set composition(c) {
    if (composition.includes(c)) this.#composition = c;
  }
  get composition() {
    return this.#composition;
  }
  set visible(v) {
    if (isBoolean(v)) this.#visible = v;
  }
  get visible() {
    return this.#visible;
  }
  get isOffScreen() {
    return this.#offScreen;
  }
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
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  setSize(width, height) {
    let { width: w, height: h } = sizeSanitize(width, height);
    this.width = w;
    this.height = h;
    this.scene.setSize(w, h);
    this.hit.setSize(w, h);
    return this;
  }
  move(pos) {
    let { index = 0, viewport } = this,
      layers = viewport.layers,
      order;
    if (typeof pos === 'number') {
      order = limit(
        Math.floor(pos),
        (layers.length - 1) * -1,
        layers.length - 1
      );
      pos = 'order';
    }
    switch (pos) {
      case 'up':
        if (index < layers.length - 1) {
          layers[index] = layers[index + 1];
          layers[index + 1] = this;
        }
        break;
      case 'down':
        if (index > 0) {
          layers[index] = layers[index - 1];
          layers[index - 1] = this;
        }
        break;
      case 'top':
        layers.splice(index, 1);
        layers.push(this);
        break;
      case 'bottom':
        layers.splice(index, 1);
        layers.unshift(this);
        break;
      case 'order':
        arrayMove(layers, this.index, order);
        break;
    }
    return this;
  }
  moveUp() {
    return this.move('up');
  }
  moveDown() {
    return this.move('down');
  }
  moveTop() {
    return this.move('top');
  }
  moveBottom() {
    return this.move('bottom');
  }
  remove() {
    return this.viewport.removeLayer(this);
  }
  destroy() {
    setSize(1, 1);
    this.scene.clear();
    this.hit.clear();
  }
}
class Foundation {
  #id;
  #width = 0;
  #height = 0;
  #canvas;
  #offscreen = true;
  #context;
  #contextType;
  #layer;
  constructor(cfg = { offscreen: true }) {
    this.#id = CEL.idCnt++;
    this.#layer = cfg?.layer;
    this.#contextType = contextTypes.includes(cfg?.contextType)
      ? cfg.contextType
      : '2d';
    const canvas = document.createElement('canvas');
    canvas.className = 'scene-canvas';
    canvas.style.display = 'block';
    cfg.offscreen = isBoolean(cfg?.offscreen) ? cfg.offscreen : true;
    if (_OffscreenCanvas && cfg.offscreen) {
      this.#canvas = canvas.transferControlToOffscreen();
      this.#offscreen = true;
    } else {
      this.#canvas = canvas;
      this.#offscreen = false;
    }
    if (this.#contextType == 'webgl2d') this.#context = this.getContext('2d');
    else this.#context = this.getContext(this.contextType);
    if (!!cfg?.width && !!cfg?.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }
  get id() {
    return this.#id;
  }
  set width(width) {
    if (isNumber(width)) this.#width = width;
  }
  get width() {
    return this.#width;
  }
  set height(height) {
    if (isNumber(height)) this.#height = height;
  }
  get height() {
    return this.#height;
  }
  get canvas() {
    return this.#canvas;
  }
  get offscreen() {
    return this.#offscreen;
  }
  get contextType() {
    return this.#contextType;
  }
  get context() {
    return this.#context;
  }
  get layer() {
    return this.#layer;
  }
  setSize(width, height) {
    return setSize(width, height, this);
  }
  clear() {
    return clear(this);
  }
}
class Scene extends Foundation {
  constructor(cfg = { offscreen: true }) {
    super(cfg);
  }
  getContext(type) {
    return this.canvas.getContext(type);
  }
  toImage(type = 'image/png', quality, cb) {
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
  export(cfg, cb, type = 'image/png', quality) {
    if (typeof cb !== 'function') cb = this.blobCallback.bind({ cfg: cfg });
    this.canvas.toBlob(cb, type, quality);
  }
  exportHit(cfg, cb, type = 'image/png', quality) {
    if (typeof cb !== 'function') cb = this.blobCallback.bind({ cfg });
    this.layer.hit.canvas.toBlob(cb, type, quality);
  }
  blobCallback(blob) {
    let anchor = document.createElement('a'),
      dataUrl = URL.createObjectURL(blob),
      fileName = this.cfg.fileName || 'canvas.png';
    anchor.setAttribute('href', dataUrl);
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('download', fileName);
    if (document.createEvent) {
      Object.assign(document.createElement('a'), {
        href: dataUrl,
        target: '_blank',
        download: fileName
      }).click();
    } else if (anchor.click) {
      anchor.click();
    }
  }
}
class Hit extends Foundation {
  constructor(cfg = {}) {
    super(cfg);
  }
  getContext(type) {
    return this.canvas.getContext(type, {
      preserveDrawingBuffer: true,
      antialias: false
    });
  }
  getIntersection(x, y) {
    let ctx = this.context,
      data;
    x = Math.round(x - this.layer.x);
    y = Math.round(y - this.layer.y);
    if (x < 0 || y < 0 || x > this.width || y > this.height) {
      return -1;
    }
    if (this.contextType === '2d') {
      data = ctx.getImageData(x, y, 1, 1).data;
      if (data[3] < 255) {
        return -1;
      }
    } else {
      data = new Uint8Array(4);
      ctx.readPixels(
        x * CEL.pixelRatio,
        (this.height - y - 1) * CEL.pixelRatio,
        1,
        1,
        ctx.RGBA,
        ctx.UNSIGNED_BYTE,
        data
      );
      if (data[0] === 255 && data[1] === 255 && data[2] === 255) {
        return -1;
      }
    }
    return this.rgbToInt(data);
  }
  getIndexValue(index) {
    let rgb = this.intToRGB(index);
    return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
  }
  rgbToInt(rgb) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    return (r << 16) + (g << 8) + b;
  }
  intToRGB(number) {
    let r = (number & 0xff0000) >> 16;
    let g = (number & 0x00ff00) >> 8;
    let b = number & 0x0000ff;
    return [r, g, b];
  }
}
function clear(that) {
  let context = that.context;
  if (that.contextType === '2d') {
    context.scale(1, 1);
    context.clearRect(0, 0, that.width, that.height);
  } else {
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
  }
  return that;
}
function sizeSanitize(width, height) {
  if (width < 0) width = 0;
  if (height < 0) height = 0;
  return { width, height };
}
function setSize(width, height, that, ratio = true) {
  let { width: w, height: h } = sizeSanitize(width, height);
  that.width = w;
  that.height = h;
  that.canvas.width = w * CEL.pixelRatio;
  that.canvas.height = h * CEL.pixelRatio;
  if (!that.offscreen) {
    that.canvas.style.width = `${w}px`;
    that.canvas.style.height = `${h}px`;
  } else {
    that.canvas.width = w;
    that.canvas.height = h;
  }
  if (that.contextType !== '2d' && that.contextType !== 'bitmaprenderer') {
    that.context.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }
  if (
    ratio &&
    that.contextType === '2d' &&
    CEL.pixelRatio !== 1 &&
    !that.offscreen
  ) {
    that.context.scale(CEL.pixelRatio, CEL.pixelRatio);
  }
  return that;
}
const CEL = {
  idCnt: 0,
  viewports: [],
  pixelRatio: (window && window.devicePixelRatio) || 1,
  Node: Node$1,
  Viewport,
  Layer,
  Scene,
  Hit
};

const MIXERSIZE = 128;
const sliderW = 20;
const colours2 = [
  '#263238',
  '#B71C1C',
  '#BF360C',
  '#FF6F00',
  '#827717',
  '#194D33',
  '#006064',
  '#0D47A1',
  '#311B92',
  '#880E4F',
  '#455A64',
  '#D32F2F',
  '#E64A19',
  '#FFA000',
  '#AFB42B',
  '#388E3C',
  '#0097A7',
  '#1976D2',
  '#512DA8',
  '#C2185B',
  '#607D8B',
  '#F44336',
  '#FF5722',
  '#FFC107',
  '#CDDC39',
  '#4CAF50',
  '#00BCD4',
  '#2196F3',
  '#673AB7',
  '#E91E63',
  '#90A4AE',
  '#E57373',
  '#FF8A65',
  '#FFD54F',
  '#DCE775',
  '#81C784',
  '#4DD0E1',
  '#64B5F6',
  '#9575CD',
  '#F06292',
  '#CFD8DC',
  '#FFCDD2',
  '#FFCCBC',
  '#FFECB3',
  '#F0F4C3',
  '#C8E6C9',
  '#B2EBF2',
  '#BBDEFB',
  '#D1C4E9',
  '#F8BBD0'
];
const template$f = document.createElement('template');
template$f.innerHTML = `
<style>
  .colourpicker {
    display: grid;
    grid-template-columns: [first] ${MIXERSIZE}px [second] ${sliderW}px;
    grid-template-rows: [mixer] 2em [fields] 2em [swatches] 1fr;
    row-gap: 5px;
    border: 1px solid #aaa;
    border-radius: 5px;
    box-shadow: ${WindowStyle.SHADOW};
    background: #ccc;
    color: #444;
    padding: 5px;
  }
  .hex {
    font-weight: bold;
  }
  .number {
    width: 2em;
  }
  .colval {
    width: 6em;
  }

  .default .mixer {
    display: none;
  }

  .mixer {
    position: relative;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  .mixer .viewport {
    position: absolute;
  }
  .mixer .checks {
    top: 0;
    left: 0;
  }
  .mixer .rgbv {
    top: 0;
    left: 0;
    opacity: 1;
  }

  .palette {
    grid-column-start: 1;
    grid-column-end: span 2;
    grid-row-start: 3;
    display: flex;
    width: 150px;
    flex-flow: wrap;
    justify-content: space-around;
    row-gap: 2px;
    column-gap: 2px;
  }
  .palette button {
    width: 12px;
    height: 12px;
    border: 1px;
    border-radius: 3px;
  }

  tradex-slider[orient="vertical"] {
    grid-column-start: 2;
    grid-row-start: 1;
    grid-row-end: span 3;
    width: ${sliderW}px;
  }
  tradex-slider[orient="horizontal"] {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    width: ${sliderW}px;
  }

  span {
    grid-column-start: 2;
    grid-row-start: 1;
    padding-left: .5em;
    padding-top: .25em;
    font-weight: bold;
  }

  .fields {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .fields input {
    border: 1px solid #888;
    border-radius: 3px;
    font-size: ${GlobalStyle.FONTSIZE};
  }

</style>
<div class="colourpicker default">
  <tradex-slider max="255" min="0" step="1" value="255" orient="horizontal" width="${MIXERSIZE}" ></tradex-slider>
  <span>A</span>
  <div class="fields">
    <input type="text" class="colval"/>
    <button class="submit ok">OK</button>
  </div>
</div>
`;
class PickerState {
  static {
    this.opened = new PickerState('opened');
  }
  static {
    this.active = new PickerState('active');
  }
  static {
    this.closed = new PickerState('closed');
  }
  constructor(name) {
    this.name = name;
  }
}
class tradeXColourPicker extends element {
  #picker;
  #elMixer;
  #elPalette;
  #elValue;
  #elModel;
  #elRGB;
  #elAlpha;
  #elSubmit;
  #elR;
  #elG;
  #elB;
  #elA;
  #elColVal;
  #elRGBV;
  #elChecker;
  #elASlider;
  #canvas = {
    size: MIXERSIZE
  };
  #colour;
  #target;
  #windowEvents = {};
  #state = PickerState.closed;
  #config = { cfg: 'default' };
  constructor() {
    super(template$f);
  }
  destroy() {
    this.#picker.remove();
  }
  connectedCallback() {
    super.connectedCallback(() => {
      this.#colour = new Colour('#f00');
      this.#picker = this.shadowRoot.querySelector('.colourpicker');
      this.build();
      this.#elMixer = this.shadowRoot.querySelector('.mixer');
      this.#elPalette = this.shadowRoot.querySelector('.palette');
      this.#elAlpha = this.shadowRoot.querySelector('.alpha');
      this.#elSubmit = this.shadowRoot.querySelector('.submit');
      this.#elColVal = this.shadowRoot.querySelector('.colval');
      this.#elRGBV = this.shadowRoot.querySelector('.rgbv');
      this.#elChecker = this.shadowRoot.querySelector('.checker');
      this.#elASlider = this.shadowRoot.querySelector('tradex-slider');
      const onColValChange = (e) => {
        this.setColour(e.target.value);
        this.#target.dispatchEvent(new Event('change'));
      };
      this.#elColVal.addEventListener('change', onColValChange);
      this.#elSubmit.addEventListener('click', this.close.bind(this));
      this.#elASlider.addEventListener(
        'input',
        this.#onASliderChange.bind(this)
      );
      this.#elASlider.addEventListener(
        'pointerup',
        this.#onASliderChange.bind(this)
      );
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  get elMixer() {
    return this.#elMixer;
  }
  get elPalette() {
    return this.#elPalette;
  }
  get elColVal() {
    return this.#elColVal;
  }
  get elModel() {
    return this.#elModel;
  }
  get elRGB() {
    return this.#elRGB;
  }
  get elAlpha() {
    return this.#elAlpha;
  }
  get elSubmit() {
    return this.#elSubmit;
  }
  set colour(c) {
    this.setColour(c);
  }
  get colour() {
    return this.#colour;
  }
  set target(t) {
    this.#target = t;
  }
  get target() {
    return this.#target;
  }
  set state(s) {
    if (s instanceof PickerState) this.#state = s;
  }
  get state() {
    return this.#state;
  }
  setColour(c) {
    let colour;
    if (!isString(c)) return false;
    colour = new Colour(c);
    if (colour.isValid) {
      this.#colour = colour;
      this.#elColVal.value = colour.value.hexa;
      this.#elASlider.value = Math.floor(255 * colour.value.a);
      if (isHTMLElement(this.#target)) {
        this.#target.value = colour.value.hexa;
        this.#target.dispatchEvent(new Event('change'));
      }
      this.#elRGBV.style.opacity = colour.value.a;
      return true;
    } else return false;
  }
  setAlpha(a) {
    let x = (a * 1).toString(16).toUpperCase();
    x = ('00' + x).slice(-2);
    let rgba = this.#colour.hex + x;
    this.setColour(rgba);
  }
  #onASliderChange(v) {
    this.setAlpha(v.target.value);
  }
  onOutsideClickListener(e) {
    if (!this.contains(e.target) && this.state === PickerState.opened) {
      this.state = PickerState.active;
      this.classList.toggle('active');
      document.removeEventListener('click', this.#windowEvents.click);
      delete this.#windowEvents.click;
    }
    if (
      !this.contains(e.target) &&
      e.target?.type === 'color' &&
      (this.state === PickerState.closed || this.state === PickerState.active)
    ) {
      this.state = PickerState.opened;
      this.classList.add('active');
      this.setColour(e.target.value);
      e.preventDefault();
    } else if (
      !this.contains(e.target) &&
      e.target.tagName === 'LABEL' &&
      this.state === PickerState.closed
    ) {
      const id = e.target.htmlFor;
      const target = e.target.parentElement.querySelector(`#${id}`);
      if (target?.type === 'color') {
        this.state = PickerState.opened;
        this.classList.add('active');
        this.setColour(target.value);
        e.preventDefault();
      }
    } else if (
      !this.contains(e.target) &&
      e.target.tagName === 'LABEL' &&
      this.state === PickerState.opened
    ) {
      this.state = PickerState.closed;
      this.classList.remove('active');
      e.preventDefault();
    } else if (!this.contains(e.target)) {
      this.state = PickerState.closed;
      this.classList.remove('active');
    }
  }
  onCanvasClick(e) {
    const x = e.clientX;
    const y = e.clientY;
    const i = this.#canvas.mixer.layers.rgbv.hit.getIntersection(x, y);
    const c = this.#canvas.mixer.layers.rgbv.hit.getIndexValue(i);
    console.log(c);
  }
  position(x, y, container) {
    if (!isNumber(x) || !isNumber(y) || !isHTMLElement(container)) return false;
    this.top = y;
    this.left = x;
  }
  open(colour, target, config) {
    if (this.state !== PickerState.closed) return false;
    if (config?.cfg == 'gradient');
    else {
      this.#config.cfg == 'default';
      this.#elASlider.setAttribute('orient', 'horizontal');
      this.#elASlider.setAttribute('width', MIXERSIZE);
      this.#elASlider.setAttribute('height', '');
    }
    this.setColour(colour);
    this.target = target;
    this.state = PickerState.opened;
    this.classList.add('active');
    setTimeout(() => {
      this.#windowEvents.click = this.onOutsideClickListener.bind(this);
      document.addEventListener('click', this.#windowEvents.click);
    }, 250);
    return true;
  }
  close() {
    this.state = PickerState.closed;
    this.classList.remove('active');
  }
  build() {
    this.#picker.appendChild(this.mixerNode());
    this.#picker.appendChild(this.paletteNode());
  }
  paletteNode() {
    let palette = '';
    for (let c of colours2) {
      palette += `<button style="background: ${c};" data-colour="${c}"></button>`;
    }
    const container = document.createElement('div');
    container.classList.add('palette');
    container.style.display = 'flex';
    container.innerHTML = palette;
    const swatches = container.querySelectorAll('button');
    for (let s of swatches) {
      s.addEventListener('click', (e) => {
        const colour = e.target.getAttribute('data-colour');
        this.colour = colour;
        this.#target.value = colour;
        this.#target.dispatchEvent(new Event('change'));
      });
    }
    return container;
  }
  mixerNode() {
    return this.canvasNode('mixer');
  }
  canvasNode(type) {
    const element = document.createElement('div');
    element.classList.add(type);
    element.addEventListener('click', this.onCanvasClick.bind(this));
    const viewport = this.viewportNode('checks');
    element.appendChild(viewport.container);
    const viewport2 = this.viewportNode('rgbv');
    element.appendChild(viewport2.container);
    viewport.container.style.cursor = 'url(), 0, 0, copy';
    const view = viewport.viewport;
    const view2 = viewport2.viewport;
    const layers = {};
    const size = this.#canvas.size;
    const cfg = { x: 0, y: 0, width: size, height: size };
    this.#canvas.layers = layers;
    this.#canvas.view = view;
    layers.grid = new CEL.Layer(cfg);
    view.addLayer(layers.grid);
    layers.rgbv = new CEL.Layer(cfg);
    view2.addLayer(layers.rgbv);
    this.#canvas[type] = { element, viewport, layers };
    let ctx = layers.rgbv.scene.context;
    let grd = [0, 0, size, 0];
    linearGradient(ctx, grd, [
      '#f00f',
      '#ff0f',
      '#0f0f',
      '#0fff',
      '#00ff',
      '#f0ff',
      '#f00f'
    ]);
    ctx.fillRect(0, 0, size, size);
    ctx = layers.rgbv.scene.context;
    grd = [0, 0, 0, size];
    linearGradient(ctx, grd, ['#fff', '#0000', '#000']);
    ctx.fillRect(0, 0, size, size);
    ctx = layers.grid.scene.context;
    renderCheckerBoard(ctx, 8, 16, 16, '#fff', '#ccc');
    view.render();
    view2.render();
    return element;
  }
  viewportNode(id) {
    const container = document.createElement('div');
    container.classList.add('viewport');
    container.classList.add(id);
    const viewport = new CEL.Viewport({
      width: this.#canvas.size,
      height: this.#canvas.size,
      container
    });
    const canvas = viewport.scene.canvas;
    return { viewport, container, canvas };
  }
  colourValueNode() {
    let c = ``;
    return c;
  }
  colourModelNode() {
    let m = ``;
    return m;
  }
  rgbSliderNode() {
    let n = ``;
    return n;
  }
  alphaSliderNode() {
    let n = ``;
    return n;
  }
  submitNode() {
    let n = ``;
    return n;
  }
  gradient(ctx, col1, col2, end) {
    let grad = [0, 0, 0, 0];
    let stop = [col1, col2];
    linearGradient(ctx, grad, stop);
  }
  compositeLayers() {
    const layers = this.#canvas.layers;
    const layer = ['rgb', 'value'];
    const ctx = layers.rgbv.scene.context;
    for (let l of layer) {
      ctx.drawImage(
        layers[l].scene.canvas,
        layers[l].x,
        layers[l].y,
        layers[l].width,
        layers[l].height
      );
    }
    const ctx2 = layers.composite.scene.context;
    const l = 'rgbv';
    ctx2.globalAlpha = 1 / (255 / this.#colour.a);
    ctx2.drawImage(
      layers[l].scene.canvas,
      layers[l].x,
      layers[l].y,
      layers[l].width,
      layers[l].height
    );
  }
  inputColorUpgrade(el) {
    if (!isHTMLElement(el)) return false;
    const replacement = this.inputColorReplacement();
    el.style.display = 'none';
    el.insert.insertAdjacentElement('afterend', replacement);
  }
  inputColorReplacement() {}
}
customElements.get('tradex-colourpicker') ||
  window.customElements.define('tradex-colourpicker', tradeXColourPicker);
const template2 = document.createElement('template');
const width = 24;
const height = width;
template2.innerHTML = `
<style>
  .swatch {
    display: inline-block;
    position: relative;
  }
  .swatch,
  .swatch .overlay {
    width: ${width}px;
    height: ${height}px;
  }
  .swatch canvas,
  .swatch .overlay {
    position: absolute;
    top: 0;
    left: 0;
  }
  input {
    width: 6em;
    vertical-align: super;
  }
  tradex-colourpicker {
    display: none;
    position: absolute;
    z-index: 1;
  }
  tradex-colourpicker.active {
    display: block;
  }
</style>
<div class="colourInput">
  <div class="swatch">
    <canvas width="${width}" height="${height}"></canvas>
    <div class="overlay"></div>
  </div>
  <input minlength="4" maxlength="9" pattern="#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})">
  <tradex-colourpicker></tradex-colourpicker>
</div>
`;
class tradeXColourInput extends element {
  #target;
  #swatch;
  #canvas;
  #overlay;
  #input;
  #picker;
  constructor() {
    super(template2);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#picker = this.shadowRoot.querySelector('tradex-colourpicker');
      this.#picker.style.display = '';
      this.#swatch = this.shadowRoot.querySelector('.swatch');
      this.#canvas = this.shadowRoot.querySelector('canvas');
      this.#overlay = this.shadowRoot.querySelector('.overlay');
      this.#input = this.shadowRoot.querySelector('input');
      this.height = this.getAttribute('height') * 1 || this.height;
      this.width = this.getAttribute('width') * 1 || this.width;
      this.setTarget();
      this.eventsListen();
      const ctx = this.#canvas.getContext('2d');
      renderCheckerBoard(ctx, 8, 16, 16, '#fff', '#ccc');
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.#target.removeEventListener('change', this.onTargetChange.bind(this));
  }
  set target(t) {
    if (isString(t)) this.setTarget(t);
  }
  get target() {
    return this.#target;
  }
  setTarget(t) {
    if (isHTMLElement(this.#target))
      this.#target.removeEventListener(
        'change',
        this.onTargetChange.bind(this)
      );
    if (isString(t)) {
      this.#target = document.getElementById(t);
      this.setAttribute('target', t);
    } else if (isHTMLElement(t)) {
      this.#target = t;
      this.setAttribute('target', t.id);
    } else return false;
    const target = this.#target;
    if (isHTMLElement(target) && target.type == 'text') {
      const id = target.id;
      const parent = target.parentElement;
      const value = target.value;
      const input = `
            <input type="text" id="${id}" minlength="4" maxlength="9" style="display:none" value="${value}"/>
            `;
      target.insertAdjacentElement('afterend', this);
      target.insertAdjacentHTML('beforebegin', input);
      target.id = '';
      const newTarget = parent.querySelector(`#${id}`);
      newTarget.addEventListener('change', this.onTargetChange.bind(this));
      this.#input.value = value;
      this.#overlay.style.background = value;
      this.#picker.setColour(value);
      this.#target.remove();
      this.#target = newTarget;
      return true;
    }
    return false;
  }
  eventsListen() {
    this.#swatch.addEventListener('click', this.onSwatchClick.bind(this));
  }
  onSwatchClick(e) {
    this.openPicker();
  }
  onTargetChange(e) {
    const value = new String(e.target.value);
    if (value !== this.#picker.colour.value.rgba) {
      this.#picker.setColour(value);
      this.#input.value = value;
      this.#overlay.style.background = value;
    }
  }
  openPicker() {
    this.#picker.open(this.#target.value, this.#target);
  }
  closePicker() {
    this.#picker.close();
  }
}
customElements.get('tradex-colourinput') ||
  window.customElements.define('tradex-colourinput', tradeXColourInput);

const RGBAHex = `#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})`;
const isHex = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const isHSL =
  /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/;
const isHSLA =
  /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
const isRGB =
  /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/;
const isRGBA =
  /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class Colour {
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
    hex: null,
    hexa: null,
    hsl: null,
    hsla: null,
    rgb: null,
    rgba: null,
    isValid: false
  };
  constructor(colour) {
    this.#validate(colour);
    if (isHex.test(colour)) this.#valueIsHex(colour);
    if (isHSL.test(colour)) this.#valueIsHSL(colour);
    if (isHSLA.test(colour)) this.#valueIsHSLA(colour);
    if (isRGB.test(colour)) this.#valueIsRGB(colour);
    if (isRGBA.test(colour)) this.#valueIsRGBA(colour);
  }
  get value() {
    return this.#value;
  }
  get isValid() {
    return this.#value.isValid;
  }
  get hex() {
    return this.#value.hex;
  }
  get hexa() {
    return this.#value.hexa;
  }
  #validate(colour) {
    if (!isString(colour)) {
      this.#value.isValid = false;
      return;
    }
    if (isBrowser) {
      let el = document.getElementById('divValidColourTest');
      if (!el) {
        el = document.createElement('div');
        el.id = 'divValidColourTest';
      }
      el.style.backgroundColor = '';
      el.style.backgroundColor = colour;
      this.#value.isValid = el.style.backgroundColor.length ? true : false;
      el.remove();
    } else {
      this.#value.isValid =
        isHex.test(colour) ||
        isHSL.test(colour) ||
        isHSLA.test(colour) ||
        isRGB.test(colour) ||
        isRGBA.test(colour)
          ? true
          : false;
    }
  }
  setHex(hex) {
    let val = this.#value;
    [val.r16, val.g16, val.b16, val.a16] = hex;
    val.hex = `#${val.r16}${val.g16}${val.b16}`;
    val.hexa = `#${val.r16}${val.g16}${val.b16}${val.a16}`;
  }
  setRGBA(rgba) {
    let val = this.#value;
    [val.r, val.g, val.b, val.a] = rgba;
    val.rgb = `rgb(${rgba[0]},${rgba[1]},${rgba[2]})`;
    val.rgba = `rgb(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`;
  }
  setHSLA(hsla) {
    let val = this.#value;
    [val.h, val.s, val.l, val.a] = hsla;
    val.hsl = `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%)`;
    val.hsla = `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
  }
  #valueIsHex(hex) {
    let l = hex.length,
      rgba;
    switch (l) {
      case 4:
        rgba = [
          `${hex[1]}${hex[1]}`,
          `${hex[2]}${hex[2]}`,
          `${hex[3]}${hex[3]}`,
          'ff'
        ];
        break;
      case 7:
        rgba = [hex.substr(1, 2), hex.substr(3, 2), hex.substr(5, 2), 'ff'];
        break;
      case 9:
        rgba = [
          hex.substr(1, 2),
          hex.substr(3, 2),
          hex.substr(5, 2),
          hex.substr(7, 2)
        ];
        break;
    }
    this.setHex(rgba);
    this.#hexToRGB(rgba);
    this.#hexToHSL(rgba);
  }
  #valueIsHSL(hsl) {
    this.#value.hsl = hsl;
  }
  #valueIsHSLA(hsla) {
    this.#value.hsla = hsla;
  }
  #valueIsRGB(rgb) {
    this.#value.rgb = rgb;
    this.#RGBAToHex(rgba);
  }
  #valueIsRGBA(rgba) {
    this.#value.rgba = rgba;
    this.#RGBAToHex(rgba);
  }
  #RGBToHex(rgb) {
    let { r, g, b, a } = this.#getRGB(rgb);
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    if (a.length == 1) a = '0' + a;
    this.value.r = r;
    this.value.g = g;
    this.value.b = b;
    this.value.a = a;
    this.setHex([r, g, b, a]);
    return this;
  }
  #RGBToHSL(rgb) {
    let { r, g, b, a } = this.#getRGB(rgb);
    r = parseInt(r, 16) / 255;
    g = parseInt(g, 16) / 255;
    b = parseInt(b, 16) / 255;
    a = parseInt(a, 16) / 255;
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
      (
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
      ).toString(),
      ((100 * (2 * l - s)) / 2).toString(),
      a.toString()
    ];
    this.setHSLA(hsla);
    return this;
  }
  #HSLToRGB(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  }
  #HSLToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  #hexToRGB(hex) {
    if (isString(hex)) hex = /([a-f\d]{2})/gi.exec(hex);
    var rgba = [
      parseInt(hex[0], 16),
      parseInt(hex[1], 16),
      parseInt(hex[2], 16),
      parseInt(hex[3], 16) / 255
    ];
    this.setRGBA(rgba);
  }
  #hexToHSL(hex) {
    if (isString(hex)) hex = /([a-f\d]{2})/gi.exec(hex);
    let r = parseInt(hex[0], 16);
    let g = parseInt(hex[1], 16);
    let b = parseInt(hex[2], 16);
    let a = parseInt(hex[3], 16);
    (r /= 255), (g /= 255), (b /= 255), (a /= 255);
    this.setHSLA([r, g, b, a]);
  }
  #getRGB(rgb) {
    let r, g, b, a;
    let v = this.#value;
    if (v.r && v.g && v.b && v.a) return ({ r, g, b, a } = { ...v });
    if (isString(rgb)) {
      let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
      rgb = rgb.substr(4).split(')')[0].split(sep);
    }
    if (isArray(rgb)) {
      if (rgb.length < 3 || rgb.length > 4) return false;
      r = rgb[0];
      g = rgb[1];
      b = rgb[2];
      a = isString(rgb[3]) ? rgb[3] : '';
    } else if (isObject(rgb)) {
      r = rgb.r;
      g = rgb.g;
      b = rgb.b;
      a = 'a' in rgb ? rgb.a : '';
    } else return false;
    return { r, g, b, a };
  }
  #RGBAToHex(rgba) {
    let x,
      isPercent,
      i = 0,
      y = [],
      z = [],
      rgb = rgba
        .replace(/\s/g, '')
        .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    rgb.shift();
    for (let v of rgb) {
      isPercent = v.indexOf('%') > -1;
      x = parseFloat(v);
      if (i < 3 && isPercent) {
        x = Math.round((255 * x) / 100);
      } else if (i == 3) {
        if (!isPercent && x >= 0 && x <= 1) {
          x = Math.round(255 * x);
        } else if (isPercent && x >= 0 && x <= 100) {
          x = Math.round((255 * x) / 100);
        } else {
          x = '';
        }
      }
      y[i] = (x | (1 << 8)).toString(16).slice(1);
      z[i++] = x;
    }
    this.setHex(y);
    this.setRGBA(z);
    this.#hexToHSL(this.#value.hexa);
  }
}
class Palette {
  #matrix = [10, 5];
  #colours = colours2;
  #entries = [];
  constructor(matrix = [10, 5], colours = colours2) {
    this.#matrix = this.validateMatrix(matrix) ? matrix : this.#matrix;
    this.#colours = this.validateColours(colours) ? colours : this.#colours;
  }
  get matrix() {
    return this.#matrix;
  }
  get colours() {
    return this.#colours;
  }
  get entries() {
    return this.#entries;
  }
  validateMatrix(matrix) {
    return (
      isArray(matrix) &&
      matrix.length == 2 &&
      isInteger(matrix[0]) &&
      isInteger(matrix[1])
    );
  }
  validateColours(colours) {
    if (
      !isArray(colours) ||
      colours.length != this.#matrix[0] * this.#matrix[1]
    )
      return false;
    const entries = [];
    for (let c of colours) {
      let k = new Colour(c);
      if (!k.isValid) return false;
      entries.push(k);
    }
    this.#entries = entries;
    return true;
  }
}

function getPixelRatio(canvas) {
  return (
    (canvas.ownerDocument &&
      canvas.ownerDocument.defaultView &&
      canvas.ownerDocument.defaultView.devicePixelRatio) ||
    2
  );
}
function renderImage(
  ctx,
  image,
  sx,
  sy,
  sWidth,
  sHeight,
  dx,
  dy,
  dWidth,
  dHeight
) {
  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}
function imageToCanvas(image, canvas) {
  let w = image.naturalWidth || image.width;
  let h = image.naturalHeight || image.height;
  if (canvas === undefined) canvas = createCanvas(w, h);
  canvas.ctx.drawImage(image, 0, 0);
  return canvas;
}
const channels = {
  red: '#FF0000FF',
  green: '#00FF00FF',
  blue: '#0000FFFF',
  alpa: '#000000FF'
};
function fillMask(colour, image) {
  const copy = imageToCanvas(image);
  const ctx = copy.ctx;
  let fill;
  if (Object.keys(channels).includes(colour)) fill = channels[colour];
  else {
    let c = new Colour(colour);
    fill = c.isValid ? c.hexa : channels.alpa;
  }
  ctx.fillStyle = fill;
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(image, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  return copy;
}
function separateRGB(image) {
  return {
    red: fillMask('red', image),
    green: fillMask('green', image),
    blue: fillMask('blue', image),
    alpha: fillMask('alpha', image)
  };
}
function createCanvas(w, h) {
  const c = document.createElement('canvas');
  c.ctx = c.getContext('2d', { willReadFrequently: true });
  c.width = w || c.ctx.canvas.width;
  c.height = h || c.ctx.canvas.height;
  return c;
}
var canvas = {
  Colour,
  createCanvas,
  imageToCanvas,
  separateRGB,
  fillMask,
  getPixelRatio,
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
  chartBar
};

class Candle {
  constructor(scene, theme) {
    this.areaCoordinates = [];
    this.scene = scene;
    this.ctx = this.scene.context;
    this.width = this.scene.width;
    this.cfg = theme;
  }
  draw(data) {
    const ctx = this.ctx;
    const cfg = this.cfg;
    const hilo = data.raw[4] >= data.raw[1];
    const bodyColour = hilo ? cfg.candle.UpBodyColour : cfg.candle.DnBodyColour;
    const wickColour = hilo ? cfg.candle.UpWickColour : cfg.candle.DnWickColour;
    switch (cfg.candle.Type) {
      case CandleType.CANDLE_SOLID:
        this.fill = true;
        break;
      case CandleType.CANDLE_HOLLOW:
      case CandleType.OHLC:
        this.fill = false;
        break;
      case CandleType.CANDLE_UP_HOLLOW:
        this.fill = !hilo;
        break;
      case CandleType.CANDLE_DOWN_HOLLOW:
        this.fill = hilo;
    }
    let w = Math.max(data.w - 1, 1);
    w = candleW(w);
    let hw = Math.max(Math.floor(w * 0.5), 1);
    let h = Math.abs(data.o - data.c);
    let max_h = data.c === data.o ? 1 : 2;
    let x = data.x;
    let x05 = Math.floor(x) - 0.5;
    ctx.save();
    ctx.strokeStyle = wickColour;
    ctx.beginPath();
    ctx.moveTo(x05, Math.floor(data.h));
    if (cfg.candle.Type === CandleType.OHLC) {
      ctx.lineTo(x05, Math.floor(data.l));
    } else {
      if (hilo) {
        ctx.lineTo(x05, Math.floor(data.c));
        ctx.moveTo(x05, Math.floor(data.o));
      } else {
        ctx.lineTo(x05, Math.floor(data.o));
        ctx.moveTo(x05, Math.floor(data.c));
      }
    }
    ctx.lineTo(x05, Math.floor(data.l));
    ctx.stroke();
    if (w == 3) {
      ctx.fillStyle = wickColour;
      let s = hilo ? 1 : -1;
      ctx.rect(
        Math.floor(x - hw),
        data.c,
        Math.floor(hw * 2),
        s * Math.max(h, max_h)
      );
      ctx.fill();
      ctx.stroke();
    } else if (w > 3 && this.fill) {
      ctx.fillStyle = bodyColour;
      let s = hilo ? 1 : -1;
      ctx.rect(
        Math.floor(x - hw),
        data.c,
        Math.floor(hw * 2),
        s * Math.max(h, max_h)
      );
      ctx.fill();
      ctx.stroke();
    } else if (w > 3 && !this.fill && cfg.candle.Type !== CandleType.OHLC) {
      let s = hilo ? 1 : -1;
      ctx.rect(
        Math.floor(x - hw),
        data.c,
        Math.floor(hw * 2),
        s * Math.max(h, max_h)
      );
      ctx.stroke();
    } else if (cfg.candle.Type === CandleType.OHLC) {
      ctx.beginPath();
      ctx.moveTo(x05 - hw, data.o);
      ctx.lineTo(x05, data.o);
      ctx.moveTo(x05, data.c);
      ctx.lineTo(x05 + hw, data.c);
      ctx.stroke();
    } else {
      ctx.strokeStyle = wickColour;
      ctx.beginPath();
      ctx.moveTo(x05, Math.floor(Math.min(data.o, data.c)));
      ctx.lineTo(
        x05,
        Math.floor(Math.max(data.o, data.c)) + (data.o === data.c ? 1 : 0)
      );
      ctx.stroke();
    }
    ctx.restore();
  }
  body(fill) {}
  area(data) {
    this.areaCoordinates.push(data);
  }
  areaRender() {
    const coords = this.areaCoordinates;
    if (!isArray(coords) || coords.length == 0) return;
    let ctx = this.ctx;
    let cfg = this.cfg.candle;
    let fill;
    Math.max(coords[0].w - 1, 1);
    coords[0].x;
    let start = [coords[0].x, coords[0].h];
    ctx.save();
    ctx.strokeStyle =
      cfg.AreaLineColour || cfg.UpBodyColour || cfg.DnBodyColour;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].h);
    let i = 0;
    while (i < coords.length) {
      ctx.lineTo(coords[i].x, coords[i].h);
      i++;
    }
    if (cfg?.Type == 'area') {
      fill = ctx.createLinearGradient(0, 0, 0, this.scene.height);
      if (isArray(cfg.AreaFillColour)) {
        for (let [index, value] of cfg.AreaFillColour.entries()) {
          fill.addColorStop(index, value);
        }
      } else if (isString(cfg.AreaFillColour)) fill = cfg.AreaFillColour;
      else fill = cfg.UpBodyColour || cfg.DnBodyColour;
      ctx.stroke();
      ctx.lineTo(coords[i - 1].x, this.scene.height);
      ctx.lineTo(start[0], this.scene.height);
      ctx.fillStyle = fill;
      ctx.closePath();
      ctx.fill();
    } else ctx.stroke();
    ctx.restore();
    coords.length = 0;
  }
}
function candleW(w) {
  if (w < 3) w = 1;
  else if (w < 5) w = 3;
  else if (w > 5) w = Math.ceil(w * 0.8);
  return w;
}

class Histogram {
  constructor(scene, theme) {
    this.scene = scene;
    this.ctx = this.scene.context;
    this.width = this.scene.width;
    this.cfg = theme;
  }
  draw(data) {
    const ctx = this.ctx;
    this.cfg;
    this.scene.height;
    const opts = {
      fill: '',
      stroke: '',
      width: 1
    };
    let h;
    for (let d of data) {
      let { w, x, y, zero: z } = d;
      w = candleW(w);
      x = x - w / 2;
      if (y < z) {
        h = z - y;
        opts.fill = '#0f0';
      } else {
        h = y - z;
        y = z;
        opts.fill = '#f00';
      }
      renderRect(ctx, x, y, w, h, opts);
    }
  }
}

function renderHighLowRange(ctx, high, low, w, h, style) {
  let d = high - low;
  renderRectFill(ctx, 0, low, w, d, style);
  renderLineHorizontal(ctx, high, 0, w, style);
  renderLineHorizontal(ctx, low, 0, w, style);
}

class Overlay {
  static {
    this.isOverlay = true;
  }
  #parent;
  #core;
  #config = {};
  #theme;
  #xAxis;
  #yAxis;
  #target;
  #scene;
  #hit;
  #params;
  #data = [];
  #mustUpdate = {
    valueMax: null,
    valueMin: null,
    indexStart: null,
    Length: null,
    rowsW: null,
    rowsH: null,
    refresh: true,
    resize: true
  };
  #histogram;
  constructor(
    target,
    xAxis = false,
    yAxis = false,
    theme,
    parent,
    params = {}
  ) {
    this.#core = parent.core;
    this.#parent = parent;
    this.#config = parent.core.config;
    this.#target = target;
    this.#scene = target.scene;
    this.#hit = target.hit;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#params = params;
    this.on('global_resize', this.onResize, this);
  }
  get core() {
    return this.#core;
  }
  get parent() {
    return this.#parent;
  }
  get target() {
    return this.#target;
  }
  get config() {
    return this.#config;
  }
  get params() {
    return this.#params;
  }
  get range() {
    return this.#core.range;
  }
  get state() {
    return this.#core.state;
  }
  get scene() {
    return this.#scene;
  }
  get hit() {
    return this.#hit;
  }
  get theme() {
    return this.#core.theme;
  }
  get chart() {
    return this.#parent.parent.parent;
  }
  get chartData() {
    return this.#config.state.allData.data;
  }
  get xAxis() {
    return this.getXAxis();
  }
  get yAxis() {
    return this.getYAxis();
  }
  get overlay() {
    return this.#params.overlay;
  }
  get overlayData() {
    return this.#params.overlay?.data || [];
  }
  get data() {
    return this.#params.overlay?.data || [];
  }
  get stateMachine() {
    return this.#core.stateMachine;
  }
  get context() {
    return this.contextIs();
  }
  set position(p) {
    this.#target.setPosition(p[0], p[1]);
  }
  destroy() {
    this.#core.hub.expunge(this);
    if ('overlay' in this.#params && 'data' in this.#params.overlay)
      delete this.#params.overlay.data;
  }
  on(topic, handler, context = this) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler, context = this) {
    this.#core.off(topic, handler, context);
  }
  expunge(context = this) {
    this.#core.expunge(context);
  }
  emit(topic, data) {
    this.core.emit(topic, data);
  }
  onResize() {
    this.#mustUpdate.resize = true;
  }
  setSize(w, h) {
    this.#target.setSize(w, h);
    this.#mustUpdate.refresh = true;
  }
  setRefresh() {
    this.#mustUpdate.refresh = true;
  }
  getXAxis() {
    if (this.#xAxis instanceof xAxis) return this.#xAxis;
    else if (this.core.Chart.time?.xAxis instanceof xAxis)
      return this.core.Chart.time.xAxis;
    else if ('time' in this.#parent) return this.#parent.time.xAxis;
    else return false;
  }
  getYAxis() {
    if (this.#yAxis instanceof yAxis) return this.#yAxis;
    else if (this.chart?.yAxis instanceof yAxis) return this.chart.yAxis;
    else if ('scale' in this.#parent) return this.#parent.scale.yAxis;
    else return false;
  }
  contextIs() {
    if (!this.#xAxis && !this.#yAxis) return 'chart';
    else if (this.getXAxis() instanceof xAxis) return 'timeline';
    else if (this.getYAxis() instanceof yAxis) return 'scale';
    else return false;
  }
  mustUpdate() {
    const r = this.#core.range;
    const l = this.#mustUpdate;
    this.#core.MainPane.elRows;
    return l.valueMax !== r.valueMax ||
      l.valueMin !== r.valueMin ||
      l.indexStart !== r.indexStart ||
      l.Length !== r.Length ||
      l.refresh ||
      l.resize
      ? this.#mustUpdate
      : false;
  }
  updated() {
    const r = this.#core.range;
    const l = this.#mustUpdate;
    const d = this.#core.MainPane.elRows;
    l.valueMax = r.valueMax;
    l.valueMin = r.valueMin;
    l.indexStart = r.indexStart;
    l.Length = r.Length;
    l.rowsW = d.width;
    l.rowsH = d.height;
    l.rowsW = d.width;
    l.rowsH = d.height;
    l.refresh = false;
    l.resize = false;
  }
  plot(plots, type, params) {
    const ctx = this.scene.context;
    const p = plots;
    ctx.save();
    switch (type) {
      case 'createCanvas':
        canvas[type](p[0], p[1]);
        break;
      case 'fillStroke':
        canvas[type](ctx, p[0], p[1], p[2]);
        break;
      case 'renderLine':
        canvas[type](ctx, p, params);
        break;
      case 'renderLineHorizontal':
        canvas[type](ctx, p[0], p[1], p[2], params);
        break;
      case 'renderLineVertical':
        canvas[type](ctx, p[0], p[1], p[2], params);
        break;
      case 'renderPath':
        canvas[type](ctx, p, params.style, params);
        break;
      case 'renderPathStroke':
        canvas[type](ctx, p, params.style);
        break;
      case 'renderPathClosed':
        canvas[type](ctx, p, params.style, params);
        break;
      case 'renderSpline':
        canvas[type](ctx, p, params);
        break;
      case 'renderRect':
        canvas[type](ctx, p[0], p[1], p[2], p[3], params);
        break;
      case 'renderRectFill':
        canvas[type](ctx, p[0], p[1], p[2], p[3], params);
        break;
      case 'renderRectStroke':
        canvas[type](ctx, p[0], p[1], p[2], p[3], params);
        break;
      case 'renderRectRound':
        canvas[type](ctx, p[0], p[1], p[2], p[3], p[4], params);
        break;
      case 'renderRectRoundFill':
        canvas[type](ctx, p[0], p[1], p[2], p[3], p[4], params);
        break;
      case 'renderRectRoundStroke':
        canvas[type](ctx, p[0], p[1], p[2], p[3], p[4], params);
        break;
      case 'renderPolygonRegular':
        canvas[type](ctx, p[0], p[1], p[2], p[3], p[4], params);
        break;
      case 'renderPolygonIrregular':
        canvas[type](ctx, p, params);
        break;
      case 'renderTriangle':
        canvas[type](ctx, p[0], p[1], p[2], params);
        break;
      case 'renderDiamond':
        canvas[type](ctx, p[0], p[1], p[2], p[3], params);
        break;
      case 'renderCircle':
        canvas[type](ctx, p[0], p[1], p[2], params);
        break;
      case 'renderImage':
        canvas[type](
          ctx,
          params.src,
          p[0],
          p[1],
          p[2],
          p[3],
          p[4],
          p[5],
          p[6],
          p[7]
        );
        break;
      case 'renderText':
        canvas[type](ctx, p[0], p[1], params);
        break;
      case 'renderTextBG':
        canvas[type](ctx, p[0], p[1], p[2], params);
        break;
      case 'histogram':
        this.histogram(p, params);
        break;
      case 'highLowRange':
        this.highLowRange(ctx, params);
        break;
    }
    ctx.restore();
  }
  clear() {
    this.scene.clear();
  }
  histogram(p, params) {
    if (!(this.#histogram instanceof Histogram))
      this.#histogram = new Histogram(this.scene, this.theme);
    this.#histogram.draw(p, params);
  }
  highLowRange(ctx, p) {
    let { high, low } = p;
    let y1 = this.yAxis.yPos(high);
    let y2 = this.yAxis.yPos(low);
    let { width, height } = this.scene;
    renderHighLowRange(ctx, y1, y2, width, height, p);
  }
}

class WinState {
  static {
    this.opened = new WinState('opened');
  }
  static {
    this.closed = new WinState('closed');
  }
  constructor(name) {
    this.name = name;
  }
}
class Window {
  #id;
  #widgets;
  #core;
  #config;
  #state = WinState.closed;
  #parent;
  #elWidgetsG;
  #elWindows;
  #elWindow;
  #elDragBar;
  #elTitle;
  #elCloseIcon;
  #elContent;
  #elColourPicker;
  #pos = {};
  #dims;
  #cursorPos;
  #controller;
  #dragBar;
  #dragging = false;
  #windowEvents = {};
  #title = '';
  #content = '';
  #contentFields = {};
  #params = {};
  static {
    this.windowList = {};
  }
  static {
    this.windowCnt = 0;
  }
  static {
    this.class = CLASS_WINDOWS;
  }
  static {
    this.Name = 'Windows';
  }
  static {
    this.type = 'window';
  }
  static {
    this.currentActive = null;
  }
  static {
    this.stylesInstalled = false;
  }
  static {
    this.defaultStyles = `
  /** default Window widget styles */

  .tradeXwindow {
    border: 1px solid ${WindowStyle.COLOUR_BORDER};
    border-radius: 5px;
    box-shadow: ${WindowStyle.SHADOW};
    background: ${WindowStyle.COLOUR_BG};
    color: ${WindowStyle.COLOUR_TXT};
  }

  .tradeXwindow .dragBar {
    cursor: grab;
  }

  .tradeXwindow .dragBar:hover {
    background: #222;
  }

  .tradeXwindow .dragBar .title {
    ${WindowStyle.TITLE}
  }

  .tradeXwindow .content {
    ${WindowStyle.CONTENT}
  }
 
  `;
  }
  static create(widgets, config) {
    config.id = config?.id || uid('window');
    config.id = `${config.id}_${++Window.windowCnt}`;
    config.type = config?.type || Window.type;
    config.class = config?.class || 'window';
    Window.windowList[config.id] = new Window(widgets, config);
    return Window.windowList[config.id];
  }
  static destroy(id) {
    if (!(id in Window.windowList)) return;
    Window.windowList[id].destroy();
    delete Window.windowList[id];
  }
  static defaultNode() {
    const windowStyle = ``;
    const node = `
      <div slot="widget" class="${CLASS_WINDOWS}" style="${windowStyle}"></div>
    `;
    return node;
  }
  constructor(widgets, config) {
    this.#widgets = widgets;
    this.#core = config.core || config.parent.core;
    this.#config = config;
    this.#id = config.id;
    this.#parent = config.parent;
    this.#elWindows = widgets.elements[config.type];
    this.#elWidgetsG = this.#core.elWidgetsG;
    const rootElement = widgets.elements[config.type];
    this.mount(rootElement);
  }
  destroy() {
    this.#core.hub.expunge();
    this.el.remove();
  }
  get id() {
    return this.#id;
  }
  get pos() {
    return this.dimensions;
  }
  get core() {
    return this.#core;
  }
  get parent() {
    return this.#parent;
  }
  get config() {
    return this.#config;
  }
  set config(c) {
    this.#config = c;
  }
  get theme() {
    return this.#core.theme;
  }
  get state() {
    return this.#state;
  }
  get dimensions() {
    return elementDimPos(this.#elWindow);
  }
  set dimensions(d) {
    this.setDimensions(d);
  }
  get type() {
    return Window.type;
  }
  get el() {
    return this.#elWindow;
  }
  get elDragBar() {
    return this.#elDragBar;
  }
  get elTitle() {
    return this.#elTitle;
  }
  get elCloseIcon() {
    return this.#elCloseIcon;
  }
  get elContent() {
    return this.#elContent;
  }
  get elColourPicker() {
    return this.#elColourPicker;
  }
  get title() {
    return this.#title;
  }
  set title(t) {
    this.setTitle(t);
  }
  get content() {
    return this.#content;
  }
  set content(c) {
    this.setContent(c);
  }
  get contentFields() {
    return this.#contentFields;
  }
  set params(p) {
    if (isObject(p)) this.#params = { ...this.#params, ...p };
  }
  get params() {
    return this.#params;
  }
  setTitle(t) {
    if (!isString(t)) return false;
    this.#config.title = t;
    this.#elTitle.innerHTML = t;
    return this.#elTitle;
  }
  setContent(c, m = {}) {
    if (!isString(c) || !isObject(m)) return false;
    this.#config.content = c;
    this.#elContent.innerHTML = c;
    for (let mod in m) {
      if (!isFunction(m[mod])) continue;
      m[mod](this.#elContent);
    }
    this.#contentFields = this.allContentFields();
    return this.#elContent;
  }
  start() {
    this.eventsListen();
    if (this.#config?.openNow !== true) this.setClose();
  }
  eventsListen() {
    this.on(`window_close_${this.parent.id}`, this.onCloseWindow, this);
    this.on('global_resize', this.onGlobalResize, this);
  }
  on(topic, handler, context = this) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler, context = this) {
    this.#core.off(topic, handler, context);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onGlobalResize(e) {
    const dims = this.dimensions;
    const data = {
      position: { x: dims.left, y: dims.top },
      dimensions: { w: dims.w, h: dims.h }
    };
    if (dims.w > e.width) data.position.x = e.width;
    if (dims.h > e.height) data.position.y = e.height;
    dims.left + data.dimensions.w;
    dims.bottom + data.dimensions.h;
    if (dims.x < 0) data.position.x = 0;
    else if (dims.x + data.dimensions.w > e.width) data.position.x -= e.width;
    this.setProperties(data);
  }
  onOutsideClickListener(e) {
    if (
      !this.#elWindow.contains(e.target) &&
      isVisible(this.#elWindow) &&
      !this.#dragging
    ) {
      let data = {
        target: e.currentTarget.id,
        window: this.#id
      };
      this.emit('window_close', data);
      this.emit(`window_close_${this.parent.id}`, data);
      document.removeEventListener('click', this.#windowEvents.click);
      delete this.#windowEvents.click;
    }
  }
  onCloseWindow(e) {
    if (e.window === this.#id) this.close();
  }
  onWindow(e) {
    e.stopPropagation();
  }
  onDragBar(e) {
    this.#dragging = true;
    let x = this.#elWindow.offsetLeft + e.movement.x;
    let y = this.#elWindow.offsetTop + e.movement.y;
    this.position({ x, y });
  }
  onDragBarEnd(e) {
    setTimeout(() => {
      this.#dragging = false;
    }, 250);
  }
  mount(el) {
    if (el.lastElementChild == null) el.innerHTML = this.windowNode();
    else el.lastElementChild.insertAdjacentHTML('afterend', this.windowNode());
    this.#elWindow = this.#elWindows.querySelector(`#${this.#config.id}`);
    this.#elDragBar = this.#elWindow.querySelector('.dragBar');
    this.#elTitle = this.#elWindow.querySelector('.title');
    this.#elCloseIcon = this.#elWindow.querySelector('.closeIcon');
    this.#elContent = this.#elWindow.querySelector('.content');
    this.#contentFields = this.allContentFields();
    this.#elWindow.addEventListener('click', this.onWindow.bind(this));
    if (isHTMLElement(this.#elDragBar)) {
      this.#dragBar = new Input(this.#elDragBar, { disableContextMenu: false });
      this.#dragBar.on('pointerdrag', this.onDragBar.bind(this));
      this.#dragBar.on('pointerdragend', this.onDragBarEnd.bind(this));
    }
    const d = this.dimensions;
    const w = this.#config?.w || d.w;
    const h = this.#config?.h || d.h;
    this.setDimensions({ w, h });
    this.position();
  }
  windowNode() {
    const window = this.#config;
    let windowStyle = `position: absolute; z-index: 100; display: block;`;
    let dragBar = window.dragBar ? this.dragBar() : '';
    let title = !window.dragBar && window.title ? this.titleNode() : '';
    let content = this.contentNode();
    let closeIcon = this.closeIcon();
    let node = `
      <!-- ${this.constructor.type} ${this.parent.id} -->
      <div id="${window.id}" class="${CLASS_WINDOW} ${window.class}" style="${windowStyle}">
          ${dragBar}
          ${title}
          ${closeIcon}
          ${content}
        </div>
      </div>
    `;
    return node;
  }
  contentNode() {
    const window = this.#config;
    let contentStyle = ``;
    let content = window?.content ? window.content : '';
    let node = `
      <div class="content" style="${contentStyle}">
        ${content}
      </div>
    `;
    return node;
  }
  dragBar() {
    const window = this.#config;
    const cPointer = 'cursor: grab;';
    const over = `onmouseover="this.style.background ='#222'"`;
    const out = `onmouseout="this.style.background ='none'"`;
    let dragBarStyle = `${cPointer} `;
    let node = ``;
    if (window.dragBar)
      node += `
    <div class="dragBar" style="${dragBarStyle}" ${over} ${out}>
        ${this.titleNode()}
      </div>
    `;
    return node;
  }
  titleNode() {
    const cfg = this.config;
    const title = isString(cfg?.title) ? cfg.title : '';
    let node = `
        <div class="title">${title}</div>
    `;
    return node;
  }
  closeIcon() {
    const cPointer = 'cursor: pointer;';
    const over = `onmouseover="this.style.background ='#222'"`;
    const out = `onmouseout="this.style.background ='none'"`;
    let closeIconStyle = `${cPointer} `;
    this.#config?.styles?.closeIcon;
    let node = ``;
    if (window.closeIcon)
      node += `
      <div class="closeIcon" style="${closeIconStyle}" ${over} ${out}>
        <span>X</span>
      </div>
    `;
    return node;
  }
  allContentFields() {
    const fields = {};
    const c = this.#elContent;
    fields.input = c.querySelectorAll('input');
    fields.select = c.querySelectorAll('select');
    fields.textarea = c.querySelectorAll('textarea');
    fields.button = c.querySelectorAll('button');
    return fields;
  }
  position(p) {
    let rebound = 0.1;
    let wPos = this.dimensions;
    let iPos = this.#core.dimensions;
    Math.round(iPos.left - wPos.left);
    Math.round(iPos.bottom - wPos.top);
    let px =
      this.#pos?.iPos?.width !== iPos.width || !!this.#pos.x100
        ? wPos.width * this.#pos.x100
        : Math.round((iPos.width - wPos.width) / 2);
    let py =
      this.#pos?.iPos?.height !== iPos.height || !!this.#pos.y100
        ? wPos.height * this.#pos.y100
        : Math.round((iPos.height + wPos.height) / -2);
    let pz = getStyle(this.#elWindow, 'z-index');
    if (isObject(p)) {
      let { x, y, z } = { ...p };
      if (isNumber(x)) px = x;
      if (isNumber(y)) py = y;
      if (isNumber(z)) pz = z;
      this.#pos = { x: x, y: y, z: pz };
    }
    this.#elWindow.style['z-index'] = `${pz}`;
    const width = this.#elWindow.clientWidth;
    if (px + width * rebound > this.#elWidgetsG.offsetWidth) {
      px = this.#elWidgetsG.offsetWidth - width * rebound;
    } else if (px < (width - width * rebound) * -1) {
      px = (width - width * rebound) * -1;
    }
    const height = this.#elWindow.clientHeight;
    if (py < iPos.height * -1) {
      py = iPos.height * -1;
    } else if (py > height * rebound * -1) {
      py = height * rebound * -1;
    }
    px = Math.floor(px);
    py = Math.floor(py);
    this.#elWindow.style.left = `${px}px`;
    this.#elWindow.style.top = `${py}px`;
    const x100 = px / wPos.width;
    const y100 = py / wPos.height;
    this.#pos = {
      px,
      py,
      x100,
      y100,
      iPos
    };
  }
  setDimensions(d) {
    if (!isObject(d)) return false;
    if (isNumber(d?.w)) this.#elWindow.style.width = `${d.w}px`;
    if (isNumber(d?.h)) this.#elWindow.style.height = `${d.h}px`;
  }
  setProperties(data) {
    if (!isObject(data)) return false;
    if (isString(data?.title)) {
      this.#elTitle.innerHTML = data.title;
    }
    if (isString(data?.content)) {
      this.#elContent.innerHTML = data.content;
    }
    this.setDimensions({ ...data?.dimensions });
    this.position({ ...data?.position });
    if (isObject(data?.styles)) {
      const styleIt = (k, s) => {
        if (!isObject(s)) return false;
        const el = 'el' + k.charAt(0).toUpperCase() + k.slice(1);
        if (isObject(this[el])) {
          for (let p in s) {
            this[el].style.p = s[p];
          }
        }
      };
      for (let k of Object.keys(data.styles)) {
        styleIt(k, data.styles[k]);
      }
    }
    return data;
  }
  setOpen() {
    Window.currentActive = this;
    this.#state = WinState.opened;
    this.#elWindow.style.display = 'block';
    this.#elWindow.style.zindex = '10';
    this.#elWindow.classList.add('active');
  }
  setClose() {
    Window.currentActive = null;
    this.#state = WinState.closed;
    this.#elWindow.style.display = 'none';
    this.#elWindow.classList.remove('active');
    document.removeEventListener('click', this.#windowEvents.click);
  }
  remove() {
    return Window.destroy(this.id);
  }
  open(data = {}) {
    if (Window.currentActive === this && this.state === WinState.opened)
      return true;
    if (isObject(data.params)) this.params = data.params;
    this.setOpen();
    this.setProperties(data);
    this.emit('window_opened', this.id);
    this.emit(`window_opened_${this.parent.id}`, this.id);
    setTimeout(() => {
      this.#windowEvents.click = this.onOutsideClickListener.bind(this);
      document.addEventListener('click', this.#windowEvents.click);
      if (!!this.#elColourPicker);
    }, 1000);
    return true;
  }
  close() {
    if (this.#state !== WinState.closed) {
      this.setClose();
      this.emit('window_closed', this.id);
      this.emit(`window_closed_${this.parent.id}`, this.id);
    }
    return true;
  }
}

const ACCBANDS = {
  name: 'ACCBANDS',
  camelCaseName: 'accBands',
  group: 'Overlap Studies',
  description: 'Acceleration Bands',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 20,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'upperBand',
      type: 'number',
      plot: 'limit_upper'
    },
    {
      name: 'middleBand',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'lowerBand',
      type: 'number',
      plot: 'limit_lower'
    }
  ]
};
const ACOS = {
  name: 'ACOS',
  camelCaseName: 'acos',
  group: 'Math Transform',
  description: 'Vector Trigonometric ACos',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const AD = {
  name: 'AD',
  camelCaseName: 'ad',
  group: 'Volume Indicators',
  description: 'Chaikin A/D Line',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    },
    {
      name: 'volume',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ADD = {
  name: 'ADD',
  camelCaseName: 'add',
  group: 'Math Operators',
  description: 'Vector Arithmetic Add',
  inputs: [
    {
      name: 'inReal0',
      type: 'number'
    },
    {
      name: 'inReal1',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ADOSC = {
  name: 'ADOSC',
  camelCaseName: 'adOsc',
  group: 'Volume Indicators',
  description: 'Chaikin A/D Oscillator',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    },
    {
      name: 'volume',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'fastPeriod',
      displayName: 'Fast Period',
      defaultValue: 3,
      hint: 'Number of period for the fast MA',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'slowPeriod',
      displayName: 'Slow Period',
      defaultValue: 10,
      hint: 'Number of period for the slow MA',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ADX$1 = {
  name: 'ADX',
  camelCaseName: 'adx',
  group: 'Momentum Indicators',
  description: 'Average Directional Movement Index',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ADXR = {
  name: 'ADXR',
  camelCaseName: 'adxr',
  group: 'Momentum Indicators',
  description: 'Average Directional Movement Index Rating',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const APO = {
  name: 'APO',
  camelCaseName: 'apo',
  group: 'Momentum Indicators',
  description: 'Absolute Price Oscillator',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'fastPeriod',
      displayName: 'Fast Period',
      defaultValue: 12,
      hint: 'Number of period for the fast MA',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'slowPeriod',
      displayName: 'Slow Period',
      defaultValue: 26,
      hint: 'Number of period for the slow MA',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'MAType',
      displayName: 'MA Type',
      defaultValue: 0,
      hint: 'Type of Moving Average',
      type: 'MAType'
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const AROON$1 = {
  name: 'AROON',
  camelCaseName: 'aroon',
  group: 'Momentum Indicators',
  description: 'Aroon',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'aroonDown',
      type: 'number',
      plot: 'line_dash'
    },
    {
      name: 'aroonUp',
      type: 'number',
      plot: 'line'
    }
  ]
};
const AROONOSC = {
  name: 'AROONOSC',
  camelCaseName: 'aroonOsc',
  group: 'Momentum Indicators',
  description: 'Aroon Oscillator',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ASIN = {
  name: 'ASIN',
  camelCaseName: 'asin',
  group: 'Math Transform',
  description: 'Vector Trigonometric ASin',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ATAN = {
  name: 'ATAN',
  camelCaseName: 'atan',
  group: 'Math Transform',
  description: 'Vector Trigonometric ATan',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ATR$1 = {
  name: 'ATR',
  camelCaseName: 'atr',
  group: 'Volatility Indicators',
  description: 'Average True Range',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const AVGDEV = {
  name: 'AVGDEV',
  camelCaseName: 'avgDev',
  group: 'Price Transform',
  description: 'Average Deviation',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const AVGPRICE = {
  name: 'AVGPRICE',
  camelCaseName: 'avgPrice',
  group: 'Price Transform',
  description: 'Average Price',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const BBANDS = {
  name: 'BBANDS',
  camelCaseName: 'bbands',
  group: 'Overlap Studies',
  description: 'Bollinger Bands',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 5,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'nbDevUp',
      displayName: 'Deviations up',
      defaultValue: 2,
      hint: 'Deviation multiplier for upper band',
      type: 'number',
      range: {
        min: -3e37,
        max: 3e37
      }
    },
    {
      name: 'nbDevDn',
      displayName: 'Deviations down',
      defaultValue: 2,
      hint: 'Deviation multiplier for lower band',
      type: 'number',
      range: {
        min: -3e37,
        max: 3e37
      }
    },
    {
      name: 'MAType',
      displayName: 'MA Type',
      defaultValue: 0,
      hint: 'Type of Moving Average',
      type: 'MAType'
    }
  ],
  outputs: [
    {
      name: 'upperBand',
      type: 'number',
      plot: 'limit_upper'
    },
    {
      name: 'middleBand',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'lowerBand',
      type: 'number',
      plot: 'limit_lower'
    }
  ]
};
const BETA = {
  name: 'BETA',
  camelCaseName: 'beta',
  group: 'Statistic Functions',
  description: 'Beta',
  inputs: [
    {
      name: 'inReal0',
      type: 'number'
    },
    {
      name: 'inReal1',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 5,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const BOP = {
  name: 'BOP',
  camelCaseName: 'bop',
  group: 'Momentum Indicators',
  description: 'Balance Of Power',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CCI$1 = {
  name: 'CCI',
  camelCaseName: 'cci',
  group: 'Momentum Indicators',
  description: 'Commodity Channel Index',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDL2CROWS = {
  name: 'CDL2CROWS',
  camelCaseName: 'cdl2Crows',
  group: 'Pattern Recognition',
  description: 'Two Crows',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDL3BLACKCROWS = {
  name: 'CDL3BLACKCROWS',
  camelCaseName: 'cdl3BlackCrows',
  group: 'Pattern Recognition',
  description: 'Three Black Crows',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDL3INSIDE = {
  name: 'CDL3INSIDE',
  camelCaseName: 'cdl3Inside',
  group: 'Pattern Recognition',
  description: 'Three Inside Up/Down',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDL3LINESTRIKE = {
  name: 'CDL3LINESTRIKE',
  camelCaseName: 'cdl3LineStrike',
  group: 'Pattern Recognition',
  description: 'Three-Line Strike ',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDL3OUTSIDE = {
  name: 'CDL3OUTSIDE',
  camelCaseName: 'cdl3Outside',
  group: 'Pattern Recognition',
  description: 'Three Outside Up/Down',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDL3STARSINSOUTH = {
  name: 'CDL3STARSINSOUTH',
  camelCaseName: 'cdl3StarsInSouth',
  group: 'Pattern Recognition',
  description: 'Three Stars In The South',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDL3WHITESOLDIERS = {
  name: 'CDL3WHITESOLDIERS',
  camelCaseName: 'cdl3WhiteSoldiers',
  group: 'Pattern Recognition',
  description: 'Three Advancing White Soldiers',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLABANDONEDBABY = {
  name: 'CDLABANDONEDBABY',
  camelCaseName: 'cdlAbandonedBaby',
  group: 'Pattern Recognition',
  description: 'Abandoned Baby',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'penetration',
      displayName: 'Penetration',
      defaultValue: 0.3,
      hint: 'Percentage of penetration of a candle within another candle',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLADVANCEBLOCK = {
  name: 'CDLADVANCEBLOCK',
  camelCaseName: 'cdlAdvanceBlock',
  group: 'Pattern Recognition',
  description: 'Advance Block',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLBELTHOLD = {
  name: 'CDLBELTHOLD',
  camelCaseName: 'cdlBeltHold',
  group: 'Pattern Recognition',
  description: 'Belt-hold',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLBREAKAWAY = {
  name: 'CDLBREAKAWAY',
  camelCaseName: 'cdlBreakaway',
  group: 'Pattern Recognition',
  description: 'Breakaway',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLCLOSINGMARUBOZU = {
  name: 'CDLCLOSINGMARUBOZU',
  camelCaseName: 'cdlClosingMarubozu',
  group: 'Pattern Recognition',
  description: 'Closing Marubozu',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLCONCEALBABYSWALL = {
  name: 'CDLCONCEALBABYSWALL',
  camelCaseName: 'cdlConcealBabysWall',
  group: 'Pattern Recognition',
  description: 'Concealing Baby Swallow',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLCOUNTERATTACK = {
  name: 'CDLCOUNTERATTACK',
  camelCaseName: 'cdlCounterAttack',
  group: 'Pattern Recognition',
  description: 'Counterattack',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLDARKCLOUDCOVER = {
  name: 'CDLDARKCLOUDCOVER',
  camelCaseName: 'cdlDarkCloudCover',
  group: 'Pattern Recognition',
  description: 'Dark Cloud Cover',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'penetration',
      displayName: 'Penetration',
      defaultValue: 0.5,
      hint: 'Percentage of penetration of a candle within another candle',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLDOJI = {
  name: 'CDLDOJI',
  camelCaseName: 'cdlDoji',
  group: 'Pattern Recognition',
  description: 'Doji',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLDOJISTAR = {
  name: 'CDLDOJISTAR',
  camelCaseName: 'cdlDojiStar',
  group: 'Pattern Recognition',
  description: 'Doji Star',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLDRAGONFLYDOJI = {
  name: 'CDLDRAGONFLYDOJI',
  camelCaseName: 'cdlDragonflyDoji',
  group: 'Pattern Recognition',
  description: 'Dragonfly Doji',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLENGULFING = {
  name: 'CDLENGULFING',
  camelCaseName: 'cdlEngulfing',
  group: 'Pattern Recognition',
  description: 'Engulfing Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLEVENINGDOJISTAR = {
  name: 'CDLEVENINGDOJISTAR',
  camelCaseName: 'cdlEveningDojiStar',
  group: 'Pattern Recognition',
  description: 'Evening Doji Star',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'penetration',
      displayName: 'Penetration',
      defaultValue: 0.3,
      hint: 'Percentage of penetration of a candle within another candle',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLEVENINGSTAR = {
  name: 'CDLEVENINGSTAR',
  camelCaseName: 'cdlEveningStar',
  group: 'Pattern Recognition',
  description: 'Evening Star',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'penetration',
      displayName: 'Penetration',
      defaultValue: 0.3,
      hint: 'Percentage of penetration of a candle within another candle',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLGAPSIDESIDEWHITE = {
  name: 'CDLGAPSIDESIDEWHITE',
  camelCaseName: 'cdlGapSideSideWhite',
  group: 'Pattern Recognition',
  description: 'Up/Down-gap side-by-side white lines',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLGRAVESTONEDOJI = {
  name: 'CDLGRAVESTONEDOJI',
  camelCaseName: 'cdlGravestoneDoji',
  group: 'Pattern Recognition',
  description: 'Gravestone Doji',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLHAMMER = {
  name: 'CDLHAMMER',
  camelCaseName: 'cdlHammer',
  group: 'Pattern Recognition',
  description: 'Hammer',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLHANGINGMAN = {
  name: 'CDLHANGINGMAN',
  camelCaseName: 'cdlHangingMan',
  group: 'Pattern Recognition',
  description: 'Hanging Man',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLHARAMI = {
  name: 'CDLHARAMI',
  camelCaseName: 'cdlHarami',
  group: 'Pattern Recognition',
  description: 'Harami Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLHARAMICROSS = {
  name: 'CDLHARAMICROSS',
  camelCaseName: 'cdlHaramiCross',
  group: 'Pattern Recognition',
  description: 'Harami Cross Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLHIGHWAVE = {
  name: 'CDLHIGHWAVE',
  camelCaseName: 'cdlHignWave',
  group: 'Pattern Recognition',
  description: 'High-Wave Candle',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLHIKKAKE = {
  name: 'CDLHIKKAKE',
  camelCaseName: 'cdlHikkake',
  group: 'Pattern Recognition',
  description: 'Hikkake Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLHIKKAKEMOD = {
  name: 'CDLHIKKAKEMOD',
  camelCaseName: 'cdlHikkakeMod',
  group: 'Pattern Recognition',
  description: 'Modified Hikkake Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLHOMINGPIGEON = {
  name: 'CDLHOMINGPIGEON',
  camelCaseName: 'cdlHomingPigeon',
  group: 'Pattern Recognition',
  description: 'Homing Pigeon',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLIDENTICAL3CROWS = {
  name: 'CDLIDENTICAL3CROWS',
  camelCaseName: 'cdlIdentical3Crows',
  group: 'Pattern Recognition',
  description: 'Identical Three Crows',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLINNECK = {
  name: 'CDLINNECK',
  camelCaseName: 'cdlInNeck',
  group: 'Pattern Recognition',
  description: 'In-Neck Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLINVERTEDHAMMER = {
  name: 'CDLINVERTEDHAMMER',
  camelCaseName: 'cdlInvertedHammer',
  group: 'Pattern Recognition',
  description: 'Inverted Hammer',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLKICKING = {
  name: 'CDLKICKING',
  camelCaseName: 'cdlKicking',
  group: 'Pattern Recognition',
  description: 'Kicking',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLKICKINGBYLENGTH = {
  name: 'CDLKICKINGBYLENGTH',
  camelCaseName: 'cdlKickingByLength',
  group: 'Pattern Recognition',
  description: 'Kicking - bull/bear determined by the longer marubozu',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLLADDERBOTTOM = {
  name: 'CDLLADDERBOTTOM',
  camelCaseName: 'cdlLadderBottom',
  group: 'Pattern Recognition',
  description: 'Ladder Bottom',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLLONGLEGGEDDOJI = {
  name: 'CDLLONGLEGGEDDOJI',
  camelCaseName: 'cdlLongLeggedDoji',
  group: 'Pattern Recognition',
  description: 'Long Legged Doji',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLLONGLINE = {
  name: 'CDLLONGLINE',
  camelCaseName: 'cdlLongLine',
  group: 'Pattern Recognition',
  description: 'Long Line Candle',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLMARUBOZU = {
  name: 'CDLMARUBOZU',
  camelCaseName: 'cdlMarubozu',
  group: 'Pattern Recognition',
  description: 'Marubozu',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLMATCHINGLOW = {
  name: 'CDLMATCHINGLOW',
  camelCaseName: 'cdlMatchingLow',
  group: 'Pattern Recognition',
  description: 'Matching Low',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLMATHOLD = {
  name: 'CDLMATHOLD',
  camelCaseName: 'cdlMatHold',
  group: 'Pattern Recognition',
  description: 'Mat Hold',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'penetration',
      displayName: 'Penetration',
      defaultValue: 0.5,
      hint: 'Percentage of penetration of a candle within another candle',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLMORNINGDOJISTAR = {
  name: 'CDLMORNINGDOJISTAR',
  camelCaseName: 'cdlMorningDojiStar',
  group: 'Pattern Recognition',
  description: 'Morning Doji Star',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'penetration',
      displayName: 'Penetration',
      defaultValue: 0.3,
      hint: 'Percentage of penetration of a candle within another candle',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLMORNINGSTAR = {
  name: 'CDLMORNINGSTAR',
  camelCaseName: 'cdlMorningStar',
  group: 'Pattern Recognition',
  description: 'Morning Star',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'penetration',
      displayName: 'Penetration',
      defaultValue: 0.3,
      hint: 'Percentage of penetration of a candle within another candle',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLONNECK = {
  name: 'CDLONNECK',
  camelCaseName: 'cdlOnNeck',
  group: 'Pattern Recognition',
  description: 'On-Neck Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLPIERCING = {
  name: 'CDLPIERCING',
  camelCaseName: 'cdlPiercing',
  group: 'Pattern Recognition',
  description: 'Piercing Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLRICKSHAWMAN = {
  name: 'CDLRICKSHAWMAN',
  camelCaseName: 'cdlRickshawMan',
  group: 'Pattern Recognition',
  description: 'Rickshaw Man',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLRISEFALL3METHODS = {
  name: 'CDLRISEFALL3METHODS',
  camelCaseName: 'cdlRiseFall3Methods',
  group: 'Pattern Recognition',
  description: 'Rising/Falling Three Methods',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLSEPARATINGLINES = {
  name: 'CDLSEPARATINGLINES',
  camelCaseName: 'cdlSeperatingLines',
  group: 'Pattern Recognition',
  description: 'Separating Lines',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLSHOOTINGSTAR = {
  name: 'CDLSHOOTINGSTAR',
  camelCaseName: 'cdlShootingStar',
  group: 'Pattern Recognition',
  description: 'Shooting Star',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLSHORTLINE = {
  name: 'CDLSHORTLINE',
  camelCaseName: 'cdlShortLine',
  group: 'Pattern Recognition',
  description: 'Short Line Candle',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLSPINNINGTOP = {
  name: 'CDLSPINNINGTOP',
  camelCaseName: 'cdlSpinningTop',
  group: 'Pattern Recognition',
  description: 'Spinning Top',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLSTALLEDPATTERN = {
  name: 'CDLSTALLEDPATTERN',
  camelCaseName: 'cdlStalledPattern',
  group: 'Pattern Recognition',
  description: 'Stalled Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLSTICKSANDWICH = {
  name: 'CDLSTICKSANDWICH',
  camelCaseName: 'cdlStickSandwhich',
  group: 'Pattern Recognition',
  description: 'Stick Sandwich',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLTAKURI = {
  name: 'CDLTAKURI',
  camelCaseName: 'cdlTakuri',
  group: 'Pattern Recognition',
  description: 'Takuri (Dragonfly Doji with very long lower shadow)',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLTASUKIGAP = {
  name: 'CDLTASUKIGAP',
  camelCaseName: 'cdlTasukiGap',
  group: 'Pattern Recognition',
  description: 'Tasuki Gap',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLTHRUSTING = {
  name: 'CDLTHRUSTING',
  camelCaseName: 'cdlThrusting',
  group: 'Pattern Recognition',
  description: 'Thrusting Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLTRISTAR = {
  name: 'CDLTRISTAR',
  camelCaseName: 'cdlTristar',
  group: 'Pattern Recognition',
  description: 'Tristar Pattern',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLUNIQUE3RIVER = {
  name: 'CDLUNIQUE3RIVER',
  camelCaseName: 'cdlUnique3River',
  group: 'Pattern Recognition',
  description: 'Unique 3 River',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLUPSIDEGAP2CROWS = {
  name: 'CDLUPSIDEGAP2CROWS',
  camelCaseName: 'cdlUpsideGap2Crows',
  group: 'Pattern Recognition',
  description: 'Upside Gap Two Crows',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CDLXSIDEGAP3METHODS = {
  name: 'CDLXSIDEGAP3METHODS',
  camelCaseName: 'cdlXSideGap3Methods',
  group: 'Pattern Recognition',
  description: 'Upside/Downside Gap Three Methods',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CEIL = {
  name: 'CEIL',
  camelCaseName: 'ceil',
  group: 'Math Transform',
  description: 'Vector Ceil',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CMO$1 = {
  name: 'CMO',
  camelCaseName: 'cmo',
  group: 'Momentum Indicators',
  description: 'Chande Momentum Oscillator',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const CORREL = {
  name: 'CORREL',
  camelCaseName: 'correl',
  group: 'Statistic Functions',
  description: "Pearson's Correlation Coefficient (r)",
  inputs: [
    {
      name: 'inReal0',
      type: 'number'
    },
    {
      name: 'inReal1',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const COS = {
  name: 'COS',
  camelCaseName: 'cos',
  group: 'Math Transform',
  description: 'Vector Trigonometric Cos',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const COSH = {
  name: 'COSH',
  camelCaseName: 'cosh',
  group: 'Math Transform',
  description: 'Vector Trigonometric Cosh',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const DEMA = {
  name: 'DEMA',
  camelCaseName: 'dema',
  group: 'Overlap Studies',
  description: 'number Exponential Moving Average',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const DIV = {
  name: 'DIV',
  camelCaseName: 'div',
  group: 'Math Operators',
  description: 'Vector Arithmetic Div',
  inputs: [
    {
      name: 'inReal0',
      type: 'number'
    },
    {
      name: 'inReal1',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const DX$1 = {
  name: 'DX',
  camelCaseName: 'dx',
  group: 'Momentum Indicators',
  description: 'Directional Movement Index',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const EMA$1 = {
  name: 'EMA',
  camelCaseName: 'ema',
  group: 'Overlap Studies',
  description: 'Exponential Moving Average',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const EXP = {
  name: 'EXP',
  camelCaseName: 'exp',
  group: 'Math Transform',
  description: 'Vector Arithmetic Exp',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const FLOOR = {
  name: 'FLOOR',
  camelCaseName: 'floor',
  group: 'Math Transform',
  description: 'Vector Floor',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const HT_DCPERIOD = {
  name: 'HT_DCPERIOD',
  camelCaseName: 'htDcPeriod',
  group: 'Cycle Indicators',
  description: 'Hilbert Transform - Dominant Cycle Period',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const HT_DCPHASE = {
  name: 'HT_DCPHASE',
  camelCaseName: 'htDcPhase',
  group: 'Cycle Indicators',
  description: 'Hilbert Transform - Dominant Cycle Phase',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const HT_PHASOR = {
  name: 'HT_PHASOR',
  camelCaseName: 'htPhasor',
  group: 'Cycle Indicators',
  description: 'Hilbert Transform - Phasor Components',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'inPhase',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'quadrature',
      type: 'number',
      plot: 'line_dash'
    }
  ]
};
const HT_SINE = {
  name: 'HT_SINE',
  camelCaseName: 'htSine',
  group: 'Cycle Indicators',
  description: 'Hilbert Transform - SineWave',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'sine',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'leadSine',
      type: 'number',
      plot: 'line_dash'
    }
  ]
};
const HT_TRENDLINE = {
  name: 'HT_TRENDLINE',
  camelCaseName: 'htTrendline',
  group: 'Overlap Studies',
  description: 'Hilbert Transform - Instantaneous Trendline',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const HT_TRENDMODE = {
  name: 'HT_TRENDMODE',
  camelCaseName: 'htTrendMode',
  group: 'Cycle Indicators',
  description: 'Hilbert Transform - Trend vs Cycle Mode',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const IMI = {
  name: 'IMI',
  camelCaseName: 'imi',
  group: 'Momentum Indicators',
  description: 'Intraday Momentum Index',
  inputs: [
    {
      name: 'open',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const KAMA = {
  name: 'KAMA',
  camelCaseName: 'kama',
  group: 'Overlap Studies',
  description: 'Kaufman Adaptive Moving Average',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const LINEARREG = {
  name: 'LINEARREG',
  camelCaseName: 'linearReg',
  group: 'Statistic Functions',
  description: 'Linear Regression',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const LINEARREG_ANGLE = {
  name: 'LINEARREG_ANGLE',
  camelCaseName: 'linearRegAngle',
  group: 'Statistic Functions',
  description: 'Linear Regression Angle',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const LINEARREG_INTERCEPT = {
  name: 'LINEARREG_INTERCEPT',
  camelCaseName: 'linearRegIntercept',
  group: 'Statistic Functions',
  description: 'Linear Regression Intercept',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const LINEARREG_SLOPE = {
  name: 'LINEARREG_SLOPE',
  camelCaseName: 'linearRegSlope',
  group: 'Statistic Functions',
  description: 'Linear Regression Slope',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const LN = {
  name: 'LN',
  camelCaseName: 'ln',
  group: 'Math Transform',
  description: 'Vector Log Natural',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const LOG10 = {
  name: 'LOG10',
  camelCaseName: 'log10',
  group: 'Math Transform',
  description: 'Vector Log10',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MA$1 = {
  name: 'MA',
  camelCaseName: 'movingAverage',
  group: 'Overlap Studies',
  description: 'Moving average',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'MAType',
      displayName: 'MA Type',
      defaultValue: 0,
      hint: 'Type of Moving Average',
      type: 'MAType'
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MACD$1 = {
  name: 'MACD',
  camelCaseName: 'macd',
  group: 'Momentum Indicators',
  description: 'Moving Average Convergence/Divergence',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'fastPeriod',
      displayName: 'Fast Period',
      defaultValue: 12,
      hint: 'Number of period for the fast MA',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'slowPeriod',
      displayName: 'Slow Period',
      defaultValue: 26,
      hint: 'Number of period for the slow MA',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'signalPeriod',
      displayName: 'Signal Period',
      defaultValue: 9,
      hint: 'Smoothing for the signal line (nb of period)',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'MACD',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'MACDSignal',
      type: 'number',
      plot: 'line_dash'
    },
    {
      name: 'MACDHist',
      type: 'number',
      plot: 'histogram'
    }
  ]
};
const MACDEXT = {
  name: 'MACDEXT',
  camelCaseName: 'macdExt',
  group: 'Momentum Indicators',
  description: 'MACD with controllable MA type',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'fastPeriod',
      displayName: 'Fast Period',
      defaultValue: 12,
      hint: 'Number of period for the fast MA',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'fastMAType',
      displayName: 'Fast MA',
      defaultValue: 0,
      hint: 'Type of Moving Average for fast MA',
      type: 'MAType'
    },
    {
      name: 'slowPeriod',
      displayName: 'Slow Period',
      defaultValue: 26,
      hint: 'Number of period for the slow MA',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'slowMAType',
      displayName: 'Slow MA',
      defaultValue: 0,
      hint: 'Type of Moving Average for slow MA',
      type: 'MAType'
    },
    {
      name: 'signalPeriod',
      displayName: 'Signal Period',
      defaultValue: 9,
      hint: 'Smoothing for the signal line (nb of period)',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'signalMAType',
      displayName: 'Signal MA',
      defaultValue: 0,
      hint: 'Type of Moving Average for signal line',
      type: 'MAType'
    }
  ],
  outputs: [
    {
      name: 'MACD',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'MACDSignal',
      type: 'number',
      plot: 'line_dash'
    },
    {
      name: 'MACDHist',
      type: 'number',
      plot: 'histogram'
    }
  ]
};
const MACDFIX = {
  name: 'MACDFIX',
  camelCaseName: 'macdFix',
  group: 'Momentum Indicators',
  description: 'Moving Average Convergence/Divergence Fix 12/26',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'signalPeriod',
      displayName: 'Signal Period',
      defaultValue: 9,
      hint: 'Smoothing for the signal line (nb of period)',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'MACD',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'MACDSignal',
      type: 'number',
      plot: 'line_dash'
    },
    {
      name: 'MACDHist',
      type: 'number',
      plot: 'histogram'
    }
  ]
};
const MAMA = {
  name: 'MAMA',
  camelCaseName: 'mama',
  group: 'Overlap Studies',
  description: 'MESA Adaptive Moving Average',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'fastLimit',
      displayName: 'Fast Limit',
      defaultValue: 0.5,
      hint: 'Upper limit use in the adaptive algorithm',
      type: 'number',
      range: {
        min: 0.01,
        max: 0.99
      }
    },
    {
      name: 'slowLimit',
      displayName: 'Slow Limit',
      defaultValue: 0.05,
      hint: 'Lower limit use in the adaptive algorithm',
      type: 'number',
      range: {
        min: 0.01,
        max: 0.99
      }
    }
  ],
  outputs: [
    {
      name: 'MAMA',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'FAMA',
      type: 'number',
      plot: 'line_dash'
    }
  ]
};
const MAVP = {
  name: 'MAVP',
  camelCaseName: 'movingAverageVariablePeriod',
  group: 'Overlap Studies',
  description: 'Moving average with variable period',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    },
    {
      name: 'inPeriods',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'minPeriod',
      displayName: 'Minimum Period',
      defaultValue: 2,
      hint: 'Value less than minimum will be changed to Minimum period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'maxPeriod',
      displayName: 'Maximum Period',
      defaultValue: 30,
      hint: 'Value higher than maximum will be changed to Maximum period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'MAType',
      displayName: 'MA Type',
      defaultValue: 0,
      hint: 'Type of Moving Average',
      type: 'MAType'
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MAX = {
  name: 'MAX',
  camelCaseName: 'max',
  group: 'Math Operators',
  description: 'Highest value over a specified period',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MAXINDEX = {
  name: 'MAXINDEX',
  camelCaseName: 'maxIndex',
  group: 'Math Operators',
  description: 'Index of highest value over a specified period',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MEDPRICE = {
  name: 'MEDPRICE',
  camelCaseName: 'medPrice',
  group: 'Price Transform',
  description: 'Median Price',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MFI$1 = {
  name: 'MFI',
  camelCaseName: 'mfi',
  group: 'Momentum Indicators',
  description: 'Money Flow Index',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    },
    {
      name: 'volume',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MIDPOINT = {
  name: 'MIDPOINT',
  camelCaseName: 'midPoint',
  group: 'Overlap Studies',
  description: 'MidPoint over period',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MIDPRICE = {
  name: 'MIDPRICE',
  camelCaseName: 'midPrice',
  group: 'Overlap Studies',
  description: 'Midpoint Price over period',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MIN = {
  name: 'MIN',
  camelCaseName: 'min',
  group: 'Math Operators',
  description: 'Lowest value over a specified period',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MININDEX = {
  name: 'MININDEX',
  camelCaseName: 'minIndex',
  group: 'Math Operators',
  description: 'Index of lowest value over a specified period',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MINMAX = {
  name: 'MINMAX',
  camelCaseName: 'minMax',
  group: 'Math Operators',
  description: 'Lowest and highest values over a specified period',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'min',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'max',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MINMAXINDEX = {
  name: 'MINMAXINDEX',
  camelCaseName: 'minMaxIndex',
  group: 'Math Operators',
  description: 'Indexes of lowest and highest values over a specified period',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'minIdx',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'maxIdx',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MINUS_DI = {
  name: 'MINUS_DI',
  camelCaseName: 'minusDI',
  group: 'Momentum Indicators',
  description: 'Minus Directional Indicator',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MINUS_DM = {
  name: 'MINUS_DM',
  camelCaseName: 'minusDM',
  group: 'Momentum Indicators',
  description: 'Minus Directional Movement',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MOM = {
  name: 'MOM',
  camelCaseName: 'mom',
  group: 'Momentum Indicators',
  description: 'Momentum',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 10,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const MULT = {
  name: 'MULT',
  camelCaseName: 'mult',
  group: 'Math Operators',
  description: 'Vector Arithmetic Mult',
  inputs: [
    {
      name: 'inReal0',
      type: 'number'
    },
    {
      name: 'inReal1',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const NATR = {
  name: 'NATR',
  camelCaseName: 'natr',
  group: 'Volatility Indicators',
  description: 'Normalized Average True Range',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const OBV$1 = {
  name: 'OBV',
  camelCaseName: 'obv',
  group: 'Volume Indicators',
  description: 'On Balance Volume',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    },
    {
      name: 'volume',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const PLUS_DI = {
  name: 'PLUS_DI',
  camelCaseName: 'plusDI',
  group: 'Momentum Indicators',
  description: 'Plus Directional Indicator',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const PLUS_DM = {
  name: 'PLUS_DM',
  camelCaseName: 'plusDM',
  group: 'Momentum Indicators',
  description: 'Plus Directional Movement',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const PPO$1 = {
  name: 'PPO',
  camelCaseName: 'ppo',
  group: 'Momentum Indicators',
  description: 'Percentage Price Oscillator',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'fastPeriod',
      displayName: 'Fast Period',
      defaultValue: 12,
      hint: 'Number of period for the fast MA',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'slowPeriod',
      displayName: 'Slow Period',
      defaultValue: 26,
      hint: 'Number of period for the slow MA',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'MAType',
      displayName: 'MA Type',
      defaultValue: 0,
      hint: 'Type of Moving Average',
      type: 'MAType'
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ROC$1 = {
  name: 'ROC',
  camelCaseName: 'roc',
  group: 'Momentum Indicators',
  description: 'Rate of change : ((price/prevPrice)-1)*100',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 10,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ROCP = {
  name: 'ROCP',
  camelCaseName: 'rocP',
  group: 'Momentum Indicators',
  description: 'Rate of change Percentage: (price-prevPrice)/prevPrice',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 10,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ROCR = {
  name: 'ROCR',
  camelCaseName: 'rocR',
  group: 'Momentum Indicators',
  description: 'Rate of change ratio: (price/prevPrice)',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 10,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ROCR100 = {
  name: 'ROCR100',
  camelCaseName: 'rocR100',
  group: 'Momentum Indicators',
  description: 'Rate of change ratio 100 scale: (price/prevPrice)*100',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 10,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const RSI$1 = {
  name: 'RSI',
  camelCaseName: 'rsi',
  group: 'Momentum Indicators',
  description: 'Relative Strength Index',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const SAR = {
  name: 'SAR',
  camelCaseName: 'sar',
  group: 'Overlap Studies',
  description: 'Parabolic SAR',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'acceleration',
      displayName: 'Acceleration Factor',
      defaultValue: 0.02,
      hint: 'Acceleration Factor used up to the Maximum value',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    },
    {
      name: 'maximum',
      displayName: 'AF Maximum',
      defaultValue: 0.2,
      hint: 'Acceleration Factor Maximum value',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const SAREXT = {
  name: 'SAREXT',
  camelCaseName: 'sarExt',
  group: 'Overlap Studies',
  description: 'Parabolic SAR - Extended',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'startValue',
      displayName: 'Start Value',
      defaultValue: 0,
      hint: 'Start value and direction. 0 for Auto, >0 for Long, <0 for Short',
      type: 'number',
      range: {
        min: -3e37,
        max: 3e37
      }
    },
    {
      name: 'offsetOnReverse',
      displayName: 'Offset on Reverse',
      defaultValue: 0,
      hint: 'Percent offset added/removed to initial stop on short/long reversal',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    },
    {
      name: 'accelerationInitLong',
      displayName: 'AF Init Long',
      defaultValue: 0.02,
      hint: 'Acceleration Factor initial value for the Long direction',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    },
    {
      name: 'accelerationLong',
      displayName: 'AF Long',
      defaultValue: 0.02,
      hint: 'Acceleration Factor for the Long direction',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    },
    {
      name: 'accelerationMaxLong',
      displayName: 'AF Max Long',
      defaultValue: 0.2,
      hint: 'Acceleration Factor maximum value for the Long direction',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    },
    {
      name: 'accelerationInitShort',
      displayName: 'AF Init Short',
      defaultValue: 0.02,
      hint: 'Acceleration Factor initial value for the Short direction',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    },
    {
      name: 'accelerationShort',
      displayName: 'AF Short',
      defaultValue: 0.02,
      hint: 'Acceleration Factor for the Short direction',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    },
    {
      name: 'accelerationMaxShort',
      displayName: 'AF Max Short',
      defaultValue: 0.2,
      hint: 'Acceleration Factor maximum value for the Short direction',
      type: 'number',
      range: {
        min: 0,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const SIN = {
  name: 'SIN',
  camelCaseName: 'sin',
  group: 'Math Transform',
  description: 'Vector Trigonometric Sin',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const SINH = {
  name: 'SINH',
  camelCaseName: 'sinh',
  group: 'Math Transform',
  description: 'Vector Trigonometric Sinh',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const SMA$1 = {
  name: 'SMA',
  camelCaseName: 'sma',
  group: 'Overlap Studies',
  description: 'Simple Moving Average',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const SQRT = {
  name: 'SQRT',
  camelCaseName: 'sqrt',
  group: 'Math Transform',
  description: 'Vector Square Root',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const STDDEV = {
  name: 'STDDEV',
  camelCaseName: 'stdDev',
  group: 'Statistic Functions',
  description: 'Standard Deviation',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 5,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'nbDev',
      displayName: 'Deviations',
      defaultValue: 1,
      hint: 'Nb of deviations',
      type: 'number',
      range: {
        min: -3e37,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const STOCH$1 = {
  name: 'STOCH',
  camelCaseName: 'stoch',
  group: 'Momentum Indicators',
  description: 'Stochastic',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'fastK_Period',
      displayName: 'Fast-K Period',
      defaultValue: 5,
      hint: 'Time period for building the Fast-K line',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'slowK_Period',
      displayName: 'Slow-K Period',
      defaultValue: 3,
      hint: 'Smoothing for making the Slow-K line. Usually set to 3',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'slowK_MAType',
      displayName: 'Slow-K MA',
      defaultValue: 0,
      hint: 'Type of Moving Average for Slow-K',
      type: 'MAType'
    },
    {
      name: 'slowD_Period',
      displayName: 'Slow-D Period',
      defaultValue: 3,
      hint: 'Smoothing for making the Slow-D line',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'slowD_MAType',
      displayName: 'Slow-D MA',
      defaultValue: 0,
      hint: 'Type of Moving Average for Slow-D',
      type: 'MAType'
    }
  ],
  outputs: [
    {
      name: 'slowK',
      type: 'number',
      plot: 'line_dash'
    },
    {
      name: 'slowD',
      type: 'number',
      plot: 'line_dash'
    }
  ]
};
const STOCHF = {
  name: 'STOCHF',
  camelCaseName: 'stochF',
  group: 'Momentum Indicators',
  description: 'Stochastic Fast',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'fastK_Period',
      displayName: 'Fast-K Period',
      defaultValue: 5,
      hint: 'Time period for building the Fast-K line',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'fastD_Period',
      displayName: 'Fast-D Period',
      defaultValue: 3,
      hint: 'Smoothing for making the Fast-D line. Usually set to 3',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'fastD_MAType',
      displayName: 'Fast-D MA',
      defaultValue: 0,
      hint: 'Type of Moving Average for Fast-D',
      type: 'MAType'
    }
  ],
  outputs: [
    {
      name: 'fastK',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'fastD',
      type: 'number',
      plot: 'line'
    }
  ]
};
const STOCHRSI$1 = {
  name: 'STOCHRSI',
  camelCaseName: 'stochRsi',
  group: 'Momentum Indicators',
  description: 'Stochastic Relative Strength Index',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'fastK_Period',
      displayName: 'Fast-K Period',
      defaultValue: 5,
      hint: 'Time period for building the Fast-K line',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'fastD_Period',
      displayName: 'Fast-D Period',
      defaultValue: 3,
      hint: 'Smoothing for making the Fast-D line. Usually set to 3',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'fastD_MAType',
      displayName: 'Fast-D MA',
      defaultValue: 0,
      hint: 'Type of Moving Average for Fast-D',
      type: 'MAType'
    }
  ],
  outputs: [
    {
      name: 'fastK',
      type: 'number',
      plot: 'line'
    },
    {
      name: 'fastD',
      type: 'number',
      plot: 'line'
    }
  ]
};
const SUB = {
  name: 'SUB',
  camelCaseName: 'sub',
  group: 'Math Operators',
  description: 'Vector Arithmetic Substraction',
  inputs: [
    {
      name: 'inReal0',
      type: 'number'
    },
    {
      name: 'inReal1',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const SUM = {
  name: 'SUM',
  camelCaseName: 'sum',
  group: 'Math Operators',
  description: 'Summation',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const T3 = {
  name: 'T3',
  camelCaseName: 't3',
  group: 'Overlap Studies',
  description: 'Triple Exponential Moving Average (T3)',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 5,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    },
    {
      name: 'VFactor',
      displayName: 'Volume Factor',
      defaultValue: 0.7,
      hint: 'Volume Factor',
      type: 'number',
      range: {
        min: 0,
        max: 1
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const TAN = {
  name: 'TAN',
  camelCaseName: 'tan',
  group: 'Math Transform',
  description: 'Vector Trigonometric Tan',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const TANH = {
  name: 'TANH',
  camelCaseName: 'tanh',
  group: 'Math Transform',
  description: 'Vector Trigonometric Tanh',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const TEMA = {
  name: 'TEMA',
  camelCaseName: 'tema',
  group: 'Overlap Studies',
  description: 'Triple Exponential Moving Average',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const TRANGE = {
  name: 'TRANGE',
  camelCaseName: 'trueRange',
  group: 'Volatility Indicators',
  description: 'True Range',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const TRIMA = {
  name: 'TRIMA',
  camelCaseName: 'trima',
  group: 'Overlap Studies',
  description: 'Triangular Moving Average',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const TRIX = {
  name: 'TRIX',
  camelCaseName: 'trix',
  group: 'Momentum Indicators',
  description: '1-day Rate-Of-Change (ROC) of a Triple Smooth EMA',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const TSF = {
  name: 'TSF',
  camelCaseName: 'tsf',
  group: 'Statistic Functions',
  description: 'Time Series Forecast',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const TYPPRICE = {
  name: 'TYPPRICE',
  camelCaseName: 'typPrice',
  group: 'Price Transform',
  description: 'Typical Price',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const ULTOSC = {
  name: 'ULTOSC',
  camelCaseName: 'ultOsc',
  group: 'Momentum Indicators',
  description: 'Ultimate Oscillator',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod1',
      displayName: 'First Period',
      defaultValue: 7,
      hint: 'Number of bars for 1st period.',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'timePeriod2',
      displayName: 'Second Period',
      defaultValue: 14,
      hint: 'Number of bars fro 2nd period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'timePeriod3',
      displayName: 'Third Period',
      defaultValue: 28,
      hint: 'Number of bars for 3rd period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const VAR = {
  name: 'VAR',
  camelCaseName: 'variance',
  group: 'Statistic Functions',
  description: 'Variance',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 5,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 1,
        max: 100000
      }
    },
    {
      name: 'nbDev',
      displayName: 'Deviations',
      defaultValue: 1,
      hint: 'Nb of deviations',
      type: 'number',
      range: {
        min: -3e37,
        max: 3e37
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const WCLPRICE = {
  name: 'WCLPRICE',
  camelCaseName: 'wclPrice',
  group: 'Price Transform',
  description: 'Weighted Close Price',
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const WILLR = {
  name: 'WILLR',
  camelCaseName: 'willR',
  group: 'Momentum Indicators',
  description: "Williams' %R",
  inputs: [
    {
      name: 'high',
      type: 'number'
    },
    {
      name: 'low',
      type: 'number'
    },
    {
      name: 'close',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 14,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const WMA = {
  name: 'WMA',
  camelCaseName: 'wma',
  group: 'Overlap Studies',
  description: 'Weighted Moving Average',
  inputs: [
    {
      name: 'inReal',
      type: 'number'
    }
  ],
  options: [
    {
      name: 'timePeriod',
      displayName: 'Time Period',
      defaultValue: 30,
      hint: 'Number of period',
      type: 'number',
      range: {
        min: 2,
        max: 100000
      }
    }
  ],
  outputs: [
    {
      name: 'output',
      type: 'number',
      plot: 'line'
    }
  ]
};
const talibAPI = {
  ACCBANDS,
  ACOS,
  AD,
  ADD,
  ADOSC,
  ADX: ADX$1,
  ADXR,
  APO,
  AROON: AROON$1,
  AROONOSC,
  ASIN,
  ATAN,
  ATR: ATR$1,
  AVGDEV,
  AVGPRICE,
  BBANDS,
  BETA,
  BOP,
  CCI: CCI$1,
  CDL2CROWS,
  CDL3BLACKCROWS,
  CDL3INSIDE,
  CDL3LINESTRIKE,
  CDL3OUTSIDE,
  CDL3STARSINSOUTH,
  CDL3WHITESOLDIERS,
  CDLABANDONEDBABY,
  CDLADVANCEBLOCK,
  CDLBELTHOLD,
  CDLBREAKAWAY,
  CDLCLOSINGMARUBOZU,
  CDLCONCEALBABYSWALL,
  CDLCOUNTERATTACK,
  CDLDARKCLOUDCOVER,
  CDLDOJI,
  CDLDOJISTAR,
  CDLDRAGONFLYDOJI,
  CDLENGULFING,
  CDLEVENINGDOJISTAR,
  CDLEVENINGSTAR,
  CDLGAPSIDESIDEWHITE,
  CDLGRAVESTONEDOJI,
  CDLHAMMER,
  CDLHANGINGMAN,
  CDLHARAMI,
  CDLHARAMICROSS,
  CDLHIGHWAVE,
  CDLHIKKAKE,
  CDLHIKKAKEMOD,
  CDLHOMINGPIGEON,
  CDLIDENTICAL3CROWS,
  CDLINNECK,
  CDLINVERTEDHAMMER,
  CDLKICKING,
  CDLKICKINGBYLENGTH,
  CDLLADDERBOTTOM,
  CDLLONGLEGGEDDOJI,
  CDLLONGLINE,
  CDLMARUBOZU,
  CDLMATCHINGLOW,
  CDLMATHOLD,
  CDLMORNINGDOJISTAR,
  CDLMORNINGSTAR,
  CDLONNECK,
  CDLPIERCING,
  CDLRICKSHAWMAN,
  CDLRISEFALL3METHODS,
  CDLSEPARATINGLINES,
  CDLSHOOTINGSTAR,
  CDLSHORTLINE,
  CDLSPINNINGTOP,
  CDLSTALLEDPATTERN,
  CDLSTICKSANDWICH,
  CDLTAKURI,
  CDLTASUKIGAP,
  CDLTHRUSTING,
  CDLTRISTAR,
  CDLUNIQUE3RIVER,
  CDLUPSIDEGAP2CROWS,
  CDLXSIDEGAP3METHODS,
  CEIL,
  CMO: CMO$1,
  CORREL,
  COS,
  COSH,
  DEMA,
  DIV,
  DX: DX$1,
  EMA: EMA$1,
  EXP,
  FLOOR,
  HT_DCPERIOD,
  HT_DCPHASE,
  HT_PHASOR,
  HT_SINE,
  HT_TRENDLINE,
  HT_TRENDMODE,
  IMI,
  KAMA,
  LINEARREG,
  LINEARREG_ANGLE,
  LINEARREG_INTERCEPT,
  LINEARREG_SLOPE,
  LN,
  LOG10,
  MA: MA$1,
  MACD: MACD$1,
  MACDEXT,
  MACDFIX,
  MAMA,
  MAVP,
  MAX,
  MAXINDEX,
  MEDPRICE,
  MFI: MFI$1,
  MIDPOINT,
  MIDPRICE,
  MIN,
  MININDEX,
  MINMAX,
  MINMAXINDEX,
  MINUS_DI,
  MINUS_DM,
  MOM,
  MULT,
  NATR,
  OBV: OBV$1,
  PLUS_DI,
  PLUS_DM,
  PPO: PPO$1,
  ROC: ROC$1,
  ROCP,
  ROCR,
  ROCR100,
  RSI: RSI$1,
  SAR,
  SAREXT,
  SIN,
  SINH,
  SMA: SMA$1,
  SQRT,
  STDDEV,
  STOCH: STOCH$1,
  STOCHF,
  STOCHRSI: STOCHRSI$1,
  SUB,
  SUM,
  T3,
  TAN,
  TANH,
  TEMA,
  TRANGE,
  TRIMA,
  TRIX,
  TSF,
  TYPPRICE,
  ULTOSC,
  VAR,
  WCLPRICE,
  WILLR,
  WMA
};

function error(f, e, o) {
  throw new Error(`${f} ${e}`, o);
}
function typeError(f, t, e) {
  throw new TypeError(`${f} received ${t}, expected type ${e}`);
}

const DEFAULT_PERIOD = 5;
const OUTPUTEXTRAS = ['highLowRange'];
const IGNORE_DEFINITIONS = ['outputLegend', 'outputOrder', 'render', 'style'];
const palette = new Palette();
class Context {
  static {
    this.standard = new Context('standard');
  }
  static {
    this.subcomponent = new Context('subcomponent');
  }
  constructor(name) {
    this.name = name;
  }
}
class IndicatorState {
  static {
    this.noData = new IndicatorState('noData');
  }
  static {
    this.hasData = new IndicatorState('hasData');
  }
  static {
    this.error = new IndicatorState('error');
  }
  static {
    this.destroyed = new IndicatorState('destroyed');
  }
  constructor(name) {
    this.name = name;
  }
}
class InputPeriodEnable {
  #enable = true;
  #period = DEFAULT_PERIOD;
  constructor(enable = true, period = 5) {
    this.enable = enable;
    this.period = isInteger(period) ? period : 5;
  }
  set enable(e) {
    this.#enable = isBoolean(e) ? e : true;
  }
  get enable() {
    return this.#enable;
  }
  set period(p) {
    this.#period = isInteger(p) ? p : 5;
  }
  get period() {
    return this.#period;
  }
}
class Indicator extends Overlay {
  static #cnt = 0;
  static get cnt() {
    return ++Indicator.#cnt;
  }
  static get isIndicator() {
    return true;
  }
  #ID;
  #cnt_;
  #key;
  #name;
  #shortName;
  #context;
  #legendName;
  #legendVisibility;
  #primaryPane;
  #chartPane;
  #scaleOverlay;
  #plots;
  #overlay;
  #indicator;
  #type;
  #TALib;
  #range;
  #value;
  #newValueCB;
  #updateValueCB;
  #precision;
  #style;
  #legendID;
  #state;
  #ConfigDialogue;
  #palette;
  #error;
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, undefined, parent, params);
    this.#type = 'indicator';
    this.#value = [0, 0];
    this.#precision = 2;
    this.#style = {};
    this.#state = IndicatorState.noData;
    this.#error = { type: '', msg: '', style: '' };
    this.definition = {
      input: {},
      output: {},
      meta: {
        input: {},
        output: [],
        outputOrder: [],
        outputLegend: {},
        style: {}
      }
    };
    this.colours = [
      palette.colours[8],
      palette.colours[18],
      palette.colours[28],
      palette.colours[38],
      palette.colours[48]
    ];
    if (!isObject(this.definition))
      error(
        `Indicator: ${this.shortName}`,
        `does not provide a valid definition`
      );
    const overlay = params.overlay;
    this.#cnt_ = Indicator.cnt;
    this.#overlay = overlay;
    this.id = overlay?.id || uid(this?.shortName || overlay?.name);
    this.#key = overlay?.key || indicatorHashKey(overlay);
    this.#TALib = this.core.TALib;
    this.#range = this.core.range;
    this.legendName = overlay?.legendName || overlay?.name || this?.shortName;
    this.#legendVisibility = isBoolean(overlay?.legendVisibility)
      ? overlay.legendVisibility
      : true;
    this.#palette = palette;
    this.style = isObject(overlay?.settings?.style)
      ? { ...this.constructor.defaultStyle, ...overlay.settings.style }
      : { ...this.constructor.defaultStyle, ...config.style };
    const cfg = {
      title: `${this.legendName} Config`,
      content: '',
      params: overlay,
      parent: this
    };
    this.#ConfigDialogue = this.core.WidgetsG.insert('ConfigDialogue', cfg);
    switch (overlay.settings?.context) {
      case 'subcomponent':
        this.#context = Context.subcomponent;
      case 'standard':
      default:
        this.#context = Context.standard;
    }
  }
  get id() {
    return (
      this.#ID ||
      `${this.core.ID}-${this.chartPaneID}-${this.shortName}-${this.#cnt_}`
    );
  }
  set id(id) {
    this.#ID = idSanitize(new String(id));
  }
  get key() {
    return this.#key;
  }
  get version() {
    return `${this.constructor?.version}`;
  }
  get context() {
    return this.#context;
  }
  get chartPane() {
    return this.core.ChartPanes.get(this.chartPaneID);
  }
  get chartPaneID() {
    return this.params.overlay.paneID;
  }
  get primaryPane() {
    return this.#primaryPane || this.constructor.primaryPane;
  }
  set primaryPane(c) {
    this.#primaryPane = c;
  }
  get scaleOverlay() {
    return this.#scaleOverlay;
  }
  set scaleOverlay(o) {
    this.#scaleOverlay = o;
  }
  get plots() {
    return this.#plots;
  }
  set plots(p) {
    this.#plots = p;
  }
  get Timeline() {
    return this.core.Timeline;
  }
  get scale() {
    return this.parent.scale;
  }
  get type() {
    return this.#type;
  }
  get overlay() {
    return this.#overlay;
  }
  get legend() {
    return this.chart.legend.list[this.#legendID];
  }
  get legendID() {
    return this.#legendID;
  }
  get legendName() {
    return (
      this.#legendName || this.overlay?.name || this?.shortName || this.#ID
    );
  }
  set legendName(n) {
    this.setLegendName(n);
  }
  set legendVisibility(v) {
    this.setLegendVisibility(v);
  }
  get indicator() {
    return this.#indicator;
  }
  get TALib() {
    return this.#TALib;
  }
  get range() {
    return this.core.range;
  }
  set setNewValue(cb) {
    this.#newValueCB = cb;
  }
  set setUpdateValue(cb) {
    this.#updateValueCB = cb;
  }
  set precision(p) {
    this.#precision = p;
  }
  get precision() {
    return this.#precision;
  }
  set style(s) {
    if (isObject(s)) this.#style = s;
  }
  get style() {
    return this.#style;
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  get isIndicator() {
    return Indicator.isIndicator;
  }
  get isPrimary() {
    return this.chart.isPrimary;
  }
  set state(s) {
    if (s instanceof IndicatorState) this.#state = s;
  }
  get state() {
    return this.#state;
  }
  set error(e) {
    this.setError(e);
  }
  get error() {
    return this.#error;
  }
  get configDialogue() {
    return this.#ConfigDialogue;
  }
  set value(data) {
    const tfms = this.core.timeData.timeFrameMS;
    let roundedTime = Math.floor(new Date(data[OHLCV.t]) / tfms) * tfms;
    data[OHLCV.t] = roundedTime;
    if (this.#value[OHLCV.t] !== data[OHLCV.t]) {
      this.#value[OHLCV.t] = data[OHLCV.t];
      this.#newValueCB(data);
    } else {
      this.#updateValueCB(data);
    }
  }
  get value() {
    return this.#value;
  }
  setError(e) {
    if (this.#state === IndicatorState.destroyed) return false;
    if (!isObject(e) && !isString(e?.type) && !isString(e?.msg)) return false;
    const err = { ...e };
    err.indicator = this;
    this.#error = e;
    this.state = IndicatorState.error;
    this.emit('indicator_error', err);
    this.core.warn(
      `WARNING: Indicator: ${this.shortName} ID: ${this.id} ${err.msg}`
    );
  }
  setLegendName(name) {
    this.#legendName = isString(name)
      ? name
      : this.overlay?.name || this.shortName || this.#ID;
    this.chart.legend.modify(this.#legendID, { legendName: this.#legendName });
  }
  setLegendVisibility(v) {
    this.#legendVisibility = !!v;
    this.chart.legend.modify(this.#legendID, { legendVisibility: !!v });
  }
  setDefinitionValue(d, v) {
    let defs = Object.keys(this.definition.input);
    if (defs.includes(d)) {
      this.definition.input[d] = v * 1;
      return 'input';
    }
    defs = Object.keys(this.style);
    if (defs.includes(d)) {
      this.style[d] = v;
      return 'style';
    }
  }
  setRefresh() {
    super.setRefresh();
  }
  mustUpdate() {
    return super.mustUpdate();
  }
  init(api) {
    const overlay = this.params.overlay;
    this.defineIndicator(overlay, api);
    this.calcIndicatorHistory();
    this.setNewValue = (value) => {
      this.newValue(value);
    };
    this.setUpdateValue = (value) => {
      this.updateValue(value);
    };
    if (this.#context === Context.standard) {
      this.addLegend();
      this.#ConfigDialogue.start();
      this.eventsListen();
      this.setRefresh();
    }
  }
  destroy(state = true) {
    if (this.#state === IndicatorState.destroyed) return;
    if (!this.chartPane.indicatorDeleteList[this.id]) {
      this.core.warn(
        `Cannot "destroy()": ${this.id} !!! Use "indicator.remove()" or "chart.removeIndicator()" instead.`
      );
      return;
    }
    this.core.hub.expunge(this);
    this.chart.legend.remove(this.#legendID);
    this.clear();
    this.core.MainPane.draw(undefined, true);
    this.chartPane.graph.removeOverlay(this.id);
    super.destroy();
    if (!!state) this.core.state.removeIndicator(this.id);
    this.#state = IndicatorState.destroyed;
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`);
    if (
      this.chart.type === 'primaryPane' ||
      Object.keys(this.chart.indicators).length > 1
    ) {
      this.emit(`${this.chartPaneID}_removeIndicator`, {
        id: this.id,
        paneID: this.chartPaneID
      });
    } else this.chart.remove();
  }
  snapshot() {
    return {
      id: this.id,
      key: this.key,
      name: this.params.overlay.name,
      type: this.shortName,
      data: this.data,
      settings: this.definition
    };
  }
  dataProxy(fn, target = []) {
    const range = this.range;
    const state = this.core.state;
    const output = this.definition.meta.output;
    const data = [];
    const dummy = new Array(output.length + 1);
    dummy.fill(0);
    let length = range.dataLength;
    for (let i = 0; i <= length; i++) {
      dummy[0] = range.data[i][0];
      data[i] = Array.from(dummy);
    }
    if (isFunction(fn)) fn(data, state, range);
    this.data.length = 0;
    for (let d of data) {
      this.data.push(d);
    }
  }
  visible(v) {
    if (isBoolean(v)) {
      this.emit(`${this.chartPaneID}_visibleIndicator`, {
        id: this.id,
        paneID: this.chartPaneID,
        visible: v
      });
      this.chartPane.indicators[this.id].layer.visible = v;
      this.draw();
    }
    return this.chartPane.indicators[this.id].layer.visible;
  }
  settings(s) {
    if (isObject(s)) {
      if (isObject(s?.config))
        this.params.overlay.settings = mergeDeep(
          this.params.overlay.settings,
          s.config
        );
      if (isObject(s?.style)) this.style = mergeDeep(this.style, s.style);
      this.draw();
    }
    return {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition
    };
  }
  eventsListen() {
    this.on(STREAM_UPDATE, this.onStreamUpdate, this);
    this.on(`window_opened_${this.id}`, this.onConfigDialogueOpen, this);
    this.on(`window_closed_${this.id}`, this.onConfigDialogueCancel, this);
    this.on(`window_submit_${this.id}`, this.onConfigDialogueSubmit, this);
    this.on(`window_cancel_${this.id}`, this.onConfigDialogueCancel, this);
    this.on(`window_default_${this.id}`, this.onConfigDialogueDefault, this);
  }
  on(topic, handler, context = this) {
    this.core.on(topic, handler, context);
  }
  off(topic, handler, context = this) {
    this.core.off(topic, handler, context);
  }
  emit(topic, data) {
    this.core.emit(topic, data);
  }
  onStreamNewValue(value) {}
  onStreamUpdate(candle) {
    this.value = candle;
  }
  onLegendAction(e) {
    const action = this.chart.legend.onPointerClick(e.currentTarget);
    switch (action.icon) {
      case 'up':
        return;
      case 'down':
        return;
      case 'visible':
        this.onVisibility(action);
        return;
      case 'notVisible':
        this.onVisibility(action);
        return;
      case 'remove':
        this.remove();
        return;
      case 'config':
        this.invokeSettings();
        return;
      default:
        return;
    }
  }
  onVisibility(action) {
    this.setRefresh();
    this.visible(!this.visible());
    action.parent.classList.toggle('visible');
    action.parent.classList.toggle('notvisible');
  }
  onConfigDialogueOpen(d) {
    if (this.#ConfigDialogue.state === WinState.opened) return;
    this.#ConfigDialogue.setOpen();
    const fields = this.#ConfigDialogue.contentFields;
    for (let field in fields) {
      for (let f of fields[field]) {
        if (f.classList.contains('subject')) {
          if (f.getAttribute('data-oldval') !== f.value) {
            f.setAttribute('data-oldval', f.value);
          }
        }
      }
    }
  }
  onConfigDialogueSubmit(d) {
    this.#ConfigDialogue.setClose();
    let r,
      calc = false;
    const fields = this.#ConfigDialogue.contentFields;
    for (let field in fields) {
      for (let f of fields[field]) {
        if (f.classList.contains('subject')) {
          f.setAttribute('data-oldval', f.value);
          r = this.setDefinitionValue(f.id, f.value);
          calc = calc || r == 'input';
        }
      }
    }
    if (calc) {
      this.clear();
      this.overlay.data.length = 0;
      this.calcIndicatorHistory();
    }
    this.setRefresh();
    this.draw();
    this.core.refresh();
  }
  onConfigDialogueCancel(d) {
    this.#ConfigDialogue.setClose();
    const fields = this.#ConfigDialogue.contentFields;
    for (let field in fields) {
      for (let f of fields[field]) {
        if (f.classList.contains('subject')) {
          f.value = f.getAttribute('data-oldval');
        }
      }
    }
    this.setRefresh();
    this.draw();
  }
  onConfigDialogueDefault(d) {
    const fields = this.#ConfigDialogue.contentFields;
    for (let field in fields) {
      for (let f of fields[field]) {
        if (f.classList.contains('subject')) {
          let dataDefault = f.getAttribute('data-default');
          f.value = dataDefault;
          this.style[f.id] = dataDefault;
        }
      }
    }
    this.calcIndicatorHistory();
    this.setRefresh();
    this.draw();
  }
  invokeSettings(c = {}) {
    let r;
    if (isFunction(c?.fn)) {
      r = c.fn(this);
      if (c?.own) return r;
    } else if (isFunction(this.core.config.callbacks?.indicatorSettings?.fn)) {
      r = this.core.config.callbacks.indicatorSettings.fn(this);
      if (this.core.config.callbacks?.indicatorSettings?.own) return r;
    }
    this.core.log(`invokeSettings: ${this.id}`);
    const cd = this.#ConfigDialogue;
    if (cd.update) {
      if (!isFunction(this.configInputs)) {
        this.core.error(
          `ERROR: Indicator ${this.name} does not provide configInputs() required for the settings dialogue`
        );
        return false;
      }
      const configTabs = this.configInputs();
      const { html, modifiers } = cd.configBuild(configTabs);
      const title = `${this.shortName} Config`;
      cd.setTitle(title);
      cd.setContent(html, modifiers);
      cd.update = false;
    }
    if (cd.state.name === 'closed') cd.open();
    else cd.setOpen();
    return true;
  }
  configInputs() {
    const name = this.name || this.shortName || this.id;
    const noConfig = `Indicator ${name} is not configurable.`;
    const noTabs = { 'No Config': { tab1: noConfig } };
    let tabs = {};
    let meta = this?.definition?.meta;
    if (
      !isObject(meta) &&
      !isObject(this?.style) &&
      !isObject(this?.definition?.input)
    )
      return noTabs;
    for (let tab in meta) {
      if (IGNORE_DEFINITIONS.includes(tab)) continue;
      tabs[tab] = meta[tab];
    }
    if (Object.keys(tabs).length == 0) tabs = noTabs;
    else {
      for (let tab in tabs) {
        this.dataOldDefault(tabs[tab]);
      }
    }
    return tabs;
  }
  dataOldDefault(entries) {
    if (isArray(entries)) {
      for (let entry of entries) {
        this.dataOldDefault(entry);
      }
    } else if (isObject(entries)) {
      for (let field in entries) {
        let f = isObject(entries[field]) ? entries[field] : entries;
        let keys = Object.keys(f);
        if (!keys.includes('data-oldval')) f['data-oldval'] = f?.value;
        if (!keys.includes('data-default')) {
          f['data-default'] = !!f?.default ? f?.default : f?.value;
        }
      }
    }
  }
  outputValueNumber(i, v, change) {
    let listeners = [change];
    return {
      type: 'number',
      min: `0`,
      d: v,
      listeners,
      fn: (el) => {
        this.configDialogue.provideEventListeners(`#${i}`, listeners)(el);
      }
    };
  }
  fieldEventChange() {
    return {
      event: 'change',
      fn: (e) => {
        this.fieldTargetUpdate(e.target.id, e.target.value);
        this.setRefresh();
        this.draw();
      }
    };
  }
  fieldTargetUpdate(target, value) {
    let s = this.definition.meta.style;
    for (let e in s) {
      for (let o in s[e]) {
        if (isObject(s[e][o]) && s[e][o].entry == target) {
          s[e][o]['data-oldval'] = s[e][o].value;
          s[e][o].value = value;
        }
      }
    }
  }
  configInputObject(input, i, v) {
    if (i instanceof InputPeriodEnable) {
      input[i.period] = this.configField(i.period, i.period, 'number', v, v);
      input.$function = function (el) {
        const elm = el.querySelector(`#${i.period}`);
        const checkBox = document.createElement('input');
        checkBox.id = `"enable${i.period}`;
        checkBox.checked = i.enable;
        checkBox.addEventListener('change', (e) => {
          if (e.currentTarget.checked) {
            console.log(`enable ${e.currentTarget.id}`);
          } else {
            console.log(`disable ${e.currentTarget.id}`);
          }
        });
        if (!!elm) {
          elm.insertAdjacentElement('beforebegin', checkBox);
        }
      };
    }
  }
  defineIndicator(settings, api) {
    let input = this.retrieveInput(settings);
    api = isObject(api) ? api : { outputs: [], options: [] };
    const definition = {
      input: {},
      output: {},
      meta: {
        input: {},
        output: [],
        outputOrder: [],
        outputLegend: {},
        style: {}
      }
    };
    if (!isObject(this.definition)) this.definition = definition;
    this.definition = mergeDeep(definition, this.definition);
    let d = this.definition;
    let dm = d.meta;
    let oo = [];
    let out = talibAPI?.[this.libName]?.outputs || [];
    d.input = !isObject(d.input) ? input : { ...d.input, ...input };
    d.output = !isObject(d.output) ? {} : d.output;
    dm = !isObject(dm) ? definition.meta : dm;
    dm.input = !isObject(dm.input) ? {} : dm.input;
    dm.output =
      !isArray(dm.output) || !dm.output.length ? out : [...out, ...dm.output];
    dm.outputOrder = !isArray(dm.outputOrder) ? [] : dm.outputOrder;
    dm.outputLegend = !isObject(dm.outputLegend) ? {} : dm.outputLegend;
    if (!isObjectNotEmpty(dm.style)) dm.style = this.style || {};
    this.validateInputs(d, input, api);
    this.populateMetaInputs(d);
    this.validateOutputs(d, api, oo);
    this.buildOutputOrder(dm, oo);
    this.buildOutputLegends(d);
    this.buildConfigOutputTab(dm);
  }
  retrieveInput(settings) {
    if (isObject(settings?.input)) return settings.input;
    else if (isObject(settings?.settings?.input))
      return settings.settings.input;
    else return {};
  }
  validateInputs(d, s, api) {
    const input = { ...d.input, ...s };
    delete input.style;
    d.input = input;
    for (let def of api.options) {
      if (!(def.name in d.input)) d.input[def.name] = api.options[def.name];
    }
    this.validate(d.input, api.options, d);
  }
  validateOutputs(d, api, oo) {
    if (Object.keys(d.output).length == 0) {
      for (let o of api.outputs) {
        d.output[o.name] = [];
      }
    }
    let doo = true;
    if (Object.keys(d.meta.output).length > 0) {
      doo = false;
      for (let o of d.meta.output) {
        if (isObject(o)) oo.push(o.name);
      }
    }
    for (let o in d.output) {
      if (!isArray(d.output[o])) d.output[o] = [];
      if (doo) oo.push(o);
    }
  }
  populateMetaInputs(def) {
    let input = def.input;
    let metaIn = def.meta.input;
    for (let i in metaIn) {
      metaIn[i].value = input[i];
    }
  }
  buildOutputOrder(dm, oo) {
    let u = [...new Set([...dm.outputOrder, ...oo])];
    let del = diff(u, oo);
    for (let x of del) {
      if (OUTPUTEXTRAS.includes(x)) continue;
      let idx = u.indexOf(x);
      u.splice(idx, 1);
    }
    dm.outputOrder = u;
  }
  buildOutputLegends(d) {
    let dm = d.meta;
    Object.keys(d.output);
    for (let [k, v] of Object.entries(dm.outputLegend)) {
      if (!isObject(v)) {
        dm.outputLegend[k] = {};
      }
      if (!isString(dm.outputLegend[k].labelStr)) {
        dm.outputLegend[k].label = false;
        dm.outputLegend[k].labelStr = '';
      }
      if (!isBoolean(dm.outputLegend[k].label))
        dm.outputLegend[k].label = false;
      if (!isBoolean(dm.outputLegend[k].value))
        dm.outputLegend[k].value = false;
    }
  }
  buildConfigOutputTab(dm) {
    for (let i in dm.style) {
      if (typeof dm.style[i] !== 'object') delete dm.style[i];
    }
    for (let x = 0; x < dm.output.length; x++) {
      let o = dm.output[x];
      let t = plotFunction(o?.plot);
      switch (t) {
        case 'renderLine':
          o.style = this.defaultMetaStyleLine(o, x, dm.style);
          break;
        case 'histogram':
          return 'histogram';
        case 'highLow':
          return 'highLow';
      }
    }
  }
  defaultMetaStyleLine(o, x, style) {
    let v;
    o.name = !o?.name ? 'output' : o.name;
    if (!isObject(style?.[o.name])) style[o.name] = {};
    let c = new Colour(style[o.name]?.colour?.value);
    if (!c.isValid) {
      let k = this.colours.length;
      v = x <= k ? this.colours[x] : this.colours[k % x];
    } else {
      v = c.value.hexa;
    }
    style[o.name].colour = this.defaultOutputField(
      `${o.name}Colour`,
      `${o.name} Colour`,
      v,
      'color'
    );
    if (!isNumber(style[o.name]?.width?.value)) v = 1;
    else v = style[o.name]?.width.value;
    style[o.name].width = this.defaultOutputField(
      `${o.name}Width`,
      `${o.name} Width`,
      v,
      'number',
      0
    );
    if ('dash' in style[o.name] && !!style[o.name].dash) {
      v = style[o.name]?.dash?.value;
      style[o.name].dash = this.defaultOutputField(
        `${o.name}dash`,
        `${o.name} Dash`,
        v,
        'dash',
        undefined,
        undefined
      );
    }
    return style[o.name];
  }
  defaultOutputField(id, label, value, type, min, max, defaultValue) {
    let fn, listeners, options;
    let change = this.fieldEventChange();
    switch (type) {
      case 'number':
        listeners = [change];
        fn = (el) => {
          this.configDialogue.provideEventListeners(`#${id}`, listeners)(el);
        };
        break;
      case 'color':
        listeners = [change, over, out];
        fn = (el) => {
          this.configDialogue.provideInputColor(el, `#${id}`);
          this.configDialogue.provideEventListeners(`#${id}`, listeners)(el);
        };
        type = 'text';
        break;
      case 'dash':
        listeners = [change];
        fn = (el) => {
          this.configDialogue.provideEventListeners(`#${id}`, listeners)(el);
        };
        type = 'select';
        let patterns = {};
        for (let d in dashedPatterns) {
          patterns[d] = dashedPatterns[d].toString();
        }
        options = patterns;
        break;
    }
    return this.configField(
      id,
      label,
      type,
      value,
      value,
      min,
      max,
      fn,
      label,
      options
    );
  }
  configField(
    i,
    label,
    type,
    value,
    defaultValue,
    min,
    max,
    fn,
    title,
    options
  ) {
    defaultValue = defaultValue || value;
    title = title || label;
    if (isNumber(min) && isNumber(max) && min > max) {
      [max, min] = [min, max];
    } else if (isNumber(min) && isNumber(max)) {
      value = limit(value, min, max);
    }
    let f = {
      entry: i,
      label,
      type,
      value,
      default: defaultValue,
      'data-oldval': value,
      'data-default': defaultValue,
      $function: fn,
      title
    };
    if (isNumber(min)) f.min = min;
    if (isNumber(max)) f.max = max;
    if (isObject(options) && Object.keys(options).length) f.options = options;
    return f;
  }
  defaultColour() {
    return '#fff';
  }
  addLegend() {
    let legend = {
      id: this.id,
      title: this.legendName,
      visible: this.#legendVisibility,
      type: 'indicator',
      parent: this,
      source: this.legendInputs.bind(this)
    };
    this.#legendID = this.chart.legend.add(legend);
  }
  legendInputs(pos = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false;
    const labels = [];
    const colours = [];
    const inputs = {};
    const index = this.Timeline.xPos2Index(pos[0]);
    const len = this.overlay.data.length;
    this.definition.meta.outputOrder;
    this.definition.meta.outputLegend;
    let c = index - (this.range.data.length - len);
    let l = limit(len - 1, 0, Infinity);
    c = limit(c, 0, l);
    let i = 0;
    for (let o of this.definition.meta.output) {
      let entry = this.overlay.data[c];
      if (o.type == 'overlay' || !isArray(entry) || entry.length == 0) continue;
      labels[i] = false;
      inputs[o.name] = this.scale.nicePrice(this.overlay.data[c][i + 1]);
      if (o.plot == 'histogram') {
        if (this.overlay.data[c][i + 1] < 0)
          colours[i] = this.definition.meta.style?.[o.name].dnStroke;
        else colours[i] = this.definition.meta.style?.[o.name].upStroke;
      } else
        colours[i] =
          this.definition.meta.style?.[o.name]?.colour?.value || '#ccc';
      i++;
    }
    return { inputs, colours, labels };
  }
  indicatorInput(start, end) {
    let input = {
      inReal: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    };
    do {
      let val = this.range.value(start);
      input.inReal.push(val[OHLCV.c]);
      input.open.push(val[OHLCV.o]);
      input.high.push(val[OHLCV.h]);
      input.low.push(val[OHLCV.l]);
      input.close.push(val[OHLCV.c]);
      input.volume.push(val[OHLCV.v]);
    } while (start++ < end);
    return input;
  }
  regeneratePlots(params) {
    return params.map((_, index) => {
      const num = index + 1;
      return {
        key: `${this.shortName}${num}`,
        title: `${this.shortName}${num}: `,
        type: 'line'
      };
    });
  }
  getTimePeriod() {
    let d = 0;
    let def = this.definition.input;
    let m = !!this.constructor?.timePeriodMultiplier ? 2 : 1;
    if ('timePeriod' in def) d = def.timePeriod * m;
    else {
      for (let i in def) {
        if (isInteger(def[i]) && def[i] > d) d = def[i];
      }
      d *= m;
    }
    return d;
  }
  TALibParams() {
    let end = this.range.dataLength;
    let step = this.getTimePeriod();
    let start = end - step;
    let input = this.indicatorInput(start, end);
    let hasNull = input.inReal.find((element) => element === null);
    if (hasNull) return false;
    else return { timePeriod: step, ...input };
  }
  formatValue(entry) {
    let v = [];
    let i = 0;
    for (let o in this.definition.output) {
      v[i++] = entry[o][0];
    }
    return v;
  }
  noCalc(indicator, range = this.range) {
    return (
      this.chart.status == 'destroyed' ||
      !this.core.TALibReady ||
      !isString(indicator) ||
      !(indicator in this.TALib) ||
      !isObject(range) ||
      range.dataLength < this.definition.input.timePeriod
    );
  }
  noCalcCustom(indicator, range = this.range) {
    return (
      this.chart.status == 'destroyed' ||
      !this.core.TALibReady ||
      !isFunction(indicator) ||
      !isObject(range) ||
      range.dataLength < this.definition.input.timePeriod
    );
  }
  calcIndicator(
    indicator,
    params = {},
    range,
    output = this.definition.output
  ) {
    let indicatorFn;
    if (!this.noCalcCustom(indicator)) indicatorFn = indicator;
    else if (!this.noCalc(indicator, range))
      indicatorFn = this.TALib[indicator];
    else return false;
    let d = this.getTimePeriod();
    let start, end;
    let p = d;
    let t = p + (params?.padding || 0);
    let od = this.overlay.data;
    if (range instanceof Range) {
      start = 0;
      end = range.dataLength - t + 1;
    } else if (isObject(range)) {
      start =
        range?.indexStart || this.Timeline.t2Index(range?.tsStart || 0) || 0;
      end =
        range?.indexEnd ||
        this.Timeline.t2Index(range?.tsEnd) ||
        range.dataLength - t + 1;
    } else return false;
    if (!isArray(od)) return false;
    else if (od.length == 0);
    else if (od.length + t !== range.dataLength) {
      if (od[0][0] > range.value(t)[0]) {
        start = 0;
        end = range.getTimeIndex(od[0][0]) - t;
        end = limit(end, t, range.dataLength - 1);
      } else if (od[od.length - 1][0] < range.value(range.dataLength - 1)[0]) {
        start = od.length - 1 + t;
        start = limit(start, 0, range.dataLength);
        end = range.dataLength - 1;
      } else return false;
    } else return false;
    if (end < t) {
      this.setError({ type: 'noData', msg: 'Insufficient input data' });
      return false;
    }
    if (end - start < t) {
      start -= t + p - (end - start);
    }
    let data = [];
    let entry, input, value;
    while (start < end) {
      input = this.indicatorInput(start, start + t);
      params = { ...params, ...input };
      entry = indicatorFn(params);
      value = this.formatValue(entry);
      data.push([range.value(start + p - 1)[0], ...value]);
      start++;
    }
    return data;
  }
  calcIndicatorHistory(calcFn) {
    const calc = () => {
      let od = this.overlay.data;
      const data = this.calcIndicator(
        this.libName,
        this.definition.input,
        this.range
      );
      if (isArray(data)) {
        new Set(data);
        new Set(od);
        let a,
          p,
          r = {};
        if (!isArray(od) || od.length == 0) {
          this.overlay.data = data;
          return;
        } else if (!data.length) return;
        else if (data[0][0] < od[0][0]) {
          a = data;
          p = od;
        } else if (data[data.length - 1][0] > od[od.length - 1][0]) {
          a = od;
          p = data;
        } else {
          a = od;
          p = data;
        }
        for (let v of a) {
          r[v[0]] = v;
        }
        for (let v of p) {
          r[v[0]] = v;
        }
        this.overlay.data = Object.values(r);
        this.state = IndicatorState.hasData;
        this.setRefresh();
      }
    };
    if (this.core.TALibReady) calc();
    else this.core.talibAwait.push(calc.bind(this));
  }
  calcIndicatorStream(indicator, params, range = this.range) {
    if (!(range instanceof Range)) return false;
    let indicatorFn;
    if (!this.noCalcCustom(indicator)) indicatorFn = indicator;
    else if (!this.noCalc(indicator, range))
      indicatorFn = this.TALib[indicator];
    else return false;
    let entry = indicatorFn(params);
    let end = range.dataLength;
    let time = range.value(end)[0];
    let value = this.formatValue(entry);
    return [time, ...value];
  }
  newValue(value) {
    this.#setValue((v) => this.overlay.data.push(v));
  }
  updateValue(value) {
    this.#setValue((v) => {
      let l = this.overlay.data.length - 1;
      this.overlay.data[l] = v;
    });
  }
  #setValue(fn) {
    let p = this.TALibParams();
    if (!p) return false;
    let v = this.calcIndicatorStream(this.libName, p);
    if (!v) return false;
    fn(v);
    this.state = IndicatorState.hasData;
    this.target.setPosition(this.core.scrollPos, 0);
    this.doDraw = true;
    this.draw(this.range);
  }
  plot(plots, type, opts) {
    super.plot(plots, type, opts);
  }
  plotIt(j, k, p, r, s) {
    const data = this.overlay.data;
    const width = this.xAxis.candleW;
    const zero = this.yAxis.yPos(0);
    const plot = { w: width, zero };
    const opts = {};
    let plots = [];
    while (j) {
      if (k < 0 || k >= data.length || !isArray(data[k])) {
        plots.push({ x: null, y: null });
      } else {
        plot.x = this.xAxis.xPos(data[k][0]);
        plot.y = this.yAxis.yPos(data[k][p]);
        plots.push({ ...plot });
      }
      k++;
      j--;
    }
    for (let key in s) {
      if (!!s[key]?.value) opts[key] = s[key].value;
    }
    this.plot(plots, r, opts);
  }
  draw(range = this.range) {
    const data = this.overlay.data;
    if (data.length < 2) return;
    if (!super.mustUpdate()) return;
    this.clear();
    this.xAxis.smoothScrollOffset || 0;
    const meta = this.definition.meta;
    const plots = {};
    let o = this.Timeline.rangeScrollOffset;
    let d = range.data.length - data.length;
    let c = range.indexStart - d - 2;
    let i = range.Length + o * 2 + 2;
    let x = 1;
    if (!meta.output.length) return super.updated();
    for (let p of meta.output) {
      let r = plotFunction(p.plot);
      if (r) plots[p?.name] = { x: x++, r };
    }
    let oo =
      meta?.outputOrder.length > 0 ? meta.outputOrder : Object.keys(plots);
    let q = oo.reverse();
    for (let p of q) {
      let style = this.formatStyle(this.definition.meta.style[p], p);
      this.plotIt(i, c, plots[p].x, plots[p].r, style);
    }
    this.target.viewport.render();
    super.updated();
  }
  formatStyle(style, plot) {
    let e,
      s = {};
    for (let entry in style) {
      e = entry.replace(plot, '').toLowerCase();
      switch (e) {
        case 'colour':
          e = 'stroke';
          break;
      }
      s[e] = style[entry];
    }
    return s;
  }
  updated() {
    this.setRefresh();
    super.updated();
  }
  validate(src, def, d) {
    let dm = d.meta;
    let val;
    for (let f of def) {
      val = typeof src[f.name] == 'object' ? src[f.name]?.value : src[f.name];
      src[f.name] = typeof val !== f.type ? f.defaultValue : val;
      if ('range' in def)
        src[f.name] = limit(src[f.name], f.range.min, f.range.max);
      const n = this.configField(
        f?.name,
        f?.displayName,
        f?.type,
        src[f.name],
        f?.defaultValue,
        f?.range?.min,
        f?.range?.max,
        undefined,
        f?.hint
      );
      dm.input[f.name] = { ...n, ...dm.input[f.name] };
    }
  }
}
function plotFunction(t) {
  switch (t) {
    case 'line':
    case 'line_dash':
    case 'limit_lower':
    case 'limit_upper':
      return 'renderLine';
    case 'histogram':
      return 'histogram';
    case 'highLowRange':
      return 'highLowRange';
    default:
      return false;
  }
}
const over = {
  event: 'pointerover',
  fn: (e) => {
    e.target.style.border = '1px solid #f00;';
  }
};
const out = {
  event: 'pointerout',
  fn: (e) => {
    e.target.style.border = 'none;';
  }
};
function indicatorHashKey(params) {
  const objStr = JSON.stringify(params);
  const hash = cyrb53(objStr);
  return `${SHORTNAME}_Indicator_${hash}`;
}

class ADX extends Indicator {
  get name() {
    return 'Average Directional Movement Index';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.percent;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      },
      highLowRange: {
        colour: { value: '#880E4F' },
        width: { value: 1 },
        dash: { value: [2, 2] },
        fill: { value: '#880E4F08' },
        high: { value: 75 },
        low: { value: 25 }
      }
    };
  }
  static {
    this.timePeriodMultiplier = true;
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'ADX';
    this.libName = 'ADX';
    this.precision = 2;
    this.scaleOverlay = true;
    this.init(ADX$1);
  }
}

class ATR extends Indicator {
  get name() {
    return 'Average True Range';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.relative;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      },
      highLowRange: {
        colour: { value: '#880E4F' },
        width: { value: 1 },
        dash: { value: [2, 2] },
        fill: { value: '#880E4F08' },
        high: { value: 75 },
        low: { value: 25 }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'ATR';
    this.libName = 'ATR';
    this.precision = 2;
    this.scaleOverlay = true;
    this.init(ATR$1);
  }
}

class AROON extends Indicator {
  get name() {
    return 'Aroon';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.percent;
  }
  static {
    this.defaultStyle = {
      aroonDown: {
        colour: { value: '#c89' },
        width: { value: 1 },
        dash: { value: '' }
      },
      aroonUp: {
        colour: { value: '#08c' },
        width: { value: 1 },
        dash: { value: '' }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'AROON';
    this.libName = 'AROON';
    this.definition = {
      input: {
        high: [],
        low: [],
        timePeriod: 14
      },
      output: {
        aroonDown: [],
        aroonUp: []
      }
    };
    this.precision = 2;
    this.scaleOverlay = true;
    this.init(AROON$1);
  }
}

class BB extends Indicator {
  get name() {
    return 'Bollinger Bands';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = true;
  }
  static {
    this.defaultStyle = {
      lowerBand: {
        colour: { value: '#08c' },
        width: { value: 1 },
        dash: { value: '' }
      },
      middleBand: {
        colour: { value: '#0080c088' },
        width: { value: 1 },
        dash: { value: [20, 5] }
      },
      upperBand: {
        colour: { value: '#08c' },
        width: { value: 1 },
        dash: { value: '' }
      },
      fill: {
        colour: { value: '#0080c044' }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'BB';
    this.libName = 'BBANDS';
    this.definition = {
      input: {
        inReal: [],
        nbDevDn: 2,
        nbDevUp: 2,
        timePeriod: 20
      },
      output: {
        lowerBand: [],
        middleBand: [],
        upperBand: []
      },
      meta: {}
    };
    this.precision = 2;
    this.scaleOverlay = false;
    this.init(BBANDS);
  }
}

class CCI extends Indicator {
  get name() {
    return 'Commodity Channel Index';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.relative;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      },
      highLowRange: {
        colour: { value: '#880E4F' },
        width: { value: 1 },
        dash: { value: [2, 2] },
        fill: { value: '#880E4F08' },
        high: { value: 100 },
        low: { value: -100 }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'CCI';
    this.libName = 'CCI';
    this.precision = 2;
    this.scaleOverlay = true;
    this.init(CCI$1);
  }
}

class CMO extends Indicator {
  get name() {
    return 'Chande Momentum Oscillator';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.relative;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      },
      highLowRange: {
        colour: { value: '#880E4F' },
        width: { value: 1 },
        dash: { value: [2, 2] },
        fill: { value: '#880E4F08' },
        high: { value: 75 },
        low: { value: 25 }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'CMO';
    this.libName = 'CMO';
    this.precision = 2;
    this.scaleOverlay = true;
    this.init(CMO$1);
  }
}

class DMI extends Indicator {
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.relative;
  }
  static {
    this.yAxisPadding = YAXIS_PADDING;
  }
  static {
    this.colours = [];
  }
  static {
    this.defaultStyle = {
      'DI+': {
        colour: { value: '#0f0' },
        width: { value: 1 },
        dash: { value: [] }
      },
      'DI-': {
        colour: { value: '#f00' },
        width: { value: 1 },
        dash: { value: [] }
      },
      ADX: {
        colour: { value: '#00f' },
        width: { value: 1 },
        dash: { value: [] }
      }
    };
  }
  static {
    this.timePeriodMultiplier = true;
  }
  #precision;
  get name() {
    return 'Directional Movement Index';
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.#precision = 2;
    this.shortName = 'DMI';
    this.scaleOverlay = false;
    this.definition = {
      input: {
        inReal: [],
        timePeriod: 20
      },
      output: {
        output: []
      },
      meta: {
        output: [
          { name: 'DI+', type: 'custom', plot: 'line' },
          { name: 'DI-', type: 'custom', plot: 'line' },
          { name: 'ADX', type: 'custom', plot: 'line' }
        ],
        outputOrder: ['DMI+', 'DMI-', 'ADX'],
        outputLegend: {
          'DI+': { labelStr: 'DI+', label: true, value: true },
          'DI-': { labelStr: 'DI-', label: true, value: true },
          ADX: { labelStr: 'ADX', label: true, value: true }
        }
      }
    };
    this.init();
    this.on('trade_added', this.tradeAdded);
  }
  get data() {
    return this.overlay.data;
  }
  get overlayData() {
    return this.overlay.data;
  }
  calcIndicator(indicator, params = {}, range = this.range) {
    let DIPlusDef = { input: { timePeriod: 14 }, output: { output: [] } };
    let DIMinusDef = { input: { timePeriod: 14 }, output: { output: [] } };
    let ADXDef = { input: { timePeriod: 14 }, output: { output: [] } };
    let result1 = super.calcIndicator('PLUS_DI', params, range, DIPlusDef);
    let result2 = super.calcIndicator('MINUS_DI', params, range, DIMinusDef);
    let result3 = super.calcIndicator('ADX', params, range, ADXDef);
    if (!result1 && !result2 && !result3) return false;
    for (let i = 0; i < result1.length; i++) {
      result1[i][2] = result2[i][1];
      result1[i][3] = result3[i][1];
    }
    return result1;
  }
  calcIndicatorStream(indicator, params = {}, range = this.range) {
    let ts = range.value()[0];
    let idx = range.getTimeIndex(ts);
    this.data[idx] = [ts, 0, 0];
    return false;
  }
}

class DX extends Indicator {
  get name() {
    return 'Directional Movement Index';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.percent;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      },
      highLowRange: {
        colour: { value: '#880E4F' },
        width: { value: 1 },
        dash: { value: [2, 2] },
        fill: { value: '#880E4F08' },
        high: { value: 75 },
        low: { value: 25 }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'DX';
    this.libName = 'DX';
    this.precision = 2;
    this.scaleOverlay = true;
    this.init(DX$1);
  }
}

class EMA extends Indicator {
  get name() {
    return 'Exponential Moving Average';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = true;
  }
  static {
    this.colours = ['#9C27B0', '#9C27B0', '#66BB6A', '#66BB6A'];
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#C80' },
        width: { value: 1 },
        dash: { value: [] }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'EMA';
    this.libName = 'EMA';
    this.definition = {
      input: {
        inReal: [],
        timePeriod: 20
      },
      output: {
        output: []
      },
      meta: {
        input: {
          timePeriod: {
            entry: 'timePeriod',
            label: 'Period',
            type: 'number',
            value: 5,
            default: 30,
            min: '3',
            title: `Number of time units to use in calculation`,
            $function: this.configDialogue.provideEventListeners('#Period', [
              {
                event: 'change',
                fn: (e) => {
                  console.log(`#Period = ${e.target.value}`);
                }
              }
            ])
          }
        }
      }
    };
    this.precision = 2;
    this.checkParamCount = false;
    this.scaleOverlay = false;
    EMA.inCnt++;
    this.init(EMA$1);
  }
}

class MA extends Indicator {
  get name() {
    return 'Moving Average';
  }
  #precision;
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = true;
  }
  static {
    this.colours = ['#9C27B0', '#9C27B0', '#66BB6A', '#66BB6A'];
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#9C27B0' },
        width: { value: 1 },
        dash: { value: [] }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'MA';
    this.libName = 'MA';
    this.definition = {
      input: {
        inReal: [],
        timePeriod: 20
      },
      output: {
        output: []
      }
    };
    this.#precision = 2;
    this.primaryPane = true;
    this.scaleOverlay = false;
    MA.inCnt++;
    this.init(MA$1);
  }
}

class MA_Multi extends Indicator {
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = true;
  }
  static {
    this.colours = [
      colours2[8],
      colours2[18],
      colours2[28],
      colours2[38],
      colours2[48]
    ];
  }
  static {
    this.defaultStyle = {
      stroke1: MA_Multi.colours[0],
      width1: '1',
      stroke2: MA_Multi.colours[1],
      width2: '1',
      stroke3: MA_Multi.colours[2],
      width3: '1',
      stroke4: MA_Multi.colours[3],
      width4: '1',
      stroke5: MA_Multi.colours[4],
      width5: '1'
    };
  }
  get name() {
    return 'Moving Average Multi';
  }
  #precision;
  #MACnt;
  #MACntMax;
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'MA';
    this.libName = 'MA';
    this.definition = {
      input: {
        inReal: [],
        timePeriod1: new InputPeriodEnable(true, 5),
        timePeriod2: new InputPeriodEnable(true, 10),
        timePeriod3: new InputPeriodEnable(true, 20),
        timePeriod4: new InputPeriodEnable(true, 30),
        timePeriod5: new InputPeriodEnable(true, 50)
      },
      output: {
        output1: [],
        output2: [],
        output3: [],
        output4: [],
        output5: []
      }
    };
    this.#precision = 2;
    this.primaryPane = true;
    this.scaleOverlay = false;
    this.plots = [{ key: 'MA_1', title: 'MA: ', type: 'line' }];
    this.#MACnt = 3;
    this.#MACntMax = 5;
    this.MA = {
      MA1: { enabled: false, ma: null },
      MA2: { enabled: false, ma: null },
      MA3: { enabled: false, ma: null },
      MA4: { enabled: false, ma: null },
      MA5: { enabled: false, ma: null }
    };
    MA.inCnt++;
    const MAChildren = params.overlay.settings?.MAChildren || this.MA;
    this.#MACnt = Object.keys(MAChildren).length;
    this.MA.ma1 = new MA(
      target,
      (xAxis = false),
      (yAxis = false),
      config,
      parent,
      params
    );
    this.MA.ma2 = new MA(
      target,
      (xAxis = false),
      (yAxis = false),
      config,
      parent,
      params
    );
  }
  legendInputs(pos = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false;
    const inputs = {};
    const { c, colours } = super.legendInputs(pos);
    inputs.MA_1 = this.scale.nicePrice(this.overlay.data[c][1]);
    return { inputs, colours };
  }
  draw(range = this.range) {
    if (this.overlay.data.length < 2) return;
    if (!super.mustUpdate()) return;
    this.scene.clear();
    const data = this.overlay.data;
    const width = this.xAxis.candleW;
    const plots = [];
    this.xAxis.smoothScrollOffset || 0;
    const plot = {
      w: width
    };
    let o = this.Timeline.rangeScrollOffset;
    let d = range.data.length - this.overlay.data.length;
    let c = range.indexStart - d - 2;
    let i = range.Length + o * 2 + 2;
    while (i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.push({ x: null, y: null });
      } else {
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(data[c][1]);
        plots.push({ ...plot });
      }
      c++;
      i--;
    }
    this.plot(plots, 'renderLine', this.style);
    this.target.viewport.render();
    super.updated();
  }
}

class MACD extends Indicator {
  get name() {
    return 'Moving Average Convergence/Divergence';
  }
  #precision;
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.relative;
  }
  static {
    this.yAxisPadding = YAXIS_PADDING;
  }
  static {
    this.colours = ['#9C27B0', '#9C27B0', '#66BB6A', '#66BB6A'];
  }
  static {
    this.defaultStyle = {
      MACD: {
        colour: { value: '#08c' },
        width: { value: 1 },
        dash: { value: '' }
      },
      MACDSignal: {
        colour: { value: '#08c' },
        width: { value: 1 },
        dash: { value: '' }
      },
      MACDHist: {
        upStroke: '#0f0',
        upFill: '#0c0',
        upWidth: '1',
        dnStroke: '#f00',
        dnFill: '#c00',
        dnWidth: '1'
      }
    };
  }
  static {
    this.timePeriodMultiplier = true;
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'MACD';
    this.libName = 'MACD';
    this.definition = {
      input: {
        inReal: [],
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9
      },
      output: {
        MACD: [],
        MACDSignal: [],
        MACDHist: []
      },
      meta: {
        outputOrder: ['MACD', 'MACDSignal', 'MACDHist'],
        outputLegend: {
          MACD: { labelStr: 'MACD', label: false, value: true },
          MACDSignal: { labelStr: 'Signal', label: false, value: true },
          MACDHist: { labelStr: 'Hist', label: false, value: true }
        }
      }
    };
    this.#precision = 2;
    this.scaleOverlay = false;
    MACD.inCnt++;
    this.init(MACD$1);
  }
  draw() {
    return super.draw();
  }
}

class MFI extends Indicator {
  get name() {
    return 'Money Flow Index';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.percent;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      },
      highLowRange: {
        colour: { value: '#880E4F' },
        width: { value: 1 },
        dash: { value: [2, 2] },
        fill: { value: '#880E4F08' },
        high: { value: 100 },
        low: { value: -100 }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'MFI';
    this.libName = 'MFI';
    this.precision = 2;
    this.scaleOverlay = true;
    this.init(MFI$1);
  }
}

class OBV extends Indicator {
  get name() {
    return 'On Balance Volume';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.default;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      },
      highLowRange: {
        colour: { value: '#880E4F' },
        width: { value: 1 },
        dash: { value: [2, 2] },
        fill: { value: '#880E4F08' },
        high: { value: 100 },
        low: { value: -100 }
      }
    };
  }
  static {
    this.timePeriodMultiplier = true;
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'OBV';
    this.libName = 'OBV';
    this.precision = 2;
    this.scaleOverlay = true;
    this.init(OBV$1);
  }
}

class PPO extends Indicator {
  get name() {
    return 'Percentage Price Oscillator';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.relative;
  }
  static {
    this.yAxisPadding = YAXIS_PADDING;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      },
      highLowRange: {
        colour: { value: '#880E4F' },
        width: { value: 1 },
        dash: { value: [2, 2] },
        fill: { value: '#880E4F08' },
        high: { value: 100 },
        low: { value: -100 }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'PPO';
    this.libName = 'PPO';
    this.precision = 2;
    this.scaleOverlay = true;
    this.init(PPO$1);
  }
}

class PSAR extends Indicator {
  get name() {
    return 'Parabolic Stop and Reverse';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = true;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'PSAR';
    this.libName = 'SAR';
    this.precision = 2;
    this.scaleOverlay = false;
    this.init(SAR);
  }
}

class ROC extends Indicator {
  get name() {
    return 'Rate of Change';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.relative;
  }
  static {
    this.yAxisPadding = YAXIS_PADDING;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      },
      highLowRange: {
        colour: { value: '#880E4F' },
        width: { value: 1 },
        dash: { value: [2, 2] },
        fill: { value: '#880E4F08' },
        high: { value: 100 },
        low: { value: -100 }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'ROC';
    this.libName = 'ROC';
    this.precision = 2;
    this.scaleOverlay = true;
    this.init(ROC$1);
  }
}

class RSI extends Indicator {
  get name() {
    return 'Relative Strength Index';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.percent;
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#E91E63' },
        width: { value: 1 },
        dash: { value: [] }
      },
      highLowRange: {
        colour: { value: '#880E4F' },
        width: { value: 1 },
        dash: { value: [2, 2] },
        fill: { value: '#880E4F08' },
        high: { value: 75 },
        low: { value: 25 }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'RSI';
    this.libName = 'RSI';
    this.definition = {
      input: {
        inReal: [],
        timePeriod: 20
      },
      output: {
        output: []
      },
      meta: {
        outputOrder: ['output', 'highLowRange'],
        output: [
          {
            name: 'highLowRange',
            type: 'overlay',
            plot: 'highLowRange',
            style: RSI.defaultStyle.highLow
          }
        ],
        style: RSI.defaultStyle
      }
    };
    this.checkParamCount = false;
    this.init(RSI$1);
  }
}

class SMA extends Indicator {
  get name() {
    return 'Simple Moving Average';
  }
  #precision;
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = true;
  }
  static {
    this.colours = ['#9C27B0', '#9C27B0', '#66BB6A', '#66BB6A'];
  }
  static {
    this.defaultStyle = {
      output: {
        colour: { value: '#0097A7' },
        width: { value: 1 },
        dash: { value: [] }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'SMA';
    this.libName = 'SMA';
    this.definition = {
      input: {
        inReal: [],
        timePeriod: 20
      },
      output: {
        output: []
      }
    };
    this.#precision = 2;
    this.primaryPane = true;
    this.scaleOverlay = false;
    SMA.inCnt++;
    this.init(SMA$1);
  }
}

class STOCH extends Indicator {
  get name() {
    return 'Stochastic Oscillator';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.relative;
  }
  static {
    this.defaultStyle = {
      slowK: {
        colour: { value: '#c89' },
        width: { value: 1 },
        dash: { value: '' }
      },
      slowD: {
        colour: { value: '#08c' },
        width: { value: 1 },
        dash: { value: '' }
      }
    };
  }
  static {
    this.timePeriodMultiplier = true;
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'STOCH';
    this.libName = 'STOCH';
    this.definition = {
      input: {
        high: [],
        low: [],
        close: [],
        fastK_Period: 5,
        slowK_Period: 3,
        slowD_Period: 3
      },
      output: {
        slowK: [],
        slowD: []
      }
    };
    this.checkParamCount = false;
    this.init(STOCH$1);
  }
}

class STOCHRSI extends Indicator {
  get name() {
    return 'Stochastic RSI';
  }
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = false;
  }
  static {
    this.scale = YAXIS_TYPE.relative;
  }
  static {
    this.defaultStyle = {
      fastK: {
        colour: { value: '#c89' },
        width: { value: 1 },
        dash: { value: '' }
      },
      fastD: {
        colour: { value: '#08c' },
        width: { value: 1 },
        dash: { value: '' }
      }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'STOCHRSI';
    this.libName = 'STOCHRSI';
    this.definition = {
      input: {
        inReal: [],
        timePeriod: 14,
        stochPeriod: 14,
        KPeriod: 3,
        DPeriod: 3
      },
      output: {
        fastK: [],
        fastD: []
      }
    };
    this.checkParamCount = false;
    this.init(STOCHRSI$1);
  }
}

class VolumeBar {
  constructor(scene, theme) {
    this.scene = scene;
    this.ctx = this.scene.context;
    this.width = this.scene.width;
    this.theme = theme;
  }
  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const barColour = hilo
      ? this.theme.up.colour.value
      : this.theme.dn.colour.value;
    ctx.save();
    ctx.strokeStyle = barColour;
    ctx.fillStyle = barColour;
    ctx.fillRect(
      Math.floor(data.x),
      Math.floor(data.z - data.h),
      Math.floor(data.w),
      Math.floor(data.h)
    );
    ctx.restore();
  }
}

class Volume extends Indicator {
  get name() {
    return 'Volume';
  }
  #defaultStyle;
  #volumeBar;
  #primaryPane;
  static {
    this.version = '1.0';
  }
  static {
    this.inCnt = 0;
  }
  static {
    this.primaryPane = 'both';
  }
  static {
    this.scale = YAXIS_TYPE.percent;
  }
  static {
    this.defaultStyle = {
      up: { colour: { value: '#388E3C' } },
      dn: { colour: { value: '#D32F2F' } },
      height: { percent: { value: 15 } }
    };
  }
  constructor(target, xAxis = false, yAxis = false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    this.shortName = 'VOL';
    this.checkParamCount = false;
    this.scaleOverlay = true;
    this.definition = {
      meta: {
        style: {
          up: { colour: { value: '#388E3C' } },
          dn: { colour: { value: '#D32F2F' } },
          height: { percent: { value: 15 } }
        }
      }
    };
    this.#defaultStyle = defaultTheme.volume;
    this.#primaryPane = 'both';
    Volume.inCnt++;
    const overlay = params.overlay;
    this.id = params.overlay?.id || uid(this.shortName);
    this.#defaultStyle = { ...this.defaultStyle, ...this.theme.volume };
    this.style = overlay?.settings?.style
      ? { ...this.#defaultStyle, ...overlay.settings.style }
      : { ...this.#defaultStyle, ...config.style };
    if (this.chart.type === 'primaryPane') {
      this.style.Height = limit(this.style.Height, 0, 100) || 100;
      this.#primaryPane = true;
    } else {
      this.style.Height = 100;
      this.#primaryPane = false;
    }
    this.mStyle.up.colour.value = this.style.UpColour;
    this.mStyle.dn.colour.value = this.style.DnColour;
    this.mStyle.height.percent.value = this.style.Height;
    this.#volumeBar = new VolumeBar(target.scene, this.mStyle);
    this.addLegend();
    this.configDialogue.start();
  }
  get primaryPane() {
    return this.#primaryPane;
  }
  get defaultStyle() {
    return this.#defaultStyle;
  }
  get mStyle() {
    return this.definition.meta.style;
  }
  legendInputs(pos = this.chart.cursorPos) {
    if (this.range.dataLength == 0) return false;
    const idx = super.Timeline.xPos2Index(pos[0]);
    const index = limit(idx, 0, this.range.data.length - 1);
    const ohlcv = this.range.data[index];
    this.chart.theme.candle;
    const colours =
      ohlcv[4] >= ohlcv[1]
        ? [this.mStyle.up.colour.value.slice(0, 7)]
        : [this.mStyle.dn.colour.value.slice(0, 7)];
    const inputs = { V: this.scale.nicePrice(ohlcv[5]) };
    return { inputs, colours };
  }
  calcIndicatorHistory() {}
  draw(range = this.range) {
    if (range.dataLength < 2) return false;
    if (!this.mustUpdate()) return false;
    this.scene.clear();
    const data = range.data;
    const zeroPos = this.scene.height;
    const offset = this.xAxis.smoothScrollOffset || 0;
    let w = Math.max(this.xAxis.candleW - 1, 1);
    w = candleW(w);
    const volume = {
      x: 0 + offset - this.xAxis.candleW,
      w: w,
      z: zeroPos
    };
    const volH = Math.floor((zeroPos * this.mStyle.height.percent.value) / 100);
    let o = this.core.rangeScrollOffset;
    let v = range.indexStart - o;
    let i = range.Length + o * 2;
    let j = i;
    let u = v;
    let x;
    let maxVol = 0;
    while (j--) {
      x = range.value(u);
      if (x[4] !== null) {
        maxVol = x[5] > maxVol ? x[5] : maxVol;
      }
      u++;
    }
    while (i--) {
      x = range.value(v);
      volume.x = bRound(this.xAxis.xPos(x[0]) - w / 2);
      if (x[4] !== null) {
        volume.h = volH - volH * ((maxVol - x[5]) / maxVol);
        volume.raw = data[v];
        this.#volumeBar.draw(volume);
      }
      v++;
    }
    super.updated();
  }
}

const IndicatorClasses = {
  ADX,
  ATR,
  AROON,
  BB,
  CCI,
  CMO,
  DMI,
  DX,
  EMA,
  MA,
  MACD,
  MFI,
  OBV,
  PPO,
  PSAR,
  ROC,
  RSI,
  SMA,
  STOCHRSI,
  VOL: Volume
};
const indicators = {};
((ind) => {
  for (let i in ind) {
    indicators[i] = {
      id: i,
      name: ind[i].prototype.name,
      event: 'addIndicator',
      ind: ind[i]
    };
  }
})(IndicatorClasses);

var version = '0.154.0';

function compress(asArray) {
  asArray = asArray === true;
  var i,
    dictionary = {},
    uncompressed = this,
    c,
    wc,
    w = '',
    result = [],
    ASCII = '',
    dictSize = 256;
  for (i = 0; i < 256; i += 1) {
    dictionary[String.fromCharCode(i)] = i;
  }
  for (i = 0; i < uncompressed.length; i += 1) {
    c = uncompressed.charAt(i);
    wc = w + c;
    if (dictionary.hasOwnProperty(wc)) {
      w = wc;
    } else {
      result.push(dictionary[w]);
      ASCII += String.fromCharCode(dictionary[w]);
      dictionary[wc] = dictSize++;
      w = String(c);
    }
  }
  if (w !== '') {
    result.push(dictionary[w]);
    ASCII += String.fromCharCode(dictionary[w]);
  }
  return asArray ? result : ASCII;
}
function decompress() {
  var i,
    tmp = [],
    dictionary = [],
    compressed = this,
    w,
    result,
    k,
    entry = '',
    dictSize = 256;
  for (i = 0; i < 256; i += 1) {
    dictionary[i] = String.fromCharCode(i);
  }
  if (compressed && typeof compressed === 'string') {
    for (i = 0; i < compressed.length; i += 1) {
      tmp.push(compressed[i].charCodeAt(0));
    }
    compressed = tmp;
    tmp = null;
  }
  w = String.fromCharCode(compressed[0]);
  result = w;
  for (i = 1; i < compressed.length; i += 1) {
    k = compressed[i];
    if (dictionary[k]) {
      entry = dictionary[k];
    } else {
      if (k === dictSize) {
        entry = w + w.charAt(0);
      } else {
        return null;
      }
    }
    result += entry;
    dictionary[dictSize++] = w + entry.charAt(0);
    w = entry;
  }
  return result;
}
String.prototype.compress = compress;
String.prototype.decompress = decompress;

function validateShallow(data, isCrypto = false) {
  if (!isArray(data)) return false;
  let rnd = getRandomIntBetween(0, data.length);
  if (!isCandleValid(data[0], isCrypto)) return false;
  if (!isCandleValid(data[rnd], isCrypto)) return false;
  if (!isCandleValid(data[data.length - 1], isCrypto)) return false;
  let t1 = data[0][0];
  let t2 = data[1][0];
  let t3 = data[2][0];
  if (t1 > t2 && t2 > t3) return false;
  return true;
}
function validateDeep(data, isCrypto = false) {
  if (!isArray(data)) return false;
  let i = 0;
  let prev = 0;
  while (i < data.length) {
    if (!isCandleValid(data[i], isCrypto)) return false;
    if (data[i][0] < prev) return false;
    prev = data[i][0];
    i++;
  }
  return true;
}
function fillGaps(data, timeFrameMS) {
  if (!isArray(data) || data.length == 1) return false;
  let a,
    b,
    c,
    e,
    r = [],
    i = 0,
    l = (data[data.length - 1][0] - data[i][0]) / timeFrameMS;
  while (i < l) {
    a = data[i][0];
    b = data[i + 1][0];
    c = b - a;
    if (c == timeFrameMS) {
      r.push(data[i]);
    } else if (c > timeFrameMS) {
      e = [a + timeFrameMS, null, null, null, null, null];
      r.push(e);
      data.splice(i + 1, 0, e);
    }
    i++;
  }
  return data;
}
function isCandleValid(c, isCrypto = false) {
  if (!isArray(c)) return false;
  if (c.length !== 6) return false;
  if (isCrypto) if (!isValidTimeInRange(c[0])) return false;
  if (
    !isNumber(c[1]) ||
    !isNumber(c[2]) ||
    !isNumber(c[3]) ||
    !isNumber(c[4]) ||
    !isNumber(c[5])
  )
    return false;
  return true;
}
function sanitizeCandles(c) {
  for (let i of c) {
    for (let j = 0; j < 6; j++) {
      i.length = 6;
      i[j] *= 1;
    }
  }
  return c;
}

const ALERT = 'alert';
class Alerts {
  #list = new xMap();
  #handlers = {};
  constructor(alerts) {
    if (isArray(alerts)) {
      for (let a of alerts) {
        this.add(a?.price, a?.condition, a?.handler);
      }
    }
  }
  get list() {
    return this.#list;
  }
  get handlers() {
    return this.#handlers;
  }
  destroy() {
    this.#list.clear();
    this.#handlers = {};
  }
  batchAdd(alerts) {
    if (isArray(alerts)) {
      let ids = [];
      for (let a of alerts) {
        ids.push(this.add(a?.price, a?.condition, a?.handler));
      }
      return ids;
    } else return false;
  }
  add(price, condition, handler) {
    if (isNaN(price) || !isFunction(handler)) return false;
    const id = uid(ALERT);
    const alert = { price, condition };
    if (this.list.has(alert)) {
      let value = this.list.get(alert);
      value[id] = handler;
    } else {
      const entry = {};
      entry[id] = handler;
      this.list.set(alert, entry);
    }
    this.#handlers[id] = { alert, handler };
    return id;
  }
  remove(id) {
    if (!(id in this.#handlers)) return false;
    const handler = this.#handlers[id];
    const alert = handler.alert;
    const value = this.#list.get(alert);
    value.delete(id);
    handler.delete(id);
    if (Object.keys(value).length == 0) this.#list.delete(alert);
    return true;
  }
  delete(price, condition) {
    if (this.list.has({ price, condition })) {
      const alert = this.list.get({ price, condition });
      for (let id in alert) {
        this.#handlers.delete(id);
        alert.delete(id);
      }
    }
    return this.list.delete({ price, condition });
  }
  pause(id) {
    if (!(id in this.#handlers)) return false;
    this.#handlers[id];
  }
  handlerByID(id) {
    if (!(id in this.#handlers)) return false;
    else return this.#handlers[id].handler;
  }
  check(prev, curr) {
    if (!isArray(prev) || !isArray(curr)) return;
    for (let [key, handlers] of this.list) {
      if (key.condition(key.price, prev, curr)) {
        for (let id in handlers) {
          try {
            handlers[id](key.price, prev, curr);
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }
}

const T = 0,
  O = 1,
  H = 2,
  L = 3,
  C = 4,
  V = 5;
const empty = [null, null, null, null, null];
const defaultStreamConfig = {
  tfCountDown: true,
  alerts: []
};
class Stream {
  #core;
  #config;
  #status;
  #time;
  #maxUpdate;
  #updateTimer = 0;
  #precision;
  #candle = empty;
  #countDownStart = 0;
  #countDownMS = 0;
  #countDown = '';
  #dataReceived = false;
  #lastPriceMax;
  #lastPriceMin;
  #lastTick = empty;
  #alerts;
  static validateConfig(c) {
    if (!isObject(c)) return defaultStreamConfig;
    else {
      let d = copyDeep(defaultStreamConfig);
      c = mergeDeep(d, c);
      c.tfCountDown = isBoolean(c.tfCountDown)
        ? c.tfCountDown
        : defaultStreamConfig.tfCountDown;
      c.alerts = isArray(c.alerts) ? c.alerts : defaultStreamConfig.alerts;
    }
    return c;
  }
  constructor(core) {
    this.#core = core;
    this.#time = core.time;
    this.status = { status: STREAM_NONE };
    this.#config = Stream.validateConfig(core.config?.stream);
    this.#maxUpdate = isNumber(core.config?.maxCandleUpdate)
      ? core.config.maxCandleUpdate
      : STREAM_MAXUPDATE;
    this.#precision = isNumber(core.config?.streamPrecision)
      ? core.config.streamPrecision
      : STREAM_PRECISION;
  }
  get config() {
    return this.#config;
  }
  get countDownMS() {
    return this.#countDownMS;
  }
  get countDown() {
    return this.#countDown;
  }
  get range() {
    return this.#core.range;
  }
  get status() {
    return this.#status;
  }
  set status({ status, data }) {
    this.#status = status;
    this.emit(status, data);
  }
  set dataReceived(data) {
    if (this.#dataReceived) return;
    this.#dataReceived = true;
    this.status = { status: STREAM_FIRSTVALUE, data };
  }
  get alerts() {
    return this.#alerts;
  }
  get lastPriceMin() {
    return this.#lastPriceMin;
  }
  set lastPriceMin(p) {
    if (isNumber(p)) this.#lastPriceMin = p;
  }
  get lastPriceMax() {
    return this.#lastPriceMax;
  }
  set lastPriceMax(p) {
    if (isNumber(p)) this.#lastPriceMax = p;
  }
  get lastTick() {
    return this.#lastTick;
  }
  set lastTick(t) {
    if (!isArray(t)) return;
    this.#lastTick;
    this.#lastTick = t;
    this.alerts.check(t, this.#candle);
  }
  set candle(data) {
    const now = Date.now();
    const lastTick = [...this.#candle];
    data.t = this.roundTime(new Date(data.t));
    data.o = data.o * 1;
    data.h = data.h * 1;
    data.l = data.l * 1;
    data.c = data.c * 1;
    data.v = data.v * 1;
    if (this.#candle[T] !== data.t) {
      this.newCandle(data);
    } else {
      this.updateCandle(data);
    }
    this.status = { status: STREAM_LISTENING, data: this.#candle };
    this.lastTick = lastTick;
    if (now - this.#updateTimer > this.#maxUpdate) this.onUpdate();
    this.#updateTimer = now;
  }
  get candle() {
    return this.#candle !== empty ? this.#candle : null;
  }
  start() {
    if (!(this.#alerts instanceof Alerts))
      this.#alerts = new Alerts(this.#config.alerts);
    this.status = { status: STREAM_STARTED };
  }
  stop() {
    if (this.#alerts instanceof Alerts) this.#alerts.destroy();
    this.status = { status: STREAM_STOPPED };
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  error() {
    this.status = { status: STREAM_ERROR };
  }
  onTick(tick) {
    if (
      (this.#status == STREAM_STARTED || this.#status == STREAM_LISTENING) &&
      isObject(tick)
    ) {
      if (!isInteger(tick.t)) tick.t = Date.now();
      let keys = Object.keys(tick);
      let v;
      for (let key of keys) {
        v = tick[key] * 1;
        if (!isNumber(v)) return;
        tick[key] = v;
      }
      this.candle = tick;
    }
  }
  onUpdate() {
    if (this.#candle !== empty) {
      this.status = { status: STREAM_UPDATE, data: this.candle };
      this.status = { status: STREAM_LISTENING, data: this.#candle };
    }
  }
  newCandle(data) {
    this.prevCandle();
    this.#candle = [data.t, data.o, data.h, data.l, data.c, data.v, null, true];
    this.#core.state.mergeData({ ohlcv: [this.#candle] }, true, false);
    this.status = {
      status: STREAM_NEWVALUE,
      data: { data: data, candle: this.#candle }
    };
    this.#countDownMS = this.#time.timeFrameMS;
    this.#countDownStart = this.roundTime(Date.now());
  }
  prevCandle() {
    const d = this.#core.allData.data;
    if (d.length > 0 && d[d.length - 1][7]) d[d.length - 1].length = 6;
  }
  updateCandle(data) {
    let candle = this.#candle;
    candle[O] = data.o;
    candle[H] = data.h;
    candle[L] = data.l;
    candle[C] = data.c;
    candle[V] = data.v;
    this.#candle = candle;
    const d = this.#core.allData.data;
    const l = d.length > 0 ? d.length - 1 : 0;
    d[l] = this.#candle;
    this.countDownUpdate();
  }
  countDownUpdate() {
    let y, M, w, d, h, m, s;
    this.#time.timeFrameMS;
    let cntDn = this.#time.timeFrameMS - (Date.now() - this.#countDownStart);
    if (cntDn < 0) {
      cntDn = 0;
    }
    this.#countDownMS = cntDn;
    if (cntDn > YEAR_MS) {
      y = String(Math.floor(cntDn / YEAR_MS));
      M = String(Math.floor((cntDn % YEAR_MS) / MONTHR_MS)).padStart(2, '0');
      this.#countDown = `${y}Y ${M}M`;
    } else if (cntDn > MONTHR_MS) {
      M = String(Math.floor(cntDn / MONTHR_MS)).padStart(2, '0');
      d = String(Math.floor((cntDn % MONTHR_MS) / DAY_MS)).padStart(2, '0');
      this.#countDown = `${M}M ${d}D`;
    } else if (cntDn > WEEK_MS) {
      w = String(Math.floor(cntDn / WEEK_MS)).padStart(2, '0');
      d = String(Math.floor((cntDn % MONTHR_MS) / DAY_MS)).padStart(2, '0');
      this.#countDown = `${w}W ${d}D`;
    } else if (cntDn > DAY_MS) {
      d = String(Math.floor(cntDn / DAY_MS)).padStart(2, '0');
      h = String(Math.floor((cntDn % DAY_MS) / HOUR_MS)).padStart(2, '0');
      m = String(Math.floor((cntDn % HOUR_MS) / MINUTE_MS)).padStart(2, '0');
      this.#countDown = `${d}D ${h}:${m}`;
    } else if (cntDn > HOUR_MS) {
      h = String(Math.floor(cntDn / HOUR_MS)).padStart(2, '0');
      m = String(Math.floor((cntDn % HOUR_MS) / MINUTE_MS)).padStart(2, '0');
      s = String(Math.floor((cntDn % MINUTE_MS) / SECOND_MS)).padStart(2, '0');
      this.#countDown = `${h}:${m}:${s}`;
    } else if (cntDn > MINUTE_MS) {
      m = String(Math.floor(cntDn / MINUTE_MS)).padStart(2, '0');
      s = String(Math.floor((cntDn % MINUTE_MS) / SECOND_MS)).padStart(2, '0');
      this.#countDown = `00:${m}:${s}`;
    } else {
      s = String(Math.floor(cntDn / SECOND_MS)).padStart(2, '0');
      String(cntDn % SECOND_MS).padStart(4, '0');
      this.#countDown = `00:00:${s}`;
    }
    return this.#countDown;
  }
  roundTime(ts) {
    return ts - (ts % this.#core.timeData.timeFrameMS);
  }
}

class Dataset {
  #state;
  #id;
  #type;
  #data = [];
  constructor(state, ds) {
    this.#state = state;
    this.#id = isString(ds.id) ? ds.id : uid;
    this.#type = isString(ds.type) ? ds.type : 'default';
    this.#data = isArray(ds.data) ? ds.data : [];
  }
}

class StateMachine {
  #id;
  #state;
  #statePrev;
  #context = {};
  #config;
  #core;
  #status = 'stopped';
  #events;
  #event;
  #eventData;
  #actions;
  #statuses = ['await', 'idle', 'running', 'stopped'];
  constructor(config, context) {
    if (!StateMachine.validateConfig(config)) return false;
    const cfg = { ...config };
    this.id = cfg.id;
    this.#config = cfg;
    this.#state = cfg.initial;
    this.#context.origin = context;
    this.#actions = cfg.actions;
    this.#core = context.core;
    this.#subscribe();
  }
  set id(id) {
    this.#id = idSanitize(id);
  }
  get id() {
    return this.#id;
  }
  get state() {
    return this.#state;
  }
  get previousSate() {
    return this.#statePrev;
  }
  get context() {
    return this.#context;
  }
  get core() {
    return this.#core;
  }
  get status() {
    return this.#status;
  }
  get event() {
    return this.#event;
  }
  get events() {
    return this.#events;
  }
  get eventData() {
    return this.#eventData;
  }
  get actions() {
    return this.#actions;
  }
  notify(event, data) {
    if (!isObject(this.#config)) return false;
    this.#event = event;
    this.#eventData = data;
    const currStateConfig = this.#config.states[this.#state];
    let destTransition = currStateConfig.on[event];
    if (
      !destTransition ||
      !isFunction(destTransition.action) ||
      (this.#status !== 'running' && this.#status !== 'await')
    ) {
      return false;
    }
    let cond =
      destTransition?.condition?.type || destTransition?.condition || false;
    if (cond && !this.condition.call(this, cond, destTransition.condition)) {
      return false;
    }
    const destState = destTransition.target;
    const destStateConfig = this.#config.states[destState];
    currStateConfig?.onExit.call(this, data);
    destTransition.action.call(this, data);
    this.#statePrev = this.#state;
    this.#state = destState;
    destStateConfig?.onEnter.call(this, data);
    if (
      this.#config.states[destState]?.on &&
      (this.#config.states[destState].on[''] ||
        this.#config.states[destState].on?.always)
    ) {
      const transient =
        this.#config.states[destState].on[''] ||
        this.#config.states[destState].on.always;
      if (isArray(transient)) {
        for (let transition of transient) {
          let cond =
            transition?.condition?.type || transition?.condition || false;
          if (
            this.condition.call(this, cond, transition.condition) &&
            isString(transition.target)
          ) {
            transition?.action.call(this, data);
            this.#statePrev = this.#state;
            this.#state = transition?.target;
            this.notify(null, null);
          }
        }
      } else if (isObject(transient) && isString(transient.target)) {
        let cond = transient?.condition?.type || transient?.condition || false;
        if (
          this.condition.call(this, cond, transient.condition) &&
          isString(transient.target)
        ) {
          transient?.action.call(this, data);
          this.#statePrev = this.#state;
          this.#state = transient.target;
          this.notify(null, null);
        }
      }
    }
    return this.#state;
  }
  condition(cond, event = null, params = {}) {
    return cond
      ? this.#config.guards[cond].call(this, this.#context, event, params)
      : false;
  }
  canTransition(event) {
    const currStateConfig = this.#config.states[this.#state];
    return event in currStateConfig.on;
  }
  start() {
    this.#status = 'running';
  }
  stop() {
    this.#status = 'stopped';
  }
  destroy() {
    this.stop();
    this.#unsubscribe();
    this.#config = null;
  }
  #subscribe() {
    this.#events = new Set();
    for (let state in this.#config.states) {
      for (let event in this.#config.states[state].on) {
        let cb = this.notify.bind(this, event);
        this.#events.add({ topic: event, cb });
        this.#core.on(event, cb, this.context);
      }
    }
  }
  #unsubscribe() {
    const events = this.#events?.values();
    if (!events) return;
    for (let e of events) {
      this.#core.off(e.topic, e.cb, this.context);
    }
    this.#events.clear();
  }
  static validateConfig(c) {
    if (!isObject(c)) return false;
    const required = ['id', 'initial', 'context', 'states'];
    let keys = Object.keys(c);
    if (!valuesInArray(required, keys)) return false;
    if (!(c.initial in c.states)) return false;
    for (let state in c.states) {
      if (!isObject(c.states[state])) return false;
      if ('onEnter' in c.states[state] && !isFunction(c.states[state].onEnter))
        return false;
      if ('onExit' in c.states[state] && !isFunction(c.states[state].onExit))
        return false;
      if ('on' in c.states[state]) {
        for (let e in c.states[state].on) {
          let event = c.states[state].on[e];
          if (!isString(event.target)) return false;
          if ('action' in event && !isFunction(event.action)) return false;
        }
      }
    }
    return true;
  }
}

class Overlays {
  #core;
  #config;
  #parent;
  #list;
  #elOverlays;
  constructor(parent, list = []) {
    this.#parent = parent;
    this.#core = parent.core;
    this.#list = new xMap([...list]);
    for (const [key, overlay] of this.#list) {
      this.addOverlay(key, overlay);
    }
  }
  log(l) {
    this.#core.log(l);
  }
  info(i) {
    this.#core.info(i);
  }
  warn(w) {
    this.#core.warn(w);
  }
  error(e) {
    this.#core.error(e);
  }
  get core() {
    return this.#core;
  }
  get parent() {
    return this.#parent;
  }
  get layerConfig() {
    return this.#parent.layerConfig().layerConfig;
  }
  get list() {
    return this.#list;
  }
  get scale() {
    return this.#parent.parent.scale;
  }
  get time() {
    return this.#parent.parent.time;
  }
  start() {
    this.eventsListen();
  }
  destroy() {
    if (this.#list.size == 0) return;
    for (let k of this.#list.keys()) {
      this.removeOverlay(k);
    }
  }
  eventsListen() {}
  on(topic, handler, context = this) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler, context = this) {
    this.#core.off(topic, handler, context);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  get(overlay) {
    return this.#list.get(overlay);
  }
  addOverlays(overlays) {
    let r = [];
    let k, s;
    for (let o of overlays) {
      s = this.addOverlay(o[0], o[1]);
      k = s.instance?.id || o[0];
      r.push([k, s]);
    }
    return r;
  }
  addOverlay(key, overlay) {
    const layer = new CEL.Layer(this.layerConfig);
    try {
      this.parent.viewport.addLayer(layer);
      overlay.layer = layer;
      overlay.instance = new overlay.class(
        layer,
        this.#parent.Timeline,
        this.#parent.Scale,
        this.#core.theme,
        this,
        overlay?.params
      );
      if (!isString(overlay.instance?.id)) overlay.instance.id = key;
      this.#list.set(overlay.instance.id, overlay);
      return overlay;
    } catch (e) {
      layer.remove();
      overlay.instance = undefined;
      this.#list.delete(key);
      this.#core.error(
        `ERROR: Cannot instantiate ${key} overlay / indicator : It will not be added to the chart.`
      );
      this.#core.error(e);
      return false;
    }
  }
  removeOverlay(key) {
    if (this.#list.has(key)) {
      const o = this.#list.get(key);
      if (!o.instance?.isIndicator) o.instance.destroy();
      o.layer.remove();
      this.#list.delete(key);
    }
  }
}

class chartGrid extends Overlay {
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    this.params.axes = params?.axes || 'both';
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  draw(axes) {
    if (!super.mustUpdate()) return;
    axes = axes || this.params.axes;
    this.scene.clear();
    if (axes == 'none') return;
    const ctx = this.scene.context;
    ctx.save();
    ctx.strokeStyle = this.core.theme.chart.GridColour || GridStyle.COLOUR_GRID;
    if (axes != 'y') {
      const offset = 0;
      const xGrads = this.xAxis.xAxisGrads.values;
      for (let tick of xGrads) {
        let x = bRound(tick[1]);
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, this.scene.height);
        ctx.stroke();
      }
    }
    if (axes != 'x') {
      const yGrads = this.yAxis.yAxisGrads;
      for (let tick of yGrads) {
        let y = this.yAxis.yPos(tick[0]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.scene.width, y);
        ctx.stroke();
      }
    }
    ctx.restore();
    super.updated();
  }
  drawX() {
    this.draw('x');
    return;
  }
}

class chartCursor extends Overlay {
  #cursorPos = [0, 0];
  #update = true;
  #input;
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    this.core.on('main_mouseMove', this.onMouseMoveX, this);
    this.#input = new Input(this.target.viewport.container, {
      disableContextMenu: false
    });
    this.#input.on('pointermove', this.onMouseMove.bind(this));
    this.#input.on('pointerenter', this.onMouseMove.bind(this));
  }
  set position(p) {
    return;
  }
  get update() {
    return this.#update;
  }
  get always() {
    return true;
  }
  onMouseMoveX(e) {
    this.onMouseMove(e, true);
  }
  onMouseMove(e, b = false) {
    let t,
      x,
      y,
      pos = this.#cursorPos;
    if (isObject(e)) {
      t = e.timeStamp;
      x = Math.round(e.position.x);
      y = Math.round(e.position.y);
    } else {
      t = e[6];
      x = Math.round(e[0]);
      y = Math.round(e[1]);
    }
    if (b && pos[1] == y) {
      return;
    }
    if (pos[0] == x && pos[1] == y) {
      return;
    }
    pos[0] = x;
    pos[1] = y;
    pos[6] = t;
    this.draw();
  }
  draw(drag = false) {
    const rect = this.target.viewport.container.getBoundingClientRect();
    let y = this.core.mousePos.y - rect.top;
    let x = this.core.mousePos.x - rect.left;
    if (!drag) x = this.xAxis.xPosSnap2CandlePos(x) + this.xAxis.scrollOffsetPx;
    this.scene.clear();
    const ctx = this.scene.context;
    ctx.save();
    ctx.setLineDash([5, 5]);
    const offset = this.xAxis.smoothScrollOffset || 0;
    ctx.strokeStyle = '#666';
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset, this.scene.height);
    ctx.stroke();
    if (this.chart.cursorActive) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.scene.width, y);
      ctx.stroke();
    }
    ctx.restore();
    this.chart.scale.overlays.cursor.instance.scaleDraw();
  }
}
class ScaleCursor extends Overlay {
  #cursorPos = [0, 0];
  constructor(target, xAxis, yAxis, theme, parent, params) {
    parent = yAxis;
    yAxis = yAxis.yAxis;
    super(target, xAxis, yAxis, theme, parent, params);
    this.viewport = target.viewport;
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  draw() {}
  scaleDraw() {
    if (!this.parent.parent.cursorActive) return;
    const rect = this.target.viewport.container.getBoundingClientRect();
    let y = this.core.mousePos.y - rect.top,
      price = this.parent.yPos2Price(y),
      nice = this.parent.nicePrice(price),
      options = {
        fontSize: this.theme.yAxis.fontSize * 1.05,
        fontWeight: this.theme.yAxis.fontWeight,
        fontFamily: this.theme.yAxis.fontFamily,
        txtCol: this.theme.yAxis.colourCursor,
        bakCol: this.theme.yAxis.colourCursorBG,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 3,
        paddingRight: 3,
        width: this.viewport.width
      },
      height = options.fontSize + options.paddingTop + options.paddingBottom,
      yPos = y - height * 0.5;
    const ctx = this.scene.context;
    this.scene.clear();
    ctx.save();
    ctx.fillStyle = options.bakCol;
    ctx.fillRect(1, yPos, this.width, height);
    renderTextBG(ctx, `${nice}`, 1, yPos, options);
    ctx.restore();
  }
  erase() {
    this.scene.clear();
    this.target.viewport.render();
    return;
  }
}

const defaultOverlays$4 = [
  ['grid', { class: chartGrid, fixed: true }],
  ['cursor', { class: chartCursor, fixed: true }]
];
class Graph {
  #core;
  #config;
  #theme;
  #parent;
  #viewport;
  #overlays;
  #elParent;
  #elCanvas;
  #elViewport;
  #layerWidth;
  constructor(parent, elViewport, overlays, node = false) {
    this.#parent = parent;
    this.#core = parent.core;
    this.#config = this.core.config;
    this.#theme = this.core.theme;
    this.#elParent = this.#parent.element;
    this.#elViewport = elViewport;
    this.createViewport(overlays, node);
  }
  get parent() {
    return this.#parent;
  }
  get core() {
    return this.#core;
  }
  get config() {
    return this.#config;
  }
  get width() {
    return this.#elParent.width;
  }
  get height() {
    return this.#elParent.height;
  }
  get dimensions() {
    return this.#elParent.dimensions;
  }
  set layerWidth(w) {
    this.#layerWidth = w || this.#elParent.width;
  }
  get layerWidth() {
    return this.#layerWidth;
  }
  get stateMachine() {
    return this.#parent.stateMachine;
  }
  get state() {
    return this.#core.getState();
  }
  get data() {
    return this.#core.chartData;
  }
  get range() {
    return this.#core.range;
  }
  get stream() {
    return this.#core.stream;
  }
  get Timeline() {
    return this.#core.Timeline;
  }
  get xAxis() {
    return this.#core.Timeline.xAxis;
  }
  get Scale() {
    return this.#parent.scale;
  }
  get yAxis() {
    return this.#parent.scale.yAxis;
  }
  get viewport() {
    return this.#viewport;
  }
  get overlays() {
    return this.#overlays;
  }
  destroy() {
    this.#overlays.destroy();
    this.#viewport.destroy();
  }
  setSize(w, h, lw) {
    const oList = this.#overlays.list;
    this.#viewport.setSize(w, h);
    for (let [key, overlay] of oList) {
      overlay.instance.setSize(lw, h);
    }
    this.draw();
    this.render();
  }
  createViewport(overlays = [], node = false) {
    overlays = overlays.length == 0 ? copyDeep(defaultOverlays$4) : overlays;
    const { width, height } = this.layerConfig();
    let viewport = node ? CEL.Node : CEL.Viewport;
    this.#viewport = new viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });
    this.#elCanvas = this.#viewport.scene.canvas;
    this.#overlays = new Overlays(this, overlays);
  }
  layerConfig() {
    const buffer = this.config?.buffer || BUFFERSIZE;
    const width = this.#elViewport.getBoundingClientRect().width;
    const height = this.#elViewport.getBoundingClientRect().height;
    this.layerWidth = Math.round(width * ((100 + buffer) * 0.01));
    const layerConfig = {
      width: this.layerWidth,
      height: height
    };
    return { width, height, layerConfig };
  }
  addOverlays(o) {
    return this.#overlays.addOverlays(o);
  }
  addOverlay(key, overlay) {
    return this.#overlays.addOverlay(key, overlay);
  }
  removeOverlay(key) {
    return this.#overlays.removeOverlay(key);
  }
  draw(range = this.range, update = false) {
    const fn = (k, overlay) => {
      if (!(overlay.instance instanceof Overlay)) return;
      if (update) overlay.instance.setRefresh();
      overlay.instance.draw();
      if (!overlay.fixed) overlay.instance.position = [this.#core.scrollPos, 0];
    };
    this.executeOverlayList(fn);
  }
  drawAll() {
    const fn = (k, o) => {
      if (!(o.instance instanceof Overlay)) return;
      o.instance.setRefresh();
    };
    this.executeOverlayList(fn);
  }
  executeOverlayList(fn) {
    const oList = this.#overlays.list;
    if (!(oList instanceof xMap)) return false;
    let result = [];
    for (let [key, overlay] of oList) {
      try {
        fn(key, overlay);
      } catch (e) {
        result.push({ overlay: key, error: e });
      }
    }
    if (result.length > 0) {
      for (let err of result) {
        this.#core.error(`ERROR: executeOverlayList() ${err.overlay}`);
        this.#core.error(err.error);
      }
    } else result = true;
    return result;
  }
  render() {
    this.#viewport.render();
  }
  refresh() {
    this.draw(this.range, true);
    this.render();
  }
}

class Component {
  #id;
  #core;
  #options;
  #parent;
  #stateMachine;
  #Graph;
  constructor(core, options = {}) {
    this.#core = core;
    this.#options = { ...options };
    this.#parent = this.#options.parent;
  }
  log(l) {
    this.#core.log(l);
  }
  info(i) {
    this.#core.info(i);
  }
  warn(w) {
    this.#core.warn(w);
  }
  error(e) {
    this.#core.error(e);
  }
  set id(id) {
    this.#id = idSanitize(id);
  }
  get id() {
    return this.#id || `${this.#core.id}-${this.name}`;
  }
  get core() {
    return this.#core;
  }
  get options() {
    return this.#options;
  }
  get config() {
    return this.#core.config;
  }
  get theme() {
    return this.core.theme;
  }
  get range() {
    return this.core.range;
  }
  get parent() {
    return this.#parent;
  }
  set stateMachine(config) {
    this.#stateMachine = new StateMachine(config, this);
  }
  get stateMachine() {
    return this.#stateMachine;
  }
  set graph(g) {
    if (g instanceof Graph) this.#Graph = g;
  }
  get graph() {
    return this.#Graph;
  }
  on(topic, handler, context = this) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler, context = this) {
    this.#core.off(topic, handler, context);
  }
  expunge(context = this) {
    this.#core.expunge(context);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
}

var stateMachineConfig$5 = {
  id: 'time',
  initial: 'idle',
  context: {},
  states: {
    idle: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        resize: {
          target: 'resize',
          action(data) {}
        },
        xAxis_scale: {
          target: 'scale',
          action(data) {}
        },
        xAxis_inc: {
          target: 'incremental',
          action(data) {}
        },
        xAxis_log: {
          target: 'logarithmic',
          action(data) {}
        },
        xAxis_100: {
          target: 'percentual',
          action(data) {}
        },
        chart_pan: {
          target: 'chart_pan',
          action(data) {}
        }
      }
    },
    resize: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        someEvent: {
          target: '',
          action(data) {}
        }
      }
    },
    chart_pan: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        chart_pan: {
          target: 'chart_pan',
          action(data) {}
        },
        chart_panDone: {
          target: 'idle',
          action(data) {}
        }
      }
    }
  },
  guards: {}
};

class Slider {
  static #cnt;
  #id;
  #core;
  #elContainer;
  #elHandle;
  #containerDims = { w: 0, h: 0 };
  #handleDims = { w: 0, h: 0, x: 0, y: 0 };
  #constraint = { x: false, y: true };
  #cursorPos;
  #sliderPos = { x: 0, drag: false };
  #input;
  #callback;
  constructor(config) {
    this.#id = Slider.#cnt++;
    this.#core = config.core;
    this.#elContainer = isHTMLElement(config.elContainer)
      ? config.elContainer
      : false;
    this.#elHandle = isHTMLElement(config.elHandle) ? config.elHandle : false;
    this.#callback = isFunction(config.callback) ? config.callback : false;
    if (isHTMLElement(this.#elContainer) && isHTMLElement(this.#elHandle)) {
      this.mount();
      this.eventsListen();
    }
  }
  set cursor(c) {
    this.#elHandle.style.cursor = c;
  }
  get cursor() {
    return this.#elHandle.style.cursor;
  }
  eventsListen() {
    this.#input = new Input(this.#elHandle, { disableContextMenu: false });
    this.#input.on('mouseenter', debounce(this.onMouseEnter, 1, this, true));
    this.#input.on('mouseout', debounce(this.onMouseOut, 1, this, true));
    this.#input.on('drag', throttle(this.onHandleDrag, 100, this));
    this.#input.on('enddrag', this.onHandleDragDone.bind(this));
    this.#input.on('mousedown', debounce(this.onMouseDown, 100, this, true));
    this.#input.on('mouseup', this.onMouseUp.bind(this));
  }
  on(topic, handler, context = this) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler, context = this) {
    this.#core.off(topic, handler, context);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMouseEnter() {
    const backgroundColor = getComputedStyle(this.#elHandle).backgroundColor;
    if (backgroundColor) {
      this.colour = new Colour(backgroundColor);
      this.#elHandle.style.backgroundColor = this.colour.hex;
    }
  }
  onMouseOut() {
    this.#elHandle.style.backgroundColor = this.colour.hexa;
  }
  onMouseDown() {}
  onMouseUp(e) {
    this.onHandleDragDone(e);
  }
  onHandleDrag(e) {
    if (!this.#sliderPos.drag) {
      this.#sliderPos.drag = true;
      this.#sliderPos.x = e.position.x;
    }
    this.handlePos(e);
  }
  onHandleDragDone(e) {
    this.handlePos(e);
    this.#sliderPos.drag = false;
  }
  mount() {
    this.#containerDims.w = this.#elContainer.getBoundingClientRect().width;
    this.#containerDims.h = this.#elContainer.getBoundingClientRect().height;
    this.#elContainer.style.overflow = 'hidden';
    this.#handleDims.w = this.#elHandle.getBoundingClientRect().width;
    this.#handleDims.h = this.#elHandle.getBoundingClientRect().height;
    this.#elHandle.style.marginRight = 0;
    this.#elHandle.style.position = 'absolute';
  }
  handlePos(e) {
    let R = this.#core.range;
    let x = parseInt(this.#elHandle.style.marginLeft);
    let w = this.#elContainer.getBoundingClientRect().width;
    let h = this.#elHandle.getBoundingClientRect().width;
    let m = w - h;
    let d = e.position.x - this.#sliderPos.x;
    let p = limit(x + d, 0, m);
    let r = (R.dataLength + R.limitFuture + R.limitPast) / w;
    let s = Math.floor(p * r);
    this.setHandleDims(p, h);
    this.#core.jumpToIndex(s);
  }
  setHandleDims(p, w) {
    let c = this.#elContainer.getBoundingClientRect().width;
    w = w || this.#elHandle.getBoundingClientRect().width;
    p = (p / c) * 100;
    this.#elHandle.style.marginLeft = `${p}%`;
    w = (w / c) * 100;
    this.#elHandle.style.width = `${w}%`;
  }
}

class TimeLabels extends Overlay {
  #cursorPos = [0, 0];
  #xAxisGrads;
  #charW;
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    xAxis = parent.time.xAxis;
    super(target, xAxis, yAxis, theme, parent);
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  draw(range) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    const ctx = this.scene.context;
    const grads = this.xAxis.xAxisGrads.values;
    const offset = 0;
    const theme = this.theme.xAxis;
    const tickMarker = isBoolean(theme.tickMarker) ? theme.tickMarker : true;
    this.#charW = this.#charW || ctx.measureText(`M`).width;
    ctx.save();
    ctx.strokeStyle = theme.colourTick;
    ctx.fillStyle = theme.colourTick;
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`;
    for (let tick of grads) {
      let x = tick[1];
      let w = Math.floor(tick[0].length * this.#charW * 0.5);
      ctx.fillText(tick[0], x - w + offset, this.xAxis.xAxisTicks + 12);
      if (tickMarker) {
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, this.xAxis.xAxisTicks);
        ctx.stroke();
      }
    }
    ctx.restore();
    super.updated();
  }
}

class TimeOverlays extends Overlay {
  #cursorPos = [0, 0];
  #xAxisGrads;
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    xAxis = parent.time.xAxis;
    super(target, xAxis, yAxis, theme, parent);
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  draw() {
    this.scene.clear();
    const ctx = this.scene.context;
    this.xAxis.xAxisGrads.values;
    this.theme.xAxis;
    ctx.save();
    ctx.restore();
  }
}

class TimeCursor extends Overlay {
  #cursorPos = [0, 0];
  #dateStrW;
  #opts;
  constructor(target, xAxis = false, yAxis = false, theme, parent) {
    xAxis = parent.time.xAxis;
    super(target, xAxis, yAxis, theme, parent);
    this.viewport = target.viewport;
    this.#opts = {
      fontSize: this.theme.xAxis.fontSize * 1.05,
      fontWeight: this.theme.xAxis.fontWeight,
      fontFamily: this.theme.xAxis.fontFamily,
      txtCol: this.theme.xAxis.colourCursor,
      bakCol: this.theme.xAxis.colourCursorBG,
      paddingTop: 5,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4
    };
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  dateUTCStringW() {
    if (!this.#dateStrW) {
      let ctx = this.scene.context,
        dateTimeStr = `Wed, 28 Aug 2024 20:00:00 GMT`;
      this.#dateStrW = getTextRectWidth(ctx, dateTimeStr, this.#opts);
    }
    return this.#dateStrW;
  }
  draw() {
    const ctx = this.scene.context;
    const rect = this.target.viewport.container.getBoundingClientRect();
    const x = this.core.mousePos.x - rect.left;
    let timestamp = this.xAxis.xPos2Time(x),
      date = new Date(timestamp),
      dateTimeStr = date.toUTCString(),
      txtW = this.dateUTCStringW(),
      xPos = x + this.core.bufferPx;
    xPos = this.xAxis.xPosSnap2CandlePos(xPos);
    xPos =
      xPos - Math.round(txtW * 0.5) - this.core.scrollPos - this.core.bufferPx;
    this.scene.clear();
    ctx.save();
    renderTextBG(ctx, dateTimeStr, xPos, 1, this.#opts);
    ctx.restore();
  }
}

const defaultOverlays$3 = [
  ['labels', { class: TimeLabels, fixed: false, required: true }],
  ['overlay', { class: TimeOverlays, fixed: false, required: true }],
  ['cursor', { class: TimeCursor, fixed: false, required: true }]
];
class Timeline extends Component {
  #name = 'Timeline';
  #shortName = 'time';
  #chart;
  #xAxis;
  #stateMachine;
  #element;
  #elViewport;
  #elNavigation;
  #elNavList;
  #elNavScrollBar;
  #elNavScrollHandle;
  #elRwdStart;
  #elFwdEnd;
  #Graph;
  #timeOverlays = new xMap();
  #additionalOverlays = [];
  #navigation;
  #layerLabels;
  #layerOverlays;
  #layerCursor;
  #input;
  #input2;
  #input3;
  #input4;
  #slider;
  #icons = {
    width: 20,
    height: 20,
    fill: '#aaa'
  };
  #jump = { end: false, start: false };
  constructor(core, options) {
    super(core, options);
    this.#element = options.elements.elTime;
    this.#chart = core.Chart;
    this.#xAxis = new xAxis(this);
    this.init();
  }
  get name() {
    return this.#name;
  }
  get shortName() {
    return this.#shortName;
  }
  get element() {
    return this.#element;
  }
  get elViewport() {
    return this.#elViewport;
  }
  get height() {
    return this.#element.height;
  }
  set width(w) {
    this.setWidth(w);
  }
  get width() {
    return this.#element.width;
  }
  get xAxis() {
    return this.#xAxis;
  }
  get xAxisWidth() {
    return this.#xAxis.width;
  }
  get xAxisRatio() {
    return this.#xAxis.xAxisRatio;
  }
  get layerCursor() {
    return this.#layerCursor;
  }
  get layerLabels() {
    return this.#layerLabels;
  }
  get layerOverlays() {
    return this.#layerOverlays;
  }
  get overlays() {
    return Object.fromEntries([...this.graph.overlays.list]);
  }
  get xAxisGrads() {
    return this.#xAxis.xAxisGrads;
  }
  get candleW() {
    return this.#xAxis.candleW;
  }
  get candlesOnLayer() {
    return this.#xAxis.candlesOnLayer;
  }
  get navigation() {
    return this.#navigation;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return elementDimPos(this.#element);
  }
  get bufferPx() {
    return this.core.bufferPx;
  }
  get scrollPos() {
    return this.core.scrollPos;
  }
  get scrollOffsetPx() {
    return this.core.scrollPos % this.candleW;
  }
  get smoothScrollOffset() {
    return this.core.smoothScrollOffset;
  }
  get rangeScrollOffset() {
    return this.core.rangeScrollOffset;
  }
  get time() {
    return this;
  }
  init() {
    const el = this.#element;
    this.#elViewport = el.viewport;
    this.#elNavigation = el.overview;
    this.#elNavList = el.overview.icons;
    this.#elNavScrollBar = el.overview.scrollBar;
    this.#elNavScrollHandle = el.overview.handle;
    this.#elRwdStart = el.overview.rwdStart;
    this.#elFwdEnd = el.overview.fwdEnd;
    const sliderCfg = {
      core: this.core,
      elContainer: this.#elNavScrollBar,
      elHandle: this.#elNavScrollHandle,
      callback: null
    };
    this.#slider = new Slider(sliderCfg);
    if (this.core.theme?.time?.navigation === false)
      this.navigationDisplay(false);
  }
  setWidth(w) {
    this.#element.style.width = `${w}px`;
    this.#elViewport.style.width = `${w}px`;
  }
  setDimensions(dim) {
    const buffer = this.config.buffer || BUFFERSIZE;
    const width = dim.w;
    const height = this.height;
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01));
    this.graph.setSize(width, height, layerWidth);
    this.draw();
  }
  navigationDisplay(visible) {
    if (visible) {
      this.#elFwdEnd.style['margin-top'] = 0;
      this.#elRwdStart.style['margin-top'] = 0;
    } else {
      const background = this.core.theme.xAxis?.background
        ? this.core.theme.xAxis.Background
        : this.core.theme.chart.Background;
      this.#elNavigation.style.visibility = 'hidden';
      this.#elFwdEnd.style['margin-top'] =
        `${this.#elViewport.clientHeight * -1}px`;
      this.#elRwdStart.style['margin-top'] =
        `${this.#elViewport.clientHeight * -1}px`;
      this.#elFwdEnd.style.background = this.core.theme.chart.Background;
      this.#elRwdStart.style.background = background;
    }
  }
  start() {
    this.createGraph();
    this.onSetRange();
    this.#xAxis.initXAxisGrads();
    this.draw();
    this.eventsListen();
    stateMachineConfig$5.id = this.id;
    stateMachineConfig$5.context = this;
    this.stateMachine = stateMachineConfig$5;
    this.stateMachine.start();
    this.log(`Timeline ${this.#name} instantiated and running`);
  }
  destroy() {
    this.stateMachine.destroy();
    this.#input.destroy();
    this.#input2.destroy();
    this.#input3.destroy();
    this.core.hub.expunge(this);
    this.off('main_mouseMove', this.#layerCursor.draw, this.#layerCursor);
    this.#elFwdEnd.removeEventListener('click', debounce);
    this.#elRwdStart.removeEventListener('click', debounce);
    this.graph.destroy();
  }
  eventsListen() {
    this.#input = new Input(this.#elViewport, { disableContextMenu: false });
    this.#input.on('dblclick', this.onDoubleClick.bind(this));
    this.#input.on('pointerover', this.onPointerEnter.bind(this));
    this.#input.on('pointerout', this.onPointerLeave.bind(this));
    this.#input.on('pointerdrag', this.onPointerDrag.bind(this));
    this.#input2 = new Input(this.#elFwdEnd, { disableContextMenu: false });
    this.#input2.on('pointerover', () => this.showJump(this.#jump.end));
    this.#input2.on('pointerleave', () => this.hideJump(this.#jump.end));
    this.#input3 = new Input(this.#elRwdStart, { disableContextMenu: false });
    this.#input3.on('pointerover', () => this.showJump(this.#jump.start));
    this.#input3.on('pointerleave', () => this.hideJump(this.#jump.start));
    this.on('main_mouseMove', this.#layerCursor.draw, this.#layerCursor);
    this.on('range_set', this.onSetRange, this);
    this.#elFwdEnd.addEventListener(
      'click',
      debounce(this.onPointerClick, 1000, this, true)
    );
    this.#elRwdStart.addEventListener(
      'click',
      debounce(this.onPointerClick, 1000, this, true)
    );
  }
  onPointerClick(e) {
    const id = e?.currentTarget?.id || e.target.parentElement.id;
    switch (id) {
      case 'fwdEnd':
        this.onFwdEnd();
        break;
      case 'rwdStart':
        this.onRwdStart();
        break;
    }
  }
  onPointerEnter(e) {
    e.domEvent.target.style.cursor = 'ew-resize';
    this.#elNavigation.style.visibility = 'visible';
    this.hideCursorTime();
  }
  onPointerLeave(e) {
    if (
      this.core.theme?.time?.navigation === false &&
      !(this.#jump.end && this.#jump.start)
    ) {
      this.#elNavigation.style.visibility = 'hidden';
    }
  }
  onPointerDrag(e) {
    let r = this.range;
    let start = r.indexStart - e.movement.x;
    let end = r.indexEnd;
    r.set(start, end);
  }
  onDoubleClick(e) {
    this.core.jumpToEnd();
    this.core.MainPane.draw(undefined, true);
  }
  onFwdEnd() {
    this.core.jumpToEnd();
    this.core.MainPane.draw(undefined, true);
  }
  onRwdStart() {
    this.core.jumpToStart();
    this.core.MainPane.draw(undefined, true);
  }
  onSetRange() {
    let r = this.range;
    let start = r.indexStart;
    r.indexEnd;
    let scrollBarW = this.#elNavScrollBar.getBoundingClientRect().width;
    let rangeW = r.dataLength + r.limitFuture + r.limitPast;
    let ratio = scrollBarW / rangeW;
    let handleW = r.Length * ratio;
    let pos = (start + r.limitPast) * ratio;
    this.#slider.setHandleDims(pos, handleW);
  }
  t2Index(ts) {
    return this.#xAxis.t2Index(ts);
  }
  xPos(time) {
    return this.#xAxis.xPos(time);
  }
  xPosSnap2CandlePos(x) {
    return this.#xAxis.xPosSnap2CandlePos(x);
  }
  xPos2Time(x) {
    return this.#xAxis.xPos2Time(x);
  }
  xPos2Index(x) {
    return this.#xAxis.xPos2Index(x);
  }
  xPosOHLCV(x) {
    return this.#xAxis.xPosOHLCV(x);
  }
  createGraph() {
    let overlays = copyDeep(defaultOverlays$3);
    this.graph = new Graph(this, this.#elViewport, overlays, false);
    this.#layerCursor = this.graph.overlays.get('cursor').instance;
    this.#layerLabels = this.graph.overlays.get('labels').instance;
    this.#layerOverlays = this.graph.overlays.get('overlay').instance;
    this.graph.addOverlays(this.#additionalOverlays);
  }
  addOverlays(overlays) {
    if (!isArray(overlays)) return false;
    if (this.graph === undefined) this.#additionalOverlays.push(...overlays);
    else this.graph.addOverlays(overlays);
  }
  addOverlay(key, overlay) {
    if (!isObject(overlay)) return false;
    if (this.graph === undefined) this.#additionalOverlays.push([key, overlay]);
    else return this.graph.addOverlay(key, overlay);
  }
  render() {
    this.graph.render();
  }
  draw(range = this.range, update = true) {
    this.graph.draw(range, update);
  }
  hideCursorTime() {
    this.graph.overlays.list.get('cursor').layer.visible = false;
    this.core.MainPane.draw();
  }
  showCursorTime() {
    this.graph.overlays.list.get('cursor').layer.visible = true;
    this.core.MainPane.draw();
  }
  hideJump(j) {
    if (this.core.theme?.time?.navigation === false)
      this.#elNavigation.style.visibility = 'hidden';
  }
  showJump(j) {
    this.#elNavigation.style.visibility = 'visible';
    this.hideCursorTime();
  }
}

const renderLoop = {
  renderQ: new xMap(),
  rendered: [],
  renderLog: false,
  dropFrames: true,
  graphs: [],
  range: {},
  status: false,
  init: function (config) {
    if (!isObject(config)) return;
    this.renderLog = config?.renderLog || false;
    this.dropFrames = config?.dropFrames || true;
    this.graphs = isArray(config?.graphs) ? [...config.graphs] : [];
    this.range = isObject(config?.range) ? config.range : {};
  },
  queueFrame: function (
    range = this.range,
    graphs = this.graphs,
    update = false
  ) {
    if (this.renderQ.size > 1 && this.dropFrames)
      update = this.dropFrame() || update;
    const frameID = Date.now();
    range = range.snapshot();
    this.renderQ.set(frameID, { graphs, range, update });
    return frameID;
  },
  dropFrame: function (frame = -1) {
    let update = false;
    if (frame === -1) frame = this.renderQ.lastKey();
    if (this.renderQ.size > 1 && this.renderQ.has(frame)) {
      update = frame.update;
      this.renderQ.delete(frame);
    }
    return update;
  },
  expungeFrames() {
    this.renderQ.clear();
  },
  getFrame: function (frame = 0) {
    if (this.renderQ.has(frame)) return this.renderQ.get(frame);
    else return this.renderQ.firstValue();
  },
  frameDone: function () {
    if (this.renderQ.size === 0) return;
    const key = this.renderQ.firstKey();
    if (this.renderLog) this.rendered.push([key, Date.now()]);
    this.renderQ.delete(key);
  },
  start: function () {
    this.status = true;
    requestAnimationFrame(this.execute.bind(this));
  },
  stop: function () {
    this.status = false;
    this.renderQ.clear();
  },
  execute: function () {
    if (!this.status) return;
    requestAnimationFrame(this.execute.bind(this));
    if (this.renderQ.size === 0) return;
    const [ID, frame] = this.renderQ.firstEntry();
    if (!frame.range?.snapshot) return;
    for (let graph of frame.graphs) {
      if (isFunction(graph.draw) && graph?.status !== 'destroyed')
        graph.draw(frame.range, frame.update);
    }
    for (let graph of frame.graphs) {
      if (isFunction(graph.render) && graph?.status !== 'destroyed')
        graph.render();
    }
    this.frameDone();
  }
};

const userSelect = [
  '-webkit-touch-callout',
  '-webkit-user-select',
  '-khtml-user-select',
  '-moz-user-select',
  '-ms-user-select',
  'user-select'
];
class Legends {
  #elTarget;
  #parent;
  #core;
  #theme;
  #input;
  #controls;
  #collapse;
  #collapseList = [];
  #controlsList;
  #list = {};
  #show;
  #hide;
  #toggle = null;
  constructor(target, parent) {
    this.#elTarget = target;
    this.#parent = parent;
    this.#core = parent.core;
    this.#theme = parent.core.theme.legend;
    this.init();
    this.eventsListen();
  }
  get elTarget() {
    return this.#elTarget;
  }
  get list() {
    return this.#list;
  }
  set collapse(c) {
    this.setCollapse(c);
  }
  get collapse() {
    return this.#collapse;
  }
  get visible() {
    return this.getVisible();
  }
  getVisible() {
    const style = getComputedStyle(this.#elTarget);
    return style.display && style.visibility;
  }
  destroy() {
    this.#core.hub.expunge(this);
    for (let l in this.#list) {
      if (l === 'collapse') continue;
      this.remove(l);
    }
    this.#elTarget.remove();
  }
  eventsListen() {
    this.#core.on('chart_pan', this.primaryPanePan, this);
    this.#core.on('chart_panDone', this.primaryPanePanDone, this);
  }
  init() {
    const legends = this.#elTarget.legends;
    this.#controls = legends.querySelector(`.controls`);
    this.#collapse = legends.querySelectorAll(`.control`);
    this.#show = legends.querySelector('#showLegends');
    this.#hide = legends.querySelector('#hideLegends');
    this.#controls.style.display = 'none';
    this.icons(this.#collapse, { id: 'collapse', parent: this });
    this.#elTarget.legends.classList.add('hide');
    this.#toggle = 'hide';
    this.collapse = 'show';
  }
  onPointerClick(e) {
    const which = (s) => {
      if (isString(s.dataset.icon))
        return { id: s.id, icon: s.dataset.icon, parent: s.parentElement };
      else if (s.parentElement.className !== 'controls')
        return which(s.parentElement);
      else return false;
    };
    return which(e);
  }
  onMouseOver(e) {}
  onLegendAction(e) {
    const which = this.onPointerClick(e.currentTarget);
    this.setCollapse(which.icon);
  }
  setCollapse(c) {
    if (c === 'show' && this.#toggle !== 'show') {
      this.#toggle = c;
      this.#show.style.display = 'none';
      this.#hide.style.display = 'inline-block';
      this.#elTarget.legends.classList.toggle('hide');
    } else if (c === 'hide' && this.#toggle !== 'hide') {
      this.#toggle = c;
      this.#show.style.display = 'inline-block';
      this.#hide.style.display = 'none';
      this.#elTarget.legends.classList.toggle('hide');
    }
  }
  primaryPanePan() {
    for (let property of userSelect) {
      this.#elTarget.style.setProperty(property, 'none');
    }
  }
  primaryPanePanDone() {
    for (let property of userSelect) {
      this.#elTarget.style.removeProperty(property);
    }
  }
  add(options) {
    if (!isObject(options)) return false;
    const parentError = () => {
      this.#core.error('ERROR: Legend parent missing!');
    };
    options.id = options?.id || uid('legend');
    options.type = options?.type || 'overlay';
    options.title = options?.title || options?.parent.legendName;
    options.parent = options?.parent || parentError;
    options.visible = isBoolean(options?.visible) ? options.visible : true;
    const html = this.elTarget.buildLegend(options, this.#core.theme);
    this.#elTarget.legends.insertAdjacentHTML('beforeend', html);
    const legendEl = this.#elTarget.legends.querySelector(
      `#legend_${options.id}`
    );
    this.#controlsList = legendEl.querySelectorAll(`.control`);
    this.#list[options.id] = {
      el: legendEl,
      type: options.type,
      source: options?.source,
      click: []
    };
    this.icons(this.#controlsList, options);
    if (options.type == 'indicator') {
      this.#controls.style.display = 'block';
      if (!options.parent.primaryPane && Object.keys(this.#list).length < 3)
        this.#controls.style.display = 'none';
    }
    legendEl.style.display = options.visible ? 'block' : 'none';
    return options.id;
  }
  remove(id) {
    if (!(id in this.#list) || this.#list[id].type === 'chart') return false;
    this.#list[id].el.remove();
    for (let c of this.#list[id].click) {
      c.el.removeEventListener('click', c.click);
    }
    delete this.#list[id];
    if (Object.keys(this.#list).length < 2)
      this.#controls.style.display = 'none';
    return true;
  }
  update(id, data) {
    if (
      !isObject(data) ||
      !(id in this.#list) ||
      this.#core.range.data.length == 0
    )
      return false;
    let source = this.#list[id].source(data.pos);
    const html = this.#elTarget.buildInputs(source);
    this.#elTarget.legends.querySelector(`#legend_${id} dl`).innerHTML = html;
  }
  modify(id, properties) {
    if (!(id in this.#list) || !isObject(properties)) return false;
    const el = this.#list[id].el;
    for (let p in properties) {
      switch (p) {
        case 'legendName':
          const title = el.querySelectorAll('.title');
          title[0].innerHTML = properties[p];
          title[1].innerHTML = properties[p];
          return true;
        case 'legendVisibility':
          const display = !!properties[p] ? 'block' : 'none';
          const visible = !!properties[p] ? 'visible' : 'hidden';
          el.style.display = display;
          el.style.visibility = visible;
          return true;
      }
    }
  }
  icons(icons, options) {
    let click;
    for (let el of icons) {
      let svg = el.querySelector('svg');
      svg.style.width = `${this.#theme.controlsW}px`;
      svg.style.height = `${this.#theme.controlsH}px`;
      svg.style.fill = `${this.#theme.controlsColour}`;
      svg.onpointerover = (e) =>
        (e.currentTarget.style.fill = this.#theme.controlsOver);
      svg.onpointerout = (e) =>
        (e.currentTarget.style.fill = this.#theme.controlsColour);
      click = options.parent.onLegendAction.bind(options.parent);
      if (options.id === 'collapse') this.#collapseList.push({ el, click });
      else this.#list[options.id].click.push({ el, click });
      el.addEventListener('click', debounce(click, 1000, this, true));
    }
  }
}

var stateMachineConfig$4 = {
  id: 'chart',
  initial: 'idle',
  context: {},
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.cursor = 'crosshair';
      },
      onExit(data) {},
      on: {
        xAxis_scale: {
          target: 'xAxis_scale',
          action(data) {}
        },
        chart_yAxisRedraw: {
          target: 'chart_yAxisRedraw',
          action(data) {}
        },
        chart_tool: {
          target: 'chart_tool',
          action(data) {}
        },
        tool_activated: {
          target: 'tool_activated',
          action(data) {
            this.context.origin.cursor = 'default';
          }
        }
      }
    },
    xAxis_scale: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        Idle: {
          target: 'idle',
          action(data) {}
        }
      }
    },
    chart_yAxisRedraw: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        always: {
          target: 'idle',
          condition: 'yAxisRedraw',
          action(data) {
            this.context.origin.drawGrid();
          }
        }
      }
    },
    tool_activated: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        tool_targetSelected: {
          target: 'idle',
          condition: 'toolSelectedThis',
          action(data) {
            console.log('tool_targetSelected:', data);
          }
        }
      }
    }
  },
  guards: {
    priceMaxMin() {
      return true;
    },
    toolSelectedThis(conditionType, condition) {
      if (this.eventData === this.context) return true;
      else return false;
    },
    yAxisRedraw() {
      return true;
    },
    zoomDone() {
      return true;
    }
  }
};

var stateMachineConfig$3 = {
  id: 'scale',
  initial: 'idle',
  context: {},
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.cursor = 'ns-resize';
      },
      onExit(data) {},
      on: {
        resize: {
          target: 'resize',
          action(data) {}
        },
        yAxis_scale: {
          target: 'scale',
          action(data) {}
        },
        yAxis_inc: {
          target: 'incremental',
          action(data) {}
        },
        yAxis_log: {
          target: 'logarithmic',
          action(data) {}
        },
        yAxis_100: {
          target: 'percentual',
          action(data) {}
        },
        setRange: {
          target: 'setRange',
          action(data) {}
        }
      }
    },
    resize: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        someEvent: {
          target: '',
          action(data) {}
        }
      }
    },
    setRange: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action(data) {
            this.context.origin.draw();
          }
        }
      }
    }
  },
  guards: {
    receiver() {
      return this.eventData.scale.id == this.context.origin.id;
    },
    zoomDone() {
      return true;
    }
  }
};

class ScaleLabels extends Overlay {
  constructor(target, xAxis, yAxis, theme, parent, params) {
    parent = yAxis;
    yAxis = yAxis.yAxis;
    super(target, xAxis, yAxis, theme, parent, params);
    this.viewport = target.viewport;
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  get always() {
    return true;
  }
  draw() {
    if (!super.mustUpdate()) return;
    const ctx = this.scene.context;
    const yAxis = this.yAxis;
    const grads = yAxis.yAxisGrads || [];
    const theme = this.theme.yAxis;
    const tickMarker = isBoolean(theme.tickMarker) ? theme.tickMarker : true;
    let tickPos = [];
    let y;
    switch (theme?.location) {
      case 'left':
        tickPos = [this.width, this.width - yAxis.yAxisTicks];
        break;
      case 'right':
      default:
        tickPos = [1, yAxis.yAxisTicks];
        break;
    }
    this.scene.clear();
    ctx.save();
    ctx.strokeStyle = theme.colourTick;
    ctx.fillStyle = theme.colourTick;
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`;
    for (let tick of grads) {
      y = yAxis.yPos(tick[0]);
      ctx.fillText(tick[0], yAxis.yAxisTicks + 5, y + theme.fontSize * 0.3);
      if (tickMarker) {
        ctx.beginPath();
        ctx.moveTo(tickPos[0], y);
        ctx.lineTo(tickPos[1], y);
        ctx.stroke();
      }
    }
    ctx.restore();
    super.updated();
  }
}

class ScaleOverly extends Overlay {
  constructor(target, xAxis, yAxis, theme, parent, params) {
    parent = yAxis;
    yAxis = yAxis.yAxis;
    super(target, xAxis, yAxis, theme, parent, params);
    this.viewport = target.viewport;
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  draw() {
    const ctx = this.scene.context;
    this.yAxis.yAxis;
    this.scene.clear();
    ctx.save();
    ctx.restore();
  }
}

class ScalePriceLine extends Overlay {
  #opts;
  #txtH;
  constructor(target, xAxis, yAxis, theme, parent, params) {
    parent = yAxis;
    yAxis = yAxis.yAxis;
    super(target, xAxis, yAxis, theme, parent, params);
    this.viewport = target.viewport;
    this.#opts = {
      fontSize: YAxisStyle.FONTSIZE * 1.05,
      fontWeight: YAxisStyle.FONTWEIGHT,
      fontFamily: YAxisStyle.FONTFAMILY,
      txtCol: '#FFFFFF',
      bakCol: YAxisStyle.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    };
    this.#txtH = getTextRectHeight(this.#opts);
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  draw(candle) {
    if (candle === undefined || !this.parent.parent.isPrimary) return;
    const ctx = this.scene.context;
    const streaming =
      this.core.stream instanceof Stream && this.config.stream.tfCountDown;
    let price = candle[4],
      nice = this.parent.nicePrice(price),
      options = { ...this.#opts },
      x = 0,
      h = this.#txtH,
      y = this.parent.yPos(price) - h * 0.5;
    this.scene.clear();
    ctx.save();
    if (candle[4] >= candle[1]) options.bakCol = this.theme.candle.UpBodyColour;
    else options.bakCol = this.theme.candle.DnBodyColour;
    renderTextBG(ctx, nice, x, y, options);
    if (streaming) {
      nice = this.core.stream.countDownUpdate();
      options.fontSize = options?.fontSize / 1.1;
      renderTextBG(ctx, nice, x, y + h, options);
    }
    ctx.restore();
    this.viewport.render();
  }
}

const defaultOverlays$2 = [
  ['labels', { class: ScaleLabels, fixed: true, required: true }],
  ['overlay', { class: ScaleOverly, fixed: true, required: true }],
  ['price', { class: ScalePriceLine, fixed: true, required: true }],
  ['cursor', { class: ScaleCursor, fixed: true, required: true }]
];
class ScaleBar extends Component {
  #name = 'Y Scale Axis';
  #shortName = 'scale';
  #chart;
  #target;
  #yAxis;
  #element;
  #elViewport;
  #layerLabels;
  #layerOverlays;
  #layerPriceLine;
  #layerCursor;
  #scaleOverlays = new xMap();
  #additionalOverlays = [];
  #digitCnt;
  #digitW = 12;
  #input;
  #priceLine;
  #cursorPos;
  #position = {};
  constructor(core, options) {
    super(core, options);
    this.#element = this.options.elScale;
    this.#chart = this.options.chart;
    this.id = `${this.parent.id}_scale`;
    this.#elViewport = this.#element.viewport || this.#element;
  }
  get name() {
    return this.#name;
  }
  get shortName() {
    return this.#shortName;
  }
  get height() {
    return this.#element.getBoundingClientRect().height;
  }
  get width() {
    return this.#element.getBoundingClientRect().width;
  }
  get element() {
    return this.#element;
  }
  set cursor(c) {
    this.#element.style.cursor = c;
  }
  get cursor() {
    return this.#element.style.cursor;
  }
  get layerCursor() {
    return this.#layerCursor;
  }
  get layerLabels() {
    return this.#layerLabels;
  }
  get layerOverlays() {
    return this.#layerOverlays;
  }
  get layerPriceLine() {
    return this.#layerPriceLine;
  }
  get overlays() {
    return Object.fromEntries([...this.graph.overlays.list]);
  }
  get yAxis() {
    return this.#yAxis;
  }
  set yAxisType(t) {
    this.#yAxis.yAxisType = YAXIS_TYPE.valid(t);
  }
  get yAxisType() {
    return this.#yAxis.yAxisType;
  }
  get yAxisHeight() {
    return this.#yAxis.height;
  }
  get yAxisRatio() {
    return this.#yAxis.yAxisRatio;
  }
  get yAxisGrads() {
    return this.#yAxis.yAxisGrads;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return elementDimPos(this.#element);
  }
  get digitCnt() {
    return this.#digitCnt;
  }
  set scaleRange(r) {
    this.setScaleRange(r);
  }
  get range() {
    return this.#yAxis.range;
  }
  set rangeMode(m) {
    this.#yAxis.mode = m;
  }
  get rangeMode() {
    return this.#yAxis.mode;
  }
  set rangeYFactor(f) {
    this.core.range.yFactor(f);
  }
  set yOffset(o) {
    this.#yAxis.offset = o;
  }
  get yOffset() {
    return this.#yAxis.offset;
  }
  get scale() {
    return this;
  }
  get Scale() {
    return this;
  }
  start() {
    const ctx = this.core.MainPane.graph.viewport.scene.context;
    const t = this.theme.yAxis;
    this.setYAxis();
    ctx.font = createFont(t.fontSize, t.fontWeight, t.fontFamily);
    this.#digitW = calcTextWidth(ctx, '0');
    this.calcPriceDigits();
    this.setDimensions({ w: this.#digitW * this.#digitCnt });
    this.createGraph();
    this.#yAxis.calcGradations();
    this.draw();
    this.eventsListen();
    const newConfig = copyDeep(stateMachineConfig$3);
    newConfig.id = this.id;
    newConfig.context = this;
    this.stateMachine = newConfig;
    this.stateMachine.start();
  }
  destroy(all = true) {
    this.core.hub.expunge(this);
    this.off(
      `${this.parent.id}_pointerout`,
      this.#layerCursor.erase,
      this.#layerCursor
    );
    this.off(STREAM_UPDATE, this.onStreamUpdate, this.#layerPriceLine);
    this.graph.destroy();
    this.#input.destroy();
    if (!!all) {
      this.stateMachine.destroy();
      this.element.remove();
    }
  }
  eventsListen() {
    let canvas = this.graph.viewport.scene.canvas;
    this.#input = new Input(canvas, { disableContextMenu: false });
    this.#input.setCursor('ns-resize');
    this.#input.on('pointerdrag', this.onDrag.bind(this));
    this.#input.on('pointerdragend', this.onDragDone.bind(this));
    this.#input.on('wheel', this.onMouseWheel.bind(this));
    this.#input.on('dblclick', this.resetScaleRange.bind(this));
    this.on(`${this.parent.id}_pointermove`, this.onMouseMove, this);
    this.on(
      `${this.parent.id}_pointerout`,
      this.#layerCursor.erase,
      this.#layerCursor
    );
    this.on(STREAM_UPDATE, this.onStreamUpdate, this);
    this.on(`range_set`, this.draw, this);
  }
  onResize(dimensions) {
    this.setDimensions(dimensions);
  }
  onMouseMove(e) {
    this.#cursorPos = isArray(e)
      ? e
      : [Math.floor(e.position.x), Math.floor(e.position.y)];
    this.#layerCursor.draw(this.#cursorPos);
  }
  onDrag(e) {
    this.#cursorPos = [
      Math.floor(e.position.x),
      Math.floor(e.position.y),
      e.dragstart.x,
      e.dragstart.y,
      e.movement.x,
      e.movement.y
    ];
    this.setScaleRange(Math.sign(e.movement.y));
  }
  onDragDone(e) {}
  onMouseWheel(e) {
    e.domEvent.preventDefault();
    this.setScaleRange(Math.sign(e.wheeldelta) * -2);
  }
  onStreamUpdate(e) {
    let draw = false;
    if (this.#yAxis.mode == 'manual') {
      if (this.parent.isPrimary) {
        if (e[4] > this.range.max) {
          this.range.max = e[4];
          draw = true;
        }
        if (e[4] < this.range.min) {
          this.range.max = e[4];
          draw = true;
        }
      } else {
        let chart = this.parent;
        let range = this.core.range;
        let id = chart.view[0].id;
        let mm = this.core.range.secondaryMaxMin?.[id]?.data;
        if (!!mm) {
          let stream = range.value(undefined, id);
          stream.forEach((value, index, array) => {
            if (index == 0) return;
            if (value > mm.max) mm.max = value;
            else if (value < mm.min) mm.min = value;
          });
          draw = true;
        }
      }
    }
    if (draw) this.draw();
    else this.#layerPriceLine.draw();
  }
  onChartDrag(e) {
    if (this.#yAxis.mode !== 'manual') return;
    this.#yAxis.offset = e.domEvent.srcEvent.movementY;
    this.draw();
  }
  #setHeight(h) {
    this.#element.style.height = `${h}px`;
  }
  #setWidth(w) {
    this.#element.style.width = `${w}px`;
  }
  setDimensions(dim = {}) {
    dim = isObject(dim) ? dim : {};
    const w = dim?.w || this.width || YAXIS_MINDIGITS * YAxisStyle.FONTSIZE;
    const h = dim?.h || this.parent.height;
    this.#setWidth(w);
    this.#setHeight(h);
    if (this.graph instanceof Graph) {
      this.graph.setSize(w, h, w);
      this.draw();
    }
    if (this.#layerCursor instanceof ScaleCursor) this.calcPriceDigits();
  }
  setYAxis() {
    const range =
      this.options.yAxisType === YAXIS_TYPE.default
        ? undefined
        : this.parent.localRange;
    this.#yAxis = new yAxis(this, this, this.options.yAxisType, range);
    this.#yAxis.yAxisPadding =
      isNumber(this.options?.yAxisPadding) && this.options.yAxisPadding >= 1
        ? this.options.yAxisPadding
        : 1;
  }
  setScaleRange(r = 0) {
    if (this.#yAxis.mode == 'automatic') this.#yAxis.mode = 'manual';
    this.#yAxis.zoom = r;
    this.draw(this.range, true);
    this.core.MainPane.draw();
  }
  resetScaleRange() {
    this.#yAxis.mode = 'automatic';
    this.draw(this.range, true);
    this.core.MainPane.draw();
  }
  yPos(yData) {
    return this.#yAxis.yPos(yData);
  }
  yPosStream(yData) {
    return this.#yAxis.lastYData2Pixel(y);
  }
  yPos2Price(y) {
    return this.#yAxis.yPos2Price(y);
  }
  nicePrice($, p) {
    return limitPrecision($, p);
  }
  createGraph() {
    let overlays = copyDeep(defaultOverlays$2);
    this.graph = new Graph(this, this.#elViewport, overlays, false);
    this.#layerCursor = this.graph.overlays.get('cursor').instance;
    this.#layerLabels = this.graph.overlays.get('labels').instance;
    this.#layerOverlays = this.graph.overlays.get('overlay').instance;
    this.#layerPriceLine = this.graph.overlays.get('price').instance;
    this.graph.addOverlays(this.#additionalOverlays);
    this.#layerPriceLine.target.moveTop();
    this.#layerCursor.target.moveTop();
    this.calcPriceDigits();
  }
  calcPriceDigits() {
    let count = YAXIS_MINDIGITS,
      nice = '0';
    if (this.core.range.dataLength > 0 && this.#yAxis instanceof yAxis) {
      if (this.#chart.isPrimary) {
        nice = this.niceValue(this.range.valueMax);
      } else {
        for (let i in this.#chart.indicators) {
          let max =
            this.range.secondaryMaxMin?.[i]?.data?.max || YAXIS_MINDIGITS;
          let maxStr = this.niceValue(max);
          if (maxStr.length > nice.length) nice = maxStr;
        }
      }
      count = `${nice}`.length + 2 || YAXIS_MINDIGITS;
    }
    this.#digitCnt = count < YAXIS_MINDIGITS ? YAXIS_MINDIGITS : count;
    return this.#digitCnt;
  }
  niceValue(v) {
    const step = this.#yAxis.niceNumber(v);
    let nice = limitPrecision(step, this.core.pricePrecision);
    nice = nice.match(/^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/)[1];
    return nice;
  }
  calcScaleWidth() {
    const max = this.calcPriceDigits();
    return max * this.#digitW;
  }
  addOverlays(overlays) {
    if (!isArray(overlays)) return false;
    if (this.graph === undefined) this.#additionalOverlays.push(...overlays);
    else this.graph.addOverlays(overlays);
  }
  addOverlay(key, overlay) {
    if (!isObject(overlay)) return false;
    if (this.graph === undefined) this.#additionalOverlays.push([key, overlay]);
    else {
      let o = this.graph.addOverlay(key, overlay);
      this.#layerPriceLine.target.moveTop();
      this.#layerCursor.target.moveTop();
      return o;
    }
  }
  render() {
    this.graph.render();
  }
  draw(range = this.range, update = true) {
    this.#yAxis.calcGradations();
    this.graph.draw(range, update);
    this.parent.drawGrid(update);
    this.parent.draw(range, true);
  }
  resize(width = this.width, height = this.height) {
    this.setDimensions({ w: width, h: height });
  }
}

class chartWatermark extends Overlay {
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    this.watermark = {};
    this.params.content = params?.content || '';
  }
  set position(p) {
    this.target.setPosition(0, 0);
  }
  draw() {
    const watermark = this.config?.watermark;
    super.mustUpdate();
    if (watermark?.display === false) return;
    if (watermark?.imgURL) {
      this.watermark.imgURL = watermark.imgURL;
      isImage(watermark?.imgURL, this.renderImage.bind(this));
    } else if (isString(watermark?.text)) {
      this.watermark.text = watermark.text;
      this.scene.clear();
      const ctx = this.scene.context;
      ctx.save();
      this.renderText(watermark.text);
      ctx.restore();
    } else return;
    super.updated();
  }
  renderText(txt) {
    const ratio = Math.floor(this.core.height / CHART_MINH);
    const size = this.core.config?.watermark?.fontSize;
    const weight = this.core.config?.watermark?.fontWeight;
    const family = this.core.config?.watermark?.fontFamily;
    const colour = this.core.config?.watermark?.textColour;
    const options = {
      fontSize: (size || this.theme.watermark.FONTSIZE) * ratio,
      fontWeight: weight || this.theme.watermark.FONTWEIGHT,
      fontFamily: family || this.theme.watermark.FONTFAMILY,
      txtCol: colour || this.theme.watermark.COLOUR
    };
    const ctx = this.scene.context;
    ctx.font = createFont(
      options?.fontSize,
      options?.fontWeight,
      options?.fontFamily
    );
    ctx.textBaseline = 'top';
    ctx.fillStyle = options.txtCol;
    const height = getTextRectHeight(options);
    const width = getTextRectWidth(ctx, txt, options);
    const x = (this.scene.width - width) / 2;
    const y = (this.core.Chart.height - height) / 2;
    ctx.fillText(txt, x, y);
  }
  renderImage(i) {
    if (!i) return;
    const height =
      this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT;
    const width =
      this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH;
    const x = (this.scene.width - width) / 2;
    const y = (this.scene.height - height) / 2;
    this.scene.clear();
    const ctx = this.scene.context;
    ctx.save();
    renderImage(ctx, i, x, y, height, width);
    ctx.restore();
  }
}

class chartVolume extends Overlay {
  #volumeBar;
  #volH;
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    this.#volumeBar = new VolumeBar(target.scene, theme);
    this.theme.volume.Height = limit(theme?.volume?.Height, 0, 100) || 100;
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  draw(range = this.core.range) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    const data = range.data;
    const zeroPos = this.scene.height;
    const offset = this.xAxis.smoothScrollOffset || 0;
    let w = Math.max(this.xAxis.candleW - 1, 1);
    w = candleW(w);
    const volume = {
      x: 0 + offset - this.xAxis.candleW,
      w: w,
      z: zeroPos
    };
    const volH = Math.floor((zeroPos * this.theme.volume.Height) / 100);
    let o = this.core.rangeScrollOffset;
    let v = range.indexStart - o;
    let i = range.Length + o * 2;
    let j = i;
    let u = v;
    let x;
    let maxVol = 0;
    while (j--) {
      x = range.value(u);
      if (x[4] !== null) {
        maxVol = x[5] > maxVol ? x[5] : maxVol;
      }
      u++;
    }
    while (i--) {
      x = range.value(v);
      volume.x = bRound(this.xAxis.xPos(x[0]) - w / 2);
      if (x[4] !== null) {
        volume.h = volH - volH * ((maxVol - x[5]) / maxVol);
        volume.raw = data[v];
        this.#volumeBar.draw(volume);
      }
      v++;
    }
    super.updated();
  }
}

class chartCandles extends Overlay {
  #candle;
  constructor(target, xAxis = false, yAxis = false, theme, parent) {
    super(target, xAxis, yAxis, theme, parent);
    this.#candle = new Candle(target.scene, theme);
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  draw(range = this.core.range) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    let render;
    let type = this.theme.candle.Type;
    switch (type) {
      case CandleType.AREA:
      case CandleType.LINE:
        render = (candle) => {
          this.#candle.area({ ...candle });
        };
        break;
      default:
        render = (candle) => {
          this.#candle.draw(candle);
        };
        break;
    }
    const offset = this.xAxis.smoothScrollOffset || 0;
    const candle = {
      x: offset - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o;
    let i = range.Length + o * 2;
    let x;
    if (this.core.stream) {
      this.core.stream.lastPriceMax = range.valueMax;
      this.core.stream.lastPriceMin = range.valueMin;
    }
    while (i) {
      if (c >= 0) {
        x = range.value(c);
        candle.x = this.xAxis.xPos(x[0]);
        if (x?.[7]) {
          this.core.stream.lastXPos = candle.x;
          this.core.stream.lastYPos = { ...candle };
          break;
        }
        if (x[4] !== null) {
          candle.o = this.yAxis.yPos(x[1]);
          candle.h = this.yAxis.yPos(x[2]);
          candle.l = this.yAxis.yPos(x[3]);
          candle.c = this.yAxis.yPos(x[4]);
          candle.raw = x;
          render(candle);
        }
      }
      c++;
      i--;
    }
    if (type === CandleType.AREA || type === CandleType.LINE)
      this.#candle.areaRender();
    super.updated();
  }
}

class chartCandleStream extends Overlay {
  #candle;
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    this.#candle = new Candle(target.scene, theme);
    this.theme.priceLineStyle = this.theme?.priceLineStyle || PriceLineStyle;
  }
  set position(p) {
    this.setPosition(p[0], p[1]);
  }
  setPosition(x, y) {
    if (this.core.stream === undefined) return;
    this.target.setPosition(x, y);
    this.core.stream.lastScrollPos = this.core.scrollPos;
  }
  draw() {
    if (this.core.stream === undefined || !isArray(this.chart.streamCandle))
      return;
    this.scene.clear();
    const r = this.core.range;
    const stream = this.chart.streamCandle;
    const render =
      this.theme.candle.Type === CandleType.AREA ||
      this.theme.candle.Type === CandleType.LINE
        ? (candle) => {
            this.areaRender(candle);
          }
        : (candle) => {
            this.#candle.draw(candle);
          };
    this.xAxis.smoothScrollOffset || 0;
    const pos = this.core.stream.lastXPos;
    const candle = {
      x: pos,
      w: this.xAxis.candleW
    };
    candle.o = this.yAxis.yPos(stream[1]);
    candle.h = this.yAxis.yPos(stream[2]);
    candle.l = this.yAxis.yPos(stream[3]);
    candle.c = this.yAxis.yPos(stream[4]);
    candle.raw = stream;
    if (r.inRenderRange(stream[0])) {
      render(candle);
    }
    if (stream[4] >= stream[1])
      this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour;
    else this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour;
    renderLineHorizontal(
      this.scene.context,
      candle.c,
      0,
      this.target.width,
      this.theme.priceLineStyle
    );
  }
  areaRender(candle) {
    const r = this.core.range;
    const raw = r.value(r.data.length - 2);
    if (raw === null) return;
    const prev = {
      x: this.xAxis.xPos(raw[0]),
      o: this.yAxis.yPos(raw[1]),
      h: this.yAxis.yPos(raw[2]),
      l: this.yAxis.yPos(raw[3]),
      c: this.yAxis.yPos(raw[4])
    };
    const ctx = this.scene.context;
    const cfg = this.theme;
    const bodyColour = cfg.candle.UpBodyColour || cfg.candle.DnBodyColour;
    Math.max(candle.w - 1, 1);
    candle.x;
    let fill;
    ctx.save();
    ctx.fillStyle = bodyColour;
    ctx.strokeStyle = bodyColour;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(candle.x, candle.c);
    ctx.lineTo(prev.x, prev.h);
    if (cfg.candle.Type === CandleType.AREA) {
      fill = ctx.createLinearGradient(0, 0, 0, this.scene.height);
      if (isArray(cfg.candle.AreaFillColour)) {
        for (let [index, value] of cfg.candle.AreaFillColour.entries()) {
          fill.addColorStop(index, value);
        }
      } else if (isString(cfg.candle.AreaFillColour))
        fill = cfg.candle.AreaFillColour;
      else fill = cfg.candle.UpBodyColour || cfg.candle.DnBodyColour;
      ctx.stroke();
      ctx.lineTo(prev.x, this.scene.height);
      ctx.lineTo(candle.x, this.scene.height);
      ctx.fillStyle = fill;
      ctx.closePath();
      ctx.fill();
    } else ctx.stroke();
    ctx.restore();
  }
}

const defaults = {
  colour: '#4444cc88',
  wdith: 1,
  dash: [1, 0]
};
class chartHighLow extends Overlay {
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    const hiLo = { class: scaleHighLow, fixed: true, required: false };
    if (this.core.config?.highLow === true)
      this.scaleOverly = this.chart.scale.addOverlay('hiLo', hiLo);
  }
  set position(p) {
    this.target.setPosition(0, 0);
  }
  draw(range = this.core.range) {
    if (this.core.config?.highLow !== true) return;
    if (!super.mustUpdate()) return;
    this.scene.clear();
    let txt, x, y;
    let r = this.scene.width;
    let w = 35;
    let opts = {};
    const hi = range.valueHi;
    const lo = range.valueLo;
    const theme = { ...this.theme.yAxis };
    const ctx = this.scene.context;
    theme.colourCursorBG = this.theme?.hilo?.colour || defaults.colour;
    ctx.save();
    ctx.strokeStyle = this.theme?.highLow?.colour || defaults.colour;
    ctx.strokeWidth = this.theme?.highLow?.width || defaults.width;
    ctx.setLineDash(this.theme?.highLow?.dash || defaults.dash);
    y = this.yAxis.yPos(hi);
    renderLineHorizontal(ctx, y, 0, r, opts);
    txt = 'High';
    x = this.theme.yAxis.location == 'left' ? 0 : r - (w + 25);
    drawText(ctx, txt, x, y, w, theme);
    y = this.yAxis.yPos(lo);
    renderLineHorizontal(ctx, y, 0, r, opts);
    txt = 'Low';
    drawText(ctx, txt, x, y, w, theme);
    ctx.restore();
    super.updated();
    if ('hiLo' in this.chart.scale.overlays) {
      this.chart.scale.overlays.hiLo.instance.setRefresh();
      this.chart.scale.overlays.hiLo.instance.scaleDraw();
    }
  }
}
class scaleHighLow extends Overlay {
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    this.viewport = target.viewport;
  }
  set position(p) {
    this.target.setPosition(0, 0);
  }
  draw() {}
  scaleDraw(range = this.core.range) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    let txt, x, y, w;
    const hi = range.valueHi;
    const lo = range.valueLo;
    const theme = { ...this.theme.yAxis };
    const ctx = this.scene.context;
    theme.colourCursorBG = this.theme?.hilo?.colour || defaults.colour;
    txt = this.chart.Scale.nicePrice(hi);
    x = 1;
    y = this.yAxis.yPos(hi) + 1;
    w = this.viewport.width;
    drawText(ctx, txt, x, y, w, theme);
    txt = this.chart.Scale.nicePrice(lo);
    y = this.yAxis.yPos(lo) + 1;
    drawText(ctx, txt, x, y, w, theme);
    super.updated();
  }
}
function drawText(ctx, txt, x, y, w, theme) {
  let options = {
      fontSize: theme.fontSize * 1.05,
      fontWeight: theme.fontWeight,
      fontFamily: theme.fontFamily,
      txtCol: theme.colourCursor,
      bakCol: theme.colourCursorBG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 3,
      paddingRight: 3,
      width: w
    },
    height = options.fontSize + options.paddingTop + options.paddingBottom,
    yPos = y - height * 0.5;
  ctx.save();
  ctx.fillStyle = options.bakCol;
  ctx.fillRect(x, yPos, w, height);
  renderTextBG(ctx, `${txt}`, x, yPos, options);
  ctx.restore();
}

class NewsEvent {
  constructor(target, theme) {
    this.scene = target.scene;
    this.hit = target.hit;
    this.ctx = this.scene.context;
    this.ctxH = this.hit.context;
    this.width = this.scene.width;
    this.cfg = theme.events;
    this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight };
    this.icon = svgToImage(this.cfg.iconEvent, this.cfg.iconColour, this.dims);
  }
  draw(data) {
    this.data = data;
    const i = this.icon;
    const c = this.cfg;
    const k = this.hit.getIndexValue(data.key);
    const hit = fillMask(k, i);
    const h = limit(data.w, c.iconMinDim, c.iconHeight);
    const w = limit(data.w, c.iconMinDim, c.iconWidth);
    const x = this.data.x;
    const y = this.data.y;
    const ctx = this.ctx;
    const ctxH = this.ctxH;
    ctx.save();
    ctx.drawImage(i, x, y, w, h);
    ctx.restore();
    ctxH.save();
    ctxH.drawImage(hit, x, y, w, h);
    ctxH.restore();
    return { x, y, w, h, k };
  }
}

const newsConfig = {
  bounded: true,
  dragBar: false,
  closeIcon: false,
  content: '',
  styles: {
    window: {
      width: '15em',
      zindex: '10'
    },
    content: {
      overflow: 'hidden',
      padding: '0 1em'
    }
  }
};
class chartNewsEvents extends Overlay {
  #event;
  #events = [];
  #dialogue;
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    this.#event = new NewsEvent(target, theme);
    this.core.on('chart_primaryPointerDown', this.onPrimaryPointerDown, this);
    newsConfig.parent = this;
    this.#dialogue = this.core.WidgetsG.insert('Dialogue', newsConfig);
    this.#dialogue.start();
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  get data() {
    return this.overlay.data;
  }
  onPrimaryPointerDown(e) {
    if (this.core.MainPane.stateMachine.state !== 'chart_pan')
      debounce(this.isNewsEventSelected, HIT_DEBOUNCE, this)(e);
  }
  isNewsEventSelected(e) {
    const x = e[0];
    const y = e[1];
    const k = this.hit.getIntersection(x, y);
    if (
      this.core.config?.events?.display === false ||
      this.core.config?.events?.displayInfo === false ||
      k == -1
    )
      return;
    const d = this.theme.events;
    const w = limit(this.xAxis.candleW, d.iconMinDim, d.iconHeight);
    const ts = this.xAxis.pixel2T(x);
    const o = this.xAxis.scrollOffsetPx;
    const iPos = this.core.dimensions;
    let tr = Object.keys(this.data)[k] * 1;
    let tx = this.xAxis.xPos(ts) + o;
    let ty = y - w * 1.5 - iPos.height;
    let content = ``;
    for (let t of this.data[tr]) {
      content += this.buildNewsEventHTML(t);
    }
    const config = {
      dimensions: { h: undefined, w: 150 },
      position: { x: tx + w / 2 + 1, y: ty },
      content: content,
      offFocus: HIT_DEBOUNCE + 1
    };
    this.core.emit('event_selected', tr);
    this.#dialogue.open(config);
  }
  buildNewsEventHTML(h) {
    let t = h?.title;
    let c = `<style>
    h1, p {display: inline-block; font-size: 0.9em;
    max-width: 98%;
    </style>`;
    if (isString(h?.url))
      t = `<a href="${h?.url}" target="${h?.target}">${t}</a>`;
    c += `<h1>${t}</h1>`;
    c += `<p>${h?.content}</p>`;
    return c;
  }
  draw(range = this.core.range) {
    if (
      this.core.config?.events?.display === false ||
      !isObject(this.data) ||
      Object.keys(this.data).length == 0 ||
      !super.mustUpdate()
    )
      return;
    this.hit.clear();
    this.scene.clear();
    this.#events.length = 0;
    const offset = this.xAxis.smoothScrollOffset || 0;
    const event = {
      x: offset - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let d = this.theme.events;
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o;
    let i = range.Length + o * 2;
    let x, t, k;
    while (i) {
      x = range.value(c);
      t = `${x[0]}`;
      k = Object.keys(this.data).indexOf(t);
      if (k >= 0) {
        for (let tr of this.data[t]) {
          event.x = this.xAxis.xPos(x[0]) - this.xAxis.candleW / 2;
          event.y =
            this.scene.height -
            limit(this.xAxis.candleW, d.iconMinDim, d.iconHeight) * 1.5;
          event.key = k;
          this.#events.push(this.#event.draw(event));
        }
      }
      c++;
      i--;
    }
    super.updated();
  }
}

class Trade {
  constructor(target, theme) {
    this.dims = { w: 0, h: 0 };
    this.scene = target.scene;
    this.hit = target.hit;
    this.ctx = this.scene.context;
    this.ctxH = this.hit.context;
    this.width = this.scene.width;
    this.cfg = theme.trades;
    this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight };
    this.buy = svgToImage(this.cfg.iconBuy, this.cfg.buyColour, this.dims);
    this.sell = svgToImage(this.cfg.iconSell, this.cfg.sellColour, this.dims);
  }
  draw(data) {
    this.data = data;
    const c = this.cfg;
    const i = data.side === 'buy' ? this.buy : this.sell;
    data.side === 'buy' ? c.iconBuy : c.iconSell;
    const k = this.hit.getIndexValue(data.key);
    const hit = fillMask(k, i);
    const h = limit(data.w, c.iconMinDim, c.iconHeight);
    const w = limit(data.w, c.iconMinDim, c.iconWidth);
    const x = this.data.x;
    const y = this.data.y;
    const ctx = this.ctx;
    const ctxH = this.ctxH;
    ctx.save();
    ctx.drawImage(i, x, y, w, h);
    ctx.restore();
    ctxH.save();
    ctxH.drawImage(hit, x, y, w, h);
    ctxH.restore();
    return { x, y, w, h, k };
  }
}

const tradeDialogue = {
  bounded: true,
  dragBar: false,
  closeIcon: false,
  content: '',
  styles: {
    window: {
      width: '15em',
      zindex: '10'
    },
    content: {
      overflow: 'hidden',
      padding: '0 1em'
    }
  }
};
class chartTrades extends Overlay {
  #trade;
  #trades = [];
  #data;
  #dialogue;
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    this.settings = params.settings;
    State.importData(
      'trades',
      this.data,
      this.state,
      this.state.time.timeFrame
    );
    this.#trade = new Trade(target, theme);
    this.core.on('chart_primaryPointerDown', this.onPrimaryPointerDown, this);
    tradeDialogue.parent = this;
    this.#dialogue = this.core.WidgetsG.insert('Dialogue', tradeDialogue);
    this.#dialogue.start();
  }
  destroy() {
    this.core.off('chart_primaryPointerDown', this.onPrimaryPointerDown, this);
  }
  set position(p) {
    this.target.setPosition(p[0], p[1]);
  }
  get data() {
    return this.overlay.data;
  }
  get settings() {
    return this.params.settings;
  }
  set settings(s) {
    this.doSettings(s);
  }
  doSettings(s) {
    if (!isObject(s)) return false;
    let t = this.theme.trades;
    for (let e in s) {
      if (s[e] === undefined) continue;
      t[e] = s[e];
    }
  }
  onPrimaryPointerDown(e) {
    if (this.core.MainPane.stateMachine.state !== 'chart_pan')
      debounce(this.isTradeSelected, HIT_DEBOUNCE, this)(e);
  }
  isTradeSelected(e) {
    const evt = e[2].domEvent.srcEvent;
    const DOM = (evt.target || evt.srcElement).getBoundingClientRect();
    const x = evt.clientX - (DOM.right - DOM.width);
    const y = evt.clientY - DOM.top;
    const k = this.hit.getIntersection(x, y);
    if (
      this.core.config?.trades?.display === false ||
      this.core.config?.trades?.displayInfo === false ||
      k == -1
    )
      return;
    console.log('isTradeSelected()');
    const d = this.theme.trades;
    const w = limit(this.xAxis.candleW, d.iconMinDim, d.iconWidth);
    const ts = this.xAxis.pixel2T(x);
    this.core.range.valueByTS(ts);
    const o = this.xAxis.scrollOffsetPx;
    const iPos = this.core.dimensions;
    let tr = Object.keys(this.data)[k] * 1;
    let tx = this.xAxis.xPos(ts) + o;
    let ty = y - w * 1.5 - iPos.height;
    let content = ``;
    for (let t of this.data[tr]) {
      content += this.buildTradeHTML(t);
    }
    const config = {
      dimensions: { h: undefined, w: 150 },
      position: { x: tx + w / 2 + 1, y: ty },
      content: content,
      offFocus: HIT_DEBOUNCE + 1
    };
    this.core.emit('trade_selected', tr);
    this.#dialogue.open(config);
  }
  buildTradeHTML(h) {
    let c = `<style>
    dt, dd {display: inline-block; font-size: 0.9em;}
    dt {min-width: 40%;}
    dd {min-width: 60%; margin: 0;}
    </style>`;
    c += `<dl>`;
    for (let k in h) {
      if (k == 'timestamp') continue;
      c += `<dt>${k}</dt><dd>${h[k]}</dd>`;
    }
    c += `</dl>`;
    return c;
  }
  draw(range = this.core.range) {
    if (
      this.core.config?.events?.display === false ||
      !isObject(this.data) ||
      Object.keys(this.data).length == 0 ||
      !super.mustUpdate()
    )
      return;
    this.hit.clear();
    this.scene.clear();
    this.#trades.length = 0;
    const offset = this.xAxis.smoothScrollOffset || 0;
    const trade = {
      x: offset - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let d = this.theme.trades;
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o;
    let i = range.Length + o * 2;
    let x, t, k;
    while (i) {
      x = range.value(c);
      t = `${x[0]}`;
      k = Object.keys(this.data).indexOf(t);
      if (k >= 0) {
        for (let tr of this.data[t]) {
          trade.x = this.xAxis.xPos(x[0]) - this.xAxis.candleW / 2;
          trade.y =
            this.yAxis.yPos(x[2]) -
            limit(this.xAxis.candleW, d.iconMinDim, d.iconHeight) * 1.5;
          trade.side = tr.side;
          trade.key = k;
          this.#trades.push(this.#trade.draw(trade));
        }
      }
      c++;
      i--;
    }
    super.updated();
  }
}

class NodeState {
  static {
    this.passive = new NodeState('passive');
  }
  static {
    this.hover = new NodeState('hover');
  }
  static {
    this.active = new NodeState('active');
  }
  constructor(name) {
    this.name = name;
  }
}

const toolsDialogue = {
  bounded: true,
  dragBar: false,
  closeIcon: false,
  content: '',
  styles: {
    window: {
      width: '15em',
      zindex: '10'
    },
    content: {
      overflow: 'hidden',
      padding: '0 1em'
    }
  }
};
class chartTools extends Overlay {
  static #cnt = 0;
  static #instances = {};
  static get inCnt() {
    return chartTools.#cnt++;
  }
  static create(target, config) {
    const cnt = ++chartTools.#cnt;
    config.cnt = cnt;
    config.modID = `${config.toolID}_${cnt}`;
    config.toolID = config.modID;
    config.target = target;
    const tool = new config.tool(config);
    chartTools.#instances[cnt] = tool;
    target.chartToolAdd(tool);
    return tool;
  }
  static destroy(tool) {
    if (tool instanceof chartTools) {
      delete chartTools.#instances[tool.inCnt];
    }
  }
  #id;
  #inCnt;
  #name = 'Chart Tools';
  #shortName = 'TX_Tool';
  #configDialogue;
  #chart;
  #cursorPos = [0, 0];
  #cursorActive = false;
  #cursorClick;
  #boundingBox = { TL: [0, 0], BR: [0, 0] };
  constructor(target, xAxis = false, yAxis = false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    const overlay = params?.overlay;
    this.#inCnt = chartTools.inCnt;
    this.id = overlay?.id || uid(this.shortName);
    this.settings = params?.settings || {};
    toolsDialogue.parent = this;
    this.#configDialogue = this.core.WidgetsG.insert(
      'ConfigDialogue',
      toolsDialogue
    );
    this.#configDialogue.start();
    this.eventsListen();
  }
  set id(id) {
    this.#id = idSanitize(id);
  }
  get id() {
    return this.#id || `${this.core.ID}-${uid(this.#shortName)}_${this.#inCnt}`;
  }
  get inCnt() {
    return this.#inCnt;
  }
  get name() {
    return this.#name;
  }
  get shortName() {
    return this.#shortName;
  }
  get settings() {
    return this.params.settings;
  }
  set settings(s) {
    this.doSettings(s);
  }
  eventsListen() {
    const chart = this.chart;
    chart.on(`${chart.id}_pointermove`, this.onPointerMove, this);
    chart.on(`${chart.id}_pointerdown`, this.onPointerDown, this);
    chart.on(`${chart.id}_pointerup`, this.onPointerUp, this);
  }
  onPointerMove(pos) {
    if (this.chart.stateMachine.state === 'chart_pan') return;
  }
  onPointerDown(pos) {
    if (this.chart.stateMachine.state === 'chart_pan') return;
    debounce(this.isToolSelected, HIT_DEBOUNCE, this)(pos);
  }
  onPointerUp(pos) {}
  isToolSelected(e) {}
  doSettings(s) {
    if (!isObject(s)) return false;
    let t = this.theme.trades;
    for (let e in s) {
      if (s[e] === undefined) continue;
      t[e] = s[e];
    }
  }
  isVisible() {}
  draw(range = this.core.range) {
    if (!super.mustUpdate()) return;
    if (this.core.config?.tools?.display === false) return;
    this.hit.clear();
    this.scene.clear();
    this.theme.tools;
    let o = this.core.rangeScrollOffset;
    range.indexStart - o;
    range.Length + o * 2;
    super.updated();
  }
}

const defaultOverlays$1 = {
  primaryPane: [
    [
      'watermark',
      {
        class: chartWatermark,
        fixed: true,
        required: true,
        params: { content: null }
      }
    ],
    [
      'grid',
      { class: chartGrid, fixed: true, required: true, params: { axes: 'y' } }
    ],
    ['candles', { class: chartCandles, fixed: false, required: true }],
    ['hiLo', { class: chartHighLow, fixed: true, required: false }],
    ['stream', { class: chartCandleStream, fixed: false, required: true }],
    ['cursor', { class: chartCursor, fixed: true, required: true }]
  ],
  secondaryPane: [
    [
      'grid',
      { class: chartGrid, fixed: true, required: true, params: { axes: 'y' } }
    ],
    ['cursor', { class: chartCursor, fixed: true, required: true }]
  ]
};
const optionalOverlays = {
  primaryPane: {
    trades: { class: chartTrades, fixed: false, required: false },
    events: { class: chartNewsEvents, fixed: false, required: false },
    volume: {
      class: chartVolume,
      fixed: false,
      required: true,
      params: { maxVolumeH: VolumeStyle.ONCHART_VOLUME_HEIGHT }
    }
  },
  secondaryPane: {
    candles: { class: chartCandles, fixed: false, required: true }
  }
};
const chartLegend = {
  id: 'chart',
  title: '',
  type: 'chart',
  parent: undefined,
  source: () => {},
  visible: true
};
class Chart extends Component {
  static #cnt = 0;
  static get cnt() {
    return Chart.#cnt++;
  }
  #id;
  #name;
  #shortName;
  #title;
  #chartCnt;
  #type;
  #status = 'idle';
  #collapsed = {
    state: false,
    height: null,
    rowsHeight: null,
    rowsCnt: 1
  };
  #elTarget;
  #elScale;
  #Scale;
  #Time;
  #Legends;
  #Divider;
  #Stream;
  #ConfigDialogue;
  #streamCandle;
  #view;
  #viewport;
  #layersTools = new xMap();
  #overlayTools = new xMap();
  #cursorPos = [0, 0];
  #cursorActive = false;
  #cursorClick;
  #input;
  #yAxisType;
  #localRange = {
    valueMax: 110,
    valueMin: -10,
    valueDiff: 120
  };
  #indicatorDeleteList = {};
  constructor(core, options = {}) {
    super(core, options);
    this.#chartCnt = Chart.cnt;
    if (!isObject(options))
      throw new Error(
        `TradeX-Chart : id: ${core.id} : Chart (pane) constructor failed: Expected options typeof object`
      );
    this.#name = this.options.name;
    this.#shortName = this.options.shortName;
    this.#title = this.options.title;
    this.#type =
      this.options.type == 'primary' ? 'primaryPane' : 'secondaryPane';
    this.#view = this.options.view;
    this.#elScale = this.options.elements.elScale;
    this.#elTarget = this.options.elements.elTarget;
    this.#elTarget.id = this.id;
    this.legend = new Legends(this.elLegend, this);
    if (this.isPrimary) {
      chartLegend.type = 'chart';
      chartLegend.title = `${this.title} : ${this.range.timeFrame} : `;
      chartLegend.parent = this;
      chartLegend.source = this.legendInputs.bind(this);
      this.legend.add(chartLegend);
      this.yAxisType = YAXIS_TYPE.default;
    } else {
      let type = this.core.indicatorClasses[options.view[0].type].scale;
      chartLegend.type = 'secondary';
      chartLegend.title = '';
      chartLegend.parent = this;
      chartLegend.source = () => {
        return { inputs: {}, colours: [], labels: [] };
      };
      this.legend.add(chartLegend);
      this.yAxisType = YAXIS_TYPE.valid(type);
    }
    this.setScaleBar();
    this.#status = 'init';
  }
  set id(id) {
    this.#id = idSanitize(id);
  }
  get id() {
    return (
      this.#id || idSanitize(`${this.core.ID}-${this.#name}_${this.#chartCnt}`)
    );
  }
  get name() {
    return this.#name;
  }
  get shortName() {
    return this.#shortName;
  }
  set title(t) {
    this.setTitle(t);
  }
  get title() {
    return this.#title;
  }
  get type() {
    return this.#type;
  }
  get status() {
    return this.#status;
  }
  get collapsed() {
    return this.#collapsed;
  }
  get isPrimary() {
    return this.options?.view?.primary || this.#type === 'primaryPane' || false;
  }
  get element() {
    return this.#elTarget;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return elementDimPos(this.#elTarget);
  }
  set width(w) {
    this.setWidth(w);
  }
  get width() {
    return this.#elTarget.getBoundingClientRect().width;
  }
  set height(h) {
    this.setHeight(h);
  }
  get height() {
    return this.#elTarget.getBoundingClientRect().height;
  }
  get localRange() {
    return this.#localRange;
  }
  get stream() {
    return this.#Stream;
  }
  get streamCandle() {
    return this.#streamCandle;
  }
  set cursor(c) {
    this.element.style.cursor = c;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#cursorPos;
  }
  set cursorActive(a) {
    this.#cursorActive = a;
  }
  get cursorActive() {
    return this.#cursorActive;
  }
  get cursorClick() {
    return this.#cursorClick;
  }
  get candleW() {
    return this.core.Timeline.candleW;
  }
  get scrollPos() {
    return this.core.scrollPos;
  }
  get bufferPx() {
    return this.core.bufferPx;
  }
  get elCanvas() {
    return this.graph.viewport.scene.canvas;
  }
  get elScale() {
    return this.#elScale;
  }
  get elLegend() {
    return this.#elTarget.legend;
  }
  get elViewport() {
    return this.#elTarget.viewport;
  }
  set layerWidth(w) {
    this.graph.layerWidth = w;
  }
  get layerWidth() {
    return this.graph.layerWidth;
  }
  set legend(l) {
    this.#Legends = l;
  }
  get legend() {
    return this.#Legends;
  }
  set time(t) {
    this.#Time = t;
  }
  get time() {
    return this.#Time;
  }
  set scale(s) {
    this.#Scale = s;
  }
  get scale() {
    return this.#Scale;
  }
  set yAxisType(t) {
    this.setYAxisType(t);
  }
  get yAxisType() {
    return this.#yAxisType;
  }
  get axes() {
    return 'x';
  }
  get view() {
    return this.#view;
  }
  get viewport() {
    return this.graph.viewport;
  }
  get layerGrid() {
    return this.graph.overlays.get('grid').layer;
  }
  get overlays() {
    return Object.fromEntries([...this.graph.overlays.list]);
  }
  get overlayGrid() {
    return this.graph.overlays.get('grid').instance;
  }
  get overlayTools() {
    return this.#overlayTools;
  }
  get overlaysDefault() {
    return defaultOverlays$1[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#indicatorDeleteList;
  }
  get Divider() {
    return this.#Divider;
  }
  get siblingPrev() {
    return this.sibling('prev');
  }
  get siblingNext() {
    return this.sibling('next');
  }
  start() {
    this.#Time = this.core.Timeline;
    this.createGraph();
    this.#Scale.start();
    this.draw(this.range);
    this.cursor = 'crosshair';
    stateMachineConfig$4.id = this.id;
    stateMachineConfig$4.context = this;
    this.stateMachine = stateMachineConfig$4;
    this.stateMachine.start();
    this.eventsListen();
    let cfg = { chartPane: this };
    this.#Divider = this.core.WidgetsG.insert('Divider', cfg);
    this.#Divider.start();
    const content = `Configure chart ${this.id}`;
    let cfg2 = {
      title: 'Chart Config',
      content,
      parent: this,
      openNow: false
    };
    this.#ConfigDialogue = this.core.WidgetsG.insert('ConfigDialogue', cfg2);
    this.#ConfigDialogue.start();
    this.#status = 'running';
    this.log(
      `TradeX-Chart : id: ${this.core.id} : Chart Pane ${this.name} instantiated and running`
    );
  }
  destroy() {
    if (this.#status === 'destroyed') return;
    if (!this.core.MainPane.chartDeleteList[this.id]) {
      this.core.warn(
        `Cannot "destroy()": ${this.id} !!! Use "remove()" or "chartPaneRemove()" instead.`
      );
      return;
    }
    this.core.log(`Deleting chart pane: ${this.id}`);
    this.deactivate(true);
    this.#status = 'destroyed';
  }
  remove() {
    this.emit('chart_paneDestroy', this.id);
  }
  deactivate(indicators = false) {
    this.core.hub.expunge(this);
    if (!!indicators) this.removeAllIndicators();
    this.stateMachine.destroy();
    this.#Divider.destroy();
    this.#Scale.destroy();
    this.graph.destroy();
    this.#input.destroy();
    this.legend.destroy();
    this.stateMachine = undefined;
    this.#Divider = undefined;
    this.#Legends = undefined;
    this.#Scale = undefined;
    this.graph = undefined;
    this.#input = undefined;
    this.element.remove();
  }
  snapshot() {
    let maxed = this.core.MainPane.chartPaneMaximized?.instance;
    return {
      maximized: maxed?.id == this.id,
      collapsed: { ...this.collapsed },
      height: this.height
    };
  }
  eventsListen() {
    this.#input = new Input(this.#elTarget, { disableContextMenu: false });
    this.#input.on('pointerdrag', this.onChartDrag.bind(this));
    this.#input.on('pointerdragend', this.onChartDragDone.bind(this));
    this.#input.on('pointermove', this.onPointerMove.bind(this));
    this.#input.on('pointerenter', this.onPointerEnter.bind(this));
    this.#input.on('pointerout', this.onPointerOut.bind(this));
    this.#input.on('pointerdown', this.onPointerDown.bind(this));
    this.#input.on('pointerup', this.onPointerUp.bind(this));
    this.on('main_mouseMove', this.updateLegends, this);
    this.on(STREAM_LISTENING, this.onStreamListening, this);
    this.on(STREAM_NEWVALUE, this.onStreamNewValue, this);
    this.on(STREAM_UPDATE, this.onStreamUpdate, this);
    this.on(STREAM_FIRSTVALUE, this.onStreamNewValue, this);
    this.on('range_timeframeSet', this.onTimeframeSet, this);
    this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this);
    if (this.isPrimary) this.on('chart_yAxisRedraw', this.onYAxisRedraw, this);
  }
  onChartDrag(e) {
    this.cursor = 'grab';
    this.core.MainPane.onChartDrag(e);
    this.scale.onChartDrag(e);
  }
  onChartDragDone(e) {
    this.cursor = 'crosshair';
    this.core.MainPane.onChartDragDone(e);
  }
  onPointerMove(e) {
    this.core.MainPane.onPointerActive(this);
    this.scale.layerCursor.visible = true;
    this.graph.overlays.list.get('cursor').layer.visible = true;
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.#Scale.onMouseMove(this.#cursorPos);
    this.emit(`${this.id}_pointermove`, this.#cursorPos);
  }
  onPointerEnter(e) {
    this.core.MainPane.onPointerActive(this);
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.core.MainPane.onMouseEnter();
    this.scale.layerCursor.visible = true;
    this.graph.overlays.list.get('cursor').layer.visible = true;
    this.emit(`${this.id}_pointerenter`, this.#cursorPos);
  }
  onPointerOut(e) {
    this.#cursorActive = false;
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.scale.layerCursor.visible = false;
    this.emit(`${this.id}_pointerout`, this.#cursorPos);
  }
  onPointerDown(e) {
    this.core.pointerButtons[e.domEvent.srcEvent.button] = true;
    this.#cursorClick = [Math.floor(e.position.x), Math.floor(e.position.y), e];
    if (this.stateMachine.state === 'tool_activated')
      this.emit('tool_targetSelected', { target: this, position: e });
    else if (this.isPrimary)
      this.emit('chart_primaryPointerDown', this.#cursorClick);
  }
  onPointerUp(e) {
    this.core.pointerButtons[e.domEvent.srcEvent.button] = false;
  }
  onStreamListening(stream) {
    if (this.#Stream !== stream) this.#Stream = stream;
  }
  onStreamNewValue(value) {
    this.draw(this.range, true);
  }
  onStreamUpdate(candle) {
    if (this.isPrimary) {
      this.#streamCandle = candle;
      this.chartStreamCandle.draw();
      this.layerStream.setPosition(this.core.stream.lastScrollPos, 0);
      this.updateLegends(this.cursorPos, candle);
    } else this.updateLegends();
    this.core.MainPane.draw();
  }
  onYAxisRedraw() {
    if (this.isPrimary) this.refresh();
  }
  onDeleteIndicator(i) {
    this.removeIndicator(i.id);
  }
  onTimeframeSet() {
    let title = `${this.title} : ${this.range.timeFrame} : `;
    chartLegend.title = title;
    this.setTitle(title);
  }
  setScaleBar() {
    const opts = { ...this.options };
    opts.parent = this;
    opts.chart = this;
    opts.elScale = this.elScale;
    opts.yAxisType = this.yAxisType;
    this.scale = new ScaleBar(this.core, opts);
  }
  setTitle(t) {
    if (!isString(t)) return false;
    this.#title = t;
    chartLegend.title = t;
    const title = this.legend.list.chart.el.querySelectorAll('.title');
    for (let n of title) {
      n.innerHTML = t;
    }
    return true;
  }
  setWatermark(w) {
    if (isString(w.text) || isString(w)) this.core.config.watermark.text = w;
    else if ('imgURL' in w) this.core.config.watermark.imgURL = w;
  }
  setHeight(h) {
    if (!isNumber(h)) h = this.height || this.core.MainPane.rowsH;
    if (h > this.core.MainPane.rowsH) h = this.core.MainPane.rowsH;
    this.#elTarget.style.height = `${h}px`;
    this.#elScale.style.height = `${h}px`;
    this.elViewport.style.height = `${h}px`;
    this.#Scale.setDimensions({ w: null, h: h });
    this.Divider?.setPos();
    this.Divider?.setWidth();
  }
  setDimensions(dims = { w: this.width, h: this.height }) {
    if (!isObject(dims)) dims = { w: this.width, h: this.height };
    const buffer = this.config.buffer || BUFFERSIZE;
    let w = isNumber(dims?.w) ? dims.w : this.width;
    let h = isNumber(dims?.h) ? dims.h : this.height;
    this.setHeight(h);
    if (this.graph instanceof Graph) {
      this.layerWidth = Math.round(w * ((100 + buffer) * 0.01));
      this.graph.setSize(w, h, this.layerWidth);
      this.draw(undefined, true);
      this.core.MainPane.draw(undefined, false);
      this.Divider.setPos();
      this.Divider.setWidth();
    }
  }
  setLocalRange(min, max) {
    if (!isNumber(max) || !isNumber(min)) return false;
    if (min > max) [min, max] = [max, min];
    this.#localRange = {
      valueMax: max,
      valueMin: min,
      valueDiff: max - min
    };
  }
  setYAxisType(t) {
    let type = YAXIS_TYPE.valid(t);
    if (this.type == 'primaryPane' && type == YAXIS_TYPE.percent)
      this.#yAxisType = YAXIS_TYPE.default;
    else this.#yAxisType = type;
    return true;
  }
  addOverlays(overlays) {
    if (!isArray(overlays) || overlays.length < 1) return false;
    const overlayList = [];
    for (let o of overlays) {
      const config = { fixed: false, required: false };
      if (o.type in this.core.indicatorClasses) {
        config.cnt = this.core.indicatorClasses[o.type].cnt;
        config.id = `${this.id}-${o.type}_${config.cnt}`;
        config.class = this.core.indicatorClasses[o.type];
        config.oType = 'indicator';
      } else if (o.type in optionalOverlays[this.type]) {
        config.cnt = 1;
        config.id = `${this.id}-${o.type}`;
        config.class = optionalOverlays[this.type][o.type].class;
        config.oType = 'overlayOptional';
      } else if (o.type in this.core.customOverlays[this.type]) {
        config.cnt = 1;
        config.id = `${this.id}-${o.type}`;
        config.class = this.core.customOverlays[this.type][o.type].class;
        config.oType = 'overlayCustom';
      } else continue;
      config.params = { overlay: o };
      o.id = config.id;
      o.paneID = this.id;
      o.key = indicatorHashKey(o);
      overlayList.push([o.id, config]);
    }
    this.graph.addOverlays(overlayList);
    return true;
  }
  addIndicator(i) {
    const primaryPane = this.type === 'primaryPane';
    const indClass = this.core.indicatorClasses[i.type];
    const isPrimary = !!i.settings?.isPrimary;
    if (i?.type in this.core.indicatorClasses && primaryPane === isPrimary) {
      i.paneID = this.id;
      i.key = indicatorHashKey(i);
      const config = {
        class: indClass,
        params: {
          overlay: i
        }
      };
      try {
        return this.graph.addOverlay(i.name, config);
      } catch (e) {
        this.core.error(
          `ERROR: Chart Pane: ${this.id} cannot add Indicator: ${i?.name} Error: ${e.message}`
        );
        return undefined;
      }
    } else return undefined;
  }
  isDuplicate(key) {
    let ind = this.findIndicatorByKey(key);
    if (!ind) return false;
    else return ind.id;
  }
  findIndicatorByKey(key) {
    let iList = Object.values(this.getIndicators());
    for (let i of iList) {
      if ((i.key = key)) return i;
    }
    return undefined;
  }
  getIndicators() {
    const indicators = Object.keys(this.core.indicatorClasses);
    const ind = {};
    for (let [key, value] of Object.entries(this.overlays)) {
      if (indicators.includes(value.params?.overlay?.type)) {
        let id = value.id || value.instance.id;
        ind[id] = value;
      }
    }
    return ind;
  }
  removeIndicator(id, state = true) {
    if (!isString(id) || !(id in this.indicators)) return false;
    this.#indicatorDeleteList[id] = true;
    if (Object.keys(this.indicators).length === 0 && !this.isPrimary)
      this.emit('chart_paneDestroy', this.id);
    else {
      this.indicators[id].instance.destroy(state);
      this.graph.removeOverlay(id);
      this.draw();
      delete this.#indicatorDeleteList[id];
    }
    return true;
  }
  removeAllIndicators(state) {
    const result = {};
    const all = this.getIndicators();
    for (let id in all) {
      result[id] = this.removeIndicator(id, state);
    }
    return result;
  }
  indicatorVisible(id, v) {
    if (!isString(id) || !(id in this.indicators)) return false;
    return this.indicators[id].instance.visible(v);
  }
  indicatorSettings(id, s) {
    if (!isString(id) || !(id in this.indicators)) return false;
    return this.indicators[id].instance.settings(s);
  }
  addTool(tool) {
    let { layerConfig } = this.layerConfig();
    let layer = new CEL.Layer(layerConfig);
    this.#layersTools.set(tool.id, layer);
    this.#viewport.addLayer(layer);
    tool.layerTool = layer;
    this.#overlayTools.set(tool.id, tool);
  }
  addTools(tools) {}
  overlayToolAdd(tool) {
    this.#overlayTools.set(tool.id, tool);
  }
  overlayToolDelete(tool) {
    this.#overlayTools.delete(tool);
  }
  refresh() {
    this.emit('chart_paneRefresh', this);
    this.scale.draw();
    this.draw(undefined, this.isPrimary);
  }
  legendsVisibility(v) {
    this.legend.setCollapse(v);
  }
  updateLegends(pos = this.#cursorPos, candle = false) {
    if (this.core.IDEmpty || !isObject(this.#Legends)) return;
    for (const legend in this.#Legends.list) {
      this.#Legends.update(legend, { pos, candle });
    }
  }
  legendInputs() {
    const labels = [true, true, true, true, true];
    const pos = this.cursorPos;
    const idx = this.time.xPos2Index(pos[0] - this.core.scrollPos);
    const index = limit(idx, 0, this.range.data.length - 1);
    const ohlcv = this.range.data[index];
    const theme = this.theme.candle;
    const inputs = {};
    const keys = ['T', 'O', 'H', 'L', 'C', 'V'];
    let colours = [];
    if (isArray(ohlcv)) {
      colours =
        ohlcv[4] >= ohlcv[1]
          ? new Array(5).fill(theme.UpWickColour)
          : new Array(5).fill(theme.DnWickColour);
      for (let i = 1; i < 6; i++) {
        inputs[keys[i]] = this.scale.nicePrice(ohlcv[i]);
      }
    }
    return { inputs, colours, labels };
  }
  onLegendAction(e) {
    const action = this.#Legends.onPointerClick(e.currentTarget);
    switch (action.icon) {
      case 'up':
        this.reorderUp();
        return;
      case 'down':
        this.reorderDown();
        return;
      case 'maximize':
        this.core.MainPane.chartPaneMaximize(this);
        return;
      case 'restore':
        this.core.MainPane.chartPaneMaximize(this);
        return;
      case 'collapse':
        this.core.MainPane.chartPaneCollapse(this);
        return;
      case 'expand':
        this.core.MainPane.chartPaneCollapse(this);
        return;
      case 'remove':
        this.remove();
        return;
      case 'config':
        this.configDialogue();
        return;
      default:
        return;
    }
  }
  reorderUp() {
    const {
      el,
      prevEl,
      parentEl,
      scaleEl,
      prevScaleEl,
      parentScaleEl,
      prevPane
    } = { ...this.currPrevNext() };
    if (!isObject(prevEl) || !isObject(prevScaleEl)) return false;
    parentEl.insertBefore(el, prevEl);
    parentScaleEl.insertBefore(scaleEl, prevScaleEl);
    this.Divider.setPos();
    if (prevPane !== null) {
      prevPane.Divider.setPos();
      prevPane.Divider.show();
      this.core.ChartPanes.swapKeys(this.id, prevEl.id);
    }
    if (el.previousElementSibling === null) this.Divider.hide();
    return true;
  }
  reorderDown() {
    const {
      el,
      nextEl,
      parentEl,
      scaleEl,
      nextScaleEl,
      parentScaleEl,
      nextPane
    } = { ...this.currPrevNext() };
    if (!isObject(nextEl) || !isObject(nextScaleEl)) return false;
    parentEl.insertBefore(nextEl, el);
    parentScaleEl.insertBefore(nextScaleEl, scaleEl);
    this.Divider.setPos();
    if (nextPane !== null) {
      nextPane.Divider.setPos();
      this.Divider.show();
      this.core.ChartPanes.swapKeys(this.id, nextEl.id);
    }
    if (nextEl.previousElementSibling === null) nextPane.Divider.hide();
    return true;
  }
  createGraph() {
    let overlays = copyDeep(this.overlaysDefault);
    this.graph = new Graph(this, this.elViewport, overlays, false);
    if (this.isPrimary) {
      this.layerStream = this.graph.overlays.get('stream')?.layer;
      this.chartStreamCandle = this.graph.overlays.get('stream')?.instance;
    }
    this.addOverlays(this.view);
  }
  render() {
    this.graph.render();
    this.#Scale.render();
  }
  draw(range = this.range, update = false) {
    this.graph.draw(range, update);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.core.scrollPos, 0);
    this.overlayGrid.setRefresh();
    this.overlayGrid.draw('y');
    this.core.MainPane.draw();
  }
  resize(height) {
    const active = this;
    const prev = this.sibling();
    if (prev === null) return { active: null, prev: null };
    let activeHeight = this.element.clientHeight;
    const rowMinH = this.core.MainPane.rowMinH;
    const prevHeight = prev.element.clientHeight;
    const total = activeHeight + prevHeight;
    let yDelta, activeH, prevH;
    if (isNumber(height) && height > rowMinH) {
      activeH = height;
    } else {
      yDelta = this.core.MainPane.cursorPos[5];
      activeH = activeHeight - yDelta;
      activeH = limit(activeH, rowMinH, total - rowMinH);
      prevH = total - activeH;
    }
    active.setDimensions({ w: undefined, h: activeH });
    prev.setDimensions({ w: undefined, h: prevH });
    active.Divider.setPos();
    active.element.style.userSelect = 'none';
    prev.element.style.userSelect = 'none';
    return { active, prev };
  }
  collapse(h) {
    const vis = this.graph.viewport.scene.canvas.style;
    const col = this.#collapsed;
    const scale = this.#Scale.graph.viewport.scene.canvas.style;
    if (col.state) {
      this.setDimensions({ w: undefined, h });
      scale.visibility = 'visible';
      vis.display = 'block';
      col.state = false;
    } else {
      scale.visibility = 'hidden';
      vis.display = 'none';
      col.state = true;
      col.height = this.element.clientHeight;
      col.rowsHeight = this.core.MainPane.rowsH;
      col.rowsCnt = this.core.ChartPanes.size;
      this.setDimensions({ W: undefined, h: COLLAPSEDHEIGHT });
    }
  }
  zoomRange() {
    this.draw(this.range, true);
    this.emit('chart_zoomDone', true);
  }
  time2XPos(time) {
    return this.time.xPos(time);
  }
  price2YPos(price) {
    return this.scale.yPos(price);
  }
  currPrevNext() {
    const el = this.element;
    const prevEl = el.previousElementSibling;
    const nextEl = el.nextElementSibling;
    const parentEl = el.parentNode;
    const scaleEl = this.scale.element;
    const prevScaleEl = scaleEl.previousElementSibling;
    const nextScaleEl = scaleEl.nextElementSibling;
    const parentScaleEl = scaleEl.parentNode;
    const prevPane =
      prevEl !== null ? this.core.ChartPanes.get(prevEl.id) : null;
    const nextPane =
      nextEl !== null ? this.core.ChartPanes.get(nextEl.id) : null;
    return {
      el,
      prevEl,
      nextEl,
      parentEl,
      scaleEl,
      prevScaleEl,
      nextScaleEl,
      parentScaleEl,
      prevPane,
      nextPane
    };
  }
  sibling(s) {
    s = ['prev', 'next'].includes(s) ? s : 'prev';
    let chartPanes = [...this.core.ChartPanes.keys()];
    let i = chartPanes.indexOf(this.id);
    if (s == 'prev') --i;
    else ++i;
    return this.core.ChartPanes.get(chartPanes[i]) || null;
  }
  configDialogue() {
    const cd = this.#ConfigDialogue;
    if (cd.state.name === 'closed') cd.open();
  }
}

var stateMachineConfig$2 = {
  id: 'main',
  initial: 'idle',
  context: {},
  states: {
    idle: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        chart_paneMaximize: {
          target: 'chart_paneMaximize',
          action(data) {}
        },
        chart_pan: {
          target: 'chart_pan',
          action(data) {}
        },
        chart_scrollTo: {
          target: 'chart_scrollTo',
          action(data) {}
        },
        range_set: {
          target: 'range_set',
          action(data) {}
        },
        chart_IndicatorAdd: {
          target: 'chart_IndicatorAdd',
          action(data) {}
        },
        divider_pointerDrag: {
          target: 'divider_pointerDrag',
          action(data) {
            this.context.currCursor = this.context.origin.cursor;
            this.context.origin.cursor = 'row-resize';
          }
        },
        global_resize: {
          target: 'global_resize',
          action(data) {}
        }
      }
    },
    chart_paneMaximize: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        always: {
          target: 'idle',
          action(data) {
            this.context.maximize = 'some pane pointer';
          }
        }
      }
    },
    chart_pan: {
      onEnter(data) {
        this.context.origin.cursor = 'grab';
      },
      onExit(data) {},
      on: {
        chart_pan: {
          target: 'chart_pan',
          action(data) {
            this.context.origin.updateRange(data);
            this.context.origin.cursor = 'grab';
          }
        },
        chart_panDone: {
          target: 'idle',
          action(data) {
            this.context.origin.updateRange(data);
            this.context.origin.cursor = 'default';
          }
        }
      }
    },
    range_set: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action(data) {
            this.context.origin.zoomRange(data);
          }
        }
      }
    },
    chart_scrollTo: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        always: {
          target: 'idle',
          action(data) {
            this.context.origin.updateRange(data);
          }
        }
      }
    },
    chart_IndicatorAdd: {
      onEnter(data) {
        this.context.origin.addIndicator(data);
      },
      onExit(data) {},
      on: {
        chart_IndicatorAddDone: {
          target: 'idle',
          action(data) {}
        }
      }
    },
    divider_pointerDrag: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        divider_pointerDrag: {
          target: 'divider_pointerDrag',
          action(data) {}
        },
        divider_pointerDragEnd: {
          target: 'idle',
          action(data) {
            this.context.origin.cursor = this.context.currCursor;
          }
        }
      }
    },
    global_resize: {
      onEnter(data) {
        this.context.origin.setDimensions();
      },
      onExit(data) {},
      on: {
        always: {
          target: 'idle',
          condition: 'resizeDone',
          action(data) {}
        }
      }
    }
  },
  guards: {
    zoomDone() {
      return true;
    },
    resizeDone() {
      return true;
    }
  },
  actions: {
    removeProperty() {
      let active = this.context.pair.active,
        prev = this.context.pair.prev;
      if (isObject(active)) active.element.style.removeProperty('user-select');
      if (isObject(prev)) prev.element.style.removeProperty('user-select');
    }
  }
};

const defaultOverlays = [
  [
    'grid',
    { class: chartGrid, fixed: false, required: true, params: { axes: 'x' } }
  ]
];
const nonIndicators = ['candles', 'trades', 'events'];
class MainPane extends Component {
  #name = 'MainPane';
  #shortName = 'Main';
  #destruction = false;
  #elMain;
  #elRows;
  #elTime;
  #elScale;
  #elGrid;
  #elCanvas;
  #elViewport;
  #Graph;
  #layerGrid;
  #layerWatermark;
  #Chart;
  #Time;
  #chartGrid;
  #chartDeleteList = {};
  #viewDefaultH = SECONDARYDEFAULTHEIGHT;
  #rowMinH = ROWMINHEIGHT;
  #position = {};
  #cursorPos = [0, 0];
  #drag = {
    active: false,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #buffer;
  #controller;
  #input;
  #scaleW = 0;
  #scaleWOld = 0;
  constructor(core, options) {
    options.parent = core;
    super(core, options);
    this.init(options);
  }
  get name() {
    return this.#name;
  }
  get shortName() {
    return this.#shortName;
  }
  get chart() {
    return this.#Chart;
  }
  get chartPanes() {
    return this.core.state.chartPanes;
  }
  get chartPaneMaximized() {
    return this.core.state.chartPaneMaximized;
  }
  get chartDeleteList() {
    return this.#chartDeleteList;
  }
  get time() {
    return this.#Time;
  }
  get element() {
    return this.#elMain;
  }
  get elRows() {
    return this.#elMain.rows;
  }
  get elPrimary() {
    return this.#elMain.rows.primary;
  }
  get elSecondary() {
    return this.#elMain.rows.secondary;
  }
  get elPanes() {
    return this.#elMain.rows.chartPanes;
  }
  get elPaneSlot() {
    return this.#elMain.rows.chartPaneSlot;
  }
  get width() {
    return this.#elMain.getBoundingClientRect().width;
  }
  get height() {
    return this.#elMain.getBoundingClientRect().height;
  }
  get chartW() {
    return this.elPrimary.getBoundingClientRect().width;
  }
  get chartH() {
    return this.elPrimary.getBoundingClientRect().height;
  }
  get rowsW() {
    return this.#elRows.getBoundingClientRect().width;
  }
  get rowsH() {
    return this.#elRows.getBoundingClientRect().height;
  }
  get rowMinH() {
    return this.#rowMinH;
  }
  set rowMinH(h) {
    if (isNumber(h)) this.#rowMinH = Math.abs(h);
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return elementDimPos(this.#elMain);
  }
  set cursor(c) {
    this.element.style.cursor = c;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#cursorPos;
  }
  get candleW() {
    return this.#Time.candleW;
  }
  get buffer() {
    return this.#buffer;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.core.scrollPos;
  }
  get renderLoop() {
    return renderLoop;
  }
  get inventory() {
    return this.core.state.data.inventory;
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorClasses() {
    return this.core.indicatorClasses;
  }
  get elements() {
    return {
      elRows: this.elRows,
      elPrimary: this.elPrimary,
      elSecondary: this.elSecondary,
      elTime: this.#elTime,
      elScale: this.#elScale
    };
  }
  init(options) {
    this.core;
    this.#elMain = this.core.elMain;
    this.#elRows = this.#elMain.rows;
    this.#elTime = this.#elMain.time;
    this.#elGrid = this.#elMain.rows.grid;
    this.#elViewport = this.#elMain.viewport;
    this.#elScale = this.core.elBody.scale;
    options.name = 'Chart';
    options.shortName = 'Chart';
    options.parent = this;
    options.rangeLimit = this.core.rangeLimit;
    options.settings = this.core.settings;
    options.elements = { ...options.elements, ...this.elements };
    if (this.core.theme?.time?.navigation === false) {
      const timeHeight = { height: TIMESCALEH };
      this.core.theme.time = { ...this.core.theme?.time, ...timeHeight };
    }
    this.#Time = new Timeline(this.core, options);
    this.chartPanes.clear();
    this.chartPanesRegister(options);
    this.#buffer = isNumber(this.config.buffer)
      ? this.config.buffer
      : BUFFERSIZE;
    this.#rowMinH = isNumber(this.config.rowMinH)
      ? this.config.rowMinH
      : ROWMINHEIGHT;
    this.#viewDefaultH = isNumber(this.config.secondaryPaneDefaultH)
      ? this.config.secondaryPaneDefaultH
      : SECONDARYDEFAULTHEIGHT;
    this.rowsOldH = this.rowsH;
  }
  start() {
    this.#elMain.start(this.theme);
    this.#Time.start();
    this.createGraph();
    this.rowsOldH = this.rowsH;
    this.chartPanesStart();
    this.chartPanesSizeToInventory();
    this.setScaleWidth();
    this.draw(this.range, true);
    this.renderLoop.init({
      graphs: [this.graph],
      range: this.range
    });
    this.renderLoop.start();
    this.renderLoop.queueFrame(this.range, [this.graph], false);
    this.eventsListen();
    stateMachineConfig$2.id = this.id;
    stateMachineConfig$2.context = this;
    this.stateMachine = stateMachineConfig$2;
    this.stateMachine.start();
    this.log(`Main Pane ${this.#name} instantiated and running`);
  }
  destroy(indicators = true) {
    this.#destruction = true;
    this.renderLoop.stop();
    this.stateMachine.destroy();
    this.chartPanes.forEach((chartPane, key) => {
      if (!!indicators) chartPane.remove();
      else chartPane.deactivate();
      delete this.#chartDeleteList[key];
    });
    this.graph.destroy();
    this.time.destroy();
    this.core.hub.expunge(this);
    this.#input.destroy();
    this.stateMachine = null;
    this.graph = null;
  }
  reset() {
    let indicators = this.core.Indicators;
    for (let p in indicators) {
      for (let i in indicators[p]) {
        this.core.removeIndicator(i);
      }
    }
    return;
  }
  removeAllRowElements() {
    this.#elMain.rows.shadowRoot = '';
    this.#elScale.shadowRoot = '';
  }
  eventsListen() {
    this.#input = new Input(this.#elRows, { disableContextMenu: false });
    this.#input.on('keydown', this.onChartKeyDown.bind(this));
    this.#input.on('keyup', this.onChartKeyUp.bind(this));
    this.#input.on('wheel', this.onMouseWheel.bind(this));
    this.#input.on('pointerenter', this.onMouseEnter.bind(this));
    this.#input.on('pointerout', this.onMouseOut.bind(this));
    this.#input.on('pointerup', this.onChartDragDone.bind(this));
    this.#input.on('pointermove', this.onMouseMove.bind(this));
    this.on(STREAM_FIRSTVALUE, this.onFirstStreamValue, this);
    this.on(STREAM_NEWVALUE, this.onNewStreamValue, this);
    this.on('range_set', this.onSetRange, this);
    this.on('chart_scrollUpdate', this.draw, this);
    this.on('chart_render', this.draw, this);
    this.on('chart_paneDestroy', this.chartPaneRemove, this);
  }
  onSetRange() {
    this.#scaleWOld = this.#scaleW;
    this.#scaleW = this.chart.scale.calcScaleWidth();
    if (this.#scaleWOld != this.#scaleW) {
      this.core.elBody.setYAxisWidth(this.#scaleW);
      this.setDimensions();
      this.draw();
    }
  }
  onMouseWheel(e) {
    const direction = Math.sign(e.wheeldelta) * -1;
    e.domEvent.preventDefault();
    if (this.core.pointerButtons[0]) {
      e.dragstart.x = this.#cursorPos[0];
      e.dragstart.y = this.#cursorPos[1];
      e.position.x = this.#cursorPos[0] + direction;
      e.position.y = this.#cursorPos[1];
      this.onChartDrag(e);
      return;
    }
    const range = this.range;
    let newStart =
      range.indexStart - Math.floor(direction * XAXIS_ZOOM * range.Length);
    let newEnd =
      range.indexEnd + Math.ceil(direction * XAXIS_ZOOM * range.Length);
    if (range.isPastLimit(newStart)) newStart = range.indexPastLimit + 1;
    if (range.isFutureLimit(newEnd)) newEnd = range.indexFutureLimit - 1;
    if (
      newEnd - newStart > range.maxCandles ||
      newEnd - newStart < range.minCandles
    )
      return;
    this.core.setRange(newStart, newEnd);
    this.draw(this.range, true);
  }
  onMouseMove(e) {
    const p = this.#position;
    p.d2x = p?.d1x || null;
    p.d2y = p?.d1y || null;
    p.d1x = e.movement.x;
    p.d1y = e.movement.y;
    p.dx = Math.floor((p.d1x + p.d2x) / 2);
    p.dy = Math.floor((p.d1y + p.d2y) / 2);
    p.ts2 = p?.ts1 || null;
    p.ts1 = Date.now();
    this.#cursorPos = [
      e.position.x,
      e.position.y,
      e.dragstart.x,
      e.dragstart.y,
      p.dx,
      p.dy,
      p.ts1,
      p.ts1 - p.ts2
    ];
    this.core.Timeline.showCursorTime();
    this.core.Chart.graph.overlays.list.get('cursor').layer.visible = true;
    for (let [key, secondaryPane] of this.chartPanes) {
      secondaryPane.graph.overlays.list.get('cursor').layer.visible = true;
    }
    this.emit('main_mouseMove', this.#cursorPos);
  }
  onMouseEnter(e) {
    this.core.Timeline.showCursorTime();
    this.core.Chart.graph.overlays.list.get('cursor').layer.visible = true;
    this.core.Chart.graph.render();
    for (let [key, secondaryPane] of this.chartPanes) {
      secondaryPane.graph.overlays.list.get('cursor').layer.visible = true;
      secondaryPane.graph.render();
    }
  }
  onMouseOut(e) {
    this.onPointerActive(false);
    this.core.Timeline.hideCursorTime();
    this.core.Chart.graph.overlays.list.get('cursor').layer.visible = false;
    this.core.Chart.graph.render();
    for (let [key, secondaryPane] of this.chartPanes) {
      secondaryPane.graph.overlays.list.get('cursor').layer.visible = false;
      secondaryPane.graph.render();
    }
    this.draw();
  }
  onChartDrag(e) {
    const d = this.#drag;
    if (!d.active) {
      d.active = true;
      d.start = [e.position.x, e.position.y];
      d.prev = d.start;
      d.delta = [0, 0];
    } else {
      d.delta = [e.position.x - d.prev[0], e.position.y - d.prev[1]];
      d.prev = [e.position.x, e.position.y];
    }
    this.#cursorPos = [e.position.x, e.position.y, ...d.start, ...d.delta];
    this.emit('chart_pan', this.#cursorPos);
  }
  onChartDragDone(e) {
    const d = this.#drag;
    d.active = false;
    d.delta = [0, 0];
    this.#cursorPos = [...d.prev, ...d.start, ...d.delta];
    this.emit('chart_panDone', this.#cursorPos);
  }
  onChartKeyDown(e) {
    let step = this.candleW > 1 ? this.candleW : 1;
    switch (e.key) {
      case 'ArrowLeft':
        this.emit('chart_pan', [0, null, step, null, step * -1, null]);
        break;
      case 'ArrowRight':
        this.emit('chart_pan', [step, null, 0, null, step, null]);
        break;
      case 'ArrowUp':
        e.wheeldelta = -1;
        e.domEvent = e.srcEvent;
        this.onMouseWheel(e);
        break;
      case 'ArrowDown':
        e.wheeldelta = 1;
        e.domEvent = e.srcEvent;
        this.onMouseWheel(e);
        break;
    }
  }
  onChartKeyUp(e) {
    let step = this.candleW > 1 ? this.candleW : 1;
    switch (e.key) {
      case 'ArrowLeft':
        this.emit('chart_panDone', [0, null, step, null, step * -1, null]);
        break;
      case 'ArrowRight':
        this.emit('chart_panDone', [step, null, 0, null, step, null]);
        break;
    }
  }
  onFirstStreamValue(value) {
    this.chart.scale.xAxis.calcXAxisGrads(this.range);
    this.draw(this.range, true);
  }
  onNewStreamValue(value) {}
  onPointerActive(chart) {
    if (chart) {
      chart.cursorActive = true;
      chart.scale.layerCursor.visible = true;
    }
    if (chart !== this.chart) {
      this.chart.cursorActive = false;
      this.chart.scale.layerCursor.visible = false;
      this.chart.scale.layerCursor.erase();
    }
    this.chartPanes.forEach((secondaryPane, key) => {
      if (chart !== secondaryPane) {
        secondaryPane.cursorActive = false;
        secondaryPane.scale.layerCursor.visible = false;
        secondaryPane.scale.layerCursor.erase();
      }
    });
  }
  setDimensions() {
    this.#elRows.previousDimensions();
    let siblings = this.core.elBody.shadowRoot.children;
    let width = this.core.elBody.offsetWidth;
    for (let s of siblings) {
      if (s.tagName != 'TRADEX-MAIN') width -= s?.offsetWidth || 0;
    }
    let resizeH = this.#elRows.heightDeltaR;
    let chartH = Math.round(this.chartH * resizeH);
    let height = this.rowsH;
    let layerWidth = Math.round(width * ((100 + this.#buffer) * 0.01));
    let dimensions = {
      resizeH: resizeH,
      mainH: this.element.height,
      mainW: width,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.core.scrollPos = -1;
    this.#elViewport.style.width = `${width}px`;
    this.#elViewport.style.height = `${height}px`;
    this.#Time.setDimensions({ w: width });
    this.graph.setSize(width, height, layerWidth);
    this.#elViewport.style.width = `${width}px`;
    if (this.chartPanes.size == 1 && chartH != this.#elRows.height) {
      this.#Chart.setDimensions({ w: width, h: this.#elRows.height });
    } else {
      this.chartPanes.forEach((chartPane, key) => {
        chartH = Math.round(chartPane.element.height * resizeH);
        chartPane.setDimensions({ w: width, h: chartH });
      });
    }
    this.rowsOldH = this.rowsH;
    this.emit('chart_rowsResize', dimensions);
    this.draw(undefined, true);
  }
  setScaleWidth(draw = false) {
    const { expanded: exp } = this.chartPanesState();
    let scaleW = 0;
    if (this.chartPanes.size === 1) {
      scaleW = this.chartPanes.values().next().value.scale.calcScaleWidth();
    } else {
      for (let o of exp) {
        let w = o.scale.calcScaleWidth();
        scaleW = w > scaleW ? w : scaleW;
      }
    }
    this.core.elBody.setYAxisWidth(scaleW);
  }
  getBufferPx() {
    let w = Math.round((this.width * this.buffer) / 100);
    let r = w % this.candleW;
    return w - r;
  }
  chartPanesRegister(options) {
    this.#elRows.previousDimensions();
    this.validateIndicators();
    for (let p of this.inventory) {
      if (isArray(p) && p.length > 1) {
        options.type = p[0] == 'primary' ? p[0] : 'secondary';
        options.view = isArrayOfType(p[1], 'object') ? p[1] : [p[1]];
        options.state = p[2];
        this.chartPaneAdd(options);
      }
    }
  }
  chartPanesSizeToInventory() {
    if (!this.chartPanes.size || !isObject(this.#Chart.options?.state)) return;
    const heights = {};
    let collapsed = false;
    let total = 0;
    let h, colRowsH;
    this.chartPanes.forEach((pane, key) => {
      let state = pane.options.state;
      h = state.height;
      state.collapsed.height;
      heights[key] = h;
      total += h;
      collapsed = collapsed || state.collapsed.height;
      if (isNumber(state.collapsed.rowsHeight)) {
        colRowsH = state.collapsed.rowsHeight;
        state.collapsed.rowsCnt;
      }
    });
    if (!collapsed) return;
    if (colRowsH != this.rowsH) {
      console.log('total does not match Row Height');
      this.rowsH - total;
    }
    this.chartPanes.forEach((pane, key) => {
      pane.setDimensions({ h: heights[key] });
    });
    this.chartPanes.forEach((pane, key) => {
      if (!!pane.options?.state?.collapsed?.state) {
        this.chartPaneCollapse(pane);
      }
      if (!!pane.options?.state?.maximized) {
        this.chartPaneMaximize(pane);
      }
    });
  }
  chartPanesStart() {
    let i = 0;
    this.chartPanes.forEach((pane, key) => {
      pane.start(i++);
      if (i === 1) {
        pane.Divider.hide();
      }
    });
  }
  chartPanesState() {
    const state = {
      list: [...this.chartPanes.values()],
      collapsed: [],
      expanded: [],
      maximized: this.chartPaneMaximized?.instance
    };
    for (let o of state.list) {
      if (o.collapsed.state) state.collapsed.push(o);
      else state.expanded.push(o);
    }
    return state;
  }
  chartPaneAdd(params) {
    const { expanded: exp } = this.chartPanesState();
    const heights = this.chartPaneHeightsCalc(params?.state);
    const n = heights.new;
    let h;
    for (h in heights) {
      if (this.chartPanes.has(h)) {
        let o = this.chartPanes.get(h);
        if (exp.indexOf(o) > -1)
          o.setDimensions({ w: this.rowsW, h: heights[h] });
      }
    }
    let row = this.#elMain.addRow(params.type, '', this.core, n);
    let axis = this.#elMain.addScaleRow(params.type, n, this.#elScale);
    params.elements.elTarget = row;
    params.elements.elScale = axis;
    let o;
    if (params.type == 'primary') {
      o = new Chart(this.core, params);
      this.#Chart = o;
    } else {
      params.type = 'secondary';
      params.name = params.view?.[0].name || 'Secondary';
      params.shortName = params.view?.[0].type || 'Secondary';
      o = new Chart(this.core, params);
    }
    this.chartPanes.set(o.id, o);
    const tally = this.chartPaneHeightsTally();
    if (tally.total > this.#elMain.height);
    this.chartPaneDividersSet();
    this.emit('chart_paneAdd', o);
    return o;
  }
  chartPaneRemove(paneID) {
    if (
      !isString(paneID) ||
      !this.chartPanes.has(paneID) ||
      paneID in this.#chartDeleteList
    )
      return false;
    const chartPane = this.chartPanes.get(paneID);
    if (chartPane.isPrimary && !this.#destruction) {
      this.core.error(`Cannot remove primary chart pane! ${paneID}`);
      return false;
    }
    this.#chartDeleteList[paneID] = true;
    const { expanded: exp } = this.chartPanesState();
    let i = exp.indexOf(chartPane);
    if (i > -1) exp.splice(i, 1);
    let h = chartPane.viewport.height;
    let x = Math.floor(h / exp.length);
    let r = h % x;
    if (chartPane.status !== 'destroyed') {
      chartPane.destroy();
      this.#elMain.removeRow(chartPane.id);
    }
    this.chartPanes.delete(paneID);
    this.setScaleWidth();
    if (this.chartPanes.size === 1) {
      let o = this.chartPanes.values().next().value;
      if (o.collapsed) o.collapsed.state = false;
      o.setDimensions({ w: undefined, h: this.rowsH });
    } else {
      for (let o of exp) {
        h = o.viewport.height;
        o.setDimensions({ w: undefined, h: h + x + r });
        r = 0;
      }
    }
    this.chartPaneDividersSet();
    this.draw(this.range, true);
    return true;
  }
  chartPaneRemoveRows() {}
  chartPaneHeightsTally() {
    const panes = this.chartPanes.entries();
    const heights = { panes: {}, total: 0 };
    for (let [key, value] of panes) {
      heights.panes[key] = value;
      heights.total += value.height;
    }
    return heights;
  }
  chartPaneHeightsCalc(newPane) {
    const { collapsed: col, expanded: exp } = this.chartPanesState();
    const cnt = this.chartPanes.size + 1;
    const a = this.#viewDefaultH * (cnt - 1),
      ratio = a / Math.log10(a * 2) / 100;
    Math.round(this.rowsH * ratio);
    const sizes = {};
    if (cnt === 1) {
      sizes.new = this.rowsH;
    } else if (cnt === 2 || exp.length === 1) {
      let height = this.rowsH;
      const newPane = Math.round((height * this.#viewDefaultH) / 100);
      sizes[exp[0].id] = height - newPane;
      sizes.new = newPane;
    } else if (exp.length === 2) {
      const first = exp[0].viewport.height;
      const second = exp[1].viewport.height;
      const height = first + second;
      const newPane = Math.round((height * this.#viewDefaultH) / 100);
      const ratio = height / (height + newPane);
      sizes[exp[0].id] = Math.floor(first * ratio);
      sizes[exp[1].id] = Math.floor(second * ratio);
      sizes.new = Math.floor(newPane * ratio);
      sizes.new += height - (sizes[exp[0].id] + sizes[exp[1].id] + sizes.new);
    } else if (exp.length >= 3) {
      let height = this.rowsH;
      let total = 0;
      let diff;
      for (let o of col) {
        height -= o.viewport.height;
      }
      sizes.new = Math.floor(height / (exp.length + 1));
      height / (height + sizes.new);
      diff = height - sizes.new;
      for (let o of exp) {
        sizes[o.id] = diff * (o.viewport.height / height);
        total += sizes[o.id];
      }
      sizes.new += height - total;
    }
    return sizes;
  }
  chartPaneMaximize(p) {
    if (!(p instanceof Chart)) return false;
    const maxMin = this.chartPaneMaximized;
    const controls = p.legend.list.chart.el.querySelector('.controls');
    let style;
    controls.classList.toggle('maximized');
    controls.classList.toggle('restored');
    if (p === maxMin.instance) {
      this.chartPanesRestore();
      maxMin.instance = null;
      maxMin.panes = {};
      if (p.collapsed.state) {
        p.graph.viewport.scene.canvas.style.display = 'none';
        p.scale.graph.viewport.scene.canvas.style.visibility = 'hidden';
      }
    } else {
      this.chartPanesRestore();
      maxMin.instance = p;
      maxMin.rowsH = this.rowsH;
      for (let [k, v] of this.chartPanes.entries()) {
        maxMin.panes[k] = v.element.clientHeight;
        style = v.element.style;
        if (p === v) {
          style.display = 'block';
          v.setDimensions({ w: undefined, h: this.rowsH });
          v.graph.viewport.scene.canvas.style.display = 'block';
          v.scale.graph.viewport.scene.canvas.style.visibility = 'visible';
        } else {
          style.display = 'none';
          v.scale.element.style.display = 'none';
        }
      }
      this.chartPaneDividersHide();
    }
    this.emit('chart_paneRefresh', this);
    return true;
  }
  chartPanesRestore() {
    const maxMin = this.chartPaneMaximized;
    let i = 0;
    this.emit('chart_paneRefresh', this);
    if (this.dimensions.height == maxMin.height);
    for (let [k, v] of this.chartPanes.entries()) {
      v.element.style.display = 'block';
      v.scale.element.style.display = 'block';
      if (k in maxMin.panes) if (i++ > 0) v.Divider.show();
      v.setDimensions({ w: undefined, h: maxMin.panes[k] });
    }
  }
  chartPaneCollapse(p) {
    if (!(p instanceof Chart)) return false;
    this.emit('chart_paneRefresh', this);
    const controls = p.legend.list.chart.el.querySelector('.controls');
    const pc = p.collapsed;
    let h = p.element.clientHeight;
    let i, j, n;
    const { list: v, collapsed: col, expanded: exp } = this.chartPanesState();
    i = col.indexOf(p);
    if (i > -1) col.splice(i, 1);
    i = exp.indexOf(p);
    if (i > -1) exp.splice(i, 1);
    if (p.collapsed.state) {
      controls.classList.remove('collapsed');
      controls.classList.add('expanded');
      if (pc.rowsCnt !== v.length) {
        h = pc.height * (pc.rowsCnt / v.length);
      } else if (pc.rowsHeight !== this.rowsH) {
        h = pc.height * (pc.rowsHeight / this.rowsH);
      } else {
        h = pc.height;
      }
      j = (h - COLLAPSEDHEIGHT) / exp.length;
      for (let o of exp) {
        n = o.element.clientHeight - j;
        o.setDimensions({ w: undefined, h: n });
      }
      p.collapse(h);
    } else {
      controls.classList.add('collapsed');
      controls.classList.remove('expanded');
      if (v.length < 2) return false;
      if (exp.length < 1) return false;
      h = (p.element.clientHeight - COLLAPSEDHEIGHT) / exp.length;
      for (let o of exp) {
        n = o.element.clientHeight + h;
        o.setDimensions({ w: undefined, h: n });
      }
      p.collapse();
    }
    this.chartPaneDividersSet();
    return true;
  }
  chartPaneDividersSet() {
    const { list: v } = this.chartPanesState();
    let i = 0;
    for (let o of v) {
      if (o.Divider instanceof Divider && i++ > 0) {
        o.Divider.setWidth();
        o.Divider.setPos();
        o.Divider.show();
      }
    }
  }
  chartPaneDividersHide() {
    const { list: v } = this.chartPanesState();
    for (let o of v) {
      if (o.Divider instanceof Divider) {
        o.Divider.hide();
      }
    }
  }
  validateIndicators() {
    const isValidObj = (o) => {
      return (
        isObject(o) &&
        (o.type in this.core.indicatorClasses || nonIndicators.includes(o.type))
      );
    };
    const isValidArr = (o) => {
      if (!isArray(o)) return false;
      o.forEach((v, i) => {
        if (!isValidObj(v)) {
          this.core.log(
            `TradeX-Chart : ${this.core.id} : indicator ${v?.type} not added: not supported.`
          );
          o.splice(i, 1);
        }
      });
      return !o.length;
    };
    this.inventory.forEach((v, i) => {
      isValidArr(v[1]);
    });
  }
  addIndicator(i, name = i, params = {}) {
    let instance, pane;
    let isPrimary = this.indicatorClasses[i]?.primaryPane;
    if (!isString(i) || !(i in this.indicatorClasses) || !isString(name))
      return undefined;
    this.log(`Adding the ${name} : ${i} indicator`);
    if (!isObject(params)) params = { data: [], settings: [] };
    else {
      if (!isArray(params?.data)) params.data = [];
      if (!isObject(params?.settings)) params.settings = {};
    }
    switch (isPrimary) {
      case true:
      case false:
        break;
      case undefined:
      case 'both':
        isPrimary = isBoolean(params.settings?.isPrimary)
          ? params.settings.isPrimary
          : true;
    }
    params.settings.isPrimary = isPrimary;
    if (isPrimary) {
      const indicator = {
        type: i,
        name: name,
        ...params
      };
      instance = this.#Chart.addIndicator(indicator);
      if (!instance) return undefined;
      pane = 'primary';
    } else {
      if (!isArray(params.view)) params.view = [{ name, type: i, ...params }];
      for (let v = 0; v < params.view.length; v++) {
        if (
          !isObject(params.view[v]) ||
          !valuesInArray(['name', 'type'], Object.keys(params.view[v]))
        )
          params.view.splice(v, 1);
      }
      if (params.view.length == 0) return undefined;
      params.parent = this;
      params.title = name;
      params.elements = { ...this.elements };
      params.yAxisPadding = this.core.indicatorClasses[i]?.yAxisPadding || 1;
      instance = this.chartPaneAdd(params);
      if (!instance) return undefined;
      instance.start();
      pane = 'secondary';
      this.emit('chart_secondaryAdd', instance);
    }
    const id = 'instance' in instance ? instance.instance.id : instance.id;
    this.refresh();
    this.core.state.addIndicator(instance, pane);
    this.core.log(`Added indicator:`, id);
    this.emit('chart_IndicatorAddDone', instance);
    return instance;
  }
  getIndicators() {
    const ind = {};
    this.chartPanes.forEach((value, key) => {
      ind[key] = value.indicators;
    });
    return ind;
  }
  getIndicatorsByType(t) {
    const r = [];
    if (!isString(t)) return r;
    for (let p of this.chartPanes.values()) {
      for (let i in p.indicators) {
        let inst = p.indicators[i].instance;
        if (inst.shortName == t || inst.libName == t) r.push(inst);
      }
    }
    return r;
  }
  getIndicator(i) {
    if (!isString(i)) return false;
    for (const p of this.chartPanes.values()) {
      if (i in p.indicators) {
        return p.indicators[i].instance;
      }
    }
    return false;
  }
  removeIndicator(i) {
    if (isString(i)) {
      for (const p of this.chartPanes.values()) {
        if (i in p.indicators) {
          i = p.indicators[i].instance;
        }
      }
    }
    if (!(i instanceof Indicator)) return false;
    if (
      i.chart.type === 'primaryPane' ||
      Object.keys(i.chart.indicators).length > 1
    ) {
      i.remove();
      this.emit('chart_paneRefresh', this);
    } else i.chart.remove();
    return true;
  }
  indicatorSettings(i, s) {
    if (isString(i)) {
      for (const p of this.chartPanes.values()) {
        if (i in p.indicators) {
          return p.indicators[i].instance.settings(s);
        }
      }
    } else if (i instanceof Indicator) {
      return i.settings(s);
    } else return false;
  }
  createGraph() {
    let overlays = copyDeep(defaultOverlays);
    this.graph = new Graph(this, this.#elViewport, overlays);
  }
  draw(range = this.range, update = false) {
    range = isObject(range) ? range : this.range;
    const graphs = [this.graph, this.#Time];
    this.time.xAxis.doCalcXAxisGrads(range);
    this.chartPanes.forEach((chartPane, key) => {
      if (chartPane.status !== 'destroyed') graphs.push(chartPane);
      else
        this.error(`ERROR: attempted to draw destroyed pane: ${chartPane.id}`);
    });
    this.renderLoop.queueFrame(this.range, graphs, update);
  }
  refresh() {
    if (!(this.core.Chart?.graph instanceof Graph)) return;
    this.renderLoop.expungeFrames();
    this.core.Chart.graph.refresh();
    for (let [key, secondaryPane] of this.chartPanes) {
      secondaryPane?.graph?.refresh();
    }
    this.draw(this.range, true);
  }
  updateRange(pos) {
    this.core.updateRange(pos);
  }
  zoomRange() {
    this.draw(this.range, true);
  }
}

const HASHKEY = 'state';
const DEFAULTSTATEID = 'defaultState';
const DEFAULT_STATE = {
  version: version,
  id: DEFAULTSTATEID,
  key: '',
  status: 'default',
  isEmpty: true,
  allData: {},
  chart: {
    name: 'Primary',
    type: 'candles',
    candleType: 'CANDLE_SOLID',
    indexed: false,
    data: [],
    settings: {}
  },
  ohlcv: [],
  inventory: [],
  primary: [],
  secondary: [],
  datasets: [],
  tools: {
    display: true,
    data: {
      ts: {}
    }
  },
  trades: {
    display: true,
    displayInfo: true,
    data: {
      ts: {}
    }
  },
  events: {
    display: true,
    displayInfo: true,
    data: {
      ts: {}
    }
  },
  annotations: {
    display: true,
    displayInfo: true,
    data: {
      ts: {}
    }
  },
  range: {
    intervalStr: DEFAULT_TIMEFRAME,
    interval: DEFAULT_TIMEFRAMEMS,
    timeFrame: DEFAULT_TIMEFRAME,
    timeFrameMS: DEFAULT_TIMEFRAMEMS,
    initialCnt: INTITIALCNT
  }
};
const CONFIGENTRIES = {
  chart: 'object',
  ohlcv: 'array',
  range: 'object'
};
const TRADE = {
  timestamp: 'number',
  id: 'string',
  side: 'string',
  price: 'number',
  amount: 'number',
  filled: 'number',
  average: 'number',
  total: 'number',
  tag: 'string'
};
const EVENT = {
  timestamp: 'number',
  id: 'string',
  title: 'string',
  content: 'string',
  url: 'string'
};
const ANNOTATIONS = {
  timestamp: 'number',
  id: 'string',
  title: 'string',
  content: 'string'
};
const TOOLS = {
  timestamp: 'number',
  id: 'string',
  type: 'string',
  nodes: 'array'
};
const validator = {
  trades: TRADE,
  events: EVENT,
  annotations: ANNOTATIONS,
  tools: TOOLS
};
class State {
  static #chartList = new xMap();
  static #dss = {};
  static get default() {
    return copyDeep(DEFAULT_STATE);
  }
  static server(chart) {
    if (!isChart(chart)) return undefined;
    let states = new xMap();
    if (!State.#chartList.has(chart.key)) {
      State.#chartList.set(chart.key, { chart, states, active: undefined });
    }
  }
  static chartList(chart) {
    if (!isChart(chart)) return undefined;
    else if (State.#chartList.has(chart.key))
      return State.#chartList.get(chart.key);
    else return undefined;
  }
  static create(
    chart,
    state = State.default,
    deepValidate = false,
    isCrypto = false
  ) {
    if (!isChart(chart)) return undefined;
    state.core = chart;
    const instance = new State(state, deepValidate, isCrypto);
    const key = instance.key;
    let server = State.#chartList.get(chart.key);
    if (!server) {
      State.server(chart);
      server = State.#chartList.get(chart.key);
      server.active = instance;
    }
    server.states.set(key, instance);
    return instance;
  }
  static active(chart) {
    return State.chartList(chart)?.active;
  }
  static list(chart) {
    let states = State.chartList(chart)?.states;
    if (!states) return undefined;
    return Array.from(states, ([key, value]) => ({ key, value }));
  }
  static use(chart, state) {
    let key = State.has(chart, state)
      ? state
      : State.has(chart, state?.key)
        ? state.key
        : state;
    if (!isString(key) && isObject(state) && Object.keys(state).length > 2) {
      let hash = State.hash(state);
      key = `${SHORTNAME}_${HASHKEY}_${hash}`;
      if (!State.has(chart, key)) {
        key = State.create(chart, state).key;
      }
    } else if (!isString(key) && !isObject(state)) return undefined;
    const states = State.#chartList.get(chart.key);
    states.active;
    let active = states.active;
    let target = states.states.get(key);
    if (!target) {
      chart.log(`${chart.name} id: ${chart.key} : State ${key} does not exist`);
      return undefined;
    }
    if (key != active?.key) {
      states.previous = { state: active, node: '' };
      active = target;
      if (isObject(active?.archive)) {
        let archive = isString(active?.archive?.data)
          ? active?.archive.data
          : '';
        let data = !!active.archive?.compress ? archive.decompress() : archive;
        let oldState = JSON.parse(data);
        delete active.archive;
        const defaultState = doStructuredClone(State.default);
        State.parseChartPanesInventory(oldState, defaultState);
        active.allData.primaryPane = oldState.primary;
        active.allData.secondaryPane = oldState.secondary;
        active.data.inventory = oldState.inventory;
      }
    }
    states.active = active;
    return active;
  }
  static archive(chart, id) {
    let state = State.findStateById(chart, id);
    if (!state) return false;
  }
  static findStateById(chart, id) {
    let states = State.chartList(chart)?.states;
    if (!states) return undefined;
    for (let s of states) {
      if (s[1].id == id) return s[1].key;
    }
    return undefined;
  }
  static hash(input) {
    let str = JSON.stringify(input);
    return cyrb53(str);
  }
  static isValidConfig(config) {
    if (!isObject(config) || !Object.keys(config).length) return false;
    else {
      for (let [key, type] of Object.entries(CONFIGENTRIES)) {
        if (typeOf(config?.[key]) === type) return true;
      }
    }
    return false;
  }
  static validate(
    instance,
    source = State.default,
    deepValidate = false,
    isCrypto = false
  ) {
    const defaultState = doStructuredClone(State.default);
    let state;
    if (!isObject(source)) source = defaultState;
    if (!(source.core instanceof TradeXchart))
      throw new Error(`State : invalid TradeXchart instance`);
    if (!isObject(source.chart)) {
      source.chart = defaultState.chart;
      source.chart.data = isArray(source?.ohlcv) ? source.ohlcv : [];
      source.isEmpty = true;
      source.status = 'default';
      delete source?.ohlcv;
    }
    state = mergeDeep(defaultState, source);
    if (deepValidate)
      state.chart.data = validateDeep(state.chart.data, isCrypto)
        ? state.chart.data
        : [];
    else
      state.chart.data = validateShallow(state.chart.data, isCrypto)
        ? state.chart.data
        : [];
    state.chart.isEmpty = state.chart.data.length == 0 ? true : false;
    Object.defineProperty(state.allData, 'data', {
      get: function () {
        return state.chart.data;
      }
    });
    if (!isObject(state.chart.settings)) {
      state.chart.settings = defaultState.chart.settings;
    }
    if (!isArray(state.inventory)) {
      state.inventory = defaultState.inventory;
    }
    if (!isArray(state.primary)) {
      state.primary = defaultState.primary;
    }
    state.allData.primaryPane = state.primary;
    if (!isArray(state.secondary)) {
      state.secondary = defaultState.secondary;
    }
    state.allData.secondaryPane = state.secondaryPane;
    if (!isArray(state.datasets)) {
      state.datasets = [];
    }
    state.allData.datasets = state.datasets;
    State.parseChartPanesInventory(state, defaultState);
    State.validateData('trades', state);
    state.trades = state.allData.trades;
    State.validateData('events', state);
    state.events = state.allData.events;
    State.validateData('annotations', state);
    state.annotations = state.allData.annotations;
    State.validateData('tools', state);
    state.tools = state.allData.tools;
    for (var ds of state.datasets) {
      if (!this.#dss) this.#dss = {};
      this.#dss[ds.id] = new Dataset(this, ds);
    }
    return state;
  }
  static delete(chart, state) {
    let states = State.chartList(chart)?.states;
    if (states) return undefined;
    let key = states.getKey(chart, state);
    if (!isString(key) || !states.has(key)) return false;
    states.delete(key);
    return true;
  }
  static has(chart, key) {
    return State.chartList(chart)?.states?.has(key);
  }
  static get(chart, key) {
    return State.chartList(chart)?.states?.get(key);
  }
  static getKey(chart, target) {
    let key = target;
    if (isObject(target) && Object.keys(target).length < 3) {
      if (isString(target?.id)) {
        key = State.findStateById(chart, target.id) || target?.key;
      } else if (isString(target?.key)) key = target?.key;
      else key = undefined;
    } else if (!isString(target)) key = undefined;
    return key;
  }
  static setTimeFrame(chart, key, ohlcv) {
    let state = State.get(chart, key);
    let timeFrame = undefined;
    if (!state) return false;
    if (state.isEmpty && isArray(ohlcv) && ohlcv.length > 1) {
      timeFrame = detectInterval(ohlcv);
      state.range.interval = timeFrame;
      state.range.intervalStr = ms2Interval(timeFrame);
      chart.emit('range_timeframeSet', state.range.intervalStr);
    }
    return timeFrame;
  }
  static ohlcv(data) {
    if (!isArray(data)) return false;
    let ohlcv = {
      time: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    };
    let start = 0,
      end = data.length;
    while (end != 0 && start < end) {
      let val = data[start];
      ohlcv.time.push(val[OHLCV.t]);
      ohlcv.open.push(val[OHLCV.o]);
      ohlcv.high.push(val[OHLCV.h]);
      ohlcv.low.push(val[OHLCV.l]);
      ohlcv.close.push(val[OHLCV.c]);
      ohlcv.volume.push(val[OHLCV.v]);
      start++;
    }
    return ohlcv;
  }
  static export(chart, key, config = {}) {
    if (!State.has(chart, key)) return undefined;
    if (!isObject(config)) config = {};
    const state = State.get(chart, key);
    const type = config?.type;
    let stateExport;
    let data = {};
    let exclude = ['core', 'inventory', 'range', 'timeData'];
    for (let d in state.data) {
      if (exclude.includes(d)) continue;
      data[d] = copyDeep(state.data[d]);
    }
    let vals = data.chart.data;
    if (vals.length > 0 && vals[vals.length - 1].length > 6)
      vals.length = vals.length - 1;
    data.inventory = isArray(data.inventory) ? Array.from(data.inventory) : [];
    data.version = version;
    data.key = state.key;
    data.range = state.range.export();
    let { indexed, timeFrame, timeFrameMS, timeZone, timeZoneOffset } = {
      ...state.data.timeData
    };
    data.timeData = {
      indexed,
      timeFrame,
      timeFrameMS,
      timeZone,
      timeZoneOffset
    };
    switch (type) {
      case 'json':
      default:
        const { replacer, space } = { ...config };
        stateExport = JSON.stringify(data, replacer, space);
        if (!!config?.compress) stateExport = stateExport.compress();
    }
    return stateExport;
  }
  static asyncExport(chart, key, config = {}) {
    return new Promise((resolve, reject) => {
      try {
        resolve(State.export(chart, key, config));
      } catch (e) {
        chart.error(e);
        reject();
      }
    });
  }
  static validateData(type, state) {
    if (!isString(type) || !(type in validator) || !isObject(state))
      throw new Error(`ERROR: State: validateData: ${type} unexpected data`);
    if (!isObject(state[type])) state[type] = copyDeep(DEFAULT_STATE[type]);
    state[type].display = !!state[type]?.display;
    state[type].displayInfo = !!state[type]?.displayInfo;
    if (!isObject(state[type].data))
      state[type].data = copyDeep(DEFAULT_STATE[type].data);
    else {
      let tradeData = state[type].data;
      let allData = state?.data?.allData || state.allData;
      let tf = state.range.timeFrame;
      State.importData(type, tradeData, allData, tf);
    }
  }
  static archiveChartPanesInventory(state) {
    state.data.inventory.length = 0;
    if (!(state.core.ChartPanes instanceof xMap)) return;
    for (let [key, pane] of state.core.ChartPanes) {
      let ind = [],
        entry = [];
      entry[0] = pane.isPrimary ? 'primary' : 'secondary';
      for (let i of Object.values(pane.indicators)) {
        ind.push(i.instance.snapshot());
      }
      entry[1] = ind;
      entry[2] = pane.snapshot();
      state.data.inventory.push(entry);
    }
  }
  static parseChartPanesInventory(state, defaultState) {
    if (state.inventory.length == 0) {
      state.inventory.push(['primary', state.primary]);
      let secondary = isArray(state?.secondary) ? state.secondary : [];
      for (let s of secondary) {
        if (isObject(s) || isArrayOfType(s, 'object')) {
          state.inventory.push(['secondary', s]);
        }
      }
    }
    let o = state.inventory;
    let c = o.length;
    while (c--) {
      if (!isArray(o[c]) || o[c].length == 0) o.splice(c, 1);
      else {
        let i = state.inventory[c][1];
        let x = i.length;
        while (x--) {
          if (!isObject(i[x]) || !isString(i[x].name) || !isString(i[x].type))
            i.splice(x, 1);
          else if (!isObject(i[x].settings)) i[x].settings = {};
        }
        if (o[c].length == 0) o.splice(c, 1);
      }
    }
    if (state.inventory.length == 0)
      state.inventory[0] = ['primary', defaultState.primary];
    let cnt = 0;
    state.inventory.forEach((v, i) => {
      if (v[0] == 'primary') {
        if (++cnt > 1) state.inventory.splice(i, 1);
      }
    });
    if (!cnt) state.inventory.push(['primary', defaultState.primary]);
  }
  static importData(type, data, state, tf) {
    if (!(type in validator)) return false;
    if (!isObject(state?.[type])) state[type] = copyDeep(DEFAULT_STATE[type]);
    let d = state[type].data;
    if (!isObject(d?.[tf])) d[tf] = {};
    if (!isObject(data)) return false;
    for (let ts in data) {
      if (isValidTimestamp(ts * 1) && isArray(data[ts])) {
        for (let t of data[ts]) {
          if (t?.id) t.id = `${t.id}`;
          if (State.isValidEntry(t, validator[type])) {
            if (!isObject(d?.[tf])) d[tf] = {};
            if (!isArray(d[tf]?.[ts])) d[tf][ts] = [];
            d[tf][ts].push(t);
          }
        }
      } else {
        d[ts] = data[ts];
      }
    }
    return true;
  }
  static isValidEntry(e, type) {
    const k1 = Object.keys(e);
    const k2 = Object.keys(type);
    if (!isObject(e) || !isArrayEqual(k1, k2)) return false;
    for (let k of k2) {
      if (typeof e[k] !== type[k]) return false;
    }
    return true;
  }
  static buildRange(instance, state, core) {
    let cfg = state.core.config.range;
    let range = state.range;
    let tfms = detectInterval(state.chart.data);
    if (tfms === Infinity) tfms = range.timeFrameMS || DEFAULT_TIMEFRAMEMS;
    if (
      !state.chart.isEmpty &&
      state.chart.data.length > 1 &&
      range.timeFrameMS !== tfms
    )
      range.timeFrameMS = tfms;
    if (!isTimeFrameMS(range.timeFrameMS))
      range.timeFrameMS = DEFAULT_TIMEFRAMEMS;
    range.timeFrame = ms2Interval(range.timeFrameMS);
    let config = {
      core,
      state: instance,
      interval: range.timeFrame || cfg?.timeFrameMS,
      initialCnt: range?.initialCnt || cfg?.initialCnt,
      limitFuture: range?.limitFuture || cfg?.limitFuture,
      limitPast: range?.limitPast || cfg?.limitPast,
      minCandles: range?.minCandles || cfg?.minCandles,
      maxCandles: range?.maxCandles || cfg?.maxCandles,
      yAxisBounds: range?.yAxisBounds || cfg?.yAxisBounds
    };
    return new Range(range?.start, range?.end, config);
  }
  #id = '';
  #key = '';
  #data = {};
  #status = false;
  #isEmpty = true;
  #timeData;
  #dataSource;
  #range;
  #core;
  #chartPanes = new xMap();
  #chartPaneMaximized = {
    instance: null,
    rowsH: 0,
    panes: {}
  };
  constructor(state = State.default, deepValidate = false, isCrypto = false) {
    if (!(state?.core instanceof TradeXchart))
      throw new Error(`State : invalid TradeXchart instance`);
    this.#core = state.core;
    this.#data = State.validate(this, state, deepValidate, isCrypto);
    this.#data.range = State.buildRange(this, this.#data, state.core);
    this.#data.timeData = new TimeData(this.#data.range);
    this.#data.chart.ohlcv = State.ohlcv(this.#data.chart.data);
    let hash = State.hash(state);
    this.#key = `${SHORTNAME}_${HASHKEY}_${hash}`;
  }
  get id() {
    return this.#id;
  }
  get key() {
    return this.#key;
  }
  get status() {
    return this.#data.status;
  }
  get isEmpty() {
    return this.#data.isEmpty;
  }
  get core() {
    return this.#core !== undefined ? this.#core : false;
  }
  get data() {
    return this.#data;
  }
  get time() {
    return this.#data.timeData;
  }
  get range() {
    return this.#data.range;
  }
  get chartPanes() {
    return this.#chartPanes;
  }
  get chartPaneMaximized() {
    return this.#chartPaneMaximized;
  }
  get allData() {
    return {
      data: this.#data.chart.data,
      ohlcv: this.#data.chart.ohlcv,
      primaryPane: this.#data.primary,
      secondaryPane: this.#data.secondary,
      datasets: this.#data.datasets,
      trades: this.#data.trades.data,
      events: this.#data.events.data,
      annotations: this.#data.annotations.data,
      tools: this.#data.tools.data
    };
  }
  get trades() {
    return this.#data.trades;
  }
  get events() {
    return this.#data.events;
  }
  get annotations() {
    return this.#data.annotations;
  }
  get tools() {
    return this.#data.tools;
  }
  error(e) {
    this.#core.error(e);
  }
  create(state, deepValidate, isCrypto) {
    return State.create(state, deepValidate, isCrypto);
  }
  delete(state) {
    let key = this.#key;
    if (!state) key = State.getKey(this.#core, state);
    if (!isString(key)) {
      core.error(`${core.name} : State.delete() : State not found`);
      return false;
    }
    if (key !== this.key) {
      State.delete(this.#core, key);
    } else {
      if (State.has(this.#core, key)) {
        const empty = State.create();
        this.use(empty.key);
        State.delete(key);
      } else {
        core.error(`${core.name} : State.use() : State not found`);
        return false;
      }
    }
    return true;
  }
  list() {
    return State.list(this.#core);
  }
  has(key) {
    return State.has(this.#core, key);
  }
  get(key) {
    return State.get(this.#core, key);
  }
  use(key) {
    const errMsg = `TradeX-Chart id: ${this.#core.id} : cannot use supplied key or state`;
    if (isString(key) && !State.has(key)) return undefined;
    else if (!State.isValidConfig(key)) {
      this.#core.log(errMsg);
      return undefined;
    }
    if (isFunction(this.#core.MainPane?.init)) {
      if (this.#core.stream instanceof Stream) this.#core.stream.stop();
      this.#core.progress.start();
      State.archiveChartPanesInventory(this);
      this.#core.MainPane.destroy(false);
    }
    let state = State.use(this.#core, key);
    if (isObject(key)) key.key = state?.key;
    if (isFunction(this.#core.MainPane?.init)) {
      this.#core.MainPane.init(this.#core.MainPane.options);
      this.#core.MainPane.start();
      this.#core.MainPane.refresh();
      this.#core.progress.stop();
    }
    if (!state) this.#core.log(errMsg);
    return state;
  }
  export(key = this.key, config = {}) {
    return State.export(this.#core, key, (config = {}));
  }
  mergeData(merge, newRange = false, calc = false) {
    if (this.isEmpty) State.setTimeFrame(this.#core, this.key, merge?.ohlcv);
    let tfMS = this.range.timeFrameMS;
    if (!isObject(merge)) {
      this.error(`ERROR: ${this.id}: merge data must be type Object!`);
      return false;
    }
    let end = isArray(merge?.ohlcv) ? merge.ohlcv.length - 1 : 0;
    if (end > 1 && tfMS !== detectInterval(merge?.ohlcv)) {
      this.error(
        `ERROR: ${this.core.ID}: merge data time frame does not match existing time frame!`
      );
      return false;
    }
    if (this.isEmpty || !isNumber(tfMS)) {
      if (
        !isObject(newRange) ||
        !isInteger(newRange.start) ||
        !isInteger(newRange.end)
      ) {
        if (end > 1) {
          newRange = { start: end - this.range.initialCnt, end };
        }
      }
    }
    if (isObject(newRange)) {
      if (isInteger(newRange?.startTS)) newRange.start = newRange.startTS;
      else
        newRange.start = isInteger(newRange.start)
          ? this.range.value(newRange.start)[0]
          : this.range.timeMin;
      if (isInteger(newRange?.endTS)) newRange.end = newRange.endTS;
      else
        newRange.end = isInteger(newRange.end)
          ? this.range.value(newRange.end)[0]
          : this.range.timeMax;
    } else {
      newRange = {};
      newRange.start = this.range.timeMin;
      newRange.end = this.range.timeMax;
    }
    let i, start;
    let mData = merge?.ohlcv || false;
    const data = this.allData.data;
    const primaryPane = this.allData?.primaryPane;
    const mPrimary = merge?.primary || false;
    const secondaryPane = this.allData?.secondaryPane;
    const mSecondary = merge?.secondary || false;
    const dataset = this.allData?.dataset?.data;
    const mDataset = merge?.dataset?.data || false;
    this.allData?.trades;
    const mTrades = merge?.trades || false;
    this.allData?.events;
    merge?.events || false;
    const inc = !isArray(mData) ? 0 : this.range.inRange(mData[0][0]) ? 1 : 0;
    const refresh = {};
    if (isArray(mData) && mData.length > 0) {
      i = mData.length - 1;
      data.length - 1;
      refresh.mData =
        this.range.inRange(mData[0][0]) && this.range.inRange(mData[0][i]);
      if (
        !isBoolean(mData[i][7]) &&
        mData[i].length !== 8 &&
        mData[i][6] !== null &&
        mData[i][7] !== true
      ) {
        mData = sanitizeCandles(mData);
      } else {
        if (
          newRange.end >= this.range.timeFinish &&
          newRange.start <= this.range.timeFinish
        ) {
          newRange.start += this.range.interval;
          newRange.end += this.range.interval;
        }
      }
      if (data.length == 0) {
        let ohlcv = State.ohlcv(mData);
        this.allData.data.push(...mData);
        this.allData.ohlcv = { ...ohlcv };
      } else {
        let mStart = mData[0][0];
        let mEnd = mData[mData.length - 1][0];
        let mDataMS = (mData.length - 1) * tfMS;
        if (mEnd > mStart + mDataMS) mData = fillGaps(mData, tfMS);
        this.data.chart.data = this.merge(data, mData);
      }
      if (calc) this.#core.calcAllIndicators(calc);
      else {
        if (isArray(mPrimary) && mPrimary.length > 0) {
          for (let o of mPrimary) {
            if (isArray(o?.data) && o?.data.length > 0) {
              for (let p of primaryPane) {
                if (
                  isObject(p) &&
                  p.name === o.name &&
                  p.type === o.type &&
                  isObjectEqual(p.settings, o.settings)
                ) {
                  p.data = this.merge(p.data, o.data);
                  this.#core.getIndicator(p.id).drawOnUpdate = true;
                }
              }
            }
          }
        }
        if (isArray(mSecondary) && mSecondary.length > 0) {
          for (let o of mSecondary) {
            if (isArray(o?.data) && o?.data.length > 0) {
              for (let p of secondaryPane) {
                if (
                  isObject(p) &&
                  p.name === o.name &&
                  p.type === o.type &&
                  isObjectEqual(p.settings, o.settings)
                ) {
                  p.data = this.merge(p.data, o.data);
                  this.#core.getIndicator(p.id).drawOnUpdate = true;
                }
              }
            }
          }
        }
        this.#core.calcAllIndicators();
      }
      if (isArray(mDataset) && mDataset.length > 0) {
        for (let o of mDataset) {
          if (isArray(o?.data) && o?.data.length > 0) {
            for (let p of dataset) {
              if (
                p.name === o.name &&
                p.type === o.type &&
                isObjectEqual(p.settings, o.settings)
              ) {
                p.data = this.merge(p.data, o.data);
              }
            }
          }
        }
      }
      if (isObject(mTrades)) {
        State.importTrades(mTrades, this.allData, this.time.timeFrame);
      }
      if (newRange) {
        if (isObject(newRange)) {
          start = isInteger(newRange.start)
            ? this.range.getTimeIndex(newRange.start)
            : this.range.indexStart;
          end = isInteger(newRange.end)
            ? this.range.getTimeIndex(newRange.end)
            : this.range.indexEnd;
        } else {
          if (mData[0][0]) start = this.range.indexStart + inc;
          end = this.range.indexEnd + inc;
        }
        this.#core.setRange(start, end);
      }
      let r,
        u = false;
      for (r in refresh) {
        u = u || r;
      }
      if (merge.ohlcv.length > 1) this.#core.emit('state_mergeComplete');
      if (u) this.#core.refresh();
      this.#data.isEmpty = false;
      return true;
    }
  }
  merge(data, mData) {
    let merged = [];
    let older, newer;
    if (data[0][0] < mData[0][0]) {
      older = data;
      newer = mData;
    } else {
      older = mData;
      newer = data;
    }
    if (newer.length == 1 && newer[0][0] == older[older.length - 1][0]) {
      older[older.length - 1] = newer[0];
      merged = older;
    } else if (
      newer.length == 1 &&
      newer[0][0] == older[older.length - 1][0] + this.range.interval
    ) {
      merged = older.concat(newer);
    } else if (older[older.length - 1][0] >= newer[0][0]) {
      let o = 0;
      while (older[o][0] < newer[0][0]) {
        merged.push(older[o]);
        o++;
      }
      merged = merged.concat(newer);
      let i = o + newer.length;
      if (i < older.length) {
        merged = merged.concat(older.slice(i));
      }
    } else if (newer[0][0] - older[older.length - 1][0] > this.range.interval) {
      merged = older;
      let fill = older[older.length - 1][0];
      let gap = Math.floor((newer[0][0] - fill) / this.range.interval);
      for (gap; gap > 0; gap--) {
        let arr = Array(newer[0].length).fill(null);
        arr[0] = fill;
        fill = +this.range.interval;
        merged.push(arr);
        merged = merged.concat(newer);
      }
    } else {
      merged = older.concat(newer);
    }
    return merged;
  }
  addIndicator(i, p) {
    if (isObject(i) && p == 'primary') {
      i.params.overlay.id = i.instance.id;
      this.#data.primary.push(i.params.overlay);
    } else if (i instanceof Chart && p == 'secondary') {
      this.#data.secondary.push(...i.options.view);
      this.range.maxMinDatasets();
    } else return false;
  }
  removeIndicator(i) {
    if (!isString(i)) return false;
    const seekAndDestroy = (p, i) => {
      const a = this.data[p];
      for (let d = 0; d < a.length; d++) {
        if (a[d].id == i) {
          a.splice(d, 1);
          this.range.maxMinDatasets();
          return true;
        }
      }
      return false;
    };
    if (seekAndDestroy('primary', i)) return true;
    if (seekAndDestroy('secondary', i)) return true;
    return false;
  }
  addTrade(t) {
    if (!State.isValidEntry(t, TRADE)) return false;
    const ts = t.timestamp - (t.timestamp % tfMS);
    const d = new Date(ts);
    t.dateStr = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    this.allData.trades.data.ts[t.timestamp] = t;
    this.allData.trades.data[tf][ts] = t;
    this.#core.emit('state_tradeAdded', t);
    this.#core.emit('trade_added', t);
    return true;
  }
  removeTrade(t) {
    console.log('TODO: state.removeTrade()');
  }
  addEvent(e) {
    if (!State.isValidEntry(e, EVENT)) return false;
    const ts = t.timestamp - (e.timestamp % tfMS);
    const d = new Date(ts);
    e.dateStr = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    this.allData.events.data.ts[e.timestamp] = e;
    this.allData.events.data[tf][ts] = e;
    this.#core.emit('state_eventAdded', e);
    this.#core.emit('event_added', e);
    return true;
  }
  removeEvent(e) {
    console.log('TODO: state.removeEvent()');
  }
}

const reserved = ['constructor', 'list', 'setCurrent', 'setTheme', 'setValue'];
class Theme {
  static #list = new xMap();
  static get list() {
    return Theme.#list;
  }
  #core;
  static create(theme, core) {
    if (!isObject(theme)) return false;
    theme.id = isString(theme.name) ? uid(theme.name) : `${core.id}.theme`;
    const instance = new Theme(theme, core);
    Theme.list.set(theme.id, instance);
    return instance;
  }
  constructor(theme, core) {
    this.#core = core;
    this.setCurrent(theme);
  }
  get list() {
    return Theme.list;
  }
  setCurrent(theme = {}) {
    theme = isObject(theme) ? theme : {};
    const defaultT = copyDeep(defaultTheme);
    const newTheme = copyDeep(theme);
    const setTheme = mergeDeep(defaultT, newTheme);
    for (let t in setTheme) {
      if (reserved.includes(t)) continue;
      this[t] = setTheme[t];
    }
    this.#core.refresh();
  }
  setTheme(theme) {
    if (isString(theme) && Theme.list.has(theme)) {
      const t = Theme.list.get(theme);
      this.setCurrent(t);
      return true;
    }
    return false;
  }
  setProperty(path, value) {
    if (!isString(path)) return undefined;
    const old = getProperty(this, path);
    const keys = path.split('.');
    if (keys.length == 1) {
      this[keys[0]] = value;
    } else {
      let k = keys.shift();
      this[k] = setProperty(this[k], keys.join('.'), value);
    }
    this.#core.refresh();
    return old;
  }
  getProperty(path) {
    return getProperty(this, path);
  }
  deleteTheme(theme) {
    if (isString(theme) && Theme.list.has(theme)) {
      Theme.list.delete(theme);
      return true;
    }
    return false;
  }
  exportTheme(config = {}) {
    if (!isObject) config = {};
    const type = config?.type;
    const data = {};
    let themeExport;
    for (let t in this) {
      if (reserved.includes(t)) continue;
      data[t] = this[t];
    }
    switch (type) {
      case 'json':
      default:
        const { replacer, space } = { ...config };
        themeExport = JSON.stringify(data, replacer, space);
    }
    return themeExport;
  }
}

class ThreadWorker {
  #fn;
  constructor(fn) {
    this.#fn = fn;
    self.onmessage = (m) => this._onmessage(m.data);
  }
  _onmessage(m) {
    const { r, data } = m;
    try {
      const result = this.#fn(data, r);
      self.postMessage({ r, status: true, result });
    } catch (e) {
      self.postMessage({ r, status: false, result: e });
    }
  }
  end() {
    self.close();
  }
}
class Thread {
  #id;
  #cb;
  #err;
  #req = 0;
  #reqList = {};
  #worker;
  #idle = true;
  constructor(id, fn, cb, err) {
    this.#id = id;
    this.#cb = cb;
    this.#err = err;
    const workerFn = `
      ${WebWorker.ThreadWorker.toString()};
      const fn = ${fn}
      const worker = new ThreadWorker(fn)
    `;
    const blob = new Blob(
      [`;(async () => {${workerFn}})().catch(e => {console.error(e)})`],
      { type: 'text/javascript' }
    );
    const blobURL = URL.createObjectURL(blob);
    this.#worker = new Worker(blobURL);
    setTimeout(
      function (blobURL) {
        try {
          URL.revokeObjectURL(blobURL);
        } catch (e) {}
      },
      500,
      blobURL
    );
  }
  get id() {
    return this.#id;
  }
  get req() {
    return `r_${this.#req++}`;
  }
  get cb() {
    return this.#cb;
  }
  set cb(cb) {
    this.#cb = cb;
  }
  onmessage(m) {
    this.#idle = true;
    return isFunction(this.#cb) ? this.#cb(m) : m;
  }
  onerror(e) {
    this.#idle = true;
    return isFunction(this.#err) ? this.#err(e) : e;
  }
  postMessage(m) {
    return new Promise((resolve, reject) => {
      try {
        let r = this.req;
        this.#reqList[r] = { resolve, reject };
        this.#idle = false;
        this.#worker.postMessage({ r, data: m });
        this.#worker.onmessage = (m) => {
          const { r, status, result } = m.data;
          if (r in this.#reqList) {
            const { resolve, reject } = this.#reqList[r];
            delete this.#reqList[r];
            if (status) {
              resolve(this.onmessage(result));
            } else {
              reject(this.onerror({ r, result }));
            }
          } else if (status == 'resolved') this.onmessage(result);
          else throw new Error('Orphaned thread request ${r}');
        };
        this.#worker.onerror = (e) => {
          reject(this.onerror(e));
        };
      } catch (error) {
        this.#idle = true;
        reject(error);
      }
    });
  }
  terminate() {
    this.#worker.terminate();
  }
}
class WebWorker {
  static #threads = new Map();
  static {
    this.ThreadWorker = ThreadWorker;
  }
  static {
    this.Thread = Thread;
  }
  static create(worker, ID = 'worker', cb, err) {
    if (typeof window.Worker === 'undefined') return false;
    if (isFunction(worker)) {
      worker = worker.toString();
    } else if (isString(worker)) {
      let fnStr = worker
        .trim()
        .match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
      worker = fnStr;
    } else {
      return false;
    }
    ID = isString(ID) ? uid(ID) : uid('worker');
    this.#threads.set(ID, new this.Thread(ID, worker, cb, err));
    return this.#threads.get(ID);
  }
  static destroy(ID) {
    if (!isString(ID)) return false;
    this.#threads.get(ID).terminate();
    this.#threads.delete(ID);
  }
  static end() {
    this.#threads.forEach((value, key, map) => {
      this.destroy(key);
    });
  }
}
class TaskProcessor {
  static {
    this.taskList = {};
  }
  static add(t) {
    if (!isObject(t)) {
      this.typeError('add()', t, 'object');
    }
    if (!isString(t?.id)) {
      this.typeError('add(t.id)', t, 'string');
    }
    if (!isString(t?.fn)) {
      this.typeError('add(t.fn)', t, 'string');
    }
    this.taskList[t.id] = eval(t.fn);
  }
  static remove(t) {
    if (!isString(t)) {
      this.typeError('remove()', t, 'string');
    }
    if (!(t in this.taskList)) {
      this.error('remove()', `task ${t} not found!`);
    }
    delete this.taskList[t];
  }
  static exec(t) {
    if (!isObject(t)) {
      this.typeError('exec()', t, 'object');
    }
    if (!isString(t?.id)) {
      this.typeError('exec(t.id)', t, 'string');
    }
    if (!isObject(t?.params)) {
      this.typeError('exec(t.params)', t, 'object');
    }
    if (!(t.id in this.taskList)) {
      this.error('exec()', `task ${t.id} not found!`);
    }
    try {
      this.taskList[t.id](...t.params);
    } catch (e) {
      this.error('exec()', `task ${t.id} error!`, { cause: e });
    }
  }
  static typeError(fn, t, e) {
    typeError(`TaskProcessor.${fn}`, t, e);
  }
  static error(fn, e, o) {
    error(`TaskProcessor.${fn}`, e, o);
  }
}

class Fibonacci extends chartTools {
  constructor(config) {
    super(config);
  }
}

class Line extends chartTools {
  #colour = lineConfig.colour;
  #lineWidth = lineConfig.width;
  #stateMachine;
  constructor(config) {
    super(config);
  }
  set colour(colour = this.#colour) {
    this.#colour = colour;
  }
  get colour() {
    return this.#colour;
  }
  set lineWidth(width) {
    this.#lineWidth = isNumber(width) ? width : this.#lineWidth;
  }
  get lineWidth() {
    return this.#lineWidth;
  }
  set stateMachine(config) {
    this.#stateMachine = new StateMachine(config, this);
  }
  get stateMachine() {
    return this.#stateMachine;
  }
  start() {
    this.eventsListen();
  }
  destroy() {
    this.stateMachine.destroy();
  }
  draw() {
    let [x1, y1] = this.cursorClick;
    const scene = this.layerTool.scene;
    scene.clear();
    const ctx = this.layerTool.scene.context;
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.colour;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(300, 150);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    this.elViewport.render();
  }
}

class Measure extends chartTools {
  constructor(config) {
    super(config);
  }
}

class RangeTool extends chartTools {
  constructor(config) {
    super(config);
  }
}

class Text extends chartTools {
  constructor(config) {
    super(config);
  }
}

var tools = [
  {
    id: 'cursor',
    name: 'Cursor',
    icon: cursor,
    event: 'tool_activated'
  },
  {
    id: 'line',
    name: 'Line',
    icon: line,
    event: 'tool_activated',
    class: Line,
    sub: [
      {
        id: 'ray',
        name: 'Ray',
        icon: line,
        event: 'tool_activated',
        class: Line
      },
      {
        id: 'hRay',
        name: 'Horizontal Ray',
        icon: line,
        event: 'tool_activated',
        class: Line
      },
      {
        id: 'vRay',
        name: 'Vertical Ray',
        icon: line,
        event: 'tool_activated',
        class: Line
      }
    ]
  },
  {
    id: 'fibonacci',
    name: 'Fibonacci',
    icon: fibonacci,
    event: 'tool_activated',
    class: Fibonacci,
    sub: [
      {
        id: 'fib',
        name: 'Not Implemented Yet',
        icon: line
      }
    ]
  },
  {
    id: 'range',
    name: 'Range',
    icon: range,
    event: 'tool_activated',
    class: RangeTool,
    sub: [
      {
        id: 'rng',
        name: 'Not Implemented Yet',
        icon: line
      }
    ]
  },
  {
    id: 'text',
    name: 'Text',
    icon: text,
    event: 'tool_activated',
    class: Text,
    sub: [
      {
        id: 'txt',
        name: 'Not Implemented Yet',
        icon: line
      }
    ]
  },
  {
    id: 'measure',
    name: 'Measure',
    icon: measure,
    event: 'tool_activated',
    class: Measure
  },
  {
    id: 'delete',
    name: 'Delete',
    icon: del,
    event: 'tool_activated',
    class: undefined
  }
];
const lineConfig = {
  colour: '#8888AACC',
  width: 1
};

var stateMachineConfig$1 = {
  id: 'template',
  initial: 'idle',
  context: {},
  states: {
    idle: {
      onEnter(data) {
        console.log('idle: onEnter');
      },
      onExit(data) {
        console.log('idle: onExit');
      },
      on: {
        tool_activated: {
          target: 'tool_activated',
          action(data) {
            this.context.origin.onToolActivated(data);
          }
        },
        tool_selected: {
          target: 'tool_selected',
          action(data) {
            this.context.origin.onToolSelected(data);
          }
        },
        tool_deselected: {
          target: 'tool_deselected',
          action(data) {
            this.context.origin.onToolDeselected(data);
          }
        },
        tool_deleted: {
          target: 'tool_deleted',
          action(data) {
            this.context.origin.onToolDeleted(data);
          }
        }
      }
    },
    tool_activated: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        tool_selected: {
          target: 'tool_addToTarget',
          action(data) {
            this.context.origin.onToolTargetSelected(data);
          }
        }
      }
    },
    tool_selected: {
      onEnter(data) {},
      onExit(data) {},
      on: {}
    },
    tool_deselected: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        always: {
          target: 'idle',
          condition: 'toolTarget',
          action(data) {}
        }
      }
    },
    tool_deleted: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        always: {
          target: 'idle',
          condition: 'toolTarget',
          action(data) {}
        }
      }
    }
  },
  guards: {
    toolTarget() {
      return true;
    }
  }
};

class ToolsBar extends Component {
  #name = 'Toolbar';
  #shortName = 'tools';
  #elTools;
  #widgets;
  #Tool = chartTools;
  #tools;
  #toolClasses = {};
  #activeTool = undefined;
  #toolTarget;
  #toolEvents = { click: [], pointerover: [] };
  #menus = [];
  constructor(core, options) {
    super(core, options);
    this.#elTools = core.elTools;
    this.#tools = tools || core.config.tools;
    this.#widgets = core.WidgetsG;
    this.init();
  }
  get name() {
    return this.#name;
  }
  get shortName() {
    return this.#shortName;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return elementDimPos(this.#elTools);
  }
  init() {
    this.mount(this.#elTools);
  }
  start() {
    this.initAllTools();
    this.addAllTools();
    this.eventsListen();
    stateMachineConfig$1.id = this.id;
    stateMachineConfig$1.context = this;
    this.stateMachine = stateMachineConfig$1;
    this.stateMachine.start();
    this.log(`Tool Bar ${this.#name} instantiated and running`);
  }
  destroy() {
    this.core.hub.expunge(this);
    const id = this.id;
    const tools = this.#elTools.querySelectorAll(`.icon-wrapper`);
    for (let tool of tools) {
      for (let t of this.#tools) {
        if (t.id === id)
          tool.removeEventListener('click', this.#toolEvents[id].click);
        tool.removeEventListener(
          'pointerover',
          this.#toolEvents[id].pointerover
        );
        tool.removeEventListener('pointerout', this.#toolEvents[id].pointerout);
      }
    }
    this.stateMachine.destroy();
  }
  eventsListen() {
    this.on('tool_selected', this.onToolSelect, this);
    this.on('tool_deselected', this.onToolDeselect, this);
  }
  onResized() {
    for (let menu of this.#menus) {
      menu.position();
    }
  }
  onIconClick(e) {
    e.currentTarget.dataset.event;
    let menu = e.currentTarget.dataset.menu || false,
      data = {
        target: e.currentTarget.id,
        menu: menu,
        evt: e.currentTarget.dataset.event,
        tool: e.currentTarget.dataset.tool
      };
    if (menu) this.emit('menu_open', data);
    else {
      this.emit('menuItem_selected', data);
    }
  }
  onIconOut(e) {
    const svg = e.currentTarget.querySelector('svg');
    svg.style.fill = ToolsStyle.COLOUR_ICON;
  }
  onIconOver(e) {
    const svg = e.currentTarget.querySelector('svg');
    svg.style.fill = ToolsStyle.COLOUR_ICONHOVER;
  }
  onToolTargetSelected(tool) {
    console.log('tool_targetSelected:', tool.target);
    this.#toolTarget = tool.target;
  }
  onToolActivated(tool) {
    console.log('Tool activated:', tool);
    this.#activeTool = tool;
  }
  onToolSelect(e) {
    console.log('Tool selected:', e);
  }
  onToolDeselect(e) {
    console.log('Tool deselected:', e);
  }
  mount(el) {
    el.innerHTML = this.#elTools.defaultNode(this.#tools);
  }
  initAllTools() {
    const tools = this.#elTools.querySelectorAll(`.icon-wrapper`);
    for (let tool of tools) {
      let id = tool.id,
        svg = tool.querySelector('svg');
      svg.style.fill = ToolsStyle.COLOUR_ICON;
      svg.style.width = '90%';
      for (let t of this.#tools) {
        if (t.id === id) {
          this.#toolEvents[id] = {};
          this.#toolEvents[id].click = this.onIconClick.bind(this);
          this.#toolEvents[id].pointerover = this.onIconOver.bind(this);
          this.#toolEvents[id].pointerout = this.onIconOut.bind(this);
          tool.addEventListener('click', this.#toolEvents[id].click);
          tool.addEventListener(
            'pointerover',
            this.#toolEvents[id].pointerover
          );
          tool.addEventListener('pointerout', this.#toolEvents[id].pointerout);
          if (t?.sub) {
            let config = {
              content: t.sub,
              primary: tool
            };
            let menu = this.#widgets.insert('Menu', config);
            tool.dataset.menu = menu.id;
            menu.start();
            this.#menus.push(menu);
            for (let s of t.sub) {
              this.#toolClasses[s.id] = s.class;
            }
          } else {
            this.#toolClasses[t.id] = t.class;
          }
        }
      }
    }
  }
  addTool(tool = this.#activeTool, target = this.#toolTarget) {
    let config = {
      name: tool,
      tool: this.#toolClasses[tool],
      pos: target.cursorClick
    };
    let toolInstance = this.#Tool.create(target, config);
    toolInstance.start();
    console.log(toolInstance);
    return toolInstance;
  }
  addNewTool(tool, target) {
    let t = this.addTool(tool, target);
    this.activeTool = t;
    this.emit(`tool_active`, t);
    this.emit(`tool_${t.id}_active`, t);
  }
  addAllTools() {}
}

const iconW = 20;
const iconH = 20;
const handleColour = new Colour(GlobalStyle.COLOUR_BORDER);
const template$e = document.createElement('template');
template$e.innerHTML = `
<style>
  .scrollBarWidget {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 2px;
  }
  .scrollBar {
    position: relative;
    border: 1px solid var(--txc-time-scrollbar-color, ${GlobalStyle.COLOUR_BORDER});
    height: 20px;
    border-radius: 3px;
    flex-basis: 100%;
    overflow: hidden;
  }
  .scrollBar input {
    pointer-events: none;
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    width: 100%;
    outline: none;
    height: 100%;
    margin: 0;
    padding: 0;
    background:  var(--txc-time-slider-color, #555);

  }
  .scrollBar input::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none; 
    pointer-events: auto;
    position: relative;
    z-index: 10;
    outline: 0;
    height: 100%;
  }
  .scrollBar input::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    appearance: none; 
    pointer-events: auto;
    position: relative;
    z-index: 1;
    height: 100%;
  }
  .scrollBar input::-moz-range-track {
    position: relative;
    z-index: -1;
    background-color: rgba(0, 0, 0, 1);
    border: 0;
  }
  .scrollBar input:last-of-type::-moz-range-track {
    -moz-appearance: none;
    background: none transparent;
    border: 0;
  }
  .scrollBar input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none !important;
    appearance: none;
    background: none transparent;
    cursor: default;
    height: 1px; /* Required for Samsung internet based browsers */
    outline: 0;
  }
  .scrollBar input[type=range]::-moz-focus-outer {
    border: 0;
  }
  input[type=range] {
    -webkit-appearance: none;
    background: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
    height: 5px;
    border: none;
    border-radius: 3px;
    background: transparent;
  }

  input[type=range]::-ms-track {
    height: 5px;
    background: transparent;
    border: none;
    border-radius: 3px;
  }

  input[type=range]::-moz-range-track {
    height: 5px;
    background: transparent;
    border: none;
    border-radius: 3px;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 16px;
    border-radius: 3px;
    background: var(--txc-time-slider-color, #555);
    margin-top: -10px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]::-ms-thumb {
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 16px;
    border-radius: 3px;
    background:  var(--txc-time-slider-color, #555);
    margin-top: -5px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]::-moz-range-thumb {
    -webkit-appearance: none;
    border: none;
    height: 100%;
    width: 16px;
    border-radius: 3px;
    background:  var(--txc-time-slider-color, #555);
    margin-top: -5px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]:focus {
    outline: none;
  }

  .handle {
    background-color: var(--txc-time-handle-color, ${handleColour.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${iconW}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${GlobalStyle.COLOUR_ICON});
    width: ${iconW}px;
    height: ${iconH}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${GlobalStyle.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${rwdStart}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${fwdEnd}</span>
</div>
`;
class tradeXOverview extends element {
  #template;
  #scrollBarWidget;
  #rwdStart;
  #fwdEnd;
  #scrollBar;
  #viewport;
  #handle;
  #icons;
  #max;
  #min;
  #sliders;
  #overviewCSS;
  constructor() {
    super(template$e);
    this.#template = template$e;
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      document.getElementById('slider-bar');
      this.#scrollBarWidget = this.shadowRoot.querySelector('.scrollBarWidget');
      this.#rwdStart = this.shadowRoot.querySelector('.rwdStart');
      this.#fwdEnd = this.shadowRoot.querySelector('.fwdEnd');
      this.#scrollBar = this.shadowRoot.querySelector('.scrollBar');
      this.#viewport = this.shadowRoot.querySelector('.viewport');
      this.#handle = this.shadowRoot.querySelector('.handle');
      this.#icons = this.shadowRoot.querySelectorAll('svg');
      this.#max = this.shadowRoot.querySelector('#max');
      this.#min = this.shadowRoot.querySelector('#min');
      this.#sliders = this.shadowRoot.querySelectorAll('input');
      this.#overviewCSS = this.shadowRoot.querySelector(
        'style[title=overview]'
      );
      this.max.addEventListener(
        'input',
        this.onChangeSliderHandler.bind({ self: this, input: this.max })
      );
      this.min.addEventListener(
        'input',
        this.onChangeSliderHandler.bind({ self: this, input: this.min })
      );
    });
  }
  get scrollBarWidget() {
    return this.#scrollBarWidget;
  }
  get rwdStart() {
    return this.#rwdStart;
  }
  get fwdEnd() {
    return this.#fwdEnd;
  }
  get scrollBar() {
    return this.#scrollBar;
  }
  get viewport() {
    return this.#viewport;
  }
  get handle() {
    return this.#handle;
  }
  get icons() {
    return this.#icons;
  }
  get max() {
    return this.#max;
  }
  get min() {
    return this.#min;
  }
  get sliders() {
    return this.#sliders;
  }
  get overviewCSS() {
    return this.#overviewCSS;
  }
  onChangeSliderHandler() {
    console.log(`${this.input.value}, ${this.input.getAttribute('max')}`);
  }
}

customElements.get('tradex-overview') ||
  window.customElements.define('tradex-overview', tradeXOverview);
const template$d = document.createElement('template');
template$d.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${TIMESCALEH}px;
  }
  tradex-overview {
    height: ${TIMENAVIGATIONH}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class tradeXTime extends element {
  #elViewport;
  #elOverview;
  constructor() {
    super(template$d);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#elViewport = this.shadowRoot.querySelector('.viewport');
      this.#elOverview = this.shadowRoot.querySelector('tradex-overview');
    });
  }
  get viewport() {
    return this.#elViewport;
  }
  get overview() {
    return this.#elOverview;
  }
}
customElements.get('tradex-time') ||
  window.customElements.define('tradex-time', tradeXTime);

const template$c = document.createElement('template');
template$c.innerHTML = `
<style>
.scene-canvas {
  display: block;
}
</style>
<slot name="viewportCanvas"></slot>
<canvas class="scene-canvas"></canvas>
`;
class tradeXViewport extends element {
  #canvasSlot;
  #canvas;
  #onSlotChange = this.onSlotChange.bind(this);
  constructor() {
    super(template$c);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#canvasSlot = this.shadowRoot.querySelector(
        'slot[name="viewportCanvas"]'
      );
      this.#canvasSlot.addEventListener('slotchange', this.#onSlotChange);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.#canvasSlot.removeEventListener('slotchange', this.#onSlotChange);
  }
  get hasCanvasSlot() {
    return true;
  }
  get canvasSlot() {
    return this.#canvasSlot;
  }
  get canvas() {
    return this.#canvas;
  }
  onSlotChange() {
    this.#canvas = Array.from(this.canvasSlot.assignedElements()).find(
      (i) => i.localName === 'canvas'
    )[0];
  }
}
customElements.get('tradex-viewport') ||
  window.customElements.define('tradex-viewport', tradeXViewport);

const template$b = document.createElement('template');
template$b.innerHTML = `
<style>
  tradex-viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <tradex-viewport></tradex-viewport>
`;
class tradeXGrid extends element {
  #elViewport;
  constructor() {
    super(template$b);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(
      () =>
        (this.#elViewport = this.shadowRoot.querySelector('tradex-viewport'))
    );
  }
  get viewport() {
    return this.#elViewport;
  }
}
customElements.get('tradex-grid') ||
  window.customElements.define('tradex-grid', tradeXGrid);

const template$a = document.createElement('template');
template$a.innerHTML = `
<style>

.legends {
  display: flex;
  flex-direction: column;
}
.legends .collapse {
  order: 999;
  padding-left: 0.5em;
}

.legend {
  display: block;
  position: relative;
  width: 100%;
  min-height: 2em;
  margin: 0;
}
.legend * {
  margin: 0;
  padding: 0;
  vertical-align: middle;
}
.legend .upper,
.legend .lower {
  display: block;
  position: absolute;
  top: 0
  width: 100%;
  padding: 0 0.5em;
  white-space: nowrap;
}
.legend .lower {
  background: #0002;
  border-radius: 0 5px 5px 0;
}
.legend.secondary {
  // display: none !important;
}
.legend .controls {
  opacity: 0;
}
.legend .controls svg {
  vertical-align: text-top;
  margin-bottom: 0.2em;
}
.legend dl {
  display: inline; 
  margin: 0 0 0 -1em;
  overflow: hidden;
}
.legend dl:first-child,
.legend dl dt:first-of-type {
  margin-left: 0;
}
.legend dt {
  display: inline; margin-left: 1em;
}
.legend dd {
  display: inline; margin-left: .25em; color: #F900FE;
}
.legend .upper:hover {
  background: #444444cc;
  border-radius: 5px;
}
.legend .upper:hover .controls {
  opacity: 1;
}
.legend .title {
  margin-right: 1em;
  white-space: nowrap;
}
.legend .lower .title {
  visibility:hidden;
}
.legend .controls,
.legend dl {
  display: inline;
}
.legend .control,
.legend .control.collapse {
  margin-right: 2px;
  padding-left: 0;
}


.hide .indicator {
  display: none !important;
}


.controls .control:hover {
  background: #889;
  border-radius: 3px;
}

.controls.maximized .up,
.controls.maximized .down,
.controls.maximized .expand,
.controls.maximized .collapse,
.controls.maximized .maximize,
.controls.maximized .remove
{
  display: none;
}

.controls.restored .restore
{
  display: none;
}

.controls.collapsed .collapse {
  display: none;
}

.controls.expanded .expand {
  display: none;
}

.controls.visible .visible {
  display: none;
}
.controls.visible .notvisible {
  display: inline;
}

.controls.notvisible .notvisible {
  display: none;
}
.controls.notvisible .visible {
  display: inline;
}

.chart .upper {
  right: 0;
  z-index:1;
}
.chart .upper .title,
.secondary .upper .title {
  display: none;
}
.chart .lower .title {
  visibility: visible;
}

.secondary .upper {
  right: 0;
  z-index:1;
}
</style>
<div class="legends">
  <slot name="legend"></slot>
  <div class="controls collapse restored">
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${up}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${down}</span>
  </div>
</div>
`;
class tradeXLegends extends element {
  #title;
  #elLegends;
  #elTitle;
  #elInputs;
  #elControls;
  #slot;
  #hub = [];
  #onSlotChange;
  constructor() {
    super(template$a);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#slot = this.shadowRoot.querySelector('slot');
      this.#elLegends = this.shadowRoot.querySelector('.legends');
      this.#elTitle = this.shadowRoot.querySelector('.title');
      this.#elInputs = this.shadowRoot.querySelector('dl');
      this.#elControls = this.shadowRoot.querySelector('.controls');
      this.#onSlotChange = this.onSlotChange.bind(this);
      this.#slot.addEventListener('slotchange', this.#onSlotChange);
    });
  }
  disconnectedCallback() {
    this.#slot.removeEventListener('slotchange', this.#onSlotChange);
  }
  get slot() {
    return this.#slot;
  }
  get legends() {
    return this.#elLegends;
  }
  get elTitle() {
    return this.#elTitle;
  }
  get elInputs() {
    return this.#elInputs;
  }
  get elControls() {
    return this.#elControls;
  }
  get title() {
    return this.#title;
  }
  set title(t) {
    this.setTittle(t);
  }
  onSlotChange(e) {
    this.#hub.forEach((cb) => cb.handler.call(cb.context, e));
  }
  insert(legend) {
    this.legends.insertAdjacentHTML('beforeend', legend);
  }
  setTittle(t) {
    if (!isString) return;
    this.#title = t;
    this.elTitle.innerHTML = t;
  }
  buildLegend(o, theme) {
    let styleInputs = '';
    let styleLegend = `${theme.legend.font}; color: ${theme.legend.colour}; text-align: left;`;
    let styleLegendTitle = '';
    let visibility = o?.type !== 'chart' ? `visible` : `notvisible`;
    const styleControls = '';
    const controls = !theme.legend.controls
      ? ''
      : `
      <div class="controls restored expanded ${visibility}" style="${styleControls}">
        ${this.buildControls(o)}
      </div>
    `;
    switch (o?.type) {
      case 'chart':
        styleLegendTitle += 'font-size: 1.5em;';
        break;
      case 'secondary':
        styleLegend += ' margin-bottom: -1.5em;';
        styleLegendTitle += '';
        o.title = '';
        break;
      default:
        styleLegendTitle += 'font-size: 1.2em;';
        break;
    }
    const node = `
      <div id="legend_${o.id}" class="legend ${o.type}" style="${styleLegend}" data-type="${o.type}" data-id="${o.id}" data-parent="${o.parent.id}">
        <div class="lower">
          <span class="title" style="${styleLegendTitle}">${o.title}</span>
          <dl style="${styleInputs}">${this.buildInputs(o)}</dl>
        </div>
        <div class="upper">
            <span class="title" style="${styleLegendTitle}">${o.title}</span>
            ${controls}
      </div>
     </div>
    `;
    return node;
  }
  buildInputs(o) {
    let i = 0,
      inp = '',
      input,
      blank = '',
      styleDT = '',
      styleDD = '';
    for (input in o.inputs) {
      let colour = o?.colours?.[i] ? ` color: ${o.colours[i]};` : '';
      let value = o?.inputs?.[input] !== undefined ? o.inputs[input] : blank;
      let label = o?.labels?.[i] ? `${input}:` : blank;
      styleDT += o?.labels?.[i] ? '1em;' : '.25em';
      inp += `<dt style="${styleDT}">${label}</dt>
      <dd style="${styleDD}${colour}">${value}</dd>`;
      ++i;
    }
    return inp;
  }
  buildControls(o) {
    let inp = '';
    let id = o.id;
    inp += `<span id="${id}_up" class="control up" data-icon="up">${up2}</span>`;
    inp += `<span id="${id}_down" class="control down" data-icon="down">${down2}</span>`;
    if (o?.type === 'indicator') {
      inp += `<span id="${id}_visible" class="control visible" data-icon="visible">${visible}</span>`;
      inp += `<span id="${id}_notVisible" class="control notvisible" data-icon="notVisible">${notVisible}</span>`;
    }
    if (o?.type !== 'indicator') {
      inp += `<span id="${id}_collapse" class="control collapse" data-icon="collapse">${collapse}</span>`;
      inp += `<span id="${id}_expand" class="control expand" data-icon="expand">${expand}</span>`;
      inp += `<span id="${id}_maximize" class="control maximize" data-icon="maximize">${maximize}</span>`;
      inp += `<span id="${id}_restore" class="control restore" data-icon="restore">${restore}</span>`;
    }
    inp +=
      o?.type !== 'chart'
        ? `<span id="${id}_remove" class="control remove" data-icon="remove">${close}</span>`
        : ``;
    inp +=
      o?.type !== 'secondary'
        ? `<span id="${id}_config" class="control config" data-icon="config">${config}</span>`
        : ``;
    return inp;
  }
}
customElements.get('tradex-legends') ||
  window.customElements.define('tradex-legends', tradeXLegends);

const template$9 = document.createElement('template');
template$9.innerHTML = `
<style>
  :host {
    overflow: hidden;
  }

  .viewport {
    position: relative;
    width: 100%;
    height: inherit;
    background: var(--txc-chartpane-background, none);
  }
  .viewport canvas {
    position: absolute;
    top: 1px;
  }
  tradex-legends {
    position: absolute;
    top: 0;
    left: 0;
    z-index:100;
    width: 100%;
  }
</style>
<div class="viewport"></div>
<tradex-legends></tradex-legends>
`;
class tradeXChartPane extends element {
  #elViewport;
  #elLegend;
  constructor() {
    super(template$9);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#elViewport = this.shadowRoot.querySelector('.viewport');
      this.#elLegend = this.shadowRoot.querySelector('tradex-legends');
    });
  }
  disconnectedCallback() {}
  get viewport() {
    return this.#elViewport;
  }
  get legend() {
    return this.#elLegend;
  }
}
customElements.get('tradex-chartpane') ||
  window.customElements.define('tradex-chartpane', tradeXChartPane);

const template$8 = document.createElement('template');
template$8.innerHTML = `
<style>
  slot[name="chartpane"] {
    display: flex;
    flex-direction: column;
  }
  ::slotted(tradex-chartpane) {
    display: block;
    position: relative;
    top: 0;
    width: 100%;
  }
  ::slotted(tradex-chartpane:first-of-type) {
    border-top: none !important;
  }
</style>
<slot name="chartpane" id="chartpane"></slot>
`;
class tradeXRows extends element {
  #oWidth;
  #oHeight;
  #widthCache;
  #heightCache;
  constructor() {
    super(template$8);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback();
    this.previousDimensions();
  }
  disconnectedCallback() {}
  get grid() {
    return this.shadowRoot.querySelector('tradex-grid');
  }
  get primary() {
    return Array.from(this.chartPaneSlot.assignedElements()).find((i) =>
      i.classList.contains('primary')
    );
  }
  get secondary() {
    return Array.from(this.chartPaneSlot.assignedElements()).find((i) =>
      i.classList.contains('secondary')
    );
  }
  get chartPanes() {
    return this.chartPaneSlot.assignedElements();
  }
  get chartPaneSlot() {
    return this.shadowRoot.querySelector('slot[name="chartpane"]');
  }
  get width() {
    return this.#widthCache;
  }
  get height() {
    return this.#heightCache;
  }
  get oWidth() {
    return this.#oWidth;
  }
  get oHeight() {
    return this.#oHeight;
  }
  get widthDeltaR() {
    return this.#widthCache / this.#oWidth;
  }
  get heightDeltaR() {
    return this.#heightCache / this.#oHeight;
  }
  previousDimensions() {
    this.#oWidth = this.#widthCache ? this.#widthCache : this.clientWidth;
    this.#oHeight = this.#heightCache ? this.#heightCache : this.clientHeight;
    this.#widthCache = this.clientWidth;
    this.#heightCache = this.clientHeight;
  }
}
customElements.get('tradex-rows') ||
  window.customElements.define('tradex-rows', tradeXRows);

const template$7 = document.createElement('template');
template$7.innerHTML = `
<style>
  :host {
    display: grid;
    grid-row-gap: 0;
    grid-template-rows: 1fr ${TIMESCALEH}px;
  }
  #viewport {
    position: absolute;
    width: 100%;
    height: inherit;
    background: var(--txc-chartpane-background, none);
    z-index: 0;
  }
  #viewport canvas {
    position: absolute;
  }
  tradex-rows {
    display: grid;
    grid-row: 1/2;
    overflow: hidden;
    width: 100%;
    border: 1px solid;
    border-color: var(--txc-border-color, ${GlobalStyle.COLOUR_BORDER}); 
  }
  tradex-time {
    grid-row: 2/3;
    width: 100%;
    overflow: hidden;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class tradeXMain extends element {
  #elRows;
  #elTime;
  #elViewPort;
  #theme;
  constructor() {
    super(template$7);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#elViewPort = this.shadowRoot.querySelector('#viewport');
      this.#elRows = this.shadowRoot.querySelector('tradex-rows');
      this.#elTime = this.shadowRoot.querySelector('tradex-time');
    });
  }
  disconnectedCallback() {}
  get viewport() {
    return this.#elViewPort;
  }
  get rows() {
    return this.#elRows;
  }
  get time() {
    return this.#elTime;
  }
  start(theme) {
    this.#theme = theme;
    this.setMain();
  }
  rowNode(type, style = '', api) {
    const node = `
      <tradex-chartpane slot="chartpane" class="${type}" style="${style}">
      </tradex-chartpane>
    `;
    return node;
  }
  scaleNode(type) {
    const styleRow = STYLE_ROW + ` width: 100%;`;
    const node = `
    <div slot="chartpane" class="viewport scale ${type}" style="$${styleRow}"></div>
  `;
    return node;
  }
  addRow(type, style = '', api, height) {
    let row;
    let node = this.rowNode(type, style, api);
    this.#elRows.insertAdjacentHTML('beforeend', node);
    row = this.#elRows.chartPaneSlot.assignedElements().slice(-1)[0];
    row.style.height = `${height}px`;
    return row;
  }
  removeRow(id) {
    const row = this.shadowRoot.querySelector(`#${id}`);
    if (!!row) {
      row.remove();
      return true;
    } else return false;
  }
  addScaleRow(type, height, elScale) {
    let axis;
    let node = this.scaleNode(type);
    elScale.insertAdjacentHTML('beforeend', node);
    axis = elScale.chartPaneSlot.assignedElements().slice(-1)[0];
    axis.style.height = `${height}px`;
    axis.style.width = `100%`;
    axis.height = height;
    axis.width = elScale.width;
    return axis;
  }
  setMain() {
    let timeH = isNumber(this.#theme?.time?.height)
      ? this.#theme.time.height
      : TIMEH;
    this.style.gridTemplateRows = `1fr ${timeH}px`;
  }
}
customElements.get('tradex-main') ||
  window.customElements.define('tradex-main', tradeXMain);

const template$6 = document.createElement('template');
template$6.innerHTML = `
  <slot></slot>
`;
class tradeXTools extends element {
  constructor() {
    super(template$6);
  }
  destroy() {}
  get icons() {
    return this.shadowRoot.querySelector('slot').assignedElements();
  }
  defaultNode(tools) {
    let toolbar = `
    <style>
      svg {
        height: ${ToolsStyle.ICONSIZE};
        width: ${ToolsStyle.ICONSIZE};
        fill: ${ToolsStyle.COLOUR_ICON};
      }
      svg:hover {
        fill: ${ToolsStyle.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${ToolsStyle.ICONSIZE};
        margin: 0 auto;
      }
    </style>
    `;
    for (const tool of tools) {
      toolbar += this.iconNode(tool);
    }
    return toolbar;
  }
  iconNode(tool) {
    const menu = 'sub' in tool ? `data-menu="true"` : '';
    return `
      <div id="${tool.id}" data-event="${tool.event}" ${menu} class="icon-wrapper">${tool.icon}</div>\n
    `;
  }
}
customElements.get('tradex-tools') ||
  window.customElements.define('tradex-tools', tradeXTools);

const template$5 = document.createElement('template');
template$5.innerHTML = `
<style>
  tradex-viewport {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: -100;
  }
  slot[name="chartpane"] {
    display: flex;
    flex-direction: column;
  }
  ::slotted(div.scale:first-of-type) {
    border-top: none !important;
  }
</style>
<tradex-viewport></tradex-viewport>
<slot name="chartpane" id="chartPane"></slot>
`;
class tradeXScale extends element {
  #elViewport;
  #elChartPanes;
  #elChartPaneSlot;
  constructor() {
    super(template$5);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#elViewport = this.shadowRoot.querySelector('tradex-viewport');
      this.#elChartPaneSlot = this.shadowRoot.querySelector(
        'slot[name="chartpane"]'
      );
      this.#elChartPanes = this.chartPaneSlot.assignedElements();
    });
  }
  get viewport() {
    return this.#elViewport;
  }
  get chartPanes() {
    return this.#elChartPanes;
  }
  get chartPaneSlot() {
    return this.#elChartPaneSlot;
  }
}
customElements.get('tradex-scale') ||
  window.customElements.define('tradex-scale', tradeXScale);

const template$4 = document.createElement('template');
const content = `
<style>
  :host {
    display: grid;
    grid-column-gap: 0;
    grid-template-columns: 0 0 1fr ${SCALEW}px 0;
    grid-template-rows: 1fr;
  }
  tradex-main, tradex-scale, tradex-tools {
    max-height: 100%;
    min-height: 100%;
    overflow: hidden;
  }
  tradex-tools {
    grid-column: 1/2;
  }
  tradex-scale:first-of-type {
    grid-column: 2/3;
  }
  tradex-main {
    grid-column: 3/4;
  }
  tradex-scale:last-of-type {
    grid-column: 4/5;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-scale></tradex-scale>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`;
template$4.innerHTML = content;
class tradeXBody extends element {
  #theme;
  #elTools;
  #elMain;
  #elScale;
  #elScale2;
  #gridTemplateColumns = {
    toolsLeft: `${TOOLSW}px`,
    scaleLeft: `0`,
    main: `1fr`,
    scaleRight: `${TOOLSW}px`,
    toolsRight: `0`
  };
  constructor() {
    super(template$4);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.style.display = 'grid';
      this.#elTools = this.shadowRoot.querySelector('tradex-tools');
      this.#elMain = this.shadowRoot.querySelector('tradex-main');
      this.#elScale = this.shadowRoot.querySelectorAll('tradex-scale')[1];
      this.#elScale2 = this.shadowRoot.querySelectorAll('tradex-scale')[0];
    });
  }
  get tools() {
    return this.#elTools;
  }
  get main() {
    return this.#elMain;
  }
  get scale() {
    return this.#elScale;
  }
  get scaleW() {
    return this.#elScale.width || this.#theme?.scale?.width || SCALEW;
  }
  get scale2W() {
    return this.#elScale.width || this.#theme?.scale?.width || SCALEW;
  }
  get toolsW() {
    return this.#elTools.width || this.#theme?.tools?.width || TOOLSW;
  }
  start(theme) {
    this.#theme = theme;
    this.setToolsLocation();
  }
  setYAxisWidth(width = this.scaleW) {
    width = isNumber(width) ? width : this.scaleW;
    this.setYAxisLocation(undefined, width);
  }
  setYAxisLocation(side = this.#theme?.yAxis?.location, width = this.scaleW) {
    switch (side) {
      case 'left':
        this.#gridTemplateColumns.scaleLeft = `${width}px`;
        this.#gridTemplateColumns.scaleRight = `0`;
        this.#elScale.style.gridColumn = '2/3';
        this.#elScale2.style.gridColumn = '4/5';
        this.#elScale.style.display = 'block';
        this.#elScale2.style.display = 'none';
        break;
      case 'both':
        this.#gridTemplateColumns.scaleLeft = `${width}px`;
        this.#gridTemplateColumns.scaleRight = `${width}px`;
        this.#elScale.style.gridColumn = '4/5';
        this.#elScale2.style.gridColumn = '2/3';
        this.#elScale.style.display = 'block';
        this.#elScale2.style.display = 'block';
        break;
      case 'right':
      default:
        this.#gridTemplateColumns.scaleLeft = `0`;
        this.#gridTemplateColumns.scaleRight = `${width}px`;
        this.#elScale.style.gridColumn = '4/5';
        this.#elScale2.style.gridColumn = '2/3';
        this.#elScale.style.display = 'block';
        this.#elScale2.style.display = 'none';
        break;
    }
    this.setGridColumns();
  }
  setToolsLocation(side = this.#theme?.tools?.location) {
    let toolsW = this.#theme?.tools?.location == 'none' ? 0 : this.toolsW;
    switch (side) {
      case 'none':
      case false:
        this.#gridTemplateColumns.toolsLeft = `0`;
        this.#gridTemplateColumns.toolsRight = `0`;
        this.#elTools.style.display = 'none';
        break;
      case 'right':
        this.#gridTemplateColumns.toolsLeft = `0`;
        this.#gridTemplateColumns.toolsRight = `${toolsW}px`;
        this.#elTools.style.gridColumn = '1/2';
        this.#elTools.style.display = 'block';
        break;
      case 'left':
      default:
        this.#gridTemplateColumns.toolsLeft = `${toolsW}px`;
        this.#gridTemplateColumns.toolsRight = `0`;
        this.#elTools.style.gridColumn = '5/6';
        this.#elTools.style.display = 'block';
        break;
    }
    this.setGridColumns();
  }
  setGridColumns() {
    this.style.gridTemplateColumns = Object.values(
      this.#gridTemplateColumns
    ).join(' ');
  }
}
customElements.get('tradex-body') ||
  window.customElements.define('tradex-body', tradeXBody);

const template$3 = document.createElement('template');
template$3.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class tradeXUtils extends element {
  constructor() {
    super(template$3);
  }
  destroy() {}
  get icons() {
    return this.shadowRoot.querySelector('slot').assignedElements()[0].children;
  }
  defaultNode(utils) {
    let style = `display: inline-block; float: right;`;
    let utilsBar = `
    <div style="${style}">
    <style>
      svg {
        height: ${UtilsStyle.ICONSIZE};
        fill: ${UtilsStyle.COLOUR_ICON};
      }
    </style>
    `;
    for (const util of utils) {
      utilsBar += this.iconNode(util);
    }
    return utilsBar + '</div>';
  }
  iconNode(util) {
    const iconStyle = `display: inline-block; height: ${UtilsStyle.ICONSIZE}; padding-top: 2px`;
    const menu = 'sub' in util ? `data-menu="true"` : '';
    return `
      <div id="TX_${util.id}" data-event="${util.event}" ${menu} class="icon-wrapper" style="${iconStyle}">${util.icon}</div>\n
    `;
  }
}
customElements.get('tradex-utils') ||
  window.customElements.define('tradex-utils', tradeXUtils);

const template$2 = document.createElement('template');
template$2.innerHTML = `
  <slot name="widget"></slot>
`;
class tradeXWidgets extends element {
  constructor() {
    super(template$2);
  }
  destroy() {}
}
customElements.get('tradex-widgets') ||
  window.customElements.define('tradex-widgets', tradeXWidgets);

const HTML = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
      display: grid;
      grid-row-gap: 0;
      grid-template-rows: ${UTILSH}px 1fr 0;
    }
    tradex-utils {
      grid-row: 1/2;
      width: 100%; 
    }
    tradex-body {
      grid-row: 2/3;
      width: 100%;
    }
    tradex-widgets {
      grid-row: 3/4;
      position: relative;
    }
  </style>
  <div style="display: none;">
    <slot></slot>
  </div>
  <tradex-utils></tradex-utils>
  <tradex-body></tradex-body>
  <tradex-widgets></tradex-widgets>
`;
const template$1 = document.createElement('template');
template$1.innerHTML = HTML;
class tradeXChart extends element {
  #elBody;
  #elUtils;
  #elWidgets;
  #template;
  #chartW = CHART_MINW;
  #chartH = CHART_MINH;
  #oWidth;
  #oHeight;
  #widthCache;
  #heightCache;
  #theme;
  #resizeEntries;
  constructor() {
    super(template$1, 'closed');
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ['config', 'disabled', 'height', 'stream', 'width'];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = false;
      this.shadowRoot.appendChild(template$1.content.cloneNode(true));
      this.init();
      this.#chartH = this.parentElement.clientHeight || CHART_MINH;
      this.#chartW = this.parentElement.clientWidth || CHART_MINW;
      let height = this.getAttribute('height') || '100%';
      let width = this.getAttribute('width') || '100%';
      this.setDimensions(width, height);
      this.resizeObserver = new ResizeObserver(
        debounce(this.onResized, 100, this)
      );
      this.resizeObserver.observe(this);
      this.start(defaultConfig);
    }
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
  attributeChangedCallback(prop, oldVal, newVal) {
    switch (prop) {
      case 'config':
        break;
      case 'disabled':
        break;
      case 'height':
        this.height(newVal);
        break;
      case 'width':
        this.width(newVal);
        break;
    }
  }
  init() {
    this.style.display = 'grid';
    this.style.minHeight = TX_MINH;
    this.#elWidgets = this.shadowRoot.querySelector('tradex-widgets');
    this.#elUtils = this.shadowRoot.querySelector('tradex-utils');
    this.#elBody = this.shadowRoot.querySelector('tradex-body');
  }
  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(d) {
    if (d) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
  get stream() {
    return true;
  }
  set stream(s) {}
  get elBody() {
    return this.#elBody;
  }
  get elUtils() {
    return this.#elUtils;
  }
  get elWidgets() {
    return this.#elWidgets;
  }
  get elWidgetsG() {
    return this.#elWidgets;
  }
  get elMain() {
    return this.#elBody.main;
  }
  get elTime() {
    return this.#elBody.main.time;
  }
  get elRows() {
    return this.#elBody.main.rows;
  }
  get elTools() {
    return this.#elBody.tools;
  }
  get elYAxis() {
    return this.#elBody.scale;
  }
  get width() {
    return this.#chartW;
  }
  get height() {
    return this.#chartH;
  }
  get resizeEntries() {
    return this.#resizeEntries;
  }
  elStart(theme) {
    this.#theme = theme;
    this.setUtilsLocation();
  }
  onResized(entries) {
    super.onResize(entries);
    const { width, height } = entries[0].contentRect;
    this.#chartW = width;
    this.#chartH = height;
    this.#resizeEntries = entries[0];
    if (this.ToolsBar instanceof ToolsBar) {
      this.ToolsBar.onResized();
    }
    this.log(`onResize w: ${width}, h: ${height}`);
    this.emit('global_resize', { w: width, h: height });
  }
  setWidth(w) {
    if (isNumber(w)) {
      w += 'px';
    } else if (isString(w) && w.match(CSSUNITS));
    else {
      w = '100%';
    }
    this.style.width = w;
    this.#chartW = Math.round(this.getBoundingClientRect().width);
  }
  setHeight(h) {
    if (isNumber(h)) {
      h += 'px';
    } else if (isString(h) && h.match(CSSUNITS));
    else {
      this.#chartH = this.parentElement.getBoundingClientRect().height;
      h = this.#chartH + 'px';
    }
    this.style.height = h;
    this.#chartH = Math.round(this.getBoundingClientRect().height);
  }
  setWidthMin(w) {
    this.style.minWidth = `var(--txc-min-width, ${w})`;
  }
  setHeightMin(h) {
    this.style.minHeight = `var(--txc-min-height, ${h})`;
  }
  setWidthMax(w) {
    this.style.minWidth = `var(--txc-max-width, ${w})`;
  }
  setHeightMax(h) {
    this.style.minHeight = `var(--txc-max-height, ${h})`;
  }
  setDimensions(w, h) {
    let dims;
    let width = this.width;
    let height = this.height;
    if (!w || !h) {
      const dims = this.getBoundingClientRect();
      const parent = this.parentElement.getBoundingClientRect();
      h = !dims.height
        ? !parent.height
          ? CHART_MINH
          : parent.height
        : dims.height;
      w = !dims.width
        ? !parent.width
          ? CHART_MINW
          : parent.width
        : dims.width;
    } else if (!isNumber(w) || !isNumber(h)) {
      if (!isString(w) || !w.match(CSSUNITS)) {
        w = '100%';
      }
      if (!isString(h) || !h.match(CSSUNITS)) {
        h = '100%';
      }
    }
    this.setWidth(w);
    this.setHeight(h);
    dims = {
      width: this.width,
      height: this.height,
      resizeW: w / width,
      resizeH: h / height,
      resizeWDiff: w - width,
      resizeHDiff: h - height
    };
    return dims;
  }
  setUtilsLocation(pos = this.#theme?.utils?.location) {
    this.#theme.utils = this.#theme?.utils || {};
    const utilsH =
      isNumber(this.#theme.uitils?.height) && this.#theme.utils.height > 0
        ? this.#theme.uitils.height
        : UTILSH;
    switch (pos) {
      case 'top':
      case true:
        this.#theme.utils.location = 'top';
        this.#theme.utils.height = utilsH;
        this.style.gridTemplateRows = `${utilsH}px 1fr`;
        this.elBody.style.minHeight = `${CHART_MINH - utilsH}px`;
        break;
      case 'none':
      case false:
      default:
        this.#theme.utils.location = 'none';
        this.#theme.utils.height = 0;
        this.elUtils.style.display = 'none';
        this.style.gridTemplateRows = `0 1fr`;
        this.elBody.style.minHeight = `${CHART_MINH}px`;
        break;
    }
  }
}

var utilsList = [
  {
    id: 'indicators',
    name: 'Indicators',
    icon: chart,
    event: 'utils_indicators',
    sub: []
  },
  {
    id: 'timezone',
    name: 'Timezone',
    icon: clock,
    event: 'utils_timezone'
  },
  {
    id: 'screenshot',
    name: 'Screenshot',
    icon: camera,
    event: 'utils_screenshot'
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: config,
    event: 'utils_settings'
  }
];

class UtilsBar extends Component {
  #name = 'Utilities';
  #shortName = 'utils';
  #elUtils;
  #utils;
  #location;
  #widgets;
  #indicators;
  #menus = {};
  #utilsEvents = {};
  #timers = {};
  constructor(core, options) {
    super(core, options);
    this.#elUtils = core.elUtils;
    this.#utils = core.config?.utilsBar || utilsList;
    this.#widgets = core.WidgetsG;
    this.#indicators = core.indicatorsPublic || indicators;
    this.#location = core.config.theme?.utils?.location || 'none';
    if (
      !!this.#location ||
      this.#location == 'none' ||
      !UTILSLOCATIONS.includes(this.#location)
    ) {
      this.core.style.gridTemplateRows = `0 1fr`;
    }
    this.#elUtils.innerHTML = this.#elUtils.defaultNode(this.#utils);
  }
  get name() {
    return this.#name;
  }
  get shortName() {
    return this.#shortName;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return elementDimPos(this.#elUtils);
  }
  get location() {
    return this.#location;
  }
  start() {
    this.initAllUtils();
    this.eventsListen();
    this.log(`Utils Bar ${this.#name} instantiated and running`);
  }
  destroy() {
    const api = this.core;
    const utils = findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`);
    for (let util of utils) {
      let id = util.id.replace('TX_', '');
      for (let u of this.#utils) {
        if (u.id === id)
          util.removeEventListener('click', this.#utilsEvents[id].click);
        util.removeEventListener(
          'pointerover',
          this.#utilsEvents[id].pointerover
        );
        util.removeEventListener(
          'pointerout',
          this.#utilsEvents[id].pointerout
        );
      }
    }
    this.core.hub.expunge(this);
  }
  eventsListen() {
    this.on('utils_indicators', this.onIndicators, this);
    this.on('utils_timezone', this.onTimezone, this);
    this.on('utils_settings', this.onSettings, this);
    this.on('utils_screenshot', this.onScreenshot, this);
  }
  onIconClick(e) {
    const target = findTargetParentWithClass(e.target, 'icon-wrapper');
    if (!isObject(target)) return false;
    const now = Date.now();
    if (now - this.#timers[target.id] < 1000) return false;
    this.#timers[target.id] = now;
    let evt = target.dataset.event;
    let menu = target.dataset.menu || false,
      data = {
        target: target.id,
        menu: menu,
        evt: evt
      };
    let action = target.dataset.action;
    this.emit(evt, data);
    if (menu) this.emit('menu_open', data);
    else {
      this.emit('util_selected', data);
    }
    if (action) action(data, this.core);
  }
  onIconOver(e) {
    const svg = e.currentTarget.querySelector('svg');
    svg.style.fill = UtilsStyle.COLOUR_ICONHOVER;
  }
  onIconOut(e) {
    const svg = e.currentTarget.querySelector('svg');
    svg.style.fill = UtilsStyle.COLOUR_ICON;
  }
  initAllUtils() {
    const utils = this.#elUtils.querySelectorAll(`.icon-wrapper`);
    for (let util of utils) {
      this.#timers[util.id] = 0;
      let id = util.id.replace('TX_', ''),
        svg = util.querySelector('svg');
      svg.style.fill = UtilsStyle.COLOUR_ICON;
      svg.style.height = '90%';
      for (let u of this.#utils) {
        if (u.id === id) {
          this.#utilsEvents[id] = {};
          this.#utilsEvents[id].click = this.onIconClick.bind(this);
          this.#utilsEvents[id].pointerover = this.onIconOver.bind(this);
          this.#utilsEvents[id].pointerout = this.onIconOut.bind(this);
          util.addEventListener('click', this.#utilsEvents[id].click);
          util.addEventListener(
            'pointerover',
            this.#utilsEvents[id].pointerover
          );
          util.addEventListener('pointerout', this.#utilsEvents[id].pointerout);
          if (id === 'indicators') u.sub = Object.values(this.#indicators);
          if (u?.sub) {
            let config = {
              content: u.sub,
              primary: util
            };
            let menu = this.#widgets.insert('Menu', config);
            util.dataset.menu = menu.id;
            menu.start();
          }
        }
      }
    }
  }
  onIndicators(data) {}
  onTimezone(data) {
    this.core.notImplemented();
  }
  onSettings(data) {
    this.core.notImplemented();
  }
  onScreenshot(data) {
    this.core.downloadImage();
  }
}

const MENUMINWIDTH = 150;
class Menu {
  #id;
  #widgets;
  #core;
  #config;
  #elWidgetsG;
  #elMenus;
  #elMenu;
  #cursorPos;
  #controller;
  #menuEvents = {};
  static {
    this.menuList = {};
  }
  static {
    this.menuCnt = 0;
  }
  static {
    this.class = CLASS_MENUS;
  }
  static {
    this.Name = 'Menus';
  }
  static {
    this.type = 'menu';
  }
  static create(widgets, config) {
    const id = `menu_${++Menu.menuCnt}`;
    config.id = id;
    Menu.menuList[id] = new Menu(widgets, config);
    return Menu.menuList[id];
  }
  static destroy(id) {
    Menu.menuList[id].end();
    delete Menu.menuList[id];
  }
  constructor(widgets, config) {
    this.#widgets = widgets;
    this.#core = config.core;
    this.#config = config;
    this.#id = config.id;
    this.#elMenus = widgets.elements[Menu.type];
    this.#elWidgetsG = this.#core.elWidgetsG;
    this.mount(this.#elMenus);
  }
  get el() {
    return this.#elMenu;
  }
  get id() {
    return this.#id;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return elementDimPos(this.#elMenu);
  }
  get type() {
    return Menu.type;
  }
  start() {
    this.position();
    this.eventsListen();
  }
  end() {
    const menuItems = this.#elMenus.querySelectorAll(`#${this.id} li`);
    menuItems.forEach((item) => {
      item.removeEventListener('click', this.#menuEvents[this.id][item.id]);
    });
    document.removeEventListener('click', this.#menuEvents[this.id].outside);
    this.off('global_resize', this.onResize, this);
  }
  eventsListen() {
    const menuItems = this.#elMenus.querySelectorAll(`#${this.id} li`);
    this.#menuEvents[this.id] = {};
    menuItems.forEach((item) => {
      this.#menuEvents[this.id][item.id] = this.onMenuSelect.bind(this);
      item.addEventListener('click', this.#menuEvents[this.id][item.id]);
    });
    this.on('global_resize', this.onResize, this);
  }
  on(topic, handler, context = this) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler, context = this) {
    this.#core.off(topic, handler, context);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMenuSelect(e) {
    let evt = e.currentTarget.dataset.event,
      data = {
        target: e.currentTarget.id,
        menu: this.#id,
        evt: evt
      };
    this.emit('menuItem_selected', data);
    this.emit('menu_close', data);
    this.#core.log(`menu_close: ${this.#id}`);
  }
  onOutsideClickListener(e) {
    if (
      !this.#elMenu.contains(e.target) &&
      !this.#config.primary.contains(e.target) &&
      isVisible(this.#elMenu)
    ) {
      let data = {
        target: e.currentTarget.id,
        menu: this.#id
      };
      this.emit('menu_close', data);
    }
    document.removeEventListener('click', this.#menuEvents[this.id].outside);
  }
  onResize() {
    this.position();
  }
  mount(el) {
    if (el.lastElementChild == null) el.innerHTML = this.menuNode();
    else el.lastElementChild.insertAdjacentHTML('afterend', this.menuNode());
    this.#elMenu = this.#elMenus.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    const menuStyle = ``;
    const node = `
      <div slot="widget" class="${CLASS_MENUS}" style="${menuStyle}"></div>
    `;
    return node;
  }
  menuNode() {
    const menu = this.#config;
    const menuStyle = `position: absolute; z-index: 1000; display: none; border: 1px solid ${MenuStyle.COLOUR_BORDER}; background: ${MenuStyle.COLOUR_BG}; color: ${MenuStyle.COLOUR_TXT}; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;`;
    let content = this.content(menu);
    let node = `
      <div id="${menu.id}" class="${CLASS_MENU}" style="${menuStyle}">
        ${content}
      </div>
    `;
    return node;
  }
  content(menu) {
    const listStyle = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${MENUMINWIDTH}px`;
    const itemStyle = 'padding: .25em 1em .25em 1em; white-space: nowrap;';
    const shortStyle = 'display: inline-block; width: 4em;';
    const cPointer = 'cursor: pointer;';
    const over = `onmouseover="this.style.background ='#222'"`;
    const out = `onmouseout="this.style.background ='none'"`;
    let content = `<ul style="${listStyle}">`;
    if (menu?.content) {
      for (let i of menu.content) {
        content += `<li id="${i.id}" data-event="${i.event}" style="${itemStyle} ${cPointer}" ${over} ${out}><a style="${cPointer}"><span style="${shortStyle}">${i.id}</span><span>${i.name}</span></li></a>`;
      }
    }
    content += '</ul>';
    return content;
  }
  position() {
    let wPos = this.#elWidgetsG.getBoundingClientRect();
    let iPos = this.#config.primary.getBoundingClientRect();
    let left = Math.round(iPos.left - wPos.left);
    let top = Math.round(iPos.bottom - wPos.top);
    this.#elMenu.style.left = left + 'px';
    this.#elMenu.style.top = top + 'px';
    let pos = elementDimPos(this.#elMenu);
    if (pos.right > this.#elWidgetsG.offsetWidth) {
      let o = Math.floor(this.#elWidgetsG.offsetWidth - pos.width);
      o = limit(o, 0, this.#elWidgetsG.offsetWidth);
      this.#elMenu.style.left = `${o}px`;
    }
    let bottom = this.#core.MainPane.rowsH + top + pos.height;
    if (bottom > this.#core.MainPane.rowsH) {
      let o = Math.floor(pos.height * -1);
      o = limit(o, this.#core.MainPane.rowsH * -1, 0);
      this.#elMenu.style.top = `${o}px`;
    }
  }
  remove() {}
  open() {
    if (Menu.currentActive === this) return true;
    Menu.currentActive = this;
    this.#elMenu.style.display = 'block';
    this.position();
    setTimeout(() => {
      this.#menuEvents[this.id].outside =
        this.onOutsideClickListener.bind(this);
      document.addEventListener('click', this.#menuEvents[this.id].outside);
    }, 250);
  }
  close() {
    Menu.currentActive = null;
    this.#elMenu.style.display = 'none';
    this.emit('menuClosed', this.id);
  }
}

class Dialogue extends Window {
  static {
    this.Name = 'Dialogues';
  }
  static {
    this.type = 'dialogue';
  }
  static {
    this.class = 'tradeXdialogue';
  }
  static {
    this.defaultStyles = `
  /** default Dialogue widget styles */
  `;
  }
  static create(widgets, cfg) {
    cfg.dragBar = isBoolean(cfg?.dragBar) ? cfg.dragBar : true;
    cfg.close = isBoolean(cfg?.close) ? cfg.close : true;
    cfg.type = cfg?.type || Dialogue.type;
    cfg.class = cfg?.class || 'dialogue';
    cfg.id = cfg?.id || uid('dialogue');
    return super.create(widgets, cfg);
  }
  static defaultNode() {
    const windowStyle = ``;
    const node = `
      <div slot="widget" class="tradeXdialogue" style="${windowStyle}">
      </div>
    `;
    return node;
  }
  constructor(widgets, config) {
    super(widgets, config);
  }
  destroy() {
    super.destroy();
  }
  get type() {
    return Dialogue.type;
  }
  dialogueBuild(content = '', buttons = []) {
    let modifiers = { buttons: {} };
    let buttonHTML = `
    <input class="submit" type="submit" value="Submit"/>
    <input class="cancel" type="button" value="Cancel"/>
    <input class="default" type="button" value="Default"/>
    `;
    if (isArray(buttons) && buttons.length > 1);
    else {
      modifiers.submit = this.provideEventListeners(`input.submit`, [
        {
          event: 'click',
          fn: (e) => {
            if (isFunction(this.parent.onConfigDialogueSubmit))
              this.parent.onConfigDialogueSubmit(this);
          }
        }
      ]);
      modifiers.cancel = this.provideEventListeners(`input.cancel`, [
        {
          event: 'click',
          fn: (e) => {
            if (isFunction(this.parent.onConfigDialogueCancel))
              this.parent.onConfigDialogueCancel(this);
          }
        }
      ]);
      modifiers.default = this.provideEventListeners(`input.default`, [
        {
          event: 'click',
          fn: (e) => {
            if (isFunction(this.parent.onConfigDialogueDefault))
              this.parent.onConfigDialogueDefault(this);
          }
        }
      ]);
    }
    const html = `
    ${new String(content)}
    <div class="buttons">
      ${buttonHTML}
    </div>
    `;
    return { html, modifiers };
  }
  provideEventListener(selector, event, fn) {
    const listeners = [{ event, fn }];
    return this.provideEventListeners(selector, listeners);
  }
  provideEventListener(selector, event, fn) {
    const listeners = [{ event, fn }];
    return this.provideEventListeners(selector, listeners);
  }
  provideEventListeners(selector, listeners) {
    const func = (el) => {
      const elm = el.querySelector(selector);
      if (!!elm) {
        for (let l of listeners) {
          elm.addEventListener(l.event, (e) => {
            l.fn(e);
          });
        }
      }
    };
    return func;
  }
}

const tabStyles = `
/** default Config Dialogue widget styles */

.tabbedContent {
  overflow: hidden;
}

.tabbedContent .content {
  padding: 0;
}
.tabbedContent .tabs {
  display: flex;
  flex-wrap: wrap;
  background: #e5e5e588;
  box-shadow: 0 48px 80px -32px rgba(0,0,0,0.3);
  width: 300px;
}
.tabbedContent .input {
  position: absolute;
  opacity: 0;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.tabbedContent .label {
  position: relative;
  width: auto;
  padding: .4em 1em;
  background: #e5e5e588;
  cursor: pointer;
  font-weight: bold;
  color: #7f7f7f;
  transition: background 0.1s, color 0.1s;
}
.tabbedContent .label:hover {
  background: #d8d8d8;
}
.tabbedContent .label:active {
  background: #ccc;
}
.tabbedContent label:has(> input:checked) {
  background: #fff;
  color: #000;
}
.tabbedContent .panel {
  display: none;
  padding: 1em 1em 1.5em;
  background: #ffffff88;
  order: 100;
}
.tabbedContent label:has(> input:checked) + .panel {
  display: grid;
  width: 100%;
  grid-template-columns: [label] 1fr [input] 10em [end];
  grid-row-gap: 2px;
  align-items: center;
}
.tabbedContent .panel label,
.tabbedContent .panel input {
  ${GlobalStyle.FONTSTRING}
  padding: 1px 2px;
}
.tabbedContent .panel label {
  grid-column-start: label;
  grid-column-end: input;
  color: #444;
  font-weight: bold;
}
.tabbedContent .panel input {
  border: 1px solid #888;
}
.tabbedContent .panel input[type="color"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 3em;
  height: 2em;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  border: none;
}
.tabbedContent .panel input[type="color"]::-webkit-color-swatch,
.tabbedContent .panel input[type="color"]::-moz-color-swatch {
  border-radius: 0;
  padding: 1px;
  margin 0;
  border-radius: 3px;
  border: 1px solid #000;
  height: 2em;
  background: #fff;
}
`;
const template = document.createElement('template');
template.innerHTML = `
<style>
  ${tabStyles}
}
</style>
<div class="tabbedContent">
</div>
`;
class tradeXTabs extends element {
  #id;
  #elTabs;
  #tabsSlot;
  #tabs;
  #onSlotChange = this.onSlotChange.bind(this);
  constructor() {
    super(template);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#elTabs = this.shadowRoot.querySelector('.tabbedContent');
      this.#tabsSlot = this.shadowRoot.querySelector(
        'slot[name="viewporttabs"]'
      );
      this.#tabsSlot.addEventListener('slotchange', this.#onSlotChange);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.#tabsSlot.removeEventListener('slotchange', this.#onSlotChange);
  }
  get hastabsSlot() {
    return true;
  }
  get tabsSlot() {
    return this.#tabsSlot;
  }
  get tabs() {
    return this.#tabs;
  }
  onSlotChange() {
    this.#tabs = Array.from(this.tabsSlot.assignedElements()).find(
      (i) => i.localName === 'tabs'
    )[0];
  }
  insertTab(t) {
    let { id, label, content, checked } = t;
    switch (typeof id) {
      case 'string':
      case 'number':
        break;
      default:
        id = this.#tabs.length;
    }
    let tab = tabsPanel(id, label, content, checked);
    tab = this.#elTabs.insertAdjacentHTML('afterend', tab);
    this.#tabs.push({ id, label, content, checked, tab });
  }
  removeTab(t) {
    if (isString(t)) {
      let tab = this.#elTabs.querySelectorAll(`.tab-${t}`);
      for (let d of tab) {
        d.remove();
      }
      for (let d = 0; d < this.#tabs.length; d++) {
        if (this.#tabs[d].id == t) delete this.#tabs[d];
      }
    } else if (isNumber(t)) {
      this.#elTabs.querySelectorAll(`.input`);
    }
  }
}
class Tabs {
  static #cnt;
  static {
    this.defaultStyles = tabStyles;
  }
  static create(config) {
    if (!isObject(config)) config = {};
    config.id = config?.id || Tabs.#cnt++;
    const tabs = new Tabs(config);
    return tabs;
  }
  #id;
  #element;
  #elementHtML;
  constructor(config) {
    this.#id = config.id;
    this.#elementHtML = tabsElement(config.params);
    if (isHTMLElement(config?.element)) {
      this.#element = config.element;
      this.#element.innerHTML = this.#elementHtML;
    }
  }
}
function tabsElement(c = {}) {
  if (!isObject(c)) c = {};
  const element = `
  <div class="tabs">
    ${tabsBuild(c)}
  </div>
  `;
  return element;
}
function tabsBuild(c = {}, fn) {
  if (!isObject(c)) c = {};
  let tabs = ``;
  let t = Object.keys(c);
  let i = t.length;
  if (i < 1) {
    tabs += tabsPanel(
      1,
      'Question',
      'Why did the chicken cross the road?',
      true
    );
    tabs += tabsPanel(2, 'Answer', 'To get to the other side.');
  } else {
    let j = [];
    for (--i; i >= 0; i--) {
      let f = i == 0 ? true : false;
      let content = isFunction(fn) ? fn(c[t[i]]) : c[t[i]];
      j.push(tabsPanel(i, t[i], content, f));
    }
    tabs = j.reverse().join('&nbsp;');
  }
  return tabs;
}
function tabsPanel(id, label, content, checked = false) {
  content = isString(content) ? content : ``;
  const check = !!checked ? `checked="checked"` : ``;
  const tab = `
  <label class="label tab_${id}" for="tab_${id}">
    <span>${label}</span>
    <input class="input tab_${id}" name="tabs" type="radio" id="tab_${id}" ${check}/>
  </label>
  <div class="panel tab_${id}">
    ${content}
  </div>
  `;
  return tab;
}
customElements.get('tradex-tabs') ||
  window.customElements.define('tradex-tabs', tradeXTabs);

class ConfigDialogue extends Dialogue {
  static {
    this.Name = 'ConfigDialogues';
  }
  static {
    this.type = 'configDialogue';
  }
  static {
    this.class = 'tradeXconfig';
  }
  static {
    this.defaultStyles = `
  /** default Config Dialogue widget styles */
  
  .tradeXwindow.config {
    /* overflow: hidden; */
    background: none;
  }

  .tradeXwindow.config.active .content {
    padding: 0;
    position: relative;
  }

  .tradeXwindow.config.active .buttons {
    background: #ffffffbb;
    display: flex;
    justify-content: flex-end;
    padding: 3px 1em;
    border-radius: 0 0 5px 5px;
  }

  .tradeXwindow.config.active .buttons input {
    margin-left: 5px;
    font-size: 1em;
    padding: 1px .5em;
  }

  ${tabStyles} 
  `;
  }
  static create(widgets, config) {
    config.dragBar = true;
    config.close = true;
    config.type = ConfigDialogue.type;
    config.class = 'config';
    config.id = uid('config');
    return new ConfigDialogue(widgets, config);
  }
  static defaultNode() {
    const windowStyle = ``;
    const node = `
      <div slot="widget" class="tradeXconfig" style="${windowStyle}">
      </div>
    `;
    return node;
  }
  #update = true;
  constructor(widgets, config) {
    super(widgets, config);
  }
  destroy() {
    super.destroy();
    this.elColourPicker.destroy();
  }
  set update(u) {
    this.#update = !!u;
  }
  get update() {
    return this.#update;
  }
  configBuild(contObj = {}) {
    let { content, modifiers = {} } = this.configContent(contObj);
    const tabsHTML = `
    <div class="tabbedContent">
      <form class="tabs">
        ${tabsBuild(content)}
      </form>
    </div>
    `;
    const { html, modifiers: mods } = super.dialogueBuild(tabsHTML);
    modifiers = { ...modifiers, ...mods };
    return { html, modifiers };
  }
  configContent(cfgObj) {
    if (!isObject(cfgObj)) return `<p>Config content missing!</p>`;
    let obj;
    let content = {};
    let modifierList = {};
    for (let i in cfgObj) {
      content[i] = '';
      if (isArray(cfgObj[i])) {
        for (let j of cfgObj[i]) {
          for (let k in j.style) {
            obj = j.style[k];
            if (!isObject(obj)) continue;
            this.configEntryFields(i, obj, content, modifierList);
          }
        }
      } else if (isObject(cfgObj[i])) {
        content[i] = '';
        for (let j in cfgObj[i]) {
          obj = cfgObj[i][j];
          this.configEntryFields(i, obj, content, modifierList);
        }
      } else {
        this.core.error(`ERROR: Building Config Dialogue : Input malformed`);
        continue;
      }
    }
    return { content, modifiers: modifierList };
  }
  configEntryFields(i, input, content, modifierList) {
    let id = isString(input.entry) ? input.entry : '';
    let label = isString(input.label) ? input.label : id;
    switch (input.type) {
      case 'select':
        content[i] += htmlSelect(label, input);
        break;
      default:
        content[i] += htmlInput(label, input);
        break;
    }
    modifierList[id] = input['$function'];
  }
  contentUpdate(update) {
    if (!isObject(update)) return false;
    if (isString(update?.title)) this.setTitle(update.title);
    if (isString(update?.content))
      this.setContent(this.configBuild(update.content));
    this.#update = true;
    return this.#update;
  }
  provideInputColor(el, selector) {
    const input = el.querySelector(selector);
    const colourInput = document.createElement('tradex-colourinput');
    input.type = 'text';
    input.pattern = RGBAHex;
    colourInput.setTarget(input);
    colourInput.style.display = 'inline-block';
  }
}

class ColourPicker extends Dialogue {
  static {
    this.Name = 'ColourPicker';
  }
  static {
    this.type = 'colourPicker';
  }
  static {
    this.class = 'tradeXcolourPicker';
  }
  static {
    this.defaultStyles = `
  /** default Colour Picker widget styles */

  .tradeXwindow.picker {
    overflow: hidden;
  }

  .tradeXwindow.picker .content {
    padding: 0;
  }
  `;
  }
  static create(widgets, config) {
    config.dragBar = true;
    config.close = true;
    config.type = ColourPicker.type;
    config.class = 'picker';
    config.id = uid('picker');
    return new ColourPicker(widgets, config);
  }
  static defaultNode() {
    const windowStyle = ``;
    const node = `
      <div slot="widget" class="tradeXcolourPicker" style="${windowStyle}">
      </div>
    `;
    return node;
  }
  #update = true;
  #elColourPicker;
  constructor(widgets, config) {
    super(widgets, config);
  }
  destroy() {
    super.destroy();
  }
  set update(u) {
    this.#update = !!u;
  }
  get update() {
    return this.#update;
  }
  get elColourPicker() {
    return this.#elColourPicker;
  }
  start() {
    const element = document.createElement('tradex-colourpicker');
    this.elContent.appendChild(element);
    this.#elColourPicker = element;
  }
  open(data = {}) {
    this.#elColourPicker.colour = data?.params?.colour;
    super.open(data);
  }
}

class Progress {
  static {
    this.progressList = {};
  }
  static {
    this.progressCnt = 0;
  }
  static {
    this.class = CLASS_PROGRESS;
  }
  static {
    this.type = 'progress';
  }
  static {
    this.Name = 'Progress';
  }
  static {
    this.icons = {
      loadingBars,
      loadingSpin
    };
  }
  static defaultNode() {
    const progressStyle = ``;
    const node = `
      <div slot="widget" class="${CLASS_PROGRESS}" style="${progressStyle}"></div>
    `;
    return node;
  }
  static create(widgets, config) {
    const id = `progress_${++Progress.progressCnt}`;
    config.id = id;
    Progress.progressList[id] = new Progress(widgets, config);
    return Progress.progressList[id];
  }
  static destroy(id) {
    Progress.progressList[id].destroy();
    delete Progress.progressList[id];
  }
  #id;
  #widgets;
  #core;
  #config;
  #elWidgetsG;
  #elProgress;
  #elProg;
  #elIcon;
  constructor(widgets, config) {
    this.#widgets = widgets;
    this.#core = config.core;
    this.#config = config;
    this.#id = config.id;
    this.#elProgress = widgets.elements[Progress.type];
    this.#elWidgetsG = this.#core.elWidgetsG;
    this.init();
  }
  destroy() {
    this.#elProgress.remove();
  }
  get type() {
    return Progress.type;
  }
  init() {
    this.mount(this.#elProgress);
  }
  start() {
    if (
      !isObject(this.#core.config?.progress) ||
      !isObject(this.#core.config.progress?.loading)
    )
      return false;
    this.#elProg.style.display = 'block';
    const x = this.#core.elBody.width / 2 - this.#elProg.clientWidth / 2;
    const y = this.#core.elBody.height / -2 - this.#elProg.clientHeight / 2;
    this.#elProg.style.top = `${y}px`;
    this.#elProg.style.left = `${x}px`;
  }
  stop() {
    this.#elProg.style.display = 'none';
  }
  progressNode(p) {
    const progressStyle = `position: absolute; z-index: 1000; display: none; justify-content: center; align-items: center;`;
    const contentStyle = ``;
    const content = `<div class="content" style="${contentStyle}">${p.icon}</div>`;
    let node = `
      <div id="${this.#config.id}" class="progress ${p.type}" style="${progressStyle}">${content}</div>
    `;
    return node;
  }
  mount(el) {
    let type = 'loadingBars';
    if (this.#config?.type in Progress.icons) type = this.#config?.type;
    const p = { type, icon: Progress.icons[type] };
    if (el.lastElementChild == null) el.innerHTML = this.progressNode(p);
    else
      el.lastElementChild.insertAdjacentHTML('afterend', this.progressNode(p));
    this.#elProg = this.#elProgress.querySelector(`#${this.#config.id}`);
    this.#elIcon = this.#elProg.querySelector(`svg`);
    this.#elIcon.style.fill = `${ProgressStyle.COLOUR_ICONHOVER};`;
  }
}

var stateMachineConfig = {
  id: 'widgets',
  initial: 'idle',
  context: {},
  states: {
    idle: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        menu_open: {
          target: 'menu_open',
          action(data) {}
        },
        window_open: {
          target: 'window_open',
          action(data) {}
        }
      }
    },
    menu_open: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        menu_close: {
          target: 'idle',
          action(data) {}
        }
      }
    },
    window_open: {
      onEnter(data) {},
      onExit(data) {},
      on: {
        window_close: {
          target: 'idle',
          action(data) {}
        }
      }
    }
  }
};

class Widgets extends Component {
  #name = 'Widgets';
  #shortName = 'widgets';
  #widgets;
  #widgetsList = { Divider, Progress, Menu, Window, Dialogue, ConfigDialogue };
  #widgetsInstances = {};
  #elements = {};
  #elWidgetsG;
  #width;
  #height;
  constructor(core, options) {
    super(core, options);
    this.#widgets = { ...this.#widgetsList, ...options.widgets };
    this.#elWidgetsG = core.elWidgetsG;
    this.mount(this.#elWidgetsG);
    for (let i in this.#widgets) {
      let widget = this.#widgets[i];
      let entry = `${widget.type}`;
      this.#elements[entry] = this.#elWidgetsG.querySelector(
        `.${widget.class}`
      );
      this.#elements[entry].innerHTML = `
      <style title="${widget.type}">
        ${widget?.defaultStyles || ''}
      </style>
      `;
      widget.stylesInstalled = true;
    }
  }
  get name() {
    return this.#name;
  }
  get shortName() {
    return this.#shortName;
  }
  get elements() {
    return this.#elements;
  }
  get instances() {
    return this.#widgetsInstances;
  }
  get types() {
    return this.#widgets;
  }
  start() {
    this.eventsListen();
    stateMachineConfig.id = this.id;
    stateMachineConfig.context = this;
    this.stateMachine = stateMachineConfig;
    this.stateMachine.start();
  }
  destroy() {
    this.core.hub.expunge(this);
    this.stateMachine.destroy();
    for (let i in this.#widgetsInstances) {
      this.delete(i);
    }
    for (let t in this.#widgets) {
      this.#widgets[t].destroy();
    }
  }
  eventsListen() {
    this.on('resize', this.onResize, this);
    this.on('menu_open', this.onOpenMenu, this);
    this.on('menu_close', this.onCloseMenu, this);
    this.on('menu_off', this.onCloseMenu, this);
    this.on('menuItem_selected', this.onMenuItemSelected, this);
    this.on('global_resize', this.onResize, this);
  }
  onOpenMenu(data) {
    this.#widgetsInstances[data.menu].open();
  }
  onCloseMenu(data) {
    this.#widgetsInstances[data.menu].close();
  }
  onMenuItemSelected(e) {
    this.emit(e.evt, e.target);
  }
  onResize(dimensions) {
    this.setDimensions(dimensions);
    this.elements.divider.style.width = `${this.core.width}px`;
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
  }
  setWidth(w) {
    this.#width = w;
  }
  setHeight(h) {
    this.#height = h;
  }
  setDimensions(dimensions) {
    this.setWidth(dimensions.mainW);
    this.setHeight(dimensions.mainH);
  }
  defaultNode() {
    let nodes = ``,
      types = [];
    for (let i in this.#widgets) {
      let widget = this.#widgets[i];
      if (types.indexOf(widget.type) === -1) {
        nodes += widget.defaultNode();
        types.push(widget.type);
      }
    }
    return nodes;
  }
  insert(type, config) {
    if (!(type in this.#widgets) || !isObject(config)) return false;
    config.core = this.core;
    const widget = this.#widgets[type].create(this, config);
    this.#widgetsInstances[widget.id] = widget;
    return widget;
  }
  delete(id) {
    if (!isString(id) || !(id in this.#widgetsInstances)) return false;
    const type = this.#widgetsInstances[id].type;
    this.#widgets[type].destroy(id);
    return true;
  }
}

function exportImage(core, dest, type, quality, output, watermark) {
  const theme = core.theme;
  const container = document.createElement('template');
  const time = core.Timeline.graph.viewport.scene;
  const main = core.MainPane;
  const mainScene = main.graph.viewport.scene;
  const width = main.width;
  const height = main.height;
  const imgViewport = new CEL.Viewport({
    width: width,
    height: height,
    container: container
  });
  const ctx = imgViewport.scene.context;
  let y = 0;
  let x1 = 0;
  let x2 = width - core.Chart.scale.width;
  if (theme?.yAxis?.location == 'left') {
    x1 = core.Chart.scale.width;
    x2 = 0;
  }
  let opts;
  ctx.save();
  renderRectFill(ctx, 0, 0, width, height, { fill: theme.chart.Background });
  ctx.drawImage(mainScene.canvas, x1, 0, mainScene.width, mainScene.height);
  for (const [key, value] of core.ChartPanes) {
    let scene = value.graph.viewport.scene;
    let { width, height } = scene;
    let scale = value.scale.graph.viewport.scene;
    let { width: w, height: h } = scale;
    if (y > 0) {
      opts = { stroke: theme.divider.line };
      renderLineHorizontal(ctx, y, 0, main.width, opts);
    }
    ctx.drawImage(scene.canvas, x1, y, width, height);
    ctx.drawImage(scale.canvas, x2, y - 1, w, h);
    y += height;
  }
  ctx.drawImage(time.canvas, 0, y, time.width, time.height);
  opts = {
    text: core.config.title,
    colour: theme.chart.TextColour,
    fontSize: theme.chart.FontSize * 1.5,
    fontWeight: 'normal',
    fontFamily: theme.chart.FontFamily,
    textBaseLine: 'top'
  };
  renderText(ctx, 6, 6, opts);
  const outputImage = (wm) => {
    if (wm) {
      const x = watermark?.x || 0;
      const y = watermark?.y || 0;
      const w = watermark?.width || width * 0.25;
      const h = watermark?.height || height * 0.25;
      ctx.drawImage(wm, x, y, w, h);
    }
    ctx.restore();
    const cleanUp = () => {
      imgViewport.destroy();
      container.remove();
    };
    switch (output) {
      case 'url':
        if (isFunction(dest)) {
          const cb = (r) => {
            dest(r);
            cleanUp();
          };
          imgViewport.scene.toImage(type, quality, cb);
        } else {
          new Promise(function (resolve, reject) {
            const url = imgViewport.scene.toImage(type, quality);
            if (url) resolve(url);
            else reject(false);
            cleanUp();
          });
        }
        break;
      case 'download':
      default:
        imgViewport.scene.export({ fileName: dest }, null, type, quality);
        cleanUp();
        break;
    }
  };
  if (isObject(watermark)) {
    isImage(watermark?.imgURL)
      .then((r) => {
        outputImage(r);
      })
      .catch((e) => {
        console.error(e);
      });
  } else {
    outputImage();
  }
}

class TradeXchart extends tradeXChart {
  static #version = version;
  static #cnt = 0;
  static #cfg = {};
  static #instances = {};
  static #talibPromise = null;
  static #talibReady = false;
  static #talibAwait = [];
  static #talibError = null;
  static #TALibWorker = null;
  static #TALibWorkerReady = false;
  static get version() {
    return TradeXchart.#version;
  }
  static get talibPromise() {
    return TradeXchart.#talibPromise;
  }
  static get talibReady() {
    return TradeXchart.#talibReady;
  }
  static get talibAwait() {
    return TradeXchart.#talibAwait;
  }
  static get talibError() {
    return TradeXchart.#talibError;
  }
  static get webWorkers() {
    return WebWorker;
  }
  static get TALibWorker() {
    return TradeXchart.#TALibWorker;
  }
  static #initErrMsg = `${NAME} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
  static #permittedClassNames = [
    'TradeXchart',
    'Chart',
    'MainPane',
    'Secondary',
    'Primary',
    'ScaleBar',
    'Timeline',
    'ToolsBar',
    'UtilsBar',
    'Widgets'
  ];
  #key;
  #name;
  #shortName;
  #core;
  #txCfg;
  #config;
  #options;
  #ready;
  #inCnt;
  #state;
  #stateClass;
  #indicators;
  #indicatorsPublic;
  #standardOverlays;
  #optionalOverlays;
  #customOverlays;
  #TALib;
  #theme;
  #themeTemp;
  #UtilsBar;
  #ToolsBar;
  #MainPane;
  #WidgetsG;
  #scrollPos;
  #smoothScrollOffset;
  #pointerPos;
  #pointerButtons;
  #progress;
  #workers;
  #stream;
  #candles;
  #pricePrecision;
  #volumePrecision;
  #delayedSetRange;
  #mergingData;
  static create(cfg) {
    let txCfg = copyDeep(defaultConfig);
    if (isObject(cfg) && Object.keys(cfg).length > 0) {
      if (
        !('watermark' in cfg) ||
        (!isString(cfg?.watermark?.text) && !('imgURL' in cfg?.watermark))
      )
        txCfg.watermark = { display: false };
      txCfg = mergeDeep(txCfg, cfg);
    }
    if (TradeXchart.#cnt == 0) {
      TradeXchart.#cfg.CPUCores = navigator.hardwareConcurrency;
      TradeXchart.#cfg.api = {
        permittedClassNames: TradeXchart.#permittedClassNames
      };
    }
    if (
      !TradeXchart.#talibReady &&
      TradeXchart.#talibError === null &&
      isFunction(txCfg?.talib?.init)
    ) {
      TradeXchart.#talibPromise = txCfg.talib.init(txCfg.wasm);
      TradeXchart.#talibPromise.then(
        () => {
          TradeXchart.#talibReady = true;
          for (let c of TradeXchart.#talibAwait) {
            if (isFunction(c)) c();
          }
        },
        () => {
          TradeXchart.#talibReady = false;
        }
      );
    }
    return txCfg;
  }
  static destroy(chart) {
    if (!(chart instanceof TradeXchart)) return false;
    const inCnt = chart.inCnt;
    chart.destuction = true;
    chart.destroy();
    delete TradeXchart.#instances[inCnt];
    return true;
  }
  static cnt() {
    return TradeXchart.#cnt++;
  }
  constructor() {
    super();
    this.#key = uid();
    this.#name = NAME;
    this.#shortName = SHORTNAME;
    this.#ready = false;
    this.#indicators = IndicatorClasses;
    this.#indicatorsPublic = indicators;
    this.#standardOverlays = { ...OVERLAYPANES };
    this.#optionalOverlays = { ...OVERLAYPANES };
    this.#customOverlays = { ...OVERLAYPANES };
    this.chartWMin = CHART_MINW;
    this.chartHMin = CHART_MINH;
    this.chartW_Reactive = true;
    this.chartH_Reactive = true;
    this.chartBGColour = GlobalStyle.COLOUR_BG;
    this.chartTxtColour = GlobalStyle.COLOUR_TXT;
    this.chartBorderColour = GlobalStyle.COLOUR_BORDER;
    this.#MainPane = {
      chart: {},
      time: {}
    };
    this.panes = {
      utils: this.#UtilsBar,
      tools: this.#ToolsBar,
      main: this.#MainPane
    };
    this.destruction = false;
    this.logs = false;
    this.infos = false;
    this.warnings = false;
    this.errors = false;
    this.timers = false;
    this.#scrollPos = 0;
    this.#smoothScrollOffset = 0;
    this.#pointerPos = { x: 0, y: 0 };
    this.#pointerButtons = [false, false, false];
    this.#delayedSetRange = false;
    this.#mergingData = false;
    this.#core = this;
    this.#inCnt = TradeXchart.cnt();
    this.logs = false;
    this.infos = false;
    this.warnings = false;
    this.errors = false;
    this.timers = false;
    this.setID(null);
    this.#stateClass = State;
    this.warn(
      `!WARNING!: ${NAME} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`
    );
    this.log(`${SHORTNAME} instance count: ${this.inCnt}`);
    this.oncontextmenu = window.oncontextmenu;
    this.#workers = WebWorker;
    const so = this.#standardOverlays;
    so.primaryPane = { ...so.primaryPane, ...defaultOverlays$1.primaryPane };
    this.#optionalOverlays = { ...optionalOverlays };
  }
  log(...l) {
    if (this.logs) console.log(...l);
  }
  info(...i) {
    if (this.infos) console.info(...i);
  }
  warn(...w) {
    if (this.warnings) console.warn(...w);
  }
  error(e) {
    if (this.errors) console.error(e);
  }
  timer(n) {
    if (this.timers) console.time(n);
  }
  timeLog(n) {
    if (this.timers) console.timeLog(n);
  }
  timeEnd(n) {
    if (this.timers) console.timeEnd(n);
  }
  get version() {
    return TradeXchart.version;
  }
  get name() {
    return this.#name;
  }
  get shortName() {
    return this.#shortName;
  }
  get key() {
    return this.#key;
  }
  get options() {
    return this.#options;
  }
  get config() {
    return this.#config;
  }
  get core() {
    return this.#core;
  }
  get inCnt() {
    return this.#inCnt;
  }
  get txCfg() {
    return this.#txCfg;
  }
  get elUtils() {
    return super.elUtils;
  }
  get elTools() {
    return super.elTools;
  }
  get elBody() {
    return super.elBody;
  }
  get elMain() {
    return super.elMain;
  }
  get elRows() {
    return super.elRows;
  }
  get elTime() {
    return super.elTime;
  }
  get elYAxis() {
    return super.elYAxis;
  }
  get elWidgetsG() {
    return super.elWidgets;
  }
  get UtilsBar() {
    return this.#UtilsBar;
  }
  get ToolsBar() {
    return this.#ToolsBar;
  }
  get MainPane() {
    return this.#MainPane;
  }
  get Timeline() {
    return this.#MainPane.time;
  }
  get WidgetsG() {
    return this.#WidgetsG;
  }
  get Chart() {
    return this.#MainPane.chart;
  }
  get ChartPanes() {
    return this.#MainPane.chartPanes;
  }
  get Indicators() {
    return this.#MainPane.indicators;
  }
  get CustomOverlays() {
    return this.#customOverlays;
  }
  get ready() {
    return this.#ready;
  }
  get stateClass() {
    return this.#stateClass;
  }
  get state() {
    return this.#stateClass?.active(this);
  }
  get allData() {
    return {
      data: this.state.data.chart.data,
      primaryPane: this.state.data.primary,
      secondaryPane: this.state.data.secondary,
      datasets: this.state.data.datasets
    };
  }
  get rangeLimit() {
    return isNumber(this.range.initialCnt) ? this.range.initialCnt : RANGELIMIT;
  }
  get range() {
    return this.state.range;
  }
  get time() {
    return this.state.time;
  }
  get timeData() {
    return this.state.time;
  }
  get TimeUtils() {
    return Time;
  }
  get theme() {
    return this.#theme;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#indicators;
  }
  get indicatorsPublic() {
    return this.#indicatorsPublic;
  }
  get TALib() {
    return this.#TALib;
  }
  get TALibReady() {
    return TradeXchart.talibReady;
  }
  get TALibError() {
    return TradeXchart.talibError;
  }
  get talibAwait() {
    return TradeXchart.talibAwait;
  }
  get TALibPromise() {
    return TradeXchart.talibPromise;
  }
  get candleW() {
    return this.Timeline.candleW;
  }
  get candlesOnLayer() {
    return this.Timeline.candlesOnLayer;
  }
  get buffer() {
    return this.MainPane.buffer;
  }
  get bufferPx() {
    return this.MainPane.bufferPx;
  }
  set scrollPos(pos) {
    this.setScrollPos(pos);
  }
  get scrollPos() {
    return this.#scrollPos;
  }
  get smoothScrollOffset() {
    return 0;
  }
  get rangeScrollOffset() {
    return Math.floor(this.bufferPx / this.candleW);
  }
  get mousePos() {
    return this.#pointerPos;
  }
  get pointerButtons() {
    return this.#pointerButtons;
  }
  get symbol() {
    return this.#config.symbol;
  }
  get timeFrame() {
    return this.range.interval;
  }
  get timeFrameStr() {
    return this.range.intervalStr;
  }
  set pricePrecision(p) {
    this.setPricePrecision(p);
  }
  get pricePrecision() {
    return this.#pricePrecision || PRICE_PRECISION;
  }
  get volumePrecision() {
    return this.#volumePrecision;
  }
  set stream(stream) {
    return this.setStream(stream);
  }
  get stream() {
    return this.#stream;
  }
  get worker() {
    return this.#workers;
  }
  get isEmpty() {
    return this.state.IsEmpty;
  }
  set candles(c) {
    if (isObject(c)) this.#candles = c;
  }
  get candles() {
    return this.#candles;
  }
  get progress() {
    return this.#progress;
  }
  get customOverlays() {
    return this.#customOverlays;
  }
  get optionalOverlays() {
    return mergeDeep({ ...this.#optionalOverlays }, this.#customOverlays);
  }
  start(cfg = {}) {
    this.log(`${NAME} configuring...`);
    if (this.#ready) this.#MainPane.destroy();
    const oldID = this.ID;
    const txCfg = TradeXchart.create(cfg);
    this.#txCfg = txCfg;
    this.logs = txCfg?.logs ? txCfg.logs : null;
    this.infos = txCfg?.infos ? txCfg.infos : null;
    this.warnings = txCfg?.warnings ? txCfg.warnings : null;
    this.errors = txCfg?.errors ? txCfg.errors : null;
    this.timers = txCfg?.timer ? txCfg.timer : null;
    this.#config = txCfg;
    this.#inCnt = txCfg.cnt || this.#inCnt;
    this.#TALib = txCfg.talib;
    this.props(txCfg);
    this.log('processing state...');
    let deepValidate = txCfg?.deepValidate || false;
    let isCrypto = txCfg?.isCrypto || false;
    let state = txCfg.state;
    if (!(txCfg.state instanceof State)) state = this.configureState(txCfg);
    if (this.#ready) {
      if (!(state instanceof State)) {
        const newState = this.#stateClass.create(
          this,
          state,
          deepValidate,
          isCrypto
        );
        this.#stateClass.use(this, newState.key);
        this.#stateClass.delete(this, { id: initialEmptyState });
      }
      delete txCfg.state;
      this.#MainPane = new MainPane(this, txCfg);
      this.MainPane.start();
      document.querySelector(`style[title="${oldID}_style"]`)?.remove();
      this.setUtilsLocation(this.theme?.utils?.location);
      this.elBody.setToolsLocation(this.theme?.tools?.location);
      this.log(
        `${this.name} id: ${this.ID} : loaded a new ${this.state.status} state`
      );
    } else {
      txCfg.watermark.display = true;
      state.id = initialEmptyState;
      let newState = this.#stateClass.create(
        this,
        state,
        deepValidate,
        isCrypto
      );
      this.#stateClass.use(this, newState.key);
      delete txCfg.state;
      this.log(
        `${this.name} id: ${this.ID} : created with a ${this.state.status} state`
      );
      this.#WidgetsG = new Widgets(this, { widgets: txCfg?.widgets });
      this.#UtilsBar = new UtilsBar(this, txCfg);
      this.#ToolsBar = new ToolsBar(this, txCfg);
      this.#MainPane = new MainPane(this, txCfg);
      this.eventsListen();
      this.elStart(this.theme);
      this.elBody.start(this.theme);
      this.UtilsBar.start();
      this.ToolsBar.start();
      this.MainPane.start();
      this.WidgetsG.start();
      this.#progress = this.WidgetsG.insert('Progress', {});
    }
    this.insertAdjacentHTML(
      'beforebegin',
      `<style title="${this.ID}_style"></style>`
    );
    this.setTheme(this.#theme.id);
    this.#scrollPos = this.bufferPx * -1;
    this.stream = this.#config.stream;
    if (!isObject(txCfg?.stream) && this.state.data.chart.data.length < 2) {
      this.warn(`${NAME} has no chart data or streaming provided.`);
    } else if (
      isObject(txCfg?.stream) &&
      this.state.data.chart.data.length < 2
    ) {
      this.#delayedSetRange = true;
    }
    this.log(
      `Time Frame: ${this.range.timeFrame} Milliseconds: ${this.range.timeFrameMS}`
    );
    if (this.#delayedSetRange)
      this.on(STREAM_UPDATE, this.delayedSetRange, this);
    this.#config.callbacks = this.#config.callbacks || {};
    this.#ready = true;
    setTimeout(this.refresh.bind(this), 1000);
    this.log(`${this.#name} V${TradeXchart.version} configured and running...`);
  }
  use(cfg) {
    this.start(cfg);
  }
  destroy() {
    if (this?.destuction !== true) {
      TradeXchart.destroy(this);
      return true;
    }
    this.log('...cleanup the mess');
    this.removeEventListener('mousemove', this.onMouseMove);
    this.hub.expunge(this);
    this.UtilsBar.destroy();
    this.ToolsBar.destroy();
    this.MainPane.destroy();
    this.WidgetsG.destroy();
    this.#workers.end();
    this.#state = undefined;
    this.#stateClass = undefined;
  }
  configureState(txCfg) {
    let state = copyDeep(txCfg?.state) || {};
    state.id = this.ID;
    state.core = this;
    let { tf, ms } = !!interval2MS(txCfg?.timeFrame)
      ? isTimeFrame(txCfg.timeFrame)
      : { tf: DEFAULT_TIMEFRAME, ms: DEFAULT_TIMEFRAMEMS };
    let ts = Date.now();
    ts = ts - (ts % ms);
    if (!isObject(txCfg?.range)) {
      txCfg.range = {
        startTS: ts,
        timeFrame: tf,
        timeFrameMS: ms
      };
    } else {
      let r = txCfg?.range;
      if (!isInteger(r.startTS)) r.startTS = ts;
      if (!isInteger(r.timeFrameMS)) r.timeFrameMS = ms;
      if (interval2MS(r.timeFrame) != r.timeFrameMS)
        r.timeFrame = ms2Interval(ms);
    }
    state.range = { ...state.range, ...txCfg.range };
    return state;
  }
  eventsListen() {
    this.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.on(STREAM_UPDATE, this.onStreamUpdate, this);
    this.on('state_mergeComplete', () => this.#progress.stop());
  }
  onMouseMove(e) {
    this.#pointerPos.x = e.clientX;
    this.#pointerPos.y = e.clientY;
  }
  onStreamUpdate(candle) {
    const r = this.range;
    if (r.inRange(candle[0])) {
      const max = r.valueMax;
      const min = r.valueMin;
      if (candle[2] > max || candle[3] < min) {
        this.setRange(r.indexStart, r.indexEnd);
        this.emit('chart_yAxisRedraw', this.range);
      }
    }
  }
  props(txCfg) {
    let entries = {
      width: (width) => this.setWidth(width),
      height: (height) => this.setHeight(height),
      widthMin: (width) => this.setWidthMin(width),
      heightMin: (height) => this.setHeightMin(height),
      widthMax: (width) => this.setWidthMax(width),
      heightMax: (height) => this.setHeightMax(height),
      logs: (logs) => (this.logs = isBoolean(logs) ? logs : false),
      infos: (infos) => (this.infos = isBoolean(infos) ? infos : false),
      warnings: (warnings) =>
        (this.warnings = isBoolean(warnings) ? warnings : false),
      errors: (errors) => (this.errors = isBoolean(errors) ? errors : false),
      indicators: (indicators) => this.setIndicators(indicators),
      theme: (theme) => {
        this.#themeTemp = this.addTheme(theme);
      },
      stream: (stream) => (this.#stream = isObject(stream) ? stream : {}),
      pricePrecision: (pricePrecision) =>
        this.setPricePrecision(pricePrecision),
      volumePrecision: (precision) => this.setVolumePrecision(precision)
    };
    if (isObject(txCfg)) {
      for (const option in txCfg) {
        if (option in entries) {
          entries[option](txCfg[option]);
        }
      }
    }
    this.validateID(txCfg);
    if (!('theme' in txCfg) || !isObject(txCfg.theme))
      txCfg.theme = defaultTheme;
  }
  getInCnt() {
    return this.#inCnt;
  }
  validateID(txCfg) {
    const id = isString(txCfg?.id) ? txCfg.id : null;
    this.setID(id);
    this.classList.add(this.ID);
  }
  setID(id) {
    if (isString(id)) this.ID = id;
    else this.ID = `${uid(SHORTNAME)}_${this.#inCnt}`;
  }
  setTitle(t) {
    if (!isString(t)) return false;
    this.Chart.setTitle(t);
    return true;
  }
  setWatermark(w) {
    if (isString(w.text) || isString(w)) this.core.config.watermark.text = w;
    else if ('imgURL' in w) this.core.config.watermark.imgURL = w;
    this.Chart.setWatermark(w);
  }
  setDimensions(w, h) {
    const dims = super.setDimensions(w, h);
    this.emit('global_resize', dims);
  }
  setUtilsH(h) {
    this.elUtils.style.height = `${h}px`;
  }
  setToolsW(w) {
    this.elTools.style.width = `${w}px`;
  }
  setPricePrecision(pricePrecision) {
    if (!isNumber(pricePrecision) || pricePrecision < 0) {
      pricePrecision = PRICE_PRECISION;
    }
    this.#pricePrecision = pricePrecision;
  }
  setVolumePrecision(volumePrecision) {
    if (!isNumber(volumePrecision) || volumePrecision < 0) {
      volumePrecision = VOLUME_PRECISION;
    }
    this.#volumePrecision = volumePrecision;
  }
  addTheme(theme) {
    const t = Theme.create(theme, this);
    if (!(this.#theme instanceof Theme)) this.#theme = t;
    return t;
  }
  setTheme(ID) {
    if (!this.theme.list.has(ID)) return false;
    this.#theme.setTheme(ID, this);
    const theme = this.#theme;
    const style = document.querySelector(`style[title=${this.ID}_style]`);
    const borderColour = `var(--txc-border-color, ${theme.chart.BorderColour}`;
    let innerHTML = `.${this.ID} { `;
    innerHTML += `--txc-background: ${theme.chart.Background}; `;
    this.style.background = `var(--txc-background, ${theme.chart.Background})`;
    this.style.border = `${theme.chart.BorderThickness || 0}px solid`;
    this.style.borderColor = borderColour;
    innerHTML += `--txc-border-color:  ${theme.chart.BorderColour}; `;
    if (theme.chart.BorderThickness > 0) {
      this.elMain.rows.style.border = `1px solid ${borderColour}`;
    } else {
      this.elMain.rows.style.border = `none`;
    }
    innerHTML += `--txc-time-scrollbar-color: ${theme.chart.BorderColour}; `;
    innerHTML += `--txc-time-handle-color: ${theme.xAxis.handle}; `;
    innerHTML += `--txc-time-slider-color: ${theme.xAxis.slider}; `;
    innerHTML += `--txc-time-cursor-fore: ${theme.xAxis.colourCursor}; `;
    innerHTML += `--txc-time-cursor-back: ${theme.xAxis.colourCursorBG}; `;
    innerHTML += `--txc-time-icon-color: ${theme.icon.colour}; `;
    innerHTML += `--txc-time-icon-hover-color: ${theme.icon.hover}; `;
    this.elTime.overview.scrollBar.style.borderColor = borderColour;
    this.elTime.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${theme.xAxis.handle})`;
    this.elTime.overview.style.setProperty(
      '--txc-time-slider-color',
      theme.xAxis.slider
    );
    this.elTime.overview.style.setProperty(
      '--txc-time-icon-color',
      theme.icon.colour
    );
    this.elTime.overview.style.setProperty(
      '--txc-time-icon-hover-color',
      theme.icon.hover
    );
    if (this.Chart instanceof Chart) {
      for (let [key, legend] of Object.entries(this.Chart.legend.list)) {
        legend.el.style.color = `var(--txc-legend-color, ${theme.legend.colour})`;
        legend.el.style.font = `var(--txc-legend-font, ${theme.legend.font})`;
      }
    }
    for (let t of this.elUtils.icons) {
      if (t.className != 'icon-wrapper') continue;
      t.children[0].style.fill = theme.icon.colour;
    }
    for (let t of this.elTools.icons) {
      if (t.className != 'icon-wrapper') continue;
      t.children[0].style.fill = theme.icon.colour;
    }
    innerHTML += ` }`;
    style.innerHTML = innerHTML;
    return true;
  }
  setScrollPos(pos) {
    pos = Math.round(pos);
    if (isNumber(pos) && pos <= 0 && pos >= this.bufferPx * -1)
      this.#scrollPos = pos;
    else {
      this.emit('Error', `setScrollPos: not a valid value`);
    }
  }
  createState(state, deepValidate, isCrypto) {
    return this.stateClass.create(this, state, deepValidate, isCrypto);
  }
  deleteState(key) {
    let r = this.stateClass.delete(this, key);
    if (!r) return false;
    this.emit('state_deleted', key);
    return true;
  }
  exportState(key = this.state.key, config = {}) {
    let r = this.stateClass.export(this, key, config);
    if (!r) return false;
    this.emit('state_exported', key);
    return r;
  }
  setStream(stream) {
    if (this.stream instanceof Stream) {
      this.error('ERROR: Invoke stopStream() before starting a new one.');
      return false;
    } else if (isObject(stream)) {
      if (this.allData.data.length == 0 && isString(stream.timeFrame)) {
        isTimeFrame(stream?.timeFrame);
      }
      this.#stream = new Stream(this);
      this.#config.stream = this.#stream.config;
      return this.#stream;
    }
  }
  startStream() {
    if (this.stream instanceof Stream) {
      this.stream.start();
    }
  }
  stopStream() {
    if (this.stream instanceof Stream) {
      this.stream.stop();
    }
  }
  delayedSetRange() {
    while (this.#delayedSetRange) {
      let l = Math.floor(this.range.initialCnt * 0.5);
      this.setRange(l * -1, l);
      this.off(STREAM_UPDATE, this.delayedSetRange, this);
      this.#delayedSetRange = false;
    }
  }
  updateRange(pos) {
    if (!isArray(pos) || !isNumber(pos[4]) || pos[4] == 0) return;
    if (pos[4] < 0 && this.range.isPastLimit()) return;
    if (pos[4] > 0 && this.range.isFutureLimit()) return;
    let dist, scrollPos;
    dist = pos[4];
    scrollPos = this.#scrollPos + dist;
    scrollPos % this.candleW;
    if (scrollPos < this.bufferPx * -1) {
      let r = this.offsetRange(this.rangeScrollOffset * -1);
      if (!r) return;
      scrollPos = 0;
    } else if (scrollPos > 0) {
      let r = this.offsetRange(this.rangeScrollOffset);
      if (!r) return;
      scrollPos = this.bufferPx * -1;
    }
    this.#scrollPos = scrollPos;
    this.emit('chart_scrollUpdate', scrollPos);
  }
  offsetRange(offset) {
    let start = this.range.indexStart - offset,
      end = this.range.indexEnd - offset;
    if (this.range.isPastLimit(start) || this.range.isFutureLimit(end))
      return false;
    this.setRange(start, end);
    return true;
  }
  setRange(start = 0, end = this.rangeLimit) {
    const max = this.config?.maxCandles
      ? this.config.maxCandles
      : this.Chart?.layerWidth
        ? this.Chart.layerWidth
        : this.Chart.width;
    this.range.set(start, end, max);
    if (start < 0 && !this.#mergingData)
      this.emit('range_limitPast', { chart: this, start, end });
    else if (end > this.range.dataLength && !this.#mergingData)
      this.emit('range_limitFuture', { chart: this, start, end });
  }
  jumpToIndex(start, limited = true, center = true) {
    if (limited) start = limit(start, 0, this.range.dataLength);
    let length = this.range.Length;
    let end = start + length;
    if (center) {
      start -= length / 2;
      end -= length / 2;
    }
    this.setRange(start, end);
  }
  jumpToTS(ts, limited = true, center = true) {
    let start = this.Timeline.xAxis.t2Index(ts);
    this.jumpToIndex(start, limited, center);
  }
  jumpToStart(center = false) {
    this.jumpToIndex(0, true, center);
  }
  jumpToEnd(center = true) {
    let end = this.range.dataLength - this.range.Length;
    if (center) end += Math.round(this.range.Length / 2);
    this.jumpToIndex(end, true, false);
  }
  mergeData(merge, newRange = false, calc = false) {
    this.#mergingData = true;
    let m = this.state.mergeData(merge, newRange, calc);
    if (isBoolean(m)) this.#mergingData = false;
    return m;
  }
  isOverlay(o) {
    return (
      isClass(o) &&
      isFunction(o.prototype?.draw) &&
      !this.isIndicator(o) &&
      Object.getPrototypeOf(o.prototype).constructor.isOverlay
    );
  }
  hasOverlay(o) {
    const e = this.overlayEntries();
    if (!Object.keys(e).includes(o)) return false;
    return e[o];
  }
  overlayKeys() {
    return Object.keys(this.overlayEntries());
  }
  overlayEntries() {
    const c = this.optionalOverlays;
    let e = {};
    for (let p in c) {
      e = { ...e, ...c[p] };
    }
    return e;
  }
  setCustomOverlays(o) {
    if (!isObject(o)) return false;
    const result = {};
    for (const [k, v] of Object.entries(o)) {
      if (
        isObject(v) &&
        this.isOverlay(v?.class) &&
        Object.keys(this.#customOverlays).includes(v?.location)
      ) {
        this.#customOverlays[v.location][k] = v;
        result[k] = true;
        this.log(`Custom Overlay: ${k} - Registered`);
      } else {
        result[k] = false;
        this.log(`Custom Overlay: ${k} - Rejected: Not a valid Overlay`);
      }
    }
    return result;
  }
  addOverlay(key, targetID) {
    let result;
    const target = this.findOverlayInGraph(key, targetID);
    if (!target) result = target;
    else {
      const { overlay, graph } = { ...target };
      result = graph.addOverlay(key, overlay);
    }
    if (!result) {
      this.error(
        `Overlay: ${key} - Error attempting to add overlay to ${targetID}`
      );
      return false;
    } else {
      this.log(`Overlay: ${key} - Added to ${targetID}`);
      return true;
    }
  }
  removeOverlay(key, targetID) {
    let result;
    const target = this.findOverlayInGraph(key, targetID);
    if (!target) result = target;
    else {
      const { overlay, graph } = { ...target };
      result = graph.removeOverlay(key);
    }
    if (!result) {
      this.error(
        `Overlay: ${key} - Error attempting to remove overlay from ${targetID}`
      );
      return false;
    } else {
      this.log(`Overlay: ${key} - Removed from ${targetID}`);
      return true;
    }
  }
  findGraph(targetID) {
    switch (targetID) {
      case 'mainPane':
        return this.MainPane.graph;
      case 'chartPane':
        return this.Chart.graph;
      case 'chartScale':
        return this.Chart.scale.graph;
      case 'timeLine':
        return this.Chart.time.graph;
      default:
        const panes = Array.from(this.ChartPanes.keys());
        if (panes.includes(targetID)) {
          return this.ChartPanes.get(targetID).graph;
        } else {
          for (let p of panes) {
            let scale = this.ChartPanes.get(targetID).scale;
            if (scale.id == targetID) {
              return scale.graph;
            }
          }
          return false;
        }
    }
  }
  findOverlayInGraph(key, targetID) {
    if (!isString(key) || !isString(targetID)) return false;
    const overlay = this.hasOverlay(key);
    if (!overlay) return false;
    const graph = this.findGraph(targetID);
    if (!graph) return false;
    return { overlay, graph };
  }
  isIndicator(i) {
    return (
      isClass(i) &&
      isFunction(i.prototype?.draw) &&
      'primaryPane' in i.prototype &&
      !!i?.isIndicator
    );
  }
  setIndicators(i, flush = false) {
    if (!isObject(i)) return false;
    if (flush) {
      console.warn(`Expunging all default indicators!`);
      this.#indicators = {};
    }
    const result = {};
    for (const [k, v] of Object.entries(i)) {
      if (
        isString(v?.id) &&
        isString(v?.name) &&
        isString(v?.event) &&
        this.isIndicator(v?.ind)
      ) {
        if (!!v?.public) this.#indicatorsPublic[k] = v;
        this.#indicators[k] = v.ind;
        result[k] = true;
        this.log(`Custom Indicator: ${k} - Registered`);
      } else {
        result[k] = false;
        this.warn(`Custom Indicator: ${k} - Rejected: Not a valid indicator`);
      }
    }
    return result;
  }
  addIndicator(i, name = i, params = {}) {
    const r = this.#MainPane.addIndicator(i, name, params);
    if (!r) this.error(`Indicator: ${i} - Error failed to add indicator`);
    return i;
  }
  getIndicator(i) {
    return this.#MainPane.getIndicator(i);
  }
  getIndicatorsByType(t) {
    return this.#MainPane.getIndicatorsByType(t);
  }
  removeIndicator(i) {
    const r = this.#MainPane.removeIndicator(i);
    if (!r) this.error(`Indicator: ${i} - Error failed to remove indicator`);
    return i;
  }
  indicatorSettings(i, s) {
    return this.#MainPane.indicatorSettings(i, s);
  }
  hasStateIndicator(i, dataset = 'searchAll') {
    if (!isString(i) || !isString(dataset)) return false;
    const find = function (i, d) {
      for (let e of d) {
        if (e?.id == i || e?.name == i) return true;
        else return false;
      }
    };
    if (dataset == 'searchAll') {
      for (let d of this.allData) {
        if (find(i, d)) return true;
      }
      return false;
    } else {
      if (dataset in this.allData) {
        return find(i, d);
      }
    }
  }
  async calcAllIndicators(recalc) {
    const indicators = [];
    const executeInd = (i) => {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(i());
        }, 0)
      );
    };
    for (const [key, value] of Object.entries(this.Indicators)) {
      for (const [k, ind] of Object.entries(value)) {
        indicators.push(
          ind.instance.calcIndicatorHistory.bind(ind.instance, recalc)
        );
      }
    }
    await Promise.all(
      indicators.map(async (i) => {
        executeInd(i);
      })
    );
    this.refresh();
  }
  addTrade(t) {
    return this.state.addTrade(t);
  }
  removeTrade(t) {
    return this.state.removeTrade(t);
  }
  addEvent(e) {
    return this.state.addEvent(e);
  }
  removeEvent(e) {
    return this.state.removeEvent(e);
  }
  resize(width, height) {
    if (!isNumber(width) && !isNumber(height)) return false;
    this.setDimensions(width, height);
    return true;
  }
  refresh() {
    if (!this.ready) return;
    this.#MainPane.refresh();
  }
  toImageURL(cb, type, quality, watermark) {
    return exportImage(this, cb, type, quality, 'url', watermark);
  }
  downloadImage(fileName = `${this.ID}.png`, type, quality, watermark) {
    exportImage(this, fileName, type, quality, 'download', watermark);
  }
  notImplemented() {
    if (!this.implemented) {
      let content = `
        This feature is not implemented yet.
      `;
      let config = {
        content,
        styles: {
          content: { padding: '1em' }
        }
      };
      this.implemented = this.#WidgetsG.insert('Dialogue', config);
      this.implemented.start();
    } else this.implemented.open();
  }
}
if (!window.customElements.get('tradex-chart')) {
  document.head.insertAdjacentHTML('beforeend', cssVars);
  document.head.insertAdjacentHTML('beforeend', style);
  customElements.get('tradex-chart') ||
    customElements.define('tradex-chart', TradeXchart);
}
function isChart(chart) {
  return chart instanceof TradeXchart;
}

const joinPoints = [
  'before',
  'after',
  'around',
  'afterReturning',
  'afterThrowing'
];
class Aspect {
  static add(aspect, target) {
    if (!(aspect instanceof Aspect)) return false;
    if (isClass(target));
    const proxy = new Proxy(target, {
      get: (target, property) => {
        if (typeof target[property] === 'function') {
          return Aspect.intercept(aspect, target, property);
        }
        return target[property];
      }
    });
    return proxy;
  }
  static intercept(aspect, target, methodName) {
    const doAdvices = (advices, type, args) => {
      let cnt = 0,
        input,
        output = args;
      for (let advice of advices) {
        if (type == advice.type) {
          cnt++;
          input = advice.transfer ? output : args;
          input = advice.type == 'afterReturning' ? advice.args : input;
          output = advice.func.apply(target, input);
        }
      }
      output = cnt > 0 ? output : undefined;
      return output;
    };
    return function (...args) {
      const joinPoint = `${methodName}`;
      const advices = aspect.advice[joinPoint];
      if (!advices) return target[methodName].apply(target, args);
      try {
        let output;
        output = doAdvices(advices, 'replace', args);
        if (output !== undefined) return output;
        output = doAdvices(advices, 'before', args);
        if (aspect.transfer && output !== undefined) args = output;
        const result = target[methodName].apply(target, args);
        if (aspect.transfer && result !== undefined) args = result;
        output = doAdvices(advices, 'after', args);
        if (aspect.transfer && output !== undefined) args = result;
        output = doAdvices(advices, 'around', { args, result });
        doAdvices(advices, 'afterReturning', args);
        output = output === undefined ? result : output;
        return output;
      } catch (e) {
        doAdvices(advices, ['afterThrowing'], e);
        throw e;
      }
    };
  }
  constructor(name, transfer = true) {
    this.name = name;
    this.advice = {};
    this.transfer = transfer;
  }
  before(joinPoint, advice, transfer, args) {
    this.#adviceType(joinPoint, advice, 'before', transfer, args);
  }
  after(joinPoint, advice, transfer, args) {
    this.#adviceType(joinPoint, advice, 'after', transfer, args);
  }
  around(joinPoint, advice, transfer, args) {
    this.#adviceType(joinPoint, advice, 'around', transfer, args);
  }
  afterReturning(joinPoint, advice, transfer, args) {
    this.#adviceType(joinPoint, advice, 'afterReturning', transfer, args);
  }
  afterThrowing(joinPoint, advice, transfer, args) {
    this.#adviceType(joinPoint, advice, 'afterThrowing', transfer, args);
  }
  #adviceType(joinPoint, advice, type, transfer = true, args = []) {
    if (
      typeof joinPoint != 'string' ||
      typeof advice != 'function' ||
      !Array.isArray(args) ||
      joinPoints.includes(joinPoint)
    )
      return false;
    this.advice[joinPoint] = this.advice[joinPoint] || [];
    this.advice[joinPoint].push({ type, func: advice, args, transfer });
    return true;
  }
}

export {
  Aspect,
  TradeXchart as Chart,
  DEFAULT_STATE,
  DOM,
  EventHub,
  Indicator,
  IndicatorClasses,
  Overlay,
  Range,
  StateMachine,
  TimeData,
  YAXIS_PADDING,
  YAXIS_TYPE,
  YAXIS_TYPES,
  candleW,
  canvas,
  copyDeep,
  isPromise,
  mergeDeep,
  talibAPI,
  typeChecks,
  uid,
  utilities as utils
};
