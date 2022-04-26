// https://github.com/flexdinesh/browser-or-node

export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

/* eslint-disable no-restricted-globals */
export const isWebWorker = typeof self === 'object'
  && self.constructor
  && self.constructor.name === 'DedicatedWorkerGlobalScope';
/* eslint-enable no-restricted-globals */

export const isNode = typeof process !== 'undefined'
  && process.versions != null
  && process.versions.node != null;

/* eslint-disable no-undef */
export const isJsDom = () => (typeof window !== 'undefined' && window.name === 'nodejs')
  || navigator.userAgent.includes('Node.js')
  || navigator.userAgent.includes('jsdom');

  export const getGlobalObject = () => {
  if (typeof globalThis !== 'undefined') { return globalThis; }
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('cannot find the global object');
};

export const methodExists = (method) => {
  let globObj = getGlobalObject()
  if (typeof globObj[method] !== 'function') 
    // method is not available in this environment
    return false
  else
    return true
}

// module.exports = { 
//   isBrowser, 
//   isWebWorker, 
//   isNode, 
//   isJsDom, 
//   getGlobalObject, 
//   methodExists }
