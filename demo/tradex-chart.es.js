function No(r, e) {
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
const $o = "0.137.4";
function M(r) {
  return Array.isArray(r);
}
function B(r) {
  return r && typeof r == "function";
}
function T(r) {
  return typeof r == "object" && !Array.isArray(r) && r !== null;
}
function E(r) {
  return typeof r == "number" && !isNaN(r);
}
function Q(r) {
  return typeof r == "boolean";
}
function S(r) {
  return typeof r == "string";
}
function Kc(r) {
  return !!r && (T(r) || B(r)) && B(r.then);
}
const Ho = ["y", "M", "d", "h", "m", "s", "ms"], Bo = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], Uo = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], zo = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Zn = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Wo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Kn = 1231006505e3, Bt = 1, z = 1e3, W = z * 60, q = W * 60, _ = q * 24, le = _ * 7, nt = _ * 30;
function Qn(r = 3, e = !1) {
  let i = Zn[r % 12] * _;
  return e && r > 0 && (i += _), i;
}
const ct = _ * 365, Oe = {
  y: ct,
  M: nt,
  w: le,
  d: _,
  h: q,
  m: W,
  s: z,
  u: Bt
}, Jn = {
  years: ct,
  months: nt,
  weeks: le,
  days: _,
  hours: q,
  minutes: W,
  seconds: z,
  milliseconds: Bt
}, Fo = { ...Oe, ...Jn }, Ue = {
  YEARS10: [ct * 10, "years"],
  YEARS5: [ct * 5, "years"],
  YEARS3: [ct * 3, "years"],
  YEARS2: [ct * 2, "years"],
  YEARS: [ct, "years"],
  MONTH6: [nt * 6, "months"],
  MONTH4: [nt * 4, "months"],
  MONTH3: [nt * 3, "months"],
  MONTH2: [nt * 2, "months"],
  MONTH: [nt, "months"],
  DAY15: [_ * 15, "years"],
  DAY10: [_ * 10, "days"],
  DAY7: [_ * 7, "days"],
  DAY5: [_ * 5, "days"],
  DAY3: [_ * 3, "days"],
  DAY2: [_ * 2, "days"],
  DAY: [_, "days"],
  HOUR12: [q * 12, "hours"],
  HOUR6: [q * 6, "hours"],
  HOUR4: [q * 4, "hours"],
  HOUR2: [q * 2, "hours"],
  HOUR: [q, "hours"],
  MINUTE30: [W * 30, "minutes"],
  MINUTE15: [W * 15, "minutes"],
  MINUTE10: [W * 10, "minutes"],
  MINUTE5: [W * 5, "minutes"],
  MINUTE2: [W * 2, "minutes"],
  MINUTE: [W, "minutes"],
  SECOND30: [z * 30, "seconds"],
  SECOND15: [z * 15, "seconds"],
  SECOND10: [z * 10, "seconds"],
  SECOND5: [z * 5, "seconds"],
  SECOND2: [z * 2, "seconds"],
  SECOND: [z, "seconds"],
  MILLISECOND500: [Bt * 500, "milliseconds"],
  MILLISECOND250: [Bt * 250, "milliseconds"],
  MILLISECOND100: [Bt * 100, "milliseconds"],
  MILLISECOND50: [Bt * 50, "milliseconds"],
  MILLISECOND: [Bt, "milliseconds"]
}, Vo = () => {
  const r = Object.values(Ue), e = [];
  for (let i = r.length; --i; i > 0)
    e[i] = r[i][0];
  return e;
}, Ce = Vo(), Go = () => {
  const r = Object.values(Ue), e = [];
  for (let i = r.length; --i; i > 0)
    e[i] = r[i][1];
  return e;
}, ts = Go(), Yo = Object.keys(Ue), qo = () => {
  const r = {};
  for (const [e, i] of Object.entries(Ue))
    r[e] = i[0];
  return r;
}, Xo = qo(), es = {
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
function jo() {
  const r = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(es, r) ? es[r.toString()] : "Etc/UTC";
}
function Zo() {
  const r = {};
  for (let e in Oe) {
    let i = 0;
    r[e] = [];
    do
      r[e].push(Math.round(Oe[e] * i)), i += 0.125;
    while (i < 1);
  }
  return r;
}
function tr(r) {
  const e = new Date(r).getTime();
  return E(e);
}
function er(r, e = Kn, i = Date.now()) {
  return tr(r) ? r > e && r < i : !1;
}
const $t = {
  inSeconds: function(r, e) {
    r = new Date(r), e = new Date(e);
    var i = e.getTime(), s = r.getTime();
    return parseInt((i - s) / z);
  },
  inMinutes: function(r, e) {
    r = new Date(r), e = new Date(e);
    let i = e.getTime(), s = r.getTime();
    return parseInt((i - s) / W);
  },
  inHours: function(r, e) {
    r = new Date(r), e = new Date(e);
    let i = e.getTime(), s = r.getTime();
    return parseInt((i - s) / q);
  },
  inDays: function(r, e) {
    r = new Date(r), e = new Date(e);
    let i = e.getTime(), s = r.getTime();
    return parseInt((i - s) / _);
  },
  inWeeks: function(r, e) {
    r = new Date(r), e = new Date(e);
    let i = e.getTime(), s = r.getTime();
    return parseInt((i - s) / le);
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
function Ko(r, e) {
  let i = $t.inYears(r, e), s = $t.inMonths(r, e), n = $t.inWeeks(r, e), o = $t.inDays(r, e), a = $t.inHours(r, e), l = $t.inMinutes(r, e), c = $t.inSeconds(r, e), g = new Date(e).getTime() - new Date(r).getTime();
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
function ai(r) {
  let e = z;
  return S(r) ? (e = ir(r), e ? r = r : (e = z, r = "1s")) : r = "1s", { tf: r, ms: e };
}
function ir(r) {
  if (!S(r))
    return !1;
  const e = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let i;
  return (i = e.exec(r)) !== null ? Oe[i[2]] * i[1] : !1;
}
function us(r) {
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
function Le(r) {
  const e = us(r);
  for (const i in e)
    if (e[i])
      return `${e[i]}${i}`;
}
function fs(r) {
  return r ? new Date(r).getUTCSeconds() : null;
}
function gs(r) {
  return new Date(r).setUTCMilliseconds(0, 0);
}
function Ci(r) {
  return r ? new Date(r).getUTCMinutes() : null;
}
function ps(r) {
  return new Date(r).setUTCSeconds(0, 0);
}
function vs(r) {
  return r ? new Date(r).getUTCHours() : null;
}
function ys(r) {
  return new Date(r).setUTCMinutes(0, 0, 0);
}
function ws(r) {
  return r ? new Date(r).getUTCDate() : null;
}
function Qo(r, e = "en-GB", i = "short") {
  return new Date(r).toLocaleDateString(e, { weekday: i });
}
function ke(r) {
  return new Date(r).setUTCHours(0, 0, 0, 0);
}
function xs(r) {
  if (r)
    return new Date(r).getUTCMonth();
}
function sr(r, e = "en-GB", i = "short") {
  return new Date(r).toLocaleDateString(e, { month: i });
}
function Ts(r) {
  let e = new Date(r);
  return Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    1
  );
}
function nr(r) {
  let e = (xs(r) + 1) % 12;
  return r += Qn(e, Mi(r)), r;
}
function rr(r) {
  if (r)
    return new Date(r).getUTCFullYear();
}
function Es(r) {
  return Date.UTC(new Date(r).getUTCFullYear());
}
function or(r) {
  return r = r + ct + _, Mi(r), r;
}
function Mi(r) {
  let i = new Date(r).getUTCFullYear();
  return i & 3 ? !1 : i % 100 != 0 || i % 400 == 0;
}
function Jo(r) {
  let e = new Date(r), i = e.getUTCMonth(), s = e.getUTCDate(), n = dayCount[i] + s;
  return i > 1 && Mi() && n++, n;
}
function hi(r, e) {
  return {
    years: (s) => Es(s),
    months: (s) => Ts(s),
    weeks: (s) => ke(s),
    days: (s) => ke(s),
    hours: (s) => ys(s),
    minutes: (s) => ps(s),
    seconds: (s) => gs(s)
  }[e](r);
}
function ta(r, e) {
  let i, s;
  switch (e) {
    case "years":
      i = Es(r), s = or(r);
      break;
    case "months":
      i = Ts(r), s = nr(r);
      break;
    case "weeks":
      i = ke(r), s = i + _;
      break;
    case "days":
      i = ke(r), s = i + _;
      break;
    case "hours":
      i = ys(r), s = i + q;
      break;
    case "minutes":
      i = ps(r), s = i + W;
      break;
    case "seconds":
      i = gs(r), s = i + z;
  }
  return { start: i, end: s };
}
function ea(r) {
  String(ws(r)).padStart(2, "0");
}
function ar(r) {
  let e = String(vs(r)).padStart(2, "0"), i = String(Ci(r)).padStart(2, "0");
  return `${e}:${i}`;
}
function ia(r) {
  let e = String(vs(r)).padStart(2, "0"), i = String(Ci(r)).padStart(2, "0"), s = String(fs(r)).padStart(2, "0");
  return `${e}:${i}:${s}`;
}
function is(r) {
  let e = String(Ci(r)).padStart(2, "0"), i = String(fs(r)).padStart(2, "0");
  return `${e}:${i}`;
}
function sa(r, e) {
  let i = 1 / 0, s = null, n = -1;
  for (let o = 0; o < e.length; o++) {
    let a = e[o][0];
    Math.abs(a - r) < i && (i = Math.abs(a - r), s = e[o], n = o);
  }
  return [n, s];
}
const na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: Kn,
  DAY_MS: _,
  DM: ea,
  HM: ar,
  HMS: ia,
  HOUR_MS: q,
  MILLISECOND: Bt,
  MINUTE_MS: W,
  MONTHMAP: Wo,
  MONTHR_MS: nt,
  MONTH_MS: Qn,
  MS: is,
  SECOND_MS: z,
  TIMESCALES: Ce,
  TIMESCALESKEYS: Yo,
  TIMESCALESRANK: ts,
  TIMESCALESVALUES: Ue,
  TIMESCALESVALUESKEYS: Xo,
  TIMEUNITS: Ho,
  TIMEUNITSLONG: Bo,
  TIMEUNITSVALUES: Fo,
  TIMEUNITSVALUESLONG: Jn,
  TIMEUNITSVALUESSHORT: Oe,
  WEEK_MS: le,
  YEAR_MS: ct,
  buildSubGrads: Zo,
  dayCntInc: Uo,
  dayCntLeapInc: zo,
  dayOfYear: Jo,
  day_start: ke,
  getTimezone: jo,
  get_day: ws,
  get_dayName: Qo,
  get_hour: vs,
  get_minute: Ci,
  get_month: xs,
  get_monthName: sr,
  get_second: fs,
  get_year: rr,
  hour_start: ys,
  interval2MS: ir,
  isLeapYear: Mi,
  isTimeFrame: ai,
  isValidTimeInRange: er,
  isValidTimestamp: tr,
  minute_start: ps,
  monthDayCnt: Zn,
  month_start: Ts,
  ms2Interval: Le,
  ms2TimeUnits: us,
  nearestTs: sa,
  nextMonth: nr,
  nextYear: or,
  second_start: gs,
  time_start: hi,
  timestampDiff: $t,
  timestampDifference: Ko,
  timezones: es,
  unitRange: ta,
  year_start: Es
}, Symbol.toStringTag, { value: "Module" }));
function ra(r, e) {
  return r = Math.ceil(r) + 1, e = Math.floor(e), Math.floor(Math.random() * (e - r) + r);
}
function oa(r) {
  const e = {};
  return e.value = r, e.sign = !!r, e.integers = hr(r), e.decimals = lr(r), e.total = e.integers + e.decimals, e;
}
function hr(r) {
  return (Math.log10((r ^ r >> 31) - (r >> 31)) | 0) + 1;
}
function aa(r) {
  return r | 0;
}
function Wi(r, e) {
  e = e || 100;
  const i = Math.pow(10, e);
  return Math.round((r + Number.EPSILON) * i) / i;
}
function st(r, e = 0) {
  var i = r * Math.pow(10, e), s = Math.round(i), n = (i > 0 ? i : -i) % 1 === 0.5 ? s % 2 === 0 ? s : s - 1 : s;
  return n / Math.pow(10, e);
}
function lr(r) {
  if (typeof r != "number" && (r = parseFloat(r)), isNaN(r) || !isFinite(r))
    return 0;
  for (var e = 1, i = 0; Math.round(r * e) / e !== r && (e *= 10, e !== 1 / 0); )
    i++;
  return i;
}
function ha(r) {
  return Math.log(r) / Math.log(10);
}
function la(r, e) {
  return Math.pow(r, e);
}
function $(r, e, i) {
  return Math.min(i, Math.max(e, r));
}
function De(r, e) {
  return !T(r) || !T(e) ? e : (Object.keys(e).forEach((i) => {
    const s = r[i], n = e[i];
    Array.isArray(s) && Array.isArray(n) ? r[i] = De(s.concat([]), n) : T(s) && T(n) ? r[i] = De(Object.assign({}, s), n) : r[i] = n;
  }), r);
}
function rt(r) {
  if (r === null || typeof r != "object" || "isActiveClone" in r)
    return r;
  if (r instanceof Date)
    var e = new r.constructor();
  else
    var e = Array.isArray(r) ? [] : {};
  for (var i in r)
    Object.prototype.hasOwnProperty.call(r, i) && (r.isActiveClone = null, e[i] = rt(r[i]), delete r.isActiveClone);
  return e;
}
function cr(r, e, i) {
  const [s, ...n] = e.split(".");
  return {
    ...r,
    [s]: n.length ? cr(r[s], n.join("."), i) : i
  };
}
function tn(r, e) {
  return e.split(".").reduce((s, n) => s && s[n] !== "undefined" ? s[n] : void 0, r);
}
function mi(r, e) {
  if (!M(r) || !M(e) || r.length !== e.length)
    return !1;
  let i = r.length;
  for (; i--; ) {
    if (M(r[i]) || M(e[i])) {
      if (!mi(r[i], e[i]))
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
function ca(r, e, i) {
  var s = r[e];
  r.splice(e, 1), r.splice(i, 0, s);
}
function da(r, e, i) {
  [myArray[e], myArray[i]] = [myArray[i], myArray[e]];
}
function dr(r, e) {
  return M(e) ? M(r) ? r.every((i) => e.includes(i)) : e.includes(r) : !1;
}
function ur(r, e) {
  if (!T(r) || !T(e))
    return !1;
  const i = Object.keys(r).sort(), s = Object.keys(e).sort();
  return i.length !== s.length ? !1 : i.every((o, a) => {
    const l = r[o], c = e[s[a]];
    return M(l) || M(c) ? mi(l, c) : T(l) || T(c) ? ur(l, c) : l === c;
  });
}
function it(r = "ID") {
  E(r) ? r = r.toString() : S(r) || (r = "ID"), r = r.replace(/ |,|;|:|\.|#/g, "_");
  const e = Date.now().toString(36), i = Math.random().toString(36).substring(2, 5);
  return `${r}_${e}_${i}`;
}
const ua = (r) => r.entries().next().value, fa = (r) => r.entries().next().value[0], ga = (r) => r.entries().next().value[1], ma = (r) => [...r].pop(), pa = (r) => [...r.keys()].pop(), va = (r) => [...r.values()].pop();
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
    return ua(this);
  }
  firstKey() {
    return fa(this);
  }
  firstValue() {
    return ga(this);
  }
  lastEntry() {
    return ma(this);
  }
  lastKey() {
    return pa(this);
  }
  lastValue() {
    return va(this);
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
    return da(s, e, i), this.populate(s), !0;
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
function ya(r, e = 250, i) {
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
class wa {
  #t;
  #e;
  #r;
  #n = [];
  constructor(e, i) {
    this.#t = e, this.#e = S(i.id) ? i.id : it, this.#r = S(i.type) ? i.type : "default", this.#n = M(i.data) ? i.data : [];
  }
}
function xa(r, e = !1) {
  if (!M(r))
    return !1;
  let i = ra(0, r.length);
  if (!li(r[0], e) || !li(r[i], e) || !li(r[r.length - 1], e))
    return !1;
  let s = r[0][0], n = r[1][0], o = r[2][0];
  return !(s > n && n > o);
}
function Ta(r, e = !1) {
  if (!M(r))
    return !1;
  let i = 0, s = 0;
  for (; i < r.length; ) {
    if (!li(r[i], e) || r[i][0] < s)
      return !1;
    s = r[i][0], i++;
  }
  return !0;
}
function li(r, e = !1) {
  return !(!M(r) || r.length !== 6 || e && !er(r[0]) || !E(r[1]) || !E(r[2]) || !E(r[3]) || !E(r[4]) || !E(r[5]));
}
function Ea(r) {
  for (let e of r)
    for (let i = 0; i < 6; i++)
      e.length = 6, e[i] *= 1;
  return r;
}
const Sa = W, ba = "1m", pi = Sa, Ca = 6, en = 0.05, Ma = 100, sn = 100, ie = ["default", "percent", "log"], nn = 0.3, rn = 30, ei = 200, on = 200, an = 20, hn = 4096, Pi = 5, ln = 50, cn = 30, Pa = 8;
class ss {
  #t = pi;
  #e = "1s";
  indexStart = 0;
  indexEnd = ei;
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
  initialCnt = rn;
  limitFuture = ei;
  limitPast = on;
  minCandles = an;
  maxCandles = hn;
  yAxisBounds = nn;
  rangeLimit = ei;
  anchor;
  #r;
  #n;
  #i = !0;
  constructor(e, i, s = {}) {
    if (!T(s) || !(s?.core instanceof A))
      return !1;
    this.#i = !0, this.setConfig(s), this.#r = s.core, e = E(e) ? e : 0, i = E(i) ? i : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const n = s?.interval || pi;
    if (this.data.length == 0) {
      let o = Date.now();
      e = 0, i = this.rangeLimit, this.#t = n, this.#e = Le(this.interval), this.anchor = o - o % n;
    } else
      this.data.length < 2 ? (this.#t = n, this.#e = Le(this.interval)) : (this.#t = ns(this.data), this.#e = Le(this.interval));
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
    WebWorker.destroy(this.#n.id);
  }
  set(e = 0, i = this.dataLength, s = this.maxCandles, n) {
    if (!E(e) || !E(i) || !E(s))
      return !1;
    e = e | 0, i = i | 0, s = s | 0, s = $(s, this.minCandles, this.maxCandles), e > i && ([e, i] = [i, e]), i = $(i, e + this.minCandles, e + s);
    let o = i - e;
    e = $(e, this.limitPast * -1, this.dataLength + this.limitFuture - this.minCandles - 1), i = $(i, e + this.minCandles, this.dataLength + this.limitFuture - 1), e = i - e < o ? e - (o - (i - e)) : e;
    const a = e, l = i, c = this.indexStart, g = this.indexEnd;
    let p = this.Length;
    this.indexStart = e, this.indexEnd = i, p -= this.Length;
    let v = this.maxMinPriceVol({ data: this.data, start: this.indexStart, end: this.indexEnd, that: this });
    return this.setMaxMin(v), this.setConfig(n), this.#r.emit("setRange", [a, l, c, g]), !0;
  }
  setConfig(e) {
    if (!T(e))
      return !1;
    this.initialCnt = E(e?.initialCnt) ? e.initialCnt : rn, this.limitFuture = E(e?.limitFuture) ? e.limitFuture : ei, this.limitPast = E(e?.limitPast) ? e.limitPast : on, this.minCandles = E(e?.minCandles) ? e.minCandles : an, this.maxCandles = E(e?.maxCandles) ? e.maxCandles : hn, this.yAxisBounds = E(e?.yAxisBounds) ? e.yAxisBounds : nn;
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
    let { data: i, start: s, end: n, that: o } = { ...e }, a = st(this.#r.bufferPx / this.#r.candleW);
    if (a = E(a) ? a : 0, s = E(s) ? s - a : 0, s = s > 0 ? s : 0, n = typeof n == "number" ? n : i?.length - 1, i.length == 0)
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
    let l = i.length - 1, c = Rt(s, 0, l), g = Rt(n, 0, l), p = i[c][3], v = i[c][2], C = i[c][5], P = i[c][5], D = c, H = c, j = c, O = c;
    for (; c++ < g; )
      i[c][3] < p && (p = i[c][3], D = c), i[c][2] > v && (v = i[c][2], H = c), i[c][5] < C && (C = i[c][5], j = c), i[c][5] > P && (P = i[c][5], O = c);
    let R = v - p, Dt = p, xt = v;
    return p -= R * o.yAxisBounds, p = p > 0 ? p : 0, v += R * o.yAxisBounds, R = v - p, {
      valueLo: Dt,
      valueHi: xt,
      valueMin: p,
      valueMax: v,
      valueDiff: v - p,
      volumeMin: C,
      volumeMax: P,
      volumeDiff: P - C,
      valueMinIdx: D,
      valueMaxIdx: H,
      volumeMinIdx: j,
      volumeMaxIdx: O
    };
    function Rt(_t, Lt, Gt) {
      return Math.min(Gt, Math.max(Lt, _t));
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
function ns(r) {
  let e = Math.min(r.length - 1, 99), i = 1 / 0;
  return r.slice(0, e).forEach((s, n) => {
    let o = r[n + 1][0] - s[0];
    o === o && o < i && (i = o);
  }), i;
}
function rs(r, e) {
  if (!E(e))
    return !1;
  let i, s = r.timeFrameMS;
  return e = e - e % s, e === r.range.data[0][0] ? i = 0 : e < r.range.data[0][0] ? i = (r.range.data[0][0] - e) / s * -1 : i = (e - r.range.data[0][0]) / s, i;
}
const be = "TradeX-Chart", Ae = "TX", La = "tradeXutils", dn = "tradeXmenus", Aa = "tradeXmenu", un = "tradeXdividers", fn = "tradeXwindows", Ia = "tradeXwindow", gn = "tradeXprogress", Oa = 500, ka = "stream_None", Ie = "stream_Listening", mn = "stream_Started", Da = "stream_Stopped", Ra = "stream_Error", Re = "stream_candleFirst", Mt = "stream_candleUpdate", _e = "stream_candleNew", _a = 250, Na = 8, $a = 2, Ha = 2, Ba = "defaultState", Ua = {
  id: Ba,
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
    tf: ba,
    tfms: pi
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
}, pn = {
  timestamp: "number",
  id: "string",
  side: "string",
  price: "number",
  amount: "number",
  filled: "number",
  average: "number",
  total: "number",
  tag: "string"
}, vn = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string",
  url: "string"
};
class k {
  static #t = new ft();
  static get default() {
    return rt(Ua);
  }
  static get list() {
    return k.#t;
  }
  static create(e, i = !1, s = !1) {
    const n = new k(e, i, s), o = n.key;
    return k.#t.set(o, n), n;
  }
  static validate(e, i = !1, s = !1) {
    const n = this.default;
    if (T(e) || (e = {}), T(e.chart) || (e.chart = n.chart, e.chart.isEmpty = !0, e.chart.data = M(e.ohlcv) ? e.ohlcv : [], delete e.ohlcv), e = De(n, e), i ? e.chart.data = Ta(e.chart.data, s) ? e.chart.data : [] : e.chart.data = xa(e.chart.data, s) ? e.chart.data : [], e.chart.isEmpty = e.chart.data.length == 0, !E(e.chart?.tf) || i) {
      let c = ns(e.chart.data);
      c < z && (c = pi), e.chart.tfms = c;
    }
    if ((!S(e.chart?.tfms) || i) && (e.chart.tf = Le(e.chart.tfms)), M(e.views) || (e.views = n.views), M(e.primary) || (e.primary = n.primary), M(e.secondary) || (e.secondary = n.secondary), T(e.chart.settings) || (e.chart.settings = n.chart.settings), M(e.datasets) || (e.datasets = []), e.views.length == 0) {
      e.views.push(["primary", e.primary]);
      for (let c in e)
        c.indexOf("secondary") == 0 && e.views.push([c, e[c]]);
    }
    let o = e.views, a = o.length;
    for (; a--; )
      if (!M(o[a]) || o[a].length == 0)
        o.splice(a, 1);
      else {
        let c = e.views[a][1], g = c.length;
        for (; g--; )
          !T(c[g]) || !S(c[g].name) || !S(c[g].type) ? c.splice(g, 1) : T(c[g].settings) || (c[g].settings = {});
        o[a].length == 0 && o.splice(a, 1);
      }
    e.views.length == 0 && (e.views[0] = ["primary", n.primary]), e.views = new ft(e.views), e.views.has("primary") || e.views.insert("primary", n.primary, 0), e.views.get("primary").push(e.chart);
    for (var l of e.datasets)
      this.#i || (this.#i = {}), this.dss[l.id] = new wa(this, l);
    return e;
  }
  static delete(e) {
    if (!S(e) || !k.has(e))
      return !1;
    k.#t.delete(e);
  }
  static has(e) {
    return k.#t.has(e);
  }
  static get(e) {
    return k.#t.get(e);
  }
  static export(e, i = {}) {
    if (!k.has(e))
      return !1;
    T(i) || (i = {});
    const s = k.get(e), n = i?.type, o = rt(s.data), a = o.chart.data;
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
  #n = {};
  #i = {};
  #s;
  #o = !1;
  #h = !0;
  #l = [];
  constructor(e, i = !1, s = !1) {
    T(e) ? (this.#n = k.validate(e, i, s), this.#o = "valid", this.#h = !!this.#n.chart?.isEmpty, this.#s = e?.core instanceof A ? e.core : void 0) : (this.#n = k.default, this.#o = "default", this.#h = !0), this.#e = e?.id || "", this.#r = it(`${Ae}_state`);
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
  error(e) {
    this.#s.error(e);
  }
  create(e, i, s) {
    return k.create(e, i, s);
  }
  delete(e) {
    if (!S(e))
      return !1;
    if (e !== this.key)
      k.delete(e);
    else if (k.has(e)) {
      const i = k.create();
      this.use(i.key), k.delete(e);
    }
    return !0;
  }
  list() {
    return k.list;
  }
  has(e) {
    return k.has(e);
  }
  get(e) {
    return k.get(e);
  }
  use(e) {
    const i = this.core;
    if (!k.has(e))
      return i.warn(`${i.name} id: ${i.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    i.stream.stop(), i.MainPane.reset();
    let s = k.get(e);
    this.#e = s.id, this.#o = s.status, this.#h = s.isEmpty, this.#n = s.data;
    const n = {
      interval: s.data.chart.tfms,
      core: i
    };
    if (i.getRange(null, null, n), this.range.Length > 1) {
      const o = rs(i.time, void 0), a = o ? o + this.range.initialCnt : s.data.length - 1, l = o || a - this.range.initialCnt;
      this.range.initialCnt = a - l, i.setRange(l, a);
    }
    i.MainPane.restart(), i.refresh();
  }
  export(e = this.key, i = {}) {
    return k.export(e, i = {});
  }
  mergeData(e, i = !1, s = !1) {
    if (!T(e))
      return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let n = M(e?.ohlcv) ? e.ohlcv.length - 1 : 0;
    if (n > 1 && this.time.timeFrameMS !== ns(e?.ohlcv))
      return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    (this.#h || !E(this.time.timeFrameMS)) && (!T(i) || !E(i.start) || !E(i.end)) && n > 1 && (i = { start: n - this.range.initialCnt, end: n }), T(i) ? (E(i?.startTS) ? i.start = i.startTS : i.start = E(i.start) ? this.range.value(i.start)[0] : this.range.timeMin, E(i?.endTS) ? i.end = i.endTS : i.end = E(i.end) ? this.range.value(i.end)[0] : this.range.timeMax) : (i = {}, i.start = this.range.timeMin, i.end = this.range.timeMax);
    let o, a, l = e?.ohlcv || !1;
    const c = this.allData.data, g = this.allData?.primaryPane, p = e?.primary || !1;
    this.allData?.secondaryPane;
    const v = e?.secondary || !1;
    this.allData?.dataset?.data;
    const C = e?.dataset?.data || !1;
    this.allData?.trades, e?.trades, this.allData?.events, e?.events;
    const P = M(l) && this.range.inRange(l[0][0]) ? 1 : 0, D = {};
    if (M(l) && l.length > 0) {
      if (o = l.length - 1, c.length - 1, D.mData = this.range.inRange(l[0][0]) && this.range.inRange(l[0][o]), !Q(l[o][7]) && l[o].length !== 8 && l[o][6] !== null && l[o][7] !== !0 ? l = Ea(l) : i.end >= this.range.timeFinish && i.start <= this.range.timeFinish && (i.start += this.range.interval, i.end += this.range.interval), c.length == 0 ? this.allData.data.push(...l) : (i = i || {
        start: this.range.timeMin,
        end: this.range.timeMax
      }, this.data.chart.data = this.merge(c, l)), s)
        this.#s.calcAllIndicators();
      else {
        if (M(p) && p.length > 0) {
          for (let O of p)
            if (M(O?.data) && O?.data.length > 0)
              for (let R of g)
                R.name === O.name && R.type === O.type && ur(R.settings, O.settings) && (R.data = this.merge(R.data, O.data));
        }
        if (M(v) && v.length > 0)
          for (let O of v)
            M(O?.data) && O?.data.length > 0;
      }
      if (M(C) && C.length > 0)
        for (let O of C)
          M(O?.data) && O?.data.length > 0;
      i && (T(i) ? (a = E(i.start) ? this.range.getTimeIndex(i.start) : this.range.indexStart, n = E(i.end) ? this.range.getTimeIndex(i.end) : this.range.indexEnd) : (l[0][0] && (a = this.range.indexStart + P), n = this.range.indexEnd + P), this.#s.setRange(a, n));
      let H, j = !1;
      for (H in D)
        j = j || H;
      return e.ohlcv.length > 1 && this.#s.emit("state_mergeComplete"), j && this.#s.refresh(), this.#h = !1, !0;
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
    const i = Object.keys(e), s = Object.keys(pn);
    if (!T(e) || !mi(i, s))
      return !1;
    for (let a of s)
      if (typeof e[a] !== pn[a])
        return !1;
    const n = e.timestamp - e.timestamp % this.time.timeFrameMS, o = new Date(n);
    return e.dateStr = `${o.getFullYear()}/${o.getMonth() + 1}/${o.getDate()} ${o.getHours()}:${o.getMinutes()}`, M(this.allData.trades[n]) || (this.allData.trades[n] = []), this.allData.trades[n].push(e), !0;
  }
  removeTrade(e) {
    console.log("TODO: state.removeTrade()");
  }
  addEvent(e) {
    const i = Object.keys(e), s = Object.keys(vn);
    if (!T(e) || !mi(i, s))
      return !1;
    for (let a of s)
      if (typeof t[a] !== vn[a])
        return !1;
    const n = t.timestamp - t.timestamp % this.time.timeFrameMS, o = new Date(n);
    return e.dateStr = `${o.getFullYear()}/${o.getMonth() + 1}/${o.getDate()} ${o.getHours()}:${o.getMinutes()}`, M(this.allData.events[n]) || (this.allData.events[n] = []), this.allData.events[n].push(e), !0;
  }
  removeEvent(e) {
    console.log("TODO: state.removeEvent()");
  }
}
class Vt {
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
  constructor(e, i) {
    if (!Vt.validateConfig(e))
      return !1;
    const s = { ...e };
    this.id = s.id, this.#i = s, this.#e = s.initial, this.#n.origin = i, this.#c = s.actions, this.#s = i.core, this.#d();
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
  notify(e, i) {
    this.#l = e, this.#a = i;
    const s = this.#i.states[this.#e];
    let n = s.on[e];
    if (!n || !B(n.action) || this.#o !== "running")
      return !1;
    let o = n?.condition?.type || n?.condition || !1;
    if (o && !this.condition.call(this, o, n.condition))
      return !1;
    const a = n.target, l = this.#i.states[a];
    if (s?.onExit.call(this, i), n.action.call(this, i), this.#r = this.#e, this.#e = a, l?.onEnter.call(this, i), this.#i.states[a]?.on && (this.#i.states[a].on[""] || this.#i.states[a].on?.always)) {
      const c = this.#i.states[a].on[""] || this.#i.states[a].on.always;
      if (M(c))
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
    return e ? this.#i.guards[e].call(this, this.#n, i, s) : !1;
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
        this.#h.add({ topic: i, cb: s }), this.#s.on(i, s, this.context);
      }
  }
  #f() {
    for (let e of this.#h)
      this.#s.off(e.topic, e.cb);
  }
  static validateConfig(e) {
    if (!T(e))
      return !1;
    const i = ["id", "initial", "context", "states"];
    let s = Object.keys(e);
    if (!dr(i, s) || !(e.initial in e.states))
      return !1;
    for (let n in e.states) {
      if (!T(e.states[n]) || "onEnter" in e.states[n] && !B(e.states[n].onEnter) || "onExit" in e.states[n] && !B(e.states[n].onExit))
        return !1;
      if ("on" in e.states[n])
        for (let o in e.states[n].on) {
          let a = e.states[n].on[o];
          if (!S(a.target) || "action" in a && !B(a.action))
            return !1;
        }
    }
    return !0;
  }
}
const za = "alert";
class Wa {
  #t = new ft();
  #e = {};
  constructor(e) {
    if (M(e))
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
    if (M(e)) {
      let i = [];
      for (let s of e)
        i.push(this.add(s?.price, s?.condition, s?.handler));
      return i;
    } else
      return !1;
  }
  add(e, i, s) {
    if (isNaN(e) || !B(s))
      return !1;
    const n = it(za), o = { price: e, condition: i };
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
    if (!(!M(e) || !M(i))) {
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
const Fa = 0, Va = 1, Ga = 2, Ya = 3, qa = 4, Xa = 5, ii = [null, null, null, null, null], si = {
  tfCountDown: !0,
  alerts: []
};
class ne {
  #t;
  #e;
  #r;
  #n;
  #i;
  #s;
  #o;
  #h = ii;
  #l = 0;
  #a = 0;
  #c = "";
  #u = !1;
  #d;
  #f;
  #p = ii;
  #x;
  static validateConfig(e) {
    if (T(e)) {
      let i = rt(si);
      e = De(i, e), e.tfCountDown = Q(e.tfCountDown) ? e.tfCountDown : si.tfCountDown, e.alerts = M(e.alerts) ? e.alerts : si.alerts;
    } else
      return si;
    return e;
  }
  constructor(e) {
    this.#t = e, this.#n = e.time, this.status = { status: ka }, this.#e = ne.validateConfig(e.config?.stream), this.#i = E(e.config?.maxCandleUpdate) ? e.config.maxCandleUpdate : _a, this.#o = E(e.config?.streamPrecision) ? e.config.streamPrecision : Na;
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
    this.#u || (this.#u = !0, this.status = { status: Re, data: e });
  }
  get alerts() {
    return this.#x;
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
    return this.#p;
  }
  set lastTick(e) {
    M(e) && (this.#p, this.#p = e, this.alerts.check(e, this.#h));
  }
  set candle(e) {
    const i = [...this.#h];
    e.t = this.roundTime(new Date(e.t)), e.o = e.o * 1, e.h = e.h * 1, e.l = e.l * 1, e.c = e.c * 1, e.v = e.v * 1, this.#h[Fa] !== e.t ? this.newCandle(e) : this.updateCandle(e), this.status = { status: Ie, data: this.#h }, this.lastTick = i;
  }
  get candle() {
    return this.#h !== ii ? this.#h : null;
  }
  start() {
    this.#x = new Wa(this.#e.alerts), this.status = { status: mn }, this.#s = setInterval(this.onUpdate.bind(this), this.#i);
  }
  stop() {
    this.#x.destroy(), this.status = { status: Da };
  }
  emit(e, i) {
    this.#t.emit(e, i);
  }
  error() {
    this.status = { status: Ra };
  }
  onTick(e) {
    (this.#r == mn || this.#r == Ie) && T(e) && (this.candle = e);
  }
  onUpdate() {
    this.#h !== ii && (this.status = { status: Mt, data: this.candle }, this.status = { status: Ie, data: this.#h });
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
    ], this.#t.state.mergeData({ ohlcv: [this.#h] }, !0, !1), this.status = { status: _e, data: { data: e, candle: this.#h } }, this.#a = this.#n.timeFrameMS, this.#l = this.roundTime(Date.now());
  }
  prevCandle() {
    const e = this.#t.allData.data;
    e.length > 0 && e[e.length - 1][7] && (e[e.length - 1].length = 6);
  }
  updateCandle(e) {
    let i = this.#h;
    i[Va] = e.o, i[Ga] = e.h, i[Ya] = e.l, i[qa] = e.c, i[Xa] = e.v, this.#h = i;
    const s = this.#t.allData.data, n = s.length > 0 ? s.length - 1 : 0;
    s[n] = this.#h, this.countDownUpdate();
  }
  countDownUpdate() {
    let e, i, s, n, o, a, l;
    this.#n.timeFrameMS;
    let c = this.#n.timeFrameMS - (Date.now() - this.#l);
    return c < 0 && (c = 0), this.#a = c, c > ct ? (e = String(Math.floor(c / ct)), i = String(Math.floor(c % ct / nt)).padStart(2, "0"), this.#c = `${e}Y ${i}M`) : c > nt ? (i = String(Math.floor(c / nt)).padStart(2, "0"), n = String(Math.floor(c % nt / _)).padStart(2, "0"), this.#c = `${i}M ${n}D`) : c > le ? (s = String(Math.floor(c / le)).padStart(2, "0"), n = String(Math.floor(c % nt / _)).padStart(2, "0"), this.#c = `${s}W ${n}D`) : c > _ ? (n = String(Math.floor(c / _)).padStart(2, "0"), o = String(Math.floor(c % _ / q)).padStart(2, "0"), a = String(Math.floor(c % q / W)).padStart(2, "0"), this.#c = `${n}D ${o}:${a}`) : c > q ? (o = String(Math.floor(c / q)).padStart(2, "0"), a = String(Math.floor(c % q / W)).padStart(2, "0"), l = String(Math.floor(c % W / z)).padStart(2, "0"), this.#c = `${o}:${a}:${l}`) : c > W ? (a = String(Math.floor(c / W)).padStart(2, "0"), l = String(Math.floor(c % W / z)).padStart(2, "0"), this.#c = `00:${a}:${l}`) : (l = String(Math.floor(c / z)).padStart(2, "0"), String(c % z).padStart(4, "0"), this.#c = `00:00:${l}`), this.#c;
  }
  roundTime(e) {
    return e - e % this.#t.time.timeFrameMS;
  }
}
const fr = {
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
    let l = new XMLSerializer().serializeToString(a), p = "data:image/svg+xml;base64," + btoa(l), v = new Image();
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
      !r.contains(n.target) && fr.isVisible(r) && (e(), s());
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
}, I = fr, ja = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const Za = ((r) => "onorientationchange" in r || r.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in r || r.DocumentTouch && document instanceof r.DocumentTouch)(typeof window < "u" ? window : {}), Ka = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class Zt {
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
    return new Zt(this.x, this.y);
  }
}
function Qa(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var gr = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(r) {
  (function(e, i, s, n) {
    var o = ["", "webkit", "Moz", "MS", "ms", "o"], a = i.createElement("div"), l = "function", c = Math.round, g = Math.abs, p = Date.now;
    function v(h, u, f) {
      return setTimeout(Dt(h, f), u);
    }
    function C(h, u, f) {
      return Array.isArray(h) ? (P(h, f[u], f), !0) : !1;
    }
    function P(h, u, f) {
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
    function D(h, u, f) {
      var m = "DEPRECATED METHOD: " + u + `
` + f + ` AT 
`;
      return function() {
        var x = new Error("get-stack-trace"), b = x && x.stack ? x.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", L = e.console && (e.console.warn || e.console.log);
        return L && L.call(e.console, m, b), h.apply(this, arguments);
      };
    }
    var H;
    typeof Object.assign != "function" ? H = function(u) {
      if (u === n || u === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var f = Object(u), m = 1; m < arguments.length; m++) {
        var x = arguments[m];
        if (x !== n && x !== null)
          for (var b in x)
            x.hasOwnProperty(b) && (f[b] = x[b]);
      }
      return f;
    } : H = Object.assign;
    var j = D(function(u, f, m) {
      for (var x = Object.keys(f), b = 0; b < x.length; )
        (!m || m && u[x[b]] === n) && (u[x[b]] = f[x[b]]), b++;
      return u;
    }, "extend", "Use `assign`."), O = D(function(u, f) {
      return j(u, f, !0);
    }, "merge", "Use `assign`.");
    function R(h, u, f) {
      var m = u.prototype, x;
      x = h.prototype = Object.create(m), x.constructor = h, x._super = m, f && H(x, f);
    }
    function Dt(h, u) {
      return function() {
        return h.apply(u, arguments);
      };
    }
    function xt(h, u) {
      return typeof h == l ? h.apply(u && u[0] || n, u) : h;
    }
    function Rt(h, u) {
      return h === n ? u : h;
    }
    function _t(h, u, f) {
      P(Qt(u), function(m) {
        h.addEventListener(m, f, !1);
      });
    }
    function Lt(h, u, f) {
      P(Qt(u), function(m) {
        h.removeEventListener(m, f, !1);
      });
    }
    function Gt(h, u) {
      for (; h; ) {
        if (h == u)
          return !0;
        h = h.parentNode;
      }
      return !1;
    }
    function At(h, u) {
      return h.indexOf(u) > -1;
    }
    function Qt(h) {
      return h.trim().split(/\s+/g);
    }
    function Jt(h, u, f) {
      if (h.indexOf && !f)
        return h.indexOf(u);
      for (var m = 0; m < h.length; ) {
        if (f && h[m][f] == u || !f && h[m] === u)
          return m;
        m++;
      }
      return -1;
    }
    function Fe(h) {
      return Array.prototype.slice.call(h, 0);
    }
    function ks(h, u, f) {
      for (var m = [], x = [], b = 0; b < h.length; ) {
        var L = u ? h[b][u] : h[b];
        Jt(x, L) < 0 && m.push(h[b]), x[b] = L, b++;
      }
      return f && (u ? m = m.sort(function(Y, K) {
        return Y[u] > K[u];
      }) : m = m.sort()), m;
    }
    function Ve(h, u) {
      for (var f, m, x = u[0].toUpperCase() + u.slice(1), b = 0; b < o.length; ) {
        if (f = o[b], m = f ? f + x : u, m in h)
          return m;
        b++;
      }
      return n;
    }
    var to = 1;
    function eo() {
      return to++;
    }
    function Ds(h) {
      var u = h.ownerDocument || h;
      return u.defaultView || u.parentWindow || e;
    }
    var io = /mobile|tablet|ip(ad|hone|od)|android/i, Rs = "ontouchstart" in e, so = Ve(e, "PointerEvent") !== n, no = Rs && io.test(navigator.userAgent), pe = "touch", ro = "pen", Oi = "mouse", oo = "kinect", ao = 25, Z = 1, Yt = 2, U = 4, J = 8, Ge = 1, ve = 2, ye = 4, we = 8, xe = 16, Tt = ve | ye, qt = we | xe, _s = Tt | qt, Ns = ["x", "y"], Ye = ["clientX", "clientY"];
    function at(h, u) {
      var f = this;
      this.manager = h, this.callback = u, this.element = h.element, this.target = h.options.inputTarget, this.domHandler = function(m) {
        xt(h.options.enable, [h]) && f.handler(m);
      }, this.init();
    }
    at.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && _t(this.element, this.evEl, this.domHandler), this.evTarget && _t(this.target, this.evTarget, this.domHandler), this.evWin && _t(Ds(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && Lt(this.element, this.evEl, this.domHandler), this.evTarget && Lt(this.target, this.evTarget, this.domHandler), this.evWin && Lt(Ds(this.element), this.evWin, this.domHandler);
      }
    };
    function ho(h) {
      var u, f = h.options.inputClass;
      return f ? u = f : so ? u = Di : no ? u = je : Rs ? u = Ri : u = Xe, new u(h, lo);
    }
    function lo(h, u, f) {
      var m = f.pointers.length, x = f.changedPointers.length, b = u & Z && m - x === 0, L = u & (U | J) && m - x === 0;
      f.isFirst = !!b, f.isFinal = !!L, b && (h.session = {}), f.eventType = u, co(h, f), h.emit("hammer.input", f), h.recognize(f), h.session.prevInput = f;
    }
    function co(h, u) {
      var f = h.session, m = u.pointers, x = m.length;
      f.firstInput || (f.firstInput = $s(u)), x > 1 && !f.firstMultiple ? f.firstMultiple = $s(u) : x === 1 && (f.firstMultiple = !1);
      var b = f.firstInput, L = f.firstMultiple, G = L ? L.center : b.center, Y = u.center = Hs(m);
      u.timeStamp = p(), u.deltaTime = u.timeStamp - b.timeStamp, u.angle = ki(G, Y), u.distance = qe(G, Y), uo(f, u), u.offsetDirection = Us(u.deltaX, u.deltaY);
      var K = Bs(u.deltaTime, u.deltaX, u.deltaY);
      u.overallVelocityX = K.x, u.overallVelocityY = K.y, u.overallVelocity = g(K.x) > g(K.y) ? K.x : K.y, u.scale = L ? mo(L.pointers, m) : 1, u.rotation = L ? go(L.pointers, m) : 0, u.maxPointers = f.prevInput ? u.pointers.length > f.prevInput.maxPointers ? u.pointers.length : f.prevInput.maxPointers : u.pointers.length, fo(f, u);
      var St = h.element;
      Gt(u.srcEvent.target, St) && (St = u.srcEvent.target), u.target = St;
    }
    function uo(h, u) {
      var f = u.center, m = h.offsetDelta || {}, x = h.prevDelta || {}, b = h.prevInput || {};
      (u.eventType === Z || b.eventType === U) && (x = h.prevDelta = {
        x: b.deltaX || 0,
        y: b.deltaY || 0
      }, m = h.offsetDelta = {
        x: f.x,
        y: f.y
      }), u.deltaX = x.x + (f.x - m.x), u.deltaY = x.y + (f.y - m.y);
    }
    function fo(h, u) {
      var f = h.lastInterval || u, m = u.timeStamp - f.timeStamp, x, b, L, G;
      if (u.eventType != J && (m > ao || f.velocity === n)) {
        var Y = u.deltaX - f.deltaX, K = u.deltaY - f.deltaY, St = Bs(m, Y, K);
        b = St.x, L = St.y, x = g(St.x) > g(St.y) ? St.x : St.y, G = Us(Y, K), h.lastInterval = u;
      } else
        x = f.velocity, b = f.velocityX, L = f.velocityY, G = f.direction;
      u.velocity = x, u.velocityX = b, u.velocityY = L, u.direction = G;
    }
    function $s(h) {
      for (var u = [], f = 0; f < h.pointers.length; )
        u[f] = {
          clientX: c(h.pointers[f].clientX),
          clientY: c(h.pointers[f].clientY)
        }, f++;
      return {
        timeStamp: p(),
        pointers: u,
        center: Hs(u),
        deltaX: h.deltaX,
        deltaY: h.deltaY
      };
    }
    function Hs(h) {
      var u = h.length;
      if (u === 1)
        return {
          x: c(h[0].clientX),
          y: c(h[0].clientY)
        };
      for (var f = 0, m = 0, x = 0; x < u; )
        f += h[x].clientX, m += h[x].clientY, x++;
      return {
        x: c(f / u),
        y: c(m / u)
      };
    }
    function Bs(h, u, f) {
      return {
        x: u / h || 0,
        y: f / h || 0
      };
    }
    function Us(h, u) {
      return h === u ? Ge : g(h) >= g(u) ? h < 0 ? ve : ye : u < 0 ? we : xe;
    }
    function qe(h, u, f) {
      f || (f = Ns);
      var m = u[f[0]] - h[f[0]], x = u[f[1]] - h[f[1]];
      return Math.sqrt(m * m + x * x);
    }
    function ki(h, u, f) {
      f || (f = Ns);
      var m = u[f[0]] - h[f[0]], x = u[f[1]] - h[f[1]];
      return Math.atan2(x, m) * 180 / Math.PI;
    }
    function go(h, u) {
      return ki(u[1], u[0], Ye) + ki(h[1], h[0], Ye);
    }
    function mo(h, u) {
      return qe(u[0], u[1], Ye) / qe(h[0], h[1], Ye);
    }
    var po = {
      mousedown: Z,
      mousemove: Yt,
      mouseup: U
    }, vo = "mousedown", yo = "mousemove mouseup";
    function Xe() {
      this.evEl = vo, this.evWin = yo, this.pressed = !1, at.apply(this, arguments);
    }
    R(Xe, at, {
      handler: function(u) {
        var f = po[u.type];
        f & Z && u.button === 0 && (this.pressed = !0), f & Yt && u.which !== 1 && (f = U), this.pressed && (f & U && (this.pressed = !1), this.callback(this.manager, f, {
          pointers: [u],
          changedPointers: [u],
          pointerType: Oi,
          srcEvent: u
        }));
      }
    });
    var wo = {
      pointerdown: Z,
      pointermove: Yt,
      pointerup: U,
      pointercancel: J,
      pointerout: J
    }, xo = {
      2: pe,
      3: ro,
      4: Oi,
      5: oo
    }, zs = "pointerdown", Ws = "pointermove pointerup pointercancel";
    e.MSPointerEvent && !e.PointerEvent && (zs = "MSPointerDown", Ws = "MSPointerMove MSPointerUp MSPointerCancel");
    function Di() {
      this.evEl = zs, this.evWin = Ws, at.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    R(Di, at, {
      handler: function(u) {
        var f = this.store, m = !1, x = u.type.toLowerCase().replace("ms", ""), b = wo[x], L = xo[u.pointerType] || u.pointerType, G = L == pe, Y = Jt(f, u.pointerId, "pointerId");
        b & Z && (u.button === 0 || G) ? Y < 0 && (f.push(u), Y = f.length - 1) : b & (U | J) && (m = !0), !(Y < 0) && (f[Y] = u, this.callback(this.manager, b, {
          pointers: f,
          changedPointers: [u],
          pointerType: L,
          srcEvent: u
        }), m && f.splice(Y, 1));
      }
    });
    var To = {
      touchstart: Z,
      touchmove: Yt,
      touchend: U,
      touchcancel: J
    }, Eo = "touchstart", So = "touchstart touchmove touchend touchcancel";
    function Fs() {
      this.evTarget = Eo, this.evWin = So, this.started = !1, at.apply(this, arguments);
    }
    R(Fs, at, {
      handler: function(u) {
        var f = To[u.type];
        if (f === Z && (this.started = !0), !!this.started) {
          var m = bo.call(this, u, f);
          f & (U | J) && m[0].length - m[1].length === 0 && (this.started = !1), this.callback(this.manager, f, {
            pointers: m[0],
            changedPointers: m[1],
            pointerType: pe,
            srcEvent: u
          });
        }
      }
    });
    function bo(h, u) {
      var f = Fe(h.touches), m = Fe(h.changedTouches);
      return u & (U | J) && (f = ks(f.concat(m), "identifier", !0)), [f, m];
    }
    var Co = {
      touchstart: Z,
      touchmove: Yt,
      touchend: U,
      touchcancel: J
    }, Mo = "touchstart touchmove touchend touchcancel";
    function je() {
      this.evTarget = Mo, this.targetIds = {}, at.apply(this, arguments);
    }
    R(je, at, {
      handler: function(u) {
        var f = Co[u.type], m = Po.call(this, u, f);
        m && this.callback(this.manager, f, {
          pointers: m[0],
          changedPointers: m[1],
          pointerType: pe,
          srcEvent: u
        });
      }
    });
    function Po(h, u) {
      var f = Fe(h.touches), m = this.targetIds;
      if (u & (Z | Yt) && f.length === 1)
        return m[f[0].identifier] = !0, [f, f];
      var x, b, L = Fe(h.changedTouches), G = [], Y = this.target;
      if (b = f.filter(function(K) {
        return Gt(K.target, Y);
      }), u === Z)
        for (x = 0; x < b.length; )
          m[b[x].identifier] = !0, x++;
      for (x = 0; x < L.length; )
        m[L[x].identifier] && G.push(L[x]), u & (U | J) && delete m[L[x].identifier], x++;
      if (G.length)
        return [
          ks(b.concat(G), "identifier", !0),
          G
        ];
    }
    var Lo = 2500, Vs = 25;
    function Ri() {
      at.apply(this, arguments);
      var h = Dt(this.handler, this);
      this.touch = new je(this.manager, h), this.mouse = new Xe(this.manager, h), this.primaryTouch = null, this.lastTouches = [];
    }
    R(Ri, at, {
      handler: function(u, f, m) {
        var x = m.pointerType == pe, b = m.pointerType == Oi;
        if (!(b && m.sourceCapabilities && m.sourceCapabilities.firesTouchEvents)) {
          if (x)
            Ao.call(this, f, m);
          else if (b && Io.call(this, m))
            return;
          this.callback(u, f, m);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function Ao(h, u) {
      h & Z ? (this.primaryTouch = u.changedPointers[0].identifier, Gs.call(this, u)) : h & (U | J) && Gs.call(this, u);
    }
    function Gs(h) {
      var u = h.changedPointers[0];
      if (u.identifier === this.primaryTouch) {
        var f = { x: u.clientX, y: u.clientY };
        this.lastTouches.push(f);
        var m = this.lastTouches, x = function() {
          var b = m.indexOf(f);
          b > -1 && m.splice(b, 1);
        };
        setTimeout(x, Lo);
      }
    }
    function Io(h) {
      for (var u = h.srcEvent.clientX, f = h.srcEvent.clientY, m = 0; m < this.lastTouches.length; m++) {
        var x = this.lastTouches[m], b = Math.abs(u - x.x), L = Math.abs(f - x.y);
        if (b <= Vs && L <= Vs)
          return !0;
      }
      return !1;
    }
    var Ys = Ve(a.style, "touchAction"), qs = Ys !== n, Xs = "compute", js = "auto", _i = "manipulation", Xt = "none", Te = "pan-x", Ee = "pan-y", Ze = ko();
    function Ni(h, u) {
      this.manager = h, this.set(u);
    }
    Ni.prototype = {
      set: function(h) {
        h == Xs && (h = this.compute()), qs && this.manager.element.style && Ze[h] && (this.manager.element.style[Ys] = h), this.actions = h.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var h = [];
        return P(this.manager.recognizers, function(u) {
          xt(u.options.enable, [u]) && (h = h.concat(u.getTouchAction()));
        }), Oo(h.join(" "));
      },
      preventDefaults: function(h) {
        var u = h.srcEvent, f = h.offsetDirection;
        if (this.manager.session.prevented) {
          u.preventDefault();
          return;
        }
        var m = this.actions, x = At(m, Xt) && !Ze[Xt], b = At(m, Ee) && !Ze[Ee], L = At(m, Te) && !Ze[Te];
        if (x) {
          var G = h.pointers.length === 1, Y = h.distance < 2, K = h.deltaTime < 250;
          if (G && Y && K)
            return;
        }
        if (!(L && b) && (x || b && f & Tt || L && f & qt))
          return this.preventSrc(u);
      },
      preventSrc: function(h) {
        this.manager.session.prevented = !0, h.preventDefault();
      }
    };
    function Oo(h) {
      if (At(h, Xt))
        return Xt;
      var u = At(h, Te), f = At(h, Ee);
      return u && f ? Xt : u || f ? u ? Te : Ee : At(h, _i) ? _i : js;
    }
    function ko() {
      if (!qs)
        return !1;
      var h = {}, u = e.CSS && e.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(f) {
        h[f] = u ? e.CSS.supports("touch-action", f) : !0;
      }), h;
    }
    var Ke = 1, ht = 2, te = 4, Nt = 8, It = Nt, Se = 16, Et = 32;
    function Ot(h) {
      this.options = H({}, this.defaults, h || {}), this.id = eo(), this.manager = null, this.options.enable = Rt(this.options.enable, !0), this.state = Ke, this.simultaneous = {}, this.requireFail = [];
    }
    Ot.prototype = {
      defaults: {},
      set: function(h) {
        return H(this.options, h), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(h) {
        if (C(h, "recognizeWith", this))
          return this;
        var u = this.simultaneous;
        return h = Qe(h, this), u[h.id] || (u[h.id] = h, h.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(h) {
        return C(h, "dropRecognizeWith", this) ? this : (h = Qe(h, this), delete this.simultaneous[h.id], this);
      },
      requireFailure: function(h) {
        if (C(h, "requireFailure", this))
          return this;
        var u = this.requireFail;
        return h = Qe(h, this), Jt(u, h) === -1 && (u.push(h), h.requireFailure(this)), this;
      },
      dropRequireFailure: function(h) {
        if (C(h, "dropRequireFailure", this))
          return this;
        h = Qe(h, this);
        var u = Jt(this.requireFail, h);
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
        function m(x) {
          u.manager.emit(x, h);
        }
        f < Nt && m(u.options.event + Zs(f)), m(u.options.event), h.additionalEvent && m(h.additionalEvent), f >= Nt && m(u.options.event + Zs(f));
      },
      tryEmit: function(h) {
        if (this.canEmit())
          return this.emit(h);
        this.state = Et;
      },
      canEmit: function() {
        for (var h = 0; h < this.requireFail.length; ) {
          if (!(this.requireFail[h].state & (Et | Ke)))
            return !1;
          h++;
        }
        return !0;
      },
      recognize: function(h) {
        var u = H({}, h);
        if (!xt(this.options.enable, [this, u])) {
          this.reset(), this.state = Et;
          return;
        }
        this.state & (It | Se | Et) && (this.state = Ke), this.state = this.process(u), this.state & (ht | te | Nt | Se) && this.tryEmit(u);
      },
      process: function(h) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function Zs(h) {
      return h & Se ? "cancel" : h & Nt ? "end" : h & te ? "move" : h & ht ? "start" : "";
    }
    function Ks(h) {
      return h == xe ? "down" : h == we ? "up" : h == ve ? "left" : h == ye ? "right" : "";
    }
    function Qe(h, u) {
      var f = u.manager;
      return f ? f.get(h) : h;
    }
    function gt() {
      Ot.apply(this, arguments);
    }
    R(gt, Ot, {
      defaults: {
        pointers: 1
      },
      attrTest: function(h) {
        var u = this.options.pointers;
        return u === 0 || h.pointers.length === u;
      },
      process: function(h) {
        var u = this.state, f = h.eventType, m = u & (ht | te), x = this.attrTest(h);
        return m && (f & J || !x) ? u | Se : m || x ? f & U ? u | Nt : u & ht ? u | te : ht : Et;
      }
    });
    function Je() {
      gt.apply(this, arguments), this.pX = null, this.pY = null;
    }
    R(Je, gt, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: _s
      },
      getTouchAction: function() {
        var h = this.options.direction, u = [];
        return h & Tt && u.push(Ee), h & qt && u.push(Te), u;
      },
      directionTest: function(h) {
        var u = this.options, f = !0, m = h.distance, x = h.direction, b = h.deltaX, L = h.deltaY;
        return x & u.direction || (u.direction & Tt ? (x = b === 0 ? Ge : b < 0 ? ve : ye, f = b != this.pX, m = Math.abs(h.deltaX)) : (x = L === 0 ? Ge : L < 0 ? we : xe, f = L != this.pY, m = Math.abs(h.deltaY))), h.direction = x, f && m > u.threshold && x & u.direction;
      },
      attrTest: function(h) {
        return gt.prototype.attrTest.call(this, h) && (this.state & ht || !(this.state & ht) && this.directionTest(h));
      },
      emit: function(h) {
        this.pX = h.deltaX, this.pY = h.deltaY;
        var u = Ks(h.direction);
        u && (h.additionalEvent = this.options.event + u), this._super.emit.call(this, h);
      }
    });
    function $i() {
      gt.apply(this, arguments);
    }
    R($i, gt, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Xt];
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
    function Hi() {
      Ot.apply(this, arguments), this._timer = null, this._input = null;
    }
    R(Hi, Ot, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [js];
      },
      process: function(h) {
        var u = this.options, f = h.pointers.length === u.pointers, m = h.distance < u.threshold, x = h.deltaTime > u.time;
        if (this._input = h, !m || !f || h.eventType & (U | J) && !x)
          this.reset();
        else if (h.eventType & Z)
          this.reset(), this._timer = v(function() {
            this.state = It, this.tryEmit();
          }, u.time, this);
        else if (h.eventType & U)
          return It;
        return Et;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(h) {
        this.state === It && (h && h.eventType & U ? this.manager.emit(this.options.event + "up", h) : (this._input.timeStamp = p(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Bi() {
      gt.apply(this, arguments);
    }
    R(Bi, gt, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [Xt];
      },
      attrTest: function(h) {
        return this._super.attrTest.call(this, h) && (Math.abs(h.rotation) > this.options.threshold || this.state & ht);
      }
    });
    function Ui() {
      gt.apply(this, arguments);
    }
    R(Ui, gt, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: Tt | qt,
        pointers: 1
      },
      getTouchAction: function() {
        return Je.prototype.getTouchAction.call(this);
      },
      attrTest: function(h) {
        var u = this.options.direction, f;
        return u & (Tt | qt) ? f = h.overallVelocity : u & Tt ? f = h.overallVelocityX : u & qt && (f = h.overallVelocityY), this._super.attrTest.call(this, h) && u & h.offsetDirection && h.distance > this.options.threshold && h.maxPointers == this.options.pointers && g(f) > this.options.velocity && h.eventType & U;
      },
      emit: function(h) {
        var u = Ks(h.offsetDirection);
        u && this.manager.emit(this.options.event + u, h), this.manager.emit(this.options.event, h);
      }
    });
    function ti() {
      Ot.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    R(ti, Ot, {
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
        return [_i];
      },
      process: function(h) {
        var u = this.options, f = h.pointers.length === u.pointers, m = h.distance < u.threshold, x = h.deltaTime < u.time;
        if (this.reset(), h.eventType & Z && this.count === 0)
          return this.failTimeout();
        if (m && x && f) {
          if (h.eventType != U)
            return this.failTimeout();
          var b = this.pTime ? h.timeStamp - this.pTime < u.interval : !0, L = !this.pCenter || qe(this.pCenter, h.center) < u.posThreshold;
          this.pTime = h.timeStamp, this.pCenter = h.center, !L || !b ? this.count = 1 : this.count += 1, this._input = h;
          var G = this.count % u.taps;
          if (G === 0)
            return this.hasRequireFailures() ? (this._timer = v(function() {
              this.state = It, this.tryEmit();
            }, u.interval, this), ht) : It;
        }
        return Et;
      },
      failTimeout: function() {
        return this._timer = v(function() {
          this.state = Et;
        }, this.options.interval, this), Et;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == It && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function kt(h, u) {
      return u = u || {}, u.recognizers = Rt(u.recognizers, kt.defaults.preset), new zi(h, u);
    }
    kt.VERSION = "2.0.7", kt.defaults = {
      domEvents: !1,
      touchAction: Xs,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Bi, { enable: !1 }],
        [$i, { enable: !1 }, ["rotate"]],
        [Ui, { direction: Tt }],
        [Je, { direction: Tt }, ["swipe"]],
        [ti],
        [ti, { event: "doubletap", taps: 2 }, ["tap"]],
        [Hi]
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
    var Do = 1, Qs = 2;
    function zi(h, u) {
      this.options = H({}, kt.defaults, u || {}), this.options.inputTarget = this.options.inputTarget || h, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = h, this.input = ho(this), this.touchAction = new Ni(this, this.options.touchAction), Js(this, !0), P(this.options.recognizers, function(f) {
        var m = this.add(new f[0](f[1]));
        f[2] && m.recognizeWith(f[2]), f[3] && m.requireFailure(f[3]);
      }, this);
    }
    zi.prototype = {
      set: function(h) {
        return H(this.options, h), h.touchAction && this.touchAction.update(), h.inputTarget && (this.input.destroy(), this.input.target = h.inputTarget, this.input.init()), this;
      },
      stop: function(h) {
        this.session.stopped = h ? Qs : Do;
      },
      recognize: function(h) {
        var u = this.session;
        if (!u.stopped) {
          this.touchAction.preventDefaults(h);
          var f, m = this.recognizers, x = u.curRecognizer;
          (!x || x && x.state & It) && (x = u.curRecognizer = null);
          for (var b = 0; b < m.length; )
            f = m[b], u.stopped !== Qs && (!x || f == x || f.canRecognizeWith(x)) ? f.recognize(h) : f.reset(), !x && f.state & (ht | te | Nt) && (x = u.curRecognizer = f), b++;
        }
      },
      get: function(h) {
        if (h instanceof Ot)
          return h;
        for (var u = this.recognizers, f = 0; f < u.length; f++)
          if (u[f].options.event == h)
            return u[f];
        return null;
      },
      add: function(h) {
        if (C(h, "add", this))
          return this;
        var u = this.get(h.options.event);
        return u && this.remove(u), this.recognizers.push(h), h.manager = this, this.touchAction.update(), h;
      },
      remove: function(h) {
        if (C(h, "remove", this))
          return this;
        if (h = this.get(h), h) {
          var u = this.recognizers, f = Jt(u, h);
          f !== -1 && (u.splice(f, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(h, u) {
        if (h !== n && u !== n) {
          var f = this.handlers;
          return P(Qt(h), function(m) {
            f[m] = f[m] || [], f[m].push(u);
          }), this;
        }
      },
      off: function(h, u) {
        if (h !== n) {
          var f = this.handlers;
          return P(Qt(h), function(m) {
            u ? f[m] && f[m].splice(Jt(f[m], u), 1) : delete f[m];
          }), this;
        }
      },
      emit: function(h, u) {
        this.options.domEvents && Ro(h, u);
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
        this.element && Js(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function Js(h, u) {
      var f = h.element;
      if (f.style) {
        var m;
        P(h.options.cssProps, function(x, b) {
          m = Ve(f.style, b), u ? (h.oldCssProps[m] = f.style[m], f.style[m] = x) : f.style[m] = h.oldCssProps[m] || "";
        }), u || (h.oldCssProps = {});
      }
    }
    function Ro(h, u) {
      var f = i.createEvent("Event");
      f.initEvent(h, !0, !0), f.gesture = u, u.target.dispatchEvent(f);
    }
    H(kt, {
      INPUT_START: Z,
      INPUT_MOVE: Yt,
      INPUT_END: U,
      INPUT_CANCEL: J,
      STATE_POSSIBLE: Ke,
      STATE_BEGAN: ht,
      STATE_CHANGED: te,
      STATE_ENDED: Nt,
      STATE_RECOGNIZED: It,
      STATE_CANCELLED: Se,
      STATE_FAILED: Et,
      DIRECTION_NONE: Ge,
      DIRECTION_LEFT: ve,
      DIRECTION_RIGHT: ye,
      DIRECTION_UP: we,
      DIRECTION_DOWN: xe,
      DIRECTION_HORIZONTAL: Tt,
      DIRECTION_VERTICAL: qt,
      DIRECTION_ALL: _s,
      Manager: zi,
      Input: at,
      TouchAction: Ni,
      TouchInput: je,
      MouseInput: Xe,
      PointerEventInput: Di,
      TouchMouseInput: Ri,
      SingleTouchInput: Fs,
      Recognizer: Ot,
      AttrRecognizer: gt,
      Tap: ti,
      Pan: Je,
      Swipe: Ui,
      Pinch: $i,
      Rotate: Bi,
      Press: Hi,
      on: _t,
      off: Lt,
      each: P,
      merge: O,
      extend: j,
      assign: H,
      inherit: R,
      bindFn: Dt,
      prefixed: Ve
    });
    var _o = typeof e < "u" ? e : typeof self < "u" ? self : {};
    _o.Hammer = kt, typeof n == "function" && n.amd ? n(function() {
      return kt;
    }) : r.exports ? r.exports = kt : e[s] = kt;
  })(window, document, "Hammer");
})(gr);
var ze = gr.exports;
const Ja = Qa(ze), bt = /* @__PURE__ */ No({
  __proto__: null,
  default: Ja
}, [ze]), mr = 1, pr = 2, os = 4, th = {
  mousedown: mr,
  mousemove: pr,
  mouseup: os
};
function eh(r, e) {
  for (let i = 0; i < r.length; i++)
    if (e(r[i]))
      return !0;
  return !1;
}
function ih(r) {
  const e = r.prototype.handler;
  r.prototype.handler = function(s) {
    const n = this.store;
    s.button > 0 && s.type === "pointerdown" && (eh(n, (o) => o.pointerId === s.pointerId) || n.push(s)), e.call(this, s);
  };
}
function sh(r) {
  r.prototype.handler = function(i) {
    let s = th[i.type];
    s & mr && i.button >= 0 && (this.pressed = !0), s & pr && i.which === 0 && (s = os), this.pressed && (s & os && (this.pressed = !1), this.callback(this.manager, s, {
      pointers: [i],
      changedPointers: [i],
      pointerType: "mouse",
      srcEvent: i
    }));
  };
}
ih(ze.PointerEventInput);
sh(ze.MouseInput);
const nh = ze.Manager;
let Li = class {
  constructor(e, i, s) {
    this.element = e, this.callback = i, this.options = { enable: !0, ...s };
  }
};
const rh = bt ? [
  [bt.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [bt.Rotate, { enable: !1 }],
  [bt.Pinch, { enable: !1 }],
  [bt.Swipe, { enable: !1 }],
  [bt.Pan, { threshold: 0, enable: !1 }],
  [bt.Press, { enable: !1 }],
  [bt.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [bt.Tap, { event: "anytap", enable: !1 }],
  [bt.Tap, { enable: !1 }]
] : null, yn = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
}, oh = {
  doubletap: ["tap"]
}, ah = {
  pointerdown: "pointerdown",
  pointermove: "pointermove",
  pointerup: "pointerup",
  touchstart: "pointerdown",
  touchmove: "pointermove",
  touchend: "pointerup",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup"
}, Ss = {
  KEY_EVENTS: ["keydown", "keyup"],
  MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
  WHEEL_EVENTS: [
    "wheel",
    "mousewheel"
  ]
}, hh = {
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
}, wn = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
}, lh = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", se = typeof window < "u" ? window : global;
let as = !1;
try {
  const r = {
    get passive() {
      return as = !0, !0;
    }
  };
  se.addEventListener("test", null, r), se.removeEventListener("test", null);
} catch {
  as = !1;
}
const ch = lh.indexOf("firefox") !== -1, { WHEEL_EVENTS: dh } = Ss, xn = "wheel", Tn = 4.000244140625, uh = 40, fh = 0.25;
class gh extends Li {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      if (!this.options.enable)
        return;
      let o = n.deltaY;
      se.WheelEvent && (ch && n.deltaMode === se.WheelEvent.DOM_DELTA_PIXEL && (o /= se.devicePixelRatio), n.deltaMode === se.WheelEvent.DOM_DELTA_LINE && (o *= uh)), o !== 0 && o % Tn === 0 && (o = Math.floor(o / Tn)), n.shiftKey && o && (o = o * fh), this.callback({
        type: xn,
        center: {
          x: n.clientX,
          y: n.clientY
        },
        delta: -o,
        srcEvent: n,
        pointerType: "mouse",
        target: n.target
      });
    }, this.events = (this.options.events || []).concat(dh), this.events.forEach((n) => e.addEventListener(n, this.handleEvent, as ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === xn && (this.options.enable = i);
  }
}
const { MOUSE_EVENTS: mh } = Ss, En = "pointermove", Sn = "pointerover", bn = "pointerout", Cn = "pointerenter", Mn = "pointerleave";
class ph extends Li {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (o) => {
      this.handleOverEvent(o), this.handleOutEvent(o), this.handleEnterEvent(o), this.handleLeaveEvent(o), this.handleMoveEvent(o);
    }, this.pressed = !1;
    const { enable: n } = this.options;
    this.enableMoveEvent = n, this.enableLeaveEvent = n, this.enableEnterEvent = n, this.enableOutEvent = n, this.enableOverEvent = n, this.events = (this.options.events || []).concat(mh), this.events.forEach((o) => e.addEventListener(o, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === En && (this.enableMoveEvent = i), e === Sn && (this.enableOverEvent = i), e === bn && (this.enableOutEvent = i), e === Cn && (this.enableEnterEvent = i), e === Mn && (this.enableLeaveEvent = i);
  }
  handleOverEvent(e) {
    this.enableOverEvent && e.type === "mouseover" && this._emit(Sn, e);
  }
  handleOutEvent(e) {
    this.enableOutEvent && e.type === "mouseout" && this._emit(bn, e);
  }
  handleEnterEvent(e) {
    this.enableEnterEvent && e.type === "mouseenter" && this._emit(Cn, e);
  }
  handleLeaveEvent(e) {
    this.enableLeaveEvent && e.type === "mouseleave" && this._emit(Mn, e);
  }
  handleMoveEvent(e) {
    if (this.enableMoveEvent)
      switch (e.type) {
        case "mousedown":
          e.button >= 0 && (this.pressed = !0);
          break;
        case "mousemove":
          e.which === 0 && (this.pressed = !1), this.pressed || this._emit(En, e);
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
const { KEY_EVENTS: vh } = Ss, Pn = "keydown", Ln = "keyup";
class yh extends Li {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      const o = n.target || n.srcElement;
      o.tagName === "INPUT" && o.type === "text" || o.tagName === "TEXTAREA" || (this.enableDownEvent && n.type === "keydown" && this.callback({
        type: Pn,
        srcEvent: n,
        key: n.key,
        target: n.target
      }), this.enableUpEvent && n.type === "keyup" && this.callback({
        type: Ln,
        srcEvent: n,
        key: n.key,
        target: n.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(vh), e.tabIndex = this.options.tabIndex || 0, e.style.outline = "none", this.events.forEach((n) => e.addEventListener(n, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === Pn && (this.enableDownEvent = i), e === Ln && (this.enableUpEvent = i);
  }
}
const An = "contextmenu";
class wh extends Li {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      this.options.enable && this.callback({
        type: An,
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
    e === An && (this.options.enable = i);
  }
}
const hs = 1, vi = 2, ls = 4, xh = {
  pointerdown: hs,
  pointermove: vi,
  pointerup: ls,
  mousedown: hs,
  mousemove: vi,
  mouseup: ls
}, Th = 1, Eh = 2, Sh = 3, bh = 0, Ch = 1, Mh = 2, Ph = 1, Lh = 2, Ah = 4;
function Ih(r) {
  const e = xh[r.srcEvent.type];
  if (!e)
    return null;
  const { buttons: i, button: s, which: n } = r.srcEvent;
  let o = !1, a = !1, l = !1;
  return e === ls || e === vi && !Number.isFinite(i) ? (o = n === Th, a = n === Eh, l = n === Sh) : e === vi ? (o = !!(i & Ph), a = !!(i & Ah), l = !!(i & Lh)) : e === hs && (o = s === bh, a = s === Ch, l = s === Mh), { leftButton: o, middleButton: a, rightButton: l };
}
function Oh(r, e) {
  const i = r.center;
  if (!i)
    return null;
  const s = e.getBoundingClientRect(), n = s.width / e.offsetWidth || 1, o = s.height / e.offsetHeight || 1, a = {
    x: (i.x - s.left - e.clientLeft) / n,
    y: (i.y - s.top - e.clientTop) / o
  };
  return { center: i, offsetCenter: a };
}
const Fi = {
  srcElement: "root",
  priority: 0
};
class kh {
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
    let c = Fi;
    typeof s == "string" || s && s.addEventListener ? c = { ...Fi, srcElement: s } : s && (c = { ...Fi, ...s });
    let g = l.get(c.srcElement);
    g || (g = [], l.set(c.srcElement, g));
    const p = {
      type: e,
      handler: i,
      srcElement: c.srcElement,
      priority: c.priority
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
        const { type: g, handler: p, once: v } = s[c];
        if (p({
          ...e,
          type: g,
          stopPropagation: o,
          stopImmediatePropagation: a
        }), v && l.push(s[c]), n)
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
      ...Ih(e),
      ...Oh(e, i),
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
const Dh = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: nh,
  touchAction: "none",
  tabIndex: 0
};
class Rh {
  constructor(e = null, i) {
    this._onBasicInput = (n) => {
      const { srcEvent: o } = n, a = ah[o.type];
      a && this.manager.emit(a, n);
    }, this._onOtherEvent = (n) => {
      this.manager.emit(n.type, n);
    }, this.options = { ...Dh, ...i }, this.events = /* @__PURE__ */ new Map(), this.setElement(e);
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
      recognizers: i.recognizers || rh
    }).on("hammer.input", this._onBasicInput), i.recognizers || Object.keys(yn).forEach((n) => {
      const o = this.manager.get(n);
      o && yn[n].forEach((a) => {
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
    this.wheelInput = new gh(e, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new ph(e, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new yh(e, this._onOtherEvent, {
      enable: !1,
      tabIndex: i.tabIndex
    }), this.contextmenuInput = new wh(e, this._onOtherEvent, {
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
      const o = oh[e];
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
    const { manager: a, events: l } = this, c = wn[e] || e;
    let g = l.get(c);
    g || (g = new kh(this), l.set(c, g), g.recognizerName = hh[c] || c, a && a.on(c, g.handleEvent)), g.add(e, i, s, n, o), g.isEmpty() || this._toggleRecognizer(g.recognizerName, !0);
  }
  _removeEventHandler(e, i) {
    if (typeof e != "string") {
      for (const a in e)
        this._removeEventHandler(a, e[a]);
      return;
    }
    const { events: s } = this, n = wn[e] || e, o = s.get(n);
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
class In {
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
class On {
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
class kn {
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
const _h = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class Pt {
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
  constructor(e, i) {
    if (this.#t = { ..._h, ...i }, this.#h = Ka.idle, this.#o = Za, this.#e = e, !this.#e && this.#t.elementId && (this.#e = document.getElementById(this.#t.elementId)), !I.isElement(this.#e))
      throw "Must specify an element to receive user input.";
    this.#t.contextMenu || (window.oncontextmenu = (o) => (o.preventDefault(), !1));
    const n = {
      recognizerOptions: {
        pan: { threshold: this.#o ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#r = new Rh(this.#e, n), this.pointerInit();
  }
  get agent() {
    return this.#r;
  }
  get pointer() {
    return this.#n instanceof In ? this.#n : (this.#n = new In(this), this.#n);
  }
  get touch() {
    return this.#s instanceof On ? this.#s : (this.#s = new On(this), this.#s);
  }
  get key() {
    return this.#i instanceof kn ? this.#i : (this.#i = new kn(this), this.#i);
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
    Q(e) && (this.#a = e);
  }
  set panY(e) {
    Q(y) && (this.#c = y);
  }
  set wheeldelta(e) {
    this.#u = e.delta;
  }
  get wheeldelta() {
    return this.#u;
  }
  destroy() {
    this.#r.destroy(), this.#n = void 0, this.#i = void 0, this.#s = void 0;
  }
  isValid(e, i) {
    return !!(S(e) || B(i));
  }
  validOptions(e) {
    return T(e) && Q(e) ? e : void 0;
  }
  on(e, i, s, n = !1) {
    if (!this.isValid(e, i))
      return !1;
    this.pointer.has(e) ? this.#n.on(e, i, s, n) : this.touch.has(e) ? this.#s.on(e, i, s, n) : this.key.has(e) ? this.#i.on(e, i, s, n) : this.element.addEventListener(e, i, this.validOptions(s));
  }
  off(e, i, s) {
    this.#n?.has(e) ? this.#n.off(e, i, s) : this.#s?.has(e) ? this.#s.off(e, i, s) : this.#i?.has(e) ? this.#i.off(e, i, s) : this.element.removeEventListener(e, i, this.validOptions(s));
  }
  once(e, i, s) {
    this.on(e, i, s, !0);
  }
  setCursor(e) {
    this.#e.style.cursor = e;
  }
  pointerInit() {
    this.clientPosPrev = new Zt([null, null]), this.position = new Zt([0, 0]), this.movement = new Zt([0, 0]), this.dragstart = new Zt([null, null]), this.dragend = new Zt([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
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
  #n;
  #i;
  #s;
  #o;
  #h;
  #l;
  #a;
  static dividerList = {};
  static divideCnt = 0;
  static class = un;
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
  <div slot="widget" class="${un}" style="position: absolute;"></div>
  `;
  }
  constructor(e, i) {
    const s = { ...i };
    this.#i = e, this.#e = s.core, this.#r = s, this.#n = s.core.theme, this.#t = s.id, this.#s = s.chartPane, this.#o = e.elements.elDividers, this.init();
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
    this.#a = new Pt(this.#h, { disableContextMenu: !1 }), this.#a.on("pointerover", this.onMouseEnter.bind(this)), this.#a.on("pointerout", this.onMouseOut.bind(this)), this.#a.on("pointerdrag", this.onPointerDrag.bind(this)), this.#a.on("pointerdragend", this.onPointerDragEnd.bind(this));
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
    this.#h.style.background = this.#n.divider.active, this.#e.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#h.style.background = this.#n.divider.idle, this.#e.MainPane.onMouseEnter();
  }
  onPointerDrag(e) {
    this.#l = this.#e.MainPane.cursorPos, this.#h.style.background = this.#n.divider.active, this.emit(`${this.id}_pointerdrag`, this.#l), this.emit("divider_pointerdrag", {
      id: this.id,
      e,
      pos: this.#l,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(e) {
    "position" in e && (this.#h.style.background = this.#n.divider.idle), this.#l = this.#e.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#l), this.emit("divider_pointerdragend", {
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
    let e = this.#s.pos.top - I.elementDimPos(this.#o).top, i = this.#e.MainPane.rowsW + this.#e.scaleW, s = E(this.config.dividerHeight) ? this.config.dividerHeight : Pa, n = this.#e.theme.tools.width;
    switch (e -= s / 2, this.#e.theme.tools.location) {
      case "left":
        break;
      case !1:
      case "none":
      case "right":
        n *= -1;
        break;
    }
    const o = `position: absolute; top: ${e}px; left: ${n}px; z-index:100; width: ${i}px; height: ${s}px; background: ${this.#n.divider.idle};`;
    return `
      <div id="${this.#t}" class="divider" style="${o}"></div>
    `;
  }
  setPos() {
    let e = this.#s.pos.top - I.elementDimPos(this.#o).top;
    e = e - this.height / 2, this.#h.style.top = `${e}px`;
  }
  hide() {
    this.#h.style.display = "none";
  }
  show() {
    this.#h.style.display = "block";
  }
}
const Nh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', $h = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', Hh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', vr = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', Bh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', Uh = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', zh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', ni = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', Wh = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', Fh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', Vh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', Gh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Yh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', qh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', Xh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>', jh = '<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>', Zh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Kh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', Qh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', Jh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', tl = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', el = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>', il = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>', sl = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>', nl = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>', rl = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>', ol = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>', al = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>', hl = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>', ll = '<svg width="493px" height="512px" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 493 511.77" xmlns="http://www.w3.org/2000/svg"><path d="m33.11 458.2 104.5-79.1c3.09-3 7.08-4.47 11.08-4.45l302.6-0.08c2.67 0 5.09-1.08 6.78-2.77 1.74-1.81 2.84-4.24 2.84-6.87v-323.2c0-2.59-1.12-5-2.86-6.74-1.78-1.78-4.2-2.9-6.76-2.9h-409.56c-2.54 0-4.94 1.14-6.72 2.92s-2.92 4.18-2.92 6.72c0 793.72 1.02 39.329 1.02 416.47zm90.6-229.77c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.73-19.74 19.73c-10.89 0-19.73-8.84-19.73-19.73s8.84-19.74 19.73-19.74zm0-101.14c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.74-19.74 19.74c-10.89 0-19.73-8.85-19.73-19.74s8.84-19.74 19.73-19.74zm61.72 138.89c-9.95 0-18.02-8.07-18.02-18.01 0-9.95 8.07-18.02 18.02-18.02h185.56c9.95 0 18.01 8.07 18.01 18.02 0 9.94-8.06 18.01-18.01 18.01zm0-101.13c-9.95 0-18.02-8.07-18.02-18.02 0-9.94 8.07-18.01 18.02-18.01h185.56c9.95 0 18.01 8.07 18.01 18.01 0 9.95-8.06 18.02-18.01 18.02zm-30.38 241.61-125.97 99.69c-2.96 3.32-7.24 5.42-12.01 5.42-8.85 0-17.07-7.1228-17.07-15.963v-454.08c0-11.4 4.77-21.88 12.31-29.42s18.02-12.31 29.42-12.31h409.56c11.4 0 21.9 4.74 29.45 12.29 7.5 7.51 12.26 17.96 12.26 29.44v323.2c0 11.48-4.7 21.95-12.24 29.49-7.61 7.54-18.05 12.24-29.47 12.24z" fill-rule="nonzero"/></svg>', cl = '<svg width="800px" height="800px" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.746 2.7281c-5.1207-2.0689-10.949 0.40512-13.018 5.5258-2.0689 5.1207 0.40512 10.949 5.5258 13.018 5.1207 2.0689 10.949-0.40508 13.018-5.5258 2.0689-5.1207-0.40508-10.949-5.5258-13.018zm-1.3378 8.3035-1.2703-0.51325c-0.21854-0.08829-0.32785-0.13246-0.3683-0.22775-0.04045-0.09529 0.0037-0.20461 0.09201-0.42314l1.6595-4.1073c0.33362-0.82575 0.50047-1.2387 0.33474-1.3523-0.16582-0.11359-0.49058 0.19103-1.1403 0.8003l-4.7426 4.4469c-1.0274 0.96338-1.541 1.445-1.4405 1.9835 0.10054 0.53837 0.75347 0.80216 2.0594 1.3298l1.2703 0.51325c0.21854 0.08829 0.32785 0.13246 0.3683 0.22775 0.04045 0.09529-0.0037 0.20461-0.09201 0.42314l-1.6595 4.1073c-0.33365 0.82582-0.50047 1.2387-0.33475 1.3523 0.16582 0.1136 0.49059-0.19104 1.1403-0.80025l4.7425-4.4469c1.0275-0.96346 1.5411-1.4451 1.4406-1.9836-0.10057-0.53838-0.75352-0.80218-2.0594-1.3298z" clip-rule="evenodd" fill-rule="evenodd"/></svg>', dl = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>', ul = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>', Kt = 300, yi = 400, fl = `${yi}px`, yr = `${Kt}px`, gl = "100%", ml = "100%", Wt = 30, Ut = 35, wi = 25, wr = 25, xi = wi + wr, ce = 60, re = "normal", oe = 12, Vi = "normal", ae = "Avenir, Helvetica, Arial, sans-serif", bs = "#141414", Cs = "#666666", Ms = "#cccccc", Ne = "#888888", de = "#cccccc", xr = "25px", pl = "position: relative;", N = {
  COLOUR_BG: bs,
  COLOUR_BORDER: Cs,
  COLOUR_TXT: Ms,
  COLOUR_ICON: Ne,
  COLOUR_ICONHOVER: de,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: re,
  FONTSIZE: oe,
  FONTSTYLE: Vi,
  FONTFAMILY: ae,
  FONT: `${Vi} ${oe}px ${re} ${ae}`,
  FONTSTRING: `font-style: ${Vi}; font-size: ${oe}px; font-weight: ${re}; font-family: ${ae};`
}, ut = {
  fontSize: oe,
  fontWeight: re,
  fontFamily: ae,
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderWidth: 1,
  txtCol: "#000000",
  bakCol: "#cccccc",
  stroke: "#ffffff",
  fill: "#888888"
}, zt = {
  COLOUR_ICON: Ne,
  COLOUR_ICONHOVER: de,
  ICONSIZE: xr
}, he = {
  COLOUR_ICON: Ne,
  COLOUR_ICONHOVER: de,
  ICONSIZE: xr
}, Gi = {
  COLOUR_BG: bs,
  COLOUR_BORDER: Cs,
  COLOUR_TXT: Ms
}, Yi = {
  COLOUR_BG: bs,
  COLOUR_BORDER: Cs,
  COLOUR_TXT: Ms
}, vl = {
  FILL: de + "88"
}, X = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, ri = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, ci = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, Dn = re, di = oe, ui = ae, wt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: ui,
  FONTSIZE: di,
  FONTWEIGHT: Dn,
  FONT_LABEL: `${Dn} ${di}px ${ui}`,
  FONT_LABEL_BOLD: `bold ${di}px ${ui}`
}, Rn = re, _n = oe, Nn = ae, jt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: Nn,
  FONTSIZE: _n,
  FONTWEIGHT: Rn,
  FONT_LABEL: `${Rn} ${_n}px ${Nn}`,
  FONT_LABEL_BOLD: `bold ${di}px ${ui}`
}, Tr = {
  COLOUR_GRID: "#333"
}, yl = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, qi = {
  text: N.FONTSTRING,
  font: N.FONT,
  colour: N.COLOUR_TXT
}, $n = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00"
}, wl = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: N.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}, Xi = { arrowDown: el, arrowUp: il, arrowDownRound: sl, arrowUpRound: nl, arrowDownRoundSolid: rl, arrowUpRoundSolid: ol, buySolid: al, sellSolid: hl }, Hn = { noteSolid: ll, lightning: cl }, xl = {
  candle: {
    Type: X.CANDLE_SOLID,
    UpBodyColour: ri.COLOUR_CANDLE_UP,
    UpWickColour: ri.COLOUR_WICK_UP,
    DnBodyColour: ri.COLOUR_CANDLE_DN,
    DnWickColour: ri.COLOUR_WICK_DN
  },
  volume: {
    Height: ci.ONCHART_VOLUME_HEIGHT,
    UpColour: ci.COLOUR_VOLUME_UP,
    DnColour: ci.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: jt.COLOUR_TICK,
    colourLabel: jt.COLOUR_LABEL,
    colourCursor: jt.COLOUR_CURSOR,
    colourCursorBG: jt.COLOUR_CURSOR_BG,
    fontFamily: jt.FONTFAMILY,
    fontSize: jt.FONTSIZE,
    fontWeight: jt.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: Ne,
    iconHover: de
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
    Background: N.COLOUR_BG,
    BorderColour: N.COLOUR_BORDER,
    BorderThickness: N.BORDER_THICKNESS,
    TextColour: N.COLOUR_TXT,
    FontWeight: N.FONTWEIGHT,
    FontSize: N.FONTSIZE,
    FontStyle: N.FONTSTYLE,
    FontFamily: N.FONTFAMILY,
    Font: N.FONT,
    FontString: N.FONTSTRING,
    GridColour: Tr.COLOUR_GRID
  },
  primaryPane: {
    separator: "#666"
  },
  secondaryPane: {
    separator: "#666"
  },
  time: {
    navigation: !1,
    font: qi.font,
    colour: "#96a9db",
    handleColour: "#586ea6"
  },
  legend: {
    font: qi.font,
    colour: qi.colour,
    controls: !0,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: Ne,
    hover: de
  },
  divider: {
    active: $n.ACTIVE,
    idle: $n.IDLE
  },
  watermark: wl,
  trades: {
    iconBuy: Xi.arrowUp,
    iconSell: Xi.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    buyColour: "#0f0",
    sellColour: "#f00",
    defaultIcons: Xi,
    offset: 10
  },
  events: {
    iconEvent: Hn.lightning,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    iconColour: "#ccc",
    defaultIcons: Hn,
    offset: 10
  }
}, Tl = `
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
</style>`, El = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${fl});
    min-height: var(--txc-min-height, ${yr});
    max-width: var(--txc-max-width, ${gl});
    max-height: var(--txc-max-height, ${ml});
    overflow: hidden;
    background: var(--txc-background, ${N.COLOUR_BG});
    font: var(--txc-font, ${N.FONT});
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
`, Bn = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class yt {
  static #t = new ft();
  static get list() {
    return yt.#t;
  }
  #e;
  static create(e, i) {
    if (!T(e))
      return !1;
    e.id = S(e.name) ? it(e.name) : `${i.id}.theme`;
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
    const i = rt(xl), s = rt(e), n = De(i, s);
    for (let o in n)
      Bn.includes(o) || (this[o] = n[o]);
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
    const s = tn(this, e), n = e.split(".");
    if (n.length == 1)
      this[n[0]] = i;
    else {
      let o = n.shift();
      this[o] = cr(this[o], n.join("."), i);
    }
    return this.#e.refresh(), s;
  }
  getProperty(e) {
    return tn(this, e);
  }
  deleteTheme(e) {
    return S(e) && yt.list.has(e) ? (yt.list.delete(e), !0) : !1;
  }
  exportTheme(e = {}) {
    T || (e = {});
    const i = e?.type, s = {};
    let n;
    for (let o in this)
      Bn.includes(o) || (s[o] = this[o]);
    switch (i) {
      case "json":
      default:
        const { replacer: o, space: a } = { ...e };
        n = JSON.stringify(s, o, a);
    }
    return n;
  }
}
class Sl {
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
class bl {
  #t;
  #e;
  #r;
  #n = 0;
  #i = {};
  #s;
  constructor(e, i, s, n) {
    this.#t = e, this.#e = s, this.#r = n;
    const o = `
      ${Er.ThreadWorker.toString()};
      const fn = ${i}
      const worker = new ThreadWorker(fn)
    `, a = new Blob([`;(() => {${o}})()`], { type: "text/javascript" }), l = URL.createObjectURL(a);
    this.#s = new Worker(l), URL.revokeObjectURL(l);
  }
  get id() {
    return this.#t;
  }
  get req() {
    return `r_${this.#n}`;
  }
  onmessage(e) {
    return B(this.#e) ? this.#e(e) : e;
  }
  onerror(e) {
    return B(this.#r) ? this.#r(e) : e;
  }
  postMessage(e) {
    return new Promise((i, s) => {
      try {
        let n = this.req;
        this.#i[n] = { resolve: i, reject: s }, this.#s.postMessage({ r: n, data: e }), this.#s.onmessage = (o) => {
          const { r: a, result: l } = o.data;
          if (a in this.#i) {
            const { resolve: c, reject: g } = this.#i[a];
            delete this.#i[a], c(this.onmessage(l));
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
let Er = class Ht {
  static #t = /* @__PURE__ */ new Map();
  static ThreadWorker = Sl;
  static Thread = bl;
  static create(e = "worker", i, s, n) {
    if (typeof window.Worker > "u")
      return !1;
    if (B(i))
      i = i.toString();
    else if (!S(i))
      return !1;
    return e = S(e) ? it(e) : it("worker"), Ht.#t.set(e, new Ht.Thread(e, i, s)), Ht.#t.get(e);
  }
  static destroy(e) {
    if (!S(e))
      return !1;
    Ht.#t.get(e).terminate(), Ht.#t.delete(e);
  }
  static end() {
    Ht.#t.forEach((e, i, s) => {
      Ht.destroy(i);
    });
  }
};
class ot extends HTMLElement {
  shadowRoot;
  template;
  id = it(Ae);
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
class Sr {
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
    return aa(e);
  }
  numDigits(e) {
    return hr(e);
  }
  countDigits(e) {
    return oa(e);
  }
  precision(e) {
    return lr(e);
  }
}
class fi extends Sr {
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
    return st(this.width / this.range.Length);
  }
  get candlesOnLayer() {
    return st(this.core.Chart.layerWidth / this.candleW);
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
    return st(this.range.rangeIndex(e) * this.candleW + this.candleW * 0.5);
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
    let i = this.range.indexStart, s = st(e / this.candleW);
    return i + s;
  }
  pixelOHLCV(e) {
    let i = this.pixel2Index(e);
    return this.range.value(i);
  }
  xPosSnap2CandlePos(e) {
    let i = e % this.candleW, s = i ? this.candleW / 2 : 0;
    return st(e - i + s);
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
    }, s = us(e.rangeDuration);
    i.units = s;
    for (let p in s)
      if (s[p] > 0) {
        i.units = [p, p], i.timeSpan = `${s[p]} ${p}`;
        break;
      }
    const n = e.interval, { xStep: o, rank: a } = this.xStep(e), l = this.pixel2T(this.width) + o;
    let c = e.timeMin - e.timeMin % o - o, g = c;
    for (; c < l; ) {
      let p = hi(c, "years"), v = hi(c, "months"), C = hi(c, "days");
      !(p in i.entries) && p >= g ? i.entries[p] = [this.dateTimeValue(p, n), this.t2Pixel(p), p, "major"] : !(v in i.entries) && v >= g ? i.entries[v] = [this.dateTimeValue(v, n), this.t2Pixel(v), v, "major"] : !(C in i.entries) && C >= g && (i.entries[C] = [this.dateTimeValue(C, n), this.t2Pixel(C), C, "major"]), i.entries[c] = [this.dateTimeValue(c, n), this.t2Pixel(c), c, "minor"], c += o;
    }
    return i.values = Object.values(i.entries), i;
  }
  xStep(e) {
    let i = Ma, s = this.#r ? e.interval : 1, n = Ce[0], o = st(this.width / e.Length), a = ts[0], l = Ce.indexOf(s);
    for (; l-- >= 0 && !(o * (Ce[l] / s) >= i); )
      ;
    return n = Ce[l], a = ts[l], { xStep: n, rank: a };
  }
  dateTimeValue(e, i) {
    if (e / _ % 1 === 0) {
      const s = ws(e);
      return s === 1 ? xs(e) === 0 ? rr(e) : sr(e) : s;
    } else
      return i < W || i < q ? is(e) : ar(e);
  }
}
const ji = {
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
}, Un = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, zn = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, Wn = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, Fn = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, Vn = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class br {
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
    this.#e(e), Un.test(e) && this.#r(e), zn.test(e) && this.#n(e), Wn.test(e) && this.#i(e), Fn.test(e) && this.#s(e), Vn.test(e) && this.#o(e);
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
    if (ja) {
      let i = document.getElementById("divValidColourTest");
      i || (i = document.createElement("div"), i.id = "divValidColourTest"), i.style.backgroundColor = "", i.style.backgroundColor = e, this.#t.isValid = !!i.style.backgroundColor.length;
    } else
      this.#t.isValid = !!(Un.test(e) || zn.test(e) || Wn.test(e) || Fn.test(e) || Vn.test(e));
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
  #n(e) {
    this.#t.hsl = e;
  }
  #i(e) {
    this.#t.hsla = e;
  }
  #s(e) {
    this.#t.rgb = e, this.#p(rgba);
  }
  #o(e) {
    this.#t.rgba = e, this.#p(e);
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
    if (M(e)) {
      if (e.length < 3 || e.length > 4)
        return !1;
      i = e[0], s = e[1], n = e[2], o = S(e[3]) ? e[3] : "";
    } else if (T(e))
      i = e.r, s = e.g, n = e.b, o = "a" in e ? e.a : "";
    else
      return !1;
    return { r: i, g: s, b: n, a: o };
  }
  #p(e) {
    let i, s, n = 0, o = [], a = [], l = e.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    l.shift();
    for (let c of l)
      s = c.indexOf("%") > -1, i = parseFloat(c), n < 3 && s ? i = Math.round(255 * i / 100) : n == 3 && (!s && i >= 0 && i <= 1 ? i = Math.round(255 * i) : s && i >= 0 && i <= 100 ? i = Math.round(255 * i / 100) : i = ""), o[n] = (i | 256).toString(16).slice(1), a[n++] = i;
    this.setHex(o), this.setRGBA(a), this.#d(this.#t.hex);
  }
}
class Ps {
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
  constructor(e) {
    this.#e = Ps.#t++, this.#r = e.core, this.#n = I.isElement(e.elContainer) ? e.elContainer : !1, this.#i = I.isElement(e.elHandle) ? e.elHandle : !1, this.#u = B(e.callback) ? e.callback : !1, I.isElement(this.#n) && I.isElement(this.#i) && (this.mount(), this.eventsListen());
  }
  set cursor(e) {
    this.#i.style.cursor = e;
  }
  get cursor() {
    return this.#i.style.cursor;
  }
  eventsListen() {
    this.#c = new Pt(this.#i, { disableContextMenu: !1 }), this.#c.on("mouseenter", dt(this.onMouseEnter, 1, this, !0)), this.#c.on("mouseout", dt(this.onMouseOut, 1, this, !0)), this.#c.on("drag", ya(this.onHandleDrag, 100, this)), this.#c.on("enddrag", this.onHandleDragDone.bind(this)), this.#c.on("mousedown", dt(this.onMouseDown, 100, this, !0)), this.#c.on("mouseup", this.onMouseUp.bind(this));
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
    e && (this.colour = new br(e), this.#i.style.backgroundColor = this.colour.hex);
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
    this.#s.w = this.#n.getBoundingClientRect().width, this.#s.h = this.#n.getBoundingClientRect().height, this.#n.style.overflow = "hidden", this.#o.w = this.#i.getBoundingClientRect().width, this.#o.h = this.#i.getBoundingClientRect().height, this.#i.style.marginRight = 0, this.#i.style.position = "absolute";
  }
  handlePos(e) {
    let i = this.#r.range, s = parseInt(this.#i.style.marginLeft), n = this.#n.getBoundingClientRect().width, o = this.#i.getBoundingClientRect().width, a = n - o, l = e.position.x - this.#a.x, c = $(s + l, 0, a), g = (i.dataLength + i.limitFuture + i.limitPast) / n, p = Math.floor(c * g);
    this.setHandleDims(c, o), this.#r.jumpToIndex(p);
  }
  setHandleDims(e, i) {
    let s = this.#n.getBoundingClientRect().width;
    i = i || this.#i.getBoundingClientRect().width, e = e / s * 100, this.#i.style.marginLeft = `${e}%`, i = i / s * 100, this.#i.style.width = `${i}%`;
  }
}
const Cr = ["source-over", "source-atop", "source-in", "source-out", "destination-over", "destination-atop", "destination-in", "destination-out", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
let Mr = class {
  constructor(e = {}) {
    this.container = e.container, this.layers = [], this.id = F.idCnt++, this.scene = new F.Scene(), this.setSize(e.width || 0, e.height || 0);
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
    let e = F.viewports, i, s = 0;
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
      e && n.layers.length > 0 && n.render(e), Cr.includes(n?.composition) && (i.context.globalCompositeOperation = n.composition), n.visible && n.width > 0 && n.height > 0 && i.context.drawImage(
        n.scene.canvas,
        n.x,
        n.y,
        n.width,
        n.height
      );
  }
};
class Cl extends Mr {
  constructor(e = {}) {
    super(e), e.container.innerHTML = "", e.container.appendChild(this.scene.canvas), F.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", F.viewports.splice(this.index, 1);
  }
}
class Ml {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  visible = !0;
  composition = null;
  constructor(e = {}) {
    this.id = F.idCnt++, this.hit = new F.Hit({
      layer: this,
      contextType: e.contextType
    }), this.scene = new F.Scene({
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
    if (Cr.includes(e))
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
        ca(n, this.index, o);
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
class Pl {
  width = 0;
  height = 0;
  constructor(e) {
    e || (e = {}), this.id = F.idCnt++, this.layer = e.layer, this.contextType = e.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "scene-canvas", this.canvas.style.display = "block", this.context = this.canvas.getContext(this.contextType), e.width && e.height && this.setSize(e.width, e.height);
  }
  setSize(e, i) {
    return Lr(e, i, this);
  }
  clear() {
    return Pr(this);
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
class Ll {
  width = 0;
  height = 0;
  constructor(e) {
    e || (e = {}), this.layer = e.layer, this.contextType = e.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "hit-canvas", this.canvas.style.display = "none", this.canvas.style.position = "relative", this.context = this.canvas.getContext(this.contextType, {
      preserveDrawingBuffer: !0,
      antialias: !1
    }), e.width && e.height && this.setSize(e.width, e.height);
  }
  setSize(e, i) {
    return Lr(e, i, this);
  }
  clear() {
    return Pr(this);
  }
  getIntersection(e, i) {
    let s = this.context, n;
    if (e = Math.round(e - this.layer.x), i = Math.round(i - this.layer.y), e < 0 || i < 0 || e > this.width || i > this.height)
      return -1;
    if (this.contextType === "2d") {
      if (n = s.getImageData(e, i, 1, 1).data, n[3] < 255)
        return -1;
    } else if (n = new Uint8Array(4), s.readPixels(
      e * F.pixelRatio,
      (this.height - i - 1) * F.pixelRatio,
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
function Pr(r) {
  let e = r.context;
  return r.contextType === "2d" ? e.clearRect(
    0,
    0,
    r.width * F.pixelRatio,
    r.height * F.pixelRatio
  ) : e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), r;
}
function Lr(r, e, i) {
  return i.width = r, i.height = e, i.canvas.width = r * F.pixelRatio, i.canvas.style.width = `${r}px`, i.canvas.height = e * F.pixelRatio, i.canvas.style.height = `${e}px`, i.contextType === "2d" && F.pixelRatio !== 1 && i.context.scale(F.pixelRatio, F.pixelRatio), i;
}
const F = {
  idCnt: 0,
  viewports: [],
  pixelRatio: window && window.devicePixelRatio || 1,
  Node: Mr,
  Viewport: Cl,
  Layer: Ml,
  Scene: Pl,
  Hit: Ll
}, $e = F;
class Al {
  #t;
  #e;
  #r;
  #n;
  #i;
  constructor(e, i = []) {
    this.#r = e, this.#t = e.core, this.#n = new ft([...i]);
    for (const [s, n] of this.#n)
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
    for (let e of this.#n.keys())
      this.removeOverlay(e);
    this.#n = null;
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
    return this.#n.get(e);
  }
  addOverlays(e) {
    let i = [], s, n;
    for (let o of e)
      n = this.addOverlay(o[0], o[1]), s = n.instance?.id || o[0], i.push([s, n]);
    return i;
  }
  addOverlay(e, i) {
    try {
      const s = new $e.Layer(this.layerConfig);
      return this.parent.viewport.addLayer(s), i.layer = s, i.instance = new i.class(
        s,
        this.#r.TimeLine,
        this.#r.Scale,
        this.#t.theme,
        this,
        i.params
      ), S(i.instance?.id) || (i.instance.id = e), this.#n.set(i.instance.id, i), !0;
    } catch (s) {
      return console.error(`Error: Cannot instantiate ${e} overlay / indicator`), console.error(s), !1;
    }
  }
  removeOverlay(e) {
    this.#n.has(e) && (this.#n.get(e).layer.remove(), this.#n.delete(e));
  }
}
class gi extends Sr {
  #t;
  #e;
  #r;
  #n;
  #i = ie[0];
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
  #l = sn;
  #a = Ca;
  #c = 3;
  #u;
  #d;
  constructor(e, i, s = ie[0], n) {
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
    this.#i = ie.includes(e) ? e : ie[0];
  }
  get yAxisType() {
    return this.#i;
  }
  set yAxisStep(e) {
    this.#l = E(e) ? e : sn;
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
        return st(this.p100toPixel(e));
      case "log":
        return st(this.$2Pixel(ha(e)));
      default:
        return st(this.$2Pixel(e));
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
    return this.mode == "automatic" && e == "manual" ? (i.manual.zoom = 0, i.manual.max = this.#d.valueMax, i.manual.min = this.#d.valueMin, this.#s = e) : this.mode == "manual" && e == "automatic" && (i.manual.zoom = 0, this.#s = e), !0;
  }
  setOffset(e) {
    if (!E(e) || e == 0 || this.#s !== "manual")
      return !1;
    const i = this.#o;
    let s = this.pixel2$(e * -1), n = this.pixel2$(this.height - e), o = s - n;
    i.manual.min = n, i.manual.max = s, i.manual.mid = o / 2, i.manual.diff = o, i.manual.zoom = 0;
  }
  setZoom(e) {
    if (!E(e) || this.#s !== "manual")
      return !1;
    const i = this.#o;
    let s = i.manual.min, n = i.manual.max;
    const o = n - s, a = o * 0.01, l = e * a;
    s -= l, n += l, !(n < s || s <= 1 / 0 * -1 || n >= 1 / 0) && (i.manual.max = n, i.manual.min = s, i.manual.mid = o / 2, i.manual.diff = o, i.manual.zoom = l, this.calcGradations());
  }
  setRange(e) {
    this.#o.automatic.range = e, this.#d = new Proxy(e, {
      get: (i, s) => {
        const n = this.#s, o = this.#o;
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
    var p = Math.ceil(i / g) * g, v = Math.floor(e / g) * g;
    let C = this.height, P = (v - p) / g, D = this.height / P, H = this.countDigits(P), j;
    for (var O = p; O <= v; O += g)
      o = this.countDigits(O), j = this.niceValue(o, s, H), c.push([j, Wi(C), o]), C -= D;
    return c;
  }
  niceValue(e, i = !0, s) {
    if (e.integers) {
      let n = s.integers;
      if (n - 2 > 0) {
        let o = la(10, n - 2);
        return Math.floor(e.value / o) * o;
      } else
        return i ? (n = n > 0 ? n : n * -1, Wi(e.value, n)) : Math.floor(e.value);
    } else {
      let n = e.decimals - s.decimals;
      return n = n > 0 ? n : n * -1, Wi(e.value, n);
    }
  }
  limitPrecision(e) {
    let i = e.value, s = this.#a - e.total, n = 4 - e.integers;
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
  #r = {};
  #n;
  #i;
  #s;
  #o;
  #h;
  #l;
  #a;
  #c = !0;
  id;
  constructor(e, i = !1, s = !1, n, o, a = {}) {
    this.#e = o.core, this.#t = o, this.#r = o.core.config, this.#o = e, this.#h = e.scene, this.#l = e.hit, this.#n = n, this.#i = i, this.#s = s, this.#a = a;
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
    return this.#a;
  }
  get scene() {
    return this.#h;
  }
  get hit() {
    return this.#l;
  }
  get theme() {
    return this.#n;
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
    return this.#a.overlay;
  }
  set doDraw(e) {
    this.#c = Q(e) ? e : !1;
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
    return this.#i instanceof fi ? this.#i : this.core.Chart.time.xAxis instanceof fi ? this.core.Chart.time.xAxis : "time" in this.#t ? this.#t.time.xAxis : !1;
  }
  getYAxis() {
    return this.#s instanceof gi ? this.#s : this.chart.yAxis instanceof gi ? this.chart.yAxis : "scale" in this.#t ? this.#t.scale.yAxis : !1;
  }
  contextIs() {
    return !this.#i && !this.#s ? "chart" : this.#i instanceof fi ? "timeline" : this.#s instanceof gi ? "scale" : !1;
  }
}
class Ti extends V {
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
    if (i.save(), i.strokeStyle = this.core.theme.chart.GridColour || Tr.COLOUR_GRID, e != "y") {
      const n = this.xAxis.xAxisGrads.values;
      for (let o of n) {
        let a = st(o[1]);
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
class cs extends V {
  #t = [0, 0];
  #e = !0;
  #r;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.core.on("chart_pan", (l) => {
      this.onMouseDragX(l);
    }), this.core.on("chart_panDone", (l) => {
      this.onMouseDragX(l);
    }), this.core.on("main_mousemove", (l) => {
      this.onMouseMoveX(l);
    }), this.#r = new Pt(this.target.viewport.container, { disableContextMenu: !1 }), this.#r.on("pointermove", this.onMouseMove.bind(this)), this.#r.on("pointerenter", this.onMouseMove.bind(this));
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
const Il = [
  ["grid", { class: Ti, fixed: !0 }],
  ["cursor", { class: cs, fixed: !0 }]
];
class ue {
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
  constructor(e, i, s, n = !1) {
    this.#n = e, this.#t = e.core, this.#e = this.core.config, this.#r = this.core.theme, this.#o = this.#n.element, this.#l = i, this.createViewport(s, n);
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
    return this.#n.stateMachine;
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
  setSize(e, i, s) {
    const n = this.#s.list;
    this.#i.setSize(e, i);
    for (let [o, a] of n)
      a.layer.setSize(s, i);
  }
  createViewport(e = [], i = !1) {
    e = e.length == 0 ? rt(Il) : e;
    const { width: s, height: n } = this.layerConfig();
    let o = i ? $e.Node : $e.Viewport;
    this.#i = new o({
      width: s,
      height: n,
      container: this.#l
    }), this.#h = this.#i.scene.canvas, this.#s = new Al(this, e);
  }
  layerConfig() {
    const e = this.config?.buffer || Pi, i = this.#l.getBoundingClientRect().width, s = this.#l.getBoundingClientRect().height;
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
    if (!(s instanceof ft))
      return !1;
    for (let [n, o] of s)
      !T(o) || !B(o?.instance?.draw) || (o.instance.draw(), o.fixed || (o.instance.position = [this.#t.scrollPos, 0]));
  }
  render() {
    this.#i.render();
  }
}
class Ol extends V {
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
    const i = this.scene.context, s = this.xAxis.xAxisGrads.values, n = 0, o = this.theme.xAxis, a = Q(o.tickMarker) ? o.tickMarker : !0;
    i.save(), i.strokeStyle = o.colourTick, i.fillStyle = o.colourTick, i.font = `${o.fontWeight} ${o.fontSize}px ${o.fontFamily}`;
    for (let l of s) {
      let c = st(l[1]), g = Math.floor(i.measureText(`${l[0]}`).width * 0.5);
      i.fillText(l[0], c - g + n, this.xAxis.xAxisTicks + 12), a && (i.beginPath(), i.moveTo(c + n, 0), i.lineTo(c + n, this.xAxis.xAxisTicks), i.stroke());
    }
    i.restore();
  }
}
class kl extends V {
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
function Ar(r, e) {
  return Math.round(r.measureText(e).width);
}
function We(r = ut.fontSize, e = ut.fontWeight, i = ut.fontFamily) {
  return `${e} ${r}px ${i}`;
}
function Ai(r, e, i) {
  r.font = We(i?.fontSize, i?.fontWeight, i?.fontFamily);
  const s = Ar(r, e), n = i?.paddingLeft || 0, o = i?.paddingRight || 0, a = i?.borderWidth || 0;
  return n + o + s + a * 2;
}
function Ii(r) {
  const e = r?.paddingTop || 0, i = r?.paddingBottom || 0, s = r?.borderWidth || 0, n = r?.fontSize || 0;
  return e + i + n + s * 2;
}
function Ir(r, e, i, s) {
  r.fillStyle = s?.colour, r.font = We(s?.fontSize, s?.fontWeight, s?.fontFamily), r.textAlign = s?.textAlign || "start", r.textBaseline = s?.textBaseLine || "alphabetic", r.direction = s?.direction || "inherit", r.lineWidth = s?.width, r.strokeStyle = s?.border, s?.stroke ? r.strokeText(s?.text, e, i, s?.max) : r.fillText(s?.text, e, i, s?.max);
}
function fe(r, e, i, s, n) {
  r.save(), r.font = We(n?.fontSize, n?.fontWeight, n?.fontFamily), r.textBaseline = "top", r.fillStyle = n?.bakCol || ut.bakCol;
  let o = n?.width || Ai(r, e, n), a = n?.height || Ii(n);
  r.fillRect(i, s, o, a), r.fillStyle = n?.txtCol || ut.txtCol, i = i + n?.paddingLeft, s = s + n?.paddingTop, r.fillText(`${e}`, i, s), r.restore();
}
class Dl extends V {
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
    }, c = Ai(e, a, l), g = s + this.core.bufferPx;
    g = this.xAxis.xPosSnap2CandlePos(g), g = g - Math.round(c * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), e.save(), fe(e, a, g, 1, l), e.restore();
  }
}
const Rl = [
  ["labels", { class: Ol, fixed: !1, required: !0 }],
  ["overlay", { class: kl, fixed: !1, required: !0 }],
  ["cursor", { class: Dl, fixed: !1, required: !0 }]
];
class _l {
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
  #d = new ft();
  #f = [];
  #p;
  #x;
  #v;
  #E;
  #m;
  #w;
  #I;
  #g;
  #P;
  #b;
  #L;
  #T;
  #S;
  #M;
  #C = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #y = { end: !1, start: !1 };
  constructor(e, i) {
    this.#s = e, this.#n = i, this.#i = i.elements.elTime, this.#o = e.Chart, this.#h = new fi(this, this.#o), this.init();
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
    return this.#I;
  }
  get layerOverlays() {
    return this.#g;
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
    return this.#p;
  }
  get range() {
    return this.#s.range;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return I.elementDimPos(this.#i);
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
    this.#l = new Vt(e, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get time() {
    return this;
  }
  init() {
    const e = this.#i;
    this.#a = e.viewport, this.#c = e.overview, this.#x = e.overview.icons, this.#v = e.overview.scrollBar, this.#E = e.overview.handle, this.#m = e.overview.rwdStart, this.#w = e.overview.fwdEnd;
    const i = {
      core: this.#s,
      elContainer: this.#v,
      elHandle: this.#E,
      callback: null
    };
    this.#M = new Ps(i), this.#s.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(e) {
    this.#i.style.width = `${e}px`, this.#a.style.width = `${e}px`;
  }
  setDimensions(e) {
    const i = this.config.buffer || Pi, s = e.w, n = this.height, o = Math.round(s * ((100 + i) * 0.01));
    this.#u.setSize(s, n, o), this.draw();
  }
  navigationDisplay(e) {
    if (e)
      this.#w.style["margin-top"] = 0, this.#m.style["margin-top"] = 0;
    else {
      const i = this.core.theme.xAxis?.background ? this.core.theme.xAxis.Background : this.core.theme.chart.Background;
      this.#c.style.visibility = "hidden", this.#w.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#m.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#w.style.background = this.core.theme.chart.Background, this.#m.style.background = i;
    }
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#h.initXAxisGrads(), this.draw(), this.eventsListen(), ji.id = this.id, ji.context = this, this.stateMachine = ji, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#b.destroy(), this.#L.destroy(), this.#T.destroy(), this.off("main_mousemove", this.drawCursorTime), this.off("setRange", this.onSetRange), this.#w.removeEventListener("click", dt), this.#m.removeEventListener("click", dt), this.#u.destroy(), this.element.remove();
  }
  eventsListen() {
    this.#b = new Pt(this.#a, { disableContextMenu: !1 }), this.#b.on("dblclick", this.onDoubleClick.bind(this)), this.#b.on("pointerover", this.onPointerEnter.bind(this)), this.#b.on("pointerout", this.onPointerLeave.bind(this)), this.#b.on("pointerdrag", this.onPointerDrag.bind(this)), this.#L = new Pt(this.#w, { disableContextMenu: !1 }), this.#L.on("pointerover", () => this.showJump(this.#y.end)), this.#L.on("pointerleave", () => this.hideJump(this.#y.end)), this.#T = new Pt(this.#m, { disableContextMenu: !1 }), this.#T.on("pointerover", () => this.showJump(this.#y.start)), this.#T.on("pointerleave", () => this.hideJump(this.#y.start)), this.on("main_mousemove", this.#P.draw, this.#P), this.on("setRange", this.onSetRange, this), this.#w.addEventListener("click", dt(this.onMouseClick, 1e3, this, !0)), this.#m.addEventListener("click", dt(this.onMouseClick, 1e3, this, !0));
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
    this.#s.theme?.time?.navigation === !1 && !(this.#y.end && this.#y.start) && (this.#c.style.visibility = "hidden");
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
    let s = this.#v.getBoundingClientRect().width, n = e.dataLength + e.limitFuture + e.limitPast, o = s / n, a = e.Length * o, l = (i + e.limitPast) * o;
    this.#M.setHandleDims(l, a);
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
    let e = rt(Rl);
    this.#u = new ue(this, this.#a, e, !1), this.#P = this.graph.overlays.get("cursor").instance, this.#I = this.graph.overlays.get("labels").instance, this.#g = this.graph.overlays.get("overlay").instance, this.graph.addOverlays(this.#f);
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
const Nl = {
  renderQ: new ft(),
  rendered: [],
  renderLog: !1,
  dropFrames: !0,
  graphs: [],
  range: {},
  init: function(r) {
    T(r) && (this.renderLog = r?.renderLog || !1, this.dropFrames = r?.dropFrames || !0, this.graphs = M(r?.graphs) ? [...r.graphs] : [], this.range = T(r?.range) ? r.range : {});
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
        B(i.draw) && i.draw(e.range, e.update);
      for (let i of e.graphs)
        B(i.render) && i.render();
      this.frameDone();
    }
  }
}, oi = Nl, Gn = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select"
];
class $l {
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
  constructor(e, i) {
    this.#t = e, this.#e = i, this.#r = i.core, this.#n = i.core.theme.legend, this.init(), this.eventsListen();
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
    this.#s = e.querySelector(".controls"), this.#o = e.querySelectorAll(".control"), this.#c = e.querySelector("#showLegends"), this.#u = e.querySelector("#hideLegends"), this.#s.style.display = "none", this.icons(this.#o, { id: "collapse", parent: this }), this.#t.legends.classList.add("hide"), this.#d = "hide", this.collapse = "show";
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
    for (let e of Gn)
      this.#t.style.setProperty(e, "none");
  }
  primaryPanePanDone() {
    for (let e of Gn)
      this.#t.style.removeProperty(e);
  }
  add(e) {
    if (!T(e) || !("title" in e))
      return !1;
    const i = () => {
      this.#r.error("ERROR: Legend parent missing!");
    };
    e.id = e?.id || it("legend"), e.type = e?.type || "overlay", e.parent = e?.parent || i;
    const s = this.elTarget.buildLegend(e, this.#r.theme);
    this.#t.legends.insertAdjacentHTML("beforeend", s);
    const n = this.#t.legends.querySelector(`#legend_${e.id}`);
    return this.#l = n.querySelectorAll(".control"), this.#a[e.id] = {
      el: n,
      type: e.type,
      source: e?.source,
      click: []
    }, this.icons(this.#l, e), e.type == "indicator" && (this.#s.style.display = "block", !e.parent.primaryPane && Object.keys(this.#a).length < 3 && (this.#s.style.display = "none")), e.id;
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
      o.style.width = `${this.#n.controlsW}px`, o.style.height = `${this.#n.controlsH}px`, o.style.fill = `${this.#n.controlsColour}`, o.onpointerover = (a) => a.currentTarget.style.fill = this.#n.controlsOver, o.onpointerout = (a) => a.currentTarget.style.fill = this.#n.controlsColour, s = i.parent.onLegendAction.bind(i.parent), i.id === "collapse" ? this.#h.push({ el: n, click: s }) : this.#a[i.id].click.push({ el: n, click: s }), n.addEventListener("click", s);
    }
  }
}
const Zi = {
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
}, Hl = {
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
class Bl extends V {
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
    this.scene.clear(), c.save(), c.fillStyle = o.bakCol, c.fillRect(1, l, this.width, a), fe(c, `${n}`, 1, l, o), c.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
class Ul extends V {
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context, i = this.yAxis, s = this.yAxis.calcGradations() || [], n = this.theme.yAxis, o = Q(n.tickMarker) ? n.tickMarker : !0;
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
class zl extends V {
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
class Wl extends V {
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (e === void 0)
      return;
    const i = this.scene.context, s = this.core.stream instanceof ne && this.config.stream.tfCountDown;
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
    }, l = 0, c = Ii(a), g = this.parent.yPos(n) - c * 0.5;
    this.scene.clear(), i.save(), e[4] >= e[1] ? a.bakCol = this.theme.candle.UpBodyColour : a.bakCol = this.theme.candle.DnBodyColour, fe(i, o, l, g, a), s && (o = this.core.stream.countDownUpdate(), a.fontSize = a?.fontSize / 1.1, fe(i, o, l, g + c, a)), i.restore(), this.viewport.render();
  }
}
const Fl = [
  ["labels", { class: Ul, fixed: !0, required: !0 }],
  ["overlay", { class: zl, fixed: !0, required: !0 }],
  ["price", { class: Wl, fixed: !0, required: !0 }],
  ["cursor", { class: Bl, fixed: !0, required: !0 }]
];
class Vl {
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
  #p;
  #x;
  #v = new ft();
  #E = [];
  #m;
  #w;
  #I;
  #g;
  #P = {};
  constructor(e, i) {
    this.#n = e, this.#i = { ...i }, this.#c = this.#i.elScale, this.#h = this.#i.chart, this.#s = this.#i.parent, this.id = `${this.#s.id}_scale`, this.init();
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
  get core() {
    return this.#n;
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
    return this.#x;
  }
  get layerLabels() {
    return this.#d;
  }
  get layerOverlays() {
    return this.#f;
  }
  get layerPriceLine() {
    return this.#p;
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
    this.#m = e;
  }
  get graph() {
    return this.#m;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return I.elementDimPos(this.#c);
  }
  get theme() {
    return this.#n.theme;
  }
  get config() {
    return this.#n.config;
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
    this.#o = new Vt(e, this);
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
    const e = this.#s.name == "Chart" ? void 0 : this.#s.localRange;
    this.#a = new gi(this, this, this.options.yAxisType, e), this.createGraph(), this.#a.calcGradations(), this.draw(), this.eventsListen();
    const i = rt(Hl);
    i.id = this.id, i.context = this, this.stateMachine = i, this.stateMachine.start();
  }
  restart() {
    this.#a.setRange(this.#n.range), this.draw();
  }
  destroy() {
    this.stateMachine.destroy(), this.#m.destroy(), this.#w.destroy(), this.off(`${this.#s.id}_mousemove`, this.onMouseMove), this.off(`${this.#s.id}_mouseout`, this.#x.erase), this.off(Mt, this.onStreamUpdate), this.element.remove();
  }
  eventsListen() {
    let e = this.#m.viewport.scene.canvas;
    this.#w = new Pt(e, { disableContextMenu: !1 }), this.#w.setCursor("ns-resize"), this.#w.on("pointerdrag", this.onDrag.bind(this)), this.#w.on("pointerdragend", this.onDragDone.bind(this)), this.#w.on("wheel", this.onMouseWheel.bind(this)), this.#w.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.#s.id}_mousemove`, this.onMouseMove, this), this.on(`${this.#s.id}_mouseout`, this.#x.erase, this.#x), this.on(Mt, this.#p.draw, this.#p);
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
    this.#g = M(e) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)], this.#x.draw(this.#g);
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
    this.#a.mode === "manual" && (this.#a.offset = e.domEvent.srcEvent.movementY, this.parent.draw(this.range, !0), this.draw());
  }
  setHeight(e) {
    this.#c.style.height = `${e}px`;
  }
  setDimensions(e) {
    const i = this.#c.getBoundingClientRect().width;
    this.setHeight(e.h), this.graph instanceof ue && (this.#m.setSize(i, e.h, i), this.draw());
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
    let e = rt(Fl);
    this.graph = new ue(this, this.#u, e, !1), this.#x = this.graph.overlays.get("cursor").instance, this.#d = this.graph.overlays.get("labels").instance, this.#f = this.graph.overlays.get("overlay").instance, this.#p = this.graph.overlays.get("price").instance, this.graph.addOverlays(this.#E), this.#p.target.moveTop(), this.#x.target.moveTop();
  }
  addOverlays(e) {
    if (!M(e))
      return !1;
    this.graph === void 0 ? this.#E.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!T(i))
      return !1;
    if (this.graph === void 0)
      this.#E.push([e, i]);
    else {
      let s = this.graph.addOverlay(e, i);
      return this.#p.target.moveTop(), this.#x.target.moveTop(), s;
    }
  }
  render() {
    this.#m.render();
  }
  draw(e = this.range, i = !0) {
    this.#m.draw(e, i), this.#s.drawGrid();
  }
  resize(e = this.width, i = this.height) {
    this.setDimensions({ w: e, h: i });
  }
}
class Gl {
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
class Yl extends V {
  #t;
  #e;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#t = new Gl(e.scene, n), this.theme.volume.Height = $(n?.volume?.Height, 0, 100) || 100;
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
    let c = this.core.rangeScrollOffset, g = e.indexStart - c, p = e.Length + c * 2, v = p, C = g, P, D = 0;
    for (; v--; )
      P = e.value(C), P[4] !== null && (D = P[5] > D ? P[5] : D), C++;
    for (; p--; )
      P = e.value(g), a.x = st(this.xAxis.xPos(P[0]) - o / 2), P[4] !== null && (a.h = l - l * ((D - P[5]) / D), a.raw = i[g], this.#t.draw(a)), g++;
  }
}
class Or {
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
    let l = Math.max(Math.floor(a * 0.5), 1), c = Math.abs(e.o - e.c), g = e.c === e.o ? 1 : 2, p = e.x, v = Math.floor(p) - 0.5;
    if (i.save(), i.strokeStyle = o, i.beginPath(), i.moveTo(v, Math.floor(e.h)), this.cfg.candle.Type === X.OHLC ? i.lineTo(v, Math.floor(e.l)) : s ? (i.lineTo(v, Math.floor(e.c)), i.moveTo(v, Math.floor(e.o))) : (i.lineTo(v, Math.floor(e.o)), i.moveTo(v, Math.floor(e.c))), i.lineTo(v, Math.floor(e.l)), i.stroke(), a == 3) {
      i.fillStyle = o;
      let C = s ? 1 : -1;
      i.rect(
        Math.floor(p - l),
        e.c,
        Math.floor(l * 2),
        C * Math.max(c, g)
      ), i.fill(), i.stroke();
    } else if (a > 3 && this.fill) {
      i.fillStyle = n;
      let C = s ? 1 : -1;
      i.rect(
        Math.floor(p - l),
        e.c,
        Math.floor(l * 2),
        C * Math.max(c, g)
      ), i.fill(), i.stroke();
    } else if (a > 3 && !this.fill && this.cfg.candle.Type !== X.OHLC) {
      let C = s ? 1 : -1;
      i.rect(
        Math.floor(p - l),
        e.c,
        Math.floor(l * 2),
        C * Math.max(c, g)
      ), i.stroke();
    } else
      this.cfg.candle.Type === X.OHLC ? (i.beginPath(), i.moveTo(v - l, e.o), i.lineTo(v, e.o), i.moveTo(v, e.c), i.lineTo(v + l, e.c), i.stroke()) : (i.strokeStyle = o, i.beginPath(), i.moveTo(
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
    let o = [e[0].x, e[0].h];
    i.save(), i.strokeStyle = s.AreaLineColour || s.UpBodyColour || s.DnBodyColour, i.lineWidth = 1, i.beginPath(), i.moveTo(e[0].x, e[0].h);
    let a = 0;
    for (; a < e.length; )
      i.lineTo(e[a].x, e[a].h), a++;
    if (s?.Type == "area") {
      if (n = i.createLinearGradient(0, 0, 0, this.scene.height), M(s.AreaFillColour))
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
class kr extends V {
  #t;
  constructor(e, i = !1, s = !1, n, o) {
    super(e, i, s, n, o), this.#t = new Or(e.scene, n);
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
function Dr(r, e, i, s, n, o) {
  r.lineWidth = o?.width || ut.borderWidth, r.strokeStyle = o?.border || ut.stroke, r.beginPath(), r.rect(e, i, s, n), r.stroke();
}
function Ls(r, e, i, s, n, o) {
  r.fillStyle = o?.fill || ut.fill, r.fillRect(e, i, s, n);
}
function ql(r, e, i, s, n, o) {
  S(o.fill) && Ls(r, e, i, s, n, o), E(o.width) && o.width > 0 && Dr(r, e, i, s, n, o);
}
function Rr(r, e, i, s, n, o, a) {
  r.lineWidth = a?.width || ut.borderWidth, r.strokeStyle = a?.border || ut.stroke, Nr(r, e, i, s, n, o), r.stroke();
}
function _r(r, e, i, s, n, o, a) {
  r.fillStyle = a?.fill || ut.fill, Nr(r, e, i, s, n, o), r.fill();
}
function Nr(r, e, i, s, n, o) {
  r.beginPath(), r.moveTo(e + o, i), r.arcTo(e + s, i, e + s, i + n, o), r.arcTo(e + s, i + n, e, i + n, o), r.arcTo(e, i + n, e, i, o), r.arcTo(e, i, e + s, i, o), r.closePath();
}
function Xl(r, e, i, s, n, o, a) {
  S(a.fill) && _r(r, e, i, s, n, o, a?.fill), E(a.width) && a.width > 0 && Rr(r, e, i, s, n, o, a?.border, a?.width);
}
function $r(r, e, i, s, n, o, a) {
  if (!(n < 3)) {
    var l = Math.PI * 2 / n;
    r.beginPath(), r.translate(e, i), r.rotate(o * Math.PI / 180), r.moveTo(s, 0);
    for (var c = 1; c < n; c++)
      r.lineTo(s * Math.cos(l * c), s * Math.sin(l * c));
    r.closePath(), ge(r, a?.fill, a?.stroke, a?.width);
  }
}
function jl(r, e, i) {
  if (e.length > 0) {
    r.beginPath();
    var s = e[0];
    r.moveTo(s.x, s.y);
    for (var n = 1; n < e.length; ++n)
      s = e[n], r.lineTo(s.x, s.y);
    r.closePath(), ge(r, i?.fill, i?.stroke, i?.width);
  }
}
function Zl(r, e, i, s, n) {
  $r(r, e, i, s, 3, n?.rotate || 0, n), ge(r, n?.fill, n?.stroke, n?.width);
}
function Kl(r, e, i, s, n, o) {
  r.beginPath(), r.moveTo(e - s / 2, i), r.lineTo(e, i - n / 2), r.lineTo(e + s / 2, i), r.lineTo(e, i + n / 2), r.closePath(), ge(r, o?.fill, o?.stroke, o?.width);
}
function Ql(r, e, i, s, n) {
  r.beginPath(), r.arc(e, i, s, 0, Math.PI * 2), r.closePath(), fillStroke(r, n?.fill, n?.stroke, n?.width);
}
function Jl(r) {
  return r.ownerDocument && r.ownerDocument.defaultView && r.ownerDocument.defaultView.devicePixelRatio || 2;
}
function ge(r, e, i, s) {
  S(e) && (r.fillStyle = e, r.fill()), E(s) && s > 0 && (r.lineWidth = s, r.strokeStyle = i || ut.stroke, r.stroke());
}
function Hr(r, e, i, s, n, o, a, l, c, g) {
  r.drawImage(e, i, s, n, o, a, l, c, g);
}
function Br(r, e) {
  let i = r.naturalWidth || r.width, s = r.naturalHeight || r.height;
  return e === void 0 && (e = Ur(i, s)), e.ctx.drawImage(r, 0, 0), e;
}
const tc = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};
function Me(r, e) {
  const i = Br(e), s = i.ctx;
  return s.fillStyle = tc[r], s.globalCompositeOperation = "multiply", s.fillRect(0, 0, s.canvas.width, s.canvas.height), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), s.globalCompositeOperation = "source-over", i;
}
function ec(r) {
  return {
    red: Me("red", r),
    green: Me("green", r),
    blue: Me("blue", r),
    alpha: Me("alpha", r)
  };
}
function Ur(r, e) {
  const i = document.createElement("canvas");
  return i.ctx = i.getContext("2d"), i.width = r || i.ctx.canvas.width, i.height = e || i.ctx.canvas.height, i;
}
const tt = {
  createCanvas: Ur,
  imageToCanvs: Br,
  seperateRGB: ec,
  getChannel: Me,
  getPixelRatio: Jl,
  fillStroke: ge,
  calcTextWidth: Ar,
  createFont: We,
  getTextRectHeight: Ii,
  getTextRectWidth: Ai,
  renderImage: Hr,
  renderText: Ir,
  renderTextBG: fe,
  renderPath: me,
  renderPathStroke: ic,
  renderPathClosed: sc,
  renderSpline: nc,
  renderLine: oc,
  renderLineHorizontal: He,
  renderLineVertical: rc,
  renderCircle: Ql,
  renderRect: ql,
  renderRectFill: Ls,
  renderRectStroke: Dr,
  renderRectRound: Xl,
  renderRectRoundFill: _r,
  renderRectRoundStroke: Rr,
  renderPolygonRegular: $r,
  renderPolygonIrregular: jl,
  renderDiamond: Kl,
  renderTriangle: Zl
};
function me(r, e, i, s) {
  r.save();
  const n = i.width || 1;
  r.lineWidth = n, n % 2 && r.translate(0.5, 0.5), r.strokeStyle = i.stroke, M(i.dash) && r.setLineDash(i.dash), r.beginPath();
  let o = !0;
  e.forEach((a) => {
    a && a.x !== null && (o ? (r.moveTo(a.x, a.y), o = !1) : r.lineTo(a.x, a.y));
  }), s(), r.restore();
}
function ic(r, e, i) {
  me(r, e, i, () => {
    r.stroke();
  });
}
function sc(r, e, i) {
  me(r, e, i, () => {
    r.closePath();
  }), ge(r, opts?.fill, opts?.stroke, opts?.size);
}
function nc(r, e, i) {
  r.beginPath(), r.moveTo(e[0].x, e[0].y);
  for (var s = i ?? 1, n = 0; n < e.length - 1; n++) {
    var o = n > 0 ? e[n - 1] : e[0], a = e[n], l = e[n + 1], c = n != e.length - 2 ? e[n + 2] : l, g = a.x + (l.x - o.x) / 6 * s, p = a.y + (l.y - o.y) / 6 * s, v = l.x - (c.x - a.x) / 6 * s, C = l.y - (c.y - a.y) / 6 * s;
    r.bezierCurveTo(g, p, v, C, l.x, l.y);
  }
  r.stroke();
}
function He(r, e, i, s, n) {
  me(r, [{ x: i, y: e }, { x: s, y: e }], n, () => {
    r.stroke(), r.closePath();
  });
}
function rc(r, e, i, s, n) {
  coords = [{ x: e, y: i }, { x: e, y, bottom: s }], me(r, coords, n, () => {
    r.stroke(), r.closePath();
  });
}
function oc(r, e, i) {
  me(r, e, i, () => {
    r.stroke(), r.closePath();
  });
}
class ac extends V {
  #t;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#t = new Or(e.scene, n), this.theme.priceLineStyle = this.theme?.priceLineStyle || yl;
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
    o.o = this.yAxis.yPos(i[1]), o.h = this.yAxis.yPos(i[2]), o.l = this.yAxis.yPos(i[3]), o.c = this.yAxis.yPos(i[4]), o.raw = i, e.inRenderRange(i[0]) && s(o), i[4] >= i[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, He(
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
      if (c = o.createLinearGradient(0, 0, 0, this.scene.height), M(a.candle.AreaFillColour))
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
const Pe = {
  colour: "#4444cc88",
  wdith: 1,
  dash: [1, 0]
};
class hc extends V {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const l = { class: lc, fixed: !0, required: !1 };
    this.core.config?.highLow === !0 && (this.scaleOverly = this.chart.scale.addOverlay("hiLo", l));
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw(e = this.core.range) {
    if (this.core.config?.highLow !== !0)
      return;
    this.scene.clear();
    let i, s, n, o = this.scene.width, a = 35, l = {};
    const c = e.valueHi, g = e.valueLo, p = { ...this.theme.yAxis }, v = this.scene.context;
    p.colourCursorBG = this.theme?.hilo?.colour || Pe.colour, v.save(), v.strokeStyle = this.theme?.highLow?.colour || Pe.colour, v.strokeWidth = this.theme?.highLow?.width || Pe.width, v.setLineDash(this.theme?.highLow?.dash || Pe.dash), n = this.yAxis.yPos(c), He(v, n, 0, o, l), i = "High", s = this.theme.yAxis.location == "left" ? 0 : o - (a + 25), Ei(v, i, s, n, a, p), n = this.yAxis.yPos(g), He(v, n, 0, o, l), i = "Low", Ei(v, i, s, n, a, p), v.restore();
  }
}
class lc extends V {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw(e = this.core.range) {
    this.scene.clear();
    let i, s, n, o;
    const a = e.valueHi, l = e.valueLo, c = { ...this.theme.yAxis }, g = this.scene.context;
    c.colourCursorBG = this.theme?.hilo?.colour || Pe.colour, i = this.chart.Scale.nicePrice(a), s = 1, n = this.yAxis.yPos(a) + 1, o = this.viewport.width, Ei(g, i, s, n, o, c), i = this.chart.Scale.nicePrice(l), n = this.yAxis.yPos(l) + 1, Ei(g, i, s, n, o, c);
  }
}
function Ei(r, e, i, s, n, o) {
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
  }, l = a.fontSize + a.paddingTop + a.paddingBottom, c = s - l * 0.5;
  r.save(), r.fillStyle = a.bakCol, r.fillRect(i, c, n, l), fe(r, `${e}`, i, c, a), r.restore();
}
class cc {
  data;
  icon;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.events, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.icon = I.svgToImage(this.cfg.iconEvent, this.cfg.iconColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.icon, s = this.cfg, n = this.hit.getIndexValue(e.key), o = I.svgToImage(s.iconEvent, n, this.dims), a = $(e.w, s.iconMinDim, s.iconHeight), l = $(e.w, s.iconMinDim, s.iconWidth), c = this.data.x, g = this.data.y, p = this.ctx, v = this.ctxH;
    return p.save(), p.drawImage(i, c, g, l, a), p.restore(), v.save(), v.drawImage(o, c, g, l, a), v.restore(), { x: c, y: g, w: l, h: a, k: n };
  }
}
const dc = {
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
class uc extends V {
  #t;
  #e = [];
  #r;
  #n = (e) => dt(this.isNewsEventSelected, 100, this);
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#t = new cc(e, n), this.emit(), this.core.on("primary_pointerdown", dt(this.isNewsEventSelected, 200, this), this), this.#r = this.core.WidgetsG.insert("Dialogue", dc), this.#r.start();
  }
  destroy() {
    this.core.off("primary_pointerdown", this.#n);
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
    const i = e[0], s = e[1], n = this.theme.events, o = $(this.xAxis.candleW, n.iconMinDim, n.iconHeight), a = this.xAxis.pixel2T(i), l = this.hit.getIntersection(i, s);
    if (l == -1)
      return;
    let c = Object.keys(this.data)[l] * 1, g = this.xAxis.xPos(a), p = this.scene.height - $(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, v = "";
    for (let P of this.data[c])
      v += this.buildNewsEventHTML(P);
    const C = {
      dimensions: { h: 150, w: 150 },
      position: { x: g + o / 2 + 1, y: p, relativeY: "bottom" },
      content: v
    };
    this.core.emit("event_selected", c), this.#r.open(C);
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
    let n = this.theme.events, o = this.core.rangeScrollOffset, a = e.indexStart - o, l = e.Length + o * 2, c, g, p;
    for (; l; ) {
      if (c = e.value(a), g = `${c[0]}`, p = Object.keys(this.data).indexOf(g), p >= 0)
        for (let v of this.data[g])
          s.x = this.xAxis.xPos(c[0]) - this.xAxis.candleW / 2, s.y = this.scene.height - $(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.key = p, this.#e.push(this.#t.draw(s));
      a++, l--;
    }
  }
}
class fc {
  data;
  buy;
  sell;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.trades, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.buy = I.svgToImage(this.cfg.iconBuy, this.cfg.buyColour, this.dims), this.sell = I.svgToImage(this.cfg.iconSell, this.cfg.sellColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.cfg, s = e.side === "buy" ? this.buy : this.sell, n = e.side === "buy" ? i.iconBuy : i.iconSell, o = this.hit.getIndexValue(e.key), a = I.svgToImage(n, o, this.dims), l = $(e.w, i.iconMinDim, i.iconHeight), c = $(e.w, i.iconMinDim, i.iconWidth), g = this.data.x, p = this.data.y, v = this.ctx, C = this.ctxH;
    return v.save(), v.drawImage(s, g, p, c, l), v.restore(), C.save(), C.drawImage(a, g, p, c, l), C.restore(), { x: g, y: p, w: c, h: l, k: o };
  }
}
const gc = {
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
class mc extends V {
  #t;
  #e = [];
  #r;
  #n;
  #i = (e) => dt(this.isTradeSelected, 100, this);
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#t = new fc(e, n), this.emit(), this.core.on("primary_pointerdown", dt(this.isTradeSelected, 200, this), this), this.#n = this.core.WidgetsG.insert("Dialogue", gc), this.#n.start();
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
    const i = e[0], s = e[1], n = this.theme.trades, o = $(this.xAxis.candleW, n.iconMinDim, n.iconHeight), a = this.xAxis.pixel2T(i), l = this.core.range.valueByTS(a), c = this.hit.getIntersection(i, s);
    if (c == -1)
      return;
    let g = Object.keys(this.data)[c] * 1, p = this.xAxis.xPos(g), v = this.yAxis.yPos(l[2]) - o * 1.5, C = "";
    for (let D of this.data[g])
      C += this.buildTradeHTML(D);
    const P = {
      dimensions: { h: 150, w: 150 },
      position: { x: p + o / 2 + 1, y: v },
      content: C
    };
    this.core.emit("trade_selected", g), this.#n.open(P);
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
    let n = this.theme.trades, o = this.core.rangeScrollOffset, a = e.indexStart - o, l = e.Length + o * 2, c, g, p;
    for (; l; ) {
      if (c = e.value(a), g = `${c[0]}`, p = Object.keys(this.data).indexOf(g), p >= 0)
        for (let v of this.data[g])
          s.x = this.xAxis.xPos(c[0]) - this.xAxis.candleW / 2, s.y = this.yAxis.yPos(c[2]) - $(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.side = v.side, s.key = p, this.#e.push(this.#t.draw(s));
      a++, l--;
    }
  }
}
class pc extends V {
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
    l.font = We(o?.fontSize, o?.fontWeight, o?.fontFamily), l.textBaseline = "top", l.fillStyle = o.txtCol;
    const c = Ii(o), g = Ai(l, a, o), p = (this.scene.width - g) / 2, v = (this.scene.height - c) / 2;
    l.fillText(a, p, v);
  }
  renderImage(e) {
    if (!e)
      return;
    const i = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT, s = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH, n = (this.scene.width - s) / 2, o = (this.scene.height - i) / 2;
    this.scene.clear();
    const a = this.scene.context;
    a.save(), Hr(a, e, n, o, i, s), a.restore();
  }
}
const vc = {
  primaryPane: [
    ["watermark", { class: pc, fixed: !0, required: !0, params: { content: null } }],
    ["grid", { class: Ti, fixed: !0, required: !0, params: { axes: "y" } }],
    ["volume", { class: Yl, fixed: !1, required: !0, params: { maxVolumeH: ci.ONCHART_VOLUME_HEIGHT } }],
    ["candles", { class: kr, fixed: !1, required: !0 }],
    ["hiLo", { class: hc, fixed: !0, required: !1 }],
    ["stream", { class: ac, fixed: !1, required: !0 }],
    ["cursor", { class: cs, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: Ti, fixed: !0, required: !0, params: { axes: "y" } }],
    ["cursor", { class: cs, fixed: !0, required: !0 }]
  ]
}, Yn = {
  primaryPane: {
    trades: { class: mc, fixed: !1, required: !1 },
    events: { class: uc, fixed: !1, required: !1 }
  },
  secondaryPane: {
    candles: { class: kr, fixed: !1, required: !0 }
  }
}, mt = {
  id: "chart",
  title: "",
  type: "chart",
  source: () => {
  }
};
class Be {
  static #t = 0;
  static get cnt() {
    return Be.#t++;
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
  #p;
  #x;
  #v;
  #E;
  #m;
  #w;
  #I;
  #g;
  #P;
  #b = new ft();
  #L = new ft();
  #T = [0, 0];
  #S = !1;
  #M;
  #C;
  #y;
  #R = {
    valueMax: 100,
    valueMin: 0,
    valueDiff: 100
  };
  #k = {};
  constructor(e, i) {
    if (this.#s = e, this.#a = Be.cnt, !T(i))
      return;
    this.#o = { ...i }, this.#r = this.#o.name, this.#n = this.#o.shortName, this.#i = this.#o.title, this.#c = this.#o.type == "primary" ? "primaryPane" : "secondaryPane", this.#g = this.#o.view, this.#f = this.#o.elements.elScale, this.#h = this.#o.parent, this.#d = this.#o.elements.elTarget, this.#d.id = this.id, this.legend = new $l(this.elLegend, this), this.isPrimary ? (mt.type = "chart", mt.title = this.title, mt.parent = this, mt.source = this.legendInputs.bind(this), this.legend.add(mt), this.yAxisType = "default") : (mt.type = "secondary", mt.title = "", mt.parent = this, mt.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(mt), this.yAxisType = this.core.indicatorClasses[i.view[0].type].ind.scale);
    const s = { ...i };
    s.parent = this, s.chart = this, s.elScale = this.elScale, s.yAxisType = this.yAxisType, this.scale = new Vl(this.core, s), this.#u = "init", this.log(`${this.name} instantiated`);
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
    return this.#e ? `${this.#e}` : `${this.#s.id}-${this.#r}_${this.#a}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#r;
  }
  get shortName() {
    return this.#n;
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
    return this.#s.range;
  }
  get localRange() {
    return this.#R;
  }
  get stream() {
    return this.#w;
  }
  get streamCandle() {
    return this.#I;
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
  set cursorActive(e) {
    this.#S = e;
  }
  get cursorActive() {
    return this.#S;
  }
  get cursorClick() {
    return this.#M;
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
    return this.#f;
  }
  get elLegend() {
    return this.#d.legend;
  }
  get elViewport() {
    return this.#d.viewport;
  }
  set layerWidth(e) {
    this.#v.layerWidth = e;
  }
  get layerWidth() {
    return this.#v.layerWidth;
  }
  set legend(e) {
    this.#E = e;
  }
  get legend() {
    return this.#E;
  }
  set time(e) {
    this.#x = e;
  }
  get time() {
    return this.#x;
  }
  set scale(e) {
    this.#p = e;
  }
  get scale() {
    return this.#p;
  }
  set yAxisType(e) {
    this.setYAxisType(e);
  }
  get yAxisType() {
    return this.#y;
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
    return this.#g;
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
    return this.#L;
  }
  get overlaysDefault() {
    return vc[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#k;
  }
  set stateMachine(e) {
    this.#l = new Vt(e, this);
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
    this.#x = this.#s.Timeline, this.createGraph(), this.#p.start(), this.draw(this.range), this.cursor = "crosshair", Zi.id = this.id, Zi.context = this, this.stateMachine = Zi, this.stateMachine.start(), this.eventsListen();
    const e = { chartPane: this };
    this.#m = this.core.WidgetsG.insert("Divider", e), this.#m.start(), this.#u = "running";
  }
  destroy() {
    if (this.#u !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.stateMachine.destroy(), this.Divider.destroy(), this.#p.destroy(), this.#v.destroy(), this.#C.destroy(), this.legend.destroy(), this.off("main_mousemove", this.onMouseMove), this.off(Ie, this.onStreamListening), this.off(_e, this.onStreamNewValue), this.off(Mt, this.onStreamUpdate), this.off(Re, this.onStreamNewValue), this.off(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.off("chart_yAxisRedraw", this.onYAxisRedraw), this.element.remove(), this.#u = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting chart pane: ${this.id}`), this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#C = new Pt(this.#d, { disableContextMenu: !1 }), this.#C.on("pointerdrag", this.onChartDrag.bind(this)), this.#C.on("pointerdragend", this.onChartDragDone.bind(this)), this.#C.on("pointermove", this.onMouseMove.bind(this)), this.#C.on("pointerenter", this.onMouseEnter.bind(this)), this.#C.on("pointerout", this.onMouseOut.bind(this)), this.#C.on("pointerdown", this.onMouseDown.bind(this)), this.#C.on("pointerup", this.onMouseUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on(Ie, this.onStreamListening, this), this.on(_e, this.onStreamNewValue, this), this.on(Mt, this.onStreamUpdate, this), this.on(Re, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
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
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#T = [Math.round(e.position.x), Math.round(e.position.y)], this.#p.onMouseMove(this.#T), this.emit(`${this.id}_mousemove`, this.#T);
  }
  onMouseEnter(e) {
    this.core.MainPane.onPointerActive(this), this.#T = [Math.round(e.position.x), Math.round(e.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_mouseenter`, this.#T);
  }
  onMouseOut(e) {
    this.#S = !1, this.#T = [Math.round(e.position.x), Math.round(e.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_mouseout`, this.#T);
  }
  onMouseDown(e) {
    this.#s.pointerButtons[e.domEvent.srcEvent.button] = !0, this.#M = [Math.floor(e.position.x), Math.floor(e.position.y)], this.stateMachine.state === "tool_activated" ? this.emit("tool_targetSelected", { target: this, position: e }) : this.isPrimary && this.emit("primary_pointerdown", this.#M);
  }
  onMouseUp(e) {
    this.#s.pointerButtons[e.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(e) {
    this.#w !== e && (this.#w = e);
  }
  onStreamNewValue(e) {
    this.draw(this.range, !0);
  }
  onStreamUpdate(e) {
    this.isPrimary ? (this.#I = e, this.chartStreamCandle.draw(), this.layerStream.setPosition(this.core.stream.lastScrollPos, 0), this.updateLegends(this.cursorPos, e)) : this.updateLegends(), this.graph.render();
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
    E(e) || (e = this.height || this.#h.height), this.#d.style.height = `${e}px`, this.#f.style.height = `${e}px`, this.elViewport.style.height = `${e}px`, this.#p.setDimensions({ w: null, h: e });
  }
  setDimensions(e) {
    const i = this.config.buffer || Pi;
    let { w: s, h: n } = e;
    s = this.width, n = n || this.height, this.setHeight(n), this.graph instanceof ue && (this.layerWidth = Math.round(s * ((100 + i) * 0.01)), this.graph.setSize(s, n, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.draw(void 0, !0), this.Divider.setPos());
  }
  setYAxisType(e) {
    if (!S(e) || !ie.includes(e) || this.type == "primaryPane" && e == "percent")
      return !1;
    this.#y = e;
  }
  addOverlays(e) {
    if (!M(e) || e.length < 1)
      return !1;
    const i = [];
    for (let s of e) {
      const n = { fixed: !1, required: !1 };
      if (s.type in this.core.indicatorClasses)
        n.cnt = this.core.indicatorClasses[s.type].ind.cnt, n.id = `${this.id}-${s.type}_${n.cnt}`, n.class = this.core.indicatorClasses[s.type].ind;
      else if (s.type in Yn[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = Yn[this.type][s.type].class;
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
    this.#k[e] = !0, this.indicators[e].instance.destroy(), this.graph.removeOverlay(e), this.draw(), Object.keys(this.indicators).length === 0 && !this.isPrimary && this.emit("destroyChartView", this.id), delete this.#k[e];
  }
  indicatorVisible(e, i) {
    return !S(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.visible(i);
  }
  indicatorSettings(e, i) {
    return !S(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.settings(i);
  }
  addTool(e) {
    let { layerConfig: i } = this.layerConfig(), s = new $e.Layer(i);
    this.#b.set(e.id, s), this.#P.addLayer(s), e.layerTool = s, this.#L.set(e.id, e);
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
    this.layerGrid.setPosition(this.#s.scrollPos, 0), this.overlayGrid.draw("y"), this.#v.render();
  }
  refresh() {
    this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  legendsVisibility(e) {
    this.legend.setCollapse(e);
  }
  updateLegends(e = this.#T, i = !1) {
    if (!(this.#s.isEmpty || !T(this.#E)))
      for (const s in this.#E.list)
        this.#E.update(s, { pos: e, candle: i });
  }
  legendInputs(e = this.cursorPos) {
    e = this.cursorPos;
    let i = {}, s = [], n = [!0, !0, !0, !0, !0], o = this.time.xPos2Index(e[0] - this.core.scrollPos);
    o = $(o, 0, this.range.data.length - 1);
    let a = this.range.data[o];
    return a[4] >= a[1] ? s = new Array(5).fill(this.theme.candle.UpWickColour) : s = new Array(5).fill(this.theme.candle.DnWickColour), i.O = this.scale.nicePrice(a[1]), i.H = this.scale.nicePrice(a[2]), i.L = this.scale.nicePrice(a[3]), i.C = this.scale.nicePrice(a[4]), i.V = this.scale.nicePrice(a[5]), { inputs: i, colours: s, labels: n };
  }
  onLegendAction(e) {
    switch (this.#E.onMouseClick(e.currentTarget).icon) {
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
    let e = rt(this.overlaysDefault);
    this.graph = new ue(this, this.elViewport, e, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.#v.render(), this.#p.render();
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
    return e == "prev" ? --s : ++s, this.#s.ChartPanes.get(i[s]) || null;
  }
}
const ee = 0, qn = 4;
class Ft extends V {
  static #t = 0;
  static get cnt() {
    return ++Ft.#t;
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
  #p = [0, 0];
  #x;
  #v;
  #E = 2;
  #m = {};
  #w;
  #I;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, void 0, o, a), this.#r = V.cnt, this.#l = a, this.#a = a.overlay, this.#u = n.type, this.#c = n.indicator, this.#d = this.core.TALib, this.#f = this.xAxis.range, this.eventsListen();
  }
  get id() {
    return this.#e || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#r}`;
  }
  set id(e) {
    this.#e = String(e).replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#n;
  }
  set name(e) {
    this.#n = e;
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
    this.#x = e;
  }
  set setUpdateValue(e) {
    this.#v = e;
  }
  set precision(e) {
    this.#E = e;
  }
  get precision() {
    return this.#E;
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
    let s = Math.floor(new Date(e[ee]) / i) * i;
    e[ee] = s, this.#p[ee] !== e[ee] ? (this.#p[ee] = e[ee], this.#x(e)) : this.#v(e);
  }
  get value() {
    return this.#p;
  }
  destroy() {
    if (this.#I === "destroyed")
      return;
    if (!this.core.ChartPanes.get(this.chartPaneID).indicatorDeleteList[this.id]) {
      this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeIndicator()" instead.`);
      return;
    }
    this.off(Mt, this.onStreamUpdate), this.chart.legend.remove(this.#w), this.#I = "destroyed";
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.emit(`${this.chartPaneID}_removeIndicator`, { id: this.id, paneID: this.chartPaneID });
  }
  visible(e) {
    return Q(e) && (this.emit(`${this.chartPaneID}_visibleIndicator`, { id: this.id, paneID: this.chartPaneID, visible: e }), this.chartPane.indicators[this.id].layer.visible = e, this.draw()), this.chartPane.indicators[this.id].layer.visible;
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
    this.on(Mt, this.onStreamUpdate, this);
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
    if (B(e?.fn)) {
      let i = qn.fn(this);
      if (e?.own)
        return i;
    } else if (B(this.core.config.callbacks?.indicatorSettings?.fn)) {
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
    let s = [];
    do
      s.push(this.range.value(e)[qn]);
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
    if (s instanceof ss)
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
      for (let v of this.definition.output)
        g[c++] = p[v.name][0];
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
    if (!this.core.TALibReady || !S(e) || !(e in this.TALib) || !(s instanceof ss) || s.dataLength < this.definition.input.timePeriod)
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
        tt[i](n, o, s);
        break;
      case "renderLineHorizontal":
        tt[i](n, o[0], o[1], o[2], s);
        break;
      case "renderLineVertical":
        tt[i](n, o[0], o[1], o[2], s);
        break;
      case "renderPathStroke":
        tt[i](n, o, s.style, s);
        break;
      case "renderPathClosed":
        tt[i](n, o, s);
        break;
      case "renderSpline":
        tt[i](n, o, s);
        break;
      case "renderRect":
        tt[i](n, o[0], o[1], o[2], o[3], s);
        break;
      case "renderRectRound":
        tt[i](n, o[0], o[1], o[2], o[3], o[4], s);
        break;
      case "renderPolygonRegular":
        tt[i](n, o[0], o[1], o[2], o[3], o[4], s);
        break;
      case "renderPolygonIrregular":
        tt[i](n, o, s);
        break;
      case "renderTriangle":
        tt[i](n, o[0], o[1], o[2], s);
        break;
      case "renderDiamond":
        tt[i](n, o[0], o[1], o[2], o[3], s);
        break;
      case "renderCircle":
        tt[i](n, o[0], o[1], o[2], s);
        break;
      case "renderImage":
        tt[i](n, s.src, o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7]);
    }
    n.restore();
  }
  draw() {
  }
}
const Ki = {
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
}, yc = [
  ["grid", { class: Ti, fixed: !1, required: !0, params: { axes: "x" } }]
], wc = ["candles", "trades", "events"];
class zr {
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
  #p;
  #x;
  #v;
  #E;
  #m;
  #w;
  #I;
  #g = new ft();
  #P;
  #b;
  #L;
  #T = [];
  #S = cn;
  #M = ln;
  #C = {};
  #y = [0, 0];
  #R = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #k;
  #D;
  #U;
  #A;
  constructor(e, i) {
    this.#i = e, this.#r = i, this.#n = e, this.#l = this.#i.elMain, this.#h = this.#i.elYAxis, this.init(i);
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
  get chartDeleteList() {
    return this.#T;
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
    return this.#M;
  }
  set rowMinH(e) {
    E(e) && (this.#M = Math.abs(e));
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
    return this.#y;
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
    return this.#k;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.#i.scrollPos;
  }
  set stateMachine(e) {
    this.#s = new Vt(e, this);
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
  init(e) {
    if (this.#i, this.#D = this.#i.indicatorClasses, this.#a = this.#l.rows, this.#c = this.#l.time, this.#p = this.#l.rows.grid, this.#v = this.#l.viewport, this.#d = this.#i.elBody.scale, e.name = "Chart", e.shortName = "Chart", e.parent = this, e.chartData = this.#i.chartData, e.primaryPane = this.#i.primaryPane, e.secondaryPane = this.#i.secondaryPane, e.rangeLimit = this.#i.rangeLimit, e.settings = this.#i.settings, e.elements = {
      ...e.elements,
      ...this.elements
    }, this.#i.theme?.time?.navigation === !1) {
      const i = { height: wi };
      this.#i.theme.time = { ...this.#i.theme?.time, ...i }, this.#a.style.height = `calc(100% - ${wi}px)`;
    }
    this.#b = new _l(this.#i, e), this.registerChartViews(e), this.#k = E(this.config.buffer) ? this.config.buffer : Pi, this.#M = E(this.config.rowMinH) ? this.config.rowMinH : ln, this.#S = E(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : cn, this.rowsOldH = this.rowsH, this.log(`${this.#t} instantiated`);
  }
  start() {
    let e = 0;
    this.#l.start(this.theme), this.#b.start(), this.#g.forEach((i, s) => {
      i.start(e++), e === 1 && i.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.createGraph(), this.draw(this.range, !0), oi.init({
      graphs: [this.#m],
      range: this.range
    }), oi.start(), oi.queueFrame(this.range, [this.#m], !1), this.eventsListen(), Ki.id = this.id, Ki.context = this, this.stateMachine = Ki, this.stateMachine.start();
  }
  destroy() {
    this.#o = !0, this.stateMachine.destroy(), this.#b.destroy(), this.#g.forEach((e, i) => {
      this.#T[i] = !0, e.destroy(), delete this.#T[i];
    }), this.#m.destroy(), this.#A.destroy(), this.off(Re, this.onFirstStreamValue), this.off(_e, this.onNewStreamValue), this.off("setRange", this.draw), this.off("scrollUpdate", this.draw), this.off("chart_render", this.draw), this.off("destroyChartView", this.removeChartPane);
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
    this.#a.tabIndex = 0, this.#a.focus(), this.#A = new Pt(this.#a, { disableContextMenu: !1 }), this.#A.on("keydown", this.onChartKeyDown.bind(this)), this.#A.on("keyup", this.onChartKeyUp.bind(this)), this.#A.on("wheel", this.onMouseWheel.bind(this)), this.#A.on("pointerenter", this.onMouseEnter.bind(this)), this.#A.on("pointerout", this.onMouseOut.bind(this)), this.#A.on("pointerup", this.onChartDragDone.bind(this)), this.#A.on("pointermove", this.onMouseMove.bind(this)), this.on(Re, this.onFirstStreamValue, this), this.on(_e, this.onNewStreamValue, this), this.on("setRange", this.draw, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
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
      e.dragstart.x = this.#y[0], e.dragstart.y = this.#y[1], e.position.x = this.#y[0] + i, e.position.y = this.#y[1], this.onChartDrag(e);
      return;
    }
    const s = this.range, n = s.indexStart - Math.floor(i * en * s.Length), o = s.indexEnd + Math.ceil(i * en * s.Length);
    this.#i.setRange(n, o), this.draw(this.range, !0);
  }
  onMouseMove(e) {
    const i = this.#C;
    i.d2x = i?.d1x || null, i.d2y = i?.d1y || null, i.d1x = e.movement.x, i.d1y = e.movement.y, i.dx = Math.floor((i.d1x + i.d2x) / 2), i.dy = Math.floor((i.d1y + i.d2y) / 2), i.ts2 = i?.ts1 || null, i.ts1 = Date.now(), this.#y = [
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
    this.emit("main_mousemove", this.#y);
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
    ]) : (i.active = !0, i.start = [e.dragstart.x, e.dragstart.y], i.prev = i.start, i.delta = [0, 0]), this.#y = [
      e.position.x,
      e.position.y,
      ...i.start,
      ...i.delta
    ], this.emit("chart_pan", this.#y);
  }
  onChartDragDone(e) {
    const i = this.#R;
    i.active = !1, i.delta = [0, 0], this.#y = [
      ...i.prev,
      ...i.start,
      ...i.delta
    ], this.emit("chart_panDone", this.#y);
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
    let e = this.#a.heightDeltaR, i = Math.round(this.chartH * e), s = this.rowsW, n = this.rowsH, o = Math.round(s * ((100 + this.#k) * 0.01)), a = {
      resizeH: e,
      mainH: this.element.height,
      mainW: this.element.width,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.#i.scrollPos = -1, this.#b.setDimensions({ w: s }), this.#m.setSize(s, n, o), this.#g.size == 1 && i != this.#a.height ? this.#P.setDimensions({ w: s, h: this.#a.height }) : this.#g.forEach((l, c) => {
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
    return e.type == "primary" ? (a = new Be(this.#i, e), this.#P = a) : (e.name = e.view[0].name || "Secondary", e.shortName = e.view[0].type || "Secondary", a = new Be(this.#i, e)), this.#g.set(a.id, a), this.emit("addChartView", a), a;
  }
  removeChartPane(e) {
    if (!S(e) || !this.#g.has(e))
      return !1;
    const i = this.#g.get(e);
    if (i.isPrimary)
      return this.#i.error(`Cannot remove primary chart pane! ${e}`), !1;
    this.#T[e] = !0;
    let s = this.rowsW, n = i.viewport.height, o = Math.floor(n / (this.#g.size - 1)), a = n % o;
    return i.status !== "destroyed" && i.destroy(), this.#g.delete(e), delete this.#T[e], this.#g.forEach((l, c) => {
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
        T(o) && (o.type in this.core.indicatorClasses || wc.includes(o.type)) || (this.#i.log(`indicator ${s.type} not added: not supported.`), s.splice(n, 1));
    }
    return e;
  }
  addIndicator(e, i = e, s = {}) {
    if (!S(e) && !(e in this.#D) && !S(i) && !T(s))
      return !1;
    this.log(`Adding the ${i} : ${e} indicator`), M(s?.data) || (s.data = []), T(s?.settings) || (s.settings = {});
    let n;
    if (this.#D[e].ind.primaryPane) {
      const o = {
        type: e,
        name: i,
        ...s
      };
      n = this.#P.addIndicator(o);
    } else {
      this.core.indicatorClasses[e].ind.primaryPane === "both" && Q(e.primaryPane) && e.primaryPane, M(s.view) || (s.view = [{ name: i, type: e, ...s }]);
      for (let a = 0; a < s.view.length; a++)
        (!T(s.view[a]) || !dr(["name", "type"], Object.keys(s.view[a]))) && s.view.splice(a, 1);
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
      return e instanceof Ft ? (e.remove(), !0) : !1;
  }
  indicatorSettings(e, i) {
    if (S(e)) {
      for (const s of this.#g.values())
        if (e in s.indicators)
          return s.indicators[e].instance.settings(i);
    } else
      return e instanceof Ft ? e.settings(i) : !1;
  }
  calcChartPaneHeights() {
    const e = this.#g.size + 1, i = this.#S * (e - 1), s = i / Math.log10(i * 2) / 100;
    Math.round(this.rowsH * s);
    const n = {};
    if (e === 1)
      n.new = this.rowsH;
    else if (e === 2) {
      const o = this.#g.firstKey(), a = Math.round(this.rowsH * this.#S / 100);
      n[o] = this.rowsH - a, n.new = a;
    } else if (e === 3) {
      const o = this.#g.firstEntry(), a = this.#g.lastEntry(), l = Math.round(this.rowsH * this.#S / 100);
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
    const i = pl + ` width: 100%; border-top: 1px solid ${this.theme.secondaryPane.separator};`;
    return `
    <div slot="chartpane" class="viewport scale ${e}" style="$${i}"></div>
  `;
  }
  createGraph() {
    let e = rt(yc);
    this.#m = new ue(this, this.#v, e);
  }
  draw(e = this.range, i = !1) {
    const s = [
      this.#m,
      this.#b,
      this.#P
    ];
    this.time.xAxis.doCalcXAxisGrads(e), this.#g.forEach((n, o) => {
      s.push(n);
    }), oi.queueFrame(
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
const Xn = 20, xc = 20, Tc = new br(N.COLOUR_BORDER), ds = document.createElement("template");
ds.innerHTML = `
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
    border: 1px solid var(--txc-time-scrollbar-color, ${N.COLOUR_BORDER});
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
    background-color: var(--txc-time-handle-color, ${Tc.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${Xn}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${N.COLOUR_ICON});
    width: ${Xn}px;
    height: ${xc}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${N.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${tl}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${Jh}</span>
</div>
`;
class Ec extends ot {
  #t;
  constructor() {
    super(ds), this.#t = ds;
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
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", Ec);
const Wr = document.createElement("template");
Wr.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${wi}px;
  }
  tradex-overview {
    height: ${wr}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class Sc extends ot {
  constructor() {
    super(Wr);
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
customElements.get("tradex-time") || window.customElements.define("tradex-time", Sc);
const Fr = document.createElement("template");
Fr.innerHTML = `
<style>
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <div class="viewport"></div>
`;
class bc extends ot {
  constructor() {
    super(Fr);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.shadowRoot.querySelector(".viewport");
  }
}
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", bc);
const Vr = document.createElement("template");
Vr.innerHTML = `
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
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${Yh}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${qh}</span>
  </div>
</div>
`;
class Cc extends ot {
  #t;
  #e;
  #r;
  #n;
  #i;
  #s;
  #o = [];
  constructor() {
    super(Vr);
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
    return i += `<span id="${s}_up" class="control" data-icon="up">${Xh}</span>`, i += `<span id="${s}_down" class="control" data-icon="down">${jh}</span>`, i += `<span id="${s}_collapse" class="control" data-icon="visible">${Qh}</span>`, i += `<span id="${s}_maximize" class="control" data-icon="maximize">${Kh}</span>`, i += `<span id="${s}_restore" class="control" data-icon="restore">${Zh}</span>`, i += e?.type !== "chart" ? `<span id="${s}_remove" class="control" data-icon="remove">${Gh}</span>` : "", i += e?.type !== "secondary" ? `<span id="${s}_config" class="control" data-icon="config">${vr}</span>` : "", i;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", Cc);
const Gr = document.createElement("template");
Gr.innerHTML = `
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
class Mc extends ot {
  #t;
  #e;
  constructor() {
    super(Gr);
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
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", Mc);
const Yr = document.createElement("template");
Yr.innerHTML = `
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
class Pc extends ot {
  #t;
  #e;
  #r;
  #n;
  constructor() {
    super(Yr);
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
    this.#t = this.#r ? this.#r : this.clientWidth, this.#e = this.#n ? this.#n : this.clientHeight, this.#r = this.clientWidth, this.#n = this.clientHeight;
  }
}
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", Pc);
const qr = document.createElement("template");
qr.innerHTML = `
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
    width: calc(100% - ${ce}px);
    height: calc(100% - ${xi}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${N.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${ce}px);
    height: ${xi}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class Lc extends ot {
  #t;
  #e;
  constructor() {
    super(qr);
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
    let e = E(this.#e?.time?.height) ? this.#e.time.height : xi, i = this.#e.tools.location == "none" ? 60 : 0;
    this.rows.style.height = `calc(100% - ${e}px)`, this.rows.style.left = `${i}px`, this.time.style.left = `${i}px`, this.viewport.style.left = `${i}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", Lc);
const Xr = document.createElement("template");
Xr.innerHTML = `
  <slot></slot>
`;
class Ac extends ot {
  constructor() {
    super(Xr);
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
        height: ${zt.ICONSIZE};
        width: ${zt.ICONSIZE};
        fill: ${zt.COLOUR_ICON};
      }
      svg:hover {
        fill: ${zt.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${zt.ICONSIZE};
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
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", Ac);
const jr = document.createElement("template");
jr.innerHTML = `
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
class Ic extends ot {
  constructor() {
    super(jr);
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
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", Ic);
const Oc = `
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${Ut}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: 0;
    width: calc(100% - ${Ut}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 1px;
    right: 0; 
    width: ${ce}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`, Zr = document.createElement("template");
Zr.innerHTML = Oc;
class kc extends ot {
  #t;
  constructor() {
    super(Zr);
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
    let i = E(this.#t?.tools?.width) ? this.#t.tools.width : Ut, s;
    switch (e) {
      case "left":
        s = i == 0 ? 0 : ce, this.scale.style.left = `${i}px`, this.scale.style.right = void 0, this.main.style.left = void 0, this.main.style.right = `-${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
        break;
      case "both":
      case "right":
      default:
        s = i == 0 ? ce : 0, this.scale.style.left = void 0, this.scale.style.right = 0, this.main.style.left = void 0, this.main.style.right = `${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
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
        this.#t.tools.location = "right", this.#t.tools.width = this.#t?.tools?.width || Ut, this.tools.style.display = "block", this.tools.style.left = void 0, this.tools.style.right = 0, this.tools.style.width = `${Ut}px`;
        break;
      case "left":
      default:
        this.#t.tools.location = "left", this.#t.tools.width = this.#t?.tools?.width || Ut, this.tools.style.display = "block", this.tools.style.left = 0, this.tools.style.right = void 0, this.tools.style.width = `${Ut}px`;
        break;
    }
    this.setYAxisLocation();
  }
}
customElements.get("tradex-body") || window.customElements.define("tradex-body", kc);
const Kr = document.createElement("template");
Kr.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class Dc extends ot {
  constructor() {
    super(Kr);
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
        height: ${he.ICONSIZE};
        fill: ${he.COLOUR_ICON};
      }
    </style>
    `;
    for (const n of e)
      s += this.iconNode(n);
    return s + "</div>";
  }
  iconNode(e) {
    const i = `display: inline-block; height: ${he.ICONSIZE}; padding-top: 2px`, s = "sub" in e ? 'data-menu="true"' : "";
    return `
      <div id="TX_${e.id}" data-event="${e.event}" ${s} class="icon-wrapper" style="${i}">${e.icon}</div>

    `;
  }
}
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", Dc);
const Qr = document.createElement("template");
Qr.innerHTML = `
  <slot name="widget"></slot>
`;
class Rc extends ot {
  constructor() {
    super(Qr);
  }
  destroy() {
  }
  disconnectedCallback() {
  }
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", Rc);
const _c = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
    }
    tradex-utils {
      height: ${Wt}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${Wt}px); 
      min-height: ${Kt - Wt}px;
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
class Nc extends ot {
  #t;
  #e;
  #r;
  #n;
  #i = yi;
  #s = Kt;
  #o;
  #h;
  #l;
  #a;
  #c;
  constructor() {
    const e = document.createElement("template");
    e.innerHTML = _c, super(e, "closed"), this.#n = e;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#n.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = yr, this.elWidgetsG = this.shadowRoot.querySelector("tradex-widgets"), this.elUtils = this.shadowRoot.querySelector("tradex-utils"), this.elBody = this.shadowRoot.querySelector("tradex-body"), this.elMain = this.elBody.main, this.elTime = this.elBody.main.time, this.elTools = this.elBody.tools, this.elYAxis = this.elBody.scale, this.previousDimensions();
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
    this.log(`onResize w: ${this.offsetWidth}, h: ${this.offsetHeight}`), T(this.MainPane) && this.MainPane instanceof zr && (this.previousDimensions(), this.emit("global_resize", { w: this.offsetWidth, h: this.offsetHeight }));
  }
  previousDimensions() {
    this.#o = this.#l ? this.#l : this.offsetWidth, this.#h = this.#a ? this.#a : this.offsetHeight, this.#l = this.offsetWidth, this.#a = this.offsetHeight;
  }
  setWidth(e) {
    E(e) ? (this.#i = e, e += "px") : S(e) || (this.#i = this.parentElement.getBoundingClientRect().width, e = this.#i + "px"), this.style.width = e;
  }
  setHeight(e) {
    E(e) ? (this.#s = e, e += "px") : S(e) || (this.#s = this.parentElement.getBoundingClientRect().height, w = this.#s + "px"), this.style.height = e;
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
      i = a.height ? a.height : l.height ? l.height : Kt, e = a.width ? a.width : l.width ? l.width : yi;
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
        this.#c.utils.location = "none", this.#c.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${Kt}px`;
        break;
      case "top":
      default:
        this.#c.utils.location = "top", this.#c.utils.height = Wt, this.elUtils.style.display = "block", this.elUtils.style.height = `${Wt}px`, this.elBody.style.height = `calc(100% - ${Wt}px)`, this.elBody.style.minHeight = `${Kt - Wt}px`;
    }
  }
}
const $c = [
  {
    id: "indicators",
    name: "Indicators",
    icon: $h,
    event: "utils_indicators",
    sub: []
  },
  {
    id: "timezone",
    name: "Timezone",
    icon: Hh,
    event: "utils_timezone"
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: Nh,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: vr,
    event: "utils_settings"
  }
], Hc = {
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
}, Bc = {
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
}, Uc = {
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
}, zc = {
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
class As extends Ft {
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
    this.id = a.overlay?.id || it(this.shortName), this.defineIndicator(l?.settings, Hc), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return As.primaryPane;
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
    let a = e.value(e.indexStart)[0], l = this.overlay.data[0][0], c = (a - l) / e.interval, g = this.Timeline.rangeScrollOffset, p = e.Length + g + 2, v = {};
    for (; p; )
      c < 0 || c >= this.overlay.data.length ? (i.lower.push({ x: null, y: null }), i.middle.push({ x: null, y: null }), i.upper.push({ x: null, y: null })) : (o.x = this.xAxis.xPos(s[c][0]), o.y = this.yAxis.yPos(s[c][1][0]), i.lower.push({ ...o }), o.x = this.xAxis.xPos(s[c][0]), o.y = this.yAxis.yPos(s[c][1][1]), i.middle.push({ ...o }), o.x = this.xAxis.xPos(s[c][0]), o.y = this.yAxis.yPos(s[c][1][2]), i.upper.push({ ...o })), c++, p--;
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
class Si extends Ft {
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
    super(e, i, s, n, o, a), Si.inCnt++;
    const l = a.overlay;
    this.id = a.overlay?.id || it(this.shortName), this.defineIndicator(l?.settings, Bc), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return Si.primaryPane;
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
class Is extends Ft {
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
  static scale = ie[1];
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const l = a.overlay;
    this.id = a.overlay?.id || it(this.shortName), this.defineIndicator(l?.settings, Uc), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return Is.primaryPane;
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
    let p = this.Timeline.rangeScrollOffset, v = e.data.length - this.overlay.data.length, C = e.indexStart - v - 2, P = e.Length + p * 2 + 2;
    for (; P; )
      C < 0 || C >= this.overlay.data.length ? o.push({ x: null, y: null }) : (g.x = this.xAxis.xPos(l[C][0]), g.y = this.yAxis.yPos(l[C][1]), o.push({ ...g })), C++, P--;
    this.plot(o, "renderLine", this.style), this.target.viewport.render();
  }
}
class bi extends Ft {
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
    super(e, i, s, n, o, a), bi.inCnt++;
    const l = a.overlay;
    this.id = a.overlay?.id || it(this.shortName), this.defineIndicator(l?.settings, zc), this.style = l?.settings?.style ? { ...this.#t, ...l.settings.style } : { ...this.#t, ...n.style }, this.calcIndicatorHistory(), this.setNewValue = (c) => {
      this.newValue(c);
    }, this.setUpdateValue = (c) => {
      this.updateValue(c);
    }, this.addLegend();
  }
  get primaryPane() {
    return bi.primaryPane;
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
const Jr = {
  BB: { id: "BB", name: "Bollinger Bands", event: "addIndicator", ind: As },
  EMA: { id: "EMA", name: "Exponential Moving Average", event: "addIndicator", ind: Si },
  RSI: { id: "RSI", name: "Relative Strength Index", event: "addIndicator", ind: Is },
  SMA: { id: "SMA", name: "Simple Moving Average", event: "addIndicator", ind: bi }
};
class Wc {
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
  constructor(e, i) {
    this.#r = e, this.#n = i, this.#i = e.elUtils, this.#s = e.config?.utilsBar || $c, this.#o = e.WidgetsG, this.#h = e.indicatorClasses || Jr, this.init();
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
    return this.#n;
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
    this.#i.innerHTML = this.#i.defaultNode(this.#s), this.log(`${this.#t} instantiated`);
  }
  start() {
    this.initAllUtils(), this.eventsListen();
  }
  destroy() {
    const e = this.#r, i = I.findBySelectorAll(`#${e.id} .${La} .icon-wrapper`);
    for (let s of i) {
      let n = s.id.replace("TX_", "");
      for (let o of this.#s)
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
    }, l = i.dataset.action;
    this.emit(n, a), o ? this.emit("menu_open", a) : this.emit("util_selected", a), l && l(a, this.#r);
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = he.COLOUR_ICONHOVER;
  }
  onIconOut(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = he.COLOUR_ICON;
  }
  initAllUtils() {
    const e = this.#i.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      this.#u[i.id] = 0;
      let s = i.id.replace("TX_", ""), n = i.querySelector("svg");
      n.style.fill = he.COLOUR_ICON, n.style.height = "90%";
      for (let o of this.#s)
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
    this.#r.downloadImage();
  }
}
class Ct {
  static #t = 0;
  static #e = {};
  static create(e, i) {
    const s = ++Ct.#t;
    i.cnt = s, i.modID = `${i.toolID}_${s}`, i.toolID = i.modID, i.target = e;
    const n = new i.tool(i);
    return Ct.#e[s] = n, e.chartToolAdd(n), n;
  }
  static destroy(e) {
    if (e instanceof Ct) {
      const i = e.inCnt;
      delete Ct.#e[i];
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
  #p;
  #x;
  #v = [0, 0];
  #E = !1;
  #m;
  #w = { TL: [0, 0], BR: [0, 0] };
  constructor(e) {
    this.#h = e, this.#n = e.cnt, this.#r = this.#h.ID || it("TX_Tool_"), this.#i = e.name, this.#l = e.core, this.#u = e.elements.elChart, this.#a = { ...e.parent }, this.#x = e.target, this.#x.addTool(this), this.#f = this.#p.viewport, this.#d = this.#f.scene.canvas, this.#m = e.pos;
  }
  set id(e) {
    this.#r = String(e).replace(/ |,|;|:|\.|#/g, "_");
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
    return this.#x;
  }
  set layerTool(e) {
    this.#p = e;
  }
  get layerTool() {
    return this.#p;
  }
  get elViewport() {
    return this.#f;
  }
  get cursorPos() {
    return this.#v;
  }
  get cursorActive() {
    return this.#E;
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
    this.#c = new Pt(this.#d, { disableContextMenu: !1 }), this.#c.on("mousemove", this.onMouseMove.bind(this));
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
    this.#v = [Math.round(e.position.x), Math.round(e.position.y)], this.emit("tool_mousemove", this.#v);
  }
  isVisible() {
  }
  createViewport() {
    this.config.buffer || BUFFERSIZE, this.#f.getBoundingClientRect().width, this.#o.chartH || this.#a.rowsH - 1;
  }
  draw() {
  }
}
class Fc extends Ct {
  constructor(e) {
    super(e);
  }
}
class Vc extends Ct {
  constructor(e) {
    super(e);
  }
}
class Gc extends Ct {
  constructor(e) {
    super(e);
  }
}
class Yc extends Ct {
  constructor(e) {
    super(e);
  }
}
const qc = [
  {
    id: "cursor",
    name: "Cursor",
    icon: Bh,
    event: "tool_activated"
  },
  {
    id: "line",
    name: "Line",
    icon: ni,
    event: "tool_activated"
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: zh,
    event: "tool_activated",
    class: Fc,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: ni
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: Fh,
    event: "tool_activated",
    class: Gc,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: ni
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: Vh,
    event: "tool_activated",
    class: Yc,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: ni
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: Wh,
    event: "tool_activated",
    class: Vc
  },
  {
    id: "delete",
    name: "Delete",
    icon: Uh,
    event: "tool_activated",
    class: void 0
  }
], Qi = {
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
class Xc {
  #t;
  #e = "Toolbar";
  #r = "tools";
  #n;
  #i;
  #s;
  #o;
  #h;
  #l = Ct;
  #a;
  #c = {};
  #u = void 0;
  #d;
  #f = { click: [], pointerover: [] };
  constructor(e, i) {
    this.#n = e, this.#i = i, this.#o = e.elTools, this.#a = qc || e.config.tools, this.#h = e.WidgetsG, this.init();
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
    return I.elementDimPos(this.#o);
  }
  set stateMachine(e) {
    this.#s = new Vt(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  init() {
    this.mount(this.#o), this.log(`${this.#e} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), Qi.id = this.id, Qi.context = this, this.stateMachine = Qi, this.stateMachine.start();
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
    this.#n.on(e, i, s);
  }
  off(e, i) {
    this.#n.off(e, i);
  }
  emit(e, i) {
    this.#n.emit(e, i);
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
    i.style.fill = zt.COLOUR_ICON;
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = zt.COLOUR_ICONHOVER;
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
      n.style.fill = zt.COLOUR_ICON, n.style.width = "90%";
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
const jc = 150;
class lt {
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
  static class = dn;
  static name = "Menus";
  static type = "Menu";
  static currentActive;
  constructor(e, i) {
    this.#e = e, this.#r = i.core, this.#n = i, this.#t = i.id, this.#s = e.elements.elMenus, this.#i = this.#r.elWidgetsG, this.init();
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
    this.mount(this.#s);
  }
  start() {
    this.position(this.#n.primary), this.eventsListen();
  }
  end() {
    this.#s.querySelectorAll(`#${this.id} li`).forEach((i) => {
      i.removeEventListener("click", this.#a[this.id][i.id]);
    }), document.removeEventListener("click", this.#a[this.id].outside);
  }
  eventsListen() {
    const e = this.#s.querySelectorAll(`#${this.id} li`);
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
    if (!this.#o.contains(e.target) && !this.#n.primary.contains(e.target) && I.isVisible(this.#o)) {
      let i = {
        target: e.currentTarget.id,
        menu: this.#t
      };
      this.emit("menu_close", i);
    }
    document.removeEventListener("click", this.#a[this.id].outside);
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.menuNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#o = this.#s.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${dn}" style=""></div>
    `;
  }
  menuNode() {
    const e = this.#n, i = `position: absolute; z-index: 1000; display: none; border: 1px solid ${Gi.COLOUR_BORDER}; background: ${Gi.COLOUR_BG}; color: ${Gi.COLOUR_TXT};`;
    let s = this.content(e);
    return `
      <div id="${e.id}" class="${Aa}" style="${i}">
        ${s}
      </div>
    `;
  }
  content(e) {
    const i = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${jc}px`, s = "padding: .25em 1em .25em 1em; white-space: nowrap;", n = "display: inline-block; width: 4em;", o = "cursor: pointer;", a = `onmouseover="this.style.background ='#222'"`, l = `onmouseout="this.style.background ='none'"`;
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
      s = $(s, 0, this.#i.offsetWidth), this.#o.style.left = `${s}px`;
    }
    setTimeout(() => {
      this.#a[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#a[this.id].outside);
    }, 250);
  }
  close() {
    lt.currentActive = null, this.#o.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class et {
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
  static class = fn;
  static name = "Windows";
  static type = "Window";
  static currentActive = null;
  static create(e, i) {
    const s = `window_${++et.windowCnt}`;
    return i.id = s, et.windowList[s] = new et(e, i), et.windowList[s];
  }
  static destroy(e) {
    et.windowList[e].destroy(), delete et.windowList[e];
  }
  constructor(e, i) {
    this.#e = e, this.#r = i.core, this.#n = i, this.#t = i.id, this.#s = e.elements.elWindows, this.#i = this.#r.elWidgetsG, this.init();
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
  set config(e) {
    this.#n = e;
  }
  get dimensions() {
    return I.elementDimPos(this.#o);
  }
  set dimensions(e) {
    this.setDimensions(e);
  }
  get type() {
    return et.type;
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
    e.lastElementChild == null ? e.innerHTML = this.windowNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#o = this.#s.querySelector(`#${this.#n.id}`), this.#h = this.#o.querySelector(".dragBar"), this.#l = this.#o.querySelector(".title"), this.#a = this.#o.querySelector(".closeIcon"), this.#c = this.#o.querySelector(".content");
    let i, s;
    if (T(this.#n.position))
      i = this.#n.x, s = this.#n.y;
    else {
      let n = I.elementDimPos(this.#o);
      i = (this.#r.width - n.width) / 2, s = (this.#r.height - n.height) / 2;
    }
    this.#o.style.bottom = `${s}px`, this.#o.style.left = `${i}px`;
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${fn}" style=""></div>
    `;
  }
  windowNode() {
    const e = this.#n;
    let i = `position: absolute; z-index: 10; display: block; border: 1px solid ${Yi.COLOUR_BORDER}; background: ${Yi.COLOUR_BG}; color: ${Yi.COLOUR_TXT};`, s = this.config?.styles?.window;
    for (let g in s)
      i += `${g}: ${s[g]}; `;
    let n = e.dragBar ? this.dragBar(e) : "", o = !e.dragBar && e.title ? this.title(e) : "", a = this.content(e), l = this.closeIcon(e);
    return `
      <div id="${e.id}" class="${Ia}" style="${i}">
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
    let i = "", s = this.config?.styles?.title;
    for (let o in s)
      i += `${o}: ${s[o]}; `;
    return `
          <div class="title" style="${i}"></div>
      `;
  }
  closeIcon(e) {
    const i = "cursor: pointer;", s = `onmouseover="this.style.background ='#222'"`, n = `onmouseout="this.style.background ='none'"`;
    let o = `${i} `, a = this.config?.styles?.closeIcon, l = "";
    for (let g in a)
      l += `${g}: ${a[g]}; `;
    let c = "";
    return e.closeIcon && (c += `
      <div class="closeIcon" style="${o}" ${s} ${n}>
        <span>X</span>
      </div>
    `), c;
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
    return et.destroy(this.id);
  }
  open(e) {
    if (et.currentActive === this)
      return !0;
    et.currentActive = this, this.#o.style.display = "block", this.#o.style.zindex = "10", this.setProperties(e), this.emit("window_opened", this.id), setTimeout(() => {
      this.#f.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#f.click);
    }, 250);
  }
  close() {
    et.currentActive = null, this.#o.style.display = "none", this.emit("window_closed", this.id);
  }
}
class Os extends et {
  static type = "Dialogue";
  constructor(e, i) {
    super(), i.dragbar = !0, i.close = !0, this.config = i;
  }
  get type() {
    return Os.type;
  }
}
class vt {
  static progressList = {};
  static progressCnt = 0;
  static class = gn;
  static type = "progress";
  static name = "Progress";
  static icons = {
    loadingBars: dl,
    loadingSpin: ul
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${gn}" style=""></div>
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
  #n;
  #i;
  #s;
  #o;
  #h;
  constructor(e, i) {
    this.#e = e, this.#r = i.core, this.#n = i, this.#t = i.id, this.#s = e.elements.elProgress, this.#i = this.#r.elWidgetsG, this.init();
  }
  get type() {
    return vt.type;
  }
  init() {
    this.mount(this.#s);
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
      <div id="${this.#n.id}" class="progress ${e.type}" style="${i}">${n}</div>
    `;
  }
  mount(e) {
    let i = "loadingBars";
    this.#n?.type in vt.icons && (i = this.#n?.type);
    const s = { type: i, icon: vt.icons[i] };
    e.lastElementChild == null ? e.innerHTML = this.progressNode(s) : e.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(s)), this.#o = this.#s.querySelector(`#${this.#n.id}`), this.#h = this.#o.querySelector("svg"), this.#h.style.fill = `${vl.COLOUR_ICONHOVER};`;
  }
}
const Ji = {
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
class Zc {
  #t;
  #e = "Widgets";
  #r = "widgets";
  #n;
  #i;
  #s;
  #o;
  #h = { Divider: pt, Progress: vt, Menu: lt, Window: et, Dialogue: Os };
  #l = {};
  #a = {};
  #c;
  #u;
  #d;
  constructor(e, i) {
    this.#n = e, this.#i = i, this.#o = { ...this.#h, ...i.widgets }, this.#c = e.elWidgetsG, this.init();
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
  set stateMachine(e) {
    this.#s = new Vt(e, this);
  }
  get stateMachine() {
    return this.#s;
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
    this.eventsListen(), Ji.id = this.id, Ji.context = this, this.stateMachine = Ji, this.stateMachine.start();
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
    this.#n.on(e, i, s);
  }
  off(e, i) {
    this.#n.off(e, i);
  }
  emit(e, i) {
    this.#n.emit(e, i);
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
function jn(r, e, i, s, n) {
  const o = r.theme, a = document.createElement("template"), l = r.Timeline.graph.viewport.scene, c = r.MainPane, g = c.graph.viewport.scene, p = c.width, v = c.height, C = new $e.Viewport({
    width: p,
    height: v,
    container: a
  }), P = C.scene.context;
  P.save(), Ls(P, 0, 0, p, v, { fill: o.chart.Background }), P.drawImage(g.canvas, 0, 0, g.width, g.height);
  let D = 0, H = 0, j = p - r.Chart.scale.width;
  o?.yAxis?.location == "left" && (H = r.Chart.scale.width, j = 0);
  let O;
  for (const [Dt, xt] of r.ChartPanes) {
    let Rt = xt.graph.viewport.scene, { width: _t, height: Lt } = Rt, Gt = xt.scale.graph.viewport.scene, { width: At, height: Qt } = Gt;
    D > 0 && (O = { stroke: "#ccc" }, He(P, D, 0, c.width, O)), P.drawImage(Rt.canvas, H, D, _t, Lt), P.drawImage(Gt.canvas, j, D - 1, At, Qt), D += Lt;
  }
  P.drawImage(l.canvas, 0, D, l.width, l.height), O = {
    text: r.config.title,
    colour: o.chart.TextColour,
    fontSize: o.chart.FontSize * 1.5,
    fontWeight: "normal",
    fontFamily: o.chart.FontFamily,
    textBaseLine: "top"
  }, Ir(P, 6, 6, O), P.restore();
  const R = () => {
    C.destroy(), a.remove();
  };
  switch (n) {
    case "url":
      const Dt = (xt) => {
        e(xt), R();
      };
      C.scene.toImage(i, s, Dt);
      break;
    case "download":
    default:
      C.scene.export({ fileName: e }, null, i, s);
      break;
  }
}
class A extends Nc {
  static #t = $o;
  static #e = 0;
  static #r = {};
  static #n = {};
  static #i = null;
  static #s = !1;
  static #o = [];
  static #h = null;
  static get version() {
    return A.#t;
  }
  static get talibPromise() {
    return A.#i;
  }
  static get talibReady() {
    return A.#s;
  }
  static get talibAwait() {
    return A.#o;
  }
  static get talibError() {
    return A.#h;
  }
  static #l = `${be} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
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
  #c = be;
  #u = Ae;
  #d;
  #f;
  #p;
  #x;
  #v;
  #E;
  #m;
  #w;
  #I;
  #g;
  #P;
  #b;
  #L = !1;
  #T = null;
  #S = {};
  #M = k;
  #C;
  #y;
  #R = Jr;
  #k;
  #D;
  #U;
  chartWMin = yi;
  chartHMin = Kt;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = N.COLOUR_BG;
  chartTxtColour = N.COLOUR_TXT;
  chartBorderColour = N.COLOUR_BORDER;
  utilsH = Wt;
  toolsW = Ut;
  timeH = xi;
  scaleW = ce;
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
  #B = !1;
  static create(e = {}) {
    A.#e == 0 && (A.#r.CPUCores = navigator.hardwareConcurrency, A.#r.api = {
      permittedClassNames: A.#a
    }), (typeof e.talib != "object" || typeof e.talib.init != "function") && (A.#s = !1, A.#h = new Error(`${A.#l}`)), !A.#s && A.#h === null && (A.#i = e.talib.init(e.wasm)), A.#i.then(
      () => {
        A.#s = !0;
        for (let i of A.#o)
          B(i) && i();
      },
      () => {
        A.#s = !1;
      }
    );
  }
  static destroy(e) {
    if (e instanceof A) {
      e.end();
      const i = e.inCnt;
      delete A.#n[i];
    }
  }
  static cnt() {
    return A.#e++;
  }
  constructor() {
    super(), this.#T = A.cnt(), console.warn(`!WARNING!: ${be} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${Ae} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#G = Er;
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
    return this.#p;
  }
  get config() {
    return this.#f;
  }
  get core() {
    return this.#d;
  }
  get inCnt() {
    return this.#T;
  }
  set elUtils(e) {
    this.#v = e;
  }
  get elUtils() {
    return this.#v;
  }
  set elTools(e) {
    this.#m = e;
  }
  get elTools() {
    return this.#m;
  }
  set elBody(e) {
    this.#E = e;
  }
  get elBody() {
    return this.#E;
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
    this.#b = e;
  }
  get elWidgetsG() {
    return this.#b;
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
    return this.#C;
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
    return E(this.#y.initialCnt) ? this.#y.initialCnt : Oa;
  }
  get range() {
    return this.#y;
  }
  get time() {
    return this.#_;
  }
  get TimeUtils() {
    return na;
  }
  get theme() {
    return this.#D;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#R;
  }
  get TALib() {
    return this.#k;
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
    return this.#S;
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
    return this.#C.IsEmpty;
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
    this.log(`${be} configuring...`), A.create(e);
    const i = { ...e };
    this.logs = i?.logs ? i.logs : !1, this.infos = i?.infos ? i.infos : !1, this.warnings = i?.warnings ? i.warnings : !1, this.errors = i?.errors ? i.errors : !1, this.timer = i?.timer ? i.timer : !1, this.#f = i, this.#T = i.cnt || this.#T, this.#k = i.talib, this.#x = this, this.#d = this;
    const s = S(i?.id) ? i.id : null;
    this.setID(s), this.classList.add(this.id), this.log("processing state...");
    let n = rt(i?.state) || {};
    n.id = this.id, n.core = this;
    let o = i?.deepValidate || !1, a = i?.isCrypto || !1;
    this.#C = this.#M.create(n, o, a), delete i.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let l = "1s", c = z;
    if (!T(i?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${be} has no chart data or streaming provided.`), { tf: l, ms: c } = ai(i?.timeFrame)) : T(i?.stream) && this.state.data.chart.data.length < 2 ? ({ tf: l, ms: c } = ai(i?.timeFrame), this.#H = !0) : (l = this.state.data.chart.tf, c = this.state.data.chart.tfms), this.log(`tf: ${l} ms: ${c}`), this.#f.callbacks = this.#f.callbacks || {}, T(i))
      for (const p in i)
        p in this.props() && this.props()[p](i[p]);
    const g = T(i?.range) ? i.range : {};
    if (g.interval = c, g.core = this, this.getRange(null, null, g), this.#y.Length > 1) {
      const p = rs(this.#_, this.#f?.range?.startTS), v = E(p) ? p + this.#y.initialCnt : this.allData.data.length - 1, C = E(p) ? p : v - this.#y.initialCnt;
      this.#y.initialCnt = v - C, this.setRange(C, v), i.range?.center && this.jumpToIndex(C, !0, !0);
    }
    this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#W = new Zc(this, { widgets: i?.widgets }), this.#A = new Wc(this, i), this.#z = new Xc(this, i), this.#O = new zr(this, i), this.setTheme(this.#U.id), this.log(`${this.#c} V${A.version} configured and running...`), this.#N = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#V = this.WidgetsG.insert("Progress", {}), this.stream = this.#f.stream, this.#H && this.on(Mt, this.delayedSetRange, this), this.#L = !0, this.refresh();
  }
  destroy() {
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.#S = null, this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#G.end(), this.#M = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(Mt, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#V.stop());
  }
  on(e, i, s) {
    return !S(e) || !B(i) ? !1 : (this.#S[e] || (this.#S[e] = []), this.#S[e].push({ handler: i, context: s }), !0);
  }
  off(e, i) {
    if (!S(e) || !B(i) || !(e in this.#S))
      return !1;
    for (let s = 0; s < this.#S[e].length; s++)
      if (this.#S[e][s].handler === i && (this.#S[e].splice(s, 1), this.#S[e].length === 0)) {
        delete this.#S[e];
        break;
      }
    return !0;
  }
  emit(e, i) {
    S(e) && (this.#S[e] || []).forEach((s) => s.handler.call(s.context, i));
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
      logs: (e) => this.logs = Q(e) ? e : !1,
      infos: (e) => this.infos = Q(e) ? e : !1,
      warnings: (e) => this.warnings = Q(e) ? e : !1,
      errors: (e) => this.errors = Q(e) ? e : !1,
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
    return this.#T;
  }
  setID(e) {
    S(e) ? this.id = e : this.id = `${it(Ae)}_${this.#T}`;
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
    this.utilsH = e, this.#v.style.height = `${e}px`;
  }
  setToolsW(e) {
    this.toolsW = e, this.#m.style.width = `${e}px`;
  }
  setPricePrecision(e) {
    (!E(e) || e < 0) && (e = $a), this.#q = e;
  }
  setVolumePrecision(e) {
    (!E(e) || e < 0) && (e = Ha), this.#X = e;
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
    o += `--txc-background: ${i.chart.Background}; `, this.style.background = `var(--txc-background, ${i.chart.Background})`, this.style.border = `${i.chart.BorderThickness}px solid`, this.style.borderColor = n, o += `--txc-border-color:  ${i.chart.BorderColour}; `, this.#w.rows.style.borderColor = n, o += `--txc-time-scrollbar-color: ${i.chart.BorderColour}; `, o += `--txc-time-handle-color: ${i.xAxis.handle}; `, o += `--txc-time-slider-color: ${i.xAxis.slider}; `, o += `--txc-time-cursor-fore: ${i.xAxis.colourCursor}; `, o += `--txc-time-cursor-back: ${i.xAxis.colourCursorBG}; `, o += `--txc-time-icon-color: ${i.icon.colour}; `, o += `--txc-time-icon-hover-color: ${i.icon.hover}; `, this.#g.overview.scrollBar.style.borderColor = n, this.#g.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${i.xAxis.handle})`, this.#g.overview.style.setProperty("--txc-time-slider-color", i.xAxis.slider), this.#g.overview.style.setProperty("--txc-time-icon-color", i.icon.colour), this.#g.overview.style.setProperty("--txc-time-icon-hover-color", i.icon.hover);
    for (let [a, l] of Object.entries(this.Chart.legend.list))
      l.el.style.color = `var(--txc-legend-color, ${i.legend.colour})`, l.el.style.font = `var(--txc-legend-font, ${i.legend.font})`;
    for (let a of this.#v.icons)
      a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    for (let a of this.#m.icons)
      a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    return o += " }", s.innerHTML = o, !0;
  }
  setScrollPos(e) {
    e = Math.round(e), E(e) && e <= 0 && e >= this.bufferPx * -1 ? this.#N = e : this.emit("Error", "setScrollPos: not a valid value");
  }
  setState(e) {
    if (!k.has(e))
      return this.warn(`${this.name} id: ${this.id} : Specified state does not exist`), !1;
    if (e === this.key)
      return !0;
    this.stream.stop(), this.MainPane.reset(), this.#C = k.get(e);
    const i = {
      interval: this.#C.data.chart.tfms,
      core: this
    };
    if (this.getRange(null, null, i), this.range.Length > 1) {
      const s = rs(this.time, void 0), n = s ? s + this.range.initialCnt : this.#C.data.chart.data.length - 1, o = s || n - this.range.initialCnt;
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
    if (this.stream instanceof ne)
      return this.error("Error: Invoke stopStream() before starting a new one."), !1;
    if (T(e))
      return this.allData.data.length == 0 && S(e.timeFrame) && ({ tf, ms } = ai(e?.timeFrame), this.range.interval = ms, this.range.intervalStr = tf, this.#_.timeFrameMS = ms, this.#_.timeFrame = tf), this.#$ = new ne(this), this.#f.stream = this.#$.config, this.#$;
  }
  stopStream() {
    this.stream instanceof ne && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#H; ) {
      let e = this.range.Length * 0.5;
      this.setRange(e * -1, e), this.off(Mt, this.delayedSetRange), this.#H = !1;
    }
  }
  updateRange(e) {
    if (!M(e) || !E(e[4]) || e[4] == 0)
      return;
    let i, s;
    i = e[4], s = this.#N + i, s % this.candleW, s < this.bufferPx * -1 ? (s = 0, this.offsetRange(this.rangeScrollOffset * -1)) : s > 0 && (s = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#N = s, this.emit("scrollUpdate", s);
  }
  offsetRange(e) {
    let i = this.range.indexStart - e, s = this.range.indexEnd - e;
    this.setRange(i, s);
  }
  getRange(e = 0, i = 0, s = {}) {
    this.#y = new ss(e, i, s), this.#_.range = this.#y, this.#_.timeFrameMS = this.#y.interval, this.#_.timeFrame = this.#y.intervalStr;
  }
  setRange(e = 0, i = this.rangeLimit) {
    const s = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#y.set(e, i, s), e < 0 && !this.#B ? this.emit("range_limitPast", { chart: this, start: e, end: i }) : i > this.range.dataLength && !this.#B && this.emit("range_limitFuture", { chart: this, start: e, end: i });
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
    this.#B = !0;
    let n = this.state.mergeData(e, i, s);
    return Q(n) && (this.#B = !1), n;
  }
  isIndicator(e) {
    return !!(typeof e == "function" && "primaryPane" in e.prototype && B(e.prototype?.draw));
  }
  setIndicators(e, i = !1) {
    if (!T(e))
      return !1;
    i && (console.warn("Expunging all default indicators!"), this.#R = {});
    for (const [s, n] of Object.entries(e))
      S(n?.id) && S(n?.name) && S(n?.event) && this.isIndicator(n?.ind) && (this.#R[s] = n);
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
    return this.#M.addTrade(e);
  }
  removeTrade(e) {
    return this.#M.removeTrade(e);
  }
  addEvent(e) {
    return this.#M.addEvent(e);
  }
  removeEvent(e) {
    return this.#M.removeEvent(e);
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
  toImageURL(e, i, s) {
    jn(this, e, i, s, "url");
  }
  downloadImage(e = `${this.id}.png`, i, s) {
    jn(this, e, i, s, "download");
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
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", Tl), document.head.insertAdjacentHTML("beforeend", El), customElements.get("tradex-chart") || customElements.define("tradex-chart", A));
export {
  A as Chart,
  I as DOM,
  Ft as Indicator,
  V as Overlay,
  ss as Range,
  Vt as StateMachine,
  tt as canvas,
  rt as copyDeep,
  Kc as isPromise,
  De as mergeDeep,
  it as uid
};
