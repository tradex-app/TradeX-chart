import { isArray, isBoolean, isNumber, isObject, isString, checkType } from '../utils/typeChecks'

export const TIMEUNITS = ['y','M','d','h','m','s','ms']
export const TIMEUNITSLONG = ['years','months','days','hours','minutes','seconds','milliseconds']
export const dayCntInc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
export const dayCntLeapInc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
export const monthDayCnt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

// BTC Genesis Block: 03/01/2009, 19:15:05
export const BTCGENESIS = 1231006505000
export const MILLISECOND = 1
export const SECOND_MS = 1000
export const MINUTE_MS = SECOND_MS*60
export const HOUR_MS = MINUTE_MS*60
export const DAY_MS = HOUR_MS*24
export const WEEK_MS = DAY_MS*7
export const MONTHR_MS = DAY_MS*30
export function MONTH_MS(m=3, l=false) { 
  let ms = monthDayCnt[m % 12] * DAY_MS
  if (l && m > 0) ms += DAY_MS
  return ms
}
export const YEAR_MS = DAY_MS*365
export const TIMEUNITSVALUESSHORT = {
  y: YEAR_MS, 
  M: MONTHR_MS,
  w: WEEK_MS,
  d: DAY_MS,
  h: HOUR_MS,
  m: MINUTE_MS,
  s: SECOND_MS,
  u: MILLISECOND
}
export const TIMEUNITSVALUESLONG = {
  years: YEAR_MS,
  months: MONTHR_MS,
  weeks: WEEK_MS,
  days: DAY_MS,
  hours: HOUR_MS,
  minutes: MINUTE_MS,
  seconds: SECOND_MS,
  milliseconds: MILLISECOND
}
export const TIMEUNITSVALUES = { ...TIMEUNITSVALUESSHORT, ...TIMEUNITSVALUESLONG }
export const TIMESCALES = [
  YEAR_MS * 10,
  YEAR_MS * 5,
  YEAR_MS * 3,
  YEAR_MS * 2,
  YEAR_MS,
  MONTHR_MS * 6,
  MONTHR_MS * 4,
  MONTHR_MS * 3,
  MONTHR_MS * 2,
  MONTHR_MS,
  DAY_MS * 15,
  DAY_MS * 10,
  DAY_MS * 7,
  DAY_MS * 5,
  DAY_MS * 3,
  DAY_MS * 2,
  DAY_MS,
  HOUR_MS * 12,
  HOUR_MS * 6,
  HOUR_MS * 4,
  HOUR_MS * 2,
  HOUR_MS,
  MINUTE_MS * 30,
  MINUTE_MS * 15,
  MINUTE_MS * 10,
  MINUTE_MS * 5,
  MINUTE_MS * 2,
  MINUTE_MS,
  SECOND_MS * 30,
  SECOND_MS * 15,
  SECOND_MS * 10,
  SECOND_MS * 5,
  SECOND_MS * 2,
  SECOND_MS,
  MILLISECOND * 500,
  MILLISECOND * 250,
  MILLISECOND * 100,
  MILLISECOND * 50,
  MILLISECOND,
];
export const TIMESCALESRANK = [
  "years",
  "years",
  "years",
  "years",
  "years",
  "months",
  "months",
  "months",
  "months",
  "months",
  "years",
  "days",
  "days",
  "days",
  "days",
  "days",
  "days",
  "hours",
  "hours",
  "hours",
  "hours",
  "hours",
  "minutes",
  "minutes",
  "minutes",
  "minutes",
  "minutes",
  "minutes",
  "seconds",
  "seconds",
  "seconds",
  "seconds",
  "seconds",
  "seconds",
  "milliseconds",
  "milliseconds",
  "milliseconds",
  "milliseconds",
  "milliseconds",
 ];
export const timezones = {
  0: 'Europe/London',
  '-120': 'Europe/Tallinn',
  '-60': 'Europe/Zurich',
  180: 'America/Santiago',
  300: 'America/Toronto',
  240: 'America/Caracas',
  360: 'America/Mexico_City',
  540: 'America/Juneau',
  480: 'America/Vancouver',
  420: 'US/Mountain',
  120: 'America/Sao_Paulo',
  '-360': 'Asia/Almaty',
  '-300': 'Asia/Ashkhabad',
  '-180': 'Europe/Moscow',
  '-420': 'Asia/Jakarta',
  '-480': 'Asia/Taipei',
  '-240': 'Asia/Muscat',
  '-345': 'Asia/Kathmandu',
  '-330': 'Asia/Kolkata',
  '-540': 'Asia/Tokyo',
  '-210': 'Asia/Tehran',
  '-660': 'Pacific/Norfolk',
  '-630': 'Australia/Adelaide',
  '-600': 'Australia/Brisbane',
  '-780': 'Pacific/Fakaofo',
  '-825': 'Pacific/Chatham',
  600: 'Pacific/Honolulu',
};

