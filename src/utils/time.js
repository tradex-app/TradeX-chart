import { isArray, isBoolean, isInteger, isNumber, isObject, isString, checkType } from '../utils/typeChecks'
import { Range } from '../model/range';

export const TIMEUNITS = ['y','M','d','h','m','s','ms']
export const TIMEUNITSLONG = ['years','months','days','hours','minutes','seconds','milliseconds']
export const dayCntInc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
export const dayCntLeapInc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
export const monthDayCnt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
export const MONTHMAP = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // Grid time steps

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
export const TIMESCALESVALUES = {
  YEARS10: [ YEAR_MS * 10, "years" ],
  YEARS5: [ YEAR_MS * 5, "years" ],
  YEARS3: [ YEAR_MS * 3, "years" ],
  YEARS2: [ YEAR_MS * 2, "years" ],
  YEARS: [ YEAR_MS, "years" ],
  MONTH6: [ MONTHR_MS * 6, "months" ],
  MONTH4: [ MONTHR_MS * 4, "months" ],
  MONTH3: [ MONTHR_MS * 3, "months" ],
  MONTH2: [ MONTHR_MS * 2, "months" ],
  MONTH: [ MONTHR_MS, "months" ],
  DAY15: [ DAY_MS * 15, "years" ],
  DAY10: [ DAY_MS * 10, "days" ],
  DAY7: [ DAY_MS * 7, "days" ],
  DAY5: [ DAY_MS * 5, "days" ],
  DAY3: [ DAY_MS * 3, "days" ],
  DAY2: [ DAY_MS * 2, "days" ],
  DAY: [ DAY_MS, "days" ],
  HOUR12: [ HOUR_MS * 12, "hours" ],
  HOUR6: [ HOUR_MS * 6, "hours" ],
  HOUR4: [ HOUR_MS * 4, "hours" ],
  HOUR2: [ HOUR_MS * 2, "hours" ],
  HOUR: [ HOUR_MS, "hours" ],
  MINUTE30: [ MINUTE_MS * 30, "minutes" ],
  MINUTE15: [ MINUTE_MS * 15, "minutes" ],
  MINUTE10: [ MINUTE_MS * 10, "minutes" ],
  MINUTE5: [ MINUTE_MS * 5, "minutes" ],
  MINUTE2: [ MINUTE_MS * 2, "minutes" ],
  MINUTE: [ MINUTE_MS, "minutes" ],
  SECOND30: [ SECOND_MS * 30, "seconds" ],
  SECOND15: [ SECOND_MS * 15, "seconds" ],
  SECOND10: [ SECOND_MS * 10, "seconds" ],
  SECOND5: [ SECOND_MS * 5, "seconds" ],
  SECOND2: [ SECOND_MS * 2, "seconds" ],
  SECOND: [ SECOND_MS, "seconds" ],
  MILLISECOND500: [ MILLISECOND * 500, "milliseconds" ],
  MILLISECOND250: [ MILLISECOND * 250, "milliseconds" ],
  MILLISECOND100: [ MILLISECOND * 100, "milliseconds" ],
  MILLISECOND50: [ MILLISECOND * 50, "milliseconds" ],
  MILLISECOND: [ MILLISECOND, "milliseconds" ],
}
const timeScales = () => {
  const values = Object.values(TIMESCALESVALUES)
  const vals = []
  for (let v = values.length; --v; v > 0) vals[v] = values[v][0]
  return vals
}
export const TIMESCALES = timeScales();
const timeRanks = () => {
  const values = Object.values(TIMESCALESVALUES)
  const vals = []
  for (let v = values.length; --v; v > 0) vals[v] = values[v][1]
  return vals
}
export const TIMESCALESRANK = timeRanks()
export const TIMESCALESKEYS = Object.keys(TIMESCALESVALUES);

const timeScalesValues = () => {
  const values = {}
  for (const [key, value] of Object.entries(TIMESCALESVALUES)) {
    values[key] = value[0]
  }
  return values
}

export const TIMESCALESVALUESKEYS = timeScalesValues()


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


/**
 * Test if valid timestamp or date/time string
 * @export
 * @param {Number|String} ts - unix timestamp or date/time string
 * @return {Boolean}
 */
export function isValidTimestamp( ts ) {
  const date = new Date(ts)
  return (date instanceof Date && !isNaN(date.valueOf()) && isFinite(date.valueOf()));
}

/**
 * Test if timestamp or date/time string is in the range of BTC genesis and not greater than end
 * @export
 * @param {Number|String} time - unix timestamp or date/time string
 * @param {Number|String} [start=BTCGENESIS] - unix timestamp or date/time string
 * @param {Number|String} [end=Date.now()] - unix timestamp or date/time string
 * @return {Boolean}
 */
export function isValidTimeInRange( time, start=BTCGENESIS,end=Date.now() ) {
  if (!isValidTimestamp(time)) return false
  return (time > start && time < end) ? true : false
}

function parseTSDiff(d1, d2, unit) {
  d1 = new Date(d1)
  d2 = new Date(d2)
  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2-t1)/unit);
}

