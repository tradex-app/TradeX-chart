// import { isValidTimestamp } from "./time"

/**
 * @param {*} v
 * @returns {boolean}
 */
 export function isArray (v) {
  return Array.isArray(v)
}

/**
 * @param {*} v - value to test
 * @param {String} t - type
 * @returns {Boolean}
 */
export function isArrayOfType (v, t) {
  if (!isArray(v)) return false
  return v.every((n) => checkType(t, n))
}

/**
 * @param {*} v
 * @returns {boolean}
 */
export function isFunction (v) {
  return v && typeof v === 'function'
}

/**
 * @param {*} v
 * @returns {boolean}
 */
export function isObject (v) {
  return (
  typeof v === 'object' &&
  !Array.isArray(v) &&
  v !== null)
}

/**
 * @param {*} v
 * @returns {boolean}
 */
export function isNumber (v) {
  return typeof v === 'number' && !isNaN(v)
}

/**
 * @param {*} v
 * @returns {boolean}
 */
export function isInteger (v) {
  return (typeof v === 'number') && (Math.abs(v % 1) === 0);
}

/**
 * @param {*} v
 * @returns {boolean}
 */
export function isValid (v) {
  return v !== null && v !== undefined
}

/**
 * @param {*} v
 * @returns {boolean}
 */
export function isBoolean (v) {
  return typeof v === 'boolean'
}

/**
 * @param {*} v
 * @returns {boolean}
 */
export function isString (v) {
  return typeof v === 'string'
}

/**
 * @export
 * @param {*} v
 * @return {boolean}
 */
export function isMap(v) {
  return v instanceof Map
}

/**
 * @export
 * @param {*} v
 * @return {boolean}
 */
export function isPromise (v) {
  return !!v && (isObject(v) || isFunction(v)) && isFunction(v.then) && v[Symbol.toStringTag] === 'Promise';
}

/**
 * @export
 * @param {*} v
 * @return {boolean}
 */
export function isError (v) {
  return v instanceof Error ;
}

/**
 * @export
 * @param {*} v
 * @return {boolean}
 */
export function isClass(v){
  // Class constructor is also a function
  if (!(v && v.constructor === Function) || v.prototype === undefined)
    return false;

  // We have a function and not a class if arguments is a property name
  if (Object.getOwnPropertyNames(v).includes('arguments'))
    return false
  
  // This is a class that extends other class
  if (Object.getOwnPropertyNames(v).includes('arguments'))
    return false
  
  // This is a class that extends other class
  if (Object.getOwnPropertyNames(v).includes('arguments'))
    return false
  
  // This is a class that extends other class
  if(Function.prototype !== Object.getPrototypeOf(v))
    return true;
  
  // Usually a function will only have 'constructor' in the prototype
  return Object.getOwnPropertyNames(v.prototype).length > 1;
}

/**
 * @param {string} type
 * @param {*} value
 * @returns {boolean}
 */
export function checkType(type, value) {
  if (value === undefined ||
      value === null)
      return false
  switch(type) {
    case 'array': return isArray(value);
    case 'function': return isFunction(value);
    case 'object': return isObject(value);
    case 'integer': return isInteger(value);
    case 'number': return isNumber(value);
    case 'valid': return isValid(value);
    case 'boolean': return isBoolean(value);
    case 'string': return isString(value);
    case 'map': return isMap(value);
    case 'promise': return isPromise(value);
    case 'error': return isError(value);
    case 'class': return isClass(value);
    // case 'timestamp': return isValidTimestamp(value);
    default: throw new Error(`No known test for type: ${type}`)
  }
};

export function typeOf(value) {
  const types = ["array", "error", "class", "function", "map", "promise", 
                  "object", "integer", "number", "boolean", "string"] //, "timestamp"]
  for (let type of types) {
    try {
      if (checkType(type, value)) return type
    }
    catch (e) {
      return typeof value
    }
  }
}
