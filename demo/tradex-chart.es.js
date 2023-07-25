function xo(n, t) {
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
const Eo = "0.132.2";
function b(n) {
  return Array.isArray(n);
}
function D(n) {
  return n && typeof n == "function";
}
function x(n) {
  return typeof n == "object" && !Array.isArray(n) && n !== null;
}
function v(n) {
  return typeof n == "number" && !isNaN(n);
}
function X(n) {
  return typeof n == "boolean";
}
function S(n) {
  return typeof n == "string";
}
function bc(n) {
  return !!n && (x(n) || D(n)) && D(n.then);
}
const To = ["y", "M", "d", "h", "m", "s", "ms"], So = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], Co = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], bo = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], $n = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Mo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Hn = 1231006505e3, Rt = 1, N = 1e3, $ = N * 60, W = $ * 60, R = W * 24, se = R * 7, tt = R * 30;
function Un(n = 3, t = !1) {
  let e = $n[n % 12] * R;
  return t && n > 0 && (e += R), e;
}
const lt = R * 365, Se = {
  y: lt,
  M: tt,
  w: se,
  d: R,
  h: W,
  m: $,
  s: N,
  u: Rt
}, Bn = {
  years: lt,
  months: tt,
  weeks: se,
  days: R,
  hours: W,
  minutes: $,
  seconds: N,
  milliseconds: Rt
}, Po = { ...Se, ...Bn }, Ie = {
  YEARS10: [lt * 10, "years"],
  YEARS5: [lt * 5, "years"],
  YEARS3: [lt * 3, "years"],
  YEARS2: [lt * 2, "years"],
  YEARS: [lt, "years"],
  MONTH6: [tt * 6, "months"],
  MONTH4: [tt * 4, "months"],
  MONTH3: [tt * 3, "months"],
  MONTH2: [tt * 2, "months"],
  MONTH: [tt, "months"],
  DAY15: [R * 15, "years"],
  DAY10: [R * 10, "days"],
  DAY7: [R * 7, "days"],
  DAY5: [R * 5, "days"],
  DAY3: [R * 3, "days"],
  DAY2: [R * 2, "days"],
  DAY: [R, "days"],
  HOUR12: [W * 12, "hours"],
  HOUR6: [W * 6, "hours"],
  HOUR4: [W * 4, "hours"],
  HOUR2: [W * 2, "hours"],
  HOUR: [W, "hours"],
  MINUTE30: [$ * 30, "minutes"],
  MINUTE15: [$ * 15, "minutes"],
  MINUTE10: [$ * 10, "minutes"],
  MINUTE5: [$ * 5, "minutes"],
  MINUTE2: [$ * 2, "minutes"],
  MINUTE: [$, "minutes"],
  SECOND30: [N * 30, "seconds"],
  SECOND15: [N * 15, "seconds"],
  SECOND10: [N * 10, "seconds"],
  SECOND5: [N * 5, "seconds"],
  SECOND2: [N * 2, "seconds"],
  SECOND: [N, "seconds"],
  MILLISECOND500: [Rt * 500, "milliseconds"],
  MILLISECOND250: [Rt * 250, "milliseconds"],
  MILLISECOND100: [Rt * 100, "milliseconds"],
  MILLISECOND50: [Rt * 50, "milliseconds"],
  MILLISECOND: [Rt, "milliseconds"]
}, Lo = () => {
  const n = Object.values(Ie), t = [];
  for (let e = n.length; --e; e > 0)
    t[e] = n[e][0];
  return t;
}, we = Lo(), Ao = () => {
  const n = Object.values(Ie), t = [];
  for (let e = n.length; --e; e > 0)
    t[e] = n[e][1];
  return t;
}, Gi = Ao(), Oo = Object.keys(Ie), Io = () => {
  const n = {};
  for (const [t, e] of Object.entries(Ie))
    n[t] = e[0];
  return n;
}, Ro = Io(), Yi = {
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
function ko() {
  const n = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(Yi, n) ? Yi[n.toString()] : "Etc/UTC";
}
function Do() {
  const n = {};
  for (let t in Se) {
    let e = 0;
    n[t] = [];
    do
      n[t].push(Math.round(Se[t] * e)), e += 0.125;
    while (e < 1);
  }
  return n;
}
function zn(n) {
  const t = new Date(n).getTime();
  return v(t);
}
function Wn(n, t = Hn, e = Date.now()) {
  return zn(n) ? n > t && n < e : !1;
}
const Ot = {
  inSeconds: function(n, t) {
    n = new Date(n), t = new Date(t);
    var e = t.getTime(), i = n.getTime();
    return parseInt((e - i) / N);
  },
  inMinutes: function(n, t) {
    n = new Date(n), t = new Date(t);
    let e = t.getTime(), i = n.getTime();
    return parseInt((e - i) / $);
  },
  inHours: function(n, t) {
    n = new Date(n), t = new Date(t);
    let e = t.getTime(), i = n.getTime();
    return parseInt((e - i) / W);
  },
  inDays: function(n, t) {
    n = new Date(n), t = new Date(t);
    let e = t.getTime(), i = n.getTime();
    return parseInt((e - i) / R);
  },
  inWeeks: function(n, t) {
    n = new Date(n), t = new Date(t);
    let e = t.getTime(), i = n.getTime();
    return parseInt((e - i) / se);
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
function _o(n, t) {
  let e = Ot.inYears(n, t), i = Ot.inMonths(n, t), s = Ot.inWeeks(n, t), r = Ot.inDays(n, t), o = Ot.inHours(n, t), h = Ot.inMinutes(n, t), c = Ot.inSeconds(n, t), f = new Date(t).getTime() - new Date(n).getTime();
  return {
    y: e,
    M: i,
    w: s,
    d: r,
    h: o,
    m: h,
    s: c,
    ms: f,
    years: e,
    months: i,
    weeks: s,
    days: r,
    hours: o,
    minutes: h,
    seconds: c,
    milliseconds: f
  };
}
function ei(n) {
  let t = N;
  return S(n) ? (t = Fn(n), t ? n = n : (t = N, n = "1s")) : n = "1s", { tf: n, ms: t };
}
function Fn(n) {
  if (!S(n))
    return !1;
  const t = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let e;
  return (e = t.exec(n)) !== null ? Se[e[2]] * e[1] : !1;
}
function ss(n) {
  let t = Math.floor(n / 1e3), e = Math.floor(t / 60);
  t = t % 60;
  let i = Math.floor(e / 60);
  e = e % 60;
  let s = Math.floor(i / 24);
  i = i % 24;
  let r = Math.floor(s / 7);
  s = s % 7;
  let o = Math.floor(r / 4), h = Math.floor(r / 52), c = r % 4;
  return o = o % 13, {
    y: h,
    M: o,
    w: c,
    d: s,
    h: i,
    m: e,
    s: t,
    years: h,
    months: o,
    weeks: c,
    days: s,
    hours: i,
    minutes: e,
    seconds: t
  };
}
function xe(n) {
  const t = ss(n);
  for (const e in t)
    if (t[e])
      return `${t[e]}${e}`;
}
function ns(n) {
  return n ? new Date(n).getUTCSeconds() : null;
}
function rs(n) {
  return new Date(n).setUTCMilliseconds(0, 0);
}
function pi(n) {
  return n ? new Date(n).getUTCMinutes() : null;
}
function os(n) {
  return new Date(n).setUTCSeconds(0, 0);
}
function as(n) {
  return n ? new Date(n).getUTCHours() : null;
}
function hs(n) {
  return new Date(n).setUTCMinutes(0, 0, 0);
}
function ls(n) {
  return n ? new Date(n).getUTCDate() : null;
}
function No(n, t = "en-GB", e = "short") {
  return new Date(n).toLocaleDateString(t, { weekday: e });
}
function Ce(n) {
  return new Date(n).setUTCHours(0, 0, 0, 0);
}
function cs(n) {
  if (n)
    return new Date(n).getUTCMonth();
}
function Vn(n, t = "en-GB", e = "short") {
  return new Date(n).toLocaleDateString(t, { month: e });
}
function ds(n) {
  let t = new Date(n);
  return Date.UTC(
    t.getUTCFullYear(),
    t.getUTCMonth(),
    1
  );
}
function Gn(n) {
  let t = (cs(n) + 1) % 12;
  return n += Un(t, vi(n)), n;
}
function Yn(n) {
  if (n)
    return new Date(n).getUTCFullYear();
}
function us(n) {
  return Date.UTC(new Date(n).getUTCFullYear());
}
function qn(n) {
  return n = n + lt + R, vi(n), n;
}
function vi(n) {
  let e = new Date(n).getUTCFullYear();
  return e & 3 ? !1 : e % 100 != 0 || e % 400 == 0;
}
function $o(n) {
  let t = new Date(n), e = t.getUTCMonth(), i = t.getUTCDate(), s = dayCount[e] + i;
  return e > 1 && vi() && s++, s;
}
function ii(n, t) {
  return {
    years: (i) => us(i),
    months: (i) => ds(i),
    weeks: (i) => Ce(i),
    days: (i) => Ce(i),
    hours: (i) => hs(i),
    minutes: (i) => os(i),
    seconds: (i) => rs(i)
  }[t](n);
}
function Ho(n, t) {
  let e, i;
  switch (t) {
    case "years":
      e = us(n), i = qn(n);
      break;
    case "months":
      e = ds(n), i = Gn(n);
      break;
    case "weeks":
      e = Ce(n), i = e + R;
      break;
    case "days":
      e = Ce(n), i = e + R;
      break;
    case "hours":
      e = hs(n), i = e + W;
      break;
    case "minutes":
      e = os(n), i = e + $;
      break;
    case "seconds":
      e = rs(n), i = e + N;
  }
  return { start: e, end: i };
}
function Uo(n) {
  String(ls(n)).padStart(2, "0");
}
function Xn(n) {
  let t = String(as(n)).padStart(2, "0"), e = String(pi(n)).padStart(2, "0");
  return `${t}:${e}`;
}
function Bo(n) {
  let t = String(as(n)).padStart(2, "0"), e = String(pi(n)).padStart(2, "0"), i = String(ns(n)).padStart(2, "0");
  return `${t}:${e}:${i}`;
}
function qi(n) {
  let t = String(pi(n)).padStart(2, "0"), e = String(ns(n)).padStart(2, "0");
  return `${t}:${e}`;
}
function zo(n, t) {
  let e = 1 / 0, i = null, s = -1;
  for (let r = 0; r < t.length; r++) {
    let o = t[r][0];
    Math.abs(o - n) < e && (e = Math.abs(o - n), i = t[r], s = r);
  }
  return [s, i];
}
const Wo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: Hn,
  DAY_MS: R,
  DM: Uo,
  HM: Xn,
  HMS: Bo,
  HOUR_MS: W,
  MILLISECOND: Rt,
  MINUTE_MS: $,
  MONTHMAP: Mo,
  MONTHR_MS: tt,
  MONTH_MS: Un,
  MS: qi,
  SECOND_MS: N,
  TIMESCALES: we,
  TIMESCALESKEYS: Oo,
  TIMESCALESRANK: Gi,
  TIMESCALESVALUES: Ie,
  TIMESCALESVALUESKEYS: Ro,
  TIMEUNITS: To,
  TIMEUNITSLONG: So,
  TIMEUNITSVALUES: Po,
  TIMEUNITSVALUESLONG: Bn,
  TIMEUNITSVALUESSHORT: Se,
  WEEK_MS: se,
  YEAR_MS: lt,
  buildSubGrads: Do,
  dayCntInc: Co,
  dayCntLeapInc: bo,
  dayOfYear: $o,
  day_start: Ce,
  getTimezone: ko,
  get_day: ls,
  get_dayName: No,
  get_hour: as,
  get_minute: pi,
  get_month: cs,
  get_monthName: Vn,
  get_second: ns,
  get_year: Yn,
  hour_start: hs,
  interval2MS: Fn,
  isLeapYear: vi,
  isTimeFrame: ei,
  isValidTimeInRange: Wn,
  isValidTimestamp: zn,
  minute_start: os,
  monthDayCnt: $n,
  month_start: ds,
  ms2Interval: xe,
  ms2TimeUnits: ss,
  nearestTs: zo,
  nextMonth: Gn,
  nextYear: qn,
  second_start: rs,
  time_start: ii,
  timestampDiff: Ot,
  timestampDifference: _o,
  timezones: Yi,
  unitRange: Ho,
  year_start: us
}, Symbol.toStringTag, { value: "Module" }));
function Fo(n, t) {
  return n = Math.ceil(n) + 1, t = Math.floor(t), Math.floor(Math.random() * (t - n) + n);
}
function Vo(n) {
  const t = {};
  return t.value = n, t.sign = !!n, t.integers = jn(n), t.decimals = Zn(n), t.total = t.integers + t.decimals, t;
}
function jn(n) {
  return (Math.log10((n ^ n >> 31) - (n >> 31)) | 0) + 1;
}
function Go(n) {
  return n | 0;
}
function ki(n, t) {
  t = t || 100;
  const e = Math.pow(10, t);
  return Math.round((n + Number.EPSILON) * e) / e;
}
function J(n, t = 0) {
  var e = n * Math.pow(10, t), i = Math.round(e), s = (e > 0 ? e : -e) % 1 === 0.5 ? i % 2 === 0 ? i : i - 1 : i;
  return s / Math.pow(10, t);
}
function Zn(n) {
  if (typeof n != "number" && (n = parseFloat(n)), isNaN(n) || !isFinite(n))
    return 0;
  for (var t = 1, e = 0; Math.round(n * t) / t !== n && (t *= 10, t !== 1 / 0); )
    e++;
  return e;
}
function Yo(n) {
  return Math.log(n) / Math.log(10);
}
function qo(n, t) {
  return Math.pow(n, t);
}
function et(n, t, e) {
  return Math.min(e, Math.max(t, n));
}
function be(n, t) {
  return !x(n) || !x(t) ? t : (Object.keys(t).forEach((e) => {
    const i = n[e], s = t[e];
    Array.isArray(i) && Array.isArray(s) ? n[e] = be(i.concat([]), s) : x(i) && x(s) ? n[e] = be(Object.assign({}, i), s) : n[e] = s;
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
function Kn(n, t, e) {
  const [i, ...s] = t.split(".");
  return {
    ...n,
    [i]: s.length ? Kn(n[i], s.join("."), e) : e
  };
}
function Gs(n, t) {
  return t.split(".").reduce((i, s) => i && i[s] !== "undefined" ? i[s] : void 0, n);
}
function Qn(n, t) {
  if (!b(n) || !b(t) || n.length !== t.length)
    return !1;
  let e = n.length;
  for (; e--; ) {
    if (b(n[e]) || b(t[e])) {
      if (!Qn(n[e], t[e]))
        return !1;
      continue;
    }
    if (x(n[e]) || x(n[e])) {
      if (!x(n[e], t[e]))
        return !1;
      continue;
    }
    if (n[e] !== t[e])
      return !1;
  }
  return !0;
}
function Xo(n, t, e) {
  [myArray[t], myArray[e]] = [myArray[e], myArray[t]];
}
function Jn(n, t) {
  return b(t) ? b(n) ? n.every((e) => t.includes(e)) : t.includes(n) : !1;
}
function tr(n, t) {
  if (!x(n) || !x(t))
    return !1;
  const e = Object.keys(n).sort(), i = Object.keys(t).sort();
  return e.length !== i.length ? !1 : e.every((r, o) => {
    const h = n[r], c = t[i[o]];
    return b(h) || b(c) ? Qn(h, c) : x(h) || x(c) ? tr(h, c) : h === c;
  });
}
function K(n = "ID") {
  v(n) ? n = n.toString() : S(n) || (n = "ID"), n = n.replace(/ |,|;|:|\.|#/g, "_");
  const t = Date.now().toString(36), e = Math.random().toString(36).substring(2, 5);
  return `${n}_${t}_${e}`;
}
const jo = (n) => n.entries().next().value, Zo = (n) => n.entries().next().value[0], Ko = (n) => n.entries().next().value[1], Qo = (n) => [...n].pop(), Jo = (n) => [...n.keys()].pop(), ta = (n) => [...n.values()].pop();
class dt extends Map {
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
    return jo(this);
  }
  firstKey() {
    return Zo(this);
  }
  firstValue() {
    return Ko(this);
  }
  lastEntry() {
    return Qo(this);
  }
  lastKey() {
    return Jo(this);
  }
  lastValue() {
    return ta(this);
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
    return b(t) ? (arr.forEach(([e, i]) => this.set(e, i)), !0) : !1;
  }
  populate(t) {
    return b(t) ? (this.clear(), arr.forEach(([e, i]) => this.set(e, i)), !0) : !1;
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
    return Xo(i, t, e), this.populate(i), !0;
  }
  swapKeys(t, e) {
    const i = [...this], s = i.findIndex(([o]) => o === t), r = i.findIndex(([o]) => o === e);
    return [i[s], i[r]] = [i[r], i[s]], this.clear(), i.forEach(([o, h]) => this.set(o, h)), !0;
  }
}
function _t(n, t = 100, e, i = !1) {
  var s, r = function() {
    var o = e || this, h = arguments, c = function() {
      s = null, i || n.apply(o, h);
    }, f = i && !s;
    clearTimeout(s), s = setTimeout(c, t), f && n.apply(o, h);
  };
  return r;
}
function ea(n, t = 250, e) {
  var i, s, r = function() {
    var h = e || this, c = +/* @__PURE__ */ new Date(), f = arguments;
    i && c < i + t ? (clearTimeout(s), s = setTimeout(function() {
      i = c, n.apply(h, f);
    }, t)) : (i = c, n.apply(h, f));
  };
  function o() {
    timeout && (clearTimeout(s), timeout = void 0);
  }
  return r.reset = function() {
    o(), i = 0;
  }, r;
}
class ia {
  #t;
  #e;
  #r;
  #s = [];
  constructor(t, e) {
    this.#t = t, this.#e = S(e.id) ? e.id : K, this.#r = S(e.type) ? e.type : "default", this.#s = b(e.data) ? e.data : [];
  }
}
function sa(n, t = !1) {
  if (!b(n))
    return !1;
  let e = Fo(0, n.length);
  if (!si(n[0], t) || !si(n[e], t) || !si(n[n.length - 1], t))
    return !1;
  let i = n[0][0], s = n[1][0], r = n[2][0];
  return !(i > s && s > r);
}
function na(n, t = !1) {
  if (!b(n))
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
  return !(!b(n) || n.length !== 6 || t && !Wn(n[0]) || !v(n[1]) || !v(n[2]) || !v(n[3]) || !v(n[4]) || !v(n[5]));
}
function ra(n) {
  for (let t of n)
    for (let e = 0; e < 6; e++)
      t.length = 6, t[e] *= 1;
  return n;
}
const oa = $, aa = "1m", ai = oa, ha = 6, Ys = 0.05, la = 100, qs = 100, Zt = ["default", "percent", "log"], Xs = 0.3, js = 30, je = 200, Zs = 200, Ks = 20, Qs = 4096, yi = 5, Js = 50, tn = 30, ca = 8;
class Xi {
  #t = ai;
  #e = "1s";
  indexStart = 0;
  indexEnd = je;
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
  initialCnt = js;
  limitFuture = je;
  limitPast = Zs;
  minCandles = Ks;
  maxCandles = Qs;
  yAxisBounds = Xs;
  rangeLimit = je;
  anchor;
  #r;
  #s;
  #i = !0;
  constructor(t, e, i = {}) {
    if (!x(i) || !(i?.core instanceof L))
      return !1;
    this.#i = !0, this.setConfig(i), this.#r = i.core, t = v(t) ? t : 0, e = v(e) ? e : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const s = i?.interval || ai;
    if (this.data.length == 0) {
      let r = Date.now();
      t = 0, e = this.rangeLimit, this.#t = s, this.#e = xe(this.interval), this.anchor = r - r % s;
    } else
      this.data.length < 2 ? (this.#t = s, this.#e = xe(this.interval)) : (this.#t = ji(this.data), this.#e = xe(this.interval));
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
    const o = t, h = e, c = this.indexStart, f = this.indexEnd;
    let p = this.Length;
    this.indexStart = t, this.indexEnd = e, p -= this.Length;
    let E = this.maxMinPriceVol({ data: this.data, start: this.indexStart, end: this.indexEnd, that: this });
    return this.setMaxMin(E), this.setConfig(s), this.#r.emit("setRange", [o, h, c, f]), !0;
  }
  setConfig(t) {
    if (!x(t))
      return !1;
    this.initialCnt = v(t?.initialCnt) ? t.initialCnt : js, this.limitFuture = v(t?.limitFuture) ? t.limitFuture : je, this.limitPast = v(t?.limitPast) ? t.limitPast : Zs, this.minCandles = v(t?.minCandles) ? t.minCandles : Ks, this.maxCandles = v(t?.maxCandles) ? t.maxCandles : Qs, this.yAxisBounds = v(t?.yAxisBounds) ? t.yAxisBounds : Xs;
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
    if (!v(t) || !S(e))
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
    if (!S(t))
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
    let h = e.length - 1, c = rt(i, 0, h), f = rt(s, 0, h), p = e[c][3], E = e[c][2], C = e[c][5], P = e[c][5], F = c, H = c, ut = c, nt = c;
    for (; c++ < f; )
      e[c][3] < p && (p = e[c][3], F = c), e[c][2] > E && (E = e[c][2], H = c), e[c][5] < C && (C = e[c][5], ut = c), e[c][5] > P && (P = e[c][5], nt = c);
    let A = E - p;
    return p -= A * r.yAxisBounds, p = p > 0 ? p : 0, E += A * r.yAxisBounds, A = E - p, {
      valueMin: p,
      valueMax: E,
      valueDiff: E - p,
      volumeMin: C,
      volumeMax: P,
      volumeDiff: P - C,
      valueMinIdx: F,
      valueMaxIdx: H,
      volumeMinIdx: ut,
      volumeMaxIdx: nt
    };
    function rt(le, De, Yt) {
      return Math.min(Yt, Math.max(De, le));
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
function ji(n) {
  let t = Math.min(n.length - 1, 99), e = 1 / 0;
  return n.slice(0, t).forEach((i, s) => {
    let r = n[s + 1][0] - i[0];
    r === r && r < e && (e = r);
  }), e;
}
function Zi(n, t) {
  if (!v(t))
    return !1;
  let e, i = n.timeFrameMS;
  return t = t - t % i, t === n.range.data[0][0] ? e = 0 : t < n.range.data[0][0] ? e = (n.range.data[0][0] - t) / i * -1 : e = (t - n.range.data[0][0]) / i, e;
}
const ye = "TradeX-Chart", Ee = "TX", da = "tradeXutils", en = "tradeXmenus", ua = "tradeXmenu", sn = "tradeXdividers", nn = "tradeXwindows", fa = "tradeXwindow", rn = "tradeXprogress", ga = 500, ma = "stream_None", Te = "stream_Listening", on = "stream_Started", pa = "stream_Stopped", va = "stream_Error", Me = "stream_candleFirst", Ct = "stream_candleUpdate", Pe = "stream_candleNew", ya = 250, wa = 8, xa = 2, Ea = 2, Ta = "defaultState", Sa = {
  id: Ta,
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
    tf: aa,
    tfms: ai
  },
  ohlcv: [],
  views: [],
  primary: [],
  secondary: [],
  datasets: [],
  tools: {},
  trades: {},
  events: {},
  annotations: {}
};
class O {
  static #t = new dt();
  static get default() {
    return it(Sa);
  }
  static get list() {
    return O.#t;
  }
  static create(t, e = !1, i = !1) {
    const s = new O(t, e, i), r = s.key;
    return O.#t.set(r, s), s;
  }
  static validate(t, e = !1, i = !1) {
    const s = this.default;
    if (x(t) || (t = {}), x(t.chart) || (t.chart = s.chart, t.chart.isEmpty = !0, t.chart.data = b(t.ohlcv) ? t.ohlcv : [], delete t.ohlcv), t = be(s, t), e ? t.chart.data = na(t.chart.data, i) ? t.chart.data : [] : t.chart.data = sa(t.chart.data, i) ? t.chart.data : [], t.chart.isEmpty = t.chart.data.length == 0, !v(t.chart?.tf) || e) {
      let c = ji(t.chart.data);
      c < N && (c = ai), t.chart.tfms = c;
    }
    if ((!S(t.chart?.tfms) || e) && (t.chart.tf = xe(t.chart.tfms)), b(t.views) || (t.views = s.views), b(t.primary) || (t.primary = s.primary), b(t.secondary) || (t.secondary = s.secondary), x(t.chart.settings) || (t.chart.settings = s.chart.settings), b(t.datasets) || (t.datasets = []), t.views.length == 0) {
      t.views.push(["primary", t.primary]);
      for (let c in t)
        c.indexOf("secondary") == 0 && t.views.push([c, t[c]]);
    }
    let r = t.views, o = r.length;
    for (; o--; )
      if (!b(r[o]) || r[o].length == 0)
        r.splice(o, 1);
      else {
        let c = t.views[o][1], f = c.length;
        for (; f--; )
          !x(c[f]) && !S(c[f].name) && !S(c[f].type) && !b(c[f].data) ? c.splice(f, 1) : x(c[f].settings) || (c[f].settings = {});
        r[o].length == 0 && r.splice(o, 1);
      }
    t.views.length == 0 && (t.views[0] = ["primary", s.primary]), t.views = new dt(t.views), t.views.has("primary") || t.views.insert("primary", s.primary, 0), t.views.get("primary").push(t.chart);
    for (var h of t.datasets)
      this.#i || (this.#i = {}), this.dss[h.id] = new ia(this, h);
    return t;
  }
  static delete(t) {
    if (!S(t) || !O.has(t))
      return !1;
    O.#t.delete(t);
  }
  static has(t) {
    return O.#t.has(t);
  }
  static get(t) {
    return O.#t.get(t);
  }
  static export(t, e = {}) {
    if (!O.has(t))
      return !1;
    x(e) || (e = {});
    const i = O.get(t), s = e?.type, r = it(i.data), o = r.chart.data;
    let h;
    switch (o.length > 0 && o[o.length - 1].length > 6 && (o.length = o.length - 1), r.views.get("primary").pop(), r.views = Array.from(r.views), s) {
      case "json":
      default:
        const { replacer: c, space: f } = { ...e };
        h = JSON.stringify(r, c, f);
    }
    return h;
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
    x(t) ? (this.#s = O.validate(t, e, i), this.#o = "valid", this.#h = !!this.#s.chart?.isEmpty, this.#n = t?.core instanceof L ? t.core : void 0) : (this.#s = O.default, this.#o = "default", this.#h = !0), this.#e = t?.id || "", this.#r = K(`${Ee}_state`);
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
    return O.create(t, e, i);
  }
  delete(t) {
    if (!S(t))
      return !1;
    if (t !== this.key)
      O.delete(t);
    else if (O.has(t)) {
      const e = O.create();
      this.use(e.key), O.delete(t);
    }
    return !0;
  }
  list() {
    return O.list;
  }
  has(t) {
    return O.has(t);
  }
  get(t) {
    return O.get(t);
  }
  use(t) {
    const e = this.core;
    if (!O.has(t))
      return e.warn(`${e.name} id: ${e.id} : Specified state does not exist`), !1;
    if (t === this.key)
      return !0;
    e.stream.stop(), e.MainPane.reset();
    let i = O.get(t);
    this.#e = i.id, this.#o = i.status, this.#h = i.isEmpty, this.#s = i.data;
    const s = {
      interval: i.data.chart.tfms,
      core: e
    };
    if (e.getRange(null, null, s), this.range.Length > 1) {
      const r = Zi(e.time, void 0), o = r ? r + this.range.initialCnt : i.data.length - 1, h = r || o - this.range.initialCnt;
      this.range.initialCnt = o - h, e.setRange(h, o);
    }
    e.MainPane.restart(), e.refresh();
  }
  export(t = this.key, e = {}) {
    return O.export(t, e = {});
  }
  mergeData(t, e = !1, i = !1) {
    if (!x(t))
      return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let s = b(t?.ohlcv) ? t.ohlcv.length - 1 : 0;
    if (s > 1 && this.time.timeFrameMS !== ji(t?.ohlcv))
      return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    (this.#h || !v(this.time.timeFrameMS)) && (!x(e) || !v(e.start) || !v(e.end)) && s > 1 && (e = { start: s - this.range.initialCnt, end: s }), x(e) ? (v(e?.startTS) ? e.start = e.startTS : e.start = v(e.start) ? this.range.value(e.start)[0] : this.range.timeMin, v(e?.endTS) ? e.end = e.endTS : e.end = v(e.end) ? this.range.value(e.end)[0] : this.range.timeMax) : (e = {}, e.start = this.range.timeMin, e.end = this.range.timeMax);
    let r, o, h = t?.ohlcv || !1;
    const c = this.allData.data, f = this.allData?.primaryPane, p = t?.primary || !1;
    this.allData?.secondaryPane;
    const E = t?.secondary || !1;
    this.allData?.dataset?.data;
    const C = t?.dataset?.data || !1, P = this.allData?.trades?.data;
    t?.trades?.data;
    const F = b(h) && this.range.inRange(h[0][0]) ? 1 : 0, H = {};
    if (b(h) && h.length > 0) {
      if (r = h.length - 1, c.length - 1, H.mData = this.range.inRange(h[0][0]) && this.range.inRange(h[0][r]), !X(h[r][7]) && h[r].length !== 8 && h[r][6] !== null && h[r][7] !== !0 && (h = ra(h)), c.length == 0 ? this.allData.data.push(...h) : (e = e || {
        start: this.range.timeMin,
        end: this.range.timeMax
      }, this.data.chart.data = this.merge(c, h)), i)
        this.#n.calcAllIndicators();
      else {
        if (b(p) && p.length > 0) {
          for (let A of p)
            if (b(A?.data) && A?.data.length > 0)
              for (let rt of f)
                rt.name === A.name && rt.type === A.type && tr(rt.settings, A.settings) && (rt.data = this.merge(rt.data, A.data));
        }
        if (b(E) && E.length > 0)
          for (let A of E)
            b(A?.data) && A?.data.length > 0;
      }
      if (b(C) && C.length > 0)
        for (let A of C)
          b(A?.data) && A?.data.length > 0;
      if (b(P) && P.length > 0)
        for (let A of P)
          ;
      e && (x(e) ? (o = v(e.start) ? this.range.getTimeIndex(e.start) : this.range.indexStart, s = v(e.end) ? this.range.getTimeIndex(e.end) : this.range.indexEnd) : (h[0][0] && (o = this.range.indexStart + F), s = this.range.indexEnd + F), this.#n.setRange(o, s));
      let ut, nt = !1;
      for (ut in H)
        nt = nt || ut;
      return t.ohlcv.length > 1 && this.#n.emit("state_mergeComplete"), nt && this.#n.refresh(), this.#h = !1, !0;
    }
  }
  merge(t, e) {
    let i = [], s, r;
    if (t[0][0] < e[0][0] ? (s = t, r = e) : (s = e, r = t), r.length == 1 && r[0][0] == s[s.length - 1][0])
      s[s.length - 1] = r[0], i = s;
    else if (r.length == 1 && r[0][0] == s[s.length - 1][0] + this.range.interval)
      i = s.concat(r);
    else if (s[s.length - 1][0] >= r[0][0]) {
      let o = 0;
      for (; s[o][0] < r[0][0]; )
        i.push(s[o]), o++;
      i = i.concat(r);
      let h = o + r.length;
      h < s.length && (i = i.concat(s.slice(h)));
    } else if (r[0][0] - s[s.length - 1][0] > this.range.interval) {
      i = s;
      let o = s[s.length - 1][0], h = Math.floor((r[0][0] - o) / this.range.interval);
      for (h; h > 0; h--) {
        let c = Array(r[0].length).fill(null);
        c[0] = o, i.push(c), i = i.concat(r);
      }
    } else
      i = s.concat(r);
    return i;
  }
}
class Ht {
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
    if (!Ht.validateConfig(t))
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
    if (!s || !D(s.action) || this.#o !== "running")
      return !1;
    let r = s?.condition?.type || s?.condition || !1;
    if (r && !this.condition.call(this, r, s.condition))
      return !1;
    const o = s.target, h = this.#i.states[o];
    if (i?.onExit.call(this, e), s.action.call(this, e), this.#r = this.#e, this.#e = o, h?.onEnter.call(this, e), this.#i.states[o]?.on && (this.#i.states[o].on[""] || this.#i.states[o].on?.always)) {
      const c = this.#i.states[o].on[""] || this.#i.states[o].on.always;
      if (b(c))
        for (let f of c) {
          let p = f?.condition?.type || f?.condition || !1;
          this.condition.call(this, p, f.condition) && S(f.target) && (f?.action.call(this, e), this.#r = this.#e, this.#e = f?.target, this.notify(null, null));
        }
      else if (x(c) && S(c.target)) {
        let f = c?.condition?.type || c?.condition || !1;
        this.condition.call(this, f, c.condition) && S(c.target) && (c?.action.call(this, e), this.#r = this.#e, this.#e = c.target, this.notify(null, null));
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
    if (!x(t))
      return !1;
    const e = ["id", "initial", "context", "states"];
    let i = Object.keys(t);
    if (!Jn(e, i) || !(t.initial in t.states))
      return !1;
    for (let s in t.states) {
      if (!x(t.states[s]) || "onEnter" in t.states[s] && !D(t.states[s].onEnter) || "onExit" in t.states[s] && !D(t.states[s].onExit))
        return !1;
      if ("on" in t.states[s])
        for (let r in t.states[s].on) {
          let o = t.states[s].on[r];
          if (!S(o.target) || "action" in o && !D(o.action))
            return !1;
        }
    }
    return !0;
  }
}
const Ca = "alert";
class ba {
  #t = new dt();
  #e = {};
  constructor(t) {
    if (b(t))
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
    if (b(t)) {
      let e = [];
      for (let i of t)
        e.push(this.add(i?.price, i?.condition, i?.handler));
      return e;
    } else
      return !1;
  }
  add(t, e, i) {
    if (isNaN(t) || !D(i))
      return !1;
    const s = K(Ca), r = { price: t, condition: e };
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
    if (!(!b(t) || !b(e))) {
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
const Ma = 0, Pa = 1, La = 2, Aa = 3, Oa = 4, Ia = 5, Ze = [null, null, null, null, null], Ke = {
  tfCountDown: !0,
  alerts: []
};
class Qt {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h = Ze;
  #l = 0;
  #a = 0;
  #c = "";
  #u = !1;
  #d;
  #f;
  #v = Ze;
  #w;
  static validateConfig(t) {
    if (x(t)) {
      let e = it(Ke);
      t = be(e, t), t.tfCountDown = X(t.tfCountDown) ? t.tfCountDown : Ke.tfCountDown, t.alerts = b(t.alerts) ? t.alerts : Ke.alerts;
    } else
      return Ke;
    return t;
  }
  constructor(t) {
    this.#t = t, this.#s = t.time, this.status = { status: ma }, this.#e = Qt.validateConfig(t.config?.stream), this.#i = v(t.config?.maxCandleUpdate) ? t.config.maxCandleUpdate : ya, this.#o = v(t.config?.streamPrecision) ? t.config.streamPrecision : wa;
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
    this.#u || (this.#u = !0, this.status = { status: Me, data: t });
  }
  get alerts() {
    return this.#w;
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
    b(t) && (this.#v, this.#v = t, this.alerts.check(t, this.#h));
  }
  set candle(t) {
    const e = [...this.#h];
    t.t = this.roundTime(new Date(t.t)), t.o = t.o * 1, t.h = t.h * 1, t.l = t.l * 1, t.c = t.c * 1, t.v = t.v * 1, this.#h[Ma] !== t.t ? this.newCandle(t) : this.updateCandle(t), this.status = { status: Te, data: this.#h }, this.lastTick = e;
  }
  get candle() {
    return this.#h !== Ze ? this.#h : null;
  }
  start() {
    this.#w = new ba(this.#e.alerts), this.status = { status: on }, this.#n = setInterval(this.onUpdate.bind(this), this.#i);
  }
  stop() {
    this.#w.destroy(), this.status = { status: pa };
  }
  emit(t, e) {
    this.#t.emit(t, e);
  }
  error() {
    this.status = { status: va };
  }
  onTick(t) {
    (this.#r == on || this.#r == Te) && x(t) && (this.candle = t);
  }
  onUpdate() {
    this.#h !== Ze && (this.status = { status: Ct, data: this.candle }, this.status = { status: Te, data: this.#h });
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
    ], this.#t.state.mergeData({ ohlcv: [this.#h] }, !0, !1), this.status = { status: Pe, data: { data: t, candle: this.#h } }, this.#a = this.#s.timeFrameMS, this.#l = this.roundTime(Date.now());
  }
  prevCandle() {
    const t = this.#t.allData.data;
    t.length > 0 && t[t.length - 1][7] && (t[t.length - 1].length = 6);
  }
  updateCandle(t) {
    let e = this.#h;
    e[Pa] = t.o, e[La] = t.h, e[Aa] = t.l, e[Oa] = t.c, e[Ia] = t.v, this.#h = e;
    const i = this.#t.allData.data, s = i.length > 0 ? i.length - 1 : 0;
    i[s] = this.#h, this.countDownUpdate();
  }
  countDownUpdate() {
    let t, e, i, s, r, o, h;
    this.#s.timeFrameMS;
    let c = this.#s.timeFrameMS - (Date.now() - this.#l);
    return c < 0 && (c = 0), this.#a = c, c > lt ? (t = String(Math.floor(c / lt)), e = String(Math.floor(c % lt / tt)).padStart(2, "0"), this.#c = `${t}Y ${e}M`) : c > tt ? (e = String(Math.floor(c / tt)).padStart(2, "0"), s = String(Math.floor(c % tt / R)).padStart(2, "0"), this.#c = `${e}M ${s}D`) : c > se ? (i = String(Math.floor(c / se)).padStart(2, "0"), s = String(Math.floor(c % tt / R)).padStart(2, "0"), this.#c = `${i}W ${s}D`) : c > R ? (s = String(Math.floor(c / R)).padStart(2, "0"), r = String(Math.floor(c % R / W)).padStart(2, "0"), o = String(Math.floor(c % W / $)).padStart(2, "0"), this.#c = `${s}D ${r}:${o}`) : c > W ? (r = String(Math.floor(c / W)).padStart(2, "0"), o = String(Math.floor(c % W / $)).padStart(2, "0"), h = String(Math.floor(c % $ / N)).padStart(2, "0"), this.#c = `${r}:${o}:${h}`) : c > $ ? (o = String(Math.floor(c / $)).padStart(2, "0"), h = String(Math.floor(c % $ / N)).padStart(2, "0"), this.#c = `00:${o}:${h}`) : (h = String(Math.floor(c / N)).padStart(2, "0"), String(c % N).padStart(4, "0"), this.#c = `00:00:${h}`), this.#c;
  }
  roundTime(t) {
    return t - t % this.#t.time.timeFrameMS;
  }
}
const er = {
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
  isImage(n, t) {
    if (/<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/.test(n))
      var i = window.URL || window.webkitURL || window, n = new Blob([n], { type: "image/svg+xml" }), n = i.createObjectURL(n);
    const s = new Image();
    s.src = n, s.complete ? t(s) : (s.onload = () => t(s), s.onerror = () => t(!1));
  },
  elementDimPos(n) {
    if (!this.isElement(n))
      return !1;
    let t = 0, e = 0, i = n;
    for (; i && i.tagName.toLowerCase() != "body" && !isNaN(i.offsetLeft) && !isNaN(i.offsetTop); )
      t += i.offsetLeft - i.scrollLeft, e += i.offsetTop - i.scrollTop, i = i.offsetParent;
    const s = n.getBoundingClientRect();
    let r = s.right - s.left, o = s.bottom - s.top, h = this.isVisible(n), c = this.isInViewport(n);
    return { top: e, left: t, width: r, height: o, visible: h, viewport: c };
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
      !n.contains(s.target) && er.isVisible(n) && (t(), i());
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
    if (!n || !x(n))
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
    return !this.isElement(n) || !S(t) ? null : n.classList.contains(t) ? n : this.findTargetParentWithClass(n.parentElement, t);
  }
}, I = er, Ra = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const ka = ((n) => "onorientationchange" in n || n.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in n || n.DocumentTouch && document instanceof n.DocumentTouch)(typeof window < "u" ? window : {}), Da = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class Vt {
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
    return new Vt(this.x, this.y);
  }
}
function _a(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ir = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(n) {
  (function(t, e, i, s) {
    var r = ["", "webkit", "Moz", "MS", "ms", "o"], o = e.createElement("div"), h = "function", c = Math.round, f = Math.abs, p = Date.now;
    function E(a, l, u) {
      return setTimeout(rt(a, u), l);
    }
    function C(a, l, u) {
      return Array.isArray(a) ? (P(a, u[l], u), !0) : !1;
    }
    function P(a, l, u) {
      var g;
      if (a)
        if (a.forEach)
          a.forEach(l, u);
        else if (a.length !== s)
          for (g = 0; g < a.length; )
            l.call(u, a[g], g, a), g++;
        else
          for (g in a)
            a.hasOwnProperty(g) && l.call(u, a[g], g, a);
    }
    function F(a, l, u) {
      var g = "DEPRECATED METHOD: " + l + `
` + u + ` AT 
`;
      return function() {
        var m = new Error("get-stack-trace"), T = m && m.stack ? m.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", M = t.console && (t.console.warn || t.console.log);
        return M && M.call(t.console, g, T), a.apply(this, arguments);
      };
    }
    var H;
    typeof Object.assign != "function" ? H = function(l) {
      if (l === s || l === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var u = Object(l), g = 1; g < arguments.length; g++) {
        var m = arguments[g];
        if (m !== s && m !== null)
          for (var T in m)
            m.hasOwnProperty(T) && (u[T] = m[T]);
      }
      return u;
    } : H = Object.assign;
    var ut = F(function(l, u, g) {
      for (var m = Object.keys(u), T = 0; T < m.length; )
        (!g || g && l[m[T]] === s) && (l[m[T]] = u[m[T]]), T++;
      return l;
    }, "extend", "Use `assign`."), nt = F(function(l, u) {
      return ut(l, u, !0);
    }, "merge", "Use `assign`.");
    function A(a, l, u) {
      var g = l.prototype, m;
      m = a.prototype = Object.create(g), m.constructor = a, m._super = g, u && H(m, u);
    }
    function rt(a, l) {
      return function() {
        return a.apply(l, arguments);
      };
    }
    function le(a, l) {
      return typeof a == h ? a.apply(l && l[0] || s, l) : a;
    }
    function De(a, l) {
      return a === s ? l : a;
    }
    function Yt(a, l, u) {
      P(Ne(l), function(g) {
        a.addEventListener(g, u, !1);
      });
    }
    function _e(a, l, u) {
      P(Ne(l), function(g) {
        a.removeEventListener(g, u, !1);
      });
    }
    function Ts(a, l) {
      for (; a; ) {
        if (a == l)
          return !0;
        a = a.parentNode;
      }
      return !1;
    }
    function Ut(a, l) {
      return a.indexOf(l) > -1;
    }
    function Ne(a) {
      return a.trim().split(/\s+/g);
    }
    function qt(a, l, u) {
      if (a.indexOf && !u)
        return a.indexOf(l);
      for (var g = 0; g < a.length; ) {
        if (u && a[g][u] == l || !u && a[g] === l)
          return g;
        g++;
      }
      return -1;
    }
    function $e(a) {
      return Array.prototype.slice.call(a, 0);
    }
    function Ss(a, l, u) {
      for (var g = [], m = [], T = 0; T < a.length; ) {
        var M = l ? a[T][l] : a[T];
        qt(m, M) < 0 && g.push(a[T]), m[T] = M, T++;
      }
      return u && (l ? g = g.sort(function(z, q) {
        return z[l] > q[l];
      }) : g = g.sort()), g;
    }
    function He(a, l) {
      for (var u, g, m = l[0].toUpperCase() + l.slice(1), T = 0; T < r.length; ) {
        if (u = r[T], g = u ? u + m : l, g in a)
          return g;
        T++;
      }
      return s;
    }
    var Hr = 1;
    function Ur() {
      return Hr++;
    }
    function Cs(a) {
      var l = a.ownerDocument || a;
      return l.defaultView || l.parentWindow || t;
    }
    var Br = /mobile|tablet|ip(ad|hone|od)|android/i, bs = "ontouchstart" in t, zr = He(t, "PointerEvent") !== s, Wr = bs && Br.test(navigator.userAgent), ce = "touch", Fr = "pen", Ti = "mouse", Vr = "kinect", Gr = 25, Y = 1, Bt = 2, _ = 4, j = 8, Ue = 1, de = 2, ue = 4, fe = 8, ge = 16, wt = de | ue, zt = fe | ge, Ms = wt | zt, Ps = ["x", "y"], Be = ["clientX", "clientY"];
    function ot(a, l) {
      var u = this;
      this.manager = a, this.callback = l, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(g) {
        le(a.options.enable, [a]) && u.handler(g);
      }, this.init();
    }
    ot.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && Yt(this.element, this.evEl, this.domHandler), this.evTarget && Yt(this.target, this.evTarget, this.domHandler), this.evWin && Yt(Cs(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && _e(this.element, this.evEl, this.domHandler), this.evTarget && _e(this.target, this.evTarget, this.domHandler), this.evWin && _e(Cs(this.element), this.evWin, this.domHandler);
      }
    };
    function Yr(a) {
      var l, u = a.options.inputClass;
      return u ? l = u : zr ? l = Ci : Wr ? l = Fe : bs ? l = bi : l = We, new l(a, qr);
    }
    function qr(a, l, u) {
      var g = u.pointers.length, m = u.changedPointers.length, T = l & Y && g - m === 0, M = l & (_ | j) && g - m === 0;
      u.isFirst = !!T, u.isFinal = !!M, T && (a.session = {}), u.eventType = l, Xr(a, u), a.emit("hammer.input", u), a.recognize(u), a.session.prevInput = u;
    }
    function Xr(a, l) {
      var u = a.session, g = l.pointers, m = g.length;
      u.firstInput || (u.firstInput = Ls(l)), m > 1 && !u.firstMultiple ? u.firstMultiple = Ls(l) : m === 1 && (u.firstMultiple = !1);
      var T = u.firstInput, M = u.firstMultiple, U = M ? M.center : T.center, z = l.center = As(g);
      l.timeStamp = p(), l.deltaTime = l.timeStamp - T.timeStamp, l.angle = Si(U, z), l.distance = ze(U, z), jr(u, l), l.offsetDirection = Is(l.deltaX, l.deltaY);
      var q = Os(l.deltaTime, l.deltaX, l.deltaY);
      l.overallVelocityX = q.x, l.overallVelocityY = q.y, l.overallVelocity = f(q.x) > f(q.y) ? q.x : q.y, l.scale = M ? Qr(M.pointers, g) : 1, l.rotation = M ? Kr(M.pointers, g) : 0, l.maxPointers = u.prevInput ? l.pointers.length > u.prevInput.maxPointers ? l.pointers.length : u.prevInput.maxPointers : l.pointers.length, Zr(u, l);
      var Et = a.element;
      Ts(l.srcEvent.target, Et) && (Et = l.srcEvent.target), l.target = Et;
    }
    function jr(a, l) {
      var u = l.center, g = a.offsetDelta || {}, m = a.prevDelta || {}, T = a.prevInput || {};
      (l.eventType === Y || T.eventType === _) && (m = a.prevDelta = {
        x: T.deltaX || 0,
        y: T.deltaY || 0
      }, g = a.offsetDelta = {
        x: u.x,
        y: u.y
      }), l.deltaX = m.x + (u.x - g.x), l.deltaY = m.y + (u.y - g.y);
    }
    function Zr(a, l) {
      var u = a.lastInterval || l, g = l.timeStamp - u.timeStamp, m, T, M, U;
      if (l.eventType != j && (g > Gr || u.velocity === s)) {
        var z = l.deltaX - u.deltaX, q = l.deltaY - u.deltaY, Et = Os(g, z, q);
        T = Et.x, M = Et.y, m = f(Et.x) > f(Et.y) ? Et.x : Et.y, U = Is(z, q), a.lastInterval = l;
      } else
        m = u.velocity, T = u.velocityX, M = u.velocityY, U = u.direction;
      l.velocity = m, l.velocityX = T, l.velocityY = M, l.direction = U;
    }
    function Ls(a) {
      for (var l = [], u = 0; u < a.pointers.length; )
        l[u] = {
          clientX: c(a.pointers[u].clientX),
          clientY: c(a.pointers[u].clientY)
        }, u++;
      return {
        timeStamp: p(),
        pointers: l,
        center: As(l),
        deltaX: a.deltaX,
        deltaY: a.deltaY
      };
    }
    function As(a) {
      var l = a.length;
      if (l === 1)
        return {
          x: c(a[0].clientX),
          y: c(a[0].clientY)
        };
      for (var u = 0, g = 0, m = 0; m < l; )
        u += a[m].clientX, g += a[m].clientY, m++;
      return {
        x: c(u / l),
        y: c(g / l)
      };
    }
    function Os(a, l, u) {
      return {
        x: l / a || 0,
        y: u / a || 0
      };
    }
    function Is(a, l) {
      return a === l ? Ue : f(a) >= f(l) ? a < 0 ? de : ue : l < 0 ? fe : ge;
    }
    function ze(a, l, u) {
      u || (u = Ps);
      var g = l[u[0]] - a[u[0]], m = l[u[1]] - a[u[1]];
      return Math.sqrt(g * g + m * m);
    }
    function Si(a, l, u) {
      u || (u = Ps);
      var g = l[u[0]] - a[u[0]], m = l[u[1]] - a[u[1]];
      return Math.atan2(m, g) * 180 / Math.PI;
    }
    function Kr(a, l) {
      return Si(l[1], l[0], Be) + Si(a[1], a[0], Be);
    }
    function Qr(a, l) {
      return ze(l[0], l[1], Be) / ze(a[0], a[1], Be);
    }
    var Jr = {
      mousedown: Y,
      mousemove: Bt,
      mouseup: _
    }, to = "mousedown", eo = "mousemove mouseup";
    function We() {
      this.evEl = to, this.evWin = eo, this.pressed = !1, ot.apply(this, arguments);
    }
    A(We, ot, {
      handler: function(l) {
        var u = Jr[l.type];
        u & Y && l.button === 0 && (this.pressed = !0), u & Bt && l.which !== 1 && (u = _), this.pressed && (u & _ && (this.pressed = !1), this.callback(this.manager, u, {
          pointers: [l],
          changedPointers: [l],
          pointerType: Ti,
          srcEvent: l
        }));
      }
    });
    var io = {
      pointerdown: Y,
      pointermove: Bt,
      pointerup: _,
      pointercancel: j,
      pointerout: j
    }, so = {
      2: ce,
      3: Fr,
      4: Ti,
      5: Vr
    }, Rs = "pointerdown", ks = "pointermove pointerup pointercancel";
    t.MSPointerEvent && !t.PointerEvent && (Rs = "MSPointerDown", ks = "MSPointerMove MSPointerUp MSPointerCancel");
    function Ci() {
      this.evEl = Rs, this.evWin = ks, ot.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    A(Ci, ot, {
      handler: function(l) {
        var u = this.store, g = !1, m = l.type.toLowerCase().replace("ms", ""), T = io[m], M = so[l.pointerType] || l.pointerType, U = M == ce, z = qt(u, l.pointerId, "pointerId");
        T & Y && (l.button === 0 || U) ? z < 0 && (u.push(l), z = u.length - 1) : T & (_ | j) && (g = !0), !(z < 0) && (u[z] = l, this.callback(this.manager, T, {
          pointers: u,
          changedPointers: [l],
          pointerType: M,
          srcEvent: l
        }), g && u.splice(z, 1));
      }
    });
    var no = {
      touchstart: Y,
      touchmove: Bt,
      touchend: _,
      touchcancel: j
    }, ro = "touchstart", oo = "touchstart touchmove touchend touchcancel";
    function Ds() {
      this.evTarget = ro, this.evWin = oo, this.started = !1, ot.apply(this, arguments);
    }
    A(Ds, ot, {
      handler: function(l) {
        var u = no[l.type];
        if (u === Y && (this.started = !0), !!this.started) {
          var g = ao.call(this, l, u);
          u & (_ | j) && g[0].length - g[1].length === 0 && (this.started = !1), this.callback(this.manager, u, {
            pointers: g[0],
            changedPointers: g[1],
            pointerType: ce,
            srcEvent: l
          });
        }
      }
    });
    function ao(a, l) {
      var u = $e(a.touches), g = $e(a.changedTouches);
      return l & (_ | j) && (u = Ss(u.concat(g), "identifier", !0)), [u, g];
    }
    var ho = {
      touchstart: Y,
      touchmove: Bt,
      touchend: _,
      touchcancel: j
    }, lo = "touchstart touchmove touchend touchcancel";
    function Fe() {
      this.evTarget = lo, this.targetIds = {}, ot.apply(this, arguments);
    }
    A(Fe, ot, {
      handler: function(l) {
        var u = ho[l.type], g = co.call(this, l, u);
        g && this.callback(this.manager, u, {
          pointers: g[0],
          changedPointers: g[1],
          pointerType: ce,
          srcEvent: l
        });
      }
    });
    function co(a, l) {
      var u = $e(a.touches), g = this.targetIds;
      if (l & (Y | Bt) && u.length === 1)
        return g[u[0].identifier] = !0, [u, u];
      var m, T, M = $e(a.changedTouches), U = [], z = this.target;
      if (T = u.filter(function(q) {
        return Ts(q.target, z);
      }), l === Y)
        for (m = 0; m < T.length; )
          g[T[m].identifier] = !0, m++;
      for (m = 0; m < M.length; )
        g[M[m].identifier] && U.push(M[m]), l & (_ | j) && delete g[M[m].identifier], m++;
      if (U.length)
        return [
          Ss(T.concat(U), "identifier", !0),
          U
        ];
    }
    var uo = 2500, _s = 25;
    function bi() {
      ot.apply(this, arguments);
      var a = rt(this.handler, this);
      this.touch = new Fe(this.manager, a), this.mouse = new We(this.manager, a), this.primaryTouch = null, this.lastTouches = [];
    }
    A(bi, ot, {
      handler: function(l, u, g) {
        var m = g.pointerType == ce, T = g.pointerType == Ti;
        if (!(T && g.sourceCapabilities && g.sourceCapabilities.firesTouchEvents)) {
          if (m)
            fo.call(this, u, g);
          else if (T && go.call(this, g))
            return;
          this.callback(l, u, g);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function fo(a, l) {
      a & Y ? (this.primaryTouch = l.changedPointers[0].identifier, Ns.call(this, l)) : a & (_ | j) && Ns.call(this, l);
    }
    function Ns(a) {
      var l = a.changedPointers[0];
      if (l.identifier === this.primaryTouch) {
        var u = { x: l.clientX, y: l.clientY };
        this.lastTouches.push(u);
        var g = this.lastTouches, m = function() {
          var T = g.indexOf(u);
          T > -1 && g.splice(T, 1);
        };
        setTimeout(m, uo);
      }
    }
    function go(a) {
      for (var l = a.srcEvent.clientX, u = a.srcEvent.clientY, g = 0; g < this.lastTouches.length; g++) {
        var m = this.lastTouches[g], T = Math.abs(l - m.x), M = Math.abs(u - m.y);
        if (T <= _s && M <= _s)
          return !0;
      }
      return !1;
    }
    var $s = He(o.style, "touchAction"), Hs = $s !== s, Us = "compute", Bs = "auto", Mi = "manipulation", Wt = "none", me = "pan-x", pe = "pan-y", Ve = po();
    function Pi(a, l) {
      this.manager = a, this.set(l);
    }
    Pi.prototype = {
      set: function(a) {
        a == Us && (a = this.compute()), Hs && this.manager.element.style && Ve[a] && (this.manager.element.style[$s] = a), this.actions = a.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var a = [];
        return P(this.manager.recognizers, function(l) {
          le(l.options.enable, [l]) && (a = a.concat(l.getTouchAction()));
        }), mo(a.join(" "));
      },
      preventDefaults: function(a) {
        var l = a.srcEvent, u = a.offsetDirection;
        if (this.manager.session.prevented) {
          l.preventDefault();
          return;
        }
        var g = this.actions, m = Ut(g, Wt) && !Ve[Wt], T = Ut(g, pe) && !Ve[pe], M = Ut(g, me) && !Ve[me];
        if (m) {
          var U = a.pointers.length === 1, z = a.distance < 2, q = a.deltaTime < 250;
          if (U && z && q)
            return;
        }
        if (!(M && T) && (m || T && u & wt || M && u & zt))
          return this.preventSrc(l);
      },
      preventSrc: function(a) {
        this.manager.session.prevented = !0, a.preventDefault();
      }
    };
    function mo(a) {
      if (Ut(a, Wt))
        return Wt;
      var l = Ut(a, me), u = Ut(a, pe);
      return l && u ? Wt : l || u ? l ? me : pe : Ut(a, Mi) ? Mi : Bs;
    }
    function po() {
      if (!Hs)
        return !1;
      var a = {}, l = t.CSS && t.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(u) {
        a[u] = l ? t.CSS.supports("touch-action", u) : !0;
      }), a;
    }
    var Ge = 1, at = 2, Xt = 4, At = 8, Mt = At, ve = 16, xt = 32;
    function Pt(a) {
      this.options = H({}, this.defaults, a || {}), this.id = Ur(), this.manager = null, this.options.enable = De(this.options.enable, !0), this.state = Ge, this.simultaneous = {}, this.requireFail = [];
    }
    Pt.prototype = {
      defaults: {},
      set: function(a) {
        return H(this.options, a), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(a) {
        if (C(a, "recognizeWith", this))
          return this;
        var l = this.simultaneous;
        return a = Ye(a, this), l[a.id] || (l[a.id] = a, a.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(a) {
        return C(a, "dropRecognizeWith", this) ? this : (a = Ye(a, this), delete this.simultaneous[a.id], this);
      },
      requireFailure: function(a) {
        if (C(a, "requireFailure", this))
          return this;
        var l = this.requireFail;
        return a = Ye(a, this), qt(l, a) === -1 && (l.push(a), a.requireFailure(this)), this;
      },
      dropRequireFailure: function(a) {
        if (C(a, "dropRequireFailure", this))
          return this;
        a = Ye(a, this);
        var l = qt(this.requireFail, a);
        return l > -1 && this.requireFail.splice(l, 1), this;
      },
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function(a) {
        return !!this.simultaneous[a.id];
      },
      emit: function(a) {
        var l = this, u = this.state;
        function g(m) {
          l.manager.emit(m, a);
        }
        u < At && g(l.options.event + zs(u)), g(l.options.event), a.additionalEvent && g(a.additionalEvent), u >= At && g(l.options.event + zs(u));
      },
      tryEmit: function(a) {
        if (this.canEmit())
          return this.emit(a);
        this.state = xt;
      },
      canEmit: function() {
        for (var a = 0; a < this.requireFail.length; ) {
          if (!(this.requireFail[a].state & (xt | Ge)))
            return !1;
          a++;
        }
        return !0;
      },
      recognize: function(a) {
        var l = H({}, a);
        if (!le(this.options.enable, [this, l])) {
          this.reset(), this.state = xt;
          return;
        }
        this.state & (Mt | ve | xt) && (this.state = Ge), this.state = this.process(l), this.state & (at | Xt | At | ve) && this.tryEmit(l);
      },
      process: function(a) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function zs(a) {
      return a & ve ? "cancel" : a & At ? "end" : a & Xt ? "move" : a & at ? "start" : "";
    }
    function Ws(a) {
      return a == ge ? "down" : a == fe ? "up" : a == de ? "left" : a == ue ? "right" : "";
    }
    function Ye(a, l) {
      var u = l.manager;
      return u ? u.get(a) : a;
    }
    function ft() {
      Pt.apply(this, arguments);
    }
    A(ft, Pt, {
      defaults: {
        pointers: 1
      },
      attrTest: function(a) {
        var l = this.options.pointers;
        return l === 0 || a.pointers.length === l;
      },
      process: function(a) {
        var l = this.state, u = a.eventType, g = l & (at | Xt), m = this.attrTest(a);
        return g && (u & j || !m) ? l | ve : g || m ? u & _ ? l | At : l & at ? l | Xt : at : xt;
      }
    });
    function qe() {
      ft.apply(this, arguments), this.pX = null, this.pY = null;
    }
    A(qe, ft, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: Ms
      },
      getTouchAction: function() {
        var a = this.options.direction, l = [];
        return a & wt && l.push(pe), a & zt && l.push(me), l;
      },
      directionTest: function(a) {
        var l = this.options, u = !0, g = a.distance, m = a.direction, T = a.deltaX, M = a.deltaY;
        return m & l.direction || (l.direction & wt ? (m = T === 0 ? Ue : T < 0 ? de : ue, u = T != this.pX, g = Math.abs(a.deltaX)) : (m = M === 0 ? Ue : M < 0 ? fe : ge, u = M != this.pY, g = Math.abs(a.deltaY))), a.direction = m, u && g > l.threshold && m & l.direction;
      },
      attrTest: function(a) {
        return ft.prototype.attrTest.call(this, a) && (this.state & at || !(this.state & at) && this.directionTest(a));
      },
      emit: function(a) {
        this.pX = a.deltaX, this.pY = a.deltaY;
        var l = Ws(a.direction);
        l && (a.additionalEvent = this.options.event + l), this._super.emit.call(this, a);
      }
    });
    function Li() {
      ft.apply(this, arguments);
    }
    A(Li, ft, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Wt];
      },
      attrTest: function(a) {
        return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & at);
      },
      emit: function(a) {
        if (a.scale !== 1) {
          var l = a.scale < 1 ? "in" : "out";
          a.additionalEvent = this.options.event + l;
        }
        this._super.emit.call(this, a);
      }
    });
    function Ai() {
      Pt.apply(this, arguments), this._timer = null, this._input = null;
    }
    A(Ai, Pt, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [Bs];
      },
      process: function(a) {
        var l = this.options, u = a.pointers.length === l.pointers, g = a.distance < l.threshold, m = a.deltaTime > l.time;
        if (this._input = a, !g || !u || a.eventType & (_ | j) && !m)
          this.reset();
        else if (a.eventType & Y)
          this.reset(), this._timer = E(function() {
            this.state = Mt, this.tryEmit();
          }, l.time, this);
        else if (a.eventType & _)
          return Mt;
        return xt;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(a) {
        this.state === Mt && (a && a.eventType & _ ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = p(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Oi() {
      ft.apply(this, arguments);
    }
    A(Oi, ft, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Wt];
      },
      attrTest: function(a) {
        return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & at);
      }
    });
    function Ii() {
      ft.apply(this, arguments);
    }
    A(Ii, ft, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: wt | zt,
        pointers: 1
      },
      getTouchAction: function() {
        return qe.prototype.getTouchAction.call(this);
      },
      attrTest: function(a) {
        var l = this.options.direction, u;
        return l & (wt | zt) ? u = a.overallVelocity : l & wt ? u = a.overallVelocityX : l & zt && (u = a.overallVelocityY), this._super.attrTest.call(this, a) && l & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && f(u) > this.options.velocity && a.eventType & _;
      },
      emit: function(a) {
        var l = Ws(a.offsetDirection);
        l && this.manager.emit(this.options.event + l, a), this.manager.emit(this.options.event, a);
      }
    });
    function Xe() {
      Pt.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    A(Xe, Pt, {
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
        var l = this.options, u = a.pointers.length === l.pointers, g = a.distance < l.threshold, m = a.deltaTime < l.time;
        if (this.reset(), a.eventType & Y && this.count === 0)
          return this.failTimeout();
        if (g && m && u) {
          if (a.eventType != _)
            return this.failTimeout();
          var T = this.pTime ? a.timeStamp - this.pTime < l.interval : !0, M = !this.pCenter || ze(this.pCenter, a.center) < l.posThreshold;
          this.pTime = a.timeStamp, this.pCenter = a.center, !M || !T ? this.count = 1 : this.count += 1, this._input = a;
          var U = this.count % l.taps;
          if (U === 0)
            return this.hasRequireFailures() ? (this._timer = E(function() {
              this.state = Mt, this.tryEmit();
            }, l.interval, this), at) : Mt;
        }
        return xt;
      },
      failTimeout: function() {
        return this._timer = E(function() {
          this.state = xt;
        }, this.options.interval, this), xt;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == Mt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function Lt(a, l) {
      return l = l || {}, l.recognizers = De(l.recognizers, Lt.defaults.preset), new Ri(a, l);
    }
    Lt.VERSION = "2.0.7", Lt.defaults = {
      domEvents: !1,
      touchAction: Us,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Oi, { enable: !1 }],
        [Li, { enable: !1 }, ["rotate"]],
        [Ii, { direction: wt }],
        [qe, { direction: wt }, ["swipe"]],
        [Xe],
        [Xe, { event: "doubletap", taps: 2 }, ["tap"]],
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
    var vo = 1, Fs = 2;
    function Ri(a, l) {
      this.options = H({}, Lt.defaults, l || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = Yr(this), this.touchAction = new Pi(this, this.options.touchAction), Vs(this, !0), P(this.options.recognizers, function(u) {
        var g = this.add(new u[0](u[1]));
        u[2] && g.recognizeWith(u[2]), u[3] && g.requireFailure(u[3]);
      }, this);
    }
    Ri.prototype = {
      set: function(a) {
        return H(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
      },
      stop: function(a) {
        this.session.stopped = a ? Fs : vo;
      },
      recognize: function(a) {
        var l = this.session;
        if (!l.stopped) {
          this.touchAction.preventDefaults(a);
          var u, g = this.recognizers, m = l.curRecognizer;
          (!m || m && m.state & Mt) && (m = l.curRecognizer = null);
          for (var T = 0; T < g.length; )
            u = g[T], l.stopped !== Fs && (!m || u == m || u.canRecognizeWith(m)) ? u.recognize(a) : u.reset(), !m && u.state & (at | Xt | At) && (m = l.curRecognizer = u), T++;
        }
      },
      get: function(a) {
        if (a instanceof Pt)
          return a;
        for (var l = this.recognizers, u = 0; u < l.length; u++)
          if (l[u].options.event == a)
            return l[u];
        return null;
      },
      add: function(a) {
        if (C(a, "add", this))
          return this;
        var l = this.get(a.options.event);
        return l && this.remove(l), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
      },
      remove: function(a) {
        if (C(a, "remove", this))
          return this;
        if (a = this.get(a), a) {
          var l = this.recognizers, u = qt(l, a);
          u !== -1 && (l.splice(u, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(a, l) {
        if (a !== s && l !== s) {
          var u = this.handlers;
          return P(Ne(a), function(g) {
            u[g] = u[g] || [], u[g].push(l);
          }), this;
        }
      },
      off: function(a, l) {
        if (a !== s) {
          var u = this.handlers;
          return P(Ne(a), function(g) {
            l ? u[g] && u[g].splice(qt(u[g], l), 1) : delete u[g];
          }), this;
        }
      },
      emit: function(a, l) {
        this.options.domEvents && yo(a, l);
        var u = this.handlers[a] && this.handlers[a].slice();
        if (!(!u || !u.length)) {
          l.type = a, l.preventDefault = function() {
            l.srcEvent.preventDefault();
          };
          for (var g = 0; g < u.length; )
            u[g](l), g++;
        }
      },
      destroy: function() {
        this.element && Vs(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function Vs(a, l) {
      var u = a.element;
      if (u.style) {
        var g;
        P(a.options.cssProps, function(m, T) {
          g = He(u.style, T), l ? (a.oldCssProps[g] = u.style[g], u.style[g] = m) : u.style[g] = a.oldCssProps[g] || "";
        }), l || (a.oldCssProps = {});
      }
    }
    function yo(a, l) {
      var u = e.createEvent("Event");
      u.initEvent(a, !0, !0), u.gesture = l, l.target.dispatchEvent(u);
    }
    H(Lt, {
      INPUT_START: Y,
      INPUT_MOVE: Bt,
      INPUT_END: _,
      INPUT_CANCEL: j,
      STATE_POSSIBLE: Ge,
      STATE_BEGAN: at,
      STATE_CHANGED: Xt,
      STATE_ENDED: At,
      STATE_RECOGNIZED: Mt,
      STATE_CANCELLED: ve,
      STATE_FAILED: xt,
      DIRECTION_NONE: Ue,
      DIRECTION_LEFT: de,
      DIRECTION_RIGHT: ue,
      DIRECTION_UP: fe,
      DIRECTION_DOWN: ge,
      DIRECTION_HORIZONTAL: wt,
      DIRECTION_VERTICAL: zt,
      DIRECTION_ALL: Ms,
      Manager: Ri,
      Input: ot,
      TouchAction: Pi,
      TouchInput: Fe,
      MouseInput: We,
      PointerEventInput: Ci,
      TouchMouseInput: bi,
      SingleTouchInput: Ds,
      Recognizer: Pt,
      AttrRecognizer: ft,
      Tap: Xe,
      Pan: qe,
      Swipe: Ii,
      Pinch: Li,
      Rotate: Oi,
      Press: Ai,
      on: Yt,
      off: _e,
      each: P,
      merge: nt,
      extend: ut,
      assign: H,
      inherit: A,
      bindFn: rt,
      prefixed: He
    });
    var wo = typeof t < "u" ? t : typeof self < "u" ? self : {};
    wo.Hammer = Lt, typeof s == "function" && s.amd ? s(function() {
      return Lt;
    }) : n.exports ? n.exports = Lt : t[i] = Lt;
  })(window, document, "Hammer");
})(ir);
var Re = ir.exports;
const Na = _a(Re), Tt = /* @__PURE__ */ xo({
  __proto__: null,
  default: Na
}, [Re]), sr = 1, nr = 2, Ki = 4, $a = {
  mousedown: sr,
  mousemove: nr,
  mouseup: Ki
};
function Ha(n, t) {
  for (let e = 0; e < n.length; e++)
    if (t(n[e]))
      return !0;
  return !1;
}
function Ua(n) {
  const t = n.prototype.handler;
  n.prototype.handler = function(i) {
    const s = this.store;
    i.button > 0 && i.type === "pointerdown" && (Ha(s, (r) => r.pointerId === i.pointerId) || s.push(i)), t.call(this, i);
  };
}
function Ba(n) {
  n.prototype.handler = function(e) {
    let i = $a[e.type];
    i & sr && e.button >= 0 && (this.pressed = !0), i & nr && e.which === 0 && (i = Ki), this.pressed && (i & Ki && (this.pressed = !1), this.callback(this.manager, i, {
      pointers: [e],
      changedPointers: [e],
      pointerType: "mouse",
      srcEvent: e
    }));
  };
}
Ua(Re.PointerEventInput);
Ba(Re.MouseInput);
const za = Re.Manager;
let wi = class {
  constructor(t, e, i) {
    this.element = t, this.callback = e, this.options = { enable: !0, ...i };
  }
};
const Wa = Tt ? [
  [Tt.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [Tt.Rotate, { enable: !1 }],
  [Tt.Pinch, { enable: !1 }],
  [Tt.Swipe, { enable: !1 }],
  [Tt.Pan, { threshold: 0, enable: !1 }],
  [Tt.Press, { enable: !1 }],
  [Tt.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [Tt.Tap, { event: "anytap", enable: !1 }],
  [Tt.Tap, { enable: !1 }]
] : null, an = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
}, Fa = {
  doubletap: ["tap"]
}, Va = {
  pointerdown: "pointerdown",
  pointermove: "pointermove",
  pointerup: "pointerup",
  touchstart: "pointerdown",
  touchmove: "pointermove",
  touchend: "pointerup",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup"
}, fs = {
  KEY_EVENTS: ["keydown", "keyup"],
  MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
  WHEEL_EVENTS: [
    "wheel",
    "mousewheel"
  ]
}, Ga = {
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
}, hn = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
}, Ya = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", Kt = typeof window < "u" ? window : global;
let Qi = !1;
try {
  const n = {
    get passive() {
      return Qi = !0, !0;
    }
  };
  Kt.addEventListener("test", null, n), Kt.removeEventListener("test", null);
} catch {
  Qi = !1;
}
const qa = Ya.indexOf("firefox") !== -1, { WHEEL_EVENTS: Xa } = fs, ln = "wheel", cn = 4.000244140625, ja = 40, Za = 0.25;
class Ka extends wi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (s) => {
      if (!this.options.enable)
        return;
      let r = s.deltaY;
      Kt.WheelEvent && (qa && s.deltaMode === Kt.WheelEvent.DOM_DELTA_PIXEL && (r /= Kt.devicePixelRatio), s.deltaMode === Kt.WheelEvent.DOM_DELTA_LINE && (r *= ja)), r !== 0 && r % cn === 0 && (r = Math.floor(r / cn)), s.shiftKey && r && (r = r * Za), this.callback({
        type: ln,
        center: {
          x: s.clientX,
          y: s.clientY
        },
        delta: -r,
        srcEvent: s,
        pointerType: "mouse",
        target: s.target
      });
    }, this.events = (this.options.events || []).concat(Xa), this.events.forEach((s) => t.addEventListener(s, this.handleEvent, Qi ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((t) => this.element.removeEventListener(t, this.handleEvent));
  }
  enableEventType(t, e) {
    t === ln && (this.options.enable = e);
  }
}
const { MOUSE_EVENTS: Qa } = fs, dn = "pointermove", un = "pointerover", fn = "pointerout", gn = "pointerenter", mn = "pointerleave";
class Ja extends wi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (r) => {
      this.handleOverEvent(r), this.handleOutEvent(r), this.handleEnterEvent(r), this.handleLeaveEvent(r), this.handleMoveEvent(r);
    }, this.pressed = !1;
    const { enable: s } = this.options;
    this.enableMoveEvent = s, this.enableLeaveEvent = s, this.enableEnterEvent = s, this.enableOutEvent = s, this.enableOverEvent = s, this.events = (this.options.events || []).concat(Qa), this.events.forEach((r) => t.addEventListener(r, this.handleEvent));
  }
  destroy() {
    this.events.forEach((t) => this.element.removeEventListener(t, this.handleEvent));
  }
  enableEventType(t, e) {
    t === dn && (this.enableMoveEvent = e), t === un && (this.enableOverEvent = e), t === fn && (this.enableOutEvent = e), t === gn && (this.enableEnterEvent = e), t === mn && (this.enableLeaveEvent = e);
  }
  handleOverEvent(t) {
    this.enableOverEvent && t.type === "mouseover" && this._emit(un, t);
  }
  handleOutEvent(t) {
    this.enableOutEvent && t.type === "mouseout" && this._emit(fn, t);
  }
  handleEnterEvent(t) {
    this.enableEnterEvent && t.type === "mouseenter" && this._emit(gn, t);
  }
  handleLeaveEvent(t) {
    this.enableLeaveEvent && t.type === "mouseleave" && this._emit(mn, t);
  }
  handleMoveEvent(t) {
    if (this.enableMoveEvent)
      switch (t.type) {
        case "mousedown":
          t.button >= 0 && (this.pressed = !0);
          break;
        case "mousemove":
          t.which === 0 && (this.pressed = !1), this.pressed || this._emit(dn, t);
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
const { KEY_EVENTS: th } = fs, pn = "keydown", vn = "keyup";
class eh extends wi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (s) => {
      const r = s.target || s.srcElement;
      r.tagName === "INPUT" && r.type === "text" || r.tagName === "TEXTAREA" || (this.enableDownEvent && s.type === "keydown" && this.callback({
        type: pn,
        srcEvent: s,
        key: s.key,
        target: s.target
      }), this.enableUpEvent && s.type === "keyup" && this.callback({
        type: vn,
        srcEvent: s,
        key: s.key,
        target: s.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(th), t.tabIndex = this.options.tabIndex || 0, t.style.outline = "none", this.events.forEach((s) => t.addEventListener(s, this.handleEvent));
  }
  destroy() {
    this.events.forEach((t) => this.element.removeEventListener(t, this.handleEvent));
  }
  enableEventType(t, e) {
    t === pn && (this.enableDownEvent = e), t === vn && (this.enableUpEvent = e);
  }
}
const yn = "contextmenu";
class ih extends wi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (s) => {
      this.options.enable && this.callback({
        type: yn,
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
    t === yn && (this.options.enable = e);
  }
}
const Ji = 1, hi = 2, ts = 4, sh = {
  pointerdown: Ji,
  pointermove: hi,
  pointerup: ts,
  mousedown: Ji,
  mousemove: hi,
  mouseup: ts
}, nh = 1, rh = 2, oh = 3, ah = 0, hh = 1, lh = 2, ch = 1, dh = 2, uh = 4;
function fh(n) {
  const t = sh[n.srcEvent.type];
  if (!t)
    return null;
  const { buttons: e, button: i, which: s } = n.srcEvent;
  let r = !1, o = !1, h = !1;
  return t === ts || t === hi && !Number.isFinite(e) ? (r = s === nh, o = s === rh, h = s === oh) : t === hi ? (r = !!(e & ch), o = !!(e & uh), h = !!(e & dh)) : t === Ji && (r = i === ah, o = i === hh, h = i === lh), { leftButton: r, middleButton: o, rightButton: h };
}
function gh(n, t) {
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
class mh {
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
    const { handlers: o, handlersByElement: h } = this;
    let c = Di;
    typeof i == "string" || i && i.addEventListener ? c = { ...Di, srcElement: i } : i && (c = { ...Di, ...i });
    let f = h.get(c.srcElement);
    f || (f = [], h.set(c.srcElement, f));
    const p = {
      type: t,
      handler: e,
      srcElement: c.srcElement,
      priority: c.priority
    };
    s && (p.once = !0), r && (p.passive = !0), o.push(p), this._active = this._active || !p.passive;
    let E = f.length - 1;
    for (; E >= 0 && !(f[E].priority >= p.priority); )
      E--;
    f.splice(E + 1, 0, p);
  }
  remove(t, e) {
    const { handlers: i, handlersByElement: s } = this;
    for (let r = i.length - 1; r >= 0; r--) {
      const o = i[r];
      if (o.type === t && o.handler === e) {
        i.splice(r, 1);
        const h = s.get(o.srcElement);
        h.splice(h.indexOf(o), 1), h.length === 0 && s.delete(o.srcElement);
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
      }, h = [];
      for (let c = 0; c < i.length; c++) {
        const { type: f, handler: p, once: E } = i[c];
        if (p({
          ...t,
          type: f,
          stopPropagation: r,
          stopImmediatePropagation: o
        }), E && h.push(i[c]), s)
          break;
      }
      for (let c = 0; c < h.length; c++) {
        const { type: f, handler: p } = h[c];
        this.remove(f, p);
      }
    }
  }
  _normalizeEvent(t) {
    const e = this.eventManager.getElement();
    return {
      ...t,
      ...fh(t),
      ...gh(t, e),
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
const ph = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: za,
  touchAction: "none",
  tabIndex: 0
};
class vh {
  constructor(t = null, e) {
    this._onBasicInput = (s) => {
      const { srcEvent: r } = s, o = Va[r.type];
      o && this.manager.emit(o, s);
    }, this._onOtherEvent = (s) => {
      this.manager.emit(s.type, s);
    }, this.options = { ...ph, ...e }, this.events = /* @__PURE__ */ new Map(), this.setElement(t);
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
      recognizers: e.recognizers || Wa
    }).on("hammer.input", this._onBasicInput), e.recognizers || Object.keys(an).forEach((s) => {
      const r = this.manager.get(s);
      r && an[s].forEach((o) => {
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
    this.wheelInput = new Ka(t, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new Ja(t, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new eh(t, this._onOtherEvent, {
      enable: !1,
      tabIndex: e.tabIndex
    }), this.contextmenuInput = new ih(t, this._onOtherEvent, {
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
      const r = Fa[t];
      r && !this.options.recognizers && r.forEach((o) => {
        const h = i.get(o);
        e ? (h.requireFailure(t), s.dropRequireFailure(o)) : h.dropRequireFailure(t);
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
    const { manager: o, events: h } = this, c = hn[t] || t;
    let f = h.get(c);
    f || (f = new mh(this), h.set(c, f), f.recognizerName = Ga[c] || c, o && o.on(c, f.handleEvent)), f.add(t, e, i, s, r), f.isEmpty() || this._toggleRecognizer(f.recognizerName, !0);
  }
  _removeEventHandler(t, e) {
    if (typeof t != "string") {
      for (const o in t)
        this._removeEventHandler(o, t[o]);
      return;
    }
    const { events: i } = this, s = hn[t] || t, r = i.get(s);
    if (r && (r.remove(t, e), r.isEmpty())) {
      const { recognizerName: o } = r;
      let h = !1;
      for (const c of i.values())
        if (c.recognizerName === o && !c.isEmpty()) {
          h = !0;
          break;
        }
      h || this._toggleRecognizer(o, !1);
    }
  }
}
class wn {
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
class xn {
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
class En {
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
const yh = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class bt {
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
    if (this.#t = { ...yh, ...e }, this.#h = Da.idle, this.#o = ka, this.#e = t, !this.#e && this.#t.elementId && (this.#e = document.getElementById(this.#t.elementId)), !I.isElement(this.#e))
      throw "Must specify an element to receive user input.";
    this.#t.contextMenu || (window.oncontextmenu = (r) => (r.preventDefault(), !1));
    const s = {
      recognizerOptions: {
        pan: { threshold: this.#o ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#r = new vh(this.#e, s), this.pointerInit();
  }
  get agent() {
    return this.#r;
  }
  get pointer() {
    return this.#s instanceof wn ? this.#s : (this.#s = new wn(this), this.#s);
  }
  get touch() {
    return this.#n instanceof xn ? this.#n : (this.#n = new xn(this), this.#n);
  }
  get key() {
    return this.#i instanceof En ? this.#i : (this.#i = new En(this), this.#i);
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
    X(t) && (this.#a = t);
  }
  set panY(t) {
    X(y) && (this.#c = y);
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
    return !!(S(t) || D(e));
  }
  validOptions(t) {
    return x(t) && X(t) ? t : void 0;
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
    this.clientPosPrev = new Vt([null, null]), this.position = new Vt([0, 0]), this.movement = new Vt([0, 0]), this.dragstart = new Vt([null, null]), this.dragend = new Vt([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
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
class mt {
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
  static class = sn;
  static name = "Dividers";
  static type = "Divider";
  static create(t, e) {
    const i = `${e.core.id}_divider_${++mt.divideCnt}`;
    return e.id = i, mt.dividerList[i] = new mt(t, e), mt.dividerList[i];
  }
  static destroy() {
    for (let t in mt.dividerList)
      mt.dividerList[t].destroy();
    delete mt.dividerList[id];
  }
  static defaultNode() {
    return `
  <div slot="widget" class="${sn}" style="position: absolute;"></div>
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
    return I.elementDimPos(this.#h);
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
  get type() {
    return mt.type;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = "row-resize", this.eventsListen();
  }
  destroy() {
    this.#a.destroy(), this.el.remove(), delete mt.dividerList[this.id];
  }
  eventsListen() {
    this.#a = new bt(this.#h, { disableContextMenu: !1 }), this.#a.on("pointerover", this.onMouseEnter.bind(this)), this.#a.on("pointerout", this.onMouseOut.bind(this)), this.#a.on("pointerdrag", this.onPointerDrag.bind(this)), this.#a.on("pointerdragend", this.onPointerDragEnd.bind(this));
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
    this.#o.lastElementChild == null ? this.#o.innerHTML = this.dividerNode() : this.#o.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#h = I.findBySelector(`#${this.#t}`, this.#o);
  }
  dividerNode() {
    let t = this.#n.pos.top - I.elementDimPos(this.#o).top, e = this.#e.MainPane.rowsW + this.#e.scaleW, i = v(this.config.dividerHeight) ? this.config.dividerHeight : ca, s = this.#e.theme.tools.width;
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
    let t = this.#n.pos.top - I.elementDimPos(this.#o).top;
    t = t - this.height / 2, this.#h.style.top = `${t}px`;
  }
  hide() {
    this.#h.style.display = "none";
  }
  show() {
    this.#h.style.display = "block";
  }
}
const wh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', xh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', Eh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', rr = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', Th = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', Sh = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', Ch = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', Qe = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', bh = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', Mh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', Ph = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', Lh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Ah = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Oh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Ih = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Rh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', kh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', Dh = '<svg class="ov-icon" width="46.08" height="46.08" font-size="2.88em" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', _h = '<svg class="ov-icon" width="46.08" height="46.08" font-size="2.88em" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Nh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>', $h = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>', Hh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>', Uh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>', Bh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>', zh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>', Wh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>', Fh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>', Vh = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>', Gh = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>', Gt = 300, li = 400, Yh = `${li}px`, or = `${Gt}px`, qh = "100%", Xh = "100%", Nt = 30, kt = 35, ci = 25, ar = 25, di = ci + ar, ne = 60, Jt = "normal", te = 12, _i = "normal", ee = "Avenir, Helvetica, Arial, sans-serif", gs = "#141414", ps = "#666666", vs = "#cccccc", Le = "#888888", re = "#cccccc", hr = "25px", jh = "position: relative;", B = {
  COLOUR_BG: gs,
  COLOUR_BORDER: ps,
  COLOUR_TXT: vs,
  COLOUR_ICON: Le,
  COLOUR_ICONHOVER: re,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: Jt,
  FONTSIZE: te,
  FONTSTYLE: _i,
  FONTFAMILY: ee,
  FONT: `${_i} ${te}px ${Jt} ${ee}`,
  FONTSTRING: `font-style: ${_i}; font-size: ${te}px; font-weight: ${Jt}; font-family: ${ee};`
}, ct = {
  fontSize: te,
  fontWeight: Jt,
  fontFamily: ee,
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderWidth: 1,
  txtCol: "#000000",
  bakCol: "#cccccc",
  stroke: "#ffffff",
  fill: "#888888"
}, Dt = {
  COLOUR_ICON: Le,
  COLOUR_ICONHOVER: re,
  ICONSIZE: hr
}, ie = {
  COLOUR_ICON: Le,
  COLOUR_ICONHOVER: re,
  ICONSIZE: hr
}, Ni = {
  COLOUR_BG: gs,
  COLOUR_BORDER: ps,
  COLOUR_TXT: vs
}, $i = {
  COLOUR_BG: gs,
  COLOUR_BORDER: ps,
  COLOUR_TXT: vs
}, Zh = {
  FILL: re + "88"
}, V = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, Je = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, ni = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, Tn = Jt, ri = te, oi = ee, yt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: oi,
  FONTSIZE: ri,
  FONTWEIGHT: Tn,
  FONT_LABEL: `${Tn} ${ri}px ${oi}`,
  FONT_LABEL_BOLD: `bold ${ri}px ${oi}`
}, Sn = Jt, Cn = te, bn = ee, Ft = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: bn,
  FONTSIZE: Cn,
  FONTWEIGHT: Sn,
  FONT_LABEL: `${Sn} ${Cn}px ${bn}`,
  FONT_LABEL_BOLD: `bold ${ri}px ${oi}`
}, lr = {
  COLOUR_GRID: "#333"
}, Kh = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, Hi = {
  text: B.FONTSTRING,
  font: B.FONT,
  colour: B.COLOUR_TXT
}, Mn = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00"
}, Qh = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: B.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}, Ui = { arrowDown: Nh, arrowUp: $h, arrowDownRound: Hh, arrowUpRound: Uh, arrowDownRoundSolid: Bh, arrowUpRoundSolid: zh, buySolid: Wh, sellSolid: Fh }, Jh = {
  candle: {
    Type: V.CANDLE_SOLID,
    UpBodyColour: Je.COLOUR_CANDLE_UP,
    UpWickColour: Je.COLOUR_WICK_UP,
    DnBodyColour: Je.COLOUR_CANDLE_DN,
    DnWickColour: Je.COLOUR_WICK_DN
  },
  volume: {
    Height: ni.ONCHART_VOLUME_HEIGHT,
    UpColour: ni.COLOUR_VOLUME_UP,
    DnColour: ni.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: Ft.COLOUR_TICK,
    colourLabel: Ft.COLOUR_LABEL,
    colourCursor: Ft.COLOUR_CURSOR,
    colourCursorBG: Ft.COLOUR_CURSOR_BG,
    fontFamily: Ft.FONTFAMILY,
    fontSize: Ft.FONTSIZE,
    fontWeight: Ft.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: Le,
    iconHover: re
  },
  yAxis: {
    colourTick: yt.COLOUR_TICK,
    colourLabel: yt.COLOUR_LABEL,
    colourCursor: yt.COLOUR_CURSOR,
    colourCursorBG: yt.COLOUR_CURSOR_BG,
    fontFamily: yt.FONTFAMILY,
    fontSize: yt.FONTSIZE,
    fontWeight: yt.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: B.COLOUR_BG,
    BorderColour: B.COLOUR_BORDER,
    BorderThickness: B.BORDER_THICKNESS,
    TextColour: B.COLOUR_TXT,
    GridColour: lr.COLOUR_GRID
  },
  primaryPane: {
    separator: "#666"
  },
  secondaryPane: {
    separator: "#666"
  },
  time: {
    navigation: !1,
    font: Hi.font,
    colour: "#96a9db",
    handleColour: "#586ea6"
  },
  legend: {
    font: Hi.font,
    colour: Hi.colour,
    controls: !0,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: Le,
    hover: re
  },
  divider: {
    active: Mn.ACTIVE,
    idle: Mn.IDLE
  },
  watermark: Qh,
  trades: {
    iconBuy: Ui.arrowUp,
    iconSell: Ui.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    buyColour: "#0f0",
    sellColour: "#f00",
    defaultIcons: Ui,
    offset: 10
  }
}, tl = `
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
</style>`, el = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${Yh});
    min-height: var(--txc-min-height, ${or});
    max-width: var(--txc-max-width, ${qh});
    max-height: var(--txc-max-height, ${Xh});
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
`, Pn = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class vt {
  static #t = new dt();
  static get list() {
    return vt.#t;
  }
  #e;
  static create(t, e) {
    if (!x(t))
      return !1;
    t.id = S(t.name) ? K(t.name) : `${e.id}.theme`;
    const i = new vt(t, e);
    return vt.list.set(t.id, i), i;
  }
  constructor(t, e) {
    this.#e = e, this.setCurrent(t);
  }
  get list() {
    return vt.list;
  }
  setCurrent(t = {}) {
    t = x(t) ? t : {};
    const e = it(Jh), i = it(t), s = be(e, i);
    for (let r in s)
      Pn.includes(r) || (this[r] = s[r]);
    this.#e.refresh();
  }
  setTheme(t) {
    if (S(t) && vt.list.has(t)) {
      const e = vt.list.get(t);
      return this.setCurrent(e), !0;
    }
    return !1;
  }
  setProperty(t, e) {
    if (!S(t))
      return;
    const i = Gs(this, t), s = t.split(".");
    if (s.length == 1)
      this[s[0]] = e;
    else {
      let r = s.shift();
      this[r] = Kn(this[r], s.join("."), e);
    }
    return this.#e.refresh(), i;
  }
  getProperty(t) {
    return Gs(this, t);
  }
  deleteTheme(t) {
    return S(t) && vt.list.has(t) ? (vt.list.delete(t), !0) : !1;
  }
  exportTheme(t = {}) {
    x || (t = {});
    const e = t?.type, i = {};
    let s;
    for (let r in this)
      Pn.includes(r) || (i[r] = this[r]);
    switch (e) {
      case "json":
      default:
        const { replacer: r, space: o } = { ...t };
        s = JSON.stringify(i, r, o);
    }
    return s;
  }
}
class il {
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
class sl {
  #t;
  #e;
  #r;
  #s = 0;
  #i = {};
  #n;
  constructor(t, e, i, s) {
    this.#t = t, this.#e = i, this.#r = s;
    const r = `
      ${cr.ThreadWorker.toString()};
      const fn = ${e}
      const worker = new ThreadWorker(fn)
    `, o = new Blob([`;(() => {${r}})()`], { type: "text/javascript" }), h = URL.createObjectURL(o);
    this.#n = new Worker(h), URL.revokeObjectURL(h);
  }
  get id() {
    return this.#t;
  }
  get req() {
    return `r_${this.#s}`;
  }
  onmessage(t) {
    return D(this.#e) ? this.#e(t) : t;
  }
  onerror(t) {
    return D(this.#r) ? this.#r(t) : t;
  }
  postMessage(t) {
    return new Promise((e, i) => {
      try {
        let s = this.req;
        this.#i[s] = { resolve: e, reject: i }, this.#n.postMessage({ r: s, data: t }), this.#n.onmessage = (r) => {
          const { r: o, result: h } = r.data;
          if (o in this.#i) {
            const { resolve: c, reject: f } = this.#i[o];
            delete this.#i[o], c(this.onmessage(h));
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
let cr = class It {
  static #t = /* @__PURE__ */ new Map();
  static ThreadWorker = il;
  static Thread = sl;
  static create(t = "worker", e, i, s) {
    if (typeof window.Worker > "u")
      return !1;
    if (D(e))
      e = e.toString();
    else if (!S(e))
      return !1;
    return t = S(t) ? K(t) : K("worker"), It.#t.set(t, new It.Thread(t, e, i)), It.#t.get(t);
  }
  static destroy(t) {
    if (!S(t))
      return !1;
    It.#t.get(t).terminate(), It.#t.delete(t);
  }
  static end() {
    It.#t.forEach((t, e, i) => {
      It.destroy(e);
    });
  }
};
class G {
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
    this.#a = X(t) ? t : !1;
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
function dr(n, t) {
  return Math.round(n.measureText(t).width);
}
function ke(n = ct.fontSize, t = ct.fontWeight, e = ct.fontFamily) {
  return `${t} ${n}px ${e}`;
}
function xi(n, t, e) {
  n.font = ke(e?.fontSize, e?.fontWeight, e?.fontFamily);
  const i = dr(n, t), s = e?.paddingLeft || 0, r = e?.paddingRight || 0, o = e?.borderWidth || 0;
  return s + r + i + o * 2;
}
function Ei(n) {
  const t = n?.paddingTop || 0, e = n?.paddingBottom || 0, i = n?.borderWidth || 0, s = n?.fontSize || 0;
  return t + e + s + i * 2;
}
function nl(n, t, e, i) {
  n.fillStyle = i?.colour, n.font = ke(i?.fontSize, i?.fontWeight, i?.fontFamily), n.textAlign = i?.textAlign || "start", n.textBaseLine = i?.textBaseLine || "alphabetic", n.direction = i?.direction || "inherit", n.lineWidth = i?.width, n.strokeStyle = i?.border, i?.stroke ? n.strokeText(i?.text, t, e, i?.max) : n.fillText(i?.text, t, e, i?.max);
}
function Ae(n, t, e, i, s) {
  n.save(), n.font = ke(s?.fontSize, s?.fontWeight, s?.fontFamily), n.textBaseline = "top", n.fillStyle = s?.bakCol || ct.bakCol;
  let r = s?.width || xi(n, t, s), o = s?.height || Ei(s);
  n.fillRect(e, i, r, o), n.fillStyle = s?.txtCol || ct.txtCol, e = e + s?.paddingLeft, i = i + s?.paddingTop, n.fillText(`${t}`, e, i), n.restore();
}
function ur(n, t, e, i, s, r) {
  n.lineWidth = r?.width || ct.borderWidth, n.strokeStyle = r?.border || ct.stroke, n.beginPath(), n.rect(t, e, i, s), n.stroke();
}
function fr(n, t, e, i, s, r) {
  n.fillStyle = r?.fill || ct.fill, n.fillRect(t, e, i, s);
}
function rl(n, t, e, i, s, r) {
  S(r.fill) && fr(n, t, e, i, s, r), v(r.width) && r.width > 0 && ur(n, t, e, i, s, r);
}
function gr(n, t, e, i, s, r, o) {
  n.lineWidth = o?.width || ct.borderWidth, n.strokeStyle = o?.border || ct.stroke, pr(n, t, e, i, s, r), n.stroke();
}
function mr(n, t, e, i, s, r, o) {
  n.fillStyle = o?.fill || ct.fill, pr(n, t, e, i, s, r), n.fill();
}
function pr(n, t, e, i, s, r) {
  n.beginPath(), n.moveTo(t + r, e), n.arcTo(t + i, e, t + i, e + s, r), n.arcTo(t + i, e + s, t, e + s, r), n.arcTo(t, e + s, t, e, r), n.arcTo(t, e, t + i, e, r), n.closePath();
}
function ol(n, t, e, i, s, r, o) {
  S(o.fill) && mr(n, t, e, i, s, r, o?.fill), v(o.width) && o.width > 0 && gr(n, t, e, i, s, r, o?.border, o?.width);
}
function vr(n, t, e, i, s, r, o) {
  if (!(s < 3)) {
    var h = Math.PI * 2 / s;
    n.beginPath(), n.translate(t, e), n.rotate(r * Math.PI / 180), n.moveTo(i, 0);
    for (var c = 1; c < s; c++)
      n.lineTo(i * Math.cos(h * c), i * Math.sin(h * c));
    n.closePath(), he(n, o?.fill, o?.stroke, o?.width);
  }
}
function al(n, t, e) {
  if (t.length > 0) {
    n.beginPath();
    var i = t[0];
    n.moveTo(i.x, i.y);
    for (var s = 1; s < t.length; ++s)
      i = t[s], n.lineTo(i.x, i.y);
    n.closePath(), he(n, e?.fill, e?.stroke, e?.width);
  }
}
function hl(n, t, e, i, s) {
  vr(n, t, e, i, 3, s?.rotate || 0, s), he(n, s?.fill, s?.stroke, s?.width);
}
function ll(n, t, e, i, s, r) {
  n.beginPath(), n.moveTo(t - i / 2, e), n.lineTo(t, e - s / 2), n.lineTo(t + i / 2, e), n.lineTo(t, e + s / 2), n.closePath(), he(n, r?.fill, r?.stroke, r?.width);
}
function ae(n, t, e, i) {
  n.save();
  const s = e.width || 1;
  n.lineWidth = s, s % 2 && n.translate(0.5, 0.5), n.strokeStyle = e.stroke, b(e.dash) && n.setLineDash(e.dash), n.beginPath();
  let r = !0;
  t.forEach((o) => {
    o && o.x !== null && (r ? (n.moveTo(o.x, o.y), r = !1) : n.lineTo(o.x, o.y));
  }), i(), n.restore();
}
function cl(n, t, e) {
  ae(n, t, e, () => {
    n.stroke();
  });
}
function dl(n, t, e) {
  ae(n, t, e, () => {
    n.closePath();
  }), he(n, opts?.fill, opts?.stroke, opts?.size);
}
function ul(n, t, e) {
  n.beginPath(), n.moveTo(t[0].x, t[0].y);
  for (var i = e ?? 1, s = 0; s < t.length - 1; s++) {
    var r = s > 0 ? t[s - 1] : t[0], o = t[s], h = t[s + 1], c = s != t.length - 2 ? t[s + 2] : h, f = o.x + (h.x - r.x) / 6 * i, p = o.y + (h.y - r.y) / 6 * i, E = h.x - (c.x - o.x) / 6 * i, C = h.y - (c.y - o.y) / 6 * i;
    n.bezierCurveTo(f, p, E, C, h.x, h.y);
  }
  n.stroke();
}
function yr(n, t, e, i, s) {
  ae(n, [{ x: e, y: t }, { x: i, y: t }], s, () => {
    n.stroke(), n.closePath();
  });
}
function fl(n, t, e, i, s) {
  coords = [{ x: t, y: e }, { x: t, y, bottom: i }], ae(n, coords, s, () => {
    n.stroke(), n.closePath();
  });
}
function gl(n, t, e) {
  ae(n, t, e, () => {
    n.stroke(), n.closePath();
  });
}
function ml(n, t, e, i, s) {
  n.beginPath(), n.arc(t, e, i, 0, Math.PI * 2), n.closePath(), fillStroke(n, s?.fill, s?.stroke, s?.width);
}
function pl(n) {
  return n.ownerDocument && n.ownerDocument.defaultView && n.ownerDocument.defaultView.devicePixelRatio || 2;
}
function he(n, t, e, i) {
  S(t) && (n.fillStyle = t, n.fill()), v(i) && i > 0 && (n.lineWidth = i, n.strokeStyle = e || ct.stroke, n.stroke());
}
function wr(n, t, e, i, s, r, o, h, c, f) {
  n.drawImage(t, e, i, s, r, o, h, c, f);
}
const Z = {
  getPixelRatio: pl,
  fillStroke: he,
  calcTextWidth: dr,
  createFont: ke,
  getTextRectHeight: Ei,
  getTextRectWidth: xi,
  renderImage: wr,
  renderText: nl,
  renderTextBG: Ae,
  renderPath: ae,
  renderPathStroke: cl,
  renderPathClosed: dl,
  renderSpline: ul,
  renderLine: gl,
  renderLineHorizontal: yr,
  renderLineVertical: fl,
  renderCircle: ml,
  renderRect: rl,
  renderRectFill: fr,
  renderRectStroke: ur,
  renderRectRound: ol,
  renderRectRoundFill: mr,
  renderRectRoundStroke: gr,
  renderPolygonRegular: vr,
  renderPolygonIrregular: al,
  renderDiamond: ll,
  renderTriangle: hl
}, jt = 0, Ln = 4;
class $t extends G {
  static #t = 0;
  static get cnt() {
    return ++$t.#t;
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
  #w;
  #p;
  #y = 2;
  #m = {};
  #C;
  #P;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, void 0, r, o), this.#r = G.cnt, this.#l = o, this.#a = o.overlay, this.#u = s.type, this.#c = s.indicator, this.#d = this.core.TALib, this.#f = this.xAxis.range, this.eventsListen();
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
    return this.#C;
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
    this.#w = t;
  }
  set setUpdateValue(t) {
    this.#p = t;
  }
  set precision(t) {
    this.#y = t;
  }
  get precision() {
    return this.#y;
  }
  set style(t) {
    this.#m = t;
  }
  get style() {
    return this.#m;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  set value(t) {
    const e = this.core.time.timeFrameMS;
    let i = Math.floor(new Date(t[jt]) / e) * e;
    t[jt] = i, this.#v[jt] !== t[jt] ? (this.#v[jt] = t[jt], this.#w(t)) : this.#p(t);
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
    this.off(Ct, this.onStreamUpdate), this.chart.legend.remove(this.#C), this.#P = "destroyed";
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.emit(`${this.chartPaneID}_removeIndicator`, { id: this.id, paneID: this.chartPaneID });
  }
  visible(t) {
    return X(t) && (this.emit(`${this.chartPaneID}_visibleIndicator`, { id: this.id, paneID: this.chartPaneID, visible: t }), this.chartPane.indicators[this.id].layer.visible = t, this.draw()), this.chartPane.indicators[this.id].layer.visible;
  }
  settings(t) {
    return x(t) && (x(t?.config) && (this.params.overlay.settings = { ...this.params.overlay.settings, ...t.config }), x(t?.style) && (this.style = { ...this.style, ...t.style }), this.draw()), {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition
    };
  }
  eventsListen() {
    this.on(Ct, this.onStreamUpdate, this);
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
    if (D(t?.fn)) {
      let e = Ln.fn(this);
      if (t?.own)
        return e;
    } else if (D(this.core.config.callbacks?.indicatorSettings?.fn)) {
      let e = this.core.config.callbacks.indicatorSettings.fn(this);
      if (this.core.config.callbacks?.indicatorSettings?.own)
        return e;
    }
    this.core.log(`invokeSettings: ${this.id}`);
  }
  defineIndicator(t, e) {
    x(t) || (t = {}), this.definition.output = e.outputs;
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
    this.#C = this.chart.legend.add(t);
  }
  legendInputs(t = this.chart.cursorPos) {
    const e = [this.style.stroke];
    let s = this.Timeline.xPos2Index(t[0]) - (this.range.data.length - this.overlay.data.length), r = et(this.overlay.data.length - 1, 0, 1 / 0);
    return s = et(s, 0, r), { c: s, colours: e };
  }
  indicatorInput(t, e) {
    let i = [];
    do
      i.push(this.range.value(t)[Ln]);
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
    if (!S(t) || !(t in this.TALib) || !x(i) || !this.core.TALibReady)
      return !1;
    e.timePeriod = e.timePeriod || this.definition.input.timePeriod;
    let s, r, o = e.timePeriod;
    if (i instanceof Xi)
      s = 0, r = i.dataLength - o + 1;
    else if ("indexStart" in i || "indexEnd" in i || "tsStart" in i || "tsEnd" in i)
      s = i.indexStart || this.Timeline.t2Index(i.tsStart || 0) || 0, r = i.indexEnd || this.Timeline.t2Index(i.tsEnd) || this.range.Length - 1;
    else
      return !1;
    if (r - s < o)
      return !1;
    let h = [], c, f, p;
    for (; s < r; ) {
      e.inReal = this.indicatorInput(s, s + o), p = this.TALib[t](e), f = [], c = 0;
      for (let E of this.definition.output)
        f[c++] = p[E.name][0];
      h.push([this.range.value(s + o - 1)[0], f]), s++;
    }
    return h;
  }
  calcIndicatorHistory() {
    const t = () => {
      let e = this.calcIndicator(this.libName, this.definition.input, this.range);
      e && (this.overlay.data = e);
    };
    this.core.TALibReady ? t() : this.core.talibAwait.push(t.bind(this));
  }
  calcIndicatorStream(t, e, i = this.range) {
    if (!this.core.TALibReady || !S(t) || !(t in this.TALib) || !(i instanceof Xi) || i.dataLength < this.definition.input.timePeriod)
      return !1;
    let s = this.TALib[t](e), r = i.dataLength, o = i.value(r)[0], h = [], c = 0;
    for (let f of this.definition.output)
      h[c++] = s[f.name][0];
    return [o, h];
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
        Z[e](s, r, i);
        break;
      case "renderLineHorizontal":
        Z[e](s, r[0], r[1], r[2], i);
        break;
      case "renderLineVertical":
        Z[e](s, r[0], r[1], r[2], i);
        break;
      case "renderPathStroke":
        Z[e](s, r, i.style, i);
        break;
      case "renderPathClosed":
        Z[e](s, r, i);
        break;
      case "renderSpline":
        Z[e](s, r, i);
        break;
      case "renderRect":
        Z[e](s, r[0], r[1], r[2], r[3], i);
        break;
      case "renderRectRound":
        Z[e](s, r[0], r[1], r[2], r[3], r[4], i);
        break;
      case "renderPolygonRegular":
        Z[e](s, r[0], r[1], r[2], r[3], r[4], i);
        break;
      case "renderPolygonIrregular":
        Z[e](s, r, i);
        break;
      case "renderTriangle":
        Z[e](s, r[0], r[1], r[2], i);
        break;
      case "renderDiamond":
        Z[e](s, r[0], r[1], r[2], r[3], i);
        break;
      case "renderCircle":
        Z[e](s, r[0], r[1], r[2], i);
        break;
      case "renderImage":
        Z[e](s, i.src, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
    }
    s.restore();
  }
  draw() {
  }
}
const vl = {
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
}, yl = {
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
}, wl = {
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
}, xl = {
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
class ys extends $t {
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
    const h = o.overlay;
    this.id = o.overlay?.id || K(this.shortName), this.defineIndicator(h?.settings, vl), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return ys.primaryPane;
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
    let o = t.value(t.indexStart)[0], h = this.overlay.data[0][0], c = (o - h) / t.interval, f = this.Timeline.rangeScrollOffset, p = t.Length + f + 2, E = {};
    for (; p; )
      c < 0 || c >= this.overlay.data.length ? (e.lower.push({ x: null, y: null }), e.middle.push({ x: null, y: null }), e.upper.push({ x: null, y: null })) : (r.x = this.xAxis.xPos(i[c][0]), r.y = this.yAxis.yPos(i[c][1][0]), e.lower.push({ ...r }), r.x = this.xAxis.xPos(i[c][0]), r.y = this.yAxis.yPos(i[c][1][1]), e.middle.push({ ...r }), r.x = this.xAxis.xPos(i[c][0]), r.y = this.yAxis.yPos(i[c][1][2]), e.upper.push({ ...r })), c++, p--;
    E = {
      width: this.style.lowerLineWidth,
      stroke: this.style.lowerStroke,
      dash: this.style.lowerLineDash
    }, this.plot(e.lower, "renderLine", E), E = {
      width: this.style.middleLineWidth,
      stroke: this.style.middleStroke,
      dash: this.style.middleLineDash
    }, this.plot(e.middle, "renderLine", E), E = {
      width: this.style.upperLineWidth,
      stroke: this.style.upperStroke,
      dash: this.style.upperLineDash
    }, this.plot(e.upper, "renderLine", E), this.target.viewport.render();
  }
}
class ui extends $t {
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
    const h = o.overlay;
    this.id = o.overlay?.id || K(this.shortName), this.defineIndicator(h?.settings, yl), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
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
    let o = this.Timeline.rangeScrollOffset, h = t.data.length - this.overlay.data.length, c = t.indexStart - h - 2, f = t.Length + o * 2 + 2;
    for (; f; )
      c < 0 || c >= this.overlay.data.length ? s.push({ x: null, y: null }) : (r.x = this.xAxis.xPos(e[c][0]), r.y = this.yAxis.yPos(e[c][1]), s.push({ ...r })), c++, f--;
    this.plot(s, "renderLine", this.style), this.target.viewport.render();
  }
}
class ws extends $t {
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
  static scale = Zt[1];
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, s, r, o);
    const h = o.overlay;
    this.id = o.overlay?.id || K(this.shortName), this.defineIndicator(h?.settings, wl), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return ws.primaryPane;
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
    const h = this.overlay.data, c = this.xAxis.candleW;
    r.length = 0, this.Timeline.smoothScrollOffset;
    const f = {
      w: c
    };
    let p = this.Timeline.rangeScrollOffset, E = t.data.length - this.overlay.data.length, C = t.indexStart - E - 2, P = t.Length + p * 2 + 2;
    for (; P; )
      C < 0 || C >= this.overlay.data.length ? r.push({ x: null, y: null }) : (f.x = this.xAxis.xPos(h[C][0]), f.y = this.yAxis.yPos(h[C][1]), r.push({ ...f })), C++, P--;
    this.plot(r, "renderLine", this.style), this.target.viewport.render();
  }
}
class fi extends $t {
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
    const h = o.overlay;
    this.id = o.overlay?.id || K(this.shortName), this.defineIndicator(h?.settings, xl), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
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
    let o = this.Timeline.rangeScrollOffset, h = t.data.length - this.overlay.data.length, c = t.indexStart - h - 2, f = t.Length + o * 2 + 2;
    for (; f; )
      c < 0 || c >= this.overlay.data.length ? s.push({ x: null, y: null }) : (r.x = this.xAxis.xPos(e[c][0]), r.y = this.yAxis.yPos(e[c][1]), s.push({ ...r })), c++, f--;
    this.plot(s, "renderLine", this.style), this.target.viewport.render();
  }
}
const xr = {
  BB: { id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: ys },
  EMA: { id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: ui },
  RSI: { id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: ws },
  SMA: { id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: fi }
};
class st extends HTMLElement {
  shadowRoot;
  template;
  id = K(Ee);
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
    v(t) && (t += "px"), !(!["width", "height"].includes(e) || !S(t)) && (this.style[e] = t);
  }
}
class Er {
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
    return Go(t);
  }
  numDigits(t) {
    return jn(t);
  }
  countDigits(t) {
    return Vo(t);
  }
  precision(t) {
    return Zn(t);
  }
}
class El extends Er {
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
    }, i = ss(t.rangeDuration);
    e.units = i;
    for (let p in i)
      if (i[p] > 0) {
        e.units = [p, p], e.timeSpan = `${i[p]} ${p}`;
        break;
      }
    const s = t.interval, { xStep: r, rank: o } = this.xStep(t), h = this.pixel2T(this.width) + r;
    let c = t.timeMin - t.timeMin % r - r, f = c;
    for (; c < h; ) {
      let p = ii(c, "years"), E = ii(c, "months"), C = ii(c, "days");
      !(p in e.entries) && p >= f ? e.entries[p] = [this.dateTimeValue(p, s), this.t2Pixel(p), p, "major"] : !(E in e.entries) && E >= f ? e.entries[E] = [this.dateTimeValue(E, s), this.t2Pixel(E), E, "major"] : !(C in e.entries) && C >= f && (e.entries[C] = [this.dateTimeValue(C, s), this.t2Pixel(C), C, "major"]), e.entries[c] = [this.dateTimeValue(c, s), this.t2Pixel(c), c, "minor"], c += r;
    }
    return e.values = Object.values(e.entries), e;
  }
  xStep(t) {
    let e = la, i = this.#r ? t.interval : 1, s = we[0], r = J(this.width / t.Length), o = Gi[0], h = we.indexOf(i);
    for (; h-- >= 0 && !(r * (we[h] / i) >= e); )
      ;
    return s = we[h], o = Gi[h], { xStep: s, rank: o };
  }
  dateTimeValue(t, e) {
    if (t / R % 1 === 0) {
      const i = ls(t);
      return i === 1 ? cs(t) === 0 ? Yn(t) : Vn(t) : i;
    } else
      return e < $ || e < W ? qi(t) : Xn(t);
  }
}
const Bi = {
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
  },
  guards: {}
}, An = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, On = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, In = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, Rn = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, kn = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class Tr {
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
    this.#e(t), An.test(t) && this.#r(t), On.test(t) && this.#s(t), In.test(t) && this.#i(t), Rn.test(t) && this.#n(t), kn.test(t) && this.#o(t);
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
    if (Ra) {
      let e = document.getElementById("divValidColourTest");
      e || (e = document.createElement("div"), e.id = "divValidColourTest"), e.style.backgroundColor = "", e.style.backgroundColor = t, this.#t.isValid = !!e.style.backgroundColor.length;
    } else
      this.#t.isValid = !!(An.test(t) || On.test(t) || In.test(t) || Rn.test(t) || kn.test(t));
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
    const o = Math.max(e, i, s), h = o - Math.min(e, i, s), c = h ? o === e ? (i - s) / h : o === i ? 2 + (s - e) / h : 4 + (e - i) / h : 0;
    let f = [
      (60 * c < 0 ? 60 * c + 360 : 60 * c).toString(),
      (100 * (h ? o <= 0.5 ? h / (2 * o - h) : h / (2 - (2 * o - h)) : 0)).toString(),
      (100 * (2 * o - h) / 2).toString(),
      r.toString()
    ];
    return this.setHSLA(f), this;
  }
  #a(t, e, i) {
    e /= 100, i /= 100;
    const s = (h) => (h + t / 30) % 12, r = e * Math.min(i, 1 - i), o = (h) => i - r * Math.max(-1, Math.min(s(h) - 3, Math.min(9 - s(h), 1)));
    return [255 * o(0), 255 * o(8), 255 * o(4)];
  }
  #c(t, e, i) {
    i /= 100;
    const s = e * Math.min(i, 1 - i) / 100, r = (o) => {
      const h = (o + t / 30) % 12, c = i - s * Math.max(Math.min(h - 3, 9 - h, 1), -1);
      return Math.round(255 * c).toString(16).padStart(2, "0");
    };
    return `#${r(0)}${r(8)}${r(4)}`;
  }
  #u(t) {
    S(t) && (t = /([a-f\d]{2})/ig.exec(t));
    var e = [
      parseInt(t[0], 16),
      parseInt(t[1], 16),
      parseInt(t[2], 16),
      parseInt(t[3], 16) / 255
    ];
    this.setRGBA(e);
  }
  #d(t) {
    S(t) && (t = /([a-f\d]{2})/ig.exec(t));
    let e = parseInt(t[0], 16), i = parseInt(t[1], 16), s = parseInt(t[2], 16), r = parseInt(t[3], 16);
    e /= 255, i /= 255, s /= 255, r /= 255, this.setHSLA([e, i, s, r]);
  }
  #f(t) {
    let e, i, s, r, o = this.#t;
    if (o.r && o.g && o.b && o.a)
      return { r: e, g: i, b: s, a: r } = { ...o };
    if (S(t)) {
      let h = t.indexOf(",") > -1 ? "," : " ";
      t = t.substr(4).split(")")[0].split(h);
    }
    if (b(t)) {
      if (t.length < 3 || t.length > 4)
        return !1;
      e = t[0], i = t[1], s = t[2], r = S(t[3]) ? t[3] : "";
    } else if (x(t))
      e = t.r, i = t.g, s = t.b, r = "a" in t ? t.a : "";
    else
      return !1;
    return { r: e, g: i, b: s, a: r };
  }
  #v(t) {
    let e, i, s = 0, r = [], o = [], h = t.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    h.shift();
    for (let c of h)
      i = c.indexOf("%") > -1, e = parseFloat(c), s < 3 && i ? e = Math.round(255 * e / 100) : s == 3 && (!i && e >= 0 && e <= 1 ? e = Math.round(255 * e) : i && e >= 0 && e <= 100 ? e = Math.round(255 * e / 100) : e = ""), r[s] = (e | 256).toString(16).slice(1), o[s++] = e;
    this.setHex(r), this.setRGBA(o), this.#d(this.#t.hex);
  }
}
class xs {
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
    this.#e = xs.#t++, this.#r = t.core, this.#s = I.isElement(t.elContainer) ? t.elContainer : !1, this.#i = I.isElement(t.elHandle) ? t.elHandle : !1, this.#u = D(t.callback) ? t.callback : !1, I.isElement(this.#s) && I.isElement(this.#i) && (this.mount(), this.eventsListen());
  }
  set cursor(t) {
    this.#i.style.cursor = t;
  }
  get cursor() {
    return this.#i.style.cursor;
  }
  eventsListen() {
    this.#c = new bt(this.#i, { disableContextMenu: !1 }), this.#c.on("mouseenter", _t(this.onMouseEnter, 1, this, !0)), this.#c.on("mouseout", _t(this.onMouseOut, 1, this, !0)), this.#c.on("drag", ea(this.onHandleDrag, 100, this)), this.#c.on("enddrag", this.onHandleDragDone.bind(this)), this.#c.on("mousedown", _t(this.onMouseDown, 100, this, !0)), this.#c.on("mouseup", this.onMouseUp.bind(this));
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
    t && (this.colour = new Tr(t), this.#i.style.backgroundColor = this.colour.hex);
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
    let e = this.#r.range, i = parseInt(this.#i.style.marginLeft), s = this.#s.getBoundingClientRect().width, r = this.#i.getBoundingClientRect().width, o = s - r, h = t.position.x - this.#a.x, c = et(i + h, 0, o), f = (e.dataLength + e.limitFuture + e.limitPast) / s, p = Math.floor(c * f);
    this.setHandleDims(c, r), this.#r.jumpToIndex(p);
  }
  setHandleDims(t, e) {
    let i = this.#s.getBoundingClientRect().width;
    e = e || this.#i.getBoundingClientRect().width, t = t / i * 100, this.#i.style.marginLeft = `${t}%`, e = e / i * 100, this.#i.style.width = `${e}%`;
  }
}
let Sr = class {
  constructor(t = {}) {
    this.container = t.container, this.layers = [], this.id = k.idCnt++, this.scene = new k.Scene(), this.setSize(t.width || 0, t.height || 0);
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
    for (var i = this.layers, s = i.length, r = s - 1, o, h; r >= 0; ) {
      if (o = i[r], h = o.hit.getIntersection(t, e), h >= 0)
        return h;
      r--;
    }
    return -1;
  }
  get index() {
    let t = k.viewports, e, i = 0;
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
class Tl extends Sr {
  constructor(t = {}) {
    super(t), t.container.innerHTML = "", t.container.appendChild(this.scene.canvas), k.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", k.viewports.splice(this.index, 1);
  }
}
class Sl {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  visible = !0;
  constructor(t = {}) {
    this.id = k.idCnt++, this.hit = new k.Hit({
      contextType: t.contextType
    }), this.scene = new k.Scene({
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
class Cl {
  width = 0;
  height = 0;
  constructor(t) {
    t || (t = {}), this.id = k.idCnt++, this.contextType = t.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "scene-canvas", this.canvas.style.display = "block", this.context = this.canvas.getContext(this.contextType), t.width && t.height && this.setSize(t.width, t.height);
  }
  setSize(t, e) {
    return this.width = t, this.height = e, this.canvas.width = t * k.pixelRatio, this.canvas.style.width = `${t}px`, this.canvas.height = e * k.pixelRatio, this.canvas.style.height = `${e}px`, this.contextType === "2d" && k.pixelRatio !== 1 && this.context.scale(k.pixelRatio, k.pixelRatio), this;
  }
  clear() {
    let t = this.context;
    return this.contextType === "2d" ? t.clearRect(
      0,
      0,
      this.width * k.pixelRatio,
      this.height * k.pixelRatio
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
class bl {
  width = 0;
  height = 0;
  constructor(t) {
    t || (t = {}), this.contextType = t.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "hit-canvas", this.canvas.style.display = "none", this.canvas.style.position = "relative", this.context = this.canvas.getContext(this.contextType, {
      preserveDrawingBuffer: !0,
      antialias: !1
    }), t.width && t.height && this.setSize(t.width, t.height);
  }
  setSize(t, e) {
    return this.width = t, this.height = e, this.canvas.width = t * k.pixelRatio, this.canvas.style.width = `${t}px`, this.canvas.height = e * k.pixelRatio, this.canvas.style.height = `${e}px`, this;
  }
  clear() {
    let t = this.context;
    return this.contextType === "2d" ? t.clearRect(
      0,
      0,
      this.width * k.pixelRatio,
      this.height * k.pixelRatio
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
      t * k.pixelRatio,
      (this.height - e - 1) * k.pixelRatio,
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
const k = {
  idCnt: 0,
  viewports: [],
  pixelRatio: window && window.devicePixelRatio || 1,
  Node: Sr,
  Viewport: Tl,
  Layer: Sl,
  Scene: Cl,
  Hit: bl
}, gi = k;
class Ml {
  #t;
  #e;
  #r;
  #s;
  #i;
  constructor(t, e = []) {
    this.#r = t, this.#t = t.core, this.#s = new dt([...e]);
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
      ), S(e.instance?.id) || (e.instance.id = t), this.#s.set(e.instance.id, e), !0;
    } catch (i) {
      return console.error(`Error: Cannot instantiate ${t} overlay / indicator`), console.error(i), !1;
    }
  }
  removeOverlay(t) {
    this.#s.has(t) && (this.#s.get(t).layer.remove(), this.#s.delete(t));
  }
}
class mi extends G {
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
    if (e.save(), e.strokeStyle = this.core.theme.chart.GridColour || lr.COLOUR_GRID, t != "y") {
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
class es extends G {
  #t = [0, 0];
  #e = !0;
  #r;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e = !1, i = !1, s, r, o), this.core.on("chart_pan", (h) => {
      this.onMouseDragX(h);
    }), this.core.on("chart_panDone", (h) => {
      this.onMouseDragX(h);
    }), this.core.on("main_mousemove", (h) => {
      this.onMouseMoveX(h);
    }), this.#r = new bt(this.target.viewport.container, { disableContextMenu: !1 }), this.#r.on("pointermove", this.onMouseMove.bind(this)), this.#r.on("pointerenter", this.onMouseMove.bind(this));
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
    const e = x(t) ? t.position.x : t[0], i = x(t) ? t.position.y : t[1];
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
const Pl = [
  ["grid", { class: mi, fixed: !0 }],
  ["cursor", { class: es, fixed: !0 }]
];
class oe {
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
    return I.elementDimPos(this.#o);
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
    t = t.length == 0 ? it(Pl) : t;
    const { width: i, height: s } = this.layerConfig();
    let r = e ? gi.Node : gi.Viewport;
    this.#i = new r({
      width: i,
      height: s,
      container: this.#l
    }), this.#h = this.#i.scene.canvas, this.#n = new Ml(this, t);
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
    if (!(i instanceof dt))
      return !1;
    for (let [s, r] of i)
      !x(r) || !D(r?.instance?.draw) || (r.instance.draw(), r.fixed || (r.instance.position = [this.#t.scrollPos, 0]));
  }
  render() {
    this.#i.render();
  }
}
class Ll extends G {
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
    const e = this.scene.context, i = this.xAxis.xAxisGrads.values, s = 0, r = this.theme.xAxis, o = X(r.tickMarker) ? r.tickMarker : !0;
    e.save(), e.strokeStyle = r.colourTick, e.fillStyle = r.colourTick, e.font = `${r.fontWeight} ${r.fontSize}px ${r.fontFamily}`;
    for (let h of i) {
      let c = J(h[1]), f = Math.floor(e.measureText(`${h[0]}`).width * 0.5);
      e.fillText(h[0], c - f + s, this.xAxis.xAxisTicks + 12), o && (e.beginPath(), e.moveTo(c + s, 0), e.lineTo(c + s, this.xAxis.xAxisTicks), e.stroke());
    }
    e.restore();
  }
}
class Al extends G {
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
class Ol extends G {
  #t = [0, 0];
  constructor(t, e = !1, i = !1, s, r) {
    e = r.time.xAxis, super(t, e, i, s, r), this.viewport = t.viewport;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw() {
    const t = this.scene.context, e = this.target.viewport.container.getBoundingClientRect(), i = this.core.mousePos.x - e.left;
    let s = this.xAxis.xPos2Time(i), r = new Date(s), o = r.toUTCString(), h = {
      fontSize: this.theme.xAxis.fontSize * 1.05,
      fontWeight: this.theme.xAxis.fontWeight,
      fontFamily: this.theme.xAxis.fontFamily,
      txtCol: this.theme.xAxis.colourCursor,
      bakCol: this.theme.xAxis.colourCursorBG,
      paddingTop: 5,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4
    }, c = xi(t, o, h), f = i + this.core.bufferPx;
    f = this.xAxis.xPosSnap2CandlePos(f), f = f - Math.round(c * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), t.save(), Ae(t, o, f, 1, h), t.restore();
  }
}
const Il = [
  ["labels", { class: Ll, fixed: !1, required: !0 }],
  ["overlay", { class: Al, fixed: !1, required: !0 }],
  ["cursor", { class: Ol, fixed: !1, required: !0 }]
];
class Rl {
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
  #d = new dt();
  #f;
  #v;
  #w;
  #p;
  #y;
  #m;
  #C;
  #P;
  #g;
  #b;
  #M;
  #L;
  #S;
  #T;
  #I = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #E = { end: !1, start: !1 };
  constructor(t, e) {
    this.#n = t, this.#s = e, this.#i = e.elements.elTime, this.#o = t.Chart, this.#h = new El(this, this.#o), this.init();
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
    return this.#C;
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
    return I.elementDimPos(this.#i);
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
    this.#l = new Ht(t, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get time() {
    return this;
  }
  init() {
    const t = this.#i;
    this.#a = t.viewport, this.#c = t.overview, this.#v = t.overview.icons, this.#w = t.overview.scrollBar, this.#p = t.overview.handle, this.#y = t.overview.rwdStart, this.#m = t.overview.fwdEnd;
    const e = {
      core: this.#n,
      elContainer: this.#w,
      elHandle: this.#p,
      callback: null
    };
    this.#T = new xs(e), this.#n.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(t) {
    this.#i.style.width = `${t}px`, this.#a.style.width = `${t}px`;
  }
  setDimensions(t) {
    const e = this.config.buffer || yi, i = t.w, s = this.height, r = Math.round(i * ((100 + e) * 0.01));
    this.#u.setSize(i, s, r), this.draw();
  }
  navigationDisplay(t) {
    if (t)
      this.#m.style["margin-top"] = 0, this.#y.style["margin-top"] = 0;
    else {
      const e = this.core.theme.xAxis?.background ? this.core.theme.xAxis.Background : this.core.theme.chart.Background;
      this.#c.style.visibility = "hidden", this.#m.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#y.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#m.style.background = this.core.theme.chart.Background, this.#y.style.background = e;
    }
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#h.initXAxisGrads(), this.draw(), this.eventsListen(), Bi.id = this.id, Bi.context = this, this.stateMachine = Bi, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#b.destroy(), this.#M.destroy(), this.#L.destroy(), this.off("main_mousemove", this.drawCursorTime), this.off("setRange", this.onSetRange), this.#m.removeEventListener("click", _t), this.#y.removeEventListener("click", _t), this.#u.destroy(), this.element.remove();
  }
  eventsListen() {
    this.#b = new bt(this.#a, { disableContextMenu: !1 }), this.#b.on("dblclick", this.onDoubleClick.bind(this)), this.#b.on("pointerover", this.onPointerEnter.bind(this)), this.#b.on("pointerout", this.onPointerLeave.bind(this)), this.#b.on("pointerdrag", this.onPointerDrag.bind(this)), this.#M = new bt(this.#m, { disableContextMenu: !1 }), this.#M.on("pointerover", () => this.showJump(this.#E.end)), this.#M.on("pointerleave", () => this.hideJump(this.#E.end)), this.#L = new bt(this.#y, { disableContextMenu: !1 }), this.#L.on("pointerover", () => this.showJump(this.#E.start)), this.#L.on("pointerleave", () => this.hideJump(this.#E.start)), this.on("main_mousemove", this.#g.draw, this.#g), this.on("setRange", this.onSetRange, this), this.#m.addEventListener("click", _t(this.onMouseClick, 1e3, this, !0)), this.#y.addEventListener("click", _t(this.onMouseClick, 1e3, this, !0));
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
    t.domEvent.target.style.cursor = "ew-resize", this.#c.style.visibility = "visible", this.hideCursorTime();
  }
  onPointerLeave(t) {
    this.#n.theme?.time?.navigation === !1 && !(this.#E.end && this.#E.start) && (this.#c.style.visibility = "hidden");
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
    let i = this.#w.getBoundingClientRect().width, s = t.dataLength + t.limitFuture + t.limitPast, r = i / s, o = t.Length * r, h = (e + t.limitPast) * r;
    this.#T.setHandleDims(h, o);
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
    let t = it(Il);
    this.#u = new oe(this, this.#a, t, !1), this.#g = this.graph.overlays.get("cursor").instance, this.#C = this.graph.overlays.get("labels").instance, this.#P = this.graph.overlays.get("overlay").instance;
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
    this.#u.overlays.list.get("cursor").layer.visible = !1, this.render();
  }
  showCursorTime() {
    this.#u.overlays.list.get("cursor").layer.visible = !0, this.render();
  }
  hideJump(t) {
    this.#n.theme?.time?.navigation === !1 && (this.#c.style.visibility = "hidden");
  }
  showJump(t) {
    this.#c.style.visibility = "visible", this.hideCursorTime();
  }
}
const kl = {
  renderQ: new dt(),
  rendered: [],
  renderLog: !1,
  dropFrames: !0,
  graphs: [],
  range: {},
  init: function(n) {
    x(n) && (this.renderLog = n?.renderLog || !1, this.dropFrames = n?.dropFrames || !0, this.graphs = b(n?.graphs) ? [...n.graphs] : [], this.range = x(n?.range) ? n.range : {});
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
        D(e.draw) && e.draw(t.range, t.update);
      for (let e of t.graphs)
        D(e.render) && e.render();
      this.frameDone();
    }
  }
}, ti = kl, Dn = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select"
];
class Dl {
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
    const e = (i) => S(i.dataset.icon) ? { id: i.id, icon: i.dataset.icon } : i.parentElement.className !== "controls" ? e(i.parentElement) : !1;
    return e(t);
  }
  onMouseOver(t) {
  }
  primaryPanePan() {
    for (let t of Dn)
      this.#t.style.setProperty(t, "none");
  }
  primaryPanePanDone() {
    for (let t of Dn)
      this.#t.style.removeProperty(t);
  }
  add(t) {
    if (!x(t) || !("title" in t))
      return !1;
    let e;
    const i = () => {
      this.#s.error("ERROR: Legend parent missing!");
    };
    t.id = t?.id || K("legend"), t.type = t?.type || "overlay", t.parent = t?.parent || i;
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
      let h = o.querySelector("svg");
      h.style.width = `${this.#i.controlsW}px`, h.style.height = `${this.#i.controlsH}px`, h.style.fill = `${this.#i.controlsColour}`, h.onpointerover = (c) => c.currentTarget.style.fill = this.#i.controlsOver, h.onpointerout = (c) => c.currentTarget.style.fill = this.#i.controlsColour, e = t.parent.onLegendAction.bind(t.parent), this.#e[t.id].click.push({ el: o, click: e }), o.addEventListener("click", e);
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
    if (!x(e) || !(t in this.#e) || this.#s.range.data.length == 0)
      return !1;
    let i = this.#e[t].source(e.pos);
    const s = this.#t.buildInputs(i);
    this.#t.legends.querySelector(`#legend_${t} dl`).innerHTML = s;
  }
}
const zi = {
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
class _l extends Er {
  #t;
  #e;
  #r;
  #s;
  #i = Zt[0];
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
  #l = qs;
  #a = ha;
  #c = 3;
  #u;
  #d;
  constructor(t, e, i = Zt[0], s) {
    super(t), this.#r = e, this.#e = t, this.#t = t.parent, this.yAxisType = i, s = s || this.core.range, this.setRange(s);
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
    this.#i = Zt.includes(t) ? t : Zt[0];
  }
  get yAxisType() {
    return this.#i;
  }
  set yAxisStep(t) {
    this.#l = v(t) ? t : qs;
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
        return J(this.$2Pixel(Yo(t)));
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
    const r = s - i, o = r * 0.01, h = t * o;
    i -= h, s += h, !(s < i || i <= 1 / 0 * -1 || s >= 1 / 0) && (e.manual.max = s, e.manual.min = i, e.manual.mid = r / 2, e.manual.diff = r, e.manual.zoom = h, this.calcGradations());
  }
  setRange(t) {
    this.#o.automatic.range = t, this.#d = new Proxy(t, {
      get: (e, i) => {
        const s = this.#n, r = this.#o;
        switch (i) {
          case "max":
            return r[s][i];
          case "min":
            return r[s][i];
          case "mid":
            return r[s][i];
          case "diff":
            return r[s][i];
          case "zoom":
            return r[s][i];
          case "offset":
            return r[s][i];
          default:
            return e[i];
        }
      }
    });
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
    let r, o, h;
    const c = [];
    o = t - e, o = this.rangeH > 0 ? this.rangeH : 1, h = o / (this.height / (this.core.theme.yAxis.fontSize * 1.75));
    let f = Math.pow(10, Math.ceil(Math.log10(h)));
    h < 0.25 * f ? f = 0.25 * f : h < 0.5 * f && (f = 0.5 * f);
    var p = Math.ceil(e / f) * f, E = Math.floor(t / f) * f;
    let C = this.height, P = (E - p) / f, F = this.height / P, H = this.countDigits(P), ut;
    for (var nt = p; nt <= E; nt += f)
      r = this.countDigits(nt), ut = this.niceValue(r, i, H), c.push([ut, ki(C), r]), C -= F;
    return c;
  }
  niceValue(t, e = !0, i) {
    if (t.integers) {
      let s = i.integers;
      if (s - 2 > 0) {
        let r = qo(10, s - 2);
        return Math.floor(t.value / r) * r;
      } else
        return e ? (s = s > 0 ? s : s * -1, ki(t.value, s)) : Math.floor(t.value);
    } else {
      let s = t.decimals - i.decimals;
      return s = s > 0 ? s : s * -1, ki(t.value, s);
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
const Nl = {
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
class $l extends G {
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
    }, o = r.fontSize + r.paddingTop + r.paddingBottom, h = e - o * 0.5;
    const c = this.scene.context;
    this.scene.clear(), c.save(), c.fillStyle = r.bakCol, c.fillRect(1, h, this.width, o), Ae(c, `${s}`, 1, h, r), c.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
class Hl extends G {
  constructor(t, e, i, s, r, o) {
    r = i, i = i.yAxis, super(t, e, i, s, r, o), this.viewport = t.viewport;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw() {
    const t = this.scene.context, e = this.yAxis, i = this.yAxis.calcGradations() || [], s = this.theme.yAxis, r = X(s.tickMarker) ? s.tickMarker : !0;
    let o = [], h;
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
      h = e.$2Pixel(c[0]), t.fillText(c[0], e.yAxisTicks + 5, h + s.fontSize * 0.3), r && (t.beginPath(), t.moveTo(o[0], h), t.lineTo(o[1], h), t.stroke());
    t.restore();
  }
}
class Ul extends G {
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
class Bl extends G {
  constructor(t, e, i, s, r, o) {
    r = i, i = i.yAxis, super(t, e, i, s, r, o), this.viewport = t.viewport;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw(t) {
    if (t === void 0)
      return;
    const e = this.scene.context, i = this.core.stream instanceof Qt && this.config.stream.tfCountDown;
    let s = t[4], r = this.parent.nicePrice(s), o = {
      fontSize: yt.FONTSIZE * 1.05,
      fontWeight: yt.FONTWEIGHT,
      fontFamily: yt.FONTFAMILY,
      txtCol: "#FFFFFF",
      bakCol: yt.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }, h = 0, c = Ei(o), f = this.parent.yPos(s) - c * 0.5;
    this.scene.clear(), e.save(), t[4] >= t[1] ? o.bakCol = this.theme.candle.UpBodyColour : o.bakCol = this.theme.candle.DnBodyColour, Ae(e, r, h, f, o), i && (r = this.core.stream.countDownUpdate(), o.fontSize = o?.fontSize / 1.1, Ae(e, r, h, f + c, o)), e.restore(), this.viewport.render();
  }
}
const zl = [
  ["labels", { class: Hl, fixed: !0, required: !0 }],
  ["overlay", { class: Ul, fixed: !0, required: !0 }],
  ["price", { class: Bl, fixed: !0, required: !0 }],
  ["cursor", { class: $l, fixed: !0, required: !0 }]
];
class Wl {
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
  #w;
  #p = new dt();
  #y;
  #m;
  #C;
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
    return this.#w;
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
    this.#y = t;
  }
  get graph() {
    return this.#y;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return I.elementDimPos(this.#c);
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
    this.#o = new Ht(t, this);
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
    this.#a = new _l(this, this, this.options.yAxisType, t), this.createGraph(), this.addOverlays([]), this.#a.calcGradations(), this.draw(), this.eventsListen();
    const e = it(Nl);
    e.id = this.id, e.context = this, this.stateMachine = e, this.stateMachine.start();
  }
  restart() {
    this.#a.setRange(this.#s.range), this.draw();
  }
  destroy() {
    this.stateMachine.destroy(), this.#y.destroy(), this.#m.destroy(), this.off(`${this.#n.id}_mousemove`, this.onMouseMove), this.off(`${this.#n.id}_mouseout`, this.#w.erase), this.off(Ct, this.onStreamUpdate), this.element.remove();
  }
  eventsListen() {
    let t = this.#y.viewport.scene.canvas;
    this.#m = new bt(t, { disableContextMenu: !1 }), this.#m.setCursor("ns-resize"), this.#m.on("pointerdrag", this.onDrag.bind(this)), this.#m.on("pointerdragend", this.onDragDone.bind(this)), this.#m.on("wheel", this.onMouseWheel.bind(this)), this.#m.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.#n.id}_mousemove`, this.onMouseMove, this), this.on(`${this.#n.id}_mouseout`, this.#w.erase, this.#w), this.on(Ct, this.#v.draw, this.#v);
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
    this.#P = b(t) ? t : [Math.floor(t.position.x), Math.floor(t.position.y)], this.#w.draw(this.#P);
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
    this.setHeight(t.h), this.graph instanceof oe && (this.#y.setSize(e, t.h, e), this.draw());
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
    let t = it(zl);
    this.graph = new oe(this, this.#u, t, !1), this.#w = this.graph.overlays.get("cursor").instance, this.#d = this.graph.overlays.get("labels").instance, this.#f = this.graph.overlays.get("overlay").instance, this.#v = this.graph.overlays.get("price").instance;
  }
  addOverlays(t) {
    for (let e of t)
      ;
    this.graph.addOverlays(Array.from(this.#p));
  }
  render() {
    this.#y.render();
  }
  draw(t = this.range, e = !0) {
    this.#y.draw(t, e), this.#n.drawGrid();
  }
  resize(t = this.width, e = this.height) {
    this.setDimensions({ w: t, h: e });
  }
}
class Fl {
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
class Vl extends G {
  #t;
  #e;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e = !1, i = !1, s, r, o), this.#t = new Fl(t.scene, s), this.theme.volume.Height = et(s?.volume?.Height, 0, 100) || 100;
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
    }, h = Math.floor(i * this.theme.volume.Height / 100);
    let c = this.core.rangeScrollOffset, f = t.indexStart - c, p = t.Length + c * 2, E = p, C = f, P, F = 0;
    for (; E--; )
      P = t.value(C), P[4] !== null && (F = P[5] > F ? P[5] : F), C++;
    for (; p--; )
      P = t.value(f), o.x = J(this.xAxis.xPos(P[0]) - r / 2), P[4] !== null && (o.h = h - h * ((F - P[5]) / F), o.raw = e[f], this.#t.draw(o)), f++;
  }
}
class Cr {
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
    let h = Math.max(Math.floor(o * 0.5), 1), c = Math.abs(t.o - t.c), f = t.c === t.o ? 1 : 2, p = t.x, E = Math.floor(p) - 0.5;
    if (e.save(), e.strokeStyle = r, e.beginPath(), e.moveTo(E, Math.floor(t.h)), this.cfg.candle.Type === V.OHLC ? e.lineTo(E, Math.floor(t.l)) : i ? (e.lineTo(E, Math.floor(t.c)), e.moveTo(E, Math.floor(t.o))) : (e.lineTo(E, Math.floor(t.o)), e.moveTo(E, Math.floor(t.c))), e.lineTo(E, Math.floor(t.l)), e.stroke(), o == 3) {
      e.fillStyle = r;
      let C = i ? 1 : -1;
      e.rect(
        Math.floor(p - h),
        t.c,
        Math.floor(h * 2),
        C * Math.max(c, f)
      ), e.fill(), e.stroke();
    } else if (o > 3 && this.fill) {
      e.fillStyle = s;
      let C = i ? 1 : -1;
      e.rect(
        Math.floor(p - h),
        t.c,
        Math.floor(h * 2),
        C * Math.max(c, f)
      ), e.fill(), e.stroke();
    } else if (o > 3 && !this.fill && this.cfg.candle.Type !== V.OHLC) {
      let C = i ? 1 : -1;
      e.rect(
        Math.floor(p - h),
        t.c,
        Math.floor(h * 2),
        C * Math.max(c, f)
      ), e.stroke();
    } else
      this.cfg.candle.Type === V.OHLC ? (e.beginPath(), e.moveTo(E - h, t.o), e.lineTo(E, t.o), e.moveTo(E, t.c), e.lineTo(E + h, t.c), e.stroke()) : (e.strokeStyle = r, e.beginPath(), e.moveTo(
        E,
        Math.floor(Math.min(t.o, t.c))
      ), e.lineTo(
        E,
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
    if (!b(t) || t.length == 0)
      return;
    let e = this.ctx, i = this.cfg.candle, s;
    Math.max(t[0].w - 1, 1), t[0].x;
    let r = [t[0].x, t[0].h];
    e.save(), e.strokeStyle = i.AreaLineColour || i.UpBodyColour || i.DnBodyColour, e.lineWidth = 1, e.beginPath(), e.moveTo(t[0].x, t[0].h);
    let o = 0;
    for (; o < t.length; )
      e.lineTo(t[o].x, t[o].h), o++;
    if (i?.Type == "area") {
      if (s = e.createLinearGradient(0, 0, 0, this.scene.height), b(i.AreaFillColour))
        for (let [h, c] of i.AreaFillColour.entries())
          s.addColorStop(h, c);
      else
        S() ? s = i.AreaFillColour : s = i.UpBodyColour || i.DnBodyColour;
      e.stroke(), e.lineTo(t[o - 1].x, this.scene.height), e.lineTo(r[0], this.scene.height), e.fillStyle = s, e.closePath(), e.fill();
    } else
      e.stroke();
    e.restore(), t.length = 0;
  }
}
class br extends G {
  #t;
  constructor(t, e = !1, i = !1, s, r) {
    super(t, e = !1, i = !1, s, r), this.#t = new Cr(t.scene, s);
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
    let o = this.core.rangeScrollOffset, h = t.indexStart - o, c = t.Length + o * 2, f;
    for (this.core.stream && (this.core.stream.lastPriceMax = t.valueMax, this.core.stream.lastPriceMin = t.valueMin); c; ) {
      if (f = t.value(h), r.x = this.xAxis.xPos(f[0]), f?.[7]) {
        this.core.stream.lastXPos = r.x, this.core.stream.lastYPos = {
          o: r.o,
          h: r.h,
          l: r.l,
          c: r.c
        };
        break;
      }
      f[4] !== null && (r.o = this.yAxis.yPos(f[1]), r.h = this.yAxis.yPos(f[2]), r.l = this.yAxis.yPos(f[3]), r.c = this.yAxis.yPos(f[4]), r.raw = f, e(r)), h++, c--;
    }
    (i === V.AREA || i === V.LINE) && this.#t.areaRender();
  }
}
class Gl extends G {
  #t;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e = !1, i = !1, s, r, o), this.#t = new Cr(t.scene, s), this.theme.priceLineStyle = this.theme?.priceLineStyle || Kh;
  }
  set position(t) {
    this.setPosition(t[0], t[1]);
  }
  setPosition(t, e) {
    this.core.stream !== void 0 && (this.target.setPosition(t, e), this.core.stream.lastScrollPos = this.core.scrollPos);
  }
  draw() {
    if (this.core.stream === void 0 || !b(this.chart.streamCandle))
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
    r.o = this.yAxis.yPos(e[1]), r.h = this.yAxis.yPos(e[2]), r.l = this.yAxis.yPos(e[3]), r.c = this.yAxis.yPos(e[4]), r.raw = e, t.inRenderRange(e[0]) && i(r), e[4] >= e[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, yr(
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
    }, r = this.scene.context, o = this.theme, h = o.candle.UpBodyColour || o.candle.DnBodyColour;
    Math.max(t.w - 1, 1), t.x;
    let c;
    if (r.save(), r.fillStyle = h, r.strokeStyle = h, r.lineWidth = 1, r.beginPath(), r.moveTo(t.x, t.c), r.lineTo(s.x, s.h), o.candle.Type === V.AREA) {
      if (c = r.createLinearGradient(0, 0, 0, this.scene.height), b(o.candle.AreaFillColour))
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
class Yl {
  data;
  buy;
  sell;
  constructor(t, e) {
    this.scene = t, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = e.trades, this.buy = this.svg(this.cfg.iconBuy, this.cfg.buyColour), this.sell = this.svg(this.cfg.iconSell, this.cfg.sellColour);
  }
  svg(t, e, i) {
    let s = document.createElement("canvas"), r = this.cfg.iconHeight, o = this.cfg.iconWidth;
    s.height = r, s.width = o;
    let h = s.getContext("2d"), c = I.htmlToElement(t);
    c.style.fill = e, c = c.outerHTML;
    var f = window.URL || window.webkitURL || window, p = new Blob([c], { type: "image/svg+xml" }), E = f.createObjectURL(p), C = new Image();
    return C.onload = () => {
      h.drawImage(C, 0, 0, o, r), f.revokeObjectURL(E);
    }, C.src = E, s;
  }
  draw(t) {
    this.data = t;
    const e = t.side === "buy" ? this.buy : this.sell, i = this.cfg.iconHeight, s = this.cfg.iconWidth, r = this.data.x, o = this.data.y, h = this.scene.context;
    h.save(), h.drawImage(e, r, o, s, i), h.restore();
  }
}
class ql extends G {
  #t;
  constructor(t, e = !1, i = !1, s, r) {
    super(t, e = !1, i = !1, s, r), this.#t = new Yl(t.scene, s);
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  get trades() {
    return this.core.state.data.trades;
  }
  draw(t = this.core.range) {
    this.scene.clear();
    const i = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let s = this.core.rangeScrollOffset, r = t.indexStart - s, o = t.Length + s * 2, h, c;
    for (; o; ) {
      if (h = t.value(r), c = `${h[0]}`, Object.keys(this.trades).indexOf(c) >= 0)
        for (let f of this.trades[c])
          i.x = this.xAxis.xPos(h[0]), i.y = this.yAxis.yPos(h[2]), i.side = f.side, this.#t.draw(i);
      r++, o--;
    }
  }
}
class Xl extends G {
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, s, r, o), this.params.content = o?.content || "";
  }
  set position(t) {
    this.target.setPosition(0, 0);
  }
  draw() {
    if (this.config?.watermark?.imgURL)
      I.isImage(this.config?.watermark?.imgURL, this.renderImage.bind(this));
    else if (S(this.config?.watermark?.text)) {
      this.scene.clear();
      const t = this.scene.context;
      t.save(), this.renderText(), t.restore();
    } else
      return;
  }
  renderText() {
    const t = this.core.config?.watermark?.fontSize, e = this.core.config?.watermark?.fontWeight, i = this.core.config?.watermark?.fontFamily, s = this.core.config?.watermark?.textColour, r = {
      fontSize: t || this.theme.watermark.FONTSIZE,
      fontWeight: e || this.theme.watermark.FONTWEIGHT,
      fontFamily: i || this.theme.watermark.FONTFAMILY,
      txtCol: s || this.theme.watermark.COLOUR
    }, o = this.config.watermark.text, h = this.scene.context;
    h.font = ke(r?.fontSize, r?.fontWeight, r?.fontFamily), h.textBaseline = "top", h.fillStyle = r.txtCol;
    const c = Ei(r), f = xi(h, o, r), p = (this.scene.width - f) / 2, E = (this.scene.height - c) / 2;
    h.fillText(o, p, E);
  }
  renderImage(t) {
    if (!t)
      return;
    const e = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT, i = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH, s = (this.scene.width - i) / 2, r = (this.scene.height - e) / 2;
    this.scene.clear();
    const o = this.scene.context;
    o.save(), wr(o, t, s, r, e, i), o.restore();
  }
}
const jl = {
  primaryPane: [
    ["watermark", { class: Xl, fixed: !0, required: !0, params: { content: null } }],
    ["grid", { class: mi, fixed: !0, required: !0, params: { axes: "y" } }],
    ["volume", { class: Vl, fixed: !1, required: !0, params: { maxVolumeH: ni.ONCHART_VOLUME_HEIGHT } }],
    ["candles", { class: br, fixed: !1, required: !0 }],
    ["stream", { class: Gl, fixed: !1, required: !0 }],
    ["trades", { class: ql, fixed: !1, required: !1 }],
    ["cursor", { class: es, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: mi, fixed: !0, required: !0, params: { axes: "y" } }],
    ["cursor", { class: es, fixed: !0, required: !0 }]
  ]
}, _n = {
  primaryPane: {},
  secondaryPane: {
    candles: { class: br, fixed: !1, required: !0 }
  }
}, gt = {
  id: "chart",
  title: "",
  type: "chart",
  source: () => {
  }
};
class Oe {
  static #t = 0;
  static get cnt() {
    return Oe.#t++;
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
  #w;
  #p;
  #y;
  #m;
  #C;
  #P;
  #g;
  #b;
  #M = new dt();
  #L = new dt();
  #S = [0, 0];
  #T = !1;
  #I;
  #E;
  #x;
  #D = {
    valueMax: 100,
    valueMin: 0,
    valueDiff: 100
  };
  #R = {};
  constructor(t, e) {
    if (this.#n = t, this.#a = Oe.cnt, !x(e))
      return;
    this.#o = { ...e }, this.#r = this.#o.name, this.#s = this.#o.shortName, this.#i = this.#o.title, this.#c = this.#o.type == "primary" ? "primaryPane" : "secondaryPane", this.#g = this.#o.view, this.#f = this.#o.elements.elScale, this.#h = this.#o.parent, this.#d = this.#o.elements.elTarget, this.#d.id = this.id, this.legend = new Dl(this.elLegend, this), this.isPrimary ? (gt.type = "chart", gt.title = this.title, gt.parent = this, gt.source = this.legendInputs.bind(this), this.legend.add(gt), this.yAxisType = "default") : (gt.type = "secondary", gt.title = "", gt.parent = this, gt.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(gt), this.yAxisType = this.core.indicatorClasses[e.view[0].type].ind.scale);
    const i = { ...e };
    i.parent = this, i.chart = this, i.elScale = this.elScale, i.yAxisType = this.yAxisType, this.scale = new Wl(this.core, i), this.#u = "init", this.log(`${this.name} instantiated`);
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
  set title(t) {
    this.setTitle(t);
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
    return I.elementDimPos(this.#d);
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
    return this.#C;
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
    return this.#S;
  }
  set cursorActive(t) {
    this.#T = t;
  }
  get cursorActive() {
    return this.#T;
  }
  get cursorClick() {
    return this.#I;
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
    return this.#p.viewport.scene.canvas;
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
    this.#p.layerWidth = t;
  }
  get layerWidth() {
    return this.#p.layerWidth;
  }
  set legend(t) {
    this.#y = t;
  }
  get legend() {
    return this.#y;
  }
  set time(t) {
    this.#w = t;
  }
  get time() {
    return this.#w;
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
    return this.#x;
  }
  get axes() {
    return "x";
  }
  set graph(t) {
    this.#p = t;
  }
  get graph() {
    return this.#p;
  }
  get view() {
    return this.#g;
  }
  get viewport() {
    return this.#p.viewport;
  }
  get layerGrid() {
    return this.#p.overlays.get("grid").layer;
  }
  get overlays() {
    return this.getOverlays();
  }
  get overlayGrid() {
    return this.#p.overlays.get("grid").instance;
  }
  get overlayTools() {
    return this.#L;
  }
  get overlaysDefault() {
    return jl[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#R;
  }
  set stateMachine(t) {
    this.#l = new Ht(t, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get Divider() {
    return this.#m;
  }
  get siblingPrev() {
    return this.sibling("prev");
  }
  get siblingNext() {
    return this.sibling("next");
  }
  start() {
    this.#w = this.#n.Timeline, this.createGraph(), this.#v.start(), this.draw(this.range), this.cursor = "crosshair", zi.id = this.id, zi.context = this, this.stateMachine = zi, this.stateMachine.start(), this.eventsListen();
    const t = { chartPane: this };
    this.#m = this.core.WidgetsG.insert("Divider", t), this.#m.start(), this.#u = "running";
  }
  destroy() {
    if (this.#u !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.stateMachine.destroy(), this.Divider.destroy(), this.#v.destroy(), this.#p.destroy(), this.#E.destroy(), this.legend.destroy(), this.off("main_mousemove", this.onMouseMove), this.off(Te, this.onStreamListening), this.off(Pe, this.onStreamNewValue), this.off(Ct, this.onStreamUpdate), this.off(Me, this.onStreamNewValue), this.off(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.off("chart_yAxisRedraw", this.onYAxisRedraw), this.element.remove(), this.#u = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting chart pane: ${this.id}`), this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#E = new bt(this.#d, { disableContextMenu: !1 }), this.#E.on("pointerdrag", this.onChartDrag.bind(this)), this.#E.on("pointerdragend", this.onChartDragDone.bind(this)), this.#E.on("pointermove", this.onMouseMove.bind(this)), this.#E.on("pointerenter", this.onMouseEnter.bind(this)), this.#E.on("pointerout", this.onMouseOut.bind(this)), this.#E.on("pointerdown", this.onMouseDown.bind(this)), this.#E.on("pointerup", this.onMouseUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on(Te, this.onStreamListening, this), this.on(Pe, this.onStreamNewValue, this), this.on(Ct, this.onStreamUpdate, this), this.on(Me, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
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
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#S = [Math.round(t.position.x), Math.round(t.position.y)], this.#v.onMouseMove(this.#S), this.emit(`${this.id}_mousemove`, this.#S);
  }
  onMouseEnter(t) {
    this.core.MainPane.onPointerActive(this), this.#S = [Math.round(t.position.x), Math.round(t.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_mouseenter`, this.#S);
  }
  onMouseOut(t) {
    this.#T = !1, this.#S = [Math.round(t.position.x), Math.round(t.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_mouseout`, this.#S);
  }
  onMouseDown(t) {
    this.#n.pointerButtons[t.domEvent.srcEvent.button] = !0, this.#I = [Math.floor(t.position.x), Math.floor(t.position.y)], this.stateMachine.state === "tool_activated" && this.emit("tool_targetSelected", { target: this, position: t });
  }
  onMouseUp(t) {
    this.#n.pointerButtons[t.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(t) {
    this.#C !== t && (this.#C = t);
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
  setTitle(t) {
    if (!S(t))
      return !1;
    this.#i = t, gt.title = t;
    const e = this.legend.list.chart.el.querySelectorAll(".title");
    for (let i of e)
      i.innerHTML = t;
    return !0;
  }
  setWatermark(t) {
    S(t.text) || S(t) ? this.core.config.watermark.text = t : "imgURL" in t && (this.core.config.watermark.imgURL = t);
  }
  setHeight(t) {
    v(t) || (t = this.height || this.#h.height), this.#d.style.height = `${t}px`, this.#f.style.height = `${t}px`, this.elViewport.style.height = `${t}px`, this.#v.setDimensions({ w: null, h: t });
  }
  setDimensions(t) {
    const e = this.config.buffer || yi;
    let { w: i, h: s } = t;
    i = this.width, s = s || this.height, this.setHeight(s), this.graph instanceof oe && (this.layerWidth = Math.round(i * ((100 + e) * 0.01)), this.graph.setSize(i, s, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.draw(void 0, !0), this.Divider.setPos());
  }
  setYAxisType(t) {
    if (!S(t) || !Zt.includes(t) || this.type == "primaryPane" && t == "percent")
      return !1;
    this.#x = t;
  }
  addOverlays(t) {
    if (!b(t) || t.length < 1)
      return !1;
    const e = [];
    for (let i of t) {
      const s = { fixed: !1, required: !1 };
      if (i.type in this.core.indicatorClasses)
        s.cnt = this.core.indicatorClasses[i.type].ind.cnt, s.id = `${this.id}-${i.type}_${s.cnt}`, s.class = this.core.indicatorClasses[i.type].ind;
      else if (i.type in _n[this.type])
        s.cnt = 1, s.id = `${this.id}-${i.type}`, s.class = _n[this.type][i.type].class;
      else
        continue;
      s.params = { overlay: i }, i.id = s.id, i.paneID = this.id, e.push([i.id, s]);
    }
    return this.graph.addOverlays(e), !0;
  }
  getOverlays() {
    return Object.fromEntries([...this.#p.overlays.list]);
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
    if (!S(t) || !(t in this.indicators))
      return !1;
    this.#R[t] = !0, this.indicators[t].instance.destroy(), this.graph.removeOverlay(t), this.draw(), Object.keys(this.indicators).length === 0 && !this.isPrimary && this.emit("destroyChartView", this.id), delete this.#R[t];
  }
  indicatorVisible(t, e) {
    return !S(t) || !(t in this.indicators) ? !1 : this.indicators[t].instance.visible(e);
  }
  indicatorSettings(t, e) {
    return !S(t) || !(t in this.indicators) ? !1 : this.indicators[t].instance.settings(e);
  }
  addTool(t) {
    let { layerConfig: e } = this.layerConfig(), i = new gi.Layer(e);
    this.#M.set(t.id, i), this.#b.addLayer(i), t.layerTool = i, this.#L.set(t.id, t);
  }
  addTools(t) {
  }
  overlayTools() {
  }
  overlayToolAdd(t) {
    this.#L.set(t.id, t);
  }
  overlayToolDelete(t) {
    this.#L.delete(t);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.#n.scrollPos, 0), this.overlayGrid.draw("y"), this.#p.render();
  }
  refresh() {
    this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  updateLegends(t = this.#S, e = !1) {
    if (!(this.#n.isEmpty || !x(this.#y)))
      for (const i in this.#y.list)
        this.#y.update(i, { pos: t, candle: e });
  }
  legendInputs(t = this.cursorPos) {
    t = this.cursorPos;
    let e = {}, i = [], s = [!0, !0, !0, !0, !0], r = this.time.xPos2Index(t[0] - this.core.scrollPos);
    r = et(r, 0, this.range.data.length - 1);
    let o = this.range.data[r];
    return o[4] >= o[1] ? i = new Array(5).fill(this.theme.candle.UpWickColour) : i = new Array(5).fill(this.theme.candle.DnWickColour), e.O = this.scale.nicePrice(o[1]), e.H = this.scale.nicePrice(o[2]), e.L = this.scale.nicePrice(o[3]), e.C = this.scale.nicePrice(o[4]), e.V = this.scale.nicePrice(o[5]), { inputs: e, colours: i, labels: s };
  }
  onLegendAction(t) {
    switch (this.#y.onMouseClick(t.currentTarget).icon) {
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
      prevPane: h
    } = { ...this.currPrevNext() };
    return !x(e) || !x(r) ? !1 : (i.insertBefore(t, e), o.insertBefore(s, r), this.Divider.setPos(), h !== null && (h.Divider.setPos(), h.Divider.show(), this.core.ChartPanes.swapKeys(this.id, e.id)), t.previousElementSibling === null && this.Divider.hide(), !0);
  }
  reorderDown() {
    const {
      el: t,
      nextEl: e,
      parentEl: i,
      scaleEl: s,
      nextScaleEl: r,
      parentScaleEl: o,
      nextPane: h
    } = { ...this.currPrevNext() };
    return !x(e) || !x(r) ? !1 : (i.insertBefore(e, t), o.insertBefore(r, s), this.Divider.setPos(), h !== null && (h.Divider.setPos(), this.Divider.show(), this.core.ChartPanes.swapKeys(this.id, e.id)), e.previousElementSibling === null && h.Divider.hide(), !0);
  }
  createGraph() {
    let t = it(this.overlaysDefault);
    this.graph = new oe(this, this.elViewport, t, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.#p.render(), this.#v.render();
  }
  draw(t = this.range, e = !1) {
    this.#p.draw(t, e);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.core.scrollPos, 0), this.overlayGrid.draw("y"), this.#p.render();
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
    const t = this.element, e = t.previousElementSibling, i = t.nextElementSibling, s = t.parentNode, r = this.scale.element, o = r.previousElementSibling, h = r.nextElementSibling, c = r.parentNode, f = e !== null ? this.core.ChartPanes.get(e.id) : null, p = i !== null ? this.core.ChartPanes.get(i.id) : null;
    return {
      el: t,
      prevEl: e,
      nextEl: i,
      parentEl: s,
      scaleEl: r,
      prevScaleEl: o,
      nextScaleEl: h,
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
const Wi = {
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
      x(n) && n.element.style.removeProperty("user-select"), x(t) && t.element.style.removeProperty("user-select");
    }
  }
}, Zl = [
  ["grid", { class: mi, fixed: !1, required: !0, params: { axes: "x" } }]
], Kl = ["candles", "trades"];
class Mr {
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
  #w;
  #p;
  #y;
  #m;
  #C;
  #P;
  #g = new dt();
  #b;
  #M;
  #L;
  #S = [];
  #T = tn;
  #I = Js;
  #E = {};
  #x = [0, 0];
  #D = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #R;
  #k;
  #B;
  #A;
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
    return this.#b;
  }
  get chartPanes() {
    return this.#g;
  }
  get chartDeleteList() {
    return this.#S;
  }
  get time() {
    return this.#M;
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
    return this.#I;
  }
  set rowMinH(t) {
    v(t) && (this.#I = Math.abs(t));
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return I.elementDimPos(this.#l);
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
    return this.#x;
  }
  get candleW() {
    return this.#M.candleW;
  }
  get theme() {
    return this.#i.theme;
  }
  get config() {
    return this.#i.config;
  }
  get buffer() {
    return this.#R;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.#i.scrollPos;
  }
  set stateMachine(t) {
    this.#n = new Ht(t, this);
  }
  get stateMachine() {
    return this.#n;
  }
  get graph() {
    return this.#m;
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
    if (this.#i, this.#k = this.#i.indicatorClasses, this.#a = this.#l.rows, this.#c = this.#l.time, this.#v = this.#l.rows.grid, this.#p = this.#l.viewport, this.#d = this.#i.elBody.scale, t.name = "Chart", t.shortName = "Chart", t.parent = this, t.chartData = this.#i.chartData, t.primaryPane = this.#i.primaryPane, t.secondaryPane = this.#i.secondaryPane, t.rangeLimit = this.#i.rangeLimit, t.settings = this.#i.settings, t.elements = {
      ...t.elements,
      ...this.elements
    }, this.#i.theme?.time?.navigation === !1) {
      const e = { height: ci };
      this.#i.theme.time = { ...this.#i.theme?.time, ...e }, this.#a.style.height = `calc(100% - ${ci}px)`;
    }
    this.#M = new Rl(this.#i, t), this.registerChartViews(t), this.#R = v(this.config.buffer) ? this.config.buffer : yi, this.#I = v(this.config.rowMinH) ? this.config.rowMinH : Js, this.#T = v(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : tn, this.rowsOldH = this.rowsH, this.log(`${this.#t} instantiated`);
  }
  start() {
    let t = 0;
    this.#l.start(this.theme), this.#M.start(), this.#g.forEach((e, i) => {
      e.start(t++), t === 1 && e.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.createGraph(), this.draw(this.range, !0), ti.init({
      graphs: [this.#m],
      range: this.range
    }), ti.start(), ti.queueFrame(this.range, [this.#m], !1), this.eventsListen(), Wi.id = this.id, Wi.context = this, this.stateMachine = Wi, this.stateMachine.start();
  }
  destroy() {
    this.#o = !0, this.stateMachine.destroy(), this.#M.destroy(), this.#g.forEach((t, e) => {
      this.#S[e] = !0, t.destroy(), delete this.#S[e];
    }), this.#m.destroy(), this.#A.destroy(), this.off(Me, this.onFirstStreamValue), this.off(Pe, this.onNewStreamValue), this.off("setRange", this.draw), this.off("scrollUpdate", this.draw), this.off("chart_render", this.draw), this.off("destroyChartView", this.removeChartPane);
  }
  reset() {
    for (let t in this.#i.Indicators)
      for (let e in this.#i.Indicators[t])
        this.#i.Indicators[t][e].instance.remove();
  }
  restart() {
    this.chart.scale.restart(), this.validateIndicators();
    for (let [t, e] of this.views)
      for (let i of e)
        t === "primary" && i.type === "candles" || this.addIndicator(i.type, i.name, { data: i.data, settings: i.settings });
    this.draw(this.range, !0);
  }
  eventsListen() {
    this.#a.tabIndex = 0, this.#a.focus(), this.#A = new bt(this.#a, { disableContextMenu: !1 }), this.#A.on("keydown", this.onChartKeyDown.bind(this)), this.#A.on("keyup", this.onChartKeyUp.bind(this)), this.#A.on("wheel", this.onMouseWheel.bind(this)), this.#A.on("pointerenter", this.onMouseEnter.bind(this)), this.#A.on("pointerout", this.onMouseOut.bind(this)), this.#A.on("pointerup", this.onChartDragDone.bind(this)), this.#A.on("pointermove", this.onMouseMove.bind(this)), this.on(Me, this.onFirstStreamValue, this), this.on(Pe, this.onNewStreamValue, this), this.on("setRange", this.draw, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
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
      t.dragstart.x = this.#x[0], t.dragstart.y = this.#x[1], t.position.x = this.#x[0] + e, t.position.y = this.#x[1], this.onChartDrag(t);
      return;
    }
    const i = this.range, s = i.indexStart - Math.floor(e * Ys * i.Length), r = i.indexEnd + Math.ceil(e * Ys * i.Length);
    this.#i.setRange(s, r), this.draw(this.range, !0);
  }
  onMouseMove(t) {
    const e = this.#E;
    e.d2x = e?.d1x || null, e.d2y = e?.d1y || null, e.d1x = t.movement.x, e.d1y = t.movement.y, e.dx = Math.floor((e.d1x + e.d2x) / 2), e.dy = Math.floor((e.d1y + e.d2y) / 2), e.ts2 = e?.ts1 || null, e.ts1 = Date.now(), this.#x = [
      t.position.x,
      t.position.y,
      t.dragstart.x,
      t.dragstart.y,
      e.dx,
      e.dy,
      e.ts1,
      e.ts1 - e.ts2
    ], this.core.Timeline.showCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !0;
    for (let [i, s] of this.chartPanes)
      s.graph.overlays.list.get("cursor").layer.visible = !0;
    this.emit("main_mousemove", this.#x);
  }
  onMouseEnter(t) {
    this.core.Timeline.showCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !0, this.core.Chart.graph.render();
    for (let [e, i] of this.chartPanes)
      i.graph.overlays.list.get("cursor").layer.visible = !0, i.graph.render();
  }
  onMouseOut(t) {
    this.onPointerActive(!1), this.core.Timeline.hideCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !1, this.core.Chart.graph.render();
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
    ]) : (e.active = !0, e.start = [t.dragstart.x, t.dragstart.y], e.prev = e.start, e.delta = [0, 0]), this.#x = [
      t.position.x,
      t.position.y,
      ...e.start,
      ...e.delta
    ], this.emit("chart_pan", this.#x);
  }
  onChartDragDone(t) {
    const e = this.#D;
    e.active = !1, e.delta = [0, 0], this.#x = [
      ...e.prev,
      ...e.start,
      ...e.delta
    ], this.emit("chart_panDone", this.#x);
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
    let t = this.#a.heightDeltaR, e = Math.round(this.chartH * t), i = this.rowsW, s = this.rowsH, r = Math.round(i * ((100 + this.#R) * 0.01)), o = {
      resizeH: t,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.#i.scrollPos = -1, this.#M.setDimensions({ w: i }), this.#m.setSize(i, s, r), this.#g.size == 1 && e != this.#a.height ? this.#b.setDimensions({ w: i, h: this.#a.height }) : this.#g.forEach((h, c) => {
      e = Math.round(h.viewport.height * t), h.setDimensions({ w: i, h: e });
    }), this.rowsOldH = this.rowsH, this.draw(this.range, !0), this.emit("rowsResize", o);
  }
  getBufferPx() {
    let t = Math.round(this.width * this.buffer / 100), e = t % this.candleW;
    return t - e;
  }
  registerChartViews(t) {
    this.#a.previousDimensions();
    const e = this.validateIndicators();
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
    return t.type == "primary" ? (o = new Oe(this.#i, t), this.#b = o) : (t.name = t.view[0].name || "Secondary", t.shortName = t.view[0].type || "Secondary", o = new Oe(this.#i, t)), this.#g.set(o.id, o), this.emit("addChartView", o), o;
  }
  removeChartPane(t) {
    if (!S(t) || !this.#g.has(t))
      return !1;
    const e = this.#g.get(t);
    if (e.isPrimary)
      return this.#i.error(`Cannot remove primary chart pane! ${t}`), !1;
    this.#S[t] = !0;
    let i = this.rowsW, s = e.viewport.height, r = Math.floor(s / (this.#g.size - 1)), o = s % r;
    return e.status !== "destroyed" && e.destroy(), this.#g.delete(t), delete this.#S[t], this.#g.forEach((h, c) => {
      s = h.viewport.height, h.setDimensions({ w: i, h: s + r + o }), o = 0;
    }), this.draw(this.range, !0), !0;
  }
  validateIndicators() {
    const t = [];
    for (let [e, i] of this.views) {
      if (e === "primary" && t.push(i), i.length === 0 && e !== "primary") {
        this.views.delete(e);
        continue;
      }
      for (const [s, r] of i.entries())
        x(r) && (r.type in this.core.indicatorClasses || Kl.includes(r.type)) || (this.#i.log(`indicator ${i.type} not added: not supported.`), i.splice(s, 1));
    }
    return t;
  }
  addIndicator(t, e = t, i = {}) {
    if (!S(t) && !(t in this.#k) && !S(e) && !x(i))
      return !1;
    this.log(`Adding the ${e} : ${t} indicator`), b(i?.data) || (i.data = []), x(i?.settings) || (i.settings = {});
    let s;
    if (this.#k[t].ind.primaryPane) {
      const r = {
        type: t,
        name: e,
        ...i
      };
      s = this.#b.addIndicator(r);
    } else {
      this.core.indicatorClasses[t].ind.primaryPane === "both" && X(t.primaryPane) && t.primaryPane, b(i.view) || (i.view = [{ name: e, type: t, ...i }]);
      for (let o = 0; o < i.view.length; o++)
        (!x(i.view[o]) || !Jn(["name", "type"], Object.keys(i.view[o]))) && i.view.splice(o, 1);
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
    if (!S(t))
      return !1;
    for (const e of this.#g.values())
      if (t in e.indicators)
        return e.indicators[t].instance;
  }
  removeIndicator(t) {
    if (S(t)) {
      for (const e of this.#g.values())
        if (t in e.indicators)
          return e.indicators[t].instance.remove(), !0;
    } else
      return t instanceof $t ? (t.remove(), !0) : !1;
  }
  indicatorSettings(t, e) {
    if (S(t)) {
      for (const i of this.#g.values())
        if (t in i.indicators)
          return i.indicators[t].instance.settings(e);
    } else
      return t instanceof $t ? t.settings(e) : !1;
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
      const r = this.#g.firstEntry(), o = this.#g.lastEntry(), h = Math.round(this.rowsH * this.#T / 100);
      let c = this.rowsH / (this.rowsH + h);
      s[r[0]] = Math.floor(r[1].viewport.height * c), s[o[0]] = Math.floor(o[1].viewport.height * c), s.new = Math.floor(h * c), s.new += this.rowsH - (s[r[0]] + s[o[0]] + s.new);
    } else {
      let r = 0;
      for (let h of this.#g)
        s[h[0]] = h[1].viewport.height, r += h[1].viewport.height;
      s.new = Math.floor(r / (this.#g.size + 1));
      let o = this.rowsH / (this.rowsH + s.new);
      r = 0;
      for (let h in s)
        s[h] = Math.floor(s[h] * o), r += s[h];
      s.new += this.rowsH - r;
    }
    return s;
  }
  scaleNode(t) {
    const e = jh + ` width: 100%; border-top: 1px solid ${this.theme.secondaryPane.separator};`;
    return `
    <div slot="chartpane" class="viewport scale ${t}" style="$${e}"></div>
  `;
  }
  createGraph() {
    let t = it(Zl);
    this.#m = new oe(this, this.#p, t);
  }
  draw(t = this.range, e = !1) {
    const i = [
      this.#m,
      this.#M,
      this.#b
    ];
    this.time.xAxis.doCalcXAxisGrads(t), this.#g.forEach((s, r) => {
      i.push(s);
    }), ti.queueFrame(
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
const Nn = 20, Ql = 20, Jl = new Tr(B.COLOUR_BORDER), is = document.createElement("template");
is.innerHTML = `
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
    background-color: var(--txc-time-handle-color, ${Jl.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${Nn}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${B.COLOUR_ICON});
    width: ${Nn}px;
    height: ${Ql}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${B.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${_h}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${Dh}</span>
</div>
`;
class tc extends st {
  #t;
  constructor() {
    super(is), this.#t = is;
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
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", tc);
const Pr = document.createElement("template");
Pr.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${ci}px;
  }
  tradex-overview {
    height: ${ar}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class ec extends st {
  constructor() {
    super(Pr);
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
customElements.get("tradex-time") || window.customElements.define("tradex-time", ec);
const Lr = document.createElement("template");
Lr.innerHTML = `
<style>
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <div class="viewport"></div>
`;
class ic extends st {
  constructor() {
    super(Lr);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.shadowRoot.querySelector(".viewport");
  }
}
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", ic);
const Ar = document.createElement("template");
Ar.innerHTML = `
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
class sc extends st {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o = [];
  constructor() {
    super(Ar);
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
    S && (this.#t = t, this.elTitle.innerHTML = t);
  }
  buildLegend(t, e) {
    let i = "", s = `${e.legend.font}; color: ${e.legend.colour}; text-align: left;`, r = "";
    const o = "", h = e.legend.controls ? `
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
            ${h}
      </div>
     </div>
    `;
  }
  buildInputs(t) {
    let e = 0, i = "", s, r = "", o = "", h = "";
    for (s in t.inputs) {
      let c = t?.colours?.[e] ? ` color: ${t.colours[e]};` : "", f = t?.inputs?.[s] !== void 0 ? t.inputs[s] : r, p = t?.labels?.[e] ? `${s}:` : r;
      o += t?.labels?.[e] ? "1em;" : ".25em", i += `<dt style="${o}">${p}</dt>
      <dd style="${h}${c}">${f}</dd>`, ++e;
    }
    return i;
  }
  buildControls(t) {
    let e = "", i = t.id;
    return e += `<span id="${i}_up" class="control" data-icon="up">${Ah}</span>`, e += `<span id="${i}_down" class="control" data-icon="down">${Oh}</span>`, e += `<span id="${i}_collapse" class="control" data-icon="visible">${kh}</span>`, e += `<span id="${i}_maximize" class="control" data-icon="maximize">${Rh}</span>`, e += `<span id="${i}_restore" class="control" data-icon="restore">${Ih}</span>`, e += t?.type !== "chart" ? `<span id="${i}_remove" class="control" data-icon="remove">${Lh}</span>` : "", e += t?.type !== "secondary" ? `<span id="${i}_config" class="control" data-icon="config">${rr}</span>` : "", e;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", sc);
const Or = document.createElement("template");
Or.innerHTML = `
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
class nc extends st {
  #t;
  #e;
  constructor() {
    super(Or);
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
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", nc);
const Ir = document.createElement("template");
Ir.innerHTML = `
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
class rc extends st {
  #t;
  #e;
  #r;
  #s;
  constructor() {
    super(Ir);
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
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", rc);
const Rr = document.createElement("template");
Rr.innerHTML = `
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
    width: calc(100% - ${ne}px);
    height: calc(100% - ${di}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${B.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${ne}px);
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
class oc extends st {
  #t;
  #e;
  constructor() {
    super(Rr);
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
customElements.get("tradex-main") || window.customElements.define("tradex-main", oc);
const kr = document.createElement("template");
kr.innerHTML = `
  <slot></slot>
`;
class ac extends st {
  constructor() {
    super(kr);
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
        height: ${Dt.ICONSIZE};
        width: ${Dt.ICONSIZE};
        fill: ${Dt.COLOUR_ICON};
      }
      svg:hover {
        fill: ${Dt.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${Dt.ICONSIZE};
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
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", ac);
const Dr = document.createElement("template");
Dr.innerHTML = `
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
class hc extends st {
  constructor() {
    super(Dr);
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
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", hc);
const lc = `
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${kt}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: 0;
    width: calc(100% - ${kt}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 1px;
    right: 0; 
    width: ${ne}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`, _r = document.createElement("template");
_r.innerHTML = lc;
class cc extends st {
  #t;
  constructor() {
    super(_r);
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
    let e = v(this.#t?.tools?.width) ? this.#t.tools.width : kt, i;
    switch (t) {
      case "left":
        i = e == 0 ? 0 : ne, this.scale.style.left = `${e}px`, this.scale.style.right = void 0, this.main.style.left = void 0, this.main.style.right = `-${i}px`, this.main.style.width = `calc(100% - ${e}px)`;
        break;
      case "both":
      case "right":
      default:
        i = e == 0 ? ne : 0, this.scale.style.left = void 0, this.scale.style.right = 0, this.main.style.left = void 0, this.main.style.right = `${i}px`, this.main.style.width = `calc(100% - ${e}px)`;
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
        this.#t.tools.location = "right", this.#t.tools.width = this.#t?.tools?.width || kt, this.tools.style.display = "block", this.tools.style.left = void 0, this.tools.style.right = 0, this.tools.style.width = `${kt}px`;
        break;
      case "left":
      default:
        this.#t.tools.location = "left", this.#t.tools.width = this.#t?.tools?.width || kt, this.tools.style.display = "block", this.tools.style.left = 0, this.tools.style.right = void 0, this.tools.style.width = `${kt}px`;
        break;
    }
    this.setYAxisLocation();
  }
}
customElements.get("tradex-body") || window.customElements.define("tradex-body", cc);
const Nr = document.createElement("template");
Nr.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class dc extends st {
  constructor() {
    super(Nr);
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
        height: ${ie.ICONSIZE};
        fill: ${ie.COLOUR_ICON};
      }
    </style>
    `;
    for (const s of t)
      i += this.iconNode(s);
    return i + "</div>";
  }
  iconNode(t) {
    const e = `display: inline-block; height: ${ie.ICONSIZE}; padding-top: 2px`, i = "sub" in t ? 'data-menu="true"' : "";
    return `
      <div id="TX_${t.id}" data-event="${t.event}" ${i} class="icon-wrapper" style="${e}">${t.icon}</div>

    `;
  }
}
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", dc);
const $r = document.createElement("template");
$r.innerHTML = `
  <slot name="widget"></slot>
`;
class uc extends st {
  constructor() {
    super($r);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", uc);
const fc = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
    }
    tradex-utils {
      height: ${Nt}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${Nt}px); 
      min-height: ${Gt - Nt}px;
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
class gc extends st {
  #t;
  #e;
  #r;
  #s;
  #i = li;
  #n = Gt;
  #o;
  #h;
  #l;
  #a;
  #c;
  constructor() {
    const t = document.createElement("template");
    t.innerHTML = fc, super(t, "closed"), this.#s = t;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#s.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = or, this.elWidgetsG = this.shadowRoot.querySelector("tradex-widgets"), this.elUtils = this.shadowRoot.querySelector("tradex-utils"), this.elBody = this.shadowRoot.querySelector("tradex-body"), this.elMain = this.elBody.main, this.elTime = this.elBody.main.time, this.elTools = this.elBody.tools, this.elYAxis = this.elBody.scale, this.previousDimensions();
      let t = this.getAttribute("height") || "100%", e = this.getAttribute("width") || "100%";
      this.setDimensions(e, t), this.resizeObserver = new ResizeObserver(_t(this.onResized, 50, this)), this.resizeObserver.observe(this);
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
    this.log(`onResize w: ${this.offsetWidth}, h: ${this.offsetHeight}`), x(this.MainPane) && this.MainPane instanceof Mr && (this.previousDimensions(), this.emit("global_resize", { w: this.offsetWidth, h: this.offsetHeight }));
  }
  previousDimensions() {
    this.#o = this.#l ? this.#l : this.offsetWidth, this.#h = this.#a ? this.#a : this.offsetHeight, this.#l = this.offsetWidth, this.#a = this.offsetHeight;
  }
  setWidth(t) {
    v(t) ? (this.#i = t, t += "px") : S(t) || (this.#i = this.parentElement.getBoundingClientRect().width, t = this.#i + "px"), this.style.width = t;
  }
  setHeight(t) {
    v(t) ? (this.#n = t, t += "px") : S(t) || (this.#n = this.parentElement.getBoundingClientRect().height, w = this.#n + "px"), this.style.height = t;
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
      const o = this.getBoundingClientRect(), h = this.parentElement.getBoundingClientRect();
      e = o.height ? o.height : h.height ? h.height : Gt, t = o.width ? o.width : h.width ? h.width : li;
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
        this.#c.utils.location = "none", this.#c.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${Gt}px`;
        break;
      case "top":
      default:
        this.#c.utils.location = "top", this.#c.utils.height = Nt, this.elUtils.style.display = "block", this.elUtils.style.height = `${Nt}px`, this.elBody.style.height = `calc(100% - ${Nt}px)`, this.elBody.style.minHeight = `${Gt - Nt}px`;
    }
  }
}
const mc = [
  {
    id: "indicators",
    name: "Indicators",
    icon: xh,
    event: "utils_indicators",
    sub: []
  },
  {
    id: "timezone",
    name: "Timezone",
    icon: Eh,
    event: "utils_timezone"
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: wh,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: rr,
    event: "utils_settings"
  }
];
class pc {
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
    this.#r = t, this.#s = e, this.#i = t.elUtils, this.#n = t.config?.utilsBar || mc, this.#o = t.WidgetsG, this.#h = t.indicatorClasses || xr, this.init();
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
    return I.elementDimPos(this.#i);
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
    const t = this.#r, e = I.findBySelectorAll(`#${t.id} .${da} .icon-wrapper`);
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
    const e = I.findTargetParentWithClass(t.target, "icon-wrapper");
    if (!x(e))
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
    e.style.fill = ie.COLOUR_ICONHOVER;
  }
  onIconOut(t) {
    const e = t.currentTarget.querySelector("svg");
    e.style.fill = ie.COLOUR_ICON;
  }
  initAllUtils() {
    const t = this.#i.querySelectorAll(".icon-wrapper");
    for (let e of t) {
      this.#u[e.id] = 0;
      let i = e.id.replace("TX_", ""), s = e.querySelector("svg");
      s.style.fill = ie.COLOUR_ICON, s.style.height = "90%";
      for (let r of this.#n)
        if (r.id === i && (this.#a[i] = {}, this.#a[i].click = this.onIconClick.bind(this), this.#a[i].pointerover = this.onIconOver.bind(this), this.#a[i].pointerout = this.onIconOut.bind(this), e.addEventListener("click", this.#a[i].click), e.addEventListener("pointerover", this.#a[i].pointerover), e.addEventListener("pointerout", this.#a[i].pointerout), i === "indicators" && (r.sub = Object.values(this.#h)), r?.sub)) {
          let o = {
            content: r.sub,
            primary: e
          }, h = this.#o.insert("Menu", o);
          e.dataset.menu = h.id, h.start();
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
class St {
  static #t = 0;
  static #e = {};
  static create(t, e) {
    const i = ++St.#t;
    e.cnt = i, e.modID = `${e.toolID}_${i}`, e.toolID = e.modID, e.target = t;
    const s = new e.tool(e);
    return St.#e[i] = s, t.chartToolAdd(s), s;
  }
  static destroy(t) {
    if (t instanceof St) {
      const e = t.inCnt;
      delete St.#e[e];
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
  #w;
  #p = [0, 0];
  #y = !1;
  #m;
  #C = { TL: [0, 0], BR: [0, 0] };
  constructor(t) {
    this.#h = t, this.#s = t.cnt, this.#r = this.#h.ID || K("TX_Tool_"), this.#i = t.name, this.#l = t.core, this.#u = t.elements.elChart, this.#a = { ...t.parent }, this.#w = t.target, this.#w.addTool(this), this.#f = this.#v.viewport, this.#d = this.#f.scene.canvas, this.#m = t.pos;
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
    return this.#w;
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
    return this.#p;
  }
  get cursorActive() {
    return this.#y;
  }
  get cursorClick() {
    return this.#m;
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
  get visible() {
    return this.isVisible();
  }
  end() {
    this.stop();
  }
  stop() {
    this.#c.off("mousemove", this.onMouseMove);
  }
  eventsListen() {
    this.#c = new bt(this.#d, { disableContextMenu: !1 }), this.#c.on("mousemove", this.onMouseMove.bind(this));
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
    this.#p = [Math.round(t.position.x), Math.round(t.position.y)], this.emit("tool_mousemove", this.#p);
  }
  isVisible() {
  }
  createViewport() {
    this.config.buffer || BUFFERSIZE, this.#f.getBoundingClientRect().width, this.#o.chartH || this.#a.rowsH - 1;
  }
  draw() {
  }
}
class vc extends St {
  constructor(t) {
    super(t);
  }
}
class yc extends St {
  constructor(t) {
    super(t);
  }
}
class wc extends St {
  constructor(t) {
    super(t);
  }
}
class xc extends St {
  constructor(t) {
    super(t);
  }
}
const Ec = [
  {
    id: "cursor",
    name: "Cursor",
    icon: Th,
    event: "tool_activated"
  },
  {
    id: "line",
    name: "Line",
    icon: Qe,
    event: "tool_activated"
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: Ch,
    event: "tool_activated",
    class: vc,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: Qe
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: Mh,
    event: "tool_activated",
    class: wc,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: Qe
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: Ph,
    event: "tool_activated",
    class: xc,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: Qe
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: bh,
    event: "tool_activated",
    class: yc
  },
  {
    id: "delete",
    name: "Delete",
    icon: Sh,
    event: "tool_activated",
    class: void 0
  }
], Fi = {
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
class Tc {
  #t;
  #e = "Toolbar";
  #r = "tools";
  #s;
  #i;
  #n;
  #o;
  #h;
  #l = St;
  #a;
  #c = {};
  #u = void 0;
  #d;
  #f = { click: [], pointerover: [] };
  constructor(t, e) {
    this.#s = t, this.#i = e, this.#o = t.elTools, this.#a = Ec || t.config.tools, this.#h = t.WidgetsG, this.init();
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
    return I.elementDimPos(this.#o);
  }
  set stateMachine(t) {
    this.#n = new Ht(t, this);
  }
  get stateMachine() {
    return this.#n;
  }
  init() {
    this.mount(this.#o), this.log(`${this.#e} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), Fi.id = this.id, Fi.context = this, this.stateMachine = Fi, this.stateMachine.start();
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
    e.style.fill = Dt.COLOUR_ICON;
  }
  onIconOver(t) {
    const e = t.currentTarget.querySelector("svg");
    e.style.fill = Dt.COLOUR_ICONHOVER;
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
      s.style.fill = Dt.COLOUR_ICON, s.style.width = "90%";
      for (let r of this.#a)
        if (r.id === i)
          if (this.#f[i] = {}, this.#f[i].click = this.onIconClick.bind(this), this.#f[i].pointerover = this.onIconOver.bind(this), this.#f[i].pointerout = this.onIconOut.bind(this), e.addEventListener("click", this.#f[i].click), e.addEventListener("pointerover", this.#f[i].pointerover), e.addEventListener("pointerout", this.#f[i].pointerout), r?.sub) {
            let o = {
              content: r.sub,
              primary: e
            }, h = this.#h.insert("Menu", o);
            e.dataset.menu = h.id, h.start();
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
const Sc = 150;
class ht {
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
  static class = en;
  static name = "Menus";
  static type = "Menu";
  static currentActive;
  constructor(t, e) {
    this.#e = t, this.#r = e.core, this.#s = e, this.#t = e.id, this.#n = t.elements.elMenus, this.#i = this.#r.elWidgetsG, this.init();
  }
  static create(t, e) {
    const i = `menu_${++ht.menuCnt}`;
    return e.id = i, ht.menuList[i] = new ht(t, e), ht.menuList[i];
  }
  static destroy(t) {
    ht.menuList[t].end(), delete ht.menuList[t];
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
    return I.elementDimPos(this.#o);
  }
  get type() {
    return ht.type;
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
    if (!this.#o.contains(t.target) && !this.#s.primary.contains(t.target) && I.isVisible(this.#o)) {
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
      <div slot="widget" class="${en}" style=""></div>
    `;
  }
  menuNode() {
    const t = this.#s, e = `position: absolute; z-index: 1000; display: none; border: 1px solid ${Ni.COLOUR_BORDER}; background: ${Ni.COLOUR_BG}; color: ${Ni.COLOUR_TXT};`;
    let i = this.content(t);
    return `
      <div id="${t.id}" class="${ua}" style="${e}">
        ${i}
      </div>
    `;
  }
  content(t) {
    const e = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${Sc}px`, i = "padding: .25em 1em .25em 1em; white-space: nowrap;", s = "display: inline-block; width: 4em;", r = "cursor: pointer;", o = `onmouseover="this.style.background ='#222'"`, h = `onmouseout="this.style.background ='none'"`;
    let c = `<ul style="${e}">`;
    if (t?.content)
      for (let f of t.content)
        c += `<li id="${f.id}" data-event="${f.event}" style="${i} ${r}" ${o} ${h}><a style="${r}"><span style="${s}">${f.id}</span><span>${f.name}</span></li></a>`;
    return c += "</ul>", c;
  }
  position(t) {
    let e = this.#i.getBoundingClientRect(), i = t.getBoundingClientRect();
    this.#o.style.left = Math.round(i.left - e.left) + "px", this.#o.style.top = Math.round(i.bottom - e.top) + "px";
  }
  remove() {
  }
  open() {
    if (ht.currentActive === this)
      return !0;
    ht.currentActive = this, this.#o.style.display = "block";
    let t = I.elementDimPos(this.#o);
    if (t.left + t.width > this.#i.offsetWidth) {
      let i = Math.floor(this.#i.offsetWidth - t.width);
      i = et(i, 0, this.#i.offsetWidth), this.#o.style.left = `${i}px`;
    }
    setTimeout(() => {
      this.#a[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#a[this.id].outside);
    }, 250);
  }
  close() {
    ht.currentActive = null, this.#o.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class Q {
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
  static class = nn;
  static name = "Windows";
  static type = "Window";
  static currentActive = null;
  constructor(t, e) {
    this.#e = t, this.#r = e.core, this.#s = e, this.#t = e.id, this.#n = t.elements.elWindows, this.#i = this.#r.elWidgetsG, this.init();
  }
  static create(t, e) {
    const i = `window_${++Q.windowCnt}`;
    return e.id = i, Q.windowList[i] = new Q(t, e), Q.windowList[i];
  }
  static destroy(t) {
    Q.windowList[t].destroy(), delete Q.windowList[t];
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
    return I.elementDimPos(this.#o);
  }
  get type() {
    return Q.type;
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
    if (!this.#o.contains(t.target) && I.isVisible(this.#o)) {
      let e = {
        target: t.currentTarget.id,
        window: this.#t
      };
      this.emit("closeWindow", e), document.removeEventListener("click", this.#a.click);
    }
  }
  mount(t) {
    t.lastElementChild == null ? t.innerHTML = this.windowNode() : t.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#o = this.#n.querySelector(`#${this.#s.id}`);
    let e, i;
    if (this.#s.x && this.#s.y)
      e = this.#s.x, i = this.#s.y;
    else {
      let s = I.elementDimPos(this.#o);
      e = (this.#r.width - s.width) / 2, i = (this.#r.height - s.height) / 2;
    }
    this.#o.style.bottom = `${i}px`, this.#o.style.left = `${e}px`;
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${nn}" style=""></div>
    `;
  }
  windowNode() {
    const t = this.#s, e = `position: absolute; z-index: 1000; display: block; border: 1px solid ${$i.COLOUR_BORDER}; background: ${$i.COLOUR_BG}; color: ${$i.COLOUR_TXT};`;
    let i = this.dragBar(t), s = this.content(t), r = this.closeIcon(t);
    return `
      <div id="${t.id}" class="${fa}" style="${e}">
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
    if (Q.currentActive === this)
      return !0;
    Q.currentActive = this, this.#o.style.display = "block", this.emit("window_opened", this.id), setTimeout(() => {
      this.#a.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#a.click);
    }, 250);
  }
  close() {
    Q.currentActive = null, this.#o.style.display = "none", this.emit("window_closed", this.id);
  }
}
class Es extends Q {
  static type = "Dialogue";
  constructor(t, e) {
    super(), e.dragbar = !0, e.close = tue, this.config = e;
  }
  get type() {
    return Es.type;
  }
}
class pt {
  static progressList = {};
  static progressCnt = 0;
  static class = rn;
  static type = "progress";
  static name = "Progress";
  static icons = {
    loadingBars: Vh,
    loadingSpin: Gh
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${rn}" style=""></div>
    `;
  }
  static create(t, e) {
    const i = `progress_${++pt.progressCnt}`;
    return e.id = i, pt.progressList[i] = new pt(t, e), pt.progressList[i];
  }
  static destroy(t) {
    pt.progressList[t].destroy(), delete pt.progressList[t];
  }
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h;
  constructor(t, e) {
    this.#e = t, this.#r = e.core, this.#s = e, this.#t = e.id, this.#n = t.elements.elProgress, this.#i = this.#r.elWidgetsG, this.init();
  }
  get type() {
    return pt.type;
  }
  init() {
    this.mount(this.#n);
  }
  start() {
    if (!x(this.#r.config?.progress) || !x(this.#r.config.progress?.loading))
      return !1;
    this.#o.style.display = "block";
    const t = this.#r.elBody.width / 2 - this.#o.clientWidth / 2, e = this.#r.elBody.height / -2 - this.#o.clientHeight / 2;
    this.#o.style.top = `${e}px`, this.#o.style.left = `${t}px`;
  }
  stop() {
    this.#o.style.display = "none";
  }
  progressNode(t) {
    const e = "position: absolute; z-index: 1000; display: none; justify-content: center; align-items: center;", s = `<div class="content" style="">${t.icon}</div>`;
    return `
      <div id="${this.#s.id}" class="progress ${t.type}" style="${e}">${s}</div>
    `;
  }
  mount(t) {
    let e = "loadingBars";
    this.#s?.type in pt.icons && (e = this.#s?.type);
    const i = { type: e, icon: pt.icons[e] };
    t.lastElementChild == null ? t.innerHTML = this.progressNode(i) : t.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(i)), this.#o = this.#n.querySelector(`#${this.#s.id}`), this.#h = this.#o.querySelector("svg"), this.#h.style.fill = `${Zh.COLOUR_ICONHOVER};`;
  }
}
const Vi = {
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
class Cc {
  #t;
  #e = "Widgets";
  #r = "widgets";
  #s;
  #i;
  #n;
  #o;
  #h = { Divider: mt, Progress: pt, Menu: ht, Window: Q, Dialogue: Es };
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
    this.#n = new Ht(t, this);
  }
  get stateMachine() {
    return this.#n;
  }
  get types() {
    return this.#o;
  }
  init() {
    this.mount(this.#c);
    for (let t in this.#o) {
      let e = this.#o[t], i = `el${e.name}`;
      this.#a[i] = this.#c.querySelector(`.${e.class}`);
    }
  }
  start() {
    this.eventsListen(), Vi.id = this.id, Vi.context = this, this.stateMachine = Vi, this.stateMachine.start();
  }
  destroy() {
    this.off("menu_open", this.onOpenMenu), this.off("menu_close", this.onCloseMenu), this.off("menu_off", this.onCloseMenu), this.off("menuItem_selected", this.onMenuItemSelected), this.stateMachine.destroy();
    for (let t in this.#l)
      this.delete(t);
    for (let t in this.#o)
      this.#o[t].destroy(id);
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
    if (!(t in this.#o) || !x(e))
      return !1;
    e.core = this.core;
    const i = this.#o[t].create(this, e);
    return this.#l[i.id] = i, i;
  }
  delete(t) {
    return isString(t) ? (this.#o[type].destroy(t), !0) : !1;
  }
}
class L extends gc {
  static #t = Eo;
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
  static #l = `${ye} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
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
  #c = ye;
  #u = Ee;
  #d;
  #f;
  #v;
  #w;
  #p;
  #y;
  #m;
  #C;
  #P;
  #g;
  #b;
  #M;
  #L = !1;
  #S = null;
  #T = {};
  #I = O;
  #E;
  #x;
  #D = xr;
  #R;
  #k;
  #B;
  chartWMin = li;
  chartHMin = Gt;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = B.COLOUR_BG;
  chartTxtColour = B.COLOUR_TXT;
  chartBorderColour = B.COLOUR_BORDER;
  utilsH = Nt;
  toolsW = kt;
  timeH = di;
  scaleW = ne;
  #A;
  #z;
  #O = {
    chart: {},
    time: {}
  };
  #W;
  panes = {
    utils: this.#A,
    tools: this.#z,
    main: this.#O
  };
  #_ = {
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
  #Z = 0;
  #F = { x: 0, y: 0 };
  #j = [!1, !1, !1];
  #V;
  #G;
  #$;
  #Y;
  #q;
  #X;
  #H = !1;
  #U = !1;
  static create(t = {}) {
    L.#e == 0 && (L.#r.CPUCores = navigator.hardwareConcurrency, L.#r.api = {
      permittedClassNames: L.#a
    }), (typeof t.talib != "object" || typeof t.talib.init != "function") && (L.#n = !1, L.#h = new Error(`${L.#l}`)), !L.#n && L.#h === null && (L.#i = t.talib.init(t.wasm)), L.#i.then(
      () => {
        L.#n = !0;
        for (let e of L.#o)
          D(e) && e();
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
    super(), this.#S = L.cnt(), console.warn(`!WARNING!: ${ye} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${Ee} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#G = cr;
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
    return this.#S;
  }
  set elUtils(t) {
    this.#p = t;
  }
  get elUtils() {
    return this.#p;
  }
  set elTools(t) {
    this.#m = t;
  }
  get elTools() {
    return this.#m;
  }
  set elBody(t) {
    this.#y = t;
  }
  get elBody() {
    return this.#y;
  }
  set elMain(t) {
    this.#C = t;
  }
  get elMain() {
    return this.#C;
  }
  set elTime(t) {
    this.#g = t;
  }
  get elTime() {
    return this.#g;
  }
  set elYAxis(t) {
    this.#b = t;
  }
  get elYAxis() {
    return this.#b;
  }
  set elWidgetsG(t) {
    this.#M = t;
  }
  get elWidgetsG() {
    return this.#M;
  }
  get UtilsBar() {
    return this.#A;
  }
  get ToolsBar() {
    return this.#z;
  }
  get MainPane() {
    return this.#O;
  }
  get Timeline() {
    return this.#O.time;
  }
  get WidgetsG() {
    return this.#W;
  }
  get Chart() {
    return this.#O.chart;
  }
  get ChartPanes() {
    return this.#O.chartPanes;
  }
  get Indicators() {
    return this.#O.indicators;
  }
  get ready() {
    return this.#L;
  }
  get state() {
    return this.#E;
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
    return v(this.#x.initialCnt) ? this.#x.initialCnt : ga;
  }
  get range() {
    return this.#x;
  }
  get time() {
    return this.#_;
  }
  get TimeUtils() {
    return Wo;
  }
  get theme() {
    return this.#k;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#D;
  }
  get TALib() {
    return this.#R;
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
    return this.#j;
  }
  get pricePrecision() {
    return this.#q;
  }
  get volumePrecision() {
    return this.#X;
  }
  set stream(t) {
    return this.setStream(t);
  }
  get stream() {
    return this.#$;
  }
  get worker() {
    return this.#G;
  }
  get isEmpty() {
    return this.#E.IsEmpty;
  }
  set candles(t) {
    x(t) && (this.#Y = t);
  }
  get candles() {
    return this.#Y;
  }
  get progress() {
    return this.#V;
  }
  start(t) {
    this.log(`${ye} configuring...`), L.create(t);
    const e = { ...t };
    this.logs = e?.logs ? e.logs : !1, this.infos = e?.infos ? e.infos : !1, this.warnings = e?.warnings ? e.warnings : !1, this.errors = e?.errors ? e.errors : !1, this.timer = e?.timer ? e.timer : !1, this.#f = e, this.#S = e.cnt || this.#S, this.#R = e.talib, this.#w = this, this.#d = this;
    const i = S(e?.id) ? e.id : null;
    this.setID(i), this.classList.add(this.id), this.log("processing state...");
    let s = it(e?.state) || {};
    s.id = this.id, s.core = this;
    let r = e?.deepValidate || !1, o = e?.isCrypto || !1;
    this.#E = this.#I.create(s, r, o), delete e.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let h = "1s", c = N;
    if (!x(e?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${ye} has no chart data or streaming provided.`), { tf: h, ms: c } = ei(e?.timeFrame)) : x(e?.stream) && this.state.data.chart.data.length < 2 ? ({ tf: h, ms: c } = ei(e?.timeFrame), this.#H = !0) : (h = this.state.data.chart.tf, c = this.state.data.chart.tfms), this.log(`tf: ${h} ms: ${c}`), this.#f.callbacks = this.#f.callbacks || {}, x(e))
      for (const p in e)
        p in this.props() && this.props()[p](e[p]);
    const f = x(e?.range) ? e.range : {};
    if (f.interval = c, f.core = this, this.getRange(null, null, f), this.#x.Length > 1) {
      const p = Zi(this.#_, this.#f?.range?.startTS), E = v(p) ? p + this.#x.initialCnt : this.allData.data.length - 1, C = v(p) ? p : E - this.#x.initialCnt;
      this.#x.initialCnt = E - C, this.setRange(C, E), e.range?.center && this.jumpToIndex(C, !0, !0);
    }
    this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#W = new Cc(this, { widgets: e?.widgets }), this.#A = new pc(this, e), this.#z = new Tc(this, e), this.#O = new Mr(this, e), this.setTheme(this.#B.id), this.log(`${this.#c} V${L.version} configured and running...`), this.#N = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#V = this.WidgetsG.insert("Progress", {}), this.stream = this.#f.stream, this.#H && this.on(Ct, this.delayedSetRange, this), this.#L = !0, this.refresh();
  }
  destroy() {
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.#T = null, this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#G.end(), this.#I = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(Ct, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#V.stop());
  }
  on(t, e, i) {
    return !S(t) || !D(e) ? !1 : (this.#T[t] || (this.#T[t] = []), this.#T[t].push({ handler: e, context: i }), !0);
  }
  off(t, e) {
    if (!S(t) || !D(e) || !(t in this.#T))
      return !1;
    for (let i = 0; i < this.#T[t].length; i++)
      if (this.#T[t][i].handler === e && (this.#T[t].splice(i, 1), this.#T[t].length === 0)) {
        delete this.#T[t];
        break;
      }
    return !0;
  }
  emit(t, e) {
    S(t) && (this.#T[t] || []).forEach((i) => i.handler.call(i.context, e));
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
      logs: (t) => this.logs = X(t) ? t : !1,
      infos: (t) => this.infos = X(t) ? t : !1,
      warnings: (t) => this.warnings = X(t) ? t : !1,
      errors: (t) => this.errors = X(t) ? t : !1,
      indicators: (t) => this.setIndicators(t),
      theme: (t) => {
        this.#B = this.addTheme(t);
      },
      stream: (t) => this.#$ = x(t) ? t : {},
      pricePrecision: (t) => this.setPricePrecision(t),
      volumePrecision: (t) => this.setVolumePrecision(t)
    };
  }
  getInCnt() {
    return this.#S;
  }
  setID(t) {
    S(t) ? this.id = t : this.id = `${K(Ee)}_${this.#S}`;
  }
  setTitle(t) {
    this.Chart.setTitle(t);
  }
  setWatermark(t) {
    this.Chart.setWatermark(t);
  }
  setDimensions(t, e) {
    const i = super.setDimensions(t, e);
    this.emit("global_resize", i);
  }
  setUtilsH(t) {
    this.utilsH = t, this.#p.style.height = `${t}px`;
  }
  setToolsW(t) {
    this.toolsW = t, this.#m.style.width = `${t}px`;
  }
  setPricePrecision(t) {
    (!v(t) || t < 0) && (t = xa), this.#q = t;
  }
  setVolumePrecision(t) {
    (!v(t) || t < 0) && (t = Ea), this.#X = t;
  }
  addTheme(t) {
    const e = vt.create(t, this);
    return this.#k instanceof vt || (this.#k = e), e;
  }
  setTheme(t) {
    if (!this.theme.list.has(t))
      return !1;
    this.#k.setTheme(t, this);
    const e = this.#k, i = document.querySelector(`style[title=${this.id}_style]`), s = `var(--txc-border-color, ${e.chart.BorderColour}`;
    let r = `.${this.id} { `;
    r += `--txc-background: ${e.chart.Background}; `, this.style.background = `var(--txc-background, ${e.chart.Background})`, this.style.border = `${e.chart.BorderThickness}px solid`, this.style.borderColor = s, r += `--txc-border-color:  ${e.chart.BorderColour}; `, this.#C.rows.style.borderColor = s, r += `--txc-time-scrollbar-color: ${e.chart.BorderColour}; `, r += `--txc-time-handle-color: ${e.xAxis.handle}; `, r += `--txc-time-slider-color: ${e.xAxis.slider}; `, r += `--txc-time-cursor-fore: ${e.xAxis.colourCursor}; `, r += `--txc-time-cursor-back: ${e.xAxis.colourCursorBG}; `, r += `--txc-time-icon-color: ${e.icon.colour}; `, r += `--txc-time-icon-hover-color: ${e.icon.hover}; `, this.#g.overview.scrollBar.style.borderColor = s, this.#g.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${e.xAxis.handle})`, this.#g.overview.style.setProperty("--txc-time-slider-color", e.xAxis.slider), this.#g.overview.style.setProperty("--txc-time-icon-color", e.icon.colour), this.#g.overview.style.setProperty("--txc-time-icon-hover-color", e.icon.hover);
    for (let [o, h] of Object.entries(this.Chart.legend.list))
      h.el.style.color = `var(--txc-legend-color, ${e.legend.colour})`, h.el.style.font = `var(--txc-legend-font, ${e.legend.font})`;
    for (let o of this.#p.icons)
      o.className == "icon-wrapper" && (o.children[0].style.fill = e.icon.colour);
    for (let o of this.#m.icons)
      o.className == "icon-wrapper" && (o.children[0].style.fill = e.icon.colour);
    return r += " }", i.innerHTML = r, !0;
  }
  setScrollPos(t) {
    t = Math.round(t), v(t) && t <= 0 && t >= this.bufferPx * -1 ? this.#N = t : this.emit("Error", "setScrollPos: not a valid value");
  }
  setState(t) {
    if (!O.has(t))
      return this.warn(`${this.name} id: ${this.id} : Specified state does not exist`), !1;
    if (t === this.key)
      return !0;
    this.stream.stop(), this.MainPane.reset(), this.#E = O.get(t);
    const e = {
      interval: this.#E.data.chart.tfms,
      core: this
    };
    if (this.getRange(null, null, e), this.range.Length > 1) {
      const i = Zi(this.time, void 0), s = i ? i + this.range.initialCnt : this.#E.data.chart.data.length - 1, r = i || s - this.range.initialCnt;
      this.range.initialCnt = s - r, this.setRange(r, s);
    }
    this.MainPane.restart(), this.refresh();
  }
  createState(t, e, i) {
    return this.state.create(t, e, i);
  }
  deleteState(t) {
    return this.state.delete(t);
  }
  exportState(t = this.key, e = {}) {
    return this.state.export(t = this.key, e = {});
  }
  setStream(t) {
    if (this.stream instanceof Qt)
      return this.error("Error: Invoke stopStream() before starting a new one."), !1;
    if (x(t))
      return this.allData.data.length == 0 && S(t.timeFrame) && ({ tf, ms } = ei(t?.timeFrame), this.range.interval = ms, this.range.intervalStr = tf, this.#_.timeFrameMS = ms, this.#_.timeFrame = tf), this.#$ = new Qt(this), this.#f.stream = this.#$.config, this.#$;
  }
  stopStream() {
    this.stream instanceof Qt && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#H; ) {
      let t = this.range.Length * 0.5;
      this.setRange(t * -1, t), this.off(Ct, this.delayedSetRange), this.#H = !1;
    }
  }
  updateRange(t) {
    if (!b(t) || !v(t[4]) || t[4] == 0)
      return;
    let e, i;
    e = t[4], i = this.#N + e, i % this.candleW, i < this.bufferPx * -1 ? (i = 0, this.offsetRange(this.rangeScrollOffset * -1)) : i > 0 && (i = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#N = i, this.emit("scrollUpdate", i);
  }
  offsetRange(t) {
    let e = this.range.indexStart - t, i = this.range.indexEnd - t;
    this.setRange(e, i);
  }
  getRange(t = 0, e = 0, i = {}) {
    this.#x = new Xi(t, e, i), this.#_.range = this.#x, this.#_.timeFrameMS = this.#x.interval, this.#_.timeFrame = this.#x.intervalStr;
  }
  setRange(t = 0, e = this.rangeLimit) {
    const i = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#x.set(t, e, i), t < 0 && !this.#U ? this.emit("range_limitPast", { chart: this, start: t, end: e }) : e > this.range.dataLength && !this.#U && this.emit("range_limitFuture", { chart: this, start: t, end: e });
  }
  jumpToIndex(t, e = !0, i = !0) {
    e && (t = et(t, 0, this.range.dataLength));
    let s = this.range.Length, r = t + s;
    i && (t -= s / 2, r -= s / 2), this.setRange(t, r);
  }
  jumpToTS(t, e = !0, i = !0) {
    let s = this.Timeline.xAxis.t2Index(t);
    this.jumpToIndex(s, e, i);
  }
  jumpToStart(t = !1) {
    this.jumpToIndex(0, !0, t);
  }
  jumpToEnd(t = !0) {
    let e = this.range.dataLength - this.range.Length;
    t && (e += this.range.Length / 2), this.jumpToIndex(e, !0, !1);
  }
  mergeData(t, e = !1, i = !1) {
    this.#U = !0;
    let s = this.state.mergeData(t, e, i);
    return X(s) && (this.#U = !1), s;
  }
  isIndicator(t) {
    return !!(typeof t == "function" && "primaryPane" in t.prototype && D(t.prototype?.draw));
  }
  setIndicators(t, e = !1) {
    if (!x(t))
      return !1;
    e && (console.warn("Expunging all default indicators!"), this.#D = {});
    for (const [i, s] of Object.entries(t))
      S(s?.id) && S(s?.name) && S(s?.event) && this.isIndicator(s?.ind) && (this.#D[i] = s);
    return !0;
  }
  addIndicator(t, e = t, i = {}) {
    return this.#O.addIndicator(t, e, i);
  }
  getIndicator(t) {
    return this.#O.getIndicator(t);
  }
  removeIndicator(t) {
    return this.#O.removeIndicator(t);
  }
  indicatorSettings(t, e) {
    return this.#O.indicatorSettings(t, e);
  }
  hasStateIndicator(t, e = "searchAll") {
    if (!S(t) || !S(e))
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
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", tl), document.head.insertAdjacentHTML("beforeend", el), customElements.get("tradex-chart") || customElements.define("tradex-chart", L));
export {
  L as Chart,
  I as DOM,
  $t as Indicator,
  G as Overlay,
  Xi as Range,
  Ht as StateMachine,
  Z as canvas,
  it as copyDeep,
  bc as isPromise,
  be as mergeDeep,
  K as uid
};
