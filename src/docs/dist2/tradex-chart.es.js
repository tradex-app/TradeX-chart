function na(o, e) {
  for (var i = 0; i < e.length; i++) {
    const s = e[i];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const n in s)
        if (n !== "default" && !(n in o)) {
          const r = Object.getOwnPropertyDescriptor(s, n);
          r && Object.defineProperty(o, n, r.get ? r : {
            enumerable: !0,
            get: () => s[n]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }));
}
const Es = "0.140.0";
function M(o) {
  return Array.isArray(o);
}
function _(o) {
  return o && typeof o == "function";
}
function b(o) {
  return typeof o == "object" && !Array.isArray(o) && o !== null;
}
function T(o) {
  return typeof o == "number" && !isNaN(o);
}
function J(o) {
  return typeof o == "boolean";
}
function E(o) {
  return typeof o == "string";
}
function dm(o) {
  return !!o && (b(o) || _(o)) && _(o.then);
}
function pn(o) {
  return !(o && o.constructor === Function) || o.prototype === void 0 ? !1 : Function.prototype !== Object.getPrototypeOf(o) ? !0 : Object.getOwnPropertyNames(o.prototype).length > 1;
}
const ra = ["y", "M", "d", "h", "m", "s", "ms"], oa = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], aa = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], la = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], hr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ha = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], cr = 1231006505e3, Ye = 1, F = 1e3, Y = F * 60, Q = Y * 60, V = Q * 24, pt = V * 7, he = V * 30;
function ur(o = 3, e = !1) {
  let i = hr[o % 12] * V;
  return e && o > 0 && (i += V), i;
}
const ve = V * 365, Ut = {
  y: ve,
  M: he,
  w: pt,
  d: V,
  h: Q,
  m: Y,
  s: F,
  u: Ye
}, dr = {
  years: ve,
  months: he,
  weeks: pt,
  days: V,
  hours: Q,
  minutes: Y,
  seconds: F,
  milliseconds: Ye
}, ca = { ...Ut, ...dr }, Yt = {
  YEARS10: [ve * 10, "years"],
  YEARS5: [ve * 5, "years"],
  YEARS3: [ve * 3, "years"],
  YEARS2: [ve * 2, "years"],
  YEARS: [ve, "years"],
  MONTH6: [he * 6, "months"],
  MONTH4: [he * 4, "months"],
  MONTH3: [he * 3, "months"],
  MONTH2: [he * 2, "months"],
  MONTH: [he, "months"],
  DAY15: [V * 15, "years"],
  DAY10: [V * 10, "days"],
  DAY7: [V * 7, "days"],
  DAY5: [V * 5, "days"],
  DAY3: [V * 3, "days"],
  DAY2: [V * 2, "days"],
  DAY: [V, "days"],
  HOUR12: [Q * 12, "hours"],
  HOUR6: [Q * 6, "hours"],
  HOUR4: [Q * 4, "hours"],
  HOUR2: [Q * 2, "hours"],
  HOUR: [Q, "hours"],
  MINUTE30: [Y * 30, "minutes"],
  MINUTE15: [Y * 15, "minutes"],
  MINUTE10: [Y * 10, "minutes"],
  MINUTE5: [Y * 5, "minutes"],
  MINUTE2: [Y * 2, "minutes"],
  MINUTE: [Y, "minutes"],
  SECOND30: [F * 30, "seconds"],
  SECOND15: [F * 15, "seconds"],
  SECOND10: [F * 10, "seconds"],
  SECOND5: [F * 5, "seconds"],
  SECOND2: [F * 2, "seconds"],
  SECOND: [F, "seconds"],
  MILLISECOND500: [Ye * 500, "milliseconds"],
  MILLISECOND250: [Ye * 250, "milliseconds"],
  MILLISECOND100: [Ye * 100, "milliseconds"],
  MILLISECOND50: [Ye * 50, "milliseconds"],
  MILLISECOND: [Ye, "milliseconds"]
}, ua = () => {
  const o = Object.values(Yt), e = [];
  for (let i = o.length; --i; i > 0)
    e[i] = o[i][0];
  return e;
}, Dt = ua(), da = () => {
  const o = Object.values(Yt), e = [];
  for (let i = o.length; --i; i > 0)
    e[i] = o[i][1];
  return e;
}, ls = da(), ma = Object.keys(Yt), pa = () => {
  const o = {};
  for (const [e, i] of Object.entries(Yt))
    o[e] = i[0];
  return o;
}, ga = pa(), hs = {
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
function fa() {
  const o = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(hs, o) ? hs[o.toString()] : "Etc/UTC";
}
function ya() {
  const o = {};
  for (let e in Ut) {
    let i = 0;
    o[e] = [];
    do
      o[e].push(Math.round(Ut[e] * i)), i += 0.125;
    while (i < 1);
  }
  return o;
}
function mr(o) {
  const e = new Date(o).getTime();
  return T(e);
}
function pr(o, e = cr, i = Date.now()) {
  return mr(o) ? o > e && o < i : !1;
}
function Nt(o, e, i) {
  o = new Date(o), e = new Date(e);
  var s = e.getTime(), n = o.getTime();
  return parseInt((s - n) / i);
}
const Ge = {
  inSeconds: function(o, e) {
    return Nt(o, e, F);
  },
  inMinutes: function(o, e) {
    return Nt(o, e, Y);
  },
  inHours: function(o, e) {
    return Nt(o, e, Q);
  },
  inDays: function(o, e) {
    return Nt(o, e, V);
  },
  inWeeks: function(o, e) {
    return Nt(o, e, pt);
  },
  inMonths: function(o, e) {
    o = new Date(o), e = new Date(e);
    let i = o.getUTCFullYear(), s = e.getUTCFullYear(), n = o.getUTCMonth();
    return e.getUTCMonth() + 12 * s - (n + 12 * i);
  },
  inYears: function(o, e) {
    let i = new Date(o);
    return new Date(e).getUTCFullYear() - i.getUTCFullYear();
  }
};
function va(o, e) {
  let i = Ge.inYears(o, e), s = Ge.inMonths(o, e), n = Ge.inWeeks(o, e), r = Ge.inDays(o, e), a = Ge.inHours(o, e), l = Ge.inMinutes(o, e), h = Ge.inSeconds(o, e), m = new Date(e).getTime() - new Date(o).getTime();
  return {
    y: i,
    M: s,
    w: n,
    d: r,
    h: a,
    m: l,
    s: h,
    ms: m,
    years: i,
    months: s,
    weeks: n,
    days: r,
    hours: a,
    minutes: l,
    seconds: h,
    milliseconds: m
  };
}
function di(o) {
  let e = F;
  return E(o) ? (e = gr(o), e ? o = o : (e = F, o = "1s")) : o = "1s", { tf: o, ms: e };
}
function gr(o) {
  if (!E(o))
    return !1;
  const e = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let i;
  return (i = e.exec(o)) !== null ? Ut[i[2]] * i[1] : !1;
}
function Ss(o) {
  let e = Math.floor(o / 1e3), i = Math.floor(e / 60);
  e = e % 60;
  let s = Math.floor(i / 60);
  i = i % 60;
  let n = Math.floor(s / 24);
  s = s % 24;
  let r = Math.floor(n / 7);
  n = n % 7;
  let a = Math.floor(r / 4), l = Math.floor(r / 52), h = r % 4;
  return a = a % 13, {
    y: l,
    M: a,
    w: h,
    d: n,
    h: s,
    m: i,
    s: e,
    years: l,
    months: a,
    weeks: h,
    days: n,
    hours: s,
    minutes: i,
    seconds: e
  };
}
function _t(o) {
  const e = Ss(o);
  for (const i in e)
    if (e[i])
      return `${e[i]}${i}`;
}
function fr(o) {
  return o ? new Date(o).getUTCSeconds() : null;
}
function Ps(o) {
  return new Date(o).setUTCMilliseconds(0, 0);
}
function yr(o) {
  return o ? new Date(o).getUTCMinutes() : null;
}
function Ms(o) {
  return new Date(o).setUTCSeconds(0, 0);
}
function vr(o) {
  return o ? new Date(o).getUTCHours() : null;
}
function As(o) {
  return new Date(o).setUTCMinutes(0, 0, 0);
}
function Ls(o) {
  return o ? new Date(o).getUTCDate() : null;
}
function wa(o, e = "en-GB", i = "short") {
  return new Date(o).toLocaleDateString(e, { weekday: i });
}
function Bt(o) {
  return new Date(o).setUTCHours(0, 0, 0, 0);
}
function Os(o) {
  if (o)
    return new Date(o).getUTCMonth();
}
function wr(o, e = "en-GB", i = "short") {
  return new Date(o).toLocaleDateString(e, { month: i });
}
function Ns(o) {
  let e = new Date(o);
  return Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    1
  );
}
function xr(o) {
  let e = (Os(o) + 1) % 12;
  return o += ur(e, Ri(o)), o;
}
function br(o) {
  if (o)
    return new Date(o).getUTCFullYear();
}
function Is(o) {
  return Date.UTC(new Date(o).getUTCFullYear());
}
function Cr(o) {
  return o = o + ve + V, Ri(o), o;
}
function Ri(o) {
  let i = new Date(o).getUTCFullYear();
  return i & 3 ? !1 : i % 100 != 0 || i % 400 == 0;
}
function xa(o) {
  let e = new Date(o), i = e.getUTCMonth(), s = e.getUTCDate(), n = dayCount[i] + s;
  return i > 1 && Ri() && n++, n;
}
function mi(o, e) {
  return {
    years: (s) => Is(s),
    months: (s) => Ns(s),
    weeks: (s) => Bt(s),
    days: (s) => Bt(s),
    hours: (s) => As(s),
    minutes: (s) => Ms(s),
    seconds: (s) => Ps(s)
  }[e](o);
}
function ba(o, e) {
  let i, s;
  switch (e) {
    case "years":
      i = Is(o), s = Cr(o);
      break;
    case "months":
      i = Ns(o), s = xr(o);
      break;
    case "weeks":
      i = Bt(o), s = i + V;
      break;
    case "days":
      i = Bt(o), s = i + V;
      break;
    case "hours":
      i = As(o), s = i + Q;
      break;
    case "minutes":
      i = Ms(o), s = i + Y;
      break;
    case "seconds":
      i = Ps(o), s = i + F;
  }
  return { start: i, end: s };
}
function cs(o) {
  let { h: e, m: i } = Ds(o);
  return e == 0 && i == 0 ? `${d}` : `${e}:${i}`;
}
function Ca(o) {
  let { h: e, m: i, s } = Ds(o);
  return e == 0 && i == 0 && s == 0 ? `${d}` : `${e}:${i}:${s}`;
}
function us(o) {
  let { h: e, m: i, s } = Ds(o);
  return e == 0 && i == 0 && s == 0 ? `${d}` : `${i}:${s}`;
}
function Ds(o) {
  let e, i, s, n;
  return e = String(Ls(o)), i = String(vr(o)).padStart(2, "0"), s = String(yr(o)).padStart(2, "0"), n = String(fr(o)).padStart(2, "0"), { d: e, h: i, m: s, s: n };
}
function Ta(o, e) {
  let i = 1 / 0, s = null, n = -1;
  for (let r = 0; r < e.length; r++) {
    let a = e[r][0];
    Math.abs(a - o) < i && (i = Math.abs(a - o), s = e[r], n = r);
  }
  return [n, s];
}
const Ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: cr,
  DAY_MS: V,
  HM: cs,
  HMS: Ca,
  HOUR_MS: Q,
  MILLISECOND: Ye,
  MINUTE_MS: Y,
  MONTHMAP: ha,
  MONTHR_MS: he,
  MONTH_MS: ur,
  MS: us,
  SECOND_MS: F,
  TIMESCALES: Dt,
  TIMESCALESKEYS: ma,
  TIMESCALESRANK: ls,
  TIMESCALESVALUES: Yt,
  TIMESCALESVALUESKEYS: ga,
  TIMEUNITS: ra,
  TIMEUNITSLONG: oa,
  TIMEUNITSVALUES: ca,
  TIMEUNITSVALUESLONG: dr,
  TIMEUNITSVALUESSHORT: Ut,
  WEEK_MS: pt,
  YEAR_MS: ve,
  buildSubGrads: ya,
  dayCntInc: aa,
  dayCntLeapInc: la,
  dayOfYear: xa,
  day_start: Bt,
  getTimezone: fa,
  get_day: Ls,
  get_dayName: wa,
  get_hour: vr,
  get_minute: yr,
  get_month: Os,
  get_monthName: wr,
  get_second: fr,
  get_year: br,
  hour_start: As,
  interval2MS: gr,
  isLeapYear: Ri,
  isTimeFrame: di,
  isValidTimeInRange: pr,
  isValidTimestamp: mr,
  minute_start: Ms,
  monthDayCnt: hr,
  month_start: Ns,
  ms2Interval: _t,
  ms2TimeUnits: Ss,
  nearestTs: Ta,
  nextMonth: xr,
  nextYear: Cr,
  second_start: Ps,
  time_start: mi,
  timestampDiff: Ge,
  timestampDifference: va,
  timezones: hs,
  unitRange: ba,
  year_start: Is
}, Symbol.toStringTag, { value: "Module" }));
function Sa(o, e) {
  return o = Math.ceil(o) + 1, e = Math.floor(e), Math.floor(Math.random() * (e - o) + o);
}
function Pa(o) {
  const e = {};
  return e.value = o, e.sign = !!o, e.integers = Tr(o), e.decimals = Er(o), e.total = e.integers + e.decimals, e;
}
function Tr(o) {
  return (Math.log10((o ^ o >> 31) - (o >> 31)) | 0) + 1;
}
function Ma(o) {
  return o | 0;
}
function gn(o, e) {
  e = e || 100;
  const i = Math.pow(10, e);
  return Math.round((o + Number.EPSILON) * i) / i;
}
function we(o, e = 0) {
  var i = o * Math.pow(10, e), s = Math.round(i), n = (i > 0 ? i : -i) % 1 === 0.5 ? s % 2 === 0 ? s : s - 1 : s;
  return n / Math.pow(10, e);
}
function Er(o) {
  if (typeof o != "number" && (o = parseFloat(o)), isNaN(o) || !isFinite(o))
    return 0;
  for (var e = 1, i = 0; Math.round(o * e) / e !== o && (e *= 10, e !== 1 / 0); )
    i++;
  return i;
}
function Aa(o) {
  return Math.log(o) / Math.log(10);
}
function La(o, e) {
  return Math.pow(o, e);
}
function U(o, e, i) {
  return Math.min(i, Math.max(e, o));
}
function gt(o, e) {
  return !b(o) || !b(e) ? e : (Object.keys(e).forEach((i) => {
    const s = o[i], n = e[i];
    Array.isArray(s) && Array.isArray(n) ? o[i] = gt(s.concat([]), n) : b(s) && b(n) ? o[i] = gt(Object.assign({}, s), n) : o[i] = n;
  }), o);
}
function ce(o) {
  try {
    if (window.structuredClone)
      return structuredClone(o);
  } catch {
    if (o === null || typeof o != "object" || "isActiveClone" in o)
      return o;
    let i;
    o instanceof Date ? i = new o.constructor() : i = Array.isArray(o) ? [] : {};
    for (let s in o)
      Object.prototype.hasOwnProperty.call(o, s) && (o.isActiveClone = null, i[s] = ce(o[s]), delete o.isActiveClone);
    return i;
  }
}
function Sr(o, e, i) {
  const [s, ...n] = e.split(".");
  return {
    ...o,
    [s]: n.length ? Sr(o[s], n.join("."), i) : i
  };
}
function fn(o, e) {
  return e.split(".").reduce((s, n) => s && s[n] !== "undefined" ? s[n] : void 0, o);
}
function Ti(o, e) {
  if (!M(o) || !M(e) || o.length !== e.length)
    return !1;
  let i = o.length;
  for (; i--; ) {
    if (M(o[i]) || M(e[i])) {
      if (!Ti(o[i], e[i]))
        return !1;
      continue;
    }
    if (b(o[i]) || b(o[i])) {
      if (!b(o[i], e[i]))
        return !1;
      continue;
    }
    if (o[i] !== e[i])
      return !1;
  }
  return !0;
}
function Oa(o, e, i) {
  let s = o[e];
  o.splice(e, 1), o.splice(i, 0, s);
}
function Na(o, e, i) {
  [myArray[e], myArray[i]] = [myArray[i], myArray[e]];
}
function Pr(o, e) {
  return M(e) ? M(o) ? o.every((i) => e.includes(i)) : e.includes(o) : !1;
}
function pi(o, e) {
  if (!b(o) || !b(e))
    return !1;
  const i = Object.keys(o).sort(), s = Object.keys(e).sort();
  return i.length !== s.length ? !1 : i.every((r, a) => {
    const l = o[r], h = e[s[a]];
    return M(l) || M(h) ? Ti(l, h) : b(l) || b(h) ? pi(l, h) : l === h;
  });
}
function ee(o = "ID") {
  T(o) ? o = o.toString() : E(o) || (o = "ID"), o = $e(o);
  const e = Date.now().toString(36), i = Math.random().toString(36).substring(2, 5);
  return `${o}_${e}_${i}`;
}
function $e(o) {
  return String(o).replace(/ |,|;|:|\.|#/g, "_");
}
const Ia = (o) => o.entries().next().value, Da = (o) => o.entries().next().value[0], Ra = (o) => o.entries().next().value[1], ka = (o) => [...o].pop(), _a = (o) => [...o.keys()].pop(), Ha = (o) => [...o.values()].pop();
class be extends Map {
  constructor(e) {
    super(e);
  }
  indexOfKey(e) {
    return [...this.keys()].indexOf(e);
  }
  indexOfValue(e) {
    return [...this.values()].indexOf(e);
  }
  entryAtIndex(e) {
    return [...this.entries()][e];
  }
  keyAtIndex(e) {
    return [...this.keys()][e];
  }
  valueAtIndex(e) {
    return [...this.values()][e];
  }
  insert(e, i, s) {
    return insertAtMapIndex(s, e, i, this);
  }
  remove(e) {
    return removeMapIndex(e, this);
  }
  firstEntry() {
    return Ia(this);
  }
  firstKey() {
    return Da(this);
  }
  firstValue() {
    return Ra(this);
  }
  lastEntry() {
    return ka(this);
  }
  lastKey() {
    return _a(this);
  }
  lastValue() {
    return Ha(this);
  }
  prevCurrNext(e) {
    let i = curr = next = null;
    for (let s of this)
      if (i = curr, curr = s, s.key == e)
        break;
    return { prev: i, curr, next };
  }
  union(...e) {
    if (typeof super.prototype.union == "function")
      super.union(...e);
    else
      for (const i of e)
        for (const s of i)
          this.set(...s);
  }
  setMultiple(e) {
    return M(e) ? (arr.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  populate(e) {
    return M(e) ? (this.clear(), arr.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  insertIndex(e, i, s) {
    if (!T(e))
      return !1;
    const n = [...this];
    return n.splice(e, 0, [i, s]), this.populate(n), !0;
  }
  removeIndex(e) {
    if (!T(e))
      return !1;
    const i = [...this];
    return i.splice(e, 1), this.populate(i), !0;
  }
  swapIndices(e, i) {
    if (!T(e) || !T(i))
      return !1;
    const s = [...this];
    return Na(s, e, i), this.populate(s), !0;
  }
  swapKeys(e, i) {
    const s = [...this], n = s.findIndex(([a]) => a === e), r = s.findIndex(([a]) => a === i);
    return [s[n], s[r]] = [s[r], s[n]], this.clear(), s.forEach(([a, l]) => this.set(a, l)), !0;
  }
}
function ke(o, e = 100, i, s = !1) {
  let n;
  return function() {
    let r = i || this, a = arguments, l = function() {
      n = null, s || o.apply(r, a);
    }, h = s && !n;
    clearTimeout(n), n = setTimeout(l, e), h && o.apply(r, a);
  };
}
function $a(o, e = 250, i) {
  let s, n, r = function() {
    let l = i || this, h = /* @__PURE__ */ new Date(), m = arguments;
    s && h < s + e ? (clearTimeout(n), n = setTimeout(function() {
      s = h, o.apply(l, m);
    }, e)) : (s = h, o.apply(l, m));
  };
  function a() {
    timeout && (clearTimeout(n), timeout = void 0);
  }
  return r.reset = function() {
    a(), s = 0;
  }, r;
}
class Ua {
  #e;
  #t;
  #n;
  #r = [];
  constructor(e, i) {
    this.#e = e, this.#t = E(i.id) ? i.id : ee, this.#n = E(i.type) ? i.type : "default", this.#r = M(i.data) ? i.data : [];
  }
}
function Ba(o, e = !1) {
  if (!M(o))
    return !1;
  let i = Sa(0, o.length);
  if (!gi(o[0], e) || !gi(o[i], e) || !gi(o[o.length - 1], e))
    return !1;
  let s = o[0][0], n = o[1][0], r = o[2][0];
  return !(s > n && n > r);
}
function Va(o, e = !1) {
  if (!M(o))
    return !1;
  let i = 0, s = 0;
  for (; i < o.length; ) {
    if (!gi(o[i], e) || o[i][0] < s)
      return !1;
    s = o[i][0], i++;
  }
  return !0;
}
function za(o, e) {
  if (!M(o) || o.length == 1)
    return !1;
  let i, s, n, r, a = [], l = 0, h = (o[o.length - 1][0] - o[l][0]) / e;
  for (; l < h; )
    i = o[l][0], s = o[l + 1][0], n = s - i, n == e ? a.push(o[l]) : n > e && (r = [i + e, null, null, null, null, null], a.push(r), o.splice(l + 1, 0, r)), l++;
  return o;
}
function gi(o, e = !1) {
  return !(!M(o) || o.length !== 6 || e && !pr(o[0]) || !T(o[1]) || !T(o[2]) || !T(o[3]) || !T(o[4]) || !T(o[5]));
}
function Wa(o) {
  for (let e of o)
    for (let i = 0; i < 6; i++)
      e.length = 6, e[i] *= 1;
  return o;
}
const Fa = Y, Ga = "1m", Ei = Fa, Ya = 6, yn = 0.05, qa = 100, vn = 100, Ke = ["default", "percent", "log"], wn = 0.3, xn = 30, oi = 200, bn = 200, Cn = 20, Tn = 4096, ki = 5, En = 50, Sn = 30, Xa = 8, ds = 30;
class fe {
  static t = 0;
  static o = 1;
  static h = 2;
  static l = 3;
  static c = 4;
  static v = 5;
}
const fi = {
  mainPane: {},
  primaryPane: {},
  secondaryPane: {},
  scale: {},
  timeline: {}
};
Array.from(Object.keys(fi));
class ps {
  #e = Ei;
  #t = "1s";
  indexStart = 0;
  indexEnd = oi;
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
  initialCnt = xn;
  limitFuture = oi;
  limitPast = bn;
  minCandles = Cn;
  maxCandles = Tn;
  yAxisBounds = wn;
  rangeLimit = oi;
  anchor;
  #n;
  #r;
  #i = !0;
  constructor(e, i, s = {}) {
    if (!b(s) || !(s?.core instanceof I))
      return !1;
    this.#i = !0, this.setConfig(s), this.#n = s.core, e = T(e) ? e : 0, i = T(i) ? i : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const n = s?.interval || Ei;
    if (this.data.length == 0) {
      let r = Date.now();
      e = 0, i = this.rangeLimit, this.#e = n, this.#t = _t(this.interval), this.anchor = r - r % n;
    } else
      this.data.length < 2 ? (this.#e = n, this.#t = _t(this.interval)) : (this.#e = gs(this.data), this.#t = _t(this.interval));
    i == 0 && this.data.length >= this.rangeLimit ? i = this.rangeLimit : i == 0 && (i = this.data.length), this.set(e, i);
  }
  get allData() {
    return this.#n.allData;
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
  set interval(e) {
    this.#e = e;
  }
  get interval() {
    return this.#e;
  }
  set intervalStr(e) {
    this.#t = e;
  }
  get intervalStr() {
    return this.#t;
  }
  end() {
  }
  set(e = 0, i = this.dataLength, s = this.maxCandles, n) {
    if (!T(e) || !T(i) || !T(s))
      return !1;
    e = e | 0, i = i | 0, s = s | 0, s = U(s, this.minCandles, this.maxCandles), e > i && ([e, i] = [i, e]), i = U(i, e + this.minCandles, e + s);
    let r = i - e;
    e = U(e, this.limitPast * -1, this.dataLength + this.limitFuture - this.minCandles - 1), i = U(i, e + this.minCandles, this.dataLength + this.limitFuture - 1), e = i - e < r ? e - (r - (i - e)) : e;
    const a = e, l = i, h = this.indexStart, m = this.indexEnd;
    let g = this.Length;
    this.indexStart = e, this.indexEnd = i, g -= this.Length;
    let v = this.maxMinPriceVol({ data: this.data, start: this.indexStart, end: this.indexEnd, that: this });
    return this.setMaxMin(v), this.setConfig(n), this.#n.emit("setRange", [a, l, h, m]), !0;
  }
  setConfig(e) {
    if (!b(e))
      return !1;
    this.initialCnt = T(e?.initialCnt) ? e.initialCnt : xn, this.limitFuture = T(e?.limitFuture) ? e.limitFuture : oi, this.limitPast = T(e?.limitPast) ? e.limitPast : bn, this.minCandles = T(e?.minCandles) ? e.minCandles : Cn, this.maxCandles = T(e?.maxCandles) ? e.maxCandles : Tn, this.yAxisBounds = T(e?.yAxisBounds) ? e.yAxisBounds : wn;
  }
  setMaxMin(e) {
    for (let i in e)
      this.old[i] = this[i], this[i] = e[i];
    this.scale = this.dataLength != 0 ? this.Length / this.dataLength : 1;
  }
  value(e, i = "chart") {
    let s;
    if (i == "chart")
      s = this.data;
    else if (s = this.getDataById(i), !s)
      return null;
    T(e) || (e = s.length - 1);
    let n = s[e];
    if (n !== void 0)
      return n;
    {
      const r = s.length - 1;
      return n = [null, null, null, null, null, null], s.length < 1 ? (n[0] = Date.now() + this.interval * e, n) : e < 0 ? (n[0] = s[0][0] + this.interval * e, n) : e > r ? (n[0] = s[r][0] + this.interval * (e - r), n) : null;
    }
  }
  valueByTS(e, i = "") {
    if (!T(e) || !E(i))
      return !1;
    const s = this.getTimeIndex(e);
    switch (i) {
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
        if (i.length === 0)
          return this.value(s);
        i.split("_");
        break;
    }
  }
  getDataById(e) {
    if (!E(e))
      return !1;
    const i = e.split("_");
    switch (i[1]) {
      case "chart":
        return this.data;
      case "primary":
        for (let s of this.allData.primaryPane)
          if (i[2] in s)
            return s[i[2]];
        return !1;
      case "secondary":
        for (let s of this.allData.secondaryPane)
          if (i[2] in s)
            return s[i[2]];
        return !1;
      case "datasets":
        for (let s of this.allData.datasets)
          if (i[2] in s)
            return s[i[2]];
        return !1;
      default:
        return !1;
    }
  }
  getTimeIndex(e) {
    if (!T(e))
      return !1;
    e = e - e % this.interval;
    let i = this.data.length > 0 ? this.data[0][0] : this.anchor;
    return e === i ? 0 : e < i ? (i - e) / this.interval * -1 : (e - i) / this.interval;
  }
  inRange(e) {
    return e >= this.timeMin && e <= this.timeMax;
  }
  inPriceHistory(e) {
    return e >= this.timeStart && e <= this.timeFinish;
  }
  inRenderRange(e) {
    let i = this.getTimeIndex(e), s = this.#n.rangeScrollOffset;
    return i >= this.indexStart - s && i <= this.indexEnd + s;
  }
  rangeIndex(e) {
    return this.getTimeIndex(e) - this.indexStart;
  }
  maxMinPriceVol(e) {
    let { data: i, start: s, end: n, that: r } = { ...e }, a = we(this.#n.bufferPx / this.#n.candleW);
    if (a = T(a) ? a : 0, s = T(s) ? s - a : 0, s = s > 0 ? s : 0, n = typeof n == "number" ? n : i?.length - 1, i.length == 0)
      return {
        valueLo: 0,
        valueHi: 1,
        valueMin: 0,
        valueMax: 1,
        volumeMin: 0,
        volumeMax: 0,
        valueMinIdx: 0,
        valueMaxIdx: 0,
        volumeMinIdx: 0,
        volumeMaxIdx: 0
      };
    let l = i.length - 1, h = se(s, 0, l), m = se(n, 0, l), g = i[h][3], v = i[h][2], S = i[h][5], A = i[h][5], L = h, k = h, ue = h, Oe = h;
    for (; h++ < m; )
      i[h][3] < g && (g = i[h][3], L = h), i[h][2] > v && (v = i[h][2], k = h), i[h][5] < S && (S = i[h][5], ue = h), i[h][5] > A && (A = i[h][5], Oe = h);
    let H = v - g, N = g, D = v;
    return g -= H * r.yAxisBounds, g = g > 0 ? g : 0, v += H * r.yAxisBounds, H = v - g, {
      valueLo: N,
      valueHi: D,
      valueMin: g,
      valueMax: v,
      valueDiff: v - g,
      volumeMin: S,
      volumeMax: A,
      volumeDiff: A - S,
      valueMinIdx: L,
      valueMaxIdx: k,
      volumeMinIdx: ue,
      volumeMaxIdx: Oe
    };
    function se(K, ne, de) {
      return Math.min(de, Math.max(ne, K));
    }
  }
  snapshot(e, i) {
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
function gs(o) {
  let e = Math.min(o.length - 1, 99), i = 1 / 0;
  return o.slice(0, e).forEach((s, n) => {
    let r = o[n + 1][0] - s[0];
    r === r && r < i && (i = r);
  }), i;
}
function fs(o, e) {
  if (!T(e))
    return !1;
  let i, s = o.timeFrameMS;
  return e = e - e % s, e === o.range.data[0][0] ? i = 0 : e < o.range.data[0][0] ? i = (o.range.data[0][0] - e) / s * -1 : i = (e - o.range.data[0][0]) / s, i;
}
const It = "TradeX-Chart", Ht = "TX", Ka = "tradeXutils", Pn = "tradeXmenus", ja = "tradeXmenu", Mn = "tradeXdividers", An = "tradeXwindows", Za = "tradeXwindow", Ln = "tradeXprogress", Ja = 500, Qa = "stream_None", $t = "stream_Listening", On = "stream_Started", el = "stream_Stopped", tl = "stream_Error", Vt = "stream_candleFirst", _e = "stream_candleUpdate", zt = "stream_candleNew", il = 250, sl = 8, nl = 2, rl = 2, Si = 1e3, ol = "defaultState", al = {
  version: Es,
  id: ol,
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
    tf: Ga,
    tfms: Ei
  },
  ohlcv: [],
  views: [],
  primary: [],
  secondary: [],
  datasets: [],
  tools: {},
  trades: {
    display: !0,
    displayInfo: !0
  },
  events: {},
  annotations: {}
}, Nn = {
  timestamp: "number",
  id: "string",
  side: "string",
  price: "number",
  amount: "number",
  filled: "number",
  average: "number",
  total: "number",
  tag: "string"
}, In = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string",
  url: "string"
};
class $ {
  static #e = new be();
  static #t = {};
  static get default() {
    return ce(al);
  }
  static get list() {
    return $.#e;
  }
  static create(e, i = !1, s = !1) {
    const n = new $(e, i, s), r = n.key;
    return $.#e.set(r, n), n;
  }
  static validate(e, i = !1, s = !1) {
    const n = this.default;
    if (b(e) || (e = {}), b(e.chart) || (e.chart = n.chart, e.chart.isEmpty = !0, e.chart.data = M(e.ohlcv) ? e.ohlcv : [], delete e.ohlcv), e = gt(n, e), i ? e.chart.data = Va(e.chart.data, s) ? e.chart.data : [] : e.chart.data = Ba(e.chart.data, s) ? e.chart.data : [], e.chart.isEmpty = e.chart.data.length == 0, !T(e.chart?.tf) || i) {
      let h = gs(e.chart.data);
      h < F && (h = Ei), e.chart.tfms = h;
    }
    if ((!E(e.chart?.tfms) || i) && (e.chart.tf = _t(e.chart.tfms)), M(e.views) || (e.views = n.views), M(e.primary) || (e.primary = n.primary), M(e.secondary) || (e.secondary = n.secondary), b(e.chart.settings) || (e.chart.settings = n.chart.settings), M(e.datasets) || (e.datasets = []), e.views.length == 0) {
      e.views.push(["primary", e.primary]);
      for (let h in e)
        h.indexOf("secondary") == 0 && e.views.push([h, e[h]]);
    }
    let r = e.views, a = r.length;
    for (; a--; )
      if (!M(r[a]) || r[a].length == 0)
        r.splice(a, 1);
      else {
        let h = e.views[a][1], m = h.length;
        for (; m--; )
          !b(h[m]) || !E(h[m].name) || !E(h[m].type) ? h.splice(m, 1) : b(h[m].settings) || (h[m].settings = {});
        r[a].length == 0 && r.splice(a, 1);
      }
    e.views.length == 0 && (e.views[0] = ["primary", n.primary]), e.views = new be(e.views), e.views.has("primary") || e.views.insert("primary", n.primary, 0), e.views.get("primary").push(e.chart);
    for (var l of e.datasets)
      this.#t || (this.#t = {}), this.dss[l.id] = new Ua(this, l);
    return e;
  }
  static delete(e) {
    if (!E(e) || !$.has(e))
      return !1;
    $.#e.delete(e);
  }
  static has(e) {
    return $.#e.has(e);
  }
  static get(e) {
    return $.#e.get(e);
  }
  static export(e, i = {}) {
    if (!$.has(e))
      return !1;
    b(i) || (i = {});
    const s = $.get(e), n = i?.type, r = ce(s.data), a = r.chart.data;
    let l;
    switch (a.length > 0 && a[a.length - 1].length > 6 && (a.length = a.length - 1), r.views.get("primary").pop(), r.views = Array.from(r.views), r.version = Es, n) {
      case "json":
      default:
        const { replacer: h, space: m } = { ...i };
        l = JSON.stringify(r, h, m);
    }
    return l;
  }
  #n = "";
  #r = "";
  #i = {};
  #s;
  #l = !1;
  #o = !0;
  #c = [];
  constructor(e, i = !1, s = !1) {
    b(e) ? (this.#i = $.validate(e, i, s), this.#l = "valid", this.#o = !!this.#i.chart?.isEmpty, this.#s = e?.core instanceof I ? e.core : void 0) : (this.#i = $.default, this.#l = "default", this.#o = !0), this.#n = e?.id || "", this.#r = ee(`${Ht}_state`);
  }
  get id() {
    return this.#n;
  }
  get key() {
    return this.#r;
  }
  get status() {
    return this.#l;
  }
  get isEmpty() {
    return this.#o;
  }
  get allData() {
    return {
      data: this.#i.chart.data,
      primaryPane: this.#i.primary,
      secondaryPane: this.#i.secondary,
      datasets: this.#i.datasets
    };
  }
  get data() {
    return this.#i;
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
  error(e) {
    this.#s.error(e);
  }
  create(e, i, s) {
    return $.create(e, i, s);
  }
  delete(e) {
    if (!E(e))
      return !1;
    if (e !== this.key)
      $.delete(e);
    else if ($.has(e)) {
      const i = $.create();
      this.use(i.key), $.delete(e);
    }
    return !0;
  }
  list() {
    return $.list;
  }
  has(e) {
    return $.has(e);
  }
  get(e) {
    return $.get(e);
  }
  use(e) {
    const i = this.core;
    if (!$.has(e))
      return i.warn(`${i.name} id: ${i.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    i.stream.stop(), i.MainPane.reset();
    let s = $.get(e);
    this.#n = s.id, this.#l = s.status, this.#o = s.isEmpty, this.#i = s.data;
    const n = {
      interval: s.data.chart.tfms,
      core: i
    };
    if (i.getRange(null, null, n), this.range.Length > 1) {
      const r = fs(i.time, void 0), a = r ? r + this.range.initialCnt : s.data.length - 1, l = r || a - this.range.initialCnt;
      this.range.initialCnt = a - l, i.setRange(l, a);
    }
    i.MainPane.restart(), i.refresh();
  }
  export(e = this.key, i = {}) {
    return $.export(e, i = {});
  }
  mergeData(e, i = !1, s = !1) {
    if (!b(e))
      return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let n = M(e?.ohlcv) ? e.ohlcv.length - 1 : 0;
    if (n > 1 && this.time.timeFrameMS !== gs(e?.ohlcv))
      return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    (this.#o || !T(this.time.timeFrameMS)) && (!b(i) || !T(i.start) || !T(i.end)) && n > 1 && (i = { start: n - this.range.initialCnt, end: n }), b(i) ? (T(i?.startTS) ? i.start = i.startTS : i.start = T(i.start) ? this.range.value(i.start)[0] : this.range.timeMin, T(i?.endTS) ? i.end = i.endTS : i.end = T(i.end) ? this.range.value(i.end)[0] : this.range.timeMax) : (i = {}, i.start = this.range.timeMin, i.end = this.range.timeMax);
    let r, a, l = e?.ohlcv || !1;
    const h = this.allData.data, m = this.allData?.primaryPane, g = e?.primary || !1, v = this.allData?.secondaryPane, S = e?.secondary || !1, A = this.allData?.dataset?.data, L = e?.dataset?.data || !1;
    this.allData?.trades, e?.trades, this.allData?.events, e?.events;
    const k = M(l) && this.range.inRange(l[0][0]) ? 1 : 0, ue = {};
    if (M(l) && l.length > 0) {
      if (r = l.length - 1, h.length - 1, ue.mData = this.range.inRange(l[0][0]) && this.range.inRange(l[0][r]), !J(l[r][7]) && l[r].length !== 8 && l[r][6] !== null && l[r][7] !== !0 ? l = Wa(l) : i.end >= this.range.timeFinish && i.start <= this.range.timeFinish && (i.start += this.range.interval, i.end += this.range.interval), h.length == 0)
        this.allData.data.push(...l);
      else {
        let N = this.time.timeFrameMS, D = l[0][0], se = l[l.length - 1][0], K = (l.length - 1) * N;
        se > D + K && (l = za(l, N)), this.data.chart.data = this.merge(h, l);
      }
      if (s)
        this.#s.calcAllIndicators(s);
      else {
        if (M(g) && g.length > 0) {
          for (let N of g)
            if (M(N?.data) && N?.data.length > 0)
              for (let D of m)
                D.name === N.name && D.type === N.type && pi(D.settings, N.settings) && (D.data = this.merge(D.data, N.data), N.instance.drawOnUpdate = !0);
        }
        if (M(S) && S.length > 0) {
          for (let N of S)
            if (M(N?.data) && N?.data.length > 0)
              for (let D of v)
                D.name === N.name && D.type === N.type && pi(D.settings, N.settings) && (D.data = this.merge(D.data, N.data), N.instance.drawOnUpdate = !0);
        }
        this.#s.calcAllIndicators();
      }
      if (M(L) && L.length > 0) {
        for (let N of L)
          if (M(N?.data) && N?.data.length > 0)
            for (let D of A)
              D.name === N.name && D.type === N.type && pi(D.settings, N.settings) && (D.data = this.merge(D.data, N.data));
      }
      if (b(mEvents))
        for (let N in mEvents)
          ;
      b(mtrades), i && (b(i) ? (a = T(i.start) ? this.range.getTimeIndex(i.start) : this.range.indexStart, n = T(i.end) ? this.range.getTimeIndex(i.end) : this.range.indexEnd) : (l[0][0] && (a = this.range.indexStart + k), n = this.range.indexEnd + k), this.#s.setRange(a, n));
      let Oe, H = !1;
      for (Oe in ue)
        H = H || Oe;
      return e.ohlcv.length > 1 && this.#s.emit("state_mergeComplete"), H && this.#s.refresh(), this.#o = !1, !0;
    }
  }
  merge(e, i) {
    let s = [], n, r;
    if (e[0][0] < i[0][0] ? (n = e, r = i) : (n = i, r = e), r.length == 1 && r[0][0] == n[n.length - 1][0])
      n[n.length - 1] = r[0], s = n;
    else if (r.length == 1 && r[0][0] == n[n.length - 1][0] + this.range.interval)
      s = n.concat(r);
    else if (n[n.length - 1][0] >= r[0][0]) {
      let a = 0;
      for (; n[a][0] < r[0][0]; )
        s.push(n[a]), a++;
      s = s.concat(r);
      let l = a + r.length;
      l < n.length && (s = s.concat(n.slice(l)));
    } else if (r[0][0] - n[n.length - 1][0] > this.range.interval) {
      s = n;
      let a = n[n.length - 1][0], l = Math.floor((r[0][0] - a) / this.range.interval);
      for (l; l > 0; l--) {
        let h = Array(r[0].length).fill(null);
        h[0] = a, a = +this.range.interval, s.push(h), s = s.concat(r);
      }
    } else
      s = n.concat(r);
    return s;
  }
  removeIndicator(e) {
    if (!E(e))
      return !1;
    const i = (s, n) => {
      const r = this.data[s];
      for (let a = 0; a < r.length; a++)
        if (r[a].id == n)
          return r.splice(a, 1), !0;
      return !1;
    };
    return !!(i("primary", e) || i("secondary", e));
  }
  addTrade(e) {
    const i = Object.keys(e), s = Object.keys(Nn);
    if (!b(e) || !Ti(i, s))
      return !1;
    for (let a of s)
      if (typeof e[a] !== Nn[a])
        return !1;
    const n = e.timestamp - e.timestamp % this.time.timeFrameMS, r = new Date(n);
    return e.dateStr = `${r.getFullYear()}/${r.getMonth() + 1}/${r.getDate()} ${r.getHours()}:${r.getMinutes()}`, M(this.allData.trades[n]) || (this.allData.trades[n] = []), this.allData.trades[n].push(e), !0;
  }
  removeTrade(e) {
    console.log("TODO: state.removeTrade()");
  }
  addEvent(e) {
    const i = Object.keys(e), s = Object.keys(In);
    if (!b(e) || !Ti(i, s))
      return !1;
    for (let a of s)
      if (typeof t[a] !== In[a])
        return !1;
    const n = t.timestamp - t.timestamp % this.time.timeFrameMS, r = new Date(n);
    return e.dateStr = `${r.getFullYear()}/${r.getMonth() + 1}/${r.getDate()} ${r.getHours()}:${r.getMinutes()}`, M(this.allData.events[n]) || (this.allData.events[n] = []), this.allData.events[n].push(e), !0;
  }
  removeEvent(e) {
    console.log("TODO: state.removeEvent()");
  }
}
const Mr = {
  findByID(o, e = document) {
    return e.getElementById(o);
  },
  findByClass(o, e = document) {
    return e.getElementsByClassName(o);
  },
  findByName(o, e = document) {
    return e.getElementsByName(o);
  },
  fndByTag(o, e = document) {
    return e.getElementsByTagName(o);
  },
  findBySelector(o, e = document) {
    return e.querySelector(o);
  },
  findBySelectorAll(o, e = document) {
    return e.querySelectorAll(o);
  },
  isNode(o) {
    return typeof Node == "object" ? o instanceof Node : o && typeof o == "object" && typeof o.nodeType == "number" && typeof o.nodeName == "string";
  },
  isElement(o) {
    return typeof HTMLElement == "object" ? o instanceof HTMLElement : o && typeof o == "object" && o !== null && o.nodeType === 1 && typeof o.nodeName == "string";
  },
  isVisible(o) {
    return this.isElement(o) ? !!o && !!(o.offsetWidth || o.offsetHeight || o.getClientRects().length) : !1;
  },
  isInViewport(o) {
    if (!this.isElement(o))
      return !1;
    const e = o.getBoundingClientRect();
    return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
  },
  isVisibleToUser(o) {
    if (!this.isElement(o))
      return !1;
    const e = getComputedStyle(elem);
    if (e.display === "none" || e.visibility !== "visible" || e.opacity < 0.1 || o.offsetWidth + o.offsetHeight + o.getBoundingClientRect().height + o.getBoundingClientRect().width === 0)
      return !1;
    const i = {
      x: o.getBoundingClientRect().left + o.offsetWidth / 2,
      y: o.getBoundingClientRect().top + o.offsetHeight / 2
    };
    if (i.x < 0 || i.x > (document.documentElement.clientWidth || window.innerWidth) || i.y < 0 || i.y > (document.documentElement.clientHeight || window.innerHeight))
      return !1;
    let s = document.elementFromPoint(i.x, i.y);
    do
      if (s === elem)
        return !0;
    while (s = s.parentNode);
    return !1;
  },
  isImage(o, e) {
    if (this.isSVG(o))
      var i = window.URL || window.webkitURL || window, o = new Blob([o], { type: "image/svg+xml" }), o = i.createObjectURL(o);
    const s = new Image();
    if (s.src = o, _(e))
      s.complete ? e(s) : (s.onload = () => e(s), s.onerror = () => e(!1));
    else
      return new Promise(function(n, r) {
        s.complete ? n(s) : (s.onload = () => n(s), s.onerror = () => r(!1));
      });
  },
  isSVG(o) {
    return E(o) ? /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/.test(o) : !1;
  },
  elementDimPos(o) {
    if (!this.isElement(o))
      return !1;
    let e = 0, i = 0, s = o;
    for (; s && s.tagName.toLowerCase() != "body" && !isNaN(s.offsetLeft) && !isNaN(s.offsetTop); )
      e += s.offsetLeft - s.scrollLeft, i += s.offsetTop - s.scrollTop, s = s.offsetParent;
    const n = o.getBoundingClientRect();
    let r = n.right - n.left, a = n.bottom - n.top, l = this.isVisible(o), h = this.isInViewport(o);
    return { top: i, bottom: i + a, left: e, right: e + r, width: r, height: a, visible: l, viewport: h };
  },
  elementsDistance(o, e) {
    return !this.isElement(o) || !this.isElement(o) ? !1 : (el1Location = this.elementDimPos(o), el2Location = this.elementDimPos(e), {
      x: el1Location.top - el2Location.top,
      y: el1Location.left - el2Location.left,
      el1Location,
      el2Location
    });
  },
  htmlToElement(o) {
    if (!E(o))
      return !1;
    const e = document.createElement("template");
    return o = o.trim(), e.innerHTML = o, e.content.firstChild;
  },
  htmlToElements(o) {
    if (!E(o))
      return !1;
    const e = document.createElement("template");
    return e.innerHTML = o, e.content.childNodes;
  },
  svgToImage(o, e, i) {
    if (!this.isSVG(o) || !T(i?.w) || !T(i?.h))
      return !1;
    let s = i.w, n = i.h, r = document.createElement("canvas");
    r.width = s, r.height = n;
    let a = this.htmlToElement(o);
    a.style.fill = e, a.setAttribute("width", s), a.setAttribute("height", n), a.xmlns = "http://www.w3.org/2000/svg";
    let l = new XMLSerializer().serializeToString(a), g = "data:image/svg+xml;base64," + btoa(l), v = new Image();
    return v.setAttribute("width", s), v.setAttribute("height", n), v.onload = () => {
      r.getContext("2d").drawImage(v, 0, 0, s, n);
    }, v.src = g, v;
  },
  hideOnClickOutside(o) {
    if (!this.isElement(o))
      return !1;
    const e = (s) => {
      !o.contains(s.target) && this.isVisible(o) && (o.style.display = "none", i());
    }, i = () => {
      document.removeEventListener("click", e);
    };
    document.addEventListener("click", e);
  },
  onClickOutside(o, e) {
    if (!this.isElement(o))
      return !1;
    const i = (n) => {
      !o.contains(n.target) && Mr.isVisible(o) && (e(), s());
    }, s = () => {
      document.removeEventListener("click", i);
    };
    document.addEventListener("click", i);
  },
  getStyle(o, e) {
    let i, s;
    if (E(o))
      i = document.getElementById(o);
    else if (this.isElement(o))
      i = o;
    else
      return !1;
    return E(e) ? (window.getComputedStyle ? s = document.defaultView.getComputedStyle(i, null).getPropertyValue(e) : i.currentStyle && (s = i.currentStyle[e]), s) : !1;
  },
  addStyleRule(o, e, i, s) {
    let n = this.findStyleRule(o, e, i, s);
    if (n)
      n.i >= 0 ? n.rules[n.i].style[n.property] = n.value : this.addCSSRule(n.styleSheet, n.selector, n.rules, n.index);
    else
      return;
  },
  deleteStyleRule(o, e, i) {
    let s = this.findStyleRule(o, e, i, "");
    (s.styleSheet.deleteRule || s.styleSheet.removeRule)(s.i);
  },
  findStyleRule(o, e, i, s) {
    if (!o || !b(o))
      return null;
    if (o.constructor.name == "HTMLStyleElement")
      o = o.sheet;
    else if (o.constructor.name != "CSSStyleSheet")
      return null;
    let n = this.styleRuleSanitize(e, i, s);
    e = n[0], i = n[1], s = n[2];
    const r = o.cssRules || o.rules;
    for (var a = r.length - 1; a > 0 && r[a].selectorText !== e; --a)
      ;
    return { styleSheet: o, rules: r, selector: e, property: i, value: s, i: a };
  },
  styleRuleSanitize(o, e, i) {
    return [
      o = o.toLowerCase().replace(/\s+/g, " "),
      e = e.toLowerCase(),
      i = i.toLowerCase()
    ];
  },
  addCSSRule(o, e, i, s) {
    o.insertRule ? o.insertRule(e + "{" + i + "}", s) : o.addRule(e, i, s);
  },
  findTargetParentWithClass(o, e) {
    return !this.isElement(o) || !E(e) ? null : o.classList.contains(e) ? o : this.findTargetParentWithClass(o.parentElement, e);
  }
}, R = Mr, ll = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const hl = ((o) => "onorientationchange" in o || o.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in o || o.DocumentTouch && document instanceof o.DocumentTouch)(typeof window < "u" ? window : {}), cl = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class st {
  #e = 0;
  #t = 0;
  constructor() {
    if (arguments.length === 1) {
      const { x: e, y: i } = arguments[0];
      this.x = e || 0, this.y = i || 0;
    } else if (arguments.length > 1) {
      const [e, i] = arguments;
      this.x = e || 0, this.y = i || 0;
    }
  }
  set x(e) {
    T(e) && (this.#e = e);
  }
  get x() {
    return this.#e;
  }
  set y(e) {
    T(e) && (this.#t = e);
  }
  get y() {
    return this.#t;
  }
  clone() {
    return new st(this.x, this.y);
  }
}
function ul(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var Ar = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(o) {
  (function(e, i, s, n) {
    var r = ["", "webkit", "Moz", "MS", "ms", "o"], a = i.createElement("div"), l = "function", h = Math.round, m = Math.abs, g = Date.now;
    function v(c, u, p) {
      return setTimeout(N(c, p), u);
    }
    function S(c, u, p) {
      return Array.isArray(c) ? (A(c, p[u], p), !0) : !1;
    }
    function A(c, u, p) {
      var f;
      if (c)
        if (c.forEach)
          c.forEach(u, p);
        else if (c.length !== n)
          for (f = 0; f < c.length; )
            u.call(p, c[f], f, c), f++;
        else
          for (f in c)
            c.hasOwnProperty(f) && u.call(p, c[f], f, c);
    }
    function L(c, u, p) {
      var f = "DEPRECATED METHOD: " + u + `
` + p + ` AT 
`;
      return function() {
        var x = new Error("get-stack-trace"), P = x && x.stack ? x.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", O = e.console && (e.console.warn || e.console.log);
        return O && O.call(e.console, f, P), c.apply(this, arguments);
      };
    }
    var k;
    typeof Object.assign != "function" ? k = function(u) {
      if (u === n || u === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var p = Object(u), f = 1; f < arguments.length; f++) {
        var x = arguments[f];
        if (x !== n && x !== null)
          for (var P in x)
            x.hasOwnProperty(P) && (p[P] = x[P]);
      }
      return p;
    } : k = Object.assign;
    var ue = L(function(u, p, f) {
      for (var x = Object.keys(p), P = 0; P < x.length; )
        (!f || f && u[x[P]] === n) && (u[x[P]] = p[x[P]]), P++;
      return u;
    }, "extend", "Use `assign`."), Oe = L(function(u, p) {
      return ue(u, p, !0);
    }, "merge", "Use `assign`.");
    function H(c, u, p) {
      var f = u.prototype, x;
      x = c.prototype = Object.create(f), x.constructor = c, x._super = f, p && k(x, p);
    }
    function N(c, u) {
      return function() {
        return c.apply(u, arguments);
      };
    }
    function D(c, u) {
      return typeof c == l ? c.apply(u && u[0] || n, u) : c;
    }
    function se(c, u) {
      return c === n ? u : c;
    }
    function K(c, u, p) {
      A(ot(u), function(f) {
        c.addEventListener(f, p, !1);
      });
    }
    function ne(c, u, p) {
      A(ot(u), function(f) {
        c.removeEventListener(f, p, !1);
      });
    }
    function de(c, u) {
      for (; c; ) {
        if (c == u)
          return !0;
        c = c.parentNode;
      }
      return !1;
    }
    function me(c, u) {
      return c.indexOf(u) > -1;
    }
    function ot(c) {
      return c.trim().split(/\s+/g);
    }
    function We(c, u, p) {
      if (c.indexOf && !p)
        return c.indexOf(u);
      for (var f = 0; f < c.length; ) {
        if (p && c[f][p] == u || !p && c[f] === u)
          return f;
        f++;
      }
      return -1;
    }
    function Xt(c) {
      return Array.prototype.slice.call(c, 0);
    }
    function Gs(c, u, p) {
      for (var f = [], x = [], P = 0; P < c.length; ) {
        var O = u ? c[P][u] : c[P];
        We(x, O) < 0 && f.push(c[P]), x[P] = O, P++;
      }
      return p && (u ? f = f.sort(function(j, ie) {
        return j[u] > ie[u];
      }) : f = f.sort()), f;
    }
    function Kt(c, u) {
      for (var p, f, x = u[0].toUpperCase() + u.slice(1), P = 0; P < r.length; ) {
        if (p = r[P], f = p ? p + x : u, f in c)
          return f;
        P++;
      }
      return n;
    }
    var To = 1;
    function Eo() {
      return To++;
    }
    function Ys(c) {
      var u = c.ownerDocument || c;
      return u.defaultView || u.parentWindow || e;
    }
    var So = /mobile|tablet|ip(ad|hone|od)|android/i, qs = "ontouchstart" in e, Po = Kt(e, "PointerEvent") !== n, Mo = qs && So.test(navigator.userAgent), Tt = "touch", Ao = "pen", Bi = "mouse", Lo = "kinect", Oo = 25, te = 1, Je = 2, W = 4, re = 8, jt = 1, Et = 2, St = 4, Pt = 8, Mt = 16, Ne = Et | St, Qe = Pt | Mt, Xs = Ne | Qe, Ks = ["x", "y"], Zt = ["clientX", "clientY"];
    function pe(c, u) {
      var p = this;
      this.manager = c, this.callback = u, this.element = c.element, this.target = c.options.inputTarget, this.domHandler = function(f) {
        D(c.options.enable, [c]) && p.handler(f);
      }, this.init();
    }
    pe.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && K(this.element, this.evEl, this.domHandler), this.evTarget && K(this.target, this.evTarget, this.domHandler), this.evWin && K(Ys(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && ne(this.element, this.evEl, this.domHandler), this.evTarget && ne(this.target, this.evTarget, this.domHandler), this.evWin && ne(Ys(this.element), this.evWin, this.domHandler);
      }
    };
    function No(c) {
      var u, p = c.options.inputClass;
      return p ? u = p : Po ? u = zi : Mo ? u = ei : qs ? u = Wi : u = Qt, new u(c, Io);
    }
    function Io(c, u, p) {
      var f = p.pointers.length, x = p.changedPointers.length, P = u & te && f - x === 0, O = u & (W | re) && f - x === 0;
      p.isFirst = !!P, p.isFinal = !!O, P && (c.session = {}), p.eventType = u, Do(c, p), c.emit("hammer.input", p), c.recognize(p), c.session.prevInput = p;
    }
    function Do(c, u) {
      var p = c.session, f = u.pointers, x = f.length;
      p.firstInput || (p.firstInput = js(u)), x > 1 && !p.firstMultiple ? p.firstMultiple = js(u) : x === 1 && (p.firstMultiple = !1);
      var P = p.firstInput, O = p.firstMultiple, X = O ? O.center : P.center, j = u.center = Zs(f);
      u.timeStamp = g(), u.deltaTime = u.timeStamp - P.timeStamp, u.angle = Vi(X, j), u.distance = Jt(X, j), Ro(p, u), u.offsetDirection = Qs(u.deltaX, u.deltaY);
      var ie = Js(u.deltaTime, u.deltaX, u.deltaY);
      u.overallVelocityX = ie.x, u.overallVelocityY = ie.y, u.overallVelocity = m(ie.x) > m(ie.y) ? ie.x : ie.y, u.scale = O ? Ho(O.pointers, f) : 1, u.rotation = O ? _o(O.pointers, f) : 0, u.maxPointers = p.prevInput ? u.pointers.length > p.prevInput.maxPointers ? u.pointers.length : p.prevInput.maxPointers : u.pointers.length, ko(p, u);
      var De = c.element;
      de(u.srcEvent.target, De) && (De = u.srcEvent.target), u.target = De;
    }
    function Ro(c, u) {
      var p = u.center, f = c.offsetDelta || {}, x = c.prevDelta || {}, P = c.prevInput || {};
      (u.eventType === te || P.eventType === W) && (x = c.prevDelta = {
        x: P.deltaX || 0,
        y: P.deltaY || 0
      }, f = c.offsetDelta = {
        x: p.x,
        y: p.y
      }), u.deltaX = x.x + (p.x - f.x), u.deltaY = x.y + (p.y - f.y);
    }
    function ko(c, u) {
      var p = c.lastInterval || u, f = u.timeStamp - p.timeStamp, x, P, O, X;
      if (u.eventType != re && (f > Oo || p.velocity === n)) {
        var j = u.deltaX - p.deltaX, ie = u.deltaY - p.deltaY, De = Js(f, j, ie);
        P = De.x, O = De.y, x = m(De.x) > m(De.y) ? De.x : De.y, X = Qs(j, ie), c.lastInterval = u;
      } else
        x = p.velocity, P = p.velocityX, O = p.velocityY, X = p.direction;
      u.velocity = x, u.velocityX = P, u.velocityY = O, u.direction = X;
    }
    function js(c) {
      for (var u = [], p = 0; p < c.pointers.length; )
        u[p] = {
          clientX: h(c.pointers[p].clientX),
          clientY: h(c.pointers[p].clientY)
        }, p++;
      return {
        timeStamp: g(),
        pointers: u,
        center: Zs(u),
        deltaX: c.deltaX,
        deltaY: c.deltaY
      };
    }
    function Zs(c) {
      var u = c.length;
      if (u === 1)
        return {
          x: h(c[0].clientX),
          y: h(c[0].clientY)
        };
      for (var p = 0, f = 0, x = 0; x < u; )
        p += c[x].clientX, f += c[x].clientY, x++;
      return {
        x: h(p / u),
        y: h(f / u)
      };
    }
    function Js(c, u, p) {
      return {
        x: u / c || 0,
        y: p / c || 0
      };
    }
    function Qs(c, u) {
      return c === u ? jt : m(c) >= m(u) ? c < 0 ? Et : St : u < 0 ? Pt : Mt;
    }
    function Jt(c, u, p) {
      p || (p = Ks);
      var f = u[p[0]] - c[p[0]], x = u[p[1]] - c[p[1]];
      return Math.sqrt(f * f + x * x);
    }
    function Vi(c, u, p) {
      p || (p = Ks);
      var f = u[p[0]] - c[p[0]], x = u[p[1]] - c[p[1]];
      return Math.atan2(x, f) * 180 / Math.PI;
    }
    function _o(c, u) {
      return Vi(u[1], u[0], Zt) + Vi(c[1], c[0], Zt);
    }
    function Ho(c, u) {
      return Jt(u[0], u[1], Zt) / Jt(c[0], c[1], Zt);
    }
    var $o = {
      mousedown: te,
      mousemove: Je,
      mouseup: W
    }, Uo = "mousedown", Bo = "mousemove mouseup";
    function Qt() {
      this.evEl = Uo, this.evWin = Bo, this.pressed = !1, pe.apply(this, arguments);
    }
    H(Qt, pe, {
      handler: function(u) {
        var p = $o[u.type];
        p & te && u.button === 0 && (this.pressed = !0), p & Je && u.which !== 1 && (p = W), this.pressed && (p & W && (this.pressed = !1), this.callback(this.manager, p, {
          pointers: [u],
          changedPointers: [u],
          pointerType: Bi,
          srcEvent: u
        }));
      }
    });
    var Vo = {
      pointerdown: te,
      pointermove: Je,
      pointerup: W,
      pointercancel: re,
      pointerout: re
    }, zo = {
      2: Tt,
      3: Ao,
      4: Bi,
      5: Lo
    }, en = "pointerdown", tn = "pointermove pointerup pointercancel";
    e.MSPointerEvent && !e.PointerEvent && (en = "MSPointerDown", tn = "MSPointerMove MSPointerUp MSPointerCancel");
    function zi() {
      this.evEl = en, this.evWin = tn, pe.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    H(zi, pe, {
      handler: function(u) {
        var p = this.store, f = !1, x = u.type.toLowerCase().replace("ms", ""), P = Vo[x], O = zo[u.pointerType] || u.pointerType, X = O == Tt, j = We(p, u.pointerId, "pointerId");
        P & te && (u.button === 0 || X) ? j < 0 && (p.push(u), j = p.length - 1) : P & (W | re) && (f = !0), !(j < 0) && (p[j] = u, this.callback(this.manager, P, {
          pointers: p,
          changedPointers: [u],
          pointerType: O,
          srcEvent: u
        }), f && p.splice(j, 1));
      }
    });
    var Wo = {
      touchstart: te,
      touchmove: Je,
      touchend: W,
      touchcancel: re
    }, Fo = "touchstart", Go = "touchstart touchmove touchend touchcancel";
    function sn() {
      this.evTarget = Fo, this.evWin = Go, this.started = !1, pe.apply(this, arguments);
    }
    H(sn, pe, {
      handler: function(u) {
        var p = Wo[u.type];
        if (p === te && (this.started = !0), !!this.started) {
          var f = Yo.call(this, u, p);
          p & (W | re) && f[0].length - f[1].length === 0 && (this.started = !1), this.callback(this.manager, p, {
            pointers: f[0],
            changedPointers: f[1],
            pointerType: Tt,
            srcEvent: u
          });
        }
      }
    });
    function Yo(c, u) {
      var p = Xt(c.touches), f = Xt(c.changedTouches);
      return u & (W | re) && (p = Gs(p.concat(f), "identifier", !0)), [p, f];
    }
    var qo = {
      touchstart: te,
      touchmove: Je,
      touchend: W,
      touchcancel: re
    }, Xo = "touchstart touchmove touchend touchcancel";
    function ei() {
      this.evTarget = Xo, this.targetIds = {}, pe.apply(this, arguments);
    }
    H(ei, pe, {
      handler: function(u) {
        var p = qo[u.type], f = Ko.call(this, u, p);
        f && this.callback(this.manager, p, {
          pointers: f[0],
          changedPointers: f[1],
          pointerType: Tt,
          srcEvent: u
        });
      }
    });
    function Ko(c, u) {
      var p = Xt(c.touches), f = this.targetIds;
      if (u & (te | Je) && p.length === 1)
        return f[p[0].identifier] = !0, [p, p];
      var x, P, O = Xt(c.changedTouches), X = [], j = this.target;
      if (P = p.filter(function(ie) {
        return de(ie.target, j);
      }), u === te)
        for (x = 0; x < P.length; )
          f[P[x].identifier] = !0, x++;
      for (x = 0; x < O.length; )
        f[O[x].identifier] && X.push(O[x]), u & (W | re) && delete f[O[x].identifier], x++;
      if (X.length)
        return [
          Gs(P.concat(X), "identifier", !0),
          X
        ];
    }
    var jo = 2500, nn = 25;
    function Wi() {
      pe.apply(this, arguments);
      var c = N(this.handler, this);
      this.touch = new ei(this.manager, c), this.mouse = new Qt(this.manager, c), this.primaryTouch = null, this.lastTouches = [];
    }
    H(Wi, pe, {
      handler: function(u, p, f) {
        var x = f.pointerType == Tt, P = f.pointerType == Bi;
        if (!(P && f.sourceCapabilities && f.sourceCapabilities.firesTouchEvents)) {
          if (x)
            Zo.call(this, p, f);
          else if (P && Jo.call(this, f))
            return;
          this.callback(u, p, f);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function Zo(c, u) {
      c & te ? (this.primaryTouch = u.changedPointers[0].identifier, rn.call(this, u)) : c & (W | re) && rn.call(this, u);
    }
    function rn(c) {
      var u = c.changedPointers[0];
      if (u.identifier === this.primaryTouch) {
        var p = { x: u.clientX, y: u.clientY };
        this.lastTouches.push(p);
        var f = this.lastTouches, x = function() {
          var P = f.indexOf(p);
          P > -1 && f.splice(P, 1);
        };
        setTimeout(x, jo);
      }
    }
    function Jo(c) {
      for (var u = c.srcEvent.clientX, p = c.srcEvent.clientY, f = 0; f < this.lastTouches.length; f++) {
        var x = this.lastTouches[f], P = Math.abs(u - x.x), O = Math.abs(p - x.y);
        if (P <= nn && O <= nn)
          return !0;
      }
      return !1;
    }
    var on = Kt(a.style, "touchAction"), an = on !== n, ln = "compute", hn = "auto", Fi = "manipulation", et = "none", At = "pan-x", Lt = "pan-y", ti = ea();
    function Gi(c, u) {
      this.manager = c, this.set(u);
    }
    Gi.prototype = {
      set: function(c) {
        c == ln && (c = this.compute()), an && this.manager.element.style && ti[c] && (this.manager.element.style[on] = c), this.actions = c.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var c = [];
        return A(this.manager.recognizers, function(u) {
          D(u.options.enable, [u]) && (c = c.concat(u.getTouchAction()));
        }), Qo(c.join(" "));
      },
      preventDefaults: function(c) {
        var u = c.srcEvent, p = c.offsetDirection;
        if (this.manager.session.prevented) {
          u.preventDefault();
          return;
        }
        var f = this.actions, x = me(f, et) && !ti[et], P = me(f, Lt) && !ti[Lt], O = me(f, At) && !ti[At];
        if (x) {
          var X = c.pointers.length === 1, j = c.distance < 2, ie = c.deltaTime < 250;
          if (X && j && ie)
            return;
        }
        if (!(O && P) && (x || P && p & Ne || O && p & Qe))
          return this.preventSrc(u);
      },
      preventSrc: function(c) {
        this.manager.session.prevented = !0, c.preventDefault();
      }
    };
    function Qo(c) {
      if (me(c, et))
        return et;
      var u = me(c, At), p = me(c, Lt);
      return u && p ? et : u || p ? u ? At : Lt : me(c, Fi) ? Fi : hn;
    }
    function ea() {
      if (!an)
        return !1;
      var c = {}, u = e.CSS && e.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(p) {
        c[p] = u ? e.CSS.supports("touch-action", p) : !0;
      }), c;
    }
    var ii = 1, ge = 2, at = 4, Fe = 8, Ue = Fe, Ot = 16, Ie = 32;
    function Be(c) {
      this.options = k({}, this.defaults, c || {}), this.id = Eo(), this.manager = null, this.options.enable = se(this.options.enable, !0), this.state = ii, this.simultaneous = {}, this.requireFail = [];
    }
    Be.prototype = {
      defaults: {},
      set: function(c) {
        return k(this.options, c), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(c) {
        if (S(c, "recognizeWith", this))
          return this;
        var u = this.simultaneous;
        return c = si(c, this), u[c.id] || (u[c.id] = c, c.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(c) {
        return S(c, "dropRecognizeWith", this) ? this : (c = si(c, this), delete this.simultaneous[c.id], this);
      },
      requireFailure: function(c) {
        if (S(c, "requireFailure", this))
          return this;
        var u = this.requireFail;
        return c = si(c, this), We(u, c) === -1 && (u.push(c), c.requireFailure(this)), this;
      },
      dropRequireFailure: function(c) {
        if (S(c, "dropRequireFailure", this))
          return this;
        c = si(c, this);
        var u = We(this.requireFail, c);
        return u > -1 && this.requireFail.splice(u, 1), this;
      },
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function(c) {
        return !!this.simultaneous[c.id];
      },
      emit: function(c) {
        var u = this, p = this.state;
        function f(x) {
          u.manager.emit(x, c);
        }
        p < Fe && f(u.options.event + cn(p)), f(u.options.event), c.additionalEvent && f(c.additionalEvent), p >= Fe && f(u.options.event + cn(p));
      },
      tryEmit: function(c) {
        if (this.canEmit())
          return this.emit(c);
        this.state = Ie;
      },
      canEmit: function() {
        for (var c = 0; c < this.requireFail.length; ) {
          if (!(this.requireFail[c].state & (Ie | ii)))
            return !1;
          c++;
        }
        return !0;
      },
      recognize: function(c) {
        var u = k({}, c);
        if (!D(this.options.enable, [this, u])) {
          this.reset(), this.state = Ie;
          return;
        }
        this.state & (Ue | Ot | Ie) && (this.state = ii), this.state = this.process(u), this.state & (ge | at | Fe | Ot) && this.tryEmit(u);
      },
      process: function(c) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function cn(c) {
      return c & Ot ? "cancel" : c & Fe ? "end" : c & at ? "move" : c & ge ? "start" : "";
    }
    function un(c) {
      return c == Mt ? "down" : c == Pt ? "up" : c == Et ? "left" : c == St ? "right" : "";
    }
    function si(c, u) {
      var p = u.manager;
      return p ? p.get(c) : c;
    }
    function Ce() {
      Be.apply(this, arguments);
    }
    H(Ce, Be, {
      defaults: {
        pointers: 1
      },
      attrTest: function(c) {
        var u = this.options.pointers;
        return u === 0 || c.pointers.length === u;
      },
      process: function(c) {
        var u = this.state, p = c.eventType, f = u & (ge | at), x = this.attrTest(c);
        return f && (p & re || !x) ? u | Ot : f || x ? p & W ? u | Fe : u & ge ? u | at : ge : Ie;
      }
    });
    function ni() {
      Ce.apply(this, arguments), this.pX = null, this.pY = null;
    }
    H(ni, Ce, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: Xs
      },
      getTouchAction: function() {
        var c = this.options.direction, u = [];
        return c & Ne && u.push(Lt), c & Qe && u.push(At), u;
      },
      directionTest: function(c) {
        var u = this.options, p = !0, f = c.distance, x = c.direction, P = c.deltaX, O = c.deltaY;
        return x & u.direction || (u.direction & Ne ? (x = P === 0 ? jt : P < 0 ? Et : St, p = P != this.pX, f = Math.abs(c.deltaX)) : (x = O === 0 ? jt : O < 0 ? Pt : Mt, p = O != this.pY, f = Math.abs(c.deltaY))), c.direction = x, p && f > u.threshold && x & u.direction;
      },
      attrTest: function(c) {
        return Ce.prototype.attrTest.call(this, c) && (this.state & ge || !(this.state & ge) && this.directionTest(c));
      },
      emit: function(c) {
        this.pX = c.deltaX, this.pY = c.deltaY;
        var u = un(c.direction);
        u && (c.additionalEvent = this.options.event + u), this._super.emit.call(this, c);
      }
    });
    function Yi() {
      Ce.apply(this, arguments);
    }
    H(Yi, Ce, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [et];
      },
      attrTest: function(c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.scale - 1) > this.options.threshold || this.state & ge);
      },
      emit: function(c) {
        if (c.scale !== 1) {
          var u = c.scale < 1 ? "in" : "out";
          c.additionalEvent = this.options.event + u;
        }
        this._super.emit.call(this, c);
      }
    });
    function qi() {
      Be.apply(this, arguments), this._timer = null, this._input = null;
    }
    H(qi, Be, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [hn];
      },
      process: function(c) {
        var u = this.options, p = c.pointers.length === u.pointers, f = c.distance < u.threshold, x = c.deltaTime > u.time;
        if (this._input = c, !f || !p || c.eventType & (W | re) && !x)
          this.reset();
        else if (c.eventType & te)
          this.reset(), this._timer = v(function() {
            this.state = Ue, this.tryEmit();
          }, u.time, this);
        else if (c.eventType & W)
          return Ue;
        return Ie;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(c) {
        this.state === Ue && (c && c.eventType & W ? this.manager.emit(this.options.event + "up", c) : (this._input.timeStamp = g(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Xi() {
      Ce.apply(this, arguments);
    }
    H(Xi, Ce, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [et];
      },
      attrTest: function(c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.rotation) > this.options.threshold || this.state & ge);
      }
    });
    function Ki() {
      Ce.apply(this, arguments);
    }
    H(Ki, Ce, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: Ne | Qe,
        pointers: 1
      },
      getTouchAction: function() {
        return ni.prototype.getTouchAction.call(this);
      },
      attrTest: function(c) {
        var u = this.options.direction, p;
        return u & (Ne | Qe) ? p = c.overallVelocity : u & Ne ? p = c.overallVelocityX : u & Qe && (p = c.overallVelocityY), this._super.attrTest.call(this, c) && u & c.offsetDirection && c.distance > this.options.threshold && c.maxPointers == this.options.pointers && m(p) > this.options.velocity && c.eventType & W;
      },
      emit: function(c) {
        var u = un(c.offsetDirection);
        u && this.manager.emit(this.options.event + u, c), this.manager.emit(this.options.event, c);
      }
    });
    function ri() {
      Be.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    H(ri, Be, {
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
        return [Fi];
      },
      process: function(c) {
        var u = this.options, p = c.pointers.length === u.pointers, f = c.distance < u.threshold, x = c.deltaTime < u.time;
        if (this.reset(), c.eventType & te && this.count === 0)
          return this.failTimeout();
        if (f && x && p) {
          if (c.eventType != W)
            return this.failTimeout();
          var P = this.pTime ? c.timeStamp - this.pTime < u.interval : !0, O = !this.pCenter || Jt(this.pCenter, c.center) < u.posThreshold;
          this.pTime = c.timeStamp, this.pCenter = c.center, !O || !P ? this.count = 1 : this.count += 1, this._input = c;
          var X = this.count % u.taps;
          if (X === 0)
            return this.hasRequireFailures() ? (this._timer = v(function() {
              this.state = Ue, this.tryEmit();
            }, u.interval, this), ge) : Ue;
        }
        return Ie;
      },
      failTimeout: function() {
        return this._timer = v(function() {
          this.state = Ie;
        }, this.options.interval, this), Ie;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == Ue && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function Ve(c, u) {
      return u = u || {}, u.recognizers = se(u.recognizers, Ve.defaults.preset), new ji(c, u);
    }
    Ve.VERSION = "2.0.7", Ve.defaults = {
      domEvents: !1,
      touchAction: ln,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Xi, { enable: !1 }],
        [Yi, { enable: !1 }, ["rotate"]],
        [Ki, { direction: Ne }],
        [ni, { direction: Ne }, ["swipe"]],
        [ri],
        [ri, { event: "doubletap", taps: 2 }, ["tap"]],
        [qi]
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
    var ta = 1, dn = 2;
    function ji(c, u) {
      this.options = k({}, Ve.defaults, u || {}), this.options.inputTarget = this.options.inputTarget || c, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = c, this.input = No(this), this.touchAction = new Gi(this, this.options.touchAction), mn(this, !0), A(this.options.recognizers, function(p) {
        var f = this.add(new p[0](p[1]));
        p[2] && f.recognizeWith(p[2]), p[3] && f.requireFailure(p[3]);
      }, this);
    }
    ji.prototype = {
      set: function(c) {
        return k(this.options, c), c.touchAction && this.touchAction.update(), c.inputTarget && (this.input.destroy(), this.input.target = c.inputTarget, this.input.init()), this;
      },
      stop: function(c) {
        this.session.stopped = c ? dn : ta;
      },
      recognize: function(c) {
        var u = this.session;
        if (!u.stopped) {
          this.touchAction.preventDefaults(c);
          var p, f = this.recognizers, x = u.curRecognizer;
          (!x || x && x.state & Ue) && (x = u.curRecognizer = null);
          for (var P = 0; P < f.length; )
            p = f[P], u.stopped !== dn && (!x || p == x || p.canRecognizeWith(x)) ? p.recognize(c) : p.reset(), !x && p.state & (ge | at | Fe) && (x = u.curRecognizer = p), P++;
        }
      },
      get: function(c) {
        if (c instanceof Be)
          return c;
        for (var u = this.recognizers, p = 0; p < u.length; p++)
          if (u[p].options.event == c)
            return u[p];
        return null;
      },
      add: function(c) {
        if (S(c, "add", this))
          return this;
        var u = this.get(c.options.event);
        return u && this.remove(u), this.recognizers.push(c), c.manager = this, this.touchAction.update(), c;
      },
      remove: function(c) {
        if (S(c, "remove", this))
          return this;
        if (c = this.get(c), c) {
          var u = this.recognizers, p = We(u, c);
          p !== -1 && (u.splice(p, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(c, u) {
        if (c !== n && u !== n) {
          var p = this.handlers;
          return A(ot(c), function(f) {
            p[f] = p[f] || [], p[f].push(u);
          }), this;
        }
      },
      off: function(c, u) {
        if (c !== n) {
          var p = this.handlers;
          return A(ot(c), function(f) {
            u ? p[f] && p[f].splice(We(p[f], u), 1) : delete p[f];
          }), this;
        }
      },
      emit: function(c, u) {
        this.options.domEvents && ia(c, u);
        var p = this.handlers[c] && this.handlers[c].slice();
        if (!(!p || !p.length)) {
          u.type = c, u.preventDefault = function() {
            u.srcEvent.preventDefault();
          };
          for (var f = 0; f < p.length; )
            p[f](u), f++;
        }
      },
      destroy: function() {
        this.element && mn(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function mn(c, u) {
      var p = c.element;
      if (p.style) {
        var f;
        A(c.options.cssProps, function(x, P) {
          f = Kt(p.style, P), u ? (c.oldCssProps[f] = p.style[f], p.style[f] = x) : p.style[f] = c.oldCssProps[f] || "";
        }), u || (c.oldCssProps = {});
      }
    }
    function ia(c, u) {
      var p = i.createEvent("Event");
      p.initEvent(c, !0, !0), p.gesture = u, u.target.dispatchEvent(p);
    }
    k(Ve, {
      INPUT_START: te,
      INPUT_MOVE: Je,
      INPUT_END: W,
      INPUT_CANCEL: re,
      STATE_POSSIBLE: ii,
      STATE_BEGAN: ge,
      STATE_CHANGED: at,
      STATE_ENDED: Fe,
      STATE_RECOGNIZED: Ue,
      STATE_CANCELLED: Ot,
      STATE_FAILED: Ie,
      DIRECTION_NONE: jt,
      DIRECTION_LEFT: Et,
      DIRECTION_RIGHT: St,
      DIRECTION_UP: Pt,
      DIRECTION_DOWN: Mt,
      DIRECTION_HORIZONTAL: Ne,
      DIRECTION_VERTICAL: Qe,
      DIRECTION_ALL: Xs,
      Manager: ji,
      Input: pe,
      TouchAction: Gi,
      TouchInput: ei,
      MouseInput: Qt,
      PointerEventInput: zi,
      TouchMouseInput: Wi,
      SingleTouchInput: sn,
      Recognizer: Be,
      AttrRecognizer: Ce,
      Tap: ri,
      Pan: ni,
      Swipe: Ki,
      Pinch: Yi,
      Rotate: Xi,
      Press: qi,
      on: K,
      off: ne,
      each: A,
      merge: Oe,
      extend: ue,
      assign: k,
      inherit: H,
      bindFn: N,
      prefixed: Kt
    });
    var sa = typeof e < "u" ? e : typeof self < "u" ? self : {};
    sa.Hammer = Ve, typeof n == "function" && n.amd ? n(function() {
      return Ve;
    }) : o.exports ? o.exports = Ve : e[s] = Ve;
  })(window, document, "Hammer");
})(Ar);
var qt = Ar.exports;
const dl = ul(qt), Re = /* @__PURE__ */ na({
  __proto__: null,
  default: dl
}, [qt]), Lr = 1, Or = 2, ys = 4, ml = {
  mousedown: Lr,
  mousemove: Or,
  mouseup: ys
};
function pl(o, e) {
  for (let i = 0; i < o.length; i++)
    if (e(o[i]))
      return !0;
  return !1;
}
function gl(o) {
  const e = o.prototype.handler;
  o.prototype.handler = function(s) {
    const n = this.store;
    s.button > 0 && s.type === "pointerdown" && (pl(n, (r) => r.pointerId === s.pointerId) || n.push(s)), e.call(this, s);
  };
}
function fl(o) {
  o.prototype.handler = function(i) {
    let s = ml[i.type];
    s & Lr && i.button >= 0 && (this.pressed = !0), s & Or && i.which === 0 && (s = ys), this.pressed && (s & ys && (this.pressed = !1), this.callback(this.manager, s, {
      pointers: [i],
      changedPointers: [i],
      pointerType: "mouse",
      srcEvent: i
    }));
  };
}
gl(qt.PointerEventInput);
fl(qt.MouseInput);
const yl = qt.Manager;
let _i = class {
  constructor(e, i, s) {
    this.element = e, this.callback = i, this.options = { enable: !0, ...s };
  }
};
const vl = Re ? [
  [Re.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [Re.Rotate, { enable: !1 }],
  [Re.Pinch, { enable: !1 }],
  [Re.Swipe, { enable: !1 }],
  [Re.Pan, { threshold: 0, enable: !1 }],
  [Re.Press, { enable: !1 }],
  [Re.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [Re.Tap, { event: "anytap", enable: !1 }],
  [Re.Tap, { enable: !1 }]
] : null, Dn = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
}, wl = {
  doubletap: ["tap"]
}, xl = {
  pointerdown: "pointerdown",
  pointermove: "pointermove",
  pointerup: "pointerup",
  touchstart: "pointerdown",
  touchmove: "pointermove",
  touchend: "pointerup",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup"
}, Rs = {
  KEY_EVENTS: ["keydown", "keyup"],
  MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
  WHEEL_EVENTS: [
    "wheel",
    "mousewheel"
  ]
}, bl = {
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
}, Rn = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
}, Cl = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", lt = typeof window < "u" ? window : global;
let vs = !1;
try {
  const o = {
    get passive() {
      return vs = !0, !0;
    }
  };
  lt.addEventListener("test", null, o), lt.removeEventListener("test", null);
} catch {
  vs = !1;
}
const Tl = Cl.indexOf("firefox") !== -1, { WHEEL_EVENTS: El } = Rs, kn = "wheel", _n = 4.000244140625, Sl = 40, Pl = 0.25;
class Ml extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      if (!this.options.enable)
        return;
      let r = n.deltaY;
      lt.WheelEvent && (Tl && n.deltaMode === lt.WheelEvent.DOM_DELTA_PIXEL && (r /= lt.devicePixelRatio), n.deltaMode === lt.WheelEvent.DOM_DELTA_LINE && (r *= Sl)), r !== 0 && r % _n === 0 && (r = Math.floor(r / _n)), n.shiftKey && r && (r = r * Pl), this.callback({
        type: kn,
        center: {
          x: n.clientX,
          y: n.clientY
        },
        delta: -r,
        srcEvent: n,
        pointerType: "mouse",
        target: n.target
      });
    }, this.events = (this.options.events || []).concat(El), this.events.forEach((n) => e.addEventListener(n, this.handleEvent, vs ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === kn && (this.options.enable = i);
  }
}
const { MOUSE_EVENTS: Al } = Rs, Hn = "pointermove", $n = "pointerover", Un = "pointerout", Bn = "pointerenter", Vn = "pointerleave";
class Ll extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (r) => {
      this.handleOverEvent(r), this.handleOutEvent(r), this.handleEnterEvent(r), this.handleLeaveEvent(r), this.handleMoveEvent(r);
    }, this.pressed = !1;
    const { enable: n } = this.options;
    this.enableMoveEvent = n, this.enableLeaveEvent = n, this.enableEnterEvent = n, this.enableOutEvent = n, this.enableOverEvent = n, this.events = (this.options.events || []).concat(Al), this.events.forEach((r) => e.addEventListener(r, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === Hn && (this.enableMoveEvent = i), e === $n && (this.enableOverEvent = i), e === Un && (this.enableOutEvent = i), e === Bn && (this.enableEnterEvent = i), e === Vn && (this.enableLeaveEvent = i);
  }
  handleOverEvent(e) {
    this.enableOverEvent && e.type === "mouseover" && this._emit($n, e);
  }
  handleOutEvent(e) {
    this.enableOutEvent && e.type === "mouseout" && this._emit(Un, e);
  }
  handleEnterEvent(e) {
    this.enableEnterEvent && e.type === "mouseenter" && this._emit(Bn, e);
  }
  handleLeaveEvent(e) {
    this.enableLeaveEvent && e.type === "mouseleave" && this._emit(Vn, e);
  }
  handleMoveEvent(e) {
    if (this.enableMoveEvent)
      switch (e.type) {
        case "mousedown":
          e.button >= 0 && (this.pressed = !0);
          break;
        case "mousemove":
          e.which === 0 && (this.pressed = !1), this.pressed || this._emit(Hn, e);
          break;
        case "mouseup":
          this.pressed = !1;
          break;
      }
  }
  _emit(e, i) {
    this.callback({
      type: e,
      center: {
        x: i.clientX,
        y: i.clientY
      },
      srcEvent: i,
      pointerType: "mouse",
      target: i.target
    });
  }
}
const { KEY_EVENTS: Ol } = Rs, zn = "keydown", Wn = "keyup";
class Nl extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      const r = n.target || n.srcElement;
      r.tagName === "INPUT" && r.type === "text" || r.tagName === "TEXTAREA" || (this.enableDownEvent && n.type === "keydown" && this.callback({
        type: zn,
        srcEvent: n,
        key: n.key,
        target: n.target
      }), this.enableUpEvent && n.type === "keyup" && this.callback({
        type: Wn,
        srcEvent: n,
        key: n.key,
        target: n.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(Ol), e.tabIndex = this.options.tabIndex || 0, e.style.outline = "none", this.events.forEach((n) => e.addEventListener(n, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === zn && (this.enableDownEvent = i), e === Wn && (this.enableUpEvent = i);
  }
}
const Fn = "contextmenu";
class Il extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      this.options.enable && this.callback({
        type: Fn,
        center: {
          x: n.clientX,
          y: n.clientY
        },
        srcEvent: n,
        pointerType: "mouse",
        target: n.target
      });
    }, e.addEventListener("contextmenu", this.handleEvent);
  }
  destroy() {
    this.element.removeEventListener("contextmenu", this.handleEvent);
  }
  enableEventType(e, i) {
    e === Fn && (this.options.enable = i);
  }
}
const ws = 1, Pi = 2, xs = 4, Dl = {
  pointerdown: ws,
  pointermove: Pi,
  pointerup: xs,
  mousedown: ws,
  mousemove: Pi,
  mouseup: xs
}, Rl = 1, kl = 2, _l = 3, Hl = 0, $l = 1, Ul = 2, Bl = 1, Vl = 2, zl = 4;
function Wl(o) {
  const e = Dl[o.srcEvent.type];
  if (!e)
    return null;
  const { buttons: i, button: s, which: n } = o.srcEvent;
  let r = !1, a = !1, l = !1;
  return e === xs || e === Pi && !Number.isFinite(i) ? (r = n === Rl, a = n === kl, l = n === _l) : e === Pi ? (r = !!(i & Bl), a = !!(i & zl), l = !!(i & Vl)) : e === ws && (r = s === Hl, a = s === $l, l = s === Ul), { leftButton: r, middleButton: a, rightButton: l };
}
function Fl(o, e) {
  const i = o.center;
  if (!i)
    return null;
  const s = e.getBoundingClientRect(), n = s.width / e.offsetWidth || 1, r = s.height / e.offsetHeight || 1, a = {
    x: (i.x - s.left - e.clientLeft) / n,
    y: (i.y - s.top - e.clientTop) / r
  };
  return { center: i, offsetCenter: a };
}
const Zi = {
  srcElement: "root",
  priority: 0
};
class Gl {
  constructor(e) {
    this.handleEvent = (i) => {
      if (this.isEmpty())
        return;
      const s = this._normalizeEvent(i);
      let n = i.srcEvent.target;
      for (; n && n !== s.rootElement; ) {
        if (this._emit(s, n), s.handled)
          return;
        n = n.parentNode;
      }
      this._emit(s, "root");
    }, this.eventManager = e, this.handlers = [], this.handlersByElement = /* @__PURE__ */ new Map(), this._active = !1;
  }
  isEmpty() {
    return !this._active;
  }
  add(e, i, s, n = !1, r = !1) {
    const { handlers: a, handlersByElement: l } = this;
    let h = Zi;
    typeof s == "string" || s && s.addEventListener ? h = { ...Zi, srcElement: s } : s && (h = { ...Zi, ...s });
    let m = l.get(h.srcElement);
    m || (m = [], l.set(h.srcElement, m));
    const g = {
      type: e,
      handler: i,
      srcElement: h.srcElement,
      priority: h.priority
    };
    n && (g.once = !0), r && (g.passive = !0), a.push(g), this._active = this._active || !g.passive;
    let v = m.length - 1;
    for (; v >= 0 && !(m[v].priority >= g.priority); )
      v--;
    m.splice(v + 1, 0, g);
  }
  remove(e, i) {
    const { handlers: s, handlersByElement: n } = this;
    for (let r = s.length - 1; r >= 0; r--) {
      const a = s[r];
      if (a.type === e && a.handler === i) {
        s.splice(r, 1);
        const l = n.get(a.srcElement);
        l.splice(l.indexOf(a), 1), l.length === 0 && n.delete(a.srcElement);
      }
    }
    this._active = s.some((r) => !r.passive);
  }
  _emit(e, i) {
    const s = this.handlersByElement.get(i);
    if (s) {
      let n = !1;
      const r = () => {
        e.handled = !0;
      }, a = () => {
        e.handled = !0, n = !0;
      }, l = [];
      for (let h = 0; h < s.length; h++) {
        const { type: m, handler: g, once: v } = s[h];
        if (g({
          ...e,
          type: m,
          stopPropagation: r,
          stopImmediatePropagation: a
        }), v && l.push(s[h]), n)
          break;
      }
      for (let h = 0; h < l.length; h++) {
        const { type: m, handler: g } = l[h];
        this.remove(m, g);
      }
    }
  }
  _normalizeEvent(e) {
    const i = this.eventManager.getElement();
    return {
      ...e,
      ...Wl(e),
      ...Fl(e, i),
      preventDefault: () => {
        e.srcEvent.preventDefault();
      },
      stopImmediatePropagation: null,
      stopPropagation: null,
      handled: !1,
      rootElement: i
    };
  }
}
const Yl = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: yl,
  touchAction: "none",
  tabIndex: 0
};
class ql {
  constructor(e = null, i) {
    this._onBasicInput = (n) => {
      const { srcEvent: r } = n, a = xl[r.type];
      a && this.manager.emit(a, n);
    }, this._onOtherEvent = (n) => {
      this.manager.emit(n.type, n);
    }, this.options = { ...Yl, ...i }, this.events = /* @__PURE__ */ new Map(), this.setElement(e);
    const { events: s } = this.options;
    s && this.on(s);
  }
  getElement() {
    return this.element;
  }
  setElement(e) {
    if (this.element && this.destroy(), this.element = e, !e)
      return;
    const { options: i } = this, s = i.Manager;
    this.manager = new s(e, {
      touchAction: i.touchAction,
      recognizers: i.recognizers || vl
    }).on("hammer.input", this._onBasicInput), i.recognizers || Object.keys(Dn).forEach((n) => {
      const r = this.manager.get(n);
      r && Dn[n].forEach((a) => {
        r.recognizeWith(a);
      });
    });
    for (const n in i.recognizerOptions) {
      const r = this.manager.get(n);
      if (r) {
        const a = i.recognizerOptions[n];
        delete a.enable, r.set(a);
      }
    }
    this.wheelInput = new Ml(e, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new Ll(e, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new Nl(e, this._onOtherEvent, {
      enable: !1,
      tabIndex: i.tabIndex
    }), this.contextmenuInput = new Il(e, this._onOtherEvent, {
      enable: !1
    });
    for (const [n, r] of this.events)
      r.isEmpty() || (this._toggleRecognizer(r.recognizerName, !0), this.manager.on(n, r.handleEvent));
  }
  destroy() {
    this.element && (this.wheelInput.destroy(), this.moveInput.destroy(), this.keyInput.destroy(), this.contextmenuInput.destroy(), this.manager.destroy(), this.wheelInput = null, this.moveInput = null, this.keyInput = null, this.contextmenuInput = null, this.manager = null, this.element = null);
  }
  on(e, i, s) {
    this._addEventHandler(e, i, s, !1);
  }
  once(e, i, s) {
    this._addEventHandler(e, i, s, !0);
  }
  watch(e, i, s) {
    this._addEventHandler(e, i, s, !1, !0);
  }
  off(e, i) {
    this._removeEventHandler(e, i);
  }
  _toggleRecognizer(e, i) {
    const { manager: s } = this;
    if (!s)
      return;
    const n = s.get(e);
    if (n && n.options.enable !== i) {
      n.set({ enable: i });
      const r = wl[e];
      r && !this.options.recognizers && r.forEach((a) => {
        const l = s.get(a);
        i ? (l.requireFailure(e), n.dropRequireFailure(a)) : l.dropRequireFailure(e);
      });
    }
    this.wheelInput.enableEventType(e, i), this.moveInput.enableEventType(e, i), this.keyInput.enableEventType(e, i), this.contextmenuInput.enableEventType(e, i);
  }
  _addEventHandler(e, i, s, n, r) {
    if (typeof e != "string") {
      s = i;
      for (const g in e)
        this._addEventHandler(g, e[g], s, n, r);
      return;
    }
    const { manager: a, events: l } = this, h = Rn[e] || e;
    let m = l.get(h);
    m || (m = new Gl(this), l.set(h, m), m.recognizerName = bl[h] || h, a && a.on(h, m.handleEvent)), m.add(e, i, s, n, r), m.isEmpty() || this._toggleRecognizer(m.recognizerName, !0);
  }
  _removeEventHandler(e, i) {
    if (typeof e != "string") {
      for (const a in e)
        this._removeEventHandler(a, e[a]);
      return;
    }
    const { events: s } = this, n = Rn[e] || e, r = s.get(n);
    if (r && (r.remove(e, i), r.isEmpty())) {
      const { recognizerName: a } = r;
      let l = !1;
      for (const h of s.values())
        if (h.recognizerName === a && !h.isEmpty()) {
          l = !0;
          break;
        }
      l || this._toggleRecognizer(a, !1);
    }
  }
}
class Gn {
  #e = [
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
  #t;
  #n = {
    left: !1
  };
  constructor(e) {
    this.#t = e;
  }
  has(e) {
    return this.#e.indexOf(e) != -1;
  }
  on(e, i, s, n) {
    let r = i;
    switch (e) {
      case "pointerdown":
        r = function(a) {
          this.logit(a), a.leftButton && (this.#t.pad.left = !0), this.#t.onPointerDown(a), i(this.#t.pointerEventData(a));
        };
        break;
      case "pointerup":
        r = function(a) {
          this.logit(a), this.#t.onPointerUp(a), i(this.#t.pointerEventData(a));
        };
        break;
      case "pointermove":
        r = function(a) {
          this.#t.motion(a), i(this.#t.pointerEventData(a));
        };
        break;
      case "click":
      case "dbclick":
      case "pointerenter":
      case "pointerleave":
      case "pointerout":
      case "pointerover":
      case "contextmenu":
        r = function(a) {
          this.logit(a), this.#t.location(a), i(this.#t.pointerEventData(a));
        };
        break;
      case "wheel":
        r = function(a) {
          this.logit(a), this.#t.wheeldelta = a, i(this.#t.pointerEventData(a));
        };
        break;
      case "pointercancel":
      case "gotpointercapture":
      case "lostpointercapture":
        r = function(a) {
          i(a);
        };
        break;
      case "pointerdrag":
        r = function(a) {
          this.logit(a), this.#t.motion(a), i(this.#t.pointerEventData(a));
        }, this.#t.agent.on("panstart", this.#t.startPointerDrag.bind(this.#t)), e = "panmove";
        break;
      case "pointerdragend":
        r = function(a) {
          this.logit(a), this.#t.motion(a), this.#t.endPointerDrag(a), i(this.#t.pointerEventData(a));
        }, e = "panend";
        break;
    }
    return n ? this.#t.agent.once(e, r.bind(this), s) : this.#t.agent.on(e, r.bind(this), s), r;
  }
  off(e, i, s) {
    this.#t.agent.off(e, i, s);
  }
  logit(e) {
  }
}
class Yn {
  #e = [
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
  #t;
  constructor(e) {
    this.#t = e;
  }
  has(e) {
    return this.#e.indexOf(e) != -1;
  }
  on(e, i, s, n) {
    let r = i;
    return n ? this.#t.agent.once(e, r.bind(this), s) : this.#t.agent.on(e, r.bind(this), s), r;
  }
  off(e, i, s) {
    this.#t.agent.off(e, i, s);
  }
}
class qn {
  #e = [
    "keydown",
    "keyup"
  ];
  #t;
  constructor(e) {
    this.#t = e;
  }
  has(e) {
    return this.#e.indexOf(e) != -1;
  }
  on(e, i, s, n) {
    let r = i;
    return n ? this.#t.agent.once(e, r.bind(this), s) : this.#t.agent.on(e, r.bind(this), s), r;
  }
  off(e, i, s) {
    this.#t.agent.off(e, i, s);
  }
}
const Xl = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class Le {
  #e;
  #t;
  #n;
  #r = null;
  #i = null;
  #s = null;
  #l;
  #o;
  #c = !1;
  #a;
  #h;
  #d;
  pad = { left: !1 };
  constructor(e, i) {
    if (this.#e = { ...Xl, ...i }, this.#o = cl.idle, this.#l = hl, this.#t = e, !this.#t && this.#e.elementId && (this.#t = document.getElementById(this.#e.elementId)), !R.isElement(this.#t))
      throw "Must specify an element to receive user input.";
    this.#e.contextMenu || (window.oncontextmenu = (r) => (r.preventDefault(), !1));
    const n = {
      recognizerOptions: {
        pan: { threshold: this.#l ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#n = new ql(this.#t, n), this.pointerInit();
  }
  get agent() {
    return this.#n;
  }
  get pointer() {
    return this.#r instanceof Gn ? this.#r : (this.#r = new Gn(this), this.#r);
  }
  get touch() {
    return this.#s instanceof Yn ? this.#s : (this.#s = new Yn(this), this.#s);
  }
  get key() {
    return this.#i instanceof qn ? this.#i : (this.#i = new qn(this), this.#i);
  }
  get status() {
    return this.#o;
  }
  get element() {
    return this.#t;
  }
  get isTouch() {
    return this.#l;
  }
  get isPan() {
    return this.#c;
  }
  set panX(e) {
    J(e) && (this.#a = e);
  }
  set panY(e) {
    J(y) && (this.#h = y);
  }
  set wheeldelta(e) {
    this.#d = e.delta;
  }
  get wheeldelta() {
    return this.#d;
  }
  destroy() {
    this.#n.destroy(), this.#r = void 0, this.#i = void 0, this.#s = void 0;
  }
  isValid(e, i) {
    return !!(E(e) || _(i));
  }
  validOptions(e) {
    return b(e) && J(e) ? e : void 0;
  }
  on(e, i, s, n = !1) {
    if (!this.isValid(e, i))
      return !1;
    this.pointer.has(e) ? this.#r.on(e, i, s, n) : this.touch.has(e) ? this.#s.on(e, i, s, n) : this.key.has(e) ? this.#i.on(e, i, s, n) : this.element.addEventListener(e, i, this.validOptions(s));
  }
  off(e, i, s) {
    this.#r?.has(e) ? this.#r.off(e, i, s) : this.#s?.has(e) ? this.#s.off(e, i, s) : this.#i?.has(e) ? this.#i.off(e, i, s) : this.element.removeEventListener(e, i, this.validOptions(s));
  }
  once(e, i, s) {
    this.on(e, i, s, !0);
  }
  setCursor(e) {
    this.#t.style.cursor = e;
  }
  pointerInit() {
    this.clientPosPrev = new st([null, null]), this.position = new st([0, 0]), this.movement = new st([0, 0]), this.dragstart = new st([null, null]), this.dragend = new st([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
  }
  pointerEventData(e) {
    return {
      isProcessed: !1,
      pointerType: e.pointerType,
      position: this.position.clone(),
      movement: this.movement.clone(),
      dragstart: this.dragstart.clone(),
      dragend: this.dragend.clone(),
      wheeldelta: this.wheeldelta,
      buttons: this.pointerButtons,
      domEvent: e,
      timeStamp: Date.now()
    };
  }
  motion(e) {
    let i = { left: 0, top: 0 };
    try {
      i = e.srcEvent.target?.getBoundingClientRect();
    } catch {
    }
    const s = e.srcEvent.clientX || this.position.x, n = e.srcEvent.clientY || this.position.y;
    this.movement.x = s - this.clientPosPrev.x, this.movement.y = n - this.clientPosPrev.y, this.position.x = s - i.left, this.position.y = n - i.top, this.clientPosPrev.x = s, this.clientPosPrev.y = n;
  }
  location(e) {
    let i = { left: 0, top: 0 };
    try {
      i = e.srcEvent.target?.getBoundingClientRect();
    } catch {
    }
    this.clientPosPrev.x = e.srcEvent.clientX, this.clientPosPrev.y = e.srcEvent.clientY, this.position.x = e.srcEvent.clientX - i.left, this.position.y = e.srcEvent.clientY - i.top, this.movement.x = 0, this.movement.y = 0;
  }
  onPointerDown(e) {
    this.location(e), this.pointerButtons[e.srcEvent.button] = !0;
  }
  onPointerUp(e) {
    this.location(e), this.pointerButtons[e.srcEvent.button] = !1;
  }
  startPointerDrag(e) {
    this.#c = !0, this.onPointerDown(e);
  }
  endPointerDrag(e) {
    this.#c = !1;
  }
}
class le {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  static dividerList = {};
  static divideCnt = 0;
  static class = Mn;
  static name = "Dividers";
  static type = "Divider";
  static create(e, i) {
    const s = `${i.core.id}_divider_${++le.divideCnt}`;
    return i.id = s, le.dividerList[s] = new le(e, i), le.dividerList[s];
  }
  static destroy() {
    for (let e in le.dividerList)
      le.dividerList[e].destroy();
    delete le.dividerList[id];
  }
  static defaultNode() {
    return `
  <div slot="widget" class="${Mn}" style="position: absolute;"></div>
  `;
  }
  constructor(e, i) {
    const s = { ...i };
    this.#i = e, this.#t = s.core, this.#n = s, this.#r = s.core.theme, this.#e = s.id, this.#s = s.chartPane, this.#l = e.elements.elDividers, this.init();
  }
  get el() {
    return this.#o;
  }
  get id() {
    return this.#e;
  }
  get chartPane() {
    return this.#s;
  }
  get config() {
    return this.#t.config;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#o);
  }
  get height() {
    return this.#o.getBoundingClientRect().height;
  }
  set cursor(e) {
    this.setCursorStyle(e);
  }
  get cursor() {
    return this.#a;
  }
  get type() {
    return le.type;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = "row-resize", this.eventsListen();
  }
  destroy() {
    this.#h.destroy(), this.el.remove(), delete le.dividerList[this.id];
  }
  eventsListen() {
    this.#h = new Le(this.#o, { disableContextMenu: !1 }), this.#h.on("pointerover", this.onMouseEnter.bind(this)), this.#h.on("pointerout", this.onMouseOut.bind(this)), this.#h.on("pointerdrag", this.onPointerDrag.bind(this)), this.#h.on("pointerdragend", this.onPointerDragEnd.bind(this));
  }
  on(e, i, s) {
    this.#t.on(e, i, s);
  }
  off(e, i) {
    this.#t.off(e, i);
  }
  emit(e, i) {
    this.#t.emit(e, i);
  }
  onMouseEnter() {
    this.#o.style.background = this.#r.divider.active, this.#t.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#o.style.background = this.#r.divider.idle, this.#t.MainPane.onMouseEnter();
  }
  onPointerDrag(e) {
    this.#c = this.#t.MainPane.cursorPos, this.#o.style.background = this.#r.divider.active, this.emit(`${this.id}_pointerdrag`, this.#c), this.emit("divider_pointerdrag", {
      id: this.id,
      e,
      pos: this.#c,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(e) {
    "position" in e && (this.#o.style.background = this.#r.divider.idle), this.#c = this.#t.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#c), this.emit("divider_pointerdragend", {
      id: this.id,
      e,
      pos: this.#c,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  mount() {
    this.#l.lastElementChild == null ? this.#l.innerHTML = this.dividerNode() : this.#l.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#o = R.findBySelector(`#${this.#e}`, this.#l);
  }
  dividerNode() {
    let e = this.#t.theme, i = this.#s.pos.top - R.elementDimPos(this.#l).top, s = this.#t.MainPane.rowsW + this.#t.scaleW, n = T(this.config.dividerHeight) ? this.config.dividerHeight : Xa, r = e.tools.width;
    switch (i -= n / 2, e.tools.location) {
      case "left":
        break;
      case !1:
      case "none":
      case "right":
        r *= -1;
        break;
    }
    const a = `position: absolute; top: ${i}px; left: ${r}px; z-index:100; width: ${s}px; height: ${n}px; background: ${e.divider.idle};`, l = `width: 100%; margin: 3.5px 0; border: 0; border-top: ${e.divider.style} ${e.divider.line};`;
    return `
      <div id="${this.#e}" class="divider" style="${a}"><hr style="${l}"></div>
    `;
  }
  setPos() {
    let e = this.#s.pos.top - R.elementDimPos(this.#l).top;
    e = e - this.height / 2 + 1, this.#o.style.top = `${e}px`;
  }
  setWidth() {
    this.#o.style.width = `${this.#t.MainPane.width}px`;
  }
  setCursorStyle(e) {
    E(e) && (this.#a = e, this.#o.style.cursor = e);
  }
  hide() {
    this.#o.style.display = "none";
  }
  show() {
    this.#o.style.display = "block";
  }
}
const Kl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', jl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', Zl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', Nr = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', Jl = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', Ql = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', eh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', tt = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', th = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', ih = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', sh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', nh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', rh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', oh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', ah = '<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>', lh = '<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>', hh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', ch = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', uh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', dh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <g fill-rule="evenodd">  <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z"/>  <path d="m4.4449 4.097c-0.01964 0-0.037678 0.0018-0.054687 0.0039-0.017011 0.0022-0.034068 0.0058-0.048828 0.0098-0.014761 4e-3 -0.028126 0.0081-0.041016 0.01367-0.012889 0.0056-0.025711 0.01268-0.037109 0.01953-0.022796 0.01371-0.041442 0.02783-0.060547 0.04492s-0.038191 0.03653-0.056641 0.05469c-0.024482 0.02442-0.046092 0.05037-0.064453 0.07813-0.018362 0.02775-0.032681 0.05776-0.044922 0.08789s-0.021223 0.06023-0.027344 0.0918c-0.00612 0.03156-0.00977 0.06366-0.00977 0.0957 0 8e-3 -4.378e-4 0.01543 0 0.02344v1.2988c0 0.02083 6.41e-5 0.04102 0.00195 0.06055 0.00189 0.01953 0.0061 0.03841 0.00977 0.05664 0.00366 0.01823 0.00836 0.03581 0.013672 0.05273 0.00531 0.01693 0.010742 0.0332 0.017578 0.04883 0.013672 0.03125 0.029785 0.0599 0.048828 0.08594s0.041016 0.04948 0.064453 0.07031 0.049316 0.03906 0.076172 0.05469c0.026855 0.01563 0.054687 0.02865 0.083984 0.03906 0.029297 0.01042 0.059082 0.01823 0.089844 0.02344 0.030762 0.0052 0.0625 0.0078 0.09375 0.0078s0.062988-0.0026 0.09375-0.0078 0.060547-0.01302 0.089844-0.02344 0.057129-0.02344 0.083984-0.03906c0.026855-0.01563 0.052734-0.03385 0.076172-0.05469 0.023437-0.02083 0.04541-0.04427 0.064453-0.07031s0.035156-0.05469 0.048828-0.08594c0.00684-0.01563 0.012268-0.0319 0.017578-0.04883s0.01001-0.0345 0.013672-0.05273c0.00366-0.01823 0.00787-0.03711 0.00977-0.05664 0.00189-0.01953 0.00195-0.03971 0.00195-0.06055v-0.82227h6v0.98633c0 0.02083 2e-3 0.04102 0.0039 0.06055s0.0042 0.03841 0.0078 0.05664c0.0037 0.01823 0.0084 0.03581 0.01367 0.05273 0.0053 0.01693 0.01074 0.0332 0.01758 0.04883 0.01367 0.03125 0.03174 0.0599 0.05078 0.08594s0.03906 0.04948 0.0625 0.07031 0.04932 0.03906 0.07617 0.05469c0.02686 0.01563 0.05469 0.02865 0.08399 0.03906 0.0293 0.01042 0.06104 0.01823 0.0918 0.02344 0.03076 0.0052 0.06055 0.0078 0.0918 0.0078s0.06299-0.0026 0.09375-0.0078 0.06055-0.01302 0.08984-0.02344c0.0293-0.01042 0.05908-0.02344 0.08594-0.03906 0.02686-0.01563 0.05078-0.03385 0.07422-0.05469 0.02344-0.02083 0.04541-0.04427 0.06445-0.07031s0.03516-0.05469 0.04883-0.08594c0.0068-0.01563 0.01422-0.0319 0.01953-0.04883 0.0053-0.01693 0.01001-0.0345 0.01367-0.05273 0.0037-0.01823 0.0059-0.03711 0.0078-0.05664s2e-3 -0.03971 2e-3 -0.06055v-1.4629c3.25e-4 -0.0078 0-0.01563 0-0.02344 0-0.03125-0.0026-0.06299-0.0078-0.09375s-0.01302-0.06055-0.02344-0.08984c-0.01042-0.0293-0.02344-0.05713-0.03906-0.08398-0.01563-0.02685-0.03385-0.05273-0.05469-0.07617-0.02083-0.02344-0.04427-0.04541-0.07031-0.06445s-0.05469-0.03516-0.08594-0.04883c-0.01563-0.0068-0.0319-0.01227-0.04883-0.01758-0.01693-0.0053-0.0345-0.01001-0.05273-0.01367-0.01823-0.0037-0.03711-0.0059-0.05664-0.0078s-0.03971-0.0039-0.06055-0.0039h-6.5z"/>  <path d="m11.555 11.903c0.01964 0 0.03768-0.0018 0.05469-0.0039 0.01701-0.0022 0.03407-0.0058 0.04883-0.0098s0.02813-0.0081 0.04102-0.01367c0.01289-0.0056 0.02571-0.01268 0.03711-0.01953 0.0228-0.01371 0.04144-0.02783 0.06055-0.04492 0.0191-0.01709 0.03819-0.03653 0.05664-0.05469 0.02448-0.02442 0.04609-0.05037 0.06445-0.07813 0.01836-0.02775 0.03268-0.05776 0.04492-0.08789s0.02122-0.06023 0.02734-0.0918c0.0061-0.03156 0.0098-0.06366 0.0098-0.0957 0-8e-3 4.38e-4 -0.01543 0-0.02344v-1.2988c0-0.02083-6.4e-5 -0.04102-2e-3 -0.06055-0.0019-0.01953-0.0061-0.03841-0.0098-0.05664s-0.0084-0.03581-0.01367-0.05273c-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.02979-0.0599-0.04883-0.08594s-0.04102-0.04948-0.06445-0.07031c-0.02344-0.02083-0.04932-0.03906-0.07617-0.05469s-0.05469-0.02865-0.08398-0.03906c-0.0293-0.01042-0.05908-0.01823-0.08984-0.02344-0.03076-0.0052-0.0625-0.0078-0.09375-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05713 0.02344-0.08398 0.03906-0.02685 0.01563-0.05273 0.03385-0.07617 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01227 0.0319-0.01758 0.04883-0.0053 0.01693-0.01001 0.0345-0.01367 0.05273-0.0037 0.01823-0.0079 0.03711-0.0098 0.05664s-0.0019 0.03971-0.0019 0.06055v0.82227h-6v-0.98633c0-0.02083-2e-3 -0.04102-0.0039-0.06055s-0.0042-0.03841-0.0078-0.05664c-0.0037-0.01823-0.0084-0.03581-0.01367-0.05273-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.03174-0.0599-0.05078-0.08594s-0.03906-0.04948-0.0625-0.07031-0.04932-0.03906-0.07617-0.05469c-0.02686-0.01563-0.05469-0.02865-0.08399-0.03906-0.0293-0.01042-0.06104-0.01823-0.0918-0.02344-0.03076-0.0052-0.06055-0.0078-0.0918-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05908 0.02344-0.08594 0.03906-0.02686 0.01563-0.05078 0.03385-0.07422 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01422 0.0319-0.01953 0.04883-0.0053 0.01693-0.01001 0.03451-0.01367 0.05273-0.0037 0.01823-0.0059 0.03711-0.0078 0.05664s-2e-3 0.03971-2e-3 0.06055v1.4629c-3.25e-4 0.0078 0 0.01563 0 0.02344 0 0.03125 0.0026 0.06299 0.0078 0.09375s0.01302 0.06055 0.02344 0.08984c0.01042 0.0293 0.02344 0.05713 0.03906 0.08398 0.01563 0.02685 0.03385 0.05273 0.05469 0.07617 0.02083 0.02344 0.04427 0.04541 0.07031 0.06445s0.05469 0.03516 0.08594 0.04883c0.01563 0.0068 0.0319 0.01227 0.04883 0.01758 0.01693 0.0053 0.0345 0.01001 0.05273 0.01367 0.01823 0.0037 0.03711 0.0059 0.05664 0.0078s0.03971 0.0039 0.06055 0.0039h6.5z"/></g></svg>', mh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/></svg>', ph = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/> <path d="m12.757 3.0055c-0.11087 0.0051358-0.22696 0.051177-0.33008 0.1543l-4.9883 4.9902c-0.061946 0.061947-0.086644 0.12038-0.097656 0.17773l-4.8184 4.8164c-0.1111 0.1111-0.1066 0.2109-0.10742 0.31445-3.5e-4 0.27663 0.22337 0.50035 0.5 0.5 0 0 0.18415 0.022881 0.33008-0.12305l4.9746-4.9727c0.06758-0.06758 0.10951-0.13979 0.13281-0.21289l4.7832-4.7832c0.36828-0.36828 0.017071-0.87967-0.37891-0.86133z" fill-rule="evenodd"/></svg>', gh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', fh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', yh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>', vh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>', wh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>', xh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>', bh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>', Ch = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>', Th = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>', Eh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>', Sh = '<svg width="493px" height="512px" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 493 511.77" xmlns="http://www.w3.org/2000/svg"><path d="m33.11 458.2 104.5-79.1c3.09-3 7.08-4.47 11.08-4.45l302.6-0.08c2.67 0 5.09-1.08 6.78-2.77 1.74-1.81 2.84-4.24 2.84-6.87v-323.2c0-2.59-1.12-5-2.86-6.74-1.78-1.78-4.2-2.9-6.76-2.9h-409.56c-2.54 0-4.94 1.14-6.72 2.92s-2.92 4.18-2.92 6.72c0 793.72 1.02 39.329 1.02 416.47zm90.6-229.77c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.73-19.74 19.73c-10.89 0-19.73-8.84-19.73-19.73s8.84-19.74 19.73-19.74zm0-101.14c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.74-19.74 19.74c-10.89 0-19.73-8.85-19.73-19.74s8.84-19.74 19.73-19.74zm61.72 138.89c-9.95 0-18.02-8.07-18.02-18.01 0-9.95 8.07-18.02 18.02-18.02h185.56c9.95 0 18.01 8.07 18.01 18.02 0 9.94-8.06 18.01-18.01 18.01zm0-101.13c-9.95 0-18.02-8.07-18.02-18.02 0-9.94 8.07-18.01 18.02-18.01h185.56c9.95 0 18.01 8.07 18.01 18.01 0 9.95-8.06 18.02-18.01 18.02zm-30.38 241.61-125.97 99.69c-2.96 3.32-7.24 5.42-12.01 5.42-8.85 0-17.07-7.1228-17.07-15.963v-454.08c0-11.4 4.77-21.88 12.31-29.42s18.02-12.31 29.42-12.31h409.56c11.4 0 21.9 4.74 29.45 12.29 7.5 7.51 12.26 17.96 12.26 29.44v323.2c0 11.48-4.7 21.95-12.24 29.49-7.61 7.54-18.05 12.24-29.47 12.24z" fill-rule="nonzero"/></svg>', Ph = '<svg width="800px" height="800px" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.746 2.7281c-5.1207-2.0689-10.949 0.40512-13.018 5.5258-2.0689 5.1207 0.40512 10.949 5.5258 13.018 5.1207 2.0689 10.949-0.40508 13.018-5.5258 2.0689-5.1207-0.40508-10.949-5.5258-13.018zm-1.3378 8.3035-1.2703-0.51325c-0.21854-0.08829-0.32785-0.13246-0.3683-0.22775-0.04045-0.09529 0.0037-0.20461 0.09201-0.42314l1.6595-4.1073c0.33362-0.82575 0.50047-1.2387 0.33474-1.3523-0.16582-0.11359-0.49058 0.19103-1.1403 0.8003l-4.7426 4.4469c-1.0274 0.96338-1.541 1.445-1.4405 1.9835 0.10054 0.53837 0.75347 0.80216 2.0594 1.3298l1.2703 0.51325c0.21854 0.08829 0.32785 0.13246 0.3683 0.22775 0.04045 0.09529-0.0037 0.20461-0.09201 0.42314l-1.6595 4.1073c-0.33365 0.82582-0.50047 1.2387-0.33475 1.3523 0.16582 0.1136 0.49059-0.19104 1.1403-0.80025l4.7425-4.4469c1.0275-0.96346 1.5411-1.4451 1.4406-1.9836-0.10057-0.53838-0.75352-0.80218-2.0594-1.3298z" clip-rule="evenodd" fill-rule="evenodd"/></svg>', Mh = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>', Ah = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>', je = 300, Mi = 400, Lh = `${Mi}px`, Ir = `${je}px`, Oh = "100%", Nh = "100%", Ze = 30, qe = 35, Ai = 25, Dr = 25, Li = Ai + Dr, ft = 60, ht = "normal", ct = 12, Ji = "normal", ut = "Avenir, Helvetica, Arial, sans-serif", ks = "#141414", _s = "#333", Hs = "#cccccc", Wt = "#888888", yt = "#cccccc", Rr = "25px", Ih = "position: relative;", B = {
  COLOUR_BG: ks,
  COLOUR_BORDER: _s,
  COLOUR_TXT: Hs,
  COLOUR_ICON: Wt,
  COLOUR_ICONHOVER: yt,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: ht,
  FONTSIZE: ct,
  FONTSTYLE: Ji,
  FONTFAMILY: ut,
  FONT: `${Ji} ${ct}px ${ht} ${ut}`,
  FONTSTRING: `font-style: ${Ji}; font-size: ${ct}px; font-weight: ${ht}; font-family: ${ut};`
}, xe = {
  fontSize: ct,
  fontWeight: ht,
  fontFamily: ut,
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderWidth: 1,
  txtCol: "#000000",
  bakCol: "#cccccc",
  stroke: "#ffffff",
  fill: "#888888"
}, Xe = {
  COLOUR_ICON: Wt,
  COLOUR_ICONHOVER: yt,
  ICONSIZE: Rr
}, dt = {
  COLOUR_ICON: Wt,
  COLOUR_ICONHOVER: yt,
  ICONSIZE: Rr
}, Qi = {
  COLOUR_BG: ks,
  COLOUR_BORDER: _s,
  COLOUR_TXT: Hs
}, es = {
  COLOUR_BG: ks,
  COLOUR_BORDER: _s,
  COLOUR_TXT: Hs
}, Dh = {
  FILL: yt + "88"
}, Z = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, ai = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, yi = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, Xn = ht, vi = ct, wi = ut, Pe = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: wi,
  FONTSIZE: vi,
  FONTWEIGHT: Xn,
  FONT_LABEL: `${Xn} ${vi}px ${wi}`,
  FONT_LABEL_BOLD: `bold ${vi}px ${wi}`
}, Kn = ht, jn = ct, Zn = ut, it = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: Zn,
  FONTSIZE: jn,
  FONTWEIGHT: Kn,
  FONT_LABEL: `${Kn} ${jn}px ${Zn}`,
  FONT_LABEL_BOLD: `bold ${vi}px ${wi}`
}, kr = {
  COLOUR_GRID: "#222"
}, Rh = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, ts = {
  text: B.FONTSTRING,
  font: B.FONT,
  colour: B.COLOUR_TXT
}, li = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00",
  LINE: B.COLOUR_BORDER,
  STYLE: "1px solid"
}, kh = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: B.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}, is = { arrowDown: yh, arrowUp: vh, arrowDownRound: wh, arrowUpRound: xh, arrowDownRoundSolid: bh, arrowUpRoundSolid: Ch, buySolid: Th, sellSolid: Eh }, Jn = { noteSolid: Sh, lightning: Ph }, _r = {
  candle: {
    Type: Z.CANDLE_SOLID,
    UpBodyColour: ai.COLOUR_CANDLE_UP,
    UpWickColour: ai.COLOUR_WICK_UP,
    DnBodyColour: ai.COLOUR_CANDLE_DN,
    DnWickColour: ai.COLOUR_WICK_DN
  },
  volume: {
    Height: yi.ONCHART_VOLUME_HEIGHT,
    UpColour: yi.COLOUR_VOLUME_UP,
    DnColour: yi.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: it.COLOUR_TICK,
    colourLabel: it.COLOUR_LABEL,
    colourCursor: it.COLOUR_CURSOR,
    colourCursorBG: it.COLOUR_CURSOR_BG,
    fontFamily: it.FONTFAMILY,
    fontSize: it.FONTSIZE,
    fontWeight: it.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: Wt,
    iconHover: yt
  },
  yAxis: {
    colourTick: Pe.COLOUR_TICK,
    colourLabel: Pe.COLOUR_LABEL,
    colourCursor: Pe.COLOUR_CURSOR,
    colourCursorBG: Pe.COLOUR_CURSOR_BG,
    fontFamily: Pe.FONTFAMILY,
    fontSize: Pe.FONTSIZE,
    fontWeight: Pe.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: B.COLOUR_BG,
    BorderColour: B.COLOUR_BORDER,
    BorderThickness: B.BORDER_THICKNESS,
    TextColour: B.COLOUR_TXT,
    FontWeight: B.FONTWEIGHT,
    FontSize: B.FONTSIZE,
    FontStyle: B.FONTSTYLE,
    FontFamily: B.FONTFAMILY,
    Font: B.FONT,
    FontString: B.FONTSTRING,
    GridColour: kr.COLOUR_GRID
  },
  primaryPane: {
    separator: "#666"
  },
  secondaryPane: {
    separator: "#666"
  },
  time: {
    navigation: !1,
    font: ts.font,
    colour: "#96a9db",
    handleColour: "#586ea6"
  },
  legend: {
    font: ts.font,
    colour: ts.colour,
    controls: !0,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: Wt,
    hover: yt
  },
  divider: {
    active: li.ACTIVE,
    idle: li.IDLE,
    line: li.LINE,
    style: li.STYLE
  },
  watermark: kh,
  trades: {
    iconBuy: is.arrowUp,
    iconSell: is.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    buyColour: "#0f0",
    sellColour: "#f00",
    defaultIcons: is,
    offset: 10
  },
  events: {
    iconEvent: Jn.lightning,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    iconColour: "#ccc",
    defaultIcons: Jn,
    offset: 10
  }
}, _h = `
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
</style>`, Hh = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${Lh});
    min-height: var(--txc-min-height, ${Ir});
    max-width: var(--txc-max-width, ${Oh});
    max-height: var(--txc-max-height, ${Nh});
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
`;
class ze {
  #e;
  #t;
  #n;
  #r = {};
  #i;
  #s;
  #l = "stopped";
  #o;
  #c;
  #a;
  #h;
  #d = ["await", "idle", "running", "stopped"];
  constructor(e, i) {
    if (!ze.validateConfig(e))
      return !1;
    const s = { ...e };
    this.id = s.id, this.#i = s, this.#t = s.initial, this.#r.origin = i, this.#h = s.actions, this.#s = i.core, this.#u();
  }
  set id(e) {
    this.#e = $e(e);
  }
  get id() {
    return this.#e;
  }
  get state() {
    return this.#t;
  }
  get previousSate() {
    return this.#n;
  }
  get context() {
    return this.#r;
  }
  get core() {
    return this.#s;
  }
  get status() {
    return this.#l;
  }
  get event() {
    return this.#c;
  }
  get events() {
    return this.#o;
  }
  get eventData() {
    return this.#a;
  }
  get actions() {
    return this.#h;
  }
  notify(e, i) {
    this.#c = e, this.#a = i;
    const s = this.#i.states[this.#t];
    let n = s.on[e];
    if (!n || !_(n.action) || this.#l !== "running")
      return !1;
    let r = n?.condition?.type || n?.condition || !1;
    if (r && !this.condition.call(this, r, n.condition))
      return !1;
    const a = n.target, l = this.#i.states[a];
    if (s?.onExit.call(this, i), n.action.call(this, i), this.#n = this.#t, this.#t = a, l?.onEnter.call(this, i), this.#i.states[a]?.on && (this.#i.states[a].on[""] || this.#i.states[a].on?.always)) {
      const h = this.#i.states[a].on[""] || this.#i.states[a].on.always;
      if (M(h))
        for (let m of h) {
          let g = m?.condition?.type || m?.condition || !1;
          this.condition.call(this, g, m.condition) && E(m.target) && (m?.action.call(this, i), this.#n = this.#t, this.#t = m?.target, this.notify(null, null));
        }
      else if (b(h) && E(h.target)) {
        let m = h?.condition?.type || h?.condition || !1;
        this.condition.call(this, m, h.condition) && E(h.target) && (h?.action.call(this, i), this.#n = this.#t, this.#t = h.target, this.notify(null, null));
      }
    }
    return this.#t;
  }
  condition(e, i = null, s = {}) {
    return e ? this.#i.guards[e].call(this, this.#r, i, s) : !1;
  }
  canTransition(e) {
    const i = this.#i.states[this.#t];
    return e in i.on;
  }
  start() {
    this.#l = "running";
  }
  stop() {
    this.#l = "stopped";
  }
  destroy() {
    this.#m(), this.#i = null;
  }
  #u() {
    this.#o = /* @__PURE__ */ new Set();
    for (let e in this.#i.states)
      for (let i in this.#i.states[e].on) {
        let s = this.notify.bind(this, i);
        this.#o.add({ topic: i, cb: s }), this.#s.on(i, s, this.context);
      }
  }
  #m() {
    for (let e of this.#o)
      this.#s.off(e.topic, e.cb);
  }
  static validateConfig(e) {
    if (!b(e))
      return !1;
    const i = ["id", "initial", "context", "states"];
    let s = Object.keys(e);
    if (!Pr(i, s) || !(e.initial in e.states))
      return !1;
    for (let n in e.states) {
      if (!b(e.states[n]) || "onEnter" in e.states[n] && !_(e.states[n].onEnter) || "onExit" in e.states[n] && !_(e.states[n].onExit))
        return !1;
      if ("on" in e.states[n])
        for (let r in e.states[n].on) {
          let a = e.states[n].on[r];
          if (!E(a.target) || "action" in a && !_(a.action))
            return !1;
        }
    }
    return !0;
  }
}
const $h = "alert";
class Uh {
  #e = new be();
  #t = {};
  constructor(e) {
    if (M(e))
      for (let i of e)
        this.add(i?.price, i?.condition, i?.handler);
  }
  get list() {
    return this.#e;
  }
  get handlers() {
    return this.#t;
  }
  destroy() {
    this.#e.clear(), this.#t = {};
  }
  batchAdd(e) {
    if (M(e)) {
      let i = [];
      for (let s of e)
        i.push(this.add(s?.price, s?.condition, s?.handler));
      return i;
    } else
      return !1;
  }
  add(e, i, s) {
    if (isNaN(e) || !_(s))
      return !1;
    const n = ee($h), r = { price: e, condition: i };
    if (this.list.has(r)) {
      let a = this.list.get(r);
      a[n] = s;
    } else {
      const a = {};
      a[n] = s, this.list.set(r, a);
    }
    return this.#t[n] = { alert: r, handler: s }, n;
  }
  remove(e) {
    if (!(e in this.#t))
      return !1;
    const i = this.#t[e], s = i.alert, n = this.#e.get(s);
    return n.delete(e), i.delete(e), Object.keys(n).length == 0 && this.#e.delete(s), !0;
  }
  delete(e, i) {
    if (this.list.has({ price: e, condition: i })) {
      const s = this.list.get({ price: e, condition: i });
      for (let n in s)
        this.#t.delete(n), s.delete(n);
    }
    return this.list.delete({ price: e, condition: i });
  }
  pause(e) {
    if (!(e in this.#t))
      return !1;
    this.#t[e];
  }
  handlerByID(e) {
    return e in this.#t ? this.#t[e].handler : !1;
  }
  check(e, i) {
    if (!(!M(e) || !M(i))) {
      for (let [s, n] of this.list)
        if (s.condition(s.price, e, i))
          for (let r in n)
            try {
              n[r](s.price, e, i);
            } catch (a) {
              console.error(a);
            }
    }
  }
}
const Bh = 0, Vh = 1, zh = 2, Wh = 3, Fh = 4, Gh = 5, hi = [null, null, null, null, null], ci = {
  tfCountDown: !0,
  alerts: []
};
class mt {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o = hi;
  #c = 0;
  #a = 0;
  #h = "";
  #d = !1;
  #u;
  #m;
  #y = hi;
  #g;
  static validateConfig(e) {
    if (b(e)) {
      let i = ce(ci);
      e = gt(i, e), e.tfCountDown = J(e.tfCountDown) ? e.tfCountDown : ci.tfCountDown, e.alerts = M(e.alerts) ? e.alerts : ci.alerts;
    } else
      return ci;
    return e;
  }
  constructor(e) {
    this.#e = e, this.#r = e.time, this.status = { status: Qa }, this.#t = mt.validateConfig(e.config?.stream), this.#i = T(e.config?.maxCandleUpdate) ? e.config.maxCandleUpdate : il, this.#l = T(e.config?.streamPrecision) ? e.config.streamPrecision : sl;
  }
  get config() {
    return this.#t;
  }
  get countDownMS() {
    return this.#a;
  }
  get countDown() {
    return this.#h;
  }
  get range() {
    return this.#e.range;
  }
  get status() {
    return this.#n;
  }
  set status({ status: e, data: i }) {
    this.#n = e, this.emit(e, i);
  }
  set dataReceived(e) {
    this.#d || (this.#d = !0, this.status = { status: Vt, data: e });
  }
  get alerts() {
    return this.#g;
  }
  get lastPriceMin() {
    return this.#m;
  }
  set lastPriceMin(e) {
    T(e) && (this.#m = e);
  }
  get lastPriceMax() {
    return this.#u;
  }
  set lastPriceMax(e) {
    T(e) && (this.#u = e);
  }
  get lastTick() {
    return this.#y;
  }
  set lastTick(e) {
    M(e) && (this.#y, this.#y = e, this.alerts.check(e, this.#o));
  }
  set candle(e) {
    const i = [...this.#o];
    e.t = this.roundTime(new Date(e.t)), e.o = e.o * 1, e.h = e.h * 1, e.l = e.l * 1, e.c = e.c * 1, e.v = e.v * 1, this.#o[Bh] !== e.t ? this.newCandle(e) : this.updateCandle(e), this.status = { status: $t, data: this.#o }, this.lastTick = i;
  }
  get candle() {
    return this.#o !== hi ? this.#o : null;
  }
  start() {
    this.#g = new Uh(this.#t.alerts), this.status = { status: On }, this.#s = setInterval(this.onUpdate.bind(this), this.#i);
  }
  stop() {
    this.#g.destroy(), this.status = { status: el };
  }
  emit(e, i) {
    this.#e.emit(e, i);
  }
  error() {
    this.status = { status: tl };
  }
  onTick(e) {
    (this.#n == On || this.#n == $t) && b(e) && (this.candle = e);
  }
  onUpdate() {
    this.#o !== hi && (this.status = { status: _e, data: this.candle }, this.status = { status: $t, data: this.#o });
  }
  newCandle(e) {
    this.prevCandle(), this.#o = [
      e.t,
      e.o,
      e.h,
      e.l,
      e.c,
      e.v,
      null,
      !0
    ], this.#e.state.mergeData({ ohlcv: [this.#o] }, !0, !1), this.status = { status: zt, data: { data: e, candle: this.#o } }, this.#a = this.#r.timeFrameMS, this.#c = this.roundTime(Date.now());
  }
  prevCandle() {
    const e = this.#e.allData.data;
    e.length > 0 && e[e.length - 1][7] && (e[e.length - 1].length = 6);
  }
  updateCandle(e) {
    let i = this.#o;
    i[Vh] = e.o, i[zh] = e.h, i[Wh] = e.l, i[Fh] = e.c, i[Gh] = e.v, this.#o = i;
    const s = this.#e.allData.data, n = s.length > 0 ? s.length - 1 : 0;
    s[n] = this.#o, this.countDownUpdate();
  }
  countDownUpdate() {
    let e, i, s, n, r, a, l;
    this.#r.timeFrameMS;
    let h = this.#r.timeFrameMS - (Date.now() - this.#c);
    return h < 0 && (h = 0), this.#a = h, h > ve ? (e = String(Math.floor(h / ve)), i = String(Math.floor(h % ve / he)).padStart(2, "0"), this.#h = `${e}Y ${i}M`) : h > he ? (i = String(Math.floor(h / he)).padStart(2, "0"), n = String(Math.floor(h % he / V)).padStart(2, "0"), this.#h = `${i}M ${n}D`) : h > pt ? (s = String(Math.floor(h / pt)).padStart(2, "0"), n = String(Math.floor(h % he / V)).padStart(2, "0"), this.#h = `${s}W ${n}D`) : h > V ? (n = String(Math.floor(h / V)).padStart(2, "0"), r = String(Math.floor(h % V / Q)).padStart(2, "0"), a = String(Math.floor(h % Q / Y)).padStart(2, "0"), this.#h = `${n}D ${r}:${a}`) : h > Q ? (r = String(Math.floor(h / Q)).padStart(2, "0"), a = String(Math.floor(h % Q / Y)).padStart(2, "0"), l = String(Math.floor(h % Y / F)).padStart(2, "0"), this.#h = `${r}:${a}:${l}`) : h > Y ? (a = String(Math.floor(h / Y)).padStart(2, "0"), l = String(Math.floor(h % Y / F)).padStart(2, "0"), this.#h = `00:${a}:${l}`) : (l = String(Math.floor(h / F)).padStart(2, "0"), String(h % F).padStart(4, "0"), this.#h = `00:00:${l}`), this.#h;
  }
  roundTime(e) {
    return e - e % this.#e.time.timeFrameMS;
  }
}
const Qn = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class Se {
  static #e = new be();
  static get list() {
    return Se.#e;
  }
  #t;
  static create(e, i) {
    if (!b(e))
      return !1;
    e.id = E(e.name) ? ee(e.name) : `${i.id}.theme`;
    const s = new Se(e, i);
    return Se.list.set(e.id, s), s;
  }
  constructor(e, i) {
    this.#t = i, this.setCurrent(e);
  }
  get list() {
    return Se.list;
  }
  setCurrent(e = {}) {
    e = b(e) ? e : {};
    const i = ce(_r), s = ce(e), n = gt(i, s);
    for (let r in n)
      Qn.includes(r) || (this[r] = n[r]);
    this.#t.refresh();
  }
  setTheme(e) {
    if (E(e) && Se.list.has(e)) {
      const i = Se.list.get(e);
      return this.setCurrent(i), !0;
    }
    return !1;
  }
  setProperty(e, i) {
    if (!E(e))
      return;
    const s = fn(this, e), n = e.split(".");
    if (n.length == 1)
      this[n[0]] = i;
    else {
      let r = n.shift();
      this[r] = Sr(this[r], n.join("."), i);
    }
    return this.#t.refresh(), s;
  }
  getProperty(e) {
    return fn(this, e);
  }
  deleteTheme(e) {
    return E(e) && Se.list.has(e) ? (Se.list.delete(e), !0) : !1;
  }
  exportTheme(e = {}) {
    b || (e = {});
    const i = e?.type, s = {};
    let n;
    for (let r in this)
      Qn.includes(r) || (s[r] = this[r]);
    switch (i) {
      case "json":
      default:
        const { replacer: r, space: a } = { ...e };
        n = JSON.stringify(s, r, a);
    }
    return n;
  }
}
class Yh {
  #e;
  constructor(e) {
    this.#e = e, self.onmessage = (i) => this._onmessage(i.data);
  }
  _onmessage(e) {
    const { r: i, data: s } = e;
    try {
      const n = this.#e(s, i);
      self.postMessage({ r: i, status: !0, result: n });
    } catch (n) {
      self.postMessage({ r: i, status: !1, result: n });
    }
  }
  end() {
    self.close();
  }
}
class qh {
  #e;
  #t;
  #n;
  #r = 0;
  #i = {};
  #s;
  constructor(e, i, s, n) {
    this.#e = e, this.#t = s, this.#n = n;
    const r = `
      ${Me.ThreadWorker.toString()};
      const fn = ${i}
      const worker = new ThreadWorker(fn)
    `, a = new Blob([`;(async () => {${r}})().catch(e => {console.error(e)})`], { type: "text/javascript" }), l = URL.createObjectURL(a);
    this.#s = new Worker(l);
  }
  get id() {
    return this.#e;
  }
  get req() {
    return `r_${this.#r++}`;
  }
  get cb() {
    return this.#t;
  }
  set cb(e) {
    this.#t = e;
  }
  onmessage(e) {
    return _(this.#t) ? this.#t(e) : e;
  }
  onerror(e) {
    return _(this.#n) ? this.#n(e) : e;
  }
  postMessage(e) {
    return new Promise((i, s) => {
      try {
        let n = this.req;
        this.#i[n] = { resolve: i, reject: s }, this.#s.postMessage({ r: n, data: e }), this.#s.onmessage = (r) => {
          const { r: a, status: l, result: h } = r.data;
          if (a in this.#i) {
            const { resolve: m, reject: g } = this.#i[a];
            delete this.#i[a], l ? m(this.onmessage(h)) : g(this.onerror({ r: a, result: h }));
          } else if (l == "resolved")
            this.onmessage(h);
          else
            throw new Error("Orphaned thread request ${r}");
        }, this.#s.onerror = (r) => {
          s(this.onerror(r));
        };
      } catch (n) {
        s(n);
      }
    });
  }
  terminate() {
    this.#s.terminate();
  }
}
class Me {
  static #e = /* @__PURE__ */ new Map();
  static ThreadWorker = Yh;
  static Thread = qh;
  static create(e, i = "worker", s) {
    if (typeof window.Worker > "u")
      return !1;
    if (_(e))
      e = e.toString();
    else if (!E(e))
      return !1;
    return i = E(i) ? ee(i) : ee("worker"), Me.#e.set(i, new Me.Thread(i, e, s)), Me.#e.get(i);
  }
  static destroy(e) {
    if (!E(e))
      return !1;
    Me.#e.get(e).terminate(), Me.#e.delete(e);
  }
  static end() {
    Me.#e.forEach((e, i, s) => {
      Me.destroy(i);
    });
  }
}
class Xh {
  #e = {};
  constructor() {
  }
  on(e, i, s) {
    return !E(e) || !_(i) ? !1 : (this.#e[e] || (this.#e[e] = []), this.#e[e].push({ handler: i, context: s }), !0);
  }
  off(e, i, s) {
    if (!E(e) || !_(i) || !(e in this.#e))
      return !1;
    const n = this.#e[e];
    for (let r = 0; r < n.length; r++)
      if (n[r].handler === i) {
        if (s !== void 0 && n[r].context !== s)
          continue;
        if (n.splice(r, 1), n.length === 0) {
          delete this.#e[e];
          break;
        }
      }
    return !0;
  }
  emit(e, i) {
    E(e) && (this.#e[e] || []).forEach((s) => s.handler.call(s.context, i));
  }
  execute(e, i, s) {
  }
}
class ae extends HTMLElement {
  shadowRoot;
  template;
  id = ee(Ht);
  doInit = !0;
  intersectionObserver;
  mutationObserver;
  resizeObserver;
  DOM = {
    width: 0,
    height: 0,
    style: {}
  };
  oldDOM = {};
  subscribers = {
    resize: [],
    mutation: [],
    intersection: []
  };
  #e;
  constructor(e, i = "open") {
    super(), this.template = e, this.shadowRoot = this.attachShadow({ mode: i }), this.#e = new Xh();
  }
  destroy() {
  }
  connectedCallback(e) {
    this.doInit && (this.doInit = !1, this.shadowRoot.appendChild(this.template.content.cloneNode(!0)), this.style.display = "block", this.DOM.width = this.clientWidth, this.DOM.height = this.clientHeight, this.oldDOM.width = this.clientWidth, this.oldDOM.height = this.clientHeight, this.resizeObserver = new ResizeObserver(this.onResize.bind(this)), this.resizeObserver.observe(this), _(e) && e());
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect(), this.#e = void 0;
  }
  get width() {
    return this.DOM.width;
  }
  set width(e) {
    this.setDim(e, "width");
  }
  get oWidth() {
    return this.oldDOM.width;
  }
  get height() {
    return this.DOM.height;
  }
  set height(e) {
    this.setDim(e, "height");
  }
  get oHeight() {
    return this.oldDOM.height;
  }
  get widthDeltaR() {
    return this.DOM.width / this.oldDOM.width;
  }
  get heightDeltaR() {
    return this.DOM.height / this.oldDOM.height;
  }
  get top() {
    return this.DOM.top;
  }
  get left() {
    return this.DOM.left;
  }
  get bottom() {
    return this.DOM.bottom;
  }
  get right() {
    return this.DOM.right;
  }
  get x() {
    return this.x;
  }
  get y() {
    return this.y;
  }
  get dimensions() {
    return this.DOM;
  }
  set cursor(e) {
    this.style.cursor = e;
  }
  get cursor() {
    return this.style.cursor;
  }
  setDim(e, i) {
    !["width", "height"].includes(i) || !E(e) || (T(e) ? (this.DOM[i] = e, e += "px") : E(e) || (this.DOM[i] = this.parentElement.getBoundingClientRect().width, e = this.DOM[i] + "px"), this.style[i] = e);
  }
  onIntersection(e) {
    this.emit("intersection");
  }
  onMutation(e) {
    this.emit("mutation");
  }
  onResize(e) {
    this.oldDOM = { ...this.DOM };
    for (let i in e[0].contentRect) {
      const s = e[0].contentRect[i];
      _(s) || (this.DOM[i] = s);
    }
    this.emit("resize", this.DOM);
  }
  on(e, i, s) {
    this.#e.on(e, i, s);
  }
  off(e, i, s) {
    this.#e.off(e, i, s);
  }
  emit(e, i) {
    this.#e.emit(e, i);
  }
}
class Hr {
  #e;
  #t;
  #n;
  constructor(e) {
    this.#t = e, this.#e = this.#t.core, this.#n = this.#e.Chart;
  }
  get core() {
    return this.#e;
  }
  get chart() {
    return this.#n;
  }
  get parent() {
    return this.#t;
  }
  get theme() {
    return this.#e.theme;
  }
  get width() {
    return this.#n.width;
  }
  get height() {
    return this.#n.height;
  }
  get data() {
    return this.#n.data;
  }
  get range() {
    return this.#n.range;
  }
  get yDigits() {
    return this.#n.yAxisDigits;
  }
  float2Int(e) {
    return Ma(e);
  }
  numDigits(e) {
    return Tr(e);
  }
  countDigits(e) {
    return Pa(e);
  }
  precision(e) {
    return Er(e);
  }
}
class xi extends Hr {
  #e = 4;
  #t;
  #n = !0;
  constructor(e) {
    super(e);
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
    return this.width / this.range.Length;
  }
  get candlesOnLayer() {
    return we(this.core.Chart.layerWidth / this.candleW);
  }
  get xAxisRatio() {
    return this.width / this.range.rangeDuration;
  }
  set xAxisTicks(e) {
    this.#e = T(e) ? e : 0;
  }
  get xAxisTicks() {
    return this.#e;
  }
  get xAxisGrads() {
    return this.#t;
  }
  get scrollOffsetPx() {
    return this.core.scrollPos % this.candleW;
  }
  get bufferPx() {
    return this.core.bufferPx;
  }
  xPos(e) {
    return we(this.range.rangeIndex(e) * this.candleW + this.candleW * 0.5);
  }
  t2Index(e) {
    return this.range.rangeIndex(e);
  }
  t2Pixel(e) {
    return this.xPos(e);
  }
  pixel2T(e) {
    let i = this.pixel2Index(e);
    return this.range.value(i)[0];
  }
  pixel2Index(e) {
    e -= this.candleW / 2;
    let i = this.range.indexStart, s = we(e / this.candleW);
    return i + s;
  }
  pixelOHLCV(e) {
    let i = this.pixel2Index(e);
    return this.range.value(i);
  }
  xPosSnap2CandlePos(e) {
    let i = e % this.candleW, s = i ? this.candleW / 2 : 0;
    return we(e - i + s);
  }
  xPos2Time(e) {
    return this.pixel2T(e);
  }
  xPos2Index(e) {
    return this.pixel2Index(e);
  }
  xPosOHLCV(e) {
    return this.pixelOHLCV(e);
  }
  initXAxisGrads() {
    this.#t = this.calcXAxisGrads();
  }
  doCalcXAxisGrads(e) {
    this.#t = this.calcXAxisGrads(e);
  }
  calcXAxisGrads(e = this.range.snapshot()) {
    const i = {
      entries: {},
      values: [],
      major: [],
      minor: []
    }, s = Ss(e.rangeDuration);
    i.units = s;
    for (let g in s)
      if (s[g] > 0) {
        i.units = [g, g], i.timeSpan = `${s[g]} ${g}`;
        break;
      }
    const n = e.interval, { xStep: r, rank: a } = this.xStep(e), l = this.pixel2T(this.width) + r;
    let h = e.timeMin - e.timeMin % r - r, m = h;
    for (; h < l; ) {
      let g = mi(h, "years"), v = mi(h, "months"), S = mi(h, "days");
      !(g in i.entries) && g >= m ? i.entries[g] = [this.dateTimeValue(g, n, a), this.t2Pixel(g), g, "major"] : !(v in i.entries) && v >= m ? i.entries[v] = [this.dateTimeValue(v, n, a), this.t2Pixel(v), v, "major"] : !(S in i.entries) && S >= m && (i.entries[S] = [this.dateTimeValue(S, n, a), this.t2Pixel(S), S, "major"]), i.entries[h] = [this.dateTimeValue(h, n, a), this.t2Pixel(h), h, "minor"], h += r;
    }
    return i.values = Object.values(i.entries), i;
  }
  xStep(e) {
    let i = qa, s = this.#n ? e.interval : 1, n = Dt[0], r = we(this.width / e.Length), a = ls[0], l = Dt.indexOf(s);
    for (; l-- >= 0 && !(r * (Dt[l] / s) >= i); )
      ;
    return n = Dt[l], a = ls[l], { xStep: n, rank: a };
  }
  dateTimeValue(e, i, s) {
    if (e / V % 1 === 0) {
      const n = Ls(e);
      return n === 1 ? Os(e) === 0 ? br(e) : wr(e) : n;
    } else
      switch (s) {
        case "milliseconds":
          return us(e);
        case "seconds":
          return us(e);
        case "minutes":
          return cs(e);
        case "hours":
          return cs(e);
      }
  }
}
const ss = {
  id: "time",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        resize: {
          target: "resize",
          action(o) {
          }
        },
        xAxis_scale: {
          target: "scale",
          action(o) {
          }
        },
        xAxis_inc: {
          target: "incremental",
          action(o) {
          }
        },
        xAxis_log: {
          target: "logarithmic",
          action(o) {
          }
        },
        xAxis_100: {
          target: "percentual",
          action(o) {
          }
        },
        chart_pan: {
          target: "chart_pan",
          action(o) {
          }
        }
      }
    },
    resize: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        someEvent: {
          target: "",
          action(o) {
          }
        }
      }
    },
    chart_pan: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        chart_pan: {
          target: "chart_pan",
          action(o) {
          }
        },
        chart_panDone: {
          target: "idle",
          action(o) {
          }
        }
      }
    }
  },
  guards: {}
}, er = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, tr = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, ir = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, sr = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, nr = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class $r {
  #e = {
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
  constructor(e) {
    this.#t(e), er.test(e) && this.#n(e), tr.test(e) && this.#r(e), ir.test(e) && this.#i(e), sr.test(e) && this.#s(e), nr.test(e) && this.#l(e);
  }
  get value() {
    return this.#e;
  }
  get isValid() {
    return this.#e.isValid;
  }
  get hex() {
    return this.#e.hex.slice(0, -2);
  }
  get hexa() {
    return this.#e.hex;
  }
  #t(e) {
    if (ll) {
      let i = document.getElementById("divValidColourTest");
      i || (i = document.createElement("div"), i.id = "divValidColourTest"), i.style.backgroundColor = "", i.style.backgroundColor = e, this.#e.isValid = !!i.style.backgroundColor.length;
    } else
      this.#e.isValid = !!(er.test(e) || tr.test(e) || ir.test(e) || sr.test(e) || nr.test(e));
  }
  setHex(e) {
    let i = this.#e;
    [
      i.r16,
      i.g16,
      i.b16,
      i.a16
    ] = e, i.hex = "#" + i.r16 + i.g16 + i.b16 + i.a16;
  }
  setRGBA(e) {
    let i = this.#e;
    [
      i.r,
      i.g,
      i.b,
      i.a
    ] = e, i.rgb = `rgb(${e[0]},${e[1]},${e[2]})`, i.rgba = `rgb(${e[0]},${e[1]},${e[2]},${e[3]})`;
  }
  setHSLA(e) {
    let i = this.#e;
    [
      i.h,
      i.s,
      i.l,
      i.a
    ] = e, i.hsl = `hsl(${e[0]},${e[1]}%,${e[2]}%)`, i.hsla = `hsl(${e[0]},${e[1]}%,${e[2]}%,${e[3]})`;
  }
  #n(e) {
    this.#e.hex = e;
    let i = e.length, s;
    switch (i) {
      case 4:
        s = [`${e[1]}${e[1]}`, `${e[2]}${e[2]}`, `${e[3]}${e[3]}`, "ff"];
        break;
      case 7:
        s = [e.substr(1, 2), e.substr(3, 2), e.substr(5, 2), "ff"];
        break;
      case 9:
        s = [e.substr(1, 2), e.substr(3, 2), e.substr(5, 2), e.substr(7, 2)];
        break;
    }
    this.setHex(s), this.#d(s), this.#u(s);
  }
  #r(e) {
    this.#e.hsl = e;
  }
  #i(e) {
    this.#e.hsla = e;
  }
  #s(e) {
    this.#e.rgb = e, this.#y(rgba);
  }
  #l(e) {
    this.#e.rgba = e, this.#y(e);
  }
  #o(e) {
    let { r: i, g: s, b: n, a: r } = this.#m(e);
    return i.length == 1 && (i = "0" + i), s.length == 1 && (s = "0" + s), n.length == 1 && (n = "0" + n), r.length == 1 && (r = "0" + r), this.value.r = i, this.value.g = s, this.value.b = n, this.value.a = r, this.setHex([i, s, n, r]), this;
  }
  #c(e) {
    let { r: i, g: s, b: n, a: r } = this.#m(e);
    i = parseInt(i, 16) / 255, s = parseInt(s, 16) / 255, n = parseInt(n, 16) / 255, r = parseInt(r, 16) / 255;
    const a = Math.max(i, s, n), l = a - Math.min(i, s, n), h = l ? a === i ? (s - n) / l : a === s ? 2 + (n - i) / l : 4 + (i - s) / l : 0;
    let m = [
      (60 * h < 0 ? 60 * h + 360 : 60 * h).toString(),
      (100 * (l ? a <= 0.5 ? l / (2 * a - l) : l / (2 - (2 * a - l)) : 0)).toString(),
      (100 * (2 * a - l) / 2).toString(),
      r.toString()
    ];
    return this.setHSLA(m), this;
  }
  #a(e, i, s) {
    i /= 100, s /= 100;
    const n = (l) => (l + e / 30) % 12, r = i * Math.min(s, 1 - s), a = (l) => s - r * Math.max(-1, Math.min(n(l) - 3, Math.min(9 - n(l), 1)));
    return [255 * a(0), 255 * a(8), 255 * a(4)];
  }
  #h(e, i, s) {
    s /= 100;
    const n = i * Math.min(s, 1 - s) / 100, r = (a) => {
      const l = (a + e / 30) % 12, h = s - n * Math.max(Math.min(l - 3, 9 - l, 1), -1);
      return Math.round(255 * h).toString(16).padStart(2, "0");
    };
    return `#${r(0)}${r(8)}${r(4)}`;
  }
  #d(e) {
    E(e) && (e = /([a-f\d]{2})/ig.exec(e));
    var i = [
      parseInt(e[0], 16),
      parseInt(e[1], 16),
      parseInt(e[2], 16),
      parseInt(e[3], 16) / 255
    ];
    this.setRGBA(i);
  }
  #u(e) {
    E(e) && (e = /([a-f\d]{2})/ig.exec(e));
    let i = parseInt(e[0], 16), s = parseInt(e[1], 16), n = parseInt(e[2], 16), r = parseInt(e[3], 16);
    i /= 255, s /= 255, n /= 255, r /= 255, this.setHSLA([i, s, n, r]);
  }
  #m(e) {
    let i, s, n, r, a = this.#e;
    if (a.r && a.g && a.b && a.a)
      return { r: i, g: s, b: n, a: r } = { ...a };
    if (E(e)) {
      let l = e.indexOf(",") > -1 ? "," : " ";
      e = e.substr(4).split(")")[0].split(l);
    }
    if (M(e)) {
      if (e.length < 3 || e.length > 4)
        return !1;
      i = e[0], s = e[1], n = e[2], r = E(e[3]) ? e[3] : "";
    } else if (b(e))
      i = e.r, s = e.g, n = e.b, r = "a" in e ? e.a : "";
    else
      return !1;
    return { r: i, g: s, b: n, a: r };
  }
  #y(e) {
    let i, s, n = 0, r = [], a = [], l = e.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    l.shift();
    for (let h of l)
      s = h.indexOf("%") > -1, i = parseFloat(h), n < 3 && s ? i = Math.round(255 * i / 100) : n == 3 && (!s && i >= 0 && i <= 1 ? i = Math.round(255 * i) : s && i >= 0 && i <= 100 ? i = Math.round(255 * i / 100) : i = ""), r[n] = (i | 256).toString(16).slice(1), a[n++] = i;
    this.setHex(r), this.setRGBA(a), this.#u(this.#e.hex);
  }
}
class $s {
  static #e;
  #t;
  #n;
  #r;
  #i;
  #s = { w: 0, h: 0 };
  #l = { w: 0, h: 0, x: 0, y: 0 };
  #o = { x: !1, y: !0 };
  #c;
  #a = { x: 0, drag: !1 };
  #h;
  #d;
  constructor(e) {
    this.#t = $s.#e++, this.#n = e.core, this.#r = R.isElement(e.elContainer) ? e.elContainer : !1, this.#i = R.isElement(e.elHandle) ? e.elHandle : !1, this.#d = _(e.callback) ? e.callback : !1, R.isElement(this.#r) && R.isElement(this.#i) && (this.mount(), this.eventsListen());
  }
  set cursor(e) {
    this.#i.style.cursor = e;
  }
  get cursor() {
    return this.#i.style.cursor;
  }
  eventsListen() {
    this.#h = new Le(this.#i, { disableContextMenu: !1 }), this.#h.on("mouseenter", ke(this.onMouseEnter, 1, this, !0)), this.#h.on("mouseout", ke(this.onMouseOut, 1, this, !0)), this.#h.on("drag", $a(this.onHandleDrag, 100, this)), this.#h.on("enddrag", this.onHandleDragDone.bind(this)), this.#h.on("mousedown", ke(this.onMouseDown, 100, this, !0)), this.#h.on("mouseup", this.onMouseUp.bind(this));
  }
  on(e, i, s) {
    this.#n.on(e, i, s);
  }
  off(e, i) {
    this.#n.off(e, i);
  }
  emit(e, i) {
    this.#n.emit(e, i);
  }
  onMouseEnter() {
    const e = getComputedStyle(this.#i).backgroundColor;
    e && (this.colour = new $r(e), this.#i.style.backgroundColor = this.colour.hex);
  }
  onMouseOut() {
    this.#i.style.backgroundColor = this.colour.hexa;
  }
  onMouseDown() {
  }
  onMouseUp(e) {
    this.onHandleDragDone(e);
  }
  onHandleDrag(e) {
    this.#a.drag || (this.#a.drag = !0, this.#a.x = e.position.x), this.handlePos(e);
  }
  onHandleDragDone(e) {
    this.handlePos(e), this.#a.drag = !1;
  }
  mount() {
    this.#s.w = this.#r.getBoundingClientRect().width, this.#s.h = this.#r.getBoundingClientRect().height, this.#r.style.overflow = "hidden", this.#l.w = this.#i.getBoundingClientRect().width, this.#l.h = this.#i.getBoundingClientRect().height, this.#i.style.marginRight = 0, this.#i.style.position = "absolute";
  }
  handlePos(e) {
    let i = this.#n.range, s = parseInt(this.#i.style.marginLeft), n = this.#r.getBoundingClientRect().width, r = this.#i.getBoundingClientRect().width, a = n - r, l = e.position.x - this.#a.x, h = U(s + l, 0, a), m = (i.dataLength + i.limitFuture + i.limitPast) / n, g = Math.floor(h * m);
    this.setHandleDims(h, r), this.#n.jumpToIndex(g);
  }
  setHandleDims(e, i) {
    let s = this.#r.getBoundingClientRect().width;
    i = i || this.#i.getBoundingClientRect().width, e = e / s * 100, this.#i.style.marginLeft = `${e}%`, i = i / s * 100, this.#i.style.width = `${i}%`;
  }
}
const Ur = ["source-over", "source-atop", "source-in", "source-out", "destination-over", "destination-atop", "destination-in", "destination-out", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
let Br = class {
  #e = 0;
  constructor(e = {}) {
    this.container = e.container, this.layers = [], this.id = q.idCnt++, this.scene = new q.Scene(), this.setSize(e.width || 0, e.height || 0);
  }
  generateKey() {
    return this.#e++;
  }
  setSize(e, i) {
    return this.width = e, this.height = i, this.scene.setSize(e, i), this.layers.forEach(function(s) {
      s.setSize(e, i);
    }), this;
  }
  addLayer(e) {
    return this.layers.push(e), e.setSize(e.width || this.width, e.height || this.height), e.viewport = this, this;
  }
  getIntersection(e, i) {
    for (var s = this.layers, n = s.length - 1, r, a; n >= 0; ) {
      if (r = s[n], a = r.hit.getIntersection(e, i), a >= 0)
        return a;
      n--;
    }
    return -1;
  }
  get index() {
    let e = q.viewports, i, s = 0;
    for (i of e) {
      if (this.id === i.id)
        return s;
      s++;
    }
    return null;
  }
  destroy() {
    for (let e of this.layers)
      e.remove();
  }
  render(e = !1) {
    let { scene: i, layers: s } = this, n;
    i.clear();
    for (n of s)
      e && n.layers.length > 0 && n.render(e), Ur.includes(n?.composition) && (i.context.globalCompositeOperation = n.composition), n.visible && n.width > 0 && n.height > 0 && i.context.drawImage(
        n.scene.canvas,
        n.x,
        n.y,
        n.width,
        n.height
      );
  }
};
class Kh extends Br {
  constructor(e = {}) {
    super(e);
    const i = this.scene.canvas, s = e.container;
    s?.hasCanvasSlot && (i.slot = "viewportCanvas"), s.innerHTML = "", s.appendChild(i), q.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", q.viewports.splice(this.index, 1);
  }
}
class jh {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  visible = !0;
  composition = null;
  constructor(e = {}) {
    this.id = q.idCnt++, this.hit = new q.Hit({
      layer: this,
      contextType: e.contextType
    }), this.scene = new q.Scene({
      layer: this,
      contextType: e.contextType
    }), e.x && e.y && this.setPosition(e.x, e.y), e.width && e.height && this.setSize(e.width, e.height), e.composition && this.setComposition(e.composition);
  }
  get index() {
    let e = this.viewport.layers, i = 0, s;
    for (s of e) {
      if (this.id === s.id)
        return i;
      i++;
    }
    return null;
  }
  setPosition(e, i) {
    return this.x = e, this.y = i, this;
  }
  setSize(e, i) {
    return this.width = e, this.height = i, this.scene.setSize(e, i), this.hit.setSize(e, i), this;
  }
  setComposition(e) {
    if (Ur.includes(e))
      return this.composition = e, this;
  }
  move(e) {
    let { index: i, viewport: s } = this, n = s.layers, r;
    switch (typeof e == "number" && (r = U(Math.floor(e), (n.length - 1) * -1, n.length - 1), e = "order"), e) {
      case "up":
        i < n.length - 1 && (n[i] = n[i + 1], n[i + 1] = this);
        break;
      case "down":
        i > 0 && (n[i] = n[i - 1], n[i - 1] = this);
        break;
      case "top":
        n.splice(i, 1), n.push(this);
        break;
      case "bottom":
        n.splice(i, 1), n.unshift(this);
        break;
      case "order":
        Oa(n, this.index, r);
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
class Zh {
  width = 0;
  height = 0;
  constructor(e) {
    e || (e = {}), this.id = q.idCnt++, this.layer = e.layer, this.contextType = e.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "scene-canvas", this.canvas.style.display = "block", this.context = this.canvas.getContext(this.contextType), e.width && e.height && this.setSize(e.width, e.height);
  }
  setSize(e, i) {
    return zr(e, i, this);
  }
  clear() {
    return Vr(this);
  }
  toImage(e = "image/png", i, s) {
    let n = this, r = new Image(), a = this.canvas.toDataURL(e, i);
    r.onload = function() {
      r.width = n.width, r.height = n.height, s(r);
    }, r.src = a;
  }
  export(e, i, s = "image/png", n) {
    typeof i != "function" && (i = this.blobCallback.bind({ cfg: e })), this.canvas.toBlob(i, s, n);
  }
  exportHit(e, i, s = "image/png", n) {
    typeof i != "function" && (i = this.blobCallback.bind({ cfg: e })), this.layer.hit.canvas.toBlob(i, s, n);
  }
  blobCallback(e) {
    let i = document.createElement("a"), s = URL.createObjectURL(e), n = this.cfg.fileName || "canvas.png";
    i.setAttribute("href", s), i.setAttribute("target", "_blank"), i.setAttribute("download", n), document.createEvent ? Object.assign(document.createElement("a"), {
      href: s,
      target: "_blank",
      download: n
    }).click() : i.click && i.click();
  }
}
class Jh {
  width = 0;
  height = 0;
  constructor(e) {
    e || (e = {}), this.layer = e.layer, this.contextType = e.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "hit-canvas", this.canvas.style.display = "none", this.canvas.style.position = "relative", this.context = this.canvas.getContext(this.contextType, {
      preserveDrawingBuffer: !0,
      antialias: !1
    }), e.width && e.height && this.setSize(e.width, e.height);
  }
  setSize(e, i) {
    return zr(e, i, this);
  }
  clear() {
    return Vr(this);
  }
  getIntersection(e, i) {
    let s = this.context, n;
    if (e = Math.round(e - this.layer.x), i = Math.round(i - this.layer.y), e < 0 || i < 0 || e > this.width || i > this.height)
      return -1;
    if (this.contextType === "2d") {
      if (n = s.getImageData(e, i, 1, 1).data, n[3] < 255)
        return -1;
    } else if (n = new Uint8Array(4), s.readPixels(
      e * q.pixelRatio,
      (this.height - i - 1) * q.pixelRatio,
      1,
      1,
      s.RGBA,
      s.UNSIGNED_BYTE,
      n
    ), n[0] === 255 && n[1] === 255 && n[2] === 255)
      return -1;
    return this.rgbToInt(n);
  }
  getIndexValue(e) {
    let i = this.intToRGB(e);
    return "rgb(" + i[0] + ", " + i[1] + ", " + i[2] + ")";
  }
  rgbToInt(e) {
    let i = e[0], s = e[1], n = e[2];
    return (i << 16) + (s << 8) + n;
  }
  intToRGB(e) {
    let i = (e & 16711680) >> 16, s = (e & 65280) >> 8, n = e & 255;
    return [i, s, n];
  }
}
function Vr(o) {
  let e = o.context;
  return o.contextType === "2d" ? e.clearRect(
    0,
    0,
    o.width * q.pixelRatio,
    o.height * q.pixelRatio
  ) : e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), o;
}
function zr(o, e, i) {
  return i.width = o, i.height = e, i.canvas.width = o * q.pixelRatio, i.canvas.style.width = `${o}px`, i.canvas.height = e * q.pixelRatio, i.canvas.style.height = `${e}px`, i.contextType === "2d" && q.pixelRatio !== 1 && i.context.scale(q.pixelRatio, q.pixelRatio), i;
}
const q = {
  idCnt: 0,
  viewports: [],
  pixelRatio: window && window.devicePixelRatio || 1,
  Node: Br,
  Viewport: Kh,
  Layer: jh,
  Scene: Zh,
  Hit: Jh
}, Ft = q;
class Qh {
  #e;
  #t;
  #n;
  #r;
  #i;
  constructor(e, i = []) {
    this.#n = e, this.#e = e.core, this.#r = new be([...i]);
    for (const [s, n] of this.#r)
      this.addOverlay(s, n);
  }
  log(e) {
    this.#e.log(e);
  }
  info(e) {
    this.#e.info(e);
  }
  warn(e) {
    this.#e.warn(e);
  }
  error(e) {
    this.#e.error(e);
  }
  get core() {
    return this.#e;
  }
  get parent() {
    return this.#n;
  }
  get layerConfig() {
    return this.#n.layerConfig().layerConfig;
  }
  get list() {
    return this.#r;
  }
  get scale() {
    return this.#n.parent.scale;
  }
  get time() {
    return this.#n.parent.time;
  }
  start() {
    this.eventsListen();
  }
  destroy() {
    if (this.#r.size != 0)
      for (let e of this.#r.keys())
        this.removeOverlay(e);
  }
  eventsListen() {
  }
  on(e, i, s) {
    this.#e.on(e, i, s);
  }
  off(e, i) {
    this.#e.off(e, i);
  }
  emit(e, i) {
    this.#e.emit(e, i);
  }
  get(e) {
    return this.#r.get(e);
  }
  addOverlays(e) {
    let i = [], s, n;
    for (let r of e)
      n = this.addOverlay(r[0], r[1]), s = n.instance?.id || r[0], i.push([s, n]);
    return i;
  }
  addOverlay(e, i) {
    try {
      const s = new Ft.Layer(this.layerConfig);
      return this.parent.viewport.addLayer(s), i.layer = s, i.instance = new i.class(
        s,
        this.#n.TimeLine,
        this.#n.Scale,
        this.#e.theme,
        this,
        i.params
      ), E(i.instance?.id) || (i.instance.id = e), this.#r.set(i.instance.id, i), i;
    } catch (s) {
      return console.error(`Error: Cannot instantiate ${e} overlay / indicator`), console.error(s), !1;
    }
  }
  removeOverlay(e) {
    if (this.#r.has(e)) {
      const i = this.#r.get(e);
      i.instance?.isIndicator || i.instance.destroy(), i.layer.remove(), this.#r.delete(e);
    }
  }
}
class bi extends Hr {
  #e;
  #t;
  #n;
  #r = Ke[0];
  #i = "automatic";
  #s = {
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
  #l = 1.04;
  #o = vn;
  #c = Ya;
  #a = 3;
  #h;
  #d;
  #u;
  constructor(e, i, s = Ke[0], n) {
    super(e), this.#n = i, this.#t = e, this.#e = e.parent, this.yAxisType = s, n = n || this.core.range, this.setRange(n);
  }
  get chart() {
    return this.#n;
  }
  get range() {
    return this.#u;
  }
  get height() {
    return this.chart.height;
  }
  get rangeH() {
    return this.#u.diff * this.yAxisPadding;
  }
  get yAxisRatio() {
    return this.getYAxisRatio();
  }
  get yAxisPrecision() {
    return this.yAxisCalcPrecision;
  }
  set yAxisPadding(e) {
    this.#l = e;
  }
  get yAxisPadding() {
    return this.#l;
  }
  set yAxisType(e) {
    this.#r = Ke.includes(e) ? e : Ke[0];
  }
  get yAxisType() {
    return this.#r;
  }
  set yAxisStep(e) {
    this.#o = T(e) ? e : vn;
  }
  get yAxisStep() {
    return this.#o;
  }
  set yAxisTicks(e) {
    this.#a = T(e) ? e : 0;
  }
  get yAxisTicks() {
    return this.#a;
  }
  get yAxisGrads() {
    return this.#h;
  }
  get yAxisDigits() {
    return this.parent.digitCnt;
  }
  get step() {
    return this.#d;
  }
  set mode(e) {
    this.setMode(e);
  }
  get mode() {
    return this.#i;
  }
  set offset(e) {
    this.setOffset(e);
  }
  get offset() {
    return this.#u.offset;
  }
  set zoom(e) {
    this.setZoom(e);
  }
  get zoom() {
    return this.#u.zoom;
  }
  getYAxisRatio() {
    return this.height / this.#u.diff;
  }
  yAxisRangeBounds() {
  }
  yAxisLog() {
  }
  yAxisCntDigits(e) {
    return this.countDigits(e);
  }
  yAxisCalcPrecision() {
    let e = this.numDigits(this.#u.max);
    return this.yDigits - e;
  }
  yAxisCursor() {
  }
  yPos(e) {
    switch (this.yAxisType) {
      case "percent":
        return we(this.p100toPixel(e));
      case "log":
        return we(this.$2Pixel(Aa(e)));
      default:
        return we(this.$2Pixel(e));
    }
  }
  yPos2Price(e) {
    return this.pixel2$(e);
  }
  $2Pixel(e) {
    const i = e - this.#u.min;
    return this.height - i * this.yAxisRatio;
  }
  lastYData2Pixel(e) {
    let i = e - this.core.stream.lastPriceMin;
    return this.height - i * this.yAxisRatio;
  }
  pixel2$(e) {
    let i = (this.height - e) / this.height, s = this.#u.diff * i;
    return this.#u.min + s;
  }
  p100toPixel(e) {
    let i = this.#u.max, s = this.height / (i - this.#u.min);
    return Math.floor(i - this.#u.max), (e - i) * -1 * s;
  }
  yAxisTransform() {
  }
  setMode(e) {
    if (!["automatic", "manual"].includes(e))
      return !1;
    const i = this.#s;
    return this.mode == "automatic" && e == "manual" ? (i.manual.zoom = 0, i.manual.max = this.#u.valueMax, i.manual.min = this.#u.valueMin, this.#i = e, this.core.emit("yaxis_setmode", { mode: e, axis: this })) : this.mode == "manual" && e == "automatic" && (i.manual.zoom = 0, this.#i = e, this.core.emit("yaxis_setmode", { mode: e, axis: this })), !0;
  }
  setOffset(e) {
    if (!T(e) || e == 0 || this.#i !== "manual")
      return !1;
    const i = this.#s;
    let s = this.pixel2$(e * -1), n = this.pixel2$(this.height - e), r = s - n;
    i.manual.min = n, i.manual.max = s, i.manual.mid = r / 2, i.manual.diff = r, i.manual.zoom = 0;
  }
  setZoom(e) {
    if (!T(e) || this.#i !== "manual")
      return !1;
    const i = this.#s;
    let s = i.manual.min, n = i.manual.max;
    const r = n - s, a = r * 0.01, l = e * a;
    s -= l, n += l, !(n < s || s <= 1 / 0 * -1 || n >= 1 / 0) && (i.manual.max = n, i.manual.min = s, i.manual.mid = r / 2, i.manual.diff = r, i.manual.zoom = l, this.calcGradations());
  }
  setRange(e) {
    this.#s.automatic.range = e, this.#u = new Proxy(e, {
      get: (i, s) => {
        const n = this.#i, r = this.#s;
        switch (s) {
          case "max":
            return r[n][s];
          case "min":
            return r[n][s];
          case "mid":
            return r[n][s];
          case "diff":
            return r[n][s];
          case "zoom":
            return r[n][s];
          case "offset":
            return r[n][s];
          default:
            return i[s];
        }
      }
    });
  }
  calcGradations() {
    let e, i, s;
    switch (this.yAxisType) {
      case "percent":
        e = this.#u.max > -10 ? this.#u.max : 110, i = this.#u.min > -10 ? this.#u.min : -10, s = this.#u.offset, this.#h = this.gradations(e + s, i + s);
        break;
      default:
        e = this.#u.max > 0 ? this.#u.max : 1, i = this.#u.min > 0 ? this.#u.min : 0, s = this.#u.offset, this.#h = this.gradations(e + s, i + s);
        break;
    }
    return this.#h;
  }
  gradations(e, i, s = !0) {
    let n, r, a;
    const l = [];
    r = e - i, r = this.rangeH > 0 ? this.rangeH : 1, a = r / (this.height / (this.core.theme.yAxis.fontSize * 1.75));
    let h = Math.pow(10, Math.ceil(Math.log10(a)));
    a < 0.25 * h ? h = 0.25 * h : a < 0.5 * h && (h = 0.5 * h);
    var m = Math.ceil(i / h) * h, g = Math.floor(e / h) * h;
    let v = this.height, S = (g - m) / h;
    this.height / S;
    let A = this.countDigits(h), L;
    this.#d = A;
    for (var k = m; k <= g; k += h)
      n = this.countDigits(k), L = this.limitPrecision(n, A), v = this.yPos(L), l.push([L, v, n]);
    return l;
  }
  niceValue(e, i = this.#d) {
    let s = i.integers, n = i.decimals, r = e.value;
    if (e.integers > 1)
      if (s - 2 > 0) {
        let a = La(10, s - 2);
        return Math.floor(r / a) * a;
      } else
        return n == 0 ? Math.floor(r) : gn(r, n);
    else
      return n == 0 ? 0 : gn(r, n);
  }
  limitPrecision(e) {
    let { sign: i, integers: s, decimals: n, value: r } = e, a = this.yAxisDigits - 1, l = `${r}`, h = "", m = 0, g = 0;
    return i = i ? 0 : 1, i > 0 && (h += "-", m++), s == 0 ? (h += "0", m++) : (h += l.slice(m, s), m += s), m + 1 < a && n > 0 && (h += `${l.slice(m)}`, g = a - (m + 1), g = n < g ? n : g, h = Number.parseFloat(h).toFixed(g)), h;
  }
}
function Us(o, e) {
  return Math.round(o.measureText(e).width);
}
function xt(o = xe.fontSize, e = xe.fontWeight, i = xe.fontFamily) {
  return `${e} ${o}px ${i}`;
}
function Hi(o, e, i) {
  o.font = xt(i?.fontSize, i?.fontWeight, i?.fontFamily);
  const s = Us(o, e), n = i?.paddingLeft || 0, r = i?.paddingRight || 0, a = i?.borderWidth || 0;
  return n + r + s + a * 2;
}
function $i(o) {
  const e = o?.paddingTop || 0, i = o?.paddingBottom || 0, s = o?.borderWidth || 0, n = o?.fontSize || 0;
  return e + i + n + s * 2;
}
function Wr(o, e, i, s) {
  o.fillStyle = s?.colour, o.font = xt(s?.fontSize, s?.fontWeight, s?.fontFamily), o.textAlign = s?.textAlign || "start", o.textBaseline = s?.textBaseLine || "alphabetic", o.direction = s?.direction || "inherit", o.lineWidth = s?.width, o.strokeStyle = s?.border, s?.stroke ? o.strokeText(s?.text, e, i, s?.max) : o.fillText(s?.text, e, i, s?.max);
}
function vt(o, e, i, s, n) {
  o.save(), o.font = xt(n?.fontSize, n?.fontWeight, n?.fontFamily), o.textBaseline = "top", o.fillStyle = n?.bakCol || xe.bakCol;
  let r = n?.width || Hi(o, e, n), a = n?.height || $i(n);
  o.fillRect(i, s, r, a), o.fillStyle = n?.txtCol || xe.txtCol, i = i + n?.paddingLeft, s = s + n?.paddingTop, o.fillText(`${e}`, i, s), o.restore();
}
function Fr(o, e, i, s, n, r) {
  o.lineWidth = r?.width || xe.borderWidth, o.strokeStyle = r?.border || xe.stroke, o.beginPath(), o.rect(e, i, s, n), o.stroke();
}
function Bs(o, e, i, s, n, r) {
  o.fillStyle = r?.fill || xe.fill, o.fillRect(e, i, s, n);
}
function ec(o, e, i, s, n, r) {
  E(r.fill) && Bs(o, e, i, s, n, r), T(r.width) && r.width > 0 && Fr(o, e, i, s, n, r);
}
function Gr(o, e, i, s, n, r, a) {
  o.lineWidth = a?.width || xe.borderWidth, o.strokeStyle = a?.border || xe.stroke, qr(o, e, i, s, n, r), o.stroke();
}
function Yr(o, e, i, s, n, r, a) {
  o.fillStyle = a?.fill || xe.fill, qr(o, e, i, s, n, r), o.fill();
}
function qr(o, e, i, s, n, r) {
  o.beginPath(), o.moveTo(e + r, i), o.arcTo(e + s, i, e + s, i + n, r), o.arcTo(e + s, i + n, e, i + n, r), o.arcTo(e, i + n, e, i, r), o.arcTo(e, i, e + s, i, r), o.closePath();
}
function tc(o, e, i, s, n, r, a) {
  E(a.fill) && Yr(o, e, i, s, n, r, a?.fill), T(a.width) && a.width > 0 && Gr(o, e, i, s, n, r, a?.border, a?.width);
}
function Xr(o, e, i, s, n, r, a) {
  if (!(n < 3)) {
    var l = Math.PI * 2 / n;
    o.beginPath(), o.translate(e, i), o.rotate(r * Math.PI / 180), o.moveTo(s, 0);
    for (var h = 1; h < n; h++)
      o.lineTo(s * Math.cos(l * h), s * Math.sin(l * h));
    o.closePath(), Ct(o, a?.fill, a?.stroke, a?.width);
  }
}
function ic(o, e, i) {
  if (e.length > 0) {
    o.beginPath();
    var s = e[0];
    o.moveTo(s.x, s.y);
    for (var n = 1; n < e.length; ++n)
      s = e[n], o.lineTo(s.x, s.y);
    o.closePath(), Ct(o, i?.fill, i?.stroke, i?.width);
  }
}
function sc(o, e, i, s, n) {
  Xr(o, e, i, s, 3, n?.rotate || 0, n), Ct(o, n?.fill, n?.stroke, n?.width);
}
function nc(o, e, i, s, n, r) {
  o.beginPath(), o.moveTo(e - s / 2, i), o.lineTo(e, i - n / 2), o.lineTo(e + s / 2, i), o.lineTo(e, i + n / 2), o.closePath(), Ct(o, r?.fill, r?.stroke, r?.width);
}
function bt(o, e, i, s = () => {
}) {
  o.save();
  const n = i.width || 1;
  o.lineWidth = n, n % 2 && o.translate(0.5, 0.5), o.strokeStyle = i.stroke, M(i.dash) && o.setLineDash(i.dash), o.beginPath();
  let r = !0;
  e.forEach((a) => {
    a && a.x !== null && (r ? (o.moveTo(a.x, a.y), r = !1) : o.lineTo(a.x, a.y));
  }), _(s) && s(), o.restore();
}
function rc(o, e, i) {
  bt(o, e, i, () => {
    o.stroke();
  });
}
function oc(o, e, i) {
  bt(o, e, i, () => {
    o.closePath();
  }), Ct(o, opts?.fill, opts?.stroke, opts?.size);
}
function ac(o, e, i) {
  o.beginPath(), o.moveTo(e[0].x, e[0].y);
  for (var s = i ?? 1, n = 0; n < e.length - 1; n++) {
    var r = n > 0 ? e[n - 1] : e[0], a = e[n], l = e[n + 1], h = n != e.length - 2 ? e[n + 2] : l, m = a.x + (l.x - r.x) / 6 * s, g = a.y + (l.y - r.y) / 6 * s, v = l.x - (h.x - a.x) / 6 * s, S = l.y - (h.y - a.y) / 6 * s;
    o.bezierCurveTo(m, g, v, S, l.x, l.y);
  }
  o.stroke();
}
function Gt(o, e, i, s, n) {
  bt(o, [{ x: i, y: e }, { x: s, y: e }], n, () => {
    o.stroke(), o.closePath();
  });
}
function lc(o, e, i, s, n) {
  coords = [{ x: e, y: i }, { x: e, y, bottom: s }], bt(o, coords, n, () => {
    o.stroke(), o.closePath();
  });
}
function hc(o, e, i) {
  bt(o, e, i, () => {
    o.stroke(), o.closePath();
  });
}
function cc(o, e, i, s, n) {
  o.beginPath(), o.arc(e, i, s, 0, Math.PI * 2), o.closePath(), fillStroke(o, n?.fill, n?.stroke, n?.width);
}
function uc(o) {
  return o.ownerDocument && o.ownerDocument.defaultView && o.ownerDocument.defaultView.devicePixelRatio || 2;
}
function Ct(o, e, i, s) {
  E(e) && (o.fillStyle = e, o.fill()), T(s) && s > 0 && (o.lineWidth = s, o.strokeStyle = i || xe.stroke, o.stroke());
}
function Kr(o, e, i, s, n, r, a, l, h, m) {
  o.drawImage(e, i, s, n, r, a, l, h, m);
}
function dc(o, e) {
  let i = o.naturalWidth || o.width, s = o.naturalHeight || o.height;
  return e === void 0 && (e = jr(i, s)), e.ctx.drawImage(o, 0, 0), e;
}
const mc = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};
function Rt(o, e) {
  const i = imageToCanvs(e), s = i.ctx;
  return s.fillStyle = mc[o], s.globalCompositeOperation = "multiply", s.fillRect(0, 0, s.canvas.width, s.canvas.height), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), s.globalCompositeOperation = "source-over", i;
}
function pc(o) {
  return {
    red: Rt("red", o),
    green: Rt("green", o),
    blue: Rt("blue", o),
    alpha: Rt("alpha", o)
  };
}
function jr(o, e) {
  const i = document.createElement("canvas");
  return i.ctx = i.getContext("2d", { willReadFrequently: !0 }), i.width = o || i.ctx.canvas.width, i.height = e || i.ctx.canvas.height, i;
}
const z = {
  createCanvas: jr,
  imageToCanvas: dc,
  separateRGB: pc,
  getChannel: Rt,
  getPixelRatio: uc,
  fillStroke: Ct,
  calcTextWidth: Us,
  createFont: xt,
  getTextRectHeight: $i,
  getTextRectWidth: Hi,
  renderImage: Kr,
  renderText: Wr,
  renderTextBG: vt,
  renderPath: bt,
  renderPathStroke: rc,
  renderPathClosed: oc,
  renderSpline: ac,
  renderLine: hc,
  renderLineHorizontal: Gt,
  renderLineVertical: lc,
  renderCircle: cc,
  renderRect: ec,
  renderRectFill: Bs,
  renderRectStroke: Fr,
  renderRectRound: tc,
  renderRectRoundFill: Yr,
  renderRectRoundStroke: Gr,
  renderPolygonRegular: Xr,
  renderPolygonIrregular: ic,
  renderDiamond: nc,
  renderTriangle: sc
};
class G {
  #e;
  #t;
  #n = {};
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h = {
    valueMax: null,
    valueMin: null,
    indexStart: null,
    Length: null,
    rowsW: null,
    rowsH: null,
    refresh: !1,
    resize: !1
  };
  id;
  constructor(e, i = !1, s = !1, n, r, a = {}) {
    this.#t = r.core, this.#e = r, this.#n = r.core.config, this.#l = e, this.#o = e.scene, this.#c = e.hit, this.#r = n, this.#i = i, this.#s = s, this.#a = a, this.on("global_resize", this.onResize, this);
  }
  get core() {
    return this.#t;
  }
  get parent() {
    return this.#e;
  }
  get target() {
    return this.#l;
  }
  get config() {
    return this.#n;
  }
  get params() {
    return this.#a;
  }
  get scene() {
    return this.#o;
  }
  get hit() {
    return this.#c;
  }
  get theme() {
    return this.#r;
  }
  get chart() {
    return this.#e.parent.parent;
  }
  get xAxis() {
    return this.getXAxis();
  }
  get yAxis() {
    return this.getYAxis();
  }
  get overlay() {
    return this.#a.overlay;
  }
  get context() {
    return this.contextIs();
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  destroy() {
    this.off("global_resize", this.onResize, this);
  }
  on(e, i, s) {
    this.#t.on(e, i, s);
  }
  off(e, i) {
    this.#t.off(e, i);
  }
  emit(e, i) {
    this.core.emit(e, i);
  }
  onResize() {
    this.#h.resize = !0;
  }
  setSize(e, i) {
    this.#l.setSize(e, i), this.#h.refresh = !0;
  }
  setRefresh() {
    this.#h.refresh = !0;
  }
  getXAxis() {
    return this.#i instanceof xi ? this.#i : this.core.Chart.time.xAxis instanceof xi ? this.core.Chart.time.xAxis : "time" in this.#e ? this.#e.time.xAxis : !1;
  }
  getYAxis() {
    return this.#s instanceof bi ? this.#s : this.chart.yAxis instanceof bi ? this.chart.yAxis : "scale" in this.#e ? this.#e.scale.yAxis : !1;
  }
  contextIs() {
    return !this.#i && !this.#s ? "chart" : this.#i instanceof xi ? "timeline" : this.#s instanceof bi ? "scale" : !1;
  }
  mustUpdate() {
    const e = this.#t.range, i = this.#h;
    return this.#t.MainPane.elRows, i.valueMax !== e.valueMax || i.valueMin !== e.valueMin || i.indexStart !== e.indexStart || i.Length !== e.Length || i.refresh || i.resize ? this.#h : !1;
  }
  updated() {
    const e = this.#t.range, i = this.#h, s = this.#t.MainPane.elRows;
    i.valueMax = e.valueMax, i.valueMin = e.valueMin, i.indexStart = e.indexStart, i.Length = e.Length, i.rowsW = s.width, i.rowsH = s.height, i.rowsW = s.width, i.rowsH = s.height, i.refresh = !1, i.resize = !1;
  }
  plot(e, i, s) {
    const n = this.scene.context, r = e;
    switch (n.save(), i) {
      case "createCanvas":
        z[i](r[0], r[1]);
        break;
      case "fillStroke":
        z[i](n, r[0], r[1], r[2]);
        break;
      case "renderLine":
        z[i](n, r, s);
        break;
      case "renderLineHorizontal":
        z[i](n, r[0], r[1], r[2], s);
        break;
      case "renderLineVertical":
        z[i](n, r[0], r[1], r[2], s);
        break;
      case "renderPath":
        z[i](n, r, s.style, s);
        break;
      case "renderPathStroke":
        z[i](n, r, s.style, s);
        break;
      case "renderPathClosed":
        z[i](n, r, s);
        break;
      case "renderSpline":
        z[i](n, r, s);
        break;
      case "renderRect":
        z[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderRectFill":
        z[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderRectStroke":
        z[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderRectRound":
        z[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderRectRoundFill":
        z[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderRectRoundStroke":
        z[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderPolygonRegular":
        z[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderPolygonIrregular":
        z[i](n, r, s);
        break;
      case "renderTriangle":
        z[i](n, r[0], r[1], r[2], s);
        break;
      case "renderDiamond":
        z[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderCircle":
        z[i](n, r[0], r[1], r[2], s);
        break;
      case "renderImage":
        z[i](n, s.src, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
      case "renderText":
        z[i](n, r[0], r[1], s);
        break;
      case "renderTextBG":
        z[i](n, r[0], r[1], r[2], s);
        break;
    }
    n.restore();
  }
}
class Oi extends G {
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.params.axes = a?.axes || "both";
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (!super.mustUpdate() || (e = e || this.params.axes, this.scene.clear(), e == "none"))
      return;
    const i = this.scene.context;
    if (i.save(), i.strokeStyle = this.core.theme.chart.GridColour || kr.COLOUR_GRID, e != "y") {
      const n = this.xAxis.xAxisGrads.values;
      for (let r of n) {
        let a = we(r[1]);
        i.beginPath(), i.moveTo(a + 0, 0), i.lineTo(a + 0, this.scene.height), i.stroke();
      }
    }
    if (e != "x") {
      const s = this.yAxis.yAxisGrads;
      for (let n of s) {
        let r = this.yAxis.$2Pixel(n[0]);
        i.beginPath(), i.moveTo(0, r), i.lineTo(this.scene.width, r), i.stroke();
      }
    }
    i.restore(), super.updated();
  }
  drawX() {
    this.draw("x");
  }
}
class bs extends G {
  #e = [0, 0];
  #t = !0;
  #n;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.core.on("chart_pan", this.onMouseDragX, this), this.core.on("chart_panDone", this.onMouseDragX, this), this.core.on("main_mousemove", this.onMouseMoveX, this), this.#n = new Le(this.target.viewport.container, { disableContextMenu: !1 }), this.#n.on("pointermove", this.onMouseMove.bind(this)), this.#n.on("pointerenter", this.onMouseMove.bind(this));
  }
  destroy() {
    super.destroy(), this.core.off("chart_pan", this.onMouseDragX, this), this.core.off("chart_panDone", this.onMouseDragX, this), this.core.off("main_mousemove", this.onMouseMoveX, this);
  }
  set position(e) {
  }
  get update() {
    return this.#t;
  }
  get always() {
    return !0;
  }
  onMouseDragX(e) {
    this.#e[0] = e[0], this.#e[1] = e[1], this.draw(!0), this.core.emit("chart_render");
  }
  onMouseMoveX(e) {
    this.#e[0] = e[0], this.draw(), this.core.emit("chart_render");
  }
  onMouseMove(e) {
    const i = b(e) ? e.position.x : e[0], s = b(e) ? e.position.y : e[1];
    this.#e[0] = i, this.#e[1] = s, this.draw(), this.core.emit("chart_render");
  }
  draw(e = !1) {
    const i = this.target.viewport.container.getBoundingClientRect();
    let s = this.core.mousePos.y - i.top, n = this.core.mousePos.x - i.left;
    e || (n = this.xAxis.xPosSnap2CandlePos(n) + this.xAxis.scrollOffsetPx), this.scene.clear();
    const r = this.scene.context;
    r.save(), r.setLineDash([5, 5]);
    const a = this.xAxis.smoothScrollOffset || 0;
    r.strokeStyle = "#666", r.beginPath(), r.moveTo(n + a, 0), r.lineTo(n + a, this.scene.height), r.stroke(), this.chart.cursorActive && (r.beginPath(), r.moveTo(0, s), r.lineTo(this.scene.width, s), r.stroke()), r.restore(), this.chart.scale.overlays.cursor.instance.scaleDraw();
  }
}
class Zr extends G {
  #e = [0, 0];
  constructor(e, i, s, n, r, a) {
    r = s, s = s.yAxis, super(e, i, s, n, r, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
  }
  scaleDraw() {
    if (!this.parent.parent.cursorActive)
      return;
    const e = this.target.viewport.container.getBoundingClientRect();
    let i = this.core.mousePos.y - e.top, s = this.parent.yPos2Price(i), n = this.parent.nicePrice(s), r = {
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
    }, a = r.fontSize + r.paddingTop + r.paddingBottom, l = i - a * 0.5;
    const h = this.scene.context;
    this.scene.clear(), h.save(), h.fillStyle = r.bakCol, h.fillRect(1, l, this.width, a), vt(h, `${n}`, 1, l, r), h.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
const gc = [
  ["grid", { class: Oi, fixed: !0 }],
  ["cursor", { class: bs, fixed: !0 }]
];
class wt {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  constructor(e, i, s, n = !1) {
    this.#r = e, this.#e = e.core, this.#t = this.core.config, this.#n = this.core.theme, this.#l = this.#r.element, this.#c = i, this.createViewport(s, n);
  }
  get parent() {
    return this.#r;
  }
  get core() {
    return this.#e;
  }
  get config() {
    return this.#t;
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#l.getBoundingClientRect().width;
  }
  set height(e) {
    this.setHeight(e);
  }
  get height() {
    return this.#l.getBoundingClientRect().height;
  }
  get dimensions() {
    return R.elementDimPos(this.#l);
  }
  set layerWidth(e) {
    this.#a = e;
  }
  get layerWidth() {
    return this.#a;
  }
  get stateMachine() {
    return this.#r.stateMachine;
  }
  set state(e) {
    this.#e.setState(e);
  }
  get state() {
    return this.#e.getState();
  }
  get data() {
    return this.#e.chartData;
  }
  get range() {
    return this.#e.range;
  }
  get stream() {
    return this.#e.stream;
  }
  get TimeLine() {
    return this.#e.TimeLine;
  }
  get xAxis() {
    return this.#e.TimeLine.xAxis;
  }
  get Scale() {
    return this.#r.Scale;
  }
  get yAxis() {
    return this.#r.Scale.yAxis;
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
  setSize(e, i, s) {
    const n = this.#s.list;
    this.#i.setSize(e, i);
    for (let [r, a] of n)
      a.instance.setSize(s, i);
    this.draw(), this.render();
  }
  createViewport(e = [], i = !1) {
    e = e.length == 0 ? ce(gc) : e;
    const { width: s, height: n } = this.layerConfig();
    let r = i ? Ft.Node : Ft.Viewport;
    this.#i = new r({
      width: s,
      height: n,
      container: this.#c
    }), this.#o = this.#i.scene.canvas, this.#s = new Qh(this, e);
  }
  layerConfig() {
    const e = this.config?.buffer || ki, i = this.#c.getBoundingClientRect().width, s = this.#c.getBoundingClientRect().height;
    this.layerWidth = Math.round(i * ((100 + e) * 0.01));
    const n = {
      width: this.layerWidth,
      height: s
    };
    return { width: i, height: s, layerConfig: n };
  }
  addOverlays(e) {
    return this.#s.addOverlays(e);
  }
  addOverlay(e, i) {
    return this.#s.addOverlay(e, i);
  }
  removeOverlay(e) {
    return this.#s.removeOverlay(e);
  }
  draw(e = this.range, i = !1) {
    const s = (n, r) => {
      !b(r) || !_(r?.instance?.draw) || (i && r.instance.setRefresh(), r.instance.draw(), r.fixed || (r.instance.position = [this.#e.scrollPos, 0]));
    };
    this.executeOverlayList(s);
  }
  drawAll() {
    const e = (i, s) => {
      s.instance.mustUpdate();
    };
    this.executeOverlayList(e);
  }
  executeOverlayList(e) {
    const i = this.#s.list;
    if (!(i instanceof be))
      return !1;
    let s = [];
    for (let [n, r] of i)
      try {
        e(n, r);
      } catch (a) {
        s.push(a);
      }
    return s.length > 0 ? this.#e.error(s) : s = !0, s;
  }
  render() {
    this.#i.render();
  }
  refresh() {
    this.draw(void 0, !0), this.render();
  }
}
class fc extends G {
  #e = [0, 0];
  #t;
  constructor(e, i = !1, s = !1, n, r, a) {
    i = r.time.xAxis, super(e, i, s, n, r);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (!super.mustUpdate())
      return;
    this.scene.clear();
    const i = this.scene.context, s = this.xAxis.xAxisGrads.values, n = 0, r = this.theme.xAxis, a = J(r.tickMarker) ? r.tickMarker : !0;
    i.save(), i.strokeStyle = r.colourTick, i.fillStyle = r.colourTick, i.font = `${r.fontWeight} ${r.fontSize}px ${r.fontFamily}`;
    for (let l of s) {
      let h = we(l[1]), m = Math.floor(i.measureText(`${l[0]}`).width * 0.5);
      i.fillText(l[0], h - m + n, this.xAxis.xAxisTicks + 12), a && (i.beginPath(), i.moveTo(h + n, 0), i.lineTo(h + n, this.xAxis.xAxisTicks), i.stroke());
    }
    i.restore(), super.updated();
  }
}
class yc extends G {
  #e = [0, 0];
  #t;
  constructor(e, i = !1, s = !1, n, r, a) {
    i = r.time.xAxis, super(e, i, s, n, r);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    this.scene.clear();
    const e = this.scene.context;
    this.xAxis.xAxisGrads.values, this.theme.xAxis, e.save(), e.restore();
  }
}
class vc extends G {
  #e = [0, 0];
  constructor(e, i = !1, s = !1, n, r) {
    i = r.time.xAxis, super(e, i, s, n, r), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context, i = this.target.viewport.container.getBoundingClientRect(), s = this.core.mousePos.x - i.left;
    let n = this.xAxis.xPos2Time(s), r = new Date(n), a = r.toUTCString(), l = {
      fontSize: this.theme.xAxis.fontSize * 1.05,
      fontWeight: this.theme.xAxis.fontWeight,
      fontFamily: this.theme.xAxis.fontFamily,
      txtCol: this.theme.xAxis.colourCursor,
      bakCol: this.theme.xAxis.colourCursorBG,
      paddingTop: 5,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4
    }, h = Hi(e, a, l), m = s + this.core.bufferPx;
    m = this.xAxis.xPosSnap2CandlePos(m), m = m - Math.round(h * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), e.save(), vt(e, a, m, 1, l), e.restore();
  }
}
const wc = [
  ["labels", { class: fc, fixed: !1, required: !0 }],
  ["overlay", { class: yc, fixed: !1, required: !0 }],
  ["cursor", { class: vc, fixed: !1, required: !0 }]
];
class xc {
  #e;
  #t = "Timeline";
  #n = "time";
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u = new be();
  #m = [];
  #y;
  #g;
  #b;
  #w;
  #p;
  #S;
  #C;
  #f;
  #T;
  #x;
  #I;
  #M;
  #L;
  #E;
  #A = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #P = { end: !1, start: !1 };
  constructor(e, i) {
    this.#s = e, this.#r = i, this.#i = i.elements.elTime, this.#l = e.Chart, this.#o = new xi(this, this.#l), this.init();
  }
  log(e) {
    this.#s.log(e);
  }
  info(e) {
    this.#s.info(e);
  }
  warn(e) {
    this.#s.warn(e);
  }
  error(e) {
    this.#s.error(e);
  }
  set id(e) {
    this.#e = $e(e);
  }
  get id() {
    return this.#e ? `${this.#e}` : `${this.#s.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#n;
  }
  get options() {
    return this.#r;
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
    return this.#i.height;
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#i.width;
  }
  get xAxis() {
    return this.#o;
  }
  get xAxisWidth() {
    return this.#o.width;
  }
  get xAxisRatio() {
    return this.#o.xAxisRatio;
  }
  get layerCursor() {
    return this.#T;
  }
  get layerLabels() {
    return this.#C;
  }
  get layerOverlays() {
    return this.#f;
  }
  get overlays() {
    return Object.fromEntries([...this.#d.overlays.list]);
  }
  get xAxisGrads() {
    return this.#o.xAxisGrads;
  }
  get candleW() {
    return this.#o.candleW;
  }
  get candlesOnLayer() {
    return this.#o.candlesOnLayer;
  }
  get theme() {
    return this.#s.theme;
  }
  get config() {
    return this.#s.config;
  }
  get graph() {
    return this.#d;
  }
  get navigation() {
    return this.#y;
  }
  get range() {
    return this.#s.range;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#i);
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
  set stateMachine(e) {
    this.#c = new ze(e, this);
  }
  get stateMachine() {
    return this.#c;
  }
  get time() {
    return this;
  }
  init() {
    const e = this.#i;
    this.#a = e.viewport, this.#h = e.overview, this.#g = e.overview.icons, this.#b = e.overview.scrollBar, this.#w = e.overview.handle, this.#p = e.overview.rwdStart, this.#S = e.overview.fwdEnd;
    const i = {
      core: this.#s,
      elContainer: this.#b,
      elHandle: this.#w,
      callback: null
    };
    this.#E = new $s(i), this.#s.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(e) {
    this.#i.style.width = `${e}px`, this.#a.style.width = `${e}px`;
  }
  setDimensions(e) {
    const i = this.config.buffer || ki, s = e.w, n = this.height, r = Math.round(s * ((100 + i) * 0.01));
    this.#d.setSize(s, n, r), this.draw();
  }
  navigationDisplay(e) {
    if (e)
      this.#S.style["margin-top"] = 0, this.#p.style["margin-top"] = 0;
    else {
      const i = this.core.theme.xAxis?.background ? this.core.theme.xAxis.Background : this.core.theme.chart.Background;
      this.#h.style.visibility = "hidden", this.#S.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#p.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#S.style.background = this.core.theme.chart.Background, this.#p.style.background = i;
    }
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#o.initXAxisGrads(), this.draw(), this.eventsListen(), ss.id = this.id, ss.context = this, this.stateMachine = ss, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#x.destroy(), this.#I.destroy(), this.#M.destroy(), this.off("main_mousemove", this.drawCursorTime), this.off("setRange", this.onSetRange), this.#S.removeEventListener("click", ke), this.#p.removeEventListener("click", ke), this.#d.destroy(), this.element.remove();
  }
  eventsListen() {
    this.#x = new Le(this.#a, { disableContextMenu: !1 }), this.#x.on("dblclick", this.onDoubleClick.bind(this)), this.#x.on("pointerover", this.onPointerEnter.bind(this)), this.#x.on("pointerout", this.onPointerLeave.bind(this)), this.#x.on("pointerdrag", this.onPointerDrag.bind(this)), this.#I = new Le(this.#S, { disableContextMenu: !1 }), this.#I.on("pointerover", () => this.showJump(this.#P.end)), this.#I.on("pointerleave", () => this.hideJump(this.#P.end)), this.#M = new Le(this.#p, { disableContextMenu: !1 }), this.#M.on("pointerover", () => this.showJump(this.#P.start)), this.#M.on("pointerleave", () => this.hideJump(this.#P.start)), this.on("main_mousemove", this.#T.draw, this.#T), this.on("setRange", this.onSetRange, this), this.#S.addEventListener("click", ke(this.onMouseClick, 1e3, this, !0)), this.#p.addEventListener("click", ke(this.onMouseClick, 1e3, this, !0));
  }
  on(e, i, s) {
    this.#s.on(e, i, s);
  }
  off(e, i) {
    this.#s.off(e, i);
  }
  emit(e, i) {
    this.#s.emit(e, i);
  }
  onMouseClick(e) {
    switch (e?.currentTarget?.id || e.target.parentElement.id) {
      case "fwdEnd":
        this.onFwdEnd();
        break;
      case "rwdStart":
        this.onRwdStart();
        break;
    }
  }
  onPointerEnter(e) {
    e.domEvent.target.style.cursor = "ew-resize", this.#h.style.visibility = "visible", this.hideCursorTime();
  }
  onPointerLeave(e) {
    this.#s.theme?.time?.navigation === !1 && !(this.#P.end && this.#P.start) && (this.#h.style.visibility = "hidden");
  }
  onPointerDrag(e) {
    let i = this.range, s = i.indexStart - e.movement.x, n = i.indexEnd;
    i.set(s, n);
  }
  onDoubleClick(e) {
    this.core.jumpToEnd(), this.core.MainPane.draw(void 0, !0);
  }
  onFwdEnd() {
    this.core.jumpToEnd(), this.core.MainPane.draw(void 0, !0);
  }
  onRwdStart() {
    this.core.jumpToStart(), this.core.MainPane.draw(void 0, !0);
  }
  onSetRange() {
    let e = this.range, i = e.indexStart;
    e.indexEnd;
    let s = this.#b.getBoundingClientRect().width, n = e.dataLength + e.limitFuture + e.limitPast, r = s / n, a = e.Length * r, l = (i + e.limitPast) * r;
    this.#E.setHandleDims(l, a);
  }
  t2Index(e) {
    return this.#o.t2Index(e);
  }
  xPos(e) {
    return this.#o.xPos(e);
  }
  xPosSnap2CandlePos(e) {
    return this.#o.xPosSnap2CandlePos(e);
  }
  xPos2Time(e) {
    return this.#o.xPos2Time(e);
  }
  xPos2Index(e) {
    return this.#o.xPos2Index(e);
  }
  xPosOHLCV(e) {
    return this.#o.xPosOHLCV(e);
  }
  createGraph() {
    let e = ce(wc);
    this.#d = new wt(this, this.#a, e, !1), this.#T = this.graph.overlays.get("cursor").instance, this.#C = this.graph.overlays.get("labels").instance, this.#f = this.graph.overlays.get("overlay").instance, this.graph.addOverlays(this.#m);
  }
  addOverlays(e) {
    if (!isArray(e))
      return !1;
    this.graph === void 0 ? this.#m.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!isObject(i))
      return !1;
    if (this.graph === void 0)
      this.#m.push([e, i]);
    else
      return this.graph.addOverlay(e, i);
  }
  render() {
    this.#d.render();
  }
  draw(e = this.range, i = !0) {
    this.#d.draw(e, i);
  }
  hideCursorTime() {
    this.#d.overlays.list.get("cursor").layer.visible = !1, this.#s.MainPane.draw();
  }
  showCursorTime() {
    this.#d.overlays.list.get("cursor").layer.visible = !0, this.#s.MainPane.draw();
  }
  hideJump(e) {
    this.#s.theme?.time?.navigation === !1 && (this.#h.style.visibility = "hidden");
  }
  showJump(e) {
    this.#h.style.visibility = "visible", this.hideCursorTime();
  }
}
const bc = {
  renderQ: new be(),
  rendered: [],
  renderLog: !1,
  dropFrames: !0,
  graphs: [],
  range: {},
  init: function(o) {
    b(o) && (this.renderLog = o?.renderLog || !1, this.dropFrames = o?.dropFrames || !0, this.graphs = M(o?.graphs) ? [...o.graphs] : [], this.range = b(o?.range) ? o.range : {});
  },
  queueFrame: function(o = this.range, e = this.graphs, i = !1) {
    this.renderQ.size > 1 && this.dropFrames && (i = this.dropFrame() || i);
    const s = Date.now();
    return o = o.snapshot(), this.renderQ.set(s, { graphs: e, range: o, update: i }), s;
  },
  dropFrame: function(o = -1) {
    let e = !1;
    return o === -1 && (o = this.renderQ.lastKey()), this.renderQ.size > 1 && this.renderQ.has(o) && (e = o.update, this.renderQ.delete(o)), e;
  },
  getFrame: function(o = 0) {
    return this.renderQ.has(o) ? this.renderQ.get(o) : this.renderQ.firstValue();
  },
  frameDone: function() {
    if (this.renderQ.size === 0)
      return;
    const o = this.renderQ.firstKey();
    this.renderLog && this.rendered.push([o, Date.now()]), this.renderQ.delete(o);
  },
  start: function() {
    requestAnimationFrame(this.execute.bind(this));
  },
  execute: function() {
    if (requestAnimationFrame(this.execute.bind(this)), this.renderQ.size === 0)
      return;
    const [o, e] = this.renderQ.firstEntry();
    if (e.range?.snapshot) {
      for (let i of e.graphs)
        _(i.draw) && i.draw(e.range, e.update);
      for (let i of e.graphs)
        _(i.render) && i.render();
      this.frameDone();
    }
  }
}, Cc = bc, rr = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select"
];
class Tc {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o = [];
  #c;
  #a = {};
  #h;
  #d;
  #u = null;
  constructor(e, i) {
    this.#e = e, this.#t = i, this.#n = i.core, this.#r = i.core.theme.legend, this.init(), this.eventsListen();
  }
  get elTarget() {
    return this.#e;
  }
  get list() {
    return this.#a;
  }
  set collapse(e) {
    this.setCollapse(e);
  }
  get collapse() {
    return this.#l;
  }
  destroy() {
    this.#n.off("chart_pan", this.primaryPanePan), this.#n.off("chart_panDone", this.primaryPanePanDone);
    for (let e in this.#a)
      e !== "collapse" && this.remove(e);
    this.#e.remove();
  }
  eventsListen() {
    this.#n.on("chart_pan", this.primaryPanePan, this), this.#n.on("chart_panDone", this.primaryPanePanDone, this);
  }
  init() {
    const e = this.#e.legends;
    this.#s = e.querySelector(".controls"), this.#l = e.querySelectorAll(".control"), this.#h = e.querySelector("#showLegends"), this.#d = e.querySelector("#hideLegends"), this.#s.style.display = "none", this.icons(this.#l, { id: "collapse", parent: this }), this.#e.legends.classList.add("hide"), this.#u = "hide", this.collapse = "show";
  }
  onMouseClick(e) {
    const i = (s) => E(s.dataset.icon) ? { id: s.id, icon: s.dataset.icon, parent: s.parentElement } : s.parentElement.className !== "controls" ? i(s.parentElement) : !1;
    return i(e);
  }
  onMouseOver(e) {
  }
  onLegendAction(e) {
    const i = this.onMouseClick(e.currentTarget);
    this.setCollapse(i.icon);
  }
  setCollapse(e) {
    e === "show" && this.#u !== "show" ? (this.#u = e, this.#h.style.display = "none", this.#d.style.display = "inline-block", this.#e.legends.classList.toggle("hide")) : e === "hide" && this.#u !== "hide" && (this.#u = e, this.#h.style.display = "inline-block", this.#d.style.display = "none", this.#e.legends.classList.toggle("hide"));
  }
  primaryPanePan() {
    for (let e of rr)
      this.#e.style.setProperty(e, "none");
  }
  primaryPanePanDone() {
    for (let e of rr)
      this.#e.style.removeProperty(e);
  }
  add(e) {
    if (!b(e) || !("title" in e))
      return !1;
    const i = () => {
      this.#n.error("ERROR: Legend parent missing!");
    };
    e.id = e?.id || ee("legend"), e.type = e?.type || "overlay", e.parent = e?.parent || i;
    const s = this.elTarget.buildLegend(e, this.#n.theme);
    this.#e.legends.insertAdjacentHTML("beforeend", s);
    const n = this.#e.legends.querySelector(`#legend_${e.id}`);
    return this.#c = n.querySelectorAll(".control"), this.#a[e.id] = {
      el: n,
      type: e.type,
      source: e?.source,
      click: []
    }, this.icons(this.#c, e), e.type == "indicator" && (this.#s.style.display = "block", !e.parent.primaryPane && Object.keys(this.#a).length < 3 && (this.#s.style.display = "none")), e.id;
  }
  remove(e) {
    if (!(e in this.#a) || this.#a[e].type === "chart")
      return !1;
    this.#a[e].el.remove();
    for (let i of this.#a[e].click)
      i.el.removeEventListener("click", i.click);
    return delete this.#a[e], Object.keys(this.#a).length < 2 && (this.#s.style.display = "none"), !0;
  }
  update(e, i) {
    if (!b(i) || !(e in this.#a) || this.#n.range.data.length == 0)
      return !1;
    let s = this.#a[e].source(i.pos);
    const n = this.#e.buildInputs(s);
    this.#e.legends.querySelector(`#legend_${e} dl`).innerHTML = n;
  }
  icons(e, i) {
    let s;
    for (let n of e) {
      let r = n.querySelector("svg");
      r.style.width = `${this.#r.controlsW}px`, r.style.height = `${this.#r.controlsH}px`, r.style.fill = `${this.#r.controlsColour}`, r.onpointerover = (a) => a.currentTarget.style.fill = this.#r.controlsOver, r.onpointerout = (a) => a.currentTarget.style.fill = this.#r.controlsColour, s = i.parent.onLegendAction.bind(i.parent), i.id === "collapse" ? this.#o.push({ el: n, click: s }) : this.#a[i.id].click.push({ el: n, click: s }), n.addEventListener("click", s);
    }
  }
}
const ns = {
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(o) {
        this.context.origin.cursor = "crosshair";
      },
      onExit(o) {
      },
      on: {
        xAxis_scale: {
          target: "xAxis_scale",
          action(o) {
          }
        },
        chart_yAxisRedraw: {
          target: "chart_yAxisRedraw",
          action(o) {
          }
        },
        chart_tool: {
          target: "chart_tool",
          action(o) {
          }
        },
        tool_activated: {
          target: "tool_activated",
          action(o) {
            this.context.origin.cursor = "default";
          }
        }
      }
    },
    xAxis_scale: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        Idle: {
          target: "idle",
          action(o) {
          }
        }
      }
    },
    chart_yAxisRedraw: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        always: {
          target: "idle",
          condition: "yAxisRedraw",
          action(o) {
            this.context.origin.drawGrid();
          }
        }
      }
    },
    tool_activated: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        tool_targetSelected: {
          target: "idle",
          condition: "toolSelectedThis",
          action(o) {
            console.log("tool_targetSelected:", o);
          }
        }
      }
    }
  },
  guards: {
    priceMaxMin() {
      return !0;
    },
    toolSelectedThis(o, e) {
      return this.eventData === this.context;
    },
    yAxisRedraw() {
      return !0;
    },
    zoomDone() {
      return !0;
    }
  }
}, Ec = {
  id: "scale",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(o) {
        this.context.origin.cursor = "ns-resize";
      },
      onExit(o) {
      },
      on: {
        resize: {
          target: "resize",
          action(o) {
          }
        },
        yAxis_scale: {
          target: "scale",
          action(o) {
          }
        },
        yAxis_inc: {
          target: "incremental",
          action(o) {
          }
        },
        yAxis_log: {
          target: "logarithmic",
          action(o) {
          }
        },
        yAxis_100: {
          target: "percentual",
          action(o) {
          }
        },
        setRange: {
          target: "setRange",
          action(o) {
          }
        }
      }
    },
    resize: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        someEvent: {
          target: "",
          action(o) {
          }
        }
      }
    },
    setRange: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        always: {
          target: "idle",
          condition: "zoomDone",
          action(o) {
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
class Sc extends G {
  constructor(e, i, s, n, r, a) {
    r = s, s = s.yAxis, super(e, i, s, n, r, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get always() {
    return !0;
  }
  draw() {
    if (!super.mustUpdate())
      return;
    const e = this.scene.context, i = this.yAxis, s = this.yAxis.calcGradations() || [], n = this.theme.yAxis, r = J(n.tickMarker) ? n.tickMarker : !0;
    let a = [], l;
    switch (n?.location) {
      case "left":
        a = [this.width, this.width - i.yAxisTicks];
        break;
      case "right":
      default:
        a = [1, i.yAxisTicks];
        break;
    }
    this.scene.clear(), e.save(), e.strokeStyle = n.colourTick, e.fillStyle = n.colourTick, e.font = `${n.fontWeight} ${n.fontSize}px ${n.fontFamily}`;
    for (let h of s)
      l = i.$2Pixel(h[0]), e.fillText(h[0], i.yAxisTicks + 5, l + n.fontSize * 0.3), r && (e.beginPath(), e.moveTo(a[0], l), e.lineTo(a[1], l), e.stroke());
    e.restore(), super.updated();
  }
}
class Pc extends G {
  constructor(e, i, s, n, r, a) {
    r = s, s = s.yAxis, super(e, i, s, n, r, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context;
    this.yAxis.yAxis, this.scene.clear(), e.save(), e.restore();
  }
}
class Mc extends G {
  constructor(e, i, s, n, r, a) {
    r = s, s = s.yAxis, super(e, i, s, n, r, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (e === void 0)
      return;
    const i = this.scene.context, s = this.core.stream instanceof mt && this.config.stream.tfCountDown;
    let n = e[4], r = this.parent.nicePrice(n), a = {
      fontSize: Pe.FONTSIZE * 1.05,
      fontWeight: Pe.FONTWEIGHT,
      fontFamily: Pe.FONTFAMILY,
      txtCol: "#FFFFFF",
      bakCol: Pe.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }, l = 0, h = $i(a), m = this.parent.yPos(n) - h * 0.5;
    this.scene.clear(), i.save(), e[4] >= e[1] ? a.bakCol = this.theme.candle.UpBodyColour : a.bakCol = this.theme.candle.DnBodyColour, vt(i, r, l, m, a), s && (r = this.core.stream.countDownUpdate(), a.fontSize = a?.fontSize / 1.1, vt(i, r, l, m + h, a)), i.restore(), this.viewport.render();
  }
}
const Ac = [
  ["labels", { class: Sc, fixed: !0, required: !0 }],
  ["overlay", { class: Pc, fixed: !0, required: !0 }],
  ["price", { class: Mc, fixed: !0, required: !0 }],
  ["cursor", { class: Zr, fixed: !0, required: !0 }]
];
class Lc {
  #e;
  #t = "Y Scale Axis";
  #n = "scale";
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u;
  #m;
  #y;
  #g;
  #b = new be();
  #w = [];
  #p;
  #S;
  #C;
  #f;
  #T;
  #x = {};
  constructor(e, i) {
    this.#r = e, this.#i = { ...i }, this.#h = this.#i.elScale, this.#o = this.#i.chart, this.#s = this.#i.parent, this.id = `${this.#s.id}_scale`, this.init();
  }
  log(e) {
    this.#r.log(e);
  }
  info(e) {
    this.#r.info(e);
  }
  warn(e) {
    this.#r.warn(e);
  }
  error(e) {
    this.#r.error(e);
  }
  set id(e) {
    this.#e = $e(e);
  }
  get id() {
    return this.#e ? `${this.#e}` : `${this.#r.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#n;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#i;
  }
  get parent() {
    return this.#s;
  }
  set height(e) {
    this.setHeight(e);
  }
  get height() {
    return this.#h.getBoundingClientRect().height;
  }
  get width() {
    return this.#h.getBoundingClientRect().width;
  }
  get element() {
    return this.#h;
  }
  set cursor(e) {
    this.#h.style.cursor = e;
  }
  get cursor() {
    return this.#h.style.cursor;
  }
  get layerCursor() {
    return this.#g;
  }
  get layerLabels() {
    return this.#u;
  }
  get layerOverlays() {
    return this.#m;
  }
  get layerPriceLine() {
    return this.#y;
  }
  get overlays() {
    return Object.fromEntries([...this.#p.overlays.list]);
  }
  get yAxis() {
    return this.#a;
  }
  set yAxisType(e) {
    this.#a.yAxisType = YAXIS_TYPES.includes(e) ? e : YAXIS_TYPES[0];
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
  set graph(e) {
    this.#p = e;
  }
  get graph() {
    return this.#p;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#h);
  }
  get theme() {
    return this.#r.theme;
  }
  get config() {
    return this.#r.config;
  }
  get digitCnt() {
    return this.#S;
  }
  set scaleRange(e) {
    this.setScaleRange(e);
  }
  set rangeMode(e) {
    this.#a.mode = e;
  }
  get rangeMode() {
    return this.#a.mode;
  }
  set rangeYFactor(e) {
    this.core.range.yFactor(e);
  }
  set yOffset(e) {
    this.#a.offset = e;
  }
  get yOffset() {
    return this.#a.offset;
  }
  set stateMachine(e) {
    this.#l = new ze(e, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get Scale() {
    return this;
  }
  init() {
    this.#d = this.#h.viewport || this.#h;
  }
  start() {
    const e = this.#s.name == "Chart" ? void 0 : this.#s.localRange;
    this.#a = new bi(this, this, this.options.yAxisType, e), this.createGraph(), this.#a.calcGradations(), this.draw(), this.eventsListen();
    const i = ce(Ec);
    i.id = this.id, i.context = this, this.stateMachine = i, this.stateMachine.start();
  }
  restart() {
    this.#a.setRange(this.#r.range), this.draw();
  }
  destroy() {
    this.stateMachine.destroy(), this.#p.destroy(), this.#C.destroy(), this.off(`${this.#s.id}_mousemove`, this.onMouseMove, this), this.off(`${this.#s.id}_mouseout`, this.#g.erase, this.#g), this.off(_e, this.onStreamUpdate, this.#y), this.element.remove();
  }
  eventsListen() {
    let e = this.#p.viewport.scene.canvas;
    this.#C = new Le(e, { disableContextMenu: !1 }), this.#C.setCursor("ns-resize"), this.#C.on("pointerdrag", this.onDrag.bind(this)), this.#C.on("pointerdragend", this.onDragDone.bind(this)), this.#C.on("wheel", this.onMouseWheel.bind(this)), this.#C.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.#s.id}_mousemove`, this.onMouseMove, this), this.on(`${this.#s.id}_mouseout`, this.#g.erase, this.#g), this.on(_e, this.#y.draw, this.#y);
  }
  on(e, i, s) {
    this.core.on(e, i, s);
  }
  off(e, i) {
    this.core.off(e, i);
  }
  emit(e, i) {
    this.core.emit(e, i);
  }
  onResize(e) {
    this.setDimensions(e);
  }
  onMouseMove(e) {
    this.#T = M(e) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)], this.#g.draw(this.#T);
  }
  onDrag(e) {
    this.#T = [
      Math.floor(e.position.x),
      Math.floor(e.position.y),
      e.dragstart.x,
      e.dragstart.y,
      e.movement.x,
      e.movement.y
    ], this.setScaleRange(Math.sign(e.movement.y));
  }
  onDragDone(e) {
  }
  onMouseWheel(e) {
    e.domEvent.preventDefault(), this.setScaleRange(Math.sign(e.wheeldelta) * -1);
  }
  onStreamUpdate(e) {
  }
  onChartDrag(e) {
    this.#a.mode === "manual" && (this.#a.offset = e.domEvent.srcEvent.movementY, this.draw());
  }
  setHeight(e) {
    this.#h.style.height = `${e}px`;
  }
  setDimensions(e) {
    const i = this.#h.getBoundingClientRect().width;
    this.setHeight(e.h), this.graph instanceof wt && (this.#p.setSize(i, e.h, i), this.draw()), this.#g instanceof Zr && this.calcPriceDigits();
  }
  setScaleRange(e = 0) {
    this.#a.mode == "automatic" && (this.#a.mode = "manual"), this.#a.zoom = e, this.draw(this.range, !0), this.#r.MainPane.draw();
  }
  resetScaleRange() {
    this.#a.mode = "automatic", this.draw(this.range, !0), this.#r.MainPane.draw();
  }
  yPos(e) {
    return this.#a.yPos(e);
  }
  yPosStream(e) {
    return this.#a.lastYData2Pixel(e);
  }
  yPos2Price(e) {
    return this.#a.yPos2Price(e);
  }
  nicePrice(e) {
    let i = this.#a.countDigits(e);
    return this.#a.limitPrecision(i);
  }
  createGraph() {
    let e = ce(Ac);
    this.graph = new wt(this, this.#d, e, !1), this.#g = this.graph.overlays.get("cursor").instance, this.#u = this.graph.overlays.get("labels").instance, this.#m = this.graph.overlays.get("overlay").instance, this.#y = this.graph.overlays.get("price").instance, this.graph.addOverlays(this.#w), this.#y.target.moveTop(), this.#g.target.moveTop(), this.calcPriceDigits();
  }
  calcPriceDigits() {
    const e = this.#g.viewport.scene.context, i = this.theme.yAxis;
    e.font = xt(i.fontSize, i.fontWeight, i.fontFamily);
    const s = Us(e, "0");
    this.#S = Math.floor(this.width / s);
  }
  addOverlays(e) {
    if (!M(e))
      return !1;
    this.graph === void 0 ? this.#w.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!b(i))
      return !1;
    if (this.graph === void 0)
      this.#w.push([e, i]);
    else {
      let s = this.graph.addOverlay(e, i);
      return this.#y.target.moveTop(), this.#g.target.moveTop(), s;
    }
  }
  render() {
    this.#p.render();
  }
  draw(e = this.range, i = !0) {
    this.#p.draw(e, i), this.#s.drawGrid(i), this.parent.draw(this.range, !0);
  }
  resize(e = this.width, i = this.height) {
    this.setDimensions({ w: e, h: i });
  }
}
class Oc {
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = i;
  }
  draw(e) {
    const i = this.ctx, n = e.raw[4] >= e.raw[1] ? this.cfg.volume.UpColour : this.cfg.volume.DnColour;
    i.save(), i.strokeStyle = n, i.fillStyle = n, i.fillRect(
      Math.floor(e.x),
      Math.floor(e.z - e.h),
      Math.floor(e.w),
      Math.floor(e.h)
    ), i.restore();
  }
}
class Nc extends G {
  #e;
  #t;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#e = new Oc(e.scene, n), this.theme.volume.Height = U(n?.volume?.Height, 0, 100) || 100;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e = this.core.range) {
    if (!super.mustUpdate())
      return;
    this.scene.clear();
    const i = e.data, s = this.scene.height, n = this.xAxis.smoothScrollOffset || 0;
    let r = Math.max(this.xAxis.candleW - 1, 1);
    r < 3 ? r = 1 : r < 5 ? r = 3 : r > 5 && (r = Math.ceil(r * 0.8));
    const a = {
      x: 0 + n - this.xAxis.candleW,
      w: r,
      z: s
    }, l = Math.floor(s * this.theme.volume.Height / 100);
    let h = this.core.rangeScrollOffset, m = e.indexStart - h, g = e.Length + h * 2, v = g, S = m, A, L = 0;
    for (; v--; )
      A = e.value(S), A[4] !== null && (L = A[5] > L ? A[5] : L), S++;
    for (; g--; )
      A = e.value(m), a.x = we(this.xAxis.xPos(A[0]) - r / 2), A[4] !== null && (a.h = l - l * ((L - A[5]) / L), a.raw = i[m], this.#e.draw(a)), m++;
    super.updated();
  }
}
class Jr {
  areaCoordinates = [];
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = i;
  }
  draw(e) {
    const i = this.ctx, s = e.raw[4] >= e.raw[1], n = s ? this.cfg.candle.UpBodyColour : this.cfg.candle.DnBodyColour, r = s ? this.cfg.candle.UpWickColour : this.cfg.candle.DnWickColour;
    switch (this.cfg.candle.Type) {
      case Z.CANDLE_SOLID:
        this.fill = !0;
        break;
      case Z.CANDLE_HOLLOW:
      case Z.OHLC:
        this.fill = !1;
        break;
      case Z.CANDLE_UP_HOLLOW:
        this.fill = !s;
        break;
      case Z.CANDLE_DOWN_HOLLOW:
        this.fill = s;
    }
    let a = Math.max(e.w - 1, 1);
    a < 3 ? a = 1 : a < 5 ? a = 3 : a > 5 && (a = Math.ceil(a * 0.8));
    let l = Math.max(Math.floor(a * 0.5), 1), h = Math.abs(e.o - e.c), m = e.c === e.o ? 1 : 2, g = e.x, v = Math.floor(g) - 0.5;
    if (i.save(), i.strokeStyle = r, i.beginPath(), i.moveTo(v, Math.floor(e.h)), this.cfg.candle.Type === Z.OHLC ? i.lineTo(v, Math.floor(e.l)) : s ? (i.lineTo(v, Math.floor(e.c)), i.moveTo(v, Math.floor(e.o))) : (i.lineTo(v, Math.floor(e.o)), i.moveTo(v, Math.floor(e.c))), i.lineTo(v, Math.floor(e.l)), i.stroke(), a == 3) {
      i.fillStyle = r;
      let S = s ? 1 : -1;
      i.rect(
        Math.floor(g - l),
        e.c,
        Math.floor(l * 2),
        S * Math.max(h, m)
      ), i.fill(), i.stroke();
    } else if (a > 3 && this.fill) {
      i.fillStyle = n;
      let S = s ? 1 : -1;
      i.rect(
        Math.floor(g - l),
        e.c,
        Math.floor(l * 2),
        S * Math.max(h, m)
      ), i.fill(), i.stroke();
    } else if (a > 3 && !this.fill && this.cfg.candle.Type !== Z.OHLC) {
      let S = s ? 1 : -1;
      i.rect(
        Math.floor(g - l),
        e.c,
        Math.floor(l * 2),
        S * Math.max(h, m)
      ), i.stroke();
    } else
      this.cfg.candle.Type === Z.OHLC ? (i.beginPath(), i.moveTo(v - l, e.o), i.lineTo(v, e.o), i.moveTo(v, e.c), i.lineTo(v + l, e.c), i.stroke()) : (i.strokeStyle = r, i.beginPath(), i.moveTo(
        v,
        Math.floor(Math.min(e.o, e.c))
      ), i.lineTo(
        v,
        Math.floor(Math.max(e.o, e.c)) + (e.o === e.c ? 1 : 0)
      ), i.stroke());
    i.restore();
  }
  body(e) {
  }
  area(e) {
    this.areaCoordinates.push(e);
  }
  areaRender() {
    const e = this.areaCoordinates;
    if (!M(e) || e.length == 0)
      return;
    let i = this.ctx, s = this.cfg.candle, n;
    Math.max(e[0].w - 1, 1), e[0].x;
    let r = [e[0].x, e[0].h];
    i.save(), i.strokeStyle = s.AreaLineColour || s.UpBodyColour || s.DnBodyColour, i.lineWidth = 1, i.beginPath(), i.moveTo(e[0].x, e[0].h);
    let a = 0;
    for (; a < e.length; )
      i.lineTo(e[a].x, e[a].h), a++;
    if (s?.Type == "area") {
      if (n = i.createLinearGradient(0, 0, 0, this.scene.height), M(s.AreaFillColour))
        for (let [l, h] of s.AreaFillColour.entries())
          n.addColorStop(l, h);
      else
        E() ? n = s.AreaFillColour : n = s.UpBodyColour || s.DnBodyColour;
      i.stroke(), i.lineTo(e[a - 1].x, this.scene.height), i.lineTo(r[0], this.scene.height), i.fillStyle = n, i.closePath(), i.fill();
    } else
      i.stroke();
    i.restore(), e.length = 0;
  }
}
class Qr extends G {
  #e;
  constructor(e, i = !1, s = !1, n, r) {
    super(e, i, s, n, r), this.#e = new Jr(e.scene, n);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e = this.core.range) {
    if (!super.mustUpdate())
      return;
    this.scene.clear();
    let i, s = this.theme.candle.Type;
    switch (s) {
      case Z.AREA:
      case Z.LINE:
        i = (g) => {
          this.#e.area({ ...g });
        };
        break;
      default:
        i = (g) => {
          this.#e.draw(g);
        };
        break;
    }
    const r = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let a = this.core.rangeScrollOffset, l = e.indexStart - a, h = e.Length + a * 2, m;
    for (this.core.stream && (this.core.stream.lastPriceMax = e.valueMax, this.core.stream.lastPriceMin = e.valueMin); h; ) {
      if (l >= 0) {
        if (m = e.value(l), r.x = this.xAxis.xPos(m[0]), m?.[7]) {
          this.core.stream.lastXPos = r.x, this.core.stream.lastYPos = { ...r };
          break;
        }
        m[4] !== null && (r.o = this.yAxis.yPos(m[1]), r.h = this.yAxis.yPos(m[2]), r.l = this.yAxis.yPos(m[3]), r.c = this.yAxis.yPos(m[4]), r.raw = m, i(r));
      }
      l++, h--;
    }
    (s === Z.AREA || s === Z.LINE) && this.#e.areaRender(), super.updated();
  }
}
class Ic extends G {
  #e;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#e = new Jr(e.scene, n), this.theme.priceLineStyle = this.theme?.priceLineStyle || Rh;
  }
  set position(e) {
    this.setPosition(e[0], e[1]);
  }
  setPosition(e, i) {
    this.core.stream !== void 0 && (this.target.setPosition(e, i), this.core.stream.lastScrollPos = this.core.scrollPos);
  }
  draw() {
    if (this.core.stream === void 0 || !M(this.chart.streamCandle))
      return;
    this.scene.clear();
    const e = this.core.range, i = this.chart.streamCandle, s = this.theme.candle.Type === Z.AREA || this.theme.candle.Type === Z.LINE ? (a) => {
      this.areaRender(a);
    } : (a) => {
      this.#e.draw(a);
    };
    this.xAxis.smoothScrollOffset;
    const r = {
      x: this.core.stream.lastXPos,
      w: this.xAxis.candleW
    };
    r.o = this.yAxis.yPos(i[1]), r.h = this.yAxis.yPos(i[2]), r.l = this.yAxis.yPos(i[3]), r.c = this.yAxis.yPos(i[4]), r.raw = i, e.inRenderRange(i[0]) && s(r), i[4] >= i[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, Gt(
      this.scene.context,
      r.c,
      0,
      this.target.width,
      this.theme.priceLineStyle
    );
  }
  areaRender(e) {
    const i = this.core.range, s = i.value(i.data.length - 2);
    if (s === null)
      return;
    const n = {
      x: this.xAxis.xPos(s[0]),
      o: this.yAxis.yPos(s[1]),
      h: this.yAxis.yPos(s[2]),
      l: this.yAxis.yPos(s[3]),
      c: this.yAxis.yPos(s[4])
    }, r = this.scene.context, a = this.theme, l = a.candle.UpBodyColour || a.candle.DnBodyColour;
    Math.max(e.w - 1, 1), e.x;
    let h;
    if (r.save(), r.fillStyle = l, r.strokeStyle = l, r.lineWidth = 1, r.beginPath(), r.moveTo(e.x, e.c), r.lineTo(n.x, n.h), a.candle.Type === Z.AREA) {
      if (h = r.createLinearGradient(0, 0, 0, this.scene.height), M(a.candle.AreaFillColour))
        for (let [m, g] of a.candle.AreaFillColour.entries())
          h.addColorStop(m, g);
      else
        isString() ? h = a.candle.AreaFillColour : h = a.candle.UpBodyColour || a.candle.DnBodyColour;
      r.stroke(), r.lineTo(n.x, this.scene.height), r.lineTo(e.x, this.scene.height), r.fillStyle = h, r.closePath(), r.fill();
    } else
      r.stroke();
    r.restore();
  }
}
const kt = {
  colour: "#4444cc88",
  wdith: 1,
  dash: [1, 0]
};
class Dc extends G {
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a);
    const l = { class: Rc, fixed: !0, required: !1 };
    this.core.config?.highLow === !0 && (this.scaleOverly = this.chart.scale.addOverlay("hiLo", l));
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw(e = this.core.range) {
    if (this.core.config?.highLow !== !0 || !super.mustUpdate())
      return;
    this.scene.clear();
    let i, s, n, r = this.scene.width, a = 35, l = {};
    const h = e.valueHi, m = e.valueLo, g = { ...this.theme.yAxis }, v = this.scene.context;
    g.colourCursorBG = this.theme?.hilo?.colour || kt.colour, v.save(), v.strokeStyle = this.theme?.highLow?.colour || kt.colour, v.strokeWidth = this.theme?.highLow?.width || kt.width, v.setLineDash(this.theme?.highLow?.dash || kt.dash), n = this.yAxis.yPos(h), Gt(v, n, 0, r, l), i = "High", s = this.theme.yAxis.location == "left" ? 0 : r - (a + 25), Ni(v, i, s, n, a, g), n = this.yAxis.yPos(m), Gt(v, n, 0, r, l), i = "Low", Ni(v, i, s, n, a, g), v.restore(), super.updated(), "hiLo" in this.chart.scale.overlays && (this.chart.scale.overlays.hiLo.instance.setRefresh(), this.chart.scale.overlays.hiLo.instance.scaleDraw());
  }
}
class Rc extends G {
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw() {
  }
  scaleDraw(e = this.core.range) {
    if (!super.mustUpdate())
      return;
    this.scene.clear();
    let i, s, n, r;
    const a = e.valueHi, l = e.valueLo, h = { ...this.theme.yAxis }, m = this.scene.context;
    h.colourCursorBG = this.theme?.hilo?.colour || kt.colour, i = this.chart.Scale.nicePrice(a), s = 1, n = this.yAxis.yPos(a) + 1, r = this.viewport.width, Ni(m, i, s, n, r, h), i = this.chart.Scale.nicePrice(l), n = this.yAxis.yPos(l) + 1, Ni(m, i, s, n, r, h), super.updated();
  }
}
function Ni(o, e, i, s, n, r) {
  let a = {
    fontSize: r.fontSize * 1.05,
    fontWeight: r.fontWeight,
    fontFamily: r.fontFamily,
    txtCol: r.colourCursor,
    bakCol: r.colourCursorBG,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
    width: n
  }, l = a.fontSize + a.paddingTop + a.paddingBottom, h = s - l * 0.5;
  o.save(), o.fillStyle = a.bakCol, o.fillRect(i, h, n, l), vt(o, `${e}`, i, h, a), o.restore();
}
class kc {
  data;
  icon;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.events, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.icon = R.svgToImage(this.cfg.iconEvent, this.cfg.iconColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.icon, s = this.cfg, n = this.hit.getIndexValue(e.key), r = R.svgToImage(s.iconEvent, n, this.dims), a = U(e.w, s.iconMinDim, s.iconHeight), l = U(e.w, s.iconMinDim, s.iconWidth), h = this.data.x, m = this.data.y, g = this.ctx, v = this.ctxH;
    return g.save(), g.drawImage(i, h, m, l, a), g.restore(), v.save(), v.drawImage(r, h, m, l, a), v.restore(), { x: h, y: m, w: l, h: a, k: n };
  }
}
const _c = {
  bounded: !0,
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
class Hc extends G {
  #e;
  #t = [];
  #n;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#e = new kc(e, n), this.emit(), this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this), this.#n = this.core.WidgetsG.insert("Dialogue", _c), this.#n.start();
  }
  destroy() {
    this.core.off("primary_pointerdown", this.onPrimaryPointerDown, this);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get data() {
    return this.overlay.data;
  }
  onPrimaryPointerDown(e) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && ke(this.isNewsEventSelected, Si, this)(e);
  }
  isNewsEventSelected(e) {
    const i = e[0], s = e[1], n = this.hit.getIntersection(i, s);
    if (this.core.config?.events?.display === !1 || this.core.config?.events?.displayInfo === !1 || n == -1)
      return;
    const r = this.theme.events, a = U(this.xAxis.candleW, r.iconMinDim, r.iconHeight), l = this.xAxis.pixel2T(i), h = this.xAxis.scrollOffsetPx, m = this.core.dimensions;
    let g = Object.keys(this.data)[n] * 1, v = this.xAxis.xPos(l) + h, S = s - a * 1.5 - m.height, A = "";
    for (let k of this.data[g])
      A += this.buildNewsEventHTML(k);
    const L = {
      dimensions: { h: void 0, w: 150 },
      position: { x: v + a / 2 + 1, y: S },
      content: A,
      offFocus: Si + 1
    };
    this.core.emit("event_selected", g), this.#n.open(L);
  }
  buildNewsEventHTML(e) {
    let i = e?.title, s = `<style>
    h1, p {display: inline-block; font-size: 0.9em;
    max-width: 98%;
    </style>`;
    return E(e?.url) && (i = `<a href="${e?.url}" target="${e?.target}">${i}</a>`), s += `<h1>${i}</h1>`, s += `<p>${e?.content}</p>`, s;
  }
  draw(e = this.core.range) {
    if (this.core.config?.events?.display === !1 || !super.mustUpdate())
      return;
    this.hit.clear(), this.scene.clear(), this.#t.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.events, r = this.core.rangeScrollOffset, a = e.indexStart - r, l = e.Length + r * 2, h, m, g;
    for (; l; ) {
      if (h = e.value(a), m = `${h[0]}`, g = Object.keys(this.data).indexOf(m), g >= 0)
        for (let v of this.data[m])
          s.x = this.xAxis.xPos(h[0]) - this.xAxis.candleW / 2, s.y = this.scene.height - U(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.key = g, this.#t.push(this.#e.draw(s));
      a++, l--;
    }
    super.updated();
  }
}
class $c {
  data;
  buy;
  sell;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.trades, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.buy = R.svgToImage(this.cfg.iconBuy, this.cfg.buyColour, this.dims), this.sell = R.svgToImage(this.cfg.iconSell, this.cfg.sellColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.cfg, s = e.side === "buy" ? this.buy : this.sell, n = e.side === "buy" ? i.iconBuy : i.iconSell, r = this.hit.getIndexValue(e.key), a = R.svgToImage(n, r, this.dims), l = U(e.w, i.iconMinDim, i.iconHeight), h = U(e.w, i.iconMinDim, i.iconWidth), m = this.data.x, g = this.data.y, v = this.ctx, S = this.ctxH;
    return v.save(), v.drawImage(s, m, g, h, l), v.restore(), S.save(), S.drawImage(a, m, g, h, l), S.restore(), { x: m, y: g, w: h, h: l, k: r };
  }
}
const Uc = {
  bounded: !0,
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
class Bc extends G {
  #e;
  #t = [];
  #n;
  #r;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.settings = a.settings, this.#e = new $c(e, n), this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this), this.#r = this.core.WidgetsG.insert("Dialogue", Uc), this.#r.start();
  }
  destroy() {
    this.core.off("primary_pointerdown", this.onPrimaryPointerDown, this);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get data() {
    return this.overlay.data;
  }
  get settings() {
    return this.params.settings;
  }
  set settings(e) {
    this.doSettings(e);
  }
  doSettings(e) {
    if (!b(e))
      return !1;
    let i = this.theme.trades;
    for (let s in e)
      e[s] !== void 0 && (i[s] = e[s]);
  }
  onPrimaryPointerDown(e) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && ke(this.isTradeSelected, Si, this)(e);
  }
  isTradeSelected(e) {
    const i = e[0], s = e[1], n = this.hit.getIntersection(i, s);
    if (this.core.config?.trades?.display === !1 || this.core.config?.trades?.displayInfo === !1 || n == -1)
      return;
    const r = this.theme.trades, a = U(this.xAxis.candleW, r.iconMinDim, r.iconWidth), l = this.xAxis.pixel2T(i);
    this.core.range.valueByTS(l);
    const h = this.xAxis.scrollOffsetPx, m = this.core.dimensions;
    let g = Object.keys(this.data)[n] * 1, v = this.xAxis.xPos(l) + h, S = s - a * 1.5 - m.height, A = "";
    for (let k of this.data[g])
      A += this.buildTradeHTML(k);
    const L = {
      dimensions: { h: void 0, w: 150 },
      position: { x: v + a / 2 + 1, y: S },
      content: A,
      offFocus: Si + 1
    };
    this.core.emit("trade_selected", g), this.#r.open(L);
  }
  buildTradeHTML(e) {
    let i = `<style>
    dt, dd {display: inline-block; font-size: 0.9em;}
    dt {min-width: 40%;}
    dd {min-width: 60%; margin: 0;}
    </style>`;
    i += "<dl>";
    for (let s in e)
      s != "timestamp" && (i += `<dt>${s}</dt><dd>${e[s]}</dd>`);
    return i += "</dl>", i;
  }
  draw(e = this.core.range) {
    if (!super.mustUpdate() || this.core.config?.trades?.display === !1)
      return;
    this.hit.clear(), this.scene.clear(), this.#t.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.trades, r = this.core.rangeScrollOffset, a = e.indexStart - r, l = e.Length + r * 2, h, m, g;
    for (; l; ) {
      if (h = e.value(a), m = `${h[0]}`, g = Object.keys(this.data).indexOf(m), g >= 0)
        for (let v of this.data[m])
          s.x = this.xAxis.xPos(h[0]) - this.xAxis.candleW / 2, s.y = this.yAxis.yPos(h[2]) - U(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.side = v.side, s.key = g, this.#t.push(this.#e.draw(s));
      a++, l--;
    }
    super.updated();
  }
}
const eo = {
  primaryPane: [
    ["grid", { class: Oi, fixed: !0, required: !0, params: { axes: "y" } }],
    ["volume", { class: Nc, fixed: !1, required: !0, params: { maxVolumeH: yi.ONCHART_VOLUME_HEIGHT } }],
    ["candles", { class: Qr, fixed: !1, required: !0 }],
    ["hiLo", { class: Dc, fixed: !0, required: !1 }],
    ["stream", { class: Ic, fixed: !1, required: !0 }],
    ["cursor", { class: bs, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: Oi, fixed: !0, required: !0, params: { axes: "y" } }],
    ["cursor", { class: bs, fixed: !0, required: !0 }]
  ]
}, Cs = {
  primaryPane: {
    trades: { class: Bc, fixed: !1, required: !1 },
    events: { class: Hc, fixed: !1, required: !1 }
  },
  secondaryPane: {
    candles: { class: Qr, fixed: !1, required: !0 }
  }
}, Te = {
  id: "chart",
  title: "",
  type: "chart",
  source: () => {
  }
};
class nt {
  static #e = 0;
  static get cnt() {
    return nt.#e++;
  }
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d = "idle";
  #u = {
    state: !1,
    height: null,
    rowsHeight: null,
    rowsCnt: 1
  };
  #m;
  #y;
  #g;
  #b;
  #w;
  #p;
  #S;
  #C;
  #f;
  #T;
  #x;
  #I;
  #M = new be();
  #L = new be();
  #E = [0, 0];
  #A = !1;
  #P;
  #v;
  #R;
  #k = {
    valueMax: 110,
    valueMin: -10,
    valueDiff: 120
  };
  #D = {};
  constructor(e, i) {
    if (this.#s = e, this.#a = nt.cnt, !b(i))
      return;
    this.#l = { ...i }, this.#n = this.#l.name, this.#r = this.#l.shortName, this.#i = this.#l.title, this.#h = this.#l.type == "primary" ? "primaryPane" : "secondaryPane", this.#x = this.#l.view, this.#y = this.#l.elements.elScale, this.#o = this.#l.parent, this.#m = this.#l.elements.elTarget, this.#m.id = this.id, this.legend = new Tc(this.elLegend, this), this.isPrimary ? (Te.type = "chart", Te.title = this.title, Te.parent = this, Te.source = this.legendInputs.bind(this), this.legend.add(Te), this.yAxisType = "default") : (Te.type = "secondary", Te.title = "", Te.parent = this, Te.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(Te), this.yAxisType = this.core.indicatorClasses[i.view[0].type].ind.scale);
    const s = { ...i };
    s.parent = this, s.chart = this, s.elScale = this.elScale, s.yAxisType = this.yAxisType, this.scale = new Lc(this.core, s), this.#d = "init", this.log(`${this.name} instantiated`);
  }
  log(e) {
    this.core.log(e);
  }
  info(e) {
    this.core.info(e);
  }
  warn(e) {
    this.core.warn(e);
  }
  error(e) {
    this.core.error(e);
  }
  set id(e) {
    this.#t = $e(e);
  }
  get id() {
    return this.#t ? `${this.#t}` : `${this.#s.id}-${this.#n}_${this.#a}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#n;
  }
  get shortName() {
    return this.#r;
  }
  set title(e) {
    this.setTitle(e);
  }
  get title() {
    return this.#i;
  }
  get parent() {
    return this.#o;
  }
  get core() {
    return this.#s;
  }
  get type() {
    return this.#h;
  }
  get status() {
    return this.#d;
  }
  get collapsed() {
    return this.#u;
  }
  get isPrimary() {
    return this.#h === "primaryPane";
  }
  get isPrimary() {
    return this.#l.view.primary || !1;
  }
  get options() {
    return this.#l;
  }
  get element() {
    return this.#m;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#m);
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#m.getBoundingClientRect().width;
  }
  set height(e) {
    this.setHeight(e);
  }
  get height() {
    return this.#m.getBoundingClientRect().height;
  }
  get data() {
  }
  get range() {
    return this.#s.range;
  }
  set localRange(e) {
    this.setLocalRange(e);
  }
  get localRange() {
    return this.#k;
  }
  get stream() {
    return this.#C;
  }
  get streamCandle() {
    return this.#T;
  }
  set cursor(e) {
    this.element.style.cursor = e;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#E;
  }
  set cursorActive(e) {
    this.#A = e;
  }
  get cursorActive() {
    return this.#A;
  }
  get cursorClick() {
    return this.#P;
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
    return this.#w.viewport.scene.canvas;
  }
  get elScale() {
    return this.#y;
  }
  get elLegend() {
    return this.#m.legend;
  }
  get elViewport() {
    return this.#m.viewport;
  }
  set layerWidth(e) {
    this.#w.layerWidth = e;
  }
  get layerWidth() {
    return this.#w.layerWidth;
  }
  set legend(e) {
    this.#p = e;
  }
  get legend() {
    return this.#p;
  }
  set time(e) {
    this.#b = e;
  }
  get time() {
    return this.#b;
  }
  set scale(e) {
    this.#g = e;
  }
  get scale() {
    return this.#g;
  }
  set yAxisType(e) {
    this.setYAxisType(e);
  }
  get yAxisType() {
    return this.#R;
  }
  get axes() {
    return "x";
  }
  set graph(e) {
    this.#w = e;
  }
  get graph() {
    return this.#w;
  }
  get view() {
    return this.#x;
  }
  get viewport() {
    return this.#w.viewport;
  }
  get layerGrid() {
    return this.#w.overlays.get("grid").layer;
  }
  get overlays() {
    return Object.fromEntries([...this.#w.overlays.list]);
  }
  get overlayGrid() {
    return this.#w.overlays.get("grid").instance;
  }
  get overlayTools() {
    return this.#L;
  }
  get overlaysDefault() {
    return eo[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#D;
  }
  set stateMachine(e) {
    this.#c = new ze(e, this);
  }
  get stateMachine() {
    return this.#c;
  }
  get Divider() {
    return this.#S;
  }
  get siblingPrev() {
    return this.sibling("prev");
  }
  get siblingNext() {
    return this.sibling("next");
  }
  start() {
    this.#b = this.#s.Timeline, this.createGraph(), this.#g.start(), this.draw(this.range), this.cursor = "crosshair", ns.id = this.id, ns.context = this, this.stateMachine = ns, this.stateMachine.start(), this.eventsListen();
    let e = { chartPane: this };
    this.#S = this.core.WidgetsG.insert("Divider", e), this.#S.start(), e = { title: "Chart Config", content: "config the chart" }, this.#f = this.core.WidgetsG.insert("ConfigDialogue", e), this.#f.start(), this.#d = "running";
  }
  destroy() {
    if (this.#d !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.removeAllIndicators(), this.stateMachine.destroy(), this.Divider.destroy(), this.#g.destroy(), this.#w.destroy(), this.#v.destroy(), this.legend.destroy(), this.off("main_mousemove", this.onMouseMove, this), this.off($t, this.onStreamListening, this), this.off(zt, this.onStreamNewValue, this), this.off(_e, this.onStreamUpdate, this), this.off(Vt, this.onStreamNewValue, this), this.off(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.off("chart_yAxisRedraw", this.onYAxisRedraw), this.element.remove(), this.#d = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting chart pane: ${this.id}`), this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#v = new Le(this.#m, { disableContextMenu: !1 }), this.#v.on("pointerdrag", this.onChartDrag.bind(this)), this.#v.on("pointerdragend", this.onChartDragDone.bind(this)), this.#v.on("pointermove", this.onMouseMove.bind(this)), this.#v.on("pointerenter", this.onMouseEnter.bind(this)), this.#v.on("pointerout", this.onMouseOut.bind(this)), this.#v.on("pointerdown", this.onMouseDown.bind(this)), this.#v.on("pointerup", this.onMouseUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on($t, this.onStreamListening, this), this.on(zt, this.onStreamNewValue, this), this.on(_e, this.onStreamUpdate, this), this.on(Vt, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
  }
  on(e, i, s) {
    this.#s.on(e, i, s);
  }
  off(e, i) {
    this.#s.off(e, i);
  }
  emit(e, i) {
    this.#s.emit(e, i);
  }
  onChartDrag(e) {
    this.cursor = "grab", this.scale.yAxis.mode == "manual" && this.#w.drawAll(), this.core.MainPane.onChartDrag(e), this.scale.onChartDrag(e);
  }
  onChartDragDone(e) {
    this.cursor = "crosshair", this.core.MainPane.onChartDragDone(e);
  }
  onMouseMove(e) {
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#E = [Math.round(e.position.x), Math.round(e.position.y)], this.#g.onMouseMove(this.#E), this.emit(`${this.id}_mousemove`, this.#E);
  }
  onMouseEnter(e) {
    this.core.MainPane.onPointerActive(this), this.#E = [Math.round(e.position.x), Math.round(e.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_mouseenter`, this.#E);
  }
  onMouseOut(e) {
    this.#A = !1, this.#E = [Math.round(e.position.x), Math.round(e.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_mouseout`, this.#E);
  }
  onMouseDown(e) {
    this.#s.pointerButtons[e.domEvent.srcEvent.button] = !0, this.#P = [Math.floor(e.position.x), Math.floor(e.position.y)], this.stateMachine.state === "tool_activated" ? this.emit("tool_targetSelected", { target: this, position: e }) : this.isPrimary && this.emit("primary_pointerdown", this.#P);
  }
  onMouseUp(e) {
    this.#s.pointerButtons[e.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(e) {
    this.#C !== e && (this.#C = e);
  }
  onStreamNewValue(e) {
    this.draw(this.range, !0);
  }
  onStreamUpdate(e) {
    this.isPrimary ? (this.#T = e, this.chartStreamCandle.draw(), this.layerStream.setPosition(this.core.stream.lastScrollPos, 0), this.updateLegends(this.cursorPos, e)) : this.updateLegends(), this.#s.MainPane.draw();
  }
  onYAxisRedraw() {
    this.isPrimary && this.refresh();
  }
  onDeleteIndicator(e) {
    this.removeIndicator(e.id);
  }
  setTitle(e) {
    if (!E(e))
      return !1;
    this.#i = e, Te.title = e;
    const i = this.legend.list.chart.el.querySelectorAll(".title");
    for (let s of i)
      s.innerHTML = e;
    return !0;
  }
  setWatermark(e) {
    E(e.text) || E(e) ? this.core.config.watermark.text = e : "imgURL" in e && (this.core.config.watermark.imgURL = e);
  }
  setHeight(e) {
    T(e) || (e = this.height || this.#o.height), this.#m.style.height = `${e}px`, this.#y.style.height = `${e}px`, this.elViewport.style.height = `${e}px`, this.#g.setDimensions({ w: null, h: e }), this.Divider?.setPos(), this.Divider?.setWidth();
  }
  setDimensions(e) {
    const i = this.config.buffer || ki;
    let { w: s, h: n } = e;
    s = this.width, n = n || this.height, this.setHeight(n), this.graph instanceof wt && (this.layerWidth = Math.round(s * ((100 + i) * 0.01)), this.graph.setSize(s, n, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.Divider.setPos(), this.Divider.setWidth());
  }
  setLocalRange(e, i) {
    if (!T(i) || !T(e))
      return !1;
    e > i && ([e, i] = [i, e]), this.#k = {
      valueMax: i,
      valueMin: e,
      valueDiff: i - e
    };
  }
  setYAxisType(e) {
    return !E(e) || !Ke.includes(e) || this.type == "primaryPane" && e == "percent" ? !1 : (this.#R = e, !0);
  }
  addOverlays(e) {
    if (!M(e) || e.length < 1)
      return !1;
    const i = [];
    for (let s of e) {
      const n = { fixed: !1, required: !1 };
      if (s.type in this.core.indicatorClasses)
        n.cnt = this.core.indicatorClasses[s.type].ind.cnt, n.id = `${this.id}-${s.type}_${n.cnt}`, n.class = this.core.indicatorClasses[s.type].ind;
      else if (s.type in Cs[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = Cs[this.type][s.type].class;
      else if (s.type in this.#s.customOverlays[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = this.#s.customOverlays[this.type][s.type].class;
      else
        continue;
      n.params = { overlay: s }, s.id = n.id, s.paneID = this.id, i.push([s.id, n]);
    }
    return this.graph.addOverlays(i), !0;
  }
  addIndicator(e) {
    const i = this.type === "primaryPane", s = this.core.indicatorClasses[e.type].ind, n = s.constructor.type === "both" ? i : s.prototype.primaryPane;
    if (e?.type in this.core.indicatorClasses && i === n) {
      e.paneID = this.id;
      const r = {
        class: s,
        params: { overlay: e }
      };
      return this.graph.addOverlay(e.name, r);
    } else
      return !1;
  }
  getIndicators() {
    const e = Object.keys(this.core.indicatorClasses), i = {};
    for (let [s, n] of Object.entries(this.overlays))
      if (e.includes(n.params?.overlay?.type)) {
        let r = n.id || n.instance.id;
        i[r] = n;
      }
    return i;
  }
  removeIndicator(e) {
    if (!E(e) || !(e in this.indicators))
      return !1;
    this.#D[e] = !0, this.indicators[e].instance.destroy(), this.graph.removeOverlay(e), this.draw(), Object.keys(this.indicators).length === 0 && !this.isPrimary && this.emit("destroyChartView", this.id), delete this.#D[e];
  }
  removeAllIndicators() {
    const e = this.getIndicators();
    for (let i in e)
      this.removeIndicator(i);
  }
  indicatorVisible(e, i) {
    return !E(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.visible(i);
  }
  indicatorSettings(e, i) {
    return !E(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.settings(i);
  }
  addTool(e) {
    let { layerConfig: i } = this.layerConfig(), s = new Ft.Layer(i);
    this.#M.set(e.id, s), this.#I.addLayer(s), e.layerTool = s, this.#L.set(e.id, e);
  }
  addTools(e) {
  }
  overlayTools() {
  }
  overlayToolAdd(e) {
    this.#L.set(e.id, e);
  }
  overlayToolDelete(e) {
    this.#L.delete(e);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.#s.scrollPos, 0), this.overlayGrid.setRefresh(), this.overlayGrid.draw("y"), this.#s.MainPane.draw();
  }
  refresh() {
    this.emit("pane_refresh", this), this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  legendsVisibility(e) {
    this.legend.setCollapse(e);
  }
  updateLegends(e = this.#E, i = !1) {
    if (!(this.#s.isEmpty || !b(this.#p)))
      for (const s in this.#p.list)
        this.#p.update(s, { pos: e, candle: i });
  }
  legendInputs() {
    const e = [!0, !0, !0, !0, !0], i = this.cursorPos, s = this.time.xPos2Index(i[0] - this.core.scrollPos), n = U(s, 0, this.range.data.length - 1), r = this.range.data[n], a = this.theme.candle, l = r[4] >= r[1] ? new Array(5).fill(a.UpWickColour) : new Array(5).fill(a.DnWickColour), h = {}, m = ["T", "O", "H", "L", "C", "V"];
    for (let g = 1; g < 6; g++)
      h[m[g]] = this.scale.nicePrice(r[g]);
    return { inputs: h, colours: l, labels: e };
  }
  onLegendAction(e) {
    switch (this.#p.onMouseClick(e.currentTarget).icon) {
      case "up":
        this.reorderUp();
        return;
      case "down":
        this.reorderDown();
        return;
      case "maximize":
        this.#s.MainPane.paneMaximize(this);
        return;
      case "restore":
        this.#s.MainPane.paneMaximize(this);
        return;
      case "collapse":
        this.#s.MainPane.paneCollapse(this);
        return;
      case "expand":
        this.#s.MainPane.paneCollapse(this);
        return;
      case "remove":
        this.remove();
        return;
      case "config":
        this.configDialogue();
        return;
      default:
        return;
    }
  }
  reorderUp() {
    const {
      el: e,
      prevEl: i,
      parentEl: s,
      scaleEl: n,
      prevScaleEl: r,
      parentScaleEl: a,
      prevPane: l
    } = { ...this.currPrevNext() };
    return !b(i) || !b(r) ? !1 : (s.insertBefore(e, i), a.insertBefore(n, r), this.Divider.setPos(), l !== null && (l.Divider.setPos(), l.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), e.previousElementSibling === null && this.Divider.hide(), !0);
  }
  reorderDown() {
    const {
      el: e,
      nextEl: i,
      parentEl: s,
      scaleEl: n,
      nextScaleEl: r,
      parentScaleEl: a,
      nextPane: l
    } = { ...this.currPrevNext() };
    return !b(i) || !b(r) ? !1 : (s.insertBefore(i, e), a.insertBefore(r, n), this.Divider.setPos(), l !== null && (l.Divider.setPos(), this.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), i.previousElementSibling === null && l.Divider.hide(), !0);
  }
  createGraph() {
    let e = ce(this.overlaysDefault);
    this.graph = new wt(this, this.elViewport, e, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.#w.render(), this.#g.render();
  }
  draw(e = this.range, i = !1) {
    this.#w.draw(e, i);
  }
  drawGrid(e) {
    this.layerGrid.setPosition(this.core.scrollPos, 0), this.overlayGrid.draw("y");
  }
  resize(e) {
    const i = this, s = this.sibling();
    if (s === null)
      return { active: null, prev: null };
    const n = this.core.MainPane.rowMinH, r = this.element.clientHeight, a = s.element.clientHeight;
    let l, h, m, g;
    return T(e) && e > n || (g = r + a, l = this.core.MainPane.cursorPos[5], h = r - l, m = a + l), h < n || m < n || g !== h + m || (i.setDimensions({ w: void 0, h }), s.setDimensions({ w: void 0, h: m }), i.Divider.setPos()), i.element.style.userSelect = "none", s.element.style.userSelect = "none", { active: i, prev: s };
  }
  collapse(e) {
    const i = this.graph.viewport.scene.canvas.style, s = this.#u, n = this.#g.graph.viewport.scene.canvas.style;
    s.state ? (this.setDimensions({ w: void 0, h: e }), n.visibility = "visible", i.display = "block", s.state = !1) : (n.visibility = "hidden", i.display = "none", s.state = !0, s.height = this.element.clientHeight, s.rowsHeight = this.core.MainPane.rowsH, s.rowsCnt = this.core.ChartPanes.size, this.setDimensions({ W: void 0, h: ds }));
  }
  zoomRange() {
    this.draw(this.range, !0), this.emit("zoomDone");
  }
  time2XPos(e) {
    return this.time.xPos(e);
  }
  price2YPos(e) {
    return this.scale.yPos(e);
  }
  currPrevNext() {
    const e = this.element, i = e.previousElementSibling, s = e.nextElementSibling, n = e.parentNode, r = this.scale.element, a = r.previousElementSibling, l = r.nextElementSibling, h = r.parentNode, m = i !== null ? this.core.ChartPanes.get(i.id) : null, g = s !== null ? this.core.ChartPanes.get(s.id) : null;
    return {
      el: e,
      prevEl: i,
      nextEl: s,
      parentEl: n,
      scaleEl: r,
      prevScaleEl: a,
      nextScaleEl: l,
      parentScaleEl: h,
      prevPane: m,
      nextPane: g
    };
  }
  sibling(e) {
    e = ["prev", "next"].includes(e) ? e : "prev";
    let i = [...this.core.ChartPanes.keys()], s = i.indexOf(this.id);
    return e == "prev" ? --s : ++s, this.#s.ChartPanes.get(i[s]) || null;
  }
  configDialogue() {
    const e = this.#f;
    e.state.name === "closed" && e.open();
  }
}
class He extends G {
  static #e = 0;
  static get cnt() {
    return ++He.#e;
  }
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u;
  #m;
  #y;
  #g = [0, 0];
  #b;
  #w;
  #p = 2;
  #S = {};
  #C;
  #f;
  #T = !1;
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, void 0, r, a), this.#n = G.cnt, this.#a = a, this.#h = a.overlay, this.#m = this.core.TALib, this.#y = this.xAxis.range, this.eventsListen();
  }
  get id() {
    return this.#t || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#n}`;
  }
  set id(e) {
    this.#t = $e(e);
  }
  get name() {
    return this.#r;
  }
  set name(e) {
    this.#r = e;
  }
  get shortName() {
    return this.#i;
  }
  set shortName(e) {
    this.#i = e;
  }
  get chartPane() {
    return this.core.ChartPanes.get(this.chartPaneID);
  }
  get chartPaneID() {
    return this.#a.overlay.paneID;
  }
  get primaryPane() {
    return this.#s;
  }
  set primaryPane(e) {
    this.#s = e;
  }
  get scaleOverlay() {
    return this.#o;
  }
  set scaleOverlay(e) {
    this.#o = e;
  }
  get plots() {
    return this.#c;
  }
  set plots(e) {
    this.#c = e;
  }
  get params() {
    return this.#a;
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
    return this.#h;
  }
  get legendID() {
    return this.#C;
  }
  get indicator() {
    return this.#d;
  }
  get TALib() {
    return this.#m;
  }
  get range() {
    return this.core.range;
  }
  set setNewValue(e) {
    this.#b = e;
  }
  set setUpdateValue(e) {
    this.#w = e;
  }
  set precision(e) {
    this.#p = e;
  }
  get precision() {
    return this.#p;
  }
  set style(e) {
    this.#S = e;
  }
  get style() {
    return this.#S;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get isIndicator() {
    return !0;
  }
  get status() {
    return this.#f;
  }
  get drawOnUpdate() {
    return this.#T;
  }
  set drawOnUpdate(e) {
    e === !0 && (this.#T = !0);
  }
  set value(e) {
    const i = this.core.time.timeFrameMS;
    let s = Math.floor(new Date(e[fe.t]) / i) * i;
    e[fe.t] = s, this.#g[fe.t] !== e[fe.t] ? (this.#g[fe.t] = e[fe.t], this.#b(e)) : this.#w(e);
  }
  get value() {
    return this.#g;
  }
  destroy() {
    if (this.#f !== "destroyed") {
      if (!this.chartPane.indicatorDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "indicator.remove()" or "chart.removeIndicator()" instead.`);
        return;
      }
      super.destroy(), this.off(_e, this.onStreamUpdate), this.chartPane.graph.removeOverlay(this.id), this.chart.legend.remove(this.#C), this.core.state.removeIndicator(this.id), this.#f = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.emit(`${this.chartPaneID}_removeIndicator`, { id: this.id, paneID: this.chartPaneID });
  }
  visible(e) {
    return J(e) && (this.emit(`${this.chartPaneID}_visibleIndicator`, { id: this.id, paneID: this.chartPaneID, visible: e }), this.chartPane.indicators[this.id].layer.visible = e, this.draw()), this.chartPane.indicators[this.id].layer.visible;
  }
  settings(e) {
    return b(e) && (b(e?.config) && (this.params.overlay.settings = { ...this.params.overlay.settings, ...e.config }), b(e?.style) && (this.style = { ...this.style, ...e.style }), this.draw()), {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition
    };
  }
  eventsListen() {
    this.on(_e, this.onStreamUpdate, this);
  }
  on(e, i, s) {
    this.core.on(e, i, s);
  }
  off(e, i) {
    this.core.off(e, i);
  }
  emit(e, i) {
    this.core.emit(e, i);
  }
  onStreamNewValue(e) {
  }
  onStreamUpdate(e) {
    this.value = e;
  }
  onLegendAction(e) {
    const i = this.chart.legend.onMouseClick(e.currentTarget);
    switch (i.icon) {
      case "up":
        return;
      case "down":
        return;
      case "visible":
        this.onVisibility(i);
        return;
      case "notVisible":
        this.onVisibility(i);
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
  onVisibility(e) {
    this.visible(!this.visible()), e.parent.classList.toggle("visible"), e.parent.classList.toggle("notvisible");
  }
  invokeSettings(e) {
    if (_(e?.fn)) {
      let i = C.fn(this);
      if (e?.own)
        return i;
    } else if (_(this.core.config.callbacks?.indicatorSettings?.fn)) {
      let i = this.core.config.callbacks.indicatorSettings.fn(this);
      if (this.core.config.callbacks?.indicatorSettings?.own)
        return i;
    }
    this.core.log(`invokeSettings: ${this.id}`);
  }
  defineIndicator(e, i) {
    b(e) || (e = {}), this.definition.output = i.outputs;
    const s = { ...this.definition.input, ...e };
    delete s.style;
    for (let n of i.options)
      if (n.name in s)
        if (typeof s[n.name] !== n.type) {
          s[n.name] = n.defaultValue;
          continue;
        } else
          "range" in n && (s[n.name] = U(s[n.name], n.range.min, n.range.max));
      else
        n.name == "timePeriod" && (s.timePeriod = n.defaultValue);
    this.definition.input = s;
  }
  addLegend() {
    let e = {
      id: this.id,
      title: this.shortName,
      type: "indicator",
      parent: this,
      source: this.legendInputs.bind(this)
    };
    this.#C = this.chart.legend.add(e);
  }
  legendInputs(e = this.chart.cursorPos) {
    const i = [this.style.stroke];
    let n = this.Timeline.xPos2Index(e[0]) - (this.range.data.length - this.overlay.data.length), r = U(this.overlay.data.length - 1, 0, 1 / 0);
    return n = U(n, 0, r), { c: n, colours: i };
  }
  indicatorInput(e, i) {
    let s = {
      inReal: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    };
    do
      s.inReal.push(this.range.value(e)[fe.c]), s.open.push(this.range.value(e)[fe.o]), s.high.push(this.range.value(e)[fe.h]), s.low.push(this.range.value(e)[fe.l]), s.close.push(this.range.value(e)[fe.c]), s.volume.push(this.range.value(e)[fe.v]);
    while (e++ < i);
    return s;
  }
  regeneratePlots(e) {
    return e.map((i, s) => {
      const n = s + 1;
      return {
        key: `${this.shortName}${n}`,
        title: `${this.shortName}${n}: `,
        type: "line"
      };
    });
  }
  TALibParams() {
    let e = this.range.dataLength, i = this.definition.input.timePeriod, s = e - i, n = this.indicatorInput(s, e);
    return n.inReal.find((a) => a === null) ? !1 : { timePeriod: i, ...n };
  }
  calcIndicator(e, i = {}, s = this.range) {
    if (!E(e) || !(e in this.TALib) || !b(s) || !this.core.TALibReady)
      return !1;
    i.timePeriod = i.timePeriod || this.definition.input.timePeriod;
    let n, r, a = i.timePeriod, l = this.overlay.data;
    if (s instanceof ps)
      n = 0, r = s.dataLength - a + 1;
    else if ("indexStart" in s || "indexEnd" in s || "tsStart" in s || "tsEnd" in s)
      n = s.indexStart || this.Timeline.t2Index(s.tsStart || 0) || 0, r = s.indexEnd || this.Timeline.t2Index(s.tsEnd) || this.range.Length - 1;
    else
      return !1;
    if (l.length != 0)
      if (l.length + a !== s.dataLength)
        if (l[0][0] > s.value(a)[0])
          n = 0, r = s.getTimeIndex(l[0][0]) - a, r = U(r, a, s.dataLength - 1);
        else if (l[l.length - 1][0] < s.value(s.dataLength - 1)[0])
          n = l.length - 1 + a, n = U(n, 0, s.dataLength), r = s.dataLength - 1;
        else
          return !1;
      else
        return !1;
    if (r - n < a)
      return !1;
    let h = [], m, g, v, S;
    for (; n < r; ) {
      S = this.indicatorInput(n, n + a), i = { ...i, ...S }, v = this.TALib[e](i), g = [], m = 0;
      for (let A of this.definition.output)
        g[m++] = v[A.name][0];
      h.push([s.value(n + a - 1)[0], ...g]), n++;
    }
    return h;
  }
  calcIndicatorHistory() {
    const e = () => {
      const i = this.calcIndicator(this.libName, this.definition.input, this.range);
      if (i) {
        const s = this.overlay.data;
        new Set(i), new Set(s);
        let n, r, a = {};
        if (!M(s) || s.length == 0) {
          this.overlay.data = i;
          return;
        } else
          i[0][0] < s[0][0] ? (n = i, r = s) : i[i.length - 1][0] > s[s.length - 1][0] && (n = s, r = i);
        for (let l of n)
          a[l[0]] = l;
        for (let l of r)
          a[l[0]] = l;
        this.overlay.data = Object.values(a), this.#T = !0;
      }
    };
    this.core.TALibReady ? e() : this.core.talibAwait.push(e.bind(this));
  }
  calcIndicatorStream(e, i, s = this.range) {
    if (!this.core.TALibReady || !E(e) || !(e in this.TALib) || !(s instanceof ps) || s.dataLength < this.definition.input.timePeriod)
      return !1;
    let n = this.TALib[e](i), r = s.dataLength, a = s.value(r)[0], l = [], h = 0;
    for (let m of this.definition.output)
      l[h++] = n[m.name][0];
    return [a, ...l];
  }
  newValue(e) {
    let i = this.TALibParams();
    if (!i)
      return !1;
    let s = this.calcIndicatorStream(this.libName, i);
    if (!s)
      return !1;
    this.overlay.data.push(s), this.target.setPosition(this.core.scrollPos, 0), this.doDraw = !0, this.draw(this.range);
  }
  updateValue(e) {
    let i = this.overlay.data.length - 1, s = this.TALibParams();
    if (!s)
      return !1;
    let n = this.calcIndicatorStream(this.libName, s);
    if (!n)
      return !1;
    this.overlay.data[i] = n, this.target.setPosition(this.core.scrollPos, 0), this.doDraw = !0, this.draw(this.range);
  }
  plot(e, i, s) {
    super.plot(e, i, s);
  }
  draw() {
  }
  mustUpdate() {
    return this.#T ? this.#T : super.mustUpdate();
  }
  updated() {
    this.#T = !1, super.updated();
  }
}
class Vc extends G {
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.params.content = a?.content || "";
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw() {
    const e = this.config?.watermark, i = super.mustUpdate();
    if (!((this.watermark === e?.imgURL || this.watermark === e?.text) && !i.resize))
      if (e?.imgURL)
        this.watermark = e.imgURL, R.isImage(e?.imgURL, this.renderImage.bind(this)), super.updated();
      else if (E(e?.text)) {
        this.watermark = e.text, this.scene.clear();
        const s = this.scene.context;
        s.save(), this.renderText(e.text), s.restore(), super.updated();
      } else
        return;
  }
  renderText(e) {
    const i = Math.floor(this.core.height / je), s = this.core.config?.watermark?.fontSize, n = this.core.config?.watermark?.fontWeight, r = this.core.config?.watermark?.fontFamily, a = this.core.config?.watermark?.textColour, l = {
      fontSize: (s || this.theme.watermark.FONTSIZE) * i,
      fontWeight: n || this.theme.watermark.FONTWEIGHT,
      fontFamily: r || this.theme.watermark.FONTFAMILY,
      txtCol: a || this.theme.watermark.COLOUR
    }, h = this.scene.context;
    h.font = xt(l?.fontSize, l?.fontWeight, l?.fontFamily), h.textBaseline = "top", h.fillStyle = l.txtCol;
    const m = $i(l), g = Hi(h, e, l), v = (this.scene.width - g) / 2, S = (this.core.Chart.height - m) / 2;
    h.fillText(e, v, S);
  }
  renderImage(e) {
    if (!e)
      return;
    const i = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT, s = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH, n = (this.scene.width - s) / 2, r = (this.scene.height - i) / 2;
    this.scene.clear();
    const a = this.scene.context;
    a.save(), Kr(a, e, n, r, i, s), a.restore();
  }
}
const rs = {
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        chart_paneMaximize: {
          target: "chart_paneMaximize",
          action(o) {
          }
        },
        chart_pan: {
          target: "chart_pan",
          action(o) {
          }
        },
        chart_scrollTo: {
          target: "chart_scrollTo",
          action(o) {
          }
        },
        setRange: {
          target: "setRange",
          action(o) {
          }
        },
        addIndicator: {
          target: "addIndicator",
          action(o) {
          }
        },
        divider_pointerdrag: {
          target: "divider_pointerdrag",
          action(o) {
            this.context.currCursor = this.context.origin.cursor, this.context.origin.cursor = "row-resize";
          }
        },
        global_resize: {
          target: "global_resize",
          action(o) {
          }
        }
      }
    },
    chart_paneMaximize: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        always: {
          target: "idle",
          action(o) {
            this.context.maximize = "some pane pointer";
          }
        }
      }
    },
    chart_pan: {
      onEnter(o) {
        this.context.origin.cursor = "grab";
      },
      onExit(o) {
      },
      on: {
        chart_pan: {
          target: "chart_pan",
          action(o) {
            this.context.origin.updateRange(o), this.context.origin.cursor = "grab";
          }
        },
        chart_panDone: {
          target: "idle",
          action(o) {
            this.context.origin.updateRange(o), this.context.origin.cursor = "default";
          }
        }
      }
    },
    setRange: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        always: {
          target: "idle",
          condition: "zoomDone",
          action(o) {
            this.context.origin.zoomRange(o);
          }
        }
      }
    },
    chart_scrollTo: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        always: {
          target: "idle",
          action(o) {
            this.context.origin.updateRange(o);
          }
        }
      }
    },
    addIndicator: {
      onEnter(o) {
        this.context.origin.addIndicator(o);
      },
      onExit(o) {
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action(o) {
          }
        }
      }
    },
    divider_pointerdrag: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        divider_pointerdrag: {
          target: "divider_pointerdrag",
          action(o) {
          }
        },
        divider_pointerdragend: {
          target: "idle",
          action(o) {
            this.context.origin.cursor = this.context.currCursor;
          }
        }
      }
    },
    global_resize: {
      onEnter(o) {
        this.context.origin.setDimensions();
      },
      onExit(o) {
      },
      on: {
        always: {
          target: "idle",
          condition: "resizeDone",
          action(o) {
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
      let o = this.context.pair.active, e = this.context.pair.prev;
      b(o) && o.element.style.removeProperty("user-select"), b(e) && e.element.style.removeProperty("user-select");
    }
  }
}, zc = [
  ["watermark", { class: Vc, fixed: !0, required: !0, params: { content: null } }],
  ["grid", { class: Oi, fixed: !1, required: !0, params: { axes: "x" } }]
], Wc = ["candles", "trades", "events"];
class to {
  #e = "MainPane";
  #t = "Main";
  #n;
  #r;
  #i;
  #s;
  #l = !1;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u;
  #m = {};
  #y;
  #g;
  #b;
  #w;
  #p;
  #S;
  #C;
  #f = new be();
  #T;
  #x;
  #I;
  #M = [];
  #L = {
    instance: null,
    rowsH: 0,
    panes: {}
  };
  #E = Sn;
  #A = En;
  #P = {};
  #v = [0, 0];
  #R = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #k;
  #D;
  #H;
  #O;
  constructor(e, i) {
    this.#i = e, this.#n = i, this.#r = e, this.#c = this.#i.elMain, this.#o = this.#i.elYAxis, this.init(i);
  }
  log(e) {
    this.#i.log(e);
  }
  info(e) {
    this.#i.info(e);
  }
  warn(e) {
    this.#i.warn(e);
  }
  error(e) {
    this.#i.error(e);
  }
  get id() {
    return `${this.#i.id}-${this.#e}`;
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get core() {
    return this.#i;
  }
  get chart() {
    return this.#T;
  }
  get chartPanes() {
    return this.#f;
  }
  get chartPaneMaximized() {
    return this.#L;
  }
  get chartDeleteList() {
    return this.#M;
  }
  get time() {
    return this.#x;
  }
  get options() {
    return this.#n;
  }
  get element() {
    return this.#c;
  }
  get elRows() {
    return this.#c.rows;
  }
  get elPrimary() {
    return this.#c.rows.primary;
  }
  get elSecondary() {
    return this.#c.rows.secondary;
  }
  get elPanes() {
    return this.#c.rows.chartPanes;
  }
  get elPaneSlot() {
    return this.#c.rows.chartPaneSlot;
  }
  get width() {
    return this.#c.getBoundingClientRect().width;
  }
  get height() {
    return this.#c.getBoundingClientRect().height;
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
  set rowMinH(e) {
    T(e) && (this.#A = Math.abs(e));
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#c);
  }
  get range() {
    return this.#i.range;
  }
  set cursor(e) {
    this.element.style.cursor = e;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#v;
  }
  get candleW() {
    return this.#x.candleW;
  }
  get theme() {
    return this.#i.theme;
  }
  get config() {
    return this.#i.config;
  }
  get buffer() {
    return this.#k;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.#i.scrollPos;
  }
  set stateMachine(e) {
    this.#s = new ze(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  get renderLoop() {
    return Cc;
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
      elTime: this.#h,
      elScale: this.#u
    };
  }
  init(e) {
    if (this.#i, this.#D = this.#i.indicatorClasses, this.#a = this.#c.rows, this.#h = this.#c.time, this.#y = this.#c.rows.grid, this.#b = this.#c.viewport, this.#u = this.#i.elBody.scale, e.name = "Chart", e.shortName = "Chart", e.parent = this, e.chartData = this.#i.chartData, e.primaryPane = this.#i.primaryPane, e.secondaryPane = this.#i.secondaryPane, e.rangeLimit = this.#i.rangeLimit, e.settings = this.#i.settings, e.elements = {
      ...e.elements,
      ...this.elements
    }, this.#i.theme?.time?.navigation === !1) {
      const i = { height: Ai };
      this.#i.theme.time = { ...this.#i.theme?.time, ...i }, this.#a.style.height = `calc(100% - ${Ai}px)`;
    }
    this.#x = new xc(this.#i, e), this.registerChartViews(e), this.#k = T(this.config.buffer) ? this.config.buffer : ki, this.#A = T(this.config.rowMinH) ? this.config.rowMinH : En, this.#E = T(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : Sn, this.rowsOldH = this.rowsH, this.log(`${this.#e} instantiated`);
  }
  start() {
    let e = 0;
    this.#c.start(this.theme), this.#x.start(), this.#f.forEach((i, s) => {
      i.start(e++), e === 1 && i.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.createGraph(), this.draw(this.range, !0), this.renderLoop.init({
      graphs: [this.#p],
      range: this.range
    }), this.renderLoop.start(), this.renderLoop.queueFrame(this.range, [this.#p], !1), this.eventsListen(), rs.id = this.id, rs.context = this, this.stateMachine = rs, this.stateMachine.start();
  }
  destroy() {
    this.#l = !0, this.stateMachine.destroy(), this.#x.destroy(), this.#f.forEach((e, i) => {
      this.#M[i] = !0, e.destroy(), delete this.#M[i];
    }), this.#p.destroy(), this.#O.destroy(), this.off(Vt, this.onFirstStreamValue), this.off(zt, this.onNewStreamValue), this.off("setRange", this.draw), this.off("scrollUpdate", this.draw), this.off("chart_render", this.draw), this.off("destroyChartView", this.removeChartPane);
  }
  reset() {
    for (let e in this.#i.Indicators)
      for (let i in this.#i.Indicators[e])
        this.#i.Indicators[e][i].instance.remove();
  }
  restart() {
    this.chart.scale.restart(), this.validateIndicators();
    for (let [e, i] of this.views)
      for (let s of i)
        e === "primary" && s.type === "candles" || this.addIndicator(s.type, s.name, { data: s.data, settings: s.settings });
    this.draw(this.range, !0);
  }
  eventsListen() {
    this.#a.tabIndex = 0, this.#a.focus(), this.#O = new Le(this.#a, { disableContextMenu: !1 }), this.#O.on("keydown", this.onChartKeyDown.bind(this)), this.#O.on("keyup", this.onChartKeyUp.bind(this)), this.#O.on("wheel", this.onMouseWheel.bind(this)), this.#O.on("pointerenter", this.onMouseEnter.bind(this)), this.#O.on("pointerout", this.onMouseOut.bind(this)), this.#O.on("pointerup", this.onChartDragDone.bind(this)), this.#O.on("pointermove", this.onMouseMove.bind(this)), this.on(Vt, this.onFirstStreamValue, this), this.on(zt, this.onNewStreamValue, this), this.on("setRange", this.draw, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
  }
  on(e, i, s) {
    this.#i.on(e, i, s);
  }
  off(e, i) {
    this.#i.off(e, i);
  }
  emit(e, i) {
    this.#i.emit(e, i);
  }
  onMouseWheel(e) {
    const i = Math.sign(e.wheeldelta) * -1;
    if (e.domEvent.preventDefault(), this.#i.pointerButtons[0]) {
      e.dragstart.x = this.#v[0], e.dragstart.y = this.#v[1], e.position.x = this.#v[0] + i, e.position.y = this.#v[1], this.onChartDrag(e);
      return;
    }
    const s = this.range, n = s.indexStart - Math.floor(i * yn * s.Length), r = s.indexEnd + Math.ceil(i * yn * s.Length);
    this.#i.setRange(n, r), this.draw(this.range, !0);
  }
  onMouseMove(e) {
    const i = this.#P;
    i.d2x = i?.d1x || null, i.d2y = i?.d1y || null, i.d1x = e.movement.x, i.d1y = e.movement.y, i.dx = Math.floor((i.d1x + i.d2x) / 2), i.dy = Math.floor((i.d1y + i.d2y) / 2), i.ts2 = i?.ts1 || null, i.ts1 = Date.now(), this.#v = [
      e.position.x,
      e.position.y,
      e.dragstart.x,
      e.dragstart.y,
      i.dx,
      i.dy,
      i.ts1,
      i.ts1 - i.ts2
    ], this.core.Timeline.showCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !0;
    for (let [s, n] of this.chartPanes)
      n.graph.overlays.list.get("cursor").layer.visible = !0;
    this.emit("main_mousemove", this.#v);
  }
  onMouseEnter(e) {
    this.core.Timeline.showCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !0, this.core.Chart.graph.render();
    for (let [i, s] of this.chartPanes)
      s.graph.overlays.list.get("cursor").layer.visible = !0, s.graph.render();
  }
  onMouseOut(e) {
    this.onPointerActive(!1), this.core.Timeline.hideCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !1, this.core.Chart.graph.render();
    for (let [i, s] of this.chartPanes)
      s.graph.overlays.list.get("cursor").layer.visible = !1, s.graph.render();
    this.draw();
  }
  onChartDrag(e) {
    const i = this.#R;
    i.active ? (i.delta = [
      e.position.x - i.prev[0],
      e.position.y - i.prev[1]
    ], i.prev = [
      e.position.x,
      e.position.y
    ]) : (i.active = !0, i.start = [e.dragstart.x, e.dragstart.y], i.prev = i.start, i.delta = [0, 0]), this.#v = [
      e.position.x,
      e.position.y,
      ...i.start,
      ...i.delta
    ], this.emit("chart_pan", this.#v);
  }
  onChartDragDone(e) {
    const i = this.#R;
    i.active = !1, i.delta = [0, 0], this.#v = [
      ...i.prev,
      ...i.start,
      ...i.delta
    ], this.emit("chart_panDone", this.#v);
  }
  onChartKeyDown(e) {
    let i = this.candleW > 1 ? this.candleW : 1;
    switch (e.key) {
      case "ArrowLeft":
        this.emit("chart_pan", [0, null, i, null, i * -1, null]);
        break;
      case "ArrowRight":
        this.emit("chart_pan", [i, null, 0, null, i, null]);
        break;
      case "ArrowUp":
        e.wheeldelta = -1, e.domEvent = e.srcEvent, this.onMouseWheel(e);
        break;
      case "ArrowDown":
        e.wheeldelta = 1, e.domEvent = e.srcEvent, this.onMouseWheel(e);
        break;
    }
  }
  onChartKeyUp(e) {
    let i = this.candleW > 1 ? this.candleW : 1;
    switch (e.key) {
      case "ArrowLeft":
        this.emit("chart_panDone", [0, null, i, null, i * -1, null]);
        break;
      case "ArrowRight":
        this.emit("chart_panDone", [i, null, 0, null, i, null]);
        break;
    }
  }
  onFirstStreamValue(e) {
    this.chart.scale.xAxis.calcXAxisGrads(this.range), this.draw(this.range, !0);
  }
  onNewStreamValue(e) {
  }
  onPointerActive(e) {
    e && (e.cursorActive = !0, e.scale.layerCursor.visible = !0), e !== this.chart && (this.chart.cursorActive = !1, this.chart.scale.layerCursor.visible = !1, this.chart.scale.layerCursor.erase()), this.#f.forEach((i, s) => {
      e !== i && (i.cursorActive = !1, i.scale.layerCursor.visible = !1, i.scale.layerCursor.erase());
    });
  }
  setDimensions() {
    this.#a.previousDimensions();
    let e = this.#a.heightDeltaR, i = Math.round(this.chartH * e), s = this.rowsW, n = this.rowsH, r = Math.round(s * ((100 + this.#k) * 0.01)), a = {
      resizeH: e,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.#i.scrollPos = -1, this.#x.setDimensions({ w: s }), this.#p.setSize(s, n, r), this.#f.size == 1 && i != this.#a.height ? this.#T.setDimensions({ w: s, h: this.#a.height }) : this.#f.forEach((l, h) => {
      i = Math.round(l.viewport.height * e), l.setDimensions({ w: s, h: i });
    }), this.rowsOldH = this.rowsH, this.emit("rowsResize", a), this.draw(void 0, !0);
  }
  getBufferPx() {
    let e = Math.round(this.width * this.buffer / 100), i = e % this.candleW;
    return e - i;
  }
  registerChartViews(e) {
    this.#a.previousDimensions();
    const i = this.validateIndicators();
    let s = i[0];
    for (let n of i)
      n?.primary === !0 ? s = n : n.primary = !1;
    s.primary = !0, e.rowY = 0;
    for (let [n, r] of this.views)
      e.type = n, e.view = r, this.addChartPane(e);
  }
  chartPanesState() {
    const e = {
      list: [...this.#f.values()],
      collapsed: [],
      expanded: [],
      maximized: this.#L.instance
    };
    for (let i of e.list)
      i.collapsed.state ? e.collapsed.push(i) : e.expanded.push(i);
    return e;
  }
  addChartPane(e) {
    const { expanded: i } = this.chartPanesState(), s = this.calcChartPaneHeights(), n = s.new;
    let r;
    for (r in s)
      if (this.#f.has(r)) {
        let m = this.#f.get(r);
        i.indexOf(m) > -1 && m.setDimensions({ w: this.rowsW, h: s[r] });
      }
    let a;
    this.#a.insertAdjacentHTML(
      "beforeend",
      this.#c.rowNode(e.type, this.#i)
    ), a = this.#a.chartPaneSlot.assignedElements().slice(-1)[0], a.style.height = `${n}px`, a.style.width = "100%";
    let l;
    this.#o.insertAdjacentHTML(
      "beforeend",
      this.scaleNode(e.type)
    ), l = this.#o.chartPaneSlot.assignedElements().slice(-1)[0], l.style.height = `${n}px`, l.style.width = "100%", e.elements.elTarget = a, e.elements.elScale = l;
    let h;
    return e.type == "primary" ? (h = new nt(this.#i, e), this.#T = h) : (e.name = e.view[0].name || "Secondary", e.shortName = e.view[0].type || "Secondary", h = new nt(this.#i, e)), this.setPaneDividers(), this.#f.set(h.id, h), this.emit("addChartView", h), h;
  }
  removeChartPane(e) {
    if (!E(e) || !this.#f.has(e))
      return !1;
    const i = this.#f.get(e);
    if (i.isPrimary)
      return this.#i.error(`Cannot remove primary chart pane! ${e}`), !1;
    this.#M[e] = !0;
    const { expanded: s } = this.chartPanesState();
    let n = s.indexOf(i);
    n > -1 && s.splice(n, 1);
    let r = i.viewport.height, a = Math.floor(r / s.length), l = r % a;
    if (i.status !== "destroyed" && i.destroy(), this.#f.delete(e), delete this.#M[e], this.#f.size === 1) {
      let h = this.#f.values().next().value;
      h.collapsed && (h.collapsed.state = !1), h.setDimensions({ w: void 0, h: this.rowsH });
    } else
      for (let h of s)
        r = h.viewport.height, h.setDimensions({ w: void 0, h: r + a + l }), l = 0;
    return this.setPaneDividers(), this.draw(this.range, !0), !0;
  }
  validateIndicators() {
    const e = [];
    for (let [i, s] of this.views) {
      if (i === "primary" && e.push(s), s.length === 0 && i !== "primary") {
        this.views.delete(i);
        continue;
      }
      for (const [n, r] of s.entries())
        b(r) && (r.type in this.core.indicatorClasses || Wc.includes(r.type)) || (this.#i.log(`indicator ${s.type} not added: not supported.`), s.splice(n, 1));
    }
    return e;
  }
  addIndicator(e, i = e, s = {}) {
    if (!E(e) && !(e in this.#D) && !E(i) && !b(s))
      return !1;
    this.log(`Adding the ${i} : ${e} indicator`), this.emit("pane_refresh", this), M(s?.data) || (s.data = []), b(s?.settings) || (s.settings = {});
    let n;
    if (this.#D[e].ind.primaryPane) {
      const r = {
        type: e,
        name: i,
        ...s
      };
      n = this.#T.addIndicator(r);
    } else {
      this.core.indicatorClasses[e].ind.primaryPane === "both" && J(e.primaryPane) && e.primaryPane, M(s.view) || (s.view = [{ name: i, type: e, ...s }]);
      for (let a = 0; a < s.view.length; a++)
        (!b(s.view[a]) || !Pr(["name", "type"], Object.keys(s.view[a]))) && s.view.splice(a, 1);
      if (s.view.length == 0)
        return !1;
      s.parent = this, s.title = i, s.elements = { ...this.elements }, n = this.addChartPane(s), n.start();
    }
    return this.#i.refresh(), this.emit("addIndicatorDone", n), this.#i.log("Added indicator:", n.id), n;
  }
  getIndicators() {
    const e = {};
    return this.#f.forEach(
      (i, s) => {
        e[s] = i.indicators;
      }
    ), e;
  }
  getIndicator(e) {
    if (!E(e))
      return !1;
    for (const i of this.#f.values())
      if (e in i.indicators)
        return i.indicators[e].instance;
  }
  removeIndicator(e) {
    if (this.emit("pane_refresh", this), E(e)) {
      for (const i of this.#f.values())
        if (e in i.indicators)
          return i.indicators[e].instance.remove(), !0;
    } else
      return e instanceof He ? (e.remove(), !0) : !1;
  }
  indicatorSettings(e, i) {
    if (E(e)) {
      for (const s of this.#f.values())
        if (e in s.indicators)
          return s.indicators[e].instance.settings(i);
    } else
      return e instanceof He ? e.settings(i) : !1;
  }
  calcChartPaneHeights() {
    const { collapsed: e, expanded: i } = this.chartPanesState(), s = this.#f.size + 1, n = this.#E * (s - 1), r = n / Math.log10(n * 2) / 100;
    Math.round(this.rowsH * r);
    const a = {};
    if (s === 1)
      a.new = this.rowsH;
    else if (s === 2 || i.length === 1) {
      let l;
      try {
        l = i[0].viewport.height;
      } catch {
        l = this.rowsH;
      }
      const h = Math.round(l * this.#E / 100);
      a[i[0].id] = l - h, a.new = h;
    } else if (i.length === 2) {
      const l = i[0].viewport.height, h = i[1].viewport.height, m = l + h, g = Math.round(m * this.#E / 100), v = m / (m + g);
      a[i[0].id] = Math.floor(l * v), a[i[1].id] = Math.floor(h * v), a.new = Math.floor(g * v), a.new += m - (a[i[0].id] + a[i[1].id] + a.new);
    } else if (i.length >= 3) {
      let l = this.rowsH, h = 0, m;
      for (let g of e)
        l -= g.viewport.height;
      a.new = Math.floor(l / (i.length + 1)), l / (l + a.new), m = l - a.new;
      for (let g of i)
        a[g.id] = m * (g.viewport.height / l), h += a[g.id];
      a.new += l - h;
    }
    return a;
  }
  scaleNode(e) {
    const i = Ih + " width: 100%;";
    return `
    <div slot="chartpane" class="viewport scale ${e}" style="$${i}"></div>
  `;
  }
  createGraph() {
    let e = ce(zc);
    this.#p = new wt(this, this.#b, e);
  }
  draw(e = this.range, i = !1) {
    this.time.xAxis.doCalcXAxisGrads(e);
    const s = [
      this.#p,
      this.#x
    ];
    this.#f.forEach((n, r) => {
      s.push(n);
    }), this.renderLoop.queueFrame(
      this.range,
      s,
      i
    );
  }
  updateRange(e) {
    this.#i.updateRange(e);
  }
  zoomRange() {
    this.draw(this.range, !0);
  }
  paneMaximize(e) {
    if (!(e instanceof nt))
      return !1;
    const i = this.#L, s = e.legend.list.chart.el.querySelector(".controls");
    let n;
    if (s.classList.toggle("maximized"), s.classList.toggle("restored"), e === i.instance)
      this.panesRestore(), i.instance = null, i.panes = {}, e.collapsed.state && (e.graph.viewport.scene.canvas.style.display = "none", e.scale.graph.viewport.scene.canvas.style.visibility = "hidden");
    else {
      this.panesRestore(), i.instance = e, i.rowsH = this.rowsH;
      for (let [r, a] of this.#f.entries())
        i.panes[r] = a.element.clientHeight, n = a.element.style, e === a ? (n.display = "block", a.setDimensions({ w: void 0, h: this.rowsH }), a.graph.viewport.scene.canvas.style.display = "block", a.scale.graph.viewport.scene.canvas.style.visibility = "visible") : (n.display = "none", a.scale.element.style.display = "none");
      this.hidePaneDividers();
    }
    return this.emit("pane_refresh", this), !0;
  }
  panesRestore() {
    const e = this.#L;
    let i = 0;
    this.emit("pane_refresh", this), this.dimensions.height == e.height;
    for (let [s, n] of this.#f.entries())
      n.element.style.display = "block", n.scale.element.style.display = "block", s in e.panes && i++ > 0 && n.Divider.show(), n.setDimensions({ w: void 0, h: e.panes[s] });
  }
  paneCollapse(e) {
    if (!(e instanceof nt))
      return !1;
    this.emit("pane_refresh", this);
    const i = e.legend.list.chart.el.querySelector(".controls"), s = e.collapsed;
    let n = e.element.clientHeight, r, a, l;
    const { list: h, collapsed: m, expanded: g } = this.chartPanesState();
    if (r = m.indexOf(e), r > -1 && m.splice(r, 1), r = g.indexOf(e), r > -1 && g.splice(r, 1), e.collapsed.state) {
      i.classList.remove("collapsed"), i.classList.add("expanded"), s.rowsCnt !== h.length ? n = s.height * (s.rowsCnt / h.length) : s.rowsHeight !== this.rowsH ? n = s.height * (s.rowsHeight / this.rowsH) : n = s.height, a = (n - ds) / g.length;
      for (let v of g)
        l = v.element.clientHeight - a, v.setDimensions({ w: void 0, h: l });
      e.collapse(n);
    } else {
      if (i.classList.add("collapsed"), i.classList.remove("expanded"), h.length < 2 || g.length < 1)
        return !1;
      n = (e.element.clientHeight - ds) / g.length;
      for (let v of g)
        l = v.element.clientHeight + n, v.setDimensions({ w: void 0, h: l });
      e.collapse();
    }
    return this.setPaneDividers(), !0;
  }
  setPaneDividers() {
    const { list: e } = this.chartPanesState();
    let i = 0;
    for (let s of e)
      s.Divider instanceof le && i++ > 0 && (s.Divider.setWidth(), s.Divider.setPos(), s.Divider.show());
  }
  hidePaneDividers() {
    const { list: e } = this.chartPanesState();
    for (let i of e)
      i.Divider instanceof le && i.Divider.hide();
  }
}
class Ci {
  static passive = new Ci("passive");
  static hover = new Ci("hover");
  static active = new Ci("active");
  constructor(e) {
    this.name = e;
  }
}
class Ae extends G {
  static #e = 0;
  static #t = {};
  static create(e, i) {
    const s = ++Ae.#e;
    i.cnt = s, i.modID = `${i.toolID}_${s}`, i.toolID = i.modID, i.target = e;
    const n = new i.tool(i);
    return Ae.#t[s] = n, e.chartToolAdd(n), n;
  }
  static destroy(e) {
    if (e instanceof Ae) {
      const i = e.inCnt;
      delete Ae.#t[i];
    }
  }
  #n;
  #r = null;
  #i = "";
  #s = "";
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u;
  #m;
  #y;
  #g;
  #b = [0, 0];
  #w = !1;
  #p;
  #S = { TL: [0, 0], BR: [0, 0] };
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), this.#o = config, this.#r = config.cnt, this.#n = this.#o.ID || ee("TX_Tool_"), this.#i = config.name, this.#c = config.core, this.#d = config.elements.elChart, this.#a = { ...config.parent }, this.#g = config.target, this.#g.addTool(this), this.#m = this.#y.viewport, this.#u = this.#m.scene.canvas, this.#p = config.pos;
  }
  set id(e) {
    this.#n = $e(e);
  }
  get id() {
    return this.#n ? `${this.#n}` : `${this.#c.id}-${this.#s}_${this.#r}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get inCnt() {
    return this.#r;
  }
  get name() {
    return this.#i;
  }
  get shortName() {
    return this.#s;
  }
  get core() {
    return this.#c;
  }
  get stateMachine() {
    return this.#c.stateMachine;
  }
  get state() {
    return this.#c.getState();
  }
  get data() {
    return this.#c.chartData;
  }
  get range() {
    return this.#c.range;
  }
  get target() {
    return this.#g;
  }
  set layerTool(e) {
    this.#y = e;
  }
  get layerTool() {
    return this.#y;
  }
  get elViewport() {
    return this.#m;
  }
  get cursorPos() {
    return this.#b;
  }
  get cursorActive() {
    return this.#w;
  }
  get cursorClick() {
    return this.#p;
  }
  get candleW() {
    return this.#c.Timeline.candleW;
  }
  get theme() {
    return this.#c.theme;
  }
  get config() {
    return this.#c.config;
  }
  get scrollPos() {
    return this.#c.scrollPos;
  }
  get bufferPx() {
    return this.#c.bufferPx;
  }
  get visible() {
    return this.isVisible();
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  end() {
    this.stop();
  }
  stop() {
    this.#h.off("mousemove", this.onPointerMove);
  }
  eventsListen() {
    this.#h = new Le(this.#u, { disableContextMenu: !1 }), this.#h.on("pointermove", this.onPointerMove.bind(this));
  }
  on(e, i, s) {
    this.#c.on(e, i, s);
  }
  off(e, i) {
    this.#c.off(e, i);
  }
  emit(e, i) {
    this.#c.emit(e, i);
  }
  onPointerMove(e) {
    this.#b = [Math.round(e.position.x), Math.round(e.position.y)], this.emit("tool_pointermove", this.#b);
  }
  isVisible() {
  }
  draw() {
  }
}
class Fc extends Ae {
  constructor(e) {
    super(e);
  }
}
class ui extends Ae {
  #e = or.colour;
  #t = or.width;
  #n;
  constructor(e) {
    super(e);
  }
  set colour(e = this.#e) {
    this.#e = e;
  }
  get colour() {
    return this.#e;
  }
  set lineWidth(e) {
    this.#t = T(e) ? e : this.#t;
  }
  get lineWidth() {
    return this.#t;
  }
  set stateMachine(e) {
    this.#n = new ze(e, this);
  }
  get stateMachine() {
    return this.#n;
  }
  start() {
    this.eventsListen();
  }
  destroy() {
    this.stateMachine.destroy();
  }
  draw() {
    let [e, i] = this.cursorClick;
    this.layerTool.scene.clear();
    const n = this.layerTool.scene.context;
    n.save(), n.lineWidth = this.lineWidth, n.strokeStyle = this.colour, n.beginPath(), n.moveTo(e, i), n.lineTo(300, 150), n.stroke(), n.closePath(), n.restore(), this.elViewport.render();
  }
}
class Gc extends Ae {
  constructor(e) {
    super(e);
  }
}
class Yc extends Ae {
  constructor(e) {
    super(e);
  }
}
class qc extends Ae {
  constructor(e) {
    super(e);
  }
}
const Xc = [
  {
    id: "cursor",
    name: "Cursor",
    icon: Jl,
    event: "tool_activated"
  },
  {
    id: "line",
    name: "Line",
    icon: tt,
    event: "tool_activated",
    class: ui,
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: tt,
        event: "tool_activated",
        class: ui
      },
      {
        id: "hRay",
        name: "Horizontal Ray",
        icon: tt,
        event: "tool_activated",
        class: ui
      },
      {
        id: "vRay",
        name: "Vertical Ray",
        icon: tt,
        event: "tool_activated",
        class: ui
      }
    ]
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: eh,
    event: "tool_activated",
    class: Fc,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: tt
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: ih,
    event: "tool_activated",
    class: Yc,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: tt
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: sh,
    event: "tool_activated",
    class: qc,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: tt
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: th,
    event: "tool_activated",
    class: Gc
  },
  {
    id: "delete",
    name: "Delete",
    icon: Ql,
    event: "tool_activated",
    class: void 0
  }
], or = {
  colour: "#8888AACC",
  width: 1
}, os = {
  id: "template",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(o) {
        console.log("idle: onEnter");
      },
      onExit(o) {
        console.log("idle: onExit");
      },
      on: {
        tool_activated: {
          target: "tool_activated",
          action(o) {
            this.context.origin.onToolActivated(o);
          }
        },
        tool_selected: {
          target: "tool_selected",
          action(o) {
            this.context.origin.onToolSelected(o);
          }
        },
        tool_deselected: {
          target: "tool_deselected",
          action(o) {
            this.context.origin.onToolDeselected(o);
          }
        },
        tool_deleted: {
          target: "tool_deleted",
          action(o) {
            this.context.origin.onToolDeleted(o);
          }
        }
      }
    },
    tool_activated: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        tool_selected: {
          target: "tool_addToTarget",
          action(o) {
            this.context.origin.onToolTargetSelected(o);
          }
        }
      }
    },
    tool_selected: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {}
    },
    tool_deselected: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        always: {
          target: "idle",
          condition: "toolTarget",
          action(o) {
          }
        }
      }
    },
    tool_deleted: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        always: {
          target: "idle",
          condition: "toolTarget",
          action(o) {
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
class io {
  #e;
  #t = "Toolbar";
  #n = "tools";
  #r;
  #i;
  #s;
  #l;
  #o;
  #c = Ae;
  #a;
  #h = {};
  #d = void 0;
  #u;
  #m = { click: [], pointerover: [] };
  #y = [];
  constructor(e, i) {
    this.#r = e, this.#i = i, this.#l = e.elTools, this.#a = Xc || e.config.tools, this.#o = e.WidgetsG, this.init();
  }
  log(e) {
    this.#r.log(e);
  }
  info(e) {
    this.#r.info(e);
  }
  warn(e) {
    this.#r.warn(e);
  }
  error(e) {
    this.#r.error(e);
  }
  set id(e) {
    this.#e = $e(e);
  }
  get id() {
    return this.#e ? `${this.#e}` : `${this.#r.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#n;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#i;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#l);
  }
  set stateMachine(e) {
    this.#s = new ze(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  init() {
    this.mount(this.#l), this.log(`${this.#t} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), os.id = this.id, os.context = this, this.stateMachine = os, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy();
    const e = this.#l.querySelectorAll(".icon-wrapper");
    for (let i of e)
      for (let s of this.#a)
        s.id === id && i.removeEventListener("click", this.#m[id].click), i.removeEventListener("pointerover", this.#m[id].pointerover), i.removeEventListener("pointerout", this.#m[id].pointerout);
    this.off("tool_selected", this.onToolSelect), this.off("tool_deselected", this.onToolDeselect);
  }
  eventsListen() {
    this.on("tool_selected", this.onToolSelect, this), this.on("tool_deselected", this.onToolDeselect, this);
  }
  on(e, i, s) {
    this.#r.on(e, i, s);
  }
  off(e, i) {
    this.#r.off(e, i);
  }
  emit(e, i) {
    this.#r.emit(e, i);
  }
  onResized() {
    for (let e of this.#y)
      e.position();
  }
  onIconClick(e) {
    e.currentTarget.dataset.event;
    let i = e.currentTarget.dataset.menu || !1, s = {
      target: e.currentTarget.id,
      menu: i,
      evt: e.currentTarget.dataset.event,
      tool: e.currentTarget.dataset.tool
    };
    i ? this.emit("menu_open", s) : this.emit("menuItem_selected", s);
  }
  onIconOut(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = Xe.COLOUR_ICON;
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = Xe.COLOUR_ICONHOVER;
  }
  onToolTargetSelected(e) {
    console.log("tool_targetSelected:", e.target), this.#u = e.target;
  }
  onToolActivated(e) {
    console.log("Tool activated:", e), this.#d = e;
  }
  onToolSelect(e) {
    console.log("Tool selected:", e);
  }
  onToolDeselect(e) {
    console.log("Tool deselected:", e);
  }
  mount(e) {
    e.innerHTML = this.#l.defaultNode(this.#a);
  }
  initAllTools() {
    const e = this.#l.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      let s = i.id, n = i.querySelector("svg");
      n.style.fill = Xe.COLOUR_ICON, n.style.width = "90%";
      for (let r of this.#a)
        if (r.id === s)
          if (this.#m[s] = {}, this.#m[s].click = this.onIconClick.bind(this), this.#m[s].pointerover = this.onIconOver.bind(this), this.#m[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#m[s].click), i.addEventListener("pointerover", this.#m[s].pointerover), i.addEventListener("pointerout", this.#m[s].pointerout), r?.sub) {
            let a = {
              content: r.sub,
              primary: i
            }, l = this.#o.insert("Menu", a);
            i.dataset.menu = l.id, l.start(), this.#y.push(l);
            for (let h of r.sub)
              this.#h[h.id] = h.class;
          } else
            this.#h[r.id] = r.class;
    }
  }
  addTool(e = this.#d, i = this.#u) {
    let s = {
      name: e,
      tool: this.#h[e],
      pos: i.cursorClick
    }, n = this.#c.create(i, s);
    return n.start(), console.log(n), n;
  }
  addNewTool(e, i) {
    let s = this.addTool(e, i);
    this.activeTool = s, this.emit("tool_active", s), this.emit(`tool_${s.id}_active`, s);
  }
  addAllTools() {
  }
}
const ar = 20, Kc = 20, jc = new $r(B.COLOUR_BORDER), Ts = document.createElement("template");
Ts.innerHTML = `
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
    background-color: var(--txc-time-handle-color, ${jc.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${ar}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${B.COLOUR_ICON});
    width: ${ar}px;
    height: ${Kc}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${B.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${fh}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${gh}</span>
</div>
`;
class Zc extends ae {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  constructor() {
    super(Ts), this.#e = Ts;
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        document.getElementById("slider-bar"), this.#t = this.shadowRoot.querySelector(".scrollBarWidget"), this.#n = this.shadowRoot.querySelector(".rwdStart"), this.#r = this.shadowRoot.querySelector(".fwdEnd"), this.#i = this.shadowRoot.querySelector(".scrollBar"), this.#s = this.shadowRoot.querySelector(".viewport"), this.#l = this.shadowRoot.querySelector(".handle"), this.#o = this.shadowRoot.querySelectorAll("svg"), this.#c = this.shadowRoot.querySelector("#max"), this.#a = this.shadowRoot.querySelector("#min"), this.#h = this.shadowRoot.querySelectorAll("input"), this.#d = this.shadowRoot.querySelector("style[title=overview]"), this.max.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.max })), this.min.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.min }));
      }
    );
  }
  get scrollBarWidget() {
    return this.#t;
  }
  get rwdStart() {
    return this.#n;
  }
  get fwdEnd() {
    return this.#r;
  }
  get scrollBar() {
    return this.#i;
  }
  get viewport() {
    return this.#s;
  }
  get handle() {
    return this.#l;
  }
  get icons() {
    return this.#o;
  }
  get max() {
    return this.#c;
  }
  get min() {
    return this.#a;
  }
  get sliders() {
    return this.#h;
  }
  get overviewCSS() {
    return this.#d;
  }
  onChangeSliderHandler() {
    console.log(`${this.input.value}, ${this.input.getAttribute("max")}`);
  }
}
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", Zc);
const so = document.createElement("template");
so.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${Ai}px;
  }
  tradex-overview {
    height: ${Dr}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class Jc extends ae {
  #e;
  #t;
  constructor() {
    super(so);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector(".viewport"), this.#t = this.shadowRoot.querySelector("tradex-overview");
      }
    );
  }
  get viewport() {
    return this.#e;
  }
  get overview() {
    return this.#t;
  }
}
customElements.get("tradex-time") || window.customElements.define("tradex-time", Jc);
const no = document.createElement("template");
no.innerHTML = `
<style>
.scene-canvas {
  display: block;
}
</style>
<slot name="viewportCanvas"></slot>
<canvas class="scene-canvas"></canvas>
`;
class Qc extends ae {
  #e;
  #t;
  #n = this.onSlotChange.bind(this);
  constructor() {
    super(no);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector('slot[name="viewportCanvas"]'), this.#e.addEventListener("slotchange", this.#n);
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.#e.removeEventListener("slotchange", this.#n);
  }
  get hasCanvasSlot() {
    return !0;
  }
  get canvasSlot() {
    return this.#e;
  }
  get canvas() {
    return this.#t;
  }
  onSlotChange() {
    this.#t = Array.from(this.canvasSlot.assignedElements()).find((e) => e.localName === "canvas")[0];
  }
}
customElements.get("tradex-viewport") || window.customElements.define("tradex-viewport", Qc);
const ro = document.createElement("template");
ro.innerHTML = `
<style>
  tradex-viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <tradex-viewport></tradex-viewport>
`;
class eu extends ae {
  #e;
  constructor() {
    super(ro);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => this.#e = this.shadowRoot.querySelector("tradex-viewport")
    );
  }
  get viewport() {
    return this.#e;
  }
}
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", eu);
const oo = document.createElement("template");
oo.innerHTML = `
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
.legend .control,
.legend .control.collapse {
  margin-right: 2px;
  padding-left: 0;
}


.legends.hide .legend.indicator {
  display:none;
}


.controls .control:hover {
  background: #889;
  border-radius: 3px;
}

.controls.maximized .up,
.controls.maximized .down,
.controls.maximized .expand,
.controls.maximized .collapse,
.controls.maximized .maximize,
.controls.maximized .remove
{
  display: none;
}

.controls.restored .restore
{
  display: none;
}

.controls.collapsed .collapse {
  display: none;
}

.controls.expanded .expand {
  display: none;
}

.controls.visible .visible {
  display: none;
}
.controls.visible .notvisible {
  display: inline;
}

.controls.notvisible .notvisible {
  display: none;
}
.controls.notvisible .visible {
  display: inline;
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
  <div class="controls collapse restored">
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${rh}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${oh}</span>
  </div>
</div>
`;
class tu extends ae {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l = [];
  #o;
  constructor() {
    super(oo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#s = this.shadowRoot.querySelector("slot"), this.#t = this.shadowRoot.querySelector(".legends"), this.#n = this.shadowRoot.querySelector(".title"), this.#r = this.shadowRoot.querySelector("dl"), this.#i = this.shadowRoot.querySelector(".controls"), this.#o = this.onSlotChange.bind(this), this.#s.addEventListener("slotchange", this.#o);
      }
    );
  }
  disconnectedCallback() {
    this.#s.removeEventListener("slotchange", this.#o);
  }
  get slot() {
    return this.#s;
  }
  get legends() {
    return this.#t;
  }
  get elTitle() {
    return this.#n;
  }
  get elInputs() {
    return this.#r;
  }
  get elControls() {
    return this.#i;
  }
  get title() {
    return this.#e;
  }
  set title(e) {
    this.setTittle(e);
  }
  onSlotChange(e) {
    this.#l.forEach((i) => i.handler.call(i.context, e));
  }
  insert(e) {
    this.legends.insertAdjacentHTML("beforeend", e);
  }
  setTittle(e) {
    E && (this.#e = e, this.elTitle.innerHTML = e);
  }
  buildLegend(e, i) {
    let s = "", n = `${i.legend.font}; color: ${i.legend.colour}; text-align: left;`, r = "", a = e?.type !== "chart" ? "visible" : "notvisible";
    const l = "", h = i.legend.controls ? `
      <div class="controls restored expanded ${a}" style="${l}">
        ${this.buildControls(e)}
      </div>
    ` : "";
    switch (e?.type) {
      case "chart":
        r += "font-size: 1.5em;";
        break;
      case "secondary":
        n += " margin-bottom: -1.5em;", r += "", e.title = "";
        break;
      default:
        r += "font-size: 1.2em;";
        break;
    }
    return `
      <div id="legend_${e.id}" class="legend ${e.type}" style="${n}" data-type="${e.type}" data-id="${e.id}" data-parent="${e.parent.id}">
        <div class="lower">
          <span class="title" style="${r}">${e.title}</span>
          <dl style="${s}">${this.buildInputs(e)}</dl>
        </div>
        <div class="upper">
            <span class="title" style="${r}">${e.title}</span>
            ${h}
      </div>
     </div>
    `;
  }
  buildInputs(e) {
    let i = 0, s = "", n, r = "", a = "", l = "";
    for (n in e.inputs) {
      let h = e?.colours?.[i] ? ` color: ${e.colours[i]};` : "", m = e?.inputs?.[n] !== void 0 ? e.inputs[n] : r, g = e?.labels?.[i] ? `${n}:` : r;
      a += e?.labels?.[i] ? "1em;" : ".25em", s += `<dt style="${a}">${g}</dt>
      <dd style="${l}${h}">${m}</dd>`, ++i;
    }
    return s;
  }
  buildControls(e) {
    let i = "", s = e.id;
    return i += `<span id="${s}_up" class="control up" data-icon="up">${ah}</span>`, i += `<span id="${s}_down" class="control down" data-icon="down">${lh}</span>`, e?.type === "indicator" && (i += `<span id="${s}_visible" class="control visible" data-icon="visible">${mh}</span>`, i += `<span id="${s}_notVisible" class="control notvisible" data-icon="notVisible">${ph}</span>`), e?.type !== "indicator" && (i += `<span id="${s}_collapse" class="control collapse" data-icon="collapse">${uh}</span>`, i += `<span id="${s}_expand" class="control expand" data-icon="expand">${dh}</span>`, i += `<span id="${s}_maximize" class="control maximize" data-icon="maximize">${ch}</span>`, i += `<span id="${s}_restore" class="control restore" data-icon="restore">${hh}</span>`), i += e?.type !== "chart" ? `<span id="${s}_remove" class="control remove" data-icon="remove">${nh}</span>` : "", i += e?.type !== "secondary" ? `<span id="${s}_config" class="control config" data-icon="config">${Nr}</span>` : "", i;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", tu);
const ao = document.createElement("template");
ao.innerHTML = `
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
class iu extends ae {
  #e;
  #t;
  constructor() {
    super(ao);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector(".viewport"), this.#t = this.shadowRoot.querySelector("tradex-legends");
      }
    );
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.#e;
  }
  get legend() {
    return this.#t;
  }
}
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", iu);
const lo = document.createElement("template");
lo.innerHTML = `
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
class su extends ae {
  #e;
  #t;
  #n;
  #r;
  constructor() {
    super(lo);
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
    return Array.from(this.chartPaneSlot.assignedElements()).find((e) => e.classList.contains("primary"));
  }
  get secondary() {
    return Array.from(this.chartPaneSlot.assignedElements()).find((e) => e.classList.contains("secondary"));
  }
  get chartPanes() {
    return this.chartPaneSlot.assignedElements();
  }
  get chartPaneSlot() {
    return this.shadowRoot.querySelector('slot[name="chartpane"]');
  }
  get width() {
    return this.#n;
  }
  get height() {
    return this.#r;
  }
  get oWidth() {
    return this.#e;
  }
  get oHeight() {
    return this.#t;
  }
  get widthDeltaR() {
    return this.#n / this.#e;
  }
  get heightDeltaR() {
    return this.#r / this.#t;
  }
  previousDimensions() {
    this.#e = this.#n ? this.#n : this.clientWidth, this.#t = this.#r ? this.#r : this.clientHeight, this.#n = this.clientWidth, this.#r = this.clientHeight;
  }
}
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", su);
const ho = document.createElement("template");
ho.innerHTML = `
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
    // top: 1px;
  }
  tradex-rows {
    position:relative;
    overflow: hidden;
    width: calc(100% - ${ft}px);
    height: calc(100% - ${Li}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${B.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${ft}px);
    height: ${Li}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class nu extends ae {
  #e;
  #t;
  constructor() {
    super(ho);
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
  start(e) {
    this.#t = e, this.setMain();
  }
  rowNode(e, i) {
    return `
      <tradex-chartpane slot="chartpane" class="${e}" style="">
      </tradex-chartpane>
    `;
  }
  setMain() {
    let e = T(this.#t?.time?.height) ? this.#t.time.height : Li, i = this.#t.tools.location == "none" ? 60 : 0;
    this.rows.style.height = `calc(100% - ${e}px)`, this.rows.style.left = `${i}px`, this.time.style.left = `${i}px`, this.viewport.style.left = `${i}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", nu);
const co = document.createElement("template");
co.innerHTML = `
  <slot></slot>
`;
class ru extends ae {
  constructor() {
    super(co);
  }
  destroy() {
  }
  get icons() {
    return this.shadowRoot.querySelector("slot").assignedElements();
  }
  defaultNode(e) {
    let i = `
    <style>
      svg {
        height: ${Xe.ICONSIZE};
        width: ${Xe.ICONSIZE};
        fill: ${Xe.COLOUR_ICON};
      }
      svg:hover {
        fill: ${Xe.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${Xe.ICONSIZE};
        margin: 0 auto;
      }
    </style>
    `;
    for (const s of e)
      i += this.iconNode(s);
    return i;
  }
  iconNode(e) {
    const i = "sub" in e ? 'data-menu="true"' : "";
    return `
      <div id="${e.id}" data-event="${e.event}" ${i} class="icon-wrapper">${e.icon}</div>

    `;
  }
}
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", ru);
const uo = document.createElement("template");
uo.innerHTML = `
<style>
  tradex-viewport {
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
<tradex-viewport></tradex-viewport>
<slot name="chartpane" id="chartPane"></slot>
`;
class ou extends ae {
  #e;
  #t;
  #n;
  constructor() {
    super(uo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector("tradex-viewport"), this.#n = this.shadowRoot.querySelector('slot[name="chartpane"]'), this.#t = this.chartPaneSlot.assignedElements();
      }
    );
  }
  get viewport() {
    return this.#e;
  }
  get chartPanes() {
    return this.#t;
  }
  get chartPaneSlot() {
    return this.#n;
  }
}
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", ou);
const au = `
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${qe}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: 0;
    width: calc(100% - ${qe}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 1px;
    right: 0; 
    width: ${ft}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`, mo = document.createElement("template");
mo.innerHTML = au;
class lu extends ae {
  #e;
  #t;
  #n;
  #r;
  constructor() {
    super(mo);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#t = this.shadowRoot.querySelector("tradex-tools"), this.#n = this.shadowRoot.querySelector("tradex-main"), this.#r = this.shadowRoot.querySelector("tradex-scale");
      }
    );
  }
  get tools() {
    return this.#t;
  }
  get main() {
    return this.#n;
  }
  get scale() {
    return this.#r;
  }
  start(e) {
    this.#e = e, this.setToolsLocation();
  }
  setYAxisLocation(e = this.#e?.yAxis?.location) {
    let i = T(this.#e?.tools?.width) ? this.#e.tools.width : qe, s;
    switch (e) {
      case "left":
        s = i == 0 ? 0 : ft, this.scale.style.left = `${i}px`, this.scale.style.right = void 0, this.main.style.left = void 0, this.main.style.right = `-${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
        break;
      case "both":
      case "right":
      default:
        s = i == 0 ? ft : 0, this.scale.style.left = void 0, this.scale.style.right = 0, this.main.style.left = void 0, this.main.style.right = `${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
        break;
    }
  }
  setToolsLocation(e = this.#e?.tools?.location) {
    switch (this.#e.tools = this.#e.tools || {}, e) {
      case "none":
      case !1:
        this.#e.tools.location = "none", this.#e.tools.width = 0, this.tools.style.display = "none", this.tools.style.width = "0px";
        break;
      case "right":
        this.#e.tools.location = "right", this.#e.tools.width = this.#e?.tools?.width || qe, this.tools.style.display = "block", this.tools.style.left = void 0, this.tools.style.right = 0, this.tools.style.width = `${qe}px`;
        break;
      case "left":
      default:
        this.#e.tools.location = "left", this.#e.tools.width = this.#e?.tools?.width || qe, this.tools.style.display = "block", this.tools.style.left = 0, this.tools.style.right = void 0, this.tools.style.width = `${qe}px`;
        break;
    }
    this.setYAxisLocation();
  }
}
customElements.get("tradex-body") || window.customElements.define("tradex-body", lu);
const po = document.createElement("template");
po.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class hu extends ae {
  constructor() {
    super(po);
  }
  destroy() {
  }
  get icons() {
    return this.shadowRoot.querySelector("slot").assignedElements()[0].children;
  }
  defaultNode(e) {
    let s = `
    <div style="display: inline-block; float: right;">
    <style>
      svg {
        height: ${dt.ICONSIZE};
        fill: ${dt.COLOUR_ICON};
      }
    </style>
    `;
    for (const n of e)
      s += this.iconNode(n);
    return s + "</div>";
  }
  iconNode(e) {
    const i = `display: inline-block; height: ${dt.ICONSIZE}; padding-top: 2px`, s = "sub" in e ? 'data-menu="true"' : "";
    return `
      <div id="TX_${e.id}" data-event="${e.event}" ${s} class="icon-wrapper" style="${i}">${e.icon}</div>

    `;
  }
}
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", hu);
const go = document.createElement("template");
go.innerHTML = `
  <slot name="widget"></slot>
`;
class cu extends ae {
  constructor() {
    super(go);
  }
  destroy() {
  }
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", cu);
const uu = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
    }
    tradex-utils {
      height: ${Ze}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${Ze}px); 
      min-height: ${je - Ze}px;
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
class du extends ae {
  #e;
  #t;
  #n;
  #r;
  #i = Mi;
  #s = je;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  constructor() {
    const e = document.createElement("template");
    e.innerHTML = uu, super(e, "closed"), this.#r = e;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#r.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = Ir, this.elWidgetsG = this.shadowRoot.querySelector("tradex-widgets"), this.elUtils = this.shadowRoot.querySelector("tradex-utils"), this.elBody = this.shadowRoot.querySelector("tradex-body"), this.elMain = this.elBody.main, this.elTime = this.elBody.main.time, this.elTools = this.elBody.tools, this.elYAxis = this.elBody.scale;
      let e = this.getAttribute("height") || "100%", i = this.getAttribute("width") || "100%";
      this.setDimensions(i, e), this.resizeObserver = new ResizeObserver(ke(this.onResized, 100, this)), this.resizeObserver.observe(this);
    }
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect(), this.removeEventListener("click", this.onClick);
  }
  attributeChangedCallback(e, i, s) {
    switch (e) {
      case "config":
        break;
      case "disabled":
        break;
      case "height":
        this.height(s);
        break;
      case "width":
        this.width(s);
        break;
    }
  }
  get id() {
    return this.getAttribute("id");
  }
  set id(e) {
    this.setAttribute("id", $e(e));
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(e) {
    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  get stream() {
  }
  set stream(e) {
  }
  get body() {
    return this.#e;
  }
  get utils() {
    return this.#t;
  }
  get widgets() {
    return this.#n;
  }
  get width() {
    return this.#i;
  }
  get height() {
    return this.#s;
  }
  get resizeEntries() {
    return this.#d;
  }
  elStart(e) {
    this.#h = e, this.setUtilsLocation();
  }
  onResized(e) {
    const { width: i, height: s } = e[0].contentRect;
    this.#i = i, this.#s = s, this.#d = e[0], this.log(`onResize w: ${i}, h: ${s}`), this.emit("global_resize", { w: i, h: s }), this.MainPane instanceof to, this.ToolsBar instanceof io && this.ToolsBar.onResized();
  }
  setWidth(e) {
    T(e) ? (this.#i = e, e += "px") : E(e) || (this.#i = this.parentElement.getBoundingClientRect().width, e = this.#i + "px"), this.style.width = e;
  }
  setHeight(e) {
    T(e) ? (this.#s = e, e += "px") : E(e) || (this.#s = this.parentElement.getBoundingClientRect().height, w = this.#s + "px"), this.style.height = e;
  }
  setWidthMin(e) {
    this.style.minWidth = `var(--txc-min-width, ${e})`;
  }
  setHeightMin(e) {
    this.style.minHeight = `var(--txc-min-height, ${w})`;
  }
  setWidthMax(e) {
    this.style.minWidth = `var(--txc-max-width, ${e})`;
  }
  setHeightMax(e) {
    this.style.minHeight = `var(--txc-max-height, ${w})`;
  }
  setDimensions(e, i) {
    let s, n = this.width, r = this.height;
    if (!e || !i) {
      const a = this.getBoundingClientRect(), l = this.parentElement.getBoundingClientRect();
      i = a.height ? a.height : l.height ? l.height : je, e = a.width ? a.width : l.width ? l.width : Mi;
    }
    return s = {
      width: this.width,
      height: this.height,
      resizeW: e / n,
      resizeH: i / r,
      resizeWDiff: e - n,
      resizeHDiff: i - r
    }, this.setWidth(e), this.setHeight(i), s;
  }
  setUtilsLocation(e = this.#h?.utils?.location) {
    switch (this.#h.utils = this.#h.utils || {}, e) {
      case "none":
      case !1:
        this.#h.utils.location = "none", this.#h.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${je}px`;
        break;
      case "top":
      default:
        this.#h.utils.location = "top", this.#h.utils.height = Ze, this.elUtils.style.display = "block", this.elUtils.style.height = `${Ze}px`, this.elBody.style.height = `calc(100% - ${Ze}px)`, this.elBody.style.minHeight = `${je - Ze}px`;
    }
  }
}
const mu = [
  {
    id: "indicators",
    name: "Indicators",
    icon: jl,
    event: "utils_indicators",
    sub: []
  },
  {
    id: "timezone",
    name: "Timezone",
    icon: Zl,
    event: "utils_timezone"
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: Kl,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: Nr,
    event: "utils_settings"
  }
], pu = {
  name: "ACCBANDS",
  camelCaseName: "accBands",
  group: "Overlap Studies",
  description: "Acceleration Bands",
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
    defaultValue: 20,
    hint: "Number of period",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
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
}, gu = {
  name: "ACOS",
  camelCaseName: "acos",
  group: "Math Transform",
  description: "Vector Trigonometric ACos",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, fu = {
  name: "AD",
  camelCaseName: "ad",
  group: "Volume Indicators",
  description: "Chaikin A/D Line",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }, {
    name: "volume",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, yu = {
  name: "ADD",
  camelCaseName: "add",
  group: "Math Operators",
  description: "Vector Arithmetic Add",
  inputs: [{
    name: "inReal0",
    type: "number"
  }, {
    name: "inReal1",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, vu = {
  name: "ADOSC",
  camelCaseName: "adOsc",
  group: "Volume Indicators",
  description: "Chaikin A/D Oscillator",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }, {
    name: "volume",
    type: "number"
  }],
  options: [{
    name: "fastPeriod",
    displayName: "Fast Period",
    defaultValue: 3,
    hint: "Number of period for the fast MA",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "slowPeriod",
    displayName: "Slow Period",
    defaultValue: 10,
    hint: "Number of period for the slow MA",
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
}, wu = {
  name: "ADX",
  camelCaseName: "adx",
  group: "Momentum Indicators",
  description: "Average Directional Movement Index",
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
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, xu = {
  name: "ADXR",
  camelCaseName: "adxr",
  group: "Momentum Indicators",
  description: "Average Directional Movement Index Rating",
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
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, bu = {
  name: "APO",
  camelCaseName: "apo",
  group: "Momentum Indicators",
  description: "Absolute Price Oscillator",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "fastPeriod",
    displayName: "Fast Period",
    defaultValue: 12,
    hint: "Number of period for the fast MA",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "slowPeriod",
    displayName: "Slow Period",
    defaultValue: 26,
    hint: "Number of period for the slow MA",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "MAType",
    displayName: "MA Type",
    defaultValue: 0,
    hint: "Type of Moving Average",
    type: "MAType"
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, fo = {
  name: "AROON",
  camelCaseName: "aroon",
  group: "Momentum Indicators",
  description: "Aroon",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
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
    name: "aroonDown",
    type: "number",
    plot: "line_dash"
  }, {
    name: "aroonUp",
    type: "number",
    plot: "line"
  }]
}, Cu = {
  name: "AROONOSC",
  camelCaseName: "aroonOsc",
  group: "Momentum Indicators",
  description: "Aroon Oscillator",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
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
}, Tu = {
  name: "ASIN",
  camelCaseName: "asin",
  group: "Math Transform",
  description: "Vector Trigonometric ASin",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Eu = {
  name: "ATAN",
  camelCaseName: "atan",
  group: "Math Transform",
  description: "Vector Trigonometric ATan",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Su = {
  name: "ATR",
  camelCaseName: "atr",
  group: "Volatility Indicators",
  description: "Average True Range",
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
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Pu = {
  name: "AVGDEV",
  camelCaseName: "avgDev",
  group: "Price Transform",
  description: "Average Deviation",
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
}, Mu = {
  name: "AVGPRICE",
  camelCaseName: "avgPrice",
  group: "Price Transform",
  description: "Average Price",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, yo = {
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
}, Au = {
  name: "BETA",
  camelCaseName: "beta",
  group: "Statistic Functions",
  description: "Beta",
  inputs: [{
    name: "inReal0",
    type: "number"
  }, {
    name: "inReal1",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 5,
    hint: "Number of period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Lu = {
  name: "BOP",
  camelCaseName: "bop",
  group: "Momentum Indicators",
  description: "Balance Of Power",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Ou = {
  name: "CCI",
  camelCaseName: "cci",
  group: "Momentum Indicators",
  description: "Commodity Channel Index",
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
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Nu = {
  name: "CDL2CROWS",
  camelCaseName: "cdl2Crows",
  group: "Pattern Recognition",
  description: "Two Crows",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Iu = {
  name: "CDL3BLACKCROWS",
  camelCaseName: "cdl3BlackCrows",
  group: "Pattern Recognition",
  description: "Three Black Crows",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Du = {
  name: "CDL3INSIDE",
  camelCaseName: "cdl3Inside",
  group: "Pattern Recognition",
  description: "Three Inside Up/Down",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Ru = {
  name: "CDL3LINESTRIKE",
  camelCaseName: "cdl3LineStrike",
  group: "Pattern Recognition",
  description: "Three-Line Strike ",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, ku = {
  name: "CDL3OUTSIDE",
  camelCaseName: "cdl3Outside",
  group: "Pattern Recognition",
  description: "Three Outside Up/Down",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, _u = {
  name: "CDL3STARSINSOUTH",
  camelCaseName: "cdl3StarsInSouth",
  group: "Pattern Recognition",
  description: "Three Stars In The South",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Hu = {
  name: "CDL3WHITESOLDIERS",
  camelCaseName: "cdl3WhiteSoldiers",
  group: "Pattern Recognition",
  description: "Three Advancing White Soldiers",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, $u = {
  name: "CDLABANDONEDBABY",
  camelCaseName: "cdlAbandonedBaby",
  group: "Pattern Recognition",
  description: "Abandoned Baby",
  inputs: [{
    name: "open",
    type: "number"
  }, {
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
    name: "penetration",
    displayName: "Penetration",
    defaultValue: 0.3,
    hint: "Percentage of penetration of a candle within another candle",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Uu = {
  name: "CDLADVANCEBLOCK",
  camelCaseName: "cdlAdvanceBlock",
  group: "Pattern Recognition",
  description: "Advance Block",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Bu = {
  name: "CDLBELTHOLD",
  camelCaseName: "cdlBeltHold",
  group: "Pattern Recognition",
  description: "Belt-hold",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Vu = {
  name: "CDLBREAKAWAY",
  camelCaseName: "cdlBreakaway",
  group: "Pattern Recognition",
  description: "Breakaway",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, zu = {
  name: "CDLCLOSINGMARUBOZU",
  camelCaseName: "cdlClosingMarubozu",
  group: "Pattern Recognition",
  description: "Closing Marubozu",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Wu = {
  name: "CDLCONCEALBABYSWALL",
  camelCaseName: "cdlConcealBabysWall",
  group: "Pattern Recognition",
  description: "Concealing Baby Swallow",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Fu = {
  name: "CDLCOUNTERATTACK",
  camelCaseName: "cdlCounterAttack",
  group: "Pattern Recognition",
  description: "Counterattack",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Gu = {
  name: "CDLDARKCLOUDCOVER",
  camelCaseName: "cdlDarkCloudCover",
  group: "Pattern Recognition",
  description: "Dark Cloud Cover",
  inputs: [{
    name: "open",
    type: "number"
  }, {
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
    name: "penetration",
    displayName: "Penetration",
    defaultValue: 0.5,
    hint: "Percentage of penetration of a candle within another candle",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Yu = {
  name: "CDLDOJI",
  camelCaseName: "cdlDoji",
  group: "Pattern Recognition",
  description: "Doji",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, qu = {
  name: "CDLDOJISTAR",
  camelCaseName: "cdlDojiStar",
  group: "Pattern Recognition",
  description: "Doji Star",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Xu = {
  name: "CDLDRAGONFLYDOJI",
  camelCaseName: "cdlDragonflyDoji",
  group: "Pattern Recognition",
  description: "Dragonfly Doji",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Ku = {
  name: "CDLENGULFING",
  camelCaseName: "cdlEngulfing",
  group: "Pattern Recognition",
  description: "Engulfing Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, ju = {
  name: "CDLEVENINGDOJISTAR",
  camelCaseName: "cdlEveningDojiStar",
  group: "Pattern Recognition",
  description: "Evening Doji Star",
  inputs: [{
    name: "open",
    type: "number"
  }, {
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
    name: "penetration",
    displayName: "Penetration",
    defaultValue: 0.3,
    hint: "Percentage of penetration of a candle within another candle",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Zu = {
  name: "CDLEVENINGSTAR",
  camelCaseName: "cdlEveningStar",
  group: "Pattern Recognition",
  description: "Evening Star",
  inputs: [{
    name: "open",
    type: "number"
  }, {
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
    name: "penetration",
    displayName: "Penetration",
    defaultValue: 0.3,
    hint: "Percentage of penetration of a candle within another candle",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Ju = {
  name: "CDLGAPSIDESIDEWHITE",
  camelCaseName: "cdlGapSideSideWhite",
  group: "Pattern Recognition",
  description: "Up/Down-gap side-by-side white lines",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Qu = {
  name: "CDLGRAVESTONEDOJI",
  camelCaseName: "cdlGravestoneDoji",
  group: "Pattern Recognition",
  description: "Gravestone Doji",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, ed = {
  name: "CDLHAMMER",
  camelCaseName: "cdlHammer",
  group: "Pattern Recognition",
  description: "Hammer",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, td = {
  name: "CDLHANGINGMAN",
  camelCaseName: "cdlHangingMan",
  group: "Pattern Recognition",
  description: "Hanging Man",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, sd = {
  name: "CDLHARAMI",
  camelCaseName: "cdlHarami",
  group: "Pattern Recognition",
  description: "Harami Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, nd = {
  name: "CDLHARAMICROSS",
  camelCaseName: "cdlHaramiCross",
  group: "Pattern Recognition",
  description: "Harami Cross Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, rd = {
  name: "CDLHIGHWAVE",
  camelCaseName: "cdlHignWave",
  group: "Pattern Recognition",
  description: "High-Wave Candle",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, od = {
  name: "CDLHIKKAKE",
  camelCaseName: "cdlHikkake",
  group: "Pattern Recognition",
  description: "Hikkake Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, ad = {
  name: "CDLHIKKAKEMOD",
  camelCaseName: "cdlHikkakeMod",
  group: "Pattern Recognition",
  description: "Modified Hikkake Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, ld = {
  name: "CDLHOMINGPIGEON",
  camelCaseName: "cdlHomingPigeon",
  group: "Pattern Recognition",
  description: "Homing Pigeon",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, hd = {
  name: "CDLIDENTICAL3CROWS",
  camelCaseName: "cdlIdentical3Crows",
  group: "Pattern Recognition",
  description: "Identical Three Crows",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, cd = {
  name: "CDLINNECK",
  camelCaseName: "cdlInNeck",
  group: "Pattern Recognition",
  description: "In-Neck Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, ud = {
  name: "CDLINVERTEDHAMMER",
  camelCaseName: "cdlInvertedHammer",
  group: "Pattern Recognition",
  description: "Inverted Hammer",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, dd = {
  name: "CDLKICKING",
  camelCaseName: "cdlKicking",
  group: "Pattern Recognition",
  description: "Kicking",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, md = {
  name: "CDLKICKINGBYLENGTH",
  camelCaseName: "cdlKickingByLength",
  group: "Pattern Recognition",
  description: "Kicking - bull/bear determined by the longer marubozu",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, pd = {
  name: "CDLLADDERBOTTOM",
  camelCaseName: "cdlLadderBottom",
  group: "Pattern Recognition",
  description: "Ladder Bottom",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, gd = {
  name: "CDLLONGLEGGEDDOJI",
  camelCaseName: "cdlLongLeggedDoji",
  group: "Pattern Recognition",
  description: "Long Legged Doji",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, fd = {
  name: "CDLLONGLINE",
  camelCaseName: "cdlLongLine",
  group: "Pattern Recognition",
  description: "Long Line Candle",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, yd = {
  name: "CDLMARUBOZU",
  camelCaseName: "cdlMarubozu",
  group: "Pattern Recognition",
  description: "Marubozu",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, vd = {
  name: "CDLMATCHINGLOW",
  camelCaseName: "cdlMatchingLow",
  group: "Pattern Recognition",
  description: "Matching Low",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, wd = {
  name: "CDLMATHOLD",
  camelCaseName: "cdlMatHold",
  group: "Pattern Recognition",
  description: "Mat Hold",
  inputs: [{
    name: "open",
    type: "number"
  }, {
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
    name: "penetration",
    displayName: "Penetration",
    defaultValue: 0.5,
    hint: "Percentage of penetration of a candle within another candle",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, xd = {
  name: "CDLMORNINGDOJISTAR",
  camelCaseName: "cdlMorningDojiStar",
  group: "Pattern Recognition",
  description: "Morning Doji Star",
  inputs: [{
    name: "open",
    type: "number"
  }, {
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
    name: "penetration",
    displayName: "Penetration",
    defaultValue: 0.3,
    hint: "Percentage of penetration of a candle within another candle",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, bd = {
  name: "CDLMORNINGSTAR",
  camelCaseName: "cdlMorningStar",
  group: "Pattern Recognition",
  description: "Morning Star",
  inputs: [{
    name: "open",
    type: "number"
  }, {
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
    name: "penetration",
    displayName: "Penetration",
    defaultValue: 0.3,
    hint: "Percentage of penetration of a candle within another candle",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Cd = {
  name: "CDLONNECK",
  camelCaseName: "cdlOnNeck",
  group: "Pattern Recognition",
  description: "On-Neck Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Td = {
  name: "CDLPIERCING",
  camelCaseName: "cdlPiercing",
  group: "Pattern Recognition",
  description: "Piercing Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Ed = {
  name: "CDLRICKSHAWMAN",
  camelCaseName: "cdlRickshawMan",
  group: "Pattern Recognition",
  description: "Rickshaw Man",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Sd = {
  name: "CDLRISEFALL3METHODS",
  camelCaseName: "cdlRiseFall3Methods",
  group: "Pattern Recognition",
  description: "Rising/Falling Three Methods",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Pd = {
  name: "CDLSEPARATINGLINES",
  camelCaseName: "cdlSeperatingLines",
  group: "Pattern Recognition",
  description: "Separating Lines",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Md = {
  name: "CDLSHOOTINGSTAR",
  camelCaseName: "cdlShootingStar",
  group: "Pattern Recognition",
  description: "Shooting Star",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Ad = {
  name: "CDLSHORTLINE",
  camelCaseName: "cdlShortLine",
  group: "Pattern Recognition",
  description: "Short Line Candle",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Ld = {
  name: "CDLSPINNINGTOP",
  camelCaseName: "cdlSpinningTop",
  group: "Pattern Recognition",
  description: "Spinning Top",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Od = {
  name: "CDLSTALLEDPATTERN",
  camelCaseName: "cdlStalledPattern",
  group: "Pattern Recognition",
  description: "Stalled Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Nd = {
  name: "CDLSTICKSANDWICH",
  camelCaseName: "cdlStickSandwhich",
  group: "Pattern Recognition",
  description: "Stick Sandwich",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Id = {
  name: "CDLTAKURI",
  camelCaseName: "cdlTakuri",
  group: "Pattern Recognition",
  description: "Takuri (Dragonfly Doji with very long lower shadow)",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Dd = {
  name: "CDLTASUKIGAP",
  camelCaseName: "cdlTasukiGap",
  group: "Pattern Recognition",
  description: "Tasuki Gap",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Rd = {
  name: "CDLTHRUSTING",
  camelCaseName: "cdlThrusting",
  group: "Pattern Recognition",
  description: "Thrusting Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, kd = {
  name: "CDLTRISTAR",
  camelCaseName: "cdlTristar",
  group: "Pattern Recognition",
  description: "Tristar Pattern",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, _d = {
  name: "CDLUNIQUE3RIVER",
  camelCaseName: "cdlUnique3River",
  group: "Pattern Recognition",
  description: "Unique 3 River",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Hd = {
  name: "CDLUPSIDEGAP2CROWS",
  camelCaseName: "cdlUpsideGap2Crows",
  group: "Pattern Recognition",
  description: "Upside Gap Two Crows",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, $d = {
  name: "CDLXSIDEGAP3METHODS",
  camelCaseName: "cdlXSideGap3Methods",
  group: "Pattern Recognition",
  description: "Upside/Downside Gap Three Methods",
  inputs: [{
    name: "open",
    type: "number"
  }, {
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Ud = {
  name: "CEIL",
  camelCaseName: "ceil",
  group: "Math Transform",
  description: "Vector Ceil",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Bd = {
  name: "CMO",
  camelCaseName: "cmo",
  group: "Momentum Indicators",
  description: "Chande Momentum Oscillator",
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
}, Vd = {
  name: "CORREL",
  camelCaseName: "correl",
  group: "Statistic Functions",
  description: "Pearson's Correlation Coefficient (r)",
  inputs: [{
    name: "inReal0",
    type: "number"
  }, {
    name: "inReal1",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 30,
    hint: "Number of period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, zd = {
  name: "COS",
  camelCaseName: "cos",
  group: "Math Transform",
  description: "Vector Trigonometric Cos",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Wd = {
  name: "COSH",
  camelCaseName: "cosh",
  group: "Math Transform",
  description: "Vector Trigonometric Cosh",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Fd = {
  name: "DEMA",
  camelCaseName: "dema",
  group: "Overlap Studies",
  description: "number Exponential Moving Average",
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
}, Gd = {
  name: "DIV",
  camelCaseName: "div",
  group: "Math Operators",
  description: "Vector Arithmetic Div",
  inputs: [{
    name: "inReal0",
    type: "number"
  }, {
    name: "inReal1",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Yd = {
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
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, vo = {
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
}, qd = {
  name: "EXP",
  camelCaseName: "exp",
  group: "Math Transform",
  description: "Vector Arithmetic Exp",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Xd = {
  name: "FLOOR",
  camelCaseName: "floor",
  group: "Math Transform",
  description: "Vector Floor",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Kd = {
  name: "HT_DCPERIOD",
  camelCaseName: "htDcPeriod",
  group: "Cycle Indicators",
  description: "Hilbert Transform - Dominant Cycle Period",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, jd = {
  name: "HT_DCPHASE",
  camelCaseName: "htDcPhase",
  group: "Cycle Indicators",
  description: "Hilbert Transform - Dominant Cycle Phase",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Zd = {
  name: "HT_PHASOR",
  camelCaseName: "htPhasor",
  group: "Cycle Indicators",
  description: "Hilbert Transform - Phasor Components",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "inPhase",
    type: "number",
    plot: "line"
  }, {
    name: "quadrature",
    type: "number",
    plot: "line_dash"
  }]
}, Jd = {
  name: "HT_SINE",
  camelCaseName: "htSine",
  group: "Cycle Indicators",
  description: "Hilbert Transform - SineWave",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "sine",
    type: "number",
    plot: "line"
  }, {
    name: "leadSine",
    type: "number",
    plot: "line_dash"
  }]
}, Qd = {
  name: "HT_TRENDLINE",
  camelCaseName: "htTrendline",
  group: "Overlap Studies",
  description: "Hilbert Transform - Instantaneous Trendline",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, e0 = {
  name: "HT_TRENDMODE",
  camelCaseName: "htTrendMode",
  group: "Cycle Indicators",
  description: "Hilbert Transform - Trend vs Cycle Mode",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, t0 = {
  name: "IMI",
  camelCaseName: "imi",
  group: "Momentum Indicators",
  description: "Intraday Momentum Index",
  inputs: [{
    name: "open",
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
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, i0 = {
  name: "KAMA",
  camelCaseName: "kama",
  group: "Overlap Studies",
  description: "Kaufman Adaptive Moving Average",
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
}, s0 = {
  name: "LINEARREG",
  camelCaseName: "linearReg",
  group: "Statistic Functions",
  description: "Linear Regression",
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
}, n0 = {
  name: "LINEARREG_ANGLE",
  camelCaseName: "linearRegAngle",
  group: "Statistic Functions",
  description: "Linear Regression Angle",
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
}, r0 = {
  name: "LINEARREG_INTERCEPT",
  camelCaseName: "linearRegIntercept",
  group: "Statistic Functions",
  description: "Linear Regression Intercept",
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
}, o0 = {
  name: "LINEARREG_SLOPE",
  camelCaseName: "linearRegSlope",
  group: "Statistic Functions",
  description: "Linear Regression Slope",
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
}, a0 = {
  name: "LN",
  camelCaseName: "ln",
  group: "Math Transform",
  description: "Vector Log Natural",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, l0 = {
  name: "LOG10",
  camelCaseName: "log10",
  group: "Math Transform",
  description: "Vector Log10",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, h0 = {
  name: "MA",
  camelCaseName: "movingAverage",
  group: "Overlap Studies",
  description: "Moving average",
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
      min: 1,
      max: 1e5
    }
  }, {
    name: "MAType",
    displayName: "MA Type",
    defaultValue: 0,
    hint: "Type of Moving Average",
    type: "MAType"
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, c0 = {
  name: "MACD",
  camelCaseName: "macd",
  group: "Momentum Indicators",
  description: "Moving Average Convergence/Divergence",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "fastPeriod",
    displayName: "Fast Period",
    defaultValue: 12,
    hint: "Number of period for the fast MA",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "slowPeriod",
    displayName: "Slow Period",
    defaultValue: 26,
    hint: "Number of period for the slow MA",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "signalPeriod",
    displayName: "Signal Period",
    defaultValue: 9,
    hint: "Smoothing for the signal line (nb of period)",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "MACD",
    type: "number",
    plot: "line"
  }, {
    name: "MACDSignal",
    type: "number",
    plot: "line_dash"
  }, {
    name: "MACDHist",
    type: "number",
    plot: "histogram"
  }]
}, u0 = {
  name: "MACDEXT",
  camelCaseName: "macdExt",
  group: "Momentum Indicators",
  description: "MACD with controllable MA type",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "fastPeriod",
    displayName: "Fast Period",
    defaultValue: 12,
    hint: "Number of period for the fast MA",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "fastMAType",
    displayName: "Fast MA",
    defaultValue: 0,
    hint: "Type of Moving Average for fast MA",
    type: "MAType"
  }, {
    name: "slowPeriod",
    displayName: "Slow Period",
    defaultValue: 26,
    hint: "Number of period for the slow MA",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "slowMAType",
    displayName: "Slow MA",
    defaultValue: 0,
    hint: "Type of Moving Average for slow MA",
    type: "MAType"
  }, {
    name: "signalPeriod",
    displayName: "Signal Period",
    defaultValue: 9,
    hint: "Smoothing for the signal line (nb of period)",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }, {
    name: "signalMAType",
    displayName: "Signal MA",
    defaultValue: 0,
    hint: "Type of Moving Average for signal line",
    type: "MAType"
  }],
  outputs: [{
    name: "MACD",
    type: "number",
    plot: "line"
  }, {
    name: "MACDSignal",
    type: "number",
    plot: "line_dash"
  }, {
    name: "MACDHist",
    type: "number",
    plot: "histogram"
  }]
}, d0 = {
  name: "MACDFIX",
  camelCaseName: "macdFix",
  group: "Momentum Indicators",
  description: "Moving Average Convergence/Divergence Fix 12/26",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "signalPeriod",
    displayName: "Signal Period",
    defaultValue: 9,
    hint: "Smoothing for the signal line (nb of period)",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "MACD",
    type: "number",
    plot: "line"
  }, {
    name: "MACDSignal",
    type: "number",
    plot: "line_dash"
  }, {
    name: "MACDHist",
    type: "number",
    plot: "histogram"
  }]
}, m0 = {
  name: "MAMA",
  camelCaseName: "mama",
  group: "Overlap Studies",
  description: "MESA Adaptive Moving Average",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "fastLimit",
    displayName: "Fast Limit",
    defaultValue: 0.5,
    hint: "Upper limit use in the adaptive algorithm",
    type: "number",
    range: {
      min: 0.01,
      max: 0.99
    }
  }, {
    name: "slowLimit",
    displayName: "Slow Limit",
    defaultValue: 0.05,
    hint: "Lower limit use in the adaptive algorithm",
    type: "number",
    range: {
      min: 0.01,
      max: 0.99
    }
  }],
  outputs: [{
    name: "MAMA",
    type: "number",
    plot: "line"
  }, {
    name: "FAMA",
    type: "number",
    plot: "line_dash"
  }]
}, p0 = {
  name: "MAVP",
  camelCaseName: "movingAverageVariablePeriod",
  group: "Overlap Studies",
  description: "Moving average with variable period",
  inputs: [{
    name: "inReal",
    type: "number"
  }, {
    name: "inPeriods",
    type: "number"
  }],
  options: [{
    name: "minPeriod",
    displayName: "Minimum Period",
    defaultValue: 2,
    hint: "Value less than minimum will be changed to Minimum period",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "maxPeriod",
    displayName: "Maximum Period",
    defaultValue: 30,
    hint: "Value higher than maximum will be changed to Maximum period",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "MAType",
    displayName: "MA Type",
    defaultValue: 0,
    hint: "Type of Moving Average",
    type: "MAType"
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, g0 = {
  name: "MAX",
  camelCaseName: "max",
  group: "Math Operators",
  description: "Highest value over a specified period",
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
}, f0 = {
  name: "MAXINDEX",
  camelCaseName: "maxIndex",
  group: "Math Operators",
  description: "Index of highest value over a specified period",
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
}, y0 = {
  name: "MEDPRICE",
  camelCaseName: "medPrice",
  group: "Price Transform",
  description: "Median Price",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, v0 = {
  name: "MFI",
  camelCaseName: "mfi",
  group: "Momentum Indicators",
  description: "Money Flow Index",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }, {
    name: "close",
    type: "number"
  }, {
    name: "volume",
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
}, w0 = {
  name: "MIDPOINT",
  camelCaseName: "midPoint",
  group: "Overlap Studies",
  description: "MidPoint over period",
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
}, x0 = {
  name: "MIDPRICE",
  camelCaseName: "midPrice",
  group: "Overlap Studies",
  description: "Midpoint Price over period",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
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
}, b0 = {
  name: "MIN",
  camelCaseName: "min",
  group: "Math Operators",
  description: "Lowest value over a specified period",
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
}, C0 = {
  name: "MININDEX",
  camelCaseName: "minIndex",
  group: "Math Operators",
  description: "Index of lowest value over a specified period",
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
}, T0 = {
  name: "MINMAX",
  camelCaseName: "minMax",
  group: "Math Operators",
  description: "Lowest and highest values over a specified period",
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
    name: "min",
    type: "number",
    plot: "line"
  }, {
    name: "max",
    type: "number",
    plot: "line"
  }]
}, E0 = {
  name: "MINMAXINDEX",
  camelCaseName: "minMaxIndex",
  group: "Math Operators",
  description: "Indexes of lowest and highest values over a specified period",
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
    name: "minIdx",
    type: "number",
    plot: "line"
  }, {
    name: "maxIdx",
    type: "number",
    plot: "line"
  }]
}, S0 = {
  name: "MINUS_DI",
  camelCaseName: "minusDI",
  group: "Momentum Indicators",
  description: "Minus Directional Indicator",
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
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, P0 = {
  name: "MINUS_DM",
  camelCaseName: "minusDM",
  group: "Momentum Indicators",
  description: "Minus Directional Movement",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 14,
    hint: "Number of period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, M0 = {
  name: "MOM",
  camelCaseName: "mom",
  group: "Momentum Indicators",
  description: "Momentum",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 10,
    hint: "Number of period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, A0 = {
  name: "MULT",
  camelCaseName: "mult",
  group: "Math Operators",
  description: "Vector Arithmetic Mult",
  inputs: [{
    name: "inReal0",
    type: "number"
  }, {
    name: "inReal1",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, L0 = {
  name: "NATR",
  camelCaseName: "natr",
  group: "Volatility Indicators",
  description: "Normalized Average True Range",
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
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, O0 = {
  name: "OBV",
  camelCaseName: "obv",
  group: "Volume Indicators",
  description: "On Balance Volume",
  inputs: [{
    name: "inReal",
    type: "number"
  }, {
    name: "volume",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, N0 = {
  name: "PLUS_DI",
  camelCaseName: "plusDI",
  group: "Momentum Indicators",
  description: "Plus Directional Indicator",
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
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, I0 = {
  name: "PLUS_DM",
  camelCaseName: "plusDM",
  group: "Momentum Indicators",
  description: "Plus Directional Movement",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 14,
    hint: "Number of period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, D0 = {
  name: "PPO",
  camelCaseName: "ppo",
  group: "Momentum Indicators",
  description: "Percentage Price Oscillator",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "fastPeriod",
    displayName: "Fast Period",
    defaultValue: 12,
    hint: "Number of period for the fast MA",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "slowPeriod",
    displayName: "Slow Period",
    defaultValue: 26,
    hint: "Number of period for the slow MA",
    type: "number",
    range: {
      min: 2,
      max: 1e5
    }
  }, {
    name: "MAType",
    displayName: "MA Type",
    defaultValue: 0,
    hint: "Type of Moving Average",
    type: "MAType"
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, R0 = {
  name: "ROC",
  camelCaseName: "roc",
  group: "Momentum Indicators",
  description: "Rate of change : ((price/prevPrice)-1)*100",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 10,
    hint: "Number of period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, k0 = {
  name: "ROCP",
  camelCaseName: "rocP",
  group: "Momentum Indicators",
  description: "Rate of change Percentage: (price-prevPrice)/prevPrice",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 10,
    hint: "Number of period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, _0 = {
  name: "ROCR",
  camelCaseName: "rocR",
  group: "Momentum Indicators",
  description: "Rate of change ratio: (price/prevPrice)",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 10,
    hint: "Number of period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, H0 = {
  name: "ROCR100",
  camelCaseName: "rocR100",
  group: "Momentum Indicators",
  description: "Rate of change ratio 100 scale: (price/prevPrice)*100",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [{
    name: "timePeriod",
    displayName: "Time Period",
    defaultValue: 10,
    hint: "Number of period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, wo = {
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
}, $0 = {
  name: "SAR",
  camelCaseName: "sar",
  group: "Overlap Studies",
  description: "Parabolic SAR",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }],
  options: [{
    name: "acceleration",
    displayName: "Acceleration Factor",
    defaultValue: 0.02,
    hint: "Acceleration Factor used up to the Maximum value",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }, {
    name: "maximum",
    displayName: "AF Maximum",
    defaultValue: 0.2,
    hint: "Acceleration Factor Maximum value",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, U0 = {
  name: "SAREXT",
  camelCaseName: "sarExt",
  group: "Overlap Studies",
  description: "Parabolic SAR - Extended",
  inputs: [{
    name: "high",
    type: "number"
  }, {
    name: "low",
    type: "number"
  }],
  options: [{
    name: "startValue",
    displayName: "Start Value",
    defaultValue: 0,
    hint: "Start value and direction. 0 for Auto, >0 for Long, <0 for Short",
    type: "number",
    range: {
      min: -3e37,
      max: 3e37
    }
  }, {
    name: "offsetOnReverse",
    displayName: "Offset on Reverse",
    defaultValue: 0,
    hint: "Percent offset added/removed to initial stop on short/long reversal",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }, {
    name: "accelerationInitLong",
    displayName: "AF Init Long",
    defaultValue: 0.02,
    hint: "Acceleration Factor initial value for the Long direction",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }, {
    name: "accelerationLong",
    displayName: "AF Long",
    defaultValue: 0.02,
    hint: "Acceleration Factor for the Long direction",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }, {
    name: "accelerationMaxLong",
    displayName: "AF Max Long",
    defaultValue: 0.2,
    hint: "Acceleration Factor maximum value for the Long direction",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }, {
    name: "accelerationInitShort",
    displayName: "AF Init Short",
    defaultValue: 0.02,
    hint: "Acceleration Factor initial value for the Short direction",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }, {
    name: "accelerationShort",
    displayName: "AF Short",
    defaultValue: 0.02,
    hint: "Acceleration Factor for the Short direction",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }, {
    name: "accelerationMaxShort",
    displayName: "AF Max Short",
    defaultValue: 0.2,
    hint: "Acceleration Factor maximum value for the Short direction",
    type: "number",
    range: {
      min: 0,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, B0 = {
  name: "SIN",
  camelCaseName: "sin",
  group: "Math Transform",
  description: "Vector Trigonometric Sin",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, V0 = {
  name: "SINH",
  camelCaseName: "sinh",
  group: "Math Transform",
  description: "Vector Trigonometric Sinh",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, xo = {
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
}, z0 = {
  name: "SQRT",
  camelCaseName: "sqrt",
  group: "Math Transform",
  description: "Vector Square Root",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, W0 = {
  name: "STDDEV",
  camelCaseName: "stdDev",
  group: "Statistic Functions",
  description: "Standard Deviation",
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
    name: "nbDev",
    displayName: "Deviations",
    defaultValue: 1,
    hint: "Nb of deviations",
    type: "number",
    range: {
      min: -3e37,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, bo = {
  name: "STOCH",
  camelCaseName: "stoch",
  group: "Momentum Indicators",
  description: "Stochastic",
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
    name: "fastK_Period",
    displayName: "Fast-K Period",
    defaultValue: 5,
    hint: "Time period for building the Fast-K line",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }, {
    name: "slowK_Period",
    displayName: "Slow-K Period",
    defaultValue: 3,
    hint: "Smoothing for making the Slow-K line. Usually set to 3",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }, {
    name: "slowK_MAType",
    displayName: "Slow-K MA",
    defaultValue: 0,
    hint: "Type of Moving Average for Slow-K",
    type: "MAType"
  }, {
    name: "slowD_Period",
    displayName: "Slow-D Period",
    defaultValue: 3,
    hint: "Smoothing for making the Slow-D line",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }, {
    name: "slowD_MAType",
    displayName: "Slow-D MA",
    defaultValue: 0,
    hint: "Type of Moving Average for Slow-D",
    type: "MAType"
  }],
  outputs: [{
    name: "slowK",
    type: "number",
    plot: "line_dash"
  }, {
    name: "slowD",
    type: "number",
    plot: "line_dash"
  }]
}, F0 = {
  name: "STOCHF",
  camelCaseName: "stochF",
  group: "Momentum Indicators",
  description: "Stochastic Fast",
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
    name: "fastK_Period",
    displayName: "Fast-K Period",
    defaultValue: 5,
    hint: "Time period for building the Fast-K line",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }, {
    name: "fastD_Period",
    displayName: "Fast-D Period",
    defaultValue: 3,
    hint: "Smoothing for making the Fast-D line. Usually set to 3",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }, {
    name: "fastD_MAType",
    displayName: "Fast-D MA",
    defaultValue: 0,
    hint: "Type of Moving Average for Fast-D",
    type: "MAType"
  }],
  outputs: [{
    name: "fastK",
    type: "number",
    plot: "line"
  }, {
    name: "fastD",
    type: "number",
    plot: "line"
  }]
}, G0 = {
  name: "STOCHRSI",
  camelCaseName: "stochRsi",
  group: "Momentum Indicators",
  description: "Stochastic Relative Strength Index",
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
  }, {
    name: "fastK_Period",
    displayName: "Fast-K Period",
    defaultValue: 5,
    hint: "Time period for building the Fast-K line",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }, {
    name: "fastD_Period",
    displayName: "Fast-D Period",
    defaultValue: 3,
    hint: "Smoothing for making the Fast-D line. Usually set to 3",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }, {
    name: "fastD_MAType",
    displayName: "Fast-D MA",
    defaultValue: 0,
    hint: "Type of Moving Average for Fast-D",
    type: "MAType"
  }],
  outputs: [{
    name: "fastK",
    type: "number",
    plot: "line"
  }, {
    name: "fastD",
    type: "number",
    plot: "line"
  }]
}, Y0 = {
  name: "SUB",
  camelCaseName: "sub",
  group: "Math Operators",
  description: "Vector Arithmetic Substraction",
  inputs: [{
    name: "inReal0",
    type: "number"
  }, {
    name: "inReal1",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, q0 = {
  name: "SUM",
  camelCaseName: "sum",
  group: "Math Operators",
  description: "Summation",
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
}, X0 = {
  name: "T3",
  camelCaseName: "t3",
  group: "Overlap Studies",
  description: "Triple Exponential Moving Average (T3)",
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
    name: "VFactor",
    displayName: "Volume Factor",
    defaultValue: 0.7,
    hint: "Volume Factor",
    type: "number",
    range: {
      min: 0,
      max: 1
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, K0 = {
  name: "TAN",
  camelCaseName: "tan",
  group: "Math Transform",
  description: "Vector Trigonometric Tan",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, j0 = {
  name: "TANH",
  camelCaseName: "tanh",
  group: "Math Transform",
  description: "Vector Trigonometric Tanh",
  inputs: [{
    name: "inReal",
    type: "number"
  }],
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Z0 = {
  name: "TEMA",
  camelCaseName: "tema",
  group: "Overlap Studies",
  description: "Triple Exponential Moving Average",
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
}, J0 = {
  name: "TRANGE",
  camelCaseName: "trueRange",
  group: "Volatility Indicators",
  description: "True Range",
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
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, Q0 = {
  name: "TRIMA",
  camelCaseName: "trima",
  group: "Overlap Studies",
  description: "Triangular Moving Average",
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
}, em = {
  name: "TRIX",
  camelCaseName: "trix",
  group: "Momentum Indicators",
  description: "1-day Rate-Of-Change (ROC) of a Triple Smooth EMA",
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
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, tm = {
  name: "TSF",
  camelCaseName: "tsf",
  group: "Statistic Functions",
  description: "Time Series Forecast",
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
}, im = {
  name: "TYPPRICE",
  camelCaseName: "typPrice",
  group: "Price Transform",
  description: "Typical Price",
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
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, sm = {
  name: "ULTOSC",
  camelCaseName: "ultOsc",
  group: "Momentum Indicators",
  description: "Ultimate Oscillator",
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
    name: "timePeriod1",
    displayName: "First Period",
    defaultValue: 7,
    hint: "Number of bars for 1st period.",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }, {
    name: "timePeriod2",
    displayName: "Second Period",
    defaultValue: 14,
    hint: "Number of bars fro 2nd period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }, {
    name: "timePeriod3",
    displayName: "Third Period",
    defaultValue: 28,
    hint: "Number of bars for 3rd period",
    type: "number",
    range: {
      min: 1,
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, nm = {
  name: "VAR",
  camelCaseName: "variance",
  group: "Statistic Functions",
  description: "Variance",
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
      min: 1,
      max: 1e5
    }
  }, {
    name: "nbDev",
    displayName: "Deviations",
    defaultValue: 1,
    hint: "Nb of deviations",
    type: "number",
    range: {
      min: -3e37,
      max: 3e37
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, rm = {
  name: "WCLPRICE",
  camelCaseName: "wclPrice",
  group: "Price Transform",
  description: "Weighted Close Price",
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
  options: [],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, om = {
  name: "WILLR",
  camelCaseName: "willR",
  group: "Momentum Indicators",
  description: "Williams' %R",
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
      max: 1e5
    }
  }],
  outputs: [{
    name: "output",
    type: "number",
    plot: "line"
  }]
}, am = {
  name: "WMA",
  camelCaseName: "wma",
  group: "Overlap Studies",
  description: "Weighted Moving Average",
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
}, gm = {
  ACCBANDS: pu,
  ACOS: gu,
  AD: fu,
  ADD: yu,
  ADOSC: vu,
  ADX: wu,
  ADXR: xu,
  APO: bu,
  AROON: fo,
  AROONOSC: Cu,
  ASIN: Tu,
  ATAN: Eu,
  ATR: Su,
  AVGDEV: Pu,
  AVGPRICE: Mu,
  BBANDS: yo,
  BETA: Au,
  BOP: Lu,
  CCI: Ou,
  CDL2CROWS: Nu,
  CDL3BLACKCROWS: Iu,
  CDL3INSIDE: Du,
  CDL3LINESTRIKE: Ru,
  CDL3OUTSIDE: ku,
  CDL3STARSINSOUTH: _u,
  CDL3WHITESOLDIERS: Hu,
  CDLABANDONEDBABY: $u,
  CDLADVANCEBLOCK: Uu,
  CDLBELTHOLD: Bu,
  CDLBREAKAWAY: Vu,
  CDLCLOSINGMARUBOZU: zu,
  CDLCONCEALBABYSWALL: Wu,
  CDLCOUNTERATTACK: Fu,
  CDLDARKCLOUDCOVER: Gu,
  CDLDOJI: Yu,
  CDLDOJISTAR: qu,
  CDLDRAGONFLYDOJI: Xu,
  CDLENGULFING: Ku,
  CDLEVENINGDOJISTAR: ju,
  CDLEVENINGSTAR: Zu,
  CDLGAPSIDESIDEWHITE: Ju,
  CDLGRAVESTONEDOJI: Qu,
  CDLHAMMER: ed,
  CDLHANGINGMAN: td,
  CDLHARAMI: sd,
  CDLHARAMICROSS: nd,
  CDLHIGHWAVE: rd,
  CDLHIKKAKE: od,
  CDLHIKKAKEMOD: ad,
  CDLHOMINGPIGEON: ld,
  CDLIDENTICAL3CROWS: hd,
  CDLINNECK: cd,
  CDLINVERTEDHAMMER: ud,
  CDLKICKING: dd,
  CDLKICKINGBYLENGTH: md,
  CDLLADDERBOTTOM: pd,
  CDLLONGLEGGEDDOJI: gd,
  CDLLONGLINE: fd,
  CDLMARUBOZU: yd,
  CDLMATCHINGLOW: vd,
  CDLMATHOLD: wd,
  CDLMORNINGDOJISTAR: xd,
  CDLMORNINGSTAR: bd,
  CDLONNECK: Cd,
  CDLPIERCING: Td,
  CDLRICKSHAWMAN: Ed,
  CDLRISEFALL3METHODS: Sd,
  CDLSEPARATINGLINES: Pd,
  CDLSHOOTINGSTAR: Md,
  CDLSHORTLINE: Ad,
  CDLSPINNINGTOP: Ld,
  CDLSTALLEDPATTERN: Od,
  CDLSTICKSANDWICH: Nd,
  CDLTAKURI: Id,
  CDLTASUKIGAP: Dd,
  CDLTHRUSTING: Rd,
  CDLTRISTAR: kd,
  CDLUNIQUE3RIVER: _d,
  CDLUPSIDEGAP2CROWS: Hd,
  CDLXSIDEGAP3METHODS: $d,
  CEIL: Ud,
  CMO: Bd,
  CORREL: Vd,
  COS: zd,
  COSH: Wd,
  DEMA: Fd,
  DIV: Gd,
  DX: Yd,
  EMA: vo,
  EXP: qd,
  FLOOR: Xd,
  HT_DCPERIOD: Kd,
  HT_DCPHASE: jd,
  HT_PHASOR: Zd,
  HT_SINE: Jd,
  HT_TRENDLINE: Qd,
  HT_TRENDMODE: e0,
  IMI: t0,
  KAMA: i0,
  LINEARREG: s0,
  LINEARREG_ANGLE: n0,
  LINEARREG_INTERCEPT: r0,
  LINEARREG_SLOPE: o0,
  LN: a0,
  LOG10: l0,
  MA: h0,
  MACD: c0,
  MACDEXT: u0,
  MACDFIX: d0,
  MAMA: m0,
  MAVP: p0,
  MAX: g0,
  MAXINDEX: f0,
  MEDPRICE: y0,
  MFI: v0,
  MIDPOINT: w0,
  MIDPRICE: x0,
  MIN: b0,
  MININDEX: C0,
  MINMAX: T0,
  MINMAXINDEX: E0,
  MINUS_DI: S0,
  MINUS_DM: P0,
  MOM: M0,
  MULT: A0,
  NATR: L0,
  OBV: O0,
  PLUS_DI: N0,
  PLUS_DM: I0,
  PPO: D0,
  ROC: R0,
  ROCP: k0,
  ROCR: _0,
  ROCR100: H0,
  RSI: wo,
  SAR: $0,
  SAREXT: U0,
  SIN: B0,
  SINH: V0,
  SMA: xo,
  SQRT: z0,
  STDDEV: W0,
  STOCH: bo,
  STOCHF: F0,
  STOCHRSI: G0,
  SUB: Y0,
  SUM: q0,
  T3: X0,
  TAN: K0,
  TANH: j0,
  TEMA: Z0,
  TRANGE: J0,
  TRIMA: Q0,
  TRIX: em,
  TSF: tm,
  TYPPRICE: im,
  ULTOSC: sm,
  VAR: nm,
  WCLPRICE: rm,
  WILLR: om,
  WMA: am
};
class Vs extends He {
  name = "Aroon";
  shortName = "AROON";
  libName = "AROON";
  definition = {
    input: {
      high: [],
      low: [],
      timePeriod: 14
    },
    output: {
      aroonDown: [],
      aroonUp: []
    }
  };
  #e = {
    downStroke: "#c80",
    downLineWidth: "1",
    downLineDash: void 0,
    upStroke: "#08c",
    upLineWidth: "1",
    upLineDash: void 0,
    fillStyle: "#0080c044"
  };
  precision = 2;
  scaleOverlay = !0;
  plots = [
    { key: "AROON_1", title: "AROON", type: "line" }
  ];
  static inCnt = 0;
  static primaryPane = !1;
  static scale = Ke[1];
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a);
    const l = a.overlay;
    this.id = a.overlay?.id || ee(this.shortName), this.defineIndicator(l?.settings, fo), this.style = l?.settings?.style ? { ...this.#e, ...l.settings.style } : { ...this.#e, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return Vs.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const i = {};
    let s = [!1, !1], { c: n, colours: r } = super.legendInputs(e);
    return i.Dn = this.scale.nicePrice(this.overlay.data[n][1]), i.Up = this.scale.nicePrice(this.overlay.data[n][2]), r = [
      this.style.downStroke,
      this.style.upStroke
    ], { inputs: i, colours: r, labels: s };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2)
      return;
    if (!super.mustUpdate())
      return !1;
    this.scene.clear();
    const i = { down: [], up: [] }, s = this.overlay.data, r = {
      w: this.xAxis.candleW
    };
    let a = e.value(e.indexStart)[0], l = this.overlay.data[0][0], h = (a - l) / e.interval, m = this.Timeline.rangeScrollOffset, g = e.Length + m + 2, v = {};
    for (; g; )
      h < 0 || h >= this.overlay.data.length ? (i.down.push({ x: null, y: null }), i.up.push({ x: null, y: null })) : (r.x = this.xAxis.xPos(s[h][0]), r.y = this.yAxis.yPos(s[h][1]), i.down.push({ ...r }), r.x = this.xAxis.xPos(s[h][0]), r.y = this.yAxis.yPos(s[h][2]), i.up.push({ ...r })), h++, g--;
    v = {
      width: this.style.LineWidth,
      stroke: this.style.downStroke,
      dash: this.style.downLineDash
    }, this.plot(i.down, "renderLine", v), v = {
      width: this.style.upLineWidth,
      stroke: this.style.upStroke,
      dash: this.style.upLineDash
    }, this.plot(i.up, "renderLine", v), this.target.viewport.render(), super.updated();
  }
}
class zs extends He {
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
  #e = {
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
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a);
    const l = a.overlay;
    this.id = a.overlay?.id || ee(this.shortName), this.defineIndicator(l?.settings, yo), this.style = l?.settings?.style ? { ...this.#e, ...l.settings.style } : { ...this.#e, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return zs.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const i = {};
    let s = [!1, !1, !1], { c: n, colours: r } = super.legendInputs(e);
    return i.Hi = this.scale.nicePrice(this.overlay.data[n][1]), i.Mid = this.scale.nicePrice(this.overlay.data[n][2]), i.Lo = this.scale.nicePrice(this.overlay.data[n][3]), r = [
      this.style.upperStroke,
      this.style.middleStroke,
      this.style.lowerStroke
    ], { inputs: i, colours: r, labels: s };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2)
      return;
    if (!super.mustUpdate())
      return !1;
    this.scene.clear();
    const i = { lower: [], middle: [], upper: [] }, s = this.overlay.data, r = {
      w: this.xAxis.candleW
    };
    let a = e.value(e.indexStart)[0], l = this.overlay.data[0][0], h = (a - l) / e.interval, m = this.Timeline.rangeScrollOffset, g = e.Length + m * 2 + 2, v = {};
    for (; g; )
      h < 0 || h >= this.overlay.data.length ? (i.lower.push({ x: null, y: null }), i.middle.push({ x: null, y: null }), i.upper.push({ x: null, y: null })) : (r.x = this.xAxis.xPos(s[h][0]), r.y = this.yAxis.yPos(s[h][1]), i.lower.push({ ...r }), r.x = this.xAxis.xPos(s[h][0]), r.y = this.yAxis.yPos(s[h][2]), i.middle.push({ ...r }), r.x = this.xAxis.xPos(s[h][0]), r.y = this.yAxis.yPos(s[h][3]), i.upper.push({ ...r })), h++, g--;
    v = {
      width: this.style.lowerLineWidth,
      stroke: this.style.lowerStroke,
      dash: this.style.lowerLineDash
    }, this.plot(i.lower, "renderLine", v), v = {
      width: this.style.middleLineWidth,
      stroke: this.style.middleStroke,
      dash: this.style.middleLineDash
    }, this.plot(i.middle, "renderLine", v), v = {
      width: this.style.upperLineWidth,
      stroke: this.style.upperStroke,
      dash: this.style.upperLineDash
    }, this.plot(i.upper, "renderLine", v), this.target.viewport.render(), super.updated();
  }
}
class Ii extends He {
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
  #e = {
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
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), Ii.inCnt++;
    const l = a.overlay;
    this.id = a.overlay?.id || ee(this.shortName), this.defineIndicator(l?.settings, vo), this.style = l?.settings?.style ? { ...this.#e, ...l.settings.style } : { ...this.#e, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return Ii.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  updateLegend() {
    this.parent.legend.update();
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const i = {}, { c: s, colours: n } = super.legendInputs(e);
    return i.EMA_1 = this.scale.nicePrice(this.overlay.data[s][1]), { inputs: i, colours: n };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2)
      return;
    if (!super.mustUpdate())
      return !1;
    this.scene.clear();
    const i = this.overlay.data, s = this.xAxis.candleW, n = [];
    this.xAxis.smoothScrollOffset;
    const r = {
      w: s
    };
    let a = this.Timeline.rangeScrollOffset, l = e.data.length - this.overlay.data.length, h = e.indexStart - l - 2, m = e.Length + a * 2 + 2;
    for (; m; )
      h < 0 || h >= this.overlay.data.length ? n.push({ x: null, y: null }) : (r.x = this.xAxis.xPos(i[h][0]), r.y = this.yAxis.yPos(i[h][1]), n.push({ ...r })), h++, m--;
    this.plot(n, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
class Ws extends He {
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
  #e = {
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
  static scale = Ke[1];
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a);
    const l = a.overlay;
    this.id = a.overlay?.id || ee(this.shortName), this.defineIndicator(l?.settings, wo), this.style = l?.settings?.style ? { ...this.#e, ...l.settings.style } : { ...this.#e, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return Ws.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const i = {}, { c: s, colours: n } = super.legendInputs(e);
    return i.RSI_1 = this.scale.nicePrice(this.overlay.data[s][1]), { inputs: i, colours: n };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2 || !super.mustUpdate())
      return !1;
    this.scene.clear();
    const i = this.scene.width + this.xAxis.bufferPx * 2, s = this.yAxis.yPos(this.style?.high || this.style.defaultHigh), n = this.yAxis.yPos(this.style?.low || this.style.defaultLow), r = [0, s, this.scene.width, n - s];
    let a = { fill: this.style.highLowRangeStyle };
    if (this.plot(r, "renderRect", a), r.length = 0, r[0] = { x: 0, y: s }, r[1] = { x: i, y: s }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }, this.plot(r, "renderLine", a), r.length = 0, r[0] = { x: 0, y: n }, r[1] = { x: i, y: n }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
      dash: [1, 1]
    }, this.plot(r, "renderLine", a), this.overlay.data.length < 2)
      return this.target.viewport.render(), !1;
    const l = this.overlay.data, h = this.xAxis.candleW;
    r.length = 0, this.Timeline.smoothScrollOffset;
    const m = {
      w: h
    };
    let g = this.Timeline.rangeScrollOffset, v = e.data.length - this.overlay.data.length, S = e.indexStart - v - 2, A = e.Length + g * 2 + 2, L = 0;
    for (; A; )
      S < 0 || S >= this.overlay.data.length || (L > l[S][0] && console.log(S, L, l[S][0]), L = l[S][0], m.x = this.xAxis.xPos(l[S][0]), m.y = this.yAxis.yPos(l[S][1]), r.push({ ...m })), S++, A--;
    this.plot(r, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
class Di extends He {
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
  #e = {
    stroke: "#C80",
    width: "1"
  };
  #t = 2;
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
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a), Di.inCnt++;
    const l = a.overlay;
    this.id = a.overlay?.id || ee(this.shortName), this.defineIndicator(l?.settings, xo), this.style = l?.settings?.style ? { ...this.#e, ...l.settings.style } : { ...this.#e, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return Di.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  updateLegend() {
    this.parent.legend.update();
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const i = {}, { c: s, colours: n } = super.legendInputs(e);
    return i.SMA_1 = this.scale.nicePrice(this.overlay.data[s][1]), { inputs: i, colours: n };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2 || !super.mustUpdate())
      return;
    this.scene.clear();
    const i = this.overlay.data, s = this.xAxis.candleW, n = [];
    this.xAxis.smoothScrollOffset;
    const r = {
      w: s
    };
    let a = this.Timeline.rangeScrollOffset, l = e.data.length - this.overlay.data.length, h = e.indexStart - l - 2, m = e.Length + a * 2 + 2;
    for (; m; )
      h < 0 || h >= this.overlay.data.length ? n.push({ x: null, y: null }) : (r.x = this.xAxis.xPos(i[h][0]), r.y = this.yAxis.yPos(i[h][1]), n.push({ ...r })), h++, m--;
    this.plot(n, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
class Fs extends He {
  name = "Stochastic Oscillator";
  shortName = "STOCH";
  libName = "STOCH";
  definition = {
    input: {
      high: [],
      low: [],
      close: [],
      fastK_Period: 5,
      slowK_Period: 3,
      slowD_Period: 3
    },
    output: {
      slowK: [],
      slowD: []
    }
  };
  #e = {
    slowKStroke: "#8C0",
    slowKLineWidth: "1",
    slowKLineDash: void 0,
    slowDStroke: "#00C",
    slowDLineWidth: "1",
    slowDLineDash: void 0,
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
    { key: "STOCH_1", title: " ", type: "line" }
  ];
  static inCnt = 0;
  static primaryPane = !1;
  static scale = Ke[1];
  constructor(e, i = !1, s = !1, n, r, a) {
    super(e, i, s, n, r, a);
    const l = a.overlay;
    this.id = a.overlay?.id || ee(this.shortName), this.defineIndicator(l?.settings, bo), this.style = l?.settings?.style ? { ...this.#e, ...l.settings.style } : { ...this.#e, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (h) => {
      this.newValue(h);
    }, this.setUpdateValue = (h) => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return Fs.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const i = {};
    let s = [!1, !1, !1], { c: n, colours: r } = super.legendInputs(e);
    return i.SlowK = this.scale.nicePrice(this.overlay.data[n][1]), i.SlowD = this.scale.nicePrice(this.overlay.data[n][1]), r = [
      this.style.slowD,
      this.style.slowK
    ], { inputs: i, colours: r, labels: s };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2 || !super.mustUpdate())
      return !1;
    this.scene.clear();
    const i = this.scene.width + this.xAxis.bufferPx * 2, s = this.yAxis.yPos(this.style.defaultHigh), n = this.yAxis.yPos(this.style.defaultLow);
    let r = [0, s, this.scene.width, n - s], a = { fill: this.style.highLowRangeStyle };
    if (this.plot(r, "renderRect", a), r.length = 0, r[0] = { x: 0, y: s }, r[1] = { x: i, y: s }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }, this.plot(r, "renderLine", a), r.length = 0, r[0] = { x: 0, y: n }, r[1] = { x: i, y: n }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
      dash: [1, 1]
    }, this.plot(r, "renderLine", a), this.overlay.data.length < 2)
      return this.target.viewport.render(), !1;
    r = { slowD: [], slowK: [] };
    const l = this.overlay.data, m = {
      w: this.xAxis.candleW
    };
    let g = e.value(e.indexStart)[0], v = this.overlay.data[0][0], S = (g - v) / e.interval, A = this.Timeline.rangeScrollOffset, L = e.Length + A * 2 + 2;
    for (; L; )
      S < 0 || S >= this.overlay.data.length ? (r.slowD.push({ x: null, y: null }), r.slowK.push({ x: null, y: null })) : (m.x = this.xAxis.xPos(l[S][0]), m.y = this.yAxis.yPos(l[S][1]), r.slowK.push({ ...m }), m.x = this.xAxis.xPos(l[S][0]), m.y = this.yAxis.yPos(l[S][2]), r.slowD.push({ ...m })), S++, L--;
    a = {
      width: this.style.slowKLineWidth,
      stroke: this.style.slowKStroke,
      dash: this.style.slowKLineDash
    }, this.plot(r.slowK, "renderLine", a), a = {
      width: this.style.slowDLineWidth,
      stroke: this.style.slowDStroke,
      dash: this.style.slowDLineDash
    }, this.plot(r.slowD, "renderLine", a), this.target.viewport.render(), super.updated();
  }
}
const Co = {
  AROON: { id: "AROON", name: "Aroon", event: "addIndicator", ind: Vs },
  BB: { id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: zs },
  EMA: { id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: Ii },
  RSI: { id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: Ws },
  SMA: { id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: Di },
  STOCH: { id: "STOCH", name: "Stochastic Oscillator", event: "addIndicator", ind: Fs }
};
class lm {
  #e = "Utilities";
  #t = "utils";
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c = {};
  #a = {};
  #h;
  #d = {};
  constructor(e, i) {
    this.#n = e, this.#r = i, this.#i = e.elUtils, this.#s = e.config?.utilsBar || mu, this.#l = e.WidgetsG, this.#o = e.indicatorClasses || Co, this.init();
  }
  log(e) {
    this.#n.log(e);
  }
  info(e) {
    this.#n.info(e);
  }
  warn(e) {
    this.#n.warn(e);
  }
  error(e) {
    this.#n.error(e);
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get core() {
    return this.#n;
  }
  get options() {
    return this.#r;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#i);
  }
  get stateMachine() {
    return this.#h;
  }
  init() {
    this.#i.innerHTML = this.#i.defaultNode(this.#s), this.log(`${this.#e} instantiated`);
  }
  start() {
    this.initAllUtils(), this.eventsListen();
  }
  destroy() {
    const e = this.#n, i = R.findBySelectorAll(`#${e.id} .${Ka} .icon-wrapper`);
    for (let s of i) {
      let n = s.id.replace("TX_", "");
      for (let r of this.#s)
        r.id === n && s.removeEventListener("click", this.#a[n].click), s.removeEventListener("pointerover", this.#a[n].pointerover), s.removeEventListener("pointerout", this.#a[n].pointerout);
    }
    this.off("utils_indicators", this.onIndicators), this.off("utils_timezone", this.onTimezone), this.off("utils_settings", this.onSettings), this.off("utils_screenshot", this.onScreenshot);
  }
  eventsListen() {
    this.on("utils_indicators", this.onIndicators, this), this.on("utils_timezone", this.onTimezone, this), this.on("utils_settings", this.onSettings, this), this.on("utils_screenshot", this.onScreenshot, this);
  }
  on(e, i, s) {
    this.#n.on(e, i, s);
  }
  off(e, i) {
    this.#n.off(e, i);
  }
  emit(e, i) {
    this.#n.emit(e, i);
  }
  onIconClick(e) {
    const i = R.findTargetParentWithClass(e.target, "icon-wrapper");
    if (!b(i))
      return !1;
    const s = Date.now();
    if (s - this.#d[i.id] < 1e3)
      return !1;
    this.#d[i.id] = s;
    let n = i.dataset.event, r = i.dataset.menu || !1, a = {
      target: i.id,
      menu: r,
      evt: n
    }, l = i.dataset.action;
    this.emit(n, a), r ? this.emit("menu_open", a) : this.emit("util_selected", a), l && l(a, this.#n);
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = dt.COLOUR_ICONHOVER;
  }
  onIconOut(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = dt.COLOUR_ICON;
  }
  initAllUtils() {
    const e = this.#i.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      this.#d[i.id] = 0;
      let s = i.id.replace("TX_", ""), n = i.querySelector("svg");
      n.style.fill = dt.COLOUR_ICON, n.style.height = "90%";
      for (let r of this.#s)
        if (r.id === s && (this.#a[s] = {}, this.#a[s].click = this.onIconClick.bind(this), this.#a[s].pointerover = this.onIconOver.bind(this), this.#a[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#a[s].click), i.addEventListener("pointerover", this.#a[s].pointerover), i.addEventListener("pointerout", this.#a[s].pointerout), s === "indicators" && (r.sub = Object.values(this.#o)), r?.sub)) {
          let a = {
            content: r.sub,
            primary: i
          }, l = this.#l.insert("Menu", a);
          i.dataset.menu = l.id, l.start();
        }
    }
  }
  onIndicators(e) {
  }
  onTimezone(e) {
    this.#n.notImplemented();
  }
  onSettings(e) {
    this.#n.notImplemented();
  }
  onScreenshot(e) {
    this.#n.downloadImage();
  }
}
const hm = 150;
class ye {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a = {};
  static menuList = {};
  static menuCnt = 0;
  static class = Pn;
  static name = "Menus";
  static type = "Menu";
  static currentActive;
  static create(e, i) {
    const s = `menu_${++ye.menuCnt}`;
    return i.id = s, ye.menuList[s] = new ye(e, i), ye.menuList[s];
  }
  static destroy(e) {
    ye.menuList[e].end(), delete ye.menuList[e];
  }
  constructor(e, i) {
    this.#t = e, this.#n = i.core, this.#r = i, this.#e = i.id, this.#s = e.elements.elMenus, this.#i = this.#n.elWidgetsG, this.init();
  }
  get el() {
    return this.#l;
  }
  get id() {
    return this.#e;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return R.elementDimPos(this.#l);
  }
  get type() {
    return ye.type;
  }
  init() {
    this.mount(this.#s);
  }
  start() {
    this.position(), this.eventsListen();
  }
  end() {
    this.#s.querySelectorAll(`#${this.id} li`).forEach((i) => {
      i.removeEventListener("click", this.#a[this.id][i.id]);
    }), document.removeEventListener("click", this.#a[this.id].outside), this.off("global_resize", this.onResize);
  }
  eventsListen() {
    const e = this.#s.querySelectorAll(`#${this.id} li`);
    this.#a[this.id] = {}, e.forEach((i) => {
      this.#a[this.id][i.id] = this.onMenuSelect.bind(this), i.addEventListener("click", this.#a[this.id][i.id]);
    }), this.on("global_resize", this.onResize, this);
  }
  on(e, i, s) {
    this.#n.on(e, i, s);
  }
  off(e, i) {
    this.#n.off(e, i);
  }
  emit(e, i) {
    this.#n.emit(e, i);
  }
  onMenuSelect(e) {
    let i = e.currentTarget.dataset.event, s = {
      target: e.currentTarget.id,
      menu: this.#e,
      evt: i
    };
    this.emit("menuItem_selected", s), this.emit("menu_close", s), this.#n.log(`menu_close: ${this.#e}`);
  }
  onOutsideClickListener(e) {
    if (!this.#l.contains(e.target) && !this.#r.primary.contains(e.target) && R.isVisible(this.#l)) {
      let i = {
        target: e.currentTarget.id,
        menu: this.#e
      };
      this.emit("menu_close", i);
    }
    document.removeEventListener("click", this.#a[this.id].outside);
  }
  onResize() {
    this.position();
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.menuNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#l = this.#s.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${Pn}" style=""></div>
    `;
  }
  menuNode() {
    const e = this.#r, i = `position: absolute; z-index: 1000; display: none; border: 1px solid ${Qi.COLOUR_BORDER}; background: ${Qi.COLOUR_BG}; color: ${Qi.COLOUR_TXT}; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;`;
    let s = this.content(e);
    return `
      <div id="${e.id}" class="${ja}" style="${i}">
        ${s}
      </div>
    `;
  }
  content(e) {
    const i = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${hm}px`, s = "padding: .25em 1em .25em 1em; white-space: nowrap;", n = "display: inline-block; width: 4em;", r = "cursor: pointer;", a = `onmouseover="this.style.background ='#222'"`, l = `onmouseout="this.style.background ='none'"`;
    let h = `<ul style="${i}">`;
    if (e?.content)
      for (let m of e.content)
        h += `<li id="${m.id}" data-event="${m.event}" style="${s} ${r}" ${a} ${l}><a style="${r}"><span style="${n}">${m.id}</span><span>${m.name}</span></li></a>`;
    return h += "</ul>", h;
  }
  position() {
    let e = this.#i.getBoundingClientRect(), i = this.#r.primary.getBoundingClientRect(), s = Math.round(i.left - e.left), n = Math.round(i.bottom - e.top);
    this.#l.style.left = s + "px", this.#l.style.top = n + "px";
    let r = R.elementDimPos(this.#l);
    if (r.right > this.#i.offsetWidth) {
      let l = Math.floor(this.#i.offsetWidth - r.width);
      l = U(l, 0, this.#i.offsetWidth), this.#l.style.left = `${l}px`;
    }
    if (this.#n.MainPane.rowsH + n + r.height > this.#n.MainPane.rowsH) {
      let l = Math.floor(r.height * -1);
      l = U(l, this.#n.MainPane.rowsH * -1, 0), this.#l.style.top = `${l}px`;
    }
  }
  remove() {
  }
  open() {
    if (ye.currentActive === this)
      return !0;
    ye.currentActive = this, this.#l.style.display = "block", this.position(), setTimeout(() => {
      this.#a[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#a[this.id].outside);
    }, 250);
  }
  close() {
    ye.currentActive = null, this.#l.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class rt {
  static opened = new rt("opened");
  static closed = new rt("closed");
  constructor(e) {
    this.name = e;
  }
}
class oe {
  #e;
  #t;
  #n;
  #r;
  #i = rt.closed;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u;
  #m;
  #y;
  #g;
  #b;
  #w = !1;
  #p = {};
  static windowList = {};
  static windowCnt = 0;
  static class = An;
  static name = "Windows";
  static type = "Window";
  static currentActive = null;
  static create(e, i) {
    const s = `window_${++oe.windowCnt}`;
    i.id = s;
    const n = {
      window: { "box-shadow": "rgb(0,0,0) 0px 20px 30px -10px" },
      content: { padding: "1em" }
    };
    return i.styles = b(i?.styles) ? { ...n, ...i.styles } : n, i.class = i?.class || "window", oe.windowList[s] = new oe(e, i), oe.windowList[s];
  }
  static destroy(e) {
    oe.windowList[e].destroy(), delete oe.windowList[e];
  }
  constructor(e, i) {
    this.#t = e, this.#n = i.core, this.#r = i, this.#e = i.id, this.#l = e.elements.elWindows, this.#s = this.#n.elWidgetsG, this.init();
  }
  get id() {
    return this.#e;
  }
  get pos() {
    return this.dimensions;
  }
  get config() {
    return this.#r;
  }
  set config(e) {
    this.#r = e;
  }
  get state() {
    return this.#i;
  }
  get dimensions() {
    return R.elementDimPos(this.#o);
  }
  set dimensions(e) {
    this.setDimensions(e);
  }
  get type() {
    return oe.type;
  }
  get el() {
    return this.#o;
  }
  get elDragBar() {
    return this.#c;
  }
  get elTitle() {
    return this.#a;
  }
  get elCloseIcon() {
    return this.#h;
  }
  get elContent() {
    return this.#d;
  }
  init() {
    this.mount(this.#l);
  }
  start() {
    this.eventsListen(), this.close();
  }
  destroy() {
    this.off("closeWindow", this.onCloseWindow, this), this.off("global_resize", this.onGlobalResize, this), this.el.remove();
  }
  eventsListen() {
    this.on("closeWindow", this.onCloseWindow, this), this.on("global_resize", this.onGlobalResize, this);
  }
  on(e, i, s) {
    this.#n.on(e, i, s);
  }
  off(e, i) {
    this.#n.off(e, i);
  }
  emit(e, i) {
    this.#n.emit(e, i);
  }
  onGlobalResize(e) {
    const i = this.dimensions, s = {
      position: { x: i.left, y: i.top },
      dimensions: { w: i.w, h: i.h }
    };
    i.w > e.width && (s.position.x = e.width), i.h > e.height && (s.position.y = e.height), i.left + s.dimensions.w, i.bottom + s.dimensions.h, i.x < 0 ? s.position.x = 0 : i.x + s.dimensions.w > e.width && (s.position.x -= e.width), this.setProperties(s);
  }
  onOutsideClickListener(e) {
    if (!this.#o.contains(e.target) && R.isVisible(this.#o) && !this.#w) {
      let i = {
        target: e.currentTarget.id,
        window: this.#e
      };
      this.emit("closeWindow", i), document.removeEventListener("click", this.#p.click), delete this.#p.click;
    }
  }
  onCloseWindow(e) {
    e.window === this.#e && this.close();
  }
  onWindow(e) {
    e.stopPropagation();
  }
  onDragBar(e) {
    this.#w = !0;
    let i = this.#o.offsetLeft + e.movement.x, s = this.#o.offsetTop + e.movement.y;
    this.position({ x: i, y: s });
  }
  onDragBarEnd(e) {
    setTimeout(() => {
      this.#w = !1;
    }, 250);
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.windowNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#o = this.#l.querySelector(`#${this.#r.id}`), this.#c = this.#o.querySelector(".dragBar"), this.#a = this.#o.querySelector(".title"), this.#h = this.#o.querySelector(".closeIcon"), this.#d = this.#o.querySelector(".content"), this.#o.addEventListener("click", this.onWindow.bind(this)), R.isElement(this.#c) && (this.#b = new Le(this.#c, { disableContextMenu: !1 }), this.#b.on("pointerdrag", this.onDragBar.bind(this)), this.#b.on("pointerdragend", this.onDragBarEnd.bind(this)));
    const i = this.dimensions, s = this.#r?.w || i.w, n = this.#r?.h || i.h;
    this.setDimensions({ w: s, h: n }), this.position();
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${An}" style=""></div>
    `;
  }
  windowNode() {
    const e = this.#r;
    let i = `position: absolute; z-index: 100; display: block; border: 1px solid ${es.COLOUR_BORDER}; background: ${es.COLOUR_BG}; color: ${es.COLOUR_TXT}; box-shadow: rgb(0,0,0) 0px 20px 30px -10px;`, s = this.config?.styles?.window;
    for (let m in s)
      i += `${m}: ${s[m]}; `;
    let n = e.dragBar ? this.dragBar(e) : "", r = !e.dragBar && e.title ? this.title(e) : "", a = this.content(e), l = this.closeIcon(e);
    return `
      <div id="${e.id}" class="${Za} ${this.#r.class}" style="${i}">
          ${n}
          ${r}
          ${l}
          ${a}
        </div>
      </div>
    `;
  }
  content(e) {
    let i = this.config?.styles?.content, s = "";
    for (let a in i)
      s += `${a}: ${i[a]}; `;
    let n = e?.content ? e.content : "";
    return `
      <div class="content" style="${s}">
        ${n}
      </div>
    `;
  }
  dragBar(e) {
    const i = "cursor: grab;", s = `onmouseover="this.style.background ='#222'"`, n = `onmouseout="this.style.background ='none'"`;
    let r = `${i} `, a = this.config?.styles?.dragBar;
    for (let h in a)
      r += `${h}: ${a[h]}; `;
    let l = "";
    return e.dragBar && (l += `
      <div class="dragBar" style="${r}" ${s} ${n}>
        ${this.title(e)}
      </div>
    `), l;
  }
  title(e) {
    const i = this.config, s = i?.styles?.title, n = E(i?.title) ? i.title : "";
    let r = "white-space: nowrap; ";
    for (let l in s)
      r += `${l}: ${s[l]}; `;
    return `
        <div class="title" style="${r}">${n}</div>
    `;
  }
  closeIcon(e) {
    const i = "cursor: pointer;", s = `onmouseover="this.style.background ='#222'"`, n = `onmouseout="this.style.background ='none'"`;
    let r = `${i} `, a = this.config?.styles?.closeIcon, l = "";
    for (let m in a)
      l += `${m}: ${a[m]}; `;
    let h = "";
    return e.closeIcon && (h += `
      <div class="closeIcon" style="${r}" ${s} ${n}>
        <span>X</span>
      </div>
    `), h;
  }
  position(e) {
    let i = this.dimensions, s = this.#n.dimensions;
    Math.round(s.left - i.left), Math.round(s.bottom - i.top);
    let n = Math.round((s.width - i.width) / 2), r = Math.round((s.height - i.height) / 2) * -1, a = R.getStyle(this.#o, "z-index");
    if (b(e)) {
      let { x: l, y: h, z: m } = { ...e };
      T(l) && (n = l), T(h) && (r = h), T(m) && (a = m), this.#u = { x: l, y: h, z: a };
    }
    if (this.#o.style.left = `${n}px`, this.#o.style.top = `${r}px`, this.#o.style["z-index"] = `${a}`, this.config?.bounded) {
      const l = this.#o.clientWidth;
      if (n + l > this.#s.offsetWidth) {
        let m = Math.floor(this.#s.offsetWidth - l);
        m = U(m, 0, this.#s.offsetWidth), this.#o.style.left = `${m}px`;
      }
      const h = this.#o.clientHeight;
      if (r + s.height + h > s.height) {
        let m = Math.floor(h * -1);
        m = U(m, s.height * -1, 0), this.#o.style.top = `${m}px`;
      }
    }
  }
  setDimensions(e) {
    if (!b(e))
      return !1;
    T(e?.w) && (this.#o.style.width = `${e.w}px`), T(e?.h) && (this.#o.style.height = `${e.h}px`);
  }
  setProperties(e) {
    if (!b(e))
      return !1;
    if (E(e?.title) && (this.#a.innerHTML = e.title), E(e?.content) && (this.#d.innerHTML = e.content), this.setDimensions({ ...e?.dimensions }), this.position({ ...e?.position }), b(e?.styles)) {
      const i = (s, n) => {
        if (!b(n))
          return !1;
        const r = "el" + s.charAt(0).toUpperCase() + s.slice(1);
        if (b(this[r]))
          for (let a in n)
            this[r].style.p = n[a];
      };
      for (let s of Object.keys(e.styles))
        i(s, e.styles[s]);
    }
    return e;
  }
  remove() {
    return oe.destroy(this.id);
  }
  open(e = {}) {
    if (oe.currentActive === this && this.state === rt.opened)
      return !0;
    oe.currentActive = this, this.#i = rt.opened, this.#o.style.display = "block", this.#o.style.zindex = "10", this.setProperties(e), this.emit("window_opened", this.id), setTimeout(() => {
      this.#p.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#p.click);
    }, e?.offFocus || 250);
  }
  close() {
    oe.currentActive = null, this.#i = rt.closed, this.#o.style.display = "none", this.emit("window_closed", this.id);
  }
}
class Ui extends oe {
  static type = "Window";
  static create(e, i) {
    const s = {
      window: { "box-shadow": "rgb(0,0,0) 0px 20px 30px -10px" },
      content: { padding: "1em" },
      title: { padding: "0 1em", background: "#333" }
    };
    return i.dragBar = J(i?.dragBar) ? i.dragBar : !0, i.close = J(i?.close) ? i.close : !0, i.styles = b(i?.styles) ? { ...s, ...i.styles } : s, i.class = "dialogue", super.create(e, i);
  }
  constructor(e, i) {
    super(e, i);
  }
  get type() {
    return Ui.type;
  }
}
class cm extends Ui {
  static type = "Window";
  static create(e, i) {
    return i.dragBar = !0, i.close = !0, i.class = "config", super.create(e, i);
  }
  constructor(e, i) {
    super(e, i);
  }
}
class Ee {
  static progressList = {};
  static progressCnt = 0;
  static class = Ln;
  static type = "progress";
  static name = "Progress";
  static icons = {
    loadingBars: Mh,
    loadingSpin: Ah
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${Ln}" style=""></div>
    `;
  }
  static create(e, i) {
    const s = `progress_${++Ee.progressCnt}`;
    return i.id = s, Ee.progressList[s] = new Ee(e, i), Ee.progressList[s];
  }
  static destroy(e) {
    Ee.progressList[e].destroy(), delete Ee.progressList[e];
  }
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  constructor(e, i) {
    this.#t = e, this.#n = i.core, this.#r = i, this.#e = i.id, this.#s = e.elements.elProgress, this.#i = this.#n.elWidgetsG, this.init();
  }
  get type() {
    return Ee.type;
  }
  init() {
    this.mount(this.#s);
  }
  start() {
    if (!b(this.#n.config?.progress) || !b(this.#n.config.progress?.loading))
      return !1;
    this.#l.style.display = "block";
    const e = this.#n.elBody.width / 2 - this.#l.clientWidth / 2, i = this.#n.elBody.height / -2 - this.#l.clientHeight / 2;
    this.#l.style.top = `${i}px`, this.#l.style.left = `${e}px`;
  }
  stop() {
    this.#l.style.display = "none";
  }
  progressNode(e) {
    const i = "position: absolute; z-index: 1000; display: none; justify-content: center; align-items: center;", n = `<div class="content" style="">${e.icon}</div>`;
    return `
      <div id="${this.#r.id}" class="progress ${e.type}" style="${i}">${n}</div>
    `;
  }
  mount(e) {
    let i = "loadingBars";
    this.#r?.type in Ee.icons && (i = this.#r?.type);
    const s = { type: i, icon: Ee.icons[i] };
    e.lastElementChild == null ? e.innerHTML = this.progressNode(s) : e.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(s)), this.#l = this.#s.querySelector(`#${this.#r.id}`), this.#o = this.#l.querySelector("svg"), this.#o.style.fill = `${Dh.COLOUR_ICONHOVER};`;
  }
}
const as = {
  id: "widgets",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        menu_open: {
          target: "menu_open",
          action(o) {
          }
        },
        window_open: {
          target: "window_open",
          action(o) {
          }
        }
      }
    },
    menu_open: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        menu_close: {
          target: "idle",
          action(o) {
          }
        }
      }
    },
    window_open: {
      onEnter(o) {
      },
      onExit(o) {
      },
      on: {
        window_close: {
          target: "idle",
          action(o) {
          }
        }
      }
    }
  }
};
class um {
  #e;
  #t = "Widgets";
  #n = "widgets";
  #r;
  #i;
  #s;
  #l;
  #o = { Divider: le, Progress: Ee, Menu: ye, Window: oe, Dialogue: Ui, ConfigDialogue: cm };
  #c = {};
  #a = {};
  #h;
  #d;
  #u;
  constructor(e, i) {
    this.#r = e, this.#i = i, this.#l = { ...this.#o, ...i.widgets }, this.#h = e.elWidgetsG, this.init();
  }
  log(e) {
    this.#r.log(e);
  }
  info(e) {
    this.#r.info(e);
  }
  warn(e) {
    this.#r.warn(e);
  }
  error(e) {
    this.#r.error(e);
  }
  set id(e) {
    this.#e = $e(e);
  }
  get id() {
    return this.#e ? `${this.#e}` : `${this.#r.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#n;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#i;
  }
  get elements() {
    return this.#a;
  }
  get instances() {
    return this.#c;
  }
  set stateMachine(e) {
    this.#s = new ze(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  get types() {
    return this.#l;
  }
  init() {
    this.mount(this.#h);
    for (let e in this.#l) {
      let i = this.#l[e], s = `el${i.name}`;
      this.#a[s] = this.#h.querySelector(`.${i.class}`);
    }
  }
  start() {
    this.eventsListen(), as.id = this.id, as.context = this, this.stateMachine = as, this.stateMachine.start();
  }
  destroy() {
    this.off("menu_open", this.onOpenMenu), this.off("menu_close", this.onCloseMenu), this.off("menu_off", this.onCloseMenu), this.off("menuItem_selected", this.onMenuItemSelected), this.off("global_resize", this.onResize), this.stateMachine.destroy();
    for (let e in this.#c)
      this.delete(e);
    for (let e in this.#l)
      this.#l[e].destroy(id);
  }
  eventsListen() {
    this.on("resize", this.onResize, this), this.on("menu_open", this.onOpenMenu, this), this.on("menu_close", this.onCloseMenu, this), this.on("menu_off", this.onCloseMenu, this), this.on("menuItem_selected", this.onMenuItemSelected, this), this.on("global_resize", this.onResize, this);
  }
  on(e, i, s) {
    this.#r.on(e, i, s);
  }
  off(e, i) {
    this.#r.off(e, i);
  }
  emit(e, i) {
    this.#r.emit(e, i);
  }
  onResize(e) {
    this.setDimensions(e);
  }
  onOpenMenu(e) {
    this.#c[e.menu].open();
  }
  onCloseMenu(e) {
    this.#c[e.menu].close();
  }
  onMenuItemSelected(e) {
    this.emit(e.evt, e.target);
  }
  onResize() {
    this.elements.elDividers.style.width = `${this.core.width}px`;
  }
  mount(e) {
    e.innerHTML = this.defaultNode();
  }
  setWidth(e) {
    this.#d = e;
  }
  setHeight(e) {
    this.#u = e;
  }
  setDimensions(e) {
    this.setWidth(e.mainW), this.setHeight(e.mainH);
  }
  defaultNode() {
    let e = "", i = [];
    for (let s in this.#l) {
      let n = this.#l[s];
      i.indexOf(n.type) === -1 && (e += n.defaultNode(), i.push(n.type));
    }
    return e;
  }
  insert(e, i) {
    if (!(e in this.#l) || !b(i))
      return !1;
    i.core = this.core;
    const s = this.#l[e].create(this, i);
    return this.#c[s.id] = s, s;
  }
  delete(e) {
    return isString(e) ? (this.#l[type].destroy(e), !0) : !1;
  }
}
function lr(o, e, i, s, n, r) {
  const a = o.theme, l = document.createElement("template"), h = o.Timeline.graph.viewport.scene, m = o.MainPane, g = m.graph.viewport.scene, v = m.width, S = m.height, A = new Ft.Viewport({
    width: v,
    height: S,
    container: l
  }), L = A.scene.context;
  let k = 0, ue = 0, Oe = v - o.Chart.scale.width;
  a?.yAxis?.location == "left" && (ue = o.Chart.scale.width, Oe = 0);
  let H;
  L.save(), Bs(L, 0, 0, v, S, { fill: a.chart.Background }), L.drawImage(g.canvas, ue, 0, g.width, g.height);
  for (const [D, se] of o.ChartPanes) {
    let K = se.graph.viewport.scene, { width: ne, height: de } = K, me = se.scale.graph.viewport.scene, { width: ot, height: We } = me;
    k > 0 && (H = { stroke: a.divider.line }, Gt(L, k, 0, m.width, H)), L.drawImage(K.canvas, ue, k, ne, de), L.drawImage(me.canvas, Oe, k - 1, ot, We), k += de;
  }
  L.drawImage(h.canvas, 0, k, h.width, h.height), H = {
    text: o.config.title,
    colour: a.chart.TextColour,
    fontSize: a.chart.FontSize * 1.5,
    fontWeight: "normal",
    fontFamily: a.chart.FontFamily,
    textBaseLine: "top"
  }, Wr(L, 6, 6, H);
  const N = (D) => {
    if (D) {
      const K = r?.x || 0, ne = r?.y || 0, de = r?.width || v * 0.25, me = r?.height || S * 0.25;
      L.drawImage(D, K, ne, de, me);
    }
    L.restore();
    const se = () => {
      A.destroy(), l.remove();
    };
    switch (n) {
      case "url":
        if (_(e)) {
          const K = (ne) => {
            e(ne), se();
          };
          A.scene.toImage(i, s, K);
        } else
          new Promise(function(K, ne) {
            const de = A.scene.toImage(i, s);
            de ? K(de) : ne(!1), se();
          });
        break;
      case "download":
      default:
        A.scene.export({ fileName: e }, null, i, s), se();
        break;
    }
  };
  b(r) ? R.isImage(r?.imgURL).then((D) => {
    N(D);
  }).catch((D) => {
    console.error(D);
  }) : N();
}
class I extends du {
  static #e = Es;
  static #t = 0;
  static #n = {};
  static #r = {};
  static #i = null;
  static #s = !1;
  static #l = [];
  static #o = null;
  static #c = null;
  static #a = !1;
  static get version() {
    return I.#e;
  }
  static get talibPromise() {
    return I.#i;
  }
  static get talibReady() {
    return I.#s;
  }
  static get talibAwait() {
    return I.#l;
  }
  static get talibError() {
    return I.#o;
  }
  static get webWorkers() {
    return Me;
  }
  static get TALibWorker() {
    return I.#c;
  }
  static #h = `${It} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
  static #d = [
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
  #u = It;
  #m = Ht;
  #y;
  #g;
  #b;
  #w;
  #p;
  #S;
  #C;
  #f;
  #T;
  #x;
  #I;
  #M;
  #L = !1;
  #E = null;
  #A = $;
  #P;
  #v;
  #R = Co;
  #k = { ...fi };
  #D = { ...fi };
  #H = { ...fi };
  #O;
  #$;
  #K;
  chartWMin = Mi;
  chartHMin = je;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = B.COLOUR_BG;
  chartTxtColour = B.COLOUR_TXT;
  chartBorderColour = B.COLOUR_BORDER;
  utilsH = Ze;
  toolsW = qe;
  timeH = Li;
  scaleW = ft;
  #W;
  #F;
  #N = {
    chart: {},
    time: {}
  };
  #G;
  panes = {
    utils: this.#W,
    tools: this.#F,
    main: this.#N
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
  #U = 0;
  #ee = 0;
  #Y = { x: 0, y: 0 };
  #Q = [!1, !1, !1];
  #q;
  #X;
  #B;
  #j;
  #Z;
  #J;
  #V = !1;
  #z = !1;
  static create(e = {}) {
    I.#t == 0 && (I.#n.CPUCores = navigator.hardwareConcurrency, I.#n.api = {
      permittedClassNames: I.#d
    }), (typeof e.talib != "object" || typeof e.talib.init != "function") && (I.#s = !1, I.#o = new Error(`${I.#h}`)), !I.#s && I.#o === null && (I.#i = e.talib.init(e.wasm), I.#i.then(
      () => {
        I.#s = !0;
        for (let i of I.#l)
          _(i) && i();
      },
      () => {
        I.#s = !1;
      }
    ));
  }
  static destroy(e) {
    if (e instanceof I) {
      e.end();
      const i = e.inCnt;
      delete I.#r[i];
    }
  }
  static cnt() {
    return I.#t++;
  }
  constructor() {
    super(), this.#E = I.cnt(), console.warn(`!WARNING!: ${It} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${Ht} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#X = Me;
    const e = this.#k;
    e.primaryPane = { ...e.primaryPane, ...eo.primaryPane }, this.#D = { ...Cs };
  }
  log(...e) {
    this.logs && console.log(...e);
  }
  info(...e) {
    this.infos && console.info(...e);
  }
  warn(...e) {
    this.warnings && console.warn(...e);
  }
  error(e) {
    this.errors && console.error(e);
  }
  time(e) {
    this.timer && console.time(e);
  }
  timeLog(e) {
    this.timer && console.timeLog(e);
  }
  timeEnd(e) {
    this.timer && console.timeEnd(e);
  }
  get version() {
    return I.version;
  }
  get name() {
    return this.#u;
  }
  get shortName() {
    return this.#m;
  }
  get options() {
    return this.#b;
  }
  get config() {
    return this.#g;
  }
  get core() {
    return this.#y;
  }
  get inCnt() {
    return this.#E;
  }
  set elUtils(e) {
    this.#p = e;
  }
  get elUtils() {
    return this.#p;
  }
  set elTools(e) {
    this.#C = e;
  }
  get elTools() {
    return this.#C;
  }
  set elBody(e) {
    this.#S = e;
  }
  get elBody() {
    return this.#S;
  }
  set elMain(e) {
    this.#f = e;
  }
  get elMain() {
    return this.#f;
  }
  set elTime(e) {
    this.#x = e;
  }
  get elTime() {
    return this.#x;
  }
  set elYAxis(e) {
    this.#I = e;
  }
  get elYAxis() {
    return this.#I;
  }
  set elWidgetsG(e) {
    this.#M = e;
  }
  get elWidgetsG() {
    return this.#M;
  }
  get UtilsBar() {
    return this.#W;
  }
  get ToolsBar() {
    return this.#F;
  }
  get MainPane() {
    return this.#N;
  }
  get Timeline() {
    return this.#N.time;
  }
  get WidgetsG() {
    return this.#G;
  }
  get Chart() {
    return this.#N.chart;
  }
  get ChartPanes() {
    return this.#N.chartPanes;
  }
  get Indicators() {
    return this.#N.indicators;
  }
  get CustomOverlays() {
    return this.#H;
  }
  get ready() {
    return this.#L;
  }
  get state() {
    return this.#P;
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
    return T(this.#v.initialCnt) ? this.#v.initialCnt : Ja;
  }
  get range() {
    return this.#v;
  }
  get time() {
    return this.#_;
  }
  get TimeUtils() {
    return Ea;
  }
  get theme() {
    return this.#$;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#R;
  }
  get TALib() {
    return this.#O;
  }
  get TALibReady() {
    return I.talibReady;
  }
  get TALibError() {
    return I.talibError;
  }
  get talibAwait() {
    return I.talibAwait;
  }
  get TALibPromise() {
    return I.talibPromise;
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
  set scrollPos(e) {
    this.setScrollPos(e);
  }
  get scrollPos() {
    return this.#U;
  }
  get smoothScrollOffset() {
    return 0;
  }
  get rangeScrollOffset() {
    return Math.floor(this.bufferPx / this.candleW);
  }
  get mousePos() {
    return this.#Y;
  }
  get pointerButtons() {
    return this.#Q;
  }
  get pricePrecision() {
    return this.#Z;
  }
  get volumePrecision() {
    return this.#J;
  }
  set stream(e) {
    return this.setStream(e);
  }
  get stream() {
    return this.#B;
  }
  get worker() {
    return this.#X;
  }
  get isEmpty() {
    return this.#P.IsEmpty;
  }
  set candles(e) {
    b(e) && (this.#j = e);
  }
  get candles() {
    return this.#j;
  }
  get progress() {
    return this.#q;
  }
  get customOverlays() {
    return this.#H;
  }
  get optionalOverlays() {
    return gt({ ...this.#D }, this.#H);
  }
  start(e) {
    this.log(`${It} configuring...`), I.create(e);
    const i = { ...e };
    this.logs = i?.logs ? i.logs : !1, this.infos = i?.infos ? i.infos : !1, this.warnings = i?.warnings ? i.warnings : !1, this.errors = i?.errors ? i.errors : !1, this.timer = i?.timer ? i.timer : !1, this.#g = i, this.#E = i.cnt || this.#E, this.#O = i.talib, this.#w = this, this.#y = this, "theme" in i || (i.theme = _r);
    const s = E(i?.id) ? i.id : null;
    this.setID(s), this.classList.add(this.id), this.log("processing state...");
    let n = ce(i?.state) || {};
    n.id = this.id, n.core = this;
    let r = i?.deepValidate || !1, a = i?.isCrypto || !1;
    this.#P = this.#A.create(n, r, a), delete i.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let l = "1s", h = F;
    if (!b(i?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${It} has no chart data or streaming provided.`), { tf: l, ms: h } = di(i?.timeFrame)) : b(i?.stream) && this.state.data.chart.data.length < 2 ? ({ tf: l, ms: h } = di(i?.timeFrame), this.#V = !0) : (l = this.state.data.chart.tf, h = this.state.data.chart.tfms), this.log(`tf: ${l} ms: ${h}`), this.#g.callbacks = this.#g.callbacks || {}, b(i))
      for (const g in i)
        g in this.props() && this.props()[g](i[g]);
    const m = b(i?.range) ? i.range : {};
    if (m.interval = h, m.core = this, this.getRange(null, null, m), this.#v.Length > 1) {
      const g = fs(this.#_, this.#g?.range?.startTS), v = T(g) ? g + this.#v.initialCnt : this.allData.data.length, S = T(g) ? g : v - this.#v.initialCnt;
      this.#v.initialCnt = v - S, this.setRange(S, v), i.range?.center && this.jumpToIndex(S, !0, !0);
    }
    this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#G = new um(this, { widgets: i?.widgets }), this.#W = new lm(this, i), this.#F = new io(this, i), this.#N = new to(this, i), this.setTheme(this.#K.id), this.log(`${this.#u} V${I.version} configured and running...`), this.#U = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#q = this.WidgetsG.insert("Progress", {}), this.stream = this.#g.stream, this.#V && this.on(_e, this.delayedSetRange, this), this.#L = !0, this.refresh();
  }
  destroy() {
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#X.end(), this.#A = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(_e, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#q.stop());
  }
  onMouseMove(e) {
    this.#Y.x = e.clientX, this.#Y.y = e.clientY;
  }
  onStreamUpdate(e) {
    const i = this.range;
    if (i.inRange(e[0])) {
      const s = i.valueMax, n = i.valueMin;
      (e[2] > s || e[3] < n) && (this.setRange(i.indexStart, i.indexEnd), this.emit("chart_yAxisRedraw", this.range));
    }
  }
  props() {
    return {
      width: (e) => this.setWidth(e),
      height: (e) => this.setHeight(e),
      widthMin: (e) => this.setWidthMin(e),
      heightMin: (e) => this.setHeightMin(e),
      widthMax: (e) => this.setWidthMax(e),
      heightMax: (e) => this.setHeightMax(e),
      logs: (e) => this.logs = J(e) ? e : !1,
      infos: (e) => this.infos = J(e) ? e : !1,
      warnings: (e) => this.warnings = J(e) ? e : !1,
      errors: (e) => this.errors = J(e) ? e : !1,
      indicators: (e) => this.setIndicators(e),
      theme: (e) => {
        this.#K = this.addTheme(e);
      },
      stream: (e) => this.#B = b(e) ? e : {},
      pricePrecision: (e) => this.setPricePrecision(e),
      volumePrecision: (e) => this.setVolumePrecision(e)
    };
  }
  getInCnt() {
    return this.#E;
  }
  setID(e) {
    E(e) ? this.id = e : this.id = `${ee(Ht)}_${this.#E}`;
  }
  setTitle(e) {
    this.Chart.setTitle(e);
  }
  setWatermark(e) {
    this.Chart.setWatermark(e);
  }
  setDimensions(e, i) {
    const s = super.setDimensions(e, i);
    this.emit("global_resize", s);
  }
  setUtilsH(e) {
    this.utilsH = e, this.#p.style.height = `${e}px`;
  }
  setToolsW(e) {
    this.toolsW = e, this.#C.style.width = `${e}px`;
  }
  setPricePrecision(e) {
    (!T(e) || e < 0) && (e = nl), this.#Z = e;
  }
  setVolumePrecision(e) {
    (!T(e) || e < 0) && (e = rl), this.#J = e;
  }
  addTheme(e) {
    const i = Se.create(e, this);
    return this.#$ instanceof Se || (this.#$ = i), i;
  }
  setTheme(e) {
    if (!this.theme.list.has(e))
      return !1;
    this.#$.setTheme(e, this);
    const i = this.#$, s = document.querySelector(`style[title=${this.id}_style]`), n = `var(--txc-border-color, ${i.chart.BorderColour}`;
    let r = `.${this.id} { `;
    r += `--txc-background: ${i.chart.Background}; `, this.style.background = `var(--txc-background, ${i.chart.Background})`, this.style.border = `${i.chart.BorderThickness}px solid`, this.style.borderColor = n, r += `--txc-border-color:  ${i.chart.BorderColour}; `, this.#f.rows.style.borderColor = n, r += `--txc-time-scrollbar-color: ${i.chart.BorderColour}; `, r += `--txc-time-handle-color: ${i.xAxis.handle}; `, r += `--txc-time-slider-color: ${i.xAxis.slider}; `, r += `--txc-time-cursor-fore: ${i.xAxis.colourCursor}; `, r += `--txc-time-cursor-back: ${i.xAxis.colourCursorBG}; `, r += `--txc-time-icon-color: ${i.icon.colour}; `, r += `--txc-time-icon-hover-color: ${i.icon.hover}; `, this.#x.overview.scrollBar.style.borderColor = n, this.#x.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${i.xAxis.handle})`, this.#x.overview.style.setProperty("--txc-time-slider-color", i.xAxis.slider), this.#x.overview.style.setProperty("--txc-time-icon-color", i.icon.colour), this.#x.overview.style.setProperty("--txc-time-icon-hover-color", i.icon.hover);
    for (let [a, l] of Object.entries(this.Chart.legend.list))
      l.el.style.color = `var(--txc-legend-color, ${i.legend.colour})`, l.el.style.font = `var(--txc-legend-font, ${i.legend.font})`;
    for (let a of this.#p.icons)
      a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    for (let a of this.#C.icons)
      a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    return r += " }", s.innerHTML = r, !0;
  }
  setScrollPos(e) {
    e = Math.round(e), T(e) && e <= 0 && e >= this.bufferPx * -1 ? this.#U = e : this.emit("Error", "setScrollPos: not a valid value");
  }
  setState(e) {
    if (!$.has(e))
      return this.warn(`${this.name} id: ${this.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    this.stream.stop(), this.MainPane.reset(), this.#P = $.get(e);
    const i = {
      interval: this.#P.data.chart.tfms,
      core: this
    };
    if (this.getRange(null, null, i), this.range.Length > 1) {
      const s = fs(this.time, void 0), n = s ? s + this.range.initialCnt : this.#P.data.chart.data.length - 1, r = s || n - this.range.initialCnt;
      this.range.initialCnt = n - r, this.setRange(r, n);
    }
    this.MainPane.restart(), this.refresh();
  }
  createState(e, i, s) {
    return this.state.create(e, i, s);
  }
  deleteState(e) {
    return this.state.delete(e);
  }
  exportState(e = this.key, i = {}) {
    return this.state.export(e = this.key, i = {});
  }
  setStream(e) {
    if (this.stream instanceof mt)
      return this.error("Error: Invoke stopStream() before starting a new one."), !1;
    if (b(e))
      return this.allData.data.length == 0 && E(e.timeFrame) && ({ tf, ms } = di(e?.timeFrame), this.range.interval = ms, this.range.intervalStr = tf, this.#_.timeFrameMS = ms, this.#_.timeFrame = tf), this.#B = new mt(this), this.#g.stream = this.#B.config, this.#B;
  }
  stopStream() {
    this.stream instanceof mt && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#V; ) {
      let e = this.range.Length * 0.5;
      this.setRange(e * -1, e), this.off(_e, this.delayedSetRange), this.#V = !1;
    }
  }
  updateRange(e) {
    if (!M(e) || !T(e[4]) || e[4] == 0)
      return;
    let i, s;
    i = e[4], s = this.#U + i, s % this.candleW, s < this.bufferPx * -1 ? (s = 0, this.offsetRange(this.rangeScrollOffset * -1)) : s > 0 && (s = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#U = s, this.emit("scrollUpdate", s);
  }
  offsetRange(e) {
    let i = this.range.indexStart - e, s = this.range.indexEnd - e;
    this.setRange(i, s);
  }
  getRange(e = 0, i = 0, s = {}) {
    this.#v = new ps(e, i, s), this.#_.range = this.#v, this.#_.timeFrameMS = this.#v.interval, this.#_.timeFrame = this.#v.intervalStr;
  }
  setRange(e = 0, i = this.rangeLimit) {
    const s = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#v.set(e, i, s), e < 0 && !this.#z ? this.emit("range_limitPast", { chart: this, start: e, end: i }) : i > this.range.dataLength && !this.#z && this.emit("range_limitFuture", { chart: this, start: e, end: i });
  }
  jumpToIndex(e, i = !0, s = !0) {
    i && (e = U(e, 0, this.range.dataLength));
    let n = this.range.Length, r = e + n;
    s && (e -= n / 2, r -= n / 2), this.setRange(e, r);
  }
  jumpToTS(e, i = !0, s = !0) {
    let n = this.Timeline.xAxis.t2Index(e);
    this.jumpToIndex(n, i, s);
  }
  jumpToStart(e = !1) {
    this.jumpToIndex(0, !0, e);
  }
  jumpToEnd(e = !0) {
    let i = this.range.dataLength - this.range.Length;
    e && (i += this.range.Length / 2), this.jumpToIndex(i, !0, !1);
  }
  mergeData(e, i = !1, s = !1) {
    this.#z = !0;
    let n = this.state.mergeData(e, i, s);
    return J(n) && (this.#z = !1), n;
  }
  isOverlay(e) {
    return pn(e) && _(e.prototype?.draw) && !this.isIndicator(e) && Object.getPrototypeOf(e.prototype).constructor.name === "Overlay";
  }
  hasOverlay(e) {
    const i = this.overlayEntries();
    return Object.keys(i).includes(e) ? i[e] : !1;
  }
  overlayKeys() {
    return Object.keys(this.overlayEntries());
  }
  overlayEntries() {
    const e = this.optionalOverlays;
    let i = {};
    for (let s in e)
      i = { ...i, ...e[s] };
    return i;
  }
  setCustomOverlays(e) {
    if (!b(e))
      return !1;
    const i = {};
    for (const [s, n] of Object.entries(e))
      b(n) && this.isOverlay(n?.class) && Object.keys(this.#H).includes(n?.location) ? (this.#H[n.location][s] = n, i[s] = !0, this.log(`Custom overlay "${s}" registered`)) : i[s] = !1;
    return i;
  }
  addOverlay(e, i) {
    let s;
    const n = this.findOverlayInGraph(e, i);
    if (!n)
      s = n;
    else {
      const { overlay: r, graph: a } = { ...n };
      s = a.addOverlay(e, r);
    }
    return s ? (this.log(`Added overlay "${e}" to ${i}`), !0) : (this.error(`Error attempting to add overlay "${e}" to ${i}`), !1);
  }
  removeOverlay(e, i) {
    let s;
    const n = this.findOverlayInGraph(e, i);
    if (!n)
      s = n;
    else {
      const { overlay: r, graph: a } = { ...n };
      s = a.removeOverlay(e);
    }
    return s ? (this.log(`Removed overlay "${e}" from ${i}`), !0) : (this.error(`Error attempting to remove overlay "${e}" from ${i}`), !1);
  }
  findGraph(e) {
    switch (e) {
      case "mainPane":
        return this.MainPane.graph;
      case "chartPane":
        return this.Chart.graph;
      case "chartScale":
        return this.Chart.scale.graph;
      case "timeLine":
        return this.Chart.time.graph;
      default:
        const i = Array.from(this.ChartPanes.keys());
        if (i.includes(e))
          return this.ChartPanes.get(e).graph;
        for (let s of i) {
          let n = this.ChartPanes.get(e).scale;
          if (n.id == e)
            return n.graph;
        }
        return !1;
    }
  }
  findOverlayInGraph(e, i) {
    if (!E(e) || !E(i))
      return !1;
    const s = this.hasOverlay(e);
    if (!s)
      return !1;
    const n = this.findGraph(i);
    return n ? { overlay: s, graph: n } : !1;
  }
  isIndicator(e) {
    return pn(e) && _(e.prototype?.draw) && "primaryPane" in e.prototype && Object.getPrototypeOf(e.prototype).constructor.name === "Indicator";
  }
  setIndicators(e, i = !1) {
    if (!b(e))
      return !1;
    i && (console.warn("Expunging all default indicators!"), this.#R = {});
    const s = {};
    for (const [n, r] of Object.entries(e))
      E(r?.id) && E(r?.name) && E(r?.event) && this.isIndicator(r?.ind) ? (this.#R[n] = r, s[n] = !0) : s[n] = !1;
    return s;
  }
  addIndicator(e, i = e, s = {}) {
    return this.#N.addIndicator(e, i, s);
  }
  getIndicator(e) {
    return this.#N.getIndicator(e);
  }
  removeIndicator(e) {
    return this.#N.removeIndicator(e);
  }
  indicatorSettings(e, i) {
    return this.#N.indicatorSettings(e, i);
  }
  hasStateIndicator(e, i = "searchAll") {
    if (!E(e) || !E(i))
      return !1;
    const s = function(n, r) {
      for (let a of r)
        return a?.id == n || a?.name == n;
    };
    if (i == "searchAll") {
      for (let n of this.allData)
        if (s(e, n))
          return !0;
      return !1;
    } else if (i in this.allData)
      return s(e, d);
  }
  async calcAllIndicators(e) {
    const i = [], s = (n) => new Promise((r) => setTimeout(() => {
      r(n());
    }, 0));
    for (const [n, r] of Object.entries(this.Indicators))
      for (const [a, l] of Object.entries(r))
        i.push(l.instance.calcIndicatorHistory.bind(l.instance, e));
    await Promise.all(i.map(async (n) => {
      s(n);
    })), this.refresh();
  }
  addTrade(e) {
    return this.#A.addTrade(e);
  }
  removeTrade(e) {
    return this.#A.removeTrade(e);
  }
  addEvent(e) {
    return this.#A.addEvent(e);
  }
  removeEvent(e) {
    return this.#A.removeEvent(e);
  }
  resize(e, i) {
    return !T(e) && !T(i) ? !1 : (this.setDimensions(e, i), !0);
  }
  refresh() {
    if (!this.ready)
      return;
    let e = this.range.indexStart, i = this.range.indexEnd;
    this.setRange(e, i), this.#N.draw(void 0, !0);
  }
  toImageURL(e, i, s, n) {
    return lr(this, e, i, s, "url", n);
  }
  downloadImage(e = `${this.id}.png`, i, s, n) {
    lr(this, e, i, s, "download", n);
  }
  notImplemented() {
    if (this.implemented)
      this.implemented.open();
    else {
      let i = {
        content: `
        This feature is not implemented yet.
      `,
        styles: {
          content: { padding: "1em" }
        }
      };
      this.implemented = this.#G.insert("Dialogue", i), this.implemented.start();
    }
  }
}
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", _h), document.head.insertAdjacentHTML("beforeend", Hh), customElements.get("tradex-chart") || customElements.define("tradex-chart", I));
export {
  I as Chart,
  R as DOM,
  Xh as EventHub,
  He as Indicator,
  G as Overlay,
  ps as Range,
  ze as StateMachine,
  z as canvas,
  ce as copyDeep,
  dm as isPromise,
  gt as mergeDeep,
  gm as talibAPI,
  ee as uid
};
