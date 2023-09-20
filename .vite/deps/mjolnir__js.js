import {
  __commonJS,
  __toESM
} from "./chunk-DFKQJ226.js";

// node_modules/hammerjs/hammer.js
var require_hammer = __commonJS({
  "node_modules/hammerjs/hammer.js"(exports, module) {
    (function(window2, document2, exportName, undefined) {
      "use strict";
      var VENDOR_PREFIXES = ["", "webkit", "Moz", "MS", "ms", "o"];
      var TEST_ELEMENT = document2.createElement("div");
      var TYPE_FUNCTION = "function";
      var round = Math.round;
      var abs = Math.abs;
      var now = Date.now;
      function setTimeoutContext(fn, timeout, context) {
        return setTimeout(bindFn(fn, context), timeout);
      }
      function invokeArrayArg(arg, fn, context) {
        if (Array.isArray(arg)) {
          each(arg, context[fn], context);
          return true;
        }
        return false;
      }
      function each(obj, iterator, context) {
        var i;
        if (!obj) {
          return;
        }
        if (obj.forEach) {
          obj.forEach(iterator, context);
        } else if (obj.length !== undefined) {
          i = 0;
          while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
          }
        } else {
          for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
          }
        }
      }
      function deprecate(method, name, message) {
        var deprecationMessage = "DEPRECATED METHOD: " + name + "\n" + message + " AT \n";
        return function() {
          var e = new Error("get-stack-trace");
          var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace";
          var log = window2.console && (window2.console.warn || window2.console.log);
          if (log) {
            log.call(window2.console, deprecationMessage, stack);
          }
          return method.apply(this, arguments);
        };
      }
      var assign;
      if (typeof Object.assign !== "function") {
        assign = function assign2(target) {
          if (target === undefined || target === null) {
            throw new TypeError("Cannot convert undefined or null to object");
          }
          var output = Object(target);
          for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
              for (var nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                  output[nextKey] = source[nextKey];
                }
              }
            }
          }
          return output;
        };
      } else {
        assign = Object.assign;
      }
      var extend = deprecate(function extend2(dest, src, merge2) {
        var keys = Object.keys(src);
        var i = 0;
        while (i < keys.length) {
          if (!merge2 || merge2 && dest[keys[i]] === undefined) {
            dest[keys[i]] = src[keys[i]];
          }
          i++;
        }
        return dest;
      }, "extend", "Use `assign`.");
      var merge = deprecate(function merge2(dest, src) {
        return extend(dest, src, true);
      }, "merge", "Use `assign`.");
      function inherit(child, base, properties) {
        var baseP = base.prototype, childP;
        childP = child.prototype = Object.create(baseP);
        childP.constructor = child;
        childP._super = baseP;
        if (properties) {
          assign(childP, properties);
        }
      }
      function bindFn(fn, context) {
        return function boundFn() {
          return fn.apply(context, arguments);
        };
      }
      function boolOrFn(val, args) {
        if (typeof val == TYPE_FUNCTION) {
          return val.apply(args ? args[0] || undefined : undefined, args);
        }
        return val;
      }
      function ifUndefined(val1, val2) {
        return val1 === undefined ? val2 : val1;
      }
      function addEventListeners(target, types, handler) {
        each(splitStr(types), function(type) {
          target.addEventListener(type, handler, false);
        });
      }
      function removeEventListeners(target, types, handler) {
        each(splitStr(types), function(type) {
          target.removeEventListener(type, handler, false);
        });
      }
      function hasParent(node, parent) {
        while (node) {
          if (node == parent) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      }
      function inStr(str, find) {
        return str.indexOf(find) > -1;
      }
      function splitStr(str) {
        return str.trim().split(/\s+/g);
      }
      function inArray(src, find, findByKey) {
        if (src.indexOf && !findByKey) {
          return src.indexOf(find);
        } else {
          var i = 0;
          while (i < src.length) {
            if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
              return i;
            }
            i++;
          }
          return -1;
        }
      }
      function toArray(obj) {
        return Array.prototype.slice.call(obj, 0);
      }
      function uniqueArray(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;
        while (i < src.length) {
          var val = key ? src[i][key] : src[i];
          if (inArray(values, val) < 0) {
            results.push(src[i]);
          }
          values[i] = val;
          i++;
        }
        if (sort) {
          if (!key) {
            results = results.sort();
          } else {
            results = results.sort(function sortUniqueArray(a, b) {
              return a[key] > b[key];
            });
          }
        }
        return results;
      }
      function prefixed(obj, property) {
        var prefix, prop;
        var camelProp = property[0].toUpperCase() + property.slice(1);
        var i = 0;
        while (i < VENDOR_PREFIXES.length) {
          prefix = VENDOR_PREFIXES[i];
          prop = prefix ? prefix + camelProp : property;
          if (prop in obj) {
            return prop;
          }
          i++;
        }
        return undefined;
      }
      var _uniqueId = 1;
      function uniqueId() {
        return _uniqueId++;
      }
      function getWindowForElement(element) {
        var doc = element.ownerDocument || element;
        return doc.defaultView || doc.parentWindow || window2;
      }
      var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
      var SUPPORT_TOUCH = "ontouchstart" in window2;
      var SUPPORT_POINTER_EVENTS = prefixed(window2, "PointerEvent") !== undefined;
      var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
      var INPUT_TYPE_TOUCH = "touch";
      var INPUT_TYPE_PEN = "pen";
      var INPUT_TYPE_MOUSE = "mouse";
      var INPUT_TYPE_KINECT = "kinect";
      var COMPUTE_INTERVAL = 25;
      var INPUT_START2 = 1;
      var INPUT_MOVE2 = 2;
      var INPUT_END2 = 4;
      var INPUT_CANCEL = 8;
      var DIRECTION_NONE = 1;
      var DIRECTION_LEFT = 2;
      var DIRECTION_RIGHT = 4;
      var DIRECTION_UP = 8;
      var DIRECTION_DOWN = 16;
      var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
      var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
      var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
      var PROPS_XY = ["x", "y"];
      var PROPS_CLIENT_XY = ["clientX", "clientY"];
      function Input2(manager, callback) {
        var self2 = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget;
        this.domHandler = function(ev) {
          if (boolOrFn(manager.options.enable, [manager])) {
            self2.handler(ev);
          }
        };
        this.init();
      }
      Input2.prototype = {
        /**
         * should handle the inputEvent data and trigger the callback
         * @virtual
         */
        handler: function() {
        },
        /**
         * bind the events
         */
        init: function() {
          this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
          this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
          this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        },
        /**
         * unbind the events
         */
        destroy: function() {
          this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
          this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
          this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        }
      };
      function createInputInstance(manager) {
        var Type;
        var inputClass = manager.options.inputClass;
        if (inputClass) {
          Type = inputClass;
        } else if (SUPPORT_POINTER_EVENTS) {
          Type = PointerEventInput2;
        } else if (SUPPORT_ONLY_TOUCH) {
          Type = TouchInput;
        } else if (!SUPPORT_TOUCH) {
          Type = MouseInput2;
        } else {
          Type = TouchMouseInput;
        }
        return new Type(manager, inputHandler);
      }
      function inputHandler(manager, eventType, input) {
        var pointersLen = input.pointers.length;
        var changedPointersLen = input.changedPointers.length;
        var isFirst = eventType & INPUT_START2 && pointersLen - changedPointersLen === 0;
        var isFinal = eventType & (INPUT_END2 | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
        input.isFirst = !!isFirst;
        input.isFinal = !!isFinal;
        if (isFirst) {
          manager.session = {};
        }
        input.eventType = eventType;
        computeInputData(manager, input);
        manager.emit("hammer.input", input);
        manager.recognize(input);
        manager.session.prevInput = input;
      }
      function computeInputData(manager, input) {
        var session = manager.session;
        var pointers = input.pointers;
        var pointersLength = pointers.length;
        if (!session.firstInput) {
          session.firstInput = simpleCloneInputData(input);
        }
        if (pointersLength > 1 && !session.firstMultiple) {
          session.firstMultiple = simpleCloneInputData(input);
        } else if (pointersLength === 1) {
          session.firstMultiple = false;
        }
        var firstInput = session.firstInput;
        var firstMultiple = session.firstMultiple;
        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
        var center = input.center = getCenter(pointers);
        input.timeStamp = now();
        input.deltaTime = input.timeStamp - firstInput.timeStamp;
        input.angle = getAngle(offsetCenter, center);
        input.distance = getDistance(offsetCenter, center);
        computeDeltaXY(session, input);
        input.offsetDirection = getDirection(input.deltaX, input.deltaY);
        var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
        input.overallVelocityX = overallVelocity.x;
        input.overallVelocityY = overallVelocity.y;
        input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
        input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
        computeIntervalInputData(session, input);
        var target = manager.element;
        if (hasParent(input.srcEvent.target, target)) {
          target = input.srcEvent.target;
        }
        input.target = target;
      }
      function computeDeltaXY(session, input) {
        var center = input.center;
        var offset = session.offsetDelta || {};
        var prevDelta = session.prevDelta || {};
        var prevInput = session.prevInput || {};
        if (input.eventType === INPUT_START2 || prevInput.eventType === INPUT_END2) {
          prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
          };
          offset = session.offsetDelta = {
            x: center.x,
            y: center.y
          };
        }
        input.deltaX = prevDelta.x + (center.x - offset.x);
        input.deltaY = prevDelta.y + (center.y - offset.y);
      }
      function computeIntervalInputData(session, input) {
        var last = session.lastInterval || input, deltaTime = input.timeStamp - last.timeStamp, velocity, velocityX, velocityY, direction;
        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
          var deltaX = input.deltaX - last.deltaX;
          var deltaY = input.deltaY - last.deltaY;
          var v = getVelocity(deltaTime, deltaX, deltaY);
          velocityX = v.x;
          velocityY = v.y;
          velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
          direction = getDirection(deltaX, deltaY);
          session.lastInterval = input;
        } else {
          velocity = last.velocity;
          velocityX = last.velocityX;
          velocityY = last.velocityY;
          direction = last.direction;
        }
        input.velocity = velocity;
        input.velocityX = velocityX;
        input.velocityY = velocityY;
        input.direction = direction;
      }
      function simpleCloneInputData(input) {
        var pointers = [];
        var i = 0;
        while (i < input.pointers.length) {
          pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
          };
          i++;
        }
        return {
          timeStamp: now(),
          pointers,
          center: getCenter(pointers),
          deltaX: input.deltaX,
          deltaY: input.deltaY
        };
      }
      function getCenter(pointers) {
        var pointersLength = pointers.length;
        if (pointersLength === 1) {
          return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
          };
        }
        var x = 0, y = 0, i = 0;
        while (i < pointersLength) {
          x += pointers[i].clientX;
          y += pointers[i].clientY;
          i++;
        }
        return {
          x: round(x / pointersLength),
          y: round(y / pointersLength)
        };
      }
      function getVelocity(deltaTime, x, y) {
        return {
          x: x / deltaTime || 0,
          y: y / deltaTime || 0
        };
      }
      function getDirection(x, y) {
        if (x === y) {
          return DIRECTION_NONE;
        }
        if (abs(x) >= abs(y)) {
          return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
      }
      function getDistance(p1, p2, props) {
        if (!props) {
          props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]], y = p2[props[1]] - p1[props[1]];
        return Math.sqrt(x * x + y * y);
      }
      function getAngle(p1, p2, props) {
        if (!props) {
          props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]], y = p2[props[1]] - p1[props[1]];
        return Math.atan2(y, x) * 180 / Math.PI;
      }
      function getRotation(start, end) {
        return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
      }
      function getScale(start, end) {
        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
      }
      var MOUSE_INPUT_MAP2 = {
        mousedown: INPUT_START2,
        mousemove: INPUT_MOVE2,
        mouseup: INPUT_END2
      };
      var MOUSE_ELEMENT_EVENTS = "mousedown";
      var MOUSE_WINDOW_EVENTS = "mousemove mouseup";
      function MouseInput2() {
        this.evEl = MOUSE_ELEMENT_EVENTS;
        this.evWin = MOUSE_WINDOW_EVENTS;
        this.pressed = false;
        Input2.apply(this, arguments);
      }
      inherit(MouseInput2, Input2, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function MEhandler(ev) {
          var eventType = MOUSE_INPUT_MAP2[ev.type];
          if (eventType & INPUT_START2 && ev.button === 0) {
            this.pressed = true;
          }
          if (eventType & INPUT_MOVE2 && ev.which !== 1) {
            eventType = INPUT_END2;
          }
          if (!this.pressed) {
            return;
          }
          if (eventType & INPUT_END2) {
            this.pressed = false;
          }
          this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
          });
        }
      });
      var POINTER_INPUT_MAP = {
        pointerdown: INPUT_START2,
        pointermove: INPUT_MOVE2,
        pointerup: INPUT_END2,
        pointercancel: INPUT_CANCEL,
        pointerout: INPUT_CANCEL
      };
      var IE10_POINTER_TYPE_ENUM = {
        2: INPUT_TYPE_TOUCH,
        3: INPUT_TYPE_PEN,
        4: INPUT_TYPE_MOUSE,
        5: INPUT_TYPE_KINECT
        // see https://twitter.com/jacobrossi/status/480596438489890816
      };
      var POINTER_ELEMENT_EVENTS = "pointerdown";
      var POINTER_WINDOW_EVENTS = "pointermove pointerup pointercancel";
      if (window2.MSPointerEvent && !window2.PointerEvent) {
        POINTER_ELEMENT_EVENTS = "MSPointerDown";
        POINTER_WINDOW_EVENTS = "MSPointerMove MSPointerUp MSPointerCancel";
      }
      function PointerEventInput2() {
        this.evEl = POINTER_ELEMENT_EVENTS;
        this.evWin = POINTER_WINDOW_EVENTS;
        Input2.apply(this, arguments);
        this.store = this.manager.session.pointerEvents = [];
      }
      inherit(PointerEventInput2, Input2, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function PEhandler(ev) {
          var store = this.store;
          var removePointer = false;
          var eventTypeNormalized = ev.type.toLowerCase().replace("ms", "");
          var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
          var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
          var isTouch = pointerType == INPUT_TYPE_TOUCH;
          var storeIndex = inArray(store, ev.pointerId, "pointerId");
          if (eventType & INPUT_START2 && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
              store.push(ev);
              storeIndex = store.length - 1;
            }
          } else if (eventType & (INPUT_END2 | INPUT_CANCEL)) {
            removePointer = true;
          }
          if (storeIndex < 0) {
            return;
          }
          store[storeIndex] = ev;
          this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType,
            srcEvent: ev
          });
          if (removePointer) {
            store.splice(storeIndex, 1);
          }
        }
      });
      var SINGLE_TOUCH_INPUT_MAP = {
        touchstart: INPUT_START2,
        touchmove: INPUT_MOVE2,
        touchend: INPUT_END2,
        touchcancel: INPUT_CANCEL
      };
      var SINGLE_TOUCH_TARGET_EVENTS = "touchstart";
      var SINGLE_TOUCH_WINDOW_EVENTS = "touchstart touchmove touchend touchcancel";
      function SingleTouchInput() {
        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
        this.started = false;
        Input2.apply(this, arguments);
      }
      inherit(SingleTouchInput, Input2, {
        handler: function TEhandler(ev) {
          var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
          if (type === INPUT_START2) {
            this.started = true;
          }
          if (!this.started) {
            return;
          }
          var touches = normalizeSingleTouches.call(this, ev, type);
          if (type & (INPUT_END2 | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
          }
          this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
          });
        }
      });
      function normalizeSingleTouches(ev, type) {
        var all = toArray(ev.touches);
        var changed = toArray(ev.changedTouches);
        if (type & (INPUT_END2 | INPUT_CANCEL)) {
          all = uniqueArray(all.concat(changed), "identifier", true);
        }
        return [all, changed];
      }
      var TOUCH_INPUT_MAP = {
        touchstart: INPUT_START2,
        touchmove: INPUT_MOVE2,
        touchend: INPUT_END2,
        touchcancel: INPUT_CANCEL
      };
      var TOUCH_TARGET_EVENTS = "touchstart touchmove touchend touchcancel";
      function TouchInput() {
        this.evTarget = TOUCH_TARGET_EVENTS;
        this.targetIds = {};
        Input2.apply(this, arguments);
      }
      inherit(TouchInput, Input2, {
        handler: function MTEhandler(ev) {
          var type = TOUCH_INPUT_MAP[ev.type];
          var touches = getTouches.call(this, ev, type);
          if (!touches) {
            return;
          }
          this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
          });
        }
      });
      function getTouches(ev, type) {
        var allTouches = toArray(ev.touches);
        var targetIds = this.targetIds;
        if (type & (INPUT_START2 | INPUT_MOVE2) && allTouches.length === 1) {
          targetIds[allTouches[0].identifier] = true;
          return [allTouches, allTouches];
        }
        var i, targetTouches, changedTouches = toArray(ev.changedTouches), changedTargetTouches = [], target = this.target;
        targetTouches = allTouches.filter(function(touch) {
          return hasParent(touch.target, target);
        });
        if (type === INPUT_START2) {
          i = 0;
          while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
          }
        }
        i = 0;
        while (i < changedTouches.length) {
          if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
          }
          if (type & (INPUT_END2 | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
          }
          i++;
        }
        if (!changedTargetTouches.length) {
          return;
        }
        return [
          // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
          uniqueArray(targetTouches.concat(changedTargetTouches), "identifier", true),
          changedTargetTouches
        ];
      }
      var DEDUP_TIMEOUT = 2500;
      var DEDUP_DISTANCE = 25;
      function TouchMouseInput() {
        Input2.apply(this, arguments);
        var handler = bindFn(this.handler, this);
        this.touch = new TouchInput(this.manager, handler);
        this.mouse = new MouseInput2(this.manager, handler);
        this.primaryTouch = null;
        this.lastTouches = [];
      }
      inherit(TouchMouseInput, Input2, {
        /**
         * handle mouse and touch events
         * @param {Hammer} manager
         * @param {String} inputEvent
         * @param {Object} inputData
         */
        handler: function TMEhandler(manager, inputEvent, inputData) {
          var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH, isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;
          if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
          }
          if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
          } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
          }
          this.callback(manager, inputEvent, inputData);
        },
        /**
         * remove the event listeners
         */
        destroy: function destroy() {
          this.touch.destroy();
          this.mouse.destroy();
        }
      });
      function recordTouches(eventType, eventData) {
        if (eventType & INPUT_START2) {
          this.primaryTouch = eventData.changedPointers[0].identifier;
          setLastTouch.call(this, eventData);
        } else if (eventType & (INPUT_END2 | INPUT_CANCEL)) {
          setLastTouch.call(this, eventData);
        }
      }
      function setLastTouch(eventData) {
        var touch = eventData.changedPointers[0];
        if (touch.identifier === this.primaryTouch) {
          var lastTouch = { x: touch.clientX, y: touch.clientY };
          this.lastTouches.push(lastTouch);
          var lts = this.lastTouches;
          var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
              lts.splice(i, 1);
            }
          };
          setTimeout(removeLastTouch, DEDUP_TIMEOUT);
        }
      }
      function isSyntheticEvent(eventData) {
        var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
        for (var i = 0; i < this.lastTouches.length; i++) {
          var t = this.lastTouches[i];
          var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
          if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
          }
        }
        return false;
      }
      var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, "touchAction");
      var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
      var TOUCH_ACTION_COMPUTE = "compute";
      var TOUCH_ACTION_AUTO = "auto";
      var TOUCH_ACTION_MANIPULATION = "manipulation";
      var TOUCH_ACTION_NONE = "none";
      var TOUCH_ACTION_PAN_X = "pan-x";
      var TOUCH_ACTION_PAN_Y = "pan-y";
      var TOUCH_ACTION_MAP = getTouchActionProps();
      function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value);
      }
      TouchAction.prototype = {
        /**
         * set the touchAction value on the element or enable the polyfill
         * @param {String} value
         */
        set: function(value) {
          if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
          }
          if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
          }
          this.actions = value.toLowerCase().trim();
        },
        /**
         * just re-set the touchAction value
         */
        update: function() {
          this.set(this.manager.options.touchAction);
        },
        /**
         * compute the value for the touchAction property based on the recognizer's settings
         * @returns {String} value
         */
        compute: function() {
          var actions = [];
          each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
              actions = actions.concat(recognizer.getTouchAction());
            }
          });
          return cleanTouchActions(actions.join(" "));
        },
        /**
         * this method is called on each input cycle and provides the preventing of the browser behavior
         * @param {Object} input
         */
        preventDefaults: function(input) {
          var srcEvent = input.srcEvent;
          var direction = input.offsetDirection;
          if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
          }
          var actions = this.actions;
          var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
          var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
          var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];
          if (hasNone) {
            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;
            if (isTapPointer && isTapMovement && isTapTouchTime) {
              return;
            }
          }
          if (hasPanX && hasPanY) {
            return;
          }
          if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
            return this.preventSrc(srcEvent);
          }
        },
        /**
         * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
         * @param {Object} srcEvent
         */
        preventSrc: function(srcEvent) {
          this.manager.session.prevented = true;
          srcEvent.preventDefault();
        }
      };
      function cleanTouchActions(actions) {
        if (inStr(actions, TOUCH_ACTION_NONE)) {
          return TOUCH_ACTION_NONE;
        }
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
        if (hasPanX && hasPanY) {
          return TOUCH_ACTION_NONE;
        }
        if (hasPanX || hasPanY) {
          return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
        }
        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
          return TOUCH_ACTION_MANIPULATION;
        }
        return TOUCH_ACTION_AUTO;
      }
      function getTouchActionProps() {
        if (!NATIVE_TOUCH_ACTION) {
          return false;
        }
        var touchMap = {};
        var cssSupports = window2.CSS && window2.CSS.supports;
        ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(val) {
          touchMap[val] = cssSupports ? window2.CSS.supports("touch-action", val) : true;
        });
        return touchMap;
      }
      var STATE_POSSIBLE = 1;
      var STATE_BEGAN = 2;
      var STATE_CHANGED = 4;
      var STATE_ENDED = 8;
      var STATE_RECOGNIZED = STATE_ENDED;
      var STATE_CANCELLED = 16;
      var STATE_FAILED = 32;
      function Recognizer(options) {
        this.options = assign({}, this.defaults, options || {});
        this.id = uniqueId();
        this.manager = null;
        this.options.enable = ifUndefined(this.options.enable, true);
        this.state = STATE_POSSIBLE;
        this.simultaneous = {};
        this.requireFail = [];
      }
      Recognizer.prototype = {
        /**
         * @virtual
         * @type {Object}
         */
        defaults: {},
        /**
         * set options
         * @param {Object} options
         * @return {Recognizer}
         */
        set: function(options) {
          assign(this.options, options);
          this.manager && this.manager.touchAction.update();
          return this;
        },
        /**
         * recognize simultaneous with an other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        recognizeWith: function(otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, "recognizeWith", this)) {
            return this;
          }
          var simultaneous = this.simultaneous;
          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
          }
          return this;
        },
        /**
         * drop the simultaneous link. it doesnt remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRecognizeWith: function(otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, "dropRecognizeWith", this)) {
            return this;
          }
          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          delete this.simultaneous[otherRecognizer.id];
          return this;
        },
        /**
         * recognizer can only run when an other is failing
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        requireFailure: function(otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, "requireFailure", this)) {
            return this;
          }
          var requireFail = this.requireFail;
          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
          }
          return this;
        },
        /**
         * drop the requireFailure link. it does not remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRequireFailure: function(otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, "dropRequireFailure", this)) {
            return this;
          }
          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          var index = inArray(this.requireFail, otherRecognizer);
          if (index > -1) {
            this.requireFail.splice(index, 1);
          }
          return this;
        },
        /**
         * has require failures boolean
         * @returns {boolean}
         */
        hasRequireFailures: function() {
          return this.requireFail.length > 0;
        },
        /**
         * if the recognizer can recognize simultaneous with an other recognizer
         * @param {Recognizer} otherRecognizer
         * @returns {Boolean}
         */
        canRecognizeWith: function(otherRecognizer) {
          return !!this.simultaneous[otherRecognizer.id];
        },
        /**
         * You should use `tryEmit` instead of `emit` directly to check
         * that all the needed recognizers has failed before emitting.
         * @param {Object} input
         */
        emit: function(input) {
          var self2 = this;
          var state = this.state;
          function emit(event) {
            self2.manager.emit(event, input);
          }
          if (state < STATE_ENDED) {
            emit(self2.options.event + stateStr(state));
          }
          emit(self2.options.event);
          if (input.additionalEvent) {
            emit(input.additionalEvent);
          }
          if (state >= STATE_ENDED) {
            emit(self2.options.event + stateStr(state));
          }
        },
        /**
         * Check that all the require failure recognizers has failed,
         * if true, it emits a gesture event,
         * otherwise, setup the state to FAILED.
         * @param {Object} input
         */
        tryEmit: function(input) {
          if (this.canEmit()) {
            return this.emit(input);
          }
          this.state = STATE_FAILED;
        },
        /**
         * can we emit?
         * @returns {boolean}
         */
        canEmit: function() {
          var i = 0;
          while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
              return false;
            }
            i++;
          }
          return true;
        },
        /**
         * update the recognizer
         * @param {Object} inputData
         */
        recognize: function(inputData) {
          var inputDataClone = assign({}, inputData);
          if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
          }
          if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
          }
          this.state = this.process(inputDataClone);
          if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
          }
        },
        /**
         * return the state of the recognizer
         * the actual recognizing happens in this method
         * @virtual
         * @param {Object} inputData
         * @returns {Const} STATE
         */
        process: function(inputData) {
        },
        // jshint ignore:line
        /**
         * return the preferred touch-action
         * @virtual
         * @returns {Array}
         */
        getTouchAction: function() {
        },
        /**
         * called when the gesture isn't allowed to recognize
         * like when another is being recognized or it is disabled
         * @virtual
         */
        reset: function() {
        }
      };
      function stateStr(state) {
        if (state & STATE_CANCELLED) {
          return "cancel";
        } else if (state & STATE_ENDED) {
          return "end";
        } else if (state & STATE_CHANGED) {
          return "move";
        } else if (state & STATE_BEGAN) {
          return "start";
        }
        return "";
      }
      function directionStr(direction) {
        if (direction == DIRECTION_DOWN) {
          return "down";
        } else if (direction == DIRECTION_UP) {
          return "up";
        } else if (direction == DIRECTION_LEFT) {
          return "left";
        } else if (direction == DIRECTION_RIGHT) {
          return "right";
        }
        return "";
      }
      function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
        var manager = recognizer.manager;
        if (manager) {
          return manager.get(otherRecognizer);
        }
        return otherRecognizer;
      }
      function AttrRecognizer() {
        Recognizer.apply(this, arguments);
      }
      inherit(AttrRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof AttrRecognizer
         */
        defaults: {
          /**
           * @type {Number}
           * @default 1
           */
          pointers: 1
        },
        /**
         * Used to check if it the recognizer receives valid input, like input.distance > 10.
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {Boolean} recognized
         */
        attrTest: function(input) {
          var optionPointers = this.options.pointers;
          return optionPointers === 0 || input.pointers.length === optionPointers;
        },
        /**
         * Process the input and return the state for the recognizer
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {*} State
         */
        process: function(input) {
          var state = this.state;
          var eventType = input.eventType;
          var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
          var isValid = this.attrTest(input);
          if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
          } else if (isRecognized || isValid) {
            if (eventType & INPUT_END2) {
              return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
              return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
          }
          return STATE_FAILED;
        }
      });
      function PanRecognizer() {
        AttrRecognizer.apply(this, arguments);
        this.pX = null;
        this.pY = null;
      }
      inherit(PanRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PanRecognizer
         */
        defaults: {
          event: "pan",
          threshold: 10,
          pointers: 1,
          direction: DIRECTION_ALL
        },
        getTouchAction: function() {
          var direction = this.options.direction;
          var actions = [];
          if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
          }
          if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
          }
          return actions;
        },
        directionTest: function(input) {
          var options = this.options;
          var hasMoved = true;
          var distance = input.distance;
          var direction = input.direction;
          var x = input.deltaX;
          var y = input.deltaY;
          if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
              direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
              hasMoved = x != this.pX;
              distance = Math.abs(input.deltaX);
            } else {
              direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
              hasMoved = y != this.pY;
              distance = Math.abs(input.deltaY);
            }
          }
          input.direction = direction;
          return hasMoved && distance > options.threshold && direction & options.direction;
        },
        attrTest: function(input) {
          return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
        },
        emit: function(input) {
          this.pX = input.deltaX;
          this.pY = input.deltaY;
          var direction = directionStr(input.direction);
          if (direction) {
            input.additionalEvent = this.options.event + direction;
          }
          this._super.emit.call(this, input);
        }
      });
      function PinchRecognizer() {
        AttrRecognizer.apply(this, arguments);
      }
      inherit(PinchRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
          event: "pinch",
          threshold: 0,
          pointers: 2
        },
        getTouchAction: function() {
          return [TOUCH_ACTION_NONE];
        },
        attrTest: function(input) {
          return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
        },
        emit: function(input) {
          if (input.scale !== 1) {
            var inOut = input.scale < 1 ? "in" : "out";
            input.additionalEvent = this.options.event + inOut;
          }
          this._super.emit.call(this, input);
        }
      });
      function PressRecognizer() {
        Recognizer.apply(this, arguments);
        this._timer = null;
        this._input = null;
      }
      inherit(PressRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PressRecognizer
         */
        defaults: {
          event: "press",
          pointers: 1,
          time: 251,
          // minimal time of the pointer to be pressed
          threshold: 9
          // a minimal movement is ok, but keep it low
        },
        getTouchAction: function() {
          return [TOUCH_ACTION_AUTO];
        },
        process: function(input) {
          var options = this.options;
          var validPointers = input.pointers.length === options.pointers;
          var validMovement = input.distance < options.threshold;
          var validTime = input.deltaTime > options.time;
          this._input = input;
          if (!validMovement || !validPointers || input.eventType & (INPUT_END2 | INPUT_CANCEL) && !validTime) {
            this.reset();
          } else if (input.eventType & INPUT_START2) {
            this.reset();
            this._timer = setTimeoutContext(function() {
              this.state = STATE_RECOGNIZED;
              this.tryEmit();
            }, options.time, this);
          } else if (input.eventType & INPUT_END2) {
            return STATE_RECOGNIZED;
          }
          return STATE_FAILED;
        },
        reset: function() {
          clearTimeout(this._timer);
        },
        emit: function(input) {
          if (this.state !== STATE_RECOGNIZED) {
            return;
          }
          if (input && input.eventType & INPUT_END2) {
            this.manager.emit(this.options.event + "up", input);
          } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
          }
        }
      });
      function RotateRecognizer() {
        AttrRecognizer.apply(this, arguments);
      }
      inherit(RotateRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof RotateRecognizer
         */
        defaults: {
          event: "rotate",
          threshold: 0,
          pointers: 2
        },
        getTouchAction: function() {
          return [TOUCH_ACTION_NONE];
        },
        attrTest: function(input) {
          return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
        }
      });
      function SwipeRecognizer() {
        AttrRecognizer.apply(this, arguments);
      }
      inherit(SwipeRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof SwipeRecognizer
         */
        defaults: {
          event: "swipe",
          threshold: 10,
          velocity: 0.3,
          direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
          pointers: 1
        },
        getTouchAction: function() {
          return PanRecognizer.prototype.getTouchAction.call(this);
        },
        attrTest: function(input) {
          var direction = this.options.direction;
          var velocity;
          if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
          } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
          } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
          }
          return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END2;
        },
        emit: function(input) {
          var direction = directionStr(input.offsetDirection);
          if (direction) {
            this.manager.emit(this.options.event + direction, input);
          }
          this.manager.emit(this.options.event, input);
        }
      });
      function TapRecognizer() {
        Recognizer.apply(this, arguments);
        this.pTime = false;
        this.pCenter = false;
        this._timer = null;
        this._input = null;
        this.count = 0;
      }
      inherit(TapRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
          event: "tap",
          pointers: 1,
          taps: 1,
          interval: 300,
          // max time between the multi-tap taps
          time: 250,
          // max time of the pointer to be down (like finger on the screen)
          threshold: 9,
          // a minimal movement is ok, but keep it low
          posThreshold: 10
          // a multi-tap can be a bit off the initial position
        },
        getTouchAction: function() {
          return [TOUCH_ACTION_MANIPULATION];
        },
        process: function(input) {
          var options = this.options;
          var validPointers = input.pointers.length === options.pointers;
          var validMovement = input.distance < options.threshold;
          var validTouchTime = input.deltaTime < options.time;
          this.reset();
          if (input.eventType & INPUT_START2 && this.count === 0) {
            return this.failTimeout();
          }
          if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END2) {
              return this.failTimeout();
            }
            var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
            this.pTime = input.timeStamp;
            this.pCenter = input.center;
            if (!validMultiTap || !validInterval) {
              this.count = 1;
            } else {
              this.count += 1;
            }
            this._input = input;
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
              if (!this.hasRequireFailures()) {
                return STATE_RECOGNIZED;
              } else {
                this._timer = setTimeoutContext(function() {
                  this.state = STATE_RECOGNIZED;
                  this.tryEmit();
                }, options.interval, this);
                return STATE_BEGAN;
              }
            }
          }
          return STATE_FAILED;
        },
        failTimeout: function() {
          this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
          }, this.options.interval, this);
          return STATE_FAILED;
        },
        reset: function() {
          clearTimeout(this._timer);
        },
        emit: function() {
          if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
          }
        }
      });
      function Hammer(element, options) {
        options = options || {};
        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
        return new Manager3(element, options);
      }
      Hammer.VERSION = "2.0.7";
      Hammer.defaults = {
        /**
         * set if DOM events are being triggered.
         * But this is slower and unused by simple implementations, so disabled by default.
         * @type {Boolean}
         * @default false
         */
        domEvents: false,
        /**
         * The value for the touchAction property/fallback.
         * When set to `compute` it will magically set the correct value based on the added recognizers.
         * @type {String}
         * @default compute
         */
        touchAction: TOUCH_ACTION_COMPUTE,
        /**
         * @type {Boolean}
         * @default true
         */
        enable: true,
        /**
         * EXPERIMENTAL FEATURE -- can be removed/changed
         * Change the parent input target element.
         * If Null, then it is being set the to main element.
         * @type {Null|EventTarget}
         * @default null
         */
        inputTarget: null,
        /**
         * force an input class
         * @type {Null|Function}
         * @default null
         */
        inputClass: null,
        /**
         * Default recognizer setup when calling `Hammer()`
         * When creating a new Manager these will be skipped.
         * @type {Array}
         */
        preset: [
          // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
          [RotateRecognizer, { enable: false }],
          [PinchRecognizer, { enable: false }, ["rotate"]],
          [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }],
          [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ["swipe"]],
          [TapRecognizer],
          [TapRecognizer, { event: "doubletap", taps: 2 }, ["tap"]],
          [PressRecognizer]
        ],
        /**
         * Some CSS properties can be used to improve the working of Hammer.
         * Add them to this method and they will be set when creating a new Manager.
         * @namespace
         */
        cssProps: {
          /**
           * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
           * @type {String}
           * @default 'none'
           */
          userSelect: "none",
          /**
           * Disable the Windows Phone grippers when pressing an element.
           * @type {String}
           * @default 'none'
           */
          touchSelect: "none",
          /**
           * Disables the default callout shown when you touch and hold a touch target.
           * On iOS, when you touch and hold a touch target such as a link, Safari displays
           * a callout containing information about the link. This property allows you to disable that callout.
           * @type {String}
           * @default 'none'
           */
          touchCallout: "none",
          /**
           * Specifies whether zooming is enabled. Used by IE10>
           * @type {String}
           * @default 'none'
           */
          contentZooming: "none",
          /**
           * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
           * @type {String}
           * @default 'none'
           */
          userDrag: "none",
          /**
           * Overrides the highlight color shown when the user taps a link or a JavaScript
           * clickable element in iOS. This property obeys the alpha value, if specified.
           * @type {String}
           * @default 'rgba(0,0,0,0)'
           */
          tapHighlightColor: "rgba(0,0,0,0)"
        }
      };
      var STOP = 1;
      var FORCED_STOP = 2;
      function Manager3(element, options) {
        this.options = assign({}, Hammer.defaults, options || {});
        this.options.inputTarget = this.options.inputTarget || element;
        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};
        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);
        toggleCssProps(this, true);
        each(this.options.recognizers, function(item) {
          var recognizer = this.add(new item[0](item[1]));
          item[2] && recognizer.recognizeWith(item[2]);
          item[3] && recognizer.requireFailure(item[3]);
        }, this);
      }
      Manager3.prototype = {
        /**
         * set options
         * @param {Object} options
         * @returns {Manager}
         */
        set: function(options) {
          assign(this.options, options);
          if (options.touchAction) {
            this.touchAction.update();
          }
          if (options.inputTarget) {
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
          }
          return this;
        },
        /**
         * stop recognizing for this session.
         * This session will be discarded, when a new [input]start event is fired.
         * When forced, the recognizer cycle is stopped immediately.
         * @param {Boolean} [force]
         */
        stop: function(force) {
          this.session.stopped = force ? FORCED_STOP : STOP;
        },
        /**
         * run the recognizers!
         * called by the inputHandler function on every movement of the pointers (touches)
         * it walks through all the recognizers and tries to detect the gesture that is being made
         * @param {Object} inputData
         */
        recognize: function(inputData) {
          var session = this.session;
          if (session.stopped) {
            return;
          }
          this.touchAction.preventDefaults(inputData);
          var recognizer;
          var recognizers = this.recognizers;
          var curRecognizer = session.curRecognizer;
          if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
            curRecognizer = session.curRecognizer = null;
          }
          var i = 0;
          while (i < recognizers.length) {
            recognizer = recognizers[i];
            if (session.stopped !== FORCED_STOP && // 1
            (!curRecognizer || recognizer == curRecognizer || // 2
            recognizer.canRecognizeWith(curRecognizer))) {
              recognizer.recognize(inputData);
            } else {
              recognizer.reset();
            }
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
              curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
          }
        },
        /**
         * get a recognizer by its event name.
         * @param {Recognizer|String} recognizer
         * @returns {Recognizer|Null}
         */
        get: function(recognizer) {
          if (recognizer instanceof Recognizer) {
            return recognizer;
          }
          var recognizers = this.recognizers;
          for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
              return recognizers[i];
            }
          }
          return null;
        },
        /**
         * add a recognizer to the manager
         * existing recognizers with the same event name will be removed
         * @param {Recognizer} recognizer
         * @returns {Recognizer|Manager}
         */
        add: function(recognizer) {
          if (invokeArrayArg(recognizer, "add", this)) {
            return this;
          }
          var existing = this.get(recognizer.options.event);
          if (existing) {
            this.remove(existing);
          }
          this.recognizers.push(recognizer);
          recognizer.manager = this;
          this.touchAction.update();
          return recognizer;
        },
        /**
         * remove a recognizer by name or instance
         * @param {Recognizer|String} recognizer
         * @returns {Manager}
         */
        remove: function(recognizer) {
          if (invokeArrayArg(recognizer, "remove", this)) {
            return this;
          }
          recognizer = this.get(recognizer);
          if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);
            if (index !== -1) {
              recognizers.splice(index, 1);
              this.touchAction.update();
            }
          }
          return this;
        },
        /**
         * bind event
         * @param {String} events
         * @param {Function} handler
         * @returns {EventEmitter} this
         */
        on: function(events, handler) {
          if (events === undefined) {
            return;
          }
          if (handler === undefined) {
            return;
          }
          var handlers = this.handlers;
          each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
          });
          return this;
        },
        /**
         * unbind event, leave emit blank to remove all handlers
         * @param {String} events
         * @param {Function} [handler]
         * @returns {EventEmitter} this
         */
        off: function(events, handler) {
          if (events === undefined) {
            return;
          }
          var handlers = this.handlers;
          each(splitStr(events), function(event) {
            if (!handler) {
              delete handlers[event];
            } else {
              handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
          });
          return this;
        },
        /**
         * emit event to the listeners
         * @param {String} event
         * @param {Object} data
         */
        emit: function(event, data) {
          if (this.options.domEvents) {
            triggerDomEvent(event, data);
          }
          var handlers = this.handlers[event] && this.handlers[event].slice();
          if (!handlers || !handlers.length) {
            return;
          }
          data.type = event;
          data.preventDefault = function() {
            data.srcEvent.preventDefault();
          };
          var i = 0;
          while (i < handlers.length) {
            handlers[i](data);
            i++;
          }
        },
        /**
         * destroy the manager and unbinds all events
         * it doesn't unbind dom events, that is the user own responsibility
         */
        destroy: function() {
          this.element && toggleCssProps(this, false);
          this.handlers = {};
          this.session = {};
          this.input.destroy();
          this.element = null;
        }
      };
      function toggleCssProps(manager, add) {
        var element = manager.element;
        if (!element.style) {
          return;
        }
        var prop;
        each(manager.options.cssProps, function(value, name) {
          prop = prefixed(element.style, name);
          if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
          } else {
            element.style[prop] = manager.oldCssProps[prop] || "";
          }
        });
        if (!add) {
          manager.oldCssProps = {};
        }
      }
      function triggerDomEvent(event, data) {
        var gestureEvent = document2.createEvent("Event");
        gestureEvent.initEvent(event, true, true);
        gestureEvent.gesture = data;
        data.target.dispatchEvent(gestureEvent);
      }
      assign(Hammer, {
        INPUT_START: INPUT_START2,
        INPUT_MOVE: INPUT_MOVE2,
        INPUT_END: INPUT_END2,
        INPUT_CANCEL,
        STATE_POSSIBLE,
        STATE_BEGAN,
        STATE_CHANGED,
        STATE_ENDED,
        STATE_RECOGNIZED,
        STATE_CANCELLED,
        STATE_FAILED,
        DIRECTION_NONE,
        DIRECTION_LEFT,
        DIRECTION_RIGHT,
        DIRECTION_UP,
        DIRECTION_DOWN,
        DIRECTION_HORIZONTAL,
        DIRECTION_VERTICAL,
        DIRECTION_ALL,
        Manager: Manager3,
        Input: Input2,
        TouchAction,
        TouchInput,
        MouseInput: MouseInput2,
        PointerEventInput: PointerEventInput2,
        TouchMouseInput,
        SingleTouchInput,
        Recognizer,
        AttrRecognizer,
        Tap: TapRecognizer,
        Pan: PanRecognizer,
        Swipe: SwipeRecognizer,
        Pinch: PinchRecognizer,
        Rotate: RotateRecognizer,
        Press: PressRecognizer,
        on: addEventListeners,
        off: removeEventListeners,
        each,
        merge,
        extend,
        assign,
        inherit,
        bindFn,
        prefixed
      });
      var freeGlobal = typeof window2 !== "undefined" ? window2 : typeof self !== "undefined" ? self : {};
      freeGlobal.Hammer = Hammer;
      if (typeof define === "function" && define.amd) {
        define(function() {
          return Hammer;
        });
      } else if (typeof module != "undefined" && module.exports) {
        module.exports = Hammer;
      } else {
        window2[exportName] = Hammer;
      }
    })(window, document, "Hammer");
  }
});

