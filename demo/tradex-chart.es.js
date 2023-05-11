function isArray (v) {
  return Array.isArray(v)
}
function isFunction (v) {
  return v && typeof v === 'function'
}
function isObject (v) {
  return (
  typeof v === 'object' &&
  !Array.isArray(v) &&
  v !== null)
}
function isNumber (v) {
  return typeof v === 'number' && !isNaN(v)
}
function isBoolean (v) {
  return typeof v === 'boolean'
}
function isString$1 (v) {
  return typeof v === 'string'
}
function isPromise (v) {
  return !!v && (isObject(v) || isFunction(v)) && isFunction(v.then);
}

const DOM = {
  findByID(id, base=document) {
    return base.getElementById(id)
  },
  findByClass(cl, base=document) {
    return base.getElementsByClassName(cl)
  },
  findByName(name, base=document) {
    return base.getElementsByName(name)
  },
  fndByTag(tag, base=document) {
    return base.getElementsByTagName(tag)
  },
  findBySelector(sel, base=document) {
    return base.querySelector(sel)
  },
  findBySelectorAll(sel, base=document) {
    return base.querySelectorAll(sel)
  },
  isNode(o){
    return (
      typeof Node === "object" ? o instanceof Node :
      o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
  },
  isElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement :
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
  },
  isVisible(o) {
    if (!this.isElement(o)) return false
    return !!o && !!( o.offsetWidth || o.offsetHeight || o.getClientRects().length )
  },
  isInViewport(el) {
    if (!this.isElement(el)) return false
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  isVisibleToUser(el) {
    if (!this.isElement(el)) return false
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (el.offsetWidth + el.offsetHeight + el.getBoundingClientRect().height +
        el.getBoundingClientRect().width === 0) {
        return false;
    }
    const elCenter   = {
        x: el.getBoundingClientRect().left + el.offsetWidth / 2,
        y: el.getBoundingClientRect().top + el.offsetHeight / 2
    };
    if (elCenter.x < 0) return false;
    if (elCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elCenter.y < 0) return false;
    if (elCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elCenter.x, elCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
  },
  elementDimPos(el) {
    if (!this.isElement(el)) return false
    let _x = 0;
    let _y = 0;
    let El = el;
    while( El && El.tagName.toLowerCase() != 'body' && !isNaN( El.offsetLeft ) && !isNaN(El.offsetTop ) ) {
        _x += El.offsetLeft - El.scrollLeft;
        _y += El.offsetTop - El.scrollTop;
        El = El.offsetParent;
    }
    const dim = el.getBoundingClientRect();
    let _w = dim.right - dim.left;
    let _h = dim.bottom - dim.top;
    let _v = this.isVisible(el);
    let _vp = this.isInViewport(el);
    return { top: _y, left: _x, width: _w, height: _h, visible: _v, viewport: _vp };
  },
  elementsDistance(el1, el2) {
    if (!this.isElement(el1) || !this.isElement(el1)) return false
    el1Location = this.elementDimPos(el1);
    el2Location = this.elementDimPos(el2);
    return {
      x: el1Location.top - el2Location.top,
      y: el1Location.left . el2Location.left,
      el1Location: el1Location,
      el2Location: el2Location,
    }
  },
  htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  },
  htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  },
  hideOnClickOutside(el) {
    if (!this.isElement(el)) return false
    const outsideClickListener = event => {
      if (!el.contains(event.target) && this.isVisible(el)) {
        el.style.display = 'none';
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  },
  onClickOutside(el, cb) {
    if (!this.isElement(el)) return false
    const outsideClickListener = event => {
      if (!el.contains(event.target) && DOM.isVisible(el)) {
        cb();
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  },
  addStyleRule(styleSheet, selector, property, value) {
    let r = this.findStyleRule(styleSheet, selector, property, value);
    if (!r) return
    else if (r.i >= 0) {
      r.rules[r.i].style[r.property] = r.value;
    }
    else {
      this.addCSSRule(r.styleSheet, r.selector, r.rules, r.index);
    }
  },
  deleteStyleRule(styleSheet, selector, property) {
    let r = this.findStyleRule(styleSheet, selector, property, '');
    let deleteRule = r.styleSheet.deleteRule || r.styleSheet.removeRule;
    deleteRule(r.i);
  },
  findStyleRule(styleSheet, selector, property, value) {
    if (!styleSheet || !isObject(styleSheet)) return null
    else if (styleSheet.constructor.name == "HTMLStyleElement") styleSheet = styleSheet.sheet;
    else if (styleSheet.constructor.name != "CSSStyleSheet") return null
    let r = this.styleRuleSanitize(selector, property, value);
    selector = r[0];
    property = r[1];
    value = r[2];
    const rules = styleSheet.cssRules || styleSheet.rules;
    for(var i = rules.length - 1; i > 0 ; --i) {
      let rule = rules[i];
      if(rule.selectorText === selector) {
        break;
      }
    }
    return {styleSheet, rules, selector, property, value, i};
  },
  styleRuleSanitize(selector, property, value) {
    return [
      selector = selector.toLowerCase().replace(/\s+/g, ' '),
      property = property.toLowerCase(),
      value = value.toLowerCase(),
    ]
  },
  addCSSRule(sheet, selector, rules, index) {
    if(sheet.insertRule) {
      sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else {
      sheet.addRule(selector, rules, index);
    }
  }
};

const TIMEUNITS = ['y','M','d','h','m','s','ms'];
const TIMEUNITSLONG = ['years','months','days','hours','minutes','seconds','milliseconds'];
const dayCntInc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const dayCntLeapInc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
const monthDayCnt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
const MONTHMAP = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const BTCGENESIS = 1231006505000;
const MILLISECOND = 1;
const SECOND_MS = 1000;
const MINUTE_MS = SECOND_MS*60;
const HOUR_MS = MINUTE_MS*60;
const DAY_MS = HOUR_MS*24;
const WEEK_MS = DAY_MS*7;
const MONTHR_MS = DAY_MS*30;
function MONTH_MS(m=3, l=false) {
  let ms = monthDayCnt[m % 12] * DAY_MS;
  if (l && m > 0) ms += DAY_MS;
  return ms
}
const YEAR_MS = DAY_MS*365;
const TIMEUNITSVALUESSHORT = {
  y: YEAR_MS,
  M: MONTHR_MS,
  w: WEEK_MS,
  d: DAY_MS,
  h: HOUR_MS,
  m: MINUTE_MS,
  s: SECOND_MS,
  u: MILLISECOND
};
const TIMEUNITSVALUESLONG = {
  years: YEAR_MS,
  months: MONTHR_MS,
  weeks: WEEK_MS,
  days: DAY_MS,
  hours: HOUR_MS,
  minutes: MINUTE_MS,
  seconds: SECOND_MS,
  milliseconds: MILLISECOND
};
const TIMEUNITSVALUES = { ...TIMEUNITSVALUESSHORT, ...TIMEUNITSVALUESLONG };
const TIMESCALESVALUES = {
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
};
const timeScales = () => {
  const values = Object.values(TIMESCALESVALUES);
  const vals = [];
  for (let v = values.length; --v; v > 0) vals[v] = values[v][0];
  return vals
};
const TIMESCALES = timeScales();
const timeRanks = () => {
  const values = Object.values(TIMESCALESVALUES);
  const vals = [];
  for (let v = values.length; --v; v > 0) vals[v] = values[v][1];
  return vals
};
const TIMESCALESRANK = timeRanks();
const TIMESCALESKEYS = Object.keys(TIMESCALESVALUES);
const timeScalesValues = () => {
  const values = {};
  for (const [key, value] of Object.entries(TIMESCALESVALUES)) {
    values[key] = value[0];
  }
  return values
};
const TIMESCALESVALUESKEYS = timeScalesValues();
const timezones = {
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
function getTimezone() {
  const offset = new Date().getTimezoneOffset();
  if (Object.prototype.hasOwnProperty.call(timezones, offset)) {
    return timezones[offset.toString()];
  }
  return 'Etc/UTC';
}
function buildSubGrads() {
  const grads = {};
  for (let unit in TIMEUNITSVALUESSHORT) {
    let i = 0;
    grads[unit] = [];
    do {
      grads[unit].push(Math.round(TIMEUNITSVALUESSHORT[unit] * i));
      i += 0.125;
    }
    while(i < 1)
  }
  return grads
}
function isValidTimestamp( _timestamp ) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumber(newTimestamp);
}
function isValidTimeInRange( time, start=BTCGENESIS,end=Date.now() ) {
  if (!isValidTimestamp(time)) return false
  return (time > start && time < end) ? true : false
}
const timestampDiff = {
  inSeconds: function(d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return parseInt((t2-t1)/SECOND_MS);
  },
  inMinutes: function(d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
    let t2 = d2.getTime();
    let t1 = d1.getTime();
    return parseInt((t2-t1)/MINUTE_MS);
  },
  inHours: function(d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
    let t2 = d2.getTime();
    let t1 = d1.getTime();
    return parseInt((t2-t1)/HOUR_MS);
  },
  inDays: function(d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
    let t2 = d2.getTime();
    let t1 = d1.getTime();
    return parseInt((t2-t1)/DAY_MS);
  },
  inWeeks: function(d1, d2) {
        d1 = new Date(d1);
        d2 = new Date(d2);
    let t2 = d2.getTime();
    let t1 = d1.getTime();
    return parseInt((t2-t1)/WEEK_MS);
  },
  inMonths: function(d1, d2) {
         d1 = new Date(d1);
         d2 = new Date(d2);
    let d1Y = d1.getUTCFullYear();
    let d2Y = d2.getUTCFullYear();
    let d1M = d1.getUTCMonth();
    let d2M = d2.getUTCMonth();
    return (d2M+12*d2Y)-(d1M+12*d1Y);
  },
  inYears: function(d1, d2) {
    let d1Y = new Date(d1);
    let d2Y = new Date(d2);
    return d2Y.getUTCFullYear()-d1Y.getUTCFullYear();
  }
};
function timestampDifference(date1,date2) {
  let years = timestampDiff.inYears(date1,date2);
  let months = timestampDiff.inMonths(date1,date2);
  let weeks = timestampDiff.inWeeks(date1,date2);
  let days = timestampDiff.inDays(date1,date2);
  let hours = timestampDiff.inHours(date1,date2);
  let minutes = timestampDiff.inMinutes(date1,date2);
  let seconds = timestampDiff.inSeconds(date1,date2);
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
function isTimeFrame(tf) {
  let ms = SECOND_MS;
  if (isString$1(tf)) {
    ms = interval2MS(tf);
    if (ms) tf = tf;
    else {
      ms = SECOND_MS;
      tf = "1s";
    }
  }
  else tf = "1s";
  return {tf, ms}
}
function interval2MS(tf) {
  if (!isString$1(tf)) return false
  const regex = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let m;
  if ((m = regex.exec(tf)) !== null) {
    return TIMEUNITSVALUESSHORT[m[2]] * m[1]
  }
  else return false
}
function ms2TimeUnits( milliseconds ) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
  let days = Math.floor(hours / 24);
      hours = hours % 24;
  let _weeks = Math.floor(days / 7);
      days = days % 7;
  let months = Math.floor(_weeks / 4);
  let years = Math.floor(_weeks / 52);
  let weeks = _weeks % 4;
  months = months % 13;
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
function ms2Interval( milliseconds ) {
  const intervals = ms2TimeUnits(milliseconds);
  for (const unit in intervals) {
    if (intervals[unit]) return `${intervals[unit]}${unit}`
  }
}
function get_second(t) {
  return t ? new Date(t).getUTCSeconds() : null
}
function second_start(t) {
  let start = new Date(t);
  return start.setUTCMilliseconds(0,0)
}
function get_minute(t) {
  return t ? new Date(t).getUTCMinutes() : null
}
function minute_start(t) {
  let start = new Date(t);
  return start.setUTCSeconds(0,0)
}
function get_hour(t) {
  return t ? new Date(t).getUTCHours() : null
}
function hour_start(t) {
  let start = new Date(t);
  return start.setUTCMinutes(0,0,0)
}
 function get_day(t) {
  return t ? new Date(t).getUTCDate() : null
}
function get_dayName(t, locale="en-GB", len="short") {
  return new Date(t).toLocaleDateString(locale, {weekday: len})
}
 function day_start(t) {
  return new Date(t).setUTCHours(0,0,0,0)
}
 function get_month(t) {
  if (!t) return undefined
  return new Date(t).getUTCMonth()
}
function get_monthName(t, locale="en-GB", len="short") {
  return new Date(t).toLocaleDateString(locale, {month: len})
}
 function month_start(t) {
  let date = new Date(t);
  return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(), 1
  )
}
function nextMonth(t) {
  let m = (get_month(t) + 1) % 12;
  t += MONTH_MS(m, isLeapYear(t));
  return t
}
 function get_year(t) {
  if (!t) return undefined
  return new Date(t).getUTCFullYear()
}
 function year_start(t) {
  return Date.UTC(new Date(t).getUTCFullYear())
}
function nextYear(t) {
  t = t + YEAR_MS + DAY_MS;
  if (!isLeapYear(t)) ;
  return t
}
function isLeapYear(t) {
  let date = new Date(t);
  let year = date.getUTCFullYear();
  if((year & 3) != 0) return false;
  return ((year % 100) != 0 || (year % 400) == 0);
}
function dayOfYear(t) {
  let date = new Date(t);
  let mn = date.getUTCMonth();
  let dn = date.getUTCDate();
  let dayOfYear = dayCount[mn] + dn;
  if(mn > 1 && isLeapYear()) dayOfYear++;
  return dayOfYear;
}
function time_start (t, unit) {
  const findStart = {
    years: (t) => year_start(t),
    months: (t) => month_start(t),
    weeks: (t) => day_start(t),
    days: (t) => day_start(t),
    hours: (t) => hour_start(t),
    minutes: (t) => minute_start(t),
    seconds: (t) => second_start(t),
  };
  return findStart[unit](t)
}
function unitRange (ts, tf) {
  let start, end;
  switch(tf) {
    case "years" :
      start = year_start(ts);
      end = nextYear(ts);
      break;
    case "months" :
      start = month_start(ts);
      end = nextMonth(ts);
      break;
    case "weeks" :
      start = day_start(ts);
      end = start + DAY_MS;
      break;
    case "days" :
      start = day_start(ts);
      end = start + DAY_MS;
      break;
    case "hours" :
      start = hour_start(ts);
      end = start + HOUR_MS;
      break;
    case "minutes" :
      start = minute_start(ts);
      end = start + MINUTE_MS;
      break;
    case "seconds" :
      start = second_start(ts);
      end = start + SECOND_MS;
  }
  return {start, end}
}
function DM (t) {
  String(get_day(t)).padStart(2, '0');
}
function HM (t) {
  let h = String(get_hour(t)).padStart(2, '0');
  let m = String(get_minute(t)).padStart(2, '0');
  return `${h}:${m}`
}
function HMS (t) {
  let h = String(get_hour(t)).padStart(2, '0');
  let m = String(get_minute(t)).padStart(2, '0');
  let s = String(get_second(t)).padStart(2, '0');
  return `${h}:${m}:${s}`
}
function MS (t) {
  let m = String(get_minute(t)).padStart(2, '0');
  let s = String(get_second(t)).padStart(2, '0');
  return `${m}:${s}`
}

var Time = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  TIMEUNITS: TIMEUNITS,
  TIMEUNITSLONG: TIMEUNITSLONG,
  dayCntInc: dayCntInc,
  dayCntLeapInc: dayCntLeapInc,
  monthDayCnt: monthDayCnt,
  MONTHMAP: MONTHMAP,
  BTCGENESIS: BTCGENESIS,
  MILLISECOND: MILLISECOND,
  SECOND_MS: SECOND_MS,
  MINUTE_MS: MINUTE_MS,
  HOUR_MS: HOUR_MS,
  DAY_MS: DAY_MS,
  WEEK_MS: WEEK_MS,
  MONTHR_MS: MONTHR_MS,
  MONTH_MS: MONTH_MS,
  YEAR_MS: YEAR_MS,
  TIMEUNITSVALUESSHORT: TIMEUNITSVALUESSHORT,
  TIMEUNITSVALUESLONG: TIMEUNITSVALUESLONG,
  TIMEUNITSVALUES: TIMEUNITSVALUES,
  TIMESCALESVALUES: TIMESCALESVALUES,
  TIMESCALES: TIMESCALES,
  TIMESCALESRANK: TIMESCALESRANK,
  TIMESCALESKEYS: TIMESCALESKEYS,
  TIMESCALESVALUESKEYS: TIMESCALESVALUESKEYS,
  timezones: timezones,
  getTimezone: getTimezone,
  buildSubGrads: buildSubGrads,
  isValidTimestamp: isValidTimestamp,
  isValidTimeInRange: isValidTimeInRange,
  timestampDiff: timestampDiff,
  timestampDifference: timestampDifference,
  isTimeFrame: isTimeFrame,
  interval2MS: interval2MS,
  ms2TimeUnits: ms2TimeUnits,
  ms2Interval: ms2Interval,
  get_second: get_second,
  second_start: second_start,
  get_minute: get_minute,
  minute_start: minute_start,
  get_hour: get_hour,
  hour_start: hour_start,
  get_day: get_day,
  get_dayName: get_dayName,
  day_start: day_start,
  get_month: get_month,
  get_monthName: get_monthName,
  month_start: month_start,
  nextMonth: nextMonth,
  get_year: get_year,
  year_start: year_start,
  nextYear: nextYear,
  isLeapYear: isLeapYear,
  dayOfYear: dayOfYear,
  time_start: time_start,
  unitRange: unitRange,
  DM: DM,
  HM: HM,
  HMS: HMS,
  MS: MS
}, Symbol.toStringTag, { value: 'Module' }));

function getRandomIntBetween(min, max) {
  min = Math.ceil(min) + 1;
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function countDigits(value) {
  const digits = {};
  digits.value = value;
  digits.sign = (!value) ? false : true;
  digits.integers = numDigits(value);
  digits.decimals = precision(value);
  digits.total = digits.integers + digits.decimals;
  return digits
}
function numDigits(value) {
  return (Math.log10((value ^ (value >> 31)) - (value >> 31)) | 0) + 1;
}
function float2Int(value) {
  return value | 0
}
 function round (n, p) {
	p = p || 100;
  const d = Math.pow(10, p);
  return Math.round((n + Number.EPSILON) * d) / d;
}
function bRound(n, d=0) {
  var x = n * Math.pow(10, d);
  var r = Math.round(x);
  var br = (((((x>0)?x:(-x))%1)===0.5)?(((0===(r%2)))?r:(r-1)):r);
  return br / Math.pow(10, d);
}
function precision(value) {
  if (typeof value !== "number") value = parseFloat(value);
  if (isNaN(value)) return 0;
  if (!isFinite(value)) return 0;
  var e = 1, p = 0;
  while (Math.round(value * e) / e !== value) {
    e *= 10;
    if (e === Infinity) break;
    p++; }
  return p;
}
function log10 (value) {
  return Math.log(value) / Math.log(10)
}
function power (base, exponent) {
  return Math.pow(base, exponent)
}
function limit(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function mergeDeep(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return source;
  }
  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = mergeDeep(targetValue.concat([]), (sourceValue));
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
}
function copyDeep(obj) {
  if (obj === null || typeof obj !== 'object' || 'isActiveClone' in obj)
      return obj;
  if (obj instanceof Date)
      var temp = new obj.constructor();
  else
      var temp = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj['isActiveClone'] = null;
          temp[key] = copyDeep(obj[key]);
          delete obj['isActiveClone'];
      }
  }
  return temp;
}
function uid(tag="ID") {
  if (isNumber(tag)) tag = tag.toString();
  else if (!isString$1(tag)) tag = "ID";
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2,5);
  return `${tag}_${dateString}_${randomness}`
}
function isArrayEqual(a1, a2) {
  let i = a1.length;
  while (i--) {
      if (a1[i] !== a2[i]) return false;
  }
  return true
}
const firstItemInMap = map => map.entries().next().value;
const firstKeyInMap = map => map.entries().next().value[0];
const firstValueInMap = map => map.entries().next().value[1];
const lastKeyInMap = map => Array.from(map.keys()).pop();
 function debounce(fn, wait=100, scope, immediate=false) {
  var timeout;
  var core = function() {
    var context = scope || this;
    var args = arguments;
    var later = function() {
        timeout = null;
        if (!immediate) fn.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  };
  return core
}function throttle(fn, threshhold=250, scope) {
  var last, deferTimer;
  var core = function () {
    var context = scope || this;
    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
  function cancelTimer() {
    if (timeout) {
       clearTimeout(deferTimer);
       timeout = undefined;
    }
  }
  core.reset = function() {
    cancelTimer();
    last = 0;
  };
  return core
}

class Dataset {
  #state
  #id
  #type
  #data = []
  constructor(state, ds) {
    this.#state = state;
    this.#id = (isString$1(ds.id)) ? ds.id : uid;
    this.#type = (isString$1(ds.type)) ? ds.type : "default";
    this.#data = (isArray(ds.data)) ? ds.data : [];
  }
}

function validateShallow(data, isCrypto=false) {
  if (!isArray(data)) return false
  let rnd = getRandomIntBetween(0, data.length);
  if (!isValidCandle(data[0], isCrypto)) return false
  if (!isValidCandle(data[rnd], isCrypto)) return false
  if (!isValidCandle(data[data.length - 1], isCrypto)) return false
  let t1 = data[0][0];
  let t2 = data[1][0];
  let t3 = data[2][0];
  if (t1 > t2 && t2 > t3) return false
  return true
}
function validateDeep(data, isCrypto=false) {
  if (!isArray(data)) return false
  let i = 0;
  let prev = 0;
  while (i < data.length) {
    if (!isValidCandle(data[i], isCrypto)) return false
    if (data[i][0] < prev) return false
    prev = data[i][0];
    i++;
  }
  return true
}
function isValidCandle(c, isCrypto=false) {
  if (!isArray(c)) return false
  if (c.length !== 6) return false
  if (isCrypto)
    if (!isValidTimeInRange(c[0])) return false
  if (
    !isNumber(c[1]) ||
    !isNumber(c[2]) ||
    !isNumber(c[3]) ||
    !isNumber(c[4]) ||
    !isNumber(c[5])
  ) return false
  return true
}

const DEFAULT_TIMEINTERVAL = MINUTE_MS;
const DEFAULT_TIMEFRAME = "1m";
const DEFAULT_TIMEFRAMEMS = DEFAULT_TIMEINTERVAL;
const PRICEDIGITS$1 = 6;
const XAXIS_ZOOM = 0.05;
const XAXIS_STEP = 100;
const YAXIS_STEP = 100;
const YAXIS_TYPES$1 = ["default", "percent", "log"];
const YAXIS_BOUNDS = 0.01;
const LIMITFUTURE = 200;
const LIMITPAST = 200;
const MINCANDLES = 20;
const MAXCANDLES = 4096;
const BUFFERSIZE$1 = 5;
const ROWMINHEIGHT = 50;
const OFFCHARTDEFAULTHEIGHT = 30;
const DIVIDERHEIGHT = 8;

class Range {
  data = []
  #interval = DEFAULT_TIMEFRAMEMS
  #intervalStr = "1s"
  indexStart = 0
  indexEnd = LIMITFUTURE
  valueMin = 0
  valueMax = 0
  valueDiff = 0
  volumeMin = 0
  volumeMax = 0
  volumeDiff = 0
  valueMinIdx = 0
  valueMaxIdx = 0
  volumeMinIdx = 0
  volumeMaxIdx = 0
  old = {}
  limitFuture = LIMITFUTURE
  limitPast = LIMITPAST
  minCandles = MINCANDLES
  maxCandles = MAXCANDLES
  yAxisBounds = YAXIS_BOUNDS
  rangeLimit = LIMITFUTURE
  anchor
  #core
  #worker
  #init = true
  constructor( allData, start=0, end=allData.data.length-1, config={}) {
    if (!isObject(allData)) return false
    if (!isObject(config)) return false
    if (!(config?.core instanceof TradeXchart)) return false
    this.#init = true;
    this.limitFuture = (isNumber(this.config?.limitFuture)) ? this.config.limitFuture : LIMITFUTURE;
    this.limitPast = (isNumber(this.config?.limitPast)) ? this.config.limitPast : LIMITPAST;
    this.minCandles = (isNumber(this.config?.minCandles)) ? this.config.minCandles : MINCANDLES;
    this.maxCandles = (isNumber(this.config?.maxCandles)) ? this.config.maxCandles : MAXCANDLES;
    this.yAxisBounds = (isNumber(this.config?.limitBounds)) ? this.config.limitBounds : YAXIS_BOUNDS;
    this.#core = config.core;
    `
    (input) => {
      return maxMinPriceVol(input)
    }
    function ${this.maxMinPriceVol.toString()}
  `;
    const tf = config?.interval || DEFAULT_TIMEFRAMEMS;
    if (allData.data.length == 0) {
      let ts = Date.now();
      start = 0;
      end = this.rangeLimit;
      this.#interval = tf;
      this.#intervalStr = ms2Interval(this.interval);
      this.anchor = ts - (ts % tf);
    }
    else if (allData.data.length < 2) {
      this.#interval = tf;
      this.#intervalStr = ms2Interval(this.interval);
    }
    else if (end == 0 && allData.data.length >= this.rangeLimit)
      end = this.rangeLimit;
    else if (end == 0)
      end = allData.data.length;
    for (let data in allData) {
      this[data] = allData[data];
    }
    if (!this.set(start, end)) return false
    if (allData.data.length > 2) {
      this.#interval = detectInterval(this.data);
      this.#intervalStr = ms2Interval(this.interval);
    }
  }
  get dataLength () { return (this?.data.length == 0) ? 0 : this.data.length - 1 }
  get Length () { return this.indexEnd - this.indexStart }
  get timeDuration () { return this.timeFinish - this.timeStart }
  get timeMin () { return this.value(this.indexStart)[0] }
  get timeMax () { return this.value(this.indexEnd)[0] }
  get rangeDuration () { return this.timeMax - this.timeMin }
  get timeStart () { return this.value(0)[0] }
  get timeFinish () { return this.value(this.dataLength)[0] }
  set interval (i) { this.#interval = i; }
  get interval () { return this.#interval }
  set intervalStr (i) { this.#intervalStr = i; }
  get intervalStr () { return this.#intervalStr }
  end() {
    WebWorker.destroy(this.#worker.ID);
  }
  set (start=0, end=this.dataLength, max=this.maxCandles) {
    if (!isNumber(start) ||
        !isNumber(end) ||
        !isNumber(max)) return false
    start = start | 0;
    end = end | 0;
    max = max | 0;
    max = limit(max, this.minCandles, this.maxCandles);
    if (start > end) [start, end] = [end, start];
    end = limit(end, start + this.minCandles, start + max);
    let len = end - start;
    start = limit(start, this.limitPast * -1,  this.dataLength + this.limitFuture - this.minCandles - 1);
    end = limit(end, start + this.minCandles, this.dataLength + this.limitFuture - 1);
    start = (end - start < len) ? start - (len - (end - start)) : start;
    const newStart = start;
    const newEnd = end;
    const oldStart = this.indexStart;
    const oldEnd = this.indexEnd;
      let inOut = this.Length;
    this.indexStart = start;
    this.indexEnd = end;
    inOut -= this.Length;
    let maxMin = this.maxMinPriceVol({data: this.data, start: this.indexStart, end: this.indexEnd, that: this});
    this.setMaxMin(maxMin);
    this.#core.emit("setRange", [newStart, newEnd, oldStart, oldEnd]);
    return true
  }
  setMaxMin ( maxMin ) {
    for (let m in maxMin) {
      this.old[m] = this[m];
      this[m] = maxMin[m];
    }
    this.scale = (this.dataLength != 0) ? this.Length / this.dataLength : 1;
  }
  value ( index, id="chart" ) {
    let data;
    if (id == "chart") data = this.data;
    else {
      data = this.getDataById(id);
      if (!data) return null
    }
    if (!isNumber(index)) index = data.length - 1;
    let v = data[index];
    if (v !== undefined) return v
    else {
      const len = data.length - 1;
      v = [null, null, null, null, null, null];
      if (data.length < 1) {
        v[0] = Date.now() + (this.interval * index);
        return v
      }
      else if (index < 0) {
        v[0] = data[0][0] + (this.interval * index);
        return v
      }
      else if (index > len) {
        v[0] = data[len][0] + (this.interval * (index - len));
        return v
      }
      else return null
    }
  }
  valueByTS ( ts, id ) {
    if (!isNumber(ts) || !isString$1(id)) return false
    const idx = this.getTimeIndex(ts);
    switch (id) {
      case "chart":
        break;
      case "onchart": break;
      case "offchart": break;
      case "dataset": break;
      case "all": break;
      default:
        if (id.length = 0) return this.value(idx)
        else {
          id.split('_');
        }
        break;
    }
  }
  getDataById(id) {
    if (!isString$1(id)) return false
    const idParts = id.split('_');
    switch (idParts[1]) {
      case "chart":
        return this.data;
      case "onchart":
        for (let o of this.onChart) {
          if (idParts[2] in o) return o[idParts[2]]
        }
        return false;
      case "offchart":
        for (let o of this.offChart) {
          if (idParts[2] in o) return o[idParts[2]]
        }
        return false;
      case "datasets":
        for (let o of this.datasets) {
          if (idParts[2] in o) return o[idParts[2]]
        }
      return false;
      default: return false
    }
  }
   getTimeIndex (ts) {
    if (!isNumber(ts)) return false
    ts = ts - (ts % this.interval);
    let x = (this.data.length > 0) ? this.data[0][0] : this.anchor;
    if (ts === x)
      return 0
    else if (ts < x)
      return ((x - ts) / this.interval) * -1
    else
      return (ts - x) / this.interval
  }
  inRange(t) {
    return (t >= this.timeMin && t <= this.timeMax) ? true : false
  }
  inPriceHistory (t) {
    return (t >= this.timeStart && t <= this.timeFinish) ? true : false
  }
  inRenderRange (t) {
    let i = this.getTimeIndex(t);
    let o = this.#core.rangeScrollOffset;
    return (i >= this.indexStart - o && i <= this.indexEnd + o) ? true : false
  }
  rangeIndex (ts) { return this.getTimeIndex(ts) - this.indexStart }
   maxMinPriceVol ( input ) {
    let {data, start, end, that} = {...input};
    let buffer = bRound(this.#core.bufferPx / this.#core.candleW);
    buffer = (isNumber(buffer)) ? buffer : 0;
    start = (isNumber(start)) ? start - buffer : 0;
    start = (start > 0) ? start : 0;
    end = (typeof end === "number") ? end : data?.length-1;
    if (data.length == 0) {
      return {
        valueMin: 0,
        valueMax: 1,
        volumeMin: 0,
        volumeMax: 0,
        valueMinIdx: 0,
        valueMaxIdx: 0,
        volumeMinIdx: 0,
        volumeMaxIdx: 0,
      }
    }
    let l = data.length - 1;
    let i = limit(start, 0, l);
    let c = limit(end, 0, l);
    let valueMin  = data[i][3];
    let valueMax  = data[i][2];
    let volumeMin = data[i][5];
    let volumeMax = data[i][5];
    let valueMinIdx  = i;
    let valueMaxIdx  = i;
    let volumeMinIdx = i;
    let volumeMaxIdx = i;
    while(i++ < c) {
      if (data[i][3] < valueMin) {
        valueMin = data[i][3];
        valueMinIdx = i;
      }
      if (data[i][2] > valueMax) {
        valueMax = data[i][2];
        valueMaxIdx = i;
      }
      if (data[i][5] < volumeMin) {
        volumeMin = data[i][5];
        volumeMinIdx = i;
      }
      if (data[i][5] > volumeMax) {
        volumeMax = data[i][5];
        volumeMaxIdx = i;
      }
    }
    let diff = valueMax - valueMin;
    valueMin -= diff * 0.1;
    valueMin = (valueMin > 0) ? valueMin : 0;
    valueMax += diff * 0.1;
    diff = valueMax - valueMin;
    return {
      valueMin: valueMin,
      valueMax: valueMax,
      valueDiff: valueMax - valueMin,
      volumeMin: volumeMin,
      volumeMax: volumeMax,
      volumeDiff: volumeMax - volumeMin,
      valueMinIdx: valueMinIdx,
      valueMaxIdx: valueMaxIdx,
      volumeMinIdx: volumeMinIdx,
      volumeMaxIdx: volumeMaxIdx,
    }
    function limit(val, min, max) {
      return Math.min(max, Math.max(min, val));
    }
  }
  snapshot(start, end) {
    return {
      snapshot: true,
      ts: Date.now(),
      data: this.data,
      dataLength: this.dataLength,
      Length: this.Length,
      timeDuration: this.timeDuration,
      timeMin: this.timeMin,
      timeMax: this.timeMax,
      rangeDuration: this.rangeDuration,
      timeStart: this.timeStart,
      timeFinish: this.timeFinish,
      interval: this.interval,
      intervalStr: this.intervalStr
    }
  }
}
function detectInterval(ohlcv) {
  let len = Math.min(ohlcv.length - 1, 99);
  let min = Infinity;
  ohlcv.slice(0, len).forEach((x, i) => {
      let d = ohlcv[i+1][0] - x[0];
      if (d === d && d < min) min = d;
  });
  return min
}
function calcTimeIndex(time, timeStamp) {
  if (!isNumber(timeStamp)) return false
  let index;
  let timeFrameMS = time.timeFrameMS;
  timeStamp = timeStamp - (timeStamp % timeFrameMS);
  if (timeStamp === time.range.data[0][0])
    index = 0;
  else if (timeStamp < time.range.data[0][0])
    index = ((time.range.data[0][0] - timeStamp) / timeFrameMS) * -1;
  else
    index = (timeStamp - time.range.data[0][0]) / timeFrameMS;
  return index
}

const DEFAULT_STATE = {
  chart: {
    type: "candles",
    candleType: "CANDLE_SOLID",
    indexed: false,
    data: [],
    settings: {},
    row: {},
    tf: DEFAULT_TIMEFRAME,
    tfms: DEFAULT_TIMEFRAMEMS
  },
  onchart: [],
  offchart: [],
  datasets: [],
  tools: [],
  ohlcv: []
};
class State {
  static #stateList = []
  #id = ""
  #data = {}
  #initialState = ""
  #currentState = ""
  #nextState
  #states = {}
  #store
  #dss = {}
  #status = false
  #isEmpty = true
  static create(state, deepValidate=false, isCrypto=false) {
    const instance = new State(state, deepValidate, isCrypto);
    State.#stateList.push(instance);
    return instance
  }
  static delete(state) {
  }
  constructor(state, deepValidate=false, isCrypto=false) {
    if (isObject(state)) {
      this.#data = this.validateState(state, deepValidate, isCrypto);
      this.#status = "valid";
      this.#isEmpty = (this.#data.chart?.isEmpty) ? true : false;
    }
    else {
      this.defaultState();
      this.#status = "default";
      this.#isEmpty = true;
    }
  }
  get status() { return this.#status }
  get data() { return this.#data }
  get isEmpty() { return this.#isEmpty }
  validateState(state, deepValidate=false, isCrypto=false) {
    const defaultState = copyDeep(DEFAULT_STATE);
    if (!('chart' in state)) {
      state.chart = defaultState.chart;
      state.chart.data = state?.ohlcv || [];
      state.chart.isEmpty = true;
    }
    state = mergeDeep(defaultState, state);
    if (deepValidate)
      state.chart.data = validateDeep(state.chart.data, isCrypto) ? state.chart.data : [];
    else
      state.chart.data = validateShallow(state.chart.data, isCrypto) ? state.chart.data : [];
    if (!isNumber(state.chart?.tf) || deepValidate) {
      let tfms = detectInterval(state.chart.data);
      if (tfms < SECOND_MS) tfms = DEFAULT_TIMEFRAMEMS;
      state.chart.tfms = tfms;
    }
    if (!isString$1(state.chart?.tfms) || deepValidate)
      state.chart.tf = ms2Interval(state.chart.tfms);
    if (!('onchart' in state)) {
        state.onchart = defaultState.onchart;
    }
    if (!('offchart' in state)) {
        state.offchart = defaultState.offchart;
    }
    if (!state.chart.settings) {
        state.chart.settings = defaultState.chart.settings;
    }
    delete state.ohlcv;
    if (!('datasets' in state)) {
        state.datasets = [];
    }
    for (var ds of state.datasets) {
      if (!this.#dss) this.#dss = {};
      this.dss[ds.id] = new Dataset(this, ds);
    }
    return state
  }
  defaultState() {
    this.#data = copyDeep(DEFAULT_STATE);
  }
  deepMerge(target, source) {
    return mergeDeep(target, source)
  }
}

class StateMachine {
  #id
  #state
  #statePrev
  #context = {}
  #config
  #core
  #status = "stopped"
  #events
  #event
  #eventData
  #actions
  #statuses = ["await", "idle", "running", "stopped"]
  constructor(config, context) {
    if (!StateMachine.validateConfig(config)) return false
    const cfg = {...config};
    this.#id = cfg.id;
    this.#config = cfg;
    this.#state = cfg.initial;
    this.#context.origin = context;
    this.#actions = cfg.actions;
    this.#core = context.core;
    this.#subscribe();
  }
  get id() { return this.#id }
  get state() { return this.#state }
  get previousSate() { return this.#statePrev }
  get context() { return this.#context }
  get core() { return this.#core }
  get status() { return this.#status }
  get event() { return this.#event }
  get events() { return this.#events }
  get eventData() { return this.#eventData }
  get actions() { return this.#actions }
  notify(event, data) {
    this.#event = event;
    this.#eventData = data;
    const currStateConfig = this.#config.states[this.#state];
      let destTransition = currStateConfig.on[event];
    if ( !destTransition
      || !isFunction(destTransition.action)
      || this.#status !== "running") {
      return false
    }
    let cond = destTransition?.condition?.type || destTransition?.condition || false;
    if ( cond
      && !this.condition.call(this, cond, destTransition.condition)) {
      return false
    }
    const destState = destTransition.target;
    const destStateConfig = this.#config.states[destState];
    currStateConfig?.onExit.call(this, data);
    destTransition.action.call(this, data);
    this.#statePrev = this.#state;
    this.#state = destState;
    destStateConfig?.onEnter.call(this, data);
    if ( this.#config.states[destState]?.on
      && (this.#config.states[destState].on['']
      || this.#config.states[destState].on?.always) ) {
        const transient
          = this.#config.states[destState].on['']
          || this.#config.states[destState].on.always;
        if (isArray(transient)) {
          for (let transition of transient) {
            let cond = transition?.condition?.type || transition?.condition || false;
            if (
                this.condition.call(this, cond, transition.condition)
                && isString$1(transition.target)
              ) {
              transition?.action.call(this, data);
              this.#statePrev = this.#state;
              this.#state = transition?.target;
              this.notify(null, null);
            }
          }
        }
        else if (isObject(transient) && isString$1(transient.target)) {
          let cond = transient?.condition?.type || transient?.condition || false;
          if (
              this.condition.call(this, cond, transient.condition)
              && isString$1(transient.target)
            ) {
            transient?.action.call(this, data);
            this.#statePrev = this.#state;
            this.#state = transient.target;
            this.notify(null, null);
          }
        }
    }
    return this.#state
  }
  condition(cond, event=null, params={}) {
    return (cond)? this.#config.guards[cond].call(this, this.#context, event, params) : false
  }
  canTransition(event) {
    const currStateConfig = this.#config.states[this.#state];
    return event in currStateConfig.on
  }
  start() { this.#status = "running"; }
  stop() { this.#status = "stopped"; }
  destroy() {
    this.#unsubscribe();
    this.#config = null;
  }
  #subscribe() {
    this.#events = new Set();
    for (let state in this.#config.states) {
      for (let event in this.#config.states[state].on) {
        this.#events.add(event);
      }
    }
    for (let event of this.#events) {
      this.#core.on(event, this.notify.bind(this, event), this.context);
    }
  }
  #unsubscribe() {
    for (let event of this.#events) {
      this.#core.off(event, this.notify);
    }
  }
  static validateConfig(c) {
    if (!isObject(c)) return false
    const required = ["id", "initial", "context", "states"];
      let keys = Object.keys(c);
    if (!isArrayEqual(required, keys)) return false
    if (!(c.initial in c.states)) return false
    for (let state in c.states) {
      if (!isObject(c.states[state])) return false
      if ("onEnter" in c.states[state] && !isFunction(c.states[state].onEnter)) return false
      if ("onExit" in c.states[state] && !isFunction(c.states[state].onExit)) return false
      if ("on" in c.states[state]) {
        for (let e in c.states[state].on) {
          let event = c.states[state].on[e];
          if (!isString$1(event.target)) return false
          if ("action" in event && !isFunction(event.action)) return false
        }
      }
    }
    return true
  }
}

const ALERT = "alert";
class Alerts {
  #list = new Map()
  #handlers = {}
  constructor(alerts) {
    if (isArray(alerts)) {
      for (let a of alerts) {
        this.add(a?.price, a?.condition, a?.handler);
      }
    }
  }
  get list() { return this.#list }
  get handlers() { return this.#handlers }
  destroy() {
    this.#list.clear();
    this.#handlers = {};
  }
  batchAdd(alerts) {
    if (isArray(alerts)) {
      let ids = [];
      for (let a of alerts) {
        ids.push(this.add(a?.price, a?.condition, a?.handler));
      }
      return ids
    }
    else return false
  }
  add(price, condition, handler) {
    if (isNaN(price) ||
        !isFunction(handler)) return false
    const id = uid(ALERT);
    const alert = {price, condition};
    if (this.list.has(alert)) {
      let value = this.list.get(alert);
      value[id] = handler;
    }
    else {
      const entry = {};
      entry[id] = handler;
      this.list.set(alert, entry);
    }
    this.#handlers[id] = {alert, handler};
    return id
  }
  remove(id) {
    if (!(id in this.#handlers)) return false
    const handler = this.#handlers[id];
    const alert = handler.alert;
    const value = this.#list.get(alert);
    value.delete(id);
    handler.delete(id);
    if (Object.keys(value).length == 0)
      this.#list.delete(alert);
    return true
  }
  delete(price, condition) {
    if (this.list.has({price, condition})) {
      const alert = this.list.get({price, condition});
      for (let id in alert) {
        this.#handlers.delete(id);
        alert.delete(id);
      }
    }
    return this.list.delete({price, condition})
  }
  pause(id) {
    if (!(id in this.#handlers)) return false
    this.#handlers[id];
  }
  handlerByID(id) {
    if (!(id in this.#handlers)) return false
    else return this.#handlers[id].handler
  }
  check(prev, curr) {
    if (!isArray(prev) || !isArray(curr)) return
    for (let [key, handlers] of this.list) {
      if (key.condition(key.price, prev, curr)) {
        for (let id in handlers) {
          try {
            handlers[id](key.price, prev, curr);
          }
          catch(e) { console.error(e); }
        }
      }
    }
  }
}

const NAME = "TradeX-Chart";
const ID = "TradeXChart";
const CLASS_UTILS     = "tradeXutils";
const CLASS_TOOLS     = "tradeXtools";
const CLASS_MENUS     = "tradeXmenus";
const CLASS_MENU      = "tradeXmenu";
const CLASS_DIVIDERS  = "tradeXdividers";
const CLASS_WINDOWS   = "tradeXwindows";
const CLASS_WINDOW    = "tradeXwindow";
const RANGELIMIT = 500;
const STREAM_NONE      = "stream_None";
const STREAM_LISTENING = "stream_Listening";
const STREAM_STARTED   = "stream_Started";
const STREAM_STOPPED   = "stream_Stopped";
const STREAM_ERROR     = "stream_Error";
const STREAM_FIRSTVALUE= "stream_candleFirst";
const STREAM_UPDATE    = "stream_candleUpdate";
const STREAM_NEWVALUE  = "stream_candleNew";
const STREAM_MAXUPDATE = 250;
const STREAM_PRECISION = 8;
const PRICE_PRECISION  = 2;
const VOLUME_PRECISION = 2;

const T$1 = 0, O = 1, H = 2, L = 3, C$1 = 4, V = 5;
const empty = [null, null, null, null, null];
const defaultStreamConfig = {
  tfCountDown: true,
  alerts: []
};
class Stream {
  #core
  #config
  #status
  #time
  #maxUpdate
  #updateTimer
  #precision
  #candle = empty
  #countDownStart = 0
  #countDownMS = 0
  #countDown = ""
  #dataReceived = false
  #lastPriceMax
  #lastPriceMin
  #lastTick = empty
  #alerts
  static validateConfig(c) {
    if (!isObject(c)) return defaultStreamConfig
    else {
      let d = copyDeep(defaultStreamConfig);
      c = mergeDeep(d, c);
      c.tfCountDown = (isBoolean(c.tfCountDown)) ? c.tfCountDown : defaultStreamConfig.tfCountDown;
      c.alerts = (isArray(c.alerts)) ? c.alerts : defaultStreamConfig.alerts;
    }
    return c
  }
  constructor(core) {
    this.#core = core;
    this.#time = core.time;
    this.status = {status: STREAM_NONE};
    this.#config = Stream.validateConfig(core.config?.stream);
    this.#maxUpdate = (isNumber(core.config?.maxCandleUpdate)) ? core.config.maxCandleUpdate : STREAM_MAXUPDATE;
    this.#precision = (isNumber(core.config?.streamPrecision)) ? core.config.streamPrecision : STREAM_PRECISION;
  }
  get config() { return this.#config }
  get countDownMS() { return this.#countDownMS }
  get countDown() { return this.#countDown }
  get range() { return this.#core.range }
  get status() { return this.#status }
  set status({status, data}) {
    this.#status = status;
    this.emit(status, data);
  }
  set dataReceived(data) {
    if (this.#dataReceived) return
    this.#dataReceived = true;
    this.status = {status: STREAM_FIRSTVALUE, data};
  }
  get alerts() { return this.#alerts }
  get lastPriceMin() { return this.#lastPriceMin }
  set lastPriceMin(p) { if (isNumber(p)) this.#lastPriceMin = p; }
  get lastPriceMax() { return this.#lastPriceMax }
  set lastPriceMax(p) { if (isNumber(p)) this.#lastPriceMax = p; }
  get lastTick() { return this.#lastTick }
  set lastTick(t) {
    if (!isArray(t)) return
    this.#lastTick;
    this.#lastTick = t;
    this.alerts.check(t, this.#candle);
  }
  set candle(data) {
    const lastTick = [...this.#candle];
    data.t = this.roundTime(new Date(data.t));
    data.o = data.o * 1;
    data.h = data.h * 1;
    data.l = data.l * 1;
    data.c = data.c * 1;
    data.v = data.v * 1;
    if (this.#candle[T$1] !== data.t) {
      this.newCandle(data);
    }
    else {
      this.updateCandle(data);
    }
    this.status = {status: STREAM_LISTENING, data: this.#candle};
    this.lastTick = lastTick;
  }
  get candle() {
    return (this.#candle !== empty) ? this.#candle : null
  }
  start() {
    this.#alerts = new Alerts(this.#config.alerts);
    this.status = {status: STREAM_STARTED};
    this.#updateTimer = setInterval(this.onUpdate.bind(this), this.#maxUpdate);
  }
  stop() {
    this.#alerts.destroy();
    this.status = {status: STREAM_STOPPED};
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  error() {
    this.status = {status: STREAM_ERROR};
  }
  onTick(tick) {
    if (this.#status == STREAM_STARTED || this.#status == STREAM_LISTENING) {
      if (isObject(tick)) {
        this.candle = tick;
        this.#core.setNotEmpty();
      }
    }
  }
  onUpdate() {
    if (this.#candle !== empty) {
      this.status = {status: STREAM_UPDATE, data: this.candle};
      this.status = {status: STREAM_LISTENING, data: this.#candle};
    }
  }
  newCandle(data) {
    this.prevCandle();
    this.#candle =
     [data.t,
      data.o,
      data.h,
      data.l,
      data.c,
      data.v,
      null, true];
    this.#core.mergeData({data: [this.#candle]}, true, false);
    this.status = {status: STREAM_NEWVALUE, data: {data: data, candle: this.#candle}};
    this.#countDownMS = this.#time.timeFrameMS;
    this.#countDownStart = this.roundTime(Date.now());
  }
  prevCandle() {
    const d = this.#core.allData.data;
    if (d.length > 0 && d[d.length - 1][7])
          d[d.length - 1].pop();
  }
  updateCandle(data) {
    let candle = this.#candle;
    candle[O] = data.o;
    candle[H] = data.h;
    candle[L] = data.l;
    candle[C$1] = data.c;
    candle[V] = data.v;
    this.#candle = candle;
    const d = this.#core.allData.data;
    const l = (d.length > 0) ? d.length -1 : 0;
    d[l] = this.#candle;
    this.countDownUpdate();
  }
  parseCandle
  countDownUpdate() {
    let y,M,w,d,h,m,s;
    this.#time.timeFrameMS;
    let cntDn = this.#time.timeFrameMS - (Date.now() - this.#countDownStart);
    if (cntDn < 0) {
      cntDn = 0;
    }
    this.#countDownMS = cntDn;
    if (cntDn > YEAR_MS) {
      y = String(Math.floor(cntDn / YEAR_MS));
      M = String(Math.floor((cntDn % YEAR_MS) / MONTHR_MS)).padStart(2, '0');
      this.#countDown = `${y}Y ${M}M`;
    }
    else if (cntDn > MONTHR_MS) {
      M = String(Math.floor(cntDn / MONTHR_MS)).padStart(2, '0');
      d = String(Math.floor((cntDn % MONTHR_MS) / DAY_MS)).padStart(2, '0');
      this.#countDown = `${M}M ${d}D`;
    }
    else if (cntDn > WEEK_MS) {
      w = String(Math.floor(cntDn / WEEK_MS)).padStart(2, '0');
      d = String(Math.floor((cntDn % MONTHR_MS) / DAY_MS)).padStart(2, '0');
      this.#countDown = `${w}W ${d}D`;
    }
    else if (cntDn > DAY_MS) {
      d = String(Math.floor(cntDn / DAY_MS)).padStart(2, '0');
      h = String(Math.floor((cntDn % DAY_MS) / HOUR_MS)).padStart(2, '0');
      m = String(Math.floor((cntDn % HOUR_MS) / MINUTE_MS)).padStart(2, '0');
      this.#countDown = `${d}D ${h}:${m}`;
    }
    else if (cntDn > HOUR_MS) {
      h = String(Math.floor(cntDn / HOUR_MS)).padStart(2, '0');
      m = String(Math.floor((cntDn % HOUR_MS) / MINUTE_MS)).padStart(2, '0');
      s = String(Math.floor((cntDn % MINUTE_MS) / SECOND_MS)).padStart(2, '0');
      this.#countDown = `${h}:${m}:${s}`;
    }
    else if (cntDn > MINUTE_MS) {
      m = String(Math.floor(cntDn / MINUTE_MS)).padStart(2, '0');
      s = String(Math.floor((cntDn % MINUTE_MS) / SECOND_MS)).padStart(2, '0');
      this.#countDown = `00:${m}:${s}`;
    }
    else {
      s = String(Math.floor(cntDn / SECOND_MS)).padStart(2, '0');
      String(cntDn % SECOND_MS).padStart(4, '0');
      this.#countDown = `00:00:${s}`;
    }
    return this.#countDown
  }
  roundTime(ts) {
    return ts - (ts % this.#core.time.timeFrameMS)
  }
}

const CHART_MINH = 300;
const CHART_MINW = 400;
const TX_MINW = `${CHART_MINW}px`;
const TX_MINH = `${CHART_MINH}px`;
const TX_MAXW = "100%";
const TX_MAXH = "100%";
const UTILSH = 35;
const TOOLSW = 40;
const TIMEH = 50;
const SCALEW = 60;
const FONTWEIGHT = "normal";
const FONTSIZE = 12;
const FONTSTYLE = "normal";
const FONTFAMILY = "Avenir, Helvetica, Arial, sans-serif";
const COLOUR_BG = "#141414";
const COLOUR_BORDER = "#666";
const COLOUR_TXT = "#ccc";
const COLOUR_ICON = "#888";
const COLOUR_ICONHOVER = "#CCC";
const ICONSIZE = "30px";
const STYLE_ROW = "position: relative;";
const GlobalStyle = {
  COLOUR_BG: COLOUR_BG,
  COLOUR_BORDER: COLOUR_BORDER,
  COLOUR_TXT: COLOUR_TXT,
  COLOUR_ICON: COLOUR_ICON,
  COLOUR_ICONHOVER: COLOUR_ICONHOVER,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: FONTWEIGHT,
  FONTSIZE: FONTSIZE,
  FONTSTYLE: FONTSTYLE,
  FONTFAMILY: FONTFAMILY,
  FONT: `${FONTSTYLE} ${FONTSIZE}px ${FONTWEIGHT} ${FONTFAMILY}`,
  FONTSTRING: `font-style: ${FONTSTYLE}; font-size: ${FONTSIZE}px; font-weight: ${FONTWEIGHT}; font-family: ${FONTFAMILY};`,
};
const ToolsStyle = {
  COLOUR_ICON: COLOUR_ICON,
  ICONSIZE: ICONSIZE
};
const UtilsStyle = {
  COLOUR_ICON: COLOUR_ICON,
  ICONSIZE: ICONSIZE
};
const MenuStyle = {
  COLOUR_BG: COLOUR_BG,
  COLOUR_BORDER: COLOUR_BORDER,
  COLOUR_TXT: COLOUR_TXT,
};
const WindowStyle = {
  COLOUR_BG: COLOUR_BG,
  COLOUR_BORDER: COLOUR_BORDER,
  COLOUR_TXT: COLOUR_TXT,
};
const CandleType = {
  CANDLE_SOLID: 'candle_solid',
  CANDLE_HOLLOW: 'candle_hollow',
  CANDLE_UP_HOLLOW: 'candle_up_hollow',
  CANDLE_DOWN_HOLLOW: 'candle_down_hollow',
  OHLC: 'ohlc',
  AREA: 'area',
  LINE: 'line'
};
const CandleStyle = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04",
};
const VolumeStyle = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15,
};
const YAxisStyle_FONTWEIGHT = FONTWEIGHT;
const YAxisStyle_FONTSIZE = FONTSIZE;
const YAxisStyle_FONTFAMILY = FONTFAMILY;
const YAxisStyle = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: YAxisStyle_FONTFAMILY,
  FONTSIZE: YAxisStyle_FONTSIZE,
  FONTWEIGHT: YAxisStyle_FONTWEIGHT,
  FONT_LABEL: `${YAxisStyle_FONTWEIGHT} ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`,
  FONT_LABEL_BOLD: `bold ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`
};
const XAxisStyle_FONTWEIGHT = FONTWEIGHT;
const XAxisStyle_FONTSIZE = FONTSIZE;
const XAxisStyle_FONTFAMILY = FONTFAMILY;
const XAxisStyle = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: XAxisStyle_FONTFAMILY,
  FONTSIZE: XAxisStyle_FONTSIZE,
  FONTWEIGHT: XAxisStyle_FONTWEIGHT,
  FONT_LABEL: `${XAxisStyle_FONTWEIGHT} ${XAxisStyle_FONTSIZE}px ${XAxisStyle_FONTFAMILY}`,
  FONT_LABEL_BOLD: `bold ${YAxisStyle_FONTSIZE}px ${YAxisStyle_FONTFAMILY}`
};
const GridStyle = {
  COLOUR_GRID: "#333"
};
const PriceLineStyle = {
  lineWidth: 1,
  strokeStyle: "#ccc",
  lineDash: [1,1]
};
const LegendStyle = {
  text: GlobalStyle.FONTSTRING,
  font: GlobalStyle.FONT,
  colour: GlobalStyle.COLOUR_TXT
};
const defaultTheme = {
  candle: {
    Type: CandleType.CANDLE_SOLID,
    UpBodyColour: CandleStyle.COLOUR_CANDLE_UP,
    UpWickColour: CandleStyle.COLOUR_WICK_UP,
    DnBodyColour: CandleStyle.COLOUR_CANDLE_DN,
    DnWickColour: CandleStyle.COLOUR_WICK_DN,
  },
  volume: {
    Height: VolumeStyle.ONCHART_VOLUME_HEIGHT,
    UpColour: VolumeStyle.COLOUR_VOLUME_UP,
    DnColour: VolumeStyle.COLOUR_VOLUME_DN,
  },
  xAxis: {
    colourTick: XAxisStyle.COLOUR_TICK,
    colourLabel: XAxisStyle.COLOUR_LABEL,
    colourCursor: XAxisStyle.COLOUR_CURSOR,
    colourCursorBG: XAxisStyle.COLOUR_CURSOR_BG,
    fontFamily: XAxisStyle.FONTFAMILY,
    fontSize: XAxisStyle.FONTSIZE,
    fontWeight: XAxisStyle.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: COLOUR_ICON,
    iconHover: COLOUR_ICONHOVER
  },
  yAxis: {
    colourTick: YAxisStyle.COLOUR_TICK,
    colourLabel: YAxisStyle.COLOUR_LABEL,
    colourCursor: YAxisStyle.COLOUR_CURSOR,
    colourCursorBG: YAxisStyle.COLOUR_CURSOR_BG,
    fontFamily: YAxisStyle.FONTFAMILY,
    fontSize: YAxisStyle.FONTSIZE,
    fontWeight: YAxisStyle.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: GlobalStyle.COLOUR_BG,
    BorderColour: GlobalStyle.COLOUR_BORDER,
    BorderThickness: GlobalStyle.BORDER_THICKNESS,
    TextColour: GlobalStyle.COLOUR_TXT,
    GridColour: GridStyle.COLOUR_GRID,
  },
  onChart: {
  },
  offChart: {
  },
  legend: {
    font: LegendStyle.font,
    colour: LegendStyle.colour,
  },
  icon: {
    colour: COLOUR_ICON,
    hover: COLOUR_ICONHOVER
  }
};
const cssVars = `
<style title="txc_CSSVars">
  --txc-background: #141414:
  --txc-border-color: #888;
  --txc-time-scrollbar-color: #888;
  --txc-time-handle-color: #888;
  --txc-time-slider-color: #888;
  --txc-time-cursor-fore: #222;
  --txc-time-cursor-back: #ccc;
  --txc-time-icon-color: #888;
  --txc-time-icon-hover-color: #888;
</style>`;
const style = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${TX_MINW});
    min-height: var(--txc-min-height, ${TX_MINH});
    max-width: var(--txc-max-width, ${TX_MAXW});
    max-height: var(--txc-max-height, ${TX_MAXH});
    overflow: hidden;
    background: var(--txc-background, ${GlobalStyle.COLOUR_BG});
    font: var(--txc-font, ${GlobalStyle.FONT});
  }
  .tradeXchart .tradeXtime .navigation { 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 2px;
  }
  .tradeXchart .tradeXtime .navigation .icon { 
    flex-basis: 20px;
   }
  .tradeXchart .tradeXtime .navigation #tScrollBar { 
    height: 20px; 
    border: 1px solid; 
    border-radius: 3px; 
    flex-basis: 100%;
    overflow: hidden;
  }
  .tradeXchart .tradeXtime .navigation #tScrollBar .handle { 
    height: 18px; 
    border-radius: 2px; 
    margin: 1px;
  }

  tradex-grid {
    position: absolute;
  }
</style>
`;

class Theme {
  #list = new Map()
  #current
  #config
  static create(theme, core) {
    if (!(isObject(theme))) return false
    theme.ID = (isString$1(theme.name))? uid(theme.name) : `${core.id}.theme`;
    const instance = new Theme(theme, core);
    instance.#list.set(theme.ID, instance);
    return instance
  }
  constructor(theme, core) {
    this.#config = (isObject(theme))? theme : {};
    const reserved = ["constructor","list","current","setCurrent","getCurrent"];
    const defaultT = copyDeep(defaultTheme);
    const newTheme = copyDeep(theme);
    const setTheme = mergeDeep(defaultT, newTheme);
    for (let t in setTheme) {
      if (reserved.includes(t)) continue
      this[t] = setTheme[t];
    }
  }
  get list() { return this.#list }
  set current(theme) { this.setCurrent(theme); }
  get current() { return this.#current }
  setCurrent(theme) {
    if (isString$1(theme) && this.#list.has(theme)) {
      this.#current = theme;
    }
    return this.getCurrent()
  }
  getCurrent() {
    if (isString$1(this.#current) && this.#list.has(this.#current))
      return this.#list.get(this.#current)
    else
      return defaultTheme
  }
}

class ThreadWorker {
  #fn
  constructor (fn) {
    this.#fn = fn;
    self.onmessage = m => this._onmessage(m.data);
  }
  _onmessage (m) {
    const {r, data} = m;
    const result = this.#fn(data);
    self.postMessage({r, result});
  }
  end() {
    self.close();
  }
}
class Thread {
  #ID
  #cb
  #err
  #req = 0
  #reqList = {}
  #worker
  constructor(ID, fn, cb, err) {
    this.#ID = ID;
    this.#cb = cb;
    this.#err = err;
    const workerFn = `
      ${WebWorker$1.ThreadWorker.toString()};
      const fn = ${fn}
      const worker = new ThreadWorker(fn)
    `;
    const blob = new Blob([`;(() => {${workerFn}})()`], { type: 'text/javascript' });
    const blobURL = URL.createObjectURL(blob);
    this.#worker = new Worker(blobURL);
    URL.revokeObjectURL(blobURL);
  }
  get ID() { return this.#ID }
  get req() { return `r_${this.#req}` }
  onmessage(m) {
    return (isFunction(this.#cb))? this.#cb(m) : m
  }
  onerror(e) {
    return (isFunction(this.#err))? this.#err(e) : e
  }
  postMessage(m) {
    return new Promise((resolve, reject) => {
      try {
        let r = this.req;
        this.#reqList[r] = {resolve, reject};
        this.#worker.postMessage({r: r, data: m});
        this.#worker.onmessage = m => {
          const {r, result} = m.data;
          if (r in this.#reqList) {
            const {resolve, reject} = this.#reqList[r];
            delete this.#reqList[r];
            resolve(this.onmessage(result));
          }
        };
        this.#worker.onerror = e => {
          reject(this.onerror(e));
        };
      } catch (error) { reject(error); }
    })
  }
  terminate() {
    this.#worker.terminate();
  }
}
class WebWorker$1 {
  static #threads = new Map()
  static ThreadWorker = ThreadWorker
  static Thread = Thread
  static create(ID="worker", worker, cb, core) {
    if (typeof window.Worker === "undefined") return false
    if (isFunction(worker)) {
      worker = worker.toString();
    }
    else if (isString$1(worker)) ;
    else { return false }
    ID = (isString$1(ID))? uid(ID) : uid("worker");
    WebWorker$1.#threads.set(ID, new WebWorker$1.Thread(ID, worker, cb));
    return WebWorker$1.#threads.get(ID)
  }
  static destroy(ID) {
    if (!isString$1(ID)) return false
    WebWorker$1.#threads.get(ID).terminate();
    WebWorker$1.#threads.delete(ID);
  }
  static end() {
    WebWorker$1.#threads.forEach( (value, key, map) => {
      WebWorker$1.destroy(key);
    });
  }
}

class Overlay {
  #parent
  #core
  #config = {}
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #params
  #doDraw = true
  constructor(target, xAxis=false, yAxis=false, theme, parent, params={}) {
    this.#core = parent.core;
    this.#parent = parent;
    this.#config = parent.core.config;
    this.#target = target;
    this.#scene = target.scene;
    this.#theme = theme;
    this.#xAxis = xAxis;
    this.#yAxis = yAxis;
    this.#params = params;
  }
  get core() { return this.#core }
  get parent() { return this.#parent }
  get target() { return this.#target }
  get config() { return this.#config }
  get params() { return this.#params }
  get scene() { return this.#scene }
  get theme() { return this.#theme }
  get chart() { return this.#parent.parent.parent }
  get xAxis() { return this.#xAxis || this.#parent.time.xAxis }
  get yAxis() { return this.#yAxis || this.#parent.scale.yAxis }
  set doDraw(d) { this.#doDraw = (isBoolean(d)) ? d : false; }
  get doDraw() { return this.#doDraw }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.core.emit(topic, data);
  }
}

function renderFillRect (ctx, x, y, width, height, style) {
  ctx.fillStyle = style;
  ctx.fillRect(x, y, width, height);
}

function renderPath (ctx, coords, style, strokeFill) {
  ctx.save();
  ctx.lineWidth = style.lineWidth || 1;
  if (ctx.lineWidth % 2) {
    ctx.translate(0.5, 0.5);
  }
  ctx.strokeStyle = style.strokeStyle;
  if ("lineDash" in style && isArray(style.lineDash))
    ctx.setLineDash(style.lineDash);
  ctx.beginPath();
  let move = true;
  coords.forEach(coord => {
    if (coord && coord.x !== null) {
      if (move) {
        ctx.moveTo(coord.x, coord.y);
        move = false;
      } else {
        ctx.lineTo(coord.x, coord.y);
      }
    }
  });
  strokeFill();
  ctx.restore();
}

function renderHorizontalLine (ctx, y, left, right, style) {
  const coords = [{x:left, y:y}, {x:right, y:y}];
  renderPath(ctx, coords, style, () => {
    ctx.stroke();
    ctx.closePath();
  });
}
function renderLine (ctx, coords, style) {
  renderPath(ctx, coords, style, () => {
    ctx.stroke();
    ctx.closePath();
  });
}

const T = 0, C = 4;
class indicator extends Overlay {
  #ID
  #name
  #shortName
  #onChart
  #scaleOverlay
  #plots
  #params
  #overlay
  #indicator
  #type
  #TALib
  #range
  #value = [0, 0]
  #newValueCB
  #updateValueCB
  #precision = 2
  #style = {}
  constructor (target, xAxis=false, yAxis=false, config, parent, params) {
    super(target, xAxis, yAxis, undefined, parent, params);
    this.#params = params;
    this.#overlay = params.overlay;
    this.#type = config.type;
    this.#indicator = config.indicator;
    this.#TALib = this.core.TALib;
    this.#range = this.xAxis.range;
    this.eventsListen();
  }
  get ID() { return this.#ID }
  set ID(id) { this.#ID = id; }
  get name() { return this.#name }
  set name(n) { this.#name = n; }
  get shortName() { return this.#shortName }
  set shortName(n) { this.#shortName = n; }
  get onChart() { return this.#onChart }
  set onChart(c) { this.#onChart = c; }
  get scaleOverlay() { return this.#scaleOverlay }
  set scaleOverlay(o) { this.#scaleOverlay = o; }
  get plots() { return this.#plots }
  set plots(p) { this.#plots = p; }
  get params() { return this.#params }
  get Timeline() { return this.core.Timeline }
  get Scale() { return this.parent.scale }
  get type() { return this.#type }
  get overlay() { return this.#overlay }
  get indicator() { return this.#indicator }
  get TALib() { return this.#TALib }
  get range() { return this.core.range }
  set setNewValue(cb) { this.#newValueCB = cb; }
  set setUpdateValue(cb) { this.#updateValueCB = cb; }
  set precision(p) { this.#precision = p; }
  get precision() { return this.#precision }
  set style(s) { this.#style = s; }
  get style() { return this.#style }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  set value(data) {
    const tfms = this.core.time.timeFrameMS;
    let roundedTime = Math.floor(new Date(data[T]) / tfms) * tfms;
    data[T] = roundedTime;
    if (this.#value[T] !== data[T]) {
      this.#value[T] = data[T];
      this.#newValueCB(data);
    }
    else {
      this.#updateValueCB(data);
    }
  }
  get value() {
    return this.#value
  }
  end() {
    this.off(STREAM_UPDATE, this.onStreamUpdate);
  }
  eventsListen() {
    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this));
  }
  on(topic, handler, context) {
    this.core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.core.off(topic, handler);
  }
  emit(topic, data) {
    this.core.emit(topic, data);
  }
  onStreamNewValue(value) {
  }
  onStreamUpdate(candle) {
    this.value = candle;
  }
  defineIndicator(i, api) {
    if (!isObject(i)) i = {};
    this.definition.output = api.outputs;
    const input = {...this.definition.input, ...i};
          delete input.style;
    for (let i of api.options) {
      if (i.name in input) {
        if (typeof input[i.name] !== i.type) {
          input[i.name] = i.defaultValue;
          continue
        }
        else if ("range" in i) {
          input[i.name] = limit(input[i.name], i.range.min, i.range.max);
        }
      }
      else if (i.name == "timePeriod")
        input.timePeriod = i.defaultValue;
    }
    this.definition.input = input;
  }
  addLegend() {
    let legend = {
      id: this.shortName,
      title: this.shortName,
      type: this.shortName,
      source: this.legendInputs.bind(this)
    };
    this.chart.legend.add(legend);
  }
  legendInputs(pos=this.chart.cursorPos) {
    const colours = [this.style.strokeStyle];
    let index = this.Timeline.xPos2Index(pos[0]);
    let c = index  - (this.range.data.length - this.overlay.data.length);
    let l = limit(this.overlay.data.length - 1, 0, Infinity);
        c = limit(c, 0, l);
    return {c, colours}
  }
  indicatorInput(start, end) {
    let input = [];
    do {
      input.push(this.range.value(start)[C]);
    }
    while (start++ < end)
    return input
  }
  regeneratePlots (params) {
    return params.map((_, index) => {
      const num = index + 1;
      return {
        key: `${this.shortName}${num}`,
        title: `${this.shortName}${num}: `,
        type: 'line'
      }
    })
  }
  TALibParams() {
    let end = this.range.dataLength;
    let step = this.definition.input.timePeriod;
    let start = end - step;
    let input = this.indicatorInput(start, end);
    let hasNull = input.find(element => element === null);
    if (hasNull) return false
    else return { inReal: input, timePeriod: step }
  }
  calcIndicator (indicator, params={}, range=this.range) {
    if (!isString$1(indicator) ||
        !(indicator in this.TALib) ||
        !isObject(range) ||
        !this.core.TALibReady
        ) return false
        params.timePeriod = params.timePeriod || this.definition.input.timePeriod;
        let start, end;
        let p = params.timePeriod;
        if (range instanceof Range) {
          start = 0;
          end = range.dataLength - p + 1;
        }
        else if ( "indexStart" in range || "indexEnd" in range ||
                  "tsStart" in range ||  "tsEnd" in range ) {
          start = range.indexStart || this.Timeline.t2Index(range.tsStart || 0) || 0;
          end = range.indexEnd || this.Timeline.t2Index(range.tsEnd) || this.range.Length - 1;
        }
        else return false
        if ( end - start < p ) return false
        let data = [];
        let i, v, entry;
        while (start < end) {
          params.inReal = this.indicatorInput(start, start + p);
          entry = this.TALib[indicator](params);
          v = [];
          i = 0;
          for (let o of this.definition.output) {
            v[i++] = entry[o.name][0];
          }
          data.push([this.range.value(start + p - 1)[0], v]);
          start++;
        }
        return data
  }
  calcIndicatorHistory () {
    if (this.overlay.data.length < this.definition.input.timePeriod) {
      let data;
      const calc = () => {
        data = this.calcIndicator(this.libName, this.definition.input, this.range);
        if (data) this.overlay.data = data;
      };
      if (this.core.TALibReady) calc();
      else  this.core.talibAwait.push(calc.bind(this));
    }
  }
  calcIndicatorStream (indicator, params, range=this.range) {
    if (!this.core.TALibReady ||
        !isString$1(indicator) ||
        !(indicator in this.TALib) ||
        !(range instanceof Range) ||
        range.dataLength < this.definition.input.timePeriod
        ) return false
    let entry = this.TALib[indicator](params);
    let end = range.dataLength;
    let time = range.value(end)[0];
    let v = [];
    let i = 0;
    for (let o of this.definition.output) {
      v[i++] = entry[o.name][0];
    }
    return [time, v]
  }
  newValue (value) {
    let p = this.TALibParams();
    if (!p) return false
    let v = this.calcIndicatorStream(this.libName, p);
    if (!v) return false
    this.overlay.data.push(v);
    this.target.setPosition(this.core.scrollPos, 0);
    this.draw(this.range);
  }
  updateValue (value) {
    let l = this.overlay.data.length - 1;
    let p = this.TALibParams();
    if (!p) return false
    let v = this.calcIndicatorStream(this.libName, p);
    if (!v) return false
    this.overlay.data[l] = [v[0], v[1]];
    this.target.setPosition(this.core.scrollPos, 0);
    this.draw(this.range);
  }
  plot(plots, type, style) {
    const ctx = this.scene.context;
    ctx.save();
    switch(type) {
      case "renderLine": renderLine(ctx, plots, style);
      case "renderFillRect": renderFillRect(ctx, plots[0], plots[1], plots[2], plots[3], style);
    }
    ctx.restore();
  }
  draw() {
  }
}

const BBANDS = {
  name: "BBANDS",
  camelCaseName: "bbands",
  group: "Overlap Studies",
  description: "Bollinger Bands",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 5,
    hint: "Number of period",
    type: "number",
    range: {
      min: 2,
      max: 100000
    }
  }, {
    name: "nbDevUp",
    displayName: "Deviations up",
    defaultValue: 2,
    hint: "Deviation multiplier for upper band",
    type: "number",
    range: {
      min: -3e+37,
      max: 3e+37
    }
  }, {
    name: "nbDevDn",
    displayName: "Deviations down",
    defaultValue: 2,
    hint: "Deviation multiplier for lower band",
    type: "number",
    range: {
      min: -3e+37,
      max: 3e+37
    }
  }, {
    name: "MAType",
    displayName: "MA Type",
    defaultValue: 0,
    hint: "Type of Moving Average",
    type: "MAType"
  }],
  outputs: [{
    name: "upperBand",
    type: "number",
    plot: "limit_upper"
  }, {
    name: "middleBand",
    type: "number",
    plot: "line"
  }, {
    name: "lowerBand",
    type: "number",
    plot: "limit_lower"
  }]
};
const DX = {
  name: "DX",
  camelCaseName: "dx",
  group: "Momentum Indicators",
  description: "Directional Movement Index",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 14,
    hint: "Number of period",
    type: "number",
    range: {
      min: 2,
      max: 100000
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
};
const EMA$1 = {
  name: "EMA",
  camelCaseName: "ema",
  group: "Overlap Studies",
  description: "Exponential Moving Average",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 30,
    hint: "Number of period",
    type: "number",
    range: {
      min: 2,
      max: 100000
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
};
const RSI$1 = {
  name: "RSI",
  camelCaseName: "rsi",
  group: "Momentum Indicators",
  description: "Relative Strength Index",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 14,
    hint: "Number of period",
    type: "number",
    range: {
      min: 2,
      max: 100000
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
};
const SMA$1 = {
  name: "SMA",
  camelCaseName: "sma",
  group: "Overlap Studies",
  description: "Simple Moving Average",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 30,
    hint: "Number of period",
    type: "number",
    range: {
      min: 2,
      max: 100000
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
};

class BB extends indicator {
  name = 'Bollinger Bands'
  shortName = 'BB'
  libName = 'BBANDS'
  definition = {
    input: {
      inReal: [],
      nbDevDn: 2,
      nbDevUp: 2,
      timePeriod: 20
    },
    output: {
      lowerBand: [],
      middleBand: [],
      upperBand: []
    },
  }
  #defaultStyle = {
    lowerStrokeStyle: "#08c",
    lowerLineWidth: '1',
    lowerLineDash: undefined,
    middleStrokeStyle: "#0080c088",
    middleLineWidth: '1',
    middleLineDash: undefined,
    upperStrokeStyle: "#08c",
    upperLineWidth: '1',
    upperLineDash: undefined,
    fillStyle: "#0080c044"
  }
  precision = 2
  scaleOverlay = false
  plots = [
    { key: 'BB_1', title: ' ', type: 'line' },
  ]
  constructor(target, xAxis=false, yAxis=false, config, parent, params)  {
    super(target, xAxis, yAxis, config, parent, params);
    const overlay = params.overlay;
    this.ID = params.overlay?.id || uid(this.shortName);
    this.defineIndicator(overlay?.settings, BBANDS);
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style};
    this.calcIndicatorHistory();
    this.setNewValue = (value) => { this.newValue(value); };
    this.setUpdateValue = (value) => { this.updateValue(value); };
    this.addLegend();
  }
  get onChart() { return true }
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false
    const inputs = {};
      let labels = [false, false, false];
      let {c, colours} = super.legendInputs(pos);
    inputs.Hi = this.Scale.nicePrice(this.overlay.data[c][1][0]);
    inputs.Mid = this.Scale.nicePrice(this.overlay.data[c][1][1]);
    inputs.Lo = this.Scale.nicePrice(this.overlay.data[c][1][2]);
    colours = [
      this.style.upperStrokeStyle,
      this.style.middleStrokeStyle,
      this.style.lowerStrokeStyle
    ];
    return {inputs, colours, labels}
  }
  draw(range=this.range) {
    if (this.overlay.data.length < 2 ) return false
    this.scene.clear();
    const plots = {lower: [], middle: [], upper: []};
    const data = this.overlay.data;
    const width = this.xAxis.candleW;
    this.Timeline.smoothScrollOffset || 0;
    const plot = {
      w: width,
    };
    let t = range.value(range.indexStart)[0];
    let s = this.overlay.data[0][0];
    let c = (t - s) / range.interval;
    let o = this.Timeline.rangeScrollOffset;
    let i = range.Length + o + 2;
    let style = {};
    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.lower.push({x: null, y: null});
        plots.middle.push({x: null, y: null});
        plots.upper.push({x: null, y: null});
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(data[c][1][0]);
        plots.lower.push({...plot});
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(data[c][1][1]);
        plots.middle.push({...plot});
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(data[c][1][2]);
        plots.upper.push({...plot});
      }
      c++;
      i--;
    }
    style = {
      lineWidth: this.style.lowerLineWidth,
      strokeStyle: this.style.lowerStrokeStyle,
      lineDash: this.style.lowerLineDash
    };
    this.plot(plots.lower, "renderLine", style);
    style = {
      lineWidth: this.style.middleLineWidth,
      strokeStyle: this.style.middleStrokeStyle,
      lineDash: this.style.middleLineDash
    };
    this.plot(plots.middle, "renderLine", style);
    style = {
      lineWidth: this.style.upperLineWidth,
      strokeStyle: this.style.upperStrokeStyle,
      lineDash: this.style.upperLineDash
    };
    this.plot(plots.upper, "renderLine", style);
    this.target.viewport.render();
  }
}

class DMI extends indicator {
  name = 'Directional Movement Index'
  shortName = 'DX'
  libName = null
  definition = {
    input: {
    },
    output: {
    },
  }
  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1',
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStrokeStyle: "#848",
    lowStrokeStyle: "#848",
    highLowRangeStyle: "#22002220"
  }
  precision = 2
  scaleOverlay = true
  plots = [
    { key: 'DMI_1', title: ' ', type: 'line' },
  ]
  constructor(target, xAxis=false, yAxis=false, config, parent, params)  {
    super(target, xAxis, yAxis, config, parent, params);
    const overlay = params.overlay;
    this.ID = params.overlay?.id || uid(this.shortName);
    this.defineIndicator(overlay?.settings, DX);
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style};
    this.calcIndicatorHistory();
    this.setNewValue = (value) => { this.newValue(value); };
    this.setUpdateValue = (value) => { this.updateValue(value); };
  }
  get onChart() { return false }
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false
    const inputs = {};
    const {c, colours} = super.legendInputs(pos);
    inputs.DMI_1 = this.Scale.nicePrice(this.overlay.data[c][1]);
    return {inputs, colours}
  }
  draw(range=this.range) {
    if (this.overlay.data.length < 2 ) return false
    this.scene.clear();
    const data = this.overlay.data;
    const width = this.xAxis.candleW;
    const x2 = this.scene.width + (this.xAxis.bufferPx * 2);
    const y1 = this.yAxis.yPos(this.style.defaultHigh);
    const y2 = this.yAxis.yPos(this.style.defaultLow);
    const plots = [0, y1, this.scene.width, y2 - y1];
    let style = this.style.highLowRangeStyle;
    this.plot(plots, "renderFillRect", style);
    plots.length = 0;
    plots[0] = {x: 0, y: y1};
    plots[1] = {x: x2, y: y1};
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.highStrokeStyle,
      dash: [5, 5]
    };
    this.plot(plots, "renderLine", style);
    plots.length = 0;
    plots[0] = {x: 0, y: y2};
    plots[1] = {x: x2, y: y2};
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.lowStrokeStyle,
      dash: [5, 5]
    };
    this.plot(plots, "renderLine", style);
    plots.length = 0;
    this.Timeline.smoothScrollOffset || 0;
    const plot = {
      w: width,
    };
    let o = this.Timeline.rangeScrollOffset;
    let d = range.data.length - this.overlay.data.length;
    let c = range.indexStart - d - 2;
    let i = range.Length + (o * 2) + 2;
    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.push({x: null, y: null});
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(data[c][1]);
        plots.push({...plot});
      }
      c++;
      i--;
    }
    this.plot(plots, "renderLine", this.style);
    this.target.viewport.render();
  }
}

class EMA extends indicator {
  name = 'Exponential Moving Average'
  shortName = 'EMA'
  libName = 'EMA'
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: [],
    },
  }
  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1'
  }
  precision = 2
  checkParamCount = false
  scaleOverlay = false
  plots = [
    { key: 'EMA_1', title: 'EMA: ', type: 'line' },
  ]
  static inCnt = 0
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ]
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    EMA.inCnt++;
    const overlay = params.overlay;
    this.ID = params.overlay?.id || uid(this.shortName);
    this.defineIndicator(overlay?.settings, EMA$1);
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style};
    this.calcIndicatorHistory();
    this.setNewValue = (value) => { this.newValue(value); };
    this.setUpdateValue = (value) => { this.updateValue(value); };
    this.addLegend();
  }
  get onChart() { return true }
  updateLegend() {
    this.parent.legend.update();
  }
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false
    const inputs = {};
    const {c, colours} = super.legendInputs(pos);
    inputs.EMA_1 = this.Scale.nicePrice(this.overlay.data[c][1]);
    return {inputs, colours}
  }
  draw(range=this.range) {
    if (this.overlay.data.length < 2 ) return false
    this.scene.clear();
    const data = this.overlay.data;
    const width = this.xAxis.candleW;
    const plots = [];
    this.xAxis.smoothScrollOffset || 0;
    const plot = {
      w: width,
    };
    let o = this.Timeline.rangeScrollOffset;
    let d = range.data.length - this.overlay.data.length;
    let c = range.indexStart - d - 2;
    let i = range.Length + (o * 2) + 2;
    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.push({x: null, y: null});
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(data[c][1]);
        plots.push({...plot});
      }
      c++;
      i--;
    }
    this.plot(plots, "renderLine", this.style);
    this.target.viewport.render();
  }
}

class RSI extends indicator {
  name = 'Relative Strength Index'
  shortName = 'RSI'
  libName = 'RSI'
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: [],
    },
  }
  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1',
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStrokeStyle: "#848",
    lowStrokeStyle: "#848",
    highLowRangeStyle: "#22002220"
  }
  checkParamCount = false
  plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]
  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {
    super (target, xAxis, yAxis, config, parent, params);
    const overlay = params.overlay;
    this.ID = params.overlay?.id || uid(this.shortName);
    this.defineIndicator(overlay?.settings, RSI$1);
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style};
    this.calcIndicatorHistory();
    this.setNewValue = (value) => { this.newValue(value); };
    this.setUpdateValue = (value) => { this.updateValue(value); };
  }
  get onChart() { return false }
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false
    const inputs = {};
    const {c, colours} = super.legendInputs(pos);
    inputs.RSI_1 = this.Scale.nicePrice(this.overlay.data[c][1]);
    return {inputs, colours}
  }
  draw(range=this.range) {
    if (this.overlay.data.length < 2 ) return false
    this.scene.clear();
    const data = this.overlay.data;
    const width = this.xAxis.candleW;
    const x2 = this.scene.width + (this.xAxis.bufferPx * 2);
    const y1 = this.yAxis.yPos(this.style.defaultHigh);
    const y2 = this.yAxis.yPos(this.style.defaultLow);
    const plots = [0, y1, this.scene.width, y2 - y1];
    let style = this.style.highLowRangeStyle;
    this.plot(plots, "renderFillRect", style);
    plots.length = 0;
    plots[0] = {x: 0, y: y1};
    plots[1] = {x: x2, y: y1};
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.highStrokeStyle,
      dash: [5, 5]
    };
    this.plot(plots, "renderLine", style);
    plots.length = 0;
    plots[0] = {x: 0, y: y2};
    plots[1] = {x: x2, y: y2};
    style = {
      lineWidth: this.style.highLowLineWidth,
      strokeStyle: this.style.lowStrokeStyle,
      dash: [5, 5]
    };
    this.plot(plots, "renderLine", style);
    plots.length = 0;
    this.Timeline.smoothScrollOffset || 0;
    const plot = {
      w: width,
    };
    let o = this.Timeline.rangeScrollOffset;
    let d = range.data.length - this.overlay.data.length;
    let c = range.indexStart - d - 2;
    let i = range.Length + (o * 2) + 2;
    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.push({x: null, y: null});
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(data[c][1]);
        plots.push({...plot});
      }
      c++;
      i--;
    }
    this.plot(plots, "renderLine", this.style);
    this.target.viewport.render();
  }
}

class SMA extends indicator {
  name = 'Simple Moving Average'
  shortName = 'SMA'
  libName = 'SMA'
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: [],
    },
  }
  #defaultStyle = {
    strokeStyle: "#C80",
    lineWidth: '1'
  }
  #precision = 2
  onChart = true
  scaleOverlay = false
  plots = [
    { key: 'SMA_1', title: 'SMA: ', type: 'line' },
  ]
  static inCnt = 0
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ]
  constructor(target, xAxis=false, yAxis=false, config, parent, params) {
    super(target, xAxis, yAxis, config, parent, params);
    SMA.inCnt++;
    const overlay = params.overlay;
    this.ID = params.overlay?.id || uid(this.shortName);
    this.defineIndicator(overlay?.settings, SMA$1);
    this.style = (overlay?.settings?.style) ? {...this.#defaultStyle, ...overlay.settings.style} : {...this.#defaultStyle, ...config.style};
    this.calcIndicatorHistory();
    this.setNewValue = (value) => { this.newValue(value); };
    this.setUpdateValue = (value) => { this.updateValue(value); };
    this.addLegend();
  }
  get onChart() { return true }
  updateLegend() {
    this.parent.legend.update();
  }
  legendInputs(pos=this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return false
    const inputs = {};
    const {c, colours} = super.legendInputs(pos);
    inputs.SMA_1 = this.Scale.nicePrice(this.overlay.data[c][1]);
    return {inputs, colours}
  }
  draw(range=this.range) {
    if (this.overlay.data.length < 2 ) return false
    this.scene.clear();
    const data = this.overlay.data;
    const width = this.xAxis.candleW;
    const plots = [];
    this.xAxis.smoothScrollOffset || 0;
    const plot = {
      w: width,
    };
    let o = this.Timeline.rangeScrollOffset;
    let d = range.data.length - this.overlay.data.length;
    let c = range.indexStart - d - 2;
    let i = range.Length + (o * 2) + 2;
    while(i) {
      if (c < 0 || c >= this.overlay.data.length) {
        plots.push({x: null, y: null});
      }
      else {
        plot.x = this.xAxis.xPos(data[c][0]);
        plot.y = this.yAxis.yPos(data[c][1]);
        plots.push({...plot});
      }
      c++;
      i--;
    }
    this.plot(plots, "renderLine", this.style);
    this.target.viewport.render();
  }
}

class Volume extends indicator {
  #ID
  #name = 'Relative Strength Index'
  #shortName = 'RSI'
  #params
  #onChart = true
  #checkParamCount = false
  #scaleOverlay = true
  #plots = [
    { key: 'RSI_1', title: ' ', type: 'line' },
  ]
  #defaultStyle = {
  }
  #style = {}
  constructor (target, xAxis=false, yAxis=false, config, parent, params)  {
    super (target, xAxis, yAxis, config, parent, params);
    params.overlay;
  }
  get onChart() { return "both" }
}

var Indicators = {
  BB: {id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: BB},
  DMI: {id: "DMI", name: "Directional Movement", event: "addIndicator", ind: DMI},
  EMA: {id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: EMA},
  RSI: {id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: RSI},
  SMA: {id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: SMA},
  Vol: {id: "Vol", name: "Volume", event: "addIndicator", ind: Volume},
};

class element extends HTMLElement {
  shadowRoot
  template
  id = uid()
  doInit = true
  constructor (template, mode="open") {
    super();
    this.template = template;
    this.shadowRoot = this.attachShadow({mode: mode});
  }
  destroy() {
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = false;
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
      this.style.display = "block";
    }
  }
  disconnectedCallback() {
  }
  get width() { return this.offsetWidth }
  set width(w) { this.setDim(w, "width"); }
  get height() { return this.offsetHeight }
  set height(h) { this.setDim(h, "height"); }
  setDim(v, d) {
    if (isNumber(v)) v += "px";
    else if (!isString$1(v)) return
    this.style[d] = v;
  }
  setCursor(cursor) {
    this.style.cursor = cursor;
  }
}

class Axis {
  #core
  #parent
  #chart
  constructor(parent) {
    this.#parent = parent;
    this.#core = this.#parent.core;
    this.#chart = this.#core.Chart;
  }
  get core() { return this.#core }
  get chart() { return this.#chart }
  get parent() { return this.#parent }
  get theme() { return this.#core.theme }
  get width() { return this.#chart.width }
  get height() { return this.#chart.height }
  get data() { return this.#chart.data }
  get range() { return this.#chart.range }
  get yDigits() { return this.#chart.yAxisDigits }
  float2Int(value) { return float2Int(value) }
  numDigits(value) { return numDigits(value) }
  countDigits(value) { return countDigits(value) }
  precision(value) { return precision(value) }
}

class xAxis extends Axis {
  #xAxisTicks = 4
  #xAxisGrads
  #indexBased = true
  constructor(parent) {
    super(parent);
  }
  get range() { return this.parent.range }
  get width() { return this.parent.width }
  get interval() { return this.range.interval }
  get intervalStr() { return this.range.intervalStr }
  get timeStart() { return this.range.timeStart }
  get timeFinish() { return this.range.timeFinish }
  get rangeDuration() { return this.range.rangeDuration }
  get rangeLength() { return this.range.Length }
  get indexStart() { return this.range.indexStart }
  get indexEnd() { return this.range.indexEnd }
  get timeMax() { return this.range.timeMax }
  get timeMin() { return this.range.timeMin }
  get candleW() { return bRound(this.width / this.range.Length) }
  get candlesOnLayer() { return bRound(this.core.Chart.layerWidth / this.candleW )}
  get xAxisRatio() { return this.width / this.range.rangeDuration }
  set xAxisTicks(t) { this.#xAxisTicks = isNumber(t) ? t : 0; }
  get xAxisTicks() { return this.#xAxisTicks }
  get xAxisGrads() { return this.#xAxisGrads }
  get scrollOffsetPx() { return this.core.scrollPos % this.candleW }
  get bufferPx() { return this.core.bufferPx }
  xPos(ts) {
    return bRound((this.range.rangeIndex(ts) * this.candleW) + (this.candleW * 0.5))
  }
  t2Index(ts) {
    return this.range.rangeIndex(ts)
  }
  t2Pixel(ts) {
    return this.xPos(ts)
  }
  pixel2T(x) {
    let c = this.pixel2Index(x);
    return this.range.value(c)[0]
  }
  pixel2Index(x) {
    x -= this.candleW / 2;
    let c = this.range.indexStart;
    let o = bRound(x / this.candleW);
    return c + o
  }
  pixelOHLCV(x) {
    let c = this.pixel2Index(x);
    return this.range.value(c)
  }
  xPosSnap2CandlePos(x) {
    let r = x % this.candleW;
    let o = (r) ? this.candleW / 2 : 0;
    return bRound((x - r) + o)
  }
  xPos2Time(x) {
    return this.pixel2T(x)
  }
  xPos2Index(x) {
    return this.pixel2Index(x)
  }
  xPosOHLCV(x) {
    return this.pixelOHLCV(x)
  }
  initXAxisGrads() {
    this.#xAxisGrads = this.calcXAxisGrads();
  }
  doCalcXAxisGrads(range) {
    this.#xAxisGrads = this.calcXAxisGrads(range);
  }
  calcXAxisGrads(range=this.range.snapshot()) {
    const grads = {
      entries: {},
      values: [],
      major: [],
      minor: [],
    };
    const units = ms2TimeUnits(range.rangeDuration);
    grads.units = units;
    for (let u in units) {
      if (units[u] > 0) {
        grads.units = [u, u];
        grads.timeSpan = `${units[u]} ${u}`;
        break
      }
    }
    const tf = range.interval;
    const {xStep, rank} = this.xStep(range);
    const tLimit = this.pixel2T(this.width) + xStep;
    let t1 = range.timeMin - (range.timeMin % xStep) - xStep;
    let start = t1;
    while (t1 < tLimit) {
      let y = time_start(t1, "years");
      let m = time_start(t1, "months");
      let d = time_start(t1, "days");
      if (!(y in grads.entries) && y >= start) {
        grads.entries[y] = [this.dateTimeValue(y, tf), this.t2Pixel(y), y, "major"];
      }
      else if (!(m in grads.entries) && m >= start) {
        grads.entries[m] = [this.dateTimeValue(m, tf), this.t2Pixel(m), m, "major"];
      }
      else if (!(d in grads.entries) && d >= start) {
        grads.entries[d] = [this.dateTimeValue(d, tf), this.t2Pixel(d), d, "major"];
      }
        grads.entries[t1] = [this.dateTimeValue(t1, tf), this.t2Pixel(t1), t1, "minor"];
      t1 += xStep;
    }
    grads.values = Object.values(grads.entries);
    return grads
  }
  xStep(range) {
    let minStep = XAXIS_STEP;
    let interval = this.#indexBased ? range.interval : 1;
    let xStep = TIMESCALES[0];
    let candleW = bRound(this.width / range.Length);
    let rank = TIMESCALESRANK[0];
    let i = TIMESCALES.indexOf(interval);
    while (i-- >= 0) {
      const gradPixels = candleW * (TIMESCALES[i] / interval);
      if (gradPixels >= minStep) break
    }
    xStep = TIMESCALES[i];
    rank = TIMESCALESRANK[i];
    return {xStep, rank}
  }
  dateTimeValue(ts, tf) {
    if ((ts / DAY_MS) % 1 === 0) {
      const date = get_day(ts);
      if (date === 1) {
        let month = get_month(ts);
        if (month === 0) return get_year(ts)
        else return get_monthName(ts)
      }
      else return date
    }
    else {
      if (tf < MINUTE_MS) return MS(ts)
      else if (tf < HOUR_MS) return MS(ts)
      else return HM(ts)
    }
  }
  gradsWorker() {
  }
}

const status = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class Point {
  x = 0;
  y = 0;
  constructor() {
    if (arguments.length === 1) {
      const { x, y } = arguments[0];
      this.x = x;
      this.y = y;
    } else if (arguments.length > 1) {
      const [x, y] = arguments;
      this.x = x;
      this.y = y;
    }
  }
  clone() {
    return new Point(this.x, this.y);
  }
}

const keyboard = [
  "keypress",
  "keydown",
  "keyup"
];
const pointer = [
  "pointerdown",
  "pointerup",
  "pointerover", "pointerenter",
  "pointerout", "pointerleave",
  "pointermove",
  "pointercancel",
  "gotpointercapture",
  "lostpointercapture",
  "dblclick",
  "click",
  "wheel",
  "contextmenu"
];
const mouse = [
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "mousewheel",
];
const touch = [
  "touchcancel",
  "touchend",
  "touchmove",
  "touchstart"
];
const pen = [
];
const misc = [
];
const custom = [
  "pointerdrag",
  "pointerdragend"
];
class EventsAgent {
  constructor (input) {
    this.input = input;
    this.element = input.element;
    if (window.PointerEvent) {
      this.type = [...keyboard, ...pointer, ...mouse, ...touch, ...pen, ...misc, ...custom];
    } else {
      this.type = [...keyboard, ...mouse, ...touch, ...pen, ...misc, ...custom];
    }
    this.clientPosPrev = new Point([null, null]);
    this.position = new Point();
    this.movement = new Point([0, 0]);
    this.dragstart = new Point([null, null]);
    this.dragend = new Point([null, null]);
    this.dragCheckThreshold = 3;
    this.dragStatus = false;
    this.wheeldelta = 0;
    this.pointerButtons = [false, false, false, false, false];
    this.pointerdrag = new Event("pointerdrag");
    this.pointerdragend = new Event("pointerdragend");
  }
  has (event) {
    if (this.type.indexOf(event) == -1) return false
    else return true
  }
  addListener (event, handler, options) {
    let cb = handler;
    if (!this.has(event) ||
        !isFunction(handler) ||
        !DOM.isElement(this.element)
    ) return false
    if (pointer.indexOf(event) !== -1) {
      switch (event) {
        case "pointerdown":
            cb = function (e) {
              this.onPointerDown(e);
              handler(this.createPointerEventArgument(e));
            };
            break;
        case "pointerup":
          cb = function (e) {
            this.onPointerUp(e);
            handler(this.createPointerEventArgument(e));
          };
          break;
        case "pointermove":
          cb = function (e) {
            this.motion(e);
            handler(this.createPointerEventArgument(e));
          };
          break;
        case "click":
        case "dbclick":
        case "pointerenter":
        case "pointerleave":
        case "pointerout":
        case "pointerover":
        case "contextmenu":
          cb = function (e) {
            this.location(e);
            handler(this.createPointerEventArgument(e));
          };
          break;
        case "wheel":
          cb = function (e) {
            this.wheeldelta = e.wheelDelta;
            handler(this.createPointerEventArgument(e));
          };
          break;
        case "pointercancel":
        case "gotpointercapture":
        case "lostpointercapture":
        default :
          cb = function (e) {
            handler(e);
          };
          break;
      }
      this.element.addEventListener(event, cb.bind(this), options);
      return cb
    }
    else if (custom.indexOf(event) == -1)
      this.element.addEventListener(event, handler, options);
    else {
      switch (event) {
        case "pointerdrag":
          this.initPointerDrag(handler, options);
          break;
        case "pointerdragend":
          cb = function (e) {
            this.motion(e);
            handler(this.createPointerEventArgument(e));
          };
          this.element.addEventListener(event, cb.bind(this), options);
          break;
      }
    }
    return true
  }
  removerListener (event, handler, element, options) {
    if (!this.has(event) ||
        !isFunction(handler) ||
        !DOM.isElement(element)
    ) return false
    if (event == "pointerdrag") {
      e.target.removeEventListener("pointermove", this.onPointerDrag);
      e.target.removeEventListener("pointerdown", this.onPointerDown);
      e.target.removeEventListener("gotpointercapture", this.onPointerDrag);
      e.target.removeEventListener("lostpointercapture", this.onPointerDragEnd);
      document.removeEventListener("pointerup", this.onPointerDragEnd);
    }
    element.removeEventListener(event, handler, options);
    return true
  }
  initPointerDrag (handler, options) {
    if (!this.draginit) {
      this.draginit = true;
      this.element.addEventListener("pointerdown", this.onPointerDown.bind(this), options);
      this.element.addEventListener("gotpointercapture", this.onPointerCapture.bind(this), options);
      this.element.addEventListener("lostpointercapture", this.onPointerDragEnd.bind(this), options);
      this.element.addEventListener("pointermove", this.onPointerMove.bind(this), options);
    }
    let cb = function (e) {
      e = this.createPointerEventArgument(e);
      handler(e);
    };
    this.dragStatus = "ready";
    this.element.addEventListener("pointerdrag", cb.bind(this), options);
  }
  onPointerDown (e) {
    this.location(e);
    this.pointerButtons[e.button] = true;
    if (this.dragStatus == "ready") e.target.setPointerCapture(e.pointerId);
  }
  onPointerUp (e) {
    this.location(e);
    this.pointerButtons[e.button] = false;
  }
  onPointerMove (e) {
    if (this.dragStatus == "dragging") {
      this.motion(e);
      this.dragend = this.position.clone();
      e.target.dispatchEvent(this.pointerdrag);
    }
  }
  onPointerCapture (e) {
    this.dragstart = this.position.clone();
    this.dragend = this.position.clone();
    this.dragStatus = "dragging";
  }
  onPointerDragEnd (e) {
    if (this.dragStatus == "dragging") {
      this.dragStatus = "ready";
      e.target.dispatchEvent(this.pointerdragend);
    }
  }
  createPointerEventArgument(e) {
    return {
      isProcessed: false,
      pointerType: e.pointerType,
      position: this.position.clone(),
      movement: this.movement.clone(),
      dragstart: this.dragstart.clone(),
      dragend: this.dragend.clone(),
      wheeldelta: this.wheeldelta,
      buttons: this.pointerButtons,
      domEvent: e,
      timeStamp: Date.now()
    }
  }
  isButtonPressed(button) {
    return (this.pointerButtons.indexOf(button) !== -1) ? true : false
  }
  setCursor(type) {
		this.element.style.cursor = type;
	}
  motion(e) {
    const clientX = e.clientX || this.position.x;
    const clientY = e.clientY || this.position.y;
    this.movement.x = clientX - this.clientPosPrev.x;
    this.movement.y = clientY - this.clientPosPrev.y;
    this.position.x += this.movement.x;
    this.position.y += this.movement.y;
    this.clientPosPrev.x = clientX;
    this.clientPosPrev.y = clientY;
  }
  location(e) {
    const clientRect = e.target.getBoundingClientRect();
    this.clientPosPrev.x = e.clientX;
    this.clientPosPrev.y = e.clientY;
    this.position.x = e.clientX - clientRect.left;
    this.position.y = e.clientY - clientRect.top;
    this.movement.x = 0;
    this.movement.y = 0;
  }
  createKeyEventArgument(e) {
    return e
  }
}

const defaultOptions$1 = {
  element: undefined,
  contextMenu: true
};
class Input  {
  constructor (element, options) {
    this.options = { ...defaultOptions$1, ...options };
    this.status = status.idle;
    this.element = element;
    if (!this.element && this.options.elementId) {
      this.element = document.getElementById(this.options.elementId);
    }
    if (!this.element) {
      throw "Must specify an element to receive user input.";
    }
    this.eventsAgent = new EventsAgent(this);
    if (!this.options.contextMenu) {
      window.oncontextmenu = (e) => {
        e.preventDefault();
        return false;
      };
    }
  }
  on (event, handler, options) {
    return this.eventsAgent.addListener(event, handler, options)
  }
  off (event, handler, options) {
    return this.eventsAgent.removeListener(event, handler, options)
  }
  invoke (agent, eventName, args) {
    this.currentAgent = agent;
    this.eventsAgent.invoke(eventName, this.createEventArgument(args));
  }
  createEventArgument (args) {
    const arg = args || {};
    arg.isButtonPressed = button => this.isButtonPressed(button);
    arg.isKeyPressed = key => this.isKeyPressed(key);
    arg.controller = this;
    return arg;
  }
  isButtonPressed (button) {
    return this.eventsAgent.isButtonPressed(button);
  }
  isKeyPressed (key) {
    return this.eventsAgent.isKeyPressed(key);
  }
  setCursor (type) {
    this.eventsAgent.setCursor(type);
  }
}

var stateMachineConfig$6 = {
  id: "time",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        resize: {
          target: 'resize',
          action (data) {
          },
        },
        xAxis_scale: {
          target: 'scale',
          action (data) {
          },
        },
        xAxis_inc: {
          target: 'incremental',
          action (data) {
          },
        },
        xAxis_log: {
          target: 'logarithmic',
          action (data) {
          },
        },
        xAxis_100: {
          target: 'percentual',
          action (data) {
          },
        },
        chart_pan: {
          target: 'chart_pan',
          action (data) {
          },
        },
      }
    },
    resize: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        someEvent: {
          target: '',
          action (data) {
          },
        },
      }
    },
    chart_pan: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
          },
        },
      }
    },
  },
};

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
typeof process !== 'undefined'
  && process.versions != null
  && process.versions.node != null;

const isHex  = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const isHSL  = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/;
const isHSLA = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
const isRGB  = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/;
const isRGBA = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class Colour {
  #value = {
    r: null,
    g: null,
    b: null,
    a: null,
    h: null,
    s: null,
    l: null,
    v: null,
    r16: null,
    g16: null,
    b16: null,
    a16: null,
    hex: null,
    hsl: null,
    hsla: null,
    rgb: null,
    rgba: null,
    isValid: false
  }
  constructor (colour) {
    this.#validate(colour);
    if (isHex.test(colour)) this.#valueIsHex(colour);
    if (isHSL.test(colour)) this.#valueIsHSL(colour);
    if (isHSLA.test(colour)) this.#valueIsHSLA(colour);
    if (isRGB.test(colour)) this.#valueIsRGB(colour);
    if (isRGBA.test(colour)) this.#valueIsRGBA(colour);
  }
  get value() { return this.#value }
  get isValid() { return this.#value.isValid }
  get hex() { return this.#value.hex.slice(0, -2) }
  get hexa() { return this.#value.hex }
  #validate(colour) {
    if (isBrowser) {
      let el = document.getElementById('divValidColourTest');
      if (!el) {
        el = document.createElement('div');
        el.id = 'divValidColourTest';
      }
      el.style.backgroundColor = "";
      el.style.backgroundColor = colour;
      this.#value.isValid = (el.style.backgroundColor.length) ? true : false;
    }
    else {
      this.#value.isValid = (
        isHex.test(colour) ||
        isHSL.test(colour) ||
        isHSLA.test(colour) ||
        isRGB.test(colour) ||
        isRGBA.test(colour)
      ) ? true : false;
    }
  }
  setHex(hex) {
    let val = this.#value;
    ([
      val.r16,
      val.g16,
      val.b16,
      val.a16
    ] = hex);
    val.hex = "#" + val.r16 +val.g16 + val.b16 + val.a16;
  }
  setRGBA(rgba) {
    let val = this.#value;
    ([
      val.r,
      val.g,
      val.b,
      val.a
    ] = rgba);
    val.rgb = `rgb(${rgba[0]},${rgba[1]},${rgba[2]})`;
    val.rgba = `rgb(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`;
  }
  setHSLA(hsla) {
    let val = this.#value;
    ([
      val.h,
      val.s,
      val.l,
      val.a
    ] = hsla);
    val.hsl = `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%)`;
    val.hsla = `hsl(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
  }
  #valueIsHex(hex) {
    this.#value.hex = hex;
    let l = hex.length,
        rgba;
    switch (l) {
      case 4 :
        rgba = [`${hex[1]}${hex[1]}`, `${hex[2]}${hex[2]}`, `${hex[3]}${hex[3]}`, "ff"];
        break;
      case 7 :
        rgba = [hex.substr(1,2), hex.substr(3,2), hex.substr(5,2), "ff"];
        break;
      case 9 :
        rgba = [hex.substr(1,2), hex.substr(3,2), hex.substr(5,2), hex.substr(7,2)];
        break
    }
    this.setHex(rgba);
    this.#hexToRGB(rgba);
    this.#hexToHSL(rgba);
  }
  #valueIsHSL(hsl) {
    this.#value.hsl = hsl;
  }
  #valueIsHSLA(hsla) {
    this.#value.hsla = hsla;
  }
  #valueIsRGB(rgb) {
    this.#value.rgb = rgb;
    this.#RGBAToHex(rgba);
  }
  #valueIsRGBA(rgba) {
    this.#value.rgba = rgba;
    this.#RGBAToHex(rgba);
  }
  #RGBToHex (rgb) {
    let {r,g,b,a} = this.#getRGB(rgb);
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;
    this.value.r = r;
    this.value.g = g;
    this.value.b = b;
    this.value.a = a;
    this.setHex([r,g,b,a]);
    return this
  }
  #RGBToHSL (rgb) {
    let {r,g,b,a} = this.#getRGB(rgb);
    r = parseInt(r, 16) / 255;
    g = parseInt(g, 16) / 255;
    b = parseInt(b, 16) / 255;
    a = parseInt(a, 16) / 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    let hsla = [
      (60 * h < 0 ? 60 * h + 360 : 60 * h).toString(),
      (100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)).toString(),
      ((100 * (2 * l - s)) / 2).toString(),
      (a).toString()
    ];
    this.setHSLA(hsla);
    return this
  }
  #HSLToRGB (h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  };
  #hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  #hexToRGB(hex) {
    if (isString$1(hex)) hex = /([a-f\d]{2})/ig.exec(hex);
    var rgba = [
        parseInt(hex[0], 16),
        parseInt(hex[1], 16),
        parseInt(hex[2], 16),
        parseInt(hex[3], 16) / 255
    ];
    this.setRGBA(rgba);
  }
  #hexToHSL(hex) {
    if (isString$1(hex)) hex = /([a-f\d]{2})/ig.exec(hex);
    let r = parseInt(hex[0], 16);
    let g = parseInt(hex[1], 16);
    let b = parseInt(hex[2], 16);
    let a = parseInt(hex[3], 16);
    r /= 255, g /= 255, b /= 255, a /= 255;
    this.setHSLA([r,g,b,a]);
  }
  #getRGB (rgb) {
    let r,g,b,a;
    let v = this.#value;
    if (v.r && v.g && v.b && v.a) return {r, g, b, a} = {...v}
    if (isString$1(rgb)) {
      let sep = rgb.indexOf(",") > -1 ? "," : " ";
      rgb = rgb.substr(4).split(")")[0].split(sep);
    }
    if (isArray(rgb)) {
      if (rgb.length < 3 || rgb.length > 4) return false
      r = rgb[0];
      g = rgb[1];
      b = rgb[2];
      a = (isString$1(rgb[3])) ? rgb[3] : "";
    }
    else if (isObject(rgb)) {
      r = rgb.r;
      g = rgb.g;
      b = rgb.b;
      a = ("a" in rgb) ? rgb.a : "";
    }
    else return false
    return {r, g, b, a}
  }
  #RGBAToHex (rgba) {
    let x, isPercent,
      i = 0,
      y = [],
      z = [],
      rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
      rgb.shift();
      for (let v of rgb) {
        isPercent = v.indexOf("%") > -1;
        x = parseFloat(v);
        if (i < 3 && isPercent) {
          x = Math.round(255 * x / 100);
        }
        else if (i == 3) {
          if (!isPercent && x >= 0 && x <= 1) {
            x = Math.round(255 * x);
          } else if (isPercent && x >= 0 && x <= 100) {
            x = Math.round(255 * x / 100);
          } else {
            x = "";
          }
        }
        y[i] = (x | 1 << 8).toString(16).slice(1);
        z[i++] = x;
      }
      this.setHex(y);
      this.setRGBA(z);
      this.#hexToHSL(this.#value.hex);
  }
}

class Slider {
  static #cnt
  #id
  #core
  #elContainer
  #elHandle
  #containerDims = {w: 0, h: 0}
  #handleDims = {w: 0, h: 0, x: 0, y: 0}
  #constraint = {x: false, y: true}
  #cursorPos
  #sliderPos = {x: 0, drag: false}
  #input
  #callback
  constructor(config) {
    this.#id = Slider.#cnt++;
    this.#core = config.core;
    this.#elContainer = (DOM.isElement(config.elContainer)) ? config.elContainer : false;
    this.#elHandle = (DOM.isElement(config.elHandle)) ? config.elHandle : false;
    this.#callback = (isFunction(config.callback)) ? config.callback : false;
    if (DOM.isElement(this.#elContainer) && DOM.isElement(this.#elHandle)) {
      this.mount();
      this.eventsListen();
    }
  }
  eventsListen() {
  this.#input = new Input(this.#elHandle, {disableContextMenu: false});
  this.#input.on("mouseenter", debounce(this.onMouseEnter, 1, this, true));
  this.#input.on("mouseout", debounce(this.onMouseOut, 1, this, true));
  this.#input.on("drag", throttle(this.onHandleDrag, 100, this));
  this.#input.on("enddrag", this.onHandleDragDone.bind(this));
  this.#input.on("mousedown", debounce(this.onMouseDown, 100, this, true));
  this.#input.on("mouseup", this.onMouseUp.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMouseEnter() {
    const backgroundColor = getComputedStyle(this.#elHandle).backgroundColor;
    if (backgroundColor) {
      this.colour = new Colour(backgroundColor);
      this.#elHandle.style.backgroundColor = this.colour.hex;
    }
  }
  onMouseOut() {
    this.#elHandle.style.backgroundColor = this.colour.hexa;
  }
  onMouseDown() {
  }
  onMouseUp(e) {
    this.onHandleDragDone(e);
  }
  onHandleDrag(e) {
    if (!this.#sliderPos.drag) {
      this.#sliderPos.drag = true;
      this.#sliderPos.x = e.position.x;
    }
    this.handlePos(e);
  }
  onHandleDragDone(e) {
    this.handlePos(e);
    this.#sliderPos.drag = false;
  }
  mount() {
    this.#containerDims.w = this.#elContainer.getBoundingClientRect().width;
    this.#containerDims.h = this.#elContainer.getBoundingClientRect().height;
    this.#elContainer.style.overflow = "hidden";
    this.#handleDims.w = this.#elHandle.getBoundingClientRect().width;
    this.#handleDims.h = this.#elHandle.getBoundingClientRect().height;
    this.#elHandle.style.marginRight = 0;
    this.#elHandle.style.position = "absolute";
  }
  handlePos(e) {
    let R = this.#core.range;
    let x = parseInt(this.#elHandle.style.marginLeft);
    let w = this.#elContainer.getBoundingClientRect().width;
    let h = this.#elHandle.getBoundingClientRect().width;
    let m = w - h;
    let d = e.position.x - this.#sliderPos.x;
    let p = limit(x + d, 0, m);
    let r = (R.dataLength + R.limitFuture + R.limitPast) / w;
    let s = Math.floor(p * r);
    this.setHandleDims(p, h);
    this.#core.jumpToIndex(s);
  }
  setHandleDims(p, w) {
    let c = this.#elContainer.getBoundingClientRect().width;
        w = w || this.#elHandle.getBoundingClientRect().width;
    p = p / c * 100;
    this.#elHandle.style.marginLeft = `${p}%`;
    w  = w / c * 100;
    this.#elHandle.style.width = `${w}%`;
  }
  setCursor(cursor) {
    this.#elHandle.style.cursor = cursor;
  }
}

class Node$1 {
    constructor(cfg={}) {
      this.container = cfg.container;
      this.layers = [];
      this.id = CEL.idCnt++;
      this.scene = new CEL.Scene();
      this.setSize(cfg.width || 0, cfg.height || 0);
    }
    setSize(width, height) {
      this.width = width;
      this.height = height;
      this.scene.setSize(width, height);
      this.layers.forEach(function (layer) {
        layer.setSize(width, height);
      });
      return this;
    }
    addLayer(layer) {
      this.layers.push(layer);
      layer.setSize(layer.width || this.width, layer.height || this.height);
      layer.viewport = this;
      return this;
    }
    getIntersection(x, y) {
      var layers = this.layers,
        len = layers.length,
        n = len - 1,
        layer,
        key;
      while (n >= 0) {
        layer = layers[n];
        key = layer.hit.getIntersection(x, y);
        if (key >= 0) {
          return key;
        }
        n--;
      }
      return -1;
    }
    get index() {
      let viewports = CEL.viewports,
        viewport,
        n = 0;
      for (viewport of viewports) {
        if (this.id === viewport.id) return n;
        n++;
      }
      return null;
    }
    destroy() {
      for (let layer of this.layers) {
        layer.remove();
      }
    }
    render(all=false) {
      let scene = this.scene,
        layers = this.layers,
        layer;
      scene.clear();
      for (layer of layers) {
        if (all && layer.layers.length > 0) layer.render(all);
        if (layer.visible && layer.width > 0 && layer.height > 0)
          scene.context.drawImage(
            layer.scene.canvas,
            layer.x,
            layer.y,
            layer.width,
            layer.height
          );
      }
    }
  }
class Viewport extends Node$1 {
  constructor(cfg={}) {
    super(cfg);
    cfg.container.innerHTML = "";
    cfg.container.appendChild(this.scene.canvas);
    CEL.viewports.push(this);
  }
  destroy() {
    super.destroy();
    this.container.innerHTML = "";
    CEL.viewports.splice(this.index, 1);
  }
}
class Layer {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  visible = true;
  constructor(cfg={}) {
    this.id = CEL.idCnt++;
    this.hit = new CEL.Hit({
      contextType: cfg.contextType,
    });
    this.scene = new CEL.Scene({
      contextType: cfg.contextType,
    });
    if (cfg.x && cfg.y) {
      this.setPosition(cfg.x, cfg.y);
    }
    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }
  get index() {
    let layers = this.viewport.layers;
      layers.length;
      let n = 0,
      layer;
    for (layer of layers) {
      if (this.id === layer.id) return n;
      n++;
    }
    return null;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.scene.setSize(width, height);
    this.hit.setSize(width, height);
    return this;
  }
  move(pos) {
    let index = this.index,
      viewport = this.viewport,
      layers = viewport.layers;
    switch (pos) {
      case "up":
    if (index < layers.length - 1) {
      layers[index] = layers[index + 1];
      layers[index + 1] = this;
    }
        break;
      case "down":
        if (index > 0) {
          layers[index] = layers[index - 1];
          layers[index - 1] = this;
        }
        break;
      case "top":
        layers.splice(index, 1);
        layers.push(this);
        break;
      case "bottom":
        layers.splice(index, 1);
        layers.unshift(this);
        break;
    }
    return this;
  }
  moveUp() {
    return this.move("up")
  }
  moveDown() {
    return this.move("down")
  }
  moveTop() {
    return this.move("top")
  }
  moveBottom() {
    return this.move("bottom")
  }
  remove() {
    this.viewport.layers.splice(this.index, 1);
  }
}
class Scene {
  width = 0;
  height = 0;
  constructor(cfg) {
    if (!cfg) cfg = {};
    this.id = CEL.idCnt++;
    this.contextType = cfg.contextType || "2d";
    this.canvas = document.createElement("canvas");
    this.canvas.className = "scene-canvas";
    this.canvas.style.display = "block";
    this.context = this.canvas.getContext(this.contextType);
    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width * CEL.pixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.height = height * CEL.pixelRatio;
    this.canvas.style.height = `${height}px`;
    if (this.contextType === "2d" && CEL.pixelRatio !== 1) {
      this.context.scale(CEL.pixelRatio, CEL.pixelRatio);
    }
    return this;
  }
  clear() {
    let context = this.context;
    if (this.contextType === "2d") {
      context.clearRect(
        0,
        0,
        this.width * CEL.pixelRatio,
        this.height * CEL.pixelRatio
      );
    }
    else {
      context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    }
    return this;
  }
  toImage(type = "image/png", quality, cb) {
    let that = this,
      imageObj = new Image(),
      dataURL = this.canvas.toDataURL(type, quality);
    imageObj.onload = function () {
      imageObj.width = that.width;
      imageObj.height = that.height;
      cb(imageObj);
    };
    imageObj.src = dataURL;
  }
  export(cfg, cb, type = "image/png", quality) {
    if (typeof cb !== "function") cb = this.blobCallback.bind({ cfg: cfg });
    this.canvas.toBlob(cb, type, quality);
  }
  blobCallback(blob) {
    let anchor = document.createElement("a"),
      dataUrl = URL.createObjectURL(blob),
      fileName = this.cfg.fileName || "canvas.png";
    anchor.setAttribute("href", dataUrl);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("export", fileName);
    if (document.createEvent) {
      Object.assign(document.createElement("a"), {
        href: dataUrl,
        target: "_blank",
        export: fileName,
      }).click();
    } else if (anchor.click) {
      anchor.click();
    }
  }
}
class Hit {
  width = 0;
  height = 0;
  constructor(cfg) {
    if (!cfg) cfg = {};
    this.contextType = cfg.contextType || "2d";
    this.canvas = document.createElement("canvas");
    this.canvas.className = "hit-canvas";
    this.canvas.style.display = "none";
    this.canvas.style.position = "relative";
    this.context = this.canvas.getContext(this.contextType, {
      preserveDrawingBuffer: true,
      antialias: false,
    });
    if (cfg.width && cfg.height) {
      this.setSize(cfg.width, cfg.height);
    }
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width * CEL.pixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.height = height * CEL.pixelRatio;
    this.canvas.style.height = `${height}px`;
    return this;
  }
  clear() {
    let context = this.context;
    if (this.contextType === "2d") {
      context.clearRect(
        0,
        0,
        this.width * CEL.pixelRatio,
        this.height * CEL.pixelRatio
      );
    }
    else {
      context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    }
    return this;
  }
  getIntersection(x, y) {
    let context = this.context,
      data;
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0 || y < 0 || x > this.width || y > this.height) {
      return -1;
    }
    if (this.contextType === "2d") {
      data = context.getImageData(x, y, 1, 1).data;
      if (data[3] < 255) {
        return -1;
      }
    }
    else {
      data = new Uint8Array(4);
      context.readPixels(
        x * CEL.pixelRatio,
        (this.height - y - 1) * CEL.pixelRatio,
        1,
        1,
        context.RGBA,
        context.UNSIGNED_BYTE,
        data
      );
      if (data[0] === 255 && data[1] === 255 && data[2] === 255) {
        return -1;
      }
    }
    return this.rgbToInt(data);
  }
  getColorFromIndex(index) {
    let rgb = this.intToRGB(index);
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  }
  rgbToInt(rgb) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    return (r << 16) + (g << 8) + b;
  }
  intToRGB(number) {
    let r = (number & 0xff0000) >> 16;
    let g = (number & 0x00ff00) >> 8;
    let b = number & 0x0000ff;
    return [r, g, b];
  }
}
const CEL = {
  idCnt: 0,
  viewports: [],
  pixelRatio: (window && window.devicePixelRatio) || 1,
  Node: Node$1,
  Viewport: Viewport,
  Layer: Layer,
  Scene: Scene,
  Hit: Hit,
};

class Overlays {
  #core
  #config
  #parent
  #list
  #elOverlays
  constructor (parent, list=[]) {
    this.#parent = parent;
    this.#core = parent.core;
    this.#list = new Map([...list]);
    for (const [key, overlay] of this.#list) {
      this.addOverlay(key, overlay);
    }
  }
  log(l) { this.#core.log(l); }
  info(i) { this.#core.info(i); }
  warning(w) { this.#core.warn(w); }
  error(e) { this.#core.error(e); }
  get core() { return this.#core }
  get parent() { return this.#parent }
  get layerConfig() { return this.#parent.layerConfig().layerConfig }
  get list() { return this.#list }
  get scale() { return this.#parent.parent.scale }
  get time() { return this.#parent.parent.time }
  start() {
    this.eventsListen();
  }
  end() {
  }
  eventsListen() {
    this.#parent.on("resize", (dimensions) => this.onResize.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  get(overlay) {
    return this.#list.get(overlay)
  }
  addOverlays(overlays) {
    let r = [];
    let s;
    for (let o of overlays) {
      s = this.addOverlay(o[0], o[1]);
      r.push([o[0]], s);
    }
    return r
  }
  addOverlay(key, overlay) {
    try {
      const layer = new CEL.Layer(this.layerConfig);
      this.parent.viewport.addLayer(layer);
      overlay.layer = layer;
      overlay.instance = new overlay.class(
        layer,
        this.#parent.TimeLine,
        this.#parent.Scale,
        this.#core.theme,
        this,
        overlay.params
      );
      this.#list.set(key, overlay);
      return true
    }
    catch (e) {
      console.error(`Error: Cannot instantiate ${key} overlay / indicator`);
      console.error(e);
      return false
    }
  }
}

class chartGrid extends Overlay{
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    this.params.axes = params?.axes || "both";
  }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  draw(axes) {
    axes = axes || this.params.axes;
    this.scene.clear();
    if (axes == "none") return
    const ctx = this.scene.context;
    ctx.save();
    ctx.strokeStyle = this.core.theme.chart.GridColour || GridStyle.COLOUR_GRID;
    if (axes != "y") {
      const offset = 0;
      const xGrads = this.xAxis.xAxisGrads.values;
      for (let tick of xGrads) {
        let x = bRound(tick[1]);
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, this.scene.height);
        ctx.stroke();
      }
    }
    if (axes != "x") {
      const yGrads = this.yAxis.yAxisGrads;
      for (let tick of yGrads) {
        let y = this.yAxis.$2Pixel(tick[0]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.scene.width, y);
        ctx.stroke();
      }
    }
    ctx.restore();
    this.doDraw = false;
  }
  drawX() {
    this.draw("x");
    return
  }
}

class chartCursor extends Overlay{
  #cursorPos = [0,0]
  #update = true
  #input
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    super(target, xAxis=false, yAxis=false, theme, parent, params);
    this.core.on("chart_pan", (e) => { this.onMouseDragX(e); });
    this.core.on("chart_panDone", (e) => { this.onMouseDragX(e); });
    this.core.on("main_mousemove", (e) => { this.onMouseMoveX(e); });
    this.#input = new Input(this.target.viewport.container, {disableContextMenu: false});
    this.#input.on("pointermove", this.onMouseMove.bind(this));
    this.#input.on("pointerenter", this.onMouseMove.bind(this));
  }
  set position(p) { return }
  get update() { return this.#update }
  onMouseDragX(e) {
    this.#cursorPos[0] = e[0];
    this.#cursorPos[1] = e[1];
    this.draw(true);
    this.core.emit("chart_render");
  }
  onMouseMoveX(e) {
    this.#cursorPos[0] = e[0];
    this.draw();
    this.core.emit("chart_render");
  }
  onMouseMove(e) {
    const x = (isObject(e)) ? e.position.x : e[0];
    const y = (isObject(e)) ? e.position.y : e[1];
    this.#cursorPos[0] = x;
    this.#cursorPos[1] = y;
    this.draw();
    this.core.emit("chart_render");
  }
  draw(drag = false) {
    let x = this.#cursorPos[0];
    if (!drag)
        x = this.xAxis.xPosSnap2CandlePos(x) + this.xAxis.scrollOffsetPx;
    let y = this.#cursorPos[1];
    this.scene.clear();
    const ctx = this.scene.context;
    ctx.save();
    ctx.setLineDash([5, 5]);
    const offset = this.xAxis.smoothScrollOffset || 0;
    ctx.strokeStyle = "#666";
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset, this.scene.height);
    ctx.stroke();
    if (this.chart.cursorActive) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.scene.width, y);
      ctx.stroke();
    }
    ctx.restore();
  }
}

const defaultOverlays$5 = [
  ["grid", {class: chartGrid, fixed: true}],
  ["cursor", {class: chartCursor, fixed: true}]
];
class graph {
  #core
  #config
  #theme
  #parent
  #viewport
  #overlays
  #elparent
  #elCanvas
  #elViewport
  #layerWidth
  constructor(parent, elViewport, overlays, node=false) {
    this.#parent = parent;
    this.#core = parent.core;
    this.#config = this.core.config;
    this.#theme = this.core.theme;
    this.#elparent = this.#parent.element;
    this.#elViewport = elViewport;
    this.createViewport(overlays, node);
  }
  get parent() { return this.#parent }
  get core() { return this.#core }
  get config() { return this.#config }
  set width(w) { this.setWidth(w); }
  get width() { return this.#elparent.getBoundingClientRect().width }
  set height(h) { this.setHeight(h); }
  get height() { return this.#elparent.getBoundingClientRect().height }
  get dimensions() { return DOM.elementDimPos(this.#elparent) }
  set layerWidth(w) { this.#layerWidth = w; }
  get layerWidth() { return this.#layerWidth }
  get stateMachine() { return this.#parent.stateMachine }
  set state(s) { this.#core.setState(s); }
  get state() { return this.#core.getState() }
  get data() { return this.#core.chartData }
  get range() { return this.#core.range }
  get stream() { return this.#core.stream }
  get TimeLine() { return this.#core.TimeLine }
  get xAxis() { return this.#core.TimeLine.xAxis }
  get Scale() { return this.#parent.Scale }
  get yAxis() { return this.#parent.Scale.yAxis }
  get viewport() { return this.#viewport }
  get overlays() { return this.#overlays }
  destroy() {
    let oList = this.#overlays.list;
    for (let [key, overlay] of oList) {
      overlay.instance = null;
    }
    oList = null;
    this.#viewport.destroy();
  }
  setSize(w, h, lw) {
    const oList = this.#overlays.list;
    this.#viewport.setSize(w, h);
    for (let [key, overlay] of oList) {
      overlay.layer.setSize(lw, h);
    }
  }
  createViewport(overlays=[], node=false) {
    overlays = (overlays.length == 0) ? copyDeep(defaultOverlays$5) : overlays;
    const {width, height} = this.layerConfig();
    let viewport = (node) ? CEL.Node : CEL.Viewport;
    this.#viewport = new viewport({
      width: width,
      height: height,
      container: this.#elViewport
    });
    this.#elCanvas = this.#viewport.scene.canvas;
    this.#overlays = new Overlays(this, overlays);
  }
  layerConfig() {
    const buffer = this.config?.buffer || BUFFERSIZE$1;
    const width = this.#elViewport.getBoundingClientRect().width;
    const height = this.#elViewport.getBoundingClientRect().height;
    this.layerWidth = Math.round(width * ((100 + buffer) * 0.01));
    const layerConfig = {
      width: this.layerWidth,
      height: height
    };
    return {width, height, layerConfig}
  }
  addOverlays(o) {
    return this.#overlays.addOverlays(o)
  }
  addOverlay(key, overlay) {
    return this.#overlays.addOverlay(key, overlay)
  }
  draw(range=this.range, update=false) {
    const oList = this.#overlays.list;
    for (let [key, overlay] of oList) {
      if (this.#core.scrollPos == this.#core.bufferPx * -1 ||
          this.#core.scrollPos == 0 ||
          update == true)
      {
        overlay.instance.draw();
      }
      else if (this.#parent.streamCandle) {
        oList.get("stream").instance.draw();
      }
      if (!overlay.fixed)
        overlay.instance.position = [this.#core.scrollPos, 0];
    }
  }
  render() {
    this.#viewport.render();
  }
}

class TimeLabels extends Overlay {
  #cursorPos = [0,0]
  #xAxisGrads
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    xAxis = parent.time.xAxis;
    super(target, xAxis, yAxis, theme, parent);
  }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  draw(range) {
    this.scene.clear();
    const ctx = this.scene.context;
    const grads = this.xAxis.xAxisGrads.values;
    const offset = 0;
    const theme = this.theme.xAxis;
    ctx.save();
    ctx.strokeStyle = theme.colourTick;
    ctx.fillStyle = theme.colourTick;
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`;
    for (let tick of grads) {
      let x = bRound(tick[1]);
      let w = Math.floor(ctx.measureText(`${tick[0]}`).width * 0.5);
      ctx.fillText(tick[0], x - w + offset, this.xAxis.xAxisTicks + 12);
      ctx.beginPath();
      ctx.moveTo(x + offset, 0);
      ctx.lineTo(x + offset, this.xAxis.xAxisTicks);
      ctx.stroke();
    }
    ctx.restore();
  }
}

class TimeOverlays extends Overlay {
  #cursorPos = [0,0]
  #xAxisGrads
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    xAxis = parent.time.xAxis;
    super(target, xAxis, yAxis, theme, parent);
  }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  draw() {
    this.scene.clear();
    const ctx = this.scene.context;
    this.xAxis.xAxisGrads.values;
    this.theme.xAxis;
    ctx.save();
    ctx.restore();
  }
}

const defaultOptions = {
  fontSize: 12,
  fontWeight: "normal",
  fontFamily: 'Helvetica Neue',
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderSize: 0,
  txtCol: "#000",
  bakCol: "#CCC"
};
function calcTextWidth (ctx, text) {
  return Math.round(ctx.measureText(text).width)
}
function createFont (
  fontSize = defaultOptions.fontSize,
  fontWeight = defaultOptions.fontWeight,
  fontFamily = defaultOptions.fontFamily
  ) {
  return `${fontWeight} ${fontSize}px ${fontFamily}`
}
function getTextRectWidth (ctx, text, options) {
  ctx.font = createFont(options.fontSize, options.fontWeight, options.fontFamily);
  const textWidth = calcTextWidth(ctx, text);
  const paddingLeft = options.paddingLeft || 0;
  const paddingRight = options.paddingRight || 0;
  const borderSize = options.borderSize || 0;
  return paddingLeft + paddingRight + textWidth + (borderSize * 2)
}
function getTextRectHeight (options) {
  const paddingTop = options.paddingTop || 0;
  const paddingBottom = options.paddingBottom || 0;
  const borderSize = options.borderSize || 0;
  const fontSize = options.fontSize || 0;
  return paddingTop + paddingBottom + fontSize + (borderSize * 2)
}
function drawTextBG(ctx, txt, x, y, options) {
  ctx.save();
  ctx.font = createFont(options?.fontSize, options?.fontWeight, options?.fontFamily);
  ctx.textBaseline = 'top';
  ctx.fillStyle = options.bakCol || defaultOptions.bakCol;
  let width = options.width || getTextRectWidth(ctx, txt, options);
  let height = options.height || getTextRectHeight(options);
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = options.txtCol || defaultOptions.txtCol;
  x = x + options?.paddingLeft;
  y = y + options?.paddingTop;
  ctx.fillText(`${txt}`, x, y);
  ctx.restore();
}

class TimeCursor extends Overlay {
  #cursorPos = [0,0]
  constructor(target, xAxis=false, yAxis=false, theme, parent) {
    xAxis = parent.time.xAxis;
    super(target, xAxis, yAxis, theme, parent);
    this.viewport = target.viewport;
  }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  draw() {
    const ctx = this.scene.context;
    const rect = this.target.viewport.container.getBoundingClientRect();
    const x = this.core.mousePos.x - rect.left;
    let timestamp = this.xAxis.xPos2Time(x),
    date = new Date(timestamp),
    dateTimeStr = date.toUTCString(),
    options = {
      fontSize: this.theme.xAxis.fontSize * 1.05,
      fontWeight: this.theme.xAxis.fontWeight,
      fontFamily: this.theme.xAxis.fontFamily,
      txtCol: this.theme.xAxis.colourCursor,
      bakCol: this.theme.xAxis.colourCursorBG,
      paddingTop: 5,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4,
    },
    txtW = getTextRectWidth(ctx, dateTimeStr, options),
    xPos = x + this.core.bufferPx;
    xPos = this.xAxis.xPosSnap2CandlePos(xPos);
    xPos = xPos - Math.round(txtW * 0.5) - this.core.scrollPos - this.core.bufferPx;
    this.scene.clear();
    ctx.save();
    drawTextBG(ctx, dateTimeStr, xPos, 1 , options);
    ctx.restore();
  }
}

const defaultOverlays$4 = [
  ["labels", {class: TimeLabels, fixed: false, required: true}],
  ["overlay", {class: TimeOverlays, fixed: false, required: true}],
  ["cursor", {class: TimeCursor, fixed: false, required: true}],
];
class Timeline {
  #name = "Timeline"
  #shortName = "time"
  #options
  #element
  #core
  #chart
  #xAxis
  #stateMachine
  #elViewport
  #elNavigation
  #Graph
  #timeOverlays = new Map()
  #viewport
  #navigation
  #elNavList
  #elNavScrollBar
  #elNavScrollHandle
  #elRwdStart
  #elFwdEnd
  #layerLabels
  #layerOverlays
  #layerCursor
  #input
  #slider
  #icons = {
    width: 20,
    height: 20,
    fill: "#aaa"
  }
  constructor (core, options) {
    this.#core = core;
    this.#options = options;
    this.#element = options.elements.elTime;
    this.#chart = core.Chart;
    this.#xAxis = new xAxis(this, this.#chart);
    this.init();
  }
  log(l) { this.#core.log(l); }
  info(i) { this.#core.info(i); }
  warning(w) { this.#core.warn(w); }
  error(e) { this.#core.error(e); }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get options() { return this.#options }
  get core() { return this.#core }
  get element() { return this.#element }
  get elViewport() { return this.#elViewport }
  get height() { return this.#element.getBoundingClientRect().height }
  set width(w) { this.setWidth(w); }
  get width() { return this.#element.getBoundingClientRect().width }
  get xAxis() { return this.#xAxis }
  get xAxisWidth() { return this.#xAxis.width }
  get xAxisRatio() { return this.#xAxis.xAxisRatio }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get xAxisGrads() { return this.#xAxis.xAxisGrads }
  get candleW() { return this.#xAxis.candleW }
  get candlesOnLayer() { return this.#xAxis.candlesOnLayer }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get graph() { return this.#Graph }
  get viewport() { return this.#viewport }
  get navigation() { return this.#navigation }
  get range() { return this.#core.range }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#element) }
  get bufferPx() { return this.#core.bufferPx }
  get scrollPos() { return this.#core.scrollPos }
  get scrollOffsetPx() { return this.#core.scrollPos % this.candleW }
  get smoothScrollOffset() { return this.#core.smoothScrollOffset }
  get rangeScrollOffset() { return this.#core.rangeScrollOffset }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this); }
  get stateMachine() { return this.#stateMachine }
  get time() { return this }
  init() {
    const el = this.#element;
    this.#elViewport = el.viewport;
    this.#elNavigation = el.overview;
    this.#elNavList = el.overview.icons;
    this.#elNavScrollBar = el.overview.scrollBar;
    this.#elNavScrollHandle = el.overview.handle;
    this.#elRwdStart = el.overview.rwdStart;
    this.#elFwdEnd = el.overview.fwdEnd;
    const sliderCfg = {
      core: this.#core,
      elContainer: this.#elNavScrollBar,
      elHandle: this.#elNavScrollHandle,
      callback: null
    };
    this.#slider = new Slider(sliderCfg);
  }
  setWidth(w) {
    this.#element.style.width = `${w}px`;
    this.#elViewport.style.width = `${w}px`;
  }
  setDimensions(dim) {
    const buffer = this.config.buffer || BUFFERSIZE$1;
    const width = dim.w;
    const height = this.height;
    const layerWidth = Math.round(width * ((100 + buffer) * 0.01));
    this.#Graph.setSize(width, height, layerWidth);
    this.draw();
  }
  start() {
    this.createGraph();
    this.onSetRange();
    this.#xAxis.initXAxisGrads();
    this.draw();
    this.eventsListen();
    stateMachineConfig$6.context = this;
    this.stateMachine = stateMachineConfig$6;
    this.stateMachine.start();
  }
  end() {
    this.stateMachine.destroy();
    this.#viewport.destroy();
    this.#input.off("dblclick", this.onDoubleClick);
    this.#input.off("pointerenter", this.onPointerEnter);
    this.#input.on("pointerdrag", this.onPointerDrag);
    this.#input = null;
    this.off("main_mousemove", this.drawCursorTime);
    this.off("setRange", this.onSetRange);
    this.#elFwdEnd.removeEventListener('click', debounce);
    this.#elRwdStart.removeEventListener('click', debounce);
  }
  eventsListen() {
    let canvas = this.#Graph.viewport.scene.canvas;
    this.#input = new Input(canvas, {disableContextMenu: false});
    this.#input.on("dblclick", this.onDoubleClick.bind(this));
    this.#input.on("pointerenter", this.onPointerEnter.bind(this));
    this.#input.on("pointerdrag", this.onPointerDrag.bind(this));
    this.on("main_mousemove", this.#layerCursor.draw.bind(this.#layerCursor));
    this.on("setRange", this.onSetRange.bind(this));
    this.#elFwdEnd.addEventListener('click', debounce(this.onMouseClick, 1000, this, true));
    this.#elRwdStart.addEventListener('click', debounce(this.onMouseClick, 1000, this, true));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMouseClick(e) {
    const id = e?.currentTarget?.id || e.target.parentElement.id;
    switch (id) {
      case "fwdEnd":
        this.onFwdEnd();
        break
      case "rwdStart":
        this.onRwdStart();
        break
    }
  }
  onPointerEnter(e) {
    e.domEvent.target.style.cursor = "ew-resize";
  }
  onPointerDrag(e) {
    let r = this.range;
    let start = r.indexStart - e.movement.x;
    let end = r.indexEnd;
    r.set(start,end);
  }
  onDoubleClick(e) {
    this.core.jumpToEnd();
    this.core.MainPane.draw(undefined, true);
  }
  onFwdEnd() {
    this.core.jumpToEnd();
    this.core.MainPane.draw(undefined, true);
  }
  onRwdStart() {
    this.core.jumpToStart();
    this.core.MainPane.draw(undefined, true);
  }
  onSetRange() {
    let r = this.range;
    let start = r.indexStart;
    r.indexEnd;
    let scrollBarW = this.#elNavScrollBar.getBoundingClientRect().width;
    let rangeW = r.dataLength + r.limitFuture + r.limitPast;
    let ratio = scrollBarW / rangeW;
    let handleW = r.Length * ratio;
    let pos = ((start + r.limitPast) * ratio);
    this.#slider.setHandleDims(pos, handleW);
  }
  t2Index(ts) { return this.#xAxis.t2Index(ts) }
  xPos(time) { return this.#xAxis.xPos(time) }
  xPosSnap2CandlePos(x) { return this.#xAxis.xPosSnap2CandlePos(x) }
  xPos2Time(x) { return this.#xAxis.xPos2Time(x) }
  xPos2Index(x) { return this.#xAxis.xPos2Index(x) }
  xPosOHLCV(x) { return this.#xAxis.xPosOHLCV(x) }
  createGraph() {
    let overlays = copyDeep(defaultOverlays$4);
    this.#Graph = new graph(this, this.#elViewport, overlays, false);
    this.#layerCursor = this.graph.overlays.get("cursor").instance;
    this.#layerLabels = this.graph.overlays.get("labels").instance;
    this.#layerOverlays = this.graph.overlays.get("overlay").instance;
  }
  addOverlays(overlays) {
    for (let o of overlays) {
    }
    this.graph.addOverlays(Array.from(this.#timeOverlays));
  }
  render() {
    this.#Graph.render();
  }
  draw(range=this.range, update=true) {
    this.#Graph.draw(range, update);
  }
  hideCursorTime() {
    this.#layerCursor.visible = false;
    this.render();
  }
  showCursorTime() {
    this.#layerCursor.visible = true;
    this.render();
  }
}

const renderLoop = {
  renderQ: new Map(),
  rendered: [],
  renderLog: false,
  dropFrames: true,
  graphs: [],
  range: {},
  init: function (config) {
    if (!isObject(config)) return
    this.renderLog = config?.renderLog || false;
    this.dropFrames = config?.dropFrames || true;
    this.graphs = (isArray(config?.graphs)) ? [...config.graphs] : [];
    this.range = (isObject(config?.range)) ? config.range : {};
  },
  queueFrame: function (range=this.range, graphs=this.graphs, update=false) {
    if (this.renderQ.size > 1 && this.dropFrames) this.dropFrame();
    const frameID = Date.now();
    range = range.snapshot();
    this.renderQ.set(frameID, {graphs, range, update});
    return frameID
  },
  dropFrame: function (frame=-1) {
    if (frame === -1) frame = lastKeyInMap(this.renderQ);
    if (this.renderQ.size > 1 && this.renderQ.has(frame)) {
      this.renderQ.delete(frame);
    }
  },
  getFrame: function (frame=0) {
    if (this.renderQ.has(frame)) return this.renderQ.get(frame)
    else return firstValueInMap(this.renderQ)
  },
  frameDone: function () {
    if (this.renderQ.size === 0) return
    const key = firstKeyInMap(this.renderQ);
    if (this.renderLog) this.rendered.push([key, Date.now()]);
    this.renderQ.delete(key);
  },
  start: function () {
    requestAnimationFrame(this.execute.bind(this));
  },
  execute: function () {
    requestAnimationFrame(this.execute.bind(this));
    if (this.renderQ.size === 0) return
    const [ID, frame] = firstItemInMap(this.renderQ);
    if (!frame.range?.snapshot) return
    for (let entry of frame.graphs) {
      if (isFunction(entry.draw)) entry.draw(frame.range, frame.update);
    }
    for (let entry of frame.graphs) {
      if (isFunction(entry.render)) entry.render();
    }
    this.frameDone();
  }
};

class Chart {
  #ID;
  #name
  #shortName
  #type
  #core;
  #options;
  #parent;
  #stateMachine;
  #elTarget;
  #elCanvas;
  #elViewport;
  #elLegend;
  #elScale;
  #Scale;
  #Time;
  #Graph;
  #Legends;
  #Stream;
  #viewport;
  #layerGrid;
  #layerStream;
  #layerCursor;
  #layersTools = new Map();
  #overlays = new Map()
  #overlayGrid;
  #overlayIndicators = new Map();
  #overlayTools = new Map();
  #cursorPos = [0, 0];
  #cursorActive = false;
  #cursorClick;
  #settings;
  #streamCandle;
  #title;
  #theme;
  #controller;
  #input
  #inputM
  constructor(core, options) {
    this.#core = core;
    if (!isObject(options)) return
    this.#options = {...options};
    this.#name = options.name;
    this.#shortName = options.shortName;
    this.#elTarget = this.#options.elements.elTarget;
    this.#elScale = this.#options.elements.elScale;
    this.#parent = this.#options.parent;
    this.#theme = core.theme;
    this.#settings = core.settings;
    this.#type = options.type || "offChart";
    for (const option in this.#options) {
      if (option in this.props()) {
        this.props()[option](this.#options[option]);
      }
    }
  }
  log(l) { this.core.log(l); }
  info(i) { this.core.info(i); }
  warn(w) { this.core.warn(w); }
  error(e) { this.core.error(e); }
  set id(id) { this.#ID = id; }
  get id() { return (this.#ID) ? `${this.#ID}` : `${this.#core.id}.${this.#name}` }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get title() { return this.#title }
  get type() { return this.#type }
  get parent() { return this.#parent }
  get core() { return this.#core }
  get options() { return this.#options }
  get element() { return this.#elTarget }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elTarget) }
  set width(w) { this.setWidth(w); }
  get width() { return this.#elTarget.getBoundingClientRect().width }
  set height(h) { this.setHeight(h); }
  get height() { return this.#elTarget.getBoundingClientRect().height }
  get data() {}
  get range() { return this.#core.range }
  get stream() { return this.#Stream }
  get cursorPos() { return this.#cursorPos }
  set cursorActive(a) { this.#cursorActive = a; }
  get cursorActive() { return this.#cursorActive }
  get cursorClick() { return this.#cursorClick }
  get candleW() { return this.#core.Timeline.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get scrollPos() { return this.#core.scrollPos }
  get bufferPx() { return this.#core.bufferPx }
  get elCanvas() { return this.#Graph.viewport.scene.canvas }
  get elScale() { return this.#elScale }
  get elLegend() { return this.#elTarget.legend }
  get elViewport() { return this.#elTarget.viewport }
  set layerWidth(w) { this.#Graph.layerWidth = w; }
  get layerWidth() { return this.#Graph.layerWidth }
  set legend(l) { this.#Legends = l; }
  get legend() { return this.#Legends }
  set time(t) { this.#Time = t; }
  get time() { return this.#Time }
  set scale(s) { this.#Scale = s; }
  get scale() { return this.#Scale }
  get axes() { return "x" }
  set graph(g) { this.#Graph = g; }
  get graph() { return this.#Graph }
  get viewport() { return this.#Graph.viewport }
  get layerGrid() { return this.#Graph.overlays.get("grid").layer }
  get overlays() { return this.#overlays }
  get overlayGrid() { return this.#Graph.overlays.get("grid").instance }
  get overlayTools() { return this.#overlayTools }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this); }
  get stateMachine() { return this.#stateMachine }
  start(stateMachineConfig) {
    this.#Time = this.#core.Timeline;
    this.createGraph();
    this.#Scale.start();
    this.draw(this.range);
    this.setCursor("crosshair");
    stateMachineConfig.id = this.id;
    stateMachineConfig.context = this;
    this.stateMachine = stateMachineConfig;
    this.stateMachine.start();
  }
  end() {
    this.stateMachine.destroy();
    this.#Scale.end();
    this.#Graph.destroy();
    this.#input.off("pointerdrag", this.onChartDrag);
    this.#input.off("pointerdragend", this.onChartDrag);
    this.#input.off("pointermove", this.onMouseMove);
    this.#input.off("pointerenter", this.onMouseEnter);
    this.#input.off("pointerout", this.onMouseOut);
    this.#input.off("pointerdown", this.onMouseDown);
    this.#controller = null;
    this.off("main_mousemove", this.onMouseMove);
    this.off(STREAM_LISTENING, this.onStreamListening);
    this.off(STREAM_NEWVALUE, this.onStreamNewValue);
    this.off(STREAM_UPDATE, this.onStreamUpdate);
    this.off(STREAM_FIRSTVALUE, this.onStreamNewValue);
  }
  eventsListen() {
    this.#input = new Input(this.#elTarget, {disableContextMenu: false});
    this.#input.on("pointerdrag", this.onChartDrag.bind(this));
    this.#input.on("pointerdragend", this.onChartDragDone.bind(this));
    this.#input.on("pointermove", this.onMouseMove.bind(this));
    this.#input.on("pointerenter", this.onMouseEnter.bind(this));
    this.#input.on("pointerout", this.onMouseOut.bind(this));
    this.#input.on("pointerdown", this.onMouseDown.bind(this));
    this.on("main_mousemove", this.updateLegends.bind(this));
    this.on(STREAM_LISTENING, this.onStreamListening.bind(this));
    this.on(STREAM_NEWVALUE, this.onStreamNewValue.bind(this));
    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this));
    this.on(STREAM_FIRSTVALUE, this.onStreamNewValue.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onChartDrag(e) {
    this.setCursor("grab");
    this.core.MainPane.onChartDrag(e);
    this.scale.onChartDrag(e);
  }
  onChartDragDone(e) {
    this.setCursor("crosshair");
    this.core.MainPane.onChartDragDone(e);
  }
  onMouseMove(e) {
    this.core.MainPane.onPointerActive(this);
    this.scale.layerCursor.visible = true;
    this.graph.overlays.list.get("cursor").layer.visible = true;
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.#Scale.onMouseMove(this.#cursorPos);
    this.emit(`${this.id}_mousemove`, this.#cursorPos);
  }
  onMouseEnter(e) {
    this.core.MainPane.onPointerActive(this);
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.core.MainPane.onMouseEnter();
    this.scale.layerCursor.visible = true;
    this.graph.overlays.list.get("cursor").layer.visible = true;
    this.emit(`${this.id}_mouseenter`, this.#cursorPos);
  }
  onMouseOut(e) {
    this.#cursorActive = false;
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.scale.layerCursor.visible = false;
    this.emit(`${this.id}_mouseout`, this.#cursorPos);
  }
  onMouseDown(e) {
    this.#cursorClick = [Math.floor(e.position.x), Math.floor(e.position.y)];
    if (this.stateMachine.state === "tool_activated")
      this.emit("tool_targetSelected", { target: this, position: e });
  }
  onStreamListening(stream) {
    if (this.#Stream !== stream) this.#Stream = stream;
  }
  onStreamNewValue(value) {
    this.draw(this.range, true);
  }
  props() {
    return {
      title: (title) => (this.#title = title),
      yAxisDigits: (digits) => this.setYAxisDigits(digits),
    };
  }
  setHeight(h) {
    if (!isNumber(h)) h = this.height || this.#parent.height;
    this.#elTarget.style.height = `${h}px`;
    this.#elScale.style.height = `${h}px`;
    this.elViewport.style.height = `${h}px`;
    this.#Scale.setDimensions({ w: null, h: h });
  }
  setDimensions(dim) {
    const buffer = this.config.buffer || BUFFERSIZE$1;
      let {w, h} = dim;
               w = this.width;
               h = (h) ? h : this.height;
    this.layerWidth = Math.round(w * ((100 + buffer) * 0.01));
    this.graph.setSize(w, h, this.layerWidth);
    this.setHeight(h);
    this.draw(undefined, true);
    this.core.MainPane.draw(undefined, false);
  }
  setCursor(cursor) {
    this.element.style.cursor = cursor;
  }
  addIndicator(i) {
    const onChart = (this.type === "onChart" ) ? true : false;
    const indClass = this.core.indicators[i.type].ind;
    const indType = (indClass.constructor.type === "both") ? onChart : indClass.prototype.onChart;
    if (
        i?.type in this.core.indicators &&
        onChart === indType
      ) {
      const config = {
        class: indClass,
        params: {overlay: i}
      };
      const r = this.graph.addOverlay(i.name, config);
      if (r) {
        this.#overlays.set(i.name, config);
        return true
      }
    }
    else return false
  }
  addTool(tool) {
    let { layerConfig } = this.layerConfig();
    let layer = new CEL.Layer(layerConfig);
    this.#layersTools.set(tool.id, layer);
    this.#viewport.addLayer(layer);
    tool.layerTool = layer;
    this.#overlayTools.set(tool.id, tool);
  }
  addTools(tools) {}
  overlayTools() {
  }
  overlayToolAdd(tool) {
    this.#overlayTools.set(tool.id, tool);
  }
  overlayToolDelete(tool) {
    this.#overlayTools.delete(tool);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.#core.scrollPos, 0);
    this.overlayGrid.draw("y");
    this.#Graph.render();
  }
  refresh() {
    this.#Scale.draw();
    this.draw();
  }
  updateLegends(pos = this.#cursorPos, candle = false) {
    if (this.#core.isEmpty) return
    const legends = this.#Legends.list;
    for (const legend in legends) {
      this.#Legends.update(legend, { pos, candle });
    }
  }
  render() {
    this.#Graph.render();
    this.#Scale.render();
  }
  draw(range=this.range, update=false) {
      this.#Graph.draw(range, update);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.core.scrollPos, 0);
    this.overlayGrid.draw("y");
    this.#Graph.render();
  }
  resize(width = this.width, height = this.height) {
  }
  zoomRange() {
    this.draw(this.range, true);
    this.emit("zoomDone");
  }
}

class yAxis extends Axis {
  #source
  #parent
  #chart
  #core
  #yAxisType = YAXIS_TYPES$1[0]
  #mode = "automatic"
  #transform = {
    automatic: {
      get max() { return this.range?.valueMax },
      get min() { return this.range?.valueMin },
      get mid() { return this.range?.valueMin + (this.range?.valueDiff * 0.5) },
      get diff() { return this.range?.valueDiff },
      get zoom() { return 1 },
      get offset() { return 0 },
      range: null
    },
    manual: {
      max: 1,
      min: 0,
      mid: 0.5,
      diff: 1,
      zoom: 1,
      offset: 0
    }
  }
  #yAxisPadding = 1.04
  #yAxisStep = YAXIS_STEP
  #yAxisDigits = PRICEDIGITS$1
  #yAxisTicks = 3
  #yAxisGrads
  #range
  constructor(parent, chart, yAxisType=YAXIS_TYPES$1[0], range) {
    super(parent);
    this.#chart = chart;
    this.#parent = parent;
    this.#source = parent.parent;
    this.yAxisType = yAxisType;
    range = (range) ? range : this.core.range;
    this.#transform.automatic.range = range;
    this.#range = new Proxy(range, {
      get: (obj, prop) => {
        const m = this.#mode;
        const t = this.#transform;
        switch (prop) {
          case "max": return t[m][prop]
          case "min":  return t[m][prop]
          case "mid": return t[m][prop]
          case "diff": return t[m][prop]
          case "zoom": return t[m][prop]
          case "offset": return t[m][prop]
          default: return obj[prop]
        }
      }
    });
  }
  get chart() { return this.#chart }
  get range() { return this.#range }
  get height() { return this.chart.height }
  get rangeH() { return this.#range.diff * this.yAxisPadding }
  get yAxisRatio() { return this.getYAxisRatio() }
  get yAxisPrecision() { return this.yAxisCalcPrecision }
  set yAxisPadding(p) { this.#yAxisPadding = p; }
  get yAxisPadding() { return this.#yAxisPadding }
  set yAxisType(t) { this.#yAxisType = YAXIS_TYPES$1.includes(t) ? t : YAXIS_TYPES$1[0]; }
  get yAxisType() { return this.#yAxisType }
  set yAxisStep(s) { this.#yAxisStep = isNumber(s) ? s : YAXIS_STEP; }
  get yAxisStep() { return this.#yAxisStep }
  set yAxisTicks(t) { this.#yAxisTicks = isNumber(t) ? t : 0; }
  get yAxisTicks() { return this.#yAxisTicks }
  get yAxisGrads() { return this.#yAxisGrads }
  set mode(m) { this.setMode(m); }
  get mode() { return this.#mode }
  set offset(o) { this.setOffset(o); }
  get offset() { return this.#range.offset }
  set zoom(z) { this.setZoom(z); }
  get zoom() { return this.#range.zoom }
  getYAxisRatio() {
    return this.height / this.#range.diff
  }
  yAxisRangeBounds() {
  }
  yAxisLog() {
  }
  yAxisCntDigits(value) {
    return this.countDigits(value)
  }
  yAxisCalcPrecision() {
    let integerCnt = this.numDigits(this.#range.max);
    return this.yDigits - integerCnt
  }
  yAxisCursor() {
  }
  yPos(y) {
    switch(this.yAxisType) {
      case "percent" : return bRound(this.p100toPixel(y))
      case "log" : return bRound(this.$2Pixel(log10(y)))
      default : return bRound(this.$2Pixel(y))
    }
  }
  yPos2Price(y) {
    return this.pixel2$(y)
  }
  $2Pixel(y) {
    const height = y - this.#range.min;
    const yPos = this.height - (height * this.yAxisRatio);
    return yPos
  }
  lastYData2Pixel(y) {
    let height = y - this.core.stream.lastPriceMin;
    let yPos = this.height - (height * this.yAxisRatio);
    return yPos
  }
  pixel2$(y) {
    let ratio = (this.height - y) / this.height;
    let adjust = this.#range.diff * ratio;
    return this.#range.min + adjust
  }
  p100toPixel(y) {
      let ratio = this.height / this.#range.diff;
      return (y - this.#range.max) * -1 * ratio
  }
  yAxisTransform() {
  }
  setMode(m) {
    if (!["automatic","manual"].includes(m)) return false
    const t = this.#transform;
    if (this.mode == "automatic" && m == "manual") {
      t.manual.zoom = 0;
      t.manual.max = this.#range.valueMax;
      t.manual.min = this.#range.valueMin;
      this.#mode = m;
    }
    else if (this.mode == "manual" && m == "automatic") {
      t.manual.zoom = 0;
      this.#mode = m;
    }
  }
  setOffset(o) {
    if (!isNumber(o) || o == 0 || this.#mode !== "manual") return false
    const t = this.#transform;
    let max = this.pixel2$(o * -1);
    let min = this.pixel2$(this.height - o);
    let delta = max - min;
    t.manual.min = min;
    t.manual.max = max;
    t.manual.mid = (delta) / 2;
    t.manual.diff = delta;
    t.manual.zoom = 0;
  }
  setZoom(z) {
    if (!isNumber(z) || this.#mode !== "manual") return false
    const t = this.#transform;
      let min = t.manual.min;
      let max = t.manual.max;
    const delta = max - min;
    const delta10P = delta * 0.01;
    const change = z * delta10P;
          min -= change;
          max += change;
    if (max < min || min <= Infinity * -1 || max >= Infinity)  return
    t.manual.max =  max;
    t.manual.min = min;
    t.manual.mid = (delta) / 2;
    t.manual.diff = delta;
    t.manual.zoom = change;
    this.calcGradations();
  }
  calcGradations() {
    let max, min, off;
    switch (this.yAxisType) {
      case "percent":
        max = (this.#range.max > 0) ? this.#range.max : 100;
        min = (this.#range.min > 0) ? this.#range.min : 0;
        off = this.#range.offset;
        this.#yAxisGrads = this.gradations(max + off, min + off);
        break;
      default:
        max = (this.#range.max > 0) ? this.#range.max : 1;
        min = (this.#range.min > 0) ? this.#range.min : 0;
        off = this.#range.offset;
        this.#yAxisGrads = this.gradations(max + off, min + off);
        break;
    }
    return this.#yAxisGrads
  }
  gradations(max, min, decimals=true, fixed=false) {
      let digits,
          rangeH,
          yGridSize;
    const scaleGrads = [];
    rangeH = max - min;
    rangeH = (this.rangeH > 0) ? this.rangeH : 1;
    yGridSize = (rangeH)/(this.height / (this.core.theme.yAxis.fontSize * 1.75));
    let niceNumber = Math.pow( 10 , Math.ceil( Math.log10( yGridSize ) ) );
    if ( yGridSize < 0.25 * niceNumber ) niceNumber = 0.25 * niceNumber;
    else if ( yGridSize < 0.5 * niceNumber ) niceNumber = 0.5 * niceNumber;
    var yStartRoundNumber = Math.ceil( min/niceNumber ) * niceNumber;
    var yEndRoundNumber = Math.floor( max/niceNumber ) * niceNumber;
    let pos = this.height,
        step$ = (yEndRoundNumber - yStartRoundNumber) / niceNumber,
        stepP = this.height / step$,
        step = this.countDigits(step$),
        nice;
    for ( var y = yStartRoundNumber ; y <= yEndRoundNumber ; y += niceNumber )
    {
      digits = this.countDigits(y);
      nice = this.niceValue(digits, decimals, step);
      scaleGrads.push([nice, round(pos), digits]);
      pos -= stepP;
    }
    return scaleGrads
  }
  niceValue(digits, decimals=true, step) {
    if (digits.integers) {
      let x = step.integers;
      if (x - 2 > 0) {
        let factor = power(10, x - 2);
        return Math.floor(digits.value / factor) * factor
      }
      else {
        if (!decimals) return Math.floor(digits.value)
        x = (x > 0)? x : x * -1;
        return round(digits.value, x)
      }
    }
    else {
      let y = digits.decimals - step.decimals;
      y = (y > 0)? y : y * -1;
      return round(digits.value, y)
    }
  }
  limitPrecision(digits) {
    let value = digits.value,
        cnt = this.#yAxisDigits - digits.total,
        cnt2 = 4 - digits.integers;
    if (cnt < 1) {
      let decimals = limit(digits.decimals + cnt, 0, 100);
      value = Number.parseFloat(value).toFixed(decimals);
    }
    else if (cnt2 < 1) {
      let decimals = 2 - cnt2;
      value = Number.parseFloat(value).toFixed(decimals);
    }
    return value
  }
}

var stateMachineConfig$5 = {
  id: "scale",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.setCursor("ns-resize");
      },
      onExit(data) {
      },
      on: {
        resize: {
          target: 'resize',
          action (data) {
          },
        },
        yAxis_scale: {
          target: 'scale',
          action (data) {
          },
        },
        yAxis_inc: {
          target: 'incremental',
          action (data) {
          },
        },
        yAxis_log: {
          target: 'logarithmic',
          action (data) {
          },
        },
        yAxis_100: {
          target: 'percentual',
          action (data) {
          },
        },
        setRange: {
          target: 'setRange',
          action (data) {
          },
        },
      }
    },
    resize: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        someEvent: {
          target: '',
          action (data) {
          },
        },
      }
    },
    setRange: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            this.context.origin.draw();
          },
        },
      }
    },
  },
  guards: {
    receiver () { return (this.eventData.scale.ID == this.context.origin.ID) },
    zoomDone () { return true },
  }
};

class ScaleCursor extends Overlay {
  #cursorPos = [0, 0]
  constructor(target, xAxis, yAxis, theme, parent, params) {
    parent = yAxis;
    yAxis = yAxis.yAxis;
    super(target, xAxis, yAxis, theme, parent, params);
    this.viewport = target.viewport;
  }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  draw(cursorPos) {
    if (!this.parent.parent.cursorActive) return
    this.#cursorPos = (isArray(cursorPos)) ? cursorPos : this.#cursorPos;
    let [x, y] = this.#cursorPos,
    price =  this.parent.yPos2Price(y),
    nice = this.parent.nicePrice(price),
    options = {
      fontSize: this.theme.yAxis.fontSize * 1.05,
      fontWeight: this.theme.yAxis.fontWeight,
      fontFamily: this.theme.yAxis.fontFamily,
      txtCol: this.theme.yAxis.colourCursor,
      bakCol: this.theme.yAxis.colourCursorBG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 3,
      paddingRight: 3,
      width: this.viewport.width
    },
    height = options.fontSize + options.paddingTop + options.paddingBottom,
    yPos = y - (height * 0.5);
    const ctx = this.scene.context;
    this.scene.clear();
    ctx.save();
    ctx.fillStyle = options.bakCol;
    ctx.fillRect(1, yPos, this.width, height);
    drawTextBG(ctx, `${nice}`, 1, yPos , options);
    ctx.restore();
  }
  erase() {
    this.scene.clear();
    this.target.viewport.render();
    return
  }
}

class ScaleLabels extends Overlay {
  constructor(target, xAxis, yAxis, theme, parent, params) {
    parent = yAxis;
    yAxis = yAxis.yAxis;
    super(target, xAxis, yAxis, theme, parent, params);
    this.viewport = target.viewport;
  }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  draw() {
    const ctx = this.scene.context;
    const yAxis = this.yAxis;
    const grads = this.yAxis.calcGradations() || [];
    const theme = this.theme.yAxis;
    const tickMarker = (isBoolean(theme.tickMarker)) ? theme.tickMarker : true;
      let tickPos = [];
      let y;
    switch (theme?.location) {
      case "left": tickPos = [this.width, this.width - yAxis.yAxisTicks]; break;
      case "right":
      default: tickPos = [1, yAxis.yAxisTicks]; break;
    }
    this.scene.clear();
    ctx.save();
    ctx.strokeStyle = theme.colourTick;
    ctx.fillStyle = theme.colourTick;
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`;
    for (let tick of grads) {
      y = yAxis.$2Pixel(tick[0]);
      ctx.fillText(tick[0], yAxis.yAxisTicks + 5, y + (theme.fontSize * 0.3));
      if (tickMarker) {
        ctx.beginPath();
        ctx.moveTo(tickPos[0], y);
        ctx.lineTo(tickPos[1], y);
        ctx.stroke();
      }
    }
    ctx.restore();
  }
}

class ScaleOverly extends Overlay {
  constructor(target, xAxis, yAxis, theme, parent, params) {
    parent = yAxis;
    yAxis = yAxis.yAxis;
    super(target, xAxis, yAxis, theme, parent, params);
    this.viewport = target.viewport;
  }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  draw() {
    const ctx = this.scene.context;
    this.yAxis.yAxis;
    this.scene.clear();
    ctx.save();
    ctx.restore();
  }
}

class ScalePriceLine extends Overlay {
  constructor(target, xAxis, yAxis, theme, parent, params) {
    parent = yAxis;
    yAxis = yAxis.yAxis;
    super(target, xAxis, yAxis, theme, parent, params);
    this.viewport = target.viewport;
  }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  draw(candle) {
    if (candle === undefined) return
    const ctx = this.scene.context;
    const streaming = this.core.stream instanceof Stream &&
                      this.config.stream.tfCountDown;
    let price = candle[4],
        nice = this.parent.nicePrice(price),
        options = {
          fontSize: YAxisStyle.FONTSIZE * 1.05,
          fontWeight: YAxisStyle.FONTWEIGHT,
          fontFamily: YAxisStyle.FONTFAMILY,
          txtCol: "#FFFFFF",
          bakCol: YAxisStyle.COLOUR_CURSOR_BG,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 5,
          paddingRight: 3,
          width: this.viewport.width
        },
        x = 0,
        h = getTextRectHeight(options),
        y = this.parent.yPos(price) - (h * 0.5);
    this.scene.clear();
    ctx.save();
    if (candle[4] >= candle[1]) options.bakCol = this.theme.candle.UpBodyColour;
    else options.bakCol = this.theme.candle.DnBodyColour;
    drawTextBG(ctx, nice, x, y, options);
    if (streaming) {
      nice = this.core.stream.countDownUpdate();
      options.fontSize = options?.fontSize / 1.1;
      drawTextBG(ctx, nice, x, y+h, options);
    }
    ctx.restore();
    this.viewport.render();
  }
}

const defaultOverlays$3 = [
  ["labels", {class: ScaleLabels, fixed: true, required: true}],
  ["overlay", {class: ScaleOverly, fixed: true, required: true}],
  ["price", {class: ScalePriceLine, fixed: true, required: true}],
  ["cursor", {class: ScaleCursor, fixed: true, required: true}],
];
class ScaleBar {
  #ID
  #name = "Y Scale Axis"
  #shortName = "scale"
  #core
  #options
  #parent
  #stateMachine
  #chart
  #target
  #yAxis
  #element
  #elViewport
  #viewport
  #layerLabels
  #layerOverlays
  #layerPriceLine
  #layerCursor
  #scaleOverlays = new Map()
  #Graph
  #input
  #priceLine
  #cursorPos
  constructor (core, options) {
    this.#core = core;
    this.#options = {...options};
    this.#element = this.#options.elScale;
    this.#chart = this.#options.chart;
    this.#parent = this.#options.parent;
    this.#ID = this.#options.offChartID || uid("TX_scale_");
    this.init();
  }
  log(l) { this.#core.log(l); }
  info(i) { this.#core.info(i); }
  warning(w) { this.#core.warn(w); }
  error(e) { this.#core.error(e); }
  get ID() { return this.#ID }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get core() { return this.#core }
  get options() { return this.#options }
  get parent() { return this.#parent }
  set height(h) { this.setHeight(h); }
  get height() { return this.#element.getBoundingClientRect().height }
  get width() { return this.#element.getBoundingClientRect().width }
  get element() { return this.#element }
  get layerCursor() { return this.#layerCursor }
  get layerLabels() { return this.#layerLabels }
  get layerOverlays() { return this.#layerOverlays }
  get layerPriceLine() { return this.#layerPriceLine }
  get yAxis() { return this.#yAxis }
  set yAxisType(t) { this.#yAxis.yAxisType = YAXIS_TYPES.includes(t) ? t : YAXIS_TYPES[0]; }
  get yAxisType() { return this.#yAxis.yAxisType }
  get yAxisHeight() { return this.#yAxis.height }
  get yAxisRatio() { return this.#yAxis.yAxisRatio }
  get yAxisGrads() { return this.#yAxis.yAxisGrads }
  set graph(g) { this.#Graph = g; }
  get graph() { return this.#Graph }
  get viewport() { return this.#viewport }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#element) }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  set scaleRange(r) { this.setScaleRange(r); }
  set rangeMode(m) { this.#yAxis.mode = m; }
  get rangeMode() { return this.#yAxis.mode }
  set rangeYFactor(f) { this.core.range.yFactor(f); }
  set yOffset(o) { this.#yAxis.offset = o; }
  get yOffset() { return this.#yAxis.offset }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this); }
  get stateMachine() { return this.#stateMachine }
  get Scale() { return this }
  init() {
    this.#elViewport = this.#element.viewport || this.#element;
  }
  start() {
    const range = (this.#parent.name == "OffChart" ) ?
      this.#parent.localRange : undefined;
    this.#yAxis = new yAxis(this, this, this.options.yAxisType, range);
    this.createGraph();
    this.addOverlays([]);
    this.#yAxis.calcGradations();
    this.draw();
    this.eventsListen();
    const newConfig = copyDeep(stateMachineConfig$5);
    newConfig.context = this;
    this.stateMachine = newConfig;
    this.stateMachine.start();
  }
  end() {
    this.stateMachine.destroy();
    this.#input = null;
    this.#viewport.destroy();
    this.#input.on("pointerdrag", this.onDrag);
    this.#input.on("wheel", this.onMouseWheel);
    this.#input.on("dblclick", this.resetScaleRange);
    this.off(`${this.#parent.ID}_mousemove`, this.onMouseMove);
    this.off(`${this.#parent.ID}_mouseout`, this.#layerCursor.erase);
    this.off(STREAM_UPDATE, this.onStreamUpdate);
    this.off("chart_pan", this.onMouseMove);
    this.off("chart_panDone", this.onMouseMove);
  }
  eventsListen() {
    let canvas = this.#Graph.viewport.scene.canvas;
    this.#input = new Input(canvas, {disableContextMenu: false});
    this.#input.setCursor("ns-resize");
    this.#input.on("pointerdrag", throttle(this.onDrag, 100, this));
    this.#input.on("pointerdragend", this.onDragDone.bind(this));
    this.#input.on("wheel", this.onMouseWheel.bind(this));
    this.#input.on("dblclick", this.resetScaleRange.bind(this));
    this.on(`${this.#parent.id}_mousemove`, this.onMouseMove.bind(this));
    this.on(`${this.#parent.id}_mouseout`, this.#layerCursor.erase.bind(this.#layerCursor));
    this.on(STREAM_UPDATE, this.#layerPriceLine.draw.bind(this.#layerPriceLine));
  }
  on(topic, handler, context) {
    this.core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.core.off(topic, handler);
  }
  emit(topic, data) {
    this.core.emit(topic, data);
  }
  onResize(dimensions) {
    this.setDimensions(dimensions);
  }
  onMouseMove(e) {
    this.#cursorPos = (isArray(e)) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)];
    this.#layerCursor.draw(this.#cursorPos);
  }
  onDrag(e) {
    this.#cursorPos = [
      Math.floor(e.position.x), Math.floor(e.position.y),
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ];
    ({
      scale: this,
      cursorPos: this.#cursorPos
    });
    this.setScaleRange(this.#cursorPos[5]);
    this.render();
  }
  onDragDone(e) {
  }
  onMouseWheel(e) {
    e.domEvent.preventDefault();
    const direction = Math.sign(e.wheeldelta) * -1;
    this.setScaleRange(direction);
    this.render();
  }
  onStreamUpdate(e) {
  }
  onChartDrag(e) {
    if (this.#yAxis.mode !== "manual") return
    this.#yAxis.offset = this.#core.MainPane.cursorPos[5];
    this.parent.draw(this.range, true);
    this.draw();
  }
  setHeight(h) {
    this.#element.style.height = `${h}px`;
  }
  setDimensions(dim) {
    const width = this.#element.getBoundingClientRect().width;
    this.#Graph.setSize(width, dim.h, width);
    this.setHeight(dim.h);
    this.draw();
  }
  setScaleRange(r) {
    if (this.#yAxis.mode == "automatic") this.#yAxis.mode = "manual";
    this.#yAxis.zoom = r;
    this.parent.draw(this.range, true);
    this.draw();
  }
  resetScaleRange() {
    this.#yAxis.mode = "automatic";
    this.parent.draw(this.range, true);
    this.draw();
  }
  setCursor(cursor) {
    this.#element.style.cursor = cursor;
  }
  yPos(yData) { return this.#yAxis.yPos(yData) }
  yPosStream(yData) { return this.#yAxis.lastYData2Pixel(yData) }
  yPos2Price(y) { return this.#yAxis.yPos2Price(y) }
  nicePrice($) {
    let digits = this.#yAxis.countDigits($);
    return this.#yAxis.limitPrecision(digits)
  }
  createGraph() {
    let overlays = copyDeep(defaultOverlays$3);
    this.graph = new graph(this, this.#elViewport, overlays, false);
    this.#layerCursor = this.graph.overlays.get("cursor").instance;
    this.#layerLabels = this.graph.overlays.get("labels").instance;
    this.#layerOverlays = this.graph.overlays.get("overlay").instance;
    this.#layerPriceLine = this.graph.overlays.get("price").instance;
  }
  addOverlays(overlays) {
    for (let o of overlays) {
    }
    this.graph.addOverlays(Array.from(this.#scaleOverlays));
  }
  render() {
    this.#Graph.render();
  }
  draw(range=this.range, update=true) {
    this.#Graph.draw(range, update);
    this.#parent.drawGrid();
  }
  resize(width=this.width, height=this.height) {
    this.setDimensions({w: width, h: height});
  }
}

class Legends {
  #elTarget
  #list
  #parent
  #core
  #input
  #controls = {
    width: 18,
    height: 18,
    fill: "#aaa"
  }
  #controlsList
  constructor(target, parent) {
    this.#elTarget = target;
    this.#list = {};
    this.#parent = parent;
    this.#core = parent.core;
    this.eventsListen();
  }
  get list() { return this.#list }
  eventsListen() {
    this.moveEvent = new PointerEvent("pointermove", {bubbles: true, cancelable: true,});
    this.#input = new Input(this.#elTarget, { disableContextMenu: false, });
    this.#input.on("pointermove", this.onMouseMove.bind(this));
  }
  onMouseMove(e) {
  }
  onMouseClick() {
  }
  buildLegend(o) {
    const theme = this.#core.theme;
      let styleInputs = "order: 1; display: inline; margin: 0 0 0 -1em;";
    const styleLegend = `${theme.legend.text}; color: ${theme.legend.colour}; text-align: left;`;
      let styleLegendTitle = "margin-right: 1em; white-space: nowrap;";
    const styleControls = "order:2; float: right; margin: 0 0.5em 0; opacity:0";
    const mouseOver = "onmouseover='this.style.opacity=1'";
    const mouseOut = "onmouseout='this.style.opacity=0'";
    const t = this.#elTarget;
    styleLegendTitle += (o?.type === "chart") ? "font-size: 1.5em;" : "font-size: 1.2em;";
    const node = `
      <div slot="legend" id="${o.id}" class="legend" style="${styleLegend}">
        <div>
          <span slot="title" class="title" style="${styleLegendTitle}">${o.title}</span>
          <dl style="${styleInputs}">${t.buildInputs(o)}</dl>
        </div>
        <div slot="controls" class="controls" style="${styleControls}" ${mouseOver} ${mouseOut}>${t.buildControls(o)}</div>
      </div>
    `;
    return node
  }
  add(options) {
    if (!isObject(options) || !("title" in options)) return false
    options.id = uid(options?.id || "legend");
    options.type = options?.type || "overlay";
    options.parent = this.#parent.ID;
    const html = this.buildLegend(options);
    this.#elTarget.insertAdjacentHTML('beforeend', html);
    const legendEl = this.#elTarget.querySelector(`#${options.id}`);
    this.#list[options.id] = {el: legendEl, type: options.type, source: options?.source};
    this.#controlsList = legendEl.querySelectorAll(`.control`);
    for (let c of this.#controlsList) {
      let svg = c.querySelector('svg');
      svg.style.width = `${this.#controls.width}px`;
      svg.style.height = `${this.#controls.height}px`;
      svg.style.fill = `${this.#controls.fill}`;
      c.addEventListener('click', this.onMouseClick.bind(this));
    }
    return options.id
  }
  remove(id) {
    if (!(id in this.#list)
    || this.#list[id].type === "chart") return false
    this.#list[id].el.remove();
    delete this.#list[id];
    for (let c of this.#controlsList) {
      c.removeEventListener('click', this.onMouseClick);
    }
    return true
  }
  update(id, data) {
    if (!(isObject(data))
    || !(id in this.#list)) return false
    let source = this.#list[id].source(data.pos);
    const html = this.#elTarget.buildInputs(source);
    this.#elTarget.querySelector(`#${id} dl`).innerHTML = html;
  }
}

class VolumeBar {
  constructor(scene, config) {
    this.scene = scene;
    this.ctx = this.scene.context;
    this.width = this.scene.width;
    this.cfg = {...defaultTheme, ...config};
  }
  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const barColour = hilo ? this.cfg.volume.UpColour: this.cfg.volume.DnColour;
    ctx.save();
    ctx.strokeStyle = barColour;
    ctx.fillStyle = barColour;
    ctx.fillRect(
      Math.floor(data.x),
      Math.floor(data.z - data.h),
      Math.floor(data.w),
      Math.floor(data.h)
    );
    ctx.restore();
  }
}

class chartVolume extends Overlay {
  #volumeBar
  #volH
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    super(target, xAxis=false, yAxis=false, theme, parent, params);
    this.#volumeBar = new VolumeBar(target.scene, theme);
    this.theme.volume.Height = limit(theme?.volume?.Height, 0, 100) || 100;
  }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  draw(range=this.core.range) {
    this.scene.clear();
    const data = range.data;
    const zeroPos = this.scene.height;
    const offset = this.xAxis.smoothScrollOffset || 0;
    const width = this.xAxis.candleW;
    const w = (width > 5) ? Math.ceil(width * 0.8) : width;
    const volume = {
      x: 0 + offset - this.xAxis.candleW,
      w: w,
      z: zeroPos
    };
    const volH = Math.floor(zeroPos * this.theme.volume.Height / 100);
    let o = this.core.rangeScrollOffset;
    let v = range.indexStart - o;
    let i = range.Length + (o * 2);
    let j = i;
    let u = v;
    let x;
    let maxVol = 0;
    while(j--) {
      x = range.value( u );
      if (x[4] !== null) {
        maxVol = (x[5] > maxVol) ? x[5] : maxVol;
      }
      u++;
    }
    while(i--) {
      x = range.value( v );
      volume.x = bRound(this.xAxis.xPos(x[0]) - (w / 2));
      if (x[4] !== null) {
        volume.h = volH - (volH * ((maxVol - x[5]) / maxVol));
        volume.raw = data[v];
        this.#volumeBar.draw(volume);
      }
      v++;
    }
  }
}

class Candle {
  areaCoordinates = []
  constructor(scene, config) {
    this.scene = scene;
    this.ctx = this.scene.context;
    this.width = this.scene.width;
    this.cfg = {...defaultTheme, ...config};
  }
  draw(data) {
    const ctx = this.ctx;
    const hilo = data.raw[4] >= data.raw[1];
    const bodyColour = hilo ? this.cfg.candle.UpBodyColour : this.cfg.candle.DnBodyColour;
    const wickColour = hilo ? this.cfg.candle.UpWickColour : this.cfg.candle.DnWickColour;
    switch(this.cfg.candle.Type) {
      case CandleType.CANDLE_SOLID :
      this.fill = true;
      break;
      case CandleType.CANDLE_HOLLOW :
      case CandleType.OHLC:
        this.fill = false;
        break;
      case CandleType.CANDLE_UP_HOLLOW :
        this.fill = !hilo;
        break;
      case CandleType.CANDLE_DOWN_HOLLOW :
        this.fill = hilo;
    }
    let w = Math.max(data.w -1, 1);
        w = (w > 5) ? Math.ceil(w * 0.8) : w;
    let hw = Math.max(Math.floor(w * 0.5), 1);
    let h = Math.abs(data.o - data.c);
    let max_h = data.c === data.o ? 1 : 2;
    let x = data.x;
    let x05 = Math.floor(x) - 0.5;
    ctx.save();
    ctx.strokeStyle = wickColour;
    ctx.beginPath();
    ctx.moveTo(x05, Math.floor(data.h));
    if (this.cfg.candle.Type === CandleType.OHLC) {
      ctx.lineTo(x05, Math.floor(data.l));
    }
    else {
      if (hilo) {
        ctx.lineTo(x05, Math.floor(data.c));
        ctx.moveTo(x05, Math.floor(data.o));
      }
      else {
        ctx.lineTo(x05, Math.floor(data.o));
        ctx.moveTo(x05, Math.floor(data.c));
      }
    }
    ctx.lineTo(x05, Math.floor(data.l));
    ctx.stroke();
    if (data.w > 1.5 && this.fill) {
      ctx.fillStyle = bodyColour;
      let s = hilo ? 1 : -1;
      ctx.rect(
        Math.floor(x - hw),
        data.c,
        Math.floor(hw * 2),
        s * Math.max(h, max_h),
      );
      ctx.fill();
      ctx.stroke();
    }
    else if (data.w > 1.5 && !this.fill && this.cfg.candle.Type !== CandleType.OHLC) {
      let s = hilo ? 1 : -1;
      ctx.rect(
        Math.floor(x - hw),
        data.c,
        Math.floor(hw * 2),
        s * Math.max(h, max_h),
      );
      ctx.stroke();
    }
    else if (this.cfg.candle.Type === CandleType.OHLC) {
      ctx.beginPath();
      ctx.moveTo(x05 - hw, data.o);
      ctx.lineTo(x05, data.o);
      ctx.moveTo(x05, data.c);
      ctx.lineTo(x05 + hw, data.c);
      ctx.stroke();
    }
    else {
        ctx.strokeStyle = bodyColour;
        ctx.beginPath();
        ctx.moveTo(
            x05,
            Math.floor(Math.min(data.o, data.c)),
        );
        ctx.lineTo(
            x05,
            Math.floor(Math.max(data.o, data.c)) +
                (data.o === data.c ? 1 : 0)
        );
        ctx.stroke();
    }
    ctx.restore();
  }
  body(fill) {
  }
  area(data) {
    this.areaCoordinates.push(data);
  }
  areaRender() {
    const coords = this.areaCoordinates;
    if ( !isArray(coords) || coords.length == 0) return
    let ctx = this.ctx;
    let cfg = this.cfg.candle;
    let fill;
    Math.max(coords[0].w -1, 1);
    coords[0].x;
    let start = [coords[0].x, coords[0].h];
    ctx.save();
    ctx.strokeStyle = cfg.AreaLineColour || cfg.UpBodyColour || cfg.DnBodyColour;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].h);
    let i = 0;
    while ( i < coords.length) {
      ctx.lineTo(coords[i].x, coords[i].h);
      i++;
    }
    if (cfg?.Type == "area") {
      fill= ctx.createLinearGradient(0, 0, 0, this.scene.height);
      if (isArray(cfg.AreaFillColour)) {
        for (let [index, value] of cfg.AreaFillColour.entries()) {
          fill.addColorStop(index, value);
        }
      }
      else if (isString$1())
        fill = cfg.AreaFillColour;
      else
        fill = cfg.UpBodyColour || cfg.DnBodyColour;
      ctx.stroke();
      ctx.lineTo(coords[i-1].x, this.scene.height);
      ctx.lineTo(start[0], this.scene.height);
      ctx.fillStyle = fill;
      ctx.closePath();
      ctx.fill();
    }
    else
      ctx.stroke();
    ctx.restore();
    coords.length = 0;
  }
}

class chartCandles extends Overlay {
  #candle
  constructor(target, xAxis=false, yAxis=false, theme, parent) {
    super(target, xAxis=false, yAxis=false, theme, parent);
    this.#candle = new Candle(target.scene, theme);
  }
  set position(p) { this.target.setPosition(p[0], p[1]); }
  draw(range=this.core.range) {
    this.scene.clear();
    let render;
    let type = this.theme.candle.Type;
    switch (type) {
      case CandleType.AREA:
      case CandleType.LINE:
        render = (candle) => {this.#candle.area({...candle});};
        break;
      default:
        render = (candle) => {this.#candle.draw(candle);};
        break;
    }
    const offset = this.xAxis.smoothScrollOffset || 0;
    const candle = {
      x: offset - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o;
    let i = range.Length + (o * 2);
    let x;
    if (this.core.stream) {
      this.core.stream.lastPriceMax = range.valueMax;
      this.core.stream.lastPriceMin = range.valueMin;
    }
    while(i) {
      x = range.value( c );
      candle.x = this.xAxis.xPos(x[0]);
      if (x?.[7]) {
        this.core.stream.lastXPos = candle.x;
        this.core.stream.lastYPos = {
          o: candle.o,
          h: candle.h,
          l: candle.l,
          c: candle.c,
        };
        break
      }
      if (x[4] !== null) {
        candle.o = this.yAxis.yPos(x[1]);
        candle.h = this.yAxis.yPos(x[2]);
        candle.l = this.yAxis.yPos(x[3]);
        candle.c = this.yAxis.yPos(x[4]);
        candle.raw = x;
        render(candle);
      }
      c++;
      i--;
    }
    if (type === CandleType.AREA ||
        type === CandleType.LINE
      )
      this.#candle.areaRender();
  }
}

class chartStreamCandle extends Overlay {
  #candle
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    super(target, xAxis=false, yAxis=false, theme, parent, params);
    this.#candle = new Candle(target.scene, theme);
    this.theme.priceLineStyle = this.theme?.priceLineStyle || PriceLineStyle;
  }
  set position(p) { this.setPosition(p[0], p[1]); }
  setPosition(x, y) {
    if (this.core.stream === undefined) return
    this.target.setPosition(x, y);
    this.core.stream.lastScrollPos = this.core.scrollPos;
  }
  draw() {
    if (this.core.stream === undefined ||
        !isArray(this.chart.streamCandle)) return
    this.scene.clear();
    const r = this.core.range;
    const stream = this.chart.streamCandle;
    const render = (this.theme.candle.Type === CandleType.AREA ||
                    this.theme.candle.Type === CandleType.LINE ) ?
      (candle) => {this.areaRender(candle);} :
      (candle) => {this.#candle.draw(candle);};
    this.xAxis.smoothScrollOffset || 0;
    const pos = this.core.stream.lastXPos;
    const candle = {
      x: pos,
      w: this.xAxis.candleW
    };
    candle.o = this.yAxis.yPos(stream[1]);
    candle.h = this.yAxis.yPos(stream[2]);
    candle.l = this.yAxis.yPos(stream[3]);
    candle.c = this.yAxis.yPos(stream[4]);
    candle.raw = stream;
    if (r.inRenderRange(stream[0])) {
      render(candle);
    }
    if (stream[4] >= stream[1]) this.theme.priceLineStyle.strokeStyle = this.core.theme.candle.UpBodyColour;
    else this.theme.priceLineStyle.strokeStyle = this.core.theme.candle.DnBodyColour;
    renderHorizontalLine (
      this.scene.context,
      candle.c,
      0,
      this.target.width,
      this.theme.priceLineStyle
    );
  }
  areaRender(candle) {
    const r = this.core.range;
    const raw = r.value(r.data.length - 2);
    if (raw === null) return
    const prev = {
      x: this.xAxis.xPos(raw[0]),
      o: this.yAxis.yPos(raw[1]),
      h: this.yAxis.yPos(raw[2]),
      l: this.yAxis.yPos(raw[3]),
      c: this.yAxis.yPos(raw[4]),
    };
    const ctx = this.scene.context;
    const cfg = this.theme;
    const bodyColour = cfg.candle.UpBodyColour || cfg.candle.DnBodyColour;
    Math.max(candle.w -1, 1);
    candle.x;
    let fill;
    ctx.save();
    ctx.fillStyle = bodyColour;
    ctx.strokeStyle = bodyColour;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(candle.x, candle.c);
    ctx.lineTo(prev.x, prev.h);
    if (cfg.candle.Type === CandleType.AREA) {
      fill= ctx.createLinearGradient(0, 0, 0, this.scene.height);
      if (isArray(cfg.candle.AreaFillColour)) {
        for (let [index, value] of cfg.candle.AreaFillColour.entries()) {
          fill.addColorStop(index, value);
        }
      }
      else if (isString())
        fill = cfg.candle.AreaFillColour;
      else
        fill = cfg.candle.UpBodyColour || cfg.candle.DnBodyColour;
      ctx.stroke();
      ctx.lineTo(prev.x, this.scene.height);
      ctx.lineTo(candle.x, this.scene.height);
      ctx.fillStyle = fill;
      ctx.closePath();
      ctx.fill();
    }
    else
      ctx.stroke();
    ctx.restore();
  }
}

const watermark = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: GlobalStyle.FONTFAMILY,
  COLOUR: "#181818",
};
class chartWatermark extends Overlay {
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params);
    this.params.content = params?.content || "";
  }
  set position(p) { this.target.setPosition(0, 0); }
  draw() {
    let isText = isString$1(this.config?.watermark?.text);
    let isImage = isString$1(this.config?.watermark?.imgURL);
    if ( !isText && !isImage ) return
    this.scene.clear();
    const ctx = this.scene.context;
    ctx.save();
    if (isText) this.renderText();
    else if (isImage) this.renderImage();
    ctx.restore();
  }
  renderText() {
    const size = this.core.config?.watermark?.fontSize;
    const weight = this.core.config?.watermark?.fontWeight;
    const family = this.core.config?.watermark?.fontFamily;
    const colour = this.core.config?.watermark?.textColour;
    const options = {
      fontSize: size || watermark.FONTSIZE,
      fontWeight: weight || watermark.FONTWEIGHT,
      fontFamily: family || watermark.FONTFAMILY,
      txtCol: colour || watermark.COLOUR,
    };
    const txt = this.config.watermark.text;
    const ctx = this.scene.context;
    ctx.font = createFont(options?.fontSize, options?.fontWeight, options?.fontFamily);
    ctx.textBaseline = 'top';
    ctx.fillStyle = options.txtCol;
    const height = getTextRectHeight(options);
    const width = getTextRectWidth(ctx, txt, options);
    const x = (this.scene.width - width) / 2;
    const y = (this.scene.height - height) / 2;
    ctx.fillText(txt, x, y);
  }
  renderImage() {
    this.scene.context;
  }
}

var stateMachineConfig$4 = {
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter (data) {
        this.context.origin.setCursor("crosshair");
      },
      onExit (data) {
      },
      on: {
        xAxis_scale: {
          target: 'xAxis_scale',
          action (data) {
          },
        },
        chart_yAxisRedraw: {
          target: 'chart_yAxisRedraw',
          action (data) {
          },
        },
        chart_tool: {
          target: 'chart_tool',
          action (data) {
          },
        },
        tool_activated: {
          target: 'tool_activated',
          action (data) {
            this.context.origin.setCursor("default");
          },
        },
      }
    },
    xAxis_scale: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
          },
        },
      }
    },
    chart_yAxisRedraw: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'yAxisRedraw',
          action (data) {
            this.context.origin.drawGrid();
          },
        },
      }
    },
    tool_activated: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        tool_targetSelected: {
          target: 'idle',
          condition: 'toolSelectedThis',
          action (data) {
            console.log("tool_targetSelected:", data);
          },
        },
      }
    },
  },
  guards: {
    priceMaxMin () { return true },
    toolSelectedThis (conditionType, condition) {
      if (this.eventData === this.context)
        return true
      else
        return false
     },
    yAxisRedraw () { return true },
    zoomDone () { return true },
  }
};

const defaultOverlays$2 = [
  ["watermark", {class: chartWatermark, fixed: true, required: true, params: {content: null}}],
  ["grid", {class: chartGrid, fixed: true, required: true, params: {axes: "y"}}],
  ["volume", {class: chartVolume, fixed: false, required: true, params: {maxVolumeH: VolumeStyle.ONCHART_VOLUME_HEIGHT}}],
  ["candles", {class: chartCandles, fixed: false, required: true}],
  ["stream", {class: chartStreamCandle, fixed: false, required: true}],
  ["cursor", {class: chartCursor, fixed: true, required: true}]
];
class OnChart extends Chart {
  #onChart
  #chartXPadding = 5
  #chartYPadding = 2.5
  #yAxisDigits
  #pricePrecision
  #volumePrecision
  #layerStream
  #chartStreamCandle
  #streamCandle
  constructor (core, options) {
    options.type = "onChart";
    super(core, options);
    this.#onChart = core.onChart;
    this.init(options);
  }
  set state(s) { this.core.setState(s); }
  get state() { return this.core.getState() }
  get data() { return this.core.chartData }
  get streamCandle() { return this.#streamCandle }
  get onChart() { return this.#onChart }
  set priceDigits(digits) { this.setYAxisDigits(digits); }
  get priceDigits() { return this.#yAxisDigits || PRICEDIGITS }
  get indicators() { return this.overlays }
  init(options) {
    let chartLegend = {
      id: "chart",
      title: this.title,
      type: "chart",
      source: this.legendInputs.bind(this)
    };
    this.legend = new Legends(this.elLegend, this);
    this.legend.add(chartLegend);
    const opts = {...options};
    opts.parent = this;
    opts.chart = this;
    opts.elScale = this.elScale;
    opts.legends = this.legend;
    opts.yAxisType = "default";
    this.scale = new ScaleBar(this.core, opts);
    this.log(`${this.name} instantiated`);
  }
  start() {
    super.start(stateMachineConfig$4);
    this.eventsListen();
    this.addOverlays(this.core.onChart);
    if (isObject(this.Stream)) {
      ({stream: this.Stream});
    }
  }
  end() {
    this.off("chart_yAxisRedraw", this.onYAxisRedraw);
    super.end();
  }
  eventsListen() {
    super.eventsListen();
    this.on("chart_yAxisRedraw", this.onYAxisRedraw.bind(this));
  }
  onStreamUpdate(candle) {
    this.#streamCandle = candle;
    this.#chartStreamCandle.draw();
    this.#layerStream.setPosition(this.core.stream.lastScrollPos, 0);
    this.graph.render();
    this.updateLegends(this.cursorPos, candle);
  }
  onYAxisRedraw() {
    this.scale.draw();
    this.draw(this.range, true);
  }
  setDimensions(dim) {
    super.setDimensions(dim);
    this.draw(this.range, true);
  }
  setYAxisDigits(digits) {
    this.#yAxisDigits = (isNumber(digits) && digits >= 3) ? parseInt(digits) : PRICEDIGITS;
  }
  getPriceDigits() {
    return this.#yAxisDigits
  }
  loadData(data) {}
  updateData(data) {}
  createGraph() {
    let overlays = new Map(copyDeep(defaultOverlays$2));
    if (overlays.has("volume")) {
      const volume = overlays.get("volume");
      volume.params.maxVolumeH = this.theme?.volume?.Height || VolumeStyle.ONCHART_VOLUME_HEIGHT;
      overlays.set("volume", volume);
    }
    overlays = Array.from(overlays);
    this.graph = new graph(this, this.elViewport, overlays, false);
    this.#layerStream = this.graph.overlays.get("stream").layer;
    this.#chartStreamCandle = this.graph.overlays.get("stream").instance;
  }
  addOverlays(overlays) {
    for (let o of overlays) {
      const config = {fixed: false, required: false};
      if (o.type in this.core.indicators) {
        config.class = this.core.indicators[o.type].ind;
        config.params = {
          overlay: o,
        };
        this.overlays.set(o.name, config);
      }
    }
    const r = this.graph.addOverlays(Array.from(this.overlays));
    for (let o of r) {
      if (!o[0]) this.overlays.delete(o[0]);
    }
  }
  refresh() {
    this.scale.draw();
    this.draw(this.range, true);
  }
  time2XPos(time) {
    return this.time.xPos(time)
  }
  price2YPos(price) {
    return this.scale.yPos(price)
  }
  setPriceVolumePrecision (pricePrecision) {
    if (!isNumber(pricePrecision) || pricePrecision < 0) {
      this.warning('setPriceVolumePrecision', 'pricePrecision', 'pricePrecision must be a number and greater than zero!!!');
      return
    }
    this.#pricePrecision = pricePrecision;
  }
  setPriceVolumePrecision (volumePrecision) {
    if (!isNumber(volumePrecision) || volumePrecision < 0) {
      logWarn('setPriceVolumePrecision', 'volumePrecision', 'volumePrecision must be a number and greater than zero!!!');
      return
    }
    this.#volumePrecision = volumePrecision;
  }
  legendInputs(pos=this.cursorPos, candle) {
        pos = this.cursorPos;
    let inputs = {};
    let colours = [];
    let labels = [true, true, true, true, true];
    let index = this.time.xPos2Index(pos[0] - this.core.scrollPos);
        index = limit(index, 0, this.range.data.length - 1);
    let ohlcv = this.range.data[index];
    if (ohlcv[4] >= ohlcv[1]) colours = new Array(5).fill(this.theme.candle.UpWickColour);
    else colours = new Array(5).fill(this.theme.candle.DnWickColour);
    inputs.O = this.scale.nicePrice(ohlcv[1]);
    inputs.H = this.scale.nicePrice(ohlcv[2]);
    inputs.L = this.scale.nicePrice(ohlcv[3]);
    inputs.C = this.scale.nicePrice(ohlcv[4]);
    inputs.V = this.scale.nicePrice(ohlcv[5]);
    return {inputs, colours, labels}
  }
}

var stateMachineConfig$3 = {
  id: "offChart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        this.context.origin.setCursor("crosshair");
      },
      onExit(data) {
      },
      on: {
        chart_tool: {
          target: 'chart_tool',
          action (data) {
          },
        },
        xAxis_scale: {
          target: 'xAxis_scale',
          action (data) {
          },
        },
        offChart_mouseDown: {
          target: 'offChart_mouseDown',
          action (data) {
          },
        },
        offChart_mouseUp: {
          target: 'offChart_mouseUp',
          action (data) {
          },
        },
        tool_activated: {
          target: 'tool_activated',
          action (data) {
            this.context.origin.setCursor("default");
          },
        },
      }
    },
    xAxis_scale: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
          },
        },
      }
    },
    offChart_mouseDown: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
          },
        },
      }
    },
    offChart_mouseUp: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        Idle: {
          target: 'idle',
          action (data) {
          },
        },
      }
    },
    tool_activated: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        tool_targetSelected: {
          target: 'idle',
          condition: 'toolSelectedThis',
          action (data) {
            console.log("tool_targetSelected:", data);
          },
        },
      }
    },
  },
  guards: {
    zoomDone () { return true },
    toolSelectedThis (conditionType, condition) {
      if (this.eventData === this.context)
        return true
      else
        return false
     },
  }
};

const defaultOverlays$1 = [
  ["grid", {class: chartGrid, fixed: true, required: true, params: {axes: "y"}}],
  ["cursor", {class: chartCursor, fixed: true, required: true}]
];
class OffChart extends Chart {
  #ID
  #offChartID
  #Indicator
  #IndicatorParams
  #overlay
  #Divider
  #layerStream
  #layersIndicator
  #overlayIndicators = new Map()
  #overlayIndicator
  #streamCandle
  #localRange = {
    valueMax: 100,
    valueMin: 0,
    valueDiff: 100
  }
  #input
  constructor (core, options) {
    options.type = "offChart";
    super(core, options);
    this.#ID = this.options.offChartID || uid("TX_OC_");
    this.#overlay = options.offChart;
    this.overlays.set(options.offChart.name, options.offChart);
    this.init(options);
  }
  get elOffChart() { return this.element }
  get widgets() { return this.core.WidgetsG }
  get offChartID() { return this.#offChartID }
  get localRange() { return this.#localRange }
  get data() {}
  get Divider() { return this.#Divider }
  init(options) {
    const opts = {...options};
    opts.parent = this;
    opts.chart = this;
    opts.elScale = this.elScale;
    this.#Indicator = this.core.indicators[this.#overlay.type].ind;
    opts.yAxisType = this.#Indicator.scale;
    this.scale = new ScaleBar(this.core, opts);
    this.time = this.core.Timeline;
  }
  start(index) {
    this.#offChartID = index;
    super.start(stateMachineConfig$3);
    this.eventsListen();
    const oc = this;
    const config = { offChart: oc };
    this.#Divider = this.widgets.insert("Divider", config);
    this.#Divider.start();
    let instance = this.#overlayIndicator;
    let offChartLegend = {
      id: this.options.offChart.type,
      title: this.options.offChart.name,
      type: this.options.offChart.type,
      source: instance.legendInputs.bind(instance)
    };
    this.legend = new Legends(this.elLegend, this);
    this.legend.add(offChartLegend);
  }
  end() {
    this.#Divider.end();
    super.end();
  }
  eventsListen() {
    super.eventsListen();
  }
  onStreamUpdate(candle) {
    this.#streamCandle = candle;
    this.graph.render();
    this.updateLegends();
  }
  setDimensions(dim) {
    super.setDimensions(dim);
    this.draw(undefined, true);
  }
  createGraph() {
    const indicator = [this.#overlay.name, {class: this.#Indicator, fixed: false, required: false, params: {overlay: this.#overlay}}];
    const overlays = copyDeep(defaultOverlays$1);
          overlays.splice(1, 0, indicator);
    this.graph = new graph(this, this.elViewport, overlays);
    this.#overlayIndicator = this.graph.overlays.get(this.#overlay.name).instance;
  }
  refresh() {
    this.scale.draw();
    this.draw();
  }
}

var stateMachineConfig$2 = {
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
      },
      onExit(data) {
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
          },
        },
        setRange: {
          target: 'setRange',
          action (data) {
          },
        },
        chart_scrollTo: {
          target: 'chart_scrollTo',
          action (data) {
          },
        },
        addIndicator: {
          target: 'addIndicator',
          action (data) {
          },
        },
        divider_pointerdrag: {
          target: 'divider_pointerdrag',
          action (data) {
          },
        },
        global_resize: {
          target: 'global_resize',
          action (data) {
          },
        },
      }
    },
    chart_pan: {
      onEnter (data) {
        this.context.origin.setCursor("grab");
      },
      onExit (data) {
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            this.context.origin.updateRange(data);
            this.context.origin.setCursor("grab");
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            this.context.origin.updateRange(data);
            this.context.origin.setCursor("default");
          },
        },
      }
    },
    setRange: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            this.context.origin.zoomRange(data);
          },
        },
      }
    },
    chart_scrollTo: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        always: {
          target: 'idle',
          action (data) {
            this.context.origin.updateRange(data);
          },
        },
      }
    },
    addIndicator: {
      onEnter(data) {
        this.context.origin.addIndicator(data);
      },
      onExit(data) {
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action (data) {
          },
        }
      }
    },
    divider_mousedown: {
      onEnter(data) {
        this.context.divider = data;
      },
      onExit(data) {
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "divider_mousemove"`);
          },
        },
      }
    },
    divider_mousemove: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`);
        let divider = this.context.divider;
        this.context.pair = this.context.origin.resizeRowPair(divider, data);
      },
      onExit(data) {
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action (data) {
          },
        },
        main_mouseup: {
          target: "idle",
          action (data) {
            this.actions.removeProperty.call(this);
          },
        },
        divider_mouseup: {
          target: "idle",
          action (data) {
            this.actions.removeProperty.call(this);
            console.log(`${this.id}: transition from "${this.state}" to "ilde"`);
          },
        }
      }
    },
    divider_pointerdrag: {
      onEnter(data) {
        const pos = [
          data.e.dragstart.x, data.e.dragstart.y,
          data.e.dragend.x, data.e.dragend.y,
          data.e.movement.x, data.e.movement.y
        ];
        this.context.pair = this.context.origin.resizeRowPair(data, pos);
      },
      onExit(data) {
      },
      on: {
        divider_pointerdrag: {
          target: "divider_pointerdrag",
          action (data) {
          },
        },
        divider_pointerdragend: {
          target: "idle",
          action (data) {
            this.actions.removeProperty.call(this);
          },
        },
      }
    },
    global_resize: {
      onEnter(data) {
        this.context.origin.setDimensions();
      },
      onExit(data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'resizeDone',
          action (data) {
          },
        },
      },
    }
  },
  guards: {
    zoomDone () { return true },
    resizeDone () { return true },
  },
  actions: {
    removeProperty () {
      let active = this.context.pair.active,
      prev = this.context.pair.prev;
      active.element.style.removeProperty('user-select');
      prev.element.style.removeProperty('user-select');
    }
  }
};

const defaultOverlays = [
  ["grid", {class: chartGrid, fixed: false, required: true, params: {axes: "x"}}],
];
class MainPane {
  #name = "MainPane"
  #shortName = "Main"
  #options
  #parent
  #core
  #stateMachine
  #elYAxis
  #elMain
  #elRows
  #elTime
  #elChart
  #elScale
  #elOffCharts = []
  #elYAxisScales = []
  #elGrid
  #elCanvas
  #elViewport
  #elements
  #Graph
  #viewport
  #layerGrid
  #layerWatermark
  #OffCharts = new Map()
  #Chart
  #Time
  #chartGrid
  #offChartDefaultH = OFFCHARTDEFAULTHEIGHT
  #offChartDefaultWpx = 120
  #rowMinH = ROWMINHEIGHT
  #cursorPos = [0, 0]
  #drag = {
    active: false,
    start: [0,0],
    prev: [0,0],
    delta: [0,0]
  }
  #buffer
  #indicators
  #controller
  #input
  constructor (core, options) {
    this.#core = core;
    this.#options = options;
    this.#parent = core;
    this.#elMain = this.#core.elMain;
    this.#elYAxis = this.#core.elYAxis;
    this.init(options);
  }
  log(l) { this.#core.log(l); }
  info(i) { this.#core.info(i); }
  warning(w) { this.#core.warn(w); }
  error(e) { this.#core.error(e); }
  get id() { return `${this.#core.id}.${this.#name}` }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get core() { return this.#core }
  get chart() { return this.#Chart }
  get time() { return this.#Time }
  get offCharts() { return this.#OffCharts }
  get options() { return this.#options }
  get element() { return this.#elMain }
  get width() { return this.#elMain.getBoundingClientRect().width }
  get height() { return this.#elMain.getBoundingClientRect().height }
  get chartW() { return this.#elChart.getBoundingClientRect().width }
  get chartH() { return this.#elChart.getBoundingClientRect().height }
  get rowsW() { return this.#elRows.getBoundingClientRect().width }
  get rowsH() { return this.#elRows.getBoundingClientRect().height }
  get rowMinH() { return this.#rowMinH }
  set rowMinH(h) { if (isNumber(h)) this.#rowMinH = Math.abs(h); }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elMain) }
  get range() { return this.#core.range }
  get cursorPos() { return this.#cursorPos }
  get candleW() { return this.#Time.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get buffer() { return this.#buffer }
  get bufferPx() { return this.getBufferPx() }
  get scrollPos() { return this.#core.scrollPos }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this); }
  get stateMachine() { return this.#stateMachine }
  get graph() { return this.#Graph }
  get indicators() { return {
    onchart: this.#Chart.indicators,
    offchart: this.#OffCharts
  } }
  get elements() {
    return {
      elTarget: this.#elChart,
      elTime: this.#elTime,
      elRows: this.#elRows,
      elChart: this.#elChart,
      elOffCharts: this.#elOffCharts,
      elScale: this.#elScale
    }
  }
  init(options) {
    this.#core;
    this.#indicators = this.#core.indicators;
    this.#elRows = this.#elMain.rows;
    this.#elTime = this.#elMain.time;
    this.#elChart = this.#elMain.rows.onChart;
    this.#elGrid = this.#elMain.rows.grid;
    this.#elViewport = this.#elMain.viewport;
    this.#elScale = this.#core.elBody.scale;
    options.name = "Chart";
    options.shortName = "Chart";
    options.parent = this;
    options.chartData = this.#core.chartData;
    options.onChart = this.#core.onChart;
    options.offChart = this.#core.offChart;
    options.rangeLimit = this.#core.rangeLimit;
    options.settings = this.#core.settings;
    options.elements =
      {...options.elements,
        ...{
          elTarget: this.#elChart,
          elTime: this.#elTime,
          elRows: this.#elRows,
          elChart: this.#elChart,
          elOffCharts: this.#elOffCharts,
          elScale: this.#elScale
        }
      };
    this.#Time = new Timeline(this.#core, options);
    this.#Chart = new OnChart(this.#core, options);
    this.registerOffCharts(options);
    this.#buffer = isNumber(this.config.buffer)? this.config.buffer : BUFFERSIZE$1;
    this.#rowMinH = isNumber(this.config.rowMinH)? this.config.rowMinH : ROWMINHEIGHT;
    this.#offChartDefaultH = isNumber(this.config.offChartDefaultH)? this.config.offChartDefaultH : OFFCHARTDEFAULTHEIGHT;
    this.rowsOldH = this.rowsH;
    this.log(`${this.#name} instantiated`);
  }
  start() {
    let i = 0;
    this.#elMain.start(this.theme);
    this.#Time.start();
    this.#Chart.start();
    this.#OffCharts.forEach((offChart, key) => {
      offChart.start(i++);
    });
    this.rowsOldH = this.rowsH;
    this.createGraph();
    this.draw(this.range, true);
    renderLoop.init({
      graphs: [this.#Graph],
      range: this.range
    });
    renderLoop.start();
    renderLoop.queueFrame(this.range, [this.#Graph], false);
    this.eventsListen();
    stateMachineConfig$2.id = this.id;
    this.stateMachine = stateMachineConfig$2;
    this.stateMachine.start();
  }
  end() {
    this.stateMachine.destroy();
    this.#Time.end();
    this.#Chart.end();
    this.#OffCharts.forEach((offChart, key) => {
      offChart.end();
    });
    this.#viewport.destroy();
    this.#input.off("wheel", this.onMouseWheel);
    this.#input.off("pointerdrag", this.onChartDrag);
    this.#input.off("pointerdragend", this.onChartDragDone);
    this.#input.off("pointermove", this.onMouseMove);
    this.#input.off("pointerenter", this.onMouseEnter);
    this.#input.off("pointerout", this.onMouseOut);
    this.#input.off("keydown", this.onChartKeyDown);
    this.#input.off("keyup", this.onChartKeyDown);
    this.#input = null;
    this.off(STREAM_NEWVALUE, this.onNewStreamValue);
    this.off("setRange", this.draw);
  }
  eventsListen() {
    this.#elRows.tabIndex = 0;
    this.#elRows.focus();
    this.#input = new Input(this.#elRows, {disableContextMenu: false});
    this.#input.on("keydown", this.onChartKeyDown.bind(this));
    this.#input.on("keyup", this.onChartKeyUp.bind(this));
    this.#input.on("wheel", this.onMouseWheel.bind(this));
    this.#input.on("pointermove", this.onMouseMove.bind(this));
    this.#input.on("pointerenter", this.onMouseEnter.bind(this));
    this.#input.on("pointerout", this.onMouseOut.bind(this));
    this.on(STREAM_FIRSTVALUE, this.onFirstStreamValue.bind(this));
    this.on(STREAM_NEWVALUE, this.onNewStreamValue.bind(this));
    this.on("setRange", this.draw.bind(this));
    this.on("scrollUpdate", this.draw.bind(this));
    this.on("chart_render", this.draw.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMouseWheel(e) {
    e.domEvent.preventDefault();
    const direction = Math.sign(e.wheeldelta) * -1;
    const range = this.range;
    const newStart = range.indexStart - Math.floor(direction * XAXIS_ZOOM * range.Length);
    const newEnd = range.indexEnd + Math.ceil(direction * XAXIS_ZOOM * range.Length);
    this.#core.setRange(newStart, newEnd);
    this.draw(this.range, true);
  }
  onMouseMove(e) {
    this.#cursorPos = [
      e.position.x, e.position.y,
      e.dragstart.x, e.dragstart.y,
      e.movement.x, e.movement.y
    ];
    this.core.Chart.graph.overlays.list.get("cursor").layer.visible = true;
    for (let [key, offChart] of this.offCharts) {
      offChart.graph.overlays.list.get("cursor").layer.visible = true;
    }
    this.emit("main_mousemove", this.#cursorPos);
  }
  onMouseEnter(e) {
    this.core.Timeline.showCursorTime();
    this.core.Chart.graph.overlays.list.get("cursor").layer.visible = true;
    this.core.Chart.graph.render();
    for (let [key, offChart] of this.offCharts) {
      offChart.graph.overlays.list.get("cursor").layer.visible = true;
      offChart.graph.render();
    }
  }
  onMouseOut(e) {
    this.core.Timeline.hideCursorTime();
    this.onPointerActive(false);
    this.core.Chart.graph.overlays.list.get("cursor").layer.visible = false;
    this.core.Chart.graph.render();
    for (let [key, offChart] of this.offCharts) {
      offChart.graph.overlays.list.get("cursor").layer.visible = false;
      offChart.graph.render();
    }
    this.draw();
  }
  onChartDrag(e) {
    const d = this.#drag;
    if (!d.active) {
      d.active = true;
      d.start = [e.dragstart.x, e.dragstart.y];
      d.prev = d.start;
      d.delta = [e.movement.x, e.movement.y];
    }
    else {
      d.delta = [
        e.position.x - d.prev[0],
        e.position.y - d.prev[1]
      ];
      d.prev = [
        e.position.x,
        e.position.y
      ];
    }
    this.#cursorPos = ([
      e.position.x, e.position.y,
      ...d.start,
      ...d.delta
    ]);
    this.emit("chart_pan", this.#cursorPos);
  }
  onChartDragDone(e) {
    const d = this.#drag;
    d.active = false;
    d.delta = [ 0, 0 ];
    this.#cursorPos = [
      ...d.prev,
      ...d.start,
      ...d.delta
    ];
    this.emit("chart_panDone", this.#cursorPos);
  }
  onChartKeyDown(e) {
    let step = (this.candleW > 1) ? this.candleW : 1;
    switch (e.key) {
      case "ArrowLeft":
        this.emit("chart_pan", [0,null,step,null,step * -1,null]);
        break;
      case "ArrowRight":
        this.emit("chart_pan", [step,null,0,null,step,null]);
        break;
    }
  }
  onChartKeyUp(e) {
    let step = (this.candleW > 1) ? this.candleW : 1;
    switch (e.key) {
      case "ArrowLeft":
        this.emit("chart_panDone", [0,null,step,null,step * -1,null]);
        break;
      case "ArrowRight":
        this.emit("chart_panDone", [step,null,0,null,step,null]);
        break;
    }
  }
  onFirstStreamValue(value) {
    this.chart.scale.xAxis.calcXAxisGrads(this.range,);
    this.draw(this.range, true);
  }
  onNewStreamValue(value) {
  }
  onPointerActive(chart) {
    if (chart) {
      chart.cursorActive = true;
      chart.scale.layerCursor.visible = true;
    }
    if (chart !== this.chart) {
      this.chart.cursorActive = false;
      this.chart.scale.layerCursor.visible = false;
      this.chart.scale.layerCursor.erase();
    }
    this.#OffCharts.forEach((offChart, key) => {
      if (chart !== offChart) {
        offChart.cursorActive = false;
        offChart.scale.layerCursor.visible = false;
        offChart.scale.layerCursor.erase();
      }
    });
  }
  mount(el) {
    this.#elYAxis.innerHTML = this.scaleNode(CLASS_CHART);
    this.#elYAxis.querySelector(`.${CLASS_CHART}`).style.height = "100%";
    this.#elYAxis.querySelector(`.${CLASS_CHART} tradex-scale`).style.height = "100%";
  }
  setWidth(w) {
  }
  setHeight(h) {
  }
  setDimensions() {
    this.#elRows.previousDimensions();
    let resizeH = this.#elRows.heightDeltaR;
    let chartH = Math.round(this.chartH * resizeH);
    let width = this.rowsW;
    let height = this.rowsH;
    let layerWidth = Math.round(width * ((100 + this.#buffer) * 0.01));
    let dimensions = {
      resizeH: resizeH,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW,
    };
console.log(`oHeight: ${this.#elRows.oHeight}`);
console.log(`rowsH: ${this.#elRows.height}`);
console.log(`resizeH: ${resizeH}`);
console.log(`width: ${width}`);
console.log(`height: ${height}`);
console.log(`dimensions${dimensions}`);
    if (this.#OffCharts.size == 0 &&
      chartH != this.#elRows.height) chartH = this.#elRows.height;
    this.#core.scrollPos = -1;
    this.#Time.setDimensions({w: width});
    this.#Graph.setSize(width, height, layerWidth);
    this.#Chart.setDimensions({w: width, h: chartH});
    this.#OffCharts.forEach((offChart, key) => {
      chartH = Math.round(offChart.viewport.height * resizeH);
      offChart.setDimensions({w: width, h: chartH});
      offChart.Divider.setDividerPos();
    });
    this.rowsOldH = this.rowsH;
    this.draw(this.range, true);
    this.emit("rowsResize", dimensions);
  }
  getBufferPx() {
    let w = Math.round(this.width * this.buffer / 100);
    let r = w % this.candleW;
    return w - r
  }
  setCursor(cursor) {
    this.element.style.cursor = cursor;
  }
  registerOffCharts(options) {
    this.#elRows.previousDimensions();
    if (this.#core.offChart.length === 0) return
    for (const [i, o] of this.#core.offChart.entries()) {
      if (o.type in this.core.indicators) continue
      this.#core.log(`offChart indicator ${this.#core.offChart.type} not added: not supported.`);
      this.#core.offChart.splice(i, 1);
    }
    let a = this.#offChartDefaultH * this.#core.offChart.length,
    offChartsH = ( a / Math.log10( a * 2 ) ) / 100,
    rowsH = Math.round(this.rowsH * offChartsH);
    options.offChartsH = offChartsH;
    if (this.#core.offChart.length === 1) {
      options.rowH = Math.round(this.rowsH * this.#offChartDefaultH / 100);
      options.chartH = this.rowsH - options.rowH;
    }
    else {
      options.rowH = Math.round(rowsH / this.#OffCharts.size);
      options.chartH = this.rowsH - rowsH;
      options.height = options.rowH;
    }
    options.chartH / this.rowsH * 100;
    this.#elChart.style.height = `${options.chartH}px`;
    this.#Chart.scale.element.style.height = `${options.chartH}px`;
    for (let o of this.#core.offChart) {
      options.rowY = options.chartH;
      this.addOffChart(o, options);
      options.rowY = options.chartH + options.rowH;
    }
  }
  addOffChart(offChart, options) {
    let rowEl, row;
    this.#elRows.insertAdjacentHTML("beforeend", this.#elMain.rowNode(offChart.type, this.#core));
    rowEl = this.#elRows.lastElementChild;
    this.#elOffCharts.push(rowEl);
    row = this.#elRows.offChartSlot.assignedElements().slice(-1)[0];
    row.style.height = `${options.rowH}px`;
    row.style.width = `100%`;
    let axisEl, axis;
    this.#elYAxis.insertAdjacentHTML("beforeend", this.scaleNode(offChart.type));
    axisEl = this.#elYAxis.lastElementChild;
    this.#elYAxisScales.push(axisEl);
    axis = this.#elYAxis.offChartSlot.assignedElements().slice(-1)[0];
    axis.style.height = `${options.rowH}px`;
    axis.style.width = `100%`;
    options.elements.elTarget = row;
    options.elements.elScale = axis;
    options.offChart = offChart;
    options.name = "OffChart";
    options.shortName = "offChart";
    let o = new OffChart(this.#core, options);
    this.#OffCharts.set(o.id, o);
    this.emit("addOffChart", o);
  }
  addIndicator(ind) {
    const indicator = this.#indicators[ind].ind;
    console.log("indicator:",indicator);
  }
  scaleNode(type) {
    const styleRow = STYLE_ROW + ` width: 100%; border-top: 1px solid ${this.theme.chart.BorderColour};`;
    const node = `
    <div slot="offchart" class="viewport ${type}" style="$${styleRow}"></div>
  `;
    return node
  }
  createGraph() {
    let overlays = copyDeep(defaultOverlays);
    this.#Graph = new graph(this, this.#elViewport, overlays);
  }
  draw(range=this.range, update=false) {
    const graphs = [
      this.#Graph,
      this.#Time,
      this.#Chart
    ];
    this.time.xAxis.doCalcXAxisGrads(range);
    this.#OffCharts.forEach((offChart, key) => {
      graphs.push(offChart);
    });
    renderLoop.queueFrame(
      this.range,
      graphs,
      update);
  }
  updateRange(pos) {
    this.#core.updateRange(pos);
  }
  zoomRange() {
    this.draw(this.range, true);
  }
  resizeRowPair(divider, pos) {
    let active = divider.offChart;
    let ID = active.id;
    let offCharts = [...this.#OffCharts.keys()];
    let i = offCharts.indexOf(ID);
    let prev = (i == 0) ?
      this.#Chart :
      this.#OffCharts.get(offCharts[i]);
    let activeH = active.height - pos[5] - 1;
    let prevH  = prev.height + pos[5];
    if ( activeH >= this.#rowMinH
        && prevH >= this.#rowMinH) {
          divider.offChart.Divider.updateDividerPos(pos);
          active.setDimensions({w:undefined, h:activeH});
          prev.setDimensions({w:undefined, h:prevH});
    }
    active.element.style.userSelect = 'none';
    prev.element.style.userSelect = 'none';
    return {active, prev}
  }
}

const camera =
  `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>`;
const chart =
  `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>`;
const clock =
  `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>`;
const config =
  `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>`;
const cursor =
  `<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>`;
const del =
  `<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>`;
const fibonacci =
  `<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>`;
const line =
  `<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>`;
const measure =
  `<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>`;
const range =
  `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>`;
const text =
  `<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>`;
const close =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>`;
const up =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>`;
const down =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>`;
const restore =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>`;
const maximize =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>`;
const collapse =
  `<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>`;
const fwdEnd =
  `<svg class="ov-icon" width="46.08" height="46.08" font-size="2.88em" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>`;
const rwdStart =
  `<svg class="ov-icon" width="46.08" height="46.08" font-size="2.88em" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>`;

const iconW = 20;
const iconH = 20;
const handleColour = new Colour(GlobalStyle.COLOUR_BORDER);
const template$c = document.createElement('template');
template$c.innerHTML = `
<style>
  .scrollBarWidget {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 2px;
  }
  .scrollBar {
    position: relative;
    border: 1px solid var(--txc-time-scrollbar-color, ${GlobalStyle.COLOUR_BORDER});
    height: 20px;
    border-radius: 3px;
    flex-basis: 100%;
    overflow: hidden;
  }
  .scrollBar input {
    pointer-events: none;
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    width: 100%;
    outline: none;
    height: 100%;
    margin: 0;
    padding: 0;
    background:  var(--txc-time-slider-color, #555);

  }
  .scrollBar input::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none; 
    pointer-events: auto;
    position: relative;
    z-index: 10;
    outline: 0;
    height: 100%;
  }
  .scrollBar input::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    appearance: none; 
    pointer-events: auto;
    position: relative;
    z-index: 1;
    height: 100%;
  }
  .scrollBar input::-moz-range-track {
    position: relative;
    z-index: -1;
    background-color: rgba(0, 0, 0, 1);
    border: 0;
  }
  .scrollBar input:last-of-type::-moz-range-track {
    -moz-appearance: none;
    background: none transparent;
    border: 0;
  }
  .scrollBar input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none !important;
    appearance: none;
    background: none transparent;
    cursor: default;
    height: 1px; /* Required for Samsung internet based browsers */
    outline: 0;
  }
  .scrollBar input[type=range]::-moz-focus-outer {
    border: 0;
  }
  input[type=range] {
    -webkit-appearance: none;
    background: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
    height: 5px;
    border: none;
    border-radius: 3px;
    background: transparent;
  }

  input[type=range]::-ms-track {
    height: 5px;
    background: transparent;
    border: none;
    border-radius: 3px;
  }

  input[type=range]::-moz-range-track {
    height: 5px;
    background: transparent;
    border: none;
    border-radius: 3px;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 16px;
    border-radius: 3px;
    background: var(--txc-time-slider-color, #555);
    margin-top: -10px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]::-ms-thumb {
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 16px;
    border-radius: 3px;
    background:  var(--txc-time-slider-color, #555);
    margin-top: -5px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]::-moz-range-thumb {
    -webkit-appearance: none;
    border: none;
    height: 100%;
    width: 16px;
    border-radius: 3px;
    background:  var(--txc-time-slider-color, #555);
    margin-top: -5px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]:focus {
    outline: none;
  }

  .handle {
    background-color: var(--txc-time-handle-color, ${handleColour.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${iconW}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${GlobalStyle.COLOUR_ICON});
    width: ${iconW}px;
    height: ${iconH}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${GlobalStyle.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${rwdStart}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${fwdEnd}</span>
</div>
`;
class tradeXOverview extends element {
  #template
  constructor () {
    super(template$c);
    this.#template = template$c;
  }
  destroy() {
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = false;
      this.shadowRoot.appendChild(this.#template.content.cloneNode(true));
      document.getElementById('slider-bar');
      this.max.addEventListener('input', this.onChangeSliderHandler.bind({self: this, input: this.max}));
      this.min.addEventListener('input', this.onChangeSliderHandler.bind({self: this, input: this.min}));
    }
  }
  disconnectedCallback() {
  }
  get scrollBarWidget() { return this.shadowRoot.querySelector('.scrollBarWidget') }
  get rwdStart() { return this.shadowRoot.querySelector('.rwdStart') }
  get fwdEnd() { return this.shadowRoot.querySelector('.fwdEnd') }
  get scrollBar() { return this.shadowRoot.querySelector('.scrollBar') }
  get viewport() { return this.shadowRoot.querySelector('.viewport') }
  get handle() { return this.shadowRoot.querySelector('.handle') }
  get icons() { return this.shadowRoot.querySelectorAll('svg') }
  get max() { return this.shadowRoot.querySelector('#max') }
  get min() { return this.shadowRoot.querySelector('#min') }
  get sliders() { return this.shadowRoot.querySelectorAll('input') }
  get overviewCSS() { return this.shadowRoot.querySelector('style[title=overview]') }
  onChangeSliderHandler() {
    console.log(`${this.input.value}, ${this.input.getAttribute('max')}`);
  }
}

customElements.get('tradex-overview') || window.customElements.define('tradex-overview', tradeXOverview);
const template$b = document.createElement('template');
template$b.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: 50%;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class tradeXTime extends element {
  constructor () {
    super(template$b);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  createGraph() {
  }
  get viewport() { return this.shadowRoot.querySelector('.viewport') }
  get overview() { return this.shadowRoot.querySelector('tradex-overview') }
}
customElements.get('tradex-time') || window.customElements.define('tradex-time', tradeXTime);

const template$a = document.createElement('template');
template$a.innerHTML = `
<style>
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <div class="viewport"></div>
`;
class tradeXGrid extends element {
  constructor () {
    super(template$a);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get viewport() { return this.shadowRoot.querySelector('.viewport') }
}
customElements.get('tradex-grid') || window.customElements.define('tradex-grid', tradeXGrid);

const template$9 = document.createElement('template');
template$9.innerHTML = `
<style>
  ::slotted(.legend) {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    white-space: nowrap;
    width: calc(100% - 1em); 
    margin: 0 0 0 1em;
    text-align: left;
  }
</style>
<div class="legends">
  <slot name="legend"></slot>
</div>
`;
class tradeXLegend extends element {
  #title
  #elLegend
  #elTitle
  #elInputs
  #elControls
  constructor () {
    super(template$9);
  }
  destroy() {
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = false;
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
      this.style.display = "block";
      this.#elLegend = this.shadowRoot.querySelector('.legend');
      this.#elTitle = this.shadowRoot.querySelector('.title');
      this.#elInputs = this.shadowRoot.querySelector('dl');
      this.#elControls = this.shadowRoot.querySelector('.controls');
    }
  }
  disconnectedCallback() {
  }
  get elLegend() { return this.#elLegend }
  get elTitle() { return this.#elTitle }
  get elInputs() { return this.#elInputs }
  get elControls() { return this.#elControls }
  get title() { return this.#title }
  set title(t) { this.setTittle(t); }
  setTittle(t) {
    if (!isString$1) return
    this.#title = t;
    this.elTitle.innerHTML = t;
  }
  buildInputs(o) {
    let i = 0,
        inp = "",
        input,
        blank = "",
        styleDT = "display: inline; margin-left: ",
        styleDD = "display: inline; margin-left: .25em;";
    for (input in o.inputs) {
      let colour = (o?.colours?.[i]) ? ` color: ${o.colours[i]};` : "";
      let value = (o?.inputs?.[input] !== undefined) ? o.inputs[input] : blank;
      let label = (o?.labels?.[i]) ? `${input}:` : blank;
          styleDT += (o?.labels?.[i]) ? "1em;" : ".25em";
      inp +=
      `<dt style="${styleDT}">${label}</dt>
      <dd style="${styleDD}${colour}">${value}</dd>`;
      ++i;
    }
    return inp
  }
  buildControls(o) {
    let inp = "";
    let id = o.ID;
    if (o?.type !== "chart") {
      inp += `<span id="${id}_up" class="control">${up}</span>`;
      inp += `<span id="${id}_down" class="control">${down}</span>`;
    }
    inp += `<span id="${id}_collapse" class="control">${collapse}</span>`;
    inp += `<span id="${id}_maximize" class="control">${maximize}</span>`;
    inp += `<span id="${id}_restore" class="control">${restore}</span>`;
    inp += (o?.type !== "chart") ? `<span id="${id}_remove" class="control">${close}</span>` : ``;
    inp += `<span id="${id}_config" class="control">${config}</span>`;
    return inp
  }
}
customElements.get('tradex-legends') || window.customElements.define('tradex-legends', tradeXLegend);

const template$8 = document.createElement('template');
template$8.innerHTML = `
<style>
  .viewport {
    position: relative;
    width: 100%;
    height: inherit;
    background: var(--txc-onchart-background, none);
  }
  .viewport canvas {
    position: absolute;
    top: 1px;
  }
  tradex-legends {
    position: absolute;
    top: 0;
    left: 0;
    z-index:100;
    width: 100%;
  }
</style>
<div class="viewport"></div>
<tradex-legends></tradex-legends>
`;
class tradeXOnChart extends element {
  #parent
  #elViewport
  #elLegend
  #elScale
  #elCanvas
  constructor () {
    super(template$8);
  }
  destroy() {
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = false;
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
      this.style.display = "block";
      this.#elViewport = this.shadowRoot.querySelector('.viewport');
      this.#elLegend = this.shadowRoot.querySelector('tradex-legends');
    }
  }
  disconnectedCallback() {
  }
  get viewport() { return this.#elViewport }
  get legend() { return this.#elLegend }
}
customElements.get('tradex-onchart') || window.customElements.define('tradex-onchart', tradeXOnChart);

const template$7 = document.createElement('template');
template$7.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: inherit;
    background: var(--txc-onchart-background, none);
  }
  tradex-legends {
    position: absolute;
    top: 0;
    left: 0;
    z-index:100;
    width: 100%;
  }
</style>
<tradex-legends></tradex-legends>
<div class="viewport"></div>
`;
class tradeXOffChart extends element {
  #parent
  #elViewport
  #elLegend
  #elCanvas
  #options
  constructor () {
    super(template$7);
  }
  destroy() {
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = false;
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
      this.#elViewport = this.shadowRoot.querySelector('.viewport');
      this.#elLegend = this.shadowRoot.querySelector('tradex-legends');
    }
  }
  disconnectedCallback() {
  }
  get viewport() { return this.#elViewport }
  get legend() { return this.#elLegend }
}
customElements.get('tradex-offchart') || window.customElements.define('tradex-offchart', tradeXOffChart);

const template$6 = document.createElement('template');
template$6.innerHTML = `
<style>
  tradex-grid, tradex-onchart, tradex-offchart {
    overflow: hidden;
  }
  tradex-grid {
    position: absolute;
    height: inherit;
  }
  tradex-onchart {
    position: relative;
    height: 100%;
  }
  tradex-grid,
  tradex-onchart {
    display: block;
    width: 100%;
  }
  ::slotted(tradex-offchart) {
    display: block;
    position: relative;
    top: 1px;
    width: 100%;
    border-top: 1px solid;
  }
</style>
<tradex-grid></tradex-grid>
<tradex-onchart></tradex-onchart>
<slot name="offchart" id="offchart"></slot>
`;
class tradeXRows extends element {
  #oWidth
  #oHeight
  #widthCache
  #heightCache
  constructor () {
    super(template$6);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback();
    this.previousDimensions();
  }
  disconnectedCallback() {
  }
  get grid() { return this.shadowRoot.querySelector('tradex-grid') }
  get onChart() { return this.shadowRoot.querySelector('tradex-onchart') }
  get offCharts() { return this.shadowRoot.querySelectorAll('tradex-offchart') }
  get offChartSlot() { return this.shadowRoot.querySelector('#offchart') }
  get width() { return this.clientWidth }
  get height() { return this.clientHeight }
  get oWidth() { return this.#oWidth }
  get oHeight() { return this.#oHeight }
  get widthDeltaR() { return this.clientWidth / this.#oWidth }
  get heightDeltaR() { return this.clientHeight / this.#oHeight }
  previousDimensions() {
console.log(`oWidth: ${this.oWidth}, oHeight: ${this.oHeight}`);
    this.#oWidth = (this.#widthCache) ? this.#widthCache : this.clientWidth;
    this.#oHeight = (this.#heightCache) ? this.#heightCache : this.clientHeight;
    this.#widthCache = this.clientWidth;
    this.#heightCache = this.clientHeight;
  }
}
customElements.get('tradex-rows') || window.customElements.define('tradex-rows', tradeXRows);

const template$5 = document.createElement('template');
template$5.innerHTML = `
<style>
  #viewport {
    position: absolute;
    width: 100%;
    height: inherit;
    background: var(--txc-onchart-background, none);
    z-index: 0;
  }
  #viewport canvas {
    position: absolute;
    top: 1px;
  }
  tradex-rows {
    position:relative;
    overflow: hidden;
    width: calc(100% - ${SCALEW}px);
    height: calc(100% - ${TIMEH}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${GlobalStyle.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${SCALEW}px);
    height: ${TIMEH}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class tradeXMain extends element {
  #elYAxis
  #theme
  constructor () {
    super(template$5);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get viewport() { return this.shadowRoot.querySelector('#viewport') }
  get rows() { return this.shadowRoot.querySelector('tradex-rows') }
  get time() { return this.shadowRoot.querySelector('tradex-time') }
  start(theme) {
    this.#theme = theme;
    this.setMain();
  }
  rowNode(type, api) {
    const styleRow = ` border-top: 1px solid ${api.theme.chart.BorderColour};`;
    const node = `
      <tradex-offchart slot="offchart" class="${type}" style="${styleRow}">
      </tradex-offchart>
    `;
    return node
  }
  setMain() {
    let timeH = (isNumber(this.#theme?.time?.height)) ? this.#theme.time.height : TIMEH;
    let offset = (this.#theme.tools.location == "none") ? 60 : 0;
    this.rows.style.height = `calc(100% - ${timeH}px)`;
    this.rows.style.left = `${offset}px`;
    this.time.style.left = `${offset}px`;
    this.viewport.style.left = `${offset}px`;
  }
}
customElements.get('tradex-main') || window.customElements.define('tradex-main', tradeXMain);

const template$4 = document.createElement('template');
template$4.innerHTML = `
  <slot></slot>
`;
class tradeXTools extends element {
  constructor () {
    super(template$4);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get icons() { return this.shadowRoot.querySelector('slot').assignedElements() }
}
customElements.get('tradex-tools') || window.customElements.define('tradex-tools', tradeXTools);

const template$3 = document.createElement('template');
template$3.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: 100%;
    margin-top: 2px;
    margin-left: 2px;
  }
</style>
<div class="viewport"></div>
<slot name="offchart" id="offchart"></slot>
`;
class tradeXScale extends element {
  #viewport
  #offChartSlot
  constructor () {
    super(template$3);
  }
  destroy() {
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = false;
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
      this.style.display = "block";
      this.#viewport = this.shadowRoot.querySelector('.viewport');
      this.#offChartSlot = this.shadowRoot.querySelector('#offchart');
    }
  }
  disconnectedCallback() {
  }
  get viewport() { return this.#viewport}
  get offCharts() { return this.shadowRoot.querySelectorAll('tradex-offchart') }
  get offChartSlot() { return this.#offChartSlot }
}
customElements.get('tradex-scale') || window.customElements.define('tradex-scale', tradeXScale);

const right = `
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${TOOLSW}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: 0;
    width: calc(100% - ${TOOLSW}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 0; 
    right: 0; 
    width: ${SCALEW}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`;
const template$2 = document.createElement('template');
template$2.innerHTML = right;
class tradeXBody extends element {
  #theme
  constructor () {
    super(template$2);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get tools() { return this.shadowRoot.querySelector('tradex-tools') }
  get main() { return this.shadowRoot.querySelector('tradex-main') }
  get scale() { return this.shadowRoot.querySelector('tradex-scale') }
  start(theme) {
    this.#theme = theme;
    this.setToolsLocation();
  }
  setYAxisLocation(side=this.#theme?.yAxis?.location) {
    let toolsW = (isNumber(this.#theme?.tools?.width)) ? this.#theme.tools.width : TOOLSW;
    let offset;
    switch (side) {
      case "left":
        offset = (toolsW == 0) ? 0 : SCALEW;
        this.scale.style.left = `${toolsW}px`;
        this.scale.style.right = undefined;
        this.main.style.left = undefined;
        this.main.style.right = `-${offset}px`;
        this.main.style.width = `calc(100% - ${toolsW}px)`;
        break;
      case "both":
      case "right":
      default:
        offset = (toolsW == 0) ? SCALEW : 0;
        this.scale.style.left = undefined;
        this.scale.style.right = 0;
        this.main.style.left = undefined;
        this.main.style.right = `${offset}px`;
        this.main.style.width = `calc(100% - ${toolsW}px)`;
        break;
    }
  }
  setToolsLocation(side=this.#theme?.tools?.location) {
    this.#theme.tools = this.#theme.tools || {};
    switch(side) {
      case "none":
      case false:
        this.#theme.tools.location = "none";
        this.#theme.tools.width = 0;
        this.tools.style.display = "none";
        this.tools.style.width =`0px`;
        break;
      case "right":
        this.#theme.tools.location = "right";
        this.#theme.tools.width = this.#theme?.tools?.width || TOOLSW;
        this.tools.style.display = "block";
        this.tools.style.left = undefined;
        this.tools.style.right = 0;
        this.tools.style.width =`${TOOLSW}px`;
        break;
      case "left":
      default:
        this.#theme.tools.location = "left";
        this.#theme.tools.width = this.#theme?.tools?.width || TOOLSW;
        this.tools.style.display = "block";
        this.tools.style.left = 0;
        this.tools.style.right = undefined;
        this.tools.style.width =`${TOOLSW}px`;
        break;
    }
    this.setYAxisLocation();
  }
}
customElements.get('tradex-body') || window.customElements.define('tradex-body', tradeXBody);

const template$1 = document.createElement('template');
template$1.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class tradeXUtils extends element {
  constructor () {
    super(template$1);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get icons() { return this.shadowRoot.querySelector('slot').assignedElements()[0].children }
}
customElements.get('tradex-utils') || window.customElements.define('tradex-utils', tradeXUtils);

const template = document.createElement('template');
template.innerHTML = `
  <slot name="widget"></slot>
`;
class tradeXWidgets extends element {
  constructor () {
    super(template);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
}
customElements.get('tradex-widgets') || window.customElements.define('tradex-widgets', tradeXWidgets);

const HTML = `
  <style title="core">
    tradex-utils {
      height: ${UTILSH}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${UTILSH}px); 
      min-height: ${CHART_MINH - UTILSH}px;
      width: 100%;
    }
    tradex-widgets {
      position: relative;
    }
  </style>
  <div style="display: none;">
    <slot></slot>
  </div>
  <tradex-utils></tradex-utils>
  <tradex-body></tradex-body>
  <tradex-widgets></tradex-widgets>
`;
class tradeXChart extends element {
  #elBody
  #elUtils
  #elWidgets
  #template
  #chartW = CHART_MINW
  #chartH = CHART_MINH
  #oWidth
  #oHeight
  #widthCache
  #heightCache
  #theme
  constructor () {
    const template = document.createElement('template');
          template.innerHTML = HTML;
    super(template, "closed");
    this.#template = template;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ['config', 'disabled', 'height', 'stream', 'width']
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = false;
      this.shadowRoot.appendChild(this.#template.content.cloneNode(true));
      this.style.display = "block";
      this.style.minHeight = TX_MINH;
      this.elWidgetsG = this.shadowRoot.querySelector('tradex-widgets');
      this.elUtils = this.shadowRoot.querySelector('tradex-utils');
      this.elBody = this.shadowRoot.querySelector('tradex-body');
      this.elMain = this.elBody.main;
      this.elTime = this.elBody.main.time;
      this.elTools = this.elBody.tools;
      this.elYAxis = this.elBody.scale;
      this.previousDimensions();
      let height = this.getAttribute('height') || "100%";
      let width = this.getAttribute('width') || "100%";
      this.setDimensions(width, height);
      this.resizeObserver = new ResizeObserver(debounce(this.onResized, 50, this));
      this.resizeObserver.observe(this);
    }
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect();
    this.removeEventListener('click', this.onClick);
  }
  attributeChangedCallback(prop, oldVal, newVal) {
    switch(prop) {
      case "config":
        break;
      case "disabled":
        break;
      case "height":
        this.height(newVal);
        break;
      case "width":
        this.width(newVal);
        break;
    }
  }
  get id() { return this.getAttribute('id'); }
  set id(id) { this.setAttribute('id', id); }
  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(d) {
    if (d) {
        this.setAttribute('disabled', '');
    } else {
        this.removeAttribute('disabled');
    }
  }
  get width() { return this.offsetWidth }
  set width(w) { this.setWidth(w); }
  get height() { return this.offsetHeight }
  set height(h) { this.setHeight(h); }
  get oWidth() { return this.#oWidth }
  get oHeight() { return this.#oHeight }
  get widthDeltaR() { return this.offsetWidth / this.#oWidth }
  get heightDeltaR() { return this.offsetHeight / this.#oHeight }
  get stream() {  }
  set stream(s) {  }
  get body() { return this.#elBody }
  get utils() { return this.#elUtils }
  get widgets() { return this.#elWidgets }
  elStart(theme) {
    this.#theme = theme;
    this.setUtilsLocation();
  }
  onResized(entries) {
      console.log("onResize");
      console.log(this.offsetWidth);
      console.log(this.offsetHeight);
      if (isObject(this.MainPane) && this.MainPane instanceof MainPane) {
        this.previousDimensions();
        this.emit("global_resize", {w: this.offsetWidth, h: this.offsetHeight});
      }
  }
  previousDimensions() {
    this.#oWidth = (this.#widthCache) ? this.#widthCache : this.offsetWidth;
    this.#oHeight = (this.#heightCache) ? this.#heightCache : this.offsetHeight;
    this.#widthCache = this.offsetWidth;
    this.#heightCache = this.offsetHeight;
  }
  setWidth(w) {
    if (isNumber(w)) {
      this.#chartW = w;
      w += "px";
    }
    else if (isString$1(w)) ;
    else {
      this.#chartW = this.parentElement.getBoundingClientRect().width;
      w = this.#chartW + "px";
    }
    this.style.width = w;
  }
  setHeight(h) {
    if (isNumber(h)) {
      this.#chartH = h;
      h += "px";
    }
    else if (isString$1(h)) ;
    else {
      this.#chartH = this.parentElement.getBoundingClientRect().height;
      w = this.#chartH + "px";
    }
    this.style.height = h;
  }
  setWidthMin(w) { this.style.minWidth = `var(--txc-min-width, ${w})`; }
  setHeightMin(h) { this.style.minHeight = `var(--txc-min-height, ${w})`; }
  setWidthMax(w) { this.style.minWidth = `var(--txc-max-width, ${w})`; }
  setHeightMax(h) { this.style.minHeight = `var(--txc-max-height, ${w})`; }
  setDimensions(w, h) {
    let dims;
    let width = this.width;
    let height = this.height;
    if (!w || !h) {
      const dims = this.getBoundingClientRect();
      const parent = this.parentElement.getBoundingClientRect();
      h = (!dims.height) ? (!parent.height) ? CHART_MINH : parent.height : dims.height;
      w = (!dims.width) ? (!parent.width) ? CHART_MINW : parent.width : dims.width;
    }
    dims = {
      width: this.width,
      height: this.height,
      resizeW: w / width,
      resizeH: h / height,
      resizeWDiff: w - width,
      resizeHDiff: h - height
    };
    this.setWidth(w);
    this.setHeight(h);
    return dims
  }
  setUtilsLocation(pos=this.#theme?.utils?.location) {
    this.#theme.utils = this.#theme.utils || {};
    switch(pos) {
      case "none":
      case false:
        this.#theme.utils.location = "none";
        this.#theme.utils.height = 0;
        this.elUtils.style.display = "none";
        this.elUtils.style.height =`0px`;
        this.elBody.style.height = `100%`;
        this.elBody.style.minHeight = `${CHART_MINH}px`;
        break;
      case "top":
      default:
        this.#theme.utils.location = "top";
        this.#theme.utils.height = UTILSH;
        this.elUtils.style.display = "block";
        this.elUtils.style.height =`${UTILSH}px`;
        this.elBody.style.height = `calc(100% - ${UTILSH}px)`;
        this.elBody.style.minHeight = `${CHART_MINH - UTILSH}px`;
    }
  }
}

var utilsList = [
  {
    id: "indicators",
    name: "Indicators",
    icon: chart,
    event: "utils_indicators",
    sub: [],
  },
  {
    id: "timezone",
    name: "Timezone",
    icon: clock,
    event: "utils_timezone",
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: camera,
    event: "utils_screenshot",
  },
  {
    id: "settings",
    name: "Settings",
    icon: config,
    event: "utils_settings",
  },
];

class UtilsBar {
  #name = "Utilities"
  #shortName = "utils"
  #core
  #options
  #elUtils
  #utils
  #widgets
  #indicators
  #menus = {}
  constructor (core, options) {
    this.#core = core;
    this.#options = options;
    this.#elUtils = core.elUtils;
    this.#utils = core.config?.utilsBar || utilsList;
    this.#widgets = core.WidgetsG;
    this.#indicators = core.indicators || Indicators;
    this.init();
  }
  log(l) { this.#core.log(l); }
  info(i) { this.#core.info(i); }
  warning(w) { this.#core.warn(w); }
  error(e) { this.#core.error(e); }
  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get core() {return this.#core}
  get options() {return this.#options}
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elUtils) }
  init() {
    this.mount(this.#elUtils);
    this.log(`${this.#name} instantiated`);
  }
  start() {
    this.initAllUtils();
    this.eventsListen();
  }
  end() {
    const api = this.#core;
    const utils = DOM.findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`);
    for (let util of utils) {
      for (let u of this.#utils) {
        if (u.id === id)
          util.removeEventListener("click", this.onIconClick);
      }
    }
    this.off("utils_indicators", this.onIndicators);
    this.off("utils_timezone", this.onTimezone);
    this.off("utils_settings", this.onSettings);
    this.off("utils_screenshot", this.onScreenshot);
  }
  eventsListen() {
    this.on("utils_indicators", this.onIndicators.bind(this));
    this.on("utils_timezone", this.onTimezone.bind(this));
    this.on("utils_settings", this.onSettings.bind(this));
    this.on("utils_screenshot", this.onScreenshot.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onIconClick(e) {
    let evt = e.currentTarget.dataset.event,
        menu = e.currentTarget.dataset.menu || false,
        data = {
          target: e.currentTarget.id,
          menu: menu,
          evt: e.currentTarget.dataset.event
        };
    this.emit(evt, data);
    if (menu) this.emit("openMenu", data);
    else {
      this.emit("menuItemSelected", data);
      this.emit("utilSelected", data);
    }
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
  }
  initAllUtils() {
    const api = this.#core;
    const utils = DOM.findBySelectorAll(`#${api.id} .${CLASS_UTILS} .icon-wrapper`);
    for (let util of utils) {
      let id = util.id.replace('TX_', ''),
          svg = util.querySelector('svg');
          svg.style.fill = UtilsStyle.COLOUR_ICON;
          svg.style.height = "90%";
      for (let u of this.#utils) {
        if (u.id === id) {
          util.addEventListener("click", this.onIconClick.bind(this));
          if (u.id === "indicators") u.sub = Object.values(this.#indicators);
          if (u?.sub) {
            let config = {
              content: u.sub,
              primary: util
            };
            let menu = this.#widgets.insert("Menu", config);
            util.dataset.menu = menu.id;
            menu.start();
          }
        }
      }
    }
  }
  defaultNode() {
    let style = `display: inline-block; float: right;`;
    let utilsBar = `
    <div style="${style}">
    <style>
      svg {
        height: ${UtilsStyle.ICONSIZE};
        fill: ${UtilsStyle.COLOUR_ICON};
      }
    </style>
    `;
    for (const util of this.#utils) {
      utilsBar += this.iconNode(util);
    }
    return utilsBar + "</div>"
  }
  iconNode(util) {
    const iconStyle = `display: inline-block; height: ${UtilsStyle.ICONSIZE}; padding-top: 2px`;
    const menu = ("sub" in util) ? `data-menu="true"` : "";
    return  `
      <div id="TX_${util.id}" data-event="${util.event}" ${menu} class="icon-wrapper" style="${iconStyle}">${util.icon}</div>\n
    `
  }
  onIndicators(data) {
    console.log(`Indicator:`,data);
  }
  onTimezone(data) {
    console.log(`Timezone:`,data);
    this.#core.notImplemented();
  }
  onSettings(data) {
    console.log(`Settings:`,data);
    this.#core.notImplemented();
  }
  onScreenshot(data) {
    console.log(`Screenshot:`,data);
    this.#core.notImplemented();
  }
}

class Tool {
  static #cnt = 0
  static #instances = {}
  #ID
  #inCnt = null
  #name
  #shortName
  #options
  #config
  #core
  #parent
  #input
  #elChart
  #elCanvas
  #elViewport
  #layerTool
  #target
  #cursorPos = [0, 0]
  #cursorActive = false
  #cursorClick
  constructor(config) {
    this.#config = config;
    this.#inCnt = config.cnt;
    this.#ID = this.#config.ID || uid("TX_Tool_");
    this.#name = config.name;
    this.#core = config.core;
    this.#elChart = config.elements.elChart;
    this.#parent = {...config.parent};
    this.#target = config.target;
    this.#target.addTool(this);
    this.#elViewport = this.#layerTool.viewport;
    this.#elCanvas = this.#elViewport.scene.canvas;
    this.#cursorClick = config.pos;
  }
  get inCnt() { return this.#inCnt }
  get ID() { return this.#ID }
  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get core() { return this.#core }
  get stateMachine() { return this.#core.stateMachine }
  get state() { return this.#core.getState() }
  get data() { return this.#core.chartData }
  get range() { return this.#core.range }
  get target() { return this.#target }
  set layerTool(layer) { this.#layerTool = layer; }
  get layerTool() { return this.#layerTool }
  get elViewport() { return this.#elViewport }
  get cursorPos() { return this.#cursorPos }
  get cursorActive() { return this.#cursorActive }
  get cursorClick() { return this.#cursorClick }
  get candleW() { return this.#core.Timeline.candleW }
  get theme() { return this.#core.theme }
  get config() { return this.#core.config }
  get scrollPos() { return this.#core.scrollPos }
  get bufferPx() { return this.#core.bufferPx }
  static create(target, config) {
    const cnt = ++Tool.#cnt;
    config.cnt = cnt;
    config.modID = `${config.toolID}_${cnt}`;
    config.toolID = config.modID;
    config.target = target;
    const tool = new config.tool(config);
    Tool.#instances[cnt] = tool;
    target.chartToolAdd(tool);
    return tool
  }
  static destroy(tool) {
    if (tool instanceof Tool) {
      const inCnt = tool.inCnt;
      delete Tool.#instances[inCnt];
    }
  }
  end() { this.stop(); }
  stop() {
    this.#input.off("mousemove", this.onMouseMove);
  }
  eventsListen() {
    this.#input = new Input(this.#elCanvas, {disableContextMenu: false});
    this.#input.on("mousemove", this.onMouseMove.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMouseMove(e) {
    this.#cursorPos = [Math.round(e.position.x), Math.round(e.position.y)];
    this.emit("tool_mousemove", this.#cursorPos);
  }
  createViewport() {
    this.config.buffer || BUFFERSIZE;
    this.#elViewport.getBoundingClientRect().width;
    this.#options.chartH || this.#parent.rowsH - 1;
  }
  draw() {
  }
}

class Fibonacci extends Tool {
  constructor(config) {
    super(config);
  }
}

class Line extends Tool {
  #colour = lineConfig.colour
  #lineWidth = lineConfig.lineWidth
  #stateMachine
  constructor(config) {
    super(config);
  }
  set colour(colour=this.#colour) {
    this.#colour = colour;
  }
  get colour() { return this.#colour }
  set lineWidth(width) { this.#lineWidth = (isNumber(width)) ? width : this.#lineWidth; }
  get lineWidth() { return this.#lineWidth }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this); }
  get stateMachine() { return this.#stateMachine }
  start() {
    this.eventsListen();
    let [x1, y1] = this.cursorClick;
    const scene = this.layerTool.scene;
    scene.clear();
    const ctx = this.layerTool.scene.context;
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.colour;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(300, 150);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    this.elViewport.render();
  }
}

class Measure extends Tool {
  constructor(config) {
    super(config);
  }
}

class RangeTool extends Tool {
  constructor(config) {
    super(config);
  }
}

class Text extends Tool {
  constructor(config) {
    super(config);
  }
}

var tools = [
  {
    id: "cursor",
    name: "Cursor",
    icon: cursor,
    event: "tool_activated",
  },
  {
    id: "line",
    name: "Line",
    icon: line,
    event: "tool_activated",
    class: Line,
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: line,
        event: "tool_activated",
        class: Line,
      },
      {
        id: "hRay",
        name: "Horizontal Ray",
        icon: line,
        event: "tool_activated",
        class: Line,
      },
      {
        id: "vRay",
        name: "Vertical Ray",
        icon: line,
        event: "tool_activated",
        class: Line,
      },
    ]
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: fibonacci,
    event: "tool_activated",
    class: Fibonacci,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: line,
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: range,
    event: "tool_activated",
    class: RangeTool,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: line,
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: text,
    event: "tool_activated",
    class: Text,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: line,
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: measure,
    event: "tool_activated",
    class: Measure,
  },
  {
    id: "delete",
    name: "Delete",
    icon: del,
    event: "tool_activated",
    class: undefined,
  }
];
const lineConfig = {
  colour: "#8888AACC",
  lineWidth: 1
};

var stateMachineConfig$1 = {
  id: "template",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        console.log('idle: onEnter');
      },
      onExit(data) {
        console.log('idle: onExit');
      },
      on: {
        tool_activated: {
          target: 'tool_activated',
          action (data) {
            this.context.origin.onToolActivated(data);
          },
        },
      }
    },
    tool_activated: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        tool_targetSelected: {
          target: 'tool_addToTarget',
          action (data) {
            this.context.origin.onToolTargetSelected(data);
          },
        },
      }
    },
    tool_addToTarget: {
      onEnter (data) {
      },
      onExit (data) {
      },
      on: {
        always: {
          target: 'idle',
          condition: 'toolTarget',
          action (data) {
            this.context.origin.addNewTool();
          },
        },
      }
    },
  },
  guards: {
    toolTarget () { return true }
  }
};

class ToolsBar {
  #name = "Toolbar"
  #shortName = "tools"
  #core
  #options
  #stateMachine
  #elTools
  #widgets
  #Tool = Tool
  #tools
  #toolClasses = {}
  #activeTool = undefined
  #toolTarget
  constructor (core, options) {
    this.#core = core;
    this.#options = options;
    this.#elTools = core.elTools;
    this.#tools = tools || core.config.tools;
    this.#widgets = core.WidgetsG;
    this.init();
  }
  log(l) { this.#core.log(l); }
  info(i) { this.#core.info(i); }
  warning(w) { this.#core.warn(w); }
  error(e) { this.#core.error(e); }
  get name() {return this.#name}
  get shortName() {return this.#shortName}
  get core() {return this.#core}
  get options() {return this.#options}
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elTools) }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this); }
  get stateMachine() { return this.#stateMachine }
  init() {
    this.mount(this.#elTools);
    this.log(`${this.#name} instantiated`);
  }
  start() {
    this.initAllTools();
    this.addAllTools();
    this.eventsListen();
    stateMachineConfig$1.context = this;
    this.stateMachine = stateMachineConfig$1;
    this.stateMachine.start();
  }
  end() {
    this.stateMachine.destroy();
    const api = this.#core;
    const tools = DOM.findBySelectorAll(`#${api.id} .${CLASS_TOOLS} .icon-wrapper`);
    for (let tool of tools) {
      for (let t of this.#tools) {
        if (t.id === id)
          tool.removeEventListener("click", this.onIconClick);
      }
    }
    this.off("tool_selected", this.onToolSelect);
    this.off("tool_deselected", this.onToolDeselect);
  }
  eventsListen() {
    this.on("tool_selected", (e) => { this.onToolSelect.bind(this); });
    this.on("tool_deselected", (e) => { this.onToolDeselect.bind(this); });
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onIconClick(e) {
    e.currentTarget.dataset.event;
        let menu = e.currentTarget.dataset.menu || false,
        data = {
          target: e.currentTarget.id,
          menu: menu,
          evt: e.currentTarget.dataset.event,
          tool: e.currentTarget.dataset.tool
        };
    if (menu) this.emit("openMenu", data);
    else {
      this.emit("menuItemSelected", data);
    }
  }
  onToolTargetSelected(tool) {
    console.log("tool_targetSelected", tool.target);
    this.#toolTarget = tool.target;
  }
  onToolActivated(tool) {
    console.log("Tool activated:", tool);
    this.#activeTool = tool;
  }
  onToolSelect(e) {
  }
  onToolDeselect(e) {
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
  }
  initAllTools() {
    const api = this.#core;
    const tools = DOM.findBySelectorAll(`#${api.id} .${CLASS_TOOLS} .icon-wrapper`);
    for (let tool of tools) {
      let id = tool.id,
          svg = tool.querySelector('svg');
          svg.style.fill = ToolsStyle.COLOUR_ICON;
          svg.style.width = "90%";
      for (let t of this.#tools) {
        if (t.id === id) {
          tool.addEventListener("click", this.onIconClick.bind(this));
          if (t?.sub) {
            let config = {
              content: t.sub,
              primary: tool
            };
            let menu = this.#widgets.insert("Menu", config);
            tool.dataset.menu = menu.id;
            menu.start();
            for (let s of t.sub) {
              this.#toolClasses[s.id] = s.class;
            }
          }
          else {
            this.#toolClasses[t.id] = t.class;
          }
        }
      }
    }
  }
  defaultNode() {
    let toolbar = `
    <style>
      svg {
        height: ${ToolsStyle.ICONSIZE};
        fill: ${ToolsStyle.COLOUR_ICON};
      }
    </style>
    `;
    for (const tool of this.#tools) {
      toolbar += this.iconNode(tool);
    }
    return toolbar
  }
  iconNode(tool) {
    const iconStyle = `display: inline-block; height: ${ToolsStyle.ICONSIZE}; margin-left: -3px;`;
    const menu = ("sub" in tool) ? `data-menu="true"` : "";
    return  `
      <div id="${tool.id}" data-event="${tool.event}" ${menu} class="icon-wrapper" style="${iconStyle}">${tool.icon}</div>\n
    `
  }
  addTool(tool=this.#activeTool, target=this.#toolTarget) {
    let config = {
      name: tool,
      tool: this.#toolClasses[tool],
      pos: target.cursorClick
    };
    let toolInstance = this.#Tool.create(target, config);
    toolInstance.start();
    console.log(toolInstance);
    return toolInstance
  }
  addNewTool(tool, target) {
    let t = this.addTool(tool, target);
    this.activeTool = (t);
    this.emit(`tool_active`, t);
    this.emit(`tool_${t.ID}_active`, t);
  }
  addAllTools() {
  }
}

const MENUMINWIDTH = 150;
class Menu {
  #id
  #widgets
  #core
  #config
  #elWidgetsG
  #elMenus
  #elMenu
  #cursorPos
  #controller
  static menuList = {}
  static menuCnt = 0
  static class = CLASS_MENUS
  static name = "Menus"
  static type = "menu"
  static currentActive
  constructor(widgets, config) {
    this.#widgets = widgets;
    this.#core = config.core;
    this.#config = config;
    this.#id = config.id;
    this.#elMenus = widgets.elements.elMenus;
    this.#elWidgetsG = this.#core.elWidgetsG;
    this.init();
  }
  static create(widgets, config) {
    const id = `menu${++Menu.menuCnt}`;
    config.id = id;
    Menu.menuList[id] = new Menu(widgets, config);
    return Menu.menuList[id]
  }
  static destroy(id) {
    Menu.menuList[id].end();
    delete Menu.menuList[id];
  }
  get el() { return this.#elMenu }
  get id() { return this.#id }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elMenu) }
  init() {
    this.mount(this.#elMenus);
  }
  start() {
    this.position(this.#config.primary);
    this.eventsListen();
  }
  end() {
    const api = this.#config;
    const menuItems = DOM.findBySelectorAll(`#${api.id} .${CLASS_MENU} li`);
    menuItems.forEach((item) => {
      item.removeEventListener('click', this.onMenuSelect);
    });
    document.removeEventListener('click', this.onOutsideClickListener);
  }
  eventsListen() {
    const api = this.#core;
    const menuItems = DOM.findBySelectorAll(`#${api.id} #${this.#config.id} li`);
    menuItems.forEach((item) => {
      item.addEventListener('click', this.onMenuSelect.bind(this));
    });
    document.addEventListener('click', this.onOutsideClickListener.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMenuSelect(e) {
    let evt = e.currentTarget.dataset.event,
        data = {
          target: e.currentTarget.id,
          menu: this.#id,
          evt: evt
        };
    this.emit("menuItemSelected", data);
    this.emit("closeMenu", data);
  }
  onOutsideClickListener(e) {
    if (!this.#elMenu.contains(e.target)
    && (!this.#config.primary.contains(e.target))
    && DOM.isVisible(this.#elMenu)) {
      let data = {
        target: e.currentTarget.id,
        menu: this.#id,
      };
      this.emit("closeMenu", data);
    }
  }
  mount(el) {
    const api = this.#core;
    if (el.lastElementChild == null)
      el.innerHTML = this.menuNode();
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.menuNode());
    this.#elMenu = DOM.findBySelector(`#${api.id} #${this.#config.id}`);
  }
  static defaultNode() {
    const menuStyle = ``;
    const node = `
      <div slot="widget" class="${CLASS_MENUS}" style="${menuStyle}"></div>
    `;
    return node
  }
  menuNode() {
    const menu = this.#config;
    const menuStyle = `position: absolute; z-index: 1000; display: none; border: 1px solid ${MenuStyle.COLOUR_BORDER}; background: ${MenuStyle.COLOUR_BG}; color: ${MenuStyle.COLOUR_TXT};`;
    let content = this.content(menu);
    let node = `
      <div id="${menu.id}" class="${CLASS_MENU}" style="${menuStyle}">
        ${content}
      </div>
    `;
    return node
  }
  content(menu) {
    const listStyle = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${MENUMINWIDTH}px`;
    const itemStyle = "padding: .25em 1em .25em 1em; white-space: nowrap;";
    const shortStyle = "display: inline-block; width: 4em;";
    const cPointer = "cursor: pointer;";
    const over = `onmouseover="this.style.background ='#222'"`;
    const out = `onmouseout="this.style.background ='none'"`;
    let content = `<ul style="${listStyle}">`;
    if (menu?.content) {
      for (let i of menu.content) {
        content += `<li id="${i.id}" data-event="${i.event}" style="${itemStyle} ${cPointer}" ${over} ${out}><a style="${cPointer}"><span style="${shortStyle}">${i.id}</span><span>${i.name}</span></li></a>`;
      }
    }
    content += "</ul>";
    return content
  }
  position(target) {
    let wPos = this.#elWidgetsG.getBoundingClientRect();
    let iPos = target.getBoundingClientRect();
    this.#elMenu.style.left = Math.round(iPos.left - wPos.left) + "px";
    this.#elMenu.style.top = Math.round(iPos.bottom - wPos.top) + "px";
  }
  remove() {
  }
  open() {
    let id = Menu.currentActive?.id || false;
    if (id) this.emit("closeMenu", {menu: id});
    Menu.currentActive = this;
    this.#elMenu.style.display = "block";
    let pos = DOM.elementDimPos(this.#elMenu);
    let posR = pos.left + pos.width;
    if (posR > this.#elWidgetsG.offsetWidth) {
      let o = Math.floor(this.#elWidgetsG.offsetWidth - pos.width);
          o = limit(o, 0, this.#elWidgetsG.offsetWidth);
      this.#elMenu.style.left = `${o}px`;
    }
  }
  close() {
    Menu.currentActive = null;
    this.#elMenu.style.display = "none";
    this.emit("menuClosed", this.id);
  }
}

class Window {
  #id
  #widgets
  #core
  #config
  #elWidgetsG
  #elWindows
  #elWindow
  #cursorPos
  #controller
  static windowList = {}
  static windowCnt = 0
  static class = CLASS_WINDOWS
  static name = "Windows"
  static type = "window"
  static currentActive = null
  constructor(widgets, config) {
    this.#widgets = widgets;
    this.#core = config.core;
    this.#config = config;
    this.#id = config.id;
    this.#elWindows = widgets.elements.elWindows;
    this.#elWidgetsG = this.#core.elWidgetsG;
    this.init();
  }
  static create(widgets, config) {
    const id = `window${++Window.windowCnt}`;
    config.id = id;
    Window.windowList[id] = new Window(widgets, config);
    return Window.windowList[id]
  }
  static destroy(id) {
    Window.windowList[id].end();
    delete Window.windowList[id];
  }
  get el() { return this.#elWindow }
  get id() { return this.#id }
  get pos() { return this.dimensions }
  get config() { return this.#config }
  set config(c) { this.#config = c; }
  get dimensions() { return DOM.elementDimPos(this.#elWindow) }
  init() {
    this.mount(this.#elWindows);
  }
  start() {
    this.eventsListen();
    this.open();
  }
  end() {
    document.removeEventListener('click', this.onOutsideClickListener);
  }
  eventsListen() {
    this.#core;
    this.on("closeWindow", (e) => {
      if (e.window === this.#id) this.close();
     });
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onOutsideClickListener(e) {
    if (!this.#elWindow.contains(e.target)
    && DOM.isVisible(this.#elWindow)) {
      let data = {
        target: e.currentTarget.id,
        window: this.#id,
      };
      this.emit("closeWindow", data);
    }
  }
  mount(el) {
    const api = this.#core;
    if (el.lastElementChild == null)
      el.innerHTML = this.windowNode();
    else
      el.lastElementChild.insertAdjacentHTML("afterend", this.windowNode());
    this.#elWindow = DOM.findBySelector(`#${api.id} #${this.#config.id}`);
    let x, y;
    if (this.#config.x && this.#config.y) {
      x = this.#config.x;
      y = this.#config.y;
    }
    else {
      let dims = DOM.elementDimPos(this.#elWindow);
      x = (this.#core.width - dims.width) / 2;
      y = (this.#core.height - dims.height) / 2;
    }
    this.#elWindow.style.bottom = `${y}px`;
    this.#elWindow.style.left = `${x}px`;
  }
  static defaultNode() {
    const windowStyle = ``;
    const node = `
      <div slot="widget" class="${CLASS_WINDOWS}" style="${windowStyle}"></div>
    `;
    return node
  }
  windowNode() {
    const window = this.#config;
    const windowStyle = `position: absolute; z-index: 1000; display: block; border: 1px solid ${WindowStyle.COLOUR_BORDER}; background: ${WindowStyle.COLOUR_BG}; color: ${WindowStyle.COLOUR_TXT};`;
    let dragBar = this.dragBar(window);
    let content = this.content(window);
    let closeIcon = this.closeIcon(window);
    let node = `
      <div id="${window.id}" class="${CLASS_WINDOW}" style="${windowStyle}">
          ${dragBar}
          ${closeIcon}
          ${content}
        </div>
      </div>
    `;
    return node
  }
  content(window) {
    const contentStyle = "padding: 2em;";
    let content = (window?.content)? window.content : '';
    let node = `
      <div class="content" style="${contentStyle}">
        ${content}
      </div>
    `;
    return node
  }
  dragBar(window) {
    this.#core;
    const cPointer = "cursor: grab;";
    const over = `onmouseover="this.style.background ='#222'"`;
    const out = `onmouseout="this.style.background ='none'"`;
    const dragBarStyle = `${cPointer}`;
    let node = ``;
    if (window.dragBar) node +=
    `
      <div class="dragBar" ${dragBarStyle} ${over} ${out}>
      </div>
    `;
    return node
  }
  closeIcon(window) {
    this.#core;
    const cPointer = "cursor: pointer;";
    const over = `onmouseover="this.style.background ='#222'"`;
    const out = `onmouseout="this.style.background ='none'"`;
    const closeIconStyle = `${cPointer}`;
    let node = ``;
    if (window.closeIcon) node +=
    `
      <div class="closeIcon" ${closeIconStyle} ${over} ${out}>
        <span>X</span>
      </div>
    `;
    return node
  }
  position(target) {
    let wPos = this.#elWidgetsG.getBoundingClientRect();
    let iPos = target.getBoundingClientRect();
    this.#elWindow.style.left = Math.round(iPos.left - wPos.left) + "px";
    this.#elWindow.style.top = Math.round(iPos.bottom - wPos.top) + "px";
  }
  remove() {
  }
  open() {
    Window.currentActive = this;
    this.#elWindow.style.display = "block";
    this.emit("windowOpened", this.id);
    setTimeout(() => {
      document.addEventListener('click', this.onOutsideClickListener.bind(this));
    }, 1000);
  }
  close() {
    Window.currentActive = null;
    this.#elWindow.style.display = "none";
    this.emit("windowClosed", this.id);
    document.removeEventListener('click', this.onOutsideClickListener);
  }
}

class Dialogue extends Window {
  static type = "window"
  constructor(widgets, config) {
    super();
    config.dragbar = true;
    config.close = tue;
    this.config = config;
  }
}

class Divider {
  #id
  #core
  #config
  #widgets
  #offChart
  #elDividers
  #elDivider
  #elOffChart
  #cursorPos
  #controller
  #input
  static dividerList = {}
  static divideCnt = 0
  static class = CLASS_DIVIDERS
  static name = "Dividers"
  static type = "divider"
  constructor(widgets, config) {
    const cfg = {...config};
    this.#widgets = widgets;
    this.#core = cfg.core;
    this.#config = cfg;
    this.#id = cfg.id;
    this.#offChart = cfg.offChart;
    this.#elDividers = widgets.elements.elDividers;
    this.#elOffChart = this.#offChart.element;
    this.init();
  }
  static create(widgets, config) {
    const id = `divider${++Divider.divideCnt}`;
    config.id = id;
    Divider.dividerList[id] = new Divider(widgets, config);
    return Divider.dividerList[id]
  }
  static destroy(id) {
    Divider.dividerList[id].end();
    delete Divider.dividerList[id];
  }
  get el() { return this.#elDivider }
  get ID() { return this.#id }
  get offChart() { return this.#offChart }
  get config() { return this.#core.config }
  get pos() { return this.dimensions }
  get dimensions() { return DOM.elementDimPos(this.#elDivider) }
  get height() { return this.#elDivider.getBoundingClientRect().height }
  init() {
    this.mount();
  }
  start() {
    this.setCursor("n-resize");
    this.eventsListen();
  }
  end() {
    this.#input.off("pointerenter", this.onMouseEnter);
    this.#input.off("pointerout", this.onMouseOut);
    this.#input.off("pointerdrag", this.onPointerDrag);
    this.#input.off("pointerdragend", this.onPointerDragEnd);
    this.#input = null;
    this.el.remove();
  }
  eventsListen() {
    this.#input = new Input(this.#elDivider, {disableContextMenu: false});
    this.#input.on("pointerenter", this.onMouseEnter.bind(this));
    this.#input.on("pointerout", this.onMouseOut.bind(this));
    this.#input.on("pointerdrag", this.onPointerDrag.bind(this));
    this.#input.on("pointerdragend", this.onPointerDragEnd.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onMouseEnter() {
    this.#elDivider.style.background = "#888888C0";
    this.#core.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#elDivider.style.background = "#FFFFFF00";
    this.#core.MainPane.onMouseEnter();
  }
  onPointerDrag(e) {
    this.#cursorPos = [e.position.x, e.position.y];
    this.emit(`${this.ID}_pointerdrag`, this.#cursorPos);
    this.emit(`divider_pointerdrag`, {
      id: this.ID,
      e: e,
      pos: this.#cursorPos,
      offChart: this.offChart
    });
  }
  onPointerDragEnd(e) {
    if ("position" in e)
    this.#cursorPos = [e.position.x, e.position.y];
    this.emit(`${this.ID}_pointerdragend`, this.#cursorPos);
    this.emit(`divider_pointerdragend`, {
      id: this.ID,
      e: e,
      pos: this.#cursorPos,
      offChart: this.offChart
    });
  }
  mount() {
    if (this.#elDividers.lastElementChild == null)
      this.#elDividers.innerHTML = this.dividerNode();
    else
      this.#elDividers.lastElementChild.insertAdjacentHTML("afterend", this.defaultNode());
    this.#elDivider = DOM.findBySelector(`#${this.#id}`, this.#elDividers);
  }
  setCursor(cursor) {
    this.#elDivider.style.cursor = cursor;
  }
  static defaultNode() {
    const dividersStyle = `position: absolute;`;
    const node = `
  <div slot="widget" class="${CLASS_DIVIDERS}" style="${dividersStyle}"></div>
  `;
    return node
  }
  dividerNode() {
    let top = this.#offChart.pos.top - DOM.elementDimPos(this.#elDividers).top,
      width = this.#core.MainPane.rowsW + this.#core.scaleW,
      height = (isNumber(this.config.dividerHeight)) ?
        this.config.dividerHeight : DIVIDERHEIGHT,
      left = this.#core.theme.tools.width;
      top -= height / 2;
    switch(this.#core.theme.tools.location) {
      case "left": break;
      case false:
      case "none":
      case "right": left *= -1; break;
    }
    const styleDivider = `position: absolute; top: ${top}px; left: ${left}px; z-index:100; width: ${width}px; height: ${height}px; background: #FFFFFF00;`;
    const node = `
      <div id="${this.#id}" class="divider" style="${styleDivider}"></div>
    `;
    return node
  }
  updateDividerPos(pos) {
    let dividerY = this.#elDivider.offsetTop;
        dividerY += pos[5];
    this.#elDivider.style.top = `${dividerY}px`;
  }
  setDividerPos() {
    let top = this.#offChart.pos.top - DOM.elementDimPos(this.#elDividers).top;
        top = top - (this.height / 2);
    this.#elDivider.style.top = `${top}px`;
  }
}

var stateMachineConfig = {
  id: "widgets",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`);
      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`);
      },
      on: {
        openMenu: {
          target: 'openMenu',
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "openMenu" on ${this.event}`);
          },
        },
      }
    },
    openMenu: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`);
      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`);
      },
      on: {
        closeMenu: {
          target: "idle",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "idle" on "${this.event}"`);
          },
        },
      }
    },
    openWindow: {
      onEnter(data) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`);
      },
      onExit(data) {
        console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`);
      },
      on: {
        closeWindow: {
          target: "idle",
          action (data) {
            console.log(`${this.id}: transition from "${this.state}" to "idle" on "${this.event}"`);
          },
        },
      }
    },
  }
};

class Widgets {
  #name = "Widgets"
  #shortName = "widgets"
  #core
  #options
  #stateMachine
  #widgets
  #widgetsList = { Dialogue, Divider, Menu, Window }
  #widgetsInstances = {}
  #elements = {}
  #elWidgetsG
  #width
  #height
  constructor (core, options) {
    this.#core = core;
    this.#options = options;
    this.#widgets = {...this.#widgetsList, ...options.widgets};
    this.#elWidgetsG = core.elWidgetsG;
    this.init();
  }
  log(l) { this.#core.log(l); }
  info(i) { this.#core.info(i); }
  warning(w) { this.#core.warn(w); }
  error(e) { this.#core.error(e); }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get core() { return this.#core }
  get options() { return this.#options }
  get elements() { return this.#elements }
  get instances() { return this.#widgetsInstances }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this); }
  get stateMachine() { return this.#stateMachine }
  init() {
    this.mount(this.#elWidgetsG);
    for (let i in this.#widgets) {
      let widget = this.#widgets[i];
      let entry = `el${widget.name}`;
      this.#elements[entry] = this.#elWidgetsG.querySelector(`.${widget.class}`);
    }
  }
  start() {
    this.eventsListen();
    stateMachineConfig.context = this;
    this.stateMachine = stateMachineConfig;
    this.stateMachine.start();
  }
  end() {
    this.off("openMenu", this.onOpenMenu);
    this.off("closeMenu", this.onCloseMenu);
    this.off("offMenu", this.onCloseMenu);
    this.off("menuItemSelected", this.onMenuItemSelected);
    this.stateMachine.destroy();
  }
  eventsListen() {
    this.on("openMenu", this.onOpenMenu.bind(this));
    this.on("closeMenu", this.onCloseMenu.bind(this));
    this.on("offMenu", this.onCloseMenu.bind(this));
    this.on("menuItemSelected", this.onMenuItemSelected.bind(this));
  }
  on(topic, handler, context) {
    this.#core.on(topic, handler, context);
  }
  off(topic, handler) {
    this.#core.off(topic, handler);
  }
  emit(topic, data) {
    this.#core.emit(topic, data);
  }
  onResize(dimensions) {
    this.setDimensions(dimensions);
  }
  onOpenMenu(data) {
    console.log("onOpenMenu:", data);
    this.#widgetsInstances[data.menu].open();
  }
  onCloseMenu(data) {
    console.log("onCloseMenu:", data);
    this.#widgetsInstances[data.menu].close();
  }
  onMenuItemSelected(e) {
    this.emit(e.evt, e.target);
  }
  mount(el) {
    el.innerHTML = this.defaultNode();
  }
  setWidth(w) {
    this.#width = w;
  }
  setHeight(h) {
    this.#height = h;
  }
  setDimensions(dimensions) {
    this.setWidth(dimensions.mainW);
    this.setHeight(dimensions.mainH);
  }
  defaultNode() {
    let nodes = ``,
        types = [];
    for (let i in this.#widgets) {
      let widget = this.#widgets[i];
      if (types.indexOf(widget.type) === -1) {
        nodes += widget.defaultNode();
        types.push(widget.type);
      }
    }
    return nodes
  }
  insert(type, config) {
    config.core = this.core;
    const widget = this.#widgets[type].create(this, config);
    this.#widgetsInstances[widget.id] = widget;
    return widget
  }
  remove(type, id) {
    delete(this.#widgetsInstances[id]);
    this.#widgets[type].destroy(id);
  }
}

class TradeXchart extends tradeXChart {
  static #cnt = 0
  static #cfg = {}
  static #instances = {}
  static #talibPromise = null
  static #talibReady = false
  static #talibAwait = []
  static #talibError = null
  static get talibPromise() { return TradeXchart.#talibPromise }
  static get talibReady() { return TradeXchart.#talibReady }
  static get talibAwait() { return TradeXchart.#talibAwait }
  static get talibError() { return TradeXchart.#talibError }
  static initErrMsg = `${NAME} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`
  static permittedClassNames =
  ["TradeXchart","Chart","MainPane","OffChart","OnChart",
  "ScaleBar","Timeline","ToolsBar","UtilsBar","Widgets"]
  #id
  #name = NAME
  #shortName = NAME
  #el = undefined
  #mediator
  #core
  #config
  #options
  #elements = {}
  #elTXChart
  #elUtils
  #elBody
  #elTools
  #elMain
  #elRows
  #elTime
  #elYAxis
  #elWidgetsG
  #inCnt = null
  #modID
  #hub = {}
  #state = {}
  #userClasses = []
  #chartIsEmpty = true
  #data
  #range
  #rangeStartTS
  #rangeLimit = RANGELIMIT
  #indicators = Indicators
  #TALib
  #theme
  #themeTemp
  chartWMin = CHART_MINW
  chartHMin = CHART_MINH
  chartW_Reactive = true
  chartH_Reactive = true
  chartBGColour = GlobalStyle.COLOUR_BG
  chartTxtColour = GlobalStyle.COLOUR_TXT
  chartBorderColour = GlobalStyle.COLOUR_BORDER
  utilsH = UTILSH
  toolsW = TOOLSW
  timeH  = TIMEH
  scaleW = SCALEW
  #UtilsBar
  #ToolsBar
  #MainPane = {
    chart: {},
    time: {}
  }
  #WidgetsG
  panes = {
    utils: this.#UtilsBar,
    tools: this.#ToolsBar,
    main: this.#MainPane,
  }
  #time = {
    rangeTotal: true,
    range: {},
    total: {},
    timeFrameMS: 0,
    timeFrame: '',
    timeZone: '',
    indexed: false
  }
  logs = false
  infos = false
  warnings = false
  errors = false
  timer = false
  #mousePos = {x:0, y:0}
  #scrollPos = 0
  #smoothScrollOffset = 0
  #panBeginPos = [null, null, null, null]
  #workers
  #stream
  #candles
  #pricePrecision
  #volumePrecision
  #delayedSetRange = false
  #renderer = {
    status: "idle",
    buffer: {
      n: true,
      "1": {},
      "2": {}
    },
    curr: {
      frame: null,
      priority: 0
    },
    cache: []
  }
    static create(txCfg={}) {
      if (TradeXchart.#cnt == 0) {
        TradeXchart.#cfg.CPUCores = navigator.hardwareConcurrency;
        TradeXchart.#cfg.api = {
          permittedClassNames:TradeXchart.permittedClassNames,
        };
      }
      if ((typeof txCfg.talib !== "object") ||
          (typeof txCfg.talib.init !== "function")) {
            TradeXchart.#talibReady = false;
            TradeXchart.#talibError = new Error(`${TradeXchart.initErrMsg}`);
          }
      if (!TradeXchart.#talibReady && TradeXchart.#talibError === null)
      TradeXchart.#talibPromise = txCfg.talib.init(txCfg.wasm);
      TradeXchart.#talibPromise.then(
          () => {
            TradeXchart.#talibReady = true;
            for (let c of TradeXchart.#talibAwait) {
              if (isFunction(c)) c();
            }
          },
          () => { TradeXchart.#talibReady = false; }
        );
    }
    static destroy(chart) {
      if (chart instanceof TradeXchart) {
        chart.end();
        const inCnt = chart.inCnt;
        delete TradeXchart.#instances[inCnt];
      }
    }
    static cnt() {
      return TradeXchart.#cnt++
    }
  constructor () {
    super();
    this.#inCnt = TradeXchart.cnt();
    this.#id = `${ID}_${this.#inCnt}`;
    console.warn(`!WARNING!: ${NAME} breaking changes since V 0.101.7`);
    console.log("TXC:",this.inCnt);
    this.oncontextmenu = window.oncontextmenu;
    this.#workers = WebWorker$1;
  }
  log(l) { if (this.logs) console.log(l); }
  info(i) { if (this.infos) console.info(i); }
  warning(w) { if (this.warnings) console.warn(w); }
  error(e) { if (this.errors) console.error(e); }
  time(n) { if (this.timer) console.time(n); }
  timeLog(n) { if (this.timer) console.timeLog(n); }
  timeEnd(n) { if (this.timer) console.timeEnd(n); }
  set id(id) { this.#id = id; }
  get id() { return this.#id }
  get name() { return this.#name }
  get shortName() { return this.#shortName }
  get mediator() { return this.#mediator }
  get options() { return this.#options }
  get config() { return this.#config }
  get core() { return this.#core }
  get inCnt() { return this.#inCnt }
  set elUtils(el) { this.#elUtils = el; }
  get elUtils() { return this.#elUtils }
  set elTools(el) { this.#elTools = el; }
  get elTools() { return this.#elTools }
  set elBody(el) { this.#elBody = el; }
  get elBody() { return this.#elBody }
  set elMain(el) { this.#elMain = el; }
  get elMain() { return this.#elMain }
  set elTime(el) { this.#elTime = el; }
  get elTime() { return this.#elTime }
  set elYAxis(el) { this.#elYAxis = el; }
  get elYAxis() { return this.#elYAxis }
  set elWidgetsG(el) { this.#elWidgetsG = el; }
  get elWidgetsG() { return this.#elWidgetsG }
  get UtilsBar() { return this.#UtilsBar }
  get ToolsBar() { return this.#ToolsBar }
  get MainPane() { return this.#MainPane }
  get Timeline() { return this.#MainPane.time }
  get WidgetsG() { return this.#WidgetsG }
  get Chart() { return this.#MainPane.chart }
  get Indicators() { return this.#MainPane.indicators }
  get state() { return this.#state }
  get chartData() { return this.#state.data.chart.data }
  get offChart() { return this.#state.data.offchart }
  get onChart() { return this.#state.data.onchart }
  get datasets() { return this.#state.data.datasets }
  get allData() {
    return {
      data: this.chartData,
      onChart: this.onChart,
      offChart: this.offChart,
      datasets: this.datasets
    }
  }
  get rangeLimit() { return (isNumber(this.#rangeLimit)) ? this.#rangeLimit : RANGELIMIT }
  get range() { return this.#range }
  get time() { return this.#time }
  get TimeUtils() { return Time }
  get theme() { return this.#theme.getCurrent() }
  get settings() { return this.#state.data.chart.settings }
  get indicators() { return this.#indicators }
  get TALib() { return this.#TALib }
  get TALibReady() { return TradeXchart.talibReady }
  get TALibError() { return TradeXchart.talibError }
  get talibAwait() { return TradeXchart.talibAwait }
  get TALibPromise() { return TradeXchart.talibPromise }
  get hub() { return this.#hub }
  get candleW() { return this.Timeline.candleW }
  get candlesOnLayer() { return this.Timeline.candlesOnLayer }
  get buffer() { return this.MainPane.buffer }
  get bufferPx() { return this.MainPane.bufferPx }
  set scrollPos(pos) { this.setScrollPos(pos); }
  get scrollPos() { return this.#scrollPos }
  get smoothScrollOffset() { return 0 }
  get rangeScrollOffset() { return Math.floor(this.bufferPx / this.candleW) }
  get mousePos() { return this.#mousePos }
  get pricePrecision() { return this.#pricePrecision }
  get volumePrecision() { return this.#volumePrecision }
  set stream(stream) { return this.setStream(stream) }
  get stream() { return this.#stream }
  get worker() { return this.#workers }
  get isEmpty() { return this.#chartIsEmpty }
  set candles(c) { if (isObject(c)) this.#candles = c; }
  get candles() { return this.#candles }
  start(txCfg) {
    let initCfg = TradeXchart.create(txCfg);
    txCfg = {...initCfg, ...txCfg};
    this.logs = (txCfg?.logs) ? txCfg.logs : false;
    this.infos = (txCfg?.infos) ? txCfg.infos : false;
    this.warnings = (txCfg?.warnings) ? txCfg.warnings : false;
    this.errors = (txCfg?.errors) ? txCfg.errors : false;
    this.timer = (txCfg?.timer) ? txCfg.timer : false;
    this.#config = txCfg;
    this.#inCnt = txCfg.cnt || this.#inCnt;
    this.#modID = txCfg.modID;
    this.#TALib = txCfg.talib;
    this.#el = this;
    this.#core = this;
    let state = copyDeep(txCfg?.state);
    let deepValidate = txCfg?.deepValidate || false;
    let isCrypto = txCfg?.isCrypto || false;
    this.#state = State.create(state, deepValidate, isCrypto);
    delete txCfg.state;
    this.log(`Chart ${this.#id} created with a ${this.#state.status} state`);
    let tf = "1s";
    let ms = SECOND_MS;
    this.#chartIsEmpty = true;
    if (!isObject(txCfg?.stream) && this.#state.data.chart.data.length < 2) {
      this.warning(`${NAME} has no chart data or streaming provided.`)
      ;({tf, ms} = isTimeFrame(txCfg?.timeFrame));
    }
    else if (isObject(txCfg?.stream) && this.#state.data.chart.data.length < 2) {
({tf, ms} = isTimeFrame(txCfg?.timeFrame));
      this.#delayedSetRange = true;
    }
    else {
      tf = this.#state.data.chart.tf;
      ms = this.#state.data.chart.tfms;
      this.#chartIsEmpty = false;
    }
    this.#time.timeFrame = tf;
    this.#time.timeFrameMS = ms;
    console.log("tf:",tf,"ms:",ms);
    const id = (isObject(txCfg) && isString$1(txCfg.id)) ? txCfg.id : null;
    this.setID(id);
    this.classList.add(this.id);
    if (isObject(txCfg)) {
      for (const option in txCfg) {
        if (option in this.props()) {
          this.props()[option](txCfg[option]);
        }
      }
    }
    this.getRange(null, null, {interval: this.#time.timeFrameMS, core: this});
    if (this.#range.Length > 1) {
      const rangeStart = calcTimeIndex(this.#time, this.#rangeStartTS);
      const end = (rangeStart) ?
        rangeStart + this.#rangeLimit :
        this.chartData.length - 1;
      const start = (rangeStart) ? rangeStart : end - this.#rangeLimit;
      this.#rangeLimit = end - start;
      this.setRange(start, end);
    }
    this.insertAdjacentHTML('beforebegin', `<style title="${this.id}_style"></style>`);
    this.#WidgetsG = new Widgets(this, {widgets: txCfg?.widgets});
    this.#UtilsBar = new UtilsBar(this, txCfg);
    this.#ToolsBar = new ToolsBar(this, txCfg);
    this.#MainPane = new MainPane(this, txCfg);
    this.setTheme(this.#themeTemp.ID);
    this.log(`${this.#name} instantiated`);
    this.log("...processing state");
    this.#scrollPos = this.bufferPx * -1;
    this.eventsListen();
    this.elStart(this.theme);
    this.elBody.start(this.theme);
    this.UtilsBar.start();
    this.ToolsBar.start();
    this.MainPane.start();
    this.WidgetsG.start();
    this.stream = this.#config.stream;
    if (this.#delayedSetRange)
      this.on(STREAM_UPDATE, this.delayedSetRange.bind(this));
    this.refresh();
  }
  end() {
    this.log("...cleanup the mess");
    this.removeEventListener('mousemove', this.onMouseMove);
    this.off(STREAM_UPDATE, this.onStreamUpdate);
    this.UtilsBar.end();
    this.ToolsBar.end();
    this.MainPane.end();
    this.WidgetsG.end();
    this.#workers.end();
    this.#state = null;
  }
  eventsListen() {
    this.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.on(STREAM_UPDATE, this.onStreamUpdate.bind(this));
  }
   on(topic, handler, context) {
    if (!isString$1(topic) || !isFunction(handler)) return
    if (!this.#hub[topic]) this.#hub[topic] = [];
    this.#hub[topic].push({handler, context});
  }
  off(topic, handler) {
    if (!isString$1(topic)) return
    const i = (this.#hub[topic] || []).findIndex(h => h === handler);
    if (i > -1) this.#hub[topic].splice(i, 1);
    if (this.#hub[topic].length === 0) delete this.#hub[topic];
  }
  emit(topic, data) {
    if (!isString$1(topic)) return
    (this.#hub[topic] || []).forEach(cb => cb.handler.call(cb.context, data));
  }
  execute(channel, data, cb) {
  }
  onMouseMove(e) {
    this.#mousePos.x = e.clientX;
    this.#mousePos.y = e.clientY;
  }
  onStreamUpdate(candle) {
    const r = this.range;
    if (r.inRange(candle[0])) {
      const max = r.valueMax;
      const min = r.valueMin;
      if (candle[2] > max || candle[3] < min) {
        this.setRange(r.indexStart, r.indexEnd);
        this.emit("chart_yAxisRedraw", this.range);
      }
    }
  }
  props() {
    return {
      width: (width) => this.setWidth(width),
      height: (height) => this.setHeight(height),
      widthMin: (width) => this.setWidthMin(width),
      heightMin: (height) => this.setHeightMin(height),
      widthMax: (width) => this.setWidthMax(width),
      heightMax: (height) => this.setHeightMax(height),
      logs: (logs) => this.logs = (isBoolean(logs)) ? logs : false,
      infos: (infos) => this.infos = (isBoolean(infos)) ? infos : false,
      warnings: (warnings) => this.warnings = (isBoolean(warnings)) ? warnings : false,
      errors: (errors) => this.errors = (isBoolean(errors)) ? errors : false,
      rangeStartTS: (rangeStartTS) => this.#rangeStartTS = (isNumber(rangeStartTS)) ? rangeStartTS : undefined,
      rangeLimit: (rangeLimit) => this.#rangeLimit = (isNumber(rangeLimit)) ? rangeLimit : RANGELIMIT,
      indicators: (indicators) => this.setIndicators(indicators),
      theme: (theme) => { this.#themeTemp = this.addTheme(theme); },
      stream: (stream) => this.#stream = (isObject(stream)) ? stream : {},
      pricePrecision: (precision) => this.setPricePrecision(precision),
      volumePrecision: (precision) => this.setVolumePrecision(precision),
    }
  }
  getInCnt() { return this.#inCnt }
  setID(id) {
    if (isString$1(id))
      this.#id = id + this.#inCnt;
    else
      this.#id = ID + this.#inCnt;
  }
  getID() { return this.#id }
  getModID() { return this.#modID }
  setDimensions(w, h) {
    const dims = super.setDimensions(w, h);
    this.emit("global_resize", dims);
  }
  setUtilsH(h) {
    this.utilsH = h;
    this.#elUtils.style.height = `${h}px`;
  }
  setToolsW(w) {
    this.toolsW = w;
    this.#elTools.style.width = `${w}px`;
  }
  setNotEmpty() {
    this.#chartIsEmpty = false;
  }
    setPricePrecision (pricePrecision) {
    if (!isNumber(pricePrecision) || pricePrecision < 0) {
      pricePrecision = PRICE_PRECISION;
    }
    this.#pricePrecision = pricePrecision;
  }
  setVolumePrecision (volumePrecision) {
    if (!isNumber(volumePrecision) || volumePrecision < 0) {
      volumePrecision = VOLUME_PRECISION;
    }
    this.#volumePrecision = volumePrecision;
  }
  addTheme(theme) {
    this.#theme = Theme.create(theme, this);
    return this.#theme
  }
  setTheme(ID) {
    this.#theme.current = ID;
    const current = this.#theme;
    const style = document.querySelector(`style[title=${this.id}_style]`);
    const borderColour = `var(--txc-border-color, ${current.chart.BorderColour}`;
    let innerHTML = `.${this.id} { `;
    innerHTML +=`--txc-background: ${current.chart.Background}; `;
    this.style.background = `var(--txc-background, ${current.chart.Background})`;
    this.style.border = `${current.chart.BorderThickness}px solid`;
    this.style.borderColor = borderColour;
    innerHTML +=`--txc-border-color:  ${current.chart.BorderColour}; `;
    this.#elMain.rows.style.borderColor = borderColour;
    innerHTML += `--txc-time-scrollbar-color: ${current.chart.BorderColour}; `;
    innerHTML += `--txc-time-handle-color: ${current.xAxis.handle}; `;
    innerHTML += `--txc-time-slider-color: ${current.xAxis.slider}; `;
    innerHTML += `--txc-time-cursor-fore: ${current.xAxis.colourCursor}; `;
    innerHTML += `--txc-time-cursor-back: ${current.xAxis.colourCursorBG}; `;
    innerHTML += `--txc-time-icon-color: ${current.icon.colour}; `;
    innerHTML += `--txc-time-icon-hover-color: ${current.icon.hover}; `;
    this.#elTime.overview.scrollBar.style.borderColor = borderColour;
    this.#elTime.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${current.xAxis.handle})`;
    this.#elTime.overview.style.setProperty("--txc-time-slider-color", current.xAxis.slider);
    this.#elTime.overview.style.setProperty("--txc-time-icon-color", current.icon.colour);
    this.#elTime.overview.style.setProperty("--txc-time-icon-hover-color", current.icon.hover);
    for (let [key, legend] of Object.entries(this.Chart.legend.list)) {
      legend.el.style.color = `var(--txc-legend-color, ${current.legend.colour})`;
      legend.el.style.font = `var(--txc-legend-font, ${current.legend.font})`;
    }
    for (let t of this.#elUtils.icons) {
      if (t.className != "icon-wrapper") continue
      t.children[0].style.fill = current.icon.colour;
    }
    for (let t of this.#elTools.icons) {
      if (t.className != "icon-wrapper") continue
      t.children[0].style.fill = current.icon.colour;
    }
    innerHTML += ` }`;
    style.innerHTML = innerHTML;
  }
  setScrollPos(pos) {
    pos = Math.round(pos);
    if (isNumber(pos) && pos <= 0 && pos >= this.bufferPx * -1) this.#scrollPos = pos;
    else {
      this.emit("Error", `setScrollPos: not a valid value`);
    }
  }
  setStream(stream) {
    if (this.stream instanceof Stream) {
      this.error("Error: Invoke stopStream() before starting a new one.");
      return false
    }
    else if (isObject(stream)) {
      if (this.allData.data.length == 0 && isString$1(stream.timeFrame)) {
({tf, ms} = isTimeFrame(stream?.timeFrame));
        this.#time.timeFrame = tf;
        this.#time.timeFrameMS = ms;
      }
      this.#stream = new Stream(this);
      this.#config.stream = this.#stream.config;
      return this.#stream
    }
  }
  stopStream() {
    if (this.stream instanceof Stream) {
      this.stream.stop();
    }
  }
  delayedSetRange() {
    while (this.#delayedSetRange) {
      let l = this.range.Length * 0.5;
      this.setRange(l * -1, l);
      this.off(STREAM_UPDATE, this.delayedSetRange);
      this.#delayedSetRange = false;
    }
  }
  updateRange(pos) {
    if (!isArray(pos) || !isNumber(pos[4]) || pos[4] == 0) return
    let dist, scrollPos;
    dist = pos[4];
    scrollPos = this.#scrollPos + dist;
    scrollPos % this.candleW;
    if (scrollPos < this.bufferPx * -1) {
      scrollPos = 0;
      this.offsetRange(this.rangeScrollOffset * -1);
    }
    else if (scrollPos > 0) {
      scrollPos = this.bufferPx * -1;
      this.offsetRange(this.rangeScrollOffset);
    }
    this.#scrollPos = scrollPos;
    this.emit("scrollUpdate", scrollPos);
  }
  offsetRange(offset) {
    let start = this.range.indexStart - offset,
        end = this.range.indexEnd - offset;
    this.setRange(start, end);
  }
  getRange(start=0, end=0, config={}) {
    this.#range = new Range(this.allData, start, end, config);
    this.#range.interval = this.#time.timeFrameMS;
    this.#range.intervalStr = this.#time.timeFrame;
    this.#time.range = this.#range;
  }
  setRange(start=0, end=this.rangeLimit) {
    const max = (this.config?.maxCandles)? this.config.maxCandles :
      (this.Chart?.layerWidth) ? this.Chart.layerWidth : this.Chart.width;
    this.#range.set(start, end, max);
  }
  jumpToIndex(start, nearest=true, centre=true) {
    let length = this.range.Length;
    let end = start + length;
    if (nearest) start = limit(start, 0, this.range.dataLength);
    if (centre) {
      start -= length / 2;
      end -= length / 2;
    }
    this.setRange(start, end);
  }
  jumpToTS(ts, nearest=true, centre=true) {
    let start = this.Timeline.xAxis.t2Index(ts);
    this.jumpToIndex(start, nearest=true, centre=true);
  }
  jumpToStart(nearest=true, centre=true) {
    this.jumpToIndex(0, nearest=true, centre=true);
  }
  jumpToEnd(nearest=true, centre=true) {
    let end = this.range.dataLength - this.range.Length;
    if (centre) end += this.range.Length / 2;
    this.jumpToIndex(end, nearest=true, centre=false);
  }
  mergeData(merge, newRange=false, calc=true) {
    if (!isObject(merge)) return false
    let i, j, start, end;
    const data = this.allData.data;
    const mData = merge?.data || false;
    this.allData?.onChart;
    merge?.onChart || false;
    this.allData?.offChart;
    merge?.offChart || false;
    this.allData?.dataset?.data;
    const mDataset = merge?.dataset?.data || false;
    const trades = this.allData?.trades?.data;
    merge?.trades?.data || false;
    const inc = (this.range.inRange(mData[0][0])) ? 1 : 0;
    if (isArray(mData) && mData.length > 0) {
      i = mData.length - 1;
      j = data.length - 1;
      if (data.length == 0) {
        this.allData.data.push(...mData);
        if (calc) this.calcAllIndicators();
      }
      else {
        const r1 = [data[0][0], data[j][0]];
        const r2 = [mData[0][0], mData[i][0]];
        const o = [Math.max(r1[0], r2[0]), Math.min(r1[1], r2[1])];
        if (o[1] >= o[0]) ;
        else {
          this.allData.data.push(...mData);
          if (calc) this.calcAllIndicators();
      }
    }
    if (isArray(mDataset) && mDataset.length > 0) {
      for (let o of mDataset) {
        if (isArray(o?.data) && o?.data.length > 0) ;
      }
    }
    if (isArray(trades) && trades.length > 0) {
      for (let d of trades) {
      }
    }
    if (newRange) {
      if (isObject(newRange)) {
        start = (isNumber(newRange.start)) ? newRange.start : this.range.indexStart;
        end = (isNumber(newRange.end)) ? newRange.end : this.range.indexEnd;
      }
      else {
        if (mData[0][0] )
        start = this.range.indexStart + inc;
        end = this.range.indexEnd + inc;
      }
      this.setRange(start, end);
    }
  }
  }
  isIndicator(i) {
    if (
      typeof i === "function" &&
      ("onChart" in i.prototype) &&
      isFunction(i.prototype?.draw)
    ) return true
    else return false
  }
  setIndicators(i, flush=false) {
    if (!isObject(i)) return false
    if (flush) {
      console.warn(`Expunging all default indicators!`);
      this.#indicators = {};
    }
    for (const [k, v] of Object.entries(i)) {
      if (
        isString$1(v?.id) &&
        isString$1(v?.name) &&
        isString$1(v?.event) &&
        this.isIndicator(v?.ind)
      ) {
        this.#indicators[k] = v;
      }
    }
    return true
  }
  addIndicator(i, name=i, params={}) {
    if (
      !isString$1(i) &&
      !(i in this.#indicators) &&
      !isString$1(name) &&
      !isObject(params)
    ) return false
    const indicator = {
      type: i,
      name: name,
      ...params
    };
    console.log(`Adding the ${name} : ${i} indicator`);
    if (this.#indicators[i].ind.prototype.onChart)
      this.Chart.addIndicator(indicator);
    else
      this.#MainPane.addIndicator(indicator);
    this.emit("addIndicatorDone", indicator);
  }
  hasStateIndicator(i, dataset="searchAll") {
    if (!isString$1(i) || !isString$1(dataset)) return false
    const find = function(i, d) {
      for (let e of d) {
        if (e?.id == i || e.name == i) return true
        else return false
      }
    };
    if (dataset == "searchAll") {
      for (let d of this.allData) {
        if (find(i, d)) return true
      }
      return false
    }
    else {
      if (dataset in this.allData) {
        return find(i, d)
      }
    }
  }
  calcAllIndicators() {
    for (let i of this.Indicators.onchart.values()) {
      i.instance.calcIndicatorHistory();
    }
    for (let i of this.Indicators.offchart.values()) {
      i.instance.calcIndicatorHistory();
    }
  }
  resize(width, height) {
    if (!isNumber(width) && !isNumber(height)) return false
    this.setDimensions(width, height);
    return true
  }
  refresh() {
    let start = this.range.indexStart;
    let end = this.range.indexEnd;
    this.setRange(start, end);
    this.MainPane.draw(undefined, true);
  }
  notImplemented() {
    if (!this.implemented) {
      let content = `
        This feature is not implemented yet.
      `;
      let config = { content };
      this.implemented = this.#WidgetsG.insert("Dialogue", config);
      this.implemented.start();
    }
    else this.implemented.open();
  }
}
if (!window.customElements.get('tradex-chart')) {
  document.head.insertAdjacentHTML("beforeend", cssVars);
  document.head.insertAdjacentHTML("beforeend", style);
  customElements.get('tradex-chart') || customElements.define('tradex-chart', TradeXchart);
}

export { TradeXchart as Chart, DOM, indicator as Indicator, Overlay, copyDeep, isPromise, mergeDeep, uid };
