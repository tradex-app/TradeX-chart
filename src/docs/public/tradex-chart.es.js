function ic(a, e) {
  for (var i = 0; i < e.length; i++) {
    const s = e[i];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const n in s)
        if (n !== "default" && !(n in a)) {
          const r = Object.getOwnPropertyDescriptor(s, n);
          r && Object.defineProperty(a, n, r.get ? r : {
            enumerable: !0,
            get: () => s[n]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }));
}
const jt = "TradeX-Chart", nt = "TX", sc = "tradeXutils", Br = "tradeXmenus", nc = "tradeXmenu", Fr = "tradeXdividers", Ur = "tradeXwindows", rc = "tradeXwindow", zr = "tradeXprogress", ac = 500, oc = "stream_None", Di = "stream_Listening", Vr = "stream_Started", lc = "stream_Stopped", hc = "stream_Error", Nn = "stream_candleFirst", rt = "stream_candleUpdate", Rn = "stream_candleNew", cc = 250, uc = 8, Wr = 2, dc = 2, ho = 18, si = 100, Kt = /^(\d*\.?\d+)\s?(px|em|ex|%|in|cn|mm|pt|pc+)$/igm;
function L(a) {
  return Array.isArray(a);
}
function kn(a, e) {
  return L(a) ? a.every((i) => $n(e, i)) : !1;
}
function _(a) {
  return a && typeof a == "function";
}
function v(a) {
  return typeof a == "object" && !Array.isArray(a) && a !== null;
}
function P(a) {
  return typeof a == "number" && !isNaN(a);
}
function k(a) {
  return typeof a == "number" && Math.abs(a % 1) === 0;
}
function co(a) {
  return a != null;
}
function q(a) {
  return typeof a == "boolean";
}
function T(a) {
  return typeof a == "string";
}
function uo(a) {
  return a instanceof Map;
}
function mo(a) {
  return !!a && (v(a) || _(a)) && _(a.then);
}
function po(a) {
  return a instanceof Error;
}
function ni(a) {
  return !(a && a.constructor === Function) || a.prototype === void 0 || Object.getOwnPropertyNames(a).includes("arguments") || Object.getOwnPropertyNames(a).includes("arguments") || Object.getOwnPropertyNames(a).includes("arguments") ? !1 : Function.prototype !== Object.getPrototypeOf(a) ? !0 : Object.getOwnPropertyNames(a.prototype).length > 1;
}
function $n(a, e) {
  if (e == null)
    return !1;
  switch (a) {
    case "array":
      return L(e);
    case "function":
      return _(e);
    case "object":
      return v(e);
    case "integer":
      return k(e);
    case "number":
      return P(e);
    case "valid":
      return co(e);
    case "boolean":
      return q(e);
    case "string":
      return T(e);
    case "map":
      return uo(e);
    case "promise":
      return mo(e);
    case "error":
      return po(e);
    case "class":
      return ni(e);
    default:
      throw new Error(`No known test for type: ${a}`);
  }
}
function fo(a) {
  const e = [
    "array",
    "error",
    "class",
    "function",
    "map",
    "promise",
    "object",
    "integer",
    "number",
    "boolean",
    "string"
  ];
  for (let i of e)
    try {
      if ($n(i, a)) return i;
    } catch {
      return typeof a;
    }
}
const Yg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkType: $n,
  isArray: L,
  isArrayOfType: kn,
  isBoolean: q,
  isClass: ni,
  isError: po,
  isFunction: _,
  isInteger: k,
  isMap: uo,
  isNumber: P,
  isObject: v,
  isPromise: mo,
  isString: T,
  isValid: co,
  typeOf: fo
}, Symbol.toStringTag, { value: "Module" })), go = ["id", "class", "style", "alt", "width", "height", "title"], yo = [...go, "name", "type", "value", "default", "placeholder", "max", "min", "maxlenght", "src", "checked", "disabled", "pattern", "readonly", "required", "size", "step", "multiple", "autofocus", "list", "autocomplete"], mc = ["button", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];
function pc(a, e = document) {
  return e.getElementById(a);
}
function fc(a, e = document) {
  return e.getElementsByClassName(a);
}
function gc(a, e = document) {
  return e.getElementsByName(a);
}
function yc(a, e = document) {
  return e.getElementsByTagName(a);
}
function vo(a, e = document) {
  return e.querySelector(a);
}
function bo(a, e = document) {
  return e.querySelectorAll(a);
}
function vc(a) {
  return typeof Node == "object" ? a instanceof Node : a && typeof a == "object" && typeof a.nodeType == "number" && typeof a.nodeName == "string";
}
function W(a) {
  return typeof HTMLElement == "object" ? a instanceof HTMLElement : a && typeof a == "object" && a !== null && a.nodeType === 1 && typeof a.nodeName == "string";
}
function wt(a) {
  return W(a) ? !!a && !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length) : !1;
}
function Hn(a) {
  if (!W(a)) return !1;
  const e = a.getBoundingClientRect();
  return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function bc(a) {
  if (!W(a)) return !1;
  const e = getComputedStyle(a);
  if (e.display === "none" || e.visibility !== "visible" || parseFloat(e.opacity) < 0.1 || a.offsetWidth + a.offsetHeight + a.getBoundingClientRect().height + a.getBoundingClientRect().width === 0)
    return !1;
  const i = {
    x: a.getBoundingClientRect().left + a.offsetWidth / 2,
    y: a.getBoundingClientRect().top + a.offsetHeight / 2
  };
  if (i.x < 0 || i.x > (document.documentElement.clientWidth || window.innerWidth) || i.y < 0 || i.y > (document.documentElement.clientHeight || window.innerHeight))
    return !1;
  let s = document.elementFromPoint(i.x, i.y);
  do
    if (s === elem) return !0;
  while (s = s.parentNode);
  return !1;
}
function _n(a, e) {
  if (Bn(a)) {
    var i = window.URL || window.webkitURL || window;
    a = new Blob([a], { type: "image/svg+xml" }), a = i.createObjectURL(a);
  }
  const s = new Image();
  if (s.src = a, _(e))
    s.complete ? e(s) : (s.onload = () => e(s), s.onerror = () => e(!1));
  else
    return new Promise(function(n, r) {
      s.complete ? n(s) : (s.onload = () => n(s), s.onerror = () => r(!1));
    });
}
function Bn(a) {
  return T(a) ? /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/.test(a) : !1;
}
function wc(a) {
  return new Promise((e) => {
    if (document.querySelector(a))
      return e(document.querySelector(a));
    const i = new MutationObserver((s) => {
      document.querySelector(a) && (i.disconnect(), e(document.querySelector(a)));
    });
    i.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  });
}
function ve(a) {
  if (!W(a)) return !1;
  let e = 0, i = 0, s = a;
  for (; s && s.tagName.toLowerCase() != "body" && !isNaN(s.offsetLeft) && !isNaN(s.offsetTop); )
    e += s.offsetLeft - s.scrollLeft, i += s.offsetTop - s.scrollTop, s = s.offsetParent;
  const n = a.getBoundingClientRect();
  let r = n.right - n.left, o = n.bottom - n.top, l = wt(a), c = Hn(a);
  return {
    top: i,
    bottom: i + o,
    left: e,
    right: e + r,
    width: r,
    height: o,
    visible: l,
    viewport: c
  };
}
function xc(a, e) {
  if (!W(a) || !W(a)) return !1;
  const i = ve(a), s = ve(e);
  return {
    x: i.top - s.top,
    y: i.left - s.left,
    el1Location: i,
    el2Location: s
  };
}
function wo(a) {
  if (!T(a)) return !1;
  const e = document.createElement("template");
  return a = a.trim(), e.innerHTML = a, e.content.firstChild;
}
function Cc(a) {
  if (!T(a)) return !1;
  const e = document.createElement("template");
  return e.innerHTML = a, e.content.childNodes;
}
function qi(a, e, i) {
  if (!Bn(a) || !P(i?.w) || !P(i?.h))
    return !1;
  let s = i.w, n = i.h, r = document.createElement("canvas");
  r.width = s, r.height = n;
  let o = wo(a);
  o.style.fill = e, o.setAttribute("width", s), o.setAttribute("height", n), o.xmlns = "http://www.w3.org/2000/svg";
  let l = new XMLSerializer().serializeToString(o), f = "data:image/svg+xml;base64," + btoa(l), b = new Image();
  return b.setAttribute("width", s), b.setAttribute("height", n), b.onload = () => {
    r.getContext("2d").drawImage(b, 0, 0, s, n);
  }, b.src = f, b;
}
function Tc(a) {
  if (!W(a)) return !1;
  const e = (s) => {
    !a.contains(s.target) && wt(a) && (a.style.display = "none", i());
  }, i = () => {
    document.removeEventListener("click", e);
  };
  document.addEventListener("click", e);
}
function Sc(a, e) {
  if (!W(a)) return !1;
  const i = (n) => {
    !a.contains(n.target) && wt(a) && (e(), s());
  }, s = () => {
    document.removeEventListener("click", i);
  };
  document.addEventListener("click", i);
}
function xo(a, e) {
  let i, s;
  if (T(a)) i = document.getElementById(a);
  else if (W(a)) i = a;
  else return !1;
  const n = (i.ownerDocument || document).defaultView;
  return T(e) ? (n && n.getComputedStyle ? (e = e.replace(/([A-Z])/g, "-$1").toLowerCase(), s = document.defaultView.getComputedStyle(i, null).getPropertyValue(e)) : i.currentStyle && (s = i.currentStyle[e]), s) : !1;
}
function Ec(a, e, i, s) {
  let n = Fn(a, e, i, s);
  if (n) n.i >= 0 ? n.rules[n.i].style[n.property] = n.value : To(n.styleSheet, n.selector, n.rules, n.index);
  else return;
}
function Pc(a, e, i) {
  let s = Fn(a, e, i, "");
  (s.styleSheet.deleteRule || s.styleSheet.removeRule)(s.i);
}
function Fn(a, e, i, s) {
  if (!a || !v(a)) return null;
  if (a.constructor.name == "HTMLStyleElement")
    a = a.sheet;
  else if (a.constructor.name != "CSSStyleSheet") return null;
  let n = Co(e, i, s);
  e = n[0], i = n[1], s = n[2];
  const r = a.cssRules || a.rules;
  for (var o = r.length - 1; o > 0 && r[o].selectorText !== e; --o)
    ;
  return { styleSheet: a, rules: r, selector: e, property: i, value: s, i: o };
}
function Co(a, e, i) {
  return [
    a = a.toLowerCase().replace(/\s+/g, " "),
    e = e.toLowerCase(),
    i = i.toLowerCase()
  ];
}
function To(a, e, i, s) {
  a.insertRule ? a.insertRule(e + "{" + i + "}", s) : a.addRule(e, i, s);
}
function Un(a, e) {
  return !W(a) || !T(e) ? null : a.classList.contains(e) ? a : Un(a.parentElement, e);
}
function So(a, e) {
  let i = T(e?.entry) ? e?.entry : "", n = `${T(a) ? `<label for="${i}">${a}</label>` : ""}<input id="${i}" class="subject" `;
  for (let r in e)
    (yo.includes(r) || /^(data-[^\t\n\f \/>"'=]+)/g.test(r)) && (n += `${r}="${e[r]}" `);
  return n += `>
`;
}
function Mc(a, e) {
  let i = T(e?.entry) ? e?.entry : "", s = T(a) ? `<label for="${i}">${a}</label>` : "", n = "";
  for (let o in e?.options)
    n += `<option value="${e.options[o]}">${o}</option>`;
  return `${s}<select id="${i}" class="subject">${n}</select>
`;
}
const Kg = {
  addCSSRule: To,
  addStyleRule: Ec,
  deleteStyleRule: Pc,
  elementDimPos: ve,
  elementsDistance: xc,
  findByClass: fc,
  findByID: pc,
  findByName: gc,
  findBySelector: vo,
  findBySelectorAll: bo,
  findStyleRule: Fn,
  findTargetParentWithClass: Un,
  fndByTag: yc,
  getStyle: xo,
  hideOnClickOutside: Tc,
  htmlAttr: go,
  htmlInput: So,
  htmlToElement: wo,
  htmlToElements: Cc,
  inputAttr: yo,
  inputTypes: mc,
  isHTMLElement: W,
  isImage: _n,
  isInViewport: Hn,
  isNode: vc,
  isSVG: Bn,
  isVisible: wt,
  isVisibleToUser: bc,
  onClickOutside: Sc,
  styleRuleSanitize: Co,
  svgToImage: qi,
  waitForElm: wc
}, Lc = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || typeof navigator < "u" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));
const Ac = ((a) => typeof a < "u" && ("onorientationchange" in a || typeof a.matchMedia == "function" && a.matchMedia("(any-pointer:coarse)").matches || typeof navigator < "u" && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 || "ontouchstart" in a || a.DocumentTouch && document instanceof a.DocumentTouch)))(typeof window < "u" ? window : {}), Oc = {
  idle: 0,
  dragStart: 1,
  dragging: 2
};
class ft {
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
    P(e) && (this.#e = e);
  }
  get x() {
    return this.#e;
  }
  set y(e) {
    P(e) && (this.#t = e);
  }
  get y() {
    return this.#t;
  }
  clone() {
    return new ft(this.x, this.y);
  }
}
function Dc(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Eo = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(a) {
  (function(e, i, s, n) {
    var r = ["", "webkit", "Moz", "MS", "ms", "o"], o = i.createElement("div"), l = "function", c = Math.round, p = Math.abs, f = Date.now;
    function b(u, m, g) {
      return setTimeout(te(u, g), m);
    }
    function E(u, m, g) {
      return Array.isArray(u) ? (M(u, g[m], g), !0) : !1;
    }
    function M(u, m, g) {
      var C;
      if (u)
        if (u.forEach)
          u.forEach(m, g);
        else if (u.length !== n)
          for (C = 0; C < u.length; )
            m.call(g, u[C], C, u), C++;
        else
          for (C in u)
            u.hasOwnProperty(C) && m.call(g, u[C], C, u);
    }
    function D(u, m, g) {
      var C = "DEPRECATED METHOD: " + m + `
` + g + ` AT 
`;
      return function() {
        var S = new Error("get-stack-trace"), O = S && S.stack ? S.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", F = e.console && (e.console.warn || e.console.log);
        return F && F.call(e.console, C, O), u.apply(this, arguments);
      };
    }
    var N;
    typeof Object.assign != "function" ? N = function(m) {
      if (m === n || m === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var g = Object(m), C = 1; C < arguments.length; C++) {
        var S = arguments[C];
        if (S !== n && S !== null)
          for (var O in S)
            S.hasOwnProperty(O) && (g[O] = S[O]);
      }
      return g;
    } : N = Object.assign;
    var K = D(function(m, g, C) {
      for (var S = Object.keys(g), O = 0; O < S.length; )
        (!C || C && m[S[O]] === n) && (m[S[O]] = g[S[O]]), O++;
      return m;
    }, "extend", "Use `assign`."), oe = D(function(m, g) {
      return K(m, g, !0);
    }, "merge", "Use `assign`.");
    function $(u, m, g) {
      var C = m.prototype, S;
      S = u.prototype = Object.create(C), S.constructor = u, S._super = C, g && N(S, g);
    }
    function te(u, m) {
      return function() {
        return u.apply(m, arguments);
      };
    }
    function X(u, m) {
      return typeof u == l ? u.apply(m && m[0] || n, m) : u;
    }
    function I(u, m) {
      return u === n ? m : u;
    }
    function H(u, m, g) {
      M(Tt(m), function(C) {
        u.addEventListener(C, g, !1);
      });
    }
    function ue(u, m, g) {
      M(Tt(m), function(C) {
        u.removeEventListener(C, g, !1);
      });
    }
    function Me(u, m) {
      for (; u; ) {
        if (u == m)
          return !0;
        u = u.parentNode;
      }
      return !1;
    }
    function be(u, m) {
      return u.indexOf(m) > -1;
    }
    function Tt(u) {
      return u.trim().split(/\s+/g);
    }
    function Xe(u, m, g) {
      if (u.indexOf && !g)
        return u.indexOf(m);
      for (var C = 0; C < u.length; ) {
        if (g && u[C][g] == m || !g && u[C] === m)
          return C;
        C++;
      }
      return -1;
    }
    function mi(u) {
      return Array.prototype.slice.call(u, 0);
    }
    function yr(u, m, g) {
      for (var C = [], S = [], O = 0; O < u.length; ) {
        var F = u[O][m];
        Xe(S, F) < 0 && C.push(u[O]), S[O] = F, O++;
      }
      return C = C.sort(function(ce, ye) {
        return ce[m] > ye[m];
      }), C;
    }
    function pi(u, m) {
      for (var g, C, S = m[0].toUpperCase() + m.slice(1), O = 0; O < r.length; ) {
        if (g = r[O], C = g ? g + S : m, C in u)
          return C;
        O++;
      }
      return n;
    }
    var xh = 1;
    function Ch() {
      return xh++;
    }
    function vr(u) {
      var m = u.ownerDocument || u;
      return m.defaultView || m.parentWindow || e;
    }
    var Th = /mobile|tablet|ip(ad|hone|od)|android/i, br = "ontouchstart" in e, Sh = pi(e, "PointerEvent") !== n, Eh = br && Th.test(navigator.userAgent), Bt = "touch", Ph = "pen", gs = "mouse", Mh = "kinect", Lh = 25, ge = 1, ct = 2, J = 4, we = 8, fi = 1, Ft = 2, Ut = 4, zt = 8, Vt = 16, Be = Ft | Ut, ut = zt | Vt, wr = Be | ut, xr = ["x", "y"], gi = ["clientX", "clientY"];
    function Le(u, m) {
      var g = this;
      this.manager = u, this.callback = m, this.element = u.element, this.target = u.options.inputTarget, this.domHandler = function(C) {
        X(u.options.enable, [u]) && g.handler(C);
      }, this.init();
    }
    Le.prototype = {
      handler: function() {
      },
      init: function() {
        this.evEl && H(this.element, this.evEl, this.domHandler), this.evTarget && H(this.target, this.evTarget, this.domHandler), this.evWin && H(vr(this.element), this.evWin, this.domHandler);
      },
      destroy: function() {
        this.evEl && ue(this.element, this.evEl, this.domHandler), this.evTarget && ue(this.target, this.evTarget, this.domHandler), this.evWin && ue(vr(this.element), this.evWin, this.domHandler);
      }
    };
    function Ah(u) {
      var m, g = u.options.inputClass;
      return g ? m = g : Sh ? m = vs : Eh ? m = bi : br ? m = bs : m = vi, new m(u, Oh);
    }
    function Oh(u, m, g) {
      var C = g.pointers.length, S = g.changedPointers.length, O = m & ge && C - S === 0, F = m & (J | we) && C - S === 0;
      g.isFirst = !!O, g.isFinal = !!F, O && (u.session = {}), g.eventType = m, Dh(u, g), u.emit("hammer.input", g), u.recognize(g), u.session.prevInput = g;
    }
    function Dh(u, m) {
      var g = u.session, C = m.pointers, S = C.length;
      g.firstInput || (g.firstInput = Cr(m)), S > 1 && !g.firstMultiple ? g.firstMultiple = Cr(m) : S === 1 && (g.firstMultiple = !1);
      var O = g.firstInput, F = g.firstMultiple, le = F ? F.center : O.center, ce = m.center = Tr(C);
      m.timeStamp = f(), m.deltaTime = m.timeStamp - O.timeStamp, m.angle = ys(le, ce), m.distance = yi(le, ce), Ih(g, m), m.offsetDirection = Er(m.deltaX, m.deltaY);
      var ye = Sr(m.deltaTime, m.deltaX, m.deltaY);
      m.overallVelocityX = ye.x, m.overallVelocityY = ye.y, m.overallVelocity = p(ye.x) > p(ye.y) ? ye.x : ye.y, m.scale = F ? kh(F.pointers, C) : 1, m.rotation = F ? Rh(F.pointers, C) : 0, m.maxPointers = g.prevInput ? m.pointers.length > g.prevInput.maxPointers ? m.pointers.length : g.prevInput.maxPointers : m.pointers.length, Nh(g, m);
      var Ue = u.element;
      Me(m.srcEvent.target, Ue) && (Ue = m.srcEvent.target), m.target = Ue;
    }
    function Ih(u, m) {
      var g = m.center, C = u.offsetDelta || {}, S = u.prevDelta || {}, O = u.prevInput || {};
      (m.eventType === ge || O.eventType === J) && (S = u.prevDelta = {
        x: O.deltaX || 0,
        y: O.deltaY || 0
      }, C = u.offsetDelta = {
        x: g.x,
        y: g.y
      }), m.deltaX = S.x + (g.x - C.x), m.deltaY = S.y + (g.y - C.y);
    }
    function Nh(u, m) {
      var g = u.lastInterval || m, C = m.timeStamp - g.timeStamp, S, O, F, le;
      if (m.eventType != we && (C > Lh || g.velocity === n)) {
        var ce = m.deltaX - g.deltaX, ye = m.deltaY - g.deltaY, Ue = Sr(C, ce, ye);
        O = Ue.x, F = Ue.y, S = p(Ue.x) > p(Ue.y) ? Ue.x : Ue.y, le = Er(ce, ye), u.lastInterval = m;
      } else
        S = g.velocity, O = g.velocityX, F = g.velocityY, le = g.direction;
      m.velocity = S, m.velocityX = O, m.velocityY = F, m.direction = le;
    }
    function Cr(u) {
      for (var m = [], g = 0; g < u.pointers.length; )
        m[g] = {
          clientX: c(u.pointers[g].clientX),
          clientY: c(u.pointers[g].clientY)
        }, g++;
      return {
        timeStamp: f(),
        pointers: m,
        center: Tr(m),
        deltaX: u.deltaX,
        deltaY: u.deltaY
      };
    }
    function Tr(u) {
      var m = u.length;
      if (m === 1)
        return {
          x: c(u[0].clientX),
          y: c(u[0].clientY)
        };
      for (var g = 0, C = 0, S = 0; S < m; )
        g += u[S].clientX, C += u[S].clientY, S++;
      return {
        x: c(g / m),
        y: c(C / m)
      };
    }
    function Sr(u, m, g) {
      return {
        x: m / u || 0,
        y: g / u || 0
      };
    }
    function Er(u, m) {
      return u === m ? fi : p(u) >= p(m) ? u < 0 ? Ft : Ut : m < 0 ? zt : Vt;
    }
    function yi(u, m, g) {
      g || (g = xr);
      var C = m[g[0]] - u[g[0]], S = m[g[1]] - u[g[1]];
      return Math.sqrt(C * C + S * S);
    }
    function ys(u, m, g) {
      g || (g = xr);
      var C = m[g[0]] - u[g[0]], S = m[g[1]] - u[g[1]];
      return Math.atan2(S, C) * 180 / Math.PI;
    }
    function Rh(u, m) {
      return ys(m[1], m[0], gi) + ys(u[1], u[0], gi);
    }
    function kh(u, m) {
      return yi(m[0], m[1], gi) / yi(u[0], u[1], gi);
    }
    var $h = {
      mousedown: ge,
      mousemove: ct,
      mouseup: J
    }, Hh = "mousedown", _h = "mousemove mouseup";
    function vi() {
      this.evEl = Hh, this.evWin = _h, this.pressed = !1, Le.apply(this, arguments);
    }
    $(vi, Le, {
      handler: function(m) {
        var g = $h[m.type];
        g & ge && m.button === 0 && (this.pressed = !0), g & ct && m.which !== 1 && (g = J), this.pressed && (g & J && (this.pressed = !1), this.callback(this.manager, g, {
          pointers: [m],
          changedPointers: [m],
          pointerType: gs,
          srcEvent: m
        }));
      }
    });
    var Bh = {
      pointerdown: ge,
      pointermove: ct,
      pointerup: J,
      pointercancel: we,
      pointerout: we
    }, Fh = {
      2: Bt,
      3: Ph,
      4: gs,
      5: Mh
    }, Pr = "pointerdown", Mr = "pointermove pointerup pointercancel";
    e.MSPointerEvent && !e.PointerEvent && (Pr = "MSPointerDown", Mr = "MSPointerMove MSPointerUp MSPointerCancel");
    function vs() {
      this.evEl = Pr, this.evWin = Mr, Le.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    $(vs, Le, {
      handler: function(m) {
        var g = this.store, C = !1, S = m.type.toLowerCase().replace("ms", ""), O = Bh[S], F = Fh[m.pointerType] || m.pointerType, le = F == Bt, ce = Xe(g, m.pointerId, "pointerId");
        O & ge && (m.button === 0 || le) ? ce < 0 && (g.push(m), ce = g.length - 1) : O & (J | we) && (C = !0), !(ce < 0) && (g[ce] = m, this.callback(this.manager, O, {
          pointers: g,
          changedPointers: [m],
          pointerType: F,
          srcEvent: m
        }), C && g.splice(ce, 1));
      }
    });
    var Uh = {
      touchstart: ge,
      touchmove: ct,
      touchend: J,
      touchcancel: we
    }, zh = "touchstart", Vh = "touchstart touchmove touchend touchcancel";
    function Lr() {
      this.evTarget = zh, this.evWin = Vh, this.started = !1, Le.apply(this, arguments);
    }
    $(Lr, Le, {
      handler: function(m) {
        var g = Uh[m.type];
        if (g === ge && (this.started = !0), !!this.started) {
          var C = Wh.call(this, m, g);
          g & (J | we) && C[0].length - C[1].length === 0 && (this.started = !1), this.callback(this.manager, g, {
            pointers: C[0],
            changedPointers: C[1],
            pointerType: Bt,
            srcEvent: m
          });
        }
      }
    });
    function Wh(u, m) {
      var g = mi(u.touches), C = mi(u.changedTouches);
      return m & (J | we) && (g = yr(g.concat(C), "identifier")), [g, C];
    }
    var Gh = {
      touchstart: ge,
      touchmove: ct,
      touchend: J,
      touchcancel: we
    }, qh = "touchstart touchmove touchend touchcancel";
    function bi() {
      this.evTarget = qh, this.targetIds = {}, Le.apply(this, arguments);
    }
    $(bi, Le, {
      handler: function(m) {
        var g = Gh[m.type], C = jh.call(this, m, g);
        C && this.callback(this.manager, g, {
          pointers: C[0],
          changedPointers: C[1],
          pointerType: Bt,
          srcEvent: m
        });
      }
    });
    function jh(u, m) {
      var g = mi(u.touches), C = this.targetIds;
      if (m & (ge | ct) && g.length === 1)
        return C[g[0].identifier] = !0, [g, g];
      var S, O, F = mi(u.changedTouches), le = [], ce = this.target;
      if (O = g.filter(function(ye) {
        return Me(ye.target, ce);
      }), m === ge)
        for (S = 0; S < O.length; )
          C[O[S].identifier] = !0, S++;
      for (S = 0; S < F.length; )
        C[F[S].identifier] && le.push(F[S]), m & (J | we) && delete C[F[S].identifier], S++;
      if (le.length)
        return [
          yr(O.concat(le), "identifier"),
          le
        ];
    }
    var Xh = 2500, Ar = 25;
    function bs() {
      Le.apply(this, arguments);
      var u = te(this.handler, this);
      this.touch = new bi(this.manager, u), this.mouse = new vi(this.manager, u), this.primaryTouch = null, this.lastTouches = [];
    }
    $(bs, Le, {
      handler: function(m, g, C) {
        var S = C.pointerType == Bt, O = C.pointerType == gs;
        if (!(O && C.sourceCapabilities && C.sourceCapabilities.firesTouchEvents)) {
          if (S)
            Yh.call(this, g, C);
          else if (O && Kh.call(this, C))
            return;
          this.callback(m, g, C);
        }
      },
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function Yh(u, m) {
      u & ge ? (this.primaryTouch = m.changedPointers[0].identifier, Or.call(this, m)) : u & (J | we) && Or.call(this, m);
    }
    function Or(u) {
      var m = u.changedPointers[0];
      if (m.identifier === this.primaryTouch) {
        var g = { x: m.clientX, y: m.clientY };
        this.lastTouches.push(g);
        var C = this.lastTouches, S = function() {
          var O = C.indexOf(g);
          O > -1 && C.splice(O, 1);
        };
        setTimeout(S, Xh);
      }
    }
    function Kh(u) {
      for (var m = u.srcEvent.clientX, g = u.srcEvent.clientY, C = 0; C < this.lastTouches.length; C++) {
        var S = this.lastTouches[C], O = Math.abs(m - S.x), F = Math.abs(g - S.y);
        if (O <= Ar && F <= Ar)
          return !0;
      }
      return !1;
    }
    var Dr = pi(o.style, "touchAction"), Ir = Dr !== n, Nr = "compute", Rr = "auto", ws = "manipulation", dt = "none", Wt = "pan-x", Gt = "pan-y", wi = Qh();
    function xs(u, m) {
      this.manager = u, this.set(m);
    }
    xs.prototype = {
      set: function(u) {
        u == Nr && (u = this.compute()), Ir && this.manager.element.style && wi[u] && (this.manager.element.style[Dr] = u), this.actions = u.toLowerCase().trim();
      },
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      compute: function() {
        var u = [];
        return M(this.manager.recognizers, function(m) {
          X(m.options.enable, [m]) && (u = u.concat(m.getTouchAction()));
        }), Zh(u.join(" "));
      },
      preventDefaults: function(u) {
        var m = u.srcEvent, g = u.offsetDirection;
        if (this.manager.session.prevented) {
          m.preventDefault();
          return;
        }
        var C = this.actions, S = be(C, dt) && !wi[dt], O = be(C, Gt) && !wi[Gt], F = be(C, Wt) && !wi[Wt];
        if (S) {
          var le = u.pointers.length === 1, ce = u.distance < 2, ye = u.deltaTime < 250;
          if (le && ce && ye)
            return;
        }
        if (!(F && O) && (S || O && g & Be || F && g & ut))
          return this.preventSrc(m);
      },
      preventSrc: function(u) {
        this.manager.session.prevented = !0, u.preventDefault();
      }
    };
    function Zh(u) {
      if (be(u, dt))
        return dt;
      var m = be(u, Wt), g = be(u, Gt);
      return m && g ? dt : m || g ? m ? Wt : Gt : be(u, ws) ? ws : Rr;
    }
    function Qh() {
      if (!Ir)
        return !1;
      var u = {}, m = e.CSS && e.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(g) {
        u[g] = m ? e.CSS.supports("touch-action", g) : !0;
      }), u;
    }
    var xi = 1, Ae = 2, St = 4, Ye = 8, We = Ye, qt = 16, Fe = 32;
    function Ge(u) {
      this.options = N({}, this.defaults, u || {}), this.id = Ch(), this.manager = null, this.options.enable = I(this.options.enable, !0), this.state = xi, this.simultaneous = {}, this.requireFail = [];
    }
    Ge.prototype = {
      defaults: {},
      set: function(u) {
        return N(this.options, u), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function(u) {
        if (E(u, "recognizeWith", this))
          return this;
        var m = this.simultaneous;
        return u = Ci(u, this), m[u.id] || (m[u.id] = u, u.recognizeWith(this)), this;
      },
      dropRecognizeWith: function(u) {
        return E(u, "dropRecognizeWith", this) ? this : (u = Ci(u, this), delete this.simultaneous[u.id], this);
      },
      requireFailure: function(u) {
        if (E(u, "requireFailure", this))
          return this;
        var m = this.requireFail;
        return u = Ci(u, this), Xe(m, u) === -1 && (m.push(u), u.requireFailure(this)), this;
      },
      dropRequireFailure: function(u) {
        if (E(u, "dropRequireFailure", this))
          return this;
        u = Ci(u, this);
        var m = Xe(this.requireFail, u);
        return m > -1 && this.requireFail.splice(m, 1), this;
      },
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function(u) {
        return !!this.simultaneous[u.id];
      },
      emit: function(u) {
        var m = this, g = this.state;
        function C(S) {
          m.manager.emit(S, u);
        }
        g < Ye && C(m.options.event + kr(g)), C(m.options.event), u.additionalEvent && C(u.additionalEvent), g >= Ye && C(m.options.event + kr(g));
      },
      tryEmit: function(u) {
        if (this.canEmit())
          return this.emit(u);
        this.state = Fe;
      },
      canEmit: function() {
        for (var u = 0; u < this.requireFail.length; ) {
          if (!(this.requireFail[u].state & (Fe | xi)))
            return !1;
          u++;
        }
        return !0;
      },
      recognize: function(u) {
        var m = N({}, u);
        if (!X(this.options.enable, [this, m])) {
          this.reset(), this.state = Fe;
          return;
        }
        this.state & (We | qt | Fe) && (this.state = xi), this.state = this.process(m), this.state & (Ae | St | Ye | qt) && this.tryEmit(m);
      },
      process: function(u) {
      },
      getTouchAction: function() {
      },
      reset: function() {
      }
    };
    function kr(u) {
      return u & qt ? "cancel" : u & Ye ? "end" : u & St ? "move" : u & Ae ? "start" : "";
    }
    function $r(u) {
      return u == Vt ? "down" : u == zt ? "up" : u == Ft ? "left" : u == Ut ? "right" : "";
    }
    function Ci(u, m) {
      var g = m.manager;
      return g ? g.get(u) : u;
    }
    function ke() {
      Ge.apply(this, arguments);
    }
    $(ke, Ge, {
      defaults: {
        pointers: 1
      },
      attrTest: function(u) {
        var m = this.options.pointers;
        return m === 0 || u.pointers.length === m;
      },
      process: function(u) {
        var m = this.state, g = u.eventType, C = m & (Ae | St), S = this.attrTest(u);
        return C && (g & we || !S) ? m | qt : C || S ? g & J ? m | Ye : m & Ae ? m | St : Ae : Fe;
      }
    });
    function Ti() {
      ke.apply(this, arguments), this.pX = null, this.pY = null;
    }
    $(Ti, ke, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: wr
      },
      getTouchAction: function() {
        var u = this.options.direction, m = [];
        return u & Be && m.push(Gt), u & ut && m.push(Wt), m;
      },
      directionTest: function(u) {
        var m = this.options, g = !0, C = u.distance, S = u.direction, O = u.deltaX, F = u.deltaY;
        return S & m.direction || (m.direction & Be ? (S = O === 0 ? fi : O < 0 ? Ft : Ut, g = O != this.pX, C = Math.abs(u.deltaX)) : (S = F === 0 ? fi : F < 0 ? zt : Vt, g = F != this.pY, C = Math.abs(u.deltaY))), u.direction = S, g && C > m.threshold && S & m.direction;
      },
      attrTest: function(u) {
        return ke.prototype.attrTest.call(this, u) && (this.state & Ae || !(this.state & Ae) && this.directionTest(u));
      },
      emit: function(u) {
        this.pX = u.deltaX, this.pY = u.deltaY;
        var m = $r(u.direction);
        m && (u.additionalEvent = this.options.event + m), this._super.emit.call(this, u);
      }
    });
    function Cs() {
      ke.apply(this, arguments);
    }
    $(Cs, ke, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [dt];
      },
      attrTest: function(u) {
        return this._super.attrTest.call(this, u) && (Math.abs(u.scale - 1) > this.options.threshold || this.state & Ae);
      },
      emit: function(u) {
        if (u.scale !== 1) {
          var m = u.scale < 1 ? "in" : "out";
          u.additionalEvent = this.options.event + m;
        }
        this._super.emit.call(this, u);
      }
    });
    function Ts() {
      Ge.apply(this, arguments), this._timer = null, this._input = null;
    }
    $(Ts, Ge, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function() {
        return [Rr];
      },
      process: function(u) {
        var m = this.options, g = u.pointers.length === m.pointers, C = u.distance < m.threshold, S = u.deltaTime > m.time;
        if (this._input = u, !C || !g || u.eventType & (J | we) && !S)
          this.reset();
        else if (u.eventType & ge)
          this.reset(), this._timer = b(function() {
            this.state = We, this.tryEmit();
          }, m.time, this);
        else if (u.eventType & J)
          return We;
        return Fe;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(u) {
        this.state === We && (u && u.eventType & J ? this.manager.emit(this.options.event + "up", u) : (this._input.timeStamp = f(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Ss() {
      ke.apply(this, arguments);
    }
    $(Ss, ke, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [dt];
      },
      attrTest: function(u) {
        return this._super.attrTest.call(this, u) && (Math.abs(u.rotation) > this.options.threshold || this.state & Ae);
      }
    });
    function Es() {
      ke.apply(this, arguments);
    }
    $(Es, ke, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: Be | ut,
        pointers: 1
      },
      getTouchAction: function() {
        return Ti.prototype.getTouchAction.call(this);
      },
      attrTest: function(u) {
        var m = this.options.direction, g;
        return m & (Be | ut) ? g = u.overallVelocity : m & Be ? g = u.overallVelocityX : m & ut && (g = u.overallVelocityY), this._super.attrTest.call(this, u) && m & u.offsetDirection && u.distance > this.options.threshold && u.maxPointers == this.options.pointers && p(g) > this.options.velocity && u.eventType & J;
      },
      emit: function(u) {
        var m = $r(u.offsetDirection);
        m && this.manager.emit(this.options.event + m, u), this.manager.emit(this.options.event, u);
      }
    });
    function Si() {
      Ge.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    $(Si, Ge, {
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
        return [ws];
      },
      process: function(u) {
        var m = this.options, g = u.pointers.length === m.pointers, C = u.distance < m.threshold, S = u.deltaTime < m.time;
        if (this.reset(), u.eventType & ge && this.count === 0)
          return this.failTimeout();
        if (C && S && g) {
          if (u.eventType != J)
            return this.failTimeout();
          var O = this.pTime ? u.timeStamp - this.pTime < m.interval : !0, F = !this.pCenter || yi(this.pCenter, u.center) < m.posThreshold;
          this.pTime = u.timeStamp, this.pCenter = u.center, !F || !O ? this.count = 1 : this.count += 1, this._input = u;
          var le = this.count % m.taps;
          if (le === 0)
            return this.hasRequireFailures() ? (this._timer = b(function() {
              this.state = We, this.tryEmit();
            }, m.interval, this), Ae) : We;
        }
        return Fe;
      },
      failTimeout: function() {
        return this._timer = b(function() {
          this.state = Fe;
        }, this.options.interval, this), Fe;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == We && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function Ke(u, m) {
      return m = m || {}, m.recognizers = I(m.recognizers, Ke.defaults.preset), new Ps(u, m);
    }
    Ke.VERSION = "2.0.7", Ke.defaults = {
      domEvents: !1,
      touchAction: Nr,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [
        [Ss, { enable: !1 }],
        [Cs, { enable: !1 }, ["rotate"]],
        [Es, { direction: Be }],
        [Ti, { direction: Be }, ["swipe"]],
        [Si],
        [Si, { event: "doubletap", taps: 2 }, ["tap"]],
        [Ts]
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
    var Jh = 1, Hr = 2;
    function Ps(u, m) {
      this.options = N({}, Ke.defaults, m || {}), this.options.inputTarget = this.options.inputTarget || u, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = u, this.input = Ah(this), this.touchAction = new xs(this, this.options.touchAction), _r(this, !0), M(this.options.recognizers, function(g) {
        var C = this.add(new g[0](g[1]));
        g[2] && C.recognizeWith(g[2]), g[3] && C.requireFailure(g[3]);
      }, this);
    }
    Ps.prototype = {
      set: function(u) {
        return N(this.options, u), u.touchAction && this.touchAction.update(), u.inputTarget && (this.input.destroy(), this.input.target = u.inputTarget, this.input.init()), this;
      },
      stop: function(u) {
        this.session.stopped = u ? Hr : Jh;
      },
      recognize: function(u) {
        var m = this.session;
        if (!m.stopped) {
          this.touchAction.preventDefaults(u);
          var g, C = this.recognizers, S = m.curRecognizer;
          (!S || S && S.state & We) && (S = m.curRecognizer = null);
          for (var O = 0; O < C.length; )
            g = C[O], m.stopped !== Hr && (!S || g == S || g.canRecognizeWith(S)) ? g.recognize(u) : g.reset(), !S && g.state & (Ae | St | Ye) && (S = m.curRecognizer = g), O++;
        }
      },
      get: function(u) {
        if (u instanceof Ge)
          return u;
        for (var m = this.recognizers, g = 0; g < m.length; g++)
          if (m[g].options.event == u)
            return m[g];
        return null;
      },
      add: function(u) {
        if (E(u, "add", this))
          return this;
        var m = this.get(u.options.event);
        return m && this.remove(m), this.recognizers.push(u), u.manager = this, this.touchAction.update(), u;
      },
      remove: function(u) {
        if (E(u, "remove", this))
          return this;
        if (u = this.get(u), u) {
          var m = this.recognizers, g = Xe(m, u);
          g !== -1 && (m.splice(g, 1), this.touchAction.update());
        }
        return this;
      },
      on: function(u, m) {
        if (u !== n && m !== n) {
          var g = this.handlers;
          return M(Tt(u), function(C) {
            g[C] = g[C] || [], g[C].push(m);
          }), this;
        }
      },
      off: function(u, m) {
        if (u !== n) {
          var g = this.handlers;
          return M(Tt(u), function(C) {
            m ? g[C] && g[C].splice(Xe(g[C], m), 1) : delete g[C];
          }), this;
        }
      },
      emit: function(u, m) {
        this.options.domEvents && ec(u, m);
        var g = this.handlers[u] && this.handlers[u].slice();
        if (!(!g || !g.length)) {
          m.type = u, m.preventDefault = function() {
            m.srcEvent.preventDefault();
          };
          for (var C = 0; C < g.length; )
            g[C](m), C++;
        }
      },
      destroy: function() {
        this.element && _r(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function _r(u, m) {
      var g = u.element;
      if (g.style) {
        var C;
        M(u.options.cssProps, function(S, O) {
          C = pi(g.style, O), m ? (u.oldCssProps[C] = g.style[C], g.style[C] = S) : g.style[C] = u.oldCssProps[C] || "";
        }), m || (u.oldCssProps = {});
      }
    }
    function ec(u, m) {
      var g = i.createEvent("Event");
      g.initEvent(u, !0, !0), g.gesture = m, m.target.dispatchEvent(g);
    }
    N(Ke, {
      INPUT_START: ge,
      INPUT_MOVE: ct,
      INPUT_END: J,
      INPUT_CANCEL: we,
      STATE_POSSIBLE: xi,
      STATE_BEGAN: Ae,
      STATE_CHANGED: St,
      STATE_ENDED: Ye,
      STATE_RECOGNIZED: We,
      STATE_CANCELLED: qt,
      STATE_FAILED: Fe,
      DIRECTION_NONE: fi,
      DIRECTION_LEFT: Ft,
      DIRECTION_RIGHT: Ut,
      DIRECTION_UP: zt,
      DIRECTION_DOWN: Vt,
      DIRECTION_HORIZONTAL: Be,
      DIRECTION_VERTICAL: ut,
      DIRECTION_ALL: wr,
      Manager: Ps,
      Input: Le,
      TouchAction: xs,
      TouchInput: bi,
      MouseInput: vi,
      PointerEventInput: vs,
      TouchMouseInput: bs,
      SingleTouchInput: Lr,
      Recognizer: Ge,
      AttrRecognizer: ke,
      Tap: Si,
      Pan: Ti,
      Swipe: Es,
      Pinch: Cs,
      Rotate: Ss,
      Press: Ts,
      on: H,
      off: ue,
      each: M,
      merge: oe,
      extend: K,
      assign: N,
      inherit: $,
      bindFn: te,
      prefixed: pi
    });
    var tc = typeof e < "u" ? e : typeof self < "u" ? self : {};
    tc.Hammer = Ke, a.exports ? a.exports = Ke : e[s] = Ke;
  })(window, document, "Hammer");
})(Eo);
var ui = Eo.exports;
const Ic = Dc(ui), ze = /* @__PURE__ */ ic({
  __proto__: null,
  default: Ic
}, [ui]), Po = 1, Mo = 2, cn = 4, Nc = {
  mousedown: Po,
  mousemove: Mo,
  mouseup: cn
};
function Rc(a, e) {
  for (let i = 0; i < a.length; i++)
    if (e(a[i]))
      return !0;
  return !1;
}
function kc(a) {
  const e = a.prototype.handler;
  a.prototype.handler = function(s) {
    const n = this.store;
    s.button > 0 && s.type === "pointerdown" && (Rc(n, (r) => r.pointerId === s.pointerId) || n.push(s)), e.call(this, s);
  };
}
function $c(a) {
  a.prototype.handler = function(i) {
    let s = Nc[i.type];
    s & Po && i.button >= 0 && (this.pressed = !0), s & Mo && i.which === 0 && (s = cn), this.pressed && (s & cn && (this.pressed = !1), this.callback(this.manager, s, {
      pointers: [i],
      changedPointers: [i],
      pointerType: "mouse",
      srcEvent: i
    }));
  };
}
kc(ui.PointerEventInput);
$c(ui.MouseInput);
const Hc = ui.Manager;
let ns = class {
  constructor(e, i, s) {
    this.element = e, this.callback = i, this.options = { enable: !0, ...s };
  }
};
const _c = ze ? [
  [ze.Pan, { event: "tripan", pointers: 3, threshold: 0, enable: !1 }],
  [ze.Rotate, { enable: !1 }],
  [ze.Pinch, { enable: !1 }],
  [ze.Swipe, { enable: !1 }],
  [ze.Pan, { threshold: 0, enable: !1 }],
  [ze.Press, { enable: !1 }],
  [ze.Tap, { event: "doubletap", taps: 2, enable: !1 }],
  [ze.Tap, { event: "anytap", enable: !1 }],
  [ze.Tap, { enable: !1 }]
] : null, Gr = {
  tripan: ["rotate", "pinch", "pan"],
  rotate: ["pinch"],
  pinch: ["pan"],
  pan: ["press", "doubletap", "anytap", "tap"],
  doubletap: ["anytap"],
  anytap: ["tap"]
}, Bc = {
  doubletap: ["tap"]
}, Fc = {
  pointerdown: "pointerdown",
  pointermove: "pointermove",
  pointerup: "pointerup",
  touchstart: "pointerdown",
  touchmove: "pointermove",
  touchend: "pointerup",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup"
}, zn = {
  KEY_EVENTS: ["keydown", "keyup"],
  MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
  WHEEL_EVENTS: [
    "wheel",
    "mousewheel"
  ]
}, Uc = {
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
}, qr = {
  click: "tap",
  anyclick: "anytap",
  dblclick: "doubletap",
  mousedown: "pointerdown",
  mousemove: "pointermove",
  mouseup: "pointerup",
  mouseover: "pointerover",
  mouseout: "pointerout",
  mouseleave: "pointerleave"
}, zc = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "", At = typeof window < "u" ? window : global;
let un = !1;
try {
  const a = {
    get passive() {
      return un = !0, !0;
    }
  };
  At.addEventListener("test", null, a), At.removeEventListener("test", null);
} catch {
  un = !1;
}
const Vc = zc.indexOf("firefox") !== -1, { WHEEL_EVENTS: Wc } = zn, jr = "wheel", Xr = 4.000244140625, Gc = 40, qc = 0.25;
class jc extends ns {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      if (!this.options.enable)
        return;
      let r = n.deltaY;
      At.WheelEvent && (Vc && n.deltaMode === At.WheelEvent.DOM_DELTA_PIXEL && (r /= At.devicePixelRatio), n.deltaMode === At.WheelEvent.DOM_DELTA_LINE && (r *= Gc)), r !== 0 && r % Xr === 0 && (r = Math.floor(r / Xr)), n.shiftKey && r && (r = r * qc), this.callback({
        type: jr,
        center: {
          x: n.clientX,
          y: n.clientY
        },
        delta: -r,
        srcEvent: n,
        pointerType: "mouse",
        target: n.target
      });
    }, this.events = (this.options.events || []).concat(Wc), this.events.forEach((n) => e.addEventListener(n, this.handleEvent, un ? { passive: !1 } : !1));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === jr && (this.options.enable = i);
  }
}
const { MOUSE_EVENTS: Xc } = zn, Yr = "pointermove", Kr = "pointerover", Zr = "pointerout", Qr = "pointerenter", Jr = "pointerleave";
class Yc extends ns {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (r) => {
      this.handleOverEvent(r), this.handleOutEvent(r), this.handleEnterEvent(r), this.handleLeaveEvent(r), this.handleMoveEvent(r);
    }, this.pressed = !1;
    const { enable: n } = this.options;
    this.enableMoveEvent = n, this.enableLeaveEvent = n, this.enableEnterEvent = n, this.enableOutEvent = n, this.enableOverEvent = n, this.events = (this.options.events || []).concat(Xc), this.events.forEach((r) => e.addEventListener(r, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === Yr && (this.enableMoveEvent = i), e === Kr && (this.enableOverEvent = i), e === Zr && (this.enableOutEvent = i), e === Qr && (this.enableEnterEvent = i), e === Jr && (this.enableLeaveEvent = i);
  }
  handleOverEvent(e) {
    this.enableOverEvent && e.type === "mouseover" && this._emit(Kr, e);
  }
  handleOutEvent(e) {
    this.enableOutEvent && e.type === "mouseout" && this._emit(Zr, e);
  }
  handleEnterEvent(e) {
    this.enableEnterEvent && e.type === "mouseenter" && this._emit(Qr, e);
  }
  handleLeaveEvent(e) {
    this.enableLeaveEvent && e.type === "mouseleave" && this._emit(Jr, e);
  }
  handleMoveEvent(e) {
    if (this.enableMoveEvent)
      switch (e.type) {
        case "mousedown":
          e.button >= 0 && (this.pressed = !0);
          break;
        case "mousemove":
          e.which === 0 && (this.pressed = !1), this.pressed || this._emit(Yr, e);
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
const { KEY_EVENTS: Kc } = zn, ea = "keydown", ta = "keyup";
class Zc extends ns {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      const r = n.target || n.srcElement;
      r.tagName === "INPUT" && r.type === "text" || r.tagName === "TEXTAREA" || (this.enableDownEvent && n.type === "keydown" && this.callback({
        type: ea,
        srcEvent: n,
        key: n.key,
        target: n.target
      }), this.enableUpEvent && n.type === "keyup" && this.callback({
        type: ta,
        srcEvent: n,
        key: n.key,
        target: n.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(Kc), e.tabIndex = this.options.tabIndex || 0, e.style.outline = "none", this.events.forEach((n) => e.addEventListener(n, this.handleEvent));
  }
  destroy() {
    this.events.forEach((e) => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === ea && (this.enableDownEvent = i), e === ta && (this.enableUpEvent = i);
  }
}
const ia = "contextmenu";
class Qc extends ns {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = (n) => {
      this.options.enable && this.callback({
        type: ia,
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
    e === ia && (this.options.enable = i);
  }
}
const dn = 1, ji = 2, mn = 4, Jc = {
  pointerdown: dn,
  pointermove: ji,
  pointerup: mn,
  mousedown: dn,
  mousemove: ji,
  mouseup: mn
}, eu = 1, tu = 2, iu = 3, su = 0, nu = 1, ru = 2, au = 1, ou = 2, lu = 4;
function hu(a) {
  const e = Jc[a.srcEvent.type];
  if (!e)
    return null;
  const { buttons: i, button: s, which: n } = a.srcEvent;
  let r = !1, o = !1, l = !1;
  return e === mn || e === ji && !Number.isFinite(i) ? (r = n === eu, o = n === tu, l = n === iu) : e === ji ? (r = !!(i & au), o = !!(i & lu), l = !!(i & ou)) : e === dn && (r = s === su, o = s === nu, l = s === ru), { leftButton: r, middleButton: o, rightButton: l };
}
function cu(a, e) {
  const i = a.center;
  if (!i)
    return null;
  const s = e.getBoundingClientRect(), n = s.width / e.offsetWidth || 1, r = s.height / e.offsetHeight || 1, o = {
    x: (i.x - s.left - e.clientLeft) / n,
    y: (i.y - s.top - e.clientTop) / r
  };
  return { center: i, offsetCenter: o };
}
const Ms = {
  srcElement: "root",
  priority: 0
};
class uu {
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
    const { handlers: o, handlersByElement: l } = this;
    let c = Ms;
    typeof s == "string" || s && s.addEventListener ? c = { ...Ms, srcElement: s } : s && (c = { ...Ms, ...s });
    let p = l.get(c.srcElement);
    p || (p = [], l.set(c.srcElement, p));
    const f = {
      type: e,
      handler: i,
      srcElement: c.srcElement,
      priority: c.priority
    };
    n && (f.once = !0), r && (f.passive = !0), o.push(f), this._active = this._active || !f.passive;
    let b = p.length - 1;
    for (; b >= 0 && !(p[b].priority >= f.priority); )
      b--;
    p.splice(b + 1, 0, f);
  }
  remove(e, i) {
    const { handlers: s, handlersByElement: n } = this;
    for (let r = s.length - 1; r >= 0; r--) {
      const o = s[r];
      if (o.type === e && o.handler === i) {
        s.splice(r, 1);
        const l = n.get(o.srcElement);
        l.splice(l.indexOf(o), 1), l.length === 0 && n.delete(o.srcElement);
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
      }, o = () => {
        e.handled = !0, n = !0;
      }, l = [];
      for (let c = 0; c < s.length; c++) {
        const { type: p, handler: f, once: b } = s[c];
        if (f({
          ...e,
          type: p,
          stopPropagation: r,
          stopImmediatePropagation: o
        }), b && l.push(s[c]), n)
          break;
      }
      for (let c = 0; c < l.length; c++) {
        const { type: p, handler: f } = l[c];
        this.remove(p, f);
      }
    }
  }
  _normalizeEvent(e) {
    const i = this.eventManager.getElement();
    return {
      ...e,
      ...hu(e),
      ...cu(e, i),
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
const du = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: Hc,
  touchAction: "none",
  tabIndex: 0
};
class mu {
  constructor(e = null, i) {
    this._onBasicInput = (n) => {
      const { srcEvent: r } = n, o = Fc[r.type];
      o && this.manager.emit(o, n);
    }, this._onOtherEvent = (n) => {
      this.manager.emit(n.type, n);
    }, this.options = { ...du, ...i }, this.events = /* @__PURE__ */ new Map(), this.setElement(e);
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
      recognizers: i.recognizers || _c
    }).on("hammer.input", this._onBasicInput), i.recognizers || Object.keys(Gr).forEach((n) => {
      const r = this.manager.get(n);
      r && Gr[n].forEach((o) => {
        r.recognizeWith(o);
      });
    });
    for (const n in i.recognizerOptions) {
      const r = this.manager.get(n);
      if (r) {
        const o = i.recognizerOptions[n];
        delete o.enable, r.set(o);
      }
    }
    this.wheelInput = new jc(e, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new Yc(e, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new Zc(e, this._onOtherEvent, {
      enable: !1,
      tabIndex: i.tabIndex
    }), this.contextmenuInput = new Qc(e, this._onOtherEvent, {
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
      const r = Bc[e];
      r && !this.options.recognizers && r.forEach((o) => {
        const l = s.get(o);
        i ? (l.requireFailure(e), n.dropRequireFailure(o)) : l.dropRequireFailure(e);
      });
    }
    this.wheelInput.enableEventType(e, i), this.moveInput.enableEventType(e, i), this.keyInput.enableEventType(e, i), this.contextmenuInput.enableEventType(e, i);
  }
  _addEventHandler(e, i, s, n, r) {
    if (typeof e != "string") {
      s = i;
      for (const f in e)
        this._addEventHandler(f, e[f], s, n, r);
      return;
    }
    const { manager: o, events: l } = this, c = qr[e] || e;
    let p = l.get(c);
    p || (p = new uu(this), l.set(c, p), p.recognizerName = Uc[c] || c, o && o.on(c, p.handleEvent)), p.add(e, i, s, n, r), p.isEmpty() || this._toggleRecognizer(p.recognizerName, !0);
  }
  _removeEventHandler(e, i) {
    if (typeof e != "string") {
      for (const o in e)
        this._removeEventHandler(o, e[o]);
      return;
    }
    const { events: s } = this, n = qr[e] || e, r = s.get(n);
    if (r && (r.remove(e, i), r.isEmpty())) {
      const { recognizerName: o } = r;
      let l = !1;
      for (const c of s.values())
        if (c.recognizerName === o && !c.isEmpty()) {
          l = !0;
          break;
        }
      l || this._toggleRecognizer(o, !1);
    }
  }
}
class sa {
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
  #i = {
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
        r = function(o) {
          o.leftButton && (this.#t.pad.left = !0), this.#t.onPointerDown(o), i(this.#t.pointerEventData(o));
        };
        break;
      case "pointerup":
        r = function(o) {
          this.#t.onPointerUp(o), i(this.#t.pointerEventData(o));
        };
        break;
      case "pointermove":
        r = function(o) {
          this.#t.motion(o), i(this.#t.pointerEventData(o));
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
          this.#t.location(o), i(this.#t.pointerEventData(o));
        };
        break;
      case "wheel":
        r = function(o) {
          this.#t.wheeldelta = o, i(this.#t.pointerEventData(o));
        };
        break;
      case "pointercancel":
      case "gotpointercapture":
      case "lostpointercapture":
        r = function(o) {
          i(o);
        };
        break;
      case "pointerdrag":
        r = function(o) {
          this.#t.motion(o), i(this.#t.pointerEventData(o));
        }, this.#t.agent.on("panstart", this.#t.startPointerDrag.bind(this.#t)), e = "panmove";
        break;
      case "pointerdragend":
        r = function(o) {
          this.#t.motion(o), this.#t.endPointerDrag(o), i(this.#t.pointerEventData(o));
        }, e = "panend";
        break;
    }
    return n ? this.#t.agent.once(e, r.bind(this), s) : this.#t.agent.on(e, r.bind(this), s), r;
  }
  off(e, i, s) {
    this.#t.agent.off(e, i, s);
  }
}
class na {
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
class ra {
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
const pu = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class Ve {
  #e;
  #t;
  #i;
  #n;
  #s = [];
  #r = null;
  #a = null;
  #o = null;
  #c;
  #l = !1;
  #u;
  pad = { left: !1 };
  constructor(e, i) {
    if (this.#e = { ...pu, ...i }, this.#n = Oc.idle, this.#c = Ac, this.#t = e, !this.#t && this.#e.elementId && (this.#t = document.getElementById(this.#e.elementId)), !W(this.#t))
      throw "Must specify an element to receive user input.";
    this.#e.contextMenu || (window.oncontextmenu = (r) => (r.preventDefault(), !1));
    const n = {
      recognizerOptions: {
        pan: { threshold: this.#c ? 10 : 0 },
        pinch: { threshold: 0 }
      }
    };
    this.#i = new mu(this.#t, n), this.pointerInit();
  }
  get agent() {
    return this.#i;
  }
  get pointer() {
    return this.#r instanceof sa ? this.#r : (this.#r = new sa(this), this.#r);
  }
  get touch() {
    return this.#o instanceof na ? this.#o : (this.#o = new na(this), this.#o);
  }
  get key() {
    return this.#a instanceof ra ? this.#a : (this.#a = new ra(this), this.#a);
  }
  get status() {
    return this.#n;
  }
  get element() {
    return this.#t;
  }
  get isTouch() {
    return this.#c;
  }
  get isPan() {
    return this.#l;
  }
  set wheeldelta(e) {
    this.#u = e.delta;
  }
  get wheeldelta() {
    return this.#u;
  }
  destroy() {
    for (let e of this.#s)
      this.off(e.event, e.handler, e.options);
    this.#i.destroy(), this.#r = void 0, this.#a = void 0, this.#o = void 0;
  }
  isValid(e, i) {
    return !!(T(e) || _(i));
  }
  validOptions(e) {
    return v(e) && q(e) ? e : void 0;
  }
  on(e, i, s, n = !1) {
    if (!this.isValid(e, i)) return !1;
    this.pointer.has(e) ? this.#r.on(e, i, s, n) : this.touch.has(e) ? this.#o.on(e, i, s, n) : this.key.has(e) ? this.#a.on(e, i, s, n) : this.#t.addEventListener(e, i, this.validOptions(s)), this.#s.push({ event: e, handler: i, options: s });
  }
  off(e, i, s) {
    this.#r?.has(e) ? this.#r.off(e, i, s) : this.#o?.has(e) ? this.#o.off(e, i, s) : this.#a?.has(e) ? this.#a.off(e, i, s) : this.#t.removeEventListener(e, i, this.validOptions(s));
    for (let n of this.#s)
      if (n.event === e && n.handler === i && n.options === s) {
        let r = this.#s.indexOf(n);
        this.#s.splice(r, 1);
      }
  }
  once(e, i, s) {
    this.on(e, i, s, !0);
  }
  setCursor(e) {
    this.#t.style.cursor = e;
  }
  pointerInit() {
    this.clientPosPrev = new ft([null, null]), this.position = new ft([0, 0]), this.movement = new ft([0, 0]), this.dragstart = new ft([null, null]), this.dragend = new ft([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
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
function fu(a, e) {
  return a = Math.ceil(a) + 1, e = Math.floor(e), Math.floor(Math.random() * (e - a) + a);
}
function Ii(a) {
  const e = {};
  return e.value = a, e.sign = !!a, e.integers = Lo(a), e.decimals = gu(a), e.total = e.integers + e.decimals, e;
}
function Lo(a) {
  return (Math.log10((a ^ a >> 31) - (a >> 31)) | 0) + 1;
}
function He(a, e = 0) {
  var i = a * Math.pow(10, e), s = Math.round(i), n = (i > 0 ? i : -i) % 1 === 0.5 ? s % 2 === 0 ? s : s - 1 : s;
  return n / Math.pow(10, e);
}
function gu(a) {
  if (typeof a != "number" && (a = parseFloat(a)), isNaN(a) || !isFinite(a)) return 0;
  for (var e = 1, i = 0; Math.round(a * e) / e !== a && (e *= 10, e !== 1 / 0); )
    i++;
  return i;
}
function pn(a, e) {
  if (a == 0) return "0";
  const i = Ii(a);
  if (k(e))
    return `${new Number(i.value).toFixed(e)}`;
  let { sign: s, integers: n, decimals: r, value: o } = i;
  e = isNaN(e) ? ho : e, r = U(r, 0, e), o = new Number(o).toFixed(r);
  let l = `${o}`, c = "", p = 0, f = 0;
  return s = s ? 0 : 1, s > 0 && (c += "-", p++), n == 0 ? (c += "0", p++) : (c += l.slice(p, n), p += n), r != 0 && (c += `${l.slice(p)}`, n <= 1 ? f = r : n > 3 ? f = 2 : n >= 2 && (f = 3)), c = Number.parseFloat(c).toFixed(f), c;
}
function yu(a) {
  return Math.log(a) / Math.log(10);
}
function U(a, e, i) {
  return Math.min(i, Math.max(e, a));
}
let vu = Object.prototype.hasOwnProperty;
function bu(a, e, i = void 0) {
  const s = (r) => String.prototype.split.call(e, r).filter(Boolean).reduce((o, l) => o != null ? o[l] : o, a), n = s(/[,[\]]+?/) || s(/[,[\].]+?/);
  return n === void 0 || n === a ? i : n;
}
function wu(a, e, i) {
  if (e.length === 0)
    return;
  let s = a, n = e[e.length - 1];
  if (e.length === 1)
    return v(s) ? s[n] = i : void 0;
  for (let r = 0; r < e.length - 1; r++) {
    let o = e[r];
    (!vu.call(s, o) || !v(s[o])) && (s[o] = {}), s = s[o];
  }
  return s[n] = i;
}
function xu(a, e) {
  let i = Object.getPrototypeOf(e);
  for (; a--; ) i = Object.getPrototypeOf(i);
  return i;
}
function _e(a, e) {
  return !v(a) || !v(e) ? e : (Object.keys(e).forEach((i) => {
    const s = a[i], n = e[i];
    L(s) && L(n) ? a[i] = _e(s.concat([]), n) : v(s) && v(n) ? a[i] = _e(Object.assign({}, s), n) : a[i] = n;
  }), a);
}
function re(a, e = !0) {
  if (a === null || typeof a != "object" || "isActiveClone" in a)
    return a;
  let i;
  a instanceof Date ? i = new a.constructor() : i = L(a) ? [] : {};
  for (let s in a)
    Object.prototype.hasOwnProperty.call(a, s) && (a.isActiveClone = null, i[s] = re(a[s], !1), delete a.isActiveClone);
  return i;
}
function Xi(a) {
  try {
    return structuredClone(a);
  } catch {
    return re(a, !1);
  }
}
function Ao(a, e) {
  if (a == null)
    return String(a);
  switch (typeof a) {
    case "string":
      return '"' + a + '"';
    case "function":
      return a.toString();
    case "object":
      let i = Array(e || 1).join("	"), s = Array.isArray(a);
      return "{["[+s] + Object.keys(a).map(function(n) {
        return `
	` + i + n + ": " + Ao(a[n], (e || 1) + 1);
      }).join(",") + `
` + i + "}]"[+s];
    default:
      return a.toString();
  }
}
function Oo(a, e) {
  if (v(a))
    for (let i in a)
      typeof a[i] == "object" && a[i] !== null ? Oo(a[i], e) : a.hasOwnProperty(i) && e(i, a[i]);
}
const Do = (a, e, i) => {
  if (a.Id === e)
    return i(a);
  for (let s in a)
    a[s] !== null && typeof a[s] == "object" && (a[s] = Do(a[s], e, i));
  return a;
};
function Cu(a, e) {
  a.split(".");
}
function Vn(a, e, i) {
  const [s, ...n] = e.split(".");
  return {
    ...a,
    [s]: n.length ? Vn(a[s], n.join("."), i) : i
  };
}
function fn(a, e) {
  return e.split(".").reduce((s, n) => s && s[n] !== "undefined" ? s[n] : void 0, a);
}
class Tu {
  constructor() {
    this.nodes = [];
  }
  get size() {
    return this.nodes.length;
  }
  get head() {
    return this.size ? this.nodes[0] : null;
  }
  get tail() {
    return this.size ? this.nodes[this.size - 1] : null;
  }
  insertAt(e, i) {
    const s = this.nodes[e - 1] || null, n = this.nodes[e] || null, r = { value: i, next: n, previous: s };
    s && (s.next = r), n && (n.previous = r), this.nodes.splice(e, 0, r);
  }
  insertFirst(e) {
    this.insertAt(0, e);
  }
  insertLast(e) {
    this.insertAt(this.size, e);
  }
  getAt(e) {
    return this.nodes[e];
  }
  removeAt(e) {
    const i = this.nodes[e - 1] || null, s = this.nodes[e + 1] || null;
    return i && (i.next = s), s && (s.previous = i), this.nodes.splice(e, 1);
  }
  clear() {
    this.nodes = [];
  }
  reverse() {
    this.nodes = this.nodes.reduce((e, { value: i }) => {
      const s = e[0] || null, n = { value: i, next: s, previous: null };
      return s && (s.previous = n), [n, ...e];
    }, []);
  }
  *[Symbol.iterator]() {
    yield* this.nodes;
  }
}
function rs(a, e) {
  if (!L(a) || !L(e) || a.length !== e.length) return !1;
  let i = a.length;
  for (; i--; ) {
    if (L(a[i]) || L(e[i])) {
      if (!rs(a[i], e[i])) return !1;
      continue;
    }
    if (v(a[i]) || v(a[i])) {
      if (!v(a[i], e[i])) return !1;
      continue;
    }
    if (a[i] !== e[i]) return !1;
  }
  return !0;
}
function Su(a, e) {
  let i = 1 / 0, s = -1, n = null, r = 0;
  for (; r++ < e.length; ) {
    let o = e[r], l = Math.abs(o - a);
    l < i && (i = l, s = r, n = o);
  }
  return [s, n];
}
function Io(a, e, i) {
  let s = a[e];
  a.splice(e, 1), a.splice(i, 0, s);
}
function No(a, e, i) {
  [a[e], a[i]] = [a[i], a[e]];
}
function Wn(a, e) {
  return L(e) ? L(a) ? a.every((i) => e.includes(i)) : e.includes(a) : !1;
}
const Eu = (a) => [...new Set(a)], Pu = (a, e) => Object.values(a.reduce((i, s) => (i[e(s)] = s, i), {})), Mu = (a, e) => a.filter((i) => e.includes(i)), ri = (a, e) => a.filter((i) => !e.includes(i)), Lu = (a, e) => ri(a, e).concat(ri(e, a)), Au = (a, e) => ri(a, e).concat(e);
function Ou(a) {
  return !(!v(a) || Object.keys.length);
}
function Ro(a) {
  return v(a) ? !!Object.keys(a).length : !1;
}
function Jt(a, e) {
  if (!v(a) || !v(e)) return !1;
  const i = Object.keys(a).sort(), s = Object.keys(e).sort();
  return i.length !== s.length ? !1 : i.every((r, o) => {
    const l = a[r], c = e[s[o]];
    return L(l) || L(c) ? rs(l, c) : v(l) || v(c) ? Jt(l, c) : l === c;
  });
}
function ae(a = "ID") {
  P(a) ? a = a.toString() : T(a) || (a = "ID"), a = ot(a);
  const e = Date.now().toString(36), i = Math.random().toString(36).substring(2, 5);
  return `${a}_${e}_${i}`;
}
function ot(a) {
  return String(a).replace(/ |,|;|:|\.|#/g, "_");
}
function Du(a, e, i) {
  e = e || "", i = i || 512;
  let s = atob(a), n = [];
  for (let o = 0; o < s.length; o += i) {
    let l = s.slice(o, o + i), c = new Array(l.length);
    for (let f = 0; f < l.length; f++)
      c[f] = l.charCodeAt(f);
    let p = new Uint8Array(c);
    n.push(p);
  }
  return new Blob(n, { type: e });
}
function Iu(a, e) {
  return e instanceof Map ? {
    dataType: "Map",
    value: [...e.entries()]
  } : e;
}
function Nu(a, e) {
  return typeof e == "object" && e !== null && e.dataType === "Map" ? new Map(e.value) : e;
}
const ko = (a) => a.entries().next().value, $o = (a) => a.entries().next().value[0], Ho = (a) => a.entries().next().value[1], _o = (a) => [...a].pop(), Bo = (a) => [...a.keys()].pop(), Fo = (a) => [...a.values()].pop();
class fe extends Map {
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
    return this.insertIndex(s, e, i);
  }
  remove(e) {
    return this.removeIndex(e);
  }
  firstEntry() {
    return ko(this);
  }
  firstKey() {
    return $o(this);
  }
  firstValue() {
    return Ho(this);
  }
  lastEntry() {
    return _o(this);
  }
  lastKey() {
    return Bo(this);
  }
  lastValue() {
    return Fo(this);
  }
  prevCurrNext(e) {
    let i = curr = next = null;
    for (let s of this)
      if (i = curr, curr = s, s.key == e) break;
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
    return L(e) ? (e.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  populate(e) {
    return L(e) ? (this.clear(), e.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  insertIndex(e, i, s) {
    if (!P(e)) return !1;
    const n = [...this];
    return n.splice(e, 0, [i, s]), this.populate(n), !0;
  }
  removeIndex(e) {
    if (!P(e)) return !1;
    const i = [...this];
    return i.splice(e, 1), this.populate(i), !0;
  }
  swapIndices(e, i) {
    if (!P(e) || !P(i)) return !1;
    const s = [...this];
    return No(s, e, i), this.populate(s), !0;
  }
  swapKeys(e, i) {
    const s = [...this], n = s.findIndex(([o]) => o === e), r = s.findIndex(([o]) => o === i);
    return [s[n], s[r]] = [s[r], s[n]], this.clear(), s.forEach(([o, l]) => this.set(o, l)), !0;
  }
}
function Pe(a, e = 100, i, s = !1) {
  let n;
  return function() {
    let r = i || this, o = arguments, l = function() {
      n = null, s || a.apply(r, o);
    }, c = s && !n;
    clearTimeout(n), n = setTimeout(l, e), c && a.apply(r, o);
  };
}
function Uo(a, e = 250, i) {
  let s, n, r = function() {
    let l = i || this, c = /* @__PURE__ */ new Date(), p = arguments;
    s && c < s + e ? (clearTimeout(n), n = setTimeout(function() {
      s = c, a.apply(l, p);
    }, e)) : (s = c, a.apply(l, p));
  };
  function o() {
    timeout && (clearTimeout(n), timeout = void 0);
  }
  return r.reset = function() {
    o(), s = 0;
  }, r;
}
const Ru = (a, ...e) => {
  class i extends a {
    constructor(...r) {
      super(...r), e.forEach((o) => {
        s(this, new o());
      });
    }
  }
  let s = (n, r) => {
    Object.getOwnPropertyNames(r).concat(Object.getOwnPropertySymbols(r)).forEach((o) => {
      o.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/) || Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(r, o));
    });
  };
  return e.forEach((n) => {
    s(i.prototype, n.prototype), s(i, n);
  }), i;
};
function ku(a) {
  const e = {};
  return Promise.race([a, e]).then((i) => i === e ? "pending" : "fulfilled", () => "rejected");
}
function zo(a) {
  return String.fromCharCode.apply(null, new Uint16Array(a));
}
function Vo(a) {
  let e = new ArrayBuffer(a.length * 2), i = new Uint16Array(e);
  for (let s = 0, n = a.length; s < n; s++)
    i[s] = a.charCodeAt(s);
  return e;
}
function $u(a) {
  const e = document.createElement("canvas"), i = e.getContext("2d");
  let s;
  a.isView(a) ? s = a : typeof a == "string" && (s = Vo(a));
  const n = new Uint8ClampedArray.from(s), r = n.length;
  e.height = 1, e.width = r, i.putImageData(n);
  const o = i.toDataURL(), l = getBase64StringFromDataURL(o);
  return { dataURL: o, base64: l };
}
function Hu(a, e, i = "string") {
  const s = new Image(), n = document.createElement("canvas").getContext("2d");
  return s.src = a, s.decode().then(() => {
    n.width = s.width, n.height = s.height, n.drawImage(s, 0, 0);
    const r = n.getImageData(0, 0, s.width, s.height).data, o = i === "string" ? zo(r) : r;
    e(o);
  });
}
class ee {
  static #e = new fe();
  static get entries() {
    return ee.#e;
  }
  static isValid(e, i, s, n) {
    return !v(e) || !W(i) || !T(s) || !_(n);
  }
  static add(e, i, s, n) {
    if (!this.isValid(e, i, s, n)) return !1;
    i.addEventListener(s, n), ee.#e.has(e) || ee.#e.set(e, new fe());
    const r = ee.#e.get(e);
    r.has(i) || r.set(i, {});
    const o = r.get(i);
    return L(o[s]) || (o[s] = []), o[s].push(n), !0;
  }
  static remove(e, i, s, n) {
    if (!ee.isValid(e, i, s, n) || !ee.#e.has(e)) return !1;
    const r = ee.#e.get(e);
    if (!r.has(i)) return !1;
    const o = r.get(i);
    if (!(s in o)) return !1;
    const l = o[s].indexOf(n);
    return l < 0 ? !1 : (o[s].splice(l, 1), o[s].length == 0 && delete o[s], Object.keys(o).length == 0 && r.delete(i), r.size == 0 && ee.#e.delete(e), !0);
  }
  static expungeEvent(e, i, s) {
    if (!v(e) || !W(i) || !T(s))
      return !1;
    const n = ee.#e.get(e);
    if (!n.has(i)) return !1;
    const r = n.get(i);
    if (s in r) {
      for (let o of r[s])
        i.removeEventListener(s, o);
      delete r[s];
    }
    return !0;
  }
  static expungeElement(e, i) {
    if (!v(e) || !W(i))
      return !1;
    const s = ee.#e.get(e);
    if (s.has(i)) {
      let n = s.get(i);
      for (let r in n)
        ee.expungeEvent(e, i, r);
      s.delete(i);
    }
    return !0;
  }
  static expungeContext(e) {
    if (!v(e))
      return !1;
    if (ee.#e.has(e)) {
      const i = ee.#e.get(e);
      for (let s of i)
        ee.expungeElement(e, s);
      ee.#e.delete(e);
    }
    return !0;
  }
  static expungeAll() {
  }
  static destroy() {
    for (let e of ee.#e)
      ee.expungeContext(e);
    return ee.#e = void 0, !0;
  }
}
async function _u(a, e) {
  const i = (l) => new Uint8Array([...decodeURIComponent(encodeURIComponent(l))].map((c) => c.charCodeAt(0))), s = i(a), n = i(e), r = await crypto.subtle.importKey("raw", s, { name: "HMAC", hash: "SHA-256" }, !0, ["sign"]), o = await crypto.subtle.sign("HMAC", r, n);
  return btoa(String.fromCharCode(...new Uint8Array(o)));
}
async function Bu(a) {
  const e = new TextEncoder().encode(a), i = await crypto.subtle.digest("SHA-256", e);
  return Array.from(new Uint8Array(i)).map((r) => r.toString(16).padStart(2, "0")).join("");
}
function Gn(a, e = 0) {
  let i = 3735928559 ^ e, s = 1103547991 ^ e;
  for (let n = 0, r; n < a.length; n++)
    r = a.charCodeAt(n), i = Math.imul(i ^ r, 2654435761), s = Math.imul(s ^ r, 1597334677);
  return i = Math.imul(i ^ i >>> 16, 2246822507), i ^= Math.imul(s ^ s >>> 13, 3266489909), s = Math.imul(s ^ s >>> 16, 2246822507), s ^= Math.imul(i ^ i >>> 13, 3266489909), (s >>> 0).toString(16).padStart(8, 0) + (i >>> 0).toString(16).padStart(8, 0);
}
const Qg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DoubleLinkedList: Tu,
  EventHandlers: ee,
  H: Bu,
  HMAC: _u,
  _get: bu,
  _set: wu,
  ab2str: zo,
  arrayMove: Io,
  b64toBlob: Du,
  copyDeep: re,
  cyrb53: Gn,
  debounce: Pe,
  decodePNGDataStore: Hu,
  diff: ri,
  doStructuredClone: Xi,
  encodePNGDataStore: $u,
  extender: Ru,
  findInObjectById: Do,
  firstEntryInMap: ko,
  firstKeyInMap: $o,
  firstValueInMap: Ho,
  getProperty: fn,
  getPrototypeAt: xu,
  idSanitize: ot,
  intersection: Mu,
  isArrayEqual: rs,
  isObjectAndEmpty: Ou,
  isObjectEqual: Jt,
  isObjectNotEmpty: Ro,
  lastEntryInMap: _o,
  lastKeyInMap: Bo,
  lastValueInMap: Fo,
  mergeDeep: _e,
  nearestArrayValue: Su,
  objRecurse: Oo,
  objRecurseUpdate: Cu,
  objToString: Ao,
  promiseState: ku,
  replacer: Iu,
  reviver: Nu,
  setProperty: Vn,
  str2ab: Vo,
  swapArrayElements: No,
  symDiff: Lu,
  throttle: Uo,
  uid: ae,
  union: Au,
  unique: Eu,
  uniqueBy: Pu,
  valuesInArray: Wn,
  xMap: fe
}, Symbol.toStringTag, { value: "Module" }));
class Yi {
  #e;
  #t;
  #i;
  #n;
  #s = !0;
  #r = !1;
  #a = vt;
  #o = Zi;
  indexStart = 0;
  indexEnd = Ls;
  valueMin = 0;
  valueMax = 1;
  valueDiff = 1;
  volumeMin = 0;
  volumeMax = 0;
  volumeDiff = 0;
  valueMinIdx = 0;
  valueMaxIdx = 0;
  volumeMinIdx = 0;
  volumeMaxIdx = 0;
  secondaryMaxMin = {};
  old = {};
  #c = xn;
  #l = Ls;
  #u = ha;
  #h = ca;
  #d = ua;
  #m = la;
  anchor;
  constructor(e, i, s) {
    if (!v(s) || !(s?.core instanceof B))
      throw new Error("Range requires a config");
    this.#e = ae(`${nt}_Range`), this.#s = !0, this.setConfig(s), (!k(e) || this.isPastLimit(e)) && (e = this.data.length - this.#c), (!k(i) || this.isFutureLimit(i)) && (i = this.data.length), i - e > this.#d && (i = i - (i - e - this.#d)), `${this.maxMinPriceVol.toString()}`;
    const n = s?.interval || vt;
    if (this.data.length == 0) {
      let r = Date.now();
      e = this.rangeLimit * -2, i = this.rangeLimit * 2, this.#a = n, this.#o = at(this.#a), this.anchor = r - r % n;
    } else this.data.length < 2 ? (this.#a = n, this.#o = at(this.interval)) : (this.#a = Ni(this.data), this.#o = at(this.interval));
    i == 0 && this.data.length >= this.rangeLimit ? i = this.rangeLimit : i == 0 && (i = this.data.length), this.set(e, i);
  }
  get id() {
    return this.#e;
  }
  get allData() {
    return this.#i.allData;
  }
  get data() {
    return this.allData?.data || [];
  }
  get dataLength() {
    return this.allData?.data.length ? this.allData.data.length - 1 : 0;
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
    this.#a = e;
  }
  get interval() {
    return this.#a;
  }
  set intervalStr(e) {
    this.#o = e;
  }
  get intervalStr() {
    return this.#o;
  }
  get timeFrame() {
    return this.#o;
  }
  get timeFrameMS() {
    return this.#a;
  }
  get indexed() {
    return this.#r;
  }
  get pastLimitIndex() {
    return this.limitPast * -1;
  }
  get futureLimitIndex() {
    return this.dataLength + this.limitFuture - 1;
  }
  set initialCnt(e) {
    k(e) && (this.#c = e);
  }
  get initialCnt() {
    return this.#c;
  }
  get limitFuture() {
    return this.#l;
  }
  get limitPast() {
    return this.#u;
  }
  get minCandles() {
    return this.#h;
  }
  get maxCandles() {
    return this.#d;
  }
  get yAxisBounds() {
    return this.#m;
  }
  get rangeLimit() {
    return this.#l;
  }
  get diff() {
    return this?.valueDiff;
  }
  end() {
  }
  isFutureLimit(e = this.indexEnd) {
    if (k(e))
      return e > this.futureLimitIndex;
  }
  isPastLimit(e = this.indexStart) {
    if (k(e))
      return e < this.pastLimitIndex;
  }
  set(e = 0, i = this.dataLength, s = this.maxCandles) {
    if (!k(e) || !k(i) || !k(s)) return !1;
    e = e | 0, i = i | 0, s = s | 0, s = U(s, this.minCandles, this.maxCandles), e > i && ([e, i] = [i, e]), i = U(i, e + this.minCandles, e + s);
    let n = i - e;
    e = U(e, this.limitPast * -1, this.dataLength + this.limitFuture - this.minCandles - 1), i = U(i, e + this.minCandles, this.dataLength + this.limitFuture - 1), e = i - e < n ? e - (n - (i - e)) : e;
    const r = e, o = i, l = this.indexStart, c = this.indexEnd;
    let p = this.Length;
    return this.indexStart = e, this.indexEnd = i, p -= this.Length, this.setMaxCandles(s), this.setAllMaxMin(), this.#t.emit("range_set", [r, o, l, c]), !0;
  }
  setConfig(e) {
    let i = e?.state;
    this.#i = i;
    let s = e?.core;
    if (!(s instanceof B)) throw new Error("Range requires a valid TradeXchart instance");
    this.#t = s;
    let n = k(e?.initialCnt) ? e.initialCnt : xn;
    this.#c = this.#t.config?.range?.initialCnt || n, this.#l = k(e?.limitFuture) ? e.limitFuture : Ls, this.#u = k(e?.limitPast) ? e.limitPast : ha, this.#m = P(e?.yAxisBounds) ? e.yAxisBounds : la, this.#h = k(e?.minCandles) ? e.minCandles : ca, this.setMaxCandles(e?.maxCandles);
  }
  setMaxCandles(e) {
    let i = this.#t?.MainPane?.graph?.width || Math.floor(this.#t?.parentElement?.clientWidth) || ua;
    this.#d = k(e) ? e : i;
  }
  setMaxMin(e) {
    for (let i in e)
      this.old[i] = this[i], this[i] = e[i];
    this.scale = this.dataLength != 0 ? this.Length / this.dataLength : 1;
  }
  value(e, i = "chart") {
    let s;
    if (i == "chart") s = this.data;
    else if (s = this.getDataById(i), !s) return null;
    k(e) || (e = s.length - 1);
    let n = s[e];
    if (n !== void 0) return n;
    {
      const r = s.length - 1;
      return n = [null, null, null, null, null, null], s.length < 1 ? (n[0] = Date.now() + this.interval * e, n) : e < 0 ? (n[0] = s[0][0] + this.interval * e, n) : e > r ? (n[0] = s[r][0] + this.interval * (e - r), n) : null;
    }
  }
  valueByTS(e, i = "") {
    if (!k(e) || !T(i)) return !1;
    const s = this.getTimeIndex(e);
    let n;
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
        i.length === 0 ? n = this.value(s) : i.split("_");
        break;
    }
    return n;
  }
  getDataById(e = "chart") {
    if (!T(e)) return !1;
    if (e == "chart") return this.data;
    const i = [
      this.allData.primaryPane,
      this.allData.secondaryPane,
      this.allData.datasets
    ];
    for (let s of i)
      for (let n of s)
        if (e == n?.id) return n.data;
    return !1;
  }
  getTimeIndex(e) {
    if (!k(e)) return !1;
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
    let i = this.getTimeIndex(e), s = this.#t.rangeScrollOffset;
    return i >= this.indexStart - s && i <= this.indexEnd + s;
  }
  rangeIndex(e) {
    return this.getTimeIndex(e) - this.indexStart;
  }
  setAllMaxMin() {
    let e = this.maxMinPriceVol({ data: this.data, start: this.indexStart, end: this.indexEnd, that: this });
    this.setMaxMin(e), this.maxMinDatasets();
  }
  maxMinPriceVol(e) {
    let { data: i, start: s, end: n, that: r } = { ...e }, o = He(this.#t.bufferPx / this.#t.candleW), l = i?.length - 1;
    if (o = k(o) ? o : 0, s = k(s) ? s - o : 0, s = s > 0 ? s : 0, n = k(n) ? n : l, l < 0)
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
    let c = H(s, 0, l), p = H(n, 0, l), f = i[c][3] || 1 / 0, b = i[c][2] || -1 / 0, E = i[c][5] || 1 / 0, M = i[c][5] || -1 / 0, D = c, N = c, K = c, oe = c, $;
    for (; c++ < p; )
      $ = i[c][3], P($) && $ < f && (f = $, D = c), $ = i[c][2], P($) && $ > b && (b = $, N = c), $ = i[c][5], P($) && $ < E && (E = $, K = c), P($) && $ > M && (M = $, oe = c);
    let te = b - f, X = f, I = b;
    return f -= te * r.yAxisBounds, f = f > 0 ? f : 0, b += te * r.yAxisBounds, te = b - f, {
      valueLo: X,
      valueHi: I,
      valueMin: f,
      valueMax: b,
      valueDiff: b - f,
      volumeMin: E,
      volumeMax: M,
      volumeDiff: M - E,
      valueMinIdx: D,
      valueMaxIdx: N,
      volumeMinIdx: K,
      volumeMaxIdx: oe
    };
    function H(ue, Me, be) {
      return Math.min(be, Math.max(Me, ue));
    }
  }
  maxMinDatasets() {
    if (!this.allData?.secondaryPane?.length) return;
    let e = Object.keys(this.secondaryMaxMin) || [];
    for (let i of this.allData.secondaryPane) {
      let s = e.indexOf(i.id), n = {
        data: i.data,
        start: this.indexStart,
        end: this.indexEnd,
        that: this
      };
      this.secondaryMaxMin[i.id] = this.maxMinData(n), s !== -1 && e.splice(s, 1);
    }
    for (let i of e)
      delete this.secondaryMaxMin[i];
  }
  maxMinData(e) {
    let { data: i, start: s, end: n, that: r } = { ...e }, o = He(this.#t.bufferPx / this.#t.candleW), l = i.length - 1, c = this.dataLength - i.length, p = i[0]?.length - 1 || 0;
    const f = {}, b = {
      min: 0,
      max: 1,
      minIdx: 0,
      maxIdx: 0,
      diff: 1
    };
    if (l < 1) return { data: b };
    for (let I = p; I > 0; I--)
      f[`data${I}`] = b;
    if (o = k(o) ? o : 0, s = k(s) ? s - o : 0, s = s > 0 ? s - c : 0, n = k(n) ? n - c : l, l < 0 || i[0].length == 0)
      return f;
    let E = U(s, 0, l), M = U(n, 0, l), D, N, K, oe, $, te, X;
    for (let I in f) {
      for (oe = i[E][p] || -1 / 0, K = i[E][p] || 1 / 0, D = E; D++ < M; )
        N = i[D][p], P && (N <= K && (f[I].min = N, f[I].minIdx = D, K = N), N >= oe && (f[I].max = N, f[I].maxIdx = D, oe = N));
      (te === void 0 || K < te) && (te = K), (X === void 0 || oe > X) && (X = oe), $ = f[I].max - f[I].min, f[I].diff = isNaN($) ? 0 : $, --p;
    }
    return f.data = {
      min: te,
      max: X,
      diff: X - te
    }, f;
  }
  snapshot(e, i) {
    let s = this.export();
    return s.snapshot = !0, s.ts = Date.now(), s.data = this.data, s.dataLength = this.dataLength, s.Length = this.Length, s;
  }
  export(e) {
    let i = {};
    e = L(e) ? e : [];
    for (let s of Fu)
      e.includes(s) || (i[s] = this[s]);
    return i;
  }
}
function Ni(a) {
  if (!L(a) || a.length < 2) return 1 / 0;
  let e = Math.min(a.length - 1, 99), i = 1 / 0;
  return a.slice(0, e).forEach((s, n) => {
    let r = a[n + 1][0] - s[0];
    r === r && r < i && (i = r);
  }), i;
}
const Fu = [
  "indexEnd",
  "indexStart",
  "scale",
  "secondaryMaxMin",
  "valueDiff",
  "valueHi",
  "valueLo",
  "valueMax",
  "valueMaxIdx",
  "valueMin",
  "valueMinIdx",
  "volumeDiff",
  "volumeMax",
  "volumeMaxIdx",
  "volumeMin",
  "volumeMinIdx",
  "diff",
  "futureLimitIndex",
  "id",
  "indexed",
  "initialCnt",
  "interval",
  "intervalStr",
  "limitFuture",
  "limitPast",
  "maxCandles",
  "minCandles",
  "pastLimitIndex",
  "rangeDuration",
  "rangeLimit",
  "timeDuration",
  "timeFinish",
  "timeFrame",
  "timeFrameMS",
  "timeMax",
  "timeMin",
  "timeStart",
  "yAxisBounds"
], Wo = ["y", "M", "d", "h", "m", "s", "ms"], Go = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"], Uu = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], zu = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], qo = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Vu = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Ki = 1231006505e3, Je = 1, se = 1e3, ne = se * 60, pe = ne * 60, G = pe * 24, Rt = G * 7, Ee = G * 30;
function jo(a = 3, e = !1) {
  let i = qo[a % 12] * G;
  return e && a > 0 && (i += G), i;
}
const Ne = G * 365, ai = {
  y: Ne,
  M: Ee,
  w: Rt,
  d: G,
  h: pe,
  m: ne,
  s: se,
  u: Je
}, Xo = {
  years: Ne,
  months: Ee,
  weeks: Rt,
  days: G,
  hours: pe,
  minutes: ne,
  seconds: se,
  milliseconds: Je
}, Wu = { ...ai, ...Xo }, yt = {
  YEARS10: [Ne * 10, "years"],
  YEARS5: [Ne * 5, "years"],
  YEARS3: [Ne * 3, "years"],
  YEARS2: [Ne * 2, "years"],
  YEARS: [Ne, "years"],
  MONTH6: [Ee * 6, "months"],
  MONTH4: [Ee * 4, "months"],
  MONTH3: [Ee * 3, "months"],
  MONTH2: [Ee * 2, "months"],
  MONTH: [Ee, "months"],
  DAY15: [G * 15, "years"],
  DAY10: [G * 10, "days"],
  DAY7: [G * 7, "days"],
  DAY5: [G * 5, "days"],
  DAY3: [G * 3, "days"],
  DAY2: [G * 2, "days"],
  DAY: [G, "days"],
  HOUR12: [pe * 12, "hours"],
  HOUR6: [pe * 6, "hours"],
  HOUR4: [pe * 4, "hours"],
  HOUR2: [pe * 2, "hours"],
  HOUR: [pe, "hours"],
  MINUTE30: [ne * 30, "minutes"],
  MINUTE15: [ne * 15, "minutes"],
  MINUTE10: [ne * 10, "minutes"],
  MINUTE5: [ne * 5, "minutes"],
  MINUTE2: [ne * 2, "minutes"],
  MINUTE: [ne, "minutes"],
  SECOND30: [se * 30, "seconds"],
  SECOND15: [se * 15, "seconds"],
  SECOND10: [se * 10, "seconds"],
  SECOND5: [se * 5, "seconds"],
  SECOND2: [se * 2, "seconds"],
  SECOND: [se, "seconds"],
  MILLISECOND500: [Je * 500, "milliseconds"],
  MILLISECOND250: [Je * 250, "milliseconds"],
  MILLISECOND100: [Je * 100, "milliseconds"],
  MILLISECOND50: [Je * 50, "milliseconds"],
  MILLISECOND: [Je, "milliseconds"]
}, Gu = () => {
  const a = Object.values(yt), e = [];
  for (let i = a.length; --i; i > 0) e[i] = a[i][0];
  return e;
}, Zt = Gu(), qu = () => {
  const a = Object.values(yt), e = [];
  for (let i = a.length; --i; i > 0) e[i] = a[i][1];
  return e;
}, gn = qu(), ju = Object.keys(yt), Xu = () => {
  const a = {};
  for (const [e, i] of Object.entries(yt))
    a[e] = i[0];
  return a;
}, Yu = Xu();
function yn() {
  const a = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(timezones, a) ? timezones[a.toString()] : "Etc/UTC";
}
function Ku() {
  const a = {};
  for (let e in ai) {
    let i = 0;
    a[e] = [];
    do
      a[e].push(Math.round(ai[e] * i)), i += 0.125;
    while (i < 1);
  }
  return a;
}
function di(a) {
  const e = new Date(a);
  return e instanceof Date && !isNaN(e.valueOf()) && isFinite(e.valueOf());
}
function qn(a, e = Ki, i = Date.now()) {
  return di(a) ? a > e && a < i : !1;
}
function Xt(a, e, i) {
  a = new Date(a), e = new Date(e);
  var s = e.getTime(), n = a.getTime();
  return parseInt((s - n) / i);
}
const Ze = {
  inSeconds: function(a, e) {
    return Xt(a, e, se);
  },
  inMinutes: function(a, e) {
    return Xt(a, e, ne);
  },
  inHours: function(a, e) {
    return Xt(a, e, pe);
  },
  inDays: function(a, e) {
    return Xt(a, e, G);
  },
  inWeeks: function(a, e) {
    return Xt(a, e, Rt);
  },
  inMonths: function(a, e) {
    a = new Date(a), e = new Date(e);
    let i = a.getUTCFullYear(), s = e.getUTCFullYear(), n = a.getUTCMonth();
    return e.getUTCMonth() + 12 * s - (n + 12 * i);
  },
  inYears: function(a, e) {
    let i = new Date(a);
    return new Date(e).getUTCFullYear() - i.getUTCFullYear();
  }
};
function Zu(a, e) {
  let i = Ze.inYears(a, e), s = Ze.inMonths(a, e), n = Ze.inWeeks(a, e), r = Ze.inDays(a, e), o = Ze.inHours(a, e), l = Ze.inMinutes(a, e), c = Ze.inSeconds(a, e), p = new Date(e).getTime() - new Date(a).getTime();
  return {
    y: i,
    M: s,
    w: n,
    d: r,
    h: o,
    m: l,
    s: c,
    ms: p,
    years: i,
    months: s,
    weeks: n,
    days: r,
    hours: o,
    minutes: l,
    seconds: c,
    milliseconds: p
  };
}
function Yo(a) {
  return k(a) && !(a < se) && a !== 1 / 0;
}
function vn(a) {
  let e = se;
  return T(a) ? (e = oi(a), e ? a = a : (e = se, a = "1s")) : a = "1s", { tf: a, ms: e };
}
function oi(a) {
  if (!T(a)) return !1;
  const e = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let i;
  return (i = e.exec(a)) !== null ? ai[i[2]] * i[1] : !1;
}
function jn(a) {
  let e = Math.floor(a / 1e3), i = Math.floor(e / 60);
  e = e % 60;
  let s = Math.floor(i / 60);
  i = i % 60;
  let n = Math.floor(s / 24);
  s = s % 24;
  let r = Math.floor(n / 7);
  n = n % 7;
  let o = Math.floor(r / 4), l = Math.floor(r / 52), c = r % 4;
  return o = o % 13, {
    y: l,
    M: o,
    w: c,
    d: n,
    h: s,
    m: i,
    s: e,
    years: l,
    months: o,
    weeks: c,
    days: n,
    hours: s,
    minutes: i,
    seconds: e
  };
}
function at(a) {
  const e = jn(a);
  for (const i in e)
    if (e[i]) return `${e[i]}${i}`;
}
function Ko(a) {
  return a ? new Date(a).getUTCSeconds() : null;
}
function Xn(a) {
  return new Date(a).setUTCMilliseconds(0, 0);
}
function Zo(a) {
  return a ? new Date(a).getUTCMinutes() : null;
}
function Yn(a) {
  return new Date(a).setUTCSeconds(0, 0);
}
function Qo(a) {
  return a ? new Date(a).getUTCHours() : null;
}
function Kn(a) {
  return new Date(a).setUTCMinutes(0, 0, 0);
}
function Zn(a) {
  return a ? new Date(a).getUTCDate() : null;
}
function Jo(a, e = "en-GB", i = "short") {
  return new Date(a).toLocaleDateString(e, { weekday: i });
}
function li(a) {
  return new Date(a).setUTCHours(0, 0, 0, 0);
}
function Qn(a) {
  if (a)
    return new Date(a).getUTCMonth();
}
function el(a, e = "en-GB", i = "short") {
  return new Date(a).toLocaleDateString(e, { month: i });
}
function Jn(a) {
  let e = new Date(a);
  return Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    1
  );
}
function tl(a) {
  let e = (Qn(a) + 1) % 12;
  return a += jo(e, as(a)), a;
}
function il(a) {
  if (a)
    return new Date(a).getUTCFullYear();
}
function er(a) {
  return Date.UTC(new Date(a).getUTCFullYear());
}
function sl(a) {
  return a = a + Ne + G, as(a), a;
}
function as(a) {
  let i = new Date(a).getUTCFullYear();
  return i & 3 ? !1 : i % 100 != 0 || i % 400 == 0;
}
function Qu(a) {
  let e = new Date(a), i = e.getUTCMonth(), s = e.getUTCDate(), n = dayCount[i] + s;
  return i > 1 && as() && n++, n;
}
function Ri(a, e) {
  return {
    years: (s) => er(s),
    months: (s) => Jn(s),
    weeks: (s) => li(s),
    days: (s) => li(s),
    hours: (s) => Kn(s),
    minutes: (s) => Yn(s),
    seconds: (s) => Xn(s)
  }[e](a);
}
function Ju(a, e) {
  let i, s;
  switch (e) {
    case "years":
      i = er(a), s = sl(a);
      break;
    case "months":
      i = Jn(a), s = tl(a);
      break;
    case "weeks":
      i = li(a), s = i + G;
      break;
    case "days":
      i = li(a), s = i + G;
      break;
    case "hours":
      i = Kn(a), s = i + pe;
      break;
    case "minutes":
      i = Yn(a), s = i + ne;
      break;
    case "seconds":
      i = Xn(a), s = i + se;
  }
  return { start: i, end: s };
}
function bn(a) {
  let { h: e, m: i } = tr(a);
  return e == 0 && i == 0 ? `${d}` : `${e}:${i}`;
}
function ed(a) {
  let { h: e, m: i, s } = tr(a);
  return e == 0 && i == 0 && s == 0 ? `${d}` : `${e}:${i}:${s}`;
}
function wn(a) {
  let { h: e, m: i, s } = tr(a);
  return e == 0 && i == 0 && s == 0 ? `${d}` : `${i}:${s}`;
}
function tr(a) {
  let e, i, s, n;
  return e = String(Zn(a)), i = String(Qo(a)).padStart(2, "0"), s = String(Zo(a)).padStart(2, "0"), n = String(Ko(a)).padStart(2, "0"), { d: e, h: i, m: s, s: n };
}
function td(a, e) {
  let i = 1 / 0, s = null, n = -1;
  for (let r = 0; r < e.length; r++) {
    let o = e[r][0];
    Math.abs(o - a) < i && (i = Math.abs(o - a), s = e[r], n = r);
  }
  return [n, s];
}
class nl {
  #e = {};
  #t = ei();
  #i = Intl.DateTimeFormat().resolvedOptions().timeZone;
  static timeUnits = Wo;
  static timeUnitsLong = Go;
  static timeUnitsValues = yt;
  static timeScaleValues = yt;
  static BTCGenesis = Ki;
  constructor(e) {
    e instanceof Yi && (this.#e = e), this.setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }
  get range() {
    return this.#e;
  }
  get timeFrameMS() {
    return this.#e.interval;
  }
  get timeFrame() {
    return this.#e.intervalStr;
  }
  set timeZone(e) {
    this.setTimeZone(e);
  }
  get timeZone() {
    return this.#i;
  }
  set timeZoneOffset(e) {
    this.#t = P(e) ? e : (/* @__PURE__ */ new Date()).getTimezoneOffset();
  }
  get timeZoneOffset() {
    return this.#t;
  }
  get timeZoneLocal() {
    return yn();
  }
  get indexed() {
    return this.#e.indexed;
  }
  setTimeZone(e) {
    Intl.supportedValuesOf("timeZone").includes(e) && (this.#i = e, this.#t = ei(e));
  }
  static timezoneLocal() {
    return yn();
  }
  static timezoneOffset(e, i) {
    return ei(e, i);
  }
  static IANATimeZone(e) {
    return rl(e);
  }
  static isValidTimestamp(e) {
    return di(e);
  }
  static isValidTimeInRange(e, i = Ki, s = Date.now()) {
    return qn(e, i, s);
  }
  static interval2MS(e) {
    return oi(e);
  }
  static ms2Interval(e) {
    return at(e);
  }
}
function rl(a = "en-US") {
  const e = {};
  return Intl.supportedValuesOf("timeZone").forEach((i) => {
    let s = ei(i, a);
    e[i] = s;
  }), e;
}
function ei(a = Intl.DateTimeFormat().resolvedOptions().timeZone, e = "en-US") {
  const i = /* @__PURE__ */ new Date(), s = i.toLocaleString(e, { timeZone: a }), n = i.toLocaleString(e);
  return -((Date.parse(n) - Date.parse(s)) / 36e5 + i.getTimezoneOffset() / 60);
}
const id = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BTCGENESIS: Ki,
  DAY_MS: G,
  HM: bn,
  HMS: ed,
  HOUR_MS: pe,
  IANATimeZones: rl,
  MILLISECOND: Je,
  MINUTE_MS: ne,
  MONTHMAP: Vu,
  MONTHR_MS: Ee,
  MONTH_MS: jo,
  MS: wn,
  SECOND_MS: se,
  TIMESCALES: Zt,
  TIMESCALESKEYS: ju,
  TIMESCALESRANK: gn,
  TIMESCALESVALUES: yt,
  TIMESCALESVALUESKEYS: Yu,
  TIMEUNITS: Wo,
  TIMEUNITSLONG: Go,
  TIMEUNITSVALUES: Wu,
  TIMEUNITSVALUESLONG: Xo,
  TIMEUNITSVALUESSHORT: ai,
  TimeData: nl,
  WEEK_MS: Rt,
  YEAR_MS: Ne,
  buildSubGrads: Ku,
  dayCntInc: Uu,
  dayCntLeapInc: zu,
  dayOfYear: Qu,
  day_start: li,
  getTimezone: yn,
  getTimezoneOffset: ei,
  get_day: Zn,
  get_dayName: Jo,
  get_hour: Qo,
  get_minute: Zo,
  get_month: Qn,
  get_monthName: el,
  get_second: Ko,
  get_year: il,
  hour_start: Kn,
  interval2MS: oi,
  isLeapYear: as,
  isTimeFrame: vn,
  isTimeFrameMS: Yo,
  isValidTimeInRange: qn,
  isValidTimestamp: di,
  minute_start: Yn,
  monthDayCnt: qo,
  month_start: Jn,
  ms2Interval: at,
  ms2TimeUnits: jn,
  nearestTs: td,
  nextMonth: tl,
  nextYear: sl,
  second_start: Xn,
  time_start: Ri,
  timestampDiff: Ze,
  timestampDifference: Zu,
  unitRange: Ju,
  year_start: er
}, Symbol.toStringTag, { value: "Module" })), sd = ne, Zi = "1m", vt = sd, aa = 0.05, nd = 100, oa = 100, la = 0.3, os = 1.04, Et = 8;
class R {
  static default = new R("default");
  static percent = new R("percent");
  static relative = new R("relative");
  static log = new R("log");
  static valid(e) {
    return e instanceof R ? e : R.default;
  }
  static get types() {
    let e = [];
    for (let i in R)
      R[i] instanceof R && e.push(i);
    return e;
  }
  constructor(e) {
    this.name = e;
  }
}
const Jg = R.types, xn = 30, Ls = 200, ha = 200, ca = 20, ua = 1920, ls = 5, da = 50, ma = 30, rd = 8, Cn = 30, ad = [!0, "top"];
class he {
  static t = 0;
  static o = 1;
  static h = 2;
  static l = 3;
  static c = 4;
  static v = 5;
}
const ki = {
  mainPane: {},
  primaryPane: {},
  secondaryPane: {},
  scale: {},
  timeline: {}
};
Array.from(Object.keys(ki));
class xe {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #a;
  #o;
  #c;
  #l;
  #u;
  static dividerList = {};
  static divideCnt = 0;
  static class = Fr;
  static Name = "Dividers";
  static type = "divider";
  static create(e, i) {
    const s = `${i.core.id}_divider_${++xe.divideCnt}`;
    return i.id = s, xe.dividerList[s] = new xe(e, i), xe.dividerList[s];
  }
  static destroy() {
    for (let e in xe.dividerList)
      xe.dividerList[e].destroy(), delete xe.dividerList[e];
  }
  static defaultNode() {
    return `
  <div slot="widget" class="${Fr}" style="position: absolute;"></div>
  `;
  }
  constructor(e, i) {
    const s = { ...i };
    this.#s = e, this.#t = s.core, this.#i = s, this.#n = s.core.theme, this.#e = s.id, this.#r = s.chartPane, this.#a = e.elements[xe.type], this.init();
  }
  get el() {
    return this.#o;
  }
  get id() {
    return this.#e;
  }
  get chartPane() {
    return this.#r;
  }
  get config() {
    return this.#t.config;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ve(this.#o);
  }
  get height() {
    return this.#o.getBoundingClientRect().height;
  }
  set cursor(e) {
    this.setCursorStyle(e);
  }
  get cursor() {
    return this.#l;
  }
  get type() {
    return xe.type;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = "row-resize", this.eventsListen();
  }
  destroy() {
    this.#u.destroy(), this.el.remove(), delete xe.dividerList[this.id];
  }
  eventsListen() {
    this.#u = new Ve(this.#o, { disableContextMenu: !1 }), this.#u.on("pointerover", this.onMouseEnter.bind(this)), this.#u.on("pointerout", this.onMouseOut.bind(this)), this.#u.on("pointerdrag", this.onPointerDrag.bind(this)), this.#u.on("pointerdragend", this.onPointerDragEnd.bind(this));
  }
  on(e, i, s = this) {
    this.#t.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#t.off(e, i, s);
  }
  emit(e, i) {
    this.#t.emit(e, i);
  }
  onMouseEnter() {
    this.#o.style.background = this.#n.divider.active, this.#t.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#o.style.background = this.#n.divider.idle, this.#t.MainPane.onMouseEnter();
  }
  onPointerDrag(e) {
    this.#c = this.#t.MainPane.cursorPos, this.#o.style.background = this.#n.divider.active, this.emit(`${this.id}_pointerdrag`, this.#c), this.emit("divider_pointerDrag", {
      id: this.id,
      e,
      pos: this.#c,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(e) {
    this.#o.style.background = this.#n.divider.idle, this.#c = this.#t.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#c), this.emit("divider_pointerDragEnd", {
      id: this.id,
      e,
      pos: this.#c,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  mount() {
    this.#a.lastElementChild == null ? this.#a.innerHTML = this.dividerNode() : this.#a.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#o = vo(`#${this.#e}`, this.#a);
  }
  dividerNode() {
    let e = this.#t.theme, i = this.#r.pos.top - ve(this.#a).top;
    this.#t.elBody.width - this.#t.elBody.scale.width;
    let s = P(this.config.dividerHeight) ? this.config.dividerHeight : rd, n = this.#t.elBody.tools.width;
    switch (i -= s / 2, e.tools.location) {
      case "left":
        break;
      case !1:
      case "none":
      case "right":
        n *= -1;
        break;
    }
    const r = `position: absolute; top: ${i}px; left: ${n}px; z-index:100; width: 100%; height: ${s}px; background: ${e.divider.idle};`, o = `width: 100%; margin: 3.5px 0; border: 0; border-top: ${e.divider.style} ${e.divider.line};`;
    return `
      <div id="${this.#e}" class="divider" style="${r}"><hr style="${o}"></div>
    `;
  }
  setPos() {
    let e = this.#r.pos.top - ve(this.#a).top;
    e = e - this.height / 2 + 1, this.#o.style.top = `${e}px`, this.#o.style.left = `${this.#t.elBody.tools.width}px`;
  }
  setWidth() {
    this.#o.style.width = `${this.#t.elMain.width + this.#t.elBody.scale.width}px`, this.#o.style.left = `${this.#t.elBody.tools.width}px`;
  }
  setCursorStyle(e) {
    T(e) && (this.#l = e, this.#o.style.cursor = e);
  }
  hide() {
    this.#o.style.display = "none";
  }
  show() {
    this.#o.style.display = "block";
  }
}
const od = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>', ld = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>', hd = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>', al = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>', cd = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>', ud = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>', dd = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>', mt = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>', md = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>', pd = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>', fd = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>', gd = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', yd = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', vd = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>', bd = '<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>', wd = '<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>', xd = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>', Cd = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>', Td = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>', Sd = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <g fill-rule="evenodd">  <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z"/>  <path d="m4.4449 4.097c-0.01964 0-0.037678 0.0018-0.054687 0.0039-0.017011 0.0022-0.034068 0.0058-0.048828 0.0098-0.014761 4e-3 -0.028126 0.0081-0.041016 0.01367-0.012889 0.0056-0.025711 0.01268-0.037109 0.01953-0.022796 0.01371-0.041442 0.02783-0.060547 0.04492s-0.038191 0.03653-0.056641 0.05469c-0.024482 0.02442-0.046092 0.05037-0.064453 0.07813-0.018362 0.02775-0.032681 0.05776-0.044922 0.08789s-0.021223 0.06023-0.027344 0.0918c-0.00612 0.03156-0.00977 0.06366-0.00977 0.0957 0 8e-3 -4.378e-4 0.01543 0 0.02344v1.2988c0 0.02083 6.41e-5 0.04102 0.00195 0.06055 0.00189 0.01953 0.0061 0.03841 0.00977 0.05664 0.00366 0.01823 0.00836 0.03581 0.013672 0.05273 0.00531 0.01693 0.010742 0.0332 0.017578 0.04883 0.013672 0.03125 0.029785 0.0599 0.048828 0.08594s0.041016 0.04948 0.064453 0.07031 0.049316 0.03906 0.076172 0.05469c0.026855 0.01563 0.054687 0.02865 0.083984 0.03906 0.029297 0.01042 0.059082 0.01823 0.089844 0.02344 0.030762 0.0052 0.0625 0.0078 0.09375 0.0078s0.062988-0.0026 0.09375-0.0078 0.060547-0.01302 0.089844-0.02344 0.057129-0.02344 0.083984-0.03906c0.026855-0.01563 0.052734-0.03385 0.076172-0.05469 0.023437-0.02083 0.04541-0.04427 0.064453-0.07031s0.035156-0.05469 0.048828-0.08594c0.00684-0.01563 0.012268-0.0319 0.017578-0.04883s0.01001-0.0345 0.013672-0.05273c0.00366-0.01823 0.00787-0.03711 0.00977-0.05664 0.00189-0.01953 0.00195-0.03971 0.00195-0.06055v-0.82227h6v0.98633c0 0.02083 2e-3 0.04102 0.0039 0.06055s0.0042 0.03841 0.0078 0.05664c0.0037 0.01823 0.0084 0.03581 0.01367 0.05273 0.0053 0.01693 0.01074 0.0332 0.01758 0.04883 0.01367 0.03125 0.03174 0.0599 0.05078 0.08594s0.03906 0.04948 0.0625 0.07031 0.04932 0.03906 0.07617 0.05469c0.02686 0.01563 0.05469 0.02865 0.08399 0.03906 0.0293 0.01042 0.06104 0.01823 0.0918 0.02344 0.03076 0.0052 0.06055 0.0078 0.0918 0.0078s0.06299-0.0026 0.09375-0.0078 0.06055-0.01302 0.08984-0.02344c0.0293-0.01042 0.05908-0.02344 0.08594-0.03906 0.02686-0.01563 0.05078-0.03385 0.07422-0.05469 0.02344-0.02083 0.04541-0.04427 0.06445-0.07031s0.03516-0.05469 0.04883-0.08594c0.0068-0.01563 0.01422-0.0319 0.01953-0.04883 0.0053-0.01693 0.01001-0.0345 0.01367-0.05273 0.0037-0.01823 0.0059-0.03711 0.0078-0.05664s2e-3 -0.03971 2e-3 -0.06055v-1.4629c3.25e-4 -0.0078 0-0.01563 0-0.02344 0-0.03125-0.0026-0.06299-0.0078-0.09375s-0.01302-0.06055-0.02344-0.08984c-0.01042-0.0293-0.02344-0.05713-0.03906-0.08398-0.01563-0.02685-0.03385-0.05273-0.05469-0.07617-0.02083-0.02344-0.04427-0.04541-0.07031-0.06445s-0.05469-0.03516-0.08594-0.04883c-0.01563-0.0068-0.0319-0.01227-0.04883-0.01758-0.01693-0.0053-0.0345-0.01001-0.05273-0.01367-0.01823-0.0037-0.03711-0.0059-0.05664-0.0078s-0.03971-0.0039-0.06055-0.0039h-6.5z"/>  <path d="m11.555 11.903c0.01964 0 0.03768-0.0018 0.05469-0.0039 0.01701-0.0022 0.03407-0.0058 0.04883-0.0098s0.02813-0.0081 0.04102-0.01367c0.01289-0.0056 0.02571-0.01268 0.03711-0.01953 0.0228-0.01371 0.04144-0.02783 0.06055-0.04492 0.0191-0.01709 0.03819-0.03653 0.05664-0.05469 0.02448-0.02442 0.04609-0.05037 0.06445-0.07813 0.01836-0.02775 0.03268-0.05776 0.04492-0.08789s0.02122-0.06023 0.02734-0.0918c0.0061-0.03156 0.0098-0.06366 0.0098-0.0957 0-8e-3 4.38e-4 -0.01543 0-0.02344v-1.2988c0-0.02083-6.4e-5 -0.04102-2e-3 -0.06055-0.0019-0.01953-0.0061-0.03841-0.0098-0.05664s-0.0084-0.03581-0.01367-0.05273c-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.02979-0.0599-0.04883-0.08594s-0.04102-0.04948-0.06445-0.07031c-0.02344-0.02083-0.04932-0.03906-0.07617-0.05469s-0.05469-0.02865-0.08398-0.03906c-0.0293-0.01042-0.05908-0.01823-0.08984-0.02344-0.03076-0.0052-0.0625-0.0078-0.09375-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05713 0.02344-0.08398 0.03906-0.02685 0.01563-0.05273 0.03385-0.07617 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01227 0.0319-0.01758 0.04883-0.0053 0.01693-0.01001 0.0345-0.01367 0.05273-0.0037 0.01823-0.0079 0.03711-0.0098 0.05664s-0.0019 0.03971-0.0019 0.06055v0.82227h-6v-0.98633c0-0.02083-2e-3 -0.04102-0.0039-0.06055s-0.0042-0.03841-0.0078-0.05664c-0.0037-0.01823-0.0084-0.03581-0.01367-0.05273-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.03174-0.0599-0.05078-0.08594s-0.03906-0.04948-0.0625-0.07031-0.04932-0.03906-0.07617-0.05469c-0.02686-0.01563-0.05469-0.02865-0.08399-0.03906-0.0293-0.01042-0.06104-0.01823-0.0918-0.02344-0.03076-0.0052-0.06055-0.0078-0.0918-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05908 0.02344-0.08594 0.03906-0.02686 0.01563-0.05078 0.03385-0.07422 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01422 0.0319-0.01953 0.04883-0.0053 0.01693-0.01001 0.03451-0.01367 0.05273-0.0037 0.01823-0.0059 0.03711-0.0078 0.05664s-2e-3 0.03971-2e-3 0.06055v1.4629c-3.25e-4 0.0078 0 0.01563 0 0.02344 0 0.03125 0.0026 0.06299 0.0078 0.09375s0.01302 0.06055 0.02344 0.08984c0.01042 0.0293 0.02344 0.05713 0.03906 0.08398 0.01563 0.02685 0.03385 0.05273 0.05469 0.07617 0.02083 0.02344 0.04427 0.04541 0.07031 0.06445s0.05469 0.03516 0.08594 0.04883c0.01563 0.0068 0.0319 0.01227 0.04883 0.01758 0.01693 0.0053 0.0345 0.01001 0.05273 0.01367 0.01823 0.0037 0.03711 0.0059 0.05664 0.0078s0.03971 0.0039 0.06055 0.0039h6.5z"/></g></svg>', Ed = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/></svg>', Pd = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/> <path d="m12.757 3.0055c-0.11087 0.0051358-0.22696 0.051177-0.33008 0.1543l-4.9883 4.9902c-0.061946 0.061947-0.086644 0.12038-0.097656 0.17773l-4.8184 4.8164c-0.1111 0.1111-0.1066 0.2109-0.10742 0.31445-3.5e-4 0.27663 0.22337 0.50035 0.5 0.5 0 0 0.18415 0.022881 0.33008-0.12305l4.9746-4.9727c0.06758-0.06758 0.10951-0.13979 0.13281-0.21289l4.7832-4.7832c0.36828-0.36828 0.017071-0.87967-0.37891-0.86133z" fill-rule="evenodd"/></svg>', Md = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Ld = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>', Ad = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>', Od = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>', Dd = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>', Id = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>', Nd = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>', Rd = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>', kd = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>', $d = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>', Hd = '<svg width="493px" height="512px" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 493 511.77" xmlns="http://www.w3.org/2000/svg"><path d="m33.11 458.2 104.5-79.1c3.09-3 7.08-4.47 11.08-4.45l302.6-0.08c2.67 0 5.09-1.08 6.78-2.77 1.74-1.81 2.84-4.24 2.84-6.87v-323.2c0-2.59-1.12-5-2.86-6.74-1.78-1.78-4.2-2.9-6.76-2.9h-409.56c-2.54 0-4.94 1.14-6.72 2.92s-2.92 4.18-2.92 6.72c0 793.72 1.02 39.329 1.02 416.47zm90.6-229.77c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.73-19.74 19.73c-10.89 0-19.73-8.84-19.73-19.73s8.84-19.74 19.73-19.74zm0-101.14c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.74-19.74 19.74c-10.89 0-19.73-8.85-19.73-19.74s8.84-19.74 19.73-19.74zm61.72 138.89c-9.95 0-18.02-8.07-18.02-18.01 0-9.95 8.07-18.02 18.02-18.02h185.56c9.95 0 18.01 8.07 18.01 18.02 0 9.94-8.06 18.01-18.01 18.01zm0-101.13c-9.95 0-18.02-8.07-18.02-18.02 0-9.94 8.07-18.01 18.02-18.01h185.56c9.95 0 18.01 8.07 18.01 18.01 0 9.95-8.06 18.02-18.01 18.02zm-30.38 241.61-125.97 99.69c-2.96 3.32-7.24 5.42-12.01 5.42-8.85 0-17.07-7.1228-17.07-15.963v-454.08c0-11.4 4.77-21.88 12.31-29.42s18.02-12.31 29.42-12.31h409.56c11.4 0 21.9 4.74 29.45 12.29 7.5 7.51 12.26 17.96 12.26 29.44v323.2c0 11.48-4.7 21.95-12.24 29.49-7.61 7.54-18.05 12.24-29.47 12.24z" fill-rule="nonzero"/></svg>', _d = '<svg width="800px" height="800px" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.746 2.7281c-5.1207-2.0689-10.949 0.40512-13.018 5.5258-2.0689 5.1207 0.40512 10.949 5.5258 13.018 5.1207 2.0689 10.949-0.40508 13.018-5.5258 2.0689-5.1207-0.40508-10.949-5.5258-13.018zm-1.3378 8.3035-1.2703-0.51325c-0.21854-0.08829-0.32785-0.13246-0.3683-0.22775-0.04045-0.09529 0.0037-0.20461 0.09201-0.42314l1.6595-4.1073c0.33362-0.82575 0.50047-1.2387 0.33474-1.3523-0.16582-0.11359-0.49058 0.19103-1.1403 0.8003l-4.7426 4.4469c-1.0274 0.96338-1.541 1.445-1.4405 1.9835 0.10054 0.53837 0.75347 0.80216 2.0594 1.3298l1.2703 0.51325c0.21854 0.08829 0.32785 0.13246 0.3683 0.22775 0.04045 0.09529-0.0037 0.20461-0.09201 0.42314l-1.6595 4.1073c-0.33365 0.82582-0.50047 1.2387-0.33475 1.3523 0.16582 0.1136 0.49059-0.19104 1.1403-0.80025l4.7425-4.4469c1.0275-0.96346 1.5411-1.4451 1.4406-1.9836-0.10057-0.53838-0.75352-0.80218-2.0594-1.3298z" clip-rule="evenodd" fill-rule="evenodd"/></svg>', Bd = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>', Fd = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>', et = 300, ti = 400, Ud = `${ti}px`, ol = `${et}px`, ll = "100%", hl = "100%", cl = 30, As = 35, hs = 25, ul = 25, zd = hs + ul, Tn = 60, $i = "normal", Ot = 12, Os = "normal", Hi = "Avenir, Helvetica, Arial, sans-serif", ir = "Andalé, Lucida, Monaco, Courier", sr = "#141414", nr = "#333", rr = "#cccccc", hi = "#888888", kt = "#cccccc", dl = "25px", Vd = "position: relative;", V = {
  COLOUR_BG: sr,
  COLOUR_BORDER: nr,
  COLOUR_TXT: rr,
  COLOUR_ICON: hi,
  COLOUR_ICONHOVER: kt,
  BORDER_THICKNESS: 0,
  FONTWEIGHT: $i,
  FONTSIZE: Ot,
  FONTSTYLE: Os,
  FONTFAMILY: Hi,
  FONT: `${Os} ${Ot}px ${$i} ${Hi}`,
  FONTSTRING: `font-style: ${Os}; font-size: ${Ot}px; font-weight: ${$i}; font-family: ${Hi};`
}, Re = {
  fontSize: Ot,
  fontWeight: $i,
  fontFamily: Hi,
  paddingLeft: 3,
  paddingRight: 3,
  paddingTop: 2,
  paddingBottom: 2,
  borderWidth: 1,
  txtCol: "#000000",
  bakCol: "#cccccc",
  stroke: "#ffffff",
  fill: "#888888"
}, pa = {
  "─────────": [],
  "┈┈┈┈┈┈┈┈┈": [1, 1],
  "- - - - -": [10, 10],
  "─ ─ ─ ─ ─": [20, 5],
  "─ ▪ ─ ▪ ─": [15, 3, 3, 3]
}, tt = {
  COLOUR_ICON: hi,
  COLOUR_ICONHOVER: kt,
  ICONSIZE: dl
}, Dt = {
  COLOUR_ICON: hi,
  COLOUR_ICONHOVER: kt,
  ICONSIZE: dl
}, Ds = {
  COLOUR_BG: sr,
  COLOUR_BORDER: nr,
  COLOUR_TXT: rr
}, Qe = {
  COLOUR_BG: sr,
  COLOUR_BORDER: nr,
  COLOUR_TXT: rr,
  SHADOW: "rgb(0,0,0) 0px 20px 30px -10px",
  CONTENT: "padding: 1em",
  TITLE: "padding: 2px 1em 5px; background: #333; white-space: nowrap;"
}, Wd = {
  FILL: kt + "88"
}, me = {
  CANDLE_SOLID: "candle_solid",
  CANDLE_HOLLOW: "candle_hollow",
  CANDLE_UP_HOLLOW: "candle_up_hollow",
  CANDLE_DOWN_HOLLOW: "candle_down_hollow",
  OHLC: "ohlc",
  AREA: "area",
  LINE: "line"
}, Ei = {
  COLOUR_CANDLE_UP: "#00F04088",
  COLOUR_CANDLE_DN: "#F0004088",
  COLOUR_WICK_UP: "#0F4",
  COLOUR_WICK_DN: "#F04"
}, _i = {
  COLOUR_VOLUME_UP: "#00F04044",
  COLOUR_VOLUME_DN: "#F0004044",
  ONCHART_VOLUME_HEIGHT: 15
}, Gd = 1.75, fa = 500, Bi = Ot + 2, Fi = ir, Ie = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: Fi,
  FONTSIZE: Bi,
  FONTWEIGHT: fa,
  FONT_LABEL: `${fa} ${Bi}px ${Fi}`,
  FONT_LABEL_BOLD: `bold ${Bi}px ${Fi}`
}, ga = 500, ya = Ot + 2, va = ir, pt = {
  COLOUR_TICK: "#888",
  COLOUR_LABEL: "888",
  COLOUR_CURSOR: "#000",
  COLOUR_CURSOR_BG: "#CCC",
  FONTFAMILY: va,
  FONTSIZE: ya,
  FONTWEIGHT: ga,
  FONT_LABEL: `${ga} ${ya}px ${va}`,
  FONT_LABEL_BOLD: `bold ${Bi}px ${Fi}`
}, ml = {
  COLOUR_GRID: "#222"
}, qd = {
  width: 1,
  stroke: "#ccc",
  dash: [1, 1]
}, ba = {
  text: V.FONTSTRING,
  font: V.FONT,
  colour: V.COLOUR_TXT
}, Pi = {
  ACTIVE: "#888888C0",
  IDLE: "#FFFFFF00",
  LINE: V.COLOUR_BORDER,
  STYLE: "2px solid"
}, jd = {
  FONTSIZE: 50,
  FONTWEIGHT: "bold",
  FONTFAMILY: V.FONTFAMILY,
  COLOUR: "#181818",
  IMGWIDTH: "200",
  IMGHEIGHT: "200"
}, Xd = {
  passive: {
    stroke: "#000",
    fill: "#ccc",
    width: 1,
    radius: 6
  },
  hover: {
    stroke: "#800",
    fill: "#fff",
    width: 1,
    radius: 6
  },
  active: {
    stroke: "#800",
    fill: "#fff",
    width: 1,
    radius: 6
  }
}, Is = { arrowDown: Ad, arrowUp: Od, arrowDownRound: Dd, arrowUpRound: Id, arrowDownRoundSolid: Nd, arrowUpRoundSolid: Rd, buySolid: kd, sellSolid: $d }, wa = { noteSolid: Hd, lightning: _d }, cs = {
  title: {
    display: !0
  },
  candle: {
    Type: me.CANDLE_SOLID,
    UpBodyColour: Ei.COLOUR_CANDLE_UP,
    UpWickColour: Ei.COLOUR_WICK_UP,
    DnBodyColour: Ei.COLOUR_CANDLE_DN,
    DnWickColour: Ei.COLOUR_WICK_DN
  },
  volume: {
    Height: _i.ONCHART_VOLUME_HEIGHT,
    UpColour: _i.COLOUR_VOLUME_UP,
    DnColour: _i.COLOUR_VOLUME_DN
  },
  xAxis: {
    colourTick: pt.COLOUR_TICK,
    colourLabel: pt.COLOUR_LABEL,
    colourCursor: pt.COLOUR_CURSOR,
    colourCursorBG: pt.COLOUR_CURSOR_BG,
    fontFamily: pt.FONTFAMILY,
    fontSize: pt.FONTSIZE,
    fontWeight: pt.FONTWEIGHT,
    line: "#656565",
    slider: "#555555",
    handle: "#55555588",
    icon: hi,
    iconHover: kt
  },
  yAxis: {
    colourTick: Ie.COLOUR_TICK,
    colourLabel: Ie.COLOUR_LABEL,
    colourCursor: Ie.COLOUR_CURSOR,
    colourCursorBG: Ie.COLOUR_CURSOR_BG,
    fontFamily: Ie.FONTFAMILY,
    fontSize: Ie.FONTSIZE,
    fontWeight: Ie.FONTWEIGHT,
    line: "#656565"
  },
  chart: {
    Background: V.COLOUR_BG,
    BorderColour: V.COLOUR_BORDER,
    BorderThickness: V.BORDER_THICKNESS,
    TextColour: V.COLOUR_TXT,
    FontWeight: V.FONTWEIGHT,
    FontSize: V.FONTSIZE,
    FontStyle: V.FONTSTYLE,
    FontFamily: V.FONTFAMILY,
    Font: V.FONT,
    FontString: V.FONTSTRING,
    GridColour: ml.COLOUR_GRID
  },
  primaryPane: {
    separator: "#666"
  },
  secondaryPane: {
    separator: "#666"
  },
  tools: {
    location: !1
  },
  utils: {
    location: !1
  },
  time: {
    navigation: !1,
    font: ir,
    colour: "#96a9db",
    handleColour: "#586ea6"
  },
  legend: {
    font: ba.font,
    colour: ba.colour,
    controls: !0,
    controlsColour: "#aaa",
    controlsOver: "#fff",
    controlsW: 18,
    controlsH: 18
  },
  icon: {
    colour: hi,
    hover: kt
  },
  divider: {
    active: Pi.ACTIVE,
    idle: Pi.IDLE,
    line: Pi.LINE,
    style: Pi.STYLE
  },
  window: Qe,
  watermark: jd,
  trades: {
    iconBuy: Is.arrowUp,
    iconSell: Is.arrowDown,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    buyColour: "#0f0",
    sellColour: "#f00",
    defaultIcons: Is,
    offset: 10,
    positionLine: 1,
    positionStyle: "1px solid",
    positionDash: [1, 0],
    stopLossColour: "#fc0",
    stopLossLine: 1,
    stopLossStyle: "1px solid",
    stopLossDash: [1, 0],
    takeProfitColour: "#0cf",
    takeProfitLine: 1,
    takeProfitStyle: "1px solid",
    takeProfitDash: [1, 0]
  },
  events: {
    iconEvent: wa.lightning,
    iconHeight: 30,
    iconWidth: 30,
    iconMinDim: 10,
    iconColour: "#ccc",
    defaultIcons: wa,
    offset: 10
  },
  drawing: {
    node: Xd
  }
}, Yd = `
<style id="txc_CSSVars">
  --txc-background: #141414:
  --txc-border-color: #888;
  --txc-time-scrollbar-color: #888;
  --txc-time-handle-color: #888;
  --txc-time-slider-color: #888;
  --txc-time-cursor-fore: #222;
  --txc-time-cursor-back: #ccc;
  --txc-time-icon-color: #888;
  --txc-time-icon-hover-color: #888;
</style>`, Kd = `
<style id="txc_globalCSS">
  tradex-chart {
    content-visibility: auto;
    display: grid;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${Ud});
    min-height: var(--txc-min-height, ${ol});
    max-width: var(--txc-max-width, ${ll});
    max-height: var(--txc-max-height, ${hl});
    overflow: hidden;
    background: var(--txc-background, ${V.COLOUR_BG});
    font: var(--txc-font, ${V.FONT});
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
`, xa = "initialEmptyState", Ns = "Empty", pl = {
  id: void 0,
  title: Ns,
  symbol: Ns,
  width: ll,
  height: hl,
  utils: {},
  tools: {},
  timeFrame: "1m",
  range: {
    startTS: void 0
  },
  theme: cs,
  watermark: {
    display: !1,
    text: Ns
  },
  trades: {
    display: !0,
    displayInfo: !0
  },
  precision: ho,
  isCrypto: !0,
  logs: !1,
  infos: !0,
  warnings: !0,
  highLow: !1,
  errors: !0,
  stream: {},
  maxCandleUpdate: 250,
  talib: void 0,
  wasm: void 0,
  state: {},
  callbacks: {}
};
class fl {
  #e;
  #t;
  #i;
  constructor(e) {
    this.#t = e, this.#e = this.#t.core, this.#i = this.#e.Chart;
  }
  get core() {
    return this.#e;
  }
  get chart() {
    return this.#i;
  }
  get parent() {
    return this.#t;
  }
  get theme() {
    return this.#e.theme;
  }
  get width() {
    return this.#i.width;
  }
  get height() {
    return this.#i.height;
  }
  get data() {
    return this.#i.data;
  }
  get range() {
    return this.#i.range;
  }
  get yDigits() {
    return this.#i.yAxisDigits;
  }
}
class Ui extends fl {
  #e = 4;
  #t;
  #i = !0;
  constructor(e) {
    super(e);
  }
  get range() {
    return this.parent.range;
  }
  get width() {
    return this.core.MainPane.width;
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
    return He(this.core.Chart.layerWidth / this.candleW);
  }
  get xAxisRatio() {
    return this.width / this.range.rangeDuration;
  }
  set xAxisTicks(e) {
    this.#e = P(e) ? e : 0;
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
    return He(this.range.rangeIndex(e) * this.candleW + this.candleW * 0.5);
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
    let i = this.range.indexStart, s = He(e / this.candleW);
    return i + s;
  }
  pixelOHLCV(e) {
    let i = this.pixel2Index(e);
    return this.range.value(i);
  }
  xPosSnap2CandlePos(e) {
    let i = e % this.candleW, s = i ? this.candleW / 2 : 0;
    return He(e - i + s);
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
    }, s = jn(e.rangeDuration);
    i.units = s;
    for (let f in s)
      if (s[f] > 0) {
        i.units = [f, f], i.timeSpan = `${s[f]} ${f}`;
        break;
      }
    const n = e.interval, { xStep: r, rank: o } = this.xStep(e), l = this.pixel2T(this.width) + r;
    let c = e.timeMin - e.timeMin % r - r, p = c;
    for (; c < l; ) {
      let f = Ri(c, "years"), b = Ri(c, "months"), E = Ri(c, "days");
      !(f in i.entries) && f >= p ? i.entries[f] = [this.dateTimeValue(f, n, o), this.t2Pixel(f), f, "major"] : !(b in i.entries) && b >= p ? i.entries[b] = [this.dateTimeValue(b, n, o), this.t2Pixel(b), b, "major"] : !(E in i.entries) && E >= p ? i.entries[E] = [this.dateTimeValue(E, n, o), this.t2Pixel(E), E, "major"] : i.entries[c] = [this.dateTimeValue(c, n, o), this.t2Pixel(c), c, "minor"], c += r;
    }
    return i.values = Object.values(i.entries), i;
  }
  xStep(e) {
    let i = nd, s = this.#i ? e.interval : 1, n = Zt[0], r = He(this.width / e.Length), o = gn[0], l = Zt.indexOf(s);
    for (; l-- >= 0 && !(r * (Zt[l] / s) >= i); )
      ;
    return n = Zt[l], o = gn[l], { xStep: n, rank: o };
  }
  dateTimeValue(e, i, s) {
    let n;
    if (e / G % 1 === 0) {
      const r = Zn(e);
      return r === 1 ? Qn(e) === 0 ? il(e) : el(e) : `${Jo(e, n)} ${r}`;
    } else
      switch (s) {
        case "milliseconds":
          return wn(e);
        case "seconds":
          return wn(e);
        case "minutes":
          return bn(e);
        case "hours":
          return bn(e);
      }
  }
}
class ii extends fl {
  #e;
  #t;
  #i;
  #n = R.percent;
  #s = "automatic";
  #r = {
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
      get secondaryMaxMin() {
        return this.range?.secondaryMaxMin;
      },
      range: null
    },
    manual: {
      max: 1,
      min: 0,
      mid: 0.5,
      diff: 1,
      zoom: 1,
      offset: 0,
      secondaryMaxMin: {}
    }
  };
  #a = 1;
  #o = oa;
  #c = 3;
  #l;
  #u;
  #h;
  constructor(e, i, s = R.default, n) {
    super(e), this.#i = i, this.#e = e, this.#t = e.parent, this.yAxisType = R.valid(s), s == R.relative ? n = this.core.range : n = n || this.core.range, this.setRange(n);
  }
  get chart() {
    return this.#i;
  }
  get range() {
    return this.#h;
  }
  get height() {
    return this.chart.height;
  }
  get rangeH() {
    return this.#h.diff * this.yAxisPadding;
  }
  get yAxisRatio() {
    return this.getYAxisRatio();
  }
  get yAxisPrecision() {
    return this.yAxisCalcPrecision;
  }
  set yAxisPadding(e) {
    (P(e) || e != 0) && (this.#a = e);
  }
  get yAxisPadding() {
    return this.#a;
  }
  set yAxisType(e) {
    this.#n = R.valid(e);
  }
  get yAxisType() {
    return this.#n;
  }
  set yAxisStep(e) {
    this.#o = P(e) ? e : oa;
  }
  get yAxisStep() {
    return this.#o;
  }
  set yAxisTicks(e) {
    this.#c = P(e) ? e : 0;
  }
  get yAxisTicks() {
    return this.#c;
  }
  get yAxisGrads() {
    return this.#l;
  }
  get yAxisDigits() {
    return this.parent.digitCnt;
  }
  get step() {
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
    return this.#h.offset;
  }
  set zoom(e) {
    this.setZoom(e);
  }
  get zoom() {
    return this.#h.zoom;
  }
  getYAxisRatio() {
    return this.height / this.#h.diff;
  }
  getMaxMinDiff() {
    let e = this.#h.max > 0 ? this.#h.max : 1, i = this.#h.min > 0 ? this.#h.min : 0, s = this.parent.parent, n = s.view[0]?.id, r = this.range.secondaryMaxMin || {}, o = this.#h;
    !s.isPrimary && n in r && (e = r[n]?.data?.max || 0, i = r[n]?.data?.min || 0, o = r[n]?.data || []), e == i && (e == 0 ? (e = 0.05, i = -0.05) : (e = e + e * 0.05, i = i + i * 0.05)), this.mode != "manual" && (e *= this.#a || 1, i *= 1 - (this.#a - 1) || 1);
    let l = e - i;
    return { max: e, min: i, diff: l, pane: o };
  }
  yAxisRangeBounds() {
  }
  yAxisLog() {
  }
  yAxisCntDigits(e) {
    return Ii(e);
  }
  yAxisCalcPrecision() {
    let e = Lo(this.#h.max);
    return this.yDigits - e;
  }
  yAxisCursor() {
  }
  yPos(e) {
    let i;
    switch (this.yAxisType) {
      case R.relative:
        i = this.val2Pixel(e);
        break;
      case R.percent:
        i = this.p100toPixel(e);
        break;
      case R.log:
        i = this.$2Pixel(yu(e));
        break;
      default:
        i = this.$2Pixel(e);
        break;
    }
    return He(i);
  }
  val2Pixel(e) {
    let i;
    if (this.parent.parent.isPrimary)
      i = this.$2Pixel(e);
    else {
      let n = this.height, { min: r, diff: o } = this.getMaxMinDiff();
      i = n - n * ((e - r) / o);
    }
    return i;
  }
  $2Pixel(e) {
    const i = e - this.#h.min;
    return this.height - i * this.yAxisRatio;
  }
  lastYData2Pixel(e) {
    let i = e - this.core.stream.lastPriceMin;
    return this.height - i * this.yAxisRatio;
  }
  p100toPixel(e) {
    return this.$2Pixel(e);
  }
  yPos2Price(e) {
    return this.pixel2$(e);
  }
  pixel2Val(e) {
    return this.pixel2$(e);
  }
  pixel2$(e) {
    let { min: i, diff: s } = this.getMaxMinDiff(), n = (this.height - e) / this.height, r = s * n;
    return i + r;
  }
  yAxisTransform() {
  }
  setMode(e) {
    if (!["automatic", "manual"].includes(e)) return !1;
    let i = this.#r.manual;
    return this.mode == "automatic" && e == "manual" ? (i.max = this.#h.valueMax, i.min = this.#h.valueMin, i.diff = i.max - i.min, i.zoom = 0, i.secondaryMaxMin = Xi(this.#h.secondaryMaxMin), this.#s = e, this.core.emit("yaxis_setmode", { mode: e, axis: this })) : this.mode == "manual" && e == "automatic" && (i.zoom = 0, this.#s = e, this.core.emit("yaxis_setmode", { mode: e, axis: this })), !0;
  }
  transformPrimarySecondary() {
    let e = this.#r.manual;
    if (this.#n != R.percent && !this.parent.parent.isPrimary) {
      let { pane: i } = this.getMaxMinDiff();
      e = i;
    }
    return e;
  }
  setOffset(e) {
    if (!P(e) || e == 0 || this.#s !== "manual") return !1;
    let i = this.transformPrimarySecondary(), s = this.pixel2Val(e * -1), n = this.pixel2Val(this.height - e), r = s - n;
    i.min = n, i.max = s, i.mid = r / 2, i.diff = r, i.zoom = 0;
  }
  setZoom(e) {
    if (!P(e) || this.#s !== "manual") return !1;
    let i = this.#r.manual, { max: s, min: n, diff: r, pane: o } = this.getMaxMinDiff();
    const l = r * 0.01, c = e * l;
    n -= c, s += c, !(s < n || n <= 1 / 0 * -1 || s >= 1 / 0) && (o.min -= c, o.max += c, i.max = s, i.min = n, i.mid = r / 2, i.diff = r, i.zoom = c);
  }
  setRange(e) {
    this.#r.automatic.range = e, this.#h = new Proxy(e, {
      get: (i, s) => {
        const n = this.#s, r = this.#r[n], o = r[s];
        switch (s) {
          case "max":
            return o;
          case "min":
            return o;
          case "mid":
            return r.min + (r.max - r.min);
          case "diff":
            return r.max - r.min;
          case "zoom":
            return o;
          case "offset":
            return o;
          case "secondaryMaxMin":
            return o;
          default:
            return i[s];
        }
      }
    });
  }
  calcGradations() {
    let e, i, s, n;
    switch (i = this.#h.max > 0 ? this.#h.max : 1, s = this.#h.min > 0 ? this.#h.min : 0, this.yAxisType) {
      case R.percent:
        i = this.#h.max > -10 ? this.#h.max : 110, s = this.#h.min > -10 ? this.#h.min : -10;
        break;
      case R.relative:
        e = this.getMaxMinDiff(), i = e.max, s = e.min;
        break;
    }
    return n = this.#h.offset, this.#l = this.gradations(i + n, s + n), this.#l;
  }
  gradations(e, i, s = !0) {
    let n, r = [], o = e - i, l = this.niceNumber(o), c = Math.ceil(i / l) * l, p = Math.floor(e / l) * l, f = this.height, b = Ii(l), E;
    this.#u = b;
    for (var M = c; M <= p; M += l)
      n = Ii(M), E = pn(M, b.decimals) * 1, f = this.yPos(E), r.push([E, f, n]);
    return r;
  }
  niceNumber(e = this.rangeH) {
    const i = e / (this.height / (this.core.theme.yAxis.fontSize * Gd));
    let s = Math.pow(10, Math.ceil(Math.log10(i)));
    return i < 0.25 * s ? s = 0.25 * s : i < 0.5 * s && (s = 0.5 * s), s;
  }
}
function ar(a, e) {
  return Math.round(a.measureText(e).width);
}
function Ht(a = Re.fontSize, e = Re.fontWeight, i = Re.fontFamily) {
  return `${e} ${a}px ${i}`;
}
function us(a, e, i) {
  a.font = Ht(i?.fontSize, i?.fontWeight, i?.fontFamily);
  const s = ar(a, e), n = i?.paddingLeft || 0, r = i?.paddingRight || 0, o = i?.borderWidth || 0;
  return n + r + s + o * 2;
}
function ds(a) {
  const e = a?.paddingTop || 0, i = a?.paddingBottom || 0, s = a?.borderWidth || 0, n = a?.fontSize || 0;
  return e + i + n + s * 2;
}
function yl(a, e, i, s) {
  a.fillStyle = s?.colour, a.font = Ht(s?.fontSize, s?.fontWeight, s?.fontFamily), a.textAlign = s?.textAlign || "start", a.textBaseline = s?.textBaseLine || "alphabetic", a.direction = s?.direction || "inherit", a.lineWidth = s?.width, a.strokeStyle = s?.border, s?.stroke ? a.strokeText(s?.text, e, i, s?.max) : a.fillText(s?.text, e, i, s?.max);
}
function $t(a, e, i, s, n) {
  a.save(), a.font = Ht(n?.fontSize, n?.fontWeight, n?.fontFamily), a.textBaseline = "top", a.fillStyle = n?.bakCol || Re.bakCol;
  let r = n?.width || us(a, e, n), o = n?.height || ds(n);
  a.fillRect(i, s, r, o), a.fillStyle = n?.txtCol || Re.txtCol, i = i + n?.paddingLeft, s = s + n?.paddingTop, a.fillText(`${e}`, i, s), a.restore();
}
function vl(a, e, i, s, n, r) {
  a.lineWidth = r?.width || Re.borderWidth, a.strokeStyle = r?.border || Re.stroke, a.beginPath(), a.rect(e, i, s, n), a.stroke();
}
function ms(a, e, i, s, n, r) {
  a.fillStyle = r?.fill || Re.fill, a.fillRect(e, i, s, n);
}
function or(a, e, i, s, n, r) {
  T(r.fill) && ms(a, e, i, s, n, r), P(r.width) && r.width > 0 && vl(a, e, i, s, n, r);
}
function bl(a, e, i, s, n, r, o) {
  a.lineWidth = o?.width || Re.borderWidth, a.strokeStyle = o?.border || Re.stroke, xl(a, e, i, s, n, r), a.stroke();
}
function wl(a, e, i, s, n, r, o) {
  a.fillStyle = o?.fill || Re.fill, xl(a, e, i, s, n, r), a.fill();
}
function xl(a, e, i, s, n, r) {
  a.beginPath(), a.moveTo(e + r, i), a.arcTo(e + s, i, e + s, i + n, r), a.arcTo(e + s, i + n, e, i + n, r), a.arcTo(e, i + n, e, i, r), a.arcTo(e, i, e + s, i, r), a.closePath();
}
function Zd(a, e, i, s, n, r, o) {
  T(o.fill) && wl(a, e, i, s, n, r, o?.fill), P(o.width) && o.width > 0 && bl(a, e, i, s, n, r, o?.border, o?.width);
}
function zi(a, e = [], i = []) {
  let [s, n, r, o] = e;
  const l = a.createLinearGradient(s, n, r, o);
  let c = 0, p = 1 / (i.length - 1);
  for (let f of i)
    l.addColorStop(c, f), c += p;
  a.fillStyle = l;
}
function xt(a, e, i, s) {
  T(e) && (a.fillStyle = e, a.fill()), P(s) && s > 0 && (a.lineWidth = s, a.strokeStyle = i || Re.stroke, a.stroke());
}
function Cl(a, e, i, s, n, r, o) {
  if (!(n < 3)) {
    var l = Math.PI * 2 / n;
    a.beginPath(), a.translate(e, i), a.rotate(r * Math.PI / 180), a.moveTo(s, 0);
    for (var c = 1; c < n; c++)
      a.lineTo(s * Math.cos(l * c), s * Math.sin(l * c));
    a.closePath(), xt(a, o?.fill, o?.stroke, o?.width);
  }
}
function Qd(a, e, i) {
  if (e.length > 0) {
    a.beginPath();
    var s = e[0];
    a.moveTo(s.x, s.y);
    for (var n = 1; n < e.length; ++n)
      s = e[n], a.lineTo(s.x, s.y);
    a.closePath(), xt(a, i?.fill, i?.stroke, i?.width);
  }
}
function Jd(a, e, i, s, n) {
  Cl(a, e, i, s, 3, n?.rotate || 0, n), xt(a, n?.fill, n?.stroke, n?.width);
}
function em(a, e, i, s, n, r) {
  a.beginPath(), a.moveTo(e - s / 2, i), a.lineTo(e, i - n / 2), a.lineTo(e + s / 2, i), a.lineTo(e, i + n / 2), a.closePath(), xt(a, r?.fill, r?.stroke, r?.width);
}
function _t(a, e, i, s = () => {
}) {
  a.save();
  const n = i.width || 1;
  a.lineWidth = n, n % 2 && a.translate(0.5, 0.5), a.strokeStyle = i.stroke;
  let r = i?.dash;
  T(r) && (r = r.split(",")), L(r) && a.setLineDash(r), a.beginPath();
  let o = !0;
  e.forEach((l) => {
    l && l.x !== null && (o ? (a.moveTo(l.x, l.y), o = !1) : a.lineTo(l.x, l.y));
  }), _(s) && s(), a.restore();
}
function tm(a, e, i) {
  _t(a, e, i, () => {
    a.stroke();
  });
}
function im(a, e, i, s) {
  _t(a, e, i, () => {
    a.closePath();
  }), xt(a, s?.fill, s?.stroke, s?.size);
}
function sm(a, e, i) {
  a.beginPath(), a.moveTo(e[0].x, e[0].y);
  for (var s = i ?? 1, n = 0; n < e.length - 1; n++) {
    var r = n > 0 ? e[n - 1] : e[0], o = e[n], l = e[n + 1], c = n != e.length - 2 ? e[n + 2] : l, p = o.x + (l.x - r.x) / 6 * s, f = o.y + (l.y - r.y) / 6 * s, b = l.x - (c.x - o.x) / 6 * s, E = l.y - (c.y - o.y) / 6 * s;
    a.bezierCurveTo(p, f, b, E, l.x, l.y);
  }
  a.stroke();
}
function bt(a, e, i, s, n = {}) {
  _t(a, [{ x: i, y: e }, { x: s, y: e }], n, () => {
    a.stroke(), a.closePath();
  });
}
function nm(a, e, i, s, n = {}) {
  _t(a, [{ x: e, y: i }, { x: e, y: s }], n, () => {
    a.stroke(), a.closePath();
  });
}
function rm(a, e, i = {}) {
  _t(a, e, i, () => {
    a.stroke(), a.closePath();
  });
}
function am(a, e, i, s, n) {
  a.beginPath(), a.arc(e, i, s, 0, Math.PI * 2), a.closePath(), xt(a, n?.fill, n?.stroke, n?.width);
}
function lr(a, e, i, s, n, r) {
  for (let o = 0; o < i; o++)
    for (let l = 0; l < s; l++)
      l % 2 == 0 && o % 2 == 0 || l % 2 != 0 && o % 2 != 0 ? a.fillStyle = n : a.fillStyle = r, a.fillRect(l * e, o * e, e, e);
}
function om(a) {
  or(a, x, y, w, h, opts);
}
class Yt {
  #e = {};
  constructor() {
  }
  on(e, i, s) {
    return !T(e) || !_(i) ? !1 : (this.#e[e] || (this.#e[e] = []), this.#e[e].push({ handler: i, context: s }), !0);
  }
  off(e, i, s) {
    if (!T(e) || !_(i) || !(e in this.#e)) return !1;
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
  expunge(e) {
    let i, s = this.#e;
    for (i in s)
      for (let n = 0; n < s[i].length; n++)
        if (s[i][n].context === e && (s[i].splice(n, 1), s[i].length === 0)) {
          delete s[i];
          break;
        }
    return !0;
  }
  emit(e, i) {
    T(e) && (this.#e[e] || []).forEach(
      (s) => {
        try {
          s.handler.call(s.context, i);
        } catch (n) {
          console.error(n);
        }
      }
    );
  }
  execute(e, i, s) {
  }
}
class Z extends HTMLElement {
  static #e = [];
  static set observedAttributes(e) {
    L(e) && (Z.#e = e);
  }
  static get observedAttributes() {
    return Z.#e;
  }
  #t;
  #i;
  #n;
  ID = ae(nt);
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
  constructor(e, i = "open") {
    super(), this.#n = new Yt(), this.#i = e, this.#t = this.attachShadow({ mode: i });
  }
  destroy() {
  }
  connectedCallback(e) {
    this.doInit && (this.doInit = !1, this.shadowRoot.appendChild(this.template.content.cloneNode(!0)), this.DOM.width = this.clientWidth, this.DOM.height = this.clientHeight, this.oldDOM.width = this.clientWidth, this.oldDOM.height = this.clientHeight, this.intersectionObserver = new IntersectionObserver(this.onResize.bind(this)), this.intersectionObserver.observe(this), this.resizeObserver = new ResizeObserver(this.onResize.bind(this)), this.resizeObserver.observe(this), _(e) && e());
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
  get shadowRoot() {
    return this.#t;
  }
  get template() {
    return this.#i;
  }
  get hub() {
    return this.#n;
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
  set top(e) {
    this.setPos(e, "top");
  }
  get top() {
    return this.DOM.top;
  }
  set left(e) {
    this.setPos(e, "left");
  }
  get left() {
    return this.DOM.left;
  }
  set bottom(e) {
    this.setPos(e, "bottom");
  }
  get bottom() {
    return this.DOM.bottom;
  }
  set right(e) {
    this.setPos(e, "right");
  }
  get right() {
    return this.DOM.right;
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
    !["width", "height", "top", "bottom", "left", "right"].includes(i) || !T(e) || (P(e) ? (this.DOM[i] = e, e += "px") : T(e) ? e.match(Kt) || (e = "100%") : (this.DOM[i] = this.parentElement.getBoundingClientRect()[i], e = this.DOM[i] + "px"), this.style[i] = e);
  }
  setPos(e, i) {
    this.setDim(e, i);
  }
  getDims() {
    const e = this.getBoundingClientRect();
    for (let i in e) {
      const s = e[i];
      _(s) || (this.DOM[i] = s);
    }
    return this.DOM.visible = wt(this), this.DOM.viewport = Hn(this), this.DOM;
  }
  onIntersection(e) {
    this.emit("intersection", this);
  }
  onMutation(e) {
    this.emit("mutation", this);
  }
  onResize(e) {
    this.oldDOM = { ...this.DOM }, this.getDims(), this.emit("resize", this.DOM);
  }
  on(e, i, s = this) {
    return this.#n instanceof Yt ? this.#n.on(e, i, s) : !1;
  }
  off(e, i, s = this) {
    return this.#n instanceof Yt ? this.#n.off(e, i, s) : !1;
  }
  expunge(e) {
    return this.#n instanceof Yt ? this.#n.expunge(e) : !1;
  }
  emit(e, i) {
    return this.#n instanceof Yt ? this.#n.emit(e, i) : !1;
  }
}
const Tl = document.createElement("template");
Tl.innerHTML = `
<style>
  input[type="range"][orient="vertical"] {
    writing-mode: bt-lr;
    appearance: slider-vertical;
    padding: 0;
    margin: 0;
    border: 0;
  }
</style>
<div class="slider">
</div>
`;
const lm = ["min", "max", "value", "step", "orient", "width", "height"];
class hm extends Z {
  #e;
  #t;
  #i;
  #n = 1;
  #s;
  #r = {};
  constructor() {
    super(Tl);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        for (let e of lm) {
          let i = this.getAttribute(e);
          i && (this.#r[e] = i);
        }
        this.#t = this.shadowRoot.querySelector(".slider"), this.mount(), this.#i = this.shadowRoot.querySelector("#s1"), this.#i.addEventListener("input", this.#a.bind(this));
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  set value(e) {
    this.#r.value = e;
  }
  get value() {
    return this.#r.value;
  }
  set min(e) {
    this.#r.min = e;
  }
  get min() {
    return this.#r.min;
  }
  set max(e) {
    this.#r.max = e;
  }
  get max() {
    return this.#r.max;
  }
  set step(e) {
    this.#r.step = e;
  }
  get step() {
    return this.#r.step;
  }
  #a(e) {
    this.value = e.target.value;
    const i = new CustomEvent("change", {
      detail: { value: this.value },
      bubbles: !0,
      cancelable: !0,
      composed: !1
    });
    this.dispatchEvent(i);
  }
  mount() {
    const s = { id: `s${this.#n}`, klass: "", ...this.#r };
    this.#t.innerHTML = this.insertRange(s);
  }
  insertRange({ id: e, klass: i, min: s, max: n, value: r, step: o, orient: l, width: c, height: p }) {
    let f = "";
    return f += c ? `width: ${c}px; ` : "", f += p ? `height: ${p}px; ` : "", `<input type="range" id="${e}" class="${i}" style="${f}" min="${s}" max="${n}" value="${r}" step="${o}" orient="${l}" width="${c}" height="${p}"/>`;
  }
}
customElements.get("tradex-slider") || window.customElements.define("tradex-slider", hm);
const Sl = ["source-over", "source-atop", "source-in", "source-out", "destination-over", "destination-atop", "destination-in", "destination-out", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], hr = typeof OffscreenCanvas < "u", cm = ["2d", "webgl", "webgl2d", "webgl2", "webgpu", "bitmaprenderer"];
let El = class {
  #e = 0;
  #t;
  #i;
  #n;
  #s;
  constructor(e = {}) {
    if (!W(e?.container)) throw new Error("Viewport container is not a valid HTML element.");
    this.#s = e.container, this.#n = [], this.#t = j.idCnt++, this.#i = new j.Scene(e);
    let { width: i, height: s } = Qi(e?.width || 0, e?.height || 0);
    this.setSize(i, s);
  }
  get id() {
    return this.#t;
  }
  get scene() {
    return this.#i;
  }
  get layers() {
    return this.#n;
  }
  get container() {
    return this.#s;
  }
  get OffscreenCanvas() {
    return hr;
  }
  generateKey() {
    return this.#e++;
  }
  setSize(e, i) {
    let { width: s, height: n } = Qi(e, i);
    return this.width = s, this.height = n, this.scene.setSize(s, n), this.layers.forEach(function(r) {
      r.setSize(s, n);
    }), this;
  }
  addLayer(e) {
    return e instanceof Sn ? (this.layers.push(e), e.setSize(e.width || this.width, e.height || this.height), e.viewport = this, this) : !1;
  }
  removeLayer(e) {
    return e instanceof Sn ? (this.layers.splice(e.index, 1), !0) : !1;
  }
  getIntersection(e, i) {
    for (var s = this.layers, n = s.length - 1, r, o; n >= 0; ) {
      if (r = s[n], o = r.hit.getIntersection(e, i), o >= 0)
        return o;
      n--;
    }
    return -1;
  }
  get index() {
    let e = j.viewports, i, s = 0;
    for (i of e) {
      if (this.id === i.id) return s;
      s++;
    }
    return null;
  }
  destroy() {
    for (let e of this.layers)
      this.removeLayer(e), e.destroy();
  }
  render(e = !1) {
    let { scene: i, layers: s } = this, n;
    i.clear();
    for (n of s)
      if (e && L(n.layers) && n.layers.length > 0 && n.render(e), n.visible && n.width > 0 && n.height > 0) {
        const r = i.context;
        Sl.includes(n?.composition) && (r.globalCompositeOperation = n.composition), r.globalAlpha = n.alpha, r.scale(1, 1), r.drawImage(
          n.scene.canvas,
          n.x,
          n.y,
          n.width,
          n.height
        );
      }
  }
};
class um extends El {
  constructor(e = {}) {
    const i = { ...e };
    i.offscreen = !1, super(i);
    const s = this.scene.canvas, n = e.container;
    n?.hasCanvasSlot && (s.slot = "viewportCanvas"), n.innerHTML = "", n.appendChild(s), j.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", j.viewports.splice(this.index, 1);
  }
}
class Sn {
  #e = 0;
  #t = 0;
  #i = 0;
  #n = 0;
  #s = 1;
  #r = !0;
  #a = null;
  #o = hr;
  viewport;
  constructor(e = {}) {
    const i = { ...e };
    this.id = j.idCnt++, this.#o = q(e?.offscreen) ? e.offscreen : this.#o, i.layer = this, i.offscreen = this.#o, this.hit = new j.Hit(i), this.scene = new j.Scene(i), e?.x && e?.y && this.setPosition(e.x, e.y), e?.width && e?.height && this.setSize(e.width, e.height), e?.composition && (this.setComposition = e.composition), e?.alpha && (this.alpha = e.alpha), e?.visible && (this.visible = e.visible);
  }
  set x(e) {
    P(e) && (this.#e = e);
  }
  get x() {
    return this.#e;
  }
  set y(e) {
    P(e) && (this.#t = e);
  }
  get y() {
    return this.#t;
  }
  set width(e) {
    P(e) && (this.#i = e);
  }
  get width() {
    return this.#i;
  }
  set height(e) {
    P(e) && (this.#n = e);
  }
  get height() {
    return this.#n;
  }
  set alpha(e) {
    this.#s = P(e) ? U(e, 0, 1) : 1;
  }
  get alpha() {
    return this.#s;
  }
  set composition(e) {
    Sl.includes(e) && (this.#a = e);
  }
  get composition() {
    return this.#a;
  }
  set visible(e) {
    q(e) && (this.#r = e);
  }
  get visible() {
    return this.#r;
  }
  get isOffScreen() {
    return this.#o;
  }
  get index() {
    let e = this.viewport.layers, i = 0, s;
    for (s of e) {
      if (this.id === s.id) return i;
      i++;
    }
    return null;
  }
  setPosition(e, i) {
    return this.x = e, this.y = i, this;
  }
  setSize(e, i) {
    let { width: s, height: n } = Qi(e, i);
    return this.width = s, this.height = n, this.scene.setSize(s, n), this.hit.setSize(s, n), this;
  }
  move(e) {
    let { index: i = 0, viewport: s } = this, n = s.layers, r;
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
        Io(n, this.index, r);
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
    return this.viewport.removeLayer(this);
  }
  destroy() {
    Ml(1, 1), this.scene.clear(), this.hit.clear();
  }
}
class Pl {
  #e;
  #t = 0;
  #i = 0;
  #n;
  #s = !0;
  #r;
  #a;
  #o;
  constructor(e = { offscreen: !0 }) {
    this.#e = j.idCnt++, this.#o = e?.layer, this.#a = cm.includes(e?.contextType) ? e.contextType : "2d";
    const i = document.createElement("canvas");
    i.className = "scene-canvas", i.style.display = "block", e.offscreen = q(e?.offscreen) ? e.offscreen : !0, hr && e.offscreen ? (this.#n = i.transferControlToOffscreen(), this.#s = !0) : (this.#n = i, this.#s = !1), this.#a == "webgl2d" ? this.#r = this.getContext("2d") : this.#r = this.getContext(this.contextType), e?.width && e?.height && this.setSize(e.width, e.height);
  }
  get id() {
    return this.#e;
  }
  set width(e) {
    P(e) && (this.#t = e);
  }
  get width() {
    return this.#t;
  }
  set height(e) {
    P(e) && (this.#i = e);
  }
  get height() {
    return this.#i;
  }
  get canvas() {
    return this.#n;
  }
  get offscreen() {
    return this.#s;
  }
  get contextType() {
    return this.#a;
  }
  get context() {
    return this.#r;
  }
  get layer() {
    return this.#o;
  }
  setSize(e, i) {
    return Ml(e, i, this);
  }
  clear() {
    return pm(this);
  }
}
class dm extends Pl {
  constructor(e = { offscreen: !0 }) {
    super(e);
  }
  getContext(e) {
    return this.canvas.getContext(e);
  }
  toImage(e = "image/png", i, s) {
    let n = this, r = new Image(), o = this.canvas.toDataURL(e, i);
    r.onload = function() {
      r.width = n.width, r.height = n.height, s(r);
    }, r.src = o;
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
class mm extends Pl {
  constructor(e = {}) {
    super(e);
  }
  getContext(e) {
    return this.canvas.getContext(e, {
      preserveDrawingBuffer: !0,
      antialias: !1
    });
  }
  getIntersection(e, i) {
    let s = this.context, n;
    if (e = Math.round(e - this.layer.x), i = Math.round(i - this.layer.y), e < 0 || i < 0 || e > this.width || i > this.height)
      return -1;
    if (this.contextType === "2d") {
      if (n = s.getImageData(e, i, 1, 1).data, n[3] < 255)
        return -1;
    } else if (n = new Uint8Array(4), s.readPixels(
      e * j.pixelRatio,
      (this.height - i - 1) * j.pixelRatio,
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
function pm(a) {
  let e = a.context;
  return a.contextType === "2d" ? (e.scale(1, 1), e.clearRect(
    0,
    0,
    a.width,
    a.height
  )) : e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), a;
}
function Qi(a, e) {
  return a < 0 && (a = 0), e < 0 && (e = 0), { width: a, height: e };
}
function Ml(a, e, i, s = !0) {
  let { width: n, height: r } = Qi(a, e);
  return i.width = n, i.height = r, i.canvas.width = n * j.pixelRatio, i.canvas.height = r * j.pixelRatio, i.offscreen ? (i.canvas.width = n, i.canvas.height = r) : (i.canvas.style.width = `${n}px`, i.canvas.style.height = `${r}px`), i.contextType !== "2d" && i.contextType !== "bitmaprenderer" && i.context.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight), s && i.contextType === "2d" && j.pixelRatio !== 1 && !i.offscreen && i.context.scale(j.pixelRatio, j.pixelRatio), i;
}
const j = {
  idCnt: 0,
  viewports: [],
  pixelRatio: window && window.devicePixelRatio || 1,
  Node: El,
  Viewport: um,
  Layer: Sn,
  Scene: dm,
  Hit: mm
}, Ji = 128, Rs = 20, it = [
  "#263238",
  "#B71C1C",
  "#BF360C",
  "#FF6F00",
  "#827717",
  "#194D33",
  "#006064",
  "#0D47A1",
  "#311B92",
  "#880E4F",
  "#455A64",
  "#D32F2F",
  "#E64A19",
  "#FFA000",
  "#AFB42B",
  "#388E3C",
  "#0097A7",
  "#1976D2",
  "#512DA8",
  "#C2185B",
  "#607D8B",
  "#F44336",
  "#FF5722",
  "#FFC107",
  "#CDDC39",
  "#4CAF50",
  "#00BCD4",
  "#2196F3",
  "#673AB7",
  "#E91E63",
  "#90A4AE",
  "#E57373",
  "#FF8A65",
  "#FFD54F",
  "#DCE775",
  "#81C784",
  "#4DD0E1",
  "#64B5F6",
  "#9575CD",
  "#F06292",
  "#CFD8DC",
  "#FFCDD2",
  "#FFCCBC",
  "#FFECB3",
  "#F0F4C3",
  "#C8E6C9",
  "#B2EBF2",
  "#BBDEFB",
  "#D1C4E9",
  "#F8BBD0"
], Ll = document.createElement("template");
Ll.innerHTML = `
<style>
  .colourpicker {
    display: grid;
    grid-template-columns: [first] ${Ji}px [second] ${Rs}px;
    grid-template-rows: [mixer] 2em [fields] 2em [swatches] 1fr;
    row-gap: 5px;
    border: 1px solid #aaa;
    border-radius: 5px;
    box-shadow: ${Qe.SHADOW};
    background: #ccc;
    color: #444;
    padding: 5px;
  }
  .hex {
    font-weight: bold;
  }
  .number {
    width: 2em;
  }
  .colval {
    width: 6em;
  }

  .default .mixer {
    display: none;
  }

  .mixer {
    position: relative;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  .mixer .viewport {
    position: absolute;
  }
  .mixer .checks {
    top: 0;
    left: 0;
  }
  .mixer .rgbv {
    top: 0;
    left: 0;
    opacity: 1;
  }

  .palette {
    grid-column-start: 1;
    grid-column-end: span 2;
    grid-row-start: 3;
    display: flex;
    width: 150px;
    flex-flow: wrap;
    justify-content: space-around;
    row-gap: 2px;
    column-gap: 2px;
  }
  .palette button {
    width: 12px;
    height: 12px;
    border: 1px;
    border-radius: 3px;
  }

  tradex-slider[orient="vertical"] {
    grid-column-start: 2;
    grid-row-start: 1;
    grid-row-end: span 3;
    width: ${Rs}px;
  }
  tradex-slider[orient="horizontal"] {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    width: ${Rs}px;
  }

  span {
    grid-column-start: 2;
    grid-row-start: 1;
    padding-left: .5em;
    padding-top: .25em;
    font-weight: bold;
  }

  .fields {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .fields input {
    border: 1px solid #888;
    border-radius: 3px;
    font-size: ${V.FONTSIZE};
  }

</style>
<div class="colourpicker default">
  <tradex-slider max="255" min="0" step="1" value="255" orient="horizontal" width="${Ji}" ></tradex-slider>
  <span>A</span>
  <div class="fields">
    <input type="text" class="colval"/>
    <button class="submit ok">OK</button>
  </div>
</div>
`;
class ie {
  static opened = new ie("opened");
  static active = new ie("active");
  static closed = new ie("closed");
  constructor(e) {
    this.name = e;
  }
}
class fm extends Z {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #a;
  #o;
  #c;
  #l;
  #u;
  #h;
  #d;
  #m;
  #f;
  #g;
  #T = {
    size: Ji
  };
  #v;
  #w;
  #x = {};
  #p = ie.closed;
  #S = { cfg: "default" };
  constructor() {
    super(Ll);
  }
  destroy() {
    this.#e.remove();
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#v = new lt("#f00"), this.#e = this.shadowRoot.querySelector(".colourpicker"), this.build(), this.#t = this.shadowRoot.querySelector(".mixer"), this.#i = this.shadowRoot.querySelector(".palette"), this.#a = this.shadowRoot.querySelector(".alpha"), this.#o = this.shadowRoot.querySelector(".submit"), this.#d = this.shadowRoot.querySelector(".colval"), this.#m = this.shadowRoot.querySelector(".rgbv"), this.#f = this.shadowRoot.querySelector(".checker"), this.#g = this.shadowRoot.querySelector("tradex-slider");
        const e = (i) => {
          this.setColour(i.target.value), this.#w.dispatchEvent(new Event("change"));
        };
        this.#d.addEventListener("change", e), this.#o.addEventListener("click", this.close.bind(this)), this.#g.addEventListener("input", this.#y.bind(this)), this.#g.addEventListener("pointerup", this.#y.bind(this));
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  get elMixer() {
    return this.#t;
  }
  get elPalette() {
    return this.#i;
  }
  get elColVal() {
    return this.#d;
  }
  get elModel() {
    return this.#s;
  }
  get elRGB() {
    return this.#r;
  }
  get elAlpha() {
    return this.#a;
  }
  get elSubmit() {
    return this.#o;
  }
  set colour(e) {
    this.setColour(e);
  }
  get colour() {
    return this.#v;
  }
  set target(e) {
    this.#w = e;
  }
  get target() {
    return this.#w;
  }
  set state(e) {
    e instanceof ie && (this.#p = e);
  }
  get state() {
    return this.#p;
  }
  setColour(e) {
    let i;
    return T(e) ? (i = new lt(e), i.isValid ? (this.#v = i, this.#d.value = i.value.hexa, this.#g.value = Math.floor(255 * i.value.a), W(this.#w) && (this.#w.value = i.value.hexa, this.#w.dispatchEvent(new Event("change"))), this.#m.style.opacity = i.value.a, !0) : !1) : !1;
  }
  setAlpha(e) {
    let i = (e * 1).toString(16).toUpperCase();
    i = ("00" + i).slice(-2);
    let s = this.#v.hex + i;
    this.setColour(s);
  }
  #y(e) {
    this.setAlpha(e.target.value);
  }
  onOutsideClickListener(e) {
    if (!this.contains(e.target) && this.state === ie.opened && (this.state = ie.active, this.classList.toggle("active"), document.removeEventListener("click", this.#x.click), delete this.#x.click), !this.contains(e.target) && e.target?.type === "color" && (this.state === ie.closed || this.state === ie.active))
      this.state = ie.opened, this.classList.add("active"), this.setColour(e.target.value), e.preventDefault();
    else if (!this.contains(e.target) && e.target.tagName === "LABEL" && this.state === ie.closed) {
      const i = e.target.htmlFor, s = e.target.parentElement.querySelector(`#${i}`);
      s?.type === "color" && (this.state = ie.opened, this.classList.add("active"), this.setColour(s.value), e.preventDefault());
    } else !this.contains(e.target) && e.target.tagName === "LABEL" && this.state === ie.opened ? (this.state = ie.closed, this.classList.remove("active"), e.preventDefault()) : this.contains(e.target) || (this.state = ie.closed, this.classList.remove("active"));
  }
  onCanvasClick(e) {
    const i = e.clientX, s = e.clientY, n = this.#T.mixer.layers.rgbv.hit.getIntersection(i, s), r = this.#T.mixer.layers.rgbv.hit.getIndexValue(n);
    console.log(r);
  }
  position(e, i, s) {
    if (!P(e) || !P(i) || !W(s))
      return !1;
    this.top = i, this.left = e;
  }
  open(e, i, s) {
    return this.state !== ie.closed ? !1 : (s?.cfg == "gradient" || (this.#S.cfg == "default", this.#g.setAttribute("orient", "horizontal"), this.#g.setAttribute("width", Ji), this.#g.setAttribute("height", "")), this.setColour(e), this.target = i, this.state = ie.opened, this.classList.add("active"), setTimeout(() => {
      this.#x.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#x.click);
    }, 250), !0);
  }
  close() {
    this.state = ie.closed, this.classList.remove("active");
  }
  build() {
    this.#e.appendChild(this.mixerNode()), this.#e.appendChild(this.paletteNode());
  }
  paletteNode() {
    let e = "";
    for (let n of it)
      e += `<button style="background: ${n};" data-colour="${n}"></button>`;
    const i = document.createElement("div");
    i.classList.add("palette"), i.style.display = "flex", i.innerHTML = e;
    const s = i.querySelectorAll("button");
    for (let n of s)
      n.addEventListener("click", (r) => {
        const o = r.target.getAttribute("data-colour");
        this.colour = o, this.#w.value = o, this.#w.dispatchEvent(new Event("change"));
      });
    return i;
  }
  mixerNode() {
    return this.canvasNode("mixer");
  }
  canvasNode(e) {
    const i = document.createElement("div");
    i.classList.add(e), i.addEventListener("click", this.onCanvasClick.bind(this));
    const s = this.viewportNode("checks");
    i.appendChild(s.container);
    const n = this.viewportNode("rgbv");
    i.appendChild(n.container), s.container.style.cursor = "url(), 0, 0, copy";
    const r = s.viewport, o = n.viewport, l = {}, c = this.#T.size, p = { x: 0, y: 0, width: c, height: c };
    this.#T.layers = l, this.#T.view = r, l.grid = new j.Layer(p), r.addLayer(l.grid), l.rgbv = new j.Layer(p), o.addLayer(l.rgbv), this.#T[e] = { element: i, viewport: s, layers: l };
    let f = l.rgbv.scene.context, b = [0, 0, c, 0];
    return zi(f, b, ["#f00f", "#ff0f", "#0f0f", "#0fff", "#00ff", "#f0ff", "#f00f"]), f.fillRect(0, 0, c, c), f = l.rgbv.scene.context, b = [0, 0, 0, c], zi(f, b, ["#fff", "#0000", "#000"]), f.fillRect(0, 0, c, c), f = l.grid.scene.context, lr(f, 8, 16, 16, "#fff", "#ccc"), r.render(), o.render(), i;
  }
  viewportNode(e) {
    const i = document.createElement("div");
    i.classList.add("viewport"), i.classList.add(e);
    const s = new j.Viewport({
      width: this.#T.size,
      height: this.#T.size,
      container: i
    }), n = s.scene.canvas;
    return { viewport: s, container: i, canvas: n };
  }
  colourValueNode() {
    return "";
  }
  colourModelNode() {
    return "";
  }
  rgbSliderNode() {
    return "";
  }
  alphaSliderNode() {
    return "";
  }
  submitNode() {
    return "";
  }
  gradient(e, i, s, n) {
    zi(e, [0, 0, 0, 0], [i, s]);
  }
  compositeLayers() {
    const e = this.#T.layers, i = ["rgb", "value"], s = e.rgbv.scene.context;
    for (let o of i)
      s.drawImage(
        e[o].scene.canvas,
        e[o].x,
        e[o].y,
        e[o].width,
        e[o].height
      );
    const n = e.composite.scene.context, r = "rgbv";
    n.globalAlpha = 1 / (255 / this.#v.a), n.drawImage(
      e[r].scene.canvas,
      e[r].x,
      e[r].y,
      e[r].width,
      e[r].height
    );
  }
  inputColorUpgrade(e) {
    if (!W(e)) return !1;
    const i = this.inputColorReplacement();
    e.style.display = "none", e.insert.insertAdjacentElement("afterend", i);
  }
  inputColorReplacement() {
  }
}
customElements.get("tradex-colourpicker") || window.customElements.define("tradex-colourpicker", fm);
const Al = document.createElement("template"), En = 24, Ca = En;
Al.innerHTML = `
<style>
  .swatch {
    display: inline-block;
    position: relative;
  }
  .swatch,
  .swatch .overlay {
    width: ${En}px;
    height: ${Ca}px;
  }
  .swatch canvas,
  .swatch .overlay {
    position: absolute;
    top: 0;
    left: 0;
  }
  input {
    width: 6em;
    vertical-align: super;
  }
  tradex-colourpicker {
    display: none;
    position: absolute;
    z-index: 1;
  }
  tradex-colourpicker.active {
    display: block;
  }
</style>
<div class="colourInput">
  <div class="swatch">
    <canvas width="${En}" height="${Ca}"></canvas>
    <div class="overlay"></div>
  </div>
  <input minlength="4" maxlength="9" pattern="#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})">
  <tradex-colourpicker></tradex-colourpicker>
</div>
`;
class gm extends Z {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  constructor() {
    super(Al);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#r = this.shadowRoot.querySelector("tradex-colourpicker"), this.#r.style.display = "", this.#t = this.shadowRoot.querySelector(".swatch"), this.#i = this.shadowRoot.querySelector("canvas"), this.#n = this.shadowRoot.querySelector(".overlay"), this.#s = this.shadowRoot.querySelector("input"), this.height = this.getAttribute("height") * 1 || this.height, this.width = this.getAttribute("width") * 1 || this.width, this.setTarget(), this.eventsListen();
        const e = this.#i.getContext("2d");
        lr(e, 8, 16, 16, "#fff", "#ccc");
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.#e.removeEventListener("change", this.onTargetChange.bind(this));
  }
  set target(e) {
    T(e) && this.setTarget(e);
  }
  get target() {
    return this.#e;
  }
  setTarget(e) {
    if (W(this.#e) && this.#e.removeEventListener("change", this.onTargetChange.bind(this)), T(e))
      this.#e = document.getElementById(e), this.setAttribute("target", e);
    else if (W(e))
      this.#e = e, this.setAttribute("target", e.id);
    else return !1;
    const i = this.#e;
    if (W(i) && i.type == "text") {
      const s = i.id, n = i.parentElement, r = i.value, o = `
            <input type="text" id="${s}" minlength="4" maxlength="9" style="display:none" value="${r}"/>
            `;
      i.insertAdjacentElement("afterend", this), i.insertAdjacentHTML("beforebegin", o), i.id = "";
      const l = n.querySelector(`#${s}`);
      return l.addEventListener("change", this.onTargetChange.bind(this)), this.#s.value = r, this.#n.style.background = r, this.#r.setColour(r), this.#e.remove(), this.#e = l, !0;
    }
    return !1;
  }
  eventsListen() {
    this.#t.addEventListener("click", this.onSwatchClick.bind(this));
  }
  onSwatchClick(e) {
    this.openPicker();
  }
  onTargetChange(e) {
    const i = new String(e.target.value);
    i !== this.#r.colour.value.rgba && (this.#r.setColour(i), this.#s.value = i, this.#n.style.background = i);
  }
  openPicker() {
    this.#r.open(this.#e.value, this.#e);
  }
  closePicker() {
    this.#r.close();
  }
}
customElements.get("tradex-colourinput") || window.customElements.define("tradex-colourinput", gm);
const ym = "#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})", Ta = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Sa = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/, Ea = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/, Pa = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/, Ma = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class lt {
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
    hexa: null,
    hsl: null,
    hsla: null,
    rgb: null,
    rgba: null,
    isValid: !1
  };
  constructor(e) {
    this.#t(e), Ta.test(e) && this.#i(e), Sa.test(e) && this.#n(e), Ea.test(e) && this.#s(e), Pa.test(e) && this.#r(e), Ma.test(e) && this.#a(e);
  }
  get value() {
    return this.#e;
  }
  get isValid() {
    return this.#e.isValid;
  }
  get hex() {
    return this.#e.hex;
  }
  get hexa() {
    return this.#e.hexa;
  }
  #t(e) {
    if (!T(e)) {
      this.#e.isValid = !1;
      return;
    }
    if (Lc) {
      let i = document.getElementById("divValidColourTest");
      i || (i = document.createElement("div"), i.id = "divValidColourTest"), i.style.backgroundColor = "", i.style.backgroundColor = e, this.#e.isValid = !!i.style.backgroundColor.length, i.remove();
    } else
      this.#e.isValid = !!(Ta.test(e) || Sa.test(e) || Ea.test(e) || Pa.test(e) || Ma.test(e));
  }
  setHex(e) {
    let i = this.#e;
    [
      i.r16,
      i.g16,
      i.b16,
      i.a16
    ] = e, i.hex = `#${i.r16}${i.g16}${i.b16}`, i.hexa = `#${i.r16}${i.g16}${i.b16}${i.a16}`;
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
  #i(e) {
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
    this.setHex(s), this.#h(s), this.#d(s);
  }
  #n(e) {
    this.#e.hsl = e;
  }
  #s(e) {
    this.#e.hsla = e;
  }
  #r(e) {
    this.#e.rgb = e, this.#f(rgba);
  }
  #a(e) {
    this.#e.rgba = e, this.#f(e);
  }
  #o(e) {
    let { r: i, g: s, b: n, a: r } = this.#m(e);
    return i.length == 1 && (i = "0" + i), s.length == 1 && (s = "0" + s), n.length == 1 && (n = "0" + n), r.length == 1 && (r = "0" + r), this.value.r = i, this.value.g = s, this.value.b = n, this.value.a = r, this.setHex([i, s, n, r]), this;
  }
  #c(e) {
    let { r: i, g: s, b: n, a: r } = this.#m(e);
    i = parseInt(i, 16) / 255, s = parseInt(s, 16) / 255, n = parseInt(n, 16) / 255, r = parseInt(r, 16) / 255;
    const o = Math.max(i, s, n), l = o - Math.min(i, s, n), c = l ? o === i ? (s - n) / l : o === s ? 2 + (n - i) / l : 4 + (i - s) / l : 0;
    let p = [
      (60 * c < 0 ? 60 * c + 360 : 60 * c).toString(),
      (100 * (l ? o <= 0.5 ? l / (2 * o - l) : l / (2 - (2 * o - l)) : 0)).toString(),
      (100 * (2 * o - l) / 2).toString(),
      r.toString()
    ];
    return this.setHSLA(p), this;
  }
  #l(e, i, s) {
    i /= 100, s /= 100;
    const n = (l) => (l + e / 30) % 12, r = i * Math.min(s, 1 - s), o = (l) => s - r * Math.max(-1, Math.min(n(l) - 3, Math.min(9 - n(l), 1)));
    return [255 * o(0), 255 * o(8), 255 * o(4)];
  }
  #u(e, i, s) {
    s /= 100;
    const n = i * Math.min(s, 1 - s) / 100, r = (o) => {
      const l = (o + e / 30) % 12, c = s - n * Math.max(Math.min(l - 3, 9 - l, 1), -1);
      return Math.round(255 * c).toString(16).padStart(2, "0");
    };
    return `#${r(0)}${r(8)}${r(4)}`;
  }
  #h(e) {
    T(e) && (e = /([a-f\d]{2})/ig.exec(e));
    var i = [
      parseInt(e[0], 16),
      parseInt(e[1], 16),
      parseInt(e[2], 16),
      parseInt(e[3], 16) / 255
    ];
    this.setRGBA(i);
  }
  #d(e) {
    T(e) && (e = /([a-f\d]{2})/ig.exec(e));
    let i = parseInt(e[0], 16), s = parseInt(e[1], 16), n = parseInt(e[2], 16), r = parseInt(e[3], 16);
    i /= 255, s /= 255, n /= 255, r /= 255, this.setHSLA([i, s, n, r]);
  }
  #m(e) {
    let i, s, n, r, o = this.#e;
    if (o.r && o.g && o.b && o.a) return { r: i, g: s, b: n, a: r } = { ...o };
    if (T(e)) {
      let l = e.indexOf(",") > -1 ? "," : " ";
      e = e.substr(4).split(")")[0].split(l);
    }
    if (L(e)) {
      if (e.length < 3 || e.length > 4) return !1;
      i = e[0], s = e[1], n = e[2], r = T(e[3]) ? e[3] : "";
    } else if (v(e))
      i = e.r, s = e.g, n = e.b, r = "a" in e ? e.a : "";
    else return !1;
    return { r: i, g: s, b: n, a: r };
  }
  #f(e) {
    let i, s, n = 0, r = [], o = [], l = e.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    l.shift();
    for (let c of l)
      s = c.indexOf("%") > -1, i = parseFloat(c), n < 3 && s ? i = Math.round(255 * i / 100) : n == 3 && (!s && i >= 0 && i <= 1 ? i = Math.round(255 * i) : s && i >= 0 && i <= 100 ? i = Math.round(255 * i / 100) : i = ""), r[n] = (i | 256).toString(16).slice(1), o[n++] = i;
    this.setHex(r), this.setRGBA(o), this.#d(this.#e.hexa);
  }
}
class vm {
  #e = [10, 5];
  #t = it;
  #i = [];
  constructor(e = [10, 5], i = it) {
    this.#e = this.validateMatrix(e) ? e : this.#e, this.#t = this.validateColours(i) ? i : this.#t;
  }
  get matrix() {
    return this.#e;
  }
  get colours() {
    return this.#t;
  }
  get entries() {
    return this.#i;
  }
  validateMatrix(e) {
    return L(e) && e.length == 2 && k(e[0]) && k(e[1]);
  }
  validateColours(e) {
    if (!L(e) || e.length != this.#e[0] * this.#e[1])
      return !1;
    const i = [];
    for (let s of e) {
      let n = new lt(s);
      if (!n.isValid) return !1;
      i.push(n);
    }
    return this.#i = i, !0;
  }
}
function bm(a) {
  return a.ownerDocument && a.ownerDocument.defaultView && a.ownerDocument.defaultView.devicePixelRatio || 2;
}
function Ol(a, e, i, s, n, r, o, l, c, p) {
  a.drawImage(e, i, s, n, r, o, l, c, p);
}
function Dl(a, e) {
  let i = a.naturalWidth || a.width, s = a.naturalHeight || a.height;
  return e === void 0 && (e = Il(i, s)), e.ctx.drawImage(a, 0, 0), e;
}
const ks = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};
function gt(a, e) {
  const i = Dl(e), s = i.ctx;
  let n;
  if (Object.keys(ks).includes(a))
    n = ks[a];
  else {
    let r = new lt(a);
    n = r.isValid ? r.hexa : ks.alpa;
  }
  return s.fillStyle = n, s.globalCompositeOperation = "multiply", s.fillRect(0, 0, s.canvas.width, s.canvas.height), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), s.globalCompositeOperation = "source-over", i;
}
function wm(a) {
  return {
    red: gt("red", a),
    green: gt("green", a),
    blue: gt("blue", a),
    alpha: gt("alpha", a)
  };
}
function Il(a, e) {
  const i = document.createElement("canvas");
  return i.ctx = i.getContext("2d", { willReadFrequently: !0 }), i.width = a || i.ctx.canvas.width, i.height = e || i.ctx.canvas.height, i;
}
const Y = {
  Colour: lt,
  createCanvas: Il,
  imageToCanvas: Dl,
  separateRGB: wm,
  fillMask: gt,
  getPixelRatio: bm,
  fillStroke: xt,
  linearGradient: zi,
  calcTextWidth: ar,
  createFont: Ht,
  getTextRectHeight: ds,
  getTextRectWidth: us,
  renderImage: Ol,
  renderText: yl,
  renderTextBG: $t,
  renderPath: _t,
  renderPathStroke: tm,
  renderPathClosed: im,
  renderSpline: sm,
  renderLine: rm,
  renderLineHorizontal: bt,
  renderLineVertical: nm,
  renderCircle: am,
  renderRect: or,
  renderRectFill: ms,
  renderRectStroke: vl,
  renderRectRound: Zd,
  renderRectRoundFill: wl,
  renderRectRoundStroke: bl,
  renderPolygonRegular: Cl,
  renderPolygonIrregular: Qd,
  renderDiamond: em,
  renderTriangle: Jd,
  renderCheckerBoard: lr,
  chartBar: om
};
class Nl {
  areaCoordinates = [];
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = i;
  }
  draw(e) {
    const i = this.ctx, s = this.cfg, n = e.raw[4] >= e.raw[1], r = n ? s.candle.UpBodyColour : s.candle.DnBodyColour, o = n ? s.candle.UpWickColour : s.candle.DnWickColour;
    switch (s.candle.Type) {
      case me.CANDLE_SOLID:
        this.fill = !0;
        break;
      case me.CANDLE_HOLLOW:
      case me.OHLC:
        this.fill = !1;
        break;
      case me.CANDLE_UP_HOLLOW:
        this.fill = !n;
        break;
      case me.CANDLE_DOWN_HOLLOW:
        this.fill = n;
    }
    let l = Math.max(e.w - 1, 1);
    l = ps(l);
    let c = Math.max(Math.floor(l * 0.5), 1), p = Math.abs(e.o - e.c), f = e.c === e.o ? 1 : 2, b = e.x, E = Math.floor(b) - 0.5;
    if (i.save(), i.strokeStyle = o, i.beginPath(), i.moveTo(E, Math.floor(e.h)), s.candle.Type === me.OHLC ? i.lineTo(E, Math.floor(e.l)) : n ? (i.lineTo(E, Math.floor(e.c)), i.moveTo(E, Math.floor(e.o))) : (i.lineTo(E, Math.floor(e.o)), i.moveTo(E, Math.floor(e.c))), i.lineTo(E, Math.floor(e.l)), i.stroke(), l == 3) {
      i.fillStyle = o;
      let M = n ? 1 : -1;
      i.rect(
        Math.floor(b - c),
        e.c,
        Math.floor(c * 2),
        M * Math.max(p, f)
      ), i.fill(), i.stroke();
    } else if (l > 3 && this.fill) {
      i.fillStyle = r;
      let M = n ? 1 : -1;
      i.rect(
        Math.floor(b - c),
        e.c,
        Math.floor(c * 2),
        M * Math.max(p, f)
      ), i.fill(), i.stroke();
    } else if (l > 3 && !this.fill && s.candle.Type !== me.OHLC) {
      let M = n ? 1 : -1;
      i.rect(
        Math.floor(b - c),
        e.c,
        Math.floor(c * 2),
        M * Math.max(p, f)
      ), i.stroke();
    } else s.candle.Type === me.OHLC ? (i.beginPath(), i.moveTo(E - c, e.o), i.lineTo(E, e.o), i.moveTo(E, e.c), i.lineTo(E + c, e.c), i.stroke()) : (i.strokeStyle = o, i.beginPath(), i.moveTo(
      E,
      Math.floor(Math.min(e.o, e.c))
    ), i.lineTo(
      E,
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
    if (!L(e) || e.length == 0) return;
    let i = this.ctx, s = this.cfg.candle, n;
    Math.max(e[0].w - 1, 1), e[0].x;
    let r = [e[0].x, e[0].h];
    i.save(), i.strokeStyle = s.AreaLineColour || s.UpBodyColour || s.DnBodyColour, i.lineWidth = 1, i.beginPath(), i.moveTo(e[0].x, e[0].h);
    let o = 0;
    for (; o < e.length; )
      i.lineTo(e[o].x, e[o].h), o++;
    if (s?.Type == "area") {
      if (n = i.createLinearGradient(0, 0, 0, this.scene.height), L(s.AreaFillColour))
        for (let [l, c] of s.AreaFillColour.entries())
          n.addColorStop(l, c);
      else T(s.AreaFillColour) ? n = s.AreaFillColour : n = s.UpBodyColour || s.DnBodyColour;
      i.stroke(), i.lineTo(e[o - 1].x, this.scene.height), i.lineTo(r[0], this.scene.height), i.fillStyle = n, i.closePath(), i.fill();
    } else
      i.stroke();
    i.restore(), e.length = 0;
  }
}
function ps(a) {
  return a < 3 ? a = 1 : a < 5 ? a = 3 : a > 5 && (a = Math.ceil(a * 0.8)), a;
}
class La {
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = i;
  }
  draw(e) {
    const i = this.ctx;
    this.cfg, this.scene.height;
    const s = {
      fill: "",
      stroke: "",
      width: 1
    };
    let n;
    for (let r of e) {
      let { w: o, x: l, y: c, zero: p } = r;
      o = ps(o), l = l - o / 2, c < p ? (n = p - c, s.fill = "#0f0") : (n = c - p, c = p, s.fill = "#f00"), or(i, l, c, o, n, s);
    }
  }
}
function xm(a, e, i, s, n, r) {
  let o = e - i;
  ms(a, 0, i, s, o, r), bt(a, e, 0, s, r), bt(a, i, 0, s, r);
}
class Q {
  static isOverlay = !0;
  #e;
  #t;
  #i = {};
  #n;
  #s;
  #r;
  #a;
  #o;
  #c;
  #l;
  #u = [];
  #h = {
    valueMax: null,
    valueMin: null,
    indexStart: null,
    Length: null,
    rowsW: null,
    rowsH: null,
    refresh: !0,
    resize: !0
  };
  #d;
  id;
  constructor(e, i = !1, s = !1, n, r, o = {}) {
    this.#t = r.core, this.#e = r, this.#i = r.core.config, this.#a = e, this.#o = e.scene, this.#c = e.hit, this.#s = i, this.#r = s, this.#l = o, this.on("global_resize", this.onResize, this);
  }
  get core() {
    return this.#t;
  }
  get parent() {
    return this.#e;
  }
  get target() {
    return this.#a;
  }
  get config() {
    return this.#i;
  }
  get params() {
    return this.#l;
  }
  get range() {
    return this.#t.range;
  }
  get state() {
    return this.#t.state;
  }
  get scene() {
    return this.#o;
  }
  get hit() {
    return this.#c;
  }
  get theme() {
    return this.#t.theme;
  }
  get chart() {
    return this.#e.parent.parent;
  }
  get chartData() {
    return this.#i.state.allData.data;
  }
  get xAxis() {
    return this.getXAxis();
  }
  get yAxis() {
    return this.getYAxis();
  }
  get overlay() {
    return this.#l.overlay;
  }
  get overlayData() {
    return this.#l.overlay?.data || [];
  }
  get data() {
    return this.#l.overlay?.data || [];
  }
  get stateMachine() {
    return this.#t.stateMachine;
  }
  get context() {
    return this.contextIs();
  }
  set position(e) {
    this.#a.setPosition(e[0], e[1]);
  }
  destroy() {
    this.#t.hub.expunge(this), "overlay" in this.#l && "data" in this.#l.overlay && delete this.#l.overlay.data;
  }
  on(e, i, s = this) {
    this.#t.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#t.off(e, i, s);
  }
  expunge(e = this) {
    this.#t.expunge(e);
  }
  emit(e, i) {
    this.core.emit(e, i);
  }
  onResize() {
    this.#h.resize = !0;
  }
  setSize(e, i) {
    this.#a.setSize(e, i), this.#h.refresh = !0;
  }
  setRefresh() {
    this.#h.refresh = !0;
  }
  getXAxis() {
    return this.#s instanceof Ui ? this.#s : this.core.Chart.time?.xAxis instanceof Ui ? this.core.Chart.time.xAxis : "time" in this.#e ? this.#e.time.xAxis : !1;
  }
  getYAxis() {
    return this.#r instanceof ii ? this.#r : this.chart?.yAxis instanceof ii ? this.chart.yAxis : "scale" in this.#e ? this.#e.scale.yAxis : !1;
  }
  contextIs() {
    return !this.#s && !this.#r ? "chart" : this.getXAxis() instanceof Ui ? "timeline" : this.getYAxis() instanceof ii ? "scale" : !1;
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
        Y[i](r[0], r[1]);
        break;
      case "fillStroke":
        Y[i](n, r[0], r[1], r[2]);
        break;
      case "renderLine":
        Y[i](n, r, s);
        break;
      case "renderLineHorizontal":
        Y[i](n, r[0], r[1], r[2], s);
        break;
      case "renderLineVertical":
        Y[i](n, r[0], r[1], r[2], s);
        break;
      case "renderPath":
        Y[i](n, r, s.style, s);
        break;
      case "renderPathStroke":
        Y[i](n, r, s.style);
        break;
      case "renderPathClosed":
        Y[i](n, r, s.style, s);
        break;
      case "renderSpline":
        Y[i](n, r, s);
        break;
      case "renderRect":
        Y[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderRectFill":
        Y[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderRectStroke":
        Y[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderRectRound":
        Y[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderRectRoundFill":
        Y[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderRectRoundStroke":
        Y[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderPolygonRegular":
        Y[i](n, r[0], r[1], r[2], r[3], r[4], s);
        break;
      case "renderPolygonIrregular":
        Y[i](n, r, s);
        break;
      case "renderTriangle":
        Y[i](n, r[0], r[1], r[2], s);
        break;
      case "renderDiamond":
        Y[i](n, r[0], r[1], r[2], r[3], s);
        break;
      case "renderCircle":
        Y[i](n, r[0], r[1], r[2], s);
        break;
      case "renderImage":
        Y[i](n, s.src, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
        break;
      case "renderText":
        Y[i](n, r[0], r[1], s);
        break;
      case "renderTextBG":
        Y[i](n, r[0], r[1], r[2], s);
        break;
      case "histogram":
        this.histogram(r, s);
        break;
      case "highLowRange":
        this.highLowRange(n, s);
        break;
    }
    n.restore();
  }
  clear() {
    this.scene.clear();
  }
  histogram(e, i) {
    this.#d instanceof La || (this.#d = new La(this.scene, this.theme)), this.#d.draw(e, i);
  }
  highLowRange(e, i) {
    let { high: s, low: n } = i, r = this.yAxis.yPos(s), o = this.yAxis.yPos(n), { width: l, height: c } = this.scene;
    xm(e, r, o, l, c, i);
  }
}
class qe {
  static opened = new qe("opened");
  static closed = new qe("closed");
  constructor(e) {
    this.name = e;
  }
}
class de {
  #e;
  #t;
  #i;
  #n;
  #s = qe.closed;
  #r;
  #a;
  #o;
  #c;
  #l;
  #u;
  #h;
  #d;
  #m;
  #f = {};
  #g;
  #T;
  #v;
  #w;
  #x = !1;
  #p = {};
  #S = "";
  #y = "";
  #E = {};
  #C = {};
  static windowList = {};
  static windowCnt = 0;
  static class = Ur;
  static Name = "Windows";
  static type = "window";
  static currentActive = null;
  static stylesInstalled = !1;
  static defaultStyles = `
  /** default Window widget styles */

  .tradeXwindow {
    border: 1px solid ${Qe.COLOUR_BORDER};
    border-radius: 5px;
    box-shadow: ${Qe.SHADOW};
    background: ${Qe.COLOUR_BG};
    color: ${Qe.COLOUR_TXT};
  }

  .tradeXwindow .dragBar {
    cursor: grab;
  }

  .tradeXwindow .dragBar:hover {
    background: #222;
  }

  .tradeXwindow .dragBar .title {
    ${Qe.TITLE}
  }

  .tradeXwindow .content {
    ${Qe.CONTENT}
  }
 
  `;
  static create(e, i) {
    return i.id = i?.id || ae("window"), i.id = `${i.id}_${++de.windowCnt}`, i.type = i?.type || de.type, i.class = i?.class || "window", de.windowList[i.id] = new de(e, i), de.windowList[i.id];
  }
  static destroy(e) {
    e in de.windowList && (de.windowList[e].destroy(), delete de.windowList[e]);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${Ur}" style=""></div>
    `;
  }
  constructor(e, i) {
    this.#t = e, this.#i = i.core || i.parent.core, this.#n = i, this.#e = i.id, this.#r = i.parent, this.#o = e.elements[i.type], this.#a = this.#i.elWidgetsG;
    const s = e.elements[i.type];
    this.mount(s);
  }
  destroy() {
    this.#i.hub.expunge(), this.el.remove();
  }
  get id() {
    return this.#e;
  }
  get pos() {
    return this.dimensions;
  }
  get core() {
    return this.#i;
  }
  get parent() {
    return this.#r;
  }
  get config() {
    return this.#n;
  }
  set config(e) {
    this.#n = e;
  }
  get theme() {
    return this.#i.theme;
  }
  get state() {
    return this.#s;
  }
  get dimensions() {
    return ve(this.#c);
  }
  set dimensions(e) {
    this.setDimensions(e);
  }
  get type() {
    return de.type;
  }
  get el() {
    return this.#c;
  }
  get elDragBar() {
    return this.#l;
  }
  get elTitle() {
    return this.#u;
  }
  get elCloseIcon() {
    return this.#h;
  }
  get elContent() {
    return this.#d;
  }
  get elColourPicker() {
    return this.#m;
  }
  get title() {
    return this.#S;
  }
  set title(e) {
    this.setTitle(e);
  }
  get content() {
    return this.#y;
  }
  set content(e) {
    this.setContent(e);
  }
  get contentFields() {
    return this.#E;
  }
  set params(e) {
    v(e) && (this.#C = { ...this.#C, ...e });
  }
  get params() {
    return this.#C;
  }
  setTitle(e) {
    return T(e) ? (this.#n.title = e, this.#u.innerHTML = e, this.#u) : !1;
  }
  setContent(e, i = {}) {
    if (!T(e) || !v(i)) return !1;
    this.#n.content = e, this.#d.innerHTML = e;
    for (let s in i)
      _(i[s]) && i[s](this.#d);
    return this.#E = this.allContentFields(), this.#d;
  }
  start() {
    this.eventsListen(), this.#n?.openNow !== !0 && this.setClose();
  }
  eventsListen() {
    this.on(`window_close_${this.parent.id}`, this.onCloseWindow, this), this.on("global_resize", this.onGlobalResize, this);
  }
  on(e, i, s = this) {
    this.#i.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#i.off(e, i, s);
  }
  emit(e, i) {
    this.#i.emit(e, i);
  }
  onGlobalResize(e) {
    const i = this.dimensions, s = {
      position: { x: i.left, y: i.top },
      dimensions: { w: i.w, h: i.h }
    };
    i.w > e.width && (s.position.x = e.width), i.h > e.height && (s.position.y = e.height), i.left + s.dimensions.w, i.bottom + s.dimensions.h, i.x < 0 ? s.position.x = 0 : i.x + s.dimensions.w > e.width && (s.position.x -= e.width), this.setProperties(s);
  }
  onOutsideClickListener(e) {
    if (!this.#c.contains(e.target) && wt(this.#c) && !this.#x) {
      let i = {
        target: e.currentTarget.id,
        window: this.#e
      };
      this.emit("window_close", i), this.emit(`window_close_${this.parent.id}`, i), document.removeEventListener("click", this.#p.click), delete this.#p.click;
    }
  }
  onCloseWindow(e) {
    e.window === this.#e && this.close();
  }
  onWindow(e) {
    e.stopPropagation();
  }
  onDragBar(e) {
    this.#x = !0;
    let i = this.#c.offsetLeft + e.movement.x, s = this.#c.offsetTop + e.movement.y;
    this.position({ x: i, y: s });
  }
  onDragBarEnd(e) {
    setTimeout(() => {
      this.#x = !1;
    }, 250);
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.windowNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#c = this.#o.querySelector(`#${this.#n.id}`), this.#l = this.#c.querySelector(".dragBar"), this.#u = this.#c.querySelector(".title"), this.#h = this.#c.querySelector(".closeIcon"), this.#d = this.#c.querySelector(".content"), this.#E = this.allContentFields(), this.#c.addEventListener("click", this.onWindow.bind(this)), W(this.#l) && (this.#w = new Ve(this.#l, { disableContextMenu: !1 }), this.#w.on("pointerdrag", this.onDragBar.bind(this)), this.#w.on("pointerdragend", this.onDragBarEnd.bind(this)));
    const i = this.dimensions, s = this.#n?.w || i.w, n = this.#n?.h || i.h;
    this.setDimensions({ w: s, h: n }), this.position();
  }
  windowNode() {
    const e = this.#n;
    let i = "position: absolute; z-index: 100; display: block;", s = e.dragBar ? this.dragBar() : "", n = !e.dragBar && e.title ? this.titleNode() : "", r = this.contentNode(), o = this.closeIcon();
    return `
      <!-- ${this.constructor.type} ${this.parent.id} -->
      <div id="${e.id}" class="${rc} ${e.class}" style="${i}">
          ${s}
          ${n}
          ${o}
          ${r}
        </div>
      </div>
    `;
  }
  contentNode() {
    const e = this.#n;
    let i = "", s = e?.content ? e.content : "";
    return `
      <div class="content" style="${i}">
        ${s}
      </div>
    `;
  }
  dragBar() {
    const e = this.#n, i = "cursor: grab;", s = `onmouseover="this.style.background ='#222'"`, n = `onmouseout="this.style.background ='none'"`;
    let r = `${i} `, o = "";
    return e.dragBar && (o += `
    <div class="dragBar" style="${r}" ${s} ${n}>
        ${this.titleNode()}
      </div>
    `), o;
  }
  titleNode() {
    const e = this.config;
    return `
        <div class="title">${T(e?.title) ? e.title : ""}</div>
    `;
  }
  closeIcon() {
    const e = "cursor: pointer;", i = `onmouseover="this.style.background ='#222'"`, s = `onmouseout="this.style.background ='none'"`;
    let n = `${e} `;
    this.#n?.styles?.closeIcon;
    let r = "";
    return window.closeIcon && (r += `
      <div class="closeIcon" style="${n}" ${i} ${s}>
        <span>X</span>
      </div>
    `), r;
  }
  allContentFields() {
    const e = {}, i = this.#d;
    return e.input = i.querySelectorAll("input"), e.select = i.querySelectorAll("select"), e.textarea = i.querySelectorAll("textarea"), e.button = i.querySelectorAll("button"), e;
  }
  position(e) {
    let i = 0.1, s = this.dimensions, n = this.#i.dimensions;
    Math.round(n.left - s.left), Math.round(n.bottom - s.top);
    let r = this.#f?.iPos?.width !== n.width || this.#f.x100 ? s.width * this.#f.x100 : Math.round((n.width - s.width) / 2), o = this.#f?.iPos?.height !== n.height || this.#f.y100 ? s.height * this.#f.y100 : Math.round((n.height + s.height) / -2), l = xo(this.#c, "z-index");
    if (v(e)) {
      let { x: E, y: M, z: D } = { ...e };
      P(E) && (r = E), P(M) && (o = M), P(D) && (l = D), this.#f = { x: E, y: M, z: l };
    }
    this.#c.style["z-index"] = `${l}`;
    const c = this.#c.clientWidth;
    r + c * i > this.#a.offsetWidth ? r = this.#a.offsetWidth - c * i : r < (c - c * i) * -1 && (r = (c - c * i) * -1);
    const p = this.#c.clientHeight;
    o < n.height * -1 ? o = n.height * -1 : o > p * i * -1 && (o = p * i * -1), r = Math.floor(r), o = Math.floor(o), this.#c.style.left = `${r}px`, this.#c.style.top = `${o}px`;
    const f = r / s.width, b = o / s.height;
    this.#f = {
      px: r,
      py: o,
      x100: f,
      y100: b,
      iPos: n
    };
  }
  setDimensions(e) {
    if (!v(e)) return !1;
    P(e?.w) && (this.#c.style.width = `${e.w}px`), P(e?.h) && (this.#c.style.height = `${e.h}px`);
  }
  setProperties(e) {
    if (!v(e)) return !1;
    if (T(e?.title) && (this.#u.innerHTML = e.title), T(e?.content) && (this.#d.innerHTML = e.content), this.setDimensions({ ...e?.dimensions }), this.position({ ...e?.position }), v(e?.styles)) {
      const i = (s, n) => {
        if (!v(n)) return !1;
        const r = "el" + s.charAt(0).toUpperCase() + s.slice(1);
        if (v(this[r]))
          for (let o in n)
            this[r].style.p = n[o];
      };
      for (let s of Object.keys(e.styles))
        i(s, e.styles[s]);
    }
    return e;
  }
  setOpen() {
    de.currentActive = this, this.#s = qe.opened, this.#c.style.display = "block", this.#c.style.zindex = "10", this.#c.classList.add("active");
  }
  setClose() {
    de.currentActive = null, this.#s = qe.closed, this.#c.style.display = "none", this.#c.classList.remove("active"), document.removeEventListener("click", this.#p.click);
  }
  remove() {
    return de.destroy(this.id);
  }
  open(e = {}) {
    return de.currentActive === this && this.state === qe.opened || (v(e.params) && (this.params = e.params), this.setOpen(), this.setProperties(e), this.emit("window_opened", this.id), this.emit(`window_opened_${this.parent.id}`, this.id), setTimeout(() => {
      this.#p.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#p.click), this.#m;
    }, 1e3)), !0;
  }
  close() {
    return this.#s !== qe.closed && (this.setClose(), this.emit("window_closed", this.id), this.emit(`window_closed_${this.parent.id}`, this.id)), !0;
  }
}
const Cm = {
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
}, Tm = {
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
}, Sm = {
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
}, Em = {
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
}, Pm = {
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
}, Rl = {
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
}, Mm = {
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
}, Lm = {
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
}, kl = {
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
}, Am = {
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
}, Om = {
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
}, Dm = {
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
}, $l = {
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
}, Im = {
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
}, Nm = {
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
}, Hl = {
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
}, Rm = {
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
}, km = {
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
}, _l = {
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
}, $m = {
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
}, Hm = {
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
}, _m = {
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
}, Bm = {
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
}, Fm = {
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
}, Um = {
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
}, zm = {
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
}, Vm = {
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
}, Wm = {
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
}, Gm = {
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
}, qm = {
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
}, jm = {
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
}, Xm = {
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
}, Ym = {
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
}, Km = {
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
}, Zm = {
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
}, Qm = {
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
}, Jm = {
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
}, ep = {
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
}, tp = {
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
}, ip = {
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
}, sp = {
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
}, np = {
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
}, rp = {
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
}, ap = {
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
}, op = {
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
}, lp = {
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
}, hp = {
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
}, cp = {
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
}, up = {
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
}, dp = {
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
}, mp = {
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
}, pp = {
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
}, fp = {
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
}, gp = {
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
}, yp = {
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
}, vp = {
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
}, bp = {
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
}, wp = {
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
}, xp = {
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
}, Cp = {
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
}, Tp = {
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
}, Sp = {
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
}, Ep = {
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
}, Pp = {
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
}, Mp = {
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
}, Lp = {
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
}, Ap = {
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
}, Op = {
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
}, Dp = {
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
}, Ip = {
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
}, Np = {
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
}, Rp = {
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
}, kp = {
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
}, $p = {
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
}, Hp = {
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
}, _p = {
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
}, Bp = {
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
}, Fp = {
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
}, Up = {
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
}, zp = {
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
}, Vp = {
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
}, Bl = {
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
}, Wp = {
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
}, Gp = {
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
}, qp = {
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
}, jp = {
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
}, Xp = {
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
}, Fl = {
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
}, Ul = {
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
}, Yp = {
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
}, Kp = {
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
}, Zp = {
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
}, Qp = {
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
}, Jp = {
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
}, e0 = {
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
}, t0 = {
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
}, i0 = {
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
}, s0 = {
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
}, n0 = {
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
}, r0 = {
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
}, a0 = {
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
}, o0 = {
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
}, l0 = {
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
}, h0 = {
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
}, c0 = {
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
}, zl = {
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
}, Vl = {
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
}, f0 = {
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
}, g0 = {
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
}, Wl = {
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
}, v0 = {
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
}, b0 = {
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
}, w0 = {
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
}, x0 = {
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
}, C0 = {
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
}, T0 = {
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
}, E0 = {
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
}, P0 = {
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
}, M0 = {
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
}, Gl = {
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
}, A0 = {
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
}, O0 = {
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
}, ql = {
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
}, jl = {
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
}, D0 = {
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
}, I0 = {
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
}, N0 = {
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
}, Xl = {
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
}, Yl = {
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
}, R0 = {
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
}, k0 = {
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
}, $0 = {
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
}, Kl = {
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
}, H0 = {
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
}, _0 = {
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
}, Zl = {
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
}, B0 = {
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
}, Ql = {
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
}, F0 = {
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
}, U0 = {
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
}, z0 = {
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
}, V0 = {
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
}, W0 = {
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
}, G0 = {
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
}, q0 = {
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
}, j0 = {
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
}, X0 = {
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
}, Y0 = {
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
}, K0 = {
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
}, Z0 = {
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
}, Q0 = {
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
}, J0 = {
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
}, ef = {
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
}, sf = {
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
}, nf = {
  ACCBANDS: Cm,
  ACOS: Tm,
  AD: Sm,
  ADD: Em,
  ADOSC: Pm,
  ADX: Rl,
  ADXR: Mm,
  APO: Lm,
  AROON: kl,
  AROONOSC: Am,
  ASIN: Om,
  ATAN: Dm,
  ATR: $l,
  AVGDEV: Im,
  AVGPRICE: Nm,
  BBANDS: Hl,
  BETA: Rm,
  BOP: km,
  CCI: _l,
  CDL2CROWS: $m,
  CDL3BLACKCROWS: Hm,
  CDL3INSIDE: _m,
  CDL3LINESTRIKE: Bm,
  CDL3OUTSIDE: Fm,
  CDL3STARSINSOUTH: Um,
  CDL3WHITESOLDIERS: zm,
  CDLABANDONEDBABY: Vm,
  CDLADVANCEBLOCK: Wm,
  CDLBELTHOLD: Gm,
  CDLBREAKAWAY: qm,
  CDLCLOSINGMARUBOZU: jm,
  CDLCONCEALBABYSWALL: Xm,
  CDLCOUNTERATTACK: Ym,
  CDLDARKCLOUDCOVER: Km,
  CDLDOJI: Zm,
  CDLDOJISTAR: Qm,
  CDLDRAGONFLYDOJI: Jm,
  CDLENGULFING: ep,
  CDLEVENINGDOJISTAR: tp,
  CDLEVENINGSTAR: ip,
  CDLGAPSIDESIDEWHITE: sp,
  CDLGRAVESTONEDOJI: np,
  CDLHAMMER: rp,
  CDLHANGINGMAN: ap,
  CDLHARAMI: op,
  CDLHARAMICROSS: lp,
  CDLHIGHWAVE: hp,
  CDLHIKKAKE: cp,
  CDLHIKKAKEMOD: up,
  CDLHOMINGPIGEON: dp,
  CDLIDENTICAL3CROWS: mp,
  CDLINNECK: pp,
  CDLINVERTEDHAMMER: fp,
  CDLKICKING: gp,
  CDLKICKINGBYLENGTH: yp,
  CDLLADDERBOTTOM: vp,
  CDLLONGLEGGEDDOJI: bp,
  CDLLONGLINE: wp,
  CDLMARUBOZU: xp,
  CDLMATCHINGLOW: Cp,
  CDLMATHOLD: Tp,
  CDLMORNINGDOJISTAR: Sp,
  CDLMORNINGSTAR: Ep,
  CDLONNECK: Pp,
  CDLPIERCING: Mp,
  CDLRICKSHAWMAN: Lp,
  CDLRISEFALL3METHODS: Ap,
  CDLSEPARATINGLINES: Op,
  CDLSHOOTINGSTAR: Dp,
  CDLSHORTLINE: Ip,
  CDLSPINNINGTOP: Np,
  CDLSTALLEDPATTERN: Rp,
  CDLSTICKSANDWICH: kp,
  CDLTAKURI: $p,
  CDLTASUKIGAP: Hp,
  CDLTHRUSTING: _p,
  CDLTRISTAR: Bp,
  CDLUNIQUE3RIVER: Fp,
  CDLUPSIDEGAP2CROWS: Up,
  CDLXSIDEGAP3METHODS: zp,
  CEIL: Vp,
  CMO: Bl,
  CORREL: Wp,
  COS: Gp,
  COSH: qp,
  DEMA: jp,
  DIV: Xp,
  DX: Fl,
  EMA: Ul,
  EXP: Yp,
  FLOOR: Kp,
  HT_DCPERIOD: Zp,
  HT_DCPHASE: Qp,
  HT_PHASOR: Jp,
  HT_SINE: e0,
  HT_TRENDLINE: t0,
  HT_TRENDMODE: i0,
  IMI: s0,
  KAMA: n0,
  LINEARREG: r0,
  LINEARREG_ANGLE: a0,
  LINEARREG_INTERCEPT: o0,
  LINEARREG_SLOPE: l0,
  LN: h0,
  LOG10: c0,
  MA: zl,
  MACD: Vl,
  MACDEXT: u0,
  MACDFIX: d0,
  MAMA: m0,
  MAVP: p0,
  MAX: f0,
  MAXINDEX: g0,
  MEDPRICE: y0,
  MFI: Wl,
  MIDPOINT: v0,
  MIDPRICE: b0,
  MIN: w0,
  MININDEX: x0,
  MINMAX: C0,
  MINMAXINDEX: T0,
  MINUS_DI: S0,
  MINUS_DM: E0,
  MOM: P0,
  MULT: M0,
  NATR: L0,
  OBV: Gl,
  PLUS_DI: A0,
  PLUS_DM: O0,
  PPO: ql,
  ROC: jl,
  ROCP: D0,
  ROCR: I0,
  ROCR100: N0,
  RSI: Xl,
  SAR: Yl,
  SAREXT: R0,
  SIN: k0,
  SINH: $0,
  SMA: Kl,
  SQRT: H0,
  STDDEV: _0,
  STOCH: Zl,
  STOCHF: B0,
  STOCHRSI: Ql,
  SUB: F0,
  SUM: U0,
  T3: z0,
  TAN: V0,
  TANH: W0,
  TEMA: G0,
  TRANGE: q0,
  TRIMA: j0,
  TRIX: X0,
  TSF: Y0,
  TYPPRICE: K0,
  ULTOSC: Z0,
  VAR: Q0,
  WCLPRICE: J0,
  WILLR: ef,
  WMA: sf
};
function rf(a, e, i) {
  throw new Error(`${a} ${e}`, i);
}
const af = 5, of = [
  "highLowRange"
], lf = ["outputLegend", "outputOrder", "render", "style"], Pt = new vm();
class It {
  static standard = new It("standard");
  static subcomponent = new It("subcomponent");
  constructor(e) {
    this.name = e;
  }
}
class Te {
  static noData = new Te("noData");
  static hasData = new Te("hasData");
  static error = new Te("error");
  static destroyed = new Te("destroyed");
  constructor(e) {
    this.name = e;
  }
}
class Mt {
  #e = !0;
  #t = af;
  constructor(e = !0, i = 5) {
    this.enable = e, this.period = k(i) ? i : 5;
  }
  set enable(e) {
    this.#e = q(e) ? e : !0;
  }
  get enable() {
    return this.#e;
  }
  set period(e) {
    this.#t = k(e) ? e : 5;
  }
  get period() {
    return this.#t;
  }
}
class z extends Q {
  static #e = 0;
  static get cnt() {
    return ++z.#e;
  }
  static get isIndicator() {
    return !0;
  }
  #t;
  #i;
  #n;
  #s;
  #r;
  #a;
  #o;
  #c;
  #l;
  #u;
  #h;
  #d;
  #m;
  #f;
  #g = "indicator";
  #T;
  #v;
  #w = [0, 0];
  #x;
  #p;
  #S = 2;
  #y = {};
  #E;
  #C = Te.noData;
  #b;
  #P;
  #L = { type: "", msg: "", style: "" };
  #A = !0;
  definition = {
    input: {},
    output: {},
    meta: {
      input: {},
      output: [],
      outputOrder: [],
      outputLegend: {},
      style: {}
    }
  };
  colours = [
    Pt.colours[8],
    Pt.colours[18],
    Pt.colours[28],
    Pt.colours[38],
    Pt.colours[48]
  ];
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, void 0, r, o), v(this.definition) || rf(`Indicator: ${this.shortName}`, "does not provide a valid definition");
    const l = o.overlay;
    this.#i = z.cnt, this.#m = l, this.id = l?.id || ae(this?.shortName || l?.name), this.#n = l?.key || Pn(l), this.#T = this.core.TALib, this.#v = this.core.range, this.legendName = l?.legendName || l?.name || this?.shortName, this.#c = q(l?.legendVisibility) ? l.legendVisibility : !0, this.#A = q(l?.gapFill) ? l.gapFill : !0, this.#P = Pt, this.style = v(l?.settings?.style) ? { ...this.constructor.defaultStyle, ...l.settings.style } : { ...this.constructor.defaultStyle, ...n.style };
    const c = { title: `${this.legendName} Config`, content: "", params: l, parent: this };
    switch (this.#b = this.core.WidgetsG.insert("ConfigDialogue", c), l.settings?.context) {
      case "subcomponent":
        this.#a = It.subcomponent;
      case "standard":
      default:
        this.#a = It.standard;
    }
  }
  get id() {
    return this.#t || `${this.core.ID}-${this.chartPaneID}-${this.shortName}-${this.#i}`;
  }
  set id(e) {
    this.#t = ot(new String(e));
  }
  get key() {
    return this.#n;
  }
  get version() {
    return `${this.constructor?.version}`;
  }
  get context() {
    return this.#a;
  }
  get chartPane() {
    return this.core.ChartPanes.get(this.chartPaneID);
  }
  get chartPaneID() {
    return this.params.overlay.paneID;
  }
  get primaryPane() {
    return this.#l || this.constructor.primaryPane;
  }
  set primaryPane(e) {
    this.#l = e;
  }
  get scaleOverlay() {
    return this.#h;
  }
  set scaleOverlay(e) {
    this.#h = e;
  }
  get plots() {
    return this.#d;
  }
  set plots(e) {
    this.#d = e;
  }
  get Timeline() {
    return this.core.Timeline;
  }
  get scale() {
    return this.parent.scale;
  }
  get type() {
    return this.#g;
  }
  get overlay() {
    return this.#m;
  }
  get legend() {
    return this.chart.legend.list[this.#E];
  }
  get legendID() {
    return this.#E;
  }
  get legendName() {
    return this.#o || this.overlay?.name || this?.shortName || this.#t;
  }
  set legendName(e) {
    this.setLegendName(e);
  }
  set legendVisibility(e) {
    this.setLegendVisibility(e);
  }
  get indicator() {
    return this.#f;
  }
  get TALib() {
    return this.#T;
  }
  get range() {
    return this.core.range;
  }
  set setNewValue(e) {
    this.#x = e;
  }
  set setUpdateValue(e) {
    this.#p = e;
  }
  set precision(e) {
    this.#S = e;
  }
  get precision() {
    return this.#S;
  }
  set style(e) {
    v(e) && (this.#y = e);
  }
  get style() {
    return this.#y;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get isIndicator() {
    return z.isIndicator;
  }
  get isPrimary() {
    return this.chart.isPrimary;
  }
  set state(e) {
    e instanceof Te && (this.#C = e);
  }
  get state() {
    return this.#C;
  }
  set error(e) {
    this.setError(e);
  }
  get error() {
    return this.#L;
  }
  get gapFill() {
    return this.#A;
  }
  set gapFill(e) {
    this.#A = !!e;
  }
  get configDialogue() {
    return this.#b;
  }
  set value(e) {
    const i = this.core.timeData.timeFrameMS;
    let s = Math.floor(new Date(e[he.t]) / i) * i;
    e[he.t] = s, this.#w[he.t] !== e[he.t] ? (this.#w[he.t] = e[he.t], this.#x(e)) : this.#p(e);
  }
  get value() {
    return this.#w;
  }
  setError(e) {
    if (this.#C === Te.destroyed || !v(e) && !T(e?.type) && !T(e?.msg)) return !1;
    const i = { ...e };
    i.indicator = this, this.#L = e, this.state = Te.error, this.emit("indicator_error", i), this.core.warn(`WARNING: Indicator: ${this.shortName} ID: ${this.id} ${i.msg}`);
  }
  setLegendName(e) {
    this.#o = T(e) ? e : this.overlay?.name || this.shortName || this.#t, this.chart.legend.modify(this.#E, { legendName: this.#o });
  }
  setLegendVisibility(e) {
    this.#c = !!e, this.chart.legend.modify(this.#E, { legendVisibility: !!e });
  }
  setDefinitionValue(e, i) {
    let s = Object.keys(this.definition.input);
    if (s.includes(e))
      return this.definition.input[e] = i * 1, "input";
    if (s = Object.keys(this.style), s.includes(e))
      return this.style[e] = i, "style";
  }
  setRefresh() {
    super.setRefresh();
  }
  mustUpdate() {
    return super.mustUpdate();
  }
  init(e) {
    const i = this.params.overlay;
    this.defineIndicator(i, e), this.calcIndicatorHistory(), this.setNewValue = (s) => {
      this.newValue(s);
    }, this.setUpdateValue = (s) => {
      this.updateValue(s);
    }, this.#a === It.standard && (this.addLegend(), this.#b.start(), this.eventsListen(), this.setRefresh());
  }
  destroy(e = !0) {
    if (this.#C !== Te.destroyed) {
      if (!this.chartPane.indicatorDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "indicator.remove()" or "chart.removeIndicator()" instead.`);
        return;
      }
      this.core.hub.expunge(this), this.chart.legend.remove(this.#E), this.clear(), this.core.MainPane.draw(void 0, !0), this.chartPane.graph.removeOverlay(this.id), super.destroy(), e && this.core.state.removeIndicator(this.id), this.#C = Te.destroyed;
    }
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.chart.type === "primaryPane" || Object.keys(this.chart.indicators).length > 1 ? this.emit(`${this.chartPaneID}_removeIndicator`, { id: this.id, paneID: this.chartPaneID }) : this.chart.remove();
  }
  snapshot() {
    return {
      id: this.id,
      key: this.key,
      name: this.params.overlay.name,
      type: this.shortName,
      data: this.data,
      settings: this.definition
    };
  }
  dataProxy(e, i = []) {
    const s = this.range, n = this.core.state, r = this.definition.meta.output, o = [], l = new Array(r.length + 1);
    l.fill(0);
    let c = s.dataLength;
    for (let p = 0; p <= c; p++)
      l[0] = s.data[p][0], o[p] = Array.from(l);
    _(e) && e(o, n, s), this.data.length = 0;
    for (let p of o)
      this.data.push(p);
  }
  visible(e) {
    return q(e) && (this.emit(`${this.chartPaneID}_visibleIndicator`, { id: this.id, paneID: this.chartPaneID, visible: e }), this.chartPane.indicators[this.id].layer.visible = e, this.draw()), this.chartPane.indicators[this.id].layer.visible;
  }
  settings(e) {
    return v(e) && (v(e?.config) && (this.params.overlay.settings = _e(this.params.overlay.settings, e.config)), v(e?.style) && (this.style = _e(this.style, e.style)), this.draw()), {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition
    };
  }
  eventsListen() {
    this.on(rt, this.onStreamUpdate, this), this.on(`window_opened_${this.id}`, this.onConfigDialogueOpen, this), this.on(`window_closed_${this.id}`, this.onConfigDialogueCancel, this), this.on(`window_submit_${this.id}`, this.onConfigDialogueSubmit, this), this.on(`window_cancel_${this.id}`, this.onConfigDialogueCancel, this), this.on(`window_default_${this.id}`, this.onConfigDialogueDefault, this);
  }
  on(e, i, s = this) {
    this.core.on(e, i, s);
  }
  off(e, i, s = this) {
    this.core.off(e, i, s);
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
    const i = this.chart.legend.onPointerClick(e.currentTarget);
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
    this.setRefresh(), this.visible(!this.visible()), e.parent.classList.toggle("visible"), e.parent.classList.toggle("notvisible");
  }
  onConfigDialogueOpen(e) {
    if (this.#b.state === qe.opened) return;
    this.#b.setOpen();
    const i = this.#b.contentFields;
    for (let s in i)
      for (let n of i[s])
        n.classList.contains("subject") && n.getAttribute("data-oldval") !== n.value && n.setAttribute("data-oldval", n.value);
  }
  onConfigDialogueSubmit(e) {
    this.#b.setClose();
    let i, s = !1;
    const n = this.#b.contentFields;
    for (let r in n)
      for (let o of n[r])
        o.classList.contains("subject") && (o.setAttribute("data-oldval", o.value), i = this.setDefinitionValue(o.id, o.value), s = s || i == "input");
    s && (this.clear(), this.overlay.data.length = 0, this.calcIndicatorHistory()), this.setRefresh(), this.draw(), this.core.refresh();
  }
  onConfigDialogueCancel(e) {
    this.#b.setClose();
    const i = this.#b.contentFields;
    for (let s in i)
      for (let n of i[s])
        n.classList.contains("subject") && (n.value = n.getAttribute("data-oldval"));
    this.setRefresh(), this.draw();
  }
  onConfigDialogueDefault(e) {
    const i = this.#b.contentFields;
    for (let s in i)
      for (let n of i[s])
        if (n.classList.contains("subject")) {
          let r = n.getAttribute("data-default");
          n.value = r, this.style[n.id] = r;
        }
    this.calcIndicatorHistory(), this.setRefresh(), this.draw();
  }
  invokeSettings(e = {}) {
    let i;
    if (_(e?.fn)) {
      if (i = e.fn(this), e?.own) return i;
    } else if (_(this.core.config.callbacks?.indicatorSettings?.fn) && (i = this.core.config.callbacks.indicatorSettings.fn(this), this.core.config.callbacks?.indicatorSettings?.own))
      return i;
    this.core.log(`invokeSettings: ${this.id}`);
    const s = this.#b;
    if (s.update) {
      if (!_(this.configInputs))
        return this.core.error(`ERROR: Indicator ${this.name} does not provide configInputs() required for the settings dialogue`), !1;
      const n = this.configInputs(), { html: r, modifiers: o } = s.configBuild(n), l = `${this.shortName} Config`;
      s.setTitle(l), s.setContent(r, o), s.update = !1;
    }
    return s.state.name === "closed" ? s.open() : s.setOpen(), !0;
  }
  configInputs() {
    const s = { "No Config": { tab1: `Indicator ${this.name || this.shortName || this.id} is not configurable.` } };
    let n = {}, r = this?.definition?.meta;
    if (!v(r) && !v(this?.style) && !v(this?.definition?.input))
      return s;
    for (let o in r)
      lf.includes(o) || (n[o] = r[o]);
    if (Object.keys(n).length == 0)
      n = s;
    else
      for (let o in n)
        this.dataOldDefault(n[o]);
    return n;
  }
  dataOldDefault(e) {
    if (L(e))
      for (let i of e)
        this.dataOldDefault(i);
    else if (v(e))
      for (let i in e) {
        let s = v(e[i]) ? e[i] : e, n = Object.keys(s);
        n.includes("data-oldval") || (s["data-oldval"] = s?.value), n.includes("data-default") || (s["data-default"] = s?.default ? s?.default : s?.value);
      }
  }
  outputValueNumber(e, i, s) {
    let n = [s];
    return {
      type: "number",
      min: "0",
      d: i,
      listeners: n,
      fn: (r) => {
        this.configDialogue.provideEventListeners(`#${e}`, n)(r);
      }
    };
  }
  fieldEventChange() {
    return {
      event: "change",
      fn: (e) => {
        this.fieldTargetUpdate(e.target.id, e.target.value), this.setRefresh(), this.draw();
      }
    };
  }
  fieldTargetUpdate(e, i) {
    let s = this.definition.meta.style;
    for (let n in s)
      for (let r in s[n])
        v(s[n][r]) && s[n][r].entry == e && (s[n][r]["data-oldval"] = s[n][r].value, s[n][r].value = i);
  }
  configInputObject(e, i, s) {
    i instanceof Mt && (e[i.period] = this.configField(i.period, i.period, "number", s, s), e.$function = function(n) {
      const r = n.querySelector(`#${i.period}`), o = document.createElement("input");
      o.id = `"enable${i.period}`, o.checked = i.enable, o.addEventListener("change", (l) => {
        l.currentTarget.checked ? console.log(`enable ${l.currentTarget.id}`) : console.log(`disable ${l.currentTarget.id}`);
      }), r && r.insertAdjacentElement("beforebegin", o);
    });
  }
  defineIndicator(e, i) {
    let s = this.retrieveInput(e);
    i = v(i) ? i : { outputs: [], options: [] };
    const n = {
      input: {},
      output: {},
      meta: {
        input: {},
        output: [],
        outputOrder: [],
        outputLegend: {},
        style: {}
      }
    };
    v(this.definition) || (this.definition = n), this.definition = _e(n, this.definition);
    let r = this.definition, o = r.meta, l = [], c = nf?.[this.libName]?.outputs || [];
    r.input = v(r.input) ? { ...r.input, ...s } : s, r.output = v(r.output) ? r.output : {}, o = v(o) ? o : n.meta, o.input = v(o.input) ? o.input : {}, o.output = !L(o.output) || !o.output.length ? c : [...c, ...o.output], o.outputOrder = L(o.outputOrder) ? o.outputOrder : [], o.outputLegend = v(o.outputLegend) ? o.outputLegend : {}, Ro(o.style) || (o.style = this.style || {}), this.validateInputs(r, s, i), this.populateMetaInputs(r), this.validateOutputs(r, i, l), this.buildOutputOrder(o, l), this.buildOutputLegends(r), this.buildConfigOutputTab(o);
  }
  retrieveInput(e) {
    return v(e?.input) ? e.input : v(e?.settings?.input) ? e.settings.input : {};
  }
  validateInputs(e, i, s) {
    const n = { ...e.input, ...i };
    delete n.style, e.input = n;
    for (let r of s.options)
      r.name in e.input || (e.input[r.name] = s.options[r.name]);
    this.validate(e.input, s.options, e);
  }
  validateOutputs(e, i, s) {
    if (Object.keys(e.output).length == 0)
      for (let r of i.outputs)
        e.output[r.name] = [];
    let n = !0;
    if (Object.keys(e.meta.output).length > 0) {
      n = !1;
      for (let r of e.meta.output)
        v(r) && s.push(r.name);
    }
    for (let r in e.output)
      L(e.output[r]) || (e.output[r] = []), n && s.push(r);
  }
  populateMetaInputs(e) {
    let i = e.input, s = e.meta.input;
    for (let n in s)
      s[n].value = i[n];
  }
  buildOutputOrder(e, i) {
    let s = [.../* @__PURE__ */ new Set([...e.outputOrder, ...i])], n = ri(s, i);
    for (let r of n) {
      if (of.includes(r)) continue;
      let o = s.indexOf(r);
      s.splice(o, 1);
    }
    e.outputOrder = s;
  }
  buildOutputLegends(e) {
    let i = e.meta;
    Object.keys(e.output);
    for (let [s, n] of Object.entries(i.outputLegend))
      v(n) || (i.outputLegend[s] = {}), T(i.outputLegend[s].labelStr) || (i.outputLegend[s].label = !1, i.outputLegend[s].labelStr = ""), q(i.outputLegend[s].label) || (i.outputLegend[s].label = !1), q(i.outputLegend[s].value) || (i.outputLegend[s].value = !1);
  }
  buildConfigOutputTab(e) {
    for (let i in e.style)
      typeof e.style[i] != "object" && delete e.style[i];
    for (let i = 0; i < e.output.length; i++) {
      let s = e.output[i];
      switch (Aa(s?.plot)) {
        case "renderLine":
          s.style = this.defaultMetaStyleLine(s, i, e.style);
          break;
        case "histogram":
          return "histogram";
        case "highLow":
          return "highLow";
      }
    }
  }
  defaultMetaStyleLine(e, i, s) {
    let n;
    e.name = e?.name ? e.name : "output", v(s?.[e.name]) || (s[e.name] = {});
    let r = new lt(s[e.name]?.colour?.value);
    if (r.isValid)
      n = r.value.hexa;
    else {
      let o = this.colours.length;
      n = i <= o ? this.colours[i] : this.colours[o % i];
    }
    return s[e.name].colour = this.defaultOutputField(`${e.name}Colour`, `${e.name} Colour`, n, "color"), P(s[e.name]?.width?.value) ? n = s[e.name]?.width.value : n = 1, s[e.name].width = this.defaultOutputField(`${e.name}Width`, `${e.name} Width`, n, "number", 0), "dash" in s[e.name] && s[e.name].dash && (n = s[e.name]?.dash?.value, s[e.name].dash = this.defaultOutputField(`${e.name}dash`, `${e.name} Dash`, n, "dash", void 0, void 0)), s[e.name];
  }
  defaultOutputField(e, i, s, n, r, o, l) {
    let c, p, f, b = this.fieldEventChange();
    switch (n) {
      case "number":
        p = [b], c = (M) => {
          this.configDialogue.provideEventListeners(`#${e}`, p)(M);
        };
        break;
      case "color":
        p = [b, hf, cf], c = (M) => {
          this.configDialogue.provideInputColor(M, `#${e}`), this.configDialogue.provideEventListeners(`#${e}`, p)(M);
        }, n = "text";
        break;
      case "dash":
        p = [b], c = (M) => {
          this.configDialogue.provideEventListeners(`#${e}`, p)(M);
        }, n = "select";
        let E = {};
        for (let M in pa)
          E[M] = pa[M].toString();
        f = E;
        break;
    }
    return this.configField(e, i, n, s, s, r, o, c, i, f);
  }
  configField(e, i, s, n, r, o, l, c, p, f) {
    r = r || n, p = p || i, P(o) && P(l) && o > l ? [l, o] = [o, l] : P(o) && P(l) && (n = U(n, o, l));
    let b = {
      entry: e,
      label: i,
      type: s,
      value: n,
      default: r,
      "data-oldval": n,
      "data-default": r,
      $function: c,
      title: p
    };
    return P(o) && (b.min = o), P(l) && (b.max = l), v(f) && Object.keys(f).length && (b.options = f), b;
  }
  defaultColour() {
    return "#fff";
  }
  addLegend() {
    let e = {
      id: this.id,
      title: this.legendName,
      visible: this.#c,
      type: "indicator",
      parent: this,
      source: this.legendInputs.bind(this)
    };
    this.#E = this.chart.legend.add(e);
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return !1;
    const i = [], s = [], n = {}, r = this.Timeline.xPos2Index(e[0]), o = this.overlay.data.length;
    this.definition.meta.outputOrder, this.definition.meta.outputLegend;
    let l = r - (this.range.data.length - o), c = U(o - 1, 0, 1 / 0);
    l = U(l, 0, c);
    let p = 0;
    for (let f of this.definition.meta.output) {
      let b = this.overlay.data[l];
      f.type == "overlay" || !L(b) || b.length == 0 || (i[p] = !1, n[f.name] = this.scale.nicePrice(this.overlay.data[l][p + 1]), f.plot == "histogram" ? this.overlay.data[l][p + 1] < 0 ? s[p] = this.definition.meta.style?.[f.name].dnStroke : s[p] = this.definition.meta.style?.[f.name].upStroke : s[p] = this.definition.meta.style?.[f.name]?.colour?.value || "#ccc", p++);
    }
    return { inputs: n, colours: s, labels: i };
  }
  indicatorInput(e, i) {
    let s = this.core.state.gaps, n, r, o = {
      inReal: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    };
    do
      n = this.range.value(e), r = this.#A && `${n[0]}` in s ? s[`${n[0]}`] : n, o.inReal.push(r[he.c]), o.open.push(r[he.o]), o.high.push(r[he.h]), o.low.push(r[he.l]), o.close.push(r[he.c]), o.volume.push(r[he.v]);
    while (e++ < i);
    return o;
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
  getTimePeriod() {
    let e = 0, i = this.definition.input, s = this.constructor?.timePeriodMultiplier ? 2 : 1;
    if ("timePeriod" in i)
      e = i.timePeriod * s;
    else {
      for (let n in i)
        k(i[n]) && i[n] > e && (e = i[n]);
      e *= s;
    }
    return e;
  }
  TALibParams() {
    let e = this.range.dataLength, i = this.getTimePeriod(), s = e - i, n = this.indicatorInput(s, e);
    return n.inReal.find((o) => o === null) ? !1 : { timePeriod: i, ...n };
  }
  formatValue(e) {
    let i = [], s = 0;
    for (let n in this.definition.output)
      i[s++] = e[n][0];
    return i;
  }
  noCalc(e, i = this.range) {
    return this.chart.status == "destroyed" || !this.core.TALibReady || !T(e) || !(e in this.TALib) || !v(i) || i.dataLength < this.definition.input.timePeriod;
  }
  noCalcCustom(e, i = this.range) {
    return this.chart.status == "destroyed" || !this.core.TALibReady || !_(e) || !v(i) || i.dataLength < this.definition.input.timePeriod;
  }
  calcIndicator(e, i = {}, s, n = this.definition.output) {
    let r;
    if (!this.noCalcCustom(e))
      r = e;
    else if (!this.noCalc(e, s))
      r = this.TALib[e];
    else return !1;
    let o = this.getTimePeriod(), l, c, p = o, f = p + (i?.padding || 0), b = this.overlay.data;
    if (s instanceof Yi)
      l = 0, c = s.dataLength - f + 1;
    else if (v(s))
      l = s?.indexStart || this.Timeline.t2Index(s?.tsStart || 0) || 0, c = s?.indexEnd || this.Timeline.t2Index(s?.tsEnd) || s.dataLength - f + 1;
    else return !1;
    if (L(b)) {
      if (b.length != 0) if (b.length + f !== s.dataLength)
        if (b[0][0] > s.value(f)[0])
          l = 0, c = s.getTimeIndex(b[0][0]) - f, c = U(c, f, s.dataLength - 1);
        else if (b[b.length - 1][0] < s.value(s.dataLength - 1)[0])
          l = b.length - 1 + f, l = U(l, 0, s.dataLength), c = s.dataLength - 1;
        else return !1;
      else return !1;
    } else return !1;
    if (c < f)
      return this.setError({ type: "noData", msg: "Insufficient input data" }), !1;
    c - l < f && (l -= f + p - (c - l));
    let E = [], M, D, N;
    for (; l < c; )
      D = this.indicatorInput(l, l + f), i = { ...i, ...D }, M = r(i), N = this.formatValue(M), E.push([s.value(l + p - 1)[0], ...N]), l++;
    return E;
  }
  calcIndicatorHistory(e) {
    const i = () => {
      let s = this.overlay.data;
      const n = this.calcIndicator(this.libName, this.definition.input, this.range);
      if (L(n)) {
        new Set(n), new Set(s);
        let r, o, l = {};
        if (!L(s) || s.length == 0) {
          this.overlay.data = n;
          return;
        } else if (n.length) n[0][0] < s[0][0] ? (r = n, o = s) : (n[n.length - 1][0] > s[s.length - 1][0], r = s, o = n);
        else return;
        for (let c of r)
          l[c[0]] = c;
        for (let c of o)
          l[c[0]] = c;
        this.overlay.data = Object.values(l), this.state = Te.hasData, this.setRefresh();
      }
    };
    this.core.TALibReady ? i() : this.core.talibAwait.push(i.bind(this));
  }
  calcIndicatorStream(e, i, s = this.range) {
    if (!(s instanceof Yi)) return !1;
    let n;
    if (!this.noCalcCustom(e))
      n = e;
    else if (!this.noCalc(e, s))
      n = this.TALib[e];
    else return !1;
    let r = n(i), o = s.dataLength, l = s.value(o)[0], c = this.formatValue(r);
    return [l, ...c];
  }
  newValue(e) {
    this.#O(
      (i) => this.overlay.data.push(i)
    );
  }
  updateValue(e) {
    this.#O(
      (i) => {
        let s = this.overlay.data.length - 1;
        this.overlay.data[s] = i;
      }
    );
  }
  #O(e) {
    let i = this.TALibParams();
    if (!i) return !1;
    let s = this.calcIndicatorStream(this.libName, i);
    if (!s) return !1;
    e(s), this.state = Te.hasData, this.target.setPosition(this.core.scrollPos, 0), this.doDraw = !0, this.draw(this.range);
  }
  plot(e, i, s) {
    super.plot(e, i, s);
  }
  plotIt(e, i, s, n, r) {
    const o = this.overlay.data, l = this.xAxis.candleW, c = this.yAxis.yPos(0), p = { w: l, zero: c }, f = {};
    let b = [];
    for (; e; )
      i < 0 || i >= o.length || !L(o[i]) ? b.push({ x: null, y: null }) : (p.x = this.xAxis.xPos(o[i][0]), p.y = this.yAxis.yPos(o[i][s]), b.push({ ...p })), i++, e--;
    for (let E in r)
      r[E]?.value && (f[E] = r[E].value);
    this.plot(b, n, f);
  }
  draw(e = this.range) {
    const i = this.overlay.data;
    if (i.length < 2 || !super.mustUpdate()) return;
    this.clear(), this.xAxis.smoothScrollOffset;
    const s = this.definition.meta, n = {};
    let r = this.Timeline.rangeScrollOffset, o = e.data.length - i.length, l = e.indexStart - o - 2, c = e.Length + r * 2 + 2, p = 1;
    if (!s.output.length)
      return super.updated();
    for (let E of s.output) {
      let M = Aa(E.plot);
      M && (n[E?.name] = { x: p++, r: M });
    }
    let b = (s?.outputOrder.length > 0 ? s.outputOrder : Object.keys(n)).reverse();
    for (let E of b) {
      let M = this.formatStyle(this.definition.meta.style[E], E);
      this.plotIt(c, l, n[E].x, n[E].r, M);
    }
    this.target.viewport.render(), super.updated();
  }
  formatStyle(e, i) {
    let s, n = {};
    for (let r in e) {
      switch (s = r.replace(i, "").toLowerCase(), s) {
        case "colour":
          s = "stroke";
          break;
      }
      n[s] = e[r];
    }
    return n;
  }
  updated() {
    this.setRefresh(), super.updated();
  }
  validate(e, i, s) {
    let n = s.meta, r;
    for (let o of i) {
      r = typeof e[o.name] == "object" ? e[o.name]?.value : e[o.name], e[o.name] = typeof r !== o.type ? o.defaultValue : r, "range" in i && (e[o.name] = U(e[o.name], o.range.min, o.range.max));
      const l = this.configField(
        o?.name,
        o?.displayName,
        o?.type,
        e[o.name],
        o?.defaultValue,
        o?.range?.min,
        o?.range?.max,
        void 0,
        o?.hint
      );
      n.input[o.name] = { ...l, ...n.input[o.name] };
    }
  }
}
function Aa(a) {
  switch (a) {
    case "line":
    case "line_dash":
    case "limit_lower":
    case "limit_upper":
      return "renderLine";
    case "histogram":
      return "histogram";
    case "highLowRange":
      return "highLowRange";
    default:
      return !1;
  }
}
const hf = {
  event: "pointerover",
  fn: (a) => {
    a.target.style.border = "1px solid #f00;";
  }
}, cf = {
  event: "pointerout",
  fn: (a) => {
    a.target.style.border = "none;";
  }
};
function Pn(a) {
  const e = JSON.stringify(a), i = Gn(e);
  return `${nt}_Indicator_${i}`;
}
let $s = "ADX", Oa = "Average Directional Movement Index";
class uf extends z {
  get name() {
    return Oa;
  }
  shortName = $s;
  libName = $s;
  precision = 2;
  scaleOverlay = !0;
  static nameShort = $s;
  static nameLong = Oa;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.percent;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    },
    highLowRange: {
      colour: { value: "#880E4F" },
      width: { value: 1 },
      dash: { value: [2, 2] },
      fill: { value: "#880E4F08" },
      high: { value: 75 },
      low: { value: 25 }
    }
  };
  static timePeriodMultiplier = !0;
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(Rl);
  }
}
let Hs = "ATR", Da = "Average True Range";
class df extends z {
  get name() {
    return Da;
  }
  shortName = Hs;
  libName = Hs;
  precision = 2;
  scaleOverlay = !0;
  static nameShort = Hs;
  static nameLong = Da;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.relative;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    },
    highLowRange: {
      colour: { value: "#880E4F" },
      width: { value: 1 },
      dash: { value: [2, 2] },
      fill: { value: "#880E4F08" },
      high: { value: 75 },
      low: { value: 25 }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init($l);
  }
}
let _s = "AROON", Ia = "AROON";
class mf extends z {
  get name() {
    return Ia;
  }
  shortName = _s;
  libName = _s;
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
  precision = 2;
  scaleOverlay = !0;
  static nameShort = _s;
  static nameLong = Ia;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.percent;
  static defaultStyle = {
    aroonDown: {
      colour: { value: "#c89" },
      width: { value: 1 },
      dash: { value: "" }
    },
    aroonUp: {
      colour: { value: "#08c" },
      width: { value: 1 },
      dash: { value: "" }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(kl);
  }
}
let Na = "BB", Ra = "Bollinger Bands";
class pf extends z {
  get name() {
    return Ra;
  }
  shortName = Na;
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
    },
    meta: {}
  };
  precision = 2;
  scaleOverlay = !1;
  static nameShort = Na;
  static nameLong = Ra;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !0;
  static defaultStyle = {
    lowerBand: {
      colour: { value: "#08c" },
      width: { value: 1 },
      dash: { value: "" }
    },
    middleBand: {
      colour: { value: "#0080c088" },
      width: { value: 1 },
      dash: { value: [20, 5] }
    },
    upperBand: {
      colour: { value: "#08c" },
      width: { value: 1 },
      dash: { value: "" }
    },
    fill: {
      colour: { value: "#0080c044" }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(Hl);
  }
}
let Bs = "CCI", ka = "Commodity Channel Index";
class ff extends z {
  get name() {
    return ka;
  }
  shortName = Bs;
  libName = Bs;
  precision = 2;
  scaleOverlay = !0;
  static nameShort = Bs;
  static nameLong = ka;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.relative;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    },
    highLowRange: {
      colour: { value: "#880E4F" },
      width: { value: 1 },
      dash: { value: [2, 2] },
      fill: { value: "#880E4F08" },
      high: { value: 100 },
      low: { value: -100 }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(_l);
  }
}
let Fs = "CMO", $a = "Chande Momentum Oscillator";
class gf extends z {
  get name() {
    return $a;
  }
  shortName = Fs;
  libName = Fs;
  precision = 2;
  scaleOverlay = !0;
  static nameShort = Fs;
  static nameLong = $a;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.relative;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    },
    highLowRange: {
      colour: { value: "#880E4F" },
      width: { value: 1 },
      dash: { value: [2, 2] },
      fill: { value: "#880E4F08" },
      high: { value: 75 },
      low: { value: 25 }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(Bl);
  }
}
let Ha = "DMI", _a = "Average Directional Movement Index";
class yf extends z {
  static nameShort = Ha;
  static nameLong = _a;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.relative;
  static yAxisPadding = os;
  static colours = [];
  static defaultStyle = {
    "DI+": {
      colour: { value: "#0f0" },
      width: { value: 1 },
      dash: { value: [] }
    },
    "DI-": {
      colour: { value: "#f00" },
      width: { value: 1 },
      dash: { value: [] }
    },
    ADX: {
      colour: { value: "#00f" },
      width: { value: 1 },
      dash: { value: [] }
    }
  };
  static timePeriodMultiplier = !0;
  #e = 2;
  get name() {
    return _a;
  }
  shortName = Ha;
  scaleOverlay = !1;
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    },
    meta: {
      output: [
        { name: "DI+", type: "custom", plot: "line" },
        { name: "DI-", type: "custom", plot: "line" },
        { name: "ADX", type: "custom", plot: "line" }
      ],
      outputOrder: ["DMI+", "DMI-", "ADX"],
      outputLegend: {
        "DI+": { labelStr: "DI+", label: !0, value: !0 },
        "DI-": { labelStr: "DI-", label: !0, value: !0 },
        ADX: { labelStr: "ADX", label: !0, value: !0 }
      }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(), this.on("trade_added", this.tradeAdded);
  }
  get data() {
    return this.overlay.data;
  }
  get overlayData() {
    return this.overlay.data;
  }
  calcIndicator(e, i = {}, s = this.range) {
    let n = { input: { timePeriod: 14 }, output: { output: [] } }, r = { input: { timePeriod: 14 }, output: { output: [] } }, o = { input: { timePeriod: 14 }, output: { output: [] } }, l = super.calcIndicator("PLUS_DI", i, s, n), c = super.calcIndicator("MINUS_DI", i, s, r), p = super.calcIndicator("ADX", i, s, o);
    if (!l && !c && !p) return !1;
    for (let f = 0; f < l.length; f++)
      l[f][2] = c[f][1], l[f][3] = p[f][1];
    return l;
  }
  calcIndicatorStream(e, i = {}, s = this.range) {
    let n = s.value()[0], r = s.getTimeIndex(n);
    return this.data[r] = [n, 0, 0], !1;
  }
}
let Us = "DX", Ba = "Directional Movement Index";
class vf extends z {
  get name() {
    return Ba;
  }
  shortName = Us;
  libName = Us;
  precision = 2;
  scaleOverlay = !0;
  static nameShort = Us;
  static nameLong = Ba;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.percent;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    },
    highLowRange: {
      colour: { value: "#880E4F" },
      width: { value: 1 },
      dash: { value: [2, 2] },
      fill: { value: "#880E4F08" },
      high: { value: 75 },
      low: { value: 25 }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(Fl);
  }
}
let zs = "EMA", Fa = "Exponential Moving Average";
class cr extends z {
  get name() {
    return Fa;
  }
  shortName = zs;
  libName = zs;
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    },
    meta: {
      input: {
        timePeriod: {
          entry: "timePeriod",
          label: "Period",
          type: "number",
          value: 5,
          default: 30,
          min: "3",
          title: "Number of time units to use in calculation",
          $function: this.configDialogue.provideEventListeners(
            "#Period",
            [{
              event: "change",
              fn: (e) => {
                console.log(`#Period = ${e.target.value}`);
              }
            }]
          )
        }
      }
    }
  };
  precision = 2;
  checkParamCount = !1;
  scaleOverlay = !1;
  static nameShort = zs;
  static nameLong = Fa;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !0;
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ];
  static defaultStyle = {
    output: {
      colour: { value: "#C80" },
      width: { value: 1 },
      dash: { value: [] }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), cr.inCnt++, this.init(Ul);
  }
}
let Vs = "MA", Ua = "Moving Average";
class Nt extends z {
  get name() {
    return Ua;
  }
  shortName = Vs;
  libName = Vs;
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    }
  };
  #e = 2;
  primaryPane = !0;
  scaleOverlay = !1;
  static nameShort = Vs;
  static nameLong = Ua;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !0;
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ];
  static defaultStyle = {
    output: {
      colour: { value: "#9C27B0" },
      width: { value: 1 },
      dash: { value: [] }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), Nt.inCnt++, this.init(zl);
  }
}
let Ws = "MMA", za = "Moving Average Multi";
class Lt extends z {
  static nameShort = Ws;
  static nameLong = za;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !0;
  static colours = [
    it[8],
    it[18],
    it[28],
    it[38],
    it[48]
  ];
  static defaultStyle = {
    stroke1: Lt.colours[0],
    width1: "1",
    stroke2: Lt.colours[1],
    width2: "1",
    stroke3: Lt.colours[2],
    width3: "1",
    stroke4: Lt.colours[3],
    width4: "1",
    stroke5: Lt.colours[4],
    width5: "1"
  };
  get name() {
    return za;
  }
  shortName = Ws;
  libName = Ws;
  definition = {
    input: {
      inReal: [],
      timePeriod1: new Mt(!0, 5),
      timePeriod2: new Mt(!0, 10),
      timePeriod3: new Mt(!0, 20),
      timePeriod4: new Mt(!0, 30),
      timePeriod5: new Mt(!0, 50)
    },
    output: {
      output1: [],
      output2: [],
      output3: [],
      output4: [],
      output5: []
    }
  };
  #e = 2;
  primaryPane = !0;
  scaleOverlay = !1;
  plots = [
    { key: "MA_1", title: "MA: ", type: "line" }
  ];
  #t = 3;
  #i = 5;
  MA = {
    MA1: { enabled: !1, ma: null },
    MA2: { enabled: !1, ma: null },
    MA3: { enabled: !1, ma: null },
    MA4: { enabled: !1, ma: null },
    MA5: { enabled: !1, ma: null }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), Nt.inCnt++;
    const l = o.overlay.settings?.MAChildren || this.MA;
    this.#t = Object.keys(l).length, this.MA.ma1 = new Nt(e, i = !1, s = !1, n, r, o), this.MA.ma2 = new Nt(e, i = !1, s = !1, n, r, o);
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return !1;
    const i = {}, { c: s, colours: n } = super.legendInputs(e);
    return i.MA_1 = this.scale.nicePrice(this.overlay.data[s][1]), { inputs: i, colours: n };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2 || !super.mustUpdate()) return;
    this.scene.clear();
    const i = this.overlay.data, s = this.xAxis.candleW, n = [];
    this.xAxis.smoothScrollOffset;
    const r = {
      w: s
    };
    let o = this.Timeline.rangeScrollOffset, l = e.data.length - this.overlay.data.length, c = e.indexStart - l - 2, p = e.Length + o * 2 + 2;
    for (; p; )
      c < 0 || c >= this.overlay.data.length ? n.push({ x: null, y: null }) : (r.x = this.xAxis.xPos(i[c][0]), r.y = this.yAxis.yPos(i[c][1]), n.push({ ...r })), c++, p--;
    this.plot(n, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
let Gs = "MACD", bf = "Moving Average Convergence/Divergence";
class ur extends z {
  get name() {
    return "Moving Average Convergence/Divergence";
  }
  shortName = Gs;
  libName = Gs;
  definition = {
    input: {
      inReal: [],
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9
    },
    output: {
      MACD: [],
      MACDSignal: [],
      MACDHist: []
    },
    meta: {
      outputOrder: [
        "MACD",
        "MACDSignal",
        "MACDHist"
      ],
      outputLegend: {
        MACD: { labelStr: "MACD", label: !1, value: !0 },
        MACDSignal: { labelStr: "Signal", label: !1, value: !0 },
        MACDHist: { labelStr: "Hist", label: !1, value: !0 }
      }
    }
  };
  #e = 2;
  scaleOverlay = !1;
  static nameShort = Gs;
  static nameLong = bf;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.relative;
  static yAxisPadding = os;
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ];
  static defaultStyle = {
    MACD: {
      colour: { value: "#08c" },
      width: { value: 1 },
      dash: { value: "" }
    },
    MACDSignal: {
      colour: { value: "#08c" },
      width: { value: 1 },
      dash: { value: "" }
    },
    MACDHist: {
      upStroke: "#0f0",
      upFill: "#0c0",
      upWidth: "1",
      dnStroke: "#f00",
      dnFill: "#c00",
      dnWidth: "1"
    }
  };
  static timePeriodMultiplier = !0;
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), ur.inCnt++, this.init(Vl);
  }
  draw() {
    return super.draw();
  }
}
let qs = "MFI", Va = "Money Flow Index";
class wf extends z {
  get name() {
    return Va;
  }
  shortName = qs;
  libName = qs;
  precision = 2;
  scaleOverlay = !0;
  static nameShort = qs;
  static nameLong = Va;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.percent;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    },
    highLowRange: {
      colour: { value: "#880E4F" },
      width: { value: 1 },
      dash: { value: [2, 2] },
      fill: { value: "#880E4F08" },
      high: { value: 100 },
      low: { value: -100 }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(Wl);
  }
}
let js = "OBV", Wa = "On Balance Volume";
class xf extends z {
  get name() {
    return Wa;
  }
  shortName = js;
  libName = js;
  precision = 2;
  scaleOverlay = !0;
  static nameShort = js;
  static nameLong = Wa;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.default;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    },
    highLowRange: {
      colour: { value: "#880E4F" },
      width: { value: 1 },
      dash: { value: [2, 2] },
      fill: { value: "#880E4F08" },
      high: { value: 100 },
      low: { value: -100 }
    }
  };
  static timePeriodMultiplier = !0;
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(Gl);
  }
}
let Xs = "PPO", Cf = "Percentage Price Oscillator";
class Tf extends z {
  get name() {
    return "Percentage Price Oscillator";
  }
  shortName = Xs;
  libName = Xs;
  precision = 2;
  scaleOverlay = !0;
  static nameShort = Xs;
  static nameLong = Cf;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.relative;
  static yAxisPadding = os;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    },
    highLowRange: {
      colour: { value: "#880E4F" },
      width: { value: 1 },
      dash: { value: [2, 2] },
      fill: { value: "#880E4F08" },
      high: { value: 100 },
      low: { value: -100 }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(ql);
  }
}
let Ys = "PSAR", Ga = "Parabolic Stop and Reverse";
class Sf extends z {
  get name() {
    return Ga;
  }
  shortName = Ys;
  libName = Ys;
  precision = 2;
  scaleOverlay = !1;
  static nameShort = Ys;
  static nameLong = Ga;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !0;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(Yl);
  }
}
let Ks = "ROC", qa = "Rate of Change";
class Ef extends z {
  get name() {
    return qa;
  }
  shortName = Ks;
  libName = Ks;
  precision = 2;
  scaleOverlay = !0;
  static nameShort = Ks;
  static nameLong = qa;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.relative;
  static yAxisPadding = os;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    },
    highLowRange: {
      colour: { value: "#880E4F" },
      width: { value: 1 },
      dash: { value: [2, 2] },
      fill: { value: "#880E4F08" },
      high: { value: 100 },
      low: { value: -100 }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(jl);
  }
}
let Zs = "RSI", ja = "Average Directional Movement Index";
class es extends z {
  get name() {
    return ja;
  }
  shortName = Zs;
  libName = Zs;
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    },
    meta: {
      outputOrder: [
        "output",
        "highLowRange"
      ],
      output: [
        { name: "highLowRange", type: "overlay", plot: "highLowRange", style: es.defaultStyle.highLow }
      ],
      style: es.defaultStyle
    }
  };
  checkParamCount = !1;
  static nameShort = Zs;
  static nameLong = ja;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.percent;
  static defaultStyle = {
    output: {
      colour: { value: "#E91E63" },
      width: { value: 1 },
      dash: { value: [] }
    },
    highLowRange: {
      colour: { value: "#880E4F" },
      width: { value: 1 },
      dash: { value: [2, 2] },
      fill: { value: "#880E4F08" },
      high: { value: 75 },
      low: { value: 25 }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(Xl);
  }
}
let Qs = "SMA", Xa = "Simple Moving Average";
class dr extends z {
  get name() {
    return Xa;
  }
  shortName = Qs;
  libName = Qs;
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    }
  };
  #e = 2;
  primaryPane = !0;
  scaleOverlay = !1;
  static nameShort = Qs;
  static nameLong = Xa;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !0;
  static colours = [
    "#9C27B0",
    "#9C27B0",
    "#66BB6A",
    "#66BB6A"
  ];
  static defaultStyle = {
    output: {
      colour: { value: "#0097A7" },
      width: { value: 1 },
      dash: { value: [] }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), dr.inCnt++, this.init(Kl);
  }
}
let Js = "STOCH", Ya = "Stochastic Oscillator";
class t1 extends z {
  get name() {
    return Ya;
  }
  shortName = Js;
  libName = Js;
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
  checkParamCount = !1;
  static nameShort = Js;
  static nameLong = Ya;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.relative;
  static defaultStyle = {
    slowK: {
      colour: { value: "#c89" },
      width: { value: 1 },
      dash: { value: "" }
    },
    slowD: {
      colour: { value: "#08c" },
      width: { value: 1 },
      dash: { value: "" }
    }
  };
  static timePeriodMultiplier = !0;
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(Zl);
  }
}
let en = "STOCHRSI", Ka = "Stochastic RSI";
class Pf extends z {
  get name() {
    return Ka;
  }
  shortName = en;
  libName = en;
  definition = {
    input: {
      inReal: [],
      timePeriod: 14,
      stochPeriod: 14,
      KPeriod: 3,
      DPeriod: 3
    },
    output: {
      fastK: [],
      fastD: []
    }
  };
  checkParamCount = !1;
  static nameShort = en;
  static nameLong = Ka;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = !1;
  static scale = R.relative;
  static defaultStyle = {
    fastK: {
      colour: { value: "#c89" },
      width: { value: 1 },
      dash: { value: "" }
    },
    fastD: {
      colour: { value: "#08c" },
      width: { value: 1 },
      dash: { value: "" }
    }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.init(Ql);
  }
}
class Jl {
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.theme = i;
  }
  draw(e) {
    const i = this.ctx, n = e.raw[4] >= e.raw[1] ? this.theme.up.colour.value : this.theme.dn.colour.value;
    i.save(), i.strokeStyle = n, i.fillStyle = n, i.fillRect(
      Math.floor(e.x),
      Math.floor(e.z - e.h),
      Math.floor(e.w),
      Math.floor(e.h)
    ), i.restore();
  }
}
let Za = "VOL", Qa = "Volume";
class mr extends z {
  get name() {
    return Qa;
  }
  shortName = Za;
  checkParamCount = !1;
  scaleOverlay = !0;
  definition = {
    meta: {
      style: {
        up: { colour: { value: "#388E3C" } },
        dn: { colour: { value: "#D32F2F" } },
        height: { percent: { value: 15 } }
      }
    }
  };
  #e = cs.volume;
  #t;
  #i = "both";
  static nameShort = Za;
  static nameLong = Qa;
  static version = "1.0";
  static inCnt = 0;
  static primaryPane = "both";
  static scale = R.percent;
  static defaultStyle = {
    up: { colour: { value: "#388E3C" } },
    dn: { colour: { value: "#D32F2F" } },
    height: { percent: { value: 15 } }
  };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), mr.inCnt++;
    const l = o.overlay;
    this.id = o.overlay?.id || ae(this.shortName), this.#e = { ...this.defaultStyle, ...this.theme.volume }, this.style = l?.settings?.style ? { ...this.#e, ...l.settings.style } : { ...this.#e, ...n.style }, this.chart.type === "primaryPane" ? (this.style.Height = U(this.style.Height, 0, 100) || 100, this.#i = !0) : (this.style.Height = 100, this.#i = !1), this.mStyle.up.colour.value = this.style.UpColour, this.mStyle.dn.colour.value = this.style.DnColour, this.mStyle.height.percent.value = this.style.Height, this.#t = new Jl(e.scene, this.mStyle), this.addLegend(), this.configDialogue.start();
  }
  get primaryPane() {
    return this.#i;
  }
  get defaultStyle() {
    return this.#e;
  }
  get mStyle() {
    return this.definition.meta.style;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.range.dataLength == 0) return !1;
    const i = super.Timeline.xPos2Index(e[0]), s = U(i, 0, this.range.data.length - 1), n = this.range.data[s];
    this.chart.theme.candle;
    const r = n[4] >= n[1] ? [this.mStyle.up.colour.value.slice(0, 7)] : [this.mStyle.dn.colour.value.slice(0, 7)];
    return { inputs: { V: this.scale.nicePrice(n[5]) }, colours: r };
  }
  calcIndicatorHistory() {
  }
  draw(e = this.range) {
    if (e.dataLength < 2 || !this.mustUpdate()) return !1;
    this.scene.clear();
    const i = e.data, s = this.scene.height, n = this.xAxis.smoothScrollOffset || 0;
    let r = Math.max(this.xAxis.candleW - 1, 1);
    r = ps(r);
    const o = {
      x: 0 + n - this.xAxis.candleW,
      w: r,
      z: s
    }, l = Math.floor(s * this.mStyle.height.percent.value / 100);
    let c = this.core.rangeScrollOffset, p = e.indexStart - c, f = e.Length + c * 2, b = f, E = p, M, D = 0;
    for (; b--; )
      M = e.value(E), M[4] !== null && (D = M[5] > D ? M[5] : D), E++;
    for (; f--; )
      M = e.value(p), o.x = He(this.xAxis.xPos(M[0]) - r / 2), M[4] !== null && (o.h = l - l * ((D - M[5]) / D), o.raw = i[p], this.#t.draw(o)), p++;
    super.updated();
  }
}
const eh = {
  ADX: uf,
  ATR: df,
  AROON: mf,
  BB: pf,
  CCI: ff,
  CMO: gf,
  DMI: yf,
  DX: vf,
  EMA: cr,
  MA: Nt,
  MACD: ur,
  MFI: wf,
  OBV: xf,
  PPO: Tf,
  PSAR: Sf,
  ROC: Ef,
  RSI: es,
  SMA: dr,
  STOCHRSI: Pf,
  VOL: mr
}, pr = {};
((a) => {
  for (let e in a)
    pr[e] = {
      id: e,
      name: a[e].prototype.name,
      event: "addIndicator",
      ind: a[e]
    };
})(eh);
const fr = "0.154.0";
function Mf(a) {
  a = a === !0;
  var e, i = {}, s = this, n, r, o = "", l = [], c = "", p = 256;
  for (e = 0; e < 256; e += 1)
    i[String.fromCharCode(e)] = e;
  for (e = 0; e < s.length; e += 1)
    n = s.charAt(e), r = o + n, i.hasOwnProperty(r) ? o = r : (l.push(i[o]), c += String.fromCharCode(i[o]), i[r] = p++, o = String(n));
  return o !== "" && (l.push(i[o]), c += String.fromCharCode(i[o])), a ? l : c;
}
function Lf() {
  var a, e = [], i = [], s = this, n, r, o, l = "", c = 256;
  for (a = 0; a < 256; a += 1)
    i[a] = String.fromCharCode(a);
  if (s && typeof s == "string") {
    for (a = 0; a < s.length; a += 1)
      e.push(s[a].charCodeAt(0));
    s = e, e = null;
  }
  for (n = String.fromCharCode(s[0]), r = n, a = 1; a < s.length; a += 1) {
    if (o = s[a], i[o])
      l = i[o];
    else if (o === c)
      l = n + n.charAt(0);
    else
      return null;
    r += l, i[c++] = n + l.charAt(0), n = l;
  }
  return r;
}
String.prototype.compress = Mf;
String.prototype.decompress = Lf;
function Af(a, e = !1) {
  if (!L(a)) return !1;
  let i = fu(0, a.length);
  if (!Vi(a[0], e) || !Vi(a[i], e) || !Vi(a[a.length - 1], e)) return !1;
  let s = a[0][0], n = a[1][0], r = a[2][0];
  return !(s > n && n > r);
}
function Of(a, e = !1) {
  if (!L(a)) return !1;
  let i = 0, s = 0;
  for (; i < a.length; ) {
    if (!Vi(a[i], e) || a[i][0] < s) return !1;
    s = a[i][0], i++;
  }
  return !0;
}
function Df(a, e, i) {
  if (!L(a) || a.length == 1) return !1;
  let s, n, r, o, l, c, p, f = [], b = 0, E = (a[a.length - 1][0] - a[b][0]) / e;
  for (; b < E; )
    s = a[b][0], n = a[b + 1][0], r = n - s, r == e ? (f.push(a[b]), p = a[b]) : r > e && (l = s + e, o = [l, null, null, null, null, null], f.push(o), c = [...p], c[0] = l, i[`${l}`] = c, a.splice(b + 1, 0, o)), b++;
  return a;
}
function Vi(a, e = !1) {
  return !(!L(a) || a.length !== 6 || e && !qn(a[0]) || !P(a[1]) || !P(a[2]) || !P(a[3]) || !P(a[4]) || !P(a[5]));
}
function If(a) {
  for (let e of a)
    for (let i = 0; i < 6; i++)
      e.length = 6, e[i] *= 1;
  return a;
}
const Nf = "alert";
class tn {
  #e = new fe();
  #t = {};
  constructor(e) {
    if (L(e))
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
    if (L(e)) {
      let i = [];
      for (let s of e)
        i.push(this.add(s?.price, s?.condition, s?.handler));
      return i;
    } else return !1;
  }
  add(e, i, s) {
    if (isNaN(e) || !_(s)) return !1;
    const n = ae(Nf), r = { price: e, condition: i };
    if (this.list.has(r)) {
      let o = this.list.get(r);
      o[n] = s;
    } else {
      const o = {};
      o[n] = s, this.list.set(r, o);
    }
    return this.#t[n] = { alert: r, handler: s }, n;
  }
  remove(e) {
    if (!(e in this.#t)) return !1;
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
    if (!(e in this.#t)) return !1;
    this.#t[e];
  }
  handlerByID(e) {
    return e in this.#t ? this.#t[e].handler : !1;
  }
  check(e, i) {
    if (!(!L(e) || !L(i))) {
      for (let [s, n] of this.list)
        if (s.condition(s.price, e, i))
          for (let r in n)
            try {
              n[r](s.price, e, i);
            } catch (o) {
              console.error(o);
            }
    }
  }
}
const Rf = 0, kf = 1, $f = 2, Hf = 3, _f = 4, Bf = 5, Mi = [null, null, null, null, null], Li = {
  tfCountDown: !0,
  alerts: []
};
class st {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r = 0;
  #a;
  #o = Mi;
  #c = 0;
  #l = 0;
  #u = "";
  #h = !1;
  #d;
  #m;
  #f = Mi;
  #g;
  static validateConfig(e) {
    if (v(e)) {
      let i = re(Li);
      e = _e(i, e), e.tfCountDown = q(e.tfCountDown) ? e.tfCountDown : Li.tfCountDown, e.alerts = L(e.alerts) ? e.alerts : Li.alerts;
    } else
      return Li;
    return e;
  }
  constructor(e) {
    this.#e = e, this.#n = e.time, this.status = { status: oc }, this.#t = st.validateConfig(e.config?.stream), this.#s = P(e.config?.maxCandleUpdate) ? e.config.maxCandleUpdate : cc, this.#a = P(e.config?.streamPrecision) ? e.config.streamPrecision : uc;
  }
  get config() {
    return this.#t;
  }
  get countDownMS() {
    return this.#l;
  }
  get countDown() {
    return this.#u;
  }
  get range() {
    return this.#e.range;
  }
  get status() {
    return this.#i;
  }
  set status({ status: e, data: i }) {
    this.#i = e, this.emit(e, i);
  }
  set dataReceived(e) {
    this.#h || (this.#h = !0, this.status = { status: Nn, data: e });
  }
  get alerts() {
    return this.#g;
  }
  get lastPriceMin() {
    return this.#m;
  }
  set lastPriceMin(e) {
    P(e) && (this.#m = e);
  }
  get lastPriceMax() {
    return this.#d;
  }
  set lastPriceMax(e) {
    P(e) && (this.#d = e);
  }
  get lastTick() {
    return this.#f;
  }
  set lastTick(e) {
    L(e) && (this.#f, this.#f = e, this.alerts.check(e, this.#o));
  }
  set candle(e) {
    const i = Date.now(), s = [...this.#o];
    di(e.t) && (e.t = this.roundTime(new Date(e.t)), e.o = e.o * 1, e.h = e.h * 1, e.l = e.l * 1, e.c = e.c * 1, e.v = e.v * 1, this.#o[Rf] !== e.t ? this.newCandle(e) : this.updateCandle(e), this.status = { status: Di, data: this.#o }, this.lastTick = s, i - this.#r > this.#s && this.onUpdate(), this.#r = i);
  }
  get candle() {
    return this.#o !== Mi ? this.#o : null;
  }
  start() {
    this.#g instanceof tn || (this.#g = new tn(this.#t.alerts)), this.status = { status: Vr };
  }
  stop() {
    this.#g instanceof tn && this.#g.destroy(), this.status = { status: lc };
  }
  emit(e, i) {
    this.#e.emit(e, i);
  }
  error() {
    this.status = { status: hc };
  }
  onTick(e) {
    if ((this.#i == Vr || this.#i == Di) && v(e)) {
      if (!k(e.t * 1)) return;
      let i = Object.keys(e), s;
      for (let n of i) {
        if (s = e[n] * 1, !P(s)) return;
        e[n] = s;
      }
      this.candle = e;
    }
  }
  onUpdate() {
    this.#o !== Mi && (this.status = { status: rt, data: this.candle }, this.status = { status: Di, data: this.#o });
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
    ], this.#e.state.mergeData({ ohlcv: [this.#o] }, !0, !1), this.status = { status: Rn, data: { data: e, candle: this.#o } }, this.#l = this.#n.timeFrameMS, this.#c = this.roundTime(Date.now());
  }
  prevCandle() {
    const e = this.#e.allData.data;
    e.length > 0 && e[e.length - 1][7] && (e[e.length - 1].length = 6);
  }
  updateCandle(e) {
    let i = this.#o;
    i[kf] = e.o, i[$f] = e.h, i[Hf] = e.l, i[_f] = e.c, i[Bf] = e.v, this.#o = i;
    const s = this.#e.allData.data, n = s.length > 0 ? s.length - 1 : 0;
    s[n] = this.#o, this.countDownUpdate();
  }
  countDownUpdate() {
    let e, i, s, n, r, o, l;
    this.#n.timeFrameMS;
    let c = this.#n.timeFrameMS - (Date.now() - this.#c);
    return c < 0 && (c = 0), this.#l = c, c > Ne ? (e = String(Math.floor(c / Ne)), i = String(Math.floor(c % Ne / Ee)).padStart(2, "0"), this.#u = `${e}Y ${i}M`) : c > Ee ? (i = String(Math.floor(c / Ee)).padStart(2, "0"), n = String(Math.floor(c % Ee / G)).padStart(2, "0"), this.#u = `${i}M ${n}D`) : c > Rt ? (s = String(Math.floor(c / Rt)).padStart(2, "0"), n = String(Math.floor(c % Ee / G)).padStart(2, "0"), this.#u = `${s}W ${n}D`) : c > G ? (n = String(Math.floor(c / G)).padStart(2, "0"), r = String(Math.floor(c % G / pe)).padStart(2, "0"), o = String(Math.floor(c % pe / ne)).padStart(2, "0"), this.#u = `${n}D ${r}:${o}`) : c > pe ? (r = String(Math.floor(c / pe)).padStart(2, "0"), o = String(Math.floor(c % pe / ne)).padStart(2, "0"), l = String(Math.floor(c % ne / se)).padStart(2, "0"), this.#u = `${r}:${o}:${l}`) : c > ne ? (o = String(Math.floor(c / ne)).padStart(2, "0"), l = String(Math.floor(c % ne / se)).padStart(2, "0"), this.#u = `00:${o}:${l}`) : (l = String(Math.floor(c / se)).padStart(2, "0"), String(c % se).padStart(4, "0"), this.#u = `00:00:${l}`), this.#u;
  }
  roundTime(e) {
    return e - e % this.#e.timeData.timeFrameMS;
  }
}
class Ff {
  #e;
  #t;
  #i;
  #n = [];
  constructor(e, i) {
    this.#e = e, this.#t = T(i.id) ? i.id : ae, this.#i = T(i.type) ? i.type : "default", this.#n = L(i.data) ? i.data : [];
  }
}
class fs {
  #e;
  #t;
  #i;
  #n = {};
  #s;
  #r;
  #a = "stopped";
  #o;
  #c;
  #l;
  #u;
  #h = ["await", "idle", "running", "stopped"];
  constructor(e, i) {
    if (!fs.validateConfig(e)) return !1;
    const s = { ...e };
    this.id = s.id, this.#s = s, this.#t = s.initial, this.#n.origin = i, this.#u = s.actions, this.#r = i.core, this.#d();
  }
  set id(e) {
    this.#e = ot(e);
  }
  get id() {
    return this.#e;
  }
  get state() {
    return this.#t;
  }
  get previousSate() {
    return this.#i;
  }
  get context() {
    return this.#n;
  }
  get core() {
    return this.#r;
  }
  get status() {
    return this.#a;
  }
  get event() {
    return this.#c;
  }
  get events() {
    return this.#o;
  }
  get eventData() {
    return this.#l;
  }
  get actions() {
    return this.#u;
  }
  notify(e, i) {
    if (!v(this.#s)) return !1;
    this.#c = e, this.#l = i;
    const s = this.#s.states[this.#t];
    let n = s.on[e];
    if (!n || !_(n.action) || this.#a !== "running" && this.#a !== "await")
      return !1;
    let r = n?.condition?.type || n?.condition || !1;
    if (r && !this.condition.call(this, r, n.condition))
      return !1;
    const o = n.target, l = this.#s.states[o];
    if (s?.onExit.call(this, i), n.action.call(this, i), this.#i = this.#t, this.#t = o, l?.onEnter.call(this, i), this.#s.states[o]?.on && (this.#s.states[o].on[""] || this.#s.states[o].on?.always)) {
      const c = this.#s.states[o].on[""] || this.#s.states[o].on.always;
      if (L(c))
        for (let p of c) {
          let f = p?.condition?.type || p?.condition || !1;
          this.condition.call(this, f, p.condition) && T(p.target) && (p?.action.call(this, i), this.#i = this.#t, this.#t = p?.target, this.notify(null, null));
        }
      else if (v(c) && T(c.target)) {
        let p = c?.condition?.type || c?.condition || !1;
        this.condition.call(this, p, c.condition) && T(c.target) && (c?.action.call(this, i), this.#i = this.#t, this.#t = c.target, this.notify(null, null));
      }
    }
    return this.#t;
  }
  condition(e, i = null, s = {}) {
    return e ? this.#s.guards[e].call(this, this.#n, i, s) : !1;
  }
  canTransition(e) {
    const i = this.#s.states[this.#t];
    return e in i.on;
  }
  start() {
    this.#a = "running";
  }
  stop() {
    this.#a = "stopped";
  }
  destroy() {
    this.stop(), this.#m(), this.#s = null;
  }
  #d() {
    this.#o = /* @__PURE__ */ new Set();
    for (let e in this.#s.states)
      for (let i in this.#s.states[e].on) {
        let s = this.notify.bind(this, i);
        this.#o.add({ topic: i, cb: s }), this.#r.on(i, s, this.context);
      }
  }
  #m() {
    const e = this.#o?.values();
    if (e) {
      for (let i of e)
        this.#r.off(i.topic, i.cb, this.context);
      this.#o.clear();
    }
  }
  static validateConfig(e) {
    if (!v(e)) return !1;
    const i = ["id", "initial", "context", "states"];
    let s = Object.keys(e);
    if (!Wn(i, s) || !(e.initial in e.states)) return !1;
    for (let n in e.states) {
      if (!v(e.states[n]) || "onEnter" in e.states[n] && !_(e.states[n].onEnter) || "onExit" in e.states[n] && !_(e.states[n].onExit)) return !1;
      if ("on" in e.states[n])
        for (let r in e.states[n].on) {
          let o = e.states[n].on[r];
          if (!T(o.target) || "action" in o && !_(o.action)) return !1;
        }
    }
    return !0;
  }
}
class Uf {
  #e;
  #t;
  #i;
  #n;
  #s;
  constructor(e, i = []) {
    this.#i = e, this.#e = e.core, this.#n = new fe([...i]);
    for (const [s, n] of this.#n)
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
    return this.#i;
  }
  get layerConfig() {
    return this.#i.layerConfig().layerConfig;
  }
  get list() {
    return this.#n;
  }
  get scale() {
    return this.#i.parent.scale;
  }
  get time() {
    return this.#i.parent.time;
  }
  start() {
    this.eventsListen();
  }
  destroy() {
    if (this.#n.size != 0)
      for (let e of this.#n.keys())
        this.removeOverlay(e);
  }
  eventsListen() {
  }
  on(e, i, s = this) {
    this.#e.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#e.off(e, i, s);
  }
  emit(e, i) {
    this.#e.emit(e, i);
  }
  get(e) {
    return this.#n.get(e);
  }
  addOverlays(e) {
    let i = [], s, n;
    for (let r of e)
      n = this.addOverlay(r[0], r[1]), s = n.instance?.id || r[0], i.push([s, n]);
    return i;
  }
  addOverlay(e, i) {
    const s = new j.Layer(this.layerConfig);
    try {
      return this.parent.viewport.addLayer(s), i.layer = s, i.instance = new i.class(
        s,
        this.#i.Timeline,
        this.#i.Scale,
        this.#e.theme,
        this,
        i?.params
      ), T(i.instance?.id) || (i.instance.id = e), this.#n.set(i.instance.id, i), i;
    } catch (n) {
      return s.remove(), i.instance = void 0, this.#n.delete(e), this.#e.error(`ERROR: Cannot instantiate ${e} overlay / indicator : It will not be added to the chart.`), this.#e.error(n), !1;
    }
  }
  removeOverlay(e) {
    if (this.#n.has(e)) {
      const i = this.#n.get(e);
      i.instance?.isIndicator || i.instance.destroy(), i.layer.remove(), this.#n.delete(e);
    }
  }
}
class ts extends Q {
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.params.axes = o?.axes || "both";
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (!super.mustUpdate() || (e = e || this.params.axes, this.scene.clear(), e == "none")) return;
    const i = this.scene.context;
    if (i.save(), i.strokeStyle = this.core.theme.chart.GridColour || ml.COLOUR_GRID, e != "y") {
      const n = this.xAxis.xAxisGrads.values;
      for (let r of n) {
        let o = He(r[1]);
        i.beginPath(), i.moveTo(o + 0, 0), i.lineTo(o + 0, this.scene.height), i.stroke();
      }
    }
    if (e != "x") {
      const s = this.yAxis.yAxisGrads;
      for (let n of s) {
        let r = this.yAxis.yPos(n[0]);
        i.beginPath(), i.moveTo(0, r), i.lineTo(this.scene.width, r), i.stroke();
      }
    }
    i.restore(), super.updated();
  }
  drawX() {
    this.draw("x");
  }
}
class Mn extends Q {
  #e = [0, 0];
  #t = !0;
  #i;
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.core.on("main_mouseMove", this.onMouseMoveX, this), this.#i = new Ve(this.target.viewport.container, { disableContextMenu: !1 }), this.#i.on("pointermove", this.onMouseMove.bind(this)), this.#i.on("pointerenter", this.onMouseMove.bind(this));
  }
  set position(e) {
  }
  get update() {
    return this.#t;
  }
  get always() {
    return !0;
  }
  onMouseMoveX(e) {
    this.onMouseMove(e, !0);
  }
  onMouseMove(e, i = !1) {
    let s, n, r, o = this.#e;
    v(e) ? (s = e.timeStamp, n = Math.round(e.position.x), r = Math.round(e.position.y)) : (s = e[6], n = Math.round(e[0]), r = Math.round(e[1])), !(i && o[1] == r) && (o[0] == n && o[1] == r || (o[0] = n, o[1] = r, o[6] = s, this.draw()));
  }
  draw(e = !1) {
    const i = this.target.viewport.container.getBoundingClientRect();
    let s = this.core.mousePos.y - i.top, n = this.core.mousePos.x - i.left;
    e || (n = this.xAxis.xPosSnap2CandlePos(n) + this.xAxis.scrollOffsetPx), this.scene.clear();
    const r = this.scene.context;
    r.save(), r.setLineDash([5, 5]);
    const o = this.xAxis.smoothScrollOffset || 0;
    r.strokeStyle = "#666", r.beginPath(), r.moveTo(n + o, 0), r.lineTo(n + o, this.scene.height), r.stroke(), this.chart.cursorActive && (r.beginPath(), r.moveTo(0, s), r.lineTo(this.scene.width, s), r.stroke()), r.restore(), this.chart.scale.overlays.cursor.instance.scaleDraw();
  }
}
class th extends Q {
  #e = [0, 0];
  constructor(e, i, s, n, r, o) {
    r = s, s = s.yAxis, super(e, i, s, n, r, o), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
  }
  scaleDraw() {
    if (!this.parent.parent.cursorActive) return;
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
    }, o = r.fontSize + r.paddingTop + r.paddingBottom, l = i - o * 0.5;
    const c = this.scene.context;
    this.scene.clear(), c.save(), c.fillStyle = r.bakCol, c.fillRect(1, l, this.width, o), $t(c, `${n}`, 1, l, r), c.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
const zf = [
  ["grid", { class: ts, fixed: !0 }],
  ["cursor", { class: Mn, fixed: !0 }]
];
class ht {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #a;
  #o;
  #c;
  #l;
  constructor(e, i, s, n = !1) {
    this.#n = e, this.#e = e.core, this.#t = this.core.config, this.#i = this.core.theme, this.#a = this.#n.element, this.#c = i, this.createViewport(s, n);
  }
  get parent() {
    return this.#n;
  }
  get core() {
    return this.#e;
  }
  get config() {
    return this.#t;
  }
  get width() {
    return this.#a.width;
  }
  get height() {
    return this.#a.height;
  }
  get dimensions() {
    return this.#a.dimensions;
  }
  set layerWidth(e) {
    this.#l = e || this.#a.width;
  }
  get layerWidth() {
    return this.#l;
  }
  get stateMachine() {
    return this.#n.stateMachine;
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
  get Timeline() {
    return this.#e.Timeline;
  }
  get xAxis() {
    return this.#e.Timeline.xAxis;
  }
  get Scale() {
    return this.#n.scale;
  }
  get yAxis() {
    return this.#n.scale.yAxis;
  }
  get viewport() {
    return this.#s;
  }
  get overlays() {
    return this.#r;
  }
  destroy() {
    this.#r.destroy(), this.#s.destroy();
  }
  setSize(e, i, s) {
    const n = this.#r.list;
    this.#s.setSize(e, i);
    for (let [r, o] of n)
      o.instance.setSize(s, i);
    this.draw(), this.render();
  }
  createViewport(e = [], i = !1) {
    e = e.length == 0 ? re(zf) : e;
    const { width: s, height: n } = this.layerConfig();
    let r = i ? j.Node : j.Viewport;
    this.#s = new r({
      width: s,
      height: n,
      container: this.#c
    }), this.#o = this.#s.scene.canvas, this.#r = new Uf(this, e);
  }
  layerConfig() {
    const e = this.config?.buffer || ls, i = this.#c.getBoundingClientRect().width, s = this.#c.getBoundingClientRect().height;
    this.layerWidth = Math.round(i * ((100 + e) * 0.01));
    const n = {
      width: this.layerWidth,
      height: s
    };
    return { width: i, height: s, layerConfig: n };
  }
  addOverlays(e) {
    return this.#r.addOverlays(e);
  }
  addOverlay(e, i) {
    return this.#r.addOverlay(e, i);
  }
  removeOverlay(e) {
    return this.#r.removeOverlay(e);
  }
  draw(e = this.range, i = !1) {
    const s = (n, r) => {
      r.instance instanceof Q && (i && r.instance.setRefresh(), r.instance.draw(), r.fixed || (r.instance.position = [this.#e.scrollPos, 0]));
    };
    this.executeOverlayList(s);
  }
  drawAll() {
    const e = (i, s) => {
      s.instance instanceof Q && s.instance.setRefresh();
    };
    this.executeOverlayList(e);
  }
  executeOverlayList(e) {
    const i = this.#r.list;
    if (!(i instanceof fe)) return !1;
    let s = [];
    for (let [n, r] of i)
      try {
        e(n, r);
      } catch (o) {
        s.push({ overlay: n, error: o });
      }
    if (s.length > 0)
      for (let n of s)
        this.#e.error(`ERROR: executeOverlayList() ${n.overlay}`), this.#e.error(n.error);
    else s = !0;
    return s;
  }
  render() {
    this.#s.render();
  }
  refresh() {
    this.draw(this.range, !0), this.render();
  }
}
class Ct {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  constructor(e, i = {}) {
    this.#t = e, this.#i = { ...i }, this.#n = this.#i.parent;
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
  set id(e) {
    this.#e = ot(e);
  }
  get id() {
    return this.#e || `${this.#t.id}-${this.name}`;
  }
  get core() {
    return this.#t;
  }
  get options() {
    return this.#i;
  }
  get config() {
    return this.#t.config;
  }
  get theme() {
    return this.core.theme;
  }
  get range() {
    return this.core.range;
  }
  get parent() {
    return this.#n;
  }
  set stateMachine(e) {
    this.#s = new fs(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  set graph(e) {
    e instanceof ht && (this.#r = e);
  }
  get graph() {
    return this.#r;
  }
  on(e, i, s = this) {
    this.#t.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#t.off(e, i, s);
  }
  expunge(e = this) {
    this.#t.expunge(e);
  }
  emit(e, i) {
    this.#t.emit(e, i);
  }
}
const sn = {
  id: "time",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        resize: {
          target: "resize",
          action(a) {
          }
        },
        xAxis_scale: {
          target: "scale",
          action(a) {
          }
        },
        xAxis_inc: {
          target: "incremental",
          action(a) {
          }
        },
        xAxis_log: {
          target: "logarithmic",
          action(a) {
          }
        },
        xAxis_100: {
          target: "percentual",
          action(a) {
          }
        },
        chart_pan: {
          target: "chart_pan",
          action(a) {
          }
        }
      }
    },
    resize: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        someEvent: {
          target: "",
          action(a) {
          }
        }
      }
    },
    chart_pan: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        chart_pan: {
          target: "chart_pan",
          action(a) {
          }
        },
        chart_panDone: {
          target: "idle",
          action(a) {
          }
        }
      }
    }
  },
  guards: {}
};
class gr {
  static #e;
  #t;
  #i;
  #n;
  #s;
  #r = { w: 0, h: 0 };
  #a = { w: 0, h: 0, x: 0, y: 0 };
  #o = { x: !1, y: !0 };
  #c;
  #l = { x: 0, drag: !1 };
  #u;
  #h;
  constructor(e) {
    this.#t = gr.#e++, this.#i = e.core, this.#n = W(e.elContainer) ? e.elContainer : !1, this.#s = W(e.elHandle) ? e.elHandle : !1, this.#h = _(e.callback) ? e.callback : !1, W(this.#n) && W(this.#s) && (this.mount(), this.eventsListen());
  }
  set cursor(e) {
    this.#s.style.cursor = e;
  }
  get cursor() {
    return this.#s.style.cursor;
  }
  eventsListen() {
    this.#u = new Ve(this.#s, { disableContextMenu: !1 }), this.#u.on("mouseenter", Pe(this.onMouseEnter, 1, this, !0)), this.#u.on("mouseout", Pe(this.onMouseOut, 1, this, !0)), this.#u.on("drag", Uo(this.onHandleDrag, 100, this)), this.#u.on("enddrag", this.onHandleDragDone.bind(this)), this.#u.on("mousedown", Pe(this.onMouseDown, 100, this, !0)), this.#u.on("mouseup", this.onMouseUp.bind(this));
  }
  on(e, i, s = this) {
    this.#i.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#i.off(e, i, s);
  }
  emit(e, i) {
    this.#i.emit(e, i);
  }
  onMouseEnter() {
    const e = getComputedStyle(this.#s).backgroundColor;
    e && (this.colour = new lt(e), this.#s.style.backgroundColor = this.colour.hex);
  }
  onMouseOut() {
    this.#s.style.backgroundColor = this.colour.hexa;
  }
  onMouseDown() {
  }
  onMouseUp(e) {
    this.onHandleDragDone(e);
  }
  onHandleDrag(e) {
    this.#l.drag || (this.#l.drag = !0, this.#l.x = e.position.x), this.handlePos(e);
  }
  onHandleDragDone(e) {
    this.handlePos(e), this.#l.drag = !1;
  }
  mount() {
    this.#r.w = this.#n.getBoundingClientRect().width, this.#r.h = this.#n.getBoundingClientRect().height, this.#n.style.overflow = "hidden", this.#a.w = this.#s.getBoundingClientRect().width, this.#a.h = this.#s.getBoundingClientRect().height, this.#s.style.marginRight = 0, this.#s.style.position = "absolute";
  }
  handlePos(e) {
    let i = this.#i.range, s = parseInt(this.#s.style.marginLeft), n = this.#n.getBoundingClientRect().width, r = this.#s.getBoundingClientRect().width, o = n - r, l = e.position.x - this.#l.x, c = U(s + l, 0, o), p = (i.dataLength + i.limitFuture + i.limitPast) / n, f = Math.floor(c * p);
    this.setHandleDims(c, r), this.#i.jumpToIndex(f);
  }
  setHandleDims(e, i) {
    let s = this.#n.getBoundingClientRect().width;
    i = i || this.#s.getBoundingClientRect().width, e = e / s * 100, this.#s.style.marginLeft = `${e}%`, i = i / s * 100, this.#s.style.width = `${i}%`;
  }
}
class Vf extends Q {
  #e = [0, 0];
  #t;
  #i;
  constructor(e, i = !1, s = !1, n, r, o) {
    i = r.time.xAxis, super(e, i, s, n, r);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    const i = this.scene.context, s = this.xAxis.xAxisGrads.values, n = 0, r = this.theme.xAxis, o = q(r.tickMarker) ? r.tickMarker : !0;
    this.#i = this.#i || i.measureText("M").width, i.save(), i.strokeStyle = r.colourTick, i.fillStyle = r.colourTick, i.font = `${r.fontWeight} ${r.fontSize}px ${r.fontFamily}`;
    for (let l of s) {
      let c = l[1], p = Math.floor(l[0].length * this.#i * 0.5);
      i.fillText(l[0], c - p + n, this.xAxis.xAxisTicks + 12), o && (i.beginPath(), i.moveTo(c + n, 0), i.lineTo(c + n, this.xAxis.xAxisTicks), i.stroke());
    }
    i.restore(), super.updated();
  }
}
class Wf extends Q {
  #e = [0, 0];
  #t;
  constructor(e, i = !1, s = !1, n, r, o) {
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
class Gf extends Q {
  #e = [0, 0];
  #t;
  #i;
  constructor(e, i = !1, s = !1, n, r) {
    i = r.time.xAxis, super(e, i, s, n, r), this.viewport = e.viewport, this.#i = {
      fontSize: this.theme.xAxis.fontSize * 1.05,
      fontWeight: this.theme.xAxis.fontWeight,
      fontFamily: this.theme.xAxis.fontFamily,
      txtCol: this.theme.xAxis.colourCursor,
      bakCol: this.theme.xAxis.colourCursorBG,
      paddingTop: 5,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4
    };
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  dateUTCStringW() {
    if (!this.#t) {
      let e = this.scene.context, i = "Wed, 28 Aug 2024 20:00:00 GMT";
      this.#t = us(e, i, this.#i);
    }
    return this.#t;
  }
  draw() {
    const e = this.scene.context, i = this.target.viewport.container.getBoundingClientRect(), s = this.core.mousePos.x - i.left;
    let n = this.xAxis.xPos2Time(s), r = new Date(n), o = r.toUTCString(), l = this.dateUTCStringW(), c = s + this.core.bufferPx;
    c = this.xAxis.xPosSnap2CandlePos(c), c = c - Math.round(l * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), e.save(), $t(e, o, c, 1, this.#i), e.restore();
  }
}
const qf = [
  ["labels", { class: Vf, fixed: !1, required: !0 }],
  ["overlay", { class: Wf, fixed: !1, required: !0 }],
  ["cursor", { class: Gf, fixed: !1, required: !0 }]
];
class jf extends Ct {
  #e = "Timeline";
  #t = "time";
  #i;
  #n;
  #s;
  #r;
  #a;
  #o;
  #c;
  #l;
  #u;
  #h;
  #d;
  #m;
  #f = new fe();
  #g = [];
  #T;
  #v;
  #w;
  #x;
  #p;
  #S;
  #y;
  #E;
  #C;
  #b = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #P = { end: !1, start: !1 };
  constructor(e, i) {
    super(e, i), this.#r = i.elements.elTime, this.#i = e.Chart, this.#n = new Ui(this), this.init();
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get element() {
    return this.#r;
  }
  get elViewport() {
    return this.#a;
  }
  get height() {
    return this.#r.height;
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#r.width;
  }
  get xAxis() {
    return this.#n;
  }
  get xAxisWidth() {
    return this.#n.width;
  }
  get xAxisRatio() {
    return this.#n.xAxisRatio;
  }
  get layerCursor() {
    return this.#x;
  }
  get layerLabels() {
    return this.#v;
  }
  get layerOverlays() {
    return this.#w;
  }
  get overlays() {
    return Object.fromEntries([...this.graph.overlays.list]);
  }
  get xAxisGrads() {
    return this.#n.xAxisGrads;
  }
  get candleW() {
    return this.#n.candleW;
  }
  get candlesOnLayer() {
    return this.#n.candlesOnLayer;
  }
  get navigation() {
    return this.#T;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ve(this.#r);
  }
  get bufferPx() {
    return this.core.bufferPx;
  }
  get scrollPos() {
    return this.core.scrollPos;
  }
  get scrollOffsetPx() {
    return this.core.scrollPos % this.candleW;
  }
  get smoothScrollOffset() {
    return this.core.smoothScrollOffset;
  }
  get rangeScrollOffset() {
    return this.core.rangeScrollOffset;
  }
  get time() {
    return this;
  }
  init() {
    const e = this.#r;
    this.#a = e.viewport, this.#o = e.overview, this.#c = e.overview.icons, this.#l = e.overview.scrollBar, this.#u = e.overview.handle, this.#h = e.overview.rwdStart, this.#d = e.overview.fwdEnd;
    const i = {
      core: this.core,
      elContainer: this.#l,
      elHandle: this.#u,
      callback: null
    };
    this.#C = new gr(i), this.core.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(e) {
    this.#r.style.width = `${e}px`, this.#a.style.width = `${e}px`;
  }
  setDimensions(e) {
    const i = this.config.buffer || ls, s = e.w, n = this.height, r = Math.round(s * ((100 + i) * 0.01));
    this.graph.setSize(s, n, r), this.draw();
  }
  navigationDisplay(e) {
    if (e)
      this.#d.style["margin-top"] = 0, this.#h.style["margin-top"] = 0;
    else {
      const i = this.core.theme.xAxis?.background ? this.core.theme.xAxis.Background : this.core.theme.chart.Background;
      this.#o.style.visibility = "hidden", this.#d.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#h.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#d.style.background = this.core.theme.chart.Background, this.#h.style.background = i;
    }
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#n.initXAxisGrads(), this.draw(), this.eventsListen(), sn.id = this.id, sn.context = this, this.stateMachine = sn, this.stateMachine.start(), this.log(`Timeline ${this.#e} instantiated and running`);
  }
  destroy() {
    this.stateMachine.destroy(), this.#p.destroy(), this.#S.destroy(), this.#y.destroy(), this.core.hub.expunge(this), this.off("main_mouseMove", this.#x.draw, this.#x), this.#d.removeEventListener("click", Pe), this.#h.removeEventListener("click", Pe), this.graph.destroy();
  }
  eventsListen() {
    this.#p = new Ve(this.#a, { disableContextMenu: !1 }), this.#p.on("dblclick", this.onDoubleClick.bind(this)), this.#p.on("pointerover", this.onPointerEnter.bind(this)), this.#p.on("pointerout", this.onPointerLeave.bind(this)), this.#p.on("pointerdrag", this.onPointerDrag.bind(this)), this.#S = new Ve(this.#d, { disableContextMenu: !1 }), this.#S.on("pointerover", () => this.showJump(this.#P.end)), this.#S.on("pointerleave", () => this.hideJump(this.#P.end)), this.#y = new Ve(this.#h, { disableContextMenu: !1 }), this.#y.on("pointerover", () => this.showJump(this.#P.start)), this.#y.on("pointerleave", () => this.hideJump(this.#P.start)), this.on("main_mouseMove", this.#x.draw, this.#x), this.on("range_set", this.onSetRange, this), this.#d.addEventListener("click", Pe(this.onPointerClick, 1e3, this, !0)), this.#h.addEventListener("click", Pe(this.onPointerClick, 1e3, this, !0));
  }
  onPointerClick(e) {
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
    e.domEvent.target.style.cursor = "ew-resize", this.#o.style.visibility = "visible", this.hideCursorTime();
  }
  onPointerLeave(e) {
    this.core.theme?.time?.navigation === !1 && !(this.#P.end && this.#P.start) && (this.#o.style.visibility = "hidden");
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
    let s = this.#l.getBoundingClientRect().width, n = e.dataLength + e.limitFuture + e.limitPast, r = s / n, o = e.Length * r, l = (i + e.limitPast) * r;
    this.#C.setHandleDims(l, o);
  }
  t2Index(e) {
    return this.#n.t2Index(e);
  }
  xPos(e) {
    return this.#n.xPos(e);
  }
  xPosSnap2CandlePos(e) {
    return this.#n.xPosSnap2CandlePos(e);
  }
  xPos2Time(e) {
    return this.#n.xPos2Time(e);
  }
  xPos2Index(e) {
    return this.#n.xPos2Index(e);
  }
  xPosOHLCV(e) {
    return this.#n.xPosOHLCV(e);
  }
  createGraph() {
    let e = re(qf);
    this.graph = new ht(this, this.#a, e, !1), this.#x = this.graph.overlays.get("cursor").instance, this.#v = this.graph.overlays.get("labels").instance, this.#w = this.graph.overlays.get("overlay").instance, this.graph.addOverlays(this.#g);
  }
  addOverlays(e) {
    if (!L(e)) return !1;
    this.graph === void 0 ? this.#g.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!v(i)) return !1;
    if (this.graph === void 0)
      this.#g.push([e, i]);
    else
      return this.graph.addOverlay(e, i);
  }
  render() {
    this.graph.render();
  }
  draw(e = this.range, i = !0) {
    this.graph.draw(e, i);
  }
  hideCursorTime() {
    this.graph.overlays.list.get("cursor").layer.visible = !1, this.core.MainPane.draw();
  }
  showCursorTime() {
    this.graph.overlays.list.get("cursor").layer.visible = !0, this.core.MainPane.draw();
  }
  hideJump(e) {
    this.core.theme?.time?.navigation === !1 && (this.#o.style.visibility = "hidden");
  }
  showJump(e) {
    this.#o.style.visibility = "visible", this.hideCursorTime();
  }
}
const Xf = {
  renderQ: new fe(),
  rendered: [],
  renderLog: !1,
  dropFrames: !0,
  graphs: [],
  range: {},
  status: !1,
  init: function(a) {
    v(a) && (this.renderLog = a?.renderLog || !1, this.dropFrames = a?.dropFrames || !0, this.graphs = L(a?.graphs) ? [...a.graphs] : [], this.range = v(a?.range) ? a.range : {});
  },
  queueFrame: function(a = this.range, e = this.graphs, i = !1) {
    this.renderQ.size > 1 && this.dropFrames && (i = this.dropFrame() || i);
    const s = Date.now();
    return a = a.snapshot(), this.renderQ.set(s, { graphs: e, range: a, update: i }), s;
  },
  dropFrame: function(a = -1) {
    let e = !1;
    return a === -1 && (a = this.renderQ.lastKey()), this.renderQ.size > 1 && this.renderQ.has(a) && (e = a.update, this.renderQ.delete(a)), e;
  },
  expungeFrames() {
    this.renderQ.clear();
  },
  getFrame: function(a = 0) {
    return this.renderQ.has(a) ? this.renderQ.get(a) : this.renderQ.firstValue();
  },
  frameDone: function() {
    if (this.renderQ.size === 0) return;
    const a = this.renderQ.firstKey();
    this.renderLog && this.rendered.push([a, Date.now()]), this.renderQ.delete(a);
  },
  start: function() {
    this.status = !0, requestAnimationFrame(this.execute.bind(this));
  },
  stop: function() {
    this.status = !1, this.renderQ.clear();
  },
  execute: function() {
    if (!this.status || (requestAnimationFrame(this.execute.bind(this)), this.renderQ.size === 0)) return;
    const [a, e] = this.renderQ.firstEntry();
    if (e.range?.snapshot) {
      for (let i of e.graphs)
        _(i.draw) && i?.status !== "destroyed" && i.draw(e.range, e.update);
      for (let i of e.graphs)
        _(i.render) && i?.status !== "destroyed" && i.render();
      this.frameDone();
    }
  }
}, Ja = [
  "-webkit-touch-callout",
  "-webkit-user-select",
  "-khtml-user-select",
  "-moz-user-select",
  "-ms-user-select",
  "user-select"
];
class Yf {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #a;
  #o = [];
  #c;
  #l = {};
  #u;
  #h;
  #d = null;
  constructor(e, i) {
    this.#e = e, this.#t = i, this.#i = i.core, this.#n = i.core.theme.legend, this.init(), this.eventsListen();
  }
  get elTarget() {
    return this.#e;
  }
  get list() {
    return this.#l;
  }
  set collapse(e) {
    this.setCollapse(e);
  }
  get collapse() {
    return this.#a;
  }
  get visible() {
    return this.getVisible();
  }
  getVisible() {
    const e = getComputedStyle(this.#e);
    return e.display && e.visibility;
  }
  destroy() {
    this.#i.hub.expunge(this);
    for (let e in this.#l)
      e !== "collapse" && this.remove(e);
    this.#e.remove();
  }
  eventsListen() {
    this.#i.on("chart_pan", this.primaryPanePan, this), this.#i.on("chart_panDone", this.primaryPanePanDone, this);
  }
  init() {
    const e = this.#e.legends;
    this.#r = e.querySelector(".controls"), this.#a = e.querySelectorAll(".control"), this.#u = e.querySelector("#showLegends"), this.#h = e.querySelector("#hideLegends"), this.#r.style.display = "none", this.icons(this.#a, { id: "collapse", parent: this }), this.#e.legends.classList.add("hide"), this.#d = "hide", this.collapse = "show";
  }
  onPointerClick(e) {
    const i = (s) => T(s.dataset.icon) ? { id: s.id, icon: s.dataset.icon, parent: s.parentElement } : s.parentElement.className !== "controls" ? i(s.parentElement) : !1;
    return i(e);
  }
  onMouseOver(e) {
  }
  onLegendAction(e) {
    const i = this.onPointerClick(e.currentTarget);
    this.setCollapse(i.icon);
  }
  setCollapse(e) {
    e === "show" && this.#d !== "show" ? (this.#d = e, this.#u.style.display = "none", this.#h.style.display = "inline-block", this.#e.legends.classList.toggle("hide")) : e === "hide" && this.#d !== "hide" && (this.#d = e, this.#u.style.display = "inline-block", this.#h.style.display = "none", this.#e.legends.classList.toggle("hide"));
  }
  primaryPanePan() {
    for (let e of Ja)
      this.#e.style.setProperty(e, "none");
  }
  primaryPanePanDone() {
    for (let e of Ja)
      this.#e.style.removeProperty(e);
  }
  add(e) {
    if (!v(e)) return !1;
    const i = () => {
      this.#i.error("ERROR: Legend parent missing!");
    };
    e.id = e?.id || ae("legend"), e.type = e?.type || "overlay", e.title = e?.title || e?.parent.legendName, e.parent = e?.parent || i, e.visible = q(e?.visible) ? e.visible : !0;
    const s = this.elTarget.buildLegend(e, this.#i.theme);
    this.#e.legends.insertAdjacentHTML("beforeend", s);
    const n = this.#e.legends.querySelector(`#legend_${e.id}`);
    return this.#c = n.querySelectorAll(".control"), this.#l[e.id] = {
      el: n,
      type: e.type,
      source: e?.source,
      click: []
    }, this.icons(this.#c, e), e.type == "indicator" && (this.#r.style.display = "block", !e.parent.primaryPane && Object.keys(this.#l).length < 3 && (this.#r.style.display = "none")), n.style.display = e.visible ? "block" : "none", e.id;
  }
  remove(e) {
    if (!(e in this.#l) || this.#l[e].type === "chart") return !1;
    this.#l[e].el.remove();
    for (let i of this.#l[e].click)
      i.el.removeEventListener("click", i.click);
    return delete this.#l[e], Object.keys(this.#l).length < 2 && (this.#r.style.display = "none"), !0;
  }
  update(e, i) {
    if (!v(i) || !(e in this.#l) || this.#i.range.data.length == 0) return !1;
    let s = this.#l[e].source(i.pos);
    const n = this.#e.buildInputs(s);
    this.#e.legends.querySelector(`#legend_${e} dl`).innerHTML = n;
  }
  modify(e, i) {
    if (!(e in this.#l) || !v(i)) return !1;
    const s = this.#l[e].el;
    for (let n in i)
      switch (n) {
        case "legendName":
          const r = s.querySelectorAll(".title");
          return r[0].innerHTML = i[n], r[1].innerHTML = i[n], !0;
        case "legendVisibility":
          const o = i[n] ? "block" : "none", l = i[n] ? "visible" : "hidden";
          return s.style.display = o, s.style.visibility = l, !0;
      }
  }
  icons(e, i) {
    let s;
    for (let n of e) {
      let r = n.querySelector("svg");
      r.style.width = `${this.#n.controlsW}px`, r.style.height = `${this.#n.controlsH}px`, r.style.fill = `${this.#n.controlsColour}`, r.onpointerover = (o) => o.currentTarget.style.fill = this.#n.controlsOver, r.onpointerout = (o) => o.currentTarget.style.fill = this.#n.controlsColour, s = i.parent.onLegendAction.bind(i.parent), i.id === "collapse" ? this.#o.push({ el: n, click: s }) : this.#l[i.id].click.push({ el: n, click: s }), n.addEventListener("click", Pe(s, 1e3, this, !0));
    }
  }
}
const nn = {
  id: "chart",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(a) {
        this.context.origin.cursor = "crosshair";
      },
      onExit(a) {
      },
      on: {
        xAxis_scale: {
          target: "xAxis_scale",
          action(a) {
          }
        },
        chart_yAxisRedraw: {
          target: "chart_yAxisRedraw",
          action(a) {
          }
        },
        chart_tool: {
          target: "chart_tool",
          action(a) {
          }
        },
        tool_activated: {
          target: "tool_activated",
          action(a) {
            this.context.origin.cursor = "default";
          }
        }
      }
    },
    xAxis_scale: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        Idle: {
          target: "idle",
          action(a) {
          }
        }
      }
    },
    chart_yAxisRedraw: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        always: {
          target: "idle",
          condition: "yAxisRedraw",
          action(a) {
            this.context.origin.drawGrid();
          }
        }
      }
    },
    tool_activated: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        tool_targetSelected: {
          target: "idle",
          condition: "toolSelectedThis",
          action(a) {
            console.log("tool_targetSelected:", a);
          }
        }
      }
    }
  },
  guards: {
    priceMaxMin() {
      return !0;
    },
    toolSelectedThis(a, e) {
      return this.eventData === this.context;
    },
    yAxisRedraw() {
      return !0;
    },
    zoomDone() {
      return !0;
    }
  }
}, Kf = {
  id: "scale",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(a) {
        this.context.origin.cursor = "ns-resize";
      },
      onExit(a) {
      },
      on: {
        resize: {
          target: "resize",
          action(a) {
          }
        },
        yAxis_scale: {
          target: "scale",
          action(a) {
          }
        },
        yAxis_inc: {
          target: "incremental",
          action(a) {
          }
        },
        yAxis_log: {
          target: "logarithmic",
          action(a) {
          }
        },
        yAxis_100: {
          target: "percentual",
          action(a) {
          }
        },
        setRange: {
          target: "setRange",
          action(a) {
          }
        }
      }
    },
    resize: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        someEvent: {
          target: "",
          action(a) {
          }
        }
      }
    },
    setRange: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        always: {
          target: "idle",
          condition: "zoomDone",
          action(a) {
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
class Zf extends Q {
  constructor(e, i, s, n, r, o) {
    r = s, s = s.yAxis, super(e, i, s, n, r, o), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get always() {
    return !0;
  }
  draw() {
    if (!super.mustUpdate()) return;
    const e = this.scene.context, i = this.yAxis, s = i.yAxisGrads || [], n = this.theme.yAxis, r = q(n.tickMarker) ? n.tickMarker : !0;
    let o = [], l;
    switch (n?.location) {
      case "left":
        o = [this.width, this.width - i.yAxisTicks];
        break;
      case "right":
      default:
        o = [1, i.yAxisTicks];
        break;
    }
    this.scene.clear(), e.save(), e.strokeStyle = n.colourTick, e.fillStyle = n.colourTick, e.font = `${n.fontWeight} ${n.fontSize}px ${n.fontFamily}`;
    for (let c of s)
      l = i.yPos(c[0]), e.fillText(c[0], i.yAxisTicks + 5, l + n.fontSize * 0.3), r && (e.beginPath(), e.moveTo(o[0], l), e.lineTo(o[1], l), e.stroke());
    e.restore(), super.updated();
  }
}
class Qf extends Q {
  constructor(e, i, s, n, r, o) {
    r = s, s = s.yAxis, super(e, i, s, n, r, o), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context;
    this.yAxis.yAxis, this.scene.clear(), e.save(), e.restore();
  }
}
class Jf extends Q {
  #e;
  #t;
  constructor(e, i, s, n, r, o) {
    r = s, s = s.yAxis, super(e, i, s, n, r, o), this.viewport = e.viewport, this.#e = {
      fontSize: Ie.FONTSIZE * 1.05,
      fontWeight: Ie.FONTWEIGHT,
      fontFamily: Ie.FONTFAMILY,
      txtCol: "#FFFFFF",
      bakCol: Ie.COLOUR_CURSOR_BG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 3,
      width: this.viewport.width
    }, this.#t = ds(this.#e);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (e === void 0 || !this.parent.parent.isPrimary)
      return;
    const i = this.scene.context, s = this.core.stream instanceof st && this.config.stream.tfCountDown;
    let n = e[4], r = this.parent.nicePrice(n), o = { ...this.#e }, l = 0, c = this.#t, p = this.parent.yPos(n) - c * 0.5;
    this.scene.clear(), i.save(), e[4] >= e[1] ? o.bakCol = this.theme.candle.UpBodyColour : o.bakCol = this.theme.candle.DnBodyColour, $t(i, r, l, p, o), s && (r = this.core.stream.countDownUpdate(), o.fontSize = o?.fontSize / 1.1, $t(i, r, l, p + c, o)), i.restore(), this.viewport.render();
  }
}
const eg = [
  ["labels", { class: Zf, fixed: !0, required: !0 }],
  ["overlay", { class: Qf, fixed: !0, required: !0 }],
  ["price", { class: Jf, fixed: !0, required: !0 }],
  ["cursor", { class: th, fixed: !0, required: !0 }]
];
class tg extends Ct {
  #e = "Y Scale Axis";
  #t = "scale";
  #i;
  #n;
  #s;
  #r;
  #a;
  #o;
  #c;
  #l;
  #u;
  #h = new fe();
  #d = [];
  #m;
  #f = 12;
  #g;
  #T;
  #v;
  #w = {};
  constructor(e, i) {
    super(e, i), this.#r = this.options.elScale, this.#i = this.options.chart, this.id = `${this.parent.id}_scale`, this.#a = this.#r.viewport || this.#r;
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get height() {
    return this.#r.getBoundingClientRect().height;
  }
  get width() {
    return this.#r.getBoundingClientRect().width;
  }
  get element() {
    return this.#r;
  }
  set cursor(e) {
    this.#r.style.cursor = e;
  }
  get cursor() {
    return this.#r.style.cursor;
  }
  get layerCursor() {
    return this.#u;
  }
  get layerLabels() {
    return this.#o;
  }
  get layerOverlays() {
    return this.#c;
  }
  get layerPriceLine() {
    return this.#l;
  }
  get overlays() {
    return Object.fromEntries([...this.graph.overlays.list]);
  }
  get yAxis() {
    return this.#s;
  }
  set yAxisType(e) {
    this.#s.yAxisType = R.valid(e);
  }
  get yAxisType() {
    return this.#s.yAxisType;
  }
  get yAxisHeight() {
    return this.#s.height;
  }
  get yAxisRatio() {
    return this.#s.yAxisRatio;
  }
  get yAxisGrads() {
    return this.#s.yAxisGrads;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ve(this.#r);
  }
  get digitCnt() {
    return this.#m;
  }
  set scaleRange(e) {
    this.setScaleRange(e);
  }
  get range() {
    return this.#s.range;
  }
  set rangeMode(e) {
    this.#s.mode = e;
  }
  get rangeMode() {
    return this.#s.mode;
  }
  set rangeYFactor(e) {
    this.core.range.yFactor(e);
  }
  set yOffset(e) {
    this.#s.offset = e;
  }
  get yOffset() {
    return this.#s.offset;
  }
  get scale() {
    return this;
  }
  get Scale() {
    return this;
  }
  start() {
    const e = this.core.MainPane.graph.viewport.scene.context, i = this.theme.yAxis;
    this.setYAxis(), e.font = Ht(i.fontSize, i.fontWeight, i.fontFamily), this.#f = ar(e, "0"), this.calcPriceDigits(), this.setDimensions({ w: this.#f * this.#m }), this.createGraph(), this.#s.calcGradations(), this.draw(), this.eventsListen();
    const s = re(Kf);
    s.id = this.id, s.context = this, this.stateMachine = s, this.stateMachine.start();
  }
  destroy(e = !0) {
    this.core.hub.expunge(this), this.off(`${this.parent.id}_pointerout`, this.#u.erase, this.#u), this.off(rt, this.onStreamUpdate, this.#l), this.graph.destroy(), this.#g.destroy(), e && (this.stateMachine.destroy(), this.element.remove());
  }
  eventsListen() {
    let e = this.graph.viewport.scene.canvas;
    this.#g = new Ve(e, { disableContextMenu: !1 }), this.#g.setCursor("ns-resize"), this.#g.on("pointerdrag", this.onDrag.bind(this)), this.#g.on("pointerdragend", this.onDragDone.bind(this)), this.#g.on("wheel", this.onMouseWheel.bind(this)), this.#g.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.parent.id}_pointermove`, this.onMouseMove, this), this.on(`${this.parent.id}_pointerout`, this.#u.erase, this.#u), this.on(rt, this.onStreamUpdate, this), this.on("range_set", this.draw, this);
  }
  onResize(e) {
    this.setDimensions(e);
  }
  onMouseMove(e) {
    this.#v = L(e) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)], this.#u.draw(this.#v);
  }
  onDrag(e) {
    this.#v = [
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
    e.domEvent.preventDefault(), this.setScaleRange(Math.sign(e.wheeldelta) * -2);
  }
  onStreamUpdate(e) {
    let i = !1;
    if (this.#s.mode == "manual")
      if (this.parent.isPrimary)
        e[4] > this.range.max && (this.range.max = e[4], i = !0), e[4] < this.range.min && (this.range.max = e[4], i = !0);
      else {
        let s = this.parent, n = this.core.range, r = s.view[0].id, o = this.core.range.secondaryMaxMin?.[r]?.data;
        o && (n.value(void 0, r).forEach((c, p, f) => {
          p != 0 && (c > o.max ? o.max = c : c < o.min && (o.min = c));
        }), i = !0);
      }
    i ? this.draw() : this.#l.draw();
  }
  onChartDrag(e) {
    this.#s.mode === "manual" && (this.#s.offset = e.domEvent.srcEvent.movementY, this.draw());
  }
  #x(e) {
    this.#r.style.height = `${e}px`;
  }
  #p(e) {
    this.#r.style.width = `${e}px`;
  }
  setDimensions(e = {}) {
    e = v(e) ? e : {};
    const i = e?.w || this.width || Et * Ie.FONTSIZE, s = e?.h || this.parent.height;
    this.#p(i), this.#x(s), this.graph instanceof ht && (this.graph.setSize(i, s, i), this.draw()), this.#u instanceof th && this.calcPriceDigits();
  }
  setYAxis() {
    const e = this.options.yAxisType === R.default ? void 0 : this.parent.localRange;
    this.#s = new ii(this, this, this.options.yAxisType, e), this.#s.yAxisPadding = P(this.options?.yAxisPadding) && this.options.yAxisPadding >= 1 ? this.options.yAxisPadding : 1;
  }
  setScaleRange(e = 0) {
    this.#s.mode == "automatic" && (this.#s.mode = "manual"), this.#s.zoom = e, this.draw(this.range, !0), this.core.MainPane.draw();
  }
  resetScaleRange() {
    this.#s.mode = "automatic", this.draw(this.range, !0), this.core.MainPane.draw();
  }
  yPos(e) {
    return this.#s.yPos(e);
  }
  yPosStream(e) {
    return this.#s.lastYData2Pixel(y);
  }
  yPos2Price(e) {
    return this.#s.yPos2Price(e);
  }
  nicePrice(e, i) {
    return pn(e, i);
  }
  createGraph() {
    let e = re(eg);
    this.graph = new ht(this, this.#a, e, !1), this.#u = this.graph.overlays.get("cursor").instance, this.#o = this.graph.overlays.get("labels").instance, this.#c = this.graph.overlays.get("overlay").instance, this.#l = this.graph.overlays.get("price").instance, this.graph.addOverlays(this.#d), this.#l.target.moveTop(), this.#u.target.moveTop(), this.calcPriceDigits();
  }
  calcPriceDigits() {
    let e = Et, i = "0";
    if (this.core.range.dataLength > 0 && this.#s instanceof ii) {
      if (this.#i.isPrimary)
        i = this.niceValue(this.range.valueMax);
      else
        for (let s in this.#i.indicators) {
          let n = this.range.secondaryMaxMin?.[s]?.data?.max || Et, r = this.niceValue(n);
          r.length > i.length && (i = r);
        }
      e = `${i}`.length + 2 || Et;
    }
    return this.#m = e < Et ? Et : e, this.#m;
  }
  niceValue(e) {
    const i = this.#s.niceNumber(e);
    let s = pn(i, this.core.pricePrecision);
    return s = s.match(/^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/)[1], s;
  }
  calcScaleWidth() {
    return this.calcPriceDigits() * this.#f;
  }
  addOverlays(e) {
    if (!L(e)) return !1;
    this.graph === void 0 ? this.#d.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!v(i)) return !1;
    if (this.graph === void 0)
      this.#d.push([e, i]);
    else {
      let s = this.graph.addOverlay(e, i);
      return this.#l.target.moveTop(), this.#u.target.moveTop(), s;
    }
  }
  render() {
    this.graph.render();
  }
  draw(e = this.range, i = !0) {
    this.#s.calcGradations(), this.graph.draw(e, i), this.parent.drawGrid(i), this.parent.draw(e, !0);
  }
  resize(e = this.width, i = this.height) {
    this.setDimensions({ w: e, h: i });
  }
}
class ig extends Q {
  watermark = {};
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.params.content = o?.content || "";
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw() {
    const e = this.config?.watermark;
    if (super.mustUpdate(), e?.display !== !1) {
      if (e?.imgURL)
        this.watermark.imgURL = e.imgURL, _n(e?.imgURL, this.renderImage.bind(this));
      else if (T(e?.text)) {
        this.watermark.text = e.text, this.scene.clear();
        const i = this.scene.context;
        i.save(), this.renderText(e.text), i.restore();
      } else return;
      super.updated();
    }
  }
  renderText(e) {
    const i = Math.floor(this.core.height / et), s = this.core.config?.watermark?.fontSize, n = this.core.config?.watermark?.fontWeight, r = this.core.config?.watermark?.fontFamily, o = this.core.config?.watermark?.textColour, l = {
      fontSize: (s || this.theme.watermark.FONTSIZE) * i,
      fontWeight: n || this.theme.watermark.FONTWEIGHT,
      fontFamily: r || this.theme.watermark.FONTFAMILY,
      txtCol: o || this.theme.watermark.COLOUR
    }, c = this.scene.context;
    c.font = Ht(l?.fontSize, l?.fontWeight, l?.fontFamily), c.textBaseline = "top", c.fillStyle = l.txtCol;
    const p = ds(l), f = us(c, e, l), b = (this.scene.width - f) / 2, E = (this.core.Chart.height - p) / 2;
    c.fillText(e, b, E);
  }
  renderImage(e) {
    if (!e) return;
    const i = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT, s = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH, n = (this.scene.width - s) / 2, r = (this.scene.height - i) / 2;
    this.scene.clear();
    const o = this.scene.context;
    o.save(), Ol(o, e, n, r, i, s), o.restore();
  }
}
class sg extends Q {
  #e;
  #t;
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.#e = new Jl(e.scene, n), this.theme.volume.Height = U(n?.volume?.Height, 0, 100) || 100;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e = this.core.range) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    const i = e.data, s = this.scene.height, n = this.xAxis.smoothScrollOffset || 0;
    let r = Math.max(this.xAxis.candleW - 1, 1);
    r = ps(r);
    const o = {
      x: 0 + n - this.xAxis.candleW,
      w: r,
      z: s
    }, l = Math.floor(s * this.theme.volume.Height / 100);
    let c = this.core.rangeScrollOffset, p = e.indexStart - c, f = e.Length + c * 2, b = f, E = p, M, D = 0;
    for (; b--; )
      M = e.value(E), M[4] !== null && (D = M[5] > D ? M[5] : D), E++;
    for (; f--; )
      M = e.value(p), o.x = He(this.xAxis.xPos(M[0]) - r / 2), M[4] !== null && (o.h = l - l * ((D - M[5]) / D), o.raw = i[p], this.#e.draw(o)), p++;
    super.updated();
  }
}
class ih extends Q {
  #e;
  constructor(e, i = !1, s = !1, n, r) {
    super(e, i, s, n, r), this.#e = new Nl(e.scene, n);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e = this.core.range) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    let i, s = this.theme.candle.Type;
    switch (s) {
      case me.AREA:
      case me.LINE:
        i = (f) => {
          this.#e.area({ ...f });
        };
        break;
      default:
        i = (f) => {
          this.#e.draw(f);
        };
        break;
    }
    const r = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let o = this.core.rangeScrollOffset, l = e.indexStart - o, c = e.Length + o * 2, p;
    for (this.core.stream && (this.core.stream.lastPriceMax = e.valueMax, this.core.stream.lastPriceMin = e.valueMin); c; ) {
      if (l >= 0) {
        if (p = e.value(l), r.x = this.xAxis.xPos(p[0]), p?.[7]) {
          this.core.stream.lastXPos = r.x, this.core.stream.lastYPos = { ...r };
          break;
        }
        p[4] !== null && (r.o = this.yAxis.yPos(p[1]), r.h = this.yAxis.yPos(p[2]), r.l = this.yAxis.yPos(p[3]), r.c = this.yAxis.yPos(p[4]), r.raw = p, i(r));
      }
      l++, c--;
    }
    (s === me.AREA || s === me.LINE) && this.#e.areaRender(), super.updated();
  }
}
class ng extends Q {
  #e;
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.#e = new Nl(e.scene, n), this.theme.priceLineStyle = this.theme?.priceLineStyle || qd;
  }
  set position(e) {
    this.setPosition(e[0], e[1]);
  }
  setPosition(e, i) {
    this.core.stream !== void 0 && (this.target.setPosition(e, i), this.core.stream.lastScrollPos = this.core.scrollPos);
  }
  draw() {
    if (this.core.stream === void 0 || !L(this.chart.streamCandle)) return;
    this.scene.clear();
    const e = this.core.range, i = this.chart.streamCandle, s = this.theme.candle.Type === me.AREA || this.theme.candle.Type === me.LINE ? (o) => {
      this.areaRender(o);
    } : (o) => {
      this.#e.draw(o);
    };
    this.xAxis.smoothScrollOffset;
    const r = {
      x: this.core.stream.lastXPos,
      w: this.xAxis.candleW
    };
    r.o = this.yAxis.yPos(i[1]), r.h = this.yAxis.yPos(i[2]), r.l = this.yAxis.yPos(i[3]), r.c = this.yAxis.yPos(i[4]), r.raw = i, e.inRenderRange(i[0]) && s(r), i[4] >= i[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, bt(
      this.scene.context,
      r.c,
      0,
      this.target.width,
      this.theme.priceLineStyle
    );
  }
  areaRender(e) {
    const i = this.core.range, s = i.value(i.data.length - 2);
    if (s === null) return;
    const n = {
      x: this.xAxis.xPos(s[0]),
      o: this.yAxis.yPos(s[1]),
      h: this.yAxis.yPos(s[2]),
      l: this.yAxis.yPos(s[3]),
      c: this.yAxis.yPos(s[4])
    }, r = this.scene.context, o = this.theme, l = o.candle.UpBodyColour || o.candle.DnBodyColour;
    Math.max(e.w - 1, 1), e.x;
    let c;
    if (r.save(), r.fillStyle = l, r.strokeStyle = l, r.lineWidth = 1, r.beginPath(), r.moveTo(e.x, e.c), r.lineTo(n.x, n.h), o.candle.Type === me.AREA) {
      if (c = r.createLinearGradient(0, 0, 0, this.scene.height), L(o.candle.AreaFillColour))
        for (let [p, f] of o.candle.AreaFillColour.entries())
          c.addColorStop(p, f);
      else T(o.candle.AreaFillColour) ? c = o.candle.AreaFillColour : c = o.candle.UpBodyColour || o.candle.DnBodyColour;
      r.stroke(), r.lineTo(n.x, this.scene.height), r.lineTo(e.x, this.scene.height), r.fillStyle = c, r.closePath(), r.fill();
    } else
      r.stroke();
    r.restore();
  }
}
const Qt = {
  colour: "#4444cc88",
  wdith: 1,
  dash: [1, 0]
};
class rg extends Q {
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o);
    const l = { class: ag, fixed: !0, required: !1 };
    this.core.config?.highLow === !0 && (this.scaleOverly = this.chart.scale.addOverlay("hiLo", l));
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw(e = this.core.range) {
    if (this.core.config?.highLow !== !0 || !super.mustUpdate()) return;
    this.scene.clear();
    let i, s, n, r = this.scene.width, o = 35, l = {};
    const c = e.valueHi, p = e.valueLo, f = { ...this.theme.yAxis }, b = this.scene.context;
    f.colourCursorBG = this.theme?.hilo?.colour || Qt.colour, b.save(), b.strokeStyle = this.theme?.highLow?.colour || Qt.colour, b.strokeWidth = this.theme?.highLow?.width || Qt.width, b.setLineDash(this.theme?.highLow?.dash || Qt.dash), n = this.yAxis.yPos(c), bt(b, n, 0, r, l), i = "High", s = this.theme.yAxis.location == "left" ? 0 : r - (o + 25), is(b, i, s, n, o, f), n = this.yAxis.yPos(p), bt(b, n, 0, r, l), i = "Low", is(b, i, s, n, o, f), b.restore(), super.updated(), "hiLo" in this.chart.scale.overlays && (this.chart.scale.overlays.hiLo.instance.setRefresh(), this.chart.scale.overlays.hiLo.instance.scaleDraw());
  }
}
class ag extends Q {
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw() {
  }
  scaleDraw(e = this.core.range) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    let i, s, n, r;
    const o = e.valueHi, l = e.valueLo, c = { ...this.theme.yAxis }, p = this.scene.context;
    c.colourCursorBG = this.theme?.hilo?.colour || Qt.colour, i = this.chart.Scale.nicePrice(o), s = 1, n = this.yAxis.yPos(o) + 1, r = this.viewport.width, is(p, i, s, n, r, c), i = this.chart.Scale.nicePrice(l), n = this.yAxis.yPos(l) + 1, is(p, i, s, n, r, c), super.updated();
  }
}
function is(a, e, i, s, n, r) {
  let o = {
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
  }, l = o.fontSize + o.paddingTop + o.paddingBottom, c = s - l * 0.5;
  a.save(), a.fillStyle = o.bakCol, a.fillRect(i, c, n, l), $t(a, `${e}`, i, c, o), a.restore();
}
class og {
  data;
  icon;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.events, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.icon = qi(this.cfg.iconEvent, this.cfg.iconColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.icon, s = this.cfg, n = this.hit.getIndexValue(e.key), r = gt(n, i), o = U(e.w, s.iconMinDim, s.iconHeight), l = U(e.w, s.iconMinDim, s.iconWidth), c = this.data.x, p = this.data.y, f = this.ctx, b = this.ctxH;
    return f.save(), f.drawImage(i, c, p, l, o), f.restore(), b.save(), b.drawImage(r, c, p, l, o), b.restore(), { x: c, y: p, w: l, h: o, k: n };
  }
}
const eo = {
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
class lg extends Q {
  #e;
  #t = [];
  #i;
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.#e = new og(e, n), this.core.on("chart_primaryPointerDown", this.onPrimaryPointerDown, this), eo.parent = this, this.#i = this.core.WidgetsG.insert("Dialogue", eo), this.#i.start();
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get data() {
    return this.overlay.data;
  }
  onPrimaryPointerDown(e) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && Pe(this.isNewsEventSelected, si, this)(e);
  }
  isNewsEventSelected(e) {
    const i = e[0], s = e[1], n = this.hit.getIntersection(i, s);
    if (this.core.config?.events?.display === !1 || this.core.config?.events?.displayInfo === !1 || n == -1) return;
    const r = this.theme.events, o = U(this.xAxis.candleW, r.iconMinDim, r.iconHeight), l = this.xAxis.pixel2T(i), c = this.xAxis.scrollOffsetPx, p = this.core.dimensions;
    let f = Object.keys(this.data)[n] * 1, b = this.xAxis.xPos(l) + c, E = s - o * 1.5 - p.height, M = "";
    for (let N of this.data[f])
      M += this.buildNewsEventHTML(N);
    const D = {
      dimensions: { h: void 0, w: 150 },
      position: { x: b + o / 2 + 1, y: E },
      content: M,
      offFocus: si + 1
    };
    this.core.emit("event_selected", f), this.#i.open(D);
  }
  buildNewsEventHTML(e) {
    let i = e?.title, s = `<style>
    h1, p {display: inline-block; font-size: 0.9em;
    max-width: 98%;
    </style>`;
    return T(e?.url) && (i = `<a href="${e?.url}" target="${e?.target}">${i}</a>`), s += `<h1>${i}</h1>`, s += `<p>${e?.content}</p>`, s;
  }
  draw(e = this.core.range) {
    if (this.core.config?.events?.display === !1 || !v(this.data) || Object.keys(this.data).length == 0 || !super.mustUpdate()) return;
    this.hit.clear(), this.scene.clear(), this.#t.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.events, r = this.core.rangeScrollOffset, o = e.indexStart - r, l = e.Length + r * 2, c, p, f;
    for (; l; ) {
      if (c = e.value(o), p = `${c[0]}`, f = Object.keys(this.data).indexOf(p), f >= 0)
        for (let b of this.data[p])
          s.x = this.xAxis.xPos(c[0]) - this.xAxis.candleW / 2, s.y = this.scene.height - U(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.key = f, this.#t.push(this.#e.draw(s));
      o++, l--;
    }
    super.updated();
  }
}
class hg {
  data;
  buy;
  sell;
  mask;
  dims = { w: 0, h: 0 };
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.trades, this.dims = { w: this.cfg.iconWidth, h: this.cfg.iconHeight }, this.buy = qi(this.cfg.iconBuy, this.cfg.buyColour, this.dims), this.sell = qi(this.cfg.iconSell, this.cfg.sellColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.cfg, s = e.side === "buy" ? this.buy : this.sell;
    e.side === "buy" ? i.iconBuy : i.iconSell;
    const n = this.hit.getIndexValue(e.key), r = gt(n, s), o = U(e.w, i.iconMinDim, i.iconHeight), l = U(e.w, i.iconMinDim, i.iconWidth), c = this.data.x, p = this.data.y, f = this.ctx, b = this.ctxH;
    return f.save(), f.drawImage(s, c, p, l, o), f.restore(), b.save(), b.drawImage(r, c, p, l, o), b.restore(), { x: c, y: p, w: l, h: o, k: n };
  }
}
const to = {
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
class cg extends Q {
  #e;
  #t = [];
  #i;
  #n;
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o), this.settings = o.settings, A.importData("trades", this.data, this.state, this.state.time.timeFrame), this.#e = new hg(e, n), this.core.on("chart_primaryPointerDown", this.onPrimaryPointerDown, this), to.parent = this, this.#n = this.core.WidgetsG.insert("Dialogue", to), this.#n.start();
  }
  destroy() {
    this.core.off("chart_primaryPointerDown", this.onPrimaryPointerDown, this);
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
    if (!v(e)) return !1;
    let i = this.theme.trades;
    for (let s in e)
      e[s] !== void 0 && (i[s] = e[s]);
  }
  onPrimaryPointerDown(e) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && Pe(this.isTradeSelected, si, this)(e);
  }
  isTradeSelected(e) {
    const i = e[2].domEvent.srcEvent, s = (i.target || i.srcElement).getBoundingClientRect(), n = i.clientX - (s.right - s.width), r = i.clientY - s.top, o = this.hit.getIntersection(n, r);
    if (this.core.config?.trades?.display === !1 || this.core.config?.trades?.displayInfo === !1 || o == -1) return;
    console.log("isTradeSelected()");
    const l = this.theme.trades, c = U(this.xAxis.candleW, l.iconMinDim, l.iconWidth), p = this.xAxis.pixel2T(n);
    this.core.range.valueByTS(p);
    const f = this.xAxis.scrollOffsetPx, b = this.core.dimensions;
    let E = Object.keys(this.data)[o] * 1, M = this.xAxis.xPos(p) + f, D = r - c * 1.5 - b.height, N = "";
    for (let oe of this.data[E])
      N += this.buildTradeHTML(oe);
    const K = {
      dimensions: { h: void 0, w: 150 },
      position: { x: M + c / 2 + 1, y: D },
      content: N,
      offFocus: si + 1
    };
    this.core.emit("trade_selected", E), this.#n.open(K);
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
    if (this.core.config?.events?.display === !1 || !v(this.data) || Object.keys(this.data).length == 0 || !super.mustUpdate()) return;
    this.hit.clear(), this.scene.clear(), this.#t.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.trades, r = this.core.rangeScrollOffset, o = e.indexStart - r, l = e.Length + r * 2, c, p, f;
    for (; l; ) {
      if (c = e.value(o), p = `${c[0]}`, f = Object.keys(this.data).indexOf(p), f >= 0)
        for (let b of this.data[p])
          s.x = this.xAxis.xPos(c[0]) - this.xAxis.candleW / 2, s.y = this.yAxis.yPos(c[2]) - U(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.side = b.side, s.key = f, this.#t.push(this.#e.draw(s));
      o++, l--;
    }
    super.updated();
  }
}
class Wi {
  static passive = new Wi("passive");
  static hover = new Wi("hover");
  static active = new Wi("active");
  constructor(e) {
    this.name = e;
  }
}
const io = {
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
class Se extends Q {
  static #e = 0;
  static #t = {};
  static get inCnt() {
    return Se.#e++;
  }
  static create(e, i) {
    const s = ++Se.#e;
    i.cnt = s, i.modID = `${i.toolID}_${s}`, i.toolID = i.modID, i.target = e;
    const n = new i.tool(i);
    return Se.#t[s] = n, e.chartToolAdd(n), n;
  }
  static destroy(e) {
    e instanceof Se && delete Se.#t[e.inCnt];
  }
  #i;
  #n;
  #s = "Chart Tools";
  #r = "TX_Tool";
  #a;
  #o;
  #c = [0, 0];
  #l = !1;
  #u;
  #h = { TL: [0, 0], BR: [0, 0] };
  constructor(e, i = !1, s = !1, n, r, o) {
    super(e, i, s, n, r, o);
    const l = o?.overlay;
    this.#n = Se.inCnt, this.id = l?.id || ae(this.shortName), this.settings = o?.settings || {}, io.parent = this, this.#a = this.core.WidgetsG.insert("ConfigDialogue", io), this.#a.start(), this.eventsListen();
  }
  set id(e) {
    this.#i = ot(e);
  }
  get id() {
    return this.#i || `${this.core.ID}-${ae(this.#r)}_${this.#n}`;
  }
  get inCnt() {
    return this.#n;
  }
  get name() {
    return this.#s;
  }
  get shortName() {
    return this.#r;
  }
  get settings() {
    return this.params.settings;
  }
  set settings(e) {
    this.doSettings(e);
  }
  eventsListen() {
    const e = this.chart;
    e.on(`${e.id}_pointermove`, this.onPointerMove, this), e.on(`${e.id}_pointerdown`, this.onPointerDown, this), e.on(`${e.id}_pointerup`, this.onPointerUp, this);
  }
  onPointerMove(e) {
    this.chart.stateMachine.state;
  }
  onPointerDown(e) {
    this.chart.stateMachine.state !== "chart_pan" && Pe(this.isToolSelected, si, this)(e);
  }
  onPointerUp(e) {
  }
  isToolSelected(e) {
  }
  doSettings(e) {
    if (!v(e)) return !1;
    let i = this.theme.trades;
    for (let s in e)
      e[s] !== void 0 && (i[s] = e[s]);
  }
  isVisible() {
  }
  draw(e = this.core.range) {
    if (!super.mustUpdate() || this.core.config?.tools?.display === !1) return;
    this.hit.clear(), this.scene.clear(), this.theme.tools;
    let i = this.core.rangeScrollOffset;
    e.indexStart - i, e.Length + i * 2, super.updated();
  }
}
const sh = {
  primaryPane: [
    ["watermark", { class: ig, fixed: !0, required: !0, params: { content: null } }],
    ["grid", { class: ts, fixed: !0, required: !0, params: { axes: "y" } }],
    ["candles", { class: ih, fixed: !1, required: !0 }],
    ["hiLo", { class: rg, fixed: !0, required: !1 }],
    ["stream", { class: ng, fixed: !1, required: !0 }],
    ["cursor", { class: Mn, fixed: !0, required: !0 }]
  ],
  secondaryPane: [
    ["grid", { class: ts, fixed: !0, required: !0, params: { axes: "y" } }],
    ["cursor", { class: Mn, fixed: !0, required: !0 }]
  ]
}, Ln = {
  primaryPane: {
    trades: { class: cg, fixed: !1, required: !1 },
    events: { class: lg, fixed: !1, required: !1 },
    volume: { class: sg, fixed: !1, required: !0, params: { maxVolumeH: _i.ONCHART_VOLUME_HEIGHT } }
  },
  secondaryPane: {
    candles: { class: ih, fixed: !1, required: !0 }
  }
}, Oe = {
  id: "chart",
  title: "",
  type: "chart",
  parent: void 0,
  source: () => {
  },
  visible: !0
};
class je extends Ct {
  static #e = 0;
  static get cnt() {
    return je.#e++;
  }
  #t;
  #i;
  #n;
  #s;
  #r;
  #a;
  #o = "idle";
  #c = {
    state: !1,
    height: null,
    rowsHeight: null,
    rowsCnt: 1
  };
  #l;
  #u;
  #h;
  #d;
  #m;
  #f;
  #g;
  #T;
  #v;
  #w;
  #x;
  #p = new fe();
  #S = new fe();
  #y = [0, 0];
  #E = !1;
  #C;
  #b;
  #P;
  #L = {
    valueMax: 110,
    valueMin: -10,
    valueDiff: 120
  };
  #A = {};
  constructor(e, i = {}) {
    if (super(e, i), this.#r = je.cnt, !v(i)) throw new Error(`TradeX-Chart : id: ${e.id} : Chart (pane) constructor failed: Expected options typeof object`);
    if (this.#i = this.options.name, this.#n = this.options.shortName, this.#s = this.options.title, this.#a = this.options.type == "primary" ? "primaryPane" : "secondaryPane", this.#w = this.options.view, this.#u = this.options.elements.elScale, this.#l = this.options.elements.elTarget, this.#l.id = this.id, this.legend = new Yf(this.elLegend, this), this.isPrimary)
      Oe.type = "chart", Oe.title = this.title, Oe.parent = this, Oe.source = this.legendInputs.bind(this), this.legend.add(Oe), this.yAxisType = R.default;
    else {
      let s = this.core.indicatorClasses[i.view[0].type].scale;
      Oe.type = "secondary", Oe.title = "", Oe.parent = this, Oe.source = () => ({ inputs: {}, colours: [], labels: [] }), this.legend.add(Oe), this.yAxisType = R.valid(s);
    }
    this.setScaleBar(), this.#o = "init";
  }
  set id(e) {
    this.#t = ot(e);
  }
  get id() {
    return this.#t || ot(`${this.core.ID}-${this.#i}_${this.#r}`);
  }
  get name() {
    return this.#i;
  }
  get shortName() {
    return this.#n;
  }
  set title(e) {
    this.setTitle(e);
  }
  get title() {
    return `${this.#s} : ${this.range.timeFrame} :`;
  }
  get type() {
    return this.#a;
  }
  get status() {
    return this.#o;
  }
  get collapsed() {
    return this.#c;
  }
  get isPrimary() {
    return this.options?.view?.primary || this.#a === "primaryPane" || !1;
  }
  get element() {
    return this.#l;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ve(this.#l);
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
  get localRange() {
    return this.#L;
  }
  get stream() {
    return this.#g;
  }
  get streamCandle() {
    return this.#v;
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
  set cursorActive(e) {
    this.#E = e;
  }
  get cursorActive() {
    return this.#E;
  }
  get cursorClick() {
    return this.#C;
  }
  get candleW() {
    return this.core.Timeline.candleW;
  }
  get scrollPos() {
    return this.core.scrollPos;
  }
  get bufferPx() {
    return this.core.bufferPx;
  }
  get elCanvas() {
    return this.graph.viewport.scene.canvas;
  }
  get elScale() {
    return this.#u;
  }
  get elLegend() {
    return this.#l.legend;
  }
  get elViewport() {
    return this.#l.viewport;
  }
  set layerWidth(e) {
    this.graph.layerWidth = e;
  }
  get layerWidth() {
    return this.graph.layerWidth;
  }
  set legend(e) {
    this.#m = e;
  }
  get legend() {
    return this.#m;
  }
  set time(e) {
    this.#d = e;
  }
  get time() {
    return this.#d;
  }
  set scale(e) {
    this.#h = e;
  }
  get scale() {
    return this.#h;
  }
  set yAxisType(e) {
    this.setYAxisType(e);
  }
  get yAxisType() {
    return this.#P;
  }
  get axes() {
    return "x";
  }
  get view() {
    return this.#w;
  }
  get viewport() {
    return this.graph.viewport;
  }
  get layerGrid() {
    return this.graph.overlays.get("grid").layer;
  }
  get overlays() {
    return Object.fromEntries([...this.graph.overlays.list]);
  }
  get overlayGrid() {
    return this.graph.overlays.get("grid").instance;
  }
  get overlayTools() {
    return this.#S;
  }
  get overlaysDefault() {
    return sh[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#A;
  }
  get Divider() {
    return this.#f;
  }
  get siblingPrev() {
    return this.sibling("prev");
  }
  get siblingNext() {
    return this.sibling("next");
  }
  start() {
    this.#d = this.core.Timeline, this.createGraph(), this.#h.start(), this.draw(this.range), this.cursor = "crosshair", nn.id = this.id, nn.context = this, this.stateMachine = nn, this.stateMachine.start(), this.eventsListen(), this.isPrimary && this.setTitle(this.theme?.title);
    let e = { chartPane: this };
    this.#f = this.core.WidgetsG.insert("Divider", e), this.#f.start();
    let s = {
      title: "Chart Config",
      content: `Configure chart ${this.id}`,
      parent: this,
      openNow: !1
    };
    this.#T = this.core.WidgetsG.insert("ConfigDialogue", s), this.#T.start(), this.#o = "running", this.log(`TradeX-Chart : id: ${this.core.id} : Chart Pane ${this.name} instantiated and running`);
  }
  destroy() {
    if (this.#o !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "chartPaneRemove()" instead.`);
        return;
      }
      this.core.log(`Deleting chart pane: ${this.id}`), this.deactivate(!0), this.#o = "destroyed";
    }
  }
  remove() {
    this.emit("chart_paneDestroy", this.id);
  }
  deactivate(e = !1) {
    this.core.hub.expunge(this), e && this.removeAllIndicators(), this.stateMachine.destroy(), this.#f.destroy(), this.#h.destroy(), this.graph.destroy(), this.#b.destroy(), this.legend.destroy(), this.stateMachine = void 0, this.#f = void 0, this.#m = void 0, this.#h = void 0, this.graph = void 0, this.#b = void 0, this.element.remove();
  }
  snapshot() {
    return {
      maximized: this.core.MainPane.chartPaneMaximized?.instance?.id == this.id,
      collapsed: { ...this.collapsed },
      height: this.height
    };
  }
  eventsListen() {
    this.#b = new Ve(this.#l, { disableContextMenu: !1 }), this.#b.on("pointerdrag", this.onChartDrag.bind(this)), this.#b.on("pointerdragend", this.onChartDragDone.bind(this)), this.#b.on("pointermove", this.onPointerMove.bind(this)), this.#b.on("pointerenter", this.onPointerEnter.bind(this)), this.#b.on("pointerout", this.onPointerOut.bind(this)), this.#b.on("pointerdown", this.onPointerDown.bind(this)), this.#b.on("pointerup", this.onPointerUp.bind(this)), this.on("main_mouseMove", this.updateLegends, this), this.on(Di, this.onStreamListening, this), this.on(Rn, this.onStreamNewValue, this), this.on(rt, this.onStreamUpdate, this), this.on(Nn, this.onStreamNewValue, this), this.on("range_timeframeSet", this.onTimeframeSet, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
  }
  onChartDrag(e) {
    this.cursor = "grab", this.core.MainPane.onChartDrag(e), this.scale.onChartDrag(e);
  }
  onChartDragDone(e) {
    this.cursor = "crosshair", this.core.MainPane.onChartDragDone(e);
  }
  onPointerMove(e) {
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#y = [Math.round(e.position.x), Math.round(e.position.y)], this.#h.onMouseMove(this.#y), this.emit(`${this.id}_pointermove`, this.#y);
  }
  onPointerEnter(e) {
    this.core.MainPane.onPointerActive(this), this.#y = [Math.round(e.position.x), Math.round(e.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_pointerenter`, this.#y);
  }
  onPointerOut(e) {
    this.#E = !1, this.#y = [Math.round(e.position.x), Math.round(e.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_pointerout`, this.#y);
  }
  onPointerDown(e) {
    this.core.pointerButtons[e.domEvent.srcEvent.button] = !0, this.#C = [Math.floor(e.position.x), Math.floor(e.position.y), e], this.stateMachine.state === "tool_activated" ? this.emit("tool_targetSelected", { target: this, position: e }) : this.isPrimary && this.emit("chart_primaryPointerDown", this.#C);
  }
  onPointerUp(e) {
    this.core.pointerButtons[e.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(e) {
    this.#g !== e && (this.#g = e);
  }
  onStreamNewValue(e) {
    this.draw(this.range, !0);
  }
  onStreamUpdate(e) {
    this.isPrimary ? (this.#v = e, this.chartStreamCandle.draw(), this.layerStream.setPosition(this.core.stream.lastScrollPos, 0), this.updateLegends(this.cursorPos, e)) : this.updateLegends(), this.core.MainPane.draw();
  }
  onYAxisRedraw() {
    this.isPrimary && this.refresh();
  }
  onDeleteIndicator(e) {
    this.removeIndicator(e.id);
  }
  onTimeframeSet() {
    let e = `${this.#s}`;
    Oe.title = e, this.setTitle(e);
  }
  setScaleBar() {
    const e = { ...this.options };
    e.parent = this, e.chart = this, e.elScale = this.elScale, e.yAxisType = this.yAxisType, this.scale = new tg(this.core, e);
  }
  setTitle(e) {
    let i = this.#s, s;
    if (v(e))
      T(e?.text) && (i = e.text), s = e?.display ? "display" : "none";
    else if (T(e))
      i = e;
    else return !1;
    this.#s = i, Oe.title = this.title;
    const n = this.legend.list.chart.el.querySelectorAll(".title");
    for (let r of n)
      r.innerHTML = this.title, r.style.display = s || r.style.display;
    return !0;
  }
  setWatermark(e) {
    T(e.text) || T(e) ? this.core.config.watermark.text = e : "imgURL" in e && (this.core.config.watermark.imgURL = e);
  }
  setHeight(e) {
    P(e) || (e = this.height || this.core.MainPane.rowsH), e > this.core.MainPane.rowsH && (e = this.core.MainPane.rowsH), this.#l.style.height = `${e}px`, this.#u.style.height = `${e}px`, this.elViewport.style.height = `${e}px`, this.#h.setDimensions({ w: null, h: e }), this.Divider?.setPos(), this.Divider?.setWidth();
  }
  setDimensions(e = { w: this.width, h: this.height }) {
    v(e) || (e = { w: this.width, h: this.height });
    const i = this.config.buffer || ls;
    let s = P(e?.w) ? e.w : this.width, n = P(e?.h) ? e.h : this.height;
    this.setHeight(n), this.graph instanceof ht && (this.layerWidth = Math.round(s * ((100 + i) * 0.01)), this.graph.setSize(s, n, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.Divider.setPos(), this.Divider.setWidth());
  }
  setLocalRange(e, i) {
    if (!P(i) || !P(e))
      return !1;
    e > i && ([e, i] = [i, e]), this.#L = {
      valueMax: i,
      valueMin: e,
      valueDiff: i - e
    };
  }
  setYAxisType(e) {
    let i = R.valid(e);
    return this.type == "primaryPane" && i == R.percent ? this.#P = R.default : this.#P = i, !0;
  }
  addOverlays(e) {
    if (!L(e) || e.length < 1) return !1;
    const i = [];
    for (let s of e) {
      const n = { fixed: !1, required: !1 };
      if (s.type in this.core.indicatorClasses)
        n.cnt = this.core.indicatorClasses[s.type].cnt, n.id = `${this.id}-${s.type}_${n.cnt}`, n.class = this.core.indicatorClasses[s.type], n.oType = "indicator";
      else if (s.type in Ln[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = Ln[this.type][s.type].class, n.oType = "overlayOptional";
      else if (s.type in this.core.customOverlays[this.type])
        n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = this.core.customOverlays[this.type][s.type].class, n.oType = "overlayCustom";
      else continue;
      n.params = { overlay: s }, s.id = n.id, s.paneID = this.id, s.key = Pn(s), i.push([s.id, n]);
    }
    return this.graph.addOverlays(i), !0;
  }
  addIndicator(e) {
    const i = this.type === "primaryPane", s = this.core.indicatorClasses[e.type], n = !!e.settings?.isPrimary;
    if (e?.type in this.core.indicatorClasses && i === n) {
      e.paneID = this.id, e.key = Pn(e);
      const r = {
        class: s,
        params: {
          overlay: e
        }
      };
      try {
        return this.graph.addOverlay(e.name, r);
      } catch (o) {
        this.core.error(`ERROR: Chart Pane: ${this.id} cannot add Indicator: ${e?.name} Error: ${o.message}`);
        return;
      }
    } else return;
  }
  isDuplicate(e) {
    let i = this.findIndicatorByKey(e);
    return i ? i.id : !1;
  }
  findIndicatorByKey(e) {
    let i = Object.values(this.getIndicators());
    for (let s of i)
      if (s.key = e) return s;
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
  removeIndicator(e, i = !0) {
    return !T(e) || !(e in this.indicators) ? !1 : (this.#A[e] = !0, Object.keys(this.indicators).length === 0 && !this.isPrimary ? this.emit("chart_paneDestroy", this.id) : (this.indicators[e].instance.destroy(i), this.graph.removeOverlay(e), this.draw(), delete this.#A[e]), !0);
  }
  removeAllIndicators(e) {
    const i = {}, s = this.getIndicators();
    for (let n in s)
      i[n] = this.removeIndicator(n, e);
    return i;
  }
  indicatorVisible(e, i) {
    return !T(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.visible(i);
  }
  indicatorSettings(e, i) {
    return !T(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.settings(i);
  }
  addTool(e) {
    let { layerConfig: i } = this.layerConfig(), s = new j.Layer(i);
    this.#p.set(e.id, s), this.#x.addLayer(s), e.layerTool = s, this.#S.set(e.id, e);
  }
  addTools(e) {
  }
  overlayToolAdd(e) {
    this.#S.set(e.id, e);
  }
  overlayToolDelete(e) {
    this.#S.delete(e);
  }
  refresh() {
    this.emit("chart_paneRefresh", this), this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  legendsVisibility(e) {
    this.legend.setCollapse(e);
  }
  updateLegends(e = this.#y, i = !1) {
    if (!(this.core.IDEmpty || !v(this.#m)))
      for (const s in this.#m.list)
        this.#m.update(s, { pos: e, candle: i });
  }
  legendInputs() {
    const e = [!0, !0, !0, !0, !0], i = this.cursorPos, s = this.time.xPos2Index(i[0] - this.core.scrollPos), n = U(s, 0, this.range.data.length - 1), r = this.range.data[n], o = this.theme.candle, l = {}, c = ["T", "O", "H", "L", "C", "V"];
    let p = [];
    if (L(r)) {
      p = r[4] >= r[1] ? new Array(5).fill(o.UpWickColour) : new Array(5).fill(o.DnWickColour);
      for (let f = 1; f < 6; f++)
        l[c[f]] = this.scale.nicePrice(r[f]);
    }
    return { inputs: l, colours: p, labels: e };
  }
  onLegendAction(e) {
    switch (this.#m.onPointerClick(e.currentTarget).icon) {
      case "up":
        this.reorderUp();
        return;
      case "down":
        this.reorderDown();
        return;
      case "maximize":
        this.core.MainPane.chartPaneMaximize(this);
        return;
      case "restore":
        this.core.MainPane.chartPaneMaximize(this);
        return;
      case "collapse":
        this.core.MainPane.chartPaneCollapse(this);
        return;
      case "expand":
        this.core.MainPane.chartPaneCollapse(this);
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
      parentScaleEl: o,
      prevPane: l
    } = { ...this.currPrevNext() };
    return !v(i) || !v(r) ? !1 : (s.insertBefore(e, i), o.insertBefore(n, r), this.Divider.setPos(), l !== null && (l.Divider.setPos(), l.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), e.previousElementSibling === null && this.Divider.hide(), !0);
  }
  reorderDown() {
    const {
      el: e,
      nextEl: i,
      parentEl: s,
      scaleEl: n,
      nextScaleEl: r,
      parentScaleEl: o,
      nextPane: l
    } = { ...this.currPrevNext() };
    return !v(i) || !v(r) ? !1 : (s.insertBefore(i, e), o.insertBefore(r, n), this.Divider.setPos(), l !== null && (l.Divider.setPos(), this.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), i.previousElementSibling === null && l.Divider.hide(), !0);
  }
  createGraph() {
    let e = re(this.overlaysDefault);
    this.graph = new ht(this, this.elViewport, e, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.graph.render(), this.#h.render();
  }
  draw(e = this.range, i = !1) {
    this.graph.draw(e, i);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.core.scrollPos, 0), this.overlayGrid.setRefresh(), this.overlayGrid.draw("y"), this.core.MainPane.draw();
  }
  resize(e) {
    const i = this, s = this.sibling();
    if (s === null) return { active: null, prev: null };
    let n = this.element.clientHeight;
    const r = this.core.MainPane.rowMinH, o = s.element.clientHeight, l = n + o;
    let c, p, f;
    return P(e) && e > r ? p = e : (c = this.core.MainPane.cursorPos[5], p = n - c, p = U(p, r, l - r), f = l - p), i.setDimensions({ w: void 0, h: p }), s.setDimensions({ w: void 0, h: f }), i.Divider.setPos(), i.element.style.userSelect = "none", s.element.style.userSelect = "none", { active: i, prev: s };
  }
  collapse(e) {
    const i = this.graph.viewport.scene.canvas.style, s = this.#c, n = this.#h.graph.viewport.scene.canvas.style;
    s.state ? (this.setDimensions({ w: void 0, h: e }), n.visibility = "visible", i.display = "block", s.state = !1) : (n.visibility = "hidden", i.display = "none", s.state = !0, s.height = this.element.clientHeight, s.rowsHeight = this.core.MainPane.rowsH, s.rowsCnt = this.core.ChartPanes.size, this.setDimensions({ W: void 0, h: Cn }));
  }
  zoomRange() {
    this.draw(this.range, !0), this.emit("chart_zoomDone", !0);
  }
  time2XPos(e) {
    return this.time.xPos(e);
  }
  price2YPos(e) {
    return this.scale.yPos(e);
  }
  currPrevNext() {
    const e = this.element, i = e.previousElementSibling, s = e.nextElementSibling, n = e.parentNode, r = this.scale.element, o = r.previousElementSibling, l = r.nextElementSibling, c = r.parentNode, p = i !== null ? this.core.ChartPanes.get(i.id) : null, f = s !== null ? this.core.ChartPanes.get(s.id) : null;
    return {
      el: e,
      prevEl: i,
      nextEl: s,
      parentEl: n,
      scaleEl: r,
      prevScaleEl: o,
      nextScaleEl: l,
      parentScaleEl: c,
      prevPane: p,
      nextPane: f
    };
  }
  sibling(e) {
    e = ["prev", "next"].includes(e) ? e : "prev";
    let i = [...this.core.ChartPanes.keys()], s = i.indexOf(this.id);
    return e == "prev" ? --s : ++s, this.core.ChartPanes.get(i[s]) || null;
  }
  configDialogue() {
    const e = this.#T;
    e.state.name === "closed" && e.open();
  }
}
const rn = {
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        chart_paneMaximize: {
          target: "chart_paneMaximize",
          action(a) {
          }
        },
        chart_pan: {
          target: "chart_pan",
          action(a) {
          }
        },
        chart_scrollTo: {
          target: "chart_scrollTo",
          action(a) {
          }
        },
        range_set: {
          target: "range_set",
          action(a) {
          }
        },
        chart_IndicatorAdd: {
          target: "chart_IndicatorAdd",
          action(a) {
          }
        },
        divider_pointerDrag: {
          target: "divider_pointerDrag",
          action(a) {
            this.context.currCursor = this.context.origin.cursor, this.context.origin.cursor = "row-resize";
          }
        },
        global_resize: {
          target: "global_resize",
          action(a) {
          }
        }
      }
    },
    chart_paneMaximize: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        always: {
          target: "idle",
          action(a) {
            this.context.maximize = "some pane pointer";
          }
        }
      }
    },
    chart_pan: {
      onEnter(a) {
        this.context.origin.cursor = "grab";
      },
      onExit(a) {
      },
      on: {
        chart_pan: {
          target: "chart_pan",
          action(a) {
            this.context.origin.updateRange(a), this.context.origin.cursor = "grab";
          }
        },
        chart_panDone: {
          target: "idle",
          action(a) {
            this.context.origin.updateRange(a), this.context.origin.cursor = "default";
          }
        }
      }
    },
    range_set: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        always: {
          target: "idle",
          condition: "zoomDone",
          action(a) {
            this.context.origin.zoomRange(a);
          }
        }
      }
    },
    chart_scrollTo: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        always: {
          target: "idle",
          action(a) {
            this.context.origin.updateRange(a);
          }
        }
      }
    },
    chart_IndicatorAdd: {
      onEnter(a) {
        this.context.origin.addIndicator(a);
      },
      onExit(a) {
      },
      on: {
        chart_IndicatorAddDone: {
          target: "idle",
          action(a) {
          }
        }
      }
    },
    divider_pointerDrag: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        divider_pointerDrag: {
          target: "divider_pointerDrag",
          action(a) {
          }
        },
        divider_pointerDragEnd: {
          target: "idle",
          action(a) {
            this.context.origin.cursor = this.context.currCursor;
          }
        }
      }
    },
    global_resize: {
      onEnter(a) {
        this.context.origin.setDimensions();
      },
      onExit(a) {
      },
      on: {
        always: {
          target: "idle",
          condition: "resizeDone",
          action(a) {
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
      let a = this.context.pair.active, e = this.context.pair.prev;
      v(a) && a.element.style.removeProperty("user-select"), v(e) && e.element.style.removeProperty("user-select");
    }
  }
}, ug = [
  ["grid", { class: ts, fixed: !1, required: !0, params: { axes: "x" } }]
], dg = ["candles", "trades", "events"];
class so extends Ct {
  #e = "MainPane";
  #t = "Main";
  #i = !1;
  #n;
  #s;
  #r;
  #a;
  #o;
  #c;
  #l;
  #u;
  #h;
  #d;
  #m;
  #f;
  #g;
  #T = {};
  #v = ma;
  #w = da;
  #x = {};
  #p = [0, 0];
  #S = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #y;
  #E;
  #C;
  #b = 0;
  #P = 0;
  constructor(e, i) {
    i.parent = e, super(e, i), this.init(i);
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get chart() {
    return this.#m;
  }
  get chartPanes() {
    return this.core.state.chartPanes;
  }
  get chartPaneMaximized() {
    return this.core.state.chartPaneMaximized;
  }
  get chartDeleteList() {
    return this.#T;
  }
  get time() {
    return this.#f;
  }
  get element() {
    return this.#n;
  }
  get elRows() {
    return this.#n.rows;
  }
  get elPrimary() {
    return this.#n.rows.primary;
  }
  get elSecondary() {
    return this.#n.rows.secondary;
  }
  get elPanes() {
    return this.#n.rows.chartPanes;
  }
  get elPaneSlot() {
    return this.#n.rows.chartPaneSlot;
  }
  get width() {
    return this.#n.getBoundingClientRect().width;
  }
  get height() {
    return this.#n.getBoundingClientRect().height;
  }
  get chartW() {
    return this.elPrimary.getBoundingClientRect().width;
  }
  get chartH() {
    return this.elPrimary.getBoundingClientRect().height;
  }
  get rowsW() {
    return this.#s.getBoundingClientRect().width;
  }
  get rowsH() {
    return this.#s.getBoundingClientRect().height;
  }
  get rowMinH() {
    return this.#w;
  }
  set rowMinH(e) {
    P(e) && (this.#w = Math.abs(e));
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ve(this.#n);
  }
  set cursor(e) {
    this.element.style.cursor = e;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#p;
  }
  get candleW() {
    return this.#f.candleW;
  }
  get buffer() {
    return this.#y;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.core.scrollPos;
  }
  get renderLoop() {
    return Xf;
  }
  get inventory() {
    return this.core.state.data.inventory;
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorClasses() {
    return this.core.indicatorClasses;
  }
  get elements() {
    return {
      elRows: this.elRows,
      elPrimary: this.elPrimary,
      elSecondary: this.elSecondary,
      elTime: this.#r,
      elScale: this.#a
    };
  }
  init(e) {
    if (this.core, this.#n = this.core.elMain, this.#s = this.#n.rows, this.#r = this.#n.time, this.#o = this.#n.rows.grid, this.#l = this.#n.viewport, this.#a = this.core.elBody.scale, e.name = "Chart", e.shortName = "Chart", e.parent = this, e.rangeLimit = this.core.rangeLimit, e.settings = this.core.settings, e.elements = { ...e.elements, ...this.elements }, this.core.theme?.time?.navigation === !1) {
      const i = { height: hs };
      this.core.theme.time = { ...this.core.theme?.time, ...i };
    }
    this.#f = new jf(this.core, e), this.chartPanes.clear(), this.chartPanesRegister(e), this.#y = P(this.config.buffer) ? this.config.buffer : ls, this.#w = P(this.config.rowMinH) ? this.config.rowMinH : da, this.#v = P(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : ma, this.rowsOldH = this.rowsH;
  }
  start() {
    this.#n.start(this.theme), this.#f.start(), this.createGraph(), this.rowsOldH = this.rowsH, this.chartPanesStart(), this.chartPanesSizeToInventory(), this.setScaleWidth(), this.draw(this.range, !0), this.renderLoop.init({
      graphs: [this.graph],
      range: this.range
    }), this.renderLoop.start(), this.renderLoop.queueFrame(this.range, [this.graph], !1), this.eventsListen(), rn.id = this.id, rn.context = this, this.stateMachine = rn, this.stateMachine.start(), this.log(`Main Pane ${this.#e} instantiated and running`);
  }
  destroy(e = !0) {
    this.#i = !0, this.renderLoop.stop(), this.stateMachine.destroy(), this.chartPanes.forEach((i, s) => {
      e ? i.remove() : i.deactivate(), delete this.#T[s];
    }), this.graph.destroy(), this.time.destroy(), this.core.hub.expunge(this), this.#C.destroy(), this.stateMachine = null, this.graph = null;
  }
  reset() {
    let e = this.core.Indicators;
    for (let i in e)
      for (let s in e[i])
        this.core.removeIndicator(s);
  }
  removeAllRowElements() {
    this.#n.rows.shadowRoot = "", this.#a.shadowRoot = "";
  }
  eventsListen() {
    this.#C = new Ve(this.#s, { disableContextMenu: !1 }), this.#C.on("keydown", this.onChartKeyDown.bind(this)), this.#C.on("keyup", this.onChartKeyUp.bind(this)), this.#C.on("wheel", this.onMouseWheel.bind(this)), this.#C.on("pointerenter", this.onMouseEnter.bind(this)), this.#C.on("pointerout", this.onMouseOut.bind(this)), this.#C.on("pointerup", this.onChartDragDone.bind(this)), this.#C.on("pointermove", this.onMouseMove.bind(this)), this.on(Nn, this.onFirstStreamValue, this), this.on(Rn, this.onNewStreamValue, this), this.on("range_set", this.onSetRange, this), this.on("chart_scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("chart_paneDestroy", this.chartPaneRemove, this);
  }
  onSetRange() {
    this.#P = this.#b, this.#b = this.chart.scale.calcScaleWidth(), this.#P != this.#b && (this.core.elBody.setYAxisWidth(this.#b), this.setDimensions(), this.draw());
  }
  onMouseWheel(e) {
    const i = Math.sign(e.wheeldelta) * -1;
    if (e.domEvent.preventDefault(), this.core.pointerButtons[0]) {
      e.dragstart.x = this.#p[0], e.dragstart.y = this.#p[1], e.position.x = this.#p[0] + i, e.position.y = this.#p[1], this.onChartDrag(e);
      return;
    }
    const s = this.range;
    let n = s.indexStart - Math.floor(i * aa * s.Length), r = s.indexEnd + Math.ceil(i * aa * s.Length);
    s.isPastLimit(n) && (n = s.pastLimitIndex + 1), s.isFutureLimit(r) && (r = s.futureLimitIndex - 1), !(r - n > s.maxCandles || r - n < s.minCandles) && (this.core.setRange(n, r), this.draw(this.range, !0));
  }
  onMouseMove(e) {
    const i = this.#x;
    i.d2x = i?.d1x || null, i.d2y = i?.d1y || null, i.d1x = e.movement.x, i.d1y = e.movement.y, i.dx = Math.floor((i.d1x + i.d2x) / 2), i.dy = Math.floor((i.d1y + i.d2y) / 2), i.ts2 = i?.ts1 || null, i.ts1 = Date.now(), this.#p = [
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
    this.emit("main_mouseMove", this.#p);
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
    const i = this.#S;
    i.active ? (i.delta = [
      e.position.x - i.prev[0],
      e.position.y - i.prev[1]
    ], i.prev = [
      e.position.x,
      e.position.y
    ]) : (i.active = !0, i.start = [e.position.x, e.position.y], i.prev = i.start, i.delta = [0, 0]), this.#p = [
      e.position.x,
      e.position.y,
      ...i.start,
      ...i.delta
    ], this.emit("chart_pan", this.#p);
  }
  onChartDragDone(e) {
    const i = this.#S;
    i.active = !1, i.delta = [0, 0], this.#p = [
      ...i.prev,
      ...i.start,
      ...i.delta
    ], this.emit("chart_panDone", this.#p);
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
    e && (e.cursorActive = !0, e.scale.layerCursor.visible = !0), e !== this.chart && (this.chart.cursorActive = !1, this.chart.scale.layerCursor.visible = !1, this.chart.scale.layerCursor.erase()), this.chartPanes.forEach((i, s) => {
      e !== i && (i.cursorActive = !1, i.scale.layerCursor.visible = !1, i.scale.layerCursor.erase());
    });
  }
  setDimensions() {
    this.#s.previousDimensions();
    let e = this.core.elBody.shadowRoot.children, i = this.core.elBody.offsetWidth;
    for (let c of e)
      c.tagName != "TRADEX-MAIN" && (i -= c?.offsetWidth || 0);
    let s = this.#s.heightDeltaR, n = Math.round(this.chartH * s), r = this.rowsH, o = Math.round(i * ((100 + this.#y) * 0.01)), l = {
      resizeH: s,
      mainH: this.element.height,
      mainW: i,
      rowsH: this.rowsH,
      rowsW: this.rowsW
    };
    this.core.scrollPos = -1, this.#l.style.width = `${i}px`, this.#l.style.height = `${r}px`, this.#f.setDimensions({ w: i }), this.graph.setSize(i, r, o), this.#l.style.width = `${i}px`, this.chartPanes.size == 1 && n != this.#s.height ? this.#m.setDimensions({ w: i, h: this.#s.height }) : this.chartPanes.forEach((c, p) => {
      n = Math.round(c.element.height * s), c.setDimensions({ w: i, h: n });
    }), this.rowsOldH = this.rowsH, this.emit("chart_rowsResize", l), this.draw(void 0, !0);
  }
  setScaleWidth(e = !1) {
    const { expanded: i } = this.chartPanesState();
    let s = 0;
    if (this.chartPanes.size === 1)
      s = this.chartPanes.values().next().value.scale.calcScaleWidth();
    else
      for (let n of i) {
        let r = n.scale.calcScaleWidth();
        s = r > s ? r : s;
      }
    this.core.elBody.setYAxisWidth(s);
  }
  getBufferPx() {
    let e = Math.round(this.width * this.buffer / 100), i = e % this.candleW;
    return e - i;
  }
  chartPanesRegister(e) {
    this.#s.previousDimensions(), this.validateIndicators();
    for (let i of this.inventory)
      L(i) && i.length > 1 && (e.type = i[0] == "primary" ? i[0] : "secondary", e.view = kn(i[1], "object") ? i[1] : [i[1]], e.state = i[2], this.chartPaneAdd(e));
  }
  chartPanesSizeToInventory() {
    if (!this.chartPanes.size || !v(this.#m.options?.state))
      return;
    const e = {};
    let i = !1, s = 0, n, r;
    this.chartPanes.forEach((o, l) => {
      let c = o.options.state;
      n = c.height, c.collapsed.height, e[l] = n, s += n, i = i || c.collapsed.height, P(c.collapsed.rowsHeight) && (r = c.collapsed.rowsHeight, c.collapsed.rowsCnt);
    }), i && (r != this.rowsH && (console.log("total does not match Row Height"), this.rowsH - s), this.chartPanes.forEach((o, l) => {
      o.setDimensions({ h: e[l] });
    }), this.chartPanes.forEach((o, l) => {
      o.options?.state?.collapsed?.state && this.chartPaneCollapse(o), o.options?.state?.maximized && this.chartPaneMaximize(o);
    }));
  }
  chartPanesStart() {
    let e = 0;
    this.chartPanes.forEach((i, s) => {
      i.start(e++), e === 1 && i.Divider.hide();
    });
  }
  chartPanesState() {
    const e = {
      list: [...this.chartPanes.values()],
      collapsed: [],
      expanded: [],
      maximized: this.chartPaneMaximized?.instance
    };
    for (let i of e.list)
      i.collapsed.state ? e.collapsed.push(i) : e.expanded.push(i);
    return e;
  }
  chartPaneAdd(e) {
    const { expanded: i } = this.chartPanesState(), s = this.chartPaneHeightsCalc(e?.state), n = s.new;
    let r;
    for (r in s)
      if (this.chartPanes.has(r)) {
        let f = this.chartPanes.get(r);
        i.indexOf(f) > -1 && f.setDimensions({ w: this.rowsW, h: s[r] });
      }
    let o = this.#n.addRow(e.type, "", this.core, n), l = this.#n.addScaleRow(e.type, n, this.#a);
    e.elements.elTarget = o, e.elements.elScale = l;
    let c;
    return e.type == "primary" ? (c = new je(this.core, e), this.#m = c) : (e.type = "secondary", e.name = e.view?.[0].name || "Secondary", e.shortName = e.view?.[0].type || "Secondary", c = new je(this.core, e)), this.chartPanes.set(c.id, c), this.chartPaneHeightsTally().total > this.#n.height, this.chartPaneDividersSet(), this.emit("chart_paneAdd", c), c;
  }
  chartPaneRemove(e) {
    if (!T(e) || !this.chartPanes.has(e) || e in this.#T) return !1;
    const i = this.chartPanes.get(e);
    if (i.isPrimary && !this.#i)
      return this.core.error(`Cannot remove primary chart pane! ${e}`), !1;
    this.#T[e] = !0;
    const { expanded: s } = this.chartPanesState();
    let n = s.indexOf(i);
    n > -1 && s.splice(n, 1);
    let r = i.viewport.height, o = Math.floor(r / s.length), l = r % o;
    if (i.status !== "destroyed" && (i.destroy(), this.#n.removeRow(i.id)), this.chartPanes.delete(e), this.setScaleWidth(), this.chartPanes.size === 1) {
      let c = this.chartPanes.values().next().value;
      c.collapsed && (c.collapsed.state = !1), c.setDimensions({ w: void 0, h: this.rowsH });
    } else
      for (let c of s)
        r = c.viewport.height, c.setDimensions({ w: void 0, h: r + o + l }), l = 0;
    return this.chartPaneDividersSet(), this.draw(this.range, !0), !0;
  }
  chartPaneRemoveRows() {
  }
  chartPaneHeightsTally() {
    const e = this.chartPanes.entries(), i = { panes: {}, total: 0 };
    for (let [s, n] of e)
      i.panes[s] = n, i.total += n.height;
    return i;
  }
  chartPaneHeightsCalc(e) {
    const { collapsed: i, expanded: s } = this.chartPanesState(), n = this.chartPanes.size + 1, r = this.#v * (n - 1), o = r / Math.log10(r * 2) / 100;
    Math.round(this.rowsH * o);
    const l = {};
    if (n === 1)
      l.new = this.rowsH;
    else if (n === 2 || s.length === 1) {
      let c = this.rowsH;
      const p = Math.round(c * this.#v / 100);
      l[s[0].id] = c - p, l.new = p;
    } else if (s.length === 2) {
      const c = s[0].viewport.height, p = s[1].viewport.height, f = c + p, b = Math.round(f * this.#v / 100), E = f / (f + b);
      l[s[0].id] = Math.floor(c * E), l[s[1].id] = Math.floor(p * E), l.new = Math.floor(b * E), l.new += f - (l[s[0].id] + l[s[1].id] + l.new);
    } else if (s.length >= 3) {
      let c = this.rowsH, p = 0, f;
      for (let b of i)
        c -= b.viewport.height;
      l.new = Math.floor(c / (s.length + 1)), c / (c + l.new), f = c - l.new;
      for (let b of s)
        l[b.id] = f * (b.viewport.height / c), p += l[b.id];
      l.new += c - p;
    }
    return l;
  }
  chartPaneMaximize(e) {
    if (!(e instanceof je)) return !1;
    const i = this.chartPaneMaximized, s = e.legend.list.chart.el.querySelector(".controls");
    let n;
    if (s.classList.toggle("maximized"), s.classList.toggle("restored"), e === i.instance)
      this.chartPanesRestore(), i.instance = null, i.panes = {}, e.collapsed.state && (e.graph.viewport.scene.canvas.style.display = "none", e.scale.graph.viewport.scene.canvas.style.visibility = "hidden");
    else {
      this.chartPanesRestore(), i.instance = e, i.rowsH = this.rowsH;
      for (let [r, o] of this.chartPanes.entries())
        i.panes[r] = o.element.clientHeight, n = o.element.style, e === o ? (n.display = "block", o.setDimensions({ w: void 0, h: this.rowsH }), o.graph.viewport.scene.canvas.style.display = "block", o.scale.graph.viewport.scene.canvas.style.visibility = "visible") : (n.display = "none", o.scale.element.style.display = "none");
      this.chartPaneDividersHide();
    }
    return this.emit("chart_paneRefresh", this), !0;
  }
  chartPanesRestore() {
    const e = this.chartPaneMaximized;
    let i = 0;
    this.emit("chart_paneRefresh", this), this.dimensions.height == e.height;
    for (let [s, n] of this.chartPanes.entries())
      n.element.style.display = "block", n.scale.element.style.display = "block", s in e.panes && i++ > 0 && n.Divider.show(), n.setDimensions({ w: void 0, h: e.panes[s] });
  }
  chartPaneCollapse(e) {
    if (!(e instanceof je)) return !1;
    this.emit("chart_paneRefresh", this);
    const i = e.legend.list.chart.el.querySelector(".controls"), s = e.collapsed;
    let n = e.element.clientHeight, r, o, l;
    const { list: c, collapsed: p, expanded: f } = this.chartPanesState();
    if (r = p.indexOf(e), r > -1 && p.splice(r, 1), r = f.indexOf(e), r > -1 && f.splice(r, 1), e.collapsed.state) {
      i.classList.remove("collapsed"), i.classList.add("expanded"), s.rowsCnt !== c.length ? n = s.height * (s.rowsCnt / c.length) : s.rowsHeight !== this.rowsH ? n = s.height * (s.rowsHeight / this.rowsH) : n = s.height, o = (n - Cn) / f.length;
      for (let b of f)
        l = b.element.clientHeight - o, b.setDimensions({ w: void 0, h: l });
      e.collapse(n);
    } else {
      if (i.classList.add("collapsed"), i.classList.remove("expanded"), c.length < 2 || f.length < 1) return !1;
      n = (e.element.clientHeight - Cn) / f.length;
      for (let b of f)
        l = b.element.clientHeight + n, b.setDimensions({ w: void 0, h: l });
      e.collapse();
    }
    return this.chartPaneDividersSet(), !0;
  }
  chartPaneDividersSet() {
    const { list: e } = this.chartPanesState();
    let i = 0;
    for (let s of e)
      s.Divider instanceof xe && i++ > 0 && (s.Divider.setWidth(), s.Divider.setPos(), s.Divider.show());
  }
  chartPaneDividersHide() {
    const { list: e } = this.chartPanesState();
    for (let i of e)
      i.Divider instanceof xe && i.Divider.hide();
  }
  validateIndicators() {
    const e = (s) => v(s) && (s.type in this.core.indicatorClasses || dg.includes(s.type)), i = (s) => L(s) ? (s.forEach((n, r) => {
      e(n) || (this.core.log(`TradeX-Chart : ${this.core.id} : indicator ${n?.type} not added: not supported.`), s.splice(r, 1));
    }), !s.length) : !1;
    this.inventory.forEach((s, n) => {
      i(s[1]);
    });
  }
  addIndicator(e, i = e, s = {}) {
    let n, r, o = this.indicatorClasses[e]?.primaryPane;
    if (!T(e) || !(e in this.indicatorClasses) || !T(i)) return;
    switch (this.log(`Adding the ${i} : ${e} indicator`), v(s) ? (L(s?.data) || (s.data = []), v(s?.settings) || (s.settings = {})) : s = { data: [], settings: [] }, o) {
      case !0:
      case !1:
        break;
      case void 0:
      case "both":
        o = q(s.settings?.isPrimary) ? s.settings.isPrimary : !0;
    }
    if (s.settings.isPrimary = o, o) {
      const c = {
        type: e,
        name: i,
        ...s
      };
      if (n = this.#m.addIndicator(c), !n) return;
      r = "primary";
    } else {
      L(s.view) || (s.view = [{ name: i, type: e, ...s }]);
      for (let c = 0; c < s.view.length; c++)
        (!v(s.view[c]) || !Wn(["name", "type"], Object.keys(s.view[c]))) && s.view.splice(c, 1);
      if (s.view.length == 0 || (s.parent = this, s.title = i, s.elements = { ...this.elements }, s.yAxisPadding = this.core.indicatorClasses[e]?.yAxisPadding || 1, n = this.chartPaneAdd(s), !n)) return;
      n.start(), r = "secondary", this.emit("chart_secondaryAdd", n);
    }
    const l = "instance" in n ? n.instance.id : n.id;
    return this.refresh(), this.core.state.addIndicator(n, r), this.core.log("Added indicator:", l), this.emit("chart_IndicatorAddDone", n), n;
  }
  getIndicators() {
    const e = {};
    return this.chartPanes.forEach(
      (i, s) => {
        e[s] = i.indicators;
      }
    ), e;
  }
  getIndicatorsByType(e) {
    const i = [];
    if (!T(e)) return i;
    for (let s of this.chartPanes.values())
      for (let n in s.indicators) {
        let r = s.indicators[n].instance;
        (r.shortName == e || r.libName == e) && i.push(r);
      }
    return i;
  }
  getIndicator(e) {
    if (!T(e)) return !1;
    for (const i of this.chartPanes.values())
      if (e in i.indicators)
        return i.indicators[e].instance;
    return !1;
  }
  removeIndicator(e) {
    if (T(e))
      for (const i of this.chartPanes.values())
        e in i.indicators && (e = i.indicators[e].instance);
    return e instanceof z ? (e.chart.type === "primaryPane" || Object.keys(e.chart.indicators).length > 1 ? (e.remove(), this.emit("chart_paneRefresh", this)) : e.chart.remove(), !0) : !1;
  }
  indicatorSettings(e, i) {
    if (T(e)) {
      for (const s of this.chartPanes.values())
        if (e in s.indicators)
          return s.indicators[e].instance.settings(i);
    } else return e instanceof z ? e.settings(i) : !1;
  }
  createGraph() {
    let e = re(ug);
    this.graph = new ht(this, this.#l, e);
  }
  draw(e = this.range, i = !1) {
    e = v(e) ? e : this.range;
    const s = [
      this.graph,
      this.#f
    ];
    this.time.xAxis.doCalcXAxisGrads(e), this.chartPanes.forEach((n, r) => {
      n.status !== "destroyed" ? s.push(n) : this.error(`ERROR: attempted to draw destroyed pane: ${n.id}`);
    }), this.renderLoop.queueFrame(
      this.range,
      s,
      i
    );
  }
  refresh() {
    if (this.core.Chart?.graph instanceof ht) {
      this.renderLoop.expungeFrames(), this.core.Chart.graph.refresh();
      for (let [e, i] of this.chartPanes)
        i?.graph?.refresh();
      this.draw(this.range, !0);
    }
  }
  updateRange(e) {
    this.core.updateRange(e);
  }
  zoomRange() {
    this.draw(this.range, !0);
  }
}
const no = "state", mg = "defaultState", Ai = {
  version: fr,
  id: mg,
  key: "",
  status: "default",
  isEmpty: !0,
  allData: {},
  chart: {
    name: "Primary",
    type: "candles",
    candleType: "CANDLE_SOLID",
    indexed: !1,
    data: [],
    settings: {}
  },
  ohlcv: [],
  inventory: [],
  primary: [],
  secondary: [],
  datasets: [],
  tools: {
    display: !0,
    data: {
      ts: {}
    }
  },
  trades: {
    display: !0,
    displayInfo: !0,
    data: {
      ts: {}
    }
  },
  events: {
    display: !0,
    displayInfo: !0,
    data: {
      ts: {}
    }
  },
  annotations: {
    display: !0,
    displayInfo: !0,
    data: {
      ts: {}
    }
  },
  range: {
    intervalStr: Zi,
    interval: vt,
    timeFrame: Zi,
    timeFrameMS: vt,
    initialCnt: xn
  }
}, pg = {
  chart: "object",
  ohlcv: "array",
  range: "object"
}, nh = {
  timestamp: "number",
  id: "string",
  side: "string",
  price: "number",
  amount: "number",
  filled: "number",
  average: "number",
  total: "number",
  tag: "string"
}, rh = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string",
  url: "string"
}, fg = {
  timestamp: "number",
  id: "string",
  title: "string",
  content: "string"
}, gg = {
  timestamp: "number",
  id: "string",
  type: "string",
  nodes: "array"
}, an = {
  trades: nh,
  events: rh,
  annotations: fg,
  tools: gg
};
class A {
  static #e = new fe();
  static #t = {};
  static get default() {
    return re(Ai);
  }
  static server(e) {
    if (!hn(e)) return;
    let i = new fe();
    A.#e.has(e.key) || A.#e.set(e.key, { chart: e, states: i, active: void 0 });
  }
  static chartList(e) {
    if (hn(e)) return A.#e.has(e.key) ? A.#e.get(e.key) : void 0;
  }
  static create(e, i = A.default, s = !1, n = !1) {
    if (!hn(e)) return;
    i.core = e;
    const r = new A(i, s, n), o = r.key;
    let l = A.#e.get(e.key);
    return l || (A.server(e), l = A.#e.get(e.key), l.active = r), l.states.set(o, r), r;
  }
  static active(e) {
    return A.chartList(e)?.active;
  }
  static list(e) {
    let i = A.chartList(e)?.states;
    if (i)
      return Array.from(
        i,
        ([s, n]) => ({ key: s, value: n })
      );
  }
  static use(e, i = A.default) {
    let s = A.has(e, i) ? i : A.has(e, i?.key) ? i.key : i;
    if (!T(s) && v(i) && Object.keys(i).length > 2) {
      let l = A.hash(i);
      s = `${nt}_${no}_${l}`, A.has(e, s) || (s = A.create(e, i).key);
    } else if (!T(s) && !v(i)) return;
    const n = A.#e.get(e.key);
    n.active;
    let r = n.active, o = n.states.get(s);
    if (!o) {
      e.log(`${e.name} id: ${e.key} : State ${s} does not exist`);
      return;
    }
    if (s != r?.key && (n.previous = { state: r, node: "" }, r = o, v(r?.archive))) {
      let l = T(r?.archive?.data) ? r?.archive.data : "", c = r.archive?.compress ? l.decompress() : l, p = JSON.parse(c);
      delete r.archive;
      const f = Xi(A.default);
      A.buildInventory(p, f), r.allData.primaryPane = p.primary, r.allData.secondaryPane = p.secondary, r.data.inventory = p.inventory;
    }
    return n.active = r, r;
  }
  static archive(e, i) {
    if (!A.findStateById(e, i)) return !1;
  }
  static findStateById(e, i) {
    let s = A.chartList(e)?.states;
    if (s) {
      for (let n of s)
        if (n[1].id == i) return n[1].key;
    }
  }
  static hash(e) {
    let i = JSON.stringify(e);
    return Gn(i);
  }
  static isValidConfig(e) {
    if (!v(e) || !Object.keys(e).length)
      return !1;
    for (let [i, s] of Object.entries(pg))
      if (fo(e?.[i]) === s)
        return !0;
    return !1;
  }
  static validate(e, i = A.default, s = !1, n = !1) {
    const r = Xi(A.default);
    let o;
    if (v(i) || (i = r), !(i.core instanceof B)) throw new Error("State : invalid TradeXchart instance");
    v(i.chart) || (i.chart = r.chart, i.chart.data = L(i?.ohlcv) ? i.ohlcv : [], i.isEmpty = !0, i.status = "default", delete i?.ohlcv), o = _e(r, i), s ? o.chart.data = Of(o.chart.data, n) ? o.chart.data : [] : o.chart.data = Af(o.chart.data, n) ? o.chart.data : [], o.chart.isEmpty = o.chart.data.length == 0, Object.defineProperty(
      o.allData,
      "data",
      {
        get: function() {
          return o.chart.data;
        }
      }
    ), v(o.chart.settings) || (o.chart.settings = r.chart.settings), L(o.inventory) || (o.inventory = r.inventory), L(o.primary) || (o.primary = r.primary), o.allData.primaryPane = o.primary, L(o.secondary) || (o.secondary = r.secondary), o.allData.secondaryPane = o.secondaryPane, L(o.datasets) || (o.datasets = []), o.allData.datasets = o.datasets, A.buildInventory(o, r), A.validateData("trades", o), o.trades = o.allData.trades, A.validateData("events", o), o.events = o.allData.events, A.validateData("annotations", o), o.annotations = o.allData.annotations, A.validateData("tools", o), o.tools = o.allData.tools;
    for (var l of o.datasets)
      this.#t || (this.#t = {}), this.#t[l.id] = new Ff(this, l);
    return o;
  }
  static delete(e, i) {
    let s = A.chartList(e)?.states;
    if (!s) return;
    let n = i;
    return i instanceof A && (n = i.#n), !T(n) || !s.has(n) ? !1 : (s.delete(n), !0);
  }
  static has(e, i) {
    return A.chartList(e)?.states?.has(i);
  }
  static get(e, i) {
    return A.chartList(e)?.states?.get(i);
  }
  static getKey(e, i) {
    let s = i;
    return v(i) && Object.keys(i).length < 3 ? T(i?.id) ? s = A.findStateById(e, i.id) || i?.key : T(i?.key) ? s = i?.key : s = void 0 : T(i) || (s = void 0), s;
  }
  static setTimeFrame(e, i, s) {
    let n = A.get(e, i), r;
    return n ? (n.isEmpty && L(s) && s.length > 1 && (r = Ni(s), n.range.interval = r, n.range.intervalStr = at(r), e.emit("range_timeframeSet", n.range.intervalStr)), r) : !1;
  }
  static ohlcv(e) {
    if (!L(e)) return !1;
    let i = {
      time: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    }, s = 0, n = e.length;
    for (; n != 0 && s < n; ) {
      let r = e[s];
      i.time.push(r[he.t]), i.open.push(r[he.o]), i.high.push(r[he.h]), i.low.push(r[he.l]), i.close.push(r[he.c]), i.volume.push(r[he.v]), s++;
    }
    return i;
  }
  static export(e, i, s = {}) {
    if (!A.has(e, i)) return;
    v(s) || (s = {});
    const n = A.get(e, i), r = s?.type;
    let o, l = {}, c = [
      "core",
      "inventory",
      "range",
      "timeData"
    ];
    for (let N in n.data)
      c.includes(N) || (l[N] = re(n.data[N]));
    let p = l.chart.data;
    p.length > 0 && p[p.length - 1].length > 6 && (p.length = p.length - 1), l.inventory = L(l.inventory) ? Array.from(l.inventory) : [], l.version = fr, l.key = n.key, l.range = n.range.export();
    let { indexed: f, timeFrame: b, timeFrameMS: E, timeZone: M, timeZoneOffset: D } = { ...n.data.timeData };
    switch (l.timeData = { indexed: f, timeFrame: b, timeFrameMS: E, timeZone: M, timeZoneOffset: D }, r) {
      case "json":
      default:
        const { replacer: N, space: K } = { ...s };
        o = JSON.stringify(l, N, K), s?.compress && (o = o.compress());
    }
    return o;
  }
  static asyncExport(e, i, s = {}) {
    return new Promise(
      (n, r) => {
        try {
          n(A.export(e, i, s));
        } catch (o) {
          e.error(o), r();
        }
      }
    );
  }
  static validateData(e, i) {
    if (!T(e) || !(e in an) || !v(i)) throw new Error(`ERROR: State: validateData: ${e} unexpected data`);
    if (v(i[e]) || (i[e] = re(Ai[e])), i[e].display = !!i[e]?.display, i[e].displayInfo = !!i[e]?.displayInfo, !v(i[e].data)) i[e].data = re(Ai[e].data);
    else {
      let s = i[e].data, n = i?.data?.allData || i.allData, r = i.range.timeFrame;
      A.importData(e, s, n, r);
    }
  }
  static archiveInventory(e) {
    if (e.data.inventory.length = 0, e.core.ChartPanes instanceof fe)
      for (let [i, s] of e.core.ChartPanes) {
        let n = [], r = [];
        r[0] = s.isPrimary ? "primary" : "secondary";
        for (let o of Object.values(s.indicators))
          n.push(o.instance.snapshot());
        r[1] = n, r[2] = s.snapshot(), e.data.inventory.push(r);
      }
  }
  static buildInventory(e, i) {
    if (e.inventory.length == 0) {
      e.inventory.push(["primary", e.primary]);
      let o = L(e?.secondary) ? e.secondary : [];
      for (let l of o)
        (v(l) || kn(l, "object")) && e.inventory.push(["secondary", l]);
    }
    let s = e.inventory, n = s.length;
    for (; n--; )
      if (!L(s[n]) || s[n].length == 0)
        s.splice(n, 1);
      else {
        let o = e.inventory[n][1], l = o.length;
        for (; l--; )
          !v(o[l]) || !T(o[l].name) || !T(o[l].type) ? o.splice(l, 1) : v(o[l].settings) || (o[l].settings = {});
        s[n].length == 0 && s.splice(n, 1);
      }
    e.inventory.length == 0 && (e.inventory[0] = ["primary", i.primary]);
    let r = 0;
    e.inventory.forEach((o, l) => {
      o[0] == "primary" && ++r > 1 && e.inventory.splice(l, 1);
    }), r || e.inventory.push(["primary", i.primary]);
  }
  static importData(e, i, s, n) {
    if (!(e in an)) return !1;
    v(s?.[e]) || (s[e] = re(Ai[e]));
    let r = s[e].data;
    if (v(r?.[n]) || (r[n] = {}), !v(i)) return !1;
    for (let o in i)
      if (di(o * 1) && L(i[o]))
        for (let l of i[o])
          l?.id && (l.id = `${l.id}`), A.isValidEntry(l, an[e]) && (v(r?.[n]) || (r[n] = {}), L(r[n]?.[o]) || (r[n][o] = []), r[n][o].push(l));
      else
        r[o] = i[o];
    return !0;
  }
  static isValidEntry(e, i) {
    const s = Object.keys(e), n = Object.keys(i);
    if (!v(e) || !rs(s, n)) return !1;
    for (let r of n)
      if (typeof e[r] !== i[r]) return !1;
    return !0;
  }
  static buildRange(e, i, s) {
    let n = i.core.config.range, r = i.range, o = Ni(i.chart.data);
    o === 1 / 0 && (o = r.timeFrameMS || vt), !i.chart.isEmpty && i.chart.data.length > 1 && r.timeFrameMS !== o && (r.timeFrameMS = o), Yo(r.timeFrameMS) || (r.timeFrameMS = vt), r.timeFrame = at(r.timeFrameMS);
    let l = {
      core: s,
      state: e,
      interval: r.timeFrame || n?.timeFrameMS,
      initialCnt: r?.initialCnt || n?.initialCnt,
      limitFuture: r?.limitFuture || n?.limitFuture,
      limitPast: r?.limitPast || n?.limitPast,
      minCandles: r?.minCandles || n?.minCandles,
      maxCandles: r?.maxCandles || n?.maxCandles,
      yAxisBounds: r?.yAxisBounds || n?.yAxisBounds
    };
    return new Yi(r?.start, r?.end, l);
  }
  #i = "";
  #n = "";
  #s = {};
  #r = {};
  #a = !1;
  #o = !0;
  #c;
  #l;
  #u;
  #h;
  #d = new fe();
  #m = {
    instance: null,
    rowsH: 0,
    panes: {}
  };
  constructor(e = A.default, i = !1, s = !1) {
    if (!(e?.core instanceof B)) throw new Error("State : invalid TradeXchart instance");
    this.#h = e.core, this.#s = A.validate(this, e, i, s), this.#s.range = A.buildRange(this, this.#s, e.core), this.#s.timeData = new nl(this.#s.range), this.#s.chart.ohlcv = A.ohlcv(this.#s.chart.data);
    let n = A.hash(e);
    this.#n = `${nt}_${no}_${n}`;
  }
  get id() {
    return this.#i;
  }
  get key() {
    return this.#n;
  }
  get status() {
    return this.#s.status;
  }
  get isEmpty() {
    return this.#s.isEmpty;
  }
  get core() {
    return this.#h !== void 0 ? this.#h : !1;
  }
  get data() {
    return this.#s;
  }
  get gaps() {
    return this.#r;
  }
  get time() {
    return this.#s.timeData;
  }
  get range() {
    return this.#s.range;
  }
  get chartPanes() {
    return this.#d;
  }
  get chartPaneMaximized() {
    return this.#m;
  }
  get allData() {
    return {
      data: this.#s.chart.data,
      ohlcv: this.#s.chart.ohlcv,
      primaryPane: this.#s.primary,
      secondaryPane: this.#s.secondary,
      datasets: this.#s.datasets,
      trades: this.#s.trades.data,
      events: this.#s.events.data,
      annotations: this.#s.annotations.data,
      tools: this.#s.tools.data
    };
  }
  get trades() {
    return this.#s.trades;
  }
  get events() {
    return this.#s.events;
  }
  get annotations() {
    return this.#s.annotations;
  }
  get tools() {
    return this.#s.tools;
  }
  error(e) {
    this.#h.error(e);
  }
  create(e = A.default, i = !0, s = !1) {
    return A.create(e, i, s);
  }
  delete(e) {
    let i = this.#h, s;
    if (e instanceof A ? s = e.key : T(e) ? s = e : v(e) && T(e.key) ? s = e.key : v(e) && T(e.id) && this.getByID(e.id) ? s = this.getByID(e.id)?.key : i.error(`${i.name} : State.delete() : State not found`), s !== this.key)
      this.has(s) && A.delete(i, s);
    else if (this.has(s)) {
      const n = this.create();
      this.use(n?.key), A.delete(i, s);
    } else
      return i.error(`${i.name} : State.use() : State not found`), !1;
    return !0;
  }
  list() {
    return A.list(this.#h);
  }
  has(e) {
    return A.has(this.#h, e);
  }
  get(e) {
    return A.get(this.#h, e);
  }
  getByID(e) {
    let i = A.list(this.#h);
    if (!(!i || !T(e))) {
      for (let s of i)
        if (s.id == e) return s;
    }
  }
  use(e) {
    const i = `TradeX-Chart id: ${this.#h.id} : cannot use supplied key or state`;
    if (T(e) && !A.has(e))
      return;
    if (e === void 0)
      e = A.default;
    else if (!A.isValidConfig(e)) {
      this.#h.log(i);
      return;
    }
    _(this.#h.MainPane?.init) && (this.#h.stream instanceof st && this.#h.stream.stop(), this.#h.progress.start(), A.archiveInventory(this), this.#h.MainPane.destroy(!1));
    let s = A.use(this.#h, e);
    return v(e) && (e.key = s?.key), _(this.#h.MainPane?.init) && (this.#h.MainPane.init(this.#h.MainPane.options), this.#h.MainPane.start(), this.#h.MainPane.refresh(), this.#h.progress.stop()), s || this.#h.log(i), s;
  }
  export(e = this.key, i = {}) {
    return A.export(this.#h, e, i = {});
  }
  mergeData(e, i = !1, s = !1) {
    this.isEmpty && A.setTimeFrame(this.#h, this.key, e?.ohlcv);
    let n = this.range.timeFrameMS;
    if (!v(e))
      return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let r = L(e?.ohlcv) ? e.ohlcv.length - 1 : 0;
    if (r > 1 && n !== Ni(e?.ohlcv))
      return this.error(`ERROR: ${this.core.ID}: merge data time frame does not match existing time frame!`), !1;
    (this.isEmpty || !P(n)) && (!v(i) || !k(i.start) || !k(i.end)) && r > 1 && (i = { start: r - this.range.initialCnt, end: r }), v(i) ? (k(i?.startTS) ? i.start = i.startTS : i.start = k(i.start) ? this.range.value(i.start)[0] : this.range.timeMin, k(i?.endTS) ? i.end = i.endTS : i.end = k(i.end) ? this.range.value(i.end)[0] : this.range.timeMax) : (i = {}, i.start = this.range.timeMin, i.end = this.range.timeMax);
    let o, l, c = e?.ohlcv || !1;
    const p = this.allData.data, f = this.allData?.primaryPane, b = e?.primary || !1, E = this.allData?.secondaryPane, M = e?.secondary || !1, D = this.allData?.dataset?.data, N = e?.dataset?.data || !1;
    this.allData?.trades;
    const K = e?.trades || !1;
    this.allData?.events, e?.events;
    const oe = L(c) && this.range.inRange(c[0][0]) ? 1 : 0, $ = {};
    if (L(c) && c.length > 0) {
      if (o = c.length - 1, p.length - 1, $.mData = this.range.inRange(c[0][0]) && this.range.inRange(c[0][o]), !q(c[o][7]) && c[o].length !== 8 && c[o][6] !== null && c[o][7] !== !0 ? c = If(c) : i.end >= this.range.timeFinish && i.start <= this.range.timeFinish && (i.start += this.range.interval, i.end += this.range.interval), p.length == 0) {
        let I = A.ohlcv(c);
        this.allData.data.push(...c), this.allData.ohlcv = { ...I };
      } else {
        let I = c[0][0], H = c[c.length - 1][0], ue = (c.length - 1) * n;
        H > I + ue && (c = Df(c, n)), this.data.chart.data = this.merge(p, c);
      }
      if (s) this.#h.calcAllIndicators(s);
      else {
        if (L(b) && b.length > 0) {
          for (let I of b)
            if (L(I?.data) && I?.data.length > 0)
              for (let H of f)
                v(H) && H.name === I.name && H.type === I.type && Jt(H.settings, I.settings) && (H.data = this.merge(H.data, I.data), this.#h.getIndicator(H.id).drawOnUpdate = !0);
        }
        if (L(M) && M.length > 0) {
          for (let I of M)
            if (L(I?.data) && I?.data.length > 0)
              for (let H of E)
                v(H) && H.name === I.name && H.type === I.type && Jt(H.settings, I.settings) && (H.data = this.merge(H.data, I.data), this.#h.getIndicator(H.id).drawOnUpdate = !0);
        }
        this.#h.calcAllIndicators();
      }
      if (L(N) && N.length > 0) {
        for (let I of N)
          if (L(I?.data) && I?.data.length > 0)
            for (let H of D)
              H.name === I.name && H.type === I.type && Jt(H.settings, I.settings) && (H.data = this.merge(H.data, I.data));
      }
      v(K) && A.importTrades(K, this.allData, this.time.timeFrame), i && (v(i) ? (l = k(i.start) ? this.range.getTimeIndex(i.start) : this.range.indexStart, r = k(i.end) ? this.range.getTimeIndex(i.end) : this.range.indexEnd) : (c[0][0] && (l = this.range.indexStart + oe), r = this.range.indexEnd + oe), this.#h.setRange(l, r));
      let te, X = !1;
      for (te in $)
        X = X || te;
      return e.ohlcv.length > 1 && this.#h.emit("state_mergeComplete"), X && this.#h.refresh(), this.#s.isEmpty = !1, !0;
    }
  }
  merge(e, i) {
    let s = [], n, r;
    if (e[0][0] < i[0][0] ? (n = e, r = i) : (n = i, r = e), r.length == 1 && r[0][0] == n[n.length - 1][0])
      n[n.length - 1] = r[0], s = n;
    else if (r.length == 1 && r[0][0] == n[n.length - 1][0] + this.range.interval)
      s = n.concat(r);
    else if (n[n.length - 1][0] >= r[0][0]) {
      let o = 0;
      for (; n[o][0] < r[0][0]; )
        s.push(n[o]), o++;
      s = s.concat(r);
      let l = o + r.length;
      l < n.length && (s = s.concat(n.slice(l)));
    } else if (r[0][0] - n[n.length - 1][0] > this.range.interval) {
      s = n;
      let o = n.length, l = this.gaps, c = n[o - 1][0], p = Math.floor((r[0][0] - c) / this.range.interval);
      for (p; p > 1; p--) {
        c += this.range.interval, l[`${c}`] = [...n[o - 1]], l[`${c}`][0] = c;
        let f = Array(r[0].length).fill(null);
        f[0] = c, s.push(f);
      }
      s = s.concat(r);
    } else
      s = n.concat(r);
    return s;
  }
  addIndicator(e, i) {
    if (v(e) && i == "primary")
      e.params.overlay.id = e.instance.id, this.#s.primary.push(e.params.overlay);
    else if (e instanceof je && i == "secondary")
      this.#s.secondary.push(...e.options.view), this.range.maxMinDatasets();
    else return !1;
  }
  removeIndicator(e) {
    if (!T(e)) return !1;
    const i = (s, n) => {
      const r = this.data[s];
      for (let o = 0; o < r.length; o++)
        if (r[o].id == n)
          return r.splice(o, 1), this.range.maxMinDatasets(), !0;
      return !1;
    };
    return !!(i("primary", e) || i("secondary", e));
  }
  addTrade(e) {
    if (!A.isValidEntry(e, nh)) return !1;
    const i = e.timestamp - e.timestamp % tfMS, s = new Date(i);
    return e.dateStr = `${s.getFullYear()}/${s.getMonth() + 1}/${s.getDate()} ${s.getHours()}:${s.getMinutes()}`, this.allData.trades.data.ts[e.timestamp] = e, this.allData.trades.data[tf][i] = e, this.#h.emit("state_tradeAdded", e), this.#h.emit("trade_added", e), !0;
  }
  removeTrade(e) {
    console.log("TODO: state.removeTrade()");
  }
  addEvent(e) {
    if (!A.isValidEntry(e, rh)) return !1;
    const i = t.timestamp - e.timestamp % tfMS, s = new Date(i);
    return e.dateStr = `${s.getFullYear()}/${s.getMonth() + 1}/${s.getDate()} ${s.getHours()}:${s.getMinutes()}`, this.allData.events.data.ts[e.timestamp] = e, this.allData.events.data[tf][i] = e, this.#h.emit("state_eventAdded", e), this.#h.emit("event_added", e), !0;
  }
  removeEvent(e) {
    console.log("TODO: state.removeEvent()");
  }
}
const ro = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class $e {
  static #e = new fe();
  static get list() {
    return $e.#e;
  }
  #t;
  static create(e, i) {
    if (!v(e)) return !1;
    e.id = T(e.name) ? ae(e.name) : ae(`${i.id}_theme`);
    const s = new $e(e, i);
    return $e.list.set(e.id, s), s;
  }
  constructor(e, i) {
    this.#t = i, this.setCurrent(e);
  }
  get list() {
    return $e.list;
  }
  setCurrent(e = {}) {
    e = v(e) ? e : {};
    const i = re(cs), s = re(e), n = _e(i, s);
    for (let r in n)
      ro.includes(r) || (this[r] = n[r]);
    this.#t.refresh();
  }
  setTheme(e) {
    if (T(e) && $e.list.has(e)) {
      const i = $e.list.get(e);
      return this.setCurrent(i), !0;
    }
    return !1;
  }
  setProperty(e, i) {
    if (!T(e)) return;
    const s = fn(this, e), n = e.split(".");
    if (n.length == 1)
      this[n[0]] = i;
    else {
      let r = n.shift();
      this[r] = Vn(this[r], n.join("."), i);
    }
    return this.#t.refresh(), s;
  }
  getProperty(e) {
    return fn(this, e);
  }
  deleteTheme(e) {
    return T(e) && $e.list.has(e) ? ($e.list.delete(e), !0) : !1;
  }
  exportTheme(e = {}) {
    v || (e = {});
    const i = e?.type, s = {};
    let n;
    for (let r in this)
      ro.includes(r) || (s[r] = this[r]);
    switch (i) {
      case "json":
      default:
        const { replacer: r, space: o } = { ...e };
        n = JSON.stringify(s, r, o);
    }
    return n;
  }
}
class yg {
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
class vg {
  #e;
  #t;
  #i;
  #n = 0;
  #s = {};
  #r;
  #a = !0;
  constructor(e, i, s, n) {
    this.#e = e, this.#t = s, this.#i = n;
    const r = `
      ${An.ThreadWorker.toString()};
      const fn = ${i}
      const worker = new ThreadWorker(fn)
    `, o = new Blob([`;(async () => {${r}})().catch(e => {console.error(e)})`], { type: "text/javascript" }), l = URL.createObjectURL(o);
    this.#r = new Worker(l), setTimeout(function(c) {
      try {
        URL.revokeObjectURL(c);
      } catch {
      }
    }, 500, l);
  }
  get id() {
    return this.#e;
  }
  get req() {
    return `r_${this.#n++}`;
  }
  get cb() {
    return this.#t;
  }
  set cb(e) {
    this.#t = e;
  }
  onmessage(e) {
    return this.#a = !0, _(this.#t) ? this.#t(e) : e;
  }
  onerror(e) {
    return this.#a = !0, _(this.#i) ? this.#i(e) : e;
  }
  postMessage(e) {
    return new Promise((i, s) => {
      try {
        let n = this.req;
        this.#s[n] = { resolve: i, reject: s }, this.#a = !1, this.#r.postMessage({ r: n, data: e }), this.#r.onmessage = (r) => {
          const { r: o, status: l, result: c } = r.data;
          if (o in this.#s) {
            const { resolve: p, reject: f } = this.#s[o];
            delete this.#s[o], l ? p(this.onmessage(c)) : f(this.onerror({ r: o, result: c }));
          } else if (l == "resolved")
            this.onmessage(c);
          else
            throw new Error("Orphaned thread request ${r}");
        }, this.#r.onerror = (r) => {
          s(this.onerror(r));
        };
      } catch (n) {
        this.#a = !0, s(n);
      }
    });
  }
  terminate() {
    this.#r.terminate();
  }
}
class An {
  static #e = /* @__PURE__ */ new Map();
  static ThreadWorker = yg;
  static Thread = vg;
  static create(e, i = "worker", s, n) {
    if (typeof window.Worker > "u") return !1;
    if (_(e))
      e = e.toString();
    else if (T(e))
      e = e.trim().match(
        /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
      )[1];
    else
      return !1;
    return i = T(i) ? ae(i) : ae("worker"), this.#e.set(i, new this.Thread(i, e, s, n)), this.#e.get(i);
  }
  static destroy(e) {
    if (!T(e)) return !1;
    this.#e.get(e).terminate(), this.#e.delete(e);
  }
  static end() {
    this.#e.forEach((e, i, s) => {
      this.destroy(i);
    });
  }
}
class bg extends Se {
  constructor(e) {
    super(e);
  }
}
class Oi extends Se {
  #e = ao.colour;
  #t = ao.width;
  #i;
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
    this.#t = P(e) ? e : this.#t;
  }
  get lineWidth() {
    return this.#t;
  }
  set stateMachine(e) {
    this.#i = new fs(e, this);
  }
  get stateMachine() {
    return this.#i;
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
class wg extends Se {
  constructor(e) {
    super(e);
  }
}
class xg extends Se {
  constructor(e) {
    super(e);
  }
}
class Cg extends Se {
  constructor(e) {
    super(e);
  }
}
const Tg = [
  {
    id: "cursor",
    name: "Cursor",
    icon: cd,
    event: "tool_activated"
  },
  {
    id: "line",
    name: "Line",
    icon: mt,
    event: "tool_activated",
    class: Oi,
    sub: [
      {
        id: "ray",
        name: "Ray",
        icon: mt,
        event: "tool_activated",
        class: Oi
      },
      {
        id: "hRay",
        name: "Horizontal Ray",
        icon: mt,
        event: "tool_activated",
        class: Oi
      },
      {
        id: "vRay",
        name: "Vertical Ray",
        icon: mt,
        event: "tool_activated",
        class: Oi
      }
    ]
  },
  {
    id: "fibonacci",
    name: "Fibonacci",
    icon: dd,
    event: "tool_activated",
    class: bg,
    sub: [
      {
        id: "fib",
        name: "Not Implemented Yet",
        icon: mt
      }
    ]
  },
  {
    id: "range",
    name: "Range",
    icon: pd,
    event: "tool_activated",
    class: xg,
    sub: [
      {
        id: "rng",
        name: "Not Implemented Yet",
        icon: mt
      }
    ]
  },
  {
    id: "text",
    name: "Text",
    icon: fd,
    event: "tool_activated",
    class: Cg,
    sub: [
      {
        id: "txt",
        name: "Not Implemented Yet",
        icon: mt
      }
    ]
  },
  {
    id: "measure",
    name: "Measure",
    icon: md,
    event: "tool_activated",
    class: wg
  },
  {
    id: "delete",
    name: "Delete",
    icon: ud,
    event: "tool_activated",
    class: void 0
  }
], ao = {
  colour: "#8888AACC",
  width: 1
}, on = {
  id: "template",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(a) {
        console.log("idle: onEnter");
      },
      onExit(a) {
        console.log("idle: onExit");
      },
      on: {
        tool_activated: {
          target: "tool_activated",
          action(a) {
            this.context.origin.onToolActivated(a);
          }
        },
        tool_selected: {
          target: "tool_selected",
          action(a) {
            this.context.origin.onToolSelected(a);
          }
        },
        tool_deselected: {
          target: "tool_deselected",
          action(a) {
            this.context.origin.onToolDeselected(a);
          }
        },
        tool_deleted: {
          target: "tool_deleted",
          action(a) {
            this.context.origin.onToolDeleted(a);
          }
        }
      }
    },
    tool_activated: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        tool_selected: {
          target: "tool_addToTarget",
          action(a) {
            this.context.origin.onToolTargetSelected(a);
          }
        }
      }
    },
    tool_selected: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {}
    },
    tool_deselected: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        always: {
          target: "idle",
          condition: "toolTarget",
          action(a) {
          }
        }
      }
    },
    tool_deleted: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        always: {
          target: "idle",
          condition: "toolTarget",
          action(a) {
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
class ah extends Ct {
  #e = "Toolbar";
  #t = "tools";
  #i;
  #n;
  #s = Se;
  #r;
  #a = {};
  #o = void 0;
  #c;
  #l = { click: [], pointerover: [] };
  #u = [];
  constructor(e, i) {
    super(e, i), this.#i = e.elTools, this.#r = Tg || e.config.tools, this.#n = e.WidgetsG, this.init();
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ve(this.#i);
  }
  init() {
    this.mount(this.#i);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), on.id = this.id, on.context = this, this.stateMachine = on, this.stateMachine.start(), this.log(`Tool Bar ${this.#e} instantiated and running`);
  }
  destroy() {
    this.core.hub.expunge(this);
    const e = this.id, i = this.#i.querySelectorAll(".icon-wrapper");
    for (let s of i)
      for (let n of this.#r)
        n.id === e && s.removeEventListener("click", this.#l[e].click), s.removeEventListener("pointerover", this.#l[e].pointerover), s.removeEventListener("pointerout", this.#l[e].pointerout);
    this.stateMachine.destroy();
  }
  eventsListen() {
    this.on("tool_selected", this.onToolSelect, this), this.on("tool_deselected", this.onToolDeselect, this);
  }
  onResized() {
    for (let e of this.#u)
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
    i.style.fill = tt.COLOUR_ICON;
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = tt.COLOUR_ICONHOVER;
  }
  onToolTargetSelected(e) {
    console.log("tool_targetSelected:", e.target), this.#c = e.target;
  }
  onToolActivated(e) {
    console.log("Tool activated:", e), this.#o = e;
  }
  onToolSelect(e) {
    console.log("Tool selected:", e);
  }
  onToolDeselect(e) {
    console.log("Tool deselected:", e);
  }
  mount(e) {
    e.innerHTML = this.#i.defaultNode(this.#r);
  }
  initAllTools() {
    const e = this.#i.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      let s = i.id, n = i.querySelector("svg");
      n.style.fill = tt.COLOUR_ICON, n.style.width = "90%";
      for (let r of this.#r)
        if (r.id === s)
          if (this.#l[s] = {}, this.#l[s].click = this.onIconClick.bind(this), this.#l[s].pointerover = this.onIconOver.bind(this), this.#l[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#l[s].click), i.addEventListener("pointerover", this.#l[s].pointerover), i.addEventListener("pointerout", this.#l[s].pointerout), r?.sub) {
            let o = {
              content: r.sub,
              primary: i
            }, l = this.#n.insert("Menu", o);
            i.dataset.menu = l.id, l.start(), this.#u.push(l);
            for (let c of r.sub)
              this.#a[c.id] = c.class;
          } else
            this.#a[r.id] = r.class;
    }
  }
  addTool(e = this.#o, i = this.#c) {
    let s = {
      name: e,
      tool: this.#a[e],
      pos: i.cursorClick
    }, n = this.#s.create(i, s);
    return n.start(), console.log(n), n;
  }
  addNewTool(e, i) {
    let s = this.addTool(e, i);
    this.activeTool = s, this.emit("tool_active", s), this.emit(`tool_${s.id}_active`, s);
  }
  addAllTools() {
  }
}
const oo = 20, Sg = 20, Eg = new lt(V.COLOUR_BORDER), On = document.createElement("template");
On.innerHTML = `
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
    border: 1px solid var(--txc-time-scrollbar-color, ${V.COLOUR_BORDER});
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
    background-color: var(--txc-time-handle-color, ${Eg.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${oo}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${V.COLOUR_ICON});
    width: ${oo}px;
    height: ${Sg}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${V.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${Ld}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${Md}</span>
</div>
`;
class Pg extends Z {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #a;
  #o;
  #c;
  #l;
  #u;
  #h;
  constructor() {
    super(On), this.#e = On;
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        document.getElementById("slider-bar"), this.#t = this.shadowRoot.querySelector(".scrollBarWidget"), this.#i = this.shadowRoot.querySelector(".rwdStart"), this.#n = this.shadowRoot.querySelector(".fwdEnd"), this.#s = this.shadowRoot.querySelector(".scrollBar"), this.#r = this.shadowRoot.querySelector(".viewport"), this.#a = this.shadowRoot.querySelector(".handle"), this.#o = this.shadowRoot.querySelectorAll("svg"), this.#c = this.shadowRoot.querySelector("#max"), this.#l = this.shadowRoot.querySelector("#min"), this.#u = this.shadowRoot.querySelectorAll("input"), this.#h = this.shadowRoot.querySelector("style[title=overview]"), this.max.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.max })), this.min.addEventListener("input", this.onChangeSliderHandler.bind({ self: this, input: this.min }));
      }
    );
  }
  get scrollBarWidget() {
    return this.#t;
  }
  get rwdStart() {
    return this.#i;
  }
  get fwdEnd() {
    return this.#n;
  }
  get scrollBar() {
    return this.#s;
  }
  get viewport() {
    return this.#r;
  }
  get handle() {
    return this.#a;
  }
  get icons() {
    return this.#o;
  }
  get max() {
    return this.#c;
  }
  get min() {
    return this.#l;
  }
  get sliders() {
    return this.#u;
  }
  get overviewCSS() {
    return this.#h;
  }
  onChangeSliderHandler() {
    console.log(`${this.input.value}, ${this.input.getAttribute("max")}`);
  }
}
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", Pg);
const oh = document.createElement("template");
oh.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${hs}px;
  }
  tradex-overview {
    height: ${ul}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class Mg extends Z {
  #e;
  #t;
  constructor() {
    super(oh);
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
customElements.get("tradex-time") || window.customElements.define("tradex-time", Mg);
const lh = document.createElement("template");
lh.innerHTML = `
<style>
.scene-canvas {
  display: block;
}
</style>
<slot name="viewportCanvas"></slot>
<canvas class="scene-canvas"></canvas>
`;
class Lg extends Z {
  #e;
  #t;
  #i = this.onSlotChange.bind(this);
  constructor() {
    super(lh);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector('slot[name="viewportCanvas"]'), this.#e.addEventListener("slotchange", this.#i);
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.#e.removeEventListener("slotchange", this.#i);
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
customElements.get("tradex-viewport") || window.customElements.define("tradex-viewport", Lg);
const hh = document.createElement("template");
hh.innerHTML = `
<style>
  tradex-viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <tradex-viewport></tradex-viewport>
`;
class Ag extends Z {
  #e;
  constructor() {
    super(hh);
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
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", Ag);
const ch = document.createElement("template");
ch.innerHTML = `
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
.legend .lower {
  background: #0002;
  border-radius: 0 5px 5px 0;
}
.legend.secondary {
  // display: none !important;
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
  margin: 0;
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


.hide .indicator {
  display: none !important;
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
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${yd}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${vd}</span>
  </div>
</div>
`;
class Og extends Z {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #a = [];
  #o;
  constructor() {
    super(ch);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#r = this.shadowRoot.querySelector("slot"), this.#t = this.shadowRoot.querySelector(".legends"), this.#i = this.shadowRoot.querySelector(".title"), this.#n = this.shadowRoot.querySelector("dl"), this.#s = this.shadowRoot.querySelector(".controls"), this.#o = this.onSlotChange.bind(this), this.#r.addEventListener("slotchange", this.#o);
      }
    );
  }
  disconnectedCallback() {
    this.#r.removeEventListener("slotchange", this.#o);
  }
  get slot() {
    return this.#r;
  }
  get legends() {
    return this.#t;
  }
  get elTitle() {
    return this.#i;
  }
  get elInputs() {
    return this.#n;
  }
  get elControls() {
    return this.#s;
  }
  get title() {
    return this.#e;
  }
  set title(e) {
    this.setTittle(e);
  }
  onSlotChange(e) {
    this.#a.forEach((i) => i.handler.call(i.context, e));
  }
  insert(e) {
    this.legends.insertAdjacentHTML("beforeend", e);
  }
  setTittle(e) {
    T && (this.#e = e, this.elTitle.innerHTML = e);
  }
  buildLegend(e, i) {
    let s = "", n = `${i.legend.font}; color: ${i.legend.colour}; text-align: left;`, r = "", o = e?.type !== "chart" ? "visible" : "notvisible";
    const c = i.legend.controls ? `
      <div class="controls restored expanded ${o}" style="">
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
            ${c}
      </div>
     </div>
    `;
  }
  buildInputs(e) {
    let i = 0, s = "", n, r = "", o = "", l = "";
    for (n in e.inputs) {
      let c = e?.colours?.[i] ? ` color: ${e.colours[i]};` : "", p = e?.inputs?.[n] !== void 0 ? e.inputs[n] : r, f = e?.labels?.[i] ? `${n}:` : r;
      o += e?.labels?.[i] ? "1em;" : ".25em", s += `<dt style="${o}">${f}</dt>
      <dd style="${l}${c}">${p}</dd>`, ++i;
    }
    return s;
  }
  buildControls(e) {
    let i = "", s = e.id;
    return i += `<span id="${s}_up" class="control up" data-icon="up">${bd}</span>`, i += `<span id="${s}_down" class="control down" data-icon="down">${wd}</span>`, e?.type === "indicator" && (i += `<span id="${s}_visible" class="control visible" data-icon="visible">${Ed}</span>`, i += `<span id="${s}_notVisible" class="control notvisible" data-icon="notVisible">${Pd}</span>`), e?.type !== "indicator" && (i += `<span id="${s}_collapse" class="control collapse" data-icon="collapse">${Td}</span>`, i += `<span id="${s}_expand" class="control expand" data-icon="expand">${Sd}</span>`, i += `<span id="${s}_maximize" class="control maximize" data-icon="maximize">${Cd}</span>`, i += `<span id="${s}_restore" class="control restore" data-icon="restore">${xd}</span>`), i += e?.type !== "chart" ? `<span id="${s}_remove" class="control remove" data-icon="remove">${gd}</span>` : "", i += e?.type !== "secondary" ? `<span id="${s}_config" class="control config" data-icon="config">${al}</span>` : "", i;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", Og);
const uh = document.createElement("template");
uh.innerHTML = `
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
class Dg extends Z {
  #e;
  #t;
  constructor() {
    super(uh);
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
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", Dg);
const dh = document.createElement("template");
dh.innerHTML = `
<style>
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
<slot name="chartpane" id="chartpane"></slot>
`;
class Ig extends Z {
  #e;
  #t;
  #i;
  #n;
  constructor() {
    super(dh);
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
    return this.#i;
  }
  get height() {
    return this.#n;
  }
  get oWidth() {
    return this.#e;
  }
  get oHeight() {
    return this.#t;
  }
  get widthDeltaR() {
    return this.#i / this.#e;
  }
  get heightDeltaR() {
    return this.#n / this.#t;
  }
  previousDimensions() {
    this.#e = this.#i ? this.#i : this.clientWidth, this.#t = this.#n ? this.#n : this.clientHeight, this.#i = this.clientWidth, this.#n = this.clientHeight;
  }
}
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", Ig);
const mh = document.createElement("template");
mh.innerHTML = `
<style>
  :host {
    display: grid;
    grid-row-gap: 0;
    grid-template-rows: 1fr ${hs}px;
  }
  #viewport {
    position: absolute;
    width: 100%;
    height: inherit;
    background: var(--txc-chartpane-background, none);
    z-index: 0;
  }
  #viewport canvas {
    position: absolute;
  }
  tradex-rows {
    display: grid;
    grid-row: 1/2;
    overflow: hidden;
    width: 100%;
    border: 1px solid;
    border-color: var(--txc-border-color, ${V.COLOUR_BORDER}); 
  }
  tradex-time {
    grid-row: 2/3;
    width: 100%;
    overflow: hidden;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class Ng extends Z {
  #e;
  #t;
  #i;
  #n;
  constructor() {
    super(mh);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#i = this.shadowRoot.querySelector("#viewport"), this.#e = this.shadowRoot.querySelector("tradex-rows"), this.#t = this.shadowRoot.querySelector("tradex-time");
      }
    );
  }
  disconnectedCallback() {
  }
  get viewport() {
    return this.#i;
  }
  get rows() {
    return this.#e;
  }
  get time() {
    return this.#t;
  }
  start(e) {
    this.#n = e, this.setMain();
  }
  rowNode(e, i = "", s) {
    return `
      <tradex-chartpane slot="chartpane" class="${e}" style="${i}">
      </tradex-chartpane>
    `;
  }
  scaleNode(e) {
    const i = Vd + " width: 100%;";
    return `
    <div slot="chartpane" class="viewport scale ${e}" style="$${i}"></div>
  `;
  }
  addRow(e, i = "", s, n) {
    let r, o = this.rowNode(e, i, s);
    return this.#e.insertAdjacentHTML("beforeend", o), r = this.#e.chartPaneSlot.assignedElements().slice(-1)[0], r.style.height = `${n}px`, r;
  }
  removeRow(e) {
    const i = this.shadowRoot.querySelector(`#${e}`);
    return i ? (i.remove(), !0) : !1;
  }
  addScaleRow(e, i, s) {
    let n, r = this.scaleNode(e);
    return s.insertAdjacentHTML("beforeend", r), n = s.chartPaneSlot.assignedElements().slice(-1)[0], n.style.height = `${i}px`, n.style.width = "100%", n.height = i, n.width = s.width, n;
  }
  setMain() {
    let e = P(this.#n?.time?.height) ? this.#n.time.height : zd;
    this.style.gridTemplateRows = `1fr ${e}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", Ng);
const ph = document.createElement("template");
ph.innerHTML = `
  <slot></slot>
`;
class Rg extends Z {
  constructor() {
    super(ph);
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
        height: ${tt.ICONSIZE};
        width: ${tt.ICONSIZE};
        fill: ${tt.COLOUR_ICON};
      }
      svg:hover {
        fill: ${tt.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${tt.ICONSIZE};
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
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", Rg);
const fh = document.createElement("template");
fh.innerHTML = `
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
class kg extends Z {
  #e;
  #t;
  #i;
  constructor() {
    super(fh);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#e = this.shadowRoot.querySelector("tradex-viewport"), this.#i = this.shadowRoot.querySelector('slot[name="chartpane"]'), this.#t = this.chartPaneSlot.assignedElements();
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
    return this.#i;
  }
}
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", kg);
const gh = document.createElement("template"), $g = `
<style>
  :host {
    display: grid;
    grid-column-gap: 0;
    grid-template-columns: 0 0 1fr ${Tn}px 0;
    grid-template-rows: 1fr;
  }
  tradex-main, tradex-scale, tradex-tools {
    max-height: 100%;
    min-height: 100%;
    overflow: hidden;
  }
  tradex-tools {
    grid-column: 1/2;
  }
  tradex-scale:first-of-type {
    grid-column: 2/3;
  }
  tradex-main {
    grid-column: 3/4;
  }
  tradex-scale:last-of-type {
    grid-column: 4/5;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-scale></tradex-scale>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`;
gh.innerHTML = $g;
class Hg extends Z {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r = {
    toolsLeft: `${As}px`,
    scaleLeft: "0",
    main: "1fr",
    scaleRight: `${As}px`,
    toolsRight: "0"
  };
  constructor() {
    super(gh);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.style.display = "grid", this.#t = this.shadowRoot.querySelector("tradex-tools"), this.#i = this.shadowRoot.querySelector("tradex-main"), this.#n = this.shadowRoot.querySelectorAll("tradex-scale")[1], this.#s = this.shadowRoot.querySelectorAll("tradex-scale")[0];
      }
    );
  }
  get tools() {
    return this.#t;
  }
  get main() {
    return this.#i;
  }
  get scale() {
    return this.#n;
  }
  get scaleW() {
    return this.#n.width || this.#e?.scale?.width || Tn;
  }
  get scale2W() {
    return this.#n.width || this.#e?.scale?.width || Tn;
  }
  get toolsW() {
    return this.#t.width || this.#e?.tools?.width || As;
  }
  start(e) {
    this.#e = e, this.setToolsLocation();
  }
  setYAxisWidth(e = this.scaleW) {
    e = P(e) ? e : this.scaleW, this.setYAxisLocation(void 0, e);
  }
  setYAxisLocation(e = this.#e?.yAxis?.location, i = this.scaleW) {
    switch (e) {
      case "left":
        this.#r.scaleLeft = `${i}px`, this.#r.scaleRight = "0", this.#n.style.gridColumn = "2/3", this.#s.style.gridColumn = "4/5", this.#n.style.display = "block", this.#s.style.display = "none";
        break;
      case "both":
        this.#r.scaleLeft = `${i}px`, this.#r.scaleRight = `${i}px`, this.#n.style.gridColumn = "4/5", this.#s.style.gridColumn = "2/3", this.#n.style.display = "block", this.#s.style.display = "block";
        break;
      case "right":
      default:
        this.#r.scaleLeft = "0", this.#r.scaleRight = `${i}px`, this.#n.style.gridColumn = "4/5", this.#s.style.gridColumn = "2/3", this.#n.style.display = "block", this.#s.style.display = "none";
        break;
    }
    this.setGridColumns();
  }
  setToolsLocation(e = this.#e?.tools?.location) {
    let i = this.#e?.tools?.location == "none" ? 0 : this.toolsW;
    switch (e) {
      case "none":
      case !1:
        this.#r.toolsLeft = "0", this.#r.toolsRight = "0", this.#t.style.display = "none";
        break;
      case "right":
        this.#r.toolsLeft = "0", this.#r.toolsRight = `${i}px`, this.#t.style.gridColumn = "1/2", this.#t.style.display = "block";
        break;
      case "left":
      default:
        this.#r.toolsLeft = `${i}px`, this.#r.toolsRight = "0", this.#t.style.gridColumn = "5/6", this.#t.style.display = "block";
        break;
    }
    this.setGridColumns();
  }
  setGridColumns() {
    this.style.gridTemplateColumns = Object.values(this.#r).join(" ");
  }
}
customElements.get("tradex-body") || window.customElements.define("tradex-body", Hg);
const yh = document.createElement("template");
yh.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class _g extends Z {
  constructor() {
    super(yh);
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
        height: ${Dt.ICONSIZE};
        fill: ${Dt.COLOUR_ICON};
      }
    </style>
    `;
    for (const n of e)
      s += this.iconNode(n);
    return s + "</div>";
  }
  iconNode(e) {
    const i = `display: inline-block; height: ${Dt.ICONSIZE}; padding-top: 2px`, s = "sub" in e ? 'data-menu="true"' : "";
    return `
      <div id="TX_${e.id}" data-event="${e.event}" ${s} class="icon-wrapper" style="${i}">${e.icon}</div>

    `;
  }
}
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", _g);
const vh = document.createElement("template");
vh.innerHTML = `
  <slot name="widget"></slot>
`;
class Bg extends Z {
  constructor() {
    super(vh);
  }
  destroy() {
  }
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", Bg);
const Fg = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
      display: grid;
      grid-row-gap: 0;
      grid-template-rows: ${cl}px 1fr 0;
    }
    tradex-utils {
      grid-row: 1/2;
      width: 100%; 
    }
    tradex-body {
      grid-row: 2/3;
      width: 100%;
    }
    tradex-widgets {
      grid-row: 3/4;
      position: relative;
    }
  </style>
  <div style="display: none;">
    <slot></slot>
  </div>
  <tradex-utils></tradex-utils>
  <tradex-body></tradex-body>
  <tradex-widgets></tradex-widgets>
`, Dn = document.createElement("template");
Dn.innerHTML = Fg;
class Ug extends Z {
  #e;
  #t;
  #i;
  #n;
  #s = ti;
  #r = et;
  #a;
  #o;
  #c;
  #l;
  #u;
  #h;
  constructor() {
    super(Dn, "closed");
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(Dn.content.cloneNode(!0)), this.init(), this.#r = this.parentElement.clientHeight || et, this.#s = this.parentElement.clientWidth || ti;
      let e = this.getAttribute("height") || "100%", i = this.getAttribute("width") || "100%";
      this.setDimensions(i, e), this.resizeObserver = new ResizeObserver(Pe(this.onResized, 100, this)), this.resizeObserver.observe(this), this.start(pl);
    }
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect();
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
  init() {
    this.style.display = "grid", this.style.minHeight = ol, this.#i = this.shadowRoot.querySelector("tradex-widgets"), this.#t = this.shadowRoot.querySelector("tradex-utils"), this.#e = this.shadowRoot.querySelector("tradex-body");
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(e) {
    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  get stream() {
    return !0;
  }
  set stream(e) {
  }
  get elBody() {
    return this.#e;
  }
  get elUtils() {
    return this.#t;
  }
  get elWidgets() {
    return this.#i;
  }
  get elWidgetsG() {
    return this.#i;
  }
  get elMain() {
    return this.#e.main;
  }
  get elTime() {
    return this.#e.main.time;
  }
  get elRows() {
    return this.#e.main.rows;
  }
  get elTools() {
    return this.#e.tools;
  }
  get elYAxis() {
    return this.#e.scale;
  }
  get width() {
    return this.#s;
  }
  get height() {
    return this.#r;
  }
  get resizeEntries() {
    return this.#h;
  }
  elStart(e) {
    this.#u = e, this.setUtilsLocation();
  }
  onResized(e) {
    super.onResize(e);
    const { width: i, height: s } = e[0].contentRect;
    this.#s = i, this.#r = s, this.#h = e[0], this.ToolsBar instanceof ah && this.ToolsBar.onResized(), this.log(`onResize w: ${i}, h: ${s}`), this.emit("global_resize", { w: i, h: s });
  }
  setWidth(e) {
    P(e) ? e += "px" : T(e) && e.match(Kt) || (e = "100%"), this.style.width = e, this.#s = Math.round(this.getBoundingClientRect().width);
  }
  setHeight(e) {
    P(e) ? e += "px" : T(e) && e.match(Kt) || (this.#r = this.parentElement.getBoundingClientRect().height, e = this.#r + "px"), this.style.height = e, this.#r = Math.round(this.getBoundingClientRect().height);
  }
  setWidthMin(e) {
    this.style.minWidth = `var(--txc-min-width, ${e})`;
  }
  setHeightMin(e) {
    this.style.minHeight = `var(--txc-min-height, ${e})`;
  }
  setWidthMax(e) {
    this.style.minWidth = `var(--txc-max-width, ${e})`;
  }
  setHeightMax(e) {
    this.style.minHeight = `var(--txc-max-height, ${e})`;
  }
  setDimensions(e, i) {
    let s, n = this.width, r = this.height;
    if (!e || !i) {
      const o = this.getBoundingClientRect(), l = this.parentElement.getBoundingClientRect();
      i = o.height ? o.height : l.height ? l.height : et, e = o.width ? o.width : l.width ? l.width : ti;
    } else (!P(e) || !P(i)) && ((!T(e) || !e.match(Kt)) && (e = "100%"), (!T(i) || !i.match(Kt)) && (i = "100%"));
    return this.setWidth(e), this.setHeight(i), s = {
      width: this.width,
      height: this.height,
      resizeW: e / n,
      resizeH: i / r,
      resizeWDiff: e - n,
      resizeHDiff: i - r
    }, s;
  }
  setUtilsLocation(e = this.#u?.utils?.location) {
    this.#u.utils = this.#u?.utils || {};
    const i = P(this.#u.uitils?.height) && this.#u.utils.height > 0 ? this.#u.uitils.height : cl;
    switch (e) {
      case "top":
      case !0:
        this.#u.utils.location = "top", this.#u.utils.height = i, this.style.gridTemplateRows = `${i}px 1fr`, this.elBody.style.minHeight = `${et - i}px`;
        break;
      case "none":
      case !1:
      default:
        this.#u.utils.location = "none", this.#u.utils.height = 0, this.elUtils.style.display = "none", this.style.gridTemplateRows = "0 1fr", this.elBody.style.minHeight = `${et}px`;
        break;
    }
  }
}
const zg = [
  {
    id: "indicators",
    name: "Indicators",
    icon: ld,
    event: "utils_indicators",
    sub: []
  },
  {
    id: "timezone",
    name: "Timezone",
    icon: hd,
    event: "utils_timezone"
  },
  {
    id: "screenshot",
    name: "Screenshot",
    icon: od,
    event: "utils_screenshot"
  },
  {
    id: "settings",
    name: "Settings",
    icon: al,
    event: "utils_settings"
  }
];
class Vg extends Ct {
  #e = "Utilities";
  #t = "utils";
  #i;
  #n;
  #s;
  #r;
  #a;
  #o = {};
  #c = {};
  #l = {};
  constructor(e, i) {
    super(e, i), this.#i = e.elUtils, this.#n = e.config?.utilsBar || zg, this.#r = e.WidgetsG, this.#a = e.indicatorsPublic || pr, this.#s = e.config.theme?.utils?.location || "none", (this.#s || this.#s == "none" || !ad.includes(this.#s)) && (this.core.style.gridTemplateRows = "0 1fr"), this.#i.innerHTML = this.#i.defaultNode(this.#n);
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ve(this.#i);
  }
  get location() {
    return this.#s;
  }
  start() {
    this.initAllUtils(), this.eventsListen(), this.log(`Utils Bar ${this.#e} instantiated and running`);
  }
  destroy() {
    const e = this.core, i = bo(`#${e.id} .${sc} .icon-wrapper`);
    for (let s of i) {
      let n = s.id.replace("TX_", "");
      for (let r of this.#n)
        r.id === n && s.removeEventListener("click", this.#c[n].click), s.removeEventListener("pointerover", this.#c[n].pointerover), s.removeEventListener("pointerout", this.#c[n].pointerout);
    }
    this.core.hub.expunge(this);
  }
  eventsListen() {
    this.on("utils_indicators", this.onIndicators, this), this.on("utils_timezone", this.onTimezone, this), this.on("utils_settings", this.onSettings, this), this.on("utils_screenshot", this.onScreenshot, this);
  }
  onIconClick(e) {
    const i = Un(e.target, "icon-wrapper");
    if (!v(i)) return !1;
    const s = Date.now();
    if (s - this.#l[i.id] < 1e3) return !1;
    this.#l[i.id] = s;
    let n = i.dataset.event, r = i.dataset.menu || !1, o = {
      target: i.id,
      menu: r,
      evt: n
    }, l = i.dataset.action;
    this.emit(n, o), r ? this.emit("menu_open", o) : this.emit("util_selected", o), l && l(o, this.core);
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = Dt.COLOUR_ICONHOVER;
  }
  onIconOut(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = Dt.COLOUR_ICON;
  }
  initAllUtils() {
    const e = this.#i.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      this.#l[i.id] = 0;
      let s = i.id.replace("TX_", ""), n = i.querySelector("svg");
      n.style.fill = Dt.COLOUR_ICON, n.style.height = "90%";
      for (let r of this.#n)
        if (r.id === s && (this.#c[s] = {}, this.#c[s].click = this.onIconClick.bind(this), this.#c[s].pointerover = this.onIconOver.bind(this), this.#c[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#c[s].click), i.addEventListener("pointerover", this.#c[s].pointerover), i.addEventListener("pointerout", this.#c[s].pointerout), s === "indicators" && (r.sub = Object.values(this.#a)), r?.sub)) {
          let o = {
            content: r.sub,
            primary: i
          }, l = this.#r.insert("Menu", o);
          i.dataset.menu = l.id, l.start();
        }
    }
  }
  onIndicators(e) {
  }
  onTimezone(e) {
    this.core.notImplemented();
  }
  onSettings(e) {
    this.core.notImplemented();
  }
  onScreenshot(e) {
    this.core.downloadImage();
  }
}
const Wg = 150;
class Ce {
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #a;
  #o;
  #c;
  #l = {};
  static menuList = {};
  static menuCnt = 0;
  static class = Br;
  static Name = "Menus";
  static type = "menu";
  static currentActive;
  static create(e, i) {
    const s = `menu_${++Ce.menuCnt}`;
    return i.id = s, Ce.menuList[s] = new Ce(e, i), Ce.menuList[s];
  }
  static destroy(e) {
    Ce.menuList[e].end(), delete Ce.menuList[e];
  }
  constructor(e, i) {
    this.#t = e, this.#i = i.core, this.#n = i, this.#e = i.id, this.#r = e.elements[Ce.type], this.#s = this.#i.elWidgetsG, this.mount(this.#r);
  }
  get el() {
    return this.#a;
  }
  get id() {
    return this.#e;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return ve(this.#a);
  }
  get type() {
    return Ce.type;
  }
  start() {
    this.position(), this.eventsListen();
  }
  end() {
    this.#r.querySelectorAll(`#${this.id} li`).forEach((i) => {
      i.removeEventListener("click", this.#l[this.id][i.id]);
    }), document.removeEventListener("click", this.#l[this.id].outside), this.off("global_resize", this.onResize, this);
  }
  eventsListen() {
    const e = this.#r.querySelectorAll(`#${this.id} li`);
    this.#l[this.id] = {}, e.forEach((i) => {
      this.#l[this.id][i.id] = this.onMenuSelect.bind(this), i.addEventListener("click", this.#l[this.id][i.id]);
    }), this.on("global_resize", this.onResize, this);
  }
  on(e, i, s = this) {
    this.#i.on(e, i, s);
  }
  off(e, i, s = this) {
    this.#i.off(e, i, s);
  }
  emit(e, i) {
    this.#i.emit(e, i);
  }
  onMenuSelect(e) {
    let i = e.currentTarget.dataset.event, s = {
      target: e.currentTarget.id,
      menu: this.#e,
      evt: i
    };
    this.emit("menuItem_selected", s), this.emit("menu_close", s), this.#i.log(`menu_close: ${this.#e}`);
  }
  onOutsideClickListener(e) {
    if (!this.#a.contains(e.target) && !this.#n.primary.contains(e.target) && wt(this.#a)) {
      let i = {
        target: e.currentTarget.id,
        menu: this.#e
      };
      this.emit("menu_close", i);
    }
    document.removeEventListener("click", this.#l[this.id].outside);
  }
  onResize() {
    this.position();
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.menuNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#a = this.#r.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${Br}" style=""></div>
    `;
  }
  menuNode() {
    const e = this.#n, i = `position: absolute; z-index: 1000; display: none; border: 1px solid ${Ds.COLOUR_BORDER}; background: ${Ds.COLOUR_BG}; color: ${Ds.COLOUR_TXT}; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;`;
    let s = this.content(e);
    return `
      <div id="${e.id}" class="${nc}" style="${i}">
        ${s}
      </div>
    `;
  }
  content(e) {
    const i = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${Wg}px`, s = "padding: .25em 1em .25em 1em; white-space: nowrap;", n = "display: inline-block; width: 4em;", r = "cursor: pointer;", o = `onmouseover="this.style.background ='#222'"`, l = `onmouseout="this.style.background ='none'"`;
    let c = `<ul style="${i}">`;
    if (e?.content)
      for (let p of e.content)
        c += `<li id="${p.id}" data-event="${p.event}" style="${s} ${r}" ${o} ${l}><a style="${r}"><span style="${n}">${p.id}</span><span>${p.name}</span></li></a>`;
    return c += "</ul>", c;
  }
  position() {
    let e = this.#s.getBoundingClientRect(), i = this.#n.primary.getBoundingClientRect(), s = Math.round(i.left - e.left), n = Math.round(i.bottom - e.top);
    this.#a.style.left = s + "px", this.#a.style.top = n + "px";
    let r = ve(this.#a);
    if (r.right > this.#s.offsetWidth) {
      let l = Math.floor(this.#s.offsetWidth - r.width);
      l = U(l, 0, this.#s.offsetWidth), this.#a.style.left = `${l}px`;
    }
    if (this.#i.MainPane.rowsH + n + r.height > this.#i.MainPane.rowsH) {
      let l = Math.floor(r.height * -1);
      l = U(l, this.#i.MainPane.rowsH * -1, 0), this.#a.style.top = `${l}px`;
    }
  }
  remove() {
  }
  open() {
    if (Ce.currentActive === this) return !0;
    Ce.currentActive = this, this.#a.style.display = "block", this.position(), setTimeout(() => {
      this.#l[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#l[this.id].outside);
    }, 250);
  }
  close() {
    Ce.currentActive = null, this.#a.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class ci extends de {
  static Name = "Dialogues";
  static type = "dialogue";
  static class = "tradeXdialogue";
  static defaultStyles = `
  /** default Dialogue widget styles */
  `;
  static create(e, i) {
    return i.dragBar = q(i?.dragBar) ? i.dragBar : !0, i.close = q(i?.close) ? i.close : !0, i.type = i?.type || ci.type, i.class = i?.class || "dialogue", i.id = i?.id || ae("dialogue"), super.create(e, i);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="tradeXdialogue" style="">
      </div>
    `;
  }
  constructor(e, i) {
    super(e, i);
  }
  destroy() {
    super.destroy();
  }
  get type() {
    return ci.type;
  }
  dialogueBuild(e = "", i = []) {
    let s = { buttons: {} }, n = `
    <input class="submit" type="submit" value="Submit"/>
    <input class="cancel" type="button" value="Cancel"/>
    <input class="default" type="button" value="Default"/>
    `;
    return L(i) && i.length > 1 || (s.submit = this.provideEventListeners(
      "input.submit",
      [{
        event: "click",
        fn: (o) => {
          _(this.parent.onConfigDialogueSubmit) && this.parent.onConfigDialogueSubmit(this);
        }
      }]
    ), s.cancel = this.provideEventListeners(
      "input.cancel",
      [{
        event: "click",
        fn: (o) => {
          _(this.parent.onConfigDialogueCancel) && this.parent.onConfigDialogueCancel(this);
        }
      }]
    ), s.default = this.provideEventListeners(
      "input.default",
      [{
        event: "click",
        fn: (o) => {
          _(this.parent.onConfigDialogueDefault) && this.parent.onConfigDialogueDefault(this);
        }
      }]
    )), { html: `
    ${new String(e)}
    <div class="buttons">
      ${n}
    </div>
    `, modifiers: s };
  }
  provideEventListener(e, i, s) {
    const n = [{ event: i, fn: s }];
    return this.provideEventListeners(e, n);
  }
  provideEventListener(e, i, s) {
    const n = [{ event: i, fn: s }];
    return this.provideEventListeners(e, n);
  }
  provideEventListeners(e, i) {
    return (n) => {
      const r = n.querySelector(e);
      if (r)
        for (let o of i)
          r.addEventListener(
            o.event,
            (l) => {
              o.fn(l);
            }
          );
    };
  }
}
const bh = `
/** default Config Dialogue widget styles */

.tabbedContent {
  overflow: hidden;
}

.tabbedContent .content {
  padding: 0;
}
.tabbedContent .tabs {
  display: flex;
  flex-wrap: wrap;
  background: #e5e5e588;
  box-shadow: 0 48px 80px -32px rgba(0,0,0,0.3);
  width: 300px;
}
.tabbedContent .input {
  position: absolute;
  opacity: 0;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.tabbedContent .label {
  position: relative;
  width: auto;
  padding: .4em 1em;
  background: #e5e5e588;
  cursor: pointer;
  font-weight: bold;
  color: #7f7f7f;
  transition: background 0.1s, color 0.1s;
}
.tabbedContent .label:hover {
  background: #d8d8d8;
}
.tabbedContent .label:active {
  background: #ccc;
}
.tabbedContent label:has(> input:checked) {
  background: #fff;
  color: #000;
}
.tabbedContent .panel {
  display: none;
  padding: 1em 1em 1.5em;
  background: #ffffff88;
  order: 100;
}
.tabbedContent label:has(> input:checked) + .panel {
  display: grid;
  width: 100%;
  grid-template-columns: [label] 1fr [input] 10em [end];
  grid-row-gap: 2px;
  align-items: center;
}
.tabbedContent .panel label,
.tabbedContent .panel input {
  ${V.FONTSTRING}
  padding: 1px 2px;
}
.tabbedContent .panel label {
  grid-column-start: label;
  grid-column-end: input;
  color: #444;
  font-weight: bold;
}
.tabbedContent .panel input {
  border: 1px solid #888;
}
.tabbedContent .panel input[type="color"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 3em;
  height: 2em;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  border: none;
}
.tabbedContent .panel input[type="color"]::-webkit-color-swatch,
.tabbedContent .panel input[type="color"]::-moz-color-swatch {
  border-radius: 0;
  padding: 1px;
  margin 0;
  border-radius: 3px;
  border: 1px solid #000;
  height: 2em;
  background: #fff;
}
`, wh = document.createElement("template");
wh.innerHTML = `
<style>
  ${bh}
}
</style>
<div class="tabbedContent">
</div>
`;
class Gg extends Z {
  #e;
  #t;
  #i;
  #n;
  #s = this.onSlotChange.bind(this);
  constructor() {
    super(wh);
  }
  destroy() {
  }
  connectedCallback() {
    super.connectedCallback(
      () => {
        this.#t = this.shadowRoot.querySelector(".tabbedContent"), this.#i = this.shadowRoot.querySelector('slot[name="viewporttabs"]'), this.#i.addEventListener("slotchange", this.#s);
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.#i.removeEventListener("slotchange", this.#s);
  }
  get hastabsSlot() {
    return !0;
  }
  get tabsSlot() {
    return this.#i;
  }
  get tabs() {
    return this.#n;
  }
  onSlotChange() {
    this.#n = Array.from(this.tabsSlot.assignedElements()).find((e) => e.localName === "tabs")[0];
  }
  insertTab(e) {
    let { id: i, label: s, content: n, checked: r } = e;
    switch (typeof i) {
      case "string":
      case "number":
        break;
      default:
        i = this.#n.length;
    }
    let o = Gi(i, s, n, r);
    o = this.#t.insertAdjacentHTML("afterend", o), this.#n.push({ id: i, label: s, content: n, checked: r, tab: o });
  }
  removeTab(e) {
    if (T(e)) {
      let i = this.#t.querySelectorAll(`.tab-${e}`);
      for (let s of i)
        s.remove();
      for (let s = 0; s < this.#n.length; s++)
        this.#n[s].id == e && delete this.#n[s];
    } else P(e) && this.#t.querySelectorAll(".input");
  }
}
function qg(a = {}, e) {
  v(a) || (a = {});
  let i = "", s = Object.keys(a), n = s.length;
  if (n < 1)
    i += Gi(1, "Question", "Why did the chicken cross the road?", !0), i += Gi(2, "Answer", "To get to the other side.");
  else {
    let r = [];
    for (--n; n >= 0; n--) {
      let o = n == 0, l = _(e) ? e(a[s[n]]) : a[s[n]];
      r.push(Gi(n, s[n], l, o));
    }
    i = r.reverse().join("&nbsp;");
  }
  return i;
}
function Gi(a, e, i, s = !1) {
  return i = T(i) ? i : "", `
  <label class="label tab_${a}" for="tab_${a}">
    <span>${e}</span>
    <input class="input tab_${a}" name="tabs" type="radio" id="tab_${a}" ${s ? 'checked="checked"' : ""}/>
  </label>
  <div class="panel tab_${a}">
    ${i}
  </div>
  `;
}
customElements.get("tradex-tabs") || window.customElements.define("tradex-tabs", Gg);
class ss extends ci {
  static Name = "ConfigDialogues";
  static type = "configDialogue";
  static class = "tradeXconfig";
  static defaultStyles = `
  /** default Config Dialogue widget styles */
  
  .tradeXwindow.config {
    /* overflow: hidden; */
    background: none;
  }

  .tradeXwindow.config.active .content {
    padding: 0;
    position: relative;
  }

  .tradeXwindow.config.active .buttons {
    background: #ffffffbb;
    display: flex;
    justify-content: flex-end;
    padding: 3px 1em;
    border-radius: 0 0 5px 5px;
  }

  .tradeXwindow.config.active .buttons input {
    margin-left: 5px;
    font-size: 1em;
    padding: 1px .5em;
  }

  ${bh} 
  `;
  static create(e, i) {
    return i.dragBar = !0, i.close = !0, i.type = ss.type, i.class = "config", i.id = ae("config"), new ss(e, i);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="tradeXconfig" style="">
      </div>
    `;
  }
  #e = !0;
  constructor(e, i) {
    super(e, i);
  }
  destroy() {
    super.destroy(), this.elColourPicker.destroy();
  }
  set update(e) {
    this.#e = !!e;
  }
  get update() {
    return this.#e;
  }
  configBuild(e = {}) {
    let { content: i, modifiers: s = {} } = this.configContent(e);
    const n = `
    <div class="tabbedContent">
      <form class="tabs">
        ${qg(i)}
      </form>
    </div>
    `, { html: r, modifiers: o } = super.dialogueBuild(n);
    return s = { ...s, ...o }, { html: r, modifiers: s };
  }
  configContent(e) {
    if (!v(e)) return "<p>Config content missing!</p>";
    let i, s = {}, n = {};
    for (let r in e)
      if (s[r] = "", L(e[r]))
        for (let o of e[r])
          for (let l in o.style)
            i = o.style[l], v(i) && this.configEntryFields(r, i, s, n);
      else if (v(e[r])) {
        s[r] = "";
        for (let o in e[r])
          i = e[r][o], this.configEntryFields(r, i, s, n);
      } else {
        this.core.error("ERROR: Building Config Dialogue : Input malformed");
        continue;
      }
    return { content: s, modifiers: n };
  }
  configEntryFields(e, i, s, n) {
    let r = T(i.entry) ? i.entry : "", o = T(i.label) ? i.label : r;
    switch (i.type) {
      case "select":
        s[e] += Mc(o, i);
        break;
      default:
        s[e] += So(o, i);
        break;
    }
    n[r] = i.$function;
  }
  contentUpdate(e) {
    return v(e) ? (T(e?.title) && this.setTitle(e.title), T(e?.content) && this.setContent(this.configBuild(e.content)), this.#e = !0, this.#e) : !1;
  }
  provideInputColor(e, i) {
    const s = e.querySelector(i), n = document.createElement("tradex-colourinput");
    s.type = "text", s.pattern = ym, n.setTarget(s), n.style.display = "inline-block";
  }
}
class De {
  static progressList = {};
  static progressCnt = 0;
  static class = zr;
  static type = "progress";
  static Name = "Progress";
  static icons = {
    loadingBars: Bd,
    loadingSpin: Fd
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${zr}" style=""></div>
    `;
  }
  static create(e, i) {
    const s = `progress_${++De.progressCnt}`;
    return i.id = s, De.progressList[s] = new De(e, i), De.progressList[s];
  }
  static destroy(e) {
    De.progressList[e].destroy(), delete De.progressList[e];
  }
  #e;
  #t;
  #i;
  #n;
  #s;
  #r;
  #a;
  #o;
  constructor(e, i) {
    this.#t = e, this.#i = i.core, this.#n = i, this.#e = i.id, this.#r = e.elements[De.type], this.#s = this.#i.elWidgetsG, this.init();
  }
  destroy() {
    this.#r.remove();
  }
  get type() {
    return De.type;
  }
  init() {
    this.mount(this.#r);
  }
  start() {
    if (!v(this.#i.config?.progress) || !v(this.#i.config.progress?.loading))
      return !1;
    this.#a.style.display = "block";
    const e = this.#i.elBody.width / 2 - this.#a.clientWidth / 2, i = this.#i.elBody.height / -2 - this.#a.clientHeight / 2;
    this.#a.style.top = `${i}px`, this.#a.style.left = `${e}px`;
  }
  stop() {
    this.#a.style.display = "none";
  }
  progressNode(e) {
    const i = "position: absolute; z-index: 1000; display: none; justify-content: center; align-items: center;", n = `<div class="content" style="">${e.icon}</div>`;
    return `
      <div id="${this.#n.id}" class="progress ${e.type}" style="${i}">${n}</div>
    `;
  }
  mount(e) {
    let i = "loadingBars";
    this.#n?.type in De.icons && (i = this.#n?.type);
    const s = { type: i, icon: De.icons[i] };
    e.lastElementChild == null ? e.innerHTML = this.progressNode(s) : e.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(s)), this.#a = this.#r.querySelector(`#${this.#n.id}`), this.#o = this.#a.querySelector("svg"), this.#o.style.fill = `${Wd.COLOUR_ICONHOVER};`;
  }
}
const ln = {
  id: "widgets",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        menu_open: {
          target: "menu_open",
          action(a) {
          }
        },
        window_open: {
          target: "window_open",
          action(a) {
          }
        }
      }
    },
    menu_open: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        menu_close: {
          target: "idle",
          action(a) {
          }
        }
      }
    },
    window_open: {
      onEnter(a) {
      },
      onExit(a) {
      },
      on: {
        window_close: {
          target: "idle",
          action(a) {
          }
        }
      }
    }
  }
};
class jg extends Ct {
  #e = "Widgets";
  #t = "widgets";
  #i;
  #n = { Divider: xe, Progress: De, Menu: Ce, Window: de, Dialogue: ci, ConfigDialogue: ss };
  #s = {};
  #r = {};
  #a;
  #o;
  #c;
  constructor(e, i) {
    super(e, i), this.#i = { ...this.#n, ...i.widgets }, this.#a = e.elWidgetsG, this.mount(this.#a);
    for (let s in this.#i) {
      let n = this.#i[s], r = `${n.type}`;
      this.#r[r] = this.#a.querySelector(`.${n.class}`), this.#r[r].innerHTML = `
      <style title="${n.type}">
        ${n?.defaultStyles || ""}
      </style>
      `, n.stylesInstalled = !0;
    }
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get elements() {
    return this.#r;
  }
  get instances() {
    return this.#s;
  }
  get types() {
    return this.#i;
  }
  start() {
    this.eventsListen(), ln.id = this.id, ln.context = this, this.stateMachine = ln, this.stateMachine.start();
  }
  destroy() {
    this.core.hub.expunge(this), this.stateMachine.destroy();
    for (let e in this.#s)
      this.delete(e);
    for (let e in this.#i)
      this.#i[e].destroy();
  }
  eventsListen() {
    this.on("resize", this.onResize, this), this.on("menu_open", this.onOpenMenu, this), this.on("menu_close", this.onCloseMenu, this), this.on("menu_off", this.onCloseMenu, this), this.on("menuItem_selected", this.onMenuItemSelected, this), this.on("global_resize", this.onResize, this);
  }
  onOpenMenu(e) {
    this.#s[e.menu].open();
  }
  onCloseMenu(e) {
    this.#s[e.menu].close();
  }
  onMenuItemSelected(e) {
    this.emit(e.evt, e.target);
  }
  onResize(e) {
    this.setDimensions(e), this.elements.divider.style.width = `${this.core.width}px`;
  }
  mount(e) {
    e.innerHTML = this.defaultNode();
  }
  setWidth(e) {
    this.#o = e;
  }
  setHeight(e) {
    this.#c = e;
  }
  setDimensions(e) {
    this.setWidth(e.mainW), this.setHeight(e.mainH);
  }
  defaultNode() {
    let e = "", i = [];
    for (let s in this.#i) {
      let n = this.#i[s];
      i.indexOf(n.type) === -1 && (e += n.defaultNode(), i.push(n.type));
    }
    return e;
  }
  insert(e, i) {
    if (!(e in this.#i) || !v(i)) return !1;
    i.core = this.core;
    const s = this.#i[e].create(this, i);
    return this.#s[s.id] = s, s;
  }
  delete(e) {
    if (!T(e) || !(e in this.#s)) return !1;
    const i = this.#s[e].type;
    return this.#i[i].destroy(e), !0;
  }
}
function lo(a, e, i, s, n, r) {
  const o = a.theme, l = document.createElement("template"), c = a.Timeline.graph.viewport.scene, p = a.MainPane, f = p.graph.viewport.scene, b = p.width, E = p.height, M = new j.Viewport({
    width: b,
    height: E,
    container: l
  }), D = M.scene.context;
  let N = 0, K = 0, oe = b - a.Chart.scale.width;
  o?.yAxis?.location == "left" && (K = a.Chart.scale.width, oe = 0);
  let $;
  D.save(), ms(D, 0, 0, b, E, { fill: o.chart.Background }), D.drawImage(f.canvas, K, 0, f.width, f.height);
  for (const [X, I] of a.ChartPanes) {
    let H = I.graph.viewport.scene, { width: ue, height: Me } = H, be = I.scale.graph.viewport.scene, { width: Tt, height: Xe } = be;
    N > 0 && ($ = { stroke: o.divider.line }, bt(D, N, 0, p.width, $)), D.drawImage(H.canvas, K, N, ue, Me), D.drawImage(be.canvas, oe, N - 1, Tt, Xe), N += Me;
  }
  D.drawImage(c.canvas, 0, N, c.width, c.height), $ = {
    text: a.config.title,
    colour: o.chart.TextColour,
    fontSize: o.chart.FontSize * 1.5,
    fontWeight: "normal",
    fontFamily: o.chart.FontFamily,
    textBaseLine: "top"
  }, yl(D, 6, 6, $);
  const te = (X) => {
    if (X) {
      const H = r?.x || 0, ue = r?.y || 0, Me = r?.width || b * 0.25, be = r?.height || E * 0.25;
      D.drawImage(X, H, ue, Me, be);
    }
    D.restore();
    const I = () => {
      M.destroy(), l.remove();
    };
    switch (n) {
      case "url":
        if (_(e)) {
          const H = (ue) => {
            e(ue), I();
          };
          M.scene.toImage(i, s, H);
        } else
          new Promise(function(H, ue) {
            const Me = M.scene.toImage(i, s);
            Me ? H(Me) : ue(!1), I();
          });
        break;
      case "download":
      default:
        M.scene.export({ fileName: e }, null, i, s), I();
        break;
    }
  };
  v(r) ? _n(r?.imgURL).then((X) => {
    te(X);
  }).catch((X) => {
    console.error(X);
  }) : te();
}
class B extends Ug {
  static #e = fr;
  static #t = 0;
  static #i = {};
  static #n = {};
  static #s = null;
  static #r = !1;
  static #a = [];
  static #o = null;
  static #c = null;
  static #l = !1;
  static get version() {
    return B.#e;
  }
  static get default() {
    return re(pl);
  }
  static get talibPromise() {
    return B.#s;
  }
  static get talibReady() {
    return B.#r;
  }
  static get talibAwait() {
    return B.#a;
  }
  static get talibError() {
    return B.#o;
  }
  static get webWorkers() {
    return An;
  }
  static get TALibWorker() {
    return B.#c;
  }
  static #u = `${jt} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
  static #h = [
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
  #d = ae();
  #m = jt;
  #f = nt;
  #g;
  #T;
  #v;
  #w;
  #x = !1;
  #p;
  #S;
  #y;
  #E = eh;
  #C = pr;
  #b = { ...ki };
  #P = { ...ki };
  #L = { ...ki };
  #A;
  #O;
  chartWMin = ti;
  chartHMin = et;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = V.COLOUR_BG;
  chartTxtColour = V.COLOUR_TXT;
  chartBorderColour = V.COLOUR_BORDER;
  #k;
  #$;
  #M = {
    chart: {},
    time: {}
  };
  #H;
  panes = {
    utils: this.#k,
    tools: this.#$,
    main: this.#M
  };
  destruction = !1;
  logs = !1;
  infos = !1;
  warnings = !1;
  errors = !1;
  timers = !1;
  #D = 0;
  #G = 0;
  #_ = { x: 0, y: 0 };
  #W = [!1, !1, !1];
  #B;
  #F;
  #I;
  #U;
  #z;
  #V;
  #N = !1;
  #R = !1;
  static create(e = B.default) {
    let i = B.default;
    return v(e) && Object.keys(e).length > 0 && ((!("watermark" in e) || !T(e?.watermark?.text) && !("imgURL" in e?.watermark)) && (i.watermark = { display: !1 }), i = _e(i, e)), B.#t == 0 && (B.#i.CPUCores = navigator.hardwareConcurrency, B.#i.api = {
      permittedClassNames: B.#h
    }), !B.#r && B.#o === null && _(i?.talib?.init) && (B.#s = i.talib.init(i.wasm), B.#s.then(
      () => {
        B.#r = !0;
        for (let s of B.#a)
          _(s) && s();
      },
      () => {
        B.#r = !1;
      }
    )), i;
  }
  static destroy(e) {
    if (!(e instanceof B)) return !1;
    const i = e.inCnt;
    return e.destuction = !0, e.destroy(), delete B.#n[i], !0;
  }
  static cnt() {
    return B.#t++;
  }
  constructor() {
    super(), this.#g = this, this.#p = B.cnt(), this.logs = !1, this.infos = !1, this.warnings = !1, this.errors = !1, this.timers = !1, this.setID(null), this.#y = A, this.warn(`!WARNING!: ${jt} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${nt} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#F = An;
    const e = this.#b;
    e.primaryPane = { ...e.primaryPane, ...sh.primaryPane }, this.#P = { ...Ln };
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
  timer(e) {
    this.timers && console.time(e);
  }
  timeLog(e) {
    this.timers && console.timeLog(e);
  }
  timeEnd(e) {
    this.timers && console.timeEnd(e);
  }
  get version() {
    return B.version;
  }
  get name() {
    return this.#m;
  }
  get shortName() {
    return this.#f;
  }
  get key() {
    return this.#d;
  }
  get options() {
    return this.#w;
  }
  get config() {
    return this.#v;
  }
  get core() {
    return this.#g;
  }
  get inCnt() {
    return this.#p;
  }
  get txCfg() {
    return this.#T;
  }
  get elUtils() {
    return super.elUtils;
  }
  get elTools() {
    return super.elTools;
  }
  get elBody() {
    return super.elBody;
  }
  get elMain() {
    return super.elMain;
  }
  get elRows() {
    return super.elRows;
  }
  get elTime() {
    return super.elTime;
  }
  get elYAxis() {
    return super.elYAxis;
  }
  get elWidgetsG() {
    return super.elWidgets;
  }
  get UtilsBar() {
    return this.#k;
  }
  get ToolsBar() {
    return this.#$;
  }
  get MainPane() {
    return this.#M;
  }
  get Timeline() {
    return this.#M.time;
  }
  get WidgetsG() {
    return this.#H;
  }
  get Chart() {
    return this.#M.chart;
  }
  get ChartPanes() {
    return this.#M.chartPanes;
  }
  get Indicators() {
    return this.#M.indicators;
  }
  get CustomOverlays() {
    return this.#L;
  }
  get ready() {
    return this.#x;
  }
  get stateClass() {
    return this.#y;
  }
  get state() {
    return this.#y?.active(this);
  }
  get allData() {
    return {
      data: this.state.data.chart.data,
      primaryPane: this.state.data.primary,
      secondaryPane: this.state.data.secondary,
      datasets: this.state.data.datasets
    };
  }
  get rangeLimit() {
    return P(this.range.initialCnt) ? this.range.initialCnt : ac;
  }
  get range() {
    return this.state.range;
  }
  get time() {
    return this.state.time;
  }
  get timeData() {
    return this.state.time;
  }
  get TimeUtils() {
    return id;
  }
  get theme() {
    return this.#O;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#E;
  }
  get indicatorsPublic() {
    return this.#C;
  }
  get TALib() {
    return this.#A;
  }
  get TALibReady() {
    return B.talibReady;
  }
  get TALibError() {
    return B.talibError;
  }
  get talibAwait() {
    return B.talibAwait;
  }
  get TALibPromise() {
    return B.talibPromise;
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
    return this.#D;
  }
  get smoothScrollOffset() {
    return 0;
  }
  get rangeScrollOffset() {
    return Math.floor(this.bufferPx / this.candleW);
  }
  get mousePos() {
    return this.#_;
  }
  get pointerButtons() {
    return this.#W;
  }
  get symbol() {
    return this.#v.symbol;
  }
  get timeFrame() {
    return this.range.interval;
  }
  get timeFrameStr() {
    return this.range.intervalStr;
  }
  set pricePrecision(e) {
    this.setPricePrecision(e);
  }
  get pricePrecision() {
    return this.#z || Wr;
  }
  get volumePrecision() {
    return this.#V;
  }
  set stream(e) {
    return this.setStream(e);
  }
  get stream() {
    return this.#I;
  }
  get worker() {
    return this.#F;
  }
  get isEmpty() {
    return this.state.IsEmpty;
  }
  set candles(e) {
    v(e) && (this.#U = e);
  }
  get candles() {
    return this.#U;
  }
  get progress() {
    return this.#B;
  }
  get customOverlays() {
    return this.#L;
  }
  get optionalOverlays() {
    return _e({ ...this.#P }, this.#L);
  }
  start(e = B.default) {
    this.log(`${jt} configuring...`), this.#x && this.#M.destroy();
    const i = this.ID, s = B.create(e);
    this.#T = s, this.logs = s?.logs ? s.logs : null, this.infos = s?.infos ? s.infos : null, this.warnings = s?.warnings ? s.warnings : null, this.errors = s?.errors ? s.errors : null, this.timers = s?.timer ? s.timer : null, this.#v = s, this.#p = s.cnt || this.#p, this.#A = s.talib, this.props(s), this.log("processing state...");
    let n = s?.deepValidate || !1, r = s?.isCrypto || !1, o = s.state;
    if (s.state instanceof A || (o = this.configureState(s)), this.#x) {
      if (!(o instanceof A)) {
        const l = this.#y.create(this, o, n, r);
        this.#y.use(this, l.key), this.#y.delete(this, { id: xa });
      }
      delete s.state, this.#M = new so(this, s), this.MainPane.start(), document.querySelector(`style[title="${i}_style"]`)?.remove(), this.setUtilsLocation(this.theme?.utils?.location), this.elBody.setToolsLocation(this.theme?.tools?.location), this.log(`${this.name} id: ${this.ID} : loaded a new ${this.state.status} state`);
    } else {
      s.watermark.display = !0, o.id = xa;
      let l = this.#y.create(this, o, n, r);
      this.#y.use(this, l.key), delete s.state, this.log(`${this.name} id: ${this.ID} : created with a ${this.state.status} state`), this.#H = new jg(this, { widgets: s?.widgets }), this.#k = new Vg(this, s), this.#$ = new ah(this, s), this.#M = new so(this, s), this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#B = this.WidgetsG.insert("Progress", {});
    }
    this.insertAdjacentHTML("beforebegin", `<style title="${this.ID}_style"></style>`), this.setTheme(this.#O.id), this.#D = this.bufferPx * -1, this.stream = this.#v.stream, !v(s?.stream) && this.state.data.chart.data.length < 2 ? this.warn(`${jt} has no chart data or streaming provided.`) : v(s?.stream) && this.state.data.chart.data.length < 2 && (this.#N = !0), this.log(`Time Frame: ${this.range.timeFrame} Milliseconds: ${this.range.timeFrameMS}`), this.#N && this.on(rt, this.delayedSetRange, this), this.#v.callbacks = this.#v.callbacks || {}, this.#x = !0, setTimeout(this.refresh.bind(this), 1e3), this.log(`${this.#m} V${B.version} configured and running...`);
  }
  use(e) {
    this.start(e);
  }
  destroy() {
    if (this?.destuction !== !0)
      return B.destroy(this), !0;
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.hub.expunge(this), this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#F.end(), this.#S = void 0, this.#y = void 0;
  }
  configureState(e) {
    let i = re(e?.state) || {};
    i.id = this.ID, i.core = this;
    let { tf: s, ms: n } = oi(e?.timeFrame) ? vn(e.timeFrame) : {
      tf: Zi,
      ms: vt
    }, r = Date.now();
    if (r = r - r % n, !v(e?.range))
      e.range = {
        startTS: r,
        timeFrame: s,
        timeFrameMS: n
      };
    else {
      let o = e?.range;
      k(o.startTS) || (o.startTS = r), k(o.timeFrameMS) || (o.timeFrameMS = n), oi(o.timeFrame) != o.timeFrameMS && (o.timeFrame = at(n));
    }
    return i.range = { ...i.range, ...e.range }, i;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(rt, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#B.stop());
  }
  onMouseMove(e) {
    this.#_.x = e.clientX, this.#_.y = e.clientY;
  }
  onStreamUpdate(e) {
    const i = this.range;
    if (i.inRange(e[0])) {
      const s = i.valueMax, n = i.valueMin;
      (e[2] > s || e[3] < n) && (this.setRange(i.indexStart, i.indexEnd), this.emit("chart_yAxisRedraw", this.range));
    }
  }
  props(e) {
    let i = {
      width: (s) => this.setWidth(s),
      height: (s) => this.setHeight(s),
      widthMin: (s) => this.setWidthMin(s),
      heightMin: (s) => this.setHeightMin(s),
      widthMax: (s) => this.setWidthMax(s),
      heightMax: (s) => this.setHeightMax(s),
      logs: (s) => this.logs = q(s) ? s : !1,
      infos: (s) => this.infos = q(s) ? s : !1,
      warnings: (s) => this.warnings = q(s) ? s : !1,
      errors: (s) => this.errors = q(s) ? s : !1,
      indicators: (s) => this.setIndicators(s),
      theme: (s) => {
        this.#O = this.addTheme(s);
      },
      stream: (s) => this.#I = v(s) ? s : {},
      pricePrecision: (s) => this.setPricePrecision(s),
      volumePrecision: (s) => this.setVolumePrecision(s)
    };
    if (v(e))
      for (const s in e)
        s in i && i[s](e[s]);
    this.validateID(e), (!("theme" in e) || !v(e.theme)) && (e.theme = cs);
  }
  getInCnt() {
    return this.#p;
  }
  validateID(e) {
    const i = T(e?.id) ? e.id : null;
    this.setID(i), this.classList.add(this.ID);
  }
  setID(e) {
    T(e) ? this.ID = e : this.ID = `${ae(nt)}_${this.#p}`;
  }
  setTitle(e) {
    return T(e) ? (this.Chart.setTitle(e), !0) : !1;
  }
  setWatermark(e) {
    T(e.text) || T(e) ? this.core.config.watermark.text = e : "imgURL" in e && (this.core.config.watermark.imgURL = e), this.Chart.setWatermark(e);
  }
  setDimensions(e, i) {
    const s = super.setDimensions(e, i);
    this.emit("global_resize", s);
  }
  setUtilsH(e) {
    this.elUtils.style.height = `${e}px`;
  }
  setToolsW(e) {
    this.elTools.style.width = `${e}px`;
  }
  setPricePrecision(e) {
    (!P(e) || e < 0) && (e = Wr), this.#z = e;
  }
  setVolumePrecision(e) {
    (!P(e) || e < 0) && (e = dc), this.#V = e;
  }
  addTheme(e) {
    const i = $e.create(e, this);
    return this.#O instanceof $e || (this.#O = i), i;
  }
  setTheme(e) {
    if (!this.theme.list.has(e)) return !1;
    this.#O.setTheme(e, this);
    const i = this.#O, s = document.querySelector(`style[title=${this.ID}_style]`), n = `var(--txc-border-color, ${i.chart.BorderColour}`;
    let r = `.${this.ID} { `;
    if (r += `--txc-background: ${i.chart.Background}; `, this.style.background = `var(--txc-background, ${i.chart.Background})`, this.style.border = `${i.chart.BorderThickness || 0}px solid`, this.style.borderColor = n, r += `--txc-border-color:  ${i.chart.BorderColour}; `, i.chart.BorderThickness > 0 ? this.elMain.rows.style.border = `1px solid ${n}` : this.elMain.rows.style.border = "none", r += `--txc-time-scrollbar-color: ${i.chart.BorderColour}; `, r += `--txc-time-handle-color: ${i.xAxis.handle}; `, r += `--txc-time-slider-color: ${i.xAxis.slider}; `, r += `--txc-time-cursor-fore: ${i.xAxis.colourCursor}; `, r += `--txc-time-cursor-back: ${i.xAxis.colourCursorBG}; `, r += `--txc-time-icon-color: ${i.icon.colour}; `, r += `--txc-time-icon-hover-color: ${i.icon.hover}; `, this.elTime.overview.scrollBar.style.borderColor = n, this.elTime.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${i.xAxis.handle})`, this.elTime.overview.style.setProperty("--txc-time-slider-color", i.xAxis.slider), this.elTime.overview.style.setProperty("--txc-time-icon-color", i.icon.colour), this.elTime.overview.style.setProperty("--txc-time-icon-hover-color", i.icon.hover), this.Chart instanceof je)
      for (let [o, l] of Object.entries(this.Chart.legend.list))
        l.el.style.color = `var(--txc-legend-color, ${i.legend.colour})`, l.el.style.font = `var(--txc-legend-font, ${i.legend.font})`;
    for (let o of this.elUtils.icons)
      o.className == "icon-wrapper" && (o.children[0].style.fill = i.icon.colour);
    for (let o of this.elTools.icons)
      o.className == "icon-wrapper" && (o.children[0].style.fill = i.icon.colour);
    return r += " }", s.innerHTML = r, !0;
  }
  setScrollPos(e) {
    e = Math.round(e), P(e) && e <= 0 && e >= this.bufferPx * -1 ? this.#D = e : this.emit("Error", "setScrollPos: not a valid value");
  }
  createState(e, i, s) {
    return this.stateClass.create(this, e, i, s);
  }
  deleteState(e) {
    return this.stateClass.delete(this, e) ? (this.emit("state_deleted", e), !0) : !1;
  }
  exportState(e = this.state.key, i = {}) {
    let s = this.stateClass.export(this, e, i);
    return s ? (this.emit("state_exported", e), s) : !1;
  }
  setStream(e) {
    if (this.stream instanceof st)
      return this.error("ERROR: Invoke stopStream() before starting a new one."), !1;
    if (v(e))
      return this.allData.data.length == 0 && T(e.timeFrame) && vn(e?.timeFrame), this.#I = new st(this), this.#v.stream = this.#I.config, this.#I;
  }
  startStream() {
    this.stream instanceof st && this.stream.start();
  }
  stopStream() {
    this.stream instanceof st && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#N; ) {
      let e = Math.floor(this.range.initialCnt * 0.5);
      this.setRange(e * -1, e), this.off(rt, this.delayedSetRange, this), this.#N = !1;
    }
  }
  updateRange(e) {
    if (!L(e) || !P(e[4]) || e[4] == 0 || e[4] < 0 && this.range.isPastLimit() || e[4] > 0 && this.range.isFutureLimit()) return;
    let i, s;
    if (i = e[4], s = this.#D + i, s % this.candleW, s < this.bufferPx * -1) {
      if (!this.offsetRange(this.rangeScrollOffset * -1)) return;
      s = 0;
    } else if (s > 0) {
      if (!this.offsetRange(this.rangeScrollOffset)) return;
      s = this.bufferPx * -1;
    }
    this.#D = s, this.emit("chart_scrollUpdate", s);
  }
  offsetRange(e) {
    let i = this.range.indexStart - e, s = this.range.indexEnd - e;
    return this.range.isPastLimit(i) || this.range.isFutureLimit(s) ? !1 : (this.setRange(i, s), !0);
  }
  setRange(e = 0, i = this.rangeLimit) {
    const s = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.range.set(e, i, s), e < 0 && !this.#R ? this.emit("range_limitPast", { chart: this, start: e, end: i }) : i > this.range.dataLength && !this.#R && this.emit("range_limitFuture", { chart: this, start: e, end: i });
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
    e && (i += Math.round(this.range.Length / 2)), this.jumpToIndex(i, !0, !1);
  }
  mergeData(e, i = !1, s = !1) {
    this.#R = !0;
    let n = this.state.mergeData(e, i, s);
    return q(n) && (this.#R = !1), n;
  }
  isOverlay(e) {
    return ni(e) && _(e.prototype?.draw) && !this.isIndicator(e) && Object.getPrototypeOf(e.prototype).constructor.isOverlay;
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
    if (!v(e)) return !1;
    const i = {};
    for (const [s, n] of Object.entries(e))
      v(n) && this.isOverlay(n?.class) && Object.keys(this.#L).includes(n?.location) ? (this.#L[n.location][s] = n, i[s] = !0, this.log(`Custom Overlay: ${s} - Registered`)) : (i[s] = !1, this.log(`Custom Overlay: ${s} - Rejected: Not a valid Overlay`));
    return i;
  }
  addOverlay(e, i) {
    let s;
    const n = this.findOverlayInGraph(e, i);
    if (!n) s = n;
    else {
      const { overlay: r, graph: o } = { ...n };
      s = o.addOverlay(e, r);
    }
    return s ? (this.log(`Overlay: ${e} - Added to ${i}`), !0) : (this.error(`Overlay: ${e} - Error attempting to add overlay to ${i}`), !1);
  }
  removeOverlay(e, i) {
    let s;
    const n = this.findOverlayInGraph(e, i);
    if (!n) s = n;
    else {
      const { overlay: r, graph: o } = { ...n };
      s = o.removeOverlay(e);
    }
    return s ? (this.log(`Overlay: ${e} - Removed from ${i}`), !0) : (this.error(`Overlay: ${e} - Error attempting to remove overlay from ${i}`), !1);
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
    if (!T(e) || !T(i)) return !1;
    const s = this.hasOverlay(e);
    if (!s) return !1;
    const n = this.findGraph(i);
    return n ? { overlay: s, graph: n } : !1;
  }
  isIndicator(e) {
    return ni(e) && _(e.prototype?.draw) && "primaryPane" in e.prototype && !!e?.isIndicator;
  }
  setIndicators(e, i = !1) {
    if (!v(e)) return !1;
    i && (console.warn("Expunging all default indicators!"), this.#E = {});
    const s = {};
    for (const [n, r] of Object.entries(e))
      T(r?.id) && T(r?.name) && T(r?.event) && this.isIndicator(r?.ind) ? (r?.public && (this.#C[n] = r), this.#E[n] = r.ind, s[n] = !0, this.log(`Custom Indicator: ${n} - Registered`)) : (s[n] = !1, this.warn(`Custom Indicator: ${n} - Rejected: Not a valid indicator`));
    return s;
  }
  addIndicator(e, i = e, s = {}) {
    return this.#M.addIndicator(e, i, s) || this.error(`Indicator: ${e} - Error failed to add indicator`), e;
  }
  getIndicator(e) {
    return this.#M.getIndicator(e);
  }
  getIndicatorsByType(e) {
    return this.#M.getIndicatorsByType(e);
  }
  removeIndicator(e) {
    return this.#M.removeIndicator(e) || this.error(`Indicator: ${e} - Error failed to remove indicator`), e;
  }
  indicatorSettings(e, i) {
    return this.#M.indicatorSettings(e, i);
  }
  hasStateIndicator(e, i = "searchAll") {
    if (!T(e) || !T(i)) return !1;
    const s = function(n, r) {
      for (let o of r)
        return o?.id == n || o?.name == n;
    };
    if (i == "searchAll") {
      for (let n of this.allData)
        if (s(e, n)) return !0;
      return !1;
    } else if (i in this.allData)
      return s(e, d);
  }
  async calcAllIndicators(e) {
    const i = [], s = (n) => new Promise((r) => setTimeout(() => {
      r(n());
    }, 0));
    for (const [n, r] of Object.entries(this.Indicators))
      for (const [o, l] of Object.entries(r))
        i.push(l.instance.calcIndicatorHistory.bind(l.instance, e));
    await Promise.all(i.map(async (n) => {
      s(n);
    })), this.refresh();
  }
  addTrade(e) {
    return this.state.addTrade(e);
  }
  removeTrade(e) {
    return this.state.removeTrade(e);
  }
  addEvent(e) {
    return this.state.addEvent(e);
  }
  removeEvent(e) {
    return this.state.removeEvent(e);
  }
  resize(e, i) {
    return !P(e) && !P(i) ? !1 : (this.setDimensions(e, i), !0);
  }
  refresh() {
    this.ready && this.#M.refresh();
  }
  toImageURL(e, i, s, n) {
    return lo(this, e, i, s, "url", n);
  }
  downloadImage(e = `${this.ID}.png`, i, s, n) {
    lo(this, e, i, s, "download", n);
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
      this.implemented = this.#H.insert("Dialogue", i), this.implemented.start();
    }
  }
}
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", Yd), document.head.insertAdjacentHTML("beforeend", Kd), customElements.get("tradex-chart") || customElements.define("tradex-chart", B));
function hn(a) {
  return a instanceof B;
}
const Xg = [
  "before",
  "after",
  "around",
  "afterReturning",
  "afterThrowing"
];
class In {
  static add(e, i) {
    return e instanceof In ? (ni(i), new Proxy(i, {
      get: (n, r) => typeof n[r] == "function" ? In.intercept(e, n, r) : n[r]
    })) : !1;
  }
  static intercept(e, i, s) {
    const n = (r, o, l) => {
      let c = 0, p, f = l;
      for (let b of r)
        o == b.type && (c++, p = b.transfer ? f : l, p = b.type == "afterReturning" ? b.args : p, f = b.func.apply(i, p));
      return f = c > 0 ? f : void 0, f;
    };
    return function(...r) {
      const o = `${s}`, l = e.advice[o];
      if (!l) return i[s].apply(i, r);
      try {
        let c;
        if (c = n(l, "replace", r), c !== void 0) return c;
        c = n(l, "before", r), e.transfer && c !== void 0 && (r = c);
        const p = i[s].apply(i, r);
        return e.transfer && p !== void 0 && (r = p), c = n(l, "after", r), e.transfer && c !== void 0 && (r = p), c = n(l, "around", { args: r, result: p }), n(l, "afterReturning", r), c = c === void 0 ? p : c, c;
      } catch (c) {
        throw n(l, ["afterThrowing"], c), c;
      }
    };
  }
  constructor(e, i = !0) {
    this.name = e, this.advice = {}, this.transfer = i;
  }
  before(e, i, s, n) {
    this.#e(e, i, "before", s, n);
  }
  after(e, i, s, n) {
    this.#e(e, i, "after", s, n);
  }
  around(e, i, s, n) {
    this.#e(e, i, "around", s, n);
  }
  afterReturning(e, i, s, n) {
    this.#e(e, i, "afterReturning", s, n);
  }
  afterThrowing(e, i, s, n) {
    this.#e(e, i, "afterThrowing", s, n);
  }
  #e(e, i, s, n = !0, r = []) {
    return typeof e != "string" || typeof i != "function" || !Array.isArray(r) || Xg.includes(e) ? !1 : (this.advice[e] = this.advice[e] || [], this.advice[e].push({ type: s, func: i, args: r, transfer: n }), !0);
  }
}
export {
  In as Aspect,
  B as Chart,
  Ai as DEFAULT_STATE,
  Kg as DOM,
  Yt as EventHub,
  z as Indicator,
  eh as IndicatorClasses,
  Q as Overlay,
  Yi as Range,
  fs as StateMachine,
  nl as TimeData,
  os as YAXIS_PADDING,
  R as YAXIS_TYPE,
  Jg as YAXIS_TYPES,
  ps as candleW,
  Y as canvas,
  re as copyDeep,
  mo as isPromise,
  _e as mergeDeep,
  nf as talibAPI,
  Yg as typeChecks,
  ae as uid,
  Qg as utils
};