// node_modules/mjolnir.js/dist/esm/utils/hammer.browser.js
var hammerjs = __toESM(require_hammer());

// node_modules/mjolnir.js/dist/esm/utils/hammer-overrides.js
var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var MOUSE_INPUT_MAP = {
  mousedown: INPUT_START,
  mousemove: INPUT_MOVE,
  mouseup: INPUT_END
};
function some(array, predict) {
  for (let i = 0; i < array.length; i++) {
    if (predict(array[i])) {
      return true;
    }
  }
  return false;
}
function enhancePointerEventInput(PointerEventInput2) {
  const oldHandler = PointerEventInput2.prototype.handler;
  PointerEventInput2.prototype.handler = function handler(ev) {
    const store = this.store;
    if (ev.button > 0 && ev.type === "pointerdown") {
      if (!some(store, (e) => e.pointerId === ev.pointerId)) {
        store.push(ev);
      }
    }
    oldHandler.call(this, ev);
  };
}
function enhanceMouseInput(MouseInput2) {
  MouseInput2.prototype.handler = function handler(ev) {
    let eventType = MOUSE_INPUT_MAP[ev.type];
    if (eventType & INPUT_START && ev.button >= 0) {
      this.pressed = true;
    }
    if (eventType & INPUT_MOVE && ev.which === 0) {
      eventType = INPUT_END;
    }
    if (!this.pressed) {
      return;
    }
    if (eventType & INPUT_END) {
      this.pressed = false;
    }
    this.callback(this.manager, eventType, {
      pointers: [ev],
      changedPointers: [ev],
      pointerType: "mouse",
      srcEvent: ev
    });
  };
}

