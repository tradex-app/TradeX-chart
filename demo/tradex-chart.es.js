function uo(n, t) {
  for (var e = 0; e < t.length; e++) {
    const i = t[e];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const s in i)
        if (s !== "default" && !(s in n)) {
          const r = Object.getOwnPropertyDescriptor(i, s);
          r && Object.defineProperty(n, s, r.get ? r : {
            enumerable: !0,
            get: () => i[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
const fo = "0.128.1";
function M(n) {
  return Array.isArray(n);
}
function k(n) {
  return n && typeof n == "function";
}
function S(n) {
  return typeof n == "object" && !Array.isArray(n) && n !== null;
}
function v(n) {
  return typeof n == "number" && !isNaN(n);
}
function G(n) {
  return typeof n == "boolean";
}
function T(n) {
  return typeof n == "string";
}
function lc(n) {
  return !!n && (S(n) || k(n)) && k(n.then);
}
const go = ["y", "M", "d", "h", "m", "s", "ms"], mo = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], po = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], vo = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], _n = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], yo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Dn = 1231006505e3, At = 1, $ = 1e3, H = $ * 60, F = H * 60, O = F * 24, ie = O * 7, tt = O * 30;
function kn(n = 3, t = !1) {
  let e = _n[n % 12] * O;
  return t && n > 0 && (e += O), e;
}
const at = O * 365, Ee = {
  y: at,
  M: tt,
  w: ie,
  d: O,
  h: F,
  m: H,
  s: $,
  u: At
}, Nn = {
  years: at,
  months: tt,
  weeks: ie,
  days: O,
  hours: F,
  minutes: H,
  seconds: $,
  milliseconds: At
}, xo = { ...Ee, ...Nn }, Oe = {
  YEARS10: [at * 10, "years"],
  YEARS5: [at * 5, "years"],
  YEARS3: [at * 3, "years"],
  YEARS2: [at * 2, "years"],
  YEARS: [at, "years"],
  MONTH6: [tt * 6, "months"],
  MONTH4: [tt * 4, "months"],
  MONTH3: [tt * 3, "months"],
  MONTH2: [tt * 2, "months"],
  MONTH: [tt, "months"],
  DAY15: [O * 15, "years"],
  DAY10: [O * 10, "days"],
  DAY7: [O * 7, "days"],
  DAY5: [O * 5, "days"],
  DAY3: [O * 3, "days"],
  DAY2: [O * 2, "days"],
  DAY: [O, "days"],
  HOUR12: [F * 12, "hours"],
  HOUR6: [F * 6, "hours"],
  HOUR4: [F * 4, "hours"],
  HOUR2: [F * 2, "hours"],
  HOUR: [F, "hours"],
  MINUTE30: [H * 30, "minutes"],
  MINUTE15: [H * 15, "minutes"],
  MINUTE10: [H * 10, "minutes"],
  MINUTE5: [H * 5, "minutes"],
  MINUTE2: [H * 2, "minutes"],
  MINUTE: [H, "minutes"],
  SECOND30: [$ * 30, "seconds"],
  SECOND15: [$ * 15, "seconds"],
  SECOND10: [$ * 10, "seconds"],
  SECOND5: [$ * 5, "seconds"],
  SECOND2: [$ * 2, "seconds"],
  SECOND: [$, "seconds"],
  MILLISECOND500: [At * 500, "milliseconds"],
  MILLISECOND250: [At * 250, "milliseconds"],
  MILLISECOND100: [At * 100, "milliseconds"],
  MILLISECOND50: [At * 50, "milliseconds"],
  MILLISECOND: [At, "milliseconds"]
}, wo = () => {
  const n = Object.values(Oe), t = [];
  for (let e = n.length; --e; e > 0)
    t[e] = n[e][0];
  return t;
}, ve = wo(), Eo = () => {
  const n = Object.values(Oe), t = [];
  for (let e = n.length; --e; e > 0)
    t[e] = n[e][1];
  return t;
}, Fi = Eo(), To = Object.keys(Oe), So = () => {
  const n = {};
  for (const [t, e] of Object.entries(Oe))
    n[t] = e[0];
  return n;
}, Co = So(), Vi = {
  0: "Europe/London",
  "-120": "Europe/Tallinn",
  "-60": "Europe/Zurich",
  180: "America/Santiago",
  300: "America/Toronto",
  240: "America/Caracas",
  360: "America/Mexico_City",
  540: "America/Juneau",
  480: "America/Vancouver",
  420: "US/Mountain",
  120: "America/Sao_Paulo",
  "-360": "Asia/Almaty",
  "-300": "Asia/Ashkhabad",
  "-180": "Europe/Moscow",
  "-420": "Asia/Jakarta",
  "-480": "Asia/Taipei",
  "-240": "Asia/Muscat",
  "-345": "Asia/Kathmandu",
  "-330": "Asia/Kolkata",
  "-540": "Asia/Tokyo",
  "-210": "Asia/Tehran",
  "-660": "Pacific/Norfolk",
  "-630": "Australia/Adelaide",
  "-600": "Australia/Brisbane",
  "-780": "Pacific/Fakaofo",
  "-825": "Pacific/Chatham",
  600: "Pacific/Honolulu"
};
function bo() {
  const n = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(Vi, n) ? Vi[n.toString()] : "Etc/UTC";
}
function Mo() {
  const n = {};
  for (let t in Ee) {
    let e = 0;
    n[t] = [];
    do
      n[t].push(Math.round(Ee[t] * e)), e += 0.125;
    while (e < 1);
  }
  return n;
}
function $n(n) {
  const t = new Date(n).getTime();
  return v(t);
}
function Hn(n, t = Dn, e = Date.now()) {
  return $n(n) ? n > t && n < e : !1;
}
const Pt = {
  inSeconds: function(n, t) {
    n = new Date(n), t = new Date(t);
    var e = t.getTime(), i = n.getTime();
    return parseInt((e - i) / $);
  },
  inMinutes: function(n, t) {
    n = new Date(n), t = new Date(t);
    let e = t.getTime(), i = n.getTime();
    return parseInt((e - i) / H);
  },
  inHours: function(n, t) {
    n = new Date(n), t = new Date(t);
    let e = t.getTime(), i = n.getTime();
    return parseInt((e - i) / F);
  },
  inDays: function(n, t) {
    n = new Date(n), t = new Date(t);
    let e = t.getTime(), i = n.getTime();
    return parseInt((e - i) / O);
  },
  inWeeks: function(n, t) {
    n = new Date(n), t = new Date(t);
    let e = t.getTime(), i = n.getTime();
    return parseInt((e - i) / ie);
  },
  inMonths: function(n, t) {
    n = new Date(n), t = new Date(t);
    let e = n.getUTCFullYear(), i = t.getUTCFullYear(), s = n.getUTCMonth();
    return t.getUTCMonth() + 12 * i - (s + 12 * e);
  },
  inYears: function(n, t) {
    let e = new Date(n);
    return new Date(t).getUTCFullYear() - e.getUTCFullYear();
  }
};
function Po(n, t) {
  let e = Pt.inYears(n, t), i = Pt.inMonths(n, t), s = Pt.inWeeks(n, t), r = Pt.inDays(n, t), o = Pt.inHours(n, t), l = Pt.inMinutes(n, t), c = Pt.inSeconds(n, t), f = new Date(t).getTime() - new Date(n).getTime();
  return {
    y: e,
    M: i,
    w: s,
    d: r,
    h: o,
    m: l,
    s: c,
    ms: f,
    years: e,
    months: i,
    weeks: s,
    days: r,
    hours: o,
    minutes: l,
    seconds: c,
    milliseconds: f
  };
}
function ei(n) {
  let t = $;
  return T(n) ? (t = Un(n), t ? n = n : (t = $, n = "1s")) : n = "1s", { tf: n, ms: t };
}
function Un(n) {
  if (!T(n))
    return !1;
  const t = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let e;
  return (e = t.exec(n)) !== null ? Ee[e[2]] * e[1] : !1;
}
function ts(n) {
  let t = Math.floor(n / 1e3), e = Math.floor(t / 60);
  t = t % 60;
  let i = Math.floor(e / 60);
  e = e % 60;
  let s = Math.floor(i / 24);
  i = i % 24;
  let r = Math.floor(s / 7);
  s = s % 7;
  let o = Math.floor(r / 4), l = Math.floor(r / 52), c = r % 4;
  return o = o % 13, {
    y: l,
    M: o,
    w: c,
    d: s,
    h: i,
    m: e,
    s: t,
    years: l,
    months: o,
    weeks: c,
    days: s,
    hours: i,
    minutes: e,
    seconds: t
  };
}
function ye(n) {
  const t = ts(n);
  for (const e in t)
    if (t[e])
      return `${t[e]}${e}`;
}
function es(n) {
  return n ? new Date(n).getUTCSeconds() : null;
}
function is(n) {
  return new Date(n).setUTCMilliseconds(0, 0);
}
function pi(n) {
  return n ? new Date(n).getUTCMinutes() : null;
}
function ss(n) {
  return new Date(n).setUTCSeconds(0, 0);
}
function ns(n) {
  return n ? new Date(n).getUTCHours() : null;
}
function rs(n) {
  return new Date(n).setUTCMinutes(0, 0, 0);
}
function os(n) {
  return n ? new Date(n).getUTCDate() : null;
}
function Lo(n, t = "en-GB", e = "short") {
  return new Date(n).toLocaleDateString(t, { weekday: e });
}
function Te(n) {
  return new Date(n).setUTCHours(0, 0, 0, 0);
}
function as(n) {
  if (n)
    return new Date(n).getUTCMonth();
}
function Bn(n, t = "en-GB", e = "short") {
  return new Date(n).toLocaleDateString(t, { month: e });
}
function hs(n) {
  let t = new Date(n);
  return Date.UTC(
    t.getUTCFullYear(),
    t.getUTCMonth(),
    1
  );
}
function zn(n) {
  let t = (as(n) + 1) % 12;
  return n += kn(t, vi(n)), n;
}
function Wn(n) {
  if (n)
    return new Date(n).getUTCFullYear();
}
function ls(n) {
  return Date.UTC(new Date(n).getUTCFullYear());
}
function Fn(n) {
  return n = n + at + O, vi(n), n;
}
function vi(n) {
  let e = new Date(n).getUTCFullYear();
  return e & 3 ? !1 : e % 100 != 0 || e % 400 == 0;
}
function Ao(n) {
  let t = new Date(n), e = t.getUTCMonth(), i = t.getUTCDate(), s = dayCount[e] + i;
  return e > 1 && vi() && s++, s;
}
function ii(n, t) {
  return {
    years: (i) => ls(i),
    months: (i) => hs(i),
    weeks: (i) => Te(i),
    days: (i) => Te(i),
    hours: (i) => rs(i),
    minutes: (i) => ss(i),
    seconds: (i) => is(i)
  }[t](n);
}
function Oo(n, t) {
  let e, i;
  switch (t) {
    case "years":
      e = ls(n), i = Fn(n);
      break;
    case "months":
      e = hs(n), i = zn(n);
      break;
    case "weeks":
      e = Te(n), i = e + O;
      break;
    case "days":
      e = Te(n), i = e + O;
      break;
    case "hours":
      e = rs(n), i = e + F;
      break;
    case "minutes":
      e = ss(n), i = e + H;
      break;
    case "seconds":
      e = is(n), i = e + $;
  }
  return { start: e, end: i };
}
function Io(n) {
  String(os(n)).padStart(2, "0");
}
function Vn(n) {
  let t = String(ns(n)).padStart(2, "0"), e = String(pi(n)).padStart(2, "0");
  return `${t}:${e}`;
}
function Ro(n) {
  let t = String(ns(n)).padStart(2, "0"), e = String(pi(n)).padStart(2, "0"), i = String(es(n)).padStart(2, "0");
  return `${t}:${e}:${i}`;
}
function Gi(n) {
  let t = String(pi(n)).padStart(2, "0"), e = String(es(n)).padStart(2, "0");
  return `${t}:${e}`;
}
function _o(n, t) {
  let e = 1 / 0, i = null, s = -1;
  for (let r = 0; r < t.length; r++) {
    let o = t[r][0];
    Math.abs(o - n) < e && (e = Math.abs(o - n), i = t[r], s = r);
  }
  return [s, i];
}
const Do = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: Dn,
  DAY_MS: O,
  DM: Io,
  HM: Vn,
  HMS: Ro,
  HOUR_MS: F,
  MILLISECOND: At,
  MINUTE_MS: H,
  MONTHMAP: yo,
  MONTHR_MS: tt,
  MONTH_MS: kn,
  MS: Gi,
  SECOND_MS: $,
  TIMESCALES: ve,
  TIMESCALESKEYS: To,
  TIMESCALESRANK: Fi,
  TIMESCALESVALUES: Oe,
  TIMESCALESVALUESKEYS: Co,
  TIMEUNITS: go,
  TIMEUNITSLONG: mo,
  TIMEUNITSVALUES: xo,
  TIMEUNITSVALUESLONG: Nn,
  TIMEUNITSVALUESSHORT: Ee,
  WEEK_MS: ie,
  YEAR_MS: at,
  buildSubGrads: Mo,
  dayCntInc: po,
  dayCntLeapInc: vo,
  dayOfYear: Ao,
  day_start: Te,
  getTimezone: bo,
  get_day: os,
  get_dayName: Lo,
  get_hour: ns,
  get_minute: pi,
  get_month: as,
  get_monthName: Bn,
  get_second: es,
  get_year: Wn,
  hour_start: rs,
  interval2MS: Un,
  isLeapYear: vi,
  isTimeFrame: ei,
  isValidTimeInRange: Hn,
  isValidTimestamp: $n,
  minute_start: ss,
  monthDayCnt: _n,
  month_start: hs,
  ms2Interval: ye,
  ms2TimeUnits: ts,
  nearestTs: _o,
  nextMonth: zn,
  nextYear: Fn,
  second_start: is,
  time_start: ii,
  timestampDiff: Pt,
  timestampDifference: Po,
  timezones: Vi,
  unitRange: Oo,
  year_start: ls
}, Symbol.toStringTag, { value: "Module" }));
function ko(n, t) {
  return n = Math.ceil(n) + 1, t = Math.floor(t), Math.floor(Math.random() * (t - n) + n);
}
function No(n) {
  const t = {};
  return t.value = n, t.sign = !!n, t.integers = Gn(n), t.decimals = Yn(n), t.total = t.integers + t.decimals, t;
}
function Gn(n) {
  return (Math.log10((n ^ n >> 31) - (n >> 31)) | 0) + 1;
}
function $o(n) {
  return n | 0;
}
function _i(n, t) {
  t = t || 100;
  const e = Math.pow(10, t);
  return Math.round((n + Number.EPSILON) * e) / e;
}
function J(n, t = 0) {
  var e = n * Math.pow(10, t), i = Math.round(e), s = (e > 0 ? e : -e) % 1 === 0.5 ? i % 2 === 0 ? i : i - 1 : i;
  return s / Math.pow(10, t);
}
function Yn(n) {
  if (typeof n != "number" && (n = parseFloat(n)), isNaN(n) || !isFinite(n))
    return 0;
  for (var t = 1, e = 0; Math.round(n * t) / t !== n && (t *= 10, t !== 1 / 0); )
    e++;
  return e;
}
function Ho(n) {
  return Math.log(n) / Math.log(10);
}
function Uo(n, t) {
  return Math.pow(n, t);
}
function et(n, t, e) {
  return Math.min(e, Math.max(t, n));
}
function Se(n, t) {
  return !S(n) || !S(t) ? t : (Object.keys(t).forEach((e) => {
    const i = n[e], s = t[e];
    Array.isArray(i) && Array.isArray(s) ? n[e] = Se(i.concat([]), s) : S(i) && S(s) ? n[e] = Se(Object.assign({}, i), s) : n[e] = s;
  }), n);
}
function it(n) {
  if (n === null || typeof n != "object" || "isActiveClone" in n)
    return n;
  if (n instanceof Date)
    var t = new n.constructor();
  else
    var t = Array.isArray(n) ? [] : {};
  for (var e in n)
    Object.prototype.hasOwnProperty.call(n, e) && (n.isActiveClone = null, t[e] = it(n[e]), delete n.isActiveClone);
  return t;
}
function qn(n, t, e) {
  const [i, ...s] = t.split(".");
  return {
    ...n,
    [i]: s.length ? qn(n[i], s.join("."), e) : e
  };
}
function zs(n, t) {
  return t.split(".").reduce((i, s) => i && i[s] !== "undefined" ? i[s] : void 0, n);
}
function Bo(n, t) {
  let e = n.length;
  for (; e--; )
    if (n[e] !== t[e])
      return !1;
  return !0;
}
function zo(n, t, e) {
  [myArray[t], myArray[e]] = [myArray[e], myArray[t]];
}
function Q(n = "ID") {
  v(n) ? n = n.toString() : T(n) || (n = "ID"), n = n.replace(/ |,|;|:|\.|#/g, "_");
  const t = Date.now().toString(36), e = Math.random().toString(36).substring(2, 5);
  return `${n}_${t}_${e}`;
}
function Wo(n, t) {
  return M(t) ? M(n) ? n.every((e) => t.includes(e)) : t.includes(n) : !1;
}
const Fo = (n) => n.entries().next().value, Vo = (n) => n.entries().next().value[0], Go = (n) => n.entries().next().value[1], Yo = (n) => [...n].pop(), qo = (n) => [...n.keys()].pop(), Xo = (n) => [...n.values()].pop();
class lt extends Map {
  constructor(t) {
    super(t);
  }
  indexOfKey(t) {
    return [...this.keys()].indexOf(t);
  }
  indexOfValue(t) {
    return [...this.values()].indexOf(t);
  }
  entryAtIndex(t) {
    return [...this.entries()][t];
  }
  keyAtIndex(t) {
    return [...this.keys()][t];
  }
  valueAtIndex(t) {
    return [...this.values()][t];
  }
  insert(t, e, i) {
    return insertAtMapIndex(i, t, e, this);
  }
  remove(t) {
    return removeMapIndex(t, this);
  }
  firstEntry() {
    return Fo(this);
  }
  firstKey() {
    return Vo(this);
  }
  firstValue() {
    return Go(this);
  }
  lastEntry() {
    return Yo(this);
  }
  lastKey() {
    return qo(this);
  }
  lastValue() {
    return Xo(this);
  }
  prevCurrNext(t) {
    let e = curr = next = null;
    for (let i of this)
      if (e = curr, curr = i, i.key == t)
        break;
    return { prev: e, curr, next };
  }
  union(...t) {
    if (typeof super.prototype.union == "function")
      super.union(...t);
    else
      for (const e of t)
        for (const i of e)
          this.set(...i);
  }
  setMultiple(t) {
    return M(t) ? (arr.forEach(([e, i]) => this.set(e, i)), !0) : !1;
  }
  populate(t) {
    return M(t) ? (this.clear(), arr.forEach(([e, i]) => this.set(e, i)), !0) : !1;
  }
  insertIndex(t, e, i) {
    if (!v(t))
      return !1;
    const s = [...this];
    return s.splice(t, 0, [e, i]), this.populate(s), !0;
  }
  removeIndex(t) {
    if (!v(t))
      return !1;
    const e = [...this];
    return e.splice(t, 1), this.populate(e), !0;
  }
  swapIndices(t, e) {
    if (!v(t) || !v(e))
      return !1;
    const i = [...this];
    return zo(i, t, e), this.populate(i), !0;
  }
  swapKeys(t, e) {
    const i = [...this], s = i.findIndex(([o]) => o === t), r = i.findIndex(([o]) => o === e);
    return [i[s], i[r]] = [i[r], i[s]], this.clear(), i.forEach(([o, l]) => this.set(o, l)), !0;
  }
}
function Rt(n, t = 100, e, i = !1) {
  var s, r = function() {
    var o = e || this, l = arguments, c = function() {
      s = null, i || n.apply(o, l);
    }, f = i && !s;
    clearTimeout(s), s = setTimeout(c, t), f && n.apply(o, l);
  };
  return r;
}
function jo(n, t = 250, e) {
  var i, s, r = function() {
    var l = e || this, c = +/* @__PURE__ */ new Date(), f = arguments;
    i && c < i + t ? (clearTimeout(s), s = setTimeout(function() {
      i = c, n.apply(l, f);
    }, t)) : (i = c, n.apply(l, f));
  };
  function o() {
    timeout && (clearTimeout(s), timeout = void 0);
  }
  return r.reset = function() {
    o(), i = 0;
  }, r;
}
class Zo {
  #t;
  #e;
  #r;
  #s = [];
  constructor(t, e) {
    this.#t = t, this.#e = T(e.id) ? e.id : Q, this.#r = T(e.type) ? e.type : "default", this.#s = M(e.data) ? e.data : [];
  }
}
function Ko(n, t = !1) {
  if (!M(n))
    return !1;
  let e = ko(0, n.length);
  if (!si(n[0], t) || !si(n[e], t) || !si(n[n.length - 1], t))
    return !1;
  let i = n[0][0], s = n[1][0], r = n[2][0];
  return !(i > s && s > r);
}
function Qo(n, t = !1) {
  if (!M(n))
    return !1;
  let e = 0, i = 0;
  for (; e < n.length; ) {
    if (!si(n[e], t) || n[e][0] < i)
      return !1;
    i = n[e][0], e++;
  }
  return !0;
}
function si(n, t = !1) {
  return !(!M(n) || n.length !== 6 || t && !Hn(n[0]) || !v(n[1]) || !v(n[2]) || !v(n[3]) || !v(n[4]) || !v(n[5]));
}
function Jo(n) {
  for (let t of n)
    for (let e = 0; e < 6; e++)
      t.length = 6, t[e] *= 1;
  return n;
}
const ta = H, ea = "1m", ai = ta, ia = 6, Ws = 0.05, sa = 100, Fs = 100, jt = ["default", "percent", "log"], Vs = 0.3, Gs = 30, Xe = 200, Ys = 200, qs = 20, Xs = 4096, yi = 5, js = 50, Zs = 30, na = 8;
class Yi {
  #t = ai;
  #e = "1s";
  indexStart = 0;
  indexEnd = Xe;
  valueMin = 0;
  valueMax = 0;
  valueDiff = 0;
  volumeMin = 0;
  volumeMax = 0;
  volumeDiff = 0;
  valueMinIdx = 0;
  valueMaxIdx = 0;
  volumeMinIdx = 0;
  volumeMaxIdx = 0;
  old = {};
  initialCnt = Gs;
  limitFuture = Xe;
  limitPast = Ys;
  minCandles = qs;
  maxCandles = Xs;
  yAxisBounds = Vs;
  rangeLimit = Xe;
  anchor;
  #r;
  #s;
  #i = !0;
  constructor(t, e, i = {}) {
    if (!S(i) || !(i?.core instanceof L))
      return !1;
    this.#i = !0, this.setConfig(i), this.#r = i.core, t = v(t) ? t : 0, e = v(e) ? e : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const s = i?.interval || ai;
    if (this.data.length == 0) {
      let r = Date.now();
      t = 0, e = this.rangeLimit, this.#t = s, this.#e = ye(this.interval), this.anchor = r - r % s;
    } else
      this.data.length < 2 ? (this.#t = s, this.#e = ye(this.interval)) : (this.#t = qi(this.data), this.#e = ye(this.interval));
    e == 0 && this.data.length >= this.rangeLimit ? e = this.rangeLimit : e == 0 && (e = this.data.length), this.set(t, e);
  }
  get allData() {
    return this.#r.allData;
  }
  get data() {
    return this.allData?.data || [];
  }
  get dataLength() {
    return this.allData?.data.length == 0 ? 0 : this.allData.data.length - 1;
  }
  get Length() {
    return this.indexEnd - this.indexStart;
  }
  get timeDuration() {
    return this.timeFinish - this.timeStart;
  }
  get timeMin() {
    return this.value(this.indexStart)[0];
  }
  get timeMax() {
    return this.value(this.indexEnd)[0];
  }
  get rangeDuration() {
    return this.timeMax - this.timeMin;
  }
  get timeStart() {
    return this.value(0)[0];
  }
  get timeFinish() {
    return this.value(this.dataLength)[0];
  }
  set interval(t) {
    this.#t = t;
  }
  get interval() {
    return this.#t;
  }
  set intervalStr(t) {
    this.#e = t;
  }
  get intervalStr() {
    return this.#e;
  }
  end() {
    WebWorker.destroy(this.#s.id);
  }
  set(t = 0, e = this.dataLength, i = this.maxCandles, s) {
    if (!v(t) || !v(e) || !v(i))
      return !1;
    t = t | 0, e = e | 0, i = i | 0, i = et(i, this.minCandles, this.maxCandles), t > e && ([t, e] = [e, t]), e = et(e, t + this.minCandles, t + i);
    let r = e - t;
    t = et(t, this.limitPast * -1, this.dataLength + this.limitFuture - this.minCandles - 1), e = et(e, t + this.minCandles, this.dataLength + this.limitFuture - 1), t = e - t < r ? t - (r - (e - t)) : t;
    const o = t, l = e, c = this.indexStart, f = this.indexEnd;
    let p = this.Length;
    this.indexStart = t, this.indexEnd = e, p -= this.Length;
    let x = this.maxMinPriceVol({ data: this.data, start: this.indexStart, end: this.indexEnd, that: this });
    return this.setMaxMin(x), this.setConfig(s), this.#r.emit("setRange", [o, l, c, f]), !0;
  }
  setConfig(t) {
    if (!S(t))
      return !1;
    this.initialCnt = v(t?.initialCnt) ? t.initialCnt : Gs, this.limitFuture = v(t?.limitFuture) ? t.limitFuture : Xe, this.limitPast = v(t?.limitPast) ? t.limitPast : Ys, this.minCandles = v(t?.minCandles) ? t.minCandles : qs, this.maxCandles = v(t?.maxCandles) ? t.maxCandles : Xs, this.yAxisBounds = v(t?.yAxisBounds) ? t.yAxisBounds : Vs;
  }
  setMaxMin(t) {
    for (let e in t)
      this.old[e] = this[e], this[e] = t[e];
    this.scale = this.dataLength != 0 ? this.Length / this.dataLength : 1;
  }
  value(t, e = "chart") {
    let i;
    if (e == "chart")
      i = this.data;
    else if (i = this.getDataById(e), !i)
      return null;
    v(t) || (t = i.length - 1);
    let s = i[t];
    if (s !== void 0)
      return s;
    {
      const r = i.length - 1;
      return s = [null, null, null, null, null, null], i.length < 1 ? (s[0] = Date.now() + this.interval * t, s) : t < 0 ? (s[0] = i[0][0] + this.interval * t, s) : t > r ? (s[0] = i[r][0] + this.interval * (t - r), s) : null;
    }
  }
  valueByTS(t, e) {
    if (!v(t) || !T(e))
      return !1;
    const i = this.getTimeIndex(t);
    switch (e) {
      case "chart":
        break;
      case "primary":
        break;
      case "secondary":
        break;
      case "dataset":
        break;
      case "all":
        break;
      default:
        if (e.length = 0)
          return this.value(i);
        e.split("_");
        break;
    }
  }
  getDataById(t) {
    if (!T(t))
      return !1;
    const e = t.split("_");
    switch (e[1]) {
      case "chart":
        return this.data;
      case "primary":
        for (let i of this.allData.primaryPane)
          if (e[2] in i)
            return i[e[2]];
        return !1;
      case "secondary":
        for (let i of this.allData.secondaryPane)
          if (e[2] in i)
            return i[e[2]];
        return !1;
      case "datasets":
        for (let i of this.allData.datasets)
          if (e[2] in i)
            return i[e[2]];
        return !1;
      default:
        return !1;
    }
  }
  getTimeIndex(t) {
    if (!v(t))
      return !1;
    t = t - t % this.interval;
    let e = this.data.length > 0 ? this.data[0][0] : this.anchor;
    return t === e ? 0 : t < e ? (e - t) / this.interval * -1 : (t - e) / this.interval;
  }
  inRange(t) {
    return t >= this.timeMin && t <= this.timeMax;
  }
  inPriceHistory(t) {
    return t >= this.timeStart && t <= this.timeFinish;
  }
  inRenderRange(t) {
    let e = this.getTimeIndex(t), i = this.#r.rangeScrollOffset;
    return e >= this.indexStart - i && e <= this.indexEnd + i;
  }
  rangeIndex(t) {
    return this.getTimeIndex(t) - this.indexStart;
  }
  maxMinPriceVol(t) {
    let { data: e, start: i, end: s, that: r } = { ...t }, o = J(this.#r.bufferPx / this.#r.candleW);
    if (o = v(o) ? o : 0, i = v(i) ? i - o : 0, i = i > 0 ? i : 0, s = typeof s == "number" ? s : e?.length - 1, e.length == 0)
      return {
        valueMin: 0,
        valueMax: 1,
        volumeMin: 0,
        volumeMax: 0,
        valueMinIdx: 0,
        valueMaxIdx: 0,
        volumeMinIdx: 0,
        volumeMaxIdx: 0
      };
    let l = e.length - 1, c = Vt(i, 0, l), f = Vt(s, 0, l), p = e[c][3], x = e[c][2], C = e[c][5], b = e[c][5], A = c, _ = c, q = c, bt = c;
    for (; c++ < f; )
      e[c][3] < p && (p = e[c][3], A = c), e[c][2] > x && (x = e[c][2], _ = c), e[c][5] < C && (C = e[c][5], q = c), e[c][5] > b && (b = e[c][5], bt = c);
    let z = x - p;
    return p -= z * r.yAxisBounds, p = p > 0 ? p : 0, x += z * r.yAxisBounds, z = x - p, {
      valueMin: p,
      valueMax: x,
      valueDiff: x - p,
      volumeMin: C,
      volumeMax: b,
      volumeDiff: b - C,
      valueMinIdx: A,
      valueMaxIdx: _,
      volumeMinIdx: q,
      volumeMaxIdx: bt
    };
    function Vt(ae, _e, Gt) {
      return Math.min(Gt, Math.max(_e, ae));
    }
  }
  snapshot(t, e) {
    return {
      snapshot: !0,
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
    };
  }
}
function qi(n) {
  let t = Math.min(n.length - 1, 99), e = 1 / 0;
  return n.slice(0, t).forEach((i, s) => {
    let r = n[s + 1][0] - i[0];
    r === r && r < e && (e = r);
  }), e;
}
function ra(n, t) {
  if (!v(t))
    return !1;
  let e, i = n.timeFrameMS;
  return t = t - t % i, t === n.range.data[0][0] ? e = 0 : t < n.range.data[0][0] ? e = (n.range.data[0][0] - t) / i * -1 : e = (t - n.range.data[0][0]) / i, e;
}
const pe = "TradeX-Chart", xe = "TX", oa = "tradeXutils", Ks = "tradeXmenus", aa = "tradeXmenu", Qs = "tradeXdividers", Js = "tradeXwindows", ha = "tradeXwindow", la = 500, ca = "stream_None", we = "stream_Listening", tn = "stream_Started", da = "stream_Stopped", ua = "stream_Error", Ce = "stream_candleFirst", Et = "stream_candleUpdate", be = "stream_candleNew", fa = 250, ga = 8, ma = 2, pa = 2, va = "defaultState", ya = {
  id: va,
  key: "",
  status: "default",
  isEmpty: !0,
  chart: {
    name: "Primary",
    type: "candles",
    candleType: "CANDLE_SOLID",
    indexed: !1,
    data: [],
    settings: {},
    tf: ea,
    tfms: ai
  },
  views: [],
  primary: [],
  secondary: [],
  datasets: [],
  tools: [],
  ohlcv: []
};
class I {
  static #t = new lt();
  static get default() {
    return it(ya);
  }
  static get list() {
    return I.#t;
  }
  static create(t, e = !1, i = !1) {
    const s = new I(t, e, i), r = s.key;
    return I.#t.set(r, s), s;
  }
  static validate(t, e = !1, i = !1) {
    const s = this.default;
    if (S(t) || (t = {}), S(t.chart) || (t.chart = s.chart, t.chart.isEmpty = !0, t.chart.data = M(t.ohlcv) ? t.ohlcv : [], delete t.ohlcv), t = Se(s, t), e ? t.chart.data = Qo(t.chart.data, i) ? t.chart.data : [] : t.chart.data = Ko(t.chart.data, i) ? t.chart.data : [], t.chart.isEmpty = t.chart.data.length == 0, !v(t.chart?.tf) || e) {
      let c = qi(t.chart.data);
      c < $ && (c = ai), t.chart.tfms = c;
    }
    if ((!T(t.chart?.tfms) || e) && (t.chart.tf = ye(t.chart.tfms)), M(t.views) || (t.views = s.views), M(t.primary) || (t.primary = s.primary), M(t.secondary) || (t.secondary = s.secondary), S(t.chart.settings) || (t.chart.settings = s.chart.settings), M(t.datasets) || (t.datasets = []), t.views.length == 0) {
      t.views.push(["primary", t.primary]);
      for (let c in t)
        c.indexOf("secondary") == 0 && t.views.push([c, t[c]]);
    }
    let r = t.views, o = r.length;
    for (; o--; )
      if (!M(r[o]) || r[o].length == 0)
        r.splice(o, 1);
      else {
        let c = t.views[o][1], f = c.length;
        for (; f--; )
          !S(c[f]) && !T(c[f].name) && !T(c[f].type) && !M(c[f].data) ? c.splice(f, 1) : S(c[f].settings) || (c[f].settings = {});
        r[o].length == 0 && r.splice(o, 1);
      }
    t.views.length == 0 && (t.views[0] = ["primary", s.primary]), t.views = new lt(t.views), t.views.has("primary") || t.views.insert("primary", s.primary, 0), t.views.get("primary").push(t.chart);
    for (var l of t.datasets)
      this.#i || (this.#i = {}), this.dss[l.id] = new Zo(this, l);
    return t;
  }
  static delete(t) {
    if (!T(t) || !I.has(t))
      return !1;
    I.#t.delete(t);
  }
  static has(t) {
    return I.#t.has(t);
  }
  static get(t) {
    return I.#t.get(t);
  }
  static export(t, e = {}) {
    if (!I.has(t))
      return !1;
    S(e) || (e = {});
    const i = I.get(t), s = e?.type, r = it(i.data), o = r.chart.data;
    let l;
    switch (o.length > 0 && o[o.length - 1].length > 6 && (o.length = o.length - 1), r.views.get("primary").pop(), r.views = Array.from(r.views), s) {
      case "json":
      default:
        const { replacer: c, space: f } = { ...e };
        l = JSON.stringify(r, c, f);
    }
    return l;
  }
  #e = "";
  #r = "";
  #s = {};
  #i = {};
  #n;
  #o = !1;
  #h = !0;
  #l = [];
  constructor(t, e = !1, i = !1) {
    S(t) ? (this.#s = I.validate(t, e, i), this.#o = "valid", this.#h = !!this.#s.chart?.isEmpty, this.#n = t?.core instanceof L ? t.core : void 0) : (this.#s = I.default, this.#o = "default", this.#h = !0), this.#e = t?.id || "", this.#r = Q(`${xe}_state`);
  }
  get id() {
    return this.#e;
  }
  get key() {
    return this.#r;
  }
  get status() {
    return this.#o;
  }
  get isEmpty() {
    return this.#h;
  }
  get allData() {
    return {
      data: this.#s.chart.data,
      primaryPane: this.#s.secondary,
      secondaryPane: this.#s.secondary,
      datasets: this.#s.datasets
    };
  }
  get data() {
    return this.#s;
  }
  get core() {
    return this.#n !== void 0 ? this.#n : !1;
  }
  get time() {
    return this.#n.time;
  }
  get range() {
    return this.#n.range;
  }
  error(t) {
    this.#n.error(t);
  }
  create(t, e, i) {
    return I.create(t, e, i);
  }
  delete(t) {
    if (!T(t))
      return !1;
    if (t !== this.key)
      I.delete(t);
    else if (I.has(t)) {
      const e = I.create();
      this.use(e.key), I.delete(t);
    }
  }
  list() {
    return I.list;
  }
  has(t) {
    return I.has(t);
  }
  get(t) {
    return I.get(t);
  }
  use(t) {
    const e = this.core;
    if (!I.has(t))
      return e && e.warn(`${e.name} id: ${e.id} : Specified state does not exist`), !1;
    if (t === this.key)
      return !0;
    let i = I.get(t);
    this.#e = i.id, this.#r = i.key, this.#o = i.status, this.#h = i.isEmpty, this.#s = i.data, e && e.refresh();
  }
  export(t = this.key, e = {}) {
    return I.export(t, e = {});
  }
  mergeData(t, e = !1, i = !0) {
    if (!S(t))
      return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let s = t.data.length - 1;
    if ((this.#h || !v(this.time.timeFrameMS)) && (!S(e) || !v(e.start) || !v(e.end)) && s > 1 && (e = { start: s - this.range.initialCnt, end: s }), s > 1 && this.time.timeFrameMS !== qi(t.data))
      return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    if ("data" in t && !M(t.data))
      return this.error(`ERROR: ${this.core.id}: merge chart data must be of type Array!`), !1;
    S(e) && (e.start = v(e.start) ? this.range.value(e.start)[0] : this.range.timeMin, e.end = v(e.end) ? this.range.value(e.end)[0] : this.range.timeMax);
    let r, o, l = t?.data || !1;
    const c = this.allData.data;
    this.allData?.primaryPane, t?.primaryPane, this.allData?.secondaryPane, t?.secondaryPane, this.allData?.dataset?.data;
    const f = t?.dataset?.data || !1, p = this.allData?.trades?.data;
    t?.trades?.data;
    const x = this.range.inRange(l[0][0]) ? 1 : 0;
    if (M(l) && l.length > 0) {
      if (r = l.length - 1, c.length - 1, this.range.inRange(l[0][0]) && this.range.inRange(l[0][r]), !G(l[r][7]) && l[r].length !== 8 && l[r][6] !== null && l[r][7] !== !0 && (l = Jo(l)), c.length == 0)
        this.allData.data.push(...l);
      else {
        let C = [], b, A;
        if (e = e || {
          start: this.range.timeMin,
          end: this.range.timeMax
        }, c[0][0] < l[0][0] ? (b = c, A = l) : (b = l, A = c), A.length == 1 && A[0][0] == b[b.length - 1][0])
          b[b.length - 1] = A[0], C = b;
        else if (A.length == 1 && A[0][0] == b[b.length - 1][0] + this.range.interval)
          C = b.concat(A);
        else if (b[b.length - 1][0] >= A[0][0]) {
          let _ = 0;
          for (; b[_][0] < A[0][0]; )
            C.push(b[_]), _++;
          C = C.concat(A);
          let q = _ + A.length;
          q < b.length && (C = C.concat(b.slice(q)));
        } else if (A[0][0] - b[b.length - 1][0] > this.range.interval) {
          C = b;
          let _ = b[b.length - 1][0], q = Math.floor((A[0][0] - _) / this.range.interval);
          for (q; q > 0; q--)
            C.push([_, null, null, null, null, null]), C = C.concat(A);
        } else
          C = b.concat(A);
        this.data.chart.data = C;
      }
      if (i && this.#n.calcAllIndicators(), M(f) && f.length > 0)
        for (let C of f)
          M(C?.data) && C?.data.length > 0;
      if (M(p) && p.length > 0)
        for (let C of p)
          ;
      return e && (S(e) ? (o = v(e.start) ? this.range.getTimeIndex(e.start) : this.range.indexStart, s = v(e.end) ? this.range.getTimeIndex(e.end) : this.range.indexEnd) : (l[0][0] && (o = this.range.indexStart + x), s = this.range.indexEnd + x), this.#n.setRange(o, s)), this.#n.refresh(), this.#h = !1, !0;
    }
  }
}
class kt {
  #t;
  #e;
  #r;
  #s = {};
  #i;
  #n;
  #o = "stopped";
  #h;
  #l;
  #a;
  #c;
  #u = ["await", "idle", "running", "stopped"];
  constructor(t, e) {
    if (!kt.validateConfig(t))
      return !1;
    const i = { ...t };
    this.id = i.id, this.#i = i, this.#e = i.initial, this.#s.origin = e, this.#c = i.actions, this.#n = e.core, this.#d();
  }
  set id(t) {
    this.#t = String(t).replace(/ |,|;|:|\.|#/g, "_");
  }
  get id() {
    return this.#t;
  }
  get state() {
    return this.#e;
  }
  get previousSate() {
    return this.#r;
  }
  get context() {
    return this.#s;
  }
  get core() {
    return this.#n;
  }
  get status() {
    return this.#o;
  }
  get event() {
    return this.#l;
  }
  get events() {
    return this.#h;
  }
  get eventData() {
    return this.#a;
  }
  get actions() {
    return this.#c;
  }
  notify(t, e) {
    this.#l = t, this.#a = e;
    const i = this.#i.states[this.#e];
    let s = i.on[t];
    if (!s || !k(s.action) || this.#o !== "running")
      return !1;
    let r = s?.condition?.type || s?.condition || !1;
    if (r && !this.condition.call(this, r, s.condition))
      return !1;
    const o = s.target, l = this.#i.states[o];
    if (i?.onExit.call(this, e), s.action.call(this, e), this.#r = this.#e, this.#e = o, l?.onEnter.call(this, e), this.#i.states[o]?.on && (this.#i.states[o].on[""] || this.#i.states[o].on?.always)) {
      const c = this.#i.states[o].on[""] || this.#i.states[o].on.always;
      if (M(c))
        for (let f of c) {
          let p = f?.condition?.type || f?.condition || !1;
          this.condition.call(this, p, f.condition) && T(f.target) && (f?.action.call(this, e), this.#r = this.#e, this.#e = f?.target, this.notify(null, null));
        }
      else if (S(c) && T(c.target)) {
        let f = c?.condition?.type || c?.condition || !1;
        this.condition.call(this, f, c.condition) && T(c.target) && (c?.action.call(this, e), this.#r = this.#e, this.#e = c.target, this.notify(null, null));
      }
    }
    return this.#e;
  }
  condition(t, e = null, i = {}) {
    return t ? this.#i.guards[t].call(this, this.#s, e, i) : !1;
  }
  canTransition(t) {
    const e = this.#i.states[this.#e];
    return t in e.on;
  }
  start() {
    this.#o = "running";
  }
  stop() {
    this.#o = "stopped";
  }
  destroy() {
    this.#f(), this.#i = null;
  }
  #d() {
    this.#h = /* @__PURE__ */ new Set();
    for (let t in this.#i.states)
      for (let e in this.#i.states[t].on) {
        let i = this.notify.bind(this, e);
        this.#h.add({ topic: e, cb: i }), this.#n.on(e, i, this.context);
      }
  }
  #f() {
    for (let t of this.#h)
      this.#n.off(t.topic, t.cb);
  }
  static validateConfig(t) {
    if (!S(t))
      return !1;
    const e = ["id", "initial", "context", "states"];
    let i = Object.keys(t);
    if (!Bo(e, i) || !(t.initial in t.states))
      return !1;
    for (let s in t.states) {
      if (!S(t.states[s]) || "onEnter" in t.states[s] && !k(t.states[s].onEnter) || "onExit" in t.states[s] && !k(t.states[s].onExit))
        return !1;
      if ("on" in t.states[s])
        for (let r in t.states[s].on) {
          let o = t.states[s].on[r];
          if (!T(o.target) || "action" in o && !k(o.action))
            return !1;
        }
    }
    return !0;
  }
}
const xa = "alert";
class wa {
  #t = new lt();
  #e = {};
  constructor(t) {
    if (M(t))
      for (let e of t)
        this.add(e?.price, e?.condition, e?.handler);
  }
  get list() {
    return this.#t;
  }
  get handlers() {
    return this.#e;
  }
  destroy() {
    this.#t.clear(), this.#e = {};
  }
  batchAdd(t) {
    if (M(t)) {
      let e = [];
      for (let i of t)
        e.push(this.add(i?.price, i?.condition, i?.handler));
      return e;
    } else
      return !1;
  }
  add(t, e, i) {
    if (isNaN(t) || !k(i))
      return !1;
    const s = Q(xa), r = { price: t, condition: e };
    if (this.list.has(r)) {
      let o = this.list.get(r);
      o[s] = i;
    } else {
      const o = {};
      o[s] = i, this.list.set(r, o);
    }
    return this.#e[s] = { alert: r, handler: i }, s;
  }
  remove(t) {
    if (!(t in this.#e))
      return !1;
    const e = this.#e[t], i = e.alert, s = this.#t.get(i);
    return s.delete(t), e.delete(t), Object.keys(s).length == 0 && this.#t.delete(i), !0;
  }
  delete(t, e) {
    if (this.list.has({ price: t, condition: e })) {
      const i = this.list.get({ price: t, condition: e });
      for (let s in i)
        this.#e.delete(s), i.delete(s);
    }
    return this.list.delete({ price: t, condition: e });
  }
  pause(t) {
    if (!(t in this.#e))
      return !1;
    this.#e[t];
  }
  handlerByID(t) {
    return t in this.#e ? this.#e[t].handler : !1;
  }
  check(t, e) {
    if (!(!M(t) || !M(e))) {
      for (let [i, s] of this.list)
        if (i.condition(i.price, t, e))
          for (let r in s)
            try {
              s[r](i.price, t, e);
            } catch (o) {
              console.error(o);
            }
    }
  }
}
const Ea = 0, Ta = 1, Sa = 2, Ca = 3, ba = 4, Ma = 5, je = [null, null, null, null, null], Ze = {
  tfCountDown: !0,
  alerts: []
};
class Kt {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h = je;
  #l = 0;
  #a = 0;
  #c = "";
  #u = !1;
  #d;
  #f;
  #v = je;
  #y;
  static validateConfig(t) {
    if (S(t)) {
      let e = it(Ze);
      t = Se(e, t), t.tfCountDown = G(t.tfCountDown) ? t.tfCountDown : Ze.tfCountDown, t.alerts = M(t.alerts) ? t.alerts : Ze.alerts;
    } else
      return Ze;
    return t;
  }
  constructor(t) {
    this.#t = t, this.#s = t.time, this.status = { status: ca }, this.#e = Kt.validateConfig(t.config?.stream), this.#i = v(t.config?.maxCandleUpdate) ? t.config.maxCandleUpdate : fa, this.#o = v(t.config?.streamPrecision) ? t.config.streamPrecision : ga;
  }
  get config() {
    return this.#e;
  }
  get countDownMS() {
    return this.#a;
  }
  get countDown() {
    return this.#c;
  }
  get range() {
    return this.#t.range;
  }
  get status() {
    return this.#r;
  }
  set status({ status: t, data: e }) {
    this.#r = t, this.emit(t, e);
  }
  set dataReceived(t) {
    this.#u || (this.#u = !0, this.status = { status: Ce, data: t });
  }
  get alerts() {
    return this.#y;
  }
  get lastPriceMin() {
    return this.#f;
  }
  set lastPriceMin(t) {
    v(t) && (this.#f = t);
  }
  get lastPriceMax() {
    return this.#d;
  }
  set lastPriceMax(t) {
    v(t) && (this.#d = t);
  }
  get lastTick() {
    return this.#v;
  }
  set lastTick(t) {
    M(t) && (this.#v, this.#v = t, this.alerts.check(t, this.#h));
  }
  set candle(t) {
    const e = [...this.#h];
    t.t = this.roundTime(new Date(t.t)), t.o = t.o * 1, t.h = t.h * 1, t.l = t.l * 1, t.c = t.c * 1, t.v = t.v * 1, this.#h[Ea] !== t.t ? this.newCandle(t) : this.updateCandle(t), this.status = { status: we, data: this.#h }, this.lastTick = e;
  }
  get candle() {
    return this.#h !== je ? this.#h : null;
  }
  start() {
    this.#y = new wa(this.#e.alerts), this.status = { status: tn }, this.#n = setInterval(this.onUpdate.bind(this), this.#i);
  }
  stop() {
    this.#y.destroy(), this.status = { status: da };
  }
  emit(t, e) {
    this.#t.emit(t, e);
  }
  error() {
    this.status = { status: ua };
  }
  onTick(t) {
    (this.#r == tn || this.#r == we) && S(t) && (this.candle = t);
  }
  onUpdate() {
    this.#h !== je && (this.status = { status: Et, data: this.candle }, this.status = { status: we, data: this.#h });
  }
  newCandle(t) {
    this.prevCandle(), this.#h = [
      t.t,
      t.o,
      t.h,
      t.l,
      t.c,
      t.v,
      null,
      !0
    ], this.#t.state.mergeData({ data: [this.#h] }, !0, !1), this.status = { status: be, data: { data: t, candle: this.#h } }, this.#a = this.#s.timeFrameMS, this.#l = this.roundTime(Date.now());
  }
  prevCandle() {
    const t = this.#t.allData.data;
    t.length > 0 && t[t.length - 1][7] && (t[t.length - 1].length = 6);
  }
  updateCandle(t) {
    let e = this.#h;
    e[Ta] = t.o, e[Sa] = t.h, e[Ca] = t.l, e[ba] = t.c, e[Ma] = t.v, this.#h = e;
    const i = this.#t.allData.data, s = i.length > 0 ? i.length - 1 : 0;
    i[s] = this.#h, this.countDownUpdate();
  }
  countDownUpdate() {
    let t, e, i, s, r, o, l;
    this.#s.timeFrameMS;
    let c = this.#s.timeFrameMS - (Date.now() - this.#l);
    return c < 0 && (c = 0), this.#a = c, c > at ? (t = String(Math.floor(c / at)), e = String(Math.floor(c % at / tt)).padStart(2, "0"), this.#c = `${t}Y ${e}M`) : c > tt ? (e = String(Math.floor(c / tt)).padStart(2, "0"), s = String(Math.floor(c % tt / O)).padStart(2, "0"), this.#c = `${e}M ${s}D`) : c > ie ? (i = String(Math.floor(c / ie)).padStart(2, "0"), s = String(Math.floor(c % tt / O)).padStart(2, "0"), this.#c = `${i}W ${s}D`) : c > O ? (s = String(Math.floor(c / O)).padStart(2, "0"), r = String(Math.floor(c % O / F)).padStart(2, "0"), o = String(Math.floor(c % F / H)).padStart(2, "0"), this.#c = `${s}D ${r}:${o}`) : c > F ? (r = String(Math.floor(c / F)).padStart(2, "0"), o = String(Math.floor(c % F / H)).padStart(2, "0"), l = String(Math.floor(c % H / $)).padStart(2, "0"), this.#c = `${r}:${o}:${l}`) : c > H ? (o = String(Math.floor(c / H)).padStart(2, "0"), l = String(Math.floor(c % H / $)).padStart(2, "0"), this.#c = `00:${o}:${l}`) : (l = String(Math.floor(c / $)).padStart(2, "0"), String(c % $).padStart(4, "0"), this.#c = `00:00:${l}`), this.#c;
  }
  roundTime(t) {
    return t - t % this.#t.time.timeFrameMS;
  }
}
const Xn = {
  findByID(n, t = document) {
    return t.getElementById(n);
  },
  findByClass(n, t = document) {
    return t.getElementsByClassName(n);
  },
  findByName(n, t = document) {
    return t.getElementsByName(n);
  },
  fndByTag(n, t = document) {
    return t.getElementsByTagName(n);
  },
  findBySelector(n, t = document) {
    return t.querySelector(n);
  },
  findBySelectorAll(n, t = document) {
    return t.querySelectorAll(n);
  },
  isNode(n) {
    return typeof Node == "object" ? n instanceof Node : n && typeof n == "object" && typeof n.nodeType == "number" && typeof n.nodeName == "string";
  },
  isElement(n) {
    return typeof HTMLElement == "object" ? n instanceof HTMLElement : n && typeof n == "object" && n !== null && n.nodeType === 1 && typeof n.nodeName == "string";
  },
  isVisible(n) {
    return this.isElement(n) ? !!n && !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length) : !1;
  },
  isInViewport(n) {
    if (!this.isElement(n))
      return !1;
    const t = n.getBoundingClientRect();
    return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
  },
  isVisibleToUser(n) {
    if (!this.isElement(n))
      return !1;
    const t = getComputedStyle(elem);
    if (t.display === "none" || t.visibility !== "visible" || t.opacity < 0.1 || n.offsetWidth + n.offsetHeight + n.getBoundingClientRect().height + n.getBoundingClientRect().width === 0)
      return !1;
    const e = {
      x: n.getBoundingClientRect().left + n.offsetWidth / 2,
      y: n.getBoundingClientRect().top + n.offsetHeight / 2
    };
    if (e.x < 0 || e.x > (document.documentElement.clientWidth || window.innerWidth) || e.y < 0 || e.y > (document.documentElement.clientHeight || window.innerHeight))
      return !1;
    let i = document.elementFromPoint(e.x, e.y);
    do
      if (i === elem)
        return !0;
    while (i = i.parentNode);
    return !1;
  },
  elementDimPos(n) {
    if (!this.isElement(n))
      return !1;
    let t = 0, e = 0, i = n;
    for (; i && i.tagName.toLowerCase() != "body" && !isNaN(i.offsetLeft) && !isNaN(i.offsetTop); )
      t += i.offsetLeft - i.scrollLeft, e += i.offsetTop - i.scrollTop, i = i.offsetParent;
    const s = n.getBoundingClientRect();
    let r = s.right - s.left, o = s.bottom - s.top, l = this.isVisible(n), c = this.isInViewport(n);
    return { top: e, left: t, width: r, height: o, visible: l, viewport: c };
  },
  elementsDistance(n, t) {
    return !this.isElement(n) || !this.isElement(n) ? !1 : (el1Location = this.elementDimPos(n), el2Location = this.elementDimPos(t), {
      x: el1Location.top - el2Location.top,
      y: el1Location.left.el2Location.left,
      el1Location,
      el2Location
    });
  },
  htmlToElement(n) {
    var t = document.createElement("template");
    return n = n.trim(), t.innerHTML = n, t.content.firstChild;
  },
  htmlToElements(n) {
    var t = document.createElement("template");
    return t.innerHTML = n, t.content.childNodes;
  },
  hideOnClickOutside(n) {
    if (!this.isElement(n))
      return !1;
    const t = (i) => {
      !n.contains(i.target) && this.isVisible(n) && (n.style.display = "none", e());
    }, e = () => {
      document.removeEventListener("click", t);
    };
    document.addEventListener("click", t);
  },
  onClickOutside(n, t) {
    if (!this.isElement(n))
      return !1;
    const e = (s) => {
      !n.contains(s.target) && Xn.isVisible(n) && (t(), i());
    }, i = () => {
      document.removeEventListener("click", e);
    };
    document.addEventListener("click", e);
  },
  addStyleRule(n, t, e, i) {
    let s = this.findStyleRule(n, t, e, i);
    if (s)
      s.i >= 0 ? s.rules[s.i].style[s.property] = s.value : this.addCSSRule(s.styleSheet, s.selector, s.rules, s.index);
    else
      return;
  },
  deleteStyleRule(n, t, e) {
    let i = this.findStyleRule(n, t, e, "");
    (i.styleSheet.deleteRule || i.styleSheet.removeRule)(i.i);
  },
  findStyleRule(n, t, e, i) {
    if (!n || !S(n))
      return null;
    if (n.constructor.name == "HTMLStyleElement")
      n = n.sheet;
    else if (n.constructor.name != "CSSStyleSheet")
      return null;
    let s = this.styleRuleSanitize(t, e, i);
    t = s[0], e = s[1], i = s[2];
    const r = n.cssRules || n.rules;
    for (var o = r.length - 1; o > 0 && r[o].selectorText !== t; --o)
      ;
    return { styleSheet: n, rules: r, selector: t, property: e, value: i, i: o };
  },
  styleRuleSanitize(n, t, e) {
    return [
      n = n.toLowerCase().replace(/\s+/g, " "),
      t = t.toLowerCase(),
      e = e.toLowerCase()
    ];
  },
  addCSSRule(n, t, e, i) {
    n.insertRule ? n.insertRule(t + "{" + e + "}", i) : n.addRule(t, e, i);
  },
  findTargetParentWithClass(n, t) {
    return !this.isElement(n) || !T(t) ? null : n.classList.contains(t) ? n : this.findTargetParentWithClass(n.parentElement, t);
  }
}, R = Xn, Pa = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const La = ((n) => "onorientationchange" in n || n.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in n || n.DocumentTouch && document instanceof n.DocumentTouch)(typeof window < "u" ? window : {}), Aa = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class Wt {
  #t = 0;
  #e = 0;
  constructor() {
    if (arguments.length === 1) {
      const { x: t, y: e } = arguments[0];
      this.x = t || 0, this.y = e || 0;
    } else if (arguments.length > 1) {
      const [t, e] = arguments;
      this.x = t || 0, this.y = e || 0;
    }
  }
  set x(t) {
    v(t) && (this.#t = t);
  }
  get x() {
    return this.#t;
  }
  set y(t) {
    v(t) && (this.#e = t);
  }
  get y() {
    return this.#e;
  }
  clone() {
    return new Wt(this.x, this.y);
  }
}
function Oa(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var jn = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(n) {
  (function(t, e, i, s) {
    var r = ["", "webkit", "Moz", "MS", "ms", "o"], o = e.createElement("div"), l = "function", c = Math.round, f = Math.abs, p = Date.now;
    function x(a, h, u) {
      return setTimeout(Vt(a, u), h);
    }
    function C(a, h, u) {
      return Array.isArray(a) ? (b(a, u[h], u), !0) : !1;
    }
    function b(a, h, u) {
      var g;
      if (a)
        if (a.forEach)
          a.forEach(h, u);
        else if (a.length !== s)
          for (g = 0; g < a.length; )
            h.call(u, a[g], g, a), g++;
        else
          for (g in a)
            a.hasOwnProperty(g) && h.call(u, a[g], g, a);
    }
    function A(a, h, u) {
      var g = "DEPRECATED METHOD: " + h + `
` + u + ` AT 
`;
      return function() {
        var m = new Error("get-stack-trace"), E = m && m.stack ? m.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", P = t.console && (t.console.warn || t.console.log);
        return P && P.call(t.console, g, E), a.apply(this, arguments);
      };
    }
    var _;
    typeof Object.assign != "function" ? _ = function(h) {
      if (h === s || h === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var u = Object(h), g = 1; g < arguments.length; g++) {
        var m = arguments[g];
        if (m !== s && m !== null)
          for (var E in m)
            m.hasOwnProperty(E) && (u[E] = m[E]);
      }
      return u;
    } : _ = Object.assign;
    var q = A(function(h, u, g) {
      for (var m = Object.keys(u), E = 0; E < m.length; )
        (!g || g && h[m[E]] === s) && (h[m[E]] = u[m[E]]), E++;
      return h;
    }, "extend", "Use `assign`."), bt = A(function(h, u) {
      return q(h, u, !0);
    }, "merge", "Use `assign`.");
    function z(a, h, u) {
      var g = h.prototype, m;
      m = a.prototype = Object.create(g), m.constructor = a, m._super = g, u && _(m, u);
    }
    function Vt(a, h) {
      return function() {
        return a.apply(h, arguments);
      };
    }
    function ae(a, h) {
      return typeof a == l ? a.apply(h && h[0] || s, h) : a;
    }
    function _e(a, h) {
      return a === s ? h : a;
    }
    function Gt(a, h, u) {
      b(ke(h), function(g) {
        a.addEventListener(g, u, !1);
      });
    }
    function De(a, h, u) {
      b(ke(h), function(g) {
        a.removeEventListener(g, u, !1);
      });
    }
    function ys(a, h) {
      for (; a; ) {
        if (a == h)
          return !0;
        a = a.parentNode;
      }
      return !1;
    }
    function $t(a, h) {
      return a.indexOf(h) > -1;
    }
    function ke(a) {
      return a.trim().split(/\s+/g);
    }
    function Yt(a, h, u) {
      if (a.indexOf && !u)
        return a.indexOf(h);
      for (var g = 0; g < a.length; ) {
        if (u && a[g][u] == h || !u && a[g] === h)
          return g;
        g++;
      }
      return -1;
    }
    function Ne(a) {
      return Array.prototype.slice.call(a, 0);
    }
    function xs(a, h, u) {
      for (var g = [], m = [], E = 0; E < a.length; ) {
        var P = h ? a[E][h] : a[E];
        Yt(m, P) < 0 && g.push(a[E]), m[E] = P, E++;
      }
      return u && (h ? g = g.sort(function(W, j) {
        return W[h] > j[h];
      }) : g = g.sort()), g;
    }
    function $e(a, h) {
      for (var u, g, m = h[0].toUpperCase() + h.slice(1), E = 0; E < r.length; ) {
        if (u = r[E], g = u ? u + m : h, g in a)
          return g;
        E++;
      }
      return s;
    }
    var Or = 1;
    function Ir() {
      return Or++;
    }
    function ws(a) {
      var h = a.ownerDocument || a;
      return h.defaultView || h.parentWindow || t;
    }
    var Rr = /mobile|tablet|ip(ad|hone|od)|android/i, Es = "ontouchstart" in t, _r = $e(t, "PointerEvent") !== s, Dr = Es && Rr.test(navigator.userAgent), he = "touch", kr = "pen", Ti = "mouse", Nr = "kinect", $r = 25, X = 1, Ht = 2, N = 4, Z = 8, He = 1, le = 2, ce = 4, de = 8, ue = 16, gt = le | ce, Ut = de | ue, Ts = gt | Ut, Ss = ["x", "y"], Ue = ["clientX", "clientY"];
    function nt(a, h) {
      var u = this;
      this.manager = a, this.callback = h, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(g) {
        ae(a.options.enable, [a]) && u.handler(g);
      }, this.init();
    }
    nt.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && Gt(this.element, this.evEl, this.domHandler), this.evTarget && Gt(this.target, this.evTarget, this.domHandler), this.evWin && Gt(ws(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && De(this.element, this.evEl, this.domHandler), this.evTarget && De(this.target, this.evTarget, this.domHandler), this.evWin && De(ws(this.element), this.evWin, this.domHandler);
      }
    };
    function Hr(a) {
      var h, u = a.options.inputClass;
      return u ? h = u : _r ? h = Ci : Dr ? h = We : Es ? h = bi : h = ze, new h(a, Ur);
    }
    function Ur(a, h, u) {
      var g = u.pointers.length, m = u.changedPointers.length, E = h & X && g - m === 0, P = h & (N | Z) && g - m === 0;
      u.isFirst = !!E, u.isFinal = !!P, E && (a.session = {}), u.eventType = h, Br(a, u), a.emit("hammer.input", u), a.recognize(u), a.session.prevInput = u;
    }
    function Br(a, h) {
      var u = a.session, g = h.pointers, m = g.length;
      u.firstInput || (u.firstInput = Cs(h)), m > 1 && !u.firstMultiple ? u.firstMultiple = Cs(h) : m === 1 && (u.firstMultiple = !1);
      var E = u.firstInput, P = u.firstMultiple, U = P ? P.center : E.center, W = h.center = bs(g);
      h.timeStamp = p(), h.deltaTime = h.timeStamp - E.timeStamp, h.angle = Si(U, W), h.distance = Be(U, W), zr(u, h), h.offsetDirection = Ps(h.deltaX, h.deltaY);
      var j = Ms(h.deltaTime, h.deltaX, h.deltaY);
      h.overallVelocityX = j.x, h.overallVelocityY = j.y, h.overallVelocity = f(j.x) > f(j.y) ? j.x : j.y, h.scale = P ? Vr(P.pointers, g) : 1, h.rotation = P ? Fr(P.pointers, g) : 0, h.maxPointers = u.prevInput ? h.pointers.length > u.prevInput.maxPointers ? h.pointers.length : u.prevInput.maxPointers : h.pointers.length, Wr(u, h);
      var pt = a.element;
      ys(h.srcEvent.target, pt) && (pt = h.srcEvent.target), h.target = pt;
    }
    function zr(a, h) {
      var u = h.center, g = a.offsetDelta || {}, m = a.prevDelta || {}, E = a.prevInput || {};
      (h.eventType === X || E.eventType === N) && (m = a.prevDelta = {
        x: E.deltaX || 0,
        y: E.deltaY || 0
      }, g = a.offsetDelta = {
        x: u.x,
        y: u.y
      }), h.deltaX = m.x + (u.x - g.x), h.deltaY = m.y + (u.y - g.y);
    }
    function Wr(a, h) {
      var u = a.lastInterval || h, g = h.timeStamp - u.timeStamp, m, E, P, U;
      if (h.eventType != Z && (g > $r || u.velocity === s)) {
        var W = h.deltaX - u.deltaX, j = h.deltaY - u.deltaY, pt = Ms(g, W, j);
        E = pt.x, P = pt.y, m = f(pt.x) > f(pt.y) ? pt.x : pt.y, U = Ps(W, j), a.lastInterval = h;
      } else
        m = u.velocity, E = u.velocityX, P = u.velocityY, U = u.direction;
      h.velocity = m, h.velocityX = E, h.velocityY = P, h.direction = U;
    }
    function Cs(a) {
      for (var h = [], u = 0; u < a.pointers.length; )
        h[u] = {
          clientX: c(a.pointers[u].clientX),
          clientY: c(a.pointers[u].clientY)
        }, u++;
      return {
        timeStamp: p(),
        pointers: h,
        center: bs(h),
        deltaX: a.deltaX,
        deltaY: a.deltaY
      };
    }
    function bs(a) {
      var h = a.length;
      if (h === 1)
        return {
          x: c(a[0].clientX),
          y: c(a[0].clientY)
        };
      for (var u = 0, g = 0, m = 0; m < h; )
        u += a[m].clientX, g += a[m].clientY, m++;
      return {
        x: c(u / h),
        y: c(g / h)
      };
    }
    function Ms(a, h, u) {
      return {
        x: h / a || 0,
        y: u / a || 0
      };
    }
    function Ps(a, h) {
      return a === h ? He : f(a) >= f(h) ? a < 0 ? le : ce : h < 0 ? de : ue;
    }
    function Be(a, h, u) {
      u || (u = Ss);
      var g = h[u[0]] - a[u[0]], m = h[u[1]] - a[u[1]];
      return Math.sqrt(g * g + m * m);
    }
    function Si(a, h, u) {
      u || (u = Ss);
      var g = h[u[0]] - a[u[0]], m = h[u[1]] - a[u[1]];
      return Math.atan2(m, g) * 180 / Math.PI;
    }
    function Fr(a, h) {
      return Si(h[1], h[0], Ue) + Si(a[1], a[0], Ue);
    }
    function Vr(a, h) {
      return Be(h[0], h[1], Ue) / Be(a[0], a[1], Ue);
    }
    var Gr = {
      mousedown: X,
      mousemove: Ht,
      mouseup: N
    }, Yr = "mousedown", qr = "mousemove mouseup";
    function ze() {
      this.evEl = Yr, this.evWin = qr, this.pressed = !1, nt.apply(this, arguments);
    }
    z(ze, nt, {
      handler: function(h) {
        var u = Gr[h.type];
        u & X && h.button === 0 && (this.pressed = !0), u & Ht && h.which !== 1 && (u = N), this.pressed && (u & N && (this.pressed = !1), this.callback(this.manager, u, {
          pointers: [h],
          changedPointers: [h],
          pointerType: Ti,
          srcEvent: h
        }));
      }
    });
    var Xr = {
      pointerdown: X,
      pointermove: Ht,
      pointerup: N,
      pointercancel: Z,
      pointerout: Z
    }, jr = {
      2: he,
      3: kr,
      4: Ti,
      5: Nr
    }, Ls = "pointerdown", As = "pointermove pointerup pointercancel";
    t.MSPointerEvent && !t.PointerEvent && (Ls = "MSPointerDown", As = "MSPointerMove MSPointerUp MSPointerCancel");
    function Ci() {
      this.evEl = Ls, this.evWin = As, nt.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    z(Ci, nt, {
      handler: function(h) {
        var u = this.store, g = !1, m = h.type.toLowerCase().replace("ms", ""), E = Xr[m], P = jr[h.pointerType] || h.pointerType, U = P == he, W = Yt(u, h.pointerId, "pointerId");
        E & X && (h.button === 0 || U) ? W < 0 && (u.push(h), W = u.length - 1) : E & (N | Z) && (g = !0), !(W < 0) && (u[W] = h, this.callback(this.manager, E, {
          pointers: u,
          changedPointers: [h],
          pointerType: P,
          srcEvent: h
        }), g && u.splice(W, 1));
      }
    });
    var Zr = {
      touchstart: X,
      touchmove: Ht,
      touchend: N,
      touchcancel: Z
    }, Kr = "touchstart", Qr = "touchstart touchmove touchend touchcancel";
    function Os() {
      this.evTarget = Kr, this.evWin = Qr, this.started = !1, nt.apply(this, arguments);
    }
    z(Os, nt, {
      handler: function(h) {
        var u = Zr[h.type];
        if (u === X && (this.started = !0), !!this.started) {
          var g = Jr.call(this, h, u);
          u & (N | Z) && g[0].length - g[1].length === 0 && (this.started = !1), this.callback(this.manager, u, {
            pointers: g[0],
            changedPointers: g[1],
            pointerType: he,
            srcEvent: h
          });
        }
      }
    });
    function Jr(a, h) {
      var u = Ne(a.touches), g = Ne(a.changedTouches);
      return h & (N | Z) && (u = xs(u.concat(g), "identifier", !0)), [u, g];
    }
    var to = {
      touchstart: X,
      touchmove: Ht,
      touchend: N,
      touchcancel: Z
    }, eo = "touchstart touchmove touchend touchcancel";
    function We() {
      this.evTarget = eo, this.targetIds = {}, nt.apply(this, arguments);
    }
    z(We, nt, {
      handler: function(h) {
        var u = to[h.type], g = io.call(this, h, u);
        g && this.callback(this.manager, u, {
          pointers: g[0],
          changedPointers: g[1],
          pointerType: he,
          srcEvent: h
        });
      }
    });
    function io(a, h) {
      var u = Ne(a.touches), g = this.targetIds;
      if (h & (X | Ht) && u.length === 1)
        return g[u[0].identifier] = !0, [u, u];
      var m, E, P = Ne(a.changedTouches), U = [], W = this.target;
      if (E = u.filter(function(j) {
        return ys(j.target, W);
      }), h === X)
        for (m = 0; m < E.length; )
          g[E[m].identifier] = !0, m++;
      for (m = 0; m < P.length; )
        g[P[m].identifier] && U.push(P[m]), h & (N | Z) && delete g[P[m].identifier], m++;
      if (U.length)
        return [
          xs(E.concat(U), "identifier", !0),
          U
        ];
    }
    var so = 2500, Is = 25;
    function bi() {
      nt.apply(this, arguments);
      var a = Vt(this.handler, this);
      this.touch = new We(this.manager, a), this.mouse = new ze(this.manager, a), this.primaryTouch = null, this.lastTouches = [];
    }
    z(bi, nt, {
      handler: function(h, u, g) {
        var m = g.pointerType == he, E = g.pointerType == Ti;
        if (!(E && g.sourceCapabilities && g.sourceCapabilities.firesTouchEvents)) {
          if (m)
            no.call(this, u, g);
          else if (E && ro.call(this, g))
            return;
          this.callback(h, u, g);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function no(a, h) {
      a & X ? (this.primaryTouch = h.changedPointers[0].identifier, Rs.call(this, h)) : a & (N | Z) && Rs.call(this, h);
    }
    function Rs(a) {
      var h = a.changedPointers[0];
      if (h.identifier === this.primaryTouch) {
        var u = { x: h.clientX, y: h.clientY };
        this.lastTouches.push(u);
        var g = this.lastTouches, m = function() {
          var E = g.indexOf(u);
          E > -1 && g.splice(E, 1);
        };
        setTimeout(m, so);
      }
    }
    function ro(a) {
      for (var h = a.srcEvent.clientX, u = a.srcEvent.clientY, g = 0; g < this.lastTouches.length; g++) {
        var m = this.lastTouches[g], E = Math.abs(h - m.x), P = Math.abs(u - m.y);
        if (E <= Is && P <= Is)
          return !0;
      }
      return !1;
    }
    var _s = $e(o.style, "touchAction"), Ds = _s !== s, ks = "compute", Ns = "auto", Mi = "manipulation", Bt = "none", fe = "pan-x", ge = "pan-y", Fe = ao();
    function Pi(a, h) {
      this.manager = a, this.set(h);
    }
    Pi.prototype = {
      set: function(a) {
        a == ks && (a = this.compute()), Ds && this.manager.element.style && Fe[a] && (this.manager.element.style[_s] = a), this.actions = a.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var a = [];
        return b(this.manager.recognizers, function(h) {
          ae(h.options.enable, [h]) && (a = a.concat(h.getTouchAction()));
        }), oo(a.join(" "));
      },
      preventDefaults: function(a) {
        var h = a.srcEvent, u = a.offsetDirection;
        if (this.manager.session.prevented) {
          h.preventDefault();
          return;
        }
        var g = this.actions, m = $t(g, Bt) && !Fe[Bt], E = $t(g, ge) && !Fe[ge], P = $t(g, fe) && !Fe[fe];
        if (m) {
          var U = a.pointers.length === 1, W = a.distance < 2, j = a.deltaTime < 250;
          if (U && W && j)
            return;
        }
        if (!(P && E) && (m || E && u & gt || P && u & Ut))
          return this.preventSrc(h);
      },
      preventSrc: function(a) {
        this.manager.session.prevented = !0, a.preventDefault();
      }
    };
    function oo(a) {
      if ($t(a, Bt))
        return Bt;
      var h = $t(a, fe), u = $t(a, ge);
      return h && u ? Bt : h || u ? h ? fe : ge : $t(a, Mi) ? Mi : Ns;
    }
    function ao() {
      if (!Ds)
        return !1;
      var a = {}, h = t.CSS && t.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(u) {
        a[u] = h ? t.CSS.supports("touch-action", u) : !0;
      }), a;
    }
    var Ve = 1, rt = 2, qt = 4, Mt = 8, Tt = Mt, me = 16, mt = 32;
    function St(a) {
      this.options = _({}, this.defaults, a || {}), this.id = Ir(), this.manager = null, this.options.enable = _e(this.options.enable, !0), this.state = Ve, this.simultaneous = {}, this.requireFail = [];
    }
    St.prototype = {
      defaults: {},
      set: function(a) {
        return _(this.options, a), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(a) {
        if (C(a, "recognizeWith", this))
          return this;
        var h = this.simultaneous;
        return a = Ge(a, this), h[a.id] || (h[a.id] = a, a.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(a) {
        return C(a, "dropRecognizeWith", this) ? this : (a = Ge(a, this), delete this.simultaneous[a.id], this);
      },
      requireFailure: function(a) {
        if (C(a, "requireFailure", this))
          return this;
        var h = this.requireFail;
        return a = Ge(a, this), Yt(h, a) === -1 && (h.push(a), a.requireFailure(this)), this;
      },
      dropRequireFailure: function(a) {
        if (C(a, "dropRequireFailure", this))
          return this;
        a = Ge(a, this);
        var h = Yt(this.requireFail, a);
        return h > -1 && this.requireFail.splice(h, 1), this;
      },
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function(a) {
        return !!this.simultaneous[a.id];
      },
      emit: function(a) {
        var h = this, u = this.state;
        function g(m) {
          h.manager.emit(m, a);
        }
        u < Mt && g(h.options.event + $s(u)), g(h.options.event), a.additionalEvent && g(a.additionalEvent), u >= Mt && g(h.options.event + $s(u));
      },
      tryEmit: function(a) {
        if (this.canEmit())
          return this.emit(a);
        this.state = mt;
      },
      canEmit: function() {
        for (var a = 0; a < this.requireFail.length; ) {
          if (!(this.requireFail[a].state & (mt | Ve)))
            return !1;
          a++;
        }
        return !0;
      },
      recognize: function(a) {
        var h = _({}, a);
        if (!ae(this.options.enable, [this, h])) {
          this.reset(), this.state = mt;
          return;
        }
        this.state & (Tt | me | mt) && (this.state = Ve), this.state = this.process(h), this.state & (rt | qt | Mt | me) && this.tryEmit(h);
      },
      process: function(a) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function $s(a) {
      return a & me ? "cancel" : a & Mt ? "end" : a & qt ? "move" : a & rt ? "start" : "";
    }
    function Hs(a) {
      return a == ue ? "down" : a == de ? "up" : a == le ? "left" : a == ce ? "right" : "";
    }
    function Ge(a, h) {
      var u = h.manager;
      return u ? u.get(a) : a;
    }
    function ct() {
      St.apply(this, arguments);
    }
    z(ct, St, {
      defaults: {
        pointers: 1
      },
      attrTest: function(a) {
        var h = this.options.pointers;
        return h === 0 || a.pointers.length === h;
      },
      process: function(a) {
        var h = this.state, u = a.eventType, g = h & (rt | qt), m = this.attrTest(a);
        return g && (u & Z || !m) ? h | me : g || m ? u & N ? h | Mt : h & rt ? h | qt : rt : mt;
      }
    });
    function Ye() {
      ct.apply(this, arguments), this.pX = null, this.pY = null;
    }
    z(Ye, ct, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: Ts
      },
      getTouchAction: function() {
        var a = this.options.direction, h = [];
        return a & gt && h.push(ge), a & Ut && h.push(fe), h;
      },
      directionTest: function(a) {
        var h = this.options, u = !0, g = a.distance, m = a.direction, E = a.deltaX, P = a.deltaY;
        return m & h.direction || (h.direction & gt ? (m = E === 0 ? He : E < 0 ? le : ce, u = E != this.pX, g = Math.abs(a.deltaX)) : (m = P === 0 ? He : P < 0 ? de : ue, u = P != this.pY, g = Math.abs(a.deltaY))), a.direction = m, u && g > h.threshold && m & h.direction;
      },
      attrTest: function(a) {
        return ct.prototype.attrTest.call(this, a) && (this.state & rt || !(this.state & rt) && this.directionTest(a));
      },
      emit: function(a) {
        this.pX = a.deltaX, this.pY = a.deltaY;
        var h = Hs(a.direction);
        h && (a.additionalEvent = this.options.event + h), this._super.emit.call(this, a);
      }
    });
    function Li() {
      ct.apply(this, arguments);
    }
    z(Li, ct, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Bt];
      },
      attrTest: function(a) {
        return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & rt);
      },
      emit: function(a) {
        if (a.scale !== 1) {
          var h = a.scale < 1 ? "in" : "out";
          a.additionalEvent = this.options.event + h;
        }
        this._super.emit.call(this, a);
      }
    });
    function Ai() {
      St.apply(this, arguments), this._timer = null, this._input = null;
    }
    z(Ai, St, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [Ns];
      },
      process: function(a) {
        var h = this.options, u = a.pointers.length === h.pointers, g = a.distance < h.threshold, m = a.deltaTime > h.time;
        if (this._input = a, !g || !u || a.eventType & (N | Z) && !m)
          this.reset();
        else if (a.eventType & X)
          this.reset(), this._timer = x(function() {
            this.state = Tt, this.tryEmit();
          }, h.time, this);
        else if (a.eventType & N)
          return Tt;
        return mt;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(a) {
        this.state === Tt && (a && a.eventType & N ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = p(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Oi() {
      ct.apply(this, arguments);
    }
    z(Oi, ct, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Bt];
      },
      attrTest: function(a) {
        return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & rt);
      }
    });
    function Ii() {
      ct.apply(this, arguments);
    }
    z(Ii, ct, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: gt | Ut,
        pointers: 1
      },
      getTouchAction: function() {
        return Ye.prototype.getTouchAction.call(this);
      },
      attrTest: function(a) {
        var h = this.options.direction, u;
        return h & (gt | Ut) ? u = a.overallVelocity : h & gt ? u = a.overallVelocityX : h & Ut && (u = a.overallVelocityY), this._super.attrTest.call(this, a) && h & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && f(u) > this.options.velocity && a.eventType & N;
      },
      emit: function(a) {
        var h = Hs(a.offsetDirection);
        h && this.manager.emit(this.options.event + h, a), this.manager.emit(this.options.event, a);
      }
    });
    function qe() {
      St.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    z(qe, St, {
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 9,
        posThreshold: 10
      },
      getTouchAction: function() {
        return [Mi];
      },
      process: function(a) {
        var h = this.options, u = a.pointers.length === h.pointers, g = a.distance < h.threshold, m = a.deltaTime < h.time;
        if (this.reset(), a.eventType & X && this.count === 0)
          return this.failTimeout();
        if (g && m && u) {
          if (a.eventType != N)
            return this.failTimeout();
          var E = this.pTime ? a.timeStamp - this.pTime < h.interval : !0, P = !this.pCenter || Be(this.pCenter, a.center) < h.posThreshold;
          this.pTime = a.timeStamp, this.pCenter = a.center, !P || !E ? this.count = 1 : this.count += 1, this._input = a;
          var U = this.count % h.taps;
          if (U === 0)
            return this.hasRequireFailures() ? (this._timer = x(function() {
              this.state = Tt, this.tryEmit();
            }, h.interval, this), rt) : Tt;
        }
        return mt;
      },
      failTimeout: function() {
        return this._timer = x(function() {
          this.state = mt;
        }, this.options.interval, this), mt;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == Tt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function Ct(a, h) {
      return h = h || {}, h.recognizers = _e(h.recognizers, Ct.defaults.preset), new Ri(a, h);
    }
    Ct.VERSION = "2.0.7", Ct.defaults = {
      domEvents: !1,
      touchAction: ks,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Oi, { enable: !1 }],
        [Li, { enable: !1 }, ["rotate"]],
        [Ii, { direction: gt }],
        [Ye, { direction: gt }, ["swipe"]],
        [qe],
        [qe, { event: "doubletap", taps: 2 }, ["tap"]],
        [Ai]
      ],
      cssProps: {
        userSelect: "none",
        touchSelect: "none",
        touchCallout: "none",
        contentZooming: "none",
        userDrag: "none",
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    };
    var ho = 1, Us = 2;
    function Ri(a, h) {
      this.options = _({}, Ct.defaults, h || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = Hr(this), this.touchAction = new Pi(this, this.options.touchAction), Bs(this, !0), b(this.options.recognizers, function(u) {
        var g = this.add(new u[0](u[1]));
        u[2] && g.recognizeWith(u[2]), u[3] && g.requireFailure(u[3]);
      }, this);
    }
    Ri.prototype = {
      set: function(a) {
        return _(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
      },
      stop: function(a) {
        this.session.stopped = a ? Us : ho;
      },
      recognize: function(a) {
        var h = this.session;
        if (!h.stopped) {
          this.touchAction.preventDefaults(a);
          var u, g = this.recognizers, m = h.curRecognizer;
          (!m || m && m.state & Tt) && (m = h.curRecognizer = null);
          for (var E = 0; E < g.length; )
            u = g[E], h.stopped !== Us && (!m || u == m || u.canRecognizeWith(m)) ? u.recognize(a) : u.reset(), !m && u.state & (rt | qt | Mt) && (m = h.curRecognizer = u), E++;
        }
      },
      get: function(a) {
        if (a instanceof St)
          return a;
        for (var h = this.recognizers, u = 0; u < h.length; u++)
          if (h[u].options.event == a)
            return h[u];
        return null;
      },
      add: function(a) {
        if (C(a, "add", this))
          return this;
        var h = this.get(a.options.event);
        return h && this.remove(h), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
      },
      remove: function(a) {
        if (C(a, "remove", this))
          return this;
        if (a = this.get(a), a) {
          var h = this.recognizers, u = Yt(h, a);
          u !== -1 && (h.splice(u, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(a, h) {
        if (a !== s && h !== s) {
          var u = this.handlers;
          return b(ke(a), function(g) {
            u[g] = u[g] || [], u[g].push(h);
          }), this;
        }
      },
      off: function(a, h) {
        if (a !== s) {
          var u = this.handlers;
          return b(ke(a), function(g) {
            h ? u[g] && u[g].splice(Yt(u[g], h), 1) : delete u[g];
          }), this;
        }
      },
      emit: function(a, h) {
        this.options.domEvents && lo(a, h);
        var u = this.handlers[a] && this.handlers[a].slice();
        if (!(!u || !u.length)) {
          h.type = a, h.preventDefault = function() {
            h.srcEvent.preventDefault();
          };
          for (var g = 0; g < u.length; )
            u[g](h), g++;
        }
      },
      destroy: function() {
        this.element && Bs(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function Bs(a, h) {
      var u = a.element;
      if (u.style) {
        var g;
        b(a.options.cssProps, function(m, E) {
          g = $e(u.style, E), h ? (a.oldCssProps[g] = u.style[g], u.style[g] = m) : u.style[g] = a.oldCssProps[g] || "";
        }), h || (a.oldCssProps = {});
      }
    }
    function lo(a, h) {
      var u = e.createEvent("Event");
      u.initEvent(a, !0, !0), u.gesture = h, h.target.dispatchEvent(u);
    }
    _(Ct, {
      INPUT_START: X,
      INPUT_MOVE: Ht,
      INPUT_END: N,
      INPUT_CANCEL: Z,
      STATE_POSSIBLE: Ve,
      STATE_BEGAN: rt,
      STATE_CHANGED: qt,
      STATE_ENDED: Mt,
      STATE_RECOGNIZED: Tt,
      STATE_CANCELLED: me,
      STATE_FAILED: mt,
      DIRECTION_NONE: He,
      DIRECTION_LEFT: le,
      DIRECTION_RIGHT: ce,
      DIRECTION_UP: de,
      DIRECTION_DOWN: ue,
      DIRECTION_HORIZONTAL: gt,
      DIRECTION_VERTICAL: Ut,
      DIRECTION_ALL: Ts,
      Manager: Ri,
      Input: nt,
      TouchAction: Pi,
      TouchInput: We,
      MouseInput: ze,
      PointerEventInput: Ci,
      TouchMouseInput: bi,
      SingleTouchInput: Os,
      Recognizer: St,
      AttrRecognizer: ct,
      Tap: qe,
      Pan: Ye,
      Swipe: Ii,
      Pinch: Li,
      Rotate: Oi,
      Press: Ai,
      on: Gt,
      off: De,
      each: b,
      merge: bt,
      extend: q,
      assign: _,
      inherit: z,
      bindFn: Vt,
      prefixed: $e
    });
    var co = typeof t < "u" ? t : typeof self < "u" ? self : {};
    co.Hammer = Ct, typeof s == "function" && s.amd ? s(function() {
      return Ct;
    }) : n.exports ? n.exports = Ct : t[i] = Ct;
  })(window, document, "Hammer");
})(jn);
var Ie = jn.exports;
const Ia = Oa(Ie), vt = /* @__PURE__ */ uo({
  __proto__: null,
  default: Ia
}, [Ie]), Zn = 1, Kn = 2, Xi = 4, Ra = {
  mousedown: Zn,
  mousemove: Kn,
  mouseup: Xi
};
function _a(n, t) {
  for (let e = 0; e < n.length; e++)
    if (t(n[e]))
      return !0;
  return !1;
}
function Da(n) {
  const t = n.prototype.handler;
  n.prototype.handler = function(i) {
    const s = this.store;
    i.button > 0 && i.type === "pointerdown" && (_a(s, (r) => r.pointerId === i.pointerId) || s.push(i)), t.call(this, i);
  };
}
function ka(n) {
  n.prototype.handler = function(e) {
    let i = Ra[e.type];
    i & Zn && e.button >= 0 && (this.pressed = !0), i & Kn && e.which === 0 && (i = Xi), this.pressed && (i & Xi && (this.pressed = !1), this.callback(this.manager, i, {
      pointers: [e],
      changedPointers: [e],
      pointerType: "mouse",
      srcEvent: e
    }));
  };
}
Da(Ie.PointerEventInput);
ka(Ie.MouseInput);
const Na = Ie.Manager;
let xi = class {
  constructor(t, e, i) {
    this.element = t, this.callback = e, this.options = { enable: !0, ...i };
  }
};
const $a = vt ? [
  [vt.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [vt.Rotate, { enable: !1 }],
  [vt.Pinch, { enable: !1 }],
  [vt.Swipe, { enable: !1 }],
  [vt.Pan, { threshold: 0, enable: !1 }],
  [vt.Press, { enable: !1 }],
  [vt.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [vt.Tap, { event: "anytap", enable: !1 }],
  [vt.Tap, { enable: !1 }]
] : null, en = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
}, Ha = {
  doubletap: ["tap"]
}, Ua = {
  pointerdown: "pointerdown",
  pointermove: "pointermove",
  pointerup: "pointerup",
  touchstart: "pointerdown",
  touchmove: "pointermove",
  touchend: "pointerup",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup"
}, cs = {
  KEY_EVENTS: ["keydown", "keyup"],
  MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
  WHEEL_EVENTS: [
    "wheel",
    "mousewheel"
  ]
}, Ba = {
  tap: "tap",
  anytap: "anytap",
  doubletap: "doubletap",
  press: "press",
  pinch: "pinch",
  pinchin: "pinch",
  pinchout: "pinch",
  pinchstart: "pinch",
  pinchmove: "pinch",
  pinchend: "pinch",
  pinchcancel: "pinch",
  rotate: "rotate",
  rotatestart: "rotate",
  rotatemove: "rotate",
  rotateend: "rotate",
  rotatecancel: "rotate",
  tripan: "tripan",
  tripanstart: "tripan",
  tripanmove: "tripan",
  tripanup: "tripan",
  tripandown: "tripan",
  tripanleft: "tripan",
  tripanright: "tripan",
  tripanend: "tripan",
  tripancancel: "tripan",
  pan: "pan",
  panstart: "pan",
  panmove: "pan",
  panup: "pan",
  pandown: "pan",
  panleft: "pan",
  panright: "pan",
  panend: "pan",
  pancancel: "pan",
  swipe: "swipe",
  swipeleft: "swipe",
  swiperight: "swipe",
  swipeup: "swipe",
  swipedown: "swipe"
}, sn = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
}, za = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", Zt = typeof window < "u" ? window : global;
let ji = !1;
try {
  const n = {
    get passive() {
      return ji = !0, !0;
    }
  };
  Zt.addEventListener("test", null, n), Zt.removeEventListener("test", null);
} catch {
  ji = !1;
}
const Wa = za.indexOf("firefox") !== -1, { WHEEL_EVENTS: Fa } = cs, nn = "wheel", rn = 4.000244140625, Va = 40, Ga = 0.25;
class Ya extends xi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (s) => {
      if (!this.options.enable)
        return;
      let r = s.deltaY;
      Zt.WheelEvent && (Wa && s.deltaMode === Zt.WheelEvent.DOM_DELTA_PIXEL && (r /= Zt.devicePixelRatio), s.deltaMode === Zt.WheelEvent.DOM_DELTA_LINE && (r *= Va)), r !== 0 && r % rn === 0 && (r = Math.floor(r / rn)), s.shiftKey && r && (r = r * Ga), this.callback({
        type: nn,
        center: {
          x: s.clientX,
          y: s.clientY
        },
        delta: -r,
        srcEvent: s,
        pointerType: "mouse",
        target: s.target
      });
    }, this.events = (this.options.events || []).concat(Fa), this.events.forEach((s) => t.addEventListener(s, this.handleEvent, ji ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((t) => this.element.removeEventListener(t, this.handleEvent));
  }
  enableEventType(t, e) {
    t === nn && (this.options.enable = e);
  }
}
const { MOUSE_EVENTS: qa } = cs, on = "pointermove", an = "pointerover", hn = "pointerout", ln = "pointerenter", cn = "pointerleave";
class Xa extends xi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (r) => {
      this.handleOverEvent(r), this.handleOutEvent(r), this.handleEnterEvent(r), this.handleLeaveEvent(r), this.handleMoveEvent(r);
    }, this.pressed = !1;
    const { enable: s } = this.options;
    this.enableMoveEvent = s, this.enableLeaveEvent = s, this.enableEnterEvent = s, this.enableOutEvent = s, this.enableOverEvent = s, this.events = (this.options.events || []).concat(qa), this.events.forEach((r) => t.addEventListener(r, this.handleEvent));
  }
  destroy() {
    this.events.forEach((t) => this.element.removeEventListener(t, this.handleEvent));
  }
  enableEventType(t, e) {
    t === on && (this.enableMoveEvent = e), t === an && (this.enableOverEvent = e), t === hn && (this.enableOutEvent = e), t === ln && (this.enableEnterEvent = e), t === cn && (this.enableLeaveEvent = e);
  }
  handleOverEvent(t) {
    this.enableOverEvent && t.type === "mouseover" && this._emit(an, t);
  }
  handleOutEvent(t) {
    this.enableOutEvent && t.type === "mouseout" && this._emit(hn, t);
  }
  handleEnterEvent(t) {
    this.enableEnterEvent && t.type === "mouseenter" && this._emit(ln, t);
  }
  handleLeaveEvent(t) {
    this.enableLeaveEvent && t.type === "mouseleave" && this._emit(cn, t);
  }
  handleMoveEvent(t) {
    if (this.enableMoveEvent)
      switch (t.type) {
        case "mousedown":
          t.button >= 0 && (this.pressed = !0);
          break;
        case "mousemove":
          t.which === 0 && (this.pressed = !1), this.pressed || this._emit(on, t);
          break;
        case "mouseup":
          this.pressed = !1;
          break;
      }
  }
  _emit(t, e) {
    this.callback({
      type: t,
      center: {
        x: e.clientX,
        y: e.clientY
      },
      srcEvent: e,
      pointerType: "mouse",
      target: e.target
    });
  }
}
const { KEY_EVENTS: ja } = cs, dn = "keydown", un = "keyup";
class Za extends xi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (s) => {
      const r = s.target || s.srcElement;
      r.tagName === "INPUT" && r.type === "text" || r.tagName === "TEXTAREA" || (this.enableDownEvent && s.type === "keydown" && this.callback({
        type: dn,
        srcEvent: s,
        key: s.key,
        target: s.target
      }), this.enableUpEvent && s.type === "keyup" && this.callback({
        type: un,
        srcEvent: s,
        key: s.key,
        target: s.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(ja), t.tabIndex = this.options.tabIndex || 0, t.style.outline = "none", this.events.forEach((s) => t.addEventListener(s, this.handleEvent));
  }
  destroy() {
    this.events.forEach((t) => this.element.removeEventListener(t, this.handleEvent));
  }
  enableEventType(t, e) {
    t === dn && (this.enableDownEvent = e), t === un && (this.enableUpEvent = e);
  }
}
const fn = "contextmenu";
class Ka extends xi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (s) => {
      this.options.enable && this.callback({
        type: fn,
        center: {
          x: s.clientX,
          y: s.clientY
        },
        srcEvent: s,
        pointerType: "mouse",
        target: s.target
      });
    }, t.addEventListener("contextmenu", this.handleEvent);
  }
  destroy() {
    this.element.removeEventListener("contextmenu", this.handleEvent);
  }
  enableEventType(t, e) {
    t === fn && (this.options.enable = e);
  }
}
const Zi = 1, hi = 2, Ki = 4, Qa = {
  pointerdown: Zi,
  pointermove: hi,
  pointerup: Ki,
  mousedown: Zi,
  mousemove: hi,
  mouseup: Ki
}, Ja = 1, th = 2, eh = 3, ih = 0, sh = 1, nh = 2, rh = 1, oh = 2, ah = 4;
function hh(n) {
  const t = Qa[n.srcEvent.type];
  if (!t)
    return null;
  const { buttons: e, button: i, which: s } = n.srcEvent;
  let r = !1, o = !1, l = !1;
  return t === Ki || t === hi && !Number.isFinite(e) ? (r = s === Ja, o = s === th, l = s === eh) : t === hi ? (r = !!(e & rh), o = !!(e & ah), l = !!(e & oh)) : t === Zi && (r = i === ih, o = i === sh, l = i === nh), { leftButton: r, middleButton: o, rightButton: l };
}
function lh(n, t) {
  const e = n.center;
  if (!e)
    return null;
  const i = t.getBoundingClientRect(), s = i.width / t.offsetWidth || 1, r = i.height / t.offsetHeight || 1, o = {
    x: (e.x - i.left - t.clientLeft) / s,
    y: (e.y - i.top - t.clientTop) / r
  };
  return { center: e, offsetCenter: o };
}
const Di = {
  srcElement: "root",
  priority: 0
};
class ch {
  constructor(t) {
    this.handleEvent = (e) => {
      if (this.isEmpty())
        return;
      const i = this._normalizeEvent(e);
      let s = e.srcEvent.target;
      for (; s && s !== i.rootElement; ) {
        if (this._emit(i, s), i.handled)
          return;
        s = s.parentNode;
      }
      this._emit(i, "root");
    }, this.eventManager = t, this.handlers = [], this.handlersByElement = /* @__PURE__ */ new Map(), this._active = !1;
  }
  isEmpty() {
    return !this._active;
  }
  add(t, e, i, s = !1, r = !1) {
    const { handlers: o, handlersByElement: l } = this;
    let c = Di;
    typeof i == "string" || i && i.addEventListener ? c = { ...Di, srcElement: i } : i && (c = { ...Di, ...i });
    let f = l.get(c.srcElement);
    f || (f = [], l.set(c.srcElement, f));
    const p = {
      type: t,
      handler: e,
      srcElement: c.srcElement,
      priority: c.priority
    };
    s && (p.once = !0), r && (p.passive = !0), o.push(p), this._active = this._active || !p.passive;
    let x = f.length - 1;
    for (; x >= 0 && !(f[x].priority >= p.priority); )
      x--;
    f.splice(x + 1, 0, p);
  }
  remove(t, e) {
    const { handlers: i, handlersByElement: s } = this;
    for (let r = i.length - 1; r >= 0; r--) {
      const o = i[r];
      if (o.type === t && o.handler === e) {
        i.splice(r, 1);
        const l = s.get(o.srcElement);
        l.splice(l.indexOf(o), 1), l.length === 0 && s.delete(o.srcElement);
      }
    }
    this._active = i.some((r) => !r.passive);
  }
  _emit(t, e) {
    const i = this.handlersByElement.get(e);
    if (i) {
      let s = !1;
      const r = () => {
        t.handled = !0;
      }, o = () => {
        t.handled = !0, s = !0;
      }, l = [];
      for (let c = 0; c < i.length; c++) {
        const { type: f, handler: p, once: x } = i[c];
        if (p({
          ...t,
          type: f,
          stopPropagation: r,
          stopImmediatePropagation: o
        }), x && l.push(i[c]), s)
          break;
      }
      for (let c = 0; c < l.length; c++) {
        const { type: f, handler: p } = l[c];
        this.remove(f, p);
      }
    }
  }
  _normalizeEvent(t) {
    const e = this.eventManager.getElement();
    return {
      ...t,
      ...hh(t),
      ...lh(t, e),
      preventDefault: () => {
        t.srcEvent.preventDefault();
      },
      stopImmediatePropagation: null,
      stopPropagation: null,
      handled: !1,
      rootElement: e
    };
  }
}
const dh = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: Na,
  touchAction: "none",
  tabIndex: 0
};
class uh {
  constructor(t = null, e) {
    this._onBasicInput = (s) => {
      const { srcEvent: r } = s, o = Ua[r.type];
      o && this.manager.emit(o, s);
    }, this._onOtherEvent = (s) => {
      this.manager.emit(s.type, s);
    }, this.options = { ...dh, ...e }, this.events = /* @__PURE__ */ new Map(), this.setElement(t);
    const { events: i } = this.options;
    i && this.on(i);
  }
  getElement() {
    return this.element;
  }
  setElement(t) {
    if (this.element && this.destroy(), this.element = t, !t)
      return;
    const { options: e } = this, i = e.Manager;
    this.manager = new i(t, {
      touchAction: e.touchAction,
      recognizers: e.recognizers || $a
    }).on("hammer.input", this._onBasicInput), e.recognizers || Object.keys(en).forEach((s) => {
      const r = this.manager.get(s);
      r && en[s].forEach((o) => {
        r.recognizeWith(o);
      });
    });
    for (const s in e.recognizerOptions) {
      const r = this.manager.get(s);
      if (r) {
        const o = e.recognizerOptions[s];
        delete o.enable, r.set(o);
      }
    }
    this.wheelInput = new Ya(t, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new Xa(t, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new Za(t, this._onOtherEvent, {
      enable: !1,
      tabIndex: e.tabIndex
    }), this.contextmenuInput = new Ka(t, this._onOtherEvent, {
      enable: !1
    });
    for (const [s, r] of this.events)
      r.isEmpty() || (this._toggleRecognizer(r.recognizerName, !0), this.manager.on(s, r.handleEvent));
  }
  destroy() {
    this.element && (this.wheelInput.destroy(), this.moveInput.destroy(), this.keyInput.destroy(), this.contextmenuInput.destroy(), this.manager.destroy(), this.wheelInput = null, this.moveInput = null, this.keyInput = null, this.contextmenuInput = null, this.manager = null, this.element = null);
  }
  on(t, e, i) {
    this._addEventHandler(t, e, i, !1);
  }
  once(t, e, i) {
    this._addEventHandler(t, e, i, !0);
  }
  watch(t, e, i) {
    this._addEventHandler(t, e, i, !1, !0);
  }
  off(t, e) {
    this._removeEventHandler(t, e);
  }
  _toggleRecognizer(t, e) {
    const { manager: i } = this;
    if (!i)
      return;
    const s = i.get(t);
    if (s && s.options.enable !== e) {
      s.set({ enable: e });
      const r = Ha[t];
      r && !this.options.recognizers && r.forEach((o) => {
        const l = i.get(o);
        e ? (l.requireFailure(t), s.dropRequireFailure(o)) : l.dropRequireFailure(t);
      });
    }
    this.wheelInput.enableEventType(t, e), this.moveInput.enableEventType(t, e), this.keyInput.enableEventType(t, e), this.contextmenuInput.enableEventType(t, e);
  }
  _addEventHandler(t, e, i, s, r) {
    if (typeof t != "string") {
      i = e;
      for (const p in t)
        this._addEventHandler(p, t[p], i, s, r);
      return;
    }
    const { manager: o, events: l } = this, c = sn[t] || t;
    let f = l.get(c);
    f || (f = new ch(this), l.set(c, f), f.recognizerName = Ba[c] || c, o && o.on(c, f.handleEvent)), f.add(t, e, i, s, r), f.isEmpty() || this._toggleRecognizer(f.recognizerName, !0);
  }
  _removeEventHandler(t, e) {
    if (typeof t != "string") {
      for (const o in t)
        this._removeEventHandler(o, t[o]);
      return;
    }
    const { events: i } = this, s = sn[t] || t, r = i.get(s);
    if (r && (r.remove(t, e), r.isEmpty())) {
      const { recognizerName: o } = r;
      let l = !1;
      for (const c of i.values())
        if (c.recognizerName === o && !c.isEmpty()) {
          l = !0;
          break;
        }
      l || this._toggleRecognizer(o, !1);
    }
  }
}
class gn {
  #t = [
    "pointerdown",
    "pointerup",
    "pointerover",
    "pointerenter",
    "pointerout",
    "pointerleave",
    "pointermove",
    "pointercancel",
    "gotpointercapture",
    "lostpointercapture",
    "click",
    "dblclick",
    "anyclick",
    "wheel",
    "contextmenu",
    "pointerdrag",
    "pointerdragend",
    "pan",
    "panstart",
    "panmove",
    "panup",
    "pandown",
    "panleft",
    "panright",
    "panend",
    "pancancel"
  ];
  #e;
  #r = {
    left: !1
  };
  constructor(t) {
    this.#e = t;
  }
  has(t) {
    return this.#t.indexOf(t) != -1;
  }
  on(t, e, i, s) {
    let r = e;
    switch (t) {
      case "pointerdown":
        r = function(o) {
          this.logit(o), o.leftButton && (this.#e.pad.left = !0), this.#e.onPointerDown(o), e(this.#e.pointerEventData(o));
        };
        break;
      case "pointerup":
        r = function(o) {
          this.logit(o), this.#e.onPointerUp(o), e(this.#e.pointerEventData(o));
        };
        break;
      case "pointermove":
        r = function(o) {
          this.#e.motion(o), e(this.#e.pointerEventData(o));
        };
        break;
      case "click":
      case "dbclick":
      case "pointerenter":
      case "pointerleave":
      case "pointerout":
      case "pointerover":
      case "contextmenu":
        r = function(o) {
          this.logit(o), this.#e.location(o), e(this.#e.pointerEventData(o));
        };
        break;
      case "wheel":
        r = function(o) {
          this.logit(o), this.#e.wheeldelta = o, e(this.#e.pointerEventData(o));
        };
        break;
      case "pointercancel":
      case "gotpointercapture":
      case "lostpointercapture":
        r = function(o) {
          e(o);
        };
        break;
      case "pointerdrag":
        r = function(o) {
          this.logit(o), this.#e.motion(o), e(this.#e.pointerEventData(o));
        }, this.#e.agent.on("panstart", this.#e.startPointerDrag.bind(this.#e)), t = "panmove";
        break;
      case "pointerdragend":
        r = function(o) {
          this.logit(o), this.#e.motion(o), this.#e.endPointerDrag(o), e(this.#e.pointerEventData(o));
        }, t = "panend";
        break;
    }
    return s ? this.#e.agent.once(t, r.bind(this), i) : this.#e.agent.on(t, r.bind(this), i), r;
  }
  off(t, e, i) {
    this.#e.agent.off(t, e, i);
  }
  logit(t) {
  }
}
class mn {
  #t = [
    "rotate",
    "rotatestart",
    "rotatemove",
    "rotateend",
    "rotatecancel",
    "pinch",
    "pinchin",
    "pinchout",
    "pinchstart",
    "pinchmove",
    "pinchend",
    "pinchcancel",
    "swipe",
    "swipeleft",
    "swiperight",
    "swipeup",
    "swipedown",
    "tripan",
    "tripanstart",
    "tripanmove",
    "tripanup",
    "tripandown",
    "tripanleft",
    "tripanright",
    "tripanend",
    "tripancancel"
  ];
  #e;
  constructor(t) {
    this.#e = t;
  }
  has(t) {
    return this.#t.indexOf(t) != -1;
  }
  on(t, e, i, s) {
    let r = e;
    return s ? this.#e.agent.once(t, r.bind(this), i) : this.#e.agent.on(t, r.bind(this), i), r;
  }
  off(t, e, i) {
    this.#e.agent.off(t, e, i);
  }
}
class pn {
  #t = [
    "keydown",
    "keyup"
  ];
  #e;
  constructor(t) {
    this.#e = t;
  }
  has(t) {
    return this.#t.indexOf(t) != -1;
  }
  on(t, e, i, s) {
    let r = e;
    return s ? this.#e.agent.once(t, r.bind(this), i) : this.#e.agent.on(t, r.bind(this), i), r;
  }
  off(t, e, i) {
    this.#e.agent.off(t, e, i);
  }
}
const fh = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class Nt {
  #t;
  #e;
  #r;
  #s = null;
  #i = null;
  #n = null;
  #o;
  #h;
  #l = !1;
  #a;
  #c;
  #u;
  pad = { left: !1 };
  constructor(t, e) {
    if (this.#t = { ...fh, ...e }, this.#h = Aa.idle, this.#o = La, this.#e = t, !this.#e && this.#t.elementId && (this.#e = document.getElementById(this.#t.elementId)), !R.isElement(this.#e))
      throw "Must specify an element to receive user input.";
    this.#t.contextMenu || (window.oncontextmenu = (r) => (r.preventDefault(), !1));
    const s = {
      recognizerOptions: {
        pan: { threshold: this.#o ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#r = new uh(this.#e, s), this.pointerInit();
  }
  get agent() {
    return this.#r;
  }
  get pointer() {
    return this.#s instanceof gn ? this.#s : (this.#s = new gn(this), this.#s);
  }
  get touch() {
    return this.#n instanceof mn ? this.#n : (this.#n = new mn(this), this.#n);
  }
  get key() {
    return this.#i instanceof pn ? this.#i : (this.#i = new pn(this), this.#i);
  }
  get status() {
    return this.#h;
  }
  get element() {
    return this.#e;
  }
  get isTouch() {
    return this.#o;
  }
  get isPan() {
    return this.#l;
  }
  set panX(t) {
    G(t) && (this.#a = t);
  }
  set panY(t) {
    G(y) && (this.#c = y);
  }
  set wheeldelta(t) {
    this.#u = t.delta;
  }
  get wheeldelta() {
    return this.#u;
  }
  destroy() {
    this.#r.destroy(), this.#s = void 0, this.#i = void 0, this.#n = void 0;
  }
  isValid(t, e) {
    return !!(T(t) || k(e));
  }
  validOptions(t) {
    return S(t) && G(t) ? t : void 0;
  }
  on(t, e, i, s = !1) {
    if (!this.isValid(t, e))
      return !1;
    this.pointer.has(t) ? this.#s.on(t, e, i, s) : this.touch.has(t) ? this.#n.on(t, e, i, s) : this.key.has(t) ? this.#i.on(t, e, i, s) : this.element.addEventListener(t, e, this.validOptions(i));
  }
  off(t, e, i) {
    this.#s?.has(t) ? this.#s.off(t, e, i) : this.#n?.has(t) ? this.#n.off(t, e, i) : this.#i?.has(t) ? this.#i.off(t, e, i) : this.element.removeEventListener(t, e, this.validOptions(i));
  }
  once(t, e, i) {
    this.on(t, e, i, !0);
  }
  setCursor(t) {
    this.#e.style.cursor = t;
  }
  pointerInit() {
    this.clientPosPrev = new Wt([null, null]), this.position = new Wt([0, 0]), this.movement = new Wt([0, 0]), this.dragstart = new Wt([null, null]), this.dragend = new Wt([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
  }
  pointerEventData(t) {
    return {
      isProcessed: !1,
      pointerType: t.pointerType,
      position: this.position.clone(),
      movement: this.movement.clone(),
      dragstart: this.dragstart.clone(),
      dragend: this.dragend.clone(),
      wheeldelta: this.wheeldelta,
      buttons: this.pointerButtons,
      domEvent: t,
      timeStamp: Date.now()
    };
  }
  motion(t) {
    let e = { left: 0, top: 0 };
    try {
      e = t.srcEvent.target?.getBoundingClientRect();
    } catch {
    }
    const i = t.srcEvent.clientX || this.position.x, s = t.srcEvent.clientY || this.position.y;
    this.movement.x = i - this.clientPosPrev.x, this.movement.y = s - this.clientPosPrev.y, this.position.x = i - e.left, this.position.y = s - e.top, this.clientPosPrev.x = i, this.clientPosPrev.y = s;
  }
  location(t) {
    let e = { left: 0, top: 0 };
    try {
      e = t.srcEvent.target?.getBoundingClientRect();
    } catch {
    }
    this.clientPosPrev.x = t.srcEvent.clientX, this.clientPosPrev.y = t.srcEvent.clientY, this.position.x = t.srcEvent.clientX - e.left, this.position.y = t.srcEvent.clientY - e.top, this.movement.x = 0, this.movement.y = 0;
  }
  onPointerDown(t) {
    this.location(t), this.pointerButtons[t.srcEvent.button] = !0;
  }
  onPointerUp(t) {
    this.location(t), this.pointerButtons[t.srcEvent.button] = !1;
  }
  startPointerDrag(t) {
    this.#l = !0, this.onPointerDown(t);
  }
  endPointerDrag(t) {
    this.#l = !1;
  }
}
class xt {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h;
  #l;
  #a;
  static dividerList = {};
  static divideCnt = 0;
  static class = Qs;
  static name = "Dividers";
  static type = "divider";
  static create(t, e) {
    const i = `${e.core.id}_divider_${++xt.divideCnt}`;
    return e.id = i, xt.dividerList[i] = new xt(t, e), xt.dividerList[i];
  }
  static destroy() {
    for (let t in xt.dividerList)
      xt.dividerList[t].destroy();
    delete xt.dividerList[id];
  }
  static defaultNode() {
    return `
  <div slot="widget" class="${Qs}" style="position: absolute;"></div>
  `;
  }
  constructor(t, e) {
    const i = { ...e };
    this.#i = t, this.#e = i.core, this.#r = i, this.#s = i.core.theme, this.#t = i.id, this.#n = i.chartPane, this.#o = t.elements.elDividers, this.init();
  }
  get el() {
    return this.#h;
  }
  get id() {
    return this.#t;
  }
  get chartPane() {
    return this.#n;
  }
  get config() {
    return this.#e.config;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#h);
  }
  get height() {
    return this.#h.getBoundingClientRect().height;
  }
  set cursor(t) {
    this.#h.style.cursor = t;
  }
  get cursor() {
    return this.#h.style.cursor;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = "row-resize", this.eventsListen();
  }
  destroy() {
    this.#a.destroy(), this.el.remove(), delete xt.dividerList[this.id];
  }
  eventsListen() {
    this.#a = new Nt(this.#h, { disableContextMenu: !1 }), this.#a.on("pointerover", this.onMouseEnter.bind(this)), this.#a.on("pointerout", this.onMouseOut.bind(this)), this.#a.on("pointerdrag", this.onPointerDrag.bind(this)), this.#a.on("pointerdragend", this.onPointerDragEnd.bind(this));
  }
  on(t, e, i) {
    this.#e.on(t, e, i);
  }
  off(t, e) {
    this.#e.off(t, e);
  }
  emit(t, e) {
    this.#e.emit(t, e);
  }
  onMouseEnter() {
    this.#h.style.background = this.#s.divider.active, this.#e.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#h.style.background = this.#s.divider.idle, this.#e.MainPane.onMouseEnter();
  }
  onPointerDrag(t) {
    this.#l = this.#e.MainPane.cursorPos, this.#h.style.background = this.#s.divider.active, this.emit(`${this.id}_pointerdrag`, this.#l), this.emit("divider_pointerdrag", {
      id: this.id,
      e: t,
      pos: this.#l,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(t) {
    "position" in t && (this.#h.style.background = this.#s.divider.idle), this.#l = this.#e.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#l), this.emit("divider_pointerdragend", {
      id: this.id,
      e: t,
      pos: this.#l,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  mount() {
    this.#o.lastElementChild == null ? this.#o.innerHTML = this.dividerNode() : this.#o.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#h = R.findBySelector(`#${this.#t}`, this.#o);
  }
  dividerNode() {
    let t = this.#n.pos.top - R.elementDimPos(this.#o).top, e = this.#e.MainPane.rowsW + this.#e.scaleW, i = v(this.config.dividerHeight) ? this.config.dividerHeight : na, s = this.#e.theme.tools.width;
    switch (t -= i / 2, this.#e.theme.tools.location) {
      case "left":
        break;
      case !1:
      case "none":
      case "right":
        s *= -1;
        break;
    }
    const r = `position: absolute; top: ${t}px; left: ${s}px; z-index:100; width: ${e}px; height: ${i}px; background: ${this.#s.divider.idle};`;
    return `
      <div id="${this.#t}" class="divider" style="${r}"></div>
    `;
  }
  setPos() {
    let t = this.#n.pos.top - R.elementDimPos(this.#o).top;
    t = t - this.height / 2, this.#h.style.top = `${t}px`;
  }
  hide() {
    this.#h.style.display = "none";
  }
  show() {
    this.#h.style.display = "block";
  }
}
const Ft = 300, li = 400, gh = `${li}px`, Qn = `${Ft}px`, mh = "100%", ph = "100%", _t = 30, Ot = 35, ci = 25, Jn = 25, di = ci + Jn, se = 60, Qt = "normal", Jt = 12, ki = "normal", te = "Avenir, Helvetica, Arial, sans-serif", ds = "#141414", us = "#666", fs = "#ccc", Me = "#888", Pe = "#CCC", tr = "25px", vh = "position: relative;", B = {
  COLOUR_BG: ds,
  COLOUR_BORDER: us,
  COLOUR_TXT: fs,
  COLOUR_ICON: Me,
  COLOUR_ICONHOVER: Pe,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: Qt,
  FONTSIZE: Jt,
  FONTSTYLE: ki,
  FONTFAMILY: te,
  FONT: `${ki} ${Jt}px ${Qt} ${te}`,
  FONTSTRING: `font-style: ${ki}; font-size: ${Jt}px; font-weight: ${Qt}; font-family: ${te};`
}, ht = {
  fontSize: Jt,
  fontWeight: Qt,
  fontFamily: te,
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderSize: 1,
  txtCol: "#000",
  bakCol: "#ccc",
  stroke: "fff",
  fill: "888"
}, It = {
  COLOUR_ICON: Me,
  COLOUR_ICONHOVER: Pe,
  ICONSIZE: tr
}, ee = {
  COLOUR_ICON: Me,
  COLOUR_ICONHOVER: Pe,
  ICONSIZE: tr
}, Ni = {
  COLOUR_BG: ds,
  COLOUR_BORDER: us,
  COLOUR_TXT: fs
}, $i = {
  COLOUR_BG: ds,
  COLOUR_BORDER: us,
  COLOUR_TXT: fs
}, V = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, Ke = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, ni = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, vn = Qt, ri = Jt, oi = te, ft = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: oi,
  FONTSIZE: ri,
  FONTWEIGHT: vn,
  FONT_LABEL: `${vn} ${ri}px ${oi}`,
  FONT_LABEL_BOLD: `bold ${ri}px ${oi}`
}, yn = Qt, xn = Jt, wn = te, zt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: wn,
  FONTSIZE: xn,
  FONTWEIGHT: yn,
  FONT_LABEL: `${yn} ${xn}px ${wn}`,
  FONT_LABEL_BOLD: `bold ${ri}px ${oi}`
}, er = {
  COLOUR_GRID: "#333"
}, yh = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, En = {
  text: B.FONTSTRING,
  font: B.FONT,
  colour: B.COLOUR_TXT
}, Tn = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00"
}, xh = {
  candle: {
    Type: V.CANDLE_SOLID,
    UpBodyColour: Ke.COLOUR_CANDLE_UP,
    UpWickColour: Ke.COLOUR_WICK_UP,
    DnBodyColour: Ke.COLOUR_CANDLE_DN,
    DnWickColour: Ke.COLOUR_WICK_DN
  },
  volume: {
    Height: ni.ONCHART_VOLUME_HEIGHT,
    UpColour: ni.COLOUR_VOLUME_UP,
    DnColour: ni.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: zt.COLOUR_TICK,
    colourLabel: zt.COLOUR_LABEL,
    colourCursor: zt.COLOUR_CURSOR,
    colourCursorBG: zt.COLOUR_CURSOR_BG,
    fontFamily: zt.FONTFAMILY,
    fontSize: zt.FONTSIZE,
    fontWeight: zt.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: Me,
    iconHover: Pe
  },
  yAxis: {
    colourTick: ft.COLOUR_TICK,
    colourLabel: ft.COLOUR_LABEL,
    colourCursor: ft.COLOUR_CURSOR,
    colourCursorBG: ft.COLOUR_CURSOR_BG,
    fontFamily: ft.FONTFAMILY,
    fontSize: ft.FONTSIZE,
    fontWeight: ft.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: B.COLOUR_BG,
    BorderColour: B.COLOUR_BORDER,
    BorderThickness: B.BORDER_THICKNESS,
    TextColour: B.COLOUR_TXT,
    GridColour: er.COLOUR_GRID
  },
  primaryPane: {},
  secondaryPane: {
    separator: "#666"
  },
  legend: {
    font: En.font,
    colour: En.colour,
    controls: !0,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: Me,
    hover: Pe
  },
  divider: {
    active: Tn.ACTIVE,
    idle: Tn.IDLE
  }
}, wh = `
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
</style>`, Eh = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${gh});
    min-height: var(--txc-min-height, ${Qn});
    max-width: var(--txc-max-width, ${mh});
    max-height: var(--txc-max-height, ${ph});
    overflow: hidden;
    background: var(--txc-background, ${B.COLOUR_BG});
    font: var(--txc-font, ${B.FONT});
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
`, Sn = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class ut {
  static #t = new lt();
  static get list() {
    return ut.#t;
  }
  #e;
  static create(t, e) {
    if (!S(t))
      return !1;
    t.id = T(t.name) ? Q(t.name) : `${e.id}.theme`;
    const i = new ut(t, e);
    return ut.list.set(t.id, i), i;
  }
  constructor(t, e) {
    this.#e = e, this.setCurrent(t);
  }
  get list() {
    return ut.list;
  }
  setCurrent(t = {}) {
    t = S(t) ? t : {};
    const e = it(xh), i = it(t), s = Se(e, i);
    for (let r in s)
      Sn.includes(r) || (this[r] = s[r]);
    this.#e.refresh();
  }
  setTheme(t) {
    if (T(t) && ut.list.has(t)) {
      const e = ut.list.get(t);
      return this.setCurrent(e), !0;
    }
    return !1;
  }
  setProperty(t, e) {
    if (!T(t))
      return;
    const i = zs(this, t), s = t.split(".");
    if (s.length == 1)
      this[s[0]] = e;
    else {
      let r = s.shift();
      this[r] = qn(this[r], s.join("."), e);
    }
    return this.#e.refresh(), i;
  }
  getProperty(t) {
    return zs(this, t);
  }
  deleteTheme(t) {
    return T(t) && ut.list.has(t) ? (ut.list.delete(t), !0) : !1;
  }
  exportTheme(t = {}) {
    S || (t = {});
    const e = t?.type, i = {};
    let s;
    for (let r in this)
      Sn.includes(r) || (i[r] = this[r]);
    switch (e) {
      case "json":
      default:
        const { replacer: r, space: o } = { ...t };
        s = JSON.stringify(i, r, o);
    }
    return s;
  }
}
class Th {
  #t;
  constructor(t) {
    this.#t = t, self.onmessage = (e) => this._onmessage(e.data);
  }
  _onmessage(t) {
    const { r: e, data: i } = t, s = this.#t(i);
    self.postMessage({ r: e, result: s });
  }
  end() {
    self.close();
  }
}
class Sh {
  #t;
  #e;
  #r;
  #s = 0;
  #i = {};
  #n;
  constructor(t, e, i, s) {
    this.#t = t, this.#e = i, this.#r = s;
    const r = `
      ${ir.ThreadWorker.toString()};
      const fn = ${e}
      const worker = new ThreadWorker(fn)
    `, o = new Blob([`;(() => {${r}})()`], { type: "text/javascript" }), l = URL.createObjectURL(o);
    this.#n = new Worker(l), URL.revokeObjectURL(l);
  }
  get id() {
    return this.#t;
  }
  get req() {
    return `r_${this.#s}`;
  }
  onmessage(t) {
    return k(this.#e) ? this.#e(t) : t;
  }
  onerror(t) {
    return k(this.#r) ? this.#r(t) : t;
  }
  postMessage(t) {
    return new Promise((e, i) => {
      try {
        let s = this.req;
        this.#i[s] = { resolve: e, reject: i }, this.#n.postMessage({ r: s, data: t }), this.#n.onmessage = (r) => {
          const { r: o, result: l } = r.data;
          if (o in this.#i) {
            const { resolve: c, reject: f } = this.#i[o];
            delete this.#i[o], c(this.onmessage(l));
          }
        }, this.#n.onerror = (r) => {
          i(this.onerror(r));
        };
      } catch (s) {
        i(s);
      }
    });
  }
  terminate() {
    this.#n.terminate();
  }
}
let ir = class Lt {
  static #t = /* @__PURE__ */ new Map();
  static ThreadWorker = Th;
  static Thread = Sh;
  static create(t = "worker", e, i, s) {
    if (typeof window.Worker > "u")
      return !1;
    if (k(e))
      e = e.toString();
    else if (!T(e))
      return !1;
    return t = T(t) ? Q(t) : Q("worker"), Lt.#t.set(t, new Lt.Thread(t, e, i)), Lt.#t.get(t);
  }
  static destroy(t) {
    if (!T(t))
      return !1;
    Lt.#t.get(t).terminate(), Lt.#t.delete(t);
  }
  static end() {
    Lt.#t.forEach((t, e, i) => {
      Lt.destroy(e);
    });
  }
};
class Y {
  #t;
  #e;
  #r = {};
  #s;
  #i;
  #n;
  #o;
  #h;
  #l;
  #a = !0;
  id;
  constructor(t, e = !1, i = !1, s, r, o = {}) {
    this.#e = r.core, this.#t = r, this.#r = r.core.config, this.#o = t, this.#h = t.scene, this.#s = s, this.#i = e, this.#n = i, this.#l = o;
  }
  get core() {
    return this.#e;
  }
  get parent() {
    return this.#t;
  }
  get target() {
    return this.#o;
  }
  get config() {
    return this.#r;
  }
  get params() {
    return this.#l;
  }
  get scene() {
    return this.#h;
  }
  get theme() {
    return this.#s;
  }
  get chart() {
    return this.#t.parent.parent;
  }
  get xAxis() {
    return this.#i || this.#t.time.xAxis;
  }
  get yAxis() {
    return this.#n || this.#t.scale.yAxis;
  }
  set doDraw(t) {
    this.#a = G(t) ? t : !1;
  }
  get doDraw() {
    return this.#a;
  }
  destroy() {
  }
  on(t, e, i) {
    this.#e.on(t, e, i);
  }
  off(t, e) {
    this.#e.off(t, e);
  }
  emit(t, e) {
    this.core.emit(t, e);
  }
}
function sr(n, t) {
  return Math.round(n.measureText(t).width);
}
function Re(n = ht.fontSize, t = ht.fontWeight, e = ht.fontFamily) {
  return `${t} ${n}px ${e}`;
}
function wi(n, t, e) {
  n.font = Re(e.fontSize, e.fontWeight, e.fontFamily);
  const i = sr(n, t), s = e.paddingLeft || 0, r = e.paddingRight || 0, o = e.borderSize || 0;
  return s + r + i + o * 2;
}
function Ei(n) {
  const t = n.paddingTop || 0, e = n.paddingBottom || 0, i = n.borderSize || 0, s = n.fontSize || 0;
  return t + e + s + i * 2;
}
function Ch(n, t, e, i) {
  n.fillStyle = i?.colour, n.font = Re(i?.fontSize, i?.fontWeight, i?.fontFamily), n.textAlign = i?.textAlign || "start", n.textBaseLine = i?.textBaseLine || "alphabetic", n.direction = i?.direction || "inherit", n.lineWidth = i?.size, n.strokeStyle = i?.border, i?.stroke ? n.strokeText(i?.text, t, e, i?.max) : n.fillText(i?.text, t, e, i?.max);
}
function Le(n, t, e, i, s) {
  n.save(), n.font = Re(s?.fontSize, s?.fontWeight, s?.fontFamily), n.textBaseline = "top", n.fillStyle = s.bakCol || ht.bakCol;
  let r = s.width || wi(n, t, s), o = s.height || Ei(s);
  n.fillRect(e, i, r, o), n.fillStyle = s.txtCol || ht.txtCol, e = e + s?.paddingLeft, i = i + s?.paddingTop, n.fillText(`${t}`, e, i), n.restore();
}
function nr(n, t, e, i, s, r) {
  n.lineWidth = r?.size || ht.borderSize, n.strokeStyle = r?.border || ht.stroke, n.beginPath(), n.rect(t, e, i, s), n.stroke();
}
function rr(n, t, e, i, s, r) {
  n.fillStyle = r?.fill || ht.fill, n.fillRect(t, e, i, s);
}
function bh(n, t, e, i, s, r) {
  T(r.fill) && rr(n, t, e, i, s, r), v(r.size) && r.size > 0 && nr(n, t, e, i, s, r);
}
function or(n, t, e, i, s, r, o) {
  n.lineWidth = o?.size || ht.borderSize, n.strokeStyle = o?.border || ht.stroke, hr(n, t, e, i, s, r), n.stroke();
}
function ar(n, t, e, i, s, r, o) {
  n.fillStyle = o?.fill || ht.fill, hr(n, t, e, i, s, r), n.fill();
}
function hr(n, t, e, i, s, r) {
  n.beginPath(), n.moveTo(t + r, e), n.arcTo(t + i, e, t + i, e + s, r), n.arcTo(t + i, e + s, t, e + s, r), n.arcTo(t, e + s, t, e, r), n.arcTo(t, e, t + i, e, r), n.closePath();
}
function Mh(n, t, e, i, s, r, o) {
  T(o.fill) && ar(n, t, e, i, s, r, o?.fill), v(o.size) && o.size > 0 && or(n, t, e, i, s, r, o?.border, o?.size);
}
function lr(n, t, e, i, s, r, o) {
  if (!(s < 3)) {
    var l = Math.PI * 2 / s;
    n.beginPath(), n.translate(t, e), n.rotate(r * Math.PI / 180), n.moveTo(i, 0);
    for (var c = 1; c < s; c++)
      n.lineTo(i * Math.cos(l * c), i * Math.sin(l * c));
    n.closePath(), oe(n, o?.fill, o?.stroke, o?.size);
  }
}
function Ph(n, t, e) {
  if (t.length > 0) {
    n.beginPath();
    var i = t[0];
    n.moveTo(i.x, i.y);
    for (var s = 1; s < t.length; ++s)
      i = t[s], n.lineTo(i.x, i.y);
    n.closePath(), oe(n, e?.fill, e?.stroke, e?.size);
  }
}
function Lh(n, t, e, i, s) {
  lr(n, t, e, i, 3, s?.rotate || 0), oe(n, s?.fill, s?.stroke, s?.size);
}
function Ah(n, t, e, i, s, r) {
  n.beginPath(), n.moveTo(t - i / 2, e), n.lineTo(t, e - s / 2), n.lineTo(t + i / 2, e), n.lineTo(t, e + s / 2), n.closePath(), oe(n, r?.fill, r?.stroke, r?.size);
}
function re(n, t, e, i) {
  n.save();
  const s = e.width || 1;
  n.lineWidth = s, s % 2 && n.translate(0.5, 0.5), n.strokeStyle = e.stroke, M(e.dash) && n.setLineDash(e.dash), n.beginPath();
  let r = !0;
  t.forEach((o) => {
    o && o.x !== null && (r ? (n.moveTo(o.x, o.y), r = !1) : n.lineTo(o.x, o.y));
  }), i(), n.restore();
}
function Oh(n, t, e) {
  re(n, t, e, () => {
    n.stroke();
  });
}
function Ih(n, t, e) {
  re(n, t, e, () => {
    n.closePath();
  }), oe(n, opts?.fill, opts?.stroke, opts?.size);
}
function Rh(n, t, e) {
  n.beginPath(), n.moveTo(t[0].x, t[0].y);
  for (var i = e ?? 1, s = 0; s < t.length - 1; s++) {
    var r = s > 0 ? t[s - 1] : t[0], o = t[s], l = t[s + 1], c = s != t.length - 2 ? t[s + 2] : l, f = o.x + (l.x - r.x) / 6 * i, p = o.y + (l.y - r.y) / 6 * i, x = l.x - (c.x - o.x) / 6 * i, C = l.y - (c.y - o.y) / 6 * i;
    n.bezierCurveTo(f, p, x, C, l.x, l.y);
  }
  n.stroke();
}
function cr(n, t, e, i, s) {
  re(n, [{ x: e, y: t }, { x: i, y: t }], s, () => {
    n.stroke(), n.closePath();
  });
}
function _h(n, t, e, i, s) {
  coords = [{ x: t, y: e }, { x: t, y, bottom: i }], re(n, coords, s, () => {
    n.stroke(), n.closePath();
  });
}
function Dh(n, t, e) {
  re(n, t, e, () => {
    n.stroke(), n.closePath();
  });
}
function kh(n, t, e, i, s) {
  n.beginPath(), n.arc(t, e, i, 0, Math.PI * 2), n.closePath(), fillStroke(n, s?.fill, s?.stroke, s?.size);
}
function Nh(n) {
  return n.ownerDocument && n.ownerDocument.defaultView && n.ownerDocument.defaultView.devicePixelRatio || 2;
}
function oe(n, t, e, i) {
  T(t) && (n.fillStyle = t, n.fill()), v(i) && i > 0 && (n.lineWidth = i, n.strokeStyle = e || ht.stroke, n.stroke());
}
function $h(n, t, e, i, s, r, o, l, c, f) {
  n.drawImage(t, e, i, s, r, o, l, c, f);
}
const K = {
  getPixelRatio: Nh,
  fillStroke: oe,
  calcTextWidth: sr,
  createFont: Re,
  getTextRectHeight: Ei,
  getTextRectWidth: wi,
  renderImage: $h,
  renderText: Ch,
  renderTextBG: Le,
  renderPath: re,
  renderPathStroke: Oh,
  renderPathClosed: Ih,
  renderSpline: Rh,
  renderLine: Dh,
  renderLineHorizontal: cr,
  renderLineVertical: _h,
  renderCircle: kh,
  renderRect: bh,
  renderRectFill: rr,
  renderRectStroke: nr,
  renderRectRound: Mh,
  renderRectRoundFill: ar,
  renderRectRoundStroke: or,
  renderPolygonRegular: lr,
  renderPolygonIrregular: Ph,
  renderDiamond: Ah,
  renderTriangle: Lh
}, Xt = 0, Cn = 4;
class Dt extends Y {
  static #t = 0;
  static get cnt() {
    return ++Dt.#t;
  }
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
  #u;
  #d;
  #f;
  #v = [0, 0];
  #y;
  #m;
  #x = 2;
  #p = {};
  #S;
  #P;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, void 0, r, o), this.#r = Y.cnt, this.#l = o, this.#a = o.overlay, this.#u = s.type, this.#c = s.indicator, this.#d = this.core.TALib, this.#f = this.xAxis.range, this.eventsListen();
  }
  get id() {
    return this.#e || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#r}`;
  }
  set id(t) {
    this.#e = String(t).replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#s;
  }
  set name(t) {
    this.#s = t;
  }
  get shortName() {
    return this.#i;
  }
  set shortName(t) {
    this.#i = t;
  }
  get chartPane() {
    return this.core.ChartPanes.get(this.chartPaneID);
  }
  get chartPaneID() {
    return this.#l.overlay.paneID;
  }
  get primaryPane() {
    return this.#n;
  }
  set primaryPane(t) {
    this.#n = t;
  }
  get scaleOverlay() {
    return this.#o;
  }
  set scaleOverlay(t) {
    this.#o = t;
  }
  get plots() {
    return this.#h;
  }
  set plots(t) {
    this.#h = t;
  }
  get params() {
    return this.#l;
  }
  get Timeline() {
    return this.core.Timeline;
  }
  get scale() {
    return this.parent.scale;
  }
  get type() {
    return this.#u;
  }
  get overlay() {
    return this.#a;
  }
  get legendID() {
    return this.#S;
  }
  get indicator() {
    return this.#c;
  }
  get TALib() {
    return this.#d;
  }
  get range() {
    return this.core.range;
  }
  set setNewValue(t) {
    this.#y = t;
  }
  set setUpdateValue(t) {
    this.#m = t;
  }
  set precision(t) {
    this.#x = t;
  }
  get precision() {
    return this.#x;
  }
  set style(t) {
    this.#p = t;
  }
  get style() {
    return this.#p;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  set value(t) {
    const e = this.core.time.timeFrameMS;
    let i = Math.floor(new Date(t[Xt]) / e) * e;
    t[Xt] = i, this.#v[Xt] !== t[Xt] ? (this.#v[Xt] = t[Xt], this.#y(t)) : this.#m(t);
  }
  get value() {
    return this.#v;
  }
  destroy() {
    if (this.#P === "destroyed")
      return;
    if (!this.core.ChartPanes.get(this.chartPaneID).indicatorDeleteList[this.id]) {
      this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeIndicator()" instead.`);
      return;
    }
    this.off(Et, this.onStreamUpdate), this.chart.legend.remove(this.#S), this.#P = "destroyed";
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.emit(`${this.chartPaneID}_removeIndicator`, { id: this.id, paneID: this.chartPaneID });
  }
  visible(t) {
    return G(t) && (this.emit(`${this.chartPaneID}_visibleIndicator`, { id: this.id, paneID: this.chartPaneID, visible: t }), this.chartPane.indicators[this.id].layer.visible = t, this.draw()), this.chartPane.indicators[this.id].layer.visible;
  }
  settings(t) {
    return S(t) && (S(t?.config) && (this.params.overlay.settings = { ...this.params.overlay.settings, ...t.config }), S(t?.style) && (this.style = { ...this.style, ...t.style }), this.draw()), {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition
    };
  }
  eventsListen() {
    this.on(Et, this.onStreamUpdate, this);
  }
  on(t, e, i) {
    this.core.on(t, e, i);
  }
  off(t, e) {
    this.core.off(t, e);
  }
  emit(t, e) {
    this.core.emit(t, e);
  }
  onStreamNewValue(t) {
  }
  onStreamUpdate(t) {
    this.value = t;
  }
  onLegendAction(t) {
    switch (this.chart.legend.onMouseClick(t.currentTarget).icon) {
      case "up":
        return;
      case "down":
        return;
      case "visible":
        this.visible(!this.visible());
        return;
      case "maximize":
        return;
      case "restore":
        return;
      case "remove":
        this.remove();
        return;
      case "config":
        this.invokeSettings();
        return;
      default:
        return;
    }
  }
  invokeSettings(t) {
    if (k(t?.fn)) {
      let e = Cn.fn(this);
      if (t?.own)
        return e;
    } else if (k(this.core.config.callbacks?.indicatorSettings?.fn)) {
      let e = this.core.config.callbacks.indicatorSettings.fn(this);
      if (this.core.config.callbacks?.indicatorSettings?.own)
        return e;
    }
    this.core.log(`invokeSettings: ${this.id}`);
  }
  defineIndicator(t, e) {
    S(t) || (t = {}), this.definition.output = e.outputs;
    const i = { ...this.definition.input, ...t };
    delete i.style;
    for (let s of e.options)
      if (s.name in i)
        if (typeof i[s.name] !== s.type) {
          i[s.name] = s.defaultValue;
          continue;
        } else
          "range" in s && (i[s.name] = et(i[s.name], s.range.min, s.range.max));
      else
        s.name == "timePeriod" && (i.timePeriod = s.defaultValue);
    this.definition.input = i;
  }
  addLegend() {
    let t = {
      id: this.id,
      title: this.shortName,
      type: "indicator",
      parent: this,
      source: this.legendInputs.bind(this)
    };
    this.#S = this.chart.legend.add(t);
  }
  legendInputs(t = this.chart.cursorPos) {
    const e = [this.style.stroke];
    let s = this.Timeline.xPos2Index(t[0]) - (this.range.data.length - this.overlay.data.length), r = et(this.overlay.data.length - 1, 0, 1 / 0);
    return s = et(s, 0, r), { c: s, colours: e };
  }
  indicatorInput(t, e) {
    let i = [];
    do
      i.push(this.range.value(t)[Cn]);
    while (t++ < e);
    return i;
  }
  regeneratePlots(t) {
    return t.map((e, i) => {
      const s = i + 1;
      return {
        key: `${this.shortName}${s}`,
        title: `${this.shortName}${s}: `,
        type: "line"
      };
    });
  }
  TALibParams() {
    let t = this.range.dataLength, e = this.definition.input.timePeriod, i = t - e, s = this.indicatorInput(i, t);
    return s.find((o) => o === null) ? !1 : { inReal: s, timePeriod: e };
  }
  calcIndicator(t, e = {}, i = this.range) {
    if (!T(t) || !(t in this.TALib) || !S(i) || !this.core.TALibReady)
      return !1;
    e.timePeriod = e.timePeriod || this.definition.input.timePeriod;
    let s, r, o = e.timePeriod;
    if (i instanceof Yi)
      s = 0, r = i.dataLength - o + 1;
    else if ("indexStart" in i || "indexEnd" in i || "tsStart" in i || "tsEnd" in i)
      s = i.indexStart || this.Timeline.t2Index(i.tsStart || 0) || 0, r = i.indexEnd || this.Timeline.t2Index(i.tsEnd) || this.range.Length - 1;
    else
      return !1;
    if (r - s < o)
      return !1;
    let l = [], c, f, p;
    for (; s < r; ) {
      e.inReal = this.indicatorInput(s, s + o), p = this.TALib[t](e), f = [], c = 0;
      for (let x of this.definition.output)
        f[c++] = p[x.name][0];
      l.push([this.range.value(s + o - 1)[0], f]), s++;
    }
    return l;
  }
  calcIndicatorHistory() {
    const t = () => {
      let e = this.calcIndicator(this.libName, this.definition.input, this.range);
      e && (this.overlay.data = e);
    };
    this.core.TALibReady ? t() : this.core.talibAwait.push(t.bind(this));
  }
  calcIndicatorStream(t, e, i = this.range) {
    if (!this.core.TALibReady || !T(t) || !(t in this.TALib) || !(i instanceof Yi) || i.dataLength < this.definition.input.timePeriod)
      return !1;
    let s = this.TALib[t](e), r = i.dataLength, o = i.value(r)[0], l = [], c = 0;
    for (let f of this.definition.output)
      l[c++] = s[f.name][0];
    return [o, l];
  }
  newValue(t) {
    let e = this.TALibParams();
    if (!e)
      return !1;
    let i = this.calcIndicatorStream(this.libName, e);
    if (!i)
      return !1;
    this.overlay.data.push(i), this.target.setPosition(this.core.scrollPos, 0), this.draw(this.range);
  }
  updateValue(t) {
    let e = this.overlay.data.length - 1, i = this.TALibParams();
    if (!i)
      return !1;
    let s = this.calcIndicatorStream(this.libName, i);
    if (!s)
      return !1;
    this.overlay.data[e] = [s[0], s[1]], this.target.setPosition(this.core.scrollPos, 0), this.draw(this.range);
  }
  plot(t, e, i) {
    const s = this.scene.context, r = t;
    switch (s.save(), e) {
      case "renderLine":
        K[e](s, r, i);
        break;
      case "renderLineHorizontal":
        K[e](s, r[0], r[1], r[2], i);
        break;
      case "renderLineVertical":
        K[e](s, r[0], r[1], r[2], i);
        break;
      case "renderPathStroke":
        K[e](s, r, i.style, i);
        break;
      case "renderPathClosed":
        K[e](s, r, i);
        break;
      case "renderSpline":
        K[e](s, r, i);
        break;
      case "renderRect":
        K[e](s, r[0], r[1], r[2], r[3], i);
        break;
      case "renderRectRound":
        K[e](s, r[0], r[1], r[2], r[3], r[4], i);
        break;
      case "renderPolygonRegular":
        K[e](s, r[0], r[1], r[2], r[3], r[4], i);
        break;
      case "renderPolygonIrregular":
        K[e](s, r, i);
        break;
      case "renderTriangle":
        K[e](s, r[0], r[1], r[2], i);
        break;
      case "renderDiamond":
        K[e](s, r[0], r[1], r[2], r[3], i);
        break;
      case "renderCircle":
        K[e](s, r[0], r[1], r[2], i);
        break;
      case "renderImage":
        K[e](s, i.src, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
    }
    s.restore();
  }
  draw() {
  }
}
const Hh = {
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
      max: 1e5
    }
  }, {
    name: "nbDevUp",
    displayName: "Deviations up",
    defaultValue: 2,
    hint: "Deviation multiplier for upper band",
    type: "number",
    range: {
      min: -3e37,
      max: 3e37
    }
  }, {
    name: "nbDevDn",
    displayName: "Deviations down",
    defaultValue: 2,
    hint: "Deviation multiplier for lower band",
    type: "number",
    range: {
      min: -3e37,
      max: 3e37
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
}, Uh = {
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
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Bh = {
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
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, zh = {
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
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
};
class gs extends Dt {
  name = "Bollinger Bands";
  shortName = "BB";
  libName = "BBANDS";
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
    }
  };
  #t = {
    lowerStroke: "#08c",
    lowerLineWidth: "1",
    lowerLineDash: void 0,
    middleStroke: "#0080c088",
    middleLineWidth: "1",
    middleLineDash: void 0,
    upperStroke: "#08c",
    upperLineWidth: "1",
    upperLineDash: void 0,
    fillStyle: "#0080c044"
  };
  precision = 2;
  scaleOverlay = !1;
  plots = [
    { key: "BB_1", title: " ", type: "line" }
  ];
  static inCnt = 0;
  static primaryPane = !0;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, s, r, o);
    const l = o.overlay;
    this.id = o.overlay?.id || Q(this.shortName), this.defineIndicator(l?.settings, Hh), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return gs.primaryPane;
  }
  get defaultStyle() {
    return this.#t;
  }
  legendInputs(t = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const e = {};
    let i = [!1, !1, !1], { c: s, colours: r } = super.legendInputs(t);
    return e.Hi = this.scale.nicePrice(this.overlay.data[s][1][0]), e.Mid = this.scale.nicePrice(this.overlay.data[s][1][1]), e.Lo = this.scale.nicePrice(this.overlay.data[s][1][2]), r = [
      this.style.upperStroke,
      this.style.middleStroke,
      this.style.lowerStroke
    ], { inputs: e, colours: r, labels: i };
  }
  draw(t = this.range) {
    if (this.overlay.data.length < 2)
      return !1;
    this.scene.clear();
    const e = { lower: [], middle: [], upper: [] }, i = this.overlay.data, r = {
      w: this.xAxis.candleW
    };
    let o = t.value(t.indexStart)[0], l = this.overlay.data[0][0], c = (o - l) / t.interval, f = this.Timeline.rangeScrollOffset, p = t.Length + f + 2, x = {};
    for (; p; )
      c < 0 || c >= this.overlay.data.length ? (e.lower.push({ x: null, y: null }), e.middle.push({ x: null, y: null }), e.upper.push({ x: null, y: null })) : (r.x = this.xAxis.xPos(i[c][0]), r.y = this.yAxis.yPos(i[c][1][0]), e.lower.push({ ...r }), r.x = this.xAxis.xPos(i[c][0]), r.y = this.yAxis.yPos(i[c][1][1]), e.middle.push({ ...r }), r.x = this.xAxis.xPos(i[c][0]), r.y = this.yAxis.yPos(i[c][1][2]), e.upper.push({ ...r })), c++, p--;
    x = {
      width: this.style.lowerLineWidth,
      stroke: this.style.lowerStroke,
      dash: this.style.lowerLineDash
    }, this.plot(e.lower, "renderLine", x), x = {
      width: this.style.middleLineWidth,
      stroke: this.style.middleStroke,
      dash: this.style.middleLineDash
    }, this.plot(e.middle, "renderLine", x), x = {
      width: this.style.upperLineWidth,
      stroke: this.style.upperStroke,
      dash: this.style.upperLineDash
    }, this.plot(e.upper, "renderLine", x), this.target.viewport.render();
  }
}
class ui extends Dt {
  name = "Exponential Moving Average";
  shortName = "EMA";
  libName = "EMA";
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    }
  };
  #t = {
    stroke: "#C80",
    width: "1"
  };
  precision = 2;
  checkParamCount = !1;
  scaleOverlay = !1;
  plots = [
    { key: "EMA_1", title: "EMA: ", type: "line" }
  ];
  static inCnt = 0;
  static primaryPane = !0;
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ];
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, s, r, o), ui.inCnt++;
    const l = o.overlay;
    this.id = o.overlay?.id || Q(this.shortName), this.defineIndicator(l?.settings, Uh), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return ui.primaryPane;
  }
  get defaultStyle() {
    return this.#t;
  }
  updateLegend() {
    this.parent.legend.update();
  }
  legendInputs(t = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const e = {}, { c: i, colours: s } = super.legendInputs(t);
    return e.EMA_1 = this.scale.nicePrice(this.overlay.data[i][1]), { inputs: e, colours: s };
  }
  draw(t = this.range) {
    if (this.overlay.data.length < 2)
      return !1;
    this.scene.clear();
    const e = this.overlay.data, i = this.xAxis.candleW, s = [];
    this.xAxis.smoothScrollOffset;
    const r = {
      w: i
    };
    let o = this.Timeline.rangeScrollOffset, l = t.data.length - this.overlay.data.length, c = t.indexStart - l - 2, f = t.Length + o * 2 + 2;
    for (; f; )
      c < 0 || c >= this.overlay.data.length ? s.push({ x: null, y: null }) : (r.x = this.xAxis.xPos(e[c][0]), r.y = this.yAxis.yPos(e[c][1]), s.push({ ...r })), c++, f--;
    this.plot(s, "renderLine", this.style), this.target.viewport.render();
  }
}
class ps extends Dt {
  name = "Relative Strength Index";
  shortName = "RSI";
  libName = "RSI";
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    }
  };
  #t = {
    stroke: "#C80",
    width: "1",
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStroke: "#848",
    lowStroke: "#848",
    highLowRangeStyle: "#22002220"
  };
  checkParamCount = !1;
  plots = [
    { key: "RSI_1", title: " ", type: "line" }
  ];
  static inCnt = 0;
  static primaryPane = !1;
  static scale = jt[1];
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, s, r, o);
    const l = o.overlay;
    this.id = o.overlay?.id || Q(this.shortName), this.defineIndicator(l?.settings, Bh), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return ps.primaryPane;
  }
  get defaultStyle() {
    return this.#t;
  }
  legendInputs(t = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const e = {}, { c: i, colours: s } = super.legendInputs(t);
    return e.RSI_1 = this.scale.nicePrice(this.overlay.data[i][1]), { inputs: e, colours: s };
  }
  draw(t = this.range) {
    this.scene.clear();
    const e = this.scene.width + this.xAxis.bufferPx * 2, i = this.yAxis.yPos(this.style.defaultHigh), s = this.yAxis.yPos(this.style.defaultLow), r = [0, i, this.scene.width, s - i];
    let o = { fill: this.style.highLowRangeStyle };
    if (this.plot(r, "renderRect", o), r.length = 0, r[0] = { x: 0, y: i }, r[1] = { x: e, y: i }, o = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }, this.plot(r, "renderLine", o), r.length = 0, r[0] = { x: 0, y: s }, r[1] = { x: e, y: s }, o = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
      dash: [1, 1]
    }, this.plot(r, "renderLine", o), this.overlay.data.length < 2)
      return this.target.viewport.render(), !1;
    const l = this.overlay.data, c = this.xAxis.candleW;
    r.length = 0, this.Timeline.smoothScrollOffset;
    const f = {
      w: c
    };
    let p = this.Timeline.rangeScrollOffset, x = t.data.length - this.overlay.data.length, C = t.indexStart - x - 2, b = t.Length + p * 2 + 2;
    for (; b; )
      C < 0 || C >= this.overlay.data.length ? r.push({ x: null, y: null }) : (f.x = this.xAxis.xPos(l[C][0]), f.y = this.yAxis.yPos(l[C][1]), r.push({ ...f })), C++, b--;
    this.plot(r, "renderLine", this.style), this.target.viewport.render();
  }
}
class fi extends Dt {
  name = "Simple Moving Average";
  shortName = "SMA";
  libName = "SMA";
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    }
  };
  #t = {
    stroke: "#C80",
    width: "1"
  };
  #e = 2;
  primaryPane = !0;
  scaleOverlay = !1;
  plots = [
    { key: "SMA_1", title: "SMA: ", type: "line" }
  ];
  static inCnt = 0;
  static primaryPane = !0;
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ];
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, s, r, o), fi.inCnt++;
    const l = o.overlay;
    this.id = o.overlay?.id || Q(this.shortName), this.defineIndicator(l?.settings, zh), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return fi.primaryPane;
  }
  get defaultStyle() {
    return this.#t;
  }
  updateLegend() {
    this.parent.legend.update();
  }
  legendInputs(t = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const e = {}, { c: i, colours: s } = super.legendInputs(t);
    return e.SMA_1 = this.scale.nicePrice(this.overlay.data[i][1]), { inputs: e, colours: s };
  }
  draw(t = this.range) {
    if (this.overlay.data.length < 2)
      return !1;
    this.scene.clear();
    const e = this.overlay.data, i = this.xAxis.candleW, s = [];
    this.xAxis.smoothScrollOffset;
    const r = {
      w: i
    };
    let o = this.Timeline.rangeScrollOffset, l = t.data.length - this.overlay.data.length, c = t.indexStart - l - 2, f = t.Length + o * 2 + 2;
    for (; f; )
      c < 0 || c >= this.overlay.data.length ? s.push({ x: null, y: null }) : (r.x = this.xAxis.xPos(e[c][0]), r.y = this.yAxis.yPos(e[c][1]), s.push({ ...r })), c++, f--;
    this.plot(s, "renderLine", this.style), this.target.viewport.render();
  }
}
const dr = {
  BB: { id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: gs },
  EMA: { id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: ui },
  RSI: { id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: ps },
  SMA: { id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: fi }
};
class st extends HTMLElement {
  shadowRoot;
  template;
  id = Q(xe);
  doInit = !0;
  constructor(t, e = "open") {
    super(), this.template = t, this.shadowRoot = this.attachShadow({ mode: e });
  }
  destroy() {
  }
  connectedCallback() {
    this.doInit && (this.doInit = !1, this.shadowRoot.appendChild(this.template.content.cloneNode(!0)), this.style.display = "block");
  }
  disconnectedCallback() {
  }
  get width() {
    return this.offsetWidth;
  }
  set width(t) {
    this.setDim(t, "width");
  }
  get height() {
    return this.offsetHeight;
  }
  set height(t) {
    this.setDim(t, "height");
  }
  set cursor(t) {
    this.style.cursor = t;
  }
  get cursor() {
    return this.style.cursor;
  }
  setDim(t, e) {
    v(t) && (t += "px"), !(!["width", "height"].includes(e) || !T(t)) && (this.style[e] = t);
  }
}
class ur {
  #t;
  #e;
  #r;
  constructor(t) {
    this.#e = t, this.#t = this.#e.core, this.#r = this.#t.Chart;
  }
  get core() {
    return this.#t;
  }
  get chart() {
    return this.#r;
  }
  get parent() {
    return this.#e;
  }
  get theme() {
    return this.#t.theme;
  }
  get width() {
    return this.#r.width;
  }
  get height() {
    return this.#r.height;
  }
  get data() {
    return this.#r.data;
  }
  get range() {
    return this.#r.range;
  }
  get yDigits() {
    return this.#r.yAxisDigits;
  }
  float2Int(t) {
    return $o(t);
  }
  numDigits(t) {
    return Gn(t);
  }
  countDigits(t) {
    return No(t);
  }
  precision(t) {
    return Yn(t);
  }
}
class Wh extends ur {
  #t = 4;
  #e;
  #r = !0;
  constructor(t) {
    super(t);
  }
  get range() {
    return this.parent.range;
  }
  get width() {
    return this.parent.width;
  }
  get interval() {
    return this.range.interval;
  }
  get intervalStr() {
    return this.range.intervalStr;
  }
  get timeStart() {
    return this.range.timeStart;
  }
  get timeFinish() {
    return this.range.timeFinish;
  }
  get rangeDuration() {
    return this.range.rangeDuration;
  }
  get rangeLength() {
    return this.range.Length;
  }
  get indexStart() {
    return this.range.indexStart;
  }
  get indexEnd() {
    return this.range.indexEnd;
  }
  get timeMax() {
    return this.range.timeMax;
  }
  get timeMin() {
    return this.range.timeMin;
  }
  get candleW() {
    return J(this.width / this.range.Length);
  }
  get candlesOnLayer() {
    return J(this.core.Chart.layerWidth / this.candleW);
  }
  get xAxisRatio() {
    return this.width / this.range.rangeDuration;
  }
  set xAxisTicks(t) {
    this.#t = v(t) ? t : 0;
  }
  get xAxisTicks() {
    return this.#t;
  }
  get xAxisGrads() {
    return this.#e;
  }
  get scrollOffsetPx() {
    return this.core.scrollPos % this.candleW;
  }
  get bufferPx() {
    return this.core.bufferPx;
  }
  xPos(t) {
    return J(this.range.rangeIndex(t) * this.candleW + this.candleW * 0.5);
  }
  t2Index(t) {
    return this.range.rangeIndex(t);
  }
  t2Pixel(t) {
    return this.xPos(t);
  }
  pixel2T(t) {
    let e = this.pixel2Index(t);
    return this.range.value(e)[0];
  }
  pixel2Index(t) {
    t -= this.candleW / 2;
    let e = this.range.indexStart, i = J(t / this.candleW);
    return e + i;
  }
  pixelOHLCV(t) {
    let e = this.pixel2Index(t);
    return this.range.value(e);
  }
  xPosSnap2CandlePos(t) {
    let e = t % this.candleW, i = e ? this.candleW / 2 : 0;
    return J(t - e + i);
  }
  xPos2Time(t) {
    return this.pixel2T(t);
  }
  xPos2Index(t) {
    return this.pixel2Index(t);
  }
  xPosOHLCV(t) {
    return this.pixelOHLCV(t);
  }
  initXAxisGrads() {
    this.#e = this.calcXAxisGrads();
  }
  doCalcXAxisGrads(t) {
    this.#e = this.calcXAxisGrads(t);
  }
  calcXAxisGrads(t = this.range.snapshot()) {
    const e = {
      entries: {},
      values: [],
      major: [],
      minor: []
    }, i = ts(t.rangeDuration);
    e.units = i;
    for (let p in i)
      if (i[p] > 0) {
        e.units = [p, p], e.timeSpan = `${i[p]} ${p}`;
        break;
      }
    const s = t.interval, { xStep: r, rank: o } = this.xStep(t), l = this.pixel2T(this.width) + r;
    let c = t.timeMin - t.timeMin % r - r, f = c;
    for (; c < l; ) {
      let p = ii(c, "years"), x = ii(c, "months"), C = ii(c, "days");
      !(p in e.entries) && p >= f ? e.entries[p] = [this.dateTimeValue(p, s), this.t2Pixel(p), p, "major"] : !(x in e.entries) && x >= f ? e.entries[x] = [this.dateTimeValue(x, s), this.t2Pixel(x), x, "major"] : !(C in e.entries) && C >= f && (e.entries[C] = [this.dateTimeValue(C, s), this.t2Pixel(C), C, "major"]), e.entries[c] = [this.dateTimeValue(c, s), this.t2Pixel(c), c, "minor"], c += r;
    }
    return e.values = Object.values(e.entries), e;
  }
  xStep(t) {
    let e = sa, i = this.#r ? t.interval : 1, s = ve[0], r = J(this.width / t.Length), o = Fi[0], l = ve.indexOf(i);
    for (; l-- >= 0 && !(r * (ve[l] / i) >= e); )
      ;
    return s = ve[l], o = Fi[l], { xStep: s, rank: o };
  }
  dateTimeValue(t, e) {
    if (t / O % 1 === 0) {
      const i = os(t);
      return i === 1 ? as(t) === 0 ? Wn(t) : Bn(t) : i;
    } else
      return e < H || e < F ? Gi(t) : Vn(t);
  }
}
const Hi = {
  id: "time",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        resize: {
          target: "resize",
          action(n) {
          }
        },
        xAxis_scale: {
          target: "scale",
          action(n) {
          }
        },
        xAxis_inc: {
          target: "incremental",
          action(n) {
          }
        },
        xAxis_log: {
          target: "logarithmic",
          action(n) {
          }
        },
        xAxis_100: {
          target: "percentual",
          action(n) {
          }
        },
        chart_pan: {
          target: "chart_pan",
          action(n) {
          }
        }
      }
    },
    resize: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        someEvent: {
          target: "",
          action(n) {
          }
        }
      }
    },
    chart_pan: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        chart_pan: {
          target: "chart_pan",
          action(n) {
          }
        },
        chart_panDone: {
          target: "idle",
          action(n) {
          }
        }
      }
    }
  }
}, bn = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Mn = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, Pn = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, Ln = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, An = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class fr {
  #t = {
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
    isValid: !1
  };
  constructor(t) {
    this.#e(t), bn.test(t) && this.#r(t), Mn.test(t) && this.#s(t), Pn.test(t) && this.#i(t), Ln.test(t) && this.#n(t), An.test(t) && this.#o(t);
  }
  get value() {
    return this.#t;
  }
  get isValid() {
    return this.#t.isValid;
  }
  get hex() {
    return this.#t.hex.slice(0, -2);
  }
  get hexa() {
    return this.#t.hex;
  }
  #e(t) {
    if (Pa) {
      let e = document.getElementById("divValidColourTest");
      e || (e = document.createElement("div"), e.id = "divValidColourTest"), e.style.backgroundColor = "", e.style.backgroundColor = t, this.#t.isValid = !!e.style.backgroundColor.length;
    } else
      this.#t.isValid = !!(bn.test(t) || Mn.test(t) || Pn.test(t) || Ln.test(t) || An.test(t));
  }
  setHex(t) {
    let e = this.#t;
    [
      e.r16,
      e.g16,
      e.b16,
      e.a16
    ] = t, e.hex = "#" + e.r16 + e.g16 + e.b16 + e.a16;
  }
  setRGBA(t) {
    let e = this.#t;
    [
      e.r,
      e.g,
      e.b,
      e.a
    ] = t, e.rgb = `rgb(${t[0]},${t[1]},${t[2]})`, e.rgba = `rgb(${t[0]},${t[1]},${t[2]},${t[3]})`;
  }
  setHSLA(t) {
    let e = this.#t;
    [
      e.h,
      e.s,
      e.l,
      e.a
    ] = t, e.hsl = `hsl(${t[0]},${t[1]}%,${t[2]}%)`, e.hsla = `hsl(${t[0]},${t[1]}%,${t[2]}%,${t[3]})`;
  }
  #r(t) {
    this.#t.hex = t;
    let e = t.length, i;
    switch (e) {
      case 4:
        i = [`${t[1]}${t[1]}`, `${t[2]}${t[2]}`, `${t[3]}${t[3]}`, "ff"];
        break;
      case 7:
        i = [t.substr(1, 2), t.substr(3, 2), t.substr(5, 2), "ff"];
        break;
      case 9:
        i = [t.substr(1, 2), t.substr(3, 2), t.substr(5, 2), t.substr(7, 2)];
        break;
    }
    this.setHex(i), this.#u(i), this.#d(i);
  }
  #s(t) {
    this.#t.hsl = t;
  }
  #i(t) {
    this.#t.hsla = t;
  }
  #n(t) {
    this.#t.rgb = t, this.#v(rgba);
  }
  #o(t) {
    this.#t.rgba = t, this.#v(t);
  }
  #h(t) {
    let { r: e, g: i, b: s, a: r } = this.#f(t);
    return e.length == 1 && (e = "0" + e), i.length == 1 && (i = "0" + i), s.length == 1 && (s = "0" + s), r.length == 1 && (r = "0" + r), this.value.r = e, this.value.g = i, this.value.b = s, this.value.a = r, this.setHex([e, i, s, r]), this;
  }
  #l(t) {
    let { r: e, g: i, b: s, a: r } = this.#f(t);
    e = parseInt(e, 16) / 255, i = parseInt(i, 16) / 255, s = parseInt(s, 16) / 255, r = parseInt(r, 16) / 255;
    const o = Math.max(e, i, s), l = o - Math.min(e, i, s), c = l ? o === e ? (i - s) / l : o === i ? 2 + (s - e) / l : 4 + (e - i) / l : 0;
    let f = [
      (60 * c < 0 ? 60 * c + 360 : 60 * c).toString(),
      (100 * (l ? o <= 0.5 ? l / (2 * o - l) : l / (2 - (2 * o - l)) : 0)).toString(),
      (100 * (2 * o - l) / 2).toString(),
      r.toString()
    ];
    return this.setHSLA(f), this;
  }
  #a(t, e, i) {
    e /= 100, i /= 100;
    const s = (l) => (l + t / 30) % 12, r = e * Math.min(i, 1 - i), o = (l) => i - r * Math.max(-1, Math.min(s(l) - 3, Math.min(9 - s(l), 1)));
    return [255 * o(0), 255 * o(8), 255 * o(4)];
  }
  #c(t, e, i) {
    i /= 100;
    const s = e * Math.min(i, 1 - i) / 100, r = (o) => {
      const l = (o + t / 30) % 12, c = i - s * Math.max(Math.min(l - 3, 9 - l, 1), -1);
      return Math.round(255 * c).toString(16).padStart(2, "0");
    };
    return `#${r(0)}${r(8)}${r(4)}`;
  }
  #u(t) {
    T(t) && (t = /([a-f\d]{2})/ig.exec(t));
    var e = [
      parseInt(t[0], 16),
      parseInt(t[1], 16),
      parseInt(t[2], 16),
      parseInt(t[3], 16) / 255
    ];
    this.setRGBA(e);
  }
  #d(t) {
    T(t) && (t = /([a-f\d]{2})/ig.exec(t));
    let e = parseInt(t[0], 16), i = parseInt(t[1], 16), s = parseInt(t[2], 16), r = parseInt(t[3], 16);
    e /= 255, i /= 255, s /= 255, r /= 255, this.setHSLA([e, i, s, r]);
  }
  #f(t) {
    let e, i, s, r, o = this.#t;
    if (o.r && o.g && o.b && o.a)
      return { r: e, g: i, b: s, a: r } = { ...o };
    if (T(t)) {
      let l = t.indexOf(",") > -1 ? "," : " ";
      t = t.substr(4).split(")")[0].split(l);
    }
    if (M(t)) {
      if (t.length < 3 || t.length > 4)
        return !1;
      e = t[0], i = t[1], s = t[2], r = T(t[3]) ? t[3] : "";
    } else if (S(t))
      e = t.r, i = t.g, s = t.b, r = "a" in t ? t.a : "";
    else
      return !1;
    return { r: e, g: i, b: s, a: r };
  }
  #v(t) {
    let e, i, s = 0, r = [], o = [], l = t.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    l.shift();
    for (let c of l)
      i = c.indexOf("%") > -1, e = parseFloat(c), s < 3 && i ? e = Math.round(255 * e / 100) : s == 3 && (!i && e >= 0 && e <= 1 ? e = Math.round(255 * e) : i && e >= 0 && e <= 100 ? e = Math.round(255 * e / 100) : e = ""), r[s] = (e | 256).toString(16).slice(1), o[s++] = e;
    this.setHex(r), this.setRGBA(o), this.#d(this.#t.hex);
  }
}
class vs {
  static #t;
  #e;
  #r;
  #s;
  #i;
  #n = { w: 0, h: 0 };
  #o = { w: 0, h: 0, x: 0, y: 0 };
  #h = { x: !1, y: !0 };
  #l;
  #a = { x: 0, drag: !1 };
  #c;
  #u;
  constructor(t) {
    this.#e = vs.#t++, this.#r = t.core, this.#s = R.isElement(t.elContainer) ? t.elContainer : !1, this.#i = R.isElement(t.elHandle) ? t.elHandle : !1, this.#u = k(t.callback) ? t.callback : !1, R.isElement(this.#s) && R.isElement(this.#i) && (this.mount(), this.eventsListen());
  }
  set cursor(t) {
    this.#i.style.cursor = t;
  }
  get cursor() {
    return this.#i.style.cursor;
  }
  eventsListen() {
    this.#c = new Nt(this.#i, { disableContextMenu: !1 }), this.#c.on("mouseenter", Rt(this.onMouseEnter, 1, this, !0)), this.#c.on("mouseout", Rt(this.onMouseOut, 1, this, !0)), this.#c.on("drag", jo(this.onHandleDrag, 100, this)), this.#c.on("enddrag", this.onHandleDragDone.bind(this)), this.#c.on("mousedown", Rt(this.onMouseDown, 100, this, !0)), this.#c.on("mouseup", this.onMouseUp.bind(this));
  }
  on(t, e, i) {
    this.#r.on(t, e, i);
  }
  off(t, e) {
    this.#r.off(t, e);
  }
  emit(t, e) {
    this.#r.emit(t, e);
  }
  onMouseEnter() {
    const t = getComputedStyle(this.#i).backgroundColor;
    t && (this.colour = new fr(t), this.#i.style.backgroundColor = this.colour.hex);
  }
  onMouseOut() {
    this.#i.style.backgroundColor = this.colour.hexa;
  }
  onMouseDown() {
  }
  onMouseUp(t) {
    this.onHandleDragDone(t);
  }
  onHandleDrag(t) {
    this.#a.drag || (this.#a.drag = !0, this.#a.x = t.position.x), this.handlePos(t);
  }
  onHandleDragDone(t) {
    this.handlePos(t), this.#a.drag = !1;
  }
  mount() {
    this.#n.w = this.#s.getBoundingClientRect().width, this.#n.h = this.#s.getBoundingClientRect().height, this.#s.style.overflow = "hidden", this.#o.w = this.#i.getBoundingClientRect().width, this.#o.h = this.#i.getBoundingClientRect().height, this.#i.style.marginRight = 0, this.#i.style.position = "absolute";
  }
  handlePos(t) {
    let e = this.#r.range, i = parseInt(this.#i.style.marginLeft), s = this.#s.getBoundingClientRect().width, r = this.#i.getBoundingClientRect().width, o = s - r, l = t.position.x - this.#a.x, c = et(i + l, 0, o), f = (e.dataLength + e.limitFuture + e.limitPast) / s, p = Math.floor(c * f);
    this.setHandleDims(c, r), this.#r.jumpToIndex(p);
  }
  setHandleDims(t, e) {
    let i = this.#s.getBoundingClientRect().width;
    e = e || this.#i.getBoundingClientRect().width, t = t / i * 100, this.#i.style.marginLeft = `${t}%`, e = e / i * 100, this.#i.style.width = `${e}%`;
  }
}
let gr = class {
  constructor(t = {}) {
    this.container = t.container, this.layers = [], this.id = D.idCnt++, this.scene = new D.Scene(), this.setSize(t.width || 0, t.height || 0);
  }
  setSize(t, e) {
    return this.width = t, this.height = e, this.scene.setSize(t, e), this.layers.forEach(function(i) {
      i.setSize(t, e);
    }), this;
  }
  addLayer(t) {
    return this.layers.push(t), t.setSize(t.width || this.width, t.height || this.height), t.viewport = this, this;
  }
  getIntersection(t, e) {
    for (var i = this.layers, s = i.length, r = s - 1, o, l; r >= 0; ) {
      if (o = i[r], l = o.hit.getIntersection(t, e), l >= 0)
        return l;
      r--;
    }
    return -1;
  }
  get index() {
    let t = D.viewports, e, i = 0;
    for (e of t) {
      if (this.id === e.id)
        return i;
      i++;
    }
    return null;
  }
  destroy() {
    for (let t of this.layers)
      t.remove();
  }
  render(t = !1) {
    let e = this.scene, i = this.layers, s;
    e.clear();
    for (s of i)
      t && s.layers.length > 0 && s.render(t), s.visible && s.width > 0 && s.height > 0 && e.context.drawImage(
        s.scene.canvas,
        s.x,
        s.y,
        s.width,
        s.height
      );
  }
};
class Fh extends gr {
  constructor(t = {}) {
    super(t), t.container.innerHTML = "", t.container.appendChild(this.scene.canvas), D.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", D.viewports.splice(this.index, 1);
  }
}
class Vh {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  visible = !0;
  constructor(t = {}) {
    this.id = D.idCnt++, this.hit = new D.Hit({
      contextType: t.contextType
    }), this.scene = new D.Scene({
      contextType: t.contextType
    }), t.x && t.y && this.setPosition(t.x, t.y), t.width && t.height && this.setSize(t.width, t.height);
  }
  get index() {
    let t = this.viewport.layers;
    t.length;
    let e = 0, i;
    for (i of t) {
      if (this.id === i.id)
        return e;
      e++;
    }
    return null;
  }
  setPosition(t, e) {
    return this.x = t, this.y = e, this;
  }
  setSize(t, e) {
    return this.width = t, this.height = e, this.scene.setSize(t, e), this.hit.setSize(t, e), this;
  }
  move(t) {
    let e = this.index, i = this.viewport, s = i.layers;
    switch (t) {
      case "up":
        e < s.length - 1 && (s[e] = s[e + 1], s[e + 1] = this);
        break;
      case "down":
        e > 0 && (s[e] = s[e - 1], s[e - 1] = this);
        break;
      case "top":
        s.splice(e, 1), s.push(this);
        break;
      case "bottom":
        s.splice(e, 1), s.unshift(this);
        break;
    }
    return this;
  }
  moveUp() {
    return this.move("up");
  }
  moveDown() {
    return this.move("down");
  }
  moveTop() {
    return this.move("top");
  }
  moveBottom() {
    return this.move("bottom");
  }
  remove() {
    this.viewport.layers.splice(this.index, 1);
  }
}
class Gh {
  width = 0;
  height = 0;
  constructor(t) {
    t || (t = {}), this.id = D.idCnt++, this.contextType = t.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "scene-canvas", this.canvas.style.display = "block", this.context = this.canvas.getContext(this.contextType), t.width && t.height && this.setSize(t.width, t.height);
  }
  setSize(t, e) {
    return this.width = t, this.height = e, this.canvas.width = t * D.pixelRatio, this.canvas.style.width = `${t}px`, this.canvas.height = e * D.pixelRatio, this.canvas.style.height = `${e}px`, this.contextType === "2d" && D.pixelRatio !== 1 && this.context.scale(D.pixelRatio, D.pixelRatio), this;
  }
  clear() {
    let t = this.context;
    return this.contextType === "2d" ? t.clearRect(
      0,
      0,
      this.width * D.pixelRatio,
      this.height * D.pixelRatio
    ) : t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this;
  }
  toImage(t = "image/png", e, i) {
    let s = this, r = new Image(), o = this.canvas.toDataURL(t, e);
    r.onload = function() {
      r.width = s.width, r.height = s.height, i(r);
    }, r.src = o;
  }
  export(t, e, i = "image/png", s) {
    typeof e != "function" && (e = this.blobCallback.bind({ cfg: t })), this.canvas.toBlob(e, i, s);
  }
  blobCallback(t) {
    let e = document.createElement("a"), i = URL.createObjectURL(t), s = this.cfg.fileName || "canvas.png";
    e.setAttribute("href", i), e.setAttribute("target", "_blank"), e.setAttribute("export", s), document.createEvent ? Object.assign(document.createElement("a"), {
      href: i,
      target: "_blank",
      export: s
    }).click() : e.click && e.click();
  }
}
class Yh {
  width = 0;
  height = 0;
  constructor(t) {
    t || (t = {}), this.contextType = t.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "hit-canvas", this.canvas.style.display = "none", this.canvas.style.position = "relative", this.context = this.canvas.getContext(this.contextType, {
      preserveDrawingBuffer: !0,
      antialias: !1
    }), t.width && t.height && this.setSize(t.width, t.height);
  }
  setSize(t, e) {
    return this.width = t, this.height = e, this.canvas.width = t * D.pixelRatio, this.canvas.style.width = `${t}px`, this.canvas.height = e * D.pixelRatio, this.canvas.style.height = `${e}px`, this;
  }
  clear() {
    let t = this.context;
    return this.contextType === "2d" ? t.clearRect(
      0,
      0,
      this.width * D.pixelRatio,
      this.height * D.pixelRatio
    ) : t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this;
  }
  getIntersection(t, e) {
    let i = this.context, s;
    if (t = Math.round(t), e = Math.round(e), t < 0 || e < 0 || t > this.width || e > this.height)
      return -1;
    if (this.contextType === "2d") {
      if (s = i.getImageData(t, e, 1, 1).data, s[3] < 255)
        return -1;
    } else if (s = new Uint8Array(4), i.readPixels(
      t * D.pixelRatio,
      (this.height - e - 1) * D.pixelRatio,
      1,
      1,
      i.RGBA,
      i.UNSIGNED_BYTE,
      s
    ), s[0] === 255 && s[1] === 255 && s[2] === 255)
      return -1;
    return this.rgbToInt(s);
  }
  getColorFromIndex(t) {
    let e = this.intToRGB(t);
    return "rgb(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
  }
  rgbToInt(t) {
    let e = t[0], i = t[1], s = t[2];
    return (e << 16) + (i << 8) + s;
  }
  intToRGB(t) {
    let e = (t & 16711680) >> 16, i = (t & 65280) >> 8, s = t & 255;
    return [e, i, s];
  }
}
const D = {
  idCnt: 0,
  viewports: [],
  pixelRatio: window && window.devicePixelRatio || 1,
  Node: gr,
  Viewport: Fh,
  Layer: Vh,
  Scene: Gh,
  Hit: Yh
}, gi = D;
class qh {
  #t;
  #e;
  #r;
  #s;
  #i;
  constructor(t, e = []) {
    this.#r = t, this.#t = t.core, this.#s = new lt([...e]);
    for (const [i, s] of this.#s)
      this.addOverlay(i, s);
  }
  log(t) {
    this.#t.log(t);
  }
  info(t) {
    this.#t.info(t);
  }
  warn(t) {
    this.#t.warn(t);
  }
  error(t) {
    this.#t.error(t);
  }
  get core() {
    return this.#t;
  }
  get parent() {
    return this.#r;
  }
  get layerConfig() {
    return this.#r.layerConfig().layerConfig;
  }
  get list() {
    return this.#s;
  }
  get scale() {
    return this.#r.parent.scale;
  }
  get time() {
    return this.#r.parent.time;
  }
  start() {
    this.eventsListen();
  }
  destroy() {
    for (let t of this.#s.keys())
      this.removeOverlay(t);
    this.#s = null;
  }
  eventsListen() {
  }
  on(t, e, i) {
    this.#t.on(t, e, i);
  }
  off(t, e) {
    this.#t.off(t, e);
  }
  emit(t, e) {
    this.#t.emit(t, e);
  }
  get(t) {
    return this.#s.get(t);
  }
  addOverlays(t) {
    let e = [], i, s;
    for (let r of t)
      s = this.addOverlay(r[0], r[1]), i = s.instance?.id || r[0], e.push([i, s]);
    return e;
  }
  addOverlay(t, e) {
    try {
      const i = new gi.Layer(this.layerConfig);
      return this.parent.viewport.addLayer(i), e.layer = i, e.instance = new e.class(
        i,
        this.#r.TimeLine,
        this.#r.Scale,
        this.#t.theme,
        this,
        e.params
      ), T(e.instance?.id) || (e.instance.id = t), this.#s.set(e.instance.id, e), !0;
    } catch (i) {
      return console.error(`Error: Cannot instantiate ${t} overlay / indicator`), console.error(i), !1;
    }
  }
  removeOverlay(t) {
    this.#s.has(t) && (this.#s.get(t).layer.remove(), this.#s.delete(t));
  }
}
class mi extends Y {
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, s, r, o), this.params.axes = o?.axes || "both";
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw(t) {
    if (t = t || this.params.axes, this.scene.clear(), t == "none")
      return;
    const e = this.scene.context;
    if (e.save(), e.strokeStyle = this.core.theme.chart.GridColour || er.COLOUR_GRID, t != "y") {
      const s = this.xAxis.xAxisGrads.values;
      for (let r of s) {
        let o = J(r[1]);
        e.beginPath(), e.moveTo(o + 0, 0), e.lineTo(o + 0, this.scene.height), e.stroke();
      }
    }
    if (t != "x") {
      const i = this.yAxis.yAxisGrads;
      for (let s of i) {
        let r = this.yAxis.$2Pixel(s[0]);
        e.beginPath(), e.moveTo(0, r), e.lineTo(this.scene.width, r), e.stroke();
      }
    }
    e.restore(), this.doDraw = !1;
  }
  drawX() {
    this.draw("x");
  }
}
class Qi extends Y {
  #t = [0, 0];
  #e = !0;
  #r;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e = !1, i = !1, s, r, o), this.core.on("chart_pan", (l) => {
      this.onMouseDragX(l);
    }), this.core.on("chart_panDone", (l) => {
      this.onMouseDragX(l);
    }), this.core.on("main_mousemove", (l) => {
      this.onMouseMoveX(l);
    }), this.#r = new Nt(this.target.viewport.container, { disableContextMenu: !1 }), this.#r.on("pointermove", this.onMouseMove.bind(this)), this.#r.on("pointerenter", this.onMouseMove.bind(this));
  }
  set position(t) {
  }
  get update() {
    return this.#e;
  }
  onMouseDragX(t) {
    this.#t[0] = t[0], this.#t[1] = t[1], this.draw(!0), this.core.emit("chart_render");
  }
  onMouseMoveX(t) {
    this.#t[0] = t[0], this.draw(), this.core.emit("chart_render");
  }
  onMouseMove(t) {
    const e = S(t) ? t.position.x : t[0], i = S(t) ? t.position.y : t[1];
    this.#t[0] = e, this.#t[1] = i, this.draw(), this.core.emit("chart_render");
  }
  draw(t = !1) {
    const e = this.target.viewport.container.getBoundingClientRect();
    let i = this.core.mousePos.y - e.top, s = this.core.mousePos.x - e.left;
    t || (s = this.xAxis.xPosSnap2CandlePos(s) + this.xAxis.scrollOffsetPx), this.scene.clear();
    const r = this.scene.context;
    r.save(), r.setLineDash([5, 5]);
    const o = this.xAxis.smoothScrollOffset || 0;
    r.strokeStyle = "#666", r.beginPath(), r.moveTo(s + o, 0), r.lineTo(s + o, this.scene.height), r.stroke(), this.chart.cursorActive && (r.beginPath(), r.moveTo(0, i), r.lineTo(this.scene.width, i), r.stroke()), r.restore();
  }
}
const Xh = [
  ["grid", { class: mi, fixed: !0 }],
  ["cursor", { class: Qi, fixed: !0 }]
];
class ne {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h;
  #l;
  #a;
  constructor(t, e, i, s = !1) {
    this.#s = t, this.#t = t.core, this.#e = this.core.config, this.#r = this.core.theme, this.#o = this.#s.element, this.#l = e, this.createViewport(i, s);
  }
  get parent() {
    return this.#s;
  }
  get core() {
    return this.#t;
  }
  get config() {
    return this.#e;
  }
  set width(t) {
    this.setWidth(t);
  }
  get width() {
    return this.#o.getBoundingClientRect().width;
  }
  set height(t) {
    this.setHeight(t);
  }
  get height() {
    return this.#o.getBoundingClientRect().height;
  }
  get dimensions() {
    return R.elementDimPos(this.#o);
  }
  set layerWidth(t) {
    this.#a = t;
  }
  get layerWidth() {
    return this.#a;
  }
  get stateMachine() {
    return this.#s.stateMachine;
  }
  set state(t) {
    this.#t.setState(t);
  }
  get state() {
    return this.#t.getState();
  }
  get data() {
    return this.#t.chartData;
  }
  get range() {
    return this.#t.range;
  }
  get stream() {
    return this.#t.stream;
  }
  get TimeLine() {
    return this.#t.TimeLine;
  }
  get xAxis() {
    return this.#t.TimeLine.xAxis;
  }
  get Scale() {
    return this.#s.Scale;
  }
  get yAxis() {
    return this.#s.Scale.yAxis;
  }
  get viewport() {
    return this.#i;
  }
  get overlays() {
    return this.#n;
  }
  destroy() {
    this.#n.destroy(), this.#i.destroy();
  }
  setSize(t, e, i) {
    const s = this.#n.list;
    this.#i.setSize(t, e);
    for (let [r, o] of s)
      o.layer.setSize(i, e);
  }
  createViewport(t = [], e = !1) {
    t = t.length == 0 ? it(Xh) : t;
    const { width: i, height: s } = this.layerConfig();
    let r = e ? gi.Node : gi.Viewport;
    this.#i = new r({
      width: i,
      height: s,
      container: this.#l
    }), this.#h = this.#i.scene.canvas, this.#n = new qh(this, t);
  }
  layerConfig() {
    const t = this.config?.buffer || yi, e = this.#l.getBoundingClientRect().width, i = this.#l.getBoundingClientRect().height;
    this.layerWidth = Math.round(e * ((100 + t) * 0.01));
    const s = {
      width: this.layerWidth,
      height: i
    };
    return { width: e, height: i, layerConfig: s };
  }
  addOverlays(t) {
    return this.#n.addOverlays(t);
  }
  addOverlay(t, e) {
    return this.#n.addOverlay(t, e);
  }
  removeOverlay(t) {
    return this.#n.removeOverlay(t);
  }
  draw(t = this.range, e = !1) {
    const i = this.#n.list;
    if (!(i instanceof lt))
      return !1;
    for (let [s, r] of i)
      !S(r) || !k(r?.instance?.draw) || (r.instance.draw(), r.fixed || (r.instance.position = [this.#t.scrollPos, 0]));
  }
  render() {
    this.#i.render();
  }
}
class jh extends Y {
  #t = [0, 0];
  #e;
  constructor(t, e = !1, i = !1, s, r, o) {
    e = r.time.xAxis, super(t, e, i, s, r);
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw(t) {
    this.scene.clear();
    const e = this.scene.context, i = this.xAxis.xAxisGrads.values, s = 0, r = this.theme.xAxis, o = G(r.tickMarker) ? r.tickMarker : !0;
    e.save(), e.strokeStyle = r.colourTick, e.fillStyle = r.colourTick, e.font = `${r.fontWeight} ${r.fontSize}px ${r.fontFamily}`;
    for (let l of i) {
      let c = J(l[1]), f = Math.floor(e.measureText(`${l[0]}`).width * 0.5);
      e.fillText(l[0], c - f + s, this.xAxis.xAxisTicks + 12), o && (e.beginPath(), e.moveTo(c + s, 0), e.lineTo(c + s, this.xAxis.xAxisTicks), e.stroke());
    }
    e.restore();
  }
}
class Zh extends Y {
  #t = [0, 0];
  #e;
  constructor(t, e = !1, i = !1, s, r, o) {
    e = r.time.xAxis, super(t, e, i, s, r);
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw() {
    this.scene.clear();
    const t = this.scene.context;
    this.xAxis.xAxisGrads.values, this.theme.xAxis, t.save(), t.restore();
  }
}
class Kh extends Y {
  #t = [0, 0];
  constructor(t, e = !1, i = !1, s, r) {
    e = r.time.xAxis, super(t, e, i, s, r), this.viewport = t.viewport;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw() {
    const t = this.scene.context, e = this.target.viewport.container.getBoundingClientRect(), i = this.core.mousePos.x - e.left;
    let s = this.xAxis.xPos2Time(i), r = new Date(s), o = r.toUTCString(), l = {
      fontSize: this.theme.xAxis.fontSize * 1.05,
      fontWeight: this.theme.xAxis.fontWeight,
      fontFamily: this.theme.xAxis.fontFamily,
      txtCol: this.theme.xAxis.colourCursor,
      bakCol: this.theme.xAxis.colourCursorBG,
      paddingTop: 5,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4
    }, c = wi(t, o, l), f = i + this.core.bufferPx;
    f = this.xAxis.xPosSnap2CandlePos(f), f = f - Math.round(c * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), t.save(), Le(t, o, f, 1, l), t.restore();
  }
}
const Qh = [
  ["labels", { class: jh, fixed: !1, required: !0 }],
  ["overlay", { class: Zh, fixed: !1, required: !0 }],
  ["cursor", { class: Kh, fixed: !1, required: !0 }]
];
class Jh {
  #t;
  #e = "Timeline";
  #r = "time";
  #s;
  #i;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
  #u;
  #d = new lt();
  #f;
  #v;
  #y;
  #m;
  #x;
  #p;
  #S;
  #P;
  #g;
  #C;
  #b;
  #I = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  constructor(t, e) {
    this.#n = t, this.#s = e, this.#i = e.elements.elTime, this.#o = t.Chart, this.#h = new Wh(this, this.#o), this.init();
  }
  log(t) {
    this.#n.log(t);
  }
  info(t) {
    this.#n.info(t);
  }
  warn(t) {
    this.#n.warn(t);
  }
  error(t) {
    this.#n.error(t);
  }
  set id(t) {
    this.#t = String(t).replace(/ |,|;|:|\.|#/g, "_");
  }
  get id() {
    return this.#t ? `${this.#t}` : `${this.#n.id}-${this.#r}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#r;
  }
  get options() {
    return this.#s;
  }
  get core() {
    return this.#n;
  }
  get element() {
    return this.#i;
  }
  get elViewport() {
    return this.#a;
  }
  get height() {
    return this.#i.getBoundingClientRect().height;
  }
  set width(t) {
    this.setWidth(t);
  }
  get width() {
    return this.#i.getBoundingClientRect().width;
  }
  get xAxis() {
    return this.#h;
  }
  get xAxisWidth() {
    return this.#h.width;
  }
  get xAxisRatio() {
    return this.#h.xAxisRatio;
  }
  get layerLabels() {
    return this.#S;
  }
  get layerOverlays() {
    return this.#P;
  }
  get xAxisGrads() {
    return this.#h.xAxisGrads;
  }
  get candleW() {
    return this.#h.candleW;
  }
  get candlesOnLayer() {
    return this.#h.candlesOnLayer;
  }
  get theme() {
    return this.#n.theme;
  }
  get config() {
    return this.#n.config;
  }
  get graph() {
    return this.#u;
  }
  get navigation() {
    return this.#f;
  }
  get range() {
    return this.#n.range;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#i);
  }
  get bufferPx() {
    return this.#n.bufferPx;
  }
  get scrollPos() {
    return this.#n.scrollPos;
  }
  get scrollOffsetPx() {
    return this.#n.scrollPos % this.candleW;
  }
  get smoothScrollOffset() {
    return this.#n.smoothScrollOffset;
  }
  get rangeScrollOffset() {
    return this.#n.rangeScrollOffset;
  }
  set stateMachine(t) {
    this.#l = new kt(t, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get time() {
    return this;
  }
  init() {
    const t = this.#i;
    this.#a = t.viewport, this.#c = t.overview, this.#v = t.overview.icons, this.#y = t.overview.scrollBar, this.#m = t.overview.handle, this.#x = t.overview.rwdStart, this.#p = t.overview.fwdEnd;
    const e = {
      core: this.#n,
      elContainer: this.#y,
      elHandle: this.#m,
      callback: null
    };
    this.#b = new vs(e), this.#n.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(t) {
    this.#i.style.width = `${t}px`, this.#a.style.width = `${t}px`;
  }
  setDimensions(t) {
    const e = this.config.buffer || yi, i = t.w, s = this.height, r = Math.round(i * ((100 + e) * 0.01));
    this.#u.setSize(i, s, r), this.draw();
  }
  navigationDisplay(t) {
    G(t) && (this.#c.style = "display: none;");
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#h.initXAxisGrads(), this.draw(), this.eventsListen(), Hi.id = this.id, Hi.context = this, this.stateMachine = Hi, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#u.destroy(), this.#C.destroy(), this.off("main_mousemove", this.drawCursorTime), this.off("setRange", this.onSetRange), this.#p.removeEventListener("click", Rt), this.#x.removeEventListener("click", Rt), this.element.remove();
  }
  eventsListen() {
    let t = this.#u.viewport.scene.canvas;
    this.#C = new Nt(t, { disableContextMenu: !1 }), this.#C.on("dblclick", this.onDoubleClick.bind(this)), this.#C.on("pointerenter", this.onPointerEnter.bind(this)), this.#C.on("pointerdrag", this.onPointerDrag.bind(this)), this.on("main_mousemove", this.#g.draw, this.#g), this.on("setRange", this.onSetRange, this), this.#p.addEventListener("click", Rt(this.onMouseClick, 1e3, this, !0)), this.#x.addEventListener("click", Rt(this.onMouseClick, 1e3, this, !0));
  }
  on(t, e, i) {
    this.#n.on(t, e, i);
  }
  off(t, e) {
    this.#n.off(t, e);
  }
  emit(t, e) {
    this.#n.emit(t, e);
  }
  onMouseClick(t) {
    switch (t?.currentTarget?.id || t.target.parentElement.id) {
      case "fwdEnd":
        this.onFwdEnd();
        break;
      case "rwdStart":
        this.onRwdStart();
        break;
    }
  }
  onPointerEnter(t) {
    t.domEvent.target.style.cursor = "ew-resize";
  }
  onPointerDrag(t) {
    let e = this.range, i = e.indexStart - t.movement.x, s = e.indexEnd;
    e.set(i, s);
  }
  onDoubleClick(t) {
    this.core.jumpToEnd(), this.core.MainPane.draw(void 0, !0);
  }
  onFwdEnd() {
    this.core.jumpToEnd(), this.core.MainPane.draw(void 0, !0);
  }
  onRwdStart() {
    this.core.jumpToStart(), this.core.MainPane.draw(void 0, !0);
  }
  onSetRange() {
    let t = this.range, e = t.indexStart;
    t.indexEnd;
    let i = this.#y.getBoundingClientRect().width, s = t.dataLength + t.limitFuture + t.limitPast, r = i / s, o = t.Length * r, l = (e + t.limitPast) * r;
    this.#b.setHandleDims(l, o);
  }
  t2Index(t) {
    return this.#h.t2Index(t);
  }
  xPos(t) {
    return this.#h.xPos(t);
  }
  xPosSnap2CandlePos(t) {
    return this.#h.xPosSnap2CandlePos(t);
  }
  xPos2Time(t) {
    return this.#h.xPos2Time(t);
  }
  xPos2Index(t) {
    return this.#h.xPos2Index(t);
  }
  xPosOHLCV(t) {
    return this.#h.xPosOHLCV(t);
  }
  createGraph() {
    let t = it(Qh);
    this.#u = new ne(this, this.#a, t, !1), this.#g = this.graph.overlays.get("cursor").instance, this.#S = this.graph.overlays.get("labels").instance, this.#P = this.graph.overlays.get("overlay").instance;
  }
  addOverlays(t) {
    for (let e of t)
      ;
    this.graph.addOverlays(Array.from(this.#d));
  }
  render() {
    this.#u.render();
  }
  draw(t = this.range, e = !0) {
    this.#u.draw(t, e);
  }
  hideCursorTime() {
    this.#g.visible = !1, this.render();
  }
  showCursorTime() {
    this.#g.visible = !0, this.render();
  }
}
const tl = {
  renderQ: new lt(),
  rendered: [],
  renderLog: !1,
  dropFrames: !0,
  graphs: [],
  range: {},
  init: function(n) {
    S(n) && (this.renderLog = n?.renderLog || !1, this.dropFrames = n?.dropFrames || !0, this.graphs = M(n?.graphs) ? [...n.graphs] : [], this.range = S(n?.range) ? n.range : {});
  },
  queueFrame: function(n = this.range, t = this.graphs, e = !1) {
    this.renderQ.size > 1 && this.dropFrames && this.dropFrame();
    const i = Date.now();
    return n = n.snapshot(), this.renderQ.set(i, { graphs: t, range: n, update: e }), i;
  },
  dropFrame: function(n = -1) {
    n === -1 && (n = this.renderQ.lastKey()), this.renderQ.size > 1 && this.renderQ.has(n) && this.renderQ.delete(n);
  },
  getFrame: function(n = 0) {
    return this.renderQ.has(n) ? this.renderQ.get(n) : this.renderQ.firstValue();
  },
  frameDone: function() {
    if (this.renderQ.size === 0)
      return;
    const n = this.renderQ.firstKey();
    this.renderLog && this.rendered.push([n, Date.now()]), this.renderQ.delete(n);
  },
  start: function() {
    requestAnimationFrame(this.execute.bind(this));
  },
  execute: function() {
    if (requestAnimationFrame(this.execute.bind(this)), this.renderQ.size === 0)
      return;
    const [n, t] = this.renderQ.firstEntry();
    if (t.range?.snapshot) {
      for (let e of t.graphs)
        k(e.draw) && e.draw(t.range, t.update);
      for (let e of t.graphs)
        k(e.render) && e.render();
      this.frameDone();
    }
  }
}, Qe = tl, On = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select"
];
class el {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  constructor(t, e) {
    this.#t = t, this.#e = {}, this.#r = e, this.#s = e.core, this.#i = e.core.theme.legend, this.eventsListen();
  }
  get elTarget() {
    return this.#t;
  }
  get list() {
    return this.#e;
  }
  destroy() {
    this.#s.off("chart_pan", this.primaryPanePan), this.#s.off("chart_panDone", this.primaryPanePanDone);
    for (let t in this.#e)
      this.remove(t);
    this.#t.remove();
  }
  eventsListen() {
    this.#s.on("chart_pan", this.primaryPanePan.bind(this)), this.#s.on("chart_panDone", this.primaryPanePanDone.bind(this));
  }
  onMouseClick(t) {
    const e = (i) => T(i.dataset.icon) ? { id: i.id, icon: i.dataset.icon } : i.parentElement.className !== "controls" ? e(i.parentElement) : !1;
    return e(t);
  }
  onMouseOver(t) {
  }
  primaryPanePan() {
    for (let t of On)
      this.#t.style.setProperty(t, "none");
  }
  primaryPanePanDone() {
    for (let t of On)
      this.#t.style.removeProperty(t);
  }
  add(t) {
    if (!S(t) || !("title" in t))
      return !1;
    let e;
    const i = () => {
      this.#s.error("ERROR: Legend parent missing!");
    };
    t.id = t?.id || Q("legend"), t.type = t?.type || "overlay", t.parent = t?.parent || i;
    const s = this.elTarget.buildLegend(t, this.#s.theme);
    this.#t.legends.insertAdjacentHTML("beforeend", s);
    const r = this.#t.legends.querySelector(`#legend_${t.id}`);
    this.#o = r.querySelectorAll(".control"), this.#e[t.id] = {
      el: r,
      type: t.type,
      source: t?.source,
      click: []
    };
    for (let o of this.#o) {
      let l = o.querySelector("svg");
      l.style.width = `${this.#i.controlsW}px`, l.style.height = `${this.#i.controlsH}px`, l.style.fill = `${this.#i.controlsColour}`, l.onpointerover = (c) => c.currentTarget.style.fill = this.#i.controlsOver, l.onpointerout = (c) => c.currentTarget.style.fill = this.#i.controlsColour, e = t.parent.onLegendAction.bind(t.parent), this.#e[t.id].click.push({ el: o, click: e }), o.addEventListener("click", e);
    }
    return t.id;
  }
  remove(t) {
    if (!(t in this.#e) || this.#e[t].type === "chart")
      return !1;
    this.#e[t].el.remove();
    for (let e of this.#e[t].click)
      e.el.removeEventListener("click", e.click);
    return delete this.#e[t], !0;
  }
  update(t, e) {
    if (!S(e) || !(t in this.#e))
      return !1;
    let i = this.#e[t].source(e.pos);
    const s = this.#t.buildInputs(i);
    this.#t.legends.querySelector(`#legend_${t} dl`).innerHTML = s;
  }
}
const Ui = {
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(n) {
        this.context.origin.cursor = "crosshair";
      },
      onExit(n) {
      },
      on: {
        xAxis_scale: {
          target: "xAxis_scale",
          action(n) {
          }
        },
        chart_yAxisRedraw: {
          target: "chart_yAxisRedraw",
          action(n) {
          }
        },
        chart_tool: {
          target: "chart_tool",
          action(n) {
          }
        },
        tool_activated: {
          target: "tool_activated",
          action(n) {
            this.context.origin.cursor = "default";
          }
        }
      }
    },
    xAxis_scale: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        Idle: {
          target: "idle",
          action(n) {
          }
        }
      }
    },
    chart_yAxisRedraw: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        always: {
          target: "idle",
          condition: "yAxisRedraw",
          action(n) {
            this.context.origin.drawGrid();
          }
        }
      }
    },
    tool_activated: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        tool_targetSelected: {
          target: "idle",
          condition: "toolSelectedThis",
          action(n) {
            console.log("tool_targetSelected:", n);
          }
        }
      }
    }
  },
  guards: {
    priceMaxMin() {
      return !0;
    },
    toolSelectedThis(n, t) {
      return this.eventData === this.context;
    },
    yAxisRedraw() {
      return !0;
    },
    zoomDone() {
      return !0;
    }
  }
};
class il extends ur {
  #t;
  #e;
  #r;
  #s;
  #i = jt[0];
  #n = "automatic";
  #o = {
    automatic: {
      get max() {
        return this.range?.valueMax;
      },
      get min() {
        return this.range?.valueMin;
      },
      get mid() {
        return this.range?.valueMin + this.range?.valueDiff * 0.5;
      },
      get diff() {
        return this.range?.valueDiff;
      },
      get zoom() {
        return 1;
      },
      get offset() {
        return 0;
      },
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
  };
  #h = 1.04;
  #l = Fs;
  #a = ia;
  #c = 3;
  #u;
  #d;
  constructor(t, e, i = jt[0], s) {
    super(t), this.#r = e, this.#e = t, this.#t = t.parent, this.yAxisType = i, s = s || this.core.range, this.#o.automatic.range = s, this.#d = new Proxy(s, {
      get: (r, o) => {
        const l = this.#n, c = this.#o;
        switch (o) {
          case "max":
            return c[l][o];
          case "min":
            return c[l][o];
          case "mid":
            return c[l][o];
          case "diff":
            return c[l][o];
          case "zoom":
            return c[l][o];
          case "offset":
            return c[l][o];
          default:
            return r[o];
        }
      }
    });
  }
  get chart() {
    return this.#r;
  }
  get range() {
    return this.#d;
  }
  get height() {
    return this.chart.height;
  }
  get rangeH() {
    return this.#d.diff * this.yAxisPadding;
  }
  get yAxisRatio() {
    return this.getYAxisRatio();
  }
  get yAxisPrecision() {
    return this.yAxisCalcPrecision;
  }
  set yAxisPadding(t) {
    this.#h = t;
  }
  get yAxisPadding() {
    return this.#h;
  }
  set yAxisType(t) {
    this.#i = jt.includes(t) ? t : jt[0];
  }
  get yAxisType() {
    return this.#i;
  }
  set yAxisStep(t) {
    this.#l = v(t) ? t : Fs;
  }
  get yAxisStep() {
    return this.#l;
  }
  set yAxisTicks(t) {
    this.#c = v(t) ? t : 0;
  }
  get yAxisTicks() {
    return this.#c;
  }
  get yAxisGrads() {
    return this.#u;
  }
  set mode(t) {
    this.setMode(t);
  }
  get mode() {
    return this.#n;
  }
  set offset(t) {
    this.setOffset(t);
  }
  get offset() {
    return this.#d.offset;
  }
  set zoom(t) {
    this.setZoom(t);
  }
  get zoom() {
    return this.#d.zoom;
  }
  getYAxisRatio() {
    return this.height / this.#d.diff;
  }
  yAxisRangeBounds() {
  }
  yAxisLog() {
  }
  yAxisCntDigits(t) {
    return this.countDigits(t);
  }
  yAxisCalcPrecision() {
    let t = this.numDigits(this.#d.max);
    return this.yDigits - t;
  }
  yAxisCursor() {
  }
  yPos(t) {
    switch (this.yAxisType) {
      case "percent":
        return J(this.p100toPixel(t));
      case "log":
        return J(this.$2Pixel(Ho(t)));
      default:
        return J(this.$2Pixel(t));
    }
  }
  yPos2Price(t) {
    return this.pixel2$(t);
  }
  $2Pixel(t) {
    const e = t - this.#d.min;
    return this.height - e * this.yAxisRatio;
  }
  lastYData2Pixel(t) {
    let e = t - this.core.stream.lastPriceMin;
    return this.height - e * this.yAxisRatio;
  }
  pixel2$(t) {
    let e = (this.height - t) / this.height, i = this.#d.diff * e;
    return this.#d.min + i;
  }
  p100toPixel(t) {
    let e = this.height / this.#d.diff;
    return (t - this.#d.max) * -1 * e;
  }
  yAxisTransform() {
  }
  setMode(t) {
    if (!["automatic", "manual"].includes(t))
      return !1;
    const e = this.#o;
    return this.mode == "automatic" && t == "manual" ? (e.manual.zoom = 0, e.manual.max = this.#d.valueMax, e.manual.min = this.#d.valueMin, this.#n = t) : this.mode == "manual" && t == "automatic" && (e.manual.zoom = 0, this.#n = t), !0;
  }
  setOffset(t) {
    if (!v(t) || t == 0 || this.#n !== "manual")
      return !1;
    const e = this.#o;
    let i = this.pixel2$(t * -1), s = this.pixel2$(this.height - t), r = i - s;
    e.manual.min = s, e.manual.max = i, e.manual.mid = r / 2, e.manual.diff = r, e.manual.zoom = 0;
  }
  setZoom(t) {
    if (!v(t) || this.#n !== "manual")
      return !1;
    const e = this.#o;
    let i = e.manual.min, s = e.manual.max;
    const r = s - i, o = r * 0.01, l = t * o;
    i -= l, s += l, !(s < i || i <= 1 / 0 * -1 || s >= 1 / 0) && (e.manual.max = s, e.manual.min = i, e.manual.mid = r / 2, e.manual.diff = r, e.manual.zoom = l, this.calcGradations());
  }
  calcGradations() {
    let t, e, i;
    switch (this.yAxisType) {
      case "percent":
        t = this.#d.max > 0 ? this.#d.max : 100, e = this.#d.min > 0 ? this.#d.min : 0, i = this.#d.offset, this.#u = this.gradations(t + i, e + i);
        break;
      default:
        t = this.#d.max > 0 ? this.#d.max : 1, e = this.#d.min > 0 ? this.#d.min : 0, i = this.#d.offset, this.#u = this.gradations(t + i, e + i);
        break;
    }
    return this.#u;
  }
  gradations(t, e, i = !0, s = !1) {
    let r, o, l;
    const c = [];
    o = t - e, o = this.rangeH > 0 ? this.rangeH : 1, l = o / (this.height / (this.core.theme.yAxis.fontSize * 1.75));
    let f = Math.pow(10, Math.ceil(Math.log10(l)));
    l < 0.25 * f ? f = 0.25 * f : l < 0.5 * f && (f = 0.5 * f);
    var p = Math.ceil(e / f) * f, x = Math.floor(t / f) * f;
    let C = this.height, b = (x - p) / f, A = this.height / b, _ = this.countDigits(b), q;
    for (var bt = p; bt <= x; bt += f)
      r = this.countDigits(bt), q = this.niceValue(r, i, _), c.push([q, _i(C), r]), C -= A;
    return c;
  }
  niceValue(t, e = !0, i) {
    if (t.integers) {
      let s = i.integers;
      if (s - 2 > 0) {
        let r = Uo(10, s - 2);
        return Math.floor(t.value / r) * r;
      } else
        return e ? (s = s > 0 ? s : s * -1, _i(t.value, s)) : Math.floor(t.value);
    } else {
      let s = t.decimals - i.decimals;
      return s = s > 0 ? s : s * -1, _i(t.value, s);
    }
  }
  limitPrecision(t) {
    let e = t.value, i = this.#a - t.total, s = 4 - t.integers;
    if (i < 1) {
      let r = et(t.decimals + i, 0, 100);
      e = Number.parseFloat(e).toFixed(r);
    } else if (s < 1) {
      let r = 2 - s;
      e = Number.parseFloat(e).toFixed(r);
    }
    return e;
  }
}
const sl = {
  id: "scale",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(n) {
        this.context.origin.cursor = "ns-resize";
      },
      onExit(n) {
      },
      on: {
        resize: {
          target: "resize",
          action(n) {
          }
        },
        yAxis_scale: {
          target: "scale",
          action(n) {
          }
        },
        yAxis_inc: {
          target: "incremental",
          action(n) {
          }
        },
        yAxis_log: {
          target: "logarithmic",
          action(n) {
          }
        },
        yAxis_100: {
          target: "percentual",
          action(n) {
          }
        },
        setRange: {
          target: "setRange",
          action(n) {
          }
        }
      }
    },
    resize: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        someEvent: {
          target: "",
          action(n) {
          }
        }
      }
    },
    setRange: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        always: {
          target: "idle",
          condition: "zoomDone",
          action(n) {
            this.context.origin.draw();
          }
        }
      }
    }
  },
  guards: {
    receiver() {
      return this.eventData.scale.id == this.context.origin.id;
    },
    zoomDone() {
      return !0;
    }
  }
};
class nl extends Y {
  #t = [0, 0];
  constructor(t, e, i, s, r, o) {
    r = i, i = i.yAxis, super(t, e, i, s, r, o), this.viewport = t.viewport;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw() {
    if (!this.parent.parent.cursorActive)
      return;
    const t = this.target.viewport.container.getBoundingClientRect();
    let e = this.core.mousePos.y - t.top, i = this.parent.yPos2Price(e), s = this.parent.nicePrice(i), r = {
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
    }, o = r.fontSize + r.paddingTop + r.paddingBottom, l = e - o * 0.5;
    const c = this.scene.context;
    this.scene.clear(), c.save(), c.fillStyle = r.bakCol, c.fillRect(1, l, this.width, o), Le(c, `${s}`, 1, l, r), c.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
class rl extends Y {
  constructor(t, e, i, s, r, o) {
    r = i, i = i.yAxis, super(t, e, i, s, r, o), this.viewport = t.viewport;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw() {
    const t = this.scene.context, e = this.yAxis, i = this.yAxis.calcGradations() || [], s = this.theme.yAxis, r = G(s.tickMarker) ? s.tickMarker : !0;
    let o = [], l;
    switch (s?.location) {
      case "left":
        o = [this.width, this.width - e.yAxisTicks];
        break;
      case "right":
      default:
        o = [1, e.yAxisTicks];
        break;
    }
    this.scene.clear(), t.save(), t.strokeStyle = s.colourTick, t.fillStyle = s.colourTick, t.font = `${s.fontWeight} ${s.fontSize}px ${s.fontFamily}`;
    for (let c of i)
      l = e.$2Pixel(c[0]), t.fillText(c[0], e.yAxisTicks + 5, l + s.fontSize * 0.3), r && (t.beginPath(), t.moveTo(o[0], l), t.lineTo(o[1], l), t.stroke());
    t.restore();
  }
}
class ol extends Y {
  constructor(t, e, i, s, r, o) {
    r = i, i = i.yAxis, super(t, e, i, s, r, o), this.viewport = t.viewport;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw() {
    const t = this.scene.context;
    this.yAxis.yAxis, this.scene.clear(), t.save(), t.restore();
  }
}
class al extends Y {
  constructor(t, e, i, s, r, o) {
    r = i, i = i.yAxis, super(t, e, i, s, r, o), this.viewport = t.viewport;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw(t) {
    if (t === void 0)
      return;
    const e = this.scene.context, i = this.core.stream instanceof Kt && this.config.stream.tfCountDown;
    let s = t[4], r = this.parent.nicePrice(s), o = {
      fontSize: ft.FONTSIZE * 1.05,
      fontWeight: ft.FONTWEIGHT,
      fontFamily: ft.FONTFAMILY,
      txtCol: "#FFFFFF",
      bakCol: ft.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }, l = 0, c = Ei(o), f = this.parent.yPos(s) - c * 0.5;
    this.scene.clear(), e.save(), t[4] >= t[1] ? o.bakCol = this.theme.candle.UpBodyColour : o.bakCol = this.theme.candle.DnBodyColour, Le(e, r, l, f, o), i && (r = this.core.stream.countDownUpdate(), o.fontSize = o?.fontSize / 1.1, Le(e, r, l, f + c, o)), e.restore(), this.viewport.render();
  }
}
const hl = [
  ["labels", { class: rl, fixed: !0, required: !0 }],
  ["overlay", { class: ol, fixed: !0, required: !0 }],
  ["price", { class: al, fixed: !0, required: !0 }],
  ["cursor", { class: nl, fixed: !0, required: !0 }]
];
class ll {
  #t;
  #e = "Y Scale Axis";
  #r = "scale";
  #s;
  #i;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
  #u;
  #d;
  #f;
  #v;
  #y;
  #m = new lt();
  #x;
  #p;
  #S;
  #P;
  #g = {};
  constructor(t, e) {
    this.#s = t, this.#i = { ...e }, this.#c = this.#i.elScale, this.#h = this.#i.chart, this.#n = this.#i.parent, this.id = `${this.#n.id}_scale`, this.init();
  }
  log(t) {
    this.#s.log(t);
  }
  info(t) {
    this.#s.info(t);
  }
  warn(t) {
    this.#s.warn(t);
  }
  error(t) {
    this.#s.error(t);
  }
  set id(t) {
    this.#t = String(t).replace(/ |,|;|:|\.|#/g, "_");
  }
  get id() {
    return this.#t ? `${this.#t}` : `${this.#s.id}-${this.#r}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#r;
  }
  get core() {
    return this.#s;
  }
  get options() {
    return this.#i;
  }
  get parent() {
    return this.#n;
  }
  set height(t) {
    this.setHeight(t);
  }
  get height() {
    return this.#c.getBoundingClientRect().height;
  }
  get width() {
    return this.#c.getBoundingClientRect().width;
  }
  get element() {
    return this.#c;
  }
  set cursor(t) {
    this.#c.style.cursor = t;
  }
  get cursor() {
    return this.#c.style.cursor;
  }
  get layerCursor() {
    return this.#y;
  }
  get layerLabels() {
    return this.#d;
  }
  get layerOverlays() {
    return this.#f;
  }
  get layerPriceLine() {
    return this.#v;
  }
  get yAxis() {
    return this.#a;
  }
  set yAxisType(t) {
    this.#a.yAxisType = YAXIS_TYPES.includes(t) ? t : YAXIS_TYPES[0];
  }
  get yAxisType() {
    return this.#a.yAxisType;
  }
  get yAxisHeight() {
    return this.#a.height;
  }
  get yAxisRatio() {
    return this.#a.yAxisRatio;
  }
  get yAxisGrads() {
    return this.#a.yAxisGrads;
  }
  set graph(t) {
    this.#x = t;
  }
  get graph() {
    return this.#x;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#c);
  }
  get theme() {
    return this.#s.theme;
  }
  get config() {
    return this.#s.config;
  }
  set scaleRange(t) {
    this.setScaleRange(t);
  }
  set rangeMode(t) {
    this.#a.mode = t;
  }
  get rangeMode() {
    return this.#a.mode;
  }
  set rangeYFactor(t) {
    this.core.range.yFactor(t);
  }
  set yOffset(t) {
    this.#a.offset = t;
  }
  get yOffset() {
    return this.#a.offset;
  }
  set stateMachine(t) {
    this.#o = new kt(t, this);
  }
  get stateMachine() {
    return this.#o;
  }
  get Scale() {
    return this;
  }
  init() {
    this.#u = this.#c.viewport || this.#c;
  }
  start() {
    const t = this.#n.name == "Chart" ? void 0 : this.#n.localRange;
    this.#a = new il(this, this, this.options.yAxisType, t), this.createGraph(), this.addOverlays([]), this.#a.calcGradations(), this.draw(), this.eventsListen();
    const e = it(sl);
    e.id = this.id, e.context = this, this.stateMachine = e, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#x.destroy(), this.#p.destroy(), this.off(`${this.#n.id}_mousemove`, this.onMouseMove), this.off(`${this.#n.id}_mouseout`, this.#y.erase), this.off(Et, this.onStreamUpdate), this.element.remove();
  }
  eventsListen() {
    let t = this.#x.viewport.scene.canvas;
    this.#p = new Nt(t, { disableContextMenu: !1 }), this.#p.setCursor("ns-resize"), this.#p.on("pointerdrag", this.onDrag.bind(this)), this.#p.on("pointerdragend", this.onDragDone.bind(this)), this.#p.on("wheel", this.onMouseWheel.bind(this)), this.#p.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.#n.id}_mousemove`, this.onMouseMove, this), this.on(`${this.#n.id}_mouseout`, this.#y.erase, this.#y), this.on(Et, this.#v.draw, this.#v);
  }
  on(t, e, i) {
    this.core.on(t, e, i);
  }
  off(t, e) {
    this.core.off(t, e);
  }
  emit(t, e) {
    this.core.emit(t, e);
  }
  onResize(t) {
    this.setDimensions(t);
  }
  onMouseMove(t) {
    this.#P = M(t) ? t : [Math.floor(t.position.x), Math.floor(t.position.y)], this.#y.draw(this.#P);
  }
  onDrag(t) {
    this.#P = [
      Math.floor(t.position.x),
      Math.floor(t.position.y),
      t.dragstart.x,
      t.dragstart.y,
      t.movement.x,
      t.movement.y
    ], this.setScaleRange(Math.sign(t.movement.y)), this.render();
  }
  onDragDone(t) {
  }
  onMouseWheel(t) {
    t.domEvent.preventDefault(), this.setScaleRange(Math.sign(t.wheeldelta) * -1), this.render();
  }
  onStreamUpdate(t) {
  }
  onChartDrag(t) {
    this.#a.mode === "manual" && (this.#a.offset = t.domEvent.srcEvent.movementY, this.parent.draw(this.range, !0), this.draw());
  }
  setHeight(t) {
    this.#c.style.height = `${t}px`;
  }
  setDimensions(t) {
    const e = this.#c.getBoundingClientRect().width;
    this.setHeight(t.h), this.graph instanceof ne && (this.#x.setSize(e, t.h, e), this.draw());
  }
  setScaleRange(t = 0) {
    this.#a.mode == "automatic" && (this.#a.mode = "manual"), this.#a.zoom = t, this.parent.draw(this.range, !0), this.draw();
  }
  resetScaleRange() {
    this.#a.mode = "automatic", this.parent.draw(this.range, !0), this.draw();
  }
  yPos(t) {
    return this.#a.yPos(t);
  }
  yPosStream(t) {
    return this.#a.lastYData2Pixel(t);
  }
  yPos2Price(t) {
    return this.#a.yPos2Price(t);
  }
  nicePrice(t) {
    let e = this.#a.countDigits(t);
    return this.#a.limitPrecision(e);
  }
  createGraph() {
    let t = it(hl);
    this.graph = new ne(this, this.#u, t, !1), this.#y = this.graph.overlays.get("cursor").instance, this.#d = this.graph.overlays.get("labels").instance, this.#f = this.graph.overlays.get("overlay").instance, this.#v = this.graph.overlays.get("price").instance;
  }
  addOverlays(t) {
    for (let e of t)
      ;
    this.graph.addOverlays(Array.from(this.#m));
  }
  render() {
    this.#x.render();
  }
  draw(t = this.range, e = !0) {
    this.#x.draw(t, e), this.#n.drawGrid();
  }
  resize(t = this.width, e = this.height) {
    this.setDimensions({ w: t, h: e });
  }
}
class cl {
  constructor(t, e) {
    this.scene = t, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = e;
  }
  draw(t) {
    const e = this.ctx, s = t.raw[4] >= t.raw[1] ? this.cfg.volume.UpColour : this.cfg.volume.DnColour;
    e.save(), e.strokeStyle = s, e.fillStyle = s, e.fillRect(
      Math.floor(t.x),
      Math.floor(t.z - t.h),
      Math.floor(t.w),
      Math.floor(t.h)
    ), e.restore();
  }
}
class dl extends Y {
  #t;
  #e;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e = !1, i = !1, s, r, o), this.#t = new cl(t.scene, s), this.theme.volume.Height = et(s?.volume?.Height, 0, 100) || 100;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw(t = this.core.range) {
    this.scene.clear();
    const e = t.data, i = this.scene.height, s = this.xAxis.smoothScrollOffset || 0;
    let r = Math.max(this.xAxis.candleW - 1, 1);
    r < 3 ? r = 1 : r < 5 ? r = 3 : r > 5 && (r = Math.ceil(r * 0.8));
    const o = {
      x: 0 + s - this.xAxis.candleW,
      w: r,
      z: i
    }, l = Math.floor(i * this.theme.volume.Height / 100);
    let c = this.core.rangeScrollOffset, f = t.indexStart - c, p = t.Length + c * 2, x = p, C = f, b, A = 0;
    for (; x--; )
      b = t.value(C), b[4] !== null && (A = b[5] > A ? b[5] : A), C++;
    for (; p--; )
      b = t.value(f), o.x = J(this.xAxis.xPos(b[0]) - r / 2), b[4] !== null && (o.h = l - l * ((A - b[5]) / A), o.raw = e[f], this.#t.draw(o)), f++;
  }
}
class mr {
  areaCoordinates = [];
  constructor(t, e) {
    this.scene = t, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = e;
  }
  draw(t) {
    const e = this.ctx, i = t.raw[4] >= t.raw[1], s = i ? this.cfg.candle.UpBodyColour : this.cfg.candle.DnBodyColour, r = i ? this.cfg.candle.UpWickColour : this.cfg.candle.DnWickColour;
    switch (this.cfg.candle.Type) {
      case V.CANDLE_SOLID:
        this.fill = !0;
        break;
      case V.CANDLE_HOLLOW:
      case V.OHLC:
        this.fill = !1;
        break;
      case V.CANDLE_UP_HOLLOW:
        this.fill = !i;
        break;
      case V.CANDLE_DOWN_HOLLOW:
        this.fill = i;
    }
    let o = Math.max(t.w - 1, 1);
    o < 3 ? o = 1 : o < 5 ? o = 3 : o > 5 && (o = Math.ceil(o * 0.8));
    let l = Math.max(Math.floor(o * 0.5), 1), c = Math.abs(t.o - t.c), f = t.c === t.o ? 1 : 2, p = t.x, x = Math.floor(p) - 0.5;
    if (e.save(), e.strokeStyle = r, e.beginPath(), e.moveTo(x, Math.floor(t.h)), this.cfg.candle.Type === V.OHLC ? e.lineTo(x, Math.floor(t.l)) : i ? (e.lineTo(x, Math.floor(t.c)), e.moveTo(x, Math.floor(t.o))) : (e.lineTo(x, Math.floor(t.o)), e.moveTo(x, Math.floor(t.c))), e.lineTo(x, Math.floor(t.l)), e.stroke(), o == 3) {
      e.fillStyle = r;
      let C = i ? 1 : -1;
      e.rect(
        Math.floor(p - l),
        t.c,
        Math.floor(l * 2),
        C * Math.max(c, f)
      ), e.fill(), e.stroke();
    } else if (o > 3 && this.fill) {
      e.fillStyle = s;
      let C = i ? 1 : -1;
      e.rect(
        Math.floor(p - l),
        t.c,
        Math.floor(l * 2),
        C * Math.max(c, f)
      ), e.fill(), e.stroke();
    } else if (o > 3 && !this.fill && this.cfg.candle.Type !== V.OHLC) {
      let C = i ? 1 : -1;
      e.rect(
        Math.floor(p - l),
        t.c,
        Math.floor(l * 2),
        C * Math.max(c, f)
      ), e.stroke();
    } else
      this.cfg.candle.Type === V.OHLC ? (e.beginPath(), e.moveTo(x - l, t.o), e.lineTo(x, t.o), e.moveTo(x, t.c), e.lineTo(x + l, t.c), e.stroke()) : (e.strokeStyle = r, e.beginPath(), e.moveTo(
        x,
        Math.floor(Math.min(t.o, t.c))
      ), e.lineTo(
        x,
        Math.floor(Math.max(t.o, t.c)) + (t.o === t.c ? 1 : 0)
      ), e.stroke());
    e.restore();
  }
  body(t) {
  }
  area(t) {
    this.areaCoordinates.push(t);
  }
  areaRender() {
    const t = this.areaCoordinates;
    if (!M(t) || t.length == 0)
      return;
    let e = this.ctx, i = this.cfg.candle, s;
    Math.max(t[0].w - 1, 1), t[0].x;
    let r = [t[0].x, t[0].h];
    e.save(), e.strokeStyle = i.AreaLineColour || i.UpBodyColour || i.DnBodyColour, e.lineWidth = 1, e.beginPath(), e.moveTo(t[0].x, t[0].h);
    let o = 0;
    for (; o < t.length; )
      e.lineTo(t[o].x, t[o].h), o++;
    if (i?.Type == "area") {
      if (s = e.createLinearGradient(0, 0, 0, this.scene.height), M(i.AreaFillColour))
        for (let [l, c] of i.AreaFillColour.entries())
          s.addColorStop(l, c);
      else
        T() ? s = i.AreaFillColour : s = i.UpBodyColour || i.DnBodyColour;
      e.stroke(), e.lineTo(t[o - 1].x, this.scene.height), e.lineTo(r[0], this.scene.height), e.fillStyle = s, e.closePath(), e.fill();
    } else
      e.stroke();
    e.restore(), t.length = 0;
  }
}
class pr extends Y {
  #t;
  constructor(t, e = !1, i = !1, s, r) {
    super(t, e = !1, i = !1, s, r), this.#t = new mr(t.scene, s);
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw(t = this.core.range) {
    this.scene.clear();
    let e, i = this.theme.candle.Type;
    switch (i) {
      case V.AREA:
      case V.LINE:
        e = (p) => {
          this.#t.area({ ...p });
        };
        break;
      default:
        e = (p) => {
          this.#t.draw(p);
        };
        break;
    }
    const r = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let o = this.core.rangeScrollOffset, l = t.indexStart - o, c = t.Length + o * 2, f;
    for (this.core.stream && (this.core.stream.lastPriceMax = t.valueMax, this.core.stream.lastPriceMin = t.valueMin); c; ) {
      if (f = t.value(l), r.x = this.xAxis.xPos(f[0]), f?.[7]) {
        this.core.stream.lastXPos = r.x, this.core.stream.lastYPos = {
          o: r.o,
          h: r.h,
          l: r.l,
          c: r.c
        };
        break;
      }
      f[4] !== null && (r.o = this.yAxis.yPos(f[1]), r.h = this.yAxis.yPos(f[2]), r.l = this.yAxis.yPos(f[3]), r.c = this.yAxis.yPos(f[4]), r.raw = f, e(r)), l++, c--;
    }
    (i === V.AREA || i === V.LINE) && this.#t.areaRender();
  }
}
class ul extends Y {
  #t;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e = !1, i = !1, s, r, o), this.#t = new mr(t.scene, s), this.theme.priceLineStyle = this.theme?.priceLineStyle || yh;
  }
  set position(t) {
    this.setPosition(t[0], t[1]);
  }
  setPosition(t, e) {
    this.core.stream !== void 0 && (this.target.setPosition(t, e), this.core.stream.lastScrollPos = this.core.scrollPos);
  }
  draw() {
    if (this.core.stream === void 0 || !M(this.chart.streamCandle))
      return;
    this.scene.clear();
    const t = this.core.range, e = this.chart.streamCandle, i = this.theme.candle.Type === V.AREA || this.theme.candle.Type === V.LINE ? (o) => {
      this.areaRender(o);
    } : (o) => {
      this.#t.draw(o);
    };
    this.xAxis.smoothScrollOffset;
    const r = {
      x: this.core.stream.lastXPos,
      w: this.xAxis.candleW
    };
    r.o = this.yAxis.yPos(e[1]), r.h = this.yAxis.yPos(e[2]), r.l = this.yAxis.yPos(e[3]), r.c = this.yAxis.yPos(e[4]), r.raw = e, t.inRenderRange(e[0]) && i(r), e[4] >= e[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, cr(
      this.scene.context,
      r.c,
      0,
      this.target.width,
      this.theme.priceLineStyle
    );
  }
  areaRender(t) {
    const e = this.core.range, i = e.value(e.data.length - 2);
    if (i === null)
      return;
    const s = {
      x: this.xAxis.xPos(i[0]),
      o: this.yAxis.yPos(i[1]),
      h: this.yAxis.yPos(i[2]),
      l: this.yAxis.yPos(i[3]),
      c: this.yAxis.yPos(i[4])
    }, r = this.scene.context, o = this.theme, l = o.candle.UpBodyColour || o.candle.DnBodyColour;
    Math.max(t.w - 1, 1), t.x;
    let c;
    if (r.save(), r.fillStyle = l, r.strokeStyle = l, r.lineWidth = 1, r.beginPath(), r.moveTo(t.x, t.c), r.lineTo(s.x, s.h), o.candle.Type === V.AREA) {
      if (c = r.createLinearGradient(0, 0, 0, this.scene.height), M(o.candle.AreaFillColour))
        for (let [f, p] of o.candle.AreaFillColour.entries())
          c.addColorStop(f, p);
      else
        isString() ? c = o.candle.AreaFillColour : c = o.candle.UpBodyColour || o.candle.DnBodyColour;
      r.stroke(), r.lineTo(s.x, this.scene.height), r.lineTo(t.x, this.scene.height), r.fillStyle = c, r.closePath(), r.fill();
    } else
      r.stroke();
    r.restore();
  }
}
class fl extends Y {
  constructor(t, e = !1, i = !1, s, r) {
    super(t, e = !1, i = !1, s, r);
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw(t = this.core.range) {
    this.scene.clear();
  }
}
const Je = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: B.FONTFAMILY,
  COLOUR: "#181818"
};
class gl extends Y {
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, s, r, o), this.params.content = o?.content || "";
  }
  set position(t) {
    this.target.setPosition(0, 0);
  }
  draw() {
    let t = T(this.config?.watermark?.text), e = T(this.config?.watermark?.imgURL);
    if (!t && !e)
      return;
    this.scene.clear();
    const i = this.scene.context;
    i.save(), t ? this.renderText() : e && this.renderImage(), i.restore();
  }
  renderText() {
    const t = this.core.config?.watermark?.fontSize, e = this.core.config?.watermark?.fontWeight, i = this.core.config?.watermark?.fontFamily, s = this.core.config?.watermark?.textColour, r = {
      fontSize: t || Je.FONTSIZE,
      fontWeight: e || Je.FONTWEIGHT,
      fontFamily: i || Je.FONTFAMILY,
      txtCol: s || Je.COLOUR
    }, o = this.config.watermark.text, l = this.scene.context;
    l.font = Re(r?.fontSize, r?.fontWeight, r?.fontFamily), l.textBaseline = "top", l.fillStyle = r.txtCol;
    const c = Ei(r), f = wi(l, o, r), p = (this.scene.width - f) / 2, x = (this.scene.height - c) / 2;
    l.fillText(o, p, x);
  }
  renderImage() {
    this.scene.context;
  }
}
const ml = {
  primaryPane: [
    ["watermark", { class: gl, fixed: !0, required: !0, params: { content: null } }],
    ["grid", { class: mi, fixed: !0, required: !0, params: { axes: "y" } }],
    ["volume", { class: dl, fixed: !1, required: !0, params: { maxVolumeH: ni.ONCHART_VOLUME_HEIGHT } }],
    ["candles", { class: pr, fixed: !1, required: !0 }],
    ["stream", { class: ul, fixed: !1, required: !0 }],
    ["cursor", { class: Qi, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: mi, fixed: !0, required: !0, params: { axes: "y" } }],
    ["cursor", { class: Qi, fixed: !0, required: !0 }]
  ]
}, In = {
  primaryPane: {
    trades: { class: fl, fixed: !1, required: !1 }
  },
  secondaryPane: {
    candles: { class: pr, fixed: !1, required: !0 }
  }
}, yt = {
  id: "chart",
  title: "",
  type: "chart",
  source: () => {
  }
};
class Ae {
  static #t = 0;
  static get cnt() {
    return Ae.#t++;
  }
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h;
  #l;
  #a;
  #c;
  #u = "idle";
  #d;
  #f;
  #v;
  #y;
  #m;
  #x;
  #p;
  #S;
  #P;
  #g;
  #C;
  #b = new lt();
  #I = new lt();
  #E = [0, 0];
  #T = !1;
  #R;
  #M;
  #w;
  #D = {
    valueMax: 100,
    valueMin: 0,
    valueDiff: 100
  };
  #O = {};
  constructor(t, e) {
    if (this.#n = t, this.#a = Ae.cnt, !S(e))
      return;
    this.#o = { ...e }, this.#r = this.#o.name, this.#s = this.#o.shortName, this.#i = this.#o.title, this.#c = this.#o.type == "primary" ? "primaryPane" : "secondaryPane", this.#g = this.#o.view, this.#f = this.#o.elements.elScale, this.#h = this.#o.parent, this.#d = this.#o.elements.elTarget, this.#d.id = this.id, this.legend = new el(this.elLegend, this), this.isPrimary ? (yt.type = "chart", yt.title = this.title, yt.parent = this, yt.source = this.legendInputs.bind(this), this.legend.add(yt), this.yAxisType = "default") : (yt.type = "secondary", yt.title = "", yt.parent = this, yt.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(yt), this.yAxisType = this.core.indicatorClasses[e.view[0].type].ind.scale);
    const i = { ...e };
    i.parent = this, i.chart = this, i.elScale = this.elScale, i.yAxisType = this.yAxisType, this.scale = new ll(this.core, i), this.#u = "init", this.log(`${this.name} instantiated`);
  }
  log(t) {
    this.core.log(t);
  }
  info(t) {
    this.core.info(t);
  }
  warn(t) {
    this.core.warn(t);
  }
  error(t) {
    this.core.error(t);
  }
  set id(t) {
    this.#e = String(t).replace(/ |,|;|:|\.|#/g, "_");
  }
  get id() {
    return this.#e ? `${this.#e}` : `${this.#n.id}-${this.#r}_${this.#a}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#r;
  }
  get shortName() {
    return this.#s;
  }
  get title() {
    return this.#i;
  }
  get parent() {
    return this.#h;
  }
  get core() {
    return this.#n;
  }
  get type() {
    return this.#c;
  }
  get status() {
    return this.#u;
  }
  get isPrimary() {
    return this.#c === "primaryPane";
  }
  get isPrimary() {
    return this.#o.view.primary || !1;
  }
  get options() {
    return this.#o;
  }
  get element() {
    return this.#d;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#d);
  }
  set width(t) {
    this.setWidth(t);
  }
  get width() {
    return this.#d.getBoundingClientRect().width;
  }
  set height(t) {
    this.setHeight(t);
  }
  get height() {
    return this.#d.getBoundingClientRect().height;
  }
  get data() {
  }
  get range() {
    return this.#n.range;
  }
  get localRange() {
    return this.#D;
  }
  get stream() {
    return this.#S;
  }
  get streamCandle() {
    return this.#P;
  }
  set cursor(t) {
    this.element.style.cursor = t;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#E;
  }
  set cursorActive(t) {
    this.#T = t;
  }
  get cursorActive() {
    return this.#T;
  }
  get cursorClick() {
    return this.#R;
  }
  get candleW() {
    return this.#n.Timeline.candleW;
  }
  get theme() {
    return this.#n.theme;
  }
  get config() {
    return this.#n.config;
  }
  get scrollPos() {
    return this.#n.scrollPos;
  }
  get bufferPx() {
    return this.#n.bufferPx;
  }
  get elCanvas() {
    return this.#m.viewport.scene.canvas;
  }
  get elScale() {
    return this.#f;
  }
  get elLegend() {
    return this.#d.legend;
  }
  get elViewport() {
    return this.#d.viewport;
  }
  set layerWidth(t) {
    this.#m.layerWidth = t;
  }
  get layerWidth() {
    return this.#m.layerWidth;
  }
  set legend(t) {
    this.#x = t;
  }
  get legend() {
    return this.#x;
  }
  set time(t) {
    this.#y = t;
  }
  get time() {
    return this.#y;
  }
  set scale(t) {
    this.#v = t;
  }
  get scale() {
    return this.#v;
  }
  set yAxisType(t) {
    this.setYAxisType(t);
  }
  get yAxisType() {
    return this.#w;
  }
  get axes() {
    return "x";
  }
  set graph(t) {
    this.#m = t;
  }
  get graph() {
    return this.#m;
  }
  get view() {
    return this.#g;
  }
  get viewport() {
    return this.#m.viewport;
  }
  get layerGrid() {
    return this.#m.overlays.get("grid").layer;
  }
  get overlays() {
    return this.getOverlays();
  }
  get overlayGrid() {
    return this.#m.overlays.get("grid").instance;
  }
  get overlayTools() {
    return this.#I;
  }
  get overlaysDefault() {
    return ml[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#O;
  }
  set stateMachine(t) {
    this.#l = new kt(t, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get Divider() {
    return this.#p;
  }
  get siblingPrev() {
    return this.sibling("prev");
  }
  get siblingNext() {
    return this.sibling("next");
  }
  start() {
    this.#y = this.#n.Timeline, this.createGraph(), this.#v.start(), this.draw(this.range), this.cursor = "crosshair", Ui.id = this.id, Ui.context = this, this.stateMachine = Ui, this.stateMachine.start(), this.eventsListen();
    const t = { chartPane: this };
    this.#p = this.core.WidgetsG.insert("Divider", t), this.#p.start(), this.#u = "running";
  }
  destroy() {
    if (this.#u !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.stateMachine.destroy(), this.Divider.destroy(), this.#v.destroy(), this.#m.destroy(), this.#M.destroy(), this.legend.destroy(), this.off("main_mousemove", this.onMouseMove), this.off(we, this.onStreamListening), this.off(be, this.onStreamNewValue), this.off(Et, this.onStreamUpdate), this.off(Ce, this.onStreamNewValue), this.off(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.off("chart_yAxisRedraw", this.onYAxisRedraw), this.element.remove(), this.#u = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting chart pane: ${this.id}`), this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#M = new Nt(this.#d, { disableContextMenu: !1 }), this.#M.on("pointerdrag", this.onChartDrag.bind(this)), this.#M.on("pointerdragend", this.onChartDragDone.bind(this)), this.#M.on("pointermove", this.onMouseMove.bind(this)), this.#M.on("pointerenter", this.onMouseEnter.bind(this)), this.#M.on("pointerout", this.onMouseOut.bind(this)), this.#M.on("pointerdown", this.onMouseDown.bind(this)), this.#M.on("pointerup", this.onMouseUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on(we, this.onStreamListening, this), this.on(be, this.onStreamNewValue, this), this.on(Et, this.onStreamUpdate, this), this.on(Ce, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
  }
  on(t, e, i) {
    this.#n.on(t, e, i);
  }
  off(t, e) {
    this.#n.off(t, e);
  }
  emit(t, e) {
    this.#n.emit(t, e);
  }
  onChartDrag(t) {
    this.cursor = "grab", this.core.MainPane.onChartDrag(t), this.scale.onChartDrag(t);
  }
  onChartDragDone(t) {
    this.cursor = "crosshair", this.core.MainPane.onChartDragDone(t);
  }
  onMouseMove(t) {
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#E = [Math.round(t.position.x), Math.round(t.position.y)], this.#v.onMouseMove(this.#E), this.emit(`${this.id}_mousemove`, this.#E);
  }
  onMouseEnter(t) {
    this.core.MainPane.onPointerActive(this), this.#E = [Math.round(t.position.x), Math.round(t.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_mouseenter`, this.#E);
  }
  onMouseOut(t) {
    this.#T = !1, this.#E = [Math.round(t.position.x), Math.round(t.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_mouseout`, this.#E);
  }
  onMouseDown(t) {
    this.#n.pointerButtons[t.domEvent.srcEvent.button] = !0, this.#R = [Math.floor(t.position.x), Math.floor(t.position.y)], this.stateMachine.state === "tool_activated" && this.emit("tool_targetSelected", { target: this, position: t });
  }
  onMouseUp(t) {
    this.#n.pointerButtons[t.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(t) {
    this.#S !== t && (this.#S = t);
  }
  onStreamNewValue(t) {
    this.draw(this.range, !0);
  }
  onStreamUpdate(t) {
    this.isPrimary ? (this.#P = t, this.chartStreamCandle.draw(), this.layerStream.setPosition(this.core.stream.lastScrollPos, 0), this.updateLegends(this.cursorPos, t)) : this.updateLegends(), this.graph.render();
  }
  onYAxisRedraw() {
    this.isPrimary && this.refresh();
  }
  onDeleteIndicator(t) {
    this.removeIndicator(t.id);
  }
  setHeight(t) {
    v(t) || (t = this.height || this.#h.height), this.#d.style.height = `${t}px`, this.#f.style.height = `${t}px`, this.elViewport.style.height = `${t}px`, this.#v.setDimensions({ w: null, h: t });
  }
  setDimensions(t) {
    const e = this.config.buffer || yi;
    let { w: i, h: s } = t;
    i = this.width, s = s || this.height, this.setHeight(s), this.graph instanceof ne && (this.layerWidth = Math.round(i * ((100 + e) * 0.01)), this.graph.setSize(i, s, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.draw(void 0, !0), this.Divider.setPos());
  }
  setYAxisType(t) {
    if (!T(t) || !jt.includes(t) || this.type == "primaryPane" && t == "percent")
      return !1;
    this.#w = t;
  }
  addOverlays(t) {
    if (!M(t) || t.length < 1)
      return !1;
    const e = [];
    for (let i of t) {
      const s = { fixed: !1, required: !1 };
      if (i.type in this.core.indicatorClasses)
        s.cnt = this.core.indicatorClasses[i.type].ind.cnt, s.id = `${this.id}-${i.type}_${s.cnt}`, s.class = this.core.indicatorClasses[i.type].ind;
      else if (i.type in In[this.type])
        s.cnt = 1, s.id = `${this.id}-${i.type}`, s.class = In[this.type][i.type].class;
      else
        continue;
      s.params = { overlay: i }, i.id = s.id, i.paneID = this.id, e.push([i.id, s]);
    }
    return this.graph.addOverlays(e), !0;
  }
  getOverlays() {
    return Object.fromEntries([...this.#m.overlays.list]);
  }
  addIndicator(t) {
    const e = this.type === "primaryPane", i = this.core.indicatorClasses[t.type].ind, s = i.constructor.type === "both" ? e : i.prototype.primaryPane;
    if (t?.type in this.core.indicatorClasses && e === s) {
      t.paneID = this.id;
      const r = {
        class: i,
        params: { overlay: t }
      };
      return this.graph.addOverlay(t.name, r);
    } else
      return !1;
  }
  getIndicators() {
    const t = Object.keys(this.core.indicatorClasses), e = {};
    for (let [i, s] of Object.entries(this.overlays))
      if (t.includes(s.params?.overlay?.type)) {
        let r = s.id || s.instance.id;
        e[r] = s;
      }
    return e;
  }
  removeIndicator(t) {
    if (!T(t) || !(t in this.indicators))
      return !1;
    this.#O[t] = !0, this.indicators[t].instance.destroy(), this.graph.removeOverlay(t), this.draw(), Object.keys(this.indicators).length === 0 && !this.isPrimary && this.emit("destroyChartView", this.id), delete this.#O[t];
  }
  indicatorVisible(t, e) {
    return !T(t) || !(t in this.indicators) ? !1 : this.indicators[t].instance.visible(e);
  }
  indicatorSettings(t, e) {
    return !T(t) || !(t in this.indicators) ? !1 : this.indicators[t].instance.settings(e);
  }
  addTool(t) {
    let { layerConfig: e } = this.layerConfig(), i = new gi.Layer(e);
    this.#b.set(t.id, i), this.#C.addLayer(i), t.layerTool = i, this.#I.set(t.id, t);
  }
  addTools(t) {
  }
  overlayTools() {
  }
  overlayToolAdd(t) {
    this.#I.set(t.id, t);
  }
  overlayToolDelete(t) {
    this.#I.delete(t);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.#n.scrollPos, 0), this.overlayGrid.draw("y"), this.#m.render();
  }
  refresh() {
    this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  updateLegends(t = this.#E, e = !1) {
    if (!(this.#n.isEmpty || !S(this.#x)))
      for (const i in this.#x.list)
        this.#x.update(i, { pos: t, candle: e });
  }
  legendInputs(t = this.cursorPos) {
    t = this.cursorPos;
    let e = {}, i = [], s = [!0, !0, !0, !0, !0], r = this.time.xPos2Index(t[0] - this.core.scrollPos);
    r = et(r, 0, this.range.data.length - 1);
    let o = this.range.data[r];
    return o[4] >= o[1] ? i = new Array(5).fill(this.theme.candle.UpWickColour) : i = new Array(5).fill(this.theme.candle.DnWickColour), e.O = this.scale.nicePrice(o[1]), e.H = this.scale.nicePrice(o[2]), e.L = this.scale.nicePrice(o[3]), e.C = this.scale.nicePrice(o[4]), e.V = this.scale.nicePrice(o[5]), { inputs: e, colours: i, labels: s };
  }
  onLegendAction(t) {
    switch (this.#x.onMouseClick(t.currentTarget).icon) {
      case "up":
        this.reorderUp();
        return;
      case "down":
        this.reorderDown();
        return;
      case "visible":
        return;
      case "maximize":
        return;
      case "restore":
        return;
      case "remove":
        this.remove();
        return;
      case "config":
        return;
      default:
        return;
    }
  }
  reorderUp() {
    const {
      el: t,
      prevEl: e,
      parentEl: i,
      scaleEl: s,
      prevScaleEl: r,
      parentScaleEl: o,
      prevPane: l
    } = { ...this.currPrevNext() };
    return !S(e) || !S(r) ? !1 : (i.insertBefore(t, e), o.insertBefore(s, r), this.Divider.setPos(), l !== null && (l.Divider.setPos(), l.Divider.show(), this.core.ChartPanes.swapKeys(this.id, e.id)), t.previousElementSibling === null && this.Divider.hide(), !0);
  }
  reorderDown() {
    const {
      el: t,
      nextEl: e,
      parentEl: i,
      scaleEl: s,
      nextScaleEl: r,
      parentScaleEl: o,
      nextPane: l
    } = { ...this.currPrevNext() };
    return !S(e) || !S(r) ? !1 : (i.insertBefore(e, t), o.insertBefore(r, s), this.Divider.setPos(), l !== null && (l.Divider.setPos(), this.Divider.show(), this.core.ChartPanes.swapKeys(this.id, e.id)), e.previousElementSibling === null && l.Divider.hide(), !0);
  }
  createGraph() {
    let t = it(this.overlaysDefault);
    this.graph = new ne(this, this.elViewport, t, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.#m.render(), this.#v.render();
  }
  draw(t = this.range, e = !1) {
    this.#m.draw(t, e);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.core.scrollPos, 0), this.overlayGrid.draw("y"), this.#m.render();
  }
  resize(t) {
    const e = this, i = this.sibling();
    if (i === null)
      return { active: null, prev: null };
    let s, r, o;
    return v(t) && t > this.core.MainPane.rowMinH || (s = this.core.MainPane.cursorPos[5], r = this.height - s - 1, o = i.height + s), r >= this.core.MainPane.rowMinH && o >= this.core.MainPane.rowMinH && (e.setDimensions({ w: void 0, h: r }), i.setDimensions({ w: void 0, h: o }), e.Divider.setPos()), e.element.style.userSelect = "none", i.element.style.userSelect = "none", { active: e, prev: i };
  }
  zoomRange() {
    this.draw(this.range, !0), this.emit("zoomDone");
  }
  time2XPos(t) {
    return this.time.xPos(t);
  }
  price2YPos(t) {
    return this.scale.yPos(t);
  }
  currPrevNext() {
    const t = this.element, e = t.previousElementSibling, i = t.nextElementSibling, s = t.parentNode, r = this.scale.element, o = r.previousElementSibling, l = r.nextElementSibling, c = r.parentNode, f = e !== null ? this.core.ChartPanes.get(e.id) : null, p = i !== null ? this.core.ChartPanes.get(i.id) : null;
    return {
      el: t,
      prevEl: e,
      nextEl: i,
      parentEl: s,
      scaleEl: r,
      prevScaleEl: o,
      nextScaleEl: l,
      parentScaleEl: c,
      prevPane: f,
      nextPane: p
    };
  }
  sibling(t) {
    t = ["prev", "next"].includes(t) ? t : "prev";
    let e = [...this.core.ChartPanes.keys()], i = e.indexOf(this.id);
    return t == "prev" ? --i : ++i, this.#n.ChartPanes.get(e[i]) || null;
  }
}
const Bi = {
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        chart_pan: {
          target: "chart_pan",
          action(n) {
          }
        },
        setRange: {
          target: "setRange",
          action(n) {
          }
        },
        chart_scrollTo: {
          target: "chart_scrollTo",
          action(n) {
          }
        },
        addIndicator: {
          target: "addIndicator",
          action(n) {
          }
        },
        divider_pointerdrag: {
          target: "divider_pointerdrag",
          action(n) {
            this.context.currCursor = this.context.origin.cursor, this.context.origin.cursor = "row-resize";
          }
        },
        global_resize: {
          target: "global_resize",
          action(n) {
          }
        }
      }
    },
    chart_pan: {
      onEnter(n) {
        this.context.origin.cursor = "grab";
      },
      onExit(n) {
      },
      on: {
        chart_pan: {
          target: "chart_pan",
          action(n) {
            this.context.origin.updateRange(n), this.context.origin.cursor = "grab";
          }
        },
        chart_panDone: {
          target: "idle",
          action(n) {
            this.context.origin.updateRange(n), this.context.origin.cursor = "default";
          }
        }
      }
    },
    setRange: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        always: {
          target: "idle",
          condition: "zoomDone",
          action(n) {
            this.context.origin.zoomRange(n);
          }
        }
      }
    },
    chart_scrollTo: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        always: {
          target: "idle",
          action(n) {
            this.context.origin.updateRange(n);
          }
        }
      }
    },
    addIndicator: {
      onEnter(n) {
        this.context.origin.addIndicator(n);
      },
      onExit(n) {
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action(n) {
          }
        }
      }
    },
    divider_mousedown: {
      onEnter(n) {
        this.context.divider = n;
      },
      onExit(n) {
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action(n) {
            console.log(`${this.id}: transition from "${this.state}" to "divider_mousemove"`);
          }
        }
      }
    },
    divider_mousemove: {
      onEnter(n) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`);
        let t = this.context.divider;
        this.context.pair = this.context.origin.resizeRowPair(t, n);
      },
      onExit(n) {
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action(n) {
          }
        },
        main_mouseup: {
          target: "idle",
          action(n) {
            this.actions.removeProperty.call(this);
          }
        },
        divider_mouseup: {
          target: "idle",
          action(n) {
            this.actions.removeProperty.call(this), console.log(`${this.id}: transition from "${this.state}" to "ilde"`);
          }
        }
      }
    },
    divider_pointerdrag: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        divider_pointerdrag: {
          target: "divider_pointerdrag",
          action(n) {
          }
        },
        divider_pointerdragend: {
          target: "idle",
          action(n) {
            this.context.origin.cursor = this.context.currCursor;
          }
        }
      }
    },
    global_resize: {
      onEnter(n) {
        this.context.origin.setDimensions();
      },
      onExit(n) {
      },
      on: {
        always: {
          target: "idle",
          condition: "resizeDone",
          action(n) {
          }
        }
      }
    }
  },
  guards: {
    zoomDone() {
      return !0;
    },
    resizeDone() {
      return !0;
    }
  },
  actions: {
    removeProperty() {
      let n = this.context.pair.active, t = this.context.pair.prev;
      S(n) && n.element.style.removeProperty("user-select"), S(t) && t.element.style.removeProperty("user-select");
    }
  }
}, pl = [
  ["grid", { class: mi, fixed: !1, required: !0, params: { axes: "x" } }]
], vl = ["candles", "trades"];
class vr {
  #t = "MainPane";
  #e = "Main";
  #r;
  #s;
  #i;
  #n;
  #o = !1;
  #h;
  #l;
  #a;
  #c;
  #u;
  #d;
  #f = {};
  #v;
  #y;
  #m;
  #x;
  #p;
  #S;
  #P;
  #g = new lt();
  #C;
  #b;
  #I;
  #E = [];
  #T = Zs;
  #R = js;
  #M = {};
  #w = [0, 0];
  #D = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #O;
  #_;
  #B;
  #L;
  constructor(t, e) {
    this.#i = t, this.#r = e, this.#s = t, this.#l = this.#i.elMain, this.#h = this.#i.elYAxis, this.init(e);
  }
  log(t) {
    this.#i.log(t);
  }
  info(t) {
    this.#i.info(t);
  }
  warn(t) {
    this.#i.warn(t);
  }
  error(t) {
    this.#i.error(t);
  }
  get id() {
    return `${this.#i.id}-${this.#t}`;
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#e;
  }
  get core() {
    return this.#i;
  }
  get chart() {
    return this.#C;
  }
  get chartPanes() {
    return this.#g;
  }
  get chartDeleteList() {
    return this.#E;
  }
  get time() {
    return this.#b;
  }
  get options() {
    return this.#r;
  }
  get element() {
    return this.#l;
  }
  get elRows() {
    return this.#l.rows;
  }
  get elPrimary() {
    return this.#l.rows.primary;
  }
  get elSecondary() {
    return this.#l.rows.secondary;
  }
  get elPanes() {
    return this.#l.rows.chartPanes;
  }
  get elPaneSlot() {
    return this.#l.rows.chartPaneSlot;
  }
  get width() {
    return this.#l.getBoundingClientRect().width;
  }
  get height() {
    return this.#l.getBoundingClientRect().height;
  }
  get chartW() {
    return this.elPrimary.getBoundingClientRect().width;
  }
  get chartH() {
    return this.elPrimary.getBoundingClientRect().height;
  }
  get rowsW() {
    return this.#a.getBoundingClientRect().width;
  }
  get rowsH() {
    return this.#a.getBoundingClientRect().height;
  }
  get rowMinH() {
    return this.#R;
  }
  set rowMinH(t) {
    v(t) && (this.#R = Math.abs(t));
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#l);
  }
  get range() {
    return this.#i.range;
  }
  set cursor(t) {
    this.element.style.cursor = t;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#w;
  }
  get candleW() {
    return this.#b.candleW;
  }
  get theme() {
    return this.#i.theme;
  }
  get config() {
    return this.#i.config;
  }
  get buffer() {
    return this.#O;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.#i.scrollPos;
  }
  set stateMachine(t) {
    this.#n = new kt(t, this);
  }
  get stateMachine() {
    return this.#n;
  }
  get graph() {
    return this.#p;
  }
  get views() {
    return this.#i.state.data.views;
  }
  get indicators() {
    return this.getIndicators();
  }
  get elements() {
    return {
      elRows: this.elRows,
      elPrimary: this.elPrimary,
      elSecondarys: this.elSecondarys,
      elTime: this.#c,
      elScale: this.#d
    };
  }
  init(t) {
    if (this.#i, this.#_ = this.#i.indicatorClasses, this.#a = this.#l.rows, this.#c = this.#l.time, this.#v = this.#l.rows.grid, this.#m = this.#l.viewport, this.#d = this.#i.elBody.scale, t.name = "Chart", t.shortName = "Chart", t.parent = this, t.chartData = this.#i.chartData, t.primaryPane = this.#i.primaryPane, t.secondaryPane = this.#i.secondaryPane, t.rangeLimit = this.#i.rangeLimit, t.settings = this.#i.settings, t.elements = {
      ...t.elements,
      ...this.elements
    }, this.#i.theme?.time?.navigation === !1) {
      const e = { height: ci };
      this.#i.theme.time = { ...this.#i.theme?.time, ...e }, this.#a.style.height = `calc(100% - ${ci}px)`;
    }
    this.#b = new Jh(this.#i, t), this.registerChartViews(t), this.#O = v(this.config.buffer) ? this.config.buffer : yi, this.#R = v(this.config.rowMinH) ? this.config.rowMinH : js, this.#T = v(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : Zs, this.rowsOldH = this.rowsH, this.log(`${this.#t} instantiated`);
  }
  start() {
    let t = 0;
    this.#l.start(this.theme), this.#b.start(), this.#g.forEach((e, i) => {
      e.start(t++), t === 1 && e.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.createGraph(), this.draw(this.range, !0), Qe.init({
      graphs: [this.#p],
      range: this.range
    }), Qe.start(), Qe.queueFrame(this.range, [this.#p], !1), this.eventsListen(), Bi.id = this.id, Bi.context = this, this.stateMachine = Bi, this.stateMachine.start();
  }
  destroy() {
    this.#o = !0, this.stateMachine.destroy(), this.#b.destroy(), this.#g.forEach((t, e) => {
      this.#E[e] = !0, t.destroy(), delete this.#E[e];
    }), this.#p.destroy(), this.#L.destroy(), this.off(Ce, this.onFirstStreamValue), this.off(be, this.onNewStreamValue), this.off("setRange", this.draw), this.off("scrollUpdate", this.draw), this.off("chart_render", this.draw), this.off("destroyChartView", this.removeChartPane), this.element.remove;
  }
  eventsListen() {
    this.#a.tabIndex = 0, this.#a.focus(), this.#L = new Nt(this.#a, { disableContextMenu: !1 }), this.#L.on("keydown", this.onChartKeyDown.bind(this)), this.#L.on("keyup", this.onChartKeyUp.bind(this)), this.#L.on("wheel", this.onMouseWheel.bind(this)), this.#L.on("pointerenter", this.onMouseEnter.bind(this)), this.#L.on("pointerout", this.onMouseOut.bind(this)), this.#L.on("pointerup", this.onChartDragDone.bind(this)), this.#L.on("pointermove", this.onMouseMove.bind(this)), this.on(Ce, this.onFirstStreamValue, this), this.on(be, this.onNewStreamValue, this), this.on("setRange", this.draw, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
  }
  on(t, e, i) {
    this.#i.on(t, e, i);
  }
  off(t, e) {
    this.#i.off(t, e);
  }
  emit(t, e) {
    this.#i.emit(t, e);
  }
  onMouseWheel(t) {
    const e = Math.sign(t.wheeldelta) * -1;
    if (t.domEvent.preventDefault(), this.#i.pointerButtons[0]) {
      t.dragstart.x = this.#w[0], t.dragstart.y = this.#w[1], t.position.x = this.#w[0] + e, t.position.y = this.#w[1], this.onChartDrag(t);
      return;
    }
    const i = this.range, s = i.indexStart - Math.floor(e * Ws * i.Length), r = i.indexEnd + Math.ceil(e * Ws * i.Length);
    this.#i.setRange(s, r), this.draw(this.range, !0);
  }
  onMouseMove(t) {
    const e = this.#M;
    e.d2x = e?.d1x || null, e.d2y = e?.d1y || null, e.d1x = t.movement.x, e.d1y = t.movement.y, e.dx = Math.floor((e.d1x + e.d2x) / 2), e.dy = Math.floor((e.d1y + e.d2y) / 2), e.ts2 = e?.ts1 || null, e.ts1 = Date.now(), this.#w = [
      t.position.x,
      t.position.y,
      t.dragstart.x,
      t.dragstart.y,
      e.dx,
      e.dy,
      e.ts1,
      e.ts1 - e.ts2
    ], this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !0;
    for (let [i, s] of this.chartPanes)
      s.graph.overlays.list.get("cursor").layer.visible = !0;
    this.emit("main_mousemove", this.#w);
  }
  onMouseEnter(t) {
    this.core.Timeline.showCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !0, this.core.Chart.graph.render();
    for (let [e, i] of this.chartPanes)
      i.graph.overlays.list.get("cursor").layer.visible = !0, i.graph.render();
  }
  onMouseOut(t) {
    this.core.Timeline.hideCursorTime(), this.onPointerActive(!1), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !1, this.core.Chart.graph.render();
    for (let [e, i] of this.chartPanes)
      i.graph.overlays.list.get("cursor").layer.visible = !1, i.graph.render();
    this.draw();
  }
  onChartDrag(t) {
    const e = this.#D;
    e.active ? (e.delta = [
      t.position.x - e.prev[0],
      t.position.y - e.prev[1]
    ], e.prev = [
      t.position.x,
      t.position.y
    ]) : (e.active = !0, e.start = [t.dragstart.x, t.dragstart.y], e.prev = e.start, e.delta = [0, 0]), this.#w = [
      t.position.x,
      t.position.y,
      ...e.start,
      ...e.delta
    ], this.emit("chart_pan", this.#w);
  }
  onChartDragDone(t) {
    const e = this.#D;
    e.active = !1, e.delta = [0, 0], this.#w = [
      ...e.prev,
      ...e.start,
      ...e.delta
    ], this.emit("chart_panDone", this.#w);
  }
  onChartKeyDown(t) {
    let e = this.candleW > 1 ? this.candleW : 1;
    switch (t.key) {
      case "ArrowLeft":
        this.emit("chart_pan", [0, null, e, null, e * -1, null]);
        break;
      case "ArrowRight":
        this.emit("chart_pan", [e, null, 0, null, e, null]);
        break;
      case "ArrowUp":
        t.wheeldelta = -1, t.domEvent = t.srcEvent, this.onMouseWheel(t);
        break;
      case "ArrowDown":
        t.wheeldelta = 1, t.domEvent = t.srcEvent, this.onMouseWheel(t);
        break;
    }
  }
  onChartKeyUp(t) {
    let e = this.candleW > 1 ? this.candleW : 1;
    switch (t.key) {
      case "ArrowLeft":
        this.emit("chart_panDone", [0, null, e, null, e * -1, null]);
        break;
      case "ArrowRight":
        this.emit("chart_panDone", [e, null, 0, null, e, null]);
        break;
    }
  }
  onFirstStreamValue(t) {
    this.chart.scale.xAxis.calcXAxisGrads(this.range), this.draw(this.range, !0);
  }
  onNewStreamValue(t) {
  }
  onPointerActive(t) {
    t && (t.cursorActive = !0, t.scale.layerCursor.visible = !0), t !== this.chart && (this.chart.cursorActive = !1, this.chart.scale.layerCursor.visible = !1, this.chart.scale.layerCursor.erase()), this.#g.forEach((e, i) => {
      t !== e && (e.cursorActive = !1, e.scale.layerCursor.visible = !1, e.scale.layerCursor.erase());
    });
  }
  setDimensions() {
    this.#a.previousDimensions();
    let t = this.#a.heightDeltaR, e = Math.round(this.chartH * t), i = this.rowsW, s = this.rowsH, r = Math.round(i * ((100 + this.#O) * 0.01)), o = {
      resizeH: t,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.#i.scrollPos = -1, this.#b.setDimensions({ w: i }), this.#p.setSize(i, s, r), this.#g.size == 1 && e != this.#a.height ? this.#C.setDimensions({ w: i, h: this.#a.height }) : this.#g.forEach((l, c) => {
      e = Math.round(l.viewport.height * t), l.setDimensions({ w: i, h: e });
    }), this.rowsOldH = this.rowsH, this.draw(this.range, !0), this.emit("rowsResize", o);
  }
  getBufferPx() {
    let t = Math.round(this.width * this.buffer / 100), e = t % this.candleW;
    return t - e;
  }
  registerChartViews(t) {
    this.#a.previousDimensions();
    const e = [];
    for (let [s, r] of this.views) {
      if (s === "primary" && e.push(r), r.length === 0 && s !== "primary") {
        this.views.delete(s);
        continue;
      }
      for (const [o, l] of r.entries())
        S(l) && (l.type in this.core.indicatorClasses || vl.includes(l.type)) || (this.#i.log(`indicator ${r.type} not added: not supported.`), r.splice(o, 1));
    }
    let i = e[0];
    for (let s of e)
      s?.primary === !0 ? i = s : s.primary = !1;
    i.primary = !0, t.rowY = 0;
    for (let [s, r] of this.views)
      t.type = s, t.view = r, this.addChartPane(t);
  }
  addChartPane(t) {
    const e = this.calcChartPaneHeights();
    let i;
    for (i in e)
      this.#g.has(i) && this.#g.get(i).setDimensions({ w: this.rowsW, h: e[i] });
    i = e[i];
    let s;
    this.#a.insertAdjacentHTML(
      "beforeend",
      this.#l.rowNode(t.type, this.#i)
    ), s = this.#a.chartPaneSlot.assignedElements().slice(-1)[0], s.style.height = `${i}px`, s.style.width = "100%";
    let r;
    this.#h.insertAdjacentHTML(
      "beforeend",
      this.scaleNode(t.type)
    ), r = this.#h.chartPaneSlot.assignedElements().slice(-1)[0], r.style.height = `${i}px`, r.style.width = "100%", t.elements.elTarget = s, t.elements.elScale = r;
    let o;
    return t.type == "primary" ? (o = new Ae(this.#i, t), this.#C = o) : (t.name = t.view[0].name || "Secondary", t.shortName = t.view[0].type || "Secondary", o = new Ae(this.#i, t)), this.#g.set(o.id, o), this.emit("addChartView", o), o;
  }
  removeChartPane(t) {
    if (!T(t) || !this.#g.has(t))
      return !1;
    const e = this.#g.get(t);
    if (e.isPrimary)
      return this.#i.error(`Cannot remove primary chart pane! ${t}`), !1;
    this.#E[t] = !0;
    let i = this.rowsW, s = e.viewport.height, r = Math.floor(s / (this.#g.size - 1)), o = s % r;
    return e.status !== "destroyed" && e.destroy(), this.#g.delete(t), delete this.#E[t], this.#g.forEach((l, c) => {
      s = l.viewport.height, l.setDimensions({ w: i, h: s + r + o }), o = 0;
    }), this.draw(this.range, !0), !0;
  }
  addIndicator(t, e = t, i = {}) {
    if (!T(t) && !(t in this.#_) && !T(e) && !S(i))
      return !1;
    this.log(`Adding the ${e} : ${t} indicator`), M(i?.data) || (i.data = []), S(i?.settings) || (i.settings = {});
    let s;
    if (this.#_[t].ind.primaryPane) {
      const r = {
        type: t,
        name: e,
        ...i
      };
      s = this.#C.addIndicator(r);
    } else {
      this.core.indicatorClasses[t].ind.primaryPane === "both" && G(t.primaryPane) && t.primaryPane, M(i.view) || (i.view = [{ name: e, type: t, ...i }]);
      for (let o = 0; o < i.view.length; o++)
        (!S(i.view[o]) || !Wo(["name", "type"], Object.keys(i.view[o]))) && i.view.splice(o, 1);
      if (i.view.length == 0)
        return !1;
      i.parent = this, i.title = e, i.elements = { ...this.elements }, s = this.addChartPane(i), s.start();
    }
    return this.#i.refresh(), this.emit("addIndicatorDone", s), console.log("Added indicator:", s.id), s;
  }
  getIndicators() {
    const t = {};
    return this.#g.forEach(
      (e, i) => {
        t[i] = e.indicators;
      }
    ), t;
  }
  getIndicator(t) {
    if (!T(t))
      return !1;
    for (const e of this.#g.values())
      if (t in e.indicators)
        return e.indicators[t].instance;
  }
  removeIndicator(t) {
    if (T(t)) {
      for (const e of this.#g.values())
        if (t in e.indicators)
          return e.indicators[t].instance.remove(), !0;
    } else
      return t instanceof Dt ? (t.remove(), !0) : !1;
  }
  indicatorSettings(t, e) {
    if (T(t)) {
      for (const i of this.#g.values())
        if (t in i.indicators)
          return i.indicators[t].instance.settings(e);
    } else
      return t instanceof Dt ? t.settings(e) : !1;
  }
  calcChartPaneHeights() {
    const t = this.#g.size + 1, e = this.#T * (t - 1), i = e / Math.log10(e * 2) / 100;
    Math.round(this.rowsH * i);
    const s = {};
    if (t === 1)
      s.new = this.rowsH;
    else if (t === 2) {
      const r = this.#g.firstKey(), o = Math.round(this.rowsH * this.#T / 100);
      s[r] = this.rowsH - o, s.new = o;
    } else if (t === 3) {
      const r = this.#g.firstEntry(), o = this.#g.lastEntry(), l = Math.round(this.rowsH * this.#T / 100);
      let c = this.rowsH / (this.rowsH + l);
      s[r[0]] = Math.floor(r[1].viewport.height * c), s[o[0]] = Math.floor(o[1].viewport.height * c), s.new = Math.floor(l * c), s.new += this.rowsH - (s[r[0]] + s[o[0]] + s.new);
    } else {
      let r = 0;
      for (let l of this.#g)
        s[l[0]] = l[1].viewport.height, r += l[1].viewport.height;
      s.new = Math.floor(r / (this.#g.size + 1));
      let o = this.rowsH / (this.rowsH + s.new);
      r = 0;
      for (let l in s)
        s[l] = Math.floor(s[l] * o), r += s[l];
      s.new += this.rowsH - r;
    }
    return s;
  }
  scaleNode(t) {
    const e = vh + ` width: 100%; border-top: 1px solid ${this.theme.secondaryPane.separator};`;
    return `
    <div slot="chartpane" class="viewport scale ${t}" style="$${e}"></div>
  `;
  }
  createGraph() {
    let t = it(pl);
    this.#p = new ne(this, this.#m, t);
  }
  draw(t = this.range, e = !1) {
    const i = [
      this.#p,
      this.#b,
      this.#C
    ];
    this.time.xAxis.doCalcXAxisGrads(t), this.#g.forEach((s, r) => {
      i.push(s);
    }), Qe.queueFrame(
      this.range,
      i,
      e
    );
  }
  updateRange(t) {
    this.#i.updateRange(t);
  }
  zoomRange() {
    this.draw(this.range, !0);
  }
}
const yl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', xl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', wl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', yr = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', El = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', Tl = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', Sl = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', ti = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', Cl = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', bl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', Ml = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', Pl = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Ll = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Al = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Ol = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Il = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', Rl = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', _l = '<svg class="ov-icon" width="46.08" height="46.08" font-size="2.88em" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Dl = '<svg class="ov-icon" width="46.08" height="46.08" font-size="2.88em" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Rn = 20, kl = 20, Nl = new fr(B.COLOUR_BORDER), Ji = document.createElement("template");
Ji.innerHTML = `
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
    border: 1px solid var(--txc-time-scrollbar-color, ${B.COLOUR_BORDER});
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
    background-color: var(--txc-time-handle-color, ${Nl.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${Rn}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${B.COLOUR_ICON});
    width: ${Rn}px;
    height: ${kl}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${B.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${Dl}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${_l}</span>
</div>
`;
class $l extends st {
  #t;
  constructor() {
    super(Ji), this.#t = Ji;
  }
  destroy() {
  }
  connectedCallback() {
    this.doInit && (this.doInit = !1, this.shadowRoot.appendChild(this.#t.content.cloneNode(!0)), document.getElementById("slider-bar"), this.max.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.max })), this.min.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.min })));
  }
  disconnectedCallback() {
  }
  get scrollBarWidget() {
    return this.shadowRoot.querySelector(".scrollBarWidget");
  }
  get rwdStart() {
    return this.shadowRoot.querySelector(".rwdStart");
  }
  get fwdEnd() {
    return this.shadowRoot.querySelector(".fwdEnd");
  }
  get scrollBar() {
    return this.shadowRoot.querySelector(".scrollBar");
  }
  get viewport() {
    return this.shadowRoot.querySelector(".viewport");
  }
  get handle() {
    return this.shadowRoot.querySelector(".handle");
  }
  get icons() {
    return this.shadowRoot.querySelectorAll("svg");
  }
  get max() {
    return this.shadowRoot.querySelector("#max");
  }
  get min() {
    return this.shadowRoot.querySelector("#min");
  }
  get sliders() {
    return this.shadowRoot.querySelectorAll("input");
  }
  get overviewCSS() {
    return this.shadowRoot.querySelector("style[title=overview]");
  }
  onChangeSliderHandler() {
    console.log(`${this.input.value}, ${this.input.getAttribute("max")}`);
  }
}
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", $l);
const xr = document.createElement("template");
xr.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${ci}px;
  }
  tradex-overview {
    height: ${Jn}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class Hl extends st {
  constructor() {
    super(xr);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  createGraph() {
  }
  get viewport() {
    return this.shadowRoot.querySelector(".viewport");
  }
  get overview() {
    return this.shadowRoot.querySelector("tradex-overview");
  }
}
customElements.get("tradex-time") || window.customElements.define("tradex-time", Hl);
const wr = document.createElement("template");
wr.innerHTML = `
<style>
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <div class="viewport"></div>
`;
class Ul extends st {
  constructor() {
    super(wr);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.shadowRoot.querySelector(".viewport");
  }
}
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", Ul);
const Er = document.createElement("template");
Er.innerHTML = `
<style>

.legend {
  display: block;
  position: relative;
  width: 100%;
  min-height: 2em;
  margin: 0;
}
.legend * {
  margin: 0;
  padding: 0;
  vertical-align: middle;
}
.legend .upper,
.legend .lower {
  display: block;
  position: absolute;
  top: 0
  width: 100%;
  padding: 0 0.5em;
  white-space: nowrap;
}
.legend .controls {
  opacity: 0;
}
.legend .controls svg {
  vertical-align: text-top;
  margin-bottom: 0.2em;
}
.legend dl {
  display: inline; 
  margin: 0 0 0 -1em;
  overflow: hidden;
}
.legend dl:first-child,
.legend dl dt:first-of-type {
  margin-left: 0;
}
.legend dt {
  display: inline; margin-left: 1em;
}
.legend dd {
  display: inline; margin-left: .25em; color: #F900FE;
}
.legend .upper:hover {
  background: #444444cc;
  border-radius: 5px;
}
.legend .upper:hover .controls {
  opacity: 1;
}
.legend .title {
  margin-right: 1em;
  white-space: nowrap;
}
.legend .lower .title {
  visibility:hidden;
}
.legend .controls,
.legend dl {
  display: inline;
}
.legend .control {
  margin-right:2px;
}


.chart .upper {
  right: 0;
  z-index:1;
}
.chart .upper .title,
.secondary .upper .title {
  display: none;
}
.chart .lower .title {
  visibility: visible;
}

.secondary .upper {
  right: 0;
  z-index:1;
}
</style>
<div class="legends">
  <slot name="legend"></slot>
</div>
`;
class Bl extends st {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o = [];
  constructor() {
    super(Er);
  }
  destroy() {
  }
  connectedCallback() {
    this.doInit && (this.doInit = !1, this.shadowRoot.appendChild(this.template.content.cloneNode(!0)), this.style.display = "block", this.#n = this.shadowRoot.querySelector("slot"), this.#e = this.shadowRoot.querySelector(".legends"), this.#r = this.shadowRoot.querySelector(".title"), this.#s = this.shadowRoot.querySelector("dl"), this.#i = this.shadowRoot.querySelector(".controls"), this.#n.addEventListener("slotchange", this.onSlotChange.bind(this)));
  }
  disconnectedCallback() {
  }
  get slot() {
    return this.#n;
  }
  get legends() {
    return this.#e;
  }
  get elTitle() {
    return this.#r;
  }
  get elInputs() {
    return this.#s;
  }
  get elControls() {
    return this.#i;
  }
  get title() {
    return this.#t;
  }
  set title(t) {
    this.setTittle(t);
  }
  onSlotChange(t) {
    this.#o.forEach((e) => e.handler.call(e.context, t));
  }
  insert(t) {
    this.legends.insertAdjacentHTML("beforeend", t);
  }
  setTittle(t) {
    T && (this.#t = t, this.elTitle.innerHTML = t);
  }
  buildLegend(t, e) {
    let i = "", s = `${e.legend.font}; color: ${e.legend.colour}; text-align: left;`, r = "";
    const o = "", l = e.legend.controls ? `
      <div class="controls" style="${o}">
        ${this.buildControls(t)}
      </div>
    ` : "";
    switch (t?.type) {
      case "chart":
        r += "font-size: 1.5em;";
        break;
      case "secondary":
        s += " margin-bottom: -1.5em;", r += "", t.title = "";
        break;
      default:
        r += "font-size: 1.2em;";
        break;
    }
    return `
      <div id="legend_${t.id}" class="legend ${t.type}" style="${s}" data-type="${t.type}" data-id="${t.id}" data-parent="${t.parent.id}">
        <div class="lower">
          <span class="title" style="${r}">${t.title}</span>
          <dl style="${i}">${this.buildInputs(t)}</dl>
        </div>
        <div class="upper">
            <span class="title" style="${r}">${t.title}</span>
            ${l}
      </div>
     </div>
    `;
  }
  buildInputs(t) {
    let e = 0, i = "", s, r = "", o = "", l = "";
    for (s in t.inputs) {
      let c = t?.colours?.[e] ? ` color: ${t.colours[e]};` : "", f = t?.inputs?.[s] !== void 0 ? t.inputs[s] : r, p = t?.labels?.[e] ? `${s}:` : r;
      o += t?.labels?.[e] ? "1em;" : ".25em", i += `<dt style="${o}">${p}</dt>
      <dd style="${l}${c}">${f}</dd>`, ++e;
    }
    return i;
  }
  buildControls(t) {
    let e = "", i = t.id;
    return e += `<span id="${i}_up" class="control" data-icon="up">${Ll}</span>`, e += `<span id="${i}_down" class="control" data-icon="down">${Al}</span>`, e += `<span id="${i}_collapse" class="control" data-icon="visible">${Rl}</span>`, e += `<span id="${i}_maximize" class="control" data-icon="maximize">${Il}</span>`, e += `<span id="${i}_restore" class="control" data-icon="restore">${Ol}</span>`, e += t?.type !== "chart" ? `<span id="${i}_remove" class="control" data-icon="remove">${Pl}</span>` : "", e += t?.type !== "secondary" ? `<span id="${i}_config" class="control" data-icon="config">${yr}</span>` : "", e;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", Bl);
const Tr = document.createElement("template");
Tr.innerHTML = `
<style>
  :host {
    overflow: hidden;
  }

  .viewport {
    position: relative;
    width: 100%;
    height: inherit;
    background: var(--txc-chartpane-background, none);
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
class zl extends st {
  #t;
  #e;
  constructor() {
    super(Tr);
  }
  destroy() {
  }
  connectedCallback() {
    this.doInit && (this.doInit = !1, this.style.display = "block", this.shadowRoot.appendChild(this.template.content.cloneNode(!0)), this.#t = this.shadowRoot.querySelector(".viewport"), this.#e = this.shadowRoot.querySelector("tradex-legends"));
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.#t;
  }
  get legend() {
    return this.#e;
  }
}
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", zl);
const Sr = document.createElement("template");
Sr.innerHTML = `
<style>
  tradex-grid {
    position: absolute;
    height: inherit;
  }
  tradex-grid {
    display: block;
    width: 100%;
  }
  slot[name="chartpane"] {
    display: flex;
    flex-direction: column;
  }
  ::slotted(tradex-chartpane) {
    display: block;
    position: relative;
    top: 0;
    width: 100%;
  }
  ::slotted(tradex-chartpane:first-of-type) {
    border-top: none !important;
  }
</style>
<tradex-grid></tradex-grid>
<slot name="chartpane" id="chartpane"></slot>
`;
class Wl extends st {
  #t;
  #e;
  #r;
  #s;
  constructor() {
    super(Sr);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(), this.previousDimensions();
  }
  disconnectedCallback() {
  }
  get grid() {
    return this.shadowRoot.querySelector("tradex-grid");
  }
  get primary() {
    return Array.from(this.chartPaneSlot.assignedElements()).find((t) => t.classList.contains("primary"));
  }
  get secondary() {
    return Array.from(this.chartPaneSlot.assignedElements()).find((t) => t.classList.contains("secondary"));
  }
  get chartPanes() {
    return this.chartPaneSlot.assignedElements();
  }
  get chartPaneSlot() {
    return this.shadowRoot.querySelector('slot[name="chartpane"]');
  }
  get width() {
    return this.clientWidth;
  }
  get height() {
    return this.clientHeight;
  }
  get oWidth() {
    return this.#t;
  }
  get oHeight() {
    return this.#e;
  }
  get widthDeltaR() {
    return this.clientWidth / this.#t;
  }
  get heightDeltaR() {
    return this.clientHeight / this.#e;
  }
  previousDimensions() {
    this.#t = this.#r ? this.#r : this.clientWidth, this.#e = this.#s ? this.#s : this.clientHeight, this.#r = this.clientWidth, this.#s = this.clientHeight;
  }
}
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", Wl);
const Cr = document.createElement("template");
Cr.innerHTML = `
<style>
  #viewport {
    position: absolute;
    width: 100%;
    height: inherit;
    background: var(--txc-chartpane-background, none);
    z-index: 0;
  }
  #viewport canvas {
    position: absolute;
    top: 1px;
  }
  tradex-rows {
    position:relative;
    overflow: hidden;
    width: calc(100% - ${se}px);
    height: calc(100% - ${di}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${B.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${se}px);
    height: ${di}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class Fl extends st {
  #t;
  #e;
  constructor() {
    super(Cr);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.shadowRoot.querySelector("#viewport");
  }
  get rows() {
    return this.shadowRoot.querySelector("tradex-rows");
  }
  get time() {
    return this.shadowRoot.querySelector("tradex-time");
  }
  start(t) {
    this.#e = t, this.setMain();
  }
  rowNode(t, e) {
    const i = ` border-top: 1px solid ${e.theme.secondaryPane.separator};`;
    return `
      <tradex-chartpane slot="chartpane" class="${t}" style="${i}">
      </tradex-chartpane>
    `;
  }
  setMain() {
    let t = v(this.#e?.time?.height) ? this.#e.time.height : di, e = this.#e.tools.location == "none" ? 60 : 0;
    this.rows.style.height = `calc(100% - ${t}px)`, this.rows.style.left = `${e}px`, this.time.style.left = `${e}px`, this.viewport.style.left = `${e}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", Fl);
const br = document.createElement("template");
br.innerHTML = `
  <slot></slot>
`;
class Vl extends st {
  constructor() {
    super(br);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get icons() {
    return this.shadowRoot.querySelector("slot").assignedElements();
  }
  defaultNode(t) {
    let e = `
    <style>
      svg {
        height: ${It.ICONSIZE};
        width: ${It.ICONSIZE};
        fill: ${It.COLOUR_ICON};
      }
      svg:hover {
        fill: ${It.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${It.ICONSIZE};
        margin: 0 auto;
      }
    </style>
    `;
    for (const i of t)
      e += this.iconNode(i);
    return e;
  }
  iconNode(t) {
    const e = "sub" in t ? 'data-menu="true"' : "";
    return `
      <div id="${t.id}" data-event="${t.event}" ${e} class="icon-wrapper">${t.icon}</div>

    `;
  }
}
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", Vl);
const Mr = document.createElement("template");
Mr.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: -100;
  }
  slot[name="chartpane"] {
    display: flex;
    flex-direction: column;
  }
  ::slotted(div.scale:first-of-type) {
    border-top: none !important;
  }
</style>
<div class="viewport"></div>
<slot name="chartpane" id="chartPane"></slot>
`;
class Gl extends st {
  constructor() {
    super(Mr);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.shadowRoot.querySelector(".viewport");
  }
  get chartPanes() {
    return this.chartPaneSlot.assignedElements();
  }
  get chartPaneSlot() {
    return this.shadowRoot.querySelector('slot[name="chartpane"]');
  }
}
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", Gl);
const Yl = `
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${Ot}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: 0;
    width: calc(100% - ${Ot}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 1px;
    right: 0; 
    width: ${se}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`, Pr = document.createElement("template");
Pr.innerHTML = Yl;
class ql extends st {
  #t;
  constructor() {
    super(Pr);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get tools() {
    return this.shadowRoot.querySelector("tradex-tools");
  }
  get main() {
    return this.shadowRoot.querySelector("tradex-main");
  }
  get scale() {
    return this.shadowRoot.querySelector("tradex-scale");
  }
  start(t) {
    this.#t = t, this.setToolsLocation();
  }
  setYAxisLocation(t = this.#t?.yAxis?.location) {
    let e = v(this.#t?.tools?.width) ? this.#t.tools.width : Ot, i;
    switch (t) {
      case "left":
        i = e == 0 ? 0 : se, this.scale.style.left = `${e}px`, this.scale.style.right = void 0, this.main.style.left = void 0, this.main.style.right = `-${i}px`, this.main.style.width = `calc(100% - ${e}px)`;
        break;
      case "both":
      case "right":
      default:
        i = e == 0 ? se : 0, this.scale.style.left = void 0, this.scale.style.right = 0, this.main.style.left = void 0, this.main.style.right = `${i}px`, this.main.style.width = `calc(100% - ${e}px)`;
        break;
    }
  }
  setToolsLocation(t = this.#t?.tools?.location) {
    switch (this.#t.tools = this.#t.tools || {}, t) {
      case "none":
      case !1:
        this.#t.tools.location = "none", this.#t.tools.width = 0, this.tools.style.display = "none", this.tools.style.width = "0px";
        break;
      case "right":
        this.#t.tools.location = "right", this.#t.tools.width = this.#t?.tools?.width || Ot, this.tools.style.display = "block", this.tools.style.left = void 0, this.tools.style.right = 0, this.tools.style.width = `${Ot}px`;
        break;
      case "left":
      default:
        this.#t.tools.location = "left", this.#t.tools.width = this.#t?.tools?.width || Ot, this.tools.style.display = "block", this.tools.style.left = 0, this.tools.style.right = void 0, this.tools.style.width = `${Ot}px`;
        break;
    }
    this.setYAxisLocation();
  }
}
customElements.get("tradex-body") || window.customElements.define("tradex-body", ql);
const Lr = document.createElement("template");
Lr.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class Xl extends st {
  constructor() {
    super(Lr);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get icons() {
    return this.shadowRoot.querySelector("slot").assignedElements()[0].children;
  }
  defaultNode(t) {
    let i = `
    <div style="display: inline-block; float: right;">
    <style>
      svg {
        height: ${ee.ICONSIZE};
        fill: ${ee.COLOUR_ICON};
      }
    </style>
    `;
    for (const s of t)
      i += this.iconNode(s);
    return i + "</div>";
  }
  iconNode(t) {
    const e = `display: inline-block; height: ${ee.ICONSIZE}; padding-top: 2px`, i = "sub" in t ? 'data-menu="true"' : "";
    return `
      <div id="TX_${t.id}" data-event="${t.event}" ${i} class="icon-wrapper" style="${e}">${t.icon}</div>

    `;
  }
}
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", Xl);
const Ar = document.createElement("template");
Ar.innerHTML = `
  <slot name="widget"></slot>
`;
class jl extends st {
  constructor() {
    super(Ar);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", jl);
const Zl = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
    }
    tradex-utils {
      height: ${_t}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${_t}px); 
      min-height: ${Ft - _t}px;
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
class Kl extends st {
  #t;
  #e;
  #r;
  #s;
  #i = li;
  #n = Ft;
  #o;
  #h;
  #l;
  #a;
  #c;
  constructor() {
    const t = document.createElement("template");
    t.innerHTML = Zl, super(t, "closed"), this.#s = t;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#s.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = Qn, this.elWidgetsG = this.shadowRoot.querySelector("tradex-widgets"), this.elUtils = this.shadowRoot.querySelector("tradex-utils"), this.elBody = this.shadowRoot.querySelector("tradex-body"), this.elMain = this.elBody.main, this.elTime = this.elBody.main.time, this.elTools = this.elBody.tools, this.elYAxis = this.elBody.scale, this.previousDimensions();
      let t = this.getAttribute("height") || "100%", e = this.getAttribute("width") || "100%";
      this.setDimensions(e, t), this.resizeObserver = new ResizeObserver(Rt(this.onResized, 50, this)), this.resizeObserver.observe(this);
    }
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect(), this.removeEventListener("click", this.onClick);
  }
  attributeChangedCallback(t, e, i) {
    switch (t) {
      case "config":
        break;
      case "disabled":
        break;
      case "height":
        this.height(i);
        break;
      case "width":
        this.width(i);
        break;
    }
  }
  get id() {
    return this.getAttribute("id");
  }
  set id(t) {
    this.setAttribute("id", String(t).replace(/ |,|;|:|\.|#/g, "_"));
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(t) {
    t ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  get width() {
    return this.offsetWidth;
  }
  set width(t) {
    this.setWidth(t);
  }
  get height() {
    return this.offsetHeight;
  }
  set height(t) {
    this.setHeight(t);
  }
  get oWidth() {
    return this.#o;
  }
  get oHeight() {
    return this.#h;
  }
  get widthDeltaR() {
    return this.offsetWidth / this.#o;
  }
  get heightDeltaR() {
    return this.offsetHeight / this.#h;
  }
  get stream() {
  }
  set stream(t) {
  }
  get body() {
    return this.#t;
  }
  get utils() {
    return this.#e;
  }
  get widgets() {
    return this.#r;
  }
  elStart(t) {
    this.#c = t, this.setUtilsLocation();
  }
  onResized(t) {
    this.log(`onResize w: ${this.offsetWidth}, h: ${this.offsetHeight}`), S(this.MainPane) && this.MainPane instanceof vr && (this.previousDimensions(), this.emit("global_resize", { w: this.offsetWidth, h: this.offsetHeight }));
  }
  previousDimensions() {
    this.#o = this.#l ? this.#l : this.offsetWidth, this.#h = this.#a ? this.#a : this.offsetHeight, this.#l = this.offsetWidth, this.#a = this.offsetHeight;
  }
  setWidth(t) {
    v(t) ? (this.#i = t, t += "px") : T(t) || (this.#i = this.parentElement.getBoundingClientRect().width, t = this.#i + "px"), this.style.width = t;
  }
  setHeight(t) {
    v(t) ? (this.#n = t, t += "px") : T(t) || (this.#n = this.parentElement.getBoundingClientRect().height, w = this.#n + "px"), this.style.height = t;
  }
  setWidthMin(t) {
    this.style.minWidth = `var(--txc-min-width, ${t})`;
  }
  setHeightMin(t) {
    this.style.minHeight = `var(--txc-min-height, ${w})`;
  }
  setWidthMax(t) {
    this.style.minWidth = `var(--txc-max-width, ${t})`;
  }
  setHeightMax(t) {
    this.style.minHeight = `var(--txc-max-height, ${w})`;
  }
  setDimensions(t, e) {
    let i, s = this.width, r = this.height;
    if (!t || !e) {
      const o = this.getBoundingClientRect(), l = this.parentElement.getBoundingClientRect();
      e = o.height ? o.height : l.height ? l.height : Ft, t = o.width ? o.width : l.width ? l.width : li;
    }
    return i = {
      width: this.width,
      height: this.height,
      resizeW: t / s,
      resizeH: e / r,
      resizeWDiff: t - s,
      resizeHDiff: e - r
    }, this.setWidth(t), this.setHeight(e), i;
  }
  setUtilsLocation(t = this.#c?.utils?.location) {
    switch (this.#c.utils = this.#c.utils || {}, t) {
      case "none":
      case !1:
        this.#c.utils.location = "none", this.#c.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${Ft}px`;
        break;
      case "top":
      default:
        this.#c.utils.location = "top", this.#c.utils.height = _t, this.elUtils.style.display = "block", this.elUtils.style.height = `${_t}px`, this.elBody.style.height = `calc(100% - ${_t}px)`, this.elBody.style.minHeight = `${Ft - _t}px`;
    }
  }
}
const Ql = [
  {
    id: "indicators",
    name: "Indicators",
    icon: xl,
    event: "utils_indicators",
    sub: []
  },
  {
    id: "timezone",
    name: "Timezone",
    icon: wl,
    event: "utils_timezone"
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: yl,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: yr,
    event: "utils_settings"
  }
];
class Jl {
  #t = "Utilities";
  #e = "utils";
  #r;
  #s;
  #i;
  #n;
  #o;
  #h;
  #l = {};
  #a = {};
  #c;
  #u = {};
  constructor(t, e) {
    this.#r = t, this.#s = e, this.#i = t.elUtils, this.#n = t.config?.utilsBar || Ql, this.#o = t.WidgetsG, this.#h = t.indicatorClasses || dr, this.init();
  }
  log(t) {
    this.#r.log(t);
  }
  info(t) {
    this.#r.info(t);
  }
  warn(t) {
    this.#r.warn(t);
  }
  error(t) {
    this.#r.error(t);
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#e;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#s;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#i);
  }
  get stateMachine() {
    return this.#c;
  }
  init() {
    this.#i.innerHTML = this.#i.defaultNode(this.#n), this.log(`${this.#t} instantiated`);
  }
  start() {
    this.initAllUtils(), this.eventsListen();
  }
  destroy() {
    const t = this.#r, e = R.findBySelectorAll(`#${t.id} .${oa} .icon-wrapper`);
    for (let i of e) {
      let s = i.id.replace("TX_", "");
      for (let r of this.#n)
        r.id === s && i.removeEventListener("click", this.#a[s].click), i.removeEventListener("pointerover", this.#a[s].pointerover), i.removeEventListener("pointerout", this.#a[s].pointerout);
    }
    this.off("utils_indicators", this.onIndicators), this.off("utils_timezone", this.onTimezone), this.off("utils_settings", this.onSettings), this.off("utils_screenshot", this.onScreenshot);
  }
  eventsListen() {
    this.on("utils_indicators", this.onIndicators, this), this.on("utils_timezone", this.onTimezone, this), this.on("utils_settings", this.onSettings, this), this.on("utils_screenshot", this.onScreenshot, this);
  }
  on(t, e, i) {
    this.#r.on(t, e, i);
  }
  off(t, e) {
    this.#r.off(t, e);
  }
  emit(t, e) {
    this.#r.emit(t, e);
  }
  onIconClick(t) {
    const e = R.findTargetParentWithClass(t.target, "icon-wrapper");
    if (!S(e))
      return !1;
    const i = Date.now();
    if (i - this.#u[e.id] < 1e3)
      return !1;
    this.#u[e.id] = i;
    let s = e.dataset.event, r = e.dataset.menu || !1, o = {
      target: e.id,
      menu: r,
      evt: s
    };
    this.emit(s, o), r ? this.emit("menu_open", o) : this.emit("util_selected", o);
  }
  onIconOver(t) {
    const e = t.currentTarget.querySelector("svg");
    e.style.fill = ee.COLOUR_ICONHOVER;
  }
  onIconOut(t) {
    const e = t.currentTarget.querySelector("svg");
    e.style.fill = ee.COLOUR_ICON;
  }
  initAllUtils() {
    const t = this.#i.querySelectorAll(".icon-wrapper");
    for (let e of t) {
      this.#u[e.id] = 0;
      let i = e.id.replace("TX_", ""), s = e.querySelector("svg");
      s.style.fill = ee.COLOUR_ICON, s.style.height = "90%";
      for (let r of this.#n)
        if (r.id === i && (this.#a[i] = {}, this.#a[i].click = this.onIconClick.bind(this), this.#a[i].pointerover = this.onIconOver.bind(this), this.#a[i].pointerout = this.onIconOut.bind(this), e.addEventListener("click", this.#a[i].click), e.addEventListener("pointerover", this.#a[i].pointerover), e.addEventListener("pointerout", this.#a[i].pointerout), i === "indicators" && (r.sub = Object.values(this.#h)), r?.sub)) {
          let o = {
            content: r.sub,
            primary: e
          }, l = this.#o.insert("Menu", o);
          e.dataset.menu = l.id, l.start();
        }
    }
  }
  onIndicators(t) {
  }
  onTimezone(t) {
    this.#r.notImplemented();
  }
  onSettings(t) {
    this.#r.notImplemented();
  }
  onScreenshot(t) {
    this.#r.notImplemented();
  }
}
class wt {
  static #t = 0;
  static #e = {};
  static create(t, e) {
    const i = ++wt.#t;
    e.cnt = i, e.modID = `${e.toolID}_${i}`, e.toolID = e.modID, e.target = t;
    const s = new e.tool(e);
    return wt.#e[i] = s, t.chartToolAdd(s), s;
  }
  static destroy(t) {
    if (t instanceof wt) {
      const e = t.inCnt;
      delete wt.#e[e];
    }
  }
  #r;
  #s = null;
  #i = "Line Tool";
  #n = "TX_Tool";
  #o;
  #h;
  #l;
  #a;
  #c;
  #u;
  #d;
  #f;
  #v;
  #y;
  #m = [0, 0];
  #x = !1;
  #p;
  constructor(t) {
    this.#h = t, this.#s = t.cnt, this.#r = this.#h.ID || Q("TX_Tool_"), this.#i = t.name, this.#l = t.core, this.#u = t.elements.elChart, this.#a = { ...t.parent }, this.#y = t.target, this.#y.addTool(this), this.#f = this.#v.viewport, this.#d = this.#f.scene.canvas, this.#p = t.pos;
  }
  set id(t) {
    this.#r = String(t).replace(/ |,|;|:|\.|#/g, "_");
  }
  get id() {
    return this.#r ? `${this.#r}` : `${this.#l.id}-${this.#n}_${this.#s}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get inCnt() {
    return this.#s;
  }
  get name() {
    return this.#i;
  }
  get shortName() {
    return this.#n;
  }
  get core() {
    return this.#l;
  }
  get stateMachine() {
    return this.#l.stateMachine;
  }
  get state() {
    return this.#l.getState();
  }
  get data() {
    return this.#l.chartData;
  }
  get range() {
    return this.#l.range;
  }
  get target() {
    return this.#y;
  }
  set layerTool(t) {
    this.#v = t;
  }
  get layerTool() {
    return this.#v;
  }
  get elViewport() {
    return this.#f;
  }
  get cursorPos() {
    return this.#m;
  }
  get cursorActive() {
    return this.#x;
  }
  get cursorClick() {
    return this.#p;
  }
  get candleW() {
    return this.#l.Timeline.candleW;
  }
  get theme() {
    return this.#l.theme;
  }
  get config() {
    return this.#l.config;
  }
  get scrollPos() {
    return this.#l.scrollPos;
  }
  get bufferPx() {
    return this.#l.bufferPx;
  }
  end() {
    this.stop();
  }
  stop() {
    this.#c.off("mousemove", this.onMouseMove);
  }
  eventsListen() {
    this.#c = new Nt(this.#d, { disableContextMenu: !1 }), this.#c.on("mousemove", this.onMouseMove.bind(this));
  }
  on(t, e, i) {
    this.#l.on(t, e, i);
  }
  off(t, e) {
    this.#l.off(t, e);
  }
  emit(t, e) {
    this.#l.emit(t, e);
  }
  onMouseMove(t) {
    this.#m = [Math.round(t.position.x), Math.round(t.position.y)], this.emit("tool_mousemove", this.#m);
  }
  createViewport() {
    this.config.buffer || BUFFERSIZE, this.#f.getBoundingClientRect().width, this.#o.chartH || this.#a.rowsH - 1;
  }
  draw() {
  }
}
class tc extends wt {
  constructor(t) {
    super(t);
  }
}
class ec extends wt {
  constructor(t) {
    super(t);
  }
}
class ic extends wt {
  constructor(t) {
    super(t);
  }
}
class sc extends wt {
  constructor(t) {
    super(t);
  }
}
const nc = [
  {
    id: "cursor",
    name: "Cursor",
    icon: El,
    event: "tool_activated"
  },
  {
    id: "line",
    name: "Line",
    icon: ti,
    event: "tool_activated"
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: Sl,
    event: "tool_activated",
    class: tc,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: ti
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: bl,
    event: "tool_activated",
    class: ic,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: ti
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: Ml,
    event: "tool_activated",
    class: sc,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: ti
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: Cl,
    event: "tool_activated",
    class: ec
  },
  {
    id: "delete",
    name: "Delete",
    icon: Tl,
    event: "tool_activated",
    class: void 0
  }
], zi = {
  id: "template",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(n) {
        console.log("idle: onEnter");
      },
      onExit(n) {
        console.log("idle: onExit");
      },
      on: {
        tool_activated: {
          target: "tool_activated",
          action(n) {
            this.context.origin.onToolActivated(n);
          }
        }
      }
    },
    tool_activated: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        tool_targetSelected: {
          target: "tool_addToTarget",
          action(n) {
            this.context.origin.onToolTargetSelected(n);
          }
        }
      }
    },
    tool_addToTarget: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        always: {
          target: "idle",
          condition: "toolTarget",
          action(n) {
            this.context.origin.addNewTool();
          }
        }
      }
    }
  },
  guards: {
    toolTarget() {
      return !0;
    }
  }
};
class rc {
  #t;
  #e = "Toolbar";
  #r = "tools";
  #s;
  #i;
  #n;
  #o;
  #h;
  #l = wt;
  #a;
  #c = {};
  #u = void 0;
  #d;
  #f = { click: [], pointerover: [] };
  constructor(t, e) {
    this.#s = t, this.#i = e, this.#o = t.elTools, this.#a = nc || t.config.tools, this.#h = t.WidgetsG, this.init();
  }
  log(t) {
    this.#s.log(t);
  }
  info(t) {
    this.#s.info(t);
  }
  warn(t) {
    this.#s.warn(t);
  }
  error(t) {
    this.#s.error(t);
  }
  set id(t) {
    this.#t = String(t).replace(/ |,|;|:|\.|#/g, "_");
  }
  get id() {
    return this.#t ? `${this.#t}` : `${this.#s.id}-${this.#r}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#r;
  }
  get core() {
    return this.#s;
  }
  get options() {
    return this.#i;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#o);
  }
  set stateMachine(t) {
    this.#n = new kt(t, this);
  }
  get stateMachine() {
    return this.#n;
  }
  init() {
    this.mount(this.#o), this.log(`${this.#e} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), zi.id = this.id, zi.context = this, this.stateMachine = zi, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy();
    const t = this.#o.querySelectorAll(".icon-wrapper");
    for (let e of t)
      for (let i of this.#a)
        i.id === id && e.removeEventListener("click", this.#f[id].click), e.removeEventListener("pointerover", this.#f[id].pointerover), e.removeEventListener("pointerout", this.#f[id].pointerout);
    this.off("tool_selected", this.onToolSelect), this.off("tool_deselected", this.onToolDeselect);
  }
  eventsListen() {
    this.on("tool_selected", this.onToolSelect, this), this.on("tool_deselected", this.onToolDeselect, this);
  }
  on(t, e, i) {
    this.#s.on(t, e, i);
  }
  off(t, e) {
    this.#s.off(t, e);
  }
  emit(t, e) {
    this.#s.emit(t, e);
  }
  onIconClick(t) {
    t.currentTarget.dataset.event;
    let e = t.currentTarget.dataset.menu || !1, i = {
      target: t.currentTarget.id,
      menu: e,
      evt: t.currentTarget.dataset.event,
      tool: t.currentTarget.dataset.tool
    };
    e ? this.emit("menu_open", i) : this.emit("menuItem_selected", i);
  }
  onIconOut(t) {
    const e = t.currentTarget.querySelector("svg");
    e.style.fill = It.COLOUR_ICON;
  }
  onIconOver(t) {
    const e = t.currentTarget.querySelector("svg");
    e.style.fill = It.COLOUR_ICONHOVER;
  }
  onToolTargetSelected(t) {
    console.log("tool_targetSelected:", t.target), this.#d = t.target;
  }
  onToolActivated(t) {
    console.log("Tool activated:", t), this.#u = t;
  }
  onToolSelect(t) {
  }
  onToolDeselect(t) {
  }
  mount(t) {
    t.innerHTML = this.#o.defaultNode(this.#a);
  }
  initAllTools() {
    const t = this.#o.querySelectorAll(".icon-wrapper");
    for (let e of t) {
      let i = e.id, s = e.querySelector("svg");
      s.style.fill = It.COLOUR_ICON, s.style.width = "90%";
      for (let r of this.#a)
        if (r.id === i)
          if (this.#f[i] = {}, this.#f[i].click = this.onIconClick.bind(this), this.#f[i].pointerover = this.onIconOver.bind(this), this.#f[i].pointerout = this.onIconOut.bind(this), e.addEventListener("click", this.#f[i].click), e.addEventListener("pointerover", this.#f[i].pointerover), e.addEventListener("pointerout", this.#f[i].pointerout), r?.sub) {
            let o = {
              content: r.sub,
              primary: e
            }, l = this.#h.insert("Menu", o);
            e.dataset.menu = l.id, l.start();
            for (let c of r.sub)
              this.#c[c.id] = c.class;
          } else
            this.#c[r.id] = r.class;
    }
  }
  addTool(t = this.#u, e = this.#d) {
    let i = {
      name: t,
      tool: this.#c[t],
      pos: e.cursorClick
    }, s = this.#l.create(e, i);
    return s.start(), console.log(s), s;
  }
  addNewTool(t, e) {
    let i = this.addTool(t, e);
    this.activeTool = i, this.emit("tool_active", i), this.emit(`tool_${i.id}_active`, i);
  }
  addAllTools() {
  }
}
const oc = 150;
class dt {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h;
  #l;
  #a = {};
  static menuList = {};
  static menuCnt = 0;
  static class = Ks;
  static name = "Menus";
  static type = "menu";
  static currentActive;
  constructor(t, e) {
    this.#e = t, this.#r = e.core, this.#s = e, this.#t = e.id, this.#n = t.elements.elMenus, this.#i = this.#r.elWidgetsG, this.init();
  }
  static create(t, e) {
    const i = `menu_${++dt.menuCnt}`;
    return e.id = i, dt.menuList[i] = new dt(t, e), dt.menuList[i];
  }
  static destroy(t) {
    dt.menuList[t].end(), delete dt.menuList[t];
  }
  get el() {
    return this.#o;
  }
  get id() {
    return this.#t;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#o);
  }
  init() {
    this.mount(this.#n);
  }
  start() {
    this.position(this.#s.primary), this.eventsListen();
  }
  end() {
    this.#n.querySelectorAll(`#${this.id} li`).forEach((e) => {
      e.removeEventListener("click", this.#a[this.id][e.id]);
    }), document.removeEventListener("click", this.#a[this.id].outside);
  }
  eventsListen() {
    const t = this.#n.querySelectorAll(`#${this.id} li`);
    this.#a[this.id] = {}, t.forEach((e) => {
      this.#a[this.id][e.id] = this.onMenuSelect.bind(this), e.addEventListener("click", this.#a[this.id][e.id]);
    });
  }
  on(t, e, i) {
    this.#r.on(t, e, i);
  }
  off(t, e) {
    this.#r.off(t, e);
  }
  emit(t, e) {
    this.#r.emit(t, e);
  }
  onMenuSelect(t) {
    let e = t.currentTarget.dataset.event, i = {
      target: t.currentTarget.id,
      menu: this.#t,
      evt: e
    };
    this.emit("menuItem_selected", i), this.emit("menu_close", i), console.log("menu_close");
  }
  onOutsideClickListener(t) {
    if (!this.#o.contains(t.target) && !this.#s.primary.contains(t.target) && R.isVisible(this.#o)) {
      let e = {
        target: t.currentTarget.id,
        menu: this.#t
      };
      this.emit("menu_close", e);
    }
    document.removeEventListener("click", this.#a[this.id].outside);
  }
  mount(t) {
    t.lastElementChild == null ? t.innerHTML = this.menuNode() : t.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#o = this.#n.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${Ks}" style=""></div>
    `;
  }
  menuNode() {
    const t = this.#s, e = `position: absolute; z-index: 1000; display: none; border: 1px solid ${Ni.COLOUR_BORDER}; background: ${Ni.COLOUR_BG}; color: ${Ni.COLOUR_TXT};`;
    let i = this.content(t);
    return `
      <div id="${t.id}" class="${aa}" style="${e}">
        ${i}
      </div>
    `;
  }
  content(t) {
    const e = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${oc}px`, i = "padding: .25em 1em .25em 1em; white-space: nowrap;", s = "display: inline-block; width: 4em;", r = "cursor: pointer;", o = `onmouseover="this.style.background ='#222'"`, l = `onmouseout="this.style.background ='none'"`;
    let c = `<ul style="${e}">`;
    if (t?.content)
      for (let f of t.content)
        c += `<li id="${f.id}" data-event="${f.event}" style="${i} ${r}" ${o} ${l}><a style="${r}"><span style="${s}">${f.id}</span><span>${f.name}</span></li></a>`;
    return c += "</ul>", c;
  }
  position(t) {
    let e = this.#i.getBoundingClientRect(), i = t.getBoundingClientRect();
    this.#o.style.left = Math.round(i.left - e.left) + "px", this.#o.style.top = Math.round(i.bottom - e.top) + "px";
  }
  remove() {
  }
  open() {
    if (dt.currentActive === this)
      return !0;
    dt.currentActive = this, this.#o.style.display = "block";
    let t = R.elementDimPos(this.#o);
    if (t.left + t.width > this.#i.offsetWidth) {
      let i = Math.floor(this.#i.offsetWidth - t.width);
      i = et(i, 0, this.#i.offsetWidth), this.#o.style.left = `${i}px`;
    }
    setTimeout(() => {
      this.#a[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#a[this.id].outside);
    }, 250);
  }
  close() {
    dt.currentActive = null, this.#o.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class ot {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h;
  #l;
  #a = {};
  static windowList = {};
  static windowCnt = 0;
  static class = Js;
  static name = "Windows";
  static type = "window";
  static currentActive = null;
  constructor(t, e) {
    this.#e = t, this.#r = e.core, this.#s = e, this.#t = e.id, this.#n = t.elements.elWindows, this.#i = this.#r.elWidgetsG, this.init();
  }
  static create(t, e) {
    const i = `window_${++ot.windowCnt}`;
    return e.id = i, ot.windowList[i] = new ot(t, e), ot.windowList[i];
  }
  static destroy(t) {
    ot.windowList[t].end(), delete ot.windowList[t];
  }
  get el() {
    return this.#o;
  }
  get id() {
    return this.#t;
  }
  get pos() {
    return this.dimensions;
  }
  get config() {
    return this.#s;
  }
  set config(t) {
    this.#s = t;
  }
  get dimensions() {
    return R.elementDimPos(this.#o);
  }
  init() {
    this.mount(this.#n);
  }
  start() {
    this.eventsListen(), this.open();
  }
  destroy() {
    document.removeEventListener("click", this.onOutsideClickListener);
  }
  eventsListen() {
    this.#r, this.on("closeWindow", (t) => {
      t.window === this.#t && this.close();
    });
  }
  on(t, e, i) {
    this.#r.on(t, e, i);
  }
  off(t, e) {
    this.#r.off(t, e);
  }
  emit(t, e) {
    this.#r.emit(t, e);
  }
  onOutsideClickListener(t) {
    if (!this.#o.contains(t.target) && R.isVisible(this.#o)) {
      let e = {
        target: t.currentTarget.id,
        window: this.#t
      };
      this.emit("closeWindow", e), document.removeEventListener("click", this.#a.click);
    }
  }
  mount(t) {
    this.#r, t.lastElementChild == null ? t.innerHTML = this.windowNode() : t.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#o = this.#n.querySelector(`#${this.#s.id}`);
    let e, i;
    if (this.#s.x && this.#s.y)
      e = this.#s.x, i = this.#s.y;
    else {
      let s = R.elementDimPos(this.#o);
      e = (this.#r.width - s.width) / 2, i = (this.#r.height - s.height) / 2;
    }
    this.#o.style.bottom = `${i}px`, this.#o.style.left = `${e}px`;
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${Js}" style=""></div>
    `;
  }
  windowNode() {
    const t = this.#s, e = `position: absolute; z-index: 1000; display: block; border: 1px solid ${$i.COLOUR_BORDER}; background: ${$i.COLOUR_BG}; color: ${$i.COLOUR_TXT};`;
    let i = this.dragBar(t), s = this.content(t), r = this.closeIcon(t);
    return `
      <div id="${t.id}" class="${ha}" style="${e}">
          ${i}
          ${r}
          ${s}
        </div>
      </div>
    `;
  }
  content(t) {
    const e = "padding: 2em;";
    let i = t?.content ? t.content : "";
    return `
      <div class="content" style="${e}">
        ${i}
      </div>
    `;
  }
  dragBar(t) {
    const e = "cursor: grab;", i = `onmouseover="this.style.background ='#222'"`, s = `onmouseout="this.style.background ='none'"`, r = `${e}`;
    let o = "";
    return t.dragBar && (o += `
      <div class="dragBar" ${r} ${i} ${s}>
      </div>
    `), o;
  }
  closeIcon(t) {
    const e = "cursor: pointer;", i = `onmouseover="this.style.background ='#222'"`, s = `onmouseout="this.style.background ='none'"`, r = `${e}`;
    let o = "";
    return t.closeIcon && (o += `
      <div class="closeIcon" ${r} ${i} ${s}>
        <span>X</span>
      </div>
    `), o;
  }
  position(t) {
    let e = this.#i.getBoundingClientRect(), i = t.getBoundingClientRect();
    this.#o.style.left = Math.round(i.left - e.left) + "px", this.#o.style.top = Math.round(i.bottom - e.top) + "px";
  }
  remove() {
  }
  open() {
    if (ot.currentActive === this)
      return !0;
    ot.currentActive = this, this.#o.style.display = "block", this.emit("window_opened", this.id), setTimeout(() => {
      this.#a.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#a.click);
    }, 250);
  }
  close() {
    ot.currentActive = null, this.#o.style.display = "none", this.emit("window_closed", this.id);
  }
}
class ac extends ot {
  static type = "window";
  constructor(t, e) {
    super(), e.dragbar = !0, e.close = tue, this.config = e;
  }
}
const Wi = {
  id: "widgets",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        menu_open: {
          target: "menu_open",
          action(n) {
          }
        },
        window_open: {
          target: "window_open",
          action(n) {
          }
        }
      }
    },
    menu_open: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        menu_close: {
          target: "idle",
          action(n) {
          }
        }
      }
    },
    window_open: {
      onEnter(n) {
      },
      onExit(n) {
      },
      on: {
        window_close: {
          target: "idle",
          action(n) {
          }
        }
      }
    }
  }
};
class hc {
  #t;
  #e = "Widgets";
  #r = "widgets";
  #s;
  #i;
  #n;
  #o;
  #h = { Dialogue: ac, Divider: xt, Menu: dt, Window: ot };
  #l = {};
  #a = {};
  #c;
  #u;
  #d;
  constructor(t, e) {
    this.#s = t, this.#i = e, this.#o = { ...this.#h, ...e.widgets }, this.#c = t.elWidgetsG, this.init();
  }
  log(t) {
    this.#s.log(t);
  }
  info(t) {
    this.#s.info(t);
  }
  warn(t) {
    this.#s.warn(t);
  }
  error(t) {
    this.#s.error(t);
  }
  set id(t) {
    this.#t = String(t).replace(/ |,|;|:|\.|#/g, "_");
  }
  get id() {
    return this.#t ? `${this.#t}` : `${this.#s.id}-${this.#r}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#r;
  }
  get core() {
    return this.#s;
  }
  get options() {
    return this.#i;
  }
  get elements() {
    return this.#a;
  }
  get instances() {
    return this.#l;
  }
  set stateMachine(t) {
    this.#n = new kt(t, this);
  }
  get stateMachine() {
    return this.#n;
  }
  init() {
    this.mount(this.#c);
    for (let t in this.#o) {
      let e = this.#o[t], i = `el${e.name}`;
      this.#a[i] = this.#c.querySelector(`.${e.class}`);
    }
  }
  start() {
    this.eventsListen(), Wi.id = this.id, Wi.context = this, this.stateMachine = Wi, this.stateMachine.start();
  }
  destroy() {
    this.off("menu_open", this.onOpenMenu), this.off("menu_close", this.onCloseMenu), this.off("menu_off", this.onCloseMenu), this.off("menuItem_selected", this.onMenuItemSelected), this.stateMachine.destroy();
  }
  eventsListen() {
    this.on("menu_open", this.onOpenMenu, this), this.on("menu_close", this.onCloseMenu, this), this.on("menu_off", this.onCloseMenu, this), this.on("menuItem_selected", this.onMenuItemSelected, this);
  }
  on(t, e, i) {
    this.#s.on(t, e, i);
  }
  off(t, e) {
    this.#s.off(t, e);
  }
  emit(t, e) {
    this.#s.emit(t, e);
  }
  onResize(t) {
    this.setDimensions(t);
  }
  onOpenMenu(t) {
    this.#l[t.menu].open();
  }
  onCloseMenu(t) {
    this.#l[t.menu].close();
  }
  onMenuItemSelected(t) {
    this.emit(t.evt, t.target);
  }
  mount(t) {
    t.innerHTML = this.defaultNode();
  }
  setWidth(t) {
    this.#u = t;
  }
  setHeight(t) {
    this.#d = t;
  }
  setDimensions(t) {
    this.setWidth(t.mainW), this.setHeight(t.mainH);
  }
  defaultNode() {
    let t = "", e = [];
    for (let i in this.#o) {
      let s = this.#o[i];
      e.indexOf(s.type) === -1 && (t += s.defaultNode(), e.push(s.type));
    }
    return t;
  }
  insert(t, e) {
    e.core = this.core;
    const i = this.#o[t].create(this, e);
    return this.#l[i.id] = i, i;
  }
  remove(t, e) {
    delete this.#l[e], this.#o[t].destroy(e);
  }
}
class L extends Kl {
  static #t = fo;
  static #e = 0;
  static #r = {};
  static #s = {};
  static #i = null;
  static #n = !1;
  static #o = [];
  static #h = null;
  static get version() {
    return L.#t;
  }
  static get talibPromise() {
    return L.#i;
  }
  static get talibReady() {
    return L.#n;
  }
  static get talibAwait() {
    return L.#o;
  }
  static get talibError() {
    return L.#h;
  }
  static #l = `${pe} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
  static #a = [
    "TradeXchart",
    "Chart",
    "MainPane",
    "Secondary",
    "Primary",
    "ScaleBar",
    "Timeline",
    "ToolsBar",
    "UtilsBar",
    "Widgets"
  ];
  #c = pe;
  #u = xe;
  #d;
  #f;
  #v;
  #y;
  #m;
  #x;
  #p;
  #S;
  #P;
  #g;
  #C;
  #b;
  #I = !1;
  #E = null;
  #T = {};
  #R = I;
  #M;
  #w;
  #D = dr;
  #O;
  #_;
  #B;
  chartWMin = li;
  chartHMin = Ft;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = B.COLOUR_BG;
  chartTxtColour = B.COLOUR_TXT;
  chartBorderColour = B.COLOUR_BORDER;
  utilsH = _t;
  toolsW = Ot;
  timeH = di;
  scaleW = se;
  #L;
  #z;
  #A = {
    chart: {},
    time: {}
  };
  #W;
  panes = {
    utils: this.#L,
    tools: this.#z,
    main: this.#A
  };
  #k = {
    range: {},
    timeFrameMS: 0,
    timeFrame: "undefined",
    timeZone: "",
    indexed: !1
  };
  logs = !1;
  infos = !1;
  warnings = !1;
  errors = !1;
  timer = !1;
  #N = 0;
  #j = 0;
  #F = { x: 0, y: 0 };
  #X = [!1, !1, !1];
  #V;
  #$;
  #G;
  #Y;
  #q;
  #H = !1;
  #U = !1;
  static create(t = {}) {
    L.#e == 0 && (L.#r.CPUCores = navigator.hardwareConcurrency, L.#r.api = {
      permittedClassNames: L.#a
    }), (typeof t.talib != "object" || typeof t.talib.init != "function") && (L.#n = !1, L.#h = new Error(`${L.#l}`)), !L.#n && L.#h === null && (L.#i = t.talib.init(t.wasm)), L.#i.then(
      () => {
        L.#n = !0;
        for (let e of L.#o)
          k(e) && e();
      },
      () => {
        L.#n = !1;
      }
    );
  }
  static destroy(t) {
    if (t instanceof L) {
      t.end();
      const e = t.inCnt;
      delete L.#s[e];
    }
  }
  static cnt() {
    return L.#e++;
  }
  constructor() {
    super(), this.#E = L.cnt(), console.warn(`!WARNING!: ${pe} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${xe} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#V = ir;
  }
  log(t) {
    this.logs && console.log(t);
  }
  info(t) {
    this.infos && console.info(t);
  }
  warn(t) {
    this.warnings && console.warn(t);
  }
  error(t) {
    this.errors && console.error(t);
  }
  time(t) {
    this.timer && console.time(t);
  }
  timeLog(t) {
    this.timer && console.timeLog(t);
  }
  timeEnd(t) {
    this.timer && console.timeEnd(t);
  }
  get name() {
    return this.#c;
  }
  get shortName() {
    return this.#u;
  }
  get options() {
    return this.#v;
  }
  get config() {
    return this.#f;
  }
  get core() {
    return this.#d;
  }
  get inCnt() {
    return this.#E;
  }
  set elUtils(t) {
    this.#m = t;
  }
  get elUtils() {
    return this.#m;
  }
  set elTools(t) {
    this.#p = t;
  }
  get elTools() {
    return this.#p;
  }
  set elBody(t) {
    this.#x = t;
  }
  get elBody() {
    return this.#x;
  }
  set elMain(t) {
    this.#S = t;
  }
  get elMain() {
    return this.#S;
  }
  set elTime(t) {
    this.#g = t;
  }
  get elTime() {
    return this.#g;
  }
  set elYAxis(t) {
    this.#C = t;
  }
  get elYAxis() {
    return this.#C;
  }
  set elWidgetsG(t) {
    this.#b = t;
  }
  get elWidgetsG() {
    return this.#b;
  }
  get UtilsBar() {
    return this.#L;
  }
  get ToolsBar() {
    return this.#z;
  }
  get MainPane() {
    return this.#A;
  }
  get Timeline() {
    return this.#A.time;
  }
  get WidgetsG() {
    return this.#W;
  }
  get Chart() {
    return this.#A.chart;
  }
  get ChartPanes() {
    return this.#A.chartPanes;
  }
  get Indicators() {
    return this.#A.indicators;
  }
  get ready() {
    return this.#I;
  }
  get state() {
    return this.#M;
  }
  get allData() {
    return {
      data: this.state.data.chart.data,
      primaryPane: this.state.data.secondary,
      secondaryPane: this.state.data.secondary,
      datasets: this.state.data.datasets
    };
  }
  get rangeLimit() {
    return v(this.#w.initialCnt) ? this.#w.initialCnt : la;
  }
  get range() {
    return this.#w;
  }
  get time() {
    return this.#k;
  }
  get TimeUtils() {
    return Do;
  }
  get theme() {
    return this.#_;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#D;
  }
  get TALib() {
    return this.#O;
  }
  get TALibReady() {
    return L.talibReady;
  }
  get TALibError() {
    return L.talibError;
  }
  get talibAwait() {
    return L.talibAwait;
  }
  get TALibPromise() {
    return L.talibPromise;
  }
  get hub() {
    return this.#T;
  }
  get candleW() {
    return this.Timeline.candleW;
  }
  get candlesOnLayer() {
    return this.Timeline.candlesOnLayer;
  }
  get buffer() {
    return this.MainPane.buffer;
  }
  get bufferPx() {
    return this.MainPane.bufferPx;
  }
  set scrollPos(t) {
    this.setScrollPos(t);
  }
  get scrollPos() {
    return this.#N;
  }
  get smoothScrollOffset() {
    return 0;
  }
  get rangeScrollOffset() {
    return Math.floor(this.bufferPx / this.candleW);
  }
  get mousePos() {
    return this.#F;
  }
  get pointerButtons() {
    return this.#X;
  }
  get pricePrecision() {
    return this.#Y;
  }
  get volumePrecision() {
    return this.#q;
  }
  set stream(t) {
    return this.setStream(t);
  }
  get stream() {
    return this.#$;
  }
  get worker() {
    return this.#V;
  }
  get isEmpty() {
    return this.#M.IsEmpty;
  }
  set candles(t) {
    S(t) && (this.#G = t);
  }
  get candles() {
    return this.#G;
  }
  start(t) {
    this.log(`${pe} configuring...`), L.create(t);
    const e = { ...t };
    this.logs = e?.logs ? e.logs : !1, this.infos = e?.infos ? e.infos : !1, this.warnings = e?.warnings ? e.warnings : !1, this.errors = e?.errors ? e.errors : !1, this.timer = e?.timer ? e.timer : !1, this.#f = e, this.#E = e.cnt || this.#E, this.#O = e.talib, this.#y = this, this.#d = this;
    const i = T(e?.id) ? e.id : null;
    this.setID(i), this.classList.add(this.id), this.log("processing state...");
    let s = it(e?.state) || {};
    s.id = this.id, s.core = this;
    let r = e?.deepValidate || !1, o = e?.isCrypto || !1;
    this.#M = this.#R.create(s, r, o), delete e.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let l = "1s", c = $;
    if (!S(e?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${pe} has no chart data or streaming provided.`), { tf: l, ms: c } = ei(e?.timeFrame)) : S(e?.stream) && this.state.data.chart.data.length < 2 ? ({ tf: l, ms: c } = ei(e?.timeFrame), this.#H = !0) : (l = this.state.data.chart.tf, c = this.state.data.chart.tfms), this.log(`tf: ${l} ms: ${c}`), this.#f.callbacks = this.#f.callbacks || {}, S(e))
      for (const p in e)
        p in this.props() && this.props()[p](e[p]);
    const f = "range" in e ? e.range : {};
    if (f.interval = c, f.core = this, this.getRange(null, null, f), this.#w.Length > 1) {
      const p = ra(this.#k, this.#f?.range?.startTS), x = p ? p + this.#w.initialCnt : this.allData.data.length - 1, C = p || x - this.#w.initialCnt;
      this.#w.initialCnt = x - C, this.setRange(C, x);
    }
    this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#W = new hc(this, { widgets: e?.widgets }), this.#L = new Jl(this, e), this.#z = new rc(this, e), this.#A = new vr(this, e), this.setTheme(this.#B.id), this.log(`${this.#c} V${L.version} configured and running...`), this.#N = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.stream = this.#f.stream, this.#H && this.on(Et, this.delayedSetRange, this), this.#I = !0, this.refresh();
  }
  destroy() {
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.#T = null, this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#V.end(), this.#R = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(Et, this.onStreamUpdate, this);
  }
  on(t, e, i) {
    return !T(t) || !k(e) ? !1 : (this.#T[t] || (this.#T[t] = []), this.#T[t].push({ handler: e, context: i }), !0);
  }
  off(t, e) {
    if (!T(t) || !k(e) || !(t in this.#T))
      return !1;
    for (let i = 0; i < this.#T[t].length; i++)
      if (this.#T[t][i].handler === e && (this.#T[t].splice(i, 1), this.#T[t].length === 0)) {
        delete this.#T[t];
        break;
      }
    return !0;
  }
  emit(t, e) {
    T(t) && (this.#T[t] || []).forEach((i) => i.handler.call(i.context, e));
  }
  execute(t, e, i) {
  }
  onMouseMove(t) {
    this.#F.x = t.clientX, this.#F.y = t.clientY;
  }
  onStreamUpdate(t) {
    const e = this.range;
    if (e.inRange(t[0])) {
      const i = e.valueMax, s = e.valueMin;
      (t[2] > i || t[3] < s) && (this.setRange(e.indexStart, e.indexEnd), this.emit("chart_yAxisRedraw", this.range));
    }
  }
  props() {
    return {
      width: (t) => this.setWidth(t),
      height: (t) => this.setHeight(t),
      widthMin: (t) => this.setWidthMin(t),
      heightMin: (t) => this.setHeightMin(t),
      widthMax: (t) => this.setWidthMax(t),
      heightMax: (t) => this.setHeightMax(t),
      logs: (t) => this.logs = G(t) ? t : !1,
      infos: (t) => this.infos = G(t) ? t : !1,
      warnings: (t) => this.warnings = G(t) ? t : !1,
      errors: (t) => this.errors = G(t) ? t : !1,
      indicators: (t) => this.setIndicators(t),
      theme: (t) => {
        this.#B = this.addTheme(t);
      },
      stream: (t) => this.#$ = S(t) ? t : {},
      pricePrecision: (t) => this.setPricePrecision(t),
      volumePrecision: (t) => this.setVolumePrecision(t)
    };
  }
  getInCnt() {
    return this.#E;
  }
  setID(t) {
    T(t) ? this.id = t : this.id = `${Q(xe)}_${this.#E}`;
  }
  setDimensions(t, e) {
    const i = super.setDimensions(t, e);
    this.emit("global_resize", i);
  }
  setUtilsH(t) {
    this.utilsH = t, this.#m.style.height = `${t}px`;
  }
  setToolsW(t) {
    this.toolsW = t, this.#p.style.width = `${t}px`;
  }
  setPricePrecision(t) {
    (!v(t) || t < 0) && (t = ma), this.#Y = t;
  }
  setVolumePrecision(t) {
    (!v(t) || t < 0) && (t = pa), this.#q = t;
  }
  addTheme(t) {
    const e = ut.create(t, this);
    return this.#_ instanceof ut || (this.#_ = e), e;
  }
  setTheme(t) {
    if (!this.theme.list.has(t))
      return !1;
    this.#_.setTheme(t, this);
    const e = this.#_, i = document.querySelector(`style[title=${this.id}_style]`), s = `var(--txc-border-color, ${e.chart.BorderColour}`;
    let r = `.${this.id} { `;
    r += `--txc-background: ${e.chart.Background}; `, this.style.background = `var(--txc-background, ${e.chart.Background})`, this.style.border = `${e.chart.BorderThickness}px solid`, this.style.borderColor = s, r += `--txc-border-color:  ${e.chart.BorderColour}; `, this.#S.rows.style.borderColor = s, r += `--txc-time-scrollbar-color: ${e.chart.BorderColour}; `, r += `--txc-time-handle-color: ${e.xAxis.handle}; `, r += `--txc-time-slider-color: ${e.xAxis.slider}; `, r += `--txc-time-cursor-fore: ${e.xAxis.colourCursor}; `, r += `--txc-time-cursor-back: ${e.xAxis.colourCursorBG}; `, r += `--txc-time-icon-color: ${e.icon.colour}; `, r += `--txc-time-icon-hover-color: ${e.icon.hover}; `, this.#g.overview.scrollBar.style.borderColor = s, this.#g.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${e.xAxis.handle})`, this.#g.overview.style.setProperty("--txc-time-slider-color", e.xAxis.slider), this.#g.overview.style.setProperty("--txc-time-icon-color", e.icon.colour), this.#g.overview.style.setProperty("--txc-time-icon-hover-color", e.icon.hover);
    for (let [o, l] of Object.entries(this.Chart.legend.list))
      l.el.style.color = `var(--txc-legend-color, ${e.legend.colour})`, l.el.style.font = `var(--txc-legend-font, ${e.legend.font})`;
    for (let o of this.#m.icons)
      o.className == "icon-wrapper" && (o.children[0].style.fill = e.icon.colour);
    for (let o of this.#p.icons)
      o.className == "icon-wrapper" && (o.children[0].style.fill = e.icon.colour);
    return r += " }", i.innerHTML = r, !0;
  }
  setScrollPos(t) {
    t = Math.round(t), v(t) && t <= 0 && t >= this.bufferPx * -1 ? this.#N = t : this.emit("Error", "setScrollPos: not a valid value");
  }
  setStream(t) {
    if (this.stream instanceof Kt)
      return this.error("Error: Invoke stopStream() before starting a new one."), !1;
    if (S(t))
      return this.allData.data.length == 0 && T(t.timeFrame) && ({ tf, ms } = ei(t?.timeFrame), this.range.interval = ms, this.range.intervalStr = tf, this.#k.timeFrameMS = ms, this.#k.timeFrame = tf), this.#$ = new Kt(this), this.#f.stream = this.#$.config, this.#$;
  }
  stopStream() {
    this.stream instanceof Kt && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#H; ) {
      let t = this.range.Length * 0.5;
      this.setRange(t * -1, t), this.off(Et, this.delayedSetRange), this.#H = !1;
    }
  }
  updateRange(t) {
    if (!M(t) || !v(t[4]) || t[4] == 0)
      return;
    let e, i;
    e = t[4], i = this.#N + e, i % this.candleW, i < this.bufferPx * -1 ? (i = 0, this.offsetRange(this.rangeScrollOffset * -1)) : i > 0 && (i = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#N = i, this.emit("scrollUpdate", i);
  }
  offsetRange(t) {
    let e = this.range.indexStart - t, i = this.range.indexEnd - t;
    this.setRange(e, i);
  }
  getRange(t = 0, e = 0, i = {}) {
    this.#w = new Yi(t, e, i), this.#k.range = this.#w, this.#k.timeFrameMS = this.#w.interval, this.#k.timeFrame = this.#w.intervalStr;
  }
  setRange(t = 0, e = this.rangeLimit) {
    const i = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#w.set(t, e, i), t < 0 && !this.#U ? this.emit("range_limitPast", { chart: this, start: t, end: e }) : e > this.range.dataLength && !this.#U && this.emit("range_limitFuture", { chart: this, start: t, end: e });
  }
  jumpToIndex(t, e = !0, i = !0) {
    e && (t = et(t, 0, this.range.dataLength));
    let s = this.range.Length, r = t + s;
    i && (t -= s / 2, r -= s / 2), this.setRange(t, r);
  }
  jumpToTS(t, e = !0, i = !0) {
    let s = this.Timeline.xAxis.t2Index(t);
    this.jumpToIndex(s, e = !0, i = !0);
  }
  jumpToStart(t = !1) {
    this.jumpToIndex(0, !0, t);
  }
  jumpToEnd(t = !0) {
    let e = this.range.dataLength - this.range.Length;
    t && (e += this.range.Length / 2), this.jumpToIndex(e, !0, !1);
  }
  mergeData(t, e = !1, i = !0) {
    this.#U = !0;
    let s = this.state.mergeData(t, e, i);
    return G(s) && (this.#U = !1), s;
  }
  isIndicator(t) {
    return !!(typeof t == "function" && "primaryPane" in t.prototype && k(t.prototype?.draw));
  }
  setIndicators(t, e = !1) {
    if (!S(t))
      return !1;
    e && (console.warn("Expunging all default indicators!"), this.#D = {});
    for (const [i, s] of Object.entries(t))
      T(s?.id) && T(s?.name) && T(s?.event) && this.isIndicator(s?.ind) && (this.#D[i] = s);
    return !0;
  }
  addIndicator(t, e = t, i = {}) {
    return this.#A.addIndicator(t, e = t, i = {});
  }
  getIndicator(t) {
    return this.#A.getIndicator(t);
  }
  removeIndicator(t) {
    return this.#A.removeIndicator(t);
  }
  indicatorSettings(t, e) {
    return this.#A.indicatorSettings(t, e);
  }
  hasStateIndicator(t, e = "searchAll") {
    if (!T(t) || !T(e))
      return !1;
    const i = function(s, r) {
      for (let o of r)
        return o?.id == s || o?.name == s;
    };
    if (e == "searchAll") {
      for (let s of this.allData)
        if (i(t, s))
          return !0;
      return !1;
    } else if (e in this.allData)
      return i(t, d);
  }
  calcAllIndicators() {
    for (const [t, e] of Object.entries(this.Indicators))
      for (const [i, s] of Object.entries(e))
        s.instance.calcIndicatorHistory();
  }
  resize(t, e) {
    return !v(t) && !v(e) ? !1 : (this.setDimensions(t, e), !0);
  }
  refresh() {
    if (!this.ready)
      return;
    let t = this.range.indexStart, e = this.range.indexEnd;
    this.setRange(t, e), this.MainPane.draw(void 0, !0);
  }
  notImplemented() {
    if (this.implemented)
      this.implemented.open();
    else {
      let e = { content: `
        This feature is not implemented yet.
      ` };
      this.implemented = this.#W.insert("Dialogue", e), this.implemented.start();
    }
  }
}
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", wh), document.head.insertAdjacentHTML("beforeend", Eh), customElements.get("tradex-chart") || customElements.define("tradex-chart", L));
export {
  L as Chart,
  R as DOM,
  Dt as Indicator,
  Y as Overlay,
  Yi as Range,
  K as canvas,
  it as copyDeep,
  lc as isPromise,
  Se as mergeDeep,
  Q as uid
};
