import { isArray, isBoolean, isMap, isNumber, isObject, isString } from './typeChecks'

let _hasOwnProperty = Object.prototype.hasOwnProperty;

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
    let res = obj;
    let last = path[path.length - 1];
    if (path.length === 1) {
        if (isObject(res)) {
            return res[last] = value;
        }
        return undefined;
    }
    for (let i = 0; i < path.length - 1; i++) {
        let key = path[i];
        if (!_hasOwnProperty.call(res, key) || !isObject(res[key])) {
            res[key] = {};
        }
        res = res[key];
    }
    return res[last] = value;
}

// For this function:
// - level 0 is self
// - level 1 is parent
// - level 2 is grandparent
// and so on.
// https://stackoverflow.com/a/49417317/15109215
export function getPrototypeAt(level, obj) {
  let proto = Object.getPrototypeOf(obj);
  while (level--) proto = Object.getPrototypeOf(proto);
  return proto;
}

/**
 * Deep merge two objects.
 * https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6?permalink_comment_id=2930530#gistcomment-2930530
 * @param {Object} target
 * @param {Object} source
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
 * @param {Object} obj
 * @returns {Object}  
 */
export function copyDeep(obj, clone=true) {
  // if ("structuredClone" in navigator && clone) return _structuredClone(obj)

  if (obj === null || typeof obj !== 'object' || 'isActiveClone' in obj)
  return obj;

  let temp;
  if (obj instanceof Date)
      temp = new obj.constructor(); //or new Date(obj);
  else
      temp = Array.isArray(obj) ? [] : {}  // obj.constructor();

  for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj['isActiveClone'] = null;
          temp[key] = copyDeep(obj[key], false);
          delete obj['isActiveClone'];
      }
  }
  return temp;
}

function _structuredClone(obj) {
  try {
    return structuredClone(obj)
  }
  catch (e) {
    return copyDeep(obj, false)
  }
}

export function objToString(obj, ndeep) {
  if(obj == null){ return String(obj); }
  switch(typeof obj){
    case "string": return '"'+obj+'"';
    case "function": return obj.toString();
    case "object":
      let indent = Array(ndeep||1).join('\t'), isArray = Array.isArray(obj);
      return '{['[+isArray] + Object.keys(obj).map(function(key){
           return '\n\t' + indent + key + ': ' + objToString(obj[key], (ndeep||1)+1);
         }).join(',') + '\n' + indent + '}]'[+isArray];
    default: return obj.toString();
  }
}

/**
 * recursively execute a function on object properties
 * @export
 * @param {Object} obj
 * @param {function} propExec
 */
export function objRecurse (obj, propExec) {
  if (!isObject(obj)) return
  for (let k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      objRecurse(obj[k], propExec)
    } else if (obj.hasOwnProperty(k)) {
      propExec(k, obj[k])
    }
  }
}

export const findInObjectById = (obj, id, updateFn) => {
  // have found the object
  if (obj["Id"] === id) {
    return updateFn(obj);
  }
  else {
    // iterate over the properties
    for (let propertyName in obj) {
      // any object that is not a simple value
      if (obj[propertyName] !== null && typeof obj[propertyName] === 'object') {
        // recurse into the object and write back the result to the object graph
        obj[propertyName] = findInObjectById(obj[propertyName], id, updateFn);
      }
    }
  }
  return obj;
};

export function objRecurseUpdate (path, obj) {
	const keys = path.split(".")
  let i, k;
  const cb = (obj) => {
    for (i; i < keys.length; i++) {
      k = findInObjectById(obj, keys[i], cb)
    }
  }

}

export function setProperty (obj, path, value) {
  const [head, ...rest] = path.split('.')

  return {
      ...obj,
      [head]: rest.length
          ? setProperty(obj[head], rest.join('.'), value)
          : value
  }
}

export function getProperty(obj, path) {
  const keys = path.split(".")
  return keys.reduce((o, key) =>
      (o && o[key] !== 'undefined') ? o[key] : undefined, obj);
}

// https://www.30secondsofcode.org/js/s/data-structures-doubly-linked-list/
export class DoubleLinkedList {
  constructor() {
    this.nodes = [];
  }

  get size() {
    return this.nodes.length;
  }

  get head() {
    return this.size ? this.nodes[0] : null;
  }

  get tail() {
    return this.size ? this.nodes[this.size - 1] : null;
  }

