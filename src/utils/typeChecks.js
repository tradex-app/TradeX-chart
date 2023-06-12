/**
 * @param {*} v
 * @return {boolean}
 */
 export function isArray (v) {
  return Array.isArray(v)
}

/**
 * @param {*} v
 * @return {boolean}
 */
export function isFunction (v) {
  return v && typeof v === 'function'
}

/**
 * @param {*} v
 * @return {boolean}
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
 * @return {boolean}
 */
export function isString (v) {
  return typeof v === 'string'
}

export function isMap(v) {
  return v instanceof Map
}

/**
 * @export
 * @param {*} v
 */
export function isPromise (v) {
  return !!v && (isObject(v) || isFunction(v)) && isFunction(v.then);
}

/**
 * @export
 * @param {*} v
 */
export function isError (v) {
  return v instanceof Error ;
}

/**
 * @param {string} type
 * @param {*} value
 * @return {boolean}
 */
export function checkType(type, value) {
  switch(type) {
    case 'array': isArray(value); break;
    case 'function': isFunction(value); break;
    case 'object': isObject(value); break;
    case 'number': isNumber(value); break;
    case 'valid': isValid(value); break;
    case 'boolean': isBoolean(value); break;
    case 'string': isString(value); break;
    case 'promise': isPromise(value); break;
    case 'Error': isError(value); break;
    default: throw new Error(`No known test for type: ${type}`)
  }
};