export function getTimezone() {
  const offset = new Date().getTimezoneOffset();

  if (Object.prototype.hasOwnProperty.call(timezones, offset)) {
    return timezones[offset.toString()];
  }
  return 'Etc/UTC';
}

export function buildSubGrads() {
  const grads = {}
  for (let unit in TIMEUNITSVALUESSHORT) {
    let i = 0
    grads[unit] = []
    do {
      grads[unit].push(Math.round(TIMEUNITSVALUESSHORT[unit] * i))
      i += 0.125
    }
    while(i < 1)
  }
  return grads
}


export function isValidTimestamp( _timestamp ) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumber(newTimestamp);
}

export function isValidTimeInRange( time, start=BTCGENESIS,end=Date.now() ) {
  if (!isValidTimestamp(time)) return false
  return (time > start && time < end) ? true : false
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

/**
 * Timestamp difference in multiple units
 *
 * @param {timestamp} date1 - milliseconds
 * @param {timestamp} date2 - milliseconds
 * @return {object}  
 */
export function timestampDifference(date1,date2) {
  let years = timestampDiff.inYears(date1,date2)
  let months = timestampDiff.inMonths(date1,date2)
  let weeks = timestampDiff.inWeeks(date1,date2)
  let days = timestampDiff.inDays(date1,date2)
  let hours = timestampDiff.inHours(date1,date2)
  let minutes = timestampDiff.inMinutes(date1,date2)
  let seconds = timestampDiff.inSeconds(date1,date2)
  let milliseconds = new Date(date2).getTime() - new Date(date1).getTime();

  return {
    y: years,
    M: months,
    w:weeks,
    d:days,
    h:hours,
    m:minutes,
    s:seconds,
    ms:milliseconds,
    
    years: years,
    months: months,
    weeks:weeks,
    days:days,
    hours:hours,
    minutes:minutes,
    seconds:seconds,
    milliseconds:milliseconds
  }
}

export function isTimeFrame(tf) {
  let ms = SECOND_MS
  if (isString(tf)) {
    ms = interval2MS(tf)
    if (ms) tf = tf
    else {
      ms = SECOND_MS
      tf = "1s"
    }
  }
  else tf = "1s"
  return {tf, ms}
}

/**
 * convert interval (timeframe) string to milliseconds
 * @export
 * @param {string} tf
 * @return {number}
 */
export function interval2MS(tf) {
  if (!isString(tf)) return false

  const regex = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let m
  if ((m = regex.exec(tf)) !== null) {
    return TIMEUNITSVALUESSHORT[m[2]] * m[1]
  }
  else return false
}

/**
 * Milliseconds broken down into major unit and remainders
 *
 * @export
 * @param {number} milliseconds
 * @return {object}  
 */
export function ms2TimeUnits( milliseconds ) {
  // let years, months, _weeks, weeks, days, hours, minutes, seconds;
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
  let days = Math.floor(hours / 24);
      hours = hours % 24;
  let _weeks = Math.floor(days / 7);
      days = days % 7
  let months = Math.floor(_weeks / 4)
  let years = Math.floor(_weeks / 52)
  let weeks = _weeks % 4
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

export function get_second(t) {
  return t ? new Date(t).getUTCSeconds() : null
}

export function second_start(t) {
  let start = new Date(t)
  return start.setUTCMilliseconds(0,0)
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
  return new Date(t).toLocaleDateString(locale, {weekday: len})
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

export function nextMonth(t) {
  let m = (get_month(t) + 1) % 12
  t += MONTH_MS(m, isLeapYear(t))
  return t
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

export function nextYear(t) {
  t = t + YEAR_MS + DAY_MS
  if (!isLeapYear(t)) t - DAY_MS
  return t
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

export function time_start (t, unit) {

  // if (!isValidTimestamp(t)) return false
  // if (Object.keys(TIMEUNITSVALUESLONG).indexOf(unit) == -1) return false

  const findStart = {
    years: (t) => year_start(t),
    months: (t) => month_start(t),
    weeks: (t) => day_start(t),
    days: (t) => day_start(t),
    hours: (t) => hour_start(t),
    minutes: (t) => minute_start(t),
    seconds: (t) => second_start(t),
  }
  return findStart[unit](t)
}

export function unitRange (ts, tf) {
  let start, end;
  switch(tf) {
    case "years" :
      start = year_start(ts)
      end = nextYear(ts)
      break;
    case "months" :
      start = month_start(ts)
      end = nextMonth(ts)
      break;
    case "weeks" :
      start = day_start(ts)
      end = start + DAY_MS
      break;
    case "days" :
      start = day_start(ts)
      end = start + DAY_MS
      break;
    case "hours" :
      start = hour_start(ts)
      end = start + HOUR_MS
      break;
    case "minutes" :
      start = minute_start(ts)
      end = start + MINUTE_MS
      break;
    case "seconds" :
      start = second_start(ts)
      end = start + SECOND_MS
  }
  return {start, end}
}