  insertAt(index, value) {
    const previousNode = this.nodes[index - 1] || null;
    const nextNode = this.nodes[index] || null;
    const node = { value, next: nextNode, previous: previousNode };

    if (previousNode) previousNode.next = node;
    if (nextNode) nextNode.previous = node;
    this.nodes.splice(index, 0, node);
  }

  insertFirst(value) {
    this.insertAt(0, value);
  }

  insertLast(value) {
    this.insertAt(this.size, value);
  }

  getAt(index) {
    return this.nodes[index];
  }

  removeAt(index) {
    const previousNode = this.nodes[index - 1] || null;
    const nextNode = this.nodes[index + 1] || null;

    if (previousNode) previousNode.next = nextNode;
    if (nextNode) nextNode.previous = previousNode;

    return this.nodes.splice(index, 1);
  }

  clear() {
    this.nodes = [];
  }

  reverse() {
    this.nodes = this.nodes.reduce((acc, { value }) => {
      const nextNode = acc[0] || null;
      const node = { value, next: nextNode, previous: null };
      if (nextNode) nextNode.previous = node;
      return [node, ...acc];
    }, []);
  }

  *[Symbol.iterator]() {
    yield* this.nodes;
  }
}


/**
 * array comparison
 * @param {Array} a1
 * @param {Array} a2
 * @return {boolean}
 */
export function isArrayEqual(a1, a2) {
  if (!isArray(a1) || !isArray(a2)) return false
  if (a1.length !== a2.length) return false
  let i = a1.length;
  while (i--) {
    if (isArray(a1[i]) || isArray(a2[i])) {
      if (!isArrayEqual(a1[i], a2[i])) return false
      continue
    }
    if (isObject(a1[i]) || isObject(a1[i])) {
      // FIXME
      if (!isObject(a1[i], a2[i])) return false
      continue
    }
    if (a1[i] !== a2[i]) return false;
  }
  return true
}

/**
 * Find nearest number value in Array
 * @param {number} x
 * @param {Array} array
 * @returns {Array} - index, value
 */
export function nearestArrayValue(x, array) {
  let minDist = Infinity;
  let minDistIndex = -1;
  let minValue = null;
  let i = 0;

  // Find the closest array element to x by iterating over the array in reverse order
  while (i++ < array.length) {
    let xi = array[i];
    let diff = Math.abs(xi - x);
    if (diff < minDist) {
      minDist = diff;
      minDistIndex = i;
      minValue = xi;
    }
  }

  // Return the index and value of the closest array element
  return [minDistIndex, minValue];
}

/**
 * Move an array element from one position to another
 * @param {Array} arr
 * @param {number} fromIndex
 * @param {number} toIndex
 */
export function arrayMove(arr, fromIndex, toIndex) {
  let element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

/**
 * Swap array element positions
 * @param {Array} myArray 
 * @param {number} index1 
 * @param {number} index2 
 */
export function swapArrayElements(myArray, index1, index2) {
  [myArray[index1], myArray[index2]] = [myArray[index2], myArray[index1]];
}

/**
 * test if (array of) values exist in target array
 * @param {Array} values - single value or array of values 
 * @param {Array|*} arr - target array to search
 * @returns {boolean}  
 */
export function valuesInArray(values, arr) {
  if (!isArray(arr)) return false
  if (!isArray(values)) return arr.includes(values)
  return values.every(value => {
    return arr.includes(value)
  })
}

// https://stackoverflow.com/a/69350827/15109215
export const unique = (a) => [...new Set(a)];
export const uniqueBy = (x,f)=>Object.values(x.reduce((a,b)=>((a[f(b)]=b),a),{}));
export const intersection = (a, b) => a.filter((v) => b.includes(v));
export const diff = (a, b) => a.filter((v) => !b.includes(v));
export const symDiff = (a, b) => diff(a, b).concat(diff(b, a));
export const union = (a, b) => diff(a, b).concat(b);


/**
 * object comparison
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {boolean}
 */
export function isObjectEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) return false

  const obj1Keys = Object.keys(obj1).sort();
  const obj2Keys = Object.keys(obj2).sort();

  if (obj1Keys.length !== obj2Keys.length) return false

  else {
    const areEqual = obj1Keys.every((key, index) => {
      const val1 = obj1[key];
      const val2 = obj2[obj2Keys[index]];
      if (isArray(val1) || isArray(val2)) return isArrayEqual(val1, val2)
      if (isObject(val1) || isObject(val2)) return isObjectEqual(val1, val2)
      return val1 === val2;
    });
    return areEqual
  }
}

