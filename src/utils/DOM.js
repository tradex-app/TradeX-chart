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
  }

}

export default DOM