// node_modules/mjolnir.js/dist/esm/utils/hammer.browser.js
enhancePointerEventInput(hammerjs.PointerEventInput);
enhanceMouseInput(hammerjs.MouseInput);
var Manager2 = hammerjs.Manager;
var hammer_browser_default = hammerjs;

// node_modules/mjolnir.js/dist/esm/inputs/input.js
var Input = class {
  constructor(element, callback, options) {
    this.element = element;
    this.callback = callback;
    this.options = { enable: true, ...options };
  }
};

// node_modules/mjolnir.js/dist/esm/constants.js
var RECOGNIZERS = hammer_browser_default ? [
  [hammer_browser_default.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: false }],
  [hammer_browser_default.Rotate, { enable: false }],
  [hammer_browser_default.Pinch, { enable: false }],
  [hammer_browser_default.Swipe, { enable: false }],
  [hammer_browser_default.Pan, { threshold: 0, enable: false }],
  [hammer_browser_default.Press, { enable: false }],
  [hammer_browser_default.Tap, { event: "doubletap", taps: 2, enable: false }],
  // TODO - rename to 'tap' and 'singletap' in the next major release
  [hammer_browser_default.Tap, { event: "anytap", enable: false }],
  [hammer_browser_default.Tap, { enable: false }]
] : null;
var RECOGNIZER_COMPATIBLE_MAP = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
};
var RECOGNIZER_FALLBACK_MAP = {
  doubletap: ["tap"]
};
var BASIC_EVENT_ALIASES = {
  pointerdown: "pointerdown",
  pointermove: "pointermove",
  pointerup: "pointerup",
  touchstart: "pointerdown",
  touchmove: "pointermove",
  touchend: "pointerup",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup"
};
var INPUT_EVENT_TYPES = {
  KEY_EVENTS: ["keydown", "keyup"],
  MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
  WHEEL_EVENTS: [
    // Chrome, Safari
    "wheel",
    // IE
    "mousewheel"
  ]
};
var EVENT_RECOGNIZER_MAP = {
  tap: "tap",
  anytap: "anytap",
  doubletap: "doubletap",
  press: "press",
  pinch: "pinch",
  pinchin: "pinch",
  pinchout: "pinch",
  pinchstart: "pinch",
  pinchmove: "pinch",
  pinchend: "pinch",
  pinchcancel: "pinch",
  rotate: "rotate",
  rotatestart: "rotate",
  rotatemove: "rotate",
  rotateend: "rotate",
  rotatecancel: "rotate",
  tripan: "tripan",
  tripanstart: "tripan",
  tripanmove: "tripan",
  tripanup: "tripan",
  tripandown: "tripan",
  tripanleft: "tripan",
  tripanright: "tripan",
  tripanend: "tripan",
  tripancancel: "tripan",
  pan: "pan",
  panstart: "pan",
  panmove: "pan",
  panup: "pan",
  pandown: "pan",
  panleft: "pan",
  panright: "pan",
  panend: "pan",
  pancancel: "pan",
  swipe: "swipe",
  swipeleft: "swipe",
  swiperight: "swipe",
  swipeup: "swipe",
  swipedown: "swipe"
};
var GESTURE_EVENT_ALIASES = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
};

