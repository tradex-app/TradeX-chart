function bo(n, t) {
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
const Co = "0.134.0";
function C(n) {
  return Array.isArray(n);
}
function _(n) {
  return n && typeof n == "function";
}
function v(n) {
  return typeof n == "object" && !Array.isArray(n) && n !== null;
}
function x(n) {
  return typeof n == "number" && !isNaN(n);
}
function Z(n) {
  return typeof n == "boolean";
}
function E(n) {
  return typeof n == "string";
}
function Dc(n) {
  return !!n && (v(n) || _(n)) && _(n.then);
}
const Mo = ["y", "M", "d", "h", "m", "s", "ms"], Po = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], Lo = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Ao = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Un = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Io = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], zn = 1231006505e3, Rt = 1, $ = 1e3, H = $ * 60, F = H * 60, O = F * 24, se = O * 7, it = O * 30;
function Wn(n = 3, t = !1) {
  let e = Un[n % 12] * O;
  return t && n > 0 && (e += O), e;
}
const lt = O * 365, be = {
  y: lt,
  M: it,
  w: se,
  d: O,
  h: F,
  m: H,
  s: $,
  u: Rt
}, Fn = {
  years: lt,
  months: it,
  weeks: se,
  days: O,
  hours: F,
  minutes: H,
  seconds: $,
  milliseconds: Rt
}, Oo = { ...be, ...Fn }, Re = {
  YEARS10: [lt * 10, "years"],
  YEARS5: [lt * 5, "years"],
  YEARS3: [lt * 3, "years"],
  YEARS2: [lt * 2, "years"],
  YEARS: [lt, "years"],
  MONTH6: [it * 6, "months"],
  MONTH4: [it * 4, "months"],
  MONTH3: [it * 3, "months"],
  MONTH2: [it * 2, "months"],
  MONTH: [it, "months"],
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
  MILLISECOND500: [Rt * 500, "milliseconds"],
  MILLISECOND250: [Rt * 250, "milliseconds"],
  MILLISECOND100: [Rt * 100, "milliseconds"],
  MILLISECOND50: [Rt * 50, "milliseconds"],
  MILLISECOND: [Rt, "milliseconds"]
}, Ro = () => {
  const n = Object.values(Re), t = [];
  for (let e = n.length; --e; e > 0)
    t[e] = n[e][0];
  return t;
}, we = Ro(), ko = () => {
  const n = Object.values(Re), t = [];
  for (let e = n.length; --e; e > 0)
    t[e] = n[e][1];
  return t;
}, Yi = ko(), Do = Object.keys(Re), _o = () => {
  const n = {};
  for (const [t, e] of Object.entries(Re))
    n[t] = e[0];
  return n;
}, No = _o(), qi = {
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
function $o() {
  const n = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(qi, n) ? qi[n.toString()] : "Etc/UTC";
}
function Ho() {
  const n = {};
  for (let t in be) {
    let e = 0;
    n[t] = [];
    do
      n[t].push(Math.round(be[t] * e)), e += 0.125;
    while (e < 1);
  }
  return n;
}
function Vn(n) {
  const t = new Date(n).getTime();
  return x(t);
}
function Gn(n, t = zn, e = Date.now()) {
  return Vn(n) ? n > t && n < e : !1;
}
const It = {
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
function Bo(n, t) {
  let e = It.inYears(n, t), i = It.inMonths(n, t), s = It.inWeeks(n, t), r = It.inDays(n, t), o = It.inHours(n, t), h = It.inMinutes(n, t), l = It.inSeconds(n, t), f = new Date(t).getTime() - new Date(n).getTime();
  return {
    y: e,
    M: i,
    w: s,
    d: r,
    h: o,
    m: h,
    s: l,
    ms: f,
    years: e,
    months: i,
    weeks: s,
    days: r,
    hours: o,
    minutes: h,
    seconds: l,
    milliseconds: f
  };
}
function ii(n) {
  let t = $;
  return E(n) ? (t = Yn(n), t ? n = n : (t = $, n = "1s")) : n = "1s", { tf: n, ms: t };
}
function Yn(n) {
  if (!E(n))
    return !1;
  const t = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let e;
  return (e = t.exec(n)) !== null ? be[e[2]] * e[1] : !1;
}
function ns(n) {
  let t = Math.floor(n / 1e3), e = Math.floor(t / 60);
  t = t % 60;
  let i = Math.floor(e / 60);
  e = e % 60;
  let s = Math.floor(i / 24);
  i = i % 24;
  let r = Math.floor(s / 7);
  s = s % 7;
  let o = Math.floor(r / 4), h = Math.floor(r / 52), l = r % 4;
  return o = o % 13, {
    y: h,
    M: o,
    w: l,
    d: s,
    h: i,
    m: e,
    s: t,
    years: h,
    months: o,
    weeks: l,
    days: s,
    hours: i,
    minutes: e,
    seconds: t
  };
}
function Te(n) {
  const t = ns(n);
  for (const e in t)
    if (t[e])
      return `${t[e]}${e}`;
}
function rs(n) {
  return n ? new Date(n).getUTCSeconds() : null;
}
function os(n) {
  return new Date(n).setUTCMilliseconds(0, 0);
}
function vi(n) {
  return n ? new Date(n).getUTCMinutes() : null;
}
function as(n) {
  return new Date(n).setUTCSeconds(0, 0);
}
function hs(n) {
  return n ? new Date(n).getUTCHours() : null;
}
function ls(n) {
  return new Date(n).setUTCMinutes(0, 0, 0);
}
function cs(n) {
  return n ? new Date(n).getUTCDate() : null;
}
function Uo(n, t = "en-GB", e = "short") {
  return new Date(n).toLocaleDateString(t, { weekday: e });
}
function Ce(n) {
  return new Date(n).setUTCHours(0, 0, 0, 0);
}
function ds(n) {
  if (n)
    return new Date(n).getUTCMonth();
}
function qn(n, t = "en-GB", e = "short") {
  return new Date(n).toLocaleDateString(t, { month: e });
}
function us(n) {
  let t = new Date(n);
  return Date.UTC(
    t.getUTCFullYear(),
    t.getUTCMonth(),
    1
  );
}
function Xn(n) {
  let t = (ds(n) + 1) % 12;
  return n += Wn(t, yi(n)), n;
}
function jn(n) {
  if (n)
    return new Date(n).getUTCFullYear();
}
function fs(n) {
  return Date.UTC(new Date(n).getUTCFullYear());
}
function Zn(n) {
  return n = n + lt + O, yi(n), n;
}
function yi(n) {
  let e = new Date(n).getUTCFullYear();
  return e & 3 ? !1 : e % 100 != 0 || e % 400 == 0;
}
function zo(n) {
  let t = new Date(n), e = t.getUTCMonth(), i = t.getUTCDate(), s = dayCount[e] + i;
  return e > 1 && yi() && s++, s;
}
function si(n, t) {
  return {
    years: (i) => fs(i),
    months: (i) => us(i),
    weeks: (i) => Ce(i),
    days: (i) => Ce(i),
    hours: (i) => ls(i),
    minutes: (i) => as(i),
    seconds: (i) => os(i)
  }[t](n);
}
function Wo(n, t) {
  let e, i;
  switch (t) {
    case "years":
      e = fs(n), i = Zn(n);
      break;
    case "months":
      e = us(n), i = Xn(n);
      break;
    case "weeks":
      e = Ce(n), i = e + O;
      break;
    case "days":
      e = Ce(n), i = e + O;
      break;
    case "hours":
      e = ls(n), i = e + F;
      break;
    case "minutes":
      e = as(n), i = e + H;
      break;
    case "seconds":
      e = os(n), i = e + $;
  }
  return { start: e, end: i };
}
function Fo(n) {
  String(cs(n)).padStart(2, "0");
}
function Kn(n) {
  let t = String(hs(n)).padStart(2, "0"), e = String(vi(n)).padStart(2, "0");
  return `${t}:${e}`;
}
function Vo(n) {
  let t = String(hs(n)).padStart(2, "0"), e = String(vi(n)).padStart(2, "0"), i = String(rs(n)).padStart(2, "0");
  return `${t}:${e}:${i}`;
}
function Xi(n) {
  let t = String(vi(n)).padStart(2, "0"), e = String(rs(n)).padStart(2, "0");
  return `${t}:${e}`;
}
function Go(n, t) {
  let e = 1 / 0, i = null, s = -1;
  for (let r = 0; r < t.length; r++) {
    let o = t[r][0];
    Math.abs(o - n) < e && (e = Math.abs(o - n), i = t[r], s = r);
  }
  return [s, i];
}
const Yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: zn,
  DAY_MS: O,
  DM: Fo,
  HM: Kn,
  HMS: Vo,
  HOUR_MS: F,
  MILLISECOND: Rt,
  MINUTE_MS: H,
  MONTHMAP: Io,
  MONTHR_MS: it,
  MONTH_MS: Wn,
  MS: Xi,
  SECOND_MS: $,
  TIMESCALES: we,
  TIMESCALESKEYS: Do,
  TIMESCALESRANK: Yi,
  TIMESCALESVALUES: Re,
  TIMESCALESVALUESKEYS: No,
  TIMEUNITS: Mo,
  TIMEUNITSLONG: Po,
  TIMEUNITSVALUES: Oo,
  TIMEUNITSVALUESLONG: Fn,
  TIMEUNITSVALUESSHORT: be,
  WEEK_MS: se,
  YEAR_MS: lt,
  buildSubGrads: Ho,
  dayCntInc: Lo,
  dayCntLeapInc: Ao,
  dayOfYear: zo,
  day_start: Ce,
  getTimezone: $o,
  get_day: cs,
  get_dayName: Uo,
  get_hour: hs,
  get_minute: vi,
  get_month: ds,
  get_monthName: qn,
  get_second: rs,
  get_year: jn,
  hour_start: ls,
  interval2MS: Yn,
  isLeapYear: yi,
  isTimeFrame: ii,
  isValidTimeInRange: Gn,
  isValidTimestamp: Vn,
  minute_start: as,
  monthDayCnt: Un,
  month_start: us,
  ms2Interval: Te,
  ms2TimeUnits: ns,
  nearestTs: Go,
  nextMonth: Xn,
  nextYear: Zn,
  second_start: os,
  time_start: si,
  timestampDiff: It,
  timestampDifference: Bo,
  timezones: qi,
  unitRange: Wo,
  year_start: fs
}, Symbol.toStringTag, { value: "Module" }));
function qo(n, t) {
  return n = Math.ceil(n) + 1, t = Math.floor(t), Math.floor(Math.random() * (t - n) + n);
}
function Xo(n) {
  const t = {};
  return t.value = n, t.sign = !!n, t.integers = Qn(n), t.decimals = Jn(n), t.total = t.integers + t.decimals, t;
}
function Qn(n) {
  return (Math.log10((n ^ n >> 31) - (n >> 31)) | 0) + 1;
}
function jo(n) {
  return n | 0;
}
function Di(n, t) {
  t = t || 100;
  const e = Math.pow(10, t);
  return Math.round((n + Number.EPSILON) * e) / e;
}
function et(n, t = 0) {
  var e = n * Math.pow(10, t), i = Math.round(e), s = (e > 0 ? e : -e) % 1 === 0.5 ? i % 2 === 0 ? i : i - 1 : i;
  return s / Math.pow(10, t);
}
function Jn(n) {
  if (typeof n != "number" && (n = parseFloat(n)), isNaN(n) || !isFinite(n))
    return 0;
  for (var t = 1, e = 0; Math.round(n * t) / t !== n && (t *= 10, t !== 1 / 0); )
    e++;
  return e;
}
function Zo(n) {
  return Math.log(n) / Math.log(10);
}
function Ko(n, t) {
  return Math.pow(n, t);
}
function V(n, t, e) {
  return Math.min(e, Math.max(t, n));
}
function Me(n, t) {
  return !v(n) || !v(t) ? t : (Object.keys(t).forEach((e) => {
    const i = n[e], s = t[e];
    Array.isArray(i) && Array.isArray(s) ? n[e] = Me(i.concat([]), s) : v(i) && v(s) ? n[e] = Me(Object.assign({}, i), s) : n[e] = s;
  }), n);
}
function st(n) {
  if (n === null || typeof n != "object" || "isActiveClone" in n)
    return n;
  if (n instanceof Date)
    var t = new n.constructor();
  else
    var t = Array.isArray(n) ? [] : {};
  for (var e in n)
    Object.prototype.hasOwnProperty.call(n, e) && (n.isActiveClone = null, t[e] = st(n[e]), delete n.isActiveClone);
  return t;
}
function tr(n, t, e) {
  const [i, ...s] = t.split(".");
  return {
    ...n,
    [i]: s.length ? tr(n[i], s.join("."), e) : e
  };
}
function qs(n, t) {
  return t.split(".").reduce((i, s) => i && i[s] !== "undefined" ? i[s] : void 0, n);
}
function gs(n, t) {
  if (!C(n) || !C(t) || n.length !== t.length)
    return !1;
  let e = n.length;
  for (; e--; ) {
    if (C(n[e]) || C(t[e])) {
      if (!gs(n[e], t[e]))
        return !1;
      continue;
    }
    if (v(n[e]) || v(n[e])) {
      if (!v(n[e], t[e]))
        return !1;
      continue;
    }
    if (n[e] !== t[e])
      return !1;
  }
  return !0;
}
function Qo(n, t, e) {
  [myArray[t], myArray[e]] = [myArray[e], myArray[t]];
}
function er(n, t) {
  return C(t) ? C(n) ? n.every((e) => t.includes(e)) : t.includes(n) : !1;
}
function ir(n, t) {
  if (!v(n) || !v(t))
    return !1;
  const e = Object.keys(n).sort(), i = Object.keys(t).sort();
  return e.length !== i.length ? !1 : e.every((r, o) => {
    const h = n[r], l = t[i[o]];
    return C(h) || C(l) ? gs(h, l) : v(h) || v(l) ? ir(h, l) : h === l;
  });
}
function tt(n = "ID") {
  x(n) ? n = n.toString() : E(n) || (n = "ID"), n = n.replace(/ |,|;|:|\.|#/g, "_");
  const t = Date.now().toString(36), e = Math.random().toString(36).substring(2, 5);
  return `${n}_${t}_${e}`;
}
const Jo = (n) => n.entries().next().value, ta = (n) => n.entries().next().value[0], ea = (n) => n.entries().next().value[1], ia = (n) => [...n].pop(), sa = (n) => [...n.keys()].pop(), na = (n) => [...n.values()].pop();
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
    return Jo(this);
  }
  firstKey() {
    return ta(this);
  }
  firstValue() {
    return ea(this);
  }
  lastEntry() {
    return ia(this);
  }
  lastKey() {
    return sa(this);
  }
  lastValue() {
    return na(this);
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
    return C(t) ? (arr.forEach(([e, i]) => this.set(e, i)), !0) : !1;
  }
  populate(t) {
    return C(t) ? (this.clear(), arr.forEach(([e, i]) => this.set(e, i)), !0) : !1;
  }
  insertIndex(t, e, i) {
    if (!x(t))
      return !1;
    const s = [...this];
    return s.splice(t, 0, [e, i]), this.populate(s), !0;
  }
  removeIndex(t) {
    if (!x(t))
      return !1;
    const e = [...this];
    return e.splice(t, 1), this.populate(e), !0;
  }
  swapIndices(t, e) {
    if (!x(t) || !x(e))
      return !1;
    const i = [...this];
    return Qo(i, t, e), this.populate(i), !0;
  }
  swapKeys(t, e) {
    const i = [...this], s = i.findIndex(([o]) => o === t), r = i.findIndex(([o]) => o === e);
    return [i[s], i[r]] = [i[r], i[s]], this.clear(), i.forEach(([o, h]) => this.set(o, h)), !0;
  }
}
function Et(n, t = 100, e, i = !1) {
  var s, r = function() {
    var o = e || this, h = arguments, l = function() {
      s = null, i || n.apply(o, h);
    }, f = i && !s;
    clearTimeout(s), s = setTimeout(l, t), f && n.apply(o, h);
  };
  return r;
}
function ra(n, t = 250, e) {
  var i, s, r = function() {
    var h = e || this, l = +/* @__PURE__ */ new Date(), f = arguments;
    i && l < i + t ? (clearTimeout(s), s = setTimeout(function() {
      i = l, n.apply(h, f);
    }, t)) : (i = l, n.apply(h, f));
  };
  function o() {
    timeout && (clearTimeout(s), timeout = void 0);
  }
  return r.reset = function() {
    o(), i = 0;
  }, r;
}
class oa {
  #t;
  #e;
  #r;
  #n = [];
  constructor(t, e) {
    this.#t = t, this.#e = E(e.id) ? e.id : tt, this.#r = E(e.type) ? e.type : "default", this.#n = C(e.data) ? e.data : [];
  }
}
function aa(n, t = !1) {
  if (!C(n))
    return !1;
  let e = qo(0, n.length);
  if (!ni(n[0], t) || !ni(n[e], t) || !ni(n[n.length - 1], t))
    return !1;
  let i = n[0][0], s = n[1][0], r = n[2][0];
  return !(i > s && s > r);
}
function ha(n, t = !1) {
  if (!C(n))
    return !1;
  let e = 0, i = 0;
  for (; e < n.length; ) {
    if (!ni(n[e], t) || n[e][0] < i)
      return !1;
    i = n[e][0], e++;
  }
  return !0;
}
function ni(n, t = !1) {
  return !(!C(n) || n.length !== 6 || t && !Gn(n[0]) || !x(n[1]) || !x(n[2]) || !x(n[3]) || !x(n[4]) || !x(n[5]));
}
function la(n) {
  for (let t of n)
    for (let e = 0; e < 6; e++)
      t.length = 6, t[e] *= 1;
  return n;
}
const ca = H, da = "1m", hi = ca, ua = 6, Xs = 0.05, fa = 100, js = 100, Zt = ["default", "percent", "log"], Zs = 0.3, Ks = 30, Ze = 200, Qs = 200, Js = 20, tn = 4096, wi = 5, en = 50, sn = 30, ga = 8;
class ji {
  #t = hi;
  #e = "1s";
  indexStart = 0;
  indexEnd = Ze;
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
  initialCnt = Ks;
  limitFuture = Ze;
  limitPast = Qs;
  minCandles = Js;
  maxCandles = tn;
  yAxisBounds = Zs;
  rangeLimit = Ze;
  anchor;
  #r;
  #n;
  #i = !0;
  constructor(t, e, i = {}) {
    if (!v(i) || !(i?.core instanceof L))
      return !1;
    this.#i = !0, this.setConfig(i), this.#r = i.core, t = x(t) ? t : 0, e = x(e) ? e : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const s = i?.interval || hi;
    if (this.data.length == 0) {
      let r = Date.now();
      t = 0, e = this.rangeLimit, this.#t = s, this.#e = Te(this.interval), this.anchor = r - r % s;
    } else
      this.data.length < 2 ? (this.#t = s, this.#e = Te(this.interval)) : (this.#t = Zi(this.data), this.#e = Te(this.interval));
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
    WebWorker.destroy(this.#n.id);
  }
  set(t = 0, e = this.dataLength, i = this.maxCandles, s) {
    if (!x(t) || !x(e) || !x(i))
      return !1;
    t = t | 0, e = e | 0, i = i | 0, i = V(i, this.minCandles, this.maxCandles), t > e && ([t, e] = [e, t]), e = V(e, t + this.minCandles, t + i);
    let r = e - t;
    t = V(t, this.limitPast * -1, this.dataLength + this.limitFuture - this.minCandles - 1), e = V(e, t + this.minCandles, this.dataLength + this.limitFuture - 1), t = e - t < r ? t - (r - (e - t)) : t;
    const o = t, h = e, l = this.indexStart, f = this.indexEnd;
    let m = this.Length;
    this.indexStart = t, this.indexEnd = e, m -= this.Length;
    let T = this.maxMinPriceVol({ data: this.data, start: this.indexStart, end: this.indexEnd, that: this });
    return this.setMaxMin(T), this.setConfig(s), this.#r.emit("setRange", [o, h, l, f]), !0;
  }
  setConfig(t) {
    if (!v(t))
      return !1;
    this.initialCnt = x(t?.initialCnt) ? t.initialCnt : Ks, this.limitFuture = x(t?.limitFuture) ? t.limitFuture : Ze, this.limitPast = x(t?.limitPast) ? t.limitPast : Qs, this.minCandles = x(t?.minCandles) ? t.minCandles : Js, this.maxCandles = x(t?.maxCandles) ? t.maxCandles : tn, this.yAxisBounds = x(t?.yAxisBounds) ? t.yAxisBounds : Zs;
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
    x(t) || (t = i.length - 1);
    let s = i[t];
    if (s !== void 0)
      return s;
    {
      const r = i.length - 1;
      return s = [null, null, null, null, null, null], i.length < 1 ? (s[0] = Date.now() + this.interval * t, s) : t < 0 ? (s[0] = i[0][0] + this.interval * t, s) : t > r ? (s[0] = i[r][0] + this.interval * (t - r), s) : null;
    }
  }
  valueByTS(t, e = "") {
    if (!x(t) || !E(e))
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
        if (e.length === 0)
          return this.value(i);
        e.split("_");
        break;
    }
  }
  getDataById(t) {
    if (!E(t))
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
    if (!x(t))
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
    let { data: e, start: i, end: s, that: r } = { ...t }, o = et(this.#r.bufferPx / this.#r.candleW);
    if (o = x(o) ? o : 0, i = x(i) ? i - o : 0, i = i > 0 ? i : 0, s = typeof s == "number" ? s : e?.length - 1, e.length == 0)
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
    let h = e.length - 1, l = Gt(i, 0, h), f = Gt(s, 0, h), m = e[l][3], T = e[l][2], b = e[l][5], P = e[l][5], G = l, B = l, rt = l, D = l;
    for (; l++ < f; )
      e[l][3] < m && (m = e[l][3], G = l), e[l][2] > T && (T = e[l][2], B = l), e[l][5] < b && (b = e[l][5], rt = l), e[l][5] > P && (P = e[l][5], D = l);
    let R = T - m;
    return m -= R * r.yAxisBounds, m = m > 0 ? m : 0, T += R * r.yAxisBounds, R = T - m, {
      valueMin: m,
      valueMax: T,
      valueDiff: T - m,
      volumeMin: b,
      volumeMax: P,
      volumeDiff: P - b,
      valueMinIdx: G,
      valueMaxIdx: B,
      volumeMinIdx: rt,
      volumeMaxIdx: D
    };
    function Gt(le, _e, Yt) {
      return Math.min(Yt, Math.max(_e, le));
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
function Zi(n) {
  let t = Math.min(n.length - 1, 99), e = 1 / 0;
  return n.slice(0, t).forEach((i, s) => {
    let r = n[s + 1][0] - i[0];
    r === r && r < e && (e = r);
  }), e;
}
function Ki(n, t) {
  if (!x(t))
    return !1;
  let e, i = n.timeFrameMS;
  return t = t - t % i, t === n.range.data[0][0] ? e = 0 : t < n.range.data[0][0] ? e = (n.range.data[0][0] - t) / i * -1 : e = (t - n.range.data[0][0]) / i, e;
}
const ye = "TradeX-Chart", Ee = "TX", ma = "tradeXutils", nn = "tradeXmenus", pa = "tradeXmenu", rn = "tradeXdividers", on = "tradeXwindows", va = "tradeXwindow", an = "tradeXprogress", ya = 500, wa = "stream_None", Se = "stream_Listening", hn = "stream_Started", xa = "stream_Stopped", Ta = "stream_Error", Pe = "stream_candleFirst", bt = "stream_candleUpdate", Le = "stream_candleNew", Ea = 250, Sa = 8, ba = 2, Ca = 2, Ma = "defaultState", Pa = {
  id: Ma,
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
    tf: da,
    tfms: hi
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
}, ln = {
  timestamp: "number",
  id: "string",
  side: "string",
  price: "number",
  amount: "number",
  filled: "number",
  average: "number",
  total: "number",
  tag: "string"
};
class I {
  static #t = new dt();
  static get default() {
    return st(Pa);
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
    if (v(t) || (t = {}), v(t.chart) || (t.chart = s.chart, t.chart.isEmpty = !0, t.chart.data = C(t.ohlcv) ? t.ohlcv : [], delete t.ohlcv), t = Me(s, t), e ? t.chart.data = ha(t.chart.data, i) ? t.chart.data : [] : t.chart.data = aa(t.chart.data, i) ? t.chart.data : [], t.chart.isEmpty = t.chart.data.length == 0, !x(t.chart?.tf) || e) {
      let l = Zi(t.chart.data);
      l < $ && (l = hi), t.chart.tfms = l;
    }
    if ((!E(t.chart?.tfms) || e) && (t.chart.tf = Te(t.chart.tfms)), C(t.views) || (t.views = s.views), C(t.primary) || (t.primary = s.primary), C(t.secondary) || (t.secondary = s.secondary), v(t.chart.settings) || (t.chart.settings = s.chart.settings), C(t.datasets) || (t.datasets = []), t.views.length == 0) {
      t.views.push(["primary", t.primary]);
      for (let l in t)
        l.indexOf("secondary") == 0 && t.views.push([l, t[l]]);
    }
    let r = t.views, o = r.length;
    for (; o--; )
      if (!C(r[o]) || r[o].length == 0)
        r.splice(o, 1);
      else {
        let l = t.views[o][1], f = l.length;
        for (; f--; )
          !v(l[f]) && !E(l[f].name) && !E(l[f].type) && !C(l[f].data) ? l.splice(f, 1) : v(l[f].settings) || (l[f].settings = {});
        r[o].length == 0 && r.splice(o, 1);
      }
    t.views.length == 0 && (t.views[0] = ["primary", s.primary]), t.views = new dt(t.views), t.views.has("primary") || t.views.insert("primary", s.primary, 0), t.views.get("primary").push(t.chart);
    for (var h of t.datasets)
      this.#i || (this.#i = {}), this.dss[h.id] = new oa(this, h);
    return t;
  }
  static delete(t) {
    if (!E(t) || !I.has(t))
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
    v(e) || (e = {});
    const i = I.get(t), s = e?.type, r = st(i.data), o = r.chart.data;
    let h;
    switch (o.length > 0 && o[o.length - 1].length > 6 && (o.length = o.length - 1), r.views.get("primary").pop(), r.views = Array.from(r.views), s) {
      case "json":
      default:
        const { replacer: l, space: f } = { ...e };
        h = JSON.stringify(r, l, f);
    }
    return h;
  }
  #e = "";
  #r = "";
  #n = {};
  #i = {};
  #s;
  #o = !1;
  #h = !0;
  #l = [];
  constructor(t, e = !1, i = !1) {
    v(t) ? (this.#n = I.validate(t, e, i), this.#o = "valid", this.#h = !!this.#n.chart?.isEmpty, this.#s = t?.core instanceof L ? t.core : void 0) : (this.#n = I.default, this.#o = "default", this.#h = !0), this.#e = t?.id || "", this.#r = tt(`${Ee}_state`);
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
      data: this.#n.chart.data,
      primaryPane: this.#n.secondary,
      secondaryPane: this.#n.secondary,
      datasets: this.#n.datasets
    };
  }
  get data() {
    return this.#n;
  }
  get core() {
    return this.#s !== void 0 ? this.#s : !1;
  }
  get time() {
    return this.#s.time;
  }
  get range() {
    return this.#s.range;
  }
  error(t) {
    this.#s.error(t);
  }
  create(t, e, i) {
    return I.create(t, e, i);
  }
  delete(t) {
    if (!E(t))
      return !1;
    if (t !== this.key)
      I.delete(t);
    else if (I.has(t)) {
      const e = I.create();
      this.use(e.key), I.delete(t);
    }
    return !0;
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
      return e.warn(`${e.name} id: ${e.id} : Specified state does not exist`), !1;
    if (t === this.key)
      return !0;
    e.stream.stop(), e.MainPane.reset();
    let i = I.get(t);
    this.#e = i.id, this.#o = i.status, this.#h = i.isEmpty, this.#n = i.data;
    const s = {
      interval: i.data.chart.tfms,
      core: e
    };
    if (e.getRange(null, null, s), this.range.Length > 1) {
      const r = Ki(e.time, void 0), o = r ? r + this.range.initialCnt : i.data.length - 1, h = r || o - this.range.initialCnt;
      this.range.initialCnt = o - h, e.setRange(h, o);
    }
    e.MainPane.restart(), e.refresh();
  }
  export(t = this.key, e = {}) {
    return I.export(t, e = {});
  }
  mergeData(t, e = !1, i = !1) {
    if (!v(t))
      return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let s = C(t?.ohlcv) ? t.ohlcv.length - 1 : 0;
    if (s > 1 && this.time.timeFrameMS !== Zi(t?.ohlcv))
      return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    (this.#h || !x(this.time.timeFrameMS)) && (!v(e) || !x(e.start) || !x(e.end)) && s > 1 && (e = { start: s - this.range.initialCnt, end: s }), v(e) ? (x(e?.startTS) ? e.start = e.startTS : e.start = x(e.start) ? this.range.value(e.start)[0] : this.range.timeMin, x(e?.endTS) ? e.end = e.endTS : e.end = x(e.end) ? this.range.value(e.end)[0] : this.range.timeMax) : (e = {}, e.start = this.range.timeMin, e.end = this.range.timeMax);
    let r, o, h = t?.ohlcv || !1;
    const l = this.allData.data, f = this.allData?.primaryPane, m = t?.primary || !1;
    this.allData?.secondaryPane;
    const T = t?.secondary || !1;
    this.allData?.dataset?.data;
    const b = t?.dataset?.data || !1;
    this.allData?.trades, t?.trades;
    const P = C(h) && this.range.inRange(h[0][0]) ? 1 : 0, G = {};
    if (C(h) && h.length > 0) {
      if (r = h.length - 1, l.length - 1, G.mData = this.range.inRange(h[0][0]) && this.range.inRange(h[0][r]), !Z(h[r][7]) && h[r].length !== 8 && h[r][6] !== null && h[r][7] !== !0 ? h = la(h) : e.end >= this.range.timeFinish && e.start <= this.range.timeFinish && (e.start += this.range.interval, e.end += this.range.interval), l.length == 0 ? this.allData.data.push(...h) : (e = e || {
        start: this.range.timeMin,
        end: this.range.timeMax
      }, this.data.chart.data = this.merge(l, h)), i)
        this.#s.calcAllIndicators();
      else {
        if (C(m) && m.length > 0) {
          for (let D of m)
            if (C(D?.data) && D?.data.length > 0)
              for (let R of f)
                R.name === D.name && R.type === D.type && ir(R.settings, D.settings) && (R.data = this.merge(R.data, D.data));
        }
        if (C(T) && T.length > 0)
          for (let D of T)
            C(D?.data) && D?.data.length > 0;
      }
      if (C(b) && b.length > 0)
        for (let D of b)
          C(D?.data) && D?.data.length > 0;
      e && (v(e) ? (o = x(e.start) ? this.range.getTimeIndex(e.start) : this.range.indexStart, s = x(e.end) ? this.range.getTimeIndex(e.end) : this.range.indexEnd) : (h[0][0] && (o = this.range.indexStart + P), s = this.range.indexEnd + P), this.#s.setRange(o, s));
      let B, rt = !1;
      for (B in G)
        rt = rt || B;
      return t.ohlcv.length > 1 && this.#s.emit("state_mergeComplete"), rt && this.#s.refresh(), this.#h = !1, !0;
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
        let l = Array(r[0].length).fill(null);
        l[0] = o, i.push(l), i = i.concat(r);
      }
    } else
      i = s.concat(r);
    return i;
  }
  addTrade(t) {
    const e = Object.keys(t), i = Object.keys(ln);
    if (!v(t) || !gs(e, i))
      return !1;
    for (let o of i)
      if (typeof t[o] !== ln[o])
        return !1;
    const s = t.timestamp - t.timestamp % this.time.timeFrameMS, r = new Date(s);
    return t.dateStr = `${r.getFullYear()}/${r.getMonth() + 1}/${r.getDate()} ${r.getHours()}:${r.getMinutes()}`, C(this.allData.trades[s]) || (this.allData.trades[s] = []), this.allData.trades[s].push(t), !0;
  }
}
class $t {
  #t;
  #e;
  #r;
  #n = {};
  #i;
  #s;
  #o = "stopped";
  #h;
  #l;
  #a;
  #c;
  #u = ["await", "idle", "running", "stopped"];
  constructor(t, e) {
    if (!$t.validateConfig(t))
      return !1;
    const i = { ...t };
    this.id = i.id, this.#i = i, this.#e = i.initial, this.#n.origin = e, this.#c = i.actions, this.#s = e.core, this.#d();
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
    return this.#n;
  }
  get core() {
    return this.#s;
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
    if (!s || !_(s.action) || this.#o !== "running")
      return !1;
    let r = s?.condition?.type || s?.condition || !1;
    if (r && !this.condition.call(this, r, s.condition))
      return !1;
    const o = s.target, h = this.#i.states[o];
    if (i?.onExit.call(this, e), s.action.call(this, e), this.#r = this.#e, this.#e = o, h?.onEnter.call(this, e), this.#i.states[o]?.on && (this.#i.states[o].on[""] || this.#i.states[o].on?.always)) {
      const l = this.#i.states[o].on[""] || this.#i.states[o].on.always;
      if (C(l))
        for (let f of l) {
          let m = f?.condition?.type || f?.condition || !1;
          this.condition.call(this, m, f.condition) && E(f.target) && (f?.action.call(this, e), this.#r = this.#e, this.#e = f?.target, this.notify(null, null));
        }
      else if (v(l) && E(l.target)) {
        let f = l?.condition?.type || l?.condition || !1;
        this.condition.call(this, f, l.condition) && E(l.target) && (l?.action.call(this, e), this.#r = this.#e, this.#e = l.target, this.notify(null, null));
      }
    }
    return this.#e;
  }
  condition(t, e = null, i = {}) {
    return t ? this.#i.guards[t].call(this, this.#n, e, i) : !1;
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
        this.#h.add({ topic: e, cb: i }), this.#s.on(e, i, this.context);
      }
  }
  #f() {
    for (let t of this.#h)
      this.#s.off(t.topic, t.cb);
  }
  static validateConfig(t) {
    if (!v(t))
      return !1;
    const e = ["id", "initial", "context", "states"];
    let i = Object.keys(t);
    if (!er(e, i) || !(t.initial in t.states))
      return !1;
    for (let s in t.states) {
      if (!v(t.states[s]) || "onEnter" in t.states[s] && !_(t.states[s].onEnter) || "onExit" in t.states[s] && !_(t.states[s].onExit))
        return !1;
      if ("on" in t.states[s])
        for (let r in t.states[s].on) {
          let o = t.states[s].on[r];
          if (!E(o.target) || "action" in o && !_(o.action))
            return !1;
        }
    }
    return !0;
  }
}
const La = "alert";
class Aa {
  #t = new dt();
  #e = {};
  constructor(t) {
    if (C(t))
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
    if (C(t)) {
      let e = [];
      for (let i of t)
        e.push(this.add(i?.price, i?.condition, i?.handler));
      return e;
    } else
      return !1;
  }
  add(t, e, i) {
    if (isNaN(t) || !_(i))
      return !1;
    const s = tt(La), r = { price: t, condition: e };
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
    if (!(!C(t) || !C(e))) {
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
const Ia = 0, Oa = 1, Ra = 2, ka = 3, Da = 4, _a = 5, Ke = [null, null, null, null, null], Qe = {
  tfCountDown: !0,
  alerts: []
};
class Qt {
  #t;
  #e;
  #r;
  #n;
  #i;
  #s;
  #o;
  #h = Ke;
  #l = 0;
  #a = 0;
  #c = "";
  #u = !1;
  #d;
  #f;
  #v = Ke;
  #w;
  static validateConfig(t) {
    if (v(t)) {
      let e = st(Qe);
      t = Me(e, t), t.tfCountDown = Z(t.tfCountDown) ? t.tfCountDown : Qe.tfCountDown, t.alerts = C(t.alerts) ? t.alerts : Qe.alerts;
    } else
      return Qe;
    return t;
  }
  constructor(t) {
    this.#t = t, this.#n = t.time, this.status = { status: wa }, this.#e = Qt.validateConfig(t.config?.stream), this.#i = x(t.config?.maxCandleUpdate) ? t.config.maxCandleUpdate : Ea, this.#o = x(t.config?.streamPrecision) ? t.config.streamPrecision : Sa;
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
    this.#u || (this.#u = !0, this.status = { status: Pe, data: t });
  }
  get alerts() {
    return this.#w;
  }
  get lastPriceMin() {
    return this.#f;
  }
  set lastPriceMin(t) {
    x(t) && (this.#f = t);
  }
  get lastPriceMax() {
    return this.#d;
  }
  set lastPriceMax(t) {
    x(t) && (this.#d = t);
  }
  get lastTick() {
    return this.#v;
  }
  set lastTick(t) {
    C(t) && (this.#v, this.#v = t, this.alerts.check(t, this.#h));
  }
  set candle(t) {
    const e = [...this.#h];
    t.t = this.roundTime(new Date(t.t)), t.o = t.o * 1, t.h = t.h * 1, t.l = t.l * 1, t.c = t.c * 1, t.v = t.v * 1, this.#h[Ia] !== t.t ? this.newCandle(t) : this.updateCandle(t), this.status = { status: Se, data: this.#h }, this.lastTick = e;
  }
  get candle() {
    return this.#h !== Ke ? this.#h : null;
  }
  start() {
    this.#w = new Aa(this.#e.alerts), this.status = { status: hn }, this.#s = setInterval(this.onUpdate.bind(this), this.#i);
  }
  stop() {
    this.#w.destroy(), this.status = { status: xa };
  }
  emit(t, e) {
    this.#t.emit(t, e);
  }
  error() {
    this.status = { status: Ta };
  }
  onTick(t) {
    (this.#r == hn || this.#r == Se) && v(t) && (this.candle = t);
  }
  onUpdate() {
    this.#h !== Ke && (this.status = { status: bt, data: this.candle }, this.status = { status: Se, data: this.#h });
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
    ], this.#t.state.mergeData({ ohlcv: [this.#h] }, !0, !1), this.status = { status: Le, data: { data: t, candle: this.#h } }, this.#a = this.#n.timeFrameMS, this.#l = this.roundTime(Date.now());
  }
  prevCandle() {
    const t = this.#t.allData.data;
    t.length > 0 && t[t.length - 1][7] && (t[t.length - 1].length = 6);
  }
  updateCandle(t) {
    let e = this.#h;
    e[Oa] = t.o, e[Ra] = t.h, e[ka] = t.l, e[Da] = t.c, e[_a] = t.v, this.#h = e;
    const i = this.#t.allData.data, s = i.length > 0 ? i.length - 1 : 0;
    i[s] = this.#h, this.countDownUpdate();
  }
  countDownUpdate() {
    let t, e, i, s, r, o, h;
    this.#n.timeFrameMS;
    let l = this.#n.timeFrameMS - (Date.now() - this.#l);
    return l < 0 && (l = 0), this.#a = l, l > lt ? (t = String(Math.floor(l / lt)), e = String(Math.floor(l % lt / it)).padStart(2, "0"), this.#c = `${t}Y ${e}M`) : l > it ? (e = String(Math.floor(l / it)).padStart(2, "0"), s = String(Math.floor(l % it / O)).padStart(2, "0"), this.#c = `${e}M ${s}D`) : l > se ? (i = String(Math.floor(l / se)).padStart(2, "0"), s = String(Math.floor(l % it / O)).padStart(2, "0"), this.#c = `${i}W ${s}D`) : l > O ? (s = String(Math.floor(l / O)).padStart(2, "0"), r = String(Math.floor(l % O / F)).padStart(2, "0"), o = String(Math.floor(l % F / H)).padStart(2, "0"), this.#c = `${s}D ${r}:${o}`) : l > F ? (r = String(Math.floor(l / F)).padStart(2, "0"), o = String(Math.floor(l % F / H)).padStart(2, "0"), h = String(Math.floor(l % H / $)).padStart(2, "0"), this.#c = `${r}:${o}:${h}`) : l > H ? (o = String(Math.floor(l / H)).padStart(2, "0"), h = String(Math.floor(l % H / $)).padStart(2, "0"), this.#c = `00:${o}:${h}`) : (h = String(Math.floor(l / $)).padStart(2, "0"), String(l % $).padStart(4, "0"), this.#c = `00:00:${h}`), this.#c;
  }
  roundTime(t) {
    return t - t % this.#t.time.timeFrameMS;
  }
}
const sr = {
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
    let r = s.right - s.left, o = s.bottom - s.top, h = this.isVisible(n), l = this.isInViewport(n);
    return { top: e, left: t, width: r, height: o, visible: h, viewport: l };
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
    if (!E(n))
      return !1;
    const t = document.createElement("template");
    return n = n.trim(), t.innerHTML = n, t.content.firstChild;
  },
  htmlToElements(n) {
    if (!E(n))
      return !1;
    const t = document.createElement("template");
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
      !n.contains(s.target) && sr.isVisible(n) && (t(), i());
    }, i = () => {
      document.removeEventListener("click", e);
    };
    document.addEventListener("click", e);
  },
  getStyle(n, t) {
    let e, i;
    if (E(n))
      e = document.getElementById(n);
    else if (this.isElement(n))
      e = n;
    else
      return !1;
    return E(t) ? (window.getComputedStyle ? i = document.defaultView.getComputedStyle(e, null).getPropertyValue(t) : e.currentStyle && (i = e.currentStyle[t]), i) : !1;
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
    if (!n || !v(n))
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
    return !this.isElement(n) || !E(t) ? null : n.classList.contains(t) ? n : this.findTargetParentWithClass(n.parentElement, t);
  }
}, A = sr, Na = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const $a = ((n) => "onorientationchange" in n || n.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in n || n.DocumentTouch && document instanceof n.DocumentTouch)(typeof window < "u" ? window : {}), Ha = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class Ft {
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
    x(t) && (this.#t = t);
  }
  get x() {
    return this.#t;
  }
  set y(t) {
    x(t) && (this.#e = t);
  }
  get y() {
    return this.#e;
  }
  clone() {
    return new Ft(this.x, this.y);
  }
}
function Ba(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var nr = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(n) {
  (function(t, e, i, s) {
    var r = ["", "webkit", "Moz", "MS", "ms", "o"], o = e.createElement("div"), h = "function", l = Math.round, f = Math.abs, m = Date.now;
    function T(a, c, u) {
      return setTimeout(Gt(a, u), c);
    }
    function b(a, c, u) {
      return Array.isArray(a) ? (P(a, u[c], u), !0) : !1;
    }
    function P(a, c, u) {
      var g;
      if (a)
        if (a.forEach)
          a.forEach(c, u);
        else if (a.length !== s)
          for (g = 0; g < a.length; )
            c.call(u, a[g], g, a), g++;
        else
          for (g in a)
            a.hasOwnProperty(g) && c.call(u, a[g], g, a);
    }
    function G(a, c, u) {
      var g = "DEPRECATED METHOD: " + c + `
` + u + ` AT 
`;
      return function() {
        var p = new Error("get-stack-trace"), S = p && p.stack ? p.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", M = t.console && (t.console.warn || t.console.log);
        return M && M.call(t.console, g, S), a.apply(this, arguments);
      };
    }
    var B;
    typeof Object.assign != "function" ? B = function(c) {
      if (c === s || c === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var u = Object(c), g = 1; g < arguments.length; g++) {
        var p = arguments[g];
        if (p !== s && p !== null)
          for (var S in p)
            p.hasOwnProperty(S) && (u[S] = p[S]);
      }
      return u;
    } : B = Object.assign;
    var rt = G(function(c, u, g) {
      for (var p = Object.keys(u), S = 0; S < p.length; )
        (!g || g && c[p[S]] === s) && (c[p[S]] = u[p[S]]), S++;
      return c;
    }, "extend", "Use `assign`."), D = G(function(c, u) {
      return rt(c, u, !0);
    }, "merge", "Use `assign`.");
    function R(a, c, u) {
      var g = c.prototype, p;
      p = a.prototype = Object.create(g), p.constructor = a, p._super = g, u && B(p, u);
    }
    function Gt(a, c) {
      return function() {
        return a.apply(c, arguments);
      };
    }
    function le(a, c) {
      return typeof a == h ? a.apply(c && c[0] || s, c) : a;
    }
    function _e(a, c) {
      return a === s ? c : a;
    }
    function Yt(a, c, u) {
      P($e(c), function(g) {
        a.addEventListener(g, u, !1);
      });
    }
    function Ne(a, c, u) {
      P($e(c), function(g) {
        a.removeEventListener(g, u, !1);
      });
    }
    function bs(a, c) {
      for (; a; ) {
        if (a == c)
          return !0;
        a = a.parentNode;
      }
      return !1;
    }
    function Ht(a, c) {
      return a.indexOf(c) > -1;
    }
    function $e(a) {
      return a.trim().split(/\s+/g);
    }
    function qt(a, c, u) {
      if (a.indexOf && !u)
        return a.indexOf(c);
      for (var g = 0; g < a.length; ) {
        if (u && a[g][u] == c || !u && a[g] === c)
          return g;
        g++;
      }
      return -1;
    }
    function He(a) {
      return Array.prototype.slice.call(a, 0);
    }
    function Cs(a, c, u) {
      for (var g = [], p = [], S = 0; S < a.length; ) {
        var M = c ? a[S][c] : a[S];
        qt(p, M) < 0 && g.push(a[S]), p[S] = M, S++;
      }
      return u && (c ? g = g.sort(function(W, j) {
        return W[c] > j[c];
      }) : g = g.sort()), g;
    }
    function Be(a, c) {
      for (var u, g, p = c[0].toUpperCase() + c.slice(1), S = 0; S < r.length; ) {
        if (u = r[S], g = u ? u + p : c, g in a)
          return g;
        S++;
      }
      return s;
    }
    var Wr = 1;
    function Fr() {
      return Wr++;
    }
    function Ms(a) {
      var c = a.ownerDocument || a;
      return c.defaultView || c.parentWindow || t;
    }
    var Vr = /mobile|tablet|ip(ad|hone|od)|android/i, Ps = "ontouchstart" in t, Gr = Be(t, "PointerEvent") !== s, Yr = Ps && Vr.test(navigator.userAgent), ce = "touch", qr = "pen", Si = "mouse", Xr = "kinect", jr = 25, X = 1, Bt = 2, N = 4, K = 8, Ue = 1, de = 2, ue = 4, fe = 8, ge = 16, yt = de | ue, Ut = fe | ge, Ls = yt | Ut, As = ["x", "y"], ze = ["clientX", "clientY"];
    function ot(a, c) {
      var u = this;
      this.manager = a, this.callback = c, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(g) {
        le(a.options.enable, [a]) && u.handler(g);
      }, this.init();
    }
    ot.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && Yt(this.element, this.evEl, this.domHandler), this.evTarget && Yt(this.target, this.evTarget, this.domHandler), this.evWin && Yt(Ms(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && Ne(this.element, this.evEl, this.domHandler), this.evTarget && Ne(this.target, this.evTarget, this.domHandler), this.evWin && Ne(Ms(this.element), this.evWin, this.domHandler);
      }
    };
    function Zr(a) {
      var c, u = a.options.inputClass;
      return u ? c = u : Gr ? c = Ci : Yr ? c = Ve : Ps ? c = Mi : c = Fe, new c(a, Kr);
    }
    function Kr(a, c, u) {
      var g = u.pointers.length, p = u.changedPointers.length, S = c & X && g - p === 0, M = c & (N | K) && g - p === 0;
      u.isFirst = !!S, u.isFinal = !!M, S && (a.session = {}), u.eventType = c, Qr(a, u), a.emit("hammer.input", u), a.recognize(u), a.session.prevInput = u;
    }
    function Qr(a, c) {
      var u = a.session, g = c.pointers, p = g.length;
      u.firstInput || (u.firstInput = Is(c)), p > 1 && !u.firstMultiple ? u.firstMultiple = Is(c) : p === 1 && (u.firstMultiple = !1);
      var S = u.firstInput, M = u.firstMultiple, U = M ? M.center : S.center, W = c.center = Os(g);
      c.timeStamp = m(), c.deltaTime = c.timeStamp - S.timeStamp, c.angle = bi(U, W), c.distance = We(U, W), Jr(u, c), c.offsetDirection = ks(c.deltaX, c.deltaY);
      var j = Rs(c.deltaTime, c.deltaX, c.deltaY);
      c.overallVelocityX = j.x, c.overallVelocityY = j.y, c.overallVelocity = f(j.x) > f(j.y) ? j.x : j.y, c.scale = M ? io(M.pointers, g) : 1, c.rotation = M ? eo(M.pointers, g) : 0, c.maxPointers = u.prevInput ? c.pointers.length > u.prevInput.maxPointers ? c.pointers.length : u.prevInput.maxPointers : c.pointers.length, to(u, c);
      var xt = a.element;
      bs(c.srcEvent.target, xt) && (xt = c.srcEvent.target), c.target = xt;
    }
    function Jr(a, c) {
      var u = c.center, g = a.offsetDelta || {}, p = a.prevDelta || {}, S = a.prevInput || {};
      (c.eventType === X || S.eventType === N) && (p = a.prevDelta = {
        x: S.deltaX || 0,
        y: S.deltaY || 0
      }, g = a.offsetDelta = {
        x: u.x,
        y: u.y
      }), c.deltaX = p.x + (u.x - g.x), c.deltaY = p.y + (u.y - g.y);
    }
    function to(a, c) {
      var u = a.lastInterval || c, g = c.timeStamp - u.timeStamp, p, S, M, U;
      if (c.eventType != K && (g > jr || u.velocity === s)) {
        var W = c.deltaX - u.deltaX, j = c.deltaY - u.deltaY, xt = Rs(g, W, j);
        S = xt.x, M = xt.y, p = f(xt.x) > f(xt.y) ? xt.x : xt.y, U = ks(W, j), a.lastInterval = c;
      } else
        p = u.velocity, S = u.velocityX, M = u.velocityY, U = u.direction;
      c.velocity = p, c.velocityX = S, c.velocityY = M, c.direction = U;
    }
    function Is(a) {
      for (var c = [], u = 0; u < a.pointers.length; )
        c[u] = {
          clientX: l(a.pointers[u].clientX),
          clientY: l(a.pointers[u].clientY)
        }, u++;
      return {
        timeStamp: m(),
        pointers: c,
        center: Os(c),
        deltaX: a.deltaX,
        deltaY: a.deltaY
      };
    }
    function Os(a) {
      var c = a.length;
      if (c === 1)
        return {
          x: l(a[0].clientX),
          y: l(a[0].clientY)
        };
      for (var u = 0, g = 0, p = 0; p < c; )
        u += a[p].clientX, g += a[p].clientY, p++;
      return {
        x: l(u / c),
        y: l(g / c)
      };
    }
    function Rs(a, c, u) {
      return {
        x: c / a || 0,
        y: u / a || 0
      };
    }
    function ks(a, c) {
      return a === c ? Ue : f(a) >= f(c) ? a < 0 ? de : ue : c < 0 ? fe : ge;
    }
    function We(a, c, u) {
      u || (u = As);
      var g = c[u[0]] - a[u[0]], p = c[u[1]] - a[u[1]];
      return Math.sqrt(g * g + p * p);
    }
    function bi(a, c, u) {
      u || (u = As);
      var g = c[u[0]] - a[u[0]], p = c[u[1]] - a[u[1]];
      return Math.atan2(p, g) * 180 / Math.PI;
    }
    function eo(a, c) {
      return bi(c[1], c[0], ze) + bi(a[1], a[0], ze);
    }
    function io(a, c) {
      return We(c[0], c[1], ze) / We(a[0], a[1], ze);
    }
    var so = {
      mousedown: X,
      mousemove: Bt,
      mouseup: N
    }, no = "mousedown", ro = "mousemove mouseup";
    function Fe() {
      this.evEl = no, this.evWin = ro, this.pressed = !1, ot.apply(this, arguments);
    }
    R(Fe, ot, {
      handler: function(c) {
        var u = so[c.type];
        u & X && c.button === 0 && (this.pressed = !0), u & Bt && c.which !== 1 && (u = N), this.pressed && (u & N && (this.pressed = !1), this.callback(this.manager, u, {
          pointers: [c],
          changedPointers: [c],
          pointerType: Si,
          srcEvent: c
        }));
      }
    });
    var oo = {
      pointerdown: X,
      pointermove: Bt,
      pointerup: N,
      pointercancel: K,
      pointerout: K
    }, ao = {
      2: ce,
      3: qr,
      4: Si,
      5: Xr
    }, Ds = "pointerdown", _s = "pointermove pointerup pointercancel";
    t.MSPointerEvent && !t.PointerEvent && (Ds = "MSPointerDown", _s = "MSPointerMove MSPointerUp MSPointerCancel");
    function Ci() {
      this.evEl = Ds, this.evWin = _s, ot.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    R(Ci, ot, {
      handler: function(c) {
        var u = this.store, g = !1, p = c.type.toLowerCase().replace("ms", ""), S = oo[p], M = ao[c.pointerType] || c.pointerType, U = M == ce, W = qt(u, c.pointerId, "pointerId");
        S & X && (c.button === 0 || U) ? W < 0 && (u.push(c), W = u.length - 1) : S & (N | K) && (g = !0), !(W < 0) && (u[W] = c, this.callback(this.manager, S, {
          pointers: u,
          changedPointers: [c],
          pointerType: M,
          srcEvent: c
        }), g && u.splice(W, 1));
      }
    });
    var ho = {
      touchstart: X,
      touchmove: Bt,
      touchend: N,
      touchcancel: K
    }, lo = "touchstart", co = "touchstart touchmove touchend touchcancel";
    function Ns() {
      this.evTarget = lo, this.evWin = co, this.started = !1, ot.apply(this, arguments);
    }
    R(Ns, ot, {
      handler: function(c) {
        var u = ho[c.type];
        if (u === X && (this.started = !0), !!this.started) {
          var g = uo.call(this, c, u);
          u & (N | K) && g[0].length - g[1].length === 0 && (this.started = !1), this.callback(this.manager, u, {
            pointers: g[0],
            changedPointers: g[1],
            pointerType: ce,
            srcEvent: c
          });
        }
      }
    });
    function uo(a, c) {
      var u = He(a.touches), g = He(a.changedTouches);
      return c & (N | K) && (u = Cs(u.concat(g), "identifier", !0)), [u, g];
    }
    var fo = {
      touchstart: X,
      touchmove: Bt,
      touchend: N,
      touchcancel: K
    }, go = "touchstart touchmove touchend touchcancel";
    function Ve() {
      this.evTarget = go, this.targetIds = {}, ot.apply(this, arguments);
    }
    R(Ve, ot, {
      handler: function(c) {
        var u = fo[c.type], g = mo.call(this, c, u);
        g && this.callback(this.manager, u, {
          pointers: g[0],
          changedPointers: g[1],
          pointerType: ce,
          srcEvent: c
        });
      }
    });
    function mo(a, c) {
      var u = He(a.touches), g = this.targetIds;
      if (c & (X | Bt) && u.length === 1)
        return g[u[0].identifier] = !0, [u, u];
      var p, S, M = He(a.changedTouches), U = [], W = this.target;
      if (S = u.filter(function(j) {
        return bs(j.target, W);
      }), c === X)
        for (p = 0; p < S.length; )
          g[S[p].identifier] = !0, p++;
      for (p = 0; p < M.length; )
        g[M[p].identifier] && U.push(M[p]), c & (N | K) && delete g[M[p].identifier], p++;
      if (U.length)
        return [
          Cs(S.concat(U), "identifier", !0),
          U
        ];
    }
    var po = 2500, $s = 25;
    function Mi() {
      ot.apply(this, arguments);
      var a = Gt(this.handler, this);
      this.touch = new Ve(this.manager, a), this.mouse = new Fe(this.manager, a), this.primaryTouch = null, this.lastTouches = [];
    }
    R(Mi, ot, {
      handler: function(c, u, g) {
        var p = g.pointerType == ce, S = g.pointerType == Si;
        if (!(S && g.sourceCapabilities && g.sourceCapabilities.firesTouchEvents)) {
          if (p)
            vo.call(this, u, g);
          else if (S && yo.call(this, g))
            return;
          this.callback(c, u, g);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function vo(a, c) {
      a & X ? (this.primaryTouch = c.changedPointers[0].identifier, Hs.call(this, c)) : a & (N | K) && Hs.call(this, c);
    }
    function Hs(a) {
      var c = a.changedPointers[0];
      if (c.identifier === this.primaryTouch) {
        var u = { x: c.clientX, y: c.clientY };
        this.lastTouches.push(u);
        var g = this.lastTouches, p = function() {
          var S = g.indexOf(u);
          S > -1 && g.splice(S, 1);
        };
        setTimeout(p, po);
      }
    }
    function yo(a) {
      for (var c = a.srcEvent.clientX, u = a.srcEvent.clientY, g = 0; g < this.lastTouches.length; g++) {
        var p = this.lastTouches[g], S = Math.abs(c - p.x), M = Math.abs(u - p.y);
        if (S <= $s && M <= $s)
          return !0;
      }
      return !1;
    }
    var Bs = Be(o.style, "touchAction"), Us = Bs !== s, zs = "compute", Ws = "auto", Pi = "manipulation", zt = "none", me = "pan-x", pe = "pan-y", Ge = xo();
    function Li(a, c) {
      this.manager = a, this.set(c);
    }
    Li.prototype = {
      set: function(a) {
        a == zs && (a = this.compute()), Us && this.manager.element.style && Ge[a] && (this.manager.element.style[Bs] = a), this.actions = a.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var a = [];
        return P(this.manager.recognizers, function(c) {
          le(c.options.enable, [c]) && (a = a.concat(c.getTouchAction()));
        }), wo(a.join(" "));
      },
      preventDefaults: function(a) {
        var c = a.srcEvent, u = a.offsetDirection;
        if (this.manager.session.prevented) {
          c.preventDefault();
          return;
        }
        var g = this.actions, p = Ht(g, zt) && !Ge[zt], S = Ht(g, pe) && !Ge[pe], M = Ht(g, me) && !Ge[me];
        if (p) {
          var U = a.pointers.length === 1, W = a.distance < 2, j = a.deltaTime < 250;
          if (U && W && j)
            return;
        }
        if (!(M && S) && (p || S && u & yt || M && u & Ut))
          return this.preventSrc(c);
      },
      preventSrc: function(a) {
        this.manager.session.prevented = !0, a.preventDefault();
      }
    };
    function wo(a) {
      if (Ht(a, zt))
        return zt;
      var c = Ht(a, me), u = Ht(a, pe);
      return c && u ? zt : c || u ? c ? me : pe : Ht(a, Pi) ? Pi : Ws;
    }
    function xo() {
      if (!Us)
        return !1;
      var a = {}, c = t.CSS && t.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(u) {
        a[u] = c ? t.CSS.supports("touch-action", u) : !0;
      }), a;
    }
    var Ye = 1, at = 2, Xt = 4, At = 8, Mt = At, ve = 16, wt = 32;
    function Pt(a) {
      this.options = B({}, this.defaults, a || {}), this.id = Fr(), this.manager = null, this.options.enable = _e(this.options.enable, !0), this.state = Ye, this.simultaneous = {}, this.requireFail = [];
    }
    Pt.prototype = {
      defaults: {},
      set: function(a) {
        return B(this.options, a), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(a) {
        if (b(a, "recognizeWith", this))
          return this;
        var c = this.simultaneous;
        return a = qe(a, this), c[a.id] || (c[a.id] = a, a.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(a) {
        return b(a, "dropRecognizeWith", this) ? this : (a = qe(a, this), delete this.simultaneous[a.id], this);
      },
      requireFailure: function(a) {
        if (b(a, "requireFailure", this))
          return this;
        var c = this.requireFail;
        return a = qe(a, this), qt(c, a) === -1 && (c.push(a), a.requireFailure(this)), this;
      },
      dropRequireFailure: function(a) {
        if (b(a, "dropRequireFailure", this))
          return this;
        a = qe(a, this);
        var c = qt(this.requireFail, a);
        return c > -1 && this.requireFail.splice(c, 1), this;
      },
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function(a) {
        return !!this.simultaneous[a.id];
      },
      emit: function(a) {
        var c = this, u = this.state;
        function g(p) {
          c.manager.emit(p, a);
        }
        u < At && g(c.options.event + Fs(u)), g(c.options.event), a.additionalEvent && g(a.additionalEvent), u >= At && g(c.options.event + Fs(u));
      },
      tryEmit: function(a) {
        if (this.canEmit())
          return this.emit(a);
        this.state = wt;
      },
      canEmit: function() {
        for (var a = 0; a < this.requireFail.length; ) {
          if (!(this.requireFail[a].state & (wt | Ye)))
            return !1;
          a++;
        }
        return !0;
      },
      recognize: function(a) {
        var c = B({}, a);
        if (!le(this.options.enable, [this, c])) {
          this.reset(), this.state = wt;
          return;
        }
        this.state & (Mt | ve | wt) && (this.state = Ye), this.state = this.process(c), this.state & (at | Xt | At | ve) && this.tryEmit(c);
      },
      process: function(a) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function Fs(a) {
      return a & ve ? "cancel" : a & At ? "end" : a & Xt ? "move" : a & at ? "start" : "";
    }
    function Vs(a) {
      return a == ge ? "down" : a == fe ? "up" : a == de ? "left" : a == ue ? "right" : "";
    }
    function qe(a, c) {
      var u = c.manager;
      return u ? u.get(a) : a;
    }
    function ut() {
      Pt.apply(this, arguments);
    }
    R(ut, Pt, {
      defaults: {
        pointers: 1
      },
      attrTest: function(a) {
        var c = this.options.pointers;
        return c === 0 || a.pointers.length === c;
      },
      process: function(a) {
        var c = this.state, u = a.eventType, g = c & (at | Xt), p = this.attrTest(a);
        return g && (u & K || !p) ? c | ve : g || p ? u & N ? c | At : c & at ? c | Xt : at : wt;
      }
    });
    function Xe() {
      ut.apply(this, arguments), this.pX = null, this.pY = null;
    }
    R(Xe, ut, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: Ls
      },
      getTouchAction: function() {
        var a = this.options.direction, c = [];
        return a & yt && c.push(pe), a & Ut && c.push(me), c;
      },
      directionTest: function(a) {
        var c = this.options, u = !0, g = a.distance, p = a.direction, S = a.deltaX, M = a.deltaY;
        return p & c.direction || (c.direction & yt ? (p = S === 0 ? Ue : S < 0 ? de : ue, u = S != this.pX, g = Math.abs(a.deltaX)) : (p = M === 0 ? Ue : M < 0 ? fe : ge, u = M != this.pY, g = Math.abs(a.deltaY))), a.direction = p, u && g > c.threshold && p & c.direction;
      },
      attrTest: function(a) {
        return ut.prototype.attrTest.call(this, a) && (this.state & at || !(this.state & at) && this.directionTest(a));
      },
      emit: function(a) {
        this.pX = a.deltaX, this.pY = a.deltaY;
        var c = Vs(a.direction);
        c && (a.additionalEvent = this.options.event + c), this._super.emit.call(this, a);
      }
    });
    function Ai() {
      ut.apply(this, arguments);
    }
    R(Ai, ut, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [zt];
      },
      attrTest: function(a) {
        return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & at);
      },
      emit: function(a) {
        if (a.scale !== 1) {
          var c = a.scale < 1 ? "in" : "out";
          a.additionalEvent = this.options.event + c;
        }
        this._super.emit.call(this, a);
      }
    });
    function Ii() {
      Pt.apply(this, arguments), this._timer = null, this._input = null;
    }
    R(Ii, Pt, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [Ws];
      },
      process: function(a) {
        var c = this.options, u = a.pointers.length === c.pointers, g = a.distance < c.threshold, p = a.deltaTime > c.time;
        if (this._input = a, !g || !u || a.eventType & (N | K) && !p)
          this.reset();
        else if (a.eventType & X)
          this.reset(), this._timer = T(function() {
            this.state = Mt, this.tryEmit();
          }, c.time, this);
        else if (a.eventType & N)
          return Mt;
        return wt;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(a) {
        this.state === Mt && (a && a.eventType & N ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = m(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Oi() {
      ut.apply(this, arguments);
    }
    R(Oi, ut, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [zt];
      },
      attrTest: function(a) {
        return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & at);
      }
    });
    function Ri() {
      ut.apply(this, arguments);
    }
    R(Ri, ut, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: yt | Ut,
        pointers: 1
      },
      getTouchAction: function() {
        return Xe.prototype.getTouchAction.call(this);
      },
      attrTest: function(a) {
        var c = this.options.direction, u;
        return c & (yt | Ut) ? u = a.overallVelocity : c & yt ? u = a.overallVelocityX : c & Ut && (u = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && f(u) > this.options.velocity && a.eventType & N;
      },
      emit: function(a) {
        var c = Vs(a.offsetDirection);
        c && this.manager.emit(this.options.event + c, a), this.manager.emit(this.options.event, a);
      }
    });
    function je() {
      Pt.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    R(je, Pt, {
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
        return [Pi];
      },
      process: function(a) {
        var c = this.options, u = a.pointers.length === c.pointers, g = a.distance < c.threshold, p = a.deltaTime < c.time;
        if (this.reset(), a.eventType & X && this.count === 0)
          return this.failTimeout();
        if (g && p && u) {
          if (a.eventType != N)
            return this.failTimeout();
          var S = this.pTime ? a.timeStamp - this.pTime < c.interval : !0, M = !this.pCenter || We(this.pCenter, a.center) < c.posThreshold;
          this.pTime = a.timeStamp, this.pCenter = a.center, !M || !S ? this.count = 1 : this.count += 1, this._input = a;
          var U = this.count % c.taps;
          if (U === 0)
            return this.hasRequireFailures() ? (this._timer = T(function() {
              this.state = Mt, this.tryEmit();
            }, c.interval, this), at) : Mt;
        }
        return wt;
      },
      failTimeout: function() {
        return this._timer = T(function() {
          this.state = wt;
        }, this.options.interval, this), wt;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == Mt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function Lt(a, c) {
      return c = c || {}, c.recognizers = _e(c.recognizers, Lt.defaults.preset), new ki(a, c);
    }
    Lt.VERSION = "2.0.7", Lt.defaults = {
      domEvents: !1,
      touchAction: zs,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Oi, { enable: !1 }],
        [Ai, { enable: !1 }, ["rotate"]],
        [Ri, { direction: yt }],
        [Xe, { direction: yt }, ["swipe"]],
        [je],
        [je, { event: "doubletap", taps: 2 }, ["tap"]],
        [Ii]
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
    var To = 1, Gs = 2;
    function ki(a, c) {
      this.options = B({}, Lt.defaults, c || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = Zr(this), this.touchAction = new Li(this, this.options.touchAction), Ys(this, !0), P(this.options.recognizers, function(u) {
        var g = this.add(new u[0](u[1]));
        u[2] && g.recognizeWith(u[2]), u[3] && g.requireFailure(u[3]);
      }, this);
    }
    ki.prototype = {
      set: function(a) {
        return B(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
      },
      stop: function(a) {
        this.session.stopped = a ? Gs : To;
      },
      recognize: function(a) {
        var c = this.session;
        if (!c.stopped) {
          this.touchAction.preventDefaults(a);
          var u, g = this.recognizers, p = c.curRecognizer;
          (!p || p && p.state & Mt) && (p = c.curRecognizer = null);
          for (var S = 0; S < g.length; )
            u = g[S], c.stopped !== Gs && (!p || u == p || u.canRecognizeWith(p)) ? u.recognize(a) : u.reset(), !p && u.state & (at | Xt | At) && (p = c.curRecognizer = u), S++;
        }
      },
      get: function(a) {
        if (a instanceof Pt)
          return a;
        for (var c = this.recognizers, u = 0; u < c.length; u++)
          if (c[u].options.event == a)
            return c[u];
        return null;
      },
      add: function(a) {
        if (b(a, "add", this))
          return this;
        var c = this.get(a.options.event);
        return c && this.remove(c), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
      },
      remove: function(a) {
        if (b(a, "remove", this))
          return this;
        if (a = this.get(a), a) {
          var c = this.recognizers, u = qt(c, a);
          u !== -1 && (c.splice(u, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(a, c) {
        if (a !== s && c !== s) {
          var u = this.handlers;
          return P($e(a), function(g) {
            u[g] = u[g] || [], u[g].push(c);
          }), this;
        }
      },
      off: function(a, c) {
        if (a !== s) {
          var u = this.handlers;
          return P($e(a), function(g) {
            c ? u[g] && u[g].splice(qt(u[g], c), 1) : delete u[g];
          }), this;
        }
      },
      emit: function(a, c) {
        this.options.domEvents && Eo(a, c);
        var u = this.handlers[a] && this.handlers[a].slice();
        if (!(!u || !u.length)) {
          c.type = a, c.preventDefault = function() {
            c.srcEvent.preventDefault();
          };
          for (var g = 0; g < u.length; )
            u[g](c), g++;
        }
      },
      destroy: function() {
        this.element && Ys(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function Ys(a, c) {
      var u = a.element;
      if (u.style) {
        var g;
        P(a.options.cssProps, function(p, S) {
          g = Be(u.style, S), c ? (a.oldCssProps[g] = u.style[g], u.style[g] = p) : u.style[g] = a.oldCssProps[g] || "";
        }), c || (a.oldCssProps = {});
      }
    }
    function Eo(a, c) {
      var u = e.createEvent("Event");
      u.initEvent(a, !0, !0), u.gesture = c, c.target.dispatchEvent(u);
    }
    B(Lt, {
      INPUT_START: X,
      INPUT_MOVE: Bt,
      INPUT_END: N,
      INPUT_CANCEL: K,
      STATE_POSSIBLE: Ye,
      STATE_BEGAN: at,
      STATE_CHANGED: Xt,
      STATE_ENDED: At,
      STATE_RECOGNIZED: Mt,
      STATE_CANCELLED: ve,
      STATE_FAILED: wt,
      DIRECTION_NONE: Ue,
      DIRECTION_LEFT: de,
      DIRECTION_RIGHT: ue,
      DIRECTION_UP: fe,
      DIRECTION_DOWN: ge,
      DIRECTION_HORIZONTAL: yt,
      DIRECTION_VERTICAL: Ut,
      DIRECTION_ALL: Ls,
      Manager: ki,
      Input: ot,
      TouchAction: Li,
      TouchInput: Ve,
      MouseInput: Fe,
      PointerEventInput: Ci,
      TouchMouseInput: Mi,
      SingleTouchInput: Ns,
      Recognizer: Pt,
      AttrRecognizer: ut,
      Tap: je,
      Pan: Xe,
      Swipe: Ri,
      Pinch: Ai,
      Rotate: Oi,
      Press: Ii,
      on: Yt,
      off: Ne,
      each: P,
      merge: D,
      extend: rt,
      assign: B,
      inherit: R,
      bindFn: Gt,
      prefixed: Be
    });
    var So = typeof t < "u" ? t : typeof self < "u" ? self : {};
    So.Hammer = Lt, typeof s == "function" && s.amd ? s(function() {
      return Lt;
    }) : n.exports ? n.exports = Lt : t[i] = Lt;
  })(window, document, "Hammer");
})(nr);
var ke = nr.exports;
const Ua = Ba(ke), Tt = /* @__PURE__ */ bo({
  __proto__: null,
  default: Ua
}, [ke]), rr = 1, or = 2, Qi = 4, za = {
  mousedown: rr,
  mousemove: or,
  mouseup: Qi
};
function Wa(n, t) {
  for (let e = 0; e < n.length; e++)
    if (t(n[e]))
      return !0;
  return !1;
}
function Fa(n) {
  const t = n.prototype.handler;
  n.prototype.handler = function(i) {
    const s = this.store;
    i.button > 0 && i.type === "pointerdown" && (Wa(s, (r) => r.pointerId === i.pointerId) || s.push(i)), t.call(this, i);
  };
}
function Va(n) {
  n.prototype.handler = function(e) {
    let i = za[e.type];
    i & rr && e.button >= 0 && (this.pressed = !0), i & or && e.which === 0 && (i = Qi), this.pressed && (i & Qi && (this.pressed = !1), this.callback(this.manager, i, {
      pointers: [e],
      changedPointers: [e],
      pointerType: "mouse",
      srcEvent: e
    }));
  };
}
Fa(ke.PointerEventInput);
Va(ke.MouseInput);
const Ga = ke.Manager;
let xi = class {
  constructor(t, e, i) {
    this.element = t, this.callback = e, this.options = { enable: !0, ...i };
  }
};
const Ya = Tt ? [
  [Tt.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [Tt.Rotate, { enable: !1 }],
  [Tt.Pinch, { enable: !1 }],
  [Tt.Swipe, { enable: !1 }],
  [Tt.Pan, { threshold: 0, enable: !1 }],
  [Tt.Press, { enable: !1 }],
  [Tt.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [Tt.Tap, { event: "anytap", enable: !1 }],
  [Tt.Tap, { enable: !1 }]
] : null, cn = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
}, qa = {
  doubletap: ["tap"]
}, Xa = {
  pointerdown: "pointerdown",
  pointermove: "pointermove",
  pointerup: "pointerup",
  touchstart: "pointerdown",
  touchmove: "pointermove",
  touchend: "pointerup",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup"
}, ps = {
  KEY_EVENTS: ["keydown", "keyup"],
  MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
  WHEEL_EVENTS: [
    "wheel",
    "mousewheel"
  ]
}, ja = {
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
}, dn = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
}, Za = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", Kt = typeof window < "u" ? window : global;
let Ji = !1;
try {
  const n = {
    get passive() {
      return Ji = !0, !0;
    }
  };
  Kt.addEventListener("test", null, n), Kt.removeEventListener("test", null);
} catch {
  Ji = !1;
}
const Ka = Za.indexOf("firefox") !== -1, { WHEEL_EVENTS: Qa } = ps, un = "wheel", fn = 4.000244140625, Ja = 40, th = 0.25;
class eh extends xi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (s) => {
      if (!this.options.enable)
        return;
      let r = s.deltaY;
      Kt.WheelEvent && (Ka && s.deltaMode === Kt.WheelEvent.DOM_DELTA_PIXEL && (r /= Kt.devicePixelRatio), s.deltaMode === Kt.WheelEvent.DOM_DELTA_LINE && (r *= Ja)), r !== 0 && r % fn === 0 && (r = Math.floor(r / fn)), s.shiftKey && r && (r = r * th), this.callback({
        type: un,
        center: {
          x: s.clientX,
          y: s.clientY
        },
        delta: -r,
        srcEvent: s,
        pointerType: "mouse",
        target: s.target
      });
    }, this.events = (this.options.events || []).concat(Qa), this.events.forEach((s) => t.addEventListener(s, this.handleEvent, Ji ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((t) => this.element.removeEventListener(t, this.handleEvent));
  }
  enableEventType(t, e) {
    t === un && (this.options.enable = e);
  }
}
const { MOUSE_EVENTS: ih } = ps, gn = "pointermove", mn = "pointerover", pn = "pointerout", vn = "pointerenter", yn = "pointerleave";
class sh extends xi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (r) => {
      this.handleOverEvent(r), this.handleOutEvent(r), this.handleEnterEvent(r), this.handleLeaveEvent(r), this.handleMoveEvent(r);
    }, this.pressed = !1;
    const { enable: s } = this.options;
    this.enableMoveEvent = s, this.enableLeaveEvent = s, this.enableEnterEvent = s, this.enableOutEvent = s, this.enableOverEvent = s, this.events = (this.options.events || []).concat(ih), this.events.forEach((r) => t.addEventListener(r, this.handleEvent));
  }
  destroy() {
    this.events.forEach((t) => this.element.removeEventListener(t, this.handleEvent));
  }
  enableEventType(t, e) {
    t === gn && (this.enableMoveEvent = e), t === mn && (this.enableOverEvent = e), t === pn && (this.enableOutEvent = e), t === vn && (this.enableEnterEvent = e), t === yn && (this.enableLeaveEvent = e);
  }
  handleOverEvent(t) {
    this.enableOverEvent && t.type === "mouseover" && this._emit(mn, t);
  }
  handleOutEvent(t) {
    this.enableOutEvent && t.type === "mouseout" && this._emit(pn, t);
  }
  handleEnterEvent(t) {
    this.enableEnterEvent && t.type === "mouseenter" && this._emit(vn, t);
  }
  handleLeaveEvent(t) {
    this.enableLeaveEvent && t.type === "mouseleave" && this._emit(yn, t);
  }
  handleMoveEvent(t) {
    if (this.enableMoveEvent)
      switch (t.type) {
        case "mousedown":
          t.button >= 0 && (this.pressed = !0);
          break;
        case "mousemove":
          t.which === 0 && (this.pressed = !1), this.pressed || this._emit(gn, t);
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
const { KEY_EVENTS: nh } = ps, wn = "keydown", xn = "keyup";
class rh extends xi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (s) => {
      const r = s.target || s.srcElement;
      r.tagName === "INPUT" && r.type === "text" || r.tagName === "TEXTAREA" || (this.enableDownEvent && s.type === "keydown" && this.callback({
        type: wn,
        srcEvent: s,
        key: s.key,
        target: s.target
      }), this.enableUpEvent && s.type === "keyup" && this.callback({
        type: xn,
        srcEvent: s,
        key: s.key,
        target: s.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(nh), t.tabIndex = this.options.tabIndex || 0, t.style.outline = "none", this.events.forEach((s) => t.addEventListener(s, this.handleEvent));
  }
  destroy() {
    this.events.forEach((t) => this.element.removeEventListener(t, this.handleEvent));
  }
  enableEventType(t, e) {
    t === wn && (this.enableDownEvent = e), t === xn && (this.enableUpEvent = e);
  }
}
const Tn = "contextmenu";
class oh extends xi {
  constructor(t, e, i) {
    super(t, e, i), this.handleEvent = (s) => {
      this.options.enable && this.callback({
        type: Tn,
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
    t === Tn && (this.options.enable = e);
  }
}
const ts = 1, li = 2, es = 4, ah = {
  pointerdown: ts,
  pointermove: li,
  pointerup: es,
  mousedown: ts,
  mousemove: li,
  mouseup: es
}, hh = 1, lh = 2, ch = 3, dh = 0, uh = 1, fh = 2, gh = 1, mh = 2, ph = 4;
function vh(n) {
  const t = ah[n.srcEvent.type];
  if (!t)
    return null;
  const { buttons: e, button: i, which: s } = n.srcEvent;
  let r = !1, o = !1, h = !1;
  return t === es || t === li && !Number.isFinite(e) ? (r = s === hh, o = s === lh, h = s === ch) : t === li ? (r = !!(e & gh), o = !!(e & ph), h = !!(e & mh)) : t === ts && (r = i === dh, o = i === uh, h = i === fh), { leftButton: r, middleButton: o, rightButton: h };
}
function yh(n, t) {
  const e = n.center;
  if (!e)
    return null;
  const i = t.getBoundingClientRect(), s = i.width / t.offsetWidth || 1, r = i.height / t.offsetHeight || 1, o = {
    x: (e.x - i.left - t.clientLeft) / s,
    y: (e.y - i.top - t.clientTop) / r
  };
  return { center: e, offsetCenter: o };
}
const _i = {
  srcElement: "root",
  priority: 0
};
class wh {
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
    let l = _i;
    typeof i == "string" || i && i.addEventListener ? l = { ..._i, srcElement: i } : i && (l = { ..._i, ...i });
    let f = h.get(l.srcElement);
    f || (f = [], h.set(l.srcElement, f));
    const m = {
      type: t,
      handler: e,
      srcElement: l.srcElement,
      priority: l.priority
    };
    s && (m.once = !0), r && (m.passive = !0), o.push(m), this._active = this._active || !m.passive;
    let T = f.length - 1;
    for (; T >= 0 && !(f[T].priority >= m.priority); )
      T--;
    f.splice(T + 1, 0, m);
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
      for (let l = 0; l < i.length; l++) {
        const { type: f, handler: m, once: T } = i[l];
        if (m({
          ...t,
          type: f,
          stopPropagation: r,
          stopImmediatePropagation: o
        }), T && h.push(i[l]), s)
          break;
      }
      for (let l = 0; l < h.length; l++) {
        const { type: f, handler: m } = h[l];
        this.remove(f, m);
      }
    }
  }
  _normalizeEvent(t) {
    const e = this.eventManager.getElement();
    return {
      ...t,
      ...vh(t),
      ...yh(t, e),
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
const xh = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: Ga,
  touchAction: "none",
  tabIndex: 0
};
class Th {
  constructor(t = null, e) {
    this._onBasicInput = (s) => {
      const { srcEvent: r } = s, o = Xa[r.type];
      o && this.manager.emit(o, s);
    }, this._onOtherEvent = (s) => {
      this.manager.emit(s.type, s);
    }, this.options = { ...xh, ...e }, this.events = /* @__PURE__ */ new Map(), this.setElement(t);
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
      recognizers: e.recognizers || Ya
    }).on("hammer.input", this._onBasicInput), e.recognizers || Object.keys(cn).forEach((s) => {
      const r = this.manager.get(s);
      r && cn[s].forEach((o) => {
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
    this.wheelInput = new eh(t, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new sh(t, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new rh(t, this._onOtherEvent, {
      enable: !1,
      tabIndex: e.tabIndex
    }), this.contextmenuInput = new oh(t, this._onOtherEvent, {
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
      const r = qa[t];
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
      for (const m in t)
        this._addEventHandler(m, t[m], i, s, r);
      return;
    }
    const { manager: o, events: h } = this, l = dn[t] || t;
    let f = h.get(l);
    f || (f = new wh(this), h.set(l, f), f.recognizerName = ja[l] || l, o && o.on(l, f.handleEvent)), f.add(t, e, i, s, r), f.isEmpty() || this._toggleRecognizer(f.recognizerName, !0);
  }
  _removeEventHandler(t, e) {
    if (typeof t != "string") {
      for (const o in t)
        this._removeEventHandler(o, t[o]);
      return;
    }
    const { events: i } = this, s = dn[t] || t, r = i.get(s);
    if (r && (r.remove(t, e), r.isEmpty())) {
      const { recognizerName: o } = r;
      let h = !1;
      for (const l of i.values())
        if (l.recognizerName === o && !l.isEmpty()) {
          h = !0;
          break;
        }
      h || this._toggleRecognizer(o, !1);
    }
  }
}
class En {
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
class Sn {
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
class bn {
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
const Eh = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class Ct {
  #t;
  #e;
  #r;
  #n = null;
  #i = null;
  #s = null;
  #o;
  #h;
  #l = !1;
  #a;
  #c;
  #u;
  pad = { left: !1 };
  constructor(t, e) {
    if (this.#t = { ...Eh, ...e }, this.#h = Ha.idle, this.#o = $a, this.#e = t, !this.#e && this.#t.elementId && (this.#e = document.getElementById(this.#t.elementId)), !A.isElement(this.#e))
      throw "Must specify an element to receive user input.";
    this.#t.contextMenu || (window.oncontextmenu = (r) => (r.preventDefault(), !1));
    const s = {
      recognizerOptions: {
        pan: { threshold: this.#o ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#r = new Th(this.#e, s), this.pointerInit();
  }
  get agent() {
    return this.#r;
  }
  get pointer() {
    return this.#n instanceof En ? this.#n : (this.#n = new En(this), this.#n);
  }
  get touch() {
    return this.#s instanceof Sn ? this.#s : (this.#s = new Sn(this), this.#s);
  }
  get key() {
    return this.#i instanceof bn ? this.#i : (this.#i = new bn(this), this.#i);
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
    Z(t) && (this.#a = t);
  }
  set panY(t) {
    Z(y) && (this.#c = y);
  }
  set wheeldelta(t) {
    this.#u = t.delta;
  }
  get wheeldelta() {
    return this.#u;
  }
  destroy() {
    this.#r.destroy(), this.#n = void 0, this.#i = void 0, this.#s = void 0;
  }
  isValid(t, e) {
    return !!(E(t) || _(e));
  }
  validOptions(t) {
    return v(t) && Z(t) ? t : void 0;
  }
  on(t, e, i, s = !1) {
    if (!this.isValid(t, e))
      return !1;
    this.pointer.has(t) ? this.#n.on(t, e, i, s) : this.touch.has(t) ? this.#s.on(t, e, i, s) : this.key.has(t) ? this.#i.on(t, e, i, s) : this.element.addEventListener(t, e, this.validOptions(i));
  }
  off(t, e, i) {
    this.#n?.has(t) ? this.#n.off(t, e, i) : this.#s?.has(t) ? this.#s.off(t, e, i) : this.#i?.has(t) ? this.#i.off(t, e, i) : this.element.removeEventListener(t, e, this.validOptions(i));
  }
  once(t, e, i) {
    this.on(t, e, i, !0);
  }
  setCursor(t) {
    this.#e.style.cursor = t;
  }
  pointerInit() {
    this.clientPosPrev = new Ft([null, null]), this.position = new Ft([0, 0]), this.movement = new Ft([0, 0]), this.dragstart = new Ft([null, null]), this.dragend = new Ft([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
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
class gt {
  #t;
  #e;
  #r;
  #n;
  #i;
  #s;
  #o;
  #h;
  #l;
  #a;
  static dividerList = {};
  static divideCnt = 0;
  static class = rn;
  static name = "Dividers";
  static type = "Divider";
  static create(t, e) {
    const i = `${e.core.id}_divider_${++gt.divideCnt}`;
    return e.id = i, gt.dividerList[i] = new gt(t, e), gt.dividerList[i];
  }
  static destroy() {
    for (let t in gt.dividerList)
      gt.dividerList[t].destroy();
    delete gt.dividerList[id];
  }
  static defaultNode() {
    return `
  <div slot="widget" class="${rn}" style="position: absolute;"></div>
  `;
  }
  constructor(t, e) {
    const i = { ...e };
    this.#i = t, this.#e = i.core, this.#r = i, this.#n = i.core.theme, this.#t = i.id, this.#s = i.chartPane, this.#o = t.elements.elDividers, this.init();
  }
  get el() {
    return this.#h;
  }
  get id() {
    return this.#t;
  }
  get chartPane() {
    return this.#s;
  }
  get config() {
    return this.#e.config;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return A.elementDimPos(this.#h);
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
    return gt.type;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = "row-resize", this.eventsListen();
  }
  destroy() {
    this.#a.destroy(), this.el.remove(), delete gt.dividerList[this.id];
  }
  eventsListen() {
    this.#a = new Ct(this.#h, { disableContextMenu: !1 }), this.#a.on("pointerover", this.onMouseEnter.bind(this)), this.#a.on("pointerout", this.onMouseOut.bind(this)), this.#a.on("pointerdrag", this.onPointerDrag.bind(this)), this.#a.on("pointerdragend", this.onPointerDragEnd.bind(this));
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
    this.#h.style.background = this.#n.divider.active, this.#e.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#h.style.background = this.#n.divider.idle, this.#e.MainPane.onMouseEnter();
  }
  onPointerDrag(t) {
    this.#l = this.#e.MainPane.cursorPos, this.#h.style.background = this.#n.divider.active, this.emit(`${this.id}_pointerdrag`, this.#l), this.emit("divider_pointerdrag", {
      id: this.id,
      e: t,
      pos: this.#l,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(t) {
    "position" in t && (this.#h.style.background = this.#n.divider.idle), this.#l = this.#e.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#l), this.emit("divider_pointerdragend", {
      id: this.id,
      e: t,
      pos: this.#l,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  mount() {
    this.#o.lastElementChild == null ? this.#o.innerHTML = this.dividerNode() : this.#o.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#h = A.findBySelector(`#${this.#t}`, this.#o);
  }
  dividerNode() {
    let t = this.#s.pos.top - A.elementDimPos(this.#o).top, e = this.#e.MainPane.rowsW + this.#e.scaleW, i = x(this.config.dividerHeight) ? this.config.dividerHeight : ga, s = this.#e.theme.tools.width;
    switch (t -= i / 2, this.#e.theme.tools.location) {
      case "left":
        break;
      case !1:
      case "none":
      case "right":
        s *= -1;
        break;
    }
    const r = `position: absolute; top: ${t}px; left: ${s}px; z-index:100; width: ${e}px; height: ${i}px; background: ${this.#n.divider.idle};`;
    return `
      <div id="${this.#t}" class="divider" style="${r}"></div>
    `;
  }
  setPos() {
    let t = this.#s.pos.top - A.elementDimPos(this.#o).top;
    t = t - this.height / 2, this.#h.style.top = `${t}px`;
  }
  hide() {
    this.#h.style.display = "none";
  }
  show() {
    this.#h.style.display = "block";
  }
}
const Sh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', bh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', Ch = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', ar = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', Mh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', Ph = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', Lh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', Je = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', Ah = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', Ih = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', Oh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', Rh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', kh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Dh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', _h = '<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>', Nh = '<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>', $h = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Hh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', Bh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', Uh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', zh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Wh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>', Fh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>', Vh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>', Gh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>', Yh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>', qh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>', Xh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>', jh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>', Zh = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>', Kh = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>', Vt = 300, ci = 400, Qh = `${ci}px`, hr = `${Vt}px`, Jh = "100%", tl = "100%", _t = 30, kt = 35, di = 25, lr = 25, ui = di + lr, ne = 60, Jt = "normal", te = 12, Ni = "normal", ee = "Avenir, Helvetica, Arial, sans-serif", vs = "#141414", ys = "#666666", ws = "#cccccc", Ae = "#888888", re = "#cccccc", cr = "25px", el = "position: relative;", z = {
  COLOUR_BG: vs,
  COLOUR_BORDER: ys,
  COLOUR_TXT: ws,
  COLOUR_ICON: Ae,
  COLOUR_ICONHOVER: re,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: Jt,
  FONTSIZE: te,
  FONTSTYLE: Ni,
  FONTFAMILY: ee,
  FONT: `${Ni} ${te}px ${Jt} ${ee}`,
  FONTSTRING: `font-style: ${Ni}; font-size: ${te}px; font-weight: ${Jt}; font-family: ${ee};`
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
  COLOUR_ICON: Ae,
  COLOUR_ICONHOVER: re,
  ICONSIZE: cr
}, ie = {
  COLOUR_ICON: Ae,
  COLOUR_ICONHOVER: re,
  ICONSIZE: cr
}, $i = {
  COLOUR_BG: vs,
  COLOUR_BORDER: ys,
  COLOUR_TXT: ws
}, Hi = {
  COLOUR_BG: vs,
  COLOUR_BORDER: ys,
  COLOUR_TXT: ws
}, il = {
  FILL: re + "88"
}, Y = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, ti = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, ri = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, Cn = Jt, oi = te, ai = ee, vt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: ai,
  FONTSIZE: oi,
  FONTWEIGHT: Cn,
  FONT_LABEL: `${Cn} ${oi}px ${ai}`,
  FONT_LABEL_BOLD: `bold ${oi}px ${ai}`
}, Mn = Jt, Pn = te, Ln = ee, Wt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: Ln,
  FONTSIZE: Pn,
  FONTWEIGHT: Mn,
  FONT_LABEL: `${Mn} ${Pn}px ${Ln}`,
  FONT_LABEL_BOLD: `bold ${oi}px ${ai}`
}, dr = {
  COLOUR_GRID: "#333"
}, sl = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, Bi = {
  text: z.FONTSTRING,
  font: z.FONT,
  colour: z.COLOUR_TXT
}, An = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00"
}, nl = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: z.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}, Ui = { arrowDown: Wh, arrowUp: Fh, arrowDownRound: Vh, arrowUpRound: Gh, arrowDownRoundSolid: Yh, arrowUpRoundSolid: qh, buySolid: Xh, sellSolid: jh }, rl = {
  candle: {
    Type: Y.CANDLE_SOLID,
    UpBodyColour: ti.COLOUR_CANDLE_UP,
    UpWickColour: ti.COLOUR_WICK_UP,
    DnBodyColour: ti.COLOUR_CANDLE_DN,
    DnWickColour: ti.COLOUR_WICK_DN
  },
  volume: {
    Height: ri.ONCHART_VOLUME_HEIGHT,
    UpColour: ri.COLOUR_VOLUME_UP,
    DnColour: ri.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: Wt.COLOUR_TICK,
    colourLabel: Wt.COLOUR_LABEL,
    colourCursor: Wt.COLOUR_CURSOR,
    colourCursorBG: Wt.COLOUR_CURSOR_BG,
    fontFamily: Wt.FONTFAMILY,
    fontSize: Wt.FONTSIZE,
    fontWeight: Wt.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: Ae,
    iconHover: re
  },
  yAxis: {
    colourTick: vt.COLOUR_TICK,
    colourLabel: vt.COLOUR_LABEL,
    colourCursor: vt.COLOUR_CURSOR,
    colourCursorBG: vt.COLOUR_CURSOR_BG,
    fontFamily: vt.FONTFAMILY,
    fontSize: vt.FONTSIZE,
    fontWeight: vt.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: z.COLOUR_BG,
    BorderColour: z.COLOUR_BORDER,
    BorderThickness: z.BORDER_THICKNESS,
    TextColour: z.COLOUR_TXT,
    GridColour: dr.COLOUR_GRID
  },
  primaryPane: {
    separator: "#666"
  },
  secondaryPane: {
    separator: "#666"
  },
  time: {
    navigation: !1,
    font: Bi.font,
    colour: "#96a9db",
    handleColour: "#586ea6"
  },
  legend: {
    font: Bi.font,
    colour: Bi.colour,
    controls: !0,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: Ae,
    hover: re
  },
  divider: {
    active: An.ACTIVE,
    idle: An.IDLE
  },
  watermark: nl,
  trades: {
    iconBuy: Ui.arrowUp,
    iconSell: Ui.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    buyColour: "#0f0",
    sellColour: "#f00",
    defaultIcons: Ui,
    offset: 10
  }
}, ol = `
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
</style>`, al = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${Qh});
    min-height: var(--txc-min-height, ${hr});
    max-width: var(--txc-max-width, ${Jh});
    max-height: var(--txc-max-height, ${tl});
    overflow: hidden;
    background: var(--txc-background, ${z.COLOUR_BG});
    font: var(--txc-font, ${z.FONT});
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
`, In = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class pt {
  static #t = new dt();
  static get list() {
    return pt.#t;
  }
  #e;
  static create(t, e) {
    if (!v(t))
      return !1;
    t.id = E(t.name) ? tt(t.name) : `${e.id}.theme`;
    const i = new pt(t, e);
    return pt.list.set(t.id, i), i;
  }
  constructor(t, e) {
    this.#e = e, this.setCurrent(t);
  }
  get list() {
    return pt.list;
  }
  setCurrent(t = {}) {
    t = v(t) ? t : {};
    const e = st(rl), i = st(t), s = Me(e, i);
    for (let r in s)
      In.includes(r) || (this[r] = s[r]);
    this.#e.refresh();
  }
  setTheme(t) {
    if (E(t) && pt.list.has(t)) {
      const e = pt.list.get(t);
      return this.setCurrent(e), !0;
    }
    return !1;
  }
  setProperty(t, e) {
    if (!E(t))
      return;
    const i = qs(this, t), s = t.split(".");
    if (s.length == 1)
      this[s[0]] = e;
    else {
      let r = s.shift();
      this[r] = tr(this[r], s.join("."), e);
    }
    return this.#e.refresh(), i;
  }
  getProperty(t) {
    return qs(this, t);
  }
  deleteTheme(t) {
    return E(t) && pt.list.has(t) ? (pt.list.delete(t), !0) : !1;
  }
  exportTheme(t = {}) {
    v || (t = {});
    const e = t?.type, i = {};
    let s;
    for (let r in this)
      In.includes(r) || (i[r] = this[r]);
    switch (e) {
      case "json":
      default:
        const { replacer: r, space: o } = { ...t };
        s = JSON.stringify(i, r, o);
    }
    return s;
  }
}
class hl {
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
class ll {
  #t;
  #e;
  #r;
  #n = 0;
  #i = {};
  #s;
  constructor(t, e, i, s) {
    this.#t = t, this.#e = i, this.#r = s;
    const r = `
      ${ur.ThreadWorker.toString()};
      const fn = ${e}
      const worker = new ThreadWorker(fn)
    `, o = new Blob([`;(() => {${r}})()`], { type: "text/javascript" }), h = URL.createObjectURL(o);
    this.#s = new Worker(h), URL.revokeObjectURL(h);
  }
  get id() {
    return this.#t;
  }
  get req() {
    return `r_${this.#n}`;
  }
  onmessage(t) {
    return _(this.#e) ? this.#e(t) : t;
  }
  onerror(t) {
    return _(this.#r) ? this.#r(t) : t;
  }
  postMessage(t) {
    return new Promise((e, i) => {
      try {
        let s = this.req;
        this.#i[s] = { resolve: e, reject: i }, this.#s.postMessage({ r: s, data: t }), this.#s.onmessage = (r) => {
          const { r: o, result: h } = r.data;
          if (o in this.#i) {
            const { resolve: l, reject: f } = this.#i[o];
            delete this.#i[o], l(this.onmessage(h));
          }
        }, this.#s.onerror = (r) => {
          i(this.onerror(r));
        };
      } catch (s) {
        i(s);
      }
    });
  }
  terminate() {
    this.#s.terminate();
  }
}
let ur = class Ot {
  static #t = /* @__PURE__ */ new Map();
  static ThreadWorker = hl;
  static Thread = ll;
  static create(t = "worker", e, i, s) {
    if (typeof window.Worker > "u")
      return !1;
    if (_(e))
      e = e.toString();
    else if (!E(e))
      return !1;
    return t = E(t) ? tt(t) : tt("worker"), Ot.#t.set(t, new Ot.Thread(t, e, i)), Ot.#t.get(t);
  }
  static destroy(t) {
    if (!E(t))
      return !1;
    Ot.#t.get(t).terminate(), Ot.#t.delete(t);
  }
  static end() {
    Ot.#t.forEach((t, e, i) => {
      Ot.destroy(e);
    });
  }
};
class nt extends HTMLElement {
  shadowRoot;
  template;
  id = tt(Ee);
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
    x(t) && (t += "px"), !(!["width", "height"].includes(e) || !E(t)) && (this.style[e] = t);
  }
}
class fr {
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
    return jo(t);
  }
  numDigits(t) {
    return Qn(t);
  }
  countDigits(t) {
    return Xo(t);
  }
  precision(t) {
    return Jn(t);
  }
}
class cl extends fr {
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
    return et(this.width / this.range.Length);
  }
  get candlesOnLayer() {
    return et(this.core.Chart.layerWidth / this.candleW);
  }
  get xAxisRatio() {
    return this.width / this.range.rangeDuration;
  }
  set xAxisTicks(t) {
    this.#t = x(t) ? t : 0;
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
    return et(this.range.rangeIndex(t) * this.candleW + this.candleW * 0.5);
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
    let e = this.range.indexStart, i = et(t / this.candleW);
    return e + i;
  }
  pixelOHLCV(t) {
    let e = this.pixel2Index(t);
    return this.range.value(e);
  }
  xPosSnap2CandlePos(t) {
    let e = t % this.candleW, i = e ? this.candleW / 2 : 0;
    return et(t - e + i);
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
    }, i = ns(t.rangeDuration);
    e.units = i;
    for (let m in i)
      if (i[m] > 0) {
        e.units = [m, m], e.timeSpan = `${i[m]} ${m}`;
        break;
      }
    const s = t.interval, { xStep: r, rank: o } = this.xStep(t), h = this.pixel2T(this.width) + r;
    let l = t.timeMin - t.timeMin % r - r, f = l;
    for (; l < h; ) {
      let m = si(l, "years"), T = si(l, "months"), b = si(l, "days");
      !(m in e.entries) && m >= f ? e.entries[m] = [this.dateTimeValue(m, s), this.t2Pixel(m), m, "major"] : !(T in e.entries) && T >= f ? e.entries[T] = [this.dateTimeValue(T, s), this.t2Pixel(T), T, "major"] : !(b in e.entries) && b >= f && (e.entries[b] = [this.dateTimeValue(b, s), this.t2Pixel(b), b, "major"]), e.entries[l] = [this.dateTimeValue(l, s), this.t2Pixel(l), l, "minor"], l += r;
    }
    return e.values = Object.values(e.entries), e;
  }
  xStep(t) {
    let e = fa, i = this.#r ? t.interval : 1, s = we[0], r = et(this.width / t.Length), o = Yi[0], h = we.indexOf(i);
    for (; h-- >= 0 && !(r * (we[h] / i) >= e); )
      ;
    return s = we[h], o = Yi[h], { xStep: s, rank: o };
  }
  dateTimeValue(t, e) {
    if (t / O % 1 === 0) {
      const i = cs(t);
      return i === 1 ? ds(t) === 0 ? jn(t) : qn(t) : i;
    } else
      return e < H || e < F ? Xi(t) : Kn(t);
  }
}
const zi = {
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
}, On = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Rn = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, kn = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, Dn = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, _n = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class gr {
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
    this.#e(t), On.test(t) && this.#r(t), Rn.test(t) && this.#n(t), kn.test(t) && this.#i(t), Dn.test(t) && this.#s(t), _n.test(t) && this.#o(t);
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
    if (Na) {
      let e = document.getElementById("divValidColourTest");
      e || (e = document.createElement("div"), e.id = "divValidColourTest"), e.style.backgroundColor = "", e.style.backgroundColor = t, this.#t.isValid = !!e.style.backgroundColor.length;
    } else
      this.#t.isValid = !!(On.test(t) || Rn.test(t) || kn.test(t) || Dn.test(t) || _n.test(t));
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
  #n(t) {
    this.#t.hsl = t;
  }
  #i(t) {
    this.#t.hsla = t;
  }
  #s(t) {
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
    const o = Math.max(e, i, s), h = o - Math.min(e, i, s), l = h ? o === e ? (i - s) / h : o === i ? 2 + (s - e) / h : 4 + (e - i) / h : 0;
    let f = [
      (60 * l < 0 ? 60 * l + 360 : 60 * l).toString(),
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
      const h = (o + t / 30) % 12, l = i - s * Math.max(Math.min(h - 3, 9 - h, 1), -1);
      return Math.round(255 * l).toString(16).padStart(2, "0");
    };
    return `#${r(0)}${r(8)}${r(4)}`;
  }
  #u(t) {
    E(t) && (t = /([a-f\d]{2})/ig.exec(t));
    var e = [
      parseInt(t[0], 16),
      parseInt(t[1], 16),
      parseInt(t[2], 16),
      parseInt(t[3], 16) / 255
    ];
    this.setRGBA(e);
  }
  #d(t) {
    E(t) && (t = /([a-f\d]{2})/ig.exec(t));
    let e = parseInt(t[0], 16), i = parseInt(t[1], 16), s = parseInt(t[2], 16), r = parseInt(t[3], 16);
    e /= 255, i /= 255, s /= 255, r /= 255, this.setHSLA([e, i, s, r]);
  }
  #f(t) {
    let e, i, s, r, o = this.#t;
    if (o.r && o.g && o.b && o.a)
      return { r: e, g: i, b: s, a: r } = { ...o };
    if (E(t)) {
      let h = t.indexOf(",") > -1 ? "," : " ";
      t = t.substr(4).split(")")[0].split(h);
    }
    if (C(t)) {
      if (t.length < 3 || t.length > 4)
        return !1;
      e = t[0], i = t[1], s = t[2], r = E(t[3]) ? t[3] : "";
    } else if (v(t))
      e = t.r, i = t.g, s = t.b, r = "a" in t ? t.a : "";
    else
      return !1;
    return { r: e, g: i, b: s, a: r };
  }
  #v(t) {
    let e, i, s = 0, r = [], o = [], h = t.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    h.shift();
    for (let l of h)
      i = l.indexOf("%") > -1, e = parseFloat(l), s < 3 && i ? e = Math.round(255 * e / 100) : s == 3 && (!i && e >= 0 && e <= 1 ? e = Math.round(255 * e) : i && e >= 0 && e <= 100 ? e = Math.round(255 * e / 100) : e = ""), r[s] = (e | 256).toString(16).slice(1), o[s++] = e;
    this.setHex(r), this.setRGBA(o), this.#d(this.#t.hex);
  }
}
class xs {
  static #t;
  #e;
  #r;
  #n;
  #i;
  #s = { w: 0, h: 0 };
  #o = { w: 0, h: 0, x: 0, y: 0 };
  #h = { x: !1, y: !0 };
  #l;
  #a = { x: 0, drag: !1 };
  #c;
  #u;
  constructor(t) {
    this.#e = xs.#t++, this.#r = t.core, this.#n = A.isElement(t.elContainer) ? t.elContainer : !1, this.#i = A.isElement(t.elHandle) ? t.elHandle : !1, this.#u = _(t.callback) ? t.callback : !1, A.isElement(this.#n) && A.isElement(this.#i) && (this.mount(), this.eventsListen());
  }
  set cursor(t) {
    this.#i.style.cursor = t;
  }
  get cursor() {
    return this.#i.style.cursor;
  }
  eventsListen() {
    this.#c = new Ct(this.#i, { disableContextMenu: !1 }), this.#c.on("mouseenter", Et(this.onMouseEnter, 1, this, !0)), this.#c.on("mouseout", Et(this.onMouseOut, 1, this, !0)), this.#c.on("drag", ra(this.onHandleDrag, 100, this)), this.#c.on("enddrag", this.onHandleDragDone.bind(this)), this.#c.on("mousedown", Et(this.onMouseDown, 100, this, !0)), this.#c.on("mouseup", this.onMouseUp.bind(this));
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
    t && (this.colour = new gr(t), this.#i.style.backgroundColor = this.colour.hex);
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
    this.#s.w = this.#n.getBoundingClientRect().width, this.#s.h = this.#n.getBoundingClientRect().height, this.#n.style.overflow = "hidden", this.#o.w = this.#i.getBoundingClientRect().width, this.#o.h = this.#i.getBoundingClientRect().height, this.#i.style.marginRight = 0, this.#i.style.position = "absolute";
  }
  handlePos(t) {
    let e = this.#r.range, i = parseInt(this.#i.style.marginLeft), s = this.#n.getBoundingClientRect().width, r = this.#i.getBoundingClientRect().width, o = s - r, h = t.position.x - this.#a.x, l = V(i + h, 0, o), f = (e.dataLength + e.limitFuture + e.limitPast) / s, m = Math.floor(l * f);
    this.setHandleDims(l, r), this.#r.jumpToIndex(m);
  }
  setHandleDims(t, e) {
    let i = this.#n.getBoundingClientRect().width;
    e = e || this.#i.getBoundingClientRect().width, t = t / i * 100, this.#i.style.marginLeft = `${t}%`, e = e / i * 100, this.#i.style.width = `${e}%`;
  }
}
let mr = class {
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
class dl extends mr {
  constructor(t = {}) {
    super(t), t.container.innerHTML = "", t.container.appendChild(this.scene.canvas), k.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", k.viewports.splice(this.index, 1);
  }
}
class ul {
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
class fl {
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
class gl {
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
  Node: mr,
  Viewport: dl,
  Layer: ul,
  Scene: fl,
  Hit: gl
}, fi = k;
class ml {
  #t;
  #e;
  #r;
  #n;
  #i;
  constructor(t, e = []) {
    this.#r = t, this.#t = t.core, this.#n = new dt([...e]);
    for (const [i, s] of this.#n)
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
    return this.#n;
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
    for (let t of this.#n.keys())
      this.removeOverlay(t);
    this.#n = null;
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
    return this.#n.get(t);
  }
  addOverlays(t) {
    let e = [], i, s;
    for (let r of t)
      s = this.addOverlay(r[0], r[1]), i = s.instance?.id || r[0], e.push([i, s]);
    return e;
  }
  addOverlay(t, e) {
    try {
      const i = new fi.Layer(this.layerConfig);
      return this.parent.viewport.addLayer(i), e.layer = i, e.instance = new e.class(
        i,
        this.#r.TimeLine,
        this.#r.Scale,
        this.#t.theme,
        this,
        e.params
      ), E(e.instance?.id) || (e.instance.id = t), this.#n.set(e.instance.id, e), !0;
    } catch (i) {
      return console.error(`Error: Cannot instantiate ${t} overlay / indicator`), console.error(i), !1;
    }
  }
  removeOverlay(t) {
    this.#n.has(t) && (this.#n.get(t).layer.remove(), this.#n.delete(t));
  }
}
class q {
  #t;
  #e;
  #r = {};
  #n;
  #i;
  #s;
  #o;
  #h;
  #l;
  #a = !0;
  id;
  constructor(t, e = !1, i = !1, s, r, o = {}) {
    this.#e = r.core, this.#t = r, this.#r = r.core.config, this.#o = t, this.#h = t.scene, this.#n = s, this.#i = e, this.#s = i, this.#l = o;
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
    return this.#n;
  }
  get chart() {
    return this.#t.parent.parent;
  }
  get xAxis() {
    return this.#i || this.#t.time.xAxis;
  }
  get yAxis() {
    return this.#s || this.#t.scale.yAxis;
  }
  set doDraw(t) {
    this.#a = Z(t) ? t : !1;
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
class gi extends q {
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
    if (e.save(), e.strokeStyle = this.core.theme.chart.GridColour || dr.COLOUR_GRID, t != "y") {
      const s = this.xAxis.xAxisGrads.values;
      for (let r of s) {
        let o = et(r[1]);
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
class is extends q {
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
    }), this.#r = new Ct(this.target.viewport.container, { disableContextMenu: !1 }), this.#r.on("pointermove", this.onMouseMove.bind(this)), this.#r.on("pointerenter", this.onMouseMove.bind(this));
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
    const e = v(t) ? t.position.x : t[0], i = v(t) ? t.position.y : t[1];
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
const pl = [
  ["grid", { class: gi, fixed: !0 }],
  ["cursor", { class: is, fixed: !0 }]
];
class oe {
  #t;
  #e;
  #r;
  #n;
  #i;
  #s;
  #o;
  #h;
  #l;
  #a;
  constructor(t, e, i, s = !1) {
    this.#n = t, this.#t = t.core, this.#e = this.core.config, this.#r = this.core.theme, this.#o = this.#n.element, this.#l = e, this.createViewport(i, s);
  }
  get parent() {
    return this.#n;
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
    return A.elementDimPos(this.#o);
  }
  set layerWidth(t) {
    this.#a = t;
  }
  get layerWidth() {
    return this.#a;
  }
  get stateMachine() {
    return this.#n.stateMachine;
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
    return this.#n.Scale;
  }
  get yAxis() {
    return this.#n.Scale.yAxis;
  }
  get viewport() {
    return this.#i;
  }
  get overlays() {
    return this.#s;
  }
  destroy() {
    this.#s.destroy(), this.#i.destroy();
  }
  setSize(t, e, i) {
    const s = this.#s.list;
    this.#i.setSize(t, e);
    for (let [r, o] of s)
      o.layer.setSize(i, e);
  }
  createViewport(t = [], e = !1) {
    t = t.length == 0 ? st(pl) : t;
    const { width: i, height: s } = this.layerConfig();
    let r = e ? fi.Node : fi.Viewport;
    this.#i = new r({
      width: i,
      height: s,
      container: this.#l
    }), this.#h = this.#i.scene.canvas, this.#s = new ml(this, t);
  }
  layerConfig() {
    const t = this.config?.buffer || wi, e = this.#l.getBoundingClientRect().width, i = this.#l.getBoundingClientRect().height;
    this.layerWidth = Math.round(e * ((100 + t) * 0.01));
    const s = {
      width: this.layerWidth,
      height: i
    };
    return { width: e, height: i, layerConfig: s };
  }
  addOverlays(t) {
    return this.#s.addOverlays(t);
  }
  addOverlay(t, e) {
    return this.#s.addOverlay(t, e);
  }
  removeOverlay(t) {
    return this.#s.removeOverlay(t);
  }
  draw(t = this.range, e = !1) {
    const i = this.#s.list;
    if (!(i instanceof dt))
      return !1;
    for (let [s, r] of i)
      !v(r) || !_(r?.instance?.draw) || (r.instance.draw(), r.fixed || (r.instance.position = [this.#t.scrollPos, 0]));
  }
  render() {
    this.#i.render();
  }
}
class vl extends q {
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
    const e = this.scene.context, i = this.xAxis.xAxisGrads.values, s = 0, r = this.theme.xAxis, o = Z(r.tickMarker) ? r.tickMarker : !0;
    e.save(), e.strokeStyle = r.colourTick, e.fillStyle = r.colourTick, e.font = `${r.fontWeight} ${r.fontSize}px ${r.fontFamily}`;
    for (let h of i) {
      let l = et(h[1]), f = Math.floor(e.measureText(`${h[0]}`).width * 0.5);
      e.fillText(h[0], l - f + s, this.xAxis.xAxisTicks + 12), o && (e.beginPath(), e.moveTo(l + s, 0), e.lineTo(l + s, this.xAxis.xAxisTicks), e.stroke());
    }
    e.restore();
  }
}
class yl extends q {
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
function pr(n, t) {
  return Math.round(n.measureText(t).width);
}
function De(n = ct.fontSize, t = ct.fontWeight, e = ct.fontFamily) {
  return `${t} ${n}px ${e}`;
}
function Ti(n, t, e) {
  n.font = De(e?.fontSize, e?.fontWeight, e?.fontFamily);
  const i = pr(n, t), s = e?.paddingLeft || 0, r = e?.paddingRight || 0, o = e?.borderWidth || 0;
  return s + r + i + o * 2;
}
function Ei(n) {
  const t = n?.paddingTop || 0, e = n?.paddingBottom || 0, i = n?.borderWidth || 0, s = n?.fontSize || 0;
  return t + e + s + i * 2;
}
function wl(n, t, e, i) {
  n.fillStyle = i?.colour, n.font = De(i?.fontSize, i?.fontWeight, i?.fontFamily), n.textAlign = i?.textAlign || "start", n.textBaseLine = i?.textBaseLine || "alphabetic", n.direction = i?.direction || "inherit", n.lineWidth = i?.width, n.strokeStyle = i?.border, i?.stroke ? n.strokeText(i?.text, t, e, i?.max) : n.fillText(i?.text, t, e, i?.max);
}
function Ie(n, t, e, i, s) {
  n.save(), n.font = De(s?.fontSize, s?.fontWeight, s?.fontFamily), n.textBaseline = "top", n.fillStyle = s?.bakCol || ct.bakCol;
  let r = s?.width || Ti(n, t, s), o = s?.height || Ei(s);
  n.fillRect(e, i, r, o), n.fillStyle = s?.txtCol || ct.txtCol, e = e + s?.paddingLeft, i = i + s?.paddingTop, n.fillText(`${t}`, e, i), n.restore();
}
class xl extends q {
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
    }, l = Ti(t, o, h), f = i + this.core.bufferPx;
    f = this.xAxis.xPosSnap2CandlePos(f), f = f - Math.round(l * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), t.save(), Ie(t, o, f, 1, h), t.restore();
  }
}
const Tl = [
  ["labels", { class: vl, fixed: !1, required: !0 }],
  ["overlay", { class: yl, fixed: !1, required: !0 }],
  ["cursor", { class: xl, fixed: !1, required: !0 }]
];
class El {
  #t;
  #e = "Timeline";
  #r = "time";
  #n;
  #i;
  #s;
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
  #b;
  #P;
  #g;
  #C;
  #M;
  #L;
  #S;
  #E;
  #A = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #T = { end: !1, start: !1 };
  constructor(t, e) {
    this.#s = t, this.#n = e, this.#i = e.elements.elTime, this.#o = t.Chart, this.#h = new cl(this, this.#o), this.init();
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
  get options() {
    return this.#n;
  }
  get core() {
    return this.#s;
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
    return this.#b;
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
    return this.#s.theme;
  }
  get config() {
    return this.#s.config;
  }
  get graph() {
    return this.#u;
  }
  get navigation() {
    return this.#f;
  }
  get range() {
    return this.#s.range;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return A.elementDimPos(this.#i);
  }
  get bufferPx() {
    return this.#s.bufferPx;
  }
  get scrollPos() {
    return this.#s.scrollPos;
  }
  get scrollOffsetPx() {
    return this.#s.scrollPos % this.candleW;
  }
  get smoothScrollOffset() {
    return this.#s.smoothScrollOffset;
  }
  get rangeScrollOffset() {
    return this.#s.rangeScrollOffset;
  }
  set stateMachine(t) {
    this.#l = new $t(t, this);
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
      core: this.#s,
      elContainer: this.#w,
      elHandle: this.#p,
      callback: null
    };
    this.#E = new xs(e), this.#s.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(t) {
    this.#i.style.width = `${t}px`, this.#a.style.width = `${t}px`;
  }
  setDimensions(t) {
    const e = this.config.buffer || wi, i = t.w, s = this.height, r = Math.round(i * ((100 + e) * 0.01));
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
    this.createGraph(), this.onSetRange(), this.#h.initXAxisGrads(), this.draw(), this.eventsListen(), zi.id = this.id, zi.context = this, this.stateMachine = zi, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#C.destroy(), this.#M.destroy(), this.#L.destroy(), this.off("main_mousemove", this.drawCursorTime), this.off("setRange", this.onSetRange), this.#m.removeEventListener("click", Et), this.#y.removeEventListener("click", Et), this.#u.destroy(), this.element.remove();
  }
  eventsListen() {
    this.#C = new Ct(this.#a, { disableContextMenu: !1 }), this.#C.on("dblclick", this.onDoubleClick.bind(this)), this.#C.on("pointerover", this.onPointerEnter.bind(this)), this.#C.on("pointerout", this.onPointerLeave.bind(this)), this.#C.on("pointerdrag", this.onPointerDrag.bind(this)), this.#M = new Ct(this.#m, { disableContextMenu: !1 }), this.#M.on("pointerover", () => this.showJump(this.#T.end)), this.#M.on("pointerleave", () => this.hideJump(this.#T.end)), this.#L = new Ct(this.#y, { disableContextMenu: !1 }), this.#L.on("pointerover", () => this.showJump(this.#T.start)), this.#L.on("pointerleave", () => this.hideJump(this.#T.start)), this.on("main_mousemove", this.#g.draw, this.#g), this.on("setRange", this.onSetRange, this), this.#m.addEventListener("click", Et(this.onMouseClick, 1e3, this, !0)), this.#y.addEventListener("click", Et(this.onMouseClick, 1e3, this, !0));
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
    this.#s.theme?.time?.navigation === !1 && !(this.#T.end && this.#T.start) && (this.#c.style.visibility = "hidden");
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
    this.#E.setHandleDims(h, o);
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
    let t = st(Tl);
    this.#u = new oe(this, this.#a, t, !1), this.#g = this.graph.overlays.get("cursor").instance, this.#b = this.graph.overlays.get("labels").instance, this.#P = this.graph.overlays.get("overlay").instance;
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
    this.#s.theme?.time?.navigation === !1 && (this.#c.style.visibility = "hidden");
  }
  showJump(t) {
    this.#c.style.visibility = "visible", this.hideCursorTime();
  }
}
const Sl = {
  renderQ: new dt(),
  rendered: [],
  renderLog: !1,
  dropFrames: !0,
  graphs: [],
  range: {},
  init: function(n) {
    v(n) && (this.renderLog = n?.renderLog || !1, this.dropFrames = n?.dropFrames || !0, this.graphs = C(n?.graphs) ? [...n.graphs] : [], this.range = v(n?.range) ? n.range : {});
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
        _(e.draw) && e.draw(t.range, t.update);
      for (let e of t.graphs)
        _(e.render) && e.render();
      this.frameDone();
    }
  }
}, ei = Sl, Nn = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select"
];
class bl {
  #t;
  #e;
  #r;
  #n;
  #i;
  #s;
  #o;
  #h = [];
  #l;
  #a = {};
  #c;
  #u;
  #d = null;
  constructor(t, e) {
    this.#t = t, this.#e = e, this.#r = e.core, this.#n = e.core.theme.legend, this.init(), this.eventsListen();
  }
  get elTarget() {
    return this.#t;
  }
  get list() {
    return this.#a;
  }
  set collapse(t) {
    this.setCollapse(t);
  }
  get collapse() {
    return this.#o;
  }
  destroy() {
    this.#r.off("chart_pan", this.primaryPanePan), this.#r.off("chart_panDone", this.primaryPanePanDone);
    for (let t in this.#a)
      t !== "collapse" && this.remove(t);
    this.#t.remove();
  }
  eventsListen() {
    this.#r.on("chart_pan", this.primaryPanePan.bind(this)), this.#r.on("chart_panDone", this.primaryPanePanDone.bind(this));
  }
  init() {
    const t = this.#t.legends;
    this.#s = t.querySelector(".controls"), this.#o = t.querySelectorAll(".control"), this.#c = t.querySelector("#showLegends"), this.#u = t.querySelector("#hideLegends"), this.#s.style.display = "none", this.icons(this.#o, { id: "collapse", parent: this }), this.#t.legends.classList.add("hide"), this.#d = "hide", this.collapse = "show";
  }
  onMouseClick(t) {
    const e = (i) => E(i.dataset.icon) ? { id: i.id, icon: i.dataset.icon } : i.parentElement.className !== "controls" ? e(i.parentElement) : !1;
    return e(t);
  }
  onMouseOver(t) {
  }
  onLegendAction(t) {
    const e = this.onMouseClick(t.currentTarget);
    this.setCollapse(e.icon);
  }
  setCollapse(t) {
    t === "show" && this.#d !== "show" ? (this.#d = t, this.#c.style.display = "none", this.#u.style.display = "inline-block", this.#t.legends.classList.toggle("hide")) : t === "hide" && this.#d !== "hide" && (this.#d = t, this.#c.style.display = "inline-block", this.#u.style.display = "none", this.#t.legends.classList.toggle("hide"));
  }
  primaryPanePan() {
    for (let t of Nn)
      this.#t.style.setProperty(t, "none");
  }
  primaryPanePanDone() {
    for (let t of Nn)
      this.#t.style.removeProperty(t);
  }
  add(t) {
    if (!v(t) || !("title" in t))
      return !1;
    const e = () => {
      this.#r.error("ERROR: Legend parent missing!");
    };
    t.id = t?.id || tt("legend"), t.type = t?.type || "overlay", t.parent = t?.parent || e;
    const i = this.elTarget.buildLegend(t, this.#r.theme);
    this.#t.legends.insertAdjacentHTML("beforeend", i);
    const s = this.#t.legends.querySelector(`#legend_${t.id}`);
    return this.#l = s.querySelectorAll(".control"), this.#a[t.id] = {
      el: s,
      type: t.type,
      source: t?.source,
      click: []
    }, this.icons(this.#l, t), t.type == "indicator" && (this.#s.style.display = "block", !t.parent.primaryPane && Object.keys(this.#a).length < 3 && (this.#s.style.display = "none")), t.id;
  }
  remove(t) {
    if (!(t in this.#a) || this.#a[t].type === "chart")
      return !1;
    this.#a[t].el.remove();
    for (let e of this.#a[t].click)
      e.el.removeEventListener("click", e.click);
    return delete this.#a[t], Object.keys(this.#a).length < 2 && (this.#s.style.display = "none"), !0;
  }
  update(t, e) {
    if (!v(e) || !(t in this.#a) || this.#r.range.data.length == 0)
      return !1;
    let i = this.#a[t].source(e.pos);
    const s = this.#t.buildInputs(i);
    this.#t.legends.querySelector(`#legend_${t} dl`).innerHTML = s;
  }
  icons(t, e) {
    let i;
    for (let s of t) {
      let r = s.querySelector("svg");
      r.style.width = `${this.#n.controlsW}px`, r.style.height = `${this.#n.controlsH}px`, r.style.fill = `${this.#n.controlsColour}`, r.onpointerover = (o) => o.currentTarget.style.fill = this.#n.controlsOver, r.onpointerout = (o) => o.currentTarget.style.fill = this.#n.controlsColour, i = e.parent.onLegendAction.bind(e.parent), e.id === "collapse" ? this.#h.push({ el: s, click: i }) : this.#a[e.id].click.push({ el: s, click: i }), s.addEventListener("click", i);
    }
  }
}
const Wi = {
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
class Cl extends fr {
  #t;
  #e;
  #r;
  #n;
  #i = Zt[0];
  #s = "automatic";
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
  #l = js;
  #a = ua;
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
    this.#l = x(t) ? t : js;
  }
  get yAxisStep() {
    return this.#l;
  }
  set yAxisTicks(t) {
    this.#c = x(t) ? t : 0;
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
    return this.#s;
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
        return et(this.p100toPixel(t));
      case "log":
        return et(this.$2Pixel(Zo(t)));
      default:
        return et(this.$2Pixel(t));
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
    return this.mode == "automatic" && t == "manual" ? (e.manual.zoom = 0, e.manual.max = this.#d.valueMax, e.manual.min = this.#d.valueMin, this.#s = t) : this.mode == "manual" && t == "automatic" && (e.manual.zoom = 0, this.#s = t), !0;
  }
  setOffset(t) {
    if (!x(t) || t == 0 || this.#s !== "manual")
      return !1;
    const e = this.#o;
    let i = this.pixel2$(t * -1), s = this.pixel2$(this.height - t), r = i - s;
    e.manual.min = s, e.manual.max = i, e.manual.mid = r / 2, e.manual.diff = r, e.manual.zoom = 0;
  }
  setZoom(t) {
    if (!x(t) || this.#s !== "manual")
      return !1;
    const e = this.#o;
    let i = e.manual.min, s = e.manual.max;
    const r = s - i, o = r * 0.01, h = t * o;
    i -= h, s += h, !(s < i || i <= 1 / 0 * -1 || s >= 1 / 0) && (e.manual.max = s, e.manual.min = i, e.manual.mid = r / 2, e.manual.diff = r, e.manual.zoom = h, this.calcGradations());
  }
  setRange(t) {
    this.#o.automatic.range = t, this.#d = new Proxy(t, {
      get: (e, i) => {
        const s = this.#s, r = this.#o;
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
    const l = [];
    o = t - e, o = this.rangeH > 0 ? this.rangeH : 1, h = o / (this.height / (this.core.theme.yAxis.fontSize * 1.75));
    let f = Math.pow(10, Math.ceil(Math.log10(h)));
    h < 0.25 * f ? f = 0.25 * f : h < 0.5 * f && (f = 0.5 * f);
    var m = Math.ceil(e / f) * f, T = Math.floor(t / f) * f;
    let b = this.height, P = (T - m) / f, G = this.height / P, B = this.countDigits(P), rt;
    for (var D = m; D <= T; D += f)
      r = this.countDigits(D), rt = this.niceValue(r, i, B), l.push([rt, Di(b), r]), b -= G;
    return l;
  }
  niceValue(t, e = !0, i) {
    if (t.integers) {
      let s = i.integers;
      if (s - 2 > 0) {
        let r = Ko(10, s - 2);
        return Math.floor(t.value / r) * r;
      } else
        return e ? (s = s > 0 ? s : s * -1, Di(t.value, s)) : Math.floor(t.value);
    } else {
      let s = t.decimals - i.decimals;
      return s = s > 0 ? s : s * -1, Di(t.value, s);
    }
  }
  limitPrecision(t) {
    let e = t.value, i = this.#a - t.total, s = 4 - t.integers;
    if (i < 1) {
      let r = V(t.decimals + i, 0, 100);
      e = Number.parseFloat(e).toFixed(r);
    } else if (s < 1) {
      let r = 2 - s;
      e = Number.parseFloat(e).toFixed(r);
    }
    return e;
  }
}
const Ml = {
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
class Pl extends q {
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
    const l = this.scene.context;
    this.scene.clear(), l.save(), l.fillStyle = r.bakCol, l.fillRect(1, h, this.width, o), Ie(l, `${s}`, 1, h, r), l.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
class Ll extends q {
  constructor(t, e, i, s, r, o) {
    r = i, i = i.yAxis, super(t, e, i, s, r, o), this.viewport = t.viewport;
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw() {
    const t = this.scene.context, e = this.yAxis, i = this.yAxis.calcGradations() || [], s = this.theme.yAxis, r = Z(s.tickMarker) ? s.tickMarker : !0;
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
    for (let l of i)
      h = e.$2Pixel(l[0]), t.fillText(l[0], e.yAxisTicks + 5, h + s.fontSize * 0.3), r && (t.beginPath(), t.moveTo(o[0], h), t.lineTo(o[1], h), t.stroke());
    t.restore();
  }
}
class Al extends q {
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
class Il extends q {
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
      fontSize: vt.FONTSIZE * 1.05,
      fontWeight: vt.FONTWEIGHT,
      fontFamily: vt.FONTFAMILY,
      txtCol: "#FFFFFF",
      bakCol: vt.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }, h = 0, l = Ei(o), f = this.parent.yPos(s) - l * 0.5;
    this.scene.clear(), e.save(), t[4] >= t[1] ? o.bakCol = this.theme.candle.UpBodyColour : o.bakCol = this.theme.candle.DnBodyColour, Ie(e, r, h, f, o), i && (r = this.core.stream.countDownUpdate(), o.fontSize = o?.fontSize / 1.1, Ie(e, r, h, f + l, o)), e.restore(), this.viewport.render();
  }
}
const Ol = [
  ["labels", { class: Ll, fixed: !0, required: !0 }],
  ["overlay", { class: Al, fixed: !0, required: !0 }],
  ["price", { class: Il, fixed: !0, required: !0 }],
  ["cursor", { class: Pl, fixed: !0, required: !0 }]
];
class Rl {
  #t;
  #e = "Y Scale Axis";
  #r = "scale";
  #n;
  #i;
  #s;
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
  #b;
  #P;
  #g = {};
  constructor(t, e) {
    this.#n = t, this.#i = { ...e }, this.#c = this.#i.elScale, this.#h = this.#i.chart, this.#s = this.#i.parent, this.id = `${this.#s.id}_scale`, this.init();
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
  get core() {
    return this.#n;
  }
  get options() {
    return this.#i;
  }
  get parent() {
    return this.#s;
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
    return A.elementDimPos(this.#c);
  }
  get theme() {
    return this.#n.theme;
  }
  get config() {
    return this.#n.config;
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
    this.#o = new $t(t, this);
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
    const t = this.#s.name == "Chart" ? void 0 : this.#s.localRange;
    this.#a = new Cl(this, this, this.options.yAxisType, t), this.createGraph(), this.addOverlays([]), this.#a.calcGradations(), this.draw(), this.eventsListen();
    const e = st(Ml);
    e.id = this.id, e.context = this, this.stateMachine = e, this.stateMachine.start();
  }
  restart() {
    this.#a.setRange(this.#n.range), this.draw();
  }
  destroy() {
    this.stateMachine.destroy(), this.#y.destroy(), this.#m.destroy(), this.off(`${this.#s.id}_mousemove`, this.onMouseMove), this.off(`${this.#s.id}_mouseout`, this.#w.erase), this.off(bt, this.onStreamUpdate), this.element.remove();
  }
  eventsListen() {
    let t = this.#y.viewport.scene.canvas;
    this.#m = new Ct(t, { disableContextMenu: !1 }), this.#m.setCursor("ns-resize"), this.#m.on("pointerdrag", this.onDrag.bind(this)), this.#m.on("pointerdragend", this.onDragDone.bind(this)), this.#m.on("wheel", this.onMouseWheel.bind(this)), this.#m.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.#s.id}_mousemove`, this.onMouseMove, this), this.on(`${this.#s.id}_mouseout`, this.#w.erase, this.#w), this.on(bt, this.#v.draw, this.#v);
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
    this.#P = C(t) ? t : [Math.floor(t.position.x), Math.floor(t.position.y)], this.#w.draw(this.#P);
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
    let t = st(Ol);
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
    this.#y.draw(t, e), this.#s.drawGrid();
  }
  resize(t = this.width, e = this.height) {
    this.setDimensions({ w: t, h: e });
  }
}
class kl {
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
class Dl extends q {
  #t;
  #e;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e = !1, i = !1, s, r, o), this.#t = new kl(t.scene, s), this.theme.volume.Height = V(s?.volume?.Height, 0, 100) || 100;
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
    let l = this.core.rangeScrollOffset, f = t.indexStart - l, m = t.Length + l * 2, T = m, b = f, P, G = 0;
    for (; T--; )
      P = t.value(b), P[4] !== null && (G = P[5] > G ? P[5] : G), b++;
    for (; m--; )
      P = t.value(f), o.x = et(this.xAxis.xPos(P[0]) - r / 2), P[4] !== null && (o.h = h - h * ((G - P[5]) / G), o.raw = e[f], this.#t.draw(o)), f++;
  }
}
class vr {
  areaCoordinates = [];
  constructor(t, e) {
    this.scene = t, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = e;
  }
  draw(t) {
    const e = this.ctx, i = t.raw[4] >= t.raw[1], s = i ? this.cfg.candle.UpBodyColour : this.cfg.candle.DnBodyColour, r = i ? this.cfg.candle.UpWickColour : this.cfg.candle.DnWickColour;
    switch (this.cfg.candle.Type) {
      case Y.CANDLE_SOLID:
        this.fill = !0;
        break;
      case Y.CANDLE_HOLLOW:
      case Y.OHLC:
        this.fill = !1;
        break;
      case Y.CANDLE_UP_HOLLOW:
        this.fill = !i;
        break;
      case Y.CANDLE_DOWN_HOLLOW:
        this.fill = i;
    }
    let o = Math.max(t.w - 1, 1);
    o < 3 ? o = 1 : o < 5 ? o = 3 : o > 5 && (o = Math.ceil(o * 0.8));
    let h = Math.max(Math.floor(o * 0.5), 1), l = Math.abs(t.o - t.c), f = t.c === t.o ? 1 : 2, m = t.x, T = Math.floor(m) - 0.5;
    if (e.save(), e.strokeStyle = r, e.beginPath(), e.moveTo(T, Math.floor(t.h)), this.cfg.candle.Type === Y.OHLC ? e.lineTo(T, Math.floor(t.l)) : i ? (e.lineTo(T, Math.floor(t.c)), e.moveTo(T, Math.floor(t.o))) : (e.lineTo(T, Math.floor(t.o)), e.moveTo(T, Math.floor(t.c))), e.lineTo(T, Math.floor(t.l)), e.stroke(), o == 3) {
      e.fillStyle = r;
      let b = i ? 1 : -1;
      e.rect(
        Math.floor(m - h),
        t.c,
        Math.floor(h * 2),
        b * Math.max(l, f)
      ), e.fill(), e.stroke();
    } else if (o > 3 && this.fill) {
      e.fillStyle = s;
      let b = i ? 1 : -1;
      e.rect(
        Math.floor(m - h),
        t.c,
        Math.floor(h * 2),
        b * Math.max(l, f)
      ), e.fill(), e.stroke();
    } else if (o > 3 && !this.fill && this.cfg.candle.Type !== Y.OHLC) {
      let b = i ? 1 : -1;
      e.rect(
        Math.floor(m - h),
        t.c,
        Math.floor(h * 2),
        b * Math.max(l, f)
      ), e.stroke();
    } else
      this.cfg.candle.Type === Y.OHLC ? (e.beginPath(), e.moveTo(T - h, t.o), e.lineTo(T, t.o), e.moveTo(T, t.c), e.lineTo(T + h, t.c), e.stroke()) : (e.strokeStyle = r, e.beginPath(), e.moveTo(
        T,
        Math.floor(Math.min(t.o, t.c))
      ), e.lineTo(
        T,
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
    if (!C(t) || t.length == 0)
      return;
    let e = this.ctx, i = this.cfg.candle, s;
    Math.max(t[0].w - 1, 1), t[0].x;
    let r = [t[0].x, t[0].h];
    e.save(), e.strokeStyle = i.AreaLineColour || i.UpBodyColour || i.DnBodyColour, e.lineWidth = 1, e.beginPath(), e.moveTo(t[0].x, t[0].h);
    let o = 0;
    for (; o < t.length; )
      e.lineTo(t[o].x, t[o].h), o++;
    if (i?.Type == "area") {
      if (s = e.createLinearGradient(0, 0, 0, this.scene.height), C(i.AreaFillColour))
        for (let [h, l] of i.AreaFillColour.entries())
          s.addColorStop(h, l);
      else
        E() ? s = i.AreaFillColour : s = i.UpBodyColour || i.DnBodyColour;
      e.stroke(), e.lineTo(t[o - 1].x, this.scene.height), e.lineTo(r[0], this.scene.height), e.fillStyle = s, e.closePath(), e.fill();
    } else
      e.stroke();
    e.restore(), t.length = 0;
  }
}
class yr extends q {
  #t;
  constructor(t, e = !1, i = !1, s, r) {
    super(t, e = !1, i = !1, s, r), this.#t = new vr(t.scene, s);
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  draw(t = this.core.range) {
    this.scene.clear();
    let e, i = this.theme.candle.Type;
    switch (i) {
      case Y.AREA:
      case Y.LINE:
        e = (m) => {
          this.#t.area({ ...m });
        };
        break;
      default:
        e = (m) => {
          this.#t.draw(m);
        };
        break;
    }
    const r = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let o = this.core.rangeScrollOffset, h = t.indexStart - o, l = t.Length + o * 2, f;
    for (this.core.stream && (this.core.stream.lastPriceMax = t.valueMax, this.core.stream.lastPriceMin = t.valueMin); l; ) {
      if (f = t.value(h), r.x = this.xAxis.xPos(f[0]), f?.[7]) {
        this.core.stream.lastXPos = r.x, this.core.stream.lastYPos = {
          o: r.o,
          h: r.h,
          l: r.l,
          c: r.c
        };
        break;
      }
      f[4] !== null && (r.o = this.yAxis.yPos(f[1]), r.h = this.yAxis.yPos(f[2]), r.l = this.yAxis.yPos(f[3]), r.c = this.yAxis.yPos(f[4]), r.raw = f, e(r)), h++, l--;
    }
    (i === Y.AREA || i === Y.LINE) && this.#t.areaRender();
  }
}
function wr(n, t, e, i, s, r) {
  n.lineWidth = r?.width || ct.borderWidth, n.strokeStyle = r?.border || ct.stroke, n.beginPath(), n.rect(t, e, i, s), n.stroke();
}
function xr(n, t, e, i, s, r) {
  n.fillStyle = r?.fill || ct.fill, n.fillRect(t, e, i, s);
}
function _l(n, t, e, i, s, r) {
  E(r.fill) && xr(n, t, e, i, s, r), x(r.width) && r.width > 0 && wr(n, t, e, i, s, r);
}
function Tr(n, t, e, i, s, r, o) {
  n.lineWidth = o?.width || ct.borderWidth, n.strokeStyle = o?.border || ct.stroke, Sr(n, t, e, i, s, r), n.stroke();
}
function Er(n, t, e, i, s, r, o) {
  n.fillStyle = o?.fill || ct.fill, Sr(n, t, e, i, s, r), n.fill();
}
function Sr(n, t, e, i, s, r) {
  n.beginPath(), n.moveTo(t + r, e), n.arcTo(t + i, e, t + i, e + s, r), n.arcTo(t + i, e + s, t, e + s, r), n.arcTo(t, e + s, t, e, r), n.arcTo(t, e, t + i, e, r), n.closePath();
}
function Nl(n, t, e, i, s, r, o) {
  E(o.fill) && Er(n, t, e, i, s, r, o?.fill), x(o.width) && o.width > 0 && Tr(n, t, e, i, s, r, o?.border, o?.width);
}
function br(n, t, e, i, s, r, o) {
  if (!(s < 3)) {
    var h = Math.PI * 2 / s;
    n.beginPath(), n.translate(t, e), n.rotate(r * Math.PI / 180), n.moveTo(i, 0);
    for (var l = 1; l < s; l++)
      n.lineTo(i * Math.cos(h * l), i * Math.sin(h * l));
    n.closePath(), ae(n, o?.fill, o?.stroke, o?.width);
  }
}
function $l(n, t, e) {
  if (t.length > 0) {
    n.beginPath();
    var i = t[0];
    n.moveTo(i.x, i.y);
    for (var s = 1; s < t.length; ++s)
      i = t[s], n.lineTo(i.x, i.y);
    n.closePath(), ae(n, e?.fill, e?.stroke, e?.width);
  }
}
function Hl(n, t, e, i, s) {
  br(n, t, e, i, 3, s?.rotate || 0, s), ae(n, s?.fill, s?.stroke, s?.width);
}
function Bl(n, t, e, i, s, r) {
  n.beginPath(), n.moveTo(t - i / 2, e), n.lineTo(t, e - s / 2), n.lineTo(t + i / 2, e), n.lineTo(t, e + s / 2), n.closePath(), ae(n, r?.fill, r?.stroke, r?.width);
}
function Ul(n, t, e, i, s) {
  n.beginPath(), n.arc(t, e, i, 0, Math.PI * 2), n.closePath(), fillStroke(n, s?.fill, s?.stroke, s?.width);
}
function zl(n) {
  return n.ownerDocument && n.ownerDocument.defaultView && n.ownerDocument.defaultView.devicePixelRatio || 2;
}
function ae(n, t, e, i) {
  E(t) && (n.fillStyle = t, n.fill()), x(i) && i > 0 && (n.lineWidth = i, n.strokeStyle = e || ct.stroke, n.stroke());
}
function Cr(n, t, e, i, s, r, o, h, l, f) {
  n.drawImage(t, e, i, s, r, o, h, l, f);
}
function Mr(n, t) {
  let e = n.naturalWidth || n.width, i = n.naturalHeight || n.height;
  return t === void 0 && (t = Pr(e, i)), t.ctx.drawImage(n, 0, 0), t;
}
const Wl = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};
function xe(n, t) {
  const e = Mr(t), i = e.ctx;
  return i.fillStyle = Wl[n], i.globalCompositeOperation = "multiply", i.fillRect(0, 0, i.canvas.width, i.canvas.height), i.globalCompositeOperation = "destination-in", i.drawImage(t, 0, 0), i.globalCompositeOperation = "source-over", e;
}
function Fl(n) {
  return {
    red: xe("red", n),
    green: xe("green", n),
    blue: xe("blue", n),
    alpha: xe("alpha", n)
  };
}
function Pr(n, t) {
  const e = document.createElement("canvas");
  return e.ctx = e.getContext("2d"), e.width = n || e.ctx.canvas.width, e.height = t || e.ctx.canvas.height, e;
}
const Q = {
  createCanvas: Pr,
  imageToCanvs: Mr,
  seperateRGB: Fl,
  getChannel: xe,
  getPixelRatio: zl,
  fillStroke: ae,
  calcTextWidth: pr,
  createFont: De,
  getTextRectHeight: Ei,
  getTextRectWidth: Ti,
  renderImage: Cr,
  renderText: wl,
  renderTextBG: Ie,
  renderPath: he,
  renderPathStroke: Vl,
  renderPathClosed: Gl,
  renderSpline: Yl,
  renderLine: Xl,
  renderLineHorizontal: Lr,
  renderLineVertical: ql,
  renderCircle: Ul,
  renderRect: _l,
  renderRectFill: xr,
  renderRectStroke: wr,
  renderRectRound: Nl,
  renderRectRoundFill: Er,
  renderRectRoundStroke: Tr,
  renderPolygonRegular: br,
  renderPolygonIrregular: $l,
  renderDiamond: Bl,
  renderTriangle: Hl
};
function he(n, t, e, i) {
  n.save();
  const s = e.width || 1;
  n.lineWidth = s, s % 2 && n.translate(0.5, 0.5), n.strokeStyle = e.stroke, C(e.dash) && n.setLineDash(e.dash), n.beginPath();
  let r = !0;
  t.forEach((o) => {
    o && o.x !== null && (r ? (n.moveTo(o.x, o.y), r = !1) : n.lineTo(o.x, o.y));
  }), i(), n.restore();
}
function Vl(n, t, e) {
  he(n, t, e, () => {
    n.stroke();
  });
}
function Gl(n, t, e) {
  he(n, t, e, () => {
    n.closePath();
  }), ae(n, opts?.fill, opts?.stroke, opts?.size);
}
function Yl(n, t, e) {
  n.beginPath(), n.moveTo(t[0].x, t[0].y);
  for (var i = e ?? 1, s = 0; s < t.length - 1; s++) {
    var r = s > 0 ? t[s - 1] : t[0], o = t[s], h = t[s + 1], l = s != t.length - 2 ? t[s + 2] : h, f = o.x + (h.x - r.x) / 6 * i, m = o.y + (h.y - r.y) / 6 * i, T = h.x - (l.x - o.x) / 6 * i, b = h.y - (l.y - o.y) / 6 * i;
    n.bezierCurveTo(f, m, T, b, h.x, h.y);
  }
  n.stroke();
}
function Lr(n, t, e, i, s) {
  he(n, [{ x: e, y: t }, { x: i, y: t }], s, () => {
    n.stroke(), n.closePath();
  });
}
function ql(n, t, e, i, s) {
  coords = [{ x: t, y: e }, { x: t, y, bottom: i }], he(n, coords, s, () => {
    n.stroke(), n.closePath();
  });
}
function Xl(n, t, e) {
  he(n, t, e, () => {
    n.stroke(), n.closePath();
  });
}
class jl extends q {
  #t;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e = !1, i = !1, s, r, o), this.#t = new vr(t.scene, s), this.theme.priceLineStyle = this.theme?.priceLineStyle || sl;
  }
  set position(t) {
    this.setPosition(t[0], t[1]);
  }
  setPosition(t, e) {
    this.core.stream !== void 0 && (this.target.setPosition(t, e), this.core.stream.lastScrollPos = this.core.scrollPos);
  }
  draw() {
    if (this.core.stream === void 0 || !C(this.chart.streamCandle))
      return;
    this.scene.clear();
    const t = this.core.range, e = this.chart.streamCandle, i = this.theme.candle.Type === Y.AREA || this.theme.candle.Type === Y.LINE ? (o) => {
      this.areaRender(o);
    } : (o) => {
      this.#t.draw(o);
    };
    this.xAxis.smoothScrollOffset;
    const r = {
      x: this.core.stream.lastXPos,
      w: this.xAxis.candleW
    };
    r.o = this.yAxis.yPos(e[1]), r.h = this.yAxis.yPos(e[2]), r.l = this.yAxis.yPos(e[3]), r.c = this.yAxis.yPos(e[4]), r.raw = e, t.inRenderRange(e[0]) && i(r), e[4] >= e[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, Lr(
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
    let l;
    if (r.save(), r.fillStyle = h, r.strokeStyle = h, r.lineWidth = 1, r.beginPath(), r.moveTo(t.x, t.c), r.lineTo(s.x, s.h), o.candle.Type === Y.AREA) {
      if (l = r.createLinearGradient(0, 0, 0, this.scene.height), C(o.candle.AreaFillColour))
        for (let [f, m] of o.candle.AreaFillColour.entries())
          l.addColorStop(f, m);
      else
        isString() ? l = o.candle.AreaFillColour : l = o.candle.UpBodyColour || o.candle.DnBodyColour;
      r.stroke(), r.lineTo(s.x, this.scene.height), r.lineTo(t.x, this.scene.height), r.fillStyle = l, r.closePath(), r.fill();
    } else
      r.stroke();
    r.restore();
  }
}
class Zl {
  data;
  buy;
  sell;
  constructor(t, e) {
    this.scene = t, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = e.trades, this.buy = this.svg(this.cfg.iconBuy, this.cfg.buyColour, (i) => {
      this.buy = i;
    }), this.sell = this.svg(this.cfg.iconSell, this.cfg.sellColour, (i) => {
      this.sell = i;
    });
  }
  svg(t, e, i) {
    let s = this.cfg.iconWidth, r = this.cfg.iconHeight, o = document.createElement("canvas");
    o.width = s, o.height = r;
    let h = A.htmlToElement(t);
    h.style.fill = e, h.setAttribute("width", s), h.setAttribute("height", r), h.xmlns = "http://www.w3.org/2000/svg";
    let l = new XMLSerializer().serializeToString(h), T = "data:image/svg+xml;base64," + btoa(l), b = new Image();
    return b.setAttribute("width", s), b.setAttribute("height", r), b.onload = () => {
      o.getContext("2d").drawImage(b, 0, 0, s, r);
    }, b.src = T, b;
  }
  draw(t) {
    this.data = t;
    const e = t.side === "buy" ? this.buy : this.sell, i = this.cfg, s = V(t.w, i.iconMinDim, i.iconHeight), r = V(t.w, i.iconMinDim, i.iconWidth), o = this.data.x, h = this.data.y, l = this.scene.context;
    return l.save(), l.drawImage(e, o, h, r, s), l.restore(), { x: o, y: h, w: r, h: s };
  }
}
const Kl = {
  dragBar: !1,
  closeIcon: !1,
  content: "",
  styles: {
    window: {
      width: "15em",
      zindex: "10"
    },
    content: {
      overflow: "hidden",
      padding: "0 1em"
    }
  }
};
class Ql extends q {
  #t;
  #e = [];
  #r;
  #n = (t) => Et(this.isTradeSelected, 100, this);
  constructor(t, e = !1, i = !1, s, r) {
    super(t, e = !1, i = !1, s, r), this.#t = new Zl(t.scene, s), this.emit(), this.core.on("primary_pointerdown", Et(this.isTradeSelected, 200, this), this), this.#r = this.core.WidgetsG.insert("Dialogue", Kl), this.#r.start();
  }
  destroy() {
    this.core.off("primary_pointerdown", this.#n);
  }
  set position(t) {
    this.target.setPosition(t[0], t[1]);
  }
  get trades() {
    return this.core.state.data.trades;
  }
  isTradeSelected(t) {
    if (this.core.config?.trades?.display === !1 || this.core.config?.trades?.displayInfo === !1)
      return;
    const e = t[0], i = t[1], s = this.theme.trades, r = V(this.xAxis.candleW, s.iconMinDim, s.iconHeight), o = this.xAxis.pixel2T(e), h = this.core.range.valueByTS(o);
    for (let l in this.trades)
      if (l *= 1, o === l) {
        let f = this.xAxis.xPos(o), m = this.yAxis.yPos(h[2]) - r * 1.5;
        if (e >= f - r / 2 && e <= f + r / 2 && i >= m && i <= m + r) {
          console.log("trade ", o, " selected");
          let T = "";
          for (let P of this.trades[l])
            T += this.buildTradeHTML(P);
          const b = {
            dimensions: { h: 150, w: 150 },
            position: { x: f + r / 2 + 1, y: m },
            content: T
          };
          this.core.emit("trade_selected", l), this.#r.open(b);
        }
      }
  }
  buildTradeHTML(t) {
    let e = `<style>
    dt, dd {display: inline-block; font-size: 0.9em;}
    dt {min-width: 40%;}
    dd {min-width: 60%; margin: 0;}
    </style>`;
    e += "<dl>";
    for (let i in t)
      i != "timestamp" && (e += `<dt>${i}</dt><dd>${t[i]}</dd>`);
    return e += "</dl>", e;
  }
  draw(t = this.core.range) {
    if (this.core.config?.trades?.display === !1)
      return;
    this.scene.clear(), this.#e.length = 0;
    const i = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let s = this.theme.trades, r = this.core.rangeScrollOffset, o = t.indexStart - r, h = t.Length + r * 2, l, f;
    for (; h; ) {
      if (l = t.value(o), f = `${l[0]}`, Object.keys(this.trades).indexOf(f) >= 0)
        for (let m of this.trades[f])
          i.x = this.xAxis.xPos(l[0]) - this.xAxis.candleW / 2, i.y = this.yAxis.yPos(l[2]) - V(this.xAxis.candleW, s.iconMinDim, s.iconHeight) * 1.5, i.side = m.side, this.#e.push(this.#t.draw(i));
      o++, h--;
    }
  }
}
class Jl extends q {
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, s, r, o), this.params.content = o?.content || "";
  }
  set position(t) {
    this.target.setPosition(0, 0);
  }
  draw() {
    if (this.config?.watermark?.imgURL)
      A.isImage(this.config?.watermark?.imgURL, this.renderImage.bind(this));
    else if (E(this.config?.watermark?.text)) {
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
    h.font = De(r?.fontSize, r?.fontWeight, r?.fontFamily), h.textBaseline = "top", h.fillStyle = r.txtCol;
    const l = Ei(r), f = Ti(h, o, r), m = (this.scene.width - f) / 2, T = (this.scene.height - l) / 2;
    h.fillText(o, m, T);
  }
  renderImage(t) {
    if (!t)
      return;
    const e = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT, i = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH, s = (this.scene.width - i) / 2, r = (this.scene.height - e) / 2;
    this.scene.clear();
    const o = this.scene.context;
    o.save(), Cr(o, t, s, r, e, i), o.restore();
  }
}
const tc = {
  primaryPane: [
    ["watermark", { class: Jl, fixed: !0, required: !0, params: { content: null } }],
    ["grid", { class: gi, fixed: !0, required: !0, params: { axes: "y" } }],
    ["volume", { class: Dl, fixed: !1, required: !0, params: { maxVolumeH: ri.ONCHART_VOLUME_HEIGHT } }],
    ["candles", { class: yr, fixed: !1, required: !0 }],
    ["stream", { class: jl, fixed: !1, required: !0 }],
    ["cursor", { class: is, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: gi, fixed: !0, required: !0, params: { axes: "y" } }],
    ["cursor", { class: is, fixed: !0, required: !0 }]
  ]
}, $n = {
  primaryPane: {
    trades: { class: Ql, fixed: !1, required: !1 }
  },
  secondaryPane: {
    candles: { class: yr, fixed: !1, required: !0 }
  }
}, ft = {
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
  #n;
  #i;
  #s;
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
  #b;
  #P;
  #g;
  #C;
  #M = new dt();
  #L = new dt();
  #S = [0, 0];
  #E = !1;
  #A;
  #T;
  #x;
  #D = {
    valueMax: 100,
    valueMin: 0,
    valueDiff: 100
  };
  #R = {};
  constructor(t, e) {
    if (this.#s = t, this.#a = Oe.cnt, !v(e))
      return;
    this.#o = { ...e }, this.#r = this.#o.name, this.#n = this.#o.shortName, this.#i = this.#o.title, this.#c = this.#o.type == "primary" ? "primaryPane" : "secondaryPane", this.#g = this.#o.view, this.#f = this.#o.elements.elScale, this.#h = this.#o.parent, this.#d = this.#o.elements.elTarget, this.#d.id = this.id, this.legend = new bl(this.elLegend, this), this.isPrimary ? (ft.type = "chart", ft.title = this.title, ft.parent = this, ft.source = this.legendInputs.bind(this), this.legend.add(ft), this.yAxisType = "default") : (ft.type = "secondary", ft.title = "", ft.parent = this, ft.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(ft), this.yAxisType = this.core.indicatorClasses[e.view[0].type].ind.scale);
    const i = { ...e };
    i.parent = this, i.chart = this, i.elScale = this.elScale, i.yAxisType = this.yAxisType, this.scale = new Rl(this.core, i), this.#u = "init", this.log(`${this.name} instantiated`);
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
    return this.#e ? `${this.#e}` : `${this.#s.id}-${this.#r}_${this.#a}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#r;
  }
  get shortName() {
    return this.#n;
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
    return this.#s;
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
    return A.elementDimPos(this.#d);
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
    return this.#s.range;
  }
  get localRange() {
    return this.#D;
  }
  get stream() {
    return this.#b;
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
    this.#E = t;
  }
  get cursorActive() {
    return this.#E;
  }
  get cursorClick() {
    return this.#A;
  }
  get candleW() {
    return this.#s.Timeline.candleW;
  }
  get theme() {
    return this.#s.theme;
  }
  get config() {
    return this.#s.config;
  }
  get scrollPos() {
    return this.#s.scrollPos;
  }
  get bufferPx() {
    return this.#s.bufferPx;
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
    return tc[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#R;
  }
  set stateMachine(t) {
    this.#l = new $t(t, this);
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
    this.#w = this.#s.Timeline, this.createGraph(), this.#v.start(), this.draw(this.range), this.cursor = "crosshair", Wi.id = this.id, Wi.context = this, this.stateMachine = Wi, this.stateMachine.start(), this.eventsListen();
    const t = { chartPane: this };
    this.#m = this.core.WidgetsG.insert("Divider", t), this.#m.start(), this.#u = "running";
  }
  destroy() {
    if (this.#u !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.stateMachine.destroy(), this.Divider.destroy(), this.#v.destroy(), this.#p.destroy(), this.#T.destroy(), this.legend.destroy(), this.off("main_mousemove", this.onMouseMove), this.off(Se, this.onStreamListening), this.off(Le, this.onStreamNewValue), this.off(bt, this.onStreamUpdate), this.off(Pe, this.onStreamNewValue), this.off(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.off("chart_yAxisRedraw", this.onYAxisRedraw), this.element.remove(), this.#u = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting chart pane: ${this.id}`), this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#T = new Ct(this.#d, { disableContextMenu: !1 }), this.#T.on("pointerdrag", this.onChartDrag.bind(this)), this.#T.on("pointerdragend", this.onChartDragDone.bind(this)), this.#T.on("pointermove", this.onMouseMove.bind(this)), this.#T.on("pointerenter", this.onMouseEnter.bind(this)), this.#T.on("pointerout", this.onMouseOut.bind(this)), this.#T.on("pointerdown", this.onMouseDown.bind(this)), this.#T.on("pointerup", this.onMouseUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on(Se, this.onStreamListening, this), this.on(Le, this.onStreamNewValue, this), this.on(bt, this.onStreamUpdate, this), this.on(Pe, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
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
    this.#E = !1, this.#S = [Math.round(t.position.x), Math.round(t.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_mouseout`, this.#S);
  }
  onMouseDown(t) {
    this.#s.pointerButtons[t.domEvent.srcEvent.button] = !0, this.#A = [Math.floor(t.position.x), Math.floor(t.position.y)], this.stateMachine.state === "tool_activated" ? this.emit("tool_targetSelected", { target: this, position: t }) : this.isPrimary && this.emit("primary_pointerdown", this.#A);
  }
  onMouseUp(t) {
    this.#s.pointerButtons[t.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(t) {
    this.#b !== t && (this.#b = t);
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
    if (!E(t))
      return !1;
    this.#i = t, ft.title = t;
    const e = this.legend.list.chart.el.querySelectorAll(".title");
    for (let i of e)
      i.innerHTML = t;
    return !0;
  }
  setWatermark(t) {
    E(t.text) || E(t) ? this.core.config.watermark.text = t : "imgURL" in t && (this.core.config.watermark.imgURL = t);
  }
  setHeight(t) {
    x(t) || (t = this.height || this.#h.height), this.#d.style.height = `${t}px`, this.#f.style.height = `${t}px`, this.elViewport.style.height = `${t}px`, this.#v.setDimensions({ w: null, h: t });
  }
  setDimensions(t) {
    const e = this.config.buffer || wi;
    let { w: i, h: s } = t;
    i = this.width, s = s || this.height, this.setHeight(s), this.graph instanceof oe && (this.layerWidth = Math.round(i * ((100 + e) * 0.01)), this.graph.setSize(i, s, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.draw(void 0, !0), this.Divider.setPos());
  }
  setYAxisType(t) {
    if (!E(t) || !Zt.includes(t) || this.type == "primaryPane" && t == "percent")
      return !1;
    this.#x = t;
  }
  addOverlays(t) {
    if (!C(t) || t.length < 1)
      return !1;
    const e = [];
    for (let i of t) {
      const s = { fixed: !1, required: !1 };
      if (i.type in this.core.indicatorClasses)
        s.cnt = this.core.indicatorClasses[i.type].ind.cnt, s.id = `${this.id}-${i.type}_${s.cnt}`, s.class = this.core.indicatorClasses[i.type].ind;
      else if (i.type in $n[this.type])
        s.cnt = 1, s.id = `${this.id}-${i.type}`, s.class = $n[this.type][i.type].class;
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
    if (!E(t) || !(t in this.indicators))
      return !1;
    this.#R[t] = !0, this.indicators[t].instance.destroy(), this.graph.removeOverlay(t), this.draw(), Object.keys(this.indicators).length === 0 && !this.isPrimary && this.emit("destroyChartView", this.id), delete this.#R[t];
  }
  indicatorVisible(t, e) {
    return !E(t) || !(t in this.indicators) ? !1 : this.indicators[t].instance.visible(e);
  }
  indicatorSettings(t, e) {
    return !E(t) || !(t in this.indicators) ? !1 : this.indicators[t].instance.settings(e);
  }
  addTool(t) {
    let { layerConfig: e } = this.layerConfig(), i = new fi.Layer(e);
    this.#M.set(t.id, i), this.#C.addLayer(i), t.layerTool = i, this.#L.set(t.id, t);
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
    this.layerGrid.setPosition(this.#s.scrollPos, 0), this.overlayGrid.draw("y"), this.#p.render();
  }
  refresh() {
    this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  legendsVisibility(t) {
    this.legend.setCollapse(t);
  }
  updateLegends(t = this.#S, e = !1) {
    if (!(this.#s.isEmpty || !v(this.#y)))
      for (const i in this.#y.list)
        this.#y.update(i, { pos: t, candle: e });
  }
  legendInputs(t = this.cursorPos) {
    t = this.cursorPos;
    let e = {}, i = [], s = [!0, !0, !0, !0, !0], r = this.time.xPos2Index(t[0] - this.core.scrollPos);
    r = V(r, 0, this.range.data.length - 1);
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
    return !v(e) || !v(r) ? !1 : (i.insertBefore(t, e), o.insertBefore(s, r), this.Divider.setPos(), h !== null && (h.Divider.setPos(), h.Divider.show(), this.core.ChartPanes.swapKeys(this.id, e.id)), t.previousElementSibling === null && this.Divider.hide(), !0);
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
    return !v(e) || !v(r) ? !1 : (i.insertBefore(e, t), o.insertBefore(r, s), this.Divider.setPos(), h !== null && (h.Divider.setPos(), this.Divider.show(), this.core.ChartPanes.swapKeys(this.id, e.id)), e.previousElementSibling === null && h.Divider.hide(), !0);
  }
  createGraph() {
    let t = st(this.overlaysDefault);
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
    return x(t) && t > this.core.MainPane.rowMinH || (s = this.core.MainPane.cursorPos[5], r = this.height - s - 1, o = i.height + s), r >= this.core.MainPane.rowMinH && o >= this.core.MainPane.rowMinH && (e.setDimensions({ w: void 0, h: r }), i.setDimensions({ w: void 0, h: o }), e.Divider.setPos()), e.element.style.userSelect = "none", i.element.style.userSelect = "none", { active: e, prev: i };
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
    const t = this.element, e = t.previousElementSibling, i = t.nextElementSibling, s = t.parentNode, r = this.scale.element, o = r.previousElementSibling, h = r.nextElementSibling, l = r.parentNode, f = e !== null ? this.core.ChartPanes.get(e.id) : null, m = i !== null ? this.core.ChartPanes.get(i.id) : null;
    return {
      el: t,
      prevEl: e,
      nextEl: i,
      parentEl: s,
      scaleEl: r,
      prevScaleEl: o,
      nextScaleEl: h,
      parentScaleEl: l,
      prevPane: f,
      nextPane: m
    };
  }
  sibling(t) {
    t = ["prev", "next"].includes(t) ? t : "prev";
    let e = [...this.core.ChartPanes.keys()], i = e.indexOf(this.id);
    return t == "prev" ? --i : ++i, this.#s.ChartPanes.get(e[i]) || null;
  }
}
const jt = 0, Hn = 4;
class Nt extends q {
  static #t = 0;
  static get cnt() {
    return ++Nt.#t;
  }
  #e;
  #r;
  #n;
  #i;
  #s;
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
  #b;
  #P;
  constructor(t, e = !1, i = !1, s, r, o) {
    super(t, e, i, void 0, r, o), this.#r = q.cnt, this.#l = o, this.#a = o.overlay, this.#u = s.type, this.#c = s.indicator, this.#d = this.core.TALib, this.#f = this.xAxis.range, this.eventsListen();
  }
  get id() {
    return this.#e || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#r}`;
  }
  set id(t) {
    this.#e = String(t).replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#n;
  }
  set name(t) {
    this.#n = t;
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
    return this.#s;
  }
  set primaryPane(t) {
    this.#s = t;
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
    return this.#b;
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
    this.off(bt, this.onStreamUpdate), this.chart.legend.remove(this.#b), this.#P = "destroyed";
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.emit(`${this.chartPaneID}_removeIndicator`, { id: this.id, paneID: this.chartPaneID });
  }
  visible(t) {
    return Z(t) && (this.emit(`${this.chartPaneID}_visibleIndicator`, { id: this.id, paneID: this.chartPaneID, visible: t }), this.chartPane.indicators[this.id].layer.visible = t, this.draw()), this.chartPane.indicators[this.id].layer.visible;
  }
  settings(t) {
    return v(t) && (v(t?.config) && (this.params.overlay.settings = { ...this.params.overlay.settings, ...t.config }), v(t?.style) && (this.style = { ...this.style, ...t.style }), this.draw()), {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition
    };
  }
  eventsListen() {
    this.on(bt, this.onStreamUpdate, this);
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
    if (_(t?.fn)) {
      let e = Hn.fn(this);
      if (t?.own)
        return e;
    } else if (_(this.core.config.callbacks?.indicatorSettings?.fn)) {
      let e = this.core.config.callbacks.indicatorSettings.fn(this);
      if (this.core.config.callbacks?.indicatorSettings?.own)
        return e;
    }
    this.core.log(`invokeSettings: ${this.id}`);
  }
  defineIndicator(t, e) {
    v(t) || (t = {}), this.definition.output = e.outputs;
    const i = { ...this.definition.input, ...t };
    delete i.style;
    for (let s of e.options)
      if (s.name in i)
        if (typeof i[s.name] !== s.type) {
          i[s.name] = s.defaultValue;
          continue;
        } else
          "range" in s && (i[s.name] = V(i[s.name], s.range.min, s.range.max));
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
    this.#b = this.chart.legend.add(t);
  }
  legendInputs(t = this.chart.cursorPos) {
    const e = [this.style.stroke];
    let s = this.Timeline.xPos2Index(t[0]) - (this.range.data.length - this.overlay.data.length), r = V(this.overlay.data.length - 1, 0, 1 / 0);
    return s = V(s, 0, r), { c: s, colours: e };
  }
  indicatorInput(t, e) {
    let i = [];
    do
      i.push(this.range.value(t)[Hn]);
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
    if (!E(t) || !(t in this.TALib) || !v(i) || !this.core.TALibReady)
      return !1;
    e.timePeriod = e.timePeriod || this.definition.input.timePeriod;
    let s, r, o = e.timePeriod;
    if (i instanceof ji)
      s = 0, r = i.dataLength - o + 1;
    else if ("indexStart" in i || "indexEnd" in i || "tsStart" in i || "tsEnd" in i)
      s = i.indexStart || this.Timeline.t2Index(i.tsStart || 0) || 0, r = i.indexEnd || this.Timeline.t2Index(i.tsEnd) || this.range.Length - 1;
    else
      return !1;
    if (r - s < o)
      return !1;
    let h = [], l, f, m;
    for (; s < r; ) {
      e.inReal = this.indicatorInput(s, s + o), m = this.TALib[t](e), f = [], l = 0;
      for (let T of this.definition.output)
        f[l++] = m[T.name][0];
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
    if (!this.core.TALibReady || !E(t) || !(t in this.TALib) || !(i instanceof ji) || i.dataLength < this.definition.input.timePeriod)
      return !1;
    let s = this.TALib[t](e), r = i.dataLength, o = i.value(r)[0], h = [], l = 0;
    for (let f of this.definition.output)
      h[l++] = s[f.name][0];
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
        Q[e](s, r, i);
        break;
      case "renderLineHorizontal":
        Q[e](s, r[0], r[1], r[2], i);
        break;
      case "renderLineVertical":
        Q[e](s, r[0], r[1], r[2], i);
        break;
      case "renderPathStroke":
        Q[e](s, r, i.style, i);
        break;
      case "renderPathClosed":
        Q[e](s, r, i);
        break;
      case "renderSpline":
        Q[e](s, r, i);
        break;
      case "renderRect":
        Q[e](s, r[0], r[1], r[2], r[3], i);
        break;
      case "renderRectRound":
        Q[e](s, r[0], r[1], r[2], r[3], r[4], i);
        break;
      case "renderPolygonRegular":
        Q[e](s, r[0], r[1], r[2], r[3], r[4], i);
        break;
      case "renderPolygonIrregular":
        Q[e](s, r, i);
        break;
      case "renderTriangle":
        Q[e](s, r[0], r[1], r[2], i);
        break;
      case "renderDiamond":
        Q[e](s, r[0], r[1], r[2], r[3], i);
        break;
      case "renderCircle":
        Q[e](s, r[0], r[1], r[2], i);
        break;
      case "renderImage":
        Q[e](s, i.src, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
    }
    s.restore();
  }
  draw() {
  }
}
const Fi = {
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
      v(n) && n.element.style.removeProperty("user-select"), v(t) && t.element.style.removeProperty("user-select");
    }
  }
}, ec = [
  ["grid", { class: gi, fixed: !1, required: !0, params: { axes: "x" } }]
], ic = ["candles", "trades"];
class Ar {
  #t = "MainPane";
  #e = "Main";
  #r;
  #n;
  #i;
  #s;
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
  #b;
  #P;
  #g = new dt();
  #C;
  #M;
  #L;
  #S = [];
  #E = sn;
  #A = en;
  #T = {};
  #x = [0, 0];
  #D = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #R;
  #k;
  #U;
  #I;
  constructor(t, e) {
    this.#i = t, this.#r = e, this.#n = t, this.#l = this.#i.elMain, this.#h = this.#i.elYAxis, this.init(e);
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
    return this.#A;
  }
  set rowMinH(t) {
    x(t) && (this.#A = Math.abs(t));
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return A.elementDimPos(this.#l);
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
    this.#s = new $t(t, this);
  }
  get stateMachine() {
    return this.#s;
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
      const e = { height: di };
      this.#i.theme.time = { ...this.#i.theme?.time, ...e }, this.#a.style.height = `calc(100% - ${di}px)`;
    }
    this.#M = new El(this.#i, t), this.registerChartViews(t), this.#R = x(this.config.buffer) ? this.config.buffer : wi, this.#A = x(this.config.rowMinH) ? this.config.rowMinH : en, this.#E = x(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : sn, this.rowsOldH = this.rowsH, this.log(`${this.#t} instantiated`);
  }
  start() {
    let t = 0;
    this.#l.start(this.theme), this.#M.start(), this.#g.forEach((e, i) => {
      e.start(t++), t === 1 && e.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.createGraph(), this.draw(this.range, !0), ei.init({
      graphs: [this.#m],
      range: this.range
    }), ei.start(), ei.queueFrame(this.range, [this.#m], !1), this.eventsListen(), Fi.id = this.id, Fi.context = this, this.stateMachine = Fi, this.stateMachine.start();
  }
  destroy() {
    this.#o = !0, this.stateMachine.destroy(), this.#M.destroy(), this.#g.forEach((t, e) => {
      this.#S[e] = !0, t.destroy(), delete this.#S[e];
    }), this.#m.destroy(), this.#I.destroy(), this.off(Pe, this.onFirstStreamValue), this.off(Le, this.onNewStreamValue), this.off("setRange", this.draw), this.off("scrollUpdate", this.draw), this.off("chart_render", this.draw), this.off("destroyChartView", this.removeChartPane);
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
    this.#a.tabIndex = 0, this.#a.focus(), this.#I = new Ct(this.#a, { disableContextMenu: !1 }), this.#I.on("keydown", this.onChartKeyDown.bind(this)), this.#I.on("keyup", this.onChartKeyUp.bind(this)), this.#I.on("wheel", this.onMouseWheel.bind(this)), this.#I.on("pointerenter", this.onMouseEnter.bind(this)), this.#I.on("pointerout", this.onMouseOut.bind(this)), this.#I.on("pointerup", this.onChartDragDone.bind(this)), this.#I.on("pointermove", this.onMouseMove.bind(this)), this.on(Pe, this.onFirstStreamValue, this), this.on(Le, this.onNewStreamValue, this), this.on("setRange", this.draw, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
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
    const i = this.range, s = i.indexStart - Math.floor(e * Xs * i.Length), r = i.indexEnd + Math.ceil(e * Xs * i.Length);
    this.#i.setRange(s, r), this.draw(this.range, !0);
  }
  onMouseMove(t) {
    const e = this.#T;
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
    this.#i.scrollPos = -1, this.#M.setDimensions({ w: i }), this.#m.setSize(i, s, r), this.#g.size == 1 && e != this.#a.height ? this.#C.setDimensions({ w: i, h: this.#a.height }) : this.#g.forEach((h, l) => {
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
    return t.type == "primary" ? (o = new Oe(this.#i, t), this.#C = o) : (t.name = t.view[0].name || "Secondary", t.shortName = t.view[0].type || "Secondary", o = new Oe(this.#i, t)), this.#g.set(o.id, o), this.emit("addChartView", o), o;
  }
  removeChartPane(t) {
    if (!E(t) || !this.#g.has(t))
      return !1;
    const e = this.#g.get(t);
    if (e.isPrimary)
      return this.#i.error(`Cannot remove primary chart pane! ${t}`), !1;
    this.#S[t] = !0;
    let i = this.rowsW, s = e.viewport.height, r = Math.floor(s / (this.#g.size - 1)), o = s % r;
    return e.status !== "destroyed" && e.destroy(), this.#g.delete(t), delete this.#S[t], this.#g.forEach((h, l) => {
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
        v(r) && (r.type in this.core.indicatorClasses || ic.includes(r.type)) || (this.#i.log(`indicator ${i.type} not added: not supported.`), i.splice(s, 1));
    }
    return t;
  }
  addIndicator(t, e = t, i = {}) {
    if (!E(t) && !(t in this.#k) && !E(e) && !v(i))
      return !1;
    this.log(`Adding the ${e} : ${t} indicator`), C(i?.data) || (i.data = []), v(i?.settings) || (i.settings = {});
    let s;
    if (this.#k[t].ind.primaryPane) {
      const r = {
        type: t,
        name: e,
        ...i
      };
      s = this.#C.addIndicator(r);
    } else {
      this.core.indicatorClasses[t].ind.primaryPane === "both" && Z(t.primaryPane) && t.primaryPane, C(i.view) || (i.view = [{ name: e, type: t, ...i }]);
      for (let o = 0; o < i.view.length; o++)
        (!v(i.view[o]) || !er(["name", "type"], Object.keys(i.view[o]))) && i.view.splice(o, 1);
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
    if (!E(t))
      return !1;
    for (const e of this.#g.values())
      if (t in e.indicators)
        return e.indicators[t].instance;
  }
  removeIndicator(t) {
    if (E(t)) {
      for (const e of this.#g.values())
        if (t in e.indicators)
          return e.indicators[t].instance.remove(), !0;
    } else
      return t instanceof Nt ? (t.remove(), !0) : !1;
  }
  indicatorSettings(t, e) {
    if (E(t)) {
      for (const i of this.#g.values())
        if (t in i.indicators)
          return i.indicators[t].instance.settings(e);
    } else
      return t instanceof Nt ? t.settings(e) : !1;
  }
  calcChartPaneHeights() {
    const t = this.#g.size + 1, e = this.#E * (t - 1), i = e / Math.log10(e * 2) / 100;
    Math.round(this.rowsH * i);
    const s = {};
    if (t === 1)
      s.new = this.rowsH;
    else if (t === 2) {
      const r = this.#g.firstKey(), o = Math.round(this.rowsH * this.#E / 100);
      s[r] = this.rowsH - o, s.new = o;
    } else if (t === 3) {
      const r = this.#g.firstEntry(), o = this.#g.lastEntry(), h = Math.round(this.rowsH * this.#E / 100);
      let l = this.rowsH / (this.rowsH + h);
      s[r[0]] = Math.floor(r[1].viewport.height * l), s[o[0]] = Math.floor(o[1].viewport.height * l), s.new = Math.floor(h * l), s.new += this.rowsH - (s[r[0]] + s[o[0]] + s.new);
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
    const e = el + ` width: 100%; border-top: 1px solid ${this.theme.secondaryPane.separator};`;
    return `
    <div slot="chartpane" class="viewport scale ${t}" style="$${e}"></div>
  `;
  }
  createGraph() {
    let t = st(ec);
    this.#m = new oe(this, this.#p, t);
  }
  draw(t = this.range, e = !1) {
    const i = [
      this.#m,
      this.#M,
      this.#C
    ];
    this.time.xAxis.doCalcXAxisGrads(t), this.#g.forEach((s, r) => {
      i.push(s);
    }), ei.queueFrame(
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
const Bn = 20, sc = 20, nc = new gr(z.COLOUR_BORDER), ss = document.createElement("template");
ss.innerHTML = `
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
    border: 1px solid var(--txc-time-scrollbar-color, ${z.COLOUR_BORDER});
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
    background-color: var(--txc-time-handle-color, ${nc.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${Bn}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${z.COLOUR_ICON});
    width: ${Bn}px;
    height: ${sc}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${z.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${zh}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${Uh}</span>
</div>
`;
class rc extends nt {
  #t;
  constructor() {
    super(ss), this.#t = ss;
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
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", rc);
const Ir = document.createElement("template");
Ir.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${di}px;
  }
  tradex-overview {
    height: ${lr}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class oc extends nt {
  constructor() {
    super(Ir);
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
customElements.get("tradex-time") || window.customElements.define("tradex-time", oc);
const Or = document.createElement("template");
Or.innerHTML = `
<style>
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <div class="viewport"></div>
`;
class ac extends nt {
  constructor() {
    super(Or);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.shadowRoot.querySelector(".viewport");
  }
}
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", ac);
const Rr = document.createElement("template");
Rr.innerHTML = `
<style>

.legends {
  display: flex;
  flex-direction: column;
}
.legends .collapse {
  order: 999;
  padding-left: 0.5em;
}

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


.legends.hide .legend.indicator {
  display:none;
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
  <div class="controls collapse">
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${kh}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${Dh}</span>
  </div>
</div>
`;
class hc extends nt {
  #t;
  #e;
  #r;
  #n;
  #i;
  #s;
  #o = [];
  constructor() {
    super(Rr);
  }
  destroy() {
  }
  connectedCallback() {
    this.doInit && (this.doInit = !1, this.shadowRoot.appendChild(this.template.content.cloneNode(!0)), this.style.display = "block", this.#s = this.shadowRoot.querySelector("slot"), this.#e = this.shadowRoot.querySelector(".legends"), this.#r = this.shadowRoot.querySelector(".title"), this.#n = this.shadowRoot.querySelector("dl"), this.#i = this.shadowRoot.querySelector(".controls"), this.#s.addEventListener("slotchange", this.onSlotChange.bind(this)));
  }
  disconnectedCallback() {
  }
  get slot() {
    return this.#s;
  }
  get legends() {
    return this.#e;
  }
  get elTitle() {
    return this.#r;
  }
  get elInputs() {
    return this.#n;
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
    E && (this.#t = t, this.elTitle.innerHTML = t);
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
      let l = t?.colours?.[e] ? ` color: ${t.colours[e]};` : "", f = t?.inputs?.[s] !== void 0 ? t.inputs[s] : r, m = t?.labels?.[e] ? `${s}:` : r;
      o += t?.labels?.[e] ? "1em;" : ".25em", i += `<dt style="${o}">${m}</dt>
      <dd style="${h}${l}">${f}</dd>`, ++e;
    }
    return i;
  }
  buildControls(t) {
    let e = "", i = t.id;
    return e += `<span id="${i}_up" class="control" data-icon="up">${_h}</span>`, e += `<span id="${i}_down" class="control" data-icon="down">${Nh}</span>`, e += `<span id="${i}_collapse" class="control" data-icon="visible">${Bh}</span>`, e += `<span id="${i}_maximize" class="control" data-icon="maximize">${Hh}</span>`, e += `<span id="${i}_restore" class="control" data-icon="restore">${$h}</span>`, e += t?.type !== "chart" ? `<span id="${i}_remove" class="control" data-icon="remove">${Rh}</span>` : "", e += t?.type !== "secondary" ? `<span id="${i}_config" class="control" data-icon="config">${ar}</span>` : "", e;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", hc);
const kr = document.createElement("template");
kr.innerHTML = `
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
class lc extends nt {
  #t;
  #e;
  constructor() {
    super(kr);
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
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", lc);
const Dr = document.createElement("template");
Dr.innerHTML = `
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
class cc extends nt {
  #t;
  #e;
  #r;
  #n;
  constructor() {
    super(Dr);
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
    this.#t = this.#r ? this.#r : this.clientWidth, this.#e = this.#n ? this.#n : this.clientHeight, this.#r = this.clientWidth, this.#n = this.clientHeight;
  }
}
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", cc);
const _r = document.createElement("template");
_r.innerHTML = `
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
    height: calc(100% - ${ui}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${z.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${ne}px);
    height: ${ui}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class dc extends nt {
  #t;
  #e;
  constructor() {
    super(_r);
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
    let t = x(this.#e?.time?.height) ? this.#e.time.height : ui, e = this.#e.tools.location == "none" ? 60 : 0;
    this.rows.style.height = `calc(100% - ${t}px)`, this.rows.style.left = `${e}px`, this.time.style.left = `${e}px`, this.viewport.style.left = `${e}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", dc);
const Nr = document.createElement("template");
Nr.innerHTML = `
  <slot></slot>
`;
class uc extends nt {
  constructor() {
    super(Nr);
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
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", uc);
const $r = document.createElement("template");
$r.innerHTML = `
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
class fc extends nt {
  constructor() {
    super($r);
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
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", fc);
const gc = `
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
`, Hr = document.createElement("template");
Hr.innerHTML = gc;
class mc extends nt {
  #t;
  constructor() {
    super(Hr);
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
    let e = x(this.#t?.tools?.width) ? this.#t.tools.width : kt, i;
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
customElements.get("tradex-body") || window.customElements.define("tradex-body", mc);
const Br = document.createElement("template");
Br.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class pc extends nt {
  constructor() {
    super(Br);
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
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", pc);
const Ur = document.createElement("template");
Ur.innerHTML = `
  <slot name="widget"></slot>
`;
class vc extends nt {
  constructor() {
    super(Ur);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", vc);
const yc = `
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
      min-height: ${Vt - _t}px;
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
class wc extends nt {
  #t;
  #e;
  #r;
  #n;
  #i = ci;
  #s = Vt;
  #o;
  #h;
  #l;
  #a;
  #c;
  constructor() {
    const t = document.createElement("template");
    t.innerHTML = yc, super(t, "closed"), this.#n = t;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#n.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = hr, this.elWidgetsG = this.shadowRoot.querySelector("tradex-widgets"), this.elUtils = this.shadowRoot.querySelector("tradex-utils"), this.elBody = this.shadowRoot.querySelector("tradex-body"), this.elMain = this.elBody.main, this.elTime = this.elBody.main.time, this.elTools = this.elBody.tools, this.elYAxis = this.elBody.scale, this.previousDimensions();
      let t = this.getAttribute("height") || "100%", e = this.getAttribute("width") || "100%";
      this.setDimensions(e, t), this.resizeObserver = new ResizeObserver(Et(this.onResized, 50, this)), this.resizeObserver.observe(this);
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
  get dimensions() {
    return this.getBoundingClientRect();
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
    this.log(`onResize w: ${this.offsetWidth}, h: ${this.offsetHeight}`), v(this.MainPane) && this.MainPane instanceof Ar && (this.previousDimensions(), this.emit("global_resize", { w: this.offsetWidth, h: this.offsetHeight }));
  }
  previousDimensions() {
    this.#o = this.#l ? this.#l : this.offsetWidth, this.#h = this.#a ? this.#a : this.offsetHeight, this.#l = this.offsetWidth, this.#a = this.offsetHeight;
  }
  setWidth(t) {
    x(t) ? (this.#i = t, t += "px") : E(t) || (this.#i = this.parentElement.getBoundingClientRect().width, t = this.#i + "px"), this.style.width = t;
  }
  setHeight(t) {
    x(t) ? (this.#s = t, t += "px") : E(t) || (this.#s = this.parentElement.getBoundingClientRect().height, w = this.#s + "px"), this.style.height = t;
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
      e = o.height ? o.height : h.height ? h.height : Vt, t = o.width ? o.width : h.width ? h.width : ci;
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
        this.#c.utils.location = "none", this.#c.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${Vt}px`;
        break;
      case "top":
      default:
        this.#c.utils.location = "top", this.#c.utils.height = _t, this.elUtils.style.display = "block", this.elUtils.style.height = `${_t}px`, this.elBody.style.height = `calc(100% - ${_t}px)`, this.elBody.style.minHeight = `${Vt - _t}px`;
    }
  }
}
const xc = [
  {
    id: "indicators",
    name: "Indicators",
    icon: bh,
    event: "utils_indicators",
    sub: []
  },
  {
    id: "timezone",
    name: "Timezone",
    icon: Ch,
    event: "utils_timezone"
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: Sh,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: ar,
    event: "utils_settings"
  }
], Tc = {
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
}, Ec = {
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
}, Sc = {
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
}, bc = {
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
class Ts extends Nt {
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
    this.id = o.overlay?.id || tt(this.shortName), this.defineIndicator(h?.settings, Tc), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (l) => {
      this.newValue(l);
    }, this.setUpdateValue = (l) => {
      this.updateValue(l);
    }, this.addLegend();
  }
  get primaryPane() {
    return Ts.primaryPane;
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
    let o = t.value(t.indexStart)[0], h = this.overlay.data[0][0], l = (o - h) / t.interval, f = this.Timeline.rangeScrollOffset, m = t.Length + f + 2, T = {};
    for (; m; )
      l < 0 || l >= this.overlay.data.length ? (e.lower.push({ x: null, y: null }), e.middle.push({ x: null, y: null }), e.upper.push({ x: null, y: null })) : (r.x = this.xAxis.xPos(i[l][0]), r.y = this.yAxis.yPos(i[l][1][0]), e.lower.push({ ...r }), r.x = this.xAxis.xPos(i[l][0]), r.y = this.yAxis.yPos(i[l][1][1]), e.middle.push({ ...r }), r.x = this.xAxis.xPos(i[l][0]), r.y = this.yAxis.yPos(i[l][1][2]), e.upper.push({ ...r })), l++, m--;
    T = {
      width: this.style.lowerLineWidth,
      stroke: this.style.lowerStroke,
      dash: this.style.lowerLineDash
    }, this.plot(e.lower, "renderLine", T), T = {
      width: this.style.middleLineWidth,
      stroke: this.style.middleStroke,
      dash: this.style.middleLineDash
    }, this.plot(e.middle, "renderLine", T), T = {
      width: this.style.upperLineWidth,
      stroke: this.style.upperStroke,
      dash: this.style.upperLineDash
    }, this.plot(e.upper, "renderLine", T), this.target.viewport.render();
  }
}
class mi extends Nt {
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
    super(t, e, i, s, r, o), mi.inCnt++;
    const h = o.overlay;
    this.id = o.overlay?.id || tt(this.shortName), this.defineIndicator(h?.settings, Ec), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (l) => {
      this.newValue(l);
    }, this.setUpdateValue = (l) => {
      this.updateValue(l);
    }, this.addLegend();
  }
  get primaryPane() {
    return mi.primaryPane;
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
    let o = this.Timeline.rangeScrollOffset, h = t.data.length - this.overlay.data.length, l = t.indexStart - h - 2, f = t.Length + o * 2 + 2;
    for (; f; )
      l < 0 || l >= this.overlay.data.length ? s.push({ x: null, y: null }) : (r.x = this.xAxis.xPos(e[l][0]), r.y = this.yAxis.yPos(e[l][1]), s.push({ ...r })), l++, f--;
    this.plot(s, "renderLine", this.style), this.target.viewport.render();
  }
}
class Es extends Nt {
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
    this.id = o.overlay?.id || tt(this.shortName), this.defineIndicator(h?.settings, Sc), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (l) => {
      this.newValue(l);
    }, this.setUpdateValue = (l) => {
      this.updateValue(l);
    }, this.addLegend();
  }
  get primaryPane() {
    return Es.primaryPane;
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
    const h = this.overlay.data, l = this.xAxis.candleW;
    r.length = 0, this.Timeline.smoothScrollOffset;
    const f = {
      w: l
    };
    let m = this.Timeline.rangeScrollOffset, T = t.data.length - this.overlay.data.length, b = t.indexStart - T - 2, P = t.Length + m * 2 + 2;
    for (; P; )
      b < 0 || b >= this.overlay.data.length ? r.push({ x: null, y: null }) : (f.x = this.xAxis.xPos(h[b][0]), f.y = this.yAxis.yPos(h[b][1]), r.push({ ...f })), b++, P--;
    this.plot(r, "renderLine", this.style), this.target.viewport.render();
  }
}
class pi extends Nt {
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
    super(t, e, i, s, r, o), pi.inCnt++;
    const h = o.overlay;
    this.id = o.overlay?.id || tt(this.shortName), this.defineIndicator(h?.settings, bc), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...s.style }, this.calcIndicatorHistory(), this.setNewValue = (l) => {
      this.newValue(l);
    }, this.setUpdateValue = (l) => {
      this.updateValue(l);
    }, this.addLegend();
  }
  get primaryPane() {
    return pi.primaryPane;
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
    let o = this.Timeline.rangeScrollOffset, h = t.data.length - this.overlay.data.length, l = t.indexStart - h - 2, f = t.Length + o * 2 + 2;
    for (; f; )
      l < 0 || l >= this.overlay.data.length ? s.push({ x: null, y: null }) : (r.x = this.xAxis.xPos(e[l][0]), r.y = this.yAxis.yPos(e[l][1]), s.push({ ...r })), l++, f--;
    this.plot(s, "renderLine", this.style), this.target.viewport.render();
  }
}
const zr = {
  BB: { id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: Ts },
  EMA: { id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: mi },
  RSI: { id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: Es },
  SMA: { id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: pi }
};
class Cc {
  #t = "Utilities";
  #e = "utils";
  #r;
  #n;
  #i;
  #s;
  #o;
  #h;
  #l = {};
  #a = {};
  #c;
  #u = {};
  constructor(t, e) {
    this.#r = t, this.#n = e, this.#i = t.elUtils, this.#s = t.config?.utilsBar || xc, this.#o = t.WidgetsG, this.#h = t.indicatorClasses || zr, this.init();
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
    return this.#n;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return A.elementDimPos(this.#i);
  }
  get stateMachine() {
    return this.#c;
  }
  init() {
    this.#i.innerHTML = this.#i.defaultNode(this.#s), this.log(`${this.#t} instantiated`);
  }
  start() {
    this.initAllUtils(), this.eventsListen();
  }
  destroy() {
    const t = this.#r, e = A.findBySelectorAll(`#${t.id} .${ma} .icon-wrapper`);
    for (let i of e) {
      let s = i.id.replace("TX_", "");
      for (let r of this.#s)
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
    const e = A.findTargetParentWithClass(t.target, "icon-wrapper");
    if (!v(e))
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
      for (let r of this.#s)
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
  #n = null;
  #i = "Line Tool";
  #s = "TX_Tool";
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
  #b = { TL: [0, 0], BR: [0, 0] };
  constructor(t) {
    this.#h = t, this.#n = t.cnt, this.#r = this.#h.ID || tt("TX_Tool_"), this.#i = t.name, this.#l = t.core, this.#u = t.elements.elChart, this.#a = { ...t.parent }, this.#w = t.target, this.#w.addTool(this), this.#f = this.#v.viewport, this.#d = this.#f.scene.canvas, this.#m = t.pos;
  }
  set id(t) {
    this.#r = String(t).replace(/ |,|;|:|\.|#/g, "_");
  }
  get id() {
    return this.#r ? `${this.#r}` : `${this.#l.id}-${this.#s}_${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get inCnt() {
    return this.#n;
  }
  get name() {
    return this.#i;
  }
  get shortName() {
    return this.#s;
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
    this.#c = new Ct(this.#d, { disableContextMenu: !1 }), this.#c.on("mousemove", this.onMouseMove.bind(this));
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
class Mc extends St {
  constructor(t) {
    super(t);
  }
}
class Pc extends St {
  constructor(t) {
    super(t);
  }
}
class Lc extends St {
  constructor(t) {
    super(t);
  }
}
class Ac extends St {
  constructor(t) {
    super(t);
  }
}
const Ic = [
  {
    id: "cursor",
    name: "Cursor",
    icon: Mh,
    event: "tool_activated"
  },
  {
    id: "line",
    name: "Line",
    icon: Je,
    event: "tool_activated"
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: Lh,
    event: "tool_activated",
    class: Mc,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: Je
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: Ih,
    event: "tool_activated",
    class: Lc,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: Je
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: Oh,
    event: "tool_activated",
    class: Ac,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: Je
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: Ah,
    event: "tool_activated",
    class: Pc
  },
  {
    id: "delete",
    name: "Delete",
    icon: Ph,
    event: "tool_activated",
    class: void 0
  }
], Vi = {
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
class Oc {
  #t;
  #e = "Toolbar";
  #r = "tools";
  #n;
  #i;
  #s;
  #o;
  #h;
  #l = St;
  #a;
  #c = {};
  #u = void 0;
  #d;
  #f = { click: [], pointerover: [] };
  constructor(t, e) {
    this.#n = t, this.#i = e, this.#o = t.elTools, this.#a = Ic || t.config.tools, this.#h = t.WidgetsG, this.init();
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
  get core() {
    return this.#n;
  }
  get options() {
    return this.#i;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return A.elementDimPos(this.#o);
  }
  set stateMachine(t) {
    this.#s = new $t(t, this);
  }
  get stateMachine() {
    return this.#s;
  }
  init() {
    this.mount(this.#o), this.log(`${this.#e} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), Vi.id = this.id, Vi.context = this, this.stateMachine = Vi, this.stateMachine.start();
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
    this.#n.on(t, e, i);
  }
  off(t, e) {
    this.#n.off(t, e);
  }
  emit(t, e) {
    this.#n.emit(t, e);
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
            for (let l of r.sub)
              this.#c[l.id] = l.class;
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
const Rc = 150;
class ht {
  #t;
  #e;
  #r;
  #n;
  #i;
  #s;
  #o;
  #h;
  #l;
  #a = {};
  static menuList = {};
  static menuCnt = 0;
  static class = nn;
  static name = "Menus";
  static type = "Menu";
  static currentActive;
  constructor(t, e) {
    this.#e = t, this.#r = e.core, this.#n = e, this.#t = e.id, this.#s = t.elements.elMenus, this.#i = this.#r.elWidgetsG, this.init();
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
    return A.elementDimPos(this.#o);
  }
  get type() {
    return ht.type;
  }
  init() {
    this.mount(this.#s);
  }
  start() {
    this.position(this.#n.primary), this.eventsListen();
  }
  end() {
    this.#s.querySelectorAll(`#${this.id} li`).forEach((e) => {
      e.removeEventListener("click", this.#a[this.id][e.id]);
    }), document.removeEventListener("click", this.#a[this.id].outside);
  }
  eventsListen() {
    const t = this.#s.querySelectorAll(`#${this.id} li`);
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
    if (!this.#o.contains(t.target) && !this.#n.primary.contains(t.target) && A.isVisible(this.#o)) {
      let e = {
        target: t.currentTarget.id,
        menu: this.#t
      };
      this.emit("menu_close", e);
    }
    document.removeEventListener("click", this.#a[this.id].outside);
  }
  mount(t) {
    t.lastElementChild == null ? t.innerHTML = this.menuNode() : t.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#o = this.#s.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${nn}" style=""></div>
    `;
  }
  menuNode() {
    const t = this.#n, e = `position: absolute; z-index: 1000; display: none; border: 1px solid ${$i.COLOUR_BORDER}; background: ${$i.COLOUR_BG}; color: ${$i.COLOUR_TXT};`;
    let i = this.content(t);
    return `
      <div id="${t.id}" class="${pa}" style="${e}">
        ${i}
      </div>
    `;
  }
  content(t) {
    const e = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${Rc}px`, i = "padding: .25em 1em .25em 1em; white-space: nowrap;", s = "display: inline-block; width: 4em;", r = "cursor: pointer;", o = `onmouseover="this.style.background ='#222'"`, h = `onmouseout="this.style.background ='none'"`;
    let l = `<ul style="${e}">`;
    if (t?.content)
      for (let f of t.content)
        l += `<li id="${f.id}" data-event="${f.event}" style="${i} ${r}" ${o} ${h}><a style="${r}"><span style="${s}">${f.id}</span><span>${f.name}</span></li></a>`;
    return l += "</ul>", l;
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
    let t = A.elementDimPos(this.#o);
    if (t.left + t.width > this.#i.offsetWidth) {
      let i = Math.floor(this.#i.offsetWidth - t.width);
      i = V(i, 0, this.#i.offsetWidth), this.#o.style.left = `${i}px`;
    }
    setTimeout(() => {
      this.#a[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#a[this.id].outside);
    }, 250);
  }
  close() {
    ht.currentActive = null, this.#o.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class J {
  #t;
  #e;
  #r;
  #n;
  #i;
  #s;
  #o;
  #h;
  #l;
  #a;
  #c;
  #u;
  #d;
  #f = {};
  static windowList = {};
  static windowCnt = 0;
  static class = on;
  static name = "Windows";
  static type = "Window";
  static currentActive = null;
  static create(t, e) {
    const i = `window_${++J.windowCnt}`;
    return e.id = i, J.windowList[i] = new J(t, e), J.windowList[i];
  }
  static destroy(t) {
    J.windowList[t].destroy(), delete J.windowList[t];
  }
  constructor(t, e) {
    this.#e = t, this.#r = e.core, this.#n = e, this.#t = e.id, this.#s = t.elements.elWindows, this.#i = this.#r.elWidgetsG, this.init();
  }
  get id() {
    return this.#t;
  }
  get pos() {
    return this.dimensions;
  }
  get config() {
    return this.#n;
  }
  set config(t) {
    this.#n = t;
  }
  get dimensions() {
    return A.elementDimPos(this.#o);
  }
  set dimensions(t) {
    this.setDimensions(t);
  }
  get type() {
    return J.type;
  }
  get el() {
    return this.#o;
  }
  get elDragBar() {
    return this.#h;
  }
  get elTitle() {
    return this.#l;
  }
  get elCloseIcon() {
    return this.#a;
  }
  get elContent() {
    return this.#c;
  }
  init() {
    this.mount(this.#s);
  }
  start() {
    this.eventsListen(), this.open();
  }
  destroy() {
    this.off("closeWindow", this.onCloseWindow), this.el.remove();
  }
  eventsListen() {
    this.on("closeWindow", this.onCloseWindow, this);
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
    if (!this.#o.contains(t.target) && A.isVisible(this.#o)) {
      let e = {
        target: t.currentTarget.id,
        window: this.#t
      };
      this.emit("closeWindow", e), document.removeEventListener("click", this.#f.click);
    }
  }
  onCloseWindow(t) {
    t.window === this.#t && this.close();
  }
  mount(t) {
    t.lastElementChild == null ? t.innerHTML = this.windowNode() : t.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#o = this.#s.querySelector(`#${this.#n.id}`), this.#h = this.#o.querySelector(".dragBar"), this.#l = this.#o.querySelector(".title"), this.#a = this.#o.querySelector(".closeIcon"), this.#c = this.#o.querySelector(".content");
    let e, i;
    if (v(this.#n.position))
      e = this.#n.x, i = this.#n.y;
    else {
      let s = A.elementDimPos(this.#o);
      e = (this.#r.width - s.width) / 2, i = (this.#r.height - s.height) / 2;
    }
    this.#o.style.bottom = `${i}px`, this.#o.style.left = `${e}px`;
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${on}" style=""></div>
    `;
  }
  windowNode() {
    const t = this.#n;
    let e = `position: absolute; z-index: 10; display: block; border: 1px solid ${Hi.COLOUR_BORDER}; background: ${Hi.COLOUR_BG}; color: ${Hi.COLOUR_TXT};`, i = this.config?.styles?.window;
    for (let f in i)
      e += `${f}: ${i[f]}; `;
    let s = t.dragBar ? this.dragBar(t) : "", r = !t.dragBar && t.title ? this.title(t) : "", o = this.content(t), h = this.closeIcon(t);
    return `
      <div id="${t.id}" class="${va}" style="${e}">
          ${s}
          ${r}
          ${h}
          ${o}
        </div>
      </div>
    `;
  }
  content(t) {
    let e = this.config?.styles?.content, i = "";
    for (let o in e)
      i += `${o}: ${e[o]}; `;
    let s = t?.content ? t.content : "";
    return `
      <div class="content" style="${i}">
        ${s}
      </div>
    `;
  }
  dragBar(t) {
    const e = "cursor: grab;", i = `onmouseover="this.style.background ='#222'"`, s = `onmouseout="this.style.background ='none'"`;
    let r = `${e} `, o = this.config?.styles?.dragBar;
    for (let l in o)
      r += `${l}: ${o[l]}; `;
    let h = "";
    return t.dragBar && (h += `
      <div class="dragBar" style="${r}" ${i} ${s}>
        ${this.title(t)}
      </div>
    `), h;
  }
  title(t) {
    const e = "";
    let i = this.config?.styles?.title;
    for (let r in i)
      e += `${r}: ${i[r]}; `;
    return `
          <div class="title" style="${e}"></div>
      `;
  }
  closeIcon(t) {
    const e = "cursor: pointer;", i = `onmouseover="this.style.background ='#222'"`, s = `onmouseout="this.style.background ='none'"`;
    let r = `${e} `, o = this.config?.styles?.closeIcon;
    for (let l in o)
      titleStyle += `${l}: ${o[l]}; `;
    let h = "";
    return t.closeIcon && (h += `
      <div class="closeIcon" style="${r}" ${i} ${s}>
        <span>X</span>
      </div>
    `), h;
  }
  position(t) {
    let e = this.dimensions, i = this.#r.dimensions, s = Math.round((i.width - e.width) / 2), r = i.height - Math.round((i.height - e.height) / 2), o = A.getStyle(this.#o, "z-index");
    if (v(t)) {
      let { x: h, y: l, z: f } = { ...t };
      x(h) && (s = h), x(l) && (r = i.height - (l + e.height)), x(f) && (o = f);
    }
    this.#o.style.left = `${s}px`, this.#o.style.bottom = `${r}px`, this.#o.style["z-index"] = `${o}`;
  }
  setDimensions(t) {
    x(t.x) && (this.#o.style.width = `${t.x}px`), x(t.y) && (this.#o.style.width = `${t.y}px`);
  }
  setProperties(t) {
    if (!v(t))
      return !1;
    if (E(t?.title) && (this.#l.innerHTML = t.title), E(t?.content) && (this.#c.innerHTML = t.content), this.setDimensions(t?.dimensions), this.position(t?.position), v(t?.styles)) {
      const e = (i, s) => {
        if (!v(s))
          return !1;
        const r = "el" + i.charAt(0).toUpperCase() + i.slice(1);
        if (v(this[r]))
          for (let o in s)
            this[r].style.p = s[o];
      };
      for (let i of Object.keys(t.styles))
        e(i, t.styles[i]);
    }
    return t;
  }
  remove() {
    return J.destroy(this.id);
  }
  open(t) {
    if (J.currentActive === this)
      return !0;
    J.currentActive = this, this.#o.style.display = "block", this.#o.style.zindex = "10", this.setProperties(t), this.emit("window_opened", this.id), setTimeout(() => {
      this.#f.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#f.click);
    }, 250);
  }
  close() {
    J.currentActive = null, this.#o.style.display = "none", this.emit("window_closed", this.id);
  }
}
class Ss extends J {
  static type = "Dialogue";
  constructor(t, e) {
    super(), e.dragbar = !0, e.close = !0, this.config = e;
  }
  get type() {
    return Ss.type;
  }
}
class mt {
  static progressList = {};
  static progressCnt = 0;
  static class = an;
  static type = "progress";
  static name = "Progress";
  static icons = {
    loadingBars: Zh,
    loadingSpin: Kh
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${an}" style=""></div>
    `;
  }
  static create(t, e) {
    const i = `progress_${++mt.progressCnt}`;
    return e.id = i, mt.progressList[i] = new mt(t, e), mt.progressList[i];
  }
  static destroy(t) {
    mt.progressList[t].destroy(), delete mt.progressList[t];
  }
  #t;
  #e;
  #r;
  #n;
  #i;
  #s;
  #o;
  #h;
  constructor(t, e) {
    this.#e = t, this.#r = e.core, this.#n = e, this.#t = e.id, this.#s = t.elements.elProgress, this.#i = this.#r.elWidgetsG, this.init();
  }
  get type() {
    return mt.type;
  }
  init() {
    this.mount(this.#s);
  }
  start() {
    if (!v(this.#r.config?.progress) || !v(this.#r.config.progress?.loading))
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
      <div id="${this.#n.id}" class="progress ${t.type}" style="${e}">${s}</div>
    `;
  }
  mount(t) {
    let e = "loadingBars";
    this.#n?.type in mt.icons && (e = this.#n?.type);
    const i = { type: e, icon: mt.icons[e] };
    t.lastElementChild == null ? t.innerHTML = this.progressNode(i) : t.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(i)), this.#o = this.#s.querySelector(`#${this.#n.id}`), this.#h = this.#o.querySelector("svg"), this.#h.style.fill = `${il.COLOUR_ICONHOVER};`;
  }
}
const Gi = {
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
class kc {
  #t;
  #e = "Widgets";
  #r = "widgets";
  #n;
  #i;
  #s;
  #o;
  #h = { Divider: gt, Progress: mt, Menu: ht, Window: J, Dialogue: Ss };
  #l = {};
  #a = {};
  #c;
  #u;
  #d;
  constructor(t, e) {
    this.#n = t, this.#i = e, this.#o = { ...this.#h, ...e.widgets }, this.#c = t.elWidgetsG, this.init();
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
  get core() {
    return this.#n;
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
    this.#s = new $t(t, this);
  }
  get stateMachine() {
    return this.#s;
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
    this.eventsListen(), Gi.id = this.id, Gi.context = this, this.stateMachine = Gi, this.stateMachine.start();
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
    this.#n.on(t, e, i);
  }
  off(t, e) {
    this.#n.off(t, e);
  }
  emit(t, e) {
    this.#n.emit(t, e);
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
    if (!(t in this.#o) || !v(e))
      return !1;
    e.core = this.core;
    const i = this.#o[t].create(this, e);
    return this.#l[i.id] = i, i;
  }
  delete(t) {
    return isString(t) ? (this.#o[type].destroy(t), !0) : !1;
  }
}
class L extends wc {
  static #t = Co;
  static #e = 0;
  static #r = {};
  static #n = {};
  static #i = null;
  static #s = !1;
  static #o = [];
  static #h = null;
  static get version() {
    return L.#t;
  }
  static get talibPromise() {
    return L.#i;
  }
  static get talibReady() {
    return L.#s;
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
  #b;
  #P;
  #g;
  #C;
  #M;
  #L = !1;
  #S = null;
  #E = {};
  #A = I;
  #T;
  #x;
  #D = zr;
  #R;
  #k;
  #U;
  chartWMin = ci;
  chartHMin = Vt;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = z.COLOUR_BG;
  chartTxtColour = z.COLOUR_TXT;
  chartBorderColour = z.COLOUR_BORDER;
  utilsH = _t;
  toolsW = kt;
  timeH = ui;
  scaleW = ne;
  #I;
  #z;
  #O = {
    chart: {},
    time: {}
  };
  #W;
  panes = {
    utils: this.#I,
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
  #B = !1;
  static create(t = {}) {
    L.#e == 0 && (L.#r.CPUCores = navigator.hardwareConcurrency, L.#r.api = {
      permittedClassNames: L.#a
    }), (typeof t.talib != "object" || typeof t.talib.init != "function") && (L.#s = !1, L.#h = new Error(`${L.#l}`)), !L.#s && L.#h === null && (L.#i = t.talib.init(t.wasm)), L.#i.then(
      () => {
        L.#s = !0;
        for (let e of L.#o)
          _(e) && e();
      },
      () => {
        L.#s = !1;
      }
    );
  }
  static destroy(t) {
    if (t instanceof L) {
      t.end();
      const e = t.inCnt;
      delete L.#n[e];
    }
  }
  static cnt() {
    return L.#e++;
  }
  constructor() {
    super(), this.#S = L.cnt(), console.warn(`!WARNING!: ${ye} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${Ee} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#G = ur;
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
    this.#b = t;
  }
  get elMain() {
    return this.#b;
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
    this.#M = t;
  }
  get elWidgetsG() {
    return this.#M;
  }
  get UtilsBar() {
    return this.#I;
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
    return this.#T;
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
    return x(this.#x.initialCnt) ? this.#x.initialCnt : ya;
  }
  get range() {
    return this.#x;
  }
  get time() {
    return this.#_;
  }
  get TimeUtils() {
    return Yo;
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
    return this.#E;
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
    return this.#T.IsEmpty;
  }
  set candles(t) {
    v(t) && (this.#Y = t);
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
    const i = E(e?.id) ? e.id : null;
    this.setID(i), this.classList.add(this.id), this.log("processing state...");
    let s = st(e?.state) || {};
    s.id = this.id, s.core = this;
    let r = e?.deepValidate || !1, o = e?.isCrypto || !1;
    this.#T = this.#A.create(s, r, o), delete e.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let h = "1s", l = $;
    if (!v(e?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${ye} has no chart data or streaming provided.`), { tf: h, ms: l } = ii(e?.timeFrame)) : v(e?.stream) && this.state.data.chart.data.length < 2 ? ({ tf: h, ms: l } = ii(e?.timeFrame), this.#H = !0) : (h = this.state.data.chart.tf, l = this.state.data.chart.tfms), this.log(`tf: ${h} ms: ${l}`), this.#f.callbacks = this.#f.callbacks || {}, v(e))
      for (const m in e)
        m in this.props() && this.props()[m](e[m]);
    const f = v(e?.range) ? e.range : {};
    if (f.interval = l, f.core = this, this.getRange(null, null, f), this.#x.Length > 1) {
      const m = Ki(this.#_, this.#f?.range?.startTS), T = x(m) ? m + this.#x.initialCnt : this.allData.data.length - 1, b = x(m) ? m : T - this.#x.initialCnt;
      this.#x.initialCnt = T - b, this.setRange(b, T), e.range?.center && this.jumpToIndex(b, !0, !0);
    }
    this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#W = new kc(this, { widgets: e?.widgets }), this.#I = new Cc(this, e), this.#z = new Oc(this, e), this.#O = new Ar(this, e), this.setTheme(this.#U.id), this.log(`${this.#c} V${L.version} configured and running...`), this.#N = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#V = this.WidgetsG.insert("Progress", {}), this.stream = this.#f.stream, this.#H && this.on(bt, this.delayedSetRange, this), this.#L = !0, this.refresh();
  }
  destroy() {
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.#E = null, this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#G.end(), this.#A = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(bt, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#V.stop());
  }
  on(t, e, i) {
    return !E(t) || !_(e) ? !1 : (this.#E[t] || (this.#E[t] = []), this.#E[t].push({ handler: e, context: i }), !0);
  }
  off(t, e) {
    if (!E(t) || !_(e) || !(t in this.#E))
      return !1;
    for (let i = 0; i < this.#E[t].length; i++)
      if (this.#E[t][i].handler === e && (this.#E[t].splice(i, 1), this.#E[t].length === 0)) {
        delete this.#E[t];
        break;
      }
    return !0;
  }
  emit(t, e) {
    E(t) && (this.#E[t] || []).forEach((i) => i.handler.call(i.context, e));
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
      logs: (t) => this.logs = Z(t) ? t : !1,
      infos: (t) => this.infos = Z(t) ? t : !1,
      warnings: (t) => this.warnings = Z(t) ? t : !1,
      errors: (t) => this.errors = Z(t) ? t : !1,
      indicators: (t) => this.setIndicators(t),
      theme: (t) => {
        this.#U = this.addTheme(t);
      },
      stream: (t) => this.#$ = v(t) ? t : {},
      pricePrecision: (t) => this.setPricePrecision(t),
      volumePrecision: (t) => this.setVolumePrecision(t)
    };
  }
  getInCnt() {
    return this.#S;
  }
  setID(t) {
    E(t) ? this.id = t : this.id = `${tt(Ee)}_${this.#S}`;
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
    (!x(t) || t < 0) && (t = ba), this.#q = t;
  }
  setVolumePrecision(t) {
    (!x(t) || t < 0) && (t = Ca), this.#X = t;
  }
  addTheme(t) {
    const e = pt.create(t, this);
    return this.#k instanceof pt || (this.#k = e), e;
  }
  setTheme(t) {
    if (!this.theme.list.has(t))
      return !1;
    this.#k.setTheme(t, this);
    const e = this.#k, i = document.querySelector(`style[title=${this.id}_style]`), s = `var(--txc-border-color, ${e.chart.BorderColour}`;
    let r = `.${this.id} { `;
    r += `--txc-background: ${e.chart.Background}; `, this.style.background = `var(--txc-background, ${e.chart.Background})`, this.style.border = `${e.chart.BorderThickness}px solid`, this.style.borderColor = s, r += `--txc-border-color:  ${e.chart.BorderColour}; `, this.#b.rows.style.borderColor = s, r += `--txc-time-scrollbar-color: ${e.chart.BorderColour}; `, r += `--txc-time-handle-color: ${e.xAxis.handle}; `, r += `--txc-time-slider-color: ${e.xAxis.slider}; `, r += `--txc-time-cursor-fore: ${e.xAxis.colourCursor}; `, r += `--txc-time-cursor-back: ${e.xAxis.colourCursorBG}; `, r += `--txc-time-icon-color: ${e.icon.colour}; `, r += `--txc-time-icon-hover-color: ${e.icon.hover}; `, this.#g.overview.scrollBar.style.borderColor = s, this.#g.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${e.xAxis.handle})`, this.#g.overview.style.setProperty("--txc-time-slider-color", e.xAxis.slider), this.#g.overview.style.setProperty("--txc-time-icon-color", e.icon.colour), this.#g.overview.style.setProperty("--txc-time-icon-hover-color", e.icon.hover);
    for (let [o, h] of Object.entries(this.Chart.legend.list))
      h.el.style.color = `var(--txc-legend-color, ${e.legend.colour})`, h.el.style.font = `var(--txc-legend-font, ${e.legend.font})`;
    for (let o of this.#p.icons)
      o.className == "icon-wrapper" && (o.children[0].style.fill = e.icon.colour);
    for (let o of this.#m.icons)
      o.className == "icon-wrapper" && (o.children[0].style.fill = e.icon.colour);
    return r += " }", i.innerHTML = r, !0;
  }
  setScrollPos(t) {
    t = Math.round(t), x(t) && t <= 0 && t >= this.bufferPx * -1 ? this.#N = t : this.emit("Error", "setScrollPos: not a valid value");
  }
  setState(t) {
    if (!I.has(t))
      return this.warn(`${this.name} id: ${this.id} : Specified state does not exist`), !1;
    if (t === this.key)
      return !0;
    this.stream.stop(), this.MainPane.reset(), this.#T = I.get(t);
    const e = {
      interval: this.#T.data.chart.tfms,
      core: this
    };
    if (this.getRange(null, null, e), this.range.Length > 1) {
      const i = Ki(this.time, void 0), s = i ? i + this.range.initialCnt : this.#T.data.chart.data.length - 1, r = i || s - this.range.initialCnt;
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
    if (v(t))
      return this.allData.data.length == 0 && E(t.timeFrame) && ({ tf, ms } = ii(t?.timeFrame), this.range.interval = ms, this.range.intervalStr = tf, this.#_.timeFrameMS = ms, this.#_.timeFrame = tf), this.#$ = new Qt(this), this.#f.stream = this.#$.config, this.#$;
  }
  stopStream() {
    this.stream instanceof Qt && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#H; ) {
      let t = this.range.Length * 0.5;
      this.setRange(t * -1, t), this.off(bt, this.delayedSetRange), this.#H = !1;
    }
  }
  updateRange(t) {
    if (!C(t) || !x(t[4]) || t[4] == 0)
      return;
    let e, i;
    e = t[4], i = this.#N + e, i % this.candleW, i < this.bufferPx * -1 ? (i = 0, this.offsetRange(this.rangeScrollOffset * -1)) : i > 0 && (i = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#N = i, this.emit("scrollUpdate", i);
  }
  offsetRange(t) {
    let e = this.range.indexStart - t, i = this.range.indexEnd - t;
    this.setRange(e, i);
  }
  getRange(t = 0, e = 0, i = {}) {
    this.#x = new ji(t, e, i), this.#_.range = this.#x, this.#_.timeFrameMS = this.#x.interval, this.#_.timeFrame = this.#x.intervalStr;
  }
  setRange(t = 0, e = this.rangeLimit) {
    const i = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#x.set(t, e, i), t < 0 && !this.#B ? this.emit("range_limitPast", { chart: this, start: t, end: e }) : e > this.range.dataLength && !this.#B && this.emit("range_limitFuture", { chart: this, start: t, end: e });
  }
  jumpToIndex(t, e = !0, i = !0) {
    e && (t = V(t, 0, this.range.dataLength));
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
    this.#B = !0;
    let s = this.state.mergeData(t, e, i);
    return Z(s) && (this.#B = !1), s;
  }
  isIndicator(t) {
    return !!(typeof t == "function" && "primaryPane" in t.prototype && _(t.prototype?.draw));
  }
  setIndicators(t, e = !1) {
    if (!v(t))
      return !1;
    e && (console.warn("Expunging all default indicators!"), this.#D = {});
    for (const [i, s] of Object.entries(t))
      E(s?.id) && E(s?.name) && E(s?.event) && this.isIndicator(s?.ind) && (this.#D[i] = s);
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
    if (!E(t) || !E(e))
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
  addTrade(t) {
    return this.#A.addTrade(t);
  }
  removeTrade(t) {
    return this.#A.removeTrade(t);
  }
  resize(t, e) {
    return !x(t) && !x(e) ? !1 : (this.setDimensions(t, e), !0);
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
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", ol), document.head.insertAdjacentHTML("beforeend", al), customElements.get("tradex-chart") || customElements.define("tradex-chart", L));
export {
  L as Chart,
  A as DOM,
  Nt as Indicator,
  q as Overlay,
  ji as Range,
  $t as StateMachine,
  Q as canvas,
  st as copyDeep,
  Dc as isPromise,
  Me as mergeDeep,
  tt as uid
};
