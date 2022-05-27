import { isArray, isBoolean, isNumber, isObject, isString, checkType } from '../utils/typeChecks'

// BTC Genesis Block: 03/01/2009, 19:15:05
const BTCGENESIS = 1231006505000

export function isValidTimestamp( _timestamp ) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumber(newTimestamp);
}

export function isValidTimeInRange( time, start=BTCGENESIS,end=Date.now() ) {
  if (!isValidTimestamp(time)) return false
  return (time > start && time < end) ? true : false
}

function ms2TimeUnits( milliseconds ) {
  let years, months, _weeks, weeks, days, hours, minutes, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  days = Math.floor(hours / 24);
  hours = hours % 24;
  _weeks = Math.floor(days / 7);
  days = days % 7
  months = Math.floor(_weeks / 4)
  years = Math.floor(_weeks / 52)
  weeks = _weeks % 4
  // accumulative extra days of months (28 days) 
  // in 1 year (365 days) = 29 days
  // thus...
  months = months % 13

  return {
    y: years,
    M: months,
    w: weeks,
    d: days,
    h: hours,
    m: minutes,
    s: seconds,
    
    years: years,
    months: months,
    weeks: weeks,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

export function ms2Interval( milliseconds ) {
  const intervals = ms2TimeUnits(milliseconds)
  for (const unit in intervals) {
    if (intervals[unit]) return `${intervals[unit]}${unit}`
  }
}

export function ms2DateTime( milliseconds, locale="en-GB" ) {
  const date = new Date(milliseconds)
  const year = date.getFullYear()
  const month = date.getMonth()
  const monthName = date.toLocaleDateString(locale, {month: 'short'})
  const monthNameLong = date.toLocaleDateString(locale, {month: 'long'})
  const day = date.getDate()
  const dayName = date.toLocaleDateString(locale, {day: 'short'})
  const dayNameLong = date.toLocaleDateString(locale, {month: 'long'})
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const timeStamp = milliseconds
  return {
    year, month, monthName, monthNameLong, day, dayName, dayNameLong, hours, minutes, timeStamp
  }
}