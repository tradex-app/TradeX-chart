// messages.js

/**
 * Error message constructor
 * @export
 * @param {string} f - function or method where the error occurred
 * @param {string} e - error message
 * @param {object} [o] - optional original Error instance
 */
export function error(f, e, o) {
  throw new Error(`${f} ${e}`, o)
}

/**
 * TypeError message constructor
 * @export
 * @param {string} f - function or method where the error occurred
 * @param {string} t - received type
 * @param {string} e - expected type
 */
export function typeError(f, t, e) {
  throw new TypeError(`${f} received ${t}, expected type ${e}`)
}