// node_modules/mjolnir.js/dist/esm/utils/globals.js
var userAgent = typeof navigator !== "undefined" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "";
var window_ = typeof window !== "undefined" ? window : global;
var passiveSupported = false;
try {
  const options = {
    // This function will be called when the browser
    // attempts to access the passive property.
    get passive() {
      passiveSupported = true;
      return true;
    }
  };
  window_.addEventListener("test", null, options);
  window_.removeEventListener("test", null);
} catch (err) {
  passiveSupported = false;
}

// node_modules/mjolnir.js/dist/esm/inputs/wheel-input.js
var firefox = userAgent.indexOf("firefox") !== -1;
var { WHEEL_EVENTS } = INPUT_EVENT_TYPES;
var EVENT_TYPE = "wheel";
var WHEEL_DELTA_MAGIC_SCALER = 4.000244140625;
var WHEEL_DELTA_PER_LINE = 40;
var SHIFT_MULTIPLIER = 0.25;
var WheelInput = class extends Input {
  constructor(element, callback, options) {
    super(element, callback, options);
    this.handleEvent = (event) => {
      if (!this.options.enable) {
        return;
      }
      let value = event.deltaY;
      if (window_.WheelEvent) {
        if (firefox && event.deltaMode === window_.WheelEvent.DOM_DELTA_PIXEL) {
          value /= window_.devicePixelRatio;
        }
        if (event.deltaMode === window_.WheelEvent.DOM_DELTA_LINE) {
          value *= WHEEL_DELTA_PER_LINE;
        }
      }
      if (value !== 0 && value % WHEEL_DELTA_MAGIC_SCALER === 0) {
        value = Math.floor(value / WHEEL_DELTA_MAGIC_SCALER);
      }
      if (event.shiftKey && value) {
        value = value * SHIFT_MULTIPLIER;
      }
      this.callback({
        type: EVENT_TYPE,
        center: {
          x: event.clientX,
          y: event.clientY
        },
        delta: -value,
        srcEvent: event,
        pointerType: "mouse",
        target: event.target
      });
    };
    this.events = (this.options.events || []).concat(WHEEL_EVENTS);
    this.events.forEach((event) => element.addEventListener(event, this.handleEvent, passiveSupported ? { passive: false } : false));
  }
  destroy() {
    this.events.forEach((event) => this.element.removeEventListener(event, this.handleEvent));
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === EVENT_TYPE) {
      this.options.enable = enabled;
    }
  }
};

