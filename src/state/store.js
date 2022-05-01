/**
 * State Management
 * instantiated in application root (main.js)
 * and every other module that wishes to access it
 */

// Optional Chaining Operator
// const val = obj?.prop1?.prop2
// https://levelup.gitconnected.com/this-trick-changed-the-way-i-access-nested-objects-in-javascript-bc8ead3a7015

// const { forEach } = require("lodash")

// ideas: https://github.com/jhereu/node-global-storage

import { getGlobalObject, isNode } from '../utils/browser-or-node'
import { _get, _set } from '../utils/utilities';
import customEvent from '../events/custom'

module.exports = class Store {

  globalStore = {}
  persistent = false
  getVal
  setVal

  constructor ( persistent = false ) {

    // super()

      this.persistent = persistent
      this.getVal = this.get
      this.setVal = this.set

      this.globalStore = getGlobalObject()

      if (this.globalStore.store === undefined) {
 
        this.globalStore.store = { root: {},
                        instance: this
        }
        if (this.persistent) { 
          // load from file or DB storage, called from app root
          // insert at root
          this.globalStore.store.root = JSON.parse(this.getPersistent())
        }
      }   
  }


  get ( key ) {
    if (key === null) {
      throw new Error('Store: Key expected, instead received NULL')
    }
    let val = _get(this.globalStore.store.root, key)
    if (val !== undefined) return val
    // if (key in this.globalStore.store.root) return this.globalStore.store.root[key]
    // if non-existent then return undefined, let caller handle error
    else return undefined
  }

  set ( key, val = '', cb = ()=>{this.globalStore.store} ) {

    if (key === null) {
      throw new Error('Object expected, instead received NULL')
    }
    else if ( (typeof key !== 'function') && (typeof key === 'object') ) {
      for (var i in key) {
        _set(this.globalStore.store.root, i, key[i])
        if (isNode)
          customEvent.emit(i, key[i])
        else
          customEvent.emit(i, {detail: key[i]})
      }
    }
    else {
      _set(this.globalStore.store.root, key, val)
      if (isNode)
        customEvent.emit(key, val)
      else
        customEvent.emit(key, {detail: val})
    }
    // callback
    let result = cb(key, val)

    this.setPersistent(key)

    if (result !== undefined)
      return result
    else
      return this.globalStore.store
  }

  getPersistent () {

    throw new Error ("Persistent global store not implemented yet.")
  }

  setPersistent (key) {

    if (this.persistent) {
      console.warn ("Persistent global store not implemented yet.")
    }
  }

  watchVal ( key, cb ) {
    customEvent.on(key, cb)
  }

  // extend ( target ) {
  //   var sources = Array.prototype.slice.call(arguments, 1);
  //   return sources.forEach(function (source) {
  //       Object.keys(source).forEach(function (key) {
  //           target[key] = source[key];
  //       });
  //   }), target;
  // }

}
