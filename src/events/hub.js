// hub.js
// Event Hub
// Provides notification and subscription to:
// Hardware Events: mouse, keyboard
// DOM Events
// Custom Events:state change

export class EventHub {


  constructor() {
    
  }

  newCustom(type, options) {

  }
}


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
}