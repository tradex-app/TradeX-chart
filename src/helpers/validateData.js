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
export function validateShallow(data, isCrypto=false) {

  if (!isArray(data)) return false

  let rnd = getRandomIntBetween(0, data.length)
  if (!isValidCandle(data[0], isCrypto)) return false
  if (!isValidCandle(data[rnd], isCrypto)) return false
  if (!isValidCandle(data[data.length - 1], isCrypto)) return false

  // is ascending order?
  let t1 = data[0][0]
  let t2 = data[1][0]
  let t3 = data[2][0]
  if (t1 > t2 && t2 > t3) return false
  
  // is (likely) valid - use validateDeep() to validate entire dataset
  return true
}

export function validateDeep(data, isCrypto=false) {
  if (!isArray(data)) return false

  let i = 0
  let prev = 0
  while (i < data.length) {
    if (!isValidCandle(data[i], isCrypto)) return false
    // is ascending order?
    if (data[i][0] < prev) return false
    prev = data[i][0]
    i++
  }

  // is valid!
  return true
}

/**
 * Validate Candle
 *
 * @export
 * @param {Array} c - [ timestamp(ms), open, high, low, close, volume ]
 * @param {Boolean} isCrypto - are we working with crypto? Validate against BTC genesis
 * @return {Boolean}  
 */
export function isValidCandle(c, isCrypto=false) {
  if (!isArray(c)) return false
  if (c.length !== 6) return false
  // timestamp (ms)
  if (isCrypto)
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
