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
export function MONTH_MS(m) { 
  let ms = monthDayCnt[m % 12] * DAY_MS
  if (isLeapYear(m)) ms += DAY_MS
  return ms
}
export const YEAR_MS = DAY_MS*365

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

export function timestampDifference(date1,date2) {
  let difference = date1.getTime() - date2.getTime();

  let units = ms2TimeUnits(difference)

  units.years = timestampDiff.inYears(date1,date2)
  units.y = units.years

  units.months = timestampDiff.inMonths(date1,date2)
  units.m = units.months

  return units
}

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

let ms = 1000 * 60 * 60 * 24 * 365

console.log(ms2TimeUnits(ms))

console.log(ms2Interval(ms))
