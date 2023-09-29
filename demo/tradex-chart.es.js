function Xo(r, e) {
  for (var i = 0; i < e.length; i++) {
    const s = e[i];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const n in s)
        if (n !== "default" && !(n in r)) {
          const o = Object.getOwnPropertyDescriptor(s, n);
          o && Object.defineProperty(r, n, o.get ? o : {
            enumerable: !0,
            get: () => s[n]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }));
}
const jo = "0.139.6";
function P(r) {
  return Array.isArray(r);
}
function z(r) {
  return r && typeof r == "function";
}
function E(r) {
  return typeof r == "object" && !Array.isArray(r) && r !== null;
}
function T(r) {
  return typeof r == "number" && !isNaN(r);
}
function X(r) {
  return typeof r == "boolean";
}
function S(r) {
  return typeof r == "string";
}
function gd(r) {
  return !!r && (E(r) || z(r)) && z(r.then);
}
const Ko = ["y", "M", "d", "h", "m", "s", "ms"], Zo = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], Qo = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Jo = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], ar = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ta = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], lr = 1231006505e3, Yt = 1, W = 1e3, F = W * 60, j = F * 60, N = j * 24, ge = N * 7, ht = N * 30;
function hr(r = 3, e = !1) {
  let i = ar[r % 12] * N;
  return e && r > 0 && (i += N), i;
}
const wt = N * 365, $e = {
  y: wt,
  M: ht,
  w: ge,
  d: N,
  h: j,
  m: F,
  s: W,
  u: Yt
}, cr = {
  years: wt,
  months: ht,
  weeks: ge,
  days: N,
  hours: j,
  minutes: F,
  seconds: W,
  milliseconds: Yt
}, ea = { ...$e, ...cr }, Ge = {
  YEARS10: [wt * 10, "years"],
  YEARS5: [wt * 5, "years"],
  YEARS3: [wt * 3, "years"],
  YEARS2: [wt * 2, "years"],
  YEARS: [wt, "years"],
  MONTH6: [ht * 6, "months"],
  MONTH4: [ht * 4, "months"],
  MONTH3: [ht * 3, "months"],
  MONTH2: [ht * 2, "months"],
  MONTH: [ht, "months"],
  DAY15: [N * 15, "years"],
  DAY10: [N * 10, "days"],
  DAY7: [N * 7, "days"],
  DAY5: [N * 5, "days"],
  DAY3: [N * 3, "days"],
  DAY2: [N * 2, "days"],
  DAY: [N, "days"],
  HOUR12: [j * 12, "hours"],
  HOUR6: [j * 6, "hours"],
  HOUR4: [j * 4, "hours"],
  HOUR2: [j * 2, "hours"],
  HOUR: [j, "hours"],
  MINUTE30: [F * 30, "minutes"],
  MINUTE15: [F * 15, "minutes"],
  MINUTE10: [F * 10, "minutes"],
  MINUTE5: [F * 5, "minutes"],
  MINUTE2: [F * 2, "minutes"],
  MINUTE: [F, "minutes"],
  SECOND30: [W * 30, "seconds"],
  SECOND15: [W * 15, "seconds"],
  SECOND10: [W * 10, "seconds"],
  SECOND5: [W * 5, "seconds"],
  SECOND2: [W * 2, "seconds"],
  SECOND: [W, "seconds"],
  MILLISECOND500: [Yt * 500, "milliseconds"],
  MILLISECOND250: [Yt * 250, "milliseconds"],
  MILLISECOND100: [Yt * 100, "milliseconds"],
  MILLISECOND50: [Yt * 50, "milliseconds"],
  MILLISECOND: [Yt, "milliseconds"]
}, ia = () => {
  const r = Object.values(Ge), e = [];
  for (let i = r.length; --i; i > 0)
    e[i] = r[i][0];
  return e;
}, Ie = ia(), sa = () => {
  const r = Object.values(Ge), e = [];
  for (let i = r.length; --i; i > 0)
    e[i] = r[i][1];
  return e;
}, ls = sa(), na = Object.keys(Ge), ra = () => {
  const r = {};
  for (const [e, i] of Object.entries(Ge))
    r[e] = i[0];
  return r;
}, oa = ra(), hs = {
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
function aa() {
  const r = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(hs, r) ? hs[r.toString()] : "Etc/UTC";
}
function la() {
  const r = {};
  for (let e in $e) {
    let i = 0;
    r[e] = [];
    do
      r[e].push(Math.round($e[e] * i)), i += 0.125;
    while (i < 1);
  }
  return r;
}
function dr(r) {
  const e = new Date(r).getTime();
  return T(e);
}
function ur(r, e = lr, i = Date.now()) {
  return dr(r) ? r > e && r < i : !1;
}
function Ae(r, e, i) {
  r = new Date(r), e = new Date(e);
  var s = e.getTime(), n = r.getTime();
  return parseInt((s - n) / i);
}
const Vt = {
  inSeconds: function(r, e) {
    return Ae(r, e, W);
  },
  inMinutes: function(r, e) {
    return Ae(r, e, F);
  },
  inHours: function(r, e) {
    return Ae(r, e, j);
  },
  inDays: function(r, e) {
    return Ae(r, e, N);
  },
  inWeeks: function(r, e) {
    return Ae(r, e, ge);
  },
  inMonths: function(r, e) {
    r = new Date(r), e = new Date(e);
    let i = r.getUTCFullYear(), s = e.getUTCFullYear(), n = r.getUTCMonth();
    return e.getUTCMonth() + 12 * s - (n + 12 * i);
  },
  inYears: function(r, e) {
    let i = new Date(r);
    return new Date(e).getUTCFullYear() - i.getUTCFullYear();
  }
};
function ha(r, e) {
  let i = Vt.inYears(r, e), s = Vt.inMonths(r, e), n = Vt.inWeeks(r, e), o = Vt.inDays(r, e), a = Vt.inHours(r, e), h = Vt.inMinutes(r, e), l = Vt.inSeconds(r, e), g = new Date(e).getTime() - new Date(r).getTime();
  return {
    y: i,
    M: s,
    w: n,
    d: o,
    h: a,
    m: h,
    s: l,
    ms: g,
    years: i,
    months: s,
    weeks: n,
    days: o,
    hours: a,
    minutes: h,
    seconds: l,
    milliseconds: g
  };
}
function fi(r) {
  let e = W;
  return S(r) ? (e = fr(r), e ? r = r : (e = W, r = "1s")) : r = "1s", { tf: r, ms: e };
}
function fr(r) {
  if (!S(r))
    return !1;
  const e = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let i;
  return (i = e.exec(r)) !== null ? $e[i[2]] * i[1] : !1;
}
function Es(r) {
  let e = Math.floor(r / 1e3), i = Math.floor(e / 60);
  e = e % 60;
  let s = Math.floor(i / 60);
  i = i % 60;
  let n = Math.floor(s / 24);
  s = s % 24;
  let o = Math.floor(n / 7);
  n = n % 7;
  let a = Math.floor(o / 4), h = Math.floor(o / 52), l = o % 4;
  return a = a % 13, {
    y: h,
    M: a,
    w: l,
    d: n,
    h: s,
    m: i,
    s: e,
    years: h,
    months: a,
    weeks: l,
    days: n,
    hours: s,
    minutes: i,
    seconds: e
  };
}
function Re(r) {
  const e = Es(r);
  for (const i in e)
    if (e[i])
      return `${e[i]}${i}`;
}
function Ss(r) {
  return r ? new Date(r).getUTCSeconds() : null;
}
function bs(r) {
  return new Date(r).setUTCMilliseconds(0, 0);
}
function Di(r) {
  return r ? new Date(r).getUTCMinutes() : null;
}
function Cs(r) {
  return new Date(r).setUTCSeconds(0, 0);
}
function Ms(r) {
  return r ? new Date(r).getUTCHours() : null;
}
function Ps(r) {
  return new Date(r).setUTCMinutes(0, 0, 0);
}
function Ls(r) {
  return r ? new Date(r).getUTCDate() : null;
}
function ca(r, e = "en-GB", i = "short") {
  return new Date(r).toLocaleDateString(e, { weekday: i });
}
function He(r) {
  return new Date(r).setUTCHours(0, 0, 0, 0);
}
function As(r) {
  if (r)
    return new Date(r).getUTCMonth();
}
function gr(r, e = "en-GB", i = "short") {
  return new Date(r).toLocaleDateString(e, { month: i });
}
function Os(r) {
  let e = new Date(r);
  return Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    1
  );
}
function pr(r) {
  let e = (As(r) + 1) % 12;
  return r += hr(e, ki(r)), r;
}
function mr(r) {
  if (r)
    return new Date(r).getUTCFullYear();
}
function Is(r) {
  return Date.UTC(new Date(r).getUTCFullYear());
}
function yr(r) {
  return r = r + wt + N, ki(r), r;
}
function ki(r) {
  let i = new Date(r).getUTCFullYear();
  return i & 3 ? !1 : i % 100 != 0 || i % 400 == 0;
}
function da(r) {
  let e = new Date(r), i = e.getUTCMonth(), s = e.getUTCDate(), n = dayCount[i] + s;
  return i > 1 && ki() && n++, n;
}
function gi(r, e) {
  return {
    years: (s) => Is(s),
    months: (s) => Os(s),
    weeks: (s) => He(s),
    days: (s) => He(s),
    hours: (s) => Ps(s),
    minutes: (s) => Cs(s),
    seconds: (s) => bs(s)
  }[e](r);
}
function ua(r, e) {
  let i, s;
  switch (e) {
    case "years":
      i = Is(r), s = yr(r);
      break;
    case "months":
      i = Os(r), s = pr(r);
      break;
    case "weeks":
      i = He(r), s = i + N;
      break;
    case "days":
      i = He(r), s = i + N;
      break;
    case "hours":
      i = Ps(r), s = i + j;
      break;
    case "minutes":
      i = Cs(r), s = i + F;
      break;
    case "seconds":
      i = bs(r), s = i + W;
  }
  return { start: i, end: s };
}
function fa(r) {
  String(Ls(r)).padStart(2, "0");
}
function vr(r) {
  let e = String(Ms(r)).padStart(2, "0"), i = String(Di(r)).padStart(2, "0");
  return `${e}:${i}`;
}
function ga(r) {
  let e = String(Ms(r)).padStart(2, "0"), i = String(Di(r)).padStart(2, "0"), s = String(Ss(r)).padStart(2, "0");
  return `${e}:${i}:${s}`;
}
function cs(r) {
  let e = String(Di(r)).padStart(2, "0"), i = String(Ss(r)).padStart(2, "0");
  return `${e}:${i}`;
}
function pa(r, e) {
  let i = 1 / 0, s = null, n = -1;
  for (let o = 0; o < e.length; o++) {
    let a = e[o][0];
    Math.abs(a - r) < i && (i = Math.abs(a - r), s = e[o], n = o);
  }
  return [n, s];
}
const ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: lr,
  DAY_MS: N,
  DM: fa,
  HM: vr,
  HMS: ga,
  HOUR_MS: j,
  MILLISECOND: Yt,
  MINUTE_MS: F,
  MONTHMAP: ta,
  MONTHR_MS: ht,
  MONTH_MS: hr,
  MS: cs,
  SECOND_MS: W,
  TIMESCALES: Ie,
  TIMESCALESKEYS: na,
  TIMESCALESRANK: ls,
  TIMESCALESVALUES: Ge,
  TIMESCALESVALUESKEYS: oa,
  TIMEUNITS: Ko,
  TIMEUNITSLONG: Zo,
  TIMEUNITSVALUES: ea,
  TIMEUNITSVALUESLONG: cr,
  TIMEUNITSVALUESSHORT: $e,
  WEEK_MS: ge,
  YEAR_MS: wt,
  buildSubGrads: la,
  dayCntInc: Qo,
  dayCntLeapInc: Jo,
  dayOfYear: da,
  day_start: He,
  getTimezone: aa,
  get_day: Ls,
  get_dayName: ca,
  get_hour: Ms,
  get_minute: Di,
  get_month: As,
  get_monthName: gr,
  get_second: Ss,
  get_year: mr,
  hour_start: Ps,
  interval2MS: fr,
  isLeapYear: ki,
  isTimeFrame: fi,
  isValidTimeInRange: ur,
  isValidTimestamp: dr,
  minute_start: Cs,
  monthDayCnt: ar,
  month_start: Os,
  ms2Interval: Re,
  ms2TimeUnits: Es,
  nearestTs: pa,
  nextMonth: pr,
  nextYear: yr,
  second_start: bs,
  time_start: gi,
  timestampDiff: Vt,
  timestampDifference: ha,
  timezones: hs,
  unitRange: ua,
  year_start: Is
}, Symbol.toStringTag, { value: "Module" }));
function ya(r, e) {
  return r = Math.ceil(r) + 1, e = Math.floor(e), Math.floor(Math.random() * (e - r) + r);
}
function va(r) {
  const e = {};
  return e.value = r, e.sign = !!r, e.integers = wr(r), e.decimals = xr(r), e.total = e.integers + e.decimals, e;
}
function wr(r) {
  return (Math.log10((r ^ r >> 31) - (r >> 31)) | 0) + 1;
}
function wa(r) {
  return r | 0;
}
function dn(r, e) {
  e = e || 100;
  const i = Math.pow(10, e);
  return Math.round((r + Number.EPSILON) * i) / i;
}
function lt(r, e = 0) {
  var i = r * Math.pow(10, e), s = Math.round(i), n = (i > 0 ? i : -i) % 1 === 0.5 ? s % 2 === 0 ? s : s - 1 : s;
  return n / Math.pow(10, e);
}
function xr(r) {
  if (typeof r != "number" && (r = parseFloat(r)), isNaN(r) || !isFinite(r))
    return 0;
  for (var e = 1, i = 0; Math.round(r * e) / e !== r && (e *= 10, e !== 1 / 0); )
    i++;
  return i;
}
function xa(r) {
  return Math.log(r) / Math.log(10);
}
function Ta(r, e) {
  return Math.pow(r, e);
}
function $(r, e, i) {
  return Math.min(i, Math.max(e, r));
}
function ze(r, e) {
  return !E(r) || !E(e) ? e : (Object.keys(e).forEach((i) => {
    const s = r[i], n = e[i];
    Array.isArray(s) && Array.isArray(n) ? r[i] = ze(s.concat([]), n) : E(s) && E(n) ? r[i] = ze(Object.assign({}, s), n) : r[i] = n;
  }), r);
}
function ct(r) {
  if (r === null || typeof r != "object" || "isActiveClone" in r)
    return r;
  if (r instanceof Date)
    var e = new r.constructor();
  else
    var e = Array.isArray(r) ? [] : {};
  for (var i in r)
    Object.prototype.hasOwnProperty.call(r, i) && (r.isActiveClone = null, e[i] = ct(r[i]), delete r.isActiveClone);
  return e;
}
function Tr(r, e, i) {
  const [s, ...n] = e.split(".");
  return {
    ...r,
    [s]: n.length ? Tr(r[s], n.join("."), i) : i
  };
}
function un(r, e) {
  return e.split(".").reduce((s, n) => s && s[n] !== "undefined" ? s[n] : void 0, r);
}
function Ei(r, e) {
  if (!P(r) || !P(e) || r.length !== e.length)
    return !1;
  let i = r.length;
  for (; i--; ) {
    if (P(r[i]) || P(e[i])) {
      if (!Ei(r[i], e[i]))
        return !1;
      continue;
    }
    if (E(r[i]) || E(r[i])) {
      if (!E(r[i], e[i]))
        return !1;
      continue;
    }
    if (r[i] !== e[i])
      return !1;
  }
  return !0;
}
function Ea(r, e, i) {
  var s = r[e];
  r.splice(e, 1), r.splice(i, 0, s);
}
function Sa(r, e, i) {
  [myArray[e], myArray[i]] = [myArray[i], myArray[e]];
}
function Er(r, e) {
  return P(e) ? P(r) ? r.every((i) => e.includes(i)) : e.includes(r) : !1;
}
function Sr(r, e) {
  if (!E(r) || !E(e))
    return !1;
  const i = Object.keys(r).sort(), s = Object.keys(e).sort();
  return i.length !== s.length ? !1 : i.every((o, a) => {
    const h = r[o], l = e[s[a]];
    return P(h) || P(l) ? Ei(h, l) : E(h) || E(l) ? Sr(h, l) : h === l;
  });
}
function Z(r = "ID") {
  T(r) ? r = r.toString() : S(r) || (r = "ID"), r = Nt(r);
  const e = Date.now().toString(36), i = Math.random().toString(36).substring(2, 5);
  return `${r}_${e}_${i}`;
}
function Nt(r) {
  return String(r).replace(/ |,|;|:|\.|#/g, "_");
}
const ba = (r) => r.entries().next().value, Ca = (r) => r.entries().next().value[0], Ma = (r) => r.entries().next().value[1], Pa = (r) => [...r].pop(), La = (r) => [...r.keys()].pop(), Aa = (r) => [...r.values()].pop();
class Et extends Map {
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
    return ba(this);
  }
  firstKey() {
    return Ca(this);
  }
  firstValue() {
    return Ma(this);
  }
  lastEntry() {
    return Pa(this);
  }
  lastKey() {
    return La(this);
  }
  lastValue() {
    return Aa(this);
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
    return P(e) ? (arr.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  populate(e) {
    return P(e) ? (this.clear(), arr.forEach(([i, s]) => this.set(i, s)), !0) : !1;
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
    return Sa(s, e, i), this.populate(s), !0;
  }
  swapKeys(e, i) {
    const s = [...this], n = s.findIndex(([a]) => a === e), o = s.findIndex(([a]) => a === i);
    return [s[n], s[o]] = [s[o], s[n]], this.clear(), s.forEach(([a, h]) => this.set(a, h)), !0;
  }
}
function xt(r, e = 100, i, s = !1) {
  var n, o = function() {
    var a = i || this, h = arguments, l = function() {
      n = null, s || r.apply(a, h);
    }, g = s && !n;
    clearTimeout(n), n = setTimeout(l, e), g && r.apply(a, h);
  };
  return o;
}
function Oa(r, e = 250, i) {
  var s, n, o = function() {
    var h = i || this, l = +/* @__PURE__ */ new Date(), g = arguments;
    s && l < s + e ? (clearTimeout(n), n = setTimeout(function() {
      s = l, r.apply(h, g);
    }, e)) : (s = l, r.apply(h, g));
  };
  function a() {
    timeout && (clearTimeout(n), timeout = void 0);
  }
  return o.reset = function() {
    a(), s = 0;
  }, o;
}
class Ia {
  #t;
  #e;
  #n;
  #r = [];
  constructor(e, i) {
    this.#t = e, this.#e = S(i.id) ? i.id : Z, this.#n = S(i.type) ? i.type : "default", this.#r = P(i.data) ? i.data : [];
  }
}
function Da(r, e = !1) {
  if (!P(r))
    return !1;
  let i = ya(0, r.length);
  if (!pi(r[0], e) || !pi(r[i], e) || !pi(r[r.length - 1], e))
    return !1;
  let s = r[0][0], n = r[1][0], o = r[2][0];
  return !(s > n && n > o);
}
function ka(r, e = !1) {
  if (!P(r))
    return !1;
  let i = 0, s = 0;
  for (; i < r.length; ) {
    if (!pi(r[i], e) || r[i][0] < s)
      return !1;
    s = r[i][0], i++;
  }
  return !0;
}
function pi(r, e = !1) {
  return !(!P(r) || r.length !== 6 || e && !ur(r[0]) || !T(r[1]) || !T(r[2]) || !T(r[3]) || !T(r[4]) || !T(r[5]));
}
function Ra(r) {
  for (let e of r)
    for (let i = 0; i < 6; i++)
      e.length = 6, e[i] *= 1;
  return r;
}
const _a = F, Na = "1m", Si = _a, $a = 6, fn = 0.05, Ha = 100, gn = 100, jt = ["default", "percent", "log"], pn = 0.3, mn = 30, oi = 200, yn = 200, vn = 20, wn = 4096, Ri = 5, xn = 50, Tn = 30, za = 8, ds = 30;
class yt {
  static t = 0;
  static o = 1;
  static h = 2;
  static l = 3;
  static c = 4;
  static v = 5;
}
class us {
  #t = Si;
  #e = "1s";
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
  initialCnt = mn;
  limitFuture = oi;
  limitPast = yn;
  minCandles = vn;
  maxCandles = wn;
  yAxisBounds = pn;
  rangeLimit = oi;
  anchor;
  #n;
  #r;
  #i = !0;
  constructor(e, i, s = {}) {
    if (!E(s) || !(s?.core instanceof I))
      return !1;
    this.#i = !0, this.setConfig(s), this.#n = s.core, e = T(e) ? e : 0, i = T(i) ? i : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const n = s?.interval || Si;
    if (this.data.length == 0) {
      let o = Date.now();
      e = 0, i = this.rangeLimit, this.#t = n, this.#e = Re(this.interval), this.anchor = o - o % n;
    } else
      this.data.length < 2 ? (this.#t = n, this.#e = Re(this.interval)) : (this.#t = fs(this.data), this.#e = Re(this.interval));
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
    this.#t = e;
  }
  get interval() {
    return this.#t;
  }
  set intervalStr(e) {
    this.#e = e;
  }
  get intervalStr() {
    return this.#e;
  }
  end() {
    WebWorker.destroy(this.#r.id);
  }
  set(e = 0, i = this.dataLength, s = this.maxCandles, n) {
    if (!T(e) || !T(i) || !T(s))
      return !1;
    e = e | 0, i = i | 0, s = s | 0, s = $(s, this.minCandles, this.maxCandles), e > i && ([e, i] = [i, e]), i = $(i, e + this.minCandles, e + s);
    let o = i - e;
    e = $(e, this.limitPast * -1, this.dataLength + this.limitFuture - this.minCandles - 1), i = $(i, e + this.minCandles, this.dataLength + this.limitFuture - 1), e = i - e < o ? e - (o - (i - e)) : e;
    const a = e, h = i, l = this.indexStart, g = this.indexEnd;
    let p = this.Length;
    this.indexStart = e, this.indexEnd = i, p -= this.Length;
    let v = this.maxMinPriceVol({ data: this.data, start: this.indexStart, end: this.indexEnd, that: this });
    return this.setMaxMin(v), this.setConfig(n), this.#n.emit("setRange", [a, h, l, g]), !0;
  }
  setConfig(e) {
    if (!E(e))
      return !1;
    this.initialCnt = T(e?.initialCnt) ? e.initialCnt : mn, this.limitFuture = T(e?.limitFuture) ? e.limitFuture : oi, this.limitPast = T(e?.limitPast) ? e.limitPast : yn, this.minCandles = T(e?.minCandles) ? e.minCandles : vn, this.maxCandles = T(e?.maxCandles) ? e.maxCandles : wn, this.yAxisBounds = T(e?.yAxisBounds) ? e.yAxisBounds : pn;
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
      const o = s.length - 1;
      return n = [null, null, null, null, null, null], s.length < 1 ? (n[0] = Date.now() + this.interval * e, n) : e < 0 ? (n[0] = s[0][0] + this.interval * e, n) : e > o ? (n[0] = s[o][0] + this.interval * (e - o), n) : null;
    }
  }
  valueByTS(e, i = "") {
    if (!T(e) || !S(i))
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
    if (!S(e))
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
    let { data: i, start: s, end: n, that: o } = { ...e }, a = lt(this.#n.bufferPx / this.#n.candleW);
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
    let h = i.length - 1, l = ut(s, 0, h), g = ut(n, 0, h), p = i[l][3], v = i[l][2], b = i[l][5], L = i[l][5], O = l, R = l, rt = l, B = l;
    for (; l++ < g; )
      i[l][3] < p && (p = i[l][3], O = l), i[l][2] > v && (v = i[l][2], R = l), i[l][5] < b && (b = i[l][5], rt = l), i[l][5] > L && (L = i[l][5], B = l);
    let k = v - p, Ut = p, ot = v;
    return p -= k * o.yAxisBounds, p = p > 0 ? p : 0, v += k * o.yAxisBounds, k = v - p, {
      valueLo: Ut,
      valueHi: ot,
      valueMin: p,
      valueMax: v,
      valueDiff: v - p,
      volumeMin: b,
      volumeMax: L,
      volumeDiff: L - b,
      valueMinIdx: O,
      valueMaxIdx: R,
      volumeMinIdx: rt,
      volumeMaxIdx: B
    };
    function ut(Q, et, ft) {
      return Math.min(ft, Math.max(et, Q));
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
function fs(r) {
  let e = Math.min(r.length - 1, 99), i = 1 / 0;
  return r.slice(0, e).forEach((s, n) => {
    let o = r[n + 1][0] - s[0];
    o === o && o < i && (i = o);
  }), i;
}
function gs(r, e) {
  if (!T(e))
    return !1;
  let i, s = r.timeFrameMS;
  return e = e - e % s, e === r.range.data[0][0] ? i = 0 : e < r.range.data[0][0] ? i = (r.range.data[0][0] - e) / s * -1 : i = (e - r.range.data[0][0]) / s, i;
}
const Oe = "TradeX-Chart", _e = "TX", Ba = "tradeXutils", En = "tradeXmenus", Ua = "tradeXmenu", Sn = "tradeXdividers", bn = "tradeXwindows", Wa = "tradeXwindow", Cn = "tradeXprogress", Fa = 500, Va = "stream_None", Ne = "stream_Listening", Mn = "stream_Started", Ga = "stream_Stopped", Ya = "stream_Error", Be = "stream_candleFirst", kt = "stream_candleUpdate", Ue = "stream_candleNew", qa = 250, Xa = 8, ja = 2, Ka = 2, Za = "defaultState", Qa = {
  id: Za,
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
    tf: Na,
    tfms: Si
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
}, Pn = {
  timestamp: "number",
  id: "string",
  side: "string",
  price: "number",
  amount: "number",
  filled: "number",
  average: "number",
  total: "number",
  tag: "string"
}, Ln = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string",
  url: "string"
};
let Ki = class H {
  static #t = new Et();
  static get default() {
    return ct(Qa);
  }
  static get list() {
    return H.#t;
  }
  static create(e, i = !1, s = !1) {
    const n = new H(e, i, s), o = n.key;
    return H.#t.set(o, n), n;
  }
  static validate(e, i = !1, s = !1) {
    const n = this.default;
    if (E(e) || (e = {}), E(e.chart) || (e.chart = n.chart, e.chart.isEmpty = !0, e.chart.data = P(e.ohlcv) ? e.ohlcv : [], delete e.ohlcv), e = ze(n, e), i ? e.chart.data = ka(e.chart.data, s) ? e.chart.data : [] : e.chart.data = Da(e.chart.data, s) ? e.chart.data : [], e.chart.isEmpty = e.chart.data.length == 0, !T(e.chart?.tf) || i) {
      let l = fs(e.chart.data);
      l < W && (l = Si), e.chart.tfms = l;
    }
    if ((!S(e.chart?.tfms) || i) && (e.chart.tf = Re(e.chart.tfms)), P(e.views) || (e.views = n.views), P(e.primary) || (e.primary = n.primary), P(e.secondary) || (e.secondary = n.secondary), E(e.chart.settings) || (e.chart.settings = n.chart.settings), P(e.datasets) || (e.datasets = []), e.views.length == 0) {
      e.views.push(["primary", e.primary]);
      for (let l in e)
        l.indexOf("secondary") == 0 && e.views.push([l, e[l]]);
    }
    let o = e.views, a = o.length;
    for (; a--; )
      if (!P(o[a]) || o[a].length == 0)
        o.splice(a, 1);
      else {
        let l = e.views[a][1], g = l.length;
        for (; g--; )
          !E(l[g]) || !S(l[g].name) || !S(l[g].type) ? l.splice(g, 1) : E(l[g].settings) || (l[g].settings = {});
        o[a].length == 0 && o.splice(a, 1);
      }
    e.views.length == 0 && (e.views[0] = ["primary", n.primary]), e.views = new Et(e.views), e.views.has("primary") || e.views.insert("primary", n.primary, 0), e.views.get("primary").push(e.chart);
    for (var h of e.datasets)
      this.#i || (this.#i = {}), this.dss[h.id] = new Ia(this, h);
    return e;
  }
  static delete(e) {
    if (!S(e) || !H.has(e))
      return !1;
    H.#t.delete(e);
  }
  static has(e) {
    return H.#t.has(e);
  }
  static get(e) {
    return H.#t.get(e);
  }
  static export(e, i = {}) {
    if (!H.has(e))
      return !1;
    E(i) || (i = {});
    const s = H.get(e), n = i?.type, o = ct(s.data), a = o.chart.data;
    let h;
    switch (a.length > 0 && a[a.length - 1].length > 6 && (a.length = a.length - 1), o.views.get("primary").pop(), o.views = Array.from(o.views), n) {
      case "json":
      default:
        const { replacer: l, space: g } = { ...i };
        h = JSON.stringify(o, l, g);
    }
    return h;
  }
  #e = "";
  #n = "";
  #r = {};
  #i = {};
  #s;
  #l = !1;
  #a = !0;
  #h = [];
  constructor(e, i = !1, s = !1) {
    E(e) ? (this.#r = H.validate(e, i, s), this.#l = "valid", this.#a = !!this.#r.chart?.isEmpty, this.#s = e?.core instanceof I ? e.core : void 0) : (this.#r = H.default, this.#l = "default", this.#a = !0), this.#e = e?.id || "", this.#n = Z(`${_e}_state`);
  }
  get id() {
    return this.#e;
  }
  get key() {
    return this.#n;
  }
  get status() {
    return this.#l;
  }
  get isEmpty() {
    return this.#a;
  }
  get allData() {
    return {
      data: this.#r.chart.data,
      primaryPane: this.#r.secondary,
      secondaryPane: this.#r.secondary,
      datasets: this.#r.datasets
    };
  }
  get data() {
    return this.#r;
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
    return H.create(e, i, s);
  }
  delete(e) {
    if (!S(e))
      return !1;
    if (e !== this.key)
      H.delete(e);
    else if (H.has(e)) {
      const i = H.create();
      this.use(i.key), H.delete(e);
    }
    return !0;
  }
  list() {
    return H.list;
  }
  has(e) {
    return H.has(e);
  }
  get(e) {
    return H.get(e);
  }
  use(e) {
    const i = this.core;
    if (!H.has(e))
      return i.warn(`${i.name} id: ${i.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    i.stream.stop(), i.MainPane.reset();
    let s = H.get(e);
    this.#e = s.id, this.#l = s.status, this.#a = s.isEmpty, this.#r = s.data;
    const n = {
      interval: s.data.chart.tfms,
      core: i
    };
    if (i.getRange(null, null, n), this.range.Length > 1) {
      const o = gs(i.time, void 0), a = o ? o + this.range.initialCnt : s.data.length - 1, h = o || a - this.range.initialCnt;
      this.range.initialCnt = a - h, i.setRange(h, a);
    }
    i.MainPane.restart(), i.refresh();
  }
  export(e = this.key, i = {}) {
    return H.export(e, i = {});
  }
  mergeData(e, i = !1, s = !1) {
    if (!E(e))
      return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let n = P(e?.ohlcv) ? e.ohlcv.length - 1 : 0;
    if (n > 1 && this.time.timeFrameMS !== fs(e?.ohlcv))
      return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    (this.#a || !T(this.time.timeFrameMS)) && (!E(i) || !T(i.start) || !T(i.end)) && n > 1 && (i = { start: n - this.range.initialCnt, end: n }), E(i) ? (T(i?.startTS) ? i.start = i.startTS : i.start = T(i.start) ? this.range.value(i.start)[0] : this.range.timeMin, T(i?.endTS) ? i.end = i.endTS : i.end = T(i.end) ? this.range.value(i.end)[0] : this.range.timeMax) : (i = {}, i.start = this.range.timeMin, i.end = this.range.timeMax);
    let o, a, h = e?.ohlcv || !1;
    const l = this.allData.data, g = this.allData?.primaryPane, p = e?.primary || !1;
    this.allData?.secondaryPane;
    const v = e?.secondary || !1;
    this.allData?.dataset?.data;
    const b = e?.dataset?.data || !1;
    this.allData?.trades, e?.trades, this.allData?.events, e?.events;
    const L = P(h) && this.range.inRange(h[0][0]) ? 1 : 0, O = {};
    if (P(h) && h.length > 0) {
      if (o = h.length - 1, l.length - 1, O.mData = this.range.inRange(h[0][0]) && this.range.inRange(h[0][o]), !X(h[o][7]) && h[o].length !== 8 && h[o][6] !== null && h[o][7] !== !0 ? h = Ra(h) : i.end >= this.range.timeFinish && i.start <= this.range.timeFinish && (i.start += this.range.interval, i.end += this.range.interval), l.length == 0 ? this.allData.data.push(...h) : (i = i || {
        start: this.range.timeMin,
        end: this.range.timeMax
      }, this.data.chart.data = this.merge(l, h)), s)
        this.#s.calcAllIndicators();
      else {
        if (P(p) && p.length > 0) {
          for (let B of p)
            if (P(B?.data) && B?.data.length > 0)
              for (let k of g)
                k.name === B.name && k.type === B.type && Sr(k.settings, B.settings) && (k.data = this.merge(k.data, B.data));
        }
        if (P(v) && v.length > 0)
          for (let B of v)
            P(B?.data) && B?.data.length > 0;
      }
      if (P(b) && b.length > 0)
        for (let B of b)
          P(B?.data) && B?.data.length > 0;
      i && (E(i) ? (a = T(i.start) ? this.range.getTimeIndex(i.start) : this.range.indexStart, n = T(i.end) ? this.range.getTimeIndex(i.end) : this.range.indexEnd) : (h[0][0] && (a = this.range.indexStart + L), n = this.range.indexEnd + L), this.#s.setRange(a, n));
      let R, rt = !1;
      for (R in O)
        rt = rt || R;
      return e.ohlcv.length > 1 && this.#s.emit("state_mergeComplete"), rt && this.#s.refresh(), this.#a = !1, !0;
    }
  }
  merge(e, i) {
    let s = [], n, o;
    if (e[0][0] < i[0][0] ? (n = e, o = i) : (n = i, o = e), o.length == 1 && o[0][0] == n[n.length - 1][0])
      n[n.length - 1] = o[0], s = n;
    else if (o.length == 1 && o[0][0] == n[n.length - 1][0] + this.range.interval)
      s = n.concat(o);
    else if (n[n.length - 1][0] >= o[0][0]) {
      let a = 0;
      for (; n[a][0] < o[0][0]; )
        s.push(n[a]), a++;
      s = s.concat(o);
      let h = a + o.length;
      h < n.length && (s = s.concat(n.slice(h)));
    } else if (o[0][0] - n[n.length - 1][0] > this.range.interval) {
      s = n;
      let a = n[n.length - 1][0], h = Math.floor((o[0][0] - a) / this.range.interval);
      for (h; h > 0; h--) {
        let l = Array(o[0].length).fill(null);
        l[0] = a, s.push(l), s = s.concat(o);
      }
    } else
      s = n.concat(o);
    return s;
  }
  addTrade(e) {
    const i = Object.keys(e), s = Object.keys(Pn);
    if (!E(e) || !Ei(i, s))
      return !1;
    for (let a of s)
      if (typeof e[a] !== Pn[a])
        return !1;
    const n = e.timestamp - e.timestamp % this.time.timeFrameMS, o = new Date(n);
    return e.dateStr = `${o.getFullYear()}/${o.getMonth() + 1}/${o.getDate()} ${o.getHours()}:${o.getMinutes()}`, P(this.allData.trades[n]) || (this.allData.trades[n] = []), this.allData.trades[n].push(e), !0;
  }
  removeTrade(e) {
    console.log("TODO: state.removeTrade()");
  }
  addEvent(e) {
    const i = Object.keys(e), s = Object.keys(Ln);
    if (!E(e) || !Ei(i, s))
      return !1;
    for (let a of s)
      if (typeof t[a] !== Ln[a])
        return !1;
    const n = t.timestamp - t.timestamp % this.time.timeFrameMS, o = new Date(n);
    return e.dateStr = `${o.getFullYear()}/${o.getMonth() + 1}/${o.getDate()} ${o.getHours()}:${o.getMinutes()}`, P(this.allData.events[n]) || (this.allData.events[n] = []), this.allData.events[n].push(e), !0;
  }
  removeEvent(e) {
    console.log("TODO: state.removeEvent()");
  }
};
class Bt {
  #t;
  #e;
  #n;
  #r = {};
  #i;
  #s;
  #l = "stopped";
  #a;
  #h;
  #o;
  #c;
  #u = ["await", "idle", "running", "stopped"];
  constructor(e, i) {
    if (!Bt.validateConfig(e))
      return !1;
    const s = { ...e };
    this.id = s.id, this.#i = s, this.#e = s.initial, this.#r.origin = i, this.#c = s.actions, this.#s = i.core, this.#d();
  }
  set id(e) {
    this.#t = Nt(e);
  }
  get id() {
    return this.#t;
  }
  get state() {
    return this.#e;
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
    return this.#h;
  }
  get events() {
    return this.#a;
  }
  get eventData() {
    return this.#o;
  }
  get actions() {
    return this.#c;
  }
  notify(e, i) {
    this.#h = e, this.#o = i;
    const s = this.#i.states[this.#e];
    let n = s.on[e];
    if (!n || !z(n.action) || this.#l !== "running")
      return !1;
    let o = n?.condition?.type || n?.condition || !1;
    if (o && !this.condition.call(this, o, n.condition))
      return !1;
    const a = n.target, h = this.#i.states[a];
    if (s?.onExit.call(this, i), n.action.call(this, i), this.#n = this.#e, this.#e = a, h?.onEnter.call(this, i), this.#i.states[a]?.on && (this.#i.states[a].on[""] || this.#i.states[a].on?.always)) {
      const l = this.#i.states[a].on[""] || this.#i.states[a].on.always;
      if (P(l))
        for (let g of l) {
          let p = g?.condition?.type || g?.condition || !1;
          this.condition.call(this, p, g.condition) && S(g.target) && (g?.action.call(this, i), this.#n = this.#e, this.#e = g?.target, this.notify(null, null));
        }
      else if (E(l) && S(l.target)) {
        let g = l?.condition?.type || l?.condition || !1;
        this.condition.call(this, g, l.condition) && S(l.target) && (l?.action.call(this, i), this.#n = this.#e, this.#e = l.target, this.notify(null, null));
      }
    }
    return this.#e;
  }
  condition(e, i = null, s = {}) {
    return e ? this.#i.guards[e].call(this, this.#r, i, s) : !1;
  }
  canTransition(e) {
    const i = this.#i.states[this.#e];
    return e in i.on;
  }
  start() {
    this.#l = "running";
  }
  stop() {
    this.#l = "stopped";
  }
  destroy() {
    this.#f(), this.#i = null;
  }
  #d() {
    this.#a = /* @__PURE__ */ new Set();
    for (let e in this.#i.states)
      for (let i in this.#i.states[e].on) {
        let s = this.notify.bind(this, i);
        this.#a.add({ topic: i, cb: s }), this.#s.on(i, s, this.context);
      }
  }
  #f() {
    for (let e of this.#a)
      this.#s.off(e.topic, e.cb);
  }
  static validateConfig(e) {
    if (!E(e))
      return !1;
    const i = ["id", "initial", "context", "states"];
    let s = Object.keys(e);
    if (!Er(i, s) || !(e.initial in e.states))
      return !1;
    for (let n in e.states) {
      if (!E(e.states[n]) || "onEnter" in e.states[n] && !z(e.states[n].onEnter) || "onExit" in e.states[n] && !z(e.states[n].onExit))
        return !1;
      if ("on" in e.states[n])
        for (let o in e.states[n].on) {
          let a = e.states[n].on[o];
          if (!S(a.target) || "action" in a && !z(a.action))
            return !1;
        }
    }
    return !0;
  }
}
const Ja = "alert";
class tl {
  #t = new Et();
  #e = {};
  constructor(e) {
    if (P(e))
      for (let i of e)
        this.add(i?.price, i?.condition, i?.handler);
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
  batchAdd(e) {
    if (P(e)) {
      let i = [];
      for (let s of e)
        i.push(this.add(s?.price, s?.condition, s?.handler));
      return i;
    } else
      return !1;
  }
  add(e, i, s) {
    if (isNaN(e) || !z(s))
      return !1;
    const n = Z(Ja), o = { price: e, condition: i };
    if (this.list.has(o)) {
      let a = this.list.get(o);
      a[n] = s;
    } else {
      const a = {};
      a[n] = s, this.list.set(o, a);
    }
    return this.#e[n] = { alert: o, handler: s }, n;
  }
  remove(e) {
    if (!(e in this.#e))
      return !1;
    const i = this.#e[e], s = i.alert, n = this.#t.get(s);
    return n.delete(e), i.delete(e), Object.keys(n).length == 0 && this.#t.delete(s), !0;
  }
  delete(e, i) {
    if (this.list.has({ price: e, condition: i })) {
      const s = this.list.get({ price: e, condition: i });
      for (let n in s)
        this.#e.delete(n), s.delete(n);
    }
    return this.list.delete({ price: e, condition: i });
  }
  pause(e) {
    if (!(e in this.#e))
      return !1;
    this.#e[e];
  }
  handlerByID(e) {
    return e in this.#e ? this.#e[e].handler : !1;
  }
  check(e, i) {
    if (!(!P(e) || !P(i))) {
      for (let [s, n] of this.list)
        if (s.condition(s.price, e, i))
          for (let o in n)
            try {
              n[o](s.price, e, i);
            } catch (a) {
              console.error(a);
            }
    }
  }
}
const el = 0, il = 1, sl = 2, nl = 3, rl = 4, ol = 5, ai = [null, null, null, null, null], li = {
  tfCountDown: !0,
  alerts: []
};
class he {
  #t;
  #e;
  #n;
  #r;
  #i;
  #s;
  #l;
  #a = ai;
  #h = 0;
  #o = 0;
  #c = "";
  #u = !1;
  #d;
  #f;
  #m = ai;
  #y;
  static validateConfig(e) {
    if (E(e)) {
      let i = ct(li);
      e = ze(i, e), e.tfCountDown = X(e.tfCountDown) ? e.tfCountDown : li.tfCountDown, e.alerts = P(e.alerts) ? e.alerts : li.alerts;
    } else
      return li;
    return e;
  }
  constructor(e) {
    this.#t = e, this.#r = e.time, this.status = { status: Va }, this.#e = he.validateConfig(e.config?.stream), this.#i = T(e.config?.maxCandleUpdate) ? e.config.maxCandleUpdate : qa, this.#l = T(e.config?.streamPrecision) ? e.config.streamPrecision : Xa;
  }
  get config() {
    return this.#e;
  }
  get countDownMS() {
    return this.#o;
  }
  get countDown() {
    return this.#c;
  }
  get range() {
    return this.#t.range;
  }
  get status() {
    return this.#n;
  }
  set status({ status: e, data: i }) {
    this.#n = e, this.emit(e, i);
  }
  set dataReceived(e) {
    this.#u || (this.#u = !0, this.status = { status: Be, data: e });
  }
  get alerts() {
    return this.#y;
  }
  get lastPriceMin() {
    return this.#f;
  }
  set lastPriceMin(e) {
    T(e) && (this.#f = e);
  }
  get lastPriceMax() {
    return this.#d;
  }
  set lastPriceMax(e) {
    T(e) && (this.#d = e);
  }
  get lastTick() {
    return this.#m;
  }
  set lastTick(e) {
    P(e) && (this.#m, this.#m = e, this.alerts.check(e, this.#a));
  }
  set candle(e) {
    const i = [...this.#a];
    e.t = this.roundTime(new Date(e.t)), e.o = e.o * 1, e.h = e.h * 1, e.l = e.l * 1, e.c = e.c * 1, e.v = e.v * 1, this.#a[el] !== e.t ? this.newCandle(e) : this.updateCandle(e), this.status = { status: Ne, data: this.#a }, this.lastTick = i;
  }
  get candle() {
    return this.#a !== ai ? this.#a : null;
  }
  start() {
    this.#y = new tl(this.#e.alerts), this.status = { status: Mn }, this.#s = setInterval(this.onUpdate.bind(this), this.#i);
  }
  stop() {
    this.#y.destroy(), this.status = { status: Ga };
  }
  emit(e, i) {
    this.#t.emit(e, i);
  }
  error() {
    this.status = { status: Ya };
  }
  onTick(e) {
    (this.#n == Mn || this.#n == Ne) && E(e) && (this.candle = e);
  }
  onUpdate() {
    this.#a !== ai && (this.status = { status: kt, data: this.candle }, this.status = { status: Ne, data: this.#a });
  }
  newCandle(e) {
    this.prevCandle(), this.#a = [
      e.t,
      e.o,
      e.h,
      e.l,
      e.c,
      e.v,
      null,
      !0
    ], this.#t.state.mergeData({ ohlcv: [this.#a] }, !0, !1), this.status = { status: Ue, data: { data: e, candle: this.#a } }, this.#o = this.#r.timeFrameMS, this.#h = this.roundTime(Date.now());
  }
  prevCandle() {
    const e = this.#t.allData.data;
    e.length > 0 && e[e.length - 1][7] && (e[e.length - 1].length = 6);
  }
  updateCandle(e) {
    let i = this.#a;
    i[il] = e.o, i[sl] = e.h, i[nl] = e.l, i[rl] = e.c, i[ol] = e.v, this.#a = i;
    const s = this.#t.allData.data, n = s.length > 0 ? s.length - 1 : 0;
    s[n] = this.#a, this.countDownUpdate();
  }
  countDownUpdate() {
    let e, i, s, n, o, a, h;
    this.#r.timeFrameMS;
    let l = this.#r.timeFrameMS - (Date.now() - this.#h);
    return l < 0 && (l = 0), this.#o = l, l > wt ? (e = String(Math.floor(l / wt)), i = String(Math.floor(l % wt / ht)).padStart(2, "0"), this.#c = `${e}Y ${i}M`) : l > ht ? (i = String(Math.floor(l / ht)).padStart(2, "0"), n = String(Math.floor(l % ht / N)).padStart(2, "0"), this.#c = `${i}M ${n}D`) : l > ge ? (s = String(Math.floor(l / ge)).padStart(2, "0"), n = String(Math.floor(l % ht / N)).padStart(2, "0"), this.#c = `${s}W ${n}D`) : l > N ? (n = String(Math.floor(l / N)).padStart(2, "0"), o = String(Math.floor(l % N / j)).padStart(2, "0"), a = String(Math.floor(l % j / F)).padStart(2, "0"), this.#c = `${n}D ${o}:${a}`) : l > j ? (o = String(Math.floor(l / j)).padStart(2, "0"), a = String(Math.floor(l % j / F)).padStart(2, "0"), h = String(Math.floor(l % F / W)).padStart(2, "0"), this.#c = `${o}:${a}:${h}`) : l > F ? (a = String(Math.floor(l / F)).padStart(2, "0"), h = String(Math.floor(l % F / W)).padStart(2, "0"), this.#c = `00:${a}:${h}`) : (h = String(Math.floor(l / W)).padStart(2, "0"), String(l % W).padStart(4, "0"), this.#c = `00:00:${h}`), this.#c;
  }
  roundTime(e) {
    return e - e % this.#t.time.timeFrameMS;
  }
}
const br = {
  findByID(r, e = document) {
    return e.getElementById(r);
  },
  findByClass(r, e = document) {
    return e.getElementsByClassName(r);
  },
  findByName(r, e = document) {
    return e.getElementsByName(r);
  },
  fndByTag(r, e = document) {
    return e.getElementsByTagName(r);
  },
  findBySelector(r, e = document) {
    return e.querySelector(r);
  },
  findBySelectorAll(r, e = document) {
    return e.querySelectorAll(r);
  },
  isNode(r) {
    return typeof Node == "object" ? r instanceof Node : r && typeof r == "object" && typeof r.nodeType == "number" && typeof r.nodeName == "string";
  },
  isElement(r) {
    return typeof HTMLElement == "object" ? r instanceof HTMLElement : r && typeof r == "object" && r !== null && r.nodeType === 1 && typeof r.nodeName == "string";
  },
  isVisible(r) {
    return this.isElement(r) ? !!r && !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length) : !1;
  },
  isInViewport(r) {
    if (!this.isElement(r))
      return !1;
    const e = r.getBoundingClientRect();
    return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
  },
  isVisibleToUser(r) {
    if (!this.isElement(r))
      return !1;
    const e = getComputedStyle(elem);
    if (e.display === "none" || e.visibility !== "visible" || e.opacity < 0.1 || r.offsetWidth + r.offsetHeight + r.getBoundingClientRect().height + r.getBoundingClientRect().width === 0)
      return !1;
    const i = {
      x: r.getBoundingClientRect().left + r.offsetWidth / 2,
      y: r.getBoundingClientRect().top + r.offsetHeight / 2
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
  isImage(r, e) {
    if (this.isSVG(r))
      var i = window.URL || window.webkitURL || window, r = new Blob([r], { type: "image/svg+xml" }), r = i.createObjectURL(r);
    const s = new Image();
    if (s.src = r, z(e))
      s.complete ? e(s) : (s.onload = () => e(s), s.onerror = () => e(!1));
    else
      return new Promise(function(n, o) {
        s.complete ? n(s) : (s.onload = () => n(s), s.onerror = () => o(!1));
      });
  },
  isSVG(r) {
    return S(r) ? /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/.test(r) : !1;
  },
  elementDimPos(r) {
    if (!this.isElement(r))
      return !1;
    let e = 0, i = 0, s = r;
    for (; s && s.tagName.toLowerCase() != "body" && !isNaN(s.offsetLeft) && !isNaN(s.offsetTop); )
      e += s.offsetLeft - s.scrollLeft, i += s.offsetTop - s.scrollTop, s = s.offsetParent;
    const n = r.getBoundingClientRect();
    let o = n.right - n.left, a = n.bottom - n.top, h = this.isVisible(r), l = this.isInViewport(r);
    return { top: i, bottom: i + a, left: e, right: e + o, width: o, height: a, visible: h, viewport: l };
  },
  elementsDistance(r, e) {
    return !this.isElement(r) || !this.isElement(r) ? !1 : (el1Location = this.elementDimPos(r), el2Location = this.elementDimPos(e), {
      x: el1Location.top - el2Location.top,
      y: el1Location.left.el2Location.left,
      el1Location,
      el2Location
    });
  },
  htmlToElement(r) {
    if (!S(r))
      return !1;
    const e = document.createElement("template");
    return r = r.trim(), e.innerHTML = r, e.content.firstChild;
  },
  htmlToElements(r) {
    if (!S(r))
      return !1;
    const e = document.createElement("template");
    return e.innerHTML = r, e.content.childNodes;
  },
  svgToImage(r, e, i) {
    if (!this.isSVG(r) || !T(i?.w) || !T(i?.h))
      return !1;
    let s = i.w, n = i.h, o = document.createElement("canvas");
    o.width = s, o.height = n;
    let a = this.htmlToElement(r);
    a.style.fill = e, a.setAttribute("width", s), a.setAttribute("height", n), a.xmlns = "http://www.w3.org/2000/svg";
    let h = new XMLSerializer().serializeToString(a), p = "data:image/svg+xml;base64," + btoa(h), v = new Image();
    return v.setAttribute("width", s), v.setAttribute("height", n), v.onload = () => {
      o.getContext("2d").drawImage(v, 0, 0, s, n);
    }, v.src = p, v;
  },
  hideOnClickOutside(r) {
    if (!this.isElement(r))
      return !1;
    const e = (s) => {
      !r.contains(s.target) && this.isVisible(r) && (r.style.display = "none", i());
    }, i = () => {
      document.removeEventListener("click", e);
    };
    document.addEventListener("click", e);
  },
  onClickOutside(r, e) {
    if (!this.isElement(r))
      return !1;
    const i = (n) => {
      !r.contains(n.target) && br.isVisible(r) && (e(), s());
    }, s = () => {
      document.removeEventListener("click", i);
    };
    document.addEventListener("click", i);
  },
  getStyle(r, e) {
    let i, s;
    if (S(r))
      i = document.getElementById(r);
    else if (this.isElement(r))
      i = r;
    else
      return !1;
    return S(e) ? (window.getComputedStyle ? s = document.defaultView.getComputedStyle(i, null).getPropertyValue(e) : i.currentStyle && (s = i.currentStyle[e]), s) : !1;
  },
  addStyleRule(r, e, i, s) {
    let n = this.findStyleRule(r, e, i, s);
    if (n)
      n.i >= 0 ? n.rules[n.i].style[n.property] = n.value : this.addCSSRule(n.styleSheet, n.selector, n.rules, n.index);
    else
      return;
  },
  deleteStyleRule(r, e, i) {
    let s = this.findStyleRule(r, e, i, "");
    (s.styleSheet.deleteRule || s.styleSheet.removeRule)(s.i);
  },
  findStyleRule(r, e, i, s) {
    if (!r || !E(r))
      return null;
    if (r.constructor.name == "HTMLStyleElement")
      r = r.sheet;
    else if (r.constructor.name != "CSSStyleSheet")
      return null;
    let n = this.styleRuleSanitize(e, i, s);
    e = n[0], i = n[1], s = n[2];
    const o = r.cssRules || r.rules;
    for (var a = o.length - 1; a > 0 && o[a].selectorText !== e; --a)
      ;
    return { styleSheet: r, rules: o, selector: e, property: i, value: s, i: a };
  },
  styleRuleSanitize(r, e, i) {
    return [
      r = r.toLowerCase().replace(/\s+/g, " "),
      e = e.toLowerCase(),
      i = i.toLowerCase()
    ];
  },
  addCSSRule(r, e, i, s) {
    r.insertRule ? r.insertRule(e + "{" + i + "}", s) : r.addRule(e, i, s);
  },
  findTargetParentWithClass(r, e) {
    return !this.isElement(r) || !S(e) ? null : r.classList.contains(e) ? r : this.findTargetParentWithClass(r.parentElement, e);
  }
}, D = br, al = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const ll = ((r) => "onorientationchange" in r || r.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in r || r.DocumentTouch && document instanceof r.DocumentTouch)(typeof window < "u" ? window : {}), hl = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class ie {
  #t = 0;
  #e = 0;
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
    T(e) && (this.#t = e);
  }
  get x() {
    return this.#t;
  }
  set y(e) {
    T(e) && (this.#e = e);
  }
  get y() {
    return this.#e;
  }
  clone() {
    return new ie(this.x, this.y);
  }
}
function cl(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Cr = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(r) {
  (function(e, i, s, n) {
    var o = ["", "webkit", "Moz", "MS", "ms", "o"], a = i.createElement("div"), h = "function", l = Math.round, g = Math.abs, p = Date.now;
    function v(c, u, f) {
      return setTimeout(Ut(c, f), u);
    }
    function b(c, u, f) {
      return Array.isArray(c) ? (L(c, f[u], f), !0) : !1;
    }
    function L(c, u, f) {
      var m;
      if (c)
        if (c.forEach)
          c.forEach(u, f);
        else if (c.length !== n)
          for (m = 0; m < c.length; )
            u.call(f, c[m], m, c), m++;
        else
          for (m in c)
            c.hasOwnProperty(m) && u.call(f, c[m], m, c);
    }
    function O(c, u, f) {
      var m = "DEPRECATED METHOD: " + u + `
` + f + ` AT 
`;
      return function() {
        var x = new Error("get-stack-trace"), M = x && x.stack ? x.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", A = e.console && (e.console.warn || e.console.log);
        return A && A.call(e.console, m, M), c.apply(this, arguments);
      };
    }
    var R;
    typeof Object.assign != "function" ? R = function(u) {
      if (u === n || u === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var f = Object(u), m = 1; m < arguments.length; m++) {
        var x = arguments[m];
        if (x !== n && x !== null)
          for (var M in x)
            x.hasOwnProperty(M) && (f[M] = x[M]);
      }
      return f;
    } : R = Object.assign;
    var rt = O(function(u, f, m) {
      for (var x = Object.keys(f), M = 0; M < x.length; )
        (!m || m && u[x[M]] === n) && (u[x[M]] = f[x[M]]), M++;
      return u;
    }, "extend", "Use `assign`."), B = O(function(u, f) {
      return rt(u, f, !0);
    }, "merge", "Use `assign`.");
    function k(c, u, f) {
      var m = u.prototype, x;
      x = c.prototype = Object.create(m), x.constructor = c, x._super = m, f && R(x, f);
    }
    function Ut(c, u) {
      return function() {
        return c.apply(u, arguments);
      };
    }
    function ot(c, u) {
      return typeof c == h ? c.apply(u && u[0] || n, u) : c;
    }
    function ut(c, u) {
      return c === n ? u : c;
    }
    function Q(c, u, f) {
      L(oe(u), function(m) {
        c.addEventListener(m, f, !1);
      });
    }
    function et(c, u, f) {
      L(oe(u), function(m) {
        c.removeEventListener(m, f, !1);
      });
    }
    function ft(c, u) {
      for (; c; ) {
        if (c == u)
          return !0;
        c = c.parentNode;
      }
      return !1;
    }
    function gt(c, u) {
      return c.indexOf(u) > -1;
    }
    function oe(c) {
      return c.trim().split(/\s+/g);
    }
    function Wt(c, u, f) {
      if (c.indexOf && !f)
        return c.indexOf(u);
      for (var m = 0; m < c.length; ) {
        if (f && c[m][f] == u || !f && c[m] === u)
          return m;
        m++;
      }
      return -1;
    }
    function Xe(c) {
      return Array.prototype.slice.call(c, 0);
    }
    function Ws(c, u, f) {
      for (var m = [], x = [], M = 0; M < c.length; ) {
        var A = u ? c[M][u] : c[M];
        Wt(x, A) < 0 && m.push(c[M]), x[M] = A, M++;
      }
      return f && (u ? m = m.sort(function(q, tt) {
        return q[u] > tt[u];
      }) : m = m.sort()), m;
    }
    function je(c, u) {
      for (var f, m, x = u[0].toUpperCase() + u.slice(1), M = 0; M < o.length; ) {
        if (f = o[M], m = f ? f + x : u, m in c)
          return m;
        M++;
      }
      return n;
    }
    var fo = 1;
    function go() {
      return fo++;
    }
    function Fs(c) {
      var u = c.ownerDocument || c;
      return u.defaultView || u.parentWindow || e;
    }
    var po = /mobile|tablet|ip(ad|hone|od)|android/i, Vs = "ontouchstart" in e, mo = je(e, "PointerEvent") !== n, yo = Vs && po.test(navigator.userAgent), Te = "touch", vo = "pen", zi = "mouse", wo = "kinect", xo = 25, J = 1, Zt = 2, U = 4, it = 8, Ke = 1, Ee = 2, Se = 4, be = 8, Ce = 16, At = Ee | Se, Qt = be | Ce, Gs = At | Qt, Ys = ["x", "y"], Ze = ["clientX", "clientY"];
    function pt(c, u) {
      var f = this;
      this.manager = c, this.callback = u, this.element = c.element, this.target = c.options.inputTarget, this.domHandler = function(m) {
        ot(c.options.enable, [c]) && f.handler(m);
      }, this.init();
    }
    pt.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && Q(this.element, this.evEl, this.domHandler), this.evTarget && Q(this.target, this.evTarget, this.domHandler), this.evWin && Q(Fs(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && et(this.element, this.evEl, this.domHandler), this.evTarget && et(this.target, this.evTarget, this.domHandler), this.evWin && et(Fs(this.element), this.evWin, this.domHandler);
      }
    };
    function To(c) {
      var u, f = c.options.inputClass;
      return f ? u = f : mo ? u = Ui : yo ? u = ti : Vs ? u = Wi : u = Je, new u(c, Eo);
    }
    function Eo(c, u, f) {
      var m = f.pointers.length, x = f.changedPointers.length, M = u & J && m - x === 0, A = u & (U | it) && m - x === 0;
      f.isFirst = !!M, f.isFinal = !!A, M && (c.session = {}), f.eventType = u, So(c, f), c.emit("hammer.input", f), c.recognize(f), c.session.prevInput = f;
    }
    function So(c, u) {
      var f = c.session, m = u.pointers, x = m.length;
      f.firstInput || (f.firstInput = qs(u)), x > 1 && !f.firstMultiple ? f.firstMultiple = qs(u) : x === 1 && (f.firstMultiple = !1);
      var M = f.firstInput, A = f.firstMultiple, Y = A ? A.center : M.center, q = u.center = Xs(m);
      u.timeStamp = p(), u.deltaTime = u.timeStamp - M.timeStamp, u.angle = Bi(Y, q), u.distance = Qe(Y, q), bo(f, u), u.offsetDirection = Ks(u.deltaX, u.deltaY);
      var tt = js(u.deltaTime, u.deltaX, u.deltaY);
      u.overallVelocityX = tt.x, u.overallVelocityY = tt.y, u.overallVelocity = g(tt.x) > g(tt.y) ? tt.x : tt.y, u.scale = A ? Po(A.pointers, m) : 1, u.rotation = A ? Mo(A.pointers, m) : 0, u.maxPointers = f.prevInput ? u.pointers.length > f.prevInput.maxPointers ? u.pointers.length : f.prevInput.maxPointers : u.pointers.length, Co(f, u);
      var It = c.element;
      ft(u.srcEvent.target, It) && (It = u.srcEvent.target), u.target = It;
    }
    function bo(c, u) {
      var f = u.center, m = c.offsetDelta || {}, x = c.prevDelta || {}, M = c.prevInput || {};
      (u.eventType === J || M.eventType === U) && (x = c.prevDelta = {
        x: M.deltaX || 0,
        y: M.deltaY || 0
      }, m = c.offsetDelta = {
        x: f.x,
        y: f.y
      }), u.deltaX = x.x + (f.x - m.x), u.deltaY = x.y + (f.y - m.y);
    }
    function Co(c, u) {
      var f = c.lastInterval || u, m = u.timeStamp - f.timeStamp, x, M, A, Y;
      if (u.eventType != it && (m > xo || f.velocity === n)) {
        var q = u.deltaX - f.deltaX, tt = u.deltaY - f.deltaY, It = js(m, q, tt);
        M = It.x, A = It.y, x = g(It.x) > g(It.y) ? It.x : It.y, Y = Ks(q, tt), c.lastInterval = u;
      } else
        x = f.velocity, M = f.velocityX, A = f.velocityY, Y = f.direction;
      u.velocity = x, u.velocityX = M, u.velocityY = A, u.direction = Y;
    }
    function qs(c) {
      for (var u = [], f = 0; f < c.pointers.length; )
        u[f] = {
          clientX: l(c.pointers[f].clientX),
          clientY: l(c.pointers[f].clientY)
        }, f++;
      return {
        timeStamp: p(),
        pointers: u,
        center: Xs(u),
        deltaX: c.deltaX,
        deltaY: c.deltaY
      };
    }
    function Xs(c) {
      var u = c.length;
      if (u === 1)
        return {
          x: l(c[0].clientX),
          y: l(c[0].clientY)
        };
      for (var f = 0, m = 0, x = 0; x < u; )
        f += c[x].clientX, m += c[x].clientY, x++;
      return {
        x: l(f / u),
        y: l(m / u)
      };
    }
    function js(c, u, f) {
      return {
        x: u / c || 0,
        y: f / c || 0
      };
    }
    function Ks(c, u) {
      return c === u ? Ke : g(c) >= g(u) ? c < 0 ? Ee : Se : u < 0 ? be : Ce;
    }
    function Qe(c, u, f) {
      f || (f = Ys);
      var m = u[f[0]] - c[f[0]], x = u[f[1]] - c[f[1]];
      return Math.sqrt(m * m + x * x);
    }
    function Bi(c, u, f) {
      f || (f = Ys);
      var m = u[f[0]] - c[f[0]], x = u[f[1]] - c[f[1]];
      return Math.atan2(x, m) * 180 / Math.PI;
    }
    function Mo(c, u) {
      return Bi(u[1], u[0], Ze) + Bi(c[1], c[0], Ze);
    }
    function Po(c, u) {
      return Qe(u[0], u[1], Ze) / Qe(c[0], c[1], Ze);
    }
    var Lo = {
      mousedown: J,
      mousemove: Zt,
      mouseup: U
    }, Ao = "mousedown", Oo = "mousemove mouseup";
    function Je() {
      this.evEl = Ao, this.evWin = Oo, this.pressed = !1, pt.apply(this, arguments);
    }
    k(Je, pt, {
      handler: function(u) {
        var f = Lo[u.type];
        f & J && u.button === 0 && (this.pressed = !0), f & Zt && u.which !== 1 && (f = U), this.pressed && (f & U && (this.pressed = !1), this.callback(this.manager, f, {
          pointers: [u],
          changedPointers: [u],
          pointerType: zi,
          srcEvent: u
        }));
      }
    });
    var Io = {
      pointerdown: J,
      pointermove: Zt,
      pointerup: U,
      pointercancel: it,
      pointerout: it
    }, Do = {
      2: Te,
      3: vo,
      4: zi,
      5: wo
    }, Zs = "pointerdown", Qs = "pointermove pointerup pointercancel";
    e.MSPointerEvent && !e.PointerEvent && (Zs = "MSPointerDown", Qs = "MSPointerMove MSPointerUp MSPointerCancel");
    function Ui() {
      this.evEl = Zs, this.evWin = Qs, pt.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    k(Ui, pt, {
      handler: function(u) {
        var f = this.store, m = !1, x = u.type.toLowerCase().replace("ms", ""), M = Io[x], A = Do[u.pointerType] || u.pointerType, Y = A == Te, q = Wt(f, u.pointerId, "pointerId");
        M & J && (u.button === 0 || Y) ? q < 0 && (f.push(u), q = f.length - 1) : M & (U | it) && (m = !0), !(q < 0) && (f[q] = u, this.callback(this.manager, M, {
          pointers: f,
          changedPointers: [u],
          pointerType: A,
          srcEvent: u
        }), m && f.splice(q, 1));
      }
    });
    var ko = {
      touchstart: J,
      touchmove: Zt,
      touchend: U,
      touchcancel: it
    }, Ro = "touchstart", _o = "touchstart touchmove touchend touchcancel";
    function Js() {
      this.evTarget = Ro, this.evWin = _o, this.started = !1, pt.apply(this, arguments);
    }
    k(Js, pt, {
      handler: function(u) {
        var f = ko[u.type];
        if (f === J && (this.started = !0), !!this.started) {
          var m = No.call(this, u, f);
          f & (U | it) && m[0].length - m[1].length === 0 && (this.started = !1), this.callback(this.manager, f, {
            pointers: m[0],
            changedPointers: m[1],
            pointerType: Te,
            srcEvent: u
          });
        }
      }
    });
    function No(c, u) {
      var f = Xe(c.touches), m = Xe(c.changedTouches);
      return u & (U | it) && (f = Ws(f.concat(m), "identifier", !0)), [f, m];
    }
    var $o = {
      touchstart: J,
      touchmove: Zt,
      touchend: U,
      touchcancel: it
    }, Ho = "touchstart touchmove touchend touchcancel";
    function ti() {
      this.evTarget = Ho, this.targetIds = {}, pt.apply(this, arguments);
    }
    k(ti, pt, {
      handler: function(u) {
        var f = $o[u.type], m = zo.call(this, u, f);
        m && this.callback(this.manager, f, {
          pointers: m[0],
          changedPointers: m[1],
          pointerType: Te,
          srcEvent: u
        });
      }
    });
    function zo(c, u) {
      var f = Xe(c.touches), m = this.targetIds;
      if (u & (J | Zt) && f.length === 1)
        return m[f[0].identifier] = !0, [f, f];
      var x, M, A = Xe(c.changedTouches), Y = [], q = this.target;
      if (M = f.filter(function(tt) {
        return ft(tt.target, q);
      }), u === J)
        for (x = 0; x < M.length; )
          m[M[x].identifier] = !0, x++;
      for (x = 0; x < A.length; )
        m[A[x].identifier] && Y.push(A[x]), u & (U | it) && delete m[A[x].identifier], x++;
      if (Y.length)
        return [
          Ws(M.concat(Y), "identifier", !0),
          Y
        ];
    }
    var Bo = 2500, tn = 25;
    function Wi() {
      pt.apply(this, arguments);
      var c = Ut(this.handler, this);
      this.touch = new ti(this.manager, c), this.mouse = new Je(this.manager, c), this.primaryTouch = null, this.lastTouches = [];
    }
    k(Wi, pt, {
      handler: function(u, f, m) {
        var x = m.pointerType == Te, M = m.pointerType == zi;
        if (!(M && m.sourceCapabilities && m.sourceCapabilities.firesTouchEvents)) {
          if (x)
            Uo.call(this, f, m);
          else if (M && Wo.call(this, m))
            return;
          this.callback(u, f, m);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function Uo(c, u) {
      c & J ? (this.primaryTouch = u.changedPointers[0].identifier, en.call(this, u)) : c & (U | it) && en.call(this, u);
    }
    function en(c) {
      var u = c.changedPointers[0];
      if (u.identifier === this.primaryTouch) {
        var f = { x: u.clientX, y: u.clientY };
        this.lastTouches.push(f);
        var m = this.lastTouches, x = function() {
          var M = m.indexOf(f);
          M > -1 && m.splice(M, 1);
        };
        setTimeout(x, Bo);
      }
    }
    function Wo(c) {
      for (var u = c.srcEvent.clientX, f = c.srcEvent.clientY, m = 0; m < this.lastTouches.length; m++) {
        var x = this.lastTouches[m], M = Math.abs(u - x.x), A = Math.abs(f - x.y);
        if (M <= tn && A <= tn)
          return !0;
      }
      return !1;
    }
    var sn = je(a.style, "touchAction"), nn = sn !== n, rn = "compute", on = "auto", Fi = "manipulation", Jt = "none", Me = "pan-x", Pe = "pan-y", ei = Vo();
    function Vi(c, u) {
      this.manager = c, this.set(u);
    }
    Vi.prototype = {
      set: function(c) {
        c == rn && (c = this.compute()), nn && this.manager.element.style && ei[c] && (this.manager.element.style[sn] = c), this.actions = c.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var c = [];
        return L(this.manager.recognizers, function(u) {
          ot(u.options.enable, [u]) && (c = c.concat(u.getTouchAction()));
        }), Fo(c.join(" "));
      },
      preventDefaults: function(c) {
        var u = c.srcEvent, f = c.offsetDirection;
        if (this.manager.session.prevented) {
          u.preventDefault();
          return;
        }
        var m = this.actions, x = gt(m, Jt) && !ei[Jt], M = gt(m, Pe) && !ei[Pe], A = gt(m, Me) && !ei[Me];
        if (x) {
          var Y = c.pointers.length === 1, q = c.distance < 2, tt = c.deltaTime < 250;
          if (Y && q && tt)
            return;
        }
        if (!(A && M) && (x || M && f & At || A && f & Qt))
          return this.preventSrc(u);
      },
      preventSrc: function(c) {
        this.manager.session.prevented = !0, c.preventDefault();
      }
    };
    function Fo(c) {
      if (gt(c, Jt))
        return Jt;
      var u = gt(c, Me), f = gt(c, Pe);
      return u && f ? Jt : u || f ? u ? Me : Pe : gt(c, Fi) ? Fi : on;
    }
    function Vo() {
      if (!nn)
        return !1;
      var c = {}, u = e.CSS && e.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(f) {
        c[f] = u ? e.CSS.supports("touch-action", f) : !0;
      }), c;
    }
    var ii = 1, mt = 2, ae = 4, Ft = 8, $t = Ft, Le = 16, Ot = 32;
    function Ht(c) {
      this.options = R({}, this.defaults, c || {}), this.id = go(), this.manager = null, this.options.enable = ut(this.options.enable, !0), this.state = ii, this.simultaneous = {}, this.requireFail = [];
    }
    Ht.prototype = {
      defaults: {},
      set: function(c) {
        return R(this.options, c), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(c) {
        if (b(c, "recognizeWith", this))
          return this;
        var u = this.simultaneous;
        return c = si(c, this), u[c.id] || (u[c.id] = c, c.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(c) {
        return b(c, "dropRecognizeWith", this) ? this : (c = si(c, this), delete this.simultaneous[c.id], this);
      },
      requireFailure: function(c) {
        if (b(c, "requireFailure", this))
          return this;
        var u = this.requireFail;
        return c = si(c, this), Wt(u, c) === -1 && (u.push(c), c.requireFailure(this)), this;
      },
      dropRequireFailure: function(c) {
        if (b(c, "dropRequireFailure", this))
          return this;
        c = si(c, this);
        var u = Wt(this.requireFail, c);
        return u > -1 && this.requireFail.splice(u, 1), this;
      },
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function(c) {
        return !!this.simultaneous[c.id];
      },
      emit: function(c) {
        var u = this, f = this.state;
        function m(x) {
          u.manager.emit(x, c);
        }
        f < Ft && m(u.options.event + an(f)), m(u.options.event), c.additionalEvent && m(c.additionalEvent), f >= Ft && m(u.options.event + an(f));
      },
      tryEmit: function(c) {
        if (this.canEmit())
          return this.emit(c);
        this.state = Ot;
      },
      canEmit: function() {
        for (var c = 0; c < this.requireFail.length; ) {
          if (!(this.requireFail[c].state & (Ot | ii)))
            return !1;
          c++;
        }
        return !0;
      },
      recognize: function(c) {
        var u = R({}, c);
        if (!ot(this.options.enable, [this, u])) {
          this.reset(), this.state = Ot;
          return;
        }
        this.state & ($t | Le | Ot) && (this.state = ii), this.state = this.process(u), this.state & (mt | ae | Ft | Le) && this.tryEmit(u);
      },
      process: function(c) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function an(c) {
      return c & Le ? "cancel" : c & Ft ? "end" : c & ae ? "move" : c & mt ? "start" : "";
    }
    function ln(c) {
      return c == Ce ? "down" : c == be ? "up" : c == Ee ? "left" : c == Se ? "right" : "";
    }
    function si(c, u) {
      var f = u.manager;
      return f ? f.get(c) : c;
    }
    function St() {
      Ht.apply(this, arguments);
    }
    k(St, Ht, {
      defaults: {
        pointers: 1
      },
      attrTest: function(c) {
        var u = this.options.pointers;
        return u === 0 || c.pointers.length === u;
      },
      process: function(c) {
        var u = this.state, f = c.eventType, m = u & (mt | ae), x = this.attrTest(c);
        return m && (f & it || !x) ? u | Le : m || x ? f & U ? u | Ft : u & mt ? u | ae : mt : Ot;
      }
    });
    function ni() {
      St.apply(this, arguments), this.pX = null, this.pY = null;
    }
    k(ni, St, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: Gs
      },
      getTouchAction: function() {
        var c = this.options.direction, u = [];
        return c & At && u.push(Pe), c & Qt && u.push(Me), u;
      },
      directionTest: function(c) {
        var u = this.options, f = !0, m = c.distance, x = c.direction, M = c.deltaX, A = c.deltaY;
        return x & u.direction || (u.direction & At ? (x = M === 0 ? Ke : M < 0 ? Ee : Se, f = M != this.pX, m = Math.abs(c.deltaX)) : (x = A === 0 ? Ke : A < 0 ? be : Ce, f = A != this.pY, m = Math.abs(c.deltaY))), c.direction = x, f && m > u.threshold && x & u.direction;
      },
      attrTest: function(c) {
        return St.prototype.attrTest.call(this, c) && (this.state & mt || !(this.state & mt) && this.directionTest(c));
      },
      emit: function(c) {
        this.pX = c.deltaX, this.pY = c.deltaY;
        var u = ln(c.direction);
        u && (c.additionalEvent = this.options.event + u), this._super.emit.call(this, c);
      }
    });
    function Gi() {
      St.apply(this, arguments);
    }
    k(Gi, St, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Jt];
      },
      attrTest: function(c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.scale - 1) > this.options.threshold || this.state & mt);
      },
      emit: function(c) {
        if (c.scale !== 1) {
          var u = c.scale < 1 ? "in" : "out";
          c.additionalEvent = this.options.event + u;
        }
        this._super.emit.call(this, c);
      }
    });
    function Yi() {
      Ht.apply(this, arguments), this._timer = null, this._input = null;
    }
    k(Yi, Ht, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [on];
      },
      process: function(c) {
        var u = this.options, f = c.pointers.length === u.pointers, m = c.distance < u.threshold, x = c.deltaTime > u.time;
        if (this._input = c, !m || !f || c.eventType & (U | it) && !x)
          this.reset();
        else if (c.eventType & J)
          this.reset(), this._timer = v(function() {
            this.state = $t, this.tryEmit();
          }, u.time, this);
        else if (c.eventType & U)
          return $t;
        return Ot;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(c) {
        this.state === $t && (c && c.eventType & U ? this.manager.emit(this.options.event + "up", c) : (this._input.timeStamp = p(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function qi() {
      St.apply(this, arguments);
    }
    k(qi, St, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Jt];
      },
      attrTest: function(c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.rotation) > this.options.threshold || this.state & mt);
      }
    });
    function Xi() {
      St.apply(this, arguments);
    }
    k(Xi, St, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: At | Qt,
        pointers: 1
      },
      getTouchAction: function() {
        return ni.prototype.getTouchAction.call(this);
      },
      attrTest: function(c) {
        var u = this.options.direction, f;
        return u & (At | Qt) ? f = c.overallVelocity : u & At ? f = c.overallVelocityX : u & Qt && (f = c.overallVelocityY), this._super.attrTest.call(this, c) && u & c.offsetDirection && c.distance > this.options.threshold && c.maxPointers == this.options.pointers && g(f) > this.options.velocity && c.eventType & U;
      },
      emit: function(c) {
        var u = ln(c.offsetDirection);
        u && this.manager.emit(this.options.event + u, c), this.manager.emit(this.options.event, c);
      }
    });
    function ri() {
      Ht.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    k(ri, Ht, {
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
        var u = this.options, f = c.pointers.length === u.pointers, m = c.distance < u.threshold, x = c.deltaTime < u.time;
        if (this.reset(), c.eventType & J && this.count === 0)
          return this.failTimeout();
        if (m && x && f) {
          if (c.eventType != U)
            return this.failTimeout();
          var M = this.pTime ? c.timeStamp - this.pTime < u.interval : !0, A = !this.pCenter || Qe(this.pCenter, c.center) < u.posThreshold;
          this.pTime = c.timeStamp, this.pCenter = c.center, !A || !M ? this.count = 1 : this.count += 1, this._input = c;
          var Y = this.count % u.taps;
          if (Y === 0)
            return this.hasRequireFailures() ? (this._timer = v(function() {
              this.state = $t, this.tryEmit();
            }, u.interval, this), mt) : $t;
        }
        return Ot;
      },
      failTimeout: function() {
        return this._timer = v(function() {
          this.state = Ot;
        }, this.options.interval, this), Ot;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == $t && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function zt(c, u) {
      return u = u || {}, u.recognizers = ut(u.recognizers, zt.defaults.preset), new ji(c, u);
    }
    zt.VERSION = "2.0.7", zt.defaults = {
      domEvents: !1,
      touchAction: rn,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [qi, { enable: !1 }],
        [Gi, { enable: !1 }, ["rotate"]],
        [Xi, { direction: At }],
        [ni, { direction: At }, ["swipe"]],
        [ri],
        [ri, { event: "doubletap", taps: 2 }, ["tap"]],
        [Yi]
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
    var Go = 1, hn = 2;
    function ji(c, u) {
      this.options = R({}, zt.defaults, u || {}), this.options.inputTarget = this.options.inputTarget || c, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = c, this.input = To(this), this.touchAction = new Vi(this, this.options.touchAction), cn(this, !0), L(this.options.recognizers, function(f) {
        var m = this.add(new f[0](f[1]));
        f[2] && m.recognizeWith(f[2]), f[3] && m.requireFailure(f[3]);
      }, this);
    }
    ji.prototype = {
      set: function(c) {
        return R(this.options, c), c.touchAction && this.touchAction.update(), c.inputTarget && (this.input.destroy(), this.input.target = c.inputTarget, this.input.init()), this;
      },
      stop: function(c) {
        this.session.stopped = c ? hn : Go;
      },
      recognize: function(c) {
        var u = this.session;
        if (!u.stopped) {
          this.touchAction.preventDefaults(c);
          var f, m = this.recognizers, x = u.curRecognizer;
          (!x || x && x.state & $t) && (x = u.curRecognizer = null);
          for (var M = 0; M < m.length; )
            f = m[M], u.stopped !== hn && (!x || f == x || f.canRecognizeWith(x)) ? f.recognize(c) : f.reset(), !x && f.state & (mt | ae | Ft) && (x = u.curRecognizer = f), M++;
        }
      },
      get: function(c) {
        if (c instanceof Ht)
          return c;
        for (var u = this.recognizers, f = 0; f < u.length; f++)
          if (u[f].options.event == c)
            return u[f];
        return null;
      },
      add: function(c) {
        if (b(c, "add", this))
          return this;
        var u = this.get(c.options.event);
        return u && this.remove(u), this.recognizers.push(c), c.manager = this, this.touchAction.update(), c;
      },
      remove: function(c) {
        if (b(c, "remove", this))
          return this;
        if (c = this.get(c), c) {
          var u = this.recognizers, f = Wt(u, c);
          f !== -1 && (u.splice(f, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(c, u) {
        if (c !== n && u !== n) {
          var f = this.handlers;
          return L(oe(c), function(m) {
            f[m] = f[m] || [], f[m].push(u);
          }), this;
        }
      },
      off: function(c, u) {
        if (c !== n) {
          var f = this.handlers;
          return L(oe(c), function(m) {
            u ? f[m] && f[m].splice(Wt(f[m], u), 1) : delete f[m];
          }), this;
        }
      },
      emit: function(c, u) {
        this.options.domEvents && Yo(c, u);
        var f = this.handlers[c] && this.handlers[c].slice();
        if (!(!f || !f.length)) {
          u.type = c, u.preventDefault = function() {
            u.srcEvent.preventDefault();
          };
          for (var m = 0; m < f.length; )
            f[m](u), m++;
        }
      },
      destroy: function() {
        this.element && cn(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function cn(c, u) {
      var f = c.element;
      if (f.style) {
        var m;
        L(c.options.cssProps, function(x, M) {
          m = je(f.style, M), u ? (c.oldCssProps[m] = f.style[m], f.style[m] = x) : f.style[m] = c.oldCssProps[m] || "";
        }), u || (c.oldCssProps = {});
      }
    }
    function Yo(c, u) {
      var f = i.createEvent("Event");
      f.initEvent(c, !0, !0), f.gesture = u, u.target.dispatchEvent(f);
    }
    R(zt, {
      INPUT_START: J,
      INPUT_MOVE: Zt,
      INPUT_END: U,
      INPUT_CANCEL: it,
      STATE_POSSIBLE: ii,
      STATE_BEGAN: mt,
      STATE_CHANGED: ae,
      STATE_ENDED: Ft,
      STATE_RECOGNIZED: $t,
      STATE_CANCELLED: Le,
      STATE_FAILED: Ot,
      DIRECTION_NONE: Ke,
      DIRECTION_LEFT: Ee,
      DIRECTION_RIGHT: Se,
      DIRECTION_UP: be,
      DIRECTION_DOWN: Ce,
      DIRECTION_HORIZONTAL: At,
      DIRECTION_VERTICAL: Qt,
      DIRECTION_ALL: Gs,
      Manager: ji,
      Input: pt,
      TouchAction: Vi,
      TouchInput: ti,
      MouseInput: Je,
      PointerEventInput: Ui,
      TouchMouseInput: Wi,
      SingleTouchInput: Js,
      Recognizer: Ht,
      AttrRecognizer: St,
      Tap: ri,
      Pan: ni,
      Swipe: Xi,
      Pinch: Gi,
      Rotate: qi,
      Press: Yi,
      on: Q,
      off: et,
      each: L,
      merge: B,
      extend: rt,
      assign: R,
      inherit: k,
      bindFn: Ut,
      prefixed: je
    });
    var qo = typeof e < "u" ? e : typeof self < "u" ? self : {};
    qo.Hammer = zt, typeof n == "function" && n.amd ? n(function() {
      return zt;
    }) : r.exports ? r.exports = zt : e[s] = zt;
  })(window, document, "Hammer");
})(Cr);
var Ye = Cr.exports;
const dl = cl(Ye), Dt = /* @__PURE__ */ Xo({
  __proto__: null,
  default: dl
}, [Ye]), Mr = 1, Pr = 2, ps = 4, ul = {
  mousedown: Mr,
  mousemove: Pr,
  mouseup: ps
};
function fl(r, e) {
  for (let i = 0; i < r.length; i++)
    if (e(r[i]))
      return !0;
  return !1;
}
function gl(r) {
  const e = r.prototype.handler;
  r.prototype.handler = function(s) {
    const n = this.store;
    s.button > 0 && s.type === "pointerdown" && (fl(n, (o) => o.pointerId === s.pointerId) || n.push(s)), e.call(this, s);
  };
}
function pl(r) {
  r.prototype.handler = function(i) {
    let s = ul[i.type];
    s & Mr && i.button >= 0 && (this.pressed = !0), s & Pr && i.which === 0 && (s = ps), this.pressed && (s & ps && (this.pressed = !1), this.callback(this.manager, s, {
      pointers: [i],
      changedPointers: [i],
      pointerType: "mouse",
      srcEvent: i
    }));
  };
}
gl(Ye.PointerEventInput);
pl(Ye.MouseInput);
const ml = Ye.Manager;
let _i = class {
  constructor(e, i, s) {
    this.element = e, this.callback = i, this.options = { enable: !0, ...s };
  }
};
const yl = Dt ? [
  [Dt.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [Dt.Rotate, { enable: !1 }],
  [Dt.Pinch, { enable: !1 }],
  [Dt.Swipe, { enable: !1 }],
  [Dt.Pan, { threshold: 0, enable: !1 }],
  [Dt.Press, { enable: !1 }],
  [Dt.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [Dt.Tap, { event: "anytap", enable: !1 }],
  [Dt.Tap, { enable: !1 }]
] : null, An = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
}, vl = {
  doubletap: ["tap"]
}, wl = {
  pointerdown: "pointerdown",
  pointermove: "pointermove",
  pointerup: "pointerup",
  touchstart: "pointerdown",
  touchmove: "pointermove",
  touchend: "pointerup",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup"
}, Ds = {
  KEY_EVENTS: ["keydown", "keyup"],
  MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
  WHEEL_EVENTS: [
    "wheel",
    "mousewheel"
  ]
}, xl = {
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
}, On = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
}, Tl = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", le = typeof window < "u" ? window : global;
let ys = !1;
try {
  const r = {
    get passive() {
      return ys = !0, !0;
    }
  };
  le.addEventListener("test", null, r), le.removeEventListener("test", null);
} catch {
  ys = !1;
}
const El = Tl.indexOf("firefox") !== -1, { WHEEL_EVENTS: Sl } = Ds, In = "wheel", Dn = 4.000244140625, bl = 40, Cl = 0.25;
class Ml extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      if (!this.options.enable)
        return;
      let o = n.deltaY;
      le.WheelEvent && (El && n.deltaMode === le.WheelEvent.DOM_DELTA_PIXEL && (o /= le.devicePixelRatio), n.deltaMode === le.WheelEvent.DOM_DELTA_LINE && (o *= bl)), o !== 0 && o % Dn === 0 && (o = Math.floor(o / Dn)), n.shiftKey && o && (o = o * Cl), this.callback({
        type: In,
        center: {
          x: n.clientX,
          y: n.clientY
        },
        delta: -o,
        srcEvent: n,
        pointerType: "mouse",
        target: n.target
      });
    }, this.events = (this.options.events || []).concat(Sl), this.events.forEach((n) => e.addEventListener(n, this.handleEvent, ys ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === In && (this.options.enable = i);
  }
}
const { MOUSE_EVENTS: Pl } = Ds, kn = "pointermove", Rn = "pointerover", _n = "pointerout", Nn = "pointerenter", $n = "pointerleave";
class Ll extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (o) => {
      this.handleOverEvent(o), this.handleOutEvent(o), this.handleEnterEvent(o), this.handleLeaveEvent(o), this.handleMoveEvent(o);
    }, this.pressed = !1;
    const { enable: n } = this.options;
    this.enableMoveEvent = n, this.enableLeaveEvent = n, this.enableEnterEvent = n, this.enableOutEvent = n, this.enableOverEvent = n, this.events = (this.options.events || []).concat(Pl), this.events.forEach((o) => e.addEventListener(o, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === kn && (this.enableMoveEvent = i), e === Rn && (this.enableOverEvent = i), e === _n && (this.enableOutEvent = i), e === Nn && (this.enableEnterEvent = i), e === $n && (this.enableLeaveEvent = i);
  }
  handleOverEvent(e) {
    this.enableOverEvent && e.type === "mouseover" && this._emit(Rn, e);
  }
  handleOutEvent(e) {
    this.enableOutEvent && e.type === "mouseout" && this._emit(_n, e);
  }
  handleEnterEvent(e) {
    this.enableEnterEvent && e.type === "mouseenter" && this._emit(Nn, e);
  }
  handleLeaveEvent(e) {
    this.enableLeaveEvent && e.type === "mouseleave" && this._emit($n, e);
  }
  handleMoveEvent(e) {
    if (this.enableMoveEvent)
      switch (e.type) {
        case "mousedown":
          e.button >= 0 && (this.pressed = !0);
          break;
        case "mousemove":
          e.which === 0 && (this.pressed = !1), this.pressed || this._emit(kn, e);
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
const { KEY_EVENTS: Al } = Ds, Hn = "keydown", zn = "keyup";
class Ol extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      const o = n.target || n.srcElement;
      o.tagName === "INPUT" && o.type === "text" || o.tagName === "TEXTAREA" || (this.enableDownEvent && n.type === "keydown" && this.callback({
        type: Hn,
        srcEvent: n,
        key: n.key,
        target: n.target
      }), this.enableUpEvent && n.type === "keyup" && this.callback({
        type: zn,
        srcEvent: n,
        key: n.key,
        target: n.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(Al), e.tabIndex = this.options.tabIndex || 0, e.style.outline = "none", this.events.forEach((n) => e.addEventListener(n, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === Hn && (this.enableDownEvent = i), e === zn && (this.enableUpEvent = i);
  }
}
const Bn = "contextmenu";
class Il extends _i {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      this.options.enable && this.callback({
        type: Bn,
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
    e === Bn && (this.options.enable = i);
  }
}
const vs = 1, bi = 2, ws = 4, Dl = {
  pointerdown: vs,
  pointermove: bi,
  pointerup: ws,
  mousedown: vs,
  mousemove: bi,
  mouseup: ws
}, kl = 1, Rl = 2, _l = 3, Nl = 0, $l = 1, Hl = 2, zl = 1, Bl = 2, Ul = 4;
function Wl(r) {
  const e = Dl[r.srcEvent.type];
  if (!e)
    return null;
  const { buttons: i, button: s, which: n } = r.srcEvent;
  let o = !1, a = !1, h = !1;
  return e === ws || e === bi && !Number.isFinite(i) ? (o = n === kl, a = n === Rl, h = n === _l) : e === bi ? (o = !!(i & zl), a = !!(i & Ul), h = !!(i & Bl)) : e === vs && (o = s === Nl, a = s === $l, h = s === Hl), { leftButton: o, middleButton: a, rightButton: h };
}
function Fl(r, e) {
  const i = r.center;
  if (!i)
    return null;
  const s = e.getBoundingClientRect(), n = s.width / e.offsetWidth || 1, o = s.height / e.offsetHeight || 1, a = {
    x: (i.x - s.left - e.clientLeft) / n,
    y: (i.y - s.top - e.clientTop) / o
  };
  return { center: i, offsetCenter: a };
}
const Zi = {
  srcElement: "root",
  priority: 0
};
class Vl {
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
  add(e, i, s, n = !1, o = !1) {
    const { handlers: a, handlersByElement: h } = this;
    let l = Zi;
    typeof s == "string" || s && s.addEventListener ? l = { ...Zi, srcElement: s } : s && (l = { ...Zi, ...s });
    let g = h.get(l.srcElement);
    g || (g = [], h.set(l.srcElement, g));
    const p = {
      type: e,
      handler: i,
      srcElement: l.srcElement,
      priority: l.priority
    };
    n && (p.once = !0), o && (p.passive = !0), a.push(p), this._active = this._active || !p.passive;
    let v = g.length - 1;
    for (; v >= 0 && !(g[v].priority >= p.priority); )
      v--;
    g.splice(v + 1, 0, p);
  }
  remove(e, i) {
    const { handlers: s, handlersByElement: n } = this;
    for (let o = s.length - 1; o >= 0; o--) {
      const a = s[o];
      if (a.type === e && a.handler === i) {
        s.splice(o, 1);
        const h = n.get(a.srcElement);
        h.splice(h.indexOf(a), 1), h.length === 0 && n.delete(a.srcElement);
      }
    }
    this._active = s.some((o) => !o.passive);
  }
  _emit(e, i) {
    const s = this.handlersByElement.get(i);
    if (s) {
      let n = !1;
      const o = () => {
        e.handled = !0;
      }, a = () => {
        e.handled = !0, n = !0;
      }, h = [];
      for (let l = 0; l < s.length; l++) {
        const { type: g, handler: p, once: v } = s[l];
        if (p({
          ...e,
          type: g,
          stopPropagation: o,
          stopImmediatePropagation: a
        }), v && h.push(s[l]), n)
          break;
      }
      for (let l = 0; l < h.length; l++) {
        const { type: g, handler: p } = h[l];
        this.remove(g, p);
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
const Gl = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: ml,
  touchAction: "none",
  tabIndex: 0
};
class Yl {
  constructor(e = null, i) {
    this._onBasicInput = (n) => {
      const { srcEvent: o } = n, a = wl[o.type];
      a && this.manager.emit(a, n);
    }, this._onOtherEvent = (n) => {
      this.manager.emit(n.type, n);
    }, this.options = { ...Gl, ...i }, this.events = /* @__PURE__ */ new Map(), this.setElement(e);
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
      recognizers: i.recognizers || yl
    }).on("hammer.input", this._onBasicInput), i.recognizers || Object.keys(An).forEach((n) => {
      const o = this.manager.get(n);
      o && An[n].forEach((a) => {
        o.recognizeWith(a);
      });
    });
    for (const n in i.recognizerOptions) {
      const o = this.manager.get(n);
      if (o) {
        const a = i.recognizerOptions[n];
        delete a.enable, o.set(a);
      }
    }
    this.wheelInput = new Ml(e, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new Ll(e, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new Ol(e, this._onOtherEvent, {
      enable: !1,
      tabIndex: i.tabIndex
    }), this.contextmenuInput = new Il(e, this._onOtherEvent, {
      enable: !1
    });
    for (const [n, o] of this.events)
      o.isEmpty() || (this._toggleRecognizer(o.recognizerName, !0), this.manager.on(n, o.handleEvent));
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
      const o = vl[e];
      o && !this.options.recognizers && o.forEach((a) => {
        const h = s.get(a);
        i ? (h.requireFailure(e), n.dropRequireFailure(a)) : h.dropRequireFailure(e);
      });
    }
    this.wheelInput.enableEventType(e, i), this.moveInput.enableEventType(e, i), this.keyInput.enableEventType(e, i), this.contextmenuInput.enableEventType(e, i);
  }
  _addEventHandler(e, i, s, n, o) {
    if (typeof e != "string") {
      s = i;
      for (const p in e)
        this._addEventHandler(p, e[p], s, n, o);
      return;
    }
    const { manager: a, events: h } = this, l = On[e] || e;
    let g = h.get(l);
    g || (g = new Vl(this), h.set(l, g), g.recognizerName = xl[l] || l, a && a.on(l, g.handleEvent)), g.add(e, i, s, n, o), g.isEmpty() || this._toggleRecognizer(g.recognizerName, !0);
  }
  _removeEventHandler(e, i) {
    if (typeof e != "string") {
      for (const a in e)
        this._removeEventHandler(a, e[a]);
      return;
    }
    const { events: s } = this, n = On[e] || e, o = s.get(n);
    if (o && (o.remove(e, i), o.isEmpty())) {
      const { recognizerName: a } = o;
      let h = !1;
      for (const l of s.values())
        if (l.recognizerName === a && !l.isEmpty()) {
          h = !0;
          break;
        }
      h || this._toggleRecognizer(a, !1);
    }
  }
}
class Un {
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
  #n = {
    left: !1
  };
  constructor(e) {
    this.#e = e;
  }
  has(e) {
    return this.#t.indexOf(e) != -1;
  }
  on(e, i, s, n) {
    let o = i;
    switch (e) {
      case "pointerdown":
        o = function(a) {
          this.logit(a), a.leftButton && (this.#e.pad.left = !0), this.#e.onPointerDown(a), i(this.#e.pointerEventData(a));
        };
        break;
      case "pointerup":
        o = function(a) {
          this.logit(a), this.#e.onPointerUp(a), i(this.#e.pointerEventData(a));
        };
        break;
      case "pointermove":
        o = function(a) {
          this.#e.motion(a), i(this.#e.pointerEventData(a));
        };
        break;
      case "click":
      case "dbclick":
      case "pointerenter":
      case "pointerleave":
      case "pointerout":
      case "pointerover":
      case "contextmenu":
        o = function(a) {
          this.logit(a), this.#e.location(a), i(this.#e.pointerEventData(a));
        };
        break;
      case "wheel":
        o = function(a) {
          this.logit(a), this.#e.wheeldelta = a, i(this.#e.pointerEventData(a));
        };
        break;
      case "pointercancel":
      case "gotpointercapture":
      case "lostpointercapture":
        o = function(a) {
          i(a);
        };
        break;
      case "pointerdrag":
        o = function(a) {
          this.logit(a), this.#e.motion(a), i(this.#e.pointerEventData(a));
        }, this.#e.agent.on("panstart", this.#e.startPointerDrag.bind(this.#e)), e = "panmove";
        break;
      case "pointerdragend":
        o = function(a) {
          this.logit(a), this.#e.motion(a), this.#e.endPointerDrag(a), i(this.#e.pointerEventData(a));
        }, e = "panend";
        break;
    }
    return n ? this.#e.agent.once(e, o.bind(this), s) : this.#e.agent.on(e, o.bind(this), s), o;
  }
  off(e, i, s) {
    this.#e.agent.off(e, i, s);
  }
  logit(e) {
  }
}
class Wn {
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
  constructor(e) {
    this.#e = e;
  }
  has(e) {
    return this.#t.indexOf(e) != -1;
  }
  on(e, i, s, n) {
    let o = i;
    return n ? this.#e.agent.once(e, o.bind(this), s) : this.#e.agent.on(e, o.bind(this), s), o;
  }
  off(e, i, s) {
    this.#e.agent.off(e, i, s);
  }
}
class Fn {
  #t = [
    "keydown",
    "keyup"
  ];
  #e;
  constructor(e) {
    this.#e = e;
  }
  has(e) {
    return this.#t.indexOf(e) != -1;
  }
  on(e, i, s, n) {
    let o = i;
    return n ? this.#e.agent.once(e, o.bind(this), s) : this.#e.agent.on(e, o.bind(this), s), o;
  }
  off(e, i, s) {
    this.#e.agent.off(e, i, s);
  }
}
const ql = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class Rt {
  #t;
  #e;
  #n;
  #r = null;
  #i = null;
  #s = null;
  #l;
  #a;
  #h = !1;
  #o;
  #c;
  #u;
  pad = { left: !1 };
  constructor(e, i) {
    if (this.#t = { ...ql, ...i }, this.#a = hl.idle, this.#l = ll, this.#e = e, !this.#e && this.#t.elementId && (this.#e = document.getElementById(this.#t.elementId)), !D.isElement(this.#e))
      throw "Must specify an element to receive user input.";
    this.#t.contextMenu || (window.oncontextmenu = (o) => (o.preventDefault(), !1));
    const n = {
      recognizerOptions: {
        pan: { threshold: this.#l ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#n = new Yl(this.#e, n), this.pointerInit();
  }
  get agent() {
    return this.#n;
  }
  get pointer() {
    return this.#r instanceof Un ? this.#r : (this.#r = new Un(this), this.#r);
  }
  get touch() {
    return this.#s instanceof Wn ? this.#s : (this.#s = new Wn(this), this.#s);
  }
  get key() {
    return this.#i instanceof Fn ? this.#i : (this.#i = new Fn(this), this.#i);
  }
  get status() {
    return this.#a;
  }
  get element() {
    return this.#e;
  }
  get isTouch() {
    return this.#l;
  }
  get isPan() {
    return this.#h;
  }
  set panX(e) {
    X(e) && (this.#o = e);
  }
  set panY(e) {
    X(y) && (this.#c = y);
  }
  set wheeldelta(e) {
    this.#u = e.delta;
  }
  get wheeldelta() {
    return this.#u;
  }
  destroy() {
    this.#n.destroy(), this.#r = void 0, this.#i = void 0, this.#s = void 0;
  }
  isValid(e, i) {
    return !!(S(e) || z(i));
  }
  validOptions(e) {
    return E(e) && X(e) ? e : void 0;
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
    this.#e.style.cursor = e;
  }
  pointerInit() {
    this.clientPosPrev = new ie([null, null]), this.position = new ie([0, 0]), this.movement = new ie([0, 0]), this.dragstart = new ie([null, null]), this.dragend = new ie([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
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
    this.#h = !0, this.onPointerDown(e);
  }
  endPointerDrag(e) {
    this.#h = !1;
  }
}
class at {
  #t;
  #e;
  #n;
  #r;
  #i;
  #s;
  #l;
  #a;
  #h;
  #o;
  static dividerList = {};
  static divideCnt = 0;
  static class = Sn;
  static name = "Dividers";
  static type = "Divider";
  static create(e, i) {
    const s = `${i.core.id}_divider_${++at.divideCnt}`;
    return i.id = s, at.dividerList[s] = new at(e, i), at.dividerList[s];
  }
  static destroy() {
    for (let e in at.dividerList)
      at.dividerList[e].destroy();
    delete at.dividerList[id];
  }
  static defaultNode() {
    return `
  <div slot="widget" class="${Sn}" style="position: absolute;"></div>
  `;
  }
  constructor(e, i) {
    const s = { ...i };
    this.#i = e, this.#e = s.core, this.#n = s, this.#r = s.core.theme, this.#t = s.id, this.#s = s.chartPane, this.#l = e.elements.elDividers, this.init();
  }
  get el() {
    return this.#a;
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
    return D.elementDimPos(this.#a);
  }
  get height() {
    return this.#a.getBoundingClientRect().height;
  }
  set cursor(e) {
    this.#a.style.cursor = e;
  }
  get cursor() {
    return this.#a.style.cursor;
  }
  get type() {
    return at.type;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = "row-resize", this.eventsListen();
  }
  destroy() {
    this.#o.destroy(), this.el.remove(), delete at.dividerList[this.id];
  }
  eventsListen() {
    this.#o = new Rt(this.#a, { disableContextMenu: !1 }), this.#o.on("pointerover", this.onMouseEnter.bind(this)), this.#o.on("pointerout", this.onMouseOut.bind(this)), this.#o.on("pointerdrag", this.onPointerDrag.bind(this)), this.#o.on("pointerdragend", this.onPointerDragEnd.bind(this));
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
  onMouseEnter() {
    this.#a.style.background = this.#r.divider.active, this.#e.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#a.style.background = this.#r.divider.idle, this.#e.MainPane.onMouseEnter();
  }
  onPointerDrag(e) {
    this.#h = this.#e.MainPane.cursorPos, this.#a.style.background = this.#r.divider.active, this.emit(`${this.id}_pointerdrag`, this.#h), this.emit("divider_pointerdrag", {
      id: this.id,
      e,
      pos: this.#h,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(e) {
    "position" in e && (this.#a.style.background = this.#r.divider.idle), this.#h = this.#e.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#h), this.emit("divider_pointerdragend", {
      id: this.id,
      e,
      pos: this.#h,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  mount() {
    this.#l.lastElementChild == null ? this.#l.innerHTML = this.dividerNode() : this.#l.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#a = D.findBySelector(`#${this.#t}`, this.#l);
  }
  dividerNode() {
    let e = this.#e.theme, i = this.#s.pos.top - D.elementDimPos(this.#l).top, s = this.#e.MainPane.rowsW + this.#e.scaleW, n = T(this.config.dividerHeight) ? this.config.dividerHeight : za, o = e.tools.width;
    switch (i -= n / 2, e.tools.location) {
      case "left":
        break;
      case !1:
      case "none":
      case "right":
        o *= -1;
        break;
    }
    const a = `position: absolute; top: ${i}px; left: ${o}px; z-index:100; width: ${s}px; height: ${n}px; background: ${e.divider.idle};`, h = `width: 100%; margin: 3.5px 0; border: 0; border-top: ${e.divider.style} ${e.divider.line};`;
    return `
      <div id="${this.#t}" class="divider" style="${a}"><hr style="${h}"></div>
    `;
  }
  setPos() {
    let e = this.#s.pos.top - D.elementDimPos(this.#l).top;
    e = e - this.height / 2 + 1, this.#a.style.top = `${e}px`;
  }
  hide() {
    this.#a.style.display = "none";
  }
  show() {
    this.#a.style.display = "block";
  }
}
const Xl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', jl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', Kl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', Lr = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', Zl = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', Ql = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', Jl = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', te = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', th = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', eh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', ih = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', sh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', nh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', rh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', oh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>', ah = '<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>', lh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', hh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', ch = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', dh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <g fill-rule="evenodd">  <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z"/>  <path d="m4.4449 4.097c-0.01964 0-0.037678 0.0018-0.054687 0.0039-0.017011 0.0022-0.034068 0.0058-0.048828 0.0098-0.014761 4e-3 -0.028126 0.0081-0.041016 0.01367-0.012889 0.0056-0.025711 0.01268-0.037109 0.01953-0.022796 0.01371-0.041442 0.02783-0.060547 0.04492s-0.038191 0.03653-0.056641 0.05469c-0.024482 0.02442-0.046092 0.05037-0.064453 0.07813-0.018362 0.02775-0.032681 0.05776-0.044922 0.08789s-0.021223 0.06023-0.027344 0.0918c-0.00612 0.03156-0.00977 0.06366-0.00977 0.0957 0 8e-3 -4.378e-4 0.01543 0 0.02344v1.2988c0 0.02083 6.41e-5 0.04102 0.00195 0.06055 0.00189 0.01953 0.0061 0.03841 0.00977 0.05664 0.00366 0.01823 0.00836 0.03581 0.013672 0.05273 0.00531 0.01693 0.010742 0.0332 0.017578 0.04883 0.013672 0.03125 0.029785 0.0599 0.048828 0.08594s0.041016 0.04948 0.064453 0.07031 0.049316 0.03906 0.076172 0.05469c0.026855 0.01563 0.054687 0.02865 0.083984 0.03906 0.029297 0.01042 0.059082 0.01823 0.089844 0.02344 0.030762 0.0052 0.0625 0.0078 0.09375 0.0078s0.062988-0.0026 0.09375-0.0078 0.060547-0.01302 0.089844-0.02344 0.057129-0.02344 0.083984-0.03906c0.026855-0.01563 0.052734-0.03385 0.076172-0.05469 0.023437-0.02083 0.04541-0.04427 0.064453-0.07031s0.035156-0.05469 0.048828-0.08594c0.00684-0.01563 0.012268-0.0319 0.017578-0.04883s0.01001-0.0345 0.013672-0.05273c0.00366-0.01823 0.00787-0.03711 0.00977-0.05664 0.00189-0.01953 0.00195-0.03971 0.00195-0.06055v-0.82227h6v0.98633c0 0.02083 2e-3 0.04102 0.0039 0.06055s0.0042 0.03841 0.0078 0.05664c0.0037 0.01823 0.0084 0.03581 0.01367 0.05273 0.0053 0.01693 0.01074 0.0332 0.01758 0.04883 0.01367 0.03125 0.03174 0.0599 0.05078 0.08594s0.03906 0.04948 0.0625 0.07031 0.04932 0.03906 0.07617 0.05469c0.02686 0.01563 0.05469 0.02865 0.08399 0.03906 0.0293 0.01042 0.06104 0.01823 0.0918 0.02344 0.03076 0.0052 0.06055 0.0078 0.0918 0.0078s0.06299-0.0026 0.09375-0.0078 0.06055-0.01302 0.08984-0.02344c0.0293-0.01042 0.05908-0.02344 0.08594-0.03906 0.02686-0.01563 0.05078-0.03385 0.07422-0.05469 0.02344-0.02083 0.04541-0.04427 0.06445-0.07031s0.03516-0.05469 0.04883-0.08594c0.0068-0.01563 0.01422-0.0319 0.01953-0.04883 0.0053-0.01693 0.01001-0.0345 0.01367-0.05273 0.0037-0.01823 0.0059-0.03711 0.0078-0.05664s2e-3 -0.03971 2e-3 -0.06055v-1.4629c3.25e-4 -0.0078 0-0.01563 0-0.02344 0-0.03125-0.0026-0.06299-0.0078-0.09375s-0.01302-0.06055-0.02344-0.08984c-0.01042-0.0293-0.02344-0.05713-0.03906-0.08398-0.01563-0.02685-0.03385-0.05273-0.05469-0.07617-0.02083-0.02344-0.04427-0.04541-0.07031-0.06445s-0.05469-0.03516-0.08594-0.04883c-0.01563-0.0068-0.0319-0.01227-0.04883-0.01758-0.01693-0.0053-0.0345-0.01001-0.05273-0.01367-0.01823-0.0037-0.03711-0.0059-0.05664-0.0078s-0.03971-0.0039-0.06055-0.0039h-6.5z"/>  <path d="m11.555 11.903c0.01964 0 0.03768-0.0018 0.05469-0.0039 0.01701-0.0022 0.03407-0.0058 0.04883-0.0098s0.02813-0.0081 0.04102-0.01367c0.01289-0.0056 0.02571-0.01268 0.03711-0.01953 0.0228-0.01371 0.04144-0.02783 0.06055-0.04492 0.0191-0.01709 0.03819-0.03653 0.05664-0.05469 0.02448-0.02442 0.04609-0.05037 0.06445-0.07813 0.01836-0.02775 0.03268-0.05776 0.04492-0.08789s0.02122-0.06023 0.02734-0.0918c0.0061-0.03156 0.0098-0.06366 0.0098-0.0957 0-8e-3 4.38e-4 -0.01543 0-0.02344v-1.2988c0-0.02083-6.4e-5 -0.04102-2e-3 -0.06055-0.0019-0.01953-0.0061-0.03841-0.0098-0.05664s-0.0084-0.03581-0.01367-0.05273c-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.02979-0.0599-0.04883-0.08594s-0.04102-0.04948-0.06445-0.07031c-0.02344-0.02083-0.04932-0.03906-0.07617-0.05469s-0.05469-0.02865-0.08398-0.03906c-0.0293-0.01042-0.05908-0.01823-0.08984-0.02344-0.03076-0.0052-0.0625-0.0078-0.09375-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05713 0.02344-0.08398 0.03906-0.02685 0.01563-0.05273 0.03385-0.07617 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01227 0.0319-0.01758 0.04883-0.0053 0.01693-0.01001 0.0345-0.01367 0.05273-0.0037 0.01823-0.0079 0.03711-0.0098 0.05664s-0.0019 0.03971-0.0019 0.06055v0.82227h-6v-0.98633c0-0.02083-2e-3 -0.04102-0.0039-0.06055s-0.0042-0.03841-0.0078-0.05664c-0.0037-0.01823-0.0084-0.03581-0.01367-0.05273-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.03174-0.0599-0.05078-0.08594s-0.03906-0.04948-0.0625-0.07031-0.04932-0.03906-0.07617-0.05469c-0.02686-0.01563-0.05469-0.02865-0.08399-0.03906-0.0293-0.01042-0.06104-0.01823-0.0918-0.02344-0.03076-0.0052-0.06055-0.0078-0.0918-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05908 0.02344-0.08594 0.03906-0.02686 0.01563-0.05078 0.03385-0.07422 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01422 0.0319-0.01953 0.04883-0.0053 0.01693-0.01001 0.03451-0.01367 0.05273-0.0037 0.01823-0.0059 0.03711-0.0078 0.05664s-2e-3 0.03971-2e-3 0.06055v1.4629c-3.25e-4 0.0078 0 0.01563 0 0.02344 0 0.03125 0.0026 0.06299 0.0078 0.09375s0.01302 0.06055 0.02344 0.08984c0.01042 0.0293 0.02344 0.05713 0.03906 0.08398 0.01563 0.02685 0.03385 0.05273 0.05469 0.07617 0.02083 0.02344 0.04427 0.04541 0.07031 0.06445s0.05469 0.03516 0.08594 0.04883c0.01563 0.0068 0.0319 0.01227 0.04883 0.01758 0.01693 0.0053 0.0345 0.01001 0.05273 0.01367 0.01823 0.0037 0.03711 0.0059 0.05664 0.0078s0.03971 0.0039 0.06055 0.0039h6.5z"/></g></svg>', uh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/></svg>', fh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/> <path d="m12.757 3.0055c-0.11087 0.0051358-0.22696 0.051177-0.33008 0.1543l-4.9883 4.9902c-0.061946 0.061947-0.086644 0.12038-0.097656 0.17773l-4.8184 4.8164c-0.1111 0.1111-0.1066 0.2109-0.10742 0.31445-3.5e-4 0.27663 0.22337 0.50035 0.5 0.5 0 0 0.18415 0.022881 0.33008-0.12305l4.9746-4.9727c0.06758-0.06758 0.10951-0.13979 0.13281-0.21289l4.7832-4.7832c0.36828-0.36828 0.017071-0.87967-0.37891-0.86133z" fill-rule="evenodd"/></svg>', gh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', ph = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', mh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>', yh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>', vh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>', wh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>', xh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>', Th = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>', Eh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>', Sh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>', bh = '<svg width="493px" height="512px" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 493 511.77" xmlns="http://www.w3.org/2000/svg"><path d="m33.11 458.2 104.5-79.1c3.09-3 7.08-4.47 11.08-4.45l302.6-0.08c2.67 0 5.09-1.08 6.78-2.77 1.74-1.81 2.84-4.24 2.84-6.87v-323.2c0-2.59-1.12-5-2.86-6.74-1.78-1.78-4.2-2.9-6.76-2.9h-409.56c-2.54 0-4.94 1.14-6.72 2.92s-2.92 4.18-2.92 6.72c0 793.72 1.02 39.329 1.02 416.47zm90.6-229.77c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.73-19.74 19.73c-10.89 0-19.73-8.84-19.73-19.73s8.84-19.74 19.73-19.74zm0-101.14c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.74-19.74 19.74c-10.89 0-19.73-8.85-19.73-19.74s8.84-19.74 19.73-19.74zm61.72 138.89c-9.95 0-18.02-8.07-18.02-18.01 0-9.95 8.07-18.02 18.02-18.02h185.56c9.95 0 18.01 8.07 18.01 18.02 0 9.94-8.06 18.01-18.01 18.01zm0-101.13c-9.95 0-18.02-8.07-18.02-18.02 0-9.94 8.07-18.01 18.02-18.01h185.56c9.95 0 18.01 8.07 18.01 18.01 0 9.95-8.06 18.02-18.01 18.02zm-30.38 241.61-125.97 99.69c-2.96 3.32-7.24 5.42-12.01 5.42-8.85 0-17.07-7.1228-17.07-15.963v-454.08c0-11.4 4.77-21.88 12.31-29.42s18.02-12.31 29.42-12.31h409.56c11.4 0 21.9 4.74 29.45 12.29 7.5 7.51 12.26 17.96 12.26 29.44v323.2c0 11.48-4.7 21.95-12.24 29.49-7.61 7.54-18.05 12.24-29.47 12.24z" fill-rule="nonzero"/></svg>', Ch = '<svg width="800px" height="800px" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.746 2.7281c-5.1207-2.0689-10.949 0.40512-13.018 5.5258-2.0689 5.1207 0.40512 10.949 5.5258 13.018 5.1207 2.0689 10.949-0.40508 13.018-5.5258 2.0689-5.1207-0.40508-10.949-5.5258-13.018zm-1.3378 8.3035-1.2703-0.51325c-0.21854-0.08829-0.32785-0.13246-0.3683-0.22775-0.04045-0.09529 0.0037-0.20461 0.09201-0.42314l1.6595-4.1073c0.33362-0.82575 0.50047-1.2387 0.33474-1.3523-0.16582-0.11359-0.49058 0.19103-1.1403 0.8003l-4.7426 4.4469c-1.0274 0.96338-1.541 1.445-1.4405 1.9835 0.10054 0.53837 0.75347 0.80216 2.0594 1.3298l1.2703 0.51325c0.21854 0.08829 0.32785 0.13246 0.3683 0.22775 0.04045 0.09529-0.0037 0.20461-0.09201 0.42314l-1.6595 4.1073c-0.33365 0.82582-0.50047 1.2387-0.33475 1.3523 0.16582 0.1136 0.49059-0.19104 1.1403-0.80025l4.7425-4.4469c1.0275-0.96346 1.5411-1.4451 1.4406-1.9836-0.10057-0.53838-0.75352-0.80218-2.0594-1.3298z" clip-rule="evenodd" fill-rule="evenodd"/></svg>', Mh = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>', Ph = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>', se = 300, Ci = 400, Lh = `${Ci}px`, Ar = `${se}px`, Ah = "100%", Oh = "100%", Kt = 30, qt = 35, Mi = 25, Or = 25, Pi = Mi + Or, pe = 60, ce = "normal", de = 12, Qi = "normal", ue = "Avenir, Helvetica, Arial, sans-serif", ks = "#141414", Rs = "#666666", _s = "#cccccc", We = "#888888", me = "#cccccc", Ir = "25px", Ih = "position: relative;", _ = {
  COLOUR_BG: ks,
  COLOUR_BORDER: Rs,
  COLOUR_TXT: _s,
  COLOUR_ICON: We,
  COLOUR_ICONHOVER: me,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: ce,
  FONTSIZE: de,
  FONTSTYLE: Qi,
  FONTFAMILY: ue,
  FONT: `${Qi} ${de}px ${ce} ${ue}`,
  FONTSTRING: `font-style: ${Qi}; font-size: ${de}px; font-weight: ${ce}; font-family: ${ue};`
}, Tt = {
  fontSize: de,
  fontWeight: ce,
  fontFamily: ue,
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderWidth: 1,
  txtCol: "#000000",
  bakCol: "#cccccc",
  stroke: "#ffffff",
  fill: "#888888"
}, Xt = {
  COLOUR_ICON: We,
  COLOUR_ICONHOVER: me,
  ICONSIZE: Ir
}, fe = {
  COLOUR_ICON: We,
  COLOUR_ICONHOVER: me,
  ICONSIZE: Ir
}, Ji = {
  COLOUR_BG: ks,
  COLOUR_BORDER: Rs,
  COLOUR_TXT: _s
}, ts = {
  COLOUR_BG: ks,
  COLOUR_BORDER: Rs,
  COLOUR_TXT: _s
}, Dh = {
  FILL: me + "88"
}, K = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, hi = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, mi = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, Vn = ce, yi = de, vi = ue, Pt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: vi,
  FONTSIZE: yi,
  FONTWEIGHT: Vn,
  FONT_LABEL: `${Vn} ${yi}px ${vi}`,
  FONT_LABEL_BOLD: `bold ${yi}px ${vi}`
}, Gn = ce, Yn = de, qn = ue, ee = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: qn,
  FONTSIZE: Yn,
  FONTWEIGHT: Gn,
  FONT_LABEL: `${Gn} ${Yn}px ${qn}`,
  FONT_LABEL_BOLD: `bold ${yi}px ${vi}`
}, Dr = {
  COLOUR_GRID: "#333"
}, kh = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, es = {
  text: _.FONTSTRING,
  font: _.FONT,
  colour: _.COLOUR_TXT
}, ci = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00",
  LINE: _.COLOUR_BORDER,
  STYLE: "1px solid"
}, Rh = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: _.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}, is = { arrowDown: mh, arrowUp: yh, arrowDownRound: vh, arrowUpRound: wh, arrowDownRoundSolid: xh, arrowUpRoundSolid: Th, buySolid: Eh, sellSolid: Sh }, Xn = { noteSolid: bh, lightning: Ch }, _h = {
  candle: {
    Type: K.CANDLE_SOLID,
    UpBodyColour: hi.COLOUR_CANDLE_UP,
    UpWickColour: hi.COLOUR_WICK_UP,
    DnBodyColour: hi.COLOUR_CANDLE_DN,
    DnWickColour: hi.COLOUR_WICK_DN
  },
  volume: {
    Height: mi.ONCHART_VOLUME_HEIGHT,
    UpColour: mi.COLOUR_VOLUME_UP,
    DnColour: mi.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: ee.COLOUR_TICK,
    colourLabel: ee.COLOUR_LABEL,
    colourCursor: ee.COLOUR_CURSOR,
    colourCursorBG: ee.COLOUR_CURSOR_BG,
    fontFamily: ee.FONTFAMILY,
    fontSize: ee.FONTSIZE,
    fontWeight: ee.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: We,
    iconHover: me
  },
  yAxis: {
    colourTick: Pt.COLOUR_TICK,
    colourLabel: Pt.COLOUR_LABEL,
    colourCursor: Pt.COLOUR_CURSOR,
    colourCursorBG: Pt.COLOUR_CURSOR_BG,
    fontFamily: Pt.FONTFAMILY,
    fontSize: Pt.FONTSIZE,
    fontWeight: Pt.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: _.COLOUR_BG,
    BorderColour: _.COLOUR_BORDER,
    BorderThickness: _.BORDER_THICKNESS,
    TextColour: _.COLOUR_TXT,
    FontWeight: _.FONTWEIGHT,
    FontSize: _.FONTSIZE,
    FontStyle: _.FONTSTYLE,
    FontFamily: _.FONTFAMILY,
    Font: _.FONT,
    FontString: _.FONTSTRING,
    GridColour: Dr.COLOUR_GRID
  },
  primaryPane: {
    separator: "#666"
  },
  secondaryPane: {
    separator: "#666"
  },
  time: {
    navigation: !1,
    font: es.font,
    colour: "#96a9db",
    handleColour: "#586ea6"
  },
  legend: {
    font: es.font,
    colour: es.colour,
    controls: !0,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: We,
    hover: me
  },
  divider: {
    active: ci.ACTIVE,
    idle: ci.IDLE,
    line: ci.LINE,
    style: ci.STYLE
  },
  watermark: Rh,
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
    iconEvent: Xn.lightning,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    iconColour: "#ccc",
    defaultIcons: Xn,
    offset: 10
  }
}, Nh = `
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
</style>`, $h = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${Lh});
    min-height: var(--txc-min-height, ${Ar});
    max-width: var(--txc-max-width, ${Ah});
    max-height: var(--txc-max-height, ${Oh});
    overflow: hidden;
    background: var(--txc-background, ${_.COLOUR_BG});
    font: var(--txc-font, ${_.FONT});
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
`, jn = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class Mt {
  static #t = new Et();
  static get list() {
    return Mt.#t;
  }
  #e;
  static create(e, i) {
    if (!E(e))
      return !1;
    e.id = S(e.name) ? Z(e.name) : `${i.id}.theme`;
    const s = new Mt(e, i);
    return Mt.list.set(e.id, s), s;
  }
  constructor(e, i) {
    this.#e = i, this.setCurrent(e);
  }
  get list() {
    return Mt.list;
  }
  setCurrent(e = {}) {
    e = E(e) ? e : {};
    const i = ct(_h), s = ct(e), n = ze(i, s);
    for (let o in n)
      jn.includes(o) || (this[o] = n[o]);
    this.#e.refresh();
  }
  setTheme(e) {
    if (S(e) && Mt.list.has(e)) {
      const i = Mt.list.get(e);
      return this.setCurrent(i), !0;
    }
    return !1;
  }
  setProperty(e, i) {
    if (!S(e))
      return;
    const s = un(this, e), n = e.split(".");
    if (n.length == 1)
      this[n[0]] = i;
    else {
      let o = n.shift();
      this[o] = Tr(this[o], n.join("."), i);
    }
    return this.#e.refresh(), s;
  }
  getProperty(e) {
    return un(this, e);
  }
  deleteTheme(e) {
    return S(e) && Mt.list.has(e) ? (Mt.list.delete(e), !0) : !1;
  }
  exportTheme(e = {}) {
    E || (e = {});
    const i = e?.type, s = {};
    let n;
    for (let o in this)
      jn.includes(o) || (s[o] = this[o]);
    switch (i) {
      case "json":
      default:
        const { replacer: o, space: a } = { ...e };
        n = JSON.stringify(s, o, a);
    }
    return n;
  }
}
class Hh {
  #t;
  constructor(e) {
    this.#t = e, self.onmessage = (i) => this._onmessage(i.data);
  }
  _onmessage(e) {
    const { r: i, data: s } = e, n = this.#t(s);
    self.postMessage({ r: i, result: n });
  }
  end() {
    self.close();
  }
}
class zh {
  #t;
  #e;
  #n;
  #r = 0;
  #i = {};
  #s;
  constructor(e, i, s, n) {
    this.#t = e, this.#e = s, this.#n = n;
    const o = `
      ${kr.ThreadWorker.toString()};
      const fn = ${i}
      const worker = new ThreadWorker(fn)
    `, a = new Blob([`;(() => {${o}})()`], { type: "text/javascript" }), h = URL.createObjectURL(a);
    this.#s = new Worker(h), URL.revokeObjectURL(h);
  }
  get id() {
    return this.#t;
  }
  get req() {
    return `r_${this.#r}`;
  }
  onmessage(e) {
    return z(this.#e) ? this.#e(e) : e;
  }
  onerror(e) {
    return z(this.#n) ? this.#n(e) : e;
  }
  postMessage(e) {
    return new Promise((i, s) => {
      try {
        let n = this.req;
        this.#i[n] = { resolve: i, reject: s }, this.#s.postMessage({ r: n, data: e }), this.#s.onmessage = (o) => {
          const { r: a, result: h } = o.data;
          if (a in this.#i) {
            const { resolve: l, reject: g } = this.#i[a];
            delete this.#i[a], l(this.onmessage(h));
          }
        }, this.#s.onerror = (o) => {
          s(this.onerror(o));
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
let kr = class Gt {
  static #t = /* @__PURE__ */ new Map();
  static ThreadWorker = Hh;
  static Thread = zh;
  static create(e = "worker", i, s, n) {
    if (typeof window.Worker > "u")
      return !1;
    if (z(i))
      i = i.toString();
    else if (!S(i))
      return !1;
    return e = S(e) ? Z(e) : Z("worker"), Gt.#t.set(e, new Gt.Thread(e, i, s)), Gt.#t.get(e);
  }
  static destroy(e) {
    if (!S(e))
      return !1;
    Gt.#t.get(e).terminate(), Gt.#t.delete(e);
  }
  static end() {
    Gt.#t.forEach((e, i, s) => {
      Gt.destroy(i);
    });
  }
};
class dt extends HTMLElement {
  shadowRoot;
  template;
  id = Z(_e);
  doInit = !0;
  constructor(e, i = "open") {
    super(), this.template = e, this.shadowRoot = this.attachShadow({ mode: i });
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
  set width(e) {
    this.setDim(e, "width");
  }
  get height() {
    return this.offsetHeight;
  }
  set height(e) {
    this.setDim(e, "height");
  }
  set cursor(e) {
    this.style.cursor = e;
  }
  get cursor() {
    return this.style.cursor;
  }
  setDim(e, i) {
    T(e) && (e += "px"), !(!["width", "height"].includes(i) || !S(e)) && (this.style[i] = e);
  }
}
class Rr {
  #t;
  #e;
  #n;
  constructor(e) {
    this.#e = e, this.#t = this.#e.core, this.#n = this.#t.Chart;
  }
  get core() {
    return this.#t;
  }
  get chart() {
    return this.#n;
  }
  get parent() {
    return this.#e;
  }
  get theme() {
    return this.#t.theme;
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
    return wa(e);
  }
  numDigits(e) {
    return wr(e);
  }
  countDigits(e) {
    return va(e);
  }
  precision(e) {
    return xr(e);
  }
}
class wi extends Rr {
  #t = 4;
  #e;
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
    return lt(this.width / this.range.Length);
  }
  get candlesOnLayer() {
    return lt(this.core.Chart.layerWidth / this.candleW);
  }
  get xAxisRatio() {
    return this.width / this.range.rangeDuration;
  }
  set xAxisTicks(e) {
    this.#t = T(e) ? e : 0;
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
  xPos(e) {
    return lt(this.range.rangeIndex(e) * this.candleW + this.candleW * 0.5);
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
    let i = this.range.indexStart, s = lt(e / this.candleW);
    return i + s;
  }
  pixelOHLCV(e) {
    let i = this.pixel2Index(e);
    return this.range.value(i);
  }
  xPosSnap2CandlePos(e) {
    let i = e % this.candleW, s = i ? this.candleW / 2 : 0;
    return lt(e - i + s);
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
    this.#e = this.calcXAxisGrads();
  }
  doCalcXAxisGrads(e) {
    this.#e = this.calcXAxisGrads(e);
  }
  calcXAxisGrads(e = this.range.snapshot()) {
    const i = {
      entries: {},
      values: [],
      major: [],
      minor: []
    }, s = Es(e.rangeDuration);
    i.units = s;
    for (let p in s)
      if (s[p] > 0) {
        i.units = [p, p], i.timeSpan = `${s[p]} ${p}`;
        break;
      }
    const n = e.interval, { xStep: o, rank: a } = this.xStep(e), h = this.pixel2T(this.width) + o;
    let l = e.timeMin - e.timeMin % o - o, g = l;
    for (; l < h; ) {
      let p = gi(l, "years"), v = gi(l, "months"), b = gi(l, "days");
      !(p in i.entries) && p >= g ? i.entries[p] = [this.dateTimeValue(p, n), this.t2Pixel(p), p, "major"] : !(v in i.entries) && v >= g ? i.entries[v] = [this.dateTimeValue(v, n), this.t2Pixel(v), v, "major"] : !(b in i.entries) && b >= g && (i.entries[b] = [this.dateTimeValue(b, n), this.t2Pixel(b), b, "major"]), i.entries[l] = [this.dateTimeValue(l, n), this.t2Pixel(l), l, "minor"], l += o;
    }
    return i.values = Object.values(i.entries), i;
  }
  xStep(e) {
    let i = Ha, s = this.#n ? e.interval : 1, n = Ie[0], o = lt(this.width / e.Length), a = ls[0], h = Ie.indexOf(s);
    for (; h-- >= 0 && !(o * (Ie[h] / s) >= i); )
      ;
    return n = Ie[h], a = ls[h], { xStep: n, rank: a };
  }
  dateTimeValue(e, i) {
    if (e / N % 1 === 0) {
      const s = Ls(e);
      return s === 1 ? As(e) === 0 ? mr(e) : gr(e) : s;
    } else
      return i < F || i < j ? cs(e) : vr(e);
  }
}
const ss = {
  id: "time",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        resize: {
          target: "resize",
          action(r) {
          }
        },
        xAxis_scale: {
          target: "scale",
          action(r) {
          }
        },
        xAxis_inc: {
          target: "incremental",
          action(r) {
          }
        },
        xAxis_log: {
          target: "logarithmic",
          action(r) {
          }
        },
        xAxis_100: {
          target: "percentual",
          action(r) {
          }
        },
        chart_pan: {
          target: "chart_pan",
          action(r) {
          }
        }
      }
    },
    resize: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        someEvent: {
          target: "",
          action(r) {
          }
        }
      }
    },
    chart_pan: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        chart_pan: {
          target: "chart_pan",
          action(r) {
          }
        },
        chart_panDone: {
          target: "idle",
          action(r) {
          }
        }
      }
    }
  },
  guards: {}
}, Kn = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Zn = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, Qn = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, Jn = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, tr = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class _r {
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
  constructor(e) {
    this.#e(e), Kn.test(e) && this.#n(e), Zn.test(e) && this.#r(e), Qn.test(e) && this.#i(e), Jn.test(e) && this.#s(e), tr.test(e) && this.#l(e);
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
  #e(e) {
    if (al) {
      let i = document.getElementById("divValidColourTest");
      i || (i = document.createElement("div"), i.id = "divValidColourTest"), i.style.backgroundColor = "", i.style.backgroundColor = e, this.#t.isValid = !!i.style.backgroundColor.length;
    } else
      this.#t.isValid = !!(Kn.test(e) || Zn.test(e) || Qn.test(e) || Jn.test(e) || tr.test(e));
  }
  setHex(e) {
    let i = this.#t;
    [
      i.r16,
      i.g16,
      i.b16,
      i.a16
    ] = e, i.hex = "#" + i.r16 + i.g16 + i.b16 + i.a16;
  }
  setRGBA(e) {
    let i = this.#t;
    [
      i.r,
      i.g,
      i.b,
      i.a
    ] = e, i.rgb = `rgb(${e[0]},${e[1]},${e[2]})`, i.rgba = `rgb(${e[0]},${e[1]},${e[2]},${e[3]})`;
  }
  setHSLA(e) {
    let i = this.#t;
    [
      i.h,
      i.s,
      i.l,
      i.a
    ] = e, i.hsl = `hsl(${e[0]},${e[1]}%,${e[2]}%)`, i.hsla = `hsl(${e[0]},${e[1]}%,${e[2]}%,${e[3]})`;
  }
  #n(e) {
    this.#t.hex = e;
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
    this.setHex(s), this.#u(s), this.#d(s);
  }
  #r(e) {
    this.#t.hsl = e;
  }
  #i(e) {
    this.#t.hsla = e;
  }
  #s(e) {
    this.#t.rgb = e, this.#m(rgba);
  }
  #l(e) {
    this.#t.rgba = e, this.#m(e);
  }
  #a(e) {
    let { r: i, g: s, b: n, a: o } = this.#f(e);
    return i.length == 1 && (i = "0" + i), s.length == 1 && (s = "0" + s), n.length == 1 && (n = "0" + n), o.length == 1 && (o = "0" + o), this.value.r = i, this.value.g = s, this.value.b = n, this.value.a = o, this.setHex([i, s, n, o]), this;
  }
  #h(e) {
    let { r: i, g: s, b: n, a: o } = this.#f(e);
    i = parseInt(i, 16) / 255, s = parseInt(s, 16) / 255, n = parseInt(n, 16) / 255, o = parseInt(o, 16) / 255;
    const a = Math.max(i, s, n), h = a - Math.min(i, s, n), l = h ? a === i ? (s - n) / h : a === s ? 2 + (n - i) / h : 4 + (i - s) / h : 0;
    let g = [
      (60 * l < 0 ? 60 * l + 360 : 60 * l).toString(),
      (100 * (h ? a <= 0.5 ? h / (2 * a - h) : h / (2 - (2 * a - h)) : 0)).toString(),
      (100 * (2 * a - h) / 2).toString(),
      o.toString()
    ];
    return this.setHSLA(g), this;
  }
  #o(e, i, s) {
    i /= 100, s /= 100;
    const n = (h) => (h + e / 30) % 12, o = i * Math.min(s, 1 - s), a = (h) => s - o * Math.max(-1, Math.min(n(h) - 3, Math.min(9 - n(h), 1)));
    return [255 * a(0), 255 * a(8), 255 * a(4)];
  }
  #c(e, i, s) {
    s /= 100;
    const n = i * Math.min(s, 1 - s) / 100, o = (a) => {
      const h = (a + e / 30) % 12, l = s - n * Math.max(Math.min(h - 3, 9 - h, 1), -1);
      return Math.round(255 * l).toString(16).padStart(2, "0");
    };
    return `#${o(0)}${o(8)}${o(4)}`;
  }
  #u(e) {
    S(e) && (e = /([a-f\d]{2})/ig.exec(e));
    var i = [
      parseInt(e[0], 16),
      parseInt(e[1], 16),
      parseInt(e[2], 16),
      parseInt(e[3], 16) / 255
    ];
    this.setRGBA(i);
  }
  #d(e) {
    S(e) && (e = /([a-f\d]{2})/ig.exec(e));
    let i = parseInt(e[0], 16), s = parseInt(e[1], 16), n = parseInt(e[2], 16), o = parseInt(e[3], 16);
    i /= 255, s /= 255, n /= 255, o /= 255, this.setHSLA([i, s, n, o]);
  }
  #f(e) {
    let i, s, n, o, a = this.#t;
    if (a.r && a.g && a.b && a.a)
      return { r: i, g: s, b: n, a: o } = { ...a };
    if (S(e)) {
      let h = e.indexOf(",") > -1 ? "," : " ";
      e = e.substr(4).split(")")[0].split(h);
    }
    if (P(e)) {
      if (e.length < 3 || e.length > 4)
        return !1;
      i = e[0], s = e[1], n = e[2], o = S(e[3]) ? e[3] : "";
    } else if (E(e))
      i = e.r, s = e.g, n = e.b, o = "a" in e ? e.a : "";
    else
      return !1;
    return { r: i, g: s, b: n, a: o };
  }
  #m(e) {
    let i, s, n = 0, o = [], a = [], h = e.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    h.shift();
    for (let l of h)
      s = l.indexOf("%") > -1, i = parseFloat(l), n < 3 && s ? i = Math.round(255 * i / 100) : n == 3 && (!s && i >= 0 && i <= 1 ? i = Math.round(255 * i) : s && i >= 0 && i <= 100 ? i = Math.round(255 * i / 100) : i = ""), o[n] = (i | 256).toString(16).slice(1), a[n++] = i;
    this.setHex(o), this.setRGBA(a), this.#d(this.#t.hex);
  }
}
class Ns {
  static #t;
  #e;
  #n;
  #r;
  #i;
  #s = { w: 0, h: 0 };
  #l = { w: 0, h: 0, x: 0, y: 0 };
  #a = { x: !1, y: !0 };
  #h;
  #o = { x: 0, drag: !1 };
  #c;
  #u;
  constructor(e) {
    this.#e = Ns.#t++, this.#n = e.core, this.#r = D.isElement(e.elContainer) ? e.elContainer : !1, this.#i = D.isElement(e.elHandle) ? e.elHandle : !1, this.#u = z(e.callback) ? e.callback : !1, D.isElement(this.#r) && D.isElement(this.#i) && (this.mount(), this.eventsListen());
  }
  set cursor(e) {
    this.#i.style.cursor = e;
  }
  get cursor() {
    return this.#i.style.cursor;
  }
  eventsListen() {
    this.#c = new Rt(this.#i, { disableContextMenu: !1 }), this.#c.on("mouseenter", xt(this.onMouseEnter, 1, this, !0)), this.#c.on("mouseout", xt(this.onMouseOut, 1, this, !0)), this.#c.on("drag", Oa(this.onHandleDrag, 100, this)), this.#c.on("enddrag", this.onHandleDragDone.bind(this)), this.#c.on("mousedown", xt(this.onMouseDown, 100, this, !0)), this.#c.on("mouseup", this.onMouseUp.bind(this));
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
    e && (this.colour = new _r(e), this.#i.style.backgroundColor = this.colour.hex);
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
    this.#o.drag || (this.#o.drag = !0, this.#o.x = e.position.x), this.handlePos(e);
  }
  onHandleDragDone(e) {
    this.handlePos(e), this.#o.drag = !1;
  }
  mount() {
    this.#s.w = this.#r.getBoundingClientRect().width, this.#s.h = this.#r.getBoundingClientRect().height, this.#r.style.overflow = "hidden", this.#l.w = this.#i.getBoundingClientRect().width, this.#l.h = this.#i.getBoundingClientRect().height, this.#i.style.marginRight = 0, this.#i.style.position = "absolute";
  }
  handlePos(e) {
    let i = this.#n.range, s = parseInt(this.#i.style.marginLeft), n = this.#r.getBoundingClientRect().width, o = this.#i.getBoundingClientRect().width, a = n - o, h = e.position.x - this.#o.x, l = $(s + h, 0, a), g = (i.dataLength + i.limitFuture + i.limitPast) / n, p = Math.floor(l * g);
    this.setHandleDims(l, o), this.#n.jumpToIndex(p);
  }
  setHandleDims(e, i) {
    let s = this.#r.getBoundingClientRect().width;
    i = i || this.#i.getBoundingClientRect().width, e = e / s * 100, this.#i.style.marginLeft = `${e}%`, i = i / s * 100, this.#i.style.width = `${i}%`;
  }
}
const Nr = ["source-over", "source-atop", "source-in", "source-out", "destination-over", "destination-atop", "destination-in", "destination-out", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
let $r = class {
  #t = 0;
  constructor(e = {}) {
    this.container = e.container, this.layers = [], this.id = G.idCnt++, this.scene = new G.Scene(), this.setSize(e.width || 0, e.height || 0);
  }
  generateKey() {
    return this.#t++;
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
    for (var s = this.layers, n = s.length - 1, o, a; n >= 0; ) {
      if (o = s[n], a = o.hit.getIntersection(e, i), a >= 0)
        return a;
      n--;
    }
    return -1;
  }
  get index() {
    let e = G.viewports, i, s = 0;
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
      e && n.layers.length > 0 && n.render(e), Nr.includes(n?.composition) && (i.context.globalCompositeOperation = n.composition), n.visible && n.width > 0 && n.height > 0 && i.context.drawImage(
        n.scene.canvas,
        n.x,
        n.y,
        n.width,
        n.height
      );
  }
};
class Bh extends $r {
  constructor(e = {}) {
    super(e), e.container.innerHTML = "", e.container.appendChild(this.scene.canvas), G.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", G.viewports.splice(this.index, 1);
  }
}
class Uh {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  visible = !0;
  composition = null;
  constructor(e = {}) {
    this.id = G.idCnt++, this.hit = new G.Hit({
      layer: this,
      contextType: e.contextType
    }), this.scene = new G.Scene({
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
    if (Nr.includes(e))
      return this.composition = e, this;
  }
  move(e) {
    let { index: i, viewport: s } = this, n = s.layers, o;
    switch (typeof e == "number" && (o = $(Math.floor(e), (n.length - 1) * -1, n.length - 1), e = "order"), e) {
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
        Ea(n, this.index, o);
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
class Wh {
  width = 0;
  height = 0;
  constructor(e) {
    e || (e = {}), this.id = G.idCnt++, this.layer = e.layer, this.contextType = e.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "scene-canvas", this.canvas.style.display = "block", this.context = this.canvas.getContext(this.contextType), e.width && e.height && this.setSize(e.width, e.height);
  }
  setSize(e, i) {
    return zr(e, i, this);
  }
  clear() {
    return Hr(this);
  }
  toImage(e = "image/png", i, s) {
    let n = this, o = new Image(), a = this.canvas.toDataURL(e, i);
    o.onload = function() {
      o.width = n.width, o.height = n.height, s(o);
    }, o.src = a;
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
class Fh {
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
    return Hr(this);
  }
  getIntersection(e, i) {
    let s = this.context, n;
    if (e = Math.round(e - this.layer.x), i = Math.round(i - this.layer.y), e < 0 || i < 0 || e > this.width || i > this.height)
      return -1;
    if (this.contextType === "2d") {
      if (n = s.getImageData(e, i, 1, 1).data, n[3] < 255)
        return -1;
    } else if (n = new Uint8Array(4), s.readPixels(
      e * G.pixelRatio,
      (this.height - i - 1) * G.pixelRatio,
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
function Hr(r) {
  let e = r.context;
  return r.contextType === "2d" ? e.clearRect(
    0,
    0,
    r.width * G.pixelRatio,
    r.height * G.pixelRatio
  ) : e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), r;
}
function zr(r, e, i) {
  return i.width = r, i.height = e, i.canvas.width = r * G.pixelRatio, i.canvas.style.width = `${r}px`, i.canvas.height = e * G.pixelRatio, i.canvas.style.height = `${e}px`, i.contextType === "2d" && G.pixelRatio !== 1 && i.context.scale(G.pixelRatio, G.pixelRatio), i;
}
const G = {
  idCnt: 0,
  viewports: [],
  pixelRatio: window && window.devicePixelRatio || 1,
  Node: $r,
  Viewport: Bh,
  Layer: Uh,
  Scene: Wh,
  Hit: Fh
}, Fe = G;
class Vh {
  #t;
  #e;
  #n;
  #r;
  #i;
  constructor(e, i = []) {
    this.#n = e, this.#t = e.core, this.#r = new Et([...i]);
    for (const [s, n] of this.#r)
      this.addOverlay(s, n);
  }
  log(e) {
    this.#t.log(e);
  }
  info(e) {
    this.#t.info(e);
  }
  warn(e) {
    this.#t.warn(e);
  }
  error(e) {
    this.#t.error(e);
  }
  get core() {
    return this.#t;
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
    for (let e of this.#r.keys())
      this.removeOverlay(e);
    this.#r = null;
  }
  eventsListen() {
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
  get(e) {
    return this.#r.get(e);
  }
  addOverlays(e) {
    let i = [], s, n;
    for (let o of e)
      n = this.addOverlay(o[0], o[1]), s = n.instance?.id || o[0], i.push([s, n]);
    return i;
  }
  addOverlay(e, i) {
    try {
      const s = new Fe.Layer(this.layerConfig);
      return this.parent.viewport.addLayer(s), i.layer = s, i.instance = new i.class(
        s,
        this.#n.TimeLine,
        this.#n.Scale,
        this.#t.theme,
        this,
        i.params
      ), S(i.instance?.id) || (i.instance.id = e), this.#r.set(i.instance.id, i), !0;
    } catch (s) {
      return console.error(`Error: Cannot instantiate ${e} overlay / indicator`), console.error(s), !1;
    }
  }
  removeOverlay(e) {
    this.#r.has(e) && (this.#r.get(e).layer.remove(), this.#r.delete(e));
  }
}
class xi extends Rr {
  #t;
  #e;
  #n;
  #r;
  #i = jt[0];
  #s = "automatic";
  #l = {
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
  #a = 1.04;
  #h = gn;
  #o = $a;
  #c = 3;
  #u;
  #d;
  constructor(e, i, s = jt[0], n) {
    super(e), this.#n = i, this.#e = e, this.#t = e.parent, this.yAxisType = s, n = n || this.core.range, this.setRange(n);
  }
  get chart() {
    return this.#n;
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
  set yAxisPadding(e) {
    this.#a = e;
  }
  get yAxisPadding() {
    return this.#a;
  }
  set yAxisType(e) {
    this.#i = jt.includes(e) ? e : jt[0];
  }
  get yAxisType() {
    return this.#i;
  }
  set yAxisStep(e) {
    this.#h = T(e) ? e : gn;
  }
  get yAxisStep() {
    return this.#h;
  }
  set yAxisTicks(e) {
    this.#c = T(e) ? e : 0;
  }
  get yAxisTicks() {
    return this.#c;
  }
  get yAxisGrads() {
    return this.#u;
  }
  set mode(e) {
    this.setMode(e);
  }
  get mode() {
    return this.#s;
  }
  set offset(e) {
    this.setOffset(e);
  }
  get offset() {
    return this.#d.offset;
  }
  set zoom(e) {
    this.setZoom(e);
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
  yAxisCntDigits(e) {
    return this.countDigits(e);
  }
  yAxisCalcPrecision() {
    let e = this.numDigits(this.#d.max);
    return this.yDigits - e;
  }
  yAxisCursor() {
  }
  yPos(e) {
    switch (this.yAxisType) {
      case "percent":
        return lt(this.p100toPixel(e));
      case "log":
        return lt(this.$2Pixel(xa(e)));
      default:
        return lt(this.$2Pixel(e));
    }
  }
  yPos2Price(e) {
    return this.pixel2$(e);
  }
  $2Pixel(e) {
    const i = e - this.#d.min;
    return this.height - i * this.yAxisRatio;
  }
  lastYData2Pixel(e) {
    let i = e - this.core.stream.lastPriceMin;
    return this.height - i * this.yAxisRatio;
  }
  pixel2$(e) {
    let i = (this.height - e) / this.height, s = this.#d.diff * i;
    return this.#d.min + s;
  }
  p100toPixel(e) {
    let i = this.#d.max, s = this.height / (i - this.#d.min);
    return Math.floor(i - this.#d.max), (e - i) * -1 * s;
  }
  yAxisTransform() {
  }
  setMode(e) {
    if (!["automatic", "manual"].includes(e))
      return !1;
    const i = this.#l;
    return this.mode == "automatic" && e == "manual" ? (i.manual.zoom = 0, i.manual.max = this.#d.valueMax, i.manual.min = this.#d.valueMin, this.#s = e) : this.mode == "manual" && e == "automatic" && (i.manual.zoom = 0, this.#s = e), !0;
  }
  setOffset(e) {
    if (!T(e) || e == 0 || this.#s !== "manual")
      return !1;
    const i = this.#l;
    let s = this.pixel2$(e * -1), n = this.pixel2$(this.height - e), o = s - n;
    i.manual.min = n, i.manual.max = s, i.manual.mid = o / 2, i.manual.diff = o, i.manual.zoom = 0;
  }
  setZoom(e) {
    if (!T(e) || this.#s !== "manual")
      return !1;
    const i = this.#l;
    let s = i.manual.min, n = i.manual.max;
    const o = n - s, a = o * 0.01, h = e * a;
    s -= h, n += h, !(n < s || s <= 1 / 0 * -1 || n >= 1 / 0) && (i.manual.max = n, i.manual.min = s, i.manual.mid = o / 2, i.manual.diff = o, i.manual.zoom = h, this.calcGradations());
  }
  setRange(e) {
    this.#l.automatic.range = e, this.#d = new Proxy(e, {
      get: (i, s) => {
        const n = this.#s, o = this.#l;
        switch (s) {
          case "max":
            return o[n][s];
          case "min":
            return o[n][s];
          case "mid":
            return o[n][s];
          case "diff":
            return o[n][s];
          case "zoom":
            return o[n][s];
          case "offset":
            return o[n][s];
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
        e = this.#d.max > -10 ? this.#d.max : 110, i = this.#d.min > -10 ? this.#d.min : -10, s = this.#d.offset, this.#u = this.gradations(e + s, i + s);
        break;
      default:
        e = this.#d.max > 0 ? this.#d.max : 1, i = this.#d.min > 0 ? this.#d.min : 0, s = this.#d.offset, this.#u = this.gradations(e + s, i + s);
        break;
    }
    return this.#u;
  }
  gradations(e, i, s = !0) {
    let n, o, a;
    const h = [];
    o = e - i, o = this.rangeH > 0 ? this.rangeH : 1, a = o / (this.height / (this.core.theme.yAxis.fontSize * 1.75));
    let l = Math.pow(10, Math.ceil(Math.log10(a)));
    a < 0.25 * l ? l = 0.25 * l : a < 0.5 * l && (l = 0.5 * l);
    var g = Math.ceil(i / l) * l, p = Math.floor(e / l) * l;
    let v = this.height, b = (p - g) / l;
    this.height / b;
    let L = this.countDigits(b), O;
    for (var R = g; R <= p; R += l)
      n = this.countDigits(R), O = this.niceValue(n, s, L), v = this.yPos(O), h.push([O, v, n]);
    return h;
  }
  niceValue(e, i = !0, s) {
    if (e.integers) {
      let n = s.integers;
      if (n - 2 > 0) {
        let o = Ta(10, n - 2);
        return Math.floor(e.value / o) * o;
      } else
        return i ? (n = n > 0 ? n : n * -1, dn(e.value, n)) : Math.floor(e.value);
    } else {
      let n = e.decimals - s.decimals;
      return n = n > 0 ? n : n * -1, dn(e.value, n);
    }
  }
  limitPrecision(e) {
    let i = e.value, s = this.#o - e.total, n = 4 - e.integers;
    if (s < 1) {
      let o = $(e.decimals + s, 0, 100);
      i = Number.parseFloat(i).toFixed(o);
    } else if (n < 1) {
      let o = 2 - n;
      i = Number.parseFloat(i).toFixed(o);
    }
    return i;
  }
}
class V {
  #t;
  #e;
  #n = {};
  #r;
  #i;
  #s;
  #l;
  #a;
  #h;
  #o;
  #c = !0;
  id;
  constructor(e, i = !1, s = !1, n, o, a = {}) {
    this.#e = o.core, this.#t = o, this.#n = o.core.config, this.#l = e, this.#a = e.scene, this.#h = e.hit, this.#r = n, this.#i = i, this.#s = s, this.#o = a;
  }
  get core() {
    return this.#e;
  }
  get parent() {
    return this.#t;
  }
  get target() {
    return this.#l;
  }
  get config() {
    return this.#n;
  }
  get params() {
    return this.#o;
  }
  get scene() {
    return this.#a;
  }
  get hit() {
    return this.#h;
  }
  get theme() {
    return this.#r;
  }
  get chart() {
    return this.#t.parent.parent;
  }
  get xAxis() {
    return this.getXAxis();
  }
  get yAxis() {
    return this.getYAxis();
  }
  get overlay() {
    return this.#o.overlay;
  }
  set doDraw(e) {
    this.#c = X(e) ? e : !1;
  }
  get doDraw() {
    return this.#c;
  }
  get context() {
    return this.contextIs();
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  destroy() {
  }
  on(e, i, s) {
    this.#e.on(e, i, s);
  }
  off(e, i) {
    this.#e.off(e, i);
  }
  emit(e, i) {
    this.core.emit(e, i);
  }
  getXAxis() {
    return this.#i instanceof wi ? this.#i : this.core.Chart.time.xAxis instanceof wi ? this.core.Chart.time.xAxis : "time" in this.#t ? this.#t.time.xAxis : !1;
  }
  getYAxis() {
    return this.#s instanceof xi ? this.#s : this.chart.yAxis instanceof xi ? this.chart.yAxis : "scale" in this.#t ? this.#t.scale.yAxis : !1;
  }
  contextIs() {
    return !this.#i && !this.#s ? "chart" : this.#i instanceof wi ? "timeline" : this.#s instanceof xi ? "scale" : !1;
  }
}
class Li extends V {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.params.axes = a?.axes || "both";
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (e = e || this.params.axes, this.scene.clear(), e == "none")
      return;
    const i = this.scene.context;
    if (i.save(), i.strokeStyle = this.core.theme.chart.GridColour || Dr.COLOUR_GRID, e != "y") {
      const n = this.xAxis.xAxisGrads.values;
      for (let o of n) {
        let a = lt(o[1]);
        i.beginPath(), i.moveTo(a + 0, 0), i.lineTo(a + 0, this.scene.height), i.stroke();
      }
    }
    if (e != "x") {
      const s = this.yAxis.yAxisGrads;
      for (let n of s) {
        let o = this.yAxis.$2Pixel(n[0]);
        i.beginPath(), i.moveTo(0, o), i.lineTo(this.scene.width, o), i.stroke();
      }
    }
    i.restore(), this.doDraw = !1;
  }
  drawX() {
    this.draw("x");
  }
}
class xs extends V {
  #t = [0, 0];
  #e = !0;
  #n;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.core.on("chart_pan", (h) => {
      this.onMouseDragX(h);
    }), this.core.on("chart_panDone", (h) => {
      this.onMouseDragX(h);
    }), this.core.on("main_mousemove", (h) => {
      this.onMouseMoveX(h);
    }), this.#n = new Rt(this.target.viewport.container, { disableContextMenu: !1 }), this.#n.on("pointermove", this.onMouseMove.bind(this)), this.#n.on("pointerenter", this.onMouseMove.bind(this));
  }
  set position(e) {
  }
  get update() {
    return this.#e;
  }
  onMouseDragX(e) {
    this.#t[0] = e[0], this.#t[1] = e[1], this.draw(!0), this.core.emit("chart_render");
  }
  onMouseMoveX(e) {
    this.#t[0] = e[0], this.draw(), this.core.emit("chart_render");
  }
  onMouseMove(e) {
    const i = E(e) ? e.position.x : e[0], s = E(e) ? e.position.y : e[1];
    this.#t[0] = i, this.#t[1] = s, this.draw(), this.core.emit("chart_render");
  }
  draw(e = !1) {
    const i = this.target.viewport.container.getBoundingClientRect();
    let s = this.core.mousePos.y - i.top, n = this.core.mousePos.x - i.left;
    e || (n = this.xAxis.xPosSnap2CandlePos(n) + this.xAxis.scrollOffsetPx), this.scene.clear();
    const o = this.scene.context;
    o.save(), o.setLineDash([5, 5]);
    const a = this.xAxis.smoothScrollOffset || 0;
    o.strokeStyle = "#666", o.beginPath(), o.moveTo(n + a, 0), o.lineTo(n + a, this.scene.height), o.stroke(), this.chart.cursorActive && (o.beginPath(), o.moveTo(0, s), o.lineTo(this.scene.width, s), o.stroke()), o.restore();
  }
}
const Gh = [
  ["grid", { class: Li, fixed: !0 }],
  ["cursor", { class: xs, fixed: !0 }]
];
class ye {
  #t;
  #e;
  #n;
  #r;
  #i;
  #s;
  #l;
  #a;
  #h;
  #o;
  constructor(e, i, s, n = !1) {
    this.#r = e, this.#t = e.core, this.#e = this.core.config, this.#n = this.core.theme, this.#l = this.#r.element, this.#h = i, this.createViewport(s, n);
  }
  get parent() {
    return this.#r;
  }
  get core() {
    return this.#t;
  }
  get config() {
    return this.#e;
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
    return D.elementDimPos(this.#l);
  }
  set layerWidth(e) {
    this.#o = e;
  }
  get layerWidth() {
    return this.#o;
  }
  get stateMachine() {
    return this.#r.stateMachine;
  }
  set state(e) {
    this.#t.setState(e);
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
    for (let [o, a] of n)
      a.layer.setSize(s, i);
  }
  createViewport(e = [], i = !1) {
    e = e.length == 0 ? ct(Gh) : e;
    const { width: s, height: n } = this.layerConfig();
    let o = i ? Fe.Node : Fe.Viewport;
    this.#i = new o({
      width: s,
      height: n,
      container: this.#h
    }), this.#a = this.#i.scene.canvas, this.#s = new Vh(this, e);
  }
  layerConfig() {
    const e = this.config?.buffer || Ri, i = this.#h.getBoundingClientRect().width, s = this.#h.getBoundingClientRect().height;
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
    const s = this.#s.list;
    if (!(s instanceof Et))
      return !1;
    for (let [n, o] of s)
      !E(o) || !z(o?.instance?.draw) || (o.instance.draw(), o.fixed || (o.instance.position = [this.#t.scrollPos, 0]));
  }
  render() {
    this.#i.render();
  }
}
class Yh extends V {
  #t = [0, 0];
  #e;
  constructor(e, i = !1, s = !1, n, o, a) {
    i = o.time.xAxis, super(e, i, s, n, o);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    this.scene.clear();
    const i = this.scene.context, s = this.xAxis.xAxisGrads.values, n = 0, o = this.theme.xAxis, a = X(o.tickMarker) ? o.tickMarker : !0;
    i.save(), i.strokeStyle = o.colourTick, i.fillStyle = o.colourTick, i.font = `${o.fontWeight} ${o.fontSize}px ${o.fontFamily}`;
    for (let h of s) {
      let l = lt(h[1]), g = Math.floor(i.measureText(`${h[0]}`).width * 0.5);
      i.fillText(h[0], l - g + n, this.xAxis.xAxisTicks + 12), a && (i.beginPath(), i.moveTo(l + n, 0), i.lineTo(l + n, this.xAxis.xAxisTicks), i.stroke());
    }
    i.restore();
  }
}
class qh extends V {
  #t = [0, 0];
  #e;
  constructor(e, i = !1, s = !1, n, o, a) {
    i = o.time.xAxis, super(e, i, s, n, o);
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
function Br(r, e) {
  return Math.round(r.measureText(e).width);
}
function qe(r = Tt.fontSize, e = Tt.fontWeight, i = Tt.fontFamily) {
  return `${e} ${r}px ${i}`;
}
function Ni(r, e, i) {
  r.font = qe(i?.fontSize, i?.fontWeight, i?.fontFamily);
  const s = Br(r, e), n = i?.paddingLeft || 0, o = i?.paddingRight || 0, a = i?.borderWidth || 0;
  return n + o + s + a * 2;
}
function $i(r) {
  const e = r?.paddingTop || 0, i = r?.paddingBottom || 0, s = r?.borderWidth || 0, n = r?.fontSize || 0;
  return e + i + n + s * 2;
}
function Ur(r, e, i, s) {
  r.fillStyle = s?.colour, r.font = qe(s?.fontSize, s?.fontWeight, s?.fontFamily), r.textAlign = s?.textAlign || "start", r.textBaseline = s?.textBaseLine || "alphabetic", r.direction = s?.direction || "inherit", r.lineWidth = s?.width, r.strokeStyle = s?.border, s?.stroke ? r.strokeText(s?.text, e, i, s?.max) : r.fillText(s?.text, e, i, s?.max);
}
function ve(r, e, i, s, n) {
  r.save(), r.font = qe(n?.fontSize, n?.fontWeight, n?.fontFamily), r.textBaseline = "top", r.fillStyle = n?.bakCol || Tt.bakCol;
  let o = n?.width || Ni(r, e, n), a = n?.height || $i(n);
  r.fillRect(i, s, o, a), r.fillStyle = n?.txtCol || Tt.txtCol, i = i + n?.paddingLeft, s = s + n?.paddingTop, r.fillText(`${e}`, i, s), r.restore();
}
class Xh extends V {
  #t = [0, 0];
  constructor(e, i = !1, s = !1, n, o) {
    i = o.time.xAxis, super(e, i, s, n, o), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context, i = this.target.viewport.container.getBoundingClientRect(), s = this.core.mousePos.x - i.left;
    let n = this.xAxis.xPos2Time(s), o = new Date(n), a = o.toUTCString(), h = {
      fontSize: this.theme.xAxis.fontSize * 1.05,
      fontWeight: this.theme.xAxis.fontWeight,
      fontFamily: this.theme.xAxis.fontFamily,
      txtCol: this.theme.xAxis.colourCursor,
      bakCol: this.theme.xAxis.colourCursorBG,
      paddingTop: 5,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4
    }, l = Ni(e, a, h), g = s + this.core.bufferPx;
    g = this.xAxis.xPosSnap2CandlePos(g), g = g - Math.round(l * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), e.save(), ve(e, a, g, 1, h), e.restore();
  }
}
const jh = [
  ["labels", { class: Yh, fixed: !1, required: !0 }],
  ["overlay", { class: qh, fixed: !1, required: !0 }],
  ["cursor", { class: Xh, fixed: !1, required: !0 }]
];
class Kh {
  #t;
  #e = "Timeline";
  #n = "time";
  #r;
  #i;
  #s;
  #l;
  #a;
  #h;
  #o;
  #c;
  #u;
  #d = new Et();
  #f = [];
  #m;
  #y;
  #S;
  #v;
  #p;
  #w;
  #O;
  #g;
  #P;
  #C;
  #k;
  #M;
  #b;
  #E;
  #L = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #x = { end: !1, start: !1 };
  constructor(e, i) {
    this.#s = e, this.#r = i, this.#i = i.elements.elTime, this.#l = e.Chart, this.#a = new wi(this, this.#l), this.init();
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
    this.#t = Nt(e);
  }
  get id() {
    return this.#t ? `${this.#t}` : `${this.#s.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#e;
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
    return this.#o;
  }
  get height() {
    return this.#i.getBoundingClientRect().height;
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#i.getBoundingClientRect().width;
  }
  get xAxis() {
    return this.#a;
  }
  get xAxisWidth() {
    return this.#a.width;
  }
  get xAxisRatio() {
    return this.#a.xAxisRatio;
  }
  get layerLabels() {
    return this.#O;
  }
  get layerOverlays() {
    return this.#g;
  }
  get xAxisGrads() {
    return this.#a.xAxisGrads;
  }
  get candleW() {
    return this.#a.candleW;
  }
  get candlesOnLayer() {
    return this.#a.candlesOnLayer;
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
    return this.#m;
  }
  get range() {
    return this.#s.range;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#i);
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
    this.#h = new Bt(e, this);
  }
  get stateMachine() {
    return this.#h;
  }
  get time() {
    return this;
  }
  init() {
    const e = this.#i;
    this.#o = e.viewport, this.#c = e.overview, this.#y = e.overview.icons, this.#S = e.overview.scrollBar, this.#v = e.overview.handle, this.#p = e.overview.rwdStart, this.#w = e.overview.fwdEnd;
    const i = {
      core: this.#s,
      elContainer: this.#S,
      elHandle: this.#v,
      callback: null
    };
    this.#E = new Ns(i), this.#s.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(e) {
    this.#i.style.width = `${e}px`, this.#o.style.width = `${e}px`;
  }
  setDimensions(e) {
    const i = this.config.buffer || Ri, s = e.w, n = this.height, o = Math.round(s * ((100 + i) * 0.01));
    this.#u.setSize(s, n, o), this.draw();
  }
  navigationDisplay(e) {
    if (e)
      this.#w.style["margin-top"] = 0, this.#p.style["margin-top"] = 0;
    else {
      const i = this.core.theme.xAxis?.background ? this.core.theme.xAxis.Background : this.core.theme.chart.Background;
      this.#c.style.visibility = "hidden", this.#w.style["margin-top"] = `${this.#o.clientHeight * -1}px`, this.#p.style["margin-top"] = `${this.#o.clientHeight * -1}px`, this.#w.style.background = this.core.theme.chart.Background, this.#p.style.background = i;
    }
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#a.initXAxisGrads(), this.draw(), this.eventsListen(), ss.id = this.id, ss.context = this, this.stateMachine = ss, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#C.destroy(), this.#k.destroy(), this.#M.destroy(), this.off("main_mousemove", this.drawCursorTime), this.off("setRange", this.onSetRange), this.#w.removeEventListener("click", xt), this.#p.removeEventListener("click", xt), this.#u.destroy(), this.element.remove();
  }
  eventsListen() {
    this.#C = new Rt(this.#o, { disableContextMenu: !1 }), this.#C.on("dblclick", this.onDoubleClick.bind(this)), this.#C.on("pointerover", this.onPointerEnter.bind(this)), this.#C.on("pointerout", this.onPointerLeave.bind(this)), this.#C.on("pointerdrag", this.onPointerDrag.bind(this)), this.#k = new Rt(this.#w, { disableContextMenu: !1 }), this.#k.on("pointerover", () => this.showJump(this.#x.end)), this.#k.on("pointerleave", () => this.hideJump(this.#x.end)), this.#M = new Rt(this.#p, { disableContextMenu: !1 }), this.#M.on("pointerover", () => this.showJump(this.#x.start)), this.#M.on("pointerleave", () => this.hideJump(this.#x.start)), this.on("main_mousemove", this.#P.draw, this.#P), this.on("setRange", this.onSetRange, this), this.#w.addEventListener("click", xt(this.onMouseClick, 1e3, this, !0)), this.#p.addEventListener("click", xt(this.onMouseClick, 1e3, this, !0));
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
    e.domEvent.target.style.cursor = "ew-resize", this.#c.style.visibility = "visible", this.hideCursorTime();
  }
  onPointerLeave(e) {
    this.#s.theme?.time?.navigation === !1 && !(this.#x.end && this.#x.start) && (this.#c.style.visibility = "hidden");
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
    let s = this.#S.getBoundingClientRect().width, n = e.dataLength + e.limitFuture + e.limitPast, o = s / n, a = e.Length * o, h = (i + e.limitPast) * o;
    this.#E.setHandleDims(h, a);
  }
  t2Index(e) {
    return this.#a.t2Index(e);
  }
  xPos(e) {
    return this.#a.xPos(e);
  }
  xPosSnap2CandlePos(e) {
    return this.#a.xPosSnap2CandlePos(e);
  }
  xPos2Time(e) {
    return this.#a.xPos2Time(e);
  }
  xPos2Index(e) {
    return this.#a.xPos2Index(e);
  }
  xPosOHLCV(e) {
    return this.#a.xPosOHLCV(e);
  }
  createGraph() {
    let e = ct(jh);
    this.#u = new ye(this, this.#o, e, !1), this.#P = this.graph.overlays.get("cursor").instance, this.#O = this.graph.overlays.get("labels").instance, this.#g = this.graph.overlays.get("overlay").instance, this.graph.addOverlays(this.#f);
  }
  addOverlays(e) {
    if (!isArray(e))
      return !1;
    this.graph === void 0 ? this.#f.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!isObject(i))
      return !1;
    if (this.graph === void 0)
      this.#f.push([e, i]);
    else
      return this.graph.addOverlay(e, i);
  }
  render() {
    this.#u.render();
  }
  draw(e = this.range, i = !0) {
    this.#u.draw(e, i);
  }
  hideCursorTime() {
    this.#u.overlays.list.get("cursor").layer.visible = !1, this.render();
  }
  showCursorTime() {
    this.#u.overlays.list.get("cursor").layer.visible = !0, this.render();
  }
  hideJump(e) {
    this.#s.theme?.time?.navigation === !1 && (this.#c.style.visibility = "hidden");
  }
  showJump(e) {
    this.#c.style.visibility = "visible", this.hideCursorTime();
  }
}
const Zh = {
  renderQ: new Et(),
  rendered: [],
  renderLog: !1,
  dropFrames: !0,
  graphs: [],
  range: {},
  init: function(r) {
    E(r) && (this.renderLog = r?.renderLog || !1, this.dropFrames = r?.dropFrames || !0, this.graphs = P(r?.graphs) ? [...r.graphs] : [], this.range = E(r?.range) ? r.range : {});
  },
  queueFrame: function(r = this.range, e = this.graphs, i = !1) {
    this.renderQ.size > 1 && this.dropFrames && this.dropFrame();
    const s = Date.now();
    return r = r.snapshot(), this.renderQ.set(s, { graphs: e, range: r, update: i }), s;
  },
  dropFrame: function(r = -1) {
    r === -1 && (r = this.renderQ.lastKey()), this.renderQ.size > 1 && this.renderQ.has(r) && this.renderQ.delete(r);
  },
  getFrame: function(r = 0) {
    return this.renderQ.has(r) ? this.renderQ.get(r) : this.renderQ.firstValue();
  },
  frameDone: function() {
    if (this.renderQ.size === 0)
      return;
    const r = this.renderQ.firstKey();
    this.renderLog && this.rendered.push([r, Date.now()]), this.renderQ.delete(r);
  },
  start: function() {
    requestAnimationFrame(this.execute.bind(this));
  },
  execute: function() {
    if (requestAnimationFrame(this.execute.bind(this)), this.renderQ.size === 0)
      return;
    const [r, e] = this.renderQ.firstEntry();
    if (e.range?.snapshot) {
      for (let i of e.graphs)
        z(i.draw) && i.draw(e.range, e.update);
      for (let i of e.graphs)
        z(i.render) && i.render();
      this.frameDone();
    }
  }
}, di = Zh, er = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select"
];
class Qh {
  #t;
  #e;
  #n;
  #r;
  #i;
  #s;
  #l;
  #a = [];
  #h;
  #o = {};
  #c;
  #u;
  #d = null;
  constructor(e, i) {
    this.#t = e, this.#e = i, this.#n = i.core, this.#r = i.core.theme.legend, this.init(), this.eventsListen();
  }
  get elTarget() {
    return this.#t;
  }
  get list() {
    return this.#o;
  }
  set collapse(e) {
    this.setCollapse(e);
  }
  get collapse() {
    return this.#l;
  }
  destroy() {
    this.#n.off("chart_pan", this.primaryPanePan), this.#n.off("chart_panDone", this.primaryPanePanDone);
    for (let e in this.#o)
      e !== "collapse" && this.remove(e);
    this.#t.remove();
  }
  eventsListen() {
    this.#n.on("chart_pan", this.primaryPanePan.bind(this)), this.#n.on("chart_panDone", this.primaryPanePanDone.bind(this));
  }
  init() {
    const e = this.#t.legends;
    this.#s = e.querySelector(".controls"), this.#l = e.querySelectorAll(".control"), this.#c = e.querySelector("#showLegends"), this.#u = e.querySelector("#hideLegends"), this.#s.style.display = "none", this.icons(this.#l, { id: "collapse", parent: this }), this.#t.legends.classList.add("hide"), this.#d = "hide", this.collapse = "show";
  }
  onMouseClick(e) {
    const i = (s) => S(s.dataset.icon) ? { id: s.id, icon: s.dataset.icon, parent: s.parentElement } : s.parentElement.className !== "controls" ? i(s.parentElement) : !1;
    return i(e);
  }
  onMouseOver(e) {
  }
  onLegendAction(e) {
    const i = this.onMouseClick(e.currentTarget);
    this.setCollapse(i.icon);
  }
  setCollapse(e) {
    e === "show" && this.#d !== "show" ? (this.#d = e, this.#c.style.display = "none", this.#u.style.display = "inline-block", this.#t.legends.classList.toggle("hide")) : e === "hide" && this.#d !== "hide" && (this.#d = e, this.#c.style.display = "inline-block", this.#u.style.display = "none", this.#t.legends.classList.toggle("hide"));
  }
  primaryPanePan() {
    for (let e of er)
      this.#t.style.setProperty(e, "none");
  }
  primaryPanePanDone() {
    for (let e of er)
      this.#t.style.removeProperty(e);
  }
  add(e) {
    if (!E(e) || !("title" in e))
      return !1;
    const i = () => {
      this.#n.error("ERROR: Legend parent missing!");
    };
    e.id = e?.id || Z("legend"), e.type = e?.type || "overlay", e.parent = e?.parent || i;
    const s = this.elTarget.buildLegend(e, this.#n.theme);
    this.#t.legends.insertAdjacentHTML("beforeend", s);
    const n = this.#t.legends.querySelector(`#legend_${e.id}`);
    return this.#h = n.querySelectorAll(".control"), this.#o[e.id] = {
      el: n,
      type: e.type,
      source: e?.source,
      click: []
    }, this.icons(this.#h, e), e.type == "indicator" && (this.#s.style.display = "block", !e.parent.primaryPane && Object.keys(this.#o).length < 3 && (this.#s.style.display = "none")), e.id;
  }
  remove(e) {
    if (!(e in this.#o) || this.#o[e].type === "chart")
      return !1;
    this.#o[e].el.remove();
    for (let i of this.#o[e].click)
      i.el.removeEventListener("click", i.click);
    return delete this.#o[e], Object.keys(this.#o).length < 2 && (this.#s.style.display = "none"), !0;
  }
  update(e, i) {
    if (!E(i) || !(e in this.#o) || this.#n.range.data.length == 0)
      return !1;
    let s = this.#o[e].source(i.pos);
    const n = this.#t.buildInputs(s);
    this.#t.legends.querySelector(`#legend_${e} dl`).innerHTML = n;
  }
  icons(e, i) {
    let s;
    for (let n of e) {
      let o = n.querySelector("svg");
      o.style.width = `${this.#r.controlsW}px`, o.style.height = `${this.#r.controlsH}px`, o.style.fill = `${this.#r.controlsColour}`, o.onpointerover = (a) => a.currentTarget.style.fill = this.#r.controlsOver, o.onpointerout = (a) => a.currentTarget.style.fill = this.#r.controlsColour, s = i.parent.onLegendAction.bind(i.parent), i.id === "collapse" ? this.#a.push({ el: n, click: s }) : this.#o[i.id].click.push({ el: n, click: s }), n.addEventListener("click", s);
    }
  }
}
const ns = {
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(r) {
        this.context.origin.cursor = "crosshair";
      },
      onExit(r) {
      },
      on: {
        xAxis_scale: {
          target: "xAxis_scale",
          action(r) {
          }
        },
        chart_yAxisRedraw: {
          target: "chart_yAxisRedraw",
          action(r) {
          }
        },
        chart_tool: {
          target: "chart_tool",
          action(r) {
          }
        },
        tool_activated: {
          target: "tool_activated",
          action(r) {
            this.context.origin.cursor = "default";
          }
        }
      }
    },
    xAxis_scale: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        Idle: {
          target: "idle",
          action(r) {
          }
        }
      }
    },
    chart_yAxisRedraw: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        always: {
          target: "idle",
          condition: "yAxisRedraw",
          action(r) {
            this.context.origin.drawGrid();
          }
        }
      }
    },
    tool_activated: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        tool_targetSelected: {
          target: "idle",
          condition: "toolSelectedThis",
          action(r) {
            console.log("tool_targetSelected:", r);
          }
        }
      }
    }
  },
  guards: {
    priceMaxMin() {
      return !0;
    },
    toolSelectedThis(r, e) {
      return this.eventData === this.context;
    },
    yAxisRedraw() {
      return !0;
    },
    zoomDone() {
      return !0;
    }
  }
}, Jh = {
  id: "scale",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(r) {
        this.context.origin.cursor = "ns-resize";
      },
      onExit(r) {
      },
      on: {
        resize: {
          target: "resize",
          action(r) {
          }
        },
        yAxis_scale: {
          target: "scale",
          action(r) {
          }
        },
        yAxis_inc: {
          target: "incremental",
          action(r) {
          }
        },
        yAxis_log: {
          target: "logarithmic",
          action(r) {
          }
        },
        yAxis_100: {
          target: "percentual",
          action(r) {
          }
        },
        setRange: {
          target: "setRange",
          action(r) {
          }
        }
      }
    },
    resize: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        someEvent: {
          target: "",
          action(r) {
          }
        }
      }
    },
    setRange: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        always: {
          target: "idle",
          condition: "zoomDone",
          action(r) {
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
class tc extends V {
  #t = [0, 0];
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    if (!this.parent.parent.cursorActive)
      return;
    const e = this.target.viewport.container.getBoundingClientRect();
    let i = this.core.mousePos.y - e.top, s = this.parent.yPos2Price(i), n = this.parent.nicePrice(s), o = {
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
    }, a = o.fontSize + o.paddingTop + o.paddingBottom, h = i - a * 0.5;
    const l = this.scene.context;
    this.scene.clear(), l.save(), l.fillStyle = o.bakCol, l.fillRect(1, h, this.width, a), ve(l, `${n}`, 1, h, o), l.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
class ec extends V {
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context, i = this.yAxis, s = this.yAxis.calcGradations() || [], n = this.theme.yAxis, o = X(n.tickMarker) ? n.tickMarker : !0;
    let a = [], h;
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
    for (let l of s)
      h = i.$2Pixel(l[0]), e.fillText(l[0], i.yAxisTicks + 5, h + n.fontSize * 0.3), o && (e.beginPath(), e.moveTo(a[0], h), e.lineTo(a[1], h), e.stroke());
    e.restore();
  }
}
class ic extends V {
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context;
    this.yAxis.yAxis, this.scene.clear(), e.save(), e.restore();
  }
}
class sc extends V {
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (e === void 0)
      return;
    const i = this.scene.context, s = this.core.stream instanceof he && this.config.stream.tfCountDown;
    let n = e[4], o = this.parent.nicePrice(n), a = {
      fontSize: Pt.FONTSIZE * 1.05,
      fontWeight: Pt.FONTWEIGHT,
      fontFamily: Pt.FONTFAMILY,
      txtCol: "#FFFFFF",
      bakCol: Pt.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }, h = 0, l = $i(a), g = this.parent.yPos(n) - l * 0.5;
    this.scene.clear(), i.save(), e[4] >= e[1] ? a.bakCol = this.theme.candle.UpBodyColour : a.bakCol = this.theme.candle.DnBodyColour, ve(i, o, h, g, a), s && (o = this.core.stream.countDownUpdate(), a.fontSize = a?.fontSize / 1.1, ve(i, o, h, g + l, a)), i.restore(), this.viewport.render();
  }
}
const nc = [
  ["labels", { class: ec, fixed: !0, required: !0 }],
  ["overlay", { class: ic, fixed: !0, required: !0 }],
  ["price", { class: sc, fixed: !0, required: !0 }],
  ["cursor", { class: tc, fixed: !0, required: !0 }]
];
class rc {
  #t;
  #e = "Y Scale Axis";
  #n = "scale";
  #r;
  #i;
  #s;
  #l;
  #a;
  #h;
  #o;
  #c;
  #u;
  #d;
  #f;
  #m;
  #y;
  #S = new Et();
  #v = [];
  #p;
  #w;
  #O;
  #g;
  #P = {};
  constructor(e, i) {
    this.#r = e, this.#i = { ...i }, this.#c = this.#i.elScale, this.#a = this.#i.chart, this.#s = this.#i.parent, this.id = `${this.#s.id}_scale`, this.init();
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
    this.#t = Nt(e);
  }
  get id() {
    return this.#t ? `${this.#t}` : `${this.#r.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#e;
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
    return this.#c.getBoundingClientRect().height;
  }
  get width() {
    return this.#c.getBoundingClientRect().width;
  }
  get element() {
    return this.#c;
  }
  set cursor(e) {
    this.#c.style.cursor = e;
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
    return this.#m;
  }
  get yAxis() {
    return this.#o;
  }
  set yAxisType(e) {
    this.#o.yAxisType = YAXIS_TYPES.includes(e) ? e : YAXIS_TYPES[0];
  }
  get yAxisType() {
    return this.#o.yAxisType;
  }
  get yAxisHeight() {
    return this.#o.height;
  }
  get yAxisRatio() {
    return this.#o.yAxisRatio;
  }
  get yAxisGrads() {
    return this.#o.yAxisGrads;
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
    return D.elementDimPos(this.#c);
  }
  get theme() {
    return this.#r.theme;
  }
  get config() {
    return this.#r.config;
  }
  set scaleRange(e) {
    this.setScaleRange(e);
  }
  set rangeMode(e) {
    this.#o.mode = e;
  }
  get rangeMode() {
    return this.#o.mode;
  }
  set rangeYFactor(e) {
    this.core.range.yFactor(e);
  }
  set yOffset(e) {
    this.#o.offset = e;
  }
  get yOffset() {
    return this.#o.offset;
  }
  set stateMachine(e) {
    this.#l = new Bt(e, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get Scale() {
    return this;
  }
  init() {
    this.#u = this.#c.viewport || this.#c;
  }
  start() {
    const e = this.#s.name == "Chart" ? void 0 : this.#s.localRange;
    this.#o = new xi(this, this, this.options.yAxisType, e), this.createGraph(), this.#o.calcGradations(), this.draw(), this.eventsListen();
    const i = ct(Jh);
    i.id = this.id, i.context = this, this.stateMachine = i, this.stateMachine.start();
  }
  restart() {
    this.#o.setRange(this.#r.range), this.draw();
  }
  destroy() {
    this.stateMachine.destroy(), this.#p.destroy(), this.#w.destroy(), this.off(`${this.#s.id}_mousemove`, this.onMouseMove), this.off(`${this.#s.id}_mouseout`, this.#y.erase), this.off(kt, this.onStreamUpdate), this.element.remove();
  }
  eventsListen() {
    let e = this.#p.viewport.scene.canvas;
    this.#w = new Rt(e, { disableContextMenu: !1 }), this.#w.setCursor("ns-resize"), this.#w.on("pointerdrag", this.onDrag.bind(this)), this.#w.on("pointerdragend", this.onDragDone.bind(this)), this.#w.on("wheel", this.onMouseWheel.bind(this)), this.#w.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.#s.id}_mousemove`, this.onMouseMove, this), this.on(`${this.#s.id}_mouseout`, this.#y.erase, this.#y), this.on(kt, this.#m.draw, this.#m);
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
    this.#g = P(e) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)], this.#y.draw(this.#g);
  }
  onDrag(e) {
    this.#g = [
      Math.floor(e.position.x),
      Math.floor(e.position.y),
      e.dragstart.x,
      e.dragstart.y,
      e.movement.x,
      e.movement.y
    ], this.setScaleRange(Math.sign(e.movement.y)), this.render();
  }
  onDragDone(e) {
  }
  onMouseWheel(e) {
    e.domEvent.preventDefault(), this.setScaleRange(Math.sign(e.wheeldelta) * -1), this.render();
  }
  onStreamUpdate(e) {
  }
  onChartDrag(e) {
    this.#o.mode === "manual" && (this.#o.offset = e.domEvent.srcEvent.movementY, this.parent.draw(this.range, !0), this.draw());
  }
  setHeight(e) {
    this.#c.style.height = `${e}px`;
  }
  setDimensions(e) {
    const i = this.#c.getBoundingClientRect().width;
    this.setHeight(e.h), this.graph instanceof ye && (this.#p.setSize(i, e.h, i), this.draw());
  }
  setScaleRange(e = 0) {
    this.#o.mode == "automatic" && (this.#o.mode = "manual"), this.#o.zoom = e, this.parent.draw(this.range, !0), this.draw();
  }
  resetScaleRange() {
    this.#o.mode = "automatic", this.parent.draw(this.range, !0), this.draw();
  }
  yPos(e) {
    return this.#o.yPos(e);
  }
  yPosStream(e) {
    return this.#o.lastYData2Pixel(e);
  }
  yPos2Price(e) {
    return this.#o.yPos2Price(e);
  }
  nicePrice(e) {
    let i = this.#o.countDigits(e);
    return this.#o.limitPrecision(i);
  }
  createGraph() {
    let e = ct(nc);
    this.graph = new ye(this, this.#u, e, !1), this.#y = this.graph.overlays.get("cursor").instance, this.#d = this.graph.overlays.get("labels").instance, this.#f = this.graph.overlays.get("overlay").instance, this.#m = this.graph.overlays.get("price").instance, this.graph.addOverlays(this.#v), this.#m.target.moveTop(), this.#y.target.moveTop();
  }
  addOverlays(e) {
    if (!P(e))
      return !1;
    this.graph === void 0 ? this.#v.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!E(i))
      return !1;
    if (this.graph === void 0)
      this.#v.push([e, i]);
    else {
      let s = this.graph.addOverlay(e, i);
      return this.#m.target.moveTop(), this.#y.target.moveTop(), s;
    }
  }
  render() {
    this.#p.render();
  }
  draw(e = this.range, i = !0) {
    this.#p.draw(e, i), this.#s.drawGrid();
  }
  resize(e = this.width, i = this.height) {
    this.setDimensions({ w: e, h: i });
  }
}
class oc {
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
class ac extends V {
  #t;
  #e;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#t = new oc(e.scene, n), this.theme.volume.Height = $(n?.volume?.Height, 0, 100) || 100;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e = this.core.range) {
    this.scene.clear();
    const i = e.data, s = this.scene.height, n = this.xAxis.smoothScrollOffset || 0;
    let o = Math.max(this.xAxis.candleW - 1, 1);
    o < 3 ? o = 1 : o < 5 ? o = 3 : o > 5 && (o = Math.ceil(o * 0.8));
    const a = {
      x: 0 + n - this.xAxis.candleW,
      w: o,
      z: s
    }, h = Math.floor(s * this.theme.volume.Height / 100);
    let l = this.core.rangeScrollOffset, g = e.indexStart - l, p = e.Length + l * 2, v = p, b = g, L, O = 0;
    for (; v--; )
      L = e.value(b), L[4] !== null && (O = L[5] > O ? L[5] : O), b++;
    for (; p--; )
      L = e.value(g), a.x = lt(this.xAxis.xPos(L[0]) - o / 2), L[4] !== null && (a.h = h - h * ((O - L[5]) / O), a.raw = i[g], this.#t.draw(a)), g++;
  }
}
class Wr {
  areaCoordinates = [];
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = i;
  }
  draw(e) {
    const i = this.ctx, s = e.raw[4] >= e.raw[1], n = s ? this.cfg.candle.UpBodyColour : this.cfg.candle.DnBodyColour, o = s ? this.cfg.candle.UpWickColour : this.cfg.candle.DnWickColour;
    switch (this.cfg.candle.Type) {
      case K.CANDLE_SOLID:
        this.fill = !0;
        break;
      case K.CANDLE_HOLLOW:
      case K.OHLC:
        this.fill = !1;
        break;
      case K.CANDLE_UP_HOLLOW:
        this.fill = !s;
        break;
      case K.CANDLE_DOWN_HOLLOW:
        this.fill = s;
    }
    let a = Math.max(e.w - 1, 1);
    a < 3 ? a = 1 : a < 5 ? a = 3 : a > 5 && (a = Math.ceil(a * 0.8));
    let h = Math.max(Math.floor(a * 0.5), 1), l = Math.abs(e.o - e.c), g = e.c === e.o ? 1 : 2, p = e.x, v = Math.floor(p) - 0.5;
    if (i.save(), i.strokeStyle = o, i.beginPath(), i.moveTo(v, Math.floor(e.h)), this.cfg.candle.Type === K.OHLC ? i.lineTo(v, Math.floor(e.l)) : s ? (i.lineTo(v, Math.floor(e.c)), i.moveTo(v, Math.floor(e.o))) : (i.lineTo(v, Math.floor(e.o)), i.moveTo(v, Math.floor(e.c))), i.lineTo(v, Math.floor(e.l)), i.stroke(), a == 3) {
      i.fillStyle = o;
      let b = s ? 1 : -1;
      i.rect(
        Math.floor(p - h),
        e.c,
        Math.floor(h * 2),
        b * Math.max(l, g)
      ), i.fill(), i.stroke();
    } else if (a > 3 && this.fill) {
      i.fillStyle = n;
      let b = s ? 1 : -1;
      i.rect(
        Math.floor(p - h),
        e.c,
        Math.floor(h * 2),
        b * Math.max(l, g)
      ), i.fill(), i.stroke();
    } else if (a > 3 && !this.fill && this.cfg.candle.Type !== K.OHLC) {
      let b = s ? 1 : -1;
      i.rect(
        Math.floor(p - h),
        e.c,
        Math.floor(h * 2),
        b * Math.max(l, g)
      ), i.stroke();
    } else
      this.cfg.candle.Type === K.OHLC ? (i.beginPath(), i.moveTo(v - h, e.o), i.lineTo(v, e.o), i.moveTo(v, e.c), i.lineTo(v + h, e.c), i.stroke()) : (i.strokeStyle = o, i.beginPath(), i.moveTo(
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
    if (!P(e) || e.length == 0)
      return;
    let i = this.ctx, s = this.cfg.candle, n;
    Math.max(e[0].w - 1, 1), e[0].x;
    let o = [e[0].x, e[0].h];
    i.save(), i.strokeStyle = s.AreaLineColour || s.UpBodyColour || s.DnBodyColour, i.lineWidth = 1, i.beginPath(), i.moveTo(e[0].x, e[0].h);
    let a = 0;
    for (; a < e.length; )
      i.lineTo(e[a].x, e[a].h), a++;
    if (s?.Type == "area") {
      if (n = i.createLinearGradient(0, 0, 0, this.scene.height), P(s.AreaFillColour))
        for (let [h, l] of s.AreaFillColour.entries())
          n.addColorStop(h, l);
      else
        S() ? n = s.AreaFillColour : n = s.UpBodyColour || s.DnBodyColour;
      i.stroke(), i.lineTo(e[a - 1].x, this.scene.height), i.lineTo(o[0], this.scene.height), i.fillStyle = n, i.closePath(), i.fill();
    } else
      i.stroke();
    i.restore(), e.length = 0;
  }
}
class Fr extends V {
  #t;
  constructor(e, i = !1, s = !1, n, o) {
    super(e, i, s, n, o), this.#t = new Wr(e.scene, n);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e = this.core.range) {
    this.scene.clear();
    let i, s = this.theme.candle.Type;
    switch (s) {
      case K.AREA:
      case K.LINE:
        i = (p) => {
          this.#t.area({ ...p });
        };
        break;
      default:
        i = (p) => {
          this.#t.draw(p);
        };
        break;
    }
    const o = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let a = this.core.rangeScrollOffset, h = e.indexStart - a, l = e.Length + a * 2, g;
    for (this.core.stream && (this.core.stream.lastPriceMax = e.valueMax, this.core.stream.lastPriceMin = e.valueMin); l; ) {
      if (g = e.value(h), o.x = this.xAxis.xPos(g[0]), g?.[7]) {
        this.core.stream.lastXPos = o.x, this.core.stream.lastYPos = {
          o: o.o,
          h: o.h,
          l: o.l,
          c: o.c
        };
        break;
      }
      g[4] !== null && (o.o = this.yAxis.yPos(g[1]), o.h = this.yAxis.yPos(g[2]), o.l = this.yAxis.yPos(g[3]), o.c = this.yAxis.yPos(g[4]), o.raw = g, i(o)), h++, l--;
    }
    (s === K.AREA || s === K.LINE) && this.#t.areaRender();
  }
}
function Vr(r, e, i, s, n, o) {
  r.lineWidth = o?.width || Tt.borderWidth, r.strokeStyle = o?.border || Tt.stroke, r.beginPath(), r.rect(e, i, s, n), r.stroke();
}
function $s(r, e, i, s, n, o) {
  r.fillStyle = o?.fill || Tt.fill, r.fillRect(e, i, s, n);
}
function lc(r, e, i, s, n, o) {
  S(o.fill) && $s(r, e, i, s, n, o), T(o.width) && o.width > 0 && Vr(r, e, i, s, n, o);
}
function Gr(r, e, i, s, n, o, a) {
  r.lineWidth = a?.width || Tt.borderWidth, r.strokeStyle = a?.border || Tt.stroke, qr(r, e, i, s, n, o), r.stroke();
}
function Yr(r, e, i, s, n, o, a) {
  r.fillStyle = a?.fill || Tt.fill, qr(r, e, i, s, n, o), r.fill();
}
function qr(r, e, i, s, n, o) {
  r.beginPath(), r.moveTo(e + o, i), r.arcTo(e + s, i, e + s, i + n, o), r.arcTo(e + s, i + n, e, i + n, o), r.arcTo(e, i + n, e, i, o), r.arcTo(e, i, e + s, i, o), r.closePath();
}
function hc(r, e, i, s, n, o, a) {
  S(a.fill) && Yr(r, e, i, s, n, o, a?.fill), T(a.width) && a.width > 0 && Gr(r, e, i, s, n, o, a?.border, a?.width);
}
function Xr(r, e, i, s, n, o, a) {
  if (!(n < 3)) {
    var h = Math.PI * 2 / n;
    r.beginPath(), r.translate(e, i), r.rotate(o * Math.PI / 180), r.moveTo(s, 0);
    for (var l = 1; l < n; l++)
      r.lineTo(s * Math.cos(h * l), s * Math.sin(h * l));
    r.closePath(), we(r, a?.fill, a?.stroke, a?.width);
  }
}
function cc(r, e, i) {
  if (e.length > 0) {
    r.beginPath();
    var s = e[0];
    r.moveTo(s.x, s.y);
    for (var n = 1; n < e.length; ++n)
      s = e[n], r.lineTo(s.x, s.y);
    r.closePath(), we(r, i?.fill, i?.stroke, i?.width);
  }
}
function dc(r, e, i, s, n) {
  Xr(r, e, i, s, 3, n?.rotate || 0, n), we(r, n?.fill, n?.stroke, n?.width);
}
function uc(r, e, i, s, n, o) {
  r.beginPath(), r.moveTo(e - s / 2, i), r.lineTo(e, i - n / 2), r.lineTo(e + s / 2, i), r.lineTo(e, i + n / 2), r.closePath(), we(r, o?.fill, o?.stroke, o?.width);
}
function fc(r, e, i, s, n) {
  r.beginPath(), r.arc(e, i, s, 0, Math.PI * 2), r.closePath(), fillStroke(r, n?.fill, n?.stroke, n?.width);
}
function gc(r) {
  return r.ownerDocument && r.ownerDocument.defaultView && r.ownerDocument.defaultView.devicePixelRatio || 2;
}
function we(r, e, i, s) {
  S(e) && (r.fillStyle = e, r.fill()), T(s) && s > 0 && (r.lineWidth = s, r.strokeStyle = i || Tt.stroke, r.stroke());
}
function jr(r, e, i, s, n, o, a, h, l, g) {
  r.drawImage(e, i, s, n, o, a, h, l, g);
}
function Kr(r, e) {
  let i = r.naturalWidth || r.width, s = r.naturalHeight || r.height;
  return e === void 0 && (e = Zr(i, s)), e.ctx.drawImage(r, 0, 0), e;
}
const pc = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};
function De(r, e) {
  const i = Kr(e), s = i.ctx;
  return s.fillStyle = pc[r], s.globalCompositeOperation = "multiply", s.fillRect(0, 0, s.canvas.width, s.canvas.height), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), s.globalCompositeOperation = "source-over", i;
}
function mc(r) {
  return {
    red: De("red", r),
    green: De("green", r),
    blue: De("blue", r),
    alpha: De("alpha", r)
  };
}
function Zr(r, e) {
  const i = document.createElement("canvas");
  return i.ctx = i.getContext("2d"), i.width = r || i.ctx.canvas.width, i.height = e || i.ctx.canvas.height, i;
}
const st = {
  createCanvas: Zr,
  imageToCanvs: Kr,
  seperateRGB: mc,
  getChannel: De,
  getPixelRatio: gc,
  fillStroke: we,
  calcTextWidth: Br,
  createFont: qe,
  getTextRectHeight: $i,
  getTextRectWidth: Ni,
  renderImage: jr,
  renderText: Ur,
  renderTextBG: ve,
  renderPath: xe,
  renderPathStroke: yc,
  renderPathClosed: vc,
  renderSpline: wc,
  renderLine: Tc,
  renderLineHorizontal: Ve,
  renderLineVertical: xc,
  renderCircle: fc,
  renderRect: lc,
  renderRectFill: $s,
  renderRectStroke: Vr,
  renderRectRound: hc,
  renderRectRoundFill: Yr,
  renderRectRoundStroke: Gr,
  renderPolygonRegular: Xr,
  renderPolygonIrregular: cc,
  renderDiamond: uc,
  renderTriangle: dc
};
function xe(r, e, i, s) {
  r.save();
  const n = i.width || 1;
  r.lineWidth = n, n % 2 && r.translate(0.5, 0.5), r.strokeStyle = i.stroke, P(i.dash) && r.setLineDash(i.dash), r.beginPath();
  let o = !0;
  e.forEach((a) => {
    a && a.x !== null && (o ? (r.moveTo(a.x, a.y), o = !1) : r.lineTo(a.x, a.y));
  }), s(), r.restore();
}
function yc(r, e, i) {
  xe(r, e, i, () => {
    r.stroke();
  });
}
function vc(r, e, i) {
  xe(r, e, i, () => {
    r.closePath();
  }), we(r, opts?.fill, opts?.stroke, opts?.size);
}
function wc(r, e, i) {
  r.beginPath(), r.moveTo(e[0].x, e[0].y);
  for (var s = i ?? 1, n = 0; n < e.length - 1; n++) {
    var o = n > 0 ? e[n - 1] : e[0], a = e[n], h = e[n + 1], l = n != e.length - 2 ? e[n + 2] : h, g = a.x + (h.x - o.x) / 6 * s, p = a.y + (h.y - o.y) / 6 * s, v = h.x - (l.x - a.x) / 6 * s, b = h.y - (l.y - a.y) / 6 * s;
    r.bezierCurveTo(g, p, v, b, h.x, h.y);
  }
  r.stroke();
}
function Ve(r, e, i, s, n) {
  xe(r, [{ x: i, y: e }, { x: s, y: e }], n, () => {
    r.stroke(), r.closePath();
  });
}
function xc(r, e, i, s, n) {
  coords = [{ x: e, y: i }, { x: e, y, bottom: s }], xe(r, coords, n, () => {
    r.stroke(), r.closePath();
  });
}
function Tc(r, e, i) {
  xe(r, e, i, () => {
    r.stroke(), r.closePath();
  });
}
class Ec extends V {
  #t;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#t = new Wr(e.scene, n), this.theme.priceLineStyle = this.theme?.priceLineStyle || kh;
  }
  set position(e) {
    this.setPosition(e[0], e[1]);
  }
  setPosition(e, i) {
    this.core.stream !== void 0 && (this.target.setPosition(e, i), this.core.stream.lastScrollPos = this.core.scrollPos);
  }
  draw() {
    if (this.core.stream === void 0 || !P(this.chart.streamCandle))
      return;
    this.scene.clear();
    const e = this.core.range, i = this.chart.streamCandle, s = this.theme.candle.Type === K.AREA || this.theme.candle.Type === K.LINE ? (a) => {
      this.areaRender(a);
    } : (a) => {
      this.#t.draw(a);
    };
    this.xAxis.smoothScrollOffset;
    const o = {
      x: this.core.stream.lastXPos,
      w: this.xAxis.candleW
    };
    o.o = this.yAxis.yPos(i[1]), o.h = this.yAxis.yPos(i[2]), o.l = this.yAxis.yPos(i[3]), o.c = this.yAxis.yPos(i[4]), o.raw = i, e.inRenderRange(i[0]) && s(o), i[4] >= i[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, Ve(
      this.scene.context,
      o.c,
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
    }, o = this.scene.context, a = this.theme, h = a.candle.UpBodyColour || a.candle.DnBodyColour;
    Math.max(e.w - 1, 1), e.x;
    let l;
    if (o.save(), o.fillStyle = h, o.strokeStyle = h, o.lineWidth = 1, o.beginPath(), o.moveTo(e.x, e.c), o.lineTo(n.x, n.h), a.candle.Type === K.AREA) {
      if (l = o.createLinearGradient(0, 0, 0, this.scene.height), P(a.candle.AreaFillColour))
        for (let [g, p] of a.candle.AreaFillColour.entries())
          l.addColorStop(g, p);
      else
        isString() ? l = a.candle.AreaFillColour : l = a.candle.UpBodyColour || a.candle.DnBodyColour;
      o.stroke(), o.lineTo(n.x, this.scene.height), o.lineTo(e.x, this.scene.height), o.fillStyle = l, o.closePath(), o.fill();
    } else
      o.stroke();
    o.restore();
  }
}
const ke = {
  colour: "#4444cc88",
  wdith: 1,
  dash: [1, 0]
};
class Sc extends V {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const h = { class: bc, fixed: !0, required: !1 };
    this.core.config?.highLow === !0 && (this.scaleOverly = this.chart.scale.addOverlay("hiLo", h));
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw(e = this.core.range) {
    if (this.core.config?.highLow !== !0)
      return;
    this.scene.clear();
    let i, s, n, o = this.scene.width, a = 35, h = {};
    const l = e.valueHi, g = e.valueLo, p = { ...this.theme.yAxis }, v = this.scene.context;
    p.colourCursorBG = this.theme?.hilo?.colour || ke.colour, v.save(), v.strokeStyle = this.theme?.highLow?.colour || ke.colour, v.strokeWidth = this.theme?.highLow?.width || ke.width, v.setLineDash(this.theme?.highLow?.dash || ke.dash), n = this.yAxis.yPos(l), Ve(v, n, 0, o, h), i = "High", s = this.theme.yAxis.location == "left" ? 0 : o - (a + 25), Ai(v, i, s, n, a, p), n = this.yAxis.yPos(g), Ve(v, n, 0, o, h), i = "Low", Ai(v, i, s, n, a, p), v.restore();
  }
}
class bc extends V {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw(e = this.core.range) {
    this.scene.clear();
    let i, s, n, o;
    const a = e.valueHi, h = e.valueLo, l = { ...this.theme.yAxis }, g = this.scene.context;
    l.colourCursorBG = this.theme?.hilo?.colour || ke.colour, i = this.chart.Scale.nicePrice(a), s = 1, n = this.yAxis.yPos(a) + 1, o = this.viewport.width, Ai(g, i, s, n, o, l), i = this.chart.Scale.nicePrice(h), n = this.yAxis.yPos(h) + 1, Ai(g, i, s, n, o, l);
  }
}
function Ai(r, e, i, s, n, o) {
  let a = {
    fontSize: o.fontSize * 1.05,
    fontWeight: o.fontWeight,
    fontFamily: o.fontFamily,
    txtCol: o.colourCursor,
    bakCol: o.colourCursorBG,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
    width: n
  }, h = a.fontSize + a.paddingTop + a.paddingBottom, l = s - h * 0.5;
  r.save(), r.fillStyle = a.bakCol, r.fillRect(i, l, n, h), ve(r, `${e}`, i, l, a), r.restore();
}
class Cc {
  data;
  icon;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.events, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.icon = D.svgToImage(this.cfg.iconEvent, this.cfg.iconColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.icon, s = this.cfg, n = this.hit.getIndexValue(e.key), o = D.svgToImage(s.iconEvent, n, this.dims), a = $(e.w, s.iconMinDim, s.iconHeight), h = $(e.w, s.iconMinDim, s.iconWidth), l = this.data.x, g = this.data.y, p = this.ctx, v = this.ctxH;
    return p.save(), p.drawImage(i, l, g, h, a), p.restore(), v.save(), v.drawImage(o, l, g, h, a), v.restore(), { x: l, y: g, w: h, h: a, k: n };
  }
}
const Mc = {
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
class Pc extends V {
  #t;
  #e = [];
  #n;
  #r = (e) => xt(this.isNewsEventSelected, 100, this);
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#t = new Cc(e, n), this.emit(), this.core.on("primary_pointerdown", xt(this.isNewsEventSelected, 200, this), this), this.#n = this.core.WidgetsG.insert("Dialogue", Mc), this.#n.start();
  }
  destroy() {
    this.core.off("primary_pointerdown", this.#r);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get data() {
    return this.overlay.data;
  }
  isNewsEventSelected(e) {
    if (this.core.config?.events?.display === !1 || this.core.config?.events?.displayInfo === !1)
      return;
    const i = e[0], s = e[1], n = this.theme.events, o = $(this.xAxis.candleW, n.iconMinDim, n.iconHeight), a = this.xAxis.pixel2T(i), h = this.hit.getIntersection(i, s);
    if (h == -1)
      return;
    let l = Object.keys(this.data)[h] * 1, g = this.xAxis.xPos(a), p = this.scene.height - $(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, v = "";
    for (let L of this.data[l])
      v += this.buildNewsEventHTML(L);
    const b = {
      dimensions: { h: 150, w: 150 },
      position: { x: g + o / 2 + 1, y: p, relativeY: "bottom" },
      content: v
    };
    this.core.emit("event_selected", l), this.#n.open(b);
  }
  buildNewsEventHTML(e) {
    let i = e?.title, s = `<style>
    h1, p {display: inline-block; font-size: 0.9em;
    max-width: 98%;
    </style>`;
    return S(e?.url) && (i = `<a href="${e?.url}" target="${e?.target}">${i}</a>`), s += `<h1>${i}</h1>`, s += `<p>${e?.content}</p>`, s;
  }
  draw(e = this.core.range) {
    if (this.core.config?.events?.display === !1)
      return;
    this.hit.clear(), this.scene.clear(), this.#e.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.events, o = this.core.rangeScrollOffset, a = e.indexStart - o, h = e.Length + o * 2, l, g, p;
    for (; h; ) {
      if (l = e.value(a), g = `${l[0]}`, p = Object.keys(this.data).indexOf(g), p >= 0)
        for (let v of this.data[g])
          s.x = this.xAxis.xPos(l[0]) - this.xAxis.candleW / 2, s.y = this.scene.height - $(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.key = p, this.#e.push(this.#t.draw(s));
      a++, h--;
    }
  }
}
class Lc {
  data;
  buy;
  sell;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.trades, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.buy = D.svgToImage(this.cfg.iconBuy, this.cfg.buyColour, this.dims), this.sell = D.svgToImage(this.cfg.iconSell, this.cfg.sellColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.cfg, s = e.side === "buy" ? this.buy : this.sell, n = e.side === "buy" ? i.iconBuy : i.iconSell, o = this.hit.getIndexValue(e.key), a = D.svgToImage(n, o, this.dims), h = $(e.w, i.iconMinDim, i.iconHeight), l = $(e.w, i.iconMinDim, i.iconWidth), g = this.data.x, p = this.data.y, v = this.ctx, b = this.ctxH;
    return v.save(), v.drawImage(s, g, p, l, h), v.restore(), b.save(), b.drawImage(a, g, p, l, h), b.restore(), { x: g, y: p, w: l, h, k: o };
  }
}
const Ac = {
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
class Oc extends V {
  #t;
  #e = [];
  #n;
  #r;
  #i = (e) => xt(this.isTradeSelected, 100, this);
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#t = new Lc(e, n), this.emit(), this.core.on("primary_pointerdown", xt(this.isTradeSelected, 200, this), this), this.#r = this.core.WidgetsG.insert("Dialogue", Ac), this.#r.start();
  }
  destroy() {
    this.core.off("primary_pointerdown", this.#i);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get data() {
    return this.overlay.data;
  }
  isTradeSelected(e) {
    if (this.core.config?.trades?.display === !1 || this.core.config?.trades?.displayInfo === !1)
      return;
    const i = e[0], s = e[1], n = this.theme.trades, o = $(this.xAxis.candleW, n.iconMinDim, n.iconHeight), a = this.xAxis.pixel2T(i), h = this.core.range.valueByTS(a), l = this.hit.getIntersection(i, s);
    if (l == -1)
      return;
    let g = Object.keys(this.data)[l] * 1, p = this.xAxis.xPos(g), v = this.yAxis.yPos(h[2]) - o * 1.5, b = "";
    for (let O of this.data[g])
      b += this.buildTradeHTML(O);
    const L = {
      dimensions: { h: 150, w: 150 },
      position: { x: p + o / 2 + 1, y: v },
      content: b
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
    if (this.core.config?.trades?.display === !1)
      return;
    this.hit.clear(), this.scene.clear(), this.#e.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.trades, o = this.core.rangeScrollOffset, a = e.indexStart - o, h = e.Length + o * 2, l, g, p;
    for (; h; ) {
      if (l = e.value(a), g = `${l[0]}`, p = Object.keys(this.data).indexOf(g), p >= 0)
        for (let v of this.data[g])
          s.x = this.xAxis.xPos(l[0]) - this.xAxis.candleW / 2, s.y = this.yAxis.yPos(l[2]) - $(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.side = v.side, s.key = p, this.#e.push(this.#t.draw(s));
      a++, h--;
    }
  }
}
class Ic extends V {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.params.content = a?.content || "";
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw() {
    if (this.config?.watermark?.imgURL)
      D.isImage(this.config?.watermark?.imgURL, this.renderImage.bind(this));
    else if (S(this.config?.watermark?.text)) {
      this.scene.clear();
      const e = this.scene.context;
      e.save(), this.renderText(), e.restore();
    } else
      return;
  }
  renderText() {
    const e = this.core.config?.watermark?.fontSize, i = this.core.config?.watermark?.fontWeight, s = this.core.config?.watermark?.fontFamily, n = this.core.config?.watermark?.textColour, o = {
      fontSize: e || this.theme.watermark.FONTSIZE,
      fontWeight: i || this.theme.watermark.FONTWEIGHT,
      fontFamily: s || this.theme.watermark.FONTFAMILY,
      txtCol: n || this.theme.watermark.COLOUR
    }, a = this.config.watermark.text, h = this.scene.context;
    h.font = qe(o?.fontSize, o?.fontWeight, o?.fontFamily), h.textBaseline = "top", h.fillStyle = o.txtCol;
    const l = $i(o), g = Ni(h, a, o), p = (this.scene.width - g) / 2, v = (this.scene.height - l) / 2;
    h.fillText(a, p, v);
  }
  renderImage(e) {
    if (!e)
      return;
    const i = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT, s = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH, n = (this.scene.width - s) / 2, o = (this.scene.height - i) / 2;
    this.scene.clear();
    const a = this.scene.context;
    a.save(), jr(a, e, n, o, i, s), a.restore();
  }
}
const Dc = {
  primaryPane: [
    ["watermark", { class: Ic, fixed: !0, required: !0, params: { content: null } }],
    ["grid", { class: Li, fixed: !0, required: !0, params: { axes: "y" } }],
    ["volume", { class: ac, fixed: !1, required: !0, params: { maxVolumeH: mi.ONCHART_VOLUME_HEIGHT } }],
    ["candles", { class: Fr, fixed: !1, required: !0 }],
    ["hiLo", { class: Sc, fixed: !0, required: !1 }],
    ["stream", { class: Ec, fixed: !1, required: !0 }],
    ["cursor", { class: xs, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: Li, fixed: !0, required: !0, params: { axes: "y" } }],
    ["cursor", { class: xs, fixed: !0, required: !0 }]
  ]
}, ir = {
  primaryPane: {
    trades: { class: Oc, fixed: !1, required: !1 },
    events: { class: Pc, fixed: !1, required: !1 }
  },
  secondaryPane: {
    candles: { class: Fr, fixed: !1, required: !0 }
  }
}, bt = {
  id: "chart",
  title: "",
  type: "chart",
  source: () => {
  }
};
class ne {
  static #t = 0;
  static get cnt() {
    return ne.#t++;
  }
  #e;
  #n;
  #r;
  #i;
  #s;
  #l;
  #a;
  #h;
  #o;
  #c;
  #u = "idle";
  #d = {
    state: !1,
    height: null,
    rowsHeight: null,
    rowsCnt: 1
  };
  #f;
  #m;
  #y;
  #S;
  #v;
  #p;
  #w;
  #O;
  #g;
  #P;
  #C;
  #k;
  #M = new Et();
  #b = new Et();
  #E = [0, 0];
  #L = !1;
  #x;
  #T;
  #_;
  #I = {
    valueMax: 110,
    valueMin: -10,
    valueDiff: 120
  };
  #R = {};
  constructor(e, i) {
    if (this.#s = e, this.#o = ne.cnt, !E(i))
      return;
    this.#l = { ...i }, this.#n = this.#l.name, this.#r = this.#l.shortName, this.#i = this.#l.title, this.#c = this.#l.type == "primary" ? "primaryPane" : "secondaryPane", this.#C = this.#l.view, this.#m = this.#l.elements.elScale, this.#a = this.#l.parent, this.#f = this.#l.elements.elTarget, this.#f.id = this.id, this.legend = new Qh(this.elLegend, this), this.isPrimary ? (bt.type = "chart", bt.title = this.title, bt.parent = this, bt.source = this.legendInputs.bind(this), this.legend.add(bt), this.yAxisType = "default") : (bt.type = "secondary", bt.title = "", bt.parent = this, bt.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(bt), this.yAxisType = this.core.indicatorClasses[i.view[0].type].ind.scale);
    const s = { ...i };
    s.parent = this, s.chart = this, s.elScale = this.elScale, s.yAxisType = this.yAxisType, this.scale = new rc(this.core, s), this.#u = "init", this.log(`${this.name} instantiated`);
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
    this.#e = Nt(e);
  }
  get id() {
    return this.#e ? `${this.#e}` : `${this.#s.id}-${this.#n}_${this.#o}`.replace(/ |,|;|:|\.|#/g, "_");
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
    return this.#a;
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
  get collapsed() {
    return this.#d;
  }
  get isPrimary() {
    return this.#c === "primaryPane";
  }
  get isPrimary() {
    return this.#l.view.primary || !1;
  }
  get options() {
    return this.#l;
  }
  get element() {
    return this.#f;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#f);
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#f.getBoundingClientRect().width;
  }
  set height(e) {
    this.setHeight(e);
  }
  get height() {
    return this.#f.getBoundingClientRect().height;
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
    return this.#I;
  }
  get stream() {
    return this.#O;
  }
  get streamCandle() {
    return this.#P;
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
    this.#L = e;
  }
  get cursorActive() {
    return this.#L;
  }
  get cursorClick() {
    return this.#x;
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
    return this.#v.viewport.scene.canvas;
  }
  get elScale() {
    return this.#m;
  }
  get elLegend() {
    return this.#f.legend;
  }
  get elViewport() {
    return this.#f.viewport;
  }
  set layerWidth(e) {
    this.#v.layerWidth = e;
  }
  get layerWidth() {
    return this.#v.layerWidth;
  }
  set legend(e) {
    this.#p = e;
  }
  get legend() {
    return this.#p;
  }
  set time(e) {
    this.#S = e;
  }
  get time() {
    return this.#S;
  }
  set scale(e) {
    this.#y = e;
  }
  get scale() {
    return this.#y;
  }
  set yAxisType(e) {
    this.setYAxisType(e);
  }
  get yAxisType() {
    return this.#_;
  }
  get axes() {
    return "x";
  }
  set graph(e) {
    this.#v = e;
  }
  get graph() {
    return this.#v;
  }
  get view() {
    return this.#C;
  }
  get viewport() {
    return this.#v.viewport;
  }
  get layerGrid() {
    return this.#v.overlays.get("grid").layer;
  }
  get overlays() {
    return this.getOverlays();
  }
  get overlayGrid() {
    return this.#v.overlays.get("grid").instance;
  }
  get overlayTools() {
    return this.#b;
  }
  get overlaysDefault() {
    return Dc[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#R;
  }
  set stateMachine(e) {
    this.#h = new Bt(e, this);
  }
  get stateMachine() {
    return this.#h;
  }
  get Divider() {
    return this.#w;
  }
  get siblingPrev() {
    return this.sibling("prev");
  }
  get siblingNext() {
    return this.sibling("next");
  }
  start() {
    this.#S = this.#s.Timeline, this.createGraph(), this.#y.start(), this.draw(this.range), this.cursor = "crosshair", ns.id = this.id, ns.context = this, this.stateMachine = ns, this.stateMachine.start(), this.eventsListen();
    let e = { chartPane: this };
    this.#w = this.core.WidgetsG.insert("Divider", e), this.#w.start(), e = { title: "Chart Config", content: "config the chart" }, this.#g = this.core.WidgetsG.insert("ConfigDialogue", e), this.#g.start(), this.#u = "running";
  }
  destroy() {
    if (this.#u !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.stateMachine.destroy(), this.Divider.destroy(), this.#y.destroy(), this.#v.destroy(), this.#T.destroy(), this.legend.destroy(), this.off("main_mousemove", this.onMouseMove), this.off(Ne, this.onStreamListening), this.off(Ue, this.onStreamNewValue), this.off(kt, this.onStreamUpdate), this.off(Be, this.onStreamNewValue), this.off(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.off("chart_yAxisRedraw", this.onYAxisRedraw), this.element.remove(), this.#u = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting chart pane: ${this.id}`), this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#T = new Rt(this.#f, { disableContextMenu: !1 }), this.#T.on("pointerdrag", this.onChartDrag.bind(this)), this.#T.on("pointerdragend", this.onChartDragDone.bind(this)), this.#T.on("pointermove", this.onMouseMove.bind(this)), this.#T.on("pointerenter", this.onMouseEnter.bind(this)), this.#T.on("pointerout", this.onMouseOut.bind(this)), this.#T.on("pointerdown", this.onMouseDown.bind(this)), this.#T.on("pointerup", this.onMouseUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on(Ne, this.onStreamListening, this), this.on(Ue, this.onStreamNewValue, this), this.on(kt, this.onStreamUpdate, this), this.on(Be, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
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
    this.cursor = "grab", this.core.MainPane.onChartDrag(e), this.scale.onChartDrag(e);
  }
  onChartDragDone(e) {
    this.cursor = "crosshair", this.core.MainPane.onChartDragDone(e);
  }
  onMouseMove(e) {
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#E = [Math.round(e.position.x), Math.round(e.position.y)], this.#y.onMouseMove(this.#E), this.emit(`${this.id}_mousemove`, this.#E);
  }
  onMouseEnter(e) {
    this.core.MainPane.onPointerActive(this), this.#E = [Math.round(e.position.x), Math.round(e.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_mouseenter`, this.#E);
  }
  onMouseOut(e) {
    this.#L = !1, this.#E = [Math.round(e.position.x), Math.round(e.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_mouseout`, this.#E);
  }
  onMouseDown(e) {
    this.#s.pointerButtons[e.domEvent.srcEvent.button] = !0, this.#x = [Math.floor(e.position.x), Math.floor(e.position.y)], this.stateMachine.state === "tool_activated" ? this.emit("tool_targetSelected", { target: this, position: e }) : this.isPrimary && this.emit("primary_pointerdown", this.#x);
  }
  onMouseUp(e) {
    this.#s.pointerButtons[e.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(e) {
    this.#O !== e && (this.#O = e);
  }
  onStreamNewValue(e) {
    this.draw(this.range, !0);
  }
  onStreamUpdate(e) {
    this.isPrimary ? (this.#P = e, this.chartStreamCandle.draw(), this.layerStream.setPosition(this.core.stream.lastScrollPos, 0), this.updateLegends(this.cursorPos, e)) : this.updateLegends(), this.graph.render();
  }
  onYAxisRedraw() {
    this.isPrimary && this.refresh();
  }
  onDeleteIndicator(e) {
    this.removeIndicator(e.id);
  }
  setTitle(e) {
    if (!S(e))
      return !1;
    this.#i = e, bt.title = e;
    const i = this.legend.list.chart.el.querySelectorAll(".title");
    for (let s of i)
      s.innerHTML = e;
    return !0;
  }
  setWatermark(e) {
    S(e.text) || S(e) ? this.core.config.watermark.text = e : "imgURL" in e && (this.core.config.watermark.imgURL = e);
  }
  setHeight(e) {
    T(e) || (e = this.height || this.#a.height), this.#f.style.height = `${e}px`, this.#m.style.height = `${e}px`, this.elViewport.style.height = `${e}px`, this.#y.setDimensions({ w: null, h: e });
  }
  setDimensions(e) {
    const i = this.config.buffer || Ri;
    let { w: s, h: n } = e;
    s = this.width, n = n || this.height, this.setHeight(n), this.graph instanceof ye && (this.layerWidth = Math.round(s * ((100 + i) * 0.01)), this.graph.setSize(s, n, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.draw(void 0, !0), this.Divider.setPos());
  }
  setLocalRange(e, i) {
    if (!T(i) || !T(e))
      return !1;
    e > i && ([e, i] = [i, e]), this.#I = {
      valueMax: i,
      valueMin: e,
      valueDiff: i - e
    };
  }
  setYAxisType(e) {
    return !S(e) || !jt.includes(e) || this.type == "primaryPane" && e == "percent" ? !1 : (this.#_ = e, !0);
  }
  addOverlays(e) {
    if (!P(e) || e.length < 1)
      return !1;
    const i = [];
    for (let s of e) {
      const n = { fixed: !1, required: !1 };
      if (s.type in this.core.indicatorClasses)
        n.cnt = this.core.indicatorClasses[s.type].ind.cnt, n.id = `${this.id}-${s.type}_${n.cnt}`, n.class = this.core.indicatorClasses[s.type].ind;
      else if (s.type in ir[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = ir[this.type][s.type].class;
      else
        continue;
      n.params = { overlay: s }, s.id = n.id, s.paneID = this.id, i.push([s.id, n]);
    }
    return this.graph.addOverlays(i), !0;
  }
  getOverlays() {
    return Object.fromEntries([...this.#v.overlays.list]);
  }
  addIndicator(e) {
    const i = this.type === "primaryPane", s = this.core.indicatorClasses[e.type].ind, n = s.constructor.type === "both" ? i : s.prototype.primaryPane;
    if (e?.type in this.core.indicatorClasses && i === n) {
      e.paneID = this.id;
      const o = {
        class: s,
        params: { overlay: e }
      };
      return this.graph.addOverlay(e.name, o);
    } else
      return !1;
  }
  getIndicators() {
    const e = Object.keys(this.core.indicatorClasses), i = {};
    for (let [s, n] of Object.entries(this.overlays))
      if (e.includes(n.params?.overlay?.type)) {
        let o = n.id || n.instance.id;
        i[o] = n;
      }
    return i;
  }
  removeIndicator(e) {
    if (!S(e) || !(e in this.indicators))
      return !1;
    this.#R[e] = !0, this.indicators[e].instance.destroy(), this.graph.removeOverlay(e), this.draw(), Object.keys(this.indicators).length === 0 && !this.isPrimary && this.emit("destroyChartView", this.id), delete this.#R[e];
  }
  indicatorVisible(e, i) {
    return !S(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.visible(i);
  }
  indicatorSettings(e, i) {
    return !S(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.settings(i);
  }
  addTool(e) {
    let { layerConfig: i } = this.layerConfig(), s = new Fe.Layer(i);
    this.#M.set(e.id, s), this.#k.addLayer(s), e.layerTool = s, this.#b.set(e.id, e);
  }
  addTools(e) {
  }
  overlayTools() {
  }
  overlayToolAdd(e) {
    this.#b.set(e.id, e);
  }
  overlayToolDelete(e) {
    this.#b.delete(e);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.#s.scrollPos, 0), this.overlayGrid.draw("y"), this.#v.render();
  }
  refresh() {
    this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  legendsVisibility(e) {
    this.legend.setCollapse(e);
  }
  updateLegends(e = this.#E, i = !1) {
    if (!(this.#s.isEmpty || !E(this.#p)))
      for (const s in this.#p.list)
        this.#p.update(s, { pos: e, candle: i });
  }
  legendInputs() {
    const e = [!0, !0, !0, !0, !0], i = this.cursorPos, s = this.time.xPos2Index(i[0] - this.core.scrollPos), n = $(s, 0, this.range.data.length - 1), o = this.range.data[n], a = this.theme.candle, h = o[4] >= o[1] ? new Array(5).fill(a.UpWickColour) : new Array(5).fill(a.DnWickColour), l = {}, g = ["T", "O", "H", "L", "C", "V"];
    for (let p = 1; p < 6; p++)
      l[g[p]] = this.scale.nicePrice(o[p]);
    return { inputs: l, colours: h, labels: e };
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
      prevScaleEl: o,
      parentScaleEl: a,
      prevPane: h
    } = { ...this.currPrevNext() };
    return !E(i) || !E(o) ? !1 : (s.insertBefore(e, i), a.insertBefore(n, o), this.Divider.setPos(), h !== null && (h.Divider.setPos(), h.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), e.previousElementSibling === null && this.Divider.hide(), !0);
  }
  reorderDown() {
    const {
      el: e,
      nextEl: i,
      parentEl: s,
      scaleEl: n,
      nextScaleEl: o,
      parentScaleEl: a,
      nextPane: h
    } = { ...this.currPrevNext() };
    return !E(i) || !E(o) ? !1 : (s.insertBefore(i, e), a.insertBefore(o, n), this.Divider.setPos(), h !== null && (h.Divider.setPos(), this.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), i.previousElementSibling === null && h.Divider.hide(), !0);
  }
  createGraph() {
    let e = ct(this.overlaysDefault);
    this.graph = new ye(this, this.elViewport, e, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.#v.render(), this.#y.render();
  }
  draw(e = this.range, i = !1) {
    this.#v.draw(e, i);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.core.scrollPos, 0), this.overlayGrid.draw("y"), this.#v.render();
  }
  resize(e) {
    const i = this, s = this.sibling();
    if (s === null)
      return { active: null, prev: null };
    const n = this.core.MainPane.rowMinH, o = this.element.clientHeight, a = s.element.clientHeight;
    let h, l, g, p;
    return T(e) && e > n || (p = o + a, h = this.core.MainPane.cursorPos[5], l = o - h, g = a + h), l < n || g < n || p !== l + g || (i.setDimensions({ w: void 0, h: l }), s.setDimensions({ w: void 0, h: g }), i.Divider.setPos()), i.element.style.userSelect = "none", s.element.style.userSelect = "none", { active: i, prev: s };
  }
  collapse(e) {
    const i = this.graph.viewport.scene.canvas.style, s = this.#d, n = this.#y.graph.viewport.scene.canvas.style;
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
    const e = this.element, i = e.previousElementSibling, s = e.nextElementSibling, n = e.parentNode, o = this.scale.element, a = o.previousElementSibling, h = o.nextElementSibling, l = o.parentNode, g = i !== null ? this.core.ChartPanes.get(i.id) : null, p = s !== null ? this.core.ChartPanes.get(s.id) : null;
    return {
      el: e,
      prevEl: i,
      nextEl: s,
      parentEl: n,
      scaleEl: o,
      prevScaleEl: a,
      nextScaleEl: h,
      parentScaleEl: l,
      prevPane: g,
      nextPane: p
    };
  }
  sibling(e) {
    e = ["prev", "next"].includes(e) ? e : "prev";
    let i = [...this.core.ChartPanes.keys()], s = i.indexOf(this.id);
    return e == "prev" ? --s : ++s, this.#s.ChartPanes.get(i[s]) || null;
  }
  configDialogue() {
    const e = this.#g;
    e.state.name === "closed" && e.open();
  }
}
class _t extends V {
  static #t = 0;
  static get cnt() {
    return ++_t.#t;
  }
  #e;
  #n;
  #r;
  #i;
  #s;
  #l;
  #a;
  #h;
  #o;
  #c;
  #u;
  #d;
  #f;
  #m = [0, 0];
  #y;
  #S;
  #v = 2;
  #p = {};
  #w;
  #O;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, void 0, o, a), this.#n = V.cnt, this.#h = a, this.#o = a.overlay, this.#u = n.type, this.#c = n.indicator, this.#d = this.core.TALib, this.#f = this.xAxis.range, this.eventsListen();
  }
  get id() {
    return this.#e || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#n}`;
  }
  set id(e) {
    this.#e = Nt(e);
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
    return this.#h.overlay.paneID;
  }
  get primaryPane() {
    return this.#s;
  }
  set primaryPane(e) {
    this.#s = e;
  }
  get scaleOverlay() {
    return this.#l;
  }
  set scaleOverlay(e) {
    this.#l = e;
  }
  get plots() {
    return this.#a;
  }
  set plots(e) {
    this.#a = e;
  }
  get params() {
    return this.#h;
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
    return this.#o;
  }
  get legendID() {
    return this.#w;
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
  set setNewValue(e) {
    this.#y = e;
  }
  set setUpdateValue(e) {
    this.#S = e;
  }
  set precision(e) {
    this.#v = e;
  }
  get precision() {
    return this.#v;
  }
  set style(e) {
    this.#p = e;
  }
  get style() {
    return this.#p;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  set value(e) {
    const i = this.core.time.timeFrameMS;
    let s = Math.floor(new Date(e[yt.t]) / i) * i;
    e[yt.t] = s, this.#m[yt.t] !== e[yt.t] ? (this.#m[yt.t] = e[yt.t], this.#y(e)) : this.#S(e);
  }
  get value() {
    return this.#m;
  }
  destroy() {
    if (this.#O === "destroyed")
      return;
    if (!this.core.ChartPanes.get(this.chartPaneID).indicatorDeleteList[this.id]) {
      this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeIndicator()" instead.`);
      return;
    }
    this.off(kt, this.onStreamUpdate), this.chart.legend.remove(this.#w), this.#O = "destroyed";
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.emit(`${this.chartPaneID}_removeIndicator`, { id: this.id, paneID: this.chartPaneID });
  }
  visible(e) {
    return X(e) && (this.emit(`${this.chartPaneID}_visibleIndicator`, { id: this.id, paneID: this.chartPaneID, visible: e }), this.chartPane.indicators[this.id].layer.visible = e, this.draw()), this.chartPane.indicators[this.id].layer.visible;
  }
  settings(e) {
    return E(e) && (E(e?.config) && (this.params.overlay.settings = { ...this.params.overlay.settings, ...e.config }), E(e?.style) && (this.style = { ...this.style, ...e.style }), this.draw()), {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition
    };
  }
  eventsListen() {
    this.on(kt, this.onStreamUpdate, this);
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
    if (z(e?.fn)) {
      let i = C.fn(this);
      if (e?.own)
        return i;
    } else if (z(this.core.config.callbacks?.indicatorSettings?.fn)) {
      let i = this.core.config.callbacks.indicatorSettings.fn(this);
      if (this.core.config.callbacks?.indicatorSettings?.own)
        return i;
    }
    this.core.log(`invokeSettings: ${this.id}`);
  }
  defineIndicator(e, i) {
    E(e) || (e = {}), this.definition.output = i.outputs;
    const s = { ...this.definition.input, ...e };
    delete s.style;
    for (let n of i.options)
      if (n.name in s)
        if (typeof s[n.name] !== n.type) {
          s[n.name] = n.defaultValue;
          continue;
        } else
          "range" in n && (s[n.name] = $(s[n.name], n.range.min, n.range.max));
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
    this.#w = this.chart.legend.add(e);
  }
  legendInputs(e = this.chart.cursorPos) {
    const i = [this.style.stroke];
    let n = this.Timeline.xPos2Index(e[0]) - (this.range.data.length - this.overlay.data.length), o = $(this.overlay.data.length - 1, 0, 1 / 0);
    return n = $(n, 0, o), { c: n, colours: i };
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
      s.inReal.push(this.range.value(e)[yt.c]), s.open.push(this.range.value(e)[yt.o]), s.high.push(this.range.value(e)[yt.h]), s.low.push(this.range.value(e)[yt.l]), s.close.push(this.range.value(e)[yt.c]), s.volume.push(this.range.value(e)[yt.v]);
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
    if (!S(e) || !(e in this.TALib) || !E(s) || !this.core.TALibReady)
      return !1;
    i.timePeriod = i.timePeriod || this.definition.input.timePeriod;
    let n, o, a = i.timePeriod;
    if (s instanceof us)
      n = 0, o = s.dataLength - a + 1;
    else if ("indexStart" in s || "indexEnd" in s || "tsStart" in s || "tsEnd" in s)
      n = s.indexStart || this.Timeline.t2Index(s.tsStart || 0) || 0, o = s.indexEnd || this.Timeline.t2Index(s.tsEnd) || this.range.Length - 1;
    else
      return !1;
    if (o - n < a)
      return !1;
    let h = [], l, g, p, v;
    for (; n < o; ) {
      v = this.indicatorInput(n, n + a), i = { ...i, ...v }, p = this.TALib[e](i), g = [], l = 0;
      for (let b of this.definition.output)
        g[l++] = p[b.name][0];
      h.push([this.range.value(n + a - 1)[0], g]), n++;
    }
    return h;
  }
  calcIndicatorHistory() {
    const e = () => {
      let i = this.calcIndicator(this.libName, this.definition.input, this.range);
      i && (this.overlay.data = i);
    };
    this.core.TALibReady ? e() : this.core.talibAwait.push(e.bind(this));
  }
  calcIndicatorStream(e, i, s = this.range) {
    if (!this.core.TALibReady || !S(e) || !(e in this.TALib) || !(s instanceof us) || s.dataLength < this.definition.input.timePeriod)
      return !1;
    let n = this.TALib[e](i), o = s.dataLength, a = s.value(o)[0], h = [], l = 0;
    for (let g of this.definition.output)
      h[l++] = n[g.name][0];
    return [a, h];
  }
  newValue(e) {
    let i = this.TALibParams();
    if (!i)
      return !1;
    let s = this.calcIndicatorStream(this.libName, i);
    if (!s)
      return !1;
    this.overlay.data.push(s), this.target.setPosition(this.core.scrollPos, 0), this.draw(this.range);
  }
  updateValue(e) {
    let i = this.overlay.data.length - 1, s = this.TALibParams();
    if (!s)
      return !1;
    let n = this.calcIndicatorStream(this.libName, s);
    if (!n)
      return !1;
    this.overlay.data[i] = [n[0], n[1]], this.target.setPosition(this.core.scrollPos, 0), this.draw(this.range);
  }
  plot(e, i, s) {
    const n = this.scene.context, o = e;
    switch (n.save(), i) {
      case "renderLine":
        st[i](n, o, s);
        break;
      case "renderLineHorizontal":
        st[i](n, o[0], o[1], o[2], s);
        break;
      case "renderLineVertical":
        st[i](n, o[0], o[1], o[2], s);
        break;
      case "renderPathStroke":
        st[i](n, o, s.style, s);
        break;
      case "renderPathClosed":
        st[i](n, o, s);
        break;
      case "renderSpline":
        st[i](n, o, s);
        break;
      case "renderRect":
        st[i](n, o[0], o[1], o[2], o[3], s);
        break;
      case "renderRectRound":
        st[i](n, o[0], o[1], o[2], o[3], o[4], s);
        break;
      case "renderPolygonRegular":
        st[i](n, o[0], o[1], o[2], o[3], o[4], s);
        break;
      case "renderPolygonIrregular":
        st[i](n, o, s);
        break;
      case "renderTriangle":
        st[i](n, o[0], o[1], o[2], s);
        break;
      case "renderDiamond":
        st[i](n, o[0], o[1], o[2], o[3], s);
        break;
      case "renderCircle":
        st[i](n, o[0], o[1], o[2], s);
        break;
      case "renderImage":
        st[i](n, s.src, o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7]);
    }
    n.restore();
  }
  draw() {
  }
}
const rs = {
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        chart_paneMaximize: {
          target: "chart_paneMaximize",
          action(r) {
          }
        },
        chart_pan: {
          target: "chart_pan",
          action(r) {
          }
        },
        chart_scrollTo: {
          target: "chart_scrollTo",
          action(r) {
          }
        },
        setRange: {
          target: "setRange",
          action(r) {
          }
        },
        addIndicator: {
          target: "addIndicator",
          action(r) {
          }
        },
        divider_pointerdrag: {
          target: "divider_pointerdrag",
          action(r) {
            this.context.currCursor = this.context.origin.cursor, this.context.origin.cursor = "row-resize";
          }
        },
        global_resize: {
          target: "global_resize",
          action(r) {
          }
        }
      }
    },
    chart_paneMaximize: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        always: {
          target: "idle",
          action(r) {
            this.context.maximize = "some pane pointer";
          }
        }
      }
    },
    chart_pan: {
      onEnter(r) {
        this.context.origin.cursor = "grab";
      },
      onExit(r) {
      },
      on: {
        chart_pan: {
          target: "chart_pan",
          action(r) {
            this.context.origin.updateRange(r), this.context.origin.cursor = "grab";
          }
        },
        chart_panDone: {
          target: "idle",
          action(r) {
            this.context.origin.updateRange(r), this.context.origin.cursor = "default";
          }
        }
      }
    },
    setRange: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        always: {
          target: "idle",
          condition: "zoomDone",
          action(r) {
            this.context.origin.zoomRange(r);
          }
        }
      }
    },
    chart_scrollTo: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        always: {
          target: "idle",
          action(r) {
            this.context.origin.updateRange(r);
          }
        }
      }
    },
    addIndicator: {
      onEnter(r) {
        this.context.origin.addIndicator(r);
      },
      onExit(r) {
      },
      on: {
        addIndicatorDone: {
          target: "idle",
          action(r) {
          }
        }
      }
    },
    divider_pointerdrag: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        divider_pointerdrag: {
          target: "divider_pointerdrag",
          action(r) {
          }
        },
        divider_pointerdragend: {
          target: "idle",
          action(r) {
            this.context.origin.cursor = this.context.currCursor;
          }
        }
      }
    },
    global_resize: {
      onEnter(r) {
        this.context.origin.setDimensions();
      },
      onExit(r) {
      },
      on: {
        always: {
          target: "idle",
          condition: "resizeDone",
          action(r) {
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
      let r = this.context.pair.active, e = this.context.pair.prev;
      E(r) && r.element.style.removeProperty("user-select"), E(e) && e.element.style.removeProperty("user-select");
    }
  }
}, kc = [
  ["grid", { class: Li, fixed: !1, required: !0, params: { axes: "x" } }]
], Rc = ["candles", "trades", "events"];
class Qr {
  #t = "MainPane";
  #e = "Main";
  #n;
  #r;
  #i;
  #s;
  #l = !1;
  #a;
  #h;
  #o;
  #c;
  #u;
  #d;
  #f = {};
  #m;
  #y;
  #S;
  #v;
  #p;
  #w;
  #O;
  #g = new Et();
  #P;
  #C;
  #k;
  #M = [];
  #b = {
    instance: null,
    rowsH: 0,
    panes: {}
  };
  #E = Tn;
  #L = xn;
  #x = {};
  #T = [0, 0];
  #_ = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #I;
  #R;
  #B;
  #A;
  constructor(e, i) {
    this.#i = e, this.#n = i, this.#r = e, this.#h = this.#i.elMain, this.#a = this.#i.elYAxis, this.init(i);
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
    return this.#P;
  }
  get chartPanes() {
    return this.#g;
  }
  get chartPaneMaximized() {
    return this.#b;
  }
  get chartDeleteList() {
    return this.#M;
  }
  get time() {
    return this.#C;
  }
  get options() {
    return this.#n;
  }
  get element() {
    return this.#h;
  }
  get elRows() {
    return this.#h.rows;
  }
  get elPrimary() {
    return this.#h.rows.primary;
  }
  get elSecondary() {
    return this.#h.rows.secondary;
  }
  get elPanes() {
    return this.#h.rows.chartPanes;
  }
  get elPaneSlot() {
    return this.#h.rows.chartPaneSlot;
  }
  get width() {
    return this.#h.getBoundingClientRect().width;
  }
  get height() {
    return this.#h.getBoundingClientRect().height;
  }
  get chartW() {
    return this.elPrimary.getBoundingClientRect().width;
  }
  get chartH() {
    return this.elPrimary.getBoundingClientRect().height;
  }
  get rowsW() {
    return this.#o.getBoundingClientRect().width;
  }
  get rowsH() {
    return this.#o.getBoundingClientRect().height;
  }
  get rowMinH() {
    return this.#L;
  }
  set rowMinH(e) {
    T(e) && (this.#L = Math.abs(e));
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#h);
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
    return this.#T;
  }
  get candleW() {
    return this.#C.candleW;
  }
  get theme() {
    return this.#i.theme;
  }
  get config() {
    return this.#i.config;
  }
  get buffer() {
    return this.#I;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.#i.scrollPos;
  }
  set stateMachine(e) {
    this.#s = new Bt(e, this);
  }
  get stateMachine() {
    return this.#s;
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
  init(e) {
    if (this.#i, this.#R = this.#i.indicatorClasses, this.#o = this.#h.rows, this.#c = this.#h.time, this.#m = this.#h.rows.grid, this.#S = this.#h.viewport, this.#d = this.#i.elBody.scale, e.name = "Chart", e.shortName = "Chart", e.parent = this, e.chartData = this.#i.chartData, e.primaryPane = this.#i.primaryPane, e.secondaryPane = this.#i.secondaryPane, e.rangeLimit = this.#i.rangeLimit, e.settings = this.#i.settings, e.elements = {
      ...e.elements,
      ...this.elements
    }, this.#i.theme?.time?.navigation === !1) {
      const i = { height: Mi };
      this.#i.theme.time = { ...this.#i.theme?.time, ...i }, this.#o.style.height = `calc(100% - ${Mi}px)`;
    }
    this.#C = new Kh(this.#i, e), this.registerChartViews(e), this.#I = T(this.config.buffer) ? this.config.buffer : Ri, this.#L = T(this.config.rowMinH) ? this.config.rowMinH : xn, this.#E = T(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : Tn, this.rowsOldH = this.rowsH, this.log(`${this.#t} instantiated`);
  }
  start() {
    let e = 0;
    this.#h.start(this.theme), this.#C.start(), this.#g.forEach((i, s) => {
      i.start(e++), e === 1 && i.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.createGraph(), this.draw(this.range, !0), di.init({
      graphs: [this.#p],
      range: this.range
    }), di.start(), di.queueFrame(this.range, [this.#p], !1), this.eventsListen(), rs.id = this.id, rs.context = this, this.stateMachine = rs, this.stateMachine.start();
  }
  destroy() {
    this.#l = !0, this.stateMachine.destroy(), this.#C.destroy(), this.#g.forEach((e, i) => {
      this.#M[i] = !0, e.destroy(), delete this.#M[i];
    }), this.#p.destroy(), this.#A.destroy(), this.off(Be, this.onFirstStreamValue), this.off(Ue, this.onNewStreamValue), this.off("setRange", this.draw), this.off("scrollUpdate", this.draw), this.off("chart_render", this.draw), this.off("destroyChartView", this.removeChartPane);
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
    this.#o.tabIndex = 0, this.#o.focus(), this.#A = new Rt(this.#o, { disableContextMenu: !1 }), this.#A.on("keydown", this.onChartKeyDown.bind(this)), this.#A.on("keyup", this.onChartKeyUp.bind(this)), this.#A.on("wheel", this.onMouseWheel.bind(this)), this.#A.on("pointerenter", this.onMouseEnter.bind(this)), this.#A.on("pointerout", this.onMouseOut.bind(this)), this.#A.on("pointerup", this.onChartDragDone.bind(this)), this.#A.on("pointermove", this.onMouseMove.bind(this)), this.on(Be, this.onFirstStreamValue, this), this.on(Ue, this.onNewStreamValue, this), this.on("setRange", this.draw, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
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
      e.dragstart.x = this.#T[0], e.dragstart.y = this.#T[1], e.position.x = this.#T[0] + i, e.position.y = this.#T[1], this.onChartDrag(e);
      return;
    }
    const s = this.range, n = s.indexStart - Math.floor(i * fn * s.Length), o = s.indexEnd + Math.ceil(i * fn * s.Length);
    this.#i.setRange(n, o), this.draw(this.range, !0);
  }
  onMouseMove(e) {
    const i = this.#x;
    i.d2x = i?.d1x || null, i.d2y = i?.d1y || null, i.d1x = e.movement.x, i.d1y = e.movement.y, i.dx = Math.floor((i.d1x + i.d2x) / 2), i.dy = Math.floor((i.d1y + i.d2y) / 2), i.ts2 = i?.ts1 || null, i.ts1 = Date.now(), this.#T = [
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
    this.emit("main_mousemove", this.#T);
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
    const i = this.#_;
    i.active ? (i.delta = [
      e.position.x - i.prev[0],
      e.position.y - i.prev[1]
    ], i.prev = [
      e.position.x,
      e.position.y
    ]) : (i.active = !0, i.start = [e.dragstart.x, e.dragstart.y], i.prev = i.start, i.delta = [0, 0]), this.#T = [
      e.position.x,
      e.position.y,
      ...i.start,
      ...i.delta
    ], this.emit("chart_pan", this.#T);
  }
  onChartDragDone(e) {
    const i = this.#_;
    i.active = !1, i.delta = [0, 0], this.#T = [
      ...i.prev,
      ...i.start,
      ...i.delta
    ], this.emit("chart_panDone", this.#T);
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
    e && (e.cursorActive = !0, e.scale.layerCursor.visible = !0), e !== this.chart && (this.chart.cursorActive = !1, this.chart.scale.layerCursor.visible = !1, this.chart.scale.layerCursor.erase()), this.#g.forEach((i, s) => {
      e !== i && (i.cursorActive = !1, i.scale.layerCursor.visible = !1, i.scale.layerCursor.erase());
    });
  }
  setDimensions() {
    this.#o.previousDimensions();
    let e = this.#o.heightDeltaR, i = Math.round(this.chartH * e), s = this.rowsW, n = this.rowsH, o = Math.round(s * ((100 + this.#I) * 0.01)), a = {
      resizeH: e,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.#i.scrollPos = -1, this.#C.setDimensions({ w: s }), this.#p.setSize(s, n, o), this.#g.size == 1 && i != this.#o.height ? this.#P.setDimensions({ w: s, h: this.#o.height }) : this.#g.forEach((h, l) => {
      i = Math.round(h.viewport.height * e), h.setDimensions({ w: s, h: i }), h.Divider.setPos();
    }), this.rowsOldH = this.rowsH, this.draw(this.range, !0), this.emit("rowsResize", a);
  }
  getBufferPx() {
    let e = Math.round(this.width * this.buffer / 100), i = e % this.candleW;
    return e - i;
  }
  registerChartViews(e) {
    this.#o.previousDimensions();
    const i = this.validateIndicators();
    let s = i[0];
    for (let n of i)
      n?.primary === !0 ? s = n : n.primary = !1;
    s.primary = !0, e.rowY = 0;
    for (let [n, o] of this.views)
      e.type = n, e.view = o, this.addChartPane(e);
  }
  chartPanesState() {
    const e = {
      list: [...this.#g.values()],
      collapsed: [],
      expanded: [],
      maximized: this.#b.instance
    };
    for (let i of e.list)
      i.collapsed.state ? e.collapsed.push(i) : e.expanded.push(i);
    return e;
  }
  addChartPane(e) {
    const { expanded: i } = this.chartPanesState(), s = this.calcChartPaneHeights(), n = s.new;
    let o;
    for (o in s)
      if (this.#g.has(o)) {
        let g = this.#g.get(o);
        i.indexOf(g) > -1 && g.setDimensions({ w: this.rowsW, h: s[o] });
      }
    let a;
    this.#o.insertAdjacentHTML(
      "beforeend",
      this.#h.rowNode(e.type, this.#i)
    ), a = this.#o.chartPaneSlot.assignedElements().slice(-1)[0], a.style.height = `${n}px`, a.style.width = "100%";
    let h;
    this.#a.insertAdjacentHTML(
      "beforeend",
      this.scaleNode(e.type)
    ), h = this.#a.chartPaneSlot.assignedElements().slice(-1)[0], h.style.height = `${n}px`, h.style.width = "100%", e.elements.elTarget = a, e.elements.elScale = h;
    let l;
    return e.type == "primary" ? (l = new ne(this.#i, e), this.#P = l) : (e.name = e.view[0].name || "Secondary", e.shortName = e.view[0].type || "Secondary", l = new ne(this.#i, e)), this.setPaneDividers(), this.#g.set(l.id, l), this.emit("addChartView", l), l;
  }
  removeChartPane(e) {
    if (!S(e) || !this.#g.has(e))
      return !1;
    const i = this.#g.get(e);
    if (i.isPrimary)
      return this.#i.error(`Cannot remove primary chart pane! ${e}`), !1;
    this.#M[e] = !0;
    const { expanded: s } = this.chartPanesState();
    let n = s.indexOf(i);
    n > -1 && s.splice(n, 1);
    let o = i.viewport.height, a = Math.floor(o / s.length), h = o % a;
    if (i.status !== "destroyed" && i.destroy(), this.#g.delete(e), delete this.#M[e], this.#g.size === 1) {
      let l = this.#g.values().next().value;
      l.collapsed && (l.collapsed.state = !1), l.setDimensions({ w: void 0, h: this.rowsH });
    } else
      for (let l of s)
        o = l.viewport.height, l.setDimensions({ w: void 0, h: o + a + h }), h = 0;
    return this.setPaneDividers(), this.draw(this.range, !0), !0;
  }
  validateIndicators() {
    const e = [];
    for (let [i, s] of this.views) {
      if (i === "primary" && e.push(s), s.length === 0 && i !== "primary") {
        this.views.delete(i);
        continue;
      }
      for (const [n, o] of s.entries())
        E(o) && (o.type in this.core.indicatorClasses || Rc.includes(o.type)) || (this.#i.log(`indicator ${s.type} not added: not supported.`), s.splice(n, 1));
    }
    return e;
  }
  addIndicator(e, i = e, s = {}) {
    if (!S(e) && !(e in this.#R) && !S(i) && !E(s))
      return !1;
    this.log(`Adding the ${i} : ${e} indicator`), P(s?.data) || (s.data = []), E(s?.settings) || (s.settings = {});
    let n;
    if (this.#R[e].ind.primaryPane) {
      const o = {
        type: e,
        name: i,
        ...s
      };
      n = this.#P.addIndicator(o);
    } else {
      this.core.indicatorClasses[e].ind.primaryPane === "both" && X(e.primaryPane) && e.primaryPane, P(s.view) || (s.view = [{ name: i, type: e, ...s }]);
      for (let a = 0; a < s.view.length; a++)
        (!E(s.view[a]) || !Er(["name", "type"], Object.keys(s.view[a]))) && s.view.splice(a, 1);
      if (s.view.length == 0)
        return !1;
      s.parent = this, s.title = i, s.elements = { ...this.elements }, n = this.addChartPane(s), n.start();
    }
    return this.#i.refresh(), this.emit("addIndicatorDone", n), console.log("Added indicator:", n.id), n;
  }
  getIndicators() {
    const e = {};
    return this.#g.forEach(
      (i, s) => {
        e[s] = i.indicators;
      }
    ), e;
  }
  getIndicator(e) {
    if (!S(e))
      return !1;
    for (const i of this.#g.values())
      if (e in i.indicators)
        return i.indicators[e].instance;
  }
  removeIndicator(e) {
    if (S(e)) {
      for (const i of this.#g.values())
        if (e in i.indicators)
          return i.indicators[e].instance.remove(), !0;
    } else
      return e instanceof _t ? (e.remove(), !0) : !1;
  }
  indicatorSettings(e, i) {
    if (S(e)) {
      for (const s of this.#g.values())
        if (e in s.indicators)
          return s.indicators[e].instance.settings(i);
    } else
      return e instanceof _t ? e.settings(i) : !1;
  }
  calcChartPaneHeights() {
    const { collapsed: e, expanded: i } = this.chartPanesState(), s = this.#g.size + 1, n = this.#E * (s - 1), o = n / Math.log10(n * 2) / 100;
    Math.round(this.rowsH * o);
    const a = {};
    if (s === 1)
      a.new = this.rowsH;
    else if (s === 2 || i.length === 1) {
      let h;
      try {
        h = i[0].viewport.height;
      } catch {
        h = this.rowsH;
      }
      const l = Math.round(h * this.#E / 100);
      a[i[0].id] = h - l, a.new = l;
    } else if (i.length === 2) {
      const h = i[0].viewport.height, l = i[1].viewport.height, g = h + l, p = Math.round(g * this.#E / 100), v = g / (g + p);
      a[i[0].id] = Math.floor(h * v), a[i[1].id] = Math.floor(l * v), a.new = Math.floor(p * v), a.new += g - (a[i[0].id] + a[i[1].id] + a.new);
    } else if (i.length >= 3) {
      let h = this.rowsH, l = 0, g;
      for (let p of e)
        h -= p.viewport.height;
      a.new = Math.floor(h / (i.length + 1)), h / (h + a.new), g = h - a.new;
      for (let p of i)
        a[p.id] = g * (p.viewport.height / h), l += a[p.id];
      a.new += h - l;
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
    let e = ct(kc);
    this.#p = new ye(this, this.#S, e);
  }
  draw(e = this.range, i = !1) {
    const s = [
      this.#p,
      this.#C,
      this.#P
    ];
    this.time.xAxis.doCalcXAxisGrads(e), this.#g.forEach((n, o) => {
      s.push(n);
    }), di.queueFrame(
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
    if (!(e instanceof ne))
      return !1;
    const i = this.#b, s = e.legend.list.chart.el.querySelector(".controls");
    let n;
    if (s.classList.toggle("maximized"), s.classList.toggle("restored"), e === i.instance)
      this.panesRestore(), i.instance = null, i.panes = {}, e.collapsed.state && (e.graph.viewport.scene.canvas.style.display = "none", e.scale.graph.viewport.scene.canvas.style.visibility = "hidden");
    else {
      this.panesRestore(), i.instance = e, i.rowsH = this.rowsH;
      for (let [o, a] of this.#g.entries())
        i.panes[o] = a.element.clientHeight, n = a.element.style, e === a ? (n.display = "block", a.setDimensions({ w: void 0, h: this.rowsH }), a.Divider.setPos(), a.graph.viewport.scene.canvas.style.display = "block", a.scale.graph.viewport.scene.canvas.style.visibility = "visible") : n.display = "none";
      this.hidePaneDividers();
    }
    return !0;
  }
  panesRestore() {
    const e = this.#b;
    let i, s = 0;
    this.dimensions.height == e.height;
    for (let [n, o] of this.#g.entries())
      i = o.element.style, i.display = "block", n in e.panes && s++ > 0 && o.Divider.show(), o.setDimensions({ w: void 0, h: e.panes[n] }), o.Divider.setPos();
  }
  paneCollapse(e) {
    if (!(e instanceof ne))
      return !1;
    const i = e.legend.list.chart.el.querySelector(".controls"), s = e.collapsed;
    let n = e.element.clientHeight, o, a, h;
    const { list: l, collapsed: g, expanded: p } = this.chartPanesState();
    if (o = g.indexOf(e), o > -1 && g.splice(o, 1), o = p.indexOf(e), o > -1 && p.splice(o, 1), e.collapsed.state) {
      i.classList.remove("collapsed"), i.classList.add("expanded"), s.rowsCnt !== l.length ? n = s.height * (s.rowsCnt / l.length) : s.rowsHeight !== this.rowsH ? n = s.height * (s.rowsHeight / this.rowsH) : n = s.height, a = (n - ds) / p.length;
      for (let v of p)
        h = v.element.clientHeight - a, v.setDimensions({ w: void 0, h });
      e.collapse(n);
    } else {
      if (i.classList.add("collapsed"), i.classList.remove("expanded"), l.length < 2 || p.length < 1)
        return !1;
      n = (e.element.clientHeight - ds) / p.length;
      for (let v of p)
        h = v.element.clientHeight + n, v.setDimensions({ w: void 0, h });
      e.collapse();
    }
    return this.setPaneDividers(), !0;
  }
  setPaneDividers() {
    const { list: e } = this.chartPanesState();
    let i = 0;
    for (let s of e)
      s.Divider instanceof at && i++ > 0 && (s.Divider.setPos(), s.Divider.show());
  }
  hidePaneDividers() {
    const { list: e } = this.chartPanesState();
    for (let i of e)
      i.Divider instanceof at && i.Divider.hide();
  }
}
let yd = class Ti {
  static passive = new Ti("passive");
  static hover = new Ti("hover");
  static active = new Ti("active");
  constructor(e) {
    this.name = e;
  }
};
class Lt extends V {
  static #t = 0;
  static #e = {};
  static create(e, i) {
    const s = ++Lt.#t;
    i.cnt = s, i.modID = `${i.toolID}_${s}`, i.toolID = i.modID, i.target = e;
    const n = new i.tool(i);
    return Lt.#e[s] = n, e.chartToolAdd(n), n;
  }
  static destroy(e) {
    if (e instanceof Lt) {
      const i = e.inCnt;
      delete Lt.#e[i];
    }
  }
  #n;
  #r = null;
  #i = "";
  #s = "";
  #l;
  #a;
  #h;
  #o;
  #c;
  #u;
  #d;
  #f;
  #m;
  #y;
  #S = [0, 0];
  #v = !1;
  #p;
  #w = { TL: [0, 0], BR: [0, 0] };
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#a = config, this.#r = config.cnt, this.#n = this.#a.ID || Z("TX_Tool_"), this.#i = config.name, this.#h = config.core, this.#u = config.elements.elChart, this.#o = { ...config.parent }, this.#y = config.target, this.#y.addTool(this), this.#f = this.#m.viewport, this.#d = this.#f.scene.canvas, this.#p = config.pos;
  }
  set id(e) {
    this.#n = Nt(e);
  }
  get id() {
    return this.#n ? `${this.#n}` : `${this.#h.id}-${this.#s}_${this.#r}`.replace(/ |,|;|:|\.|#/g, "_");
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
    return this.#h;
  }
  get stateMachine() {
    return this.#h.stateMachine;
  }
  get state() {
    return this.#h.getState();
  }
  get data() {
    return this.#h.chartData;
  }
  get range() {
    return this.#h.range;
  }
  get target() {
    return this.#y;
  }
  set layerTool(e) {
    this.#m = e;
  }
  get layerTool() {
    return this.#m;
  }
  get elViewport() {
    return this.#f;
  }
  get cursorPos() {
    return this.#S;
  }
  get cursorActive() {
    return this.#v;
  }
  get cursorClick() {
    return this.#p;
  }
  get candleW() {
    return this.#h.Timeline.candleW;
  }
  get theme() {
    return this.#h.theme;
  }
  get config() {
    return this.#h.config;
  }
  get scrollPos() {
    return this.#h.scrollPos;
  }
  get bufferPx() {
    return this.#h.bufferPx;
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
    this.#c.off("mousemove", this.onPointerMove);
  }
  eventsListen() {
    this.#c = new Rt(this.#d, { disableContextMenu: !1 }), this.#c.on("pointermove", this.onPointerMove.bind(this));
  }
  on(e, i, s) {
    this.#h.on(e, i, s);
  }
  off(e, i) {
    this.#h.off(e, i);
  }
  emit(e, i) {
    this.#h.emit(e, i);
  }
  onPointerMove(e) {
    this.#S = [Math.round(e.position.x), Math.round(e.position.y)], this.emit("tool_pointermove", this.#S);
  }
  isVisible() {
  }
  draw() {
  }
}
class _c extends Lt {
  constructor(e) {
    super(e);
  }
}
class ui extends Lt {
  #t = sr.colour;
  #e = sr.width;
  #n;
  constructor(e) {
    super(e);
  }
  set colour(e = this.#t) {
    this.#t = e;
  }
  get colour() {
    return this.#t;
  }
  set lineWidth(e) {
    this.#e = T(e) ? e : this.#e;
  }
  get lineWidth() {
    return this.#e;
  }
  set stateMachine(e) {
    this.#n = new Bt(e, this);
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
class Nc extends Lt {
  constructor(e) {
    super(e);
  }
}
class $c extends Lt {
  constructor(e) {
    super(e);
  }
}
class Hc extends Lt {
  constructor(e) {
    super(e);
  }
}
const zc = [
  {
    id: "cursor",
    name: "Cursor",
    icon: Zl,
    event: "tool_activated"
  },
  {
    id: "line",
    name: "Line",
    icon: te,
    event: "tool_activated",
    class: ui,
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: te,
        event: "tool_activated",
        class: ui
      },
      {
        id: "hRay",
        name: "Horizontal Ray",
        icon: te,
        event: "tool_activated",
        class: ui
      },
      {
        id: "vRay",
        name: "Vertical Ray",
        icon: te,
        event: "tool_activated",
        class: ui
      }
    ]
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: Jl,
    event: "tool_activated",
    class: _c,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: te
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: eh,
    event: "tool_activated",
    class: $c,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: te
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: ih,
    event: "tool_activated",
    class: Hc,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: te
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: th,
    event: "tool_activated",
    class: Nc
  },
  {
    id: "delete",
    name: "Delete",
    icon: Ql,
    event: "tool_activated",
    class: void 0
  }
], sr = {
  colour: "#8888AACC",
  width: 1
}, os = {
  id: "template",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(r) {
        console.log("idle: onEnter");
      },
      onExit(r) {
        console.log("idle: onExit");
      },
      on: {
        tool_activated: {
          target: "tool_activated",
          action(r) {
            this.context.origin.onToolActivated(r);
          }
        },
        tool_selected: {
          target: "tool_selected",
          action(r) {
            this.context.origin.onToolSelected(r);
          }
        },
        tool_deselected: {
          target: "tool_deselected",
          action(r) {
            this.context.origin.onToolDeselected(r);
          }
        },
        tool_deleted: {
          target: "tool_deleted",
          action(r) {
            this.context.origin.onToolDeleted(r);
          }
        }
      }
    },
    tool_activated: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        tool_selected: {
          target: "tool_addToTarget",
          action(r) {
            this.context.origin.onToolTargetSelected(r);
          }
        }
      }
    },
    tool_selected: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {}
    },
    tool_deselected: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        always: {
          target: "idle",
          condition: "toolTarget",
          action(r) {
          }
        }
      }
    },
    tool_deleted: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        always: {
          target: "idle",
          condition: "toolTarget",
          action(r) {
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
class Jr {
  #t;
  #e = "Toolbar";
  #n = "tools";
  #r;
  #i;
  #s;
  #l;
  #a;
  #h = Lt;
  #o;
  #c = {};
  #u = void 0;
  #d;
  #f = { click: [], pointerover: [] };
  #m = [];
  constructor(e, i) {
    this.#r = e, this.#i = i, this.#l = e.elTools, this.#o = zc || e.config.tools, this.#a = e.WidgetsG, this.init();
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
    this.#t = Nt(e);
  }
  get id() {
    return this.#t ? `${this.#t}` : `${this.#r.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#e;
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
    return D.elementDimPos(this.#l);
  }
  set stateMachine(e) {
    this.#s = new Bt(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  init() {
    this.mount(this.#l), this.log(`${this.#e} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), os.id = this.id, os.context = this, this.stateMachine = os, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy();
    const e = this.#l.querySelectorAll(".icon-wrapper");
    for (let i of e)
      for (let s of this.#o)
        s.id === id && i.removeEventListener("click", this.#f[id].click), i.removeEventListener("pointerover", this.#f[id].pointerover), i.removeEventListener("pointerout", this.#f[id].pointerout);
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
    for (let e of this.#m)
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
    i.style.fill = Xt.COLOUR_ICON;
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = Xt.COLOUR_ICONHOVER;
  }
  onToolTargetSelected(e) {
    console.log("tool_targetSelected:", e.target), this.#d = e.target;
  }
  onToolActivated(e) {
    console.log("Tool activated:", e), this.#u = e;
  }
  onToolSelect(e) {
    console.log("Tool selected:", e);
  }
  onToolDeselect(e) {
    console.log("Tool deselected:", e);
  }
  mount(e) {
    e.innerHTML = this.#l.defaultNode(this.#o);
  }
  initAllTools() {
    const e = this.#l.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      let s = i.id, n = i.querySelector("svg");
      n.style.fill = Xt.COLOUR_ICON, n.style.width = "90%";
      for (let o of this.#o)
        if (o.id === s)
          if (this.#f[s] = {}, this.#f[s].click = this.onIconClick.bind(this), this.#f[s].pointerover = this.onIconOver.bind(this), this.#f[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#f[s].click), i.addEventListener("pointerover", this.#f[s].pointerover), i.addEventListener("pointerout", this.#f[s].pointerout), o?.sub) {
            let a = {
              content: o.sub,
              primary: i
            }, h = this.#a.insert("Menu", a);
            i.dataset.menu = h.id, h.start(), this.#m.push(h);
            for (let l of o.sub)
              this.#c[l.id] = l.class;
          } else
            this.#c[o.id] = o.class;
    }
  }
  addTool(e = this.#u, i = this.#d) {
    let s = {
      name: e,
      tool: this.#c[e],
      pos: i.cursorClick
    }, n = this.#h.create(i, s);
    return n.start(), console.log(n), n;
  }
  addNewTool(e, i) {
    let s = this.addTool(e, i);
    this.activeTool = s, this.emit("tool_active", s), this.emit(`tool_${s.id}_active`, s);
  }
  addAllTools() {
  }
}
const nr = 20, Bc = 20, Uc = new _r(_.COLOUR_BORDER), Ts = document.createElement("template");
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
    border: 1px solid var(--txc-time-scrollbar-color, ${_.COLOUR_BORDER});
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
    background-color: var(--txc-time-handle-color, ${Uc.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${nr}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${_.COLOUR_ICON});
    width: ${nr}px;
    height: ${Bc}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${_.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${ph}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${gh}</span>
</div>
`;
class Wc extends dt {
  #t;
  constructor() {
    super(Ts), this.#t = Ts;
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
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", Wc);
const to = document.createElement("template");
to.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${Mi}px;
  }
  tradex-overview {
    height: ${Or}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class Fc extends dt {
  constructor() {
    super(to);
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
customElements.get("tradex-time") || window.customElements.define("tradex-time", Fc);
const eo = document.createElement("template");
eo.innerHTML = `
<style>
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <div class="viewport"></div>
`;
class Vc extends dt {
  constructor() {
    super(eo);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.shadowRoot.querySelector(".viewport");
  }
}
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", Vc);
const io = document.createElement("template");
io.innerHTML = `
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
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${nh}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${rh}</span>
  </div>
</div>
`;
class Gc extends dt {
  #t;
  #e;
  #n;
  #r;
  #i;
  #s;
  #l = [];
  constructor() {
    super(io);
  }
  destroy() {
  }
  connectedCallback() {
    this.doInit && (this.doInit = !1, this.shadowRoot.appendChild(this.template.content.cloneNode(!0)), this.style.display = "block", this.#s = this.shadowRoot.querySelector("slot"), this.#e = this.shadowRoot.querySelector(".legends"), this.#n = this.shadowRoot.querySelector(".title"), this.#r = this.shadowRoot.querySelector("dl"), this.#i = this.shadowRoot.querySelector(".controls"), this.#s.addEventListener("slotchange", this.onSlotChange.bind(this)));
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
    return this.#n;
  }
  get elInputs() {
    return this.#r;
  }
  get elControls() {
    return this.#i;
  }
  get title() {
    return this.#t;
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
    S && (this.#t = e, this.elTitle.innerHTML = e);
  }
  buildLegend(e, i) {
    let s = "", n = `${i.legend.font}; color: ${i.legend.colour}; text-align: left;`, o = "", a = e?.type !== "chart" ? "visible" : "notvisible";
    const h = "", l = i.legend.controls ? `
      <div class="controls restored expanded ${a}" style="${h}">
        ${this.buildControls(e)}
      </div>
    ` : "";
    switch (e?.type) {
      case "chart":
        o += "font-size: 1.5em;";
        break;
      case "secondary":
        n += " margin-bottom: -1.5em;", o += "", e.title = "";
        break;
      default:
        o += "font-size: 1.2em;";
        break;
    }
    return `
      <div id="legend_${e.id}" class="legend ${e.type}" style="${n}" data-type="${e.type}" data-id="${e.id}" data-parent="${e.parent.id}">
        <div class="lower">
          <span class="title" style="${o}">${e.title}</span>
          <dl style="${s}">${this.buildInputs(e)}</dl>
        </div>
        <div class="upper">
            <span class="title" style="${o}">${e.title}</span>
            ${l}
      </div>
     </div>
    `;
  }
  buildInputs(e) {
    let i = 0, s = "", n, o = "", a = "", h = "";
    for (n in e.inputs) {
      let l = e?.colours?.[i] ? ` color: ${e.colours[i]};` : "", g = e?.inputs?.[n] !== void 0 ? e.inputs[n] : o, p = e?.labels?.[i] ? `${n}:` : o;
      a += e?.labels?.[i] ? "1em;" : ".25em", s += `<dt style="${a}">${p}</dt>
      <dd style="${h}${l}">${g}</dd>`, ++i;
    }
    return s;
  }
  buildControls(e) {
    let i = "", s = e.id;
    return i += `<span id="${s}_up" class="control up" data-icon="up">${oh}</span>`, i += `<span id="${s}_down" class="control down" data-icon="down">${ah}</span>`, e?.type === "indicator" && (i += `<span id="${s}_visible" class="control visible" data-icon="visible">${uh}</span>`, i += `<span id="${s}_notVisible" class="control notvisible" data-icon="notVisible">${fh}</span>`), e?.type !== "indicator" && (i += `<span id="${s}_collapse" class="control collapse" data-icon="collapse">${ch}</span>`, i += `<span id="${s}_expand" class="control expand" data-icon="expand">${dh}</span>`, i += `<span id="${s}_maximize" class="control maximize" data-icon="maximize">${hh}</span>`, i += `<span id="${s}_restore" class="control restore" data-icon="restore">${lh}</span>`), i += e?.type !== "chart" ? `<span id="${s}_remove" class="control remove" data-icon="remove">${sh}</span>` : "", i += e?.type !== "secondary" ? `<span id="${s}_config" class="control config" data-icon="config">${Lr}</span>` : "", i;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", Gc);
const so = document.createElement("template");
so.innerHTML = `
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
class Yc extends dt {
  #t;
  #e;
  constructor() {
    super(so);
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
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", Yc);
const no = document.createElement("template");
no.innerHTML = `
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
class qc extends dt {
  #t;
  #e;
  #n;
  #r;
  constructor() {
    super(no);
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
    this.#t = this.#n ? this.#n : this.clientWidth, this.#e = this.#r ? this.#r : this.clientHeight, this.#n = this.clientWidth, this.#r = this.clientHeight;
  }
}
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", qc);
const ro = document.createElement("template");
ro.innerHTML = `
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
    width: calc(100% - ${pe}px);
    height: calc(100% - ${Pi}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${_.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${pe}px);
    height: ${Pi}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class Xc extends dt {
  #t;
  #e;
  constructor() {
    super(ro);
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
    this.#e = e, this.setMain();
  }
  rowNode(e, i) {
    return `
      <tradex-chartpane slot="chartpane" class="${e}" style="">
      </tradex-chartpane>
    `;
  }
  setMain() {
    let e = T(this.#e?.time?.height) ? this.#e.time.height : Pi, i = this.#e.tools.location == "none" ? 60 : 0;
    this.rows.style.height = `calc(100% - ${e}px)`, this.rows.style.left = `${i}px`, this.time.style.left = `${i}px`, this.viewport.style.left = `${i}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", Xc);
const oo = document.createElement("template");
oo.innerHTML = `
  <slot></slot>
`;
class jc extends dt {
  constructor() {
    super(oo);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get icons() {
    return this.shadowRoot.querySelector("slot").assignedElements();
  }
  defaultNode(e) {
    let i = `
    <style>
      svg {
        height: ${Xt.ICONSIZE};
        width: ${Xt.ICONSIZE};
        fill: ${Xt.COLOUR_ICON};
      }
      svg:hover {
        fill: ${Xt.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${Xt.ICONSIZE};
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
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", jc);
const ao = document.createElement("template");
ao.innerHTML = `
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
class Kc extends dt {
  constructor() {
    super(ao);
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
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", Kc);
const Zc = `
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${qt}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: 0;
    width: calc(100% - ${qt}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 1px;
    right: 0; 
    width: ${pe}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`, lo = document.createElement("template");
lo.innerHTML = Zc;
class Qc extends dt {
  #t;
  constructor() {
    super(lo);
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
  start(e) {
    this.#t = e, this.setToolsLocation();
  }
  setYAxisLocation(e = this.#t?.yAxis?.location) {
    let i = T(this.#t?.tools?.width) ? this.#t.tools.width : qt, s;
    switch (e) {
      case "left":
        s = i == 0 ? 0 : pe, this.scale.style.left = `${i}px`, this.scale.style.right = void 0, this.main.style.left = void 0, this.main.style.right = `-${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
        break;
      case "both":
      case "right":
      default:
        s = i == 0 ? pe : 0, this.scale.style.left = void 0, this.scale.style.right = 0, this.main.style.left = void 0, this.main.style.right = `${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
        break;
    }
  }
  setToolsLocation(e = this.#t?.tools?.location) {
    switch (this.#t.tools = this.#t.tools || {}, e) {
      case "none":
      case !1:
        this.#t.tools.location = "none", this.#t.tools.width = 0, this.tools.style.display = "none", this.tools.style.width = "0px";
        break;
      case "right":
        this.#t.tools.location = "right", this.#t.tools.width = this.#t?.tools?.width || qt, this.tools.style.display = "block", this.tools.style.left = void 0, this.tools.style.right = 0, this.tools.style.width = `${qt}px`;
        break;
      case "left":
      default:
        this.#t.tools.location = "left", this.#t.tools.width = this.#t?.tools?.width || qt, this.tools.style.display = "block", this.tools.style.left = 0, this.tools.style.right = void 0, this.tools.style.width = `${qt}px`;
        break;
    }
    this.setYAxisLocation();
  }
}
customElements.get("tradex-body") || window.customElements.define("tradex-body", Qc);
const ho = document.createElement("template");
ho.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class Jc extends dt {
  constructor() {
    super(ho);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get icons() {
    return this.shadowRoot.querySelector("slot").assignedElements()[0].children;
  }
  defaultNode(e) {
    let s = `
    <div style="display: inline-block; float: right;">
    <style>
      svg {
        height: ${fe.ICONSIZE};
        fill: ${fe.COLOUR_ICON};
      }
    </style>
    `;
    for (const n of e)
      s += this.iconNode(n);
    return s + "</div>";
  }
  iconNode(e) {
    const i = `display: inline-block; height: ${fe.ICONSIZE}; padding-top: 2px`, s = "sub" in e ? 'data-menu="true"' : "";
    return `
      <div id="TX_${e.id}" data-event="${e.event}" ${s} class="icon-wrapper" style="${i}">${e.icon}</div>

    `;
  }
}
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", Jc);
const co = document.createElement("template");
co.innerHTML = `
  <slot name="widget"></slot>
`;
class td extends dt {
  constructor() {
    super(co);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", td);
const ed = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
    }
    tradex-utils {
      height: ${Kt}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${Kt}px); 
      min-height: ${se - Kt}px;
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
class sd extends dt {
  #t;
  #e;
  #n;
  #r;
  #i = Ci;
  #s = se;
  #l;
  #a;
  #h;
  #o;
  #c;
  constructor() {
    const e = document.createElement("template");
    e.innerHTML = ed, super(e, "closed"), this.#r = e;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#r.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = Ar, this.elWidgetsG = this.shadowRoot.querySelector("tradex-widgets"), this.elUtils = this.shadowRoot.querySelector("tradex-utils"), this.elBody = this.shadowRoot.querySelector("tradex-body"), this.elMain = this.elBody.main, this.elTime = this.elBody.main.time, this.elTools = this.elBody.tools, this.elYAxis = this.elBody.scale, this.previousDimensions();
      let e = this.getAttribute("height") || "100%", i = this.getAttribute("width") || "100%";
      this.setDimensions(i, e), this.resizeObserver = new ResizeObserver(xt(this.onResized, 50, this)), this.resizeObserver.observe(this);
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
    this.setAttribute("id", Nt(e));
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(e) {
    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  get dimensions() {
    return this.getBoundingClientRect();
  }
  get width() {
    return this.offsetWidth;
  }
  set width(e) {
    this.setWidth(e);
  }
  get height() {
    return this.offsetHeight;
  }
  set height(e) {
    this.setHeight(e);
  }
  get oWidth() {
    return this.#l;
  }
  get oHeight() {
    return this.#a;
  }
  get widthDeltaR() {
    return this.offsetWidth / this.#l;
  }
  get heightDeltaR() {
    return this.offsetHeight / this.#a;
  }
  get stream() {
  }
  set stream(e) {
  }
  get body() {
    return this.#t;
  }
  get utils() {
    return this.#e;
  }
  get widgets() {
    return this.#n;
  }
  elStart(e) {
    this.#c = e, this.setUtilsLocation();
  }
  onResized(e) {
    this.log(`onResize w: ${this.offsetWidth}, h: ${this.offsetHeight}`), this.emit("global_resize", { w: this.offsetWidth, h: this.offsetHeight }), this.MainPane instanceof Qr && this.previousDimensions(), this.ToolsBar instanceof Jr && this.ToolsBar.onResized();
  }
  previousDimensions() {
    this.#l = this.#h ? this.#h : this.offsetWidth, this.#a = this.#o ? this.#o : this.offsetHeight, this.#h = this.offsetWidth, this.#o = this.offsetHeight;
  }
  setWidth(e) {
    T(e) ? (this.#i = e, e += "px") : S(e) || (this.#i = this.parentElement.getBoundingClientRect().width, e = this.#i + "px"), this.style.width = e;
  }
  setHeight(e) {
    T(e) ? (this.#s = e, e += "px") : S(e) || (this.#s = this.parentElement.getBoundingClientRect().height, w = this.#s + "px"), this.style.height = e;
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
    let s, n = this.width, o = this.height;
    if (!e || !i) {
      const a = this.getBoundingClientRect(), h = this.parentElement.getBoundingClientRect();
      i = a.height ? a.height : h.height ? h.height : se, e = a.width ? a.width : h.width ? h.width : Ci;
    }
    return s = {
      width: this.width,
      height: this.height,
      resizeW: e / n,
      resizeH: i / o,
      resizeWDiff: e - n,
      resizeHDiff: i - o
    }, this.setWidth(e), this.setHeight(i), s;
  }
  setUtilsLocation(e = this.#c?.utils?.location) {
    switch (this.#c.utils = this.#c.utils || {}, e) {
      case "none":
      case !1:
        this.#c.utils.location = "none", this.#c.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${se}px`;
        break;
      case "top":
      default:
        this.#c.utils.location = "top", this.#c.utils.height = Kt, this.elUtils.style.display = "block", this.elUtils.style.height = `${Kt}px`, this.elBody.style.height = `calc(100% - ${Kt}px)`, this.elBody.style.minHeight = `${se - Kt}px`;
    }
  }
}
const nd = [
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
    icon: Kl,
    event: "utils_timezone"
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: Xl,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: Lr,
    event: "utils_settings"
  }
], rd = {
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
}, od = {
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
}, ad = {
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
}, ld = {
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
}, hd = {
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
}, cd = {
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
};
class Hs extends _t {
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
  #t = {
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
  static scale = jt[1];
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const h = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(h?.settings, rd), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (l) => {
      this.newValue(l);
    }, this.setUpdateValue = (l) => {
      this.updateValue(l);
    }, this.addLegend();
  }
  get primaryPane() {
    return Hs.primaryPane;
  }
  get defaultStyle() {
    return this.#t;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const i = {};
    let s = [!1, !1], { c: n, colours: o } = super.legendInputs(e);
    return i.Dn = this.scale.nicePrice(this.overlay.data[n][1][0]), i.Up = this.scale.nicePrice(this.overlay.data[n][1][1]), o = [
      this.style.downStroke,
      this.style.upStroke
    ], { inputs: i, colours: o, labels: s };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2)
      return !1;
    this.scene.clear();
    const i = { down: [], up: [] }, s = this.overlay.data, o = {
      w: this.xAxis.candleW
    };
    let a = e.value(e.indexStart)[0], h = this.overlay.data[0][0], l = (a - h) / e.interval, g = this.Timeline.rangeScrollOffset, p = e.Length + g + 2, v = {};
    for (; p; )
      l < 0 || l >= this.overlay.data.length ? (i.down.push({ x: null, y: null }), i.up.push({ x: null, y: null })) : (o.x = this.xAxis.xPos(s[l][0]), o.y = this.yAxis.yPos(s[l][1][0]), i.down.push({ ...o }), o.x = this.xAxis.xPos(s[l][0]), o.y = this.yAxis.yPos(s[l][1][1]), i.up.push({ ...o })), l++, p--;
    v = {
      width: this.style.LineWidth,
      stroke: this.style.downStroke,
      dash: this.style.downLineDash
    }, this.plot(i.down, "renderLine", v), v = {
      width: this.style.upLineWidth,
      stroke: this.style.upStroke,
      dash: this.style.upLineDash
    }, this.plot(i.up, "renderLine", v), this.target.viewport.render();
  }
}
class zs extends _t {
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
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const h = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(h?.settings, od), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (l) => {
      this.newValue(l);
    }, this.setUpdateValue = (l) => {
      this.updateValue(l);
    }, this.addLegend();
  }
  get primaryPane() {
    return zs.primaryPane;
  }
  get defaultStyle() {
    return this.#t;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const i = {};
    let s = [!1, !1, !1], { c: n, colours: o } = super.legendInputs(e);
    return i.Hi = this.scale.nicePrice(this.overlay.data[n][1][0]), i.Mid = this.scale.nicePrice(this.overlay.data[n][1][1]), i.Lo = this.scale.nicePrice(this.overlay.data[n][1][2]), o = [
      this.style.upperStroke,
      this.style.middleStroke,
      this.style.lowerStroke
    ], { inputs: i, colours: o, labels: s };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2)
      return !1;
    this.scene.clear();
    const i = { lower: [], middle: [], upper: [] }, s = this.overlay.data, o = {
      w: this.xAxis.candleW
    };
    let a = e.value(e.indexStart)[0], h = this.overlay.data[0][0], l = (a - h) / e.interval, g = this.Timeline.rangeScrollOffset, p = e.Length + g * 2 + 2, v = {};
    for (; p; )
      l < 0 || l >= this.overlay.data.length ? (i.lower.push({ x: null, y: null }), i.middle.push({ x: null, y: null }), i.upper.push({ x: null, y: null })) : (o.x = this.xAxis.xPos(s[l][0]), o.y = this.yAxis.yPos(s[l][1][0]), i.lower.push({ ...o }), o.x = this.xAxis.xPos(s[l][0]), o.y = this.yAxis.yPos(s[l][1][1]), i.middle.push({ ...o }), o.x = this.xAxis.xPos(s[l][0]), o.y = this.yAxis.yPos(s[l][1][2]), i.upper.push({ ...o })), l++, p--;
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
    }, this.plot(i.upper, "renderLine", v), this.target.viewport.render();
  }
}
class Oi extends _t {
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
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), Oi.inCnt++;
    const h = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(h?.settings, ad), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (l) => {
      this.newValue(l);
    }, this.setUpdateValue = (l) => {
      this.updateValue(l);
    }, this.addLegend();
  }
  get primaryPane() {
    return Oi.primaryPane;
  }
  get defaultStyle() {
    return this.#t;
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
      return !1;
    this.scene.clear();
    const i = this.overlay.data, s = this.xAxis.candleW, n = [];
    this.xAxis.smoothScrollOffset;
    const o = {
      w: s
    };
    let a = this.Timeline.rangeScrollOffset, h = e.data.length - this.overlay.data.length, l = e.indexStart - h - 2, g = e.Length + a * 2 + 2;
    for (; g; )
      l < 0 || l >= this.overlay.data.length ? n.push({ x: null, y: null }) : (o.x = this.xAxis.xPos(i[l][0]), o.y = this.yAxis.yPos(i[l][1]), n.push({ ...o })), l++, g--;
    this.plot(n, "renderLine", this.style), this.target.viewport.render();
  }
}
class Bs extends _t {
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
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const h = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(h?.settings, ld), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (l) => {
      this.newValue(l);
    }, this.setUpdateValue = (l) => {
      this.updateValue(l);
    }, this.addLegend();
  }
  get primaryPane() {
    return Bs.primaryPane;
  }
  get defaultStyle() {
    return this.#t;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const i = {}, { c: s, colours: n } = super.legendInputs(e);
    return i.RSI_1 = this.scale.nicePrice(this.overlay.data[s][1]), { inputs: i, colours: n };
  }
  draw(e = this.range) {
    this.scene.clear();
    const i = this.scene.width + this.xAxis.bufferPx * 2, s = this.yAxis.yPos(this.style.defaultHigh), n = this.yAxis.yPos(this.style.defaultLow), o = [0, s, this.scene.width, n - s];
    let a = { fill: this.style.highLowRangeStyle };
    if (this.plot(o, "renderRect", a), o.length = 0, o[0] = { x: 0, y: s }, o[1] = { x: i, y: s }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", a), o.length = 0, o[0] = { x: 0, y: n }, o[1] = { x: i, y: n }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", a), this.overlay.data.length < 2)
      return this.target.viewport.render(), !1;
    const h = this.overlay.data, l = this.xAxis.candleW;
    o.length = 0, this.Timeline.smoothScrollOffset;
    const g = {
      w: l
    };
    let p = this.Timeline.rangeScrollOffset, v = e.data.length - this.overlay.data.length, b = e.indexStart - v - 2, L = e.Length + p * 2 + 2;
    for (; L; )
      b < 0 || b >= this.overlay.data.length ? o.push({ x: null, y: null }) : (g.x = this.xAxis.xPos(h[b][0]), g.y = this.yAxis.yPos(h[b][1]), o.push({ ...g })), b++, L--;
    this.plot(o, "renderLine", this.style), this.target.viewport.render();
  }
}
class Ii extends _t {
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
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), Ii.inCnt++;
    const h = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(h?.settings, hd), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (l) => {
      this.newValue(l);
    }, this.setUpdateValue = (l) => {
      this.updateValue(l);
    }, this.addLegend();
  }
  get primaryPane() {
    return Ii.primaryPane;
  }
  get defaultStyle() {
    return this.#t;
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
    if (this.overlay.data.length < 2)
      return !1;
    this.scene.clear();
    const i = this.overlay.data, s = this.xAxis.candleW, n = [];
    this.xAxis.smoothScrollOffset;
    const o = {
      w: s
    };
    let a = this.Timeline.rangeScrollOffset, h = e.data.length - this.overlay.data.length, l = e.indexStart - h - 2, g = e.Length + a * 2 + 2;
    for (; g; )
      l < 0 || l >= this.overlay.data.length ? n.push({ x: null, y: null }) : (o.x = this.xAxis.xPos(i[l][0]), o.y = this.yAxis.yPos(i[l][1]), n.push({ ...o })), l++, g--;
    this.plot(n, "renderLine", this.style), this.target.viewport.render();
  }
}
class Us extends _t {
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
  #t = {
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
  static scale = jt[1];
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const h = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(h?.settings, cd), this.style = h?.settings?.style ? { ...this.#t, ...h.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (l) => {
      this.newValue(l);
    }, this.setUpdateValue = (l) => {
      this.updateValue(l);
    }, this.addLegend();
  }
  get primaryPane() {
    return Us.primaryPane;
  }
  get defaultStyle() {
    return this.#t;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0)
      return !1;
    const i = {};
    let s = [!1, !1, !1], { c: n, colours: o } = super.legendInputs(e);
    return i.SlowK = this.scale.nicePrice(this.overlay.data[n][1][0]), i.SlowD = this.scale.nicePrice(this.overlay.data[n][1][1]), o = [
      this.style.slowD,
      this.style.slowK
    ], { inputs: i, colours: o, labels: s };
  }
  draw(e = this.range) {
    this.scene.clear();
    const i = this.scene.width + this.xAxis.bufferPx * 2, s = this.yAxis.yPos(this.style.defaultHigh), n = this.yAxis.yPos(this.style.defaultLow);
    let o = [0, s, this.scene.width, n - s], a = { fill: this.style.highLowRangeStyle };
    if (this.plot(o, "renderRect", a), o.length = 0, o[0] = { x: 0, y: s }, o[1] = { x: i, y: s }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", a), o.length = 0, o[0] = { x: 0, y: n }, o[1] = { x: i, y: n }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", a), this.overlay.data.length < 2)
      return this.target.viewport.render(), !1;
    o = { slowD: [], slowK: [] };
    const h = this.overlay.data, g = {
      w: this.xAxis.candleW
    };
    let p = e.value(e.indexStart)[0], v = this.overlay.data[0][0], b = (p - v) / e.interval, L = this.Timeline.rangeScrollOffset, O = e.Length + L * 2 + 2;
    for (; O; )
      b < 0 || b >= this.overlay.data.length ? (o.slowD.push({ x: null, y: null }), o.slowK.push({ x: null, y: null })) : (g.x = this.xAxis.xPos(h[b][0]), g.y = this.yAxis.yPos(h[b][1][0]), o.slowK.push({ ...g }), g.x = this.xAxis.xPos(h[b][0]), g.y = this.yAxis.yPos(h[b][1][1]), o.slowD.push({ ...g })), b++, O--;
    a = {
      width: this.style.slowKLineWidth,
      stroke: this.style.slowKStroke,
      dash: this.style.slowKLineDash
    }, this.plot(o.slowK, "renderLine", a), a = {
      width: this.style.slowDLineWidth,
      stroke: this.style.slowDStroke,
      dash: this.style.slowDLineDash
    }, this.plot(o.slowD, "renderLine", a), this.target.viewport.render();
  }
}
const uo = {
  AROON: { id: "AROON", name: "Aroon", event: "addIndicator", ind: Hs },
  BB: { id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: zs },
  EMA: { id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: Oi },
  RSI: { id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: Bs },
  SMA: { id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: Ii },
  STOCH: { id: "STOCH", name: "Stochastic Oscillator", event: "addIndicator", ind: Us }
};
class dd {
  #t = "Utilities";
  #e = "utils";
  #n;
  #r;
  #i;
  #s;
  #l;
  #a;
  #h = {};
  #o = {};
  #c;
  #u = {};
  constructor(e, i) {
    this.#n = e, this.#r = i, this.#i = e.elUtils, this.#s = e.config?.utilsBar || nd, this.#l = e.WidgetsG, this.#a = e.indicatorClasses || uo, this.init();
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
    return this.#t;
  }
  get shortName() {
    return this.#e;
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
    return D.elementDimPos(this.#i);
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
    const e = this.#n, i = D.findBySelectorAll(`#${e.id} .${Ba} .icon-wrapper`);
    for (let s of i) {
      let n = s.id.replace("TX_", "");
      for (let o of this.#s)
        o.id === n && s.removeEventListener("click", this.#o[n].click), s.removeEventListener("pointerover", this.#o[n].pointerover), s.removeEventListener("pointerout", this.#o[n].pointerout);
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
    const i = D.findTargetParentWithClass(e.target, "icon-wrapper");
    if (!E(i))
      return !1;
    const s = Date.now();
    if (s - this.#u[i.id] < 1e3)
      return !1;
    this.#u[i.id] = s;
    let n = i.dataset.event, o = i.dataset.menu || !1, a = {
      target: i.id,
      menu: o,
      evt: n
    }, h = i.dataset.action;
    this.emit(n, a), o ? this.emit("menu_open", a) : this.emit("util_selected", a), h && h(a, this.#n);
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = fe.COLOUR_ICONHOVER;
  }
  onIconOut(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = fe.COLOUR_ICON;
  }
  initAllUtils() {
    const e = this.#i.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      this.#u[i.id] = 0;
      let s = i.id.replace("TX_", ""), n = i.querySelector("svg");
      n.style.fill = fe.COLOUR_ICON, n.style.height = "90%";
      for (let o of this.#s)
        if (o.id === s && (this.#o[s] = {}, this.#o[s].click = this.onIconClick.bind(this), this.#o[s].pointerover = this.onIconOver.bind(this), this.#o[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#o[s].click), i.addEventListener("pointerover", this.#o[s].pointerover), i.addEventListener("pointerout", this.#o[s].pointerout), s === "indicators" && (o.sub = Object.values(this.#a)), o?.sub)) {
          let a = {
            content: o.sub,
            primary: i
          }, h = this.#l.insert("Menu", a);
          i.dataset.menu = h.id, h.start();
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
const ud = 150;
class vt {
  #t;
  #e;
  #n;
  #r;
  #i;
  #s;
  #l;
  #a;
  #h;
  #o = {};
  static menuList = {};
  static menuCnt = 0;
  static class = En;
  static name = "Menus";
  static type = "Menu";
  static currentActive;
  static create(e, i) {
    const s = `menu_${++vt.menuCnt}`;
    return i.id = s, vt.menuList[s] = new vt(e, i), vt.menuList[s];
  }
  static destroy(e) {
    vt.menuList[e].end(), delete vt.menuList[e];
  }
  constructor(e, i) {
    this.#e = e, this.#n = i.core, this.#r = i, this.#t = i.id, this.#s = e.elements.elMenus, this.#i = this.#n.elWidgetsG, this.init();
  }
  get el() {
    return this.#l;
  }
  get id() {
    return this.#t;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#l);
  }
  get type() {
    return vt.type;
  }
  init() {
    this.mount(this.#s);
  }
  start() {
    this.position(), this.eventsListen();
  }
  end() {
    this.#s.querySelectorAll(`#${this.id} li`).forEach((i) => {
      i.removeEventListener("click", this.#o[this.id][i.id]);
    }), document.removeEventListener("click", this.#o[this.id].outside), this.off("global_resize", this.onResize);
  }
  eventsListen() {
    const e = this.#s.querySelectorAll(`#${this.id} li`);
    this.#o[this.id] = {}, e.forEach((i) => {
      this.#o[this.id][i.id] = this.onMenuSelect.bind(this), i.addEventListener("click", this.#o[this.id][i.id]);
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
      menu: this.#t,
      evt: i
    };
    this.emit("menuItem_selected", s), this.emit("menu_close", s), console.log("menu_close");
  }
  onOutsideClickListener(e) {
    if (!this.#l.contains(e.target) && !this.#r.primary.contains(e.target) && D.isVisible(this.#l)) {
      let i = {
        target: e.currentTarget.id,
        menu: this.#t
      };
      this.emit("menu_close", i);
    }
    document.removeEventListener("click", this.#o[this.id].outside);
  }
  onResize() {
    this.position();
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.menuNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#l = this.#s.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${En}" style=""></div>
    `;
  }
  menuNode() {
    const e = this.#r, i = `position: absolute; z-index: 1000; display: none; border: 1px solid ${Ji.COLOUR_BORDER}; background: ${Ji.COLOUR_BG}; color: ${Ji.COLOUR_TXT}; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;`;
    let s = this.content(e);
    return `
      <div id="${e.id}" class="${Ua}" style="${i}">
        ${s}
      </div>
    `;
  }
  content(e) {
    const i = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${ud}px`, s = "padding: .25em 1em .25em 1em; white-space: nowrap;", n = "display: inline-block; width: 4em;", o = "cursor: pointer;", a = `onmouseover="this.style.background ='#222'"`, h = `onmouseout="this.style.background ='none'"`;
    let l = `<ul style="${i}">`;
    if (e?.content)
      for (let g of e.content)
        l += `<li id="${g.id}" data-event="${g.event}" style="${s} ${o}" ${a} ${h}><a style="${o}"><span style="${n}">${g.id}</span><span>${g.name}</span></li></a>`;
    return l += "</ul>", l;
  }
  position() {
    let e = this.#i.getBoundingClientRect(), i = this.#r.primary.getBoundingClientRect(), s = Math.round(i.left - e.left), n = Math.round(i.bottom - e.top);
    this.#l.style.left = s + "px", this.#l.style.top = n + "px";
    let o = D.elementDimPos(this.#l);
    if (o.right > this.#i.offsetWidth) {
      let h = Math.floor(this.#i.offsetWidth - o.width);
      h = $(h, 0, this.#i.offsetWidth), this.#l.style.left = `${h}px`;
    }
    if (this.#n.MainPane.rowsH + n + o.height > this.#n.MainPane.rowsH) {
      let h = Math.floor(o.height * -1);
      h = $(h, this.#n.MainPane.rowsH * -1, 0), this.#l.style.top = `${h}px`;
    }
  }
  remove() {
  }
  open() {
    if (vt.currentActive === this)
      return !0;
    vt.currentActive = this, this.#l.style.display = "block", this.position(), setTimeout(() => {
      this.#o[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#o[this.id].outside);
    }, 250);
  }
  close() {
    vt.currentActive = null, this.#l.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class re {
  static opened = new re("opened");
  static closed = new re("closed");
  constructor(e) {
    this.name = e;
  }
}
class nt {
  #t;
  #e;
  #n;
  #r;
  #i = re.closed;
  #s;
  #l;
  #a;
  #h;
  #o;
  #c;
  #u;
  #d;
  #f;
  #m = {};
  static windowList = {};
  static windowCnt = 0;
  static class = bn;
  static name = "Windows";
  static type = "Window";
  static currentActive = null;
  static create(e, i) {
    const s = `window_${++nt.windowCnt}`;
    return i.id = s, nt.windowList[s] = new nt(e, i), nt.windowList[s];
  }
  static destroy(e) {
    nt.windowList[e].destroy(), delete nt.windowList[e];
  }
  constructor(e, i) {
    this.#e = e, this.#n = i.core, this.#r = i, this.#t = i.id, this.#l = e.elements.elWindows, this.#s = this.#n.elWidgetsG, this.init();
  }
  get id() {
    return this.#t;
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
    return D.elementDimPos(this.#a);
  }
  set dimensions(e) {
    this.setDimensions(e);
  }
  get type() {
    return nt.type;
  }
  get el() {
    return this.#a;
  }
  get elDragBar() {
    return this.#h;
  }
  get elTitle() {
    return this.#o;
  }
  get elCloseIcon() {
    return this.#c;
  }
  get elContent() {
    return this.#u;
  }
  init() {
    this.mount(this.#l);
  }
  start() {
    this.eventsListen(), this.close();
  }
  destroy() {
    this.off("closeWindow", this.onCloseWindow), this.el.remove();
  }
  eventsListen() {
    this.on("closeWindow", this.onCloseWindow, this);
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
  onOutsideClickListener(e) {
    if (!this.#a.contains(e.target) && D.isVisible(this.#a)) {
      let i = {
        target: e.currentTarget.id,
        window: this.#t
      };
      this.emit("closeWindow", i), document.removeEventListener("click", this.#m.click);
    }
  }
  onCloseWindow(e) {
    e.window === this.#t && this.close();
  }
  onWindow(e) {
    e.stopPropagation(), console.log("window");
  }
  onDragBar(e) {
    e.stopPropagation(), console.log("dragBar");
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.windowNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#a = this.#l.querySelector(`#${this.#r.id}`), this.#h = this.#a.querySelector(".dragBar"), this.#o = this.#a.querySelector(".title"), this.#c = this.#a.querySelector(".closeIcon"), this.#u = this.#a.querySelector(".content"), this.#a.addEventListener("click", this.onWindow.bind(this)), D.isElement(this.#h) && this.#h.addEventListener("click", this.onDragBar.bind(this));
    let i, s;
    if (E(this.#r.position))
      i = this.#r.x, s = this.#r.y;
    else {
      let n = D.elementDimPos(this.#a);
      i = (this.#n.width - n.width) / 2, s = (this.#n.height - n.height) / 2;
    }
    this.#a.style.bottom = `${s}px`, this.#a.style.left = `${i}px`;
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${bn}" style=""></div>
    `;
  }
  windowNode() {
    const e = this.#r;
    let i = `position: absolute; z-index: 10; display: block; border: 1px solid ${ts.COLOUR_BORDER}; background: ${ts.COLOUR_BG}; color: ${ts.COLOUR_TXT};`, s = this.config?.styles?.window;
    for (let g in s)
      i += `${g}: ${s[g]}; `;
    let n = e.dragBar ? this.dragBar(e) : "", o = !e.dragBar && e.title ? this.title(e) : "", a = this.content(e), h = this.closeIcon(e);
    return `
      <div id="${e.id}" class="${Wa}" style="${i}">
          ${n}
          ${o}
          ${h}
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
    let o = `${i} `, a = this.config?.styles?.dragBar;
    for (let l in a)
      o += `${l}: ${a[l]}; `;
    let h = "";
    return e.dragBar && (h += `
      <div class="dragBar" style="${o}" ${s} ${n}>
        ${this.title(e)}
      </div>
    `), h;
  }
  title(e) {
    const i = this.config, s = i?.styles?.title, n = S(i?.title) ? i.title : "";
    let o = "";
    for (let h in s)
      o += `${h}: ${s[h]}; `;
    return `
        <div class="title" style="${o}">${n}</div>
    `;
  }
  closeIcon(e) {
    const i = "cursor: pointer;", s = `onmouseover="this.style.background ='#222'"`, n = `onmouseout="this.style.background ='none'"`;
    let o = `${i} `, a = this.config?.styles?.closeIcon, h = "";
    for (let g in a)
      h += `${g}: ${a[g]}; `;
    let l = "";
    return e.closeIcon && (l += `
      <div class="closeIcon" style="${o}" ${s} ${n}>
        <span>X</span>
      </div>
    `), l;
  }
  position(e) {
    let i = this.dimensions, s = this.#n.dimensions, n = Math.round((s.width - i.width) / 2), o = s.height - Math.round((s.height - i.height) / 2), a = D.getStyle(this.#a, "z-index");
    if (E(e)) {
      let { x: h, y: l, z: g } = { ...e };
      T(h) && (n = h), T(l) && (o = s.height - (l + i.height)), T(g) && (a = g);
    }
    e?.relativeY == "bottom" && (o += i.height), this.#a.style.left = `${n}px`, this.#a.style.bottom = `${o}px`, this.#a.style["z-index"] = `${a}`;
  }
  setDimensions(e) {
    T(e.x) && (this.#a.style.width = `${e.x}px`), T(e.y) && (this.#a.style.width = `${e.y}px`);
  }
  setProperties(e) {
    if (!E(e))
      return !1;
    if (S(e?.title) && (this.#o.innerHTML = e.title), S(e?.content) && (this.#u.innerHTML = e.content), this.setDimensions(e?.dimensions), this.position(e?.position), E(e?.styles)) {
      const i = (s, n) => {
        if (!E(n))
          return !1;
        const o = "el" + s.charAt(0).toUpperCase() + s.slice(1);
        if (E(this[o]))
          for (let a in n)
            this[o].style.p = n[a];
      };
      for (let s of Object.keys(e.styles))
        i(s, e.styles[s]);
    }
    return e;
  }
  remove() {
    return nt.destroy(this.id);
  }
  open(e) {
    if (nt.currentActive === this && this.state === re.opened)
      return !0;
    nt.currentActive = this, this.#i = re.opened, this.#a.style.display = "block", this.#a.style.zindex = "10", this.setProperties(e), this.emit("window_opened", this.id), setTimeout(() => {
      this.#m.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#m.click);
    }, 250);
  }
  close() {
    nt.currentActive = null, this.#i = re.closed, this.#a.style.display = "none", this.emit("window_closed", this.id);
  }
}
class Hi extends nt {
  static type = "Dialogue";
  static create(e, i) {
    const s = {
      window: { "box-shadow": "rgb(0,0,0) 0px 20px 30px -10px" },
      content: { padding: "1em" },
      title: { padding: "0 1em", background: "#333" }
    };
    return i.dragbar = X(i.dragbar) ? i.dragbar : !0, i.close = X(i.close) ? i.close : !0, i.styles = { ...s, ...i.styles }, super.create(e, i);
  }
  constructor(e, i) {
    super(e, i);
  }
  get type() {
    return Hi.type;
  }
}
class fd extends Hi {
  static type = "ConfigDialogue";
  static create(e, i) {
    return i.dragBar = !0, i.close = !0, super.create(e, i);
  }
  constructor(e, i) {
    super(e, i);
  }
}
class Ct {
  static progressList = {};
  static progressCnt = 0;
  static class = Cn;
  static type = "progress";
  static name = "Progress";
  static icons = {
    loadingBars: Mh,
    loadingSpin: Ph
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${Cn}" style=""></div>
    `;
  }
  static create(e, i) {
    const s = `progress_${++Ct.progressCnt}`;
    return i.id = s, Ct.progressList[s] = new Ct(e, i), Ct.progressList[s];
  }
  static destroy(e) {
    Ct.progressList[e].destroy(), delete Ct.progressList[e];
  }
  #t;
  #e;
  #n;
  #r;
  #i;
  #s;
  #l;
  #a;
  constructor(e, i) {
    this.#e = e, this.#n = i.core, this.#r = i, this.#t = i.id, this.#s = e.elements.elProgress, this.#i = this.#n.elWidgetsG, this.init();
  }
  get type() {
    return Ct.type;
  }
  init() {
    this.mount(this.#s);
  }
  start() {
    if (!E(this.#n.config?.progress) || !E(this.#n.config.progress?.loading))
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
    this.#r?.type in Ct.icons && (i = this.#r?.type);
    const s = { type: i, icon: Ct.icons[i] };
    e.lastElementChild == null ? e.innerHTML = this.progressNode(s) : e.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(s)), this.#l = this.#s.querySelector(`#${this.#r.id}`), this.#a = this.#l.querySelector("svg"), this.#a.style.fill = `${Dh.COLOUR_ICONHOVER};`;
  }
}
const as = {
  id: "widgets",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        menu_open: {
          target: "menu_open",
          action(r) {
          }
        },
        window_open: {
          target: "window_open",
          action(r) {
          }
        }
      }
    },
    menu_open: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        menu_close: {
          target: "idle",
          action(r) {
          }
        }
      }
    },
    window_open: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        window_close: {
          target: "idle",
          action(r) {
          }
        }
      }
    }
  }
};
class rr {
  #t;
  #e = "Widgets";
  #n = "widgets";
  #r;
  #i;
  #s;
  #l;
  #a = { Divider: at, Progress: Ct, Menu: vt, Window: nt, Dialogue: Hi, ConfigDialogue: fd };
  #h = {};
  #o = {};
  #c;
  #u;
  #d;
  constructor(e, i) {
    this.#r = e, this.#i = i, this.#l = { ...this.#a, ...i.widgets }, this.#c = e.elWidgetsG, this.init();
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
    this.#t = Nt(e);
  }
  get id() {
    return this.#t ? `${this.#t}` : `${this.#r.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#e;
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
    return this.#o;
  }
  get instances() {
    return this.#h;
  }
  set stateMachine(e) {
    this.#s = new Bt(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  get types() {
    return this.#l;
  }
  init() {
    this.mount(this.#c);
    for (let e in this.#l) {
      let i = this.#l[e], s = `el${i.name}`;
      this.#o[s] = this.#c.querySelector(`.${i.class}`);
    }
  }
  start() {
    this.eventsListen(), as.id = this.id, as.context = this, this.stateMachine = as, this.stateMachine.start();
  }
  destroy() {
    this.off("menu_open", this.onOpenMenu), this.off("menu_close", this.onCloseMenu), this.off("menu_off", this.onCloseMenu), this.off("menuItem_selected", this.onMenuItemSelected), this.off("global_resize", this.onResize), this.stateMachine.destroy();
    for (let e in this.#h)
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
    this.#h[e.menu].open();
  }
  onCloseMenu(e) {
    this.#h[e.menu].close();
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
    this.#u = e;
  }
  setHeight(e) {
    this.#d = e;
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
    if (!(e in this.#l) || !E(i))
      return !1;
    i.core = this.core;
    const s = this.#l[e].create(this, i);
    return this.#h[s.id] = s, s;
  }
  delete(e) {
    return isString(e) ? (this.#l[type].destroy(e), !0) : !1;
  }
}
function or(r, e, i, s, n, o) {
  const a = r.theme, h = document.createElement("template"), l = r.Timeline.graph.viewport.scene, g = r.MainPane, p = g.graph.viewport.scene, v = g.width, b = g.height, L = new Fe.Viewport({
    width: v,
    height: b,
    container: h
  }), O = L.scene.context;
  let R = 0, rt = 0, B = v - r.Chart.scale.width;
  a?.yAxis?.location == "left" && (rt = r.Chart.scale.width, B = 0);
  let k;
  O.save(), $s(O, 0, 0, v, b, { fill: a.chart.Background }), O.drawImage(p.canvas, rt, 0, p.width, p.height);
  for (const [ot, ut] of r.ChartPanes) {
    let Q = ut.graph.viewport.scene, { width: et, height: ft } = Q, gt = ut.scale.graph.viewport.scene, { width: oe, height: Wt } = gt;
    R > 0 && (k = { stroke: a.divider.line }, Ve(O, R, 0, g.width, k)), O.drawImage(Q.canvas, rt, R, et, ft), O.drawImage(gt.canvas, B, R - 1, oe, Wt), R += ft;
  }
  O.drawImage(l.canvas, 0, R, l.width, l.height), k = {
    text: r.config.title,
    colour: a.chart.TextColour,
    fontSize: a.chart.FontSize * 1.5,
    fontWeight: "normal",
    fontFamily: a.chart.FontFamily,
    textBaseLine: "top"
  }, Ur(O, 6, 6, k);
  const Ut = (ot) => {
    if (ot) {
      const Q = o?.x || 0, et = o?.y || 0, ft = o?.width || v * 0.25, gt = o?.height || b * 0.25;
      O.drawImage(ot, Q, et, ft, gt);
    }
    O.restore();
    const ut = () => {
      L.destroy(), h.remove();
    };
    switch (n) {
      case "url":
        if (z(e)) {
          const Q = (et) => {
            e(et), ut();
          };
          L.scene.toImage(i, s, Q);
        } else
          new Promise(function(Q, et) {
            const ft = L.scene.toImage(i, s);
            ft ? Q(ft) : et(!1), ut();
          });
        break;
      case "download":
      default:
        L.scene.export({ fileName: e }, null, i, s), ut();
        break;
    }
  };
  E(o) ? D.isImage(o?.imgURL).then((ot) => {
    Ut(ot);
  }).catch((ot) => {
    console.error(ot);
  }) : Ut();
}
class I extends sd {
  static #t = jo;
  static #e = 0;
  static #n = {};
  static #r = {};
  static #i = null;
  static #s = !1;
  static #l = [];
  static #a = null;
  static get version() {
    return I.#t;
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
    return I.#a;
  }
  static #h = `${Oe} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
  static #o = [
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
  #c = Oe;
  #u = _e;
  #d;
  #f;
  #m;
  #y;
  #S;
  #v;
  #p;
  #w;
  #O;
  #g;
  #P;
  #C;
  #k = !1;
  #M = null;
  #b = {};
  #E = Ki;
  #L;
  #x;
  #T = uo;
  #_;
  #I;
  #R;
  chartWMin = Ci;
  chartHMin = se;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = _.COLOUR_BG;
  chartTxtColour = _.COLOUR_TXT;
  chartBorderColour = _.COLOUR_BORDER;
  utilsH = Kt;
  toolsW = qt;
  timeH = Pi;
  scaleW = pe;
  #B;
  #A;
  #D = {
    chart: {},
    time: {}
  };
  #$;
  panes = {
    utils: this.#B,
    tools: this.#A,
    main: this.#D
  };
  #N = {
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
  #H = 0;
  #K = 0;
  #F = { x: 0, y: 0 };
  #j = [!1, !1, !1];
  #V;
  #G;
  #z;
  #Y;
  #q;
  #X;
  #U = !1;
  #W = !1;
  static create(e = {}) {
    I.#e == 0 && (I.#n.CPUCores = navigator.hardwareConcurrency, I.#n.api = {
      permittedClassNames: I.#o
    }), (typeof e.talib != "object" || typeof e.talib.init != "function") && (I.#s = !1, I.#a = new Error(`${I.#h}`)), !I.#s && I.#a === null && (I.#i = e.talib.init(e.wasm)), I.#i.then(
      () => {
        I.#s = !0;
        for (let i of I.#l)
          z(i) && i();
      },
      () => {
        I.#s = !1;
      }
    );
  }
  static destroy(e) {
    if (e instanceof I) {
      e.end();
      const i = e.inCnt;
      delete I.#r[i];
    }
  }
  static cnt() {
    return I.#e++;
  }
  constructor() {
    super(), this.#M = I.cnt(), console.warn(`!WARNING!: ${Oe} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${_e} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#G = kr;
  }
  log(e) {
    this.logs && console.log(e);
  }
  info(e) {
    this.infos && console.info(e);
  }
  warn(e) {
    this.warnings && console.warn(e);
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
  get name() {
    return this.#c;
  }
  get shortName() {
    return this.#u;
  }
  get options() {
    return this.#m;
  }
  get config() {
    return this.#f;
  }
  get core() {
    return this.#d;
  }
  get inCnt() {
    return this.#M;
  }
  set elUtils(e) {
    this.#S = e;
  }
  get elUtils() {
    return this.#S;
  }
  set elTools(e) {
    this.#p = e;
  }
  get elTools() {
    return this.#p;
  }
  set elBody(e) {
    this.#v = e;
  }
  get elBody() {
    return this.#v;
  }
  set elMain(e) {
    this.#w = e;
  }
  get elMain() {
    return this.#w;
  }
  set elTime(e) {
    this.#g = e;
  }
  get elTime() {
    return this.#g;
  }
  set elYAxis(e) {
    this.#P = e;
  }
  get elYAxis() {
    return this.#P;
  }
  set elWidgetsG(e) {
    this.#C = e;
  }
  get elWidgetsG() {
    return this.#C;
  }
  get UtilsBar() {
    return this.#B;
  }
  get ToolsBar() {
    return this.#A;
  }
  get MainPane() {
    return this.#D;
  }
  get Timeline() {
    return this.#D.time;
  }
  get WidgetsG() {
    return this.#$;
  }
  get Chart() {
    return this.#D.chart;
  }
  get ChartPanes() {
    return this.#D.chartPanes;
  }
  get Indicators() {
    return this.#D.indicators;
  }
  get ready() {
    return this.#k;
  }
  get state() {
    return this.#L;
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
    return T(this.#x.initialCnt) ? this.#x.initialCnt : Fa;
  }
  get range() {
    return this.#x;
  }
  get time() {
    return this.#N;
  }
  get TimeUtils() {
    return ma;
  }
  get theme() {
    return this.#I;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#T;
  }
  get TALib() {
    return this.#_;
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
  get hub() {
    return this.#b;
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
    return this.#H;
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
  set stream(e) {
    return this.setStream(e);
  }
  get stream() {
    return this.#z;
  }
  get worker() {
    return this.#G;
  }
  get isEmpty() {
    return this.#L.IsEmpty;
  }
  set candles(e) {
    E(e) && (this.#Y = e);
  }
  get candles() {
    return this.#Y;
  }
  get progress() {
    return this.#V;
  }
  start(e) {
    this.log(`${Oe} configuring...`), I.create(e);
    const i = { ...e };
    this.logs = i?.logs ? i.logs : !1, this.infos = i?.infos ? i.infos : !1, this.warnings = i?.warnings ? i.warnings : !1, this.errors = i?.errors ? i.errors : !1, this.timer = i?.timer ? i.timer : !1, this.#f = i, this.#M = i.cnt || this.#M, this.#_ = i.talib, this.#y = this, this.#d = this;
    const s = S(i?.id) ? i.id : null;
    this.setID(s), this.classList.add(this.id), this.log("processing state...");
    let n = ct(i?.state) || {};
    n.id = this.id, n.core = this;
    let o = i?.deepValidate || !1, a = i?.isCrypto || !1;
    this.#L = this.#E.create(n, o, a), delete i.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let h = "1s", l = W;
    if (!E(i?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${Oe} has no chart data or streaming provided.`), { tf: h, ms: l } = fi(i?.timeFrame)) : E(i?.stream) && this.state.data.chart.data.length < 2 ? ({ tf: h, ms: l } = fi(i?.timeFrame), this.#U = !0) : (h = this.state.data.chart.tf, l = this.state.data.chart.tfms), this.log(`tf: ${h} ms: ${l}`), this.#f.callbacks = this.#f.callbacks || {}, E(i))
      for (const p in i)
        p in this.props() && this.props()[p](i[p]);
    const g = E(i?.range) ? i.range : {};
    if (g.interval = l, g.core = this, this.getRange(null, null, g), this.#x.Length > 1) {
      const p = gs(this.#N, this.#f?.range?.startTS), v = T(p) ? p + this.#x.initialCnt : this.allData.data.length - 1, b = T(p) ? p : v - this.#x.initialCnt;
      this.#x.initialCnt = v - b, this.setRange(b, v), i.range?.center && this.jumpToIndex(b, !0, !0);
    }
    this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#$ = new rr(this, { widgets: i?.widgets }), this.#B = new dd(this, i), this.#A = new Jr(this, i), this.#D = new Qr(this, i), this.setTheme(this.#R.id), this.log(`${this.#c} V${I.version} configured and running...`), this.#H = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#V = this.WidgetsG.insert("Progress", {}), this.stream = this.#f.stream, this.#U && this.on(kt, this.delayedSetRange, this), this.#k = !0, this.refresh();
  }
  destroy() {
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.#b = null, this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#G.end(), this.#E = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(kt, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#V.stop());
  }
  on(e, i, s) {
    return !S(e) || !z(i) ? !1 : (this.#b[e] || (this.#b[e] = []), this.#b[e].push({ handler: i, context: s }), !0);
  }
  off(e, i) {
    if (!S(e) || !z(i) || !(e in this.#b))
      return !1;
    for (let s = 0; s < this.#b[e].length; s++)
      if (this.#b[e][s].handler === i && (this.#b[e].splice(s, 1), this.#b[e].length === 0)) {
        delete this.#b[e];
        break;
      }
    return !0;
  }
  emit(e, i) {
    S(e) && (this.#b[e] || []).forEach((s) => s.handler.call(s.context, i));
  }
  execute(e, i, s) {
  }
  onMouseMove(e) {
    this.#F.x = e.clientX, this.#F.y = e.clientY;
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
      logs: (e) => this.logs = X(e) ? e : !1,
      infos: (e) => this.infos = X(e) ? e : !1,
      warnings: (e) => this.warnings = X(e) ? e : !1,
      errors: (e) => this.errors = X(e) ? e : !1,
      indicators: (e) => this.setIndicators(e),
      theme: (e) => {
        this.#R = this.addTheme(e);
      },
      stream: (e) => this.#z = E(e) ? e : {},
      pricePrecision: (e) => this.setPricePrecision(e),
      volumePrecision: (e) => this.setVolumePrecision(e)
    };
  }
  getInCnt() {
    return this.#M;
  }
  setID(e) {
    S(e) ? this.id = e : this.id = `${Z(_e)}_${this.#M}`;
  }
  setTitle(e) {
    this.Chart.setTitle(e);
  }
  setWatermark(e) {
    this.Chart.setWatermark(e);
  }
  setDimensions(e, i) {
    const s = super.setDimensions(e, i);
    if (this.#$ instanceof rr)
      for (let n in this.#$.instances)
        n.type === "Menu" && n.position();
    this.emit("global_resize", s);
  }
  setUtilsH(e) {
    this.utilsH = e, this.#S.style.height = `${e}px`;
  }
  setToolsW(e) {
    this.toolsW = e, this.#p.style.width = `${e}px`;
  }
  setPricePrecision(e) {
    (!T(e) || e < 0) && (e = ja), this.#q = e;
  }
  setVolumePrecision(e) {
    (!T(e) || e < 0) && (e = Ka), this.#X = e;
  }
  addTheme(e) {
    const i = Mt.create(e, this);
    return this.#I instanceof Mt || (this.#I = i), i;
  }
  setTheme(e) {
    if (!this.theme.list.has(e))
      return !1;
    this.#I.setTheme(e, this);
    const i = this.#I, s = document.querySelector(`style[title=${this.id}_style]`), n = `var(--txc-border-color, ${i.chart.BorderColour}`;
    let o = `.${this.id} { `;
    o += `--txc-background: ${i.chart.Background}; `, this.style.background = `var(--txc-background, ${i.chart.Background})`, this.style.border = `${i.chart.BorderThickness}px solid`, this.style.borderColor = n, o += `--txc-border-color:  ${i.chart.BorderColour}; `, this.#w.rows.style.borderColor = n, o += `--txc-time-scrollbar-color: ${i.chart.BorderColour}; `, o += `--txc-time-handle-color: ${i.xAxis.handle}; `, o += `--txc-time-slider-color: ${i.xAxis.slider}; `, o += `--txc-time-cursor-fore: ${i.xAxis.colourCursor}; `, o += `--txc-time-cursor-back: ${i.xAxis.colourCursorBG}; `, o += `--txc-time-icon-color: ${i.icon.colour}; `, o += `--txc-time-icon-hover-color: ${i.icon.hover}; `, this.#g.overview.scrollBar.style.borderColor = n, this.#g.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${i.xAxis.handle})`, this.#g.overview.style.setProperty("--txc-time-slider-color", i.xAxis.slider), this.#g.overview.style.setProperty("--txc-time-icon-color", i.icon.colour), this.#g.overview.style.setProperty("--txc-time-icon-hover-color", i.icon.hover);
    for (let [a, h] of Object.entries(this.Chart.legend.list))
      h.el.style.color = `var(--txc-legend-color, ${i.legend.colour})`, h.el.style.font = `var(--txc-legend-font, ${i.legend.font})`;
    for (let a of this.#S.icons)
      a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    for (let a of this.#p.icons)
      a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    return o += " }", s.innerHTML = o, !0;
  }
  setScrollPos(e) {
    e = Math.round(e), T(e) && e <= 0 && e >= this.bufferPx * -1 ? this.#H = e : this.emit("Error", "setScrollPos: not a valid value");
  }
  setState(e) {
    if (!Ki.has(e))
      return this.warn(`${this.name} id: ${this.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    this.stream.stop(), this.MainPane.reset(), this.#L = Ki.get(e);
    const i = {
      interval: this.#L.data.chart.tfms,
      core: this
    };
    if (this.getRange(null, null, i), this.range.Length > 1) {
      const s = gs(this.time, void 0), n = s ? s + this.range.initialCnt : this.#L.data.chart.data.length - 1, o = s || n - this.range.initialCnt;
      this.range.initialCnt = n - o, this.setRange(o, n);
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
    if (this.stream instanceof he)
      return this.error("Error: Invoke stopStream() before starting a new one."), !1;
    if (E(e))
      return this.allData.data.length == 0 && S(e.timeFrame) && ({ tf, ms } = fi(e?.timeFrame), this.range.interval = ms, this.range.intervalStr = tf, this.#N.timeFrameMS = ms, this.#N.timeFrame = tf), this.#z = new he(this), this.#f.stream = this.#z.config, this.#z;
  }
  stopStream() {
    this.stream instanceof he && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#U; ) {
      let e = this.range.Length * 0.5;
      this.setRange(e * -1, e), this.off(kt, this.delayedSetRange), this.#U = !1;
    }
  }
  updateRange(e) {
    if (!P(e) || !T(e[4]) || e[4] == 0)
      return;
    let i, s;
    i = e[4], s = this.#H + i, s % this.candleW, s < this.bufferPx * -1 ? (s = 0, this.offsetRange(this.rangeScrollOffset * -1)) : s > 0 && (s = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#H = s, this.emit("scrollUpdate", s);
  }
  offsetRange(e) {
    let i = this.range.indexStart - e, s = this.range.indexEnd - e;
    this.setRange(i, s);
  }
  getRange(e = 0, i = 0, s = {}) {
    this.#x = new us(e, i, s), this.#N.range = this.#x, this.#N.timeFrameMS = this.#x.interval, this.#N.timeFrame = this.#x.intervalStr;
  }
  setRange(e = 0, i = this.rangeLimit) {
    const s = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#x.set(e, i, s), e < 0 && !this.#W ? this.emit("range_limitPast", { chart: this, start: e, end: i }) : i > this.range.dataLength && !this.#W && this.emit("range_limitFuture", { chart: this, start: e, end: i });
  }
  jumpToIndex(e, i = !0, s = !0) {
    i && (e = $(e, 0, this.range.dataLength));
    let n = this.range.Length, o = e + n;
    s && (e -= n / 2, o -= n / 2), this.setRange(e, o);
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
    this.#W = !0;
    let n = this.state.mergeData(e, i, s);
    return X(n) && (this.#W = !1), n;
  }
  isIndicator(e) {
    return !!(typeof e == "function" && "primaryPane" in e.prototype && z(e.prototype?.draw));
  }
  setIndicators(e, i = !1) {
    if (!E(e))
      return !1;
    i && (console.warn("Expunging all default indicators!"), this.#T = {});
    for (const [s, n] of Object.entries(e))
      S(n?.id) && S(n?.name) && S(n?.event) && this.isIndicator(n?.ind) && (this.#T[s] = n);
    return !0;
  }
  addIndicator(e, i = e, s = {}) {
    return this.#D.addIndicator(e, i, s);
  }
  getIndicator(e) {
    return this.#D.getIndicator(e);
  }
  removeIndicator(e) {
    return this.#D.removeIndicator(e);
  }
  indicatorSettings(e, i) {
    return this.#D.indicatorSettings(e, i);
  }
  hasStateIndicator(e, i = "searchAll") {
    if (!S(e) || !S(i))
      return !1;
    const s = function(n, o) {
      for (let a of o)
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
  calcAllIndicators() {
    for (const [e, i] of Object.entries(this.Indicators))
      for (const [s, n] of Object.entries(i))
        n.instance.calcIndicatorHistory();
  }
  addTrade(e) {
    return this.#E.addTrade(e);
  }
  removeTrade(e) {
    return this.#E.removeTrade(e);
  }
  addEvent(e) {
    return this.#E.addEvent(e);
  }
  removeEvent(e) {
    return this.#E.removeEvent(e);
  }
  resize(e, i) {
    return !T(e) && !T(i) ? !1 : (this.setDimensions(e, i), !0);
  }
  refresh() {
    if (!this.ready)
      return;
    let e = this.range.indexStart, i = this.range.indexEnd;
    this.setRange(e, i), this.MainPane.draw(void 0, !0);
  }
  toImageURL(e, i, s, n) {
    return or(this, e, i, s, "url", n);
  }
  downloadImage(e = `${this.id}.png`, i, s, n) {
    or(this, e, i, s, "download", n);
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
      this.implemented = this.#$.insert("Dialogue", i), this.implemented.start();
    }
  }
}
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", Nh), document.head.insertAdjacentHTML("beforeend", $h), customElements.get("tradex-chart") || customElements.define("tradex-chart", I));
export {
  I as Chart,
  D as DOM,
  _t as Indicator,
  V as Overlay,
  us as Range,
  Bt as StateMachine,
  st as canvas,
  ct as copyDeep,
  gd as isPromise,
  ze as mergeDeep,
  Z as uid
};
