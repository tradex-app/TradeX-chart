import { isArray, isBoolean, isNumber, isObject, isString, checkType } from '../utils/typeChecks'

export const dayCntInc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
export const dayCntLeapInc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
export const monthDayCnt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

// BTC Genesis Block: 03/01/2009, 19:15:05
export const BTCGENESIS = 1231006505000
export const SECOND_MS = 1000
export const MINUTE_MS = SECOND_MS*60
export const HOUR_MS = MINUTE_MS*60
export const DAY_MS = HOUR_MS*24
export const WEEK_MS = DAY_MS*7
export const MONTHR_MS = DAY_MS*30
export function MONTH_MS(m) { return monthDayCnt[m] * DAY_MS }
export const YEAR_MS = DAY_MS*365

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

export function timestampDifference(date1,date2) {
  let difference = date1.getTime() - date2.getTime();

  let weeksDifference = Math.floor(difference / WEEK_MS);
  difference -= weeksDifference * WEEK_MS

  let daysDifference = Math.floor(difference / HOUR_MS);
  difference -= daysDifference * DAY_MS

  let hoursDifference = Math.floor(difference / HOUR_MS);
  difference -= hoursDifference * HOUR_MS

  let minutesDifference = Math.floor(difference / MINUTE_MS);
  difference -= minutesDifference * MINUTE_MS

  let secondsDifference = Math.floor(difference / SECOND_MS);

  return {
    weeks: weeksDifference,
    days: daysDifference,
    hours: hoursDifference,
    minutes: minutesDifference,
    seconds: secondsDifference
  }
}

export const timestampDiff = {

  inSeconds: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2-t1)/SECOND_MS);
  },
  inMinutes: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/MINUTE_MS);
  },

  inHours: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/HOUR_MS);
  },

  inDays: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/DAY_MS);
  },

  inWeeks: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/WEEK_MS);
  },

  inMonths: function(d1, d2) {
         d1 = new Date(d1)
         d2 = new Date(d2)
    let d1Y = d1.getUTCFullYear();
    let d2Y = d2.getUTCFullYear();
    let d1M = d1.getUTCMonth();
    let d2M = d2.getUTCMonth();

    return (d2M+12*d2Y)-(d1M+12*d1Y);
  },

  inYears: function(d1, d2) {
    let d1Y = new Date(d1)
    let d2Y = new Date(d2)
    return d2Y.getUTCFullYear()-d1Y.getUTCFullYear();
  }
  
}

export function get_minute(t) {
  return t ? new Date(t).getUTCMinutes() : null
}

export function minute_start(t) {
  let start = new Date(t)
  return start.setUTCSeconds(0,0)
}

export function get_hour(t) {
  return t ? new Date(t).getUTCHours() : null
}

export function hour_start(t) {
  let start = new Date(t)
  return start.setUTCMinutes(0,0,0)
}

/**
 * day number of the month
 *
 * @param {timestamp} t - timestamp ms
 * @return {number} - day number of the month
 */
 export function get_day(t) {
  return t ? new Date(t).getUTCDate() : null
}

export function get_dayName(t, locale="en-GB", len="short") {
  return new Date(t).toLocaleDateString(locale, {day: len})
}

/**
 * Start of the day (zero millisecond)
 *
 * @param {timestamp} t - timestamp ms
 * @return {timestamp} - timestamp ms
 */
 export function day_start(t) {
  return new Date(t).setUTCHours(0,0,0,0)
}

/**
 * month number of the year
 *
 * @param {timestamp} t - timestamp ms
 * @return {number} - month number of the year
 */
 export function get_month(t) {
  if (!t) return undefined
  return new Date(t).getUTCMonth()
}

export function get_monthName(t, locale="en-GB", len="short") {
  return new Date(t).toLocaleDateString(locale, {month: len})
}

/**
 * Start of the month (zero millisecond)
 *
 * @param {timestamp} t - timestamp ms
 * @return {timestamp} - timestamp ms
 */
 export function month_start(t) {
  let date = new Date(t)
  return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(), 1
  )
}

/**
 * the year
 *
 * @param {timestamp} t - timestamp ms
 * @return {number} - the year
 */
 export function get_year(t) {
  if (!t) return undefined
  return new Date(t).getUTCFullYear()
}

/**
 * Start of the year (zero millisecond)
 *
 * @param {timestamp} t - timestamp ms
 * @return {timestamp} - timestamp ms
 */
 export function year_start(t) {
  return Date.UTC(new Date(t).getUTCFullYear())
}

export function isLeapYear(t) {
  let date = new Date(t)
  let year = date.getUTCFullYear();
  if((year & 3) != 0) return false;
  return ((year % 100) != 0 || (year % 400) == 0);
}

export function dayOfYear(t) {
  let date = new Date(t)
  let mn = date.getUTCMonth();
  let dn = date.getUTCDate();
  let dayOfYear = dayCount[mn] + dn;
  if(mn > 1 && isLeapYear()) dayOfYear++;
  return dayOfYear;
}