// node_modules/mjolnir.js/dist/esm/inputs/move-input.js
var { MOUSE_EVENTS } = INPUT_EVENT_TYPES;
var MOVE_EVENT_TYPE = "pointermove";
var OVER_EVENT_TYPE = "pointerover";
var OUT_EVENT_TYPE = "pointerout";
var ENTER_EVENT_TYPE = "pointerenter";
var LEAVE_EVENT_TYPE = "pointerleave";
var MoveInput = class extends Input {
  constructor(element, callback, options) {
    super(element, callback, options);
    this.handleEvent = (event) => {
      this.handleOverEvent(event);
      this.handleOutEvent(event);
      this.handleEnterEvent(event);
      this.handleLeaveEvent(event);
      this.handleMoveEvent(event);
    };
    this.pressed = false;
    const { enable } = this.options;
    this.enableMoveEvent = enable;
    this.enableLeaveEvent = enable;
    this.enableEnterEvent = enable;
    this.enableOutEvent = enable;
    this.enableOverEvent = enable;
    this.events = (this.options.events || []).concat(MOUSE_EVENTS);
    this.events.forEach((event) => element.addEventListener(event, this.handleEvent));
  }
  destroy() {
    this.events.forEach((event) => this.element.removeEventListener(event, this.handleEvent));
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === MOVE_EVENT_TYPE) {
      this.enableMoveEvent = enabled;
    }
    if (eventType === OVER_EVENT_TYPE) {
      this.enableOverEvent = enabled;
    }
    if (eventType === OUT_EVENT_TYPE) {
      this.enableOutEvent = enabled;
    }
    if (eventType === ENTER_EVENT_TYPE) {
      this.enableEnterEvent = enabled;
    }
    if (eventType === LEAVE_EVENT_TYPE) {
      this.enableLeaveEvent = enabled;
    }
  }
  handleOverEvent(event) {
    if (this.enableOverEvent) {
      if (event.type === "mouseover") {
        this._emit(OVER_EVENT_TYPE, event);
      }
    }
  }
  handleOutEvent(event) {
    if (this.enableOutEvent) {
      if (event.type === "mouseout") {
        this._emit(OUT_EVENT_TYPE, event);
      }
    }
  }
  handleEnterEvent(event) {
    if (this.enableEnterEvent) {
      if (event.type === "mouseenter") {
        this._emit(ENTER_EVENT_TYPE, event);
      }
    }
  }
  handleLeaveEvent(event) {
    if (this.enableLeaveEvent) {
      if (event.type === "mouseleave") {
        this._emit(LEAVE_EVENT_TYPE, event);
      }
    }
  }
  handleMoveEvent(event) {
    if (this.enableMoveEvent) {
      switch (event.type) {
        case "mousedown":
          if (event.button >= 0) {
            this.pressed = true;
          }
          break;
        case "mousemove":
          if (event.which === 0) {
            this.pressed = false;
          }
          if (!this.pressed) {
            this._emit(MOVE_EVENT_TYPE, event);
          }
          break;
        case "mouseup":
          this.pressed = false;
          break;
        default:
      }
    }
  }
  _emit(type, event) {
    this.callback({
      type,
      center: {
        x: event.clientX,
        y: event.clientY
      },
      srcEvent: event,
      pointerType: "mouse",
      target: event.target
    });
  }
};

