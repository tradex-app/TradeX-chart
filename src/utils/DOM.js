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

  //Returns true if it is a DOM node
  isNode(o){
    return (
      typeof Node === "object" ? o instanceof Node : 
      o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
  },

  //Returns true if it is a DOM element    
  isElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
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

  // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js 
  isVisible(elem) {
    return !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )
  },

}

export default DOM
