// custom.js
// Custom event handler

"use strict";

// Polyfill for creating CustomEvents on IE9/10/11
// code from:
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function (self) {
  if (self.CustomEvent) {
    return
  }

  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = self.Event.prototype;
  self.CustomEvent = CustomEvent;
})(typeof self !== 'undefined' ? self : this);

/**
 * options: {
 *   detail: {},
 *   bubbles: true,
 *   cancelable: true,
 *   composed: false,
 * }
 */

// https://github.com/lucaszadok/isomorphic-events/blob/master/src/events-browser.js
export var on = function(evt, params, options) {
  var target = options && options.target ? options.target : window.document;
  return target.addEventListener(evt, params);
};

export var emit = function(evt, params, options) {
  var target = options && options.target ? options.target : window.document;
  return target.dispatchEvent(new window.CustomEvent(evt, params));
};