// node_modules/mjolnir.js/dist/esm/inputs/key-input.js
var { KEY_EVENTS } = INPUT_EVENT_TYPES;
var DOWN_EVENT_TYPE = "keydown";
var UP_EVENT_TYPE = "keyup";
var KeyInput = class extends Input {
  constructor(element, callback, options) {
    super(element, callback, options);
    this.handleEvent = (event) => {
      const targetElement = event.target || event.srcElement;
      if (targetElement.tagName === "INPUT" && targetElement.type === "text" || targetElement.tagName === "TEXTAREA") {
        return;
      }
      if (this.enableDownEvent && event.type === "keydown") {
        this.callback({
          type: DOWN_EVENT_TYPE,
          srcEvent: event,
          key: event.key,
          target: event.target
        });
      }
      if (this.enableUpEvent && event.type === "keyup") {
        this.callback({
          type: UP_EVENT_TYPE,
          srcEvent: event,
          key: event.key,
          target: event.target
        });
      }
    };
    this.enableDownEvent = this.options.enable;
    this.enableUpEvent = this.options.enable;
    this.events = (this.options.events || []).concat(KEY_EVENTS);
    element.tabIndex = this.options.tabIndex || 0;
    element.style.outline = "none";
    this.events.forEach((event) => element.addEventListener(event, this.handleEvent));
  }
  destroy() {
    this.events.forEach((event) => this.element.removeEventListener(event, this.handleEvent));
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === DOWN_EVENT_TYPE) {
      this.enableDownEvent = enabled;
    }
    if (eventType === UP_EVENT_TYPE) {
      this.enableUpEvent = enabled;
    }
  }
};

