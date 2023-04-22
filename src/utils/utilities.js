import { isArray, isBoolean, isNumber, isObject, isString } from './typeChecks'

var _hasOwnProperty = Object.prototype.hasOwnProperty;

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
export function _get (obj, path, defaultValue = undefined) {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

// https://github.com/blakeembrey/setvalue/blob/master/src/index.ts
export function _set(obj, path, value) {
    if (path.length === 0) {
        return undefined;
    }
    var res = obj;
    var last = path[path.length - 1];
    if (path.length === 1) {
        if (isObject(res)) {
            return res[last] = value;
        }
        return undefined;
    }
    for (var i = 0; i < path.length - 1; i++) {
        var key = path[i];
        if (!_hasOwnProperty.call(res, key) || !isObject(res[key])) {
            res[key] = {};
        }
        res = res[key];
    }
    return res[last] = value;
}

/**
 * Deep merge two objects.
 * https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6?permalink_comment_id=2930530#gistcomment-2930530
 * @param {object} target
 * @param {object} source
 * @returns {object}
 */
 export function mergeDeep(target, source) {
  
  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = mergeDeep(targetValue.concat([]), (sourceValue));
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}

/**
 * Deep copy an array or object - no shared object references
 * https://stackoverflow.com/a/122190/15109215
 *
 * @export
 * @param {object} obj
 * @return {object}  
 */
export function copyDeep(obj) {
  if (obj === null || typeof obj !== 'object' || 'isActiveClone' in obj)
      return obj;

  if (obj instanceof Date)
      var temp = new obj.constructor(); //or new Date(obj);
  else
      var temp = Array.isArray(obj) ? [] : {}  // obj.constructor();

  for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj['isActiveClone'] = null;
          temp[key] = copyDeep(obj[key]);
          delete obj['isActiveClone'];
      }
  }
  return temp;
}

// unique ID
export function uid(tag="ID") {
  if (isNumber(tag)) tag = tag.toString()
  else if (!isString(tag)) tag = "ID"
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2,5);
  return `${tag}_${dateString}_${randomness}`
}

export function isArrayEqual(a1, a2) {
  let i = a1.length;
  while (i--) {
      if (a1[i] !== a2[i]) return false;
  }
  return true
}

/**
 *Find nearest number value in Array
 *
 * @param {number} x
 * @param {array} array
 * @return {array} - index, value
 */
export function nearestArrayValue(x, array) {
  let dist = Infinity
  let val = null
  let index = -1
  let i = 0

  while(i++ < array.length) {
    let xi = array[i]
    let diff = Math.abs(xi - x)
    if (diff < dist) {
      dist = diff
      val = xi
      index = i
    }
  }
  return [index, val]
}

// https://stackoverflow.com/a/20151856/15109215
export function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
    
  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

/**
 * Native Map() object serialization - JSON.stringify(originalValue, replacer);
 * Used as the second argument
 * https://stackoverflow.com/a/56150320/15109215
 * @param {*} key 
 * @param {*} value 
 * @returns {*}
 */
export function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

/**
 * Native Map() object reconstitution from JSON - JSON.parse(str, reviver);
 * Used as the second argument
 * https://stackoverflow.com/a/56150320/15109215
 * @param {*} key 
 * @param {*} value 
 * @returns {*}
 */
export function reviver(key, value) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

/**
 * Instert at specific Map() index
 * https://stackoverflow.com/a/53236461
 * @export
 * @param {number} index
 * @param {number} key
 * @param {*} value
 * @param {map} map
 * @return {map}  
 */
export function insertAtIndex(index, key, value, map){
  const arr = Array.from(map);
  arr.splice(index, 0, [key, value]);
  map.clear();
  arr.forEach(([k,v]) => map.set(k,v));
}

/**
 * Map() index handlers
 * @param {*} map 
 */
export const firstItemInMap = map => map.entries().next().value
export const firstKeyInMap = map => map.entries().next().value[0]
export const firstValueInMap = map => map.entries().next().value[1]
export const lastItemInMap = map => Array.from(map).pop();
export const lastKeyInMap = map => Array.from(map.keys()).pop();
export const lastValueInMap = map => Array.from(map.values()).pop();


/**
 * Debounce: the original function will be called after the caller stops calling the 
 * decorated function after a specified period.
 * debouncing, executes the function if there was no new event in $wait milliseconds
 * If `immediate` is passed, trigger the function on the leading edge, 
 * instead of the trailing.
 * @param {function} fn
 * @param {number} wait
 * @param {*} scope
 * @param {boolean} immediate
 * @returns {Function}
 */
 export function debounce(fn, wait=100, scope, immediate=false) {
  var timeout;
  var core = function() {
    var context = scope || this
    var args = arguments;
    var later = function() {
        timeout = null;
        if (!immediate) fn.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  };
  return core
};

/**
 * Throttle: the original function will be called 
 * at most once per specified period.
 * in case of a "storm of events", this executes once every $threshold
 * @param {function} fn
 * @param {number} threshhold
 * @param {*} scope
 * @returns {Function}
 */
export function throttle(fn, threshhold=250, scope) {
  var last, deferTimer;
  var core = function () {
    var context = scope || this;

    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
  function cancelTimer() {
    if (timeout) {
       clearTimeout(deferTimer);
       timeout = undefined;
    }
  }
  core.reset = function() {
    cancelTimer();
    last = 0;
  }
  return core
}

/**
 * Extender - multiple class inheritance
 * https://stackoverflow.com/a/45332959/15109215
 * class Boy extends aggregation(Person,Male,Child){}
 * @param {class} baseClass 
 * @param  {array} mixins - array of classes
 * @returns 
 */
export const extender = (baseClass, ...mixins) => {
  class base extends baseClass {
      constructor (...args) {
          super(...args);
          mixins.forEach((mixin) => {
              copyProps(this,(new mixin));
          });
      }
  }
  let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
      Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach((prop) => {
               if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                  Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
             })
  }
  mixins.forEach((mixin) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
      copyProps(base.prototype, mixin.prototype);
      copyProps(base, mixin);
  });
  return base;
}

/**
 * return promise state: fulfilled, rejected, pendings
 * @export
 * @param {*} p
 * @return {*}  
 */
export function promiseState(p) {
  const t = {};
  return Promise.race([p, t])
    .then(v => (v === t)? "pending" : "fulfilled", () => "rejected");
}

