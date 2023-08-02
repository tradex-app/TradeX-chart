function Po(r, e) {
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
const Lo = "0.135.0";
function C(r) {
  return Array.isArray(r);
}
function $(r) {
  return r && typeof r == "function";
}
function T(r) {
  return typeof r == "object" && !Array.isArray(r) && r !== null;
}
function E(r) {
  return typeof r == "number" && !isNaN(r);
}
function K(r) {
  return typeof r == "boolean";
}
function S(r) {
  return typeof r == "string";
}
function Wc(r) {
  return !!r && (T(r) || $(r)) && $(r.then);
}
const Ao = ["y", "M", "d", "h", "m", "s", "ms"], Io = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], Oo = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Ro = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Fn = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Do = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Vn = 1231006505e3, Dt = 1, B = 1e3, U = B * 60, G = U * 60, R = G * 24, ne = R * 7, st = R * 30;
function Gn(r = 3, e = !1) {
  let i = Fn[r % 12] * R;
  return e && r > 0 && (i += R), i;
}
const ct = R * 365, Ce = {
  y: ct,
  M: st,
  w: ne,
  d: R,
  h: G,
  m: U,
  s: B,
  u: Dt
}, Yn = {
  years: ct,
  months: st,
  weeks: ne,
  days: R,
  hours: G,
  minutes: U,
  seconds: B,
  milliseconds: Dt
}, ko = { ...Ce, ...Yn }, De = {
  YEARS10: [ct * 10, "years"],
  YEARS5: [ct * 5, "years"],
  YEARS3: [ct * 3, "years"],
  YEARS2: [ct * 2, "years"],
  YEARS: [ct, "years"],
  MONTH6: [st * 6, "months"],
  MONTH4: [st * 4, "months"],
  MONTH3: [st * 3, "months"],
  MONTH2: [st * 2, "months"],
  MONTH: [st, "months"],
  DAY15: [R * 15, "years"],
  DAY10: [R * 10, "days"],
  DAY7: [R * 7, "days"],
  DAY5: [R * 5, "days"],
  DAY3: [R * 3, "days"],
  DAY2: [R * 2, "days"],
  DAY: [R, "days"],
  HOUR12: [G * 12, "hours"],
  HOUR6: [G * 6, "hours"],
  HOUR4: [G * 4, "hours"],
  HOUR2: [G * 2, "hours"],
  HOUR: [G, "hours"],
  MINUTE30: [U * 30, "minutes"],
  MINUTE15: [U * 15, "minutes"],
  MINUTE10: [U * 10, "minutes"],
  MINUTE5: [U * 5, "minutes"],
  MINUTE2: [U * 2, "minutes"],
  MINUTE: [U, "minutes"],
  SECOND30: [B * 30, "seconds"],
  SECOND15: [B * 15, "seconds"],
  SECOND10: [B * 10, "seconds"],
  SECOND5: [B * 5, "seconds"],
  SECOND2: [B * 2, "seconds"],
  SECOND: [B, "seconds"],
  MILLISECOND500: [Dt * 500, "milliseconds"],
  MILLISECOND250: [Dt * 250, "milliseconds"],
  MILLISECOND100: [Dt * 100, "milliseconds"],
  MILLISECOND50: [Dt * 50, "milliseconds"],
  MILLISECOND: [Dt, "milliseconds"]
}, _o = () => {
  const r = Object.values(De), e = [];
  for (let i = r.length; --i; i > 0)
    e[i] = r[i][0];
  return e;
}, xe = _o(), No = () => {
  const r = Object.values(De), e = [];
  for (let i = r.length; --i; i > 0)
    e[i] = r[i][1];
  return e;
}, Xi = No(), $o = Object.keys(De), Ho = () => {
  const r = {};
  for (const [e, i] of Object.entries(De))
    r[e] = i[0];
  return r;
}, Bo = Ho(), ji = {
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
function Uo() {
  const r = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(ji, r) ? ji[r.toString()] : "Etc/UTC";
}
function zo() {
  const r = {};
  for (let e in Ce) {
    let i = 0;
    r[e] = [];
    do
      r[e].push(Math.round(Ce[e] * i)), i += 0.125;
    while (i < 1);
  }
  return r;
}
function qn(r) {
  const e = new Date(r).getTime();
  return E(e);
}
function Xn(r, e = Vn, i = Date.now()) {
  return qn(r) ? r > e && r < i : !1;
}
const Ot = {
  inSeconds: function(r, e) {
    r = new Date(r), e = new Date(e);
    var i = e.getTime(), s = r.getTime();
    return parseInt((i - s) / B);
  },
  inMinutes: function(r, e) {
    r = new Date(r), e = new Date(e);
    let i = e.getTime(), s = r.getTime();
    return parseInt((i - s) / U);
  },
  inHours: function(r, e) {
    r = new Date(r), e = new Date(e);
    let i = e.getTime(), s = r.getTime();
    return parseInt((i - s) / G);
  },
  inDays: function(r, e) {
    r = new Date(r), e = new Date(e);
    let i = e.getTime(), s = r.getTime();
    return parseInt((i - s) / R);
  },
  inWeeks: function(r, e) {
    r = new Date(r), e = new Date(e);
    let i = e.getTime(), s = r.getTime();
    return parseInt((i - s) / ne);
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
function Wo(r, e) {
  let i = Ot.inYears(r, e), s = Ot.inMonths(r, e), n = Ot.inWeeks(r, e), o = Ot.inDays(r, e), a = Ot.inHours(r, e), l = Ot.inMinutes(r, e), c = Ot.inSeconds(r, e), g = new Date(e).getTime() - new Date(r).getTime();
  return {
    y: i,
    M: s,
    w: n,
    d: o,
    h: a,
    m: l,
    s: c,
    ms: g,
    years: i,
    months: s,
    weeks: n,
    days: o,
    hours: a,
    minutes: l,
    seconds: c,
    milliseconds: g
  };
}
function si(r) {
  let e = B;
  return S(r) ? (e = jn(r), e ? r = r : (e = B, r = "1s")) : r = "1s", { tf: r, ms: e };
}
function jn(r) {
  if (!S(r))
    return !1;
  const e = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let i;
  return (i = e.exec(r)) !== null ? Ce[i[2]] * i[1] : !1;
}
function os(r) {
  let e = Math.floor(r / 1e3), i = Math.floor(e / 60);
  e = e % 60;
  let s = Math.floor(i / 60);
  i = i % 60;
  let n = Math.floor(s / 24);
  s = s % 24;
  let o = Math.floor(n / 7);
  n = n % 7;
  let a = Math.floor(o / 4), l = Math.floor(o / 52), c = o % 4;
  return a = a % 13, {
    y: l,
    M: a,
    w: c,
    d: n,
    h: s,
    m: i,
    s: e,
    years: l,
    months: a,
    weeks: c,
    days: n,
    hours: s,
    minutes: i,
    seconds: e
  };
}
function Ee(r) {
  const e = os(r);
  for (const i in e)
    if (e[i])
      return `${e[i]}${i}`;
}
function as(r) {
  return r ? new Date(r).getUTCSeconds() : null;
}
function hs(r) {
  return new Date(r).setUTCMilliseconds(0, 0);
}
function wi(r) {
  return r ? new Date(r).getUTCMinutes() : null;
}
function ls(r) {
  return new Date(r).setUTCSeconds(0, 0);
}
function cs(r) {
  return r ? new Date(r).getUTCHours() : null;
}
function ds(r) {
  return new Date(r).setUTCMinutes(0, 0, 0);
}
function us(r) {
  return r ? new Date(r).getUTCDate() : null;
}
function Fo(r, e = "en-GB", i = "short") {
  return new Date(r).toLocaleDateString(e, { weekday: i });
}
function Me(r) {
  return new Date(r).setUTCHours(0, 0, 0, 0);
}
function fs(r) {
  if (r)
    return new Date(r).getUTCMonth();
}
function Zn(r, e = "en-GB", i = "short") {
  return new Date(r).toLocaleDateString(e, { month: i });
}
function gs(r) {
  let e = new Date(r);
  return Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    1
  );
}
function Kn(r) {
  let e = (fs(r) + 1) % 12;
  return r += Gn(e, xi(r)), r;
}
function Qn(r) {
  if (r)
    return new Date(r).getUTCFullYear();
}
function ps(r) {
  return Date.UTC(new Date(r).getUTCFullYear());
}
function Jn(r) {
  return r = r + ct + R, xi(r), r;
}
function xi(r) {
  let i = new Date(r).getUTCFullYear();
  return i & 3 ? !1 : i % 100 != 0 || i % 400 == 0;
}
function Vo(r) {
  let e = new Date(r), i = e.getUTCMonth(), s = e.getUTCDate(), n = dayCount[i] + s;
  return i > 1 && xi() && n++, n;
}
function ni(r, e) {
  return {
    years: (s) => ps(s),
    months: (s) => gs(s),
    weeks: (s) => Me(s),
    days: (s) => Me(s),
    hours: (s) => ds(s),
    minutes: (s) => ls(s),
    seconds: (s) => hs(s)
  }[e](r);
}
function Go(r, e) {
  let i, s;
  switch (e) {
    case "years":
      i = ps(r), s = Jn(r);
      break;
    case "months":
      i = gs(r), s = Kn(r);
      break;
    case "weeks":
      i = Me(r), s = i + R;
      break;
    case "days":
      i = Me(r), s = i + R;
      break;
    case "hours":
      i = ds(r), s = i + G;
      break;
    case "minutes":
      i = ls(r), s = i + U;
      break;
    case "seconds":
      i = hs(r), s = i + B;
  }
  return { start: i, end: s };
}
function Yo(r) {
  String(us(r)).padStart(2, "0");
}
function tr(r) {
  let e = String(cs(r)).padStart(2, "0"), i = String(wi(r)).padStart(2, "0");
  return `${e}:${i}`;
}
function qo(r) {
  let e = String(cs(r)).padStart(2, "0"), i = String(wi(r)).padStart(2, "0"), s = String(as(r)).padStart(2, "0");
  return `${e}:${i}:${s}`;
}
function Zi(r) {
  let e = String(wi(r)).padStart(2, "0"), i = String(as(r)).padStart(2, "0");
  return `${e}:${i}`;
}
function Xo(r, e) {
  let i = 1 / 0, s = null, n = -1;
  for (let o = 0; o < e.length; o++) {
    let a = e[o][0];
    Math.abs(a - r) < i && (i = Math.abs(a - r), s = e[o], n = o);
  }
  return [n, s];
}
const jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: Vn,
  DAY_MS: R,
  DM: Yo,
  HM: tr,
  HMS: qo,
  HOUR_MS: G,
  MILLISECOND: Dt,
  MINUTE_MS: U,
  MONTHMAP: Do,
  MONTHR_MS: st,
  MONTH_MS: Gn,
  MS: Zi,
  SECOND_MS: B,
  TIMESCALES: xe,
  TIMESCALESKEYS: $o,
  TIMESCALESRANK: Xi,
  TIMESCALESVALUES: De,
  TIMESCALESVALUESKEYS: Bo,
  TIMEUNITS: Ao,
  TIMEUNITSLONG: Io,
  TIMEUNITSVALUES: ko,
  TIMEUNITSVALUESLONG: Yn,
  TIMEUNITSVALUESSHORT: Ce,
  WEEK_MS: ne,
  YEAR_MS: ct,
  buildSubGrads: zo,
  dayCntInc: Oo,
  dayCntLeapInc: Ro,
  dayOfYear: Vo,
  day_start: Me,
  getTimezone: Uo,
  get_day: us,
  get_dayName: Fo,
  get_hour: cs,
  get_minute: wi,
  get_month: fs,
  get_monthName: Zn,
  get_second: as,
  get_year: Qn,
  hour_start: ds,
  interval2MS: jn,
  isLeapYear: xi,
  isTimeFrame: si,
  isValidTimeInRange: Xn,
  isValidTimestamp: qn,
  minute_start: ls,
  monthDayCnt: Fn,
  month_start: gs,
  ms2Interval: Ee,
  ms2TimeUnits: os,
  nearestTs: Xo,
  nextMonth: Kn,
  nextYear: Jn,
  second_start: hs,
  time_start: ni,
  timestampDiff: Ot,
  timestampDifference: Wo,
  timezones: ji,
  unitRange: Go,
  year_start: ps
}, Symbol.toStringTag, { value: "Module" }));
function Zo(r, e) {
  return r = Math.ceil(r) + 1, e = Math.floor(e), Math.floor(Math.random() * (e - r) + r);
}
function Ko(r) {
  const e = {};
  return e.value = r, e.sign = !!r, e.integers = er(r), e.decimals = ir(r), e.total = e.integers + e.decimals, e;
}
function er(r) {
  return (Math.log10((r ^ r >> 31) - (r >> 31)) | 0) + 1;
}
function Qo(r) {
  return r | 0;
}
function Ni(r, e) {
  e = e || 100;
  const i = Math.pow(10, e);
  return Math.round((r + Number.EPSILON) * i) / i;
}
function it(r, e = 0) {
  var i = r * Math.pow(10, e), s = Math.round(i), n = (i > 0 ? i : -i) % 1 === 0.5 ? s % 2 === 0 ? s : s - 1 : s;
  return n / Math.pow(10, e);
}
function ir(r) {
  if (typeof r != "number" && (r = parseFloat(r)), isNaN(r) || !isFinite(r))
    return 0;
  for (var e = 1, i = 0; Math.round(r * e) / e !== r && (e *= 10, e !== 1 / 0); )
    i++;
  return i;
}
function Jo(r) {
  return Math.log(r) / Math.log(10);
}
function ta(r, e) {
  return Math.pow(r, e);
}
function _(r, e, i) {
  return Math.min(i, Math.max(e, r));
}
function Pe(r, e) {
  return !T(r) || !T(e) ? e : (Object.keys(e).forEach((i) => {
    const s = r[i], n = e[i];
    Array.isArray(s) && Array.isArray(n) ? r[i] = Pe(s.concat([]), n) : T(s) && T(n) ? r[i] = Pe(Object.assign({}, s), n) : r[i] = n;
  }), r);
}
function nt(r) {
  if (r === null || typeof r != "object" || "isActiveClone" in r)
    return r;
  if (r instanceof Date)
    var e = new r.constructor();
  else
    var e = Array.isArray(r) ? [] : {};
  for (var i in r)
    Object.prototype.hasOwnProperty.call(r, i) && (r.isActiveClone = null, e[i] = nt(r[i]), delete r.isActiveClone);
  return e;
}
function sr(r, e, i) {
  const [s, ...n] = e.split(".");
  return {
    ...r,
    [s]: n.length ? sr(r[s], n.join("."), i) : i
  };
}
function Xs(r, e) {
  return e.split(".").reduce((s, n) => s && s[n] !== "undefined" ? s[n] : void 0, r);
}
function li(r, e) {
  if (!C(r) || !C(e) || r.length !== e.length)
    return !1;
  let i = r.length;
  for (; i--; ) {
    if (C(r[i]) || C(e[i])) {
      if (!li(r[i], e[i]))
        return !1;
      continue;
    }
    if (T(r[i]) || T(r[i])) {
      if (!T(r[i], e[i]))
        return !1;
      continue;
    }
    if (r[i] !== e[i])
      return !1;
  }
  return !0;
}
function ea(r, e, i) {
  [myArray[e], myArray[i]] = [myArray[i], myArray[e]];
}
function nr(r, e) {
  return C(e) ? C(r) ? r.every((i) => e.includes(i)) : e.includes(r) : !1;
}
function rr(r, e) {
  if (!T(r) || !T(e))
    return !1;
  const i = Object.keys(r).sort(), s = Object.keys(e).sort();
  return i.length !== s.length ? !1 : i.every((o, a) => {
    const l = r[o], c = e[s[a]];
    return C(l) || C(c) ? li(l, c) : T(l) || T(c) ? rr(l, c) : l === c;
  });
}
function et(r = "ID") {
  E(r) ? r = r.toString() : S(r) || (r = "ID"), r = r.replace(/ |,|;|:|\.|#/g, "_");
  const e = Date.now().toString(36), i = Math.random().toString(36).substring(2, 5);
  return `${r}_${e}_${i}`;
}
const ia = (r) => r.entries().next().value, sa = (r) => r.entries().next().value[0], na = (r) => r.entries().next().value[1], ra = (r) => [...r].pop(), oa = (r) => [...r.keys()].pop(), aa = (r) => [...r.values()].pop();
class ft extends Map {
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
    return ia(this);
  }
  firstKey() {
    return sa(this);
  }
  firstValue() {
    return na(this);
  }
  lastEntry() {
    return ra(this);
  }
  lastKey() {
    return oa(this);
  }
  lastValue() {
    return aa(this);
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
    return C(e) ? (arr.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  populate(e) {
    return C(e) ? (this.clear(), arr.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  insertIndex(e, i, s) {
    if (!E(e))
      return !1;
    const n = [...this];
    return n.splice(e, 0, [i, s]), this.populate(n), !0;
  }
  removeIndex(e) {
    if (!E(e))
      return !1;
    const i = [...this];
    return i.splice(e, 1), this.populate(i), !0;
  }
  swapIndices(e, i) {
    if (!E(e) || !E(i))
      return !1;
    const s = [...this];
    return ea(s, e, i), this.populate(s), !0;
  }
  swapKeys(e, i) {
    const s = [...this], n = s.findIndex(([a]) => a === e), o = s.findIndex(([a]) => a === i);
    return [s[n], s[o]] = [s[o], s[n]], this.clear(), s.forEach(([a, l]) => this.set(a, l)), !0;
  }
}
function dt(r, e = 100, i, s = !1) {
  var n, o = function() {
    var a = i || this, l = arguments, c = function() {
      n = null, s || r.apply(a, l);
    }, g = s && !n;
    clearTimeout(n), n = setTimeout(c, e), g && r.apply(a, l);
  };
  return o;
}
function ha(r, e = 250, i) {
  var s, n, o = function() {
    var l = i || this, c = +/* @__PURE__ */ new Date(), g = arguments;
    s && c < s + e ? (clearTimeout(n), n = setTimeout(function() {
      s = c, r.apply(l, g);
    }, e)) : (s = c, r.apply(l, g));
  };
  function a() {
    timeout && (clearTimeout(n), timeout = void 0);
  }
  return o.reset = function() {
    a(), s = 0;
  }, o;
}
class la {
  #t;
  #e;
  #r;
  #s = [];
  constructor(e, i) {
    this.#t = e, this.#e = S(i.id) ? i.id : et, this.#r = S(i.type) ? i.type : "default", this.#s = C(i.data) ? i.data : [];
  }
}
function ca(r, e = !1) {
  if (!C(r))
    return !1;
  let i = Zo(0, r.length);
  if (!ri(r[0], e) || !ri(r[i], e) || !ri(r[r.length - 1], e))
    return !1;
  let s = r[0][0], n = r[1][0], o = r[2][0];
  return !(s > n && n > o);
}
function da(r, e = !1) {
  if (!C(r))
    return !1;
  let i = 0, s = 0;
  for (; i < r.length; ) {
    if (!ri(r[i], e) || r[i][0] < s)
      return !1;
    s = r[i][0], i++;
  }
  return !0;
}
function ri(r, e = !1) {
  return !(!C(r) || r.length !== 6 || e && !Xn(r[0]) || !E(r[1]) || !E(r[2]) || !E(r[3]) || !E(r[4]) || !E(r[5]));
}
function ua(r) {
  for (let e of r)
    for (let i = 0; i < 6; i++)
      e.length = 6, e[i] *= 1;
  return r;
}
const fa = U, ga = "1m", ci = fa, ma = 6, js = 0.05, pa = 100, Zs = 100, Kt = ["default", "percent", "log"], Ks = 0.3, Qs = 30, Ke = 200, Js = 200, tn = 20, en = 4096, Ti = 5, sn = 50, nn = 30, va = 8;
class Ki {
  #t = ci;
  #e = "1s";
  indexStart = 0;
  indexEnd = Ke;
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
  initialCnt = Qs;
  limitFuture = Ke;
  limitPast = Js;
  minCandles = tn;
  maxCandles = en;
  yAxisBounds = Ks;
  rangeLimit = Ke;
  anchor;
  #r;
  #s;
  #i = !0;
  constructor(e, i, s = {}) {
    if (!T(s) || !(s?.core instanceof A))
      return !1;
    this.#i = !0, this.setConfig(s), this.#r = s.core, e = E(e) ? e : 0, i = E(i) ? i : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const n = s?.interval || ci;
    if (this.data.length == 0) {
      let o = Date.now();
      e = 0, i = this.rangeLimit, this.#t = n, this.#e = Ee(this.interval), this.anchor = o - o % n;
    } else
      this.data.length < 2 ? (this.#t = n, this.#e = Ee(this.interval)) : (this.#t = Qi(this.data), this.#e = Ee(this.interval));
    i == 0 && this.data.length >= this.rangeLimit ? i = this.rangeLimit : i == 0 && (i = this.data.length), this.set(e, i);
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
    WebWorker.destroy(this.#s.id);
  }
  set(e = 0, i = this.dataLength, s = this.maxCandles, n) {
    if (!E(e) || !E(i) || !E(s))
      return !1;
    e = e | 0, i = i | 0, s = s | 0, s = _(s, this.minCandles, this.maxCandles), e > i && ([e, i] = [i, e]), i = _(i, e + this.minCandles, e + s);
    let o = i - e;
    e = _(e, this.limitPast * -1, this.dataLength + this.limitFuture - this.minCandles - 1), i = _(i, e + this.minCandles, this.dataLength + this.limitFuture - 1), e = i - e < o ? e - (o - (i - e)) : e;
    const a = e, l = i, c = this.indexStart, g = this.indexEnd;
    let p = this.Length;
    this.indexStart = e, this.indexEnd = i, p -= this.Length;
    let x = this.maxMinPriceVol({ data: this.data, start: this.indexStart, end: this.indexEnd, that: this });
    return this.setMaxMin(x), this.setConfig(n), this.#r.emit("setRange", [a, l, c, g]), !0;
  }
  setConfig(e) {
    if (!T(e))
      return !1;
    this.initialCnt = E(e?.initialCnt) ? e.initialCnt : Qs, this.limitFuture = E(e?.limitFuture) ? e.limitFuture : Ke, this.limitPast = E(e?.limitPast) ? e.limitPast : Js, this.minCandles = E(e?.minCandles) ? e.minCandles : tn, this.maxCandles = E(e?.maxCandles) ? e.maxCandles : en, this.yAxisBounds = E(e?.yAxisBounds) ? e.yAxisBounds : Ks;
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
    E(e) || (e = s.length - 1);
    let n = s[e];
    if (n !== void 0)
      return n;
    {
      const o = s.length - 1;
      return n = [null, null, null, null, null, null], s.length < 1 ? (n[0] = Date.now() + this.interval * e, n) : e < 0 ? (n[0] = s[0][0] + this.interval * e, n) : e > o ? (n[0] = s[o][0] + this.interval * (e - o), n) : null;
    }
  }
  valueByTS(e, i = "") {
    if (!E(e) || !S(i))
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
    if (!E(e))
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
    let i = this.getTimeIndex(e), s = this.#r.rangeScrollOffset;
    return i >= this.indexStart - s && i <= this.indexEnd + s;
  }
  rangeIndex(e) {
    return this.getTimeIndex(e) - this.indexStart;
  }
  maxMinPriceVol(e) {
    let { data: i, start: s, end: n, that: o } = { ...e }, a = it(this.#r.bufferPx / this.#r.candleW);
    if (a = E(a) ? a : 0, s = E(s) ? s - a : 0, s = s > 0 ? s : 0, n = typeof n == "number" ? n : i?.length - 1, i.length == 0)
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
    let l = i.length - 1, c = Yt(s, 0, l), g = Yt(n, 0, l), p = i[c][3], x = i[c][2], M = i[c][5], L = i[c][5], q = c, z = c, ot = c, N = c;
    for (; c++ < g; )
      i[c][3] < p && (p = i[c][3], q = c), i[c][2] > x && (x = i[c][2], z = c), i[c][5] < M && (M = i[c][5], ot = c), i[c][5] > L && (L = i[c][5], N = c);
    let D = x - p;
    return p -= D * o.yAxisBounds, p = p > 0 ? p : 0, x += D * o.yAxisBounds, D = x - p, {
      valueMin: p,
      valueMax: x,
      valueDiff: x - p,
      volumeMin: M,
      volumeMax: L,
      volumeDiff: L - M,
      valueMinIdx: q,
      valueMaxIdx: z,
      volumeMinIdx: ot,
      volumeMaxIdx: N
    };
    function Yt(ce, Ne, qt) {
      return Math.min(qt, Math.max(Ne, ce));
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
function Qi(r) {
  let e = Math.min(r.length - 1, 99), i = 1 / 0;
  return r.slice(0, e).forEach((s, n) => {
    let o = r[n + 1][0] - s[0];
    o === o && o < i && (i = o);
  }), i;
}
function Ji(r, e) {
  if (!E(e))
    return !1;
  let i, s = r.timeFrameMS;
  return e = e - e % s, e === r.range.data[0][0] ? i = 0 : e < r.range.data[0][0] ? i = (r.range.data[0][0] - e) / s * -1 : i = (e - r.range.data[0][0]) / s, i;
}
const we = "TradeX-Chart", Se = "TX", ya = "tradeXutils", rn = "tradeXmenus", wa = "tradeXmenu", on = "tradeXdividers", an = "tradeXwindows", xa = "tradeXwindow", hn = "tradeXprogress", Ta = 500, Ea = "stream_None", be = "stream_Listening", ln = "stream_Started", Sa = "stream_Stopped", ba = "stream_Error", Le = "stream_candleFirst", Ct = "stream_candleUpdate", Ae = "stream_candleNew", Ca = 250, Ma = 8, Pa = 2, La = 2, Aa = "defaultState", Ia = {
  id: Aa,
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
    tf: ga,
    tfms: ci
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
}, cn = {
  timestamp: "number",
  id: "string",
  side: "string",
  price: "number",
  amount: "number",
  filled: "number",
  average: "number",
  total: "number",
  tag: "string"
}, dn = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string",
  url: "string"
};
class O {
  static #t = new ft();
  static get default() {
    return nt(Ia);
  }
  static get list() {
    return O.#t;
  }
  static create(e, i = !1, s = !1) {
    const n = new O(e, i, s), o = n.key;
    return O.#t.set(o, n), n;
  }
  static validate(e, i = !1, s = !1) {
    const n = this.default;
    if (T(e) || (e = {}), T(e.chart) || (e.chart = n.chart, e.chart.isEmpty = !0, e.chart.data = C(e.ohlcv) ? e.ohlcv : [], delete e.ohlcv), e = Pe(n, e), i ? e.chart.data = da(e.chart.data, s) ? e.chart.data : [] : e.chart.data = ca(e.chart.data, s) ? e.chart.data : [], e.chart.isEmpty = e.chart.data.length == 0, !E(e.chart?.tf) || i) {
      let c = Qi(e.chart.data);
      c < B && (c = ci), e.chart.tfms = c;
    }
    if ((!S(e.chart?.tfms) || i) && (e.chart.tf = Ee(e.chart.tfms)), C(e.views) || (e.views = n.views), C(e.primary) || (e.primary = n.primary), C(e.secondary) || (e.secondary = n.secondary), T(e.chart.settings) || (e.chart.settings = n.chart.settings), C(e.datasets) || (e.datasets = []), e.views.length == 0) {
      e.views.push(["primary", e.primary]);
      for (let c in e)
        c.indexOf("secondary") == 0 && e.views.push([c, e[c]]);
    }
    let o = e.views, a = o.length;
    for (; a--; )
      if (!C(o[a]) || o[a].length == 0)
        o.splice(a, 1);
      else {
        let c = e.views[a][1], g = c.length;
        for (; g--; )
          !T(c[g]) && !S(c[g].name) && !S(c[g].type) && !C(c[g].data) ? c.splice(g, 1) : T(c[g].settings) || (c[g].settings = {});
        o[a].length == 0 && o.splice(a, 1);
      }
    e.views.length == 0 && (e.views[0] = ["primary", n.primary]), e.views = new ft(e.views), e.views.has("primary") || e.views.insert("primary", n.primary, 0), e.views.get("primary").push(e.chart);
    for (var l of e.datasets)
      this.#i || (this.#i = {}), this.dss[l.id] = new la(this, l);
    return e;
  }
  static delete(e) {
    if (!S(e) || !O.has(e))
      return !1;
    O.#t.delete(e);
  }
  static has(e) {
    return O.#t.has(e);
  }
  static get(e) {
    return O.#t.get(e);
  }
  static export(e, i = {}) {
    if (!O.has(e))
      return !1;
    T(i) || (i = {});
    const s = O.get(e), n = i?.type, o = nt(s.data), a = o.chart.data;
    let l;
    switch (a.length > 0 && a[a.length - 1].length > 6 && (a.length = a.length - 1), o.views.get("primary").pop(), o.views = Array.from(o.views), n) {
      case "json":
      default:
        const { replacer: c, space: g } = { ...i };
        l = JSON.stringify(o, c, g);
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
  constructor(e, i = !1, s = !1) {
    T(e) ? (this.#s = O.validate(e, i, s), this.#o = "valid", this.#h = !!this.#s.chart?.isEmpty, this.#n = e?.core instanceof A ? e.core : void 0) : (this.#s = O.default, this.#o = "default", this.#h = !0), this.#e = e?.id || "", this.#r = et(`${Se}_state`);
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
  error(e) {
    this.#n.error(e);
  }
  create(e, i, s) {
    return O.create(e, i, s);
  }
  delete(e) {
    if (!S(e))
      return !1;
    if (e !== this.key)
      O.delete(e);
    else if (O.has(e)) {
      const i = O.create();
      this.use(i.key), O.delete(e);
    }
    return !0;
  }
  list() {
    return O.list;
  }
  has(e) {
    return O.has(e);
  }
  get(e) {
    return O.get(e);
  }
  use(e) {
    const i = this.core;
    if (!O.has(e))
      return i.warn(`${i.name} id: ${i.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    i.stream.stop(), i.MainPane.reset();
    let s = O.get(e);
    this.#e = s.id, this.#o = s.status, this.#h = s.isEmpty, this.#s = s.data;
    const n = {
      interval: s.data.chart.tfms,
      core: i
    };
    if (i.getRange(null, null, n), this.range.Length > 1) {
      const o = Ji(i.time, void 0), a = o ? o + this.range.initialCnt : s.data.length - 1, l = o || a - this.range.initialCnt;
      this.range.initialCnt = a - l, i.setRange(l, a);
    }
    i.MainPane.restart(), i.refresh();
  }
  export(e = this.key, i = {}) {
    return O.export(e, i = {});
  }
  mergeData(e, i = !1, s = !1) {
    if (!T(e))
      return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let n = C(e?.ohlcv) ? e.ohlcv.length - 1 : 0;
    if (n > 1 && this.time.timeFrameMS !== Qi(e?.ohlcv))
      return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    (this.#h || !E(this.time.timeFrameMS)) && (!T(i) || !E(i.start) || !E(i.end)) && n > 1 && (i = { start: n - this.range.initialCnt, end: n }), T(i) ? (E(i?.startTS) ? i.start = i.startTS : i.start = E(i.start) ? this.range.value(i.start)[0] : this.range.timeMin, E(i?.endTS) ? i.end = i.endTS : i.end = E(i.end) ? this.range.value(i.end)[0] : this.range.timeMax) : (i = {}, i.start = this.range.timeMin, i.end = this.range.timeMax);
    let o, a, l = e?.ohlcv || !1;
    const c = this.allData.data, g = this.allData?.primaryPane, p = e?.primary || !1;
    this.allData?.secondaryPane;
    const x = e?.secondary || !1;
    this.allData?.dataset?.data;
    const M = e?.dataset?.data || !1;
    this.allData?.trades, e?.trades, this.allData?.events, e?.events;
    const L = C(l) && this.range.inRange(l[0][0]) ? 1 : 0, q = {};
    if (C(l) && l.length > 0) {
      if (o = l.length - 1, c.length - 1, q.mData = this.range.inRange(l[0][0]) && this.range.inRange(l[0][o]), !K(l[o][7]) && l[o].length !== 8 && l[o][6] !== null && l[o][7] !== !0 ? l = ua(l) : i.end >= this.range.timeFinish && i.start <= this.range.timeFinish && (i.start += this.range.interval, i.end += this.range.interval), c.length == 0 ? this.allData.data.push(...l) : (i = i || {
        start: this.range.timeMin,
        end: this.range.timeMax
      }, this.data.chart.data = this.merge(c, l)), s)
        this.#n.calcAllIndicators();
      else {
        if (C(p) && p.length > 0) {
          for (let N of p)
            if (C(N?.data) && N?.data.length > 0)
              for (let D of g)
                D.name === N.name && D.type === N.type && rr(D.settings, N.settings) && (D.data = this.merge(D.data, N.data));
        }
        if (C(x) && x.length > 0)
          for (let N of x)
            C(N?.data) && N?.data.length > 0;
      }
      if (C(M) && M.length > 0)
        for (let N of M)
          C(N?.data) && N?.data.length > 0;
      i && (T(i) ? (a = E(i.start) ? this.range.getTimeIndex(i.start) : this.range.indexStart, n = E(i.end) ? this.range.getTimeIndex(i.end) : this.range.indexEnd) : (l[0][0] && (a = this.range.indexStart + L), n = this.range.indexEnd + L), this.#n.setRange(a, n));
      let z, ot = !1;
      for (z in q)
        ot = ot || z;
      return e.ohlcv.length > 1 && this.#n.emit("state_mergeComplete"), ot && this.#n.refresh(), this.#h = !1, !0;
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
      let l = a + o.length;
      l < n.length && (s = s.concat(n.slice(l)));
    } else if (o[0][0] - n[n.length - 1][0] > this.range.interval) {
      s = n;
      let a = n[n.length - 1][0], l = Math.floor((o[0][0] - a) / this.range.interval);
      for (l; l > 0; l--) {
        let c = Array(o[0].length).fill(null);
        c[0] = a, s.push(c), s = s.concat(o);
      }
    } else
      s = n.concat(o);
    return s;
  }
  addTrade(e) {
    const i = Object.keys(e), s = Object.keys(cn);
    if (!T(e) || !li(i, s))
      return !1;
    for (let a of s)
      if (typeof e[a] !== cn[a])
        return !1;
    const n = e.timestamp - e.timestamp % this.time.timeFrameMS, o = new Date(n);
    return e.dateStr = `${o.getFullYear()}/${o.getMonth() + 1}/${o.getDate()} ${o.getHours()}:${o.getMinutes()}`, C(this.allData.trades[n]) || (this.allData.trades[n] = []), this.allData.trades[n].push(e), !0;
  }
  removeTrade(e) {
    console.log("TODO: state.removeTrade()");
  }
  addEvent(e) {
    const i = Object.keys(e), s = Object.keys(dn);
    if (!T(e) || !li(i, s))
      return !1;
    for (let a of s)
      if (typeof t[a] !== dn[a])
        return !1;
    const n = t.timestamp - t.timestamp % this.time.timeFrameMS, o = new Date(n);
    return e.dateStr = `${o.getFullYear()}/${o.getMonth() + 1}/${o.getDate()} ${o.getHours()}:${o.getMinutes()}`, C(this.allData.events[n]) || (this.allData.events[n] = []), this.allData.events[n].push(e), !0;
  }
  removeEvent(e) {
    console.log("TODO: state.removeEvent()");
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
  constructor(e, i) {
    if (!Ht.validateConfig(e))
      return !1;
    const s = { ...e };
    this.id = s.id, this.#i = s, this.#e = s.initial, this.#s.origin = i, this.#c = s.actions, this.#n = i.core, this.#d();
  }
  set id(e) {
    this.#t = String(e).replace(/ |,|;|:|\.|#/g, "_");
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
  notify(e, i) {
    this.#l = e, this.#a = i;
    const s = this.#i.states[this.#e];
    let n = s.on[e];
    if (!n || !$(n.action) || this.#o !== "running")
      return !1;
    let o = n?.condition?.type || n?.condition || !1;
    if (o && !this.condition.call(this, o, n.condition))
      return !1;
    const a = n.target, l = this.#i.states[a];
    if (s?.onExit.call(this, i), n.action.call(this, i), this.#r = this.#e, this.#e = a, l?.onEnter.call(this, i), this.#i.states[a]?.on && (this.#i.states[a].on[""] || this.#i.states[a].on?.always)) {
      const c = this.#i.states[a].on[""] || this.#i.states[a].on.always;
      if (C(c))
        for (let g of c) {
          let p = g?.condition?.type || g?.condition || !1;
          this.condition.call(this, p, g.condition) && S(g.target) && (g?.action.call(this, i), this.#r = this.#e, this.#e = g?.target, this.notify(null, null));
        }
      else if (T(c) && S(c.target)) {
        let g = c?.condition?.type || c?.condition || !1;
        this.condition.call(this, g, c.condition) && S(c.target) && (c?.action.call(this, i), this.#r = this.#e, this.#e = c.target, this.notify(null, null));
      }
    }
    return this.#e;
  }
  condition(e, i = null, s = {}) {
    return e ? this.#i.guards[e].call(this, this.#s, i, s) : !1;
  }
  canTransition(e) {
    const i = this.#i.states[this.#e];
    return e in i.on;
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
    for (let e in this.#i.states)
      for (let i in this.#i.states[e].on) {
        let s = this.notify.bind(this, i);
        this.#h.add({ topic: i, cb: s }), this.#n.on(i, s, this.context);
      }
  }
  #f() {
    for (let e of this.#h)
      this.#n.off(e.topic, e.cb);
  }
  static validateConfig(e) {
    if (!T(e))
      return !1;
    const i = ["id", "initial", "context", "states"];
    let s = Object.keys(e);
    if (!nr(i, s) || !(e.initial in e.states))
      return !1;
    for (let n in e.states) {
      if (!T(e.states[n]) || "onEnter" in e.states[n] && !$(e.states[n].onEnter) || "onExit" in e.states[n] && !$(e.states[n].onExit))
        return !1;
      if ("on" in e.states[n])
        for (let o in e.states[n].on) {
          let a = e.states[n].on[o];
          if (!S(a.target) || "action" in a && !$(a.action))
            return !1;
        }
    }
    return !0;
  }
}
const Oa = "alert";
class Ra {
  #t = new ft();
  #e = {};
  constructor(e) {
    if (C(e))
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
    if (C(e)) {
      let i = [];
      for (let s of e)
        i.push(this.add(s?.price, s?.condition, s?.handler));
      return i;
    } else
      return !1;
  }
  add(e, i, s) {
    if (isNaN(e) || !$(s))
      return !1;
    const n = et(Oa), o = { price: e, condition: i };
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
    if (!(!C(e) || !C(i))) {
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
const Da = 0, ka = 1, _a = 2, Na = 3, $a = 4, Ha = 5, Qe = [null, null, null, null, null], Je = {
  tfCountDown: !0,
  alerts: []
};
class Jt {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h = Qe;
  #l = 0;
  #a = 0;
  #c = "";
  #u = !1;
  #d;
  #f;
  #v = Qe;
  #w;
  static validateConfig(e) {
    if (T(e)) {
      let i = nt(Je);
      e = Pe(i, e), e.tfCountDown = K(e.tfCountDown) ? e.tfCountDown : Je.tfCountDown, e.alerts = C(e.alerts) ? e.alerts : Je.alerts;
    } else
      return Je;
    return e;
  }
  constructor(e) {
    this.#t = e, this.#s = e.time, this.status = { status: Ea }, this.#e = Jt.validateConfig(e.config?.stream), this.#i = E(e.config?.maxCandleUpdate) ? e.config.maxCandleUpdate : Ca, this.#o = E(e.config?.streamPrecision) ? e.config.streamPrecision : Ma;
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
  set status({ status: e, data: i }) {
    this.#r = e, this.emit(e, i);
  }
  set dataReceived(e) {
    this.#u || (this.#u = !0, this.status = { status: Le, data: e });
  }
  get alerts() {
    return this.#w;
  }
  get lastPriceMin() {
    return this.#f;
  }
  set lastPriceMin(e) {
    E(e) && (this.#f = e);
  }
  get lastPriceMax() {
    return this.#d;
  }
  set lastPriceMax(e) {
    E(e) && (this.#d = e);
  }
  get lastTick() {
    return this.#v;
  }
  set lastTick(e) {
    C(e) && (this.#v, this.#v = e, this.alerts.check(e, this.#h));
  }
  set candle(e) {
    const i = [...this.#h];
    e.t = this.roundTime(new Date(e.t)), e.o = e.o * 1, e.h = e.h * 1, e.l = e.l * 1, e.c = e.c * 1, e.v = e.v * 1, this.#h[Da] !== e.t ? this.newCandle(e) : this.updateCandle(e), this.status = { status: be, data: this.#h }, this.lastTick = i;
  }
  get candle() {
    return this.#h !== Qe ? this.#h : null;
  }
  start() {
    this.#w = new Ra(this.#e.alerts), this.status = { status: ln }, this.#n = setInterval(this.onUpdate.bind(this), this.#i);
  }
  stop() {
    this.#w.destroy(), this.status = { status: Sa };
  }
  emit(e, i) {
    this.#t.emit(e, i);
  }
  error() {
    this.status = { status: ba };
  }
  onTick(e) {
    (this.#r == ln || this.#r == be) && T(e) && (this.candle = e);
  }
  onUpdate() {
    this.#h !== Qe && (this.status = { status: Ct, data: this.candle }, this.status = { status: be, data: this.#h });
  }
  newCandle(e) {
    this.prevCandle(), this.#h = [
      e.t,
      e.o,
      e.h,
      e.l,
      e.c,
      e.v,
      null,
      !0
    ], this.#t.state.mergeData({ ohlcv: [this.#h] }, !0, !1), this.status = { status: Ae, data: { data: e, candle: this.#h } }, this.#a = this.#s.timeFrameMS, this.#l = this.roundTime(Date.now());
  }
  prevCandle() {
    const e = this.#t.allData.data;
    e.length > 0 && e[e.length - 1][7] && (e[e.length - 1].length = 6);
  }
  updateCandle(e) {
    let i = this.#h;
    i[ka] = e.o, i[_a] = e.h, i[Na] = e.l, i[$a] = e.c, i[Ha] = e.v, this.#h = i;
    const s = this.#t.allData.data, n = s.length > 0 ? s.length - 1 : 0;
    s[n] = this.#h, this.countDownUpdate();
  }
  countDownUpdate() {
    let e, i, s, n, o, a, l;
    this.#s.timeFrameMS;
    let c = this.#s.timeFrameMS - (Date.now() - this.#l);
    return c < 0 && (c = 0), this.#a = c, c > ct ? (e = String(Math.floor(c / ct)), i = String(Math.floor(c % ct / st)).padStart(2, "0"), this.#c = `${e}Y ${i}M`) : c > st ? (i = String(Math.floor(c / st)).padStart(2, "0"), n = String(Math.floor(c % st / R)).padStart(2, "0"), this.#c = `${i}M ${n}D`) : c > ne ? (s = String(Math.floor(c / ne)).padStart(2, "0"), n = String(Math.floor(c % st / R)).padStart(2, "0"), this.#c = `${s}W ${n}D`) : c > R ? (n = String(Math.floor(c / R)).padStart(2, "0"), o = String(Math.floor(c % R / G)).padStart(2, "0"), a = String(Math.floor(c % G / U)).padStart(2, "0"), this.#c = `${n}D ${o}:${a}`) : c > G ? (o = String(Math.floor(c / G)).padStart(2, "0"), a = String(Math.floor(c % G / U)).padStart(2, "0"), l = String(Math.floor(c % U / B)).padStart(2, "0"), this.#c = `${o}:${a}:${l}`) : c > U ? (a = String(Math.floor(c / U)).padStart(2, "0"), l = String(Math.floor(c % U / B)).padStart(2, "0"), this.#c = `00:${a}:${l}`) : (l = String(Math.floor(c / B)).padStart(2, "0"), String(c % B).padStart(4, "0"), this.#c = `00:00:${l}`), this.#c;
  }
  roundTime(e) {
    return e - e % this.#t.time.timeFrameMS;
  }
}
const or = {
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
    s.src = r, s.complete ? e(s) : (s.onload = () => e(s), s.onerror = () => e(!1));
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
    let o = n.right - n.left, a = n.bottom - n.top, l = this.isVisible(r), c = this.isInViewport(r);
    return { top: i, left: e, width: o, height: a, visible: l, viewport: c };
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
    if (!this.isSVG(r) || !E(i?.w) || !E(i?.h))
      return !1;
    let s = i.w, n = i.h, o = document.createElement("canvas");
    o.width = s, o.height = n;
    let a = this.htmlToElement(r);
    a.style.fill = e, a.setAttribute("width", s), a.setAttribute("height", n), a.xmlns = "http://www.w3.org/2000/svg";
    let l = new XMLSerializer().serializeToString(a), p = "data:image/svg+xml;base64," + btoa(l), x = new Image();
    return x.setAttribute("width", s), x.setAttribute("height", n), x.onload = () => {
      o.getContext("2d").drawImage(x, 0, 0, s, n);
    }, x.src = p, x;
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
      !r.contains(n.target) && or.isVisible(r) && (e(), s());
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
    if (!r || !T(r))
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
}, I = or, Ba = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const Ua = ((r) => "onorientationchange" in r || r.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in r || r.DocumentTouch && document instanceof r.DocumentTouch)(typeof window < "u" ? window : {}), za = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class Vt {
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
    E(e) && (this.#t = e);
  }
  get x() {
    return this.#t;
  }
  set y(e) {
    E(e) && (this.#e = e);
  }
  get y() {
    return this.#e;
  }
  clone() {
    return new Vt(this.x, this.y);
  }
}
function Wa(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var ar = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(r) {
  (function(e, i, s, n) {
    var o = ["", "webkit", "Moz", "MS", "ms", "o"], a = i.createElement("div"), l = "function", c = Math.round, g = Math.abs, p = Date.now;
    function x(h, u, f) {
      return setTimeout(Yt(h, f), u);
    }
    function M(h, u, f) {
      return Array.isArray(h) ? (L(h, f[u], f), !0) : !1;
    }
    function L(h, u, f) {
      var m;
      if (h)
        if (h.forEach)
          h.forEach(u, f);
        else if (h.length !== n)
          for (m = 0; m < h.length; )
            u.call(f, h[m], m, h), m++;
        else
          for (m in h)
            h.hasOwnProperty(m) && u.call(f, h[m], m, h);
    }
    function q(h, u, f) {
      var m = "DEPRECATED METHOD: " + u + `
` + f + ` AT 
`;
      return function() {
        var v = new Error("get-stack-trace"), b = v && v.stack ? v.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", P = e.console && (e.console.warn || e.console.log);
        return P && P.call(e.console, m, b), h.apply(this, arguments);
      };
    }
    var z;
    typeof Object.assign != "function" ? z = function(u) {
      if (u === n || u === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var f = Object(u), m = 1; m < arguments.length; m++) {
        var v = arguments[m];
        if (v !== n && v !== null)
          for (var b in v)
            v.hasOwnProperty(b) && (f[b] = v[b]);
      }
      return f;
    } : z = Object.assign;
    var ot = q(function(u, f, m) {
      for (var v = Object.keys(f), b = 0; b < v.length; )
        (!m || m && u[v[b]] === n) && (u[v[b]] = f[v[b]]), b++;
      return u;
    }, "extend", "Use `assign`."), N = q(function(u, f) {
      return ot(u, f, !0);
    }, "merge", "Use `assign`.");
    function D(h, u, f) {
      var m = u.prototype, v;
      v = h.prototype = Object.create(m), v.constructor = h, v._super = m, f && z(v, f);
    }
    function Yt(h, u) {
      return function() {
        return h.apply(u, arguments);
      };
    }
    function ce(h, u) {
      return typeof h == l ? h.apply(u && u[0] || n, u) : h;
    }
    function Ne(h, u) {
      return h === n ? u : h;
    }
    function qt(h, u, f) {
      L(He(u), function(m) {
        h.addEventListener(m, f, !1);
      });
    }
    function $e(h, u, f) {
      L(He(u), function(m) {
        h.removeEventListener(m, f, !1);
      });
    }
    function Cs(h, u) {
      for (; h; ) {
        if (h == u)
          return !0;
        h = h.parentNode;
      }
      return !1;
    }
    function Bt(h, u) {
      return h.indexOf(u) > -1;
    }
    function He(h) {
      return h.trim().split(/\s+/g);
    }
    function Xt(h, u, f) {
      if (h.indexOf && !f)
        return h.indexOf(u);
      for (var m = 0; m < h.length; ) {
        if (f && h[m][f] == u || !f && h[m] === u)
          return m;
        m++;
      }
      return -1;
    }
    function Be(h) {
      return Array.prototype.slice.call(h, 0);
    }
    function Ms(h, u, f) {
      for (var m = [], v = [], b = 0; b < h.length; ) {
        var P = u ? h[b][u] : h[b];
        Xt(v, P) < 0 && m.push(h[b]), v[b] = P, b++;
      }
      return f && (u ? m = m.sort(function(V, Z) {
        return V[u] > Z[u];
      }) : m = m.sort()), m;
    }
    function Ue(h, u) {
      for (var f, m, v = u[0].toUpperCase() + u.slice(1), b = 0; b < o.length; ) {
        if (f = o[b], m = f ? f + v : u, m in h)
          return m;
        b++;
      }
      return n;
    }
    var Gr = 1;
    function Yr() {
      return Gr++;
    }
    function Ps(h) {
      var u = h.ownerDocument || h;
      return u.defaultView || u.parentWindow || e;
    }
    var qr = /mobile|tablet|ip(ad|hone|od)|android/i, Ls = "ontouchstart" in e, Xr = Ue(e, "PointerEvent") !== n, jr = Ls && qr.test(navigator.userAgent), de = "touch", Zr = "pen", Ci = "mouse", Kr = "kinect", Qr = 25, j = 1, Ut = 2, H = 4, Q = 8, ze = 1, ue = 2, fe = 4, ge = 8, me = 16, xt = ue | fe, zt = ge | me, As = xt | zt, Is = ["x", "y"], We = ["clientX", "clientY"];
    function at(h, u) {
      var f = this;
      this.manager = h, this.callback = u, this.element = h.element, this.target = h.options.inputTarget, this.domHandler = function(m) {
        ce(h.options.enable, [h]) && f.handler(m);
      }, this.init();
    }
    at.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && qt(this.element, this.evEl, this.domHandler), this.evTarget && qt(this.target, this.evTarget, this.domHandler), this.evWin && qt(Ps(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && $e(this.element, this.evEl, this.domHandler), this.evTarget && $e(this.target, this.evTarget, this.domHandler), this.evWin && $e(Ps(this.element), this.evWin, this.domHandler);
      }
    };
    function Jr(h) {
      var u, f = h.options.inputClass;
      return f ? u = f : Xr ? u = Pi : jr ? u = Ge : Ls ? u = Li : u = Ve, new u(h, to);
    }
    function to(h, u, f) {
      var m = f.pointers.length, v = f.changedPointers.length, b = u & j && m - v === 0, P = u & (H | Q) && m - v === 0;
      f.isFirst = !!b, f.isFinal = !!P, b && (h.session = {}), f.eventType = u, eo(h, f), h.emit("hammer.input", f), h.recognize(f), h.session.prevInput = f;
    }
    function eo(h, u) {
      var f = h.session, m = u.pointers, v = m.length;
      f.firstInput || (f.firstInput = Os(u)), v > 1 && !f.firstMultiple ? f.firstMultiple = Os(u) : v === 1 && (f.firstMultiple = !1);
      var b = f.firstInput, P = f.firstMultiple, W = P ? P.center : b.center, V = u.center = Rs(m);
      u.timeStamp = p(), u.deltaTime = u.timeStamp - b.timeStamp, u.angle = Mi(W, V), u.distance = Fe(W, V), io(f, u), u.offsetDirection = ks(u.deltaX, u.deltaY);
      var Z = Ds(u.deltaTime, u.deltaX, u.deltaY);
      u.overallVelocityX = Z.x, u.overallVelocityY = Z.y, u.overallVelocity = g(Z.x) > g(Z.y) ? Z.x : Z.y, u.scale = P ? ro(P.pointers, m) : 1, u.rotation = P ? no(P.pointers, m) : 0, u.maxPointers = f.prevInput ? u.pointers.length > f.prevInput.maxPointers ? u.pointers.length : f.prevInput.maxPointers : u.pointers.length, so(f, u);
      var Et = h.element;
      Cs(u.srcEvent.target, Et) && (Et = u.srcEvent.target), u.target = Et;
    }
    function io(h, u) {
      var f = u.center, m = h.offsetDelta || {}, v = h.prevDelta || {}, b = h.prevInput || {};
      (u.eventType === j || b.eventType === H) && (v = h.prevDelta = {
        x: b.deltaX || 0,
        y: b.deltaY || 0
      }, m = h.offsetDelta = {
        x: f.x,
        y: f.y
      }), u.deltaX = v.x + (f.x - m.x), u.deltaY = v.y + (f.y - m.y);
    }
    function so(h, u) {
      var f = h.lastInterval || u, m = u.timeStamp - f.timeStamp, v, b, P, W;
      if (u.eventType != Q && (m > Qr || f.velocity === n)) {
        var V = u.deltaX - f.deltaX, Z = u.deltaY - f.deltaY, Et = Ds(m, V, Z);
        b = Et.x, P = Et.y, v = g(Et.x) > g(Et.y) ? Et.x : Et.y, W = ks(V, Z), h.lastInterval = u;
      } else
        v = f.velocity, b = f.velocityX, P = f.velocityY, W = f.direction;
      u.velocity = v, u.velocityX = b, u.velocityY = P, u.direction = W;
    }
    function Os(h) {
      for (var u = [], f = 0; f < h.pointers.length; )
        u[f] = {
          clientX: c(h.pointers[f].clientX),
          clientY: c(h.pointers[f].clientY)
        }, f++;
      return {
        timeStamp: p(),
        pointers: u,
        center: Rs(u),
        deltaX: h.deltaX,
        deltaY: h.deltaY
      };
    }
    function Rs(h) {
      var u = h.length;
      if (u === 1)
        return {
          x: c(h[0].clientX),
          y: c(h[0].clientY)
        };
      for (var f = 0, m = 0, v = 0; v < u; )
        f += h[v].clientX, m += h[v].clientY, v++;
      return {
        x: c(f / u),
        y: c(m / u)
      };
    }
    function Ds(h, u, f) {
      return {
        x: u / h || 0,
        y: f / h || 0
      };
    }
    function ks(h, u) {
      return h === u ? ze : g(h) >= g(u) ? h < 0 ? ue : fe : u < 0 ? ge : me;
    }
    function Fe(h, u, f) {
      f || (f = Is);
      var m = u[f[0]] - h[f[0]], v = u[f[1]] - h[f[1]];
      return Math.sqrt(m * m + v * v);
    }
    function Mi(h, u, f) {
      f || (f = Is);
      var m = u[f[0]] - h[f[0]], v = u[f[1]] - h[f[1]];
      return Math.atan2(v, m) * 180 / Math.PI;
    }
    function no(h, u) {
      return Mi(u[1], u[0], We) + Mi(h[1], h[0], We);
    }
    function ro(h, u) {
      return Fe(u[0], u[1], We) / Fe(h[0], h[1], We);
    }
    var oo = {
      mousedown: j,
      mousemove: Ut,
      mouseup: H
    }, ao = "mousedown", ho = "mousemove mouseup";
    function Ve() {
      this.evEl = ao, this.evWin = ho, this.pressed = !1, at.apply(this, arguments);
    }
    D(Ve, at, {
      handler: function(u) {
        var f = oo[u.type];
        f & j && u.button === 0 && (this.pressed = !0), f & Ut && u.which !== 1 && (f = H), this.pressed && (f & H && (this.pressed = !1), this.callback(this.manager, f, {
          pointers: [u],
          changedPointers: [u],
          pointerType: Ci,
          srcEvent: u
        }));
      }
    });
    var lo = {
      pointerdown: j,
      pointermove: Ut,
      pointerup: H,
      pointercancel: Q,
      pointerout: Q
    }, co = {
      2: de,
      3: Zr,
      4: Ci,
      5: Kr
    }, _s = "pointerdown", Ns = "pointermove pointerup pointercancel";
    e.MSPointerEvent && !e.PointerEvent && (_s = "MSPointerDown", Ns = "MSPointerMove MSPointerUp MSPointerCancel");
    function Pi() {
      this.evEl = _s, this.evWin = Ns, at.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    D(Pi, at, {
      handler: function(u) {
        var f = this.store, m = !1, v = u.type.toLowerCase().replace("ms", ""), b = lo[v], P = co[u.pointerType] || u.pointerType, W = P == de, V = Xt(f, u.pointerId, "pointerId");
        b & j && (u.button === 0 || W) ? V < 0 && (f.push(u), V = f.length - 1) : b & (H | Q) && (m = !0), !(V < 0) && (f[V] = u, this.callback(this.manager, b, {
          pointers: f,
          changedPointers: [u],
          pointerType: P,
          srcEvent: u
        }), m && f.splice(V, 1));
      }
    });
    var uo = {
      touchstart: j,
      touchmove: Ut,
      touchend: H,
      touchcancel: Q
    }, fo = "touchstart", go = "touchstart touchmove touchend touchcancel";
    function $s() {
      this.evTarget = fo, this.evWin = go, this.started = !1, at.apply(this, arguments);
    }
    D($s, at, {
      handler: function(u) {
        var f = uo[u.type];
        if (f === j && (this.started = !0), !!this.started) {
          var m = mo.call(this, u, f);
          f & (H | Q) && m[0].length - m[1].length === 0 && (this.started = !1), this.callback(this.manager, f, {
            pointers: m[0],
            changedPointers: m[1],
            pointerType: de,
            srcEvent: u
          });
        }
      }
    });
    function mo(h, u) {
      var f = Be(h.touches), m = Be(h.changedTouches);
      return u & (H | Q) && (f = Ms(f.concat(m), "identifier", !0)), [f, m];
    }
    var po = {
      touchstart: j,
      touchmove: Ut,
      touchend: H,
      touchcancel: Q
    }, vo = "touchstart touchmove touchend touchcancel";
    function Ge() {
      this.evTarget = vo, this.targetIds = {}, at.apply(this, arguments);
    }
    D(Ge, at, {
      handler: function(u) {
        var f = po[u.type], m = yo.call(this, u, f);
        m && this.callback(this.manager, f, {
          pointers: m[0],
          changedPointers: m[1],
          pointerType: de,
          srcEvent: u
        });
      }
    });
    function yo(h, u) {
      var f = Be(h.touches), m = this.targetIds;
      if (u & (j | Ut) && f.length === 1)
        return m[f[0].identifier] = !0, [f, f];
      var v, b, P = Be(h.changedTouches), W = [], V = this.target;
      if (b = f.filter(function(Z) {
        return Cs(Z.target, V);
      }), u === j)
        for (v = 0; v < b.length; )
          m[b[v].identifier] = !0, v++;
      for (v = 0; v < P.length; )
        m[P[v].identifier] && W.push(P[v]), u & (H | Q) && delete m[P[v].identifier], v++;
      if (W.length)
        return [
          Ms(b.concat(W), "identifier", !0),
          W
        ];
    }
    var wo = 2500, Hs = 25;
    function Li() {
      at.apply(this, arguments);
      var h = Yt(this.handler, this);
      this.touch = new Ge(this.manager, h), this.mouse = new Ve(this.manager, h), this.primaryTouch = null, this.lastTouches = [];
    }
    D(Li, at, {
      handler: function(u, f, m) {
        var v = m.pointerType == de, b = m.pointerType == Ci;
        if (!(b && m.sourceCapabilities && m.sourceCapabilities.firesTouchEvents)) {
          if (v)
            xo.call(this, f, m);
          else if (b && To.call(this, m))
            return;
          this.callback(u, f, m);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function xo(h, u) {
      h & j ? (this.primaryTouch = u.changedPointers[0].identifier, Bs.call(this, u)) : h & (H | Q) && Bs.call(this, u);
    }
    function Bs(h) {
      var u = h.changedPointers[0];
      if (u.identifier === this.primaryTouch) {
        var f = { x: u.clientX, y: u.clientY };
        this.lastTouches.push(f);
        var m = this.lastTouches, v = function() {
          var b = m.indexOf(f);
          b > -1 && m.splice(b, 1);
        };
        setTimeout(v, wo);
      }
    }
    function To(h) {
      for (var u = h.srcEvent.clientX, f = h.srcEvent.clientY, m = 0; m < this.lastTouches.length; m++) {
        var v = this.lastTouches[m], b = Math.abs(u - v.x), P = Math.abs(f - v.y);
        if (b <= Hs && P <= Hs)
          return !0;
      }
      return !1;
    }
    var Us = Ue(a.style, "touchAction"), zs = Us !== n, Ws = "compute", Fs = "auto", Ai = "manipulation", Wt = "none", pe = "pan-x", ve = "pan-y", Ye = So();
    function Ii(h, u) {
      this.manager = h, this.set(u);
    }
    Ii.prototype = {
      set: function(h) {
        h == Ws && (h = this.compute()), zs && this.manager.element.style && Ye[h] && (this.manager.element.style[Us] = h), this.actions = h.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var h = [];
        return L(this.manager.recognizers, function(u) {
          ce(u.options.enable, [u]) && (h = h.concat(u.getTouchAction()));
        }), Eo(h.join(" "));
      },
      preventDefaults: function(h) {
        var u = h.srcEvent, f = h.offsetDirection;
        if (this.manager.session.prevented) {
          u.preventDefault();
          return;
        }
        var m = this.actions, v = Bt(m, Wt) && !Ye[Wt], b = Bt(m, ve) && !Ye[ve], P = Bt(m, pe) && !Ye[pe];
        if (v) {
          var W = h.pointers.length === 1, V = h.distance < 2, Z = h.deltaTime < 250;
          if (W && V && Z)
            return;
        }
        if (!(P && b) && (v || b && f & xt || P && f & zt))
          return this.preventSrc(u);
      },
      preventSrc: function(h) {
        this.manager.session.prevented = !0, h.preventDefault();
      }
    };
    function Eo(h) {
      if (Bt(h, Wt))
        return Wt;
      var u = Bt(h, pe), f = Bt(h, ve);
      return u && f ? Wt : u || f ? u ? pe : ve : Bt(h, Ai) ? Ai : Fs;
    }
    function So() {
      if (!zs)
        return !1;
      var h = {}, u = e.CSS && e.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(f) {
        h[f] = u ? e.CSS.supports("touch-action", f) : !0;
      }), h;
    }
    var qe = 1, ht = 2, jt = 4, It = 8, Pt = It, ye = 16, Tt = 32;
    function Lt(h) {
      this.options = z({}, this.defaults, h || {}), this.id = Yr(), this.manager = null, this.options.enable = Ne(this.options.enable, !0), this.state = qe, this.simultaneous = {}, this.requireFail = [];
    }
    Lt.prototype = {
      defaults: {},
      set: function(h) {
        return z(this.options, h), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(h) {
        if (M(h, "recognizeWith", this))
          return this;
        var u = this.simultaneous;
        return h = Xe(h, this), u[h.id] || (u[h.id] = h, h.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(h) {
        return M(h, "dropRecognizeWith", this) ? this : (h = Xe(h, this), delete this.simultaneous[h.id], this);
      },
      requireFailure: function(h) {
        if (M(h, "requireFailure", this))
          return this;
        var u = this.requireFail;
        return h = Xe(h, this), Xt(u, h) === -1 && (u.push(h), h.requireFailure(this)), this;
      },
      dropRequireFailure: function(h) {
        if (M(h, "dropRequireFailure", this))
          return this;
        h = Xe(h, this);
        var u = Xt(this.requireFail, h);
        return u > -1 && this.requireFail.splice(u, 1), this;
      },
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function(h) {
        return !!this.simultaneous[h.id];
      },
      emit: function(h) {
        var u = this, f = this.state;
        function m(v) {
          u.manager.emit(v, h);
        }
        f < It && m(u.options.event + Vs(f)), m(u.options.event), h.additionalEvent && m(h.additionalEvent), f >= It && m(u.options.event + Vs(f));
      },
      tryEmit: function(h) {
        if (this.canEmit())
          return this.emit(h);
        this.state = Tt;
      },
      canEmit: function() {
        for (var h = 0; h < this.requireFail.length; ) {
          if (!(this.requireFail[h].state & (Tt | qe)))
            return !1;
          h++;
        }
        return !0;
      },
      recognize: function(h) {
        var u = z({}, h);
        if (!ce(this.options.enable, [this, u])) {
          this.reset(), this.state = Tt;
          return;
        }
        this.state & (Pt | ye | Tt) && (this.state = qe), this.state = this.process(u), this.state & (ht | jt | It | ye) && this.tryEmit(u);
      },
      process: function(h) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function Vs(h) {
      return h & ye ? "cancel" : h & It ? "end" : h & jt ? "move" : h & ht ? "start" : "";
    }
    function Gs(h) {
      return h == me ? "down" : h == ge ? "up" : h == ue ? "left" : h == fe ? "right" : "";
    }
    function Xe(h, u) {
      var f = u.manager;
      return f ? f.get(h) : h;
    }
    function gt() {
      Lt.apply(this, arguments);
    }
    D(gt, Lt, {
      defaults: {
        pointers: 1
      },
      attrTest: function(h) {
        var u = this.options.pointers;
        return u === 0 || h.pointers.length === u;
      },
      process: function(h) {
        var u = this.state, f = h.eventType, m = u & (ht | jt), v = this.attrTest(h);
        return m && (f & Q || !v) ? u | ye : m || v ? f & H ? u | It : u & ht ? u | jt : ht : Tt;
      }
    });
    function je() {
      gt.apply(this, arguments), this.pX = null, this.pY = null;
    }
    D(je, gt, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: As
      },
      getTouchAction: function() {
        var h = this.options.direction, u = [];
        return h & xt && u.push(ve), h & zt && u.push(pe), u;
      },
      directionTest: function(h) {
        var u = this.options, f = !0, m = h.distance, v = h.direction, b = h.deltaX, P = h.deltaY;
        return v & u.direction || (u.direction & xt ? (v = b === 0 ? ze : b < 0 ? ue : fe, f = b != this.pX, m = Math.abs(h.deltaX)) : (v = P === 0 ? ze : P < 0 ? ge : me, f = P != this.pY, m = Math.abs(h.deltaY))), h.direction = v, f && m > u.threshold && v & u.direction;
      },
      attrTest: function(h) {
        return gt.prototype.attrTest.call(this, h) && (this.state & ht || !(this.state & ht) && this.directionTest(h));
      },
      emit: function(h) {
        this.pX = h.deltaX, this.pY = h.deltaY;
        var u = Gs(h.direction);
        u && (h.additionalEvent = this.options.event + u), this._super.emit.call(this, h);
      }
    });
    function Oi() {
      gt.apply(this, arguments);
    }
    D(Oi, gt, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Wt];
      },
      attrTest: function(h) {
        return this._super.attrTest.call(this, h) && (Math.abs(h.scale - 1) > this.options.threshold || this.state & ht);
      },
      emit: function(h) {
        if (h.scale !== 1) {
          var u = h.scale < 1 ? "in" : "out";
          h.additionalEvent = this.options.event + u;
        }
        this._super.emit.call(this, h);
      }
    });
    function Ri() {
      Lt.apply(this, arguments), this._timer = null, this._input = null;
    }
    D(Ri, Lt, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [Fs];
      },
      process: function(h) {
        var u = this.options, f = h.pointers.length === u.pointers, m = h.distance < u.threshold, v = h.deltaTime > u.time;
        if (this._input = h, !m || !f || h.eventType & (H | Q) && !v)
          this.reset();
        else if (h.eventType & j)
          this.reset(), this._timer = x(function() {
            this.state = Pt, this.tryEmit();
          }, u.time, this);
        else if (h.eventType & H)
          return Pt;
        return Tt;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(h) {
        this.state === Pt && (h && h.eventType & H ? this.manager.emit(this.options.event + "up", h) : (this._input.timeStamp = p(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Di() {
      gt.apply(this, arguments);
    }
    D(Di, gt, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Wt];
      },
      attrTest: function(h) {
        return this._super.attrTest.call(this, h) && (Math.abs(h.rotation) > this.options.threshold || this.state & ht);
      }
    });
    function ki() {
      gt.apply(this, arguments);
    }
    D(ki, gt, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: xt | zt,
        pointers: 1
      },
      getTouchAction: function() {
        return je.prototype.getTouchAction.call(this);
      },
      attrTest: function(h) {
        var u = this.options.direction, f;
        return u & (xt | zt) ? f = h.overallVelocity : u & xt ? f = h.overallVelocityX : u & zt && (f = h.overallVelocityY), this._super.attrTest.call(this, h) && u & h.offsetDirection && h.distance > this.options.threshold && h.maxPointers == this.options.pointers && g(f) > this.options.velocity && h.eventType & H;
      },
      emit: function(h) {
        var u = Gs(h.offsetDirection);
        u && this.manager.emit(this.options.event + u, h), this.manager.emit(this.options.event, h);
      }
    });
    function Ze() {
      Lt.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    D(Ze, Lt, {
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
        return [Ai];
      },
      process: function(h) {
        var u = this.options, f = h.pointers.length === u.pointers, m = h.distance < u.threshold, v = h.deltaTime < u.time;
        if (this.reset(), h.eventType & j && this.count === 0)
          return this.failTimeout();
        if (m && v && f) {
          if (h.eventType != H)
            return this.failTimeout();
          var b = this.pTime ? h.timeStamp - this.pTime < u.interval : !0, P = !this.pCenter || Fe(this.pCenter, h.center) < u.posThreshold;
          this.pTime = h.timeStamp, this.pCenter = h.center, !P || !b ? this.count = 1 : this.count += 1, this._input = h;
          var W = this.count % u.taps;
          if (W === 0)
            return this.hasRequireFailures() ? (this._timer = x(function() {
              this.state = Pt, this.tryEmit();
            }, u.interval, this), ht) : Pt;
        }
        return Tt;
      },
      failTimeout: function() {
        return this._timer = x(function() {
          this.state = Tt;
        }, this.options.interval, this), Tt;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == Pt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function At(h, u) {
      return u = u || {}, u.recognizers = Ne(u.recognizers, At.defaults.preset), new _i(h, u);
    }
    At.VERSION = "2.0.7", At.defaults = {
      domEvents: !1,
      touchAction: Ws,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Di, { enable: !1 }],
        [Oi, { enable: !1 }, ["rotate"]],
        [ki, { direction: xt }],
        [je, { direction: xt }, ["swipe"]],
        [Ze],
        [Ze, { event: "doubletap", taps: 2 }, ["tap"]],
        [Ri]
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
    var bo = 1, Ys = 2;
    function _i(h, u) {
      this.options = z({}, At.defaults, u || {}), this.options.inputTarget = this.options.inputTarget || h, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = h, this.input = Jr(this), this.touchAction = new Ii(this, this.options.touchAction), qs(this, !0), L(this.options.recognizers, function(f) {
        var m = this.add(new f[0](f[1]));
        f[2] && m.recognizeWith(f[2]), f[3] && m.requireFailure(f[3]);
      }, this);
    }
    _i.prototype = {
      set: function(h) {
        return z(this.options, h), h.touchAction && this.touchAction.update(), h.inputTarget && (this.input.destroy(), this.input.target = h.inputTarget, this.input.init()), this;
      },
      stop: function(h) {
        this.session.stopped = h ? Ys : bo;
      },
      recognize: function(h) {
        var u = this.session;
        if (!u.stopped) {
          this.touchAction.preventDefaults(h);
          var f, m = this.recognizers, v = u.curRecognizer;
          (!v || v && v.state & Pt) && (v = u.curRecognizer = null);
          for (var b = 0; b < m.length; )
            f = m[b], u.stopped !== Ys && (!v || f == v || f.canRecognizeWith(v)) ? f.recognize(h) : f.reset(), !v && f.state & (ht | jt | It) && (v = u.curRecognizer = f), b++;
        }
      },
      get: function(h) {
        if (h instanceof Lt)
          return h;
        for (var u = this.recognizers, f = 0; f < u.length; f++)
          if (u[f].options.event == h)
            return u[f];
        return null;
      },
      add: function(h) {
        if (M(h, "add", this))
          return this;
        var u = this.get(h.options.event);
        return u && this.remove(u), this.recognizers.push(h), h.manager = this, this.touchAction.update(), h;
      },
      remove: function(h) {
        if (M(h, "remove", this))
          return this;
        if (h = this.get(h), h) {
          var u = this.recognizers, f = Xt(u, h);
          f !== -1 && (u.splice(f, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(h, u) {
        if (h !== n && u !== n) {
          var f = this.handlers;
          return L(He(h), function(m) {
            f[m] = f[m] || [], f[m].push(u);
          }), this;
        }
      },
      off: function(h, u) {
        if (h !== n) {
          var f = this.handlers;
          return L(He(h), function(m) {
            u ? f[m] && f[m].splice(Xt(f[m], u), 1) : delete f[m];
          }), this;
        }
      },
      emit: function(h, u) {
        this.options.domEvents && Co(h, u);
        var f = this.handlers[h] && this.handlers[h].slice();
        if (!(!f || !f.length)) {
          u.type = h, u.preventDefault = function() {
            u.srcEvent.preventDefault();
          };
          for (var m = 0; m < f.length; )
            f[m](u), m++;
        }
      },
      destroy: function() {
        this.element && qs(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function qs(h, u) {
      var f = h.element;
      if (f.style) {
        var m;
        L(h.options.cssProps, function(v, b) {
          m = Ue(f.style, b), u ? (h.oldCssProps[m] = f.style[m], f.style[m] = v) : f.style[m] = h.oldCssProps[m] || "";
        }), u || (h.oldCssProps = {});
      }
    }
    function Co(h, u) {
      var f = i.createEvent("Event");
      f.initEvent(h, !0, !0), f.gesture = u, u.target.dispatchEvent(f);
    }
    z(At, {
      INPUT_START: j,
      INPUT_MOVE: Ut,
      INPUT_END: H,
      INPUT_CANCEL: Q,
      STATE_POSSIBLE: qe,
      STATE_BEGAN: ht,
      STATE_CHANGED: jt,
      STATE_ENDED: It,
      STATE_RECOGNIZED: Pt,
      STATE_CANCELLED: ye,
      STATE_FAILED: Tt,
      DIRECTION_NONE: ze,
      DIRECTION_LEFT: ue,
      DIRECTION_RIGHT: fe,
      DIRECTION_UP: ge,
      DIRECTION_DOWN: me,
      DIRECTION_HORIZONTAL: xt,
      DIRECTION_VERTICAL: zt,
      DIRECTION_ALL: As,
      Manager: _i,
      Input: at,
      TouchAction: Ii,
      TouchInput: Ge,
      MouseInput: Ve,
      PointerEventInput: Pi,
      TouchMouseInput: Li,
      SingleTouchInput: $s,
      Recognizer: Lt,
      AttrRecognizer: gt,
      Tap: Ze,
      Pan: je,
      Swipe: ki,
      Pinch: Oi,
      Rotate: Di,
      Press: Ri,
      on: qt,
      off: $e,
      each: L,
      merge: N,
      extend: ot,
      assign: z,
      inherit: D,
      bindFn: Yt,
      prefixed: Ue
    });
    var Mo = typeof e < "u" ? e : typeof self < "u" ? self : {};
    Mo.Hammer = At, typeof n == "function" && n.amd ? n(function() {
      return At;
    }) : r.exports ? r.exports = At : e[s] = At;
  })(window, document, "Hammer");
})(ar);
var ke = ar.exports;
const Fa = Wa(ke), St = /* @__PURE__ */ Po({
  __proto__: null,
  default: Fa
}, [ke]), hr = 1, lr = 2, ts = 4, Va = {
  mousedown: hr,
  mousemove: lr,
  mouseup: ts
};
function Ga(r, e) {
  for (let i = 0; i < r.length; i++)
    if (e(r[i]))
      return !0;
  return !1;
}
function Ya(r) {
  const e = r.prototype.handler;
  r.prototype.handler = function(s) {
    const n = this.store;
    s.button > 0 && s.type === "pointerdown" && (Ga(n, (o) => o.pointerId === s.pointerId) || n.push(s)), e.call(this, s);
  };
}
function qa(r) {
  r.prototype.handler = function(i) {
    let s = Va[i.type];
    s & hr && i.button >= 0 && (this.pressed = !0), s & lr && i.which === 0 && (s = ts), this.pressed && (s & ts && (this.pressed = !1), this.callback(this.manager, s, {
      pointers: [i],
      changedPointers: [i],
      pointerType: "mouse",
      srcEvent: i
    }));
  };
}
Ya(ke.PointerEventInput);
qa(ke.MouseInput);
const Xa = ke.Manager;
let Ei = class {
  constructor(e, i, s) {
    this.element = e, this.callback = i, this.options = { enable: !0, ...s };
  }
};
const ja = St ? [
  [St.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [St.Rotate, { enable: !1 }],
  [St.Pinch, { enable: !1 }],
  [St.Swipe, { enable: !1 }],
  [St.Pan, { threshold: 0, enable: !1 }],
  [St.Press, { enable: !1 }],
  [St.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [St.Tap, { event: "anytap", enable: !1 }],
  [St.Tap, { enable: !1 }]
] : null, un = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
}, Za = {
  doubletap: ["tap"]
}, Ka = {
  pointerdown: "pointerdown",
  pointermove: "pointermove",
  pointerup: "pointerup",
  touchstart: "pointerdown",
  touchmove: "pointermove",
  touchend: "pointerup",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup"
}, vs = {
  KEY_EVENTS: ["keydown", "keyup"],
  MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
  WHEEL_EVENTS: [
    "wheel",
    "mousewheel"
  ]
}, Qa = {
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
}, fn = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
}, Ja = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", Qt = typeof window < "u" ? window : global;
let es = !1;
try {
  const r = {
    get passive() {
      return es = !0, !0;
    }
  };
  Qt.addEventListener("test", null, r), Qt.removeEventListener("test", null);
} catch {
  es = !1;
}
const th = Ja.indexOf("firefox") !== -1, { WHEEL_EVENTS: eh } = vs, gn = "wheel", mn = 4.000244140625, ih = 40, sh = 0.25;
class nh extends Ei {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      if (!this.options.enable)
        return;
      let o = n.deltaY;
      Qt.WheelEvent && (th && n.deltaMode === Qt.WheelEvent.DOM_DELTA_PIXEL && (o /= Qt.devicePixelRatio), n.deltaMode === Qt.WheelEvent.DOM_DELTA_LINE && (o *= ih)), o !== 0 && o % mn === 0 && (o = Math.floor(o / mn)), n.shiftKey && o && (o = o * sh), this.callback({
        type: gn,
        center: {
          x: n.clientX,
          y: n.clientY
        },
        delta: -o,
        srcEvent: n,
        pointerType: "mouse",
        target: n.target
      });
    }, this.events = (this.options.events || []).concat(eh), this.events.forEach((n) => e.addEventListener(n, this.handleEvent, es ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === gn && (this.options.enable = i);
  }
}
const { MOUSE_EVENTS: rh } = vs, pn = "pointermove", vn = "pointerover", yn = "pointerout", wn = "pointerenter", xn = "pointerleave";
class oh extends Ei {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (o) => {
      this.handleOverEvent(o), this.handleOutEvent(o), this.handleEnterEvent(o), this.handleLeaveEvent(o), this.handleMoveEvent(o);
    }, this.pressed = !1;
    const { enable: n } = this.options;
    this.enableMoveEvent = n, this.enableLeaveEvent = n, this.enableEnterEvent = n, this.enableOutEvent = n, this.enableOverEvent = n, this.events = (this.options.events || []).concat(rh), this.events.forEach((o) => e.addEventListener(o, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === pn && (this.enableMoveEvent = i), e === vn && (this.enableOverEvent = i), e === yn && (this.enableOutEvent = i), e === wn && (this.enableEnterEvent = i), e === xn && (this.enableLeaveEvent = i);
  }
  handleOverEvent(e) {
    this.enableOverEvent && e.type === "mouseover" && this._emit(vn, e);
  }
  handleOutEvent(e) {
    this.enableOutEvent && e.type === "mouseout" && this._emit(yn, e);
  }
  handleEnterEvent(e) {
    this.enableEnterEvent && e.type === "mouseenter" && this._emit(wn, e);
  }
  handleLeaveEvent(e) {
    this.enableLeaveEvent && e.type === "mouseleave" && this._emit(xn, e);
  }
  handleMoveEvent(e) {
    if (this.enableMoveEvent)
      switch (e.type) {
        case "mousedown":
          e.button >= 0 && (this.pressed = !0);
          break;
        case "mousemove":
          e.which === 0 && (this.pressed = !1), this.pressed || this._emit(pn, e);
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
const { KEY_EVENTS: ah } = vs, Tn = "keydown", En = "keyup";
class hh extends Ei {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      const o = n.target || n.srcElement;
      o.tagName === "INPUT" && o.type === "text" || o.tagName === "TEXTAREA" || (this.enableDownEvent && n.type === "keydown" && this.callback({
        type: Tn,
        srcEvent: n,
        key: n.key,
        target: n.target
      }), this.enableUpEvent && n.type === "keyup" && this.callback({
        type: En,
        srcEvent: n,
        key: n.key,
        target: n.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(ah), e.tabIndex = this.options.tabIndex || 0, e.style.outline = "none", this.events.forEach((n) => e.addEventListener(n, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === Tn && (this.enableDownEvent = i), e === En && (this.enableUpEvent = i);
  }
}
const Sn = "contextmenu";
class lh extends Ei {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      this.options.enable && this.callback({
        type: Sn,
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
    e === Sn && (this.options.enable = i);
  }
}
const is = 1, di = 2, ss = 4, ch = {
  pointerdown: is,
  pointermove: di,
  pointerup: ss,
  mousedown: is,
  mousemove: di,
  mouseup: ss
}, dh = 1, uh = 2, fh = 3, gh = 0, mh = 1, ph = 2, vh = 1, yh = 2, wh = 4;
function xh(r) {
  const e = ch[r.srcEvent.type];
  if (!e)
    return null;
  const { buttons: i, button: s, which: n } = r.srcEvent;
  let o = !1, a = !1, l = !1;
  return e === ss || e === di && !Number.isFinite(i) ? (o = n === dh, a = n === uh, l = n === fh) : e === di ? (o = !!(i & vh), a = !!(i & wh), l = !!(i & yh)) : e === is && (o = s === gh, a = s === mh, l = s === ph), { leftButton: o, middleButton: a, rightButton: l };
}
function Th(r, e) {
  const i = r.center;
  if (!i)
    return null;
  const s = e.getBoundingClientRect(), n = s.width / e.offsetWidth || 1, o = s.height / e.offsetHeight || 1, a = {
    x: (i.x - s.left - e.clientLeft) / n,
    y: (i.y - s.top - e.clientTop) / o
  };
  return { center: i, offsetCenter: a };
}
const $i = {
  srcElement: "root",
  priority: 0
};
class Eh {
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
    const { handlers: a, handlersByElement: l } = this;
    let c = $i;
    typeof s == "string" || s && s.addEventListener ? c = { ...$i, srcElement: s } : s && (c = { ...$i, ...s });
    let g = l.get(c.srcElement);
    g || (g = [], l.set(c.srcElement, g));
    const p = {
      type: e,
      handler: i,
      srcElement: c.srcElement,
      priority: c.priority
    };
    n && (p.once = !0), o && (p.passive = !0), a.push(p), this._active = this._active || !p.passive;
    let x = g.length - 1;
    for (; x >= 0 && !(g[x].priority >= p.priority); )
      x--;
    g.splice(x + 1, 0, p);
  }
  remove(e, i) {
    const { handlers: s, handlersByElement: n } = this;
    for (let o = s.length - 1; o >= 0; o--) {
      const a = s[o];
      if (a.type === e && a.handler === i) {
        s.splice(o, 1);
        const l = n.get(a.srcElement);
        l.splice(l.indexOf(a), 1), l.length === 0 && n.delete(a.srcElement);
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
      }, l = [];
      for (let c = 0; c < s.length; c++) {
        const { type: g, handler: p, once: x } = s[c];
        if (p({
          ...e,
          type: g,
          stopPropagation: o,
          stopImmediatePropagation: a
        }), x && l.push(s[c]), n)
          break;
      }
      for (let c = 0; c < l.length; c++) {
        const { type: g, handler: p } = l[c];
        this.remove(g, p);
      }
    }
  }
  _normalizeEvent(e) {
    const i = this.eventManager.getElement();
    return {
      ...e,
      ...xh(e),
      ...Th(e, i),
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
const Sh = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: Xa,
  touchAction: "none",
  tabIndex: 0
};
class bh {
  constructor(e = null, i) {
    this._onBasicInput = (n) => {
      const { srcEvent: o } = n, a = Ka[o.type];
      a && this.manager.emit(a, n);
    }, this._onOtherEvent = (n) => {
      this.manager.emit(n.type, n);
    }, this.options = { ...Sh, ...i }, this.events = /* @__PURE__ */ new Map(), this.setElement(e);
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
      recognizers: i.recognizers || ja
    }).on("hammer.input", this._onBasicInput), i.recognizers || Object.keys(un).forEach((n) => {
      const o = this.manager.get(n);
      o && un[n].forEach((a) => {
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
    this.wheelInput = new nh(e, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new oh(e, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new hh(e, this._onOtherEvent, {
      enable: !1,
      tabIndex: i.tabIndex
    }), this.contextmenuInput = new lh(e, this._onOtherEvent, {
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
      const o = Za[e];
      o && !this.options.recognizers && o.forEach((a) => {
        const l = s.get(a);
        i ? (l.requireFailure(e), n.dropRequireFailure(a)) : l.dropRequireFailure(e);
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
    const { manager: a, events: l } = this, c = fn[e] || e;
    let g = l.get(c);
    g || (g = new Eh(this), l.set(c, g), g.recognizerName = Qa[c] || c, a && a.on(c, g.handleEvent)), g.add(e, i, s, n, o), g.isEmpty() || this._toggleRecognizer(g.recognizerName, !0);
  }
  _removeEventHandler(e, i) {
    if (typeof e != "string") {
      for (const a in e)
        this._removeEventHandler(a, e[a]);
      return;
    }
    const { events: s } = this, n = fn[e] || e, o = s.get(n);
    if (o && (o.remove(e, i), o.isEmpty())) {
      const { recognizerName: a } = o;
      let l = !1;
      for (const c of s.values())
        if (c.recognizerName === a && !c.isEmpty()) {
          l = !0;
          break;
        }
      l || this._toggleRecognizer(a, !1);
    }
  }
}
class bn {
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
class Cn {
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
class Mn {
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
const Ch = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class Mt {
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
  constructor(e, i) {
    if (this.#t = { ...Ch, ...i }, this.#h = za.idle, this.#o = Ua, this.#e = e, !this.#e && this.#t.elementId && (this.#e = document.getElementById(this.#t.elementId)), !I.isElement(this.#e))
      throw "Must specify an element to receive user input.";
    this.#t.contextMenu || (window.oncontextmenu = (o) => (o.preventDefault(), !1));
    const n = {
      recognizerOptions: {
        pan: { threshold: this.#o ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#r = new bh(this.#e, n), this.pointerInit();
  }
  get agent() {
    return this.#r;
  }
  get pointer() {
    return this.#s instanceof bn ? this.#s : (this.#s = new bn(this), this.#s);
  }
  get touch() {
    return this.#n instanceof Cn ? this.#n : (this.#n = new Cn(this), this.#n);
  }
  get key() {
    return this.#i instanceof Mn ? this.#i : (this.#i = new Mn(this), this.#i);
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
  set panX(e) {
    K(e) && (this.#a = e);
  }
  set panY(e) {
    K(y) && (this.#c = y);
  }
  set wheeldelta(e) {
    this.#u = e.delta;
  }
  get wheeldelta() {
    return this.#u;
  }
  destroy() {
    this.#r.destroy(), this.#s = void 0, this.#i = void 0, this.#n = void 0;
  }
  isValid(e, i) {
    return !!(S(e) || $(i));
  }
  validOptions(e) {
    return T(e) && K(e) ? e : void 0;
  }
  on(e, i, s, n = !1) {
    if (!this.isValid(e, i))
      return !1;
    this.pointer.has(e) ? this.#s.on(e, i, s, n) : this.touch.has(e) ? this.#n.on(e, i, s, n) : this.key.has(e) ? this.#i.on(e, i, s, n) : this.element.addEventListener(e, i, this.validOptions(s));
  }
  off(e, i, s) {
    this.#s?.has(e) ? this.#s.off(e, i, s) : this.#n?.has(e) ? this.#n.off(e, i, s) : this.#i?.has(e) ? this.#i.off(e, i, s) : this.element.removeEventListener(e, i, this.validOptions(s));
  }
  once(e, i, s) {
    this.on(e, i, s, !0);
  }
  setCursor(e) {
    this.#e.style.cursor = e;
  }
  pointerInit() {
    this.clientPosPrev = new Vt([null, null]), this.position = new Vt([0, 0]), this.movement = new Vt([0, 0]), this.dragstart = new Vt([null, null]), this.dragend = new Vt([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
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
    this.#l = !0, this.onPointerDown(e);
  }
  endPointerDrag(e) {
    this.#l = !1;
  }
}
class pt {
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
  static class = on;
  static name = "Dividers";
  static type = "Divider";
  static create(e, i) {
    const s = `${i.core.id}_divider_${++pt.divideCnt}`;
    return i.id = s, pt.dividerList[s] = new pt(e, i), pt.dividerList[s];
  }
  static destroy() {
    for (let e in pt.dividerList)
      pt.dividerList[e].destroy();
    delete pt.dividerList[id];
  }
  static defaultNode() {
    return `
  <div slot="widget" class="${on}" style="position: absolute;"></div>
  `;
  }
  constructor(e, i) {
    const s = { ...i };
    this.#i = e, this.#e = s.core, this.#r = s, this.#s = s.core.theme, this.#t = s.id, this.#n = s.chartPane, this.#o = e.elements.elDividers, this.init();
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
  set cursor(e) {
    this.#h.style.cursor = e;
  }
  get cursor() {
    return this.#h.style.cursor;
  }
  get type() {
    return pt.type;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = "row-resize", this.eventsListen();
  }
  destroy() {
    this.#a.destroy(), this.el.remove(), delete pt.dividerList[this.id];
  }
  eventsListen() {
    this.#a = new Mt(this.#h, { disableContextMenu: !1 }), this.#a.on("pointerover", this.onMouseEnter.bind(this)), this.#a.on("pointerout", this.onMouseOut.bind(this)), this.#a.on("pointerdrag", this.onPointerDrag.bind(this)), this.#a.on("pointerdragend", this.onPointerDragEnd.bind(this));
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
    this.#h.style.background = this.#s.divider.active, this.#e.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#h.style.background = this.#s.divider.idle, this.#e.MainPane.onMouseEnter();
  }
  onPointerDrag(e) {
    this.#l = this.#e.MainPane.cursorPos, this.#h.style.background = this.#s.divider.active, this.emit(`${this.id}_pointerdrag`, this.#l), this.emit("divider_pointerdrag", {
      id: this.id,
      e,
      pos: this.#l,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(e) {
    "position" in e && (this.#h.style.background = this.#s.divider.idle), this.#l = this.#e.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#l), this.emit("divider_pointerdragend", {
      id: this.id,
      e,
      pos: this.#l,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  mount() {
    this.#o.lastElementChild == null ? this.#o.innerHTML = this.dividerNode() : this.#o.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#h = I.findBySelector(`#${this.#t}`, this.#o);
  }
  dividerNode() {
    let e = this.#n.pos.top - I.elementDimPos(this.#o).top, i = this.#e.MainPane.rowsW + this.#e.scaleW, s = E(this.config.dividerHeight) ? this.config.dividerHeight : va, n = this.#e.theme.tools.width;
    switch (e -= s / 2, this.#e.theme.tools.location) {
      case "left":
        break;
      case !1:
      case "none":
      case "right":
        n *= -1;
        break;
    }
    const o = `position: absolute; top: ${e}px; left: ${n}px; z-index:100; width: ${i}px; height: ${s}px; background: ${this.#s.divider.idle};`;
    return `
      <div id="${this.#t}" class="divider" style="${o}"></div>
    `;
  }
  setPos() {
    let e = this.#n.pos.top - I.elementDimPos(this.#o).top;
    e = e - this.height / 2, this.#h.style.top = `${e}px`;
  }
  hide() {
    this.#h.style.display = "none";
  }
  show() {
    this.#h.style.display = "block";
  }
}
const Mh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', Ph = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', Lh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', cr = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', Ah = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', Ih = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', Oh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', ti = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', Rh = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', Dh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', kh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', _h = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Nh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', $h = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Hh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>', Bh = '<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>', Uh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', zh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', Wh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', Fh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Vh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Gh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>', Yh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>', qh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>', Xh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>', jh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>', Zh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>', Kh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>', Qh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>', Jh = '<svg width="493px" height="512px" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 493 511.77" xmlns="http://www.w3.org/2000/svg"><path d="m33.11 458.2 104.5-79.1c3.09-3 7.08-4.47 11.08-4.45l302.6-0.08c2.67 0 5.09-1.08 6.78-2.77 1.74-1.81 2.84-4.24 2.84-6.87v-323.2c0-2.59-1.12-5-2.86-6.74-1.78-1.78-4.2-2.9-6.76-2.9h-409.56c-2.54 0-4.94 1.14-6.72 2.92s-2.92 4.18-2.92 6.72c0 793.72 1.02 39.329 1.02 416.47zm90.6-229.77c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.73-19.74 19.73c-10.89 0-19.73-8.84-19.73-19.73s8.84-19.74 19.73-19.74zm0-101.14c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.74-19.74 19.74c-10.89 0-19.73-8.85-19.73-19.74s8.84-19.74 19.73-19.74zm61.72 138.89c-9.95 0-18.02-8.07-18.02-18.01 0-9.95 8.07-18.02 18.02-18.02h185.56c9.95 0 18.01 8.07 18.01 18.02 0 9.94-8.06 18.01-18.01 18.01zm0-101.13c-9.95 0-18.02-8.07-18.02-18.02 0-9.94 8.07-18.01 18.02-18.01h185.56c9.95 0 18.01 8.07 18.01 18.01 0 9.95-8.06 18.02-18.01 18.02zm-30.38 241.61-125.97 99.69c-2.96 3.32-7.24 5.42-12.01 5.42-8.85 0-17.07-7.1228-17.07-15.963v-454.08c0-11.4 4.77-21.88 12.31-29.42s18.02-12.31 29.42-12.31h409.56c11.4 0 21.9 4.74 29.45 12.29 7.5 7.51 12.26 17.96 12.26 29.44v323.2c0 11.48-4.7 21.95-12.24 29.49-7.61 7.54-18.05 12.24-29.47 12.24z" fill-rule="nonzero"/></svg>', tl = '<svg width="800px" height="800px" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.746 2.7281c-5.1207-2.0689-10.949 0.40512-13.018 5.5258-2.0689 5.1207 0.40512 10.949 5.5258 13.018 5.1207 2.0689 10.949-0.40508 13.018-5.5258 2.0689-5.1207-0.40508-10.949-5.5258-13.018zm-1.3378 8.3035-1.2703-0.51325c-0.21854-0.08829-0.32785-0.13246-0.3683-0.22775-0.04045-0.09529 0.0037-0.20461 0.09201-0.42314l1.6595-4.1073c0.33362-0.82575 0.50047-1.2387 0.33474-1.3523-0.16582-0.11359-0.49058 0.19103-1.1403 0.8003l-4.7426 4.4469c-1.0274 0.96338-1.541 1.445-1.4405 1.9835 0.10054 0.53837 0.75347 0.80216 2.0594 1.3298l1.2703 0.51325c0.21854 0.08829 0.32785 0.13246 0.3683 0.22775 0.04045 0.09529-0.0037 0.20461-0.09201 0.42314l-1.6595 4.1073c-0.33365 0.82582-0.50047 1.2387-0.33475 1.3523 0.16582 0.1136 0.49059-0.19104 1.1403-0.80025l4.7425-4.4469c1.0275-0.96346 1.5411-1.4451 1.4406-1.9836-0.10057-0.53838-0.75352-0.80218-2.0594-1.3298z" clip-rule="evenodd" fill-rule="evenodd"/></svg>', el = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>', il = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>', Gt = 300, ui = 400, sl = `${ui}px`, dr = `${Gt}px`, nl = "100%", rl = "100%", Nt = 30, kt = 35, fi = 25, ur = 25, gi = fi + ur, re = 60, te = "normal", ee = 12, Hi = "normal", ie = "Avenir, Helvetica, Arial, sans-serif", ys = "#141414", ws = "#666666", xs = "#cccccc", Ie = "#888888", oe = "#cccccc", fr = "25px", ol = "position: relative;", F = {
  COLOUR_BG: ys,
  COLOUR_BORDER: ws,
  COLOUR_TXT: xs,
  COLOUR_ICON: Ie,
  COLOUR_ICONHOVER: oe,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: te,
  FONTSIZE: ee,
  FONTSTYLE: Hi,
  FONTFAMILY: ie,
  FONT: `${Hi} ${ee}px ${te} ${ie}`,
  FONTSTRING: `font-style: ${Hi}; font-size: ${ee}px; font-weight: ${te}; font-family: ${ie};`
}, ut = {
  fontSize: ee,
  fontWeight: te,
  fontFamily: ie,
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderWidth: 1,
  txtCol: "#000000",
  bakCol: "#cccccc",
  stroke: "#ffffff",
  fill: "#888888"
}, _t = {
  COLOUR_ICON: Ie,
  COLOUR_ICONHOVER: oe,
  ICONSIZE: fr
}, se = {
  COLOUR_ICON: Ie,
  COLOUR_ICONHOVER: oe,
  ICONSIZE: fr
}, Bi = {
  COLOUR_BG: ys,
  COLOUR_BORDER: ws,
  COLOUR_TXT: xs
}, Ui = {
  COLOUR_BG: ys,
  COLOUR_BORDER: ws,
  COLOUR_TXT: xs
}, al = {
  FILL: oe + "88"
}, X = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, ei = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, oi = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, Pn = te, ai = ee, hi = ie, wt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: hi,
  FONTSIZE: ai,
  FONTWEIGHT: Pn,
  FONT_LABEL: `${Pn} ${ai}px ${hi}`,
  FONT_LABEL_BOLD: `bold ${ai}px ${hi}`
}, Ln = te, An = ee, In = ie, Ft = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: In,
  FONTSIZE: An,
  FONTWEIGHT: Ln,
  FONT_LABEL: `${Ln} ${An}px ${In}`,
  FONT_LABEL_BOLD: `bold ${ai}px ${hi}`
}, gr = {
  COLOUR_GRID: "#333"
}, hl = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, zi = {
  text: F.FONTSTRING,
  font: F.FONT,
  colour: F.COLOUR_TXT
}, On = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00"
}, ll = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: F.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}, Wi = { arrowDown: Gh, arrowUp: Yh, arrowDownRound: qh, arrowUpRound: Xh, arrowDownRoundSolid: jh, arrowUpRoundSolid: Zh, buySolid: Kh, sellSolid: Qh }, Rn = { noteSolid: Jh, lightning: tl }, cl = {
  candle: {
    Type: X.CANDLE_SOLID,
    UpBodyColour: ei.COLOUR_CANDLE_UP,
    UpWickColour: ei.COLOUR_WICK_UP,
    DnBodyColour: ei.COLOUR_CANDLE_DN,
    DnWickColour: ei.COLOUR_WICK_DN
  },
  volume: {
    Height: oi.ONCHART_VOLUME_HEIGHT,
    UpColour: oi.COLOUR_VOLUME_UP,
    DnColour: oi.COLOUR_VOLUME_DN
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
    icon: Ie,
    iconHover: oe
  },
  yAxis: {
    colourTick: wt.COLOUR_TICK,
    colourLabel: wt.COLOUR_LABEL,
    colourCursor: wt.COLOUR_CURSOR,
    colourCursorBG: wt.COLOUR_CURSOR_BG,
    fontFamily: wt.FONTFAMILY,
    fontSize: wt.FONTSIZE,
    fontWeight: wt.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: F.COLOUR_BG,
    BorderColour: F.COLOUR_BORDER,
    BorderThickness: F.BORDER_THICKNESS,
    TextColour: F.COLOUR_TXT,
    GridColour: gr.COLOUR_GRID
  },
  primaryPane: {
    separator: "#666"
  },
  secondaryPane: {
    separator: "#666"
  },
  time: {
    navigation: !1,
    font: zi.font,
    colour: "#96a9db",
    handleColour: "#586ea6"
  },
  legend: {
    font: zi.font,
    colour: zi.colour,
    controls: !0,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: Ie,
    hover: oe
  },
  divider: {
    active: On.ACTIVE,
    idle: On.IDLE
  },
  watermark: ll,
  trades: {
    iconBuy: Wi.arrowUp,
    iconSell: Wi.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    buyColour: "#0f0",
    sellColour: "#f00",
    defaultIcons: Wi,
    offset: 10
  },
  events: {
    iconEvent: Rn.lightning,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    iconColour: "#ccc",
    defaultIcons: Rn,
    offset: 10
  }
}, dl = `
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
</style>`, ul = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${sl});
    min-height: var(--txc-min-height, ${dr});
    max-width: var(--txc-max-width, ${nl});
    max-height: var(--txc-max-height, ${rl});
    overflow: hidden;
    background: var(--txc-background, ${F.COLOUR_BG});
    font: var(--txc-font, ${F.FONT});
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
`, Dn = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class yt {
  static #t = new ft();
  static get list() {
    return yt.#t;
  }
  #e;
  static create(e, i) {
    if (!T(e))
      return !1;
    e.id = S(e.name) ? et(e.name) : `${i.id}.theme`;
    const s = new yt(e, i);
    return yt.list.set(e.id, s), s;
  }
  constructor(e, i) {
    this.#e = i, this.setCurrent(e);
  }
  get list() {
    return yt.list;
  }
  setCurrent(e = {}) {
    e = T(e) ? e : {};
    const i = nt(cl), s = nt(e), n = Pe(i, s);
    for (let o in n)
      Dn.includes(o) || (this[o] = n[o]);
    this.#e.refresh();
  }
  setTheme(e) {
    if (S(e) && yt.list.has(e)) {
      const i = yt.list.get(e);
      return this.setCurrent(i), !0;
    }
    return !1;
  }
  setProperty(e, i) {
    if (!S(e))
      return;
    const s = Xs(this, e), n = e.split(".");
    if (n.length == 1)
      this[n[0]] = i;
    else {
      let o = n.shift();
      this[o] = sr(this[o], n.join("."), i);
    }
    return this.#e.refresh(), s;
  }
  getProperty(e) {
    return Xs(this, e);
  }
  deleteTheme(e) {
    return S(e) && yt.list.has(e) ? (yt.list.delete(e), !0) : !1;
  }
  exportTheme(e = {}) {
    T || (e = {});
    const i = e?.type, s = {};
    let n;
    for (let o in this)
      Dn.includes(o) || (s[o] = this[o]);
    switch (i) {
      case "json":
      default:
        const { replacer: o, space: a } = { ...e };
        n = JSON.stringify(s, o, a);
    }
    return n;
  }
}
class fl {
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
class gl {
  #t;
  #e;
  #r;
  #s = 0;
  #i = {};
  #n;
  constructor(e, i, s, n) {
    this.#t = e, this.#e = s, this.#r = n;
    const o = `
      ${mr.ThreadWorker.toString()};
      const fn = ${i}
      const worker = new ThreadWorker(fn)
    `, a = new Blob([`;(() => {${o}})()`], { type: "text/javascript" }), l = URL.createObjectURL(a);
    this.#n = new Worker(l), URL.revokeObjectURL(l);
  }
  get id() {
    return this.#t;
  }
  get req() {
    return `r_${this.#s}`;
  }
  onmessage(e) {
    return $(this.#e) ? this.#e(e) : e;
  }
  onerror(e) {
    return $(this.#r) ? this.#r(e) : e;
  }
  postMessage(e) {
    return new Promise((i, s) => {
      try {
        let n = this.req;
        this.#i[n] = { resolve: i, reject: s }, this.#n.postMessage({ r: n, data: e }), this.#n.onmessage = (o) => {
          const { r: a, result: l } = o.data;
          if (a in this.#i) {
            const { resolve: c, reject: g } = this.#i[a];
            delete this.#i[a], c(this.onmessage(l));
          }
        }, this.#n.onerror = (o) => {
          s(this.onerror(o));
        };
      } catch (n) {
        s(n);
      }
    });
  }
  terminate() {
    this.#n.terminate();
  }
}
let mr = class Rt {
  static #t = /* @__PURE__ */ new Map();
  static ThreadWorker = fl;
  static Thread = gl;
  static create(e = "worker", i, s, n) {
    if (typeof window.Worker > "u")
      return !1;
    if ($(i))
      i = i.toString();
    else if (!S(i))
      return !1;
    return e = S(e) ? et(e) : et("worker"), Rt.#t.set(e, new Rt.Thread(e, i, s)), Rt.#t.get(e);
  }
  static destroy(e) {
    if (!S(e))
      return !1;
    Rt.#t.get(e).terminate(), Rt.#t.delete(e);
  }
  static end() {
    Rt.#t.forEach((e, i, s) => {
      Rt.destroy(i);
    });
  }
};
class rt extends HTMLElement {
  shadowRoot;
  template;
  id = et(Se);
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
    E(e) && (e += "px"), !(!["width", "height"].includes(i) || !S(e)) && (this.style[i] = e);
  }
}
class pr {
  #t;
  #e;
  #r;
  constructor(e) {
    this.#e = e, this.#t = this.#e.core, this.#r = this.#t.Chart;
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
  float2Int(e) {
    return Qo(e);
  }
  numDigits(e) {
    return er(e);
  }
  countDigits(e) {
    return Ko(e);
  }
  precision(e) {
    return ir(e);
  }
}
class ml extends pr {
  #t = 4;
  #e;
  #r = !0;
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
    return it(this.width / this.range.Length);
  }
  get candlesOnLayer() {
    return it(this.core.Chart.layerWidth / this.candleW);
  }
  get xAxisRatio() {
    return this.width / this.range.rangeDuration;
  }
  set xAxisTicks(e) {
    this.#t = E(e) ? e : 0;
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
    return it(this.range.rangeIndex(e) * this.candleW + this.candleW * 0.5);
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
    let i = this.range.indexStart, s = it(e / this.candleW);
    return i + s;
  }
  pixelOHLCV(e) {
    let i = this.pixel2Index(e);
    return this.range.value(i);
  }
  xPosSnap2CandlePos(e) {
    let i = e % this.candleW, s = i ? this.candleW / 2 : 0;
    return it(e - i + s);
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
    }, s = os(e.rangeDuration);
    i.units = s;
    for (let p in s)
      if (s[p] > 0) {
        i.units = [p, p], i.timeSpan = `${s[p]} ${p}`;
        break;
      }
    const n = e.interval, { xStep: o, rank: a } = this.xStep(e), l = this.pixel2T(this.width) + o;
    let c = e.timeMin - e.timeMin % o - o, g = c;
    for (; c < l; ) {
      let p = ni(c, "years"), x = ni(c, "months"), M = ni(c, "days");
      !(p in i.entries) && p >= g ? i.entries[p] = [this.dateTimeValue(p, n), this.t2Pixel(p), p, "major"] : !(x in i.entries) && x >= g ? i.entries[x] = [this.dateTimeValue(x, n), this.t2Pixel(x), x, "major"] : !(M in i.entries) && M >= g && (i.entries[M] = [this.dateTimeValue(M, n), this.t2Pixel(M), M, "major"]), i.entries[c] = [this.dateTimeValue(c, n), this.t2Pixel(c), c, "minor"], c += o;
    }
    return i.values = Object.values(i.entries), i;
  }
  xStep(e) {
    let i = pa, s = this.#r ? e.interval : 1, n = xe[0], o = it(this.width / e.Length), a = Xi[0], l = xe.indexOf(s);
    for (; l-- >= 0 && !(o * (xe[l] / s) >= i); )
      ;
    return n = xe[l], a = Xi[l], { xStep: n, rank: a };
  }
  dateTimeValue(e, i) {
    if (e / R % 1 === 0) {
      const s = us(e);
      return s === 1 ? fs(e) === 0 ? Qn(e) : Zn(e) : s;
    } else
      return i < U || i < G ? Zi(e) : tr(e);
  }
}
const Fi = {
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
}, kn = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, _n = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, Nn = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, $n = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, Hn = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class vr {
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
    this.#e(e), kn.test(e) && this.#r(e), _n.test(e) && this.#s(e), Nn.test(e) && this.#i(e), $n.test(e) && this.#n(e), Hn.test(e) && this.#o(e);
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
    if (Ba) {
      let i = document.getElementById("divValidColourTest");
      i || (i = document.createElement("div"), i.id = "divValidColourTest"), i.style.backgroundColor = "", i.style.backgroundColor = e, this.#t.isValid = !!i.style.backgroundColor.length;
    } else
      this.#t.isValid = !!(kn.test(e) || _n.test(e) || Nn.test(e) || $n.test(e) || Hn.test(e));
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
  #r(e) {
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
  #s(e) {
    this.#t.hsl = e;
  }
  #i(e) {
    this.#t.hsla = e;
  }
  #n(e) {
    this.#t.rgb = e, this.#v(rgba);
  }
  #o(e) {
    this.#t.rgba = e, this.#v(e);
  }
  #h(e) {
    let { r: i, g: s, b: n, a: o } = this.#f(e);
    return i.length == 1 && (i = "0" + i), s.length == 1 && (s = "0" + s), n.length == 1 && (n = "0" + n), o.length == 1 && (o = "0" + o), this.value.r = i, this.value.g = s, this.value.b = n, this.value.a = o, this.setHex([i, s, n, o]), this;
  }
  #l(e) {
    let { r: i, g: s, b: n, a: o } = this.#f(e);
    i = parseInt(i, 16) / 255, s = parseInt(s, 16) / 255, n = parseInt(n, 16) / 255, o = parseInt(o, 16) / 255;
    const a = Math.max(i, s, n), l = a - Math.min(i, s, n), c = l ? a === i ? (s - n) / l : a === s ? 2 + (n - i) / l : 4 + (i - s) / l : 0;
    let g = [
      (60 * c < 0 ? 60 * c + 360 : 60 * c).toString(),
      (100 * (l ? a <= 0.5 ? l / (2 * a - l) : l / (2 - (2 * a - l)) : 0)).toString(),
      (100 * (2 * a - l) / 2).toString(),
      o.toString()
    ];
    return this.setHSLA(g), this;
  }
  #a(e, i, s) {
    i /= 100, s /= 100;
    const n = (l) => (l + e / 30) % 12, o = i * Math.min(s, 1 - s), a = (l) => s - o * Math.max(-1, Math.min(n(l) - 3, Math.min(9 - n(l), 1)));
    return [255 * a(0), 255 * a(8), 255 * a(4)];
  }
  #c(e, i, s) {
    s /= 100;
    const n = i * Math.min(s, 1 - s) / 100, o = (a) => {
      const l = (a + e / 30) % 12, c = s - n * Math.max(Math.min(l - 3, 9 - l, 1), -1);
      return Math.round(255 * c).toString(16).padStart(2, "0");
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
      let l = e.indexOf(",") > -1 ? "," : " ";
      e = e.substr(4).split(")")[0].split(l);
    }
    if (C(e)) {
      if (e.length < 3 || e.length > 4)
        return !1;
      i = e[0], s = e[1], n = e[2], o = S(e[3]) ? e[3] : "";
    } else if (T(e))
      i = e.r, s = e.g, n = e.b, o = "a" in e ? e.a : "";
    else
      return !1;
    return { r: i, g: s, b: n, a: o };
  }
  #v(e) {
    let i, s, n = 0, o = [], a = [], l = e.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    l.shift();
    for (let c of l)
      s = c.indexOf("%") > -1, i = parseFloat(c), n < 3 && s ? i = Math.round(255 * i / 100) : n == 3 && (!s && i >= 0 && i <= 1 ? i = Math.round(255 * i) : s && i >= 0 && i <= 100 ? i = Math.round(255 * i / 100) : i = ""), o[n] = (i | 256).toString(16).slice(1), a[n++] = i;
    this.setHex(o), this.setRGBA(a), this.#d(this.#t.hex);
  }
}
class Ts {
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
  constructor(e) {
    this.#e = Ts.#t++, this.#r = e.core, this.#s = I.isElement(e.elContainer) ? e.elContainer : !1, this.#i = I.isElement(e.elHandle) ? e.elHandle : !1, this.#u = $(e.callback) ? e.callback : !1, I.isElement(this.#s) && I.isElement(this.#i) && (this.mount(), this.eventsListen());
  }
  set cursor(e) {
    this.#i.style.cursor = e;
  }
  get cursor() {
    return this.#i.style.cursor;
  }
  eventsListen() {
    this.#c = new Mt(this.#i, { disableContextMenu: !1 }), this.#c.on("mouseenter", dt(this.onMouseEnter, 1, this, !0)), this.#c.on("mouseout", dt(this.onMouseOut, 1, this, !0)), this.#c.on("drag", ha(this.onHandleDrag, 100, this)), this.#c.on("enddrag", this.onHandleDragDone.bind(this)), this.#c.on("mousedown", dt(this.onMouseDown, 100, this, !0)), this.#c.on("mouseup", this.onMouseUp.bind(this));
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
  onMouseEnter() {
    const e = getComputedStyle(this.#i).backgroundColor;
    e && (this.colour = new vr(e), this.#i.style.backgroundColor = this.colour.hex);
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
    this.#n.w = this.#s.getBoundingClientRect().width, this.#n.h = this.#s.getBoundingClientRect().height, this.#s.style.overflow = "hidden", this.#o.w = this.#i.getBoundingClientRect().width, this.#o.h = this.#i.getBoundingClientRect().height, this.#i.style.marginRight = 0, this.#i.style.position = "absolute";
  }
  handlePos(e) {
    let i = this.#r.range, s = parseInt(this.#i.style.marginLeft), n = this.#s.getBoundingClientRect().width, o = this.#i.getBoundingClientRect().width, a = n - o, l = e.position.x - this.#a.x, c = _(s + l, 0, a), g = (i.dataLength + i.limitFuture + i.limitPast) / n, p = Math.floor(c * g);
    this.setHandleDims(c, o), this.#r.jumpToIndex(p);
  }
  setHandleDims(e, i) {
    let s = this.#s.getBoundingClientRect().width;
    i = i || this.#i.getBoundingClientRect().width, e = e / s * 100, this.#i.style.marginLeft = `${e}%`, i = i / s * 100, this.#i.style.width = `${i}%`;
  }
}
let yr = class {
  constructor(e = {}) {
    this.container = e.container, this.layers = [], this.id = k.idCnt++, this.scene = new k.Scene(), this.setSize(e.width || 0, e.height || 0);
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
    for (var s = this.layers, n = s.length, o = n - 1, a, l; o >= 0; ) {
      if (a = s[o], l = a.hit.getIntersection(e, i), l >= 0)
        return l;
      o--;
    }
    return -1;
  }
  get index() {
    let e = k.viewports, i, s = 0;
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
    let i = this.scene, s = this.layers, n;
    i.clear();
    for (n of s)
      e && n.layers.length > 0 && n.render(e), n.visible && n.width > 0 && n.height > 0 && i.context.drawImage(
        n.scene.canvas,
        n.x,
        n.y,
        n.width,
        n.height
      );
  }
};
class pl extends yr {
  constructor(e = {}) {
    super(e), e.container.innerHTML = "", e.container.appendChild(this.scene.canvas), k.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", k.viewports.splice(this.index, 1);
  }
}
class vl {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  visible = !0;
  constructor(e = {}) {
    this.id = k.idCnt++, this.hit = new k.Hit({
      contextType: e.contextType
    }), this.scene = new k.Scene({
      contextType: e.contextType
    }), e.x && e.y && this.setPosition(e.x, e.y), e.width && e.height && this.setSize(e.width, e.height);
  }
  get index() {
    let e = this.viewport.layers;
    e.length;
    let i = 0, s;
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
  move(e) {
    let i = this.index, s = this.viewport, n = s.layers;
    switch (e) {
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
class yl {
  width = 0;
  height = 0;
  constructor(e) {
    e || (e = {}), this.id = k.idCnt++, this.contextType = e.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "scene-canvas", this.canvas.style.display = "block", this.context = this.canvas.getContext(this.contextType), e.width && e.height && this.setSize(e.width, e.height);
  }
  setSize(e, i) {
    return this.width = e, this.height = i, this.canvas.width = e * k.pixelRatio, this.canvas.style.width = `${e}px`, this.canvas.height = i * k.pixelRatio, this.canvas.style.height = `${i}px`, this.contextType === "2d" && k.pixelRatio !== 1 && this.context.scale(k.pixelRatio, k.pixelRatio), this;
  }
  clear() {
    let e = this.context;
    return this.contextType === "2d" ? e.clearRect(
      0,
      0,
      this.width * k.pixelRatio,
      this.height * k.pixelRatio
    ) : e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), this;
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
  blobCallback(e) {
    let i = document.createElement("a"), s = URL.createObjectURL(e), n = this.cfg.fileName || "canvas.png";
    i.setAttribute("href", s), i.setAttribute("target", "_blank"), i.setAttribute("export", n), document.createEvent ? Object.assign(document.createElement("a"), {
      href: s,
      target: "_blank",
      export: n
    }).click() : i.click && i.click();
  }
}
class wl {
  width = 0;
  height = 0;
  constructor(e) {
    e || (e = {}), this.contextType = e.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "hit-canvas", this.canvas.style.display = "none", this.canvas.style.position = "relative", this.context = this.canvas.getContext(this.contextType, {
      preserveDrawingBuffer: !0,
      antialias: !1
    }), e.width && e.height && this.setSize(e.width, e.height);
  }
  setSize(e, i) {
    return this.width = e, this.height = i, this.canvas.width = e * k.pixelRatio, this.canvas.style.width = `${e}px`, this.canvas.height = i * k.pixelRatio, this.canvas.style.height = `${i}px`, this;
  }
  clear() {
    let e = this.context;
    return this.contextType === "2d" ? e.clearRect(
      0,
      0,
      this.width * k.pixelRatio,
      this.height * k.pixelRatio
    ) : e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), this;
  }
  getIntersection(e, i) {
    let s = this.context, n;
    if (e = Math.round(e), i = Math.round(i), e < 0 || i < 0 || e > this.width || i > this.height)
      return -1;
    if (this.contextType === "2d") {
      if (n = s.getImageData(e, i, 1, 1).data, n[3] < 255)
        return -1;
    } else if (n = new Uint8Array(4), s.readPixels(
      e * k.pixelRatio,
      (this.height - i - 1) * k.pixelRatio,
      1,
      1,
      s.RGBA,
      s.UNSIGNED_BYTE,
      n
    ), n[0] === 255 && n[1] === 255 && n[2] === 255)
      return -1;
    return this.rgbToInt(n);
  }
  getColorFromIndex(e) {
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
const k = {
  idCnt: 0,
  viewports: [],
  pixelRatio: window && window.devicePixelRatio || 1,
  Node: yr,
  Viewport: pl,
  Layer: vl,
  Scene: yl,
  Hit: wl
}, mi = k;
class xl {
  #t;
  #e;
  #r;
  #s;
  #i;
  constructor(e, i = []) {
    this.#r = e, this.#t = e.core, this.#s = new ft([...i]);
    for (const [s, n] of this.#s)
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
    for (let e of this.#s.keys())
      this.removeOverlay(e);
    this.#s = null;
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
    return this.#s.get(e);
  }
  addOverlays(e) {
    let i = [], s, n;
    for (let o of e)
      n = this.addOverlay(o[0], o[1]), s = n.instance?.id || o[0], i.push([s, n]);
    return i;
  }
  addOverlay(e, i) {
    try {
      const s = new mi.Layer(this.layerConfig);
      return this.parent.viewport.addLayer(s), i.layer = s, i.instance = new i.class(
        s,
        this.#r.TimeLine,
        this.#r.Scale,
        this.#t.theme,
        this,
        i.params
      ), S(i.instance?.id) || (i.instance.id = e), this.#s.set(i.instance.id, i), !0;
    } catch (s) {
      return console.error(`Error: Cannot instantiate ${e} overlay / indicator`), console.error(s), !1;
    }
  }
  removeOverlay(e) {
    this.#s.has(e) && (this.#s.get(e).layer.remove(), this.#s.delete(e));
  }
}
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
  constructor(e, i = !1, s = !1, n, o, a = {}) {
    this.#e = o.core, this.#t = o, this.#r = o.core.config, this.#o = e, this.#h = e.scene, this.#s = n, this.#i = i, this.#n = s, this.#l = a;
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
  get overlay() {
    return this.#l.overlay;
  }
  set doDraw(e) {
    this.#a = K(e) ? e : !1;
  }
  get doDraw() {
    return this.#a;
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
}
class pi extends Y {
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
    if (i.save(), i.strokeStyle = this.core.theme.chart.GridColour || gr.COLOUR_GRID, e != "y") {
      const n = this.xAxis.xAxisGrads.values;
      for (let o of n) {
        let a = it(o[1]);
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
class ns extends Y {
  #t = [0, 0];
  #e = !0;
  #r;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i = !1, s = !1, n, o, a), this.core.on("chart_pan", (l) => {
      this.onMouseDragX(l);
    }), this.core.on("chart_panDone", (l) => {
      this.onMouseDragX(l);
    }), this.core.on("main_mousemove", (l) => {
      this.onMouseMoveX(l);
    }), this.#r = new Mt(this.target.viewport.container, { disableContextMenu: !1 }), this.#r.on("pointermove", this.onMouseMove.bind(this)), this.#r.on("pointerenter", this.onMouseMove.bind(this));
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
    const i = T(e) ? e.position.x : e[0], s = T(e) ? e.position.y : e[1];
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
const Tl = [
  ["grid", { class: pi, fixed: !0 }],
  ["cursor", { class: ns, fixed: !0 }]
];
class ae {
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
  constructor(e, i, s, n = !1) {
    this.#s = e, this.#t = e.core, this.#e = this.core.config, this.#r = this.core.theme, this.#o = this.#s.element, this.#l = i, this.createViewport(s, n);
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
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#o.getBoundingClientRect().width;
  }
  set height(e) {
    this.setHeight(e);
  }
  get height() {
    return this.#o.getBoundingClientRect().height;
  }
  get dimensions() {
    return I.elementDimPos(this.#o);
  }
  set layerWidth(e) {
    this.#a = e;
  }
  get layerWidth() {
    return this.#a;
  }
  get stateMachine() {
    return this.#s.stateMachine;
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
  setSize(e, i, s) {
    const n = this.#n.list;
    this.#i.setSize(e, i);
    for (let [o, a] of n)
      a.layer.setSize(s, i);
  }
  createViewport(e = [], i = !1) {
    e = e.length == 0 ? nt(Tl) : e;
    const { width: s, height: n } = this.layerConfig();
    let o = i ? mi.Node : mi.Viewport;
    this.#i = new o({
      width: s,
      height: n,
      container: this.#l
    }), this.#h = this.#i.scene.canvas, this.#n = new xl(this, e);
  }
  layerConfig() {
    const e = this.config?.buffer || Ti, i = this.#l.getBoundingClientRect().width, s = this.#l.getBoundingClientRect().height;
    this.layerWidth = Math.round(i * ((100 + e) * 0.01));
    const n = {
      width: this.layerWidth,
      height: s
    };
    return { width: i, height: s, layerConfig: n };
  }
  addOverlays(e) {
    return this.#n.addOverlays(e);
  }
  addOverlay(e, i) {
    return this.#n.addOverlay(e, i);
  }
  removeOverlay(e) {
    return this.#n.removeOverlay(e);
  }
  draw(e = this.range, i = !1) {
    const s = this.#n.list;
    if (!(s instanceof ft))
      return !1;
    for (let [n, o] of s)
      !T(o) || !$(o?.instance?.draw) || (o.instance.draw(), o.fixed || (o.instance.position = [this.#t.scrollPos, 0]));
  }
  render() {
    this.#i.render();
  }
}
class El extends Y {
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
    const i = this.scene.context, s = this.xAxis.xAxisGrads.values, n = 0, o = this.theme.xAxis, a = K(o.tickMarker) ? o.tickMarker : !0;
    i.save(), i.strokeStyle = o.colourTick, i.fillStyle = o.colourTick, i.font = `${o.fontWeight} ${o.fontSize}px ${o.fontFamily}`;
    for (let l of s) {
      let c = it(l[1]), g = Math.floor(i.measureText(`${l[0]}`).width * 0.5);
      i.fillText(l[0], c - g + n, this.xAxis.xAxisTicks + 12), a && (i.beginPath(), i.moveTo(c + n, 0), i.lineTo(c + n, this.xAxis.xAxisTicks), i.stroke());
    }
    i.restore();
  }
}
class Sl extends Y {
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
function wr(r, e) {
  return Math.round(r.measureText(e).width);
}
function _e(r = ut.fontSize, e = ut.fontWeight, i = ut.fontFamily) {
  return `${e} ${r}px ${i}`;
}
function Si(r, e, i) {
  r.font = _e(i?.fontSize, i?.fontWeight, i?.fontFamily);
  const s = wr(r, e), n = i?.paddingLeft || 0, o = i?.paddingRight || 0, a = i?.borderWidth || 0;
  return n + o + s + a * 2;
}
function bi(r) {
  const e = r?.paddingTop || 0, i = r?.paddingBottom || 0, s = r?.borderWidth || 0, n = r?.fontSize || 0;
  return e + i + n + s * 2;
}
function bl(r, e, i, s) {
  r.fillStyle = s?.colour, r.font = _e(s?.fontSize, s?.fontWeight, s?.fontFamily), r.textAlign = s?.textAlign || "start", r.textBaseLine = s?.textBaseLine || "alphabetic", r.direction = s?.direction || "inherit", r.lineWidth = s?.width, r.strokeStyle = s?.border, s?.stroke ? r.strokeText(s?.text, e, i, s?.max) : r.fillText(s?.text, e, i, s?.max);
}
function Oe(r, e, i, s, n) {
  r.save(), r.font = _e(n?.fontSize, n?.fontWeight, n?.fontFamily), r.textBaseline = "top", r.fillStyle = n?.bakCol || ut.bakCol;
  let o = n?.width || Si(r, e, n), a = n?.height || bi(n);
  r.fillRect(i, s, o, a), r.fillStyle = n?.txtCol || ut.txtCol, i = i + n?.paddingLeft, s = s + n?.paddingTop, r.fillText(`${e}`, i, s), r.restore();
}
class Cl extends Y {
  #t = [0, 0];
  constructor(e, i = !1, s = !1, n, o) {
    i = o.time.xAxis, super(e, i, s, n, o), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context, i = this.target.viewport.container.getBoundingClientRect(), s = this.core.mousePos.x - i.left;
    let n = this.xAxis.xPos2Time(s), o = new Date(n), a = o.toUTCString(), l = {
      fontSize: this.theme.xAxis.fontSize * 1.05,
      fontWeight: this.theme.xAxis.fontWeight,
      fontFamily: this.theme.xAxis.fontFamily,
      txtCol: this.theme.xAxis.colourCursor,
      bakCol: this.theme.xAxis.colourCursorBG,
      paddingTop: 5,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4
    }, c = Si(e, a, l), g = s + this.core.bufferPx;
    g = this.xAxis.xPosSnap2CandlePos(g), g = g - Math.round(c * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), e.save(), Oe(e, a, g, 1, l), e.restore();
  }
}
const Ml = [
  ["labels", { class: El, fixed: !1, required: !0 }],
  ["overlay", { class: Sl, fixed: !1, required: !0 }],
  ["cursor", { class: Cl, fixed: !1, required: !0 }]
];
class Pl {
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
  #d = new ft();
  #f;
  #v;
  #w;
  #p;
  #y;
  #m;
  #b;
  #L;
  #g;
  #C;
  #M;
  #A;
  #S;
  #E;
  #P = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #T = { end: !1, start: !1 };
  constructor(e, i) {
    this.#n = e, this.#s = i, this.#i = i.elements.elTime, this.#o = e.Chart, this.#h = new ml(this, this.#o), this.init();
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
  set id(e) {
    this.#t = String(e).replace(/ |,|;|:|\.|#/g, "_");
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
  set width(e) {
    this.setWidth(e);
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
    return this.#L;
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
  set stateMachine(e) {
    this.#l = new Ht(e, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get time() {
    return this;
  }
  init() {
    const e = this.#i;
    this.#a = e.viewport, this.#c = e.overview, this.#v = e.overview.icons, this.#w = e.overview.scrollBar, this.#p = e.overview.handle, this.#y = e.overview.rwdStart, this.#m = e.overview.fwdEnd;
    const i = {
      core: this.#n,
      elContainer: this.#w,
      elHandle: this.#p,
      callback: null
    };
    this.#E = new Ts(i), this.#n.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(e) {
    this.#i.style.width = `${e}px`, this.#a.style.width = `${e}px`;
  }
  setDimensions(e) {
    const i = this.config.buffer || Ti, s = e.w, n = this.height, o = Math.round(s * ((100 + i) * 0.01));
    this.#u.setSize(s, n, o), this.draw();
  }
  navigationDisplay(e) {
    if (e)
      this.#m.style["margin-top"] = 0, this.#y.style["margin-top"] = 0;
    else {
      const i = this.core.theme.xAxis?.background ? this.core.theme.xAxis.Background : this.core.theme.chart.Background;
      this.#c.style.visibility = "hidden", this.#m.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#y.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#m.style.background = this.core.theme.chart.Background, this.#y.style.background = i;
    }
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#h.initXAxisGrads(), this.draw(), this.eventsListen(), Fi.id = this.id, Fi.context = this, this.stateMachine = Fi, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#C.destroy(), this.#M.destroy(), this.#A.destroy(), this.off("main_mousemove", this.drawCursorTime), this.off("setRange", this.onSetRange), this.#m.removeEventListener("click", dt), this.#y.removeEventListener("click", dt), this.#u.destroy(), this.element.remove();
  }
  eventsListen() {
    this.#C = new Mt(this.#a, { disableContextMenu: !1 }), this.#C.on("dblclick", this.onDoubleClick.bind(this)), this.#C.on("pointerover", this.onPointerEnter.bind(this)), this.#C.on("pointerout", this.onPointerLeave.bind(this)), this.#C.on("pointerdrag", this.onPointerDrag.bind(this)), this.#M = new Mt(this.#m, { disableContextMenu: !1 }), this.#M.on("pointerover", () => this.showJump(this.#T.end)), this.#M.on("pointerleave", () => this.hideJump(this.#T.end)), this.#A = new Mt(this.#y, { disableContextMenu: !1 }), this.#A.on("pointerover", () => this.showJump(this.#T.start)), this.#A.on("pointerleave", () => this.hideJump(this.#T.start)), this.on("main_mousemove", this.#g.draw, this.#g), this.on("setRange", this.onSetRange, this), this.#m.addEventListener("click", dt(this.onMouseClick, 1e3, this, !0)), this.#y.addEventListener("click", dt(this.onMouseClick, 1e3, this, !0));
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
    this.#n.theme?.time?.navigation === !1 && !(this.#T.end && this.#T.start) && (this.#c.style.visibility = "hidden");
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
    let s = this.#w.getBoundingClientRect().width, n = e.dataLength + e.limitFuture + e.limitPast, o = s / n, a = e.Length * o, l = (i + e.limitPast) * o;
    this.#E.setHandleDims(l, a);
  }
  t2Index(e) {
    return this.#h.t2Index(e);
  }
  xPos(e) {
    return this.#h.xPos(e);
  }
  xPosSnap2CandlePos(e) {
    return this.#h.xPosSnap2CandlePos(e);
  }
  xPos2Time(e) {
    return this.#h.xPos2Time(e);
  }
  xPos2Index(e) {
    return this.#h.xPos2Index(e);
  }
  xPosOHLCV(e) {
    return this.#h.xPosOHLCV(e);
  }
  createGraph() {
    let e = nt(Ml);
    this.#u = new ae(this, this.#a, e, !1), this.#g = this.graph.overlays.get("cursor").instance, this.#b = this.graph.overlays.get("labels").instance, this.#L = this.graph.overlays.get("overlay").instance;
  }
  addOverlays(e) {
    for (let i of e)
      ;
    this.graph.addOverlays(Array.from(this.#d));
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
    this.#n.theme?.time?.navigation === !1 && (this.#c.style.visibility = "hidden");
  }
  showJump(e) {
    this.#c.style.visibility = "visible", this.hideCursorTime();
  }
}
const Ll = {
  renderQ: new ft(),
  rendered: [],
  renderLog: !1,
  dropFrames: !0,
  graphs: [],
  range: {},
  init: function(r) {
    T(r) && (this.renderLog = r?.renderLog || !1, this.dropFrames = r?.dropFrames || !0, this.graphs = C(r?.graphs) ? [...r.graphs] : [], this.range = T(r?.range) ? r.range : {});
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
        $(i.draw) && i.draw(e.range, e.update);
      for (let i of e.graphs)
        $(i.render) && i.render();
      this.frameDone();
    }
  }
}, ii = Ll, Bn = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select"
];
class Al {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h = [];
  #l;
  #a = {};
  #c;
  #u;
  #d = null;
  constructor(e, i) {
    this.#t = e, this.#e = i, this.#r = i.core, this.#s = i.core.theme.legend, this.init(), this.eventsListen();
  }
  get elTarget() {
    return this.#t;
  }
  get list() {
    return this.#a;
  }
  set collapse(e) {
    this.setCollapse(e);
  }
  get collapse() {
    return this.#o;
  }
  destroy() {
    this.#r.off("chart_pan", this.primaryPanePan), this.#r.off("chart_panDone", this.primaryPanePanDone);
    for (let e in this.#a)
      e !== "collapse" && this.remove(e);
    this.#t.remove();
  }
  eventsListen() {
    this.#r.on("chart_pan", this.primaryPanePan.bind(this)), this.#r.on("chart_panDone", this.primaryPanePanDone.bind(this));
  }
  init() {
    const e = this.#t.legends;
    this.#n = e.querySelector(".controls"), this.#o = e.querySelectorAll(".control"), this.#c = e.querySelector("#showLegends"), this.#u = e.querySelector("#hideLegends"), this.#n.style.display = "none", this.icons(this.#o, { id: "collapse", parent: this }), this.#t.legends.classList.add("hide"), this.#d = "hide", this.collapse = "show";
  }
  onMouseClick(e) {
    const i = (s) => S(s.dataset.icon) ? { id: s.id, icon: s.dataset.icon } : s.parentElement.className !== "controls" ? i(s.parentElement) : !1;
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
    for (let e of Bn)
      this.#t.style.setProperty(e, "none");
  }
  primaryPanePanDone() {
    for (let e of Bn)
      this.#t.style.removeProperty(e);
  }
  add(e) {
    if (!T(e) || !("title" in e))
      return !1;
    const i = () => {
      this.#r.error("ERROR: Legend parent missing!");
    };
    e.id = e?.id || et("legend"), e.type = e?.type || "overlay", e.parent = e?.parent || i;
    const s = this.elTarget.buildLegend(e, this.#r.theme);
    this.#t.legends.insertAdjacentHTML("beforeend", s);
    const n = this.#t.legends.querySelector(`#legend_${e.id}`);
    return this.#l = n.querySelectorAll(".control"), this.#a[e.id] = {
      el: n,
      type: e.type,
      source: e?.source,
      click: []
    }, this.icons(this.#l, e), e.type == "indicator" && (this.#n.style.display = "block", !e.parent.primaryPane && Object.keys(this.#a).length < 3 && (this.#n.style.display = "none")), e.id;
  }
  remove(e) {
    if (!(e in this.#a) || this.#a[e].type === "chart")
      return !1;
    this.#a[e].el.remove();
    for (let i of this.#a[e].click)
      i.el.removeEventListener("click", i.click);
    return delete this.#a[e], Object.keys(this.#a).length < 2 && (this.#n.style.display = "none"), !0;
  }
  update(e, i) {
    if (!T(i) || !(e in this.#a) || this.#r.range.data.length == 0)
      return !1;
    let s = this.#a[e].source(i.pos);
    const n = this.#t.buildInputs(s);
    this.#t.legends.querySelector(`#legend_${e} dl`).innerHTML = n;
  }
  icons(e, i) {
    let s;
    for (let n of e) {
      let o = n.querySelector("svg");
      o.style.width = `${this.#s.controlsW}px`, o.style.height = `${this.#s.controlsH}px`, o.style.fill = `${this.#s.controlsColour}`, o.onpointerover = (a) => a.currentTarget.style.fill = this.#s.controlsOver, o.onpointerout = (a) => a.currentTarget.style.fill = this.#s.controlsColour, s = i.parent.onLegendAction.bind(i.parent), i.id === "collapse" ? this.#h.push({ el: n, click: s }) : this.#a[i.id].click.push({ el: n, click: s }), n.addEventListener("click", s);
    }
  }
}
const Vi = {
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
};
class Il extends pr {
  #t;
  #e;
  #r;
  #s;
  #i = Kt[0];
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
  #l = Zs;
  #a = ma;
  #c = 3;
  #u;
  #d;
  constructor(e, i, s = Kt[0], n) {
    super(e), this.#r = i, this.#e = e, this.#t = e.parent, this.yAxisType = s, n = n || this.core.range, this.setRange(n);
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
  set yAxisPadding(e) {
    this.#h = e;
  }
  get yAxisPadding() {
    return this.#h;
  }
  set yAxisType(e) {
    this.#i = Kt.includes(e) ? e : Kt[0];
  }
  get yAxisType() {
    return this.#i;
  }
  set yAxisStep(e) {
    this.#l = E(e) ? e : Zs;
  }
  get yAxisStep() {
    return this.#l;
  }
  set yAxisTicks(e) {
    this.#c = E(e) ? e : 0;
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
    return this.#n;
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
        return it(this.p100toPixel(e));
      case "log":
        return it(this.$2Pixel(Jo(e)));
      default:
        return it(this.$2Pixel(e));
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
    let i = this.height / this.#d.diff;
    return (e - this.#d.max) * -1 * i;
  }
  yAxisTransform() {
  }
  setMode(e) {
    if (!["automatic", "manual"].includes(e))
      return !1;
    const i = this.#o;
    return this.mode == "automatic" && e == "manual" ? (i.manual.zoom = 0, i.manual.max = this.#d.valueMax, i.manual.min = this.#d.valueMin, this.#n = e) : this.mode == "manual" && e == "automatic" && (i.manual.zoom = 0, this.#n = e), !0;
  }
  setOffset(e) {
    if (!E(e) || e == 0 || this.#n !== "manual")
      return !1;
    const i = this.#o;
    let s = this.pixel2$(e * -1), n = this.pixel2$(this.height - e), o = s - n;
    i.manual.min = n, i.manual.max = s, i.manual.mid = o / 2, i.manual.diff = o, i.manual.zoom = 0;
  }
  setZoom(e) {
    if (!E(e) || this.#n !== "manual")
      return !1;
    const i = this.#o;
    let s = i.manual.min, n = i.manual.max;
    const o = n - s, a = o * 0.01, l = e * a;
    s -= l, n += l, !(n < s || s <= 1 / 0 * -1 || n >= 1 / 0) && (i.manual.max = n, i.manual.min = s, i.manual.mid = o / 2, i.manual.diff = o, i.manual.zoom = l, this.calcGradations());
  }
  setRange(e) {
    this.#o.automatic.range = e, this.#d = new Proxy(e, {
      get: (i, s) => {
        const n = this.#n, o = this.#o;
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
        e = this.#d.max > 0 ? this.#d.max : 100, i = this.#d.min > 0 ? this.#d.min : 0, s = this.#d.offset, this.#u = this.gradations(e + s, i + s);
        break;
      default:
        e = this.#d.max > 0 ? this.#d.max : 1, i = this.#d.min > 0 ? this.#d.min : 0, s = this.#d.offset, this.#u = this.gradations(e + s, i + s);
        break;
    }
    return this.#u;
  }
  gradations(e, i, s = !0, n = !1) {
    let o, a, l;
    const c = [];
    a = e - i, a = this.rangeH > 0 ? this.rangeH : 1, l = a / (this.height / (this.core.theme.yAxis.fontSize * 1.75));
    let g = Math.pow(10, Math.ceil(Math.log10(l)));
    l < 0.25 * g ? g = 0.25 * g : l < 0.5 * g && (g = 0.5 * g);
    var p = Math.ceil(i / g) * g, x = Math.floor(e / g) * g;
    let M = this.height, L = (x - p) / g, q = this.height / L, z = this.countDigits(L), ot;
    for (var N = p; N <= x; N += g)
      o = this.countDigits(N), ot = this.niceValue(o, s, z), c.push([ot, Ni(M), o]), M -= q;
    return c;
  }
  niceValue(e, i = !0, s) {
    if (e.integers) {
      let n = s.integers;
      if (n - 2 > 0) {
        let o = ta(10, n - 2);
        return Math.floor(e.value / o) * o;
      } else
        return i ? (n = n > 0 ? n : n * -1, Ni(e.value, n)) : Math.floor(e.value);
    } else {
      let n = e.decimals - s.decimals;
      return n = n > 0 ? n : n * -1, Ni(e.value, n);
    }
  }
  limitPrecision(e) {
    let i = e.value, s = this.#a - e.total, n = 4 - e.integers;
    if (s < 1) {
      let o = _(e.decimals + s, 0, 100);
      i = Number.parseFloat(i).toFixed(o);
    } else if (n < 1) {
      let o = 2 - n;
      i = Number.parseFloat(i).toFixed(o);
    }
    return i;
  }
}
const Ol = {
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
class Rl extends Y {
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
    }, a = o.fontSize + o.paddingTop + o.paddingBottom, l = i - a * 0.5;
    const c = this.scene.context;
    this.scene.clear(), c.save(), c.fillStyle = o.bakCol, c.fillRect(1, l, this.width, a), Oe(c, `${n}`, 1, l, o), c.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
class Dl extends Y {
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context, i = this.yAxis, s = this.yAxis.calcGradations() || [], n = this.theme.yAxis, o = K(n.tickMarker) ? n.tickMarker : !0;
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
    for (let c of s)
      l = i.$2Pixel(c[0]), e.fillText(c[0], i.yAxisTicks + 5, l + n.fontSize * 0.3), o && (e.beginPath(), e.moveTo(a[0], l), e.lineTo(a[1], l), e.stroke());
    e.restore();
  }
}
class kl extends Y {
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
class _l extends Y {
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (e === void 0)
      return;
    const i = this.scene.context, s = this.core.stream instanceof Jt && this.config.stream.tfCountDown;
    let n = e[4], o = this.parent.nicePrice(n), a = {
      fontSize: wt.FONTSIZE * 1.05,
      fontWeight: wt.FONTWEIGHT,
      fontFamily: wt.FONTFAMILY,
      txtCol: "#FFFFFF",
      bakCol: wt.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }, l = 0, c = bi(a), g = this.parent.yPos(n) - c * 0.5;
    this.scene.clear(), i.save(), e[4] >= e[1] ? a.bakCol = this.theme.candle.UpBodyColour : a.bakCol = this.theme.candle.DnBodyColour, Oe(i, o, l, g, a), s && (o = this.core.stream.countDownUpdate(), a.fontSize = a?.fontSize / 1.1, Oe(i, o, l, g + c, a)), i.restore(), this.viewport.render();
  }
}
const Nl = [
  ["labels", { class: Dl, fixed: !0, required: !0 }],
  ["overlay", { class: kl, fixed: !0, required: !0 }],
  ["price", { class: _l, fixed: !0, required: !0 }],
  ["cursor", { class: Rl, fixed: !0, required: !0 }]
];
class $l {
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
  #p = new ft();
  #y;
  #m;
  #b;
  #L;
  #g = {};
  constructor(e, i) {
    this.#s = e, this.#i = { ...i }, this.#c = this.#i.elScale, this.#h = this.#i.chart, this.#n = this.#i.parent, this.id = `${this.#n.id}_scale`, this.init();
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
    this.#t = String(e).replace(/ |,|;|:|\.|#/g, "_");
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
    this.#y = e;
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
    this.#o = new Ht(e, this);
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
    const e = this.#n.name == "Chart" ? void 0 : this.#n.localRange;
    this.#a = new Il(this, this, this.options.yAxisType, e), this.createGraph(), this.addOverlays([]), this.#a.calcGradations(), this.draw(), this.eventsListen();
    const i = nt(Ol);
    i.id = this.id, i.context = this, this.stateMachine = i, this.stateMachine.start();
  }
  restart() {
    this.#a.setRange(this.#s.range), this.draw();
  }
  destroy() {
    this.stateMachine.destroy(), this.#y.destroy(), this.#m.destroy(), this.off(`${this.#n.id}_mousemove`, this.onMouseMove), this.off(`${this.#n.id}_mouseout`, this.#w.erase), this.off(Ct, this.onStreamUpdate), this.element.remove();
  }
  eventsListen() {
    let e = this.#y.viewport.scene.canvas;
    this.#m = new Mt(e, { disableContextMenu: !1 }), this.#m.setCursor("ns-resize"), this.#m.on("pointerdrag", this.onDrag.bind(this)), this.#m.on("pointerdragend", this.onDragDone.bind(this)), this.#m.on("wheel", this.onMouseWheel.bind(this)), this.#m.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.#n.id}_mousemove`, this.onMouseMove, this), this.on(`${this.#n.id}_mouseout`, this.#w.erase, this.#w), this.on(Ct, this.#v.draw, this.#v);
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
    this.#L = C(e) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)], this.#w.draw(this.#L);
  }
  onDrag(e) {
    this.#L = [
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
    this.#a.mode === "manual" && (this.#a.offset = e.domEvent.srcEvent.movementY, this.parent.draw(this.range, !0), this.draw());
  }
  setHeight(e) {
    this.#c.style.height = `${e}px`;
  }
  setDimensions(e) {
    const i = this.#c.getBoundingClientRect().width;
    this.setHeight(e.h), this.graph instanceof ae && (this.#y.setSize(i, e.h, i), this.draw());
  }
  setScaleRange(e = 0) {
    this.#a.mode == "automatic" && (this.#a.mode = "manual"), this.#a.zoom = e, this.parent.draw(this.range, !0), this.draw();
  }
  resetScaleRange() {
    this.#a.mode = "automatic", this.parent.draw(this.range, !0), this.draw();
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
    let e = nt(Nl);
    this.graph = new ae(this, this.#u, e, !1), this.#w = this.graph.overlays.get("cursor").instance, this.#d = this.graph.overlays.get("labels").instance, this.#f = this.graph.overlays.get("overlay").instance, this.#v = this.graph.overlays.get("price").instance;
  }
  addOverlays(e) {
    for (let i of e)
      ;
    this.graph.addOverlays(Array.from(this.#p));
  }
  render() {
    this.#y.render();
  }
  draw(e = this.range, i = !0) {
    this.#y.draw(e, i), this.#n.drawGrid();
  }
  resize(e = this.width, i = this.height) {
    this.setDimensions({ w: e, h: i });
  }
}
class Hl {
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
class Bl extends Y {
  #t;
  #e;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i = !1, s = !1, n, o, a), this.#t = new Hl(e.scene, n), this.theme.volume.Height = _(n?.volume?.Height, 0, 100) || 100;
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
    }, l = Math.floor(s * this.theme.volume.Height / 100);
    let c = this.core.rangeScrollOffset, g = e.indexStart - c, p = e.Length + c * 2, x = p, M = g, L, q = 0;
    for (; x--; )
      L = e.value(M), L[4] !== null && (q = L[5] > q ? L[5] : q), M++;
    for (; p--; )
      L = e.value(g), a.x = it(this.xAxis.xPos(L[0]) - o / 2), L[4] !== null && (a.h = l - l * ((q - L[5]) / q), a.raw = i[g], this.#t.draw(a)), g++;
  }
}
class xr {
  areaCoordinates = [];
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = i;
  }
  draw(e) {
    const i = this.ctx, s = e.raw[4] >= e.raw[1], n = s ? this.cfg.candle.UpBodyColour : this.cfg.candle.DnBodyColour, o = s ? this.cfg.candle.UpWickColour : this.cfg.candle.DnWickColour;
    switch (this.cfg.candle.Type) {
      case X.CANDLE_SOLID:
        this.fill = !0;
        break;
      case X.CANDLE_HOLLOW:
      case X.OHLC:
        this.fill = !1;
        break;
      case X.CANDLE_UP_HOLLOW:
        this.fill = !s;
        break;
      case X.CANDLE_DOWN_HOLLOW:
        this.fill = s;
    }
    let a = Math.max(e.w - 1, 1);
    a < 3 ? a = 1 : a < 5 ? a = 3 : a > 5 && (a = Math.ceil(a * 0.8));
    let l = Math.max(Math.floor(a * 0.5), 1), c = Math.abs(e.o - e.c), g = e.c === e.o ? 1 : 2, p = e.x, x = Math.floor(p) - 0.5;
    if (i.save(), i.strokeStyle = o, i.beginPath(), i.moveTo(x, Math.floor(e.h)), this.cfg.candle.Type === X.OHLC ? i.lineTo(x, Math.floor(e.l)) : s ? (i.lineTo(x, Math.floor(e.c)), i.moveTo(x, Math.floor(e.o))) : (i.lineTo(x, Math.floor(e.o)), i.moveTo(x, Math.floor(e.c))), i.lineTo(x, Math.floor(e.l)), i.stroke(), a == 3) {
      i.fillStyle = o;
      let M = s ? 1 : -1;
      i.rect(
        Math.floor(p - l),
        e.c,
        Math.floor(l * 2),
        M * Math.max(c, g)
      ), i.fill(), i.stroke();
    } else if (a > 3 && this.fill) {
      i.fillStyle = n;
      let M = s ? 1 : -1;
      i.rect(
        Math.floor(p - l),
        e.c,
        Math.floor(l * 2),
        M * Math.max(c, g)
      ), i.fill(), i.stroke();
    } else if (a > 3 && !this.fill && this.cfg.candle.Type !== X.OHLC) {
      let M = s ? 1 : -1;
      i.rect(
        Math.floor(p - l),
        e.c,
        Math.floor(l * 2),
        M * Math.max(c, g)
      ), i.stroke();
    } else
      this.cfg.candle.Type === X.OHLC ? (i.beginPath(), i.moveTo(x - l, e.o), i.lineTo(x, e.o), i.moveTo(x, e.c), i.lineTo(x + l, e.c), i.stroke()) : (i.strokeStyle = o, i.beginPath(), i.moveTo(
        x,
        Math.floor(Math.min(e.o, e.c))
      ), i.lineTo(
        x,
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
    if (!C(e) || e.length == 0)
      return;
    let i = this.ctx, s = this.cfg.candle, n;
    Math.max(e[0].w - 1, 1), e[0].x;
    let o = [e[0].x, e[0].h];
    i.save(), i.strokeStyle = s.AreaLineColour || s.UpBodyColour || s.DnBodyColour, i.lineWidth = 1, i.beginPath(), i.moveTo(e[0].x, e[0].h);
    let a = 0;
    for (; a < e.length; )
      i.lineTo(e[a].x, e[a].h), a++;
    if (s?.Type == "area") {
      if (n = i.createLinearGradient(0, 0, 0, this.scene.height), C(s.AreaFillColour))
        for (let [l, c] of s.AreaFillColour.entries())
          n.addColorStop(l, c);
      else
        S() ? n = s.AreaFillColour : n = s.UpBodyColour || s.DnBodyColour;
      i.stroke(), i.lineTo(e[a - 1].x, this.scene.height), i.lineTo(o[0], this.scene.height), i.fillStyle = n, i.closePath(), i.fill();
    } else
      i.stroke();
    i.restore(), e.length = 0;
  }
}
class Tr extends Y {
  #t;
  constructor(e, i = !1, s = !1, n, o) {
    super(e, i = !1, s = !1, n, o), this.#t = new xr(e.scene, n);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e = this.core.range) {
    this.scene.clear();
    let i, s = this.theme.candle.Type;
    switch (s) {
      case X.AREA:
      case X.LINE:
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
    let a = this.core.rangeScrollOffset, l = e.indexStart - a, c = e.Length + a * 2, g;
    for (this.core.stream && (this.core.stream.lastPriceMax = e.valueMax, this.core.stream.lastPriceMin = e.valueMin); c; ) {
      if (g = e.value(l), o.x = this.xAxis.xPos(g[0]), g?.[7]) {
        this.core.stream.lastXPos = o.x, this.core.stream.lastYPos = {
          o: o.o,
          h: o.h,
          l: o.l,
          c: o.c
        };
        break;
      }
      g[4] !== null && (o.o = this.yAxis.yPos(g[1]), o.h = this.yAxis.yPos(g[2]), o.l = this.yAxis.yPos(g[3]), o.c = this.yAxis.yPos(g[4]), o.raw = g, i(o)), l++, c--;
    }
    (s === X.AREA || s === X.LINE) && this.#t.areaRender();
  }
}
function Er(r, e, i, s, n, o) {
  r.lineWidth = o?.width || ut.borderWidth, r.strokeStyle = o?.border || ut.stroke, r.beginPath(), r.rect(e, i, s, n), r.stroke();
}
function Sr(r, e, i, s, n, o) {
  r.fillStyle = o?.fill || ut.fill, r.fillRect(e, i, s, n);
}
function Ul(r, e, i, s, n, o) {
  S(o.fill) && Sr(r, e, i, s, n, o), E(o.width) && o.width > 0 && Er(r, e, i, s, n, o);
}
function br(r, e, i, s, n, o, a) {
  r.lineWidth = a?.width || ut.borderWidth, r.strokeStyle = a?.border || ut.stroke, Mr(r, e, i, s, n, o), r.stroke();
}
function Cr(r, e, i, s, n, o, a) {
  r.fillStyle = a?.fill || ut.fill, Mr(r, e, i, s, n, o), r.fill();
}
function Mr(r, e, i, s, n, o) {
  r.beginPath(), r.moveTo(e + o, i), r.arcTo(e + s, i, e + s, i + n, o), r.arcTo(e + s, i + n, e, i + n, o), r.arcTo(e, i + n, e, i, o), r.arcTo(e, i, e + s, i, o), r.closePath();
}
function zl(r, e, i, s, n, o, a) {
  S(a.fill) && Cr(r, e, i, s, n, o, a?.fill), E(a.width) && a.width > 0 && br(r, e, i, s, n, o, a?.border, a?.width);
}
function Pr(r, e, i, s, n, o, a) {
  if (!(n < 3)) {
    var l = Math.PI * 2 / n;
    r.beginPath(), r.translate(e, i), r.rotate(o * Math.PI / 180), r.moveTo(s, 0);
    for (var c = 1; c < n; c++)
      r.lineTo(s * Math.cos(l * c), s * Math.sin(l * c));
    r.closePath(), he(r, a?.fill, a?.stroke, a?.width);
  }
}
function Wl(r, e, i) {
  if (e.length > 0) {
    r.beginPath();
    var s = e[0];
    r.moveTo(s.x, s.y);
    for (var n = 1; n < e.length; ++n)
      s = e[n], r.lineTo(s.x, s.y);
    r.closePath(), he(r, i?.fill, i?.stroke, i?.width);
  }
}
function Fl(r, e, i, s, n) {
  Pr(r, e, i, s, 3, n?.rotate || 0, n), he(r, n?.fill, n?.stroke, n?.width);
}
function Vl(r, e, i, s, n, o) {
  r.beginPath(), r.moveTo(e - s / 2, i), r.lineTo(e, i - n / 2), r.lineTo(e + s / 2, i), r.lineTo(e, i + n / 2), r.closePath(), he(r, o?.fill, o?.stroke, o?.width);
}
function Gl(r, e, i, s, n) {
  r.beginPath(), r.arc(e, i, s, 0, Math.PI * 2), r.closePath(), fillStroke(r, n?.fill, n?.stroke, n?.width);
}
function Yl(r) {
  return r.ownerDocument && r.ownerDocument.defaultView && r.ownerDocument.defaultView.devicePixelRatio || 2;
}
function he(r, e, i, s) {
  S(e) && (r.fillStyle = e, r.fill()), E(s) && s > 0 && (r.lineWidth = s, r.strokeStyle = i || ut.stroke, r.stroke());
}
function Lr(r, e, i, s, n, o, a, l, c, g) {
  r.drawImage(e, i, s, n, o, a, l, c, g);
}
function Ar(r, e) {
  let i = r.naturalWidth || r.width, s = r.naturalHeight || r.height;
  return e === void 0 && (e = Ir(i, s)), e.ctx.drawImage(r, 0, 0), e;
}
const ql = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};
function Te(r, e) {
  const i = Ar(e), s = i.ctx;
  return s.fillStyle = ql[r], s.globalCompositeOperation = "multiply", s.fillRect(0, 0, s.canvas.width, s.canvas.height), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), s.globalCompositeOperation = "source-over", i;
}
function Xl(r) {
  return {
    red: Te("red", r),
    green: Te("green", r),
    blue: Te("blue", r),
    alpha: Te("alpha", r)
  };
}
function Ir(r, e) {
  const i = document.createElement("canvas");
  return i.ctx = i.getContext("2d"), i.width = r || i.ctx.canvas.width, i.height = e || i.ctx.canvas.height, i;
}
const J = {
  createCanvas: Ir,
  imageToCanvs: Ar,
  seperateRGB: Xl,
  getChannel: Te,
  getPixelRatio: Yl,
  fillStroke: he,
  calcTextWidth: wr,
  createFont: _e,
  getTextRectHeight: bi,
  getTextRectWidth: Si,
  renderImage: Lr,
  renderText: bl,
  renderTextBG: Oe,
  renderPath: le,
  renderPathStroke: jl,
  renderPathClosed: Zl,
  renderSpline: Kl,
  renderLine: Jl,
  renderLineHorizontal: Or,
  renderLineVertical: Ql,
  renderCircle: Gl,
  renderRect: Ul,
  renderRectFill: Sr,
  renderRectStroke: Er,
  renderRectRound: zl,
  renderRectRoundFill: Cr,
  renderRectRoundStroke: br,
  renderPolygonRegular: Pr,
  renderPolygonIrregular: Wl,
  renderDiamond: Vl,
  renderTriangle: Fl
};
function le(r, e, i, s) {
  r.save();
  const n = i.width || 1;
  r.lineWidth = n, n % 2 && r.translate(0.5, 0.5), r.strokeStyle = i.stroke, C(i.dash) && r.setLineDash(i.dash), r.beginPath();
  let o = !0;
  e.forEach((a) => {
    a && a.x !== null && (o ? (r.moveTo(a.x, a.y), o = !1) : r.lineTo(a.x, a.y));
  }), s(), r.restore();
}
function jl(r, e, i) {
  le(r, e, i, () => {
    r.stroke();
  });
}
function Zl(r, e, i) {
  le(r, e, i, () => {
    r.closePath();
  }), he(r, opts?.fill, opts?.stroke, opts?.size);
}
function Kl(r, e, i) {
  r.beginPath(), r.moveTo(e[0].x, e[0].y);
  for (var s = i ?? 1, n = 0; n < e.length - 1; n++) {
    var o = n > 0 ? e[n - 1] : e[0], a = e[n], l = e[n + 1], c = n != e.length - 2 ? e[n + 2] : l, g = a.x + (l.x - o.x) / 6 * s, p = a.y + (l.y - o.y) / 6 * s, x = l.x - (c.x - a.x) / 6 * s, M = l.y - (c.y - a.y) / 6 * s;
    r.bezierCurveTo(g, p, x, M, l.x, l.y);
  }
  r.stroke();
}
function Or(r, e, i, s, n) {
  le(r, [{ x: i, y: e }, { x: s, y: e }], n, () => {
    r.stroke(), r.closePath();
  });
}
function Ql(r, e, i, s, n) {
  coords = [{ x: e, y: i }, { x: e, y, bottom: s }], le(r, coords, n, () => {
    r.stroke(), r.closePath();
  });
}
function Jl(r, e, i) {
  le(r, e, i, () => {
    r.stroke(), r.closePath();
  });
}
class tc extends Y {
  #t;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i = !1, s = !1, n, o, a), this.#t = new xr(e.scene, n), this.theme.priceLineStyle = this.theme?.priceLineStyle || hl;
  }
  set position(e) {
    this.setPosition(e[0], e[1]);
  }
  setPosition(e, i) {
    this.core.stream !== void 0 && (this.target.setPosition(e, i), this.core.stream.lastScrollPos = this.core.scrollPos);
  }
  draw() {
    if (this.core.stream === void 0 || !C(this.chart.streamCandle))
      return;
    this.scene.clear();
    const e = this.core.range, i = this.chart.streamCandle, s = this.theme.candle.Type === X.AREA || this.theme.candle.Type === X.LINE ? (a) => {
      this.areaRender(a);
    } : (a) => {
      this.#t.draw(a);
    };
    this.xAxis.smoothScrollOffset;
    const o = {
      x: this.core.stream.lastXPos,
      w: this.xAxis.candleW
    };
    o.o = this.yAxis.yPos(i[1]), o.h = this.yAxis.yPos(i[2]), o.l = this.yAxis.yPos(i[3]), o.c = this.yAxis.yPos(i[4]), o.raw = i, e.inRenderRange(i[0]) && s(o), i[4] >= i[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, Or(
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
    }, o = this.scene.context, a = this.theme, l = a.candle.UpBodyColour || a.candle.DnBodyColour;
    Math.max(e.w - 1, 1), e.x;
    let c;
    if (o.save(), o.fillStyle = l, o.strokeStyle = l, o.lineWidth = 1, o.beginPath(), o.moveTo(e.x, e.c), o.lineTo(n.x, n.h), a.candle.Type === X.AREA) {
      if (c = o.createLinearGradient(0, 0, 0, this.scene.height), C(a.candle.AreaFillColour))
        for (let [g, p] of a.candle.AreaFillColour.entries())
          c.addColorStop(g, p);
      else
        isString() ? c = a.candle.AreaFillColour : c = a.candle.UpBodyColour || a.candle.DnBodyColour;
      o.stroke(), o.lineTo(n.x, this.scene.height), o.lineTo(e.x, this.scene.height), o.fillStyle = c, o.closePath(), o.fill();
    } else
      o.stroke();
    o.restore();
  }
}
class ec {
  data;
  icon;
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = i.events;
    const s = { w: this.cfg.iconWidth, h: this.cfg.iconHeight };
    this.icon = I.svgToImage(this.cfg.iconEvent, this.cfg.iconColour, s);
  }
  draw(e) {
    this.data = e;
    const i = this.icon, s = this.cfg, n = _(e.w, s.iconMinDim, s.iconHeight), o = _(e.w, s.iconMinDim, s.iconWidth), a = this.data.x, l = this.data.y, c = this.scene.context;
    return c.save(), c.drawImage(i, a, l, o, n), c.restore(), { x: a, y: l, w: o, h: n };
  }
}
const ic = {
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
class sc extends Y {
  #t;
  #e = [];
  #r;
  #s = (e) => dt(this.isNewsEventSelected, 100, this);
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i = !1, s = !1, n, o, a), this.#t = new ec(e.scene, n), this.emit(), this.core.on("primary_pointerdown", dt(this.isNewsEventSelected, 200, this), this), this.#r = this.core.WidgetsG.insert("Dialogue", ic), this.#r.start();
  }
  destroy() {
    this.core.off("primary_pointerdown", this.#s);
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
    const i = e[0], s = e[1], n = this.theme.events, o = _(this.xAxis.candleW, n.iconMinDim, n.iconHeight), a = this.xAxis.pixel2T(i);
    this.core.range.valueByTS(a);
    for (let l in this.data)
      if (l *= 1, a === l) {
        let c = this.xAxis.xPos(a), g = this.scene.height - _(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5;
        if (i >= c - o / 2 && i <= c + o / 2 && s >= g && s <= g + o) {
          console.log("event ", a, " selected");
          let p = "";
          for (let M of this.data[l])
            p += this.buildNewsEventHTML(M);
          const x = {
            dimensions: { h: 150, w: 150 },
            position: { x: c + o / 2 + 1, y: g, relativeY: "bottom" },
            content: p
          };
          this.core.emit("event_selected", l), this.#r.open(x);
        }
      }
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
    this.scene.clear(), this.#e.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.events, o = this.core.rangeScrollOffset, a = e.indexStart - o, l = e.Length + o * 2, c, g;
    for (; l; ) {
      if (c = e.value(a), g = `${c[0]}`, Object.keys(this.data).indexOf(g) >= 0)
        for (let p of this.data[g])
          s.x = this.xAxis.xPos(c[0]) - this.xAxis.candleW / 2, s.y = this.scene.height - _(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, this.#e.push(this.#t.draw(s));
      a++, l--;
    }
  }
}
class nc {
  data;
  buy;
  sell;
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = i.trades;
    const s = { w: this.cfg.iconWidth, h: this.cfg.iconHeight };
    this.buy = I.svgToImage(this.cfg.iconBuy, this.cfg.buyColour, s), this.sell = I.svgToImage(this.cfg.iconSell, this.cfg.sellColour, s);
  }
  draw(e) {
    this.data = e;
    const i = e.side === "buy" ? this.buy : this.sell, s = this.cfg, n = _(e.w, s.iconMinDim, s.iconHeight), o = _(e.w, s.iconMinDim, s.iconWidth), a = this.data.x, l = this.data.y, c = this.scene.context;
    return c.save(), c.drawImage(i, a, l, o, n), c.restore(), { x: a, y: l, w: o, h: n };
  }
}
const rc = {
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
class oc extends Y {
  #t;
  #e = [];
  #r;
  #s;
  #i = (e) => dt(this.isTradeSelected, 100, this);
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i = !1, s = !1, n, o, a), this.#t = new nc(e.scene, n), this.emit(), this.core.on("primary_pointerdown", dt(this.isTradeSelected, 200, this), this), this.#s = this.core.WidgetsG.insert("Dialogue", rc), this.#s.start();
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
    const i = e[0], s = e[1], n = this.theme.trades, o = _(this.xAxis.candleW, n.iconMinDim, n.iconHeight), a = this.xAxis.pixel2T(i), l = this.core.range.valueByTS(a);
    for (let c in this.data)
      if (c *= 1, a === c) {
        let g = this.xAxis.xPos(a), p = this.yAxis.yPos(l[2]) - o * 1.5;
        if (i >= g - o / 2 && i <= g + o / 2 && s >= p && s <= p + o) {
          let x = "";
          for (let L of this.data[c])
            x += this.buildTradeHTML(L);
          const M = {
            dimensions: { h: 150, w: 150 },
            position: { x: g + o / 2 + 1, y: p },
            content: x
          };
          this.core.emit("trade_selected", c), this.#s.open(M);
        }
      }
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
    this.scene.clear(), this.#e.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.trades, o = this.core.rangeScrollOffset, a = e.indexStart - o, l = e.Length + o * 2, c, g;
    for (; l; ) {
      if (c = e.value(a), g = `${c[0]}`, Object.keys(this.data).indexOf(g) >= 0)
        for (let p of this.data[g])
          s.x = this.xAxis.xPos(c[0]) - this.xAxis.candleW / 2, s.y = this.yAxis.yPos(c[2]) - _(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.side = p.side, this.#e.push(this.#t.draw(s));
      a++, l--;
    }
  }
}
class ac extends Y {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.params.content = a?.content || "";
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw() {
    if (this.config?.watermark?.imgURL)
      I.isImage(this.config?.watermark?.imgURL, this.renderImage.bind(this));
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
    }, a = this.config.watermark.text, l = this.scene.context;
    l.font = _e(o?.fontSize, o?.fontWeight, o?.fontFamily), l.textBaseline = "top", l.fillStyle = o.txtCol;
    const c = bi(o), g = Si(l, a, o), p = (this.scene.width - g) / 2, x = (this.scene.height - c) / 2;
    l.fillText(a, p, x);
  }
  renderImage(e) {
    if (!e)
      return;
    const i = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT, s = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH, n = (this.scene.width - s) / 2, o = (this.scene.height - i) / 2;
    this.scene.clear();
    const a = this.scene.context;
    a.save(), Lr(a, e, n, o, i, s), a.restore();
  }
}
const hc = {
  primaryPane: [
    ["watermark", { class: ac, fixed: !0, required: !0, params: { content: null } }],
    ["grid", { class: pi, fixed: !0, required: !0, params: { axes: "y" } }],
    ["volume", { class: Bl, fixed: !1, required: !0, params: { maxVolumeH: oi.ONCHART_VOLUME_HEIGHT } }],
    ["candles", { class: Tr, fixed: !1, required: !0 }],
    ["stream", { class: tc, fixed: !1, required: !0 }],
    ["cursor", { class: ns, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: pi, fixed: !0, required: !0, params: { axes: "y" } }],
    ["cursor", { class: ns, fixed: !0, required: !0 }]
  ]
}, Un = {
  primaryPane: {
    trades: { class: oc, fixed: !1, required: !1 },
    events: { class: sc, fixed: !1, required: !1 }
  },
  secondaryPane: {
    candles: { class: Tr, fixed: !1, required: !0 }
  }
}, mt = {
  id: "chart",
  title: "",
  type: "chart",
  source: () => {
  }
};
class Re {
  static #t = 0;
  static get cnt() {
    return Re.#t++;
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
  #b;
  #L;
  #g;
  #C;
  #M = new ft();
  #A = new ft();
  #S = [0, 0];
  #E = !1;
  #P;
  #T;
  #x;
  #k = {
    valueMax: 100,
    valueMin: 0,
    valueDiff: 100
  };
  #R = {};
  constructor(e, i) {
    if (this.#n = e, this.#a = Re.cnt, !T(i))
      return;
    this.#o = { ...i }, this.#r = this.#o.name, this.#s = this.#o.shortName, this.#i = this.#o.title, this.#c = this.#o.type == "primary" ? "primaryPane" : "secondaryPane", this.#g = this.#o.view, this.#f = this.#o.elements.elScale, this.#h = this.#o.parent, this.#d = this.#o.elements.elTarget, this.#d.id = this.id, this.legend = new Al(this.elLegend, this), this.isPrimary ? (mt.type = "chart", mt.title = this.title, mt.parent = this, mt.source = this.legendInputs.bind(this), this.legend.add(mt), this.yAxisType = "default") : (mt.type = "secondary", mt.title = "", mt.parent = this, mt.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(mt), this.yAxisType = this.core.indicatorClasses[i.view[0].type].ind.scale);
    const s = { ...i };
    s.parent = this, s.chart = this, s.elScale = this.elScale, s.yAxisType = this.yAxisType, this.scale = new $l(this.core, s), this.#u = "init", this.log(`${this.name} instantiated`);
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
    this.#e = String(e).replace(/ |,|;|:|\.|#/g, "_");
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
  set title(e) {
    this.setTitle(e);
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
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#d.getBoundingClientRect().width;
  }
  set height(e) {
    this.setHeight(e);
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
    return this.#k;
  }
  get stream() {
    return this.#b;
  }
  get streamCandle() {
    return this.#L;
  }
  set cursor(e) {
    this.element.style.cursor = e;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#S;
  }
  set cursorActive(e) {
    this.#E = e;
  }
  get cursorActive() {
    return this.#E;
  }
  get cursorClick() {
    return this.#P;
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
  set layerWidth(e) {
    this.#p.layerWidth = e;
  }
  get layerWidth() {
    return this.#p.layerWidth;
  }
  set legend(e) {
    this.#y = e;
  }
  get legend() {
    return this.#y;
  }
  set time(e) {
    this.#w = e;
  }
  get time() {
    return this.#w;
  }
  set scale(e) {
    this.#v = e;
  }
  get scale() {
    return this.#v;
  }
  set yAxisType(e) {
    this.setYAxisType(e);
  }
  get yAxisType() {
    return this.#x;
  }
  get axes() {
    return "x";
  }
  set graph(e) {
    this.#p = e;
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
    return this.#A;
  }
  get overlaysDefault() {
    return hc[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#R;
  }
  set stateMachine(e) {
    this.#l = new Ht(e, this);
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
    this.#w = this.#n.Timeline, this.createGraph(), this.#v.start(), this.draw(this.range), this.cursor = "crosshair", Vi.id = this.id, Vi.context = this, this.stateMachine = Vi, this.stateMachine.start(), this.eventsListen();
    const e = { chartPane: this };
    this.#m = this.core.WidgetsG.insert("Divider", e), this.#m.start(), this.#u = "running";
  }
  destroy() {
    if (this.#u !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.stateMachine.destroy(), this.Divider.destroy(), this.#v.destroy(), this.#p.destroy(), this.#T.destroy(), this.legend.destroy(), this.off("main_mousemove", this.onMouseMove), this.off(be, this.onStreamListening), this.off(Ae, this.onStreamNewValue), this.off(Ct, this.onStreamUpdate), this.off(Le, this.onStreamNewValue), this.off(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.off("chart_yAxisRedraw", this.onYAxisRedraw), this.element.remove(), this.#u = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting chart pane: ${this.id}`), this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#T = new Mt(this.#d, { disableContextMenu: !1 }), this.#T.on("pointerdrag", this.onChartDrag.bind(this)), this.#T.on("pointerdragend", this.onChartDragDone.bind(this)), this.#T.on("pointermove", this.onMouseMove.bind(this)), this.#T.on("pointerenter", this.onMouseEnter.bind(this)), this.#T.on("pointerout", this.onMouseOut.bind(this)), this.#T.on("pointerdown", this.onMouseDown.bind(this)), this.#T.on("pointerup", this.onMouseUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on(be, this.onStreamListening, this), this.on(Ae, this.onStreamNewValue, this), this.on(Ct, this.onStreamUpdate, this), this.on(Le, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
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
  onChartDrag(e) {
    this.cursor = "grab", this.core.MainPane.onChartDrag(e), this.scale.onChartDrag(e);
  }
  onChartDragDone(e) {
    this.cursor = "crosshair", this.core.MainPane.onChartDragDone(e);
  }
  onMouseMove(e) {
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#S = [Math.round(e.position.x), Math.round(e.position.y)], this.#v.onMouseMove(this.#S), this.emit(`${this.id}_mousemove`, this.#S);
  }
  onMouseEnter(e) {
    this.core.MainPane.onPointerActive(this), this.#S = [Math.round(e.position.x), Math.round(e.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_mouseenter`, this.#S);
  }
  onMouseOut(e) {
    this.#E = !1, this.#S = [Math.round(e.position.x), Math.round(e.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_mouseout`, this.#S);
  }
  onMouseDown(e) {
    this.#n.pointerButtons[e.domEvent.srcEvent.button] = !0, this.#P = [Math.floor(e.position.x), Math.floor(e.position.y)], this.stateMachine.state === "tool_activated" ? this.emit("tool_targetSelected", { target: this, position: e }) : this.isPrimary && this.emit("primary_pointerdown", this.#P);
  }
  onMouseUp(e) {
    this.#n.pointerButtons[e.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(e) {
    this.#b !== e && (this.#b = e);
  }
  onStreamNewValue(e) {
    this.draw(this.range, !0);
  }
  onStreamUpdate(e) {
    this.isPrimary ? (this.#L = e, this.chartStreamCandle.draw(), this.layerStream.setPosition(this.core.stream.lastScrollPos, 0), this.updateLegends(this.cursorPos, e)) : this.updateLegends(), this.graph.render();
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
    this.#i = e, mt.title = e;
    const i = this.legend.list.chart.el.querySelectorAll(".title");
    for (let s of i)
      s.innerHTML = e;
    return !0;
  }
  setWatermark(e) {
    S(e.text) || S(e) ? this.core.config.watermark.text = e : "imgURL" in e && (this.core.config.watermark.imgURL = e);
  }
  setHeight(e) {
    E(e) || (e = this.height || this.#h.height), this.#d.style.height = `${e}px`, this.#f.style.height = `${e}px`, this.elViewport.style.height = `${e}px`, this.#v.setDimensions({ w: null, h: e });
  }
  setDimensions(e) {
    const i = this.config.buffer || Ti;
    let { w: s, h: n } = e;
    s = this.width, n = n || this.height, this.setHeight(n), this.graph instanceof ae && (this.layerWidth = Math.round(s * ((100 + i) * 0.01)), this.graph.setSize(s, n, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.draw(void 0, !0), this.Divider.setPos());
  }
  setYAxisType(e) {
    if (!S(e) || !Kt.includes(e) || this.type == "primaryPane" && e == "percent")
      return !1;
    this.#x = e;
  }
  addOverlays(e) {
    if (!C(e) || e.length < 1)
      return !1;
    const i = [];
    for (let s of e) {
      const n = { fixed: !1, required: !1 };
      if (s.type in this.core.indicatorClasses)
        n.cnt = this.core.indicatorClasses[s.type].ind.cnt, n.id = `${this.id}-${s.type}_${n.cnt}`, n.class = this.core.indicatorClasses[s.type].ind;
      else if (s.type in Un[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = Un[this.type][s.type].class;
      else
        continue;
      n.params = { overlay: s }, s.id = n.id, s.paneID = this.id, i.push([s.id, n]);
    }
    return this.graph.addOverlays(i), !0;
  }
  getOverlays() {
    return Object.fromEntries([...this.#p.overlays.list]);
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
    let { layerConfig: i } = this.layerConfig(), s = new mi.Layer(i);
    this.#M.set(e.id, s), this.#C.addLayer(s), e.layerTool = s, this.#A.set(e.id, e);
  }
  addTools(e) {
  }
  overlayTools() {
  }
  overlayToolAdd(e) {
    this.#A.set(e.id, e);
  }
  overlayToolDelete(e) {
    this.#A.delete(e);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.#n.scrollPos, 0), this.overlayGrid.draw("y"), this.#p.render();
  }
  refresh() {
    this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  legendsVisibility(e) {
    this.legend.setCollapse(e);
  }
  updateLegends(e = this.#S, i = !1) {
    if (!(this.#n.isEmpty || !T(this.#y)))
      for (const s in this.#y.list)
        this.#y.update(s, { pos: e, candle: i });
  }
  legendInputs(e = this.cursorPos) {
    e = this.cursorPos;
    let i = {}, s = [], n = [!0, !0, !0, !0, !0], o = this.time.xPos2Index(e[0] - this.core.scrollPos);
    o = _(o, 0, this.range.data.length - 1);
    let a = this.range.data[o];
    return a[4] >= a[1] ? s = new Array(5).fill(this.theme.candle.UpWickColour) : s = new Array(5).fill(this.theme.candle.DnWickColour), i.O = this.scale.nicePrice(a[1]), i.H = this.scale.nicePrice(a[2]), i.L = this.scale.nicePrice(a[3]), i.C = this.scale.nicePrice(a[4]), i.V = this.scale.nicePrice(a[5]), { inputs: i, colours: s, labels: n };
  }
  onLegendAction(e) {
    switch (this.#y.onMouseClick(e.currentTarget).icon) {
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
      el: e,
      prevEl: i,
      parentEl: s,
      scaleEl: n,
      prevScaleEl: o,
      parentScaleEl: a,
      prevPane: l
    } = { ...this.currPrevNext() };
    return !T(i) || !T(o) ? !1 : (s.insertBefore(e, i), a.insertBefore(n, o), this.Divider.setPos(), l !== null && (l.Divider.setPos(), l.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), e.previousElementSibling === null && this.Divider.hide(), !0);
  }
  reorderDown() {
    const {
      el: e,
      nextEl: i,
      parentEl: s,
      scaleEl: n,
      nextScaleEl: o,
      parentScaleEl: a,
      nextPane: l
    } = { ...this.currPrevNext() };
    return !T(i) || !T(o) ? !1 : (s.insertBefore(i, e), a.insertBefore(o, n), this.Divider.setPos(), l !== null && (l.Divider.setPos(), this.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), i.previousElementSibling === null && l.Divider.hide(), !0);
  }
  createGraph() {
    let e = nt(this.overlaysDefault);
    this.graph = new ae(this, this.elViewport, e, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.#p.render(), this.#v.render();
  }
  draw(e = this.range, i = !1) {
    this.#p.draw(e, i);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.core.scrollPos, 0), this.overlayGrid.draw("y"), this.#p.render();
  }
  resize(e) {
    const i = this, s = this.sibling();
    if (s === null)
      return { active: null, prev: null };
    let n, o, a;
    return E(e) && e > this.core.MainPane.rowMinH || (n = this.core.MainPane.cursorPos[5], o = this.height - n - 1, a = s.height + n), o >= this.core.MainPane.rowMinH && a >= this.core.MainPane.rowMinH && (i.setDimensions({ w: void 0, h: o }), s.setDimensions({ w: void 0, h: a }), i.Divider.setPos()), i.element.style.userSelect = "none", s.element.style.userSelect = "none", { active: i, prev: s };
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
    const e = this.element, i = e.previousElementSibling, s = e.nextElementSibling, n = e.parentNode, o = this.scale.element, a = o.previousElementSibling, l = o.nextElementSibling, c = o.parentNode, g = i !== null ? this.core.ChartPanes.get(i.id) : null, p = s !== null ? this.core.ChartPanes.get(s.id) : null;
    return {
      el: e,
      prevEl: i,
      nextEl: s,
      parentEl: n,
      scaleEl: o,
      prevScaleEl: a,
      nextScaleEl: l,
      parentScaleEl: c,
      prevPane: g,
      nextPane: p
    };
  }
  sibling(e) {
    e = ["prev", "next"].includes(e) ? e : "prev";
    let i = [...this.core.ChartPanes.keys()], s = i.indexOf(this.id);
    return e == "prev" ? --s : ++s, this.#n.ChartPanes.get(i[s]) || null;
  }
}
const Zt = 0, zn = 4;
class $t extends Y {
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
  #b;
  #L;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, void 0, o, a), this.#r = Y.cnt, this.#l = a, this.#a = a.overlay, this.#u = n.type, this.#c = n.indicator, this.#d = this.core.TALib, this.#f = this.xAxis.range, this.eventsListen();
  }
  get id() {
    return this.#e || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#r}`;
  }
  set id(e) {
    this.#e = String(e).replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#s;
  }
  set name(e) {
    this.#s = e;
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
    return this.#l.overlay.paneID;
  }
  get primaryPane() {
    return this.#n;
  }
  set primaryPane(e) {
    this.#n = e;
  }
  get scaleOverlay() {
    return this.#o;
  }
  set scaleOverlay(e) {
    this.#o = e;
  }
  get plots() {
    return this.#h;
  }
  set plots(e) {
    this.#h = e;
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
  set setNewValue(e) {
    this.#w = e;
  }
  set setUpdateValue(e) {
    this.#p = e;
  }
  set precision(e) {
    this.#y = e;
  }
  get precision() {
    return this.#y;
  }
  set style(e) {
    this.#m = e;
  }
  get style() {
    return this.#m;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  set value(e) {
    const i = this.core.time.timeFrameMS;
    let s = Math.floor(new Date(e[Zt]) / i) * i;
    e[Zt] = s, this.#v[Zt] !== e[Zt] ? (this.#v[Zt] = e[Zt], this.#w(e)) : this.#p(e);
  }
  get value() {
    return this.#v;
  }
  destroy() {
    if (this.#L === "destroyed")
      return;
    if (!this.core.ChartPanes.get(this.chartPaneID).indicatorDeleteList[this.id]) {
      this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeIndicator()" instead.`);
      return;
    }
    this.off(Ct, this.onStreamUpdate), this.chart.legend.remove(this.#b), this.#L = "destroyed";
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.emit(`${this.chartPaneID}_removeIndicator`, { id: this.id, paneID: this.chartPaneID });
  }
  visible(e) {
    return K(e) && (this.emit(`${this.chartPaneID}_visibleIndicator`, { id: this.id, paneID: this.chartPaneID, visible: e }), this.chartPane.indicators[this.id].layer.visible = e, this.draw()), this.chartPane.indicators[this.id].layer.visible;
  }
  settings(e) {
    return T(e) && (T(e?.config) && (this.params.overlay.settings = { ...this.params.overlay.settings, ...e.config }), T(e?.style) && (this.style = { ...this.style, ...e.style }), this.draw()), {
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
    switch (this.chart.legend.onMouseClick(e.currentTarget).icon) {
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
  invokeSettings(e) {
    if ($(e?.fn)) {
      let i = zn.fn(this);
      if (e?.own)
        return i;
    } else if ($(this.core.config.callbacks?.indicatorSettings?.fn)) {
      let i = this.core.config.callbacks.indicatorSettings.fn(this);
      if (this.core.config.callbacks?.indicatorSettings?.own)
        return i;
    }
    this.core.log(`invokeSettings: ${this.id}`);
  }
  defineIndicator(e, i) {
    T(e) || (e = {}), this.definition.output = i.outputs;
    const s = { ...this.definition.input, ...e };
    delete s.style;
    for (let n of i.options)
      if (n.name in s)
        if (typeof s[n.name] !== n.type) {
          s[n.name] = n.defaultValue;
          continue;
        } else
          "range" in n && (s[n.name] = _(s[n.name], n.range.min, n.range.max));
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
    this.#b = this.chart.legend.add(e);
  }
  legendInputs(e = this.chart.cursorPos) {
    const i = [this.style.stroke];
    let n = this.Timeline.xPos2Index(e[0]) - (this.range.data.length - this.overlay.data.length), o = _(this.overlay.data.length - 1, 0, 1 / 0);
    return n = _(n, 0, o), { c: n, colours: i };
  }
  indicatorInput(e, i) {
    let s = [];
    do
      s.push(this.range.value(e)[zn]);
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
    return n.find((a) => a === null) ? !1 : { inReal: n, timePeriod: i };
  }
  calcIndicator(e, i = {}, s = this.range) {
    if (!S(e) || !(e in this.TALib) || !T(s) || !this.core.TALibReady)
      return !1;
    i.timePeriod = i.timePeriod || this.definition.input.timePeriod;
    let n, o, a = i.timePeriod;
    if (s instanceof Ki)
      n = 0, o = s.dataLength - a + 1;
    else if ("indexStart" in s || "indexEnd" in s || "tsStart" in s || "tsEnd" in s)
      n = s.indexStart || this.Timeline.t2Index(s.tsStart || 0) || 0, o = s.indexEnd || this.Timeline.t2Index(s.tsEnd) || this.range.Length - 1;
    else
      return !1;
    if (o - n < a)
      return !1;
    let l = [], c, g, p;
    for (; n < o; ) {
      i.inReal = this.indicatorInput(n, n + a), p = this.TALib[e](i), g = [], c = 0;
      for (let x of this.definition.output)
        g[c++] = p[x.name][0];
      l.push([this.range.value(n + a - 1)[0], g]), n++;
    }
    return l;
  }
  calcIndicatorHistory() {
    const e = () => {
      let i = this.calcIndicator(this.libName, this.definition.input, this.range);
      i && (this.overlay.data = i);
    };
    this.core.TALibReady ? e() : this.core.talibAwait.push(e.bind(this));
  }
  calcIndicatorStream(e, i, s = this.range) {
    if (!this.core.TALibReady || !S(e) || !(e in this.TALib) || !(s instanceof Ki) || s.dataLength < this.definition.input.timePeriod)
      return !1;
    let n = this.TALib[e](i), o = s.dataLength, a = s.value(o)[0], l = [], c = 0;
    for (let g of this.definition.output)
      l[c++] = n[g.name][0];
    return [a, l];
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
        J[i](n, o, s);
        break;
      case "renderLineHorizontal":
        J[i](n, o[0], o[1], o[2], s);
        break;
      case "renderLineVertical":
        J[i](n, o[0], o[1], o[2], s);
        break;
      case "renderPathStroke":
        J[i](n, o, s.style, s);
        break;
      case "renderPathClosed":
        J[i](n, o, s);
        break;
      case "renderSpline":
        J[i](n, o, s);
        break;
      case "renderRect":
        J[i](n, o[0], o[1], o[2], o[3], s);
        break;
      case "renderRectRound":
        J[i](n, o[0], o[1], o[2], o[3], o[4], s);
        break;
      case "renderPolygonRegular":
        J[i](n, o[0], o[1], o[2], o[3], o[4], s);
        break;
      case "renderPolygonIrregular":
        J[i](n, o, s);
        break;
      case "renderTriangle":
        J[i](n, o[0], o[1], o[2], s);
        break;
      case "renderDiamond":
        J[i](n, o[0], o[1], o[2], o[3], s);
        break;
      case "renderCircle":
        J[i](n, o[0], o[1], o[2], s);
        break;
      case "renderImage":
        J[i](n, s.src, o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7]);
    }
    n.restore();
  }
  draw() {
  }
}
const Gi = {
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
        chart_pan: {
          target: "chart_pan",
          action(r) {
          }
        },
        setRange: {
          target: "setRange",
          action(r) {
          }
        },
        chart_scrollTo: {
          target: "chart_scrollTo",
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
    divider_mousedown: {
      onEnter(r) {
        this.context.divider = r;
      },
      onExit(r) {
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action(r) {
            console.log(`${this.id}: transition from "${this.state}" to "divider_mousemove"`);
          }
        }
      }
    },
    divider_mousemove: {
      onEnter(r) {
        console.log(`${this.id}: state: "${this.state}" - onEnter`);
        let e = this.context.divider;
        this.context.pair = this.context.origin.resizeRowPair(e, r);
      },
      onExit(r) {
      },
      on: {
        main_mousemove: {
          target: "divider_mousemove",
          action(r) {
          }
        },
        main_mouseup: {
          target: "idle",
          action(r) {
            this.actions.removeProperty.call(this);
          }
        },
        divider_mouseup: {
          target: "idle",
          action(r) {
            this.actions.removeProperty.call(this), console.log(`${this.id}: transition from "${this.state}" to "ilde"`);
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
      T(r) && r.element.style.removeProperty("user-select"), T(e) && e.element.style.removeProperty("user-select");
    }
  }
}, lc = [
  ["grid", { class: pi, fixed: !1, required: !0, params: { axes: "x" } }]
], cc = ["candles", "trades", "events"];
class Rr {
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
  #b;
  #L;
  #g = new ft();
  #C;
  #M;
  #A;
  #S = [];
  #E = nn;
  #P = sn;
  #T = {};
  #x = [0, 0];
  #k = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #R;
  #D;
  #U;
  #I;
  constructor(e, i) {
    this.#i = e, this.#r = i, this.#s = e, this.#l = this.#i.elMain, this.#h = this.#i.elYAxis, this.init(i);
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
    return this.#P;
  }
  set rowMinH(e) {
    E(e) && (this.#P = Math.abs(e));
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
  set cursor(e) {
    this.element.style.cursor = e;
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
  set stateMachine(e) {
    this.#n = new Ht(e, this);
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
  init(e) {
    if (this.#i, this.#D = this.#i.indicatorClasses, this.#a = this.#l.rows, this.#c = this.#l.time, this.#v = this.#l.rows.grid, this.#p = this.#l.viewport, this.#d = this.#i.elBody.scale, e.name = "Chart", e.shortName = "Chart", e.parent = this, e.chartData = this.#i.chartData, e.primaryPane = this.#i.primaryPane, e.secondaryPane = this.#i.secondaryPane, e.rangeLimit = this.#i.rangeLimit, e.settings = this.#i.settings, e.elements = {
      ...e.elements,
      ...this.elements
    }, this.#i.theme?.time?.navigation === !1) {
      const i = { height: fi };
      this.#i.theme.time = { ...this.#i.theme?.time, ...i }, this.#a.style.height = `calc(100% - ${fi}px)`;
    }
    this.#M = new Pl(this.#i, e), this.registerChartViews(e), this.#R = E(this.config.buffer) ? this.config.buffer : Ti, this.#P = E(this.config.rowMinH) ? this.config.rowMinH : sn, this.#E = E(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : nn, this.rowsOldH = this.rowsH, this.log(`${this.#t} instantiated`);
  }
  start() {
    let e = 0;
    this.#l.start(this.theme), this.#M.start(), this.#g.forEach((i, s) => {
      i.start(e++), e === 1 && i.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.createGraph(), this.draw(this.range, !0), ii.init({
      graphs: [this.#m],
      range: this.range
    }), ii.start(), ii.queueFrame(this.range, [this.#m], !1), this.eventsListen(), Gi.id = this.id, Gi.context = this, this.stateMachine = Gi, this.stateMachine.start();
  }
  destroy() {
    this.#o = !0, this.stateMachine.destroy(), this.#M.destroy(), this.#g.forEach((e, i) => {
      this.#S[i] = !0, e.destroy(), delete this.#S[i];
    }), this.#m.destroy(), this.#I.destroy(), this.off(Le, this.onFirstStreamValue), this.off(Ae, this.onNewStreamValue), this.off("setRange", this.draw), this.off("scrollUpdate", this.draw), this.off("chart_render", this.draw), this.off("destroyChartView", this.removeChartPane);
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
    this.#a.tabIndex = 0, this.#a.focus(), this.#I = new Mt(this.#a, { disableContextMenu: !1 }), this.#I.on("keydown", this.onChartKeyDown.bind(this)), this.#I.on("keyup", this.onChartKeyUp.bind(this)), this.#I.on("wheel", this.onMouseWheel.bind(this)), this.#I.on("pointerenter", this.onMouseEnter.bind(this)), this.#I.on("pointerout", this.onMouseOut.bind(this)), this.#I.on("pointerup", this.onChartDragDone.bind(this)), this.#I.on("pointermove", this.onMouseMove.bind(this)), this.on(Le, this.onFirstStreamValue, this), this.on(Ae, this.onNewStreamValue, this), this.on("setRange", this.draw, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
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
      e.dragstart.x = this.#x[0], e.dragstart.y = this.#x[1], e.position.x = this.#x[0] + i, e.position.y = this.#x[1], this.onChartDrag(e);
      return;
    }
    const s = this.range, n = s.indexStart - Math.floor(i * js * s.Length), o = s.indexEnd + Math.ceil(i * js * s.Length);
    this.#i.setRange(n, o), this.draw(this.range, !0);
  }
  onMouseMove(e) {
    const i = this.#T;
    i.d2x = i?.d1x || null, i.d2y = i?.d1y || null, i.d1x = e.movement.x, i.d1y = e.movement.y, i.dx = Math.floor((i.d1x + i.d2x) / 2), i.dy = Math.floor((i.d1y + i.d2y) / 2), i.ts2 = i?.ts1 || null, i.ts1 = Date.now(), this.#x = [
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
    this.emit("main_mousemove", this.#x);
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
    const i = this.#k;
    i.active ? (i.delta = [
      e.position.x - i.prev[0],
      e.position.y - i.prev[1]
    ], i.prev = [
      e.position.x,
      e.position.y
    ]) : (i.active = !0, i.start = [e.dragstart.x, e.dragstart.y], i.prev = i.start, i.delta = [0, 0]), this.#x = [
      e.position.x,
      e.position.y,
      ...i.start,
      ...i.delta
    ], this.emit("chart_pan", this.#x);
  }
  onChartDragDone(e) {
    const i = this.#k;
    i.active = !1, i.delta = [0, 0], this.#x = [
      ...i.prev,
      ...i.start,
      ...i.delta
    ], this.emit("chart_panDone", this.#x);
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
    this.#a.previousDimensions();
    let e = this.#a.heightDeltaR, i = Math.round(this.chartH * e), s = this.rowsW, n = this.rowsH, o = Math.round(s * ((100 + this.#R) * 0.01)), a = {
      resizeH: e,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.#i.scrollPos = -1, this.#M.setDimensions({ w: s }), this.#m.setSize(s, n, o), this.#g.size == 1 && i != this.#a.height ? this.#C.setDimensions({ w: s, h: this.#a.height }) : this.#g.forEach((l, c) => {
      i = Math.round(l.viewport.height * e), l.setDimensions({ w: s, h: i });
    }), this.rowsOldH = this.rowsH, this.draw(this.range, !0), this.emit("rowsResize", a);
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
    for (let [n, o] of this.views)
      e.type = n, e.view = o, this.addChartPane(e);
  }
  addChartPane(e) {
    const i = this.calcChartPaneHeights();
    let s;
    for (s in i)
      this.#g.has(s) && this.#g.get(s).setDimensions({ w: this.rowsW, h: i[s] });
    s = i[s];
    let n;
    this.#a.insertAdjacentHTML(
      "beforeend",
      this.#l.rowNode(e.type, this.#i)
    ), n = this.#a.chartPaneSlot.assignedElements().slice(-1)[0], n.style.height = `${s}px`, n.style.width = "100%";
    let o;
    this.#h.insertAdjacentHTML(
      "beforeend",
      this.scaleNode(e.type)
    ), o = this.#h.chartPaneSlot.assignedElements().slice(-1)[0], o.style.height = `${s}px`, o.style.width = "100%", e.elements.elTarget = n, e.elements.elScale = o;
    let a;
    return e.type == "primary" ? (a = new Re(this.#i, e), this.#C = a) : (e.name = e.view[0].name || "Secondary", e.shortName = e.view[0].type || "Secondary", a = new Re(this.#i, e)), this.#g.set(a.id, a), this.emit("addChartView", a), a;
  }
  removeChartPane(e) {
    if (!S(e) || !this.#g.has(e))
      return !1;
    const i = this.#g.get(e);
    if (i.isPrimary)
      return this.#i.error(`Cannot remove primary chart pane! ${e}`), !1;
    this.#S[e] = !0;
    let s = this.rowsW, n = i.viewport.height, o = Math.floor(n / (this.#g.size - 1)), a = n % o;
    return i.status !== "destroyed" && i.destroy(), this.#g.delete(e), delete this.#S[e], this.#g.forEach((l, c) => {
      n = l.viewport.height, l.setDimensions({ w: s, h: n + o + a }), a = 0;
    }), this.draw(this.range, !0), !0;
  }
  validateIndicators() {
    const e = [];
    for (let [i, s] of this.views) {
      if (i === "primary" && e.push(s), s.length === 0 && i !== "primary") {
        this.views.delete(i);
        continue;
      }
      for (const [n, o] of s.entries())
        T(o) && (o.type in this.core.indicatorClasses || cc.includes(o.type)) || (this.#i.log(`indicator ${s.type} not added: not supported.`), s.splice(n, 1));
    }
    return e;
  }
  addIndicator(e, i = e, s = {}) {
    if (!S(e) && !(e in this.#D) && !S(i) && !T(s))
      return !1;
    this.log(`Adding the ${i} : ${e} indicator`), C(s?.data) || (s.data = []), T(s?.settings) || (s.settings = {});
    let n;
    if (this.#D[e].ind.primaryPane) {
      const o = {
        type: e,
        name: i,
        ...s
      };
      n = this.#C.addIndicator(o);
    } else {
      this.core.indicatorClasses[e].ind.primaryPane === "both" && K(e.primaryPane) && e.primaryPane, C(s.view) || (s.view = [{ name: i, type: e, ...s }]);
      for (let a = 0; a < s.view.length; a++)
        (!T(s.view[a]) || !nr(["name", "type"], Object.keys(s.view[a]))) && s.view.splice(a, 1);
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
      return e instanceof $t ? (e.remove(), !0) : !1;
  }
  indicatorSettings(e, i) {
    if (S(e)) {
      for (const s of this.#g.values())
        if (e in s.indicators)
          return s.indicators[e].instance.settings(i);
    } else
      return e instanceof $t ? e.settings(i) : !1;
  }
  calcChartPaneHeights() {
    const e = this.#g.size + 1, i = this.#E * (e - 1), s = i / Math.log10(i * 2) / 100;
    Math.round(this.rowsH * s);
    const n = {};
    if (e === 1)
      n.new = this.rowsH;
    else if (e === 2) {
      const o = this.#g.firstKey(), a = Math.round(this.rowsH * this.#E / 100);
      n[o] = this.rowsH - a, n.new = a;
    } else if (e === 3) {
      const o = this.#g.firstEntry(), a = this.#g.lastEntry(), l = Math.round(this.rowsH * this.#E / 100);
      let c = this.rowsH / (this.rowsH + l);
      n[o[0]] = Math.floor(o[1].viewport.height * c), n[a[0]] = Math.floor(a[1].viewport.height * c), n.new = Math.floor(l * c), n.new += this.rowsH - (n[o[0]] + n[a[0]] + n.new);
    } else {
      let o = 0;
      for (let l of this.#g)
        n[l[0]] = l[1].viewport.height, o += l[1].viewport.height;
      n.new = Math.floor(o / (this.#g.size + 1));
      let a = this.rowsH / (this.rowsH + n.new);
      o = 0;
      for (let l in n)
        n[l] = Math.floor(n[l] * a), o += n[l];
      n.new += this.rowsH - o;
    }
    return n;
  }
  scaleNode(e) {
    const i = ol + ` width: 100%; border-top: 1px solid ${this.theme.secondaryPane.separator};`;
    return `
    <div slot="chartpane" class="viewport scale ${e}" style="$${i}"></div>
  `;
  }
  createGraph() {
    let e = nt(lc);
    this.#m = new ae(this, this.#p, e);
  }
  draw(e = this.range, i = !1) {
    const s = [
      this.#m,
      this.#M,
      this.#C
    ];
    this.time.xAxis.doCalcXAxisGrads(e), this.#g.forEach((n, o) => {
      s.push(n);
    }), ii.queueFrame(
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
}
const Wn = 20, dc = 20, uc = new vr(F.COLOUR_BORDER), rs = document.createElement("template");
rs.innerHTML = `
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
    border: 1px solid var(--txc-time-scrollbar-color, ${F.COLOUR_BORDER});
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
    background-color: var(--txc-time-handle-color, ${uc.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${Wn}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${F.COLOUR_ICON});
    width: ${Wn}px;
    height: ${dc}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${F.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${Vh}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${Fh}</span>
</div>
`;
class fc extends rt {
  #t;
  constructor() {
    super(rs), this.#t = rs;
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
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", fc);
const Dr = document.createElement("template");
Dr.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${fi}px;
  }
  tradex-overview {
    height: ${ur}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class gc extends rt {
  constructor() {
    super(Dr);
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
customElements.get("tradex-time") || window.customElements.define("tradex-time", gc);
const kr = document.createElement("template");
kr.innerHTML = `
<style>
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <div class="viewport"></div>
`;
class mc extends rt {
  constructor() {
    super(kr);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.shadowRoot.querySelector(".viewport");
  }
}
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", mc);
const _r = document.createElement("template");
_r.innerHTML = `
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
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${Nh}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${$h}</span>
  </div>
</div>
`;
class pc extends rt {
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o = [];
  constructor() {
    super(_r);
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
  set title(e) {
    this.setTittle(e);
  }
  onSlotChange(e) {
    this.#o.forEach((i) => i.handler.call(i.context, e));
  }
  insert(e) {
    this.legends.insertAdjacentHTML("beforeend", e);
  }
  setTittle(e) {
    S && (this.#t = e, this.elTitle.innerHTML = e);
  }
  buildLegend(e, i) {
    let s = "", n = `${i.legend.font}; color: ${i.legend.colour}; text-align: left;`, o = "";
    const a = "", l = i.legend.controls ? `
      <div class="controls" style="${a}">
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
    let i = 0, s = "", n, o = "", a = "", l = "";
    for (n in e.inputs) {
      let c = e?.colours?.[i] ? ` color: ${e.colours[i]};` : "", g = e?.inputs?.[n] !== void 0 ? e.inputs[n] : o, p = e?.labels?.[i] ? `${n}:` : o;
      a += e?.labels?.[i] ? "1em;" : ".25em", s += `<dt style="${a}">${p}</dt>
      <dd style="${l}${c}">${g}</dd>`, ++i;
    }
    return s;
  }
  buildControls(e) {
    let i = "", s = e.id;
    return i += `<span id="${s}_up" class="control" data-icon="up">${Hh}</span>`, i += `<span id="${s}_down" class="control" data-icon="down">${Bh}</span>`, i += `<span id="${s}_collapse" class="control" data-icon="visible">${Wh}</span>`, i += `<span id="${s}_maximize" class="control" data-icon="maximize">${zh}</span>`, i += `<span id="${s}_restore" class="control" data-icon="restore">${Uh}</span>`, i += e?.type !== "chart" ? `<span id="${s}_remove" class="control" data-icon="remove">${_h}</span>` : "", i += e?.type !== "secondary" ? `<span id="${s}_config" class="control" data-icon="config">${cr}</span>` : "", i;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", pc);
const Nr = document.createElement("template");
Nr.innerHTML = `
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
class vc extends rt {
  #t;
  #e;
  constructor() {
    super(Nr);
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
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", vc);
const $r = document.createElement("template");
$r.innerHTML = `
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
class yc extends rt {
  #t;
  #e;
  #r;
  #s;
  constructor() {
    super($r);
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
    this.#t = this.#r ? this.#r : this.clientWidth, this.#e = this.#s ? this.#s : this.clientHeight, this.#r = this.clientWidth, this.#s = this.clientHeight;
  }
}
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", yc);
const Hr = document.createElement("template");
Hr.innerHTML = `
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
    width: calc(100% - ${re}px);
    height: calc(100% - ${gi}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${F.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${re}px);
    height: ${gi}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class wc extends rt {
  #t;
  #e;
  constructor() {
    super(Hr);
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
    const s = ` border-top: 1px solid ${i.theme.secondaryPane.separator};`;
    return `
      <tradex-chartpane slot="chartpane" class="${e}" style="${s}">
      </tradex-chartpane>
    `;
  }
  setMain() {
    let e = E(this.#e?.time?.height) ? this.#e.time.height : gi, i = this.#e.tools.location == "none" ? 60 : 0;
    this.rows.style.height = `calc(100% - ${e}px)`, this.rows.style.left = `${i}px`, this.time.style.left = `${i}px`, this.viewport.style.left = `${i}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", wc);
const Br = document.createElement("template");
Br.innerHTML = `
  <slot></slot>
`;
class xc extends rt {
  constructor() {
    super(Br);
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
        height: ${_t.ICONSIZE};
        width: ${_t.ICONSIZE};
        fill: ${_t.COLOUR_ICON};
      }
      svg:hover {
        fill: ${_t.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${_t.ICONSIZE};
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
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", xc);
const Ur = document.createElement("template");
Ur.innerHTML = `
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
class Tc extends rt {
  constructor() {
    super(Ur);
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
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", Tc);
const Ec = `
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
    width: ${re}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`, zr = document.createElement("template");
zr.innerHTML = Ec;
class Sc extends rt {
  #t;
  constructor() {
    super(zr);
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
    let i = E(this.#t?.tools?.width) ? this.#t.tools.width : kt, s;
    switch (e) {
      case "left":
        s = i == 0 ? 0 : re, this.scale.style.left = `${i}px`, this.scale.style.right = void 0, this.main.style.left = void 0, this.main.style.right = `-${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
        break;
      case "both":
      case "right":
      default:
        s = i == 0 ? re : 0, this.scale.style.left = void 0, this.scale.style.right = 0, this.main.style.left = void 0, this.main.style.right = `${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
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
customElements.get("tradex-body") || window.customElements.define("tradex-body", Sc);
const Wr = document.createElement("template");
Wr.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class bc extends rt {
  constructor() {
    super(Wr);
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
        height: ${se.ICONSIZE};
        fill: ${se.COLOUR_ICON};
      }
    </style>
    `;
    for (const n of e)
      s += this.iconNode(n);
    return s + "</div>";
  }
  iconNode(e) {
    const i = `display: inline-block; height: ${se.ICONSIZE}; padding-top: 2px`, s = "sub" in e ? 'data-menu="true"' : "";
    return `
      <div id="TX_${e.id}" data-event="${e.event}" ${s} class="icon-wrapper" style="${i}">${e.icon}</div>

    `;
  }
}
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", bc);
const Fr = document.createElement("template");
Fr.innerHTML = `
  <slot name="widget"></slot>
`;
class Cc extends rt {
  constructor() {
    super(Fr);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", Cc);
const Mc = `
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
class Pc extends rt {
  #t;
  #e;
  #r;
  #s;
  #i = ui;
  #n = Gt;
  #o;
  #h;
  #l;
  #a;
  #c;
  constructor() {
    const e = document.createElement("template");
    e.innerHTML = Mc, super(e, "closed"), this.#s = e;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#s.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = dr, this.elWidgetsG = this.shadowRoot.querySelector("tradex-widgets"), this.elUtils = this.shadowRoot.querySelector("tradex-utils"), this.elBody = this.shadowRoot.querySelector("tradex-body"), this.elMain = this.elBody.main, this.elTime = this.elBody.main.time, this.elTools = this.elBody.tools, this.elYAxis = this.elBody.scale, this.previousDimensions();
      let e = this.getAttribute("height") || "100%", i = this.getAttribute("width") || "100%";
      this.setDimensions(i, e), this.resizeObserver = new ResizeObserver(dt(this.onResized, 50, this)), this.resizeObserver.observe(this);
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
    this.setAttribute("id", String(e).replace(/ |,|;|:|\.|#/g, "_"));
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
  set stream(e) {
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
  elStart(e) {
    this.#c = e, this.setUtilsLocation();
  }
  onResized(e) {
    this.log(`onResize w: ${this.offsetWidth}, h: ${this.offsetHeight}`), T(this.MainPane) && this.MainPane instanceof Rr && (this.previousDimensions(), this.emit("global_resize", { w: this.offsetWidth, h: this.offsetHeight }));
  }
  previousDimensions() {
    this.#o = this.#l ? this.#l : this.offsetWidth, this.#h = this.#a ? this.#a : this.offsetHeight, this.#l = this.offsetWidth, this.#a = this.offsetHeight;
  }
  setWidth(e) {
    E(e) ? (this.#i = e, e += "px") : S(e) || (this.#i = this.parentElement.getBoundingClientRect().width, e = this.#i + "px"), this.style.width = e;
  }
  setHeight(e) {
    E(e) ? (this.#n = e, e += "px") : S(e) || (this.#n = this.parentElement.getBoundingClientRect().height, w = this.#n + "px"), this.style.height = e;
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
      const a = this.getBoundingClientRect(), l = this.parentElement.getBoundingClientRect();
      i = a.height ? a.height : l.height ? l.height : Gt, e = a.width ? a.width : l.width ? l.width : ui;
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
        this.#c.utils.location = "none", this.#c.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${Gt}px`;
        break;
      case "top":
      default:
        this.#c.utils.location = "top", this.#c.utils.height = Nt, this.elUtils.style.display = "block", this.elUtils.style.height = `${Nt}px`, this.elBody.style.height = `calc(100% - ${Nt}px)`, this.elBody.style.minHeight = `${Gt - Nt}px`;
    }
  }
}
const Lc = [
  {
    id: "indicators",
    name: "Indicators",
    icon: Ph,
    event: "utils_indicators",
    sub: []
  },
  {
    id: "timezone",
    name: "Timezone",
    icon: Lh,
    event: "utils_timezone"
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: Mh,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: cr,
    event: "utils_settings"
  }
], Ac = {
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
}, Ic = {
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
}, Oc = {
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
}, Rc = {
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
class Es extends $t {
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
    const l = a.overlay;
    this.id = a.overlay?.id || et(this.shortName), this.defineIndicator(l?.settings, Ac), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return Es.primaryPane;
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
    let a = e.value(e.indexStart)[0], l = this.overlay.data[0][0], c = (a - l) / e.interval, g = this.Timeline.rangeScrollOffset, p = e.Length + g + 2, x = {};
    for (; p; )
      c < 0 || c >= this.overlay.data.length ? (i.lower.push({ x: null, y: null }), i.middle.push({ x: null, y: null }), i.upper.push({ x: null, y: null })) : (o.x = this.xAxis.xPos(s[c][0]), o.y = this.yAxis.yPos(s[c][1][0]), i.lower.push({ ...o }), o.x = this.xAxis.xPos(s[c][0]), o.y = this.yAxis.yPos(s[c][1][1]), i.middle.push({ ...o }), o.x = this.xAxis.xPos(s[c][0]), o.y = this.yAxis.yPos(s[c][1][2]), i.upper.push({ ...o })), c++, p--;
    x = {
      width: this.style.lowerLineWidth,
      stroke: this.style.lowerStroke,
      dash: this.style.lowerLineDash
    }, this.plot(i.lower, "renderLine", x), x = {
      width: this.style.middleLineWidth,
      stroke: this.style.middleStroke,
      dash: this.style.middleLineDash
    }, this.plot(i.middle, "renderLine", x), x = {
      width: this.style.upperLineWidth,
      stroke: this.style.upperStroke,
      dash: this.style.upperLineDash
    }, this.plot(i.upper, "renderLine", x), this.target.viewport.render();
  }
}
class vi extends $t {
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
    super(e, i, s, n, o, a), vi.inCnt++;
    const l = a.overlay;
    this.id = a.overlay?.id || et(this.shortName), this.defineIndicator(l?.settings, Ic), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return vi.primaryPane;
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
    let a = this.Timeline.rangeScrollOffset, l = e.data.length - this.overlay.data.length, c = e.indexStart - l - 2, g = e.Length + a * 2 + 2;
    for (; g; )
      c < 0 || c >= this.overlay.data.length ? n.push({ x: null, y: null }) : (o.x = this.xAxis.xPos(i[c][0]), o.y = this.yAxis.yPos(i[c][1]), n.push({ ...o })), c++, g--;
    this.plot(n, "renderLine", this.style), this.target.viewport.render();
  }
}
class Ss extends $t {
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
  static scale = Kt[1];
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const l = a.overlay;
    this.id = a.overlay?.id || et(this.shortName), this.defineIndicator(l?.settings, Oc), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return Ss.primaryPane;
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
    const l = this.overlay.data, c = this.xAxis.candleW;
    o.length = 0, this.Timeline.smoothScrollOffset;
    const g = {
      w: c
    };
    let p = this.Timeline.rangeScrollOffset, x = e.data.length - this.overlay.data.length, M = e.indexStart - x - 2, L = e.Length + p * 2 + 2;
    for (; L; )
      M < 0 || M >= this.overlay.data.length ? o.push({ x: null, y: null }) : (g.x = this.xAxis.xPos(l[M][0]), g.y = this.yAxis.yPos(l[M][1]), o.push({ ...g })), M++, L--;
    this.plot(o, "renderLine", this.style), this.target.viewport.render();
  }
}
class yi extends $t {
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
    super(e, i, s, n, o, a), yi.inCnt++;
    const l = a.overlay;
    this.id = a.overlay?.id || et(this.shortName), this.defineIndicator(l?.settings, Rc), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return yi.primaryPane;
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
    let a = this.Timeline.rangeScrollOffset, l = e.data.length - this.overlay.data.length, c = e.indexStart - l - 2, g = e.Length + a * 2 + 2;
    for (; g; )
      c < 0 || c >= this.overlay.data.length ? n.push({ x: null, y: null }) : (o.x = this.xAxis.xPos(i[c][0]), o.y = this.yAxis.yPos(i[c][1]), n.push({ ...o })), c++, g--;
    this.plot(n, "renderLine", this.style), this.target.viewport.render();
  }
}
const Vr = {
  BB: { id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: Es },
  EMA: { id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: vi },
  RSI: { id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: Ss },
  SMA: { id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: yi }
};
class Dc {
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
  constructor(e, i) {
    this.#r = e, this.#s = i, this.#i = e.elUtils, this.#n = e.config?.utilsBar || Lc, this.#o = e.WidgetsG, this.#h = e.indicatorClasses || Vr, this.init();
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
    const e = this.#r, i = I.findBySelectorAll(`#${e.id} .${ya} .icon-wrapper`);
    for (let s of i) {
      let n = s.id.replace("TX_", "");
      for (let o of this.#n)
        o.id === n && s.removeEventListener("click", this.#a[n].click), s.removeEventListener("pointerover", this.#a[n].pointerover), s.removeEventListener("pointerout", this.#a[n].pointerout);
    }
    this.off("utils_indicators", this.onIndicators), this.off("utils_timezone", this.onTimezone), this.off("utils_settings", this.onSettings), this.off("utils_screenshot", this.onScreenshot);
  }
  eventsListen() {
    this.on("utils_indicators", this.onIndicators, this), this.on("utils_timezone", this.onTimezone, this), this.on("utils_settings", this.onSettings, this), this.on("utils_screenshot", this.onScreenshot, this);
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
  onIconClick(e) {
    const i = I.findTargetParentWithClass(e.target, "icon-wrapper");
    if (!T(i))
      return !1;
    const s = Date.now();
    if (s - this.#u[i.id] < 1e3)
      return !1;
    this.#u[i.id] = s;
    let n = i.dataset.event, o = i.dataset.menu || !1, a = {
      target: i.id,
      menu: o,
      evt: n
    };
    this.emit(n, a), o ? this.emit("menu_open", a) : this.emit("util_selected", a);
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = se.COLOUR_ICONHOVER;
  }
  onIconOut(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = se.COLOUR_ICON;
  }
  initAllUtils() {
    const e = this.#i.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      this.#u[i.id] = 0;
      let s = i.id.replace("TX_", ""), n = i.querySelector("svg");
      n.style.fill = se.COLOUR_ICON, n.style.height = "90%";
      for (let o of this.#n)
        if (o.id === s && (this.#a[s] = {}, this.#a[s].click = this.onIconClick.bind(this), this.#a[s].pointerover = this.onIconOver.bind(this), this.#a[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#a[s].click), i.addEventListener("pointerover", this.#a[s].pointerover), i.addEventListener("pointerout", this.#a[s].pointerout), s === "indicators" && (o.sub = Object.values(this.#h)), o?.sub)) {
          let a = {
            content: o.sub,
            primary: i
          }, l = this.#o.insert("Menu", a);
          i.dataset.menu = l.id, l.start();
        }
    }
  }
  onIndicators(e) {
  }
  onTimezone(e) {
    this.#r.notImplemented();
  }
  onSettings(e) {
    this.#r.notImplemented();
  }
  onScreenshot(e) {
    this.#r.notImplemented();
  }
}
class bt {
  static #t = 0;
  static #e = {};
  static create(e, i) {
    const s = ++bt.#t;
    i.cnt = s, i.modID = `${i.toolID}_${s}`, i.toolID = i.modID, i.target = e;
    const n = new i.tool(i);
    return bt.#e[s] = n, e.chartToolAdd(n), n;
  }
  static destroy(e) {
    if (e instanceof bt) {
      const i = e.inCnt;
      delete bt.#e[i];
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
  #b = { TL: [0, 0], BR: [0, 0] };
  constructor(e) {
    this.#h = e, this.#s = e.cnt, this.#r = this.#h.ID || et("TX_Tool_"), this.#i = e.name, this.#l = e.core, this.#u = e.elements.elChart, this.#a = { ...e.parent }, this.#w = e.target, this.#w.addTool(this), this.#f = this.#v.viewport, this.#d = this.#f.scene.canvas, this.#m = e.pos;
  }
  set id(e) {
    this.#r = String(e).replace(/ |,|;|:|\.|#/g, "_");
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
  set layerTool(e) {
    this.#v = e;
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
    this.#c = new Mt(this.#d, { disableContextMenu: !1 }), this.#c.on("mousemove", this.onMouseMove.bind(this));
  }
  on(e, i, s) {
    this.#l.on(e, i, s);
  }
  off(e, i) {
    this.#l.off(e, i);
  }
  emit(e, i) {
    this.#l.emit(e, i);
  }
  onMouseMove(e) {
    this.#p = [Math.round(e.position.x), Math.round(e.position.y)], this.emit("tool_mousemove", this.#p);
  }
  isVisible() {
  }
  createViewport() {
    this.config.buffer || BUFFERSIZE, this.#f.getBoundingClientRect().width, this.#o.chartH || this.#a.rowsH - 1;
  }
  draw() {
  }
}
class kc extends bt {
  constructor(e) {
    super(e);
  }
}
class _c extends bt {
  constructor(e) {
    super(e);
  }
}
class Nc extends bt {
  constructor(e) {
    super(e);
  }
}
class $c extends bt {
  constructor(e) {
    super(e);
  }
}
const Hc = [
  {
    id: "cursor",
    name: "Cursor",
    icon: Ah,
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
    icon: Oh,
    event: "tool_activated",
    class: kc,
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
    icon: Dh,
    event: "tool_activated",
    class: Nc,
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
    icon: kh,
    event: "tool_activated",
    class: $c,
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
    icon: Rh,
    event: "tool_activated",
    class: _c
  },
  {
    id: "delete",
    name: "Delete",
    icon: Ih,
    event: "tool_activated",
    class: void 0
  }
], Yi = {
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
          target: "tool_addToTarget",
          action(r) {
            this.context.origin.onToolTargetSelected(r);
          }
        }
      }
    },
    tool_addToTarget: {
      onEnter(r) {
      },
      onExit(r) {
      },
      on: {
        always: {
          target: "idle",
          condition: "toolTarget",
          action(r) {
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
class Bc {
  #t;
  #e = "Toolbar";
  #r = "tools";
  #s;
  #i;
  #n;
  #o;
  #h;
  #l = bt;
  #a;
  #c = {};
  #u = void 0;
  #d;
  #f = { click: [], pointerover: [] };
  constructor(e, i) {
    this.#s = e, this.#i = i, this.#o = e.elTools, this.#a = Hc || e.config.tools, this.#h = e.WidgetsG, this.init();
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
    this.#t = String(e).replace(/ |,|;|:|\.|#/g, "_");
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
  set stateMachine(e) {
    this.#n = new Ht(e, this);
  }
  get stateMachine() {
    return this.#n;
  }
  init() {
    this.mount(this.#o), this.log(`${this.#e} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), Yi.id = this.id, Yi.context = this, this.stateMachine = Yi, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy();
    const e = this.#o.querySelectorAll(".icon-wrapper");
    for (let i of e)
      for (let s of this.#a)
        s.id === id && i.removeEventListener("click", this.#f[id].click), i.removeEventListener("pointerover", this.#f[id].pointerover), i.removeEventListener("pointerout", this.#f[id].pointerout);
    this.off("tool_selected", this.onToolSelect), this.off("tool_deselected", this.onToolDeselect);
  }
  eventsListen() {
    this.on("tool_selected", this.onToolSelect, this), this.on("tool_deselected", this.onToolDeselect, this);
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
    i.style.fill = _t.COLOUR_ICON;
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = _t.COLOUR_ICONHOVER;
  }
  onToolTargetSelected(e) {
    console.log("tool_targetSelected:", e.target), this.#d = e.target;
  }
  onToolActivated(e) {
    console.log("Tool activated:", e), this.#u = e;
  }
  onToolSelect(e) {
  }
  onToolDeselect(e) {
  }
  mount(e) {
    e.innerHTML = this.#o.defaultNode(this.#a);
  }
  initAllTools() {
    const e = this.#o.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      let s = i.id, n = i.querySelector("svg");
      n.style.fill = _t.COLOUR_ICON, n.style.width = "90%";
      for (let o of this.#a)
        if (o.id === s)
          if (this.#f[s] = {}, this.#f[s].click = this.onIconClick.bind(this), this.#f[s].pointerover = this.onIconOver.bind(this), this.#f[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#f[s].click), i.addEventListener("pointerover", this.#f[s].pointerover), i.addEventListener("pointerout", this.#f[s].pointerout), o?.sub) {
            let a = {
              content: o.sub,
              primary: i
            }, l = this.#h.insert("Menu", a);
            i.dataset.menu = l.id, l.start();
            for (let c of o.sub)
              this.#c[c.id] = c.class;
          } else
            this.#c[o.id] = o.class;
    }
  }
  addTool(e = this.#u, i = this.#d) {
    let s = {
      name: e,
      tool: this.#c[e],
      pos: i.cursorClick
    }, n = this.#l.create(i, s);
    return n.start(), console.log(n), n;
  }
  addNewTool(e, i) {
    let s = this.addTool(e, i);
    this.activeTool = s, this.emit("tool_active", s), this.emit(`tool_${s.id}_active`, s);
  }
  addAllTools() {
  }
}
const Uc = 150;
class lt {
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
  static class = rn;
  static name = "Menus";
  static type = "Menu";
  static currentActive;
  constructor(e, i) {
    this.#e = e, this.#r = i.core, this.#s = i, this.#t = i.id, this.#n = e.elements.elMenus, this.#i = this.#r.elWidgetsG, this.init();
  }
  static create(e, i) {
    const s = `menu_${++lt.menuCnt}`;
    return i.id = s, lt.menuList[s] = new lt(e, i), lt.menuList[s];
  }
  static destroy(e) {
    lt.menuList[e].end(), delete lt.menuList[e];
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
    return lt.type;
  }
  init() {
    this.mount(this.#n);
  }
  start() {
    this.position(this.#s.primary), this.eventsListen();
  }
  end() {
    this.#n.querySelectorAll(`#${this.id} li`).forEach((i) => {
      i.removeEventListener("click", this.#a[this.id][i.id]);
    }), document.removeEventListener("click", this.#a[this.id].outside);
  }
  eventsListen() {
    const e = this.#n.querySelectorAll(`#${this.id} li`);
    this.#a[this.id] = {}, e.forEach((i) => {
      this.#a[this.id][i.id] = this.onMenuSelect.bind(this), i.addEventListener("click", this.#a[this.id][i.id]);
    });
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
  onMenuSelect(e) {
    let i = e.currentTarget.dataset.event, s = {
      target: e.currentTarget.id,
      menu: this.#t,
      evt: i
    };
    this.emit("menuItem_selected", s), this.emit("menu_close", s), console.log("menu_close");
  }
  onOutsideClickListener(e) {
    if (!this.#o.contains(e.target) && !this.#s.primary.contains(e.target) && I.isVisible(this.#o)) {
      let i = {
        target: e.currentTarget.id,
        menu: this.#t
      };
      this.emit("menu_close", i);
    }
    document.removeEventListener("click", this.#a[this.id].outside);
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.menuNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#o = this.#n.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${rn}" style=""></div>
    `;
  }
  menuNode() {
    const e = this.#s, i = `position: absolute; z-index: 1000; display: none; border: 1px solid ${Bi.COLOUR_BORDER}; background: ${Bi.COLOUR_BG}; color: ${Bi.COLOUR_TXT};`;
    let s = this.content(e);
    return `
      <div id="${e.id}" class="${wa}" style="${i}">
        ${s}
      </div>
    `;
  }
  content(e) {
    const i = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${Uc}px`, s = "padding: .25em 1em .25em 1em; white-space: nowrap;", n = "display: inline-block; width: 4em;", o = "cursor: pointer;", a = `onmouseover="this.style.background ='#222'"`, l = `onmouseout="this.style.background ='none'"`;
    let c = `<ul style="${i}">`;
    if (e?.content)
      for (let g of e.content)
        c += `<li id="${g.id}" data-event="${g.event}" style="${s} ${o}" ${a} ${l}><a style="${o}"><span style="${n}">${g.id}</span><span>${g.name}</span></li></a>`;
    return c += "</ul>", c;
  }
  position(e) {
    let i = this.#i.getBoundingClientRect(), s = e.getBoundingClientRect();
    this.#o.style.left = Math.round(s.left - i.left) + "px", this.#o.style.top = Math.round(s.bottom - i.top) + "px";
  }
  remove() {
  }
  open() {
    if (lt.currentActive === this)
      return !0;
    lt.currentActive = this, this.#o.style.display = "block";
    let e = I.elementDimPos(this.#o);
    if (e.left + e.width > this.#i.offsetWidth) {
      let s = Math.floor(this.#i.offsetWidth - e.width);
      s = _(s, 0, this.#i.offsetWidth), this.#o.style.left = `${s}px`;
    }
    setTimeout(() => {
      this.#a[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#a[this.id].outside);
    }, 250);
  }
  close() {
    lt.currentActive = null, this.#o.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class tt {
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
  #c;
  #u;
  #d;
  #f = {};
  static windowList = {};
  static windowCnt = 0;
  static class = an;
  static name = "Windows";
  static type = "Window";
  static currentActive = null;
  static create(e, i) {
    const s = `window_${++tt.windowCnt}`;
    return i.id = s, tt.windowList[s] = new tt(e, i), tt.windowList[s];
  }
  static destroy(e) {
    tt.windowList[e].destroy(), delete tt.windowList[e];
  }
  constructor(e, i) {
    this.#e = e, this.#r = i.core, this.#s = i, this.#t = i.id, this.#n = e.elements.elWindows, this.#i = this.#r.elWidgetsG, this.init();
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
  set config(e) {
    this.#s = e;
  }
  get dimensions() {
    return I.elementDimPos(this.#o);
  }
  set dimensions(e) {
    this.setDimensions(e);
  }
  get type() {
    return tt.type;
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
    this.mount(this.#n);
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
    this.#r.on(e, i, s);
  }
  off(e, i) {
    this.#r.off(e, i);
  }
  emit(e, i) {
    this.#r.emit(e, i);
  }
  onOutsideClickListener(e) {
    if (!this.#o.contains(e.target) && I.isVisible(this.#o)) {
      let i = {
        target: e.currentTarget.id,
        window: this.#t
      };
      this.emit("closeWindow", i), document.removeEventListener("click", this.#f.click);
    }
  }
  onCloseWindow(e) {
    e.window === this.#t && this.close();
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.windowNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#o = this.#n.querySelector(`#${this.#s.id}`), this.#h = this.#o.querySelector(".dragBar"), this.#l = this.#o.querySelector(".title"), this.#a = this.#o.querySelector(".closeIcon"), this.#c = this.#o.querySelector(".content");
    let i, s;
    if (T(this.#s.position))
      i = this.#s.x, s = this.#s.y;
    else {
      let n = I.elementDimPos(this.#o);
      i = (this.#r.width - n.width) / 2, s = (this.#r.height - n.height) / 2;
    }
    this.#o.style.bottom = `${s}px`, this.#o.style.left = `${i}px`;
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${an}" style=""></div>
    `;
  }
  windowNode() {
    const e = this.#s;
    let i = `position: absolute; z-index: 10; display: block; border: 1px solid ${Ui.COLOUR_BORDER}; background: ${Ui.COLOUR_BG}; color: ${Ui.COLOUR_TXT};`, s = this.config?.styles?.window;
    for (let g in s)
      i += `${g}: ${s[g]}; `;
    let n = e.dragBar ? this.dragBar(e) : "", o = !e.dragBar && e.title ? this.title(e) : "", a = this.content(e), l = this.closeIcon(e);
    return `
      <div id="${e.id}" class="${xa}" style="${i}">
          ${n}
          ${o}
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
    let o = `${i} `, a = this.config?.styles?.dragBar;
    for (let c in a)
      o += `${c}: ${a[c]}; `;
    let l = "";
    return e.dragBar && (l += `
      <div class="dragBar" style="${o}" ${s} ${n}>
        ${this.title(e)}
      </div>
    `), l;
  }
  title(e) {
    const i = "";
    let s = this.config?.styles?.title;
    for (let o in s)
      i += `${o}: ${s[o]}; `;
    return `
          <div class="title" style="${i}"></div>
      `;
  }
  closeIcon(e) {
    const i = "cursor: pointer;", s = `onmouseover="this.style.background ='#222'"`, n = `onmouseout="this.style.background ='none'"`;
    let o = `${i} `, a = this.config?.styles?.closeIcon;
    for (let c in a)
      titleStyle += `${c}: ${a[c]}; `;
    let l = "";
    return e.closeIcon && (l += `
      <div class="closeIcon" style="${o}" ${s} ${n}>
        <span>X</span>
      </div>
    `), l;
  }
  position(e) {
    let i = this.dimensions, s = this.#r.dimensions, n = Math.round((s.width - i.width) / 2), o = s.height - Math.round((s.height - i.height) / 2), a = I.getStyle(this.#o, "z-index");
    if (T(e)) {
      let { x: l, y: c, z: g } = { ...e };
      E(l) && (n = l), E(c) && (o = s.height - (c + i.height)), E(g) && (a = g);
    }
    e?.relativeY == "bottom" && (o += i.height), this.#o.style.left = `${n}px`, this.#o.style.bottom = `${o}px`, this.#o.style["z-index"] = `${a}`;
  }
  setDimensions(e) {
    E(e.x) && (this.#o.style.width = `${e.x}px`), E(e.y) && (this.#o.style.width = `${e.y}px`);
  }
  setProperties(e) {
    if (!T(e))
      return !1;
    if (S(e?.title) && (this.#l.innerHTML = e.title), S(e?.content) && (this.#c.innerHTML = e.content), this.setDimensions(e?.dimensions), this.position(e?.position), T(e?.styles)) {
      const i = (s, n) => {
        if (!T(n))
          return !1;
        const o = "el" + s.charAt(0).toUpperCase() + s.slice(1);
        if (T(this[o]))
          for (let a in n)
            this[o].style.p = n[a];
      };
      for (let s of Object.keys(e.styles))
        i(s, e.styles[s]);
    }
    return e;
  }
  remove() {
    return tt.destroy(this.id);
  }
  open(e) {
    if (tt.currentActive === this)
      return !0;
    tt.currentActive = this, this.#o.style.display = "block", this.#o.style.zindex = "10", this.setProperties(e), this.emit("window_opened", this.id), setTimeout(() => {
      this.#f.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#f.click);
    }, 250);
  }
  close() {
    tt.currentActive = null, this.#o.style.display = "none", this.emit("window_closed", this.id);
  }
}
class bs extends tt {
  static type = "Dialogue";
  constructor(e, i) {
    super(), i.dragbar = !0, i.close = !0, this.config = i;
  }
  get type() {
    return bs.type;
  }
}
class vt {
  static progressList = {};
  static progressCnt = 0;
  static class = hn;
  static type = "progress";
  static name = "Progress";
  static icons = {
    loadingBars: el,
    loadingSpin: il
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${hn}" style=""></div>
    `;
  }
  static create(e, i) {
    const s = `progress_${++vt.progressCnt}`;
    return i.id = s, vt.progressList[s] = new vt(e, i), vt.progressList[s];
  }
  static destroy(e) {
    vt.progressList[e].destroy(), delete vt.progressList[e];
  }
  #t;
  #e;
  #r;
  #s;
  #i;
  #n;
  #o;
  #h;
  constructor(e, i) {
    this.#e = e, this.#r = i.core, this.#s = i, this.#t = i.id, this.#n = e.elements.elProgress, this.#i = this.#r.elWidgetsG, this.init();
  }
  get type() {
    return vt.type;
  }
  init() {
    this.mount(this.#n);
  }
  start() {
    if (!T(this.#r.config?.progress) || !T(this.#r.config.progress?.loading))
      return !1;
    this.#o.style.display = "block";
    const e = this.#r.elBody.width / 2 - this.#o.clientWidth / 2, i = this.#r.elBody.height / -2 - this.#o.clientHeight / 2;
    this.#o.style.top = `${i}px`, this.#o.style.left = `${e}px`;
  }
  stop() {
    this.#o.style.display = "none";
  }
  progressNode(e) {
    const i = "position: absolute; z-index: 1000; display: none; justify-content: center; align-items: center;", n = `<div class="content" style="">${e.icon}</div>`;
    return `
      <div id="${this.#s.id}" class="progress ${e.type}" style="${i}">${n}</div>
    `;
  }
  mount(e) {
    let i = "loadingBars";
    this.#s?.type in vt.icons && (i = this.#s?.type);
    const s = { type: i, icon: vt.icons[i] };
    e.lastElementChild == null ? e.innerHTML = this.progressNode(s) : e.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(s)), this.#o = this.#n.querySelector(`#${this.#s.id}`), this.#h = this.#o.querySelector("svg"), this.#h.style.fill = `${al.COLOUR_ICONHOVER};`;
  }
}
const qi = {
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
class zc {
  #t;
  #e = "Widgets";
  #r = "widgets";
  #s;
  #i;
  #n;
  #o;
  #h = { Divider: pt, Progress: vt, Menu: lt, Window: tt, Dialogue: bs };
  #l = {};
  #a = {};
  #c;
  #u;
  #d;
  constructor(e, i) {
    this.#s = e, this.#i = i, this.#o = { ...this.#h, ...i.widgets }, this.#c = e.elWidgetsG, this.init();
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
    this.#t = String(e).replace(/ |,|;|:|\.|#/g, "_");
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
  set stateMachine(e) {
    this.#n = new Ht(e, this);
  }
  get stateMachine() {
    return this.#n;
  }
  get types() {
    return this.#o;
  }
  init() {
    this.mount(this.#c);
    for (let e in this.#o) {
      let i = this.#o[e], s = `el${i.name}`;
      this.#a[s] = this.#c.querySelector(`.${i.class}`);
    }
  }
  start() {
    this.eventsListen(), qi.id = this.id, qi.context = this, this.stateMachine = qi, this.stateMachine.start();
  }
  destroy() {
    this.off("menu_open", this.onOpenMenu), this.off("menu_close", this.onCloseMenu), this.off("menu_off", this.onCloseMenu), this.off("menuItem_selected", this.onMenuItemSelected), this.stateMachine.destroy();
    for (let e in this.#l)
      this.delete(e);
    for (let e in this.#o)
      this.#o[e].destroy(id);
  }
  eventsListen() {
    this.on("menu_open", this.onOpenMenu, this), this.on("menu_close", this.onCloseMenu, this), this.on("menu_off", this.onCloseMenu, this), this.on("menuItem_selected", this.onMenuItemSelected, this);
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
  onResize(e) {
    this.setDimensions(e);
  }
  onOpenMenu(e) {
    this.#l[e.menu].open();
  }
  onCloseMenu(e) {
    this.#l[e.menu].close();
  }
  onMenuItemSelected(e) {
    this.emit(e.evt, e.target);
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
    for (let s in this.#o) {
      let n = this.#o[s];
      i.indexOf(n.type) === -1 && (e += n.defaultNode(), i.push(n.type));
    }
    return e;
  }
  insert(e, i) {
    if (!(e in this.#o) || !T(i))
      return !1;
    i.core = this.core;
    const s = this.#o[e].create(this, i);
    return this.#l[s.id] = s, s;
  }
  delete(e) {
    return isString(e) ? (this.#o[type].destroy(e), !0) : !1;
  }
}
class A extends Pc {
  static #t = Lo;
  static #e = 0;
  static #r = {};
  static #s = {};
  static #i = null;
  static #n = !1;
  static #o = [];
  static #h = null;
  static get version() {
    return A.#t;
  }
  static get talibPromise() {
    return A.#i;
  }
  static get talibReady() {
    return A.#n;
  }
  static get talibAwait() {
    return A.#o;
  }
  static get talibError() {
    return A.#h;
  }
  static #l = `${we} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
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
  #c = we;
  #u = Se;
  #d;
  #f;
  #v;
  #w;
  #p;
  #y;
  #m;
  #b;
  #L;
  #g;
  #C;
  #M;
  #A = !1;
  #S = null;
  #E = {};
  #P = O;
  #T;
  #x;
  #k = Vr;
  #R;
  #D;
  #U;
  chartWMin = ui;
  chartHMin = Gt;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = F.COLOUR_BG;
  chartTxtColour = F.COLOUR_TXT;
  chartBorderColour = F.COLOUR_BORDER;
  utilsH = Nt;
  toolsW = kt;
  timeH = gi;
  scaleW = re;
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
  static create(e = {}) {
    A.#e == 0 && (A.#r.CPUCores = navigator.hardwareConcurrency, A.#r.api = {
      permittedClassNames: A.#a
    }), (typeof e.talib != "object" || typeof e.talib.init != "function") && (A.#n = !1, A.#h = new Error(`${A.#l}`)), !A.#n && A.#h === null && (A.#i = e.talib.init(e.wasm)), A.#i.then(
      () => {
        A.#n = !0;
        for (let i of A.#o)
          $(i) && i();
      },
      () => {
        A.#n = !1;
      }
    );
  }
  static destroy(e) {
    if (e instanceof A) {
      e.end();
      const i = e.inCnt;
      delete A.#s[i];
    }
  }
  static cnt() {
    return A.#e++;
  }
  constructor() {
    super(), this.#S = A.cnt(), console.warn(`!WARNING!: ${we} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${Se} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#G = mr;
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
  set elUtils(e) {
    this.#p = e;
  }
  get elUtils() {
    return this.#p;
  }
  set elTools(e) {
    this.#m = e;
  }
  get elTools() {
    return this.#m;
  }
  set elBody(e) {
    this.#y = e;
  }
  get elBody() {
    return this.#y;
  }
  set elMain(e) {
    this.#b = e;
  }
  get elMain() {
    return this.#b;
  }
  set elTime(e) {
    this.#g = e;
  }
  get elTime() {
    return this.#g;
  }
  set elYAxis(e) {
    this.#C = e;
  }
  get elYAxis() {
    return this.#C;
  }
  set elWidgetsG(e) {
    this.#M = e;
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
    return this.#A;
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
    return E(this.#x.initialCnt) ? this.#x.initialCnt : Ta;
  }
  get range() {
    return this.#x;
  }
  get time() {
    return this.#_;
  }
  get TimeUtils() {
    return jo;
  }
  get theme() {
    return this.#D;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#k;
  }
  get TALib() {
    return this.#R;
  }
  get TALibReady() {
    return A.talibReady;
  }
  get TALibError() {
    return A.talibError;
  }
  get talibAwait() {
    return A.talibAwait;
  }
  get TALibPromise() {
    return A.talibPromise;
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
  set scrollPos(e) {
    this.setScrollPos(e);
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
  set stream(e) {
    return this.setStream(e);
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
  set candles(e) {
    T(e) && (this.#Y = e);
  }
  get candles() {
    return this.#Y;
  }
  get progress() {
    return this.#V;
  }
  start(e) {
    this.log(`${we} configuring...`), A.create(e);
    const i = { ...e };
    this.logs = i?.logs ? i.logs : !1, this.infos = i?.infos ? i.infos : !1, this.warnings = i?.warnings ? i.warnings : !1, this.errors = i?.errors ? i.errors : !1, this.timer = i?.timer ? i.timer : !1, this.#f = i, this.#S = i.cnt || this.#S, this.#R = i.talib, this.#w = this, this.#d = this;
    const s = S(i?.id) ? i.id : null;
    this.setID(s), this.classList.add(this.id), this.log("processing state...");
    let n = nt(i?.state) || {};
    n.id = this.id, n.core = this;
    let o = i?.deepValidate || !1, a = i?.isCrypto || !1;
    this.#T = this.#P.create(n, o, a), delete i.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let l = "1s", c = B;
    if (!T(i?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${we} has no chart data or streaming provided.`), { tf: l, ms: c } = si(i?.timeFrame)) : T(i?.stream) && this.state.data.chart.data.length < 2 ? ({ tf: l, ms: c } = si(i?.timeFrame), this.#H = !0) : (l = this.state.data.chart.tf, c = this.state.data.chart.tfms), this.log(`tf: ${l} ms: ${c}`), this.#f.callbacks = this.#f.callbacks || {}, T(i))
      for (const p in i)
        p in this.props() && this.props()[p](i[p]);
    const g = T(i?.range) ? i.range : {};
    if (g.interval = c, g.core = this, this.getRange(null, null, g), this.#x.Length > 1) {
      const p = Ji(this.#_, this.#f?.range?.startTS), x = E(p) ? p + this.#x.initialCnt : this.allData.data.length - 1, M = E(p) ? p : x - this.#x.initialCnt;
      this.#x.initialCnt = x - M, this.setRange(M, x), i.range?.center && this.jumpToIndex(M, !0, !0);
    }
    this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#W = new zc(this, { widgets: i?.widgets }), this.#I = new Dc(this, i), this.#z = new Bc(this, i), this.#O = new Rr(this, i), this.setTheme(this.#U.id), this.log(`${this.#c} V${A.version} configured and running...`), this.#N = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#V = this.WidgetsG.insert("Progress", {}), this.stream = this.#f.stream, this.#H && this.on(Ct, this.delayedSetRange, this), this.#A = !0, this.refresh();
  }
  destroy() {
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.#E = null, this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#G.end(), this.#P = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(Ct, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#V.stop());
  }
  on(e, i, s) {
    return !S(e) || !$(i) ? !1 : (this.#E[e] || (this.#E[e] = []), this.#E[e].push({ handler: i, context: s }), !0);
  }
  off(e, i) {
    if (!S(e) || !$(i) || !(e in this.#E))
      return !1;
    for (let s = 0; s < this.#E[e].length; s++)
      if (this.#E[e][s].handler === i && (this.#E[e].splice(s, 1), this.#E[e].length === 0)) {
        delete this.#E[e];
        break;
      }
    return !0;
  }
  emit(e, i) {
    S(e) && (this.#E[e] || []).forEach((s) => s.handler.call(s.context, i));
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
      logs: (e) => this.logs = K(e) ? e : !1,
      infos: (e) => this.infos = K(e) ? e : !1,
      warnings: (e) => this.warnings = K(e) ? e : !1,
      errors: (e) => this.errors = K(e) ? e : !1,
      indicators: (e) => this.setIndicators(e),
      theme: (e) => {
        this.#U = this.addTheme(e);
      },
      stream: (e) => this.#$ = T(e) ? e : {},
      pricePrecision: (e) => this.setPricePrecision(e),
      volumePrecision: (e) => this.setVolumePrecision(e)
    };
  }
  getInCnt() {
    return this.#S;
  }
  setID(e) {
    S(e) ? this.id = e : this.id = `${et(Se)}_${this.#S}`;
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
    this.toolsW = e, this.#m.style.width = `${e}px`;
  }
  setPricePrecision(e) {
    (!E(e) || e < 0) && (e = Pa), this.#q = e;
  }
  setVolumePrecision(e) {
    (!E(e) || e < 0) && (e = La), this.#X = e;
  }
  addTheme(e) {
    const i = yt.create(e, this);
    return this.#D instanceof yt || (this.#D = i), i;
  }
  setTheme(e) {
    if (!this.theme.list.has(e))
      return !1;
    this.#D.setTheme(e, this);
    const i = this.#D, s = document.querySelector(`style[title=${this.id}_style]`), n = `var(--txc-border-color, ${i.chart.BorderColour}`;
    let o = `.${this.id} { `;
    o += `--txc-background: ${i.chart.Background}; `, this.style.background = `var(--txc-background, ${i.chart.Background})`, this.style.border = `${i.chart.BorderThickness}px solid`, this.style.borderColor = n, o += `--txc-border-color:  ${i.chart.BorderColour}; `, this.#b.rows.style.borderColor = n, o += `--txc-time-scrollbar-color: ${i.chart.BorderColour}; `, o += `--txc-time-handle-color: ${i.xAxis.handle}; `, o += `--txc-time-slider-color: ${i.xAxis.slider}; `, o += `--txc-time-cursor-fore: ${i.xAxis.colourCursor}; `, o += `--txc-time-cursor-back: ${i.xAxis.colourCursorBG}; `, o += `--txc-time-icon-color: ${i.icon.colour}; `, o += `--txc-time-icon-hover-color: ${i.icon.hover}; `, this.#g.overview.scrollBar.style.borderColor = n, this.#g.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${i.xAxis.handle})`, this.#g.overview.style.setProperty("--txc-time-slider-color", i.xAxis.slider), this.#g.overview.style.setProperty("--txc-time-icon-color", i.icon.colour), this.#g.overview.style.setProperty("--txc-time-icon-hover-color", i.icon.hover);
    for (let [a, l] of Object.entries(this.Chart.legend.list))
      l.el.style.color = `var(--txc-legend-color, ${i.legend.colour})`, l.el.style.font = `var(--txc-legend-font, ${i.legend.font})`;
    for (let a of this.#p.icons)
      a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    for (let a of this.#m.icons)
      a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    return o += " }", s.innerHTML = o, !0;
  }
  setScrollPos(e) {
    e = Math.round(e), E(e) && e <= 0 && e >= this.bufferPx * -1 ? this.#N = e : this.emit("Error", "setScrollPos: not a valid value");
  }
  setState(e) {
    if (!O.has(e))
      return this.warn(`${this.name} id: ${this.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    this.stream.stop(), this.MainPane.reset(), this.#T = O.get(e);
    const i = {
      interval: this.#T.data.chart.tfms,
      core: this
    };
    if (this.getRange(null, null, i), this.range.Length > 1) {
      const s = Ji(this.time, void 0), n = s ? s + this.range.initialCnt : this.#T.data.chart.data.length - 1, o = s || n - this.range.initialCnt;
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
    if (this.stream instanceof Jt)
      return this.error("Error: Invoke stopStream() before starting a new one."), !1;
    if (T(e))
      return this.allData.data.length == 0 && S(e.timeFrame) && ({ tf, ms } = si(e?.timeFrame), this.range.interval = ms, this.range.intervalStr = tf, this.#_.timeFrameMS = ms, this.#_.timeFrame = tf), this.#$ = new Jt(this), this.#f.stream = this.#$.config, this.#$;
  }
  stopStream() {
    this.stream instanceof Jt && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#H; ) {
      let e = this.range.Length * 0.5;
      this.setRange(e * -1, e), this.off(Ct, this.delayedSetRange), this.#H = !1;
    }
  }
  updateRange(e) {
    if (!C(e) || !E(e[4]) || e[4] == 0)
      return;
    let i, s;
    i = e[4], s = this.#N + i, s % this.candleW, s < this.bufferPx * -1 ? (s = 0, this.offsetRange(this.rangeScrollOffset * -1)) : s > 0 && (s = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#N = s, this.emit("scrollUpdate", s);
  }
  offsetRange(e) {
    let i = this.range.indexStart - e, s = this.range.indexEnd - e;
    this.setRange(i, s);
  }
  getRange(e = 0, i = 0, s = {}) {
    this.#x = new Ki(e, i, s), this.#_.range = this.#x, this.#_.timeFrameMS = this.#x.interval, this.#_.timeFrame = this.#x.intervalStr;
  }
  setRange(e = 0, i = this.rangeLimit) {
    const s = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#x.set(e, i, s), e < 0 && !this.#B ? this.emit("range_limitPast", { chart: this, start: e, end: i }) : i > this.range.dataLength && !this.#B && this.emit("range_limitFuture", { chart: this, start: e, end: i });
  }
  jumpToIndex(e, i = !0, s = !0) {
    i && (e = _(e, 0, this.range.dataLength));
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
    this.#B = !0;
    let n = this.state.mergeData(e, i, s);
    return K(n) && (this.#B = !1), n;
  }
  isIndicator(e) {
    return !!(typeof e == "function" && "primaryPane" in e.prototype && $(e.prototype?.draw));
  }
  setIndicators(e, i = !1) {
    if (!T(e))
      return !1;
    i && (console.warn("Expunging all default indicators!"), this.#k = {});
    for (const [s, n] of Object.entries(e))
      S(n?.id) && S(n?.name) && S(n?.event) && this.isIndicator(n?.ind) && (this.#k[s] = n);
    return !0;
  }
  addIndicator(e, i = e, s = {}) {
    return this.#O.addIndicator(e, i, s);
  }
  getIndicator(e) {
    return this.#O.getIndicator(e);
  }
  removeIndicator(e) {
    return this.#O.removeIndicator(e);
  }
  indicatorSettings(e, i) {
    return this.#O.indicatorSettings(e, i);
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
    return this.#P.addTrade(e);
  }
  removeTrade(e) {
    return this.#P.removeTrade(e);
  }
  addTrade(e) {
    return this.#P.addTrade(e);
  }
  removeEvent(e) {
    return this.#P.removeEvent(e);
  }
  resize(e, i) {
    return !E(e) && !E(i) ? !1 : (this.setDimensions(e, i), !0);
  }
  refresh() {
    if (!this.ready)
      return;
    let e = this.range.indexStart, i = this.range.indexEnd;
    this.setRange(e, i), this.MainPane.draw(void 0, !0);
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
      this.implemented = this.#W.insert("Dialogue", i), this.implemented.start();
    }
  }
}
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", dl), document.head.insertAdjacentHTML("beforeend", ul), customElements.get("tradex-chart") || customElements.define("tradex-chart", A));
export {
  A as Chart,
  I as DOM,
  $t as Indicator,
  Y as Overlay,
  Ki as Range,
  Ht as StateMachine,
  J as canvas,
  nt as copyDeep,
  Wc as isPromise,
  Pe as mergeDeep,
  et as uid
};