// node_modules/mjolnir.js/dist/esm/inputs/contextmenu-input.js
var EVENT_TYPE2 = "contextmenu";
var ContextmenuInput = class extends Input {
  constructor(element, callback, options) {
    super(element, callback, options);
    this.handleEvent = (event) => {
      if (!this.options.enable) {
        return;
      }
      this.callback({
        type: EVENT_TYPE2,
        center: {
          x: event.clientX,
          y: event.clientY
        },
        srcEvent: event,
        pointerType: "mouse",
        target: event.target
      });
    };
    element.addEventListener("contextmenu", this.handleEvent);
  }
  destroy() {
    this.element.removeEventListener("contextmenu", this.handleEvent);
  }
  /**
   * Enable this input (begin processing events)
   * if the specified event type is among those handled by this input.
   */
  enableEventType(eventType, enabled) {
    if (eventType === EVENT_TYPE2) {
      this.options.enable = enabled;
    }
  }
};

// node_modules/mjolnir.js/dist/esm/utils/event-utils.js
var DOWN_EVENT = 1;
var MOVE_EVENT = 2;
var UP_EVENT = 4;
var MOUSE_EVENTS2 = {
  pointerdown: DOWN_EVENT,
  pointermove: MOVE_EVENT,
  pointerup: UP_EVENT,
  mousedown: DOWN_EVENT,
  mousemove: MOVE_EVENT,
  mouseup: UP_EVENT
};
var MOUSE_EVENT_WHICH_LEFT = 1;
var MOUSE_EVENT_WHICH_MIDDLE = 2;
var MOUSE_EVENT_WHICH_RIGHT = 3;
var MOUSE_EVENT_BUTTON_LEFT = 0;
var MOUSE_EVENT_BUTTON_MIDDLE = 1;
var MOUSE_EVENT_BUTTON_RIGHT = 2;
var MOUSE_EVENT_BUTTONS_LEFT_MASK = 1;
var MOUSE_EVENT_BUTTONS_RIGHT_MASK = 2;
var MOUSE_EVENT_BUTTONS_MIDDLE_MASK = 4;
function whichButtons(event) {
  const eventType = MOUSE_EVENTS2[event.srcEvent.type];
  if (!eventType) {
    return null;
  }
  const { buttons, button, which } = event.srcEvent;
  let leftButton = false;
  let middleButton = false;
  let rightButton = false;
  if (
    // button is up, need to find out which one was pressed before
    eventType === UP_EVENT || // moving but does not support `buttons` API
    eventType === MOVE_EVENT && !Number.isFinite(buttons)
  ) {
    leftButton = which === MOUSE_EVENT_WHICH_LEFT;
    middleButton = which === MOUSE_EVENT_WHICH_MIDDLE;
    rightButton = which === MOUSE_EVENT_WHICH_RIGHT;
  } else if (eventType === MOVE_EVENT) {
    leftButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_LEFT_MASK);
    middleButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_MIDDLE_MASK);
    rightButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_RIGHT_MASK);
  } else if (eventType === DOWN_EVENT) {
    leftButton = button === MOUSE_EVENT_BUTTON_LEFT;
    middleButton = button === MOUSE_EVENT_BUTTON_MIDDLE;
    rightButton = button === MOUSE_EVENT_BUTTON_RIGHT;
  }
  return { leftButton, middleButton, rightButton };
}
function getOffsetPosition(event, rootElement) {
  const center = event.center;
  if (!center) {
    return null;
  }
  const rect = rootElement.getBoundingClientRect();
  const scaleX = rect.width / rootElement.offsetWidth || 1;
  const scaleY = rect.height / rootElement.offsetHeight || 1;
  const offsetCenter = {
    x: (center.x - rect.left - rootElement.clientLeft) / scaleX,
    y: (center.y - rect.top - rootElement.clientTop) / scaleY
  };
  return { center, offsetCenter };
}

