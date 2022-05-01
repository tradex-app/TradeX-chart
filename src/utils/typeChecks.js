/**
 * @param value
 * @return {boolean}
 */
 export function isArray (value) {
  return Array.isArray(value)
}

/**
 * @param {*} value
 * @return {boolean}
 */
export function isFunction (value) {
  return value && typeof value === 'function'
}

/**
 * @param {*} value
 * @return {boolean}
 */
export function isObject (value) {
  return (
  typeof yourVariable === 'object' &&
  !Array.isArray(yourVariable) &&
  yourVariable !== null)
}

/**
 * @param value
 * @returns {boolean}
 */
export function isNumber (value) {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * @param value
 * @returns {boolean}
 */
export function isValid (value) {
  return value !== null && value !== undefined
}

/**
 * @param value
 * @returns {boolean}
 */
export function isBoolean (value) {
  return typeof value === 'boolean'
}

/**
 * @param value
 * @return {boolean}
 */
export function isString (value) {
  return typeof value === 'string'
}

/**
 * @param {string} type
 * @param value
 * @param {string} name 
 * @return {boolean}
 */
export function checkType(type, value, name) {
  // if (typeof value !== type) {
  //   return "" + name + " has to be a " + type;
  // }
  switch(type) {
    case 'array': isArray(value); break;
    case 'function': isFunction(value); break;
    case 'object': isObject(value); break;
    case 'number': isNumber(value); break;
    case 'valid': isValid(value); break;
    case 'boolean': isBoolean(value); break;
    case 'string': isString(value); break;
    default: throw new Error(`No known test for type: ${type}`)
  }
};