// unique ID
export function uid(tag="ID") {
  // sanitize tag - make it HTML and CSS friendly
  if (isNumber(tag)) tag = tag.toString()
  else if (!isString(tag)) tag = "ID"
  tag = idSanitize(tag)

  // add "randomness" to make id unique
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2,5);
  return `${tag}_${dateString}_${randomness}`
}

export function idSanitize(tag) {
  return String(tag).replace(/ |,|;|:|\.|#/g, "_");
}

// https://stackoverflow.com/a/20151856/15109215
export function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
    
  let blob = new Blob(byteArrays, {type: contentType});
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
      value: [...value.entries()], // or with spread: value: [...value]
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
 * Map() index handlers
 * @param {*} map 
 */
export const firstEntryInMap = map => map.entries().next().value
export const firstKeyInMap = map => map.entries().next().value[0]
export const firstValueInMap = map => map.entries().next().value[1]
export const lastEntryInMap = map => [...map].pop();
export const lastKeyInMap = map => [...map.keys()].pop();
export const lastValueInMap = map => [...map.values()].pop();

export class xMap extends Map {
  constructor(x) {
    super(x)
  }
  indexOfKey(key) {
    return [...this.keys()].indexOf(key);
  }
  indexOfValue(value) {
    return [...this.values()].indexOf(value)
  }
  entryAtIndex(index) {
    return [...this.entries()][index]
  }
  keyAtIndex(index) {
    return [...this.keys()][index]
  }
  valueAtIndex(index) {
    return [...this.values()][index]
  }
  insert(key, value, index) {
    return this.insertIndex(index, key, value)
  }
  remove(index) {
    return this.removeIndex(index)
  }
  firstEntry() {
    return firstEntryInMap(this)
  }
  firstKey() {
    return firstKeyInMap(this) 
  }
  firstValue() {
    return firstValueInMap(this)
  }
  lastEntry() {
    return lastEntryInMap(this)
  }
  lastKey() {
    return lastKeyInMap(this)
  }
  lastValue() {
    return lastValueInMap(this)
  }
  prevCurrNext(key) {
    let prev = curr = next = null;

    for (let keyVal of this) {
      prev = curr
      curr = keyVal
      if (keyVal.key == key) break
    }
    return {prev, curr, next}
  }
  // https://stackoverflow.com/a/41328397/15109215
  union(...iterables) {
    if (typeof super.prototype.union === "function")
      super.union(...iterables)
    else {
      for (const iterable of iterables) {
        for (const item of iterable) {
            this.set(...item);
        }
      }
    }
  }

  setMultiple(array) {
    if (!isArray(array)) return false
    array.forEach(([k,v]) => this.set(k,v));
    return true
  }

  populate(array) {
    if (!isArray(array)) return false
    this.clear()
    array.forEach(([k,v]) => this.set(k,v));
    return true
  }

  /**
   * Insert at specific Map() index
   * https://stackoverflow.com/a/53236461
   * @param {number} index
   * @param {*} key
   * @param {*} value
   * @returns {boolean}
   */
  insertIndex(index, key, value){
    if (!isNumber(index)) return false
    const arr = [...this];
    arr.splice(index, 0, [key, value]);
    this.populate(arr)
    return true
  }

  removeIndex(index) {
    if (!isNumber(index)) return false
    const arr = [...this];
    arr.splice(index, 1)
    this.populate(arr)
    return true
  }

  swapIndices(index1, index2) {
    if (!isNumber(index1) || !isNumber(index2)) return false
    const arr = [...this];
    swapArrayElements(arr, index1, index2)
    this.populate(arr)
    return true
  }

  swapKeys(key1, key2) {
    const arr = [...this],
        indexA = arr.findIndex(([v]) => v === key1),
        indexB = arr.findIndex(([v]) => v === key2);
    
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
    this.clear()
    arr.forEach(([k,v]) => this.set(k,v));
    return true
  }
}

/**
 * Debounce: the original function will be called after the caller stops calling the 
 * decorated function after a specified period.
 * debouncing, executes the function if there was no new event in $wait milliseconds
 * If `immediate` is passed, trigger the function on the leading edge, 
 * instead of the trailing.
 * @param {function} fn - The function to be called after a certain amount of time has passed without any further calls to the debounced function.
 * @param {number} wait - The amount of time, in milliseconds, that must pass before calling the original function again.
 * @param {*} scope - The context in which the original function will be called.
 * @param {boolean} immediate - whether the original function should be called immediately (if set to `true`) or after the wait period has passed (if set to `false`).
 * @returns {Function}
 */
//  export function debounce(fn, wait=100, scope, immediate=false) {
//   let timeout;
//   return async function() {
//     let context = scope || this
//     let args = arguments;
//     let later = function() {
//       timeout = null;
//       if (!immediate) fn.apply(context, args);
//     };
//     clearTimeout(timeout);
//     await new Promise(resolve => {
//       timeout = setTimeout( resolve(later()), wait );
//     })
//     if (immediate && !timeout) fn.apply(context, args);
//   };
// };

// export function debounce(fn, wait=100, scope, immediate=false) {
//   let timeout;
//   return function() {
//     let context = scope || this
//     let args = arguments;
//     let later = function() {
//         timeout = null;
//         if (!immediate) fn.apply(context, args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (immediate && !timeout) fn.apply(context, args);
//   };
// };

export function debounce(fn, wait=100, scope, immediate=false) {
  let timeout;
  return function() {
    let context = scope || this
    let args = arguments;
    let later = function() {
        timeout = null;
        if (!immediate) fn.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  };
};

/**
 * Throttle: the original function will be called 
 * at most once per specified period.
 * in case of a "storm of events", this executes once every $threshold
 * @param {function} fn - The function to be called after a certain amount of time has passed without any further calls to the debounced function.
 * @param {number} threshold - The amount of time, in milliseconds, that must pass before the original function is called.
 * @param {*} scope - The context in which the original function will be called.
 * @returns {Function}
 */
export function throttle(fn, threshold=250, scope) {
  let last, deferTimer;
  let core = function () {
  let context = scope || this;
    let now = new Date(),
        args = arguments;
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshold);
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
 * return promise state: fulfilled, rejected, pending
 * @export
 * @param {Promise} p - Promise
 * @returns {string} - pending, fulfilled, rejected
 */
export function promiseState(p) {
  const t = {};
  return Promise.race([p, t])
    .then(v => (v === t)? "pending" : "fulfilled", () => "rejected");
}

/**
 * array buffer to string (UTF-16)
 * @param {ArrayBuffer} buf - TypedArray
 * @return {string} 
 */
export function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

/**
 * convert string to ArrayBuffer (TypedArray)
 * @param {string} str
 * @return {ArrayBuffer}  
 */
export function str2ab(str) {
  let buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  let bufView = new Uint16Array(buf);
  for (let i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/**
 * encode an ArrayBuffer or string as PNG for storage
 * @export
 * @param {ArrayBuffer|string} src - data to encode
 * @return {dataURL|base64} - PNG image resource
 */
export function encodePNGDataStore(src) {
  const canvas = document.createElement('canvas')
  // canvas width and height
  const ctx = canvas.getContext('2d');
  let buffer;
  
  if (src.isView(src)) buffer = src
  else if (typeof src === "string") buffer = str2ab(src);

  // typed array represents an array of 8-bit unsigned integers clamped to 0–255
  const imgData = new Uint8ClampedArray.from(buffer)
  const len = imgData.length
  // set canvas size to imgData length
  canvas.height = 1
  canvas.width = len

  ctx.putImageData(imgData)
  // Convert canvas to DataURL
  // data:image/png;base64,wL2dvYWwgbW9yZ...
  const dataURL = ctx.toDataURL();
  // Convert to Base64 string
  // wL2dvYWwgbW9yZ...
  const base64 = getBase64StringFromDataURL(dataURL);

  return {dataURL, base64}
}

export function decodePNGDataStore(src, cb, type="string") {
  const img = new Image();
  const ctx = document.createElement('canvas').getContext('2d');
  img.src = src;
  return img.decode().then(() => {
      // Draw image to canvas
      ctx.width = img.width;
      ctx.height = img.height;
      ctx.drawImage(img, 0, 0);
      // Retrieve RGBA data
      const data = ctx.getImageData(0, 0, img.width, img.height).data;
      const result = (type === "string") ? ab2str(data) : data
      cb(result)
  });
}

