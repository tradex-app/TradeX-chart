import { isArray, isBoolean, isNumber, isObject, isString, checkType } from '../utils/typeChecks'
import { getRandomIntBetween } from '../utils/number'
import { isValidTimeInRange } from '../utils/time'


/**
 * Validate price history data
 *
 * @export
 * @param {Array} data
 * @return {Boolean}  
 */
export function validateShallow(data) {

  if (!isArray(data)) return false

  let rnd = getRandomIntBetween(0, data.length)
  if (!isValidCandle(data[0])) return false
  if (!isValidCandle(data[rnd])) return false
  if (!isValidCandle(data[data.length - 1])) return false
  
  // is (likely) valid - use validateDeep() to validate entire dataset
  return true
}

export function validateDeep(data) {
  if (!isArray(data)) return false

  for (candle of data) {
    if (!isValidCandle(candle)) return false
  }

  // is valid!
  return true
}

/**
 * Validate Candle
 *
 * @export
 * @param {Array} c - [ timestamp(ms), open, high, low, close, volume ]
 * @return {Boolean}  
 */
export function isValidCandle(c) {
  if (!isArray(c)) return false
  if (c.length !== 6) return false
  // timestamp (ms)
  if (!isValidTimeInRange(c[0])) return false
  if (
    // open
    !isNumber(c[1]) ||
    // hight
    !isNumber(c[2]) ||
    // low
    !isNumber(c[3]) ||
    // close
    !isNumber(c[4]) ||
    // volume
    !isNumber(c[5])
  ) return false
  // is valid!
  return true
}