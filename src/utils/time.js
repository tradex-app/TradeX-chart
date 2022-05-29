import { isArray, isBoolean, isNumber, isObject, isString, checkType } from '../utils/typeChecks'

// BTC Genesis Block: 03/01/2009, 19:15:05
const BTCGENESIS = 1231006505000

export const dayCntInc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
export const dayCntLeapInc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
export const monthDayCnt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

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

// export function ms2DateTime( milliseconds, locale="en-GB" ) {
//   const date = new Date(milliseconds)
//   const year = date.getFullYear()
//   const month = date.getMonth()
//   const monthName = date.toLocaleDateString(locale, {month: 'short'})
//   const monthNameLong = date.toLocaleDateString(locale, {month: 'long'})
//   const day = date.getDate()
//   const dayName = date.toLocaleDateString(locale, {day: 'short'})
//   const dayNameLong = date.toLocaleDateString(locale, {month: 'long'})
//   const hours = date.getHours()
//   const minutes = date.getMinutes()
//   const timeStamp = milliseconds
//   return {
//     year, month, monthName, monthNameLong, day, dayName, dayNameLong, hours, minutes, timeStamp
//   }
// }


export function timestampDifference(date1,date2) {
  let difference = date1.getTime() - date2.getTime();

  let weeksDifference = Math.floor(difference/1000/60/60/24/7);
  difference -= weeksDifference*1000*60*60*24*7

  let daysDifference = Math.floor(difference/1000/60/60/24);
  difference -= daysDifference*1000*60*60*24

  let hoursDifference = Math.floor(difference/1000/60/60);
  difference -= hoursDifference*1000*60*60

  let minutesDifference = Math.floor(difference/1000/60);
  difference -= minutesDifference*1000*60

  let secondsDifference = Math.floor(difference/1000);

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

    return parseInt((t2-t1)/1000);
  },
  inMinutes: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/(60*1000));
  },

  inHours: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/(3600*1000));
  },

  inDays: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/(24*3600*1000));
  },

  inWeeks: function(d1, d2) {
        d1 = new Date(d1)
        d2 = new Date(d2)
    let t2 = d2.getTime();
    let t1 = d1.getTime();

    return parseInt((t2-t1)/(24*3600*1000*7));
  },

  inMonths: function(d1, d2) {
         d1 = new Date(d1)
         d2 = new Date(d2)
    let d1Y = d1.getFullYear();
    let d2Y = d2.getFullYear();
    let d1M = d1.getMonth();
    let d2M = d2.getMonth();

    return (d2M+12*d2Y)-(d1M+12*d1Y);
  },

  inYears: function(d1, d2) {
    let d1Y = new Date(d1)
    let d2Y = new Date(d2)
    return d2Y.getFullYear()-d1Y.getFullYear();
  }
  
}

export function get_minute(t) {
  return t ? new Date(t).getMinutes() : null
}

export function get_hour(t) {
  return t ? new Date(t).getHours() : null
}

export function hourStart(t) {
  let start = new Date(t)
  return start.setUTCMinutes(0,0,0)
}

/**
 * day number of the month
 *
 * @param {timestamp} t - timestamp ms
 * @return {number} - day number of the month
 * @memberof xAxis
 */
 export function get_day(t) {
  return t ? new Date(t).getDate() : null
}

export function get_dayName(t, locale="en-GB", len="short") {
  return new Date(t).toLocaleDateString(locale, {day: len})
}

/**
 * Start of the day (zero millisecond)
 *
 * @param {timestamp} t - timestamp ms
 * @return {timestamp} - timestamp ms
 * @memberof xAxis
 */
 export function day_start(t) {
  return new Date(t).setUTCHours(0,0,0,0)
}

/**
 * month number of the year
 *
 * @param {timestamp} t - timestamp ms
 * @return {number} - month number of the year
 * @memberof xAxis
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
 * @memberof xAxis
 */
 export function month_start(t) {
  let date = new Date(t)
  return Date.UTC(
      date.getFullYear(),
      date.getMonth(), 1
  )
}

/**
 * the year
 *
 * @param {timestamp} t - timestamp ms
 * @return {number} - the year
 * @memberof xAxis
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
 * @memberof xAxis
 */
 export function year_start(t) {
  return Date.UTC(new Date(t).getFullYear())
}

export function isLeapYear(t) {
  let date = new Date(t)
  let year = date.getFullYear();
  if((year & 3) != 0) return false;
  return ((year % 100) != 0 || (year % 400) == 0);
}

export function dayOfYear(t) {
  let date = new Date(t)
  let mn = date.getMonth();
  let dn = date.getDate();
  let dayOfYear = dayCount[mn] + dn;
  if(mn > 1 && isLeapYear()) dayOfYear++;
  return dayOfYear;
}
