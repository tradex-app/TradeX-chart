////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

import "./extensions.js";

export class EventDispatcher {
  constructor(cstor) {
    if (!cstor) {
      throw Error("Object to define events cannot be null or undefined");
    }

    this.cstor = cstor;

    // copy event defines from prototype of target object
    const cstorProto = Object.getPrototypeOf(cstor);
    if (cstorProto.__events) {
      cstor.__events = { ...cstorProto.__events };
    } else {
      cstor.__events = {};
    }
  }

  registerEvents() {
    for (let i = 0; i < arguments.length; i++) {
      const eventName = arguments[i];
      this.cstor.__events[eventName] = null;
      this.setupPrototypeEventDispatcher(this.cstor, eventName);
		}
  }

  setupPrototypeEventDispatcher(cstor, name) {
    const _this = this;

    const addEventListener = function(eventName, listener) {
      const obj = this;

      if (eventName.indexOf(" ") > 0) {
        const eventNames = eventName.split(" ");
        for (let i = 0; i < eventNames.length; i++) {
          _this.addEventListenerForObject(obj, eventNames[i], listener);
        }
      } else {
        _this.addEventListenerForObject(obj, eventName, listener);
      }

      return listener;
    };

    const raiseEvent = function(name, args) {
      if (typeof this._eventListeners !== "object"
        || !this._eventListeners.hasOwnProperty(name)) {
        return;
      }
          
      const listenerList = this._eventListeners[name];

      let ret;
          
      for (let i = 0; i < listenerList.length; i++) {
        const listener = listenerList[i];
        ret = listener.call(this, args);

        if (ret) {
          break;
        }
      }

      return ret;
    };

    const proto = cstor.prototype;
    
    // addEventListener
    proto.addEventListener = addEventListener;

    // if (typeof proto.on !== "function") {
      proto.on = proto.addEventListener;
    // }

    // if (typeof proto.raiseEvent !== "function") {
      proto.raiseEvent = raiseEvent;
    // }

    // removeEventListener
    if (typeof proto.removeEventListener !== "function") {
      proto.removeEventListener = function(eventName, listener) {

        if (!this._eventListeners.hasOwnProperty(eventName)) {
          if (!(function() {
            if (eventName.startsWith("on")) {
              const eventNameWithoutOn = eventName.substr(2);

              if (cstor.__events.hasOwnProperty(eventNameWithoutOn)) {
                console.warn("recommended to remove 'on' prefix for removing event listener: " + eventName);
                eventName = eventNameWithoutOn;

                return true;
              }
            }

            return false;
          })()) {
            console.warn("listener to be removed from an event which does not exist: " + eventName);
            return;
          }
        }

        this._eventListeners[eventName]._t_remove(listener);
      };
    }
    
    // define event property
    Object.defineProperty(proto, "on" + name, {
      
      get: function() {
        return function() {
          return raiseEvent.call(this, name, ...arguments);
        }
      },

      set: function(listener) {
        // if assign listener to an event, clear all current registered events
        if (typeof this._eventListeners === "undefined") {
          Object.defineProperty(this, "_eventListeners", {
            value: {},
            enumerable: false,
          });
        }

        this._eventListeners[name] = [listener];
      },

      enumerable: false,
    });
  }

  addEventListenerForObject(obj, eventName, listener) {
    const cstor = Object.getPrototypeOf(obj).constructor;

    if (!cstor.__events.hasOwnProperty(eventName)) {

      if (!(function() {
        if (eventName.startsWith("on")) {
          const eventNameWithoutOn = eventName.substr(2);

          if (cstor.__events.hasOwnProperty(eventNameWithoutOn)) {
            console.warn("recommended to remove 'on' prefix for adding event listener: " + eventName);
            eventName = eventNameWithoutOn;

            return true;
          }
        }

        return false;
      }).call(this)) {
        console.warn("event to be listened does not exist: " + eventName);
        return;
      }
    }

    if (typeof obj._eventListeners === "undefined") {
      Object.defineProperty(obj, "_eventListeners", {
        value: {},
        enumerable: false,
      });
    }

    if (!obj._eventListeners.hasOwnProperty(eventName)) {
      obj._eventListeners[eventName] = [];
    }

    obj._eventListeners[eventName]._t_pushIfNotExist(listener);
  }
}