// node_modules/mjolnir.js/dist/esm/utils/event-registrar.js
var DEFAULT_OPTIONS = {
  srcElement: "root",
  priority: 0
};
var EventRegistrar = class {
  constructor(eventManager) {
    this.handleEvent = (event) => {
      if (this.isEmpty()) {
        return;
      }
      const mjolnirEvent = this._normalizeEvent(event);
      let target = event.srcEvent.target;
      while (target && target !== mjolnirEvent.rootElement) {
        this._emit(mjolnirEvent, target);
        if (mjolnirEvent.handled) {
          return;
        }
        target = target.parentNode;
      }
      this._emit(mjolnirEvent, "root");
    };
    this.eventManager = eventManager;
    this.handlers = [];
    this.handlersByElement = /* @__PURE__ */ new Map();
    this._active = false;
  }
  // Returns true if there are no non-passive handlers
  isEmpty() {
    return !this._active;
  }
  add(type, handler, options, once = false, passive = false) {
    const { handlers, handlersByElement } = this;
    let opts = DEFAULT_OPTIONS;
    if (typeof options === "string" || options && options.addEventListener) {
      opts = { ...DEFAULT_OPTIONS, srcElement: options };
    } else if (options) {
      opts = { ...DEFAULT_OPTIONS, ...options };
    }
    let entries = handlersByElement.get(opts.srcElement);
    if (!entries) {
      entries = [];
      handlersByElement.set(opts.srcElement, entries);
    }
    const entry = {
      type,
      handler,
      srcElement: opts.srcElement,
      priority: opts.priority
    };
    if (once) {
      entry.once = true;
    }
    if (passive) {
      entry.passive = true;
    }
    handlers.push(entry);
    this._active = this._active || !entry.passive;
    let insertPosition = entries.length - 1;
    while (insertPosition >= 0) {
      if (entries[insertPosition].priority >= entry.priority) {
        break;
      }
      insertPosition--;
    }
    entries.splice(insertPosition + 1, 0, entry);
  }
  remove(type, handler) {
    const { handlers, handlersByElement } = this;
    for (let i = handlers.length - 1; i >= 0; i--) {
      const entry = handlers[i];
      if (entry.type === type && entry.handler === handler) {
        handlers.splice(i, 1);
        const entries = handlersByElement.get(entry.srcElement);
        entries.splice(entries.indexOf(entry), 1);
        if (entries.length === 0) {
          handlersByElement.delete(entry.srcElement);
        }
      }
    }
    this._active = handlers.some((entry) => !entry.passive);
  }
  /**
   * Invoke handlers on a particular element
   */
  _emit(event, srcElement) {
    const entries = this.handlersByElement.get(srcElement);
    if (entries) {
      let immediatePropagationStopped = false;
      const stopPropagation = () => {
        event.handled = true;
      };
      const stopImmediatePropagation = () => {
        event.handled = true;
        immediatePropagationStopped = true;
      };
      const entriesToRemove = [];
      for (let i = 0; i < entries.length; i++) {
        const { type, handler, once } = entries[i];
        handler({
          ...event,
          // @ts-ignore
          type,
          stopPropagation,
          stopImmediatePropagation
        });
        if (once) {
          entriesToRemove.push(entries[i]);
        }
        if (immediatePropagationStopped) {
          break;
        }
      }
      for (let i = 0; i < entriesToRemove.length; i++) {
        const { type, handler } = entriesToRemove[i];
        this.remove(type, handler);
      }
    }
  }
  /**
   * Normalizes hammerjs and custom events to have predictable fields.
   */
  _normalizeEvent(event) {
    const rootElement = this.eventManager.getElement();
    return {
      ...event,
      ...whichButtons(event),
      ...getOffsetPosition(event, rootElement),
      preventDefault: () => {
        event.srcEvent.preventDefault();
      },
      stopImmediatePropagation: null,
      stopPropagation: null,
      handled: false,
      rootElement
    };
  }
};

// node_modules/mjolnir.js/dist/esm/event-manager.js
var DEFAULT_OPTIONS2 = {
  // event handlers
  events: null,
  // custom recognizers
  recognizers: null,
  recognizerOptions: {},
  // Manager class
  Manager: Manager2,
  // allow browser default touch action
  // https://github.com/uber/react-map-gl/issues/506
  touchAction: "none",
  tabIndex: 0
};
var EventManager = class {
  constructor(element = null, options) {
    this._onBasicInput = (event) => {
      const { srcEvent } = event;
      const alias = BASIC_EVENT_ALIASES[srcEvent.type];
      if (alias) {
        this.manager.emit(alias, event);
      }
    };
    this._onOtherEvent = (event) => {
      this.manager.emit(event.type, event);
    };
    this.options = { ...DEFAULT_OPTIONS2, ...options };
    this.events = /* @__PURE__ */ new Map();
    this.setElement(element);
    const { events } = this.options;
    if (events) {
      this.on(events);
    }
  }
  getElement() {
    return this.element;
  }
  setElement(element) {
    if (this.element) {
      this.destroy();
    }
    this.element = element;
    if (!element) {
      return;
    }
    const { options } = this;
    const ManagerClass = options.Manager;
    this.manager = new ManagerClass(element, {
      touchAction: options.touchAction,
      recognizers: options.recognizers || RECOGNIZERS
    }).on("hammer.input", this._onBasicInput);
    if (!options.recognizers) {
      Object.keys(RECOGNIZER_COMPATIBLE_MAP).forEach((name) => {
        const recognizer = this.manager.get(name);
        if (recognizer) {
          RECOGNIZER_COMPATIBLE_MAP[name].forEach((otherName) => {
            recognizer.recognizeWith(otherName);
          });
        }
      });
    }
    for (const recognizerName in options.recognizerOptions) {
      const recognizer = this.manager.get(recognizerName);
      if (recognizer) {
        const recognizerOption = options.recognizerOptions[recognizerName];
        delete recognizerOption.enable;
        recognizer.set(recognizerOption);
      }
    }
    this.wheelInput = new WheelInput(element, this._onOtherEvent, {
      enable: false
    });
    this.moveInput = new MoveInput(element, this._onOtherEvent, {
      enable: false
    });
    this.keyInput = new KeyInput(element, this._onOtherEvent, {
      enable: false,
      tabIndex: options.tabIndex
    });
    this.contextmenuInput = new ContextmenuInput(element, this._onOtherEvent, {
      enable: false
    });
    for (const [eventAlias, eventRegistrar] of this.events) {
      if (!eventRegistrar.isEmpty()) {
        this._toggleRecognizer(eventRegistrar.recognizerName, true);
        this.manager.on(eventAlias, eventRegistrar.handleEvent);
      }
    }
  }
  // Tear down internal event management implementations.
  destroy() {
    if (this.element) {
      this.wheelInput.destroy();
      this.moveInput.destroy();
      this.keyInput.destroy();
      this.contextmenuInput.destroy();
      this.manager.destroy();
      this.wheelInput = null;
      this.moveInput = null;
      this.keyInput = null;
      this.contextmenuInput = null;
      this.manager = null;
      this.element = null;
    }
  }
  /** Register an event handler function to be called on `event` */
  on(event, handler, opts) {
    this._addEventHandler(event, handler, opts, false);
  }
  once(event, handler, opts) {
    this._addEventHandler(event, handler, opts, true);
  }
  watch(event, handler, opts) {
    this._addEventHandler(event, handler, opts, false, true);
  }
  off(event, handler) {
    this._removeEventHandler(event, handler);
  }
  /*
   * Enable/disable recognizer for the given event
   */
  _toggleRecognizer(name, enabled) {
    const { manager } = this;
    if (!manager) {
      return;
    }
    const recognizer = manager.get(name);
    if (recognizer && recognizer.options.enable !== enabled) {
      recognizer.set({ enable: enabled });
      const fallbackRecognizers = RECOGNIZER_FALLBACK_MAP[name];
      if (fallbackRecognizers && !this.options.recognizers) {
        fallbackRecognizers.forEach((otherName) => {
          const otherRecognizer = manager.get(otherName);
          if (enabled) {
            otherRecognizer.requireFailure(name);
            recognizer.dropRequireFailure(otherName);
          } else {
            otherRecognizer.dropRequireFailure(name);
          }
        });
      }
    }
    this.wheelInput.enableEventType(name, enabled);
    this.moveInput.enableEventType(name, enabled);
    this.keyInput.enableEventType(name, enabled);
    this.contextmenuInput.enableEventType(name, enabled);
  }
  /**
   * Process the event registration for a single event + handler.
   */
  _addEventHandler(event, handler, opts, once, passive) {
    if (typeof event !== "string") {
      opts = handler;
      for (const eventName in event) {
        this._addEventHandler(eventName, event[eventName], opts, once, passive);
      }
      return;
    }
    const { manager, events } = this;
    const eventAlias = GESTURE_EVENT_ALIASES[event] || event;
    let eventRegistrar = events.get(eventAlias);
    if (!eventRegistrar) {
      eventRegistrar = new EventRegistrar(this);
      events.set(eventAlias, eventRegistrar);
      eventRegistrar.recognizerName = EVENT_RECOGNIZER_MAP[eventAlias] || eventAlias;
      if (manager) {
        manager.on(eventAlias, eventRegistrar.handleEvent);
      }
    }
    eventRegistrar.add(event, handler, opts, once, passive);
    if (!eventRegistrar.isEmpty()) {
      this._toggleRecognizer(eventRegistrar.recognizerName, true);
    }
  }
  /**
   * Process the event deregistration for a single event + handler.
   */
  _removeEventHandler(event, handler) {
    if (typeof event !== "string") {
      for (const eventName in event) {
        this._removeEventHandler(eventName, event[eventName]);
      }
      return;
    }
    const { events } = this;
    const eventAlias = GESTURE_EVENT_ALIASES[event] || event;
    const eventRegistrar = events.get(eventAlias);
    if (!eventRegistrar) {
      return;
    }
    eventRegistrar.remove(event, handler);
    if (eventRegistrar.isEmpty()) {
      const { recognizerName } = eventRegistrar;
      let isRecognizerUsed = false;
      for (const eh of events.values()) {
        if (eh.recognizerName === recognizerName && !eh.isEmpty()) {
          isRecognizerUsed = true;
          break;
        }
      }
      if (!isRecognizerUsed) {
        this._toggleRecognizer(recognizerName, false);
      }
    }
  }
};
export {
  EventManager
};
/*! Bundled license information:

hammerjs/hammer.js:
  (*! Hammer.JS - v2.0.7 - 2016-04-22
   * http://hammerjs.github.io/
   *
   * Copyright (c) 2016 Jorik Tangelder;
   * Licensed under the MIT license *)
*/
//# sourceMappingURL=mjolnir__js.js.map