export const timestampDiff = {

  inSeconds: function(d1, d2) {
    return parseTSDiff(d1, d2, SECOND_MS);
  },
  inMinutes: function(d1, d2) {
    return parseTSDiff(d1, d2, MINUTE_MS);
  },
  inHours: function(d1, d2) {
    return parseTSDiff(d1, d2, HOUR_MS);
  },
  inDays: function(d1, d2) {
    return parseTSDiff(d1, d2, DAY_MS);
  },
  inWeeks: function(d1, d2) {
    return parseTSDiff(d1, d2, WEEK_MS);
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
 * @returns {Object}  
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

  export function isTimeFrameMS(ms) {
    return (
        isInteger(ms) &&
        !(ms < SECOND_MS) &&
        !(ms === Infinity)
    )
  }


/**
 *
 * @export
 * @param {string} tf - eg '1h' = one hour
 * @return {object} - {tf, ms} timeframe, milliseconds
 */
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
 * @returns {number}
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
 * @returns {Object}  
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
 * @returns {number} - day number of the month
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
 * @returns {timestamp} - timestamp ms
 */
 export function day_start(t) {
  return new Date(t).setUTCHours(0,0,0,0)
}

/**
 * month number of the year
 *
 * @param {timestamp} t - timestamp ms
 * @returns {number} - month number of the year
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
 * @returns {timestamp} - timestamp ms
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
 * @returns {number} - the year
 */
 export function get_year(t) {
  if (!t) return undefined
  return new Date(t).getUTCFullYear()
}

/**
 * Start of the year (zero millisecond)
 *
 * @param {timestamp} t - timestamp ms
 * @returns {timestamp} - timestamp ms
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

/* Time String Formatting */

export function HM (t) {
  let {h, m} = DHMS(t)
  if (h == 0 && m == 0) return `${d}`
  else return `${h}:${m}`
}

export function HMS (t) {
  let {h, m, s} = DHMS(t)
  if (h == 0 && m == 0 && s == 0) return `${d}`
  return `${h}:${m}:${s}`
}

export function MS (t) {
  let {h, m, s} = DHMS(t);
  if (h == 0 && m == 0 && s == 0) return `${d}`
  return `${m}:${s}`
}

function DHMS (t) {
  let d, h, m, s;
  d = String(get_day(t))
  h = String(get_hour(t)).padStart(2, '0');
  m = String(get_minute(t)).padStart(2, '0');
  s = String(get_second(t)).padStart(2, '0');
  return {d,h,m,s}
}

/**
 * Nearest value by time (in timeseries)
 * @export
 * @param {number} t - timestamp
 * @param {Array} ts - [[ts,x,y,z...], ....]
 * @returns {Array} - [index, val]
 */
export function nearestTs(t, ts) {
    let dist = Infinity
    let val = null
    let index = -1
    for (let i = 0; i < ts.length; i++) {
        let ti = ts[i][0]
        if (Math.abs(ti - t) < dist) {
            dist = Math.abs(ti - t)
            val = ts[i]
            index = i
        }
    }
    return [index, val]
}

export class TimeData {

  #range = {}
  #timeZoneOffset = getTimezoneOffset()
  #timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  
  static timeUnits = TIMEUNITS
  static timeUnitsLong = TIMEUNITSLONG
  static timeUnitsValues = TIMESCALESVALUES
  static timeScaleValues = TIMESCALESVALUES
  static BTCGenesis = BTCGENESIS

  constructor(range) {
    if (range instanceof Range) this.#range = range
    this.setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }

  get range() { return this.#range }
  get timeFrameMS() { return this.#range.interval }
  get timeFrame() { return this.#range.intervalStr }
  set timeZone(z) { this.setTimeZone(z) }
  get timeZone() { return this.#timeZone }
  set timeZoneOffset(z) { this.#timeZoneOffset = (isNumber(z)) ? z : new Date().getTimezoneOffset() }
  get timeZoneOffset() { return this.#timeZoneOffset }
  get timeZoneLocal() { return getTimezone() }
  get indexed() { return this.#range.indexed }

  setTimeZone(z) {
    if (Intl.supportedValuesOf('timeZone').includes(z)) {
      this.#timeZone = z
      this.#timeZoneOffset = getTimezoneOffset(z)
    }
  }

  static timezoneLocal () {
    return getTimezone()
  }

  static timezoneOffset (timeZone, locale) {
    return getTimezoneOffset(timeZone, locale)
  }

  static IANATimeZone (locale) {
    return IANATimeZones(locale)
  }

  static isValidTimestamp (ts) {
    return isValidTimestamp(ts)
  }

  static isValidTimeInRange ( time, start=BTCGENESIS,end=Date.now() ) {
    return isValidTimeInRange(time, start, end)
  }

  static interval2MS (tf) {
    return interval2MS(tf)
  }

  static ms2Interval (ms) {
    return ms2Interval(ms)
  }
}

export function IANATimeZones(locale='en-US') {
  const tz = {}
  const date = new Date;
  Intl.supportedValuesOf('timeZone').forEach((timeZone) =>
  {
    let offset = getTimezoneOffset(timeZone, locale)
    tz[timeZone] = offset
  });
  return tz
}

export function getTimezoneOffset(timeZone=Intl.DateTimeFormat().resolvedOptions().timeZone, locale='en-US') {
  const now = new Date();
  const tzString = now.toLocaleString(locale, { timeZone });
  const localString = now.toLocaleString(locale);
  const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
  const offset = diff + now.getTimezoneOffset() / 60;
  
  // error if locale other than 'en-US', why?
  // if (-offset > 24) console.log(timeZone, tzString, localString, Date.parse(localString), Date.parse(tzString), diff, offset)
  
  return -offset;
}
