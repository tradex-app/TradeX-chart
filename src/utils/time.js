import { isArray, isBoolean, isNumber, isObject, isString, checkType } from '../utils/typeChecks'

// BTC Genesis Block: 03/01/2009, 19:15:05
const BTCGENESIS = 1231006505000

export function isValidTimestamp(_timestamp) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumber(newTimestamp);
}

export function isValidTimeInRange(time, start=BTCGENESIS,end=Date.now()) {
  if (!isValidTimestamp(time)) return false
  return (time > start && time < end) ? true : false
}