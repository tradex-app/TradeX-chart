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
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * 
 * options: {
 *  capture: false
 *  once: false
 *  passive: false
 *  signal: undefined
 * }
 *
 */
 export const on = function(type, cb, params) {
  const target = params?.target || window.document
  return target.addEventListener(type, cb)
}

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
export const off = function(type, listener, options, params) {
  const target = params?.target || window.document
  target.removeEventListener(type, listener, options)
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 * https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
 * 
 * options: {
 *   detail: {},
 *   bubbles: true,
 *   cancelable: true,
 *   composed: false,
 * }
 */
export const emit = function(type, options, params) {
  const target = params?.target || window.document
  return target.dispatchEvent(new CustomEvent(type, options))
