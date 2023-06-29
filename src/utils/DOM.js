// DOM.js
// DOM utilities

import { isObject, isString } from "./typeChecks"

const DOM = {

  findByID(id, base=document) {
    return base.getElementById(id)
  },

  findByClass(cl, base=document) {
    return base.getElementsByClassName(cl)
  },

  findByName(name, base=document) {
    return base.getElementsByName(name)
  },

  fndByTag(tag, base=document) {
    return base.getElementsByTagName(tag)
  },

  findBySelector(sel, base=document) {
    return base.querySelector(sel)
  },

  findBySelectorAll(sel, base=document) {
    return base.querySelectorAll(sel)
  },

  // returns true if it is a DOM node
  isNode(o){
    return (
      typeof Node === "object" ? o instanceof Node : 
      o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
  },

  // returns true if it is a DOM element    
  isElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
  },

  // returns true if DOM element is visible
  // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js 
  isVisible(o) {
    if (!this.isElement(o)) return false

    return !!o && !!( o.offsetWidth || o.offsetHeight || o.getClientRects().length )
  },

  // https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
  isInViewport(el) {
    if (!this.isElement(el)) return false

    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // https://stackoverflow.com/a/41698614/15109215
  isVisibleToUser(el) {
    if (!this.isElement(el)) return false

    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (el.offsetWidth + el.offsetHeight + el.getBoundingClientRect().height +
        el.getBoundingClientRect().width === 0) {
        return false;
    }
    const elCenter   = {
        x: el.getBoundingClientRect().left + el.offsetWidth / 2,
        y: el.getBoundingClientRect().top + el.offsetHeight / 2
    };
    if (elCenter.x < 0) return false;
    if (elCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elCenter.y < 0) return false;
    if (elCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elCenter.x, elCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
  },

  elementDimPos(el) {
    if (!this.isElement(el)) return false

    let _x = 0;
    let _y = 0;
    let El = el
    while( El && El.tagName.toLowerCase() != 'body' && !isNaN( El.offsetLeft ) && !isNaN(El.offsetTop ) ) {
        _x += El.offsetLeft - El.scrollLeft;
        _y += El.offsetTop - El.scrollTop;
        El = El.offsetParent;
    }
    const dim = el.getBoundingClientRect()
    let _w = dim.right - dim.left
    let _h = dim.bottom - dim.top
    let _v = this.isVisible(el)
    let _vp = this.isInViewport(el)
    return { top: _y, left: _x, width: _w, height: _h, visible: _v, viewport: _vp };
  },

  elementsDistance(el1, el2) {
    // fail if either are not elements
    if (!this.isElement(el1) || !this.isElement(el1)) return false

    el1Location = this.elementDimPos(el1)
    el2Location = this.elementDimPos(el2)

    return {
      x: el1Location.top - el2Location.top,
      y: el1Location.left . el2Location.left,
      el1Location: el1Location,
      el2Location: el2Location,
    }
  },

  /**
 * @param {String} HTML representing a single element
 * @returns {Element}
 */
  htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  },

  /**
 * @param {String} HTML representing any number of sibling elements
 * @returns {NodeList} 
 */
  htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  },

  //  https://stackoverflow.com/a/3028037/15109215
  hideOnClickOutside(el) {
    if (!this.isElement(el)) return false

    const outsideClickListener = event => {
      if (!el.contains(event.target) && this.isVisible(el)) { 
      // or use: event.target.closest(selector) === null
      // if (event.target.closest(selector) === null) {
        el.style.display = 'none';
        removeClickListener();
      }
    }

    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    }

    document.addEventListener('click', outsideClickListener);
  },

  onClickOutside(el, cb) {
    if (!this.isElement(el)) return false

    const outsideClickListener = event => {
      if (!el.contains(event.target) && DOM.isVisible(el)) { 
      // or use: event.target.closest(selector) === null
      // if (event.target.closest(selector) === null) {
        cb();
        removeClickListener();
      }
    }

    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    }

    document.addEventListener('click', outsideClickListener);
  },

  addStyleRule(styleSheet, selector, property, value) {
    let r = this.findStyleRule(styleSheet, selector, property, value)
    if (!r) return
    // Change rule if it exists
    else if (r.i >= 0) {
      r.rules[r.i].style[r.property] = r.value;
    }
    else {
      // Add rule if it does not
      // r.styleSheet.insertRule(r.selector + " { " + r.property + ": " + r.value + "; }", 0);
      this.addCSSRule(r.styleSheet, r.selector, r.rules, r.index)
    }
  },

  deleteStyleRule(styleSheet, selector, property) {
    let r = this.findStyleRule(styleSheet, selector, property, '')
    let deleteRule = r.styleSheet.deleteRule || r.styleSheet.removeRule
    deleteRule(r.i)
  },

  findStyleRule(styleSheet, selector, property, value) {
    if (!styleSheet || !isObject(styleSheet)) return null
    else if (styleSheet.constructor.name == "HTMLStyleElement") styleSheet = styleSheet.sheet
    else if (styleSheet.constructor.name != "CSSStyleSheet") return null

    let r = this.styleRuleSanitize(selector, property, value)
    selector = r[0];
    property = r[1];
    value = r[2];

    // Change rule if it exists
    const rules = styleSheet.cssRules || styleSheet.rules;
    for(var i = rules.length - 1; i > 0 ; --i) {
      let rule = rules[i];
      if(rule.selectorText === selector) {
        break;
      }
    }

    return {styleSheet, rules, selector, property, value, i};
  },

  styleRuleSanitize(selector, property, value) {
    return [
      // CSS (& HTML) reduce spaces in selector to one
      selector = selector.toLowerCase().replace(/\s+/g, ' '),
      property = property.toLowerCase(),
      value = value.toLowerCase(),
    ]
  },

  addCSSRule(sheet, selector, rules, index) {
    if(sheet.insertRule) {
      sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else {
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
    if (!this.isElement(el) || !isString(selector)) return null

    if (el.classList.contains(selector)) return el
    else return this.findTargetParentWithClass(el.parentElement, selector)
  }

}

export default DOM
