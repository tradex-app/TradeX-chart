// DOM.js
// DOM utilities

const DOM = {

  findByID(id) {
    return document.getElementById(id)
  },

  findByClass(cl) {
    return document.getElementsByClassName(cl)
  },

  findByName(name) {
    return document.getElementsByName(name)
  },

  fndByTag(tag) {
    return document.getElementsByTagName(tag)
  },

  findBySelector(sel) {
    return document.querySelector(sel)
  },

  findBySelectorAll(sel) {
    return document.querySelectorAll(sel)
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
    return !!o && !!( o.offsetWidth || o.offsetHeight || o.getClientRects().length )
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
    return { top: _y, left: _x, width: _w, height: _h };
  },

  elementsDistance(el1, el2) {
    el1Location = this.elementDimPos(el1)
    el2Location = this.elementDimPos(el2)

    // fail if either are not elements
    if (!el1Location || !el2Location) return false

    return {
      x: el1Location.top - el2Location.top,
      y: el1Location.left . el2Location.left,
      el1Location: el1Location,
      el2Location: el2Location,
    }
  },

  /**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
  htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  },

  /**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
  htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  },

  //  https://stackoverflow.com/a/3028037/15109215
  hideOnClickOutside(element) {
    const outsideClickListener = event => {
        if (!element.contains(event.target) && this.isVisible(element)) { 
        // or use: event.target.closest(selector) === null
        // if (event.target.closest(selector) === null) {
          element.style.display = 'none';
          removeClickListener();
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
    }

    document.addEventListener('click', outsideClickListener);
  },

}

export default DOM
